// Push only: never cache private HTML, API responses, or health data.
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()))
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))

// Store only the reminder key. A repeated push can arrive after its notification was dismissed.
async function reserveReminder(tag) {
  const db = await new Promise((resolve, reject) => {
    const request = indexedDB.open('jaminova-calendar-notifications', 1)
    request.onupgradeneeded = () => request.result.createObjectStore('shown').createIndex('at', 'at')
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction('shown', 'readwrite')
      const store = tx.objectStore('shown')
      let first = false
      const lookup = store.getKey(tag)
      lookup.onsuccess = () => {
        first = lookup.result === undefined
        if (first) store.add({ at: Date.now() }, tag)
      }
      const expired = store.index('at').openKeyCursor(IDBKeyRange.upperBound(Date.now() - 7 * 86400000))
      expired.onsuccess = () => {
        const cursor = expired.result
        if (cursor) { store.delete(cursor.primaryKey); cursor.continue() }
      }
      tx.oncomplete = () => resolve(first)
      tx.onabort = () => reject(tx.error)
    })
  } finally { db.close() }
}

async function displayReminder(data) {
  const tag = data.tag || 'calendar-reminder'
  if (/^[\da-f-]{36}:\d+:(30|1440)$/i.test(tag)) {
    try {
      if (!await reserveReminder(tag)) return
    } catch {
      const visible = await self.registration.getNotifications?.({ tag }).catch(() => [])
      if (visible?.length) return
    }
  }
  await self.registration.showNotification(data.title || 'Jaminova', {
    body: data.body || 'Du hast einen bevorstehenden Termin.',
    tag,
    icon: '/andarun/andarun-icon-192.png',
    badge: '/andarun/andarun-icon-192.png',
    data: { url: '/andarun/termine' },
  })
}
self.addEventListener('push', event => {
  let data = {}
  try { data = event.data?.json() || {} } catch {}
  event.waitUntil(displayReminder(data))
})
self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil((async () => {
    const url = new URL('/andarun/termine', self.location.origin).href
    for (const client of await self.clients.matchAll({ type: 'window', includeUncontrolled: true })) {
      if (client.url === url && 'focus' in client) return client.focus()
    }
    return self.clients.openWindow(url)
  })())
})
