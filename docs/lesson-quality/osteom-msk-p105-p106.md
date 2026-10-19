# Osteom – MSK.pdf Seiten 105–106

## Interner Lehrplan

- Route: `/msk/tumoren/osteom`
- Ziel: Das typische kompakte, stark dichte CT-Muster erkennen, die Modalitäten einordnen, wichtige dichte Mimics unterscheiden und multiple faziale Osteome als möglichen Syndromhinweis weitergeben.
- Lernziele: Muster beschreiben; CT und MRT nach Fragestellung einsetzen; Osteom und Enostose anhand Ort/Wachstumsrichtung trennen; bei multiplen Osteomen eine APC-assoziierte Polyposis als Kontext berücksichtigen.
- Kapitel: (1) typisches Muster, (2) Modalitäten und Bildbeispiel, (3) klinischer Syndromhinweis, (4) wichtige Differenzialdiagnosen, (5) fallbasierter Abruf, (6) vier Regeln.
- Visuals: thematische SVG-Schemazeichnung im Hero; zwei vorhandene CT-Bilder aus PDF S. 105; Vergleichstabelle zu Modalitäten und Mimics.
- Terminologie: DE compact bone / osteoma / enostosis; EN compact bone / osteoma / enostosis; FA استخوان متراکم / استئوم / انوستوز.

## Quellenabdeckung

| ID | PDF / Druckseite | Inhalt | Bedeutung | Ort im Unterricht | Status / Hinweis |
|---|---|---|---|---|---|
| OS-01 | MSK.pdf 105 / Druck 104 | Reifer, extrem dichter kompakter Knochen | Essenziell | pattern | Eingebaut |
| OS-02 | MSK.pdf 105 / Druck 104 | Schädel, besonders Nasennebenhöhlen | Essenziell | pattern | Eingebaut |
| OS-03 | MSK.pdf 105 / Druck 104 | Langsames Wachstum, oft asymptomatisch/Zufall | Essenziell | pattern | Eingebaut |
| OS-04 | MSK.pdf 105 / Druck 104 | Symptome durch mechanische Verlegung oder Druck | Essenziell | pattern | Eingebaut |
| OS-05 | MSK.pdf 105 / Druck 104 | Röntgen/CT: scharf begrenzt, rund/oval, sehr dicht, homogen; keine Markraum-/Matrixaufhellungen, Destruktion oder Periostreaktion | Essenziell | pattern, modalities | Eingebaut |
| OS-06 | MSK.pdf 105 / Druck 104 | 500–1000 HU als typische Angabe | Ergänzend | pattern | Eingebaut als quellenspezifischer Bereich ohne unabhängigen diagnostischen Grenzwert |
| OS-07 | MSK.pdf 105 / Druck 104 | Zwei CT-Beispiele; left case labelled frontal sinus osteoma, rID 24249; right rID 10646 partly clipped | Essenzielles visuelles Beispiel | modalities | Eingebaut; user-approved PDF reuse; source case contributors/licence not recoverable from PDF |
| OS-08 | MSK.pdf 106 / Druck 105 | MRT T1/T2 signalarm; PDF sagt keine KM-Aufnahme | Essenziell | modalities | Eingebaut, ohne Abwesenheit des Enhancements als Beweis zu behandeln |
| OS-09 | MSK.pdf 106 / Druck 105 | Multiple Gesicht-/Kieferosteome, Weichteiltumoren, FAP; Radiologie kann Syndromkontext anstoßen | Essenziell | context, self-check | Eingebaut mit aktualisierter vorsichtiger Formulierung; siehe Konflikt |
| OS-10 | MSK.pdf 106 / Druck 105 | Osteoidosteom: kleiner Nidus/Sklerose/Nachtschmerz | Essenziell | differential | Eingebaut |
| OS-11 | MSK.pdf 106 / Druck 105 | Enostose im Spongiosaraum, bevorzugte Lokalisationen, Spiculae | Essenziell | differential | Eingebaut; „immer asymptomatisch“ aus Tabelle nicht als absolutes Regelwissen übernommen |
| OS-12 | MSK.pdf 106 / Druck 105 | Osteoblastom: größer, aggressiver, spinal | Essenziell | differential | Eingebaut als Hinweis, nicht Histologiediagnose |
| OS-13 | MSK.pdf 106 / Druck 105 | Verknöchertes Meningeom, Endokranium, meningeale Zeichen | Ergänzend | differential | Eingebaut knapp; keine bildgebende Fallbehauptung |
| OS-14 | MSK.pdf 106 / Druck 105 | Vergleich Osteom / Enostose: exophytisch vs. enostal, Ort, Oberfläche, mögliche Verdrängung | Essenziell | differential | Eingebaut; keine absolute Symptombehauptung für Enostosen |

## Wissenschaftliche Konflikte und Ergänzungen

- Die PDF bezeichnet FAP als „obligate Präkanzerose“. Diese Formulierung wurde nicht übernommen: FAP ist ein erbliches Prädispositionssyndrom für kolorektale Neoplasie; ein Osteom diagnostiziert FAP nicht. Die ACG-Leitlinie nennt Osteome als extraintestinale Merkmale, bei denen eine Abklärung auf adenomatöse Polyposis erwogen werden soll: Syngal et al., 2015, https://pmc.ncbi.nlm.nih.gov/articles/PMC4695986/. Der Selbstcheck fragt nun nach der Assoziation, bevor eine Polyposisdiagnose vorliegt, damit der richtige Schluss nicht aus der Frage selbst vorweggenommen wird.
- GeneReviews nennt Osteome unter mehreren Merkmalen, die auf APC-assoziierte Polyposis hindeuten können: https://www.ncbi.nlm.nih.gov/books/NBK1345/.
- Dichtewerte wurden nicht extern als alleiniger Schwellenwert bestätigt und deshalb ausdrücklich nur als PDF-Angabe gekennzeichnet.

## Mediennachweis

- Hero: `public/educational/osteom-hero.svg`, neue nichtdiagnostische Schemazeichnung, keine Patientendaten.
- CT-Abbildung: `public/educational/osteom-pdf-case.png`, Crop von MSK.pdf PDF S. 105, gedruckte S. 104. Die Seite wurde visuell gelesen. Der Scan nennt rID 24249 und teilweise rID 10646; ursprüngliche Beitragende und Lizenz sind nicht vollständig zu lesen. Nutzung gemäß ausdrücklicher Nutzerfreigabe der PDF-Abbildungen.

## Prüfstatus

- Autorensichtung: PDF-Seiten 105–106 textuell extrahiert und visuell gerendert/gesichtet.
- SSR-/Lokalisationstest: `node scripts/test-osteom-render.mjs` passed across DE/EN/FA and RTL.
- Unabhängige source/content/language/media review plus self-check delta: passed. Polish only: the crop retains tiny residual watermark/page-border areas; the live browser view remains gated and was not independently inspected.
- Browser- und mobile Prüfung: ausstehend; darf nicht aus einem Build oder SSR-Test abgeleitet werden.
- Klinische Freigabe: ausstehend; route is linked in curriculum with `ready`/`inProgress` status.
