# HRCT architectural patterns — Thorax.pdf pp.22–23

Date checked: 2026-10-23. Route: `/thorax/hrct/architekturmuster`.
Authoring change: honeycombing range/wording, linked assessment wording and image source metadata.

## Coverage and outline

Teaching path: (1) honeycombing morphology in fibrotic architectural distortion; (2) separate the three mechanisms of mosaic attenuation using density, vessel calibre and expiratory persistence; (3) recognize crazy paving as the combination of GGO and smooth septal thickening, then use distribution and clinical context for the differential.

| Point | Source/page | Importance | Lesson location | Disposition / evidence |
| --- | --- | --- | --- | --- |
| Honeycombing: adjacent, polygonal, mostly subpleural cystic spaces; usually 3–10 mm, occasional size up to 25 mm in PDF | Thorax.pdf physical p.22 / printed p.21 | Essential | Honeycombing morphology and linked assessment | Included; current guideline range corroborates 3–10 mm up to 2.5 cm. Wall thickness and layering are variable; avoid turning the slide's smooth-border description into a rigid rule. |
| Destruction of architecture and fibrosis context | Thorax.pdf p.22 / printed p.21 | Essential | Lead and context card | Included; ATS/ERS/JRS/ALAT 2022 describes honeycombing as clustered cystic spaces in fibrotic pattern assessment. |
| Mosaic attenuation has interstitial/alveolar, small-airway and vascular mechanisms | Thorax.pdf p.22 / printed p.21 | Essential | Three mechanism cards | Existing coverage retained. |
| Expiratory persistence and vessel calibre help distinguish air trapping/vascular causes | Thorax.pdf p.22 / printed p.21 | Essential | Mosaic cards and linked assessment | Existing coverage retained; expiratory acquisition is an interpretive aid, not a standalone cause. |
| Crazy paving combines GGO with smooth inter- and intralobular septal thickening; geographic margins | Thorax.pdf p.23 / printed p.22 | Essential | Crazy-paving lead/image | Included; PDF calls PAP the classic association and uses historical “pathognomonic” phrasing. Lesson preserves the current nonspecific-pattern caveat. |
| Crazy-paving differential includes infection, oedema, haemorrhage, ARDS and tumour | Thorax.pdf p.23 / printed p.22 | Essential | Differential card and cave | Existing coverage retained. |

Source pages p.22 and p.23 were inspected as page images as well as extracted text. No unreadable table/diagram text identified in these panels.

## Scientific references checked

- Raghu et al., ATS/ERS/JRS/ALAT guideline update (2022), honeycombing definition and imaging context: [PMC9851481](https://pmc.ncbi.nlm.nih.gov/articles/PMC9851481/). The guideline gives clustered cystic spaces typically 3–10 mm and up to 2.5 cm; therefore the PDF's 25 mm upper size is consistent. It also permits variable layering and emphasizes pattern context.
- Fleischner Society glossary (2024), honeycombing morphology and variable cyst size/wall: [PMC10902601](https://pmc.ncbi.nlm.nih.gov/articles/PMC10902601/).
- ATS quick hit on crazy paving: [pattern is not specific to PAP](https://site.thoracic.org/assemblies/cp/ats-quick-hits/a-ct-finding-no-longer-zebra-specific).
- Mosaic attenuation review: [Radiographics review](https://pubs.rsna.org/doi/full/10.1148/rg.2015140308), including the role of expiratory imaging and vessel calibre.

## Visual plan and provenance

| Goal | Asset | Source match | Reuse/provenance status |
| --- | --- | --- | --- |
| Explain honeycomb-like subpleural cystic morphology | `/public/hrct/architekturmuster/image24.png` | Mnemonic schematic; not patient imaging | Locally authored asset; reviewed for relevance. |
| Show honeycombing | `image25.jpeg`, Radiopaedia rID 35820 | Visually matches honeycombing CT panel on PDF physical p.22; visible caption directs attention to adjacent subpleural cysts and fibrotic architecture | User granted use of supplied PDF assets and Radiopaedia images. Case contributor, study/frame details, and local-file derivation are not independently recorded; metadata is disclosed in an expandable source note. |
| Show mosaic attenuation | `image26.jpeg`, Radiopaedia rID 14799 | Visually matches mosaic CT panel on PDF physical p.22; visible caption asks learner to compare attenuation and vessel calibre | Same unresolved attribution/frame details, disclosed in source note. |
| Show crazy paving | `image27.jpeg`, Radiopaedia rID 63668 | Visually matches crazy-paving panel on PDF physical p.23; visible caption identifies GGO plus smooth septa | Same unresolved attribution/frame details, disclosed in source note. |

Visible captions now give a concise reading task in DE/EN/FA. An expandable source note retains physical/printed PDF page, Radiopaedia rID and the unresolved attribution/frame caveat. The web case pages did not return usable source details in the current review; do not infer contributor, sequence, or frame from the rID alone.

## Assessments and translation

The compact MCQ facts and generated cards for `hrct-architekturmuster` are linked by exact topic id and are emitted in DE/EN/FA. Honeycombing now includes the PDF size range and avoids a mandatory thick-wall claim. Cards for this topic ask for the described feature and explicitly leave cause interpretation to distribution and clinical context, avoiding an overconfident generic association prompt. An embedded translated self-check contrasts vascular mosaic with expiratory air trapping and interstitial GGO; feedback notes that hypoventilation can also reduce apparent vessel calibre, so the finding supports rather than proves a cause. The honeycomb mnemonic has no empty source disclosure; provenance is shown only for source-traceable CT assets. Automated checks verify the captions, source metadata, size range, MCQ translations and flashcard semantics.

## Review state

| Gate | State | Evidence / remaining work |
| --- | --- | --- |
| SRC | PASS (author check) | PDF p.22–23 inspected; claims cross-checked to linked references. |
| EDU | PASS | Independent re-review closed the self-check finding; pattern path and discriminating feedback are acceptable in source. |
| VIS | BLOCKED | PDF panel matches and guided captions are verified. Radiopaedia contributor/study/frame and local asset derivation could not be checked, so source-image provenance remains incomplete. |
| LNG | PASS | Author and reviewer found DE/EN/FA text counterparts; rendered RTL remains unverified under UX. |
| ASM | PASS | Independent re-review closed the self-check finding. Topic MCQs/cards and exact retrieval pass focused script and repository audits. |
| UX | BLOCKED | SSR confirms localized content and topic schematic markup; the Browser plugin is unavailable, Playwright is not installed, and a local preview did not connect. No rendered interaction/language/theme matrix captured. |
| REV | PASS | Separate reviewer checked the original work and re-reviewed both corrections; no supported code correction remains. |

Dr. Zia clinical approval: pending. Publication/release approval: not inferred. Overall lesson acceptance remains blocked on VIS provenance and browser UX evidence.
