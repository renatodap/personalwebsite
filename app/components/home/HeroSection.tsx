'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { HERO } from '../../data/content';

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: 90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.5 },
  },
};

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

  const nameLetters = HERO.name.split('');

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center"
      style={{ y, opacity }}
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <video
          autoPlay muted loop playsInline preload="metadata"
          src={HERO.videos.desktop}
          className="hidden sm:block w-full h-full object-cover"
        />
        <video
          autoPlay muted loop playsInline preload="metadata"
          src={HERO.videos.mobile}
          className="block sm:hidden w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6" style={{ perspective: '800px' }}>
        <motion.h1
          className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tight mb-4 flex justify-center flex-wrap"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
        >
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="inline-block"
              style={{ transformOrigin: 'bottom center' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-neutral-400"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {HERO.schoolLine}
        </motion.p>
      </div>

      {/* Scroll indicator — thin line */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">scroll</span>
        <motion.div
          className="w-px h-10 bg-white/40 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.section>
  );
}
