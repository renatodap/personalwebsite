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
/**
 * Sideways reach of the ring per unit of vertical reach.
 *
 * DERIVED, not chosen. The ring is a square box that spins, so the orbiter rides
 * a circle in PIXELS whatever else is true; converting that circle into canvas
 * percent divides by the canvas ratio, because a percent of width is a different
 * number of pixels from a percent of height. Hand-picking these (0.62 and 1.45)
 * meant the model described an ellipse the CSS was never drawing, and every
 * clearance computed from it was wrong on the tall canvas.
 */
export const ORBIT_X = { wide: 1 / CANVAS.wide, tall: 1 / CANVAS.tall };

/** Orbiters run smaller on the tall canvas. Its heroes are smaller too, and a
 *  ring has to clear both boxes, so carrying the wide sizes across left the
 *  narrow arrangement permanently over-constrained: every fix to one collision
 *  opened another. Scaling the ring's contents is the structural fix. */
export const ORBITER_SCALE = { wide: 1, tall: 0.55 };
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

/** Clear ground between a hero and its orbiters, in canvas percent. */
const GAP = 3.2;

export const HERO: Record<string, { drawing: string; wide: Spot; tall: Spot }> = {
  brazil: {
    drawing: "falls",
    wide: { x: 19, y: 27, h: 21 },
    tall: { x: 34, y: 15, h: 12 },
  },
  sport: {
    drawing: "tennis",
    wide: { x: 50, y: 24, h: 24 },
    tall: { x: 64, y: 33, h: 13 },
  },
  music: {
    drawing: "guitar",
    wide: { x: 24, y: 72, h: 25 },
    tall: { x: 32, y: 55, h: 13 },
  },
  camera: {
    drawing: "camera",
    wide: { x: 55, y: 74, h: 22 },
    tall: { x: 64, y: 72, h: 12 },
  },
  software: {
    drawing: "working",
    wide: { x: 81, y: 26, h: 22 },
    tall: { x: 34, y: 88, h: 12 },
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

/** A box's half-width, in canvas percent OF WIDTH. Height is `h` by definition,
 *  so this is the only one that needs deriving, and it is the one that was
 *  missing: it depends on the canvas ratio, so it is different in the two
 *  arrangements even for the same drawing. */
function halfW(h: number, drawing: string, set: "wide" | "tall"): number {
  return (h * RATIO[drawing]) / CANVAS[set] / 2;
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
  const own = Object.keys(ORBIT).filter((d) => ASPECT_OF[d] === ASPECT_OF[drawing]);
  const tallest = Math.max(...own.map((d) => orbiterH(d, set)), 0);
  const widest = Math.max(...own.map((d) => halfW(orbiterH(d, set), d, set)), 0);

  // Checking the two axes is not enough, and this is the bug that survived
  // three passes: an orbiter clears the hero directly above it and directly
  // beside it and still cuts the CORNER on the diagonal between them. The
  // condition that actually holds at every angle is that the hero's box, grown
  // by the orbiter's half-size and the gap, fits entirely INSIDE the orbit
  // ellipse. Putting the corner on the ellipse and solving for the radius:
  const cornerX = (halfW(hero.h, drawing, set) + widest + GAP) / ORBIT_X[set];
  const cornerY = hero.h / 2 + tallest / 2 + GAP;

  return Math.max(hero.h * RING_OF_HERO, Math.hypot(cornerX, cornerY));
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
/* Zoomed out further than feels natural to write, and the reason is `falls`:
   at 1.32:1 it is the widest hero, so its ring is the largest, and the camera
   has to stand back far enough to keep that whole ring in frame. The number is
   set by the worst case, not the typical one. */
/**
 * Zoom is derived from the RING, not from the hero, and that inversion is the
 * fix. Sizing it from the hero assumed every aspect needed the same
 * magnification, but the thing that has to fit on screen is the whole orbit,
 * and orbits differ: `falls` is 1.32:1, so its orbiters must swing wide to clear
 * it and its ring is half again the size of `software`'s. Framing the hero
 * therefore framed some rings and cut others off.
 *
 * Now each aspect zooms to whatever shows its own ring whole. The hero's size on
 * screen varies a little between aspects as a result, which is the correct trade
 * and is barely visible.
 */
const FRAME = 44;
const ZOOM = { min: 1.25, max: 3.4 };

export function zoomFor(drawing: string, set: "wide" | "tall"): number {
  const hero = HERO[ASPECT_OF[drawing]];
  const own = Object.keys(ORBIT).filter((d) => ASPECT_OF[d] === ASPECT_OF[drawing]);
  const ring = ringOf(hero[set], hero.drawing, set);

  // The furthest any part of this aspect reaches from the hero's centre, on
  // whichever axis reaches further.
  const outY = ring + Math.max(...own.map((d) => orbiterH(d, set)), 0) / 2;
  const outX =
    ring * ORBIT_X[set] + Math.max(...own.map((d) => halfW(orbiterH(d, set), d, set)), 0);

  return Math.min(ZOOM.max, Math.max(ZOOM.min, FRAME / Math.max(outY, outX)));
}
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
export function cameraFor(spot: Spot, anchor: { x: number; y: number }, k: number): string {
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
export const ORDER = ["brazil", "music", "sport", "camera", "software"];

/** Forward only, and it wraps: software goes to brazil. One direction is a
 *  simpler promise than two, and a ring that only turns one way can never leave
 *  anyone wondering which way they came from. */
export function step(aspectId: string): string {
  const i = ORDER.indexOf(aspectId);
  return i < 0 ? ORDER[0] : ORDER[(i + 1) % ORDER.length];
}

/** The orbiters of one aspect, in the order they were seeded. */
export function ringOrder(aspectId: string): string[] {
  return Object.keys(ORBIT).filter((d) => ORBIT[d].aspect === aspectId);
}

/** Forward through one aspect's own drawings, wrapping. Standing in front of a
 *  small one, onward means the next small one, not the next aspect. */
export function stepWithin(drawing: string): string {
  const own = ringOrder(ASPECT_OF[drawing]);
  const i = own.indexOf(drawing);
  return i < 0 ? own[0] : own[(i + 1) % own.length];
}

/** How large a small drawing grows when you stand in front of it, as a share of
 *  canvas height. Generous: at that level it is the only thing being looked at. */
export const NEAR = 34;
