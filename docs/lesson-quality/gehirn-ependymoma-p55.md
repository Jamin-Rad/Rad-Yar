# Ependymom der hinteren Schädelgrube — source and QA ledger

Status: editorially reviewed; exact curriculum item remains `inProgress`. Independent review PASS for the bounded p.55 lesson. This is not a complete ependymoma curriculum or a histologic diagnosis.

## Learning task and structure

Learner task: describe a suspected infratentorial ependymoma pattern by its relation to the fourth ventricle, route of extension through the ventricular outlets, tissue signal, calcification and enhancement; treat outlet extension as a differential clue rather than proof. The lesson is limited to the typical posterior-fossa pattern described on PDF p.55.

Outline: fourth-ventricle orientation → selected MRI descriptors and the two source frames → specificity/classification limits → embedded retrieval check → four portable reporting rules.

## Source coverage ledger

| Source point | Location | Disposition | Limit |
|---|---|---|---|
| Header: “Ependymom (WHO-Grad 2 oder 3)” | PDF p.55 (printed p.54) | Shown in the ledger only as historical PDF wording; lesson says no grade is assigned and gives a short WHO CNS5 context | The page's broad 2/3 grade framing is not used as current classification. WHO CNS5 integrates site, histopathology and molecular features. |
| Definition: tumour arises from ependymal cells of ventricular walls | PDF p.55 | Added as a one-sentence orientation definition | No histogenesis or pathology detail is taught. |
| Biphasic age pattern: children mostly infratentorial; adults mostly spinal | PDF p.55 | Explicitly deferred in learner-facing scope and this ledger | This route is restricted to the posterior-fossa pattern; age distribution is not used as a diagnostic rule. |
| Origin at the floor of the fourth ventricle; typical outlet extension via Luschka and Magendie; “plasticity” compared with medulloblastoma | PDF p.55 | Rebuilt into orientation schematic and prose; softened to “supports but does not prove” | A 2026 retrospective pediatric comparison found fourth-ventricular outlet extension in medulloblastoma too; no sign is presented as pathognomonic. |
| Heterogeneous mass, cystic/necrotic components, possible calcification; T2 hyperintensity with punctate signal voids linked to calcification; heterogeneous post-contrast T1 enhancement | PDF p.55 | Concisely taught as variable descriptors; punctate T2 signal voids are identified as possible calcifications per the source | PDF's approximate 50% calcification figure is omitted; no prevalence estimate is claimed. A single cited older retrospective imaging cohort supports that MR appearance varies and can include cysts. |
| Two images captioned T1 C+ and FLAIR, case reference rID 26844 | PDF p.55 | Two labeled image crops are displayed with sequence captions and explicit source limitation | The complete stack, source case metadata and original frame identifiers are not independently reviewed. The route does not claim features from sequences that are absent. |
| Additional treatment, outcome, spinal/supratentorial subtypes, staging, and differential details | Not developed on p.55 | Omitted from lesson | Outside the bounded page-specific image-pattern task; requires additional source mapping. The age pattern is source-present and separately documented above as intentionally deferred. |

## Scientific source checks

- Choi JY, Chang KH, Yu IK, Kim KH, Kwon BJ, Han MH, Kim IO. **Intracranial and Spinal Ependymomas: Review of MR Images in 61 Patients**. *Korean J Radiol*. 2002;3(4):219–228. doi:10.3348/kjr.2002.3.4.219. Primary retrospective series of 61 histologically proven cases; the authors report location-dependent and nonspecific signal appearances, with cystic components in a subset. Its age and imaging protocols make it supporting qualitative evidence, not a current prevalence source.
- Louis DN et al. **The 2021 WHO Classification of Tumors of the Central Nervous System: a summary**. *Neuro-Oncology*. 2021;23(8):1231–1251. doi:10.1093/neuonc/noab106. Classification context: ependymomas incorporate anatomic site, histopathology and molecular features.
- Wu HW, Wu CH, Lin SC, et al. **MRI Differentiation of Anaplastic Ependymoma and Medulloblastoma with Fourth Ventricular Outlet Extension in Children**. *Neuroradiology*. 2026;68:1251–1261. doi:10.1007/s00234-026-04003-x. Retrospective comparison of 21 anaplastic ependymomas and 36 medulloblastomas with outlet extension; supports the narrow caution that outlet extension alone is not specific. The pediatric, selected cohort is not generalized to all ependymomas or ages.
- User-provided `Gehirn.pdf`, PDF p.55 / printed p.54, rendered at 140 dpi and visually inspected on 2026-10-19.

## Media provenance

- `public/educational/ependymoma/outlet-pattern.svg` is an author-created, non-patient-specific schematic of the fourth ventricle and the named outlet directions. Numbers map to a localized DE/EN/FA legend; no signal, diagnostic finding, or patient anatomy is encoded. Its alt text describes only the schematic.
- `t1c.png` and `flair.png` are crops from user-supplied `Gehirn.pdf`, PDF p.55 (printed p.54). The rendered source page is 1158×1638 pixels at 140 dpi. Crop boxes use `(x1,y1,x2,y2)`: T1 C+ `(327,1168,562,1478)`; FLAIR `(572,1168,807,1478)`. Original printed sequence labels are preserved in the crops and repeated in accessible HTML captions. The PDF caption supplies `Radiopaedia rID 26844`; case title/authorship, original Radiopaedia frames and full stack were not independently checked. A task and sequence-specific captions direct attention to the central posterior-fossa mass, bright FLAIR signal and PDF-described heterogeneous T1 C+ enhancement. They explicitly state that these axial crops do not demonstrate extension through Luschka or Magendie; outlet extension is explained only in the schematic/text and requires tracing appropriate additional planes.
- User authorization for supplied PDF image use is recorded in the maintained lesson standard; this records project authorization and does not assert independent legal clearance.

## Curriculum, translation, assessment

- Exact existing curriculum ID `ependymale-tumoren` links to `/gehirn/tumoren/ependymom` and remains `inProgress`. The older broad pattern page contains a brief p55 summary; this route expands only the page-specific posterior-fossa descriptor task, while the broad summary remains an index-level overview.
- No exact existing global question or flashcard mapping was found. The route contains one four-option embedded self-check with per-option translated feedback; no global MCQ/card is claimed.
- DE/EN/FA units include lesson copy, accessible diagram text/legend, source-image captions/limits, assessment and source scope. The page root follows language direction; the schematic's structural left/right is fixed independently of RTL.

## Verification and remaining gates

- Author verification after reviewer repairs: focused content/locale/integration/asset checker passed (41 localized data units); actual-route semantic SSR passed in DE/EN/FA for schematic-only alt, image task/observations, source limits, WHO context and embedded check; JSX parse passed; global MCQ audit passed (638 questions/18 cases per language); `git diff --check` passed. The schematic was rendered from SVG and visually inspected; both PDF crops were visually inspected. Browser layout, interaction and small-screen overflow were not tested.
- Independent read-only review and delta retest PASS (SRC/EDU/VIS/LNG/ASM/REV); VIS is bounded to the two supplied crops and schematic.
- Browser desktop/mobile and RTL interaction/overflow, original case stack/metadata, and specialist scientific signoff remain pending. A passing build, checker, curriculum link or AI review does not imply scientific approval or publication.
