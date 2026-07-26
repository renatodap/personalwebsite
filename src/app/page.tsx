import { getSettings, getParts, getAnchor, getDetails, getRevisions, getWorkNote } from "@/lib/content";
import { recentActivities } from "@/lib/activity";
import {
  TitleBlock, Assembly, BillOfMaterials, Pair, Wear, Work, Live, Revisions, ItemZero, Contact,
} from "@/components/sheet/sections";

export const revalidate = 900;

/**
 * Sheet 1 of 1.
 *
 * The order is the argument, so it is worth stating plainly:
 *
 *   title block   the literal facts, for the visitor who leaves in five seconds
 *   assembly      adult parts only — establishes the wrong belief on purpose
 *   BOM           the introduction, with no adjective column to boast in
 *   pairs         the spine: the same part, twenty years apart, unexplained
 *   wear          the peak: things broken by being used, held up laughing
 *   work          the one but/therefore beat, naming nobody
 *   live          proof the object is still in service
 *   revisions     the timeline, in the form that stops it becoming a speech
 *   ITEM 00       the pair that never closes — the ending
 *   title block   SHEET 1 OF 1: the whole person fitted on one page
 */
export default async function Sheet() {
  const [settings, parts, anchor, details, revisions, work, live] = await Promise.all([
    getSettings(), getParts(), getAnchor(), getDetails(), getRevisions(), getWorkNote(), recentActivities(4),
  ]);

  // Parts carrying a childhood counterpart become pairs, in sheet order.
  // Unpaired parts stay in the assembly only — they are the present tense the
  // pairs point at, and the quiet between them.
  const pairs = parts.filter((p) => p.earlyDrawing);

  return (
    <main>
      <TitleBlock s={settings} />
      <Assembly parts={parts} />
      <BillOfMaterials parts={parts} anchor={anchor} />
      {pairs.map((p) => (
        <Pair key={p.id} part={p} />
      ))}
      <Wear details={details} />
      <Work note={work} />
      <Live lines={live} />
      <Revisions revisions={revisions} />
      <ItemZero anchor={anchor} />
      <Contact s={settings} />
      <TitleBlock s={settings} footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: settings.subjectName,
            jobTitle: settings.subjectRole,
            url: "https://renatodap.me",
            address: { "@type": "PostalAddress", addressLocality: "Indianapolis", addressRegion: "IN", addressCountry: "US" },
            sameAs: [settings.githubUrl, settings.linkedinUrl, settings.youtubeUrl, settings.spotifyUrl].filter(Boolean),
          }),
        }}
      />
    </main>
  );
}
