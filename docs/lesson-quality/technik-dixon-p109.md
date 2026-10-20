# Dixon images — Technik.pdf p.109 (printed p.108)

Status: bounded visual/teaching addendum to the existing `/technik/grundlagen#mrt` section; not a new lesson or a complete coverage review of Technik.pdf.

## Learning task and source mapping

Learners should identify the paired in-phase/out-of-phase images and the fat-only/water-only Dixon reconstructions, then describe the signal decrease shown in the marked left adrenal lesion without treating one image pair as a universal diagnosis.

| Key | PDF evidence | Importance | Lesson location | Disposition |
|---|---|---|---|---|
| DIX-109-01 | Technik.pdf physical p.109 / printed p.108, upper panel: sagittal post-contrast T1-TSE Dixon examples labelled fat-only = in-phase minus opposed-phase and water-only = in-phase plus opposed-phase | Essential | `/technik/grundlagen#mrt`, localized figure/caption | Included as a crop from the user-provided PDF; retains labels and source context; no sequence properties inferred beyond page labels |
| DIX-109-02 | Same page, abdominal axial pair labelled In-Phase and Out-of-Phase; arrow marks a left adrenal lesion with signal drop on Out-of-Phase | Essential | `/technik/grundlagen#mrt`, localized figure/caption and inline self-check | Included as source observation; the PDF says the finding is compatible with adrenal adenoma, not a general rule; scientific context cautions against diagnosis from signal drop alone |
| DIX-109-03 | Page caption explains chemical shift between water and fat; lower caption states the adrenal finding is compatible with adenoma | Essential, qualified | Dixon table row, figure caption and self-check | Included with case-specific qualification; “compatible with” preserved, not upgraded to proof |
| DIX-109-04 | Frequency-selective fat suppression, STIR, and another Dixon example are also shown on p.109 | Optional / deferred in this delta | Existing MRT text already compares fat-suppression methods; other examples not reproduced | No quality ranking or protocol recommendation is drawn from this single-page comparison |

## Outline and visual plan

1. Keep the existing section sequence and place this in the current “Dixon and opposed phase” row.
2. Use the first crop to compare the PDF-labelled fat-only and water-only sagittal images.
3. Use the second crop to compare the in-phase/out-of-phase abdomen pair and locate the left adrenal lesion indicated by the arrow.
4. A three-option retrieval check separates the image observation, the PDF's case-specific interpretation, and an unsupported universal adenoma claim.

Both crops are from the user-provided `Technik.pdf`, physical page 109 / printed page 108. The page images were rendered and inspected. No Radiopaedia ID or case contributor is visible on this page, so neither is asserted. The user authorized use of supplied-PDF images. This records that project authorization, not independent contributor-level licensing or patient/case metadata.

Assets:

- `public/technik/grundlagen/dixon-fat-water-pdf-p109.png` — upper sagittal fat-only/water-only panel and source labels.
- `public/technik/grundlagen/dixon-adrenal-opposed-phase-pdf-p109.png` — lower in-phase/out-of-phase abdominal pair, arrow and source caption.

The application shell and MRT section structure remain unchanged. Existing exact IDs now mapped to `/technik/grundlagen#mrt` are `mrt-grundprinzip-signalbildung` and `mrt-fettsuppression`; both were present in the curriculum before this change. No new ID was invented. The neighbouring `mrt-bildqualitaet-artefakte-snr` mapping was not changed.

## Scientific context and limits

- Omoumi et al., *How I Do It: Using the Dixon Method and Fat-Water Imaging in Musculoskeletal MRI*, *Radiology* 2026;318(1), DOI `10.1148/radiol.250374`, describes the acquired in-/opposed-phase sets and reconstructed water-only/fat-only sets. It is used for the technical relationship, not for diagnosis of the PDF case.
- Adam et al., *Chemical Shift MR Imaging of the Adrenal Gland: Principles, Pitfalls, and Applications*, *RadioGraphics* 2016;36(2), DOI `10.1148/rg.2016150139`, describes opposed-phase signal loss as a sign of intracytoplasmic fat and discusses interpretation pitfalls. The lesson does not claim that signal loss alone proves adenoma.
- The source page depicts a **left adrenal** lesion, not a renal lesion. Its own text says compatible with an adrenal adenoma; the lesson labels that as the PDF's interpretation of this example.
- This update does not teach echo times, quantitative signal-index thresholds, a complete adrenal differential, protocol choice, or clinical management.

## Verification

- Focused test: `node --import tsx scripts/test-technik-dixon-p109.mjs` (actual `StandardPage` server-rendered in DE/EN/FA; localized captions/alt text, page identity, crop presence, curriculum ID/route, and wrong-answer feedback asserted).
- Independent source/content/visual/language review: PASS; focused test rerun with the project TSX loader.
- Shared parity check: `node scripts/check-technik-grundlagen-parity.mjs`.
- Diff formatting: `git diff --check`.
- Browser interaction/theme/responsive review and Dr. Zia's scientific approval remain pending; passing static assertions do not establish those gates.
