# Lower GI bleeding: Abdomen.pdf physical pp. 86–87

Status: bounded lesson update; independent source/education/language/assessment review passed. UX correction was independently retested statically; browser evidence remains blocked.

## Learning path

1. Compare unenhanced, arterial and portal-venous CTA for new intraluminal contrast.
2. Localise and report the bowel segment/vascular territory; preserve the intermittent-bleeding caveat.
3. If CTA shows extravasation, teach catheter angiography and possible selective embolisation as a conditional next step within the clinical pathway.
4. Summarise the CTA → selective angiography → possible embolisation → completion-check sequence and test territory selection.

The lesson does not teach catheter manipulation, device sizing, embolic dosing, resuscitation, or patient-specific management.

## Source coverage ledger

| Note | Source | Importance | Lesson location | Status / disposition |
|---|---|---|---|---|
| Definition: source distal to ligament of Treitz | Abdomen.pdf physical p.86 / printed p.85 | Context | Existing lesson title/intro | Deferred; the imaging lesson assumes the named topic and does not introduce a clinical definition chapter |
| Common causes: diverticulosis, angiodysplasia, ischaemic colitis, tumours/polyps | Abdomen.pdf p.86 | Context | Not reproduced | Deferred: outside this focused imaging pathway; no prevalence claims copied |
| Colonoscopy as first-line and CTA after negative endoscopy | Abdomen.pdf p.86 | Context, version-sensitive | Existing CTA context does not repeat a rigid universal sequence | Qualified/partly deferred; current pathways depend on clinical stability and local resources |
| Unenhanced, arterial and portal-venous CTA phase roles | Abdomen.pdf p.86 | Essential | `phases` in route | Included in DE/EN/FA; page and image sequence inspected. The source CT panels have no legible phase labels, so they are not relabelled or reused |
| CTA extravasation and pooling/localisation | Abdomen.pdf p.86 | Essential | `phases`, `report` | Included; existing route language refined for comparison and localization |
| CTA detection rate / numerical threshold | Abdomen.pdf p.86 | Version-sensitive | Not reproduced | Deferred; no unverified rate or threshold added |
| DSA called “gold standard” after positive CTA | Abdomen.pdf physical p.87 / printed p.86 | Essential source assertion, requires nuance | `angioIntro` | Included only as quoted source wording and explicitly qualified; not presented as automatic treatment or universal rule |
| Transfemoral access and selective SMA / IMA angiography by territory | Abdomen.pdf p.87 | Essential pathway concept | `angioSteps[0]` | Included and clinically qualified: SMA—small bowel/right colon; IMA—left colon and superior rectal artery; other rectal branches may arise from internal iliac territory. Park et al. 2020 (PMID 31530489) is a single-centre retrospective rectal-embolisation cohort, not a universal pathway |
| Superselective microcatheter access to bleeding branch | Abdomen.pdf p.87 | Essential pathway concept | `angioSteps[2]` | Included at conceptual level, not procedural instructions |
| Coils or particles | Abdomen.pdf p.87 | Essential source detail | `angioSteps[2]` | Included as materials named by the PDF, with no sizing or technique |
| Completion angiography documents no further extravasation | Abdomen.pdf p.87 | Essential | `angioSteps[3]`, summary, card | Included and linked assessment/card consistency checked |
| Bowel ischaemia tradeoff | Not stated on p.87; ACR 2021 update | Safety context | `angioSteps[3]` | Added as a qualitative caveat; no rate or threshold stated |
| Surgery in rare uncontrollable cases | Abdomen.pdf p.87 | Essential source boundary | `surgery` callout | Included as a rare rescue boundary, with current decision deferred to multidisciplinary care |

## Visual plan

| Goal | Media | Source/status | Rationale |
|---|---|---|---|
| Teach CTA extravasation morphology | Existing translated `gi-bleed` SVG in the hero | Code-native schematic; reviewed in source | It depicts contrast entering bowel lumen and is explicitly a teaching schematic, not a patient image |
| Teach treatment sequence and territory | Four translated step cards in lesson body | Code/layout-native sequence | No procedural DSA case exists on p.87. The p.86 CT triptych lacks reliable phase labels and does not visibly demonstrate a specific extravasation target; it is intentionally not used as a labelled diagnostic case |

## Scientific framing and references

- The ESGE 2021 guideline recommends CTA before endoscopic or radiologic treatment to locate the bleeding site in hemodynamically unstable patients with suspected ongoing bleeding. It states that CTA extravasation can be followed by angiography and selective mesenteric embolisation; the wording supports a possible pathway, not an automatic requirement for every positive CTA. DOI: 10.1055/a-1496-8969.
- ACR Appropriateness Criteria 2021 update distinguishes clinical scenarios: CTA and transcatheter arteriography/embolisation are usually appropriate in active bleeding with hemodynamic instability or high transfusion requirement; embolisation suitability depends on localization and angiographic evidence. DOI: 10.1016/j.jacr.2021.02.018.
- ACG updated guideline 2023 notes the increasing role of CTA in severe lower-GI bleeding and addresses management after positive CTA. DOI: 10.14309/ajg.0000000000002130; PMID 36735555.
- ASGE acute-LGIB guideline published 28 Aug 2026 accepts colonoscopy or contrast CT with/without angiography as initial modalities; its pathway differentiates stability after resuscitation and describes CT ± embolisation for ongoing instability/positive findings. DOI: 10.1016/j.gie.2026.06.046.
- Park S et al. Outcome of Rectal Arterial Embolization for Rectal Bleeding in 34 Patients. J Vasc Interv Radiol. 2020;31:576–583. DOI: 10.1016/j.jvir.2019.05.013; PMID 31530489. Used only to support the caution that rectal embolisation assessment may involve both IMA and internal iliac territories; small retrospective cohort, not a universal procedural recommendation.
- The lesson avoids transferring the PDF's broad “gold standard” label into a universal clinical rule. It does not give procedural instructions or make a patient-specific recommendation.

## Translation and assessment

The lesson, process steps, self-check, MCQ and three flashcards contain DE/EN/FA text. The self-check tests conditional progression from a positive CTA; the registered MCQ retains the negative-CTA timing caveat. Flashcards separately test CTA timing, vessel territory and completion imaging.

## Validation evidence

- Source: physical pages 86–87 inspected as rendered page images. p.86 has a three-panel CTA image sequence without legible phase labels; p.87 contains text only. No image-derived phase claims were added.
- Scientific search: ESGE 2021 primary guideline, ACR 2021 criteria/update, and ACG 2023 guideline reviewed for pathway qualification. Browser has not yet been re-tested.
- Still required: browser test in DE/EN/FA, desktop/mobile, light/dark and interactions; separate clinical sign-off by Dr. Zia.
- Status: curriculum remains `inProgress`. This ledger, a passing code check, or an AI review does not mean clinical approval or publication readiness.

## Independent review and assessment repairs — 2026-10-23

The independent review confirmed source coverage, conditional CTA→angiography→possible selective embolisation wording, vessel territories, image handling, and static DE/EN/FA parity. It found that the lesson requested 10 quiz questions despite one registered question, the quiz had no return path, and distractors were overly absolute/uneven. The lesson and curriculum now request exactly one question and pass a language-preserving `from` path; its flashcard link also returns to the lesson. The inline check distractors now describe plausible interpretation/territory errors with less giveaway wording. The registered MCQ asks why bleeding can remain clinically relevant after negative CTA; distractors address native hyperdensity, phase-only interpretation and intermittent bleeding exclusion. Independent retest confirms the curriculum deep link decodes to the lesson path, each language retrieves exactly one four-option MCQ with key A, and the links align.

Targeted validation after these corrections: `audit-abdomen-thorax-assessment-retrieval.mjs` passes with one four-option item per language under the exact topic, matching the lesson's `n=1` link and return URL; `npm run audit:mcq` passes with 784 questions / 18 cases per language; `audit-abdomen-thorax-copy-parity.cjs` confirms 19 locale units for this route. These checks do not establish rendered browser behavior or clinical approval.

## Independent UX finding and correction — 2026-10-23

Independent review found that the route duplicated the title and added an explanatory subtitle beneath the shared `LessonHero`, while also nesting a second `<main>` inside the shell's `<article>` (LOWERGI-UX-01, major). The route now relies on the shell's single title/hero, moves the concise introduction to the first teaching content, supplies a source-specific localized chapter title, and opts into the shell's outer main landmark. The route body is a `<div>` inside the shell article. `scripts/test-lower-gi-bleeding-shell.mjs` asserts the single-landmark structure, absence of duplicated title/subtitle, and localized chapter title. The independent reviewer confirmed the structural issue before correction and independently retested the correction: the focused shell assertion, assessment retrieval audit, and MCQ audit all pass. Rendered browser behavior remains unverified.

The shell-level correction passed its focused source-structure assertion and JSX parsing. Rendered accessibility-tree, responsive/browser, RTL interaction and keyboard retest remain blocked by lack of browser access. This fix does not change CTA/angiography content; source, semantic parity and assessment review for the bounded PDF delta remain PASS. Dr. Zia's scientific sign-off is still pending.

## Curriculum return-link correction — 2026-10-23

Both the curriculum MCQ and flashcard URLs now include the encoded return path to
`/abdomen/gi/untere-gi-blutung`, matching the lesson's own language-preserving
actions. The independent reviewer confirmed that quiz and flashcard consumers
use `from` as their back target. `audit-abdomen-thorax-assessment-retrieval.mjs`,
`test-lower-gi-bleeding-shell.mjs`, and `npm run audit:mcq` pass. ASM and REV
pass statically for this link delta; browser click-through and clinical approval
remain open.
