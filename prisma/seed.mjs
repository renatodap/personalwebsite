/**
 * Seeds the sequence.
 *
 * Frames are replaced wholesale rather than upserted: the sequence has no stable
 * natural key (a frame is identified by its position, and position is the thing
 * most likely to change), and the whole set is small. Plates cascade.
 *
 * Every visible string passes the copy guard before it is written and the script
 * exits non-zero on a violation, so the anonymity, register and em-dash rules
 * hold as content grows rather than depending on anyone remembering them.
 */
import { PrismaClient } from "@prisma/client";
import { SEQUENCE, SETTINGS } from "./sequence.mjs";
import { assertCopy } from "./copy-rules.mjs";

const prisma = new PrismaClient();

async function main() {
  for (const [key, value] of Object.entries(SETTINGS)) {
    // URLs are exempt: a domain is not prose, and the entity list would flag
    // his own handles.
    if (/^https?:/.test(value) || key === "email") continue;
    assertCopy(value, `SiteSetting.${key}`);
  }

  await prisma.siteSetting.upsert({
    where: { id: "main" },
    update: SETTINGS,
    create: { id: "main", ...SETTINGS },
  });

  // Plates cascade on frame delete, so this clears both tables.
  await prisma.frame.deleteMany({});

  for (const [i, frame] of SEQUENCE.entries()) {
    assertCopy(frame.caption, `Frame ${i + 1} caption`);
    for (const p of frame.plates) assertCopy(p.alt, `Frame ${i + 1} alt for ${p.drawing}`);

    await prisma.frame.create({
      data: {
        kind: frame.kind,
        caption: frame.caption,
        sortOrder: i,
        plates: {
          create: frame.plates.map((p, j) => ({
            drawing: p.drawing,
            zoom: p.zoom,
            alt: p.alt,
            sortOrder: j,
          })),
        },
      },
    });
  }

  const plates = SEQUENCE.reduce((n, f) => n + f.plates.length, 0);
  console.log(`Seeded ${SEQUENCE.length} frames, ${plates} plates.`);
}

main()
  .catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
