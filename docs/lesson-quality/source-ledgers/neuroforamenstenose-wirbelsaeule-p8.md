# Neuroforaminal stenosis — Wirbelsäule.pdf p.8 (printed p.7)

## Scope and source ledger

The lesson at `/wirbelsaeule/neuroforamenstenose` supplements the exact curriculum topic `neuroforamenstenose` and remains `inProgress`. The supplied PDF is a topic cue only. The pre-existing `/wirbelsaeule/degenerative#stenosis` lesson teaches spinal-canal stenosis and mentions the foramen as a location in a broader section, but it does not teach a foraminal grading system.

| Source | Evidence inspected | Use in the lesson | Limitations |
| --- | --- | --- | --- |
| Wirbelsäule.pdf, physical PDF p.8, printed p.7 | Extracted page text and rendered source image `tmp/spine-stenosis-p8-08.png` | The slide teaches spinal-canal stenosis, then shows only the heading “Neuroforamenstenose” and placeholder “Sad”. It has no explanatory criteria or diagnostic foraminal image. This page cues the topic only. | No diagnostic or grading claim is attributed to this page. Its canal-stenosis criteria are outside this lesson. |
| Lee S, et al. “A Practical MRI Grading System for Lumbar Foraminal Stenosis.” AJR Am J Roentgenol. 2010;194(4):1095–1098. PMID 20308517; DOI 10.2214/AJR.09.2772 | Checked 2026-10-23; original article abstract, methods, grade definitions and T1/T2 evaluation text | Primary basis for the four-grade lumbar MRI system: grade 0 absent; grade 1 fat obliteration in one opposing axis without root-shape change; grade 2 fat obliteration in both axes without root-shape change; grade 3 root collapse or morphological change. Sagittal T1 is primary; T2 is supplementary for uncertain findings. | The system is a qualitative imaging grading, not an individual symptom diagnosis. It was developed on MRI and lumbar levels L3–S1. |
| Lee JH, et al. “Magnetic Resonance Imaging Grading Systems for Central Canal and Neural Foraminal Stenoses of the Lumbar and Cervical Spines With a Focus on the Lee Grading System.” Korean J Radiol. 2023;24(3):224–234. PMID 36788771; PMCID PMC9971835; DOI 10.3348/kjr.2022.0351 | Checked 2026-10-23; review abstract, lumbar Lee grade table and discussion of cervical/lumbar grading systems | Clarifies the direction-counting and root-morphology distinctions and that multiple grading systems exist. | Review, not a universal consensus standard. The lesson uses lumbar Lee criteria only. |
| Ndjonko LCM, et al. “An Evaluation of Lumbar Foraminal Stenosis Radiologic Grading Systems: A Systematic Review.” Spine Surg Relat Res. 2025;10(1):43–54. PMID 41695907; PMCID PMC12902212; DOI 10.22603/ssrr.2025-0056 | Checked 2026-10-23; PubMed record, abstract and review synthesis. Literature search ran through July 2024. | Adds the scope caveat that Lee is commonly used, but symptom correlation across studies is inconsistent and grading systems vary. | Systematic review, level IV evidence; no treatment recommendations are taught. |

No Radiopaedia case is required for this bounded grading lesson. The original schematic is conceptual, not diagnostic. Real MRI recognition from patient images remains outside this task.

## Learning outline

1. **Was beurteilen Sie im Neuroforamen?** — orient to exiting root and perineural fat, distinguish the foramen from central canal stenosis.
2. **Wie unterscheiden sich die vier Lee-Grade?** — compare grades by fat obliteration directions and root morphology.
3. **Wie beschreiben Sie den Befund präzise?** — report side, level, cause, fat, root effect, and named grading system without equating morphology with symptoms.
4. **Welche Beschreibung entspricht Lee-Grad 2?** — one focused retrieval check distinguishes grades 1, 2, and 3.
5. **Drei Regeln merken** — compress the reporting sequence.

## Visual and terminology plan

- Original SVG compares the four lumbar Lee grades in a conceptual foraminal cross-section; it is a teaching aid and not an MRI or patient case. Translated alt text and figure caption explicitly state that boundary.
- Terminology parity: perineural fat / perineurales Fett / چربی پیرامون ریشه; exiting nerve root / austretende Nervenwurzel / ریشهٔ عصبی خارج‌شونده; opposing directions / gegenüberliegende Richtungen / جهت‌های مقابل; root morphology / Wurzelmorphologie / شکل ریشه.
- No diagnostic images occur on the source page, so no diagnostic case is fabricated or silently substituted.

## Changed artifacts and verification

- Route/page: `app/wirbelsaeule/neuroforamenstenose/page.jsx`, `page.module.css`.
- Lesson and assessment source: `data/neuroforamenstenoseLesson.js`, exact curriculum route, one localized MCQ, three localized flashcards.
- Visual: `public/educational/neural-foraminal-stenosis.svg` and adjacent provenance JSON.
- Focused SSR/registry check: `node --import tsx scripts/test-neuroforamenstenose-ws-p8-ssr.mjs` — PASS for the actual shared shell in DE/EN/FA and LTR/RTL, source scope, localized hero alt, exact route/assessment/card links, curriculum state and registrations.
- MCQ bank audit: `npm run audit:mcq` — PASS (797 questions and 18 cases per language; option-specific explanations validated).
- `git diff --check` — PASS. Whole production build not run in this bounded authoring pass.
- Independent bounded review: SRC/EDU/VIS/LNG/ASM passed after the citation traceability repair; UX remains blocked pending live browser evidence. See [independent review](../neuroforamenstenose-independent-review.md). Scientific approval and publication remain pending.
- Live browser review, specialist clinical approval, and publication approval: pending; editorial/technical checks do not substitute for these gates.
