# Deep research: a zoomable one-screen montage

Question: how to build a single-page site where a montage of line drawings can be
zoomed into, one drawing at a time, to reach an "aspect" screen, and zoomed back
out. Next.js 15 / React 19, drawings rendered as CSS `mask-image`, two colours,
one family, must work on a phone.

Date: 2026-07-26.

## Summary

Build the zoom as a **CSS `transform` camera over a single canvas, driven by the
Web Animations API** — not the View Transitions API. View Transitions cannot be
interrupted, and a zoom UI is defined by the user changing their mind mid-flight.
The one real trap is raster scale: a mask scaled up by a CSS or WAAPI animation
is **not** re-rastered while it animates, so it is soft for the whole flight. The
fix is threefold: blur deliberately mid-flight (which hides the interpolation
anyway and is already this site's house rule), land the settled state on
correctly-sized DOM, and commit-then-cancel the animation at the end so the final
transform becomes a scripted style and the layer re-rasters crisp.

## 1. Which technique: View Transitions, FLIP, or a transform camera

**The View Transitions API is not interruptible.** This is the deciding fact.
`skipTransition()` "skips the animation part of the view transition, but doesn't
skip running the associated view update"
([MDN](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition/skipTransition)),
and you cannot start a new transition to redirect one already running — the CSS
WG issue on the subject records that "it's impossible to call `skipTransition()`
API in the previous update callbacks to skip the new view transition"
([csswg-drafts #11943](https://github.com/w3c/csswg-drafts/issues/11943)). A zoom
UI whose entire premise is "go in, change your mind, come out" cannot be built on
a non-interruptible primitive. **Confidence: High.**

Two further strikes against it here:

- It animates **bitmap snapshots**. The browser "takes snapshots of the old and
  new states", then interpolates between them
  ([Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions/)).
  Interpolating a snapshot across a ~3× scale change is exactly the blur we are
  trying to avoid, and we would have no control over it.
- In React it is still experimental. Next.js requires
  `experimental.viewTransition: true`, and the docs note `<ViewTransition>` rides
  React canary
  ([Next.js](https://nextjs.org/docs/app/guides/view-transitions)). Duplicate
  `view-transition-name` values throw and skip the whole transition, which is a
  live hazard with 23 named drawings
  ([Bag of Tricks](https://events-3bg.pages.dev/jotter/in-all-major-browsers/)).

**FLIP** is the manual version of the same idea and carries the same cost that
the View Transitions API was invented to remove: "cloning DOM nodes, adding CSS
transitions, computing positions for animations, preventing user interaction
during the swap, and cleaning up old elements"
([CSS-Tricks](https://css-tricks.com/animating-layouts-with-the-flip-technique/)).
It needs layout reads on every invocation.

**A transform camera** avoids both. All the drawings live in one absolutely
positioned canvas; "zooming in" is a single `transform` on that canvas. There are
no layout reads, one composited layer moves, and WAAPI retargeting is native:
"new transitions can be triggered while existing ones are still running… the new
start position is inferred from the current underlying position", and partial
keyframes with no specified start "allow smooth animation retargeting when using
transform properties"
([MDN, Using the Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API),
[web.dev](https://web.dev/blog/web-animations)). `commitStyles()` "writes the
computed values of the animation's current styles into its target element's style
attribute", which is how you hand off from a cancelled animation to the next one
([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Animation/commitStyles)).
**Confidence: High.**

## 2. The raster-scale trap, and how to beat it

Chrome "re-rasters all content when its transform scale changes, if it does not
have the `will-change: transform` CSS property" — but crucially, "this only
applies to transform scales that happen via script manipulation, and **does not
apply to CSS animations or Web Animations**"
([Chrome for Developers](https://developer.chrome.com/blog/re-rastering-composite)).

Three consequences, all load-bearing:

1. **Any animated scale-up is soft for its entire duration.** Not a bug to fix; a
   property to design around.
2. **`will-change: transform` makes it permanently soft.** It "forces the content
   to be rastered into a fixed bitmap, which subsequently never changes under
   transform updates" (same source). Using it here would lock the montage's
   raster and the zoomed drawing would never sharpen. It must not be used.
3. **Ending the animation and writing the final transform as a plain style
   re-rasters the layer.** That is script manipulation, so the crisp path is:
   let the animation finish, `commitStyles()`, `cancel()`.

Mitigations for the flight itself, in the order they matter:

- **Blur on purpose.** Next.js's own morph guidance adds a blur keyframe because
  "the blur hides pixel-level interpolation artifacts during the transition"
  ([Next.js](https://nextjs.org/docs/app/guides/view-transitions)). This site
  already holds that blur is load-bearing when crossfading two line drawings, so
  the artifact fix and the design rule are the same instruction.
- **Never up-scale into the settled state.** The settled aspect screen should
  render its drawings at their real size in ordinary DOM, not as leftovers of a
  scaled canvas.
- Down-scaling never blurs; up-scaling does. Where a choice exists, prefer
  rastering large and displaying small.

**Confidence: High** (single authoritative source, but it is the implementer's).

## 3. Not getting lost: ZUI orientation

The known failure of zoomable interfaces is disorientation: they offer infinite
pan and zoom, and "the main drawback is the risk of getting lost in the
information space"
([Wikipedia](https://en.wikipedia.org/wiki/Zooming_user_interface)). The
countermeasures are structural, not decorative — give spatial orientation by
showing where you came from, make the trigger element itself become the next
view, and make the way back obviously the inverse gesture
([Zumly](https://zumerlab.com/zumly/learn/zui.html)).

**Semantic zoom** is the other half: at higher magnification a ZUI should show
*different* information, not merely larger pixels — "the level of detail present
in the resized object is changed to fit the relevant information into the current
size" (Wikipedia, above). An aspect screen that adds sentences and further
drawings is semantic zoom; one that just enlarges the same drawing is not.

Applied here: the drawing you clicked stays on screen and becomes the subject;
everything else recedes rather than being replaced; zoom-out is the literal
inverse. Bounded to five destinations and one level deep — an infinite canvas is
where people get lost, and nothing here needs one. **Confidence: High.**

## 4. Composition: 23 drawings without clutter

Only about **1–4 items are apprehended in parallel** — subitizing "is a very fast
and precise judgment… usually assumed to be preattentive"
([Frontiers in Human Neuroscience](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2017.00070/full)).
Above that, reading the field becomes a serial search. Eighteen equal marks is
therefore a texture, not a menu.

The fix is hierarchy, not fewer drawings. Composition literature is consistent:
establish a focal point through emphasis, then "secondary and tertiary elements
support it — providing additional information without competing for the same
level of attention", and give any composition **three distinct levels of visual
weight**
([BC Open Textbooks](https://opentextbc.ca/graphicdesign/chapter/3-3-compositional-principles-strategies-for-arranging-things-better/),
[Linearity](https://www.linearity.io/blog/design-composition-guide/)). Balance is
distribution of visual weight, not symmetry; large, isolated, high-contrast
elements carry more weight than small, surrounded, muted ones.

So: five large drawings that are the interactive targets, thirteen smaller ones
that are field texture, and ink opacity separating the two tiers. This also
happens to be the historical form — Muybridge's plates are grids whose "relations
of time and space from frame to frame are neither obvious nor specified"
([Smithsonian](https://americanhistory.si.edu/collections/object/nmah_1344339)),
and Atkins "arranged her specimens on the page in imaginative and elegant
compositions"
([The Met](https://www.metmuseum.org/art/collection/search/286656)). Arrangement
is the medium's own argument. **Confidence: High.**

## 5. Accessibility and reduced motion

WCAG 2.3.3 *Animation from Interactions* (AAA) exists precisely for this
interaction: it asks that non-essential motion be reduced or removed, and calls
out **large-scale movement including parallax, zooming and sliding panels**
([Silktide](https://silktide.com/accessibility-guide/the-wcag-standard/2-3/seizures-and-physical-reactions/2-3-3-animation-from-interactions/)).
Motion research is blunter still: "zoom effects that cover large parts of the
screen are those that cause the most dizziness", and safe substitutes are opacity
fades, colour transitions and shorter durations
([Fernando Ruiz](https://www.fernandoux.com/en/wiki/strategy/reduced-motion-strategies/),
[A11Y Collective](https://www.a11y-collective.com/blog/wcag-animation/)). A zoom
UI must therefore ship a **crossfade** under `prefers-reduced-motion: reduce` —
not merely a faster zoom. **Confidence: High.**

Changing screen without changing document breaks the two things a real navigation
does for free: focus position and announcement. The consensus fix is both at
once — move focus to the new heading, *and* announce through a live region,
"because NVDA with Firefox and VoiceOver with Safari don't always reliably
announce focused elements"
([James Shakespeare](https://jshakespeare.com/accessible-route-change-react-router-autofocus-heading/),
[BBC GEL](https://bbc.github.io/gel/foundations/routing/)). **Confidence: High.**

Hover cannot be the only affordance: touch devices have no hover state, and
hover-dependent controls force double taps or fail outright
([UX Pickle](https://uxpickle.com/alternatives-to-hover-interaction-on-touchscreens/)).
Every zoom target must be a real focusable control that responds to click, tap
and Enter, with a visible label rather than a hover-only one.

## 6. Viewport and mobile

For a deliberately non-scrolling screen, prefer **`svh` over `dvh`**. `dvh`
tracks the browser UI continuously, and "the address bar on iOS doesn't just snap
open/closed — it animates as you scroll, so `dvh` is constantly changing, which
means your layout is constantly recalculating"; `100svh` is the stable choice for
a full-height layout that must fit while toolbars are showing
([CSS Toolkit](https://csstoolkit.net/blog/css-dvh-svh-lvh-guide/)).
**Confidence: Medium-High** — sources agree, though `dvh` remains correct for
layouts that *should* follow the toolbars.

Blur is the expensive filter: cost "rises quickly with larger values", so keep
radii small and never apply blur to many elements at once
([cr0x.net](https://cr0x.net/en/css-animations-performance-rules/)). One 2–3px
blur on a single composited canvas is affordable; the same blur on 18 individual
plates is not.

## Confidence assessment

| Finding | Confidence | Basis |
|---|---|---|
| View Transitions cannot be interrupted or retargeted | High | MDN + csswg issue agree |
| WAAPI transform animations retarget smoothly from the current value | High | MDN + web.dev |
| Animated scale does not re-raster; `will-change: transform` locks raster | High | Chrome implementer blog, explicit |
| Committing and cancelling the animation restores a crisp raster | Medium | Follows directly from the rule above; not separately documented |
| Blur mid-flight hides interpolation artifacts | High | Next.js guidance states the purpose outright |
| ~1–4 items are read in parallel; beyond that is serial search | High | Peer-reviewed |
| Zoom is the highest-risk motion for vestibular symptoms | High | WCAG 2.3.3 names it; motion guidance concurs |
| Focus + live region together on view change | High | Multiple practitioner sources, user-tested |
| `svh` beats `dvh` for a fixed non-scrolling screen | Medium-High | Consistent, some nuance |

## Open questions

- Whether Safari and Firefox share Chrome's exact re-raster rule. Neither
  publishes an equivalent statement; the mitigations (blur in flight, correctly
  sized settled DOM) are engine-independent, so this does not change the design.
- GPU memory for many mask layers on low-end Android is unmeasured. Mitigated by
  keeping the montage on one composited canvas rather than promoting each plate.
- No precedent site was found that does exactly this pattern with line drawings,
  so the composition has to be verified by looking at it rather than by
  reference.

## Sources

- [MDN — ViewTransition.skipTransition()](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition/skipTransition)
- [csswg-drafts #11943 — skipping a view transition while flushing](https://github.com/w3c/csswg-drafts/issues/11943)
- [Chrome for Developers — Smooth transitions with the View Transition API](https://developer.chrome.com/docs/web-platform/view-transitions/)
- [Chrome for Developers — Re-rastering composited layers on scale change](https://developer.chrome.com/blog/re-rastering-composite)
- [Next.js — Designing view transitions](https://nextjs.org/docs/app/guides/view-transitions)
- [MDN — Using the Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)
- [MDN — Animation.commitStyles()](https://developer.mozilla.org/en-US/docs/Web/API/Animation/commitStyles)
- [web.dev — Web Animations API improvements in Chromium 84](https://web.dev/blog/web-animations)
- [CSS-Tricks — Animating layouts with the FLIP technique](https://css-tricks.com/animating-layouts-with-the-flip-technique/)
- [Wikipedia — Zooming user interface](https://en.wikipedia.org/wiki/Zooming_user_interface)
- [Zumly — What is a Zooming User Interface?](https://zumerlab.com/zumly/learn/zui.html)
- [Frontiers — Preattentive processing of numerical visual information](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2017.00070/full)
- [BC Open Textbooks — Compositional principles](https://opentextbc.ca/graphicdesign/chapter/3-3-compositional-principles-strategies-for-arranging-things-better/)
- [Linearity — Design composition guide](https://www.linearity.io/blog/design-composition-guide/)
- [Silktide — WCAG 2.3.3 Animation from Interactions](https://silktide.com/accessibility-guide/the-wcag-standard/2-3/seizures-and-physical-reactions/2-3-3-animation-from-interactions/)
- [Fernando Ruiz — Reduced motion strategies](https://www.fernandoux.com/en/wiki/strategy/reduced-motion-strategies/)
- [The A11Y Collective — WCAG-compliant animations](https://www.a11y-collective.com/blog/wcag-animation/)
- [James Shakespeare — Accessible route change with an autofocusing h1](https://jshakespeare.com/accessible-route-change-react-router-autofocus-heading/)
- [BBC GEL — Routing](https://bbc.github.io/gel/foundations/routing/)
- [UX Pickle — Alternatives to hover on touchscreens](https://uxpickle.com/alternatives-to-hover-interaction-on-touchscreens/)
- [CSS Toolkit — dvh, svh and lvh](https://csstoolkit.net/blog/css-dvh-svh-lvh-guide/)
- [cr0x.net — CSS animation performance rules](https://cr0x.net/en/css-animations-performance-rules/)
- [Smithsonian — Muybridge photographic history collection](https://americanhistory.si.edu/collections/object/nmah_1344339)
- [The Met — Anna Atkins, Photographs of British Algae](https://www.metmuseum.org/art/collection/search/286656)
