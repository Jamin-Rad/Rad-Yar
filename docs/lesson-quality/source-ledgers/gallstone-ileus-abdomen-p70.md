# Gallstone ileus — Abdomen.pdf p.70

Scope: one bounded addition to the existing `/abdomen/gi/ileus-volvulus` lesson. The source is physical PDF p.70 (printed page 69). The page image was visually inspected; the page covers the gallstone-ileus mechanism and Rigler triad. This addition does not claim to audit all other p.70 material or adjacent pages.

| Source point | Lesson disposition | Evidence and limits |
| --- | --- | --- |
| A biliodigestive fistula, usually cholecystoduodenal, allows a gallstone to enter the bowel; impaction is commonly near the ileocaecal valve | Added as a concise DE/EN/FA mechanism statement on the existing obstruction route | Directly source-mapped to Abdomen.pdf physical p.70 (printed p.69). No treatment or management content added. |
| Rigler triad: small-bowel obstruction, pneumobilia, and ectopic gallstone in the bowel | Added as a localized list and one trilingual registered retrieval question under the existing exact curriculum tag `ileus-duenndarm`; lesson ID remains `abdomen-ileus-volvulus` | Exact curriculum IDs were checked; no new ID was created. The assessment item is scoped only to `ileus-duenndarm`; it must not appear in the separate sigmoid/caecal volvulus quiz. |
| The complete triad may be absent | Added an explicit caveat that absence of one feature does not exclude gallstone ileus | Brandariz Gil et al. state that the complete triad is exceptional (PMID 27615020). In a 23-case surgically proven series, the plain-film triad was present in 2 cases (PMID 11441553). The caveat supplements the PDF and does not assert a modality-independent sensitivity estimate. |

## Validation and scope

- `node scripts/test-ileus-gallstone-rigler-render.mjs` verifies the route and MCQ in DE/EN/FA, exact tags, answer key, all options including the localized D distractor, rationale and retrieval.
- `node scripts/audit-abdomen-thorax-copy-parity.cjs` passes structural locale parity; `npm run audit:mcq` passes for the existing bank.
- Independent review of the source page, lesson delta and assessment passed; see the task review exchange for scope and evidence.
- Adjacent p.69, p.71–72 and p.76–78 claims, full lesson coverage, browser/RTL behavior and clinical approval remain open. This is not treatment guidance or a full clinical validation.
