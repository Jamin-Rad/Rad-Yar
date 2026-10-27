import { getPractice } from './practice'

export function getQuestionBank(lessons) {
  return lessons.flatMap(lesson => {
    const practice = getPractice(lesson)
    return [
      ...(lesson.reading?.questions || []).map((item, index) => ({ ...item, answerKey: `${lesson.id}-reading-${index}`, section: 'Lesen', reading: lesson.reading })),
      ...[...practice.vocabulary, ...practice.grammar].map((item, index) => ({ ...item, answerKey: `${lesson.id}-test-v2-${index}`, section: index < practice.vocabulary.length ? 'Wörter im Kontext' : 'Grammatik' })),
      ...(lesson.listening?.questions || []).map((item, index) => ({ ...item, answerKey: `${lesson.id}-listening-${index}`, section: 'Hören', audio: lesson.listening })),
    ].map(item => ({ ...item, section: `${lesson.title} · ${item.section}` }))
  })
}

export function makePracticeSession(bank, answers, mode, random = Math.random) {
  const items = bank.filter(item => mode !== 'mistakes' || (Number.isInteger(answers[item.answerKey]) && answers[item.answerKey] !== item.answer))
  for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [items[i], items[j]] = [items[j], items[i]] }
  return { id: `practice-${Date.now()}-${Math.random().toString(36).slice(2)}`, mode, items: mode === 'random' ? items.slice(0, 20) : items, answers: {} }
}
