# Dosisgrößen und Dosimetrie · Technik.pdf, PDF pp. 5–8

Status: author draft, independent review requested. This bounded lesson is linked as
`inProgress`; it is not clinical, scientific-specialist, browser or release approval.

## Learning promise and outline

Learners distinguish (1) absorbed dose, (2) radiation-weighted organ equivalent
dose, (3) reference-model effective dose, and (4) CT/projection imaging output
indices. They can explain why CTDIvol and DLP do not directly give an individual
organ dose, and use the definition DLP = CTDIvol × scan length in a constrained
retrieval question.

1. Start with the question each quantity can answer.
2. Separate physical energy deposition (Gy) from weighted protection quantities (Sv).
3. Read CTDIvol, DLP and KAP/DFP as output/documentation quantities with limits.
4. Retrieve the consequence of a changed scan length without inferring individual risk.

## Source coverage ledger

| ID | Source | Source point | Importance | Disposition |
|---|---|---|---|---|
| D-01 | Technik.pdf, PDF p.5 / printed p.4 | Absorbed dose is energy per mass, Gy; physical quantity | Core | Included in `protection-quantities`; terminology refined to absorbed dose and mean deposited energy per mass. |
| D-02 | Technik.pdf, PDF p.5 / printed p.4 | Equivalent dose weights organ/tissue averaged absorbed dose by radiation type; Sv | Core | Included separately from effective dose; organ/tissue must be named. ICRP 103 used for exact definition. |
| D-03 | Technik.pdf, PDF p.5 / printed p.4 | Organ dose and radiation weighting examples | Core | The lesson explains H_T conceptually. Numerical weighting factors and examples are deliberately omitted; the PDF's examples are unnecessary for the learning objective and would require expanded validation. |
| D-04 | Technik.pdf, PDF pp.5–6 / printed pp.4–5 | Effective dose is a weighted sum across tissues and supports broad comparisons | Core | Included with explicit reference-model limitation. Individual risk/prognostic interpretation is qualified using ICRP 147. |
| D-05 | Technik.pdf, PDF p.6 / printed p.5 | CT effective-dose estimate from DLP and conversion factors | Supporting / context-dependent | The estimate's existence is stated as model-dependent in prose; source-page numerical conversion factors and patient-specific inference are omitted. |
| D-06 | Technik.pdf, PDF p.7 / printed p.6 | Entrance/skin dose and KAP/DFP in projection imaging | Core subset | KAP/DAP/DFP included as an output/documentation quantity; entrance/skin dose definitions and measurement methods are deferred to a separate dosimetry lesson. |
| D-07 | Technik.pdf, PDF p.8 / printed p.7 | CTDIvol is a scanner quantity for protocol/volume and independent of scan length; DLP = CTDIvol × length | Core | Included; standardized phantom reference and individual-organ limitation made explicit per AAPM reports. Inline assessment tests the scan-length relationship and guards against patient-dose inference. |
| D-08 | Technik.pdf, PDF p.9 / printed p.8 | Personnel dosimeters and register number | Adjacent, excluded | Occupational monitoring is a separate learning objective and not mixed with patient imaging dose quantities. This page is not claimed covered. |
| D-09 | Technik.pdf, PDF p.6 / printed p.5 | Effective-dose comparison table (exam and background values) | Context-sensitive, excluded | Not reproduced: values are protocol/population/context dependent and not needed for the definitions objective. |

## Media and provenance

No diagnostic image is required to teach these abstract quantities. A code-native
concept map in the route separates energy per mass, radiation weighting and
reference tissue weighting. The required topic-specific `LessonHero` illustration
is the authored SVG `public/technik/dosimetrie/hero.svg`; it is explicitly
schematic and contains no patient data or measurement curve. The source pages 5
and 8 were visually inspected: p.5 separates absorbed/equivalent/organ/effective
dose; p.8 presents CTDI, CTDIvol and DLP. No PDF image is reproduced.

## Translation and terminology

Shared terms in DE/EN/FA: Energiedosis / absorbed dose / دوز جذب‌شده (Gy);
Äquivalentdosis / equivalent dose / دوز معادل (Sv); Organdosis / organ dose /
دوز اندامی; Effektivdosis / effective dose / دوز مؤثر; Scanlänge / scan length /
طول اسکن; Dosis-Längen-Produkt / dose-length product / محصول دوزـطول. DLP is
kept in Latin letters across languages. KAP/DAP and German DFP are retained as
aliases, with the expansion translated in the lesson.

## Sources and scientific limits

- IAEA Human Health Series No. 42, *Establishing and Improving Interventional
  Radiology* (2023), §5.2 (KAP/DFP definition; PDF p.53 / printed p.41):
  https://www-pub.iaea.org/MTCD/Publications/PDF/PUB1983_web.pdf
- ICRP Publication 103, *The 2007 Recommendations of the International Commission
  on Radiological Protection* (2007), definitions of absorbed, equivalent and
  effective dose: https://www.icrp.org/publication.asp?id=ICRP+Publication+103
- ICRP Publication 147, *Use of Dose Quantities in Radiological Protection*
  (2021), particularly when effective dose is or is not appropriate for an
  individual procedure: https://www.icrp.org/publication.asp?id=ICRP+Publication+147
- AAPM Report 96, CTDIvol/DLP and standardized reference phantom:
  https://www.aapm.org/pubs/reports/detail.asp?docid=97
- AAPM Report 246, limits of CTDI/DLP as surrogates for individual organ dose:
  https://www.aapm.org/pubs/reports/detail.asp?docid=190

## Verification

- `node scripts/test-technik-dosimetrie-render.mjs` — PASS (23 localized content units; route copy/props, language/RTL metadata, source links, assessment options, exact curriculum mapping and schematic metadata). The harness stubs `StandardLessonShell` and `LessonSection`; it does not verify the live shared-shell navigation or source-panel rendering.
- `git diff --check` — PASS after source citation correction.
- Independent bounded source/content/language/assessment review: PASS; the IAEA source title/scope and Persian absorbed-dose wording were corrected and rechecked.
- Browser interaction/responsive/RTL review and specialist signoff — pending.
