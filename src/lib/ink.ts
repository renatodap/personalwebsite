/**
 * Turns a drawing into ink: a cloud of points where the figure actually is.
 *
 * WHY POINTS AND NOT PATHS. These are potrace outputs and they are wildly
 * uneven: `guitar` is 4 subpaths, `falls` is 140. Every path-morphing tool,
 * MorphSVG included, maps subpath to subpath, so morphing those two leaves 136
 * shapes with nowhere to go and they have to collapse to nothing mid-flight.
 * That reads as deletion, not as flow. A point cloud costs whatever N you ask
 * for regardless of what it was sampled from, so the guitar and the waterfall
 * animate identically. See docs/research/2026-07-27-liquid-deconstruct-reconstruct.md.
 *
 * WHY THE ALPHA CHANNEL AND NOT getPointAtLength. The native method is expensive
 * per call and these are thousands of calls. Rasterising the SVG once and reading
 * where the ink landed is a single decode plus one pass over a small buffer, it
 * needs no path parsing and no library, and it samples the FILLED artwork, which
 * is what is actually on screen, rather than the outline of it.
 *
 * Sampled once per drawing and kept. The raster is thrown away immediately; only
 * the points survive.
 */

/** Normalised to the drawing's own box: x and y both run 0 to 1. */
export type Ink = Float32Array;

const cache = new Map<string, Ink>();
const pending = new Map<string, Promise<Ink>>();

/** Raster size for sampling. Small on purpose: we want where the ink IS, not a
 *  faithful reproduction, and 220px already resolves a hairline. */
const GRID = 220;

/** Above this the pixel counts as ink. Low, because these are thin lines that
 *  antialias to fairly transparent values at this raster size. */
const FLOOR = 26;

export const POINTS = 2600;

function collect(data: Uint8ClampedArray, w: number, h: number, want: number): Ink {
  // One pass to find the ink, then an even stride through it. A stride rather
  // than random sampling because random leaves visible clumps and holes at these
  // counts, and the eye reads a clump in a line drawing as a blot.
  const found: number[] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > FLOOR) found.push(x, y);
    }
  }

  const total = found.length / 2;
  if (total === 0) return new Float32Array(0);

  const n = Math.min(want, total);
  const out = new Float32Array(n * 2);
  const step = total / n;

  for (let i = 0; i < n; i++) {
    const j = Math.floor(i * step) * 2;
    out[i * 2] = found[j] / w;
    out[i * 2 + 1] = found[j + 1] / h;
  }

  return out;
}

export function inkOf(drawing: string, ratio: number): Promise<Ink> {
  const hit = cache.get(drawing);
  if (hit) return Promise.resolve(hit);

  const already = pending.get(drawing);
  if (already) return already;

  const job = new Promise<Ink>((resolve) => {
    const img = new Image();
    img.decoding = "async";

    img.onload = () => {
      // The box keeps the drawing's own proportions, so a point's normalised
      // coordinates mean the same thing here as they do in the layout.
      const w = ratio >= 1 ? GRID : Math.max(8, Math.round(GRID * ratio));
      const h = ratio >= 1 ? Math.max(8, Math.round(GRID / ratio)) : GRID;

      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      if (!ctx) return resolve(new Float32Array(0));

      ctx.drawImage(img, 0, 0, w, h);
      const points = collect(ctx.getImageData(0, 0, w, h).data, w, h, POINTS);

      cache.set(drawing, points);
      pending.delete(drawing);
      resolve(points);
    };

    // A drawing that will not decode simply gets no melt; the camera still
    // flies and the masks still render, so nothing on the page is lost.
    img.onerror = () => {
      cache.set(drawing, new Float32Array(0));
      pending.delete(drawing);
      resolve(new Float32Array(0));
    };

    img.src = `/drawings/detail-${drawing}.svg`;
  });

  pending.set(drawing, job);
  return job;
}

/**
 * Pairs two clouds so ink travels a short way rather than across the frame.
 *
 * Both are sorted on the same spatial key before pairing by index, which keeps
 * the top of one figure becoming the top of the next. Pairing raw index order
 * instead sends ink from a shoulder to a foot, and the result reads as noise
 * being shuffled rather than as one thing becoming another.
 *
 * The key is y-major, coarsely banded, so the sort is stable across two figures
 * of different shapes: sorting purely by y makes every horizontal line fight for
 * order, and purely by x ignores that these are standing human figures.
 */
export function order(ink: Ink): Uint32Array {
  const n = ink.length / 2;
  const index = new Uint32Array(n);
  for (let i = 0; i < n; i++) index[i] = i;

  const key = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const band = Math.round(ink[i * 2 + 1] * 22);
    key[i] = band * 2 + ink[i * 2];
  }

  return index.sort((a, b) => key[a] - key[b]);
}
