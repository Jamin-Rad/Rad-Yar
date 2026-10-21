# Wrist extensor compartments and De Quervain — MSK.pdf pp.40–43

## Scope and learning plan

- Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf`, physical pages 40–43; printed folios 39–42.
- Intended audience: radiology learners familiar with axial MRI anatomy.
- Learning outcome: orient the six dorsal wrist extensor compartments on an axial MRI, localize the first compartment, and describe the PDF's De Quervain MRI pattern.
- Existing route: `/msk/hand/de-quervain` (`de-quervain`). Added focused standalone orientation route `/msk/hand/strecksehnenfaecher` for the curriculum topic `sehnenpathologien-hand`; central curriculum/assessment links remain for coordinator integration.
- Exact chapter outline for the separate orientation route:
  1. **Wo liegen die Fächer im axialen Bild? / Where are the compartments on an axial image?** Orient radius, ulna, Lister tubercle and the numbered compartments using the source MRI.
  2. **Welche Sehnen verlaufen durch die sechs Fächer? / Which tendons pass through the six compartments?** Compare all six tendon groups and one source-listed landmark each; include the VI/ECU retrieval check here.
  3. **Vier Orientierungspunkte / Four orientation points.** Consolidate the spatial map without introducing new anatomy.
- De Quervain route retains its existing clinical/MRI sequence; a PDF p.43 real MRI pair is added to the findings section and linked to the compartment orientation lesson.

## Page-by-page source coverage

| ID | Physical / printed page | Source point | Importance | Lesson location and disposition |
|---|---|---|---|---|
| WR-01 | 40 / 39 | Dorsal carpal bones and joint spaces | Supporting | Full carpal-bone inventory is outside this focused extensor-compartment task; radial/ulnar orientation is covered by the p.41 axial image and tendon landmarks. Source page was visually inspected. |
| WR-02 | 41 / 40 | Compartments I–VI and tendon contents: I APL/EPB; II ECRL/ECRB; III EPL; IV EDC/EIP; V EDM; VI ECU | Essential | Included in a localized six-row table on `/msk/hand/strecksehnenfaecher`. |
| WR-03 | 41 / 40 | Spatial landmarks: I at radial styloid; II separated from III by Lister tubercle; III turns around Lister tubercle; IV largest; V over distal radioulnar joint; VI in a separate groove at ulnar styloid | Essential | Included in table/caption. The p.41 annotated axial MRI is shown as a source image for orientation, not as a diagnostic case. |
| WR-04 | 41 / 40 | Two axial distal-forearm/wrist MRI views with numbered compartments and tendon labels | Essential visual | One source MRI frame is cropped from the PDF for the orientation lesson; translated caption/alt and source page are shown. Sequence/field strength are not stated by the source and are not inferred. |
| WR-05 | 42 / 41 | De Quervain: stenosing tenosynovitis of the first compartment, APL/EPB, radial pain, named provocation manoeuvre, MRI sequences and findings | Essential | Existing `/msk/hand/de-quervain` lesson already maps these points. No clinical thresholds or management are added. |
| WR-06 | 43 / 42 | Two axial PD-FS MRI images with arrows at APL/EPB; source text describes thickening and pathologically increased intratendinous fluid signal, additional sheath fluid, and radial/subcutaneous oedema/fluid signal | Essential visual | Both source panels are cropped as a paired image and added to the existing findings section. Caption reports the source description and does not claim either single panel proves a diagnosis. |
| WR-07 | 40–43 | Page order and image/table relationship | Source integrity | All four pages were rendered at 300 dpi and inspected visually. Printed folio is one less than physical PDF page. No unreadable table cells were identified in the relevant rows. |

## Media record

| Goal / route | Asset | Source and selection | Accessibility / limitation |
|---|---|---|---|
| Orient dorsal wrist extensor compartments, lesson hero | `/educational/wrist-extensor-compartments/hero.svg` | Original code-authored language-neutral schematic derived from the compartment relationships shown on MSK.pdf p.41 / printed p.40. It labels six groups around a simplified radius/ulna; it is explicitly non-diagnostic and does not depict a patient. | Translated hero alt identifies it as a non-diagnostic orientation schematic. |
| Teach image-based orientation, new lesson | `/msk/hand/extensor-compartments-pdf-p41-axial-mri.png` | Cropped from supplied MSK.pdf p.41 / printed p.40, lower axial MRI view. The numbering and APL/EPB/ECRL/ECRB/EPL/EDC/EIP/EDM/ECU labels are retained. It is anatomy orientation, not a pathology case. User explicitly authorized reuse of PDF images. The crop is shown once in the first section and is not reused as the hero. | DE/EN/FA alt and caption explain the source page and use radius/ulna, Lister tubercle and Roman numerals for orientation. No sequence or patient details are inferred. |
| Show a source-described De Quervain MRI pattern, existing lesson | `/msk/hand/de-quervain-pdf-p43-pd-fs-pair.png` | Both PD-FS axial panels from supplied MSK.pdf p.43 / printed p.42, preserving the source arrows and “APL & EPB” labels. User explicitly authorized reuse of PDF images. | DE/EN/FA alt/caption localize the source image, translate the source's stated findings and avoid asserting that the image alone establishes diagnosis. |

## Terminology

| Concept | DE | EN | FA |
|---|---|---|---|
| Extensor compartment | Strecksehnenfach | extensor compartment | کمپارتمان اکستانسور |
| Abductor pollicis longus | M. abductor pollicis longus (APL) | abductor pollicis longus (APL) | عضلهٔ abductor pollicis longus (APL) |
| Extensor pollicis brevis | M. extensor pollicis brevis (EPB) | extensor pollicis brevis (EPB) | عضلهٔ extensor pollicis brevis (EPB) |
| Lister tubercle | Lister-Tuberkulum | Lister tubercle | تکمهٔ لیستر |
| Extensor digitorum | M. extensor digitorum (EDC) | extensor digitorum (EDC) | عضلهٔ extensor digitorum (EDC) |
| Extensor digiti minimi | M. extensor digiti minimi (EDM) | extensor digiti minimi (EDM) | عضلهٔ extensor digiti minimi (EDM) |
| Extensor carpi ulnaris | M. extensor carpi ulnaris (ECU) | extensor carpi ulnaris (ECU) | عضلهٔ extensor carpi ulnaris (ECU) |

## Checks and open gates

- Source image assets and text were directly compared with the 300-dpi page renders; assets are crops of user-provided PDF pages with no new annotations.
- The De Quervain threshold language and manoeuvre nomenclature review remain governed by the existing [p.40–42 ledger](de-quervain-msk-p40-p42.md); this batch introduces no new thresholds or management advice.
- Central assessment/cards and curriculum route metadata for `sehnenpathologien-hand` remain coordinator integration work. Minimum route registry change: add `link: '/msk/hand/strecksehnenfaecher'` to the existing `sehnenpathologien-hand` topic in `data/curriculum.js`; do not attach quiz/card IDs without coordinator-approved, lesson-consistent items.
- Local browser/RTL/device interaction checks and independent review are pending. Image hosting/access after deployment is not established by these source-crop checks. Scientific/clinical approval remains with Dr. Zia.
