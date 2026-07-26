import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The share card.
 *
 * A calling card is a thing people send, so this is not optional chrome: without
 * it the site arrives in every Slack, iMessage and LinkedIn unfurl as a grey
 * box, which is the one surface on this domain belonging to no world at all.
 *
 * Satori (which renders this) supports no CSS masks, so the drawing cannot be
 * inked the way the page inks it. Instead the trace is read off disk and its
 * `currentColor` is resolved to the ink token before being inlined, which gets
 * the same two colours by a different route.
 */
export const runtime = "nodejs";
export const alt = "Renato Prado. Lead software engineer, Indianapolis.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FIELD = "#0b2a45";
const INK = "#f4efe6";

export default async function Image() {
  let drawing = "";
  try {
    const file = join(process.cwd(), "public", "drawings", "detail-guitar.svg");
    const svg = await readFile(file, "utf8");
    drawing = `data:image/svg+xml;base64,${Buffer.from(
      svg.replaceAll("currentColor", INK),
    ).toString("base64")}`;
  } catch {
    // A share card without the drawing still carries the facts. Never throw:
    // a failed OG route would take the page down with it.
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: FIELD,
          color: INK,
          padding: 64,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", flex: 1 }}>
          <div style={{ fontSize: 30, letterSpacing: 4, textTransform: "uppercase" }}>
            Renato Prado
          </div>
          <div style={{ fontSize: 26, opacity: 0.7, marginTop: 12 }}>
            Lead software engineer. Indianapolis.
          </div>
        </div>

        {drawing ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={drawing} alt="" width={430} height={430} style={{ objectFit: "contain" }} />
        ) : null}
      </div>
    ),
    size,
  );
}
