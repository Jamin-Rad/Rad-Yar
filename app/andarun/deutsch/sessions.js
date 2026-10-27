import { getPractice, sentenceOnly } from './practice'

export function getQuestionBank(lessons) {
  return lessons.flatMap(lesson => {
    const practice = getPractice(lesson)
    return [
      ...(lesson.reading?.questions || []).map((item, index) => ({ ...item, answerKey: `${lesson.id}-reading-${index}`, section: 'Lesen', reading: lesson.reading })),
      ...[...practice.vocabulary, ...practice.grammar].map((item, index) => ({ ...item, answerKey: `${lesson.id}-test-v2-${index}`, section: index < practice.vocabulary.length ? 'Wörter im Kontext' : 'Grammatik' })),
      ...(lesson.grammar || []).map((item, index) => {
        const match = practice.grammar.findIndex(current => sentenceOnly(current.question) === sentenceOnly(item.question) && JSON.stringify(current.options) === JSON.stringify(item.options))
        return { ...item, question: sentenceOnly(item.question), answerKey: `${lesson.id}-grammar-${index}`, section: 'Grammatik · frühere Aufgabe', legacy: true, supersededBy: match >= 0 ? `${lesson.id}-test-v2-${practice.vocabulary.length + match}` : undefined }
      }),
      ...(lesson.vocabulary_quiz || []).map((item, index) => ({ ...item, answerKey: `${lesson.id}-vocabquiz-${index}`, section: 'Wörter · frühere Aufgabe', legacy: true, reading: lesson.reading })),
      ...(lesson.listening?.questions || []).map((item, index) => ({ ...item, answerKey: `${lesson.id}-listening-${index}`, section: 'Hören', audio: lesson.listening })),
    ].map(item => ({ ...item, section: `${lesson.title} · ${item.section}` }))
  })
}

export function isWrongAnswer(item, answers) {
  if (item.supersededBy && Number.isInteger(answers[item.supersededBy])) return false
  return Number.isInteger(answers[item.answerKey]) && answers[item.answerKey] !== item.answer
}

export function makePracticeSession(bank, answers, mode, random = Math.random) {
  const items = bank.filter(item => mode === 'mistakes' ? isWrongAnswer(item, answers) : !item.legacy)
  for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [items[i], items[j]] = [items[j], items[i]] }
  return { id: `practice-${Date.now()}-${Math.random().toString(36).slice(2)}`, mode, items: mode === 'random' ? items.slice(0, 20) : items, answers: {} }
}
