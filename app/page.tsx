'use client';

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion';
import { useRef, useCallback } from 'react';
import Image from 'next/image';
import Hero from './components/home/HeroSection';
import {
  PROJECTS,
  SITE,
  SOCIAL,
  INTRO,
  ATHLETICS,
  MUSIC,
  GITHUB_LINK,
  type Project,
} from './data/content';

// ============================================================
// REVEAL (simple fade wrapper for non-scroll-linked sections)
// ============================================================

function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 40,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const offsets = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offsets[direction].x, y: offsets[direction].y }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offsets[direction].x, y: offsets[direction].y }
      }
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// SCROLL REVEAL TEXT (word-by-word opacity on scroll)
// ============================================================

function ScrollRevealText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <ScrollWord key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}

function ScrollWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span className="mr-[0.3em] inline-block" style={{ opacity }}>
      {word}
    </motion.span>
  );
}

// ============================================================
// PROJECT CARD (full-width, clip-path reveal, parallax)
// ============================================================

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Clip-path: inset(15%) → inset(0%)
  const clip = useTransform(scrollYProgress, [0, 0.4], [15, 0]);
  const clipPath = useMotionTemplate`inset(${clip}%)`;

  // Parallax on the image
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  // Text reveal triggers after clip opens
  const textInView = useInView(ref, { once: true, margin: '-20%' });

  const num = String(index + 1).padStart(2, '0');

  const hasImage = !!project.image;
  const hasVideo = !!project.videoId;
  const thumbnailUrl = hasVideo
    ? `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`
    : undefined;

  return (
    <div ref={ref} className="relative">
      {/* Image with clip-path reveal */}
      <motion.div
        className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden rounded-lg"
        style={{ clipPath }}
      >
        {hasImage ? (
          <motion.div className="absolute inset-0 scale-[1.2]" style={{ y: imgY }}>
            <Image
              src={project.image!}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>
        ) : hasVideo ? (
          <a
            href={project.link?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block absolute inset-0 group"
          >
            <motion.div className="absolute inset-0 scale-[1.2]" style={{ y: imgY }}>
              <Image
                src={thumbnailUrl!}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
              <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </a>
        ) : (
          <div className="absolute inset-0 bg-[#141414] flex items-center justify-center">
            <span className="text-6xl font-light text-[var(--muted)]/30">{num}</span>
          </div>
        )}

        {/* Gradient scrim at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </motion.div>

      {/* Text overlay at bottom-left */}
      <div className="relative mt-6 sm:mt-8">
        {/* Ghost project number */}
        <span className="absolute -top-16 right-0 text-8xl font-[family-name:var(--font-heading)] text-[var(--foreground)] opacity-[0.04] select-none pointer-events-none hidden sm:block">
          {num}
        </span>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm text-[var(--muted)] mb-2">
            {project.role} &middot; {project.period}
          </p>
          <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-heading)] font-semibold text-[var(--foreground)] mb-3">
            {project.title}
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <p className="text-[var(--foreground)]/80 leading-relaxed max-w-2xl mb-4">
            {project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {project.highlights.map((h, i) => (
                <li key={i} className="text-sm text-[var(--foreground)]/60 flex items-start gap-2">
                  <span className="text-[var(--muted)] mt-0.5">&middot;</span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-wrap items-center gap-3"
        >
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-mono border border-[var(--muted)]/30 text-[var(--muted)]"
              >
                {t}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors ml-auto group"
            >
              {project.link.label} &rarr;
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================
// MAGNETIC BUTTON (tracks mouse, spring physics)
// ============================================================

function MagneticEmail({ email }: { email: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || window.matchMedia('(pointer: coarse)').matches) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.15);
      y.set((e.clientY - cy) * 0.15);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={`mailto:${email}`}
      className="inline-block text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-heading)] font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {email}
    </motion.a>
  );
}

// ============================================================
// MUSIC MOSAIC
// ============================================================

const mosaicAspects = [
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-[4/5]',
  'aspect-square',
];

function MusicMosaic({ images }: { images: readonly string[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {images.map((src, i) => (
        <Reveal key={src} delay={i * 0.08}>
          <div className={`relative ${mosaicAspects[i]} overflow-hidden rounded-lg`}>
            <Image src={src} alt="Music" fill className="object-cover" />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ============================================================
// ATHLETICS SECTION (clip-path reveal + stat callout)
// ============================================================

function AthleticsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const clip = useTransform(scrollYProgress, [0, 0.4], [15, 0]);
  const clipPath = useMotionTemplate`inset(${clip}%)`;
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div ref={ref} className="space-y-8">
      <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Beyond Code</p>

      <motion.div
        className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden rounded-lg"
        style={{ clipPath }}
      >
        <motion.div className="absolute inset-0 scale-[1.2]" style={{ y: imgY }}>
          <Image
            src={ATHLETICS.image}
            alt="Tennis"
            fill
            className="object-cover object-[center_20%]"
          />
        </motion.div>
      </motion.div>

      <div className="max-w-2xl space-y-4">
        <Reveal>
          <p className="text-[var(--foreground)]/80 leading-relaxed text-lg">
            {ATHLETICS.text}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-[family-name:var(--font-heading)] font-semibold text-[var(--foreground)]">
              7:32<span className="text-xl text-[var(--muted)]">/mi</span>
            </span>
            <span className="text-sm text-[var(--muted)]">half marathon pace</span>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href={ATHLETICS.scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors group"
          >
            Schedule &rarr;
            <span className="absolute -bottom-0.5 left-0 w-full h-px bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>
        </Reveal>
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function HomePage() {
  return (
    <main className="relative w-full">
      {/* HERO */}
      <Hero />

      {/* INTRO — scroll-linked word reveal */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollRevealText
            text={INTRO.text}
            className="text-2xl sm:text-3xl font-[family-name:var(--font-heading)] leading-snug text-center justify-center"
          />
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-32">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* GitHub link */}
          <Reveal>
            <p className="mt-24 text-center text-[var(--muted)]">
              {GITHUB_LINK.text}{' '}
              <a
                href={GITHUB_LINK.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-[var(--foreground)] hover:text-[var(--accent)] font-medium group"
              >
                GitHub &rarr;
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* PERSONAL — Athletics */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AthleticsSection />
        </div>
      </section>

      {/* PERSONAL — Music */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <MusicMosaic images={MUSIC.mosaic} />

          <div className="max-w-2xl space-y-4">
            <Reveal>
              <p className="text-[var(--foreground)]/80 leading-relaxed text-lg">
                {MUSIC.text}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex gap-4 text-sm uppercase tracking-widest text-[var(--muted)]">
                <a
                  href={MUSIC.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  YouTube
                </a>
                <span className="text-[var(--muted)]/30">|</span>
                <a
                  href={MUSIC.links.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Spotify
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <Reveal>
            <MagneticEmail email={SITE.email} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex justify-center gap-4 text-sm uppercase tracking-widest text-[var(--muted)]">
              {[
                { href: SOCIAL.linkedin, label: 'LinkedIn' },
                { href: SOCIAL.github, label: 'GitHub' },
                { href: SOCIAL.youtube, label: 'YouTube' },
                { href: SOCIAL.spotify, label: 'Spotify' },
              ].map((link, i) => (
                <span key={link.label} className="flex items-center gap-4">
                  {i > 0 && <span className="text-[var(--muted)]/30">|</span>}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-xs text-[var(--muted)]">
              Graduating {SITE.graduation} from Rose-Hulman.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
