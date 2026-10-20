# Morbus Scheuermann — Wirbelsäule.pdf p.13 (printed p.12)

Status: bounded addition to the existing `/wirbelsaeule/entzuendlich` developmental-pattern chapter. No separate route or treatment lesson is created.

## Source and teaching scope

Physical PDF page 13 was rendered and visually inspected. It is titled “Morbus Scheuermann (Adoleszentenkyphose)” and has the printed page number 12. The page presents a lateral radiograph, not MRI-only diagnosis. Its image label includes Radiopaedia rID-58862.

| Key | PDF evidence | Importance | Lesson location | Disposition |
|---|---|---|---|---|
| SCH-P13-01 | Definition: juvenile spinal osteochondrosis with growth disturbance of endplates, associated with fixed hyperkyphosis | Core | Chapter lead | Included as the PDF's description, not expanded into a complete clinical disease definition |
| SCH-P13-02 | PDF's descriptive distribution: ages 10–17, male > female, mostly thoracic T7–T10 | Context | First table row | Included and explicitly attributed to this older summary, not presented as current prevalence |
| SCH-P13-03 | Sørensen: vertebral wedging ≥5° in at least three adjacent vertebrae | Core criterion | Dedicated row and existing quick case | Included exactly as stated by PDF; no added apex, modality, or separate angle threshold |
| SCH-P13-04 | Lateral radiographic signs: wedging, Schmorl nodes (intraspongious disc herniations), wavy/irregular endplates, narrowed disc spaces, fixed thoracic hyperkyphosis >40° Cobb | Core pattern | Radiographic row | Included; >40° is identified as a PDF value, not a management threshold |
| SCH-P13-05 | Edgren–Vaino: Schmorl node with opposing sclerosis | Supporting | Radiographic row | Included, terminology aligned across DE/EN/FA |
| SCH-P13-06 | MRI: Schmorl nodes, disc degeneration, possible active oedema (T2 hyperintensity) | Supporting | MRI row | Included as findings listed by PDF, not as an independent diagnostic rule |
| SCH-P13-07 | Differential: postural kyphosis is correctable/reclining and has no characteristic multilevel wedging | Core distinction | MRI/differential row and interactive case | Included in all three languages with explanatory incorrect feedback |
| SCH-P13-08 | Lateral radiographic case image, PDF p.13 / printed p.12, rID-58862 | Useful teaching visual | Chapter figure | Cropped from user-provided PDF. Caption directs interpretation and says it does not replace measurement or review of associated signs. Contributor-level reuse terms were not independently verified; the user authorized supplied-PDF imagery. |

## Source conflict and limits

The lesson preserves the supplied PDF's threshold (`≥5°` at three or more adjacent vertebrae) and labels it as the criterion the PDF uses. The linked AO Surgery Reference describes `>5°` in three consecutive vertebrae, illustrating that criteria wording varies. The lesson does not silently harmonize those cutoffs or use either as a stand-alone clinical diagnosis. Yaman and Dalbayrak's imaging review is included for general radiographic/MRI context, not for replacing the source page.

The source image itself is a contextual example and is modest in resolution with a page watermark. It is not labelled as independently verified for every feature, nor used to teach a measured angle. It retains the visible source case ID in the caption. No surgical, prognostic, or management content is added.

## Assessment and curriculum

The exact `morbus-scheuermann` curriculum topic now points to `/wirbelsaeule/entzuendlich` and remains `inProgress`. The existing three-language Sørensen MCQ and flashcard are wired to that exact topic for retrieval; no axSpA items or chapter content were changed.

## Verification and open gates

- `node --import tsx scripts/test-morbus-scheuermann-wirbelsaeule-p13.mjs` — route SSR in DE/EN/FA, RTL, source page identity, figure/caption, criterion/differential semantics, exact curriculum mapping and assessment retrieval.
- `node --import tsx scripts/audit-msk-spine-assessment-retrieval.mjs` — global question/card schema and topic retrieval.
- `node --import tsx scripts/check-msk-spine-authorship.mjs` — lesson structure and translations.
- `git diff --check` — whitespace validation.

Independent review by `/root/review_ucl_shoulder`: scoped PASS. The reviewer rechecked physical PDF p.13 / printed p.12, the crop, criterion/source wording, all three locales and RTL render, exact curriculum mapping, and global assessment retrieval. No source or bounded-scope defect was found.

Browser layout/keyboard/theme review and specialist scientific approval remain pending. This bounded source review is not clinical sign-off or publication approval.
