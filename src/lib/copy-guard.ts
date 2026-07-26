/**
 * Two binding content rules, turned into behaviour rather than good intentions:
 *
 *   1. no LLM-register phrasing
 *   2. no client, employer, or product names — anywhere, in any tense
 *
 * Used by the seed script and by the admin before anything is published.
 */

export type CopyViolation = {
  kind: "banned-phrase" | "named-entity";
  match: string;
};

/** Highest-signal LLM tells. Matched case-insensitively, on word boundaries. */
const BANNED_PHRASES = [
  "passionate about",
  "cutting-edge",
  "state-of-the-art",
  "seamless",
  "seamlessly",
  "leverage",
  "leveraging",
  "delve",
  "dive into",
  "in today's fast-paced",
  "ever-evolving",
  "a testament to",
  "unlock the potential",
  "at its core",
];

/**
 * Names that must never appear. Deliberately an explicit list rather than a
 * heuristic: any regex broad enough to catch a company name would also flag
 * Indianapolis and Brazil, which belong on the page.
 */
const FORBIDDEN_ENTITIES = [
  "Aslan",
  "IMENSIAH",
  "AllAboutFood",
  "Accumulate",
  "Rose-Hulman",
  "Deco Faria",
  "Andre Faria",
  "André Faria",
  "decofaria.com.br",
  "bydap.com.br",
  "allaboutfood.cafe",
  "imensiah.com.br",
];

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function checkCopy(text: string): CopyViolation[] {
  const found: CopyViolation[] = [];

  for (const phrase of BANNED_PHRASES) {
    if (new RegExp(`\\b${escapeRe(phrase)}\\b`, "i").test(text)) {
      found.push({ kind: "banned-phrase", match: phrase });
    }
  }

  for (const entity of FORBIDDEN_ENTITIES) {
    if (new RegExp(`\\b${escapeRe(entity)}\\b`, "i").test(text)) {
      const dup = found.some(
        (f) => f.kind === "named-entity" && f.match.toLowerCase() === entity.toLowerCase(),
      );
      if (!dup) found.push({ kind: "named-entity", match: entity });
    }
  }

  return found;
}

/**
 * True when the text makes a quantified claim. Such claims must ship with the
 * mechanism that produced them in the same breath — a bare percentage reads as
 * inflated, and an unexplained one cannot be defended in conversation.
 */
export function needsMechanism(text: string): boolean {
  return /\d\s*%|[$£€]\s*[\d,]|→|->/.test(text);
}

export function assertCopy(text: string, where: string): void {
  const violations = checkCopy(text);
  if (violations.length === 0) return;
  const detail = violations.map((v) => `${v.kind}: "${v.match}"`).join("; ");
  throw new Error(`Copy rejected in ${where} — ${detail}`);
}
