# GIST CT pilot · Abdomen.pdf pp. 67–68

Status: independent editorial review passed; browser evidence and clinical/product approval not obtained. Curriculum ID: `gist`; route: `/abdomen/gi/gist`.

## Learning promise and outline

Learner can describe a gastric-origin, often exophytic mass pattern and internal heterogeneity, while avoiding a definitive GIST diagnosis from the three unlabelled CT crops. The page sequence is: (1) CT pattern and spatial origin, (2) inspect the source image plate, (3) keep the PDF-listed differentials open, (4) state image limitations and take-home rules. No standalone “finding/self-test” chapter was added; the common shell provides the self-check.

## Source coverage ledger

| ID | Source | Point | Disposition / location |
|---|---|---|---|
| GI-GIST-01 | Abdomen.pdf physical p.67 / printed p.66 | Definition and stomach/GI origin; intraluminal vs exophytic growth | Condensed to a morphology learning goal and CT pattern section; no histology detail added. |
| GI-GIST-02 | p.67 / print 66 | Demographic and site statements | Not needed for this image-recognition objective; omitted and recorded as outside scope. |
| GI-GIST-03 | p.67 / print 66 | Historic TNM material | Excluded; version-sensitive staging is outside this visual lesson. |
| GI-GIST-04 | p.68 / print 67 | The slide states GIST is hypervascular with particularly marked arterial enhancement; it also refers to heterogeneous CT pattern/hypodense components | Included explicitly as a slide-level/general pattern statement. It is not used to assign a phase to any individual unlabelled panel. GEIS 2023 independently supports the broader heterogeneous CT morphology; no phase is inferred for these source crops. |
| GI-GIST-05 | p.68 / print 67 | Lobulated gastric-origin mass, hypodense components, no surrounding fat stranding/oedema | Included as the source slide's captioned observation, explicitly not a diagnostic criterion. |
| GI-GIST-06 | p.68 / print 67 | Three CT views (two axial, one coronal) | All three included as separate responsive crops; orientation only, no phase assignment. User authorized PDF-image reuse. |
| GI-GIST-07 | p.68 / print 67 | Gastric carcinoma, lymphoma, lipoma differentials | Included as open differential list; no single-feature separation claim. |
| GI-GIST-08 | p.68 / print 67 | PET “gold standard”, treatment, Choi criteria | Excluded as historical/current-management claims outside scope; not restated as contemporary guidance. |

## Visual provenance and limitations

Assets are crops from the user-supplied `Abdomen.pdf`, physical page 68 / printed 67, SHA-256 `A27901CB4A002B99DAD3D2F1864585E3E1CA4377F7F19C852E6B4160308E2D0E`:

| Asset | Source crop | Caption policy |
|---|---|---|
| `public/educational/gist/pdf-p68-axial-1.png` | first axial panel | Axial view 1; phase not specified |
| `public/educational/gist/pdf-p68-axial-2.png` | second axial panel | Axial view 2; phase/timing not specified |
| `public/educational/gist/pdf-p68-coronal.png` | coronal panel | Coronal view; phase not specified |

The supplied slide contains no contributor, institution or case identifier. No attribution or case details have been invented. The original source figure's image quality and source-panel resolution are retained without assigning a contrast phase. The code-native hero is a spatial teaching schematic and is labelled as non-patient imagery.

## External evidence

Serrano C, et al. *2023 GEIS Guidelines for gastrointestinal stromal tumors*. Therapeutic Advances in Medical Oncology. DOI [10.1177/17588359231192388](https://doi.org/10.1177/17588359231192388); [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC10467260/). Used only to support cautious description of GIST CT morphology and the limits of radiologic diagnosis; no TNM, PET, treatment or Choi threshold is taught.

## Assessment and localization

The in-page self-check (`abdomen-gist`) tests observed morphology and description: origin, contour, growth direction and internal structure. The connected MCQ (`gist-ct-01`) tests the separate phase-inference skill, distinguishing the PDF's general hypervascular/arterial-enhancement statement from the unlabelled individual panels. Four flashcards cover origin, heterogeneity, phase-label limits and open differential. DE/EN/FA keys are aligned, and the MCQ carries source metadata. Curriculum registration is `inProgress`; no `ready`/complete or release claim is made.

## Verification ledger

| Check | Result |
|---|---|
| PDF text and page image review | Complete for physical pp.67–68; source image plate inspected visually. |
| Crop inspection | Complete; three panels checked for orientation, legibility and absence of phase labels. |
| Focused content/locale/registry assertions | Passed with `npx tsx scripts/test-abdomen-gist.ts`; confirms DE/EN/FA MCQ shape/provenance and phase-learning target, distinct morphology self-check, connected question selection, localized accessible SVG description, four linked cards, exact curriculum ID/links/status, route and assets. |
| MCQ audit / locale parity | `npm run audit:mcq` passed (668 questions, 18 cases per language); `node scripts/audit-abdomen-thorax-copy-parity.cjs` passed, including GIST's 20 localized semantic units. Translation quality was included in the independent editorial review. |
| Focused SSR and browser interaction | React `renderToStaticMarkup` passed for the localized GIST SVG in DE/EN/FA; `role=img`, accessible SVG label/title and page-provided localized figure captions are asserted. Full route SSR/browser interaction remains blocked: shell HTTP request to localhost was rejected with socket access denied. `npm run build` did not complete: Google Fonts resolution failed and Next then hit `EPERM` creating `.next/types/app/gehirn/vaskulaer/dva`; no GIST-specific diagnostic was emitted. |
| Independent review | Passed after revisions. Reviewer confirmed source coverage, phase-label limits, image/caption use, visual hierarchy, DE/EN/FA localization, morphology self-check distinct from the registered MCQ, linked flashcards, curriculum links and active-worktree integration. |
| Browser interaction | Not verified: the live route is behind the member sign-in gate; shell localhost access is denied. No gate was bypassed. |
| Clinical/product approval | Not claimed. AI/editorial review does not establish scientific sign-off or release approval. |
