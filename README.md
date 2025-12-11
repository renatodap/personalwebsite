# Personal Website - Renato DAP

A modern Next.js portfolio landing page with cinematic animations.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion

## Structure

```
app/
├── page.tsx              # Landing page
├── layout.tsx            # Root layout
├── globals.css           # Global styles
└── components/
    ├── header.tsx        # Navigation
    ├── button.tsx        # Button component
    └── home/
        ├── HeroSection.tsx
        ├── SectionBlock.tsx
        └── footer.tsx
public/                   # Static assets (videos, images)
_archived/                # Archived code (not in use)
```

## Deploy

Deployed on Vercel. Push to main to deploy.
