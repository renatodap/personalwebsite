import { getSettings, getFrames } from "@/lib/content";
import { Frame } from "@/components/frame";
import { Header, Close } from "@/components/chrome";
import { Rail } from "@/components/rail";

export const revalidate = 900;

/**
 * The sequence.
 *
 * Order is the argument, and the reasoning for this particular order lives with
 * the data that defines it, in prisma/sequence.mjs. In short: the guitar opens
 * because the header has already said "engineer", so the first image is free to
 * break the expectation rather than confirm it; the wear pair in the middle is
 * the peak and is silent; the three childhood plates establish a rule and the
 * last one breaks it. The page never states the conclusion.
 */
export default async function Page() {
  const [settings, frames] = await Promise.all([getSettings(), getFrames()]);

  return (
    <>
      <Header s={settings} />
      {frames.length > 1 ? <Rail count={frames.length} /> : null}

      <main>
        {frames.map((frame, i) => (
          <Frame key={frame.id} frame={frame} index={i} isFirst={i === 0} />
        ))}
        <Close s={settings} />
      </main>

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
