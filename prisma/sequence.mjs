/**
 * The sequence. This file is the single source of truth for it: the seed writes
 * it to the database and the tests assert against it, so the two can never
 * disagree about what ships.
 *
 * ORDER IS THE ARGUMENT. Reading it top to bottom:
 *
 *   1   the guitar, silent          not the laptop. the header already says
 *                                   engineer, so the first IMAGE gets to break
 *                                   the category expectation instead of
 *                                   confirming it. this is the page's only real
 *                                   reversal, and it is true.
 *   2   four instruments in a row   the row is what "seven" looks like. the
 *                                   caption states the method; the run supplies
 *                                   the evidence.
 *   3   the laptop, silent          carried the anonymous client story until
 *                                   2026-07-26, when Renato cut it. the site now
 *                                   makes no claim about his work beyond the
 *                                   role line in the header, which is his call.
 *   4-5 sport, then endurance       present tense, no scoreboard.
 *   6   the wear pair, silent       THE PEAK. broken equipment says he goes hard
 *                                   enough to break things; laughing says he
 *                                   does not take it seriously. a caption would
 *                                   state the contradiction the images already
 *                                   are.
 *   7   camera and film, silent     read "I like the part that doesn't work yet"
 *                                   until Renato asked what it was supposed to
 *                                   mean, which is the only review that matters.
 *                                   it was a compression of his own "the messy
 *                                   middle", and it compressed past legibility.
 *   8   graduation                  the ME to CS switch, in plain first person.
 *   9   the falls                   adult, Brazil.
 *   10  the boy with the flag       Brazil to Indiana, told with zero words.
 *                                   the first childhood plate, uncaptioned.
 *   11  three childhood plates      establishes "the boy follows the man" three
 *                                   times, in the order the adult versions
 *                                   appeared. still uncaptioned.
 *   12  peter pan                   breaks it. the only childhood drawing with
 *                                   no adult counterpart. nothing follows.
 *
 * Most frames carry no words. That is the intended ratio, not an unfinished
 * state: a sentence has to earn its place against the alternative of a drawing.
 *
 * There is no size or zoom field here. Figure size is normalised in the ASSET
 * instead, by scripts/tighten_viewbox.mjs trimming each viewBox to its own
 * artwork, so the renderer only needs `mask-size: contain` and no drawing is
 * ever cropped.
 *
 * `alt` says "as a boy" on the childhood plates even though nothing visible on
 * the page marks them as childhood. The visual rule is about visible marks; a
 * screen-reader user has to be able to reach the same conclusion, and the whole
 * argument of the last three frames is invisible without it.
 */

export const SEQUENCE = [
  {
    kind: "PLATE",
    caption: "",
    plates: [
      { drawing: "guitar", alt: "Playing an acoustic guitar into a microphone." },
    ],
  },
  {
    kind: "RUN",
    caption: "I taught myself seven instruments the same way I learn everything else. By starting.",
    plates: [
      { drawing: "keys", alt: "Playing a keyboard." },
      { drawing: "bass", alt: "Playing a bass guitar." },
      { drawing: "drums", alt: "Playing a drum kit." },
      { drawing: "webcam-guitar", alt: "Playing a classical guitar." },
    ],
  },
  {
    kind: "PLATE",
    caption: "",
    plates: [{ drawing: "working", alt: "Working at a laptop." }],
  },
  {
    kind: "RUN",
    caption: "Four years of college tennis. The last one as captain.",
    plates: [
      { drawing: "serve", alt: "Mid serve, racket overhead." },
      { drawing: "tennis", alt: "Mid forehand on a tennis court." },
    ],
  },
  {
    kind: "RUN",
    caption: "7:32 per mile, for 13.1 of them.",
    plates: [
      { drawing: "running", alt: "Running." },
      { drawing: "finish", alt: "After a race, wearing a finisher medal." },
      { drawing: "medal", alt: "Biting a finisher medal." },
      { drawing: "deadlift", alt: "Standing with a weight." },
    ],
  },
  {
    kind: "PAIR",
    caption: "",
    plates: [
      { drawing: "broken-racket", alt: "Laughing, holding up a tennis racket snapped in two." },
      { drawing: "broken-sticks", alt: "Laughing, holding a fistful of broken drumsticks." },
    ],
  },
  {
    kind: "RUN",
    caption: "",
    plates: [
      { drawing: "camera", alt: "Shooting with a camera." },
      { drawing: "filmset", alt: "Behind a camera on a tripod, beside a light." },
    ],
  },
  {
    kind: "PLATE",
    caption:
      "I started in mechanical engineering and switched to computer science a year in. Late enough that it hurt.",
    plates: [{ drawing: "graduation", alt: "In a cap and gown." }],
  },
  {
    kind: "PLATE",
    caption: "",
    plates: [{ drawing: "falls", alt: "Standing in front of a waterfall in Brazil." }],
  },
  {
    kind: "PLATE",
    caption: "",
    plates: [{ drawing: "brazil", alt: "As a boy, holding a Brazilian flag." }],
  },
  {
    kind: "RUN",
    caption: "",
    plates: [
      { drawing: "first-guitar", alt: "As a boy, holding an electric guitar." },
      { drawing: "first-racket", alt: "As a boy, holding a tennis racket on a court." },
      { drawing: "first-camera", alt: "As a boy, holding a camcorder to his eye." },
    ],
  },
  {
    kind: "PLATE",
    caption: "",
    plates: [
      { drawing: "peter-pan", alt: "As a boy, in costume, holding a wooden sword." },
    ],
  },
];

/** The literal facts, plus where to find him. */
export const SETTINGS = {
  subjectName: "Renato Prado",
  subjectRole: "Lead software engineer",
  subjectLocation: "Indianapolis",
  email: "renatodaprado@gmail.com",
  githubUrl: "https://github.com/renatodap",
  linkedinUrl: "https://www.linkedin.com/in/renato-prado-82513b297",
  youtubeUrl: "https://www.youtube.com/@RenatoDAP",
  spotifyUrl: "https://open.spotify.com/artist/3VZ8V9XhQ9oZb5XnZ9g8yB",
};
