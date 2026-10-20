# Röntgenröhre, Wechselwirkung und Detektor — Technik.pdf, S. 30–43

Arbeitsstand: 21.10.2026. Route: `/technik/grundlagen`; Abschnitte `roehre`, `wechselwirkung`, `detektor`.

## Lernpfad und Quellendeckung

Ziel: Lernende erklären die Entstehung und Formung des Röntgenspektrums, verbinden Absorption/Streuung mit Bildkontrast und unterscheiden die grundlegenden Detektor-Umwandlungsketten.

| PDF-Seite | Kerninhalt | Einordnung / Fundstelle | Status und Grenzen |
|---|---|---|---|
| 30–32 | Röhrenaufbau, Kathode/Glühfaden, Elektronenfokussierung, Anode, Vakuum, Generator- und Heizschaltung | `/technik/grundlagen#roehre`; Diagramm `xray-tube.svg` | Kathode, Anode, Elektronenfokus und Generator erklärt. Gehäuse-/Öl-Isolation nur als nicht vertiefte Baugruppen-Notiz zurückgestellt; kein Wartungswissen beansprucht. |
| 31 | Brennfleck, Wärmebelastung, Dreh-Anode, Fokus | Abschnitt `roehre` | Klein-/Großfokus und Belastungsgrenze eingeordnet. Keine universellen Lastwerte übernommen. |
| 33–34 | Strichfokus, Heel-Effekt, Intensitätsverteilung und Positionierung | Abschnitt `roehre`; `xray-tube.svg`, `heel-effect.svg` | Qualitative Konzepte; Positionierung ausdrücklich von Projektion und Geometrie abhängig. Keine falschen universellen Winkelregeln. |
| 32, 34–35 | Generator, mA/mAs/Zeit/kV, fallende Last, extrafokale Strahlung | Abschnitt `roehre` | Generatorwelligkeit, fallende Last und Ursache/Wirkung extrafokaler Strahlung sind knapp erklärt. Konkrete Generatorverläufe, Geräteeinstellungen und Gegenmaßnahmen bleiben geräteabhängig und werden nicht vorgegeben. |
| 36–37 | Elektronenemission, Bremsstrahlung, charakteristische Strahlung, Spektrum und Parameter | Abschnitt `roehre`; `xray-spectrum.svg` | Prinzipien, Endenergie und Filterwirkung erklärt. Diagramm ist ausdrücklich qualitativ, ohne Messdaten. |
| 38–40 | Absorption/Transmission; Photoeffekt, Compton- und kohärente Streuung | Abschnitt `wechselwirkung`; `xray-interactions.svg` | Mechanismen und Bildwirkung erklärt. Keine pauschale Prozentaufteilung oder universelle kV-Grenze übernommen. |
| 41–42 | Filterung, weicher/harter Strahl, Spektrumsänderung | Abschnitte `roehre` und `wechselwirkung`; `xray-spectrum.svg` | Grundprinzip erklärt; materialspezifische Mammographie-Tabellenwerte der PDF nicht ungeprüft übertragen. |
| 43 | Film-Folie, CR, indirekte/direkte DR, Signal- und Bildqualität | Abschnitt `detektor`; `detector-chain.svg` | Konversionsketten und Grenzen der Qualitätsvergleiche erklärt. Keine pauschale Dosis- oder Auflösungsüberlegenheit behauptet. |

Die Seiten 30–43 wurden durch den PDF-Mapper als Text und Bild inventarisiert. Für die inhaltlichen Kernaussagen wurde die IAEA-Referenz Kapitel 5 herangezogen. Der Status bedeutet begrenzte Themenabdeckung, keine Vollständigkeit des gesamten Technik-PDF.

## Medienplan

| Ziel | Medium | Prüfstatus |
|---|---|---|
| Kathode–Elektronen–Anode und Fokus | Code-native Konzeptgrafik `xray-tube.svg` | Asset vorhanden; als schematisch/nicht maßstabsgetreu bezeichnet |
| Intensitätsabfall Kathodenseite–Anodenseite | `heel-effect.svg` | Qualitative Kurve, nicht als Messung ausgegeben |
| Bremsstrahlung, kV und Filterung | `xray-spectrum.svg` | Konzeptkurven; Endenergie und Niedrigenergieanteil beschriftet; keine diagnostischen Bilddaten |
| Photoeffekt vs. Compton | `xray-interactions.svg` | Prinzipdiagramm, keine quantitativen Wahrscheinlichkeiten |
| Film/CR/DR-Konversionswege | `detector-chain.svg` | Systemübersicht; Material- und Auslesevarianten als geräteabhängig markiert |

## Assessment und Lokalisierung

Es gibt je eine lokalisierte globale MCQ zu Röhre/Spektrum, Streustrahlung/Raster und indirekter DR sowie vier Flashcards zum Röhren-/Spektrum-Block. Drei kapitelbezogene Retrieval-Checks sind in der Seite eingebettet. Curriculumeinträge verlinken auf Anker, Fragen und Karten und verbleiben `inProgress`.

Fokussierte Validierung: `npm run test:technik-roentgen-sync` und `npm run audit:mcq` bestanden; `node --check data/technikGrundlagenLesson.js` und `git diff --check` bestanden. Diese Prüfergebnisse belegen Daten-/Registrysynchronität, nicht fachliche Freigabe oder Browserdarstellung.

Die unabhängige Prüfung und der Delta-Retest bestätigten SRC, EDU, VIS, ASM und REV innerhalb dieses Seitenbereichs. Die zuvor beanstandete Erklärung der fallenden Last wurde nach IAEA §5.4.4 korrigiert: während der Aufnahme wird der Röhrenstrom gesenkt; die bedienende Person wählt kV, Fokusgröße und – ohne AEC – mAs. Die übergreifende Zusammenfassung wurde passend formuliert, die drei Spektrumkurven unterscheidbar gezeichnet und RTL-Pfeile in Flashcards durch Richtungsworte ersetzt. Browserzugriff auf den lokalen Routeninhalt bleibt durch die bestehende Anmeldesperre blockiert; Darstellung, RTL, Responsivität und Interaktion sind nicht visuell bestätigt. Fachärztliche/fachphysikalische Freigabe steht aus.

## Quellen und offene Prüfungen

- IAEA, *Diagnostic Radiology Physics: A Handbook for Teachers and Students*, Kapitel 5, insbesondere Röhrenaufbau/Fokus/Heel-Effekt und Spektrum: [IAEA Handbook PDF](https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1564webNew-74666420.pdf). Abschnitt 5.4.4 beschreibt falling load als Absenken des Röhrenstroms während der Aufnahme; die Bedienperson setzt kV, Fokusgröße und abhängig von AEC mAs. Primär-/Lehrbuchquelle zur physikalischen Einordnung; genaue Effektstärke und Geräteeinstellungen bleiben kontextabhängig.
- Autorisierte PDF-Quelle: `Technik.pdf`, S. 30–43. Die im PDF enthaltenen Zahlen- und Tabellenwerte wurden nicht pauschal übernommen, wenn sie geräte-/materialabhängig oder ungeklärt waren.

Offen: unabhängiger Reviewer-Retest, browserbasierte Darstellung und Interaktionen in DE/EN/FA, fachärztliche/fachphysikalische Freigabe sowie die zurückgestellten Randpunkte S.35 und S.41–42. Daher weder `complete` noch wissenschaftlich freigegeben.
