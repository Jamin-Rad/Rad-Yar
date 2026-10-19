# Multiples Myelom / Plasmozytom: bounded imaging lesson

Date: 2026-10-20. Author role: delegated lesson author. Curriculum ID: `plasmozytom-myelom`. Intended route: `/msk/tumoren/plasmozytom-myelom`. Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf`, PDF pages 97–99; printed page numbers 96–98. Full pages 97–99 were rendered and visually inspected at 125 dpi; the page-98/99 figures were rerendered at 220 dpi, cropped, and visually inspected. Extracted PDF text was compared with the page images. User authorized images from supplied PDFs. This is a bounded imaging lesson, not clinical release approval.

## Learning scope and outline

Audience: radiology trainees. Learning outcome: select the imaging question for CT versus MRI, recognise the source-described osseous/marrow patterns and vertebral warning features, keep metastasis in the differential, and choose the current imaging pathway for suspected solitary bone or extramedullary plasmacytoma.

1. `choose-modality`: CT for lytic/cortical destruction, whole-body MRI for marrow patterns; no claim that this short lesson is a full work-up algorithm.
2. `read-pattern`: skull, extremities, and vertebral morphology using the actual PDF cases.
3. `marrow-and-ddx`: diffuse/focal/“salt and pepper” marrow patterns, vertebral example, and overlap with metastases.
4. `suspected-solitary`: imaging path to exclude additional disease in suspected solitary bone versus extramedullary plasmacytoma, based on 2026 IMWG recommendations; emphasizes that imaging alone cannot establish the complete diagnosis.
5. Embedded retrieval check asks which modality directly evaluates marrow before visible osteolysis; final four rules compress the lesson.

## Source coverage ledger

| ID | PDF page (printed) | Source point | Treatment / target |
| --- | --- | --- | --- |
| MM-01 | 97 (96) | Definition, age median, M-gradient, CRAB features | Deliberately out of scope; the target is imaging interpretation, not disease definition or diagnostic criteria. |
| MM-02 | 97 (96) | Whole-body low-dose CT role; “gold standard”; sensitivity thresholds vs radiography | CT role retained with current IMWG attribution in `choose-modality`. “Gold standard” and `<5%` vs `30–50%` figures omitted because source context/validity is not established by the PDF and current primary-source verification did not validate those numbers. |
| MM-03 | 97 (96) | CT: punched-out osteolysis, no matrix mineralisation/sclerotic rim; treated lesions may develop sclerosis | Morphology and treatment-related sclerosis caveat retained with explicit source-bound, non-diagnostic wording in `read-pattern`; no exclusion rule inferred. |
| MM-04 | 97–98 (96–97) | MRI sensitivity to marrow; T1-low, STIR-high; diffuse, focal, Salt-and-Pepper | Retained, but not assigned to visible panels because sequences are not labelled. MRI role independently contextualized with IMWG consensus. |
| MM-05 | 98 (97) | L-spine triptych, `rID 208317`; diffuse heterogeneous marrow and mild chronic wedge compression T11–L2 with Schmorl nodes | Cropped as `mri-spine-rid-208317.jpg`; caption preserves source description and states sequences are unlabelled. |
| MM-06 | 98 (97) | Skull “Schrotschuss” pattern; `rID 14104` | Lateral skull radiograph + axial CT crop; caption identifies modalities from visual inspection and attributes page/case. |
| MM-07 | 98 (97) | Vertebral osteoporosis-like appearance, fish vertebrae/posterior wall; malignancy concern with posterior wall or MRI soft tissue | Retained as a source-attributed warning (myeloma or metastasis), explicitly not myeloma-specific. |
| MM-08 | 99 (98) | Extremity endosteal scalloping/cortical destruction; cases `rID 12559`, `rID 9962` | Both figures cropped; caption states source labels but does not claim that each case proves myeloma. |
| MM-09 | 99 (98) | Metastases: margins may be less distinct, some sclerotic components; pedicle sign; osteoporosis differential | Retained as a short contextual differential and qualified: no single feature reliably separates myeloma/metastasis. Osteoporosis overlap appears in vertebral-pattern text; no independent diagnostic rule added. |
| SP-01 | External supplement, not in PDF: IMWG 2026 | Imaging work-up of suspected solitary bone vs extramedullary plasmacytoma | Added in `suspected-solitary`: advanced functional whole-body imaging, subtype-specific preferred modalities and limited fallback options; explicitly not a complete diagnostic algorithm. Source: [Kastritis et al., JCO 2026](https://ascopubs.org/doi/10.1200/JCO-26-00410). |

## Visual plan and provenance

The hero is an original code-native non-diagnostic schematic. Three crops from the supplied PDF provide real pattern evidence: the spine MRI triptych (`rID 208317`), skull radiograph/CT pair (`rID 14104`), and extremity radiographs (`rID 12559`, `rID 9962`). Captions distinguish what the PDF states from what is visually identified. No sequence name or image contributor/license is invented. Full details are adjacent in `public/educational/plasmozytom-myelom/image-provenance.json`.

## Independent source support added

- Hillengass et al., International Myeloma Working Group consensus on imaging in monoclonal plasma cell disorders, *Lancet Oncology* 2019;20(6):e302–e312, PMID 31162104, DOI 10.1016/S1470-2045(19)30309-2. Supports modality selection across disease stages; used to avoid presenting low-dose CT as an unqualified universal “gold standard.”
- Moulopoulos et al., IMWG Bone Working Group recommendations on whole-body low-dose CT, *Blood Cancer Journal* 2018;8:95, DOI 10.1038/s41408-018-0124-1. Supports its role in bone disease assessment and technical interpretation.
- Kastritis et al., International Myeloma Working Group Recommendations for the Diagnosis and Management of Solitary Plasmacytomas, *Journal of Clinical Oncology* 2026;44(25):2447–2459, PMID 42485589, DOI 10.1200/JCO-26-00410. Used only for the imaging pathway: advanced functional whole-body imaging at diagnosis; WB-MRI (DWI) and/or FDG-PET/CT pathways, with distinct preference for PET/CT in extramedullary presentations. Full disease criteria and therapy are out of scope.

## QA state and limits

- `editorial_qa`: independent source/content/language/media review and two delta checks passed, including the 2026 imaging pathway and Persian subtype label.
- `scientific_review`: primary imaging consensus sources linked for modality role; full claim-level clinical review by an independent clinician pending.
- `browser_qa`: pending; SSR verifies translated markup and RTL attributes only. No desktop/mobile/theme visual browser pass is claimed.
- `publication`: curriculum route linked after independent review; browser visual review and clinician sign-off remain open.

The original PDF uses some older and overstated language. Exact sensitivity percentages, the “gold standard” label, and general diagnostic criteria were excluded. The added plasmacytoma section describes the imaging assessment of suspected solitary bone/extramedullary lesions; it does not apply full IMWG classification criteria or prescribe management. The Persian terms distinguish solitary bone plasmacytoma (`پلاسماسیتوم منفرد استخوانی`) from the soft-tissue/extraosseous subtype (`پلاسماسیتوم منفرد خارج از مغز استخوان (بافت نرم)`). The pelvis image caption now stays within what the PDF labels at section level and makes no case-specific finding. Persian labels render `Kalvarium` as skull vault and translate endosteal scalloping. Source figures may be blurry at phone widths and should be visually checked in the live lesson by the independent reviewer.
