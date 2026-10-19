# Morbus Ormond — independent review

Date: 2026-10-19. Reviewer: separate read-only agent, not the author. Route `/abdomen/retroperitoneum/morbus-ormond`; exact ID `morbus-ormond`; Abdomen.pdf pp.95–96 / printed pp.94–95.

| Gate | Result | Evidence and limits |
|---|---|---|
| SRC | PASS, bounded | Both source pages and image montage inspected. Nineteen-point ledger dispositions checked against the lesson. CT distribution, differential cautions and DWI limitations cross-checked against Kamper et al. and comparative CT sources. No universal ADC cutoff claimed. |
| EDU | PASS | Pattern → ureter/vascular consequences → tissue/activity → differential. Distinguishes descriptive imaging findings from cause and histology. |
| VIS | PASS, attribution scope | PDF96 crop matches two axial, one coronal and one sagittal views, source paragraph and rID186508. DE/EN/FA caption links to the Radiopaedia case. Provenance states contributor is unidentified and case-specific reuse metadata could not be independently verified; no legal-clearance claim. The user-authorized project scope is recorded. |
| LNG | PASS, static | Reviewer inspected DE/EN/FA lesson and assessment; no answer-changing translation defect found. Scoped checker: 43 content and 25 interface units. Actual browser RTL rendering remains unobserved. |
| ASM | PASS, static | Exact curriculum link and `inProgress` state; one four-option question is connected to the exact topic and bank, with consistent answer/feedback. Three retrieval cards are local to the lesson. Global audit passed at 630 questions and 18 cases per language. |
| UX | BLOCKED | Browser surface unavailable/restricted. Mobile, theme, RTL, focus, persistence and live interactions not observed. |
| REV | PASS, bounded | Independent read-only review and attribution/link delta retest complete. No scientific specialist approval or independent legal-rights determination. |

## Closed visual finding

Initial review requested visible source attribution and complete provenance. Author added a DE/EN/FA link to `https://radiopaedia.org/cases/186508`, preserved `rID186508`, crop source/page/coordinates, and explicitly retained `contributor: null` with the access and metadata limitation. Independent retest verified the rendered anchor value, captions, original page and final crop. This closes visible attribution within scope; contributor identity and case-specific rights remain unverified and are not represented as cleared.

Checks rerun at retest: `node scripts/check-ormond-lesson.mjs` PASS; `git diff --check` PASS (unrelated PDF-map line-ending warning only). No browser or legal-rights check was performed.
