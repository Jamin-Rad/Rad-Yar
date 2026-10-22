# Scaphoid fracture and SNAC — MSK.pdf pp.19–20

## Scope and learning path

- Curriculum ID: `skaphoidfraktur`; route: `/msk/trauma/skaphoidfraktur`.
- Audience: radiology learners reading wrist radiographs.
- Learning outcome: identify the acute Herbert A/B morphology shown in the PDF, distinguish chronic nonunion from the illustrated bipartite variant cautiously, and recognize the distribution of the SNAC arthritis pattern.
- Chapters: acute fracture classification; chronic nonunion and SNAC distribution; pseudarthrosis versus bipartite variant with a retrieval check.
- Visual plan: source-page Herbert sketch for subtype orientation; source paired wrist radiographs for the stated pseudarthrosis/bipartite comparison; source AP radiograph labelled SNAC for pattern recognition; code-native hero is explicitly conceptual, not diagnostic.
- Terminology: scaphoid / Skaphoid / اسکافوئید; waist / mittleres Drittel (waist) / ناحیهٔ waist; nonunion / Pseudarthrose / عدم جوش‌خوردن; SNAC / SNAC / الگوی SNAC.

## Coverage ledger

| Claim ID | Source | Essential point | Lesson location | Status / boundary |
|---|---|---|---|---|
| SCAP-19-01 | MSK.pdf, physical p.19, printed p.18, text + classification drawing | Herbert A1 tubercle and A2 stable group | `klassifikation`, table/check | Included; AO wording used for A2 as incomplete nondisplaced waist fracture. PDF says “nondislocated transverse fracture” and describes middle/distal third; subtype definition aligned to cited AO reference. |
| SCAP-19-02 | MSK.pdf p.19, figure labels A1/A2/B1–B4 | B1 distal oblique; B2 waist; B3 proximal pole; B4 trans-scaphoid perilunate fracture-dislocation | `klassifikation`, retrieval check | Included. Distinctions confirmed against AO Surgery Reference. Treatment labels from source intentionally omitted. |
| SCAP-19-03 | MSK.pdf p.19 text + figure | Source page does not display B5; later/formal Herbert variants include B5 comminution and C delayed union/D established nonunion | `klassifikation` | B5 is explicitly marked as absent from the PDF figure; C/D distinction is concise context. No stability or treatment advice inferred. |
| SCAP-19-04 | MSK.pdf p.19, two wrist images, source labels | Pseudarthrosis compared with bipartite scaphoid; PDF notes sclerotic margins and bony remodelling for pseudarthrosis | `abgrenzung` | Included as source-attributed visual comparison with clinical-context caveat. Does not claim morphology alone always resolves the differential. |
| SCAP-19-05 | MSK.pdf p.19, avascular-necrosis section | More proximal fracture location, especially proximal-pole B3, has greater ischemia/osteonecrosis risk; blood supply enters mainly distally | `klassifikation` | Added a concise DE/EN/FA vascularity note. It describes increased risk only; fracture location alone does not diagnose osteonecrosis. Cross-checked with AO Surgery Reference. |
| SCAP-20-01 | MSK.pdf, physical p.20, printed p.19, SNAC heading/text + one AP wrist image | Chronic scaphoid pseudarthrosis may develop progressive carpal arthrosis/collapse; source labels image SNAC | `pseudarthrose-snac`, visual, summary | Included with “can develop” rather than inevitability. Single projection limitation is explicit. |
| SCAP-EXT-01 | AO Surgery Reference (web, checked 2026-10-20) | Definitions for A1–B5 and A/B stability grouping | `klassifikation`; lesson sources | Used to resolve concise subtype naming; no treatment text transferred. |
| SCAP-EXT-02 | Herbert & Fisher 1984 (PubMed PMID 6693468) | Original classification reference | lesson sources | Citation included; abstract provides bibliographic confirmation, detailed subtype wording taken from AO. |
| SCAP-EXT-03 | Vender et al. 1987, 64 symptomatic nonunions (PubMed PMID 3611645) | Degeneration occurs in a predictable pattern in a retrospective symptomatic cohort | `pseudarthrose-snac`; lesson sources | Supports association/progression, not individual certainty or time thresholds. |

## Asset provenance

The author inspected the full rendered MSK.pdf physical pages 19 and 20 (printed pages 18 and 19), then made faithful crops from the supplied pages at 220 dpi:

- `public/msk/scaphoid/source-herbert-classification-p19.jpg`: crop of the Herbert sketch and its labels from physical p.19; source attribution is displayed in the lesson.
- `public/msk/scaphoid/source-pseudarthrosis-vs-bipartitum-p19.jpg`: crop of the two labelled radiographs from physical p.19. Labels are retained.
- `public/msk/scaphoid/source-snac-radiograph-p20.jpg`: crop of the source AP wrist image from physical p.20, labelled SNAC by the supplied PDF.
- `public/msk/scaphoid/scaphoid-fracture-schematic.svg`: newly authored conceptual schematic; never represented as a clinical image.

Reuse basis for the three PDF crops: user supplied the PDF and explicitly authorized its figures for this lesson project. No Radiopaedia case or outside image is included.

## Editorial and technical evidence

- Full PDF pages were rendered and visually inspected. The paired p.19 source frames were checked for sequence; the adjacent printed headings show the classification and comparison belong to this focused lesson.
- Clinical treatment recommendations and the source's older treatment allocation were omitted. The lesson does not make a prognosis for an individual patient.
- The SNAC progression wording was checked against Vender et al.'s original radiographic cohort and the AO Herbert classification reference was checked online on 20 October 2026. Other contemporary clinical thresholds are outside this lesson.
- The omitted p.19 AVN item was identified during independent review and added as SCAP-19-05. AO describes the proximal pole as relying on retrograde distal-to-proximal intraosseous flow and as prone to ischemia/osteonecrosis; the lesson keeps this as risk context, not a diagnosis or deterministic prognosis.
- The maintained `StandardLessonShell` is used. The retrieval check is placed inside the relevant differential chapter; there is no default standalone “Befund und Selbsttest” section.
- One inline four-option retrieval check is inside the classification chapter and has option-specific explanatory feedback in DE/EN/FA. It targets B4 without implying that the classification alone completes an image interpretation.
- Two additional four-option MCQs are connected to the global quiz bank under the exact `skaphoidfraktur` topic ID; two localized flashcards are connected to the corresponding deck and both quiz/card actions are present in the lesson shell.
- German labels embedded in the two p.19 figures are translated in adjacent DE/EN/FA legends. The Herbert figure legend preserves the PDF's A2 wording and explicitly distinguishes it from the AO-aligned A2 wording in the lesson text.
- `node --import tsx scripts/test-scaphoidfraktur-ssr.mjs` checks three-language server rendering, RTL direction, assets, all assessment feedback and sources, translated image labels, exact-topic quiz/card registration and localized options.
- Independent bounded review of MSK.pdf pp.19–20 found that the page's AVN/vascularity teaching was omitted. The lesson and ledger now include the qualified proximal-pole risk note and AO source; an independent delta review is pending. Browser/device matrix, interactive browser test, specialist clinical sign-off and publication decision remain open. This lesson is not marked scientifically approved or publication-ready by the authoring checks.
