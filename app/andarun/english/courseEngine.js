import { courseLessons, courseUnits, courseQuestionBank, courseQuestionMap } from './courseContent'

export const COURSE_STORAGE_KEY = 'jaminova-english-course-v1'
export const REVIEW_DELAYS = [10 * 60000, 86400000, 3 * 86400000, 7 * 86400000, 14 * 86400000, 30 * 86400000]
const skills = ['grammar', 'sentence', 'vocabulary']
const isRecord = value => Boolean(value && typeof value === 'object' && !Array.isArray(value))
const validTime = value => Number.isFinite(value) && value >= 0
const safeCount = value => Number.isInteger(value) && value >= 0 ? Math.min(value, 1000000) : 0

export function emptyCourseState() {
  return { version: 1, lessons: {}, checkpoints: {}, cards: {}, session: null, history: [] }
}

export function shuffle(items, seed = 1) {
  const result = [...items]
  let state = [...String(seed)].reduce((hash, char) => Math.imul(hash ^ char.charCodeAt(0), 16777619), 2166136261) >>> 0
  for (let i = result.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    const j = Math.floor((state / 4294967296) * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function balancedQuestions(questions, seed) {
  const groups = skills.map(skill => shuffle(questions.filter(q => q.skill === skill), `${seed}-${skill}`))
  const result = []
  while (groups.some(group => group.length)) for (const group of groups) if (group.length) result.push(group.shift())
  return result
}

export function optionOrder(question, session) {
  return shuffle(question.options.map((_, i) => i), `${session.id}-${session.index}-${question.id}`)
}

export function readCourseState(raw) {
  const clean = emptyCourseState()
  if (!isRecord(raw) || raw.version !== 1) return clean
  for (const [key, ids] of [['lessons', courseLessons.map(l => l.id)], ['checkpoints', courseUnits.map(u => u.id)]]) {
    for (const id of ids) {
      const entry = raw[key]?.[id]
      if (isRecord(entry)) clean[key][id] = {
        studiedAt: validTime(entry.studiedAt) ? entry.studiedAt : null,
        passedAt: validTime(entry.passedAt) ? entry.passedAt : null,
        rounds: safeCount(entry.rounds),
        lastScore: Math.min(100, safeCount(entry.lastScore)),
      }
    }
  }
  for (const q of courseQuestionBank) {
    const entry = raw.cards?.[q.id]
    if (isRecord(entry) && validTime(entry.due) && Number.isInteger(entry.box) && entry.box >= 0 && entry.box <= 5) {
      clean.cards[q.id] = {
        box: entry.box, due: entry.due, attempts: safeCount(entry.attempts),
        correct: Math.min(safeCount(entry.correct), safeCount(entry.attempts)),
        lastAt: validTime(entry.lastAt) ? entry.lastAt : 0,
        lastCorrect: entry.lastCorrect === true,
        lastWrongAt: validTime(entry.lastWrongAt) ? entry.lastWrongAt : null,
      }
    }
  }
  if (Array.isArray(raw.history)) clean.history = raw.history.filter(entry => isRecord(entry) && ['lesson', 'checkpoint', 'review', 'mistakes'].includes(entry.type) && validTime(entry.finishedAt) && Number.isFinite(entry.percent) && entry.percent >= 0 && entry.percent <= 100).slice(-200)
  const session = raw.session
  if (isRecord(session) && typeof session.id === 'string' && session.id.length < 100 && ['lesson', 'checkpoint', 'review', 'mistakes'].includes(session.type) && ['active', 'complete'].includes(session.status)) {
    const base = Array.isArray(session.base) ? [...new Set(session.base.filter(id => courseQuestionMap[id]))].slice(0, 20) : []
    const queue = Array.isArray(session.queue) ? session.queue.filter(id => base.includes(id)).slice(0, 40) : []
    const validTarget = session.type === 'lesson' ? courseLessons.some(l => l.id === session.targetId && base.every(id => courseQuestionMap[id].lessonId === l.id)) : session.type === 'checkpoint' ? courseUnits.some(u => u.id === session.targetId && base.every(id => courseLessons.find(l => l.id === courseQuestionMap[id].lessonId)?.unit === u.id)) : true
    if (validTarget && base.length && queue.length >= base.length && base.every(id => queue.includes(id)) && Number.isInteger(session.index) && session.index >= 0 && session.index < queue.length) {
      const firstAnswers = Object.fromEntries(base.filter(id => typeof session.firstAnswers?.[id] === 'boolean').map(id => [id, session.firstAnswers[id]]))
      const current = courseQuestionMap[queue[session.index]]
      const selected = Number.isInteger(session.selected) && session.selected >= 0 && session.selected < 4 ? session.selected : null
      clean.session = { id: session.id, type: session.type, targetId: typeof session.targetId === 'string' ? session.targetId : null, status: session.status, startedAt: validTime(session.startedAt) ? session.startedAt : 0, finishedAt: validTime(session.finishedAt) ? session.finishedAt : null, base, queue, index: session.index, firstAnswers, feedback: session.feedback === true && selected !== null && typeof firstAnswers[current.id] === 'boolean', selected, retryScheduled: Array.isArray(session.retryScheduled) ? [...new Set(session.retryScheduled.filter(id => base.includes(id)))] : [] }
    }
  }
  return clean
}

export function isLessonUnlocked(state, lessonId) {
  const index = courseLessons.findIndex(l => l.id === lessonId)
  if (index < 0) return false
  if (index === 0) return true
  const previous = courseLessons[index - 1]
  if (!state.lessons[previous.id]?.passedAt) return false
  return previous.unit === courseLessons[index].unit || Boolean(state.checkpoints[previous.unit]?.passedAt)
}

export function checkpointUnlocked(state, unitId) {
  return courseUnits.some(u => u.id === unitId) && courseLessons.filter(l => l.unit === unitId).every(l => state.lessons[l.id]?.passedAt)
}

export function getDueQuestions(state, now = Date.now(), mistakesOnly = false) {
  return courseQuestionBank.filter(q => {
    const card = state.cards[q.id]
    return card && (mistakesOnly ? card.box === 0 : card.due <= now)
  }).sort((a, b) => {
    const x = state.cards[a.id], y = state.cards[b.id]
    return Number(x.lastCorrect) - Number(y.lastCorrect) || x.due - y.due || (y.attempts - y.correct) - (x.attempts - x.correct)
  })
}

export function nextCourseStep(state) {
  for (const unit of courseUnits) {
    const lesson = courseLessons.find(l => l.unit === unit.id && !state.lessons[l.id]?.passedAt)
    if (lesson) return { type: 'lesson', id: lesson.id }
    if (!state.checkpoints[unit.id]?.passedAt) return { type: 'checkpoint', id: unit.id }
  }
  return { type: 'review', id: null }
}

export function studyLesson(state, lessonId, now = Date.now()) {
  if (!isLessonUnlocked(state, lessonId)) return state
  return { ...state, lessons: { ...state.lessons, [lessonId]: { ...state.lessons[lessonId], studiedAt: now } } }
}

export function startCourseSession(state, { type, targetId = null, id = String(Date.now()), now = Date.now() }) {
  if (state.session?.status === 'active') return state
  let questions = []
  if (type === 'lesson') {
    if (!isLessonUnlocked(state, targetId) || !state.lessons[targetId]?.studiedAt) return state
    questions = courseLessons.find(l => l.id === targetId).questions
  } else if (type === 'checkpoint') {
    if (!checkpointUnlocked(state, targetId)) return state
    const candidates = courseLessons.filter(l => l.unit === targetId).flatMap(l => l.questions)
    questions = skills.flatMap(skill => shuffle(candidates.filter(q => q.skill === skill), `${id}-${skill}`).slice(0, 6))
  } else if (type === 'review' || type === 'mistakes') {
    questions = getDueQuestions(state, now, type === 'mistakes').slice(0, 20)
  } else return state
  if (!questions.length) return state
  const base = balancedQuestions(questions, id).map(q => q.id)
  return { ...state, session: { id, type, targetId, status: 'active', startedAt: now, finishedAt: null, base, queue: [...base], index: 0, firstAnswers: {}, feedback: false, selected: null, retryScheduled: [] } }
}

export function recordCard(previous, correct, now) {
  if (!correct) return { box: 0, due: now + REVIEW_DELAYS[0], attempts: (previous?.attempts || 0) + 1, correct: previous?.correct || 0, lastAt: now, lastCorrect: false, lastWrongAt: now }
  // Immediate repeats cannot move a card through the spaced-review stages.
  const dueNow = !previous || previous.due <= now
  const box = dueNow ? Math.min((previous?.box || 0) + 1, 5) : previous.box
  return { box, due: dueNow ? now + REVIEW_DELAYS[box] : previous.due, attempts: (previous?.attempts || 0) + 1, correct: (previous?.correct || 0) + 1, lastAt: now, lastCorrect: true, lastWrongAt: previous?.lastWrongAt ?? null }
}

export function answerCourseQuestion(state, selected, now = Date.now()) {
  const session = state.session
  if (!session || session.status !== 'active' || session.feedback || !Number.isInteger(selected) || selected < 0 || selected > 3) return state
  const q = courseQuestionMap[session.queue[session.index]]
  if (!q) return state
  const correct = selected === q.answer
  const firstAnswers = { ...session.firstAnswers }
  if (!(q.id in firstAnswers)) firstAnswers[q.id] = correct
  const queue = [...session.queue]
  const retryScheduled = [...session.retryScheduled]
  if (!correct && !retryScheduled.includes(q.id) && queue.length - session.index - 1 >= 3) {
    // At least three other questions when available; one correction per item.
    queue.splice(Math.min(session.index + 4, queue.length), 0, q.id)
    retryScheduled.push(q.id)
  }
  return { ...state, cards: { ...state.cards, [q.id]: recordCard(state.cards[q.id], correct, now) }, session: { ...session, queue, retryScheduled, firstAnswers, selected, feedback: true } }
}

export function getSessionResult(session) {
  if (!session) return null
  const rows = skills.map(skill => {
    const ids = session.base.filter(id => courseQuestionMap[id]?.skill === skill)
    const correct = ids.filter(id => session.firstAnswers[id] === true).length
    return { skill, total: ids.length, correct, percent: ids.length ? Math.round(100 * correct / ids.length) : null }
  })
  const total = session.base.length
  const correct = session.base.filter(id => session.firstAnswers[id] === true).length
  const percent = Math.round(100 * correct / total)
  return { total, correct, percent, rows, passed: percent >= 85 && rows.every(r => r.total === 0 || r.correct / r.total >= .75), corrections: session.queue.length - total }
}

export function advanceCourseSession(state, now = Date.now()) {
  const session = state.session
  if (!session || session.status !== 'active' || !session.feedback) return state
  if (session.index < session.queue.length - 1) return { ...state, session: { ...session, index: session.index + 1, feedback: false, selected: null } }
  const result = getSessionResult(session)
  const key = session.type === 'lesson' ? 'lessons' : session.type === 'checkpoint' ? 'checkpoints' : null
  const updated = key ? { [key]: { ...state[key], [session.targetId]: { ...state[key][session.targetId], rounds: (state[key][session.targetId]?.rounds || 0) + 1, lastScore: result.percent, passedAt: state[key][session.targetId]?.passedAt || (result.passed ? now : null) } } } : {}
  return { ...state, ...updated, session: { ...session, status: 'complete', finishedAt: now }, history: [...state.history, { id: session.id, type: session.type, targetId: session.targetId, percent: result.percent, correct: result.correct, total: result.total, finishedAt: now }].slice(-200) }
}

export function courseReport(state) {
  return ['\nJaminova English — structured course', `Lessons ready for next step: ${courseLessons.filter(l => state.lessons[l.id]?.passedAt).length}/${courseLessons.length}`, `Unit checkpoints passed: ${courseUnits.filter(u => state.checkpoints[u.id]?.passedAt).length}/${courseUnits.length}`, 'Readiness rule: at least 85% first-attempt accuracy in a round and at least 75% in each skill. Immediate corrections do not inflate that score.', ...courseLessons.filter(l => state.lessons[l.id]).map(l => `${l.number}. ${l.title}: ${state.lessons[l.id].passedAt ? 'ready for next lesson' : 'in practice'}; last round ${state.lessons[l.id].lastScore ?? '—'}%`), `Due review items: ${getDueQuestions(state).length}`, `Items needing consolidation: ${getDueQuestions(state, Date.now(), true).length}`, 'No CEFR level or speaking proficiency is inferred from multiple-choice performance.'].join('\n')
}
