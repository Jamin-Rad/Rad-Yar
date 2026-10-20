# Shoulder impingement: source coverage and media ledger

**Curriculum ID:** `impingement-kalkschulter` (partial bounded coverage; keep `inProgress`)
**Route:** `/msk/schulter/impingement-kalkschulter`
**Source:** user-provided `MSK.pdf`, PDF pp. 36–38 (printed pp. 35–37). Pages rendered and visually inspected at 1600 px.
**Audience/outcome:** Radiology learners distinguish the source's subacromial, subcoracoid, posterosuperior internal and anterosuperior patterns, describe relevant imaging features, and qualify limits of morphology/measurements.
**Learning path:** orientation and projections → Bigliani schematic → subacromial space and direct soft-tissue findings → internal patterns and MRI associations → retrieval check and portable rules.

## Source coverage

| Key | PDF page | Source point | Priority/status | Lesson location |
|---|---:|---|---|---|
| SHO-37-00 | 37 / printed 36 | AP, axial and transscapular Y views | Core / included | Projection section |
| SHO-36-02 | 36 / printed 35 | Bigliani I flat, II curved, III hooked; source associates III with increased risk | Core / included with qualification | Acromion section and source schematic; reliability and no-causality caveat |
| SHO-37-01 | 37 / printed 36 | Extrinsic/subacromial pattern between humeral head and coracoacromial arch | Core / included as descriptive model | Subacromial section |
| SHO-37-02 | 37 / printed 36 | Potential contributors: type III, inferior AC osteophytes, os acromiale | Core / included as possible associated findings, not proof | Subacromial section |
| SHO-37-03 | 37–38 / printed 36–37 | AP acromiohumeral distance <7 mm as source-described abnormality; bursal fluid, tendon tendinosis/tear | Core / distance threshold qualified and not taught as stand-alone criterion; direct findings included | Caveat and subacromial section |
| SHO-38-01 | 38 / printed 37 | Subcoracoid compression of subscapularis between coracoid and lesser tuberosity; source gives coracohumeral interval <6 mm on axial MRI and tendon signal/tear | Core / included with diagnostic-limit caveat | Subcoracoid section and self-check |
| SHO-38-02 | 38 / printed 37 | Posterosuperior internal contact in abduction/external rotation; PASTA, posterosuperior labral change, greater-tuberosity cyst/oedema | Core / included; source does not identify a sequence for those findings, so none is invented | Internal pattern section |
| SHO-38-03 | 38 / printed 37 | Anterosuperior contact in flexion/internal rotation; subscapularis and pulley findings | Core / included; no unprovided sequence is named | Anterosuperior section |
| SCOPE-01 | 36–38 | Curriculum label also says “Kalkschulter” (calcific tendinopathy), but these pages contain no calcification teaching | Explicitly out of scope; separate source evidence required | Ledger only; route title stays impingement-specific and curriculum must remain `inProgress` |

## Visual plan and provenance

| Asset | Purpose | Source and selection | Reuse/credit | Limits |
|---|---|---|---|---|
| `app/msk/schulter/impingement-kalkschulter/ShoulderImpingementDiagram.jsx` | Topic-specific conceptual hero of acromion, cuff tendon and subacromial space | Route-local hand-authored SVG rendered through `LessonHero` via the optional `heroVisual` shell override | Original RadYar conceptual graphic | Not an MRI, radiograph or diagnostic case; anatomy labels are localized DE/EN/FA |
| `public/msk/shoulder/source-pdf-page-36.jpg` | Teach the three contours being compared | Crop from rendered MSK.pdf PDF p.36 (printed p.35), source Bigliani type diagram; extraction at 1600 px, crop x=300, y=885, width=560, height=285 in rendered 1132×1600 image | User explicitly authorized reuse of all figures in the supplied PDFs. The visible crop is a schematic reproduced in the supplied PDF. No external contributor or license is inferred. | Morphology drawing only, not a patient image and not evidence of disease |

No shoulder diagnostic MRI/radiograph case is present on these pages; the lesson does not invent a case or claim that the source illustration demonstrates a pathological imaging finding.

## Terminology and external evidence checks

- Giaroli et al. evaluated the coracohumeral interval and concluded that routine MRI measurements were poorly predictive; the interval can support but not establish subcoracoid impingement: [PubMed 16357410](https://pubmed.ncbi.nlm.nih.gov/16357410/), doi:10.2214/AJR.04.0830.
- Tashjian et al. review diagnosis and imaging limitations in subcoracoid impingement in the *Journal of the American Academy of Orthopaedic Surgeons* (JAAOS): [PubMed 33323679](https://pubmed.ncbi.nlm.nih.gov/33323679/).
- Tuite & Pfirrmann summarize internal impingement MRI associations and the importance of overhead-athlete context: [NCBI Bookshelf, MRI of the shoulder](https://www.ncbi.nlm.nih.gov/books/NBK570161/).
- Gulledge et al. report fair-to-poor interobserver reliability for the Bigliani classification; the lesson therefore presents it as a source-taught morphology label, not a robust standalone clinical classifier: [PMC7000014](https://pmc.ncbi.nlm.nih.gov/articles/PMC7000014/), doi:10.1097/CORR.0000000000001038.
- The source's `<7 mm` and `<6 mm` measurements are preserved as source claims but are not repeated as diagnostic thresholds. This distinction is explicit in all three languages.

## Translation terms

| Concept | DE | EN | FA |
|---|---|---|---|
| subacromial | subakromial | subacromial | زیرآکرومیال |
| subcoracoid | subkorakoidal | subcoracoid | زیرکوراکوئید |
| internal impingement | intrinsisches Impingement | internal impingement | ایمپینجمنت داخلی |
| articular-sided partial tear | gelenkseitige Partialläsion | articular-sided partial tear | پارگی پارشیال سطح مفصلی |
| coracohumeral interval | Coracohumeral-Intervall | coracohumeral interval | فاصله کوراکوهومرال |

## Verification and open evidence

- Focused SSR test `node scripts/test-shoulder-impingement-ssr.mjs`: PASS for DE/EN/FA, RTL, page image, localized topic schematic and option-specific feedback.
- The shared shell's optional `heroVisual` prop is additive: absent that prop, its existing shared `ClinicalPatternDiagram` behavior and arguments remain unchanged. Focused SSR coverage checks both paths; `ClinicalPatternDiagram.jsx` is untouched.
- Curriculum ID `impingement-kalkschulter` now links to this route and remains `ready: true, inProgress: true` because calcific tendinopathy is outside the inspected source scope.
- Scoped `git diff --check`: PASS.
- Independent source/content/visual/language/assessment review: PASS. Corrected
  source-page mapping, citation metadata, and nested landmark in response to
  review; all three corrections passed focused delta review.
- Browser/device, focus and interactive behavior review: pending.
- Clinical signoff: not performed; this ledger is not a release approval.
