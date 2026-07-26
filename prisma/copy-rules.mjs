/**
 * The binding content rules, as behaviour rather than good intentions.
 *
 * One implementation, in .mjs, so the seed script (plain node) and the vitest
 * suite share it. The retired version kept a TypeScript copy in src/lib and a
 * duplicate inline in the seed; they were already drifting.
 *
 * Rules, all from PRODUCT.md and DESIGN.md:
 *   1. no LLM-register phrasing
 *   2. no client, employer, or product names, in any tense
 *   3. no em-dash or en-dash anywhere in visible copy
 *   4. no number that measures throughput
 */

/** Highest-signal LLM tells. Matched case-insensitively on word boundaries. */
export const BANNED_PHRASES = [
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
export const FORBIDDEN_ENTITIES = [
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

/**
 * Countable units whose total rises simply by working more hours. "Seven
 * instruments" describes a method of learning and is allowed; "twelve
 * applications" is a scoreboard and is not. Units of TIME are absent on
 * purpose, so "four years" and "three weeks" stay legal.
 */
const THROUGHPUT_UNITS =
  "applications?|apps?|clients?|customers?|servers?|repositor(?:y|ies)|repos?|deployments?|websites?|sites?|products?|launches";

const COUNT =
  "\\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|dozens?|hundreds?";

const THROUGHPUT_RE = new RegExp(
  `\\b(?:${COUNT})\\s+(?:\\w+\\s+){0,2}?(?:${THROUGHPUT_UNITS})\\b`,
  "i",
);

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** @returns {{kind: string, match: string}[]} */
export function checkCopy(text) {
  if (typeof text !== "string" || text === "") return [];
  const found = [];

  for (const phrase of BANNED_PHRASES) {
    if (new RegExp(`\\b${escapeRe(phrase)}\\b`, "i").test(text)) {
      found.push({ kind: "banned-phrase", match: phrase });
    }
  }

  for (const entity of FORBIDDEN_ENTITIES) {
    if (new RegExp(`\\b${escapeRe(entity)}\\b`, "i").test(text)) {
      found.push({ kind: "named-entity", match: entity });
    }
  }

  // The single most reliable machine-written tell, and banned outright.
  const dash = text.match(/[—–]/);
  if (dash) found.push({ kind: "em-dash", match: dash[0] });

  const throughput = text.match(THROUGHPUT_RE);
  if (throughput) found.push({ kind: "throughput-number", match: throughput[0] });

  return found;
}

/** Throws on any violation. Used by the seed so bad copy never reaches the DB. */
export function assertCopy(text, where) {
  const violations = checkCopy(text);
  if (violations.length === 0) return text;
  const detail = violations.map((v) => `${v.kind}: "${v.match}"`).join("; ");
  throw new Error(`Copy rejected in ${where}. ${detail}`);
}
