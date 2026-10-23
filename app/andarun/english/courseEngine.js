import { questions, questionMap } from './courseContent.js'

export const STORAGE_KEY = 'jaminova-english-b1-pilot-v1'
export const DAY = 86400000
export const emptyState = () => ({ version: 1, attempts: 0, mistakes: {}, session: null, history: [] })
export function shuffle(items, seed) {
  const a = [...items]
  let h = [...String(seed)].reduce((n, c) => (Math.imul(n, 31) + c.charCodeAt(0)) >>> 0, 7)
  for (let i = a.length - 1; i > 0; i--) {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0
    const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const validAnswer = n => Number.isInteger(n) && n >= 0 && n < 4
const validTime = n => Number.isFinite(n) && n >= 0
export function readState(raw) {
  const clean = emptyState()
  if (!raw || raw.version !== 1) return clean
  clean.attempts = Number.isSafeInteger(raw.attempts) && raw.attempts >= 0 ? raw.attempts : 0
  for (const q of questions) {
    const m = raw.mistakes?.[q.id]
    if (m && validTime(m.due) && [0, 1].includes(m.streak)) clean.mistakes[q.id] = { due: m.due, streak: m.streak }
  }
  clean.history = Array.isArray(raw.history) ? raw.history.filter(h => h && ['test', 'review'].includes(h.mode) && validTime(h.at) && Number.isInteger(h.correct) && Number.isInteger(h.total) && h.total > 0 && h.total <= 20 && h.correct >= 0 && h.correct <= h.total).slice(-20) : []
  const s = raw.session
  if (s && typeof s.id === 'string' && ['test', 'review'].includes(s.mode) &&
    Array.isArray(s.ids) && s.ids.length > 0 && s.ids.length <= 20 &&
    new Set(s.ids).size === s.ids.length && s.ids.every(id => Object.hasOwn(questionMap, id)) &&
    Number.isInteger(s.index) && s.index >= 0 && s.index <= s.ids.length && [0, 1].includes(s.variant)) {
    const answers = Object.fromEntries(s.ids.filter(id => validAnswer(s.answers?.[id])).map(id => [id, s.answers[id]]))
    // A session is resumable only if its completed prefix is consistent.
    if (s.ids.slice(0, s.index).every(id => validAnswer(answers[id])) && s.ids.slice(s.index + 1).every(id => answers[id] === undefined)) {
      clean.session = { id: s.id.slice(0, 100), mode: s.mode, ids: s.ids, index: s.index, variant: s.variant, answers }
    }
  }
  return clean
}
export function startSession(state, mode, now = Date.now()) {
  const ids = mode === 'review' ? questions.filter(q => state.mistakes[q.id]).map(q => q.id) : questions.map(q => q.id)
  if (!ids.length || !['test', 'review'].includes(mode)) return state
  const attempt = state.attempts + 1
  return { ...state, attempts: attempt, session: { id: `${now}-${attempt}`, mode, ids: shuffle(ids, `${now}-${attempt}`), index: 0, variant: mode === 'review' ? 1 : (attempt - 1) % 2, answers: {} } }
}
export function currentQuestion(session) {
  const concept = questionMap[session?.ids[session.index]]
  return concept ? { ...concept.variants[session.variant], id: concept.id, category: concept.category } : null
}
export const optionOrder = session => shuffle([0, 1, 2, 3], `${session.id}-${session.index}`)
export function answer(state, selected, now = Date.now()) {
  const s = state.session, q = currentQuestion(s)
  if (!q || !validAnswer(selected) || s.answers[q.id] !== undefined) return state
  const mistakes = { ...state.mistakes }, old = mistakes[q.id]
  if (selected !== q.answer) mistakes[q.id] = { due: now, streak: 0 }
  else if (s.mode === 'review' && old && now >= old.due) {
    if (old.streak === 1) delete mistakes[q.id]
    else mistakes[q.id] = { due: now + DAY, streak: 1 }
  }
  return { ...state, mistakes, session: { ...s, answers: { ...s.answers, [q.id]: selected } } }
}
export function result(session) {
  return session.ids.reduce((r, id) => {
    const category = questionMap[id].category, correct = session.answers[id] === questionMap[id].variants[session.variant].answer
    r.total++; r.correct += Number(correct)
    r.rows[category] ||= { total: 0, correct: 0 }
    r.rows[category].total++; r.rows[category].correct += Number(correct)
    return r
  }, { total: 0, correct: 0, rows: {} })
}
export function advance(state, now = Date.now()) {
  const s = state.session, q = currentQuestion(s)
  if (!q || s.answers[q.id] === undefined) return state
  const next = { ...s, index: s.index + 1 }
  const history = next.index === next.ids.length ? [...state.history, { mode: s.mode, at: now, ...result(next) }].slice(-20) : state.history
  return { ...state, session: next, history }
}
