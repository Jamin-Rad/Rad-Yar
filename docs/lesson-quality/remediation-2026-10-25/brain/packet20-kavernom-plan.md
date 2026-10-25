# Kavernom: ursprünglicher Assessmentpool, Paket20

Autor: `/root/brain_original_pools_next`, 25.10.2026. Expliziter Checkout `C:/Users/Drham/Documents/GitHub/Rad-Yar/.worktrees/gehirn-completion-main`. Ownership nur `data/kavernom.js` und unmittelbar zugehörige Route `app/gehirn/vaskulaer/kavernom/page.js`; gemischte Banken nur exakte Before/After-Vorschläge an Root. Andere Autoren arbeiten parallel; keine fremden Änderungen zurücksetzen. Build14-Schreibhold wurde von Root aufgehoben. Keine Builds, Server, Git- oder Browseraktionen durch diesen Autor.

Zielgruppe: Lernende der neuroradiologischen Befundung mit Kenntnis von T1/T2, Suszeptibilität und vaskulärer Anatomie. Nach der Lektion sollen sie ein typisches Kavernommuster begründet einordnen, diagnostische Grenzen erkennen und DVA sowie klinischen Kontext im Befund berücksichtigen.

Aktueller tatsächlicher Pool vollständig vor Änderung gelesen:12ursprüngliche Fragen×DE/EN/FA und15Kartentriaden; alle aktuellen KeysA. IDs und Keys bleiben stabil, keine zusätzlichen Quotenitems. Ganze aktuelle Lektion einschließlich vorhandener Falltexte gelesen; das ist keine erneute wissenschaftliche Freigabe jedes unveränderten Satzes oder Patientendatensatzes. Vorher-Snapshots unter `tmp/assessment-quality/kavernom-original-before.json`, `kavernom-original-before.js`, `kavernom-route-before.jsx`.

Die Dateien `skills/radyar-lessons/SKILL.md`, Qualitätsstandard, Seitendesignprinzipien und Reviewtemplate sind gelesen. CAA führt die Didaktik, `/andarun/test` die vorhandene gemeinsame Hülle. Das bestehende Kapitelgerüst wird beibehalten; kein neues Kapitel für eine vertraute Vorlage.

## Exakte vorgesehene Kapiteltitel und Zweck vor der Umsetzung

| ID | Titel DE | Zweck |
|---|---|---|
|grundlagen|Definition & Pathophysiologie|Gefäßräume und Low-flow-Grundlage mit dem typischen Muster verknüpfen.|
|klinik|Klinik, Lokalisation & Blutungsrisiko|Symptome, Vorblutung und Lokalisation von isolierten Signaländerungen unterscheiden.|
|mrt|MRT: Sequenz für Sequenz|T1/T2, moderne Suszeptibilität, Kontrast und Messgrenzen kombiniert interpretieren.|
|zabramski|Zabramski-Klassifikation|Morphologische Typen benennen, winzige Suszeptibilitätsfoci nicht überdiagnostizieren.|
|assoziation|Kavernom + DVA|Funktionelle Drainage erkennen und ihre Erhaltung bei Therapieplanung berücksichtigen.|
|differenzial|Differenzialdiagnose|Tumor, Teleangiektasie, AVM und Mikroblutungen anhand kombinierter Merkmale abwägen.|
|fall|Fallbeispiele|Bestehende, unveränderte PDF-abgeleitete MRT-Beispiele lesen; keine neue Fallinterpretation behaupten.|
|management|Management|Symptome und Zugänglichkeit gegen Eingriffsrisiko abwägen; keine automatische OP-Regel.|
|takehome|Take Home Message / پیام نهایی|Bestehende gruppierte Zusammenfassung mit den relevanten Einschränkungen verdichten.|

EN/FA-Titel und Kapitel-IDs der bestehenden Kapitel bleiben außer der vorgeschriebenen lokalisierten Zusammenfassungsüberschrift erhalten. Ein tatsächlicher kanonischer Inlinecheck kann in das passende MRT-/Differenzialkapitel eingebettet werden; kein neues Kapitel. Vier/fünf explizite Ziele werden im ersten Kapitel sichtbar.

## Lernziele auf echte IDs

| Ziel | Fragen (Sprachsuffix DE/EN/FA) | Karten | Quellenlesebereich |
|---|---|---|---|
|Typisches MRT-Muster, Suszeptibilitätsdiagnostik und Grenzen gegenüber Mimics erklären|01,02,03,04,10,11|01definition,02popcorn,03swi,04dsa,05z2,06z4,14dd|PDF31–32;Akers2025S5–7/Table2–3;El-Koussy2012Methoden/Ergebnisse/Diskussion;Nikoubashman2015Table1.|
|Multiple Kavernome im DVA-, Strahlen- und Familienkontext einordnen|05|07familiaer|Akers2025S3–5/7,Genetik und Diagnosekriterien.|
|Kavernom/DVA-Befunde und deren therapeutisch relevante Drainage unterscheiden|06,07|10dva,11dva-erhalt|PDF32;Akers2025S8DVA-Abschnitt, keine kontrollierte universelle Resektionsregel behaupten.|
|Klinische Symptome und individuelle Blutungsrisikofaktoren von bloßer Signaländerung trennen|08,09|08epilepsie,09risiko|PDF31;Akers2025S3Definition;Horne2016Abstract/Ergebnisse.|
|Strukturierten Befund und kontextabhängige Behandlung statt Automatismus begründen|12|12konservativ,13op,15befund|PDF32;Akers2025S6/8/11Table4.|

Kartennamen sind im Handoff in vollständige existierende IDs `kavernom-XX-...` aufzulösen; Frage-ID-Muster `kavernom-de/en/fa-XX`. Das Ziel-Union soll alle12Fragen und15Karten enthalten.

## Quellen- und Konfliktplan

* Nutzerdatei `C:/Users/Drham/OneDrive/Desktop/Lerncore/Gehirn.pdf`:89Seiten, SHA256 `f2a4d1b92f7c2bd95be20997d1ab4388b3bc18e8fbb5b438396b03f977275206`. Physische31/32 entsprechen gedruckten30/31. Beide frisch extrahiert, mit Poppler neu gerendert und beide tatsächlichen Bilder angesehen; einschließlich9abgebildeter MRT-Panels. Keine unlesbaren relevanten Stellen. Render `tmp/assessment-quality/brain-next-pdf/kavernom-31.png` und `-32.png`.
* Akers et al.,2025online/2026Print, DOI `10.1227/neu.0000000000003459`: tatsächlich ursprüngliches20seitigesPDF bei Alliance geöffnet. Gelesen: Prävalenz/Genetik, symptomatische intra- oder extraläsionale Blutungsdefinition, Diagnose/MRT/Überlappung/Kontrast, Table2–3 und DVA-/Managementabschnitte/Table4. Kein vollständiger Review aller neurologischen/spinalen Therapien behauptet.
* Q11alt ist mehrdeutig: zwischenliegendes Hirnparenchym allein ist kein exklusives positives Kriterium gegenüber den anderen vaskulären Optionen. Gezielter neuer klinischer Kontext (kleine pontine, wenig T2-veränderte, pinselartig kontrastierende Läsion mit Suszeptibilität, ohne retikulären Popcornkern) verankert die Teleangiektasie-AntwortA. El-Koussy2012, DOI `10.3174/ajnr.A2893`, vollständiger Originalabstract und relevante Methoden/Ergebnisse/Diskussion frisch gelesen. Keine erfundene Bildreferenz.
* Zabramski-TypIV beschreibt ein bildmorphologisches punktförmiges Suszeptibilitätsmuster; es beweist weder familiäre Erkrankung noch für jeden einzelnen Fokus ein histologisch gesichertes Mikrokavernom. Originalforschung Nikoubashman2015 (`PMC7964862`) reproduziert die ursprüngliche Klassifikation in Table1; Tabelle und diagnostische Unsicherheitsdiskussion gelesen, keine numerischen pädiatrischen Raten übernommen. Original1994Volltext nicht behauptet.
* Horne2016Individualdaten-Metaanalyse (`10.1016/S1474-4422(15)00303-8`): vollständige Originalzusammenfassung und relevante Ergebnisse frisch gelesen; Vorstellungsmodus und Hirnstamm als unabhängige Prädiktoren, keine individuelle Prozentvorhersage oder allgemeine1%/Jahr-Regel.
* PDFpauschalen 'DWI unauffällig', 'immer kein Enhancement', bloße Multiplizität=familiär, Extraläsionsblut als notwendige Blutungsvoraussetzung und jede symptomatische Blutung=OP werden nicht in starre Entscheidungsregeln überführt. Kontrast allein beweist keinen Tumor, akute Blutung kann Muster verbergen; individuelle Beurteilung und Verlauf bleiben wichtig.

## Medienplan und Grenzen

Alle bestehenden Bildpfade, Sequenzlabels, Alt-Triaden und Fälle (`rID32602`, Unterrichtsserie lautPDFrID9773) unverändert lassen. Keine neuen Bilddateien, Bildbefunde oder Rechtebehauptungen. Für die Text-MCQs vollständig beschriebene Vignetten verwenden. PDF-Bildsichtung ist keine komplette Patientenstudien-/Radiopaedia- oder Browserfreigabe. In den vorhandenen Quellenabschluss passende Primärlinks aufnehmen; keine technische Implementierungsprosa in Lernendenpfade.

Vor Handoff: tatsächliche 36Fragenobjekte/15Karten, spezifisches Fehlfeedback, Quellen und DE/EN/FA-Felder prüfen; exakte semantische Lehr-/Assessmentdeltas, ID/Key-Stabilität, vorhandene Medienparität und Runtime-Hashes dokumentieren. Root organisiert danach eine getrennte unabhängige Prüfung. Ärztliche Freigabe bleibt Dr.Zia, Build/Browser/Publikation bei Root.
