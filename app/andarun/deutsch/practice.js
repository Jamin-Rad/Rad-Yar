import { refineVocabulary } from './vocabularyExercises'
import * as currentRevision from './exerciseRevisions'
import * as previousRevision from './exerciseRevisions.previous'

// Prepared sentence exercises; no generation service is needed during practice.
const contexts = {
  erreichbar: 'Während der Dienstreise bin ich unter meiner privaten Nummer erreichbar.',
  'subtiler Druck': 'Obwohl niemand Überstunden verlangt, entsteht im Team subtiler Druck.',
  unbeantwortet: 'Meine Bitte um einen Rückruf blieb leider unbeantwortet.',
  konsequent: 'Um sich besser zu erholen, verzichtet sie konsequent auf berufliche Nachrichten am Wochenende.',
  Besprechung: 'Die nächste Besprechung findet am Dienstag im Konferenzraum statt.',
  'Dringende Fragen': 'Dringende Fragen klären wir sofort, alles andere hat bis morgen Zeit.',
  Flexibilitaet: 'Gleitzeit gibt Eltern mehr Flexibilitaet bei der Betreuung ihrer Kinder.',
  verlaesslicher: 'Durch feste Absprachen wird die gemeinsame Planung verlaesslicher.',
  offiziell: 'Die neue Regelung gilt erst, wenn sie offiziell bestätigt wurde.',
  entsteht: 'Wenn Zuständigkeiten unklar sind, entsteht häufig unnötige Mehrarbeit.',
  Anfrage: 'Auf Ihre Anfrage erhalten Sie innerhalb von zwei Werktagen eine Antwort.',
  'nach Feierabend': 'Ich lese berufliche E-Mails erst wieder morgen, denn nach Feierabend gehört die Zeit meiner Familie.',
  'vorsichtig an': 'Weil das Thema heikel ist, spricht sie es zunächst vorsichtig an.',
  skeptisch: 'Da bisher keine Belege vorliegen, bleibt der Betriebsrat skeptisch.',
  'klare Grenzen': 'Damit niemand ständig arbeiten muss, brauchen wir klare Grenzen.',
  Zusammenarbeit: 'Gegenseitiges Vertrauen ist die Grundlage einer erfolgreichen Zusammenarbeit.',
  Vorgesetzter: 'Mein Vorgesetzter entscheidet, ob ich freitags von zu Hause arbeiten darf.',
  nachvollziehen: 'Nach deiner ausführlichen Erklärung kann ich die Entscheidung nachvollziehen.',
  erfordern: 'Die neuen Datenschutzregeln erfordern eine Anpassung unserer Abläufe.',
  erheblich: 'Seit der Umstellung brauchen wir erheblich weniger Papier.',
  verbindlich: 'Bitte teilen Sie uns verbindlich mit, ob Sie an dem Termin teilnehmen.',
  'transparent dokumentiert': 'Damit alle die Gründe kennen, wird jede Entscheidung transparent dokumentiert.',
  'sachliche Argumente': 'In einer schwierigen Diskussion helfen sachliche Argumente mehr als persönliche Angriffe.',
  'grundsätzliche Ablehnung': 'Seine grundsätzliche Ablehnung macht eine gemeinsame Lösung nahezu unmöglich.',
}

const grammarPractice = [
  ['Wir besprechen die Änderung mit ___ Kollegin.', ['der', 'die', 'den', 'des'], 0, '„Mit“ verlangt den Dativ. „Kollegin“ ist feminin: mit der Kollegin.'],
  ['Sie bittet ihren Vorgesetzten ___ eine schriftliche Bestätigung.', ['an', 'um', 'mit', 'über'], 1, 'Die feste Verbindung lautet „bitten um + Akkusativ“. Sie bittet um eine Bestätigung.'],
  ['Wegen ___ neuen Regelung müssen wir den Ablauf ändern.', ['die', 'dem', 'der', 'den'], 2, '„Wegen“ verlangt hier den Genitiv. „Regelung“ ist feminin: wegen der neuen Regelung.'],
  ['Ich antworte später, weil ich gerade ___.', ['bin in einer Besprechung', 'in einer Besprechung bin', 'in bin einer Besprechung', 'bin ich in einer Besprechung'], 1, 'Nach „weil“ steht das konjugierte Verb am Ende des Nebensatzes. Hier lautet es: weil ich gerade in einer Besprechung bin.'],
  ['___ Sie mir die neue Uhrzeit bitte bestätigen?', ['Würden', 'Werdet', 'Wurde', 'Würdest'], 0, 'Der Konjunktiv II macht die Bitte höflich. Zur Anrede „Sie“ passt „würden“.'],
  ['Die Entscheidung ___ morgen schriftlich mitgeteilt.', ['hat', 'ist', 'wird', 'werden'], 2, 'Das Vorgangspassiv besteht aus „werden“ und Partizip II. Das Subjekt steht im Singular: die Entscheidung wird mitgeteilt.'],
  ['Sie schlägt ___, dringende Fragen telefonisch zu klären.', ['an', 'vor', 'auf', 'mit'], 1, '„Vorschlagen“ ist ein trennbares Verb. Im Hauptsatz steht „vor“ am Satzende.'],
  ['Seit drei Wochen ___ wir auf eine Antwort.', ['warteten gestern', 'gewartet', 'warten', 'warten werden'], 2, '„Seit“ bezeichnet einen Zeitraum, der bis in die Gegenwart reicht. Deshalb steht hier das Präsens: wir warten.'],
  ['Trotzdem ___ wir eine gemeinsame Lösung.', ['wir suchen', 'suchen', 'zu suchen', 'gesucht'], 1, 'Im Hauptsatz steht das finite Verb an Position zwei. Nach „trotzdem“ folgt deshalb „suchen wir“.'],
  ['Ich unterscheide ___ dringenden und normalen Anfragen.', ['für', 'über', 'an', 'zwischen'], 3, 'Die Verbindung lautet „unterscheiden zwischen + Dativ“. Hier steht der Dativ Plural: zwischen dringenden und normalen Anfragen.'],
  ['Ich schalte das Handy aus, ___ ich mich erholen kann.', ['obwohl', 'damit', 'trotzdem', 'wegen'], 1, '„Damit“ leitet einen Zwecksatz ein. Das finite Verb steht am Ende: damit ich mich erholen kann.'],
  ['Wenn ich mehr Zeit ___, würde ich ausführlicher antworten.', ['habe gehabt', 'hat', 'hätte', 'hättest'], 2, 'Eine hypothetische Bedingung wird mit dem Konjunktiv II formuliert. Zu „ich“ passt „hätte“.'],
  ['Das ist die Kollegin, ___ Vorschlag wir angenommen haben.', ['deren', 'dessen', 'denen', 'derer'], 0, 'Das Relativpronomen drückt hier Besitz aus und steht im Genitiv. Bezogen auf „die Kollegin“ lautet es „deren“.'],
  ['Er hat versprochen, die Unterlagen rechtzeitig ___.', ['schicken zu', 'zu schicken', 'schickt', 'zu geschickt'], 1, 'Nach „versprechen“ kann eine Infinitivgruppe mit „zu“ stehen. Der Infinitiv lautet „zu schicken“.'],
  ['Je klarer die Regeln sind, ___ leichter fällt die Planung.', ['weil', 'als', 'desto', 'ob'], 2, 'Die zweiteilige Verbindung lautet „je … desto“. Nach „desto leichter“ folgt das Verb „fällt“.'],
].map(([question, options, answer, explanation]) => ({ question, options, answer, explanation }))

function legacySentenceOnly(question = '') {
  const quote = question.match(/[„“"]([^„“"]*___[^„“"]*)[“”"]/)
  if (quote) return quote[1]
  return question.replace(/^(?:Ergänze(?: richtig)?|Wähle(?: die richtige Form)?|Welche (?:Form|Präposition(?: und welcher Kasus)?|Artikel).*?(?:passt|passen|korrekt))\s*:\s*/i, '').replace(/^[„“"]|[“”"]$/g, '')
}

export function sentenceOnly(question = '') {
  const instruction = /^(?:(?:Bitte\s+)?(?:Ergänze|Ergänzen Sie|Fülle|Füllen Sie|Vervollständige|Vervollständigen Sie|Setze|Setzen Sie|Trage|Tragen Sie|Wähle|Wählen Sie)|(?:Welche (?:Form|Präposition|Artikel)))/i
  const raw = question.trim()
  let text = instruction.test(raw) || /^[„“\"]/.test(raw) ? legacySentenceOnly(raw) : raw
  while (instruction.test(text)) {
    const prefix = text.match(/^([^:.!?\n]+)[:.!?\n]\s*([\s\S]+)$/)
    if (!prefix || prefix[1].includes('___') || !prefix[2].includes('___')) break
    text = prefix[2].trim()
  }
  return text
}

export function getPractice(lesson, { legacy = false, previous = false, fullPhrases = false } = {}) {
  const { reviseVocabulary, reviseGrammar, getReviewedVocabulary } = previous ? previousRevision : currentRevision
  const words = lesson?.reading?.vocabulary || []
  const supplied = (lesson?.vocabulary_quiz || []).filter(item => item.question?.includes('___'))
  const vocabulary = [...supplied]
  for (const [index, word] of words.entries()) {
    if (supplied.some(item => (item.sourceTerm || item.options?.[item.answer])?.toLocaleLowerCase('de') === word.term?.toLocaleLowerCase('de'))) continue
    const reviewed = legacy ? null : getReviewedVocabulary(word.term)
    if (!legacy && !reviewed) continue
    const sentence = reviewed?.question ? reviewed.question.replace('___', word.term) : contexts[word.term] || word.example
    if (!sentence || !word.term) continue
    const position = sentence.toLocaleLowerCase('de').indexOf(word.term.toLocaleLowerCase('de'))
    if (position < 0) continue
    const question = `${sentence.slice(0, position)}___${sentence.slice(position + word.term.length)}`
    if (vocabulary.some(item => item.question === question)) continue
    // The old alternatives are only retained for reviewing historical answers.
    const distractors = legacy ? [...new Set(words.filter(other => other.term !== word.term).map(other => other.term))].slice(0, 3) : reviewed.distractors
    if (distractors.length < 3) continue
    const answer = index % 4
    const options = [...distractors]; options.splice(answer, 0, word.term)
    vocabulary.push({ question, options, answer, explanation: `${sentence}\n${word.de || ''}` })
  }
  const existing = (lesson?.id === 'deutsch-001-digitale-erreichbarkeit' ? [] : lesson?.grammar || []).filter(item => item.question?.includes('___')).map(item => ({ ...item, question: (legacy || previous || fullPhrases ? legacySentenceOnly : sentenceOnly)(item.question) }))
  const grammar = [...existing]
  for (const item of grammarPractice) {
    if (grammar.length >= 15) break
    if (!grammar.some(other => other.question === item.question)) grammar.push(item)
    if (grammar.length >= Math.max(15, existing.length)) break
  }
  return legacy ? { vocabulary, grammar } : { vocabulary: vocabulary.map(reviseVocabulary).map(item => previous || fullPhrases ? item : refineVocabulary(item)), grammar: grammar.map(item => { const revised = reviseGrammar(item); return previous || fullPhrases ? revised : { ...revised, question: sentenceOnly(revised.question) } }) }
}
