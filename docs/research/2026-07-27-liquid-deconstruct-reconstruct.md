# Deep research: deconstructing a drawing into liquid and rebuilding the next one

Question: make a traced line drawing come apart, flow like liquid across the
page, and reassemble as a different drawing. Twenty-three potrace SVGs, 4 to 140
subpaths each, 30 to 50 KB each, currently rendered as CSS masks. Must hold 60fps
on a phone.

Date: 2026-07-27.

## Summary

**Sample both drawings into point clouds and animate the points.** It is the only
technique whose cost is independent of path complexity, which matters here
because these files range from 4 subpaths to 140 and a mechanism that is fine for
the guitar falls over on the waterfall. Direct path morphing (GSAP MorphSVG) is
now free and is excellent, but it is the wrong shape of tool for artwork this
uneven. Animated `feTurbulence` is the most literally "liquid" option and is
unusable on mobile at ~15fps. The goo filter (blur plus an alpha threshold) is
cheap and genuinely fluid and should be layered on top of the particle field
rather than used alone.

## 1. Direct path morphing: right tool, wrong artwork

**GSAP MorphSVG went free in April 2025**, when Webflow released the whole
library including SplitText, MorphSVG, DrawSVG and ScrollTrigger for commercial
use ([noqode](https://www.noqode.fr/en/outils/gsap),
[Art of Styleframe](https://artofstyleframe.com/blog/web-animation-css-vs-gsap-2026/)).
That removes the licensing objection that used to settle this question.

It is also technically the best of its class. It "converts everything to cubic
beziers and dynamically subdivides them when necessary, adding anchor points so
that the beginning and ending quantities match", and morphs "even if the number
(and type) of points don't match", where "most other morphing tools use a lossy
approximation that falls apart in complex shapes"
([GSAP docs](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/)). The generic
problem it solves is real: naive morphing requires "exactly the same number of
points and the drawing commands ... of exactly the same type"
([Frontend Masters](https://frontendmasters.com/blog/morphing-arbitrary-paths-in-svg/)).

**Why it still loses here.** Its own documentation, asked about complex cases,
recommends "splitting artwork into separate paths and morphing each individually
for better control", and warns that mismatched point sequences "result in the
shape crossing over itself" (GSAP docs, above). Our drawings do not admit that:
`guitar` has 4 subpaths and `falls` has 140. Any subpath-to-subpath mapping
between them leaves 136 shapes with nowhere to go, and they must collapse to
nothing mid-flight. That reads as deletion, not as flow. GSAP also flags that
when a morph is janky "the bottleneck is probably the browser's graphics
rendering routines", with the remedy being to "simplify your SVG artwork" (GSAP
docs) — and 30 to 50 KB of path data is exactly the artwork it means.

**Confidence: High** that MorphSVG is the best path-morphing option;
**High** that path morphing is the wrong mechanism for this particular set.

## 2. Filter-based liquid: beautiful, and mostly unaffordable

The literal fluid effect is `feTurbulence` feeding `feDisplacementMap`: the
turbulence "generates a noise texture that can be used to distort the edges of
the shapes", the displacement map "uses this noise texture to displace the pixels
of the original image", and the dissolve is produced by "increasing
feDisplacementMap's displacement scale to scatter the pixels, then increasing its
transparency towards the end of the animation to fade the pixels away completely"
([Smashing Magazine](https://www.smashingmagazine.com/2021/09/deep-dive-wonderful-world-svg-displacement-filtering/),
[Codrops](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/)).
That description is almost exactly the brief.

**It does not survive contact with a phone.** Animated turbulence "work[s]
excellently on desktop but become[s] sluggish when tested on iOS", historically
"about 15fps on mobile devices"
([GSAP forums](https://gsap.com/community/forums/topic/33075-gsap-and-feturbulence-mobile-performance/)).
Filters frequently "fall back to CPU even with GPU rendering enabled"
([BigGo](https://finance.biggo.com/news/202507211315_SVG_Filter_Performance_Issues)),
and the standing advice is to "keep the animations limited to smaller areas; the
larger the animated area, the more resource-consuming it will be" (Codrops,
above). A drawing filling half the viewport is not a small area.

**Verdict:** permissible as a desktop-only garnish over a short window, never as
the mechanism. **Confidence: High.**

## 3. The goo filter: the affordable liquid

Blur spreads alpha; a steep `feColorMatrix` alpha ramp re-hardens it at a
threshold, so shapes that come near each other fuse and separate the way droplets
do. The technique "uses an SVG filter feGaussianBlur combined with feColorMatrix
to create the illusion of merging"
([Effect Labs](https://effect-labs.com/en/pages/blog/animations-fluides-css.html)),
and it is the same maths as metaballs: give each blob a field, sum the fields,
and render "the surface where the total crossed a threshold"
([Modulate](https://modulate.to/effects/metablobs/)).

Critically, the *threshold* half is a static filter — only the blur radius
animates, and blur is a CSS property. That is far cheaper than shuffling
`feTurbulence` parameters per frame. Blur cost still "rises quickly with larger
values", so radii stay modest.

**Confidence: High.** This is the liquid that is actually affordable, and it
composes with anything that puts marks near each other.

## 4. Point clouds: the mechanism that fits this artwork

The technique the brief describes exists and is documented: icons that "explode
into vector triangles only to reform into a completely new icon", triangulating
path contours once and sending static geometry to the GPU, animating "thousands
of triangles at a silky smooth 60 FPS"
([CSS-Tricks](https://css-tricks.com/rendering-svg-paths-in-webgl/)). The
triangulation is "an expensive step" but happens once, not per frame.

The decisive property is that **cost is set by the number of points you choose,
not by the complexity of the source.** A 4-subpath guitar and a 140-subpath
waterfall sample to the same N points and animate identically. That is the exact
problem §1 could not solve.

**Do not sample with `getPointAtLength`.** The native method "is quite expensive,
especially when calculating hundreds of points on a path"
([svg-getpointatlength](https://github.com/herrstrietzel/svg-getpointatlength)).
Libraries exist that pre-measure segments into a lookup
([svg-path-properties](https://github.com/rveciana/svg-path-properties), ~20 KB
gzipped), but there is a cheaper route for this site specifically: **draw the SVG
to an offscreen canvas once and read the alpha channel**, collecting points where
the ink is. That is one raster per drawing, cached, and it needs no library and
no path parsing at all. It also samples the *filled* artwork, which is what is
actually on screen, rather than the outline of it.

Canvas 2D particle systems at this scale are well attested — implementations run
8000 particles under `requestAnimationFrame`, with chunking, draw buffers and
delta-time stepping as the standard optimisations
([Particle-Engine](https://github.com/jasonmayes/Particle-Engine),
[2D-Canvas-Image-Particles](https://github.com/Arkounay/2D-Canvas-Image-Particles)).
WebGL raises the ceiling but is not required at these counts.

**Confidence: High** for feasibility, **Medium** for the specific particle budget
on low-end Android, which is unmeasured and should be tuned against a device.

## 5. What this means for the build

Recommended construction, in order:

1. **Sample once, cache forever.** Render each drawing to an offscreen canvas at
   a modest size, read alpha, collect ~2000–4000 ink points, store them. One
   raster per drawing, done lazily on first need.
2. **Animate points, not paths.** Pair point *i* of the outgoing drawing with
   point *i* of the incoming one after sorting both by a shared spatial key, so
   ink travels a short distance rather than across the frame. Stagger by distance
   so the figure comes apart from one edge and rebuilds from the other, which is
   what makes it read as flow rather than as a crossfade.
3. **Goo the canvas at the midpoint.** Apply `filter: blur(var(--goo)) url(#threshold)`
   to the canvas element and animate the blur up and back down, so the scattered
   points fuse into liquid at the peak and resolve into the new figure. Blur only;
   the threshold stays static.
4. **Turbulence only on desktop, only during the flight**, if at all.
5. **Reduced motion gets a crossfade**, no scatter and no blur. Large-scale
   motion is what WCAG 2.3.3 names, and a page-sized dissolve qualifies.
6. **The settled state is never a canvas.** Once the morph ends, the real masked
   drawing is what stays on screen, so the resting page is vector-sharp and the
   canvas is torn down.

## Confidence assessment

| Finding | Confidence | Basis |
|---|---|---|
| GSAP MorphSVG is free as of April 2025 | High | Multiple 2026 sources |
| MorphSVG handles mismatched point counts better than alternatives | High | Vendor docs plus independent comparison |
| Path morphing is wrong for 4-vs-140-subpath artwork | High | Follows from MorphSVG's own subpath guidance |
| Animated feTurbulence is ~15fps on mobile | High | Practitioner reports; consistent with filter CPU fallback |
| Goo = blur + alpha threshold, and only blur needs animating | High | Multiple sources, same maths as metaballs |
| Point-cloud morphs run at 60fps with thousands of points | High | Documented working demos |
| Canvas alpha sampling beats getPointAtLength for this case | Medium-High | getPointAtLength cost documented; the canvas route is inference from it |
| Specific particle budget on low-end Android | Low | Unmeasured, needs a device |

## Open questions

- The right particle count is a device question, not a research question. Start
  at 2500 and measure.
- Whether pairing by a spatial sort is enough, or whether an assignment step
  (nearest-neighbour with a cap) is needed to stop ink crossing the frame. Cheap
  to try both.
- Whether the goo threshold reads well over ink this thin. The drawings are
  hairlines, and metaball fusion is usually shown on solid blobs.

## Sources

- [GSAP MorphSVGPlugin docs](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/)
- [GSAP is free in 2026](https://www.noqode.fr/en/outils/gsap)
- [Web animation in 2026: CSS vs GSAP](https://artofstyleframe.com/blog/web-animation-css-vs-gsap-2026/)
- [Frontend Masters — Morphing arbitrary paths in SVG](https://frontendmasters.com/blog/morphing-arbitrary-paths-in-svg/)
- [Minus Zero — Morphing arbitrary paths in SVG](https://minus-ze.ro/posts/morphing-arbitrary-paths-in-svg/)
- [Motion — SVG path morphing](https://motion.dev/tutorials/js-svg-path-morphing)
- [Smashing Magazine — SVG displacement filtering](https://www.smashingmagazine.com/2021/09/deep-dive-wonderful-world-svg-displacement-filtering/)
- [Codrops — Texture with feTurbulence](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/)
- [Camillo Visini — Simulating hand-drawn motion with SVG filters](https://camillovisini.com/coding/simulating-hand-drawn-motion-with-svg-filters)
- [GSAP forums — feTurbulence mobile performance](https://gsap.com/community/forums/topic/33075-gsap-and-feturbulence-mobile-performance/)
- [BigGo — SVG filter performance issues](https://finance.biggo.com/news/202507211315_SVG_Filter_Performance_Issues)
- [Effect Labs — Fluid animations, metaballs and blobs](https://effect-labs.com/en/pages/blog/animations-fluides-css.html)
- [Modulate — Metaballs: why blobs merge like liquid](https://modulate.to/effects/metablobs/)
- [CSS-Tricks — Rendering SVG paths in WebGL](https://css-tricks.com/rendering-svg-paths-in-webgl/)
- [svg-getpointatlength](https://github.com/herrstrietzel/svg-getpointatlength)
- [svg-path-properties](https://github.com/rveciana/svg-path-properties)
- [Jason Mayes — Particle Engine](https://github.com/jasonmayes/Particle-Engine)
- [Arkounay — 2D Canvas Image Particles](https://github.com/Arkounay/2D-Canvas-Image-Particles)
- [MDN — feTurbulence](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence)
- [MDN — getPointAtLength](https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement/getPointAtLength)
- [CSS-Tricks — How SVG line animation works](https://css-tricks.com/svg-line-animation-works/)
