# Epiploic appendagitis — Abdomen.pdf p.97

Author draft, 2026-10-19. Independent review pending; `inProgress` and no release/scientific approval. Browser verification is blocked by the shared local environment; do not start another dev server for this batch.

## Scope and outline recorded before implementation

- Curriculum ID `appendicitis-epiploica`, chapter `abdomen-peritoneum`; no existing dedicated route found. New route `/abdomen/peritoneum/appendicitis-epiploica`.
- Audience: radiology learners who recognise CT fat attenuation and the colon. Outcome: recognise a pericolonic fat-centred lesion, assess adjacent bowel before calling it primary appendagitis, and avoid treating the dot or a size cutoff as mandatory.
- Three goals: locate the lesion's epicentre; interpret rim/dot/bowel-wall findings together; distinguish a typical uncomplicated primary pattern from adjacent bowel inflammation that requires a different assessment.
- Chapter 1 `Fettanhang statt Wurmfortsatz`: anatomy, ischaemic mechanism, focal pain. This prevents confusion with vermiform appendicitis.
- Chapter 2 `Den Herd am Kolon finden`: three CT observations plus the actual source montage, a brief viewing task, and a dot/size caveat. CT is the PDF's modality; no invented US/MRI section.
- Chapter 3 `Darmwand und klinischen Verlauf mitprüfen`: bowel-centred differential/secondary inflammation, narrow conservative-management implication, one reasoning question and three retrieval prompts.
- Three take-home points repeat core reasoning without adding new facts.

## Source coverage

All points below come from visually inspected Abdomen.pdf PDF p.97 / printed p.96 unless otherwise stated. The page was inspected at 120 and 200 dpi; no unreadable body text identified.

| ID | Source point | Priority | Disposition / planned location |
| --- | --- | --- | --- |
| E01 | Fat-filled appendage projecting from external colonic serosa | essential | Chapter 1; distinguish from vermiform appendix |
| E02 | Ischaemic infarction, usually torsion or venous thrombosis | essential | Chapter 1; no unsupported prevalence |
| E03 | Acute localised pain, often left lower quadrant | essential | Chapter 1; pain site alone is not diagnostic |
| E04 | Oval fat-density lesion immediately next to colon | essential | CT observations in chapter 2 |
| E05 | PDF states <3 cm | essential caveat | Small size retained qualitatively; <3 cm is not taught as an exclusion cutoff. Singh 2004 includes typical lesions exceeding 3 cm; Hwang 2013 range extends to 3.7 cm |
| E06 | Hyperdense peripheral rim, inflamed serosal covering | essential | Chapter 2; rim interpreted as inflammatory boundary |
| E07 | Central dot, thrombosed vein | essential | Chapter 2; supportive but not required. Dot is not clearly demonstrated in every supplied panel and is not claimed to be visible in this specific montage |
| E08 | Four axial pelvic CT images, original case rID85024 | essential visual | Authorised PDF crop; link to original Radiopaedia case and explicit provenance |
| E09 | Left iliac fossa, next to sigmoid; thin ring; no relevant adjacent colonic wall thickening | essential | Viewing task/caption, then bowel-wall comparison in chapter 3 |
| E10 | Self-limiting | essential | Chapter 3, confined to a confidently diagnosed uncomplicated primary pattern |
| E11 | PDF: no operation / no antibiotics | essential caveat | Recast as usually conservative; no routine antibiotics or surgery for the uncomplicated primary pattern. Diagnostic uncertainty, worsening or a different bowel process requires reassessment; no dose/drug schedule |
| E12 | Supplement: diverticulitis/secondary epiploic inflammation | necessary differential | Jalaguier 2010 original comparative CT study; evaluate inflamed diverticulum and bowel-wall changes, do not infer exclusion from the ring alone |
| E13 | Supplement: reassess persistent/worsening/recurrent symptoms | necessary boundary | Narrow clinical safety context, supported by retrospective management studies; no fixed mandatory follow-up imaging or colonoscopy rule |

## Sources actually checked, publication separate from check date

Check date for all: 2026-10-19.

- Singh AK et al., *CT appearance of acute appendagitis*, AJR 2004;183:1303–1307, DOI 10.2214/ajr.183.5.1831303, [PubMed](https://pubmed.ncbi.nlm.nih.gov/15505294/). Primary 50-patient CT study. Indexed abstract was available; direct PubMed body was unavailable. Typical fatty lesion/rim pattern, dot not universal, size not a rigid <3 cm cutoff. No image reused from this article.
- Hwang JA et al., *Differential diagnosis of left-sided abdominal pain: primary epiploic appendagitis vs colonic diverticulitis*, WJG 2013;19:6842–6848, [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC3812483/). Primary retrospective comparison (28 PEA, 25 ACD); indexed full text/results table 3 inspected, direct page CAPTCHA. Ovoid fatty mass, non-universal dot, possible mild bowel-wall thickening and size range support the caveats. No clinical percentages or universal thresholds taught.
- Jalaguier A et al., Emerg Radiol 2010;17:51–56, DOI 10.1007/s10140-009-0822-x, [PubMed abstract](https://pubmed.ncbi.nlm.nih.gov/19517148/). Original CT comparison of primary appendagitis and diverticulitis-associated secondary appendagitis. Used only for evaluating the bowel and primary/secondary distinction; no diagnostic accuracy percentage generalised.
- Tan R, Parys S, Watanabe Y., *Diagnosis and management of epiploic appendagitis: a single-institution 10-year experience*, 2021, DOI 10.5604/01.3001.0014.8912, [PubMed](https://pubmed.ncbi.nlm.nih.gov/36169532/). Retrospective management evidence, not a randomised antibiotic trial. No routine antibiotics in a typical uncomplicated primary case is a conditional teaching point, not a universal prohibition.
- Erdoğrul et al., J Acad Res Med 2024;14:121–124, DOI 10.4274/jarem.galenos.2024.79307, [primary article PDF](https://www.jarem.org/pdf/df902063-0ec2-4245-8d72-4b997c70c061/articles/jarem.galenos.2024.79307/121-124.pdf). Actual PDF opened. Thirty-one-patient retrospective study supports conservative management and reassessment of recurrent cases. All patients received antibiotics, so it does not establish their necessity or prove a no-antibiotic regimen. This limitation is retained in the source map rather than hidden.

## Media plan / provenance

- Hero: original code-native colon/fat-appendage schematic; decorative, not CT evidence.
- Main figure: crop from PDF p.97 at 200 dpi, four original axial CT panels plus the complete original German source caption and rID85024. Teach fat-centred lesion/rim near sigmoid and the adjacent wall; no asserted central dot, acquisition phase or unprovided series/frame IDs.
- Original case URL: https://radiopaedia.org/cases/85024 . Web access returned an internal/unavailable result; contributor not identified in supplied PDF. Do not invent a contributor or claim independent legal clearance. User-authorised project use is recorded in `standard.md`.
- Final crop is `public/abdomen/epiploica/ct-montage.png`, 1370×875 px, extracted at x210/y1080/w1370/h875 from the 200-dpi page. Author opened the actual final crop: all four panels, complete original caption and rID are retained. Dimensions, coordinates, author inspection and access limits are recorded in `public/abdomen/epiploica/image-provenance.json`. Hero SVG was rendered to PNG and separately opened; it has no text or language-dependent labels. The clinical montage has a full-size link with a translated accessible name.

## Terminology

Epiploische Appendagitis / epiploic appendagitis / التهاب زائدهٔ چربی کولون؛ Appendix epiploica / epiploic appendage / زائدهٔ چربی کولون؛ hyperattenuierender Randsaum / hyperattenuating rim / حاشیهٔ پُرچگال؛ central dot sign / central dot sign / نشانهٔ نقطهٔ مرکزی. Keep the existing curriculum ID; align all display titles with the non-ambiguous Persian name and explain the anatomy in the lesson.

## Validation and handoff

Implemented files: `data/epiploicaLesson.js`; `app/abdomen/peritoneum/appendicitis-epiploica/page.jsx` and CSS; three assets in `public/abdomen/epiploica/`; this ledger; `scripts/check-epiploica-lesson.mjs`. The exact curriculum ID is connected to lesson, quiz and flashcard routes; localized question and flashcard data use that same ID. Other authors' current registry additions were preserved, including the medulloblastoma registration.

- `node scripts/check-epiploica-lesson.mjs`: PASS — 35 content and 27 interface translation units after the hero-alt correction, JSX AST, 3 chapters, 3 CT observations, one connected four-option question per language, 3 retrieval cards, image dimensions/provenance and exact curriculum/bank mapping. Structural/string checks do not establish clinical accuracy; direct author semantic comparison also covered all DE/EN/FA prose, captions, options, feedback and accessible labels.
- `npm run audit:mcq`: PASS — latest shared-bank audit returned 784 questions and 18 cases per language. One question per language belongs to this lesson; the full count includes other lessons.
- Scoped tracked `git diff --check` and new-file `git diff --no-index --check`: no whitespace errors. Routine LF/CRLF warnings and no-index exit 1 for added-file differences are not validation failures.
- Main PDF crop and original SVG hero opened and inspected; no diagnostic pixels generated or annotations invented. The original case website remains inaccessible, so contributor metadata is unresolved rather than legally cleared.
- Browser desktop/mobile, RTL, theme, complete/read behaviour, full-size link and question interaction remain BLOCKED; no new server was started in the restricted shared environment. No production build or browser PASS claimed.

One connected four-option question per language and three flashcards registered under the existing topic ID. Keep `inProgress`; no commit, push, release or scientific approval is implied.

## Independent re-review and bounded corrections — 2026-10-23

Independent review found: curriculum Persian title ambiguity; local retrieval cards not connected to the global flashcard bank; and overly absolute MCQ distractors. The lesson title and question-bank group already used “التهاب زائدهٔ چربی کولون”; the curriculum title is now aligned in DE/EN/FA, a global flashcard topic and three cards are registered under `appendicitis-epiploica`, the curriculum and lesson shell link to that route, and distractors now model sigmoid diverticulitis, omental infarction and an indeterminate focal fat infarct without changing the keyed answer. The registered card content reuses the lesson's three existing localized retrieval pairs.

Independent review before these corrections: SRC and EDU PASS; VIS PASS for the inspected PDF montage and schematic (case contributor remains unverified); LNG and ASM REVISE for the findings above; UX BLOCKED without rendered browser evidence. Independent delta retest confirms the titles match across lesson/curriculum/question topic/flashcard topic, the exact global flashcard route retrieves all three cards and links back to the lesson, and the revised MCQ retains a consistent B key with plausible translated distractors. SRC, EDU, LNG, ASM and REV now PASS for this bounded delta; VIS remains PASS for the previously inspected media while contributor metadata remain unverified; UX remains BLOCKED. User-authorised PDF image reuse is recorded, but independent contributor metadata and browser/runtime behavior are not verified.

## Return-path correction — independent retest 2026-10-23

The reviewer found that the lesson MCQ and flashcard actions, and the curriculum MCQ URL, did not carry a return target. Both lesson actions and both curriculum actions now return to the lesson; the lesson route encodes the current language in the return target for EN/FA, while DE uses the plain route. A focused checker asserts the targets. Independent retest decoded the EN/FA return URLs and confirmed the test. `scripts/check-epiploica-lesson.mjs`, `scripts/audit-abdomen-thorax-assessment-retrieval.mjs`, and `npm run audit:mcq` pass. ASM and REV pass statically for this correction; browser UX and specialist clinical approval remain open.

## Author repairs for independent UX findings — pending independent retest

1. **Accessible hero:** added translated `heroAlt` in the lesson data. The route opts into `StandardLessonShell`'s new `heroImageAlt` prop, which renders the actual maintained `components/LessonHero.jsx` with the topic SVG, one title and the current language. The ambient page background, palette, actions, progress, lesson content and learning path remain in the existing shell. No subtitle was introduced. The other five existing shell consumer routes do not opt in and keep their existing decorative CSS hero.
2. **Location synchronization:** the route opts into `syncHashNavigation`. `lib/lessonHashNavigation.js` resolves recognised chapter/summary hashes, synchronizes once on mount, listens to `hashchange` and `popstate`, and returns cleanup for both listeners. Empty hashes select the first teaching chapter; unknown or malformed fragments leave state alone. A location change to a teaching chapter closes a URL-targeted summary, while the summary's manual disclosure remains separate. Language-effect reattachment uses stable chapter IDs and the current fragment; the existing language provider preserves the fragment when changing its query parameter. Existing consumers without the opt-in flag retain their previous behavior.

Additional checks:

- `node scripts/test-lesson-hash-navigation.mjs`: PASS with the production observer and a browser-independent EventTarget. Covers direct/changed/encoded hashes, summary, history-event dispatch, empty hash, language-effect reattachment without duplicate listeners, malformed/unknown hashes and unmount cleanup. **This is not a test of real browser history APIs, scrolling, hydration or the language-switch UI.**
- `node scripts/test-standard-lesson-hero.mjs`: PASS for actual shell and LessonHero SSR in DE/EN/FA: translated alt, one h1, language/direction, retained lesson structure and the legacy default branch. CSS modules and Next Image/Link are isolated mocks; **this is not browser layout, image loading or screenshot verification**.
- JSX parsed for the shell, LessonHero and all six current shell consumers. Epiploica, Ormond, pulmonary-hypertension parity and Technik incident checks PASS after the shared change; the p.23 Technik checker was separately verified in that author's read-only review. Shared diff whitespace clean.
- Shared changes are limited to the two opt-in props, their hero wrapper CSS, navigation observer and template documentation. No access, auth, read-progress persistence or global language-provider changes. Browser/plugin runtime remains unavailable for the established local test environment; no new server started. Both repairs are handed off for independent retest, with browser UX still BLOCKED.
