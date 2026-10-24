# Cystic fibrosis — bounded source supplement and plan

Route `/thorax/mukoviszidose`; topic `mukoviszidose`; fach `thorax`; chapter `thorax-atemwege`. Authoring source language German; DE/EN/FA required.

Thorax.pdf physical p44 / printed43 inspected as extracted text and full-page image on 2026-10-24. It contains only the heading “Zystische Fibrose (Mukoviszidose)” and an empty marker. No clinical content or images are attributed to this page. Parent batch inventory: thorax-pdf-completion-ledger.md.

Audience: radiology learners with basic airway CT knowledge. Objectives: identify bronchiectasis and mucus plugging; distinguish image-recognition from etiologic diagnosis; recognize the limits of static mosaic attenuation; choose a question-driven rather than automatic CT follow-up approach.

## Exact planned chapters

1. **Das Atemwegsmuster erkennen** — introduce CFTR-related mucus disease and its key thoracic imaging components without repeating the entire bronchiectasis lesson.
2. **Bronchien und Sekret im CT unterscheiden** — inspect an actual advanced CF case in axial and coronal lung windows; distinguish air-filled dilatation and mucus-filled branching airways, and limit inferences from a static frame.
3. **Diagnose und Verlauf gezielt einordnen** — clinical/CFTR confirmation, contextual comparison and proportionate imaging; two short retrieval checks plus three practical takeaways within relevant chapters.

## Coverage and scientific evidence

| Claim | Source | Status / placement |
|---|---|---|
| Topic exists in source batch | Thorax.pdf p44 / printed43 | Included; source heading only |
| Bronchiectasis, mucus plugging, tree-in-bud and mosaic attenuation; upper predominance is not mandatory or specific | Yang et al. KJR2017;18:260–267, doi:10.3348/kjr.2017.18.1.260 | Explicit supplement, chapters1–2. Original small cohort: do not generalize its proportions or imply CT diagnoses CF. |
| Diagnosis requires appropriate clinical context plus evidence of CFTR dysfunction, including sweat testing/genetic workup | Cystic Fibrosis Foundation, CF Diagnosis Clinical Care Guidelines (2017; reviewed July2025, no update needed) | Explicit supplement, chapter3; no threshold or screening algorithm needed for bounded radiology lesson |
| Individual CT justification, dose minimization, no systematic one-size-fits-all schedule | Fayon et al. Respir Med2025;241:108076, doi:10.1016/j.rmed.2025.108076 | Explicit supplement, chapter3; avoid fixed scan intervals or universal dose prescription |
| Mosaic attenuation versus expiratory air trapping | Fleischner Society glossary2024, doi:10.1148/radiol.232558, Air Trapping and Mosaic Attenuation entries | Explicit supplement, chapter2/check1; mosaic attenuation is an inspiratory descriptor, air trapping requires expiratory assessment |

Primary sources read: https://www.kjronline.org/DOIx.php?id=10.3348/kjr.2017.18.1.260 ; https://www.cff.org/medical-professionals/cf-diagnosis-clinical-care-guidelines ; https://www.sciencedirect.com/science/article/pii/S0954611125001386 .

## Media plan and inspected case

- Header: original generated conceptual airway illustration, explicitly not a diagnostic CT; prompt/provenance stored with asset.
- Actual Radiopaedia case https://radiopaedia.org/cases/13187 redirects to cystic-fibrosis-6. Contributor Alexandra Stanislavsky; 25-year-old woman; preoperative examination shortly before bilateral transplantation; diagnosis labelled “almost certain”. Explicitly label as advanced disease, not an early/typical-severity example.
- CT study13204, axial lung window current image802091 (512×488) and selected coronal lung window image802000 (476×485); DOM image URLs read from the displayed case and originals downloaded without editing. Both visually inspected. Shows conspicuous bilateral bronchiectasis and branching mucus-filled airways. Do not infer an organism, acute exacerbation, or expiratory air trapping from these frames. Axial/coronal are one study, not before/after.
- Contributor, rID, study and full original image URLs recorded in public/educational/thorax-cf/provenance.md. User explicitly authorized Radiopaedia reuse including subscription access; no extra permissions inferred from source pages. KJR figures are NOT reused (CC BY-NC not covered by Radiopaedia permission).
- Existing `/thorax/bronchiektasen` linked for morphology detail. No decorative analogy or invented diagnostic scan.

## Terms and checks

Bronchiektasen / bronchiectasis / برونشکتازی; Schleimpfropf / mucus plug / پلاگ مخاطی; Mosaikmuster / mosaic attenuation / نمای موزائیکی; Luftfalle / air trapping / حبس هوا. Preserve “often, not required”, “not specific”, and the limits of a static inspiratory view in all three languages. Two MCQs and two flashcards share the inline check data: CT cannot establish CF etiology; mosaic attenuation alone does not prove expiratory air trapping or a pathogen.

Independent review, real-route browser checks, scientific approval and publication remain pending at planning time. Parent owns registries and release.

Author verification 2026-10-24: `node scripts/test-thorax-cf-ssr.mjs` passes DE/EN/FA shared-shell rendering, one initial open chapter, direction, actual image references, topic-specific Thorax quiz/cards paths, four options and distinct explanatory feedback, translated cards, and inherited navigation/access/footer checks. Both inline checks have language-specific keys so switching language resets selections. Original diagnostic images open by clicking their figures. Browser UI and independent review remain pending; these tests do not imply scientific acceptance.
