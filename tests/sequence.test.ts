import { describe, it, expect } from "vitest";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

// Plain .mjs, shared with the seed script so the tests and the seeded data can
// never disagree about what ships.
import { SEQUENCE, SETTINGS } from "../prisma/sequence.mjs";
import { checkCopy } from "../prisma/copy-rules.mjs";

type Plate = { drawing: string; alt: string };
type Frame = { kind: "PLATE" | "RUN" | "PAIR"; caption: string; plates: Plate[] };

const frames = SEQUENCE as Frame[];
const plates = frames.flatMap((f) => f.plates);

const DRAWINGS_DIR = join(process.cwd(), "public", "drawings");

const onDisk = readdirSync(DRAWINGS_DIR)
  .filter((f) => f.endsWith(".svg"))
  .map((f) => f.replace(/^detail-/, "").replace(/\.svg$/, ""))
  .sort();

describe("coverage", () => {
  // Renato's instruction, as a failing test rather than a good intention:
  // "use as many of the svg renderings as possible as you see fit to tell the
  // story well". Dropping a drawing during a later edit now breaks the build.
  it("uses every drawing on disk exactly once", () => {
    const used = plates.map((p) => p.drawing).sort();

    expect(used).toEqual(onDisk);
    expect(new Set(used).size).toBe(used.length);
  });

  it("resolves every slug to a file that exists", () => {
    for (const p of plates) {
      const file = join(DRAWINGS_DIR, `detail-${p.drawing}.svg`);
      expect(existsSync(file), `missing drawing: ${p.drawing}`).toBe(true);
    }
  });
});

describe("composition", () => {
  it("agrees between kind and plate count", () => {
    for (const [i, f] of frames.entries()) {
      const n = f.plates.length;
      const where = `frame ${i + 1} (${f.kind})`;

      if (f.kind === "PLATE") expect(n, where).toBe(1);
      if (f.kind === "PAIR") expect(n, where).toBe(2);
      if (f.kind === "RUN") {
        expect(n, where).toBeGreaterThanOrEqual(2);
        expect(n, where).toBeLessThanOrEqual(4);
      }
    }
  });

  it("never captions a PAIR", () => {
    // The wear frame is the peak and is silent on purpose: a caption would state
    // the contradiction the two images already are.
    for (const f of frames) {
      if (f.kind === "PAIR") expect(f.caption).toBe("");
    }
  });

  it("carries no per-plate sizing", () => {
    // Sizing lives in the asset, not the data. A zoom field returning here would
    // mean something started cropping drawings again.
    for (const p of plates) {
      expect(Object.keys(p).sort(), p.drawing).toEqual(["alt", "drawing"]);
    }
  });

  it("keeps most of the twelve frames wordless", () => {
    // Words are rare and expensive: a sentence has to earn its place against the
    // alternative of a drawing.
    const silent = frames.filter((f) => f.caption === "").length;

    expect(frames.length).toBe(12);
    expect(silent).toBeGreaterThanOrEqual(6);
  });

  it("never captions the closing run of frames", () => {
    // Frames 9 through 12 close the page in silence: the falls, the boy with the
    // flag, the three childhood plates, then Peter Pan. The viewer supplies the
    // sentence, which is the one thing Renato forbade anyone to write.
    for (const f of frames.slice(8)) expect(f.caption).toBe("");
  });
});

describe("copy", () => {
  const visible: Array<[string, string]> = [
    ...frames.map((f, i): [string, string] => [`frame ${i + 1} caption`, f.caption]),
    ...plates.map((p): [string, string] => [`${p.drawing} alt`, p.alt]),
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
});
