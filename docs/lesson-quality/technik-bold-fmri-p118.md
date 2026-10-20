# fMRI / BOLD · Technik.pdf PDF p. 118 (printed p. 117)

## Learning outcome

Explain why changes in deoxyhaemoglobin affect T2*-weighted signal, describe BOLD as an indirect hemodynamic contrast, and name the source's task-localisation use cases without treating an activation map as a direct neuronal measurement.

## Coverage ledger

| Source point | Importance | Lesson treatment | Status |
| --- | --- | --- | --- |
| Oxyhaemoglobin and deoxyhaemoglobin have different magnetic susceptibility | Essential | Concise mechanism and schematic | Included |
| Task-related blood-flow/oxygenation changes alter local T2* signal | Essential | Chain diagram; identify as hemodynamic | Included |
| fMRI task localisation: language, motor, visual | Essential | Use-case row | Included |
| Neurosurgical planning and research | Essential | Application row with limitations | Included |
| BOLD is an indirect proxy, not a direct neural recording | Essential scientific qualification | Explicit caveat and MCQ/card | Included |
| Diffusion tensor imaging (DTI) | Out of scope for this source page | Do not imply it is taught here; curriculum record points to the BOLD section and is titled BOLD/fMRI only | Deferred |

## Learning path and visual plan

1. Start with the contrast source: deoxyhaemoglobin is more paramagnetic than oxyhaemoglobin.
2. Follow the conceptual task response: local neurovascular response changes flow and oxygenation, changing deoxyhaemoglobin-related susceptibility and T2* signal.
3. Apply the interpretation: fMRI maps task-related signal differences for language, motor and visual localisation; the map is an indirect measurement and needs task/design/context interpretation.

One code-native schematic shows this causal chain. It is conceptual, has no patient data, and is not a diagnostic scan.

## Terminology

| Concept | DE | EN | FA |
| --- | --- | --- | --- |
| Blood-oxygen-level-dependent | Blut-Sauerstoff-Spiegel-abhängig (BOLD) | blood-oxygen-level-dependent (BOLD) | وابسته به سطح اکسیژن خون (BOLD) |
| Deoxyhaemoglobin | Desoxyhämoglobin | deoxyhaemoglobin | دئوکسی‌هموگلوبین |
| Neurovascular coupling | Neurovaskuläre Kopplung | neurovascular coupling | جفت‌شدن عصب‌ـ‌عروقی |
| Indirect hemodynamic contrast | Indirekter hämodynamischer Kontrast | indirect hemodynamic contrast | کنتراست همودینامیک غیرمستقیم |

## Evidence and limits

The source page was visually inventoried by the PDF mapper and contains text but no case image. Mechanistic interpretation is qualified against Hillman (2014) and Drew (2019). Epp et al. (online publication 2025; journal volume 2026) report opposing BOLD and oxygen-metabolism changes in about 40% of voxels with significant BOLD changes across the task conditions in their study; do not generalize that sample-specific result as a universal proportion. These references support teaching the proxy limitation; this lesson does not teach detailed neurovascular physiology or DTI.

- Hillman EMC. *Coupling Mechanism and Significance of the BOLD Signal: A Status Report.* 2014. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4147398/)
- Drew PJ. *Vascular and neural basis of the BOLD signal.* 2019. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6859204/)
- Epp SM, Castrillón G, Yuan B, Andrews-Hanna J, Preibisch C, Riedl V, et al. *BOLD signal changes can oppose oxygen metabolism across the human cortex.* Nature Neuroscience. Published online 16 Dec 2025;29:1225–1236 (2026). [Article](https://www.nature.com/articles/s41593-025-02132-9)

## Validation status

Source-page coverage and static DE/EN/FA content were independently reviewed, including a delta review of language, figure labels/legend, attribution, and media provenance. `npm run audit:mcq` passed with 674 questions; direct registry assertions found one BOLD MCQ per language, the linked three-card topic, and the lesson section. The parity audit reports no BOLD field errors; one pre-existing Persian-script-in-German string remains at `TECHNIK_GRUNDLAGEN.sections.16.rows.0.1.de`, outside this topic.

| Gate | Status | Evidence / limit |
| --- | --- | --- |
| SRC | PASS | Technik.pdf p.118 visually mapped; external scientific claims have primary/review sources with scope stated |
| EDU | PASS | Independent review of mechanism → typical response → use → limitation sequence |
| VIS | PASS | Localized labels, axes and legend; code-native schematic; provenance recorded |
| LNG | PASS | DE/EN/FA static parity retested; no BOLD-specific parity issue remains |
| ASM | PASS | MCQ audit and direct registration assertions passed; flashcard route/link statically traced |
| UX | BLOCKED | Local page is behind the existing sign-in gate; no bypass. Responsive/RTL rendering and live interactions remain unobserved |
| REV | PASS | Independent review and delta re-review closed all BOLD findings |

The production build was attempted but stopped on `EPERM` while creating `.next/server/app/api/analytics`; it also logged unavailable Google Fonts DNS. Browser verification remains separate. Scientific approval by Dr. Zia and publication are separate statuses.
