import "server-only";
import { prisma } from "@/lib/db";
import type { Frame, Plate, SiteSetting } from "@prisma/client";

/**
 * The only module the view layer uses to reach the database.
 *
 * Frames filter isActive and order by sortOrder, so "what shows and in what
 * order" stays a data decision. Order is the argument on this site, which is
 * exactly why it is not hardcoded in markup.
 */

export type { SiteSetting };
export type FrameWithPlates = Frame & { plates: Plate[] };

/**
 * Read only. This used to `upsert`, which meant a GET wrote to the database on
 * every render and every revalidation: pointless traffic, and a hard failure if
 * the build container ever reaches Postgres read-only. The defaults below make
 * the page render even against an empty database.
 */
const FALLBACK: SiteSetting = {
  id: "main",
  subjectName: "Renato Prado",
  subjectRole: "Lead software engineer",
  subjectLocation: "Indianapolis",
  email: "",
  githubUrl: "",
  linkedinUrl: "",
  youtubeUrl: "",
  spotifyUrl: "",
  updatedAt: new Date(0),
};

export async function getSettings(): Promise<SiteSetting> {
  const row = await prisma.siteSetting.findUnique({ where: { id: "main" } });
  return row ?? FALLBACK;
}

export async function getFrames(): Promise<FrameWithPlates[]> {
  return prisma.frame.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: { plates: { orderBy: { sortOrder: "asc" } } },
  });
}
