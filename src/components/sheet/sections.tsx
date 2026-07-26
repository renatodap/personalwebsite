import type { Part, Detail, Revision, WorkNote, SiteSetting } from "@/lib/content";
import type { ActivityLine } from "@/lib/activity";
import { Drawing, Callout, Dimension, DetailBubble, Marker } from "@/components/drawing/parts";

const PAD = "var(--sheet-pad)";

/* ── Title block ──────────────────────────────────────────────────────
   The literal facts, in draughting register, above the fold. This exists
   because most visitors never leave the first screen, and none of them
   should leave without knowing who this is. It is the only place on the
   sheet where anything is simply stated.                                 */
export function TitleBlock({ s, footer = false }: { s: SiteSetting; footer?: boolean }) {
  const cells: [string, string][] = [
    ["SUBJECT", s.subjectName],
    ["ROLE", s.subjectRole],
    ["LOCATION", `${s.subjectLocation} · ${s.subjectMode}`],
    ["SHEET", s.sheetOf],
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
        borderTop: footer ? "var(--w-visible) solid var(--line)" : "none",
        borderBottom: footer ? "none" : "var(--w-thin) solid var(--rule)",
      }}
    >
      {cells.map(([k, v], i) => (
        <div
          key={k}
          style={{
            padding: `0.85rem ${PAD} 0.85rem`,
            paddingLeft: i === 0 ? PAD : "1rem",
            borderRight: i < cells.length - 1 ? "var(--w-thin) solid var(--rule-faint)" : "none",
          }}
        >
          <div className="letter" style={{ fontSize: "0.5rem", color: "var(--line-soft)" }}>{k}</div>
          <div className="letter" style={{ fontSize: "0.74rem", paddingTop: "0.3rem" }}>{v}</div>
        </div>
      ))}
    </div>
  );
}

/* ── The general assembly ─────────────────────────────────────────────
   First viewport. Adult parts only — no childhood drawing appears here.
   If a pair were visible in the opening, the whole idea would arrive as a
   premise instead of as something the visitor works out, and the ending
   would have nothing left to pay off.

   The callout sequence deliberately starts at 01 while ITEM 00 exists at
   the very bottom of the sheet. That missing number is the promise.       */
export function Assembly({ parts }: { parts: Part[] }) {
  return (
    <section aria-label="General assembly" style={{ padding: `clamp(28px,7vh,72px) ${PAD} clamp(20px,5vh,48px)` }}>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          // Minimum 190px, not 112px. Below roughly this size the traced line
          // falls under one device pixel and the drawing reads as jagged.
          gridTemplateColumns: "repeat(auto-fit,minmax(min(190px,44vw),1fr))",
          gap: "clamp(14px,3vw,36px)",
          alignItems: "end",
        }}
      >
        {parts.map((p, i) => (
          <li key={p.id} style={{ display: "grid", gap: "0.55rem", justifyItems: "center" }}>
            <Drawing
              slug={p.drawing}
              animate="explode"
              className="explode"
              // Alternating travel makes the assembly open outward from its
              // middle rather than drifting in one direction.
              {...({ style: { ["--dy" as string]: `${(i % 2 === 0 ? -1 : 1) * (6 + (i % 3) * 5)}px` } } as object)}
            />
            <Callout n={p.itemNo} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Bill of materials ────────────────────────────────────────────────
   This replaces the paragraph a personal site normally opens with. A BOM
   has no adjective column, so there is structurally nowhere for a boast
   to live — which is why it reads as sincere rather than modest.          */
export function BillOfMaterials({ parts, anchor }: { parts: Part[]; anchor: Part | null }) {
  const rows = anchor ? [anchor, ...parts] : parts;
  return (
    <section style={{ padding: `0 ${PAD} clamp(26px,6vh,56px)` }}>
      <Marker>Bill of materials</Marker>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "min(560px,100%)" }}>
          <caption className="sr-only">Components of the assembly</caption>
          <thead>
            <tr>
              {["Item", "Description", "Qty", "Material"].map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className="letter"
                  style={{
                    textAlign: "left",
                    fontSize: "0.5rem",
                    color: "var(--line-soft)",
                    fontWeight: 500,
                    padding: "0 1.4rem 0.55rem 0",
                    borderBottom: "var(--w-visible) solid var(--line)",
                    whiteSpace: "nowrap",
                    // Material carries the slack: it is the longest text and the
                    // one that must be allowed to set on a single line where it can.
                    width: i === 3 ? "100%" : "1%",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td style={cell}>{p.itemNo}</td>
                {/* Labels never wrap — a BOM line broken across three rows stops
                    reading as a part number and starts reading as prose. The
                    table scrolls instead; nothing is ever truncated. */}
                <td className="letter" style={{ ...cell, letterSpacing: "0.1em" }}>
                  {p.description}
                </td>
                <td style={cell}>{p.qty}</td>
                <td style={{ ...cell, color: "var(--line-soft)" }}>{p.material}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const cell: React.CSSProperties = {
  padding: "0.62rem 1.4rem 0.62rem 0",
  borderBottom: "var(--w-thin) solid var(--rule-faint)",
  fontSize: "0.72rem",
  verticalAlign: "top",
  whiteSpace: "nowrap",
};

/* ── A pair ───────────────────────────────────────────────────────────
   The spine. Two drawings of the same part, twenty years apart, inside one
   frame with the connection left out. The viewer closes it — and a
   conclusion someone reaches themselves is the one they still have a week
   later, which is exactly what this site is for.

   Both halves render at full weight in the resting state. A permanently
   dashed early half would say "past"; the claim is that it is still fitted. */
export function Pair({ part }: { part: Part }) {
  return (
    <section style={{ padding: `clamp(20px,5vh,44px) ${PAD}`, borderTop: "var(--w-thin) solid var(--rule-faint)" }}>
      {/* Always two columns, and capped. The pair only reads as a pair when both
          halves are seen at once and at the same scale — stacked or oversized,
          it stops being a comparison and becomes two separate pictures. */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,minmax(0,1fr))",
          gap: "clamp(12px,4vw,56px)",
          alignItems: "center",
          maxWidth: "min(680px,100%)",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "grid", gap: "0.5rem", justifyItems: "center" }}>
          <Drawing slug={part.earlyDrawing} className="arrive" animate="arrive" />
          <span className="letter" style={{ fontSize: "0.5rem", color: "var(--line-soft)" }}>
            {part.earlyNote}
          </span>
        </div>
        <div style={{ display: "grid", gap: "0.5rem", justifyItems: "center" }}>
          <Drawing slug={part.drawing} />
          <span className="letter" style={{ fontSize: "0.5rem", color: "var(--line-soft)" }}>
            <Callout n={part.itemNo} />
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── Wear detail ──────────────────────────────────────────────────────
   The peak. A snapped racket and a fistful of broken sticks, both held up
   while laughing. The broken equipment says he goes hard enough to break
   things; the laughing says he doesn't take it seriously. Together they
   are the contradiction he asked never to have written down.              */
export function Wear({ details }: { details: Detail[] }) {
  if (details.length === 0) return null;
  return (
    <section style={{ padding: `clamp(26px,6vh,60px) ${PAD}`, borderTop: "var(--w-thin) solid var(--rule)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(230px,45%),1fr))",
          gap: "clamp(12px,3vw,32px)",
          maxWidth: "min(620px,100%)",
        }}
      >
        {details.map((d) => (
          <DetailBubble key={d.id} label={d.label} scaleNote={d.scaleNote}>
            <Drawing slug={d.drawing} />
          </DetailBubble>
        ))}
      </div>
    </section>
  );
}

/* ── The work, anonymous ──────────────────────────────────────────────
   The only but/therefore beat on the sheet: he was asked for one thing,
   BUT the real constraint was another, THEREFORE something changed. Names
   nobody — the detail budget is spent on mechanism, never on the party.    */
export function Work({ note }: { note: WorkNote | null }) {
  if (!note) return null;
  const rows: [string, string][] = [
    ["Asked for", note.askedFor],
    ["Actual constraint", note.actualConstraint],
    ["What changed", note.whatChanged],
  ];
  return (
    <section style={{ padding: `clamp(26px,6vh,60px) ${PAD}`, borderTop: "var(--w-thin) solid var(--rule)" }}>
      <Marker>Detail B · one engagement</Marker>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.6fr)",
          gap: "clamp(14px,4vw,48px)",
          alignItems: "start",
        }}
      >
        <Drawing slug={note.drawing} />
        <dl style={{ margin: 0, display: "grid", gap: "1.15rem" }}>
          {rows.map(([k, v], i) => (
            <div key={k} style={{ display: "grid", gap: "0.4rem" }}>
              <dt style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                <Callout n={String(i + 1).padStart(2, "0")} tone={i === 2 ? "markup" : "line"} />
                <span className="letter" style={{ fontSize: "0.52rem", color: "var(--line-soft)" }}>{k}</span>
              </dt>
              <dd style={{ margin: 0, fontSize: "0.78rem", lineHeight: 1.65, maxWidth: "46ch" }}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ── Live dimensions ──────────────────────────────────────────────────
   Not a scoreboard. A tally would be bragging; a latest activity is a
   measurement, and it says the object in this drawing is still in service.
   Date, type, distance, pace only — never a route, never a place name.     */
export function Live({ lines }: { lines: ActivityLine[] }) {
  if (lines.length === 0) return null;
  return (
    <section style={{ padding: `clamp(22px,5vh,48px) ${PAD}`, borderTop: "var(--w-thin) solid var(--rule)" }}>
      <Marker>Measured continuously</Marker>
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "44rem" }}>
        {lines.map((a, i) => (
          <Dimension
            key={i}
            label={a.label}
            value={[a.distance, a.pace, a.age].filter(Boolean).join("  ·  ")}
            live={i === 0}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Revision table ───────────────────────────────────────────────────
   The timeline in the drawing's own form for "this changed and we kept a
   record". The tabular format is load-bearing: it mechanically prevents
   the major-switch beat from becoming an inspirational paragraph.
   The final row belongs to ITEM 00 and is deliberately empty.             */
export function Revisions({ revisions }: { revisions: Revision[] }) {
  if (revisions.length === 0) return null;
  return (
    <section style={{ padding: `clamp(26px,6vh,60px) ${PAD}`, borderTop: "var(--w-thin) solid var(--rule)" }}>
      <Marker>Revisions</Marker>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "min(520px,100%)" }}>
          <caption className="sr-only">Revision history</caption>
          <thead>
            <tr>
              {["Rev", "Date", "Description"].map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className="letter"
                  style={{
                    textAlign: "left", fontSize: "0.5rem", color: "var(--line-soft)", fontWeight: 500,
                    padding: "0 0.9rem 0.55rem 0", borderBottom: "var(--w-visible) solid var(--line)",
                    whiteSpace: "nowrap", width: i === 2 ? "100%" : undefined,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {revisions.map((r) => (
              <tr key={r.id}>
                <td style={cell}>{r.rev}</td>
                <td style={{ ...cell, color: "var(--line-soft)" }}>{r.date}</td>
                <td style={{ ...cell, whiteSpace: "normal", maxWidth: "52ch" }}>{r.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ── ITEM 00 — the ending ─────────────────────────────────────────────
   The one childhood drawing with no adult counterpart. Every pair before
   it taught the rule; this one breaks it and says nothing.

   The notation is literally true of a drawing, and the sentence it implies
   is one the site never makes. That is the entire point: the visitor
   supplies it, which is both what he asked for and what makes it stick.    */
export function ItemZero({ anchor }: { anchor: Part | null }) {
  if (!anchor) return null;
  return (
    <section
      aria-label="Item 00"
      style={{
        padding: `clamp(48px,12vh,120px) ${PAD} clamp(40px,10vh,96px)`,
        borderTop: "var(--w-thin) solid var(--rule)",
        display: "grid",
        justifyItems: "center",
        gap: "1.6rem",
      }}
    >
      <div style={{ width: "min(300px,62vw)" }}>
        <Drawing slug={anchor.earlyDrawing || anchor.drawing} />
      </div>
      <div style={{ display: "grid", justifyItems: "center", gap: "0.9rem" }}>
        <Callout n={anchor.itemNo} tone="markup" />
        <p
          className="letter"
          style={{ margin: 0, fontSize: "0.64rem", color: "var(--line)", textAlign: "center", letterSpacing: "0.22em" }}
        >
          Original part · no revisions
        </p>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────────────────
   A plain address, no form. There is nothing to qualify here.             */
export function Contact({ s }: { s: SiteSetting }) {
  const links = [
    ["GITHUB", s.githubUrl],
    ["LINKEDIN", s.linkedinUrl],
    ["YOUTUBE", s.youtubeUrl],
    ["SPOTIFY", s.spotifyUrl],
  ].filter(([, href]) => Boolean(href)) as [string, string][];

  return (
    <section style={{ padding: `clamp(20px,5vh,44px) ${PAD}`, borderTop: "var(--w-thin) solid var(--rule)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem 1.8rem", alignItems: "baseline" }}>
        {s.email ? (
          <a href={`mailto:${s.email}`} style={{ fontSize: "0.78rem", textDecoration: "none", borderBottom: "var(--w-thin) solid var(--line-soft)" }}>
            {s.email}
          </a>
        ) : null}
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="letter"
            style={{ fontSize: "0.54rem", color: "var(--line-soft)", textDecoration: "none" }}
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
