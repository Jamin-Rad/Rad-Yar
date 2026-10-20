# Osteochondrosis dissecans — bounded lesson record

**Scope:** MSK.pdf, PDF pp. 128–129 (printed pp. 127–128). PDF p.130 is a section divider for metabolic/hormonal/toxic osteopathies, not a continuation of OCD. Osgood-Schlatter is a separate topic on PDF p.71 and is intentionally not folded into this route.

**Proposed route:** `/msk/osteochondrosen/osteochondrosis-dissecans`, using existing curriculum ID `osteochondrosis-dissecans`.

**Learning aim:** Describe the source-defined OCD lesion, connect demarcation/displacement to the Rodegerdts/Heuck stages, identify MRI features the source associates with instability, and avoid treating a juvenile MRI sign as an isolated treatment decision.

**Chapter plan:** (1) lesion and common sites; (2) modality findings with source case; (3) source staging and juvenile MRI limitation; (4) selective direct MR arthrography and source-listed differentials; embedded retrieval check; three take-home rules. No extra generic report chapter is justified by these pages.

## Source coverage

| Point | Source | Importance | Lesson location | Status / qualification |
| --- | --- | --- | --- | --- |
| Focal aseptic subchondral bone necrosis with possible osteochondral fragment demarcation | MSK.pdf p.128 | Essential concept | `concept` | Included as the PDF definition |
| Usually traumatic/microtraumatic repetitive loading; active adolescent juvenile form | MSK.pdf p.128 | Context | `concept` | Included as source description, explicitly not a complete causation account |
| Knee (classically medial femoral condyle), medial talar shoulder, capitellum | MSK.pdf p.128 | Essential orientation | `concept` | Included |
| Early radiograph often normal/subtle subchondral lucency or sclerosis; later mouse bed / joint mouse | MSK.pdf p.128 | Essential | `imaging` | Included; loose body defined as detached fragment in joint space |
| T1 hypointense demarcation; T2/STIR subchondral marrow oedema | MSK.pdf p.128 | Essential | `imaging` | Included |
| Fluid rim behind fragment, interface cysts, cartilage breach as instability signs | MSK.pdf p.128 | Essential caveat | `imaging`, check | Included as signs listed by the PDF; limited specificity in juvenile lesions noted using arthroscopy-correlated evidence |
| Case: detached, non-displaced osteochondral fragment inferomedial medial femoral condyle, compatible with grade III | MSK.pdf p.129, rID 8298 | Visual/case | `imaging` | Radiograph + labelled T1/STIR crop included; caption preserves source wording and attribution; no extra sequence/case details inferred |
| Direct MR arthrography: diluted intra-articular gadolinium (1:200), then MRI; considered for unclear stability on native MRI pre-refixation | MSK.pdf p.129 | Conditional technique | `arthrography-dd` | Included strictly as source-described option, not routine advice |
| MRA advantages: cartilage defects / unstable fragments; contrast tracking under fragment as interface sign | MSK.pdf p.129 | Context | `arthrography-dd` | Included as source report |
| MRA disadvantages: invasive/time-consuming; possible infection and contrast reaction | MSK.pdf p.129 | Safety caveat | `arthrography-dd` | Included with source attribution, not expanded into a procedure guide |
| Rodegerdts/Heuck stages I–IV: in situ signal change; partial stable demarcation; full demarcation/loosened with fluid rim; displaced with empty bed/loose body | MSK.pdf p.129 | Essential classification | `staging`, check | All four stages reproduced in a table; stage III distinguished from stage IV by displacement |
| SONK/Ahlbäck: older patients, medial femoral condyle, often meniscal lesions | MSK.pdf p.129 | Essential differential | `arthrography-dd` | Included as source-listed differential clue, not a full SONK lesson |
| Normal ossification variant: posterior femoral condyle in children, usually symmetric and without oedema | MSK.pdf p.129 | Essential differential | `arthrography-dd` | Included |
| Adjacent topic Osgood-Schlatter | MSK.pdf p.71 | Separate topic | Excluded from this route | Separate source page; must be authored/reviewed independently rather than combined with OCD |

## Visual plan and terminology

| Teaching purpose | Media | Asset and interpretation | Status |
| --- | --- | --- | --- |
| Orient the learner to a demarcated subchondral fragment and interface | Code-drawn, non-diagnostic schematic | `public/educational/osteochondrosis-dissecans/hero.svg`; conceptual only, no patient anatomy or diagnostic criterion encoded beyond fragment/interface geometry | Implemented with translated alt text |
| Compare source radiograph, T1 and STIR in one teaching case | User-supplied PDF case crop | `public/educational/osteochondrosis-dissecans/pdf-case-p129.jpg`; PDF p.129, rID 8298; contributor not identified on supplied page; reuse basis is user's explicit image permission | Source page and crop visually checked; provenance JSON records limits |

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| Osteochondral fragment | osteochondrales Fragment / Dissekat | osteochondral fragment | قطعهٔ استئوکندرال |
| Demarcation | Demarkierung | demarcation | مرزبندی |
| Fluid rim | Flüssigkeitssaum | fluid rim | حاشیهٔ مایع |
| Loose body | freier Gelenkkörper / Gelenkmaus | loose body | جسم آزاد مفصلی |
| Interface cyst | Zyste in der Grenzschicht | interface cyst | کیست در سطح مرزی |
| Cartilage breach | durchbrechender Knorpelriss | cartilage breach | پارگی نافذ غضروف |

## Existing route and assessment audit

- `data/curriculum.js` contains the exact topic ID `osteochondrosis-dissecans`, now linked to `/msk/osteochondrosen/osteochondrosis-dissecans` and kept `inProgress`.
- Related sibling route exists for Morbus Perthes at `/msk/osteochondrosen/morbus-perthes`; no OCD route was found.
- No OCD-specific MCQ or flashcard registration was found. The AVN lesson briefly lists OCD as a differential, but does not assess OCD staging or instability. This lesson adds one embedded three-option check; shared assessment banks were not changed.

## External verification and limits

- Kijowski et al., “Juvenile versus adult osteochondritis dissecans of the knee: appropriate MR imaging criteria for instability,” *Radiology* 2008;248(2):571–578, [PubMed 18552309](https://pubmed.ncbi.nlm.nih.gov/18552309/). Arthroscopy-correlated cohort; common MRI instability criteria have materially different specificity in juvenile versus adult lesions.
- Heywood et al., “Correlation of magnetic resonance imaging to arthroscopic findings of stability in juvenile osteochondritis dissecans,” *Arthroscopy* 2011;27(2):194–199, [PubMed 20970949](https://pubmed.ncbi.nlm.nih.gov/20970949/), DOI 10.1016/j.arthro.2010.07.009. Supports not using MRI alone to determine juvenile lesion stability.
- Hu et al., [PubMed 30995094](https://pubmed.ncbi.nlm.nih.gov/30995094/), *AJR Am J Roentgenol* 2019;213(1):147–154, DOI 10.2214/AJR.18.20710. Supports the qualification that MRI stability assessment in juvenile OCD has imperfect specificity.

## Validation and review status

- Source text extracted and pages 128–129 visually inspected; page 130 confirmed as a divider.
- `node scripts/test-msk-osteochondrosis-dissecans-render.mjs`: PASS (SSR coverage for DE/EN/FA, RTL, PDF scope/case, all four stages, juvenile MRI caveat, differential, and unselected retrieval).
- `git diff --check`: PASS for the scoped lesson files.
- Independent review and citation delta: PASS for the bounded source/teaching/image/language/assessment scope. The reviewer caught two incorrect article metadata records; both were corrected to PMID 20970949 (Heywood et al., 2011) and PMID 30995094 (Hu et al., 2019), then rechecked. The route remains partial and has no global MCQ/flashcard bank entry.
- Browser/device/theme/interaction evidence: pending.
- Clinician review and Dr. Zia scientific approval: pending.
- Release/publication approval: not asserted.
