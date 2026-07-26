/**
 * The Exploded Assembly palette and stroke system.
 *
 * These exist in TS as well as in globals.css because SVG `stroke-width` cannot
 * reliably read a CSS custom property across browsers. globals.css is the source
 * of truth for anything CSS can express; this file mirrors it for SVG attributes.
 */
export const TOKENS = {
  field: "#0C2942",
  fieldDeep: "#081D2F",
  fieldRaise: "#143A5C",
  line: "#EAF2F8",
  lineSoft: "#8FB0C7",
  markup: "#FF4A2E",
} as const;

/** ISO drafting line weights, px. Each weight carries meaning — see DESIGN.md. */
export const STROKE = {
  /** Visible object edge — the part itself, present tense. */
  visible: 1.4,
  /** Detail behind something else. Used ONLY for a pair's arrival transition. */
  hidden: 0.8,
  /** Axis, symmetry, centreline. */
  center: 0.8,
  /** Dimension lines, extension lines, leaders, hatching. */
  thin: 0.6,
} as const;
