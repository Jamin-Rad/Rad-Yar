# LI-RADS CT/MRI — lesson source and QA ledger

## Scope and instructional plan

- Source PDF: `Abdomen.pdf`, PDF pp. 20–23 (printed pp. 19–22). Curriculum ID: `li-rads`. Route: `/abdomen/leber/li-rads`.
- Audience/outcome: radiology learners should verify that the adult at-risk population and multiphase diagnostic examination fit CT/MRI LI-RADS, then apply the diagnostic category logic without confusing HCC-specific and non-HCC-specific malignancy.
- Teaching sequence: (1) verify population and technique; (2) identify LR-NC, LR-TIV, LR-M, LR-1/2 before applying the HCC feature table; (3) assess the five major features; (4) apply compact LR-5 rules; (5) treat ancillary features as supporting only and report category with context.
- Visual plan: responsive, code-native, four-step flow diagram. It communicates the decision order and is not a substitute for the ACR diagnostic table. No PDF diagram crop is reused because the page-21 algorithm has handwritten/colored marks around branches that are ambiguous in the supplied copy.
- Language baseline: German; EN and FA semantic units aligned for population, phase/size thresholds, categorical certainty, exclusion and answer rationale. Browser/RTL inspection remains pending.

## Source coverage ledger

| ID | Source/page | Source point | Lesson location | Status / decision |
|---|---|---|---|---|
| LR-01 | Abdomen.pdf p.20 (printed 19) | LI-RADS is for HCC-risk patients; the page names adult HCC risk group, high-risk context and exclusions | Eligibility | Included, but exact population and exceptions were cross-checked against ACR Core rather than relying on compressed PDF wording |
| LR-02 | Abdomen.pdf p.20 | Categories 1–5 and five major criteria: APHE, wash-out, capsule, size, threshold growth | Category list + feature list | Included; definitions/version checked against ACR CT/MRI v2018 Core |
| LR-03 | Abdomen.pdf p.21 (printed 20) | Diagnostic algorithm/table; size strata and combinations of APHE/additional major features | LR-5 rules | Table itself not copied; the image contains colored/hand marks that make selected branches ambiguous. Rule re-derived from official ACR Core, including v2018 exceptions |
| LR-04 | Abdomen.pdf pp.20–21 | Ancillary features and application limits | Caveat | PDF summary is abbreviated; ACR Core explicitly checked: ancillary features cannot upgrade to LR-5 and conflicting benign/malignant ancillary features do not adjust category |
| LR-05 | Abdomen.pdf p.22 (printed 21) | Management suggestions by LR-3/4/5, plus fibrolamellar HCC and treatment | Not taught | Excluded: management and treatment are context/version-sensitive; current treatment guidance requires a separate source and lesson scope |
| LR-06 | Abdomen.pdf p.23 (printed 22) | Interventional therapies including MWA, TACE and SIRT | Not taught | Excluded: therapy comparison and selection require current oncology guidance and multidisciplinary context |
| LR-07 | Abdomen.pdf pp.20–23 | PDF's age, risk and exclusion statements, including vascular cirrhosis | Eligibility | Cross-checked: ACR v2018 Core page 6 supplies exact target population and exclusions; no extrapolation beyond it |

## Primary-source verification

1. American College of Radiology. **LI-RADS CT/MRI v2018 Core** (official diagnostic release; ACR's current LI-RADS page continues to list CT/MRI v2018 Core for diagnosis while v2024 cores concern treatment-response assessment). Official core PDF: https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/LI-RADS/LI-RADS-CT-MRI-2018-Core.pdf . Relevant portions: Getting Started/population p.6; category and diagnostic algorithm pp.7–10; ancillary features p.9; major features p.20; LR-M p.22; threshold growth definition and LR-5 table p.4.
2. ACR LI-RADS current releases page: https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/LI-RADS (accessed 2026-10-19). It lists CT/MRI v2018 as the diagnostic core and CT/MR v2024 cores for nonradiation/radiation treatment response.
3. AASLD Practice Guidance on prevention, diagnosis, and treatment of hepatocellular carcinoma (2023): https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/ . Search-indexed guidance states that in at-risk patients, APHE and washout on multiphase CT/MRI are HCC hallmarks for observations ≥1 cm; the page itself could not be read in this session due a PMC browser challenge. Accordingly, the exact table criteria were taken from the official ACR Core, not from that inaccessible page.

### Criteria used in the lesson (ACR v2018)

- Eligibility: adult with cirrhosis, chronic HBV, or current/prior HCC. Do not apply to patients without these factors, age <18, congenital hepatic fibrosis, or cirrhosis caused by vascular disorders listed in ACR Core. Multiphase CT or MRI with eligible contrast protocol is required.
- Five major features: nonrim APHE, nonperipheral washout, enhancing capsule, size, and threshold growth. Threshold growth = ≥50% size increase in ≤6 months.
- LR-5: nonrim APHE is required. For 10–19 mm, APHE plus nonperipheral washout or threshold growth can qualify; capsule alone is LR-4 in this cell. At ≥20 mm, APHE plus ≥1 additional major feature qualifies. <10 mm observations do not qualify for LR-5 by the diagnostic table.
- Ancillary features do not upgrade to LR-5. If uncertain about a major feature, ACR instructs treating it as absent. LR-M/TIV are handled before the HCC diagnostic table.
- Current recommendations for management, biopsy and treatment are intentionally not reproduced from the PDF.

## QA state

- SRC: PASS for the scoped diagnostic lesson — pages 20–23 visually reviewed; criteria reconciled to the official ACR v2018 Core. Independent review caught and corrected the path-proven benign hepatocellular exception: such lesions receive a LI-RADS category in addition to pathology. Management/treatment claims are explicitly scoped out. AASLD cross-reference was indexed but not directly inspectable in this session.
- EDU: bounded independent review found no demonstrated defect in the decision flow, LR-5 cases, or embedded self-check; broader instructional review pending.
- VIS: self-review only — code-native flow is specific to the diagnostic decision and labelled as schematic; browser rendering and actual responsive state are not yet checked.
- LNG: independent static check confirmed the corrected eligibility exception is semantically represented in DE/EN/FA; complete language review and native browser/RTL QA pending.
- ASM: one embedded self-check with explanatory feedback; no global question/flashcard registry entry added.
- UX: BLOCKED — no fresh browser evidence.
- REV: PASS for bounded source/translation review, including retest of LR-ACR-01. Browser and clinical approval remain open.
- Build: not run in the shared worktree to avoid `.next` contention; local dependencies are absent, so ESLint could not be run here.
- No scientific approval, full PDF coverage or release readiness is claimed.

## Attribution

The supplied PDF pages and images were visually inspected. No marked PDF chart is reproduced. The flow diagram is original code-native teaching art and does not depict a patient or replace the official ACR table.
