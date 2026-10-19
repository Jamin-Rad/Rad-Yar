# Primary CNS lymphoma: source/design/QA ledger

Date 2026-10-19. Worktree `.worktrees/pdf-lessons-main`. Route `/gehirn/tumoren/zns-lymphom`; exact existing ID `lymphom-zns`. Prior checkout inspection found neither a matching route nor a curriculum link. Mapper independently confirmed.

## Actual source and bounded plan before implementation

User-supplied `C:/Users/Drham/OneDrive/Desktop/Lerncore/Gehirn.pdf`, PDF48 / printed47: extracted text and complete page image inspected. Substantive PCNSL text and comparison table exist, but **no diagnostic image, rID or case attribution**. Adjacent PDF47 is a metastasis placeholder and PDF49 begins sellar topics; neither expands this lesson. Mapper independently inspected complete pages47–49.

Audience: radiology trainees with basic brain/MRI sequence knowledge. Base language German, DE/EN/FA equivalent semantic objects. Goals: combine typical location with solid-lesion diffusion/enhancement; distinguish lesion from surrounding edema; retain immune-status/overlap caveats when interpreting differentials.

Chapter plan: where to suspect PCNSL → combine MRI observations → avoid binary differential rules (embedded check) → four retrieval rules. Original conceptual brain/ventricular schematic teaches location and paired DWI/ADC reading; **never presented as a scan or proof of a patient's diagnosis**. Actual sequence-verified teaching case remains a visual evidence requirement.

No treatment, steroid/biopsy-management recommendation, ADC/rCBV cutoff, surveillance interval, formal diagnostic score or general lymphoma staging imported. Most PCNSL is DLBCL is source context, not an imaging histology diagnosis. Full systemic-versus-primary workup is outside the narrow imaging lesson.

## Primary source verification, access 2026-10-19

- **Mansour et al. 2014**, PMID25608570, full publisher text read: https://link.springer.com/article/10.1186/1470-7330-14-22 . Retrospective 21 immunocompetent biopsy-proven patients; diffusion/perfusion/MRS available only in subsets. Read methods/results/discussion and figure captions, not the actual source figure pixels. Supports typical location, variable conventional signal, cellularity-related restriction, possible low rCBV and nonspecific MRS pattern. No single imaging feature establishes PCNSL. Do not generalize all enhancement patterns or subset findings to every patient. The paper itself reports differing rCBV summaries in results/discussion; no exact value is imported.
- **Sutherland et al. 2012**, PMID22697326, PubMed abstract read: https://pubmed.ncbi.nlm.nih.gov/22697326/ . Retrospective original institutional image review of 30 immunocompetent cases despite PubMed's “Review” publication tag. Both homogeneous and heterogeneous enhancement occurred; T1/T2 signal varied. Full article not read.
- **Schroeder et al. 2006**, PMID16947010, PubMed abstract read: https://pubmed.ncbi.nlm.nih.gov/16947010/ . Retrospective 36-patient toxoplasmosis/lymphoma comparison; broad ADC overlap, including different lesions within one patient. Supports rejecting the PDF's binary toxoplasmosis diffusion rule. No numerical threshold imported.
- **Jittapiromsak et al.**, online2025 / issue2026, PMID40550219, publisher abstract read: https://journals.sagepub.com/doi/10.1177/19714009251354883 . Selected ring-enhancing lesion study treats diffusion/ADC as adjuncts, not histology. Full article inaccessible; no cutoff/SWI extension imported.

PMC full-page requests returned recaptcha; Mansour full text was obtained from the actual open publisher page instead. Schroeder/Sutherland/recent ring study remain abstract-level verification, not falsely described as full-text review. Publication date and access date are separate.

## Coverage/conflict ledger

| ID | Source PDF48 / printed47 | Importance | Destination | Disposition / primary check |
| --- | --- | --- | --- | --- |
| PC-01 | Usually DLBCL | essential context | `location` | Included as usual histology, no MRI proof claim. |
| PC-02 | Immune suppression HIV/transplant and EBV | essential caveat | `location`, `differentials` | Included risk/context, not “all EBV” or “only immunosuppressed”. Mansour discussion distinguishes populations. |
| PC-03 | 60% solitary; often multiple with immune suppression | optional unverified denominator | `location` | Solitary/multiple both possible; fixed60% omitted with this rationale because source lacks denominator/date. No disease exclusion by number. |
| PC-04 | Periventricular/callosal/basal ganglia | essential | `location`, original schematic, MCQ1/card1 | Included as clues; callosal butterfly not disease-specific. Mansour full text supports locations and atypical sites. |
| PC-05 | T1 low; T2/FLAIR iso-low due cellularity | essential with variability | `pattern` | Broadened to often iso-low relative to gray matter; not universal. Distinguish solid lesion from surrounding hyperintense edema. Primary cohorts demonstrate variability. |
| PC-06 | DWI restriction / low ADC | essential | `pattern`, MCQ1/card1 | Paired interpretation in solid tissue, cellularity clue not sole diagnosis. No numerical threshold or protocol invented. |
| PC-07 | Homogeneous enhancement immune competent, ring immune suppressed | essential caveat | `pattern`, `differentials` | Typical trend, not categorical. Source/primary cohort variability retained; neither pattern alone proves immune status or tumor type. |
| PC-08 | Low–moderate rCBV prose vs “low” in table | optional adjunct | supplementary row in `pattern`, DD row | Internal source discrepancy recorded; relatively low/moderate perfusion as clue versus often more vascular GBM, no fixed boundary. No general metastasis-high rule. |
| PC-09 | High choline/low NAA/lipid peak | optional adjunct | supplementary row in `pattern` | Included as nonspecific MRS combination, not separator from all tumors (Mansour MRS subsection). |
| PC-10 | GBM row ring/high T2/variable diffusion/high rCBV | relevant differential | `differentials` | Comparative tendency only, overlaps acknowledged; no inferred GBM criteria/staging. |
| PC-11 | Metastasis row ring/multiple/high T2/usually no central restriction/high rCBV | relevant differential | `differentials` | Retain ring/multiplicity as nonspecific comparison; no absolute central diffusion or uniform perfusion classification. Different tumor components must not be collapsed into a rule. |
| PC-12 | Toxoplasmosis “no restriction” | essential conflict | warning, embedded check, MCQ2/card2 | Do **not** copy as exclusion test. Schroeder primary data show significant ADC overlap; immune context and complete evaluation required. |

## Visual plan/provenance and terminology

Original code-native graphic `public/educational/pcnsl-schematic.svg`; provenance JSON adjacent. Conceptual periventricular/callosal location, solid-region DWI/ADC pair. No copied scan, patient history, fabricated case/rID or claim of observed diagnostic findings. Source PDF contains no suitable frame to crop. Required actual postcontrast T1 and matching DWI/ADC recognition media remain pending; optional immune-suppressed counterexample also pending.

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| PCNSL | primäres ZNS-Lymphom | primary CNS lymphoma | لنفوم اولیه سیستم عصبی مرکزی |
| Periventricular | periventrikulär | periventricular | اطراف‌بطنی |
| Solid lesion | solider Läsionsanteil | solid lesion component | جزء جامد ضایعه |
| Restricted diffusion | Diffusionsrestriktion | restricted diffusion | محدودیت انتشار |
| Immune status | Immunstatus | immune status | وضعیت ایمنی |

## Author checks actually performed

- `npx tsx scripts/check-pcnsl.mjs`: PASS, 61 localized semantic objects present; six MCQs and two cards globally registered; exact curriculum/in-progress/return link and language-ID mapping; four options, correct keys and every wrong-option feedback key; single Gehirn/tumor setup group; SVG/provenance presence and esbuild JSX transform.
- `npm run audit:mcq`: PASS, 626 questions and 18 cases per language at run time. This validates structure/IDs/feedback, not clinical truth.
- `git diff --check -- data/curriculum.js data/questions.js data/flashcards.js`: PASS (curriculum line-ending warning only).
- SVG rasterized with bundled Sharp and actual PNG inspected: complete conceptual brain, ventricular fields, highlight/number1 and paired DWI/ADC fields visible. This is asset-only verification, not runtime/hero-crop/mobile verification.
- No production build, authenticated route view, browser console/DOM/screenshots or runtime interaction obtained. No server started for this batch. Prior observed environment failures remain unresolved: missing bundled Chromium, Edge access errors inside sandbox, CUA IAB unavailable, loopback socket permission denied. These are prior environmental evidence, not a successful or route-specific browser check.

## QA state after independent review

`editorial_qa: independently_reviewed_draft_acceptance_blocked`; `scientific_review: pending`; `browser_qa: blocked`; `publication: not_requested`.
Separate independent source/artifact/translation/assessment reviewer completed review and independently reran scoped/global checks. SRC/EDU/ASM/REV PASS within declared/static scope; no demonstrated correction request. VIS/LNG-display/UX remain BLOCKED by evidence. See `pcnsl-independent-review.md` for inspected scope, sources, findings PC-VIS-001/PC-UX-002 and decision. Existing browser environment blockers are unchanged from the preceding batch; not new route observations. No browser/clinical release acceptance inferred. No stage/commit/push.

Required next evidence: independent re-reading of declared PDF/full primary/abstract sources, semantic parity and assessment checks; a genuine matching postcontrast T1/DWI/ADC teaching case with inspected frame and provenance (and an appropriately labelled immune-suppressed counterexample if available); real DE/EN/FA × 1440/390 × light/dark with320/760 sampling, hash/reload/chapter/read/self-check/practice return interactions, keyboard focus and permitted persistence. Final scientific approval remains Dr. Zia's separate status.
