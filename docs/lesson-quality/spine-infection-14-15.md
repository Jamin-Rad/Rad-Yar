# Spondylodiszitis · Quellen- und Abdeckungsledger

Stand: 20.10.2026. Arbeitsledger für `Wirbelsäule.pdf`, PDF-Seiten 14–15. Die Seiten wurden als Text extrahiert und als Seitenbilder geprüft. Route: `/wirbelsaeule/infektion`; Daten: `data/spineInfection.js`. Das ist keine klinische Freigabe.

## Lernziel und Unterrichtspfad

Nach der Lektion sollen Lernende ein vermutetes infektiöses Muster über Bandscheibe, benachbarte Endplatten und paravertebrale/epidurale Ausbreitung gemeinsam beurteilen, Modic I als wichtige Imitation erkennen und TB- sowie Tumorhinweise als Wahrscheinlichkeitsmuster statt als Beweis einordnen.

1. `pattern`: Bildgebung und betroffene Kompartimente anhand von T1, T2/STIR, T1 nach Kontrastmittel und CT.
2. `tuberculosis`: Verteilung, relative Diskuserhaltung und paravertebrale/Psoas-Kollektion mit Evidenzcaveat.
3. `differentiate`: Modic I, Neoplasie, erosive Osteochondrose und Andersson-Läsion.
4. Integrierter Mini-Fall mit erklärendem Feedback; vier Take-home-Regeln.

## Quellenabdeckung

| Punkt | PDF / Seite | Behandlung in der Lektion | Status / Caveat |
|---|---|---|---|
| Definition: Diskusentzündung plus angrenzende Endplatten-/Wirbelkörperosteomyelitis | S. 14 | Einleitung und MRI-Muster | Enthalten; knapp formuliert |
| Ätiologie, Hämatogenität `>50 %`, Streuherde, iatrogen und per continuitatem | S. 14 | Nicht als Lernziel aufgenommen | Zahlen und Ätiologiebreite sind für das bildgebende Lernziel nicht erforderlich; keine wissenschaftliche Validierung dieser PDF-Angaben behauptet |
| LWS>BWS>HWS; altersabhängige initiale Beteiligung | S. 14 | Altersabhängigkeit der Diskusbeteiligung im Kapitel `pattern` | Erwachsene: typischerweise Endplatte zuerst; kleine Kinder: primäre Diskusbeteiligung möglich. IDSA-Quelle gilt für Erwachsene; Alterscaveat zusätzlich gegen die pädiatrische Übersichtsquelle geprüft. |
| Röntgenveränderungen und Angabe `2–4 Wochen` | S. 14 | Nur CT-/MRT-Muster bleiben im Fokus | Zeitangabe bewusst nicht als diagnostische Schwelle gelehrt |
| CT: Endplattendestruktion, paravertebraler/epiduraler Abszess, Sequester | S. 14 | Kapitel `pattern`, Hinweis | Enthalten; Lokalisation/Ausdehnung im Befund benennen |
| T1, T2/STIR, T1 post-KM, DWI-Abszess | S. 14 | Vergleichstabelle MRI-Sequenzen | Enthalten als häufige Muster, nicht als isolierte Diagnosekriterien; DWI-Einschränkung im Abszess ergänzt |
| Modic I: Diskus T2-arm, erhaltene Endplatte; DWI-Claw | S. 15 | Kapitel `differentiate` | Claw durch Patel et al. ergänzt und als Zusatzzeichen qualifiziert; keine Ausschlussregel |
| Erosive Osteochondrose, ankylosierende Spondylitis/Andersson-Läsion | S. 15 | Kapitel `differentiate` | Nur als Differenzialdiagnosen benannt; keine vollständigen Krankheitslektionen |
| Neoplasie: Wirbelkörperbefall und relative Diskuserhaltung | S. 15 | Kapitel `differentiate` | Quelle vorsichtig als Muster wiedergegeben; kein absolutes `bis zum Beweis des Gegenteils` übernommen |
| TB: mehrere Wirbel, diskrete Knochenmarkveränderung, relative Diskuserhaltung, glattrandige große Kollektion | S. 15 | Kapitel `tuberculosis` | PDF-Muster enthalten, aber durch Meta-Analyse als gruppenbasierte Hinweise ergänzt; keine Erregerdiagnose aus Bildgebung behauptet |
| Subligamentäre Ausbreitung und dünne, regelmäßige Abszesswand | Nicht auf S. 14–15 genannt | Nur in TB-Kapitel ergänzend | Als Ergänzung aus der Meta-Analyse markiert, nicht der PDF zugeschrieben |

## Wissenschaftliche Ergänzungen und Bildplan

- IDSA-Leitlinie für native vertebrale Osteomyelitis bei Erwachsenen: empfiehlt MRT bei Verdacht; MRI-/Kontrastmittelangaben im Lektionstext bleiben auf Bildgebung und Muster begrenzt. Keine Therapieempfehlung übernommen.
- ACR Appropriateness Criteria `Suspected Spine Infection` (2021): je nach klinischer Variante ist MRT ohne und mit i.v. Kontrastmittel oder ohne i.v. Kontrastmittel üblicherweise angemessen. Das steht ausdrücklich als Ergänzung zur PDF im Musterkapitel; es ist keine starre Einheitsprotokoll-Anweisung.
- Patel et al. (AJNR 2014; DOI `10.3174/ajnr.A3948`): retrospektive Primärstudie zum DWI-Claw-Zeichen; Lektion kennzeichnet es als Zusatzzeichen.
- Meta-Analyse (2023; PMID `37843585`): TB- und pyogene Muster zeigen Gruppenunterschiede und Überlappung; dünne regelmäßige Abszesswand und subligamentäre Ausbreitung sind Ergänzungen mit Gruppenevidenz.
- PDF-Seiten 14–15 enthalten in der geprüften Vorlage Text/Tabellenstoff, aber keine nutzbare diagnostische MRI-Fallabbildung. Deshalb ist `/public/educational/spine-infection-schematic.svg` ein code-native räumliches Erklärschema, keine diagnostische Aufnahme. Die Bildunterschrift und der Alt-Text sagen dies ausdrücklich. Ein frame-verifiziertes MRI-Beispiel bleibt als spätere VIS-Aufgabe offen.

## Verknüpfungen und Status

- Der vorhandene Curriculum-Eintrag `spondylodiszitis` ist bereits mit der exakten Route `/wirbelsaeule/infektion` verknüpft. Zentrale Curriculum-Datei wurde nicht geändert. Globale Quiz-/Flashcard-Links fehlen; Assessment-Entwürfe sind noch nicht zentral verdrahtet. Der vorhandene Status `ready: true` lag bereits im Ziel-Worktree; Freigabe/Statusänderung bleibt explizit beim Koordinator.
- Ein dreisprachiger TB-Muster-MCQ, ein dreisprachiger DWI-Claw-MCQ und zwei Flashcards liegen in `data/mskSpineLessonAssessmentDrafts.js`. Sie sind lokale Entwürfe und noch nicht in globale Question-/Flashcard-Bänke verdrahtet. Der Mini-Fall ist direkt in der Lektion eingebettet.
- Der vorhandene `/wirbelsaeule/infektion`-Entwurf ist genau dieser Seitenstrecke zugeordnet. Keine zweite Spondylodiszitis-Route angelegt.

## Prüfung und verbleibende Lücken

Automatisierter Check: `scripts/test-spine-infection-14-15.mjs` prüft Quellen, Übersetzungen, Assessments, Route, exakten Curriculum-Link und Schema-Asset. Die unabhängige Delta-Prüfung bestätigte DWI-Abdeckung, vier Take-home-Regeln und dreisprachige Quellen-Tags; fokussierter Test, SSR der echten Route in DE/EN/FA inklusive RTL, Assessment-Retrieval-Audit und `git diff --check` bestanden. Browserprüfung und wissenschaftliche Freigabe bleiben offen. Die geprüften PDF-Seiten enthalten kein diagnostisches MRI-Fallbild; deshalb bleibt ein frame-verifiziertes Fallbeispiel eine offene VIS-Aufgabe.
