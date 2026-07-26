import type { ReactNode } from "react";

/**
 * The drawing's vocabulary. Every element here states something a drawing
 * states: an item number, a measured value, a sheet identity, a magnified
 * detail. Nothing here is decorative — if one of these cannot say what it
 * communicates, it should be deleted rather than restyled.
 */

/** A traced line drawing, rendered as a CSS mask so --line is the ink. */
export function Drawing({
  slug,
  tone = "line",
  className = "",
  animate,
}: {
  slug: string;
  tone?: "line" | "soft" | "markup";
  className?: string;
  animate?: "explode" | "arrive";
}) {
  const toneClass = tone === "soft" ? "dwg-soft" : tone === "markup" ? "dwg-markup" : "";
  const url = `/drawings/detail-${slug}.svg`;
  return (
    <span
      aria-hidden="true"
      className={`dwg ${toneClass} ${animate ?? ""} ${className}`}
      style={{ WebkitMaskImage: `url(${url})`, maskImage: `url(${url})` }}
    />
  );
}

/** A circled item number — the drawing's primary annotation device. */
export function Callout({
  n,
  tone = "line",
}: {
  n: string;
  tone?: "line" | "markup";
}) {
  const color = tone === "markup" ? "var(--markup)" : "var(--line)";
  return (
    <span
      className="letter"
      style={{
        display: "inline-grid",
        placeItems: "center",
        width: "2.05em",
        height: "2.05em",
        borderRadius: "50%",
        border: `var(--w-visible) solid ${color}`,
        color,
        fontSize: "0.66rem",
        letterSpacing: "0.06em",
        flexShrink: 0,
      }}
    >
      {n}
    </span>
  );
}

/** A horizontal leader — thin, one weight, no arrowhead until it terminates. */
export function Leader({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`rule-draw ${className}`}
      style={{ display: "block", height: 0, borderTop: "var(--w-thin) solid var(--line-soft)", flex: 1 }}
    />
  );
}

/** A measured value. `live` marks it as read from instruments, not drawn once. */
export function Dimension({
  label,
  value,
  live = false,
}: {
  label: string;
  value: string;
  live?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", minWidth: 0 }}>
      <span className="letter" style={{ fontSize: "0.58rem", color: "var(--line-soft)", whiteSpace: "nowrap" }}>
        {label}
      </span>
      <Leader />
      <span
        style={{
          fontSize: "0.72rem",
          whiteSpace: "nowrap",
          color: live ? "var(--markup)" : "var(--line)",
          letterSpacing: "0.02em",
        }}
      >
        {value}
      </span>
    </div>
  );
}

/** A magnified region, as a drawing marks one. */
export function DetailBubble({
  label,
  scaleNote,
  children,
}: {
  label: string;
  scaleNote: string;
  children: ReactNode;
}) {
  return (
    <figure style={{ margin: 0, minWidth: 0 }}>
      <div style={{ border: "var(--w-thin) solid var(--rule)", padding: "clamp(8px,2vw,20px)" }}>
        {children}
      </div>
      <figcaption
        className="letter"
        style={{ fontSize: "0.55rem", color: "var(--line-soft)", paddingTop: "0.5rem" }}
      >
        {label} · {scaleNote}
      </figcaption>
    </figure>
  );
}

/** Section heading in draughting register. Never a sentence. */
export function Marker({ children }: { children: ReactNode }) {
  return (
    <h2
      className="letter"
      style={{
        fontSize: "0.58rem",
        color: "var(--line-soft)",
        margin: 0,
        paddingBottom: "0.9rem",
        fontWeight: 500,
      }}
    >
      {children}
    </h2>
  );
}
