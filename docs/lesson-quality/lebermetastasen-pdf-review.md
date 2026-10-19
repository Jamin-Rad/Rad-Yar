# Lebermetastasen — source and QA ledger

## Scope and teaching plan

- PDF: `Abdomen.pdf`, PDF pp. 24–25 (printed pp. 23–24); exact curriculum ID `lebermetastasen`; route `/abdomen/leber/metastasen`.
- Audience/outcome: radiology learners should distinguish the source's broad hypo-/hypervascular phase patterns and produce a concise, phase-aware lesion description without assigning a primary tumour from enhancement alone.
- Chapters: (1) compare relative conspicuity across early arterial, portal venous and delayed phases; (2) compare hypo- and hypervascular patterns; (3) describe number, distribution, morphology and necrosis; self-check and take-home are embedded in `LessonReferenceShell`.
- Visual plan: a code-native schematic compares the two qualitative time courses. It is explanatory, not a diagnostic image. Source CT case on PDF p.24 was visually inspected but not copied into this draft.
- Language baseline: German; English and Persian versions were drafted and aligned by semantic units (phase order, solitary-lesion caveat, pattern-not-primary principle, and caveat on diffusion restriction).

## Source coverage ledger

| ID | Source/page | Source point | Importance | Lesson location | Status / note |
|---|---|---|---|---|---|
| LM-01 | Abdomen.pdf p.24 (printed 23) | Metastases can be solitary or multiple; a solitary lesion does not exclude metastasis | Essential | Intro, description, self-check | Included; source statement transcribed semantically |
| LM-02 | Abdomen.pdf p.24 | PDF lists common primary-tumour examples, especially colorectal and pancreatic adenocarcinoma, plus stomach, breast, bronchial carcinoma, melanoma and sarcoma | Supporting | Caveat only | Not taught as deterministic associations; requires scientific review |
| LM-03 | Abdomen.pdf p.24 | CT native: usually hypodense, sometimes indistinct; central necrosis possible | Essential | Hypovascular/morphology | Included with cautious wording |
| LM-04 | Abdomen.pdf p.24 | MRI T1 hypointense; T2 variable/slightly hyperintense; source calls DWI restriction typical | Supporting | Caveat | T1/T2 omitted from core to keep CT phase objective focused; DWI claim flagged for independent verification, not presented as an obligatory criterion |
| LM-05 | Abdomen.pdf p.24 | Hypovascular pattern: little/minimal early arterial enhancement; lesion remains conspicuously hypoattenuating/hypointense in portal venous phase; possible subtle heterogeneous peripheral enhancement; no central delayed enhancement described | Essential | Hypovascular section + schematic | Included; use of “no central enhancement described” avoids turning source description into universal exclusion rule |
| LM-06 | Abdomen.pdf p.25 (printed 24) | Hypervascular examples listed; strong early arterial enhancement followed often by rapid wash-out in portal venous/delayed phases | Essential | Hypervascular section + schematic | Included; source examples are explicitly not treated as specific assignment rules |
| LM-07 | Abdomen.pdf pp.24–25 | Phase comparison is central to the lesson | Essential | Diagram and self-check | Included in code-native schematic; curve is qualitative, not quantitative |

## Scientific references and open questions

- The ACR 2025 document `https://acsearch.acr.org/docs/3195870/Narrative` was surfaced for colorectal cancer imaging and search-result text notes MRI detection of liver metastases; direct fetch returned 403 in this session. It was not used to validate a detailed claim.
- ESGAR consensus: N. A. M. Schima et al., “ESGAR consensus statement on liver MR imaging and clinical use of liver-specific contrast agents,” *European Radiology* (2016), https://doi.org/10.1007/s00330-015-3900-3. Its recommendation summary states that hepatobiliary phase plus DWI can improve detection, particularly for small metastases. This is consensus guidance, not primary diagnostic-accuracy evidence for the PDF's universal DWI wording.
- Source-to-guideline reconciliation and current scientific review of the primary-tumour examples, phase patterns, and DWI/ADC statement remain open. No clinical correctness or release approval is claimed.

## QA state

- SRC: REVISE — pp.24–25 visually inspected and all lesson-relevant points above are dispositioned; exact clinical claims await independent scientific review.
- EDU: self-review only — concise sequence, one central phase-comparison schematic, and a decision self-check are present; independent teaching review pending.
- VIS: self-review only — schematic is original code-native art; actual source CT case inspected but not used; responsive/rendered inspection pending.
- LNG: self-review only — DE/EN/FA semantic units aligned in source, but language-by-language rendered and RTL checks pending.
- ASM: local self-check included; no global question or flashcard registry entry was added in this scoped task.
- UX: BLOCKED — browser evidence was not captured.
- REV: pending independent reviewer.
- Build: not run because the shared worktree may have concurrent `.next` activity; static checks only.

## Attribution / rights

The source page images were inspected from the user-provided `Abdomen.pdf`. No diagnostic image was copied. The schematic was authored in the route code and is labelled as non-patient teaching art.
