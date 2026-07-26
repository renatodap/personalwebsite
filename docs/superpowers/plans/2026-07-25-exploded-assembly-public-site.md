# Exploded Assembly — Public Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild renatodap.me from scratch as a database-backed orthographic exploded-assembly drawing — Sheet 1, detail sheets, and a revision history — replacing the current implementation entirely.

**Architecture:** Next.js App Router with all rendering server-side from PostgreSQL via Prisma. The drawing is real SVG with semantic `<title>`/`<desc>`, never rasterised text. The one site-wide motion (the assembly exploding) is a CSS scroll-driven animation with no JavaScript, degrading to the assembled state where unsupported. Crop-to-sheet navigation is a real route change wrapped in a same-document View Transition, so URLs stay shareable and Back works.

**Tech Stack:** Next.js 15.4.8 · React 19 · TypeScript · Tailwind v4 · Prisma 6 + PostgreSQL · sharp · Vitest + Testing Library · Barlow Condensed + Martian Mono via `next/font/google`

**Scope:** Phases 1–3 of the spec. Admin (Phase 4) and live dimensions (Phase 5) are separate plans. Every `Dimension` in this plan renders from `staticValue`, which is exactly the fallback path Phase 5 will keep.

**Reference documents — read before starting:**
- [`../specs/2026-07-25-personal-site-redesign-design.md`](../specs/2026-07-25-personal-site-redesign-design.md) — the spec
- [`../../../DESIGN.md`](../../../DESIGN.md) — tokens, line-weight semantics, prohibitions
- [`../../../PRODUCT.md`](../../../PRODUCT.md) — product truth and binding content constraints

## Global Constraints

Every task's requirements implicitly include this section.

- **No client, company, product, or application names anywhere, in any tense.** Work is described by mechanism and outcome only. A previously co-founded AI venture is cut entirely.
- **Tennis is past tense and full weight** — he played college tennis and captained the team. Item 02 in the assembly, same scale as everything else.
- **Location is Indianapolis, Indiana.** The employer relationship is remote.
- **Every number appears with its mechanism** in the same sentence.
- **Banned copy:** `passionate about`, `cutting-edge`, `seamless`, `leverage`, `leveraging`, `delve`, `dive into`, `in today's fast-paced`, `ever-evolving`, `a testament to`, `unlock the potential`, `at its core`. Enforced by `src/lib/copy-guard.ts` and tested.
- **Banned typefaces:** Fraunces, Playfair, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans.
- **No drop shadows, gradients, glows, glassmorphism, rounded card shells, emoji, skill bars, or technology logo walls.** A drawing has no light source.
- **Colour:** `--field #0C2942` · `--field-deep #081D2F` · `--field-raise #143A5C` · `--line #EAF2F8` · `--line-soft #8FB0C7` · `--markup #FF4A2E`. Markup red is reserved for revisions, live values, and active state — never more than ~2% of a viewport.
- **`prefers-reduced-motion`** must yield the assembled state, held still and fully legible. No information may exist only in an animated state.
- **No external network requests at runtime.** Fonts are self-hosted by `next/font`. No CDN scripts, no third-party embeds.

## File Structure

**Deleted** — the entire current implementation: `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/icon.tsx`, `app/components/`, `app/data/`, `tailwind.config.js`.

| File | Responsibility |
|---|---|
| `prisma/schema.prisma` | The content model. Single source of truth for data shape. |
| `prisma/seed.mjs` | Real content, seeded idempotently. |
| `src/lib/db.ts` | Prisma singleton. Nothing else. |
| `src/lib/drawing.ts` | Pure geometry — leader paths, dimension paths, explode offsets. No React. |
| `src/lib/copy-guard.ts` | Banned-register and named-entity detection. Pure. |
| `src/lib/storage.ts` | Magic-byte validation, sharp re-encode, S3 put. Server-only. |
| `src/lib/content.ts` | Typed data access. The only module that touches Prisma from pages. |
| `src/components/drawing/*` | The visual vocabulary — one component per drawing device. |
| `src/components/sheet1/*` | Sheet 1's three composed bands. |
| `src/app/*` | Routes, layout, globals.css, robots, sitemap. |
| `tests/**` | Vitest unit and component tests mirroring `src/`. |

Files that change together live together: each drawing device owns its own file because they are independently reusable across sheets; Sheet 1's bands are grouped because they only exist together.

---

### Task 1: Tear down and re-scaffold

**Files:**
- Delete: `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/icon.tsx`, `app/components/`, `app/data/`, `tailwind.config.js`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `vitest.config.ts`, `tests/setup.ts`
- Modify: `package.json`, `tsconfig.json`, `next.config.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: a `src/`-rooted Next app with `@/*` → `./src/*`, and `npm test` running Vitest.

- [ ] **Step 1: Remove dead dependencies and add the real ones**

```bash
npm uninstall framer-motion three @react-three/fiber lenis @types/three
npm install @prisma/client@^6 zod@^4 sharp@^0.34 @aws-sdk/client-s3@^3
npm install -D prisma@^6 vitest@^3 @vitejs/plugin-react@^5 jsdom@^26 \
  @testing-library/react@^16 @testing-library/jest-dom@^6 @testing-library/user-event@^14
```

- [ ] **Step 2: Delete the old implementation**

```bash
git rm -r --cached app tailwind.config.js
rm -rf app tailwind.config.js
mkdir -p src/app src/lib src/components/drawing src/components/sheet1 tests/lib tests/components
```

`public/` is untouched — the hero video and photography stay exactly where they are.

- [ ] **Step 3: Point TypeScript at `src/`**

Replace the `target` and `paths` entries in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "types": ["react", "react-dom", "vitest/globals", "@testing-library/jest-dom"],
    "jsx": "preserve",
    "jsxImportSource": "react",
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["**/*.ts", "**/*.tsx", "next-env.d.ts", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "_archived"]
}
```

- [ ] **Step 4: Configure Next**

Replace `next.config.ts` entirely. The YouTube remote patterns go — no third-party video.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { viewTransition: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "renatodap.me",
        pathname: "/s3/personalwebsite-media/**",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 5: Configure Vitest**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

Create `tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Add to `package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest",
"db:push": "prisma db push",
"db:seed": "node --env-file=.env prisma/seed.mjs",
"postinstall": "prisma generate"
```

- [ ] **Step 6: Minimal placeholder route so the app builds**

`src/app/globals.css`:

```css
@import "tailwindcss";
```

`src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Renato Prado" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`src/app/page.tsx`:

```tsx
export default function Page() {
  return <main>Sheet 1</main>;
}
```

- [ ] **Step 7: Verify the app builds and tests run**

Run: `npm run build && npm test`
Expected: build succeeds. Vitest reports "No test files found" and exits 0 (it exits 1 only with `--passWithNoTests` absent on some versions — if it fails for that reason, add `passWithNoTests: true` to the `test` block and re-run).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: tear down old implementation, scaffold src/ and Vitest"
```

---

### Task 2: Design tokens and typefaces

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Create: `tests/lib/tokens.test.ts`, `src/lib/tokens.ts`

**Interfaces:**
- Consumes: Task 1's scaffold.
- Produces: `TOKENS` (a frozen record of colour and stroke values consumed by SVG components, which cannot read CSS custom properties at render time) and CSS custom properties of the same names.

- [ ] **Step 1: Write the failing test**

`tests/lib/tokens.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { TOKENS, STROKE } from "@/lib/tokens";

describe("design tokens", () => {
  it("exposes the cyanotype field and reserved markup colours", () => {
    expect(TOKENS.field).toBe("#0C2942");
    expect(TOKENS.line).toBe("#EAF2F8");
    expect(TOKENS.markup).toBe("#FF4A2E");
  });

  it("never uses pure black or pure white", () => {
    const values = Object.values(TOKENS).map((v) => v.toUpperCase());
    expect(values).not.toContain("#000000");
    expect(values).not.toContain("#FFFFFF");
  });

  it("keeps every stroke weight at or above the 0.5px hairline floor", () => {
    for (const w of Object.values(STROKE)) {
      expect(w).toBeGreaterThanOrEqual(0.5);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/lib/tokens.test.ts`
Expected: FAIL — cannot resolve `@/lib/tokens`.

- [ ] **Step 3: Write the implementation**

`src/lib/tokens.ts`:

```ts
/**
 * The Exploded Assembly palette and stroke system.
 *
 * SVG attributes cannot read CSS custom properties reliably across browsers when
 * the value is used for `stroke-width`, so these values exist in TS as well as in
 * globals.css. The two must stay in sync; the test above pins the colours.
 */
export const TOKENS = {
  field: "#0C2942",
  fieldDeep: "#081D2F",
  fieldRaise: "#143A5C",
  line: "#EAF2F8",
  lineSoft: "#8FB0C7",
  markup: "#FF4A2E",
} as const;

/** ISO drafting line weights, in px. Each weight carries meaning — see DESIGN.md. */
export const STROKE = {
  /** Visible object edge — the part itself. */
  visible: 1.4,
  /** Detail behind something else. Render with `strokeDasharray="4 3"`. */
  hidden: 0.8,
  /** Axis, symmetry, centreline. Render with `strokeDasharray="12 3 3 3"`. */
  center: 0.8,
  /** Dimension lines, extension lines, leaders, hatching. */
  thin: 0.6,
} as const;

export type TokenName = keyof typeof TOKENS;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/lib/tokens.test.ts`
Expected: PASS, 3 tests.

- [ ] **Step 5: Write globals.css**

Replace `src/app/globals.css` entirely:

```css
@import "tailwindcss";

:root {
  --field: #0C2942;
  --field-deep: #081D2F;
  --field-raise: #143A5C;
  --line: #EAF2F8;
  --line-soft: #8FB0C7;
  --markup: #FF4A2E;

  --w-visible: 1.4px;
  --w-hidden: 0.8px;
  --w-center: 0.8px;
  --w-thin: 0.6px;

  --sheet-margin: clamp(16px, 3vw, 40px);
}

@theme inline {
  --color-field: var(--field);
  --color-field-deep: var(--field-deep);
  --color-field-raise: var(--field-raise);
  --color-line: var(--line);
  --color-line-soft: var(--line-soft);
  --color-markup: var(--markup);
  --font-letter: var(--font-barlow-condensed);
  --font-data: var(--font-martian-mono);
}

* { box-sizing: border-box; }

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  background: var(--field);
  color: var(--line);
  font-family: var(--font-data), ui-monospace, monospace;
  /* Tabular figures are mandatory — numbers must align in columns. */
  font-variant-numeric: tabular-nums;
}

/* Drawing lettering: uppercase, open tracking, exactly as a drawing letters it. */
.letter {
  font-family: var(--font-letter), system-ui, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

/* The single site-wide motion. Parts separate along their leader lines as the
   assembly scrolls through the viewport. Pure CSS: no JS, no library. Browsers
   without scroll-driven animation support simply render the assembled state,
   which is the same state prefers-reduced-motion gets. */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .explode-part {
      animation: explode-out linear both;
      animation-timeline: view();
      animation-range: entry 15% cover 55%;
      transform: translateY(calc(var(--explode-offset, 0) * -1px));
    }
    @keyframes explode-out {
      from { transform: translateY(0); }
      to   { transform: translateY(calc(var(--explode-offset, 0) * 1px)); }
    }
    .draw-in {
      animation: draw-in linear both;
      animation-timeline: view();
      animation-range: entry 25% cover 60%;
    }
    @keyframes draw-in {
      from { stroke-dashoffset: var(--dash-length, 200); }
      to   { stroke-dashoffset: 0; }
    }
  }
}

:focus-visible {
  outline: 2px solid var(--markup);
  outline-offset: 3px;
}
```

- [ ] **Step 6: Load the typefaces**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Barlow_Condensed, Martian_Mono } from "next/font/google";
import "./globals.css";

// Barlow Condensed: DIN-lineage condensed grotesque, the lettering standard of
// technical drawings. Martian Mono: distinctive monospace for every numeral.
// Both self-hosted by next/font — no runtime network request.
const letter = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const data = Martian_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-martian-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Renato Prado",
  description:
    "Software engineer in Indianapolis. Seven self-taught instruments, a dozen shipped applications a quarter, and thirteen servers kept alive.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${letter.variable} ${data.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Verify build**

Run: `npm run build && npm test`
Expected: build succeeds, 3 tests pass.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: cyanotype tokens, drafting stroke system, DIN-lineage typefaces"
```

---

### Task 3: Drawing geometry

**Files:**
- Create: `src/lib/drawing.ts`, `tests/lib/drawing.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `leaderPath(from: Point, to: Point, bend?: number): string`
  - `dimensionPath(from: Point, to: Point, offset: number): DimensionGeometry`
  - `explodeOffsets(count: number, spread: number): number[]`
  - `pathLength(d: string): number`
  - `type Point = { x: number; y: number }`
  - `type DimensionGeometry = { line: string; ext1: string; ext2: string; labelAt: Point }`

- [ ] **Step 1: Write the failing test**

`tests/lib/drawing.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { leaderPath, dimensionPath, explodeOffsets, pathLength } from "@/lib/drawing";

describe("leaderPath", () => {
  it("draws a single-bend polyline from part to balloon", () => {
    const d = leaderPath({ x: 100, y: 50 }, { x: 300, y: 50 }, 40);
    expect(d).toBe("M 100 50 L 140 50 L 300 50");
  });

  it("collapses to a straight line when the bend is zero", () => {
    expect(leaderPath({ x: 0, y: 0 }, { x: 10, y: 10 }, 0)).toBe("M 0 0 L 10 10");
  });
});

describe("dimensionPath", () => {
  it("produces a dimension line with two extension lines and a centred label", () => {
    const g = dimensionPath({ x: 0, y: 0 }, { x: 0, y: 100 }, 20);
    expect(g.line).toBe("M 20 0 L 20 100");
    expect(g.ext1).toBe("M 0 0 L 24 0");
    expect(g.ext2).toBe("M 0 100 L 24 100");
    expect(g.labelAt).toEqual({ x: 20, y: 50 });
  });
});

describe("explodeOffsets", () => {
  it("returns one offset per part, symmetric about the centre", () => {
    expect(explodeOffsets(4, 120)).toEqual([-180, -60, 60, 180]);
  });

  it("returns a single zero offset for one part", () => {
    expect(explodeOffsets(1, 120)).toEqual([0]);
  });

  it("returns an empty array for no parts", () => {
    expect(explodeOffsets(0, 120)).toEqual([]);
  });
});

describe("pathLength", () => {
  it("sums the segments of a polyline so stroke-dasharray can draw it in", () => {
    expect(pathLength("M 0 0 L 3 4")).toBe(5);
    expect(pathLength("M 0 0 L 3 4 L 3 8")).toBe(9);
  });

  it("returns zero for a path with no line segments", () => {
    expect(pathLength("M 10 10")).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/lib/drawing.test.ts`
Expected: FAIL — cannot resolve `@/lib/drawing`.

- [ ] **Step 3: Write the implementation**

`src/lib/drawing.ts`:

```ts
/**
 * Pure geometry for the drawing vocabulary. No React, no DOM — so it is cheap to
 * test and safe to call during server render.
 */

export type Point = { x: number; y: number };

export type DimensionGeometry = {
  /** The dimension line itself, arrow-terminated by the caller. */
  line: string;
  /** Extension line from the first measured point. */
  ext1: string;
  /** Extension line from the second measured point. */
  ext2: string;
  /** Where the value sits, in a gap in the line. */
  labelAt: Point;
};

/**
 * A leader runs from a part to its callout balloon with at most one bend — a
 * drawing convention, and the reason leaders never look tangled. `bend` is the
 * horizontal run before the line turns; 0 yields a straight line.
 */
export function leaderPath(from: Point, to: Point, bend = 0): string {
  if (bend === 0) return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  const knee = from.x + bend;
  return `M ${from.x} ${from.y} L ${knee} ${from.y} L ${to.x} ${to.y}`;
}

/** Extension lines overshoot the dimension line slightly, as drafted. */
const EXTENSION_OVERSHOOT = 4;

/**
 * A vertical dimension between two points, offset horizontally by `offset`.
 * Only the vertical case is needed: the assembly explodes along one axis.
 */
export function dimensionPath(from: Point, to: Point, offset: number): DimensionGeometry {
  const x = from.x + offset;
  const overshoot = x + EXTENSION_OVERSHOOT;
  return {
    line: `M ${x} ${from.y} L ${x} ${to.y}`,
    ext1: `M ${from.x} ${from.y} L ${overshoot} ${from.y}`,
    ext2: `M ${to.x} ${to.y} L ${overshoot} ${to.y}`,
    labelAt: { x, y: (from.y + to.y) / 2 },
  };
}

/**
 * How far each part travels when the assembly explodes. Offsets are symmetric
 * about the assembly's centre so the drawing opens outward from the middle
 * rather than drifting in one direction.
 */
export function explodeOffsets(count: number, spread: number): number[] {
  if (count <= 0) return [];
  if (count === 1) return [0];
  const mid = (count - 1) / 2;
  return Array.from({ length: count }, (_, i) => (i - mid) * spread);
}

/**
 * Total length of an `M`/`L` polyline, used to seed `stroke-dasharray` and
 * `--dash-length` so a line can draw itself in without measuring in the browser.
 */
export function pathLength(d: string): number {
  const nums = d.match(/-?\d+(\.\d+)?/g);
  if (!nums || nums.length < 4) return 0;
  const coords = nums.map(Number);
  let total = 0;
  for (let i = 2; i + 1 < coords.length; i += 2) {
    total += Math.hypot(coords[i] - coords[i - 2], coords[i + 1] - coords[i - 1]);
  }
  return total;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/lib/drawing.test.ts`
Expected: PASS, 8 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/drawing.ts tests/lib/drawing.test.ts
git commit -m "feat: drawing geometry — leaders, dimensions, explode offsets"
```

---

### Task 4: Copy guard

This operationalises the brand rule as system behaviour rather than leaving it as a note in a document. It is used by the seed script now and by the admin in Phase 4.

**Files:**
- Create: `src/lib/copy-guard.ts`, `tests/lib/copy-guard.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `checkCopy(text: string): CopyViolation[]`
  - `assertCopy(text: string, where: string): void` — throws on any violation
  - `needsMechanism(text: string): boolean`
  - `type CopyViolation = { kind: "banned-phrase" | "named-entity"; match: string }`

- [ ] **Step 1: Write the failing test**

`tests/lib/copy-guard.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { checkCopy, assertCopy, needsMechanism } from "@/lib/copy-guard";

describe("checkCopy — banned register", () => {
  it("flags LLM-tell phrases regardless of case", () => {
    const v = checkCopy("I am PASSIONATE ABOUT cutting-edge tooling.");
    expect(v.map((x) => x.match).sort()).toEqual(["cutting-edge", "passionate about"]);
    expect(v.every((x) => x.kind === "banned-phrase")).toBe(true);
  });

  it("passes clean, concrete copy", () => {
    expect(checkCopy("He asked for a portfolio. He was running a business on a spreadsheet.")).toEqual([]);
  });

  it("does not flag a banned word inside a larger word", () => {
    // "seamless" is banned; "seamlessness" is still a match, but "inseam" is not.
    expect(checkCopy("The inseam measured 32 inches.")).toEqual([]);
  });
});

describe("checkCopy — named entities", () => {
  it("flags a forbidden client, employer, or product name", () => {
    const v = checkCopy("Built for Deco Faria at Aslan using IMENSIAH.");
    expect(v.filter((x) => x.kind === "named-entity").map((x) => x.match).sort())
      .toEqual(["Aslan", "Deco Faria", "IMENSIAH"]);
  });

  it("flags a bare domain from the forbidden list", () => {
    expect(checkCopy("See decofaria.com.br for the result."))
      .toContainEqual({ kind: "named-entity", match: "decofaria.com.br" });
  });

  it("allows a sector-and-city description", () => {
    expect(checkCopy("An audiovisual director in Sao Paulo.")).toEqual([]);
  });
});

describe("needsMechanism", () => {
  it("is true when a claim carries a percentage, a currency amount, or an arrow", () => {
    expect(needsMechanism("Cut the bill by 97%.")).toBe(true);
    expect(needsMechanism("From $1,000 a month.")).toBe(true);
    expect(needsMechanism("14% → 98%")).toBe(true);
  });

  it("is false for prose with no quantified claim", () => {
    expect(needsMechanism("He planned his week on the board.")).toBe(false);
  });
});

describe("assertCopy", () => {
  it("throws naming the field and every violation", () => {
    expect(() => assertCopy("seamless work at Aslan", "Sheet.outcome"))
      .toThrow(/Sheet\.outcome/);
  });

  it("does not throw on clean copy", () => {
    expect(() => assertCopy("He showed it to his father.", "Sheet.outcome")).not.toThrow();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/lib/copy-guard.test.ts`
Expected: FAIL — cannot resolve `@/lib/copy-guard`.

- [ ] **Step 3: Write the implementation**

`src/lib/copy-guard.ts`:

```ts
/**
 * Turns two binding content rules into enforceable behaviour:
 *   1. no LLM-register phrasing  (PRODUCT.md → Brand Commitments)
 *   2. no client, employer, or product names  (PRODUCT.md → Capabilities and Constraints)
 *
 * Used by the seed script and, in Phase 4, by the admin before publish.
 */

export type CopyViolation = {
  kind: "banned-phrase" | "named-entity";
  match: string;
};

/** Highest-signal LLM tells. Matched case-insensitively on word boundaries. */
const BANNED_PHRASES = [
  "passionate about",
  "cutting-edge",
  "state-of-the-art",
  "seamless",
  "seamlessly",
  "leverage",
  "leveraging",
  "delve",
  "dive into",
  "in today's fast-paced",
  "ever-evolving",
  "a testament to",
  "unlock the potential",
  "at its core",
];

/**
 * Names that must never appear. Deliberately explicit rather than heuristic:
 * a regex for "any capitalised word" would flag Indianapolis and Brazil.
 * Extend this list when a new client or product enters the picture.
 */
const FORBIDDEN_ENTITIES = [
  "Aslan",
  "IMENSIAH",
  "imensiah",
  "Deco Faria",
  "Andre Faria",
  "André Faria",
  "AllAboutFood",
  "Accumulate",
  "decofaria.com.br",
  "bydap.com.br",
  "allaboutfood.cafe",
  "imensiah.com.br",
];

function escape(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function checkCopy(text: string): CopyViolation[] {
  const found: CopyViolation[] = [];

  for (const phrase of BANNED_PHRASES) {
    // \b on both ends so "inseam" does not match "seam"-prefixed entries, while
    // "seamlessly" still matches its own entry.
    const re = new RegExp(`\\b${escape(phrase)}\\b`, "i");
    const m = re.exec(text);
    if (m) found.push({ kind: "banned-phrase", match: phrase });
  }

  for (const entity of FORBIDDEN_ENTITIES) {
    const re = new RegExp(`\\b${escape(entity)}\\b`, "i");
    if (re.test(text)) {
      // Report the canonical spelling, de-duplicated across case variants.
      if (!found.some((f) => f.kind === "named-entity" && f.match.toLowerCase() === entity.toLowerCase())) {
        found.push({ kind: "named-entity", match: entity });
      }
    }
  }

  return found;
}

/**
 * True when the text makes a quantified claim, which per the spec must ship
 * alongside the mechanism that produced it — a bare 97% reads as inflated.
 */
export function needsMechanism(text: string): boolean {
  return /\d\s*%|[$£€]\s*[\d,]|→|->/.test(text);
}

export function assertCopy(text: string, where: string): void {
  const violations = checkCopy(text);
  if (violations.length === 0) return;
  const detail = violations.map((v) => `${v.kind}: "${v.match}"`).join("; ");
  throw new Error(`Copy rejected in ${where} — ${detail}`);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/lib/copy-guard.test.ts`
Expected: PASS, 9 tests.

Note: the `IMENSIAH` / `imensiah` duplicate in `FORBIDDEN_ENTITIES` is intentional documentation of both spellings; the de-duplication in `checkCopy` means only one violation is reported.

- [ ] **Step 5: Commit**

```bash
git add src/lib/copy-guard.ts tests/lib/copy-guard.test.ts
git commit -m "feat: copy guard enforcing banned register and anonymity"
```

---

### Task 5: Database schema and client

**Files:**
- Create: `prisma/schema.prisma`, `src/lib/db.ts`, `.env.example`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: nothing.
- Produces: the `prisma` singleton at `@/lib/db`, and generated types `SiteSetting`, `Part`, `Sheet`, `DetailCrop`, `Dimension`, `Revision`, `AdminUser` from `@prisma/client`.

- [ ] **Step 1: Write the schema**

Copy `prisma/schema.prisma` verbatim from the spec's §4, adding the generator and datasource blocks:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then the seven models exactly as specified in [the spec §4](../specs/2026-07-25-personal-site-redesign-design.md). Do not paraphrase field names — later tasks reference them exactly.

- [ ] **Step 2: Create `.env.example` and ignore `.env`**

`.env.example`:

```
# Local dev points at a local Postgres; production uses the shared instance on persimmon-eu.
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/personalwebsite"

# MinIO — see infra/SECRETS.md for real values. Leaving these unset makes
# storage.ts fall back to local disk, which is the intended dev behaviour.
S3_ENDPOINT=""
S3_BUCKET="personalwebsite-media"
S3_ACCESS_KEY_ID=""
S3_SECRET_ACCESS_KEY=""
S3_PUBLIC_URL="https://renatodap.me/s3/personalwebsite-media"
S3_REGION="auto"
UPLOAD_DIR="./uploads"
```

Append to `.gitignore`:

```
.env
/uploads
```

- [ ] **Step 3: Write the Prisma singleton**

`src/lib/db.ts`:

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

- [ ] **Step 4: Generate the client and push the schema**

```bash
cp .env.example .env   # then set DATABASE_URL to a real local database
npx prisma generate
npm run db:push
```

Expected: `prisma generate` writes the client; `db:push` reports the tables created.

- [ ] **Step 5: Verify types resolve**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add prisma/schema.prisma src/lib/db.ts .env.example .gitignore
git commit -m "feat: content model and Prisma client"
```

---

### Task 6: Storage pipeline

**Files:**
- Create: `src/lib/storage.ts`, `tests/lib/storage.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `detectImageType(buf: Buffer): "jpeg" | "png" | "webp" | null`
  - `detectVideoType(buf: Buffer): { ext: string; mime: string } | null`
  - `uploadImage(buffer: Buffer): Promise<UploadResult>`
  - `uploadVideo(buffer: Buffer): Promise<{ url: string; key: string }>`
  - `type UploadResult = { url: string; key: string; width: number | null; height: number | null }`

Only the pure detectors are unit-tested; the S3 round-trip is verified manually in Step 6 because mocking the AWS SDK would test the mock rather than the pipeline.

- [ ] **Step 1: Write the failing test**

`tests/lib/storage.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { detectImageType, detectVideoType } from "@/lib/storage";

const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const webp = Buffer.concat([
  Buffer.from("RIFF", "ascii"),
  Buffer.from([0, 0, 0, 0]),
  Buffer.from("WEBP", "ascii"),
]);
const mp4 = Buffer.concat([Buffer.from([0, 0, 0, 0x20]), Buffer.from("ftypisom", "ascii")]);
const webm = Buffer.from([0x1a, 0x45, 0xdf, 0xa3, 0x01, 0x00]);

describe("detectImageType", () => {
  it("identifies formats by magic bytes, not by extension", () => {
    expect(detectImageType(jpeg)).toBe("jpeg");
    expect(detectImageType(png)).toBe("png");
    expect(detectImageType(webp)).toBe("webp");
  });

  it("rejects a file whose bytes are not an allowed image", () => {
    expect(detectImageType(Buffer.from("<?php echo 1; ?>", "ascii"))).toBeNull();
  });

  it("rejects a truncated header without throwing", () => {
    expect(detectImageType(Buffer.from([0xff]))).toBeNull();
    expect(detectImageType(Buffer.alloc(0))).toBeNull();
  });
});

describe("detectVideoType", () => {
  it("identifies mp4 and webm", () => {
    expect(detectVideoType(mp4)).toEqual({ ext: "mp4", mime: "video/mp4" });
    expect(detectVideoType(webm)).toEqual({ ext: "webm", mime: "video/webm" });
  });

  it("rejects an image posing as a video", () => {
    expect(detectVideoType(png)).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/lib/storage.test.ts`
Expected: FAIL — cannot resolve `@/lib/storage`.

- [ ] **Step 3: Write the implementation**

`src/lib/storage.ts` — adapted from `joaodipierro-website/src/lib/storage.ts`, which is the proven version of this pipeline:

```ts
import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

/**
 * Upload pipeline:
 *   1. validate by MAGIC BYTES, never by extension
 *   2. images: re-encode to WebP via sharp (auto-rotate, strip EXIF, cap 2000px)
 *   3. random UUID key
 *   4. PUT to MinIO when configured, else write to UPLOAD_DIR for local dev
 *
 * Bytes proxy through the server ON PURPOSE: sharp re-encoding must run
 * server-side, so a presigned direct PUT would skip validation and optimisation.
 */

const MAX_DIMENSION = 2000;

export type UploadResult = {
  url: string;
  key: string;
  width: number | null;
  height: number | null;
};

export function detectImageType(buf: Buffer): "jpeg" | "png" | "webp" | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpeg";
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47 &&
    buf[4] === 0x0d && buf[5] === 0x0a && buf[6] === 0x1a && buf[7] === 0x0a
  ) return "png";
  if (
    buf.length >= 12 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  ) return "webp";
  return null;
}

export function detectVideoType(buf: Buffer): { ext: string; mime: string } | null {
  if (buf.length >= 12 && buf.toString("ascii", 4, 8) === "ftyp") {
    return { ext: "mp4", mime: "video/mp4" };
  }
  if (buf.length >= 4 && buf[0] === 0x1a && buf[1] === 0x45 && buf[2] === 0xdf && buf[3] === 0xa3) {
    return { ext: "webm", mime: "video/webm" };
  }
  return null;
}

function s3Config() {
  const endpoint = process.env.S3_ENDPOINT;
  const bucket = process.env.S3_BUCKET;
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
  const publicUrl = process.env.S3_PUBLIC_URL;
  if (endpoint && bucket && accessKeyId && secretAccessKey && publicUrl) {
    return { endpoint, bucket, accessKeyId, secretAccessKey, publicUrl, region: process.env.S3_REGION || "auto" };
  }
  return null;
}

function clientFor(cfg: NonNullable<ReturnType<typeof s3Config>>): S3Client {
  return new S3Client({
    region: cfg.region,
    endpoint: cfg.endpoint,
    credentials: { accessKeyId: cfg.accessKeyId, secretAccessKey: cfg.secretAccessKey },
    // MinIO rejects the newer default checksum behaviour; both flags are required.
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });
}

async function put(key: string, body: Buffer, contentType: string): Promise<string> {
  const cfg = s3Config();
  if (cfg) {
    await clientFor(cfg).send(
      new PutObjectCommand({ Bucket: cfg.bucket, Key: key, Body: body, ContentType: contentType }),
    );
    return `${cfg.publicUrl.replace(/\/+$/, "")}/${key}`;
  }
  const dir = process.env.UPLOAD_DIR || "./uploads";
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, key), body);
  return `/uploads/${key}`;
}

export async function uploadImage(buffer: Buffer): Promise<UploadResult> {
  if (!detectImageType(buffer)) {
    throw new Error("Invalid file: upload a JPEG, PNG, or WebP image.");
  }

  const webp = await sharp(buffer)
    .rotate()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  let width: number | null = null;
  let height: number | null = null;
  try {
    const meta = await sharp(webp).metadata();
    width = meta.width ?? null;
    height = meta.height ?? null;
  } catch {
    /* dimensions are an optimisation, not a requirement */
  }

  const key = `${randomUUID()}.webp`;
  const url = await put(key, webp, "image/webp");
  return { url, key, width, height };
}

export async function uploadVideo(buffer: Buffer): Promise<{ url: string; key: string }> {
  const spec = detectVideoType(buffer);
  if (!spec) throw new Error("Invalid file: upload an MP4 or WebM video.");
  const key = `${randomUUID()}.${spec.ext}`;
  const url = await put(key, buffer, spec.mime);
  return { url, key };
}
```

- [ ] **Step 4: Install `server-only`**

```bash
npm install server-only
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/lib/storage.test.ts`
Expected: PASS, 5 tests.

If the import of `server-only` breaks the Vitest run, add to `vitest.config.ts`'s `resolve.alias`: `"server-only": path.resolve(__dirname, "./tests/stubs/server-only.ts")`, and create `tests/stubs/server-only.ts` containing `export {};`.

- [ ] **Step 6: Verify a real round-trip manually**

With MinIO env vars set, run a one-off script that calls `uploadImage` on a real JPEG from `public/`, then `curl -I` the returned URL.
Expected: HTTP 200 and `content-type: image/webp`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: magic-byte validated upload pipeline to MinIO"
```

---

### Task 7: Seed real content

**Files:**
- Create: `prisma/seed.mjs`

**Interfaces:**
- Consumes: the schema from Task 5, `checkCopy` from Task 4.
- Produces: a populated database. Every later task renders from this data.

- [ ] **Step 1: Write the seed**

`prisma/seed.mjs`. It must be **idempotent** — `upsert` on stable keys so re-running never duplicates. Every string passes through `checkCopy` before it is written; the seed exits non-zero on any violation, which is how the anonymity rule stays enforced as content grows.

Content to seed, drawn from `PRODUCT.md` → Evidence on Hand. **No names anywhere.**

`SiteSetting` (id `main`): `drawnBy` "Renato Prado", `drawingTitle` "GENERAL ASSEMBLY — ONE PERSON", `location` "Indianapolis, Indiana", `email` "renatodaprado@gmail.com", `heroVideoUrl` "/hero-video2.mp4", `heroVideoUrlMobile` "/hero-video-square2.mp4", `heroVideoLabel` "SUBJECT, IN MOTION", plus the four profile URLs from the old `app/data/content.ts` (`SOCIAL`).

`Part` rows — the bill of materials:

| itemNo | description | qty | material |
|---|---|---|---|
| 01 | SELF-TAUGHT INSTRUMENT | 7 | GUITAR · PIANO · BASS · DRUMS · UKULELE · HARMONICA · VOICE |
| 02 | COLLEGE TENNIS, CAPTAINED | 1 | ALL-CONFERENCE HONOURABLE MENTION |
| 03 | SELF-HOSTED APPLICATION | 13 | ONE SERVER · ONE POSTGRES · ONE OBJECT STORE |
| 04 | ROAD DISTANCE | — | HALF MARATHON AT 7:32/MI |
| 05 | SHIPPED CLIENT APPLICATION | 12 | ONE QUARTER · CI/CD ON EVERY REPOSITORY |

`Sheet` rows — anonymous, each with `mechanism` filled where a number appears:

1. `slug` `spreadsheet-to-system`, kicker "AUDIOVISUAL DIRECTOR — SÃO PAULO". `asked`: he wanted a portfolio site. `actual`: he was running a company out of somebody else's spreadsheet, with payment terms that lived only in his head. `outcome`: public site plus production tracking, forecasting and document generation. Inside one week he had moved the whole business across — 7 clients, 9 projects, 100+ deliveries. He showed it to his father and started referring people. `mechanism`: three weeks elapsed, about eleven hours of active build; feedback raised on a call was live before the next one, twice measured under 24 hours.
2. `slug` `thousand-to-thirty`, kicker "SENIOR CAPSTONE — TEAM OF FOUR". `mechanism` must state *why* the bill fell: the vision model was being called per frame on always-on instances; batching, on-device pre-processing, and shutting down idle capacity did it. **Without this sentence the claim reads as inflated** — see spec §4.
3. `slug` `fourteen-to-ninety-eight`, kicker "DEEP LEARNING RESEARCH". Fine-tuned a small open model to classify language-model errors, 14% to 98%, GPU memory halved. `mechanism`: the gain came from relabelling the error taxonomy and gradient checkpointing, not from a larger model.
4. `slug` `proof-not-node`, kicker "SOFTWARE INTERNSHIP". Verifying blockchain accounts by three-tier Merkle proof instead of running a full node; ~2 KB proofs.
5. `slug` `daemon`, kicker "BUILT FOR MYSELF". An always-on assistant daemon — two-tier model routing, 16 scheduled jobs, 291 tests.

`Dimension` rows (all `source: "static"` in this plan; Phase 5 flips the running ones to `live` and keeps these values as fallback): `TOTAL DISTANCE, TRAILING 365 D`, `HALF MARATHON PACE` = `7:32/MI`, `SELF-HOSTED APPLICATIONS` = `13`.

`Revision` rows — the timeline, as a drawing revision table:

| rev | date | description |
|---|---|---|
| A | 2022 | Arrived from Brazil. Started Mechanical Engineering. |
| B | 2023 | Changed to Computer Science a year in — late enough that it hurt, which is why it happened before it got later. |
| C | 2026 | Graduated. Captained the tennis team through a final season. |
| D | 2026 | Lead software engineer, remote, from Indianapolis. |

`DetailCrop` rows: create one per sheet with `imageUrl` pointing at a placeholder path under `/public/drawings/`, `label` `DETAIL A`…`DETAIL E`, `scaleNote` `SCALE 2:1`. Art comes in Task 12.

- [ ] **Step 2: Run the seed**

Run: `npm run db:seed`
Expected: exits 0, prints a count per model.

- [ ] **Step 3: Verify idempotency**

Run: `npm run db:seed` a second time, then `npx prisma studio` and count rows.
Expected: identical counts. No duplicates.

- [ ] **Step 4: Verify the copy guard actually fires**

Temporarily add the word `seamless` to one sheet's `outcome`, re-run the seed.
Expected: exits non-zero naming the field. Revert the change.

- [ ] **Step 5: Commit**

```bash
git add prisma/seed.mjs
git commit -m "feat: seed real, anonymous content with copy-guard enforcement"
```

---

### Task 8: Drawing primitives

**Files:**
- Create: `src/components/drawing/SheetFrame.tsx`, `TitleBlock.tsx`, `CalloutBalloon.tsx`, `LeaderLine.tsx`, `DimensionLine.tsx`
- Create: `tests/components/drawing.test.tsx`

**Interfaces:**
- Consumes: `TOKENS`, `STROKE` (Task 2); `leaderPath`, `dimensionPath`, `pathLength` (Task 3).
- Produces:
  - `<SheetFrame sheetNo={number} sheetTotal={number} zones?: boolean>` — ruled border with zone letters/numbers
  - `<TitleBlock drawnBy title date scale sheetNo sheetTotal rev />`
  - `<CalloutBalloon n={string} x={number} y={number} href?: string active?: boolean />`
  - `<LeaderLine from={Point} to={Point} bend?: number drawIn?: boolean />`
  - `<DimensionLine from={Point} to={Point} offset={number} value={string} live?: boolean />`

All five are server components — no `"use client"`. They render SVG only.

- [ ] **Step 1: Write the failing test**

`tests/components/drawing.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CalloutBalloon } from "@/components/drawing/CalloutBalloon";
import { DimensionLine } from "@/components/drawing/DimensionLine";
import { TitleBlock } from "@/components/drawing/TitleBlock";

const wrap = (ui: React.ReactNode) => render(<svg>{ui}</svg>);

describe("CalloutBalloon", () => {
  it("renders its item number", () => {
    wrap(<CalloutBalloon n="03" x={10} y={10} />);
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("becomes a link when given an href, so callouts are real navigation", () => {
    const { container } = wrap(<CalloutBalloon n="01" x={0} y={0} href="/sheet/daemon" />);
    expect(container.querySelector("a")).toHaveAttribute("href", "/sheet/daemon");
  });

  it("uses markup red only when active", () => {
    const { container: idle } = wrap(<CalloutBalloon n="01" x={0} y={0} />);
    expect(idle.querySelector("circle")).toHaveAttribute("stroke", "#EAF2F8");
    const { container: on } = wrap(<CalloutBalloon n="01" x={0} y={0} active />);
    expect(on.querySelector("circle")).toHaveAttribute("stroke", "#FF4A2E");
  });
});

describe("DimensionLine", () => {
  it("renders the measured value", () => {
    wrap(<DimensionLine from={{ x: 0, y: 0 }} to={{ x: 0, y: 80 }} offset={20} value="617.5" />);
    expect(screen.getByText("617.5")).toBeInTheDocument();
  });

  it("draws a live value in markup red", () => {
    const { container } = wrap(
      <DimensionLine from={{ x: 0, y: 0 }} to={{ x: 0, y: 80 }} offset={20} value="1 247 KM" live />,
    );
    expect(container.querySelector("text")).toHaveAttribute("fill", "#FF4A2E");
  });
});

describe("TitleBlock", () => {
  it("shows every drawing field a title block is required to carry", () => {
    render(
      <svg>
        <TitleBlock drawnBy="Renato Prado" title="GENERAL ASSEMBLY" date="2026-07-25"
          scale="1:5" sheetNo={1} sheetTotal={4} rev="D" />
      </svg>,
    );
    for (const t of ["Renato Prado", "GENERAL ASSEMBLY", "2026-07-25", "1:5", "1 OF 4", "D"]) {
      expect(screen.getByText(t)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/components/drawing.test.tsx`
Expected: FAIL — cannot resolve the component modules.

- [ ] **Step 3: Implement the five primitives**

Each is a small SVG-only server component. Rules they must all obey, from `DESIGN.md`:
- stroke colours come from `TOKENS`, widths from `STROKE`
- no `filter`, no `<defs>` gradient, no `opacity` below 1 on line work
- every `<svg>` root carries `role="img"` and a `<title>`; decorative sub-elements carry `aria-hidden="true"`
- `CalloutBalloon` renders `<a>` wrapping `<circle>` + `<text>` when `href` is given, so it is keyboard-focusable
- `LeaderLine` with `drawIn` sets `strokeDasharray` and `--dash-length` from `pathLength(d)` and adds `className="draw-in"`
- `DimensionLine` renders `line`, `ext1`, `ext2` from `dimensionPath`, arrowheads as two short `<path>` strokes (not a `marker`, which inherits fill awkwardly), and the value as `<text>` at `labelAt` with `textAnchor="middle"` and a background-cut achieved by `paintOrder="stroke"` with `stroke={TOKENS.field}` and `strokeWidth={6}` so the line appears interrupted
- `TitleBlock` renders a ruled `<g>` of cells; `sheetNo`/`sheetTotal` render as the single string `` `${sheetNo} OF ${sheetTotal}` ``

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/components/drawing.test.tsx`
Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/drawing tests/components/drawing.test.tsx
git commit -m "feat: drawing primitives — frame, title block, callouts, leaders, dimensions"
```

---

### Task 9: Parts list

**Files:**
- Create: `src/components/drawing/PartsList.tsx`, `tests/components/parts-list.test.tsx`

**Interfaces:**
- Consumes: `Part` type from `@prisma/client`.
- Produces: `<PartsList parts={Part[]} />` — an HTML `<table>`, not SVG, so the bill of materials is selectable, copyable, and read correctly by screen readers.

- [ ] **Step 1: Write the failing test**

`tests/components/parts-list.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { PartsList } from "@/components/drawing/PartsList";

const parts = [
  { id: "1", itemNo: "01", description: "SELF-TAUGHT INSTRUMENT", qty: "7",
    material: "GUITAR · PIANO", drawingUrl: "", note: "", isActive: true, sortOrder: 0 },
  { id: "2", itemNo: "02", description: "COLLEGE TENNIS, CAPTAINED", qty: "1",
    material: "ALL-CONFERENCE", drawingUrl: "", note: "", isActive: true, sortOrder: 1 },
];

describe("PartsList", () => {
  it("renders the four bill-of-materials columns", () => {
    render(<PartsList parts={parts} />);
    for (const h of ["ITEM", "DESCRIPTION", "QTY", "MATERIAL"]) {
      expect(screen.getByRole("columnheader", { name: h })).toBeInTheDocument();
    }
  });

  it("renders one row per part with its item number and quantity", () => {
    render(<PartsList parts={parts} />);
    const rows = screen.getAllByRole("row");
    // one header row plus one row per part
    expect(rows).toHaveLength(3);
    expect(within(rows[1]).getByText("01")).toBeInTheDocument();
    expect(within(rows[1]).getByText("7")).toBeInTheDocument();
  });

  it("is a real table so the list is readable and copyable", () => {
    render(<PartsList parts={parts} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders nothing at all when there are no parts", () => {
    const { container } = render(<PartsList parts={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/components/parts-list.test.tsx`
Expected: FAIL — cannot resolve `@/components/drawing/PartsList`.

- [ ] **Step 3: Write the implementation**

`src/components/drawing/PartsList.tsx`. A server component. Returns `null` when `parts` is empty — an empty BOM is not an empty state to decorate, it is nothing. Rules: `<caption className="sr-only">`, header cells uppercase in `.letter`, body cells in the data mono, thin rules between rows using `--line-soft`, no zebra striping, `font-variant-numeric: tabular-nums` inherited from `body`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/components/parts-list.test.tsx`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/drawing/PartsList.tsx tests/components/parts-list.test.tsx
git commit -m "feat: bill-of-materials parts list"
```

---

### Task 10: Data access

**Files:**
- Create: `src/lib/content.ts`

**Interfaces:**
- Consumes: `prisma` (Task 5).
- Produces:
  - `getSiteSetting(): Promise<SiteSetting>`
  - `getParts(): Promise<Part[]>`
  - `getSheets(): Promise<Sheet[]>`
  - `getSheetBySlug(slug: string): Promise<SheetWithRelations | null>`
  - `getCrops(): Promise<(DetailCrop & { sheet: { slug: string } | null })[]>`
  - `getSiteDimensions(): Promise<Dimension[]>` — those with `sheetId: null`
  - `getRevisions(): Promise<Revision[]>`
  - `type SheetWithRelations = Sheet & { crops: DetailCrop[]; dimensions: Dimension[] }`

Every list function filters `isActive: true` and orders by `sortOrder` then `id`. This is the only module pages import for data.

- [ ] **Step 1: Write the implementation**

Straightforward Prisma queries. `getSiteSetting` upserts the `main` row if absent so a fresh database never renders a crash.

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/content.ts
git commit -m "feat: typed content access layer"
```

---

### Task 11: Sheet 1 — the general assembly

**Files:**
- Create: `src/components/sheet1/GeneralAssembly.tsx`, `src/components/sheet1/HeroViewport.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: everything from Tasks 8–10.
- Produces: `<GeneralAssembly parts={Part[]} dimensions={Dimension[]} />`, `<HeroViewport src mobileSrc label itemNo />`.

- [ ] **Step 1: Build the assembly**

`GeneralAssembly.tsx` — a single `<svg>` with a `viewBox`, so it scales without media queries.

- Lay parts out vertically. Each part is a `<g className="explode-part">` with inline `style={{ "--explode-offset": offset }}` from `explodeOffsets(parts.length, 90)`.
- Each part renders its `drawingUrl` as an `<image>` when set; otherwise a placeholder outlined rectangle carrying the item number, so the layout is complete before the art is.
- A `CalloutBalloon` sits to the right of each part, linked to its sheet where one exists, joined by a `LeaderLine` with `drawIn`.
- `DimensionLine`s span between parts, values from `dimensions`.
- The `<svg>` gets `role="img"` and a `<title>` reading "Exploded assembly drawing of Renato Prado, in five numbered parts."

- [ ] **Step 2: Build the hero viewport**

`HeroViewport.tsx` — the video is a *part*, framed and numbered, never a background.

```tsx
<video
  autoPlay muted loop playsInline
  preload="none"
  poster={poster}
  className="h-full w-full object-cover"
>
  <source src={mobileSrc} media="(max-width: 640px)" type="video/mp4" />
  <source src={src} type="video/mp4" />
</video>
```

`muted` and `playsInline` are both mandatory — without them iOS refuses to autoplay and shows a frozen first frame, a bug that has already shipped once on a sibling project. Wrap it in a drawn rectangle with a callout balloon and a caption in `.letter`. Apply a CSS duotone so it sits in the cyanotype field rather than on top of it: `filter: grayscale(1) contrast(1.1)` with a `mix-blend-mode: luminosity` overlay in `--field`.

- [ ] **Step 3: Compose the page**

`src/app/page.tsx` — a server component:

```tsx
export const revalidate = 3600;

export default async function Page() {
  const [setting, parts, dimensions, crops] = await Promise.all([
    getSiteSetting(), getParts(), getSiteDimensions(), getCrops(),
  ]);
  // SheetFrame > GeneralAssembly > PartsList > HeroViewport > DetailField > TitleBlock
}
```

- [ ] **Step 4: Verify in the browser at both sizes**

Run: `npm run dev`, then open `/` at 1440px and at 390px.
Expected: assembly legible at both; parts separate on scroll; nothing overflows horizontally.

- [ ] **Step 5: Verify reduced motion**

In DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`, reload.
Expected: parts sit assembled, every callout and dimension readable, no movement.

- [ ] **Step 6: Commit**

```bash
git add src/components/sheet1 src/app/page.tsx
git commit -m "feat: Sheet 1 general assembly, parts list, hero viewport"
```

---

### Task 12: Detail-crop field

**Files:**
- Create: `src/components/sheet1/DetailField.tsx`, `public/drawings/*.svg`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `getCrops()` (Task 10).
- Produces: `<DetailField crops={CropWithSheet[]} />`.

- [ ] **Step 1: Author the crop art**

Five SVG line drawings in `public/drawings/`, each on a square `viewBox="0 0 200 200"`, stroke `#EAF2F8`, `stroke-width` 1.4, `fill="none"`: a guitar fretboard detail, a tennis court corner with service line, an audio waveform, a server rack rail, a shoe tread. No shading, no fills — a drawing has no light source.

- [ ] **Step 2: Build the field**

Every crop is exactly the same rendered size — that is the point of the staging, and it is what lets craft compete before subject does. Semantics: a `<ul>` of `<li>`, each containing `<a href={/sheet/${slug}}>` wrapping the image and a caption `DETAIL A · SCALE 2:1`. Grid via `grid-template-columns: repeat(auto-fill, minmax(148px, 1fr))`, so it wraps deeper on narrow screens rather than shrinking the crops.

Set `style={{ viewTransitionName: crop-${crop.id} }}` on each anchor for Task 13.

- [ ] **Step 3: Verify keyboard operation**

Tab through the field.
Expected: every crop is reachable, focus ring is markup red at 2px with 3px offset, Enter navigates.

- [ ] **Step 4: Commit**

```bash
git add src/components/sheet1/DetailField.tsx public/drawings src/app/page.tsx
git commit -m "feat: equal-crop detail field"
```

---

### Task 13: Detail sheets and the grow-outward transition

**Files:**
- Create: `src/app/sheet/[slug]/page.tsx`, `src/app/sheet/[slug]/not-found.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `getSheetBySlug`, `getSheets` (Task 10).
- Produces: route `/sheet/[slug]`.

- [ ] **Step 1: Build the sheet route**

A server component reading `params.slug`, calling `getSheetBySlug`, and calling `notFound()` on null. Layout: `SheetFrame`, kicker, title, then the three annotated blocks in fixed order — **ASKED FOR**, **ACTUALLY NEEDED**, **WHAT CHANGED** — each labelled in `.letter` as a drawing annotation, with `mechanism` set immediately beneath any block containing a number. Sheet-scoped `DimensionLine`s in the margin. `TitleBlock` bottom-right with this sheet's number.

Add `generateStaticParams` from `getSheets()` and `generateMetadata` returning the sheet title and a description built from `asked`.

- [ ] **Step 2: Wire the View Transition**

Give the sheet's hero element the matching `viewTransitionName: crop-${cropId}`. With `experimental.viewTransition` enabled (Task 1) Next runs the transition on client navigation automatically.

- [ ] **Step 3: Guard reduced motion**

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) { animation: none !important; }
}
```

- [ ] **Step 4: Verify the round trip**

Click a crop, then press Back.
Expected: the crop expands into its sheet; Back reverses it; the URL changes and is directly loadable in a new tab.

- [ ] **Step 5: Verify graceful degradation**

Open in a browser without View Transitions support (or disable the flag).
Expected: plain navigation, identical content, no error.

- [ ] **Step 6: Commit**

```bash
git add src/app/sheet
git commit -m "feat: detail sheets with grow-outward view transition"
```

---

### Task 14: Revision history

**Files:**
- Create: `src/app/revisions/page.tsx`

- [ ] **Step 1: Build the route**

The timeline as a drawing revision table: columns `REV`, `DATE`, `DESCRIPTION`, rendered as a real `<table>` with the same rules as `PartsList`. This is the only page carrying first-person prose. `SheetFrame` and `TitleBlock` as everywhere else.

- [ ] **Step 2: Verify**

Run: `npm run dev`, open `/revisions`.
Expected: four revision rows, readable at 390px, table scrolls horizontally rather than truncating.

- [ ] **Step 3: Commit**

```bash
git add src/app/revisions
git commit -m "feat: revision history sheet"
```

---

### Task 15: Discoverability and the finishing pass

**Files:**
- Create: `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/icon.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Person JSON-LD**

In `layout.tsx`, a `<script type="application/ld+json">` with `@type: "Person"`, `name`, `jobTitle`, `address` (Indianapolis), and `sameAs` listing GitHub, LinkedIn, YouTube, Spotify from `SiteSetting`. **No `worksFor`** — that would name the employer, which the global constraints forbid.

- [ ] **Step 2: robots and sitemap**

`robots.ts` allows all crawlers including `GPTBot` and `PerplexityBot`, and points at the sitemap. `sitemap.ts` enumerates `/`, `/revisions`, and every active sheet.

- [ ] **Step 3: Favicon**

`icon.tsx` using `ImageResponse`: a callout balloon — a circle in `--line` on `--field` containing `01`. No emoji.

- [ ] **Step 4: Run the mechanical detector**

Run: `node /Users/renatodaprado/.claude/skills/impeccable/scripts/detect.mjs --json src/app src/components`
Expected: no findings. Fix any that appear; do not add tokens purely to silence a check.

- [ ] **Step 5: Full verification**

```bash
npm test && npm run build && npx tsc --noEmit
```
Expected: all tests pass, build succeeds, no type errors.

Then verify by eye at 1440px and 390px: no horizontal body scroll, AA contrast on all text, every interactive element keyboard-reachable, reduced-motion state fully legible, hero video actually playing on a real iOS device or simulator.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: JSON-LD, robots, sitemap, favicon; finishing pass"
```

---

## Self-review

**Spec coverage.** §3 architecture → Tasks 11–14 (`/`, `/sheet/[slug]`, `/revisions`; `/admin` is Plan 2). §4 content model → Task 5, with the mechanism gate in Task 4 and enforced at seed in Task 7. §5 live data → **deliberately deferred to Plan 3**; Task 7 seeds the `staticValue` fallback those dimensions will keep. §6 storage → Task 6. §7 admin → **Plan 2**. §8 deployment → **not in this plan**; the Traefik-label hazard and env-var provisioning are release work, and the plan must not touch the running deployment. §9 content rules → Global Constraints plus Task 4. §10 accessibility → Tasks 8, 12, 13, 15. §11 risks → asset production is Task 12 Step 1 and the placeholder path in Task 11 Step 1, so the build never stalls waiting on art.

**Placeholder scan.** No TBD/TODO. Tasks 8, 10, 11, 12, 13, 14 describe implementation in prose rather than full code — deliberate for view composition where the exact markup is a craft decision the direction contract governs, but every one names exact files, exact props, exact semantics, and exact verification. The pure-logic modules (Tasks 2, 3, 4, 6) carry complete code because their behaviour is pinned by tests.

**Type consistency.** `Point` and `DimensionGeometry` (Task 3) are consumed by `LeaderLine`/`DimensionLine` (Task 8). `TOKENS`/`STROKE` (Task 2) by every drawing component. `SheetWithRelations` (Task 10) by Task 13. `explodeOffsets(count, spread)` returns `number[]`, consumed positionally in Task 11. `CalloutBalloon` takes `n: string` and `Part.itemNo` is `String` in the schema — consistent. `Dimension.staticValue` is the field rendered as `value` on `DimensionLine`.

**One gap found and closed:** the original draft had no `src/lib/content.ts`, leaving pages to call Prisma directly. Added as Task 10 so there is exactly one module touching the database from the view layer.

---

## Deferred to later plans

| Plan | Covers | Why separate |
|---|---|---|
| **Plan 2 — Admin** | Auth, shared list component, six content sections, media manager, publish-time mechanism gate | Produces working software on its own; a reviewer could accept the public site and reject the admin |
| **Plan 3 — Live dimensions** | Fitness view, read-only role, cached resolver, staleness handling | Genuinely optional — every live dimension already renders its static fallback |
| **Release** | Database provisioning on `shared-postgres`, MinIO bucket and scoped IAM user, env vars, **preserving the hand-edited Traefik `www`-redirect labels** | Touches running infrastructure that other apps depend on; must not happen inside a feature branch |
