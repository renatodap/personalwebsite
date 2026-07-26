# Research: Personal Site Content Strategy for a Multi-Hyphenate New-Grad Engineer

**Date:** 2026-07-25
**Subject:** What should go on Renato Prado's personal website — content strategy, section architecture, and narrative positioning for a site that is memorable rather than a generic student portfolio.

---

## Summary

The research points to an uncomfortable but clarifying conclusion: **almost every hiring manager will open a candidate's personal site, and almost none of them will hire because of it.** A survey of 60+ hiring managers found that while the overwhelming majority look, most rated "would this candidate's chances be lower without a portfolio site?" at 0–2 out of 5 ([profy.dev](https://dev.to/profydev/this-survey-among-60-hiring-managers-reveals-don-t-waste-your-time-on-a-react-portfolio-website-17ge)). The site's real job is therefore not to *win* the decision but to **compress a specific, credible, non-generic identity into the 15–60 seconds before the reviewer leaves** — and to be the artifact that a warm introduction, a recruiter, or an LLM screening tool can point at.

For Renato specifically, the strongest available position is *not* "CS student with many interests." It is **an engineer who ships AI systems that survive production** — multi-model failover, a 97% cost reduction, a fine-tune that moved 14%→98%, a Merkle-proof verifier — because that maps almost exactly onto the 2026 AI-engineering hiring "green flag" list ([genai.qa](https://genai.qa/blog/hire-llm-engineer-salary-skills-interview-2026/)). His breadth (tennis captaincy, seven instruments, 60+ repos) should not be a parallel identity competing for the hero; it should be the *evidence* for the one trait the work already demonstrates — self-directed repetition until something works. The single biggest risk in his current material is that his best number ($1,000 → $30/mo) sits far outside the band engineers find believable and will read as inflated unless the mechanism is stated on the page.

---

## Key Findings

### 1. What actually differentiates a memorable personal site from a generic portfolio

**Finding 1.1 — The memorable sites are memorable because the site *is* the demonstration, not because it is decorated. (Confidence: High)**
The consistently named exemplars all share one property: the site itself proves a specific capability that the owner is selling. Bruno Simon's site is a drivable 3D world, which *is* his WebGL portfolio ([Elementor](https://elementor.com/blog/best-web-developer-portfolio-examples/)). Lynn Fisher rebuilds [lynnandtonic.com](https://lynnandtonic.com/) annually "in pursuit of learning and using web technology in unexpected ways" — the redesign is the work ([rachsmith.com](https://rachsmith.com/the-incredible-websites-of-lynn-fisher/), [web.dev](https://web.dev/blog/community-highlights/lynn-fisher)). Rauno Freiberg rebuilt [rauno.me](https://rauno.me/) as an operating system. Josh Comeau's site is an interactive teaching instrument with micro-interactions and sound design, which is precisely what he sells ([joshwcomeau.com](https://www.joshwcomeau.com/about-josh/)). Dan Luu's [danluu.com](https://danluu.com/) is near-unstyled HTML and is respected entirely for long-form essays with data and reproducible reasoning. Brittany Chiang's [brittanychiang.com](https://brittanychiang.com/) is a clean single-page site whose virtue is organization and legibility.
The pattern: **there is no single winning aesthetic.** Minimal and maximal both win. What they share is that the form is an argument for the person's specific competence.

**Finding 1.2 — Interactive spectacle is largely invisible to the people you built it for. (Confidence: Medium-High)**
Multiple practitioner sources converge: "Pixel-perfect hero animations are stunning, but absolutely no hiring manager is going to see them" ([Level Up Coding](https://levelup.gitconnected.com/recruiters-arent-clicking-your-portfolio-they-re-looking-here-instead-c694c4606dc3)). A creative recruiter on Glassdoor: reviewers "don't spend more than 15 seconds looking at my work. That's not enough time to watch or read anything" ([Glassdoor Community](https://www.glassdoor.com/Community/creatives/do-recruiters-even-look-at-portfolios-in-my-experience-they-dont-spend-more-than-15-seconds-looking-at-my-work-thats-not-enough)). The HN consensus is aggressively anti-ornament: "Build it with simple HTML & CSS. JS should not be necessary"; "DON'T make visitors download 10-meg background images" ([Ask HN: What makes a great personal website?](https://news.ycombinator.com/item?id=23694414)). In a 2026 HN thread, Three.js backgrounds and SPAs were specifically criticized for breaking mobile and OpenGraph/SEO ([Ask HN: Share your personal website](https://news.ycombinator.com/item?id=46618714)).
**Reconciliation with 1.1:** the resolution is *one* memorable mechanic that costs the reader nothing, sitting on top of a fast, conventional, scannable spine. Spectacle as the whole architecture fails; spectacle as a single signature that also loads in under a second is what the award sites actually do.

**Finding 1.3 — Speed and content beat design for a site whose primary content is text. (Confidence: High)**
HN commenters repeatedly rank "interesting content" as the primary value, with speed as the enabler — readers should be able to start reading within ~0.2 seconds ([HN 23694414](https://news.ycombinator.com/item?id=23694414)). NN/G's writing-for-the-web research quantifies the payoff for text discipline: concise text improved measured usability by 58%, scannable layout by 47%, objective (non-promotional) language by 27%, and all three combined by 124% ([NN/G](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)).

---

### 2. Multi-hyphenate positioning — is breadth an asset or a liability?

**Finding 2.1 — The 2026 market pays for depth, and the market has bifurcated. (Confidence: Medium-High)**
Hiring in 2026 has "shifted from growth-at-all-costs to precision," with leaner teams and premiums for people who solve specific hard problems; AI/ML specialists are reported to earn 17–28% more than generalist counterparts, while generalist roles see flat-to-modest movement ([Joberty](https://www.joberty.com/blog/should-you-specialize-or-stay-a-generalist-in-2026/), [TieTalent](https://tietalent.com/en/blog/256/generalist-to-specialist-career)). The stated failure mode is explicit: "If you know 'a bit of everything' but haven't mastered anything, you may struggle to differentiate yourself."
The nuance that survives: "the most successful engineers typically combine a core specialisation with broad generalist awareness," and in small teams generalists remain extremely valuable ([Joberty](https://www.joberty.com/blog/should-you-specialize-or-stay-a-generalist-in-2026/)).

**Finding 2.2 — The strongest causal evidence on athletics says it does *not* move callbacks. (Confidence: High — this is the best-designed study in the whole corpus)**
A resume-audit field experiment published in *Journal of Sport and Social Issues* found that **listing a college sport produced no statistically significant change in the likelihood of receiving a callback or interview request** ([Paul, Cheng, Greene & McGee, 2023, SAGE](https://journals.sagepub.com/doi/10.1177/15270025221123315)). This is a randomized-audit result and outranks the abundant "athletes make great hires" advocacy content, which is largely produced by athlete-recruiting firms and career centers ([Grinnell](https://career.grinnell.edu/blog/2023/08/15/the-winning-advantage-why-college-athletes-make-great-employees/), [Northeastern](https://news.northeastern.edu/2025/01/17/student-athletes-employer-value)). Correlational data (e.g. EY's finding that 94% of women in C-suite roles are former athletes) is real but cannot be used to argue that *putting it on a page* changes screening outcomes.
**Implication:** athletics does not hurt, but it will not earn a callback on its own. It only earns its place if it is doing narrative work.

**Finding 2.3 — Engineering-focused advice says to cut hobbies outright; portfolio-review advice says to put them *after* the work. (Confidence: Medium — sources conflict)**
The direct instruction: "travel photos, music projects, side hobbies" don't belong "unless they demonstrate relevant skills," and personal sites should focus on engineering-related signal ([techinterview.org](https://www.techinterview.org/post/3233474627/personal-website-portfolio-engineers/)). The softer position, from a portfolio-review practitioner: personal material belongs on the About page — which reviewers reach only *after* they've decided the work is good — and there it does useful humanizing work ("Add a photo. A short paragraph about what drives you, what you enjoy, what you're into outside of work") ([OpenDoors Careers](https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio)).
**Reconciliation:** both are consistent with a single rule — *personal breadth must never occupy the positioning slots (hero, first screen, nav-primary), and must never be presented as a co-equal identity.* Placed below the work and tied to a stated through-line, it is upside; placed above or beside the work, it reads as unfocused.

**Finding 2.4 — The standard fix for multi-hyphenates is one unifying thread, not a menu. (Confidence: Medium)**
Personal-branding guidance for "multipotentialites" converges on: find the common theme across your interests and anchor everything to a central message so people can understand you even though your surface areas differ; frame the diversity as evidence of a trait rather than as a list ([Puttylike](https://puttylike.com/how-to-brand-yourself-in-a-way-that-makes-sense-to-conventional-employers-and-clients/), [Noomii](https://www.noomii.com/articles/15160-branding-for-multipassionates-build-a-personal-brand-that-reflects-your-passion)). This literature is advisory rather than empirical, but it is unanimous and it matches Finding 2.3's placement rule.

---

### 3. What hiring managers actually read, in what order, and for how long

**Finding 3.1 — They look, but it rarely changes the decision. (Confidence: High — this is the single most important finding in the report)**
In a survey of 60+ hiring managers and recruiters involved in developer hiring: ~65% said they would *definitely* look at an inexperienced candidate's portfolio site and ~93% were at least likely to. But on "would the candidate's chances be lower without one," most answers clustered at 0–2 out of 5. The author's summary: "The overwhelming majority of hiring managers look at your website... but don't give a crap" ([profy.dev survey](https://dev.to/profydev/this-survey-among-60-hiring-managers-reveals-don-t-waste-your-time-on-a-react-portfolio-website-17ge)).
Corroboration from practitioners on Blind: a Google engineer — "I don't think it's important. It shouldn't be. It's nice to have but if you don't it shouldn't be a deal breaker"; portfolios screen designers, but for full-stack engineers they are an optional advantage ([Blind](https://www.teamblind.com/post/hiring-how-important-is-it-to-have-a-personal-portfolio-sz564ms3)). Where portfolios *do* matter most is early career — new grads and career changers — which is exactly Renato's bracket.

**Finding 3.2 — The read order is fixed and the About page is last. (Confidence: Medium-High)**
The observed sequence: (1) decide whether to click the link at all; (2) judge visual quality in seconds — "if the visual foundation of your portfolio looks sloppy, most people will subconsciously assume your work follows the same pattern"; (3) scan the hero for positioning and fit; (4) read work samples for clarity and narrative; (5) check the About page *only after interest is established* ([OpenDoors Careers](https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio)). Reviewers are "optimizing for proof of impact, role clarity, and constraint handling, and if those signals aren't visible in under a minute, your work disappears" ([UX Planet](https://uxplanet.org/why-good-ux-portfolios-never-get-interviews-in-2026-11-hiring-red-flags-6ea28fb2f9b3)).

**Finding 3.3 — Every specific time-on-page number in circulation is weakly sourced and they conflict. (Confidence: Low on the numbers, High on the direction)**
Circulating figures: 7.4 seconds per *résumé* from TheLadders' eye-tracking work ([HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/), [Mercy University](https://career.mercy.edu/blog/2019/11/08/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/)); "about 3 minutes" on a portfolio (repeated across content-marketing sites with no traceable primary study); "15 seconds" from a practitioner ([Glassdoor](https://www.glassdoor.com/Community/creatives/do-recruiters-even-look-at-portfolios-in-my-experience-they-dont-spend-more-than-15-seconds-looking-at-my-work-thats-not-enough)); "under a minute" ([UX Planet](https://uxplanet.org/why-good-ux-portfolios-never-get-interviews-in-2026-11-hiring-red-flags-6ea28fb2f9b3)). The 7.4s résumé figure is the only one with a real methodology behind it, and it doesn't transfer to websites. **Design for 15 seconds and treat anything longer as a bonus.** Widely-repeated stats like "78% of hiring managers prioritize candidates with custom portfolios" and "84% of employers want to see working applications" appear only in SEO content with no primary citation and should not be relied on.

**Finding 3.4 — Users fall back to the footer when navigation fails. (Confidence: High)**
NN/G: "Anytime people couldn't find the information they needed from the main navigation, they immediately scrolled down to the footer" ([NN/G, About Us research](https://www.nngroup.com/articles/about-us-information-on-websites/)). Contact details, résumé link, and profile links must exist in the footer regardless of what the nav does.

---

### 4. Presenting quantified outcomes credibly

**Finding 4.1 — Quantification helps a lot, and most candidates don't do it. (Confidence: Medium)**
Résumés with quantified achievements are reported to draw ~2.5× more interview invitations, while only ~26% of résumés carry five or more measurable results ([Resume Worded](https://resumeworded.com/how-to-quantify-resume-key-advice)). Sourcing is vendor-side, so treat the multiplier as directional, but the scarcity claim is consistent across sources and matches the practitioner advice.

**Finding 4.2 — The failure mode is the missing denominator and the missing mechanism, not the number itself. (Confidence: High)**
"'Increased sales by 15%' sounds good, but 15% of what?" Numbers without context lose credibility, whereas "processed 150+ invoices per week with a 99.5% accuracy rate" is specific and credible. Inflated numbers "collapse under even basic questioning" and "the inflated claim collapses the moment an interviewer asks you to walk through it." Reasonable estimates are explicitly acceptable *if you can state their basis* ([Resufluent](https://resufluent.com/blog/how-to-quantify-impact-on-your-resume-without-lying), [Resume Optimizer Pro](https://resumeoptimizerpro.com/blog/including-quantifiable-achievements-in-your-resume)).

**Finding 4.3 — A 97% cloud cost reduction is outside the band experienced engineers find plausible without a stated mechanism. (Confidence: Medium-High — directly relevant to Renato)**
Industry benchmarks put typical achievable cloud optimization at **30–50%**, with 30%+ of spend commonly wasted on idle and over-provisioned resources setting a practical ceiling for routine work ([Northflank](https://northflank.com/blog/cloud-cost-optimization), [CloudZero](https://www.cloudzero.com/blog/reduce-cloud-costs/), [Full Scale](https://fullscale.io/blog/cloud-cost-optimization/)). The consensus framing is that real reduction "comes from making small smart decisions... not from finding hidden solutions," which means **a single-initiative claim of dramatic savings reads as unrealistic to experienced engineers.** A $1,000 → $30/mo cut (97%) is a 2× outlier beyond the believable band. It is almost certainly true in Renato's case — it looks like the classic "we were calling a hosted vision model per frame / running always-on instances, and we moved to on-device preprocessing plus batched calls" story — but **the number alone will be read as inflated. The mechanism must be on the page, in one sentence, adjacent to the number.**

**Finding 4.4 — The proof hierarchy is: one-click live demo > clean repo with a README > video. (Confidence: Medium-High)**
"A live project URL is the first thing a recruiter clicks... The live URL gets you in the room. The explanation of how you built it keeps you there." A repo needing ten minutes of local setup is not competitive with an instantly accessible demo, and developers "spend less than 30 seconds evaluating a new repository before deciding whether to explore further" — which is the specific gap a short demo video fills ([FACE Prep](https://faceprep.in/article/deploy-ai-project-streamlit-vs-github-for-fresher-interview-2026/), [RepoClip](https://repoclip.io/blog/how-to-create-demo-video-github-project)). The recommended posture is layered, not either/or.

**Finding 4.5 — The 2026 AI-engineering green-flag list maps directly onto Renato's existing work. (Confidence: Medium-High)**
Stated green flags for LLM/AI engineering candidates: production deployment with a monitoring stack; **evaluation results with specific metrics**; **cost optimization work with quantified savings**; **handling of LLM failure modes** (hallucination rate, prompt-injection tests, fallbacks); open-source contribution; and published technical writing about real challenges faced. Stated red flags: notebook-only projects, tutorial-level demos (weather chatbot, sentiment analysis), no evaluation framework, unjustified model choice. The diagnostic question hiring managers are told to ask: *"one project where the hard problem was not 'call the API' but 'the API call failed in a way that mattered'"* ([genai.qa](https://genai.qa/blog/hire-llm-engineer-salary-skills-interview-2026/), [KORE1](https://www.kore1.com/hire-llm-engineers-2026/)). Renato's multi-model failover routing is *literally the answer to that question*, and it is currently a subordinate clause in his IMENSIAH blurb.

---

### 5. Which sections earn their place and which are dead weight

**Finding 5.1 — The minimal viable section set is small and well-agreed. (Confidence: Medium-High)**
The recommended set: a 1–3 sentence landing intro; a concise About; **3–6 substantive projects with context and technical decisions**; a writing/talks section; a current résumé PDF; contact. Explicitly warned against: generic templates, excessive animation, outdated content, and skill-bar ratings. Time budget: 4–8 hours total; "if you're spending 40+ hours, you're overengineering" ([techinterview.org](https://www.techinterview.org/post/3233474627/personal-website-portfolio-engineers/)). Quality-over-quantity on projects is near-universal: 3–5 polished projects beat 10+ shallow ones.

**Finding 5.2 — Résumé PDF: yes, and it must be downloadable. (Confidence: Medium)**
A prominent PDF download belongs alongside any web résumé because many recruiters must upload into ATS systems that cannot parse web pages ([Colorlib](https://colorlib.com/wp/cat/resume/) and consistent across résumé-tooling sources).

**Finding 5.3 — Contact: a plain email address outperforms a form for this use case. (Confidence: Medium)**
When both are offered, 67.3% of people choose the email address; an email "feels like a direct line to a real person" and functions as a trust signal, while forms exist mainly for spam control and lead structuring ([WPForms](https://wpforms.com/contact-form-vs-email-address-which-is-better/), [MRW Web Design](https://mrwweb.com/email-address-contact-form-debate/)). A job-seeking personal site has no lead-qualification problem, so the form's only benefit doesn't apply.

**Finding 5.4 — The /now page is a self-discipline tool with negligible hiring value. (Confidence: Medium-High)**
Derek Sivers created /now to answer "what are you doing now?" and the value his adopters report is internal: "a good reminder of their priorities — by publicly showing what you are focused on now, it helps you say no to other requests" ([sive.rs/now2](https://sive.rs/now2), [nownownow.com/about](https://nownownow.com/about)). Adoption is small and the directory count is reported inconsistently (~2,300 in one place, 916 in another). **No source in this research connected a /now page to a hiring outcome.** For a job-hunting new grad it is a maintenance liability: a stale /now page is worse than none, and "unfinished or outdated" content is an explicit red flag ([UX Planet](https://uxplanet.org/why-good-ux-portfolios-never-get-interviews-in-2026-11-hiring-red-flags-6ea28fb2f9b3)).

**Finding 5.5 — /uses pages: no evidence of hiring value found at all. (Confidence: Medium — absence of evidence)**
Nothing in the recruiter-, hiring-manager-, or portfolio-review literature mentions /uses pages. They are a community in-joke that signals membership to other developers, not to reviewers.

**Finding 5.6 — Writing outperforms portfolio polish, but only if it's real. (Confidence: Medium)**
The profy.dev survey's actual recommendation, having concluded portfolio sites don't move the needle, is to redirect that time into **GitHub projects, blog posts sharing learnings, detailed READMEs, and résumé optimization** ([profy.dev](https://dev.to/profydev/this-survey-among-60-hiring-managers-reveals-don-t-waste-your-time-on-a-react-portfolio-website-17ge)). "Published technical writing about real challenges faced" is an explicit AI-hiring green flag ([genai.qa](https://genai.qa/blog/hire-llm-engineer-salary-skills-interview-2026/)). And a writing/talks body of work is one of only four conditions under which techinterview.org says an engineer should build a site at all. **But an empty or three-post-then-abandoned blog is an active negative** — HN and portfolio-review sources both treat staleness as a competence signal.

**Finding 5.7 — A large GitHub is a liability unless curated to 4–6 pinned repos. (Confidence: Medium-High — directly relevant to Renato)**
"Recruiters don't care about how many repos you have — forked tutorial repos, abandoned weekend experiments, and auto-generated starter projects actually **hurt your profile because they dilute your signal**." The target is 4–6 high-quality repos aligned to the target role, and what matters is whether the **pinned** repos "tell a coherent story." Weak profiles "pin random coursework, abandoned experiments, or forks with no explanation." Every pinned repo needs a README explaining what it does, why it was built, how to run it, and what technical decisions were made — "recruiters who are technically literate will skim the code, but everyone reads the README" ([Resumly](https://www.resumly.ai/blog/how-to-organize-github-repos-for-recruiter-review), [GitShare](https://gitshare.me/blog/how-recruiters-actually-evaluate-your-github-profile), [Riem.ai](https://riem.ai/blog/github-recruiting-guide)).
**Implication:** "60+ repos on GitHub" as a boast is the wrong frame. It advertises volume in a market that reads volume as noise.

---

### 6. Voice, specificity, and AI-copy fatigue

**Finding 6.1 — LLM-sounding copy is now a fast rejection trigger, not a neutral. (Confidence: Medium — the trend is well-attested, the specific percentages are not)**
Reported: 60–80% of 2026 résumés show clear signs of LLM authorship (attributed to unnamed internal enterprise estimates); recruiters report ~40% of applications show clear AI generation; and hiring managers are described as "manually rejecting AI-written resumes after a 10-second read," focusing on **voice, specificity, and machine cadence** ([ResumePulse](https://resumepulse.ai/blog/hiring-managers-reject-ai-resumes-2026), [Hirewell Talent Insights](https://talentinsights.hirewell.com/blog/ai-hiring-arms-race-workslop-resume-fraud-2026)). These specific figures come from vendor blogs and should be treated as Low confidence individually; the **direction** is corroborated independently by the developer community — a 2026 HN thread on personal sites surfaced explicit statements like *"I strongly oppose writing with LLMs and think it's more important than ever to write with our own words"* ([HN 46618714](https://news.ycombinator.com/item?id=46618714)).

**Finding 6.2 — The specific lexical tells are stable and well-documented. (Confidence: High — many independent sources list the same words)**
Highest-signal single words: **delve, robust, pivotal, tapestry, multifaceted, seamless, cutting-edge, leverage/leveraging.** Highest-signal phrases: **"unlock the potential," "revolutionize the way," "it's important to note," "in today's fast-paced [digital] world," "in the ever-evolving landscape of," "at its core," "let's dive in," "a testament to."** Closing tells: "In conclusion," "Ultimately," "At the end of the day," "In essence" ([Grammarly](https://www.grammarly.com/blog/ai/common-ai-words/), [Content Beta](https://www.contentbeta.com/blog/list-of-words-overused-by-ai/), [Walter Writes](https://walterwrites.ai/most-common-chatgpt-words-to-avoid/), [Olivia Cal](https://www.oliviacal.com/post/ai-writing-tells)).
There is also a **structural** tell independent of vocabulary: "AI defaults to a small set of sentence shapes and rotates through them evenly, resulting in prose that varies technically but doesn't vary rhythmically" ([Stackedo](https://stackedo.com/ai-writing-cliches-to-avoid/)). Uniform sentence length is itself a giveaway.

**Finding 6.3 — Specificity is the entire mechanism; adjectives are the enemy. (Confidence: High)**
The canonical contrast: *"In 2021, I quit my corporate job after a weekend project got 10,000 users"* is dramatically more compelling than *"I'm a full-stack developer with 8 years of experience"* ([Curious Page](https://curious.page/blog/best-about-me-page-examples-inspiration)). For heroes specifically: avoid empty lines like "I'm passionate about design. I care about users. **Everyone cares. Those are table stakes**" — write something that actually positions you ([OpenDoors Careers](https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio)). NN/G's About-page research says the same thing from the credibility side: **concrete facts over vague marketing language**, and avoid hollow words like "revolutionary" ([NN/G](https://www.nngroup.com/articles/about-us-summaries/)). NN/G also documents a Halo Effect — "people tend to make hasty judgments about organizations based on limited information" — so the first concrete fact disproportionately colors everything after it.

**Finding 6.4 — First person, for a personal site. (Confidence: Medium)**
Third person historically reads as more authoritative and remains correct for press/PR bios, but for personal sites and About-Me pages the modern consensus is first person, because the goal is rapport and personality rather than institutional distance ([CLIMB](https://climbtheladder.com/should-a-professional-bio-be-in-third-person/), [Phil Adams](https://philadams.co/2023/03/first-person-biographies/)). HN's framing of the same point: sites succeed when they reflect genuine interest rather than chasing an audience.

---

### 7. Founder + student simultaneously

**Finding 7.1 — Listing your own company is a net plus, with one specific downside risk. (Confidence: Medium)**
Founding something is read as evidence of initiative, leadership, and shipping ability, and it is common and accepted practice in the US to list it. The risk is audience-specific: **big-tech recruiters may read startup experience as "startup generalist rather than specialist," and the scale may not translate** — which is a reframing problem, not a disqualification. Startups read the same line as strongly positive ([VisualCV](https://www.visualcv.com/cofounder-on-resume/), [Skillcrush](https://skillcrush.com/blog/startup-resume/), [Underdog.io](https://underdog.io/blog/how-to-get-recruited-by-startups)). The quality bar matters: "a side project only helps if it demonstrates useful traits — another clone app usually doesn't, but a small tool that solves a real annoyance can."

**Finding 7.2 — Being a student is an asset to state, not a liability to hide. (Confidence: Low-Medium — single reasoned source)**
Student founders report a perceived credibility gap with customers, but the counterpoint offered is that **student founders have an advantage older founders don't: they can say they're students**, which unlocks goodwill, mentorship, and forgiveness ([Texts with Founders](https://textswithfounders.substack.com/p/texts-with-founders-the-student-disadvantage)). Standard new-grad résumé advice puts education prominently when work history is thin — but note this is *résumé* convention, and a résumé and a homepage hero optimize for different things.

**Finding 7.3 — A founder's personal site does jobs the company site cannot. (Confidence: Medium)**
A separate personal site provides narrative control — "deciding how your background, mission, startup thesis, and proof are presented online, rather than letting old bios, conference blurbs, or random press fragments define you" — and lets the founder's story survive pivots ([mean.ceo](https://mean.ceo/startup-blog/tpost/building-personal-website-startup)). For Renato this argues for keeping renatoprado-the-site and imensiah.com.br cleanly separate, with the personal site linking out rather than duplicating.

**Finding 7.4 — Interaction with Finding 2.1:** the founder line is what *rescues* his breadth. A generalist student is unfocused; a **founder** who is also an athlete and a musician is legible, because founding reframes breadth as range-under-ownership rather than dabbling. This is an inference from the combination of 2.1, 2.4, and 7.1, not a directly sourced claim — flagged as such.

---

### 8. Discoverability, name SEO, and the bilingual question

**Finding 8.1 — Ranking for your own name is mostly consistency plus Person schema. (Confidence: Medium)**
A name-matching domain "sends a strong signal to Google that the website represents you." Person schema should carry `jobTitle`, `worksFor` (ideally with matching Organization markup), `image`, and `sameAs` listing every profile you control (LinkedIn, GitHub, etc.), deployed on the single page that should rank — usually About ([Reputation X](https://www.reputationx.com/blog/person-biography-schema), [Reputation Rhino](https://www.reputationrhino.com/person-schema-markup/)). One vendor reports 11 of 12 founder bio pages hitting position one for their name within 47 days using a shared template plus schema plus five citation backlinks — **single vendor source, treat as Low confidence**. Google's own position is that Person markup guarantees nothing on its own; rankings still depend on page quality, crawlability, authority, and profile consistency ([Media Village](https://www.media-village.co.uk/marketing/personal-brand-seo-guide/)).

**Finding 8.2 — Bilingual is a subdirectory + hreflang problem, and it is optional. (Confidence: Medium)**
Standard practice: language-specific URLs (`/en/`, `/pt-br/`) with hreflang tags, which prevents duplicate-content treatment and serves the right version by locale. Translation should be localized rather than word-for-word ([ConveyThis](https://www.conveythis.com/blog/how-to-create-a-bilingual-website-guide), [Pixpa](https://www.pixpa.com/blog/how-to-create-a-multilingual-portfolio-website)). Nothing in the research suggests a bilingual personal site improves hiring outcomes in the primary market; the cost is doubled maintenance and a stale second locale, which is itself a red flag.

**Finding 8.3 — Brazilian nationality is a distinct strategic lane in 2026, not a handicap. (Confidence: Medium — vendor-side sourcing but consistent across multiple independent vendors)**
US company demand for engineers across Latin America is reported to have grown **250% year over year**, with Brazil the top placement source and roughly 6.89M developers (fourth-largest national base on GitHub) ([Near](https://www.hirewithnear.com/blog/hiring-remote-talent-in-brazil), [Revelo](https://www.revelo.com/blog/hire-software-developers-in-brazil), [BEON.tech](https://beon.tech/blog/tech-recruitment-in-brazil-hire-brazilian-tech-talent/)). These are staffing-firm sources with an obvious interest in the claim, so the magnitude is suspect — but the existence of a strong US→Brazil hiring channel is corroborated across several unrelated vendors. **The practical read: "Brazilian, built and shipped a product for the Brazilian market, fluent in Portuguese" is a differentiated position for US companies with LatAm operations or nearshore teams — a lane, not an apology.**

**Finding 8.4 — On work authorization: be direct, but it isn't hero content. (Confidence: Medium)**
Guidance for international students is consistent: employers dislike being surprised late in the process, so be transparent, and specifically explain that F-1 OPT already carries work authorization requiring no employer action or cost, with H-1B a later question ([NACE](https://www.naceweb.org/public-policy-and-legal/legal-issues/international-student-employment-answering-questions-about-the-need-for-employment-visa-sponsorship/), [NYU](https://www.nyu.edu/students/student-information-and-resources/student-visa-and-immigration/current-students/employment-and-tax/navigating-conversations-with-employers-about-work-authorization.html), [Michigan Career Center](https://careercenter.umich.edu/article/us-employers-guide-hiring-international-students)). None of these sources recommend leading with it publicly. A single factual line low on the page or in the résumé is the right weight.

**Finding 8.5 — Machine readability is now part of discoverability. (Confidence: Low-Medium)**
GEO guidance recommends JSON-LD, semantic structure, and permitting AI crawlers (GPTBot, PerplexityBot) in robots.txt, plus an optional `llms.txt` ([SEO Tuners](https://seotuners.com/blog/generative-engine-optimization/generative-engine-optimization-best-practices/), [Text.com](https://www.text.com/blog/ai-website-optimization/)). A claim that "nearly 80% of portfolios are parsed by AI screening before a human opens them" appears in a single 2026 UX source with no methodology and should **not** be relied on ([UX Planet](https://uxplanet.org/why-good-ux-portfolios-never-get-interviews-in-2026-11-hiring-red-flags-6ea28fb2f9b3)). Regardless of the true number, the cheap insurance is the same and costs nothing: real text in HTML rather than baked into images or injected client-side, semantic headings, and Person/CreativeWork JSON-LD.

---

## Analysis

**The central tension is that the site is simultaneously low-leverage and high-stakes.** Finding 3.1 says the site rarely changes a hiring decision; Findings 3.2 and 6.1 say a *bad* site actively costs you — sloppy visuals get generalized to sloppy work, and LLM-cadence copy triggers rejection in ten seconds. The asymmetry is clear: **the downside is larger than the upside.** That argues against the instinct to build an elaborate experience, and for building a fast, specific, honestly-written site quickly, then spending the remaining energy on the things that do move outcomes — curated pinned repos with real READMEs, working demos, and one or two pieces of genuine technical writing (Findings 5.6, 5.7, 4.4).

**But "don't overbuild" is not the same as "be generic," and that distinction is where Renato's real opportunity sits.** Finding 3.1's "they look but don't care" applies to the median site, which is a template with a skills grid and three CRUD apps. The reason those sites don't matter is that they contain zero information a résumé didn't already carry. The award-winning sites in Finding 1.1 matter precisely because the site conveys something no résumé line can. **The lever is not production value; it is information density about a specific person.** Renato already has the raw material — a co-founded company with his father, a 97% infra cost cut, a fine-tune that went 14%→98%, seven self-taught instruments — and the failure mode available to him is not "too plain," it's "listing all of it flatly, so none of it lands."

**The market shift in Finding 2.1 is the thing that determines the architecture.** In a market paying 17–28% premiums for depth and reading breadth-without-depth as a plateau signal, a hero that says "engineer, athlete, musician" is a positioning error even though every word is true. But Finding 2.4's unifying-thread principle and Finding 7.4's founder-rescue effect together produce the correct structure: **lead with a single specialization, prove it with the work, and only then use the breadth as evidence for the trait that produced the specialization.** Renato has already written the thread himself — *"Music and code work the same way for me: start with something rough, find the pattern, clean it up until it clicks"* — and it is a genuinely good line: concrete, first-person, unfakeable, and it contains zero words from the banned list in Finding 6.2. It should be the closer, not the opener.

**The most actionable single insight is the alignment between Finding 4.5 and his existing portfolio.** The 2026 AI-engineering green flags — evaluation metrics, quantified cost optimization, and handling LLM failure modes — are not aspirational for him; he has all three shipped. His multi-model failover routing is a direct, literal answer to the exact diagnostic question hiring managers are being told to ask ("a project where the hard problem was not 'call the API' but 'the API call failed in a way that mattered'"). Right now that detail is a trailing sentence in a paragraph. Promoting it is the highest-return copy change available.

**The most actionable single risk is Finding 4.3.** His strongest number is his least believable one. $1,000 → $30/mo is a 97% reduction against an industry-plausible band of 30–50%. Reviewers who know cloud economics will not think "impressive"; they will think "either this was a badly-architected demo, or this is inflated" — and since the honest answer is close to the first one, saying so *out loud* converts the suspicious number into a credibility asset. "We were calling a hosted vision model on every frame; batching plus on-device preprocessing plus killing always-on instances took it from $1,000/mo to $30" is a better sentence than the number alone, and it demonstrates the exact production instinct Finding 4.5 says is being screened for.

**On breadth, the evidence is more brutal than the folklore.** The randomized resume-audit result (Finding 2.2) — no statistically significant callback effect from listing a college sport — should override the entire "athletes make great hires" genre, which is produced almost entirely by parties selling athlete recruiting. This does *not* mean cut the tennis captaincy. It means stop expecting it to do screening work and start using it for what it can actually do: supply concrete, verifiable, unfakeable evidence for a claimed trait, positioned after the work has already been evaluated (Finding 3.2's read order puts About last for a reason). "All-Conference honorable mention" and "7:32/mi" are good precisely because they're falsifiable numbers about persistence — the same argument the 14%→98% fine-tune makes in a different domain.

**Finally, the Brazilian dimension is under-exploited.** Findings 8.2 and 8.3 point in opposite directions on effort: a fully bilingual site is probably not worth the maintenance cost, but Brazilian identity and a shipped Brazilian-market product are a genuine differentiator into a hiring channel that is growing fast. The resolution is to make it **content, not infrastructure** — one English sentence that says he built and shipped a product for the Brazilian market and works in Portuguese and English — rather than a `/pt-br/` tree that will go stale by October.

---

## Confidence Assessment

| Finding | Confidence | Basis |
|---|---|---|
| HMs look at portfolio sites but they rarely change the decision (65% definitely / 93% likely look; impact scored 0–2/5) | **High** | Named survey of 60+ hiring managers, corroborated independently by practitioner statements on Blind |
| Portfolios matter most for new grads / career switchers / design roles | **High** | 3+ independent sources agree (profy.dev, Blind, techinterview.org) |
| Read order: click decision → visual quality → hero → work → About last | **Medium-High** | One detailed practitioner source, consistent with NN/G scanning research and UX Planet |
| Listing a college sport does not change callback rates | **High** | Randomized resume-audit field experiment, peer-reviewed (SAGE, 2023) — best methodology in corpus |
| Memorable sites work because the site demonstrates a specific capability | **High** | Consistent across all named exemplars (Simon, Fisher, Freiberg, Comeau, Luu, Chiang) |
| Heavy animation is largely unseen by reviewers and hurts mobile/SEO | **Medium-High** | 3 independent sources (Level Up Coding, UX Planet, HN 2026 thread) |
| Specific time-on-page numbers (3 min / 15 s / under a minute) | **Low** | Conflicting; only the 7.4 s *résumé* eye-tracking figure has real methodology, and it doesn't transfer |
| "78% of HMs prefer custom portfolios" / "84% want live demos" | **Low** | SEO content only, no traceable primary study — do not cite |
| Quantified metrics need a denominator and a mechanism or they read as inflated | **High** | Multiple independent résumé-advice sources converge on the same failure mode |
| Realistic cloud cost optimization band is 30–50%; a 97% cut needs its mechanism stated | **Medium-High** | 3+ independent FinOps/cloud sources agree on the band; the inference about reader skepticism is mine |
| Proof hierarchy: live demo > clean repo > video; <30 s repo evaluation window | **Medium-High** | 2 independent 2026 sources agree, consistent with general scan-time evidence |
| 2026 AI-hiring green flags: evals, quantified cost work, failure-mode handling, writing | **Medium-High** | 2 independent LLM-hiring guides list nearly identical criteria |
| 4–6 curated pinned repos; large uncurated repo counts dilute signal | **Medium-High** | 3 independent GitHub-sourcing/recruiting sources agree |
| Minimal viable section set (hero, about, 3–6 projects, writing, résumé, contact) | **Medium-High** | One detailed engineering-specific source, consistent with all portfolio literature |
| /now page has no demonstrated hiring value | **Medium-High** | Absence across the entire recruiter/HM corpus; Sivers' own stated value is internal, not external |
| /uses page has no demonstrated hiring value | **Medium** | Absence of evidence rather than evidence of absence |
| Plain email beats a contact form (67.3% choose email when both offered) | **Medium** | Repeated across form-vendor sources — note the source bias runs *against* this conclusion, which strengthens it |
| LLM-cadence copy is now a rejection trigger | **Medium** | Direction corroborated by HN developer sentiment; the 60–80% and 40% figures are vendor-sourced (Low individually) |
| Specific AI-tell vocabulary (delve, robust, tapestry, seamless, "unlock the potential") | **High** | 5+ independent lists name the same words |
| Specificity beats adjectives in hero/About copy | **High** | Converges from copywriting sources, portfolio reviewers, and NN/G credibility research |
| First person for personal-site About pages | **Medium** | Advisory consensus, no experimental data |
| Listing co-founder is a net plus; big-tech may read it as "generalist" | **Medium** | Multiple career sources agree on the plus; the big-tech caveat is a single source |
| Being a student is an asset to state | **Low-Medium** | Single reasoned source (founder newsletter), no data |
| Person schema + name domain + profile consistency helps you rank for your name | **Medium** | Multiple SEO sources agree on method; the "11/12 in 47 days" result is a single vendor claim (Low) |
| US demand for LatAm/Brazilian engineers up 250% YoY | **Medium** | Multiple independent vendors, but all have a commercial interest in the claim; magnitude suspect, direction credible |
| "80% of portfolios parsed by AI screening before a human" | **Low** | Single source, no methodology — do not rely on |
| Founder breadth reads as range rather than dabbling (Finding 7.4) | **Low** | My inference combining 2.1 + 2.4 + 7.1; not directly sourced |

---

## Open Questions

1. **No study isolates the causal effect of a *personal website* on callback rates.** The resume-audit methodology that settled the athletics question (Finding 2.2) has never, as far as this research found, been applied to portfolio URLs. Every claim about website impact is survey- or opinion-based. A/B testing his own applications — half with the URL in the header, half without — would produce better evidence than anything cited here.
2. **The believability threshold for the $1,000→$30 claim is unmeasured.** Finding 4.3 establishes that 97% is far outside the normal band, but whether stating the mechanism fully repairs credibility, or whether the number should be reframed entirely (e.g. "per-request inference cost down 97%"), is a judgment call. Worth testing on 3–5 senior engineers directly.
3. **Whether a Brazilian-market founder story helps or hurts US applications is genuinely unresolved.** Finding 8.3's channel is real but is largely about hiring engineers *in* Brazil, which is a different product from sponsoring a US-based new grad. Whether US hiring managers read "built a product for Brazilian companies" as impressive international shipping experience or as irrelevant-to-our-market is not answerable from the sources here.
4. **The AI-copy-detection numbers are all vendor-sourced.** The 60–80% and 40% figures come from companies selling detection or rewriting tools. The qualitative signal from developers is stronger evidence than the quantitative claims, but the actual prevalence and actual rejection rate are unknown.
5. **Nothing found addresses how reviewers weigh a company co-founded with a family member.** It could read as a genuine venture or as a family arrangement, and that distinction likely turns entirely on whether the product looks real to an outsider. This is a real risk with no evidence base; the mitigation is that imensiah.com.br must look like a company, not a project.
6. **The relative value of a *video* demo for non-frontend work is unclear.** Sources recommend video for repo evaluation, but no evidence addresses whether hiring managers actually watch them or whether the existence of one substitutes for a live demo.

---

## Sources

**Highest value / primary or best-methodology**
- [Paul, Cheng, Greene & McGee — The Value of College Athletics in the Labor Market: Results from a Resume Audit Field Experiment (SAGE, 2023)](https://journals.sagepub.com/doi/10.1177/15270025221123315)
- [profy.dev — Survey of 60+ hiring managers on portfolio websites (DEV mirror)](https://dev.to/profydev/this-survey-among-60-hiring-managers-reveals-don-t-waste-your-time-on-a-react-portfolio-website-17ge) · [original](https://profy.dev/article/portfolio-websites-survey)
- [Nielsen Norman Group — Great Summaries on 'About Us' Pages Engage Users](https://www.nngroup.com/articles/about-us-summaries/)
- [Nielsen Norman Group — 'About Us' Information on Corporate Websites](https://www.nngroup.com/articles/about-us-information-on-websites/)
- [Nielsen Norman Group — Concise, Scannable, and Objective: How to Write for the Web](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)
- [Ask HN: What makes a great personal website?](https://news.ycombinator.com/item?id=23694414)
- [Ask HN: Share your personal website (2026)](https://news.ycombinator.com/item?id=46618714)
- [Ask HN: Good Examples of Personal Websites](https://news.ycombinator.com/item?id=40989144)
- [Blind — How important is it to have a personal portfolio (hiring thread)](https://www.teamblind.com/post/hiring-how-important-is-it-to-have-a-personal-portfolio-sz564ms3)
- [techinterview.org — Personal Website and Portfolio for Engineers: When to Build One, When to Skip](https://www.techinterview.org/post/3233474627/personal-website-portfolio-engineers/)
- [OpenDoors Careers — How Recruiters and Hiring Managers Actually Look at Your Portfolio](https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio)

**Hiring signal, metrics, and proof artifacts**
- [genai.qa — Hire LLM Engineer 2026: Skills, Interview Questions, Portfolio Red Flags](https://genai.qa/blog/hire-llm-engineer-salary-skills-interview-2026/)
- [KORE1 — How to Hire LLM Engineers in 2026](https://www.kore1.com/hire-llm-engineers-2026/)
- [FACE Prep — AI Project Demo vs GitHub: Fresher Interviews 2026](https://faceprep.in/article/deploy-ai-project-streamlit-vs-github-for-fresher-interview-2026/)
- [RepoClip — How to Create a Demo Video for Your GitHub Project](https://repoclip.io/blog/how-to-create-demo-video-github-project)
- [Resumly — How to Organize GitHub Repos for Recruiter Review](https://www.resumly.ai/blog/how-to-organize-github-repos-for-recruiter-review)
- [GitShare — How Recruiters Actually Evaluate Your GitHub Profile](https://gitshare.me/blog/how-recruiters-actually-evaluate-your-github-profile)
- [Riem.ai — GitHub Recruiting: 9 Signals That Predict Engineering Quality](https://riem.ai/blog/github-recruiting-guide)
- [Resufluent — Quantify Resume Impact Honestly](https://resufluent.com/blog/how-to-quantify-impact-on-your-resume-without-lying)
- [Resume Optimizer Pro — Including Quantifiable Achievements](https://resumeoptimizerpro.com/blog/including-quantifiable-achievements-in-your-resume)
- [Resume Worded — How to Quantify Your Resume](https://resumeworded.com/how-to-quantify-resume-key-advice)
- [Northflank — 11 Cloud Cost Optimization Strategies for 2026](https://northflank.com/blog/cloud-cost-optimization)
- [CloudZero — How to Reduce Cloud Costs in 2026](https://www.cloudzero.com/blog/reduce-cloud-costs/)
- [Full Scale — Cloud Cost Optimization for Engineering Teams](https://fullscale.io/blog/cloud-cost-optimization/)
- [UX Planet — Why "Good" Portfolios Never Get Interviews in 2026 (11 Hiring Red Flags)](https://uxplanet.org/why-good-ux-portfolios-never-get-interviews-in-2026-11-hiring-red-flags-6ea28fb2f9b3)
- [Level Up Coding — Recruiters aren't clicking your portfolio](https://levelup.gitconnected.com/recruiters-arent-clicking-your-portfolio-they-re-looking-here-instead-c694c4606dc3)
- [Glassdoor Community — Do recruiters even look at portfolios?](https://www.glassdoor.com/Community/creatives/do-recruiters-even-look-at-portfolios-in-my-experience-they-dont-spend-more-than-15-seconds-looking-at-my-work-thats-not-enough)
- [HR Dive — Eye tracking study: recruiters look at resumes for 7 seconds](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/)
- [Mercy University Career — TheLadders eye-tracking summary](https://career.mercy.edu/blog/2019/11/08/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/)

**Positioning, specialization, and founder/student framing**
- [Joberty — Should You Specialize or Stay a Generalist in 2026?](https://www.joberty.com/blog/should-you-specialize-or-stay-a-generalist-in-2026/)
- [TieTalent — From Generalist to Specialist: How to Stand Out in Tech (2026)](https://tietalent.com/en/blog/256/generalist-to-specialist-career)
- [Puttylike — How To Brand Yourself as a Multipotentialite in a Way That Makes Sense to Conventional Employers](https://puttylike.com/how-to-brand-yourself-in-a-way-that-makes-sense-to-conventional-employers-and-clients/)
- [Noomii — Branding for Multipassionates](https://www.noomii.com/articles/15160-branding-for-multipassionates-build-a-personal-brand-that-reflects-your-passion)
- [VisualCV — Cofounder on Resume](https://www.visualcv.com/cofounder-on-resume/)
- [Skillcrush — 10 Things Your Resume Needs When Applying at Startups](https://skillcrush.com/blog/startup-resume/)
- [Underdog.io — How To Get Recruited By Startups: 2026 Guide](https://underdog.io/blog/how-to-get-recruited-by-startups)
- [Texts with Founders — The Student (Dis)Advantage](https://textswithfounders.substack.com/p/texts-with-founders-the-student-disadvantage)
- [mean.ceo — Building a Personal Website as a Startup CEO](https://mean.ceo/startup-blog/tpost/building-personal-website-startup)
- [Grinnell College Careers — Why College Athletes Make Great Employees](https://career.grinnell.edu/blog/2023/08/15/the-winning-advantage-why-college-athletes-make-great-employees/)
- [Northeastern — Student-athletes and employer value (2025)](https://news.northeastern.edu/2025/01/17/student-athletes-employer-value)

**Voice, AI-copy fatigue, and About-page craft**
- [Grammarly — Common AI Words and Phrases](https://www.grammarly.com/blog/ai/common-ai-words/)
- [Content Beta — List of 300+ AI Words and Phrases to Avoid (2026)](https://www.contentbeta.com/blog/list-of-words-overused-by-ai/)
- [Walter Writes — Most Common ChatGPT Words to Avoid in 2026](https://walterwrites.ai/most-common-chatgpt-words-to-avoid/)
- [Olivia Cal — How to Spot AI Writing Tells: 17 Examples + Blacklist 2026](https://www.oliviacal.com/post/ai-writing-tells)
- [Stackedo — Top Worst AI Writing Clichés](https://stackedo.com/ai-writing-cliches-to-avoid/)
- [ResumePulse — Hiring Managers Now Reject AI Resumes On Sight (2026)](https://resumepulse.ai/blog/hiring-managers-reject-ai-resumes-2026)
- [Hirewell Talent Insights — AI-on-AI Hiring: Fighting Workslop & Resume Fraud in 2026](https://talentinsights.hirewell.com/blog/ai-hiring-arms-race-workslop-resume-fraud-2026)
- [Curious Page — Best About Me Page Examples for Inspiration (2026)](https://curious.page/blog/best-about-me-page-examples-inspiration)
- [CLIMB — Should a Professional Bio Be in Third Person?](https://climbtheladder.com/should-a-professional-bio-be-in-third-person/)
- [Phil Adams — First person biographies](https://philadams.co/2023/03/first-person-biographies/)

**Sections, contact, /now**
- [Derek Sivers — How and why to make a /now page](https://sive.rs/now2)
- [nownownow.com — About](https://nownownow.com/about)
- [WPForms — Contact Form vs Email Address](https://wpforms.com/contact-form-vs-email-address-which-is-better/)
- [MRW Web Design — The Email Address vs. Contact Form Debate](https://mrwweb.com/email-address-contact-form-debate/)
- [OpenDoors Careers — How to Write a Strong Case Study for Your Portfolio](https://blog.opendoorscareers.com/p/how-to-write-a-strong-case-study-for-your-portfolio-in-2025-a14b)

**Named exemplar sites**
- [Lynn Fisher — lynnandtonic.com](https://lynnandtonic.com/) · [rachsmith on Lynn Fisher](https://rachsmith.com/the-incredible-websites-of-lynn-fisher/) · [web.dev community highlight](https://web.dev/blog/community-highlights/lynn-fisher)
- [Rauno Freiberg — rauno.me](https://rauno.me/)
- [Josh W. Comeau — joshwcomeau.com/about-josh](https://www.joshwcomeau.com/about-josh/)
- [Brittany Chiang — brittanychiang.com](https://brittanychiang.com/)
- [Dan Luu — danluu.com](https://danluu.com/)
- [Gitstar-OC/Developer-Portfolio — curated list of engineer portfolio sites](https://github.com/Gitstar-OC/Developer-Portfolio)
- [Elementor — Best Web Developer Portfolio Examples (Bruno Simon et al.)](https://elementor.com/blog/best-web-developer-portfolio-examples/)

**SEO, bilingual, international**
- [Reputation X — Person Schema for Bio Pages & SEO](https://www.reputationx.com/blog/person-biography-schema)
- [Reputation Rhino — Person Schema Markup](https://www.reputationrhino.com/person-schema-markup/)
- [Media Village — Personal Brand SEO: How to Rank for Your Name](https://www.media-village.co.uk/marketing/personal-brand-seo-guide/)
- [ConveyThis — How to Create a Bilingual Website](https://www.conveythis.com/blog/how-to-create-a-bilingual-website-guide)
- [Pixpa — How to Create a Multilingual Portfolio Website](https://www.pixpa.com/blog/how-to-create-a-multilingual-portfolio-website)
- [SEO Tuners — GEO Best Practices 2026](https://seotuners.com/blog/generative-engine-optimization/generative-engine-optimization-best-practices/)
- [Text.com — How to Optimize Your Website for AI Search & LLM SEO in 2026](https://www.text.com/blog/ai-website-optimization/)
- [NACE — International Student Employment: Visa Sponsorship Questions](https://www.naceweb.org/public-policy-and-legal/legal-issues/international-student-employment-answering-questions-about-the-need-for-employment-visa-sponsorship/)
- [NYU — Navigating Conversations with Employers about Work Authorization](https://www.nyu.edu/students/student-information-and-resources/student-visa-and-immigration/current-students/employment-and-tax/navigating-conversations-with-employers-about-work-authorization.html)
- [University of Michigan — US Employer's Guide to Hiring International Students](https://careercenter.umich.edu/article/us-employers-guide-hiring-international-students)
- [Near — Hiring in Brazil: What US Companies Need to Know in 2026](https://www.hirewithnear.com/blog/hiring-remote-talent-in-brazil)
- [Revelo — Hire Software Developers in Brazil](https://www.revelo.com/blog/hire-software-developers-in-brazil)
- [BEON.tech — Hire Brazilian Engineers in 2026](https://beon.tech/blog/tech-recruitment-in-brazil-hire-brazilian-tech-talent/)

---

## RECOMMENDED SITE ARCHITECTURE FOR RENATO

**Format:** one page, sectioned, with two or three deep sub-pages for the case studies that deserve them. Not a multi-page site with a nav bar of eight items. Budget: a weekend, not a month (Finding 5.1).

### Ordered sections

1. **Hero — name + one positioning sentence + one line of proof + email.**
   Must state what kind of engineer he is, not that he is a student with interests. Something in the shape of: *"I build AI systems that hold up in production. Co-founder and lead engineer at IMENSIAH, where multi-model failover keeps strategic analysis running for Brazilian companies when a provider goes down."* Then `renatodaprado@gmail.com` visible immediately.
   *Justification:* the hero is scanned for positioning and fit before anything else (F3.2), and "role clarity" is one of the three things reviewers are optimizing for in under a minute (F3.2). Vague passion lines are explicitly identified as table stakes that position nothing (F6.3).

2. **The work — 4 projects, IMENSIAH first, each with role, one-line problem, the hard part, and a live link.**
   Order: IMENSIAH → AllAboutFood → LLM Error Classification → Accumulate. Each gets: what it does, *the specific hard problem*, the outcome number **with its mechanism**, and a working link.
   *Justification:* work samples are step 4 of 5 in the read order and are where interest is actually decided (F3.2); 3–6 substantive projects with context and technical decisions is the agreed core (F5.1); a one-click live demo is the highest-weight proof artifact (F4.4).

3. **Two deep case studies — IMENSIAH and AllAboutFood — as their own pages.**
   Structure each as problem → constraint → options considered → decision and trade-off → outcome. Roughly 800–1,500 words. The IMENSIAH one must foreground the failover routing; the AllAboutFood one must foreground the cost mechanism.
   *Justification:* "handling of LLM failure modes" and "cost optimization with quantified savings" are named 2026 AI-hiring green flags, and the diagnostic question managers are told to ask is literally about an API call that failed in a way that mattered (F4.5). Constraint handling is one of the three things reviewers scan for (F3.2). Depth here is also the direct answer to the depth-over-breadth market shift (F2.1).

4. **Selected repos — 4 to 6, pinned and curated, each with one sentence of "why this exists."**
   Replace the "60+ repos" line entirely.
   *Justification:* uncurated repo volume "dilutes your signal" and 4–6 aligned repos that tell a coherent story is the stated target; everyone reads the README (F5.7).

5. **Writing — 2 to 4 real technical posts, or omit this section entirely until they exist.**
   The obvious three he already has the material for: the cost-reduction teardown, the multi-model routing design, and the 14%→98% fine-tune writeup. Do not ship an empty blog.
   *Justification:* published technical writing about real challenges is a named AI-hiring green flag (F4.5), and the profy.dev survey's actual recommendation is to move effort from portfolio polish into writing and READMEs (F5.6). But stale/unfinished content is an explicit red flag (F5.4).

6. **About — first person, with the through-line, and *then* the breadth.**
   This is where tennis, running, seven instruments, Brazil, and the father-son founding story go. Anchor all of it to the line he already wrote: *"Music and code work the same way for me: start with something rough, find the pattern, clean it up until it clicks."* Include a photo. One factual line on work authorization (F-1 OPT, no employer cost) if he wants it public.
   *Justification:* the About page is visited last, only after work is judged good, and that is exactly where personal material does useful humanizing work rather than diluting positioning (F2.3, F3.2). Breadth needs one unifying thread rather than a menu (F2.4). First person is right for a personal site (F6.4). Be direct but not loud about visa status (F8.4).

7. **One musical artifact, embedded, inside About — not a separate section.**
   One song, one embed. Not a six-image mosaic and not a peer section to the engineering work.
   *Justification:* the closest thing to causal evidence says extracurricular signals don't move callbacks (F2.2), and engineering-focused advice says to cut music projects unless they demonstrate a relevant trait (F2.3). One embed proves the through-line is real; a whole section competes with the work.

8. **Footer — email, GitHub, LinkedIn, résumé PDF download, YouTube/Spotify.**
   *Justification:* users go straight to the footer whenever the nav fails them (F3.4); a downloadable PDF is needed because ATS cannot parse web pages (F5.2); a plain email address beats a form 67/33 and reads as a trust signal (F5.3).

9. **Invisible layer — Person JSON-LD (`jobTitle`, `worksFor` → IMENSIAH, `sameAs` → GitHub/LinkedIn/Spotify/YouTube), real HTML text, semantic headings, sub-second load, GPTBot/PerplexityBot allowed in robots.txt.**
   *Justification:* name-domain + schema + profile consistency is the mechanism for ranking on your own name (F8.1); machine readability is cheap insurance regardless of how much AI screening is really happening (F8.5); speed is the enabler for everything else (F1.3).

### What to CUT

- **A `/now` page.** Zero demonstrated hiring value; its documented benefit is internal priority-setting, and a stale one is an active red flag while job-hunting. (F5.4)
- **A `/uses` page.** Not mentioned once in any recruiter, hiring-manager, or portfolio-review source in this entire corpus. It signals in-group membership to other developers, not to reviewers. (F5.5)
- **"60+ repos on GitHub."** Volume reads as noise in a market that screens for curation. Replace with 4–6 pinned repos that tell one story. (F5.7)
- **Skill bars / percentage proficiency grids / tech-logo walls.** Explicitly named as things to avoid. (F5.1)
- **A `/pt-br` locale tree.** Doubles maintenance, will go stale, and no evidence links bilingual sites to hiring outcomes in the primary market. Keep Brazil as *content* — one sentence about shipping a product for the Brazilian market and working in both languages — not as infrastructure. (F8.2, F8.3)
- **A contact form.** Two-thirds of people prefer the plain address, and the form's only real advantage (lead qualification) doesn't apply here. (F5.3)
- **Heavy scroll-linked animation as the site's primary identity.** Keep at most one signature moment that costs nothing to load; the current dark-theme + grain direction is fine, but reviewers largely won't see elaborate motion and it costs mobile performance and OpenGraph/SEO. (F1.2)
- **The music photo mosaic as a standalone section.** Collapse to one embed inside About. (F2.2, F2.3)
- **An empty or three-post blog.** Either write the three posts he already has material for, or omit the section. (F5.6)

### The single strongest positioning angle

> **"I build AI systems that survive production — and I have the failure-mode, cost, and evaluation numbers to prove it."**

**Reasoning.** The 2026 market is paying a 17–28% premium for depth and reading breadth-without-depth as a plateau signal (F2.1), so a hero that leads with "student / athlete / musician" is a positioning error even though every word is true. Meanwhile, the published green-flag list for AI-engineering candidates is: production deployment, **evaluation results with specific metrics**, **cost optimization with quantified savings**, **handling of LLM failure modes**, and technical writing about real problems — and the diagnostic question hiring managers are told to ask is for *"one project where the hard problem was not 'call the API' but 'the API call failed in a way that mattered'"* (F4.5). Renato does not have to construct this position. He already shipped all four pieces of it: multi-model failover routing (failure modes), $1,000→$30 (cost), 14%→98% with halved GPU memory (evaluation), Merkle-proof verification against mainnet (correctness under adversarial conditions). Almost no new grad has that specific combination, and most who claim AI experience have notebooks and tutorial chatbots — the named red flags.

The founder line is what makes the rest legible. A student with many interests is unfocused; a **founder** who is also a team captain and a self-taught multi-instrumentalist reads as range under ownership, because founding something reframes breadth as a trait rather than as dabbling (F7.1, F7.4). And the through-line he already wrote — *"start with something rough, find the pattern, clean it up until it clicks"* — is the honest description of all of it: the fine-tune that started at 14%, the cloud bill that started at $1,000, the seventh instrument. **Use it as the closer in About, never as the hero.** Leading with the metaphor sells a personality; leading with the systems sells an engineer and then the metaphor explains him.

Two supporting moves: (a) state the mechanism next to the $1,000→$30 number in the same breath, because 97% is roughly double the ceiling engineers consider plausible and the bare number will read as inflated (F4.3); (b) keep the Brazilian dimension as an explicit asset — shipped a real product into the Brazilian market, works in Portuguese and English — rather than something to neutralize, given how fast the US→LatAm engineering channel is growing (F8.3).

### Banned words and phrases

These must not appear anywhere in the copy. They are the highest-signal LLM tells, and in 2026 LLM cadence is a fast-rejection trigger rather than a neutral (F6.1, F6.2):

1. **"passionate about"** — and every variant ("driven by a passion for," "I love building"). Everyone cares; it positions nothing (F6.3).
2. **"cutting-edge"** / **"state-of-the-art"** — top-tier AI tells and hollow marketing language that NN/G specifically flags as credibility-destroying on bio pages.
3. **"seamless"** / **"seamlessly"** — one of the most-flagged AI adjectives; also unfalsifiable, which is the opposite of what this site needs.
4. **"leverage" / "leveraging"** — use "used" or the actual verb. Named repeatedly across AI-tell lists and it always replaces a more specific word.
5. **"delve into" / "dive into" / "at its core"** — the canonical ChatGPT transition set. "Let's dive in" is called out by name.
6. **"in today's fast-paced [world/landscape]" / "in the ever-evolving landscape of"** — the single most recognizable AI opener.
7. **"a testament to" / "unlock the potential"** — pure filler; both appear on every published tell-list.

One structural rule alongside the vocabulary: **vary sentence length deliberately.** Uniform rhythm is itself an AI tell independent of word choice — machine prose "varies technically but doesn't vary rhythmically" (F6.2). His existing intro line already does this correctly, which is why it works.

**What to keep from the current copy:** the existing `INTRO` and the music/code through-line are genuinely good — concrete, first-person, unfakeable, zero banned words. The problem is not the writing quality; it is that the breadth is currently occupying the positioning slot that the engineering work needs.
