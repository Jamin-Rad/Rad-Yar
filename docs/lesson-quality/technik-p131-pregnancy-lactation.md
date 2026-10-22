# Technik.pdf p.131 — pregnancy and lactation contrast media

## Scope and teaching plan

- Source: user-provided `Technik.pdf`, physical PDF p.131 (printed folio 130), heading “Schwangeren und Stillenden”. This is a single-column text page; its rendered page image was visually inspected. Text extraction was unavailable in the environment, so visual inspection is the source transcription evidence.
- Existing route/topic: `/technik/kontrastmittel/schwangerschaft`, `km-schwangerschaft-stillzeit`; existing section IDs retained.
- Learning goal: distinguish maternal contrast decisions in pregnancy from infant exposure through breast milk, and identify where current ACR and ESUR recommendations differ.
- Existing chapter titles and purposes (no new chapter added):
  - `Grundprinzipien in der Schwangerschaft` — decide whether contrast adds necessary information that cannot wait or be obtained otherwise.
  - `Jodhaltige Kontrastmittel in der Schwangerschaft` — explain placental iodine exposure and compare neonatal thyroid follow-up recommendations.
  - `Gadoliniumhaltige Kontrastmittel in der Schwangerschaft` — apply the strict benefit threshold and agent/dose selection if GBCA is required.
  - `Kontrastmittel in der Stillzeit` — distinguish breast-milk exposure and routine continuation from an optional, informed interruption.
  - `Take-Home Messages` — compress the decisions, explicitly retaining the ACR/ESUR difference.
- Visual plan: p.131 contains no diagnostic image or explanatory diagram. Add a code-authored conceptual SVG to the existing header showing placental exposure during pregnancy and the separate limited breast-milk transfer after birth. It is symbolic/non-anatomical, not diagnostic evidence; alt, caption and legend are localized. The existing shared shell is retained.
- Assessments: preserve linked topic and existing breastfeeding and GBCA questions, clarify their answer/feedback, and add one localized MCQ on the ACR-versus-ESUR neonatal-testing distinction. Its explanation is also inherited by the generated flashcard.

## Source coverage

| Point | PDF location | Existing/updated destination | Disposition |
| --- | --- | --- | --- |
| Contrast in pregnancy needs a strict indication; alternatives and deferral considered | p.131 / printed 130 | `grundprinzip` | Retained; aligned in concise teaching path. |
| Iodinated contrast crosses placenta; fetal thyroid iodine uptake is relevant from about 10–12 gestational weeks; theoretical thyroid effect | p.131 / printed 130 | `jod` | Retained. The PDF's general postnatal-check statement is qualified by the current guideline difference below. |
| Neonatal thyroid follow-up after maternal iodine contrast | p.131 / printed 130 | `jod`, take-home, linked MCQ and flashcard | Material guideline difference made explicit: ESUR 2026 recommends a thyroid check in the first week; ACR 2026 considers routine newborn TSH screening sufficient, with no additional check. Follow local practice; do not state a false consensus. |
| GBCA crosses placenta and may recirculate through fetal urine/amniotic fluid | p.131 / printed 130 | `gadolinium` | Retained as source mechanism, with uncertainty stated. |
| Avoid GBCA when possible; if needed, weigh benefit; prefer macrocyclic due to lower dissociation | p.131 / printed 130 | `gadolinium`, linked MCQ and flashcard | Refined against ACR/ESUR: ACR critical indication and potential significant benefit outweighing unknown risk, no suitable alternative and not prudent to wait, lowest diagnostic dose/low-NSF-risk agent; ESUR very strong indication, smallest dose macrocyclic agent. |
| Breastfeeding need not routinely stop; optional 24-hour pause by preference | p.131 / printed 130 | `stillzeit`, linked MCQ and flashcard | Refined: ACR permits optional 12–24 h pause if concerned, expressing/discarding milk; ESUR supports normal continuation after iodine and macrocyclic GBCA. Applies to lactation, distinct from in-utero exposure. |
| Transfer and infant oral absorption figures | p.131 / printed 130 | `stillzeit` table and header statistic | Reconciled against ACR 2026 chapter 20: iodine transfer into milk is <1% of maternal dose in the first 24 h; about 0.5% is reported in one iohexol study; GBCA transfer is <0.04% in 24 h. The table states these are milk-transfer figures, distinct from the lower infant systemic dose after limited GI absorption. |

## Current primary guidance checked (2026-10-22)

- ACR. *Manual on Contrast Media* (2026), chapter 19, pp.94–96; chapter 20, 2024 evidence-based breastfeeding update, pp.98–100. [Official manual landing page](https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual); [official manual PDF](https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/Clinical/Contrast-Manual/ACR-Manual-on-Contrast-Media.pdf). Maternal IV iodine: routine newborn TSH screening is sufficient, no additional follow-up considered necessary. Pregnancy GBCA: critical indication and significant benefit that outweighs unknown fetal risk; requested information not otherwise obtainable, affects care during pregnancy, and should not prudently wait; use lowest diagnostic dose of a low-NSF-risk agent. Breastfeeding: no routine interruption; if concerned, optional 12–24-hour interruption with expressed milk discarded; little value beyond 24 hours.
- ESUR Contrast Media Safety Committee. *Guidelines 2026*, “Safe use of contrast agents in pregnancy and lactation”, PDF p.26. [Official guidelines page](https://www.esur.org/esur-guidelines-2026/); [official 2026 PDF](https://www.esur.org/wp-content/uploads/2026/10/Guidelines-2026.pdf). Maternal iodine: neonatal thyroid test in first week. Pregnancy GBCA: very strong indication; smallest possible macrocyclic dose. Breastfeeding: continue normally after iodine and after macrocyclic GBCA.
- Evidence limit: These are guideline recommendations for teaching comparison, not an individualized management order. Local neonatal screening pathways and the specific agent/product information remain relevant. ACR's no-additional-test statement relies on standard newborn TSH screening; do not extend that statement to unscreened newborns or to direct infant IV contrast exposure.

## Translation and assessment checks

- DE/EN/FA section content, differences, time window, negation, optional pause, express/discard instruction and answer feedback are represented in parallel.
- Existing exact chapter IDs/route and `km-schwangerschaft-stillzeit` link preserved; three linked MCQs and corresponding generated cards checked.
- Media ledger: `public/educational/pregnancy-contrast-pathways.svg` is an original code-authored conceptual diagram by RadYar, with no patient image or external-media license. It contrasts fetal exposure in utero with breast-milk transfer after birth; it is explicitly not anatomical or diagnostic. The `ContrastGroupPage.jsx` hero provides translated alt, caption and legend in DE/EN/FA.

## Validation and review status

- `npm run test:technik-pregnancy-p131`: PASS after the SVG header and milk-transfer corrections. It checks exact existing chapter IDs; localized ACR/ESUR distinction; three MCQs per language; four options and valid correct choice; explanatory feedback; question/card front-answer-explanation parity; and topic-specific hero/asset references in DE/EN/FA.
- `npm run audit:mcq`: PASS for the full bank (725 questions and 18 cases per language).
- `npm run test:technik-roentgen-sync`: PASS for neighboring contrast-topic IDs, translation checks, cards and visuals.
- `git diff --check`: PASS; Git reported only a line-ending normalization warning for the edited curriculum matrix.
- `npm run build`: BLOCKED. Google Fonts requests failed with `getaddrinfo ENOTFOUND fonts.googleapis.com`; the build then failed creating `.next/server/app/mobin/pruefungsvorbereitung` with `EPERM`. No production build pass is claimed.
- Browser evidence: BLOCKED; CUA inventory returned no apps or browsers, so no actual route render, responsive, theme, RTL, or interaction behavior could be checked.
- Independent review: first review returned P131-SRC-01 (milk-transfer window/meaning), P131-VIS-01 (missing topic-specific hero), and P131-DOC-01 (stale review status). SRC and VIS fixes are applied and independently re-reviewed PASS in the exact active worktree. `npm run test:technik-pregnancy-p131`, `npm run audit:mcq`, and `git diff --check` passed in the delta cycle. P131-DOC-01 is closed by updating this ledger and the curriculum matrix. REV PASS for this bounded delta; UX remains BLOCKED pending real-browser evidence. Clinical signoff and publication remain pending.
- Clinical approval by Dr. Zia: pending. Publication: not requested.
