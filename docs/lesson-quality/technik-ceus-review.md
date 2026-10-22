# Ultraschallkontrastmittel (CEUS): Quellen- und QA-Ledger

Stand: 19.10.2026. Route: `/technik/kontrastmittel/ultraschall`. Diese Einheit ersetzt die frühere Weiterleitung zur Röntgen-Kontrastmittelseite.

## Quellenabgleich und Umfang

| Lernpunkt | Quelle | Umsetzung / Grenze |
|---|---|---|
| Mikrobläschen, Reflexion, nichtlineares/harmonisches Signal, intravasale Verteilung, SF₆-Elimination | `Technik.pdf`, PDF-S. 133–134; EMA SonoVue Product Information, Version 22, Revision 20.03.2026, Abschnitte 2, 5.1 | Kompaktes Erklärdiagramm und DE/EN/FA-Text. Gas-Elimination wird ausdrücklich für SonoVue beschrieben, nicht auf alle Produkte verallgemeinert. |
| Echosignal und Niedrig-MI-Empfehlung | EMA SmPC, Abschnitte 4.4 und 5.1 | Niedriger mechanischer Index als Sicherheits-/Bildgebungsaspekt benannt; keine geräteunabhängige feste Schwelle behauptet. |
| Mikrobläschenschale, mögliche renale Elimination der Hülle sowie PDF-Aussagen zu fehlender Nephrotoxizität/fehlender Schilddrüsenbelastung | `Technik.pdf`, PDF-S. 133 | Bewusst nicht als klinische Sicherheitsbehauptung übernommen: keine aktuelle, produktspezifische Primärquelle für diese Formulierungen in diesem Teilbatch verifiziert. Bleibt auf der Quellseite erwähnt, ist aber im Lerntext als nicht unabhängig verifizierter PDF-Inhalt ausgespart. |
| Erwachsene: Echo, ausgewählte Macro-/Microvascular-Doppler-Anwendungen; Kinder: exkretorischer Harntrakt/VUR | EMA SmPC, Abschnitte 4.1–4.2 | Zusammengefasst als SonoVue EU-Zulassung. Keine Dosisanweisung im Unterrichtstext. |
| Abgrenzung zur breiteren PDF-Liste (u. a. Nierenzysten/Bosniak, kardiale Perfusion) | EMA SmPC, Abschnitte 4.1–4.3 | Lernhinweis, lokale Zulassung zu prüfen; diese Anwendungen werden nicht als pauschal zugelassen dargestellt. |
| IV-Kontraindikationen, kardiale Vorsicht, Überempfindlichkeit, Überwachung, Schwangerschaft/Stillzeit | EMA SmPC, Abschnitte 4.3–4.6 | Kontraindikationen von Situationen mit Vorsicht/Überwachung getrennt; PEG-/Überempfindlichkeitsrisiko und produktspezifische Schwangerschafts-/Stillinformation ergänzt. |
| CEUS-Leitlinienindex | EFSUMB, English guidelines and recommendations | Als weiterführende Ressource verlinkt; keine nicht eingesehenen Detailkriterien daraus behauptet. |

PDF-Seiten 133–134 waren die erklärte Inhaltsquelle dieses Teilbatches; die vorhandene Seite 132 bleibt im separaten Sonographie-Grundlagenbatch. Die Lehreinheit ist keine vollständige CEUS-Leitlinie und keine Freigabe klinischer Anwendung.

## Struktur, Sprache und Assessments

Lernpfad: Mikrobläschen-Mechanismus → Anwendungs-/Zulassungsgrenzen → produktspezifische Sicherheit → Selbstcheck und Take-home. Kein generisches Kapitel „Befund & Selbsttest“ wurde eingeführt. Ein code-natives Prozessschema erläutert die Signalentstehung; es ist gekennzeichnet als Schema, nicht als Patientendarstellung.

Das neue Topic `km-ultraschall` besitzt Übersetzungen DE/EN/FA, drei übersetzte MCQs je Sprache und drei daraus erzeugte Flashcards. Curriculumgruppe, Kursliste, Quizaggregation und Flashcardgruppe sind statisch überprüft.

## Verifikation und offene Punkte

- PASS: `esbuild`-JSX-Parse; statische Datenprüfung von drei Sprachen, drei MCQs und drei Flashcards je Topic, vier Antwortoptionen, Group-/Flashcard-Verknüpfung; vollständiger MCQ-Audit (774 Fragen und 18 Fälle je Sprache); `git diff --check` (nur Windows-Zeilenendenhinweis).
- BLOCKED: Browserroute konnte wegen `ERR_CONNECTION_TIMED_OUT` zu `localhost:3003` nicht geöffnet werden. Runtime, responsive Darstellung, Interaktion, Theme und RTL-Layout sind nicht beobachtet.
- BLOCKED: Produktionsbuild schlug erneut fehl: `fonts.googleapis.com` nicht erreichbar und `EPERM` beim Erstellen von `.next/server/app/abdomen/leber`. Das belegt keinen Fehler des CEUS-Moduls, lässt den integrierten Build aber ungeprüft.
- PASS im erklärten redaktionellen/technischen Umfang: unabhängige, read-only Prüfung von Technik.pdf PDF-S. 133–134 und EMA SonoVue-Produktinformation (20.03.2026). Finding CEUS-SRC-01 (Hypersensitivität/Dobutamin), CEUS-SRC-02 (nicht übernommene PDF-Sicherheitsbehauptungen mit fehlender aktueller Quellenbestätigung), CEUS-ASM-01 (Quizlink) und CEUS-ASM-02 (Flashcard-Erklärung) wurden korrigiert oder transparent begrenzt. Retest schloss CEUS-SRC-03 durch Trennung allgemeiner Überempfindlichkeit von IV-spezifischen Kontraindikationen. Keine wissenschaftliche Endfreigabe durch Dr. Zia.
- Offen: lokale Produktzulassungen außerhalb EU, tatsächliche CEUS-Patientenbilder/deren Bildrechte und klinische Implementierung wurden nicht verifiziert.

## Unabhängige Review-Gates

Finale unabhängige Gate-Einschätzung: SRC/EDU/LNG/ASM/REV PASS im erklärten Umfang; VIS technisch als Schema vorhanden, aber tatsächliches Rendering nicht beobachtet; UX BLOCKED wegen fehlendem Browserzugriff. Die integrierte Produktionsbuild-Verifikation ist ebenfalls BLOCKED. Kein klinisches Gesamt-Sign-off.
