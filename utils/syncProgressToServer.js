// Central progress reconciliation for signed-in users.
// localStorage remains the offline cache; Supabase is the cross-device source.

import { activateUserCache, getUserCacheToken, isUserCacheCurrent, persistCurrentUserCache } from './progressCache.js'
import { mergeReadState, readVersion } from './readProgressStore.js'
import { flushPendingProgress } from './progressSync.js'
import { syncActivityToServer } from './activityStorage.js'
export { activateUserCache } from './progressCache.js'

const SESSION_KEY_PREFIX = 'radyar_progress_synced_v4_'
const inFlight = new Map()

function notifySyncState(userId, state) {
  window.dispatchEvent(new CustomEvent('radyar:progress-sync-state', { detail: { userId, state } }))
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback))
  } catch {
    return fallback
  }
}

function timeOf(value) {
  const time = new Date(value || 0).getTime()
  return Number.isFinite(time) ? time : 0
}

async function requestJson(url, options) {
  const response = await fetch(url, options)
  if (!response.ok) {
    let message = `HTTP ${response.status}`
    try {
      const body = await response.json()
      if (body?.error) message = body.error
    } catch {}
    throw new Error(message)
  }
  return response.json()
}

function mergeMcqProgress(serverData) {
  const scores = readJson('radyar_mcq_scores', {})
  for (const [topicId, serverResult] of Object.entries(serverData.scores || {})) {
    const localResult = scores[topicId]
    if (!localResult || timeOf(serverResult.lastDate) >= timeOf(localResult.lastDate)) {
      scores[topicId] = serverResult
    }
  }
  localStorage.setItem('radyar_mcq_scores', JSON.stringify(scores))
  return scores
}

function mergeLeitnerProgress(userId, serverData) {
  const key = `radyar_leitner_${userId}`
  const cards = readJson(key, {})
  for (const [cardId, serverRecord] of Object.entries(serverData.cards || {})) {
    const localRecord = cards[cardId]
    const localTime = timeOf(localRecord?.lastReviewedAt || localRecord?.lastSeenAt || localRecord?.addedAt)
    const serverTime = timeOf(serverRecord?.lastReviewedAt || serverRecord?.lastSeenAt || serverRecord?.addedAt)
    if (!localRecord || serverTime >= localTime) cards[cardId] = serverRecord
  }
  localStorage.setItem(key, JSON.stringify(cards))
  return cards
}

function postJson(url, body, userId) {
  return requestJson(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Radyar-User-Id': userId },
    body: JSON.stringify(body),
  })
}

async function reconcileProgress(userId) {
  activateUserCache(userId)
  const token = getUserCacheToken(userId)
  if (!await flushPendingProgress(userId)) throw new Error('Pending progress upload failed')
  if (!isUserCacheCurrent(userId, token)) return null
  const options = { cache: 'no-store', headers: { 'X-Radyar-User-Id': userId } }

  const [readResult, mcqResult, leitnerResult, activityResult] = await Promise.allSettled([
    requestJson('/api/progress/read-status', options),
    requestJson('/api/progress/mcq-results', options),
    requestJson('/api/progress/leitner', options),
    syncActivityToServer(userId),
  ])
  if (!isUserCacheCurrent(userId, token)) return null

  const read = readResult.status === 'fulfilled'
    ? mergeReadState(userId, readResult.value)
    : {
        articles: readJson('radyar_read_articles', {}),
        history: readJson('radyar_learning_history', []),
      }
  const mcqScores = mcqResult.status === 'fulfilled'
    ? mergeMcqProgress(mcqResult.value)
    : readJson('radyar_mcq_scores', {})
  const leitnerState = leitnerResult.status === 'fulfilled'
    ? mergeLeitnerProgress(userId, leitnerResult.value)
    : readJson(`radyar_leitner_${userId}`, {})
  persistCurrentUserCache(userId)
  const readBulk = read.state ? Object.entries(read.state.records)
    .filter(([id, record]) => (!read.state.reset || readVersion(record) > readVersion(read.state.reset)) &&
      (!read.server.records[id] || (!record.legacy && readVersion(record) > readVersion(read.server.records[id]))))
    .map(([themaId, record]) => ({ themaId, ...record })) : []
  const reset = read.state?.reset && readVersion(read.state.reset) > readVersion(read.server.reset) ? read.state.reset : null

  const uploads = []
  for (let offset = 0; offset < Math.max(reset ? 1 : 0, readBulk.length); offset += 1000) {
    uploads.push(postJson('/api/progress/read-status', { bulk: readBulk.slice(offset, offset + 1000), reset }, userId))
  }
  if (mcqResult.status === 'fulfilled' && Object.keys(mcqScores).length) uploads.push(postJson('/api/progress/mcq-results', { bulk: mcqScores }, userId))
  if (leitnerResult.status === 'fulfilled' && Object.keys(leitnerState).length) uploads.push(postJson('/api/progress/leitner', { bulk: leitnerState }, userId))
  const uploadResults = await Promise.allSettled(uploads)
  if (!isUserCacheCurrent(userId, token)) return null
  const failedUpload = uploadResults.find(result => result.status === 'rejected')
  if (failedUpload) {
    throw failedUpload.reason || new Error('Progress upload failed')
  }
  const failedPull = [readResult, mcqResult, leitnerResult, activityResult].find(result => result.status === 'rejected')
  if (failedPull) {
    throw failedPull.reason || new Error('Progress download failed')
  }
  if (readBulk.length || reset) {
    const confirmed = await requestJson('/api/progress/read-status', options)
    if (!isUserCacheCurrent(userId, token)) return null
    Object.assign(read, mergeReadState(userId, confirmed))
  }

  sessionStorage.setItem(`${SESSION_KEY_PREFIX}${userId}`, '1')
  window.dispatchEvent(new CustomEvent('radyar:progress-synced', {
    detail: { userId, read, mcqScores, leitnerState, activity: activityResult.value },
  }))
  return { read, mcqScores, leitnerState, activity: activityResult.value }
}

export function markProgressSyncPending(userId) {
  if (typeof window === 'undefined' || !userId) return
  sessionStorage.removeItem(`${SESSION_KEY_PREFIX}${userId}`)
}

export async function syncLocalProgressToServer(userId, { throwOnError = false } = {}) {
  if (typeof window === 'undefined' || !userId) return null
  activateUserCache(userId)
  const sessionKey = `${SESSION_KEY_PREFIX}${userId}`
  const flightKey = `${userId}:${getUserCacheToken(userId)}`
  let promise = inFlight.get(flightKey)
  if (!promise) {
    const token = getUserCacheToken(userId)
    notifySyncState(userId, 'loading')
    promise = reconcileProgress(userId)
      .then(result => {
        if (result && isUserCacheCurrent(userId, token)) notifySyncState(userId, 'synced')
        return result
      })
      .catch(error => {
        if (isUserCacheCurrent(userId, token)) notifySyncState(userId, typeof navigator !== 'undefined' && !navigator.onLine ? 'offline' : 'error')
        throw error
      })
      .finally(() => inFlight.delete(flightKey))
    inFlight.set(flightKey, promise)
  }
  try {
    return await promise
  } catch (error) {
    if (throwOnError) throw error
    console.error('Fortschritt konnte nicht synchronisiert werden:', error.message)
    return null
  }
}
