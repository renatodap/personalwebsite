'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Hero from './components/home/HeroSection';
import { PROJECTS, SITE, SOCIAL, INTRO, ATHLETICS, MUSIC, GITHUB_LINK, type Project } from './data/content';

// ============================================================
// FADE IN WRAPPER
// ============================================================

function FadeIn({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// PROJECT CARD
// ============================================================

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <FadeIn delay={index * 0.1}>
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>

        {/* Visual */}
        <div className="w-full lg:w-1/2">
          {project.image ? (
            <a
              href={project.link?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </a>
          ) : project.videoId ? (
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${project.videoId}`}
                title={project.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-[4/3] rounded-2xl bg-neutral-100 flex items-center justify-center">
              <span className="text-6xl font-light text-neutral-300">0{index + 1}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div>
            <p className="text-sm text-neutral-500 mb-1">{project.role} · {project.period}</p>
            <h3 className="text-2xl font-semibold text-neutral-900">{project.title}</h3>
          </div>

          <p className="text-neutral-600 leading-relaxed">{project.description}</p>

          {project.highlights && project.highlights.length > 0 && (
            <ul className="space-y-1.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="text-sm text-neutral-600 flex items-start gap-2">
                  <span className="text-neutral-400 mt-0.5">·</span>
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t) => (
              <span key={t} className="px-2.5 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-full">
                {t}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm font-medium text-neutral-900 hover:text-orange-600 transition-colors"
            >
              {project.link.label} →
            </a>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function HomePage() {
  return (
    <main className="relative w-full bg-white text-black">

      {/* HERO */}
      <Hero />

      {/* INTRO */}
      <section className="py-24 px-6">
        <FadeIn>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-neutral-700 leading-relaxed text-center">
            {INTRO.text}
          </p>
        </FadeIn>
      </section>

      {/* PROJECTS */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-24">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* GitHub link */}
          <FadeIn>
            <p className="mt-24 text-center text-neutral-500">
              {GITHUB_LINK.text}{' '}
              <a
                href={GITHUB_LINK.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 hover:text-orange-600 transition-colors font-medium"
              >
                GitHub →
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PERSONAL */}
      <section className="py-24 px-6 bg-neutral-50">
        <div className="max-w-5xl mx-auto space-y-24">

          {/* Athletics */}
          <FadeIn>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                  <Image
                    src={ATHLETICS.image}
                    alt="Tennis"
                    fill
                    className="object-cover object-[center_20%]"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-4">
                <p className="text-neutral-700 leading-relaxed text-lg">
                  {ATHLETICS.text}
                </p>
                <a
                  href={ATHLETICS.scheduleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium text-neutral-900 hover:text-orange-600 transition-colors"
                >
                  Schedule →
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Music */}
          <FadeIn>
            <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-center">
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                  <Image
                    src={MUSIC.image}
                    alt="Live performance"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-4">
                <p className="text-neutral-700 leading-relaxed text-lg">
                  {MUSIC.text}
                </p>
                <div className="flex gap-4">
                  <a
                    href={MUSIC.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-neutral-900 hover:text-orange-600 transition-colors"
                  >
                    YouTube →
                  </a>
                  <a
                    href={MUSIC.links.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-neutral-900 hover:text-orange-600 transition-colors"
                  >
                    Spotify →
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-sm text-neutral-500 mb-8">
              Graduating {SITE.graduation} from Rose-Hulman.
            </p>

            <a
              href={`mailto:${SITE.email}`}
              className="inline-block text-lg font-medium text-neutral-900 hover:text-orange-600 transition-colors mb-8"
            >
              {SITE.email}
            </a>

            <div className="flex justify-center gap-6">
              {[
                { href: SOCIAL.linkedin, label: 'LinkedIn' },
                { href: SOCIAL.github, label: 'GitHub' },
                { href: SOCIAL.youtube, label: 'YouTube' },
                { href: SOCIAL.spotify, label: 'Spotify' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
