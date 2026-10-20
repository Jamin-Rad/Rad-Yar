# Technik: Atomstruktur und Ionisation (PDF pp. 25–27; printed pp. 24–26)

Scope: bounded revision of `/technik/grundlagen#atom`, exact curriculum ID `roentgen-physikalische-grundlagen`, now linked and kept `inProgress`. This ledger records lesson/source coverage; it does not assert curriculum completion or release approval.

| Source point | Lesson coverage | Evidence / qualification |
|---|---|---|
| PDF p.25: nucleus/electron cloud; shell model; Z and A | Atom/shell model row; Z/A/isotope row | Shells are explicitly framed as a simplified teaching model, not literal fixed orbits. |
| PDF p.26: high-Z materials and photoelectric absorption | Atomic-number/absorption row | Qualified by photon energy, material, thickness and absorption edges; no universal “nearly complete” absorption claim. NIST XCOM provides energy- and material-dependent attenuation/cross-sections: https://www.nist.gov/pml/xcom-photon-cross-sections-database |
| PDF p.26: isotopes | Z/A/isotope row | Defines isotope relation and N = A − Z. |
| PDF p.26: ionization and excitation | Separate ionization and excitation rows; original schematic SVG | Excited-state energy release is described without asserting it is always heat. |
| PDF p.27: universal 5 eV ionization threshold | Corrected in ionization row and source note | Not universal: IAEA Diagnostic Radiology Physics describes ionization energies spanning a few eV (alkali atoms) to 24.5 eV (helium); NIST ASD provides element-specific values, e.g. H 13.5984 eV and Na 5.13908 eV. IAEA: https://pub.iaea.org/mtcd/publications/pdf/pub1564webnew-74666420.pdf ; NIST ASD: https://physics.nist.gov/PhysRefData/ASD/ionEnergy.html |
| PDF p.27: direct vs indirect ionization | Direct/indirect row; existing radiation-types row refined | Charged particles can ionize directly; photons transfer energy to charged secondary particles. IAEA Diagnostic Radiology Physics, radiation interaction/energy-deposition discussion: https://pub.iaea.org/mtcd/publications/pdf/pub1564webnew-74666420.pdf |
| PDF p.27: radiation origins | Existing X-ray tube section (pp.30–37) and radiation-type section carry related material | Avoids duplicating the later tube-origin lesson in this bounded revision. |

Visual: `public/technik/grundlagen/atom-ionisation.svg` is an original schematic of excitation versus ionization. It is not to scale; localized alternative text and caption are in the lesson data.

Verification: focused SSR/RTL test `scripts/test-technik-atomstruktur-render.mjs` PASS, including localized graphic text, all three option labels, learner-facing references, and exact curriculum link. Independent source/content, visual, language, assessment and delta review PASS; scoped `git diff --check` PASS. Browser UX and subject-specialist sign-off remain open.
