# Demenzmuster im MRT · Gehirn.pdf pp.72–74

## Scope and implementation

- Route: `/gehirn/neurodegeneration/demenzmuster`
- Lesson data: `data/gehirnDemenzMusterLesson.js`
- Related exact curriculum IDs: `morbus-alzheimer`, `lewy-body-demenz`, `frontotemporale-demenz` (all link to this bounded comparative route and remain `inProgress`).
- Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Gehirn.pdf`, 3 rendered pages inspected visually on 2026-10-19. PDF page 72 carries printed page 71; PDF 73 carries printed 72; PDF 74 carries printed 73.
- Audience/promise: radiology learners; describe the dominant atrophy distribution while keeping imaging clues separate from clinical diagnostic criteria.
- Chapter outline: (1) Alzheimer medial-temporal MTA and later/posterior distribution, (2) DLB clinical context and relative MTL preservation, (3) FTD anterior pattern and source morphology, (4) one embedded retrieval check, (5) three short takeaways.
- Assessment mapping: inline single-best-answer question asks for the source-described frontal/anterior-temporal distribution; explanation reinforces clinical correlation. No global MCQ or flashcard ID exists for these three topics; none is invented.

## Source coverage ledger

| Source point | Source page (PDF / printed) | Importance | Lesson location | Status / disposition |
|---|---|---|---|---|
| Alzheimer: progressive neurodegenerative disease; early short-term-memory symptom; orientation/language/praxis symptoms | 72 / 71 | Contextual clinical background | Not expanded in imaging lesson | Deliberately bounded: full clinical syndrome/treatment is outside this radiology pattern lesson; no contradictory claim added |
| Alzheimer amyloid plaques and tau; PDF estimates ~60–70% of neurodegenerative dementias | 72 / 71 | Context / etiology / prevalence | Not taught | Deferred; prevalence is not needed for image-reading objective and needs current epidemiological sourcing |
| Symmetric hippocampal atrophy; early inferior temporal-horn enlargement; normal hippocampus has high negative predictive value for AD | 72 / 71 | Core imaging pattern and caveat | Alzheimer chapter; source MTA panel and text | Atrophy and temporal-horn enlargement covered. PDF's negative-predictive statement deliberately not repeated as a diagnostic-performance claim; it needs a primary evidence source |
| MTA score: semiquantitative hippocampus/parahippocampal gyrus rating; coronal T1 at hippocampal level; age cut-offs <75 ≥2, >75 ≥3 | 72 / 71 | Core method; numeric threshold | Alzheimer chapter | Age cut-offs are omitted from learner copy because the source slide does not state a value for exactly age 75 and the cited studies do not validate these precise thresholds; use the MTA scale only as a contextual visual rating pending specialist review |
| Source image sequence labelled MTA 0–4 | 72 / 71 | Required visual teaching evidence | Crop `/public/educational/demenzmuster/alzheimer-mta-p72.png` | Reused from user-authorized PDF and visually checked after crop; source gives no patient/contributor/acquisition provenance |
| Posterior cingulate and precuneus atrophy earlier than global atrophy | 72 / 71 | Distinctive posterior distribution | Alzheimer chapter | Covered as PDF-described pattern; not presented as pathognomonic |
| Later diffuse atrophy, enlarged CSF spaces, compensatory ventricles / hydrocephalus ex vacuo | 72 / 71 | Later disease / atrophy-vs-ventriculomegaly context | Alzheimer chapter | Covered briefly; linked to adjacent NPH lesson only by clinical distinction, not merged |
| DLB: second-most-common neurodegenerative dementia; α-synuclein deposits | 73 / printed 72 | Context / pathology | Lewy chapter | Included as PDF context, not an independent prevalence claim |
| DLB triad: fluctuating cognition, visual hallucinations, parkinsonism; temporal relation of dementia to motor symptoms | 73 / printed 72 | Key clinical distinction | Lewy chapter | Covered concisely; detailed clinical criteria deliberately deferred |
| Relative hippocampal preservation vs AD; minimal global atrophy / MRI may look inconspicuous relative to symptoms | 73 / printed 72 | Core imaging comparison | Lewy chapter and conceptual hero | Covered. PDF has no diagnostic MRI example on this page; no patient image was fabricated |
| DaTSCAN demonstrates striatal dopamine-transporter loss | 73 / printed 72 | Relevant adjacent modality | Lewy chapter | Covered and explicitly separated from structural MRI |
| FTD often begins before age 65; behavioural variant and PPA | 74 / printed 73 | Clinical pattern context | FTD chapter | Covered as source description; no subtype criteria asserted |
| Prominent, often asymmetric frontal and/or temporal atrophy | 74 / printed 73 | Core imaging pattern | FTD chapter; source image panels | Covered; both hemispheres and anterior distribution are prompted |
| “Knife-edge”: sharply thinned gyri with initially preserved parietal/occipital lobes; source calls pattern pathognomonic | 74 / printed 73 | Morphology and specificity claim | FTD chapter | Morphology covered; source’s “pathognomonic” assertion is intentionally not repeated as an unqualified diagnostic claim |
| Coronal/axial source MRI examples | 74 / printed 73 | Required visual evidence | Crop `/public/educational/demenzmuster/ftd-p74.png` | Reused from user-authorized PDF, visually checked after crop; source gives no original case/contributor/acquisition metadata |

## Visual inventory and limits

| Asset | Purpose | Source / attribution | Inspect result |
|---|---|---|---|
| `public/educational/demenzmuster/atrophy-distribution.svg` | Topic-specific conceptual hero; three locations, no claim of diagnostic morphology | Original code-native SVG | Looks clear at source; deliberately labelled non-diagnostic via localized alt text |
| `public/educational/demenzmuster/alzheimer-mta-p72.png` | Compare source MTA 0–4 series | User-provided Gehirn.pdf p.72, printed p.71; crop only, no annotation | Crop visually inspected; source case details unknown |
| `public/educational/demenzmuster/ftd-p74.png` | Locate source frontal/anterior temporal distribution | User-provided Gehirn.pdf p.74, printed p.73; crop only, no annotation | Crop visually inspected; source case details unknown |
| Lewy body | Show relative preservation | No diagnostic image on PDF p.73 | Not fulfilled by a diagnostic case image; only conceptual hero + source text. This is an explicit visual limit |

The user authorized images from all six supplied PDFs on 2026-10-19, and the project standard records that permission. No Radiopaedia case is embedded; the PDF does not provide an identifiable source case link for these panels.

## Evidence / review status

- Actual source pages 72–74 were rendered from the supplied PDF and inspected visually. Printed page-number offset is recorded above.
- Source-derived crops were re-opened and visually checked after cropping.
- Route uses the maintained `StandardLessonShell`, `LessonHero`, `LessonSection`, `LessonSources`, and `TakeHomeList`; progress is explicit and one chapter is active at a time.
- Route semantic SSR: PASS in `scripts/test-demenzmuster-render.mjs` for DE/EN/FA, including responsive figure class, localized age-75 caveat, sources, assessment and takeaways.
- Independent content/source/language review: PASS for the bounded p.72–74 comparison after fixes; MTA numeric cut-offs remain omitted, and the DLB diagnostic-image gap is explicitly recorded.
- Browser matrix and interactive UX: not yet run; keep UX blocked pending actual browser evidence.
- Scientific approval by Dr. Zia: pending. The PDF MTA age cut-offs are omitted from learner copy; the source’s “pathognomonic” wording is not presented as a definitive standalone criterion.
- Production/release approval: not inferred from this draft or its checks.

## Primary/reference sources used for contextual bounds

- Scheltens P, et al. *Atrophy of medial temporal lobes on MRI in “probable” Alzheimer’s disease and normal ageing.* JNNP. 1992;55:967–972. https://pubmed.ncbi.nlm.nih.gov/1431963/
- Velickaite V, et al. *Medial temporal lobe atrophy ratings in a large 75-year-old population-based cohort: gender-corrected and education-corrected normative data.* Eur Radiol. 2018. https://pubmed.ncbi.nlm.nih.gov/29124383/ — indicates demographic factors affect 75-year MTA interpretation, so the PDF’s threshold is not presented as universal.
- McKeith IG, et al. *Diagnosis and management of dementia with Lewy bodies: Fourth consensus report.* Neurology. 2017;89:88–100. https://pmc.ncbi.nlm.nih.gov/articles/PMC5496518/
- Rascovsky K, et al. *Sensitivity of revised diagnostic criteria for the behavioural variant of frontotemporal dementia.* Brain. 2011;134:2456–2477. https://pmc.ncbi.nlm.nih.gov/articles/PMC3170532/

These references are contextual bounds; they do not substitute for specialist sign-off or verify every statement in the supplied PDF.
