# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

One primary visitor: **someone who has just encountered Renato and wants to find out who he is.** A recruiter following a link, a potential client referred by a past one, an engineer who met him once, a friend of a friend. They arrive with low commitment and no specific task.

They are not applying a rubric. They are deciding whether he is interesting.

**Explicitly not optimized for:** a hiring funnel, a lead-capture funnel, or a client sales pitch. The user rejected all three in favor of a calling card. This is a confirmed product decision, not an oversight — deep research (`docs/research/2026-07-25-personal-site-content-research.md`) recommended a recruiter-optimized architecture and was overruled on purpose.

## Product Purpose

A calling card. Its only job is that a visitor leaves with an accurate, specific, memorable impression of one person.

**Success:** a week later they can describe him to someone else without looking. **Failure:** they remember "a developer portfolio, dark, nicely animated" and nothing about the person.

There is no conversion event. Nothing is being sold.

## Positioning

He taught himself seven instruments and roughly as many technical disciplines by the same method — start before you're ready, stay in the part that doesn't work yet, keep going until it clicks — and he does it at a volume that is difficult to fake.

His own words, confirmed and binding as source material:

> "What he likes in both is the messy middle — a thing that doesn't work yet, and figuring out the next part."

> "I taught myself seven instruments the same way I learn everything else: by starting."

The claim a neighbouring site could not truthfully copy is **the volume plus the self-teaching, together.** Many engineers ship a lot. Many people play instruments. The specific thing is that both came from the same refusal to wait until he was qualified.

## Operating Context

- Lives in **Indianapolis, Indiana**. Brazilian, moved to the US for his degree.
- Works **remotely** for a US custom-software firm as Lead Software Engineer.
- Started at Rose-Hulman in Mechanical Engineering, switched to CS a year in — "late enough that it hurt, which is why he did it before it got later." CS, May 2026. Men's tennis captain, All-Conference honorable mention.
- Runs his own single-server fleet: ~13 applications he built, deployed, and keeps alive himself, including the databases and object storage under them.
- Builds personal software for his own life at production quality — fitness, finance, productivity, an always-on assistant daemon.

## Capabilities and Constraints

**Build constraints (confirmed):**
- Next.js on the existing self-hosted stack: Coolify on a Hetzner box, one shared Postgres instance, MinIO for object storage served over the site's own domain.
- The site is deployed at the **root domain**, so it has no `basePath` — unlike the path-mounted apps on the same server, it is exempt from that entire class of bug.
- Its deployment carries **hand-edited Traefik labels** implementing the `www` → bare-domain redirect for every other app on the server. Any redeploy or config change must preserve them.
- A `/admin` area, single admin user, editing **content only**. Layout and design are code and are not editable. This was chosen deliberately so the design cannot drift.
- Images and video upload to a MinIO bucket through the admin.

**Hard content constraints (confirmed, binding):**
- **No client names. No company names. No product or application names.** Not for employer clients, not for the sites built as favors, not for his own personal tools. Work is described by what it did, never by who it was for.
- **No hero video.** *(reversed 2026-07-26 — the original brief said "keep my hero video"; Renato dropped it.)* The first screen is the drawing alone. This also resolves a standing tension with the rule that photography never competes with the line work.
- **Do not tally output.** Counts of applications shipped, clients served, servers run, or repositories maintained are banned from the site, even though every one is true. They read as bragging.
- **Keep coursework quiet.** The capstone and the fine-tuning research may appear, but the site must never read as a student's. Nothing is framed as an assignment, a class, or a degree requirement.
- He is in **Indianapolis**; the employer relationship is **remote**. Do not place him at the employer's location.
- A previously co-founded AI venture is **cut entirely** — it must not appear anywhere, in any tense.

**Inferred, needs confirmation:**
- *(inferred)* English only. He is fluent in both, but a second locale doubles maintenance and goes stale.
- *(inferred)* Anonymity permits describing a client by sector and situation ("an audiovisual director in São Paulo") but never by name or by a linkable domain. **Confirm before shipping any case description.**
- *(inferred)* He can supply additional photography on request; quality and quantity unknown.

## Brand Commitments

- **Voice is his own, first person, concrete.** His existing copy is good and is the reference: short declaratives, real numbers, no adjectives doing the work of facts.
- **Banned register:** the LLM lexicon. No "passionate about," "cutting-edge," "seamless," "leverage," "delve/dive into," "in today's fast-paced world," "a testament to," "unlock the potential." Uniform sentence rhythm is itself a tell — vary it.
- **No invented anything.** No fabricated testimonials, metrics, logos, or imagery. Every number on the page traces to something real.
- Design brief from the user, binding: **far outside the box, unique to him, and simultaneously very simple and very clean — concept-led, not decoration-led.**

## Evidence on Hand

Real, verifiable, and usable — all of it must be presented without naming the party involved:

- **Volume of shipped client work:** ~12 web applications in a single quarter, with CI/CD on every repository. Among them: a retrieval-augmented knowledge bot running a local LLM with citation grounding; a legacy ERP integration using a dual-database adapter (reads the ERP, writes to its own store); a CRM with AES-256-GCM encryption of personal data and generated documents.
- **A favor that became someone's business.** A client asked for a portfolio site; what he actually needed was to stop running his company out of somebody else's spreadsheet. Delivered a public site plus production tracking, forecasting, and document generation in ~3 weeks and ~11 hours of active build. Adoption inside one week: 7 clients, 9 projects, 100+ deliveries tracked. Feedback-to-live turnaround under 24 hours, twice measured. The client's own verdict, in translation: *"practically perfect"* — he showed it to his father and began referring people unprompted. Full case study on file at `/Users/renatodaprado/dev/Persimmon/andre-faria-website/docs/case-study/` and four recorded client calls at `docs/context/meetings/`. **Name and domain must be stripped.**
- **Senior capstone:** built the voice-assistant integration from scratch — ~1,100 lines of Swift against Apple's AppIntents, with bidirectional state sharing into a Flutter app — and replaced a legacy OCR pipeline with a vision-model parser. The team cut the cloud bill from ~$1,000/month to ~$31. *(This number is a 97% reduction against an industry-plausible band of 30–50%; research indicates it reads as inflated unless the mechanism appears in the same sentence. State the mechanism.)*
- **Research:** fine-tuned a small open model to classify language-model errors, 14% → 98% accuracy, GPU memory halved.
- **Internship:** a lightweight blockchain client verifying accounts by three-tier Merkle proof instead of running a full node; ~2KB proofs.
- **Personal software, at production quality:** an always-on assistant daemon (~22,000 lines, two-tier model routing, 16 scheduled jobs, 291 tests) plus finance, fitness, and productivity applications he uses daily.
- **The fleet:** ~13 self-hosted applications, one shared Postgres, self-hosted S3-compatible object storage, push-to-deploy on every one.
- **Athletics:** D3 men's tennis captain, All-Conference honorable mention. 2025 Indianapolis Half Marathon at 7:32/mi.
- **Music:** seven self-taught instruments — guitar, piano, bass, drums, ukulele, harmonica, voice. Original songs published. Existing photography for each instrument in `public/`.
- **Line drawings, authored 2026-07-25/26:** ~20 square cyanotype line drawings derived from his own photographs — playing live, drums, bass, keys, tennis serve and forehand, running, the finish line, the deadlift, camera work, a film set, at the laptop, graduation, Brazil as a child, and childhood counterparts for guitar, racket and camcorder. Two "wear" images — a snapped racket and a fistful of broken drumsticks — carry the thesis better than any metric. Sources in `~/Desktop/pcis`, output in `public/drawings/`.
- **Superseded:** a hero video (landscape and square cuts) exists in `public/` but is no longer used.

**Absences that must not be filled by invention:** no third-party press, no awards, no named references, no public client testimonials beyond the one translated quote above, no traffic or revenue figures.

## Product Principles

1. **Range is the argument, not volume.** *(revised 2026-07-26 — this previously read "volume is the argument" and cited counts of applications shipped and servers run. Renato rejected those as bragging.)* The story is not how many things he has finished; it is that the same person does all of these things, and taught himself most of them. Structure must let breadth accumulate without ever tallying it.
2. **Show the doing, not the scoreboard.** Prefer a drawing of him mid-serve over a count of matches. Where a number does appear it must be inherent to the fact rather than a boast — "seven instruments" describes a method of learning; "twelve applications a quarter" is a metric. Every number that survives carries its mechanism.
3. **The work is anonymous; the outcome is not.** Describe what changed for someone, never who they were.
4. **Breadth is evidence of one trait, never a menu of identities.** Music, sport, and engineering are the same behavior in three materials — present them as one thing, not as three sections competing for the hero.
5. **Simple execution, radical structure.** The memorability budget is spent on the organizing idea. Once that idea is chosen, everything else gets quieter, not louder.

## Accessibility & Inclusion

No product-specific requirement established beyond the standard bar: AA contrast, real text in HTML rather than baked into images, semantic headings, keyboard operability, and `prefers-reduced-motion` honored — no information may exist only in an animated state.
