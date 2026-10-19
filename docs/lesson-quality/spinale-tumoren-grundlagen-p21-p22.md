# Spinale Tumoren: Grundlagen nach Kompartiment — Wirbelsäule.pdf S. 21–22

Stand: 19.10.2026. Begrenzte Lesson für die existierende Curriculum-ID `spinale-tumoren-grundlagen`; Route `/wirbelsaeule/tumoren/grundlagen`. Sie verwendet nur PDF-Seiten 21–22 (gedruckte Seiten 20–21). PDF-Seiten 23–24 wurden nicht geprüft oder zugeordnet.

## Lernziel und Schnitt

Lernende sollen zunächst zwischen einer sklerotischen Wirbelkörperveränderung und einer Raumforderung im Spinalkanal unterscheiden, die in der PDF genannte Lage relativ zu Myelon/Duralsack beschreiben und eine Lagebeschreibung nicht als Histologie ausgeben.

Die drei Kapitel folgen der Quelle: (1) intramedullär, intradural-extramedullär und extradural (PDF S. 22); (2) Ivory-Vertebra und ausdrücklich im PDF benannte Differenziale (PDF S. 21); (3) ausgewählte MRT-Stichwörter zu den auf S. 22 aufgeführten Läsionen. Ein Selbstcheck prüft nur die Lagekategorie. Keine separaten Lektionen zu den Einzelentitäten werden beansprucht.

## Abdeckungsledger

| PDF-Stelle | Quellinhalt | Entscheidung / Ort | Grenze |
|---|---|---|---|
| S. 21, Definition und A/B | Einzelner diffus und homogen sklerosierter Wirbelkörper; erhaltene Größe/Kontur; zwei Radiographien; Beispiele im Kontext bekannter osteoblastischer Prostatakarzinommetastasen | Kapitel `ivory-vertebra` | Gezeigte Fälle sind Beispiele, kein exklusives Zeichen; PDF nennt rID 25354 und 96568, deren externe Ursprünge/Lizenzen wurden nicht verifiziert. Keine dieser Radiographien wird ins Produkt kopiert. |
| S. 21, DD | Osteoblastische Metastasen (PDF nennt Prostata bei Männern, Mamma bei Frauen), Morbus Paget mit Größen-/Kortikalis-/Trabekelhinweisen, Lymphom/Hodgkin | Teilweise unter `ivory-vertebra`; die Geschlechtszuordnung und pauschale Hodgkin-Aussage werden wegen fehlender unabhängiger klinischer Prüfung nicht als Regeln gelehrt | Originalformulierungen der knappen PDF nicht durch aktuelle Epidemiologie ersetzt. |
| S. 22, Tumorübersicht | Astrozytom und Ependymom intramedullär; Meningeom, Schwannom und Epidermoidzyste intradural-extramedullär; Metastase und Epiduralabszess extradural | `compartments`, `signal-patterns` | Epidermoidzyste und Epiduralabszess sind keine Tumoren; sie bleiben als Differenziale sichtbar. Nicht genannte Entitäten/Untertypen werden nicht ergänzt. |
| S. 22, Astrozytom | Alter, langstreckige Myelonauftreibung, T2-Hyperintensität, unscharfe Begrenzung, variable/oft geringe KM-Aufnahme | Eigene Zeile in `signal-patterns` | PDF-Stichwörter, nicht unabhängig klinisch geprüft. |
| S. 22, Ependymom | Erwachsene, symmetrische Myelonauftreibung, relativ schärfere Begrenzung, homogene KM-Aufnahme, Zysten/Blutung/Hämosiderin-Kappe | Eigene Zeile in `signal-patterns` | „Keine DWI“ beim Ependymom ist mehrdeutig und wird nicht als diagnostischer Test ausgebaut. |
| S. 22, Meningeom / Schwannom | Dorsal/thorakal, T1/T2-isointens, starke homogene KM-Aufnahme, Dural tail/Myelonverdrängung; Nervenwurzel, mögliche Foramenerweiterung, heterogen/zystisch/starke KM-Aufnahme | Je eigene Zeile in `signal-patterns` | PDF-Stichwörter, nicht unabhängig klinisch geprüft. |
| S. 22, Epidermoidzyste | Liquorähnliches T1/T2, DWI stark positiv, kein KM, laut PDF häufig LWS | Eigene Zeile in `signal-patterns` | Differenzial, keine Neoplasie; PDF-Stichwörter, nicht unabhängig klinisch geprüft. |
| S. 22, Metastase / Epiduralabszess | Wirbelkörperdestruktion, T1/T2-Hinweis, KM-Aufnahme/Kompression; Abszess T2, Rand-KM, DWI, Fieber/Infekt und Bandscheibenvorfall-DD | Je eigene Zeile in `signal-patterns` | Abszess ist nicht-neoplastisch; knappe PDF-Stichwörter, nicht unabhängig klinisch geprüft. |
| S. 23–24 | Vorläufige Karte hatte eine mögliche fachfremde Zuordnung zu Glomus caroticum/Carotid-body-Paragangliom notiert | Nicht verwendet | Keine Zuordnung zu `paragangliom-spinal`; Seiten müssen separat verifiziert werden. |

## Medien- und Übersetzungsplan

- Hero: lokales, code-natives axiales Kompartiment-Schema `public/educational/spinal-tumour-compartments.svg`; bony canal, Duralsack und Myelon haben separate Grenzen. Drei farbige Marker werden in der direkt anschließenden lokalisierten Legende räumlich zugeordnet; der extradural-Marker liegt innerhalb des knöchernen Kanals, aber außerhalb des Duralsacks. Das Bild ist ausdrücklich nicht diagnostisch.
- PDF-Radiographien A/B werden für diesen begrenzten Entwurf nicht wiederverwendet; es gibt kein diagnostisches MRT auf den verwendeten Seiten, das spinalen Tumorkompartimenten zugeordnet werden könnte.
- Inhalt, Kapitel, Selbstcheck, Feedback, Alt-Text und Quellengrenze sind DE/EN/FA lokalisiert. Die Tabellenantworten bleiben semantisch parallel; die lokalisierte RTL-Anzeige ist im Browser noch nicht geprüft.
- Es wurde keine zusätzliche externe wissenschaftliche Quelle hinzugefügt. Alle Läsionsdetails bleiben sichtbar als Angabe aus der PDF gekennzeichnet, weil keine unabhängige klinische Prüfung Teil dieses Arbeitsschritts war.

## Validierung und offene Gates

- `node_modules/.bin/tsx scripts/test-spinale-tumoren-grundlagen-render.mjs` — PASS: tatsächliches Shell-SSR in drei Sprachen, lokalisierte Datenfelder, Quellen- und Prüfungsmarker.
- `git diff --check` — PASS für diese Lesson-Änderungen.
- Browserdesktop/mobil, Theme, Interaktionen in echter Browserumgebung: offen.
- Unabhängige wissenschaftliche/klinische Review: offen; alle kurzen Befundbehauptungen sind daher quellgebundene Lernnotizen, keine Freigabe.
- Die unabhängige Quellen-/Inhalts-/Visual-Review und beide gezielten Retests sind bestanden; die zuvor festgestellte Sprach-/Bildüberschneidung wurde behoben. Curriculum-Link: `/wirbelsaeule/tumoren/grundlagen` (`inProgress`). Browser-/RTL-/Responsive-Review und klinische Fachfreigabe bleiben offen.
