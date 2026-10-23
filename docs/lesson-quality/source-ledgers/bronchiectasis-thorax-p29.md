# Bronchiectasis — Thorax.pdf p.29 (printed p.28)

## Scope and evidence ledger

This bounded addition creates a report-focused CT lesson at `/thorax/bronchiektasen` and sets the exact curriculum topic `bronchiektasen` to `inProgress`. Thorax.pdf is the supplied coverage source; external clinical sources below supply diagnostic imaging details. The PDF page is a **topic cue only**, not a source for the CT criteria taught here.

| Source | Evidence inspected | Lesson disposition | Limitations |
| --- | --- | --- | --- |
| Thorax.pdf, physical PDF p.29, printed p.28 | Extracted page text and rendered page image `.tmp-thorax-p29.png` | The slide title is “Tracheobronchialsystem” and lists “Bronchiektasen”, “Bronchiolitis”, and “COPD”. It contains no bronchiectasis definition, CT signs, report example, or relevant diagnostic image. It cues this topic and nothing more. | No diagnostic detail or image evidence attributed to this PDF page. This task does not cover the adjacent bronchiolitis or COPD headings. |
| Hill et al., BTS adult bronchiectasis guideline, 2019, DOI 10.1136/bmjresp-2018-000348 | Official journal page and full-text PDF text inspected via search result; CT imaging protocol / CT-features section | Thin-section CT; typical section thickness ≤1 mm/high-spatial-frequency reconstruction; three core criteria: bronchoarterial ratio >1, lack of tapering, peripheral airway visibility within 1 cm of costal pleura or abutting mediastinal pleura. Associated indirect signs: wall thickening, mucus impaction, mosaic perfusion/air trapping on expiratory CT. | Adult guideline. Protocol values are typical guidance and depend on scanner and patient. Ratio is not taught as standalone proof. |
| Chalmers et al., ERS adult guideline, 2025, DOI 10.1183/13993003.01126-2025 | Official ERS guideline record / accessible abstract and linked shareable document | Used only for current adult clinical-radiologic context and scope note. No treatment recommendations copied. | Management guideline; this lesson is limited to imaging description. |
| O’Donnell et al., “Diagnostic imaging in adult non-CF bronchiectasis”, Breathe 2019;15:190–201 | ERS journal article text inspected | Added measurement caveats: ratio affected by age and disease/vascular context; mild dilatation may be age-related or transient with inflammation/atelectasis; indirect signs remain nonspecific. | Narrative imaging review; not used to assert a patient-level diagnosis. |

No source-page duplicates or unreadable text/images were identified for p.29. The PDF contains no case image suitable for this lesson.

## Learning outline (titles and purpose)

1. **Kernmuster und Quellenumfang** — state the concise CT pattern and distinguish the PDF's topic-only contribution from independently sourced detail.
2. **Welche CT-Zeichen sprechen für Bronchiektasen?** — teach thin-section CT context, compare the three core morphologic signs, and show the companion-vessel/pleural geometry.
3. **Wie ordnen Sie Begleitzeichen ein?** — separate indirect, nonspecific signs from core bronchial morphology and preserve age/technique/reversibility caveats.
4. **Wie formulieren Sie den CT-Befund?** — organize distribution, morphology, core signs, associated findings, and uncertainty into a non-patient-specific wording scaffold.
5. **Welche Kombination stützt die Beschreibung am stärksten?** — one focused retrieval check tests the core triad; this is embedded in the relevant learning path rather than boilerplate chapter naming.
6. **Drei Regeln merken** — three concise take-home rules.

## Visual and translation plan

- `public/educational/bronchiectasis-hero.svg` is an original code-native, non-diagnostic teaching schematic; it shows the measured bronchus and accompanying pulmonary artery, plus airway tapering relative to the pleural surface. It is not a generated scan or diagnostic case. The same asset is used in the shared `LessonHero` and beside the CT criteria to support spatial learning. Source/rights/purpose and DE/EN/FA alt are in the adjacent `.provenance.json`.
- No Radiopaedia case is included. This overview page contains no case and no inspected/verified Radiopaedia image was necessary to teach a written reporting framework. A real-image recognition objective remains outside this bounded lesson.
- Terminology is aligned across DE/EN/FA: bronchoarterial ratio, lack of tapering, peripheral airway visibility, indirect/associated signs, nonspecificity, and uncertainty. Numeric criteria and negations are kept equivalent.

## Changed artifacts and verification record

- Route: `app/thorax/bronchiektasen/page.jsx`, `page.module.css`.
- Lesson and assessments: `data/bronchiectasisLesson.js`; shared MCQ bank and flashcard registry integrations; exact `curriculum.js` topic link.
- Visual: `public/educational/bronchiectasis-hero.svg` and provenance JSON.
- This ledger records the proposed section titles and purpose before implementation; route and assessment details are now implemented.
- Focused route SSR/registry check: `node --import tsx scripts/test-bronchiectasis-thorax-p29-ssr.mjs` — PASS. It compiles the route with the actual `StandardLessonShell`, renders DE/EN/FA with LTR/RTL, checks source-page wording, localized shell navigation/read labels, SVG alt, exact lesson/quiz/flashcard paths, curriculum state and all assessment registrations.
- Assessment audit: `npm run audit:mcq` — PASS (796 questions and 18 cases per language; answers and option-specific explanations validated).
- `git diff --check` — PASS. No production build was run in this subtask.
- Independent review: SRC, EDU, VIS, LNG, ASM, REV accepted for this bounded lesson; UX interaction gate remains BLOCKED because real-browser evidence could not be obtained. Reviewer issues BRC-VIS-01 (wrong measured circle) and BRC-UX-01 (missing shared-shell labels) were repaired; BRC-VIS-02 (normal branch did not taper and distance marker was misaligned) was repaired and independently re-reviewed as fixed. The reviewer inspected the revised SVG rendered to `.tmp-bronchiectasis-hero.png`.
- Browser evidence limitation: localhost:3011 timed out in the browser, local terminal socket access was denied, and starting another dev server reported EADDRINUSE. Thus actual browser interactions, mobile behavior, and visual QA in the application are unverified. The focused SSR test does exercise the real shared shell but does not replace browser interaction evidence.
- Scientific approval by Dr. Zia and publication approval remain pending; AI review does not establish either. This route remains `inProgress`. No commit/push was made.
