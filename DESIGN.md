# Design

<!-- impeccable:design-schema 1 -->

**World: The Field.** One screen, one person, twenty-three drawings, one camera. Prussian blue ground, warm rag-paper line, every version of him standing in one space at one time.

The colour and the material carry over from the retired Plate Sequence world and are unchanged: `#0B2A45` ground with a warm `#F4EFE6` line is **cyanotype** (Anna Atkins, 1843, the first photographically illustrated book), not blueprint. A cyanotype is a *photographic* process, so it carries an image and at most a caption, and none of the drafting furniture, item numbers, callout balloons, title blocks, that the earlier Exploded Assembly world dragged in and was retired for.

What is retired is the **sequence**. The plate book made its argument by putting one image after another and letting adjacency do the talking, which requires a scroll. Renato removed the scroll on 2026-07-26: *"basically everything fits in one page."*

---

## The governing idea

**Simultaneity, not sequence.** Eighteen versions of one person are on one screen at one time, and you cannot look at any of them without seeing the others. Range stops being something the visitor accumulates on the way down and becomes something taken in at a glance.

Four consequences bind every decision downstream:

1. **The drawing is the display element.** Type never competes with it. There is no headline size anywhere on this site, because the figure is the headline.
2. **One space, not two screens.** Zooming in does not swap to another layout. It moves a camera over the same canvas, so what you see close up is exactly what you saw far away, larger, in its own place, with its neighbours still around it. *(Binding, at Renato's instruction 2026-07-27: "when i zoom in i need to see the exact same layout as zoomed out.")*
3. **Every drawing is a destination.** Not five. Any of the twenty-three can be zoomed into, and from any of them you can keep moving left, right, up or down until you are genuinely at the edge of the field.
4. **Depth is the argument.** The five childhood drawings sit beside the adult they answer and are invisible until the camera comes in close. Zoom into the man and the boy is already there, in the same space, and nothing is written about it.

## Composition

The canvas is measured 0-100 on both axes at a **fixed** aspect ratio per arrangement, 1.6 wide and 0.62 tall. Fixing the ratio is what makes the composition exact rather than approximate: a drawing's width in canvas percent is then a constant instead of something that swells on a narrow window and collides with its neighbour. Surplus viewport is bare field, invisible because the ground is one flat colour.

A drawing is placed by the **centre** of its box and sized by **height** alone; width comes from its own trimmed viewBox. Sizing by height is what makes eighteen drawings read as one person at one scale rather than as eighteen assorted boxes.

**NOTHING OVERLAPS.** Not a little, not at 25%: at all. Two traced line figures on top of each other read as one damaged figure, and the whole page is line figures. *(Binding, at Renato's instruction 2026-07-27: "no overlaps are allowed at all.")* Positions were authored by hand and then relieved of every collision by a relaxation solver holding a 1.4% gap, which moved nothing more than 2.1% from where it was drawn. A test asserts the zero.

**Three weights**, because only about four things are read in parallel and eighteen equal marks would be texture with no way in: five heroes at 18-26% of canvas height carry full ink and the aspect's label; thirteen others at 7-15% sit at 55% ink; the ground is the rest. Hovering one aspect lights every drawing of it wherever it sits and drops the others to 16%, which shows the grouping without drawing a single line.

**Two arrangements, separately authored.** A composition made for a landscape frame becomes a list when poured into a portrait one. The switch is keyed on the canvas's own proportion (`max-aspect-ratio: 19/20`), not on a pixel width, because the composition is a shape: a tall narrow window wants the tall arrangement whatever its width. The CSS query and `TALL_QUERY` in `layout.ts` must not disagree.

## The camera

**A CSS `transform` over one canvas, animated with the Web Animations API.** Closed form: with `transform-origin: 0 0`, bringing canvas point `(cx, cy)` to anchor `(ax, ay)` at zoom `k` is `translate(ax − k·cx, ay − k·cy) scale(k)`, in percentages that resolve against the stage's own box. No measurement, no `ResizeObserver`, no layout read, correct at every viewport.

**Not the View Transitions API.** It cannot be interrupted or retargeted once running, and a camera you cannot redirect mid-flight is not a camera. It also animates bitmap snapshots, which across this much scale is the exact softness this design works to avoid. **Not FLIP** either: it needs a layout read per move to compute what one expression already knows.

`k` is **capped at 4.2** so a small drawing does not fly the camera so far in that the field around it leaves the frame. Seeing where you are is the point.

**Crispness, and the trap.** A scale animation is *not* re-rastered while it runs, so every drawing is soft for the whole flight. Three countermeasures: a 2.4px blur that rises and falls across the flight, which hides the interpolation and is already the house rule for crossing between two line drawings; `commitStyles()` then `cancel()` at the end, which turns the final transform into an ordinary scripted style and *does* re-raster; and **`will-change: transform` is banned outright**, because it pins the layer to a fixed bitmap that never re-rasters under transform and would leave every zoomed drawing permanently soft. Its appearance in this codebase is a bug. Research: `docs/research/2026-07-26-zoomable-montage-research.md`.

## Navigation

- **Any drawing** is a real `<button>`. Click, tap, Enter and Space all work; hover is decoration only, because a phone has no hover state.
- **Five labels** sit under the five largest drawings and never move with the camera. They are the navigation, and they are always visible: the interaction is not discoverable otherwise, and a hover-only affordance is not an affordance on a phone.
- **Arrows and swipe** move to the nearest drawing in that direction, chosen by a 75-degree cone rather than a quadrant, so a drawing sitting just past 45 degrees is not stranded unreachable in both directions. A direction with nothing in it simply does not move, which is how the field says you have reached its edge. A test asserts the graph is fully connected from every drawing.
- **Exits** are drawn at the four edges, one per direction that has something in it. A zoomable interface loses people when the exits are invisible.
- **Escape**, the Back control, and the browser back button all zoom out. Each drawing pushes a `#slug`, so the URL is shareable and the phone's back gesture does the expected thing.

## Color

**Strategy: Drenched, two colours, no accent.** The surface *is* the blue.

Physical scene forcing the choice: a contact print in Prussian blue, seen on the paper it was coated on.

| Role | Token | Value | Use |
|---|---|---|---|
| Field | `--field` | `#0B2A45` | The ground. Every surface on the site. |
| Ink | `--ink` | `#F4EFE6` | All line work and all text. |
| Ink, secondary | `--ink-70` | `--ink` at 70% | The role and location line. Second lines of a caption. |
| Ink, field texture | `--ink-55` | `--ink` at 55% | Drawings that are not the one you are looking at. |
| Ink, quiet | `--ink-40` | `--ink` at 40% | Labels and exit marks. **Never body text.** |

**There is no third colour.** The retired world reserved a red (`--markup: #FF4A2E`) for revision marks; red is a redline pencil and belongs to drafting, so it is gone. Everything that would reach for an accent uses opacity or full-strength ink instead. Links are ink with an underline. The drawing you are looking at is ink at full strength; everything else is the same ink, quieter.

This is a **choice, not a property of the world** — brush-coated cyanotypes are routinely tea-toned to warm brown, so a second hue would not be false to the material. It is excluded because two colours let the drawings own 100% of the visual interest, and because it makes drift structurally impossible.

The ink is **warm** (`#F4EFE6`), not the blue-cast white the retired world used (`#EAF2F8`). In a real cyanotype the white *is* the paper, and paper is warm. This is a two-hex change that makes the page read as a print rather than a screen, and it is load-bearing.

Measured contrast against `--field`, not assumed:

- `--ink` on `--field`: **12.8:1** — AAA at every size.
- `--ink-70` on `--field`: **7.0:1** — AAA for body text. Safe for the role line at 12.5px.
- `--ink-55` on `--field`: **4.9:1** — passes AA even for text; used for the field texture and the labels' lit state.
- `--ink-40` on `--field`: **3.4:1** — fails AA for text, passes the 3:1 non-text floor (WCAG 1.4.11). Restricted to the aspect labels and the exit marks, and no state is ever carried by colour alone: a drawing's state is carried by opacity plus the camera's position.

An unlit edge or coating vignette is native to the material and is deliberately **not used**: at these sizes it renders as a gradient, which reads as screen chrome rather than paper.

## Typography

**One family: Archivo**, variable, self-hosted through `next/font`. Its Expanded cut sets the name; the regular cut sets everything else. No second family.

The retired world paired a DIN-lineage face with Martian Mono. Both were drafting instruments — ISO lettering and a dimension-table monospace — and both are retired with the drafting. **There is no monospace on this site.** Numbers use Archivo's tabular figures where alignment matters, which is almost nowhere.

Type does caption work only. There is no display size. The scale is roughly: name at 12px in the Expanded cut, tracked `0.14em`, uppercase; role and location at 12.5px; aspect labels at 11px in the same cut; sentences at `clamp(15px, 1.15vw, 18px)`, measured to about 36 characters.

**Banned faces**, as training-data defaults regardless of how well they would read: Fraunces, Instrument Serif, Instrument Sans, Playfair, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex (any), Inter as display, DM Sans, DM Serif, Outfit, Plus Jakarta Sans. No serif is used here at all; "editorial subject wants a serif" is precisely the association the ban exists to break.

## Copy discipline

**Words are rare and expensive.** Nine sentences on the whole site, and none of them is visible until you have gone in to look at something.

- **A sentence must earn its place against the alternative of a drawing.** If the image says it, delete the sentence.
- **Plain first person, short declaratives.** No adjectives doing a fact's work. Renato's own voice is the reference: "I taught myself seven instruments the same way I learn everything else. By starting."
- **Nothing is stated that the structure can imply.** The site never claims range, curiosity, playfulness, or that its subject never grew up. The childhood drawings are never captioned, labelled, dated, or remarked upon; they simply turn out to be standing beside the adult when you get close enough to see them.
- **No em-dashes anywhere in visible copy.** Not in captions, links, alt text, or the header. Use a period, a comma, or a regular hyphen. The em-dash is the single most reliable machine-written tell.
- **No numbers that measure throughput.** "Seven instruments" describes a method of learning and stays. Counts of applications shipped, clients served or servers run are banned even though every one is true.
- **Every number carries its mechanism** in the same sentence.
- **No client, company, product or application names**, in any tense.

## Imagery

Twenty-three traced line drawings derived from Renato's own photographs, in `public/drawings/`. **All twenty-three are used.** There are no photographs on the site and no stock imagery of any kind.

Each SVG carries `fill="currentColor"`, `viewBox="0 0 1024 1024"`, a `<title>`, and no background of its own, so the ground is always `--field` and the ink is always CSS-supplied. Verified: 23/23, zero baked colours. The 1024px PNG originals are the authoring artifact and are not shipped.

Five drawings are of Renato as a child: `brazil`, `first-guitar`, `first-racket`, `first-camera`, `peter-pan`. They are drawn at exactly the same ink weight and treatment as the adult ones, because the claim is that they are current components of the present person, not history. **Nothing marks them as childhood.**

Each sits **beside the adult it answers** and is invisible until the camera comes in close, so the wide view is all recent and the boy is what you get for going in. `peter-pan` is the only childhood drawing with no adult counterpart: the rule is established four times and broken once, and the site never remarks on either.

## Motion

**Two motions and no others.**

1. **The field develops.** On load the drawings arrive on a stagger, each wiping in from the top through a `clip-path` sweep, about 1.4s end to end. A contact sheet coming up in the tray. Once. `clip-path` only, never opacity: a drawing's opacity is its WEIGHT on the field, and an animation filling forwards would win over that forever.
2. **The camera flies.** 700ms, `cubic-bezier(0.22, 1, 0.32, 1)`, interruptible. Retargeting commits where the camera actually is, cancels, and lets the next animation infer its start from there, so crossing the field in five presses makes it chase rather than snap.

Everything else is opacity. No parallax, no marquee, no scroll-driven anything, because there is no scroll.

**`prefers-reduced-motion: reduce` removes the zoom entirely.** Not a faster zoom: WCAG 2.3.3 names zooming specifically, and a zoom covering a large part of the screen is the motion most likely to cause vestibular symptoms. The camera jumps, the states cross-fade, everything stays reachable and legible, and no information exists only in an animated state.

## Prohibitions

Each checked against the world's own materials, with one narrowing recorded below.

**Retired with the old world, and specifically not to return:** item numbers, callout balloons, leader lines, dimension lines, break lines, title blocks, bills of materials, revision tables, sheet tabs, detail bubbles, `SCALE 2:1` notes, ISO line-weight semantics, and any monospace type. These are blueprint furniture. The visitor was being asked to learn a notation before being allowed to look.

**Also banned:**

- No visible numbering or `01 / 12` pagination. Position is spatial and is shown spatially.
- **No scroll.** Not a hidden one, not a `scroll-behavior`, not a snap point. `html, body { overflow: hidden }`.
- **No scroll cues**, which now follows from there being no scroll.
- **No second layout for the zoomed state.** One canvas, one camera.
- **No overlap between any two drawings, ever.**
- **No `will-change: transform`.** It makes every zoomed drawing permanently soft.
- **No View Transitions API.** It cannot be interrupted, which this interaction requires.
- No drop shadows, gradients, glows, or glassmorphism.
- No rounded card shells. No cards at all.
- No emoji. No icon sets; the site needs no icons.
- No skill bars, proficiency meters, or technology logo walls.
- No hand-rolled decorative SVG. The twenty-three authored drawings are the imagery; nothing else is drawn.
- **No cropping of a drawing, ever**, by any mechanism: not `mask-size` past 100%, not `object-fit: cover`, not an `overflow: hidden` box smaller than its figure.
- No `content-visibility: auto`. Skipped subtrees paint as bare ground, which on a page whose entire content is images means a blank screen. The full mask payload is ~0.64 MB across all twenty-three, each cached individually, so there is nothing to defer.
- No animation of a layout property. The camera is `transform` only.
- No eyebrow labels above sections. There are no sections.
- No LLM register: "passionate about", "cutting-edge", "seamless", "leverage", "delve into", "a testament to", "unlock the potential".
- No invented content. Every number traces to something real.

## Admin

`/admin` is not yet built. When it is: same two colours, same family, working weight, mode is Operate, so density and scanability outrank expression. Neither motion appears there.

It edits **content only**: the aspects, their sentences, the alt text, which drawing leads an aspect, and the header and contact strings. **Not** where anything sits or how large it is, which live in `src/lib/layout.ts` and have no knob. Layout and design are code and are not editable, chosen deliberately so the composition cannot drift through a form.
