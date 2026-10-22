# De Quervain — source and teaching ledger (updated for MSK.pdf pp.40–43)

## Scope and learner outcome

- Curriculum topic: `de-quervain`; route `/msk/hand/de-quervain` is linked and marked `inProgress`.
- Audience: radiology learners; German is the source language, with English and Persian parity.
- Outcome: localise the first extensor compartment, select the MRI sequences noted in the source, and describe tendon, sheath and adjacent-tissue findings without treating a provocative clinical manoeuvre as proof.
- Status remains `inProgress`; editorial, scientific and browser approval are pending.

## Source review and coverage

Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf`. Physical PDF pages 40–43 were rendered at 300 dpi and visually inspected; printed page numbers are 39–42. Text extraction was compared with the page images.

| Point | PDF page / printed page | Importance | Lesson location | Status |
| --- | --- | --- | --- | --- |
| Dorsal carpal bone orientation, including scaphoid/radial side | 40 / 39 | Supporting | Topic diagram and localisation wording | Condensed; full carpal anatomy out of scope |
| First extensor compartment contains APL and EPB and lies over the radial styloid | 41 / 40; 42 / 41 | Essential | Intro, schematic and MRI findings | Included |
| Stenosing tenosynovitis; synonyms “housemaid’s/gamekeeper’s/SMS thumb” | 42 / 41 | Supporting | Intro | Core definition included; colloquial synonyms omitted as low-value |
| Radial snuffbox/fossa pain with thumb movement | 42 / 41 | Essential | Clinical pattern | Included |
| Thumb-in-fist plus ulnar deviation manoeuvre, labelled “Finkelstein” in PDF | 42 / 41 | Essential caveat | Clinical pattern | Included with nomenclature caveat; no standalone diagnostic claim |
| PD-FS or T2-FS for oedema/fluid | 42 / 41 | Essential | MRI workflow | Included |
| T1-weighted anatomy/tendon structure | 42 / 41 | Supporting | MRI workflow | Included |
| Optional post-contrast T1 for sheath enhancement / active synovitis | 42 / 41 | Supporting | MRI workflow | Included as optional |
| Tendon thickening and increased T2 signal | 42 / 41 | Essential | MRI findings and self-check | Included |
| Sheath fluid (“halo”) and wall thickening | 42 / 41 | Essential | MRI findings and self-check | Included |
| Radial peritendinous soft-tissue oedema over styloid | 42 / 41 | Supporting | MRI findings | Included |
| Two axial PD-FS MRI panels with arrows at APL/EPB; source text describes tendon thickening/increased fluid-sensitive intratendinous signal, sheath fluid and radial subcutaneous oedema/fluid | 43 / 42 | Essential visual | MRI findings figure | Added as paired crop from the supplied PDF; translated caption reports source description and does not claim the panels alone prove diagnosis |
| Ultrasound appearances / protocol | Not present in these pages | Out of scope | Scope note | Not inferred from curriculum modality tags |

## Teaching path and visual plan

1. Localise: first extensor compartment over the radial styloid; APL and EPB.
2. Recognise the clinical pattern and name the source’s provocative manoeuvre cautiously.
3. Choose MRI sequences and separate tendon, sheath and peritendinous findings.
4. Apply the pattern to one short self-check; finish with four portable rules. A link to the six-compartment orientation lesson distinguishes general extensor anatomy from this focused pathology lesson.

The code-authored SVG `public/educational/de-quervain/first-extensor-compartment.svg` is a language-neutral anatomy schematic, not diagnostic imaging. It answers “which tendons and where?” through anatomy and APL/EPB markers; its translated alt text and caption spell out both tendon names. The paired PD-FS MRI crop at `public/msk/hand/de-quervain-pdf-p43-pd-fs-pair.png` comes from MSK.pdf p.43 / printed p.42. Both panels and source arrows are preserved; the visible source text describes the tendon, sheath and surrounding-tissue findings. This is a user-provided PDF image, with reuse authorized by the user for this lesson.

## Evidence added beyond the PDF

- Wu F, Rajpura A, Sandher D. *Finkelstein's Test Is Superior to Eichhoff's Test in the Investigation of de Quervain's Disease.* J Hand Microsurg. 2018;10:116–118. PMID 30154628. https://pmc.ncbi.nlm.nih.gov/articles/PMC6103758/. Used only to distinguish the thumb-in-fist/ulnar-deviation variant and support the caution that a positive manoeuvre is not definitive. Their comparison was in asymptomatic participants and does not establish test sensitivity in a symptomatic population.
- Glajchen N, Schweitzer M. *MRI features in de Quervain's tenosynovitis of the wrist.* Skeletal Radiol. 1996;25:63–65. PMID 8717121. https://pubmed.ncbi.nlm.nih.gov/8717121/. Small retrospective series (n=5); used as corroborating provenance for tendon thickening and peritendinous oedema, not as a threshold or universal rule.

## Translation terminology

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| First extensor compartment | erstes Strecksehnenfach | first extensor compartment | کمپارتمان اول اکستانسور |
| Abductor pollicis longus | M. abductor pollicis longus (APL) | abductor pollicis longus (APL) | عضلهٔ abductor pollicis longus (APL) |
| Extensor pollicis brevis | M. extensor pollicis brevis (EPB) | extensor pollicis brevis (EPB) | عضلهٔ extensor pollicis brevis (EPB) |
| Radial styloid | Processus styloideus radii | radial styloid | زائدهٔ استایلوئید رادیوس |
| Tendon sheath | Sehnenscheide | tendon sheath | غلاف تاندون |
| Eichhoff manoeuvre | Eichhoff-Manöver | Eichhoff manoeuvre | مانور آیکهوف |

## Boundaries and unresolved checks

- The PDF’s naming of the thumb-in-fist manoeuvre conflicts with the distinction in Wu et al.; the lesson identifies this rather than silently repeating it.
- No ultrasound criteria, treatment advice, anatomic variants or diagnostic thresholds were supplied for this scope.
- Independent delta review of p.43 confirmed both axial PD-FS panels and APL/EPB arrows are preserved; the DE/EN/FA caption matches the source-described tendon, sheath and adjacent-tissue findings and does not treat the image pair alone as diagnostic. The reviewer also confirmed the reciprocal cross-links. No concrete correction was identified.
- Focused static assertions pass with `DEQUERVAIN_SKIP_SSR=1`. The ordinary SSR test's localhost probe hung in this environment, so browser/rendered UX, mobile layout and keyboard interaction remain unverified. This review does not provide clinical sign-off.
