export const families = [
  { name: 'Fluss', words: ['der Fluss', 'fließend', 'flüssig', 'das Flussbett', 'überfließend'] },
  { name: 'Schloss', words: ['das Schloss', 'verschließen', 'der Schlüssel', 'aufgeschlossen', 'abschließen'] },
  { name: 'Genuss', words: ['der Genuss', 'genießen', 'genüsslich', 'genussvoll', 'die Genüsslichkeit'] },
  { name: 'Wissen', words: ['das Gewissen', 'die Wissenschaft', 'wissbegierig', 'das Wissen', 'ich weiß'] },
]

export const dictations = families.map(({ name, words }) => ({
  name,
  questions: words.map(answer => ({ answer })),
}))

function item(prompt, example, answer, explanation, options) {
  return { prompt, example, answer, explanation, options }
}

export const grammar = [
  { name: 'Nomen', note: 'Nomen können Lebewesen, Dinge und Begriffe benennen. Man schreibt sie groß.', questions: [
    item('Welches Wort ist ein Nomen?', 'Plötzlich begann die Musik.', 'Musik', 'Musik ist ein Nomen. Dazu passt der Artikel die.', ['Plötzlich', 'begann', 'Musik']),
    item('Schreibe die Mehrzahl von „das Kind“.', 'Die ___ spielen auf dem Hof.', 'Kinder', 'Der Plural von Kind lautet Kinder. Der Artikel im Plural ist die.'),
    item('Welches Wort ist ein Nomen?', 'Ihr Mut überraschte uns.', 'Mut', 'Auch ein Begriff wie Mut ist ein Nomen. Man schreibt es groß.', ['Ihr', 'Mut', 'überraschte']),
    item('Welcher Artikel passt zu „Erlebnis“?', '___ Erlebnis blieb mir im Gedächtnis.', 'das', 'Erlebnis ist sächlich. Der bestimmte Artikel im Nominativ lautet das.', ['der', 'die', 'das']),
  ] },
  { name: 'Adjektive', note: 'Adjektive beschreiben Eigenschaften. Viele kann man steigern: schnell, schneller, am schnellsten.', questions: [
    item('Welches Wort beschreibt das Wetter?', 'Das Wetter war stürmisch.', 'stürmisch', 'Stürmisch beschreibt, wie das Wetter war.', ['Wetter', 'war', 'stürmisch']),
    item('Setze den Komparativ von „hell“ ein.', 'Diese Lampe leuchtet ___ als die andere.', 'heller', 'Beim regelmäßigen Komparativ kommt -er an den Stamm: hell → heller.'),
    item('Ergänze die passende Adjektivform.', 'Wir sahen einen ___ Vogel. (klein)', 'kleinen', 'Nach einen bekommt das Adjektiv im maskulinen Akkusativ die Endung -en.', ['kleine', 'kleinen', 'kleines']),
    item('Schreibe die Steigerungsform hinter „am“.', 'Von allen lief Lina am ___. (schnell)', 'schnellsten', 'Die höchste Stufe lautet am schnellsten.'),
  ] },
  { name: 'Präpositionen', note: 'Präpositionen zeigen zum Beispiel Ort, Richtung oder Zeit an. Sie bestimmen den Kasus der folgenden Wortgruppe.', questions: [
    item('Welches Wort ist die Präposition?', 'Die Tasche liegt unter dem Tisch.', 'unter', 'Unter beschreibt hier die Lage der Tasche.', ['liegt', 'unter', 'Tisch']),
    item('Welcher Artikel passt nach „mit“?', 'Mila fährt mit ___ Bus.', 'dem', 'Mit verlangt den Dativ. Aus der Bus wird dem Bus.', ['der', 'den', 'dem']),
    item('Welcher Artikel passt? Frage: Wohin?', 'Das Kind legt das Heft auf ___ Tisch.', 'den', 'Bei einer Richtung verlangt auf den Akkusativ. Wohin? Auf den Tisch.', ['dem', 'den', 'des']),
    item('Welcher Artikel passt? Frage: Wo?', 'Das Heft liegt auf ___ Tisch.', 'dem', 'Bei einer Ortsangabe verlangt auf den Dativ. Wo? Auf dem Tisch.', ['den', 'dem', 'des']),
  ] },
  { name: 'Pronomen', note: 'Relativpronomen leiten Relativsätze ein. Demonstrativpronomen weisen auf etwas hin. Possessivpronomen zeigen Zugehörigkeit.', questions: [
    item('Welche Art von Pronomen ist „die“ im Nebensatz?', 'Dort steht die Frau, die uns geholfen hat.', 'Relativpronomen', 'Die leitet den Relativsatz ein und bezieht sich auf die Frau.', ['Relativpronomen', 'Demonstrativpronomen', 'Possessivpronomen']),
    item('Welche Art von Pronomen ist „meins“?', 'Das Fahrrad ist meins.', 'Possessivpronomen', 'Meins zeigt, wem das Fahrrad gehört.', ['Demonstrativpronomen', 'Possessivpronomen', 'Relativpronomen']),
    item('Welche Art von Pronomen ist „diese“?', 'Von den beiden Jacken nehme ich diese.', 'Demonstrativpronomen', 'Diese weist auf eine bestimmte der beiden Jacken hin.', ['Possessivpronomen', 'Relativpronomen', 'Demonstrativpronomen']),
    item('Ergänze das passende Relativpronomen.', 'Der Junge, ___ ich geholfen habe, winkt.', 'dem', 'Helfen verlangt den Dativ. Das maskuline Relativpronomen im Dativ lautet dem.', ['der', 'dem', 'den']),
  ] },
  { name: 'Zeitformen', note: 'Präsens: ich lese. Präteritum: ich las. Perfekt: ich habe gelesen. Plusquamperfekt: ich hatte gelesen.', questions: [
    item('In welcher Zeitform steht der Satz?', 'Nora liest die Nachricht.', 'Präsens', 'Liest ist die Präsensform von lesen.', ['Perfekt', 'Präsens', 'Präteritum']),
    item('In welcher Zeitform steht der Satz?', 'Nora las die Nachricht.', 'Präteritum', 'Las ist die Präteritumform von lesen.', ['Präsens', 'Perfekt', 'Präteritum']),
    item('In welcher Zeitform steht der Satz?', 'Nora hat die Nachricht gelesen.', 'Perfekt', 'Das Perfekt besteht hier aus hat im Präsens und dem Partizip gelesen.', ['Perfekt', 'Plusquamperfekt', 'Präteritum']),
    item('In welcher Zeitform steht „hatte gelesen“?', 'Nora hatte die Nachricht gelesen, bevor sie anrief.', 'Plusquamperfekt', 'Hatte ist das Hilfsverb im Präteritum. Mit gelesen bildet es das Plusquamperfekt und bezeichnet die frühere Handlung.', ['Präsens', 'Perfekt', 'Plusquamperfekt']),
    item('Ergänze das Hilfsverb im Plusquamperfekt.', 'Als ich ankam, ___ der Bus schon abgefahren. (Plusquamperfekt)', 'war', 'Bei abfahren bildet war + abgefahren das Plusquamperfekt. Die Abfahrt geschah vor dem Ankommen.'),
    item('Setze „finden“ ins Präteritum.', 'Beim Aufräumen ___ ich ein altes Foto.', 'fand', 'Die 1. Person Singular im Präteritum von finden lautet fand.'),
  ] },
]

export const grammarTest = { name: 'Grammatiktest', questions: grammar.flatMap(station => station.questions.slice(2)) }
export const dictationTest = { name: 'Minidiktat · Test', questions: dictations.flatMap(set => set.questions) }
