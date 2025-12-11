// ============================================================
// SITE CONTENT - Single source of truth
// ============================================================

export const SITE = {
  name: 'Renato DAP',
  tagline: 'Engineer & Creator',
  email: 'renatodaprado@gmail.com',
  location: 'Terre Haute, IN',
  graduation: 'May 2026',
  school: 'Rose-Hulman Institute of Technology',
} as const;

export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/in/renato-prado-82513b297',
  github: 'https://github.com/renatodap',
  youtube: 'https://www.youtube.com/@RenatoDAP',
  spotify: 'https://open.spotify.com/artist/3VZ8V9XhQ9oZb5XnZ9g8yB',
} as const;

export const HERO = {
  headline: 'Engineer.',
  headlineAccent: 'Creator.',
  subtitle: 'Building systems that work—with code, with sound, with intention.',
  videos: {
    desktop: '/hero-video2.mp4',
    mobile: '/hero-video-square2.mp4',
  },
} as const;

// ============================================================
// AI PHILOSOPHY - Grounded perspective on AI engineering
// ============================================================

export const AI_STANCE = {
  headline: 'AI is a tool. The human is the system.',
  insight: 'The gap between "using AI" and "engineering with AI" is where real value lives.',
} as const;

// ============================================================
// PROJECTS
// ============================================================

export type Project = {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  tech: string[];
  image?: string;
  videoId?: string;
  link?: { label: string; href: string };
};

export const PROJECTS: Project[] = [
  {
    id: 'imensiah',
    title: 'IMENSIAH',
    role: 'Co-founder & Lead Engineer',
    period: '2025 – Present',
    description: 'AI strategic analysis. 11 frameworks, 48h delivery. Multi-model pipeline with circuit breakers—because AI fails, and systems need to handle that.',
    highlights: [
      '4-model AI pipeline via OpenRouter',
      'Circuit breaker pattern for graceful degradation',
      'Go/Gin backend with Domain-Driven Design',
    ],
    tech: ['Go', 'Next.js', 'PostgreSQL', 'Redis'],
    image: '/imensiah.png',
    link: { label: 'Visit', href: 'https://imensiah.com.br' },
  },
  {
    id: 'aaf',
    title: 'AllAboutFood',
    role: 'AI/Frontend Lead',
    period: '2025 – Present',
    description: 'Voice-controlled cooking assistant. OCR for recipes, Siri integration. Reduced cloud costs from $1,000 to $30/month by engineering smarter.',
    highlights: [
      'Siri integration via Swift App Intents',
      'Gemini API parsing with 95%+ accuracy',
      'OCR for PDFs, photos, handwritten notes',
    ],
    tech: ['Gemini API', 'Swift', 'Next.js'],
    image: '/allaboutfood-app.png',
    link: { label: 'Try it', href: 'https://allaboutfood.cafe' },
  },
  {
    id: 'accumulate',
    title: 'Accumulate Lite Client',
    role: 'Software Intern',
    period: 'Summer 2025',
    description: 'Lightweight blockchain verification. Full node functionality, minimal compute. 8,000+ lines of Go cryptography.',
    highlights: [
      'Three-tier Merkle proof verification',
      'KYA framework for AI agent identities',
    ],
    tech: ['Go', 'Cryptography', 'Merkle Proofs'],
    videoId: 'mcVZXHcuO70',
    link: { label: 'Demo', href: 'https://youtube.com/watch?v=mcVZXHcuO70' },
  },
  {
    id: 'llm-research',
    title: 'LLM Error Classification',
    role: 'Deep Learning Research',
    period: 'Nov 2025',
    description: 'Fine-tuned Llama 3.2 for error classification. Understanding when AI fails is more valuable than assuming it won\'t.',
    highlights: [
      'Accuracy: 14% → 98%',
      '50% VRAM reduction via optimization',
    ],
    tech: ['PyTorch', 'Llama 3.2', 'Fine-tuning'],
    image: '/llm-research.png',
    link: { label: 'Demo', href: 'https://moodmixer.vercel.app' },
  },
  {
    id: 'recycling',
    title: 'Terre Haute Recycling',
    role: 'Civic Tech',
    period: '2024',
    description: 'Photo → AI identification → local disposal instructions. City-specific recycling guidance.',
    highlights: [
      'Google Vision API identification',
      'Local drop-off locations integrated',
    ],
    tech: ['Google Vision', 'Next.js', 'OpenAI'],
    image: '/recycling-app.png',
    link: { label: 'Try it', href: 'https://recycle-terrehaute.vercel.app' },
  },
];

// ============================================================
// ATHLETICS
// ============================================================

export const TENNIS = {
  team: "Rose-Hulman Men's Tennis",
  role: 'Team Captain',
  achievement: 'All-Heartland Conference Honorable Mention',
  scheduleUrl: 'https://athletics.rose-hulman.edu/sports/mens-tennis/schedule/2025-26',
  image: '/tennis.JPG',
  nextMatch: {
    opponent: 'Case Western Reserve',
    date: 'Feb 6, 2026',
    location: 'Crawfordsville, IN',
  },
} as const;

export const RUNNING = {
  event: '2025 Indianapolis Monumental',
  distance: 'Half Marathon',
  pace: '7:32/mi',
  image: '/half-marathon.jpg',
} as const;

// ============================================================
// MUSIC
// ============================================================

export const MUSIC = {
  title: 'Live Music',
  description: 'Guitar, vocals, live performances. The creative side that complements the engineering.',
  image: '/529000554_1864791257727687_1599264817390084786_n.jpg',
  instruments: ['Guitar', 'Vocals', 'Bass', 'Piano'],
  links: {
    youtube: 'https://www.youtube.com/watch?v=e_Jq2R_8gOo',
    spotify: 'https://open.spotify.com/artist/3VZ8V9XhQ9oZb5XnZ9g8yB',
  },
} as const;
