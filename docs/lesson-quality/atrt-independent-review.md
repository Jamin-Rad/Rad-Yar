# ATRT independent review and correction record

**Lesson:** `/gehirn/tumoren/atrt` · **ID:** `atrt`
**Review type:** Independent editorial/technical review; not specialist scientific or release approval.
**Status:** Follow-up review completed after corrections; reviewer confirmed the current snapshot.

## Initial findings

| Finding | Severity / gate | Independent evidence | Correction / current evidence |
| --- | --- | --- | --- |
| Source identity/link was inconsistent | Major · SRC | Review flagged a bad citation to the article “Proposal of a Diagnostic Pathway…” | **Resolved; reviewer confirms.** Corrected the author and citation to Calandrelli et al., *Diagnostics* 2023;13(3):475, DOI 10.3390/diagnostics13030475, PMID 36766580, PMCID PMC9914341. The linked article confirms this metadata. The initial reviewer’s suggestion that this is “Makino et al.” was incorrect. |
| Source cards and diagram labels were English-only | Moderate · LNG | Public sources rendered English across locales; SVG had English labels | **Resolved; reviewer confirms.** Source tags, titles, citations, and scope are now localized via DE/EN/FA values. SVG uses sequence abbreviations and neutral marks; alt text is localized. Focused SSR asserts localized source text in all three languages. |
| Posterior-fossa illustration could imply a defining site | Evidence concern · VIS | Hero showed one posterior-fossa location | **Resolved; reviewer confirms.** Lesson and localized alt text now say the posterior fossa is only one possible example location; no frequency or typical-location claim. Diagram is explicitly conceptual and not a patient scan or ATRT-specific pattern. The learning objective is reporting descriptors and diagnostic boundaries, not image recognition. |
| Focused SSR test did not execute | Blocker · ASM | Initial reviewer invocation omitted the TS/ESM loader and failed before assertions | **Resolved; reviewer confirms.** `node --import tsx scripts/test-atrt-gehirn-p44-ssr.mjs` passes. It covers the actual shared shell, locale/direction, source boundary, assessment and registrations. |
| Location statement could overstate differential value | Moderate · SRC | Reviewer cited the 43-patient Nowak et al. cohort, in which posterior-fossa midline/off-midline location was not subgroup-specific | **Resolved; reviewer confirms.** Wording now explicitly says location alone does not reliably separate ATRT and medulloblastoma; Nowak et al. 2018 is added to the ledger and source panel. |
| No live browser evidence | Blocker · UX | No browser view was available to independent reviewer | Remains unverified in this subagent environment. No claim is made about keyboard, narrow-screen, or visual page behavior. |

## Source audit and PDF boundary

Visual inspection of Gehirn.pdf physical p.44 / printed p.43 confirms only three panels labelled sagittal T1, axial FLAIR, and axial T1 C+. No ATRT label, imaging criteria, DWI/ADC, or spine images are present. The lesson does not treat the page as an ATRT case and does not reuse its images.

The corrected Calandrelli paper’s PubMed Central record confirms its title, authors, journal, year, DOI, PMID and PMCID. NCI PDQ supports the distinction between imaging differential and definitive diagnosis. Wu et al. supports overlap in its small retrospective single-centre cohort. Claims are framed as possible, variable findings and not as deterministic diagnostic criteria.

## Validation

- Focused SSR/registry test: **PASS** (DE/EN/FA, including RTL; exact `atrt` link, one MCQ/language, three cards, source localization, source and visual provenance).
- Global MCQ audit: **PASS** (799 questions and 18 cases per language; explanations validated).
- `git diff --check`: **PASS**, with line-ending warnings for unrelated files.
- SVG raster render and visual inspection: **PASS** for the diagram asset only.
- Live browser/keyboard/mobile UX: **NOT VERIFIED**.
- Independent follow-up re-review of corrections: **PASS** for corrections listed above.

## Gate summary (before follow-up reviewer response)

| Gate | Status | Reason |
| --- | --- | --- |
| SRC | PASS | Correct article metadata; location caveat supported and cited; source boundaries recorded. |
| EDU | PASS on initial review | Concise sequence, differential, and tissue-diagnosis limit; no treatment instruction. |
| VIS | PASS for declared reporting-only scope | No real scan is included; the lesson does not claim scan-recognition instruction. |
| LNG | PASS | Source metadata localized; diagram labels are language-neutral and alt text localized. |
| ASM | PASS | Focused SSR and registry test now executes and passes. |
| UX | BLOCKED | Live route layout and interaction evidence not inspected here. |
| REV | PASS | Independent reviewer confirmed current corrections and tests. |

The final independent review status is **SRC PASS, EDU PASS, VIS PASS for the narrowed reporting-only scope, LNG PASS, ASM PASS, REV PASS; UX BLOCKED** because live browser, keyboard, and mobile evidence was not obtained in this subagent environment. This review is not clinical specialist approval or publication approval.
