import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { requireFatimaSession, SHARED_ANDARUN_LOOKUP_OWNER_IDS, SHARED_ANDARUN_OWNER_ID } from '@/lib/fatimaPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const LANES = new Set(['urgent', 'today', 'watch'])
const ITEM_TYPES = new Set(['todo', 'event'])
const META_PREFIX = '[[andarun:todo-meta:'
const META_SUFFIX = ']]'

function unavailable() {
  return NextResponse.json({ error: 'Andarun storage is not available.' }, { status: 503 })
}

async function getAndarunIdentity() {
  const andarun = await requireAndarunSession()
  if (!andarun.error) return andarun
  const fatima = await requireFatimaSession()
  if (!fatima.error) return { ownerId: SHARED_ANDARUN_OWNER_ID, lookupOwnerIds: SHARED_ANDARUN_LOOKUP_OWNER_IDS }
  return andarun
}

function lookupOwnerIds(identity) {
  return Array.isArray(identity.lookupOwnerIds) && identity.lookupOwnerIds.length
    ? identity.lookupOwnerIds
    : [identity.ownerId]
}

function toClient(row) {
  const parsedNote = parseStoredNote(row.note || '')
  const itemType = parsedNote.itemType === 'event' ? 'event' : row.item_type || 'todo'
  return {
    id: row.id,
    title: row.title,
    note: parsedNote.note,
    lane: row.lane,
    deadline: row.deadline || '',
    itemType,
    eventTime: row.event_time ? String(row.event_time).slice(0, 5) : parsedNote.eventTime,
    allDay: itemType === 'event' ? (row.all_day != null ? Boolean(row.all_day) : parsedNote.allDay) : false,
    done: Boolean(row.done),
    completedAt: row.completed_at || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function cleanText(value, maxLength = 240) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function cleanDeadline(value) {
  if (typeof value !== 'string' || !value) return null
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null
}

function cleanTime(value) {
  if (typeof value !== 'string' || !value) return null
  return /^\d{2}:\d{2}$/.test(value) ? value : null
}

function parseStoredNote(value) {
  const fallback = { note: value || '', itemType: 'todo', eventTime: '', allDay: false }
  if (typeof value !== 'string' || !value.startsWith(META_PREFIX)) return fallback
  const end = value.indexOf(META_SUFFIX)
  if (end < 0) return fallback
  try {
    const meta = JSON.parse(value.slice(META_PREFIX.length, end))
    const note = value.slice(end + META_SUFFIX.length).replace(/^\n/, '')
    return {
      note,
      itemType: ITEM_TYPES.has(meta.itemType) ? meta.itemType : 'todo',
      eventTime: cleanTime(meta.eventTime) || '',
      allDay: Boolean(meta.allDay),
    }
  } catch {
    return fallback
  }
}

function encodeStoredNote(note, itemType, eventTime, allDay) {
  if (itemType !== 'event') return note || null
  const meta = JSON.stringify({
    itemType,
    eventTime: allDay ? '' : eventTime || '',
    allDay: Boolean(allDay),
  })
  return `${META_PREFIX}${meta}${META_SUFFIX}${note ? `\n${note}` : ''}`
}

function missingEventColumns(error) {
  const text = `${error?.message || ''} ${error?.details || ''} ${error?.hint || ''}`
  return /item_type|event_time|all_day|schema cache/i.test(text)
}

function todayDate() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

function laneFromDeadline(deadline, fallback = 'today') {
  if (!deadline) return fallback
  const today = todayDate()
  const date = new Date(`${deadline}T00:00:00`)
  if (Number.isNaN(date.getTime())) return fallback
  const diff = Math.round((date - today) / 86400000)
  if (diff <= 0) return 'urgent'
  if (diff === 1) return 'today'
  return 'watch'
}

export async function GET() {
  const identity = await getAndarunIdentity()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  const { data, error } = await supabaseAdmin
    .from('andarun_todos')
    .select('*')
    .in('owner_id', lookupOwnerIds(identity))
    .order('done', { ascending: true })
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('[andarun-todos] GET failed', error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }

  return NextResponse.json({ todos: (data || []).map(toClient) })
}

export async function POST(request) {
  const identity = await getAndarunIdentity()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  let body = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const title = cleanText(body.title)
  const note = cleanText(body.note, 500)
  const deadline = cleanDeadline(body.deadline)
  const itemType = ITEM_TYPES.has(body.itemType) ? body.itemType : 'todo'
  const allDay = itemType === 'event' ? Boolean(body.allDay) : false
  const eventTime = itemType === 'event' && !allDay ? cleanTime(body.eventTime) : null
  const lane = laneFromDeadline(deadline, LANES.has(body.lane) ? body.lane : 'today')
  if (!title) return NextResponse.json({ error: 'Title is required.' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('andarun_todos')
    .insert({
      owner_id: identity.ownerId,
      title,
      note: note || null,
      lane,
      deadline,
      item_type: itemType,
      event_time: eventTime,
      all_day: allDay,
      done: false,
      updated_at: new Date().toISOString(),
    })
    .select('*')
    .single()

  if (error) {
    if (missingEventColumns(error)) {
      const fallback = await supabaseAdmin
        .from('andarun_todos')
        .insert({
          owner_id: identity.ownerId,
          title,
          note: encodeStoredNote(note, itemType, eventTime, allDay),
          lane,
          deadline,
          done: false,
          updated_at: new Date().toISOString(),
        })
        .select('*')
        .single()

      if (!fallback.error) return NextResponse.json({ todo: toClient(fallback.data) })
      console.error('[andarun-todos] POST fallback failed', fallback.error)
      return NextResponse.json({ error: fallback.error.message }, { status: 503 })
    }
    console.error('[andarun-todos] POST failed', error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }

  return NextResponse.json({ todo: toClient(data) })
}

export async function PATCH(request) {
  const identity = await getAndarunIdentity()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  let body = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const id = cleanText(body.id, 80)
  if (!id) return NextResponse.json({ error: 'ID is required.' }, { status: 400 })

  const update = { updated_at: new Date().toISOString() }
  if (typeof body.title === 'string') update.title = cleanText(body.title)
  if (typeof body.note === 'string') update.note = cleanText(body.note, 500) || null
  if (typeof body.lane === 'string' && LANES.has(body.lane)) update.lane = body.lane
  if (typeof body.itemType === 'string' && ITEM_TYPES.has(body.itemType)) update.item_type = body.itemType
  if (typeof body.allDay === 'boolean') update.all_day = body.allDay
  if (typeof body.eventTime === 'string') update.event_time = cleanTime(body.eventTime)
  if (typeof body.deadline === 'string') {
    update.deadline = cleanDeadline(body.deadline)
    update.lane = laneFromDeadline(update.deadline, update.lane || 'today')
  }
  if (update.item_type === 'todo') {
    update.event_time = null
    update.all_day = false
  }
  if (update.all_day) update.event_time = null
  if (typeof body.done === 'boolean') update.done = body.done
  if (typeof body.done === 'boolean') {
    update.completed_at = body.done ? new Date().toISOString() : null
  }

  if (update.title === '') return NextResponse.json({ error: 'Title is required.' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('andarun_todos')
    .update(update)
    .eq('id', id)
    .in('owner_id', lookupOwnerIds(identity))
    .select('*')
    .maybeSingle()

  if (error) {
    if (missingEventColumns(error)) {
      const fallbackUpdate = { updated_at: new Date().toISOString() }
      const itemType = ITEM_TYPES.has(body.itemType) ? body.itemType : null
      const allDay = itemType === 'event' ? Boolean(body.allDay) : false
      const eventTime = itemType === 'event' && !allDay ? cleanTime(body.eventTime) : null

      if (typeof body.title === 'string') fallbackUpdate.title = cleanText(body.title)
      if (typeof body.note === 'string') fallbackUpdate.note = encodeStoredNote(cleanText(body.note, 500), itemType || 'todo', eventTime, allDay)
      if (typeof body.lane === 'string' && LANES.has(body.lane)) fallbackUpdate.lane = body.lane
      if (typeof body.deadline === 'string') {
        fallbackUpdate.deadline = cleanDeadline(body.deadline)
        fallbackUpdate.lane = laneFromDeadline(fallbackUpdate.deadline, fallbackUpdate.lane || 'today')
      }
      if (typeof body.done === 'boolean') {
        fallbackUpdate.done = body.done
        fallbackUpdate.completed_at = body.done ? new Date().toISOString() : null
      }
      if (fallbackUpdate.title === '') return NextResponse.json({ error: 'Title is required.' }, { status: 400 })

      const fallback = await supabaseAdmin
        .from('andarun_todos')
        .update(fallbackUpdate)
        .eq('id', id)
        .in('owner_id', lookupOwnerIds(identity))
        .select('*')
        .maybeSingle()

      if (!fallback.error && fallback.data) return NextResponse.json({ todo: toClient(fallback.data) })
      if (!fallback.error && !fallback.data) return NextResponse.json({ error: 'Todo not found.' }, { status: 404 })
      console.error('[andarun-todos] PATCH fallback failed', fallback.error)
      return NextResponse.json({ error: fallback.error.message }, { status: 503 })
    }
    console.error('[andarun-todos] PATCH failed', error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }
  if (!data) return NextResponse.json({ error: 'Todo not found.' }, { status: 404 })

  return NextResponse.json({ todo: toClient(data) })
}

export async function DELETE(request) {
  const identity = await getAndarunIdentity()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  const { searchParams } = new URL(request.url)
  const id = cleanText(searchParams.get('id'), 80)
  if (!id) return NextResponse.json({ error: 'ID is required.' }, { status: 400 })

  const { error } = await supabaseAdmin
    .from('andarun_todos')
    .delete()
    .eq('id', id)
    .in('owner_id', lookupOwnerIds(identity))

  if (error) {
    console.error('[andarun-todos] DELETE failed', error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
