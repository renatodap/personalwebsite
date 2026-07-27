import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

import { ASPECTS, SETTINGS } from "../src/content/site.mjs";
import { checkCopy } from "../prisma/copy-rules.mjs";
import { PLACE, ANCHOR, CANVAS, CLOSE, boxOf, cameraFor, toward, DIRECTIONS } from "../src/lib/layout";
import { RATIO } from "../src/lib/ratios";
import { readRatios, render } from "../scripts/ratios.mjs";

type Mark = { drawing: string; alt: string; hero?: boolean };
type Aspect = { id: string; title: string; lines: string[]; marks: Mark[] };

const aspects = ASPECTS as Aspect[];
const marks = aspects.flatMap((a) => a.marks);
const heroes = marks.filter((m) => m.hero);
const onField = marks.filter((m) => PLACE[m.drawing]);

const DRAWINGS = join(process.cwd(), "public", "drawings");
const onDisk = readdirSync(DRAWINGS)
  .filter((f) => f.endsWith(".svg"))
  .map((f) => f.replace(/^detail-/, "").replace(/\.svg$/, ""))
  .sort();

describe("coverage", () => {
  // Renato's standing instruction, as a failing test rather than a good
  // intention: every drawing he made is used. Dropping one during a later edit
  // now breaks the build.
  it("uses every drawing on disk exactly once", () => {
    const used = marks.map((m) => m.drawing).sort();
    expect(used).toEqual(onDisk);
    expect(new Set(used).size).toBe(used.length);
  });

  it("resolves every slug to a file that exists", () => {
    for (const m of marks) {
      expect(existsSync(join(DRAWINGS, `detail-${m.drawing}.svg`)), m.drawing).toBe(true);
    }
  });

  it("hides the childhood drawings until the camera comes in close", () => {
    // They are the payoff for going in, which is the whole reason the wide view
    // is all recent. `deep` is what keeps them invisible standing back; losing
    // it would give the argument away in the first second.
    for (const d of ["brazil", "peter-pan", "first-guitar", "first-racket", "first-camera"]) {
      expect(PLACE[d]?.deep, `${d} must be deep`).toBe(true);
    }
  });

  it("places all twenty-three, and shows eighteen standing back", () => {
    expect(onField).toHaveLength(23);
    expect(onField.filter((m) => !PLACE[m.drawing].deep)).toHaveLength(18);
  });
});

describe("aspects", () => {
  it("gives every aspect exactly one hero, and places it", () => {
    expect(aspects).toHaveLength(5);

    for (const a of aspects) {
      const own = a.marks.filter((m) => m.hero);
      expect(own, `${a.id} heroes`).toHaveLength(1);
      // The hero carries the aspect's label, so it has to be visible standing
      // back or the aspect has no name anywhere.
      expect(PLACE[own[0].drawing], `${a.id} hero placement`).toBeDefined();
      expect(PLACE[own[0].drawing].deep, `${a.id} hero must not be deep`).toBeUndefined();
    }
  });

  it("says at most two sentences", () => {
    for (const a of aspects) {
      expect(a.lines.length, a.id).toBeGreaterThanOrEqual(1);
      expect(a.lines.length, a.id).toBeLessThanOrEqual(2);
    }
  });

  it("holds every aspect id to a URL fragment", () => {
    for (const a of aspects) expect(a.id).toMatch(/^[a-z][a-z0-9-]*$/);
  });
});

describe("composition", () => {
  // The wide canvas is clamped to 1.9:1 and the tall one to 0.62:1; these are
  // the ratios each arrangement is actually authored against.
  // The canvas ratio is FIXED per arrangement, so these are the real numbers
  // rather than a sample of a range: the composition is exact at every viewport.
  const SETS = [
    { name: "wide", ratio: CANVAS.wide, key: "wide" as const },
    { name: "tall", ratio: CANVAS.tall, key: "tall" as const },
  ];

  for (const set of SETS) {
    it(`keeps every ${set.name} drawing inside the canvas`, () => {
      for (const m of onField) {
        const box = boxOf(PLACE[m.drawing][set.key], m.drawing, set.ratio);
        expect(box.left, `${m.drawing} left`).toBeGreaterThan(-2);
        expect(box.right, `${m.drawing} right`).toBeLessThan(102);
        expect(box.top, `${m.drawing} top`).toBeGreaterThan(-2);
        expect(box.bottom, `${m.drawing} bottom`).toBeLessThan(102);
      }
    });

    it(`lets no two ${set.name} drawings overlap AT ALL`, () => {
      // Not "a little": at all. Two traced line figures on top of each other
      // read as one damaged figure, and the whole page is line figures. Renato,
      // 2026-07-27: "no overlaps are allowed at all". Positions were relieved of
      // every collision by a solver holding a 1.4% gap; this is the guard that
      // stops a later nudge quietly putting one back.
      for (let i = 0; i < onField.length; i++) {
        for (let j = i + 1; j < onField.length; j++) {
          const a = boxOf(PLACE[onField[i].drawing][set.key], onField[i].drawing, set.ratio);
          const b = boxOf(PLACE[onField[j].drawing][set.key], onField[j].drawing, set.ratio);

          const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
          const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);

          expect(
            Math.min(ox, oy),
            `${onField[i].drawing} touches ${onField[j].drawing} (${set.name})`,
          ).toBeLessThanOrEqual(0);
        }
      }
    });

    it(`keeps every ${set.name} hero larger than every other drawing`, () => {
      // The weights are the whole way in. A drawing that outgrows a hero makes
      // the field unreadable as a set of destinations.
      const heroSizes = heroes.map((m) => PLACE[m.drawing][set.key].h);
      const restSizes = onField.filter((m) => !m.hero).map((m) => PLACE[m.drawing][set.key].h);
      expect(Math.min(...heroSizes)).toBeGreaterThan(Math.max(...restSizes));
    });
  }

  it("reaches every drawing from every other by arrow keys", () => {
    // Renato, 2026-07-27: "always able to move up and down and left and right
    // unless genuinely at the corner or side". The cone may legitimately return
    // null at an edge, but the graph as a whole has to be connected or a drawing
    // becomes unreachable once you are in close.
    for (const set of ["wide", "tall"] as const) {
      const spots = onField.map((m) => ({ id: m.drawing, spot: PLACE[m.drawing][set] }));

      for (const start of spots) {
        const seen = new Set([start.id]);
        const queue = [start];

        while (queue.length) {
          const here = queue.shift()!;
          for (const dir of Object.values(DIRECTIONS)) {
            const next = toward(
              here.spot,
              spots.filter((s) => s.id !== here.id),
              dir,
            );
            if (next && !seen.has(next)) {
              seen.add(next);
              queue.push(spots.find((s) => s.id === next)!);
            }
          }
        }

        expect(seen.size, `${set}: reachable from ${start.id}`).toBe(spots.length);
      }
    }
  });
});

describe("camera", () => {
  it("lands whatever you picked on the anchor", () => {
    for (const set of ["wide", "tall"] as const) {
      for (const m of onField) {
        const hero = PLACE[m.drawing][set];
        const anchor = ANCHOR[set];
        const grow = CLOSE[set];

        const transform = cameraFor(hero, anchor, grow);
        const [, tx, ty, k] = transform
          .match(/translate\((-?[\d.]+)%, (-?[\d.]+)%\) scale\(([\d.]+)\)/)!
          .map(Number) as unknown as [string, number, number, number];

        // The identity the whole interaction rests on: canvas point -> anchor.
        expect(tx + k * hero.x).toBeCloseTo(anchor.x, 2);
        expect(ty + k * hero.y).toBeCloseTo(anchor.y, 2);

        // A camera that zoomed OUT to reach something would read as a mistake,
        // and the cap keeps a small drawing from flying the field out of frame.
        expect(k, `${m.drawing} ${set} zoom`).toBeGreaterThan(1);
        expect(k, `${m.drawing} ${set} cap`).toBeLessThanOrEqual(4.2);
      }
    }
  });
});

describe("assets", () => {
  it("keeps src/lib/ratios.ts in step with the SVGs on disk", () => {
    // Hand-editing a ratio, or retracing a drawing without regenerating, would
    // silently stretch a figure from then on.
    const committed = readFileSync(join(process.cwd(), "src", "lib", "ratios.ts"), "utf8");
    expect(committed).toBe(render(readRatios()));
  });

  it("has a ratio for every drawing", () => {
    for (const m of marks) expect(RATIO[m.drawing], m.drawing).toBeGreaterThan(0);
  });

  it("ships no baked colour in any drawing", () => {
    // The ground is always --field and the ink is always CSS-supplied. A fill
    // baked into a trace would survive both tokens.
    for (const d of onDisk) {
      const svg = readFileSync(join(DRAWINGS, `detail-${d}.svg`), "utf8");
      expect(svg, d).not.toMatch(/fill="(?!currentColor|none)[^"]+"/);
    }
  });
});

describe("copy", () => {
  const visible: Array<[string, string]> = [
    ...aspects.flatMap((a): Array<[string, string]> => [
      [`${a.id} title`, a.title],
      ...a.lines.map((l, i): [string, string] => [`${a.id} line ${i + 1}`, l]),
    ]),
    ...marks.map((m): [string, string] => [`${m.drawing} alt`, m.alt]),
    ["subjectName", SETTINGS.subjectName],
    ["subjectRole", SETTINGS.subjectRole],
    ["subjectLocation", SETTINGS.subjectLocation],
  ];

  it("passes the copy guard on every visible string", () => {
    for (const [where, text] of visible) {
      const violations = checkCopy(text) as Array<{ kind: string; match: string }>;
      const detail = violations.map((v) => `${v.kind}: "${v.match}"`).join("; ");
      expect(violations, `${where} -> ${detail}`).toHaveLength(0);
    }
  });

  it("contains no em-dash or en-dash anywhere visible", () => {
    // Called out separately from the guard because it is the single most
    // reliable machine-written tell and the easiest to reintroduce by accident.
    for (const [where, text] of visible) {
      expect(text, where).not.toMatch(/[—–]/);
    }
  });

  it("drops 'Lead' from the role", () => {
    expect(SETTINGS.subjectRole).toBe("Software engineer");
  });

  it("names the degree and not the switch", () => {
    // Renato cut the mechanical-engineering sentence and asked for the degree
    // instead. Both halves of that instruction, as a test.
    const all = aspects.flatMap((a) => a.lines).join(" ");
    expect(all).toContain("Rose-Hulman");
    expect(all).not.toMatch(/mechanical engineering/i);
  });

  it("says he taught himself music", () => {
    expect(aspects.find((a) => a.id === "music")?.lines[0]).toBe("I taught myself music.");
  });
});

describe("prohibitions", () => {
  // Comments are stripped first. Every rule below is documented in the source it
  // guards, so matching raw text would fail on the explanation of the ban rather
  // than on the ban being broken.
  const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

  const source = ["src/app/globals.css", "src/components/field.tsx"]
    .map((f) => strip(readFileSync(join(process.cwd(), f), "utf8")))
    .join("\n");

  it("never sets will-change: transform", () => {
    // It pins the layer to a fixed bitmap that never re-rasters under transform,
    // which would leave the zoomed drawing permanently soft. See
    // docs/research/2026-07-26-zoomable-montage-research.md.
    expect(source).not.toMatch(/will-change:\s*transform/);
    expect(source).not.toMatch(/willChange/);
  });

  it("never listens to scroll", () => {
    // Nothing scrolls. A scroll listener here would mean it does.
    expect(source).not.toMatch(/addEventListener\(\s*["']scroll/);
  });

  it("never crops a drawing", () => {
    expect(source).not.toMatch(/mask-size:\s*cover/);
    expect(source).not.toMatch(/object-fit:\s*cover/);
  });
});
