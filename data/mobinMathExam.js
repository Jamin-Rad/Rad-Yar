// Original practice questions based on the topics in Mobin's contents photo.
// Page references identify topics only; these are not copied textbook exercises.
export const MATH_CHAPTERS = [
  { id: 'rational', number: 'I', title: 'Rationale Zahlen' },
  { id: 'operations', number: 'II', title: 'Rationale Zahlen addieren und subtrahieren' },
]

export const MATH_TOPICS = [
  { id: 'shares', chapter: 'rational', title: 'Brüche und Anteile', page: 6 },
  { id: 'equivalent', chapter: 'rational', title: 'Kürzen und Erweitern', page: 10 },
  { id: 'numberline', chapter: 'rational', title: 'Brüche auf der Zahlengeraden', page: 13 },
  { id: 'quotients', chapter: 'rational', title: 'Brüche als Quotienten', page: 16 },
  { id: 'compare-fractions', chapter: 'rational', title: 'Größenvergleich von Brüchen', page: 19 },
  { id: 'decimal-notation', chapter: 'rational', title: 'Dezimalschreibweise', page: 22 },
  { id: 'compare-decimals', chapter: 'rational', title: 'Größenvergleich von Dezimalzahlen', page: 25 },
  { id: 'decimal-units', chapter: 'rational', title: 'Dezimalschreibweise bei Größen', page: 28 },
  { id: 'positive-fractions', chapter: 'operations', title: 'Positive Brüche addieren und subtrahieren', page: 36 },
  { id: 'signed-fractions', chapter: 'operations', title: 'Brüche mit Vorzeichen addieren und subtrahieren', page: 40 },
  { id: 'decimal-operations', chapter: 'operations', title: 'Dezimalzahlen addieren und subtrahieren', page: 43 },
  { id: 'calculation-rules', chapter: 'operations', title: 'Rechenregeln bei Summen und Differenzen', page: 47 },
  { id: 'rounding', chapter: 'operations', title: 'Runden und Überschlagen von Dezimalzahlen', page: 50 },
  { id: 'unit-operations', chapter: 'operations', title: 'Größen addieren und subtrahieren', page: 53 },
]

const choice = (id, topicId, difficulty, prompt, answer, options, hint, steps, extra = {}) => ({
  id, topicId, difficulty, prompt, type: 'choice', answer, hint, steps,
  options: options.map(([value, explanation], index) => ({ id: String.fromCharCode(65 + index), value, explanation })),
  ...extra,
})
const written = (id, topicId, difficulty, prompt, answer, hint, steps, extra = {}) => ({
  id, topicId, difficulty, prompt, type: 'written', answer, hint, steps, ...extra,
})

export const MATH_QUESTIONS = [
  choice('m6-01', 'shares', 'medium',
    'Von 120 Büchern sind 3/8 Sachbücher. Von diesen Sachbüchern handeln 2/5 von Tieren. Wie viele Tier-Sachbücher sind das?', '18', [
      ['48', '48 sind 2/5 aller 120 Bücher. Gesucht sind aber 2/5 der Sachbücher.'],
      ['18', 'Richtig: Erst sind 45 Sachbücher zu bestimmen; 2/5 davon sind 18.'],
      ['45', '45 ist die Zahl aller Sachbücher. Jetzt fehlen noch die 2/5, die von Tieren handeln.'],
      ['30', 'Teile zuerst 120 durch 8 und nimm 3 Anteile. Von diesem Ergebnis berechnest du anschließend 2/5.'],
    ], 'Bestimme zuerst die Zahl der Sachbücher. „Von diesen“ bezieht sich auf dieses Zwischenergebnis.', [
      'Ein Achtel aller Bücher sind 120 : 8 = 15 Bücher.',
      'Drei Achtel sind 3 · 15 = 45 Sachbücher.',
      'Ein Fünftel davon sind 45 : 5 = 9 Bücher. Zwei Fünftel sind 2 · 9 = 18 Bücher.',
    ], { unit: 'Bücher' }),
  written('m6-02', 'shares', 'hard',
    '5/12 einer Klasse kommen zu Fuß und 1/3 mit dem Bus. Die übrigen 9 Kinder kommen mit dem Fahrrad. Wie viele Kinder hat die Klasse insgesamt?', '36',
    'Welcher Anteil bleibt für die 9 Fahrradkinder übrig? Erweitere 1/3 auf Zwölftel.', [
      '1/3 = 4/12. Zu Fuß und mit dem Bus kommen zusammen 5/12 + 4/12 = 9/12 der Klasse.',
      'Für die Fahrräder bleiben 12/12 − 9/12 = 3/12 = 1/4 der Klasse.',
      'Wenn ein Viertel 9 Kinder sind, sind vier Viertel 4 · 9 = 36 Kinder.',
    ], { unit: 'Kinder', mistakes: [
      ['12', '9 Kinder sind nicht 9/12 der Klasse. Die 9 Fahrradkinder bilden den verbleibenden Anteil 3/12.'],
      ['27', 'Die 9 Fahrradkinder sind ein Viertel. Für die ganze Klasse brauchst du vier solcher Gruppen, nicht drei.'],
    ] }),
  choice('m6-03', 'equivalent', 'medium',
    'Welcher vollständig gekürzte Bruch ist gleich 252/378?', '2/3', [
      ['3/2', 'Hier wurden Zähler und Nenner vertauscht. 252/378 ist kleiner als 1; 3/2 ist größer als 1.'],
      ['4/7', 'Beim Kürzen müssen Zähler und Nenner durch dieselbe Zahl geteilt werden. Das ergibt hier nicht 4/7.'],
      ['2/3', 'Richtig: 252 : 126 = 2 und 378 : 126 = 3.'],
      ['2/7', 'Nur den Nenner stärker zu verkleinern verändert den Wert. Kürze beide Zahlen mit demselben Faktor.'],
    ], '252 und 378 sind beide durch 2, 3 und 7 teilbar. Kürzen darf auch in mehreren Schritten erfolgen.', [
      'Kürze zuerst durch 2: 252/378 = 126/189.',
      'Kürze durch 3: 126/189 = 42/63.',
      'Kürze durch 21: 42/63 = 2/3. 2 und 3 haben keinen gemeinsamen Teiler größer als 1.',
    ]),
  written('m6-04', 'equivalent', 'hard',
    'Ergänze den fehlenden Zähler: 42/70 = □/45. Welche Zahl gehört in das Kästchen?', '27',
    'Kürze zuerst 42/70 vollständig. Erweitere danach auf den Nenner 45.', [
      '42/70 lässt sich durch 14 kürzen: 42/70 = 3/5.',
      'Von 5 zu 45 wird mit 9 multipliziert. Deshalb muss auch der Zähler mit 9 multipliziert werden.',
      '3 · 9 = 27. Also gilt 42/70 = 27/45.',
    ], { mistakes: [['3', '3 ist der Zähler des gekürzten Bruchs 3/5. Für den Nenner 45 musst du noch mit 9 erweitern.']] }),
  written('m6-05', 'numberline', 'medium',
    'Die Strecke von 0 bis 2 ist in acht gleich große Abschnitte geteilt. Welche Zahl gehört zum Punkt P? Schreibe einen vollständig gekürzten Bruch.', '7/4',
    'Die Länge eines Abschnitts ist 2 : 8. Zähle anschließend die Abschnitte bis P.', [
      'Acht gleich große Abschnitte haben zusammen die Länge 2. Jeder Abschnitt ist also 2/8 = 1/4 lang.',
      'P liegt sieben Abschnitte rechts von 0.',
      'Sieben Viertel sind 7/4. Der Bruch ist vollständig gekürzt und liegt zwischen 1 und 2.',
    ], { format: 'reducedFraction', diagram: { from: '0', to: '2', divisions: 8, point: 7 }, mistakes: [
      ['7/8', 'Die gesamte Strecke ist 2 lang, nicht 1. Ein Abschnitt ist deshalb 1/4 und nicht 1/8 lang.'],
    ] }),
  written('m6-06', 'numberline', 'hard',
    'Zwischen 2/3 und 7/6 liegen fünf gleich große Abschnitte. P liegt zwei Abschnitte rechts von 2/3. Welche Zahl ist P? Gib einen vollständig gekürzten Bruch an.', '13/15',
    'Berechne zuerst die Länge der ganzen Strecke. Teile diese Länge durch 5.', [
      'Die ganze Strecke ist 7/6 − 2/3 = 7/6 − 4/6 = 3/6 = 1/2 lang.',
      'Ein Abschnitt ist ein Fünftel davon: 1/2 : 5 = 1/10.',
      'Zwei Abschnitte sind 2/10 = 1/5. Daher liegt P bei 2/3 + 1/5.',
      'Mit dem Nenner 15 ergibt sich 10/15 + 3/15 = 13/15.',
    ], { format: 'reducedFraction', diagram: { from: '2/3', to: '7/6', divisions: 5, point: 2 }, mistakes: [
      ['1/5', '1/5 ist nur die Entfernung vom linken Endpunkt zu P. Addiere noch die Startzahl 2/3.'],
      ['2/5', 'Fünf Abschnitte bedeuten hier nicht Fünftel der Einheit 1. Die gesamte Strecke hat nur die Länge 1/2.'],
    ] }),
  written('m6-07', 'quotients', 'medium',
    '9 Liter Saft werden gleichmäßig auf 16 Flaschen verteilt. Wie viele Liter kommen in eine Flasche?', '9/16',
    '„Gleichmäßig verteilen“ bedeutet teilen: Gesamtmenge : Anzahl der Flaschen.', [
      'Die Menge pro Flasche ist 9 : 16 Liter.',
      'Als Bruch geschrieben ist der Quotient 9/16 Liter.',
      'Auch 0,5625 Liter ist richtig. Die Menge ist kleiner als 1 Liter, weil 9 Liter auf mehr als 9 Flaschen verteilt werden.',
    ], { unit: 'Liter', mistakes: [['16/9', 'Die Gesamtmenge wird durch die Flaschenzahl geteilt: 9 : 16, nicht 16 : 9.']] }),
  choice('m6-08', 'quotients', 'hard',
    'Ein 7 m langes Band wird in 12 gleich lange Stücke geteilt. Ein Stück soll mindestens 3/5 m lang sein. Um wie viele Meter ist jedes geschnittene Stück zu kurz?', '1/60', [
      ['1/12', '7/12 ist die Stücklänge. Für den Unterschied zu 3/5 brauchst du einen gemeinsamen Nenner: 60.'],
      ['1/5', '3/5 m ist die benötigte Länge, nicht der Unterschied. Ziehe die tatsächliche Länge 7/12 m davon ab.'],
      ['1/30', '3/5 = 36/60 und 7/12 = 35/60. Der Abstand ist ein Sechzigstel, nicht zwei.'],
      ['1/60', 'Richtig: 3/5 − 7/12 = 36/60 − 35/60 = 1/60.'],
    ], 'Jedes Stück ist 7 : 12 Meter lang. Vergleiche diese Länge mit 3/5 m.', [
      'Die tatsächliche Stücklänge ist der Quotient 7 : 12 = 7/12 m.',
      'Erweitere beide Längen auf den Nenner 60: 3/5 = 36/60 und 7/12 = 35/60.',
      'Es fehlen 36/60 − 35/60 = 1/60 m pro Stück.',
    ], { unit: 'm' }),
  choice('m6-09', 'compare-fractions', 'medium',
    'Welcher dieser vier Brüche ist am größten?', '5/8', [
      ['7/12', '7/12 = 42/72. Der Bruch 5/8 = 45/72 ist größer.'],
      ['5/8', 'Richtig: 5/8 = 45/72 ist größer als 11/18 = 44/72, 7/12 = 42/72 und 3/5 = 0,6.'],
      ['11/18', '11 ist zwar der größte Zähler, aber die Nenner sind verschieden. 11/18 = 44/72 ist kleiner als 5/8 = 45/72.'],
      ['3/5', '3/5 = 0,6. Dagegen ist 5/8 = 0,625 und damit größer.'],
    ], 'Vergleiche zuerst 5/8 und 11/18 mit dem gemeinsamen Nenner 72.', [
      '5/8 = 45/72 und 11/18 = 44/72. Also ist 5/8 größer als 11/18.',
      '7/12 = 42/72 und ist ebenfalls kleiner als 5/8.',
      '3/5 = 0,6 und 5/8 = 0,625. Somit ist 5/8 der größte der vier Brüche.',
    ]),
  written('m6-10', 'compare-fractions', 'hard',
    'Welche Zahl liegt genau in der Mitte zwischen 5/6 und 7/8? Schreibe einen vollständig gekürzten Bruch.', '41/48',
    'Bringe beide Brüche auf den Nenner 48. Welche Zählerzahl liegt genau dazwischen?', [
      '5/6 = 40/48 und 7/8 = 42/48.',
      'Zwischen den Zählern 40 und 42 liegt genau 41.',
      'Die gesuchte Zahl ist 41/48. Ihr Abstand zu beiden Endpunkten ist jeweils 1/48.',
    ], { format: 'reducedFraction', mistakes: [
      ['41/24', '41/24 ist die Summe der beiden Endpunkte. Für die Mitte muss diese Summe noch halbiert werden.'],
      ['6/7', 'Zähler und Nenner getrennt zu mitteln ergibt im Allgemeinen nicht die Mitte der beiden Bruchwerte.'],
    ] }),
  choice('m6-11', 'decimal-notation', 'medium',
    'Wie lautet 13/16 in Dezimalschreibweise?', '0.8125', [
      ['0,1316', 'Zähler und Nenner dürfen nicht einfach hinter das Komma geschrieben werden. Berechne 13 : 16.'],
      ['0,8', '0,8 ist nur eine Näherung. Gesucht ist der genaue Dezimalwert.'],
      ['0,8125', 'Richtig: 13 : 16 = 0,8125.'],
      ['0,875', '0,875 entspricht 14/16 = 7/8. Der Zähler hier ist aber 13.'],
    ], '1/16 = 0,0625. Alternativ kannst du schriftlich 13 : 16 rechnen.', [
      'Teile schriftlich: 130 : 16 = 8 Rest 2. Die erste Nachkommastelle ist 8.',
      '20 : 16 = 1 Rest 4; 40 : 16 = 2 Rest 8; 80 : 16 = 5 Rest 0.',
      'Damit ist 13/16 = 0,8125. Die Division endet ohne Rest.',
    ]),
  written('m6-12', 'decimal-notation', 'hard',
    'Schreibe 0,375 als vollständig gekürzten Bruch.', '3/8',
    'Drei Nachkommastellen bedeuten zunächst Tausendstel. Kürze danach Zähler und Nenner.', [
      '0,375 sind 375 Tausendstel: 375/1000.',
      'Kürze durch 125: 375 : 125 = 3 und 1000 : 125 = 8.',
      'Der vollständig gekürzte Bruch ist 3/8.',
    ], { format: 'reducedFraction', mistakes: [
      ['3/80', 'Prüfe die Stellenwerte: 3/80 = 0,0375. Das ist zehnmal kleiner als die gegebene Zahl.'],
    ] }),
  choice('m6-13', 'compare-decimals', 'medium',
    'Welche Zahl ist am kleinsten?', '2.035', [
      ['2,305', 'Die Zehntelstelle ist 3. Zahlen mit 0 an der Zehntelstelle sind kleiner.'],
      ['2,35', 'Zum Vergleichen kannst du 2,350 schreiben. Die zusätzliche Null verändert den Wert nicht.'],
      ['2,053', 'Vergleiche 2,035 und 2,053: Bei den Hundertsteln ist 3 kleiner als 5.'],
      ['2,035', 'Richtig: Alle haben 2 Einer. Bei den kleinsten beiden entscheidet die Hundertstelstelle.'],
    ], 'Schreibe alle Zahlen mit drei Nachkommastellen und vergleiche von links nach rechts.', [
      'Mit drei Nachkommastellen stehen da: 2,305; 2,350; 2,053; 2,035.',
      'Die Zahlen mit 0 Zehnteln sind kleiner als die Zahlen mit 3 Zehnteln.',
      'Von 2,035 und 2,053 ist 2,035 kleiner, weil 3 Hundertstel kleiner als 5 Hundertstel sind.',
    ]),
  choice('m6-14', 'compare-decimals', 'hard',
    'Welche Zahl liegt echt zwischen 4,079 und 4,08, ist also größer als die erste und kleiner als die zweite Zahl?', '4.0795', [
      ['4,0795', 'Richtig: 4,0790 < 4,0795 < 4,0800.'],
      ['4,0789', '4,0789 ist kleiner als 4,0790 und liegt links vom gesuchten Bereich.'],
      ['4,0805', '4,0805 ist größer als 4,0800 und liegt rechts vom gesuchten Bereich.'],
      ['4,0790', 'Eine angehängte Null verändert den Wert nicht: 4,0790 ist genau der linke Endpunkt.'],
    ], 'Ergänze beide Grenzen auf vier Nachkommastellen: 4,0790 und 4,0800.', [
      '4,079 = 4,0790 und 4,08 = 4,0800.',
      'Die gesuchte Zahl muss größer als 4,0790 und kleiner als 4,0800 sein.',
      'Nur 4,0795 erfüllt beide Bedingungen. Ein Endpunkt zählt bei „echt zwischen“ nicht mit.',
    ]),
  written('m6-15', 'decimal-units', 'medium',
    'Ein Brett ist 2,075 m lang. Gib die Länge in Zentimetern an.', '207.5',
    'Ein Meter sind 100 Zentimeter. Beim Umrechnen in die kleinere Einheit wird die Zahl größer.', [
      '1 m = 100 cm. Multipliziere deshalb die Meterzahl mit 100.',
      '2,075 · 100 = 207,5.',
      'Das Brett ist 207,5 cm lang. Die 0,5 cm entsprechen 5 mm.',
    ], { unit: 'cm', mistakes: [
      ['20.75', 'Von Metern zu Zentimetern ist der Faktor 100, nicht 10.'],
      ['2075', '2075 ist die Länge in Millimetern. Gesucht sind Zentimeter.'],
    ] }),
  choice('m6-16', 'decimal-units', 'hard',
    'Eine Wanderung dauert 2,4 Stunden. Wie viele Minuten sind das?', '144', [
      ['124', 'Die 0,4 Stunden sind nicht 4 Minuten. Eine Stunde hat 60 Minuten.'],
      ['144', 'Richtig: 2 Stunden sind 120 Minuten und 0,4 Stunden sind 24 Minuten.'],
      ['204', '2,4 Stunden bedeutet nicht 2 Stunden und 4 Zehntel einer Minute. Rechne mit 60 Minuten pro Stunde.'],
      ['240', 'Zeit wird hier nicht im Hundertersystem umgerechnet. Eine Stunde hat 60 und nicht 100 Minuten.'],
    ], 'Rechne die 2 ganzen Stunden und die 0,4 Stunden getrennt in Minuten um.', [
      '2 Stunden entsprechen 2 · 60 = 120 Minuten.',
      '0,4 Stunden sind 4/10 einer Stunde: 60 : 10 · 4 = 24 Minuten.',
      'Insgesamt dauert die Wanderung 120 + 24 = 144 Minuten.',
    ], { unit: 'Minuten' }),
  choice('m6-17', 'positive-fractions', 'medium',
    'Berechne: 5/12 + 7/18 − 1/9.', '25/36', [
      ['11/21', 'Bei Summen werden die Nenner nicht addiert oder subtrahiert. Erweitere zunächst auf einen gemeinsamen Nenner.'],
      ['29/36', '29/36 ist das Ergebnis vor dem letzten Schritt. Ziehe noch 1/9 = 4/36 ab.'],
      ['25/36', 'Richtig: 15/36 + 14/36 − 4/36 = 25/36.'],
      ['7/12', 'Achte auf jeden Erweiterungsfaktor: 7/18 werden zu 14/36 und 1/9 zu 4/36.'],
    ], '36 ist ein gemeinsamer Nenner für 12, 18 und 9.', [
      'Erweitere auf Sechsunddreißigstel: 5/12 = 15/36, 7/18 = 14/36 und 1/9 = 4/36.',
      'Rechne nur mit den Zählern: 15 + 14 − 4 = 25.',
      'Das Ergebnis ist 25/36. Der Bruch lässt sich nicht weiter kürzen.',
    ]),
  written('m6-18', 'positive-fractions', 'hard',
    'Ein Tank ist zu 7/10 gefüllt. Zuerst werden 4/15 des gesamten Tankvolumens entnommen, danach weitere 1/6 des gesamten Tankvolumens. Welcher Anteil des Tanks bleibt gefüllt? Kürze vollständig.', '4/15',
    'Alle Angaben beziehen sich auf den ganzen Tank. Rechne 7/10 − 4/15 − 1/6.', [
      'Ein gemeinsamer Nenner von 10, 15 und 6 ist 30.',
      '7/10 − 4/15 − 1/6 = 21/30 − 8/30 − 5/30.',
      'Es bleiben 8/30 = 4/15 des Tankvolumens gefüllt.',
    ], { format: 'reducedFraction', mistakes: [['13/30', '13/30 bleiben nach der ersten Entnahme. Die zweite Entnahme von 1/6 = 5/30 fehlt noch.']] }),
  written('m6-19', 'signed-fractions', 'medium',
    'Berechne und kürze vollständig: −7/12 + 5/18.', '-11/36',
    'Schreibe beide Brüche mit dem Nenner 36. Der negative Anteil ist betragsmäßig größer.', [
      '−7/12 = −21/36 und 5/18 = 10/36.',
      '−21/36 + 10/36 = (−21 + 10)/36 = −11/36.',
      'Das Ergebnis ist negativ, denn 21 Sechsunddreißigstel nach links werden nur durch 10 nach rechts ausgeglichen.',
    ], { format: 'reducedFraction', mistakes: [
      ['11/36', 'Der Betrag stimmt, aber das Vorzeichen fehlt: Der negative Summand hat den größeren Betrag.'],
      ['-31/36', 'Die 5/18 werden addiert und wirken nach rechts. Addiere daher −21 und +10, nicht −21 und −10.'],
    ] }),
  choice('m6-20', 'signed-fractions', 'hard',
    'Berechne: −5/6 − (−3/4) + (−7/12).', '-2/3', [
      ['-13/6', 'Das Subtrahieren einer negativen Zahl bedeutet Addieren: −(−3/4) wird zu +3/4.'],
      ['1/2', 'Der letzte Summand ist negativ. + (−7/12) bedeutet −7/12.'],
      ['2/3', 'Der Betrag stimmt, aber die negativen Anteile überwiegen. Das Ergebnis muss negativ sein.'],
      ['-2/3', 'Richtig: −10/12 + 9/12 − 7/12 = −8/12 = −2/3.'],
    ], 'Löse zuerst die Vorzeichenklammern auf, bevor du die Brüche gleichnamig machst.', [
      '− (−3/4) wird zu +3/4 und + (−7/12) wird zu −7/12.',
      'Der Ausdruck lautet also −5/6 + 3/4 − 7/12.',
      'Mit dem Nenner 12: −10/12 + 9/12 − 7/12 = −8/12.',
      'Kürze durch 4: −8/12 = −2/3.',
    ]),
  written('m6-21', 'decimal-operations', 'medium',
    'Berechne genau: −3,75 + 8,06 − 2,895.', '1.415',
    'Schreibe alle Zahlen mit drei Nachkommastellen untereinander. Die Kommas müssen untereinander stehen.', [
      'Ergänze Nullen: −3,750 + 8,060 − 2,895.',
      'Zuerst: 8,060 − 3,750 = 4,310.',
      'Dann: 4,310 − 2,895 = 1,415.',
    ], { mistakes: [['1.425', 'Prüfe die Überträge beim Subtrahieren von 2,895 von 4,310. Insbesondere bei den Hundertsteln musst du ausleihen.']] }),
  choice('m6-22', 'decimal-operations', 'hard',
    'Auf einem Konto liegen 12,50 €. Danach werden 18,75 € abgebucht, 7,90 € eingezahlt und nochmals 4,65 € abgebucht. Wie lautet der neue Kontostand?', '-3', [
      ['3', '3 € ist nur der Betrag. Nach allen Buchungen liegt das Konto um 3 € im Minus.'],
      ['-3', 'Richtig: 12,50 − 18,75 + 7,90 − 4,65 = −3,00.'],
      ['1,65', '1,65 € ist der Zwischenstand nach der Einzahlung. Die letzte Abbuchung von 4,65 € fehlt.'],
      ['-18,80', 'Eine Einzahlung erhöht den Kontostand. Die 7,90 € werden addiert, nicht abgezogen.'],
    ], 'Abbuchungen sind negative Änderungen, Einzahlungen positive. Notiere die Buchungen in ihrer Reihenfolge.', [
      'Nach der ersten Abbuchung: 12,50 − 18,75 = −6,25 €.',
      'Nach der Einzahlung: −6,25 + 7,90 = 1,65 €.',
      'Nach der zweiten Abbuchung: 1,65 − 4,65 = −3,00 €.',
    ], { unit: '€' }),
  choice('m6-23', 'calculation-rules', 'medium',
    'Berechne geschickt: 17,35 − (6,48 + 7,35).', '3.52', [
      ['18,22', 'Ein Minus vor einer Summenklammer verändert beide Vorzeichen: −(6,48 + 7,35) = −6,48 − 7,35.'],
      ['10,87', 'Hier wurde nur 6,48 abgezogen. Auch die 7,35 gehören zur Klammer und müssen abgezogen werden.'],
      ['3,52', 'Richtig: 17,35 − 7,35 − 6,48 = 10 − 6,48 = 3,52.'],
      ['-3,52', '17,35 ist größer als die Summe 13,83 in der Klammer. Das Ergebnis ist deshalb positiv.'],
    ], 'Du darfst die beiden abzuziehenden Zahlen umordnen. 17,35 und 7,35 passen besonders gut zusammen.', [
      'Löse die Klammer auf: 17,35 − 6,48 − 7,35.',
      'Fasse geschickt zusammen: (17,35 − 7,35) − 6,48 = 10 − 6,48.',
      'Das Ergebnis ist 3,52. Zur Kontrolle: Die Klammer ergibt 13,83; 17,35 − 13,83 = 3,52.',
    ]),
  written('m6-24', 'calculation-rules', 'hard',
    'Berechne: −11/12 + (5/8 − 1/12) − (−3/8).', '0',
    '−(−3/8) wird zu +3/8. Fasse danach die Zwölftel und die Achtel jeweils zusammen.', [
      'Löse die Klammern auf: −11/12 + 5/8 − 1/12 + 3/8.',
      'Fasse gleiche Nenner zusammen: (−11/12 − 1/12) + (5/8 + 3/8).',
      'Das ergibt −12/12 + 8/8 = −1 + 1 = 0.',
    ], { mistakes: [
      ['-3/4', 'Prüfe das doppelte Minus am Ende: −(−3/8) bedeutet +3/8, nicht −3/8.'],
      ['1/6', 'Die −1/12 aus der ersten Klammer bleiben negativ. Vor dieser Klammer steht ein Plus.'],
    ] }),
  choice('m6-25', 'rounding', 'medium',
    'Runde 6,7496 auf Hundertstel.', '6.75', [
      ['6,75', 'Richtig: Die Tausendstelstelle ist 9. Die Hundertstelstelle 4 wird deshalb auf 5 erhöht.'],
      ['6,74', 'Hier wurde nur abgeschnitten. Weil die nächste Stelle 9 ist, musst du aufrunden.'],
      ['6,8', 'Gesucht sind Hundertstel, also zwei Nachkommastellen. 6,8 hat nur eine.'],
      ['6,749', 'Das wären drei Nachkommastellen; außerdem wurde hier abgeschnitten statt korrekt gerundet.'],
    ], 'Hundertstel sind die zweite Stelle nach dem Komma. Entscheidend ist die direkt folgende Stelle.', [
      'Die Stellen lauten: 7 Zehntel, 4 Hundertstel, 9 Tausendstel, 6 Zehntausendstel.',
      'Für das Runden auf Hundertstel betrachtest du die Tausendstelstelle 9.',
      'Weil 9 mindestens 5 ist, wird aus 6,74 beim Runden 6,75.',
    ]),
  written('m6-26', 'rounding', 'hard',
    'Bilde einen Überschlag für 19,49 + 8,49 − 3,51. Runde dafür ausdrücklich jede der drei Zahlen zuerst auf eine ganze Zahl und rechne erst danach.', '23',
    'Schreibe drei einzelne Rundungen auf. Das Runden des Endergebnisses ist hier nicht gefragt.', [
      '19,49 wird auf 19 gerundet und 8,49 auf 8, weil die erste Nachkommastelle jeweils 4 ist.',
      '3,51 wird auf 4 gerundet, weil die erste Nachkommastelle 5 ist.',
      'Der geforderte Überschlag lautet 19 + 8 − 4 = 23.',
      'Die genaue Rechnung ergibt 24,47. Erst dieses Endergebnis zu runden würde 24 liefern, erfüllt aber nicht die geforderte Vorgehensweise.',
    ], { mistakes: [
      ['24', '24 erhältst du beim Runden des genauen Ergebnisses 24,47. Hier sollst du aber jede Zahl vor der Rechnung runden.'],
      ['24.47', '24,47 ist das genaue Ergebnis. Gefragt ist ein Überschlag mit vorher einzeln gerundeten Zahlen.'],
    ] }),
  choice('m6-27', 'unit-operations', 'medium',
    'Ein Seil ist 3,25 m lang. 85 cm werden abgeschnitten und anschließend 0,6 m angeknotet. Wie lang ist das Seil jetzt? Die Knotenlänge wird vernachlässigt.', '3', [
      ['2,46', 'Hier wurden nach dem Abschneiden nur 0,06 m statt 0,6 m addiert. Achte auf die Zehntelstelle.'],
      ['3,765', '85 cm sind 0,85 m und nicht 0,085 m. Ein Zentimeter ist ein Hundertstel Meter.'],
      ['3', 'Richtig: 3,25 − 0,85 + 0,60 = 3,00 m.'],
      ['4,70', 'Das abgeschnittene Stück wird abgezogen. Nur die angeknoteten 0,6 m werden addiert.'],
    ], 'Rechne 85 cm zuerst in Meter um. Alle drei Zahlen müssen vor der Rechnung dieselbe Einheit haben.', [
      '85 cm = 0,85 m.',
      'Nach dem Abschneiden bleiben 3,25 − 0,85 = 2,40 m.',
      'Nach dem Anknoten: 2,40 + 0,60 = 3,00 m.',
    ], { unit: 'm' }),
  written('m6-28', 'unit-operations', 'hard',
    'Ein Rucksack darf höchstens 4 kg wiegen. Leer wiegt er 0,875 kg. Bücher wiegen zusammen 1,68 kg und die gefüllte Trinkflasche 0,75 kg. Wie viele Gramm dürfen jetzt noch zusätzlich hinein?', '695',
    'Addiere die vorhandenen Massen in Kilogramm. Ziehe die Summe von 4 kg ab und rechne erst am Ende in Gramm um.', [
      'Rucksack und Bücher: 0,875 + 1,680 = 2,555 kg.',
      'Mit der Flasche: 2,555 + 0,750 = 3,305 kg.',
      'Bis zur Grenze fehlen 4,000 − 3,305 = 0,695 kg.',
      '0,695 kg = 695 g. So viel darf noch zusätzlich hinein.',
    ], { unit: 'g', mistakes: [
      ['0.695', 'Die Rechnung in Kilogramm stimmt. Gefragt sind Gramm: Multipliziere 0,695 noch mit 1000.'],
      ['1445', 'Die 0,75 kg schwere Trinkflasche muss ebenfalls zum vorhandenen Gewicht gerechnet werden.'],
    ] }),
]

export const MATH_QUESTION_MAP = new Map(MATH_QUESTIONS.map(question => [question.id, question]))
export const MATH_TOPIC_MAP = new Map(MATH_TOPICS.map(topic => [topic.id, topic]))
