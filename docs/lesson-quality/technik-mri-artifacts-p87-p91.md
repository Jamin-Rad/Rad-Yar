# Technik.pdf: MRT-Artefakte, PDF-S. 87–91

## Umfang und Lernziel

Erweiterung des bestehenden Abschnitts `/technik/grundlagen#mrt-sicherheit`.
Der Lernende soll sechs häufige Artefaktmuster anhand Form und Kodierachse
unterscheiden, eine plausible Ursache nennen und eine quellennahe Korrektur
auswählen können. Die Tabelle bleibt auf Technik.pdf PDF-S. 87–91 begrenzt;
MRT-Sicherheit, SAR und Werte auf S. 92–94 sind kein Teil dieser Ergänzung.

Curriculum-ID: `mrt-bildqualitaet-artefakte-snr` (bereits vorhanden und
`inProgress`, aktuell zur MRT-Grundlagensektion verlinkt). Es wird kein
Curriculum- oder Matrixeintrag geändert.

## Quellenabdeckung

| Quellpunkt | PDF-Seite (gedruckt) | Bedeutung | Kursort | Status |
|---|---|---|---|---|
| Suszeptibilität: lokale Feldgradienten, Signalauslöschung/Verzerrung; SE/TSE, TE und Metallartefakt-Reduktion als Optionen | 87 (Druck 86) | Feldbedingte Verzerrung von Signal und Geometrie erkennen | Artefakt-Tabelle 1, schematisches Muster 1 | Eingearbeitet; Optionen keine universelle Protokollvorgabe |
| Bewegung und Pulsation: Ghosting/Blur; Phasenrichtung, Atemanhalten, Sättigungsband und Triggerung | 88 (Druck 87) | Bewegungsartefakt von ortsfestem Befund unterscheiden | Artefakt-Tabelle 2 und Muster 2 | Eingearbeitet; Ursache bestimmt die Maßnahme |
| Aliasing/Faltung: Objekt außerhalb FOV, überwiegend Phase; FOV/Phase-oversampling/Richtung | 89 (Druck 88) | Wrap-around erkennen und korrigieren | Tabelle 3, Muster 3, Abrufcheck | Eingearbeitet; Oversampling-Zeitfolge genannt |
| Zipper/RF-Störung: scharfe Linie, senkrecht zur Frequenzkodierung und parallel zur Phasenkodierung; Faraday-Kabine/externe RF-Quelle; Fehlerpfad | 89–90 (Druck 88–89) | Störung als Anlagen-/Umgebungsproblem erkennen und Kodierachse zuordnen | Tabelle 4, Muster 4 | Eingearbeitet; Achsenbeziehung DE/EN/FA; folgt lokaler Eskalation/Technikprüfung |
| Gibbs/Truncation: Ringing an harten Kanten; Matrix/Ortsauflösung | 90 (Druck 89) | Ringing nicht als zusätzliche Anatomie missdeuten | Tabelle 5, Muster 5 | Eingearbeitet; Trade-off zu SNR/Zeit erwähnt |
| Chemical shift: Frequenzunterschied Wasser/Fett, Verschiebung in Frequenzrichtung, Bandbreite/Fettsuppression/Richtung | 91 (Druck 90) | Verschiebungsartefakt von echten Doppelkonturen unterscheiden | Tabelle 6, Muster 6 | Eingearbeitet; Opposed-Phase-Grenzsaum als separater Kontext benannt |
| Echte Quellenbeispiele: Bewegungs-/Pulsationsartefakt, frontale Faltung, Chemical Shift (out-of-phase) | 91 (Druck 90) | Muster in echten MRT-Beispielen wiedererkennen | Drei aus der Quellseite entnommene Bildausschnitte, mit lokalisierter Bildunterschrift und Quellennennung im Kurs | Seite und Ausschnitte visuell geprüft; Originalbilder aus user-authorized Technik.pdf; Auswahl zeigt drei verschiedene Muster; keine Patientendaten zusätzlich eingeblendet |
| Aussage „echter Befund muss in mindestens zwei Gewichtungen sichtbar sein“ (auf/nahe der Bewegungsartefakt-Seite) | 88 (Druck 87) | Mögliche Abgrenzungsregel mit klinischer Bedeutung | Nicht gelehrt; ausdrücklich zurückgestellt | PDF-Aussage und Kontext im Originalbild sind zu verifizieren, ebenso die fachliche Gültigkeit/Anwendbarkeit. Keine Schwelle oder Regel daraus abgeleitet. |

## Lehr- und Medienplan

Eine kompakte Zuordnungstabelle beantwortet für jedes Muster: Ursache, sichtbare
Form/Richtung und eine bedingte Korrekturoption. Die SVG vermittelt sechs
nummerierte neutrale Schemata; lokalisierte Captions verknüpfen sie mit drei
echten Quellenbeispielen für Bewegung/Pulsation, Faltung und Chemical Shift.
Eine Abruffrage trennt Aliasing von RF-Zipper und prüft den passenden Trade-off.
Es wird kein künstliches diagnostisches MRI und kein Patientencase erfunden.

## Assessment integration

Der vorhandene Inline-Check bleibt bestehen. Ergänzt wurden eine zentrale
DE/EN/FA-MCQ zur Faltung in Phasenkodierrichtung im Vergleich zu anderen Artefakten
und zwei Karten zu Aliasing-Korrektur und Zipper-Orientierung. Quiz- und
Kartenlinks verwenden die bestehende ID `mrt-bildqualitaet-artefakte-snr`.

## Validierung

- Technik.pdf PDF-S. 87–91 wurden als Seitenbilder visuell geprüft; die gedruckten Seitenzahlen liegen jeweils um eins zurück.
- Fokussierter SSR-/Sprach-/Curriculum-Test rendert die tatsächliche gemeinsame `StandardLessonShell`, `LessonSection` und `LessonSources`.
- Die frühere begrenzte statische Prüfung ist in Batch M2 von `pdf-batch-execution-plan.md` vermerkt; sie ersetzt keine klinische Fachfreigabe.
- Dieses Delta ergänzt zentrale Prüfungs-/Kartenregistrierung und aktualisiert den veralteten Matrixeintrag. Browser-/RTL-/Responsive-Prüfung bleibt offen.
- Die Quellenaussage, ein echter Befund müsse in mindestens zwei Gewichtungen sichtbar sein, bleibt bis zur Prüfung des genauen PDF-Kontexts und der unabhängigen klinischen Gültigkeit zurückgestellt.
- Eine wissenschaftliche oder Publikationsfreigabe wird nicht abgeleitet.
