# Femoral shaft fracture AO 32 — MSK.pdf p.31

## Scope and learning plan

- Curriculum ID: `femurschaftfraktur`; route: `/msk/trauma/femurschaftfraktur`.
- Outcome: describe the source-level AO 32 morphology groups (simple A, wedge B, multifragmentary C) and recognize A1 spiral, A2 oblique (≥30°), and A3 transverse (<30°) examples.
- Audience / prerequisite: radiology learners familiar with femoral anatomy and basic fracture description.
- Scope boundary: morphology/classification only. No treatment, prognosis, mechanism or triage instruction.
- Chapter plan:
  1. **Welche AO-32-Gruppe beschreibt die Morphologie?** — Distinguish simple fracture (A), wedge (B), and multifragmentary (C) using the number/configuration of intermediate fragments, with the PDF's simplified description clearly separated from full AO subtyping.
  2. **Welche einfache Frakturlinie sehen Sie?** — Compare A1 spiral, A2 oblique (≥30°), and A3 transverse (<30°) on the supplied three-panel radiograph crop, then answer a localized retrieval question.
  3. **Take-home rules** — Compress only the A/B/C distinction and the A1/A2/A3 line-pattern mapping.
- Visual plan: topic-specific non-diagnostic SVG header of a shaft fracture pattern; one three-panel crop of the authorized `MSK.pdf` physical p.31 / printed p.30 radiographs. The source figure depicts only 32-A1/A2/A3; it will not be captioned as an image of 32-B or 32-C. Crop output and exact provenance are recorded in `public/msk/femoral-shaft/provenance.json`.
- Vocabulary: Femurschaft / femoral shaft / تنهٔ فمور; einfache Fraktur / simple fracture / شکستگی ساده; Keilfraktur / wedge fracture / شکستگی گوه‌ای; mehrfragmentäre Fraktur / multifragmentary fracture / شکستگی چندقطعه‌ای; spiral / spiral / مارپیچی; Schrägfraktur / oblique fracture / مایل; Querfraktur / transverse fracture / عرضی.

## Source coverage ledger

| Claim | Source and location | Importance | Destination | Status / boundary |
|---|---|---|---|---|
| Femoral shaft spans the subtrochanteric region to distal metaphysis; muscle envelope requires considerable force to break | User `MSK.pdf`, physical p.31 / printed p.30 | Context | Brief opening note | Include location only; omit causal/mechanism statement because not needed for morphology objective and not independently reviewed. |
| AO type 32-A: simple fracture with two main fragments; A1 spiral, A2 oblique ≥30°, A3 transverse <30° | User `MSK.pdf`, physical p.31; cross-check AO Surgery Reference, Femur shaft | Essential | Group comparison and image-reading section | Include thresholds as stated in source and cross-checked in AO Surgery Reference. |
| AO type 32-B: wedge fracture, three fragments; wedge separated | User `MSK.pdf`, physical p.31; AO Surgery Reference separates intact and fragmentary wedge subtypes | Essential | Group comparison and question | Keep source-level simplified description; explain this is not full AO/OTA subtype coding. |
| AO type 32-C: complex/comminuted, more than three fragments | User `MSK.pdf`, physical p.31; AO Surgery Reference uses multifragmentary group including segmental subtypes | Essential | Group comparison and question | Preserve PDF teaching statement; add brief caution that full type assignment follows morphology/subtype criteria and should not be based on count alone. |
| Three femoral-shaft radiographic examples labelled 32-A1 spiral, 32-A2 oblique ≥30°, 32-A3 transverse <30° | User `MSK.pdf`, physical p.31 / printed p.30; full page inspected and panel crop inspected at 240 dpi | Essential visual | Image comparison, self-check | Projection is not specified on the source page, so it is not inferred. Include crop with exact page/provenance; labels/arrow overlays are retained; contributor identity is not shown in the PDF and is not inferred. |
| AO A1/A2/A3 morphology and ≥30° distinction; wedge vs multifragmentary classification | AO Foundation Surgery Reference, [Femur shaft](https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/femoral-shaft), checked 2026-10-22 | Cross-check | Source notes and lesson table | Uses official examples; no treatment content copied. Full AO/OTA coding detail is outside scope. |

## Authoring and review evidence

- PDF physical p.31 / printed p.30 rendered at 240 dpi and visually inspected in full. The A1/A2/A3 figure was cropped without changing its labels or arrows and visually re-opened.
- No pre-existing lesson route or curriculum node for `femurschaftfraktur` was found. The adjacent distal-femur lesson remains limited to AO 33 and Hoffa morphology.
- Assessment plan: one embedded decision with explanatory feedback; two localized four-option MCQs; three flashcards on group morphology and A1/A2/A3.
- Focused validation passed: `node --import tsx scripts/check-femoral-shaft-lesson.mjs` (46 localized triplets, route/curriculum wiring, six assessment items, source-figure boundary and provenance); `npm run audit:mcq` (757 questions and 18 cases per language); `git diff --check`.
- Production build was attempted but blocked by unavailable DNS for `fonts.googleapis.com`; it then failed creating `.next/server/app/api` with `EPERM`. No route-level runtime error was reported, but successful compilation is not confirmed.
- Independent read-only review completed with SRC, EDU, VIS, LNG, ASM and REV PASS for the bounded draft after a minor source-ledger correction; the full gates and evidence are recorded in [the independent review report](femoral-shaft-fracture-independent-review.md).
- UX/browser behavior remains BLOCKED without runtime/browser evidence. Dr. Zia scientific approval remains pending; publication is not requested by this lesson task.
