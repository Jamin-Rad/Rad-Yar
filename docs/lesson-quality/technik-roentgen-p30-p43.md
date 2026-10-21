# Röntgenröhre, Wechselwirkung und Detektor — Technik.pdf, S. 30–43

Arbeitsstand: 21.10.2026. Route: `/technik/grundlagen`; Abschnitte `roehre`, `wechselwirkung`, `detektor`.

## Lernpfad und Quellendeckung

Ziel: Lernende erklären die Entstehung und Formung des Röntgenspektrums, verbinden Absorption/Streuung mit Bildkontrast und unterscheiden die grundlegenden Detektor-Umwandlungsketten.

| PDF-Seite (Druckseite) | Essenzieller Quellpunkt | Einordnung / Fundstelle | Status und bewusst zurückgestellt |
|---|---|---|---|
| 30 (29) | Bauteile der Röntgenröhre, Kathode/Wehnelt-Zylinder, Anode, Klein-/Großfokus, Fest-/Drehanode | `/technik/grundlagen#roehre`; `xray-tube.svg` | Baugruppen und qualitative Unterschiede enthalten. PDF-Aussage zu universeller Rotationszahl/Anodenwerten nicht übernommen; geräteabhängig. |
| 31 (30) | tatsächlicher (elektronischer), thermischer und optischer Brennfleck; Schutz-/Vakuumhülle, Bleigehäuse und Ölfüllung | Abschnitt `roehre` | Alle drei Brennfleckbegriffe und Gehäusefunktionen getrennt aufgenommen. Keine Detailwartung oder Modellwerte. |
| 32 (31) | Hochspannungsgenerator, Gleichrichtung, Heiz- und Röhrenstromkreis; mA und kV | Abschnitt `roehre` | Menge an Elektronen/Photonen (mA, mAs) von Beschleunigungsspannung und Energie (kV) unterschieden. Konkrete Schaltungswerte nicht verallgemeinert. |
| 33 (32) | Strichfokusprinzip, Anodenwinkel, optischer Fokus und nutzbares Feld | Abschnitt `roehre` | Prinzip erklärt; Winkelzahlen und Einsatzzuordnungen der PDF nicht als universelle Regeln übernommen. |
| 34 (33) | Heel-Effekt, Faktoren und klinische Positionierung | Abschnitt `roehre`; `heel-effect.svg` | Intensitätsabfall qualitativ erklärt; Positionierung nur, wenn Projektion und Geometrie es zulassen. PDF-Tabelle nicht als feste universelle Regel übernommen. |
| 35 (34) | fallende Last und extrafokale Strahlung | Abschnitt `roehre` | Mechanismen knapp erklärt; exakte Geräteeinstellungen und Gegenmaßnahmen als modellabhängig markiert. |
| 36 (35) | Elektronenemission, Beschleunigung, Bremsstrahlung und charakteristische Strahlung | Abschnitt `roehre`; `xray-spectrum.svg` | Kernmechanismen enthalten; pauschale Aufteilung in feste Prozentwerte nicht als geräteunabhängige Konstante gelehrt. |
| 37 (36) | Röntgenspektrum; mA versus kV und Qualität/Quantität | Abschnitt `roehre`; `xray-spectrum.svg` | mA/mAs hauptsächlich Menge, kV Maximalenergie und Spektrumsform. Kurven sind Konzept, keine Messwerte. |
| 38 (37) | Abschwächung durch Absorption und Streuung; Materialdicke, Dichte und Strahlenenergie | Abschnitt `wechselwirkung` | Faktoren explizit ergänzt; keine einzelne Materialeigenschaft als alleinige Vorhersage dargestellt. |
| 39 (38) | Photoeffekt, Absorption, charakteristische Strahlung und Z-Abhängigkeit | Abschnitt `wechselwirkung`; `xray-interactions.svg` | Mechanismus und Bildwirkung enthalten. PDF-Dosis-/Kontrast-Superlative nicht als alleinige Kausalregel übernommen. |
| 40 (39) | Compton- und kohärente Streuung, Abhängigkeit von Energie und Bildwirkung | Abschnitt `wechselwirkung`; `xray-interactions.svg` | Mechanismen und qualitative Effekte enthalten; feste Prozentanteile und starre Energiebereiche zurückgestellt. |
| 41 (40) | Weiche/härtere Strahlung, allgemeine Filter und K-Kantenprinzip der Mammographie | Abschnitt `wechselwirkung`; `mammography-k-edge.svg` | Filter formt Spektrum; keine vereinfachte Vorstellung, der Filter wähle nur eine einzige Energie. Mammographie-Funktion qualitativ ergänzt. |
| 42 (41) | Ziel-/Filterkombination, kV, Brustdicke/-zusammensetzung, Bildkontrast und Dosis | Abschnitt `wechselwirkung`; Konzeptgrafik `mammography-k-edge.svg` | Auswahl als system- und patientenabhängig eingeordnet. PDF-Energie-/kV-Werte und Materialtabelle nicht als universelle Geräteeinstellungen gelehrt; gegengeprüft mit ACR–AAPM–SIIM und Sechopoulos. |
| 43 (42) | Film-Folie, CR, indirekte/direkte DR, Bildparameter | Abschnitt `detektor`; `detector-chain.svg` | Konversionsketten und Grenzen der Qualitätsvergleiche erklärt. Keine pauschale Dosis- oder Auflösungsüberlegenheit behauptet. |

Die Seiten 30–43 wurden durch den PDF-Mapper als Text und Bild inventarisiert. Für die inhaltlichen Kernaussagen wurde die IAEA-Referenz Kapitel 5 herangezogen. Der Status bedeutet begrenzte Themenabdeckung, keine Vollständigkeit des gesamten Technik-PDF.

## Medienplan

| Ziel | Medium | Prüfstatus |
|---|---|---|
| Kathode–Elektronen–Anode und Fokus | Code-native Konzeptgrafik `xray-tube.svg` | Asset vorhanden; als schematisch/nicht maßstabsgetreu bezeichnet |
| Intensitätsabfall Kathodenseite–Anodenseite | `heel-effect.svg` | Qualitative Kurve, nicht als Messung ausgegeben |
| Bremsstrahlung, kV und Filterung | `xray-spectrum.svg` | Konzeptkurven; Endenergie und Niedrigenergieanteil beschriftet; keine diagnostischen Bilddaten |
| Spektrumsformung mit K-Kantenfilter in der Mammographie | `mammography-k-edge.svg` | Konzeptkurven mit Niedrigenergieabschwächung und selektiver Unterdrückung oberhalb der K-Kante; nicht quantitativ, keine gerätespezifischen Energien |
| Photoeffekt vs. Compton | `xray-interactions.svg` | Prinzipdiagramm, keine quantitativen Wahrscheinlichkeiten |
| Film/CR/DR-Konversionswege | `detector-chain.svg` | Systemübersicht; Material- und Auslesevarianten als geräteabhängig markiert |

## Assessment und Lokalisierung

Es gibt je eine lokalisierte globale MCQ zu Röhre/Spektrum, Streustrahlung/Raster und indirekter DR sowie vier Flashcards zum Röhren-/Spektrum-Block. Drei kapitelbezogene Retrieval-Checks sind in der Seite eingebettet. Curriculumeinträge verlinken auf Anker, Fragen und Karten und verbleiben `inProgress`. Die gerade ergänzten Brennfleck-/Gehäuse-, Abschwächungs- und Mammographie-Filterpunkte haben noch keine eigenen globalen MCQ-/Flashcard-Items; diese Registries wurden in diesem Autorenschritt bewusst nicht geändert und müssen koordiniert ergänzt werden.

Fokussierte Validierung: `npm run test:technik-roentgen-sync` und `npm run audit:mcq` bestanden; `node --check data/technikGrundlagenLesson.js` und `git diff --check` bestanden. Diese Prüfergebnisse belegen Daten-/Registrysynchronität, nicht fachliche Freigabe oder Browserdarstellung.

Die frühere unabhängige Prüfung behandelte die damalige Fassung und bestätigte SRC, EDU, VIS, ASM und REV innerhalb des Seitenbereichs; sie erfasste die jetzt ergänzten Quellenpunkte noch nicht. Für die aktuelle Änderung ist unabhängige Prüfung samt Delta-Retest offen. Die zuvor beanstandete Erklärung der fallenden Last wurde nach IAEA §5.4.4 korrigiert: während der Aufnahme wird der Röhrenstrom gesenkt; die bedienende Person wählt kV, Fokusgröße und – ohne AEC – mAs. Die übergreifende Zusammenfassung wurde passend formuliert, die drei Spektrumkurven unterscheidbar gezeichnet und RTL-Pfeile in Flashcards durch Richtungsworte ersetzt. Browserzugriff auf den lokalen Routeninhalt bleibt durch die bestehende Anmeldesperre blockiert; Darstellung, RTL, Responsivität und Interaktion sind nicht visuell bestätigt. Fachärztliche/fachphysikalische Freigabe steht aus.

## Quellen und offene Prüfungen

- IAEA, *Diagnostic Radiology Physics: A Handbook for Teachers and Students*, Kapitel 5, insbesondere Röhrenaufbau/Fokus/Heel-Effekt und Spektrum: [IAEA Handbook PDF](https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1564webNew-74666420.pdf). Abschnitt 5.4.4 beschreibt falling load als Absenken des Röhrenstroms während der Aufnahme; die Bedienperson setzt kV, Fokusgröße und abhängig von AEC mAs. Primär-/Lehrbuchquelle zur physikalischen Einordnung; genaue Effektstärke und Geräteeinstellungen bleiben kontextabhängig.
- ACR–AAPM–SIIM, *Practice Guideline for Determinants of Image Quality in Digital Mammography* (2012): [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC3553374/). Supports that target material, filter, kV, breast thickness and density shape the spectrum and image quality; it does not justify universal settings for every current system.
- Sechopoulos I. *Towards Standardization of X-ray Beam Filters in Digital Mammography and Digital Breast Tomosynthesis* (2017): [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC5384796/). Reviews K-edge and aluminium filter approaches and system-/thickness-dependent spectral optimisation.
- Autorisierte PDF-Quelle: `Technik.pdf`, S. 30–43. Die im PDF enthaltenen Zahlen- und Tabellenwerte wurden nicht pauschal übernommen, wenn sie geräte-/materialabhängig oder ungeklärt waren.

Offen: unabhängiger Review der aktuellen Ergänzungen, browserbasierte Darstellung und Interaktionen in DE/EN/FA sowie fachärztliche/fachphysikalische Freigabe. Randpunkte S.35 und nicht bildlich geprüfte Details bleiben außerhalb dieser begrenzten Überarbeitung. Daher weder `complete` noch wissenschaftlich freigegeben.
