# Brain metastases · Gehirn.pdf p.47 · authoring and QA ledger

Status: partial lesson and shared assessment integration independently retested. `inProgress` retained. No clinical approval, browser check, or publication sign-off.

## Scope and integration boundary

- Proposed route: `/gehirn/tumoren/hirnmetastasen`.
- Nearby existing curriculum ID: `metastasen-meningeosis`, titled “Metastases / Leptomeningeal Carcinomatosis.” This lesson teaches **parenchymal brain metastasis only** and explicitly says that leptomeningeal disease is uncovered. The route and one shared assessment topic are linked to this existing ID with `inProgress` partial coverage; no new ID was invented. The single shared question and three retrieval cards cover parenchymal descriptor interpretation only. Leptomeningeal MCQs and lesson coverage remain outstanding.
- No exact route existed in `app/gehirn` for a dedicated parenchymal metastasis lesson. Generic mentions in other tumour differentials do not equal dedicated coverage.
- Audience: radiology learners who know basic MRI terminology. Learning task: interpret written parenchymal-metastasis report descriptors and explain their limits. Independent recognition of findings in MRI images is neither taught nor assessed.
- Learner-facing scope note now says only that the PDF page is sparse, this lesson covers parenchymal metastases only, and leptomeningeal disease is not covered. Internal topic ID/status details stay in this ledger.
- Route has an embedded self-check, one matching shared four-option MCQ, and three shared retrieval cards. Curriculum remains explicitly `inProgress`; the combined ID is only partially covered.

## Source and claim disposition

| Claim / source item | PDF location | Disposition | External verification / limit |
|---|---|---|---|
| Heading “Metastasen”; parenthetical “Häufigkeitsverteilung, KM-Verhalten” | Gehirn.pdf, PDF p.47; printed p.46 | Used as a topic cue only | The page contains no case image, frequency numbers, primary-cancer breakdown, sequence details, or criteria. No percentages or primary-specific distribution are invented. |
| Typical parenchymal lesions can be well demarcated, solid or ring-enhancing, often near grey–white junction / vascular border zones, with surrounding oedema | PDF p.47 names enhancement behaviour, but supplies no detail | Supplemental teaching, clearly disclosed in the source note | EANO–ESMO 2021 guideline and SNO consensus review 2022. This is a pattern, not a diagnosis. |
| A solitary lesion remains possible; enhancement does not identify histology or primary tumour | Not specified on PDF p.47 | Added caveat to prevent over-reading pattern | SNO consensus review 2022; no promise of specificity. |
| Review post-contrast T1, T2/FLAIR and DWI | Not specified on PDF p.47 | Minimal pattern-assessment workflow | EANO–ESMO 2021 recommended minimum MRI work-up. No staging or treatment workflow taught. |
| Frequency distribution / primary-tumour-specific probabilities | Suggested only by the PDF parenthetical | Deferred | PDF provides no data, denominator, source, or date. No unsupported prevalence numbers included. |
| Leptomeningeal metastases | Adjacent curriculum topic only | Excluded | Separate disease pattern and dedicated imaging scope; curriculum mapping intentionally deferred. |

## Learning sequence and media plan

1. State the report-reading task and its limits before detail.
2. Use a code-native concept diagram to illustrate only the report terms “one or more lesions” and “possible surrounding oedema”; no anatomy-specific boundaries or image-recognition task are claimed.
3. Give a short report-context checklist and a warning about diagnostic overlap.
4. Test one decision from a written report description with a four-option embedded check and answer-specific feedback.
5. End with three concise reporting rules.

Visuals are a code-native hero and inline SVG, both explicitly conceptual, not diagnostic MRI, not anatomically to scale, and not frequency maps. They use no patient pixels. Captions and accessible labels in DE/EN/FA identify the diagram as a representation of report terms only. The PDF page has no image to reuse. Case access is not evidence: no Radiopaedia case image or case metadata is used.

## Translation and assessment notes

- Shared copy uses `(de, en, fa)` order. Core units (reported lesion count/location; enhancement; oedema; uncertainty; solitary lesion; primary tumour; MRI sequence names; self-check and feedback) are present in all locales. The revised lesson makes no independent MRI-recognition or anatomical-boundary teaching claim.
- “Enhancement” is retained as a familiar radiology term in Persian; “oedema” is translated as ادم وازوژنیک.
- Embedded and shared questions check report-pattern reasoning and limits. Three shared cards reinforce terminology without inferring a primary tumour. None diagnoses a patient.

## Independent review repair notes

- BM-VIS-01: narrowed the lesson title, objective, chapter labels, text and question to interpretation of written report descriptors. The diagram now illustrates only descriptors and no longer labels spatial imaging locations. Real diagnostic MRI is still unavailable and is not presented as evidence.
- BM-EDU-01: removed curriculum identifier and integration status from the learner-facing scope note; retained the concise statement that parenchymal disease only is covered and leptomeningeal disease is not.
- Both scope repairs passed independent delta retest by `/root/workflow_trial`. The later registry/question/card integration and localized navigation also passed a separate independent retest; BM-ASM-02 (missing flashcard topic href) was repaired and closed.

## Validation remaining

- Focused semantic/integration checker, JSX syntax transform, DE/EN/FA actual-route SSR, shared MCQ audit (638 questions plus 18 cases per locale), runtime flashcard-link resolution, and diff whitespace checks pass after integration.
- Independent bounded source/education/language/visual and registry/question/card integration retests passed; scientific specialist review and rendered UX remain pending.
- Browser rendering including Persian RTL and responsive layout is blocked in this environment; no browser acceptance is claimed.
- Integration links the existing `metastasen-meningeosis` item to this route and partial shared MCQ/card topic. Independent `/root/workflow_trial` retest confirmed exact route and `inProgress` status, MCQ link/topic/group and correct answer feedback across locales, three resolvable cards, and lesson backlinks. The item stays `inProgress` because leptomeningeal disease remains uncovered.
- This ledger and passing static checks do not constitute clinical sign-off or release approval.
