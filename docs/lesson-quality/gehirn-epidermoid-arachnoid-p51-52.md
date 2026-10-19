# Epidermoid vs arachnoid cyst — source and QA ledger

Status: author draft; scientific review and browser review pending. Exact curriculum items remain `inProgress`.

## Scope and instructional plan

Route: `/gehirn/tumoren/epidermoid-arachnoid`. Learner task: distinguish a typical intracranial epidermoid pattern from an arachnoid cyst by comparing FLAIR and DWI/ADC after noting that T1/T2 can overlap. The lesson teaches imaging-pattern interpretation, not pathology, management, or comprehensive evaluation of intracranial cysts. It uses one integrated self-check and no global MCQ or flashcard registration because no exact existing assessment topic was found.

Sequence: shared T1/T2 appearance → FLAIR and DWI/ADC comparison → morphology and limits → embedded retrieval question → four portable rules.

## PDF coverage ledger

| Source point | Location | Disposition | Limits / reason |
|---|---|---|---|
| Epidermoid described as congenital, slowly enlarging inclusion cyst with keratin/cholesterol contents | Gehirn.pdf PDF p.51 / printed p.50 | Congenital origin, inclusion-cyst definition and keratin/cholesterol composition are deferred; the lesson retains only the source-supported slow-growth clinical context | No histology teaching or growth-rate estimate is added. |
| CPA most frequent site (PDF says approx. 40%); other locations include parasellar region, fourth ventricle and cisterna quadrigemina | PDF p.51 / printed p.50 | Lesson says CPA is common and other cisternal/parasellar locations occur | PDF frequency figure is not repeated as a general prevalence claim. |
| Slow progression; possible CN V, VII, VIII symptoms at CPA; rupture may cause chemical meningitis | PDF p.51 / printed p.50 | Concise contextual note retains the variable location-dependent CN effects and rupture caveat | Symptom work-up and management are outside this imaging module. |
| T1 hypointense / T2 hyperintense, CSF-like | PDF p.51 / printed p.50 and p.52 case | Included as an overlapping feature that cannot decide the differential alone | Signal may vary with contents; lesson does not promise every case is classic. |
| FLAIR heterogeneity / incomplete suppression (“dirty CSF”) | PDF p.51 / printed p.50 and p.52 case | Included and compared with near-complete CSF suppression in arachnoid cyst | Qualitative clue, not standalone proof. |
| T1 post-contrast: no enhancement in typical lesion | PDF p.51 / printed p.50; actual case p.52 | Included as no solid enhancement, with possible thin rim caveat | Nodular/marked enhancement warrants broader differential; no pathology inference. |
| DWI bright; ADC lower than free CSF / near parenchyma | PDF p.51 / printed p.50 and caption p.52 / printed p.51 | Included as a relative DWI/ADC pattern; explicitly requires reviewing ADC rather than interpreting DWI brightness alone | No numeric threshold. Displayed PDF frame selection has no ADC map, so the case image is not used as evidence for ADC. |
| Native CT can resemble arachnoid cyst | PDF p.51 / printed p.50 | Explicitly noted as an insufficient discriminator per the PDF | No CT example or CT diagnostic rule is taught. |
| Case rID 9772: T1/T2 CSF-like, FLAIR heterogeneous, DWI conspicuous | PDF p.52 / printed p.51 | Five MRI frames from the user-authorized PDF are cropped into individual sequence panels and captioned; source case contributes a real pattern example | Selection contains T1, T2, FLAIR, post-contrast T1 and DWI only; no ADC frame. Contributor/ID verified from Radiopaedia metadata. |
| Epidermoid vs arachnoid comparison table (T1/T2, FLAIR, DWI, growth shape) | PDF p.52 / printed p.51 | Rebuilt as accessible HTML table and short explanation | Morphology is supportive only and does not replace sequence review. |
| Dermoid cyst (fat, often midline) and cystic schwannoma | PDF p.52 / printed p.51 | Deliberately omitted from the focused two-entity module and disclosed in source note | They are adjacent differentials, not necessary to teach this bounded pair; separate topic/source audit needed before teaching. |
| Microsurgical resection; capsule may adhere to nerves/vessels; residual capsule can recur | PDF p.52 / printed p.51 | Deliberately omitted | Treatment decision-making is outside the imaging objective; no management recommendation is made. |

## External evidence and claim checks

- Hakyemez B, Yildiz H, Ergin N, Uysal S, Parlak M. **FLAIR and diffusion weighted MR imaging in differentiating epidermoid cysts from arachnoid cysts**. *Tani Girisim Radyol*. 2003;9(4):418–426. PMID:14730949. Prospective 24-patient comparison (12 of each lesion); supports the qualitative role of FLAIR, DWI and ADC. Small cohort; this lesson imports no cutoffs.
- Tsuruda JS, Chew WM, Moseley ME, Norman D. **Diffusion-weighted MR imaging of the brain: value of differentiating between extraaxial cysts and epidermoid tumors**. *AJNR*. 1990;11:925–931. Primary early series; supports relative ADC distinction between free cyst fluid and epidermoid. Small series and older technique; used qualitatively only.
- Osborn AG, Preece MT. **Intracranial cysts: radiologic-pathologic correlation and imaging approach**. *Radiology*. 2006;239(3):650–664. doi:10.1148/radiol.2393050823. Imaging review supports combining location, signal, enhancement and DWI rather than relying on one feature.
- Gaillard F. **Epidermoid cyst - cerebellopontine angle**. Radiopaedia case rID 9772, doi:10.53347/rID-9772. The PDF caption supplies this case attribution; a search result returned the case title/contributor metadata. Original Radiopaedia study/frame identifiers, current case terms, and the full image stack were not independently inspected; no image-level claims rely on them.
- User-provided `Gehirn.pdf`, PDF pages 51–52 (printed pages 50–51), rendered and visually inspected at 140 dpi on 2026-10-19.

## Media provenance

- `public/educational/epidermoid-arachnoid/hero.svg`: author-created abstract sequence-pattern schematic; explicitly not a diagnostic image. Its colors encode the comparison; localized legend names columns and rows.
- The five displayed frames are reproducibly identified by source page and crop: user-supplied `Gehirn.pdf`, PDF p.52 (printed p.51), rendered 1158×1638 at 140 dpi; T1 (175,49,443,367), T2 (443,49,712,367), FLAIR (713,49,982,367), T1 post-contrast (154,383,414,716), and DWI (414,383,702,716). These are crops from the supplied page's montage, not independently inspected Radiopaedia frames or a newly acquired stack.
- User authorization for the supplied PDF images and use of Radiopaedia material is recorded in the maintained lesson standard. This records project authorization only and does not assert independent legal clearance. Attribution remains visible beside the image set and in the source list.

## Integration, translations and assessment

- Exact existing curriculum IDs linked: `epidermoidzyste` and `arachnoidalzyste-tumor`. Both remain `inProgress`; the route tracks reading progress using the epidermoid ID as the route's entry point. The separate developmental item `arachnoidalzysten-fehlbildung` is not linked because this lesson does not cover that curriculum scope.
- No matching global question or flashcard topic exists; the route therefore provides one embedded self-check with translated option-specific feedback and adds no registry entry for a global assessment.
- DE/EN/FA semantic units cover the objective, prose, figure alt text/captions and localized schematic legend, table, question/options/feedback, scope note and sources. Farsi direction is supplied by the shared shell.

## Review and remaining gates

- Author checks after EPI-LNG-01 repair: focused content/locale/route/asset checker passed (42 localized units, including exact DE/EN/FA schematic legend values); JSX parse passed; MCQ-bank audit passed; `git diff --check` passed. `npm run build` was attempted but failed at `EPERM` while creating `.next/server/app/api`; Next also could not reach `fonts.googleapis.com` in this restricted network. The build does not provide a pass for this route.
- Independent review gates: SRC—PDF page/crop provenance and limits are explicit; Radiopaedia image stack/terms/identifiers are not independently inspected and no legal clearance is inferred (bounded); EDU—scope and deferred congenital/composition details are explicit; VIS—schematic is labeled conceptual, left/right ordering is fixed for RTL, and only PDF-cropped sequences are shown; LNG—DE/EN/FA route output, legend, and morphology wording pass semantic SSR; ASM—embedded self-check and feedback render, with no global assessment registration claimed; UX—semantic SSR only, browser layout, interaction, and RTL overflow remain unverified.
- Reviewer delta findings closed: EPI-LNG-01 (diagram legend localized), EPI-VIS-02 (stable schematic column order under Persian RTL), EPI-UX-01 (route actions prop/actual SSR failure), EPI-LNG-02 (Persian growth morphology wording), and EPI-SRC-01 (deferred composition/inclusion origin and bounded image-provenance claims). Final independent retest reports PASS across 42 localized units and confirms the demonstrated findings are closed. Browser layout/interaction/RTL overflow and specialist scientific signoff remain open; no release approval is claimed. Curriculum links and `inProgress` status do not imply scientific approval or completion.
