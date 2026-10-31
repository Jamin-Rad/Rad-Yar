import { getUserCacheToken, isUserCacheActive, isUserCacheCurrent } from './progressCache.js'

const legacyKey = id => `radyar_pending_progress_${id || 'anon'}`
const prefix = id => `radyar_pending_v2:${encodeURIComponent(id || 'anon')}:`
const inFlight = new Map()
function json(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)) } catch { return fallback } }

export function pendingProgressEntries(userId) {
  const result = []
  // Only the explicitly owned old queue is migrated; unowned legacy data is
  // never attributed to whichever account signs in next.
  for (const [key, item] of Object.entries(json(legacyKey(userId), {}))) result.push({ storageKey: legacyKey(userId), legacySlot: key, item })
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(prefix(userId))) {
      const item = json(key, null)
      if (item) result.push({ storageKey: key, item })
    }
  }
  return result.sort((a,b) => String(a.item.queuedAt).localeCompare(String(b.item.queuedAt)))
}

export function queueProgressWrite(key, endpoint, payload, userId) {
  const id = crypto.randomUUID()
  // One immutable key per write: simultaneous tabs cannot overwrite another
  // tab's queue via read/modify/write of a shared JSON object.
  localStorage.setItem(`${prefix(userId)}${id}`, JSON.stringify({ key, endpoint, payload, id, queuedAt: new Date().toISOString() }))
  window.dispatchEvent(new CustomEvent('radyar:progress-pending', { detail: { userId } }))
}

export function discardPendingProgress(userId, key) {
  for (const entry of pendingProgressEntries(userId)) {
    if ((entry.legacySlot ?? entry.item.key) !== key) continue
    if (entry.legacySlot === undefined) localStorage.removeItem(entry.storageKey)
    else {
      const latest = json(entry.storageKey, {})
      delete latest[entry.legacySlot]
      if (Object.keys(latest).length) localStorage.setItem(entry.storageKey, JSON.stringify(latest))
      else localStorage.removeItem(entry.storageKey)
    }
  }
}

export async function persistProgressWrite(key, endpoint, payload, userId) {
  try { queueProgressWrite(key, endpoint, payload, userId) } catch { return false }
  return flushPendingProgress(userId)
}

export async function flushPendingProgress(userId) {
  if (!userId || !isUserCacheActive(userId)) return false
  const flightKey = `${userId}:${getUserCacheToken(userId)}`
  if (!inFlight.has(flightKey)) inFlight.set(flightKey, drain(userId).finally(() => inFlight.delete(flightKey)))
  return inFlight.get(flightKey)
}

async function drain(userId) {
  const token = getUserCacheToken(userId)
  while (isUserCacheCurrent(userId, token)) {
    const entry = pendingProgressEntries(userId)[0]
    if (!entry) return true
    const { storageKey, legacySlot, item } = entry
    try {
      let payload = item.payload
      if (item.endpoint === '/api/progress/read-status' && !payload.reset) {
        const dated = row => ({ ...row, changedAt: row.changedAt || row.learnedAt || item.queuedAt, changeId: row.changeId || item.id || '' })
        payload = Array.isArray(payload.bulk) ? { ...payload, bulk: payload.bulk.map(dated) } : dated(payload)
      }
      const response = await fetch(item.endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Radyar-User-Id': userId },
        body: JSON.stringify(payload), keepalive: true,
      })
      if (!response.ok) return false
      if (legacySlot !== undefined) {
        const latest = json(storageKey, {})
        if (JSON.stringify(latest[legacySlot]) === JSON.stringify(item)) {
          delete latest[legacySlot]
          if (Object.keys(latest).length) localStorage.setItem(storageKey,JSON.stringify(latest))
          else localStorage.removeItem(storageKey)
        }
      } else if (JSON.stringify(json(storageKey,null)) === JSON.stringify(item)) localStorage.removeItem(storageKey)
    } catch { return false }
  }
  return false
}
