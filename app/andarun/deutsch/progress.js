import { getWritingExercises } from './shortExercises'
import { getQuestionBank } from './sessions'

const fraction = value => Math.max(0, Math.min(1, Number(value) || 0))
export function lessonProgress(lesson, state, bank = getQuestionBank([lesson])) {
  const questions = bank.filter(item => !item.legacy && item.lessonId === lesson.id)
  const completed = items => items.length ? items.filter(item => Number.isInteger(state.answers?.[item.answerKey])).length / items.length : 0
  const status = state.lessonStatus?.[lesson.id] || {}
  const reading = Math.max(status.readAt ? 1 : 0, fraction(status.readProgress))
  const audio = fraction(status.listenProgress)
  const readingQuestions = questions.filter(item => item.kind === 'reading')
  const listeningQuestions = questions.filter(item => item.kind === 'listening')
  const sections = {
    Lesen: readingQuestions.length ? (reading + completed(readingQuestions)) / 2 : reading,
    Test: completed(questions.filter(item => item.kind === 'vocabulary' || item.kind === 'grammar')),
    Hören: listeningQuestions.length ? (audio + completed(listeningQuestions)) / 2 : audio,
    Schreiben: getWritingExercises(lesson).filter(exercise => state.writings?.some(item => item.id === exercise.id && item.kind === 'translation' && item.checkedAt && item.text?.trim())).length / 5,
  }
  return { percent: Math.round(Object.values(sections).reduce((sum, value) => sum + value, 0) * 25), sections }
}
