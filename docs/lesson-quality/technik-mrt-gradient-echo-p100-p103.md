# Technik.pdf: Gradient-Echo, T2* und SWI (PDF-S. 100–103)

## Auftrag und Lernziel

Route: `/technik/grundlagen#mrt` · Curriculum-ID: `mrt-gradient-echo`  
Lernziel: Lernende erklären die GRE-Echobildung, unterscheiden T2* von T2 und ordnen SWI, Phase, MIP sowie verbreitete GRE-Sequenznamen mit ihren Grenzen ein.

## Struktur- und Medienplan vor Umsetzung

1. **Wie entsteht das Gradientenecho?** — RF-Anregung mit kleinem Flipwinkel, Gradientenkehr und Echo bei TE; lokalisierte schematische Zeitachse.
2. **Was unterscheidet T2* von T2?** — T2 und zusätzliche Feldinhomogenitätsdephasierung.
3. **Welche Ursachen können Signalverlust erzeugen?** — Suszeptibilität und mehrere mögliche Quellen; ein dunkler Fokus ist nicht ursachenspezifisch.
4. **Wie ergänzen SWI und gefilterte Phase die Magnitude?** — Kombination und mögliche Unterscheidung paramagnetischer Blutprodukte von diamagnetischer Verkalkung, nur mit lokaler Hersteller-/Systemkonvention.
5. **Was zeigt das MIP und was geht dabei verloren?** — venöse Projektion sowie Verlust möglicher Schichtlokalisation.
6. **Was bedeuten FLASH, VIBE und MP-RAGE?** — Namen/Varianten, 3D-/Isotropie- und Magnetisierungsvorbereitung sowie die im PDF genannten Abdomen-/Kontrastmittel-/Neuro-Beispiele.
7. **Wie unterscheiden sich Spin-Echo und GRE?** — qualitative RF-/Gradientenrefokussierung, Suszeptibilität, Messzeit, SNR und SAR aus der Vergleichstabelle.

## Quellenabgleich

| Punkt | Technik.pdf | Umsetzung / Status |
|---|---|---|
| Grundprinzip und GRE-Zeitdiagramm | PDF-S. 100 (Druck-S. 99), kleiner RF-Flipwinkel, Gradienten-Dephasierung/Umkehr, Echo und TE | Vermittelt; neu gezeichnete Code-SVG, ausdrücklich schematisch und nicht als Geräteeinstellung. |
| Vorteile, Grenzen, Sequenznamen und Anwendungen | PDF-S. 101 (Druck-S. 100), kurze TR/TE, 3D/Hochauflösung, niedriger Flipwinkel/Energie, FLASH/VIBE/MP-RAGE; dynamische Abdomen-/Kontrastmittel- und Neuro-Anwendungen | Vermittelt als qualitative Vorteile und quellennah begrenzte Beispiele; keine absolute Geschwindigkeits-/SNR-Behauptung, keine Protokollvorgabe; Namen/Implementierungen nicht als identisch bezeichnet. |
| T2*, Blutabbauprodukte, Verkalkung und klinische Nutzung | PDF-S. 102 (Druck-S. 101) | T2* und Suszeptibilität vermittelt; Mikroblutung/alte Blutung als Quelleinsätze genannt, aber Bildsignal nicht als einzigartige Blut- oder Kalkdiagnose gelehrt. |
| SWI, gefilterte Phase, MIP | PDF-S. 102 (Druck-S. 101), Magnitude, Phase, MIP sowie Herstellerbeispiele für Polarität | Vermittelt: gefilterte Phase kann paramagnetische Blutprodukte und diamagnetische Verkalkung ergänzend unterscheiden; Zeichen/Helligkeit bleiben hersteller-, B₀-, sequenz- und verarbeitungsabhängig, daher kein universelles Farbschema oder alleiniger Befund. |
| SWI-/Phase-/MIP-Montage und SE–GRE-Tabelle | PDF-S. 103 (Druck-S. 102), beschriftete Technikbilder und qualitative Vergleichsmerkmale | Tabelle qualitativ vermittelt: SE höheres SNR und SAR; GRE etwas niedrigeres SNR und geringere SAR laut Quelle. Die Richtung ist nicht als absoluter Scannervergleich gelehrt. Montage ist beschriftete Technikillustration, aber Study/Patient, Protokoll und Zuordnung der Einzelbilder sind nicht unabhängig identifiziert; daher nicht als diagnostischer Fall übernommen. |

Alle vier Seiten wurden mit pdfplumber text-extrahiert und einzeln als Bild bei 110 dpi gerendert und geprüft. Tabellen, Bildunterschriften und Seitenreihenfolge stimmen mit der extrahierten Textstruktur überein; das Bildmaterial auf PDF-S. 103 ist sichtbar beschriftet, seine individuellen Studienmetadaten bleiben jedoch unbekannt. Kein OCR-/Layoutrest wurde für die Umsetzung als alleinige Evidenz genutzt.

## Wissenschaftliche Verifikation

- ESR eBook, „The Gradient Echo (GRE) Sequence“: kein RF-refocusing pulse, Signalzerfall mit T2*, höhere Empfindlichkeit gegenüber lokaler Feldinhomogenität. [European Society of Radiology](https://www.myesr.org/app/uploads/2024/02/ESR_eBook_for_Undergraduate_Education_in_Radiology_02d_Magnetic_Resonance_Imaging_.pdf)
- Haacke et al., *Susceptibility weighted imaging (SWI)* (2004): high-pass-filtered phase wird zu einer Phase-Maske verarbeitet und mit Magnitude kombiniert; projektionserzeugte Phasenbilder demonstrieren Gefäßkontinuität. [Magnetic Resonance in Medicine](https://onlinelibrary.wiley.com/doi/10.1002/mrm.20198)
- Wiegand et al., *Susceptibility-weighted imaging in intracranial hemorrhage: not all bleeds are black* (2023): Blut- und Kalziumdarstellung in Phasebildern ist herstellerabhängig; SWI kombiniert Phase-Maske und Magnitude; Alias-Effekte begrenzen einfache Farbinterpretation. [Open-access article](https://pmc.ncbi.nlm.nih.gov/articles/PMC10392652/)
- Siemens VIBE description: 3D FLASH-based technique. [Siemens Healthineers Academy](https://academy.siemens-healthineers.com/_/en-us/vibe-usa/)
- Siemens cross-vendor sequence nomenclature: distinguishes FLASH, MP-RAGE, VIBE and related vendor labels/implementations. [Siemens Healthineers Academy](https://academy.siemens-healthineers.com/_/en-us/mri-acronyms-crossvendor-comparisons/)

Interpretive limit: local signal loss may reflect blood products, calcium, air/tissue boundaries, metal and other local field effects. The lesson therefore does not present GRE/SWI magnitude as a unique discriminator. Filtered phase may help distinguish paramagnetic blood products from diamagnetic calcification, but its displayed sign depends on system conventions, B₀ orientation, acquisition and processing; aliasing or mixed material can limit interpretation. Use local validation and corroborating sequences/modalities.

## Qualitätssicherung

Focused MRI fundamentals and MRI artefacts shared-shell SSR/DE-EN-FA tests pass; the global MCQ audit and `git diff --check` pass. Independent reviews prompted source-map/concision updates, phase/SNR/SAR details and an MCQ distractor correction; final independent delta review passes SRC/EDU/ASM/REV; VIS/LNG/UX remain browser-blocked. Browser QA was attempted, but bundled Playwright had no installed Chromium executable, the isolated in-app browser returned `ERR_CONNECTION_TIMED_OUT` for localhost, and the host denied local socket access. UX, RTL appearance and rendered SVG therefore remain unverified. Clinical approval by Dr. Zia and production publication are not inferred.
