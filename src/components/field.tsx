"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ANCHOR,
  ASPECT_OF,
  CLOSE,
  HERO,
  ORBIT,
  ORBIT_SECONDS,
  REST,
  ringOf,
  orbiterH,
  TALL_QUERY,
  cameraFor,
  spotOf,
  step,
} from "@/lib/layout";
import { RATIO } from "@/lib/ratios";
import type { Aspect } from "@/lib/content";
import { Melt } from "@/components/melt";
import { inkOf } from "@/lib/ink";

/**
 * One space, one camera, three levels.
 *
 *   FAR    the five heroes alone. Nothing else is drawn.
 *   ASPECT standing in front of one hero: ITS drawings appear, orbiting it, and
 *          its sentences appear. No other aspect is on screen at all; the arrows
 *          at the edges are the only sign there is anywhere else to go.
 *   NEAR   standing in front of one of those smaller drawings. No sentences: the
 *          words belong to the aspect, not to each drawing.
 *
 * Arrows and swipe move between the five aspects ONLY. A smaller drawing is
 * reached by clicking it, which is a different intent and gets a different
 * gesture.
 *
 * The camera is a CSS transform animated with the Web Animations API. Not the
 * View Transitions API, which cannot be interrupted or retargeted, and a camera
 * you cannot redirect mid-flight is not a camera.
 */

const FLIGHT = 720;
const EASE = "cubic-bezier(0.22, 1, 0.32, 1)";
const REDUCED = "(prefers-reduced-motion: reduce)";
const SWIPE = 40;
/* Slower, at Renato's instruction 2026-07-27: "the liquid transition has to be
   a bit slower and much more fluid". Ink needs time to read as a fluid; under
   about a second it is a wipe. */
const MELT = 1500;

export function Field({ aspects, contact }: { aspects: Aspect[]; contact: ReactNode }) {
  const [at, setAt] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [tall, setTall] = useState(false);
  const [melt, setMelt] = useState<{ from: string; to: string } | null>(null);

  const stage = useRef<HTMLDivElement>(null);
  const camera = useRef<Animation | null>(null);
  const softening = useRef<Animation | null>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const marks = useRef<Record<string, HTMLButtonElement | null>>({});
  const painted = useRef(false);
  const was = useRef<string | null>(null);

  const alt = useMemo(() => {
    const m: Record<string, string> = {};
    for (const a of aspects) for (const k of a.marks) m[k.drawing] = k.alt;
    return m;
  }, [aspects]);

  const set: "wide" | "tall" = tall ? "tall" : "wide";
  const isHero = (d: string) => HERO[ASPECT_OF[d]]?.drawing === d;

  const openAspect = at ? ASPECT_OF[at] : null;
  const aspect = openAspect ? aspects.find((a) => a.id === openAspect) ?? null : null;

  useEffect(() => {
    const mq = window.matchMedia(TALL_QUERY);
    const sync = () => setTall(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* The URL is the state, so back gestures and shared links behave. */
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      setAt(ASPECT_OF[id] ? id : null);
    };
    fromHash();
    window.addEventListener("popstate", fromHash);
    return () => window.removeEventListener("popstate", fromHash);
  }, []);

  const target = useMemo(
    () => (at ? cameraFor(spotOf(at, set), ANCHOR[set], CLOSE[set]) : REST),
    [at, set],
  );

  /* The flight, and the ink that flows with it. */
  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    const previous = was.current;
    was.current = at;

    // The melt is for the five, and only the five. Renato, 2026-07-27: "its only
    // between the main ones that this transition should work perfectly". Moving
    // into or out of a smaller drawing is a camera move and nothing else.
    const between =
      previous !== null && at !== null && previous !== at && isHero(previous) && isHero(at);
    const still = window.matchMedia(REDUCED).matches;
    setMelt(between && !still ? { from: previous, to: at } : null);

    if (!painted.current) {
      painted.current = true;
      el.style.transform = target;
      return;
    }

    // WCAG 2.3.3 names zooming specifically. Reduced motion gets no camera
    // movement at all, not a faster one.
    if (still) {
      camera.current?.cancel();
      softening.current?.cancel();
      camera.current = null;
      el.style.transform = target;
      return;
    }

    // Retarget rather than restart: commit where the camera is, cancel, and let
    // the next animation infer its start from there.
    if (camera.current) {
      try {
        camera.current.commitStyles();
      } catch {
        /* not rendered; the inline transform still holds */
      }
      camera.current.cancel();
    }

    const flight = el.animate([{ transform: target }], {
      duration: between ? MELT : FLIGHT,
      easing: EASE,
      fill: "forwards",
    });
    camera.current = flight;

    flight.finished
      .then(() => {
        if (camera.current !== flight) return;
        // A scale animation is not re-rastered while it runs, so everything is
        // soft for the whole flight. Committing the final transform makes it an
        // ordinary scripted style, which IS re-rastered. (`will-change:
        // transform` would pin the raster forever and is banned.)
        try {
          flight.commitStyles();
        } catch {
          el.style.transform = target;
        }
        flight.cancel();
        camera.current = null;
      })
      .catch(() => {});

    // Blur hides the interpolation of an un-re-rastered scale. Suppressed during
    // a melt: the ink is already carrying the transition, and blurring it too
    // turns the streaks into fog.
    softening.current?.cancel();
    if (!between) {
      softening.current = el.animate(
        [{ filter: "blur(0px)" }, { filter: "blur(2.2px)", offset: 0.42 }, { filter: "blur(0px)" }],
        { duration: FLIGHT, easing: "linear" },
      );
    }
  }, [target, at]);

  useEffect(() => {
    if (at) caption.current?.focus({ preventScroll: true });
  }, [at]);

  /* Sample the five ahead of time, once the page is idle. Every melt is between
     two of them, so this is the whole working set, and it means the first one is
     as fluid as the fifth instead of arriving a beat late. */
  useEffect(() => {
    const warm = () => {
      for (const h of Object.values(HERO)) void inkOf(h.drawing, RATIO[h.drawing]);
    };
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    if (idle) idle(warm);
    else setTimeout(warm, 1200);
  }, []);

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

  /** Up one level: a smaller drawing returns to its hero, a hero to the field. */
  const back = useCallback(() => {
    if (!at) return;
    const up = isHero(at) ? null : HERO[ASPECT_OF[at]].drawing;
    if (window.location.hash.slice(1) === at) window.history.back();
    else go(up);
  }, [at, go]);

  /** Left and right always move, round a ring that wraps. Never into a smaller
   *  drawing: those are reached by clicking one. */
  const nextAspect = useCallback(() => {
    const fromId = at ? ASPECT_OF[at] : null;
    return fromId ? HERO[step(fromId)].drawing : null;
  }, [at]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return back();
      if (e.key !== "ArrowRight" || !at) return;
      const next = nextAspect();
      if (!next) return;
      e.preventDefault();
      go(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [at, back, nextAspect, go]);

  const swipe = useRef<{ x: number; y: number } | null>(null);
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: React.PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || !at) return;
    // Swiping left brings the next one in from the right, the way a map moves.
    // Only that way: the ring turns one direction.
    if (e.clientX - start.x > -SWIPE) return;
    const next = nextAspect();
    if (next) go(next);
  };

  const onward = at ? nextAspect() : null;

  const weight = (drawing: string) => {
    if (melt && (drawing === melt.from || drawing === melt.to)) return "melting";
    if (drawing === at) return "on";
    // A satellite exists only inside its own aspect, and no other aspect is on
    // screen at all once you are in one. Renato, 2026-07-27: "once im in camera
    // i cant see anything music, just arrows to move left right or up".
    if (openAspect) return ASPECT_OF[drawing] === openAspect ? "near" : "gone";
    return isHero(drawing) ? (!hover || hover === ASPECT_OF[drawing] ? "dim" : "mute") : "gone";
  };

  return (
    <div className="world" data-view={at ? "close" : "far"} onPointerDown={onDown} onPointerUp={onUp}>
      <div className="canvas">
        <div className="stage" ref={stage}>
          {/* The five. The whole of the far view. */}
          {Object.entries(HERO).map(([id, h], i) => (
            <button
              key={h.drawing}
              type="button"
              data-weight={weight(h.drawing)}
              ref={(el) => {
                marks.current[h.drawing] = el;
              }}
              className="mark"
              style={
                {
                  "--r": RATIO[h.drawing],
                  "--wx": h.wide.x,
                  "--wy": h.wide.y,
                  "--wh": h.wide.h,
                  "--tx": h.tall.x,
                  "--ty": h.tall.y,
                  "--th": h.tall.h,
                  "--i": i,
                  maskImage: `url(/drawings/detail-${h.drawing}.svg)`,
                  WebkitMaskImage: `url(/drawings/detail-${h.drawing}.svg)`,
                } as React.CSSProperties
              }
              onPointerEnter={() => setHover(id)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(id)}
              onBlur={() => setHover(null)}
              onClick={() => go(h.drawing)}
            >
              <span className="sr-only">
                {`${aspects.find((a) => a.id === id)?.title ?? id}. ${alt[h.drawing] ?? ""}`}
              </span>
            </button>
          ))}

          {/* Everything else, orbiting its hero. Distinct angles on one ring make
              non-overlap true by construction rather than by a solver. The turn
              is a CSS animation, so it costs no JavaScript, and the drawing
              counter-rotates so it stays upright while it travels. */}
          {Object.entries(ORBIT).map(([drawing, o]) => {
            const h = HERO[o.aspect];
            const w = weight(drawing);
            return (
              <span
                key={drawing}
                className="ring"
                data-weight={w}
                style={
                  {
                    "--wx": h.wide.x,
                    "--wy": h.wide.y,
                    "--wr": ringOf(h.wide, h.drawing, "wide"),
                    "--tx": h.tall.x,
                    "--ty": h.tall.y,
                    "--tr": ringOf(h.tall, h.drawing, "tall"),
                    "--turn": o.turn,
                    "--spin": `${ORBIT_SECONDS}s`,
                  } as React.CSSProperties
                }
              >
                <button
                  type="button"
                  className="mark orbiter"
                  data-weight={w}
                  ref={(el) => {
                    marks.current[drawing] = el;
                  }}
                  style={
                    {
                      "--r": RATIO[drawing],
                      // As a fraction of the RING box, not the stage: a
                      // percentage height resolves against the parent, and the
                      // parent here is the square that spins. Passing canvas
                      // percent made every orbiter about a third of its size.
                      "--ohw": (o.h / (2 * ringOf(h.wide, h.drawing, "wide"))) * 100,
                      "--oht":
                        (orbiterH(drawing, "tall") / (2 * ringOf(h.tall, h.drawing, "tall"))) * 100,
                      "--turn": o.turn,
                      "--spin": `${ORBIT_SECONDS}s`,
                      maskImage: `url(/drawings/detail-${drawing}.svg)`,
                      WebkitMaskImage: `url(/drawings/detail-${drawing}.svg)`,
                    } as React.CSSProperties
                  }
                  onClick={() => go(drawing)}
                >
                  <span className="sr-only">{alt[drawing] ?? drawing}</span>
                </button>
              </span>
            );
          })}

          {melt ? (
            <Melt
              key={`${melt.from}->${melt.to}`}
              from={melt.from}
              to={melt.to}
              fromSpot={spotOf(melt.from, set)}
              toSpot={spotOf(melt.to, set)}
              duration={MELT}
              onDone={() => setMelt(null)}
            />
          ) : null}
        </div>

        {/* The five labels. Visible in the far view only: the interaction is not
            discoverable otherwise, and a phone has no hover. */}
        <div className="tags" aria-hidden="true">
          {aspects.map((a) => {
            const h = HERO[a.id];
            if (!h) return null;
            return (
              <span
                key={a.id}
                className="tag"
                data-lit={!at && (!hover || hover === a.id) ? "" : undefined}
                style={
                  {
                    "--wx": h.wide.x,
                    "--wy": h.wide.y,
                    "--wh": h.wide.h,
                    "--tx": h.tall.x,
                    "--ty": h.tall.y,
                    "--th": h.tall.h,
                  } as React.CSSProperties
                }
              >
                {a.title}
              </span>
            );
          })}
        </div>
      </div>

      {/* The words belong to the aspect, so they show at the aspect's own level
          and not when you have gone further in to one of its drawings. */}
      <div className="says">
        <p className="say" data-on={at && isHero(at) ? "" : undefined} tabIndex={-1} ref={caption}>
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

      {/* One control, one direction. The ring wraps, so it is never a dead end
          and never needs a partner pointing the other way. */}
      <nav className="exits" aria-label="Onward" inert={at === null}>
        {onward ? (
          <button type="button" className="exit" onClick={() => go(onward)}>
            <span className="sr-only">Next</span>
            <span aria-hidden="true">&rsaquo;</span>
          </button>
        ) : null}
      </nav>

      <p className="sr-only" aria-live="polite">
        {at ? `${aspect?.title ?? ""}. ${alt[at] ?? ""}` : ""}
      </p>

      <div className="bar">
        <div className="links" inert={at !== null}>
          {contact}
        </div>
        {/* Zooming out, drawn rather than labelled: four corner rules that pull
            outward on hover, which is what the camera is about to do. */}
        <button
          type="button"
          className="back"
          onClick={back}
          inert={at === null}
          aria-label="Zoom out"
        >
          <span className="out" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>
    </div>
  );
}
