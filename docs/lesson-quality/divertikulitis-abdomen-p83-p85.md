# Diverticular disease — Abdomen.pdf pp.83–85

## Scope

- Route: `/abdomen/gi/divertikulitis`
- Exact curriculum ID: `divertikulitis` (existing route, MCQ and flashcard links retained)
- Source: user-provided `Abdomen.pdf`, physical PDF pp.83–85 (printed pp.82–84)
- Review: full pages rendered at 140 dpi and visually inspected; route copy, CDD rows, linked topic question bank and flashcards compared in DE/EN/FA.
- Learning objective: distinguish symptomatic uncomplicated disease (CDD 3a) from recurrent uncomplicated (3b) and recurrent complicated disease (3c), while keeping acute complications in type 2.

## Source coverage and disposition

| ID | PDF page | Source point | Route / learning artifact | Disposition |
|---|---:|---|---|---|
| DIV-83-01 | 83 | Diverticulosis definition and sigmoid predilection | `basics` | Already covered; no change |
| DIV-83-02 | 83 | CDD 0, 1a/b, 2a/b/c, 3a/b/c and 4 | `cdd` table | Existing table collapsed chronic disease into one generic type 3 row. Replaced with source-specific 3a/3b/3c rows in DE/EN and explicit Persian translation; separated acute type 2 from chronic/recurrent type 3 in the takeaway. |
| DIV-83-03 | 83 | IV contrast CT; routine enteral contrast not recommended; rectal contrast in selected fistula/anastomosis questions | `ct.protocol` | Already covered in DE/EN; Persian inherits English outside the newly localized CDD section and remains an open translation issue for this route. |
| DIV-84-01 | 84 | Segmental sigmoid thickening, inflamed diverticula, dirty-fat sign, and reactive adjacent nodes | `ct`, `cave` | Core CT pattern and fat stranding already covered. Reactive nodes are mentioned in source but route wording retains nodes only as an atypical cancer differential; not changed in this bounded subtype update. |
| DIV-84-02 | 84 | Abscess, perforation and fistula; CT panels illustrate colovesical/adjacent fistula findings | `complications`, `cases`; global case/MCQ bank | Fistula signs and a separate linked colovesical-fistula case/question already exist. PDF composite not copied because it is small and does not add a needed teaching comparison to the existing case material. |
| DIV-84-03 | 84 | Conservative, drainage and operative management summary | — | Not copied. It is a compressed management recommendation and requires current clinical context beyond this radiology-pattern scope. |
| DIV-85-01 | 85 | CDD summary with treatment suggestions per type | `cdd` classification only | Classification cross-checked; treatment column deferred as version-sensitive and outside the focused imaging lesson. No historical recommendation was imported. |

## Update to linked retrieval

- Added `cdd-3` to the route's existing topic flashcards, with matching DE/EN/FA fronts, answers and explanations.
- Added `divertikulitis-de/en/fa-cdd-3c` question-bank item: an inflammatory stenosis in recurrent disease maps to CDD 3c; distractor 2a is an acute microabscess episode.
- Exact `divertikulitis` route/curriculum IDs and existing assessment links are unchanged.

## Source boundary and guideline status

The subtype rows are bounded to the labels and explanations visible on Abdomen.pdf p.83: 3a symptomatic uncomplicated diverticular disease without laboratory/imaging inflammation, 3b recurrent diverticulitis without complications, and 3c recurrent diverticulitis with complications such as stenosis, fistula or conglomerate. These are taught as classification labels, not as a standalone diagnostic test. No treatment recommendation from p.85 was carried over.

The German S3 guideline Part I (AWMF 021-020, English PDF dated January 2024) was consulted only as a corroborating taxonomy reference. AWMF's status page states Version 2.1 was valid until 15 October 2026; it is expired as of this review on 20 October 2026. Therefore this lesson change does not represent current guideline validation or endorsement of management recommendations. Sources: [AWMF/DGVS S3 guideline Part I (PDF)](https://register.awmf.org/assets/guidelines/021_D_Ges_fuer_Verdauungs-_und_Stoffwechselkrankheiten/021-020eng_S3_diverticular-disease-diverticulitis-part1_2024-01.pdf), [official AWMF guideline status](https://www.awmf.org/aktuelles/awmf-aktuell/divertikelkrankheit-/-divertikulitis).

## Validation and open checks

- Focused SSR check: PASS — `node scripts/test-divertikulitis-cdd3-render.mjs` verifies the route table in DE/EN/FA, exact curriculum link, localized CDD 3c question and flashcard.
- MCQ bank structural audit: PASS — `npm run audit:mcq` (646 questions and 18 cases per language; valid answer/option-specific explanations).
- Independent read-only review of source pages, route rows, MCQ/card alignment and DE/EN/FA delta: PASS. The reviewer confirmed the PDF pp.83–85 mapping and tests. A follow-up review confirmed the expired-guideline status wording resolves their documentation finding.
- Full Persian parity for the pre-existing lesson remains unresolved: `CONTENT.fa` previously inherited most prose from English. The new CDD table, takeaway, question and flashcard have explicit Persian text, but this patch does not claim full-route language parity.
- Real-browser/mobile/RTL inspection and Dr. Zia's scientific approval remain pending.

