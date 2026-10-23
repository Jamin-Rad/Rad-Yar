# Lebergefäße: PDF-Abdeckung und Entwurf

Quelle: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Abdomen.pdf`, PDF-Seiten 2–4 (visuell geprüft). Der Abschnitt ist eine kurze Orientierung, kein vollständiger Gefäßatlas.

## Lernziel und Pfad

Lernziel: Hauptäste der abdominalen Aorta auf der beschrifteten Übersicht räumlich einordnen und den Zufluss über Pfortader/Leberarterie vom Abfluss über die Lebervenen in die Vena cava inferior unterscheiden.

Kapitelentwurf: (1) die beiden Zuflüsse und ihr Ursprung, (2) Hauptäste der abdominalen Aorta anhand der beschrifteten Quelltafel orientieren, (3) portalvenöser Zustrom gegenüber hepatisch-venösem Abstrom, (4) zwei kurze Bild-/Richtungschecks. Keine nicht belegten Segment-, Varianten- oder Flussangaben ergänzen.

## Quellenabdeckung

| Quelle | Beobachtung | Verwendung / Grenze |
|---|---|---|
| p.2 | Beschriftete Aorta abdominalis; Truncus coeliacus, A. hepatica communis, A. gastrica sinistra, A. splenica, Aa. renales, Aa. mesentericae, Aa. lumbales, A. phrenica inferior, A. suprarenalis media, Bifurcatio aortae, Aa. iliacae communes und A. sacralis mediana | Abbildung und kompakte Gruppentabelle in einem eigenen, quellenbasierten Orientierungsabschnitt; die Tafel ist als beschriftete Hauptäste und nicht als vollständiger Gefäßatlas gekennzeichnet. Die sichtbare Bildattribution „Dr. A. Michelau“ wurde in der Provenienz ergänzt. |
| p.3, oberes Bild | Portalvene und spleno-mesenteriale Konfluenz neben Aorta und V. cava inferior; benannte viszerale Gefäße | Quellbild zum räumlichen Orientieren; einzelne dünne Beschriftungen werden nicht als Prüfungsstoff übernommen |
| p.3, unteres Bild | Truncus coeliacus mit A. hepatica communis sowie Ästen zu Magen, Milz und Pankreas | Nur die Leberarterien-Verbindung zum Truncus coeliacus wird aufgenommen |
| p.4 | Pfortaderzufluss: V. mesenterica superior + V. splenica; A. hepatica propria aus dem Truncus coeliacus via A. hepatica communis; Vv. hepaticae münden direkt in die V. cava inferior | Kerninhalt, in drei Sprachen übertragen |

## Visuelle Planung

- PDF-Seite 3, oberes Bild: auf den vollständigen oberen Gefäßplan mit allen Labels zugeschnitten; zeigt die Portalvenen-Konfluenz und die V. cava inferior. Der nicht relevante untere Arterienplan ist ausgespart. Crop-Koordinaten und Quelldimensionen stehen in `public/educational/abdomen-liver-vessels/provenance.json`; die dreisprachige Lernfrage verweist auf genau diesen Ausschnitt.
- Code-SVG als nichtdiagnostische Richtungsskizze: zwei Zuflüsse zur Leber und ein venöser Abfluss zur V. cava inferior. Nur Beziehungen aus p.4.
- PDF-Seite 2 wird zusammen mit einer knappen, aus den sichtbaren Beschriftungen abgeleiteten Gruppentabelle im Abschnitt „Welche Hauptäste zeigt die Aorta abdominalis?“ verwendet; nicht als eigenständige Lektion über sämtliche Äste.

## Prüfung und offene Punkte

Vorherige unabhängige source/content/language/image review und crop delta: PASS. Die Ergänzung zur PDF-Seite 2 wurde unabhängig geprüft; SRC/EDU/VIS/LNG/ASM/REV: PASS im begrenzten Umfang. Der Fokus-SSR-Test und `git diff --check` liefen nach der Änderung erneut erfolgreich. Verwendet werden nur klar lesbare, ausdrücklich beschriftete Äste; die unvollständige Gonadenarterien-Beschriftung bleibt unberücksichtigt. PDF-Seiten 2–3 sind überwiegend beschriftete Tafeln; nicht jede kleine Endpunktlinie wird als Prüfungsstoff extrapoliert. Die Quelle enthält keine Lebersegmentanatomie, keine Varianten, keine Doppler- oder Phasenlehre und keine Fallbildgebung. Browserprüfung und fachärztliche Freigabe bleiben offen; Bildwiederverwendungsbedingungen jenseits der Nutzerfreigabe sind der PDF-Seite nicht zu entnehmen.
