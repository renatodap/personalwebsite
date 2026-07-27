"use client";

import { useEffect, useRef } from "react";
import { RATIO } from "@/lib/ratios";
import { inkOf, order, type Ink } from "@/lib/ink";
import type { Spot } from "@/lib/layout";

/**
 * One drawing comes apart, flows, and the next one builds itself out of it.
 *
 * The canvas lives INSIDE the stage, so it carries the camera with it and the
 * ink travels in the world rather than on the screen: moving right means the ink
 * actually streams rightward across the field. That is only affordable because
 * particles are dots. A hairline upscaled by the camera goes soft and it shows;
 * a 1.6px dot upscaled by the camera is still a dot. It is also why the settled
 * page is never a canvas: the moment the flow lands, this unmounts and the real
 * vector masks are what remain.
 *
 * The liquid is the goo filter on the element, blur spreading the alpha and a
 * static threshold re-hardening it, so scattered points fuse into one body at
 * the peak and resolve into the new figure. Only the blur animates. Animating
 * feTurbulence would be the more literal fluid and runs at about 15fps on a
 * phone, which is not a trade worth making.
 */

const DOT = 1.6;

/** Perpendicular bow, in canvas percent, so ink arcs instead of sliding. */
const BOW = 7;

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

    // Sized to the stage in CSS and to the stage in device pixels, capped so a
    // 4K monitor does not ask for a 30-megapixel backing store for 780ms.
    const box = el.parentElement?.getBoundingClientRect();
    const w = Math.min(1600, Math.round(box?.width ?? 1200));
    const h = Math.min(1600, Math.round(box?.height ?? 800));
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

      // Canvas percent -> device pixels. Both boxes keep their own proportions,
      // exactly as the layout sizes them, so a point sits where the mask puts it.
      const boxOf = (spot: Spot, drawing: string) => {
        const bh = spot.h;
        const bw = (spot.h * RATIO[drawing] * h) / w;
        return { x: spot.x - bw / 2, y: spot.y - bh / 2, w: bw, h: bh };
      };

      const A = boxOf(fromSpot, from);
      const B = boxOf(toSpot, to);

      // Ink leaves from one side and arrives on the other, so the figure comes
      // apart in a direction instead of dissolving uniformly. Uniform is a
      // crossfade wearing a costume.
      const away = Math.sign(toSpot.x - fromSpot.x) || 1;

      const frame = (now: number) => {
        const t = Math.min(1, (now - started) / duration);
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = ink;

        for (let i = 0; i < n; i++) {
          const ia = oa[i] * 2;
          const ib = ob[i] * 2;

          const ax = a[ia];
          const ay = a[ia + 1];

          // Stagger by position along the direction of travel, then renormalise,
          // so every particle still completes exactly at t = 1.
          const lead = away > 0 ? ax : 1 - ax;
          const delay = lead * 0.34;
          const local = Math.min(1, Math.max(0, (t - delay) / (1 - 0.34)));

          // Exponential ease, matching the camera's own curve.
          const e = 1 - Math.pow(1 - local, 3);

          const x0 = A.x + ax * A.w;
          const y0 = A.y + ay * A.h;
          const x1 = B.x + b[ib] * B.w;
          const y1 = B.y + b[ib + 1] * B.h;

          // A bow perpendicular to travel, alternating by index, so the stream
          // has body rather than being a bundle of parallel lines.
          const arc = Math.sin(Math.PI * e) * BOW * (i % 2 ? 1 : -1) * 0.5;

          const px = (x0 + (x1 - x0) * e) / 100;
          const py = (y0 + (y1 - y0) * e + arc) / 100;

          ctx.fillRect(px * w, py * h, DOT, DOT);
        }

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
