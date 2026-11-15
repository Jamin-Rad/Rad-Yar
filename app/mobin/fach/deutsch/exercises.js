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

function gap(sentence, answer, explanation) {
  return { prompt: sentence, answer, explanation }
}

export const grammar = [{
  name: 'Wortfamilien · Rechtschreibung',
  questions: [
    gap('Der Flu__ steigt nach dem Regen.', 'ss', 'Das u in Fluss ist kurz. Deshalb steht ss.'),
    gap('Das Wasser ist schon flie__end.', 'ß', 'Das ie in fließend ist lang. Deshalb steht ß.'),
    gap('Das Eis wird flü__ig.', 'ss', 'Das ü in flüssig ist kurz. Deshalb steht ss.'),
    gap('Das Floß liegt im Flu__bett.', 'ss', 'Flussbett enthält das Wort Fluss mit kurzem u.'),
    gap('Der Schlü__el passt.', 'ss', 'Das ü in Schlüssel ist kurz. Deshalb steht ss.'),
    gap('Wir müssen die Tür verschlie__en.', 'ß', 'In verschließen ist das ie lang. Deshalb steht ß.'),
    gap('Die Tür war schon aufgeschlo__en.', 'ss', 'In aufgeschlossen ist das o kurz. Deshalb steht ss.'),
    gap('Wir genie__en den Ausflug.', 'ß', 'Das ie in genießen ist lang. Deshalb steht ß.'),
    gap('Sie lächelte genü__lich.', 'ss', 'Das ü in genüsslich ist kurz. Deshalb steht ss.'),
    gap('Das Picknick war ein Genu__.', 'ss', 'Das u in Genuss ist kurz. Deshalb steht ss.'),
    gap('Mein Gewi__en ließ mir keine Ruhe.', 'ss', 'Das i in Gewissen ist kurz. Deshalb steht ss.'),
    gap('Ich wei__, wo der Schlüssel ist.', 'ß', 'Das ei in weiß ist ein Doppellaut. Deshalb steht ß.'),
    { prompt: 'Welches Wort muss großgeschrieben werden?', example: 'Ihr wissen half ihr weiter.', answer: 'Wissen', explanation: '„Ihr Wissen“ meint eine Sache. Das Nomen Wissen schreibt man groß.' },
    { prompt: 'Schreibe die Verbform, die zu „ich“ passt.', example: 'Ich ___, wie das Schloss funktioniert. (wissen)', answer: 'weiß', explanation: 'Das unregelmäßige Verb wissen lautet in der 1. Person Singular „ich weiß“.' },
    { prompt: 'Welche Grundform steckt in „abgeschlossen“?', answer: 'abschließen', explanation: 'Abgeschlossen ist das Partizip II von abschließen.' },
    { prompt: 'Bilde ein zusammengesetztes Nomen aus „Fluss“ und „Bett“.', answer: 'Flussbett', explanation: 'Das zusammengesetzte Nomen Flussbett wird zusammengeschrieben und großgeschrieben.' },
  ],
}]

export const storyWords = ['der Fluss', 'das Schloss', 'der Schlüssel', 'genüsslich', 'mein Gewissen', 'ich weiß']
