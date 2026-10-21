# Proximale Humerusfraktur — Quellen- und Unterrichtsledger

Stand: 21.10.2026. Route: `/msk/trauma/proximale-humerusfraktur`. Dies ist ein abgegrenzter ergänzender Entwurf, keine klinische Freigabe.

## PDF-Abdeckung

| Quelle | Gelesener Inhalt | Verwendung / Grenze |
|---|---|---|
| `MSK.pdf`, PDF-S. 14 | Nur die Überschrift „Proximale Humerusfraktur“; keine erläuternden Kriterien, Tabelle, Fallbeschreibung oder Abbildung. | Belegt ausschließlich das Curriculum-Thema. Die Lektion sagt in DE/EN/FA ausdrücklich, dass ihr Lehrinhalt ergänzend ist und keine vollständige PDF-Abdeckung beansprucht. |
| `MSK.pdf`, PDF-S. 11–13 und 15 | Mapper-Sichtung: S. 11 Inhaltsübersicht; S. 12–13 AC-Luxation/Rockwood und angrenzende Themen; S. 15 Mason-Klassifikation des Radiuskopfs. | Keine dieser Seiten wird als Quelle für proximale Humerusfraktur-Inhalte ausgegeben. |

## Lernpfad und Medienplan

1. **Welche Segmente sind betroffen?** — Kopfsegment mit Gelenkfläche, Tuberculum majus, Tuberculum minus und Schaft erkennen und die Fragmentzuordnung beschreiben.
2. **Wie beschreibe ich das Muster?** — konkrete Frakturmorphologie und Verschiebung dokumentieren; Neer-Partzahl als konventionelle Zusatzsprache mit Schwellenwerten und begrenzter Reproduzierbarkeit einordnen.
3. **Drei Regeln merken** — kompakte Zusammenfassung für die Befundbeschreibung.

Das einzige Bild ist ein code-natives, nichtdiagnostisches Orientierungsschema. A–D werden über die lokalisierte Legende der Seite den vier anatomischen Segmenten zugeordnet. Es enthält keine Patientendaten und wird nicht als Bildbefund präsentiert. Quelle: neu gezeichnetes Projekt-Asset `public/educational/proximal-humerus/segments.svg`; Rechte: selbst erstellt, keine externe Bildquelle. Die sichtbaren Beschriftungen A–D sind sprachneutral; Alt-Text und Bildunterschrift liegen in DE/EN/FA vor.

## Ergänzende Primär- und Fachquellen

| Quelle | Unterstützte Aussage | Einschränkung |
|---|---|---|
| Neer CS. *Displaced proximal humeral fractures. Part I. Classification and evaluation.* JBJS Am. 1970;52(6):1077–1089. [PMID 5455339](https://pubmed.ncbi.nlm.nih.gov/5455339/), DOI 10.2106/00004623-197052060-00001. | Vier-Segment-Modell und klassische Kriterien der Neer-Klassifikation (>1 cm Translation oder >45° Angulation); Partzahl zählt verschobene Segmente, nicht bloß Frakturlinien. | Historische Klassifikationsquelle; die Lektion gibt das System als konventionelle Klassifikation wieder, nicht als präzise Messskala oder Therapieanweisung. |
| Siegler J et al. *Inter-observer reliability and agreement across imaging modalities for the classification of proximal humeral fractures.* JBJS Am. 2011;93(14):1377–1382. [PMCID PMC3162565](https://pmc.ncbi.nlm.nih.gov/articles/PMC3162565/), PMID 21801370. | Geringe Interobserver-Übereinstimmung der Neer-Einteilung in der untersuchten Serie. | Kleine Primärstudie mit 16 Frakturen; Lektion nennt diese Einschränkung und verallgemeinert die Ergebnisse nicht als universellen Messwert. |
| American College of Radiology. *ACR Appropriateness Criteria: Acute Shoulder Pain*, revised 2024. [Official guidance](https://acsearch.acr.org/docs/69433/Narrative/). | Kontext für die ergänzende bildgebende Einordnung. | Kein eigenständiger Untersuchungsalgorithmus wird in dieser Lektion gelehrt. Die ACR-Seite ließ sich im Authoring-Netzwerk nicht direkt abrufen (403); verifiziert wurde die offizielle ACR-Suchergebnisangabe, dass CT-Frakturkonfiguration ergänzen kann. Vor weitergehender CT-Lehre wäre direkter Quellenzugriff erforderlich. |

## Qualität und offene Prüfpunkte

- DE/EN/FA spiegeln Struktur, Messwerte, Negation, Unsicherheit und Feedback. Drei Begriffe („Neer“, „one-part“, anatomische lateinische Bezeichnungen) bleiben fachsprachlich parallel.
- Eine szenariobasierte Inline-Selbstprüfung, zwei registrierte MCQs und zwei Karteikarten decken Segmentanatomie und die Unterscheidung zwischen Frakturlinien und verschobenen Segmenten ab. Die richtige Wahl ist nicht als einzelne Diagnosebehauptung dargestellt.
- Es werden keine Behandlungsempfehlungen gegeben.
- Unabhängige Review: SRC/EDU/VIS/LNG/ASM und Korrekturdelta PASS im begrenzten Umfang; der selbstcheck-Feedbackfehler wurde nach erster Review behoben. UX bleibt BLOCKED, da keine tatsächliche Browserprüfung für Mobil/RTL/Interaktion vorliegt.
- Build/Browser: der Projekt-Build wurde im Authoring-Umfeld durch fehlenden Zugriff auf `fonts.googleapis.com` und anschließenden `.next`-EPERM blockiert; Syntax-Bundle der Route ist PASS. Kein Build- oder AI-Review gilt als wissenschaftliche Freigabe.
- Wissenschaftliche Freigabe durch Dr. Zia und Veröffentlichung: ausstehend.
