'use client';

import { SITE, SOCIAL } from '../../data/content';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-24 pb-8 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
        <p>&copy; {currentYear} {SITE.name}</p>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${SITE.email}`}
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Email
          </a>
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            GitHub
          </a>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
