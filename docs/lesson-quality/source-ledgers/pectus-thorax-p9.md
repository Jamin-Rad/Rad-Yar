# Pectus excavatum — bounded author ledger

Scope: Thorax.pdf PDF p9 lower panel (printed p8), chest-radiograph recognition and middle-lobe mimic. Audience: radiology learners; prerequisite: PA/lateral orientation. Outcome: recognise chest-wall origin of apparent right paracardiac opacity using the lateral sternum.

Plan before implementation: (1) frontal pattern plus actual paired radiographs, (2) lateral localisation and a short decision check, (3) three retrieval rules. No separate default report/self-test chapter. Learning targets: describe sternal depression; recognise the right-border mimic; correlate two views without excluding coexisting lung disease.

| Point | Source | Coverage |
|---|---|---|
| Depressed sternum / reduced AP dimension | PDF p9; Robbins case report | Intro and lateral reading |
| Indistinct right heart border may mimic middle-lobe disease | PDF p9; Robbins discussion | Frontal reading and check |
| Lateral view resolves projection mechanism | PDF p9 paired images; Robbins | Chapter2, MCQ1 |
| Do not diagnose/exclude pneumonia from a single silhouette | Bounded interpretive caveat | Chapter2, MCQ2 |
| Steep anterior ribs | PDF p9; Robbins discussion | Frontal observations |
| Apparent widened cardiac silhouette from altered position/rotation | PDF p9; Eurorad case1678 | Frontal observations, conditional wording, no cardiothoracic-ratio claim |
| Lingular-pneumonia mimic | PDF p9 only | Preserved as PDF-reported caveat, explicitly not the demonstrated finding in the selected pair |

Primary verification accessed 2026-10-24: Robbins LP. Pectus excavatum. Radiol Case Rep 6(1):460, originally published 2011, PMC upload 2015. https://pmc.ncbi.nlm.nih.gov/articles/PMC4901030/ DOI10.2484/rcr.v6i1.460. Used only for observed radiographic mechanism, no prevalence, severity indices, surgery threshold or management protocol.

Media: PDF-extracted p009-Image201.jpg (474×515 frontal) and Image202.jpg (302×506 lateral), personally inspected: right cardiac border indistinct in frontal; posterior lower sternum and reduced retrosternal space visible in lateral. PDF source identifies Radiopaedia rID33208. Contributor verification pending mapper; direct web retrieval returned cache miss. User explicit project permission covers PDF media. Preserve originals unmodified. Captions distinguish observations from diagnosis and identify extraction page/case. Generated hero is nondiagnostic conceptual artwork, no measurement or scan claim; viewed after generation.

Glossary: Trichterbrust / pectus excavatum / سینهٔ قیفی; Sternum / sternum / جناغ; rechter Herzrand / right cardiac border / حاشیهٔ راست قلب; Mittellappen / middle lobe / لوب میانی; seitlich / lateral / نیمرخ.

Supplementary primary teaching case: https://www.eurorad.org/case/1678 (2002), search-index text verifies lateral correlation and absence of true cardiomegaly in that case. Full-page fetch returned403; no unseen images from this source are used. No broader severity or treatment assertions drawn from it. Mapper confirmed no contributor attribution appears on PDFp9, so no name invented.

Implementation: data/thoraxPectusLesson.js; app/thorax/pectus-excavatum/page.jsx and page.module.css; public/educational/pectus-excavatum/. Exports two meaningful MCQs per language and three localized cards for parent registry integration. Generated hero viewed: conceptual continuous sternum with lower depression; not a diagnostic scan. Original radiographs open at source resolution from linked figures.

Validation 2026-10-24: `node --import tsx scripts/test-thorax-pectus-ssr.mjs` PASS: actual route server-rendered DE/EN/FA, single h1, correct RTL, one open initial chapter, localcheck present, exacttopic practice hrefs, answer/translation consistency, source and media existence. Browser interactions, actual registry integration and independent review remain pending. This ledger is not clinical approval.
