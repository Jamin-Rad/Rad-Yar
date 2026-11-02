// Manual refresh bypasses the normal TTL; a short cooldown coalesces repeated clicks.
export function createMarketCache({ ttl = 900000, cooldown = 15000, limit = 300, now = Date.now } = {}) {
  const values = new Map(), pending = new Map()
  return async function cached(key, task, force = false) {
    if (pending.has(key)) return pending.get(key)
    const saved = values.get(key)
    if (saved && now() - saved.time < (force ? cooldown : ttl)) return saved.value
    const request = Promise.resolve().then(task).then(value => {
      if (values.size >= limit) values.delete(values.keys().next().value)
      values.set(key, { time: now(), value })
      return value
    }).finally(() => pending.delete(key))
    pending.set(key, request)
    return request
  }
}
