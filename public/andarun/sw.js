// Push only: never cache private HTML, API responses, or health data.
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()))
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))
self.addEventListener('push', event => {
  let data = {}
  try { data = event.data?.json() || {} } catch {}
  event.waitUntil(self.registration.showNotification(data.title || 'Jaminova', {
    body: data.body || 'Du hast einen bevorstehenden Termin.',
    tag: data.tag || 'calendar-reminder',
    icon: '/andarun/andarun-icon-192.png',
    badge: '/andarun/andarun-icon-192.png',
    data: { url: '/andarun/termine' },
  }))
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
