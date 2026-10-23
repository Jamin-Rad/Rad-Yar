# COPD imaging — Thorax.pdf p.29

## Source and scope ledger

This lesson is a bounded, adult CT reporting supplement for the exact curriculum topic `copd`, at `/thorax/copd-bildgebung`. The source slide is a topic cue only. It does not supply imaging criteria, a case, or a diagnostic image. The content below is attributed to external sources and does not diagnose COPD from CT.

| Source | Evidence inspected | Lesson use | Limitation |
| --- | --- | --- | --- |
| Thorax.pdf, physical p.29, printed p.28 | Rendered slide `.tmp-thorax-p29.png` inspected 2026-10-23; title “Tracheobronchialsystem”; topic labels “Bronchiektasen”, “Bronchiolitis”, “COPD” only | Establishes that COPD is a curriculum topic; no substantive content is attributed to this page | No diagnostic details, case, or image on this slide |
| Lynch et al. Fleischner Society statement, *Radiology* 2015;277:192–205. DOI 10.1148/radiol.2015141579; PMID 25961632; PMCID PMC4613878 | Full text/abstract and section headings reviewed 2026-10-23 | Visual emphysema patterns (centrilobular, panlobular, paraseptal), airway-related CT features, and structured descriptive approach | CT morphology is not interchangeable with spirometric COPD diagnosis; imaging patterns overlap |
| Elbehairy et al. ERJ 2024;63:2301010. DOI 10.1183/13993003.01010-2023 | ERS journal article page and abstract reviewed 2026-10-23 | CT as structural characterization; emphysema pattern and extent; technical/protocol and quantitative-method limitations | Review, not a universal reporting standard; quantitative measurements depend on acquisition/reconstruction/software |
| GOLD 2026 Report | Official GOLD landing page and report highlights reviewed 2026-10-23 | Boundary between imaging phenotype and clinical/physiologic COPD diagnosis; no treatment advice copied | Guideline is not used to provide CT morphology criteria |
| O’Dowd et al., ERS/ESTS/ESTRO/ESR/ESTI/EFOMP incidental findings statement, *Eur Respir J.* 2023;62:2300533. DOI 10.1183/13993003.00533-2023 | Open-access statement abstract reviewed 2026-10-23 | CT emphysema should not be used alone to diagnose COPD; a finding can prompt clinical correlation | Applies to incidental low-dose screening context; does not define all reporting practice |

## Learning outline and visual plan

1. **Was zeigt das CT — und was nicht?** Separate visible structural phenotype from spirometric COPD diagnosis and state the topic-only PDF scope.
2. **Welches Muster überwiegt?** Compare centrilobular, panlobular, and paraseptal emphysema; then distinguish parenchymal destruction from airway-predominant signs and expiratory air trapping.
3. **Wie wird daraus ein knapper Befund?** Report presence/extent, predominant pattern and distribution, relevant airway or ancillary findings, and technical/clinical limits without inferring etiology or severity of airflow obstruction.
4. One inline retrieval check tests the key boundary; summary compresses three reporting rules.

The original SVG is a conceptual comparison of three distribution patterns, not an axial CT or diagnostic case. No diagnostic image is fabricated or attributed to the PDF. Existing low-attenuation teaching at `/thorax/hrct/dichteminderung` remains the detailed bulla-versus-cyst/low-attenuation lesson; this page links it as a related topic and does not repeat that differential.

## Terminology map

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| Emphysema | Emphysem | emphysema | آمفیزم |
| Centrilobular | zentrilobulär | centrilobular | سنترلوبولار |
| Panlobular | panlobulär | panlobular | پان‌لوبولار |
| Paraseptal | paraseptal | paraseptal | پاراسپتال |
| Air trapping | Air-Trapping / Luftfalle | air trapping | حبس هوا |
| Structural phenotype | struktureller Phänotyp | structural phenotype | فنوتیپ ساختاری |

## Changed artifacts and validation

- Route: `app/thorax/copd-bildgebung/page.jsx` and `page.module.css`.
- Lesson, assessments, cards: `data/copdImagingLesson.js`.
- Curriculum ID `copd` is connected to `/thorax/copd-bildgebung` and remains `inProgress`.
- Schematic: `public/educational/copd-patterns.svg` with source/purpose/alt provenance in the adjacent JSON.
- The focused shared-shell SSR check is `node --import tsx scripts/test-copd-thorax-p29-ssr.mjs`.
- Assessment audit: `npm run audit:mcq`.
- Browser UX and specialist scientific approval are distinct gates and remain pending until evidenced.
