'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { HERO, SITE } from '../../data/content';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center"
      style={{ y, opacity }}
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        {/* Desktop */}
        <video
          autoPlay muted loop playsInline preload="metadata"
          src={HERO.videos.desktop}
          className="hidden sm:block w-full h-full object-cover"
        />
        {/* Mobile */}
        <video
          autoPlay muted loop playsInline preload="metadata"
          src={HERO.videos.mobile}
          className="block sm:hidden w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tight mb-4">
          {HERO.headline}
          <br />
          <span className="text-neutral-400">{HERO.headlineAccent}</span>
        </h1>

        <p className="text-lg sm:text-xl text-neutral-300 max-w-xl mx-auto">
          {HERO.subtitle}
        </p>

        <p className="mt-8 text-sm text-neutral-400">
          {SITE.name} · {SITE.school}
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border border-white/40 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
