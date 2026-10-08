export const ATTEMPT_REOPEN_KEY = '__radyar_attempt_reopen_v1'
export const OFFLINE_SUBMISSION_GRACE_MS = 15 * 60 * 1000
export const REOPEN_SUBMISSION_GRACE_MS = 30 * 1000
export const ATTEMPT_REOPEN_ACCESS_MS = 12 * 60 * 60 * 1000

function validOption(value) {
  return Number.isInteger(value) && value >= 0 && value <= 3
}

export function readAttemptReopen(answers) {
  const value = answers?.[ATTEMPT_REOPEN_KEY]
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const allowedQuestionIds = Array.isArray(value.allowedQuestionIds)
    ? [...new Set(value.allowedQuestionIds.filter(id => typeof id === 'string' && id))]
    : []
  const reopenedAt = typeof value.reopenedAt === 'string' ? value.reopenedAt : ''
  const reopenedUntil = typeof value.reopenedUntil === 'string' ? value.reopenedUntil : ''
  const isLegacyReopen = !value.availableUntil && Number.isFinite(Date.parse(reopenedUntil))
  const availableUntil = typeof value.availableUntil === 'string' && Number.isFinite(Date.parse(value.availableUntil))
    ? value.availableUntil
    : (isLegacyReopen ? reopenedUntil : '')
  const startedAt = typeof value.startedAt === 'string' && Number.isFinite(Date.parse(value.startedAt))
    ? value.startedAt
    : (isLegacyReopen ? reopenedAt : '')
  const inferredDuration = Number.isFinite(Date.parse(reopenedUntil)) && Number.isFinite(Date.parse(startedAt))
    ? Math.max(1, Math.ceil((Date.parse(reopenedUntil) - Date.parse(startedAt)) / 60000))
    : 0
  const durationMinutes = Number.isInteger(value.durationMinutes) && value.durationMinutes > 0
    ? value.durationMinutes
    : inferredDuration
  const hasStartWindow = Number.isFinite(Date.parse(availableUntil)) && durationMinutes > 0
  const hasStartedTimer = Number.isFinite(Date.parse(startedAt)) && Number.isFinite(Date.parse(reopenedUntil))
  if (!allowedQuestionIds.length || (!hasStartWindow && !hasStartedTimer)) return null
  return {
    version: 2,
    allowedQuestionIds,
    reopenedAt,
    availableUntil,
    durationMinutes,
    startedAt,
    reopenedUntil,
    completedAt: typeof value.completedAt === 'string' ? value.completedAt : '',
    draftAnswers: value.draftAnswers && typeof value.draftAnswers === 'object' && !Array.isArray(value.draftAnswers)
      ? value.draftAnswers
      : {},
    history: Array.isArray(value.history) ? value.history.slice(-10) : [],
  }
}

export function isAttemptReopenActive(answers, now = Date.now(), graceMs = 0) {
  const reopen = readAttemptReopen(answers)
  return Boolean(
    reopen
    && !reopen.completedAt
    && reopen.startedAt
    && Number.isFinite(Date.parse(reopen.reopenedUntil))
    && now <= Date.parse(reopen.reopenedUntil) + graceMs
  )
}

export function isAttemptReopenAvailable(answers, now = Date.now()) {
  const reopen = readAttemptReopen(answers)
  if (!reopen || reopen.completedAt) return false
  if (reopen.startedAt) return isAttemptReopenActive(answers, now)
  return Number.isFinite(Date.parse(reopen.availableUntil)) && now <= Date.parse(reopen.availableUntil)
}

export function startAttemptReopen(answers, now = new Date()) {
  const reopen = readAttemptReopen(answers)
  if (!reopen || reopen.completedAt || reopen.startedAt || now.getTime() > Date.parse(reopen.availableUntil)) return answers
  const startedAt = now.toISOString()
  const reopenedUntil = new Date(now.getTime() + reopen.durationMinutes * 60 * 1000).toISOString()
  return {
    ...(answers || {}),
    [ATTEMPT_REOPEN_KEY]: { ...reopen, startedAt, reopenedUntil },
  }
}

export function getUnansweredQuestionIds(questions, answers) {
  return (questions || [])
    .filter(question => !validOption(answers?.[question.id]))
    .map(question => question.id)
}

export function openAttemptForUnanswered(answers, allowedQuestionIds, durationMinutes, now = new Date()) {
  const current = readAttemptReopen(answers)
  const reopenedAt = now.toISOString()
  const availableUntil = new Date(now.getTime() + ATTEMPT_REOPEN_ACCESS_MS).toISOString()
  const event = { reopenedAt, availableUntil, durationMinutes, allowedQuestionIds: [...allowedQuestionIds] }
  return {
    ...(answers || {}),
    [ATTEMPT_REOPEN_KEY]: {
      version: 2,
      allowedQuestionIds: [...allowedQuestionIds],
      reopenedAt,
      availableUntil,
      durationMinutes,
      startedAt: '',
      reopenedUntil: '',
      completedAt: '',
      draftAnswers: current && !current.completedAt ? current.draftAnswers : {},
      history: [...(current?.history || []), event].slice(-10),
    },
  }
}

export function mergeReopenedAnswers(questions, storedAnswers, incomingAnswers) {
  const reopen = readAttemptReopen(storedAnswers)
  const allowed = new Set(reopen?.allowedQuestionIds || [])
  return Object.fromEntries((questions || []).map(question => {
    const stored = storedAnswers?.[question.id]
    const incoming = incomingAnswers?.[question.id] ?? reopen?.draftAnswers?.[question.id]
    if (allowed.has(question.id) && validOption(incoming)) return [question.id, incoming]
    return [question.id, validOption(stored) ? stored : null]
  }))
}

export function saveAttemptReopenDraft(answers, incomingAnswers) {
  const reopen = readAttemptReopen(answers)
  if (!reopen) return answers
  const allowed = new Set(reopen.allowedQuestionIds)
  const draftAnswers = { ...reopen.draftAnswers }
  for (const [questionId, selected] of Object.entries(incomingAnswers || {})) {
    if (allowed.has(questionId) && validOption(selected)) draftAnswers[questionId] = selected
  }
  return {
    ...(answers || {}),
    [ATTEMPT_REOPEN_KEY]: { ...reopen, draftAnswers },
  }
}

export function completeAttemptReopen(answers, previousAnswers, completedAt = new Date().toISOString()) {
  const reopen = readAttemptReopen(previousAnswers)
  if (!reopen) return answers
  return {
    ...(answers || {}),
    [ATTEMPT_REOPEN_KEY]: { ...reopen, completedAt, draftAnswers: {} },
  }
}

export function attemptDeadline(exam, startedAt) {
  const start = Date.parse(startedAt)
  const personalEnd = Number.isFinite(start) ? start + Number(exam?.duration_minutes || 0) * 60 * 1000 : NaN
  const closesAt = Date.parse(exam?.closes_at)
  if (Number.isFinite(personalEnd) && Number.isFinite(closesAt)) return Math.min(personalEnd, closesAt)
  if (Number.isFinite(personalEnd)) return personalEnd
  return Number.isFinite(closesAt) ? closesAt : NaN
}
