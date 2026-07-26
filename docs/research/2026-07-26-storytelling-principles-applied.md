# The fundamental principles of a well-told story — and how they apply to a personal website that is not a narrative medium

**Date:** 2026-07-26
**Type:** Deep research (orchestrator-worker, 5 phases)
**Status:** complete
**Supersedes on story grounds:** the content order in `docs/superpowers/specs/2026-07-25-personal-site-redesign-design.md` §3

---

## Summary

Across every serious framework, only three things survive as genuinely load-bearing: **causal connection** (events must be linked by *because*, not *and then*), **a gap between expectation and result** that forces a revelation, and **change in state by the end**. Everything else — three acts, the hero's journey, rising action, the ordeal, the return — is genre convention wearing the costume of a universal. A personal calling card cannot satisfy the strict unit of story (a subject who wants something, is resisted, and is transformed), because its subject is one continuous person and nothing is at stake on the page. What replaces it is well-evidenced and stronger for this purpose: **the change happens in the viewer, not the subject**, and it happens by inference rather than by telling. Non-narrative forms that already work this way — photobook sequencing, lyric essay, museum exhibition, environmental storytelling in games — all run on the same engine: place two things next to each other, leave the connection out, and let the viewer generate it. Self-generated conclusions are remembered measurably better than supplied ones, which is exactly the success criterion this site is optimising for ("describe him a week later without looking").

For this specific site, that yields one recommendation with unusual confidence: **the childhood/adult drawing pairs are the spine, not a device**, and the Peter Pan drawing is the ending — the single childhood image with no adult counterpart, placed last, unlabelled, with the drawing's own notation saying `ITEM 00 — ORIGINAL PART. NO REVISIONS.` The viewer supplies the sentence Renato has forbidden anyone to write.

---

# PART A — THE RESEARCH

## A1. The load-bearing principles: what the frameworks actually agree on

I looked for the intersection, not the union. When you overlay Aristotle, Freytag, Campbell, Vogler, McKee, Pixar, Vonnegut, Butler and Stein, most of the surface disagrees and a small core does not.

**What survives everywhere:**

**1. Causal necessity, not sequence.** Aristotle's requirement is that a plot be "a complete whole, with a beginning, middle, and end… the events being ordered in a necessary and probable sequence," and his definition of a beginning is precisely something that "does not itself follow anything by causal necessity, but after which something naturally is or comes to be" ([Poetics ch. VII, monadnock.net](https://monadnock.net/aristotle/poetics-7.html); [SparkNotes on Poetics 7–9](https://www.sparknotes.com/philosophy/poetics/section4/)). Twenty-three centuries later Trey Parker and Matt Stone reduce the same idea to a diagnostic: if the beats of your outline are joined by "and then," you have a sequence; you need "but" or "therefore" between them. "A sequence of events doesn't make a story. The causality between events — the 'and therefore's — and the conflict between events — the 'but's — are the key ingredients" ([Breaking the Rules](https://breakingtherules.substack.com/p/the-south-park-technical-writing); [Impactful Speaking](https://impactfulspeaking.substack.com/p/why-some-stories-are-boring-and-how)). Pixar's rule 4 encodes it structurally: "Once upon a time there was ___. Every day, ___. One day ___. **Because of that**, ___. **Because of that**, ___. Until finally ___" ([Pixar's 22 Rules, Aerogramme](https://www.aerogrammestudio.com/2013/03/07/pixars-22-rules-of-storytelling/)). **Confidence: High.** This is the one principle no framework contradicts.

**2. A gap between what was expected and what happened.** McKee: "the substance of story is the gap that splits open between what a human being expects to happen when he takes an action and what really does happen"; he goes further — "the break between the cause as it seemed and the effect as it turns out marks the point where the human spirit and the world meet… In this gap is the nexus of story" ([McKee Seminars](https://mckeestory.com/the-gap-between-expectation-and-result/); [Emily Short's summary](https://emshort.blog/2019/02/05/story-robert-mckee/)). Aristotle's *peripeteia* (reversal) and *anagnorisis* (recognition) are the same gap named twice. **Confidence: High.**

**3. Change in value-state by the end.** Campbell's monomyth reduces, in his own framing, to "the transformation of consciousness via trials" ([Jane Friedman, Classic Story Structures](https://janefriedman.com/story-structure/)). The Reagan et al. corpus study operationalised change as measurable emotional valence and found that 1,700+ works from Project Gutenberg resolve into six arcs — rise, fall, fall-rise, rise-fall, rise-fall-rise, fall-rise-fall — with the most-downloaded works following Icarus and Oedipus shapes or complex compounds of them ([MIT Technology Review](https://www.technologyreview.com/2016/07/06/158961/data-mining-reveals-the-six-basic-emotional-arcs-of-storytelling/); [Reagan et al., EPJ Data Science 2016](https://cdanfort.w3.uvm.edu/research/2016-reagan-epj.pdf)). Note what this study actually proves and doesn't: it proves that *emotional trajectory* has a small number of shapes; it does not prove those shapes cause quality or that plot events are required to produce them. **Confidence: High for "state must differ at the end," Medium for the six-arc taxonomy as prescription.**

**4. Character is revealed by choice under pressure, never by description.** McKee's distinction between *characterization* (surface traits) and *true character*: "True character is revealed in the choices a human being makes under pressure — the greater the pressure, the deeper the revelation" ([Goodreads, from *Story*](https://www.goodreads.com/quotes/647959-true-character-is-revealed-in-the-choices-a-human-being); [Karen Woodward's analysis](https://blog.karenwoodward.org/2014/08/robert-mckee-and-characterization-vs-character.html)). Pixar 1 and 13 restate it — "You admire a character for trying more than for their successes"; "Give your characters opinions. Passive/malleable might seem likable to you as you write, but it's poison to the audience." Vonnegut's rule 6 ("Be a Sadist") is the same principle from the writer's side ([Gotham Writers](https://www.writingclasses.com/toolbox/tips-masters/kurt-vonnegut-8-basics-of-creative-writing)). **Confidence: High.**

**5. Compression, and a magnitude memory can hold.** Aristotle again: beauty "depends on magnitude and order… a length which can be easily embraced by the memory" ([Poetics ch. VII](https://monadnock.net/aristotle/poetics-7.html)). Pixar 5 ("Simplify. Focus. Combine characters. Hop over detours. You'll feel like you're losing valuable stuff but it sets you free") and 22 ("What's the essence of your story? Most economical telling of it?"). Vonnegut 1 ("Use the time of a total stranger in such a way that he or she will not feel the time was wasted") and 5 ("Start as close to the end as possible"). **Confidence: High.**

**What is genre convention masquerading as a universal:**

- **The three-act structure and Freytag's five-part pyramid.** Freytag derived his pyramid from Greek and Shakespearean *tragedy* specifically; it is a description of one dramatic tradition retrofitted as a law ([Scribophile](https://www.scribophile.com/academy/what-is-freytags-pyramid); [Jane Friedman](https://janefriedman.com/story-structure/)). It has no explanatory power over lyric, episodic, or associative forms.
- **The hero's journey beat list.** Campbell's *transformation* claim generalises; his seventeen stages, the Refusal of the Call, the Meeting with the Mentor, the Belly of the Whale, do not. Vogler's twelve-stage screenwriting adaptation is a Hollywood house style, not an anthropological finding.
- **"Show, don't tell" as an absolute.** See A3 — the useful version is much narrower than the slogan.
- **Suspense as a requirement.** Vonnegut's rule 8 flatly contradicts it: "Give your readers as much information as possible as soon as possible. To hell with suspense" ([Gotham Writers](https://www.writingclasses.com/toolbox/tips-masters/kurt-vonnegut-8-basics-of-creative-writing)). Two respected practitioners give opposite advice, which is the definition of a convention rather than a principle.
- **The rules themselves.** Emma Coats has said she wishes she had called the Pixar list "guidelines," and it was never institutionally "Pixar's" ([Prolost analysis](https://prolost.com/blog/2013/12/4/pixars-22-rules-of-story-analyzed.html)).

**Net:** the durable core is four items — *because* not *and then*; a gap between expectation and result; a different state at the end; character shown through choice. Everything with a numbered beat sheet attached is optional.

## A2. Change is the unit of story — and what "storyless" forms do instead

The claim to test: story = someone wants something, meets resistance, is changed.

**The claim is well supported as a definition of story.** Robert Olen Butler builds an entire pedagogy on it, proposing "that fiction is the exploration of the human condition with yearning as its compass" and reinterpreting the traditional craft tools "using the dynamics of desire"; his position is that all literary fiction must come from characters driven by yearning, and "one way to understand plot is that it represents the dynamics of desire" ([Grove Atlantic](https://groveatlantic.com/book/from-where-you-dream/); [Fiction Writers Review interview](https://fictionwritersreview.com/interview/fuck-sentimentality-an-interview-with-robert-olen-butler/)). Vonnegut's rule 3 is the compressed version: "Every character should want something, even if it is only a glass of water" ([Gotham Writers](https://www.writingclasses.com/toolbox/tips-masters/kurt-vonnegut-8-basics-of-creative-writing)). **Confidence: High** — as a definition of *story*.

**But "narrative" and "story" are not the same thing, and the difference is exactly where the useful answer lives.** Photobook criticism has made this distinction explicit, borrowing Ingrid Sundberg's framing: "the juxtaposition of images can spark a narrative relationship in the viewer's mind. […] **There is no sequence of events, thus no story**" ([Conscientious Photography Magazine, *Photography and Narrative* pt. 2](https://cphmag.com/narrative-2/)). Narrative is the *structure that produces inference*; story is one particular payload that structure can carry. A form can have the first without the second.

**Forms that get narrative effect without desire/obstacle/change:**

- **The lyric essay.** Deborah Tall and John D'Agata's founding definition is the clearest statement of the alternative engine in any medium: "It depends on gaps…. It is suggestive rather than exhaustive"; it "often accretes by fragments, taking shape mosaically — its import visible only when one stands back and sees it whole"; it "might move by association, leaping from one path of thought to another by way of imagery or connotation, advancing by juxtaposition"; and critically, "while it is ruminative, it leaves pieces of experience undigested and tacit, **inviting the reader's participatory interpretation**" ([Seneca Review](https://senecareview.hws.edu/the-lyric-essay)). Elsewhere in the same tradition: "storyless, it may spiral in on itself, circling the core of a single image or idea, without climax, without a paraphrasable theme" ([Writers.com](https://writers.com/lyric-essay)).
- **Montage.** The Kuleshov experiment demonstrated that "meaning in film is not solely inherent in individual shots but is significantly generated through their arrangement and sequential juxtaposition"; Eisenstein extended it to dialectic — "the collision of two separate shots creates a new idea" ([Media Studies on Eisenstein](https://media-studies.com/eisenstein-montage/); [Humanities LibreTexts](https://human.libretexts.org/Courses/Nashville_State_Community_College/Tokyo_in_Film/04:_Post-Production/4.03:_Editing_and_Animation/4.3.02:_Soviet_Montage_And_The_Kuleshov_Effect)).
- **Comics.** Scott McCloud names the mechanism directly: closure is "observing the parts, but perceiving the whole," and "in the limbo of the gutter, human imagination takes two separate images and transforms them into a single idea." Closure is "an active choice, a leap taken voluntarily by the reader" ([Understanding Comics, ch. 3 summaries](https://understandingcomics177.wordpress.com/about/1-2/2-2/); [The Patron Saint of Superheroes](https://thepatronsaintofsuperheroes.wordpress.com/2016/01/11/what-it-really-takes-to-get-from-here-to-there-analyzing-comics-101-closure/)).
- **Documentary portraiture.** Cinéma vérité builds character with no plot at all, by observation — *Salesman*, *Portrait of Jason* — "revealing character through action and reaction rather than exposition" ([Collider](https://collider.com/best-cinema-verite-movies-ranked/); [PBS Independent Lens](https://www.pbs.org/independentlens/blog/cinema-verite-the-movement-of-truth/)).

**The shared engine.** In all four, the author supplies *materials and adjacency*; the audience supplies *the connective proposition*. And there is empirical reason to prefer that arrangement when memory is the goal: the **generation effect** is the robust finding that "self-generated information is better recognized and recalled than read information," with a meta-analytic recall benefit around *d* = 0.40, replicated across stimulus types, generation tasks and retention intervals ([Frontline Learning Research](https://journals.sfu.ca/flr/index.php/journal/article/view/407); [Bertsch et al. meta-analysis, *Memory & Cognition*](https://link.springer.com/article/10.3758/BF03193441); [Psychonomic Bulletin & Review meta-analytic review](https://link.springer.com/article/10.3758/s13423-020-01762-3)). Generating under *fewer* constraints increases the effect ([Memory & Cognition, generation constraint](https://link.springer.com/article/10.3758/s13421-020-01119-0)).

**Answer to the sub-question:** desire/obstacle/transformation is necessary for *story* and not necessary for *narrative effect*. The substitute is a deliberately withheld connection between two concrete things, closed by the audience. **Confidence: High** for the craft claim (four independent traditions converge), **High** for the generation effect, **Medium** for the inference that the generation effect transfers cleanly from word-list experiments to visual/interpretive inference on a web page.

## A3. Specificity, concrete detail, and the honest version of "show don't tell"

**The empirical floor.** The concreteness effect is one of the older reliable findings in memory research: concrete words are recalled and recognised better than abstract ones. Paivio's dual coding account is that "concrete concepts are coded by both a verbal and an image system, whereas abstract concepts are coded only by the verbal system," giving concrete material two retrieval paths instead of one; blocking imagery experimentally eliminates the advantage, which is direct evidence for the mechanism ([ScienceDirect, word concreteness and recognition memory](https://www.sciencedirect.com/science/article/abs/pii/S1053811906006781); [PeerJ preprint replication](https://peerj.com/preprints/2719v1.pdf)). **Confidence: High.**

**The persuasion layer.** Green and Brock's transportation theory defines narrative transportation as "the experience of being carried away by a narrative," constituted by focused attention, emotional engagement, **mental imagery**, and detachment from the immediate environment. Transported readers counterargue less, engage less critically with content, and shift attitudes toward the narrative ([Transportation theory, Wikipedia summary of Green & Brock 2000](https://en.wikipedia.org/wiki/Transportation_theory_(psychology)); [Green & Appel 2024 advances preprint](https://www.mcm.uni-wuerzburg.de/fileadmin/06110300/2024/Pdfs/Green___Appel__2024__Advances_Preprint.pdf)). The transportation-imagery model makes imagery the mediating pathway, which is the same mechanism as dual coding arriving from a different literature. Braddock and Dillard's meta-analysis puts numbers on the downstream effect: narratives shift beliefs (*r* = .17, k = 37), attitudes (*r* = .19, k = 40), intentions (*r* = .17), and behaviours (*r* = .23) ([Communication Monographs 83(4)](https://www.tandfonline.com/doi/abs/10.1080/03637751.2015.1128555); [Penn State record](https://pure.psu.edu/en/publications/meta-analytic-evidence-for-the-persuasive-effect-of-narratives-on)). These are modest but real effects. **Confidence: High** for direction, **Medium** for magnitude transferring to a one-page website.

**The craft version, stated better than "show don't tell."** Sol Stein's term is **particularity**: "the detail that differentiates one person from another, one act from another, one place from any others like it." His example is the exact move — instead of "Vernon was a heavy smoker," write "When a waitress heard Vernon's voice she always guided him to the smoking section without asking" ([Absolute Write on *Stein on Writing*](https://absolutewrite.com/2019/01/14/sol-stein-stein-on-writing-1995/); [Bobby Powers summary](https://bobbypowers.com/sol-steins-top-13-writing-tips/)). Stein pairs it with a constraint that matters here: the reader's experience is "an envelope," and "it is a mistake to fill it with so much detail that little or nothing is left to the reader's imagination."

**The critics are right about the slogan.** The consistent critique is not that showing is wrong but that the absolutised version produces verbosity, pacing collapse, and obscured meaning — writers "terrified of bad telling" leave the point of the scene off the page entirely ([Storm Writing School](https://stormwritingschool.com/the-problem-with-show-dont-tell/); [Writer's Digest, *Bad Advice Boogie*](https://www.writersdigest.com/write-better-fiction/bad-advice-boogie-show-dont-tell)). **Confidence: High** that the absolute form is wrong.

**The defensible rule that comes out of all of this, and the one I will use in Part B:** *tell the facts, show the trait.* Facts (where he lives, what his job is, that there are seven instruments) should be stated flatly and immediately — telling is efficient and honest for these. Traits, character, and anything self-flattering must be shown, because a stated trait is both less memorable (abstract, single-coded) and less credible (see A7).

## A4. Structure and sequence — the promise, the withholding, the landing

**Order is the content.** McKee's formulation, quoted approvingly across the craft literature, is that "structure doesn't just carry content; it is content" ([Jane Friedman](https://janefriedman.com/story-structure/)).

**The promise made in the opening.** Barthes' **hermeneutic (enigma) code** is the formal name for it: "any element of a text that is not fully explained; this becomes a mystery to the audience," and "most stories hold back details in order to increase the effect of the final revelation" ([Media Studies, Barthes' codes](https://media-studies.com/barthes-codes/); [NUS, Five Codes of Roland Barthes](https://courses.nus.edu.sg/course/elljwp/5codes.htm)). The psychological substrate is Loewenstein's **information-gap theory**: curiosity is "a cognitive induced deprivation that arises from the perception of a gap in knowledge and understanding," and crucially, the gap must be *salient* — "a small amount of information serves as a priming dose that greatly increases curiosity," which is why partial knowledge motivates more than total ignorance ([Psychology Fanatic on Loewenstein 1994](https://psychologyfanatic.com/information-gap-theory/); [Kidd & Hayden, *Neuron*](https://www.sciencedirect.com/science/article/pii/S0896627315007679)). **Design consequence: an absence only creates curiosity if you can see that something is missing.** A blank is not a gap; a numbered slot with nothing in it is a gap.

**Setup and payoff.** Chekhov's gun is the discipline: "the setup is showing the gun in act one, and the payoff is firing it in act three," and in Snyder's beat sheet the plant appears just after the Opening Image and must fire before the Final Image ([StudioBinder](https://www.studiobinder.com/blog/chekhovs-gun/); [Britannica](https://www.britannica.com/topic/Chekhovs-gun); [Arcadia](https://www.byarcadia.org/post/crafting-a-story-finale-the-chekhov-s-gun-principle)). Pixar 7 makes the same point about process: "Come up with your ending before you figure out your middle. Seriously. Endings are hard, get yours working up front" ([Aerogramme](https://www.aerogrammestudio.com/2013/03/07/pixars-22-rules-of-storytelling/)).

**Why the ending is disproportionately load-bearing.** This is the strongest empirical result in this whole report for a calling card, because it speaks directly to *memory of the experience* rather than the experience itself. Kahneman and Fredrickson's **peak-end rule**: memory of an episode is dominated by its most intense moment and its final moment, and duration is largely ignored. In the 1993 cold-pressor study, 80% of participants preferred to repeat the *longer, objectively worse* trial because it ended slightly warmer. NN/g's gloss: "A small improvement near the end of an experience radically shifted people's perception of that event" ([Nielsen Norman Group, The Peak–End Rule](https://www.nngroup.com/articles/peak-end-rule/); [Positive Psychology overview](https://positivepsychology.com/what-is-peak-end-theory/)). Applied to narrative: "A two-hour film with one shattering moment and a strong final scene will be remembered more fondly than a four-hour film of consistently high quality with a flat finish" ([SUE Behavioural Design](https://www.suebehaviouraldesign.com/en/blog/peak-end-rule-at-work/)). **Confidence: High.**

**What makes closure feel like closure.** The Gestalt principle of closure — the mind's drive to complete incomplete forms — is the standard explanation for why unresolved endings keep working on people after the fact, and resolution is described as a measurable reduction of the cognitive tension held by open questions ([EndingLog, psychology of plot closure](https://endinglog.com/the-psychology-of-plot-closure-why-some-endings-haunt-us-more-than-others/); [Beverly Boy](https://beverlyboy.com/film-technology/endings-that-stay-with-us-psychology-behind-story-closure/)). **Confidence: Medium** — these are secondary sources synthesising rather than primary experiments, and I'd treat the specific mechanism claims as plausible rather than established. Aristotle's structural version is safer and says the same thing: "an end naturally follows some other thing… but has nothing following it" ([Poetics ch. VII](https://monadnock.net/aristotle/poetics-7.html)).

## A5. Non-linear and spatial narrative — how story happens without a plot

*This is the section that matters most for Part B, so it gets the most weight.*

**Museums: the visitor narrativises whether or not you plan it.** The strongest finding in curatorial theory for our purposes is that narrative is not optional — it is the default output of a visitor moving through a space. Exhibitions "are perceived as narratives by visitors, whether the curatorial or educational team planned it or not," and — decisive for a non-linear layout — "exhibitions where the visitor is invited to circulate freely do not mean that no narrative will be constructed on the part of the visitor between the different parts of the exhibition" ([Sitzia, *Narrative Theories and Learning in Contemporary Art Museums*, Stedelijk Studies](https://stedelijkstudies.com/journal/narrative-theories-learning-contemporary-art-museums-theoretical-exploration/)). The same source invokes Schank's principle that "storytelling and understanding are functionally the same thing," and Barthes' claim that narrative "is present at all times, in all places, in all societies."

David Francis's UCL doctoral thesis *Excavating Freytag's Pyramid: Narrative, identity and the museum visitor experience* studied three British Museum blockbusters (2013–2015) by interviewing both the professionals *encoding* narrative into exhibitions and the public *decoding* it, using Barthes and Bakhtin, and found visitor cultural capital predicts whether a visitor follows or rejects the curator's intended narrative ([UCL Discovery](https://discovery.ucl.ac.uk/id/eprint/10118292/); [CORE full text](https://core.ac.uk/reader/374290430)). **The operative lesson: you do not control the narrative, you control the materials from which one will be built — and different visitors will build different ones.** Curatorial guidance converges on this: "narratives should guide without dictating interpretation, creating space for diverse perspectives and personal meaning-making."

Museum spatial theory also supplies a useful three-level model — **exhibit level, gallery level, architecture level** — for reasoning about where narrative is being carried ([VirtuNarrator, ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2468502X25000403)). Applied to a web page: the individual drawing, the section, and the sheet as a whole are three separate narrative registers, and they can carry different claims.

**Gallery hanging: adjacency is argument.** "Juxtaposition of different works creates dialogues and contrasts between pieces," spatial flow guides narrative structure, thematic grouping creates storylines, and "negative space and intervals between works allow for moments of reflection and transition" ([Fiveable, installation art / white cube](https://fiveable.me/installation-art/unit-3/institutional-spaces-white-cube-galleries/study-guide/eNcnuKQbNPAwhHSJ)). The historical contrast is instructive: in a 19th-century salon hang, every picture was "a self-contained entity, totally isolated from its neighbor by a heavy frame and complete perspective system within" — i.e. the salon hang deliberately *prevented* adjacency from meaning anything, and the modern hang deliberately exploits it ([Brian O'Doherty, *Inside the White Cube*, Artforum](https://www.artforum.com/features/inside-the-white-cube-notes-on-the-gallery-space-part-i-214843/)). **A grid of equal-sized items is a salon hang. It suppresses narrative by design.** That is a direct hit on the current spec.

**Photobook sequencing: the pair is the unit.** Mark Power is the most precise practitioner source I found. On pairing: "pairing two pictures you might be sure would work together often don't; for whatever reason they might cancel each other out. On the other hand two pictures that might not individually be so remarkable can each lift the other to be much better… and suggest **a sort of 'third thing' floating somewhere between the two**." On rhythm: "You can't have a relentless sequence of 'big pictures'. There have to be moments of quiet as well." On working method: he and designer Stuart Smith built in 16-page sections each with its own beginning and end, and he cites John Gossage's observation that a sequence gets hard to sustain past six or seven images before you need to restart. And on humility: "there isn't just one correct way of sequencing pictures. There are many, and it's very subjective" ([Magnum Photos, *The Language of Pictures*](https://www.magnumphotos.com/theory-and-practice/mark-power-the-language-of-pictures-exploring-sequencing/)).

The editing principle: sequencing means "making sure that the final group of pictures and the way they are presented most clearly succeed in pointing at whatever it is that is being pointed at," and the concept "forces out everything that does not fit" ([Conscientious Photography Magazine](https://cphmag.com/narrative-2/)). Also from the same source, on authorial responsibility: "making a photobook is directorial, and a reasonably attentive viewer should be put into the position where s/he can figure out what's going on."

**Rephotography as an established idiom.** Two precedents matter because they prove the childhood/adult pair is a *legible* form — and warn that it is a *familiar* one. Irina Werning's *Back to the Future* recreates childhood photographs with matched pose, clothing, lighting and colour balance; the critical reading of it is that the result "illustrat[es] that — even with the inevitable effects of time — we are who we are; people change, but they don't change" ([designboom](https://www.designboom.com/art/irina-werning-back-to-the-future/); [My Modern Met](https://mymodernmet.com/back-to-the-future-11-total/)). Chino Otsuka's *Imagine Finding Me* composites her adult self into her own childhood photographs, exploring "the relation between memory, identity, time and photography" and treating remembering as mental time travel ([It's Nice That](https://www.itsnicethat.com/articles/photography-chino-otsuka); [LensCulture](https://www.lensculture.com/articles/chino-otsuka-photo-album)). **Confidence: High** that the device reads instantly; **High** that it is also widely recognised, therefore at risk of reading as a trope rather than an argument (see B9).

**Games: narrative architecture.** Henry Jenkins' framework is the cleanest available theory of story-in-a-space. His thesis: "Game designers don't simply tell stories; they design worlds and sculpt spaces," and games are better understood "less as stories than as spaces ripe with narrative possibility." He names four modes:

1. **Evocative spaces** — draw on pre-existing narrative associations. "Such works do not so much tell self-contained stories as draw upon our previously existing narrative competencies."
2. **Enacting stories** — narrative enters "on two levels — in terms of broadly defined goals or conflicts and on the level of localized incidents."
3. **Embedded narratives** — story information distributed as discoverable detail. "The game world becomes a kind of information space, a memory palace." His model is the detective story, which tells "two stories — one more or less chronological… and the other told radically out of sequence."
4. **Emergent narratives** — "not pre-structured or pre-programmed, taking shape through the game play."

He quotes Don Carson's environmental storytelling principle: "The story element is infused into the physical space a guest walks or rides through. It is the physical space that does much of the work" ([Jenkins, *Game Design as Narrative Architecture*, MIT](https://web.mit.edu/~21fms/People/henry3/games&narrative.html); [PDF copy](https://paas.org.pl/wp-content/uploads/2012/12/09.-Henry-Jenkins-Game-Design-As-Narrative-Architecture.pdf)).

**The synthesis of A5.** Every one of these disciplines does the same three things: (a) it chooses a **medium-native container** (page spread, gallery wall, room, level), (b) it places **concrete particulars adjacent to each other**, and (c) it **omits the connective statement** so the audience must produce it. Nothing here requires a protagonist, a want, or an obstacle. **Confidence: High** — five independent fields, no contradiction between them.

## A6. Story on the web specifically — is a page even experienced as a sequence?

**The uncomfortable finding first.** NN/g's eyetracking, updated in 2018, found that **57% of viewing time is spent above the fold**, **74% in the first two screenfuls**, and **81% within the first three**; 42% of viewing time goes to the top 20% of the page and 65% to the top 40%; the remaining ~26% is a long tail. Their conclusion is blunt: "people still don't scroll a lot — they rarely go beyond the third screenful of info." Notably, the 2010 version of the same study found 80% of time above the fold, so behaviour *has* improved — it has not been transformed ([Nielsen Norman Group, Scrolling and Attention](https://www.nngroup.com/articles/scrolling-and-attention/); [original research study](https://www.nngroup.com/articles/scrolling-and-attention-original-research/)).

Two consequences, and they pull in opposite directions:
- Users scroll *when they have a reason to* — motivation, not affordance, is the binding constraint.
- "The interaction cost of scrolling reduces the likelihood that content will be viewed in lower parts of a longer page," and designers should use visual signifiers such as **cut-off content** to defeat "the illusion of completeness."

That last point is genuinely useful for Part B: the standard usability fix for scroll depth (something visibly continues past the fold) is *identical in form* to the standard narrative device for opening a story (a visible unresolved element). One mark can do both jobs.

**Scrollytelling evidence quality is poor.** The widely circulated figures — "engagement up to 80%," "time on site +47%," "conversion +30–40%" — come from agency marketing pages with no linked methodology and should be treated as advertising, not evidence ([DesignRush](https://www.designrush.com/agency/website-design-development/trends/scrollytelling); [Digital Silk](https://www.digitalsilk.com/digital-trends/scrolling-effects/)). **Confidence: Low.** The same sources concede the honest version: "Scrollytelling rarely produces a clean attributable lift on its own."

**The academic work is more careful and more equivocal.** Mittenentzwei et al. (2023) ran a between-subjects study with 85 participants comparing slideshow vs. scrollytelling genres for data-driven disease stories, explicitly noting it was "unclear to what extent the choice of genre influences subsequent user behavior" ([*Computers & Graphics* 114:229–238](https://www.sciencedirect.com/science/article/abs/pii/S0097849323001061); [ACM record](https://dl.acm.org/doi/10.1016/j.cag.2023.06.011)). Expert critique of the genre flags real harms: **scrolljacking**, weak affordances, and "a non-intuitive connection between the user's action and animation." **Confidence: Medium** that scrollytelling is neutral-to-mildly-positive for engagement; **High** that scrolljacking is harmful.

**Net position for the web.** A web page is *weakly* sequential. You get reliable ordering for roughly the first two to three screenfuls and probabilistic ordering after that. Therefore: put the promise where it will certainly be seen; never make comprehension depend on having read something below the fold; and be aware that the ending — which the peak-end rule says is disproportionately what gets remembered — is the part of the page least reliably reached. **That tension is the central design problem of a narrative web page, and it is resolved by making the page short enough that the ending is reachable, not by making the scroll cleverer.**

## A7. Identity narrative — coherence, and why self-promotion backfires

**Narrative identity.** McAdams and McLean define it as "a person's internalized and evolving life story, integrating the reconstructed past and imagined future to provide life with some degree of unity and purpose"; the empirical instrument is the Life Story Interview, which asks people to describe their life "as if it were a book — chapters, scenes, characters," and codes it along agency, communion, redemption, contamination, coherence, complexity and exploratory processing ([McAdams & McLean 2013, *Current Directions*](https://journals.sagepub.com/doi/10.1177/0963721413475622); [Yu-kai Chou summary](https://yukaichou.com/behavioral-analysis/narrative-identity-mcadams-life-story-self/)).

**Redemption and contamination.** A redemption sequence "marks a transition in a life narrative account from an emotionally negative scene to a positive outcome"; contamination runs the other way, with negativity "overwhelming or polluting the preexisting positivity." Redemption correlates with well-being and generativity; contamination predicts low well-being ([McAdams et al. 2001, *PSPB*](https://journals.sagepub.com/doi/10.1177/0146167201274008)). A longitudinal study found that participants whose life stories showed higher agency and redemption and lower contamination had more positive mental-health trajectories over four years ([Adler et al., PMC4395856](https://pmc.ncbi.nlm.nih.gov/articles/PMC4395856/)).

**Important caveat that most design writing gets wrong:** this literature is about the *teller's* psychological adaptation, not about how *audiences* judge the teller. Using redemption structure because "research says redemption arcs work" is an over-claim. **Confidence: High** for the well-being finding, **Low** for any inference that a redemption-shaped bio makes readers like you more.

**Why self-promotion backfires — this one is directly on point and well-powered.** Sezer, Gino and Norton ran nine studies including a week-long diary study and a field experiment on **humblebragging** — "bragging masked by a complaint or humility." Findings: it is a distinct and *ineffective* self-presentation strategy; it "backfires because it is seen as insincere"; and both forms are **less effective than straightforward bragging**, reducing liking, perceived competence, and compliance with requests. Complaint-based humblebrags perform worse than simply complaining. People deploy it precisely when they are most motivated to impress ([Harvard Business School working paper](https://www.hbs.edu/ris/Publication%20Files/15-080_97293623-53aa-4df8-b967-38617e144fd9.pdf); [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2597626); [HBS Working Knowledge](https://hbswk.hbs.edu/item/7789.html); [Psychology Today](https://www.psychologytoday.com/us/blog/fulfillment-any-age/201803/why-people-hate-humblebragging)). HBS separately reports the effect is especially costly in job-interview contexts ([HBS Working Knowledge](https://www.library.hbs.edu/working-knowledge/humblebragging-is-a-bad-strategy-especially-in-a-job-interview)). **Confidence: High.**

**The design-relevant conclusion:** *sincerity is a structural property, not a tonal one.* You cannot be sincere by softening a boast — that is measurably the worst option available. The only reliably sincere register is flat statement of verifiable fact with no evaluative wrapper, and the only reliably credible route to an admirable trait is to let the viewer infer it from evidence.

---

# PART B — APPLIED TO THIS SITE

*Read against `PRODUCT.md`, `DESIGN.md`, and the redesign spec, with the 2026-07-26 reversals (hero video cut; counts banned; coursework quiet; no client/company/product names; Peter Pan through-line forbidden in copy) treated as overriding.*

## B1. Is a personal calling card a story at all?

**No — and pretending otherwise is how these sites get bad.**

The strict unit does not apply. Butler's yearning, Vonnegut's glass of water, McKee's gap: all require a subject who wants something *within the frame of the telling*, meets resistance *within it*, and ends *different from how he started*. A calling card fails all three. Renato wants nothing from the visitor (PRODUCT.md: "There is no conversion event"). Nothing resists him on the page. He is the same person in the first viewport and the last. Building a fake arc — struggle, breakthrough, arrival — would be a fabricated protagonist and would collide head-on with the humblebrag finding: performed adversity read as self-presentation is rated *insincere*, and insincerity costs both liking and perceived competence ([Sezer, Gino & Norton](https://www.hbs.edu/ris/Publication%20Files/15-080_97293623-53aa-4df8-b967-38617e144fd9.pdf)).

**What replaces desire/obstacle/change, in three parts:**

1. **Narrative, not story.** The site's job is the structure that produces inference, not the plot that carries it — precisely Sundberg's distinction: "There is no sequence of events, thus no story," but juxtaposition still "spark[s] a narrative relationship in the viewer's mind" ([cphmag](https://cphmag.com/narrative-2/)).
2. **The gap moves from the character to the viewer.** McKee's gap between expectation and result survives the translation intact, because the visitor *does* arrive with an expectation — a developer portfolio — and the page *does* deliver something else. That is a real reversal, and it is the only conflict on the page that isn't invented.
3. **The change is epistemic, not dramatic.** What changes over the page is the visitor's model of who this is. That is legitimate: exhibitions do exactly this and visitors reliably construct narrative from them anyway ([Sitzia, Stedelijk Studies](https://stedelijkstudies.com/journal/narrative-theories-learning-contemporary-art-museums-theoretical-exploration/)).

**One thing from the strict definition does apply and should be exploited.** McKee's "true character is revealed in the choices a human being makes under pressure" needs no plot — only evidence of choices. Renato has three that are already on the asset list or in the record: switching majors a year in ("late enough that it hurt"), the snapped racket and the fistful of broken drumsticks, and the client engagement where he ignored the brief he was given. Those are story-grade materials inside a non-story form.

## B2. The single narrative spine of this site

> **He has been doing every one of these things since he was a boy, and the only thing that has changed is the tolerance.**

Plain-English gloss, and the sentence you want a stranger to say a week later: *"Same kid, better tools — and he still won't specialise."*

**Evidence from Part A supporting this as the spine:**

- **Aristotle's unity of action.** "Unity of action does not mean all that happens to the protagonist, but precisely what comprises a particular whole action" ([SparkNotes/Poetics 7–9](https://www.sparknotes.com/philosophy/poetics/section4/)). A personal site's default failure is biography — everything that happened. The spine names *one action* (starting things and not stopping) under which tennis, guitar, camera, running, and software are the *same* act in different materials. That is exactly PRODUCT.md principle 4 ("Breadth is evidence of one trait, never a menu of identities") given a narrative form.
- **Pixar 22** — "What's the essence of your story? Most economical telling of it? If you know that, you can build out from there."
- **Made to Stick's "Simple" = find the core** ([Heath Brothers](https://heathbrothers.com/books/made-to-stick/); [Unusual VC summary](https://www.unusual.vc/made-to-stick-chip-and-dan-heath/)).
- **The concreteness effect** — the spine is a claim about specific physical objects (a racket, a guitar, a camcorder), which are dual-coded and therefore recallable, rather than about an abstract trait ("versatile," "curious"), which is not.
- **It matches his own words.** "I taught myself seven instruments the same way I learn everything else: by starting" and "what I like in both is the messy middle." The spine is the structural form of both sentences without quoting either as a tagline.

**What the spine deliberately does not try to carry:** the "messy middle" idea and the "starts before he's qualified" idea. Those are carried by the parts list and the wear detail (B5, items 2 and 5). A spine that tries to hold three propositions is a paragraph.

## B3. Where the change lives

**In the viewer's understanding. Specifically, in three states.**

| | What the viewer believes | Triggered by |
|---|---|---|
| **First sight (0–5s)** | "A developer's portfolio with an unusually good blueprint gimmick. Dark, nicely animated. He probably also has hobbies." | The drawing world alone; category priors |
| **Middle (recognition)** | "Wait — the tennis and the guitar aren't *hobbies bolted onto* an engineer. They're the same behaviour. And they're old." | First childhood counterpart arriving in an already-seen part |
| **End (revision complete)** | "He's been doing all of this since he was a kid, he's still doing it, and he likes the part where it doesn't work yet. I could describe him." | The unmatched pair, ITEM 00 |

This is Aristotle's *anagnorisis* relocated from character to audience — the recognition happens in the auditorium. It is also literally McKee's gap: the break "between the cause as it seemed and the effect as it turns out." The visitor's expectation ("portfolio") and the result ("a person taken apart, whose parts are all older than his career") is the widest gap available to this site, and unlike a manufactured struggle it is true.

**The failure state to design against, stated as the negation of the table above:** the visitor's belief at the end is identical to their belief at first sight. That is PRODUCT.md's own definition of failure — "a developer portfolio, dark, nicely animated" — restated as a narrative diagnosis. If nothing the visitor believes changes, the page is decoration regardless of how good the drawing is.

## B4. The childhood/adult pairing — spine or device?

**The case that it is only a device:**

1. **Coverage.** It exists in roughly four of ~20 drawings. A spine that appears in 20% of the assets is a motif; the other 80% would be doing something else, which is the definition of two structures fighting.
2. **It is a known internet trope.** Werning's *Back to the Future* has been in wide circulation since 2011 and Otsuka's *Imagine Finding Me* since 2014 ([designboom](https://www.designboom.com/art/irina-werning-back-to-the-future/); [It's Nice That](https://www.itsnicethat.com/articles/photography-chino-otsuka)). Instant legibility and instant familiarity are the same property. A visitor may pattern-match to "cute then/now" and stop thinking.
3. **It carries only half the thesis.** Pairing proves *continuity*. It says nothing about "starts before he's qualified," nothing about the messy middle, nothing about volume or seriousness. It could even undercut the last one — nostalgia is a soft register and this person is a lead engineer.
4. **It risks sentimentality, which is the exact register DESIGN.md bans** ("the drawing must be dry… the conceit collapses the moment it turns cute").

**The case that it is the spine:**

1. **It is the only structure on the site that can carry the forbidden idea.** He has explicitly barred stating "I never grew up." Every other candidate structure (BOM, revision table, work story, crop field) can only *say* things. The pair is the one element that *demonstrates* a temporal claim with zero words. Given a hard constraint that the central idea must never be written, the spine has to be a structure and there is only one candidate.
2. **It is the site's only source of time.** A portfolio is a snapshot; the pairs are the one thing that makes the page a claim about a *duration*. Time is the ingredient a personal site normally lacks entirely, and Aristotle's whole apparatus of beginning/middle/end presupposes it.
3. **The mechanism is the best-evidenced one in Part A.** Two adjacent images, connection omitted, viewer completes it: McCloud's closure — "in the limbo of the gutter, human imagination takes two separate images and transforms them into a single idea," and closure is "a leap taken voluntarily by the reader" ([Understanding Comics](https://understandingcomics177.wordpress.com/about/1-2/2-2/)); Kuleshov and Eisenstein — "the collision of two separate shots creates a new idea" ([Media Studies](https://media-studies.com/eisenstein-montage/)); Power's "third thing floating somewhere between the two" ([Magnum](https://www.magnumphotos.com/theory-and-practice/mark-power-the-language-of-pictures-exploring-sequencing/)). And the conclusion the viewer generates is better retained than one supplied — the generation effect, *d* ≈ 0.40 ([meta-analysis](https://link.springer.com/article/10.3758/BF03193441)).
4. **Objection 1 dissolves under a correct reading of "spine."** A spine is not a template every element repeats; it is the proposition every element serves. The unpaired adult drawings serve it by being the *present tense* the pairs point at, and Power's rule requires it anyway: "You can't have a relentless sequence of 'big pictures'. There have to be moments of quiet as well."

**Commit: it is the spine.**

**Therefore the opening and ending are determined, and they are not symmetrical:**

- **The opening must withhold the pairs entirely.** The first viewport shows the adult assembly only. If the visitor sees a childhood pair immediately, the thesis is delivered as a premise rather than discovered as a conclusion, the generation effect is forfeited, and the site becomes a nostalgia piece in five seconds. The opening's job is to *establish the wrong belief* from B3 and to plant one visible unresolved element.
- **The ending must be the pair that doesn't resolve.** Peter Pan in costume with a toy sword, the only childhood drawing with no adult counterpart. Every other pair on the sheet closes; this one is left open, and the closure the viewer performs on it — supplying the missing adult panel from what they have just spent two minutes learning — *is* the sentence he forbade writing.

## B5. Recommended sequence for the single page

One page, one sheet. Each section carries its justification.

---

**0 — Sheet frame + title block, present at load (bottom-right).**
Ruled border, zone letters, and the title block already specified in DESIGN.md. The title block carries the literal facts in draughting register — `SUBJECT: RENATO PRADO · LEAD SOFTWARE ENGINEER · INDIANAPOLIS, IN · REMOTE · DRAWN BY: R. PRADO · SHEET 1 OF 1`.
**Why:** Jenkins' *evocative space* — the form itself carries meaning before anything is read, "drawing upon our previously existing narrative competencies" ([MIT](https://web.mit.edu/~21fms/People/henry3/games&narrative.html)); a technical drawing is culturally read as *a measured description of a real object*, which is a free credibility grant. And per A3: **tell the facts.** The literal answer to "who is this" is stated flatly, because 57% of viewing time never leaves the first screen ([NN/g](https://www.nngroup.com/articles/scrolling-and-attention/)) and no visitor should be able to leave without it.

**1 — First viewport: THE GENERAL ASSEMBLY, adult only.**
One figure exploded into numbered parts on leader lines with callout balloons. No tagline, no hero paragraph, no CTA. Present tense, adult only, no childhood anywhere.
**The one required anomaly:** the callout numbering visibly does not start at 01, or one leader line runs off the bottom edge of the viewport terminated by a `--w-break` freehand break line — DESIGN.md's own notation for *"a part continues past the sheet."*
**Why:** Barthes' hermeneutic code — open the enigma in the first move ([NUS](https://courses.nus.edu.sg/course/elljwp/5codes.htm)). Loewenstein: the gap must be *salient*, a "priming dose," or there is no curiosity at all ([Psychology Fanatic](https://psychologyfanatic.com/information-gap-theory/)) — a merely absent thing is invisible; a numbered slot with nothing in it is a gap. And NN/g's remedy for the illusion of completeness is literally *visibly cut-off content* ([NN/g](https://www.nngroup.com/articles/scrolling-and-attention/)). **One mark discharges the narrative promise and the scroll-depth fix simultaneously.** This is the single highest-leverage decision on the page.

**2 — Parts list (BOM), immediately below or beside the assembly.**
`ITEM / DESCRIPTION / QTY / MATERIAL`. Deadpan. `SELF-TAUGHT INSTRUMENT — QTY 7`. This replaces the paragraph a normal site opens with.
**Why:** Stein's particularity — "the detail that differentiates one person from another" ([Absolute Write](https://absolutewrite.com/2019/01/14/sol-stein-stein-on-writing-1995/)) — and the concreteness effect, since every BOM row is a physical noun and physical nouns are dual-coded ([ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1053811906006781)). Crucially it is **structurally incapable of humblebragging**: a BOM has no adjective column, no evaluative wrapper, and therefore nothing for a reader to rate as insincere ([Sezer/Gino/Norton](https://www.hbs.edu/ris/Publication%20Files/15-080_97293623-53aa-4df8-b967-38617e144fd9.pdf)).
**Enforcement rule for the QTY column, since it is literally a count:** a QTY is permitted when it is a *property of a kind of thing he learned* (`SELF-TAUGHT INSTRUMENT — QTY 7`); it is banned when it *measures throughput* (`WEB APPLICATION — QTY 12`, `SERVER — QTY 13`). If a row's QTY would go up simply by working more hours, delete the row.

**3 — First pair: the racket (Item 02), revealed by mechanism rather than layout.**
The adult mid-serve drawing is already on the sheet from §1. On scroll, the boy-with-racket arrives *into the same frame*, first as `--w-hidden` dashed underlay — DESIGN.md's existing semantic for "detail behind something else" — then settling to full `--w-visible` weight. Annotation in draughting language only: e.g. `AS ORIGINALLY FITTED`.
**Why:** McCloud's closure and Power's third thing (A5). And note what the design system has already done for you: the visual grammar's word for the childhood image (*detail behind something else*) and the thesis (*it was always in there*) are **the same statement**. When the notation and the argument are identical, the conceit stops being decoration — which is DESIGN.md's own bar ("if an element cannot state what it communicates, it is removed").
**Reduced-motion:** the settled state, both at visible weight, in one frame. That is the stronger statement anyway.

**4 — Remaining pairs, interleaved with unpaired adult parts.**
Guitar pair (boy with electric guitar ↔ man playing live into a mic), camera pair (boy with camcorder ↔ man with telephoto). Between them, unpaired present-tense parts: the laptop, the run, the drums, the finish line.
**Why:** Power/Smith — "You can't have a relentless sequence of 'big pictures'. There have to be moments of quiet as well," and Gossage's warning that a run of more than six or seven images needs a reset ([Magnum](https://www.magnumphotos.com/theory-and-practice/mark-power-the-language-of-pictures-exploring-sequencing/)). Three pairs back-to-back becomes a gimmick metronome and the fourth would land as a joke rather than a payoff. Also Pixar 12: "Discount the 1st thing that comes to mind."

**5 — THE PEAK: the wear detail. `DETAIL A — SCALE 2:1`.**
The snapped tennis racket and the fistful of broken drumsticks, both held up, both while laughing. Detail bubble, magnified, no caption beyond the scale note.
**Why:** This is the emotional peak, and the peak-end rule says memory of the whole page will be dominated by this moment and the last one ([NN/g](https://www.nngroup.com/articles/peak-end-rule/)). It is also the site's only evidence of *cost* — McKee's "true character is revealed in the choices a human being makes under pressure" — without a single word claiming effort. And it does something no copy can: the broken equipment says *he goes hard enough to break things*, the laughing says *he doesn't take it seriously*, and the two together are precisely the contradiction he forbade anyone to state. Per A3's rule: tell the facts, **show the trait**.

**6 — One work story, anonymous, as annotations on a single drawn part.**
Three labelled callouts on one part: `ASKED FOR` / `ACTUAL CONSTRAINT` / `WHAT CHANGED`. Content: he was asked for a portfolio site — **but** what the man actually needed was to stop running his company out of somebody else's spreadsheet — **therefore** three weeks later the business ran on what got built. No name, no domain, no product.
**Why:** this is the **only true but/therefore beat on the page** (Parker & Stone — [Breaking the Rules](https://breakingtherules.substack.com/p/the-south-park-technical-writing)), and it is McKee's gap between expectation and result rendered literally: the gap between what was asked for and what was needed. It is also the site's proof that the spine converts to professional consequence rather than being a charming personality fact. Keep it to three sentences; length here steals from §8.
**Specificity without identity:** "somebody else's spreadsheet," "three weeks," "the whole business ran on it" are concrete and name nobody. Concreteness lives in *what*, not *who* — the anonymity rule costs nothing narratively if you spend the detail budget on mechanism.

**7 — Revision table. `REV / DATE / DESCRIPTION`.**
Brazil → US is a revision. Mechanical Engineering → CS is a revision. Player → captain → season over is a revision. First-person prose, if any survives anywhere, lives only here.
**Why:** it is the drawing's native form for "this changed and we kept a record," and it supplies the temporal backbone that the pairs imply. McAdams' narrative identity is built from a reconstructed past made coherent, and the ME→CS switch is a natural redemption-shaped beat ([McAdams & McLean](https://journals.sagepub.com/doi/10.1177/0963721413475622)). **The tabular format is load-bearing, not stylistic:** it mechanically prevents that beat from becoming an inspirational paragraph, which is the form that would get read as insincere ([Sezer/Gino/Norton](https://www.hbs.edu/ris/Publication%20Files/15-080_97293623-53aa-4df8-b967-38617e144fd9.pdf)). *Honest limit: the redemption literature measures the teller's well-being, not audience impressions — use it as a structural convenience, not as a claim that redemption arcs persuade.*

**8 — THE ENDING: the Peter Pan drawing. `ITEM 00`.**
Bottom of the sheet, immediately above the title block. The boy in the Peter Pan costume with the toy sword. It is the only childhood drawing with no adult counterpart on the page. Its BOM row exists. Its revision-table row exists and is **empty**.
Notation, in the flattest possible draughting register: **`ITEM 00 — ORIGINAL PART. NO REVISIONS.`**
No caption. No explanation. Nothing pointing at what it means.
**Why:**
- **Chekhov.** The missing callout number planted in the first viewport (§1) fires here: the number that wasn't there is 00.
- **Peak-end.** The final moment is disproportionately what is remembered ([NN/g](https://www.nngroup.com/articles/peak-end-rule/)).
- **Generation effect.** Every previous pair taught the viewer the rule "boy → man." This one gives them the boy and no man, and they complete it themselves — and a self-generated conclusion is the one they will still have in a week ([meta-analysis](https://link.springer.com/article/10.3758/BF03193441)).
- **It obeys the constraint exactly.** Nowhere does the page say he never grew up. The page says a part has no revisions, which is literally true of a drawing.
- **`00` rather than the last number** because 00 means *the part everything else was fitted to* — first, and unrevised — which is a stronger and drier claim than "last."

**9 — Title block as the final legible thing. `SHEET 1 OF 1`.**
**Why:** Aristotle — "an end naturally follows some other thing… but has nothing following it" ([Poetics VII](https://monadnock.net/aristotle/poetics-7.html)). `SHEET 1 OF 1` does double duty: it closes the document, and it asserts that the whole person fitted on one page — which is the anti-portfolio statement the entire site is making.

---

## B6. Conveying "never grew up" without ever saying it — three techniques, ranked

**1. The unmatched pair (ITEM 00). — Strongest.**
Establish "boy → man" as a rule three times, then break it once, at the end, and never comment. The viewer supplies the missing panel.
*Basis:* McCloud's closure ([Understanding Comics](https://understandingcomics177.wordpress.com/about/1-2/2-2/)); Chekhov setup/payoff ([StudioBinder](https://www.studiobinder.com/blog/chekhovs-gun/)); peak-end ([NN/g](https://www.nngroup.com/articles/peak-end-rule/)); generation effect ([Springer](https://link.springer.com/article/10.3758/BF03193441)).
*Ranked first because* it is the only technique where the forbidden sentence is produced **by the viewer**, which simultaneously satisfies his ban, maximises recall, and evades the insincerity penalty entirely — you cannot be accused of bragging about a claim you never made. It is also the cheapest to build: one drawing, one empty table cell, one item number.

**2. Line-weight semantics as argument. — Strong, invisible, nearly free.**
Draw every childhood counterpart at full `--w-visible` weight in its settled state, identical to the adult parts, and give each one a real BOM row with a real item number. The drawing then *asserts* that the childhood parts are current components of the present object rather than history — because in ISO drafting grammar, `--w-visible` means "the part itself, present."
*Basis:* Jenkins' embedded narrative — "the game world becomes a kind of information space, a memory palace," where meaning is distributed into the environment's own vocabulary rather than narrated ([MIT](https://web.mit.edu/~21fms/People/henry3/games&narrative.html)); Carson — "It is the physical space that does much of the work."
*Note the interaction with §3:* use `--w-hidden` only for the arrival *transition*, never for the resting state. A childhood part left permanently dashed would say "past," which is the opposite claim.

**3. Register discipline — deadpan format applied to unserious content. — Effective but riskiest.**
The BOM gives a toy sword a material spec. The revision table assigns a costume a row. The joke is never in the words; it is in the *distance between the seriousness of the format and the unseriousness of the content*.
*Basis:* McKee's gap between expectation and result, operating at the level of form rather than plot; and the humblebrag finding that flat, unevaluative register reads as sincere while any softening wrapper reads as insincere ([Sezer/Gino/Norton](https://www.hbs.edu/ris/Publication%20Files/15-080_97293623-53aa-4df8-b967-38617e144fd9.pdf)).
*Ranked third because* it is the technique most likely to tip into the "cute" register DESIGN.md bans. It survives that ban only because the whimsy lives in the relationship between format and content, never in a written line. **Rule: if you can point at a specific sentence and call it the joke, delete it.**

**Explicitly rejected** (all fail on his ban, the insincerity evidence, or both): a "Peter Pan" caption; any variant of "still a kid at heart"; a playful typeface or colour on the childhood drawings; a hidden easter egg that rewards a click with the theme stated outright; a quote from *Peter Pan*. Every one of these converts an inference the viewer earns into a claim he makes about himself — the exact transformation the humblebrag research shows is counterproductive.

## B7. The opening and the closing — the exact device

**Name: the deferred callout.**

**The promise (first viewport).** The general assembly is fully drawn, fully numbered, and visibly *incomplete in a specified way*: the callout sequence does not begin at 01, and/or a leader line exits the bottom edge on a freehand break line. In draughting grammar these both mean one thing — *this object has been completely specified; you have not been shown all of it yet.*

What the promise commits the site to: **there is a part of this person that hasn't been shown, and it is a known, numbered, drafted part — not a mystery, an omission.** That is a hermeneutic enigma stated in notation, costing zero words of copy ([Barthes' codes](https://media-studies.com/barthes-codes/)), and satisfying Loewenstein's requirement that the gap be salient rather than merely absent ([information-gap theory](https://psychologyfanatic.com/information-gap-theory/)).

**The payoff (final element).** `ITEM 00 — ORIGINAL PART. NO REVISIONS.` — the Peter Pan drawing. The missing number turns out to be the *first* number, and the part that was never revised turns out to be the one everything else was fitted to. The setup fires ([Chekhov](https://www.britannica.com/topic/Chekhovs-gun)), the enigma resolves, and the resolution is a proposition the site never stated.

**The second-order payoff.** `SHEET 1 OF 1` in the title block, read *after* ITEM 00, retroactively means "this is the whole object." Closure in Aristotle's sense — nothing follows.

**The constraint this places on page length, and it is not negotiable.** The peak-end rule makes the ending disproportionately load-bearing, while NN/g's data shows only ~19% of viewing time occurs past the third screenful ([NN/g](https://www.nngroup.com/articles/scrolling-and-attention/)). A payoff nobody reaches is not a payoff. **The page must be short enough that ITEM 00 is reachable — target five to seven screenfuls, and treat every additional screenful as a direct tax on the ending.** This is the single argument that makes B8 mandatory rather than optional.

## B8. What to cut, on story grounds

Ranked by how much length they add per unit of understanding advanced.

**1. The equal-size detail-crop field (spec §3, content order item 6). Cut entirely.**
A grid of identically sized crops is, structurally, a **salon hang** — the arrangement historically designed so that each item is "a self-contained entity, totally isolated from its neighbor" ([O'Doherty, *Inside the White Cube*](https://www.artforum.com/features/inside-the-white-cube-notes-on-the-gallery-space-part-i-214843/)). Equal size and equal spacing *suppress* adjacency meaning by design, which is the exact opposite of what the pairs need. It is also the longest element on the page and it advances the spine not at all — it is "and then, and then, and then" rendered as a grid. Its stated purpose ("volume accumulates without a curated top three") is now doubly obsolete: PRODUCT.md principle 1 was revised on 2026-07-26 from "volume is the argument" to "range is the argument," and counts of output are banned. The crop field is a volume argument that survived the revision by accident. Pixar 5: "Hop over detours. You'll feel like you're losing valuable stuff but it sets you free."

**2. `/sheet/[slug]` detail sheets and the View Transition, for v1. Defer.**
Progressive-detail architecture is funnel behaviour, and this product has no funnel. Every click is an opportunity to leave *before the ending*, and the ending is where the meaning is. Keep the Prisma models; don't build the routes yet.

**3. Live dimensions from the fitness database. Cut from v1.**
A running total is a scoreboard, and PRODUCT.md bans scoreboards in prose — the ban should extend to red ink. It also introduces a staleness failure mode for zero narrative gain, and it is Phase 5 in the delivery plan, i.e. the site is meant to be complete without it. *If one survives:* keep only `days_since_last_activity`, the single metric that cannot be read as a boast.

**4. The `/revisions` route as a separate page. Fold into the single sheet.**
The revision table is payoff-bearing (§7 sets up §8's empty row) and must not sit behind a click.

**5. The hero video. Confirm it stays cut.**
Already reversed on 2026-07-26. Reaffirming on story grounds: video is a competing narrative medium that would win the first viewport away from the drawing and destroy the deferred callout, which depends on the first screen being read as a *drawing* — a static, complete, measured object — not as a film.

**6. Coursework items (capstone, fine-tuning research), as currently framed.**
He wants these quiet, and there is a structural reason beyond preference: they are the only items on the sheet whose subject is *a task someone else assigned*, which directly contradicts the spine ("starts before he's qualified" is not "completed what was required"). Either restate them purely as self-initiated mechanism with no academic frame, or cut them. Aristotle's unity of action: what does not comprise part of the one action does not belong in the plot.

**7. Any BOM row whose QTY measures throughput.** See the B5 §2 test.

## B9. The honest risk

**Risk 1 — Preciousness. The page reads as an art project about a person rather than as a person.** *Most likely failure.*
Cyanotype drawing world + rephotography device + a deliberately withheld thesis is a great deal of subtext for a page a stranger gives thirty seconds. The failure sounds like: *"Beautiful site. I have no idea what he actually does."*
**Cheapest mitigation:** one line of literal fact, in the title block, in draughting register, above the fold: `SUBJECT: RENATO PRADO · LEAD SOFTWARE ENGINEER · INDIANAPOLIS, IN · REMOTE`. Costs one line, breaks no rule, is not a tagline, and guarantees a five-second visitor leaves with the literal answer. This is A3's rule applied defensively — *tell the facts* — and it is justified by the 57%-above-the-fold finding ([NN/g](https://www.nngroup.com/articles/scrolling-and-attention/)) and Made to Stick's "simple core first" ([Heath Brothers](https://heathbrothers.com/books/made-to-stick/)).

**Risk 2 — The childhood device reads as sentimental, or as a recognised internet trope.**
Werning's project has circulated for fifteen years; a viewer may pattern-match to "cute then/now photos" and stop.
**Cheapest mitigation:** never present a pair as two side-by-side photographs at equal size with a caption — that composition *is* the trope. Keep both halves inside one frame, in one drawing's line, at drawing scale, labelled only in draughting notation. The line reduction is what converts nostalgia into an assertion about an object, and it is already the site's medium, so the fix costs nothing. Additionally: never use a childhood drawing in the first viewport (B4), which is what would frame the whole page as a nostalgia piece.

**Risk 3 — The inference simply doesn't fire. Nobody generates the theme.**
The generation effect only pays out *if generation occurs*. If the viewer never notices that ITEM 00 has no adult half, the site's central idea is invisible and the page is a nice drawing.
**Cheapest mitigation — and the one thing in this report I would insist on:** test it. Show the built page to five people who don't know him. Wait 24 hours. Ask for three sentences describing him. If none mentions childhood, continuity, or play, **add one more matched pair — never a sentence.** The failure mode of inference is fixed with more evidence, not with explanation: a sentence is the one thing he forbade, and it is also the one thing the humblebrag research says would be discounted as insincere on arrival ([Sezer/Gino/Norton](https://www.hbs.edu/ris/Publication%20Files/15-080_97293623-53aa-4df8-b967-38617e144fd9.pdf)). This test is also the only direct measurement of PRODUCT.md's stated success criterion, which is otherwise untested.

**Risk 4 — Anonymity starves the work story of the specificity that produces belief.**
Concreteness is where credibility comes from (A3), and the client story is stripped of its most concrete elements — the name, the sector, the domain.
**Cheapest mitigation:** relocate the detail budget from *who* to *what*. "Somebody else's spreadsheet," "three weeks," "the whole business ran on it" are concrete, dual-codeable, and identify nobody. Test each phrase by asking whether it names a party or a mechanism; keep every mechanism, drop every party.

---

## Confidence assessment

| Finding | Confidence | Basis |
|---|---|---|
| Causality (because, not and-then) is the one universal across all frameworks | **High** | Aristotle, McKee, Pixar, Parker & Stone converge; no source contradicts |
| Three-act / hero's-journey beat lists are genre convention, not universals | **High** | Freytag derived from tragedy specifically; Vonnegut rule 8 directly contradicts suspense as a requirement |
| Desire/obstacle/change is necessary for *story*, not for *narrative effect* | **High** | Lyric essay, photobook, montage, comics, vérité — four independent traditions, no contradiction |
| Meaning is generated by the viewer from adjacency + omission | **High** | McCloud, Kuleshov/Eisenstein, Power, D'Agata & Tall, Sitzia |
| Self-generated conclusions are better remembered (generation effect, d ≈ 0.40) | **High** for the effect; **Medium** for transfer to visual inference on a web page | Multiple meta-analyses; but source studies are word-list paradigms |
| Concrete detail is recalled better than abstraction (dual coding) | **High** | Long-replicated; mechanism confirmed by imagery-blocking experiments |
| Narrative persuasion effects are real but modest (r ≈ .17–.23) | **High** | Braddock & Dillard meta-analysis, k = 5–40 per outcome |
| Peak-end rule: ending disproportionately determines remembered experience | **High** | Kahneman & Fredrickson 1993 + extensive replication |
| Users' viewing time is heavily front-loaded (57% above fold, 81% in three screenfuls) | **High** | NN/g eyetracking, 2018, with 2010 comparison |
| Scrollytelling improves engagement | **Low** | Headline stats are agency marketing with no methodology; academic work is equivocal |
| Humblebragging backfires via perceived insincerity, worse than plain bragging | **High** | Sezer/Gino/Norton, nine studies incl. diary + field experiment |
| Redemption sequences make an audience like you more | **Low** | The literature measures teller well-being, not audience judgement — commonly over-claimed |
| Museum visitors construct narrative even in free-circulation layouts | **High** | Sitzia; corroborated by Francis's UCL thesis with encode/decode interviews |
| Equal-size grids suppress adjacency meaning (salon-hang effect) | **Medium** | Well-attested in curatorial writing; no controlled study located |
| Childhood/adult pairing is instantly legible | **High** | Werning and Otsuka both widely circulated — which is also why it risks reading as trope |

## Open questions

1. **Does the generation effect actually transfer to this kind of inference?** The evidence is from verbal recall paradigms. Whether a viewer who infers "he never grew up" from an unmatched drawing pair retains it better than one who reads the sentence is untested. Risk 3's five-person test is the cheapest available proxy and should be run.
2. **How many pairs are needed to establish the rule before breaking it?** Three is my recommendation, extrapolated from Power/Gossage's six-to-seven-image limit and from comics practice. No empirical basis. Two may suffice; four probably over-establishes.
3. **Does the "deferred callout" read at all to a viewer with no drafting literacy?** A missing callout number and a break line are unambiguous to an engineer and possibly invisible to everyone else. This needs testing on non-technical viewers specifically, and the fallback (making the gap slightly more overt) should be designed in advance.
4. **Whether the anonymised work story survives without a sector.** Spec open decision #2 is still unresolved and directly affects §6's concreteness.
5. **Whether the peak (wear detail) and the ending (ITEM 00) are too close together.** Peak-end theory wants both to land; placing them three screenfuls apart is a guess.
6. **No source located** on whether personal websites specifically are experienced as narrative. All web evidence here is from journalism, data visualisation, and general usability. This is a genuine gap and would require primary research.

## Sources

**Story frameworks and craft**
- [Aristotle, *Poetics* ch. VII (monadnock.net)](https://monadnock.net/aristotle/poetics-7.html)
- [SparkNotes — *Poetics* chs. 7–9](https://www.sparknotes.com/philosophy/poetics/section4/)
- [Jane Friedman — Classic Story Structures and What They Teach Us About Novel Plotting](https://janefriedman.com/story-structure/)
- [Scribophile — Freytag's Pyramid](https://www.scribophile.com/academy/what-is-freytags-pyramid)
- [Pixar's 22 Rules of Storytelling (Aerogramme Studio, full text)](https://www.aerogrammestudio.com/2013/03/07/pixars-22-rules-of-storytelling/)
- [Prolost — "Pixar's 22 Rules of Story," Analyzed](https://prolost.com/blog/2013/12/4/pixars-22-rules-of-story-analyzed.html)
- [Gotham Writers — Kurt Vonnegut: 8 Basics of Creative Writing](https://www.writingclasses.com/toolbox/tips-masters/kurt-vonnegut-8-basics-of-creative-writing)
- [Robert McKee — The Gap Between Expectation and Result](https://mckeestory.com/the-gap-between-expectation-and-result/)
- [Emily Short — notes on McKee's *Story* and the expectation gap](https://emshort.blog/2019/02/05/story-robert-mckee/)
- [McKee on true character (Goodreads, from *Story*)](https://www.goodreads.com/quotes/647959-true-character-is-revealed-in-the-choices-a-human-being)
- [Karen Woodward — McKee on characterization vs. character](https://blog.karenwoodward.org/2014/08/robert-mckee-and-characterization-vs-character.html)
- [Grove Atlantic — Robert Olen Butler, *From Where You Dream*](https://groveatlantic.com/book/from-where-you-dream/)
- [Fiction Writers Review — interview with Robert Olen Butler](https://fictionwritersreview.com/interview/fuck-sentimentality-an-interview-with-robert-olen-butler/)
- [Absolute Write — Sol Stein, *Stein on Writing* (particularity)](https://absolutewrite.com/2019/01/14/sol-stein-stein-on-writing-1995/)
- [Bobby Powers — Sol Stein's top writing tips](https://bobbypowers.com/sol-steins-top-13-writing-tips/)
- [Breaking the Rules — the South Park "but/therefore" technique](https://breakingtherules.substack.com/p/the-south-park-technical-writing)
- [Impactful Speaking — why some stories are boring](https://impactfulspeaking.substack.com/p/why-some-stories-are-boring-and-how)
- [Reagan et al. 2016, *EPJ Data Science* — The emotional arcs of stories are dominated by six basic shapes](https://cdanfort.w3.uvm.edu/research/2016-reagan-epj.pdf)
- [MIT Technology Review — Data Mining Reveals the Six Basic Emotional Arcs of Storytelling](https://www.technologyreview.com/2016/07/06/158961/data-mining-reveals-the-six-basic-emotional-arcs-of-storytelling/)
- [StudioBinder — Chekhov's Gun: setup and payoff](https://www.studiobinder.com/blog/chekhovs-gun/)
- [Britannica — Chekhov's gun](https://www.britannica.com/topic/Chekhovs-gun)
- [Arcadia — Crafting a Story Finale: the Chekhov's Gun principle](https://www.byarcadia.org/post/crafting-a-story-finale-the-chekhov-s-gun-principle)
- [Media Studies — Roland Barthes' five narrative codes](https://media-studies.com/barthes-codes/)
- [NUS — Five Codes of Roland Barthes](https://courses.nus.edu.sg/course/elljwp/5codes.htm)
- [Storm Writing School — The Problem with "Show, Don't Tell"](https://stormwritingschool.com/the-problem-with-show-dont-tell/)
- [Writer's Digest — Bad Advice Boogie: Show, Don't Tell](https://www.writersdigest.com/write-better-fiction/bad-advice-boogie-show-dont-tell)

**Non-narrative and spatial form**
- [Seneca Review — Tall & D'Agata, the lyric essay (original definition)](https://senecareview.hws.edu/the-lyric-essay)
- [Writers.com — The Lyric Essay: examples and techniques](https://writers.com/lyric-essay)
- [Conscientious Photography Magazine — Photography and Narrative, part 2](https://cphmag.com/narrative-2/)
- [Magnum Photos — Mark Power, The Language of Pictures: Exploring Sequencing](https://www.magnumphotos.com/theory-and-practice/mark-power-the-language-of-pictures-exploring-sequencing/)
- [Understanding Comics — transitions and gutters (closure)](https://understandingcomics177.wordpress.com/about/1-2/2-2/)
- [The Patron Saint of Superheroes — Analyzing Comics 101: Closure](https://thepatronsaintofsuperheroes.wordpress.com/2016/01/11/what-it-really-takes-to-get-from-here-to-there-analyzing-comics-101-closure/)
- [Media Studies — Eisenstein and the five methods of montage](https://media-studies.com/eisenstein-montage/)
- [Humanities LibreTexts — Soviet Montage and the Kuleshov Effect](https://human.libretexts.org/Courses/Nashville_State_Community_College/Tokyo_in_Film/04:_Post-Production/4.03:_Editing_and_Animation/4.3.02:_Soviet_Montage_And_The_Kuleshov_Effect)
- [Henry Jenkins — Game Design as Narrative Architecture (MIT)](https://web.mit.edu/~21fms/People/henry3/games&narrative.html)
- [Jenkins — Game Design as Narrative Architecture (PDF)](https://paas.org.pl/wp-content/uploads/2012/12/09.-Henry-Jenkins-Game-Design-As-Narrative-Architecture.pdf)
- [Sitzia — Narrative Theories and Learning in Contemporary Art Museums (Stedelijk Studies)](https://stedelijkstudies.com/journal/narrative-theories-learning-contemporary-art-museums-theoretical-exploration/)
- [Francis — *Excavating Freytag's Pyramid*, UCL doctoral thesis](https://discovery.ucl.ac.uk/id/eprint/10118292/)
- [Francis — full text via CORE](https://core.ac.uk/reader/374290430)
- [VirtuNarrator — museum narrative via spatial layout (ScienceDirect)](https://www.sciencedirect.com/science/article/pii/S2468502X25000403)
- [Brian O'Doherty — Inside the White Cube, part I (Artforum)](https://www.artforum.com/features/inside-the-white-cube-notes-on-the-gallery-space-part-i-214843/)
- [Fiveable — institutional spaces and white cube galleries](https://fiveable.me/installation-art/unit-3/institutional-spaces-white-cube-galleries/study-guide/eNcnuKQbNPAwhHSJ)
- [designboom — Irina Werning, Back to the Future](https://www.designboom.com/art/irina-werning-back-to-the-future/)
- [My Modern Met — Irina Werning, Back to the Future](https://mymodernmet.com/back-to-the-future-11-total/)
- [It's Nice That — Chino Otsuka, Imagine Finding Me](https://www.itsnicethat.com/articles/photography-chino-otsuka)
- [LensCulture — Chino Otsuka, Photo Album](https://www.lensculture.com/articles/chino-otsuka-photo-album)
- [Collider — the greatest cinéma vérité films](https://collider.com/best-cinema-verite-movies-ranked/)
- [PBS Independent Lens — Cinema Verite: The Movement of Truth](https://www.pbs.org/independentlens/blog/cinema-verite-the-movement-of-truth/)

**Empirical psychology**
- [Green & Brock — transportation theory (overview and 2000 findings)](https://en.wikipedia.org/wiki/Transportation_theory_(psychology))
- [Green & Appel 2024 — Narrative Transportation: advances (preprint)](https://www.mcm.uni-wuerzburg.de/fileadmin/06110300/2024/Pdfs/Green___Appel__2024__Advances_Preprint.pdf)
- [Braddock & Dillard 2016 — meta-analytic evidence for the persuasive effect of narratives (*Communication Monographs*)](https://www.tandfonline.com/doi/abs/10.1080/03637751.2015.1128555)
- [Penn State record — Braddock & Dillard meta-analysis](https://pure.psu.edu/en/publications/meta-analytic-evidence-for-the-persuasive-effect-of-narratives-on)
- [ScienceDirect — the effect of word concreteness on recognition memory](https://www.sciencedirect.com/science/article/abs/pii/S1053811906006781)
- [PeerJ preprint — concrete vs abstract words and dual coding theory](https://peerj.com/preprints/2719v1.pdf)
- [Bertsch et al. — the generation effect: a meta-analytic review (*Memory & Cognition*)](https://link.springer.com/article/10.3758/BF03193441)
- [Psychonomic Bulletin & Review — theories of the generation effect, meta-analytic review](https://link.springer.com/article/10.3758/s13423-020-01762-3)
- [Memory & Cognition — generation constraint and memory](https://link.springer.com/article/10.3758/s13421-020-01119-0)
- [Frontline Learning Research — self-generation during learning](https://journals.sfu.ca/flr/index.php/journal/article/view/407)
- [Psychology Fanatic — Loewenstein's information-gap theory of curiosity](https://psychologyfanatic.com/information-gap-theory/)
- [Kidd & Hayden — The Psychology and Neuroscience of Curiosity (*Neuron*)](https://www.sciencedirect.com/science/article/pii/S0896627315007679)
- [Nielsen Norman Group — The Peak–End Rule: How Impressions Become Memories](https://www.nngroup.com/articles/peak-end-rule/)
- [Positive Psychology — what is peak-end theory](https://positivepsychology.com/what-is-peak-end-theory/)
- [SUE Behavioural Design — peak-end rule at work](https://www.suebehaviouraldesign.com/en/blog/peak-end-rule-at-work/)
- [McAdams & McLean 2013 — Narrative Identity (*Current Directions in Psychological Science*)](https://journals.sagepub.com/doi/10.1177/0963721413475622)
- [McAdams et al. 2001 — redemption and contamination sequences (*PSPB*)](https://journals.sagepub.com/doi/10.1177/0146167201274008)
- [Adler et al. — variation in narrative identity and mental health trajectories (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4395856/)
- [Yu-kai Chou — McAdams's life-story theory summary](https://yukaichou.com/behavioral-analysis/narrative-identity-mcadams-life-story-self/)
- [Sezer, Gino & Norton — Humblebragging (HBS working paper PDF)](https://www.hbs.edu/ris/Publication%20Files/15-080_97293623-53aa-4df8-b967-38617e144fd9.pdf)
- [Humblebragging — SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2597626)
- [HBS Working Knowledge — Humblebragging: a distinct and ineffective self-presentation strategy](https://hbswk.hbs.edu/item/7789.html)
- [HBS Working Knowledge — humblebragging is a bad strategy, especially in a job interview](https://www.library.hbs.edu/working-knowledge/humblebragging-is-a-bad-strategy-especially-in-a-job-interview)
- [Psychology Today — why people hate humblebragging](https://www.psychologytoday.com/us/blog/fulfillment-any-age/201803/why-people-hate-humblebragging)
- [Heath Brothers — *Made to Stick*](https://heathbrothers.com/books/made-to-stick/)
- [Unusual VC — six principles from *Made to Stick*](https://www.unusual.vc/made-to-stick-chip-and-dan-heath/)

**Web and scroll behaviour**
- [Nielsen Norman Group — Scrolling and Attention (2018 update)](https://www.nngroup.com/articles/scrolling-and-attention/)
- [Nielsen Norman Group — Scrolling and Attention (original research study)](https://www.nngroup.com/articles/scrolling-and-attention-original-research/)
- [Mittenentzwei et al. 2023 — user behaviour in slideshows and scrollytelling (*Computers & Graphics*)](https://www.sciencedirect.com/science/article/abs/pii/S0097849323001061)
- [ACM record — Mittenentzwei et al. 2023](https://dl.acm.org/doi/10.1016/j.cag.2023.06.011)
- [ACM — The Impact of Scrollytelling on the Reading Experience of Long-Form Journalism](https://dl.acm.org/doi/fullHtml/10.1145/3605655.3605683)
- [DesignRush — scrollytelling (vendor claims, low confidence)](https://www.designrush.com/agency/website-design-development/trends/scrollytelling)
- [Digital Silk — scrolling effects in web design (vendor claims, low confidence)](https://www.digitalsilk.com/digital-trends/scrolling-effects/)
- [Webflow — scrollytelling guide](https://webflow.com/blog/scrollytelling-guide)
