import { getSettings, getAspects } from "@/lib/content";
import { Field } from "@/components/field";
import { Header, Contact } from "@/components/chrome";

export const revalidate = 900;

/**
 * THE FIELD.
 *
 * THESIS: range read at a glance, not accumulated by scrolling. One screen holds
 * eighteen drawings of one person at once, so you cannot look at any of them
 * without seeing the others. Refuses the portfolio scroll, and the section
 * stack that comes with it.
 *
 * OWN-WORLD: drenched Prussian blue ground, one warm rag-paper ink, no third
 * colour and no accent. Archivo alone, caption sizes only, no display type. The
 * twenty-three traced drawings are the entire component library; there are no
 * cards, icons, borders or shadows anywhere.
 *
 * STORY: a visitor sees one person doing many things, picks whichever one they
 * recognise, reads two sentences, finds the boy who was doing it first, and
 * moves sideways to the next without ever leaving the page.
 *
 * FIRST VIEWPORT: the whole site. Guitar largest at lower left, forehand upper
 * right, the waterfall alone at top left, camera bottom centre, laptop bottom
 * right; thirteen smaller drawings clustered around them at 55% ink. Name top
 * left, role top right, contact along the bottom.
 *
 * FORM: brief-pinned by Renato (one page, montage, zoom in, zoom out, liquid
 * morph), so no concept roll was run. Cyanotype and Muybridge carry over from
 * the retired Plate Sequence world; what is retired is the sequence itself.
 */
export default async function Page() {
  const [settings, aspects] = await Promise.all([getSettings(), getAspects()]);

  return (
    <>
      <Header s={settings} />
      <Field aspects={aspects} contact={<Contact s={settings} />} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: settings.subjectName,
            jobTitle: settings.subjectRole,
            url: "https://renatodap.me",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Indianapolis",
              addressRegion: "IN",
              addressCountry: "US",
            },
            sameAs: [
              settings.githubUrl,
              settings.linkedinUrl,
              settings.youtubeUrl,
              settings.spotifyUrl,
            ].filter(Boolean),
          }),
        }}
      />
    </>
  );
}
