import { Plate } from "@/components/plate";
import type { FrameWithPlates } from "@/lib/content";

/**
 * A frame of the sequence. Three kinds, and a stock container would be a lapse.
 *
 * Every frame is a <figure>: one or more images, optionally captioned, which is
 * exactly what a figure is for. The plates precede the caption in the DOM, the
 * natural order for figure/figcaption, and desktop places the caption into the
 * left margin with explicit grid rows rather than relying on source order.
 */

function Caption({ text }: { text: string }) {
  if (!text) return null;

  // A newline is a line, not a paragraph. Lines after the first drop to
  // --ink-70 so a three-line caption still has one clear entry point.
  return (
    <figcaption className="cap">
      {text.split("\n").map((line, i) => (
        <span key={i}>{line}</span>
      ))}
    </figcaption>
  );
}

export function Frame({
  frame,
  index,
  isFirst,
}: {
  frame: FrameWithPlates;
  index: number;
  isFirst: boolean;
}) {
  // The opening plate develops once on load. Every other plate advances on
  // scroll. Never both: they are two animations on the same property set.
  const motion = isFirst ? "develop" : "advance";

  const common = {
    id: `frame-${index + 1}`,
    "data-frame": index,
  };

  if (frame.kind === "RUN") {
    return (
      <figure className="frame frame--run" {...common}>
        {/* The column cap scales with the count: two plates at a four-plate size
            float in an empty band instead of reading as a strip. */}
        <div className="strip" data-n={frame.plates.length}>
          {frame.plates.map((p) => (
            <Plate key={p.id} drawing={p.drawing} alt={p.alt} motion={motion} />
          ))}
        </div>
        <Caption text={frame.caption} />
      </figure>
    );
  }

  if (frame.kind === "PAIR") {
    return (
      <figure className="frame frame--pair" {...common}>
        <div className="duo">
          {frame.plates.map((p) => (
            <Plate key={p.id} drawing={p.drawing} alt={p.alt} motion={motion} />
          ))}
        </div>
        <Caption text={frame.caption} />
      </figure>
    );
  }

  // Words shrink the plate; silence enlarges it. A wordless frame has no caption
  // to balance its left margin, so the figure grows to become the composition.
  const solo = frame.caption === "" ? " frame--solo" : "";
  const plate = frame.plates[0];

  return (
    <figure className={`frame frame--plate${solo}`} {...common}>
      {plate ? <Plate drawing={plate.drawing} alt={plate.alt} motion={motion} /> : null}
      <Caption text={frame.caption} />
    </figure>
  );
}
