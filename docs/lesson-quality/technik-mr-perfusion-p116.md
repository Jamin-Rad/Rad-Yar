# MR-Perfusion — Technik.pdf p.116 (printed p.115)

Bounded addition to `/technik/grundlagen#mrt-spezial`, curriculum ID `mrt-perfusion`. This does not audit the complete MR-special-techniques section or establish clinical approval.

## Source and outline

Technik.pdf p.116 was rendered and visually inspected. Its text describes dynamic gadolinium perfusion, a T1-based signal rise and T2*-based signal decrease; concentration-dependent dominance; derived CBV, CBF and MTT; neuroradiology examples (glioma progression versus pseudoprogression and stroke penumbra); and cardiac/lung perfusion. The page also includes post-contrast T1, FLAIR and color CBV panels, but the exact study/sequence/frame mapping is not sufficiently traceable for case teaching.

The addition stays inside the existing section rather than creating another route or chapter. The focused block title is **“Was verrät die Signalantwort auf den Bolus?”** Its purpose is to compare T1/T2* signal direction, relate the dynamic curve to perfusion metrics, and keep the listed applications appropriately bounded. A code-native, language-neutral signal-time schematic is planned; it is conceptual and contains no patient data.

| ID | Source point | Lesson placement | Status / limit |
|---|---|---|---|
| MP116-01 | Dynamic gadolinium bolus shortens both T1 and T2; T1 signal rises, T2* signal falls | Focus block principle and SVG | Included in DE/EN/FA; typical direction, not a quantitative curve |
| MP116-02 | Lower concentration: T1 effect tends to dominate; higher concentration: T2* susceptibility effect can dominate | Focus block rows/caveat | Included without numeric thresholds |
| MP116-03 | CBV, CBF, MTT | Metrics row and flashcard | Included with expanded names; model-derived, no universal thresholds |
| MP116-04 | Glioma progression versus pseudoprogression; stroke penumbra | Applications row | Included as source-listed uses; perfusion is adjunctive, not a stand-alone diagnosis |
| MP116-05 | Cardiac and lung perfusion | Applications row | Included as fields named by the PDF; no protocol advice |
| MP116-FIG | T1 post-contrast, FLAIR and two color CBV panels with arrows and compact case caption | Not reused as a diagnostic example | Sequence/study/frame identity is insufficiently traceable |

## Assessment and terminology

One four-choice MCQ in DE/EN/FA tests the opposed T1/T2* signal responses; all distractors have specific explanations. Two flashcards cover signal direction and CBV/CBF/MTT. The shared terminology is: `Perfusion | Perfusion | perfusion | پرفیوژن`; `signal rise | Signalanstieg | افزایش سیگنال`; `signal drop | Signalabfall | افت سیگنال`; `mean transit time | mittlere Transitzeit | میانگین زمان عبور`.

## Supporting literature

- Welker K, Boxerman J, Kalnin A, Kaufmann T, Shiroishi M, Wintermark M. *ASFNR Recommendations for Clinical Performance of MR Dynamic Susceptibility Contrast Perfusion Imaging of the Brain.* AJNR. 2015;36(6):E41–E51. doi:10.3174/ajnr.A4341. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5074767/). Technical recommendations and DSC limitations.
- Shiroishi MS, Boxerman JL, Pope WB. *Physiologic MRI for assessment of response to therapy and prognosis in glioblastoma.* Neuro-Oncology. 2016;18(4):467–478. doi:10.1093/neuonc/nov179. [PubMed](https://pubmed.ncbi.nlm.nih.gov/26364321/). Describes signal-time curves and model-derived CBV/CBF/MTT, including treatment-response context.

## QA status

- SRC/EDU/LNG/ASM/VIS: independent review and correction delta PASS. The visual delta confirmed localized Signal / Zeit nach Bolus labels and legend identifying both curve colors and the dashed bolus marker; focused SSR/registry test PASS.
- UX: BLOCKED without real-browser screenshot/render evidence. SSR is not browser evidence.
- Build: attempted by reviewer; BLOCKED because the environment could not resolve `fonts.googleapis.com`, then hit EPERM creating `.next/server/app/fatima/login`. This is recorded as an environment limitation, not a successful build.
- Clinical interpretation/signoff and publication: pending.
