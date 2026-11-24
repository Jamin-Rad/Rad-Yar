import { validStudySession } from './mobinStudyTime'

const storageKey = 'mobin_remote_study_time_v1'
let snapshot
let pending

function readSnapshot() {
  if (snapshot) return snapshot
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey))
    if (/^v1:[1-9]\d{0,17}$/.test(saved?.cursor) &&
      Array.isArray(saved.sessions) && saved.sessions.every(validStudySession) &&
      Array.isArray(saved.mathSessions) && saved.mathSessions.every(s => typeof s?.id === 'string' && s.studyDays && typeof s.studyDays === 'object')) {
      snapshot = saved
    }
  } catch { /* A new tab or unavailable storage starts with a full read. */ }
  return snapshot
}

function applyChanges(previous, changed, deleted) {
  const rows = new Map(previous.map(row => [row.id, row]))
  for (const id of deleted) rows.delete(id)
  for (const row of changed) rows.set(row.id, row)
  return [...rows.values()]
}

async function refresh() {
  const previous = readSnapshot()
  const query = previous ? '?since=' + encodeURIComponent(previous.cursor) : ''
  const response = await fetch('/api/mobin/study-time' + query, { cache: 'no-store', signal: AbortSignal.timeout(10000) })
  if (response.status === 401 || response.status === 403) {
    snapshot = undefined
    try { sessionStorage.removeItem(storageKey) } catch {}
    return { sessions: [], mathSessions: [], localOnly: true }
  }
  if (!response.ok) throw new Error('Lernzeit konnte nicht geladen werden')
  if (response.status === 204 && previous) return previous

  const data = await response.json()
  if (data.localOnly || !data.cursor) return data
  const next = data.full
    ? { cursor: data.cursor, sessions: data.sessions, mathSessions: data.mathSessions }
    : {
        cursor: data.cursor,
        sessions: applyChanges(previous.sessions, data.sessions, data.deleted),
        mathSessions: applyChanges(previous.mathSessions, data.mathSessions, data.deletedMath),
      }
  // Save the cursor and its exact rows together. A failed read can retry the previous cursor.
  snapshot = next
  try { sessionStorage.setItem(storageKey, JSON.stringify(next)) } catch {}
  return next
}

export function refreshMobinStudyTime() {
  if (!pending) pending = refresh().finally(() => { pending = undefined })
  return pending
}
