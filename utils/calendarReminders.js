// The calendar is fixed to Europe/Berlin, independently of the device's timezone.
export function berlinEventInstant(date, time) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '') || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time || '')) return null
  const wall = Date.parse(`${date}T${time}:00Z`)
  if (!Number.isFinite(wall)) return null
  const format = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
  // Resolve both offsets. Invalid spring-gap times are rejected; the first autumn occurrence wins.
  for (const offset of [120, 60]) {
    const instant = wall - offset * 60000
    if (format.format(new Date(instant)) === `${date} ${time}`) return instant
  }
  return null
}

export function eventFromRow(row) {
  let meta = {}
  const prefix = '[[andarun:todo-meta:'
  if (typeof row.note === 'string' && row.note.startsWith(prefix)) {
    try { meta = JSON.parse(row.note.slice(prefix.length, row.note.indexOf(']]'))) } catch {}
  }
  return { ...row, itemType: meta.itemType || row.item_type || 'todo', cancelled: meta.cancelled === true,
    allDay: row.all_day ?? meta.allDay, time: String(row.event_time || meta.eventTime || '').slice(0, 5) }
}

export function dueReminders(event, leads, now = Date.now()) {
  if (event.itemType !== 'event' || event.done || event.cancelled || event.allDay) return []
  const start = berlinEventInstant(event.deadline, event.time)
  if (!start || start <= now) return []
  return leads.filter(lead => lead === 1440 || lead === 30).flatMap(lead => {
    const due = start - lead * 60000
    // Do not catch up backdated/newly-entered appointments, or send stale reminders.
    if (due > now || now - due > 5 * 60000 || Date.parse(event.created_at) > due) return []
    return [{ lead, start, due, key: `${event.id}:${start}:${lead}` }]
  })
}

export function validPushSubscription(value) {
  if (!value || typeof value.endpoint !== 'string' || value.endpoint.length > 2048) return false
  try {
    const url = new URL(value.endpoint)
    const host = url.hostname
    const allowed = host === 'fcm.googleapis.com' || host.endsWith('.push.apple.com') || host.endsWith('.push.services.mozilla.com')
    if (!allowed || url.protocol !== 'https:' || url.port || url.username || url.password || url.hash) return false
    const keys = value.keys
    return /^[A-Za-z0-9_-]{87}$/.test(keys?.p256dh || '') && /^[A-Za-z0-9_-]{22}$/.test(keys?.auth || '')
  } catch { return false }
}
