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
        ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-neutral-100' : 'bg-transparent'}
      `}
    >
      <nav className="max-w-5xl mx-auto flex justify-between items-center h-16 px-6">
        <Link
          href="/"
          className={`font-medium text-lg transition-colors ${
            scrolled ? 'text-neutral-900' : 'text-white'
          }`}
        >
          {SITE.name}
        </Link>

        <a
          href={`mailto:${SITE.email}`}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all
            ${scrolled
              ? 'bg-neutral-900 text-white hover:bg-neutral-800'
              : 'bg-white/10 backdrop-blur text-white border border-white/20 hover:bg-white/20'
            }
          `}
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
