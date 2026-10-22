# Abdomen / Thorax MCQ integration ledger

Date: 2026-10-19  
Scope: connect eligible entries from `data/abdomenThoraxAssessmentDrafts.js` to the production question bank. This records technical registry coverage, not independent clinical approval or complete PDF coverage.

## Registered

The following lesson drafts are represented in `QUESTION_BANK` in DE, EN and FA. Each question has a stable per-language ID, four options, the exact curriculum topic tags listed below, and is retrievable through `getQuestions()` in each language. The hepatic AML row was added after the initial ledger version.

| Draft key | Exact curriculum tags | PDF/reference recorded in draft |
|---|---|---|
| `abdomen-ileus-volvulus` (existing closed-loop question) | `ileus-duenndarm` | Abdomen pp. 69–72 |
| `volvulus-de/en/fa-1` (new focused question) | `volvulus` | Abdomen physical pp. 76–78 / printed pp. 75–77 |
| `abdomen-pancreatic-cysts` | `ipmn` | Abdomen pp. 40–42; Kyoto 2024 |
| `abdomen-focal-liver` | `leberadenom`, `lebermetastasen` | Abdomen pp. 5, 14–27; ACG 2024 |
| `abdomen-renal-masses` | `angiomyolipom` | Abdomen pp. 48–51; EAU RCC Diagnostic Evaluation |
| `abdomen-renal-cyst-bosniak-nodule` | `nierenzysten` | Abdomen.pdf p.46 (unversioned table); Silverman et al., Bosniak v2019 |
| `abdomen-adrenal-masses` | `nebennieren-inzidentalom`, `nebennierenadenom` | Abdomen pp. 58–64; ESE/ENSAT 2023 |
| `thorax-foreign-body` | `fremdkoerper-atemwege` | Thorax pp. 30–31; ACR 2025 |
| `thorax-pneumonia` | `bakterielle-pneumonie`, `virale-pneumonie-covid`, `atypische-pneumonie`, `pcp`, `aspergillus-lunge` | Thorax pp. 32–35; ATS/IDSA |
| `thorax-tuberculosis` | `tuberkulose` | Thorax pp. 36–37; ATS/CDC/IDSA |
| `thorax-chest-xray` | `roentgen-thorax-systematik` | Thorax pp. 27–28 |
| `abdomen-cystic-liver-lesions` | `leberzyste` | Abdomen pp. 5–7; ACG 2024; WHO 2025 |
| `hepatisches-angiomyolipom` | `hepatisches-angiomyolipom` | Abdomen physical pp. 12–13; Wang 2009; Ding 2017; gadoxetic MRI cohort |
| `abdomen-appendizitis` | `appendizitis` | Abdomen pp. 79–80; WSES 2025; ACR RLQ 2022 |
| `abdomen-lower-gi-bleeding` | `untere-gi-blutung` | Abdomen pp. 86–87; ESGE 2021; ACG 2023; ACR |
| `abdomen-kolorektales-karzinom` | `kolorektales-karzinom` | Abdomen pp. 88–89; ACR 2025; SAR 2023 |
| `abdomen-mesenteric-ischaemia-cta-protocol` | `mesenteriale-ischaemie` | ESVS 2025 Clinical Practice Guidelines, Recommendation 33; DOI `10.1016/j.ejvs.2025.06.010` |
| `thorax-lung-abscess-empyema` | `lungenabszess` | Thorax.pdf p.26; Williford & Godwin, 1983, PMID 6635173 |

## Left disconnected

| Draft key | Reason |
|---|---|
| `abdomen-psc-mrcp` | The only matching curriculum ID is `psc-pbc`, a combined PSC/PBC topic, while this route and question cover PSC alone. Linking would overstate lesson coverage. |

## Verification and remaining limits

- `npm run audit:mcq` passed after this addendum: 675 questions and 18 cases per language.
- The latest `npx tsx scripts/audit-abdomen-thorax-assessment-retrieval.mjs` did not pass: at `de/lebermetastasen`, actual retrieval contains `abdomen-focal-liver-de-01` and `abdomen-liver-metastases-de-01`, while the script expects only the latter. This overlap is outside the volvulus addendum and needs a separate taxonomy/audit decision; the full batch retrieval audit must remain reported as failing until resolved.
- Registered topic groups use existing curriculum chapter IDs; the retrieval audit asserts that each `fachId`/`kapitelId` pair exists in `data/curriculum.js`.
- `data/abdomenThoraxAssessmentDrafts.js` continues to drive lesson-shell self-checks; the registry adapter adds a fourth distractor for global quiz compatibility. The focused volvulus quiz item is registered separately in `data/questions.js` and uses only the `volvulus` topic tag.
- Tag correction for this addendum: the existing closed-loop/gallstone ileus items stay under `ileus-duenndarm`; the new sigmoid-volvulus recognition item is tagged only `volvulus`, matching its exact curriculum ID. The linked query `fach=abdomen&n=1&themen=volvulus` retrieves that item.
- This is a structural and retrieval check. It does not verify semantic translation parity, independently validate clinical claims against the cited sources, complete browser/runtime testing, establish Dr. Zia's scientific approval, or establish full Abdomen/Thorax PDF coverage. Those remain open in the batch ledger.
- Focused volvulus verification passes: one question retrieves in each language under the exact `volvulus` tag, with three cards under the same topic. The existing closed-loop/gallstone ileus items remain under `ileus-duenndarm`.
- Focused hepatic AML verification (`node --import tsx scripts/test-hepatic-angiomyolipoma-integration.mjs`) passed on 2026-10-22: four exact-topic four-option MCQs and four cards retrieve in each language; the shell self-check and hepatic curriculum ID stay separate from renal AML. This is structural evidence, not a scientific approval.
- Focused mesenteric-ischaemia delta (`node --import tsx scripts/test-mesenteric-ischaemia-assessment.mjs`) verifies one exact-topic MCQ and one flashcard in DE/EN/FA, direct return to `#cta-protocol`, and curriculum links. It assesses the separately sourced CTA protocol, not the existing inline NOMI check. Independent delta review passed SRC/EDU/LNG/ASM/REV; VIS is N/A because no visual changed. Browser UX remains open. The broader abdomen/thorax retrieval audit still fails at the pre-existing `leberadenom` overlap listed above.
- Focused renal-cyst delta (`node --import tsx scripts/test-renal-cyst-assessment.mjs`) verifies one exact-topic Bosniak v2019 category-IV MCQ and one category-II flashcard in DE/EN/FA, lesson actions returning to `#classes`, and corrected `abdomen-renal-masses` tag mapping (`angiomyolipom`). Independent review passed SRC/EDU/LNG/ASM/REV; VIS is N/A, UX is blocked pending browser evidence. No unversioned PDF risk percentages or management guidance were added.
