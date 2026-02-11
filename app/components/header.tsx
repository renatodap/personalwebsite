'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE } from '../data/content';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${hidden ? '-translate-y-full' : 'translate-y-0'}
        ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}
      `}
    >
      <nav className="max-w-5xl mx-auto flex justify-between items-center h-16 px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-heading)] font-medium text-lg text-[var(--foreground)] transition-colors"
        >
          {SITE.name}
        </Link>

        <a
          href={`mailto:${SITE.email}`}
          className="px-4 py-2 text-sm font-medium transition-all border border-[var(--foreground)]/20 text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
