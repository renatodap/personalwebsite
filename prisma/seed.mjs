/**
 * Seeds the content.
 *
 * Aspects are replaced wholesale rather than upserted: the set is five rows,
 * marks cascade, and a partial update is how a drawing ends up belonging to two
 * aspects at once.
 *
 * Every visible string passes the copy guard before it is written and the script
 * exits non-zero on a violation, so the anonymity, register and em-dash rules
 * hold as content grows rather than depending on anyone remembering them.
 */
import { PrismaClient } from "@prisma/client";
import { SETTINGS, ASPECTS } from "../src/content/site.mjs";
import { assertCopy } from "./copy-rules.mjs";

const prisma = new PrismaClient();

async function main() {
  for (const [key, value] of Object.entries(SETTINGS)) {
    // URLs are exempt: a domain is not prose, and the entity list would flag his
    // own handles.
    if (/^https?:/.test(value) || key === "email") continue;
    assertCopy(value, `SiteSetting.${key}`);
  }

  await prisma.siteSetting.upsert({
    where: { id: "main" },
    update: SETTINGS,
    create: { id: "main", ...SETTINGS },
  });

  // Marks cascade on aspect delete, so this clears both tables.
  await prisma.aspect.deleteMany({});

  for (const [i, aspect] of ASPECTS.entries()) {
    assertCopy(aspect.title, `Aspect ${aspect.id} title`);
    for (const line of aspect.lines) assertCopy(line, `Aspect ${aspect.id} body`);
    for (const m of aspect.marks) assertCopy(m.alt, `Aspect ${aspect.id} alt for ${m.drawing}`);

    const heroes = aspect.marks.filter((m) => m.hero === true);
    if (heroes.length !== 1) {
      throw new Error(`Aspect ${aspect.id} has ${heroes.length} heroes. It must have exactly one.`);
    }

    await prisma.aspect.create({
      data: {
        id: aspect.id,
        title: aspect.title,
        body: aspect.lines.join("\n"),
        sortOrder: i,
        marks: {
          create: aspect.marks.map((m, j) => ({
            drawing: m.drawing,
            alt: m.alt,
            isHero: m.hero === true,
            sortOrder: j,
          })),
        },
      },
    });
  }

  const marks = ASPECTS.reduce((n, a) => n + a.marks.length, 0);
  console.log(`Seeded ${ASPECTS.length} aspects, ${marks} marks.`);
}

main()
  .catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
