# dAVF lesson source and QA ledger — Gehirn PDF pp. 35–36

Scope: bounded reconciliation of the existing `/gehirn/vaskulaer/davf` lesson with the supplied brain PDF, pages 35–36 (printed page numbers 34–35). This is not a scientific release approval.

## Source coverage

| PDF page | Point | Disposition | Lesson location |
|---|---|---|---|
| 35 | Dural AV connection; acquired; no nidus; sinus thrombosis/trauma/surgery/infection associations | Covered | Basics |
| 35 | Common transverse/sigmoid location; cavernous sinus and other locations | Covered; direct vs indirect cavernous fistula clarified from Barrow classification | Basics and differential |
| 35 | Pulsatile tinnitus, cavernous sinus orbital symptoms, CVD-associated deficits/haemorrhage | Covered | Clinical table |
| 36 | T2 flow voids/congestive signal; SWI pseudophlebitic veins; TOF arterialized sinus signal | Covered | Imaging table |
| 36 | CTA early sinus filling, enlarged meningeal arteries, tortuous cortical veins | Covered | Imaging table |
| 36 | DSA fistula point, early sinus filling, ECA feeders (middle meningeal, occipital, ascending pharyngeal) | Covered; DSA described as reference examination | Imaging table and linked assessments |
| 36 | Endovascular first approach, surgery if inaccessible/failed, selected conservative Cognard I follow-up | Covered with individualized-decision caveat | Management |
| Added teaching | Cognard I–V classification and CVD distribution | Added content; source: Cognard et al., Radiology 1995, https://pubmed.ncbi.nlm.nih.gov/7862961/ | Classification, questions/cards |
| Added teaching | No universal grade-wide annual haemorrhage rate; presentation/outflow/ectasia matter | Rates removed rather than generalized; source context: Reynolds et al., Neurosurgery 2012, https://pubmed.ncbi.nlm.nih.gov/22610384/ | Clinical and management caveats |
| Added teaching | Direct Barrow A vs indirect dural Barrow B–D CCF distinction | Added to prevent conflation; source: Barrow et al., J Neurosurg 1985, https://pubmed.ncbi.nlm.nih.gov/3968564/ | Basics and differential |

## Teaching and media plan

Seven chapters: basics → presentation → Cognard drainage pattern → imaging → differential → management → take-home. The header uses an original text-free SVG hero. The Cognard chapter includes a second schematic contrasting antegrade sinus drainage with cortical venous reflux, with localized DE/EN/FA caption and legend. MRI/angiography images are not added because this PDF spread contains no case images. These are explanatory diagrams, not diagnostic scans.

## Validation and review

- Independent reviewer inspected source pages and linked lesson/assessments. Initial major findings about grade-wide rates, CVD grade grouping, treatment absolutes, CCF differential, DSA exclusivity, header/accordion and linked assessment copy were corrected. Targeted re-review confirmed SRC, EDU, LNG, ASM, VIS and REV pass for the bounded static scope, including the localized two-pattern drainage diagram. UX remains blocked pending real browser checks.
- Focused checker `node scripts/test-gehirn-davf-p35-p36.mjs` passes. `git diff --check` passes. The global MCQ audit could not run because Node 24 fails resolving extensionless imports in `data/questions.js` (`ERR_MODULE_NOT_FOUND`); this is an environment/tooling failure, not a passing audit.
- Browser review remains unavailable; UX is BLOCKED and Persian RTL/responsive rendering are unverified. `npm run build` was attempted but failed: font fetches hit `ENOTFOUND fonts.googleapis.com`, then webpack hit `EPERM` creating `.next/server/app/api/admin`; this does not establish a dAVF-specific compile defect or a successful build.
- Clinical verification beyond the cited classification and specialist sign-off are pending. `inProgress` is not interpreted as release approval.

### Follow-up: localized take-home TOC label

- Independent review found the sidebar chapter label was English-only in all three locales even though the chapter heading itself was localized. The TOC label is now `Merke` / `Take-home message` / `نکات کلیدی` (DE/EN/FA).
- The focused test asserts the exact localized values; independent re-review confirmed the route renders this field and the check passes. This narrow localization fix is PASS. Browser rendering remains unverified, so UX remains BLOCKED.
