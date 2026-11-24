// The response cookie identifies a local manifest after an unloading document loses its fetch callback.
export const ACK_PREFIX = 'ry_exit_ok_'
export const EXIT_BODY_LIMIT = 48 * 1024
export const EXIT_ENTRY_LIMIT = 128
export const UUID = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i
const ROW = 'radyar_exit_row:'
const MANIFEST = 'radyar_exit_manifest:'
const WEEK = 7 * 86400000
const WORKER_SCOPE = '/radyar-telemetry/'
const LAST_UPDATE = 'radyar_exit_worker_checked'
let registration
let registering

export function prepareExitDelivery() {
  if (!globalThis.navigator?.serviceWorker || registering) return
  registering = navigator.serviceWorker.getRegistration(WORKER_SCOPE).then(async current => {
    if (current?.scope === new URL(WORKER_SCOPE, location.origin).href) {
      registration = current
      if (Date.now() - Number(localStorage.getItem(LAST_UPDATE)) < 86400000) return
      void current.update().catch(() => {})
    } else {
      registration = await navigator.serviceWorker.register(WORKER_SCOPE + 'exit-worker.js')
    }
    localStorage.setItem(LAST_UPDATE, String(Date.now()))
  }).catch(() => { registering = null })
}

function keys(prefix) {
  const result = []
  for (let i=0; i<localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(prefix)) result.push(key)
  }
  return result
}

function read(key) {
  try { return JSON.parse(localStorage.getItem(key)) } catch { return null }
}

function forget(batchId) {
  const manifest = read(MANIFEST + batchId)
  for (const [id, seconds] of manifest?.rows || []) {
    if (read(ROW + id)?.seconds === seconds) localStorage.removeItem(ROW + id)
  }
  localStorage.removeItem(MANIFEST + batchId)
  document.cookie = ACK_PREFIX + batchId + '=; Max-Age=0; Path=/; SameSite=Lax'
}

export function cleanExitAnalytics(revoked = false) {
  try {
    if (revoked) {
      registration?.active?.postMessage({ type:'revoke' })
      if (!registration) globalThis.navigator?.serviceWorker?.getRegistration('/radyar-telemetry/')
        .then(result => result?.active?.postMessage({ type:'revoke' })).catch(() => {})
      sessionStorage.removeItem('radyar_exit_continuation')
      localStorage.removeItem(LAST_UPDATE)
    }
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0]
      if (name.startsWith(ACK_PREFIX) && UUID.test(name.slice(ACK_PREFIX.length))) forget(name.slice(ACK_PREFIX.length))
    }
    for (const key of keys(MANIFEST)) {
      if (revoked || !(read(key)?.at > Date.now() - WEEK)) localStorage.removeItem(key)
    }
    if (revoked) for (const key of keys(ROW)) localStorage.removeItem(key)
  } catch { /* Storage may be unavailable in private browsing. */ }
}

export function checkpointExitRow(row) {
  try { localStorage.setItem(ROW + row.id, JSON.stringify(row)) } catch {}
}

export function sendAtExit(visitor, canTrack, externalDestination) {
  // Without an active worker, an ambiguous pagehide could be a toolbar reload.
  if (!canTrack() || (!registration?.active && !externalDestination)) return
  try {
    cleanExitAnalytics()
    const pending = keys(ROW).map(read).filter(row => row?.visitor === visitor)
      .sort((a,b) => a.seen.localeCompare(b.seen))
    if (!pending.length) return
    const batchId = crypto.randomUUID()
    const entries = []
    const encoder = new TextEncoder()
    let bytes = 256
    for (const row of pending) {
      const { visitor: ignored, ...entry } = row
      bytes += encoder.encode(JSON.stringify(entry)).length + 1
      if (bytes > EXIT_BODY_LIMIT || entries.length >= EXIT_ENTRY_LIMIT) break
      entries.push(entry)
    }
    if (!entries.length) return
    const body = JSON.stringify({ batchId, visitorId: visitor, entries })
    localStorage.setItem(MANIFEST + batchId, JSON.stringify({ at: Date.now(), rows: entries.map(row => [row.id, row.seconds]) }))
    if (registration?.active && !externalDestination) {
      sessionStorage.setItem('radyar_exit_continuation',batchId)
      registration.active.postMessage({type:'exit',batchId,body})
      return
    }
    void fetch('/api/analytics/track', { method:'POST', credentials:'same-origin', keepalive:true,
      headers:{'Content-Type':'application/json'}, body }).then(response => {
      if (response.ok && response.headers.get('X-Radyar-Analytics-Ack') === batchId) forget(batchId)
    }).catch(() => {})
  } catch { /* Unacknowledged rows stay available for the next exit. */ }
}
