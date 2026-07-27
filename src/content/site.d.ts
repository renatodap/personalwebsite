/**
 * Types for site.mjs, which is plain ESM so the seed script (bare node), the
 * vitest suite and the app can all read one file. Hand written because the
 * source deliberately has no build step.
 */

export declare const SETTINGS: {
  subjectName: string;
  subjectRole: string;
  subjectLocation: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  spotifyUrl: string;
};

export declare const ASPECTS: Array<{
  id: string;
  title: string;
  lines: string[];
  marks: Array<{ drawing: string; alt: string; hero?: boolean }>;
}>;
