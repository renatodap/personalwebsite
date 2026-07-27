import { RATIO } from "@/lib/ratios";

/**
 * THE FIELD: geometry. Content lives in Postgres; this is the part that is not
 * content, and it is deliberately not editable.
 *
 * THREE LEVELS, one space.
 *
 *   FAR    the five heroes alone on the canvas. Nothing else is drawn.
 *   ASPECT the camera stands in front of one hero. Its own drawings appear,
 *          orbiting it, and its sentences appear. Nobody else's do.
 *   NEAR   the camera stands in front of one of those smaller drawings. No
 *          sentences: the words belong to the aspect, not to each drawing.
 *
 * Arrows and swipe move between the FIVE ASPECTS only, never into a smaller
 * drawing. You reach those by clicking one, which is a different intent and
 * deserves a different gesture.
 *
 * ORBITS, NOT A SCATTER. A satellite is placed by a radius and an angle around
 * its hero rather than by an authored coordinate. That makes "nothing overlaps"
 * true by construction instead of true because a solver made it so: one ring per
 * aspect, satellites spread evenly around it, radius chosen to clear the hero.
 * They turn, very slowly, so the field is never quite still.
 */

export type Spot = { x: number; y: number; h: number };

/** Fixed, so the arrangement is exact rather than approximate. */
export const CANVAS = { wide: 1.6, tall: 0.62 };

/** How far the ring reaches sideways, as a fraction of its vertical reach.
 *  0.62 on wide is very nearly a true circle (1/1.6). On tall a true circle
 *  would need 1.6x and throw every ring off the sides, while squeezing x
 *  instead pulls the ring inside the hero's own width, so the orbit is simply
 *  taller than it is wide there. Both read as an orbit seen at an angle. */
export const ORBIT_X = { wide: 0.62, tall: 1.45 };

/** Orbiters run smaller on the tall canvas. Its heroes are smaller too, and a
 *  ring has to clear both boxes, so carrying the wide sizes across left the
 *  narrow arrangement permanently over-constrained: every fix to one collision
 *  opened another. Scaling the ring's contents is the structural fix. */
export const ORBITER_SCALE = { wide: 1, tall: 0.7 };
export const TALL_QUERY = "(max-aspect-ratio: 19/20)";

/** One full turn: fifteen minutes. Slow enough that nothing appears to move at
 *  all, and the arrangement is simply different if you come back to it. Renato,
 *  2026-07-27: "make the orbit a lot slower. a lot slower". */
export const ORBIT_SECONDS = 900;

/** The five. These are the whole of the far view. */
/** Ring radius as a fraction of the hero's own height. Constant across aspects
 *  so the ring subtends roughly the same angle whatever you are standing in
 *  front of; a fixed radius makes a small hero's ring fly off the canvas once
 *  the camera zooms in to compensate for its size.
 *
 *  A FLOOR, not the answer: ringOf() below takes whichever is larger, this or
 *  the clearance the hero's own width actually needs. A single ratio has to be
 *  sized for the widest hero and then everything else is flung needlessly far
 *  out; computing it per hero keeps the orbiters in close, which is the point.
 *  Renato, 2026-07-27: "make sure the ones orbiting are closer in". */
export const RING_OF_HERO = 0.5;

export const HERO: Record<string, { drawing: string; wide: Spot; tall: Spot }> = {
  brazil: {
    drawing: "falls",
    wide: { x: 20, y: 30, h: 28 },
    tall: { x: 42, y: 16, h: 15 },
  },
  sport: {
    drawing: "tennis",
    wide: { x: 48, y: 25, h: 33 },
    tall: { x: 58, y: 33, h: 14 },
  },
  music: {
    drawing: "guitar",
    wide: { x: 28, y: 74, h: 38 },
    tall: { x: 34, y: 54, h: 18 },
  },
  camera: {
    drawing: "camera",
    wide: { x: 68, y: 75, h: 32 },
    tall: { x: 62, y: 71, h: 17 },
  },
  software: {
    drawing: "working",
    wide: { x: 82, y: 26, h: 32 },
    tall: { x: 38, y: 90, h: 17 },
  },
};

/**
 * Everything else, by the aspect it orbits. `turn` is the starting angle in
 * turns, spread evenly by the seeder below; `h` is its height in canvas percent.
 */
export type Orbiter = { aspect: string; turn: number; h: number };

const RING: Record<string, Array<{ drawing: string; h: number }>> = {
  brazil: [
    { drawing: "brazil", h: 10 },
    { drawing: "peter-pan", h: 10 },
  ],
  sport: [
    { drawing: "serve", h: 10 },
    { drawing: "running", h: 10 },
    { drawing: "finish", h: 10 },
    { drawing: "medal", h: 10 },
    { drawing: "deadlift", h: 10 },
    { drawing: "broken-racket", h: 10 },
    { drawing: "first-racket", h: 9 },
  ],
  music: [
    { drawing: "keys", h: 10 },
    { drawing: "bass", h: 10 },
    { drawing: "drums", h: 10 },
    { drawing: "webcam-guitar", h: 10 },
    { drawing: "broken-sticks", h: 10 },
    { drawing: "first-guitar", h: 9 },
  ],
  camera: [
    { drawing: "filmset", h: 10 },
    { drawing: "first-camera", h: 10 },
  ],
  software: [{ drawing: "graduation", h: 12 }],
};

export const ORBIT: Record<string, Orbiter> = {};
for (const [aspect, ring] of Object.entries(RING)) {
  ring.forEach((o, i) => {
    // Evenly spread, and started off the vertical so nothing sits directly under
    // its hero's label.
    ORBIT[o.drawing] = { aspect, turn: i / ring.length + 0.08, h: o.h };
  });
}

/** Half-extent of a box in canvas-height units, whichever way it is bigger. */
function reach(h: number, drawing: string): number {
  return (h * Math.max(1, RATIO[drawing])) / 2;
}

/** An orbiter's height in a given arrangement. */
export function orbiterH(drawing: string, set: "wide" | "tall"): number {
  return ORBIT[drawing].h * ORBITER_SCALE[set];
}

/**
 * Ring radius for one hero: the larger of the floor above and the clearance the
 * two boxes actually demand. Both halves matter and both vary. A hero is as wide
 * as h * ratio, so `falls` at 1.32:1 needs a third more room than its height
 * suggests while a narrow figure keeps its orbiters tucked in close; and the
 * widest orbiter on the ring sets the other half, which is why `drums` at
 * 1.08:1 pushed the music ring out further than the drawings around it.
 */
export function ringOf(hero: { h: number }, drawing: string, set: "wide" | "tall" = "wide"): number {
  const aspect = ASPECT_OF[drawing];
  const widest = Math.max(
    ...Object.keys(ORBIT)
      .filter((d) => ASPECT_OF[d] === aspect)
      .map((d) => reach(orbiterH(d, set), d)),
    0,
  );
  return Math.max(hero.h * RING_OF_HERO, reach(hero.h, drawing) + widest + 5.0);
}

export const HEROES = Object.values(HERO).map((h) => h.drawing);
export const ASPECT_OF: Record<string, string> = {};
for (const [id, h] of Object.entries(HERO)) ASPECT_OF[h.drawing] = id;
for (const [d, o] of Object.entries(ORBIT)) ASPECT_OF[d] = o.aspect;

/** Where a drawing is right now, ignoring the slow turn. Used by the camera and
 *  by the tests; the turn itself is a CSS animation and the camera does not
 *  chase it, because chasing a 240-second rotation would be motion for nothing. */
export function spotOf(drawing: string, set: "wide" | "tall"): Spot {
  const hero = HERO[ASPECT_OF[drawing]];
  if (hero.drawing === drawing) return hero[set];

  const o = ORBIT[drawing];
  const a = o.turn * Math.PI * 2;
  const r = ringOf(hero[set], hero.drawing, set);

  return {
    // ONE x factor for both arrangements, not 1/canvasRatio. On the wide canvas
    // 0.62 is very nearly the circle (1/1.6 = 0.625). On the tall one a true
    // circle would need 1.6x, which throws every ring off the sides, so the
    // orbit becomes an ellipse instead. An ellipse reads as an orbit seen at an
    // angle, which is not a compromise anyone can see.
    x: hero[set].x + r * Math.sin(a) * ORBIT_X[set],
    y: hero[set].y - r * Math.cos(a),
    h: orbiterH(drawing, set),
  };
}

/** How much of the canvas the thing you are looking at fills. */
/* wide 42 / tall 25. The tall number is smaller because x is a percentage of a
   NARROWER box there, so the same ring spans far more of the width: at 32 the
   satellites left the canvas entirely. */
export const CLOSE = { wide: 40, tall: 22 };
/* Off centre on a wide screen so the sentences own the left third and never sit
   under a satellite; centred on a tall one, with the words below the ring. */
export const ANCHOR = { wide: { x: 63, y: 50 }, tall: { x: 50, y: 38 } };

/**
 * The camera, closed form. With `transform-origin: 0 0`,
 * `translate(tx%, ty%) scale(k)` maps canvas point (cx, cy) to
 * (tx + k*cx, ty + k*cy); solving for the anchor gives tx = ax - k*cx.
 * Percentages resolve against the stage's own box, which IS the canvas, so this
 * is correct at every viewport with no measurement and no layout read.
 */
export function cameraFor(spot: Spot, anchor: { x: number; y: number }, close: number): string {
  const k = Math.min(4.6, close / spot.h);
  return `translate(${(anchor.x - k * spot.x).toFixed(3)}%, ${(anchor.y - k * spot.y).toFixed(3)}%) scale(${k.toFixed(4)})`;
}

export const REST = "translate(0%, 0%) scale(1)";

export function boxOf(spot: Spot, drawing: string, canvasRatio: number) {
  const w = (spot.h * RATIO[drawing]) / canvasRatio;
  return {
    left: spot.x - w / 2,
    right: spot.x + w / 2,
    top: spot.y - spot.h / 2,
    bottom: spot.y + spot.h / 2,
  };
}

/**
 * Navigation is a RING, not a compass. Left and right always move, in a fixed
 * order that wraps, so there is no such thing as a dead end and no direction
 * that quietly does nothing. Renato, 2026-07-27: "allow me to move always left
 * and right no matter what, keep the same order but make it rotating".
 *
 * This replaces a spatial cone that chose the nearest hero in the direction you
 * pressed. It read well on paper and badly in the hand: the centre hero was
 * inside all four cones from everywhere and won every direction, some pairs were
 * mutually unreachable, and half the presses did nothing at all.
 *
 * The order is the order of the aspects as seeded, so it is content, and it is
 * the same order every time.
 */
export const ORDER = ["brazil", "music", "camera", "sport", "software"];

export function step(aspectId: string, by: 1 | -1): string {
  const i = ORDER.indexOf(aspectId);
  if (i < 0) return ORDER[0];
  return ORDER[(i + by + ORDER.length) % ORDER.length];
}
