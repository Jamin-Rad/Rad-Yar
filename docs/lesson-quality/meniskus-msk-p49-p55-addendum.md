# Meniscus lesson addendum — MSK.pdf pp.49–55

Scope: bounded source additions to the existing `/msk/knie/meniskus` lesson. The PDF pages below were inspected as text and rendered page images. Page numbers distinguish physical PDF position from the printed page footer.

| Key | Source point | Lesson disposition | Visual / limits |
| --- | --- | --- | --- |
| MEN-49-01 | MSK.pdf physical p.49 / printed p.48: parrot-beak tear combines radial and longitudinal morphology; curved course changes capsule distance across sagittal slices (wandering effect) | Added under existing tear-types chapter; tells learners to follow adjacent sagittal slices | Source crop from p.49 included; describes morphology, no treatment claim. |
| MEN-50-01 | MSK.pdf physical p.50 / printed p.49: displaced bucket-handle fragment lies in the intercondylar notch; double-PCL sign may be present | Added as a concise pattern card in the tear-types chapter; learners are asked to identify the fragment directly and correlate across planes | Source crop retains the sagittal/coronal/axial examples and simplified source schema. The PDF's “pathognomonic” claim is narrowed: a double-PCL sign is highly specific but can be mimicked; no single sign replaces anatomic correlation. |
| MEN-51-01 | MSK.pdf physical p.51 / printed p.50: posterior horn displaced anteriorly; double-anterior-horn and empty-posterior-horn signs | Added as a separate DE/EN/FA pattern card and one connected retrieval MCQ/flashcard | Source crop retains sagittal examples and source schema. The empty native posterior horn is included as a supporting sign; an anterior-horn variant remains a stated pitfall. |
| MEN-52-01 | MSK.pdf physical p.52 / printed p.51: transverse ligament connects anterior horns; attachment can mimic vertical lateral anterior-horn tear sagittally; trace axially | Added as localized pseudotear item in existing MRI chapter | Page image crop shows the source examples and ligament label. |
| MEN-52-02 | MSK.pdf physical p.52 / printed p.51: Humphrey runs anterior and Wrisberg posterior to PCL; vertical posterior-horn signal can mimic lateral meniscal tear; trace across sagittal slices | Added as localized pseudotear item in existing MRI chapter | Separate source crop preserves the labelled examples. |
| MEN-54-01 | MSK.pdf physical p.54 / printed p.53: direct sign is discontinuity near the tibial insertion; insertional marrow edema may occur | Added under MRI chapter with a source crop of root examples | PDF's statement that pressure increase leads to rapid OA was narrowed. Allaire et al. tested nine fresh-frozen cadaver knees and measured a 25% medial-compartment peak contact-pressure increase after medial posterior-root tear. This provides biomechanical rationale only; it does not establish clinical cartilage damage, OA risk, or clinical course. [Primary biomechanical study, PubMed](https://pubmed.ncbi.nlm.nih.gov/18762653/). |
| MEN-55-01 | MSK.pdf physical p.55 / printed p.54: traumatic meniscocapsular detachment usually at medial posterior horn; often ACL-associated; blurred junction, meniscofemoral/meniscotibial attachment discontinuity and posteromedial tibial plateau bone bruise | Added as a compact MRI-pattern item | Source page crop included; signs are interpreted together, and no isolated signal is presented as diagnostic. |

## Media and structure

The page excerpts were rendered directly from the user's MSK.pdf at 210 dpi using page-specific PDF crop boxes, retaining the source MRI panels and diagrams without adding labels. Captions name the physical and printed page. The additions are placed inside the existing MRI and tear-type chapters; no new route or chapter was introduced. The root-tear biomechanical claim is attributed to the primary cadaveric study and explicitly qualified. The double-PCL discussion is additionally cross-checked against Helms et al. (PMID 12719929) and the published pitfalls report (PMID 19234702); the flipped-meniscus description is cross-checked against Haims et al. (PMID 8316871).

## Validation

- Focused regression: `node --import tsx scripts/test-meniscus-pdf-p49-p55.mjs`.
- Focused p.50–51 regression: `node --import tsx scripts/test-meniscus-pdf-p50-p51.mjs`.
- Three-language strings, source page mapping, referenced crop assets and the root-tear evidence link are checked by the focused test.
- This bounded change does not validate the rest of the meniscus lesson clinically or establish browser/device QA. Those remain separate review gates.
- Independent p.50–51 delta review passed source mapping, crop integrity, DE/EN/FA wording, diagnostic caveats, and MCQ/flashcard wiring. Focused p.50–51 and existing p.49–55 regression tests passed. Browser/device QA and Dr. Zia's clinical sign-off remain open.
