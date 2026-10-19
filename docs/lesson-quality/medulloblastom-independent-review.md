# Medulloblastoma — independent review

Date: 2026-10-19. Reviewer: separate read-only agent; author was a different agent. Route `/gehirn/tumoren/medulloblastom`; existing ID `medulloblastom`; Gehirn.pdf pp.43–44 / printed pp.42–43.

| Gate | Result | Evidence and limits |
|---|---|---|
| SRC | PASS, bounded | Both source pages, complete p.44 MRI panel and source ledger inspected. Claims stay within PDF and cited primary studies; no imaging assignment of histology/molecular group or unsupported staging claim. |
| EDU | PASS | Location and obstructive effects → visible MRI sequences → limits and retrieval. DWI/ADC and spinal dissemination are explicitly not demonstrated by the source panels. |
| VIS | PASS, represented evidence only | Actual crop preserves labels for left sagittal T1, middle axial FLAIR and right axial T1 C+, plus source rID. Schematic is separately identified. No DWI/ADC/spinal scan is invented. Contributor identity/case-specific reuse metadata remains unverified; project authorization is recorded without a legal-clearance claim. |
| LNG | PASS after correction | Independent review found Persian `انتشار مولکولی` ambiguous for MRI diffusion. Author replaced it with `تصویربرداری انتشار` / `توالی‌های انتشار`, reserved `گسترش` for tumor spread and retained `محدودیت انتشار` for diffusion restriction. Independent delta retest confirmed affected data, flashcards, questions, topic text and checker; no corresponding source/claim boundary changed. |
| ASM | PASS, static | Two connected questions and two cards fit the lesson scope; exact existing topic, route and `inProgress` status inspected. Global MCQ audit passed at 633 questions and 18 cases per language on retest. |
| UX | BLOCKED | Static route inspection only. Browser/RTL, mobile, themes, focus, persistence and interactions remain unobserved. |
| REV | PASS, bounded | Independent initial review plus independent terminology delta retest. No scientific specialist approval. |

Checks: `npx tsx scripts/check-medulloblastom.mjs` PASS (61 localized units plus terminology assertions); `npm run audit:mcq` PASS; `git diff --check` PASS. Remaining evidence gaps: sequence-verified DWI/ADC and spinal teaching images; case contributor metadata/access; browser and specialist review.
