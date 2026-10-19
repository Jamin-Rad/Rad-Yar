# Aneurysmal bone cyst — source and authoring ledger

**Route:** `/msk/tumoren/aneurysmal-bone-cyst`  
**PDF:** `MSK.pdf`, PDF pages 112–113 (printed pages 111–112)  
**Basis language:** German source; learner content in German, English and Persian.  
**Learning promise:** Recognize the expansile osteolytic pattern, interpret MRI fluid levels and septal enhancement, and avoid treating fluid-fluid levels as diagnostic proof.

## Chapter outline and coverage

| Source item | Importance | Destination | Status / note |
| --- | --- | --- | --- |
| p.112: benign but locally aggressive osteolytic lesion; blood-filled chambers and fibrous septa | Essential | `pattern` | Included, concise |
| p.112: age profile, sex preference, long-bone metaphysis, posterior spine, flat bones | Context | `pattern` | Age and common locations included; mild female preference omitted as low-yield for imaging recognition |
| p.112: primary/secondary proportions; proposed translocation pathogenesis questioned in source | Context | source note and references | Approximate proportions omitted. Updated with current evidence: primary ABC is clonal, with USP6 rearrangement in about 65–70%; not universal (Oliveira et al. 2004; Restrepo et al. 2022) |
| p.112: secondary change with giant cell tumour, osteoblastoma, fibrous dysplasia | Essential differential | `differential` | Included; interpreted as potential underlying lesion |
| p.112: expansile osteolysis, thin preserved cortex, blow-out/eggshell, circumscribed margin, possible sclerotic rim, fine septa | Essential | `pattern` | Included |
| p.113: heterogeneous signal, fluid-fluid levels from blood-product sedimentation | Essential | `mri` | Included with specificity caveat; telangiectatic osteosarcoma is explicitly named as an important mimic (Restrepo et al. 2022; Van Dyck et al. 2006) |
| p.113: strong septal and peripheral capsule enhancement; cystic spaces do not enhance | Essential | `mri` | Included |
| p.113: proximal tibial case and possible pathologic fracture, rID 12152 | Visual case | `mri` | Four labeled MRI panels used; source description retained with limits |

## Visual plan and provenance

| Goal | Asset | Source / status |
| --- | --- | --- |
| Explain thin shell, internal septa and layered fluid chambers | `public/educational/aneurysmal-bone-cyst/hero.svg` | Original schematic; explicitly non-diagnostic |
| Show real MRI sequence differences and fluid levels | Four MRI panel crops in `public/educational/aneurysmal-bone-cyst/` | Cropped from MSK.pdf p.113 case rID 12152 under the user's explicit permission to reuse PDF images. The PDF does not identify a separate image contributor or licence for these panels. Image anatomy and labels inspected from the rendered page. |

## Terminology map

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| Aneurysmal bone cyst | Aneurysmatische Knochenzyste (AKZ) | Aneurysmal bone cyst (ABC) | کیست استخوانی آنوریسمال (ABC) |
| Fluid-fluid levels | Flüssigkeitsspiegel / Fluid-fluid levels | Fluid-fluid levels | سطح‌های مایع‌ـ‌مایع |
| Fibrous septa | bindegewebige Septen | fibrous septa | سپتاهای فیبروزی |
| Septal enhancement | Enhancement der Septen | septal enhancement | enhancement سپتاها |
| Underlying lesion | zugrunde liegende Läsion | underlying lesion | ضایعهٔ زمینه‌ای |

## Verification boundaries

- The PDF pages were inspected as text and rendered images. The MRI figure was inspected before cropping; no diagnostic meaning beyond its caption and visible sequence pattern is inferred.
- Current evidence supports a clonal neoplastic process in primary ABC, with USP6 rearrangement in about 65–70% of cases; absence of rearrangement does not exclude ABC. Secondary ABC-like change is a morphology associated with other lesions.
- Telangiectatic osteosarcoma can also show fluid-fluid levels. Thick nodular enhancing septa/solid tissue, cortical destruction, mineralized matrix and soft-tissue extension warrant specialist assessment; imaging features are not a standalone diagnosis.
- `editorial_qa`: independent source/content/image/language review and corrective delta PASS; exact curriculum link and status integrated. `scientific_review`: pending clinician review. `browser_qa`: pending; route access remains behind the site's existing login gate. `publication`: not assessed here.
- The render/preflight test checks route SSR, localization parity, direction, assessment feedback and asset/source references. It is not clinical validation or full browser testing.
