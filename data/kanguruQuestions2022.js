// Aufgaben und unveränderte Bildausschnitte: beigefügtes Original, Klassen 5/6.
// Schlüssel: offizielles Lösungs-PDF, Jahr 2022, Klassenstufen 5 und 6.
// Ausführliche Lösungswege wurden für das Training selbst erarbeitet.
const choices = texts => texts.map((text, index) => ({ id: 'ABCDE'[index], text }))
const image = slug => `/kanguru/questions/2022-56/clean/${slug}-prompt.png`
const visualChoices = slug => choices(['Abbildung A', 'Abbildung B', 'Abbildung C', 'Abbildung D', 'Abbildung E']).map(option => ({
  ...option, image: `/kanguru/questions/2022-56/clean/${slug}-${option.id.toLowerCase()}.png`,
}))
const question = (part, number, page, content) => ({
  id: `2022-56-${part.toLowerCase()}${number}`, gradeGroup: '5-6', year: 2022,
  part, number, points: { A: 3, B: 4, C: 5 }[part],
  sourceHref: `/kanguru/sources/kaenguru2022_56.pdf#page=${page}`, ...content,
})

export const KANGURU_QUESTIONS_2022 = [
  question('A', 1, 1, {
    topic: 'Gerade und ungerade Zahlen', image: image('a1'), imageAlt: 'Sechs Punkte mit den Zahlen 1 und 5 oben, 2 und 4 mittig, 6 und 3 unten.',
    question: 'Kim verbindet im Bild alle Punkte, an denen ungerade Zahlen stehen. Franzi verbindet alle Punkte, an denen gerade Zahlen stehen. So entstehen zwei Dreiecke. Welches Bild zeigt diese zwei Dreiecke?',
    options: visualChoices('a1'), correct: 'E',
    solutionSteps: [
      'Ungerade sind 1, 3 und 5. Das erste Dreieck verbindet oben links, unten rechts und oben rechts.',
      'Gerade sind 2, 4 und 6. Das zweite Dreieck verbindet die beiden mittleren Punkte mit dem Punkt unten links.',
      'Nur in Bild E sind genau diese beiden Punktgruppen jeweils zu einem Dreieck verbunden. Die Farbe der Linien spielt dabei keine Rolle.',
    ],
  }),
  question('A', 2, 1, {
    topic: 'Orientierung und Drehsinn', image: image('a2'), imageAlt: 'Bootsroute mit Richtungspfeilen um die fünf nummerierten Bojen.',
    question: 'Eileen hat mit dem Ruderboot fünf Bojen umrundet. Welche Bojen umrundete sie gegen den Uhrzeigersinn?',
    options: choices(['1 und 4', '2, 3 und 5', '2 und 3', '1, 4 und 5', '1 und 3']), correct: 'E',
    solutionSteps: [
      'Folge der Linie in Pfeilrichtung. An Kreuzungen bleibst du auf derselben Linie und biegst nicht ab.',
      'Die Schleifen um die Bojen 1 und 3 werden gegen den Uhrzeigersinn durchlaufen.',
      'Um 2, 4 und 5 geht es im Uhrzeigersinn. Daher ist E richtig: 1 und 3.',
    ],
  }),
  question('A', 3, 1, {
    topic: 'Rechnen und Vergleichen', question: 'Bei welcher der fünf Rechnungen ist das Ergebnis am größten?',
    options: choices(['20 + 22', '202 + 2', '202 : 2', '20 · 22', '202 · 2']), correct: 'D',
    solutionSteps: ['Die Additionen ergeben 20 + 22 = 42 und 202 + 2 = 204.', 'Die übrigen Ergebnisse sind 202 : 2 = 101, 20 · 22 = 440 und 202 · 2 = 404.', '440 ist größer als 404, 204, 101 und 42. Also ist D richtig.'],
  }),
  question('A', 4, 1, {
    topic: 'Optimieren mit Stückzahlen',
    question: 'Georgs Urgroßvater wird 95. Für die Geburtstagsfeier soll Georg genau 95 Luftballons kaufen. Die gibt es in Päckchen zu 5, zu 10 und zu 25 Stück. Wie viele Päckchen muss Georg mindestens nehmen?',
    options: choices(['3', '5', '7', '8', '10']), correct: 'B',
    solutionSteps: [
      'Mit höchstens drei Päckchen bekommt man höchstens 3 · 25 = 75 Ballons. Das reicht nicht.',
      'Vier 25er-Päckchen ergeben 100. Sobald eines der vier Päckchen kleiner ist, sind es höchstens 25 + 25 + 25 + 10 = 85. Genau 95 sind mit vier Päckchen also unmöglich.',
      'Mit fünf Päckchen geht es: 25 + 25 + 25 + 10 + 10 = 95. Das Minimum sind 5 Päckchen, Antwort B.',
    ],
  }),
  question('A', 5, 1, {
    topic: 'Planen und Verschieben', image: image('a5'), imageAlt: 'Parkplatz im Kästchenraster mit schwarzem Auto, grauen Fahrzeugen und Ausfahrt rechts.',
    question: 'Die Fahrzeuge auf dem Parkplatz dürfen nur geradeaus fahren. Wie viele der grauen Fahrzeuge müssen fahren, damit das schwarze Auto danach den Parkplatz verlassen kann?',
    options: choices(['2', '3', '4', '5', '6']), correct: 'C',
    solutionSteps: [
      'Vor dem schwarzen Auto steht der senkrechte graue Bus. Er muss nach unten fahren; nach oben reicht der Platz nicht.',
      'Dafür muss zunächst der lange waagerechte Bus ganz unten nach links. Ihm stehen links das kleine Auto und darüber der senkrechte Bus im Weg.',
      'Eine mögliche Reihenfolge: den senkrechten Bus ganz links ein Kästchen nach oben, dann das kleine Auto links unten ein Kästchen nach oben, den unteren waagerechten Bus zwei Kästchen nach links und den Bus vor dem schwarzen Auto zwei Kästchen nach unten.',
      'Diese vier verschiedenen grauen Fahrzeuge müssen bewegt werden. Danach ist der Weg zur Ausfahrt frei. Antwort C: 4.',
    ],
  }),
  question('A', 6, 2, {
    topic: 'Ziffernfolgen und Optimieren',
    question: 'Auf dem Tisch liegen sieben Karten: 4, 69, 113, 8, 51, 5 und 67. Bruno legt damit die kleinstmögliche 12-stellige Zahl. Er verwendet jede Karte genau einmal und verändert die Ziffernfolge auf den Karten nicht. Welches sind die letzten drei Ziffern dieser Zahl?',
    options: choices(['698', '113', '551', '869', '458']), correct: 'A',
    solutionSteps: [
      'Vergleiche zwei Karten, indem du beide möglichen Reihenfolgen zusammensetzt. Zum Beispiel kommt 51 vor 5, weil 515 kleiner als 551 ist; 69 kommt vor 8, weil 698 kleiner als 869 ist.',
      'Die günstigste Reihenfolge ist 113, 4, 51, 5, 67, 69, 8. Für jedes Kartenpaar ist damit die kleinere Zusammensetzung gewählt.',
      'So entsteht die Zahl 113451567698. Ihre letzten drei Ziffern sind 698, Antwort A.',
    ],
  }),
  question('A', 7, 2, {
    topic: 'Würfel und Verbindungen', image: image('a7'), imageAlt: 'Die Ziffern 2022, aus insgesamt 66 gleich großen Würfeln geklebt.',
    question: 'Aus 66 Würfeln baut Masoud die Zahl 2022. Dazu bestreicht er stets beide Flächen, die er zusammenklebt, mit Klebstoff. Einige Würfel haben zwei mit Klebstoff bestrichene Seiten, einige nur eine. Bei wie vielen Würfeln sind es zwei Seitenflächen?',
    options: choices(['16', '30', '46', '54', '60']), correct: 'E',
    solutionSteps: [
      'Jede der drei Ziffern 2 ist eine offene Würfelkette mit zwei Enden. Nur ihre beiden Endwürfel haben jeweils eine Klebefläche.',
      'Die 0 ist eine geschlossene Kette: Dort hat jeder Würfel zwei Nachbarn und somit zwei Klebeflächen.',
      'Insgesamt haben 3 · 2 = 6 Würfel nur eine Klebefläche. Die übrigen 66 − 6 = 60 Würfel haben zwei. Antwort E.',
    ],
  }),
  question('A', 8, 2, {
    topic: 'Muster und zusammenhängende Wege', image: image('a8'), imageAlt: 'Raupe mit sechs abwechselnd weißen und dunklen Kreisen: weiß, dunkel, weiß, dunkel, weiß, dunkel.',
    question: 'Eine Raupe hat sich zum Schlafen zusammengefaltet. Wie könnte das aussehen? Die sechs Körperteile bleiben in derselben Reihenfolge miteinander verbunden.',
    options: visualChoices('a8'), correct: 'B',
    solutionSteps: [
      'Entlang der Raupe wechseln sich Weiß und Dunkel immer ab. Beim Falten bleibt diese Reihenfolge erhalten; benachbarte Körperteile müssen sich weiterhin berühren.',
      'In B gibt es einen passenden Weg durch alle sechs Kreise: unten Mitte (weiß), unten links (dunkel), oben links (weiß), oben Mitte (dunkel), unten rechts (weiß), oben rechts (dunkel).',
      'Bei A und E lassen sich nicht alle drei dunklen Kreise mit weißen Kreisen zu einer Kette verbinden. Bei C und D ist ebenfalls kein abwechselnder Weg durch alle sechs Kreise möglich. Daher passt nur B.',
    ],
  }),
  question('B', 1, 2, {
    topic: 'Zahlenlogik', image: image('b1'), imageAlt: 'Vier mal vier Kreise, vier durch Linien verbundene Vierergruppen und die Vorgaben 3, 2, 2, 1 im mittleren Quadrat; Fragezeichen oben rechts.',
    question: 'Lennart möchte die Figur fertigstellen. In jeder Vierergruppe aus miteinander verbundenen Kreisen und ebenso in jeder Spalte und in jeder Zeile sollen die Zahlen 1, 2, 3 und 4 jede genau einmal stehen. Welche Zahl gehört in den Kreis mit dem Fragezeichen?',
    options: choices(['1', '2', '3', '4', 'Das ist nicht möglich.']), correct: 'B',
    solutionSteps: [
      'In der verbundenen Gruppe links oben fehlen neben 3 und 2 die Zahlen 1 und 4. Sie stehen in den beiden linken Kreisen der ersten Zeile. Auch die beiden äußeren Kreise der zweiten Zeile sind 1 und 4.',
      'Damit stehen in der ersten Spalte oben 1 und 4. Unter ihnen muss 3 stehen, weil in der dritten Zeile schon eine 2 steht. Ganz unten links steht dann 2.',
      'In der dritten Zeile fehlt rechts die 4. In der rechten verbundenen Gruppe kann rechts in der zweiten Zeile deshalb keine weitere 4 stehen: Dort steht 1. Links in der zweiten Zeile steht folglich 4, oben links 1 und daneben 4.',
      'Oben in der dritten Spalte bleibt 3. Rechts daneben, beim Fragezeichen, steht 2. Die vollständigen Zeilen sind 1–4–3–2, 4–3–2–1, 3–2–1–4 und 2–1–4–3.',
    ],
  }),
  question('B', 2, 2, {
    topic: 'Spiegeln und Falten', image: image('b2'), imageAlt: 'Transparentes Papier mit zwei schraffierten Figuren und Faltpfeilen an der senkrechten und waagerechten Mittellinie.',
    question: 'Auf transparentem Papier sind zwei Figuren gezeichnet. Es wird wie im Bild zweimal gefaltet. Wie sieht das gefaltete Papier nun aus?',
    options: visualChoices('b2'), correct: 'B',
    solutionSteps: [
      'Beim Falten von links nach rechts wird die linke untere Figur an der senkrechten Mittellinie gespiegelt. Ihre Schraffur liegt danach im linken unteren Teil des verbleibenden Quadrats.',
      'Beim Falten von oben nach unten wird die rechte obere Figur an der waagerechten Mittellinie gespiegelt. Ihre Schraffur liegt im rechten unteren Teil.',
      'Die beiden schraffierten Dreiecke liegen nebeneinander, ohne einander zu überdecken. Daher gibt es keine Kreuzschraffur. Die Begrenzungslinien und Schraffurrichtungen stimmen nur in B vollständig überein.',
    ],
  }),
  question('B', 3, 2, {
    topic: 'Gerade und ungerade Anzahlen',
    question: 'Juri zerbricht einen langen dünnen Stock in 3 Teile. Dann zerbricht er immer wieder das jeweils längste Stöckchen in 3 Teile. Welche Anzahl von Stöckchen kann er so nicht erhalten?',
    options: choices(['13', '17', '20', '23', '25']), correct: 'C',
    solutionSteps: ['Ein Stöckchen wird jeweils durch drei ersetzt. Die Anzahl steigt also bei jedem Schritt um 3 − 1 = 2.', 'Ausgehend von einem Stock erhält man 3, 5, 7, 9 und so weiter. Jede ungerade Anzahl ab 3 ist erreichbar.', '20 ist gerade und daher unmöglich. 13, 17, 23 und 25 sind dagegen erreichbar. Antwort C.'],
  }),
  question('B', 4, 2, {
    topic: 'Rechenketten', image: image('b4'), imageAlt: 'Regel: rechts mal 2, links geteilt durch 2, nach unten mal 4, nach oben geteilt durch 4. Pfeilkette von 12 bis zum Fragezeichen.',
    question: 'Clara hat eine Rechenanweisung gefunden. Die Pfeile geben an, wie zu rechnen ist: nach rechts · 2, nach links : 2, nach unten · 4 und nach oben : 4. Sie beginnt mit der 12. Welche Zahl erhält sie als Ergebnis?',
    options: choices(['3', '6', '16', '24', '48']), correct: 'B',
    solutionSteps: [
      'Folge den Pfeilen ab der 12: unten, rechts, unten, links, unten, links, oben, links, oben, rechts, oben.',
      'Schrittweise entstehen 12 → 48 → 96 → 384 → 192 → 768 → 384 → 96 → 48 → 12 → 24 → 6.',
      'Zur Kontrolle: Drei Abwärts- und drei Aufwärtspfeile heben sich auf. Zwei Rechtspfeile und drei Linkspfeile ergeben insgesamt einmal : 2. Also 12 : 2 = 6, Antwort B.',
    ],
  }),
  question('B', 5, 3, {
    topic: 'Produkte und Zahlenrätsel', image: image('b5'), imageAlt: 'Dreieck aus sechs Kreisen mit den Teilprodukten 8 oben, 10 mittig, 15 links unten und 60 rechts unten. Die drei äußeren Ecken sind grau.',
    question: 'In die sechs Kreise sollen die Zahlen 1, 2, 3, 4, 5 und 6 jeweils einmal eingetragen werden. Dabei soll in jedem der vier kleinen Dreiecke die Zahl in der Mitte gleich dem Produkt der Zahlen in den drei Eckpunkten sein. Was ist dann die Summe der Zahlen in den drei grauen Kreisen?',
    options: choices(['8', '11', '12', '13', '16']), correct: 'D',
    solutionSteps: [
      'Das obere Produkt 8 kann mit drei verschiedenen Zahlen aus 1 bis 6 nur als 1 · 2 · 4 entstehen. Das mittlere Produkt 10 muss 1 · 2 · 5 sein.',
      'Die beiden gemeinsamen Kreise enthalten daher 1 und 2. Ganz oben steht 4 und unten in der Mitte 5.',
      'Beim Produkt 15 links unten ist der gemeinsame Kreis 1 und die linke graue Ecke 3: 3 · 1 · 5 = 15. Rechts steht im mittleren Kreis 2 und in der grauen Ecke 6: 5 · 2 · 6 = 60.',
      'Die grauen Ecken enthalten 4, 3 und 6. Ihre Summe ist 4 + 3 + 6 = 13, Antwort D.',
    ],
  }),
  question('B', 6, 3, {
    topic: 'Jahreszahlen und Ziffern',
    question: 'Die Jahreszahl 2022 hat die besondere Eigenschaft, dass eine Ziffer darin 3-mal auftaucht. Unsere 50-jährige Schildkröte Rosi hat schon mehrmals Jahre erlebt, in denen eine Ziffer 3-mal vorkommt. Wie oft hat sie das vor 2022 erlebt?',
    options: choices(['2-mal', '3-mal', '4-mal', '5-mal', '6-mal']), correct: 'A',
    solutionSteps: [
      'Rosis Lebenszeit beginnt ungefähr 1972. Gesucht sind passende Jahreszahlen bis einschließlich 2021; 2022 selbst zählt ausdrücklich nicht.',
      'In diesem Zeitraum besitzen nur 1999 (drei Neunen) und 2000 (drei Nullen) eine dreimal vorkommende Ziffer.',
      'Zum Beispiel hat 2002 nur zweimal die 0 und zweimal die 2; 2011 und 2020 besitzen ebenfalls keine dreifache Ziffer. Es bleiben genau 2 Jahre, Antwort A.',
    ],
  }),
  question('B', 7, 3, {
    topic: 'Stapel und konstante Zuwächse', image: image('b7'), imageAlt: 'Zwei ineinandergestapelte Schüsseln sind 11 cm hoch; sieben Schüsseln sind 26 cm hoch.',
    question: 'Einige Schüsseln sind hoch aufgestapelt. Der Stapel aus 2 Schüsseln ist 11 cm hoch und der Stapel aus 7 Schüsseln ist 26 cm hoch. Wie hoch ist ein Stapel aus 5 solchen Schüsseln?',
    options: choices(['17 cm', '19 cm', '20 cm', '21 cm', '22 cm']), correct: 'C',
    solutionSteps: ['Fünf zusätzliche Schüsseln erhöhen den Stapel um 26 − 11 = 15 cm.', 'Jede weitere Schüssel erhöht ihn daher um 15 : 5 = 3 cm. Eine Schüssel allein ist 11 − 3 = 8 cm hoch.', 'Von zwei auf fünf Schüsseln kommen drei hinzu: 11 + 3 · 3 = 20 cm. Antwort C.'],
  }),
  question('B', 8, 3, {
    topic: 'Ungleichungen mit ganzen Zahlen',
    question: 'Frau Wolf geht oft mit den vier Hunden ihrer Nachbarn spazieren. Das Gewicht jedes Hundes in kg ist eine positive ganze Zahl. Kein Hund wiegt dasselbe wie ein anderer. Alle vier zusammen wiegen 30 kg. Ajax ist der zweitschwerste und wiegt 13 kg. Wie viel wiegt Elvis, der drittschwerste?',
    options: choices(['2 kg', '3 kg', '5 kg', '7 kg', '8 kg']), correct: 'A',
    solutionSteps: [
      'Der schwerste Hund wiegt mindestens 14 kg, weil alle Gewichte verschieden sind und Ajax 13 kg wiegt.',
      'Für die beiden leichteren Hunde bleiben höchstens 30 − 14 − 13 = 3 kg. Zwei verschiedene positive ganze Gewichte haben zusammen mindestens 1 + 2 = 3 kg.',
      'Also müssen die Gewichte 14, 13, 2 und 1 kg sein. Elvis ist der drittschwerste und wiegt 2 kg, Antwort A.',
    ],
  }),
  question('C', 1, 3, {
    topic: 'Logik und Ausschließen', image: image('c1'), imageAlt: 'Vier Tipps zum Zahlenschloss: 206, 614, 682 und 738, mit den im Text wiederholten Bedingungen.',
    question: 'Janosch bekommt vier Tipps für einen dreistelligen Code. 206: Genau zwei Ziffern sind korrekt, aber beide am falschen Platz. 614: Genau eine Ziffer ist korrekt, aber am falschen Platz. 682: Genau eine Ziffer ist korrekt und am richtigen Platz. 738: Alle drei Ziffern sind falsch. Mit welchem Code kann Janosch das Schloss öffnen?',
    options: choices(['604', '082', '640', '042', '046']), correct: 'D',
    solutionSteps: [
      'Aus 738 folgt: 7, 3 und 8 kommen nicht vor. Bei 682 kann deshalb nur 6 an erster oder 2 an dritter Stelle richtig sein.',
      '6 kann nicht richtig sein: Sie stünde bei 614 ebenfalls an erster Stelle, obwohl die einzige richtige Ziffer dort ausdrücklich am falschen Platz stehen muss. Also kommt 6 nicht vor und die letzte Ziffer ist 2.',
      'Bei 206 sind damit 2 und 0 die beiden richtigen Ziffern, beide falsch platziert. 0 steht nicht in der Mitte; die letzte Stelle ist bereits 2. Also steht 0 ganz vorn.',
      'Bei 614 bleibt 1 oder 4. Die 1 könnte nur in die Mitte und wäre dann am richtigen Platz, was dem Tipp widerspricht. Also steht 4 in der Mitte. Der Code ist 042, Antwort D.',
    ],
  }),
  question('C', 2, 3, {
    topic: 'Flächeninhalt im Raster', image: image('c2'), imageAlt: 'Quadrat aus acht mal acht Einheitskästchen mit grauer vierzackiger Fläche.',
    question: 'Ein Quadrat ist aus 64 gleich großen quadratischen Kästchen zusammengesetzt. Ein Teil des Quadrats ist grau bemalt. Welchen Flächeninhalt hat die graue Fläche?',
    options: choices(['14 Kästchen', '16 Kästchen', '18 Kästchen', '20 Kästchen', '22 Kästchen']), correct: 'B',
    solutionSteps: [
      'Ziehe gedanklich die senkrechte und waagerechte Mittellinie durch das 8 × 8-Quadrat.',
      'In jedem der vier Viertel liegt genau ein graues rechtwinkliges Dreieck. Es hat eine Grundseite von 4 Kästchenlängen und eine Höhe von 2 Kästchenlängen.',
      'Jedes Dreieck hat den Flächeninhalt 4 · 2 : 2 = 4 Kästchen. Zusammen sind es 4 · 4 = 16 Kästchen, Antwort B.',
    ],
  }),
  question('C', 3, 4, {
    topic: 'Räumliches Vorstellen und Ansichten', image: image('c3'), imageAlt: 'Körperansichten von oben, von vorn und von rechts im Einheitsraster.',
    question: 'Die drei Abbildungen zeigen einen aus gleich großen Würfeln gebauten Körper von oben, von vorn und von rechts. Aus wie vielen Würfeln kann dieser Körper höchstens bestehen?',
    options: choices(['18', '19', '20', '21', '22']), correct: 'B',
    solutionSteps: [
      'Die Draufsicht gibt die neun belegten Grundplätze vor. Die Vorderansicht begrenzt die Höhen der vier Spalten von links nach rechts auf 1, 3, 3 und 1.',
      'Aus der rechten Ansicht liest man für die Tiefenreihen von vorn nach hinten die Höchstwerte 1, 2, 3 und 3 ab. Auf jedem Grundplatz darf der Turm höchstens so hoch wie der kleinere seiner beiden Grenzwerte sein.',
      'Von hinten nach vorn ergeben sich die Turmhöhen: hinten 3 + 3 = 6; nächste Reihe 3 + 3 + 1 = 7; nächste Reihe 1 + 2 + 2 = 5; ganz vorn 1.',
      'Alle diese Türme zusammen ergeben 6 + 7 + 5 + 1 = 19 Würfel. Sie erfüllen auch tatsächlich alle drei Ansichten, also ist dieses Maximum erreichbar. Antwort B.',
    ],
  }),
  question('C', 4, 4, {
    topic: 'Zahlenrätsel und systematisches Probieren', image: image('c4'), imageAlt: 'Vier Kästchen für die Rechnung Kästchen plus Kästchen minus Kästchen gleich graues Kästchen.',
    question: 'Hanna wählt vier verschiedene Zahlen aus 3, 4, 5, 6 und 7 und trägt sie in □ + □ − □ = □ ein. Wie viele der fünf Zahlen können als Ergebnis im letzten, grauen Kästchen stehen?',
    options: choices(['nur eine', 'nur zwei', 'nur drei', 'nur vier', 'alle fünf']), correct: 'E',
    solutionSteps: [
      'Wir suchen für jedes mögliche Ergebnis eine Rechnung mit vier verschiedenen Zahlen.',
      'Für 3, 4 und 5 geht das so: 4 + 5 − 6 = 3; 3 + 6 − 5 = 4; 3 + 6 − 4 = 5.',
      'Auch 6 und 7 sind möglich: 4 + 5 − 3 = 6 und 5 + 6 − 4 = 7.',
      'Jede der fünf Zahlen kann im grauen Kästchen stehen. Antwort E.',
    ],
  }),
  question('C', 5, 4, {
    topic: 'Volumen und Umfüllen', image: image('c5'), imageAlt: 'Flaches Gefäß: Grundfläche 40 mal 20 cm, Gesamthöhe 12 cm. Hohes Gefäß: Grundfläche 12 mal 20 cm, Gesamthöhe 40 cm.',
    question: 'Auf dem Tisch stehen zwei quaderförmige Gefäße. Im flachen Gefäß links steht 3 cm hoch Wasser. Seine Grundfläche misst 40 cm × 20 cm. Das Wasser wird in das hohe Gefäß mit der Grundfläche 12 cm × 20 cm umgefüllt. Wie hoch würde es dort stehen?',
    options: choices(['10 cm', '15 cm', '18 cm', '20 cm', '24 cm']), correct: 'A',
    solutionSteps: [
      'Das Wasservolumen links ist Grundfläche mal Wasserhöhe: 40 · 20 · 3 = 2400 cm³. Die gesamte Gefäßhöhe von 12 cm ist nicht die Wasserhöhe.',
      'Rechts ist die Grundfläche 12 · 20 = 240 cm². Beim Umfüllen bleibt das Wasservolumen gleich.',
      'Die neue Wasserhöhe ist 2400 : 240 = 10 cm. Das passt in das 40 cm hohe Gefäß. Antwort A.',
    ],
  }),
  question('C', 6, 4, {
    topic: 'Körpernetze und Orientierung', image: image('c6'), imageAlt: 'Quader aus zwei Einheitswürfeln: zwei waagerechte Striche vorn, zwei Striche in Tiefenrichtung oben und ein Pluszeichen auf der rechten Stirnfläche.',
    question: 'Aus welchem der Netze lässt sich der abgebildete Körper sicher nicht bauen? Die bedruckte Seite des Netzes liegt nach dem Falten außen.',
    options: visualChoices('c6'), correct: 'E',
    solutionSteps: [
      'Beachte neben den Strichen auch ihre Richtung und die Seite mit dem Plus. Vorn liegen zwei Striche entlang der langen Kante; oben liegen zwei Striche quer dazu, in Tiefenrichtung. Das Plus muss auf der rechten Stirnfläche liegen.',
      'Falte Netz E gedanklich mit den waagerechten Strichen nach vorn. Damit die oberen Striche in die richtige Richtung zeigen, muss die unterste Reihe des Netzes zur Oberseite werden.',
      'Dann landet das Plus ganz links im Netz auf der linken Stirnfläche. Das andere Plus liegt auf der Unterseite. Die rechte Stirnfläche entsteht aus dem leeren, rechts herausragenden Quadrat und besitzt kein Plus.',
      'Durch Drehen lässt sich das nicht beheben, ohne die gezeigte Anordnung der beiden Strichflächen zu verändern. A, B, C und D erlauben die gezeigte Anordnung; E nicht. Antwort E.',
    ],
  }),
  question('C', 7, 4, {
    topic: 'Abstände auf einer Geraden',
    question: 'Auf einer Geraden befinden sich A, B, C und D. Es gilt AB = 7 cm, BC = 5 cm, CD = 8 cm und DA = 6 cm. Welche der vier Punkte sind am weitesten voneinander entfernt?',
    options: choices(['A und B', 'A und C', 'B und D', 'C und D', 'A und D']), correct: 'C',
    solutionSteps: [
      'Setze A bei 0 cm und B bei 7 cm. Wegen BC = 5 cm liegt C entweder bei 2 cm oder bei 12 cm. Wegen DA = 6 cm liegt D bei −6 cm oder bei 6 cm.',
      'Nur C = 2 und D = −6 erfüllen CD = 8 cm. Die übrigen Kombinationen ergeben die Abstände 4, 6 oder 18 cm.',
      'Die Reihenfolge ist D, A, C, B. Die äußersten Punkte sind D und B mit 7 − (−6) = 13 cm Abstand. Antwort C.',
    ],
  }),
  question('C', 8, 4, {
    topic: 'Logik und größtmögliche Anzahl',
    question: 'Dreißig fantastische Geschöpfe, Ja-Schöpfe und Naja-Schöpfe, sitzen um einen runden Tisch. Die Ja-Schöpfe sprechen stets die Wahrheit. Die Naja-Schöpfe sprechen mal die Wahrheit, mal lügen sie. Jedes Geschöpf sagt: „Mindestens eines meiner beiden Nachbargeschöpfe ist ein Naja-Schöpf.“ Welches ist die größtmögliche Anzahl von Ja-Schöpfen am Tisch?',
    options: choices(['5', '10', '15', '20', '25']), correct: 'D',
    solutionSteps: [
      'Drei Ja-Schöpfe dürfen nicht direkt hintereinander sitzen: Der mittlere hätte zwei Ja-Nachbarn und seine Aussage wäre falsch.',
      'Teile die 30 Plätze in zehn aufeinanderfolgende Dreiergruppen. Jede Gruppe muss mindestens einen Naja-Schöpf enthalten. Also gibt es mindestens 10 Naja- und höchstens 20 Ja-Schöpfe.',
      '20 sind erreichbar: Wiederhole rund um den Tisch zehnmal die Reihenfolge Ja, Ja, Naja. Jeder Ja-Schöpf hat dann einen Naja-Nachbarn. Die Naja-Schöpfe dürfen bei ihrer Aussage lügen.',
      'Die größtmögliche Anzahl ist somit 20, Antwort D.',
    ],
  }),
]
