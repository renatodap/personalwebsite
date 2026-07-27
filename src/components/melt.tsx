"use client";

import { useEffect, useRef } from "react";
import { RATIO } from "@/lib/ratios";
import { inkOf, order } from "@/lib/ink";
import type { Spot } from "@/lib/layout";

/**
 * One drawing comes apart into ink, the ink flows, and the next drawing builds
 * itself out of it.
 *
 * WHAT WAS WRONG THE FIRST TIME, kept here because it is the whole lesson. The
 * first build ran the canvas through a goo filter: blur to spread the alpha, a
 * steep feColorMatrix to re-harden it. That is the metaball effect, it is built
 * for solid blobs, and these are hairlines. On prod it fused a guitarist into
 * three unrecognisable amoebas. The threshold is gone. Ink stays ink.
 *
 * FLOW IS MOTION, NOT A FILTER. Four things make it read as liquid:
 *
 *   1. STREAKS, NOT DOTS. Each particle is drawn as a line from where it was to
 *      where it is. A square dot moving across the screen is sand; the same
 *      point drawn as its own velocity is a fluid. This single change does more
 *      than everything else combined.
 *   2. ONE CURRENT. Every particle bows the SAME way, not alternating, so the
 *      cloud moves like a body of water rather than a swarm. Alternating signs
 *      cancel out and read as noise.
 *   3. CURL. A low-frequency swirl, per particle out of phase, peaking at the
 *      midpoint and resolving to nothing, so the stream turns over on itself
 *      instead of sliding.
 *   4. IT LEAVES FAST AND ARRIVES SLOW. Departure is near-linear, arrival is
 *      heavily eased, so ink tears away and then settles. Symmetric easing is
 *      what makes a morph look like a crossfade.
 *
 * The canvas lives inside the stage, so ink travels in the WORLD: moving right
 * means it really streams rightward. Affordable because streaks are thin marks,
 * which survive the camera's upscale where a hairline mask would not. The
 * settled page is never a canvas: when the flow lands this unmounts and the
 * vector masks are what remain.
 */

/** Enough overlap that consecutive frames join into a continuous ribbon. */
const WIDTH = 1.05;

/** Swirl amplitude in canvas percent, at the midpoint. */
/* Small, and it is a LANE offset rather than a swirl. Renato, 2026-07-27: "i
   want it to actually feel like liquid, like streams of liquid all going in the
   same direction and reconstructing". A swirl per particle is turbulence, and
   turbulence reads as a swarm; parallel lanes of different speeds read as a
   current. */
const LANE = 4.5;

/** Frames of streak kept behind each particle. A one-frame streak is a dash; a
 *  trail is a filament, and filaments are what a fluid is made of. */
const TRAIL = 9;

export function Melt({
  from,
  to,
  fromSpot,
  toSpot,
  duration,
  onDone,
}: {
  from: string;
  to: string;
  fromSpot: Spot;
  toSpot: Spot;
  duration: number;
  onDone: () => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;

    let raf = 0;
    let cancelled = false;
    const started = performance.now();

    const box = el.parentElement?.getBoundingClientRect();
    const w = Math.min(1800, Math.round(box?.width ?? 1200));
    const h = Math.min(1800, Math.round(box?.height ?? 800));
    el.width = w;
    el.height = h;

    const ctx = el.getContext("2d");
    if (!ctx) return;

    const ink = getComputedStyle(el).getPropertyValue("--ink-solid").trim() || "#f4efe6";

    Promise.all([inkOf(from, RATIO[from]), inkOf(to, RATIO[to])]).then(([a, b]) => {
      if (cancelled || a.length === 0 || b.length === 0) {
        done.current();
        return;
      }

      const oa = order(a);
      const ob = order(b);
      const n = Math.min(oa.length, ob.length);

      const boxOf = (spot: Spot, drawing: string) => ({
        x: spot.x - (spot.h * RATIO[drawing] * h) / w / 2,
        y: spot.y - spot.h / 2,
        w: (spot.h * RATIO[drawing] * h) / w,
        h: spot.h,
      });

      const A = boxOf(fromSpot, from);
      const B = boxOf(toSpot, to);

      // Direction of the move, and the perpendicular the current bows along.
      const dx = B.x + B.w / 2 - (A.x + A.w / 2);
      const dy = B.y + B.h / 2 - (A.y + A.h / 2);
      const len = Math.hypot(dx, dy) || 1;
      const px = -dy / len;
      const py = dx / len;

      // Per particle: a phase so the swirl is out of step across the cloud, and
      // a lead so the figure tears away from one side rather than all at once.
      const phase = new Float32Array(n);
      const lead = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const ax = a[oa[i] * 2];
        const ay = a[oa[i] * 2 + 1];
        // The lane a particle rides in: its position ACROSS the direction of
        // travel. Neighbours in the figure stay neighbours in the stream, which
        // is what keeps the flow laminar instead of scattering it.
        phase[i] = Math.min(1, Math.max(0, 0.5 + (ax * px + ay * py) * 0.9));
        // Along the direction of travel, so departure sweeps.
        lead[i] = dx >= 0 ? ax : 1 - ax;
      }

      // A ring buffer of past positions, so each particle draws a curved
      // filament rather than a straight one-frame dash. This is most of the
      // difference between "particles moving" and "ink flowing".
      const trail = new Float32Array(n * 2 * TRAIL);
      let head = 0;
      const prev = new Float32Array(n * 2);


      /* Seeded at t = 0 BEFORE the first painted frame. Without this the first
         frame has no previous position, draws nothing, and the source figure is
         gone for a frame before any ink exists, which is most of why it read as
         "constructing out of nowhere". */

      const at = (i: number, t: number, out: [number, number]) => {
        // Renormalised so every particle still completes exactly at t = 1.
        const local = Math.min(1, Math.max(0, (t - lead[i] * 0.42) / 0.58));

        // Leaves fast, arrives slow, and eases IN at the very start too, so ink
        // peels away rather than jumping. A pure ease-out starts at maximum
        // speed, which is exactly the "constructing out of nowhere" tell.
        const e = local < 0.18 ? 2.6 * local * local : 1 - Math.pow(1 - local, 3.4) * 0.916;

        const ia = oa[i] * 2;
        const ib = ob[i] * 2;
        const x0 = A.x + a[ia] * A.w;
        const y0 = A.y + a[ia + 1] * A.h;
        const x1 = B.x + b[ib] * B.w;
        const y1 = B.y + b[ib + 1] * B.h;

        // One current: every particle bows the same way. The swirl is a full
        // turn of phase across the flight, so the stream rolls over itself.
        // Every particle bows the SAME way, by an amount fixed for its lane, so
        // the cloud travels as a set of parallel streams rather than each mark
        // wandering on its own. The bow swells and resolves, so the streams part
        // from the figure and close back onto the next one.
        const swell = Math.sin(Math.PI * e);
        const bow = swell * LANE * (phase[i] - 0.5) * 2;

        out[0] = x0 + (x1 - x0) * e + px * bow;
        out[1] = y0 + (y1 - y0) * e + py * bow;
      };

      const p: [number, number] = [0, 0];

      for (let i = 0; i < n; i++) {
        at(i, 0, p);
        const x = (p[0] / 100) * w;
        const y = (p[1] / 100) * h;
        prev[i * 2] = x;
        prev[i * 2 + 1] = y;
        // Every slot in the trail starts on the figure, so the first frame is
        // the drawing itself rather than a scatter of half-drawn filaments.
        for (let k = 0; k < TRAIL; k++) {
          trail[(k * n + i) * 2] = x;
          trail[(k * n + i) * 2 + 1] = y;
        }
      }


      const frame = (now: number) => {
        const t = Math.min(1, (now - started) / duration);

        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = ink;
        ctx.lineWidth = WIDTH;
        ctx.lineCap = "round";
        ctx.beginPath();

        for (let i = 0; i < n; i++) {
          at(i, t, p);
          const x = (p[0] / 100) * w;
          const y = (p[1] / 100) * h;

          // The filament: this frame's position back through the last few. At
          // rest every slot holds the same point, so the filament has zero
          // length and the cloud is exactly the drawing, which is what makes
          // the ink RESOLVE into the figure rather than be replaced by it.
          ctx.moveTo(x, y);
          for (let k = 1; k <= TRAIL; k++) {
            const slot = (head - k + TRAIL * 2) % TRAIL;
            ctx.lineTo(trail[(slot * n + i) * 2], trail[(slot * n + i) * 2 + 1]);
          }

          trail[(head * n + i) * 2] = x;
          trail[(head * n + i) * 2 + 1] = y;
        }

        ctx.stroke();
        head = (head + 1) % TRAIL;

        if (t < 1 && !cancelled) raf = requestAnimationFrame(frame);
        else if (!cancelled) done.current();
      };

      raf = requestAnimationFrame(frame);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [from, to, fromSpot, toSpot, duration]);

  return <canvas className="melt" ref={canvas} aria-hidden="true" />;
}
