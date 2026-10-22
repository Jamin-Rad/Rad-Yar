# Pediatric fractures: MSK.pdf pp. 5–9 coverage update

## Scope and mapping

This is a bounded imaging-focused update to the existing `/msk/trauma/frakturen-kindesalter` lesson (curriculum ID `frakturen-kindesalter`). It maps the source PDF's physical pages; printed page numbers are one lower.

| Source | Points represented in lesson | Disposition |
|---|---|---|
| MSK.pdf p.5 (printed 4) | Salter–Harris I–V fracture paths; indirect physeal widening; III/IV articular extension; subtle initial type V and possible later physeal narrowing | Source morphology represented; prevalence/outcome percentages and treatment claims omitted |
| p.6 (printed 5) | Torus cortical buckling without complete cortical disruption; greenstick one cortex disrupted/opposite side bent; view-dependent visibility | Morphology represented in lesson/table and assessments |
| p.7 (printed 6) | Toddler fracture: oblique/spiral distal tibial shaft pattern, typical walking toddler context, AP/lateral imaging and sometimes initially occult; source cases rID 65820 and 89402 | Existing PDF images retained with page/case captions; no contributor or external-license claim inferred |
| p.8 (printed 7) | Follow-up periosteal reaction; transitional physeal closure and Tillaux case rID 168812 | Follow-up imaging represented; source treatment recommendation omitted |
| p.9 (printed 8) | Triplane fracture planes and projection-dependent appearance; separate two-plane pattern; rID 33599 radiograph/CT | Three-plane and two-plane morphology represented; source case images retained with exact source attribution |

## Clinical source checks

The lesson avoids treatment protocols and fixed operative thresholds from the older PDF. Imaging phrasing was checked against current official guidance: [RCH tibial shaft fracture guideline](https://www.rch.org.au/clinicalguide/guideline_index/fractures/tibial_shaft_emergency/) (initial normal films, AP/lateral including adjacent joints, oblique views and follow-up periosteal reaction) and [RCH distal tibia/fibula physeal fracture guideline](https://www.rch.org.au/clinicalguide/guideline_index/fractures/ankle_emergency/) (transitional fracture morphology and conditional CT). Torus/greenstick definitions follow morphology in the PDF and [BSCOS fracture templates](https://www.bscos.org.uk/Portals/0/downloads/resources/BSCOS%20modifiable%20fracture%20templates.pdf).

## Visual provenance

Existing case frames from the user-authorized MSK.pdf are reused only where they teach morphology. The lesson does not assert that PDF reuse authorization establishes external Radiopaedia licensing or contributor identity; visible case IDs are recorded as identifiers only. No diagnostic image was altered. The added two-plane text is a textual morphology comparison, not a diagnostic schematic.

## QA state

DE/EN/FA content and Persian RTL are checked by the focused script. Automated checks cover source-backed morphology, localized two-plane retrieval practice, legacy management-claim removal, route rendering source, and image references. Browser/device interaction QA remains separate from SSR/static checks.

## Independent-review corrections

- The lesson describes Torus/Greenstick patterns as far more common in children, not absent in adults.
- Removed the p.6 lateral frame from the Torus gallery because its visible cortical interruption conflicts with the Torus teaching point.
- The toddler AP caption no longer claims an arrow or marked fracture line; it identifies the frame as an initial view and notes that the fracture can be subtle/occult.
- Type V is described as often recognized retrospectively and potentially visible on follow-up, without making growth arrest a prerequisite for initial suspicion.
- Type II outcome wording is qualified as generally/usually favourable.
- Added visible localized source links and localized text equivalents for labels embedded in the Salter–Harris, shaft-pattern and triplane schemas.

## Independent review round: assessment, media labels, and navigation

The independent reviewer identified an AP ankle frame mislabeled as a second lateral view, an invalid “highest risk” Salter–Harris question, an English mnemonic diagram spelling “SALTE R” against the lesson's SALTR mnemonic, a German hero-card typo, and a chapter navigation state that could land on a closed section. The reviewer also flagged unsupported numeric remodelling rules and overgeneralized child-protection assessment wording in a linked question/card.

Corrections made and independently re-reviewed: the image file/reference/caption now identify the AP projection; the growth-risk ranking question now asks the objective Type IV morphology; the Salter–Harris picture is replaced by a simplified SVG showing Type I–V paths without a conflicting mnemonic; the hero label reads “Okkulte Fraktur”; chapter sections remain open on first load and TOC navigation expands a manually closed destination; numeric remodelling thresholds are removed in favor of explicit contextual dependencies; safeguarding wording requires assessment with age, development, history, and the total findings and states that one fracture type alone is not diagnostic. The AAP 2025 clinical report and RCH physeal-injury reference were added as localized sources. The final independent static review found no remaining blocker in these deltas.

Focused DE/EN/FA source test, p.10 source test, global MCQ audit, and `git diff --check` pass after these edits. Static checks do not replace browser checks. Browser interaction, RTL page rendering, and scientific approval remain open until directly verified.
