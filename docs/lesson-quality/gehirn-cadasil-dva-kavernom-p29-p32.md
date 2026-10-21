# Gehirn.pdf pp. 29–32: CADASIL, DVA, Kavernom

Stand: 21.10.2026. Bounded source-to-lesson reconciliation; this is not a full clinical audit or specialist approval.

## Source and method

Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Gehirn.pdf`, physical PDF pages 29–32. Text and rendered page images were inspected. The source figures on pp.29–32 were reviewed for their teaching content; this change does not copy those patient panels into the site.

## Coverage ledger

| PDF | Source point | Existing lesson | Disposition |
|---|---|---|---|
| 29 | Symmetric WMH with anterior temporal-pole and external-capsule involvement; lacunes and microbleeds | CADASIL MRI table and three-level FLAIR case already teach the named hallmark regions, lacunes and microbleeds | Retained; source coverage confirmed for this bounded comparison |
| 29 | Frontal/parietal white matter, possible corpus-callosum involvement and relative cortical sparing | Not stated explicitly in the MRI table | Added in DE/EN/FA to the MRI table and a flashcard; added localized MCQ 13 |
| 29 | PDF describes microbleeds as predominantly subcortical and contrasts them with CAA | Existing table covered both locations but did not preserve the source's qualifier or overlap caveat | Updated in DE/EN/FA to retain “predominantly subcortical in the PDF” while noting lobar and deep foci are reported. CAA overlap is qualified, not treated as a location-only rule. A 2018 MRI study reports both locations, and GeneReviews says a predominant location is not established; this discrepancy is explicit rather than silently replacing the supplied source. |
| 29 | Three MRI teaching panels | Route already has an attributed, labeled three-image FLAIR case, rID 22131 | Kept as existing case material; new distribution schematic is code-native and explicitly non-diagnostic |
| 30 | DVA as a developmental drainage variant; caput-medusae morphology, contrast enhancement, susceptibility veins, possible associated cavernoma | Existing DVA route covers the developmental venous pattern, contrast, SWI/T2*, associated cavernoma and clinical context | Existing teaching retained; no unneeded duplicate section or image added |
| 30 | Prevalence ranges and share of vascular malformations | PDF gives 2.5–9% in contrast-enhanced MRI and “60% of vascular malformations”; estimates vary with cohort and denominator | Deferred rather than adding as a universal rate |
| 31–32 | Cavernoma low-flow sinusoidal histology, variable-age blood products, T1/T2/SWI/GRE appearance and angiographic occultness | Existing Kavernom route already addresses these diagnostic features and DVA association | Existing teaching retained; page-level match checked, no duplicate prose added |
| 31–32 | Annual hemorrhage rate around 1% and intervention statements | Existing lesson includes natural history and management | The unqualified annual rate was not copied; hemorrhage risk varies with presentation and location. No treatment claim was changed in this batch |

## Changes

- `data/cadasil.js`: MRI table and CAA differential wording in DE/EN/FA; one aligned MCQ and one flashcard.
- `app/gehirn/vaskulaer/cadasil/page.js`: shared `LessonHero`, source-aligned schematic, and first chapter open by default.
- `public/cadasil/hero.svg` and `distribution.svg`: original, code-native diagrams; neither depicts a patient image. The MRI schematic includes a visible localized color legend.
- `data/curriculum.js`: Cadasil MCQ link count aligned to 13.

## Verification and limits

Independent reviewer (read-only) checked p.29 against the lesson and all three languages. SRC/EDU/LNG/ASM passed for this bounded delta; VIS passed after adding the localized visible color legend. CAD-SRC-01 (PDF's predominantly-subcortical qualifier) and CAD-VIS-01 (missing color key) were both fixed and independently rechecked without regression. Reviewer did not re-audit the rID 22131 frames or the DVA/cavernoma lessons in full. The focused source/assessment assertions and project-wide MCQ audit pass. SVGs were rendered and visually inspected.

UX remains blocked: the browser refused opening the local CADASIL route, and the build did not finish. `next build` first could not resolve `fonts.googleapis.com`, then failed with `EPERM` creating `.next/types/app/api/admin/budget`; so this is not a successful production build. Browser desktop/mobile, RTL layout, theme, keyboard behavior, complete scientific correctness and specialist sign-off remain open. This bounded reconciliation does not mark the lessons clinically approved.

External evidence used to qualify microbleed wording: [CADASIL microbleed MRI study](https://pmc.ncbi.nlm.nih.gov/articles/PMC5784892/), [GeneReviews](https://www.ncbi.nlm.nih.gov/books/NBK1500/), and [CADASIL vs CAA microbleed-distribution study](https://doi.org/10.1007/s00330-021-08288-9). The source PDF remains primary for what the user-authored notes contain.
