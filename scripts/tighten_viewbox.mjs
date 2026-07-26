/**
 * Tighten each drawing's viewBox to its actual artwork.
 *
 * WHY: the traces were emitted with a uniform 1024x1024 viewBox, but the figure
 * inside occupies wildly different fractions of it. `graduation` fills 31% of
 * the width, `falls` 75% of the height, `camera` 99% of both. Fitting all of
 * them to one box therefore makes half the plates look accidentally tiny.
 *
 * The first fix for this scaled the mask past the box and let the surplus crop.
 * Renato rejected cropping outright, which is the right call: these are drawings
 * of a person and clipping a head is never acceptable. Tightening the viewBox
 * solves the same problem at the source. Afterwards every drawing fills its own
 * box, so `mask-size: contain` alone produces consistent figure sizes and can
 * never crop, and no per-drawing zoom value is needed anywhere.
 *
 * BOUNDS: measured with getBBox() in a real browser, because these are potrace
 * outputs full of cubic beziers and a control-point bounding box would be wrong.
 * They are recorded here rather than recomputed so the transform is auditable
 * and reproducible without a browser.
 *
 * COORDINATES: the traces wrap everything in
 *   <g transform="translate(0,1024) scale(0.1,-0.1)">
 * so getBBox() reports pre-transform user units. A point (x, y) there lands at
 * (0.1x, 1024 - 0.1y) in viewBox space, which also flips the y axis: the bbox
 * TOP in viewBox space comes from the bbox BOTTOM in path space.
 *
 * Usage: node scripts/tighten_viewbox.mjs [--dry]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BBOX = {
  bass: [843, 330, 9138.5, 9529.1],
  brazil: [510, 385.9, 7815.7, 9544.7],
  "broken-racket": [1073.3, 0, 8506.7, 9508.9],
  "broken-sticks": [602.5, 0, 8825, 9700.8],
  camera: [135.5, 0, 10104.9, 9748],
  deadlift: [2971.7, 785.8, 3958.9, 9212.7],
  drums: [-0.4, -4.2, 10240.4, 9473.5],
  falls: [-2.4, 0, 10242.8, 7717.9],
  filmset: [411.7, 392.2, 8325.7, 9437],
  finish: [2620, -2.6, 4320.1, 9971.3],
  "first-camera": [2039.5, 310.8, 6741.3, 9316.3],
  "first-guitar": [1782.8, 19.6, 7536.2, 9886.9],
  "first-racket": [36.2, 1550.8, 10186.6, 7839],
  graduation: [3643.1, 590.8, 3125.7, 9418.2],
  guitar: [861.1, 381.6, 8948.9, 9506.6],
  keys: [1150, 331.1, 8601.8, 9398],
  medal: [1590.2, 350, 6436.8, 9507.7],
  "peter-pan": [2845.4, 361.8, 4553.6, 9668.3],
  running: [3091.2, 1631, 4273.8, 8025.8],
  serve: [1450, 1260, 7240, 8659.3],
  tennis: [1442.1, 1109.4, 7274.3, 8813.7],
  "webcam-guitar": [0, 1162.4, 10245.2, 8554.5],
  working: [409.4, 1551.3, 9420.6, 8256.3],
};

const S = 0.1; // the scale in the wrapping transform
const FLIP = 1024; // the translate in the wrapping transform
const PAD = 0.006; // breathing room, as a fraction of the longer side

const dry = process.argv.includes("--dry");
const dir = join(process.cwd(), "public", "drawings");

let changed = 0;

for (const [name, [gx, gy, gw, gh]] of Object.entries(BBOX)) {
  const file = join(dir, `detail-${name}.svg`);
  const svg = readFileSync(file, "utf8");

  const w = gw * S;
  const h = gh * S;
  const x = gx * S;
  // y flips: the top of the artwork comes from the far edge of the path bbox.
  const y = FLIP - (gy + gh) * S;

  const pad = Math.max(w, h) * PAD;
  const vb = [x - pad, y - pad, w + pad * 2, h + pad * 2]
    .map((n) => Number(n.toFixed(2)))
    .join(" ");

  const next = svg.replace(/viewBox="[^"]*"/, `viewBox="${vb}"`);
  if (next === svg) {
    console.error(`no viewBox replaced in ${name}`);
    process.exit(1);
  }

  const ratio = (w / h).toFixed(3);
  console.log(`${name.padEnd(15)} ${vb.padEnd(34)} aspect ${ratio}`);

  if (!dry) writeFileSync(file, next);
  changed++;
}

console.log(`\n${dry ? "would tighten" : "tightened"} ${changed} drawings`);
