import { normalizeDeutschState, diffDeutschState, replayDeutschChanges } from './state'

// Writes locally before any network request. Acknowledgements only remove the
// batch they sent; edits made during the request are replayed over the response.
export function createDeutschSync({ storage, key, request, onState, onStatus, delay = 250 }) {
  let cached
  try { cached = JSON.parse(storage.getItem(key) || 'null') } catch {}
  let state = normalizeDeutschState(cached?.state || cached)
  let pending = Array.isArray(cached?.pending) ? cached.pending : []
  let active = null
  let timer = null
  let stopped = false
  let retryDelay = 1000
  const publish = () => { if (!stopped) onState(state) }
  const status = value => { if (!stopped) onStatus(value) }
  function cache() {
    try { storage.setItem(key, JSON.stringify({ version: 2, state, pending })); return true } catch { status('storage-error'); return false }
  }
  function schedule(ms = delay) {
    clearTimeout(timer)
    if (!stopped && pending.length) timer = setTimeout(() => { void flush() }, ms)
  }
  async function flush() {
    if (active) return active
    if (!pending.length) return
    clearTimeout(timer)
    const count = Math.min(pending.length, 100)
    const batch = pending.slice(0, count)
    status('syncing')
    active = (async () => {
      try {
        const response = await request(batch)
        pending = pending.slice(count)
        state = replayDeutschChanges(response.state, pending)
        const durable = stopped ? true : cache()
        retryDelay = 1000
        publish()
        if (durable) status(pending.length ? 'syncing' : 'synced')
      } catch {
        const durable = stopped ? true : cache()
        if (durable) status('offline')
        retryDelay = Math.min(retryDelay * 2, 30000)
      } finally {
        active = null
        schedule(pending.length ? retryDelay : delay)
      }
    })()
    return active
  }
  return {
    getState: () => state,
    hydrate(remote) {
      // A legacy cache was only written after failed saves. Recover its progress
      // once, but never let its old lesson list replace the shared lesson library.
      if (cached && !cached.version) {
        const migrated = normalizeDeutschState(remote)
        for (const field of ['answers', 'lessonStatus', 'mistakeReviews']) migrated[field] = { ...migrated[field], ...state[field] }
        for (const field of ['cards', 'reviews', 'writings']) {
          const merged = new Map([...migrated[field], ...state[field]].map(item => [item.id, item]))
          migrated[field] = [...merged.values()]
        }
        const delta = diffDeutschState(remote, migrated)
        if (Object.keys(delta).length) pending.push(delta)
      }
      state = replayDeutschChanges(remote, pending)
      const durable = cache(); publish(); if (durable) status(pending.length ? 'syncing' : 'synced'); schedule()
    },
    update(value) {
      const next = normalizeDeutschState(typeof value === 'function' ? value(state) : value)
      const delta = diffDeutschState(state, next)
      if (!Object.keys(delta).length) return
      state = next; pending.push(delta)
      const durable = cache(); publish(); if (durable) status('syncing'); schedule()
    },
    offline() { publish(); status('offline'); schedule(1000) },
    flush,
    stop() { stopped = true; clearTimeout(timer); void flush() },
  }
}
