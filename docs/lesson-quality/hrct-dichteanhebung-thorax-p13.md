# HRCT Dichteanhebung: Thorax.pdf p.13 coverage delta

**Route / lesson ID:** `/thorax/hrct/dichteanhebung` · `hrct-dichteanhebung`
**Source:** user-provided `Thorax.pdf`, PDF p.13 / printed p.12. The complete page was rendered and visually inspected; its page number, both CT images and the visible rIDs were checked against the lesson assets.
**Scope:** page-specific delta only. The route already teaches vessel visibility for GGO versus consolidation and already includes the consolidation and reverse-halo examples.

## Coverage ledger

| Key | Source point | Status and location | Qualification |
|---|---|---|---|
| TH13-01 | Homogeneous, patchy or extensive/flächig increased opacity | Included in `ggo` section card “Describe extent and shape” | Descriptive morphology; does not identify cause |
| TH13-02 | Consolidation differs from a round nodule/mass by lacking a rounded form | Included in the same card | A rounded appearance is a cue to reassess focality and lesion type, not a diagnosis by shape alone |
| TH13-03 | CT example of alveolar consolidation, visible `rID 30227` | Existing `image5.jpeg`; caption now names Thorax.pdf PDF p.13 / printed p.12 and rID; visible external case link remains | Displayed image/crop inspected and matched to p.13; contributor and case-specific terms are not inferred from this page |
| TH13-04 | Reverse-halo/atoll CT example, visible `rID 26531` | Existing `image6.png`; caption now names Thorax.pdf PDF p.13 / printed p.12 and rID; visible external case link remains | Displayed image inspected and matched to p.13; do not infer etiology from this sign alone |
| TH13-05 | COP, fungal pneumonia, tuberculosis and adenocarcinoma associations listed under reverse halo | Deferred from this delta | These associations are on the source page but are not needed for the shape/distribution addition. No independent current authoritative-source verification was performed here; do not treat the PDF list or the linked image as validation. |

## Translation and visual checks

The added descriptive claim is localized in DE/EN/FA. All versions preserve the same distinctions: homogeneous, patchy, extensive/confluent; rounded morphology may resemble a nodule/mass; shape alone is not diagnostic; vessel visibility, volume loss and associated findings still matter. Existing GGO/consolidation teaching and the reverse-halo visual were not duplicated or replaced.

The two p.13 figures were inspected directly in the rendered PDF and compared with the existing lesson files: `image5.jpeg` matches the consolidation image with visible rID 30227; `image6.png` matches the reverse-halo image with visible rID 26531 and the source's “atoll sign” annotation. The lesson shows localized captions and links each rID to its Radiopaedia case. The supplied PDF authorizes project use per the shared standard; this does not establish contributor-level attribution or separate case-specific licensing.

## Verification status

- Focused checker: `node scripts/test-hrct-density-thorax-p13.mjs`.
- Existing p.11 regression checker: `node scripts/test-atelektase-thorax-p11-render.mjs`.
- `git diff --check` scoped to changed paths.
- Browser visual/interactions and independent clinical review remain pending. This delta does not mark the broader lesson complete or imply scientific signoff.
