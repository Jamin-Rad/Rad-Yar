# Technik: Strahlungsarten und Photonen (PDF p. 28–29)

## Scope and relation to the existing lesson

Proposed standalone route: `/technik/strahlungsarten`; no shared curriculum entry has been added. The existing `/technik/grundlagen` lesson covers atomic structure and ionization on PDF pp. 25–27 and X-ray production on pp. 30–37, but does not teach alpha/beta/gamma comparison or medical source examples. This short bridge lesson covers only pp. 28–29: particle versus photon, qualitative interactions/penetration, photon energy relation, and the source's three modality examples. It avoids repeating atomic structure, dose, tube construction, or image formation.

Learning promise: classify alpha/beta as particles and gamma/X-ray as photons; explain the main naming distinction between gamma and X-rays; interpret the PDF's broad penetration descriptions without turning them into fixed shielding instructions; recognize where the three source examples use emissions.

Teaching path: (1) particle or photon and origin, (2) energy and context-dependent penetration, (3) modality examples and their limits. Visual plan: one code-authored conceptual branch diagram paired with the first section, distinguishing particle emissions from photons and noting origin; no diagnostic image is required for this physical-science objective. The hero is an SVG concept map, not a simulated physical measurement.

## Source coverage ledger

| ID | Source point | Importance | Disposition |
|---|---|---|---|
| SA-01 | PDF p. 28: alpha is a helium nucleus (2 protons, 2 neutrons) | Core | Included as a helium nucleus. Proton/neutron count is implicit in the standard term and not separately repeated. |
| SA-02 | PDF p. 28: alpha high ionization, short range; paper/skin, few cm air | Core with caveat | Retained qualitatively. Fixed range/shielding claims are not presented as universal; added internal-contamination caveat from NRC/IAEA radiation protection materials. |
| SA-03 | PDF p. 28: Radium-223 example and 11-day half-life | Illustrative / time-sensitive | Mechanism/example retained in the grouping paragraph; exact half-life and therapeutic indication/detail omitted as unnecessary and not current treatment advice. |
| SA-04 | PDF p. 28: beta particle is electron or positron; medium ionization/range; air, aluminum/plastic | Core | Particle identity retained. Relative range/ionization summarized qualitatively; shields are not prescribed because context and energy matter. |
| SA-05 | PDF p. 28: Y-90 SIRT, 64-hour half-life, catheter and microsphere effects | Illustrative / time-sensitive | Y-90 microsphere example retained only to identify beta-emitter use; exact half-life, indications, procedure and claim that microspheres block blood supply omitted as clinical/procedural advice or oversimplification. |
| SA-06 | PDF p. 28: gamma electromagnetic, more energetic than X-rays, penetrating, lead/concrete, 99mTc tracer and gamma camera/SPECT | Core plus correction | Gamma photons, qualitative penetration and tracer/gamma-camera example retained. A rigid gamma-above-X-ray energy boundary is corrected using IAEA: both are photons, named chiefly by origin. No shielding instruction given. |
| SA-07 | PDF p. 29: X-rays are ionizing EM waves; spectrum position; photons massless/uncharged/light-speed; energy/frequency/wavelength | Core | Photon nature, no rest mass/charge and E proportional to frequency/inverse to wavelength retained concisely. The energy-only distinction from gamma is corrected from IAEA. |
| SA-08 | Lesson contributes distinction from existing Grundlagen | Scope | Existing p. 25–27 atom section already says photons are indirectly ionizing, and p. 30–37 explains X-ray generation. This lesson adds only the comparative radiation taxonomy and source examples. |

## Scientific context and source decisions

- PDF was provided by the user; p. 28–29 text was extracted and both rendered page images visually inspected on 20 October 2026. Printed page labels are 27–28.
- IAEA Nuclear Security Series No. 6 explains that gamma and X-rays share electromagnetic/photon nature and distinguishes them by nuclear versus extra-nuclear origin; it supports avoiding a hard energy-only boundary. URL: https://www-pub.iaea.org/MTCD/publications/PDF/pub1309_web.pdf (accessed 20 October 2026).
- IAEA TCS-40 and the U.S. NRC Radiation Basics provide qualitative particle/photon and penetration context. URLs: https://www-pub.iaea.org/MTCD/Publications/PDF/TCS-40_web.pdf and https://www.nrc.gov/facilities-safety/radiation-protection/radiation-and-its-health-effects/radiation-basics (accessed 20 October 2026).
- No present-day treatment recommendation, dosimetric range, half-life, or workplace shielding rule is taught. This is a concept lesson, not clinical or radiation-safety instruction.

## Translation and validation

Terminology is aligned across DE/EN/FA for alpha particle, beta particle, photon, gamma radiation, X-ray radiation, penetration and shielding. Assessment tests the origin distinction rather than memorized energy bands. Following independent review, both distractors were strengthened (reversed origins; rigid energy-threshold misconception) and each selected answer now has an explanatory localized rationale.

`node scripts/test-technik-strahlungsarten-render.mjs` — PASS (22 localized units; DE/EN/FA static route and RTL; three chapters, assessment choices and option-specific rationales; source references and visual asset).
Independent first review — content/source/teaching/visual/language PASS; two minor assessment findings corrected. Delta review — PASS; reversed-origin and energy-threshold distractors are plausible and every answer has a localized explanatory rationale.
The exact curriculum ID `strahlungsarten` now links to `/technik/strahlungsarten` and remains `inProgress`. Browser interaction/responsive/RTL evidence, clinical specialist signoff and production release — pending; no overall acceptance is claimed.
