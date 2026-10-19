# Fibröse Dysplasie — PDF lesson ledger

**Scope:** MSK.pdf, PDF pages 114–116 (printed pages 113–115). Route planned as `/msk/tumoren/fibroese-dysplasie`. Bounded imaging lesson; not a complete FD/McCune-Albright management chapter.

**Learner outcome:** Given a bone lesion and its modality pattern, describe distribution and the radiographic/CT matrix, recognize the MRI correlation pitfall, and state where the PDF's differential list is only a starting point.

**Chapter path:** (1) One bone or several? (2) Ground-glass matrix and bone contour. (3) MRI variability and correlation. (4) Site-oriented differential; embedded retrieval check and four-rule summary.

**Visual plan:** Original non-diagnostic SVG schematic for the hero. Source crop rID 17974 from PDF p.115 demonstrates the proximal femoral mixed lytic-sclerotic / focal ground-glass appearance and mild bowing. Source crop rID 14236 from PDF p.116 shows the three labeled MRI sequences; label and captions avoid interpreting pixels beyond the source text. The user has stated the PDF images are authorized. No Radiopaedia case was added because the supplied PDF already gives direct, captioned examples for the exact teaching points and no separately verified case was needed.

## Source coverage

| ID | PDF page / printed | Source point | Importance | Lesson location | Status / note |
|---|---|---|---|---|---|
| FD01 | 114 / 113 | Benign developmental bone disorder; marrow/spongiosa replaced by disorganized fibrous tissue and immature woven bone | Essential | `pattern` | Included; no histologic expansion beyond source wording |
| FD02 | 114 / 113 | Monostotic and polyostotic forms; 70–80% / 20–30% ranges; listed common sites; childhood/early adulthood and earlier childhood for polyostotic form | Supporting | `pattern` | All source-attributed ranges and age statements included; figures are not independently epidemiology-verified |
| FD03 | 114 / 113 | McCune-Albright triad: polyostotic FD, café-au-lait pigmentation, endocrinopathy / precocious puberty | Supporting | `pattern` | Condensed to combination; says imaging alone does not establish syndrome |
| FD04 | 114 / 113 | CT called “Goldstandard”; ground-glass matrix without clear trabeculae | Essential | `radiograph-ct` | Matrix retained; broad “gold standard” phrasing qualified to value of CT for matrix/bone morphology, not a universal pathway |
| FD05 | 114 / 113; 115 / 114 | Expansion, endosteal thinning/scalloping, generally smooth margin and possible thin sclerotic rim | Essential | `radiograph-ct` | Included; cortex preservation qualified as “may” |
| FD06 | 115 / 114 | Proximal femoral shepherd’s-crook deformity and bowing under load | Supporting | `radiograph-ct` | Included as possible deformity, without treatment/biomechanical claim |
| FD07 | 115 / 114 | Femoral lesion rID 17974, focal ground-glass and mild bowing | Essential visual | `radiograph-ct` | Cropped source figure with source caption and caveat; provenance JSON |
| FD08 | 115 / 114 | Distal femoral lucency, endosteal scalloping, no periosteal reaction | Supporting example | — | Not taught separately; a second near-duplicate long-bone example omitted to keep first pattern concise |
| FD09 | 115 / 114 | Maxillary ground-glass expansion rID 34871 | Supporting example | — | Not included; craniofacial region is represented only in source-based differential list; omission does not imply absent craniofacial disease |
| FD10 | 115 / 114 | Polyostotic form whole-body radiograph rID 12166 | Supporting visual | — | Not included; skeletal distribution is expressed in text; avoid uncaptioned global case interpretation |
| FD11 | 116 / 115 | MRI not method of choice; signal varies with fibrous tissue, trabeculae, cysts and blood | Essential | `mri` | Included, MRI signal represented as source-dependent |
| FD12 | 116 / 115 | T1 mostly iso-/hypointense vs muscle; T2 usually intermediate/low, may be high with cystic/water-rich components | Essential | `mri` | Condensed in lead; no claim of a single diagnostic signal |
| FD13 | 116 / 115 | Usually strong, often heterogeneous enhancement; MRI may look malignant; correlate with ground-glass matrix on CT | Essential | `mri`, self-check | Included; no unsupported assertion that enhancement alone distinguishes benign/malignant lesions |
| FD14 | 116 / 115 | Craniofacial DD: cemento-ossifying fibroma sharper, intraosseous meningioma more sclerotic, Paget more often skull vault | Supporting | `differential` | Included with “PDF lists” framing; no exhaustive DD claim |
| FD15 | 116 / 115 | Long-bone DD: NOF, enchondroma, simple bone cyst | Supporting | `differential` | Included; distinguishing features deferred, avoiding unsupported elaboration |
| FD16 | 114–116 | No comprehensive management, biopsy, or clinical triage framework on these pages | Scope boundary | Source note and `differential` | Explicitly bounded; clinical decision thresholds are not invented |
| FD17 | External evidence | Rare malignant transformation; rapid enlargement with new focal pain and cortical destruction/new extraosseous soft-tissue mass are concerning features | Safety caveat | `differential` warning | Added as a short sourced caveat from Javaid et al. consensus context and Kushchayeva et al. radiology review; explicitly says signs are not diagnostic and overlap with benign aggressive variants/secondary ABC |

## Terminology alignment

| German | English | Persian |
|---|---|---|
| Fibröse Dysplasie (FD) | Fibrous dysplasia (FD) | دیسپلازی فیبروزی (FD) |
| monostotisch / polyostotisch | monostotic / polyostotic | مونواستوتیک / پلی‌استوتیک |
| Milchglasmatrix | ground-glass matrix | ماتریکس شیشه‌مات |
| endostales Scalloping | endosteal scalloping | اسکالوپینگ اندوستئال |
| Hirtenstabdeformität | shepherd’s crook deformity | دفورمیتی عصای چوپان |
| Kontrastmittelanreicherung | contrast enhancement | افزایش سیگنال پس از تزریق مادهٔ حاجب |

## Evidence and open checks

- Cross-check reference: Javaid et al., FD/MAS international consortium consensus, *Orphanet J Rare Dis* 2019;14:139, https://pmc.ncbi.nlm.nih.gov/articles/PMC6567644/. Used for general FD/MAS and imaging context.
- Red-flag evidence: Kushchayeva et al., “Fibrous dysplasia for radiologists: beyond ground glass bone matrix,” *Insights Imaging* 2018;9:1035–1056, https://pmc.ncbi.nlm.nih.gov/articles/PMC6269335/. Review describes rapid expansion/new pain and cortical destruction/soft-tissue mass as concerning, while noting overlap with benign/aggressive FD patterns and secondary ABC.
- Source page images (PDF 114–116) visually inspected; extracted text cross-checked against the page images. OCR extraction contains icon/font artifacts, not treated as source instructions.
- SSR/preflight passed with `node scripts/test-msk-fibroese-dysplasie-render.mjs`: DE/EN/FA and `dir`, all translated source text, four chapter IDs, source-crop metadata/provenance, text-free topic hero, StandardLessonShell markers, source-attributed frequency ranges, three-choice embedded check and sourced caution. Source crops were inspected after rendering at 200 dpi. Node emits the repository's existing `MODULE_TYPELESS_PACKAGE_JSON` warning for this ESM data file.
- Independent source/content/language/accessibility review and corrective delta review PASS. Curriculum route integrated and asserted by the render test. Browser matrix is blocked behind the existing authenticated gate; the gate must remain intact. Clinical review by Dr. Zia remains open.
- No linked assessment bank was discovered/modified for this topic; embedded retrieval check is authored in the lesson.
