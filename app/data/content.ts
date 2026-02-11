// ============================================================
// SITE CONTENT - Single source of truth
// ============================================================

export const SITE = {
  name: 'Renato Prado',
  email: 'renatodaprado@gmail.com',
  school: 'Rose-Hulman Institute of Technology',
  graduation: 'May 2026',
} as const;

export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/in/renato-prado-82513b297',
  github: 'https://github.com/renatodap',
  youtube: 'https://www.youtube.com/@RenatoDAP',
  spotify: 'https://open.spotify.com/artist/3VZ8V9XhQ9oZb5XnZ9g8yB',
} as const;

export const HERO = {
  name: 'Renato Prado',
  schoolLine: 'CS \u00b7 Rose-Hulman \u00b7 2026',
  videos: {
    desktop: '/hero-video2.mp4',
    mobile: '/hero-video-square2.mp4',
  },
} as const;

// ============================================================
// INTRO
// ============================================================

export const INTRO = {
  text: "I\u2019m from Brazil, studying CS in Indiana. I co-built an AI platform with my dad, captain a D3 tennis team, and have songs on Spotify. I taught myself seven instruments the same way I learn everything else: by starting.",
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
  highlights?: string[];
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
    period: '2025 \u2013 Present',
    description: 'An AI platform that runs strategic analysis for Brazilian companies. It puts a business through SWOT, Porter\u2019s Five Forces, and nine other frameworks using multiple AI models. When one model goes down, the system routes to another. We\u2019re piloting with ASSESPRO-SP, a tech association with 104 member companies.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    image: '/imensiah.png',
    link: { label: 'Visit', href: 'https://imensiah.com.br' },
  },
  {
    id: 'aaf',
    title: 'AllAboutFood',
    role: 'AI/Frontend Lead',
    period: '2025 \u2013 Present',
    description: 'Senior capstone with a team of four. A cooking app that reads handwritten recipe cards through your phone camera using Gemini Vision, then walks you through each step hands-free via Siri. Our cloud bill started at $1,000/month. We got it to $30.',
    tech: ['Flutter', 'Go', 'Gemini API', 'Swift'],
    image: '/allaboutfood-app.png',
    link: { label: 'Try it', href: 'https://allaboutfood.cafe' },
  },
  {
    id: 'accumulate',
    title: 'Accumulate Lite Client',
    role: 'Software Intern',
    period: 'Summer 2025',
    description: 'Summer internship project. A web client that verifies blockchain accounts using lightweight cryptographic proofs instead of running a full node. Three-tier Merkle proof verification, real-time queries against Accumulate mainnet, 2KB proof size.',
    tech: ['Go', 'Next.js', 'Cryptography'],
    videoId: 'mcVZXHcuO70',
    link: { label: 'Demo', href: 'https://youtube.com/watch?v=mcVZXHcuO70' },
  },
  {
    id: 'llm-research',
    title: 'LLM Error Classification',
    role: 'Deep Learning Research',
    period: 'Nov 2025',
    description: 'Research project. I fine-tuned Llama 3.2 to classify when language models get things wrong. Started at 14% accuracy. Ended at 98%. Cut GPU memory usage in half along the way.',
    tech: ['PyTorch', 'Llama 3.2', 'Fine-tuning'],
    image: '/llm-research.png',
  },
];

export const GITHUB_LINK = {
  text: '60+ repos on GitHub. These are the ones that matter most.',
  href: 'https://github.com/renatodap',
} as const;

// ============================================================
// PERSONAL
// ============================================================

export const ATHLETICS = {
  text: "I captain Rose-Hulman\u2019s tennis team. All-Conference honorable mention. I also ran the 2025 Indianapolis Half Marathon at 7:32/mi.",
  image: '/tennis.JPG',
  scheduleUrl: 'https://athletics.rose-hulman.edu/sports/mens-tennis/schedule/2025-26',
} as const;

export const MUSIC = {
  text: "I taught myself guitar, piano, bass, drums, and a few others. I have songs on Spotify. Music and code work the same way for me: start with something rough, find the pattern, clean it up until it clicks.",
  image: '/529000554_1864791257727687_1599264817390084786_n.jpg',
  mosaic: ['/guitar.jpg', '/piano.jpg', '/bass.jpg', '/drums.JPG', '/ukulele.jpg', '/live.jpg'],
  links: {
    youtube: 'https://www.youtube.com/watch?v=e_Jq2R_8gOo',
    spotify: 'https://open.spotify.com/artist/3VZ8V9XhQ9oZb5XnZ9g8yB',
  },
} as const;
