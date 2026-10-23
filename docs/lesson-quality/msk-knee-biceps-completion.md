# MSK.pdf knee biceps/PLC completion — 2026-10-24

Route `/msk/knie/kreuzbaender`, existing lateral chapter. Authoring plan: [exact outline/media plan](msk-knee-biceps-completion-plan.md). This is a bounded missing-source completion and critical caption correction, not a redesign or full clinical audit of the old lesson.

## Source coverage

| Source | Point | Disposition |
|---|---|---|
| MSK.pdf physical58 / printed57 | Normal axial PLC anatomy, labelled LCL, biceps tendon, popliteus tendon, arcuate ligament | Image personally compared with existing `arcuate-sign.png`: identical normal anatomical figure, not an avulsion demonstration. Route now uses descriptive `plc-anatomy-axial.png` with corrected captions/alt in DE/EN/FA. |
| MSK.pdf physical59 / printed58 | Biceps-Sehne-Verletzung MRI montage, initial left / 8 Wochen nach Trauma right | Embedded Image625.jpg extracted unmodified as `biceps-femoris-injury-followup.jpg` (1027×534). All four panels retained. Distal tendon disruption/altered signal and surrounding bright oedema are visible; timing label translated in captions. Sequence, detailed clinical context and tear grade absent: no sequence/grade inferred; no proof of functional stability or complete healing claimed. |
| MSK.pdf physical59 / printed58 | Bony fibular-head avulsion (Arcuate Sign) | Existing definition retained. New retrieval distinguishes soft-tissue tendon tear from bony avulsion. No supplied image is falsely presented as an arcuate-sign case. |
| MSK.pdf physical60 / printed59 | MCL/POL anatomy | Personally inspected for transition; no change needed within assigned scope. |
| Azzopardi et al. Isolated Complete Distal Biceps Femoris Tendon Tears, original 2-case series, doi:10.1055/s-0041-1741106, published online 2022-01-10, checked2026-10-24 | Original cases1–2 and Fig2–3 captions: distal tendon tear, oedema/retraction, absent bony avulsion, adjacent PLC structures intact in those cases | Supports general MRI checklist and possibility of soft-tissue rupture without bone fragment; does not identify the PDF patient or supply their outcome. Source linked in lesson. No article images copied. |

## Media provenance and translation

PDF owner Dr. Zia supplied MSK.pdf and explicitly authorized use of all its images. Original contributor/sequence/case identifier not stated for these figures; not invented. Exact extraction from embedded Image625.jpg preserves labels and content; SHA may be checked against source extraction. Normal-anatomy asset is byte-identical to prior wrongly named asset (retained for historical compatibility). Caption and alt use the same translated task text. Embedded German structure names and 8-week label are fully explained in DE/EN/FA captions.

| Concept | DE | EN | FA |
|---|---|---|---|
| Tendon | Biceps-femoris-Sehne | biceps femoris tendon | تاندون بایسپس فموریس |
| Disruption | Faserunterbrechung | fibre disruption | قطع الیاف |
| Retraction | Retraktion | retraction | عقب‌کشیدگی |
| Bony avulsion | knöcherne Avulsion | bony avulsion | آولسیون استخوانی |
| Follow-up timing | 8 Wochen nach Trauma | 8 weeks after trauma | ۸ هفته پس از تروما |

## Assessments and scope

Embedded 4-option decision has specific feedback for each choice, correct index1. Bank append is `kreuzbaender-{de,en,fa}-08` (letter B), card `kreuzbaender-07`; existing IDs remain stable. Shared localized data prevents divergent answers. No global registry edited; existing knieligamente exports already feed the registries.

## Evidence and gates

Author inspected physical58–60 rendered pages and the original p59 embedded montage, plus the existing falsely named normal anatomy asset. Focused source/assets/locale test and route SSR are tracked in `scripts/test-msk-knee-biceps-completion.mjs` and the existing p57–66 regression. Actual browser evidence and independent review are supplied by coordinator separately; no pass is inferred from SSR. Existing lesson shell has known later-optimization issues outside this bounded completion. Scientific approval remains pending Dr. Zia. Publication is handled by coordinator.

Assessment repair (2026-10-24): global MCQ audit requires four options. Added a fourth DE/EN/FA distractor that incorrectly infers a complete LCL tear from the biceps tear, plus explanatory feedback requiring separate LCL/PLC assessment. Correct answer remains B/index1; inline and bank options remain identical.
