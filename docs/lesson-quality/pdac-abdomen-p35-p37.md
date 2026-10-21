# Pancreatic ductal adenocarcinoma — Abdomen.pdf pp. 35–37

Scope: source-bounded imaging lesson at `/abdomen/pankreas/pankreaskarzinom`.
The printed page numbers are 34–36. All three source pages were rendered and
visually inspected.

| Physical page (printed) | Source teaching point | Lesson disposition |
| --- | --- | --- |
| 35 (34) | Older TNM summary including size, local extension, vascular involvement, nodes and distant metastases. | Deliberately not copied as current staging; requires current staging source and is outside this imaging-focused module. |
| 36 (35) | Usually ill-defined hypoenhancing CT mass; some lesions are isoattenuating and visible indirectly through ductal or parenchymal changes; double-duct sign; vascular contact/encasement/deformity/thrombus. Paired CT case from Radiopaedia rID 86457. | Lesson covers CT pattern and indirect signs, qualifies the double-duct sign as localising but nonspecific, and asks for vessel-by-vessel structured description. A source image pair is included as an advanced local-invasion example. The source labels no acquisition phase, so none is inferred. Its <=180/>180 contact sketch is not carried as a standalone staging or resectability rule. Structured vascular reporting references SAR/APA consensus; an ACR 2025 attribution was removed because access to verify its edition and claims was unavailable. |
| 37 (36) | MRI T1/T1-FS hypointensity, slower/lower enhancement, variable T2/FLAIR and possible MRCP double-duct sign; labelled MRI panels. | Route summarizes T1, enhancement, variable T2 and MRCP, and includes the labelled six-panel axial/coronal MRI comparison. Its source caption describes an irregular mass with a necrotic non-enhancing centre; no unlabelled phase or additional imaging finding is inferred. |

## Learning path and visuals

The route now uses `LessonReferenceShell`, a code-native pancreas/vessel
schematic, one source-bounded self-check, explicit quiz and flashcard links, and
a concise three-rule take-home summary. The real CT pair supports recognition
of hypoenhancement and local vascular involvement; it is explicitly labelled an
advanced case rather than a typical early presentation. The labelled six-panel MRI comparison has a concise alt description and a separate translated caption.

The crop provenance and authorization are in `media-provenance.md`. The case
page was found by its visible rID and contributor, but direct Radiopaedia page
access returned HTTP 402; exact case-specific license text was not independently
retrieved. The user explicitly authorized the supplied PDF figures and
Radiopaedia cases for RadYar.

Three localized four-option MCQs and four localized flashcards are linked to the
existing `pdac` topic. The curriculum entry remains `inProgress`; this bounded
lesson does not establish comprehensive oncology staging, treatment guidance or
clinical sign-off.

Validation: focused route/asset/question/flashcard integration test and global
MCQ audit pass; the lesson JSX transform and `git diff --check` pass. The
production build did not complete because the environment could not resolve
`fonts.googleapis.com`. Independent review and browser/RTL review are recorded
separately; browser access may remain blocked.
