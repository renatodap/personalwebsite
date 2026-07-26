import type { CSSProperties } from "react";

/**
 * One drawing.
 *
 * Rendered as a CSS mask rather than inline SVG: the ink stays token-driven, the
 * browser caches each file, and the DOM never carries the 15-50 KB of path data
 * a trace runs to. Nothing on this site animates individual paths, so there is
 * no case for inlining.
 *
 * There is no size or zoom prop, deliberately. Each drawing's viewBox is trimmed
 * to its own artwork (scripts/tighten_viewbox.mjs), so `mask-size: contain` in
 * CSS gives consistent figure sizes on its own and can never crop.
 *
 * `role="img"` with an explicit label is required, not defensive. A mask is a
 * background, so the SVG's own <title> is never exposed to assistive tech: with
 * no label here, a screen reader finds twelve empty divs and the entire argument
 * of the page is invisible.
 */
export function Plate({
  drawing,
  alt,
  motion,
}: {
  drawing: string;
  alt: string;
  motion?: "develop" | "advance";
}) {
  const url = `url(/drawings/detail-${drawing}.svg)`;

  return (
    <div
      className={motion ? `plate ${motion}` : "plate"}
      role="img"
      aria-label={alt}
      style={{ maskImage: url, WebkitMaskImage: url } as CSSProperties}
    />
  );
}
