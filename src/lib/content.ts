import "server-only";
import { prisma } from "@/lib/db";
import type { Part, Detail, Revision, WorkNote, SiteSetting } from "@prisma/client";

/**
 * The only module the view layer uses to reach the database.
 *
 * Every list filters isActive and orders by sortOrder, so "what shows and in what
 * order" is a data decision the admin controls rather than a code decision.
 */

export type { Part, Detail, Revision, WorkNote, SiteSetting };

export async function getSettings(): Promise<SiteSetting> {
  return prisma.siteSetting.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main" },
  });
}

/** Assembly parts in sheet order. The anchor (ITEM 00) is excluded — it is the ending. */
export async function getParts(): Promise<Part[]> {
  return prisma.part.findMany({
    where: { isActive: true, isAnchor: false },
    orderBy: [{ sortOrder: "asc" }, { itemNo: "asc" }],
  });
}

/** ITEM 00 — the childhood drawing with no adult counterpart. */
export async function getAnchor(): Promise<Part | null> {
  return prisma.part.findFirst({ where: { isActive: true, isAnchor: true } });
}

export async function getDetails(): Promise<Detail[]> {
  return prisma.detail.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }],
  });
}

export async function getRevisions(): Promise<Revision[]> {
  return prisma.revision.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }],
  });
}

export async function getWorkNote(): Promise<WorkNote | null> {
  const note = await prisma.workNote.findUnique({ where: { id: "main" } });
  return note?.isActive ? note : null;
}
