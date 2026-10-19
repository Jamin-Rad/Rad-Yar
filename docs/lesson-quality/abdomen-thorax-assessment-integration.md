# Abdomen / Thorax MCQ integration ledger

Date: 2026-10-19  
Scope: connect eligible entries from `data/abdomenThoraxAssessmentDrafts.js` to the production question bank. This records technical registry coverage, not independent clinical approval or complete PDF coverage.

## Registered

The following 13 lesson drafts are represented in `QUESTION_BANK` in DE, EN and FA. Each question has a stable per-language ID, four options, the exact curriculum topic tags listed below, and is retrievable through `getQuestions()` in each language.

| Draft key | Exact curriculum tags | PDF/reference recorded in draft |
|---|---|---|
| `abdomen-ileus-volvulus` | `ileus-duenndarm`, `volvulus` | Abdomen pp. 69–72, 76–78 |
| `abdomen-pancreatic-cysts` | `ipmn` | Abdomen pp. 40–42; Kyoto 2024 |
| `abdomen-focal-liver` | `leberadenom`, `lebermetastasen` | Abdomen pp. 5, 14–27; ACG 2024 |
| `abdomen-renal-masses` | `nierenzysten` | Abdomen pp. 46–51; Bosniak v2019 |
| `abdomen-adrenal-masses` | `nebennieren-inzidentalom`, `nebennierenadenom` | Abdomen pp. 58–64; ESE/ENSAT 2023 |
| `thorax-foreign-body` | `fremdkoerper-atemwege` | Thorax pp. 30–31; ACR 2025 |
| `thorax-pneumonia` | `bakterielle-pneumonie`, `virale-pneumonie-covid`, `atypische-pneumonie`, `pcp`, `aspergillus-lunge` | Thorax pp. 32–35; ATS/IDSA |
| `thorax-tuberculosis` | `tuberkulose` | Thorax pp. 36–37; ATS/CDC/IDSA |
| `thorax-chest-xray` | `roentgen-thorax-systematik` | Thorax pp. 27–28 |
| `abdomen-cystic-liver-lesions` | `leberzyste` | Abdomen pp. 5–7; ACG 2024; WHO 2025 |
| `abdomen-appendizitis` | `appendizitis` | Abdomen pp. 79–80; WSES 2025; ACR RLQ 2022 |
| `abdomen-lower-gi-bleeding` | `untere-gi-blutung` | Abdomen pp. 86–87; ESGE 2021; ACG 2023; ACR |
| `abdomen-kolorektales-karzinom` | `kolorektales-karzinom` | Abdomen pp. 88–89; ACR 2025; SAR 2023 |

## Left disconnected

| Draft key | Reason |
|---|---|
| `abdomen-hepatic-aml` | No hepatic-AML curriculum ID exists. The exact ID `angiomyolipom` is filed under benign renal tumours; using it would cause wrong-topic retrieval. The lesson also explicitly preserves an unresolved PDF/reference discrepancy. |
| `abdomen-psc-mrcp` | The only matching curriculum ID is `psc-pbc`, a combined PSC/PBC topic, while this route and question cover PSC alone. Linking would overstate lesson coverage. |

## Verification and remaining limits

- `npm run audit:mcq` passed after all concurrent NF1 and MSK registrations were repaired: 619 questions and 18 cases per language. An earlier transient three-option NF1 failure was fixed before this recorded run; it is not a current blocker.
- `npx tsx scripts/audit-abdomen-thorax-assessment-retrieval.mjs` passed: 13 registered questions, 20 exact curriculum tags, and DE/EN/FA topic retrieval. The script also verifies that every tag exists as a curriculum ID.
- Registered topic groups use existing curriculum chapter IDs; the retrieval audit asserts that each `fachId`/`kapitelId` pair exists in `data/curriculum.js`.
- `data/abdomenThoraxAssessmentDrafts.js` continues to drive the lesson-shell self-checks; the registry adapter adds a fourth distractor for global quiz compatibility.
- This is a structural and retrieval check. It does not verify semantic translation parity, independently validate clinical claims against the cited sources, complete browser/runtime testing, establish Dr. Zia's scientific approval, or establish full Abdomen/Thorax PDF coverage. Those remain open in the batch ledger.
- Independent reviewer retest confirmed the real curriculum chapter IDs and 13-question/20-tag retrieval; scientific/source validation and semantic translation equivalence remain open.
