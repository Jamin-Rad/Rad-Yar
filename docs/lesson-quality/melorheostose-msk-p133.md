# Melorheostose — MSK.pdf p.133

Date: 2026-10-20. Role: delegated lesson author. Proposed curriculum ID: `melorheostose` (no exact topic ID exists at authoring time). Proposed route: `/msk/knochenstoffwechsel/melorheostose`, placed in the existing bone-disorder section rather than the neoplasm routes. Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf`, physical PDF p.133, printed p.132. Full page was extracted and rendered at 160 dpi, then visually inspected. The adjacent page p.134 begins a separate “Gefäße! Anatomie” section, so this page forms a bounded bone-imaging topic.

The source page is lesson-ready: it provides a disease definition and limited clinical context, radiograph/CT features, distribution, possible extraosseous ossification, MRI findings, a differential against enostosis/osteoma, and one hand radiograph labelled rID 199384. The page is the complete substantive source page; no broader disease classification or treatment content is inferred.

## Lesson promise and plan

After the lesson, the learner should recognize and describe the classic flowing cortical hyperostosis pattern, use CT/MRI for complementary extent and adjacent tissue assessment, and avoid treating the source's “no oedema/no tumour enhancement” phrase as a universal exclusion rule.

Chapter sequence: identify the pattern and distribution → describe radiograph/CT → explain MRI signal and source-evidence caveat → inspect the supplied case, compare the one source differential, and complete a retrieval check. The source image is a single left-hand radiograph; it is not represented as a long-bone illustration or proof of all written features. The SVG hero is explicitly schematic and non-diagnostic.

## Source coverage ledger

| ID | Source point | Importance | Lesson location | Status / boundary |
|---|---|---|---|---|
| MEL-01 | PDF p.133: rare sclerosing mesenchymal bone dysplasia | Essential | `intro` | Included as a concise description; no etiology or genetic mechanism inferred. |
| MEL-02 | PDF p.133: often incidental; pain and motion restriction can occur | Context | `clinical` | Included with “can occur” qualifier; no prevalence asserted. |
| MEL-03 | PDF p.133: “dripping candle wax”; irregular flowing cortical sclerosis along diaphysis | Essential | `intro`, `ct` | Included as the classic pattern, with explicit note that nonclassic patterns exist and not every case is classic. |
| MEL-04 | PDF p.133: usually unilateral, one limb, several bones in a sclerotome | Essential | `clinical` | Included as a common distribution tendency, not a requirement. |
| MEL-05 | PDF p.133: possible soft-tissue component and ossification; endosteal and periosteal components possible | Essential | `ct` | Included with “possible”; CT role in extent/localisation supplemented by Hurley-Novotny et al. 2021. |
| MEL-06 | PDF p.133: low T1/T2 signal of sclerotic bone | Essential | `mri` | Included specifically for the sclerotic bone component. |
| MEL-07 | PDF p.133: accompanying soft-tissue changes, fibrotic masses, contractures | Supporting | `mri` | Soft-tissue assessment included; not all changes asserted to occur in every patient. |
| MEL-08 | PDF p.133: “no oedema, no tumour enhancement” | Source claim requiring qualification | `mri`, source note, take-home | Preserved as the PDF's wording but not taught as universal. Hurley-Novotny et al. 2021 described soft-tissue, marrow and periosteal oedema in subsets of a 40-case cohort (some possibly incidental/biomechanical); Lee et al. 2000 reported central enhancement in 4/4 contrast-imaged lesions in a small MRI series. The lesson states oedema is nonspecific/context-dependent and enhancement variable; absence is not a blanket criterion. |
| MEL-09 | PDF p.133: enostosis/osteoma tend to be circumscribed, without flowing pattern | Essential differential | `case` | Included as the one source-listed comparison; explicitly not a complete differential diagnosis. |
| MEL-10 | PDF p.133: hand radiograph marked rID 199384 | Essential visual | `case` | Crop visually inspected and included. Source contributor is not named on the page; do not infer the external licence. Use relies on the user's explicit authorization of PDF images. Provenance file: `public/educational/melorheostose/pdf-case-p133.provenance.json`. |

## Visual and translation plan

| Teaching need | Asset | Purpose and review status |
|---|---|---|
| Orient to the “flowing” cortical morphology | `public/educational/melorheostose/hero.svg` | Newly authored code-native, non-diagnostic long-bone schematic. No embedded language-specific visible labels; translated alt text in route. |
| Inspect the actual source case | `public/educational/melorheostose/pdf-case-p133.jpg` | Crop of the single left-hand radiograph on p.133; visually checked after crop. No overlays. Attribution retains exactly the page's rID 199384; contributor unavailable. |

Terminology across DE/EN/FA: Melorheostose / melorheostosis / ملوره‌اوستوز; kortikale Hyperostose / cortical hyperostosis / هیپراستوز قشری; sclerotomal / sclerotomal / اسکلروتومی; endostal / endosteal / اندوستئال; periostal / periosteal / پریوستئال; Weichteilossifikation / soft-tissue ossification / استخوانی‌شدن بافت نرم; Signalarmut / low signal / کم‌سیگنالی; Knochenmarködem / marrow oedema / ادم مغز استخوان.

## Existing route and assessment audit

Before authoring, searched `data/curriculum.js`, `app/msk`, and lesson data for `Melorheostose`, `Melorheostosis`, `Léri`, and `199384`; no exact curriculum ID, route, linked MCQ or flashcard was found. The source differential has an adjacent routed lesson for enostosis at `/msk/tumoren/enostose`, but that does not cover melorheostosis. The coordinator added topic ID `melorheostose` to the metabolic/systemic bone diseases group and linked it to `/msk/knochenstoffwechsel/melorheostose`; the inline retrieval check is on the route.

## External scientific checks

- Hurley-Novotny AC, Karantanas AH, Papadakis GZ, Bhattacharyya T, Jha S. “Cross-Sectional Imaging Useful in Melorheostosis.” *JBMR Plus*. 2021;5(4):e10472. [Wiley](https://onlinelibrary.wiley.com/doi/full/10.1002/jbm4.10472), DOI 10.1002/jbm4.10472. Forty NIH cases; CT helped define lesion extent and MRI revealed variable soft-tissue, marrow and periosteal findings. Some oedema may be incidental or biomechanical; it is not a defining sign.
- Lee et al. “Imaging of Melorheostosis: Emphasis on MR Imaging Findings.” *J Korean Radiol Soc*. 2000;42:333–339. [Article](https://jksronline.org/DOIx.php?id=10.3348%2Fjkrs.2000.42.2.333), DOI 10.3348/jkrs.2000.42.2.333. Small MRI series: central enhancement was described in 4/4 contrast-imaged lesions; this qualifies, rather than replaces, the source page's generalized negative statement.
- Jha S et al. “Distinct Clinical and Pathological Features of Melorheostosis Associated With Somatic MAP2K1 Mutations.” *J Bone Miner Res*. 2019;34(1):145–156. [PubMed 30138550](https://pubmed.ncbi.nlm.nih.gov/30138550/), DOI 10.1002/jbmr.3577. Cited only for radiographic heterogeneity; molecular genetics are outside lesson scope.

## Validation status

- Full source page text and image: inspected.
- Source crop and provenance: visually inspected; provenance documented.
- DE/EN/FA route, non-diagnostic SVG, single self-check: authored; focused SSR passes for all three locales including Persian RTL.
- Curriculum ID/route: integrated and checked for uniqueness in `data/curriculum.js`.
- Independent source/content/visual/language/assessment review: PASS after corrections to reference mapping, Persian enhancement terminology and answer feedback. Delta SSR and scoped `git diff --check` pass.
- Clinical approval: pending. Browser/device/theme checks remain open; this lesson record is not a clinical release sign-off.
