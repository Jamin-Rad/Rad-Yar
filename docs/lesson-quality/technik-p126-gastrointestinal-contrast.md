# Technik.pdf p.126 — gastrointestinal positive contrast

## Scope and learning plan

- Source: `Technik.pdf`, physical PDF page 126, printed folio 125. The extracted text and full rendered page were inspected. The page is text-only; no diagnostic image, table, or unreadable/OCR-suspect passage is present.
- Existing route/section: `/technik/kontrastmittel/roentgen`, section `gastrointestinal`, title `Gastrointestinale Diagnostik`; topic ID `km-gastrointestinal`.
- No new chapter title is proposed. The existing section's purpose is to help learners choose enteral positive contrast by question and suspected leak, while distinguishing barium from ionic hyperosmolar and non-ionic low-/iso-osmolar iodinated agents.
- Visual plan: a code-authored conceptual SVG shows barium coating and gas distension as sequential mechanisms. It is not diagnostic evidence; localized alt text provides the teaching point in DE/EN/FA.

## Source coverage ledger

| Source point | Importance | Lesson location | Disposition and verification |
| --- | --- | --- | --- |
| Barium is administered orally/rectally, essentially not absorbed, and excreted unchanged | Core | `gastrointestinal` / Barium sulphate card | Retained and clarified to “essentially”/“unchanged,” matching ACR and ESUR. |
| Positive barium coats mucosa; gas/air or a neutral distending solution expands the lumen for double-contrast views | Core | `gastrointestinal` / Double contrast card | Retained; methylcellulose called a neutral distending solution rather than “negative contrast.” |
| Double contrast displays mucosal relief (e.g. small polyps/erosions) and is now rarely used | Core plus practice context | `gastrointestinal` / Double contrast card | Teaching goal retained; absolute rarity changed to “more selective and less frequent than before,” consistent with declining but continuing indication-specific use. |
| Suspected perforation/anastomotic leak: barium leakage can cause peritoneal inflammation | Safety-critical | `gastrointestinal` / risk table and iodinated-agent callout | Retained with current ESUR complication terms (persistent inflammation, granuloma, adhesions, peritonitis). Water-soluble iodine is generally used first; selected follow-up barium can be considered after a negative iodine study if suspicion persists because small leaks may be missed. “No peritonitis” removed as overbroad. |
| Aspiration risk from barium | Safety-critical | `gastrointestinal` / risk table | Corrected: small-volume aspiration can cause symptoms (especially with underlying lung disease); delayed mucociliary clearance can leave retained material and contribute to inflammation. ESUR says small-volume aspiration is rarely life-threatening. Larger amounts can obstruct airways and cause pneumonia or respiratory failure. Removed “not cleared from lung” and the erroneous barium pulmonary-oedema attribution. |
| Ileus: PDF says barium draws water, thickens and worsens obstruction/constipation | Safety-relevant | `gastrointestinal` / risk table and iodinated-agent callout | Reframed without asserting an unverified osmotic mechanism: slow transit/constipation may predispose to retained/inspissated barium and impaction. Diatrizoate's obstruction role is protocol-specific, not a general ileus treatment. |
| Water-soluble agent example Gastrografin; PDF says absorbed from peritoneum and hyperosmolar/laxative, possible therapeutic ileus effect | Core / safety-critical | `gastrointestinal` / iodinated-agent callout | Qualified: lower risk of barium-related peritonitis, not “no risk”; diatrizoate (Gastrografin) is ionic/high-osmolar, may draw fluid into bowel and cause hypovolemia; aspiration can cause serious pulmonary complications, though ESUR reports such complications extremely rarely. ESUR prefers non-ionic low-/iso-osmolar iodinated agents for oral use when suitable. Selected obstruction-protocol use is described as a prognostic test or therapeutic adjunct, not general therapy. |

## Clinical source check

Sources checked on 2026-10-22:

- ACR Committee on Drugs and Contrast Media, **ACR Manual on Contrast Media**, chapter “Gastrointestinal Contrast Media in Adults: Indications and Guidelines” (2024 update). ACR says barium remains useful/preferred in fluoroscopy for mucosal detail, especially double-contrast and swallowing studies; water-soluble iodine is generally preferred first when perforation is suspected, while selected follow-up barium may reveal small leaks missed by iodine. ACR describes high-volume barium aspiration as capable of acute respiratory distress/pneumonia and cautions against hyperosmolar ionic diatrizoate due to fluid shifts. [Official ACR manual page](https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual) · [ACR-hosted manual PDF](https://www.acr.org/-/media/ACR/files/clinical-resources/contrast_media.pdf)
- Sebastià C, et al. **Safety of positive gastrointestinal contrast media. Updated guidelines by the ESUR Contrast Media Safety Committee.** *European Radiology*. 2026;36:6007–6013. doi:10.1007/s00330-026-12399-6. ESUR prefers non-ionic low-/iso-osmolar iodine for oral use when suitable; advises avoiding ionic high-osmolar iodine in fluid/electrolyte imbalance if possible; reports pulmonary complications after aspiration of ionic high-osmolar iodine as extremely rare; notes small-volume barium aspiration is rarely life-threatening, while intraperitoneal leakage can cause inflammatory reaction, granuloma and adhesions. [Full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC13282205/) · [DOI](https://doi.org/10.1007/s00330-026-12399-6)
- DailyMed/FDA, **Gastrografin (diatrizoate meglumine and diatrizoate sodium) prescribing information**. The product label warns that hypertonic solutions can cause intestinal fluid shifts, hypovolemia/hypotension, and aspiration can cause pulmonary edema, pneumonitis or death; it calls for minimizing aspiration risk and verifying gastric tube position. This product-specific label is not generalized to every water-soluble iodine agent. [Official label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8c2340e4-2b42-45dc-8fac-9960e8172547)

## Translations and assessment

- Updated DE/EN/FA in `data/contrastLessons.js`; semantic checks include negation, relative risk, rarity, agent type, route, fluid shifts and protocol dependence.
- Added one localized in-section self-check with immediate explanatory feedback on suspected leak and agent-specific aspiration/fluid risk.
- Updated both linked `km-gastrointestinal` MCQs and their generated flashcards with source-linked, language-specific explanations: one explains leak-choice sequencing and the other separates Gastrografin label outcomes from ESUR’s frequency statement. Verified DE/EN/FA mappings.
- Added `public/educational/contrast-media/double-contrast-schematic.svg`, an original, non-diagnostic teaching schematic with language-neutral numbered steps and localized alt text. No external image/media claim is introduced.

## Validation and review status

- Source text extraction and rendered p.126 inspected.
- `npm run test:technik-roentgen-sync`: passed (source-linked topic IDs, DE/EN/FA checks, cards and visuals).
- `npm run audit:mcq`: passed (723 questions and 18 cases per language).
- Focused DE/EN/FA claims and linked MCQ mapping assertion: passed; `git diff --check`: passed, with the existing matrix LF-to-CRLF warning only.
- Independent review: final focused delta review PASS for SRC, EDU, VIS, LNG, ASM and REV; no open content findings. Reviewer verified the current files and SVG in this worktree but could not reopen the PDF because it is not present there. The page had been extracted and visually inspected earlier in this batch. Reviewer inspected the SVG source but could not verify a rendered lesson layout.
- Production build attempted in the active worktree and blocked: `fonts.googleapis.com` DNS `ENOTFOUND`, followed by Next.js `EPERM` creating `.next/server/app/gehirn/tumoren/meningeom`. Next also warned that the primary checkout’s lockfile was selected as workspace root. This is an environment/build blocker, not a confirmed p126 source compile error.
- Browser QA blocked: the CUA browser inventory returned no available browser; local HTTP access to the dev server was denied by socket permissions. No rendered desktop/mobile or RTL interaction evidence is available; the independent reviewer also could not inspect a rendered route.
- Scientific approval by Dr. Zia: pending. Publication: not requested.
