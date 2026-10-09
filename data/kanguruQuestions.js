// Offizielle Känguru-Aufgaben bleiben bewusst von den RadYar-MCQs getrennt.
// Neue Jahrgänge werden erst nach dem Abgleich von Aufgaben, Lösungsschlüssel
// und eigenen Lösungswegen ergänzt.
import { KANGURU_QUESTIONS_2024 } from './kanguruQuestions2024'
import { KANGURU_QUESTIONS_2025 } from './kanguruQuestions2025'

const choices = values => values.map(([id, text]) => ({ id, text }))
const visualChoices = slug => ['A', 'B', 'C', 'D', 'E'].map(id => ({
  id,
  text: `Abbildung ${id}`,
  image: `/kanguru/questions/2026-56/clean/${slug}-${id.toLowerCase()}.png`,
}))

const KANGURU_QUESTIONS_2026 = [
  {
    id: '2026-56-a1', gradeGroup: '5-6', year: 2026, part: 'A', number: 1, points: 3,
    topic: 'Räumliches Vorstellungsvermögen',
    question: 'Im Eingangsbereich unserer Schule hängen drei neue Lampen. Wie sehen sie von unten aus?',
    image: '/kanguru/questions/2026-56/clean/a1-prompt.png',
    imageAlt: 'Drei Lampen mit runder, sechseckiger und quadratischer Grundfläche',
    options: visualChoices('a1'),
    correct: 'C',
    solutionSteps: [
      'Von unten erkennt man nur die Grundfläche jeder Lampe.',
      'Die drei Grundflächen sind der Reihe nach ein Kreis, ein Sechseck und ein gedrehtes Quadrat.',
      'Nur Abbildung C zeigt genau diese Reihenfolge.',
    ],
  },
  {
    id: '2026-56-a2', gradeGroup: '5-6', year: 2026, part: 'A', number: 2, points: 3,
    topic: 'Zahlen und Stellenwert',
    question: 'Lea vertauscht in der Zahl 583469 zwei benachbarte Ziffern. Dadurch entsteht eine kleinere Zahl. Welche beiden Ziffern hat Lea vertauscht?',
    options: choices([['A', '5 und 8'], ['B', '8 und 3'], ['C', '3 und 4'], ['D', '4 und 6'], ['E', '6 und 9']]),
    correct: 'B',
    solutionSteps: [
      'Eine Zahl wird beim Vertauschen benachbarter Ziffern nur dann kleiner, wenn die größere Ziffer vor der kleineren steht.',
      'In 583469 trifft das nur auf 8 und 3 zu.',
      'Aus 583469 wird 538469. Diese Zahl ist kleiner.',
    ],
  },
  {
    id: '2026-56-a3', gradeGroup: '5-6', year: 2026, part: 'A', number: 3, points: 3,
    topic: 'Flächen und Zerlegen',
    question: 'Simon will das abgebildete Schiff aus den beiden gezeigten Formen puzzeln. Wie viele Teile braucht er insgesamt?',
    image: '/kanguru/questions/2026-56/clean/a3-prompt.png',
    imageAlt: 'Die beiden Puzzleteile und das daraus gelegte Schiff',
    options: choices([['A', '4'], ['B', '5'], ['C', '6'], ['D', '7'], ['E', '8']]),
    correct: 'E',
    solutionSteps: [
      'Beide erlaubten Teile haben den Flächeninhalt von 4 kleinen Kästchen.',
      'Das Schiff hat insgesamt den Flächeninhalt von 32 kleinen Kästchen.',
      'Daher werden 32 : 4 = 8 Teile benötigt.',
    ],
  },
  {
    id: '2026-56-a4', gradeGroup: '5-6', year: 2026, part: 'A', number: 4, points: 3,
    topic: 'Brüche',
    question: 'Eine Pizza ist in 8 gleich große Stücke geschnitten. Melina gibt ein Viertel der Pizza ihrem Vater. Vom Rest nimmt sie sich die Hälfte. Wie viele Pizza-Stücke sind noch übrig?',
    options: choices([['A', '1'], ['B', '3'], ['C', '4'], ['D', '5'], ['E', '6']]),
    correct: 'B',
    solutionSteps: [
      'Ein Viertel von 8 Stücken sind 2 Stücke. Danach bleiben 6 Stücke.',
      'Melina nimmt die Hälfte der verbleibenden 6 Stücke, also 3 Stücke.',
      'Damit sind noch 3 Stücke übrig.',
    ],
  },
  {
    id: '2026-56-a5', gradeGroup: '5-6', year: 2026, part: 'A', number: 5, points: 3,
    topic: 'Muster und Reihenfolgen',
    question: 'Die fünf Fliesen wiederholen sich in jeder waagerechten Reihe immer in derselben Reihenfolge. Welche Anordnung ist auf der fotografierten Wand zu sehen?',
    image: '/kanguru/questions/2026-56/clean/a5-prompt.png',
    imageAlt: 'Fotografierte Fliesenfolge auf einem Handy',
    options: visualChoices('a5'),
    correct: 'D',
    solutionSteps: [
      'Man liest auf dem Foto eine waagerechte Reihe von links nach rechts.',
      'Dort folgen Stern, vier Punkte, Ring, Wellen und Quadrat aufeinander.',
      'Diese Reihenfolge zeigt nur Abbildung D.',
    ],
  },
  {
    id: '2026-56-a6', gradeGroup: '5-6', year: 2026, part: 'A', number: 6, points: 3,
    topic: 'Logisches Ausschließen',
    question: 'An Lunas Armband hängen Steine in drei Formen. Zwei runde Steine hängen direkt nebeneinander, würfelförmige Steine aber nicht. Welches Armband ist möglich?',
    image: null,
    imageAlt: 'Fünf mögliche Anordnungen der Schmucksteine am Armband',
    options: visualChoices('a6'),
    correct: 'C',
    solutionSteps: [
      'Zuerst werden alle Bilder ausgeschlossen, in denen keine zwei Kreise direkt nebeneinander liegen.',
      'Danach werden die Bilder ausgeschlossen, in denen zwei Quadrate Nachbarn sind.',
      'Nur bei Abbildung C sind beide Bedingungen gleichzeitig erfüllt.',
    ],
  },
  {
    id: '2026-56-a7', gradeGroup: '5-6', year: 2026, part: 'A', number: 7, points: 3,
    topic: 'Zahlensummen',
    question: 'Auf einem Würfel stehen die Zahlen 1 bis 6. Die Zahlen auf den Seiten vorn, rechts und oben haben die Summe 7. Welche Zahlen stehen auf den anderen drei Seiten?',
    options: choices([['A', '3, 5 und 6'], ['B', '1, 3 und 5'], ['C', '4, 5 und 6'], ['D', '2, 4 und 5'], ['E', '3, 4 und 5']]),
    correct: 'A',
    solutionSteps: [
      'Die Summe aller Zahlen von 1 bis 6 ist 21.',
      'Die drei sichtbaren Seiten haben zusammen die Summe 7.',
      'Die anderen drei Seiten haben daher die Summe 21 - 7 = 14. Nur 3 + 5 + 6 ergibt 14.',
    ],
  },
  {
    id: '2026-56-a8', gradeGroup: '5-6', year: 2026, part: 'A', number: 8, points: 3,
    topic: 'Drehen und Überlagern',
    question: 'Zoé legt mehrere Teile der gezeigten Form übereinander. Was ist die kleinstmögliche Anzahl an Teilen für die abgebildete Blume?',
    image: '/kanguru/questions/2026-56/clean/a8-prompt.png',
    imageAlt: 'Ein Teil mit zwei Kreisen und die daraus gelegte Blume',
    options: choices([['A', '2'], ['B', '3'], ['C', '4'], ['D', '5'], ['E', '6']]),
    correct: 'C',
    solutionSteps: [
      'Jedes Teil liefert wegen des festen Winkels genau zwei mögliche Blütenblätter.',
      'Mit drei gedrehten Teilen lässt sich mindestens eine der sechs Positionen nicht passend abdecken.',
      'Mit vier passend gedrehten Teilen entstehen alle sechs Blütenblätter. Vier ist daher die kleinste Anzahl.',
    ],
  },
  {
    id: '2026-56-b1', gradeGroup: '5-6', year: 2026, part: 'B', number: 1, points: 4,
    topic: 'Spiegelungen',
    question: 'Das Känguru wird im Sechseck der Reihe nach im Uhrzeigersinn an den inneren Dreiecksseiten gespiegelt. Wie sieht das Dreieck mit dem Fragezeichen aus?',
    image: '/kanguru/questions/2026-56/clean/b1-prompt.png',
    imageAlt: 'Schrittweise Spiegelung eines Kängurus in einem Sechseck',
    options: visualChoices('b1'),
    correct: 'A',
    solutionSteps: [
      'Bei jeder Spiegelung wechselt die Orientierung des Kängurus an der gemeinsamen Dreiecksseite.',
      'Man verfolgt nacheinander Kopf, Rücken und Ohren über die bereits eingezeichneten Dreiecke.',
      'Nach der letzten Spiegelung stimmt die Lage nur mit Abbildung A überein.',
    ],
  },
  {
    id: '2026-56-b2', gradeGroup: '5-6', year: 2026, part: 'B', number: 2, points: 4,
    topic: 'Zeit und Einteilen',
    question: 'Vor mir warten 21 Leute. Ab 9:00 Uhr fährt jede Minute ein Wagen mit 4 Leuten ab. Eine Fahrt dauert 3 Minuten. Wann endet meine Fahrt?',
    options: choices([['A', 'um 9:06 Uhr'], ['B', 'um 9:08 Uhr'], ['C', 'um 9:11 Uhr'], ['D', 'um 9:12 Uhr'], ['E', 'um 9:14 Uhr']]),
    correct: 'B',
    solutionSteps: [
      'Fünf Wagen nehmen bis 9:04 Uhr insgesamt 20 der wartenden Personen mit.',
      'Ich bin damit im sechsten Wagen, der um 9:05 Uhr abfährt.',
      'Die Fahrt dauert 3 Minuten und endet um 9:08 Uhr.',
    ],
  },
  {
    id: '2026-56-b3', gradeGroup: '5-6', year: 2026, part: 'B', number: 3, points: 4,
    topic: 'Falten und Raumvorstellung',
    question: 'Natalia schneidet entlang der dicken Linien und faltet entlang der gestrichelten Linien. Welcher Bastelbogen ergibt die gezeigte Figur?',
    image: '/kanguru/questions/2026-56/clean/b3-prompt.png',
    imageAlt: 'Die gefaltete Papierfigur als Ziel',
    options: visualChoices('b3'),
    correct: 'E',
    solutionSteps: [
      'Die dicken Linien müssen nach dem Schneiden die freien Oberkanten und Seiten der Wände bilden.',
      'Die gestrichelten Linien müssen genau dort liegen, wo eine Wand aus der Grundfläche hochgefaltet wird.',
      'Nur Bastelbogen E besitzt diese Kombination und die passende Anordnung der Wandhöhen.',
    ],
  },
  {
    id: '2026-56-b4', gradeGroup: '5-6', year: 2026, part: 'B', number: 4, points: 4,
    topic: 'Falten und Zahlen',
    question: 'Ein Papierstreifen mit den Zahlen 1 bis 12 wird zweimal genau in der Mitte gefaltet. Durch das Kästchen mit der 1 wird eine Nadel gestochen. Wie groß ist die Summe der vier Zahlen in den Kästchen mit Loch?',
    options: choices([['A', '22'], ['B', '23'], ['C', '25'], ['D', '26'], ['E', '28']]),
    correct: 'D',
    solutionSteps: [
      'Nach der ersten Faltung liegen die Zahlen 1 und 12 sowie 6 und 7 übereinander.',
      'Durch die zweite Faltung treffen am Kästchen mit der 1 die vier Kästchen 1, 6, 7 und 12 zusammen.',
      'Ihre Summe ist 1 + 6 + 7 + 12 = 26.',
    ],
  },
  {
    id: '2026-56-b5', gradeGroup: '5-6', year: 2026, part: 'B', number: 5, points: 4,
    topic: 'Gleichungen und Kombinieren',
    question: 'Sieben Monsterbabys haben entweder 2 Augen und 4 Beine oder 3 Augen und 2 Beine. Zusammen haben sie 20 Beine. Wie viele Augen haben sie zusammen?',
    options: choices([['A', '14'], ['B', '15'], ['C', '16'], ['D', '17'], ['E', '18']]),
    correct: 'E',
    solutionSteps: [
      'Wären alle sieben Babys zweibeinig, hätten sie zusammen 14 Beine.',
      'Es fehlen 6 Beine. Jedes vierbeinige Baby bringt 2 zusätzliche Beine, also gibt es 3 vierbeinige und 4 zweibeinige Babys.',
      'Die Augenzahl ist 3 · 2 + 4 · 3 = 18.',
    ],
  },
  {
    id: '2026-56-b6', gradeGroup: '5-6', year: 2026, part: 'B', number: 6, points: 4,
    topic: 'Kombinatorik',
    question: 'Alle 4 Ziffern eines Fahrradschlosses sind ungerade und werden von links nach rechts immer kleiner oder immer größer. Wie viele Kombinationen muss Flo höchstens ausprobieren?',
    options: choices([['A', '10'], ['B', '12'], ['C', '14'], ['D', '16'], ['E', '18']]),
    correct: 'A',
    solutionSteps: [
      'Zur Verfügung stehen die fünf ungeraden Ziffern 1, 3, 5, 7 und 9.',
      'Für eine streng steigende Kombination wählt man 4 der 5 Ziffern. Ihre Reihenfolge ist dann fest. Das sind 5 Möglichkeiten.',
      'Zu jeder Auswahl gibt es auch die streng fallende Reihenfolge. Insgesamt sind es 5 + 5 = 10 Kombinationen.',
    ],
  },
  {
    id: '2026-56-b7', gradeGroup: '5-6', year: 2026, part: 'B', number: 7, points: 4,
    topic: 'Falten und Spiegeln',
    question: 'Ein Papierstreifen wurde an vier schrägen Linien gefaltet. Wie sehen die Faltlinien nach dem Auseinanderfalten auf der hellen Seite aus?',
    image: '/kanguru/questions/2026-56/clean/b7-prompt.png',
    imageAlt: 'Der mehrfach gefaltete Papierstreifen',
    options: visualChoices('b7'),
    correct: 'C',
    solutionSteps: [
      'Beim Auseinanderfalten wird jede neue Faltlinie an der vorherigen Faltkante gespiegelt.',
      'So wechseln die Richtungen der vier schrägen Linien in der passenden Spiegelreihenfolge.',
      'Diesen Verlauf zeigt Abbildung C.',
    ],
  },
  {
    id: '2026-56-b8', gradeGroup: '5-6', year: 2026, part: 'B', number: 8, points: 4,
    topic: 'Gleichungssysteme',
    question: 'Vier Zahlen werden so in die Kreise eingetragen, dass alle waagerechten und senkrechten Rechnungen stimmen. Wie groß ist die Summe der beiden Zahlen in den grauen Kreisen?',
    image: '/kanguru/questions/2026-56/clean/b8-prompt.png',
    imageAlt: 'Rechenschema mit zwei grauen und zwei weißen Kreisen',
    options: choices([['A', '10'], ['B', '13'], ['C', '15'], ['D', '16'], ['E', '19']]),
    correct: 'B',
    solutionSteps: [
      'Nenne die Kreise oben links a, oben rechts b, unten links c und unten rechts d.',
      'Dann gilt a + b = 10, a + c = 17, c - d = 4 und b + d = 11.',
      'Aus den Gleichungen folgt a = 6 und d = 7. Die grauen Kreise ergeben 6 + 7 = 13.',
    ],
  },
  {
    id: '2026-56-c1', gradeGroup: '5-6', year: 2026, part: 'C', number: 1, points: 5,
    topic: 'Logisches Zuordnen',
    question: 'Herr König hatte eine Vorspeise, eine Hauptspeise und eine Nachspeise und dabei aus jedem der drei Menüs genau eine Speise. Welche drei Speisen hatte er?',
    image: '/kanguru/questions/2026-56/clean/c1-prompt.png',
    imageAlt: 'Drei Menüs mit Vorspeise, Hauptspeise und Nachspeise',
    options: choices([
      ['A', 'Suppe, Lachs, Eis'], ['B', 'Salat, Schnitzel, Eis'], ['C', 'Suppe, Salat, Pudding'],
      ['D', 'Salat, Lachs, Eis'], ['E', 'Salat, Lachs, Pudding'],
    ]),
    correct: 'D',
    solutionSteps: [
      'Gesucht sind drei unterschiedliche Gänge, die zugleich genau einem Eintrag aus jedem Menü entsprechen.',
      'Salat stammt aus Menü 3, Lachs aus Menü 1 und Eis aus Menü 2.',
      'Damit wird jedes Menü genau einmal verwendet. Das ist Antwort D.',
    ],
  },
  {
    id: '2026-56-c2', gradeGroup: '5-6', year: 2026, part: 'C', number: 2, points: 5,
    topic: 'Geometrie und Längen',
    question: 'Das große Quadrat ist aus vier gleichen hellen Rechtecken, vier gleichen dunklen Rechtecken und einem schwarzen Quadrat zusammengesetzt. Wie lang ist die Seite des schwarzen Quadrats?',
    image: '/kanguru/questions/2026-56/clean/c2-prompt.png',
    imageAlt: 'Quadrat aus hellen und dunklen Rechtecken mit den Längen 67 cm, 54 cm und 25 cm',
    options: choices([['A', '6 cm'], ['B', '7 cm'], ['C', '8 cm'], ['D', '9 cm'], ['E', '10 cm']]),
    correct: 'D',
    solutionSteps: [
      'Die kurze Seite eines hellen Rechtecks ist 67 - 54 = 13 cm lang.',
      'Nach dem Rand aus hellen Rechtecken bleibt innen ein Quadrat mit Seitenlänge 67 - 2 · 13 = 41 cm.',
      'Zwei lange Seiten der dunklen Rechtecke ergeben zusammen die innere Breite plus die schwarze Seite. Also ist die schwarze Seite 2 · 25 - 41 = 9 cm lang.',
    ],
  },
  {
    id: '2026-56-c3', gradeGroup: '5-6', year: 2026, part: 'C', number: 3, points: 5,
    topic: 'Logisches Zuordnen',
    question: 'Leonard und Rajesh haben gleich große Tassen mit verschiedenfarbigen Henkeln. Amy und Penny haben verschieden große Tassen mit gleichfarbigen Henkeln. Welche Tasse gehört Sheldon?',
    image: null,
    imageAlt: 'Fünf Tassen mit verschiedenen Größen und Henkelfarben',
    options: visualChoices('c3'),
    correct: 'B',
    solutionSteps: [
      'Die große Tasse mit weißem Henkel muss mit einer großen Tasse mit schwarzem Henkel das Paar von Leonard und Rajesh bilden.',
      'Die andere große Tasse mit schwarzem Henkel passt dann zur kleinen Tasse mit schwarzem Henkel für Amy und Penny.',
      'Übrig bleibt die kleine Tasse mit weißem Henkel: Tasse B gehört Sheldon.',
    ],
  },
  {
    id: '2026-56-c4', gradeGroup: '5-6', year: 2026, part: 'C', number: 4, points: 5,
    topic: 'Zeit und Logik',
    question: 'Bei einer digitalen Uhr sind zwei Stellen vertauscht. Sie zeigt 15:69 an. Was zeigt sie eine Minute später an?',
    options: choices([['A', '25:69'], ['B', '16:69'], ['C', '16:60'], ['D', '15:79'], ['E', '10:70']]),
    correct: 'E',
    solutionSteps: [
      'Nur durch das Vertauschen der zweiten und dritten Stelle wird aus 15:69 eine gültige Uhrzeit: 16:59.',
      'Eine Minute später ist es tatsächlich 17:00 Uhr.',
      'Auf der falsch verdrahteten Anzeige werden wieder die zweite und dritte Stelle vertauscht. Sie zeigt 10:70.',
    ],
  },
  {
    id: '2026-56-c5', gradeGroup: '5-6', year: 2026, part: 'C', number: 5, points: 5,
    topic: 'Umfang und Figuren',
    question: 'Fünf identische Vierecke aus je 23 cm langem Draht bilden ein Windrad. Der äußere Rand ist 75 cm lang. Wie lang ist die markierte Vierecksseite?',
    image: '/kanguru/questions/2026-56/clean/c5-prompt.png',
    imageAlt: 'Windrad aus fünf Vierecken und eine markierte Seite',
    options: choices([['A', '3 cm'], ['B', '4 cm'], ['C', '5 cm'], ['D', '6 cm'], ['E', '7 cm']]),
    correct: 'B',
    solutionSteps: [
      'Die fünf einzelnen Umfänge sind zusammen 5 · 23 = 115 cm lang.',
      'Im Windrad misst der äußere Rand nur 75 cm. Die Differenz 40 cm besteht aus innen liegenden Seiten, die in den Einzelumfängen doppelt gezählt wurden.',
      'Die fünf gleichen markierten Seiten haben daher zusammen 40 : 2 = 20 cm. Eine Seite ist 20 : 5 = 4 cm lang.',
    ],
  },
  {
    id: '2026-56-c6', gradeGroup: '5-6', year: 2026, part: 'C', number: 6, points: 5,
    topic: 'Logisches Zuordnen',
    question: 'Die fünf Töpfe tragen 1 bis 5 Blumen. Floris und Jasmin haben zusammen dreimal so viele Blumen wie Lilly. Jasmin und Camilla haben zusammen doppelt so viele wie Yves. Um welchen Topf kümmert sich Floris?',
    image: null,
    imageAlt: 'Fünf Blumentöpfe mit einer bis fünf Blumen',
    options: visualChoices('c6'),
    correct: 'A',
    solutionSteps: [
      'Die Zahlen 1 bis 5 müssen auf Floris, Jasmin, Lilly, Camilla und Yves verteilt werden.',
      'Die einzige Verteilung mit F + J = 3 · L und J + C = 2 · Y ist F = 1, J = 5, L = 2, C = 3 und Y = 4.',
      'Floris kümmert sich also um den Topf mit einer Blume, Abbildung A.',
    ],
  },
  {
    id: '2026-56-c7', gradeGroup: '5-6', year: 2026, part: 'C', number: 7, points: 5,
    topic: 'Gleichungen und Proportionalität',
    question: 'Bei 80 zusätzlichen Fenstern müsste jeder Fensterputzer 4 mehr putzen. Bei 8 Fensterputzern weniger müsste jeder 6 mehr putzen. Wie viele Fenster hat das Gebäude?',
    options: choices([['A', '240'], ['B', '220'], ['C', '180'], ['D', '160'], ['E', '120']]),
    correct: 'C',
    solutionSteps: [
      '80 zusätzliche Fenster bedeuten 4 zusätzliche Fenster pro Person. Daher arbeiten 80 : 4 = 20 Fensterputzer.',
      'Nenne die ursprüngliche Fensterzahl F. Mit 8 Personen weniger gilt F : 12 = F : 20 + 6.',
      'Multipliziert mit 60 ergibt das 5F = 3F + 360, also F = 180.',
    ],
  },
  {
    id: '2026-56-c8', gradeGroup: '5-6', year: 2026, part: 'C', number: 8, points: 5,
    topic: 'Ziffern und systematisches Zählen',
    question: 'Die Zahlen von 1 bis 1000 werden ohne Lücken hintereinander geschrieben. Wie oft kann man in dieser Zahlenreihe die Zahl 26 lesen?',
    options: choices([['A', '11-mal'], ['B', '20-mal'], ['C', '27-mal'], ['D', '31-mal'], ['E', '33-mal']]),
    correct: 'D',
    solutionSteps: [
      'Innerhalb einzelner Zahlen erscheint 26 insgesamt 20-mal: zehnmal am Ende einer Zahl und zehnmal am Anfang der Zahlen 260 bis 269.',
      'Zusätzlich entsteht 26 elfmal über eine Zahlengrenze: bei 62|63 sowie bei 602|603, 612|613, ..., 692|693.',
      'Insgesamt kann man 20 + 11 = 31-mal die Zahl 26 lesen.',
    ],
  },
]

export const KANGURU_QUESTIONS = [...KANGURU_QUESTIONS_2024, ...KANGURU_QUESTIONS_2025, ...KANGURU_QUESTIONS_2026]

export const KANGURU_PLANNED_YEARS = [2024, 2025, 2026]
export const KANGURU_PARTS = ['A', 'B', 'C']
export const KANGURU_GRADE_GROUPS = ['5-6', '7-8']

export function questionsForGradeGroup(gradeGroup) {
  return KANGURU_QUESTIONS.filter(question => question.gradeGroup === gradeGroup)
}

export function questionsForExam({ gradeGroup, year, part }) {
  return KANGURU_QUESTIONS.filter(question => (
    question.gradeGroup === gradeGroup
    && question.year === Number(year)
    && question.part === part
  ))
}
