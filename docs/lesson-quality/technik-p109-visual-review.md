# Technik.pdf p.109 visual addition — source ledger and review status

Date: 2026-10-19
Route: `/technik/grundlagen`, existing `mrt` section
Authoring status: implemented and pushed to main
Independent source/translation review: **pass, scoped to the two crops and label maps**

## Source coverage and visual ledger

| Source point | Source and page | Lesson location | Status | Notes |
| --- | --- | --- | --- | --- |
| Dixon fat-only / water-only reconstructions; in-phase / opposed-phase comparison; dark interface outline (“India ink” / chemical-shift effect) | `Technik.pdf`, PDF p.109, printed folio 108; figure “Übersicht Dixon und In-Phase/Out-of-Phase” | `/technik/grundlagen` → `mrt`, bilingual/three-language Dixon rows and `public/technik/dixon-technik-p109.png` | Implemented from source crop | Original labels and arrow retained. Caption explains what the image demonstrates without inferring a diagnosis from the outline. |
| Frequency-selective fat suppression, STIR and Dixon examples; axial in-/opposed-phase left adrenal lesion with signal drop; source interpretation | `Technik.pdf`, PDF p.109, printed folio 108; figure “Übersicht fettsupprimierende Techniken” | `/technik/grundlagen` → `mrt`, comparison row and `public/technik/fat-suppression-technik-p109.png` | Implemented from source crop | Original labels and arrow retained. Caption attributes “compatible with adrenal adenoma” to the PDF and explicitly says this is not an independent diagnosis. |

## Asset provenance

Both PNG assets are direct page-region crops from the user-authorized `Technik.pdf` (PDF p.109, printed page number 108), rendered at 1800 px long edge with Poppler and cropped without altering the radiology frames. The page figures show the source imprint “LernRad”; this is retained in the crops. The crops preserve each panel title, sequence labels, arrows and source captions. Crop boxes from the rendered page were `(312,54,960,929)` for the Dixon comparison and `(257,928,1017,1645)` for the fat-suppression comparison. Temporary full-page render: `tmp/pdfs/technik-p109-current-109.png` (remove after completing visual QA).

## Author self-check (not independent acceptance)

- Confirmed against the rendered source page that both comparisons and the left adrenal example are present on p.109 / printed folio 108.
- Confirmed each crop retains its heading, labels and arrows and reads at the native rendered size.
- Added DE/EN/FA alt text and captions; the source interpretation is attributed rather than repeated as an established diagnosis.
- Independent review finding LNG-P2: German headings and captions embedded in the crops remained visible to EN/FA readers. Repair: added a localized legend beneath each unchanged crop; each material source label is shown verbatim and paired with a DE/EN/FA explanation. The independent retest confirmed all material labels are covered and correctly paired.
- Added the source page to the MRT section extent and lesson source statement.
- Browser layout, all three rendered language versions, mobile behavior, linked assessments and scientific interpretation have **not** been independently reviewed in this task.

## Independent reviewer handoff

Use the standard review template and inspect the live rendered route in DE/EN/FA. Verify image legibility and responsive layout, RTL figure behavior, source-caption attribution, translation parity and the precise anatomy/interpretation stated by the PDF. Check whether the existing MRI assessment bank needs a Dixon/fat-suppression retrieval item. Do not treat this author self-check or the source's case label as scientific validation.

| Gate | Current status | Evidence / remaining action |
| --- | --- | --- |
| SRC | REVISE | Selected p.109 visual points are source-mapped and shown; full PDF coverage remains outside this scoped change. |
| EDU | Pending independent review | Compact comparison added in the existing MRT teaching unit; reviewer to check flow and cognitive load. |
| VIS | Pending independent review | Two source crops integrated; reviewer must inspect actual route rendering and mobile readability. |
| LNG | PASS for code-level label parity | Independent review confirmed all material baked-in German labels map to localized DE/EN/FA explanations under the corresponding crop, with `<bdi dir="auto">` around source labels. Runtime RTL rendering remains untested. |
| ASM | Pending | No assessment changes in this task; reviewer to assess whether the existing checks meaningfully test this addition. |
| UX | Pending | Browser and mobile checks were not performed. |
| REV | PASS, bounded independent source/translation review | Reviewer retested both label maps and confirmed correct association and semantic coverage. Browser, responsive layout, clinical approval and full lesson coverage remain open. |

