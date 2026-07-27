import { RATIO } from "@/lib/ratios";

/**
 * THE FIELD: geometry.
 *
 * Content lives in Postgres (src/content/site.mjs seeds it). This file is the
 * part that is not content: where each drawing sits and how large it is. Design
 * is code on this site and is deliberately not editable, so the composition
 * cannot drift through an admin form.
 *
 * ONE SPACE, NOT TWO SCREENS. Zooming in does not swap to another layout; it
 * moves a camera over this one. What you see zoomed in is exactly what you saw
 * zoomed out, larger, in its own place. Every drawing is a destination.
 *
 * COORDINATES. The canvas is measured 0-100 on both axes at a FIXED aspect
 * ratio per arrangement (1.6 wide, 0.62 tall). Fixing the ratio is what makes
 * the composition exact: a drawing is placed by the CENTRE of its box and sized
 * by HEIGHT alone, and its width, h * RATIO / canvasRatio, is then a constant
 * rather than something that swells on a narrow window. Surplus viewport becomes
 * bare field, which is invisible because the ground is one flat colour.
 *
 * NOTHING OVERLAPS. Not a little, not at 25%: at all. Two traced line figures on
 * top of each other read as one damaged figure, and the whole page is line
 * figures. Positions were authored by hand and then relieved of every collision
 * by a relaxation solver holding a 1.4% gap, which moved nothing more than 2.1%
 * from where it was drawn. A test asserts the zero, so a later nudge cannot
 * quietly reintroduce a collision.
 *
 * DEPTH. The five childhood drawings sit BESIDE the adult they answer and are
 * invisible until the camera comes in close. That is semantic zoom, and it is
 * also the site's whole argument: zoom into the man and the boy is already
 * there, in the same space, with nothing written about it.
 */

export type Spot = { x: number; y: number; h: number };
export type Place = { wide: Spot; tall: Spot; deep?: true };

/** Fixed, so the arrangement is exact rather than merely approximate. */
export const CANVAS = { wide: 1.6, tall: 0.62 };

/** Both the CSS media query and matchMedia use this. They must not disagree. */
export const TALL_QUERY = "(max-aspect-ratio: 19/20)";

export const PLACE: Record<string, Place> = {
  // Brazil, upper left.
  falls: { wide: { x: 18, y: 24, h: 18 }, tall: { x: 33, y: 17, h: 12 } },
  brazil: { wide: { x: 31, y: 18, h: 9 }, tall: { x: 62, y: 14.5, h: 7 }, deep: true },
  "peter-pan": { wide: { x: 31, y: 31, h: 9 }, tall: { x: 86, y: 16, h: 7 }, deep: true },

  // Sport, across the top right and down the right edge.
  tennis: { wide: { x: 73, y: 34, h: 25 }, tall: { x: 70, y: 27.8, h: 17 } },
  serve: { wide: { x: 60, y: 17, h: 12 }, tall: { x: 27, y: 32, h: 9 } },
  running: { wide: { x: 93, y: 25, h: 12 }, tall: { x: 47, y: 41, h: 8 } },
  finish: { wide: { x: 80, y: 55, h: 13 }, tall: { x: 62, y: 44, h: 9 } },
  medal: { wide: { x: 43, y: 22, h: 11 }, tall: { x: 86, y: 43, h: 8 } },
  deadlift: { wide: { x: 93, y: 55, h: 13 }, tall: { x: 11, y: 42, h: 9 } },
  "broken-racket": { wide: { x: 58, y: 52, h: 12 }, tall: { x: 31, y: 48.6, h: 8 } },
  "first-racket": { wide: { x: 88, y: 39, h: 8 }, tall: { x: 48, y: 30, h: 6 }, deep: true },

  // Music, the largest cluster, anchored lower left. The guitar is the biggest
  // thing on the field: the header has already said "software engineer", so the
  // first image is free to break the expectation rather than confirm it.
  guitar: { wide: { x: 16.9, y: 57.6, h: 26 }, tall: { x: 27, y: 62.4, h: 17 } },
  keys: { wide: { x: 35, y: 43, h: 12 }, tall: { x: 56, y: 57, h: 8 } },
  bass: { wide: { x: 35.4, y: 60, h: 13 }, tall: { x: 70.5, y: 63, h: 9 } },
  drums: { wide: { x: 30, y: 76.9, h: 12 }, tall: { x: 88, y: 56, h: 8 } },
  "webcam-guitar": { wide: { x: 7, y: 77.4, h: 11 }, tall: { x: 85.5, y: 70, h: 7 } },
  "broken-sticks": { wide: { x: 20, y: 86, h: 10 }, tall: { x: 61, y: 73, h: 7 } },
  "first-guitar": { wide: { x: 28.1, y: 65.1, h: 9 }, tall: { x: 50, y: 66, h: 7 }, deep: true },

  // Camera, bottom centre.
  camera: { wide: { x: 47.2, y: 75, h: 21 }, tall: { x: 26, y: 81, h: 14 } },
  filmset: { wide: { x: 61, y: 86, h: 11 }, tall: { x: 47, y: 76, h: 7 } },
  "first-camera": { wide: { x: 57.2, y: 68, h: 8 }, tall: { x: 46, y: 86, h: 6 }, deep: true },

  // Software, bottom right.
  working: { wide: { x: 80, y: 79, h: 20 }, tall: { x: 71, y: 85, h: 14 } },
  graduation: { wide: { x: 94, y: 78, h: 15 }, tall: { x: 93, y: 83, h: 10 } },
};

/**
 * How much of the canvas a drawing fills once you are standing in front of it.
 * Not 100%: the point of this zoom is that you still see where you are, so the
 * neighbours stay in frame. Height rather than width, like everything else.
 */
export const CLOSE = { wide: 46, tall: 34 };

/** Where the camera puts the drawing you are looking at. Off centre on a wide
 *  screen so the sentences have a margin; high on a tall one, words underneath. */
export const ANCHOR = {
  wide: { x: 63, y: 48 },
  tall: { x: 50, y: 34 },
};

/**
 * The camera, closed form.
 *
 * With `transform-origin: 0 0`, `translate(tx%, ty%) scale(k)` maps canvas point
 * (cx, cy) to (tx + k*cx, ty + k*cy). Solving for that point landing on the
 * anchor gives tx = ax - k*cx. Percentages inside `translate` resolve against
 * the element's own box, which IS the canvas, so this is correct at every
 * viewport with no measurement, no ResizeObserver and no layout read.
 *
 * `k` is capped so a small drawing does not fly the camera so far in that the
 * field around it leaves the frame. Seeing where you are is the whole point.
 */
export function cameraFor(spot: Spot, anchor: { x: number; y: number }, close: number): string {
  const k = Math.min(4.2, close / spot.h);
  const tx = anchor.x - k * spot.x;
  const ty = anchor.y - k * spot.y;

  return `translate(${tx.toFixed(3)}%, ${ty.toFixed(3)}%) scale(${k.toFixed(4)})`;
}

/** The whole field, seen at once. Written out so both states are one shape. */
export const REST = "translate(0%, 0%) scale(1)";

/** Box in canvas percent. Used by the tests, which assert the zero overlap. */
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
 * Which drawing lies in a given direction, for the arrows and the swipe.
 *
 * A cone rather than a quadrant: candidates within 75 degrees of the direction
 * qualify, and the nearest of those wins. Wide, deliberately, because the rule
 * is that you can always keep moving unless you are genuinely at the edge of the
 * field. A quadrant split would strand a drawing sitting just past 45 degrees,
 * unreachable in both directions.
 *
 * Returning null is then a real answer: there is nothing further that way, and
 * the site says so by not moving.
 */
const CONE = Math.cos((75 * Math.PI) / 180);

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
  // y grows downward on the canvas, so "up" is negative.
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
};
