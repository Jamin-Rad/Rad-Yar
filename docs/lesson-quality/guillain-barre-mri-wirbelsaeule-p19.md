# Guillain–Barré syndrome MRI — Wirbelsäule.pdf p.19

**Exact curriculum ID:** `guillain-barre-syndrom`  
**Route:** `/wirbelsaeule/entzuendlich/guillain-barre-syndrom`  
**Status:** bounded DE/EN/FA lesson linked in curriculum and kept `inProgress`; independent source/content/evidence/visual/language/assessment review and corrective delta retest PASS. Browser QA and specialist clinical sign-off remain pending.

## Learning task and scope

Teach how MRI relates to suspected GBS: it is not routine in a typical presentation; selected MRI may help in atypical/uncertain cases and assess mimics; root thickening/enhancement may support GBS but is nonspecific; a normal MRI does not exclude GBS. Brief clinical context is limited to identifying GBS as an acute polyradiculoneuropathy and noting that diagnosis is primarily clinical with supportive ancillary tests.

The lesson excludes diagnostic criteria, electrodiagnostic interpretation, CSF thresholds, respiratory/autonomic triage, treatment, prognosis and management. It does not provide an imaging protocol or claim that MRI distinguishes GBS by itself.

## Source coverage ledger

| ID | Source point | Importance | Lesson location / disposition |
|---|---|---|---|
| GBS-19-01 | Wirbelsäule.pdf physical p.19 (printed p.18): acute inflammatory demyelinating polyradiculoneuropathy; often post-infectious/autoimmune | Context | Intro, carefully brief; etiologic examples are not repeated because the page is an MRI lesson. |
| GBS-19-02 | Clinical description: ascending flaccid weakness, distal/symmetric onset, areflexia; autonomic/respiratory involvement can occur | Context | Intro limits the scope to clinical context; no frequency or triage claims are taught. |
| GBS-19-03 | MRI indication: exclude mimics and assess severity/course; source lists myelitis, mass and ALS | Essential for imaging scope | Reframed to current guideline: no routine MRI in typical GBS; selected imaging in atypical/uncertain cases can help seek alternative causes, especially cord compression, myelitis and tumour. The source's severity/course role is omitted because current guideline evidence does not establish MRI as a routine severity/course assessment. ALS is not taught as a spine-MRI exclusion target. |
| GBS-19-04 | Post-contrast T1: cauda equina/spinal root enhancement, anterior predominance; source calls it pathognomonic and says roots affected intra-/extrathecally | Essential imaging pattern + caveat | Root thickening/enhancement may occur; anterior predominance is a source-described pattern, not a defining sign. “Pathognomonic” is corrected: guideline says root enhancement is supportive but nonspecific. Exact intra-/extrathecal phrasing omitted because no anatomical clarification is provided and it is not needed for the learning goal. |
| GBS-19-05 | T2/STIR often normal or subtle root signal increase; no cord pathology is noted | Essential limitation | Covered as variable and non-exclusionary; normal cord is not treated as a diagnostic criterion. |
| GBS-19-06 | Source states MRI sensitivity 50–83% and moderate specificity | Important correction | Omitted as current accuracy estimates. The EAN/PNS guideline describes the small uncontrolled MRI studies and unknown specificity; its rationale says normal MRI does not rule out GBS. |
| GBS-19-07 | CSF: albuminocytologic dissociation and possible early normal result | Adjacent, not needed for MRI objective | Not taught to avoid expanding into diagnostic workup or reproducing an oversimplified “gold standard” label. Guideline-supported CSF nuance is intentionally outside scope. |
| GBS-19-08 | Source page has no diagnostic MRI case image | Visual/provenance | No patient image is claimed or reused. A new non-diagnostic code-native conceptual flow graphic illustrates the interpretive boundary. |

## Learning path and visual plan

1. Frame MRI as an adjunct after clinical assessment, not a routine test in typical presentations.
2. Describe possible post-contrast T1 and T2/STIR root findings without turning them into required criteria.
3. Compare a supportive root finding with the limits of specificity and the non-exclusionary meaning of a normal MRI.
4. Retrieve the central lesson in a brief case question.

`public/educational/gbs-mri-boundaries.svg` is an original, non-diagnostic conceptual diagram. It is not a patient MRI and does not claim to depict a particular enhancement pattern. The translated key explains its three stages; no external case attribution or licence is implied.

## Evidence checked

- Source page 19 was rendered with Poppler at 130 DPI and visually inspected. It has text and a watermark, not a clinical scan; the physical PDF footer prints page 18.
- van Doorn PA, Van den Bergh PYK, Hadden RDM, et al. *European Academy of Neurology/Peripheral Nerve Society Guideline on diagnosis and treatment of Guillain–Barré syndrome.* Eur J Neurol. 2023;30(12):3646–3674. doi:10.1111/ene.16073. PICO 5 advises against MRI/US as routine add-on tests in typical GBS, suggests them in selected atypical cases, describes root enhancement as supportive but not specific, and says normal imaging does not rule out GBS. Whole-spine contrast MRI may aid exclusion of cord compression, transverse myelitis or tumour.
- Byun WM, Park WK, Park BH, Ahn SH, Hwang MS, Chang JC. *Guillain-Barré syndrome: MR imaging findings of the spine in eight patients.* Radiology. 1998;208(1):137–141. doi:10.1148/radiology.208.1.9646804. Small retrospective series describing thickened roots and variable enhancement; the publication itself notes lack of specificity.

## Verification and open work

- Focused route SSR and DE/EN/FA content parity: `node scripts/test-guillain-barre-mri-ssr.mjs` PASS, including RTL rendering and exact curriculum link.
- Independent review: all source/content/evidence/visual/language/assessment gates PASS. Delta retest resolved GBS-DOC-01 (severity/course rationale) and GBS-ASM-01 (plausible distractor); focused SSR and scoped `git diff --check` PASS.
- Browser desktop/mobile, dark/light, keyboard and RTL interaction QA remain open. Clinical specialist sign-off remains open.
