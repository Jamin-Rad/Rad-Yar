// ── RADYAR QUESTION BANK ────────────────────────────────────────────────────

import { CONTRAST_QUESTIONS, CONTRAST_TOPICS } from './contrastMedia'

export const QUESTION_BANK = {
  "de": [
    ...CONTRAST_QUESTIONS.de,
    {
      "id": "meniskus-de-01",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "Warum ist der Innenmeniskus (Meniscus medialis) im Vergleich zum Außenmeniskus signifikant häufiger von traumatischen Rissen betroffen?",
      "options": [
        {
          "id": "A",
          "text": "Er ist durch seine C-Form anatomisch instabiler geformt."
        },
        {
          "id": "B",
          "text": "Er ist fest mit der Gelenkkapsel und dem medialen Seitenband verwachsen und dadurch weniger beweglich."
        },
        {
          "id": "C",
          "text": "Er besitzt eine rein avaskuläre Versorgung über die gesamte Breite."
        },
        {
          "id": "D",
          "text": "Er artikuliert im Gegensatz zum Außenmeniskus nicht mit den Femurkondylen."
        }
      ],
      "correct": "B",
      "explanation": "A ist falsch: Die C-Form des Innenmeniskus und die O-Form des Außenmeniskus sind normale anatomische Varianten, die sich an die Form der jeweiligen Tibiaplateaus anpassen. Sie bedingen keine intrinsische mechanische Instabilität des Gewebes.\n\nB ist richtig: Die feste ligamentäre Fixierung des Innenmeniskus an der Gelenkkapsel und dem Innenband (MCL) schränkt seine Mobilität stark ein. Bei plötzlichen Rotations- oder Scherbewegungen kann er – anders als der mobile Außenmeniskus – nicht flexibel ausweichen und reißt deutlich schneller.\n\nC ist falsch: Beide Menisken weisen eine ähnliche vaskuläre Architektur auf. Sie sind in der Peripherie (rote Zone) gut durchblutet und werden nach zentral hin avaskulär. Der Innenmeniskus ist nicht komplett gefäßfrei.\n\nD ist falsch: Beide Menisken artikulieren proximal mit den Femurkondylen und distal mit dem Tibiaplateau, um ihre Hauptfunktion der Kraftübertragung und Stoßdämpfung im Gelenk zu erfüllen."
    },
    {
      "id": "meniskus-de-02",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "Welches Kriterium muss laut der etablierten „Two-slice-touch“-Regel erfüllt sein, um die Diagnose eines Meniskusrisses im MRT mit hoher Spezifität zu sichern?",
      "options": [
        {
          "id": "A",
          "text": "Das Signal muss sowohl die superiore als auch die inferiore Gelenkfläche berühren."
        },
        {
          "id": "B",
          "text": "Die Signalsteigerung muss auf mindestens zwei aufeinanderfolgenden Schichtbildern mit Oberflächenkontakt nachweisbar sein."
        },
        {
          "id": "C",
          "text": "Der Riss muss in zwei unterschiedlichen Sequenzen (z. B. T1w und T2w) sichtbar sein."
        },
        {
          "id": "D",
          "text": "Die Läsion muss eine Ausdehnung von mindestens 3 mm in der Sagittalebene aufweisen."
        }
      ],
      "correct": "B",
      "explanation": "A ist falsch: Ein Riss muss nicht die gesamte Höhe des Meniskus durchbauen. Es reicht völlig aus, wenn das pathologische Signal entweder nur die obere (superiore) oder nur die untere (inferiore) Gelenkfläche schneidet.\n\nB ist richtig: Die Regel besagt, dass die intrameniskale Signalsteigerung auf mindestens zwei direkt benachbarten Schnittbildern (Slices) Kontakt zur Oberfläche haben muss. Dies eliminiert das Risiko, ein rein technisches Rauschen oder einen Volumenmitteleffekt auf einer Einzelschicht fälschlicherweise als Riss zu interpretieren.\n\nC ist falsch: Obwohl Risse idealerweise in mehreren Sequenzen und Ebenen (sagittal/koronar) evaluiert werden, bezieht sich die spezifische „Two-slice-touch“-Regel rein auf die Kontinuität über aufeinanderfolgende Schichten derselben Sequenz.\n\nD ist falsch: Die Regel ist unabhängig von einer absoluten Millimeter-Metrik. Sie definiert sich ausschließlich über die Anzahl der betroffenen Schichten, auch wenn die Standard-Schnittdicke im Protokoll meist 3 mm beträgt."
    },
    {
      "id": "meniskus-de-03",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "In welcher vaskulären Zone zeigt eine Meniskusruptur die besten biologischen Voraussetzungen für eine erfolgreiche Meniskusnaht?",
      "options": [
        {
          "id": "A",
          "text": "Weiße Zone (Zone III)"
        },
        {
          "id": "B",
          "text": "Rot-Weiße Zone (Zone II)"
        },
        {
          "id": "C",
          "text": "Rote Zone (Zone I)"
        },
        {
          "id": "D",
          "text": "Meniskuswurzel (Root)"
        }
      ],
      "correct": "C",
      "explanation": "A ist falsch: Die weiße Zone bildet das zentral gelegene Drittel des Meniskus. Sie ist komplett avaskulär (gefäßfrei) und wird rein per Diffusion durch die Synovialflüssigkeit ernährt. Eine Naht bleibt hier aufgrund fehlender Heilungspotenz fast immer erfolglos.\n\nB ist falsch: Die rot-weiße Zone ist ein Übergangsbereich (ca. 3–5 mm von der Kapsel entfernt). Hier liegt nur noch eine sehr eingeschränkte, kapillare Blutversorgung vor, weshalb die Heilungstendenz nach einer Naht unsicher ist.\n\nC ist richtig: Die rote Zone (Zone I) umfasst den kapsennahen Außenrand (<3 mm). Sie wird direkt über den perimeniskalen Plexus reichlich mit Blut versorgt. Die biologischen Voraussetzungen für die Einwanderung von Fibroblasten und die Gewebeheilung sind hier optimal, was eine Refixation (Naht) begünstigt.\n\nD ist falsch: Die Meniskuswurzeln (Roots) stellen die ligamentäre Verankerung der Meniskushörner am Tibiaplateau dar. Sie beschreiben keine vaskuläre Zone des funktionellen Meniskuskörpers."
    },
    {
      "id": "meniskus-de-04",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "Welche MRT-Sequenz eignet sich laut Protokoll am besten für den definitiven Nachweis von akuten Meniskusrissen, begleitenden Knochenödemen und Kontinuitätsunterbrechungen der Bänder?",
      "options": [
        {
          "id": "A",
          "text": "Native T1-Wichtung ohne Fettsättigung."
        },
        {
          "id": "B",
          "text": "T2-gewichtete oder PD-fettgesättigte (fs) Sequenzen."
        },
        {
          "id": "C",
          "text": "3D-Gradienechosequenzen mit einer Schichtdicke von 6 mm."
        },
        {
          "id": "D",
          "text": "T2*-gewichtete Phasenkontrast-Angiographie."
        }
      ],
      "correct": "B",
      "explanation": "A ist falsch: Die native T1-Wichtung bietet zwar eine exzellente anatomische Übersicht und zeigt chronische Fibrosen gut an, ist jedoch nicht flüssigkeitssensitiv. Akuter Riss-induzierter Flüssigkeitseinstrom oder Knochenmarködeme lassen sich darin kaum differenzieren.\n\nB ist richtig: T2-w oder PD-fs (Protonendichte mit Fettsättigung) Sequenzen sind extrem sensitiv für freies Wasser. Da pathologische Veränderungen wie ein Rissspalt (gefüllt mit Synovialflüssigkeit) oder Ödeme viel Wasser enthalten, leuchten sie hyperintens (hell) vor dem unterdrückten, dunklen Hintergrundgewebe auf.\n\nC ist falsch: Eine Schichtdicke von 6 mm ist für die Kniebinnendiagnostik deutlich zu grob. Kleine Risse würden durch den Volumenmitteleffekt komplett maskiert. Der Standard liegt bei maximal 3 mm Schnittdicke.\n\nD ist falsch: Die Phasenkontrast-Angiographie dient der funktionellen Darstellung von Blutströmen in Gefäßen. Für die Beurteilung der statischen, fibrocartilaginären Gewebestrukturen des Kniegelenks ist sie ungeeignet."
    },
    {
      "id": "meniskus-de-05",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "Wie unterscheidet sich die Verteilung von Rissen im Hinterhorn des Außenmeniskus im Vergleich zum Innenmeniskus?",
      "options": [
        {
          "id": "A",
          "text": "Beim Außenmeniskus betreffen praktisch alle Risse das Vorderhorn."
        },
        {
          "id": "B",
          "text": "Beim Außenmeniskus liegen etwa 50 % der Risse im Hinterhorn, während beim Innenmeniskus ca. 98 % das Hinterhorn betreffen."
        },
        {
          "id": "C",
          "text": "Risse im Hinterhorn des Außenmeniskus treten aufgrund der O-Form überhaupt nicht auf."
        },
        {
          "id": "D",
          "text": "Die Verteilung ist bei beiden Menisken absolut identisch."
        }
      ],
      "correct": "B",
      "explanation": "A ist falsch: Das Vorderhorn des Außenmeniskus ist zwar häufiger betroffen als das des Innenmeniskus, macht aber keineswegs die Gesamtheit aller Außenmeniskusrisse aus.\n\nB ist richtig: Das Hinterhorn des Innenmeniskus ist durch seine posteriore Fixierung der mechanische Drehpunkt bei Kniebewegungen und extremen Belastungen ausgesetzt – daher liegen hier nahezu 98 % der Risse. Der Außenmeniskus ist mobiler; bei ihm entfällt nur die Hälfte der Risse auf das Hinterhorn, während der Rest auf das Vorderhorn und den Corpus (Mittelabschnitt) verteilt ist.\n\nC ist falsch: Die geometrische O-Form schützt den Außenmeniskus nicht vor Pathologien. Das Hinterhorn bleibt auch hier mit 50 % der Fälle statistisch die häufigste Lokalisation für Risse.\n\nD ist falsch: Aufgrund der stark unterschiedlichen biomechanischen Fixierungen und Beweglichkeiten weisen Innen- und Außenmeniskus völlig unterschiedliche Verteilungsmuster bei Läsionen auf."
    },
    {
      "id": "meniskus-de-06",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "Ein radiologischer Befund beschreibt ein keilförmiges/globuläres Signal im Meniskusgewebe, das die Gelenkfläche im vorliegenden Schnittbild knapp nicht erreicht. Welchem Subtyp nach Lotysch ist dies zuzuordnen?",
      "options": [
        {
          "id": "A",
          "text": "Grad 2a"
        },
        {
          "id": "B",
          "text": "Grad 2b"
        },
        {
          "id": "C",
          "text": "Grad 2c"
        },
        {
          "id": "D",
          "text": "Grad 3"
        }
      ],
      "correct": "C",
      "explanation": "A ist falsch: Grad 2a ist definiert als ein rein lineares (strichförmiges) Signal im Meniskusinneren, das keinen Kontakt zur superioren oder inferioren Oberfläche aufweist. Es zeigt keine flächige Ausdehnung.\n\nB ist falsch: Grad 2b beschreibt ebenfalls ein lineares Signal, welches jedoch die Gelenkoberfläche auf genau einem einzigen Bild berührt, was den Befund inkonklusiv für einen echten Riss macht.\n\nC ist richtig: Ein keilförmiges, flächiges oder kugelförmiges (globuläres) Signal im Gewebe ohne eindeutigen Oberflächenkontakt entspricht dem Stadium Grad 2c nach Lotysch. Es repräsentiert eine fortgeschrittene mukoide Degeneration mit einem sehr hohen Risiko für das Vorliegen eines okkulten (versteckten) Risses.\n\nD ist falsch: Grad 3 setzt voraus, dass das Signal die Gelenkoberfläche eindeutig und reproduzierbar durchbricht (auf mindestens zwei aufeinanderfolgenden Schichten). Solange kein Oberflächenkontakt vorliegt, darf kein Grad 3 diagnostiziert werden."
    },
    {
      "id": "haemangiom-de-01",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welche Aussage beschreibt ein Leberhämangiom am korrektesten?",
      "options": [
        {
          "id": "A",
          "text": "Kavernöse nicht-neoplastische Malformation"
        },
        {
          "id": "B",
          "text": "Intrahepatische Metastase mit Nekrose"
        },
        {
          "id": "C",
          "text": "Präkanzeröse hepatozelluläre Läsion"
        },
        {
          "id": "D",
          "text": "Bakterieller Leberabszess"
        }
      ],
      "correct": "A",
      "explanation": "Ein Leberhämangiom ist eine kavernöse, nicht-neoplastische vaskuläre Malformation und der häufigste gutartige solide Lebertumor."
    },
    {
      "id": "haemangiom-de-02",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welcher Sonographiebefund ist typisch für ein kleines Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Scharf begrenzte echoreiche Läsion"
        },
        {
          "id": "B",
          "text": "Unscharfe hypoechogene Läsion mit Kapselretraktion"
        },
        {
          "id": "C",
          "text": "Gasreflexe mit dorsalem Schallschatten"
        },
        {
          "id": "D",
          "text": "Diffuse Wandverdickung der Gallenblase"
        }
      ],
      "correct": "A",
      "explanation": "Typische Hämangiome sind sonographisch meistens echoreich und scharf begrenzt. Bei klassischer Sonomorphologie ist häufig keine weitere Diagnostik notwendig."
    },
    {
      "id": "haemangiom-de-03",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welches dynamische CT-Muster ist klassisch für ein Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Peripher-noduläre diskontinuierliche KM-Aufnahme mit zentripetaler Auffüllung"
        },
        {
          "id": "B",
          "text": "Arterielles Wash-in mit portalvenösem Wash-out und Kapsel"
        },
        {
          "id": "C",
          "text": "Dünnwandige Läsion ohne KM-Aufnahme"
        },
        {
          "id": "D",
          "text": "Diffuses infiltratives Wachstum entlang der Gallenwege"
        }
      ],
      "correct": "A",
      "explanation": "Klassisch ist eine randständige, noduläre und diskontinuierliche Kontrastmittelaufnahme, die sich in späteren Phasen zentripetal auffüllt."
    },
    {
      "id": "haemangiom-de-04",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Was beschreibt das Irisblendenphänomen beim Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Auffüllung der Läsion von peripher nach zentral"
        },
        {
          "id": "B",
          "text": "Zentrales Wash-out in der Spätphase"
        },
        {
          "id": "C",
          "text": "Abrupter Perfusionsstopp am Leberhilus"
        },
        {
          "id": "D",
          "text": "Ringförmige Abszesskapsel"
        }
      ],
      "correct": "A",
      "explanation": "Das Irisblendenphänomen beschreibt die zentripetale Kontrastmittelauffüllung vom Rand zur Mitte."
    },
    {
      "id": "haemangiom-de-05",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welcher MRT-Befund ist besonders typisch für ein klassisches Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Sehr hohes T2-Signal im Sinne eines Light-bulb-Zeichens"
        },
        {
          "id": "B",
          "text": "Ausgeprägtes T1-hyperintenses Fettareal mit Signalabfall in opposed phase"
        },
        {
          "id": "C",
          "text": "Niedriges T2-Signal wie fibrotisches Gewebe"
        },
        {
          "id": "D",
          "text": "Ausschließlich zentrale Diffusionsrestriktion ohne KM-Aufnahme"
        }
      ],
      "correct": "A",
      "explanation": "Das klassische Hämangiom ist in T2 sehr hell, oft sogar heller als Galle. Dieses Light-bulb-Zeichen ist ein wichtiger diagnostischer Hinweis."
    },
    {
      "id": "haemangiom-de-06",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Wie ist die DWI/ADC-Konstellation beim typischen Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "DWI hell, ADC hoch: T2-shine-through"
        },
        {
          "id": "B",
          "text": "DWI hell, ADC niedrig: sichere Restriktion"
        },
        {
          "id": "C",
          "text": "DWI dunkel, ADC nicht messbar"
        },
        {
          "id": "D",
          "text": "DWI und ADC immer unauffällig"
        }
      ],
      "correct": "A",
      "explanation": "Hämangiome können auf hohen b-Werten hyperintens sein. Hohe ADC-Werte zeigen aber T2-shine-through und keine echte Diffusionsrestriktion."
    },
    {
      "id": "haemangiom-de-07",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Wie erscheint ein typisches Hämangiom in späteren Kontrastmittelphasen?",
      "options": [
        {
          "id": "A",
          "text": "Zunehmend blutpoolähnlich/isointens durch zentripetale Auffüllung"
        },
        {
          "id": "B",
          "text": "Immer vollständig hypodens ohne Aufnahme"
        },
        {
          "id": "C",
          "text": "Frühes Wash-out mit Pseudokapsel"
        },
        {
          "id": "D",
          "text": "Nur randständig gasgefüllt"
        }
      ],
      "correct": "A",
      "explanation": "In der portalvenösen und späten Phase nimmt die zentripetale Auffüllung zu. Die Läsion nähert sich der Blutbahn bzw. dem Leberparenchym an."
    },
    {
      "id": "haemangiom-de-08",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Warum können größere Hämangiome inhomogen aussehen?",
      "options": [
        {
          "id": "A",
          "text": "Durch Fibrosierung, Verkalkungen oder Thromben"
        },
        {
          "id": "B",
          "text": "Durch obligate maligne Entartung"
        },
        {
          "id": "C",
          "text": "Durch Luft in den Gallengängen"
        },
        {
          "id": "D",
          "text": "Durch fokale Fettinfiltration der Nierenrinde"
        }
      ],
      "correct": "A",
      "explanation": "Größere Hämangiome können durch interne Fibrosierung, Verkalkungen oder Thromben inhomogen werden. Das macht sie nicht automatisch maligne."
    },
    {
      "id": "haemangiom-de-09",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welche Aussage passt eher zu einem atypischen Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Keine klassische periphere noduläre Aufnahme, ggf. früharteriell homogen starkes Enhancement"
        },
        {
          "id": "B",
          "text": "Immer homogenes Light-bulb-T2 und komplette klassische Zentripetenz"
        },
        {
          "id": "C",
          "text": "Nie Kontrastmittelaufnahme"
        },
        {
          "id": "D",
          "text": "Immer Gasbildung und Flüssigkeitsspiegel"
        }
      ],
      "correct": "A",
      "explanation": "Atypische Hämangiome können die klassische periphere noduläre Aufnahme und zentripetale Auffüllung verlieren und stattdessen früharteriell homogen stark kontrastieren."
    },
    {
      "id": "haemangiom-de-10",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welcher Befund hilft am meisten gegen die Fehldiagnose „Metastase“ bei einem Hämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Hoher ADC und mehrphasiges Blutpool-Fill-in"
        },
        {
          "id": "B",
          "text": "Niedriger ADC und rasches Wash-out"
        },
        {
          "id": "C",
          "text": "Irreguläres infiltratives Wachstum"
        },
        {
          "id": "D",
          "text": "Kapselretraktion mit Gallenwegserweiterung"
        }
      ],
      "correct": "A",
      "explanation": "Hohe ADC-Werte sprechen gegen echte Diffusionsrestriktion. Zusammen mit blutpoolähnlicher zentripetaler Auffüllung stützt dies die Diagnose Hämangiom."
    },
    {
      "id": "fnh-de-01",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Aussage beschreibt die fokale noduläre Hyperplasie (FNH) am korrektesten?",
      "options": [
        { "id": "A", "text": "Benigne, regenerative Raumforderung der Leber" },
        { "id": "B", "text": "Maligner primärer Lebertumor mit Metastasierungspotenzial" },
        { "id": "C", "text": "Bakterieller Leberabszess mit zentraler Einschmelzung" },
        { "id": "D", "text": "Zystische Raumforderung mit serösem Inhalt" }
      ],
      "correct": "A",
      "explanation": "Die FNH ist eine benigne, regenerative Raumforderung der Leber, meist asymptomatisch und ohne Therapiebedarf."
    },
    {
      "id": "fnh-de-02",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Aussage zur Epidemiologie der FNH trifft zu?",
      "options": [
        { "id": "A", "text": "Sie ist die häufigste benigne Leberläsion überhaupt" },
        { "id": "B", "text": "Sie ist nach dem Hämangiom die zweithäufigste benigne Leberläsion und betrifft bevorzugt Frauen" },
        { "id": "C", "text": "Sie tritt überwiegend bei älteren Männern auf" },
        { "id": "D", "text": "Sie ist eine Präkanzerose mit hohem Malignisierungsrisiko" }
      ],
      "correct": "B",
      "explanation": "Nach dem Hämangiom ist die FNH die zweithäufigste gutartige Leberläsion, am ehesten bei jungen bis mittelalten Erwachsenen mit deutlicher Prädominanz bei Frauen."
    },
    {
      "id": "fnh-de-03",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welcher Doppler-Befund ist typisch für eine FNH?",
      "options": [
        { "id": "A", "text": "Zentrales Gefäß mit radiären Gefäßästen (Spoke-wheel-Muster)" },
        { "id": "B", "text": "Komplette Gefäßfreiheit der Läsion" },
        { "id": "C", "text": "Ausschließlich periphere venöse Gefäße ohne zentrales Gefäß" },
        { "id": "D", "text": "Arteriovenöse Fistel mit Shuntfluss" }
      ],
      "correct": "A",
      "explanation": "Das Spoke-wheel-Muster – ein zentrales Gefäß mit radiär abgehenden Ästen – ist ein typischer, wenn auch nicht beweisender Doppler-Befund der FNH."
    },
    {
      "id": "fnh-de-04",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie verhält sich eine typische FNH früharteriell in der CT?",
      "options": [
        { "id": "A", "text": "Periphere noduläre, diskontinuierliche Kontrastmittelaufnahme" },
        { "id": "B", "text": "Kräftige, homogene Kontrastmittelaufnahme" },
        { "id": "C", "text": "Keine Kontrastmittelaufnahme in allen Phasen" },
        { "id": "D", "text": "Ringförmige Kontrastmittelaufnahme mit zentraler Nekrose" }
      ],
      "correct": "B",
      "explanation": "Im Gegensatz zum Hämangiom zeigt die FNH früharteriell eine kräftige, homogene Kontrastmittelaufnahme ohne periphere noduläre Aufnahme."
    },
    {
      "id": "fnh-de-05",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Was ist in der portalvenösen und Spätphase für die FNH charakteristisch?",
      "options": [
        { "id": "A", "text": "Deutliches Wash-out mit Hypodensität gegenüber der Leber" },
        { "id": "B", "text": "Fehlendes Wash-out mit Angleichung an das Leberparenchym" },
        { "id": "C", "text": "Progressive Größenzunahme der Läsion" },
        { "id": "D", "text": "Auftreten neuer peripherer Knoten" }
      ],
      "correct": "B",
      "explanation": "Die FNH zeigt kein Wash-out und gleicht sich in der portalvenösen und Spätphase rasch dem Leberparenchym an – ein wichtiges Unterscheidungsmerkmal zu malignen Läsionen."
    },
    {
      "id": "fnh-de-06",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie stellt sich die FNH typischerweise in T1 und T2 zum Leberparenchym dar?",
      "options": [
        { "id": "A", "text": "Deutlich hypointens in T1 und stark hyperintens in T2 (Light-bulb sign)" },
        { "id": "B", "text": "Iso- bis leicht hypointens in T1 und iso- bis leicht hyperintens in T2" },
        { "id": "C", "text": "Hyperintens in T1 und hypointens in T2" },
        { "id": "D", "text": "Signalfrei in beiden Sequenzen" }
      ],
      "correct": "B",
      "explanation": "Die FNH ist meist iso- bis leicht hypointens in T1 und iso- bis leicht hyperintens in T2 zum Leberparenchym, sodass sie nativ oft nur diskret abgrenzbar ist."
    },
    {
      "id": "fnh-de-07",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie verhält sich die zentrale Narbe der FNH in der MRT?",
      "options": [
        { "id": "A", "text": "Hyperintens in T2, hypointens in T1, mit verzögerter Kontrastmittelaufnahme in der Spätphase" },
        { "id": "B", "text": "Hypointens in T2 und T1 ohne jegliche Kontrastmittelaufnahme" },
        { "id": "C", "text": "Hyperintens in T1 und isointens in T2" },
        { "id": "D", "text": "Nur in der CT, nie in der MRT darstellbar" }
      ],
      "correct": "A",
      "explanation": "Die zentrale Narbe ist hyperintens in T2, hypointens in T1 und nimmt in der Spätphase verzögert Kontrastmittel auf – charakteristisch in ca. 70 % der Fälle."
    },
    {
      "id": "fnh-de-08",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welches Merkmal hilft am meisten, eine FNH von einem HCC zu unterscheiden?",
      "options": [
        { "id": "A", "text": "Fehlendes Wash-out bei kräftiger arterieller Kontrastmittelaufnahme" },
        { "id": "B", "text": "Vorhandensein einer echten Tumorkapsel" },
        { "id": "C", "text": "Erhöhtes Alpha-Fetoprotein" },
        { "id": "D", "text": "Multifokales Auftreten" }
      ],
      "correct": "A",
      "explanation": "Ein HCC zeigt typischerweise ein Wash-out in der portalvenösen/Spätphase, während die FNH trotz kräftiger arterieller Anreicherung kein Wash-out aufweist."
    },
    {
      "id": "fnh-de-09",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Merkmale können bei einer atypischen FNH auftreten?",
      "options": [
        { "id": "A", "text": "Fehlende zentrale Narbe, heterogenes Erscheinungsbild, Pseudokapsel oder intraläsionales Fett" },
        { "id": "B", "text": "Ausschließlich verkalkte Randstrukturen ohne Kontrastmittelaufnahme" },
        { "id": "C", "text": "Vollständige zystische Transformation" },
        { "id": "D", "text": "Diffuse Verteilung über die gesamte Leber" }
      ],
      "correct": "A",
      "explanation": "Atypische FNH (ca. 20 %) kann ohne zentrale Narbe auftreten oder ein heterogenes Erscheinungsbild, eine Pseudokapsel, fehlende Narbenanreicherung oder intraläsionales Fett zeigen, was die Abgrenzung zu anderen Lebertumoren erschwert."
    },
    {
      "id": "fnh-de-10",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welches Vorgehen ist bei einer typischen, asymptomatischen FNH angezeigt?",
      "options": [
        { "id": "A", "text": "In der Regel keine Therapie, da benigne und meist asymptomatisch" },
        { "id": "B", "text": "Sofortige chirurgische Resektion" },
        { "id": "C", "text": "Systemische Chemotherapie" },
        { "id": "D", "text": "Transarterielle Chemoembolisation" }
      ],
      "correct": "A",
      "explanation": "Die FNH ist benigne, meist asymptomatisch und erfordert in der Regel keine Therapie."
    },
    {
      "id": "sarkoidose-de-01",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welches histologische Merkmal ist typisch für Sarkoidose?",
      "options": [
        {
          "id": "A",
          "text": "Verkäsende Granulome"
        },
        {
          "id": "B",
          "text": "Nicht-verkäsende Granulome"
        },
        {
          "id": "C",
          "text": "Eosinophile Mikroabszesse"
        },
        {
          "id": "D",
          "text": "Tumoröse Plattenepithelformationen"
        }
      ],
      "correct": "B",
      "explanation": "Sarkoidose ist eine systemische granulomatöse Erkrankung unbekannter Ätiologie. Histologisch sind nicht-verkäsende Granulome typisch."
    },
    {
      "id": "sarkoidose-de-02",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welches Verteilungsmuster der Mikronoduli ist in der HRCT typisch für Sarkoidose?",
      "options": [
        {
          "id": "A",
          "text": "Perilymphatisch entlang Fissuren, Pleura und bronchovaskulären Bündeln"
        },
        {
          "id": "B",
          "text": "Rein zufällig hämatogen ohne Bezug zu Fissuren"
        },
        {
          "id": "C",
          "text": "Nur basal subpleural als Honeycombing"
        },
        {
          "id": "D",
          "text": "Ausschließlich zentrilobulär mit Tree-in-bud"
        }
      ],
      "correct": "A",
      "explanation": "Typisch sind scharf begrenzte 2–4-mm-Mikronoduli in perilymphatischer Verteilung, besonders entlang Fissuren, Pleura, Septen und bronchovaskulären Bündeln."
    },
    {
      "id": "sarkoidose-de-03",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Was beschreibt das 1-2-3-Zeichen bei Sarkoidose?",
      "options": [
        {
          "id": "A",
          "text": "Rechter Hilus, linker Hilus und rechter Paratrachealraum"
        },
        {
          "id": "B",
          "text": "Drei Kavernen im rechten Oberlappen"
        },
        {
          "id": "C",
          "text": "Drei Zonen der Lungenfibrose"
        },
        {
          "id": "D",
          "text": "Drei Stadien der kardialen Sarkoidose"
        }
      ],
      "correct": "A",
      "explanation": "Das 1-2-3-Zeichen beschreibt die typische Lymphknotenverteilung: rechter Hilus, linker Hilus und rechter Paratrachealraum."
    },
    {
      "id": "sarkoidose-de-04",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welches Scadding-Stadium zeigt isoliert bihiläre Lymphadenopathie ohne Parenchymbefall?",
      "options": [
        {
          "id": "A",
          "text": "Stadium 0"
        },
        {
          "id": "B",
          "text": "Stadium I"
        },
        {
          "id": "C",
          "text": "Stadium III"
        },
        {
          "id": "D",
          "text": "Stadium IV"
        }
      ],
      "correct": "B",
      "explanation": "Scadding Stadium I entspricht isolierter bihilärer Lymphadenopathie bei regelrechtem Lungenparenchym."
    },
    {
      "id": "sarkoidose-de-05",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Was bedeutet Scadding Stadium II?",
      "options": [
        {
          "id": "A",
          "text": "Nur Fibrose"
        },
        {
          "id": "B",
          "text": "Nur Parenchymveränderungen ohne Lymphadenopathie"
        },
        {
          "id": "C",
          "text": "Bihiläre Lymphadenopathie plus Parenchymveränderungen"
        },
        {
          "id": "D",
          "text": "Normaler Röntgen-Thorax"
        }
      ],
      "correct": "C",
      "explanation": "Stadium II bedeutet BHL plus Lungenparenchymveränderungen. Stadium III wäre Parenchymveränderung ohne BHL, Stadium IV Fibrose."
    },
    {
      "id": "sarkoidose-de-06",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welche Aussage zu Eggshell-Verkalkungen ist korrekt?",
      "options": [
        {
          "id": "A",
          "text": "Sie sind pathognomonisch für Sarkoidose"
        },
        {
          "id": "B",
          "text": "Sie können auch bei Silikose auftreten"
        },
        {
          "id": "C",
          "text": "Sie beweisen immer Lymphom"
        },
        {
          "id": "D",
          "text": "Sie treten nur bei Asbestose auf"
        }
      ],
      "correct": "B",
      "explanation": "Schalenförmige Eggshell-Verkalkungen können bei Sarkoidose vorkommen, sind aber nicht spezifisch und werden auch bei Silikose gesehen."
    },
    {
      "id": "sarkoidose-de-07",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Was ist das Sarcoid Galaxy Sign?",
      "options": [
        {
          "id": "A",
          "text": "Großer Knoten mit vielen kleinen Satellitennoduli"
        },
        {
          "id": "B",
          "text": "Diffuse Milchglastrübung ohne Noduli"
        },
        {
          "id": "C",
          "text": "Pleuraplaques mit Verkalkung"
        },
        {
          "id": "D",
          "text": "Zentrale Lungenembolie"
        }
      ],
      "correct": "A",
      "explanation": "Das Sarcoid Galaxy Sign besteht aus einem größeren Granulom-Aggregat, das von vielen kleinen Satellitennoduli umgeben ist. Es ist nicht spezifisch und kann auch bei Tuberkulose vorkommen."
    },
    {
      "id": "sarkoidose-de-08",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welche DD zeigt typischerweise unregelmäßige knotige Septenverdickungen, oft einseitig oder asymmetrisch?",
      "options": [
        {
          "id": "A",
          "text": "Lymphangiosis carcinomatosa"
        },
        {
          "id": "B",
          "text": "Morbus Jüngling"
        },
        {
          "id": "C",
          "text": "Heerfordt-Syndrom"
        },
        {
          "id": "D",
          "text": "Discoider Meniskus"
        }
      ],
      "correct": "A",
      "explanation": "Lymphangiosis carcinomatosa macht häufig unregelmäßige, knotige Septenverdickungen und ist oft asymmetrisch bzw. einseitig. Klinisch sind die Patienten häufig schwerer krank."
    },
    {
      "id": "sarkoidose-de-09",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welche Kombination definiert das Heerfordt-Syndrom?",
      "options": [
        {
          "id": "A",
          "text": "Uveitis, Parotitis und Fazialisparese"
        },
        {
          "id": "B",
          "text": "Asthma, Sinusitis und Eosinophilie"
        },
        {
          "id": "C",
          "text": "Arthritis, Urethritis und Konjunktivitis"
        },
        {
          "id": "D",
          "text": "Hämoptyse, Glomerulonephritis und Sinusitis"
        }
      ],
      "correct": "A",
      "explanation": "Das Heerfordt-Syndrom ist eine Sarkoidose-Manifestation mit Uveitis, Parotitis und Fazialisparese."
    },
    {
      "id": "sarkoidose-de-10",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welche Modalität ist besonders wichtig zum Nachweis einer kardialen Sarkoidose?",
      "options": [
        {
          "id": "A",
          "text": "MRT mit Late Gadolinium Enhancement"
        },
        {
          "id": "B",
          "text": "Konventionelle Knieaufnahme"
        },
        {
          "id": "C",
          "text": "Sonographie der Gallenblase"
        },
        {
          "id": "D",
          "text": "Native Schädel-CT"
        }
      ],
      "correct": "A",
      "explanation": "Kardiale Sarkoidose wird häufig mittels MRT und Late Gadolinium Enhancement beurteilt. Klinisch wichtig ist das erhöhte Risiko für Rhythmusstörungen."
    }
  ],
  "en": [
    ...CONTRAST_QUESTIONS.en,
    {
      "id": "meniskus-en-01",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "Why is the medial meniscus significantly more frequently affected by traumatic tears compared to the lateral meniscus?",
      "options": [
        {
          "id": "A",
          "text": "It is anatomically less stable due to its C-shape."
        },
        {
          "id": "B",
          "text": "It is firmly attached to the joint capsule and the medial collateral ligament, making it less mobile."
        },
        {
          "id": "C",
          "text": "It has a purely avascular supply across its entire width."
        },
        {
          "id": "D",
          "text": "Unlike the lateral meniscus, it does not articulate with the femoral condyles."
        }
      ],
      "correct": "B",
      "explanation": "A is incorrect: The C-shape of the medial meniscus and the O-shape of the lateral meniscus are normal anatomical variations matching their respective tibial plateaus. They do not cause intrinsic mechanical tissue instability.\n\nB is correct: The firm ligamentous anchoring of the medial meniscus to the capsule and the medial collateral ligament (MCL) severely limits its mobility. Under rotational or shearing stress, it cannot glide out of the way like the mobile lateral meniscus, making it highly susceptible to tears.\n\nC is incorrect: Both menisci share a similar vascular layout, featuring a well-perfused periphery (red zone) and an avascular central region. The medial meniscus is not entirely devoid of blood vessels.\n\nD is incorrect: Both menisci articulate with the femoral condyles superiorly and the tibial plateau inferiorly to perform their primary load-bearing and shock-absorbing functions within the joint."
    },
    {
      "id": "meniskus-en-02",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "According to the established \"two-slice-touch\" rule, which criterion must be met to diagnose a meniscus tear on MRI with high specificity?",
      "options": [
        {
          "id": "A",
          "text": "The signal must touch both the superior and inferior articular surfaces."
        },
        {
          "id": "B",
          "text": "The signal increase must be detectable with surface contact on at least two consecutive slices."
        },
        {
          "id": "C",
          "text": "The tear must be visible in two different sequences (e.g., T1w and T2w)."
        },
        {
          "id": "D",
          "text": "The lesion must have an extension of at least 3 mm in the sagittal plane."
        }
      ],
      "correct": "B",
      "explanation": "A is incorrect: A tear does not need to span the entire height of the meniscus. It is completely sufficient if the pathological signal intersects either the superior or the inferior articular surface.\n\nB is correct: This rule dictates that the intrameniscal signal abnormality must communicate with the articular surface on at least two directly adjacent images (slices). This eliminates the risk of misinterpreting technical noise or volume averaging artifacts on a single slice as a true tear.\n\nC is incorrect: While tears should ideally be verified across multiple planes (sagittal/coronal) and sequences, the \"two-slice-touch\" rule specifically demands continuity across successive slices within the same sequence.\n\nD is incorrect: The rule is independent of absolute millimeter measurements. It relies solely on the number of involved slices, regardless of the protocol's standard slice thickness (which is typically 3 mm)."
    },
    {
      "id": "meniskus-en-03",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "In which vascular zone does a meniscus tear present the best biological conditions for a successful meniscus repair (suture)?",
      "options": [
        {
          "id": "A",
          "text": "White zone (Zone III)"
        },
        {
          "id": "B",
          "text": "Red-white zone (Zone II)"
        },
        {
          "id": "C",
          "text": "Red zone (Zone I)"
        },
        {
          "id": "D",
          "text": "Meniscal root"
        }
      ],
      "correct": "C",
      "explanation": "A is incorrect: The white zone comprises the central third of the meniscus and is completely avascular, relying purely on diffusion from synovial fluid. Suturing here almost always fails due to the lack of healing potential.\n\nB is incorrect: The red-white zone is a transitional area (approx. 3–5 mm from the capsule). It contains only a sparse, capillary blood supply, making the predictability of tissue healing after suturing highly uncertain.\n\nC is correct: The red zone (Zone I) represents the peripheral outer rim (<3 mm from the capsule) and receives a rich blood supply from the perimeniscal capillary plexus. The biological prerequisites for fibroblast migration and tissue repair are optimal here, favoring anatomical reconstruction.\n\nD is incorrect: The meniscal roots anchor the anterior and posterior horns to the tibial plateau. They represent specific ligamentous attachments rather than a vascular zone of the functional meniscal body."
    },
    {
      "id": "meniskus-en-04",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "According to standard protocols, which MRI sequence is best suited for the definitive detection of acute meniscus tears, accompanying bone marrow edema, and ligament disruptions?",
      "options": [
        {
          "id": "A",
          "text": "Native T1-weighting without fat saturation."
        },
        {
          "id": "B",
          "text": "T2-weighted or PD fat-saturated (fs) sequences."
        },
        {
          "id": "C",
          "text": "3D gradient-echo sequences with a slice thickness of 6 mm."
        },
        {
          "id": "D",
          "text": "T2*-weighted phase-contrast angiography."
        }
      ],
      "correct": "B",
      "explanation": "A is incorrect: Native T1-weighting provides excellent anatomical details and screens well for chronic fibrosis, but it lacks fluid sensitivity. Acute fluid entering a tear cleft or bone marrow edema cannot be reliably differentiated.\n\nB is correct: T2-w or PD-fs (proton density fat-saturated) sequences are highly sensitive to free fluid. Pathological changes like a tear gap (filled with synovial fluid) or marrow edema contain high amounts of water and appear hyperintense (bright) against the suppressed, dark background.\n\nC is incorrect: A 6 mm slice thickness is far too thick for internal knee derangement diagnostics. Small tears would be completely hidden due to volume averaging effects. The standard protocol requires a maximum thickness of 3 mm.\n\nD is incorrect: Phase-contrast angiography is designed to image fluid dynamics within vessels. It is entirely unsuited for evaluating the static, fibrocartilaginous tissue components of the knee joint."
    },
    {
      "id": "meniskus-en-05",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "How does the distribution of tears in the posterior horn of the lateral meniscus differ compared to the medial meniscus?",
      "options": [
        {
          "id": "A",
          "text": "In the lateral meniscus, practically all tears affect the anterior horn."
        },
        {
          "id": "B",
          "text": "In the lateral meniscus, about 50% of tears are located in the posterior horn, whereas in the medial meniscus, approximately 98% affect the posterior horn."
        },
        {
          "id": "C",
          "text": "Tears in the posterior horn of the lateral meniscus do not occur at all due to its O-shape."
        },
        {
          "id": "D",
          "text": "The distribution is absolutely identical in both menisci."
        }
      ],
      "correct": "B",
      "explanation": "A is incorrect: Although the anterior horn of the lateral meniscus is torn more often than that of the medial meniscus, it does not account for all or even the majority of lateral meniscal tears.\n\nB is correct: Because the posterior horn of the medial meniscus is rigidly fixed, it acts as a mechanical pivot during knee movement, absorbing immense stress—causing roughly 98% of its tears to occur there. The lateral meniscus is less constrained; only half of its tears affect the posterior horn, with the remainder distributed among the body (corpus) and anterior horn.\n\nC is incorrect: The geometric O-shape does not immunize the lateral meniscus against injury. Statistically, the posterior horn remains the most common site for tears, accounting for 50% of cases.\n\nD is incorrect: Due to completely different biomechanical fixations and mobility profiles, the medial and lateral menisci display entirely distinct lesion distribution patterns."
    },
    {
      "id": "meniskus-en-06",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "A radiology report describes a wedge-shaped/globular signal within the meniscus tissue that just falls short of reaching the articular surface on the current image. Which Lotysch subtype does this represent?",
      "options": [
        {
          "id": "A",
          "text": "Grade 2a"
        },
        {
          "id": "B",
          "text": "Grade 2b"
        },
        {
          "id": "C",
          "text": "Grade 2c"
        },
        {
          "id": "D",
          "text": "Grade 3"
        }
      ],
      "correct": "C",
      "explanation": "A is incorrect: Grade 2a is strictly defined as a purely linear (line-like) intrameniscal signal that shows absolutely no communication with either the superior or inferior articular surface. It lacks any broad or expanding morphology.\n\nB is incorrect: Grade 2b also describes a linear signal, but one that touches the articular surface on exactly a single slice, rendering the imaging finding inconclusive for a definitive tear.\n\nC is correct: A wedge-shaped, wide, or rounded (globular) intrameniscal signal that does not definitively break through the surface is classified as Lotysch Grade 2c. This indicates severe mucoid degeneration carrying an exceptionally high risk of an underlying occult (hidden) tear.\n\nD is incorrect: Grade 3 requires the signal to clearly and reproducibly breach the articular surface on at least two consecutive slices. Without objective surface contact, a Grade 3 diagnosis is not permitted."
    },
    {
      "id": "haemangiom-en-01",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which statement best describes a liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Cavernous non-neoplastic malformation"
        },
        {
          "id": "B",
          "text": "Intrahepatic metastasis with necrosis"
        },
        {
          "id": "C",
          "text": "Premalignant hepatocellular lesion"
        },
        {
          "id": "D",
          "text": "Bacterial liver abscess"
        }
      ],
      "correct": "A",
      "explanation": "A liver haemangioma is a cavernous, non-neoplastic vascular malformation and the most common benign solid liver tumour."
    },
    {
      "id": "haemangiom-en-02",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which ultrasound finding is typical for a small liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Well-defined hyperechoic lesion"
        },
        {
          "id": "B",
          "text": "Ill-defined hypoechoic lesion with capsular retraction"
        },
        {
          "id": "C",
          "text": "Gas echoes with posterior shadowing"
        },
        {
          "id": "D",
          "text": "Diffuse gallbladder wall thickening"
        }
      ],
      "correct": "A",
      "explanation": "Typical haemangiomas are usually hyperechoic and well-defined on ultrasound. If morphology is classic, further imaging is often unnecessary."
    },
    {
      "id": "haemangiom-en-03",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which dynamic CT pattern is classic for liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Peripheral nodular discontinuous enhancement with centripetal fill-in"
        },
        {
          "id": "B",
          "text": "Arterial wash-in with portal venous wash-out and capsule"
        },
        {
          "id": "C",
          "text": "Thin-walled lesion without enhancement"
        },
        {
          "id": "D",
          "text": "Diffuse infiltrative growth along the bile ducts"
        }
      ],
      "correct": "A",
      "explanation": "Classic haemangioma shows peripheral nodular discontinuous enhancement with progressive centripetal fill-in on later phases."
    },
    {
      "id": "haemangiom-en-04",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "What does the iris diaphragm phenomenon in liver haemangioma describe?",
      "options": [
        {
          "id": "A",
          "text": "Fill-in of the lesion from periphery to centre"
        },
        {
          "id": "B",
          "text": "Central wash-out in the delayed phase"
        },
        {
          "id": "C",
          "text": "Abrupt perfusion stop at the liver hilum"
        },
        {
          "id": "D",
          "text": "Ring-shaped abscess capsule"
        }
      ],
      "correct": "A",
      "explanation": "The iris diaphragm phenomenon describes centripetal contrast fill-in from the rim toward the centre."
    },
    {
      "id": "haemangiom-en-05",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which MRI finding is especially typical for a classic liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Very high T2 signal, the light-bulb sign"
        },
        {
          "id": "B",
          "text": "Marked T1-hyperintense fatty area with opposed-phase signal drop"
        },
        {
          "id": "C",
          "text": "Low T2 signal like fibrotic tissue"
        },
        {
          "id": "D",
          "text": "Only central diffusion restriction without enhancement"
        }
      ],
      "correct": "A",
      "explanation": "A classic haemangioma is very bright on T2, often even brighter than bile. This light-bulb sign is an important diagnostic clue."
    },
    {
      "id": "haemangiom-en-06",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "What is the typical DWI/ADC constellation in liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Bright DWI, high ADC: T2 shine-through"
        },
        {
          "id": "B",
          "text": "Bright DWI, low ADC: definite restriction"
        },
        {
          "id": "C",
          "text": "Dark DWI, ADC not measurable"
        },
        {
          "id": "D",
          "text": "DWI and ADC always normal"
        }
      ],
      "correct": "A",
      "explanation": "Haemangiomas may be hyperintense on high b-values. High ADC values indicate T2 shine-through and not true diffusion restriction."
    },
    {
      "id": "haemangiom-en-07",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "How does a typical haemangioma appear on delayed contrast phases?",
      "options": [
        {
          "id": "A",
          "text": "Increasingly blood-pool-like/isointense due to centripetal fill-in"
        },
        {
          "id": "B",
          "text": "Always completely hypodense without enhancement"
        },
        {
          "id": "C",
          "text": "Early wash-out with pseudocapsule"
        },
        {
          "id": "D",
          "text": "Only rim gas-filled"
        }
      ],
      "correct": "A",
      "explanation": "On portal venous and delayed phases, centripetal fill-in increases. The lesion approaches blood-pool or liver signal/density."
    },
    {
      "id": "haemangiom-en-08",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Why can larger haemangiomas look heterogeneous?",
      "options": [
        {
          "id": "A",
          "text": "Due to fibrosis, calcifications or thrombi"
        },
        {
          "id": "B",
          "text": "Due to obligatory malignant transformation"
        },
        {
          "id": "C",
          "text": "Due to air in the bile ducts"
        },
        {
          "id": "D",
          "text": "Due to focal fat infiltration of the renal cortex"
        }
      ],
      "correct": "A",
      "explanation": "Larger haemangiomas may become heterogeneous because of internal fibrosis, calcifications or thrombi. This does not automatically make them malignant."
    },
    {
      "id": "haemangiom-en-09",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which statement fits an atypical liver haemangioma better?",
      "options": [
        {
          "id": "A",
          "text": "No classic peripheral nodular enhancement, sometimes strong homogeneous arterial enhancement"
        },
        {
          "id": "B",
          "text": "Always homogeneous light-bulb T2 and complete classic centripetal fill-in"
        },
        {
          "id": "C",
          "text": "Never any enhancement"
        },
        {
          "id": "D",
          "text": "Always gas formation and fluid level"
        }
      ],
      "correct": "A",
      "explanation": "Atypical haemangiomas may lack classic peripheral nodular enhancement and centripetal fill-in and instead show strong homogeneous arterial enhancement."
    },
    {
      "id": "haemangiom-en-10",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which finding best helps avoid misdiagnosing a haemangioma as metastasis?",
      "options": [
        {
          "id": "A",
          "text": "High ADC and multiphasic blood-pool fill-in"
        },
        {
          "id": "B",
          "text": "Low ADC and rapid wash-out"
        },
        {
          "id": "C",
          "text": "Irregular infiltrative growth"
        },
        {
          "id": "D",
          "text": "Capsular retraction with bile duct dilatation"
        }
      ],
      "correct": "A",
      "explanation": "High ADC values argue against true diffusion restriction. Together with blood-pool-like centripetal fill-in, this supports haemangioma."
    },
    {
      "id": "fnh-en-01",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which statement most accurately describes focal nodular hyperplasia (FNH)?",
      "options": [
        { "id": "A", "text": "Benign, regenerative liver lesion" },
        { "id": "B", "text": "Malignant primary liver tumour with metastatic potential" },
        { "id": "C", "text": "Bacterial liver abscess with central liquefaction" },
        { "id": "D", "text": "Cystic lesion with serous content" }
      ],
      "correct": "A",
      "explanation": "FNH is a benign, regenerative liver lesion, usually asymptomatic and not requiring treatment."
    },
    {
      "id": "fnh-en-02",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which statement about the epidemiology of FNH is correct?",
      "options": [
        { "id": "A", "text": "It is the most common benign liver lesion overall" },
        { "id": "B", "text": "It is the second most common benign liver lesion after haemangioma and predominantly affects women" },
        { "id": "C", "text": "It mainly occurs in elderly men" },
        { "id": "D", "text": "It is a precancerous lesion with a high risk of malignant transformation" }
      ],
      "correct": "B",
      "explanation": "After haemangioma, FNH is the second most common benign liver lesion, most often in young to middle-aged adults with a clear female predominance."
    },
    {
      "id": "fnh-en-03",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which Doppler finding is typical for FNH?",
      "options": [
        { "id": "A", "text": "Central vessel with radiating branches (spoke-wheel pattern)" },
        { "id": "B", "text": "Complete absence of vessels within the lesion" },
        { "id": "C", "text": "Only peripheral venous vessels without a central vessel" },
        { "id": "D", "text": "Arteriovenous fistula with shunt flow" }
      ],
      "correct": "A",
      "explanation": "The spoke-wheel pattern – a central vessel with radiating branches – is a typical, though not definitive, Doppler finding of FNH."
    },
    {
      "id": "fnh-en-04",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "How does a typical FNH behave on the early arterial phase of CT?",
      "options": [
        { "id": "A", "text": "Peripheral nodular, discontinuous enhancement" },
        { "id": "B", "text": "Strong, homogeneous enhancement" },
        { "id": "C", "text": "No enhancement in any phase" },
        { "id": "D", "text": "Ring-like enhancement with central necrosis" }
      ],
      "correct": "B",
      "explanation": "Unlike haemangioma, FNH shows strong, homogeneous enhancement in the early arterial phase without peripheral nodular enhancement."
    },
    {
      "id": "fnh-en-05",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "What is characteristic of FNH in the portal venous and delayed phases?",
      "options": [
        { "id": "A", "text": "Marked wash-out with hypodensity relative to the liver" },
        { "id": "B", "text": "No wash-out, with rapid equalisation to the liver parenchyma" },
        { "id": "C", "text": "Progressive increase in lesion size" },
        { "id": "D", "text": "Appearance of new peripheral nodules" }
      ],
      "correct": "B",
      "explanation": "FNH shows no wash-out and rapidly equalises with the liver parenchyma in the portal venous and delayed phases – an important distinguishing feature from malignant lesions."
    },
    {
      "id": "fnh-en-06",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "How does FNH typically appear on T1 and T2 relative to the liver parenchyma?",
      "options": [
        { "id": "A", "text": "Markedly hypointense on T1 and strongly hyperintense on T2 (light-bulb sign)" },
        { "id": "B", "text": "Iso- to mildly hypointense on T1 and iso- to mildly hyperintense on T2" },
        { "id": "C", "text": "Hyperintense on T1 and hypointense on T2" },
        { "id": "D", "text": "No signal on either sequence" }
      ],
      "correct": "B",
      "explanation": "FNH is usually iso- to mildly hypointense on T1 and iso- to mildly hyperintense on T2 relative to the liver parenchyma, so it is often only subtly visible on non-contrast images."
    },
    {
      "id": "fnh-en-07",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "How does the central scar of FNH behave on MRI?",
      "options": [
        { "id": "A", "text": "Hyperintense on T2, hypointense on T1, with delayed enhancement" },
        { "id": "B", "text": "Hypointense on both T2 and T1 without any enhancement" },
        { "id": "C", "text": "Hyperintense on T1 and isointense on T2" },
        { "id": "D", "text": "Only visible on CT, never on MRI" }
      ],
      "correct": "A",
      "explanation": "The central scar is hyperintense on T2, hypointense on T1, and shows delayed enhancement – characteristic in about 70% of cases."
    },
    {
      "id": "fnh-en-08",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which feature is most helpful to distinguish FNH from HCC?",
      "options": [
        { "id": "A", "text": "Absence of wash-out despite strong arterial enhancement" },
        { "id": "B", "text": "Presence of a true tumour capsule" },
        { "id": "C", "text": "Elevated alpha-fetoprotein" },
        { "id": "D", "text": "Multifocal occurrence" }
      ],
      "correct": "A",
      "explanation": "HCC typically shows wash-out in the portal venous/delayed phase, whereas FNH shows no wash-out despite strong arterial enhancement."
    },
    {
      "id": "fnh-en-09",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which features can occur in atypical FNH?",
      "options": [
        { "id": "A", "text": "Absent central scar, heterogeneous appearance, pseudocapsule, or intralesional fat" },
        { "id": "B", "text": "Exclusively calcified rim without any enhancement" },
        { "id": "C", "text": "Complete cystic transformation" },
        { "id": "D", "text": "Diffuse involvement of the entire liver" }
      ],
      "correct": "A",
      "explanation": "Atypical FNH (~20%) may occur without a central scar or show a heterogeneous appearance, pseudocapsule, absent scar enhancement, or intralesional fat, which can make differentiation from other liver tumours difficult."
    },
    {
      "id": "fnh-en-10",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "What is the appropriate management of a typical, asymptomatic FNH?",
      "options": [
        { "id": "A", "text": "Generally no treatment, as it is benign and usually asymptomatic" },
        { "id": "B", "text": "Immediate surgical resection" },
        { "id": "C", "text": "Systemic chemotherapy" },
        { "id": "D", "text": "Transarterial chemoembolisation" }
      ],
      "correct": "A",
      "explanation": "FNH is benign, usually asymptomatic, and generally does not require treatment."
    },
    {
      "id": "sarkoidose-en-01",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which histological feature is typical of sarcoidosis?",
      "options": [
        {
          "id": "A",
          "text": "Caseating granulomas"
        },
        {
          "id": "B",
          "text": "Non-caseating granulomas"
        },
        {
          "id": "C",
          "text": "Eosinophilic microabscesses"
        },
        {
          "id": "D",
          "text": "Squamous tumour nests"
        }
      ],
      "correct": "B",
      "explanation": "Sarcoidosis is a systemic granulomatous disease of unknown cause. Non-caseating granulomas are typical."
    },
    {
      "id": "sarkoidose-en-02",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which HRCT nodule distribution is typical for sarcoidosis?",
      "options": [
        {
          "id": "A",
          "text": "Perilymphatic along fissures, pleura and bronchovascular bundles"
        },
        {
          "id": "B",
          "text": "Purely random haematogenous without fissural relation"
        },
        {
          "id": "C",
          "text": "Only basal subpleural honeycombing"
        },
        {
          "id": "D",
          "text": "Exclusively centrilobular tree-in-bud"
        }
      ],
      "correct": "A",
      "explanation": "Sarcoidosis typically shows sharply defined 2–4 mm micronodules in a perilymphatic distribution along fissures, pleura, septa and bronchovascular bundles."
    },
    {
      "id": "sarkoidose-en-03",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "What does the 1-2-3 sign describe in sarcoidosis?",
      "options": [
        {
          "id": "A",
          "text": "Right hilum, left hilum and right paratracheal region"
        },
        {
          "id": "B",
          "text": "Three cavities in the right upper lobe"
        },
        {
          "id": "C",
          "text": "Three zones of pulmonary fibrosis"
        },
        {
          "id": "D",
          "text": "Three stages of cardiac sarcoidosis"
        }
      ],
      "correct": "A",
      "explanation": "The 1-2-3 sign describes the typical nodal distribution: right hilum, left hilum and right paratracheal region."
    },
    {
      "id": "sarkoidose-en-04",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which Scadding stage shows isolated bilateral hilar lymphadenopathy without parenchymal disease?",
      "options": [
        {
          "id": "A",
          "text": "Stage 0"
        },
        {
          "id": "B",
          "text": "Stage I"
        },
        {
          "id": "C",
          "text": "Stage III"
        },
        {
          "id": "D",
          "text": "Stage IV"
        }
      ],
      "correct": "B",
      "explanation": "Scadding stage I corresponds to isolated bilateral hilar lymphadenopathy with normal lung parenchyma."
    },
    {
      "id": "sarkoidose-en-05",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "What does Scadding stage II mean?",
      "options": [
        {
          "id": "A",
          "text": "Fibrosis only"
        },
        {
          "id": "B",
          "text": "Parenchymal disease without lymphadenopathy"
        },
        {
          "id": "C",
          "text": "Bilateral hilar lymphadenopathy plus parenchymal disease"
        },
        {
          "id": "D",
          "text": "Normal chest X-ray"
        }
      ],
      "correct": "C",
      "explanation": "Stage II means BHL plus lung parenchymal abnormalities. Stage III is parenchymal disease without BHL, and stage IV is fibrosis."
    },
    {
      "id": "sarkoidose-en-06",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which statement about eggshell calcifications is correct?",
      "options": [
        {
          "id": "A",
          "text": "They are pathognomonic for sarcoidosis"
        },
        {
          "id": "B",
          "text": "They can also occur in silicosis"
        },
        {
          "id": "C",
          "text": "They always prove lymphoma"
        },
        {
          "id": "D",
          "text": "They occur only in asbestosis"
        }
      ],
      "correct": "B",
      "explanation": "Eggshell-like nodal calcifications can occur in sarcoidosis but are not specific and are also seen in silicosis."
    },
    {
      "id": "sarkoidose-en-07",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "What is the sarcoid galaxy sign?",
      "options": [
        {
          "id": "A",
          "text": "Large nodule surrounded by many small satellite nodules"
        },
        {
          "id": "B",
          "text": "Diffuse ground-glass opacity without nodules"
        },
        {
          "id": "C",
          "text": "Calcified pleural plaques"
        },
        {
          "id": "D",
          "text": "Central pulmonary embolism"
        }
      ],
      "correct": "A",
      "explanation": "The sarcoid galaxy sign consists of a larger granuloma aggregate surrounded by many small satellite nodules. It is not specific and can also occur in tuberculosis."
    },
    {
      "id": "sarkoidose-en-08",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which differential typically causes irregular nodular septal thickening, often unilateral or asymmetric?",
      "options": [
        {
          "id": "A",
          "text": "Lymphangitic carcinomatosis"
        },
        {
          "id": "B",
          "text": "Morbus Jüngling"
        },
        {
          "id": "C",
          "text": "Heerfordt syndrome"
        },
        {
          "id": "D",
          "text": "Discoid meniscus"
        }
      ],
      "correct": "A",
      "explanation": "Lymphangitic carcinomatosis often causes irregular nodular septal thickening and is frequently asymmetric or unilateral. Clinically, patients are often more severely ill."
    },
    {
      "id": "sarkoidose-en-09",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which triad defines Heerfordt syndrome?",
      "options": [
        {
          "id": "A",
          "text": "Uveitis, parotitis and facial palsy"
        },
        {
          "id": "B",
          "text": "Asthma, sinusitis and eosinophilia"
        },
        {
          "id": "C",
          "text": "Arthritis, urethritis and conjunctivitis"
        },
        {
          "id": "D",
          "text": "Haemoptysis, glomerulonephritis and sinusitis"
        }
      ],
      "correct": "A",
      "explanation": "Heerfordt syndrome is a manifestation of sarcoidosis with uveitis, parotitis and facial palsy."
    },
    {
      "id": "sarkoidose-en-10",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which modality is especially important for detecting cardiac sarcoidosis?",
      "options": [
        {
          "id": "A",
          "text": "MRI with late gadolinium enhancement"
        },
        {
          "id": "B",
          "text": "Conventional knee radiograph"
        },
        {
          "id": "C",
          "text": "Gallbladder ultrasound"
        },
        {
          "id": "D",
          "text": "Non-contrast head CT"
        }
      ],
      "correct": "A",
      "explanation": "Cardiac sarcoidosis is commonly assessed with MRI and late gadolinium enhancement. Clinically, the increased risk of arrhythmias is important."
    }
  ],
  "fa": [
    ...CONTRAST_QUESTIONS.fa,
    {
      "id": "meniskus-fa-01",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "چرا منیسک داخلی (Meniscus medialis) در مقایسه با منیسک خارجی به طور معناداری بیشتر دچار پارگی‌های تروماتیک (ناشی از ضربه) می‌شود؟",
      "options": [
        {
          "id": "A",
          "text": "به دلیل شکل C مانند خود، از نظر آناتومیک پایداری کمتری دارد."
        },
        {
          "id": "B",
          "text": "به کپسول مفصلی و رباط جانبی داخلی (MCL) چسبیده است و در نتیجه تحرک کمتری دارد."
        },
        {
          "id": "C",
          "text": "در تمام پهنای خود دارای خون‌رسانی کاملاً غیرعروقی (بدون رگ) است."
        },
        {
          "id": "D",
          "text": "برعکس منیسک خارجی، با کندیل‌های فمور (استخوان ران) مفصل نمی‌شود."
        }
      ],
      "correct": "B",
      "explanation": "الف غلط است: شکل C در منیسک داخلی و شکل O در منیسک خارجی، واریانت‌های آناتومیک نرمال هستند که با شکل پلاتوی تیبیا مطابقت دارند. این اشکال هندسی به خودی خود باعث ناپایداری مکانیکی بافت نمی‌شوند.\n\nب صحیح است: اتصال محکم منیسک داخلی به کپسول مفصلی و رباط جانبی داخلی (MCL) تحرک آن را به شدت محدود می‌کند. در هنگام حرکات چرخشی یا اعمال نیروهای برشی ناگهانی، این منیسک – برخلاف منیسک خارجی که آزاد و متحرک است – نمی‌تواند جابجا شود و پاره می‌شود.\n\nج غلط است: هر دو منیسک ساختار عروقی مشابهی دارند؛ یعنی در محیط (ناحیه قرمز) دارای رگ‌های خونی هستند و به سمت مرکز بدون رگ (آواسکولار) می‌شوند. منیسک داخلی کاملاً فاقد عروق نیست.\n\nد غلط است: هر دو منیسک از سمت بالا (پروکسیمال) با کندیل‌های فمور و از سمت پایین (دیستال) با پلاتوی تیبیا مفصل می‌شوند تا وظیفه اصلی خود یعنی توزیع بار و جذب ضربه را در مفصل انجام دهند."
    },
    {
      "id": "meniskus-fa-02",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "طبق قانون شناخته‌شده‌ی \"Two-slice-touch\" (تماس در دو تصویر)، چه معیاری باید وجود داشته باشد تا تشخیص پارگی منیسک در MRI با دقت و ویژگی بالا تایید شود؟",
      "options": [
        {
          "id": "A",
          "text": "سیگنال باید هم با سطح مفصلی بالایی (سوپریور) و هم پایینی (اینفریور) تماس داشته باشد."
        },
        {
          "id": "B",
          "text": "افزایش سیگنال باید حداقل در دو تصویر (برش) متوالی که با سطح مفصلی تماس دارند، دیده شود."
        },
        {
          "id": "C",
          "text": "پارگی باید در دو سکانس مختلف (مانند T1w و T2w) قابل رویت باشد."
        },
        {
          "id": "D",
          "text": "طول ضایعه در صفحه ساجیتال باید حداقل ۳ میلی‌متر باشد."
        }
      ],
      "correct": "B",
      "explanation": "الف غلط است: یک پارگی نیازی ندارد که کل ارتفاع منیسک را طی کند. اگر سیگنال پاتولوژیک فقط به سطح مفصلی بالایی (سوپریور) یا فقط به سطح پایینی (اینفریور) رسیده باشد، برای تشخیص کفایت می‌کند.\n\nب صحیح است: این قانون تصریح می‌کند که سیگنال افزایش‌یافته‌ی داخل منیسک باید حداقل در دو برش مجاور و پشت‌سرهم با سطح مفصل تماس داشته باشد. این معیار خطر اشتباه گرفتن نویزهای تکنیکی دستگاه یا پدیده حجم متوسط (Volume Averaging) در یک تک‌برش را با پارگی واقعی از بین می‌برد.\n\nج غلط است: اگرچه بررسی پارگی در سکانس‌ها و صفحات مختلف (ساجیتال/کورونال) ایده‌آل است، اما قانون خاص \"Two-slice-touch\" صرفاً بر تداوم ضایعه در برش‌های متوالی یک سکانس واحد تاکید دارد.\n\nد غلط است: این قانون مستقل از اندازه‌گیری‌های مطلق به میلی‌متر است و فقط بر اساس تعداد برش‌های درگیر تعریف می‌شود، حتی اگر ضخامت استاندارد برش‌ها در پروتکل معمولاً ۳ میلی‌متر باشد."
    },
    {
      "id": "meniskus-fa-03",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "پارگی منیسک در کدام ناحیه عروقی (خون‌رسانی)، بهترین شرایط بیولوژیکی را برای یک جراحی ترمیم و دوختن موفقیت‌آمیز (Suture) دارد؟",
      "options": [
        {
          "id": "A",
          "text": "ناحیه سفید (Zone III)"
        },
        {
          "id": "B",
          "text": "ناحیه قرمز-سفید (Zone II)"
        },
        {
          "id": "C",
          "text": "ناحیه قرمز (Zone I)"
        },
        {
          "id": "D",
          "text": "ریشه منیسک (Root)"
        }
      ],
      "correct": "C",
      "explanation": "الف غلط است: ناحیه سفید یک‌سوم مرکزی منیسک را تشکیل می‌دهد، کاملاً آواسکولار (بدون رگ) است و تغذیه آن صرفاً از طریق انتشار (دیفیوژن) مایع سینوویال انجام می‌شود. بخیه زدن در این ناحیه به دلیل عدم پتانسیل ترمیم بافتی تقریباً همیشه شکست می‌خورد.\n\nب غلط است: ناحیه قرمز-سفید یک منطقه بینابینی است (حدود ۳ تا ۵ میلی‌متر از کپسول). در این ناحیه خون‌رسانی مویرگی بسیار محدودی وجود دارد، به همین دلیل پیش‌آگهی و روند ترمیم بافت پس از بخیه زدن نامشخص و نامطمئن است.\n\nج صحیح است: ناحیه قرمز (Zone I) شامل لبه بیرونی و مجاور کپسول مفصلی است (فاصله کمتر از ۳ میلی‌متر). این ناحیه مستقیماً از طریق شبکه مویرگی دور منیسکی خون‌رسانی می‌شود. شرایط بیولوژیک برای مهاجرت فیبروبلاست‌ها و ترمیم بافت در اینجا ایده‌آل است و جوش خوردن بخیه را تسهیل می‌کند.\n\nد غلط است: ریشه‌های منیسک (Roots) محل اتصال لیگامانی شاخ‌های منیسک به پلاتوی تیبیا هستند. این بخش‌ها یک ناحیه عروقی در تنه کارکردی منیسک محسوب نمی‌شوند."
    },
    {
      "id": "meniskus-fa-04",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "طبق پروتکل‌های استاندارد، کدام سکانس MRI بهترین گزینه برای تشخیص قطعی پارگی‌های حاد منیسک، ادم (تجمع مایع) مغز استخوان و پارگی رباط‌ها است؟",
      "options": [
        {
          "id": "A",
          "text": "سکانس T1 معمولی بدون حذف چربی."
        },
        {
          "id": "B",
          "text": "سکانس‌های T2-weighted یا فشرده با حذف چربی (PD-fs)."
        },
        {
          "id": "C",
          "text": "سکانس‌های سه‌بعدی Gradient-Echo با ضخامت برش ۶ میلی‌متر."
        },
        {
          "id": "D",
          "text": "آنژیوگرافی تداخل فاز با وزن T2*."
        }
      ],
      "correct": "B",
      "explanation": "الف غلط است: سکانس T1 معمولی اگرچه آناتومی را به خوبی نشان می‌دهد و برای ارزیابی فیبروز مزمن مفید است، اما به مایعات حساس نیست. مایع حاد وارد شده به خط پارگی یا ادم مغز استخوان در این سکانس به درستی تفکیک نمی‌شوند.\n\nب صحیح است: سکانس‌های T2 یا PD-fs (پروتون دنسیتی با حذف چربی) به شدت به آب آزاد حساس هستند. از آنجا که پاتولوژی‌هایی مانند خط پارگی (پر شده با مایع سینوویال) یا ادم حاوی آب زیادی هستند، در این سکانس‌ها به صورت هایپرینتنس (روشن و سفید) در یک پس‌زمینه تاریک و حذف‌شده به خوبی دیده می‌شوند.\n\nج غلط است: ضخامت برش ۶ میلی‌متر برای تشخیص ضایعات داخلی زانو بسیار ضخیم است. پارگی‌های کوچک به دلیل پدیده حجم متوسط کاملاً محو می‌شوند. استاندارد پروتکل حداکثر ۳ میلی‌متر است.\n\nد غلط است: آنژیوگرافی تداخل فاز برای نشان دادن دینامیک جریان خون در رگ‌ها کاربرد دارد و برای ارزیابی بافت‌های استاتیک و غضروفی-فیبری مفصل زانو کاملاً بی‌استفاده است."
    },
    {
      "id": "meniskus-fa-05",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "نحوه توزیع و پخش شدن پارگی‌ها در شاخ پشتی (Hinterhorn) منیسک خارجی چه تفاوتی با منیسک داخلی دارد؟",
      "options": [
        {
          "id": "A",
          "text": "در منیسک خارجی، تقریباً تمام پارگی‌ها شاخ جلویی را درگیر می‌کنند."
        },
        {
          "id": "B",
          "text": "در منیسک خارجی حدود ۵۰٪ پارگی‌ها در شاخ پشتی رخ می‌دهد، در حالی که در منیسک داخلی حدود ۹۸٪ پارگی‌ها مربوط به شاخ پشتی است."
        },
        {
          "id": "C",
          "text": "پارگی در شاخ پشتی منیسک خارجی به دلیل شکل O مانند آن اصلاً رخ نمی‌دهد."
        },
        {
          "id": "D",
          "text": "میزان توزیع پارگی در هر دو منیسک کاملاً یکسان و مشابه است."
        }
      ],
      "correct": "B",
      "explanation": "الف غلط است: اگرچه شاخ جلویی منیسک خارجی بیشتر از منیسک داخلی دچار پارگی می‌شود، اما به هیچ وجه شامل تمام یا حتی اکثریت پارگی‌های منیسک خارجی نیست.\n\nب صحیح است: شاخ پشتی منیسک داخلی به دلیل تثبیت بودن، نقطه اتکای مکانیکی در حرکات زانو است و استرس شدیدی را تحمل می‌کند؛ به همین دلیل نزدیک به ۹۸٪ پارگی‌های آن در این ناحیه است. منیسک خارجی متحرک‌تر است؛ بنابراین تنها نیمی از پارگی‌های آن در شاخ پشتی رخ می‌دهد و بقیه در بدنه (Corpus) و شاخ جلویی پخش می‌شوند.\n\nج غلط است: شکل هندسی O مانند، منیسک خارجی را در برابر آسیب مصون نمی‌کند. از نظر آماری، شاخ پشتی همچنان با ۵۰٪ موارد، شایع‌ترین محل پارگی در منیسک خارجی است.\n\nد غلط است: به دلیل تفاوت‌های ساختاری و بیومکانیکی در میزان تثبیت و تحرک، منیسک داخلی و خارجی الگوهای توزیع ضایعه کاملاً متفاوتی را نشان می‌دهند."
    },
    {
      "id": "meniskus-fa-06",
      "tags": [
        "meniskus",
        "knie"
      ],
      "fach": "msk",
      "question": "یک گزارش رادیولوژی، وجود یک سیگنال گوهه‌ای شکل یا گرد (Globular) را در بافت منیسک توصیف می‌کند که در تصویر موجود، پاره شده و به سطح مفصل نرسیده است. این وضعیت با کدام ساب‌تایپ (زیرگروه) سیستم درجه‌بندی Lotysch مطابقت دارد؟",
      "options": [
        {
          "id": "A",
          "text": "درجه 2a"
        },
        {
          "id": "B",
          "text": "درجه 2b"
        },
        {
          "id": "C",
          "text": "درجه 2c"
        },
        {
          "id": "D",
          "text": "درجه ۳"
        }
      ],
      "correct": "C",
      "explanation": "الف غلط است: درجه 2a دقیقاً به عنوان یک سیگنال خطی (خط‌مانند) در داخل منیسک تعریف می‌شود که هیچ اتصالی با سطح مفصلی بالایی یا پایینی ندارد و فاقد هرگونه گسترش وسیع یا گرد است.\n\nب غلط است: درجه 2b نیز یک سیگنال خطی را توصیف می‌کند، با این تفاوت که سیگنال دقیقاً در یک تک‌برش با سطح مفصل تماس پیدا می‌کند که این یافته را برای پارگی قطعی غیرقابل استناد (Inconclusive) می‌سازد.\n\nج صحیح است: یک سیگنال درون‌منیسکی به شکل گوهه‌ای، وسیع یا گرد (Globular) که به طور قطعی سطح را قطع نکرده است، طبق سیستم لوتیش درجه 2c نامیده می‌شود. این حالت نشان‌دهنده دژنراسیون موکوئید پیشرفته است و ریسک بسیار بالایی برای یک پارگی مخفی (Occult) دارد.\n\nد غلط است: درجه ۳ مستلزم آن است که سیگنال به طور واضح و تکرارپذیر (حداقل در دو برش متوالی) سطح مفصلی را قطع کرده باشد. تا زمانی که تماس با سطح احراز نشود، تشخیص درجه ۳ مجاز نیست."
    },
    {
      "id": "haemangiom-fa-01",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام عبارت همانژیوم کبدی را دقیق‌تر توصیف می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "مالفورماسیون کاورنوز غیرنئوپلاستیک"
        },
        {
          "id": "B",
          "text": "متاستاز داخل کبدی همراه نکروز"
        },
        {
          "id": "C",
          "text": "ضایعه پیش‌بدخیم هپاتوسلولار"
        },
        {
          "id": "D",
          "text": "آبسه باکتریال کبد"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم کبدی یک مالفورماسیون عروقی کاورنوز و غیرنئوپلاستیک است و شایع‌ترین تومور جامد خوش‌خیم کبد محسوب می‌شود."
    },
    {
      "id": "haemangiom-fa-02",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام یافته سونوگرافی برای همانژیوم کوچک کبدی تیپیک است؟",
      "options": [
        {
          "id": "A",
          "text": "ضایعه اکوژن و خوش‌حد"
        },
        {
          "id": "B",
          "text": "ضایعه هیپواکو و بدحد همراه با کشیدگی کپسول"
        },
        {
          "id": "C",
          "text": "اکوهای گاز با سایه خلفی"
        },
        {
          "id": "D",
          "text": "ضخیم‌شدن منتشر دیواره کیسه صفرا"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم تیپیک در سونوگرافی معمولاً اکوژن و خوش‌حد است. اگر مورفولوژی کلاسیک باشد، اغلب تصویربرداری بیشتر لازم نیست."
    },
    {
      "id": "haemangiom-fa-03",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام الگوی CT دینامیک برای همانژیوم کبدی کلاسیک است؟",
      "options": [
        {
          "id": "A",
          "text": "enhancement ندولار محیطی و ناپیوسته با پرشدگی مرکزگرا"
        },
        {
          "id": "B",
          "text": "wash-in شریانی با wash-out پورتال و کپسول"
        },
        {
          "id": "C",
          "text": "ضایعه نازک‌دیواره بدون enhancement"
        },
        {
          "id": "D",
          "text": "رشد انفیلتراتیو منتشر در امتداد مجاری صفراوی"
        }
      ],
      "correct": "A",
      "explanation": "الگوی کلاسیک همانژیوم، enhancement ندولار و ناپیوسته محیطی است که در فازهای بعدی به صورت مرکزگرا پر می‌شود."
    },
    {
      "id": "haemangiom-fa-04",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "پدیده Iris diaphragm در همانژیوم کبدی چه چیزی را توصیف می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "پرشدگی ضایعه از محیط به مرکز"
        },
        {
          "id": "B",
          "text": "wash-out مرکزی در فاز تأخیری"
        },
        {
          "id": "C",
          "text": "قطع ناگهانی پرفیوژن در ناف کبد"
        },
        {
          "id": "D",
          "text": "کپسول حلقوی آبسه"
        }
      ],
      "correct": "A",
      "explanation": "پدیده Iris diaphragm یعنی پرشدگی مرکزگرا با ماده حاجب از حاشیه به سمت مرکز."
    },
    {
      "id": "haemangiom-fa-05",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام یافته MRI برای همانژیوم کلاسیک کبدی بسیار تیپیک است؟",
      "options": [
        {
          "id": "A",
          "text": "سیگنال T2 بسیار بالا به صورت Light-bulb sign"
        },
        {
          "id": "B",
          "text": "ناحیه چربی T1 هایپراینتنس با افت سیگنال در opposed phase"
        },
        {
          "id": "C",
          "text": "سیگنال T2 پایین شبیه بافت فیبروتیک"
        },
        {
          "id": "D",
          "text": "فقط محدودیت انتشار مرکزی بدون enhancement"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم کلاسیک در T2 بسیار روشن است و گاهی حتی از صفرا روشن‌تر دیده می‌شود. این Light-bulb sign یک سرنخ مهم تشخیصی است."
    },
    {
      "id": "haemangiom-fa-06",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "الگوی تیپیک DWI/ADC در همانژیوم کبدی چیست؟",
      "options": [
        {
          "id": "A",
          "text": "DWI روشن، ADC بالا: T2 shine-through"
        },
        {
          "id": "B",
          "text": "DWI روشن، ADC پایین: محدودیت قطعی"
        },
        {
          "id": "C",
          "text": "DWI تیره، ADC غیرقابل اندازه‌گیری"
        },
        {
          "id": "D",
          "text": "DWI و ADC همیشه طبیعی"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم ممکن است در b-value بالا روشن باشد. اما ADC بالا نشان‌دهنده T2 shine-through است و محدودیت انتشار واقعی نیست."
    },
    {
      "id": "haemangiom-fa-07",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "همانژیوم تیپیک در فازهای تأخیری کنتراست چگونه دیده می‌شود؟",
      "options": [
        {
          "id": "A",
          "text": "به علت پرشدگی مرکزگرا به‌تدریج شبیه blood pool یا ایزواینتنس می‌شود"
        },
        {
          "id": "B",
          "text": "همیشه کاملاً هیپودنس و بدون enhancement می‌ماند"
        },
        {
          "id": "C",
          "text": "wash-out زودرس با pseudocapsule"
        },
        {
          "id": "D",
          "text": "فقط حاشیه پر از گاز دارد"
        }
      ],
      "correct": "A",
      "explanation": "در فاز پورتال و تأخیری، پرشدگی مرکزگرا بیشتر می‌شود و ضایعه به دانسیته/سیگنال خون یا کبد نزدیک می‌شود."
    },
    {
      "id": "haemangiom-fa-08",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "چرا همانژیوم‌های بزرگ‌تر ممکن است ناهمگون دیده شوند؟",
      "options": [
        {
          "id": "A",
          "text": "به علت فیبروز، کلسیفیکاسیون یا ترومبوز"
        },
        {
          "id": "B",
          "text": "به علت تبدیل بدخیم اجباری"
        },
        {
          "id": "C",
          "text": "به علت هوا در مجاری صفراوی"
        },
        {
          "id": "D",
          "text": "به علت نفوذ چربی در قشر کلیه"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم‌های بزرگ‌تر ممکن است به علت فیبروز داخلی، کلسیفیکاسیون یا ترومبوز ناهمگون شوند. این به‌تنهایی به معنی بدخیمی نیست."
    },
    {
      "id": "haemangiom-fa-09",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام عبارت بیشتر با همانژیوم آتیپیک کبدی تطابق دارد؟",
      "options": [
        {
          "id": "A",
          "text": "نبود enhancement ندولار محیطی کلاسیک، گاهی enhancement هموژن و قوی شریانی"
        },
        {
          "id": "B",
          "text": "همیشه T2 کاملاً Light-bulb و پرشدگی مرکزگرای کلاسیک کامل"
        },
        {
          "id": "C",
          "text": "هیچ‌وقت enhancement ندارد"
        },
        {
          "id": "D",
          "text": "همیشه گاز و سطح مایع دارد"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم آتیپیک ممکن است enhancement ندولار محیطی و پرشدگی مرکزگرای کلاسیک را نداشته باشد و به جای آن enhancement هموژن و قوی شریانی نشان دهد."
    },
    {
      "id": "haemangiom-fa-10",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام یافته بیشتر کمک می‌کند همانژیوم با متاستاز اشتباه نشود؟",
      "options": [
        {
          "id": "A",
          "text": "ADC بالا و پرشدگی چندفازی شبیه blood pool"
        },
        {
          "id": "B",
          "text": "ADC پایین و wash-out سریع"
        },
        {
          "id": "C",
          "text": "رشد انفیلتراتیو نامنظم"
        },
        {
          "id": "D",
          "text": "کشیدگی کپسول همراه با اتساع مجاری صفراوی"
        }
      ],
      "correct": "A",
      "explanation": "ADC بالا علیه محدودیت انتشار واقعی است. همراه با پرشدگی مرکزگرای شبیه blood pool، تشخیص همانژیوم را تقویت می‌کند."
    },
    {
      "id": "fnh-fa-01",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام گزینه هیپرپلازی ندولار فوکال (FNH) را به‌درستی توصیف می‌کند؟",
      "options": [
        { "id": "A", "text": "ضایعه خوش‌خیم و رژنراتیو کبد" },
        { "id": "B", "text": "تومور بدخیم اولیه کبد با پتانسیل متاستاز" },
        { "id": "C", "text": "آبسه باکتریایی کبد با ذوب مرکزی" },
        { "id": "D", "text": "ضایعه کیستیک با محتوای سروز" }
      ],
      "correct": "A",
      "explanation": "FNH یک ضایعه خوش‌خیم و رژنراتیو کبد است، معمولاً بدون علامت و بدون نیاز به درمان."
    },
    {
      "id": "fnh-fa-02",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام گزینه درباره اپیدمیولوژی FNH صحیح است؟",
      "options": [
        { "id": "A", "text": "شایع‌ترین ضایعه خوش‌خیم کبد به‌طور کلی است" },
        { "id": "B", "text": "بعد از همانژیوم، دومین ضایعه خوش‌خیم شایع کبد است و بیشتر در زنان دیده می‌شود" },
        { "id": "C", "text": "بیشتر در مردان مسن دیده می‌شود" },
        { "id": "D", "text": "یک ضایعه پره‌کانسر با خطر بالای بدخیمی است" }
      ],
      "correct": "B",
      "explanation": "بعد از همانژیوم، FNH دومین ضایعه خوش‌خیم شایع کبد است؛ بیشتر در بالغین جوان تا میانسال با غلبه واضح در زنان."
    },
    {
      "id": "fnh-fa-03",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام یافته داپلر برای FNH تیپیک است؟",
      "options": [
        { "id": "A", "text": "عروق مرکزی با شاخه‌های رادیال (الگوی spoke-wheel)" },
        { "id": "B", "text": "نبود کامل عروق در ضایعه" },
        { "id": "C", "text": "فقط عروق وریدی محیطی بدون عروق مرکزی" },
        { "id": "D", "text": "فیستول شریانی-وریدی با جریان شانت" }
      ],
      "correct": "A",
      "explanation": "الگوی spoke-wheel - یک عروق مرکزی با شاخه‌های رادیال - یافته داپلر تیپیک ولی غیرقطعی برای FNH است."
    },
    {
      "id": "fnh-fa-04",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "رفتار FNH تیپیک در فاز شریانی زودرس CT چگونه است؟",
      "options": [
        { "id": "A", "text": "enhancement ندولار محیطی و ناپیوسته" },
        { "id": "B", "text": "enhancement قوی و هموژن" },
        { "id": "C", "text": "بدون enhancement در هیچ فازی" },
        { "id": "D", "text": "enhancement حلقوی با نکروز مرکزی" }
      ],
      "correct": "B",
      "explanation": "برخلاف همانژیوم، FNH در فاز شریانی زودرس enhancement قوی و هموژن دارد، بدون enhancement ندولار محیطی."
    },
    {
      "id": "fnh-fa-05",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "ویژگی تیپیک FNH در فاز پورتال و تأخیری چیست؟",
      "options": [
        { "id": "A", "text": "wash-out واضح با هیپودنسیته نسبت به کبد" },
        { "id": "B", "text": "بدون wash-out، با تطابق سریع با پارانشیم کبد" },
        { "id": "C", "text": "افزایش تدریجی اندازه ضایعه" },
        { "id": "D", "text": "ظهور ندول‌های محیطی جدید" }
      ],
      "correct": "B",
      "explanation": "FNH هیچ wash-out نشان نمی‌دهد و در فاز پورتال و تأخیری به‌سرعت با پارانشیم کبد تطابق می‌یابد - یک ویژگی افتراقی مهم از ضایعات بدخیم."
    },
    {
      "id": "fnh-fa-06",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "ضایعه FNH معمولاً در T1 و T2 چگونه دیده می‌شود؟",
      "options": [
        { "id": "A", "text": "به‌وضوح هیپواینتنس در T1 و به‌شدت هایپراینتنس در T2 (light-bulb sign)" },
        { "id": "B", "text": "ایزو تا کمی هیپواینتنس در T1 و ایزو تا کمی هایپراینتنس در T2" },
        { "id": "C", "text": "هایپراینتنس در T1 و هیپواینتنس در T2" },
        { "id": "D", "text": "بدون سیگنال در هر دو سکانس" }
      ],
      "correct": "B",
      "explanation": "FNH معمولاً نسبت به پارانشیم کبد در T1 ایزو تا کمی هیپواینتنس و در T2 ایزو تا کمی هایپراینتنس است، بنابراین در تصاویر بدون کنتراست اغلب فقط به‌طور خفیف قابل مشاهده است."
    },
    {
      "id": "fnh-fa-07",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "اسکار مرکزی FNH در MRI چگونه رفتار می‌کند؟",
      "options": [
        { "id": "A", "text": "هایپراینتنس در T2، هیپواینتنس در T1، با enhancement تأخیری" },
        { "id": "B", "text": "هیپواینتنس در T2 و T1 بدون هیچ enhancement" },
        { "id": "C", "text": "هایپراینتنس در T1 و ایزواینتنس در T2" },
        { "id": "D", "text": "فقط در CT قابل مشاهده است، هرگز در MRI" }
      ],
      "correct": "A",
      "explanation": "اسکار مرکزی در T2 هایپراینتنس، در T1 هیپواینتنس است و enhancement تأخیری دارد - تیپیک در حدود ۷۰٪ موارد."
    },
    {
      "id": "fnh-fa-08",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام ویژگی بیشترین کمک به افتراق FNH از HCC می‌کند؟",
      "options": [
        { "id": "A", "text": "نبود wash-out به‌رغم enhancement شریانی قوی" },
        { "id": "B", "text": "وجود کپسول واقعی تومور" },
        { "id": "C", "text": "افزایش آلفافتوپروتئین" },
        { "id": "D", "text": "وقوع چندکانونی" }
      ],
      "correct": "A",
      "explanation": "HCC معمولاً در فاز پورتال/تأخیری wash-out دارد، در حالی که FNH به‌رغم enhancement شریانی قوی، wash-out ندارد."
    },
    {
      "id": "fnh-fa-09",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام ویژگی‌ها می‌توانند در FNH آتیپیک دیده شوند؟",
      "options": [
        { "id": "A", "text": "نبود اسکار مرکزی، ظاهر هتروژن، پسودوکپسول یا چربی داخل ضایعه" },
        { "id": "B", "text": "فقط حاشیه کلسیفیه بدون هیچ enhancement" },
        { "id": "C", "text": "تبدیل کامل کیستیک" },
        { "id": "D", "text": "درگیری منتشر کل کبد" }
      ],
      "correct": "A",
      "explanation": "FNH آتیپیک (~۲۰٪) ممکن است بدون اسکار مرکزی باشد یا ظاهر هتروژن، پسودوکپسول، عدم enhancement اسکار یا چربی داخل ضایعه نشان دهد، که افتراق از سایر تومورهای کبدی را دشوار می‌کند."
    },
    {
      "id": "fnh-fa-10",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "رویکرد مناسب برای FNH تیپیک و بدون علامت چیست؟",
      "options": [
        { "id": "A", "text": "معمولاً بدون درمان، چون خوش‌خیم و معمولاً بدون علامت است" },
        { "id": "B", "text": "رزکسیون جراحی فوری" },
        { "id": "C", "text": "شیمی‌درمانی سیستمیک" },
        { "id": "D", "text": "آمبولیزاسیون شیمیایی ترانس‌آرتریال" }
      ],
      "correct": "A",
      "explanation": "FNH خوش‌خیم است، معمولاً بدون علامت است و معمولاً نیاز به درمان ندارد."
    },
    {
      "id": "sarkoidose-fa-01",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام ویژگی هیستولوژیک برای سارکوئیدوز تیپیک است؟",
      "options": [
        {
          "id": "A",
          "text": "گرانولوم‌های caseating"
        },
        {
          "id": "B",
          "text": "گرانولوم‌های non-caseating"
        },
        {
          "id": "C",
          "text": "میکروآبسه‌های ائوزینوفیلیک"
        },
        {
          "id": "D",
          "text": "لانه‌های توموری اسکواموس"
        }
      ],
      "correct": "B",
      "explanation": "سارکوئیدوز یک بیماری سیستمیک گرانولوماتوز با علت ناشناخته است. گرانولوم‌های non-caseating برای آن تیپیک هستند."
    },
    {
      "id": "sarkoidose-fa-02",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام الگوی توزیع ندول‌ها در HRCT برای سارکوئیدوز تیپیک است؟",
      "options": [
        {
          "id": "A",
          "text": "پری‌لنفاتیک در امتداد فیشورها، پلور و دسته‌های برونکوواسکولار"
        },
        {
          "id": "B",
          "text": "کاملاً رندوم هماتوژن بدون ارتباط با فیشور"
        },
        {
          "id": "C",
          "text": "فقط Honeycombing بازال ساب‌پلورال"
        },
        {
          "id": "D",
          "text": "فقط Tree-in-bud سنترلوبولار"
        }
      ],
      "correct": "A",
      "explanation": "سارکوئیدوز معمولاً میکروندول‌های ۲–۴ میلی‌متری شارپ با توزیع پری‌لنفاتیک در امتداد فیشورها، پلور، سپتا و دسته‌های برونکوواسکولار نشان می‌دهد."
    },
    {
      "id": "sarkoidose-fa-03",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "علامت 1-2-3 در سارکوئیدوز چه چیزی را توصیف می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "هیلوم راست، هیلوم چپ و ناحیه پارا تراکئال راست"
        },
        {
          "id": "B",
          "text": "سه کاویته در لوب فوقانی راست"
        },
        {
          "id": "C",
          "text": "سه زون فیبروز ریه"
        },
        {
          "id": "D",
          "text": "سه مرحله سارکوئیدوز قلبی"
        }
      ],
      "correct": "A",
      "explanation": "علامت 1-2-3 توزیع تیپیک لنف‌نودها را نشان می‌دهد: هیلوم راست، هیلوم چپ و پارا تراکئال راست."
    },
    {
      "id": "sarkoidose-fa-04",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام مرحله Scadding فقط لنفادنوپاتی بی‌هیلار بدون درگیری پارانشیم دارد؟",
      "options": [
        {
          "id": "A",
          "text": "مرحله 0"
        },
        {
          "id": "B",
          "text": "مرحله I"
        },
        {
          "id": "C",
          "text": "مرحله III"
        },
        {
          "id": "D",
          "text": "مرحله IV"
        }
      ],
      "correct": "B",
      "explanation": "مرحله I در Scadding یعنی فقط لنفادنوپاتی بی‌هیلار با پارانشیم طبیعی."
    },
    {
      "id": "sarkoidose-fa-05",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "مرحله II در Scadding به چه معناست؟",
      "options": [
        {
          "id": "A",
          "text": "فقط فیبروز"
        },
        {
          "id": "B",
          "text": "درگیری پارانشیم بدون لنفادنوپاتی"
        },
        {
          "id": "C",
          "text": "لنفادنوپاتی بی‌هیلار همراه با درگیری پارانشیم"
        },
        {
          "id": "D",
          "text": "رادیوگرافی قفسه سینه طبیعی"
        }
      ],
      "correct": "C",
      "explanation": "مرحله II یعنی BHL به همراه تغییرات پارانشیم ریه. مرحله III پارانشیم بدون BHL و مرحله IV فیبروز است."
    },
    {
      "id": "sarkoidose-fa-06",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام جمله درباره کلسیفیکاسیون Eggshell درست است؟",
      "options": [
        {
          "id": "A",
          "text": "برای سارکوئیدوز پاتوگنومونیک است"
        },
        {
          "id": "B",
          "text": "در سیلیکوز هم دیده می‌شود"
        },
        {
          "id": "C",
          "text": "همیشه لنفوم را اثبات می‌کند"
        },
        {
          "id": "D",
          "text": "فقط در آزبستوز رخ می‌دهد"
        }
      ],
      "correct": "B",
      "explanation": "کلسیفیکاسیون شبیه پوسته تخم‌مرغ می‌تواند در سارکوئیدوز دیده شود، اما اختصاصی نیست و در سیلیکوز هم رخ می‌دهد."
    },
    {
      "id": "sarkoidose-fa-07",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Sarcoid Galaxy Sign چیست؟",
      "options": [
        {
          "id": "A",
          "text": "ندول بزرگ با ندول‌های ماهواره‌ای کوچک متعدد اطراف آن"
        },
        {
          "id": "B",
          "text": "Ground-glass منتشر بدون ندول"
        },
        {
          "id": "C",
          "text": "پلاک پلور کلسیفیه"
        },
        {
          "id": "D",
          "text": "آمبولی مرکزی ریه"
        }
      ],
      "correct": "A",
      "explanation": "Sarcoid Galaxy Sign شامل تجمع بزرگ‌تر گرانولوم است که با ندول‌های ماهواره‌ای کوچک احاطه شده است. این علامت اختصاصی نیست و در سل هم ممکن است دیده شود."
    },
    {
      "id": "sarkoidose-fa-08",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام DD معمولاً ضخیم‌شدن سپتای ندولار نامنظم و اغلب یک‌طرفه یا نامتقارن ایجاد می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "Lymphangiosis carcinomatosa"
        },
        {
          "id": "B",
          "text": "Morbus Jüngling"
        },
        {
          "id": "C",
          "text": "سندرم Heerfordt"
        },
        {
          "id": "D",
          "text": "منیسک دیسکوئید"
        }
      ],
      "correct": "A",
      "explanation": "لنفانژیوز کارسینوماتوز اغلب باعث ضخیم‌شدن نامنظم و ندولار سپتا می‌شود و معمولاً نامتقارن یا یک‌طرفه است. بیمار از نظر بالینی غالباً بدحال‌تر است."
    },
    {
      "id": "sarkoidose-fa-09",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام سه‌گانه سندرم Heerfordt را تعریف می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "یووئیت، پاروتیت و فلج فاسیال"
        },
        {
          "id": "B",
          "text": "آسم، سینوزیت و ائوزینوفیلی"
        },
        {
          "id": "C",
          "text": "آرتریت، اورتریت و کونژنکتیویت"
        },
        {
          "id": "D",
          "text": "هموپتزی، گلومرولونفریت و سینوزیت"
        }
      ],
      "correct": "A",
      "explanation": "سندرم Heerfordt یکی از تظاهرات سارکوئیدوز است و شامل یووئیت، پاروتیت و فلج فاسیال می‌شود."
    },
    {
      "id": "sarkoidose-fa-10",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام روش برای تشخیص سارکوئیدوز قلبی اهمیت ویژه دارد؟",
      "options": [
        {
          "id": "A",
          "text": "MRI با Late Gadolinium Enhancement"
        },
        {
          "id": "B",
          "text": "رادیوگرافی ساده زانو"
        },
        {
          "id": "C",
          "text": "سونوگرافی کیسه صفرا"
        },
        {
          "id": "D",
          "text": "CT سر بدون کنتراست"
        }
      ],
      "correct": "A",
      "explanation": "سارکوئیدوز قلبی معمولاً با MRI و Late Gadolinium Enhancement ارزیابی می‌شود. از نظر بالینی افزایش خطر آریتمی مهم است."
    }
  ]
}

export const MCQ_TOPIC_GROUPS = [
  {
    fachId: 'technik',
    kapitelId: 'technik-kontrastmittel',
    title: { de: '9. Kontrastmittel', en: '9. Contrast Media', fa: '۹. مواد حاجب' },
    topics: CONTRAST_TOPICS.map(({ id, title }) => ({ id, title })),
  },
  {
    fachId: 'msk',
    kapitelId: 'msk-knie',
    title: { de: '15. Knie', en: '15. Knee', fa: '۱۵. زانو' },
    topics: [
      { id: 'meniskus', title: { de: 'Meniskus', en: 'Meniscus', fa: 'منیسک' } },
    ],
  },
  {
    fachId: 'abdomen',
    kapitelId: 'abdomen-leber',
    title: { de: 'Leber', en: 'Liver', fa: 'کبد' },
    topics: [
      { id: 'haemangiom', title: { de: 'Leberhämangiom', en: 'Liver haemangioma', fa: 'همانژیوم کبد' } },
    ],
  },
  {
    fachId: 'thorax',
    kapitelId: 'thorax-lunge',
    title: { de: 'Lunge', en: 'Lung', fa: 'ریه' },
    topics: [
      { id: 'sarkoidose', title: { de: 'Sarkoidose', en: 'Sarcoidosis', fa: 'سارکوئیدوز' } },
    ],
  },
]

export function getAvailableQuestionTopicIds() {
  const tags = new Set(QUESTION_BANK.de.flatMap(question => question.tags))
  return new Set(
    MCQ_TOPIC_GROUPS.flatMap(group => group.topics)
      .map(topic => topic.id)
      .filter(topicId => tags.has(topicId))
  )
}

export function countQuestions(themenIds) {
  const selected = new Set(themenIds)
  return QUESTION_BANK.de.filter(question => question.tags.some(tag => selected.has(tag))).length
}

export function getQuestions(themenIds, lang, n) {
  const all = QUESTION_BANK[lang] || QUESTION_BANK.de
  const tagSet = new Set(themenIds)
  const filtered = all.filter(q => q.tags.some(t => tagSet.has(t)))
  const shuffled = [...filtered]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, n)
}

export function getQuestionsByIds(questionIds, lang) {
  const wanted = new Set(questionIds)
  const all = QUESTION_BANK[lang] || QUESTION_BANK.de
  return all.filter(question => wanted.has(question.id))
}
