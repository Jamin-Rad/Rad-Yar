// This worker controls only /radyar-telemetry/. No site requests are intercepted.
const pending = new Map()
const recentlyCancelled = new Map()
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()))
self.addEventListener('message', event => {
  const { type, batchId, body } = event.data || {}
  if (type === 'revoke') {
    for (const job of pending.values()) job.cancelled = true
    return
  }
  if (typeof batchId !== 'string' || !/^[a-f0-9-]{36}$/i.test(batchId)) return
  const now = Date.now()
  for (const [id, at] of recentlyCancelled) if (now-at>10000) recentlyCancelled.delete(id)
  if (type === 'continued') {
    recentlyCancelled.set(batchId,now)
    const job = pending.get(batchId)
    if (job) job.cancelled = true
    return
  }
  if (type !== 'exit' || typeof body !== 'string' || body.length>49152 || pending.has(batchId)) return
  const job = { cancelled:recentlyCancelled.has(batchId) }
  pending.set(batchId,job)
  event.waitUntil((async () => {
    try {
      // A toolbar reload may fire pagehide with no navigation destination. The
      // next RadYar document cancels this job as soon as its HTML starts running.
      await new Promise(resolve => setTimeout(resolve,2500))
      if (!job.cancelled) await fetch('/api/analytics/track',{
        method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body,
      })
    } catch { /* The original document checkpoint is retried at a later exit. */ }
    finally { pending.delete(batchId) }
  })())
})
