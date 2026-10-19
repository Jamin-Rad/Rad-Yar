# Meningioma — PDF45–46 revision source/design/QA ledger

2026-10-19. Supersedes the previous tracked draft's coverage/validation snapshot. Existing exact `meningeom` → `/gehirn/tumoren/meningeom` remains inProgress; separate `meningeom-spinal` untouched. Existing umbrella `/gehirn/tumoren/muster` has overlapping pattern content, not a new route or duplicate topic.

## Actual source and bounded revision plan before editing

Author and separate mapper read actual Gehirn.pdf PDF45–46 / printed44–45 text and complete rendered page images. No patient images, caseID/rID or contributors on either page. No source diagnostic crop available. Prior code diagram placed the mass above dura and the cleft at its dural base; replace with anatomical conceptual order dura→mass→CSF cleft→displaced brain. Original source pages remain text evidence, not diagnostic media.

Audience radiology trainees. DE base; revised goals: explain the meaning of already-reported extra-axial descriptors; interpret supplied CT/MRI and bone descriptors; avoid interpreting dural tail, edema or diffusion as proof of invasion/WHO grade. Four chapters: meaning of extra-axial location → reported CT/MRI descriptors → inference limits and report-based self-check → four retrieval rules. This is a terminology/report-reasoning module, not a diagnostic image-recognition exercise. Supplemental MRS/perfusion caveats only, no treatment or numeric imaging classifier. Real contrast MRI/brain-interface and CT bone-window cases remain unresolved for any future image-recognition goal; no artificial scans.

## Primary sources actually read (access2026-10-19; publication separate)

- Wen et al.2014, PMID25238986, DOI10.1007/s00701-014-2216-4, https://pubmed.ncbi.nlm.nih.gov/25238986/ . Full primary abstract methods/results read:36 MRI-tail patients/18 controls with pathology/IHC; invasion occurs in some tails, not all. No cohort percentage or surgical recommendation imported. Supports rejecting both “tail proves invasion” and “tail is always reactive”.
- Schwyzer et al.2015, PMID26410100, DOI10.1016/j.neurad.2015.06.002, https://pubmed.ncbi.nlm.nih.gov/26410100/ . Full primary abstract read:36 patients,21 tissue-graded; susceptibility-related ADC changes and overlap of grades1/2. No ADC cutoff or risk algorithm imported.
- Goyal et al.2012, PMID22406780, DOI10.4103/0028-3886.93589, https://pubmed.ncbi.nlm.nih.gov/22406780/ . Indexed primary abstract read; direct body sparse. Prospective40-patient CT/pathology study: hyperostosis and sampled bone invasion not equivalent; no surgical guidance transferred.
- Majós et al.2003, PMID12684713, DOI10.1007/s00234-002-0933-5, https://pubmed.ncbi.nlm.nih.gov/12684713/ . Indexed original37-meningioma/93-other-neoplasm abstract read. Alanine/choline and low N-acetyl compounds are possible supporting spectra, not invariant proof.
- Original spectroscopy study2008, PMID18641997, https://pubmed.ncbi.nlm.nih.gov/18641997/ . Indexed primary abstract read: alanine/lactate overlap and N-acetyl compounds may occur; correct “no NAA” blanket wording. Full article not read.
- Original perfusion study2016, PMID27208870, https://pubmed.ncbi.nlm.nih.gov/27208870/ . Indexed original39-operated-patient abstract methods/results read: perfusion/diffusion associations; no universal rCBV grading threshold transferred.
- Louis et al.2021 WHO authors' classification summary, DOI10.1093/neuonc/noab106, https://pmc.ncbi.nlm.nih.gov/articles/PMC8328013/ . Previously accessed indexed original relevant meningioma classification passages; used only for tissue/molecular grading framework, no mutation criterion taught. Earlier draft's EANO/Watts/cIMPACT references are historical; no claim that all their fulltexts were newly verified.

## Source coverage / conflicts

|ID|Page|Source point|Disposition|
|---|---|---|---|
|MN01|45|Arachnoidal/meningothelial origin|Essential short definition in location intro|
|MN02|45|Grade80/18/2%|Optional unverified population-specific distribution deferred; no grade-from-image inference|
|MN03|45|35% primaryCNS,sex2:1,age40–70|Optional unsourced ranking/estimates deferred individually; not imaging criteria|
|MN04|45|Multiple/NF2|Optional separate hereditary-topic detail deferred pending currentNF2 terminology verification|
|MN05|45|Ionizing radiation|Optional risk epidemiology deferred; no risk counselling in this imaging lesson|
|MN06|45|Estrogen/progesterone|Optional complex hormone/medication association deferred; no blanket causal claim|
|MN07|45|Falx/parasagittal/convexity/skullbase/CPA/tentorium/foramenmagnum|Location paragraph; no most-common ranking asserted; CPA vestibularschwannoma differential as source orientation, not algorithm|
|MN08|45|Rare intraventricular/trigone;spinal/thoracic|Supplemental location context; no separate spinal-topic coverage or prevalence claim|
|MN09|45|CT oftenhyperdense/wellcircumscribed/extraaxial|Essential CTtable, no70%|
|MN10|45|Calcification20–25%|CTtable qualitative, numericfraction deferred|
|MN11|45|Hyperostosis pathognomonic|Corrected: supportive clue, neither histology nor invasion proven; Goyal primaryCT/pathology|
|MN12|45|Avidhomogeneousenhancement;lyticaggressive|Essential table; variable patterns, lysis not WHOgrading|
|MN13|46|T1iso-low/T2iso-high|MainMRItable; relativegraymatter reference retained|
|MN14|46|FibroblasticlowT2|Optional histologic-subtype association deferred; no subtype diagnosis fromT2|
|MN15|46|Avid enhancement/tail60–70%|Tail defined and nonspecific; frequency deferred|
|MN16|46|Tailmostlyreactive/notnecessarilyinvasion|Corrected to reactivity OR infiltration possible; no frequencyclaim, Wen primary|
|MN17|46|Variableedema/secretorysubtype|Maintableedema; optionalsubtypeassociation deferred|
|MN18|46|Usuallynorestriction;restriction→atypical/anaplastic|Replace deterministicarrow with explicit grade1/2 ADC overlap in Schwyzer study, not overlap across all grades; restriction alone does not assign grade|
|MN19|46|Alanine1.5ppm/choline↑/noNAA|Supplemental qualitative spectra with caveat: neither mandatoryalanine nor invariant N-acetylabsence; no numericpeak classifier|
|MN20|46|DSChighrCBV|Supplemental hypervascular-pattern clue, not histology/grade; no threshold|
|MN21|46|CSFcleft/white-matterbuckling/broadduralbase|Meaning of already-reported location descriptors and corrected conceptualdiagram; none provehistology; independent localization on patient images is not trained/tested|

## Terminology

|Concept|DE|EN|FA|
|---|---|---|---|
|Extraaxial|extraaxial|extra-axial|خارج‌محوری|
|CSFcleft|Liquorspalt am Tumor-Hirn-Übergang|CSF cleft at tumour–brain interface|شکاف مایع مغزی‌نخاعی میان تومور و مغز|
|Tail|Dural Tail|dural tail|دم دورال|
|Restriction|Diffusionsrestriktion|restricted diffusion|محدودیت انتشار|
|Invasion|Infiltration|invasion|نفوذ|

`editorial_qa: in_progress`;`scientific_review: pending`;`browser_qa: blocked`;`publication: not_requested`. Source-based revised draft, not release acceptance. No stage/commit/push.


Additional primary source: Ahmadi et al.1994, PMID7800128, https://pubmed.ncbi.nlm.nih.gov/7800128/ . Indexed original abstract methods/results inspected; direct PubMed body sparse. Prospective73-patient MRI/surgical-pathology series including non-meningioma neoplasms and nonneoplastic disease supports nonspecific dural enhancement and limits of MRI invasion prediction. No enhancement-shape classifier or surgical recommendation imported.

## Author checks and review handoff

- `npx tsx scripts/check-meningeom.mjs`: PASS72 localized semantic units; exact meningeom route/inProgress, one shared brain-tumor group,6 global four-option MCQs with all option-specific feedback,2 cards, language-ID mapping/backlinks, actual page.jsx syntax, SVG/provenance. Explicit tail/invasion, ADC overlap and no-patient-images assertions included.
- `npm run audit:mcq`: PASS635 questions/18cases per language at this run, including concurrent work. Structural bank transfer check, not clinical proof.
- `git diff --check`: PASS with unrelated concurrent CRLF warnings only.
- Source45–46 actually viewed and independently mapped. New original SVG raster opened: mass now below dura and cleft below mass adjacent to displaced brain. No patient imaging, caseID, contributor, diagnostic sequence or observed feature invented. Real contrast MRI/interface and CT bone-window media remain unresolved.
- Existing tracked route revised in place; exact curriculum item augmented with quiz/cards links, existing brain-tumour MCQ group merged, other concurrent registry entries preserved. Older lesson-only assessment replaced by integrated shared semantic questions. Separate spinal curriculum untouched.
- No production build, authenticated browser, DOM/console/screenshot/keyboard/RTL/mobile/theme interaction obtained. No dev server started. Prior environment blockers persist: missing bundledChromium, Edge headless sandbox access errors, CUA IAB unavailable, loopback socket permission denied. These are prior environment evidence, not newly observed route behavior. No gate bypass.

At author handoff: `editorial_qa: author_checked_independent_review_pending`;`scientific_review: pending`;`browser_qa: blocked`;`publication: not_requested`. Separate reviewer must inspect source/corrections, all three languages/assessments, corrected anatomical diagram and limits. No claim that passing build/static checks or existing curriculum link establishes clinical correctness. No stage/commit/push.


## Independent findings: author repair 2026-10-19, acceptance pending

- **MEN-SRC-01:** Narrowed diffusion prose and grade-question distractor feedback in DE/EN/FA to Schwyzer's actual grade1/grade2 ADC overlap. Removed the broader across-grades wording. The shared exports propagate this to all six global MCQs and two retrieval cards.
- **MEN-VIS:** Diagnostic image-recognition proficiency is removed from the current bounded lesson. Title, chapters, opening learner-visible scope, location text, pattern introduction, take-home and both assessment stems now teach interpreting **already-reported descriptors** and their inference limits. The visible scope explicitly says independent MRI/CT sign recognition is neither trained nor tested. The code-native anatomical diagram explains relationships; no diagnostic pixels were synthesized or represented as a case. Real MRI/CT cases remain unresolved for future image-recognition coverage; curriculum remains inProgress. This scope repair is not an assertion that the review finding has independently closed.
- Actual case-access attempts: indexed original rID7679 (Hani M. Al Salam,18Nov2009, DOI10.53347/rID-7679) and rID8574 (same contributor,13Feb2010, DOI10.53347/rID-8574) metadata were read. Direct7679 fetch returned402; NCCommons study8496 cache miss; local retrieval DNS11001. No pixels were available for actual feature/frame inspection. No patient asset, selected frame, license claim or diagnostic attribution was fabricated. Metadata-only candidates are kept in provenance as **unused**. User project-level source reuse authorization remains distinct from independent legal clearance.
- **Independent delta retest by `/root/author_thorax_ph` (read-only):** MEN-SRC-01 closed; all DE/EN/FA wording and question feedback now match the cited grade I/II ADC overlap. MEN-VIS resolved for the deliberately narrowed scope: route, prose and both assessments consistently address interpreting already-reported CT/MRI descriptors; they do not claim or test independent scan recognition. The SVG is explicitly conceptual and no patient image is represented. Exact curriculum/route/assessment integration and focused checker passed (73 localized semantic units, 2 MCQs per locale, 2 cards); `git diff --check` passed. No scientific or release approval implied.
- **Open limits:** real MRI/CT recognition examples remain a future coverage gap; browser/RTL/mobile/runtime evidence and scientific specialist review remain pending. The indexed Radiopaedia candidates rID7679 and rID8574 were not used because original pixels could not be accessed and inspected; no contributor/image attribution or rights claim was made. Curriculum remains `inProgress`.
