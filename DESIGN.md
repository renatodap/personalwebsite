# Design

<!-- impeccable:design-schema 1 -->

**World: The Field.** One screen that never scrolls, twenty-three drawings of one person, and a camera that moves over them. Prussian blue ground, warm rag-paper line, nothing else.

The colour and the material carry over unchanged from the retired Plate Sequence world: `#0B2A45` ground with a warm `#F4EFE6` line is **cyanotype** (Anna Atkins, 1843, the first photographically illustrated book), not blueprint. A cyanotype is a *photographic* process, so it carries an image and at most a caption, and none of the drafting furniture, item numbers, callout balloons or title blocks, that the earlier Exploded Assembly world dragged in and was retired for.

What is retired is the **sequence**. A plate book argues by putting one image after another and letting adjacency talk, which requires a scroll. Renato removed the scroll on 2026-07-26: *"basically everything fits in one page."*

---

## The governing idea

**Simultaneity, then depth.** Five drawings stand on one screen at once. Going into one does not swap to another layout; it moves a camera over the same canvas, and that aspect's own drawings are revealed orbiting it. Range is taken in at a glance rather than accumulated on the way down.

Four consequences bind everything downstream:

1. **The drawing is the display element.** There is no headline size anywhere on this site, because the figure is the headline.
2. **One space, not a set of screens.** *(Binding, 2026-07-27: "when i zoom in i need to see the exact same layout as zoomed out.")*
3. **Nothing overlaps. At all.** Not a little, not at 25%. Two traced line figures on top of each other read as one damaged figure, and the whole page is line figures. *(Binding, 2026-07-27: "no overlaps are allowed at all.")*
4. **Depth is the argument.** The five childhood drawings orbit the adult they answer and are invisible until you go in. Nothing is written about it.

## The three levels

| | What is on screen | Words |
|---|---|---|
| **Far** | The five heroes alone. Nothing else is drawn. | None |
| **Aspect** | One hero, its own drawings orbiting it, and no other aspect at all. | Its one or two sentences |
| **Near** | One of those smaller drawings, filling the frame. | None: the words belong to the aspect, not to each drawing |

*(Binding, 2026-07-27: "once im in camera i cant see anything music, just arrows to move.")*

## Composition

The canvas is measured 0-100 on both axes at a **fixed** aspect ratio per arrangement: **1.6 wide, 0.62 tall**. Fixing the ratio is what makes the composition exact rather than approximate, because a drawing's width in canvas percent is then a constant instead of something that swells on a narrow window. Surplus viewport is bare field, invisible because the ground is one flat colour.

A drawing is placed by the **centre** of its box and sized by **height** alone; width comes from its own trimmed viewBox. Sizing by height is what makes many drawings read as one person at one scale.

**Two arrangements, separately authored.** The switch is keyed on the canvas's own proportion, `max-aspect-ratio: 19/20`, not on a pixel width, because the composition is a shape: a tall narrow window wants the tall arrangement whatever its width. `TALL_QUERY` in `layout.ts` and the CSS media query must not disagree.

**The arrangement is resolved in JavaScript and emitted as ONE set of variables** (`--x`, `--y`, `--h`, `--ring`, `--oh`). This is not a style preference; it is the fix for the worst bug this design had. Emitting both sets and choosing between them in a media query meant two rules in two blocks had to agree, and they did not: rings kept their wide radius on tall screens, and because custom properties inherit, a bare `.mark` rule then placed every orbiter at its *hero's* coordinates and whole aspects collapsed onto one point. One variable cannot disagree with itself.

## Orbits

A satellite is placed by a radius and an angle around its hero rather than by an authored coordinate, which makes non-overlap true by construction. One ring per aspect, satellites spread evenly around it.

**The ring is a square box that spins**, so the satellite rides a circle in *pixels*. Its child counter-rotates at the same rate so the drawing stays upright while it travels. *(Binding, 2026-07-27: "they have to be always correctly oriented even as they orbit around.")* One turn takes **fifteen minutes** — slow enough that nothing appears to move, and the arrangement is simply different if you come back.

**The orbit path is never drawn.** `background`, `border`, `outline`, `box-shadow` and both pseudo-elements are explicitly off, as declarations rather than a comment, because it kept coming back.

Ring radius is **computed, not chosen** (`ringOf`), and getting it right took four attempts, each recorded because each was a real geometric error:

1. A fixed multiple of hero height ignores that the ring must clear the hero's **width**. `falls` is 1.32:1.
2. Width in canvas percent depends on the **canvas ratio**, so it differs between arrangements for the same drawing.
3. Clearing both axes is still not enough: a satellite clears the hero above it and beside it and still cuts the **corner** on the diagonal. The condition that holds at every angle is that the hero's box, grown by the satellite's half-size and the gap, fits entirely inside the orbit ellipse, so the radius is a hypotenuse.
4. `ORBIT_X` was hand-picked and described an ellipse the CSS was never drawing. It is **derived** from the canvas ratio now.

Current values: `RING_OF_HERO` 0.5 as a floor, `GAP` 3.2, `ORBITER_SCALE` 1 wide and 0.55 tall.

## The camera

**A CSS `transform` over one canvas, animated with the Web Animations API.** Closed form: with `transform-origin: 0 0`, bringing canvas point `(cx, cy)` to anchor `(ax, ay)` at zoom `k` is `translate(ax − k·cx, ay − k·cy) scale(k)`, in percentages that resolve against the stage's own box. No measurement, no `ResizeObserver`, no layout read.

**Not the View Transitions API.** It cannot be interrupted or retargeted once running, and a camera you cannot redirect mid-flight is not a camera. It also animates bitmap snapshots, which across this much scale is the exact softness this design avoids. **Not FLIP** either: a layout read per move to compute what one expression already knows.

**Zoom is derived from the RING, not the hero** (`zoomFor`, `FRAME` 44, clamped 1.25 to 3.4). Sizing it from the hero assumed every aspect needed the same magnification, but the thing that must fit on screen is the whole orbit, and `falls` needs a far wider one than `working`. The hero's on-screen size therefore varies slightly between aspects, which is the correct trade.

**Going into a small drawing keeps it where it was.** The camera moves so the drawing stays roughly in the part of the frame you were already looking at rather than snapping to the middle: measured, 44px of drift while growing 2.73×. *(Binding, 2026-07-27.)* The aim is **measured from the DOM** at the moment of the click, because the ring turns and the angle in the layout is only where the drawing started.

**Crispness.** A scale animation is not re-rastered while it runs, so everything is soft for the whole flight. Countermeasures: a 2.2px blur across the flight, `commitStyles()` then `cancel()` at the end so the final transform becomes an ordinary scripted style and *does* re-raster, and **`will-change: transform` is banned outright** because it pins the layer to a bitmap that never re-rasters. Research: `docs/research/2026-07-26-zoomable-montage-research.md`.

## Navigation

- **One direction, and it wraps.** brazil → music → sport → camera → software → brazil. A single chevron at the right edge that leans further right on hover. One direction is a simpler promise than two.
- **Onward means something different at each level.** At an aspect it is the next aspect; standing inside one it is the next drawing *of that aspect*, until you zoom back out.
- **Zoom out** is drawn, not labelled: four corner rules that pull apart on hover, which is what the camera is about to do. It climbs one level.
- Every drawing is a real `<button>`. Click, tap, Enter and Space all work; hover is decoration only, because a phone has no hover state.
- Five labels sit by the five heroes in the far view, flipping above a hero that sits low so they never reach the contact bar.
- Escape, the zoom-out control and the browser back button all climb a level. Each drawing pushes a `#slug`, so the URL is shareable and the phone's back gesture behaves.

## Colour

**Drenched, two colours, no accent.** The surface *is* the blue.

| Role | Token | Value | Use |
|---|---|---|---|
| Field | `--field` | `#0B2A45` | The ground. Every surface. |
| Ink | `--ink` | `#F4EFE6` | All line work and all text. |
| Ink, secondary | `--ink-70` | 70% | The role line, second sentences. |
| Ink, texture | `--ink-55` | 55% | Drawings that are not the one being looked at. |
| Ink, quiet | `--ink-40` | 40% | Labels and controls. **Never body text.** |
| Ink, hairline | `--ink-18` | 18% | Link underlines at rest. |
| Ink, solid | `--ink-solid` | `#F4EFE6` | The melt canvas only. See Motion. |

The ink is **warm**, not the blue-cast white the first world used: in a real cyanotype the white *is* the paper, and paper is warm. Measured against `--field`: `--ink` 12.8:1, `--ink-70` 7.0:1, `--ink-55` 4.9:1, `--ink-40` 3.4:1 (non-text only, above the 3:1 floor of WCAG 1.4.11). No state is ever carried by colour alone.

## Typography

**One family: Archivo**, variable, through `next/font`. The Expanded cut sets the name and the labels; the regular cut sets everything else. **There is no monospace and no serif on this site.**

Type does caption work only. Name 12px expanded, tracked `0.14em`, uppercase; labels 11px in the same cut; role and location 12.5px; sentences `clamp(15px, 1.15vw, 18px)`.

**Banned faces**, as training-data defaults regardless of how well they would read: Fraunces, Instrument Serif, Instrument Sans, Playfair, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter as display, DM Sans, DM Serif, Outfit, Plus Jakarta Sans.

## Motion

**Four motions and no others.**

1. **The field develops.** On load the five arrive on a stagger, each wiping in from the top through a `clip-path` sweep. `clip-path` only, never opacity: a drawing's opacity is its WEIGHT, and an animation filling forwards would win over that forever. Applied with `.mark:not(.orbiter)` — `animation` is a shorthand, and a bare `.mark` rule silently resets an orbiter's counter-rotation.
2. **The camera flies.** 720ms, `cubic-bezier(0.22, 1, 0.32, 1)`, interruptible: retargeting commits where the camera is, cancels, and lets the next animation infer its start from there.
3. **The orbits turn.** Fifteen minutes a revolution, pure CSS, no JavaScript.
4. **One drawing melts into the next.** 1500ms, and only between two heroes.

### The melt

Ink is sampled from each drawing by rasterising it small and reading the **alpha channel** (`ink.ts`, 5200 points), not by calling `getPointAtLength` thousands of times. Points, not paths, because these are potrace outputs ranging from 4 subpaths to 140: every path-morphing tool maps subpath to subpath, so morphing those two leaves 136 shapes with nowhere to go.

It is drawn as **capsules 3.4px wide** from where a particle was to where it is, which gives squash and stretch for free — a fast mark draws a long capsule, a resting mark draws a circle. Blur runs 1px → 4.5px → 1px through a static `feColorMatrix` alpha threshold, so masses merge at the midpoint and the handover to the vector mask is invisible at both ends.

Three failures are recorded because each was instructive. **The goo threshold on 1px dots makes amoebas**: it needs bodies, which is what the capsule width supplies. **At 7.5px wide the figure fills in solid** and can never resolve back to a line drawing. **A cancelled sampling callback must not report done**, or React's double-invoked effects tear down the run before it draws a frame; and the clock must start when the ink is ready, not when the effect fires, or a cold pair skips the whole melt.

Motion has **anticipation, drag and follow-through**: it gathers before it leaves, lanes tear away at different times rather than sliding off as a sheet, and it overshoots and settles, because liquid does not stop where it was aimed. Research: `docs/research/2026-07-27-liquid-deconstruct-reconstruct.md`.

**`prefers-reduced-motion: reduce` removes the zoom and the melt entirely.** Not a faster zoom: WCAG 2.3.3 names zooming specifically, and a zoom covering a large part of the screen is the motion most likely to cause vestibular symptoms. The camera jumps, the states cross-fade, everything stays reachable, and no information exists only in an animated state.

## Imagery

Twenty-three traced line drawings derived from Renato's own photographs, in `public/drawings/`. **All twenty-three are used.** No photographs and no stock imagery of any kind.

Each SVG carries `fill="currentColor"`, a trimmed viewBox, a `<title>`, and no background of its own, so the ground is always `--field` and the ink is always CSS-supplied. Intrinsic ratios are **generated** into `src/lib/ratios.ts` by `scripts/ratios.mjs`; a test fails if the committed file and the files on disk disagree.

Five drawings are of Renato as a child: `brazil`, `first-guitar`, `first-racket`, `first-camera`, `peter-pan`. They are drawn at exactly the same ink weight as the adult ones, because the claim is that they are current components of the present person. **Nothing marks them as childhood.** `peter-pan` is the only one with no adult counterpart: the rule is established four times and broken once, and the site never remarks on either.

## Copy discipline

**Words are rare and expensive.** Nine sentences on the whole site, and none is visible until you have gone in to look at something.

- A sentence must earn its place against the alternative of a drawing.
- Plain first person, short declaratives. No adjectives doing a fact's work.
- **Nothing is stated that the structure can imply.** The site never claims range, curiosity or playfulness.
- **No em-dashes anywhere in visible copy.** The single most reliable machine-written tell.
- No numbers that measure throughput. Every number carries its mechanism.
- No client, company, product or application names, in any tense.

Enforced by `prisma/copy-rules.mjs` against every visible string, in the seed and in the tests.

## Data

**Content is Postgres; geometry is code.** Aspects, sentences, alt text and which drawing leads are rows, seeded from `src/content/site.mjs`, so `/admin` can edit them without a deploy. Where anything sits and how large it is lives in `src/lib/layout.ts` and has no knob, so the composition cannot drift through a form. Every read falls back to the seed source, so an unreachable database renders the site rather than an error page.

## Verification

`npm test` (29 tests) covers coverage, zero overlap, ring closure in both directions and within each aspect, the camera identity, the generated ratio table, and the copy guard.

**`scripts/overlap.mjs` is the one that matters.** It measures what the browser *actually renders* at fourteen viewport sizes across every level and fails on any collision. It exists because the unit tests passed for days while the live page was visibly colliding: they checked the model, and the model and the CSS had drifted apart. Run it against a dev server before believing any layout change.

Note for anyone automating: the orbiters rotate forever, so Playwright's actionability check never sees them settle and `.click()` times out. Dispatch the click directly.

## Prohibitions

Carried forward: no drafting furniture of any kind, no monospace, no third colour, no drop shadows, gradients, glows or glassmorphism, no cards, no emoji, no icon sets, no skill bars, no logo walls, no hand-drawn decorative SVG, no cropping of a drawing by any mechanism, no LLM register, no invented content, no client or product names.

Specific to this world:

- **No scroll.** Not a hidden one, not a `scroll-behavior`, not a snap point.
- **No overlap between any two drawings, ever**, at any viewport size.
- **No `will-change: transform`.** It makes every zoomed drawing permanently soft.
- **No View Transitions API.** It cannot be interrupted, which this interaction requires.
- **No second layout for the zoomed state.** One canvas, one camera.
- **No visible orbit path.**
- **No animation of a layout property.** The camera is `transform` only.
- **No placement variable emitted twice** for two breakpoints. Resolve the arrangement once, in code.

## Admin

`/admin` is not yet built. When it is: same two colours, same family, working weight, mode is Operate, so density and scanability outrank expression. None of the four motions appears there.

It edits **content only**: the aspects, their sentences, the alt text, which drawing leads an aspect, and the header and contact strings. **Not** where anything sits or how large it is.
