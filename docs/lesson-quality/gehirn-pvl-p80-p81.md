# PVL: Gehirn.pdf pp. 80–81

Status: authored draft; independent review requested. The source pages and figures
were visually inspected; clinical, browser, and case-rights review are not complete.

## Learning promise and outline

Learners will describe periventricular white-matter distribution and serial change,
attribute findings to ultrasound or MRI, and avoid diagnosing PVL from a single
nonspecific observation. The lesson proceeds from location, through longitudinal
change, to modality-specific findings and a short follow-up decision check.

## Coverage ledger

| Source point | Importance | Lesson location | Disposition |
|---|---|---|---|
| p.80: PVL definition and bilateral/symmetric periventricular white-matter injury in preterm infants | Essential | `where` | Taught descriptively; source wording is not elevated to a standalone diagnostic criterion. |
| p.80: ischaemic watershed explanation and immature oligodendrocyte vulnerability | Context | Not taught | Omitted from this imaging-pattern lesson; requires separate pathophysiology source validation. |
| p.80: peritrigonal and lateral periventricular predilection | Useful | `where` | General periventricular search region retained; PDF's detailed localization not expanded beyond the bounded objective. |
| p.80: de Vries I–IV stage table, including a stated >7-day persistence and cystic extent | Important but threshold/classification-sensitive | Source note | Not taught as fixed stages or a timing threshold because the PDF combines modalities in the table and this draft does not validate that staging application. |
| p.81: acute cranial ultrasound periventricular echogenicity (“flare”) | Essential | `modality` | Taught as an attributed source description, not as sufficient proof of PVL. |
| p.81: acute MRI diffusion signal abnormality | Useful | `modality` | Mentioned as a source-attributed feature; sequence, timing and interpretation require specialist review. |
| p.81: later pseudocysts without ependymal lining | Useful | `evolution` | Condensed to possible cystic evolution; histologic specificity is not expanded. These pages do not say that cysts later regress/disappear. |
| p.81: later white-matter loss, ex-vacuo ventricular enlargement, irregular margins and FLAIR hyperintensity | Essential | `evolution`, source MRI figure | Taught as later structural pattern and compared with prior studies; not a standalone diagnosis. |
| p.81: corpus-callosum thinning in the caption | Context | Figure caption | Preserved in source figure but not taught as PVL-specific. |
| p.81: three end-stage MRI panels labelled rID 89973 | Essential visual evidence | `evolution` | All three source panels cropped from the user-authorized PDF and labelled by modality/view; source/case licence limitations are in `public/educational/pvl/image-provenance.json`. |
| Supplementary longitudinal observation: cysts may regress and later no longer be visible | Useful caveat, outside PDF coverage | `evolution`, self-check feedback, takeaway | Attributed to Dubowitz LMS, Bydder GM, Mushin J. *Arch Dis Child*. 1985;60:349–355, and Agut T, et al. *Pediatr Res*. 2020;87:37–49. This statement is explicitly not attributed to PDF pp.80–81. |

## Visual and translation plan

The hero shows a conceptual axial periventricular zone, explicitly labelled as a
schematic, not a patient scan. A separate conceptual sequence graphic connects
possible echogenicity, cystic change, and later volume loss; its caption states that
not every case follows each step. The real source MRI montage is placed beside the
chronic MRI explanation and labelled axial FLAIR (two panels) and sagittal T1.
German is the source-language rendering; the same chapter, caveat, figure, and
assessment structure is present in English and Persian. Key terms: periventrikulär /
periventricular / پیرابطنی; Echogenität / echogenicity / اکوژنیسیته; Zystenbildung /
cyst formation / تشکیل کیست; Volumenverlust / volume loss / کاهش حجم.

## Verification record

- Actual page images: `Gehirn.pdf` PDF pp.80–81 rendered and inspected at 180 dpi.
- Project route and exact curriculum ID: `/gehirn/anatomie/pvl`, `pvl-neonatales-muster`, `inProgress`.
- Source attribution: the PDF caption prints `rID: 89973`. A secondary listing identifies Haouimi A., “Periventricular leukomalacia - end stage,” DOI `10.53347/rID-89973` and reports CC BY-NC-SA 3.0 (modified); the primary case page was not independently inspected. The user's project authorization is recorded separately and does not establish third-party terms.
- Tests: `node scripts/test-pvl-render.mjs` PASS for actual-route shell SSR, DE/EN/FA strings and RTL metadata, visible assets, assessment, takeaways, source ledger/provenance, and exact inProgress curriculum link. `node scripts/check-gehirn-late-lessons.mjs` PASS; `git diff --check` PASS.
- Independent bounded source/content/visual/language/assessment review: PASS after the PVL-SRC-01 attribution correction and German retry translation retest. The reviewer independently checked the three source crops against PDF p.81. Browser behavior, Persian RTL visual review, specialist approval, and primary image-license verification remain open.

## Scope limits

This is a concise pattern-recognition teaching draft, not a neonatal imaging protocol,
outcome prediction, grading guide, or clinical decision aid. It does not teach the
source's fixed stage numbers, a standalone diagnostic threshold, or pathophysiology.
