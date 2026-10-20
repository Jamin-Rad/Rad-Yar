# Technik.pdf: Gadolinium-Retention-Bildbeispiel, PDF-S. 128

## Umfang und Lernziel

Begrenzte visuelle Ergänzung der vorhandenen Lektion
`/technik/kontrastmittel/mrt#retention`. Lernende sollen die in der Quelle
beschriebene Beobachtung auf einer nativen T1-Aufnahme lokalisieren und sie
nicht mit einer klinischen Erkrankung gleichsetzen. Es entsteht weder eine neue
Lektion noch eine neue Curriculum-ID.

## Quellenabgleich

| Quellpunkt | Seite | Umsetzung | Status |
|---|---|---|---|
| Hyperintensitäten im Nucleus dentatus und Globus pallidus auf nativem T1 nach mehrfacher Gabe linearer KM | Technik.pdf PDF-S. 128, Druck-S. 127 | Vorhandene Retentionslektion beschreibt die Beobachtung; die Pfeile der nativen T1-Quelle werden nun an einem direkten Seitenausschnitt gezeigt | Bild didaktisch zugeordnet; keine unabhängige klinische Verifikation |
| Klinische Relevanz laut PDF bisher unbekannt/kein Korrelat | PDF-S. 128 | Bildcaption stellt klar, dass die Abbildung eine Bildbeobachtung illustriert und keine klinische Erkrankung nachweist | Caveat übernommen |
| Nucleus dentatus und Globus pallidus anatomisch lokalisieren | PDF-S. 128 | Bestehende Erläuterung bleibt bestehen. Die verwendete axiale T1-Aufnahme zeigt den Pfeilbefund in der hinteren Schädelgrube; die separate Pallidum-Lokalisation wird nicht als sichtbar in diesem Einzelbild behauptet | Bestehende Lehrtextzuordnung beibehalten |
| Drei MRT-Panels: axiales natives T1 mit zwei Pfeilen, sagittales natives T1, axiales FLAIR; Quellkennung rID 40640 | PDF-S. 128 | Direkter Crop der drei Panels unter `public/kontrastmittel/technik-p128-gadolinium-retention.png`; englische, deutsche und persische Beschreibung, Interpretationscaption und Attribution | Visuell geprüft; freigegebener Nutzer-PDF-Ausschnitt |

## Lernpfad und Integration

Die Bildfolge bleibt in der vorhandenen Sektion `retention`; keine neue Kapitel-
oder Quizsektion wird angelegt. Die Caption lenkt auf die Pfeile in der nativen
axialen T1-Aufnahme. Der benachbarte bestehende Hinweis erhält die Quellenaussage,
dass ein klinisches Korrelat unbekannt ist. Das Topic `km-gadolinium-retention-nsf`
bleibt mit der MRI-Kontrast-Lektion verbunden; eine bildbasierte Frage zur
Identifikation des Nucleus dentatus ergänzt zwei vorhandene MCQs und wird als
dritte Flashcard abgeleitet. Die übrigen Assessmentclaims wurden nicht als
wissenschaftlich validiert übernommen.

## Validierung und offene Grenzen

- Technik.pdf PDF-S. 128 wurde textlich extrahiert und als Seitenbild gerendert;
  die Kopfzeile mit Retentionsaussage, drei MRT-Panels, Pfeile und `rID:40640`
  wurden visuell geprüft.
- `node --import tsx scripts/test-technik-p128-gadolinium-visual.mjs` prüft
  Quelle, Attribution, drei Sprachfassungen, Curriculum-Verknüpfung und
  bestehende MCQ-/Flashcard-Retrieval-Verknüpfungen.
- Unabhängiger Review, Browser-/RTL-/Responsive-Test und klinisch-wissenschaftliche
  Fachprüfung sind offen. Der bestehende Text und die Assessmentclaims zur
  Gadolinium-Retention/NSF sind nicht Gegenstand einer wissenschaftlichen
  Neubewertung in diesem engen Bild-Addendum.
- Das gesamte Themenfeld MRT-Kontrastmittel und die übrigen PDF-Seiten sind
  weiterhin nicht vollständig abgeglichen oder freigegeben.
