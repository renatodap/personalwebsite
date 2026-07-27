"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ANCHOR,
  CLOSE,
  DIRECTIONS,
  PLACE,
  REST,
  TALL_QUERY,
  cameraFor,
  toward,
} from "@/lib/layout";
import { RATIO } from "@/lib/ratios";
import type { Aspect } from "@/lib/content";

/**
 * One space, one camera.
 *
 * Zooming in does not swap screens. It moves a camera over the same canvas, so
 * what you see close up is exactly what you saw far away, larger, in its own
 * place, with its neighbours still around it. Every drawing is a destination,
 * and from any of them you can keep going left, right, up or down until you are
 * genuinely at the edge of the field.
 *
 * WHY NOT THE VIEW TRANSITIONS API. It cannot be interrupted or retargeted once
 * running, and a camera you cannot redirect mid-flight is not a camera. It also
 * animates bitmap snapshots, which across this much scale is exactly the
 * softness the design works to avoid. Research:
 * docs/research/2026-07-26-zoomable-montage-research.md.
 *
 * WHY NOT FLIP. It needs a layout read per move to compute what one arithmetic
 * expression in layout.ts already knows.
 */

const FLIGHT = 700;
const EASE = "cubic-bezier(0.22, 1, 0.32, 1)";
const REDUCED = "(prefers-reduced-motion: reduce)";
const SWIPE = 40;

export function Field({ aspects, contact }: { aspects: Aspect[]; contact: ReactNode }) {
  const [at, setAt] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [tall, setTall] = useState(false);

  const stage = useRef<HTMLDivElement>(null);
  const camera = useRef<Animation | null>(null);
  const softening = useRef<Animation | null>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const marks = useRef<Record<string, HTMLButtonElement | null>>({});
  const painted = useRef(false);

  /** Every drawing, with the aspect it belongs to and where it stands. */
  const world = useMemo(
    () =>
      aspects.flatMap((a) =>
        a.marks
          .filter((m) => PLACE[m.drawing])
          .map((m) => ({ ...m, aspect: a.id, place: PLACE[m.drawing] })),
      ),
    [aspects],
  );

  const here = world.find((m) => m.drawing === at) ?? null;
  const aspect = here ? aspects.find((a) => a.id === here.aspect) ?? null : null;

  const spotOf = useCallback(
    (drawing: string) => (tall ? PLACE[drawing]?.tall : PLACE[drawing]?.wide),
    [tall],
  );

  /* Which arrangement is on screen. Keyed on the canvas's own proportion rather
     than on width, because the composition is a shape, not a breakpoint: a tall
     narrow window wants the tall arrangement whatever its pixel width. */
  useEffect(() => {
    const mq = window.matchMedia(TALL_QUERY);
    const sync = () => setTall(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* The URL is the state, so the phone's back gesture, the browser back button
     and a shared link all do the obvious thing. */
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      setAt(PLACE[id] ? id : null);
    };
    fromHash();
    window.addEventListener("popstate", fromHash);
    return () => window.removeEventListener("popstate", fromHash);
  }, []);

  const target = useMemo(() => {
    const spot = at ? spotOf(at) : null;
    if (!spot) return REST;
    return cameraFor(spot, tall ? ANCHOR.tall : ANCHOR.wide, tall ? CLOSE.tall : CLOSE.wide);
  }, [at, spotOf, tall]);

  /* The flight. */
  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    // First paint, and any change of arrangement, land without a flight: there
    // is nothing to be continuous with.
    if (!painted.current) {
      painted.current = true;
      el.style.transform = target;
      return;
    }

    // WCAG 2.3.3 names zooming specifically, and a zoom covering a large part of
    // the screen is the motion most likely to cause vestibular symptoms. Reduced
    // motion gets no camera movement at all, and the CSS crossfades instead.
    if (window.matchMedia(REDUCED).matches) {
      camera.current?.cancel();
      softening.current?.cancel();
      camera.current = null;
      el.style.transform = target;
      return;
    }

    // Retarget rather than restart: commit where the camera actually is, cancel,
    // and let the next animation infer its start from that. Cross the field in
    // five presses and it chases, never snaps.
    if (camera.current) {
      try {
        camera.current.commitStyles();
      } catch {
        /* not rendered; the inline transform below still holds */
      }
      camera.current.cancel();
    }

    const flight = el.animate([{ transform: target }], {
      duration: FLIGHT,
      easing: EASE,
      fill: "forwards",
    });
    camera.current = flight;

    flight.finished
      .then(() => {
        if (camera.current !== flight) return;
        // The crux. A scale animation is NOT re-rastered while it runs, so every
        // drawing is soft for the whole flight. Committing the final transform
        // makes it an ordinary scripted style, which IS re-rastered, so the
        // settled field is sharp. (`will-change: transform` would pin the raster
        // forever and is banned outright.)
        try {
          flight.commitStyles();
        } catch {
          el.style.transform = target;
        }
        flight.cancel();
        camera.current = null;
      })
      .catch(() => {
        /* cancelled by a retarget */
      });

    // Blur is not decoration. It hides the interpolation artifacts of an
    // un-re-rastered scale, and it is already this site's rule that crossing
    // between two line drawings without it reads as two objects overlapping
    // rather than one becoming the next.
    softening.current?.cancel();
    softening.current = el.animate(
      [{ filter: "blur(0px)" }, { filter: "blur(2.4px)", offset: 0.42 }, { filter: "blur(0px)" }],
      { duration: FLIGHT, easing: "linear" },
    );
  }, [target]);

  /* A view changed without the document changing, so the two things a real
     navigation does for free have to be done by hand: move focus, and announce.
     Both, because focus alone is not reliably announced by NVDA in Firefox or
     VoiceOver in Safari. */
  useEffect(() => {
    if (at) caption.current?.focus({ preventScroll: true });
  }, [at]);

  const go = useCallback(
    (drawing: string | null) => {
      if (drawing === at) return;
      const how = at === null || drawing === null ? "pushState" : "replaceState";
      window.history[how](null, "", drawing ? `#${drawing}` : " ");
      setAt(drawing);
      setHover(null);
    },
    [at],
  );

  const close = useCallback(() => {
    if (!at) return;
    if (window.location.hash.slice(1) === at) window.history.back();
    else setAt(null);
  }, [at]);

  /** Everything currently reachable. Standing back, the five childhood drawings
   *  are not there to be reached; standing close, they are. */
  const reachable = useMemo(
    () => world.filter((m) => (at ? true : !m.place.deep)),
    [world, at],
  );

  const nextTo = useCallback(
    (from: string, dir: [number, number]) => {
      const origin = spotOf(from);
      if (!origin) return null;
      return toward(
        origin,
        reachable.filter((m) => m.drawing !== from).map((m) => ({ id: m.drawing, spot: spotOf(m.drawing)! })),
        dir,
      );
    },
    [reachable, spotOf],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();

      const dir = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down" }[e.key];
      if (!dir) return;

      const from = at ?? (document.activeElement as HTMLElement)?.dataset?.mark;
      if (!from) return;
      const next = nextTo(from, DIRECTIONS[dir]);
      if (!next) return;
      e.preventDefault();
      if (at) go(next);
      else marks.current[next]?.focus({ preventScroll: true });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [at, close, nextTo, go]);

  /* Touch has no arrow keys and no hover, so the same four moves are a swipe. */
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: React.PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || !at) return;

    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.hypot(dx, dy) < SWIPE) return;

    // Swiping left means "bring me what is on the right", the way a map moves.
    const dir = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "right" : "left") : dy < 0 ? "down" : "up";
    const next = nextTo(at, DIRECTIONS[dir]);
    if (next) go(next);
  };

  /** on: full ink. dim: field texture. mute: another aspect while one is read. */
  const weight = (m: (typeof world)[number]) => {
    if (m.drawing === at) return "on";
    if (at) return here && m.aspect === here.aspect ? "near" : "far";
    if (m.place.deep) return "deep";
    if (!hover) return "dim";
    return m.aspect === hover ? "on" : "mute";
  };

  const exits = useMemo(() => {
    if (!at) return [];
    return (["left", "right", "up", "down"] as const)
      .map((dir) => {
        const next = nextTo(at, DIRECTIONS[dir]);
        return next ? { dir, drawing: next } : null;
      })
      .filter((e): e is { dir: "left" | "right" | "up" | "down"; drawing: string } => e !== null);
  }, [at, nextTo]);

  return (
    <div className="world" data-view={at ? "close" : "far"} onPointerDown={onDown} onPointerUp={onUp}>
      <div className="canvas" data-tall={tall ? "" : undefined}>
        <div className="stage" ref={stage}>
          {world.map((m, i) => {
            const url = `url(/drawings/detail-${m.drawing}.svg)`;
            return (
              <button
                key={m.drawing}
                type="button"
                data-mark={m.drawing}
                data-weight={weight(m)}
                ref={(el) => {
                  marks.current[m.drawing] = el;
                }}
                className="mark"
                style={
                  {
                    "--r": RATIO[m.drawing],
                    "--wx": m.place.wide.x,
                    "--wy": m.place.wide.y,
                    "--wh": m.place.wide.h,
                    "--tx": m.place.tall.x,
                    "--ty": m.place.tall.y,
                    "--th": m.place.tall.h,
                    "--i": i,
                    maskImage: url,
                    WebkitMaskImage: url,
                  } as React.CSSProperties
                }
                onPointerEnter={() => setHover(m.aspect)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(m.aspect)}
                onBlur={() => setHover(null)}
                onClick={() => go(m.drawing)}
              >
                <span className="sr-only">{m.alt}</span>
              </button>
            );
          })}
        </div>

        {/* The five labels sit over the five largest drawings and never move
            with the camera. They are the navigation: the interaction is not
            discoverable otherwise, and a hover-only affordance is not an
            affordance on a phone. */}
        <div className="tags" aria-hidden="true">
          {aspects.map((a) => {
            const lead = a.marks.find((m) => m.hero && PLACE[m.drawing]);
            if (!lead) return null;
            const p = PLACE[lead.drawing];
            return (
              <span
                key={a.id}
                className="tag"
                data-lit={!at && (!hover || hover === a.id) ? "" : undefined}
                style={
                  {
                    "--wx": p.wide.x,
                    "--wy": p.wide.y,
                    "--wh": p.wide.h,
                    "--tx": p.tall.x,
                    "--ty": p.tall.y,
                    "--th": p.tall.h,
                  } as React.CSSProperties
                }
              >
                {a.title}
              </span>
            );
          })}
        </div>
      </div>

      {/* The words for wherever you are standing. They do not replace the view;
          they arrive beside it. */}
      <div className="says">
        <p className="say" tabIndex={-1} ref={caption}>
          {aspect ? (
            <>
              <span className="tag">{aspect.title}</span>
              {aspect.lines.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </>
          ) : null}
        </p>
      </div>

      {/* Where you can go from here. A zoomable interface loses people when the
          exits are invisible, so they are named, and they are also the visible
          form of the arrow keys and the swipe. */}
      <nav className="exits" aria-label="Nearby" inert={at === null}>
        {exits.map((e) => (
          <button
            key={e.dir}
            type="button"
            className={`exit exit--${e.dir}`}
            onClick={() => go(e.drawing)}
          >
            <span className="sr-only">{`Move ${e.dir}`}</span>
            <i aria-hidden="true" />
          </button>
        ))}
      </nav>

      <p className="sr-only" aria-live="polite">
        {here ? `${aspect?.title}. ${here.alt}` : ""}
      </p>

      <div className="bar">
        <div className="links" inert={at !== null}>
          {contact}
        </div>
        <button type="button" className="back" onClick={close} inert={at === null}>
          Back
        </button>
      </div>
    </div>
  );
}
