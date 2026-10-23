# Hepatocellular adenoma — Abdomen.pdf pp. 16–18

Scope: source-bounded lesson for `/abdomen/leber/adenom`. Source pages were
rendered and visually checked; the printed folios are one lower than physical
PDF page numbers. This lesson focuses on imaging and a short, current clinical
context. It is not an individual management pathway or clinical sign-off.

| Physical PDF page (printed) | Source teaching point | Lesson disposition |
| --- | --- | --- |
| 16 (15) | Definition; epidemiology; hormonal and metabolic risk factors, including the source's duration/dose association; haemorrhage and malignant-transformation relevance; variable ultrasound and CT patterns. | Definition and risk context included concisely, including the duration/dose association without inventing a quantitative estimate. Ultrasound is left out of the focused module because the source calls it nonspecific. CT table teaches unenhanced, arterial and later-phase pattern with nonspecificity caveats. Fixed risk percentages and the source's 90% female estimate are omitted. |
| 17 (16) | Native T1 may be high with fat/glycogen; opposed-phase signal drop; mildly high T2; arterial hyperenhancement, later persistent enhancement/no classic HCC wash-out; usually low hepatobiliary-phase signal; older management diagram. Six-panel MRI plate. | All imaging points are summarized in a sequence/phase table. The six-panel source figure is cropped with its labels and reading order retained; the caption explicitly states that HBP is not shown. The old management graphic is not reproduced. |
| 18 (17) | HBP and opposed-phase comparison with FNH; typical haemangioma and HCC contrast cues. | HCA/FNH HBP comparison is included, with exceptions and subtype overlap. Haemangioma/HCC reminders are not repeated because their dedicated lessons and the focal-lesion comparison cover them. |

Clinical context was updated against the [ACG Clinical Guideline: Focal Liver
Lesions (2024)](https://doi.org/10.14309/ajg.0000000000002857), rather than copying
the PDF's older size-based flowchart. The overview states the guideline's broad
sex/size distinction, surveillance intervals for women with lesions under 5 cm,
the observation approach for women with lesions at least 5 cm, treatment recommendation
for men regardless of size, and pregnancy monitoring interval. It is labelled
educational, not individualized treatment advice. It does not teach biopsy,
procedure selection, pregnancy intervention thresholds, or transplant criteria.

The embedded image is from physical page 17 and has an entry in
`media-provenance.md` with crop dimensions and source attribution. User reuse
authorization applies to the supplied PDF image; the PDF does not identify its
contributor. Four localized MCQs and five localized flashcards are registered
under the existing curriculum ID `leberadenom`; no new ID was invented.

Validation: focused route/asset/translation/assessment test and global MCQ audit
pass. Independent source, education, visual, language and assessment review
passed after corrections. The focal-lesion comparison's undefined localized-copy
reference was fixed and asserted. The reviewer confirmed four distinct,
lesson-specific fourth choices in each language; the German CT distractor grammar
was corrected and is asserted against the registered question bank. Browser
rendering/interaction and RTL behavior could not be checked because localhost
access was unavailable. The lesson remains `inProgress`; these pages do not
establish complete coverage of every benign liver lesion or clinical approval.

## Assessment return-path correction — 2026-10-23

The lesson's quiz and flashcard actions now include an encoded return target to
`/abdomen/leber/adenom`; EN/FA targets retain `?lang=en|fa`, and destination
URLs carry the active language. The curriculum links return to the German
default lesson. Independent review checked both downstream `from` consumers and
confirmed that quiz and flashcards use the target as their back link. The HCA
integration checker, global MCQ audit and scoped diff-check pass. ASM and REV
pass for this link-only delta; browser interaction and RTL remain unverified.

## Independent review corrections — 2026-10-23

An independent review of the tracked route and rendered PDF pages 16–18 found
that the previous ACG summary overstated the recommendation for men and omitted
exceptions to observation of lesions ≥5 cm. The clinical overview now distinguishes
asymptomatic women with lesions <5 cm, women with lesions ≥5 cm without imaging
features concerning for malignancy (where 6–12 months of observation may be
considered), immediate treatment when concerning features are present, resection
of β-catenin-mutated adenomas regardless of size, and consideration of resection
for men regardless of size. Pregnancy monitoring and the >6.5 cm / high-rupture-risk
intervention cues are also stated. Wording was compared with the primary [ACG
2024 guideline](https://doi.org/10.14309/ajg.0000000000002857), including Key
Concepts 11 and 13–16 and the corresponding management text.

The generic liver header schematic was replaced by a localized HCA-specific
concept diagram showing the typical arterial-enhancement and hepatobiliary-phase
pattern, with an explicit schematic/non-patient-image description. The source
MRI caption and alt text now direct the learner to follow the right-lobe lesion
across the labelled in-/out-of-phase and dynamic T1 images. The actual figure was
visually checked at display size; it contains six labelled panels and no
hepatobiliary-phase image.

Retest: focused route/assessment/provenance/language assertions and global MCQ
audit pass; scoped `git diff --check` passes. Independent correction retest
confirmed SRC, VIS, ASM and REV PASS for the scoped changes. Browser UX/RTL remain
BLOCKED: the local browser connection to port 3011 timed out even while the
development server reported ready. Clinical approval by Dr. Zia remains pending.
