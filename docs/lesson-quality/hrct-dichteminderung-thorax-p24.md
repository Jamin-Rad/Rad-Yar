# HRCT decreased density — Thorax.pdf p.24 visual mapping

## Scope

This is a source-traceability addendum to the existing `/thorax/hrct/dichteminderung`
lesson, not a new lesson or a claim of complete coverage. It maps the two cases on
physical PDF p.24 (printed p.23) to existing lesson assets in the “Bulla, Zyste,
Kaverne” section.

| PDF figure | Source-page identifier | Existing lesson asset | Lesson label | Verification |
|---|---|---|---|---|
| Axial CT of an apical bulla in emphysematous lung | rID 7959 | `public/hrct/dichteminderung/image28.jpeg` | Bulla · rID 7959 | Compared visually with the page raster; the case image and ID match. |
| Axial CT of a thin-walled pulmonary cyst | rID 10493 | `public/hrct/dichteminderung/image29.jpeg` | Pulmonary cyst · rID 10493 | Compared visually with the page raster; the case image and ID match. |

The lesson already linked each image to its matching Radiopaedia case. These
assets predate this addendum. The source PDF links each panel to its rID, but the
repository does not record how the existing local files were obtained or cropped;
this ledger therefore records the visual mapping and does not assert a file
derivation chain, named contributor, or separate licence statement. The user has
authorized use of supplied-PDF images and approved Radiopaedia examples for this
lesson workflow.

## Validation

- Physical p.24 (printed p.23) rendered and inspected; the rIDs are legible on the
  source page.
- Existing local image assets visually compared with the two source panels.
- Focused test `node --import tsx scripts/test-hrct-dichteminderung-thorax-p24.mjs`
  checks the lesson section, page mapping, case IDs, links, captions, and local
  asset presence. The shared `HrctPatternLesson` renders these assets as image
  figures with localized captions and Radiopaedia links; this is not a browser
  acceptance test.
- No claim is made about emphysema subtype coverage; the source page does not
  teach those subtypes.

Browser/device QA and clinical approval remain open.
