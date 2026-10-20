# Technik.pdf: Unterrichtseinheit Sonographie-Grundlagen

Stand: 19.10.2026. Teilbatch B-1 aus Technik.pdf; kein Nachweis der Fertigstellung der übrigen Technik-, Gehirn-, Abdomen-, Thorax-, MSK- oder Wirbelsäulen-Inhalte.

## Lernweg und Einordnung

- Route: `/technik/sonographie/grundlagen`
- Curriculum-ID: `sonographie-physikalische-grundlagen`
- Erwartetes Ergebnis: Echoentstehung mit Tiefe verknüpfen, häufige Artefakte physikalisch einordnen und Winkel/Farbrichtung bei Doppler richtig interpretieren.
- Struktur: Puls → Echo/B-Bild; Ausbreitungseffekte → Artefakte; Doppler → Winkel, Farbkodierung und Duplex.
- Medium: eigene code-native Schemata für Echo-Laufweg und posterior enhancement/Schallschatten; keine diagnostischen Patientendaten.
- Assessment: eine erklärende Frage zum 90°-Winkel, drei Antwortmöglichkeiten und unmittelbares begründetes Feedback.
- Globales MCQ-/Flashcard-Inventar: keine separate Frage oder Karte ergänzt; der Selbstcheck ist in die Lektion eingebettet.

## Quellen- und Abdeckungsledger

| Punkt | Quelle | Ort in der Lektion | Status |
|---|---|---|---|
| Piezoelektrische Elemente wandeln elektrische Pulse in Schall und Echos in elektrische Signale | Technik.pdf, PDF-S. 132 / Druck-S. 131 | Echo-Abschnitt | Eingearbeitet; unabhängig gegen Seitenbild retestet |
| Reflexion an Impedanzgrenzen; Spiegelartefakt hinter starkem Reflektor wie Zwerchfell | Technik.pdf, PDF-S. 132 / Druck-S. 131 | Echo-Abschnitt | Eingearbeitet; unabhängig gegen Seitenbild retestet |
| Streuung kleiner Strukturen und Speckle | Technik.pdf, PDF-S. 132 / Druck-S. 131 | Echo-Abschnitt | Eingearbeitet |
| Brechung und Randschatten | Technik.pdf, PDF-S. 132 / Druck-S. 131 | Echo- und Artefaktabschnitt | Eingearbeitet; als mögliches Artefakt beschrieben |
| Absorption/Dämpfung, distaler Schallschatten und dorsale Verstärkung hinter Flüssigkeit | Technik.pdf, PDF-S. 132 / Druck-S. 131 | Artefaktabschnitt; SVG | Eingearbeitet |
| Reverberation und Schichtdickenartefakt | Technik.pdf, PDF-S. 132–133 / Druck-S. 131–132 | Artefaktabschnitt | Eingearbeitet; Sludge als mögliches Vortäuschen markiert |
| Dopplerverschiebung aus Geschwindigkeit und Winkel; nahe 90° kleine/fehlende Verschiebung | Technik.pdf, PDF-S. 133 / Druck-S. 132; EFSUMB ECB2, Kapitel „Knobology“ | Dopplerkapitel und Selbstcheck | Eingearbeitet; externe Beziehung geprüft |
| PDF-Vorschlag 30–60°; Geräte-/protokollabhängig behandeln | Technik.pdf, PDF-S. 133 / Druck-S. 132 | Dopplerkapitel | Eingearbeitet; nicht als universelle Regel formuliert |
| Rot/Blau kodiert Richtung relativ zum Schallkopf, nicht Arterie/Vene | Technik.pdf, PDF-S. 133 / Druck-S. 132 | Dopplerkapitel | Eingearbeitet |
| Duplex kombiniert Graustufen-B-Bild und Doppler | Technik.pdf, PDF-S. 133 / Druck-S. 132 | Dopplerkapitel | Eingearbeitet |
| Mikrobläschen, Kontrastmechanismus, Eigenschaften, Indikationen und Kontraindikationen | Technik.pdf, PDF-S. 133–134 / Druck-S. 132–133 | Nicht in dieser Lektion | Explizit ausgeschlossen; braucht eigenes CEUS-/Kontrastmittel-Batch und aktuelle Produkt-/Sicherheitsquellen. Die vorhandene Weiterleitung für Ultraschallkontrastmittel führt derzeit zur Röntgen-Kontrastmittelroute; ownership und Route müssen im nächsten Technik-Batch festgelegt werden. |

PDF-Seiten 132–134 wurden textlich und visuell eingesehen. Diese Einheit beansprucht nur Sonographie-Physik und Duplex-Grundgedanken, nicht Ultraschallkontrastmittel. Seiten 120–131 desselben PDFs und der bestehende Kontrastmittelbestand wurden nicht neu auditiert.

## Übersetzungsbegriffe

| Begriff | DE | EN | FA | Prüfung |
|---|---|---|---|---|
| akustische Impedanz | akustische Impedanz | acoustic impedance | امپدانس آکوستیک | Inhaltlich parallel |
| dorsale Schallverstärkung | dorsale Schallverstärkung | posterior acoustic enhancement | تقویت خلفی صوت | Inhaltlich parallel |
| Doppler-Winkel | Doppler-Winkel | Doppler angle | زاویهٔ داپلر | Inhaltlich parallel; 30–60° als PDF-Empfehlung eingeordnet |
| Farbdoppler | Farbdoppler | color Doppler | داپلر رنگی | Farbrichtung wird nicht als Arterie/Vene ausgegeben |

## Unabhängige QA

Reviewer: separater read-only Agent; geprüfte Dateien und Originalseiten: `app/technik/sonographie/grundlagen/page.jsx`, `data/technikSonographieLesson.js`, `data/technikGrundlagenLesson.js` und Technik.pdf S. 132–134, textlich und visuell. Die Retests bestätigten Winkelangabe, Quellenzuordnung AIUM/EFSUMB, deutsche Technik-Notiz sowie Ergänzungen zu Piezoelement und Spiegelartefakt.

| Gate | Status | Evidenz und Grenze |
|---|---|---|
| SRC | PASS im deklarierten Umfang | PDF-S. 132 und Doppler-Teil von S. 133 abgeglichen; CEUS-Anteile sind explizit einem späteren Batch vorbehalten. Kein wissenschaftliches Gesamt-Sign-off. |
| EDU | PASS | Lernpfad Echo → Artefakt → Doppler; Ziele, Selbstcheck und Zusammenfassung passen zusammen. |
| VIS | BLOCKED | Schemata sind im Code vorhanden; der lokale gerenderte Browser war in der Umgebung nicht erreichbar, daher kein sichtbarer Layout-/Illustrationsnachweis. |
| LNG | PASS, statische semantische Prüfung | DE/EN/FA verglichen; RTL-Rendering bleibt ungeprüft. |
| ASM | PASS, nur Selbstcheck | Ein eingebetteter Selbstcheck deckt den Dopplerwinkel ab; kein globales Quiz oder Flashcard-Set erstellt. |
| UX | BLOCKED | CUA-Tab zu `localhost:3002` erhielt `ERR_CONNECTION_TIMED_OUT`; lokaler HTTP-Aufruf war durch Socket-Berechtigung blockiert. Keine echte Browser-, Mobil-, Theme-, Tastatur- oder Persistenzprüfung. |
| REV | PASS | Unabhängige read-only-Prüfung und Retest der Korrekturen abgeschlossen. |

Produktionsbuild wurde versucht, ist aber nicht bestanden: Next.js konnte in der eingeschränkten Umgebung Google Fonts nicht abrufen (`ENOTFOUND fonts.googleapis.com`) und brach danach beim Schreiben nach `.next/server/app/msk/trauma` mit `EPERM` ab. Das ist kein grüner Build-Nachweis.

Externe technische Referenzen: [EFSUMB European Course Book, 2nd ed., Chapter “Knobology”](https://efsumb.org/wp-content/uploads/2023/07/ECB2nd_Chapter_KNOBOLOGY_FULL.pdf); [AIUM Practice Parameter for Head and Neck Ultrasound](https://www.aium.org/docs/default-source/resources/guidelines/headneck.pdf?Status=Master&sfvrsn=1a8358f0_1). AIUM wird nur für allgemeinen Optimierungskontext genannt; der Winkelbezug ist EFSUMB zugeordnet. Wissenschaftliche Endfreigabe durch Dr. Zia: ausstehend. Veröffentlichung außerhalb des Repositorys: nicht angefragt.

## Autor:innen-Delta 20.10.2026: CEUS-Seiten 133–134 und Querverweis

Dies ist ein späteres Autor:innen-Update; die oben dokumentierte unabhängige Prüfung bezog sich auf den früheren Physik-/Doppler-Umfang. Für dieses Delta ist unabhängige Prüfung des Deltas ausstehend. Es gibt keine klinische Freigabe.

| PDF-Befund | Lektion/Assessment | Abdeckung und Grenze |
|---|---|---|
| S. 133: ungefähre Mikroblasengröße 1–10 µm; SonoVue-Spezifikationen sind produktbezogen | `/technik/kontrastmittel/ultraschall`, CEUS-Mechanismus | PDF-Angabe als ungefähr markiert; EMA-Produktinformation ergänzt mean ~2.5 µm nur für SonoVue. Keine Verallgemeinerung auf andere Präparate. |
| S. 133: nichtlineare Blasenoszillation und harmonische Anteile | Text und Code-Schema in CEUS-Abschnitt | Schema zeigt getrennt die überwiegend lineare Gewebeantwort und nichtlineare Mikroblasenantwort. Es ist ein Konzeptdiagramm, keine Patientendarstellung. |
| S. 133: harmonische Signalverarbeitung, bei niedriger Sendeleistung/MI weniger Bläschenzerstörung | CEUS-Erklärung und neue Frage `km-ultraschall-de/en/fa-3`; dieselbe Seed-Frage erzeugt Flashcard 3 | Auf EFSUMB-Technikquelle gegengeprüft; als allgemeines Prinzip, mit Geräte-/Präparatabhängigkeit qualifiziert. Keine konkreten Scanner-Einstellungen gelehrt. |
| S. 133–134: Anwendung, Ausscheidung und historische Kontraindikationsliste des PDFs | Bestehender CEUS-Abschnitt | Anwendungen und Sicherheit beruhen auf aktueller EMA-Fachinformation und sind produkt-/wegbezogen. Historische PDF-Liste wurde nicht als gegenwärtige universelle Regel kopiert; Einzelfallgrenzen bleiben Fachinformation/lokaler Leitlinie vorbehalten. |
| S. 132–133: B-Bild-Physik, Artefakte und Doppler; cross-topic Kurzfassung | `/technik/grundlagen` Abschnitt `sono`; Curriculum-ID `doppler-duplex-sonographie` | Deutsche Kurzfassung korrigiert, da zuvor Persisch in `de` stand. Beide passenden Curriculum-IDs verweisen auf die existierende Sonographie-Grundlagenroute; kein neuer Kursabschnitt/Route erfunden. |

PDF-S. 132–134 wurden für dieses Delta textlich und anhand der gerenderten Seitenbilder geprüft. Die Seiten enthalten hier keine diagnostischen Patientenfallbilder, daher wurde kein Radiopaedia-Fall behauptet oder ergänzt. Quellen für den Mechanismus: [EMA SonoVue EPAR](https://www.ema.europa.eu/en/medicines/human/EPAR/sonovue) und [Dietrich et al., How to perform CEUS (2017)](https://efsumb.org/wp-content/uploads/2021/01/Dietrich-CF-Averkiou-M-Nielsen-MB-How-to-perform-Ultrasound-Int-Open-2018-4-E2-CEUS.pdf). Das EMA-Sicherheits-/Zulassungsstück bleibt versions- und jurisdiktionsabhängig.

Sicherheits-Delta am 20.10.2026 gegen die aktuelle EMA-Produktinformation (zuletzt aktualisiert 20.03.2026) geprüft: Abschnitte 4.3, 4.4 und 4.6. Die aktuelle Fachinformation führt Schwangerschaft als Vorsichtsmaßnahme („vorzugsweise vermeiden“), nennt Wiederaufnahme des Stillens 2–3 Stunden nach SonoVue und verlangt bei kürzlichem ACS/instabiler ischämischer Erkrankung sowie NYHA III–IV eine strenge Nutzen-Risiko-Abwägung und engmaschige Überwachung. Diese kardialen Situationen werden nicht pauschal als absolute Kontraindikationen bezeichnet. Intravenöse Kontraindikationen sind vom gesonderten intravesikalen pädiatrischen Applikationsweg abgegrenzt. Beleg: [aktuelle EMA-Produktinformation, PDF](https://www.ema.europa.eu/en/documents/product-information/sonovue-epar-product-information_en.pdf). Gilt speziell für SonoVue und dessen Fachinformation; andere Produkte und nationale Zulassungen sind nicht daraus abgeleitet.

Focused author regression: `node --import tsx scripts/test-technik-sonography-ceus-p132-p134.mjs`. Statische Daten-/Markup-String-Prüfung für Sprachen, Links, MCQ/Flashcard und Schema-Kernlabels; sie ersetzt keinen sichtbaren Browser-/RTL-Layouttest. Die unabhängige Delta-QA fand keine inhaltlichen Muss-Korrekturen und bestätigte PDF-Abdeckung, Diagramm, Übersetzungen und Retrieval; unabhängige Prüfung der aktuellen EMA-Wortlaute oben erfolgte ergänzend anhand der offiziellen Fachinformation. Kein sichtbarer Browser-/RTL-Test und keine klinische Freigabe.
