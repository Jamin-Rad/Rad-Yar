# MSK und Wirbelsäule: PDF-zu-Lektion Fortschritt

Stand: 19.10.2026. Arbeitsledger für `MSK.pdf` (138 PDF-Seiten) und `Wirbelsäule.pdf` (29 PDF-Seiten). Es trennt tatsächliche Routen von PDF-Themen; ein Routenname belegt keine inhaltliche Deckung. Die PDF-Seiten wurden textuell extrahiert; die Seiten 5–10 der Wirbelsäule wurden zusätzlich visuell geprüft. Das ist keine klinische Freigabe.

## Vorhandene Lektionen mit klarer Themenüberschneidung

| PDF-Seiten | Lektion / Route | Nächster Authoring-Schritt | Status dieses Batch-Schritts |
|---|---|---|---|
| MSK 2–3 | `frakturbeschreibung` · `/msk/trauma/frakturbeschreibung` | gegen Mechanismen, Frakturmorphologie und Dislokation in der PDF seitenweise abgleichen | Route erkannt; Inhaltsabgleich ausstehend |
| MSK 5–10 | `frakturen-kindesalter` · `/msk/trauma/frakturen-kindesalter` | Salter-Harris, greenstick/buckle, Toddler-, Triplane-/Übergangsfraktur und postoperative Kontrolle mit PDF abgleichen | Route erkannt; Inhaltsabgleich ausstehend |
| MSK 12–13 | `ak-luxation` · `/msk/trauma/ak-luxation` | Rockwood und Begleitbefunde gegen die PDF abgleichen | **Teilabgleich aktualisiert:** Projektionen/selektive Belastung, CCD-Messnotiz, Take-home und gewichtete-Aufnahme-MCQ/Flashcard sprachlich qualifiziert; übrige Inhalte/Abbildungen noch offen |
| MSK 15 | `radiuskoepfchenfraktur` · `/msk/trauma/radiuskoepfchenfraktur` | Mason-Muster und Gelenkbeteiligung abgleichen | Route erkannt; Inhaltsabgleich ausstehend |
| MSK 16 | `unterarmschaftfrakturen` · `/msk/trauma/unterarmschaftfrakturen` | Monteggia-/Galeazzi-Muster und gesamte Begleitverletzungssuche abgleichen | Route erkannt; Inhaltsabgleich ausstehend |
| MSK 17–18 | `distale-radiusfraktur` · `/msk/trauma/distale-radiusfraktur` | Fernandez, intraartikuläre Muster und Band-/Karpalbegleitverletzungen abgleichen | Route erkannt; Inhaltsabgleich ausstehend |
| MSK 34–35 | `sprunggelenk` · `/msk/trauma/sprunggelenk` | PDF-Muster, Projektionen und Stabilitätsaussagen abgleichen; externe Fallbildrechte separat klären | Route erkannt; Inhaltsabgleich und Rechteprüfung ausstehend |
| MSK 36–38 | `rotatorenmanschette` · `/msk/schulter/rotatorenmanschette` | PDF-Basics und Bildgebung gegen Route abgleichen; nur Inhalte aus den PDF-Seiten zuordnen, nicht automatisch die umfangreicheren Klassifikationen | Route erkannt; Inhaltsabgleich ausstehend |
| MSK 44–56 | `meniskus` · `/msk/knie/meniskus` | Risskriterien, Wurzel, meniskokapsuläre Separation, Extrusion und Pitfalls abgleichen; bestehende externe Bildrechte separat klären | Route erkannt; Inhaltsabgleich ausstehend |
| MSK 57–66 | `knieligamente` · `/msk/knie/kreuzbaender` | PDF-Seiten 57–66 gegen Kollateralbänder/VKB/HKB abgleichen; die PDF reicht über den bestehenden Curriculum-Kurztitel hinaus | Route erkannt; Inhaltsabgleich ausstehend |
| WS 11–13 | axSpA/ankylosierende Spondylitis und Morbus Scheuermann · neuer lokaler Entwurf `/wirbelsaeule/entzuendlich` | Lesbaren PDF-Text zu strukturellen Röntgen/CT-Zeichen und MRT-Aktivitäts-/Strukturzeichen (S. 11–12), Komplikationen (S. 12) sowie Sørensen-Kriterium und Differenzial zur flexiblen Haltungskyphose (S. 13) abdecken | Entwurf ergänzt; noch unregistriert, unlinked und unabhängig zu prüfen |
| WS 2–3 | Wirbelsäulentrauma · `/wirbelsaeule/trauma/{kraniozervikaler-uebergang,hws-verletzungen,bws-lws-frakturen}` | Seitenbilder/Text müssen erst einen inhaltlichen Match belegen; derzeit trägt die extrahierte Seite 3 kaum lesbaren Text | Überschneidung unbestätigt, nicht als Deckung zählen |

### Tatsächliche Dateiprüfung der bestehenden Überschneidungen

Die Route-/Moduldateien wurden geöffnet und die Überschneidungsschlüssel mit dem PDF-Text abgeglichen. In diesem Batch-Schritt wurde zusätzlich `data/frakturen-kindesalter.js` tatsächlich für MSK S. 5 (Salter-Harris III), S. 8–9 (Übergangsfrakturen/Triplane) und S. 5–6 (Take-home-Klassifikation) in DE/EN/FA aktualisiert; alle übrigen Zeilen sind weiterhin Themenprüfung, keine behauptete Inhaltsänderung:

| Bestehender Inhalt | Beobachtete Überschneidung | Was noch offen ist |
|---|---|---|
| `data/frakturbeschreibung.js` | Mechanismus, Morphologie, Gelenkbeteiligung und Dislokationssprache aus MSK S. 2–3 | Frakturtypen und jede zusätzliche Klassifikation einzeln auf Quelltreue, Prägnanz und MCQ/Flashcard-Konsistenz prüfen |
| `data/frakturen-kindesalter.js` | Salter-Harris, Toddler- und Übergangsfrakturen; MSK S. 5–10 | **Teilaktualisiert:** Salter-Harris III table/take-home-Text auf S. 5–6 differenziert; Übergangsfraktur-Hinweis, Triplane-MCQ und Karten zu S. 8–9 in drei Sprachen angeglichen; CT als bedingte Ergänzung statt „immer“, PDF-Wert ≥2 mm als quellgebundener Lernwert und keine alleinige Operationsregel. Übrige Route S. 5–7/10, Medien-/Übersetzungsprüfung und Fragenkonsistenz bleiben offen. |
| `data/ak-luxation.js` | AC-Luxation/Rockwood; MSK S. 12–13 | **Teilweise tatsächlich aktualisiert:** gezielter Abgleich der Projektionen/Belastungsaufnahmen und CCD-Messnotiz, Take-home sowie MCQ und Karteikarte. Die PDF-Technik „10–15 kg pro Seite“ bleibt ausdrücklich als PDF-Angabe erhalten; ihre Anwendung ist nun an konkrete Fragestellung/lokales Protokoll gebunden. Evidenzlage korrekt als widersprüchlich beschrieben: Nordin et al. (online 2020, Ausgabe 2021), DOI 10.1177/0284185120939270, fanden keinen signifikanten Klassifikationsgewinn; Ibrahim et al. (2015), DOI 10.1016/j.injury.2015.06.028, berichteten Wert bilateraler gewichteter Ansichten. Der PDF-Orientierungswert 11–13 mm ist ausdrücklich bis zu einer unabhängigen Normwertquelle als ungeprüft/pending markiert. Rockwood wird als verbreitet, nicht als „Goldstandard“ bezeichnet. Nicht geprüft/aktualisiert: vollständige Typ-für-Typ-Merkmale, Therapietext, echte Bildbeispiele/-rechte und übrige Assessment-Übersetzungen. |
| `data/radiuskopf.js` | Radiusköpfchen/Mason; MSK S. 15 | Klassifikation, Begleitverletzungen und Translationen einzeln prüfen |
| `data/unterarmschaftfrakturen.js` | Unterarmschaftfrakturen/Monteggia-Galeazzi; MSK S. 16 | Bild-/Begleitverletzungsabgleich und linked assessments prüfen |
| `data/distale-radiusfraktur.js` | distale Radiusfraktur; MSK S. 17–18 | Fernandez-/Musterzuordnung und Begleitverletzungen einzeln prüfen |
| `app/msk/trauma/sprunggelenk/page.js` | Weber A–C, Stabilität; MSK S. 34–35 | Klassifikations-, Belastungs- und Fallbildaussagen sowie Radiopaedia-Rechte prüfen |
| `app/msk/schulter/rotatorenmanschette/page.js` | Rotatorenmanschetten-MRT; MSK S. 36–38 | weitere PDF-Unterthemen S. 39–43 sind nicht durch diese Route gedeckt; MRI-Beispiele/Übersetzungen prüfen |
| `app/msk/knie/meniskus/page.js` | Rissmorphologie, Wurzel, Extrusion, Pseudoläsionen; MSK S. 44–56 | gesamtes Assessment und jede Bildattribution/-lizenz mit PDF abgleichen |
| `app/msk/knie/kreuzbaender/page.js` | Knieband-MRT; MSK S. 57–66 | PDF S. 67–71 Patella-/Patellarsehneninhalte bleiben außerhalb dieser Route; aktuelle Schwellen und Fragen prüfen |

`data/frakturen-kindesalter.js` erhielt eine abgegrenzte Inhaltsänderung; `data/ak-luxation.js` erhielt zusätzlich die oben dokumentierte Teilkorrektur zu Belastungsaufnahmen und CCD. Die übrigen Bestandsrouten wurden nicht aktualisiert. Dort müssen Module, verlinkte MCQs/Flashcards, DE/EN/FA-Texte und Medien tatsächlich geprüft und nötigenfalls geändert werden.

Zusätzlicher lokaler Entwurf ohne globale Curriculum-/Assessment-Integration: `data/spineInflammatoryStructural.js` und `/wirbelsaeule/entzuendlich` behandeln ausgewählte **bildgebende** Muster aus Wirbelsäule.pdf S. 11–13. Der Entwurf deckt keine klinische Definition, Epidemiologie, Merkmale des entzündlichen Rückenschmerzes oder extraartikulären Manifestationen ab; diese Inhalte wurden bewusst als Lücke ausgewiesen und nicht ergänzt. Die vier Kapitel trennen (1) chronische strukturelle axSpA-Zeichen auf Röntgen/CT (S. 11–12), (2) aktive MRT- und chronische Strukturzeichen samt ASAS-Klassifikations-/Diagnosecaveat (S. 12), (3) im PDF genannte Komplikationen und niedrige Trauma-Schwelle bei ankylosierter WS (S. 12) und (4) Scheuermann nach Sørensen sowie die flexible Haltungskyphose als DD (S. 13). Ein interaktiver Fall prüft das Mehrwirbel-Keilmuster. Zwei MCQ- und zwei Karteikartenentwürfe liegen nur im scoped assessment module. Das Schema zeigt nur schematische Wirbelkörper-Silhouetten, knöcherne Brücken und Keilung; es bildet keine SI-Gelenkanatomie ab und ist nicht diagnostisch. Quellen im Kapiteltext: ASAS MRI Working Group 2016, DOI 10.1136/annrheumdis-2015-208642; AO Surgery Reference Scheuermann; PDF-Seiten als unmittelbare Stoffquelle. Eine Suche der vorhandenen App-Routen/Module fand vor dem Entwurf keine passende eigene Lektion für Bechterew/axSpA oder Scheuermann; diese neue Route ist daher noch unregistriert und unlinked. Der Entwurf ist nicht klinisch freigegeben und wurde nicht per Browser geprüft.

Die Übergangsfraktur-Formulierung wurde anhand der PDF-Seiten 8–9 und aktueller Primärliteratur eingegrenzt: CT wird häufig für Fragmentmuster/Knorpelfläche zur Entscheidungsunterstützung ergänzt, aber „immer CT“ wurde nicht als ausnahmslose Regel belassen. Die häufig verwendete 2-mm-Operationsschwelle ist in der Literatur selbst begrenzt belegt und darf nicht als einzelnes Automatikkriterium gelehrt werden (Liporace et al., 2012, PMID 22310408; Lurie et al., 2020, PMID 32079882; aktueller CT-Korrelationsdatensatz 2025, PMCID PMC12081384). Die Lesson benennt ≥2 mm als Angabe der PDF und trennt sie von einer generellen Therapieanweisung.

## Neu angelegter, quellengestützter Entwurf

### Korrektur nach unabhängiger Review-Runde (19.10.2026)

Die drei unten angelegten Routen wurden nach konkreten Review-Befunden aktualisiert:

| Route | Tatsächlich ergänzte/geänderte Inhalte | Quelle / aktueller Beleg | Status |
|---|---|---|---|
| `/wirbelsaeule/degenerative` | Kapitel nun in PDF-Reihenfolge Modic S. 5 → Bandscheibe S. 6 → Facette S. 7 → Stenose S. 8. Stenoseabschnitt ergänzt um kompressive Myelopathie für HWS/BWS und den anatomischen Unterschied zur Duralsack-/Cauda-equina-Kompression unterhalb des Conus in der LWS. Signal-/Prognoseabschnitt differenziert: T2 allein wird nicht als reversibel/irreversibel gedeutet; T1+T2 und mehrsegmentales T2 als Kohortenassoziation mit geringerer postoperativer Erholung, nicht Individualprognose; DWI-Superiorität und Restriktions-Irreversibilität aus dem PDF werden wegen methodischer Grenzen nicht übernommen. Drei knappe Take-home-Punkte und lokalisierte Quellen-/Breadcrumb-Labels ergänzt. | Wirbelsäule.pdf S. 5–8; Nouri et al. global DCM cohort (2017), DOI 10.1097/BRS.0000000000002234; Li et al. ZOOM-DWI original study (2024), DOI 10.1007/s00586-023-08110-8; AO Spine synthesis (2025) | Autorfix erledigt; unabhängige Nachprüfung angefragt, noch ausstehend |
| `/wirbelsaeule/infektion` | TB-Muster ergänzt: mehrere Wirbel, relative frühe Bandscheibenerhaltung, große glatt begrenzte paravertebrale/Psoas-Kollektion; Differenzialdiagnosen um Neoplasie, erosive Osteochondrose und Andersson-Läsion bei ankylosierender Spondylitis erweitert. Formulierungen als Muster/Hinweise mit notwendiger klinischer und mikrobiologischer/histologischer Korrelation gekennzeichnet. | Wirbelsäule.pdf S. 14–15; MRI-TB-vs-pyogenic meta-analysis 2023 (PMID 37843585); TB imaging review (2021) | Autorfix erledigt; unabhängige Nachprüfung angefragt, noch ausstehend |
| `/msk/tumoren/knochenzeichen` | Quellenangaben pro Kapitel in DE/EN/FA lokalisiert. Keine fachlichen Inhaltsänderungen in dieser Review-Reparaturrunde. | MSK.pdf S. 73–76; References linked in lesson | Nur Übersetzungs-/Quellenlabel-Fix; kein erneuter fachlicher Review |

### Reparaturen nach der zweiten unabhängigen Review-Runde

| Fund | Reparatur | Nachprüfung |
|---|---|---|
| `MSKWS-SRC-06` | Nouri-Studie nun korrekt als Kohorte mit 419 MRT-Untersuchungen (nicht 419 Personen/Patienten) beschrieben. | Checker erwartet explizit `419 MRI examinations`. |
| `MSKWS-ASM-01` | Alte DE/EN/FA-Fragen und Lernkarten zu Salter-Harris III/IV und Tillaux/Triplane bereinigt: keine pauschale Aussage „immer CT“ und keine `>2 mm` als automatische OP-Indikation; die Beurteilung wird an Gelenkstufe und Reposition gebunden. Lurie et al. (JBJS 2020, DOI 10.2106/JBJS.19.01170) wird als Beleg für die begrenzte Evidenz der üblichen Schwelle genannt. | Der Checker prüft neben Sprachfeldern auch, dass die veralteten Claims im Lesson-/Assessment-Modul fehlen; erneut erfolgreich ausgeführt. |
| `MSKWS-SRC-06` Ergänzung | Nouri-Angaben zur Leserübereinstimmung präzisiert: κ=.31 (mäßig) gilt für T1-Hypointensität; κ=.60 (substantiell) für T2-Hyperintensität. Keine pauschale Bewertung beider Sequenzbefunde mehr. | Checker prüft beide Zahlen und ihre sequenzspezifische Zuordnung in DE/EN/FA. |
| `MSKWS-ASM-01` Ergänzung | Triplane-Haupttext korrigiert: CT kann abhängig von Röntgenklarheit, Frakturmuster und Behandlungsplanung ergänzt werden; nicht universell „essenziell“. | Checker sucht in Lesson- und Assessment-Modul nach verbliebenen universellen CT-Behauptungen. |
| `MSKWS-ASM-02` | Die Karte `fk-fc-triplane` fragt nun, wann CT zusätzliche Information liefern kann. Die Antwort nennt unzureichende Röntgendarstellung der Fragmentkonfiguration/Gelenkstufe oder zusätzlichen Planungsbedarf als bedingte Gründe, jeweils in DE/EN/FA. | Autorencheck erfolgreich; unabhängige Nachprüfung erneut angefragt. |
| `MSKWS-ASM-03` | Kategorische Aussagen „Typ III/IV disloziert = OP“ aus Salter-Harris-Tabelle und Take-home entfernt. Nun werden Gelenkfläche, Reposition, Ort und Dislokation als Entscheidungskontext genannt; der PDF-Hinweis „oft operativ“ bei exakter anatomischer Rekonstruktion von Typ III bleibt differenziert erhalten. | Checker weist die alten DE/EN/FA-Formulierungen zurück; Abgleich mit MSK.pdf S. 5–6 und Pädiatrie-Ankle-Guidance. |

**VIS, offen für alle drei Lektionen:** Die vorhandenen SVGs sind selbst gezeichnete, nicht-diagnostische Erklärschemata. Sichtbare englische Beschriftungen wurden entfernt; Bild-Alttexte sind lokalisiert. Eine frame-verifizierte diagnostische Fallserie wurde noch nicht in die Website übernommen. Konkrete Voraussetzung: Dr. Zia/Repository-Betreiber muss entweder (a) ein konkretes, zur Weiterverwendung freigegebenes anonymisiertes DICOM/PNG/MR-/Röntgen-Studium mit Frame-/Sequenzangabe und Caption bereitstellen oder (b) einen exakt identifizierten CC-BY-Fall samt Autor-/Lizenzattribution und Freigabe zur lokalen Aufnahme auswählen. Die recherchierte TB-Literatur nennt passende Figuren, aber in dieser Reparatur wurde weder der konkrete Frame vor Ort verifiziert noch ein Bilddatei-/Lizenzattributionspaket gesichert; daher wird keine diagnostische Abbildung als erledigt gezählt. Die Review-Gates VIS bleiben BLOCKED bis diese Voraussetzung erfüllt ist.

`node_modules/.bin/tsx scripts/check-msk-spine-authorship.mjs` prüft Route-Daten, Kernbegriffe/Quelle, Sprachfelder, Kapitelreihenfolge sowie lokale SVG/XML-Integrität und kontrolliert, dass die separat dokumentierten VIS-Blocker bestehen bleiben. Diese Prüfung ersetzt weder Browser-Rendering noch unabhängige klinische Prüfung.

`/wirbelsaeule/degenerative` deckt ausschließlich die lesbaren Themen aus `Wirbelsäule.pdf`, PDF-Seiten 5–8: Bandscheibenprotrusion/-extrusion/-sequester und axiale Lokalisation (S. 6); Modic-Muster samt DWI-Claw-Hinweis (S. 5); Facettengelenkaktivität und CT/MRT-Zeichen (S. 7); zentrale Spinalkanalstenose, neurale Bedrängung und im PDF genannte Messwerte (S. 8). Ein eigenes SVG veranschaulicht nur die räumlichen Beziehungen und ist kein diagnostischer Bildbeleg. Die Schwellenwerte sind in der Lektion sichtbar als PDF-Werte markiert und wissenschaftlich nicht freigegeben.

`/wirbelsaeule/infektion` deckt den klar lesbaren Spondylodiszitis-Abschnitt aus PDF S. 14–15 ab: Diskus-/Endplattenmuster, Weichteil-/Abszessausdehnung, vorsichtige Abgrenzung zu Modic I, TB-verdächtige Verteilung/Abszessmorphologie sowie kurze Hinweise zu Neoplasie, erosiver Osteochondrose und Andersson-Läsion. Diese Ätiologiehinweise sind keine separaten vollständigen Krankheitslektionen. Für die MRT-Empfehlung sind IDSA (2015) und ACR (2024) verlinkt; der DWI-Claw-Hinweis ist mit einer retrospektiven AJNR-Primärstudie (2014) verknüpft. Es wird ausdrücklich nicht als alleinige Diagnose oder verlässlicher Ausschlusstest dargestellt. Ein selbst gezeichnetes SVG illustriert nur Kompartimente, keine echte Bildgebung.

`/msk/tumoren/knochenzeichen` deckt die allgemeinen Aggressivitätsmuster aus `MSK.pdf`, PDF S. 73–76 ab: Periostreaktionen, Matrixmuster sowie Lodwick I–III. Das Lesson-Intro grenzt radiologische Heuristiken ausdrücklich von Histologie/Diagnose ab. Codman-/Sunburst-/Lamellenzeichen werden nicht als tumorspezifisch vermittelt. Quellenlinks führen zur ursprünglichen Lodwick-Arbeit, einer aktuellen Rekonstruktion des Entscheidungsbaums und der Periostreaktionsstudie. Ein eigenes SVG zeigt schematisch Reaktionstypen, keine Fallbilder.

Die Extraktion auf Seiten 9–10 ist unvollständig; `Spondylolisthesis` und `Ossifikation spinaler Ligamente` fehlen daher im Entwurf. Der Routenname und die Curriculum-Verknüpfung sind noch in die globale Navigation/Curriculum zu integrieren; globale Dateien wurden bewusst nicht editiert.

## Nicht abgedeckte PDF-Themen und Grenzen

- MSK S. 11–33: zahlreiche obere Extremitäten-, Becken- und Hüftfrakturen, Skaphoid/Karpalia, Daumenband und Femur. Für viele Curriculum-IDs existiert noch keine Route; konkrete Lektionen sind nicht in diesem Batch-Schritt gebaut.
- MSK S. 39–43: Schulterinstabilität und Hand-/Handgelenks-MRT inklusive De-Quervain. Keine passende Route verifiziert.
- MSK S. 67–71: Patella, Patellafraktur und Osgood-Schlatter; keine passende Route verifiziert.
- MSK S. 72: Infektionsabschnitt im Textauszug fast leer. Die Themen Osteomyelitis/septische Arthritis brauchen Bild-/Seitenprüfung, bevor eine inhaltliche Lektion daraus abgeleitet wird.
- MSK S. 73–76: allgemeine Aggressivitätsmuster als Entwurf angelegt. MSK S. 77–119 umfasst viele primäre/metastatische/tumorähnliche Knochenläsionen; pro Diagnose wurde hier noch keine seitenweise Lektion angelegt oder wissenschaftlich abgeglichen.
- MSK S. 120–129: AVN, Knocheninfarkt, Osteochondrosen und OCD; keine passende Route verifiziert.
- MSK S. 130–138: metabolische Osteopathien und Gefäße/PAVK; keine passende Route verifiziert.
- Wirbelsäule S. 4–10: neuer Entwurf deckt nur S. 5–8 ab. S. 4 ist Überschrift, S. 9–10 bleiben wegen OCR-/Lesbarkeitslücken offen.
- Wirbelsäule S. 11–13: lokaler Entwurf zu Morbus Bechterew/axSpA und Morbus Scheuermann angelegt; offen bleiben unabhängige Inhaltsprüfung, klinische Quellenprüfung, echte Diagnostikbilder/Rechte und spätere zentrale Registrierung/Navigation.
- Wirbelsäule S. 14–15: Spondylodiszitis-Entwurf und begrenzte TB-/Mimic-Muster angelegt. Vollständige, jeweils separate Lektionen zu TB, erosiver Osteochondrose und ankylosierender Spondylitis sind nicht erarbeitet.
- Wirbelsäule S. 16–20: Arachnoiditis, Abszess, Leptomeningitis und radikuläre/intramedulläre Themen; mehrere Seiten sind leer oder OCR-fehlerhaft, Zuordnung bleibt offen.
- Wirbelsäule S. 21–24: Wirbeltumoren und intramedulläre Tumoren; S. 23–24 sind Glomus-caroticum-Thema und kein belegter spinaler Paragangliom-Inhalt. Nicht der Wirbelsäulenlektion zuordnen.
- Wirbelsäule S. 25–29: vaskuläre Fehlbildungen, Spina bifida und metabolische Themen; extrahierter Text auf S. 25–27 teilweise unbrauchbar.

## Nächste Integrations- und QA-Schritte

1. Globale Curriculum-IDs/Links für die neuen Lektionen `degenerative-wirbelsaeule`, `spondylodiszitis` (Route `/wirbelsaeule/infektion`) und `knochentumor-grundlagen` (Route `/msk/tumoren/knochenzeichen`) ergänzen; dies war in der Autoraufgabe ausdrücklich aus dem lokalen Scope ausgenommen.
2. Für vorhandene MSK-Routen Inhalte, Diagramme, DE/EN/FA-Parität, Fragen und Lernkarten wirklich gegen die oben genannten Seiten prüfen und notwendige Änderungen dokumentieren.
3. Seitenbilder der offenen/illustrationsreichen Strecken einzeln zuordnen, insbesondere MSK 11–43 und 73–138 sowie WS 11–29.
4. Eine unabhängige Review-Agent-Runde für den neuen Entwurf und danach die geänderten vorhandenen Routen ausführen.
5. Browser-/Build-Prüfung koordiniert auf Repository-Ebene durchführen; keine Freigabe aus dieser Autorarbeit ableiten.
