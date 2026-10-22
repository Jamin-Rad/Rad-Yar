# Technik.pdf p.123 — adverse reactions to iodinated contrast

**Audit date:** 22 October 2026  
**Route/topic:** `/technik/kontrastmittel/roentgen`, existing section `reaktionen`, assessment topic `km-jod-reaktionen`  
**Scope:** physical PDF page 123 (printed folio 122) only. Physical p.122 and pp.124–125 are outside this audit. No new route or chapter was created.

**Source evidence:** `C:/Users/Drham/OneDrive/Desktop/Lerncore/Technik.pdf`; extracted page text and page image `tmp/technik123-123.png` inspected.

## Learning outline and visual plan

Keep the existing chapter title **“Nebenwirkungen jodhaltiger Kontrastmittel”**. Its purpose is to help learners distinguish predictable physiologic effects from hypersensitivity, recognize severity without conflating grading systems, and understand the current approach after a prior reaction. Retain the existing two-card comparison, short severity table, prior-reaction paragraph, and key callout; add one short retrieval check with explanatory feedback. The PDF page has no diagnostic image. The shared Röntgen-Kontrastmittel route uses a purpose-built, non-diagnostic SVG schematic of differential X-ray attenuation by iodine; it does not depict a patient or claim a clinical finding.

## Source coverage ledger

| Source point | PDF source | Importance | Lesson/assessment location | Status and reconciliation |
| --- | --- | --- | --- | --- |
| Chemotoxic effects are direct and include warmth, nausea/vomiting, vasovagal symptoms, arrhythmia and seizure | `Technik.pdf`, physical p.123 / printed p.122; page image inspected | Essential | `reaktionen`, physiologic card | All source examples are included under predictable physiologic effects. The PDF's “chemotoxic” label is preserved parenthetically. |
| Allergic-like reactions resemble allergy; source says they are not IgE-mediated and attributes them to mast-cell/histamine release | Same page; image inspected | Essential, with conflict | `reaktionen`, hypersensitivity card | Corrected: mechanisms are heterogeneous; IgE-mediated and non-IgE-mediated pathways both occur. Absolute source statement is not repeated. |
| Source severity grades 1–4 and associated symptoms; grade 3 is assigned a 0.01–0.04% frequency | Same page; image inspected | Essential | `reaktionen`, severity table | Replaced by the ACR mild/moderate/severe framework, with representative allergic-like findings. The four-grade scheme and denominator-free frequency are not mapped one-to-one onto the ACR scale or presented as current rates. The table is labelled ACR and notes that progression/associated signs matter. |
| Prior reaction: consider an alternative exam; change the agent if contrast remains necessary | Same page; image inspected | Essential | `reaktionen`, prior-reaction paragraph; existing prior-reaction MCQ/card | Retained and qualified: identify the culprit, select an appropriate alternative, and seek allergy-specialist evaluation after moderate/severe reactions. |
| Park et al. 2018 same-agent 31% vs agent-change 12% recurrence | Same page; image inspected | Supporting | Not retained as a generalized lesson statistic | Source-specific figures are omitted because the PDF gives no context/denominator and they should not be taught as universal recurrence rates. Current ESUR guidance supports agent change, preferably informed by allergy evaluation. |
| H1/H2 blockers and corticosteroid premedication, including 8–24% recurrence and ESUR v9.0 | Same page; image inspected | Essential, outdated guidance | `reaktionen`, prior-reaction paragraph | Reconciled with 2025 ESUR: no routine premedication; agent change/allergy workup are preferred. Emergency use and ACR guidance may differ, so the learner is directed to local policy. No recurrence percentage retained. |
| “Iodine allergy” terminology | Same page; image inspected | Supporting safety concept | `reaktionen`, key callout | Clarified: hypersensitivity is not directed against the iodine atom; document the specific contrast medium and reaction. |
| Distinguish a likely physiologic symptom pair from hypersensitivity and avoid diagnosing solely by one symptom | Source categories and examples on same page; page image inspected | Essential learning decision | `reaktionen`, localized self-check | Added a three-option, in-section check. Feedback explains that warmth/mild nausea fit physiologic response more closely while symptoms, progression and vital signs still require clinical assessment. |

## Source reconciliation

- van der Molen AJ et al. **Hypersensitivity reactions to contrast media: Part 1. Management of immediate and non-immediate hypersensitivity reactions in adults. Updated guidelines by the ESUR Contrast Media Safety Committee.** *European Radiology*. 2025;35:6798–6810. [doi:10.1007/s00330-025-11675-1](https://doi.org/10.1007/s00330-025-11675-1) · [PubMed](https://pubmed.ncbi.nlm.nih.gov/40425758/) · [open full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC12559081/). Supports heterogeneous IgE and non-IgE pathways and the allergic-like/hypersensitivity terminology.
- van der Molen AJ et al. **Hypersensitivity reactions to contrast media: Part 2. Prevention of recurrent hypersensitivity reactions in adults. Updated guidelines by the ESUR Contrast Media Safety Committee.** *European Radiology*. 2025;35:6811–6825. [doi:10.1007/s00330-025-11676-0](https://doi.org/10.1007/s00330-025-11676-0) · [open full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC12559128/). Supports allergy-specialist referral after moderate/severe events and selecting an alternative agent based on allergy evaluation; this strategy is more effective than premedication. Routine premedication is not recommended; emergency situations may warrant a locally governed exception.
- American College of Radiology. [Manual on Contrast Media](https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual), online 2026 edition, especially “Allergic-Like and Physiologic Reactions to Intravascular Iodinated Contrast Media” and Table 1. The online edition's version history lists the reaction chapter as last updated in 2013. It supports the three-level ACR severity framework, physiologic versus allergic-like categories, and consideration of corticosteroid premedication in selected prior allergic-like reactions. This differs from the 2025 ESUR routine approach; the lesson explicitly preserves that guideline difference rather than declaring one universal regimen.

## Assessment, language, design, and access evidence

- One MCQ was added for the source's core distinction. The generated flashcard uses the same seed. Both use question-specific feedback/explanation in DE/EN/FA.
- No diagnostic or externally sourced image is used. `public/educational/xray-contrast-attenuation.svg` is an original code-authored conceptual graphic; its localized alt text, visible localized legend identifying the soft-tissue and iodine paths, and caption live in `ContrastGroupPage.jsx`. It uses no patient data or external asset.
- Focused automated parity checks passed: each DE/EN/FA reaction question has four options and a valid key; each generated card has localized front, answer and explanation. The edited mechanism/severity/recommendation caveats and the self-check prompt/options/feedback are translated in all three language values.
- Independent review of this delta is pending. The browser rendering has not been checked because CUA exposed no browser or app surfaces; localhost was not available to this session. `npm run build` did not complete: Google Fonts DNS lookup failed and Next.js then reported `EPERM` while creating `.next/types/app/fatima/login`. No clinical specialist approval or publication approval is inferred from this audit.

## Mapping correction

The earlier batch instruction incorrectly described physical PDF p.123 (printed folio 122) as the renal/PC-AKI page. The actual page image shows **“Nebenwirkungen jodhaltiger KM”** and is mapped here to `reaktionen`. This ledger does not audit adjacent p.124 or p.125; their renal mapping must be checked against their own page images before implementation.
