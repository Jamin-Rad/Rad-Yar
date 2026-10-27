import { getOrderingExercises } from './shortExercises'
import { getPractice, sentenceOnly } from './practice'

const vocabularyTerm = item => item?.sourceTerm || item?.options?.[item?.answer]

function questionSignature(item) { return item.type === 'ordering' ? JSON.stringify(['ordering', item.question, item.tokens, item.solutions]) : JSON.stringify([item.question, item.options, item.answer]) }
function exerciseId(item) {
  let hash = 2166136261
  for (const char of questionSignature(item)) hash = Math.imul(hash ^ char.codePointAt(0), 16777619)
  return (hash >>> 0).toString(36)
}

// Category selection and global practice share source keys. Revised questions do
// not reinterpret an old option index; previous mistakes remain reviewable.
export function getLessonTests(lesson) {
  const practice = getPractice(lesson)
  const current = { ...practice, grammar: [...practice.grammar, ...getOrderingExercises(lesson)] }
  const previous = getPractice(lesson, { legacy: true })
  const legacy = []
  const result = { vocabulary: [], grammar: [], legacy }
  for (const kind of ['vocabulary', 'grammar']) {
    const matched = new Set()
    result[kind] = current[kind].map((item, index) => {
      const correct = vocabularyTerm(item)
      const previousIndex = kind === 'grammar' || vocabularyTerm(previous[kind][index]) === correct ? index : previous[kind].findIndex(prior => vocabularyTerm(prior) === correct)
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
  // Retain the last published v3 bank as well as the original v2 bank.
  // New choices must never reinterpret a previously saved option index.
  for (const reviewed of [getPractice(lesson, { previous: true }), getPractice(lesson, { fullPhrases: true })]) {
    for (const kind of ['vocabulary', 'grammar']) {
      reviewed[kind].forEach((item, index) => {
        const correct = vocabularyTerm(item)
        const target = kind === 'grammar' ? result[kind][index] : result[kind].find(q => vocabularyTerm(q) === correct)
        const priorIndex = kind === 'grammar' || vocabularyTerm(previous[kind][index]) === correct ? index : previous[kind].findIndex(q => vocabularyTerm(q) === correct)
        const prior = previous[kind][priorIndex]
        const originalKey = `${lesson.id}-test-v2-${kind === 'grammar' ? previous.vocabulary.length + priorIndex : priorIndex}`
        const oldKey = prior && questionSignature(item) === questionSignature(prior) ? originalKey : `${lesson.id}-test-v3-${kind}-${exerciseId(item)}`
        if (target?.answerKey === oldKey || legacy.some(q => q.answerKey === oldKey)) return
        legacy.push({ ...item, answerKey: oldKey, kind, section: kind === 'grammar' ? 'Grammatik · frühere Aufgabe' : 'Wörter · frühere Aufgabe', legacy: true, supersededBy: target?.answerKey })
        for (const older of legacy) {
          if (older.answerKey !== oldKey && older.supersededBy === target?.answerKey) older.supersededByHistory = [...(older.supersededByHistory || []), oldKey]
        }
      })
    }
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
      ...(lesson.reading?.questions || []).map((item, index) => ({ ...item, answerKey: `${lesson.id}-reading-${index}`, kind: 'reading', section: 'Lesen', reading: lesson.reading })),
      ...tests.vocabulary, ...tests.grammar, ...tests.legacy,
      ...(lesson.grammar || []).map((item, index) => {
        const match = previous.grammar.findIndex(current => sentenceOnly(current.question) === sentenceOnly(item.question) && JSON.stringify(current.options) === JSON.stringify(item.options))
        return { ...item, question: sentenceOnly(item.question), answerKey: `${lesson.id}-grammar-${index}`, section: 'Grammatik · frühere Aufgabe', legacy: true, supersededBy: match >= 0 ? tests.grammar[match]?.answerKey : undefined, supersededByHistory: match >= 0 ? [`${lesson.id}-test-v2-${previous.vocabulary.length + match}`] : [] }
      }),
      ...(lesson.vocabulary_quiz || []).map((item, index) => {
        const correct = vocabularyTerm(item)
        const target = mentionedVocabulary(lesson, item.question)
        const match = tests.vocabulary.find(current => vocabularyTerm(current) === correct) || tests.vocabulary.find(current => normalizedPhrase(vocabularyTerm(current)) === normalizedPhrase(target?.term) && target)
        const priorIndex = previous.vocabulary.findIndex(prior => normalizedPhrase(prior.options?.[prior.answer]) === normalizedPhrase(vocabularyTerm(match)) && match)
        return { ...item, answerKey: `${lesson.id}-vocabquiz-${index}`, section: 'Wörter · frühere Aufgabe', legacy: true, reading: lesson.reading, supersededBy: match?.answerKey, supersededByHistory: priorIndex >= 0 ? [`${lesson.id}-test-v2-${priorIndex}`] : [] }
      }),
      ...(lesson.listening?.questions || []).map((item, index) => ({ ...item, answerKey: `${lesson.id}-listening-${index}`, kind: 'listening', section: 'Hören', audio: lesson.listening })),
    ].map(item => ({ ...item, lessonId: lesson.id,
      supersededByHistory: item.legacy && (item.answerKey.includes('-vocabquiz-') || item.answerKey.startsWith(`${lesson.id}-grammar-`))
        ? [...(item.supersededByHistory || []), ...tests.legacy.filter(q => item.supersededBy && q.supersededBy === item.supersededBy).map(q => q.answerKey)]
        : item.supersededByHistory,
      section: `${lesson.title} · ${item.section}` }))
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

export function makePracticeSession(bank, answers, mode, random = Math.random, { mistakeReviews = {}, now = new Date() } = {}) {
  const items = mode === 'mistakes' ? getReviewSummary(bank, answers, mistakeReviews, now).due : bank.filter(item => !item.legacy)
  for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [items[i], items[j]] = [items[j], items[i]] }
  return { id: `practice-${Date.now()}-${Math.random().toString(36).slice(2)}`, mode, items: mode === 'random' ? items.slice(0, 20) : items, answers: {} }
}

function currentQuestion(item, byKey) {
  const seen = new Set()
  while (item?.supersededBy && byKey.has(item.supersededBy) && !seen.has(item.answerKey)) {
    seen.add(item.answerKey)
    item = byKey.get(item.supersededBy)
  }
  return item
}

export function getReviewSummary(bank, answers = {}, progress = {}, now = new Date()) {
  const byKey = new Map(bank.map(item => [item.answerKey, item]))
  const records = new Map()
  for (const [key, review] of Object.entries(progress)) {
    const item = currentQuestion(byKey.get(key), byKey)
    if (!item || !Number.isInteger(review?.correctCount)) continue
    const prior = records.get(item.answerKey)
    if (!prior || Date.parse(review.lastReviewedAt || 0) >= Date.parse(prior.review.lastReviewedAt || 0)) records.set(item.answerKey, { item, review })
  }
  // Old mistakes need no destructive migration: they are due immediately until
  // their first review creates a durable record under the current question key.
  for (const item of getMistakeQuestions(bank, answers)) {
    if (!records.has(item.answerKey)) records.set(item.answerKey, { item, review: { correctCount: 0, dueAt: null, lastReviewedAt: null } })
  }
  const active = [...records.values()].filter(({ review }) => review.correctCount < 3).map(({ item, review }) => ({ ...item, review, isDue: !review.dueAt || Date.parse(review.dueAt) <= Number(now) }))
  const due = active.filter(item => item.isDue)
  const future = active.filter(item => !item.isDue).sort((a, b) => Date.parse(a.review.dueAt) - Date.parse(b.review.dueAt))
  return { active, due, future, nextDueAt: future[0]?.review.dueAt || null }
}

export function recordQuestionAnswer(state, bank, key, answer, now = new Date()) {
  const byKey = new Map(bank.map(item => [item.answerKey, item]))
  const source = byKey.get(key)
  const item = currentQuestion(source, byKey)
  const next = { ...state, answers: { ...state.answers, [key]: answer } }
  if (!item) return next
  const summary = getReviewSummary(bank, state.answers, state.mistakeReviews, now)
  const tracked = summary.active.find(q => q.answerKey === item.answerKey)
  const correct = answer === source.answer
  if (correct && (!tracked || !tracked.isDue)) return next
  const correctCount = correct ? tracked.review.correctCount + 1 : 0
  const interval = correctCount === 1 ? 3 : correctCount === 2 ? 10 : 0
  const dueAt = correctCount === 3 ? null : new Date(Number(now) + interval * 86400000).toISOString()
  const review = { correctCount, dueAt, lastReviewedAt: new Date(now).toISOString() }
  next.mistakeReviews = { ...state.mistakeReviews, [item.answerKey]: review }
  return next
}

export function clearQuestionAnswers(state, bank, items, now = new Date()) {
  const keys = new Set(items.map(item => item.answerKey))
  // Clear the old versions too, so deleting a test cannot revive stale answers.
  const family = new Set(bank.filter(item => keys.has(item.answerKey) || keys.has(item.supersededBy)).map(item => item.answerKey))
  const mistakeReviews = { ...state.mistakeReviews }
  for (const item of getReviewSummary(bank, state.answers, mistakeReviews, now).active) {
    if (!mistakeReviews[item.answerKey]) mistakeReviews[item.answerKey] = { ...item.review, dueAt: item.review.dueAt || new Date(now).toISOString(), lastReviewedAt: item.review.lastReviewedAt || new Date(0).toISOString() }
  }
  return { ...state, mistakeReviews, answers: Object.fromEntries(Object.entries(state.answers).filter(([key]) => !family.has(key))) }
}
