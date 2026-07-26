import type { SiteSetting } from "@/lib/content";

/**
 * The header exists for the visitor who leaves in five seconds.
 *
 * Roughly 57% of viewing time never leaves the first screen, and this site's
 * stated failure mode is that someone remembers "a nice dark portfolio" and
 * nothing about the person. Two fixed lines of literal fact cost almost nothing
 * and make that failure impossible. They are also the reason the first IMAGE is
 * free to be the guitar rather than the laptop.
 */
export function Header({ s }: { s: SiteSetting }) {
  const who = [s.subjectRole, s.subjectLocation].filter(Boolean).join(". ");

  return (
    <header className="head">
      <h1 className="name">{s.subjectName}</h1>
      {who ? <p className="who">{who}.</p> : null}
    </header>
  );
}

/** Where to find him. Nothing follows this. */
export function Close({ s }: { s: SiteSetting }) {
  const links = [
    s.email ? { label: "Email", href: `mailto:${s.email}` } : null,
    s.githubUrl ? { label: "GitHub", href: s.githubUrl } : null,
    s.linkedinUrl ? { label: "LinkedIn", href: s.linkedinUrl } : null,
    s.youtubeUrl ? { label: "YouTube", href: s.youtubeUrl } : null,
    s.spotifyUrl ? { label: "Spotify", href: s.spotifyUrl } : null,
  ].filter((l): l is { label: string; href: string } => l !== null);

  if (links.length === 0) return null;

  return (
    <section className="close" aria-label="Contact">
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              {...(l.href.startsWith("http")
                ? { target: "_blank", rel: "me noopener noreferrer" }
                : {})}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
