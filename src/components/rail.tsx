"use client";

import { useEffect, useState } from "react";

/**
 * The only JavaScript on the page.
 *
 * The ticks are real anchors, so position navigation works with JS disabled and
 * for keyboard users; this component adds nothing but the active state. A single
 * IntersectionObserver does it. No scroll listener, no requestAnimationFrame, no
 * state driven by scroll offset.
 *
 * Ratios are kept in a Map across callbacks because an IntersectionObserver
 * callback receives only the entries that CHANGED. Picking the most visible
 * frame from one callback's entries alone gives the wrong answer the moment a
 * frame leaves the viewport without its neighbour reporting in.
 */
export function Rail({ count }: { count: number }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const frames = Array.from(document.querySelectorAll<HTMLElement>("[data-frame]"));
    if (frames.length === 0) return;

    const ratios = new Map<number, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const i = Number((entry.target as HTMLElement).dataset.frame);
          ratios.set(i, entry.intersectionRatio);
        }

        let bestIndex = 0;
        let bestRatio = -1;
        for (const [i, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = i;
          }
        }
        setActive(bestIndex);
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] },
    );

    for (const frame of frames) io.observe(frame);
    return () => io.disconnect();
  }, []);

  return (
    <nav className="rail" aria-label="Sequence">
      {Array.from({ length: count }, (_, i) => (
        <a
          key={i}
          href={`#frame-${i + 1}`}
          aria-label={`Frame ${i + 1} of ${count}`}
          aria-current={i === active ? "true" : undefined}
        >
          <i />
        </a>
      ))}
    </nav>
  );
}
