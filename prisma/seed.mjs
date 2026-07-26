/**
 * Seeds the sheet. Idempotent — upserts on stable keys, so re-running never
 * duplicates. Every string passes the copy guard before it is written; the
 * script exits non-zero on a violation, which is how the anonymity and register
 * rules stay enforced as content grows rather than depending on memory.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// The guard is duplicated here rather than imported because this script runs
// under plain node, outside the TS path aliases.
const BANNED = [
  "passionate about", "cutting-edge", "state-of-the-art", "seamless", "seamlessly",
  "leverage", "leveraging", "delve", "dive into", "in today's fast-paced",
  "ever-evolving", "a testament to", "unlock the potential", "at its core",
];
const FORBIDDEN = [
  "Aslan", "IMENSIAH", "AllAboutFood", "Accumulate", "Rose-Hulman",
  "Deco Faria", "Andre Faria", "André Faria",
  "decofaria.com.br", "bydap.com.br", "allaboutfood.cafe", "imensiah.com.br",
];

function guard(value, where) {
  if (typeof value !== "string" || !value) return value;
  for (const p of BANNED) {
    if (new RegExp(`\\b${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(value)) {
      throw new Error(`Copy rejected in ${where} — banned phrase "${p}"`);
    }
  }
  for (const e of FORBIDDEN) {
    if (new RegExp(`\\b${e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(value)) {
      throw new Error(`Copy rejected in ${where} — named entity "${e}"`);
    }
  }
  return value;
}

function clean(obj, where) {
  for (const [k, v] of Object.entries(obj)) guard(v, `${where}.${k}`);
  return obj;
}

/* ── Parts ─────────────────────────────────────────────────────────────
   itemNo 00 is the anchor: a childhood drawing with no adult counterpart.
   It is excluded from the assembly and rendered last, as the ending.

   QTY rule: a quantity is allowed when it is a property of a kind of thing
   learned. It is banned when it measures throughput — a number that rises
   simply by working more hours is a boast, not a fact.                     */
const PARTS = [
  {
    itemNo: "00", description: "Original part", qty: "1", material: "Costume · wooden sword",
    drawing: "peter-pan", earlyDrawing: "peter-pan", earlyNote: "", isAnchor: true, sortOrder: 0,
  },
  {
    itemNo: "01", description: "Self-taught instrument", qty: "7",
    material: "Guitar · piano · bass · drums · ukulele · harmonica · voice",
    drawing: "guitar", earlyDrawing: "webcam-guitar", earlyNote: "As originally fitted", sortOrder: 1,
  },
  {
    itemNo: "02", description: "Racket", qty: "1", material: "College tennis · captained · season closed",
    drawing: "serve", earlyDrawing: "first-racket", earlyNote: "As originally fitted", sortOrder: 2,
  },
  {
    itemNo: "03", description: "Camera", qty: "1", material: "Stills · motion · one-man crew",
    drawing: "camera", earlyDrawing: "first-camera", earlyNote: "As originally fitted", sortOrder: 3,
  },
  {
    itemNo: "04", description: "Road distance", qty: "—", material: "Half marathon · 7:32 per mile",
    drawing: "running", earlyDrawing: "", sortOrder: 4,
  },
  {
    itemNo: "05", description: "Laptop", qty: "1", material: "Software, in production, for people who depend on it",
    drawing: "working", earlyDrawing: "", sortOrder: 5,
  },
  {
    itemNo: "06", description: "Passport", qty: "1", material: "Brazil · Indiana",
    drawing: "graduation", earlyDrawing: "brazil", earlyNote: "As originally fitted", sortOrder: 6,
  },
];

const DETAILS = [
  { label: "Detail A", scaleNote: "Scale 2:1", drawing: "broken-racket", sortOrder: 0 },
  { label: "Detail A", scaleNote: "Scale 2:1", drawing: "broken-sticks", sortOrder: 1 },
];

/* The case study is deliberately OFF. It was the wordiest block on the sheet by
   a wide margin, and the sheet's rule is that words are rare and must earn their
   place against a drawing. The record stays so it can be switched back on from
   the admin without a deploy; nothing renders while isActive is false. */
const WORK = {
  askedFor: "",
  actualConstraint: "",
  whatChanged: "",
  isActive: false,
};

const REVISIONS = [
  { rev: "A", date: "2004", description: "Born in Brazil.", sortOrder: 0 },
  { rev: "B", date: "2022", description: "Moved to Indiana. Started Mechanical Engineering.", sortOrder: 1 },
  {
    rev: "C", date: "2023",
    description: "Changed to Computer Science a year in — late enough that it hurt, which is why it happened before it got later.",
    sortOrder: 2,
  },
  { rev: "D", date: "2026", description: "Graduated. Captained a last tennis season.", sortOrder: 3 },
  { rev: "E", date: "2026", description: "Lead software engineer. Remote, from Indianapolis.", sortOrder: 4 },
  // Deliberately empty: this is ITEM 00's row.
  { rev: "—", date: "", description: "", sortOrder: 5 },
];

async function main() {
  await prisma.siteSetting.upsert({
    where: { id: "main" },
    update: clean({
      subjectName: "Renato Prado",
      subjectRole: "Lead software engineer",
      subjectLocation: "Indianapolis, IN",
      subjectMode: "Remote",
      drawingTitle: "General assembly",
      sheetOf: "1 of 1",
      email: "renatodaprado@gmail.com",
      githubUrl: "https://github.com/renatodap",
      linkedinUrl: "https://www.linkedin.com/in/renato-prado-82513b297",
      youtubeUrl: "https://www.youtube.com/@RenatoDAP",
      spotifyUrl: "https://open.spotify.com/artist/3VZ8V9XhQ9oZb5XnZ9g8yB",
    }, "SiteSetting"),
    create: { id: "main" },
  });
  // Re-apply on create-only rows too.
  await prisma.siteSetting.update({
    where: { id: "main" },
    data: {
      subjectName: "Renato Prado",
      subjectRole: "Lead software engineer",
      subjectLocation: "Indianapolis, IN",
      subjectMode: "Remote",
      email: "renatodaprado@gmail.com",
      githubUrl: "https://github.com/renatodap",
      linkedinUrl: "https://www.linkedin.com/in/renato-prado-82513b297",
      youtubeUrl: "https://www.youtube.com/@RenatoDAP",
      spotifyUrl: "https://open.spotify.com/artist/3VZ8V9XhQ9oZb5XnZ9g8yB",
    },
  });

  for (const p of PARTS) {
    clean(p, `Part ${p.itemNo}`);
    await prisma.part.upsert({ where: { itemNo: p.itemNo }, update: p, create: p });
  }

  await prisma.detail.deleteMany({});
  for (const d of DETAILS) await prisma.detail.create({ data: clean(d, "Detail") });

  await prisma.workNote.upsert({
    where: { id: "main" },
    update: clean(WORK, "WorkNote"),
    create: { id: "main", ...WORK },
  });

  await prisma.revision.deleteMany({});
  for (const r of REVISIONS) await prisma.revision.create({ data: clean(r, `Revision ${r.rev}`) });

  const counts = {
    parts: await prisma.part.count(),
    details: await prisma.detail.count(),
    revisions: await prisma.revision.count(),
  };
  console.log("seeded", counts);
}

main()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
