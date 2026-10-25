# Distalradius09: full original assessment pool

Author reading and source check:2026-10-25. Route: `/msk/trauma/distale-radiusfraktur`.
Scope: all12 original MCQ triads and15 flashcard triads in `data/distale-radiusfraktur.js`; narrow lesson mirrors. No shared bank or route edits. No new IDs or quota-driven questions. This is not whole-route scientific, visual or browser acceptance.

## Source and learning map

| Evidence actually read | Coverage / assessment IDs | Disposition |
| --- | --- | --- |
| User MSK.pdf physical17/printed16; fresh extracted text plus page image `tmp/msk-inventory/distal-radius-remediation-017.png` | Fernandez I–V, metaphyseal bending, rim shear, central lunate-fossa depression, avulsion, combined high-energy morphology; questions `colles`, `smith`, `barton`, `fernandez-ii`, `fernandez-iii`; cards01–05 | Kept mechanism distinctions; vignette questions teach relationships rather than eponym alone. Original paired source strips retained. |
| User MSK.pdf physical18/printed17; fresh extracted text plus page image `tmp/msk-inventory/distal-radius-remediation-018.png` | Colles/Smith/Barton comparison, radial-styloid avulsion/Chauffeur, SL and lunate associated injuries; question `chauffeur`; cards01–03/06/10–11 | Kept explicit PDF avulsion terminology; central impression now correctly localizes to the radius, not the lunate. Case88989 remains an assessment prompt, not an asserted diagnosis. |
| [AAOS original2020 guideline](https://www.aaos.org/globalassets/quality-and-practice-resources/distal-radius/distal-radius-fractures-10-13-2020.pdf), indications for fixation, and [authors' guideline summary](https://pmc.ncbi.nlm.nih.gov/articles/PMC9196973/) | Questions `step`; cards09/12; diagnostic table, instability item and treatment item | Replaced universal ≥2-mm treatment rule with postreduction >2-mm context in nongeriatric patients; age reflects functional demand. Intra-articular involvement alone is no automatic surgical order. Removed unsupported universal >20° instability threshold. Source pages17–18 contain no corresponding number; no PDF claim silently overridden. |
| [Ghafoor et al. original cohort, measurement methods, Fig4/Table1](https://pmc.ncbi.nlm.nih.gov/articles/PMC9038308/) | `tilt`, cards07–08/12–15; radial-length/variance row | Measurement geometry, approximate reference with physiological/projection variation, CT-based planning and implant/tendon follow-up. Ulnar variance no longer universally required neutral/negative or treated as proof of TFCC injury. |
| [AO volar-rim fracture assessment](https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/distal-forearm/partial-articular-fracture-of-the-radius-involving-the-volar-rim/orif-palmar-plate), Ghafoor CT-based approach selection | `ct`, cards05/14 | CT selected to map complex bony articular fragments; MRI/ultrasound distractors concern the same wrist question but do not answer this planning task. This is not a blanket CT requirement for every fracture. |
| [Jones et al. original radiographic study](https://pmc.ncbi.nlm.nih.gov/articles/PMC4641076/), [Lans et al.2018 original contralateral-wrist comparison](https://pubmed.ncbi.nlm.nih.gov/29456778/) | `sl`, card10 | >3 mm retained only as rough orientation; comparison, projection and other carpal features matter. Isolated positive ulnar variance is not SL dissociation. |
| [Primary lunate dislocation with operative median-nerve confirmation](https://pmc.ncbi.nlm.nih.gov/articles/PMC5221394/), [two acute primary cases](https://pmc.ncbi.nlm.nih.gov/articles/PMC7861191/) | `lunate`, `urgent`, cards11/15; associated-injury caveat | Lunate itself tilts out of radial fossa; compare dorsal perilunate preservation of radiolunate alignment. Progressive median symptoms require urgent specialist escalation; complications are risks, not inevitable immediate outcomes. |

PDF pages17–18 are fully legible in the rendered images; extracted text omits the visual comparison and paired strips, which were therefore read visually. Those pages cover morphology and associated injuries only. Measurements, follow-up and management are marked supplemental with distinct primary evidence. The previous ledger `docs/lesson-quality/source-ledgers/distale-radius-msk-p17-p18.md` is a historical bounded pass and does not claim those supplements were validated then.

Four observable goal groups with real IDs are in `distal-radius-blueprint.json`. The existing8 chapter titles and each purpose were recorded before the producer edit; no new chapter, illustration, route or shared shell changes. No generated diagnostic images. Existing media contributor/full-study verification for case88989 remains pending; this packet does not resolve it.

## Full-pool findings and changes

All36 original localized question objects and all15 trilingual card objects were read, not only prior deltas. All12 question concepts now have three option-specific wrong explanations in DE/EN/FA. `colles`, `smith`, `step`, `lunate`, `ct` and `urgent` use explicit text vignettes or clinical decisions; `barton` and mechanism classification retain useful focused retrieval. Distractors now represent alternative wrist morphology, measurement, modality or urgency interpretations. Original IDs, question count, four-option structure, correct letters and card IDs are stable.

Independent first-reading findings were applied before re-review: step now compares four neutral threshold/timing/population criteria; CT now compares targeted oblique radiography and tendon/soft-tissue ultrasound instead of explicitly incomplete examinations. Chauffeur is universally defined by intra-articular radial-styloid morphology; the PDF avulsion wording remains explicitly source-attributed because the [AO radial-column original reference](https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/distal-forearm/partial-articular-sagittal-multifragmentary-radial-fracture-involving-scaphoid-fossa/orif-radial-column-plate) also describes shear/compression mechanisms. The lesson, question and card are synchronized, and the old focused test now checks morphology plus marked PDF terminology. Card11 and its lesson mirror explicitly specify dorsal perilunate dislocation. Re-review is pending; these changes are not author self-acceptance.

All15 cards were checked; clinically adequate pattern cards retained their content and gained source metadata. Cards07/08 teach measurement rather than isolated normal-value recall;09 teaches the threshold's scope;12 teaches interval change and stability assessment without a rigid single-number rule;15 separates urgent symptoms from follow-up. No card was added solely because the lesson contains a sentence.

DE/EN/FA comparison included direction, structure, negation, certainty, postreduction timing, > versus ≥,2/3 mm,10°, age/function context, modality and urgency. Shared terminology: `Gelenkstufe / articular step / پلهٔ مفصلی`; `Radiuspfanne / radial fossa / فوسای رادیوس`; `Fossa lunata / lunate fossa / فوسای لونیت`; `DRUG / DRUJ / DRUJ`; `postreduktionell / after reduction / پس از جااندازی`. Geometry now distinguishes a radius lunate-fossa depression from a lunate dislocation.

## Consumers and verification

Actual producer exports are imported by `data/questions.js` and `data/flashcards.js`; real route imports the lesson export. `app/ueben/quiz/page.jsx` remaps option-specific feedback along with shuffled letters. CAA active source is `data/caaLesson.js`; `/andarun/test/page.js` retains its access gate. They inform clarity/shell, not this topic outline. No access change.

- Existing `node scripts/test-distale-radius-msk-p17-p18.mjs`: PASS after initial implementation (DE/EN/FA source alignment and retained IDs/media references).
- Full original-pool structural/ID/feedback and before/after checks: see `distal-radius-author-runtime.json`.
- Root owns actual global retrieval, SSR, build and browser validation. Author ran no build/server and no browser session. No claim of browser/RTL rendering acceptance.
- Independent review requested from Root; pending. Scientific review: Dr.Zia pending. Publication controlled by Root; no author commit or push.

## Review gates for handoff

SRC/EDU/LNG/ASM: author evidence ready, independent decision pending. VIS: unchanged assets; case88989 contributor/study provenance still unresolved. UX: new strings require actual browser evidence from Root; no auth bypass. REV: pending independent fresh review. Do not infer any pass from curriculum status, build, or this author report.
