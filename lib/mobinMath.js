import { MATH_QUESTIONS, MATH_QUESTION_MAP, MATH_TOPICS } from '../data/mobinMathExam.js'

export const MATH_STORAGE_KEY = 'mobin_math_progress_v1'
export const MATH_SESSION_KEY = 'mobin_math_active_v1'
const MODES = new Set(['practice', 'exam', 'review'])
const isRecord = value => value && typeof value === 'object' && !Array.isArray(value)
const isoDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : null
const validId = value => typeof value === 'string' && !['__proto__', 'constructor', 'prototype'].includes(value) && /^[a-zA-Z0-9_-]{1,80}$/.test(value)
const sortedEntries = value => Object.entries(value).sort(([a], [b]) => a.localeCompare(b))
const gcd = (a, b) => { a = a < 0n ? -a : a; while (b) [a, b] = [b, a % b]; return a }

export function parseRational(input) {
  if (typeof input !== 'string' || input.length > 64) return null
  const text = input.trim().replace(/−/g, '-').replace(/٫/g, ',')
    .replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 1632))
  let numerator, denominator, isFraction = false
  const fraction = text.match(/^([+-]?\d+)\s*\/\s*(\d+)$/)
  const mixed = text.match(/^([+-]?\d+)\s+(\d+)\s*\/\s*(\d+)$/)
  if (mixed) {
    denominator = BigInt(mixed[3])
    const whole = BigInt(mixed[1])
    const part = BigInt(mixed[2])
    if (!denominator || part >= denominator) return null
    numerator = (whole < 0n ? -whole : whole) * denominator + part
    if (mixed[1].startsWith('-')) numerator = -numerator
    isFraction = true
  } else if (fraction) {
    numerator = BigInt(fraction[1]); denominator = BigInt(fraction[2]); isFraction = true
  } else if (/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(text)) {
    const negative = text.startsWith('-')
    const [whole, decimal = ''] = text.replace(/^[+-]/, '').replace(',', '.').split('.')
    numerator = BigInt((whole || '0') + decimal) * (negative ? -1n : 1n)
    denominator = 10n ** BigInt(decimal.length)
  } else return null
  if (!denominator) return null
  return { numerator, denominator, isFraction, isReduced: gcd(numerator, denominator) === 1n }
}

export function equalRationals(a, b) {
  const left = parseRational(a), right = parseRational(b)
  return Boolean(left && right && left.numerator * right.denominator === right.numerator * left.denominator)
}

export function formatMathAnswer(value) {
  return String(value).replace(/\./g, ',').replace(/-/g, '−')
}

export function gradeMathResponse(question, value) {
  if (question.type === 'choice') {
    const option = question.options.find(item => item.id === value)
    if (!option) return { valid: false, correct: false, explanation: 'Wähle zuerst eine Antwort aus.' }
    return { valid: true, correct: equalRationals(option.value, question.answer), explanation: option.explanation }
  }
  const number = parseRational(value)
  if (!number) return { valid: false, correct: false, explanation: 'Gib eine Zahl ein, zum Beispiel −0,75 oder −3/4. Die Einheit steht schon neben dem Feld.' }
  if (equalRationals(value, question.answer)) {
    if (question.format === 'reducedFraction' && (!number.isFraction || !number.isReduced)) {
      return { valid: true, correct: false, explanation: 'Der Zahlenwert stimmt. Gefragt ist aber ein vollständig gekürzter Bruch: Schreibe Zähler/Nenner und kürze beide mit demselben Faktor.' }
    }
    return { valid: true, correct: true, explanation: 'Richtig! Dein Ergebnis erfüllt die Aufgabenstellung.' }
  }
  const mistake = question.mistakes?.find(([answer]) => equalRationals(value, answer))
  return { valid: true, correct: false, explanation: mistake?.[1] || 'Das Ergebnis stimmt noch nicht. Vergleiche deinen Rechenweg mit den Schritten unten; achte besonders auf Vorzeichen, Stellenwerte und Einheiten.' }
}

export function emptyMathProgress() {
  return { version: 1, sessions: {}, bookmarks: {} }
}

function normalizeSession(value) {
  if (!isRecord(value) || !validId(value.id) || !MODES.has(value.mode) || !isoDate(value.startedAt)) return null
  const questionIds = [...new Set(Array.isArray(value.questionIds) ? value.questionIds : [])].filter(id => MATH_QUESTION_MAP.has(id)).slice(0, MATH_QUESTIONS.length)
  if (!questionIds.length) return null
  const responses = {}
  for (const id of questionIds) {
    const response = value.responses?.[id]
    if (!isRecord(response) || !isoDate(response.at) || typeof response.value !== 'string' || !gradeMathResponse(MATH_QUESTION_MAP.get(id), response.value).valid) continue
    responses[id] = { value: response.value.trim(), at: isoDate(response.at), hintUsed: Boolean(response.hintUsed) }
  }
  const studyDays = Object.fromEntries(sortedEntries(isRecord(value.studyDays) ? value.studyDays : {}).filter(([day, seconds]) => /^\d{4}-\d{2}-\d{2}$/.test(day) && Number.isFinite(seconds) && seconds >= 0).map(([day, seconds]) => [day, Math.min(86400, Math.floor(seconds))]))
  return {
    id: value.id, mode: value.mode, questionIds, responses, studyDays,
    startedAt: isoDate(value.startedAt), updatedAt: isoDate(value.updatedAt) || isoDate(value.startedAt),
    finishedAt: Object.keys(responses).length === questionIds.length ? isoDate(value.finishedAt) : null,
  }
}

export function normalizeMathProgress(value) {
  if (!isRecord(value)) return emptyMathProgress()
  const sessions = {}
  for (const [id, session] of sortedEntries(isRecord(value.sessions) ? value.sessions : {})) {
    const normalized = normalizeSession(session)
    if (normalized && id === normalized.id) sessions[id] = normalized
  }
  const bookmarks = {}
  for (const [id, bookmark] of sortedEntries(isRecord(value.bookmarks) ? value.bookmarks : {})) {
    if (MATH_QUESTION_MAP.has(id) && isRecord(bookmark) && isoDate(bookmark.at)) bookmarks[id] = { active: Boolean(bookmark.active), at: isoDate(bookmark.at) }
  }
  return { version: 1, sessions, bookmarks }
}

export function mergeMathProgress(leftValue, rightValue) {
  const left = normalizeMathProgress(leftValue), right = normalizeMathProgress(rightValue)
  const sessions = { ...left.sessions }
  for (const [id, remote] of Object.entries(right.sessions)) {
    const local = sessions[id]
    if (!local) { sessions[id] = remote; continue }
    const base = local.startedAt <= remote.startedAt ? local : remote
    const responses = {}
    for (const qid of base.questionIds) {
      const a = local.responses[qid], b = remote.responses[qid]
      // A submitted answer is immutable; concurrent submissions keep the first.
      const first = !a ? b : !b ? a : a.at <= b.at ? a : b
      if (first) responses[qid] = first
    }
    const studyDays = { ...local.studyDays }
    for (const [day, seconds] of Object.entries(remote.studyDays)) studyDays[day] = Math.max(studyDays[day] || 0, seconds)
    const finishedAt = [local.finishedAt, remote.finishedAt].filter(Boolean).sort()[0] || null
    sessions[id] = { ...base, responses, studyDays, finishedAt, updatedAt: local.updatedAt > remote.updatedAt ? local.updatedAt : remote.updatedAt }
  }
  const bookmarks = { ...left.bookmarks }
  for (const [id, bookmark] of Object.entries(right.bookmarks)) {
    if (!bookmarks[id] || bookmark.at > bookmarks[id].at) bookmarks[id] = bookmark
  }
  return normalizeMathProgress({ version: 1, sessions, bookmarks })
}

export function createMathSession(id, mode, questionIds, now = new Date().toISOString()) {
  return normalizeSession({ id, mode, questionIds, startedAt: now, updatedAt: now, responses: {}, studyDays: {} })
}

export function recordMathResponse(progress, sessionId, questionId, value, hintUsed = false, now = new Date().toISOString()) {
  const session = progress.sessions[sessionId], question = MATH_QUESTION_MAP.get(questionId)
  if (!session || session.finishedAt || !question || !session.questionIds.includes(questionId) || session.responses[questionId] || !gradeMathResponse(question, value).valid) return progress
  return { ...progress, sessions: { ...progress.sessions, [sessionId]: { ...session, updatedAt: now, responses: { ...session.responses, [questionId]: { value: value.trim(), at: now, hintUsed: Boolean(hintUsed) } } } } }
}

export function finishMathSession(progress, sessionId, now = new Date().toISOString()) {
  const session = progress.sessions[sessionId]
  if (!session || session.finishedAt || session.questionIds.some(id => !session.responses[id])) return progress
  return { ...progress, sessions: { ...progress.sessions, [sessionId]: { ...session, finishedAt: now, updatedAt: now } } }
}

export function berlinStudyDay(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
}

export function addMathStudyTime(progress, sessionId, seconds, now = new Date()) {
  const session = progress.sessions[sessionId]
  if (!session || session.finishedAt || seconds < 1) return progress
  const day = berlinStudyDay(now)
  return { ...progress, sessions: { ...progress.sessions, [sessionId]: { ...session, updatedAt: now.toISOString(), studyDays: { ...session.studyDays, [day]: (session.studyDays[day] || 0) + seconds } } } }
}

export function sessionStudySeconds(session) {
  return Object.values(session.studyDays).reduce((sum, seconds) => sum + seconds, 0)
}

export function summarizeMathProgress(progress) {
  const attempts = [], sessions = Object.values(progress.sessions).sort((a, b) => b.startedAt.localeCompare(a.startedAt))
  for (const session of sessions) {
    if (session.mode === 'exam' && !session.finishedAt) continue
    for (const [questionId, response] of Object.entries(session.responses)) {
      attempts.push({ ...response, questionId, sessionId: session.id, correct: gradeMathResponse(MATH_QUESTION_MAP.get(questionId), response.value).correct })
    }
  }
  attempts.sort((a, b) => a.at.localeCompare(b.at) || a.sessionId.localeCompare(b.sessionId))
  const latest = {}, first = {}
  for (const attempt of attempts) { latest[attempt.questionId] = attempt; first[attempt.questionId] ||= attempt }
  const reviewIds = MATH_QUESTIONS.filter(question => latest[question.id]?.correct === false || progress.bookmarks[question.id]?.active).map(question => question.id)
  const topics = MATH_TOPICS.map(topic => {
    const questions = MATH_QUESTIONS.filter(question => question.topicId === topic.id)
    return { ...topic, total: questions.length, attempted: questions.filter(q => latest[q.id]).length, correct: questions.filter(q => latest[q.id]?.correct).length, review: questions.filter(q => reviewIds.includes(q.id)).length }
  })
  return {
    sessions, latest, first, reviewIds, topics, attempts,
    attempted: Object.keys(latest).length,
    correct: Object.values(latest).filter(attempt => attempt.correct).length,
    firstCorrect: Object.values(first).filter(attempt => attempt.correct).length,
    seconds: sessions.reduce((sum, session) => sum + sessionStudySeconds(session), 0),
    completed: sessions.filter(session => session.finishedAt).length,
  }
}
