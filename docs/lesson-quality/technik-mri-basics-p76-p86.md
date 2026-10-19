# Technik.pdf: MRT-Grundlagen und SNR, PDF-S. 76–86

## Umfang und Lernziel

Begrenzte Erweiterung des bestehenden `/technik/grundlagen`-Abschnitts `mrt`.
Nach diesem Teil soll der Lernende RF-Anregung und T1/T2-Erholung unterscheiden,
die drei vereinfachten Schritte der Ortskodierung erklären und bei einer
SNR-Änderung den Zielkonflikt mit Auflösung oder Messzeit benennen können.

Curriculum-IDs (bestehend): `mrt-grundprinzip-signalbildung` und
`mrt-bildqualitaet-artefakte-snr`; beide verlinken auf
`/technik/grundlagen#mrt` und bleiben `inProgress`. Veröffentlichungsstatus:
`inProgress` bis Review/Browser-/Fachfreigabe.

## Quellenabdeckung

| Punkt | Quelle | Bedeutung | Ziel im Kurs | Status |
|---|---|---|---|---|
| Kernspin richtet sich im B₀-Feld aus; Präzession/Larmorfrequenz | Technik.pdf, PDF-S. 76–77 (Druck-S. 75–76) | Modell für MR-Signal | Bestehender MRT-Einstieg; Signalbildungsblock ergänzt | Eingearbeitet, vereinfacht |
| RF-Anregung, Quermagnetisierung und gleichzeitige Erholung | PDF-S. 78 | Signalentstehung | Signalbildungsblock und SVG | Eingearbeitet |
| T1-Erholung und T2-Abfall samt Kurven | PDF-S. 79–80 | T1/T2 unterscheiden | kompakte Tabelle und konzeptuelle Kurven | Eingearbeitet; 63/37 % als ideales Zeitkonstantenmodell, nicht klinische Grenzwerte |
| Statische/dynamische Feldinhomogenität; T2 vs. T2* | PDF-S. 81–82 | T2* erklären | bestehende MRT-Zeile zu T2/T2*; Detailreview bleibt offen | Teilweise vorhanden, weiter abzugleichen |
| TR/TE, Gewichtung, Empfangsspule und k-Raum/Fourier | PDF-S. 82–83 | Relaxation von Bildgewichtung und Rekonstruktion trennen | Bestehende Übersicht plus neuer Kodierungsblock | Eingearbeitet, vereinfacht; keine vollständige Sequenzphysik |
| Schicht-, Phasen- und Frequenzkodierung | PDF-S. 84 | Bildposition verstehen | drei Schritte in Tabelle und SVG | Eingearbeitet; Achsennamen als vereinfachtes 2D-Beispiel markiert |
| SNR, Voxel/Mittelung, FOV/Matrix, Messzeit und Shim | PDF-S. 85–86 | Trade-offs bei Bildqualität einordnen | SNR-Block und SVG; Shim im Detail hier ausgelassen | PDF-Aussage: mehr Mittelungen verbessern SNR und verlängern die Zeit. Zusatzformel `SNR ∝ √N` getrennt gekennzeichnet und auf Macovski (1996) zurückgeführt; bei gleichartigen unabhängigen Wiederholungen folgt sie aus `SNR ∝ √(Akquisitionszeit)` und zeitproportionaler Mittelungszahl. Shim als offener Detailpunkt |
| Artefakte Seiten 87–91 | PDF-S. 87–91 | außerhalb dieses bounded cluster | bestehender Abschnitt `mrt-sicherheit` ist kurz und nicht seitenweise abgeglichen | Noch nicht geprüft/abgeglichen |

## Kapitelplan

1. Signalbildung: RF-Anregung, T1/T2 und der Unterschied zwischen Gewebeeigenschaft und Bildgewichtung.
2. Ortskodierung: Schichtauswahl → Phasenkodierung → Frequenzkodierung → k-Raum/Fourier.
3. SNR: Voxelvolumen, Mittelungen und Auflösung/Zeit als gekoppelte Größen.

## Medienplan

| Zweck | Medium | Asset | Prüfergebnis |
|---|---|---|---|
| Zeitkonstanten und Kodierablauf erklären | code-native SVG; keine diagnostische Patientenaufnahme | `public/technik/mri-signal-encoding.svg` | Quelle visuell geprüft; SVG/Alttext fachlich-technisch noch unabhängig reviewen |
| SNR-Trade-offs auf einen Blick ordnen | qualitative SVG mit Pfeilen; keine Messdaten | `public/technik/mri-snr-tradeoffs.svg` | Aussagen absichtlich qualitativ; unabhängige Review offen |

## Sprache und offene Prüfung

Die PDF ist deutsch; alle drei Fassungen wurden als Lerninhalt neu formuliert,
nicht wörtlich übersetzt. Die technischen Kürzel B₀, RF, T1/T2, FOV, NEX und
k-space bleiben international üblich. Die Übersetzung/RTL-Darstellung muss im
Browser noch geprüft werden. Die konkreten Zahlenwerte, Feldstärkevergleiche,
SAR-Angaben und Sicherheitsregeln aus der PDF wurden nicht übernommen.

## Validierungsstatus

- Technisch/editorial: fokussierter SSR-/Paritäts-Test abgeschlossen und bestanden (DE/EN/FA; reale `StandardLessonShell`, `LessonSection` und `LessonSources`).
- Quelle: Seiten 76–86 als Seitenbilder gerendert und visuell geprüft; Extraktionstext wurde für diesen Cluster nicht als alleinige Grundlage verwendet.
- Browser: nicht geprüft; drei Sprachen, RTL, Desktop/Mobil und Themes offen.
- Wissenschaftlich: Fachprüfung durch Dr. Zia offen. Das Dokument ersetzt keine klinische Freigabe.
- Unabhängiger Review und Delta-Retest: bounded PASS für PDF-Scope, lokalisierte Diagramme, MRI-Abrufcheck, SNR-Trade-offs, Macovski-Ergänzung, Alt-Text und tatsächliches `LessonSources`-Rendering.

## Zusätzliche SNR-Beziehung außerhalb der PDF

Technik.pdf S. 85 sagt nur, dass mehr Mittelungen das SNR verbessern und die
Messzeit verlängern. Die Beziehung `SNR ∝ √N` steht daher als ausdrücklich
gekennzeichnete Ergänzung im Lektionstext. Macovski A. *Noise in MRI*. Magnetic
Resonance in Medicine. 1996;36(3):494–497. doi:10.1002/mrm.1910360327. Der
Abstract leitet für ein gegebenes Objekt `SNR ∝ √(Akquisitionszeit)` her; die
Formulierung nach Mittelungszahl setzt gleiche unabhängige Wiederholungen und
Akquisitionszeit proportional zu ihrer Anzahl voraus. Der Artikel ist unter
[DOI 10.1002/mrm.1910360327](https://doi.org/10.1002/mrm.1910360327) in der
Quellenliste der Lektion verknüpft. Diese Beziehung wird der PDF nicht
zugeschrieben.

## Fixes aus dem ersten unabhängigen Review

Der erste Review fand drei konkrete Punkte: englische Instruktionslabels in SVGs,
kein abrufender Check zu diesem MRI-Cluster und eine uneindeutige quantitative
Anmutung der SNR-Balken. Die SVG-Texte wurden auf sprachneutrale Kürzel/Zahlen
reduziert; die Schritt- und Trendlegenden stehen jetzt lokalisiert im Kurs. Der
SNR-Plot zeigt nur Richtungspfeile an einer SNR-Achse und behauptet keine
vergleichbaren Beträge. Ein dreisprachiger Check prüft Matrix/FOV, Pixelgröße,
Auflösung und SNR und gibt erklärendes Richtig-/Nochmal-Feedback. Der fokussierte
Test rendert jetzt die echte `StandardLessonShell`, `LessonSection` und
`LessonSources` serverseitig, kontrolliert beide exakten Curriculum-Links inklusive
`inProgress: true` und prüft die neuen Lehrinhalte in allen drei Sprachen.
Die ergänzende Quadratwurzelbeziehung ist separat als solche markiert, mit
Literaturangabe/DOI in der tatsächlichen Quellenliste sichtbar und im Ledger von
der qualitativen PDF-Aussage abgegrenzt.

Delta-Retest PASS: tatsächliche SVG-Raster und DE/EN/FA-Legenden geprüft; der SNR-Plot zeigt nur qualitative Richtungen; der Abrufcheck wurde in korrekten und falschen Antwortpfaden getestet; Macovski-Quelle und PDF-vs.-Ergänzung sind getrennt. Browser-/Responsive-/History- und klinische Freigabe bleiben offen.
