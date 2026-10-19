# Lebergefäße: PDF-Abdeckung und Entwurf

Quelle: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Abdomen.pdf`, PDF-Seiten 2–4 (visuell geprüft). Der Abschnitt ist eine kurze Orientierung, kein vollständiger Gefäßatlas.

## Lernziel und Pfad

Lernziel: Zufluss über Pfortader und Leberarterie vom Abfluss über die Lebervenen in die Vena cava inferior unterscheiden.

Kapitelentwurf: (1) die beiden Zuflüsse und ihr Ursprung, (2) portalvenöser Zustrom gegenüber hepatisch-venösem Abstrom, (3) kurzer Richtungs-Selbstcheck. Keine nicht belegten Segment-, Varianten- oder Flussangaben ergänzen.

## Quellenabdeckung

| Quelle | Beobachtung | Verwendung / Grenze |
|---|---|---|
| p.2 | Abdominale Aorta mit Truncus coeliacus, A. hepatica communis, Nierenarterien und mesenterialen Ästen | Orientierungsbild für die arterielle Hauptachse; keine Aussage zu intrahepatischen Segmentästen |
| p.3, oberes Bild | Portalvene und spleno-mesenteriale Konfluenz neben Aorta und V. cava inferior; benannte viszerale Gefäße | Quellbild zum räumlichen Orientieren; einzelne dünne Beschriftungen werden nicht als Prüfungsstoff übernommen |
| p.3, unteres Bild | Truncus coeliacus mit A. hepatica communis sowie Ästen zu Magen, Milz und Pankreas | Nur die Leberarterien-Verbindung zum Truncus coeliacus wird aufgenommen |
| p.4 | Pfortaderzufluss: V. mesenterica superior + V. splenica; A. hepatica propria aus dem Truncus coeliacus via A. hepatica communis; Vv. hepaticae münden direkt in die V. cava inferior | Kerninhalt, in drei Sprachen übertragen |

## Visuelle Planung

- PDF-Seite 3, oberes Bild: auf den vollständigen oberen Gefäßplan mit allen Labels zugeschnitten; zeigt die Portalvenen-Konfluenz und die V. cava inferior. Der nicht relevante untere Arterienplan ist ausgespart. Crop-Koordinaten und Quelldimensionen stehen in `public/educational/abdomen-liver-vessels/provenance.json`; die dreisprachige Lernfrage verweist auf genau diesen Ausschnitt.
- Code-SVG als nichtdiagnostische Richtungsskizze: zwei Zuflüsse zur Leber und ein venöser Abfluss zur V. cava inferior. Nur Beziehungen aus p.4.
- PDF-Seite 2 wird als ergänzende Referenztafel für die abdominale arterielle Hauptachse angeboten; nicht als eigenständige Lektion über sämtliche Äste.

## Prüfung und offene Punkte

Unabhängige source/content/language/image review und crop delta: PASS. `node scripts/test-abdomen-liver-vessels-render.mjs` und `git diff --check`: PASS. PDF-Seiten 2–3 sind überwiegend beschriftete Tafeln; kleine Beschriftungen und deren räumliche Endpunkte wurden nicht einzeln als prüfungsrelevante Aussagen extrahiert. Die Quelle enthält keine Lebersegmentanatomie, keine Varianten, keine Doppler- oder Phasenlehre und keine Fallbildgebung. Diese Inhalte werden nicht ergänzt. Browser- und fachärztliche Prüfung bleiben offen.
