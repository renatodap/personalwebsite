'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Hero from './components/home/HeroSection';

import Image from 'next/image';

// === CINEMATIC COMPONENTS ===

function CinematicSection({ children, className = '', delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 1.2, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxText({ children, offset = 50 }: { children: React.ReactNode; offset?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

function FloatingCard({ children, index = 0 }: { children: React.ReactNode; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="transform-gpu"
    >
      {children}
    </motion.div>
  );
}

// Content config (images, text, etc.)
type Align = "center" | "left" | "right";
type Section = {
  id: string;
  title: string;
  description: string | React.ReactNode;
  ctas: Array<{ href: string; label: string; variant: 'solid' | 'outline' }>;
  // Or, if you prefer to import CTA type from SectionBlock:
  // import type { CTA } from './components/home/SectionBlock';
  // ctas: CTA[];
  image: string;
  align: Align;
  bgClass: string;
  overlaySvg?: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: 'aaf',
    title: 'AllAboutFood - Voice-Controlled Culinary AI Assistant',
    description: (
      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-700">Senior Capstone • Full-Stack Application • AI/Frontend Lead</p>
        <p>
          <span className="font-semibold text-orange-600">Recipe management web app with hands-free voice guidance</span>.
          Upload recipes (PDFs, photos, handwritten notes, old cookbooks) via OCR.
          <span className="font-semibold"> Dirty hands? Alexa reads</span> instructions step-by-step while you cook.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">GPT-4 Vision</span>
          <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">Voice UI</span>
          <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">OCR</span>
          <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">Next.js</span>
        </div>
      </div>
    ),
    ctas: [
      { href: 'https://allaboutfood.cafe', label: '🌐 Live Platform', variant: 'solid' },
      { href: 'https://github.com/renatodap/allaboutfood', label: 'View Code', variant: 'outline' },
    ],
    image: 'phone-mockup', // Special case for custom component
    align: 'left',
    bgClass: 'bg-white border-b border-neutral-100',
  },
  {
    id: 'liteclient',
    title: 'Accumulate Lite Client',
    description: (
      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-700">Blockchain Engineering • Development in Golang</p>
        <p>
          <span className="font-semibold text-orange-600">Run all functionalities of Accumulate Node with low computing power and memory</span>.
          Generates lightweight cryptographic proofs so you can <span className="font-semibold">pull data from blockchain and
          fully trust it</span> without accessing the entire chain.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Go</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Merkle Proofs</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Cryptography</span>
        </div>
      </div>
    ),
    ctas: [],
    image: 'youtube-embed', // Special case for YouTube video
    align: 'right',
    bgClass: 'bg-neutral-25 border-b border-neutral-100',
  },
  {
    id: 'fitness',
    title: 'AI Personal Fitness Platform',
    description: (
      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-700">RAG System • Adaptive AI Coach & Nutritionist</p>
        <p>
          <span className="font-semibold text-orange-600">AI that learns from every workout and meal</span>.
          Text "ran 5mi, benched 225x8" or snap photo of your plate—AI logs it, remembers everything,
          <span className="font-semibold"> adapts your plan weekly</span> based on actual performance.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">RAG</span>
          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">GPT-4 Vision</span>
          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">Vector DB</span>
          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">React Native</span>
        </div>
      </div>
    ),
    ctas: [
      { href: 'https://github.com/renatodap/fitness-backend', label: 'View Project', variant: 'solid' },
      { href: 'https://sharpened.me', label: 'Live Demo', variant: 'outline' },
    ],
    image: 'fitness-demo', // Special case for fitness demo
    align: 'left',
    bgClass: 'bg-white border-b border-neutral-100',
  },
  {
    id: 'recycling',
    title: 'Terre Haute AI Recycling Assistant',
    description: (
      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-700">Civic Tech • Computer Vision • Web Application</p>
        <p>
          <span className="font-semibold text-orange-600">Take photo or upload image of waste item</span>—OpenAI API
          identifies it, app shows <span className="font-semibold">Terre Haute-specific disposal instructions</span>,
          local drop-off locations, and pickup schedules.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full text-xs">Google Vision API</span>
          <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full text-xs">Next.js</span>
          <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full text-xs">OpenAI</span>
        </div>
      </div>
    ),
    ctas: [
      { href: 'https://github.com/renatodap/recycle_terrehaute', label: 'View Code', variant: 'solid' },
      { href: 'https://recycle-terrehaute.vercel.app', label: 'Try App', variant: 'outline' },
    ],
    image: 'recycling-demo', // Special case for recycling demo
    align: 'right',
    bgClass: 'bg-neutral-25 border-b border-neutral-100',
  },
  {
    id: 'ai',
    title: 'Deep Learning & AI Research',
    description: (
      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-700">Rose-Hulman CS • GPA: 3.58 • May 2026</p>
        <p>
          <span className="font-semibold text-orange-600">Building neural networks from scratch</span>.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">PyTorch</span>
          <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">Audio ML</span>
          <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">Fine-tuning</span>
          <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">Transformers</span>
        </div>
      </div>
    ),
    ctas: [],
    image: '/ai-neural-network.png',
    align: 'center',
    bgClass: 'bg-white',
  },
  {
    id: 'tennis',
    title: 'Rose Hulman Tennis Captain',
    description: (
      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-700">NCAA D-III • Team Captain</p>
        <p>
          <span className="font-semibold text-orange-600">Come watch me compete!</span> Leading Rose-Hulman tennis
          in our biggest match of the fall.
        </p>
        <div className="mt-2 p-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-l-4 border-amber-500">
          <p className="text-xs font-bold text-amber-900">🏆 HOMECOMING MATCH • HCAC RING CEREMONY</p>
          <p className="text-xs text-amber-800 font-semibold">Saturday Oct 4, 12PM vs Greenville</p>
          <p className="text-xs text-amber-700">Joy Hulbert Tennis Center • Free admission • Great atmosphere!</p>
        </div>
      </div>
    ),
    ctas: [
      { href: 'https://athletics.rose-hulman.edu/sports/mens-tennis/schedule/2025-26', label: '📅 View Schedule', variant: 'solid' },
    ],
    image: '/tennis.JPG',
    align: 'left',
    bgClass: 'bg-neutral-25 border-b border-neutral-100',
  },
  {
    id: 'music',
    title: 'Live Music & Open Mic',
    description: (
      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-700">Multi-Instrumentalist • Performer</p>
        <p>
          <span className="font-semibold text-orange-600">Come hear me perform!</span> Guitar and vocals with Zach on saxophone.
        </p>
        <div className="mt-2 p-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-l-4 border-indigo-500">
          <p className="text-xs font-bold text-indigo-900">🎸 LIVE PERFORMANCE</p>
          <p className="text-xs text-indigo-800 font-semibold">Thursday Oct 2, 9:30PM</p>
          <p className="text-xs text-indigo-700">Charlie's Pub & Grub • 1608 Crawford St, Terre Haute</p>
        </div>
      </div>
    ),
    ctas: [
      { href: 'https://www.youtube.com/watch?v=e_Jq2R_8gOo', label: 'Watch Performance', variant: 'solid' }
    ],
    image: '/529000554_1864791257727687_1599264817390084786_n.jpg',
    align: 'right',
    bgClass: 'bg-white',
  },
];

export default function HomePage() {
  return (
    <main className="relative w-full bg-white text-black overflow-x-hidden">

      {/* ===== HERO VIDEO SECTION ===== */}
      <Hero />

      {/* ===== FEATURED SECTIONS ===== */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <CinematicSection className="text-center mb-16">
            <ParallaxText>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
                Recent
                <br />
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">
                  Work
                </span>
              </h2>
            </ParallaxText>
          </CinematicSection>

          <div className="space-y-28">
            {SECTIONS.map((section, index) => (
              <CinematicSection key={section.id} delay={index * 0.2}>
                <motion.div
                  className={`flex flex-col lg:flex-row items-center gap-14 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <div className="w-full lg:w-1/2">
                    <FloatingCard index={index}>
                      {section.image === 'phone-mockup' ? (
                        // Phone mockup for AllAboutFood
                        <div className="relative flex justify-center items-center py-8">
                          <div className="relative w-[220px] h-[450px] bg-black rounded-[40px] p-2 shadow-2xl">
                            <div className="w-full h-full bg-white rounded-[32px] overflow-hidden">
                              <div className="h-14 bg-gradient-to-r from-orange-500 to-orange-600 flex items-center px-4">
                                <span className="text-white font-bold text-lg">AllAboutFood</span>
                              </div>
                              <div className="p-4 space-y-4">
                                <div className="bg-orange-50 rounded-2xl p-3">
                                  <p className="text-xs text-orange-800 font-medium mb-1">🎤 Voice Command</p>
                                  <p className="text-sm">"Hey Alexa, start cooking lasagna"</p>
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-3">
                                  <p className="text-xs text-gray-600 font-medium mb-1">📋 Recipe Loaded</p>
                                  <p className="text-sm">Classic Lasagna - 45 mins</p>
                                </div>
                                <div className="bg-blue-50 rounded-2xl p-3">
                                  <p className="text-xs text-blue-800 font-medium mb-1">👨‍🍳 Current Step</p>
                                  <p className="text-sm">Layer noodles, then meat sauce...</p>
                                </div>
                                <div className="flex gap-2 mt-4">
                                  <div className="flex-1 bg-yellow-100 rounded-xl p-2 text-center">
                                    <span className="text-xs">← Previous</span>
                                  </div>
                                  <div className="flex-1 bg-green-100 rounded-xl p-2 text-center">
                                    <span className="text-xs">Next →</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : section.image === 'youtube-embed' ? (
                        // YouTube embed for Accumulate/KYA
                        <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
                          <iframe
                            src="https://www.youtube.com/embed/mcVZXHcuO70"
                            title="KYA Framework Demo"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : section.image === 'fitness-demo' ? (
                        // AI Fitness Platform - Mobile mockup matching actual app UI
                        <div className="relative flex justify-center items-center py-8">
                          <div className="relative w-[220px] h-[450px] bg-black rounded-[40px] p-2 shadow-2xl">
                            <div className="w-full h-full bg-[#0A0A0B] rounded-[32px] overflow-hidden">
                              {/* App Header */}
                              <div className="border-b border-[#4A4A4A] px-4 py-3">
                                <h1 className="text-[#FF4500] text-xl font-black tracking-widest" style={{fontFamily: 'system-ui, sans-serif'}}>QUICK ENTRY</h1>
                                <p className="text-[#4A4A4A] text-[10px] mt-1">Natural language fitness tracking</p>
                              </div>

                              {/* Input Area */}
                              <div className="p-4">
                                <div className="bg-black border border-[#4A4A4A] rounded-lg p-3">
                                  <p className="text-white text-xs font-medium">"ran 5 miles, then gym - squats 315x5, bench 225x8, feeling strong 💪"</p>
                                  <div className="flex items-center mt-2">
                                    <div className="flex space-x-1">
                                      <div className="w-1.5 h-1.5 bg-[#FF4500] rounded-full animate-pulse"></div>
                                      <div className="w-1.5 h-1.5 bg-[#FF4500] rounded-full animate-pulse delay-75"></div>
                                      <div className="w-1.5 h-1.5 bg-[#FF4500] rounded-full animate-pulse delay-150"></div>
                                    </div>
                                    <span className="text-[#FF4500] text-[9px] ml-2 font-bold">ANALYZING...</span>
                                  </div>
                                </div>
                              </div>

                              {/* AI Analysis Results */}
                              <div className="px-4 space-y-3">
                                {/* Detected Activities */}
                                <div className="border border-[#4A4A4A] rounded">
                                  <div className="bg-black px-3 py-2 border-b border-[#4A4A4A]">
                                    <span className="text-[#FF4500] text-[10px] font-bold tracking-wide">DETECTED: 2 ACTIVITIES</span>
                                  </div>
                                  <div className="p-3 space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-white text-xs">🏃 Running</span>
                                      <span className="text-[#4A4A4A] text-[10px]">5 mi • 42 min</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-white text-xs">💪 Strength Training</span>
                                      <span className="text-[#4A4A4A] text-[10px]">2 exercises</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="bg-black border border-[#4A4A4A] rounded p-2 text-center">
                                    <p className="text-[#FF4500] text-sm font-bold">485</p>
                                    <p className="text-[#4A4A4A] text-[8px]">CALORIES</p>
                                  </div>
                                  <div className="bg-black border border-[#4A4A4A] rounded p-2 text-center">
                                    <p className="text-[#FF4500] text-sm font-bold">8,420</p>
                                    <p className="text-[#4A4A4A] text-[8px]">LBS VOLUME</p>
                                  </div>
                                  <div className="bg-black border border-[#4A4A4A] rounded p-2 text-center">
                                    <p className="text-[#FF4500] text-sm font-bold">103</p>
                                    <p className="text-[#4A4A4A] text-[8px]">SCORE</p>
                                  </div>
                                </div>

                                {/* AI Coach Response */}
                                <div className="bg-black border border-[#FF4500]/30 rounded p-3">
                                  <div className="flex items-center mb-2">
                                    <span className="text-[#FF4500] text-[10px] font-bold tracking-wide">AI COACH</span>
                                    <span className="text-[#4A4A4A] text-[8px] ml-auto">Gemini 2.0</span>
                                  </div>
                                  <p className="text-white text-[10px] leading-relaxed">
                                    Excellent combo! Your squat strength is up 10% this month.
                                    Recovery tip: 48hr before next leg session. Your running pace improved to 8:24/mi.
                                  </p>
                                  <div className="flex gap-2 mt-2">
                                    <span className="text-[8px] text-[#4A4A4A]">Based on 127 workouts</span>
                                  </div>
                                </div>
                              </div>

                              {/* Bottom Nav Preview */}
                              <div className="absolute bottom-0 left-0 right-0 border-t border-[#4A4A4A] bg-[#0A0A0B] px-4 py-2">
                                <div className="flex justify-around">
                                  <span className="text-[#FF4500] text-[9px]">●</span>
                                  <span className="text-[#4A4A4A] text-[9px]">○</span>
                                  <span className="text-[#4A4A4A] text-[9px]">○</span>
                                  <span className="text-[#4A4A4A] text-[9px]">○</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : section.image === 'recycling-demo' ? (
                        // Recycling App - Mobile mockup with computer vision
                        <div className="relative flex justify-center items-center py-8">
                          <div className="relative w-[220px] h-[450px] bg-black rounded-[40px] p-2 shadow-2xl">
                            <div className="w-full h-full bg-white rounded-[32px] overflow-hidden">
                              {/* App Header */}
                              <header className="bg-white border-b-2 border-gray-300 p-3 flex-shrink-0">
                                <h1 className="text-base font-bold flex items-center gap-2 text-black">
                                  <span className="text-green-600">♻️</span>
                                  Recycle Terre Haute
                                </h1>
                              </header>

                              {/* Main Content */}
                              <div className="p-3 h-full bg-gray-50">
                                {/* Image Preview */}
                                <div className="bg-white rounded-lg p-2 mb-3 border-2 border-gray-300">
                                  <div className="relative h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="text-4xl">🥤</div>
                                    </div>
                                    {/* AI Detection Overlay */}
                                    <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-[9px] font-bold">
                                      AI: 94% Match
                                    </div>
                                  </div>
                                </div>

                                {/* Processing Animation */}
                                <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-2 mb-3">
                                  <div className="flex items-center space-x-2">
                                    <div className="flex space-x-0.5">
                                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
                                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse delay-75"></div>
                                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse delay-150"></div>
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-bold text-blue-800">TensorFlow Analysis</p>
                                      <p className="text-[9px] text-gray-700">MobileNet • 30 categories</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Results */}
                                <div className="space-y-2">
                                  {/* Item Identification */}
                                  <div className="bg-white rounded-lg p-2 border border-gray-200">
                                    <p className="text-[10px] font-bold text-gray-600 mb-1">IDENTIFIED ITEM</p>
                                    <p className="text-xs font-bold text-black">Plastic Bottle - PET #1</p>
                                    <p className="text-[9px] text-gray-600 mt-1">Coca-Cola bottle, 20 oz</p>
                                  </div>

                                  {/* Disposal Instructions */}
                                  <div className="bg-green-50 border-2 border-green-600 rounded-lg p-2">
                                    <div className="flex items-center gap-1 mb-1">
                                      <span className="text-green-600 text-xs">✓</span>
                                      <p className="text-[10px] font-bold text-green-800">RECYCLABLE</p>
                                    </div>
                                    <ul className="space-y-1">
                                      <li className="text-[9px] text-gray-700">• Empty and rinse bottle</li>
                                      <li className="text-[9px] text-gray-700">• Keep cap on</li>
                                      <li className="text-[9px] text-gray-700">• Blue bin curbside pickup</li>
                                    </ul>
                                  </div>

                                  {/* Location Info */}
                                  <div className="bg-gray-100 rounded-lg p-2">
                                    <p className="text-[9px] text-gray-600">📍 Nearest drop-off: 0.8 mi</p>
                                    <p className="text-[9px] font-bold text-gray-800">Wabash Valley Recycling</p>
                                  </div>
                                </div>

                                {/* Stats Badge */}
                                <div className="absolute bottom-20 left-3 right-3">
                                  <div className="bg-white rounded-lg p-2 border border-gray-200 flex justify-between items-center">
                                    <span className="text-[9px] text-gray-600">Accuracy: 85-90%</span>
                                    <span className="text-[9px] text-green-600 font-bold">PWA • Offline Ready</span>
                                  </div>
                                </div>

                                {/* New Scan Button */}
                                <div className="absolute bottom-4 left-3 right-3">
                                  <button className="w-full bg-green-600 text-white py-2 rounded-lg text-xs font-bold">
                                    📷 Scan New Item
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : section.image && !['phone-mockup', 'youtube-embed', 'fitness-demo', 'recycling-demo'].includes(section.image) ? (
                        // Regular image display
                        <div className="relative aspect-video bg-gradient-to-br from-orange-50 to-neutral-50 rounded-3xl overflow-hidden border border-orange-100 shadow-2xl group">
                          <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={`${section.id === 'tennis' ? 'object-cover object-[center_20%]' : 'object-cover'} group-hover:scale-105 transition-transform duration-700`}
                            priority={index < 2}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                          <div className="absolute top-6 left-6 right-6">
                            <div className="flex items-center justify-between">
                              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                                Featured
                              </span>
                              <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                                2025-2026
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Fallback for no image
                        <div className="relative aspect-video bg-gradient-to-br from-orange-50 to-neutral-50 rounded-3xl overflow-hidden border border-orange-100 shadow-2xl group">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-orange-300 text-8xl opacity-30 group-hover:opacity-50 transition-opacity duration-500">🚀</div>
                          </div>
                        </div>
                      )}
                    </FloatingCard>
                  </div>
                  
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-neutral-900">{section.title}</h3>
                      <div className="text-neutral-600 leading-relaxed text-lg">{section.description}</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {section.ctas.map((cta, ctaIndex) => (
                        <a
                          key={ctaIndex}
                          href={cta.href}
                          className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                            cta.variant === 'solid'
                              ? 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg'
                              : 'border-2 border-orange-300 text-orange-700 hover:border-orange-600 hover:text-orange-800'
                          }`}
                        >
                          {cta.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </CinematicSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINALE: THE INVITATION ===== */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-25 to-orange-50 text-center">
        <div className="max-w-3xl mx-auto">
          <CinematicSection>
            <ParallaxText>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
                Let's
                <br />
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">
                  Connect
                </span>
              </h2>
            </ParallaxText>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Interested in collaborating, discussing ideas, or just saying hello? I'd love to hear from you.
            </p>
            
            <div className="flex flex-row justify-center items-center gap-5 mb-8">
              <motion.a 
                href="https://linkedin.com/in/renatodap" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 text-neutral-600 group-hover:text-orange-600 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.869 0-2.156 1.459-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.041 0 3.602 2.002 3.602 4.604v5.592z" /></svg>
              </motion.a>
              <motion.a 
                href="https://open.spotify.com/artist/3VZ8V9XhQ9oZb5XnZ9g8yB" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Spotify" 
                className="group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 text-neutral-600 group-hover:text-orange-600 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0zm5.363 17.463c-.221.364-.691.482-1.055.262-2.891-1.764-6.543-2.16-10.824-1.18-.418.096-.844-.162-.94-.576-.096-.418.162-.844.576-.94 4.663-1.08 8.727-.641 11.947 1.262.364.22.482.69.262 1.055zm1.504-2.67c-.276.447-.854.59-1.301.314-3.309-2.04-8.362-2.635-12.284-1.44-.51.158-1.055-.117-1.213-.627-.158-.51.117-1.055.627-1.213 4.406-1.361 9.927-.709 13.722 1.578.447.276.59.854.314 1.301zm.146-2.835C15.06 9.684 8.924 9.5 5.934 10.384c-.623.182-1.283-.159-1.464-.783-.181-.624.159-1.283.783-1.464 3.417-.99 10.184-.785 14.047 2.016.527.389.642 1.135.254 1.662-.389.527-1.135.643-1.662.254z" /></svg>
              </motion.a>
              <motion.a 
                href="https://www.youtube.com/@RenatoDAP" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube" 
                className="group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 text-neutral-600 group-hover:text-orange-600 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.117C19.257 3.5 12 3.5 12 3.5s-7.257 0-9.386.569A2.994 2.994 0 0 0 .502 6.186C0 8.313 0 12 0 12s0 3.687.502 5.814a2.994 2.994 0 0 0 2.112 2.117C4.743 20.5 12 20.5 12 20.5s7.257 0 9.386-.569a2.994 2.994 0 0 0 2.112-2.117C24 15.687 24 12 24 12s0-3.687-.502-5.814zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" /></svg>
              </motion.a>
            </div>
            
            <div className="flex justify-center">
              <motion.a 
                href="mailto:renatodaprado@gmail.com" 
                className="inline-flex items-center justify-center px-8 py-4 border border-orange-300 text-sm font-semibold rounded-xl text-neutral-900 bg-white hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2"></span>
                Get in Touch
              </motion.a>
            </div>
          </CinematicSection>
        </div>
      </section>


    </main>
  );
}
