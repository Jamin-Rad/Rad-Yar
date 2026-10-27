import { getPractice, sentenceOnly } from './practice'

function questionSignature(item) { return JSON.stringify([item.question, item.options, item.answer]) }
function exerciseId(item) {
  let hash = 2166136261
  for (const char of questionSignature(item)) hash = Math.imul(hash ^ char.codePointAt(0), 16777619)
  return (hash >>> 0).toString(36)
}

// Category selection and global practice share source keys. Revised questions do
// not reinterpret an old option index; previous mistakes remain reviewable.
export function getLessonTests(lesson) {
  const current = getPractice(lesson)
  const previous = getPractice(lesson, { legacy: true })
  const legacy = []
  const result = { vocabulary: [], grammar: [], legacy }
  for (const kind of ['vocabulary', 'grammar']) {
    const matched = new Set()
    result[kind] = current[kind].map((item, index) => {
      const correct = item.options?.[item.answer]
      const previousIndex = kind === 'grammar' || previous[kind][index]?.options?.[previous[kind][index]?.answer] === correct ? index : previous[kind].findIndex(prior => prior.options?.[prior.answer] === correct)
      if (previousIndex >= 0) matched.add(previousIndex)
      const prior = previous[kind][previousIndex]
      const priorIndex = kind === 'grammar' ? previous.vocabulary.length + previousIndex : previousIndex
      const priorKey = `${lesson.id}-test-v2-${priorIndex}`
      const changed = !prior || questionSignature(item) !== questionSignature(prior)
      const answerKey = changed ? `${lesson.id}-test-v3-${kind}-${exerciseId(item)}` : priorKey
      if (changed && prior) legacy.push({ ...prior, answerKey: priorKey, section: kind === 'grammar' ? 'Grammatik · frühere Aufgabe' : 'Wörter · frühere Aufgabe', kind, legacy: true, supersededBy: answerKey })
      return { ...item, answerKey, kind, section: kind === 'grammar' ? 'Grammatik' : 'Wörter im Kontext' }
    })
    previous[kind].forEach((item, index) => {
      if (!matched.has(index)) legacy.push({ ...item, answerKey: `${lesson.id}-test-v2-${kind === 'grammar' ? previous.vocabulary.length + index : index}`, kind, section: kind === 'grammar' ? 'Grammatik · frühere Aufgabe' : 'Wörter · frühere Aufgabe', legacy: true })
    })
  }
  return result
}

function normalizedPhrase(text = '') {
  return text.toLocaleLowerCase('de').replaceAll('ä', 'ae').replaceAll('ö', 'oe').replaceAll('ü', 'ue').replaceAll('ß', 'ss').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
}
function mentionedVocabulary(lesson, question) {
  const text = ` ${normalizedPhrase(question)} `
  return [...(lesson.reading?.vocabulary || [])].sort((a, b) => b.term.length - a.term.length).find(word => text.includes(` ${normalizedPhrase(word.term)} `))
}

export function getQuestionBank(lessons) {
  return lessons.flatMap(lesson => {
    const tests = getLessonTests(lesson)
    const previous = getPractice(lesson, { legacy: true })
    return [
      ...(lesson.reading?.questions || []).map((item, index) => ({ ...item, answerKey: `${lesson.id}-reading-${index}`, section: 'Lesen', reading: lesson.reading })),
      ...tests.vocabulary, ...tests.grammar, ...tests.legacy,
      ...(lesson.grammar || []).map((item, index) => {
        const match = previous.grammar.findIndex(current => sentenceOnly(current.question) === sentenceOnly(item.question) && JSON.stringify(current.options) === JSON.stringify(item.options))
        return { ...item, question: sentenceOnly(item.question), answerKey: `${lesson.id}-grammar-${index}`, section: 'Grammatik · frühere Aufgabe', legacy: true, supersededBy: match >= 0 ? tests.grammar[match]?.answerKey : undefined, supersededByHistory: match >= 0 ? [`${lesson.id}-test-v2-${previous.vocabulary.length + match}`] : [] }
      }),
      ...(lesson.vocabulary_quiz || []).map((item, index) => {
        const correct = item.options?.[item.answer]
        const target = mentionedVocabulary(lesson, item.question)
        const match = tests.vocabulary.find(current => current.options?.[current.answer] === correct) || tests.vocabulary.find(current => normalizedPhrase(current.options?.[current.answer]) === normalizedPhrase(target?.term) && target)
        const priorIndex = previous.vocabulary.findIndex(prior => normalizedPhrase(prior.options?.[prior.answer]) === normalizedPhrase(match?.options?.[match?.answer]) && match)
        return { ...item, answerKey: `${lesson.id}-vocabquiz-${index}`, section: 'Wörter · frühere Aufgabe', legacy: true, reading: lesson.reading, supersededBy: match?.answerKey, supersededByHistory: priorIndex >= 0 ? [`${lesson.id}-test-v2-${priorIndex}`] : [] }
      }),
      ...(lesson.listening?.questions || []).map((item, index) => ({ ...item, answerKey: `${lesson.id}-listening-${index}`, section: 'Hören', audio: lesson.listening })),
    ].map(item => ({ ...item, section: `${lesson.title} · ${item.section}` }))
  })
}

export function isWrongAnswer(item, answers) {
  if ([item.supersededBy, ...(item.supersededByHistory || [])].some(key => key && Number.isInteger(answers[key]))) return false
  return Number.isInteger(answers[item.answerKey]) && answers[item.answerKey] !== item.answer
}

export function getMistakeQuestions(bank, answers) {
  const seen = new Set()
  const byKey = new Map(bank.map(item => [item.answerKey, item]))
  const mistakes = []
  for (const item of bank) {
    if (!isWrongAnswer(item, answers)) continue
    const current = byKey.get(item.supersededBy) || item
    if (seen.has(current.answerKey)) continue
    seen.add(current.answerKey)
    mistakes.push(current)
  }
  return mistakes
}

export function makePracticeSession(bank, answers, mode, random = Math.random) {
  const items = mode === 'mistakes' ? getMistakeQuestions(bank, answers) : bank.filter(item => !item.legacy)
  for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [items[i], items[j]] = [items[j], items[i]] }
  return { id: `practice-${Date.now()}-${Math.random().toString(36).slice(2)}`, mode, items: mode === 'random' ? items.slice(0, 20) : items, answers: {} }
}
