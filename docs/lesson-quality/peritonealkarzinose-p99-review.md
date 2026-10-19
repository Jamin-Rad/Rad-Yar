# Peritonealkarzinose — Abdomen.pdf p.99

Author plan, 2026-10-19. Independent review pending; exact curriculum ID `peritonealkarzinose` remains `inProgress`. No scientific/release approval. Shared worktree `.worktrees/pdf-lessons-main`; no new dev server or commit/push.

## Verified scope and outline before implementation

Maintained Abdomen/Thorax map identifies p99 as curriculum-only. Exact curriculum item in `abdomen-peritoneum` has CT tag and no lesson link; repository route/content search found no dedicated lesson or connected assessment for this ID. New route `/abdomen/peritoneum/peritonealkarzinose`. Panniculitis, prenatal exposure and meningioma routes are excluded from this batch.

Audience: radiology learners familiar with CT fat/fluid/soft tissue. Outcomes: locate omental tumour-like thickening, describe four source patterns, distinguish an imaging suspicion from primary-tumour/histological proof, and state the limits of a negative or apparently limited CT.

1. `Oberflächenbefall erkennen`: definition, common primary sites and nonspecific symptoms; early real source CT plus an observation task locating anterior omentum and fluid.
2. `Vier CT-Muster verbinden`: compact four-row comparison of plaques/nodules, omental cake, ascites and stellate mesentery. Each row has a meaning and limitation. No requirement that all signs coexist.
3. `Verdacht und Ausdehnung trennen`: one short differential/confirmation boundary, one source-supported staging limitation, an embedded reasoning question and three retrieval prompts. No PCI thresholds, surgery/HIPEC selection algorithm or treatment regimen.
Summary: three portable rules. Maintained shell/real LessonHero with translated alt, hash synchronization; no subtitle under title.

## Page coverage ledger

Actual PDF p99 / printed p98 rendered and inspected as a complete 1698×2400 page. Tiny original case footer separately rendered at 800 dpi: **rID162382** (six digits), not 16382 or 62382. All body text readable.

| ID | PDF point | Priority | Planned disposition |
|---|---|---|---|
| C01 | Tumour-cell deposits on peritoneum | essential | Chapter 1; peritoneal epithelial metastatic pattern, imaging alone not histology |
| C02 | Frequent primary tumours: ovary, stomach, colon | essential | Chapter 1; examples, not exclusive list or origin proved by an omental cake |
| C03 | Clinical: ascites, weight loss, ileus symptoms | essential | Chapter 1; possible nonspecific manifestations, not mandatory diagnostic criteria |
| C04 | Enhancing nodules/plaques on peritoneum or diaphragm | essential | CT table; visible focal or plaque-like deposits; small deposits can escape CT |
| C05 | Omental cake: greater omentum thickened by tumour, cake-like | essential | Early source CT, observation task and CT table; morphology not a primary-origin test |
| C06 | Ascites often present, often loculated | essential qualifier | Table: may be free or loculated; not required or sufficient. No unverified frequency taught |
| C07 | Stellate mesentery with fixed/retracted bowel loops | essential | Table: mesenteric distortion/tethering with converging strands and retracted loops; full examination needed to assess obstruction; single still does not demonstrate mobility |
| C08 | Actual annotated axial CT image with omental thickening and rID162382 | essential visual | Original PDF crop with orange arrow and English native label retained; all languages explain label. No unseen diaphragm nodules, stellate sign or full disease stage asserted from crop |
| C09 | Supplement: omental cake not specific for carcinomatosis or one primary | important boundary | Chapter 3, Liang et al. original comparative CT study; mesothelioma overlap, no broad unsupported differential list |
| C10 | Supplement: CT may underestimate extent, particularly small serosal/mesenteric disease | important boundary | Chapter 3 and question, current joint ESGAR/ESUR/PSOGI/EANM guidance in ovarian/colorectal cancer; primary prospective study supports burden underestimation. No numerical accuracy claim |

## Verification sources, checked 2026-10-19

- Vandecaveye V et al. *Imaging of peritoneal metastases of ovarian and colorectal cancer: joint recommendations of ESGAR, ESUR, PSOGI, and EANM*. European Radiology. 2025;35:2712–2722, online 2024. DOI 10.1007/s00330-024-11124-5. [Actual official full PDF opened](https://link.springer.com/content/pdf/10.1007/s00330-024-11124-5.pdf). PDF pp2–5 / printed2713–2716: statements2–4, CT initial assessment and small/mesenteric/serosal disease limitations, selected DWI-MRI role; statements11–13, structured distribution/critical-site reporting and multidisciplinary assessment. Moderate-quality evidence at best; applies to ovarian/colorectal patients, not a universal surgery rule. Broader protocol/scoring/treatment details deliberately outside this one-page PDF lesson.
- Liang YF et al. *CT differentiation of diffuse malignant peritoneal mesothelioma and peritoneal carcinomatosis*. J Gastroenterol Hepatol. 2016;31:709–715. DOI 10.1111/jgh.13260. [Original PubMed record](https://pubmed.ncbi.nlm.nih.gov/26645426/) indexed full abstract inspected; direct record returned a one-line inaccessible response, publisher returned unavailable. Original retrospective comparison of 48 DMPM and 47 PC; omental cake/ascites and bowel fixation overlap. Supports no histology/primary diagnosis from this sign; no comparative rates or diagnostic rule taught. Not a fresh full-text review.
- Chia CS et al. *Prospective Comparison of the Performance of MRI Versus CT in the Detection and Evaluation of Peritoneal Surface Malignancies*. Cancers. 2022;14:3179. DOI 10.3390/cancers14133179. [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC9264985/) indexed full text inspected; direct PMC CAPTCHA, MDPI429. Prospective36 surgical candidates, both modalities underestimated burden; selected cohort and evolving MRI protocols do not establish universal equivalence with current optimized DWI. No percentages or protocol claim included in lesson.

## Media plan and provenance limits

- Source CT: `public/abdomen/peritoneal-carcinomatosis/omental-cake.png`, crop from actual 1698×2400 PDF99 rendering with `pdftoppm -scale-to 2400`; x538/y1170/w620/h510. Retain complete source axial panel, native orange arrow/“Omental thickening” label and tiny footer rID162382. Modality/plane directly inspected; exact frame, contrast phase and full series unavailable. Contributor not named in supplied PDF; [original case URL](https://radiopaedia.org/cases/162382) returned unavailable/internal error; contributor-level metadata and terms unverified. No invented contributor or independent legal clearance. Project PDF/Radiopaedia use authorised in standard.md.
- Figure purpose: identify thickened anterior greater omentum and associated fluid in the actual source view. Does not show every source pattern or determine primary/histology. Full-size link and translated caption/alt needed.
- Hero: original code-native schematic of peritoneal nodules, anterior omental thickening, fluid and bowel/mesenteric tethering; illustrative combination, not a diagnostic CT or mandatory quartet. No diagnostic pixels generated.
- Recognition gaps: no separately verified close-up of subtle diaphragmatic implants or true stellate/tethered bowel across a full CT series. These patterns are taught descriptively; one source still cannot fill that broader diagnostic-recognition requirement. Additional cases/full studies remain outside this bounded page.

## Terminology and planned checks

Peritonealkarzinose / peritoneal carcinomatosis / کارسینوماتوز پریتوئن؛ Omentum majus / greater omentum / امنتوم بزرگ؛ Omental cake / omental cake / ضخیم‌شدن صفحه‌مانند امنتوم؛ gekammerter Aszites / loculated ascites / آسیت لوکوله؛ retrahierte Darmschlingen / retracted bowel loops / لوپ‌های رودهٔ جمع‌شده.

Plan: DE/EN/FA semantic parity including alt/native-label explanation/question feedback; one connected four-option question per language and three local cards; exact curriculum/topic mapping/inProgress; source image dimensions/metadata checks; actual-route semantic SSR; focused checker, global MCQ audit, parse and whitespace checks. Independent source/education/visual/language/assessment review and backlink delta retest completed within the scope below. Browser layout/themes/RTL/interaction matrix remains BLOCKED; static evidence does not replace scientific approval or browser QA.

## Implemented / author verification

Files: `data/peritonealCarcinomatosisLesson.js`; route and CSS under `app/abdomen/peritoneum/peritonealkarzinose/`; three media/provenance files under `public/abdomen/peritoneal-carcinomatosis/`; `scripts/check-peritoneal-lesson.mjs`; `scripts/test-peritoneal-render.mjs`; this ledger. Shared integration: exact curriculum item/link/mcqLink/inProgress; one import and question spread, one topic appended to existing `abdomen-peritoneum` group; p99 map row. Other authors' routes/data/status untouched, shared shell unchanged.

- Focused checker — PASS: 37 content and 26 interface translation units; three source-derived chapters, four CT rows, one connected four-option question per language (B) and three local retrieval cards. Exact curriculum/topic, image dimensions and unresolved contributor metadata checked. Script slots alone do not establish translation meaning; author compared location, uncertainty, negation, CT staging caveats, original English label explanations and same-answer logic across all three languages.
- Actual-route isolated SSR — PASS: actual maintained shell and LessonHero in DE/EN/FA, translated alt, single title, all chapter/caption text, source links, four question options, three cards, language-preserving quiz href. Next Image/Link and environment/progress hooks mocked; no browser loading, focus, scrolling or layout claim.
- Production hash observer and shared shell/hero semantic SSR regressions — PASS. Observer uses simulated location/events and cleanup/language reattachment; real browser history remains untested. No shared helper/component changes in this batch.
- `npm run audit:mcq` — PASS: 637 questions and 18 cases per language at handoff. This lesson adds only one question per language; no clinical review of all 637 inferred.
- New route/data/scripts plus shared registries parsed — PASS; tracked scoped diff whitespace and eight new text-file checks clean. No full build or new server attempted; no staging/commit/push.
- Hero rendered to 1400×700 PNG and opened, no text labels. Final actual 620×510 CT crop opened again: omental thickening, original arrow/English label, fluid and footer retained. Native CT pixels unchanged. Image resolution and coverage limited to one selected source slice; no subtle-implant or full-stage recognition signoff.

| Status field | Scope |
|---|---|
| editorial_qa | Independent SRC/EDU/VIS/LNG PASS within bounded scope; initial PER-ASM-01 minor corrected and independently retested PASS. No demonstrated clinical defect. |
| browser_qa | **BLOCKED** in restricted local environment. Desktop/mobile, themes, RTL wrapping, keyboard, image loading, progress and actual hash/history interactions not verified |
| media provenance | PDF source/page/crop/ID traced and visible; contributor, original full stack/frame/phase and case-specific terms unverified due inaccessible case page; project use authorised, no independent legal-clearance claim |
| scientific_review | pending Dr. Zia |
| publication | not_requested; `inProgress`, no complete status, commit or push |

Independent review by `/root/workflow_trial` inspected actual PDF99/printed98 and final CT crop, the source C01–C10, and all DE/EN/FA text, assessment and integration. Bounded SRC/EDU/VIS/LNG passed. Current ESGAR recommendations and indexed original Liang/Chia articles were checked for staging limits and possible disease-burden underestimation. No demonstrated clinical defect, mandatory sign quartet, histology-from-image claim or operative algorithm was found. rID162382 footer was verified, but contributor, original phase/frame and full series remain inaccessible/unverified. Review explicitly limits image claims to displayed morphology; subtle diaphragmatic implants and full-series stellate/tethering recognition remain unverified.

## Independent findings and author correction, 2026-10-19

Read-only reviewer workflow_trial inspected the actual PDF/crop (including pixel-equal ROI and rID162382), all translations and assessments, current ESGAR full PDF and primary Liang/Chia indexed articles. Bounded SRC/EDU/VIS/LNG passed with the stated original-case and visual-breadth limits; no clinical defect demonstrated. ASM/UX **REVISE: PER-ASM-01 (minor)** — route quiz practice href omitted `from`; actual quiz consumer lines251–253 defaults Back to `/ueben`, losing return to the localized lesson. Independent browser blocker remains separate.

Repair: practice href now includes encoded language-specific `/abdomen/peritoneum/peritonealkarzinose` as `from`. Actual-route SSR reads the emitted href, parses quiz topic/fach/count/language and decoded return path/language for DE/EN/FA; checks the unchanged actual quiz Back-href contract. Focused checker asserts localized encoded construction. No clinical/media/shared-registry/shell change in this correction. The same defect in previously reviewed p98 was repaired separately and independently retested.

Author focused checker37/26, actual-route SSR3languages and scoped parse/whitespace rerun PASS. Independent delta retest by `/root/workflow_trial` confirmed actual emitted links preserve the correct localized return URL in DE/EN/FA, match the actual quiz consumer/back-href contract, and pass the focused checker, actual-route SSR and `git diff --check`. **PER-ASM-01 closed; ASM PASS for bounded review.** Real browser click/history/navigation, scientific approval and publication remain unverified. No stage/commit/push.

### Independent read-only retest — workflow_trial, 2026-10-19

Reviewer reinspected corrected p99 and p98 actual route hrefs, parsed actual rendered anchors in DE/EN/FA, and matched decoded `from` to unchanged quiz consumer/back links. Fach/topic/count, quiz language and return pathname/language were correct. Both focused checkers, both actual-route SSR tests and scoped diff check independently PASS. **PER-ASM-01 CLOSED; ASM PASS in bounded scope.** The demonstrated UX backlink defect is closed; real-browser UX remains **BLOCKED**.

Final bounded independent results: SRC PASS for C01–C10 and current primary/guideline support; EDU PASS for three chapters and descriptive four-pattern scope; VIS PASS for actual omental/fluid teaching frame only, not broad subtle-implant/stellate recognition; LNG PASS for AI semantic comparison, native clinical review pending; ASM PASS after delta; UX BLOCKED by missing real-browser evidence; REV PASS independence. Original case contributor/full stack/frame/phase/terms remain unverified. Scientific review pending Dr.Zia and no release approval inferred.
