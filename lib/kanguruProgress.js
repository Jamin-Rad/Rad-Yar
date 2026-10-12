import { practiceDays } from './kanguruStreak.js'

export function normalizeProgress(value) {
  const state = value && typeof value === 'object' ? value : {}
  return {
    version: 3,
    gradeGroup: state.gradeGroup === '7-8' ? '7-8' : '5-6',
    attempts: Object.fromEntries(Object.entries(state.attempts && typeof state.attempts === 'object' ? state.attempts : {}).slice(-5000)),
    practiceDays: practiceDays(state).slice(-10000),
    updatedAt: typeof state.updatedAt === 'string' ? state.updatedAt : null,
  }
}

export function mergeProgress(localState, remoteState) {
  const local = normalizeProgress(localState)
  const remote = normalizeProgress(remoteState)
  const attempts = { ...remote.attempts }
  for (const [id, attempt] of Object.entries(local.attempts)) {
    const previous = attempts[id]
    const timestamp = attempt?.updatedAt || attempt?.lastAnsweredAt || ''
    const previousTimestamp = previous?.updatedAt || previous?.lastAnsweredAt || ''
    if (!previous || timestamp >= previousTimestamp) attempts[id] = attempt
  }
  const localIsNewer = String(local.updatedAt || '') >= String(remote.updatedAt || '')
  return {
    version: 3,
    gradeGroup: localIsNewer ? local.gradeGroup : remote.gradeGroup,
    attempts,
    practiceDays: [...new Set([...local.practiceDays, ...remote.practiceDays])].sort(),
    updatedAt: localIsNewer ? local.updatedAt : remote.updatedAt,
  }
}
