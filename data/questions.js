// ── RADYAR QUESTION BANK ────────────────────────────────────────────────────
// Struktur: Jede Frage hat tags[] mit Thema-IDs aus curriculum.js
// Neue Fragen einfach als weiteres Objekt in QUESTION_BANK hinzufügen.

export const QUESTION_BANK = {
  de: [
    // ── TECHNIK: Kontrastmittel ───────────────────────────────────────────
    {
      id: 'km-de-01',
      tags: ['km-typen'],
      fach: 'technik',
      question: 'Welche Aussage zu nicht-ionischen Kontrastmitteln (z. B. Ultravist®) trifft zu?',
      options: [
        { id: 'A', text: 'Höhere Osmolarität als ionische KM' },
        { id: 'B', text: 'Nur enteral zugelassen' },
        { id: 'C', text: 'Niedrigere Osmolarität und besser verträglich' },
        { id: 'D', text: 'Tragen eine negative Ladung' },
      ],
      correct: 'C',
      explanation: 'Nicht-ionische KM besitzen keine elektrische Ladung und sind daher hydrophiler als ionische KM. Durch die niedrigere Osmolarität (iso- bis leicht hyperosmolar gegenüber Blut) sind sie deutlich besser verträglich und haben eine geringere Rate an Nebenwirkungen. Deshalb sind sie der Standard für alle intravaskulären Anwendungen.',
    },
    {
      id: 'km-de-02',
      tags: ['km-typen'],
      fach: 'technik',
      question: 'Für welche Indikation wird eine hohe Injektionsrate von 5 ml/s empfohlen?',
      options: [
        { id: 'A', text: 'Reine portalvenöse Abdomen-Phase' },
        { id: 'B', text: 'Ausschluss einer Lungenarterienembolie (LAE-CT)' },
        { id: 'C', text: 'Native Schädel-CT ohne KM' },
        { id: 'D', text: 'KM-Gabe über einen Zentralvenenkatheter (ZVK)' },
      ],
      correct: 'B',
      explanation: 'Beim LAE-CT (Pulmonalis-Angiographie) ist eine hohe Injektionsrate von 5 ml/s entscheidend, um eine ausreichende Konzentration des Kontrastmittels in der A. pulmonalis zu erreichen und kleinste Füllungsdefekte sicher darzustellen. Über einen ZVK darf nur mit maximal 2,5 ml/s injiziert werden.',
    },
    {
      id: 'km-de-03',
      tags: ['km-nw'],
      fach: 'technik',
      question: 'Wie definiert die ESUR eine PC-AKI (Post-Contrast Acute Kidney Injury)?',
      options: [
        { id: 'A', text: 'Kreatininanstieg ≥ 0,3 mg/dl oder ≥ 1,5-fach innerhalb 48–72 h nach KM-Gabe' },
        { id: 'B', text: 'GFR-Abfall um 10 % nach 7 Tagen' },
        { id: 'C', text: 'Anurie innerhalb von 6 h nach KM-Gabe' },
        { id: 'D', text: 'Harnstoffanstieg um das 2-fache nach 24 h' },
      ],
      correct: 'A',
      explanation: 'Die ESUR-Definition der PC-AKI: Anstieg des Serumkreatinins um ≥ 0,3 mg/dl (absolut) oder auf das ≥ 1,5-fache des Ausgangswertes (relativ), jeweils innerhalb von 48–72 h nach intravaskulärer KM-Gabe. Die Umbenennung von CIN zu PC-AKI trägt dem fehlenden kausalen Zusammenhang Rechnung.',
    },
    {
      id: 'km-de-04',
      tags: ['km-nw'],
      fach: 'technik',
      question: 'Welche Aussage zur sogenannten „Jodallergie\" ist korrekt?',
      options: [
        { id: 'A', text: 'Sie ist IgE-vermittelt gegen elementares Jod' },
        { id: 'B', text: 'Sie existiert nicht – Jod als kleines Molekül ist nicht allergen' },
        { id: 'C', text: 'Sie erfordert immer eine Adrenalin-Prophylaxe vor jeder KM-Gabe' },
        { id: 'D', text: 'Sie tritt nur bei makrozyklischen Gadolinium-KM auf' },
      ],
      correct: 'B',
      explanation: 'Der Begriff „Jodallergie\" ist medizinisch nicht korrekt. Jod ist ein kleines anorganisches Molekül ohne Hapten-Eigenschaften und daher nicht allergen. Allergische bzw. pseudoallergische Reaktionen richten sich stets gegen andere Molekülbestandteile des Kontrastmittels. Eine generelle Prophylaxe mit Adrenalin ist nicht indiziert.',
    },
    {
      id: 'km-de-05',
      tags: ['km-mrt'],
      fach: 'technik',
      question: 'Welches Gadolinium-KM ist das einzige hepatozytenspezifische Kontrastmittel und wird in reduzierter Dosis verabreicht?',
      options: [
        { id: 'A', text: 'Gadovist® (Gadobutrol)' },
        { id: 'B', text: 'Dotarem® (Gadoterat)' },
        { id: 'C', text: 'Primovist® (Gadoxetsäure)' },
        { id: 'D', text: 'Gastrografin® (Diatrizoat)' },
      ],
      correct: 'C',
      explanation: 'Primovist® (Gadoxetsäure) ist das einzige MRT-Kontrastmittel mit echter hepatozytenspezifischer Aufnahme (~50 %). Es wird über OATP1B1/3-Transporter aufgenommen und biliär ausgeschieden. Dosis: nur 0,025 mmol/kg KG – ein Viertel der üblichen Gd-Standarddosis.',
    },
    {
      id: 'km-de-06',
      tags: ['km-spezial'],
      fach: 'technik',
      question: 'Was muss nach der Geburt eines Kindes zwingend eingeleitet werden, wenn die Mutter während der Schwangerschaft jodhaltiges Kontrastmittel erhalten hat?',
      options: [
        { id: 'A', text: 'Kontrolle des TSH-Wertes beim Neugeborenen' },
        { id: 'B', text: 'Generelles Stillverbot für mindestens 2 Wochen' },
        { id: 'C', text: 'Ganzkörper-MRT des Neugeborenen zur Verteilungskontrolle' },
        { id: 'D', text: 'Sofortige prophylaktische Gabe von L-Thyroxin beim Säugling' },
      ],
      correct: 'A',
      explanation: 'Jodhaltige KM sind plazentagängig. Ab der 10.–12. SSW kann die fetale Schilddrüse aktiv Jod aufnehmen, da der Wolff-Chaikoff-Effekt beim Fetus nicht kompensiert werden kann → mögliche transiente neonatale Hypothyreose. TSH-Kontrolle beim Neugeborenen ist daher obligat.',
    },
    {
      id: 'km-de-07',
      tags: ['km-spezial'],
      fach: 'technik',
      question: 'Welche Empfehlung gilt für das Stillen nach einer Gadolinium-Gabe bei der Mutter?',
      options: [
        { id: 'A', text: 'Stillen erst nach Gabe von Aktivkohle beim Kind erlaubt' },
        { id: 'B', text: 'Eine Stillpause ist medizinisch nicht notwendig' },
        { id: 'C', text: 'Abpumpen und Verwerfen der ersten Mahlzeit nach 12 Stunden' },
        { id: 'D', text: 'Zwingende Stillpause für 48 Stunden zur Sicherheit' },
      ],
      correct: 'B',
      explanation: 'Nach Gadolinium-Gabe werden weniger als 0,04 % der mütterlichen Dosis in die Muttermilch ausgeschieden, davon wird beim Säugling nur ein Bruchteil (<1 %) resorbiert. Aktuelle Leitlinien (ESUR, ACR) sehen keine medizinische Notwendigkeit für eine Stillpause.',
    },
    {
      id: 'km-de-08',
      tags: ['km-spezial'],
      fach: 'technik',
      question: 'Was ist die primäre Voraussetzung für die Anwendung von Kontrastmitteln in der Schwangerschaft?',
      options: [
        { id: 'A', text: 'Strenge Indikationsstellung und Fehlen gleichwertiger KM-freier Alternativen' },
        { id: 'B', text: 'Durchführung der Untersuchung ausschließlich unter Vollnarkose' },
        { id: 'C', text: 'Vorliegender negativer Hauttest der Mutter auf KM-Bestandteile' },
        { id: 'D', text: 'Schriftliche Zustimmung des betreuenden Gynäkologen' },
      ],
      correct: 'A',
      explanation: 'Das Grundprinzip: KM in der Schwangerschaft nur dann, wenn (1) die Untersuchung medizinisch unaufschiebbar ist UND (2) keine diagnostisch gleichwertige KM-freie Methode zur Verfügung steht. Beide Bedingungen müssen gleichzeitig erfüllt sein. Detaillierte Aufklärung und Dokumentation sind obligatorisch.',
    },
    {
      id: 'km-de-09',
      tags: ['km-nw'],
      fach: 'technik',
      question: 'Welche der folgenden Aussagen zur Metformin-Therapie und intravaskulärer KM-Gabe ist korrekt?',
      options: [
        { id: 'A', text: 'Metformin muss bei allen Patienten 48 h vor der Untersuchung abgesetzt werden' },
        { id: 'B', text: 'Bei eGFR > 30 ml/min/1,73 m² kann Metformin normal weitergeführt werden' },
        { id: 'C', text: 'Metformin erhöht direkt die Nephrotoxizität des Kontrastmittels' },
        { id: 'D', text: 'Bei Dialysepatienten ist Metformin unbedenklich weiterzuführen' },
      ],
      correct: 'B',
      explanation: 'Bei eGFR > 30 ml/min/1,73 m² ist kein Absetzen von Metformin erforderlich. Das Risiko der Laktatazidose entsteht nicht durch direkte Interaktion, sondern indirekt: KM → (selten) akute Nierenschädigung → Metformin-Akkumulation → Laktatazidose. Bei eGFR < 30 oder akutem Nierenversagen: 48 h pausieren.',
    },
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
    }
  ],

  en: [
    {
      id: 'km-en-01', tags: ['km-typen'], fach: 'technik',
      question: 'Which statement about non-ionic contrast media (e.g. Ultravist®) is correct?',
      options: [
        { id: 'A', text: 'Higher osmolality than ionic contrast media' },
        { id: 'B', text: 'Approved only for enteral use' },
        { id: 'C', text: 'Lower osmolality and better tolerated' },
        { id: 'D', text: 'Carry a negative charge' },
      ],
      correct: 'C',
      explanation: 'Non-ionic contrast media carry no electrical charge and are more hydrophilic. Their lower osmolality results in significantly better tolerability and fewer adverse reactions, making them the standard for all intravascular applications.',
    },
    {
      id: 'km-en-02', tags: ['km-typen'], fach: 'technik',
      question: 'For which indication is a high injection rate of 5 ml/s recommended?',
      options: [
        { id: 'A', text: 'Pure portal venous abdominal phase' },
        { id: 'B', text: 'Exclusion of pulmonary embolism (CTPA)' },
        { id: 'C', text: 'Non-contrast head CT' },
        { id: 'D', text: 'Contrast injection via a central venous catheter' },
      ],
      correct: 'B',
      explanation: 'In CT pulmonary angiography (CTPA), 5 ml/s is essential to achieve sufficient contrast concentration in the pulmonary artery to detect even small filling defects. CVC injection must not exceed 2.5 ml/s.',
    },
    {
      id: 'km-en-03', tags: ['km-nw'], fach: 'technik',
      question: 'How does the ESUR define PC-AKI (Post-Contrast Acute Kidney Injury)?',
      options: [
        { id: 'A', text: 'Creatinine rise ≥ 0.3 mg/dl or ≥ 1.5-fold within 48–72 h after contrast' },
        { id: 'B', text: '10% GFR drop after 7 days' },
        { id: 'C', text: 'Anuria within 6 h after contrast injection' },
        { id: 'D', text: 'Doubling of urea within 24 h' },
      ],
      correct: 'A',
      explanation: 'ESUR definition: absolute creatinine rise ≥ 0.3 mg/dl OR relative rise to ≥ 1.5× baseline, within 48–72 h after intravascular contrast. The rename from CIN to PC-AKI reflects the lack of proven causality.',
    },
    {
      id: 'km-en-04', tags: ['km-nw'], fach: 'technik',
      question: 'Which statement about the "iodine allergy" is correct?',
      options: [
        { id: 'A', text: 'It is IgE-mediated against elemental iodine' },
        { id: 'B', text: 'It does not exist — iodine is not allergenic as a small molecule' },
        { id: 'C', text: 'It always requires epinephrine prophylaxis before contrast' },
        { id: 'D', text: 'It only occurs with macrocyclic gadolinium agents' },
      ],
      correct: 'B',
      explanation: '"Iodine allergy" is medically inaccurate. Iodine has no hapten properties and is not allergenic. Reactions target other components of the contrast molecule. Routine epinephrine prophylaxis is not indicated.',
    },
    {
      id: 'km-en-05', tags: ['km-mrt'], fach: 'technik',
      question: 'Which gadolinium agent is the only hepatocyte-specific contrast medium given at a reduced dose?',
      options: [
        { id: 'A', text: 'Gadovist® (gadobutrol)' },
        { id: 'B', text: 'Dotarem® (gadoterate)' },
        { id: 'C', text: 'Primovist® (gadoxetate)' },
        { id: 'D', text: 'Gastrografin® (diatrizoate)' },
      ],
      correct: 'C',
      explanation: 'Primovist® is the only MRI agent with genuine hepatocyte-specific uptake (~50%), taken up via OATP1B1/3 and excreted biliary. Dose: 0.025 mmol/kg — one quarter of the standard gadolinium dose.',
    },
    {
      id: 'km-en-06', tags: ['km-spezial'], fach: 'technik',
      question: 'What must be done after birth when the mother received iodinated contrast during pregnancy?',
      options: [
        { id: 'A', text: "Check the newborn's TSH level" },
        { id: 'B', text: 'Breastfeeding ban for at least 2 weeks' },
        { id: 'C', text: 'Whole-body MRI of the newborn' },
        { id: 'D', text: 'Immediate prophylactic L-thyroxine to the infant' },
      ],
      correct: 'A',
      explanation: 'Iodinated contrast crosses the placenta. The fetal thyroid can take up iodine from week 10–12, without the Wolff-Chaikoff escape mechanism. This may cause transient neonatal hypothyroidism. TSH monitoring is mandatory.',
    },
    {
      id: 'km-en-07', tags: ['km-spezial'], fach: 'technik',
      question: 'What applies to breastfeeding after gadolinium administration to the mother?',
      options: [
        { id: 'A', text: 'Only permitted after activated charcoal for the infant' },
        { id: 'B', text: 'A breastfeeding pause is medically not necessary' },
        { id: 'C', text: 'Pump and discard the first feed after 12 hours' },
        { id: 'D', text: 'Mandatory 48-hour breastfeeding pause' },
      ],
      correct: 'B',
      explanation: 'Less than 0.04% of maternal gadolinium reaches breast milk; of that, <1% is absorbed by the infant. Current guidelines (ESUR, ACR) find no medical necessity for a breastfeeding pause.',
    },
    {
      id: 'km-en-08', tags: ['km-spezial'], fach: 'technik',
      question: 'What is the primary prerequisite for contrast media use during pregnancy?',
      options: [
        { id: 'A', text: 'Strict indication AND no equivalent contrast-free alternative' },
        { id: 'B', text: 'Examination must be performed under general anesthesia only' },
        { id: 'C', text: 'Negative skin test to contrast components' },
        { id: 'D', text: "Written consent of the obstetrician" },
      ],
      correct: 'A',
      explanation: 'Contrast in pregnancy only when: (1) medically urgent AND cannot be deferred, AND (2) no equivalent contrast-free method is available. Both conditions must be met simultaneously. Full informed consent and documentation are mandatory.',
    },
    {
      id: 'km-en-09', tags: ['km-nw'], fach: 'technik',
      question: 'Which statement about metformin and intravascular contrast is correct?',
      options: [
        { id: 'A', text: 'Metformin must be stopped 48 h before in all patients' },
        { id: 'B', text: 'With eGFR > 30 ml/min/1.73 m², metformin can be continued' },
        { id: 'C', text: 'Metformin directly increases contrast nephrotoxicity' },
        { id: 'D', text: 'In dialysis patients, metformin can be continued safely' },
      ],
      correct: 'B',
      explanation: 'With eGFR > 30, stopping metformin is not required. The lactic acidosis risk is indirect: contrast → (rare) AKI → metformin accumulation → lactic acidosis. With eGFR < 30 or AKI: withhold for 48 h.',
    },
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
    }
  ],

  fa: [
    {
      id: 'km-fa-01', tags: ['km-typen'], fach: 'technik',
      question: 'کدام گزینه درباره ماده حاجب غیر یونی (مثلاً Ultravist®) صحیح است؟',
      options: [
        { id: 'A', text: 'اسمولاریته بالاتر نسبت به ماده حاجب یونی' },
        { id: 'B', text: 'فقط برای مصرف روده‌ای مجاز است' },
        { id: 'C', text: 'اسمولاریته پایین‌تر و تحمل‌پذیری بهتر' },
        { id: 'D', text: 'دارای بار منفی است' },
      ],
      correct: 'C',
      explanation: 'مواد حاجب غیر یونی هیچ بار الکتریکی ندارند. اسمولاریته پایین‌تر آن‌ها منجر به تحمل‌پذیری بسیار بهتر و عوارض جانبی کمتر می‌شود و استاندارد برای تمام کاربردهای داخل عروقی هستند.',
    },
    {
      id: 'km-fa-02', tags: ['km-typen'], fach: 'technik',
      question: 'برای کدام اندیکاسیون سرعت تزریق بالای ۵ میلی‌لیتر در ثانیه توصیه می‌شود؟',
      options: [
        { id: 'A', text: 'فاز وریدی پورتال شکم' },
        { id: 'B', text: 'رد آمبولی ریوی (CTPA)' },
        { id: 'C', text: 'سی‌تی اسکن سر بدون ماده حاجب' },
        { id: 'D', text: 'تزریق از طریق کاتتر وریدی مرکزی' },
      ],
      correct: 'B',
      explanation: 'در CT آنژیوگرافی ریوی، سرعت ۵ میلی‌لیتر در ثانیه برای دستیابی به غلظت کافی در شریان ریوی ضروری است. تزریق از طریق CVC نباید از ۲.۵ میلی‌لیتر در ثانیه تجاوز کند.',
    },
    {
      id: 'km-fa-03', tags: ['km-nw'], fach: 'technik',
      question: 'ESUR آسیب حاد کلیه پس از ماده حاجب (PC-AKI) را چگونه تعریف می‌کند؟',
      options: [
        { id: 'A', text: 'افزایش کراتینین ≥۰.۳ میلی‌گرم/دسی‌لیتر یا ≥۱.۵ برابر در طی ۴۸–۷۲ ساعت' },
        { id: 'B', text: 'کاهش ۱۰٪ GFR بعد از ۷ روز' },
        { id: 'C', text: 'آنوری در طی ۶ ساعت پس از تزریق' },
        { id: 'D', text: 'دو برابر شدن اوره خون در ۲۴ ساعت' },
      ],
      correct: 'A',
      explanation: 'تعریف ESUR: افزایش مطلق کراتینین ≥۰.۳ میلی‌گرم/دسی‌لیتر یا نسبی به ≥۱.۵ برابر مقدار پایه در طی ۴۸–۷۲ ساعت پس از تزریق داخل عروقی. تغییر نام از CIN به PC-AKI نشان‌دهنده فقدان رابطه علّی اثبات‌شده است.',
    },
    {
      id: 'km-fa-04', tags: ['km-nw'], fach: 'technik',
      question: 'کدام گزینه درباره «آلرژی به ید» صحیح است؟',
      options: [
        { id: 'A', text: 'واکنش IgE-واسطه در برابر ید عنصری است' },
        { id: 'B', text: 'وجود ندارد – ید به عنوان مولکول کوچک آلرژن نیست' },
        { id: 'C', text: 'همیشه نیاز به پروفیلاکسی با آدرنالین دارد' },
        { id: 'D', text: 'فقط با مواد حاجب گادولینیوم ماکروسیکلیک رخ می‌دهد' },
      ],
      correct: 'B',
      explanation: '«آلرژی به ید» اصطلاح پزشکی صحیحی نیست. ید یک مولکول کوچک معدنی بدون خواص هاپتنی است. واکنش‌های آلرژیک علیه سایر اجزای مولکول ماده حاجب هستند. پروفیلاکسی روتین با آدرنالین اندیکاسیون ندارد.',
    },
    {
      id: 'km-fa-05', tags: ['km-mrt'], fach: 'technik',
      question: 'کدام ماده حاجب گادولینیوم تنها ماده اختصاصی هپاتوسیت‌ها است و با دوز کمتری داده می‌شود؟',
      options: [
        { id: 'A', text: 'Gadovist® (گادوبوترول)' },
        { id: 'B', text: 'Dotarem® (گادوتِرات)' },
        { id: 'C', text: 'Primovist® (گادوکستات)' },
        { id: 'D', text: 'Gastrografin® (دیاتریزوات)' },
      ],
      correct: 'C',
      explanation: 'Primovist® تنها ماده حاجب MRI با جذب واقعی هپاتوسیت‌های عملکردی (~۵۰٪) است. از طریق ترانسپورترهای OATP1B1/3 جذب و بیلیاری دفع می‌شود. دوز: فقط ۰.۰۲۵ میلی‌مول/کیلوگرم – یک چهارم دوز استاندارد.',
    },
    {
      id: 'km-fa-06', tags: ['km-spezial'], fach: 'technik',
      question: 'پس از تولد نوزادی که مادرش در بارداری ماده حاجب حاوی ید دریافت کرده، چه اقدامی ضروری است؟',
      options: [
        { id: 'A', text: 'بررسی سطح TSH نوزاد' },
        { id: 'B', text: 'ممنوعیت کلی شیردهی حداقل ۲ هفته' },
        { id: 'C', text: 'MRI کل بدن نوزاد' },
        { id: 'D', text: 'تجویز فوری L-تیروکسین پروفیلاکتیک' },
      ],
      correct: 'A',
      explanation: 'مواد حاجب حاوی ید از جفت عبور می‌کنند. از هفته ۱۰–۱۲ تیروئید جنین ید را جذب می‌کند بدون مکانیسم escape → کم‌کاری گذرا تیروئید نوزادی ممکن است. بررسی TSH نوزاد اجباری است.',
    },
    {
      id: 'km-fa-07', tags: ['km-spezial'], fach: 'technik',
      question: 'توصیه در مورد شیردهی پس از تزریق گادولینیوم به مادر چیست؟',
      options: [
        { id: 'A', text: 'فقط پس از دادن زغال فعال به نوزاد مجاز است' },
        { id: 'B', text: 'از نظر پزشکی نیازی به قطع شیردهی نیست' },
        { id: 'C', text: 'پمپ کردن و دور ریختن اولین شیردهی بعد از ۱۲ ساعت' },
        { id: 'D', text: 'توقف اجباری شیردهی به مدت ۴۸ ساعت' },
      ],
      correct: 'B',
      explanation: 'کمتر از ۰.۰۴٪ دوز مادری در شیر دفع می‌شود. از این مقدار کمتر از ۱٪ توسط نوزاد جذب می‌شود. دستورالعمل‌های کنونی (ESUR، ACR) هیچ ضرورت پزشکی برای قطع شیردهی نمی‌بینند.',
    },
    {
      id: 'km-fa-08', tags: ['km-spezial'], fach: 'technik',
      question: 'پیش‌نیاز اصلی برای استفاده از ماده حاجب در دوران بارداری چیست؟',
      options: [
        { id: 'A', text: 'اندیکاسیون قوی و نبود روش‌های تشخیصی معادل بدون ماده حاجب' },
        { id: 'B', text: 'انجام بررسی فقط تحت بیهوشی عمومی' },
        { id: 'C', text: 'تست پوستی منفی مادر' },
        { id: 'D', text: 'رضایت کتبی متخصص زنان' },
      ],
      correct: 'A',
      explanation: 'اصل بنیادی: ماده حاجب در بارداری فقط زمانی که (۱) بررسی فوری و غیرقابل تعویق AND (۲) هیچ روش معادل بدون ماده حاجب وجود نداشته باشد. هر دو شرط باید همزمان برقرار باشند.',
    },
    {
      id: 'km-fa-09', tags: ['km-nw'], fach: 'technik',
      question: 'کدام گزینه درباره درمان با متفورمین و تزریق داخل عروقی ماده حاجب صحیح است؟',
      options: [
        { id: 'A', text: 'متفورمین در همه بیماران ۴۸ ساعت قبل باید قطع شود' },
        { id: 'B', text: 'با eGFR > ۳۰ میلی‌لیتر/دقیقه/۱.۷۳ مترمربع متفورمین ادامه می‌یابد' },
        { id: 'C', text: 'متفورمین مستقیماً سمیت کلیوی ماده حاجب را افزایش می‌دهد' },
        { id: 'D', text: 'در بیماران دیالیزی متفورمین بدون خطر ادامه می‌یابد' },
      ],
      correct: 'B',
      explanation: 'با eGFR > ۳۰ قطع متفورمین لازم نیست. خطر اسیدوز لاکتیک غیرمستقیم است: ماده حاجب → (به ندرت) AKI → تجمع متفورمین → اسیدوز. با eGFR < ۳۰ یا نارسایی حاد: ۴۸ ساعت قطع شود.',
    },
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
    }
  ],
}

// ── Helper: get questions for selected themen + lang ───────────────────────
export function getQuestions(themenIds, lang, n) {
  const all = QUESTION_BANK[lang] || QUESTION_BANK.de
  // Filter: question must match at least one selected thema tag
  const tagSet = new Set(themenIds)
  const filtered = all.filter(q => q.tags.some(t => tagSet.has(t)))
  // Shuffle (Fisher-Yates)
  const shuffled = [...filtered]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  // Limit to n
  return shuffled.slice(0, n)
}
