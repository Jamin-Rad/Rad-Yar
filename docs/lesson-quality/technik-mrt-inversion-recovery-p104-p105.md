# Technik.pdf: Inversion-Recovery, STIR, FLAIR und DIR (PDF-S. 104–105)

## Auftrag, Route und Lernziel

Route: `/technik/grundlagen#mrt` · Curriculum-ID: `mrt-inversion-recovery`  
Lernziel: Lernende erklären das IR-Nullpunktprinzip und unterscheiden STIR, FLAIR und DIR nach Zielgewebe, Verwendung und wichtigen Grenzen.

## Kapitelplan vor Umsetzung

1. **Wie unterdrückt IR ein Zielgewebe?** — Inversionspuls, TI, Nullpunkt und nicht maßstabsgetreue Kurvengrafik erläutern.
2. **Was unterdrücken STIR und FLAIR?** — Fett und Liquor gegenüberstellen; Beispielzeiten als geräte-/sequenzabhängig kennzeichnen.
3. **Was wird durch DIR zusätzlich sichtbar?** — Doppelte Nullung von Liquor und weißer Substanz, möglicher Nutzen für kortikale/juxtakortikale MS-Läsionen und Grenzen einordnen.
4. **Welche Grenzen gehören zur Sequenzwahl?** — Messzeit/Bewegung und Flussartefakte erklären; STIR nach Kontrastmittel nicht zur Enhancementbeurteilung verwenden.

## Medienplan

Eine eigene lokalisierte Code-SVG zeigt schematisch den 180°-Inversionspuls, den TI-Abstand bis zur Anregung und die Nullpunkte von Fett (kurzes TI) und Liquor (langes TI). Sie ist ausdrücklich kein Messwert, kein Scannerprotokoll und kein diagnostisches Patientenbild. Die PDF-Seiten enthalten nur die Sequenzgrafik und Text, keine identifizierbaren Patientenfälle; daher werden daraus keine Bildbeispiele extrahiert.

## Quellenabgleich

| Punkt | Technik.pdf | Umsetzung / Status |
|---|---|---|
| IR-Grundprinzip und Nullpunkt | PDF-S. 104 (Druck-S. 103): 180°-Inversion, Wartezeit TI, anschließender 90°-Impuls; Gewebe bei Nullmagnetisierung signalarm | Vermittelt mit schematischer lokalisierter Kurve. |
| STIR/FLAIR-TI-Beispiele | PDF-S. 104–105: ca. 150 ms für Fett/STIR, ca. 2000 ms für Liquor/FLAIR | Als grobe Beispiele der Quelle genannt, ausdrücklich keine universellen Werte oder Protokolle. TI hängt von Sequenz, T1, Feldstärke und Implementierung ab. |
| IR-Kontrast und Zeit/Artefakte | PDF-S. 104: meist T2-betont, längere Messzeit und erhöhte Pulsations-/Atemartefaktanfälligkeit | Vermittelt als häufige Trade-offs, nicht als für jede IR-Implementierung geltende Gesetzmäßigkeit. |
| STIR-Ziel, Einsatz und Kontrastmittelhinweis | PDF-S. 105: Fett, Knochenmark/Weichteile; Kontrastmittelanreicherung könne ebenfalls unterdrückt werden | Ziel und Beispiele vermittelt. Quellenhinweis zur Post-Kontrast-Nutzung fachlich präzisiert: konventionelles STIR ist für die Beurteilung von Enhancement ungeeignet, weil kurz-T1-Gewebe ebenfalls signalarm werden kann; eine ältere Primärstudie zeigt zugleich, dass bestimmte schnellere STIR-Varianten Enhancement abbilden können. Daher keine absolute Aussage, dass nach Kontrast jede STIR-Anwendung unmöglich sei. |
| FLAIR-Ziel, Einsatz und Artefakt | PDF-S. 105: Liquorunterdrückung, Läsionen können hell erscheinen, Einsatz in Neurobildgebung, KM-unterstützte Darstellung meningealer Entzündung, Flussartefakte infratentoriell | Grundprinzip und Beispiele vermittelt. Postkontrast-T2-FLAIR ist als sequenz-/timingabhängige Ergänzung formuliert; die kleine Primärstudie rechtfertigt keine allgemeine Überlegenheit. Pulsations-/Flussartefakte bleiben ein möglicher Störfaktor und dürfen nicht allein als Läsion interpretiert werden. |
| DIR und MS | PDF-S. 105: Liquor + weiße Substanz unterdrückt; bessere Sichtbarkeit kortikaler/juxtakortikaler Läsionen | Als ergänzende Sequenzoption vermittelt, nicht als alleinige MS-Diagnose; niedrigeres SNR und Artefaktanfälligkeit bleiben wichtige Grenzen. |

Beide Seiten wurden mit `pdfplumber` text-extrahiert und bei 110 dpi gerendert und visuell geprüft. Lesereihenfolge, Tabelle, Beschriftungen und Kurvendiagramm wurden am Seitenbild geprüft. Keine OCR-/Layout-Unklarheit für die hier verwendeten Punkte festgestellt.

## Wissenschaftliche Verifikation

- Hajnal et al. beschrieben die lange TI von FLAIR zur Liquorunterdrückung und den hohen T2-Kontrast. [PubMed, PMID 1430427](https://pubmed.ncbi.nlm.nih.gov/1430427/)
- Geurts et al. verglichen 3D-DIR, FLAIR und T2-SE bei MS und berichteten eine verbesserte Darstellung kortikaler Läsionen; die kleine Studienkohorte begrenzt die Verallgemeinerung. [PubMed, PMID 15987979](https://pubmed.ncbi.nlm.nih.gov/15987979/)
- Ozturk et al. beschreiben bei DIR geringe SNR, unscharfe Läsionsränder und Artefaktanfälligkeit als relevante Grenzen. [PubMed, PMID 17885241](https://pubmed.ncbi.nlm.nih.gov/17885241/)
- Fleckenstein et al. berichten, dass bestimmte schnelle STIR-Varianten Enhancement abbilden können. Das stützt die differenzierte Formulierung statt eines ausnahmslosen Verbots. [PubMed, PMID 2014300](https://pubmed.ncbi.nlm.nih.gov/2014300/)
- Kremer et al. verglichen frühe und verzögerte Post-Kontrast-FLAIR bei zehn Personen mit vermuteter leptomeningealer infektiöser/tumoröser Erkrankung. Das stützt nur eine mögliche ergänzende Rolle bei konkreter Sequenz und Timing. [PubMed, PMID 17213756](https://pubmed.ncbi.nlm.nih.gov/17213756/)
- Bakshi et al. dokumentieren Liquorpulsationsartefakte in FLAIR; das belegt einen konkreten Fallstrick, aber keine pauschale Unzuverlässigkeit aller posterioren Fossa-Aufnahmen. [AJNR / PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8174962/)
- Kato et al. beschreiben sequenzabhängige Nullpunktzeiten und ihre Abhängigkeit von Gewebe-T1 und Aufnahmebedingungen. [PubMed, PMID 23993795](https://pubmed.ncbi.nlm.nih.gov/23993795/)

## Qualitätssicherung

SSR-Tests `test-technik-mri-basics-render.mjs` und `test-technik-mri-artifacts-render.mjs` bestanden; `audit:mcq` prüfte 715 Fragen und 18 Fälle je Sprache; `git diff --check` bestanden. Erste unabhängige Prüfung: SRC/EDU/ASM/LNG bestanden; VIS/REV meldeten einen Versatz zwischen TI-Markern und Nullpunkten. TI-Marker wurden an die Kurvenschnittpunkte verschoben und alle vier SVGs visuell geprüft; zweite Delta-Prüfung: SRC/EDU/VIS/LNG/ASM/REV bestanden; UX bleibt wegen fehlender Browsernachweise blockiert. Persische RTL-Darstellung, Responsivität und klinische Freigabe durch Dr. Zia bleiben offen.

Technische Tests oder unabhängige KI-Prüfung sind keine wissenschaftliche Freigabe oder Produktionsveröffentlichung.
