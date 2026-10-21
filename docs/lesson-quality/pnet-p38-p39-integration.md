# pNET source integration record

- Scope: `Abdomen.pdf`, physical pages 38–39 only; this record does not claim full Abdomen PDF coverage.
- Existing lesson route: `/abdomen/pankreas/neuroendokrine-tumoren`.
- Integration: exact curriculum ID `pnet`, four localized MCQs per language, four trilingual flashcards, and route-level links to practice and cards.
- Assessment coverage: arterial hyperenhancement is common but not obligatory; compare a possible intrapancreatic accessory spleen with the spleen across phases; determine functional status using clinical/laboratory correlation; do not generalise the PDF's small insulinoma study to all PanNETs or derive treatment advice from it.
- Evidence checked: supplied PDF pages 38–39 visually and by extracted content; existing lesson text and its ENETS 2023 / NANETS 2020 references.
- QA: `npm run test:pnet-registration`; `npm run audit:mcq`; `git diff --check`.
- Independent bounded integration review: SRC/EDU/LNG/ASM/REV PASS; VIS NOT_APPLICABLE (no new image); UX BLOCKED pending real browser evidence. The whole-project build remains blocked in this environment by font-network and `.next` permission errors.
- Remaining scope: no claim is made that other Abdomen.pdf pages are covered by this integration.
