import type { SiteSetting } from "@/lib/content";

/**
 * The header exists for the visitor who leaves in five seconds.
 *
 * Most viewing time never leaves the first screen, and this site's stated failure
 * mode is that someone remembers "a nice dark portfolio" and nothing about the
 * person. Two lines of literal fact cost almost nothing and make that failure
 * impossible. They are also the reason the largest drawing on the field is free
 * to be the guitar rather than the laptop: the words have already said engineer,
 * so the first image gets to break the expectation instead of confirming it.
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

/** Where to find him. Sits along the bottom of the field. */
export function Contact({ s }: { s: SiteSetting }) {
  const links = [
    s.email ? { label: "Email", href: `mailto:${s.email}` } : null,
    s.githubUrl ? { label: "GitHub", href: s.githubUrl } : null,
    s.linkedinUrl ? { label: "LinkedIn", href: s.linkedinUrl } : null,
    s.youtubeUrl ? { label: "YouTube", href: s.youtubeUrl } : null,
    s.spotifyUrl ? { label: "Spotify", href: s.spotifyUrl } : null,
  ].filter((l): l is { label: string; href: string } => l !== null);

  if (links.length === 0) return null;

  return (
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
  );
}
