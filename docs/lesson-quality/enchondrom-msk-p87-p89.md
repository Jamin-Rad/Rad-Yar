# Enchondrom · MSK.pdf pp. 87–89

**Scope:** bounded DE/EN/FA imaging lesson for radiology learners. Route: `/msk/tumoren/enchondrom`. Learners should recognize a medullary chondroid pattern, select the modality's role, and identify features that make the enchondroma–ACT/chondrosarcoma differential important.

**Outline:** radiographic pattern → modality roles → warning features/differential → retrieval check → three take-home rules. No independent management section; the short source management statements are not converted into patient-care instructions.

| ID | Source / page | Point | Importance | Lesson location | Status |
|---|---|---|---|---|---|
| EN-01 | MSK.pdf p.87 / print p.86 | Benign hyaline cartilage tumour in medullary cavity; biology statement about fetal epiphyseal remnants | Context | Pattern definition | Summarized as an imaging entity; speculative embryologic mechanism omitted |
| EN-02 | p.87 / print 86 | Enchondromatosis, Ollier disease (often asymmetric) and Maffucci syndrome (soft-tissue haemangiomas); multiple lesions and elevated malignant-transformation risk | Essential caveat | Warning table | Included without fixed percentages; risk estimates vary by definition/population |
| EN-03 | p.87 / print 86 | Common incidental detection in adults, short and long tubular bone distribution, hand/phalanges, femur/humerus/tibia, rare pelvis/ribs/scapula | Core | Pattern table | Included concise distribution and difficult axial location; exact prevalence and age range omitted |
| EN-04 | p.87 / print 86 | Radiograph: central medullary, sharply marginated/lobulated lesion, endosteal scalloping, no typical periosteal response except fracture | Core | Pattern table | Included; absence of periosteal reaction is not used as an exclusion rule |
| EN-05 | p.87 / print 86 | Rings-and-arcs/popcorn chondroid mineralisation, less conspicuous in hand lesions | Core | Pattern table and rID 91156 hand radiographs | Included with source crop and localized caption |
| EN-06 | p.88 / print 87 | CT supplements radiographs; depicts mineralisation and cortical detail | Core | Modality section and rID 41467 CT crop | Included; crop is illustrative, not a standalone diagnostic case |
| EN-07 | p.88 / print 87 | MRI: T1 isointense to slightly hyperintense relative to muscle; T2 markedly hyperintense and lobulated due to cartilage water; contrast can show septal enhancement | Core | Modality table and rID 33147 MRI crop | All three source descriptors are now included with explanation; crop sequence labels remain unconfirmed, so no specific sequence/sign is assigned to the case |
| EN-08 | p.89 / print 88 | Bone infarct: serpiginous sclerotic border, usually without cortical expansion | Differential | Warning table | Included as a concise contrast |
| EN-09 | p.89 / print 88 | ACT/chondrosarcoma warning features: unexplained pain, size >5 cm, deep endosteal scalloping >2/3 cortical thickness, soft-tissue component | Essential caveat | Warning table/note | Included with qualifiers: findings raise concern rather than prove malignancy; >5 cm is attributed to PDF and not used as independent threshold. >2/3 threshold cross-checked against SSR Bone-RADS and primary/review literature. |
| EN-10 | p.89 / print 88 | Epithelioid bone tumour, usually different location/clinical context | Differential | Deferred | Low yield for the bounded imaging promise; not translated into an exhaustive differential |
| EN-11 | p.89 / print 88 | Pathologic fracture in finger lesions can be the first presentation; malignant transformation rare in solitary lesions and more concerning in central/axial or syndromic settings | Important | Warning note and table | First-presentation fracture and syndrome/axial context included; no individual risk percentage repeated. |
| EN-12 | p.89 / print 88 | Watchful follow-up, curettage, en-bloc resection | Management | Deferred | Source statements are not reproduced as treatment advice; lesson's scope is imaging recognition and escalation features. |

## Visual and terminology plan

- Topic hero is a code-native, non-diagnostic medullary chondroid schematic; no scan-like visual is presented as diagnostic evidence.
- Radiopaedia cases rID 91156 (hand radiographs), 41467 (tibial CT) and 33147 (ankle MRI) were selected from the supplied PDF p.88. Case IDs are legible in the source; contributor names are not, so none are inferred. MRI sequence labels are absent and captions explicitly say so. User authorized the supplied PDF images.
- Hand radiograph crop was tightened to the image panels to remove the page's colored rule and the clipped external R/rID label, while retaining the radiographic content and the visible in-image mark.
- Terms: Enchondrom / enchondroma / انکندروم; chondroide Matrix / chondroid matrix / ماتریکس کندروئید; endostales Scalloping / endosteal scalloping / scalloping اندوستال; ACT / atypical cartilaginous tumour / تومور غضروفی آتیپیک.

## Verification and open gates

- Source pages 87–89 were rendered and visually inspected; printed page numbers are 86–88. Content and crops inspected.
- SSR test: `node scripts/test-msk-enchondrom-render.mjs` (pending final run).
- Independent read-only content, language, asset and source review: pending. Reviewer should resolve EN-08/11 scope notes before acceptance.
- Browser desktop/mobile, DE/EN/FA RTL and keyboard matrix: pending. Specialist clinical approval: pending. Curriculum `inProgress` is a route link only, not quality or release approval.

## Scientific cross-check

- SSR Bone-RADS white paper, 2022: [PMC9283187](https://pmc.ncbi.nlm.nih.gov/articles/PMC9283187/). The algorithm treats concerning cartilage-lesion features such as endosteal scalloping, expansile remodelling, cortical breakthrough, periosteal reaction and soft-tissue mass as reasons for further evaluation; it does not make a single imaging sign a universal histological diagnosis.
- Ferrer-Santacreu et al., 2012: [PMC3346996](https://pmc.ncbi.nlm.nih.gov/articles/PMC3346996/), review of clinical and radiological criteria for enchondroma versus low-grade chondrosarcoma in the appendicular skeleton.
- This source check supports qualified teaching of the >2/3 cortical-thickness warning; it is not specialist sign-off for the lesson or individual diagnosis.
