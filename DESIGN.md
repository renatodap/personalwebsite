# Design

<!-- impeccable:design-schema 1 -->

**World: Exploded Assembly.** An orthographic exploded assembly drawing, rendered as a website. Cyanotype ground, white line work, red markup, a title block. Chosen because Renato began in Mechanical Engineering and switched to CS a year in — this is the drawing language of the thing he almost became, used to describe the thing he became instead.

This file records durable system rules. Tokens marked *(provisional)* settle on first build.

---

## The governing idea

An exploded view separates the parts of one object without turning them into separate objects. That is the whole reason this world was chosen: engineer, musician, and tennis player are **components of one assembly on leader lines**, never three sections competing for a hero slot.

Two consequences bind every decision downstream:

1. **Nothing is decoration.** Every mark on a technical drawing carries information — a line weight means something, a dash pattern means something, a balloon points at something real. If an element cannot state what it communicates, it is removed. This is what makes the world survive the user's "super simple, super clean" constraint: restraint is native to the form, not imposed on it.
2. **The drawing must be dry.** The conceit collapses the moment it turns cute. A parts list reading `SELF-TAUGHT INSTRUMENT — QTY 7` works because it is deadpan and literally true. Whimsy, puns, and winking copy are banned.

## Color

**Strategy: Drenched.** The surface *is* the blue. This is a saturated field that owns the whole page, not an accent over a neutral ground. Permitted because the mode is Experience and the brief asked for commitment.

Physical scene forcing the choice: a drawing pinned under shop light — a saturated blue field with white line burned into it. Not paper, not a dark UI.

| Role | Token | Value *(provisional)* | Use |
|---|---|---|---|
| Field | `--field` | `#0C2942` | The ground. Dominant surface. |
| Field, recessed | `--field-deep` | `#081D2F` | Behind raised sheets; the space parts explode into. |
| Field, raised | `--field-raise` | `#143A5C` | A sheet lifted off the board. |
| Line | `--line` | `#EAF2F8` | All line work and body text. Blue-cast white, never pure `#FFF`. |
| Line, secondary | `--line-soft` | `#8FB0C7` | Dimension lines, extension lines, hidden detail, secondary annotation. |
| Markup | `--markup` | `#FF4A2E` | **Reserved.** Revision marks, the live-data dimension, the active callout, the one action. Never decorative, never more than ~2% of any viewport. |

`--markup` is a redline pencil, not a brand accent. If it appears on more than one element in a viewport without a reason, that is a bug.

Contrast: `--line` on `--field` is comfortably AA at body size. `--line-soft` is restricted to non-essential annotation and must never carry unique information alone.

## Typography

Faces are chosen as objects from the drawing's own world, not by category association.

- **Lettering — a DIN-lineage condensed engineering face** *(provisional: D-DIN, or OSIFONT for true ISO 3098 lineage)*. This is the lettering standard of technical drawings themselves. Used for titles, callouts, sheet headings, and the title block. Uppercase with open tracking in labels, exactly as a drawing letters them.
- **Data — a distinctive monospace** *(provisional: Martian Mono)* for every numeral, dimension, parts-list cell, and revision row. Tabular figures are mandatory; numbers must align in columns.

**Banned faces**, as training-data defaults regardless of how well they'd read: Fraunces, Playfair, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex (any), Inter as display, DM Sans/Serif, Outfit, Plus Jakarta Sans, Instrument Sans.

Hierarchy comes from **scale and letterspacing**, not weight ramps — a drawing has essentially one ink weight for lettering and distinguishes by size and spacing. Size jumps are large; there is no 1.2× step anywhere.

## Line work

Line weight is a semantic system lifted from ISO drafting practice. It is the primary visual grammar and must not be flattened into "borders."

| Token | Weight *(provisional)* | Meaning |
|---|---|---|
| `--w-visible` | `1.4px` | Visible object edge. The part itself. |
| `--w-hidden` | `0.8px` dashed | Detail behind something else. |
| `--w-center` | `0.8px` chain-dash | Axis, symmetry, centerline. |
| `--w-thin` | `0.6px` | Dimension lines, extension lines, leaders, hatching. |
| `--w-break` | `1.4px` freehand | A break line where a part continues past the sheet. |

Rules: hairlines never fall below `0.5px` rendered. No shadows, no gradients, no blur, no glow — a drawing has no light source. No filled shapes except hatching and the title block rule. Corners are square; radii appear only where a real part has one.

## Components

The system's own vocabulary. A stock UI component dropped into this world is a lapse.

- **Callout balloon** — a circled item number on a leader line with a dot or arrow terminator, pointing at a part. The primary navigational and annotational device.
- **Leader line** — thin, one bend maximum, never crossing another leader. **Links are leader lines.**
- **Dimension line** — arrow-terminated with extension lines and the value set in a gap in the line. Carries real measurements only.
- **Title block** — bottom-right, always: drawn by, date, scale, sheet N of M, revision, material. This is the site's footer and metadata.
- **Parts list / BOM** — item, description, qty, material. Tabular figures, rules between rows, no zebra striping.
- **Revision table** — rev, date, description. This is the timeline. *ME → CS is a revision entry.*
- **Sheet tabs** — navigation. Pages are sheets; a new page is sheet N+1.
- **Detail bubble** — a circled region with a scale note (`DETAIL A — SCALE 2:1`), used to zoom into a fragment.

## Layout

The page is a **sheet**, not a scroll of stacked cards. Sheets carry a border rule, a title block, and zone letters/numbers along the margins where useful.

The index of work is a **field of identically sized detail crops** — every crop cut at the same scale from a different piece of work. Equal size makes craft compete before subject does, and lets volume accumulate rather than forcing a curated top three. Selecting a crop grows it outward from its true position until the whole sheet it belongs to stands framed.

Grid: parts float on an implied orthographic axis, not a 12-column web grid. Asymmetry is expected — a drawing arranges around the object, not around the page center.

## Copy discipline

**Words are rare and expensive.** *(added 2026-07-26, at Renato's instruction: "use words very rarely, only when words are truly needed" and "every single word and comma and millimetre has to serve an exact purpose and contribute to the storytelling.")*

This is a hard constraint, and it is the reason the drawing world fits rather than a coincidence: a technical drawing is nearly wordless by nature. Its labels are terse because a label that could be omitted is noise.

Rules:
- **A sentence must earn its place against the alternative of a drawing.** If the image already says it, delete the sentence. Nothing is captioned merely because captions are conventional.
- **No paragraph appears anywhere on Sheet 1.** The bill of materials does the introducing.
- **No adjectives doing a fact's work.** "Seven, self-taught" over "an accomplished multi-instrumentalist."
- **The same discipline applies to space.** Every rule, gap, and margin is deliberate; nothing is spaced by default. A millimetre that isn't doing work is the same failure as a word that isn't.
- **Nothing is stated that the structure can imply.** Specifically: the site never claims playfulness, curiosity, range, or that its subject never grew up. Those are conveyed by what sits next to what, or not at all.

## Imagery

Photography never competes with line work — in practice the site contains **no photographs at all**. Every image is a traced line drawing derived from a real photograph of Renato. There is no hero video *(cut 2026-07-26)*.

**The drawings are SVG, not raster.** They were authored as 1024×1024 PNGs and vectorised by `scripts/vectorize_drawings.py` (threshold → potrace → retint). The raster originals are the *authoring* artifact and are not shipped. Result: 22 MB → 0.64 MB, and every drawing became token-driven.

Each SVG carries `fill="currentColor"`, a `viewBox="0 0 1024 1024"`, a `<title>`, and **no background of its own** — so the ground is always the page's `--field` and the ink is always CSS-supplied. Verified: 23/23 files, zero baked colours.

Two render paths, chosen by context:

- **`mask-image` for the crop field and anywhere many drawings appear at once.** `mask: url(…) center/contain no-repeat` with `background-color: var(--line)`. The colour stays token-driven, the browser caches the file, and the DOM stays light.
- **Inline `<svg>` only for the few drawings in the assembly itself**, where paths need individual animation (`stroke-dashoffset`) or per-part callout targeting. Inlining is expensive — these traces run ~15–50 KB of path data each — so it is reserved, never the default.

No stock imagery. No generic icon tiles. No gradients or glass standing in where an authored drawing belongs. Icons, where needed, are drawn in the drawing's own grammar.

## Motion

**One orchestrated motion for the entire site: the assembly explodes.** On scroll, parts separate along their leader lines and dimension lines draw themselves in. This is the form's native behavior — an exploded view is defined by exploding — not an effect applied to it.

Everything else is near-still. No scattered hover animations, no scroll-fade on every block, no parallax. A leader line may extend on hover; a callout may fill with `--markup` when active. That is the budget.

`prefers-reduced-motion`: the assembled state, held, fully legible. Nothing is hidden behind motion, and no information exists only in an animated state.

## Live data

Some dimensions are **measured continuously rather than drawn once** — running distance, average pace, session count, days since last activity, read from Renato's own fitness database on the same Postgres instance.

Rules, binding:
- **Running aggregates only.** No weight, resting heart rate, sleep, blood oxygen, macros, hydration, or photographs. This is a taste boundary, not a technical one.
- Read through a **dedicated read-only role and a single view**, never broad table access.
- **Cached**, with the last known value baked in as fallback. A fitness-app outage must never degrade this site.
- Live values render in `--markup` and are labeled as measured, with their as-of time. A number that claims to be live and is stale is worse than a static number.

## Prohibitions

Checked against the world's own materials — none of these bans a device the drawing itself uses.

- No drop shadows, gradients, glows, or glassmorphism. A drawing has no light source.
- No rounded card shells. Sheets and parts, not cards.
- No emoji anywhere. No decorative icon sets.
- No skill bars, percentage proficiency meters, or technology logo walls.
- No client, company, product, or application names — anywhere, in any tense. Work is described by mechanism and outcome only.
- No invented content: no fabricated testimonials, metrics, logos, or imagery. Every number traces to something real, and every number appears with its mechanism.
- No LLM register. Banned: "passionate about," "cutting-edge," "seamless," "leverage," "delve/dive into," "in today's fast-paced world," "a testament to," "unlock the potential." Vary sentence length deliberately; uniform rhythm is itself a tell.

## Admin

The `/admin` surface is the same world at **working weight** — mode is Operate, so density and scanability outrank expression. Same tokens, same faces, same line-weight semantics; the explode motion does not appear. It edits content only. Layout and design are code and are not editable, chosen deliberately so the design cannot drift.
