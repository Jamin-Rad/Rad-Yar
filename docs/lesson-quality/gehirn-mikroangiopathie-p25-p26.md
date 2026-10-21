# Gehirn.pdf pp. 25–26 — hypertensive microangiopathy

## Source coverage

| PDF content | Disposition in the current lesson | Evidence / boundary |
| --- | --- | --- |
| p.25: Fazekas grades 0–3 and FLAIR examples | Existing table distinguishes periventricular from deep white matter grading; a source MRI panel for grades 1–3 has now been added below it. | The panel is cropped from the supplied Gehirn.pdf p.25 (printed p.24), preserves the visible E. De Marzio credit, and has a three-language alt description and source caption. It illustrates examples; it is not a substitute for the two-location grading table. |
| p.25–26: hypertensive ICH morphology, sites, oedema and CTA Spot Sign | Existing section/table covers irregular shape, initially mild oedema, deep typical sites, CTA Spot Sign and the A/B cerebellar haemorrhage-versus-metastasis comparison. | Existing descriptions and image files were inspected; this batch adds no new clinical assertion or image to this section. The PDF is a teaching source, not independent validation of its numeric claims. |
| p.26 bottom: cerebral amyloid angiopathy heading/content | Deferred to the CAA source span and its existing lesson. | Do not count the CAA boundary as newly covered by this batch. |

## Teaching and QA

- Route: `/gehirn/vaskulaer/hypertensive-mikroangiopathie`.
- The source panel is placed directly after the localized Fazekas table to pair visual examples with the distinct periventricular/deep criteria.
- The legacy route header now uses the shared `LessonHero` with an original, text-free SVG schematic; the explanatory definition remains in the first chapter rather than beneath the title.
- Locale strings were added in German, English and Persian. The shared figure component provides image enlargement; the actual signed-in browser experience remains unverified.
- Linked quiz and flashcards are pre-existing; no new assessment was introduced by this visual-only delta.
- Independent reviewer confirmed the source-ledger and accordion-initialization fixes, and approved SRC/EDU/VIS/LNG/ASM/REV for the bounded delta. After that review, the legacy header was migrated to the shared `LessonHero`; final independent delta review is pending. Clinical/specialist sign-off: pending.
- Browser QA was not run: Browser skill/runtime is unavailable in this session and Playwright is not installed. Thus responsive layout, live console, keyboard interaction, theme and authenticated route behavior remain unverified.

## Media record

| Asset | Provenance / credit | Use and status |
| --- | --- | --- |
| `public/hypertensive-mikroangiopathie/fazekas-pdf-p25.png` | Crop from supplied `Gehirn.pdf`, PDF p.25 (printed p.24); visible credit E. De Marzio. User stated supplied PDF images are licensed for use. | FLAIR examples of Fazekas 1–3. Cropped and visually inspected for readability and retained credit. |
| `public/hypertensive-mikroangiopathie/hero.svg` | Original code-native educational schematic; not a diagnostic image or copied clinical case. | Shared lesson header; localized alt text in route. |
