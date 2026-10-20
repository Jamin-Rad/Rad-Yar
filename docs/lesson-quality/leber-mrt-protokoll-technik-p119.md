# Leber-MRT-Protokoll — Technik.pdf, Seite 119

Stand: 20.10.2026 · `/technik/grundlagen#leber-mrt-protokoll` · Curriculum-ID `leber-mrt-protokoll` (`inProgress`).

## Lernziel und Abgrenzung

Lernende sollen die Sequenzgruppen einer Leber-MRT nach der klinischen Frage ordnen und erkennen, dass Phasenzeitpunkte von Kontrastmittel und lokalem Protokoll abhängen. Diese kurze Einheit ist ein Technik-Lernabschnitt, keine gerätespezifische Untersuchungsanweisung und keine komplette Leberläsionsdiagnostik.

## PDF-Abgleich

Quelle: `Technik.pdf`, PDF-S. 119 (gedruckte S. 118). Die Seite wurde als Bild geprüft. Sie ist textbasiert und enthält kein Patientenbild.

| ID | PDF-Inhalt | Bedeutung | Behandlung |
|---|---|---|---|
| LMP-01 | Native T2/T2-FS, T1 In-/Opposed-Phase, DWI | Essenziell | Zusammengeführt als komplementäre Gewebecharakterisierung; DWI wird mit ADC eingeordnet. |
| LMP-02 | Native Referenz, arteriell, portalvenös, Gleichgewicht/Spätphase | Essenziell | Phasenfolge enthalten; konkrete Zeiten nicht als universell übernommen. Bolustriggerung und tatsächliche Phase erwähnt. |
| LMP-03 | Hepatobiliäres KM, HBP nach 20 min, FNH-vs-adenoma/metastasis/HCC | Essenziell mit Konflikt-/Zusatzbedarf | Nur das Prinzip „HBP erfordert hepatobiliäres KM“ übernommen. „20 min“ als fest und Tumorvergleich als allgemeingültig verworfen; indikationsabhängige Einordnung nötig. |
| LMP-04 | MRCP, stark T2-gewichtete Gänge | Wiederholung mit Ergänzung | MRCP p.117 hat bereits ein eigenes curriculum-verknüpftes Modul; p.119 wird nicht als erneute MRCP-Abdeckung gezählt. Hier bleibt eine knappe Abgrenzung ihrer Zusatzfrage. |

## Lehrpfad und Medien

1. Native Bildgruppen nach Gewebehinweis verstehen.
2. Dynamische T1-Phasen nach Enhancement-Frage ordnen.
3. Hepatobiliäre Phase als kontrastmittelabhängige Ergänzung einordnen.
4. MRCP als zusätzliche Gangfrage abgrenzen.

Eine vierteilige code-native Prozessgrafik und ein dreisprachiger Inline-MCQ prüfen diese Zuordnung. Ein Flashcard-Topic enthält eine Transferkarte. Da die Quelle kein diagnostisches Fallbild bietet, wurde kein Scan erfunden oder hinzugefügt.

## Ergänzende Quellen

- ACR–SAR–SPR, *Practice Parameter for the Performance of MRI of the Liver*, amended 2023: https://cs.acr.org/-/media/ACR/Files/Practice-Parameters/MR-Liver.pdf — allgemeine Sequenzbestandteile und Notwendigkeit, das Protokoll an Indikation und Scanner anzupassen.
- ESGAR consensus, *Liver MR imaging and liver-specific contrast agents*, 2016: https://pmc.ncbi.nlm.nih.gov/articles/PMC4778143/ — Technik, dynamische Phasen und hepatobiliäre Kontrastmittel.
- ESR Essentials, *Diagnosis of hepatocellular carcinoma—practice recommendations*, 2024: https://doi.org/10.1007/s00330-024-10606-w — HCC-spezifische Protokollhinweise; nicht auf alle Indikationen verallgemeinert.

## Status und Gates

- SRC: statischer Abgleich der sichtbaren PDF-Seite und Einordnung der vier Punkte; unabhängige Inhaltsprüfung noch ausstehend.
- EDU: kompakte Sequenzgruppen-/Fragefolge statt langer Text; browser layout noch ausstehend.
- VIS: Konzeptgrafik erklärt Ablauf, nicht Bilddiagnostik; PDF enthält hier kein diagnostisches Bild.
- LNG: DE/EN/FA-Text und MCQ/Flashcard angelegt; unabhängige semantische Prüfung noch ausstehend.
- ASM: Inline-MCQ mit begründeter Rückmeldung plus eine Transferkarte; fachübergreifende Fragebank-Integration nicht beansprucht.
- UX: kein Browsernachweis in diesem Batch.
- REV: unabhängiger Review und beide Delta-Retests PASS im statisch überprüfbaren Umfang. Die VIS/LNG-Pfeilrichtung, der Flashcard-Rücklink und die Parser-kompatible Persian-card-Diagrammfolge wurden bestätigt. Kein Browsernachweis; kein klinischer Fachfreigabeanspruch.
- Scientific approval: nicht erteilt; keine Freigabe klinischer Routineparameter.

## Prüfungen

Nach Implementierung auszuführen: `git diff --check`, dedizierter Build/SSR der route, curriculum-link and flashcard lookup, and required lesson audits. Browser interactions remain unverified until a browser session is available.
