import { ANDARUN_LEGACY_OWNER_IDS, ANDARUN_OWNER_ID } from '@/lib/andarunPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getBadenWuerttembergCalendarEntriesInRange } from '@/utils/germanPublicHolidays'

const META_PREFIX = '[[andarun:todo-meta:'
const META_SUFFIX = ']]'
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const TIME_PATTERN = /^\d{2}:\d{2}$/

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function cleanDate(value) {
  return typeof value === 'string' && DATE_PATTERN.test(value) ? value : ''
}

function cleanTime(value) {
  return typeof value === 'string' && TIME_PATTERN.test(value) ? value : ''
}

function berlinDateValue() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]))
  return `${values.year}-${values.month}-${values.day}`
}

function laneFromDate(date) {
  const today = berlinDateValue()
  if (date <= today) return 'urgent'
  const current = new Date(`${today}T12:00:00Z`)
  const target = new Date(`${date}T12:00:00Z`)
  const diff = Math.round((target - current) / 86400000)
  return diff <= 7 ? 'today' : 'watch'
}

function encodeEventNote(note, { allDay, endDate, endTime, eventTime }) {
  const meta = JSON.stringify({
    itemType: 'event',
    eventTime: allDay ? '' : eventTime,
    endDate: allDay ? endDate : '',
    endTime: allDay ? '' : endTime,
    allDay,
  })
  return `${META_PREFIX}${meta}${META_SUFFIX}${note ? `\n${note}` : ''}`
}

function parseEventNote(value) {
  const fallback = { note: value || '', itemType: 'todo', eventTime: '', endDate: '', endTime: '', allDay: false }
  if (typeof value !== 'string' || !value.startsWith(META_PREFIX)) return fallback
  const end = value.indexOf(META_SUFFIX)
  if (end < 0) return fallback

  try {
    const meta = JSON.parse(value.slice(META_PREFIX.length, end))
    return {
      note: value.slice(end + META_SUFFIX.length).replace(/^\n/, ''),
      itemType: meta.itemType === 'event' ? 'event' : 'todo',
      eventTime: cleanTime(meta.eventTime),
      endDate: cleanDate(meta.endDate),
      endTime: cleanTime(meta.endTime),
      allDay: Boolean(meta.allDay),
    }
  } catch {
    return fallback
  }
}

function toCalendarEvent(row) {
  const parsed = parseEventNote(row.note)
  const allDay = row.all_day == null ? parsed.allDay : Boolean(row.all_day)
  return {
    id: row.id,
    title: row.title,
    date: row.deadline || '',
    startTime: allDay ? '' : String(row.event_time || parsed.eventTime || '').slice(0, 5),
    endDate: allDay ? parsed.endDate || row.deadline || '' : '',
    endTime: allDay ? '' : parsed.endTime,
    allDay,
    note: parsed.note,
    itemType: row.item_type || parsed.itemType,
  }
}

function missingEventColumns(error) {
  const text = `${error?.message || ''} ${error?.details || ''} ${error?.hint || ''}`
  return /item_type|event_time|all_day|schema cache/i.test(text)
}

function ensureStorage() {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    throw new Error('Personal calendar storage is not configured.')
  }
}

export async function createPersonalCalendarEvent(input) {
  ensureStorage()

  const title = cleanText(input.title, 240)
  const date = cleanDate(input.date)
  const allDay = Boolean(input.allDay)
  const eventTime = allDay ? '' : cleanTime(input.startTime)
  const endTime = allDay ? '' : cleanTime(input.endTime)
  const endDateInput = allDay ? cleanDate(input.endDate) : ''
  const endDate = allDay ? (endDateInput && endDateInput >= date ? endDateInput : date) : ''
  const location = cleanText(input.location, 240)
  const description = cleanText(input.note, 500)
  const note = [location ? `Ort: ${location}` : '', description].filter(Boolean).join('\n')

  if (!title) throw new Error('A title is required.')
  if (!date) throw new Error('A valid date in YYYY-MM-DD format is required.')
  if (!allDay && !eventTime) throw new Error('A start time in HH:mm format is required unless this is an all-day event.')
  if (endTime && endTime <= eventTime) throw new Error('The end time must be later than the start time.')

  const { data: duplicate, error: duplicateError } = await supabaseAdmin
    .from('andarun_todos')
    .select('*')
    .in('owner_id', [ANDARUN_OWNER_ID, ...ANDARUN_LEGACY_OWNER_IDS])
    .eq('deadline', date)
    .eq('title', title)
    .limit(1)
    .maybeSingle()

  if (duplicateError) throw new Error(`Could not check the personal calendar: ${duplicateError.message}`)
  if (duplicate) {
    const existing = toCalendarEvent(duplicate)
    const sameTime = existing.itemType === 'event' && (allDay ? existing.allDay : existing.startTime === eventTime)
    if (sameTime) return { event: existing, created: false, duplicate: true }
  }

  const { data, error } = await supabaseAdmin
    .from('andarun_todos')
    .insert({
      owner_id: ANDARUN_OWNER_ID,
      title,
      note: encodeEventNote(note, { allDay, endDate, endTime, eventTime }),
      lane: laneFromDate(date),
      deadline: date,
      item_type: 'event',
      event_time: eventTime || null,
      all_day: allDay,
      done: false,
      updated_at: new Date().toISOString(),
    })
    .select('*')
    .single()

  if (error && missingEventColumns(error)) {
    const fallback = await supabaseAdmin
      .from('andarun_todos')
      .insert({
        owner_id: ANDARUN_OWNER_ID,
        title,
        note: encodeEventNote(note, { allDay, endDate, endTime, eventTime }),
        lane: laneFromDate(date),
        deadline: date,
        done: false,
        updated_at: new Date().toISOString(),
      })
      .select('*')
      .single()

    if (fallback.error) throw new Error(`Could not add the event to the personal calendar: ${fallback.error.message}`)
    return { event: toCalendarEvent(fallback.data), created: true, duplicate: false }
  }
  if (error) throw new Error(`Could not add the event to the personal calendar: ${error.message}`)
  return { event: toCalendarEvent(data), created: true, duplicate: false }
}

export async function listPersonalCalendarEvents({ from, to }) {
  ensureStorage()

  const startDate = cleanDate(from)
  const endDate = cleanDate(to)
  if (!startDate || !endDate || endDate < startDate) {
    throw new Error('A valid date range in YYYY-MM-DD format is required.')
  }

  const { data, error } = await supabaseAdmin
    .from('andarun_todos')
    .select('*')
    .in('owner_id', [ANDARUN_OWNER_ID, ...ANDARUN_LEGACY_OWNER_IDS])
    .eq('done', false)
    .gte('deadline', startDate)
    .lte('deadline', endDate)
    .order('deadline', { ascending: true })

  if (error) throw new Error(`Could not read the personal calendar: ${error.message}`)
  const events = (data || [])
    .map(toCalendarEvent)
    .filter(event => event.itemType === 'event')
  const existingKeys = new Set(events.map(event => `${event.date}\u0000${event.title}`))
  const holidays = getBadenWuerttembergCalendarEntriesInRange(startDate, endDate)
    .filter(item => !existingKeys.has(`${item.date}\u0000${item.title}`))

  return [...events, ...holidays]
    .sort((left, right) => `${left.date} ${left.startTime}`.localeCompare(`${right.date} ${right.startTime}`))
}
