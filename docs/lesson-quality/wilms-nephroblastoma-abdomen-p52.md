# Nephroblastoma / Wilms tumour — source and QA ledger

Draft status: editorial implementation complete; independent review, clinical verification and browser QA pending. Curriculum status is `inProgress` and is not an approval.

## Scope and learning path

- Route and ID: `/abdomen/niere/wilms-tumour`; `abdomen-wilms-tumour`.
- Source: `Abdomen.pdf`, PDF p. 52, printed p. 51. The rendered page image was inspected at readable size.
- Learner task: describe the mass pattern, use the claw sign to support renal rather than adjacent adrenal origin, and recall the source-listed metastatic sites.
- Chapters: (1) pattern, (2) origin and claw sign with a short self-check, (3) metastatic survey, (4) three take-home rules.
- Excluded from this bounded lesson: epidemiology percentages, presentation, prognosis/survival, treatment and a complete staging protocol. These are either unnecessary to the imaging goal or require current independent verification.

## Source coverage

| Item | Source | Treatment in lesson | Status |
|---|---|---|---|
| Large, heterogeneous, solid renal mass | Abdomen.pdf p. 52 / printed p. 51 | Core pattern paragraph in DE/EN/FA | Included as PDF coverage; scientific verification pending |
| Necrosis and haemorrhage common; calcification less common | Abdomen.pdf p. 52 / printed p. 51 | Concise morphology sentence in DE/EN/FA | Included as PDF coverage; scientific verification pending |
| Renal origin; mass displaces adjacent structures | Abdomen.pdf p. 52 / printed p. 51 | States displacement without assigning a direction, then links it with the claw sign as support for renal origin | Included as PDF coverage; scientific verification pending |
| Claw sign: normal renal parenchyma wraps the lesion with acute margins | Abdomen.pdf p. 52 / printed p. 51 | Defined, interpreted and used in a retrieval question | Included as PDF coverage; scientific verification pending |
| Distinction from adjacent neuroblastoma | Abdomen.pdf p. 52 / printed p. 51 | Bounded to site-of-origin distinction; no histology claim | Included as source statement; comparison limits need independent review |
| Lung most common; liver and lymph nodes less common metastatic sites | Abdomen.pdf p. 52 / printed p. 51 | Explicitly attributed to PDF and disclaimed as a complete staging protocol | Included as PDF coverage; current staging context pending |
| Epidemiology, symptoms, prognosis and survival percentage | Abdomen.pdf p. 52 / printed p. 51 | Deliberately excluded; no figures copied | Deferred pending current authoritative verification and scope need |
| CT case images | Abdomen.pdf p. 52 / printed p. 51 | Not reused; visible page has only a tiny ID and no responsibly verifiable contributor/case attribution | Excluded; original explanatory schematic used instead |

## Media plan and evidence

The route uses a code-native, non-diagnostic schematic in the hero and an explanatory diagram to show the renal parenchyma wrapping around a mass. Both have localized captions/accessible names. The PDF CT figure was visually inspected; its low-visibility identifier is insufficient to establish its case author, source page or reuse terms. The source image is therefore not copied.

## Terminology

| Concept | DE | EN | FA |
|---|---|---|---|
| Nephroblastoma | Nephroblastom | Nephroblastoma | نفروبلاستوما |
| Wilms tumour | Wilms-Tumor | Wilms tumour | تومور ویلمز |
| renal parenchyma | Nierenparenchym | renal parenchyma | پارانشیم کلیه |
| claw sign | Claw sign | claw sign | علامت چنگالی |
| metastasis | Metastase | metastasis | متاستاز |

## Verification status

- Targeted actual-route SSR: PASS — `node scripts/test-wilms-nephroblastoma-render.mjs`; DE/EN/FA, RTL, StandardLessonShell, localized section copy and assessment, hero/media disclosure and the curriculum link were asserted.
- Curriculum route: linked as `inProgress`; the test confirms `/abdomen/niere/wilms-tumour` and status. This is not release approval.
- Independent review: initial source-coverage correction and delta review PASS; the mass-displacement statement and its relationship to the claw sign are now taught and tested without asserting a direction.
- Browser desktop/mobile, language switch, RTL, theme and keyboard interaction: pending.
- Scientific review: pending; PDF-derived content is not treated as independently validated.
- Publication: not approved by this draft.
