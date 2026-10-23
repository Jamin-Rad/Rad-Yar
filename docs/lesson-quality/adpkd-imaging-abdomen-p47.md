# ADPKD imaging lesson — Abdomen.pdf p.47

## Source coverage ledger

| Source | Page | What is present | Coverage in this lesson |
| --- | --- | --- | --- |
| `Abdomen.pdf` | PDF p.47 / printed p.46 | Heading “Polyzystische Nierenerkrankungen” and one corrupted glyph; the rest of the page is blank. No criteria, explanatory text, table, or diagnostic image. | The heading is used only as a topic cue. It does not support detailed diagnostic claims. |
| KDIGO 2025 ADPKD guideline, Chapter 1 | Official guideline, Recommendation 1.3.1 and adult diagnostic imaging section | Guidance for imaging in adults at risk and selected uncertain presentations. | Supplemental source for the imaging statements below. See source link in the lesson. |

PDF page image was visually inspected after text extraction. There are no unreadable educational elements beyond the isolated corrupted glyph. Coverage must not be described as a faithful expansion of PDF teaching content: the PDF provides the topic name only.

## Scope and learner outline

This is a bounded supplemental lesson on imaging in **adult autosomal dominant polycystic kidney disease (ADPKD)**. It does not cover the full differential of polycystic kidney diseases, pediatric disease, treatment, prognosis, or individualized imaging orders.

1. **Welche Frage klärt die Bildgebung?** Distinguish a phenotype description from an etiologic diagnosis; state that this is an adult ADPKD supplement.
2. **Welche Verteilung ist bei adulter ADPKD typisch?** Explain the bilateral cyst distribution conceptually and note that the schematic does not teach reading real ultrasound, CT, or MRI findings.
3. **Wann helfen weitere Untersuchungen?** Explain the KDIGO 2025 imaging framework: ultrasound first for at-risk adults; MRI/CT or genetics may help clarify selected uncertain or atypical cases.
4. **Drei Regeln für den Befund.** Report laterality/distribution and kidney size, include family-risk context when known, and state uncertainty without inferring genotype from imaging.

## Visual and rights record

| Visual | Teaching purpose | Source / rights | Caption and alt |
| --- | --- | --- | --- |
| Original vector schematic of two kidneys with multiple cyst marks and one possible extra-renal cyst | Convey bilateral distribution; prevent readers from mistaking the explanatory schematic for a clinical case | Authored in-repository (`public/educational/adpkd/hero.svg` and inline SVG); no patient data or external image | Localized DE/EN/FA caption and alt text are embedded in the lesson data and SVG accessible title/description. The lesson states that it is conceptual, not diagnostic evidence. |

Real-case image-recognition coverage is pending: no inspectable patient image is embedded, and the lesson learning objective and assessment are deliberately limited to explaining a described distribution rather than recognizing modality-specific signs.

No patient case or Radiopaedia image is used. The source PDF page contains no figure to reproduce.

## Assessments and translation parity

- The lesson embeds one short first-imaging self-check; two additional questions are registered in the shared MCQ bank; three localized retrieval flashcards are registered under the exact topic ID `adpkd-bildgebung`.
- DE, EN, and FA retain the same scope (adult ADPKD only), uncertainty, and source attribution. The MCQs use a shared answer key and distinct distractor feedback. The flashcards do not expand the scope to other polycystic disorders.
- Registry links use `/abdomen/niere/adpkd`, `/ueben/quiz?...themen=adpkd-bildgebung`, and `/flashcards/adpkd-bildgebung`.

## Verification record

- `node --import tsx scripts/check-adpkd-imaging.mjs`: passed; validates topic/curriculum route, `inProgress`, question and flashcard registries, locale fields, and visual file.
- `node --import tsx scripts/test-adpkd-imaging-render.mjs`: passed semantic server rendering for DE/EN/FA, including the shared lesson shell, four sections, visible supplement scope, diagram accessibility label/caption, self-check, and localized quiz/card links.
- `npm run audit:mcq`: passed (795 questions / 18 cases per language; answer and option-feedback integrity).
- `npm run audit:fa`: completed with repository-wide existing untranslated/Latin-script findings; the lesson’s Persian passages were also checked directly in the localized SSR test.
- `git diff --check` over owned files: passed.
- `npm run build`: blocked before producing a build by `EPERM` creating `.next/server/app/fatima/login`; Next.js also emitted existing duplicate-page and workspace-root warnings. The failure was not reported as an ADPKD source error.
- Browser visual/interactions: not tested. The in-app browser tool rejected opening a tab from this subagent thread (“IAB visibility is not supported in a subagent thread”).
- Independent `radyar_lesson_reviewer` review: first cycle found a major visual-scope mismatch; the narrowed conceptual-only learning goal and explicit real-case coverage gap were independently re-reviewed and accepted. Gate status after repair: SRC/EDU/VIS/ASM/REV passed within declared scope; LNG and UX blocked on actual browser/RTL evidence.
- Scientific approval remains pending; the AI review cannot supply clinical approval.

## Open limitations

- The PDF source contributes only a topic cue; no detailed source coverage can be claimed for imaging criteria.
- This lesson intentionally omits numeric diagnostic thresholds and individualized test selection.
- No clinical case image is available on the source page; the conceptual schematic must not be used as a diagnostic exemplar. Real-case imaging recognition remains uncovered.
- Scientific approval and publication approval remain pending.
