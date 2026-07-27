/**
 * The site's content. Plain .mjs so the seed script (plain node), the test suite
 * and the app can all read the same file and never disagree about what ships.
 *
 * THIS IS CONTENT, AND CONTENT LIVES IN POSTGRES. The seed writes this file into
 * the database and the app reads the database. What is here is the seed source
 * and the fallback the app renders if Postgres is unreachable, so a dead database
 * degrades to the correct page instead of an error screen.
 *
 * What is NOT here: where anything sits on the field, how large it is, and where
 * the camera parks. That is design, it lives in src/lib/layout.ts, and it is
 * deliberately not editable. A drawing named here that has no entry in the layout
 * simply never appears on the field, which is exactly how the childhood drawings
 * stay hidden until you go in.
 */

/** The literal facts, plus where to find him. */
export const SETTINGS = {
  subjectName: "Renato Prado",

  // "Lead" removed 2026-07-26 at Renato's instruction.
  subjectRole: "Software engineer",
  subjectLocation: "Indianapolis",

  email: "renatodaprado@gmail.com",
  githubUrl: "https://github.com/renatodap",
  linkedinUrl: "https://www.linkedin.com/in/renato-prado-82513b297",
  youtubeUrl: "https://www.youtube.com/@RenatoDAP",

  /* EMPTY ON PURPOSE, needs Renato. The value here was an artist URL that
     returns 404; it had been carried forward unverified since the first seed.
     Empty links do not render, so nothing breaks until a real URL replaces it. */
  spotifyUrl: "",
};

/**
 * Five aspects. Every one of the twenty-three drawings belongs to exactly one,
 * and exactly one drawing per aspect is the hero: the only interactive drawing,
 * the one that grows when you go in, and the one that morphs into its neighbour
 * when you move sideways.
 *
 * Order matters twice: it is the order the field develops in on load, and the
 * first mark listed is the one the panel shows first.
 */
export const ASPECTS = [
  {
    id: "brazil",
    title: "Brazil",
    lines: ["I grew up in Brazil and moved to Indiana for school."],
    marks: [
      { drawing: "falls", alt: "Standing in front of a waterfall in Brazil.", hero: true },
      // No position in the layout, so never on the field. The boy is what you get
      // for going in, which is also why the montage is all recent: the childhood
      // drawings are the payoff, not the premise.
      { drawing: "brazil", alt: "As a boy, holding a Brazilian flag." },
      { drawing: "peter-pan", alt: "As a boy, in costume, holding a wooden sword." },
    ],
  },
  {
    id: "music",
    title: "Music",
    lines: [
      "I taught myself music.",
      "Seven instruments, in the order I got curious about them.",
    ],
    marks: [
      { drawing: "guitar", alt: "Playing an acoustic guitar into a microphone.", hero: true },
      { drawing: "keys", alt: "Playing a keyboard." },
      { drawing: "bass", alt: "Playing a bass guitar." },
      { drawing: "drums", alt: "Playing a drum kit." },
      { drawing: "webcam-guitar", alt: "Playing a classical guitar." },
      { drawing: "broken-sticks", alt: "Laughing, holding a fistful of broken drumsticks." },
      { drawing: "first-guitar", alt: "As a boy, holding an electric guitar." },
    ],
  },
  {
    id: "camera",
    title: "Camera",
    lines: ["I shoot and edit my own video."],
    marks: [
      { drawing: "camera", alt: "Shooting with a camera.", hero: true },
      { drawing: "filmset", alt: "Behind a camera on a tripod, beside a light." },
      { drawing: "first-camera", alt: "As a boy, holding a camcorder to his eye." },
    ],
  },
  {
    id: "sport",
    title: "Sport",
    lines: [
      "Four years of college tennis. The last one as captain.",
      "7:32 per mile, for 13.1 of them.",
    ],
    marks: [
      // The forehand, not the serve, at Renato's instruction 2026-07-26.
      { drawing: "tennis", alt: "Mid forehand on a tennis court.", hero: true },
      { drawing: "serve", alt: "Mid serve, racket overhead." },
      { drawing: "running", alt: "Running." },
      { drawing: "finish", alt: "After a race, wearing a finisher medal." },
      { drawing: "medal", alt: "Biting a finisher medal." },
      { drawing: "deadlift", alt: "Standing with a weight." },
      { drawing: "broken-racket", alt: "Laughing, holding up a tennis racket snapped in two." },
      { drawing: "first-racket", alt: "As a boy, holding a tennis racket on a court." },
    ],
  },
  {
    id: "software",
    title: "Software",
    lines: [
      "I learned it the same way I learned the guitar.",
      "Computer science, Rose-Hulman, 2026.",
    ],
    marks: [
      { drawing: "working", alt: "Working at a laptop.", hero: true },
      { drawing: "graduation", alt: "In a cap and gown." },
    ],
  },
];
