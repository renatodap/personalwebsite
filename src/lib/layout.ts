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
export const ORBIT_X = { wide: 0.62, tall: 1.0 };
export const TALL_QUERY = "(max-aspect-ratio: 19/20)";

/** One full turn. Slow enough that you notice it only if you stop and look. */
export const ORBIT_SECONDS = 240;

/** The five. These are the whole of the far view. */
/** Ring radius as a fraction of the hero's own height. Constant across aspects
 *  so the ring subtends roughly the same angle whatever you are standing in
 *  front of; a fixed radius makes a small hero's ring fly off the canvas once
 *  the camera zooms in to compensate for its size.
 *
 *  1.15 rather than 0.85 because the ring has to clear the hero's WIDTH, not
 *  its height: `falls` is 1.32:1, so its half-width is a third larger than its
 *  half-height, and at 0.85 an orbiter passing beside it collided. */
export const RING_OF_HERO = 1.28;

export const HERO: Record<string, { drawing: string; wide: Spot; tall: Spot }> = {
  brazil: {
    drawing: "falls",
    wide: { x: 24, y: 32, h: 18 },
    tall: { x: 30, y: 21, h: 12 },
  },
  sport: {
    drawing: "tennis",
    wide: { x: 70, y: 38, h: 25 },
    tall: { x: 64, y: 30, h: 17 },
  },
  music: {
    drawing: "guitar",
    wide: { x: 26, y: 62, h: 26 },
    tall: { x: 36, y: 64, h: 17 },
  },
  camera: {
    drawing: "camera",
    wide: { x: 50, y: 50, h: 21 },
    tall: { x: 40, y: 47, h: 14 },
  },
  software: {
    drawing: "working",
    wide: { x: 72, y: 68, h: 20 },
    tall: { x: 64, y: 76, h: 14 },
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
    { drawing: "serve", h: 11 },
    { drawing: "running", h: 10 },
    { drawing: "finish", h: 11 },
    { drawing: "medal", h: 10 },
    { drawing: "deadlift", h: 11 },
    { drawing: "broken-racket", h: 10 },
    { drawing: "first-racket", h: 9 },
  ],
  music: [
    { drawing: "keys", h: 11 },
    { drawing: "bass", h: 11 },
    { drawing: "drums", h: 11 },
    { drawing: "webcam-guitar", h: 10 },
    { drawing: "broken-sticks", h: 10 },
    { drawing: "first-guitar", h: 9 },
  ],
  camera: [
    { drawing: "filmset", h: 11 },
    { drawing: "first-camera", h: 10 },
  ],
  software: [{ drawing: "graduation", h: 13 }],
};

export const ORBIT: Record<string, Orbiter> = {};
for (const [aspect, ring] of Object.entries(RING)) {
  ring.forEach((o, i) => {
    // Evenly spread, and started off the vertical so nothing sits directly under
    // its hero's label.
    ORBIT[o.drawing] = { aspect, turn: i / ring.length + 0.08, h: o.h };
  });
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
  const r = hero[set].h * RING_OF_HERO;

  return {
    // ONE x factor for both arrangements, not 1/canvasRatio. On the wide canvas
    // 0.62 is very nearly the circle (1/1.6 = 0.625). On the tall one a true
    // circle would need 1.6x, which throws every ring off the sides, so the
    // orbit becomes an ellipse instead. An ellipse reads as an orbit seen at an
    // angle, which is not a compromise anyone can see.
    x: hero[set].x + r * Math.sin(a) * ORBIT_X[set],
    y: hero[set].y - r * Math.cos(a),
    h: o.h,
  };
}

/** How much of the canvas the thing you are looking at fills. */
/* wide 42 / tall 25. The tall number is smaller because x is a percentage of a
   NARROWER box there, so the same ring spans far more of the width: at 32 the
   satellites left the canvas entirely. */
export const CLOSE = { wide: 42, tall: 25 };
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
 * Which aspect lies in a given direction. A 75-degree cone, nearest wins: wide
 * on purpose, because the rule is that you can keep moving unless you are
 * genuinely at the edge. Returning null is a real answer, and the field says so
 * by not moving.
 */
/* 48 degrees. Wider cones read as more forgiving but are not: at 75 the centre
   hero won every direction from everywhere, because it was inside all four
   cones and always nearest, and `software` became unreachable entirely. A cone
   narrow enough to mean "that way" keeps the five-node graph connected, which a
   test asserts from every starting point. */
const CONE = Math.cos((48 * Math.PI) / 180);

export function toward(
  from: Spot,
  candidates: Array<{ id: string; spot: Spot }>,
  dir: [number, number],
): string | null {
  let best: string | null = null;
  let nearest = Infinity;

  for (const c of candidates) {
    const dx = c.spot.x - from.x;
    const dy = c.spot.y - from.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 0.5) continue;
    if ((dx * dir[0] + dy * dir[1]) / dist < CONE) continue;
    if (dist < nearest) {
      nearest = dist;
      best = c.id;
    }
  }

  return best;
}

export const DIRECTIONS: Record<string, [number, number]> = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
};
