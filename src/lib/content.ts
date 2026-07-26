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

export async function getSettings(): Promise<SiteSetting> {
  return prisma.siteSetting.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main" },
  });
}

export async function getFrames(): Promise<FrameWithPlates[]> {
  return prisma.frame.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: { plates: { orderBy: { sortOrder: "asc" } } },
  });
}
