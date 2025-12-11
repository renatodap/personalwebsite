'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Hero from './components/home/HeroSection';
import { PROJECTS, SITE, SOCIAL, TENNIS, MUSIC, RUNNING, type Project } from './data/content';

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

          <ul className="space-y-1.5">
            {project.highlights.map((h, i) => (
              <li key={i} className="text-sm text-neutral-600 flex items-start gap-2">
                <span className="text-neutral-400 mt-0.5">·</span>
                {h}
              </li>
            ))}
          </ul>

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

      {/* PROJECTS */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-16">
            <h2 className="text-3xl font-semibold text-neutral-900">Work</h2>
          </FadeIn>

          <div className="space-y-24">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* BEYOND CODE - Athletics + Music */}
      <section className="py-24 px-6 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-16">
            <h2 className="text-3xl font-semibold text-neutral-900">Beyond Code</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12">

            {/* Tennis */}
            <FadeIn delay={0.1}>
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                  <Image
                    src={TENNIS.image}
                    alt="Tennis"
                    fill
                    className="object-cover object-[center_20%]"
                  />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">{TENNIS.role}</p>
                  <h3 className="text-xl font-semibold text-neutral-900">{TENNIS.team}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{TENNIS.achievement}</p>
                </div>
                <div className="text-sm text-neutral-600 bg-white rounded-lg p-3 border border-neutral-200">
                  <span className="font-medium">Next:</span> {TENNIS.nextMatch.date} vs {TENNIS.nextMatch.opponent}
                </div>
              </div>
            </FadeIn>

            {/* Running */}
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                  <Image
                    src={RUNNING.image}
                    alt="Half Marathon"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">{RUNNING.distance}</p>
                  <h3 className="text-xl font-semibold text-neutral-900">{RUNNING.event}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{RUNNING.pace} avg pace</p>
                </div>
              </div>
            </FadeIn>

            {/* Music */}
            <FadeIn delay={0.3}>
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                  <Image
                    src={MUSIC.image}
                    alt="Live Performance"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Multi-instrumentalist</p>
                  <h3 className="text-xl font-semibold text-neutral-900">{MUSIC.title}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{MUSIC.description}</p>
                </div>
                <div className="flex gap-3">
                  <a href={MUSIC.links.youtube} target="_blank" rel="noopener noreferrer"
                     className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                    YouTube →
                  </a>
                  <a href={MUSIC.links.spotify} target="_blank" rel="noopener noreferrer"
                     className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                    Spotify →
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-semibold text-neutral-900 mb-4">Get in touch</h2>
            <p className="text-neutral-600 mb-8">
              Looking for full-time AI/backend engineering roles starting {SITE.graduation}.
            </p>

            <div className="flex justify-center gap-6 mb-8">
              {[
                { href: SOCIAL.linkedin, label: 'LinkedIn' },
                { href: SOCIAL.github, label: 'GitHub' },
                { href: SOCIAL.youtube, label: 'YouTube' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href={`mailto:${SITE.email}`}
              className="inline-block px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors"
            >
              {SITE.email}
            </a>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
