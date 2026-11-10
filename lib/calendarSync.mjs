const PREFIX = '[[andarun:todo-meta:'
const SUFFIX = ']]'
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const categories = new Set(['Arbeit', 'Privat', 'Fokus'])
const count = value => [...new Intl.Segmenter('de', { granularity: 'grapheme' }).segment(value)].length
export class CalendarError extends Error {
  constructor(status, message, current = null) { super(message); this.status = status; this.current = current }
}
export function parseCalendarNote(value = '') {
  if (!value.startsWith(PREFIX)) return { meta: {}, note: value }
  const end = value.indexOf(SUFFIX)
  try {
    if (end < 0) throw new Error()
    return { meta: JSON.parse(value.slice(PREFIX.length, end)), note: value.slice(end + SUFFIX.length).replace(/^\n/, '') }
  } catch { return { meta: {}, note: value } }
}
export function calendarEvent(row) {
  const { meta, note } = parseCalendarNote(row.note || '')
  if (meta.itemType !== 'event') return null
  return { id: row.id, title: row.title, note, date: row.deadline || '', startTime: meta.eventTime || '',
    endDate: meta.endDate || '', endTime: meta.endTime || '', allDay: meta.allDay === true,
    done: row.done === true, cancelled: meta.cancelled === true,
    category: categories.has(meta.calendarCategory) ? meta.calendarCategory : 'Privat',
    updatedAt: row.updated_at, mutationId: meta.calendarMutationId || null }
}
function date(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(value + 'T12:00:00Z')
  return !Number.isNaN(+parsed) && parsed.toISOString().slice(0, 10) === value && value >= '1900-01-01' && value <= '2200-12-31'
}
function time(value) { return typeof value === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value) }
export function validateCalendarEvent(event) {
  if (!event || typeof event.title !== 'string' || !event.title.trim() || count(event.title) > 240 || event.title.length > 4000)
    throw new CalendarError(400, 'Bitte einen Titel mit höchstens 240 Zeichen eingeben.')
  if (typeof event.note !== 'string' || count(event.note) > 500 || event.note.length > 16000) throw new CalendarError(400, 'Die Notiz ist zu lang.')
  if (!date(event.date) || typeof event.allDay !== 'boolean' || typeof event.done !== 'boolean' || typeof event.cancelled !== 'boolean')
    throw new CalendarError(400, 'Ungültiger Termin.')
  if (event.allDay) {
    if (!date(event.endDate) || event.endDate < event.date) throw new CalendarError(400, 'Ungültiges Enddatum.')
  } else {
    if (event.startTime !== '' && !time(event.startTime)) throw new CalendarError(400, 'Ungültige Uhrzeit.')
    if (event.endTime !== '' && (!time(event.endTime) || !time(event.startTime) || event.endTime <= event.startTime))
      throw new CalendarError(400, 'Das Ende muss nach dem Beginn liegen.')
  }
  if (!categories.has(event.category)) throw new CalendarError(400, 'Ungültiger Kalender.')
  return event
}
export function timestamp(value) {
  if (typeof value !== 'string') return ''
  const match = value.match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2}:\d{2})(?:\.(\d{1,6}))?(?:Z|\+00(?::00)?)$/)
  return match ? `${match[1]}T${match[2]}.${(match[3] || '').padEnd(6, '0')}Z` : ''
}
const owners = identity => identity.lookupOwnerIds?.length ? identity.lookupOwnerIds : [identity.ownerId]
export async function listCalendar(db, identity, after) {
  if (after && !UUID.test(after)) throw new CalendarError(400, 'Ungültiger Cursor.')
  let query = db.from('andarun_todos').select('*').in('owner_id', owners(identity)).order('id').limit(500)
  if (after) query = query.gt('id', after)
  const { data, error } = await query
  if (error) throw new CalendarError(503, 'Kalender gerade nicht erreichbar.')
  return { events: data.map(calendarEvent).filter(Boolean), nextCursor: data.length === 500 ? data.at(-1).id : null }
}
export async function mutateCalendar(db, identity, body) {
  if (!UUID.test(body.id || '') || !UUID.test(body.mutationId || '') || !['save', 'cancel'].includes(body.operation))
    throw new CalendarError(400, 'Ungültiger Änderungsauftrag.')
  const expected = body.expectedUpdatedAt
  if (expected !== null && !timestamp(expected)) throw new CalendarError(400, 'Versionsangabe erforderlich.')
  const existing = await db.from('andarun_todos').select('*').eq('id', body.id).in('owner_id', owners(identity)).maybeSingle()
  if (existing.error) throw new CalendarError(503, 'Kalender gerade nicht erreichbar.')
  const row = existing.data
  const current = row ? calendarEvent(row) : null
  if (row && !current) throw new CalendarError(409, 'Dieser Eintrag ist kein Termin.')
  // The receipt lives in the same atomic row write. Retries cannot create duplicate events.
  if (current?.mutationId === body.mutationId) return { event: current }
  if ((row && timestamp(row.updated_at) !== timestamp(expected)) || (!row && expected !== null))
    throw new CalendarError(409, row ? 'Der Termin wurde auf einem anderen Gerät geändert.' : 'Der Termin wurde inzwischen gelöscht.', current)
  if (!row && body.operation === 'cancel') throw new CalendarError(409, 'Der Termin ist nicht mehr vorhanden.')
  const event = body.operation === 'cancel' ? { ...current, cancelled: true } : validateCalendarEvent(body.event)
  const { meta } = parseCalendarNote(row?.note || '')
  const nextMeta = { ...meta, itemType: 'event', allDay: event.allDay, eventTime: event.allDay ? '' : event.startTime,
    endTime: event.allDay ? '' : event.endTime, endDate: event.allDay ? event.endDate : '', cancelled: event.cancelled,
    calendarCategory: event.category, calendarMutationId: body.mutationId }
  const updatedAt = new Date(Math.max(Date.now(), (Date.parse(row?.updated_at) || 0) + 1)).toISOString()
  const update = { title: event.title.trim(), note: `${PREFIX}${JSON.stringify(nextMeta)}${SUFFIX}\n${event.note}`,
    deadline: event.date, done: event.done, completed_at: event.done ? row?.completed_at || updatedAt : null, updated_at: updatedAt }
  let result
  if (row) result = await db.from('andarun_todos').update(update).eq('id', row.id).in('owner_id', owners(identity)).eq('updated_at', row.updated_at).select('*').maybeSingle()
  else result = await db.from('andarun_todos').insert({ ...update, id: body.id, owner_id: identity.ownerId, lane: 'today' }).select('*').single()
  if (result.error?.code === '23505' || (!result.error && !result.data)) {
    // Re-read after a concurrent write; do not retry a stale mutation automatically.
    const latest = await db.from('andarun_todos').select('*').eq('id', body.id).in('owner_id', owners(identity)).maybeSingle()
    const value = latest.data ? calendarEvent(latest.data) : null
    if (value?.mutationId === body.mutationId) return { event: value }
    throw new CalendarError(409, 'Der Termin wurde inzwischen geändert. Bitte vergleichen.', value)
  }
  if (result.error) throw new CalendarError(503, 'Die Änderung konnte noch nicht synchronisiert werden.')
  return { event: calendarEvent(result.data) }
}
