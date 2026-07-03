// Central progress reconciliation for signed-in users.
// localStorage remains the offline cache; Supabase is the cross-device source.

const SESSION_KEY_PREFIX = 'radyar_progress_synced_v3_'
const CACHE_OWNER_KEY = 'radyar_progress_cache_owner'
const SHARED_CACHE_KEYS = [
  ['radyar_read_articles', {}],
  ['radyar_learning_history', []],
  ['radyar_mcq_scores', {}],
  ['radyar_settings', {}],
]
const inFlight = new Map()

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

function scopedCacheKey(key, userId) {
  return `${key}_${userId}`
}

function saveSharedCacheForUser(userId) {
  for (const [key, fallback] of SHARED_CACHE_KEYS) {
    localStorage.setItem(scopedCacheKey(key, userId), JSON.stringify(readJson(key, fallback)))
  }
}

export function activateUserCache(userId) {
  const owner = localStorage.getItem(CACHE_OWNER_KEY)
  if (!owner) {
    // Existing unscoped data predates account-specific caches and belongs to
    // the first signed-in user after this update.
    saveSharedCacheForUser(userId)
    localStorage.setItem(CACHE_OWNER_KEY, userId)
    return
  }
  if (owner === userId) return

  saveSharedCacheForUser(owner)
  for (const [key, fallback] of SHARED_CACHE_KEYS) {
    const scoped = readJson(scopedCacheKey(key, userId), fallback)
    localStorage.setItem(key, JSON.stringify(scoped))
  }
  localStorage.setItem(CACHE_OWNER_KEY, userId)
}

function persistCurrentUserCache(userId) {
  saveSharedCacheForUser(userId)
  localStorage.setItem(CACHE_OWNER_KEY, userId)
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

function mergeReadProgress(serverData) {
  const articles = readJson('radyar_read_articles', {})
  const history = readJson('radyar_learning_history', [])
  const historyByTopic = new Map(history.map(item => [item.topicId, item]))

  for (const [topicId, read] of Object.entries(serverData.read || {})) {
    if (read) articles[topicId] = 1
    else {
      delete articles[topicId]
      historyByTopic.delete(topicId)
    }
  }
  for (const item of serverData.history || []) {
    const localItem = historyByTopic.get(item.topicId)
    if (!localItem || timeOf(item.learnedAt) >= timeOf(localItem.learnedAt)) {
      historyByTopic.set(item.topicId, item)
    }
  }

  const mergedHistory = [...historyByTopic.values()]
    .sort((a, b) => timeOf(b.learnedAt) - timeOf(a.learnedAt))

  localStorage.setItem('radyar_read_articles', JSON.stringify(articles))
  localStorage.setItem('radyar_learning_history', JSON.stringify(mergedHistory))
  return { articles, history: mergedHistory }
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

function postJson(url, body) {
  return requestJson(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

async function reconcileProgress(userId) {
  activateUserCache(userId)

  const [readResult, mcqResult, leitnerResult] = await Promise.allSettled([
    requestJson('/api/progress/read-status'),
    requestJson('/api/progress/mcq-results'),
    requestJson('/api/progress/leitner'),
  ])

  const read = readResult.status === 'fulfilled'
    ? mergeReadProgress(readResult.value)
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
  const historyByTopic = new Map(read.history.map(item => [item.topicId, item.learnedAt]))
  const readBulk = Object.entries(read.articles)
    .filter(([, value]) => Number(value) >= 1)
    .map(([themaId]) => ({ themaId, read: true, learnedAt: historyByTopic.get(themaId) }))

  const uploads = []
  if (readBulk.length) uploads.push(postJson('/api/progress/read-status', { bulk: readBulk }))
  if (Object.keys(mcqScores).length) uploads.push(postJson('/api/progress/mcq-results', { bulk: mcqScores }))
  if (Object.keys(leitnerState).length) uploads.push(postJson('/api/progress/leitner', { bulk: leitnerState }))
  const uploadResults = await Promise.allSettled(uploads)
  const failedUpload = uploadResults.find(result => result.status === 'rejected')
  if (failedUpload) {
    throw failedUpload.reason || new Error('Progress upload failed')
  }
  const failedPull = [readResult, mcqResult, leitnerResult].find(result => result.status === 'rejected')
  if (failedPull) {
    throw failedPull.reason || new Error('Progress download failed')
  }

  sessionStorage.setItem(`${SESSION_KEY_PREFIX}${userId}`, '1')
  window.dispatchEvent(new CustomEvent('radyar:progress-synced', {
    detail: { userId, read, mcqScores, leitnerState },
  }))
  return { read, mcqScores, leitnerState }
}

export function markProgressSyncPending(userId) {
  if (typeof window === 'undefined' || !userId) return
  sessionStorage.removeItem(`${SESSION_KEY_PREFIX}${userId}`)
}

export async function syncLocalProgressToServer(userId) {
  if (typeof window === 'undefined' || !userId) return null
  const sessionKey = `${SESSION_KEY_PREFIX}${userId}`
  if (sessionStorage.getItem(sessionKey)) return null
  if (inFlight.has(userId)) return inFlight.get(userId)

  const promise = reconcileProgress(userId)
    .catch(error => {
      console.error('Fortschritt konnte nicht synchronisiert werden:', error.message)
      return null
    })
    .finally(() => inFlight.delete(userId))

  inFlight.set(userId, promise)
  return promise
}
