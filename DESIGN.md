# Design

<!-- impeccable:design-schema 1 -->

**World: Plate Sequence.** A cyanotype plate book of one person in motion. Prussian blue ground, warm rag-paper line, one figure at a time, held in a fixed frame that advances.

Chosen because it is the true home of the colour this site already wears. `#0B2A45` + white line has two possible ancestors: **blueprint**, which drags in item numbers, callout balloons, a title block and a bill of materials as a matter of course; and **cyanotype** (Anna Atkins, 1843, the first photographically illustrated book), which is a *photographic* process and has no such vocabulary. A cyanotype plate carries an image and, at most, a caption. Same colour, entirely different obligations.

Fused with **Muybridge's motion studies** — sequential plates of one body doing one thing after another — which is this site's thesis as a historical fact rather than a metaphor.

*Supersedes the Exploded Assembly world (2026-07-25), retired 2026-07-26 at Renato's instruction: "i hate the bom design stuff. thats going too far." That world is the anti-reference for this one; see Prohibitions.*

---

## The governing idea

A plate book makes its argument by **sequence and adjacency**, never by explanation. Put one image after another in a fixed frame and the viewer supplies the connection. That is the entire mechanism, and it is why this world survives the "very simple, very clean" constraint: a plate book has almost nothing in it.

Three consequences bind every decision downstream:

1. **The drawing is the display element.** Type never competes with it. There is no large headline anywhere on this site, because the figure is the headline. If a text size would rival the plate for attention, it is wrong.
2. **Nothing is decoded.** The previous world required a visitor to read `ITEM 00 / QTY 7 / MATERIAL` before being allowed to look at anything. This one requires nothing. A viewer who has never heard the word cyanotype sees a blue page and a white figure and is already fully inside it.
3. **Adjacency does the talking.** The boy arrives in the slot the man was using, and no caption remarks on it. Anything the structure can imply is never written.

## Color

**Strategy: Drenched, two colours, no accent.** The surface *is* the blue.

Physical scene forcing the choice: a contact print in Prussian blue, seen on the paper it was coated on.

| Role | Token | Value | Use |
|---|---|---|---|
| Field | `--field` | `#0B2A45` | The ground. Every surface on the site. |
| Ink | `--ink` | `#F4EFE6` | All line work and all text. |
| Ink, secondary | `--ink-70` | `--ink` at 70% | The role and location line. Second lines of a caption. |
| Ink, tertiary | `--ink-45` | `--ink` at 45% | Rail ticks in their inactive state. **Never text.** |

**There is no third colour.** The retired world reserved a red (`--markup: #FF4A2E`) for revision marks; red is a redline pencil and belongs to drafting, so it is gone. Everything that would reach for an accent uses opacity or full-strength ink instead. Links are ink with an underline. The active rail tick is ink at full strength.

This is a **choice, not a property of the world** — brush-coated cyanotypes are routinely tea-toned to warm brown, so a second hue would not be false to the material. It is excluded because two colours let the drawings own 100% of the visual interest, and because it makes drift structurally impossible.

The ink is **warm** (`#F4EFE6`), not the blue-cast white the retired world used (`#EAF2F8`). In a real cyanotype the white *is* the paper, and paper is warm. This is a two-hex change that makes the page read as a print rather than a screen, and it is load-bearing.

Measured contrast against `--field`, not assumed:

- `--ink` on `--field`: **12.8:1** — AAA at every size.
- `--ink-70` on `--field`: **7.0:1** — AAA for body text. Safe for the role line at 12.5px.
- `--ink-45` on `--field`: **3.75:1** — fails AA for text, passes the 3:1 non-text floor (WCAG 1.4.11). Restricted to rail ticks, and the rail's active state is carried by full-strength ink plus width, never by colour alone.

An unlit edge or coating vignette is native to the material and is deliberately **not used**: at these sizes it renders as a gradient, which reads as screen chrome rather than paper.

## Typography

**One family: Archivo**, variable, self-hosted through `next/font`. Its Expanded cut sets the name; the regular cut sets everything else. No second family.

The retired world paired a DIN-lineage face with Martian Mono. Both were drafting instruments — ISO lettering and a dimension-table monospace — and both are retired with the drafting. **There is no monospace on this site.** Numbers use Archivo's tabular figures where alignment matters, which is almost nowhere.

Type does caption work only. There is no display size. The scale is roughly: name at 12px in the Expanded cut, tracked `0.14em`, uppercase; role and location at 12.5px; captions at `clamp(15px, 1.25vw, 18px)`. Captions are measured to about 27–32 characters, because a caption in a plate book is narrow.

**Banned faces**, as training-data defaults regardless of how well they would read: Fraunces, Instrument Serif, Instrument Sans, Playfair, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex (any), Inter as display, DM Sans, DM Serif, Outfit, Plus Jakarta Sans. No serif is used here at all; "editorial subject wants a serif" is precisely the association the ban exists to break.

## The plate

The unit of this site. A square box carrying one drawing.

**Render path: `mask-image`, always.** `mask: url(…) center no-repeat` with `background-color: var(--ink)`. The ink stays token-driven, the browser caches the file, and the DOM never carries path data. The retired world reserved an inline-`<svg>` path for per-part animation; nothing in this world animates individual paths, so **inline SVG is not used**. Every drawing is a mask.

**Every plate carries a `--z` zoom factor, and this is mandatory rather than polish.** The traces contain wildly different amounts of empty margin: `camera` is a tight portrait that fills its 1024 box, while `serve`, `graduation` and `peter-pan` are small full-body figures occupying a third of it. Fitting all of them to the same box makes half look accidental. `mask-size: calc(var(--z) * 100%)` sizes past the box and lets the surplus crop.

Measured bands, settled at first build:

| Band | `--z` | Drawings |
|---|---|---|
| Tight portrait | `1.00`–`1.10` | camera, working, webcam-guitar, falls, broken-sticks, medal, first-camera, drums |
| Mid figure | `1.10`–`1.20` | guitar, bass, keys, filmset, first-guitar, broken-racket, finish, tennis |
| Small full body | `1.45`–`1.55` | serve, running, graduation, deadlift, brazil, first-racket, peter-pan |

`--z` is a content field, editable per frame, because the right value is a judgement about a specific drawing.

A plate is sized by **height** when it stands alone and by **column width** when it sits in a run. Sizing a run by viewport height is the mistake that makes a traced line vanish: at `22vh` the drum kit is nearly invisible, at `1fr` of the measure it holds.

## Components

The whole vocabulary. There are five things.

- **Plate** — one drawing, full height, with an optional caption set in the margin beside it. The default frame.
- **Run** — three to four plates in a row, sized by column width, at about `78dvh`. Deliberately shorter than a plate so it reads as the quiet between the big pictures. Folds to two columns under 860px.
- **Pair** — two plates at equal weight, side by side, no caption. Reserved for the wear frame (the snapped racket and the fistful of broken drumsticks), which is the emotional peak of the page.
- **Caption** — one to three short sentences, set in the left margin, right-aligned against the plate on desktop so its edge points at the figure. Below the plate on mobile.
- **Rail** — a column of twelve ticks at the right edge, one per frame, the active one full-strength ink and wider. The close has no tick. This is real navigation and is keyboard operable. It is the only progress affordance; **there is no scroll cue.**

Header: name at top-left, role and location at top-right, one line each, fixed. It exists so a visitor who leaves in five seconds still leaves with the literal facts.

Close: contact links on the bare field, no drawing. Nothing follows it.

## Layout

The page is a **vertical sequence of frames**, not a scroll of stacked sections. Each plate frame is `min-height: 100dvh` and a scroll-snap point. Runs and the close do not snap.

Plates sit **right of centre** with the caption in the left margin. The asymmetry is the composition: a large quiet void on the left, the figure held to the right, the caption's right edge aligned toward it. Never `h-screen`; always `min-h-100dvh`.

Content measure caps at 1360px. Beware `margin-inline: auto` on a grid item — auto margins override the default stretch and size the item to content, which collapses a run of `1fr` columns to nothing.

## Copy discipline

**Words are rare and expensive.** Six of the twelve frames carry none.

- **A sentence must earn its place against the alternative of a drawing.** If the image says it, delete the sentence.
- **Plain first person, short declaratives.** No adjectives doing a fact's work. Renato's own voice is the reference: "I taught myself seven instruments the same way I learn everything else. By starting."
- **Nothing is stated that the structure can imply.** The site never claims range, curiosity, playfulness, or that its subject never grew up. The childhood plates are never captioned, labelled, dated, or remarked upon.
- **No em-dashes anywhere in visible copy.** Not in captions, links, alt text, or the header. Use a period, a comma, or a regular hyphen. The em-dash is the single most reliable machine-written tell.
- **No numbers that measure throughput.** "Seven instruments" describes a method of learning and stays. Counts of applications shipped, clients served or servers run are banned even though every one is true.
- **Every number carries its mechanism** in the same sentence.
- **No client, company, product or application names**, in any tense.

## Imagery

Twenty-three traced line drawings derived from Renato's own photographs, in `public/drawings/`. **All twenty-three are used.** There are no photographs on the site and no stock imagery of any kind.

Each SVG carries `fill="currentColor"`, `viewBox="0 0 1024 1024"`, a `<title>`, and no background of its own, so the ground is always `--field` and the ink is always CSS-supplied. Verified: 23/23, zero baked colours. The 1024px PNG originals are the authoring artifact and are not shipped.

Five drawings are of Renato as a child: `brazil`, `first-guitar`, `first-racket`, `first-camera`, `peter-pan`. They are drawn at exactly the same ink weight and plate treatment as the adult ones, because the claim is that they are current components of the present person, not history. **Nothing marks them as childhood.**

`brazil` (the boy with a Brazilian flag) and `falls` (the adult at Iguaçu) are a pair and sit adjacent, uncaptioned. `peter-pan` is the only childhood drawing with no adult counterpart; it is last, and nothing follows it.

## Motion

**Two motions, and no others.**

1. **The plate develops.** On first load, the opening plate arrives through a `clip-path: inset()` sweep plus opacity, about 700ms, `cubic-bezier(0.23, 1, 0.32, 1)`. A cyanotype's native behaviour is *exposure*: the image appears under light. This runs once.
2. **The frame advances.** As a frame enters, opacity rises, a 2px blur clears, and scale settles from `1.02`. The blur is not decoration: crossfading two line drawings without it reads as two objects overlapping rather than one becoming the next.

Built with **CSS scroll-driven animations** (`animation-timeline: view()`) over scroll-snap sections. No animation library, no JS scroll listener, nothing on the main thread. `window.addEventListener("scroll")` is banned.

Everything else is still. No hover animation except a link underline and the rail tick. No parallax, no marquee, no per-element scroll-fade.

`prefers-reduced-motion`, and any browser without scroll-driven animation support, gets the settled state: a plain vertical sequence of drawings and sentences, fully legible. **No information exists only in an animated state.**

## Prohibitions

Each checked against the world's own materials. None of these bans a device a cyanotype plate book actually uses.

**Retired with the old world, and specifically not to return:** item numbers, callout balloons, leader lines, dimension lines, break lines, title blocks, bills of materials, revision tables, sheet tabs, detail bubbles, `SCALE 2:1` notes, ISO line-weight semantics, and any monospace type. These are blueprint furniture. The visitor was being asked to learn a notation before being allowed to look.

**Also banned:**

- No visible frame numbers or `01 / 12` pagination. The rail shows position spatially. A number here would be the item number returning in disguise.
- No scroll cues: no "Scroll", no arrow, no animated wheel.
- No drop shadows, gradients, glows, or glassmorphism.
- No rounded card shells. No cards at all.
- No emoji. No icon sets; the site needs no icons.
- No skill bars, proficiency meters, or technology logo walls.
- No hand-rolled decorative SVG. The twenty-three authored drawings are the imagery; nothing else is drawn.
- No eyebrow labels above sections. There are no sections.
- No LLM register: "passionate about", "cutting-edge", "seamless", "leverage", "delve into", "a testament to", "unlock the potential".
- No invented content. Every number traces to something real.

## Admin

`/admin` is not yet built. When it is: same two colours, same family, working weight, mode is Operate, so density and scanability outrank expression. Neither motion appears there.

It edits **content only** — the frames, their order, their captions, their `--z`, and the header and contact strings. Layout and design are code and are not editable, chosen deliberately so the design cannot drift.
