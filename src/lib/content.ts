import "server-only";
import { prisma } from "@/lib/db";
import type { SiteSetting } from "@prisma/client";
import { SETTINGS, ASPECTS as SEEDED } from "@/content/site.mjs";
import { PLACE, type Place } from "@/lib/layout";

/**
 * The only module the view layer uses to reach the database.
 *
 * CONTENT COMES FROM POSTGRES. Titles, sentences, alt text, which drawing is a
 * hero and which aspect it belongs to are all rows, seeded from
 * src/content/site.mjs, so /admin can edit them without a deploy.
 *
 * GEOMETRY DOES NOT. Position, size and the camera live in src/lib/layout.ts and
 * are joined on here by drawing slug. That split is deliberate: content is meant
 * to change, and the composition is not.
 *
 * Every read falls back to the seed source rather than throwing. A personal site
 * whose database is briefly unreachable should still be the site, not an error
 * page, and this is the whole difference between a bad deploy being invisible
 * and being fatal.
 */

export type { SiteSetting };

export type Mark = {
  drawing: string;
  alt: string;
  /** The largest drawing of its aspect, and the one that carries the label. */
  hero: boolean;
  /** Absent means the drawing has no place in the composition at all. */
  place?: Place;
};

export type Aspect = {
  id: string;
  title: string;
  lines: string[];
  marks: Mark[];
};

const FALLBACK_SETTINGS: SiteSetting = {
  id: "main",
  ...SETTINGS,
  updatedAt: new Date(0),
};

export async function getSettings(): Promise<SiteSetting> {
  try {
    return (await prisma.siteSetting.findUnique({ where: { id: "main" } })) ?? FALLBACK_SETTINGS;
  } catch {
    return FALLBACK_SETTINGS;
  }
}

/** Joins a content row to its place in the composition. No place, no appearance. */
function place(drawing: string): Pick<Mark, "place"> {
  return PLACE[drawing] ? { place: PLACE[drawing] } : {};
}

function fromSeed(): Aspect[] {
  return SEEDED.map((a) => ({
    id: a.id,
    title: a.title,
    lines: a.lines,
    marks: a.marks.map((m) => ({
      drawing: m.drawing,
      alt: m.alt,
      hero: m.hero === true,
      ...place(m.drawing),
    })),
  }));
}

export async function getAspects(): Promise<Aspect[]> {
  try {
    const rows = await prisma.aspect.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: { marks: { orderBy: { sortOrder: "asc" } } },
    });

    // An empty table is a database that has never been seeded, not a site with
    // no content. Rendering nothing there would be a blank blue screen.
    if (rows.length === 0) return fromSeed();

    return rows.map((a) => ({
      id: a.id,
      title: a.title,
      // Stored as text with newlines, the way a caption is written.
      lines: a.body.split("\n").filter(Boolean),
      marks: a.marks.map((m) => ({
        drawing: m.drawing,
        alt: m.alt,
        hero: m.isHero,
        ...place(m.drawing),
      })),
    }));
  } catch {
    return fromSeed();
  }
}
