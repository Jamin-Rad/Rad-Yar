# Spinalkanalstenose — Wirbelsäule.pdf p.8

## Identität und Umfang

- PDF: `C:/Users/Drham/OneDrive/Desktop/Lerncore/Wirbelsäule.pdf`, physische PDF-Seite 8, gedruckte Seite 7.
- Route / Thema: `/wirbelsaeule/degenerative`, `spinalkanalstenose`, Kapitel `stenosis` in `data/spineDegenerative.js`.
- Geprüfte Quelle: extrahierter Text und gerenderte Seitenabbildung `tmp/spine-stenosis-p8-08.png`.
- Umfang: nur die Seite zur Spinalkanalstenose und kompressiven Myelopathie. Die unkommentierte Überschrift „Neuroforamenstenose“ auf derselben Seite ist nicht abgedeckt.
- Lernpfad (bestehende Titel beibehalten): **„Engt die Stenose neurale Strukturen ein?“** — Etage, Kompartiment und tatsächliche neurale Bedrängung beurteilen; Zahlen nur als Werte der PDF einordnen. **„Wie aussagekräftig sind Signalveränderungen?“** — Signalassoziationen und methodenspezifische DWI-Evidenz von binären Aussagen zu Reversibilität/Prognose trennen.
- Medienplan: kein diagnostisches Bild auf p.8; kein neues Bild. Die bestehende allgemeine Lehrskizze wird nicht als Fallbeleg verwendet.

## Quellenabgleich

| Quellinhalt | Ort in der Lektion | Bewertung / Beleg |
|---|---|---|
| Angeborene kurze Pedikel; degenerative Diskus-/Osteophyten-/Facetten-/Ligamentum-flavum-Veränderungen und Listhese als mögliche Ursachen | Nicht neu auf dieser seitengebundenen Ergänzung | Der Haupttext behandelt die resultierende neurale Bedrängung; keine neue kausale Behauptung eingeführt. |
| HWS sagittal 14–17 mm „normal“, 10–14 mm „relativ“, <10 mm „absolut“ | Stenose-Tabelle, ausdrücklich als PDF-Orientierungswerte markiert | Nicht als universelle MRI-Klassifikation dargestellt. WFNS bewertet quantitative Kriterien/Messdefinitionen als wenig konsentiert; die Werte ersetzen keine qualitative Beschreibung. |
| LWS sagittal 15–25 mm „normal“, 10–12 mm „relativ“, <10 mm „absolut“; Duralsackfläche <75 mm² | Stenose-Tabelle, ausdrücklich der PDF zugeschrieben | Einzelwert ausdrücklich nicht als Diagnose oder Beweis eines klinischen Syndroms formuliert. WFNS nennt unterschiedliche Flächenkriterien und betont klinische Korrelation. |
| Reduzierter Liquorraum, Myelon-/Duralsack-/Wurzelkompression und anatomische Etage | Lead, Abschnitte HWS/BWS und LWS; vorhandener 9-mm-Selbstcheck | Beibehalten und für die Befundbeschreibung priorisiert. WFNS: anatomische Einengung allein korreliert nicht verlässlich mit Symptomen/Funktion. |
| T2-only als reversibel; T1-Abnahme und DWI-Restriktion als irreversibel | Signal-Tabelle | Nicht übernommen als binäre Regel. Einzelnes T2-Signal ist nicht spezifisch; T1/T2-Muster nur als Gruppenassoziationen einordnen, nicht als individuelle Gewissheit. |
| DWI sei konventionellem T1/T2 generell überlegen | DWI-Zeile | Nicht übernommen. Li et al. untersuchten eine kleine, methodenspezifische ZOOM-DWI-Kohorte mit 49 Betroffenen und 50 Kontrollen; dies begründet keine allgemeine Rangordnung. |
| „Neuroforamenstenose“ | Nicht ergänzt | Nur eine nackte Überschrift ohne lehrbare Beschreibung; außerhalb dieses Batches. |

## Aktuelle Evidenz

- WFNS Spine Committee, *Lumbar Spinal Stenosis Recommendations* (2020): geringe Übereinstimmung bei quantitativen Kriterien; anatomische Einengung allein ist kein verlässlicher Proxy für Symptome oder Funktion. [Volltext](https://pmc.ncbi.nlm.nih.gov/articles/PMC7322797/)
- WFNS Spine Committee, *Cervical Myelopathy Recommendations* (2019): canal diameter is a morphologic measure within cervical myelopathy assessment, not a stand-alone clinical diagnosis. [Volltext](https://pmc.ncbi.nlm.nih.gov/articles/PMC6790728/)
- Karpova et al. (2013), reliability study of quantitative cervical MRI measures: tested measurement reliability and found no consensus on an optimal quantitative method; it does **not** validate the PDF's 14–17/10–14/<10 mm bands. [PubMed](https://pubmed.ncbi.nlm.nih.gov/22772577/)
- Fehlings et al., AO Spine recommendations for degenerative cervical myelopathy (2025): klinische Beurteilung ist multimodal; T1-Hypointensität und mehrsegmentale T2-Veränderungen sind prognostische Gruppenmerkmale, während isoliertes einsegmentales T2-Signal schwach korreliert. Keine binäre Irreversibilitätsregel. [DOI](https://doi.org/10.1177/21925682251331050)
- Li et al. (2024), ZOOM-DWI bei zervikaler Myelopathie: methodenspezifische kleine Vergleichsstudie, keine Grundlage für universelle DWI-Superiorität. [DOI](https://doi.org/10.1007/s00586-023-08110-8)
- Nouri et al. (2017), MRI-Signal bei zervikaler DCM und postoperativem Ergebnis: Kohortenassoziation, keine sichere Individualprognose. [DOI](https://doi.org/10.1097/BRS.0000000000002234)

## Prüfungen und Review

- Bestehende verknüpfte Prüfungen: `degenerative-wirbelsaeule-cord-vs-cauda-01`, `degenerative-wirbelsaeule-signal-prognosis-02`; Karteikarten `degenerative-wirbelsaeule-localization`, `degenerative-wirbelsaeule-prognosis-signal`.
- Vorhandene Prüfungsinhalte wurden geprüft: Zahlenwert allein belegt keine relevante Kompression; T2 allein beweist keine Irreversibilität; DWI wird nicht allgemein über T1/T2 gestellt. Kein zusätzlicher MCQ-/Karteikarteninhalt für diese Seite erforderlich.
- Automatisierte fokussierte DE/EN/FA assertions und MCQ-/Karteikarten-Retrievaltest: bestanden. Die breitere Autorenprüfung erreicht alle p.8 Assertions, scheitert anschließend unabhängig am bestehenden Pediatric-fracture-DOI-Assert in `scripts/check-msk-spine-authorship.mjs:148`.
- Produktions-Build: blockiert durch gescheiterten Netzabruf von `fonts.googleapis.com` (`ENOTFOUND`), danach `EPERM` beim Erstellen unter `.next/server/app/api/analytics`; kein erfolgreicher Build bestätigt.
- Unabhängige Review: erste Runde `REVISE`; EDU-WS8-01 und SRC-WS8-02 korrigiert; fokussierte Delta-Review PASS (SRC/EDU/LNG/ASM/VIS/REV). UX bleibt mangels Browser BLOCKED.
- Browser-UX: in dieser Umgebung kein verfügbarer Browser / keine echte Interaktionsprüfung; offen.
- Wissenschaftliche Freigabe durch Dr. Zia und Veröffentlichung: ausstehend.
