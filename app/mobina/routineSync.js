import { sanitizeLogs, slot, validStep, withStep } from '../../lib/mobinaRoutine'

const cacheKey = 'mobina_routine_confirmed_v2'
const journalPrefix = 'mobina_routine_edit_v2:'
const legacyKey = 'mobina_daily_routine_v1'

export function createRoutineSync({ storage, request, publish, online, uuid }) {
  const pending = new Map()
  let confirmed = { logs: {}, versions: {} }
  try {
    const saved = JSON.parse(storage.getItem(cacheKey))
    confirmed = { logs: sanitizeLogs(saved?.logs ?? JSON.parse(storage.getItem(legacyKey))), versions: saved?.versions || {} }
  } catch {}
  try {
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      if (!key?.startsWith(journalPrefix)) continue
      try {
        const edit = JSON.parse(storage.getItem(key))
        if (validStep(edit) && Number.isSafeInteger(edit.order)) pending.set(edit.id, edit)
      } catch {}
    }
  } catch {}

  let view = confirmed
  let active = false
  let reading = false
  let needsRead = false
  let stopped = false
  let retry = 1500
  let timer
  let durable = true
  let conflict = false
  let lastOrder = sorted().at(-1)?.order ?? 0
  function sorted() {
    return [...pending.values()].sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
  }
  function show(status) {
    view = sorted().reduce((state, edit) => withStep(state, edit, edit.checked, edit.id), confirmed)
    if (!stopped) publish(view.logs, !durable && pending.size ? 'storageError' : status)
  }
  function cache() {
    try { storage.setItem(cacheKey, JSON.stringify(confirmed)) } catch {}
  }
  function schedule(delay) {
    clearTimeout(timer)
    if (!stopped && pending.size && online()) timer = setTimeout(() => sync(), delay)
  }
  async function sync(refresh = false) {
    if (stopped) return
    if (refresh && !reading) needsRead = true
    if (active) return
    clearTimeout(timer)
    if (!online()) { show('offline'); return }
    active = true
    try {
      do {
        if (needsRead) {
          needsRead = false
          reading = true
          const data = await request()
          reading = false
          confirmed = { logs: data.logs, versions: data.versions }
          if (!stopped) cache()
          show(pending.size ? 'saving' : 'online')
        }
        if (pending.size) {
          const batch = sorted().slice(0, 64)
          const { results } = await request(batch.map(({ order, ...step }) => step))
          if (!Array.isArray(results) || results.length !== batch.length) throw Error('Unvollständige Antwort')
          for (let i = 0; i < batch.length; i++) {
            const edit = batch[i], result = results[i]
            conflict ||= edit.checked !== result.checked
            confirmed = withStep(confirmed, edit, result.checked, result.version)
          }
          // Persist the acknowledgements before removing these exact journal entries.
          cache()
          for (const edit of batch) {
            pending.delete(edit.id)
            try { storage.removeItem(journalPrefix + edit.id) } catch {}
          }
          show(pending.size ? 'saving' : conflict ? 'conflict' : 'online')
        }
      } while (needsRead || pending.size)
      retry = 1500
    } catch {
      if (!stopped) {
        show('offline')
        schedule(retry)
        retry = Math.min(60000, retry * 2)
      }
    } finally { active = false; reading = false }
  }
  return {
    start() { show('loading'); return sync(true) },
    refresh: () => sync(true),
    flush: () => sync(),
    logs: () => view.logs,
    set(day, routine, index, checked) {
      if (Boolean(view.logs[day]?.[routine]?.[index]) === checked) return
      const key = slot({ routine, index })
      lastOrder = Math.max(Date.now(), lastOrder + 1)
      const edit = { day, routine, index, checked, id: uuid(), base: view.versions[day]?.[key] ?? null, order: lastOrder }
      pending.set(edit.id, edit)
      try { storage.setItem(journalPrefix + edit.id, JSON.stringify(edit)) } catch { durable = false }
      conflict = false
      show(online() ? 'saving' : 'offline')
      schedule(250)
    },
    stop() {
      clearTimeout(timer)
      if (pending.size) void sync()
      stopped = true
    },
  }
}
