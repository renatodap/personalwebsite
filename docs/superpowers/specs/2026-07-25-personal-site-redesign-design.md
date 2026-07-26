# renatodap.me — full redesign, content database, and admin

**Date:** 2026-07-25
**Status:** awaiting review
**Supersedes:** the entire current implementation. The existing `app/` is treated as evidence of what the subject is, never as authority over what it becomes.

Companion documents, both already written and both binding:
- [`PRODUCT.md`](../../../PRODUCT.md) — product truth
- [`DESIGN.md`](../../../DESIGN.md) — the visual system
- [`docs/research/2026-07-25-personal-site-content-research.md`](../../research/2026-07-25-personal-site-content-research.md) — content strategy research

---

## 1. Direction contract

> **THESIS** — A person rendered as an orthographic exploded assembly drawing. It refuses the category default: the scroll of project cards under a name-and-tagline hero. An exploded view separates parts without making them separate objects, so engineer, musician and tennis player are components of one assembly rather than three sections competing for a hero slot.
>
> **OWN-WORLD** — Drenched cyanotype blue ground. White hairline work, no fills, no shadows, no light source. Callout balloons on leader lines, arrow-terminated dimension lines, a ruled sheet border with zone letters, a bottom-right title block, a bill-of-materials parts list. One reserved markup red for revisions and live values. Condensed DIN-lineage engineering lettering plus a distinctive monospace for every numeral.
>
> **STORY** — A visitor arrives knowing nothing, sees a person taken apart and labelled, understands within seconds that the breadth is one trait rather than a menu, scans a field of equal-weight work, opens one detail sheet, and leaves able to describe him a week later.
>
> **FIRST VIEWPORT** — Sheet border framing two bands. Upper: the general assembly, each object exploded into its own components on leader lines with numbered callout balloons and dimension lines between them. Lower: the opening rows of the equal-crop detail field. Parts list and title block anchor the sheet. No hero paragraph, no tagline, no primary CTA — this is Experience mode, the artifact leads.
>
> **FORM** — Exploded Assembly, candidate 6 of the grounded list, seed key `49e1c70f`, assigned index 6. Staging committed: `collective-fields-detail-first-index` (equal fragments that grow outward into their whole sheet), fused into the lower band rather than replacing the assembly.

## 2. What this is and is not

A **calling card**. No funnel. Success is that a visitor can describe Renato accurately a week later without looking.

The deep research recommended a recruiter-optimised architecture and was **deliberately overruled** by the user in favour of the calling card. The research's *craft* findings still bind — speed, specificity, no LLM register, real HTML text, one signature motion rather than scattered animation, footer links, machine-readable markup. Its *funnel* findings do not.

**Explicit non-goals:** lead capture, a contact form, a résumé-download funnel, a blog, a `/now` page, a `/uses` page, a `pt-BR` locale tree, skill bars, technology logo walls.

## 3. Site architecture

The page model is **sheets**. A new page is sheet N+1.

| Route | Sheet | Contents |
|---|---|---|
| `/` | **1 — General Assembly** | Sheet border, title block, the exploded assembly, parts list, live dimensions, hero video framed as a part, and the detail-crop field. |
| `/sheet/[slug]` | **Detail sheets** | One piece of work as an annotated diagram: what was asked for, the real constraint, what changed. Anonymous. |
| `/revisions` | **Revision history** | The timeline as a drawing revision table. Mechanical Engineering → CS is a genuine revision entry. First-person prose lives here and nowhere else. |
| `/admin` | — | Content editing. Operate mode. |

Everything on `/` is reachable without navigation; sheet tabs exist for direct access. Deep sheets are progressive detail, never a prerequisite.

### Content order on Sheet 1

1. **Title block + sheet border** — establishes the world before anything is read.
2. **The general assembly** — the parts of him, exploded, numbered.
3. **Parts list (BOM)** — `ITEM / DESCRIPTION / QTY / MATERIAL`. This is the introduction. `SELF-TAUGHT INSTRUMENT — QTY 7`. Deadpan and literally true; it replaces the paragraph a normal site would open with.
4. **Live dimensions** — measured continuously, in markup red, with an as-of time.
5. **Hero video** — kept, placed inside a drawn viewport frame with its own callout number, duotoned into the field. It is a part of the assembly, not a background.
6. **Detail-crop field** — every crop identical in size and scale, so craft competes before subject does and volume accumulates without a curated top three.
7. **Footer = expanded title block** — email as plain text, GitHub, LinkedIn, YouTube, Spotify.

### How a crop becomes a sheet

Unambiguously: **a real navigation, not a modal.** Each crop is an `<a href="/sheet/[slug]">`. The grow-outward effect is a same-document View Transition with `view-transition-name` on the crop and its destination sheet, so the crop appears to expand from its true position into the full sheet. Consequences that make this the right choice: the URL is shareable, browser Back works and reverses the transition, the page is crawlable, and a browser without View Transitions simply navigates — the content is identical either way. `prefers-reduced-motion` skips the transition and navigates plainly.

## 4. Content model

PostgreSQL on the existing shared instance, Prisma, following the `joaodipierro-website` pattern: every listable entity carries `sortOrder` + `isActive`.

```prisma
/// Singleton (id = "main"). Title-block fields and site chrome.
model SiteSetting {
  id            String   @id @default("main")
  drawnBy       String   @default("Renato Prado")
  drawingTitle  String   @default("")   // the sheet's own title
  location      String   @default("Indianapolis, Indiana")
  email         String   @default("")
  heroVideoUrl  String   @default("")   // landscape
  heroVideoUrlMobile String @default("")
  heroVideoLabel String  @default("")   // its callout description
  githubUrl     String   @default("")
  linkedinUrl   String   @default("")
  youtubeUrl    String   @default("")
  spotifyUrl    String   @default("")
  updatedAt     DateTime @updatedAt
}

/// A component of the general assembly — one line of the bill of materials.
model Part {
  id          String  @id @default(cuid())
  itemNo      String                    // "01"
  description String                    // "SELF-TAUGHT INSTRUMENT"
  qty         String  @default("1")
  material    String  @default("")
  drawingUrl  String  @default("")      // SVG or line-art raster
  note        String  @default("") @db.Text
  isActive    Boolean @default(true)
  sortOrder   Int     @default(0)
  @@index([isActive, sortOrder])
}

/// A piece of work, drawn as its own sheet. NEVER names a client or product.
model Sheet {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String                     // describes the mechanism, not the party
  kicker      String   @default("")      // "AUDIOVISUAL DIRECTOR — SÃO PAULO"
  asked       String   @default("") @db.Text  // what was asked for
  actual      String   @default("") @db.Text  // the real constraint
  outcome     String   @default("") @db.Text  // what changed
  mechanism   String   @default("") @db.Text  // REQUIRED wherever a number appears
  year        Int?
  role        String   @default("")
  isActive    Boolean  @default(true)
  isFeatured  Boolean  @default(false)
  sortOrder   Int      @default(0)
  crops       DetailCrop[]
  dimensions  Dimension[]
  @@index([isActive, sortOrder])
}

/// One equal-sized fragment in the index field. Grows outward into its Sheet.
model DetailCrop {
  id        String  @id @default(cuid())
  sheetId   String?
  sheet     Sheet?  @relation(fields: [sheetId], references: [id], onDelete: SetNull)
  label     String                       // "DETAIL A"
  scaleNote String  @default("SCALE 2:1")
  imageUrl  String
  isActive  Boolean @default(true)
  sortOrder Int     @default(0)
  @@index([isActive, sortOrder])
}

/// A measured value. Static, or resolved live from the fitness database.
model Dimension {
  id        String        @id @default(cuid())
  sheetId   String?
  sheet     Sheet?        @relation(fields: [sheetId], references: [id], onDelete: Cascade)
  label     String                        // "TOTAL DISTANCE, TRAILING 365 D"
  source    DimensionSource @default(static)
  staticValue String      @default("")    // used when source = static, and as live fallback
  unit      String        @default("")
  metricKey String        @default("")    // which live aggregate, when source = live
  isActive  Boolean       @default(true)
  sortOrder Int           @default(0)
}

enum DimensionSource { static live }

/// The timeline, as a drawing revision table.
model Revision {
  id          String   @id @default(cuid())
  rev         String                      // "A", "B", "C"
  date        String                      // display string, not a Date — periods are fuzzy
  description String   @db.Text
  isActive    Boolean  @default(true)
  sortOrder   Int      @default(0)
}

model AdminUser {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}
```

**`Sheet.mechanism` is optional in the schema and required by validation.** The column defaults to `""` so existing rows are never blocked, but the admin refuses to set `isActive = true` on a sheet whose `asked`/`actual`/`outcome` text contains a `%`, a `$`, or a `→` while `mechanism` is empty. Research established that a bare 97% cost reduction reads as inflated against a 30–50% plausible band, so the number and its cause ship together or not at all.

**`Dimension.sheetId` is nullable on purpose.** Null means a site-level dimension rendered on Sheet 1; a set value scopes the dimension to one detail sheet.

**Live `metricKey` values**, the only ones the view exposes: `run_distance_365d`, `run_distance_all`, `run_avg_pace_365d`, `run_sessions_365d`, `run_sessions_30d`, `days_since_last_activity`. Any other key is a validation error rather than a silent empty render.

## 5. Live data

Reads Renato's own fitness database, which lives in the same shared Postgres instance as this site's database.

- **Scope: running aggregates only.** Distance, average pace, session count, days since last activity, across the rolling windows `activity-recap.ts` already computes. **Excluded on purpose:** weight, resting heart rate, sleep, blood oxygen, macros, hydration, and every photograph. This is a taste boundary, not a technical one — that app has no authentication, so the constraint has to be ours.
- **Mechanism:** a `VIEW` created inside the fitness database exposing only those aggregates, plus a dedicated role with `SELECT` on that view and nothing else. The site holds a second connection string scoped to that role. Separate databases on one instance cannot be joined without `postgres_fdw`, and we deliberately do not add it.
- **Caching:** revalidated hourly. `Dimension.staticValue` holds the last known good value and renders whenever the live read fails or is stale. A fitness-app outage must never degrade this site.
- **Honesty:** live values render in markup red with an as-of timestamp. A number claiming to be live while stale is worse than a static number.

## 6. Media storage

MinIO on the same server, matching the pattern in `joaodipierro-website/src/lib/storage.ts` and `dap-fitness/web/src/lib/r2.ts`.

- Bucket `personalwebsite-media`, its own scoped MinIO IAM user — never the root key — with `mc anonymous set download` for public object reads.
- Public URLs at `https://renatodap.me/s3/personalwebsite-media/<key>` through the Traefik route MinIO already has.
- **Images:** validated by magic bytes, not extension; re-encoded to WebP via `sharp` (auto-rotate, strip EXIF, cap 2000px). Bytes proxy through the server action deliberately, because a presigned direct PUT would skip validation and optimisation.
- **Video:** magic-byte validated, stored as-is (MP4/WebM). Uploaded through a dedicated route rather than a server action, because Next's default 1 MB action body limit rejects video outright.
- **YouTube is not used.** It would import a foreign visual language into a drawing, and the video volume here is small enough that bandwidth is not a concern.

## 7. Admin

`/admin`, single admin user, NextAuth credentials with bcrypt, JWT session, no DB session table.

**Content only. Layout, colour, and typography are code and are not editable** — chosen deliberately so the design cannot drift.

Conventions from `aslan-frontend`, since this is an internal tool in Operate mode:

- Shared list-page component; never a bespoke list. Title left, primary **Add** pinned top-right; search and filters full-width below, auto-applying on change with no Filter button.
- One app-wide table size. Cells never truncate — `white-space: nowrap` inside an `overflow-x: auto` wrapper. The name column takes the slack width.
- Row click opens the detail; there is no Actions column.
- One global **Edit** toggle flipping the current tab's fields editable in place. While editing, **Save + Cancel replace Edit in the sticky bar**. One consolidated POST per tab.
- Destructive actions live in a bottom `.danger-zone`, never the action bar.
- Every mutation is PRG: flash, then redirect. Feedback is a bottom-right auto-dismiss toast, never a banner.
- No emojis in chrome. No explainer paragraphs — tooltips on demand.

Visually it is the same world at working weight: same tokens, same faces, same line-weight semantics, no explode motion.

**Admin sections:** Title block · Parts · Sheets · Detail crops · Dimensions · Revisions · Media.

## 8. Deployment

Existing Coolify application on `persimmon-eu`, root domain, no `basePath` — this app is exempt from the whole basePath bug class the path-mounted apps hit.

**Two hazards, both load-bearing:**

1. **This app's Traefik labels are hand-edited.** It owns the `www.renatodap.me` → bare-domain `redirectregex` middleware for *every other app on the server*. A plain domain or env change through the Coolify API can silently drop those labels and break `www` for the whole fleet. Any config change must re-specify them and be verified afterwards.
2. **The app currently has no database.** Adding one means provisioning a database + role inside `shared-postgres` the way `infra new-app --db` does, plus a second scoped role for the fitness view.

New environment variables: `DATABASE_URL`, `FITNESS_READONLY_DATABASE_URL`, `AUTH_SECRET`, `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_PUBLIC_URL`, `S3_REGION`.

`next.config.ts` needs `images.remotePatterns` for `renatodap.me/s3/personalwebsite-media/**` — Next treats every absolute `src` as remote and 400s at `/_next/image` without it, even when the host is the app's own domain.

## 9. Content rules

Binding, and enforced in review rather than by tooling:

- **No client, company, product, or application names.** Anywhere, in any tense. Work is described by mechanism and outcome. A previously co-founded AI venture is cut entirely.
- **Tennis is past tense and full weight.** He played college tennis and captained the team; the season is over. It is Item 02 in the assembly at the same scale as everything else, not a demoted footnote.
- **Indianapolis.** The employer relationship is remote; do not place him at the employer's location.
- **Every number carries its mechanism** in the same sentence.
- **No invented anything** — no fabricated testimonials, metrics, logos, or imagery.
- **Banned register:** "passionate about", "cutting-edge", "seamless", "leverage", "delve/dive into", "in today's fast-paced world", "a testament to", "unlock the potential". Vary sentence length deliberately.

## 10. Accessibility and performance

- AA contrast. `--line-soft` never carries unique information alone.
- All copy is real text in HTML. The drawing is SVG with `<title>`/`<desc>`, never text baked into raster.
- Full keyboard operation: callout balloons are real links, the crop field is a list, the grow-outward transition is focusable and reversible.
- `prefers-reduced-motion` gets the assembled state, held still and fully legible. No information exists only in an animated state.
- Hero video: `muted`, `playsinline`, `preload="none"` with a poster; it must actually play on mobile, which is a bug that has bitten a sibling project already.
- `Person` JSON-LD with `jobTitle`, `sameAs`; semantic headings; sub-second first paint.

## 11. Known risks

1. **Asset production is the real cost of this direction.** Every part and every detail crop needs line art. Three sources are available — hand-authored SVG, generated raster line drawings, and traced screenshots — and the build must not stall waiting for perfect ones. Mitigation: ship with a small authored set, and make `DetailCrop` addable from the admin so the field grows over time. The field is designed to accumulate.
2. **Blueprint tips into theme-park the moment the linework stops being precise.** This direction lives on draughting discipline, not on the idea. Hairlines, square corners, correct dash patterns, no shadows.
3. **The conceit collapses if the parts list turns cute.** It has to stay dry and literally true.
4. **The `www` redirect labels** — see §8.

## 12. Delivery phases

Scoped so each phase is independently shippable and the site is never broken between them.

| Phase | Delivers | Done when |
|---|---|---|
| **1 — Foundation** | Prisma schema, database + role provisioned on `shared-postgres`, MinIO bucket + scoped IAM user, upload pipeline, seed from existing content. | Seeded data reads back through Prisma; an image and a video round-trip through the bucket to a public URL. |
| **2 — Sheet 1** | The design system as tokens, the general assembly, parts list, title block, hero video as a part, crop field. Static dimensions only. | `/` renders the approved composition on desktop and phone, keyboard-operable, reduced-motion honoured. |
| **3 — Detail sheets** | `/sheet/[slug]`, the View Transition, `/revisions`. | A crop expands into its sheet, Back reverses it, every route is crawlable. |
| **4 — Admin** | Auth, the shared list component, all six content sections, media manager, the mechanism validation gate. | Every field on the public site is editable without touching code. |
| **5 — Live dimensions** | The fitness view, read-only role, cached resolver, fallback behaviour. | Killing the fitness database leaves the site rendering last-known values with an as-of time. |

Phase 5 is genuinely optional and deliberately last — the site is complete and honest without it, since every live dimension has a static fallback by design.

## 13. Open decisions

Carried deliberately rather than invented. All three are inferences in `PRODUCT.md` and need Renato's confirmation before content is written:

1. **Language.** Assumed English only. A second locale doubles maintenance and goes stale.
2. **Anonymity boundary.** Assumed that describing a client by sector and city ("an audiovisual director in São Paulo") is acceptable while names and linkable domains are not. If even sector-level description is too identifying, the detail sheets lose their kickers and get rewritten around mechanism alone.
3. **Available photography.** Unknown quantity and quality. The direction deliberately depends on line art rather than photography, so this is a low-severity unknown.
