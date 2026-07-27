# Design: The Field

One screen. Every drawing at once. Zoom into one to read about that part of him,
zoom back out. Supersedes the Plate Sequence world of 2026-07-26 at Renato's
instruction: *"i like this font but i want a big redesign. basically everything
fits in one page."*

Date: 2026-07-26. Research behind it:
`docs/research/2026-07-26-zoomable-montage-research.md`.

## What changes and what does not

**Kept, unchanged:** the Prussian blue field `#0B2A45`, the warm rag-paper ink
`#F4EFE6`, Archivo as the only family, the twenty-three traced drawings rendered
as CSS masks, no third colour, no cropping, no photographs, the copy guard.

**Replaced:** the twelve-frame vertical sequence, the scroll, the scroll-snap,
the rail, the `Frame`/`Plate` data model, and the two scroll-driven motions.

**The new premise.** The old site made its argument by *sequence* — one plate
after another, adjacency doing the talking. Sequence needs a scroll, and a scroll
is now gone. The new site makes the same argument by *simultaneity*: eighteen
versions of one person on one field at one time, and you cannot look at any of
them without seeing all the others. Range stops being something you accumulate on
the way down and becomes something you take in at a glance.

## Structure

Two states, one page, no scroll anywhere.

**The field.** A single screen. Eighteen adult drawings arranged as one
composition on a blue ground. Five of them are noticeably larger and carry a
small label: those are the five ways in. The other thirteen are field texture.
The header sits top-left and top-right; contact links sit along the bottom.

**An aspect.** Activating a labelled drawing flies the camera until that drawing
fills its part of the screen. Everything else on the field fades out. A short
title, one or two sentences, and the rest of that aspect's drawings — including
the childhood one — fade in beside it. The bottom bar swaps from contact links to
Back.

Zooming out reverses it exactly.

Only one level deep, and only five destinations. Zoomable interfaces get people
lost when the space is unbounded; this one is a fixed field with five stops and
the way back is always the inverse of the way in.

## The five aspects

Every one of the twenty-three drawings belongs to exactly one aspect. The five
heroes are the only interactive drawings. The childhood drawings never appear on
the field — they are the reward for going in, which is why the montage is "all
recent" as instructed and the boy is still on the site.

| Aspect | Hero | On the field with it | Revealed inside |
|---|---|---|---|
| Music | `guitar` | `keys`, `bass`, `drums`, `webcam-guitar`, `broken-sticks` | `first-guitar` |
| Sport | `serve` | `tennis`, `running`, `finish`, `medal`, `deadlift`, `broken-racket` | `first-racket` |
| Software | `working` | `graduation` | — |
| Camera | `camera` | `filmset` | `first-camera` |
| Brazil | `falls` | — | `brazil`, `peter-pan` |

Eighteen on the field, five revealed, twenty-three used. A test asserts it.

`peter-pan` still has no adult counterpart and is still the last drawing anyone
can reach.

## Copy

Every string on the site, in full. All of it passes the existing copy guard.

Header: **Renato Prado** / **Software engineer. Indianapolis.**
*("Lead" removed at Renato's instruction.)*

- **Music** — "I taught myself music." / "Seven instruments, in the order I got
  curious about them."
- **Sport** — "Four years of college tennis. The last one as captain." / "7:32
  per mile, for 13.1 of them."
- **Software** — "I learned it the same way I learned the guitar." / "Computer
  science, Rose-Hulman, 2026."
- **Camera** — "I shoot and edit my own video."
- **Brazil** — "I grew up in Brazil and moved to Indiana for school."

Two changes are instructions rather than choices: the sentence *"I started in
mechanical engineering and switched to computer science a year in. Late enough
that it hurt."* is deleted, replaced by the degree line; and "Lead" is dropped
from the role.

`Rose-Hulman` must therefore come **out of `FORBIDDEN_ENTITIES`**. That list
exists to keep client and employer names off the site; his own school is neither,
and he asked for it by name. The removal is recorded in the file so nobody
restores it as a mistake.

The old copy discipline holds otherwise: no em-dashes, no throughput numbers, no
client or product names, no LLM register, and a sentence still has to earn its
place against the alternative of a drawing. Nine sentences on the whole site.

## Composition

The field is a **canvas**, not a layout. Each drawing has a centre `(x, y)` in
canvas percent and a height `h` in canvas percent; its width comes from the
drawing's own intrinsic ratio, so nothing is distorted and nothing is padded.

Three levels of visual weight, because only about four things can be read in
parallel and eighteen equal marks would be a texture with no way in:

1. **Heroes** — five drawings at roughly 22–26% of canvas height, full-strength
   ink, labelled.
2. **Satellites** — thirteen drawings at 9–15%, ink at 55%, unlabelled.
3. **The ground** — everything else. The field is mostly empty and that is the
   composition.

Drawings are placed near their own hero so each aspect reads as a loose cluster,
but the clusters interlock rather than sitting in five boxes. Hovering a hero
raises every drawing of that aspect to full strength wherever it sits, which
shows the grouping without drawing a single line.

Two authored position sets: **wide** (landscape, one arrangement) and **tall**
(portrait, a different arrangement, not the wide one reflowed). A composition
composed for one frame does not survive being poured into the other. The switch
is at 860px, matching the existing breakpoint.

The canvas is clamped so an ultrawide monitor does not stretch the arrangement
into isolated marks: it never exceeds 1.9:1 or goes narrower than 0.62:1, and the
surplus is bare field, which is invisible because the ground is one flat colour.

Intrinsic ratios are **generated from the SVGs** into `src/lib/ratios.ts` by
`scripts/ratios.mjs`, and a test fails if the committed file and the files on
disk disagree. Hand-typed ratios would drift the moment a drawing is retraced.

## The zoom

**A transform camera over one canvas, animated with the Web Animations API.**
Not the View Transitions API: a view transition cannot be interrupted or
retargeted once it is running, and the whole premise here is that someone can
change their mind mid-flight. Not FLIP either, which needs layout reads on every
invocation to do what one arithmetic expression already does.

The camera is closed form. With `transform-origin: 0 0` on the stage, bringing
canvas point `(cx, cy)` to screen point `(ax, ay)` at zoom `k` is:

```
translate(calc(<ax − k·cx>%), calc(<ay − k·cy>%)) scale(k)
```

Percentages in `translate` resolve against the stage's own box, which *is* the
canvas, so this is resolution independent: no measurement, no `ResizeObserver`,
no layout read, correct at every viewport. `k` is chosen per aspect so the hero
lands at a fixed fraction of canvas height, and `(ax, ay)` is off-centre on wide
screens to leave the text its margin.

**Interruption** is the point. `transform` is animated with a single-keyframe
WAAPI animation so its start value is inferred from wherever the stage currently
is; retargeting mid-flight commits the running animation's current value, cancels
it, and animates on from there. Press five heroes in a second and the camera
simply chases, never snapping.

**Crispness** is the trap the research found. A scale animation is not
re-rastered while it runs, so the drawing is soft for the entire flight. Three
countermeasures, all deliberate:

1. A 2.5px blur that rises and falls across the flight. It hides the
   interpolation, and it is already this site's rule that crossfading two line
   drawings without blur reads as two objects overlapping rather than one
   becoming the next. The artifact fix and the design rule are the same
   instruction.
2. `commitStyles()` then `cancel()` when the flight ends. That turns the final
   transform into an ordinary scripted style, which *does* re-raster, so the
   settled drawing is sharp.
3. **`will-change: transform` is banned.** It pins the raster to a fixed bitmap
   that never updates under transform, which would leave the zoomed drawing
   permanently soft. Its appearance in this codebase is a bug.

Everything the aspect screen adds — the sentences, the extra drawings — is
ordinary correctly-sized DOM, never a scaled leftover, so it is crisp by
construction.

## Motion

Four motions and no others.

1. **The field develops.** On load, the eighteen plates arrive on a stagger,
   each wiping in from the top with a `clip-path` sweep. About 1.4s end to end.
   A contact sheet coming up in the tray. Once.
2. **The camera flies.** 620ms, `cubic-bezier(0.23, 1, 0.32, 1)`, interruptible.
3. **The field recedes.** Non-active drawings fade to zero while the camera
   moves; the active aspect's satellites hold ~120ms longer than the rest, so
   the group reads as regrouping rather than vanishing.
4. **The aspect arrives.** Text and revealed drawings fade up with an 8px rise,
   delayed behind the camera so they do not compete with it.

Hover raises ink strength and nothing else. No parallax, no marquee, no
scroll-driven anything, because there is no scroll.

**`prefers-reduced-motion: reduce` replaces the zoom with a crossfade.** Not a
faster zoom: large-scale zooming is specifically the motion that WCAG 2.3.3 names
and the one that most reliably causes vestibular symptoms. Under the query the
camera jumps to its target with no animation and no blur, and the two states
crossfade over 160ms. Everything remains reachable and readable.

## Accessibility

- Each hero is a real `<button>`, labelled with the aspect name and the drawing's
  description. Click, tap, Enter and Space all work; hover is decoration only,
  since a touch device has no hover state and this site has to work on a phone.
- The five labels are always visible. The interaction is not discoverable
  otherwise, and a hover-only affordance is not an affordance on a phone.
- Entering an aspect moves focus to its heading (`tabindex="-1"`) **and**
  announces through an `aria-live="polite"` region. Both, because focus alone is
  not reliably announced by NVDA in Firefox or VoiceOver in Safari.
- Leaving an aspect returns focus to the hero that opened it.
- The field is `inert` while an aspect is open, so focus cannot wander into
  drawings nobody can see.
- Escape closes. So does the visible Back control, and so does clicking bare
  field. Escape alone would be invisible and keyboard-only.
- Browser Back closes an aspect: each one pushes `#music`-style history, so the
  URL is shareable and the phone's back gesture does the expected thing.
- Every drawing keeps `role="img"` and a real label. A mask is a background, so
  the SVG's own `<title>` never reaches assistive technology; without labels a
  screen reader finds twenty-three empty boxes and the entire site is invisible.
- Contrast is unchanged and measured: ink on field 12.8:1, ink-70 7.0:1. Satellite
  drawings sit at 55% ink, above the 3:1 non-text floor, and carry no meaning
  that is not also in their label.

## Layout and viewport

`html, body { height: 100%; overflow: hidden }`. Nothing scrolls, on purpose.

Sizing uses **`svh`, not `dvh`**. `dvh` follows the iOS address bar as it
animates, so every element sized in it recalculates continuously; on a page that
never scrolls, the bars never move, and `svh` is the stable number. The aspect
panel gets `overflow-y: auto` as a safety valve for a short landscape phone —
the only scrollable thing on the site, and only when it has to be.

## Data and deployment

The composition moves **out of the database and into code**, at
`src/lib/composition.ts`. Position, scale and grouping are design, not content,
and DESIGN.md already holds that design is code so it cannot drift. It also
removes the deployment hazard: the previous model required a schema migration and
a reseed to land at the same time as the code, and a mismatch renders the error
page.

`SiteSetting` stays in Postgres — name, role, location and links are genuinely
editable — and its read is now wrapped so an unreachable database falls back to
built-in defaults instead of throwing. The site renders with no database at all.

`Frame`, `Plate` and `FrameKind` leave the schema. The tables can stay in
Postgres; nothing reads them and Prisma will not touch them.

## Tests

`tests/composition.test.ts` replaces `tests/sequence.test.ts` and asserts:

- every drawing on disk is used exactly once across the five aspects;
- every slug resolves to a file that exists;
- exactly five heroes, exactly eighteen drawings on the field, five revealed;
- every position is inside the canvas, in both the wide and the tall set;
- no two drawings in a set overlap by more than a set fraction of their boxes;
- `src/lib/ratios.ts` still matches the SVG viewBoxes on disk;
- every visible string passes the copy guard, and contains no em-dash;
- `will-change: transform` appears nowhere in the CSS or components.

## Prohibitions

Carried forward: no drafting furniture of any kind, no monospace, no third
colour, no scroll cues, no drop shadows, gradients, glows or glassmorphism, no
cards, no emoji, no icon sets, no skill bars, no logo walls, no hand-drawn
decorative SVG, no cropping of a drawing by any mechanism, no LLM register, no
invented content, no client or product names.

New:

- **No scroll.** Not a hidden one, not a `scroll-behavior`, not a snap point.
- **No second level of zoom.** Five destinations, one deep. The way people get
  lost in a zoomable interface is depth.
- **No `will-change: transform`.** See above; it makes the zoom permanently soft.
- **No View Transitions API.** It cannot be interrupted, which this interaction
  requires.
- **No animation of a layout property.** The camera is `transform` only.
