# Sprunggelenk trauma — MSK.pdf p.35

## Scope

- Exact curriculum ID: `osg-fraktur`
- Route: `/msk/trauma/sprunggelenk`
- Source: `C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf`, PDF p.35, printed p.34, section “Spezielle Frakturformen”.
- Bounded addition: morphology only for bi-/trimalleolar fractures, the Maisonneuve injury chain, pilon/plafond axial impaction, and Chaput versus Volkmann avulsions; a localized conceptual schematic and one pattern-identification self-check support those distinctions.
- Explicitly excluded: treatment, operative indications/thresholds, and source montage images. The page’s Radiopaedia montage is not reproduced; the teaching comparison is code-native text/table, not a diagnostic image.

## Source coverage and implementation

| Point | Source | Lesson location | Status / limitation |
|---|---|---|---|
| Bimalleolar: lateral + medial malleolus | p.35, “Bimalleoläre OSG-Fraktur” | `specialForms` comparison row | Included, morphology only |
| Trimalleolar: lateral + medial malleolus + posterior tibial margin / Volkmann triangle | p.35, “Trimalleolarfraktur” | `specialForms` comparison row | Included; no stability or treatment assertion imported |
| Maisonneuve: syndesmotic rupture → cranial interosseous membrane tear → high proximal fibular fracture, with medial malleolar fracture or deltoid tear | p.35, “Maisonneuve-Fraktur” | `specialForms` comparison row | Full source-described chain included; no imaging protocol/advice imported |
| Pilon: comminuted tibial plafond from talar axial impaction | p.35, “Pilon-tibial-Fraktur” | `specialForms` comparison row | Included and contrasted with rotation only as mechanism distinction |
| Chaput anterior vs Volkmann posterior distal tibial tubercle avulsion at syndesmotic attachment | p.35, “Chaput- & Volkmann” | `specialForms` comparison row | Included in DE/EN/FA; terminology follows source morphology |
| Source montage (visible rID 200431) | p.35 | Not embedded in the new table/diagram | No source montage image or crop reused. The existing lesson's Radiopaedia rID 200431 case is a separately rendered/credited case sequence in the case section; it is not a reuse of this PDF montage. |

## Translation and verification

The page copy is localized in German, English and Persian, including imaging, systematic review, Weber classification, stability, CT, case description and take-home copy. `CONTENT.fa` now overrides inherited English fields; the parity test checks nested strings against accidental English fallback. The p.35 comparison table, chapter labels, diagram, self-check and source note are also localized. The exact topic has two four-option DE/EN/FA MCQs (Maisonneuve injury chain; Chaput versus Volkmann), two localized flashcards, and visible lesson links to both practice surfaces. Focused locale and assessment-registration tests pass; independent static review of the Persian correction found no high-impact terminology issue. Browser-rendered RTL/layout verification, clinical correctness beyond bounded source transcription, and specialist approval remain open.

No curriculum ID was created or changed. No treatment recommendation or threshold was added.
