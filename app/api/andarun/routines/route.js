import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { requireFatimaSession, SHARED_ANDARUN_OWNER_ID } from '@/lib/fatimaPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const COLORS = new Set(['gold', 'rose', 'mint', 'sky', 'violet'])

function unavailable() {
  return NextResponse.json({ error: 'Routine storage is not available.' }, { status: 503 })
}

async function getAndarunIdentity() {
  const andarun = await requireAndarunSession()
  if (!andarun.error) return andarun
  const fatima = await requireFatimaSession()
  if (!fatima.error) return { ownerId: SHARED_ANDARUN_OWNER_ID }
  return andarun
}

function cleanText(value, maxLength = 160) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function cleanDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null
}

function cleanAmount(value, fallback = 0) {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return Math.max(0, Math.round(number * 100) / 100)
}

function monthRange(month) {
  const match = typeof month === 'string' ? month.match(/^(\d{4})-(\d{2})$/) : null
  const now = new Date()
  const year = match ? Number(match[1]) : now.getFullYear()
  const monthIndex = match ? Number(match[2]) - 1 : now.getMonth()
  const start = new Date(Date.UTC(year, monthIndex, 1))
  const end = new Date(Date.UTC(year, monthIndex + 1, 1))
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  }
}

function toRoutine(row) {
  return {
    id: row.id,
    title: row.title,
    unit: row.unit,
    dailyTarget: Number(row.daily_target) || 1,
    color: row.color || 'gold',
    archived: Boolean(row.archived),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function toLog(row) {
  return {
    id: row.id,
    routineId: row.routine_id,
    date: row.log_date,
    amount: Number(row.amount) || 0,
    note: row.note || '',
    updatedAt: row.updated_at,
  }
}

export async function GET(request) {
  const identity = await getAndarunIdentity()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  const { searchParams } = new URL(request.url)
  const range = monthRange(searchParams.get('month'))

  const routinesQuery = supabaseAdmin
    .from('andarun_routines')
    .select('*')
    .eq('owner_id', identity.ownerId)
    .eq('archived', false)
    .order('updated_at', { ascending: false })

  const logsQuery = supabaseAdmin
    .from('andarun_routine_logs')
    .select('*')
    .eq('owner_id', identity.ownerId)
    .gte('log_date', range.start)
    .lt('log_date', range.end)
    .order('log_date', { ascending: false })

  const [routinesResult, logsResult] = await Promise.all([routinesQuery, logsQuery])
  if (routinesResult.error) return NextResponse.json({ error: routinesResult.error.message }, { status: 503 })
  if (logsResult.error) return NextResponse.json({ error: logsResult.error.message }, { status: 503 })

  return NextResponse.json({
    routines: (routinesResult.data || []).map(toRoutine),
    logs: (logsResult.data || []).map(toLog),
  })
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

  if (body.action === 'log') {
    const routineId = cleanText(body.routineId, 80)
    const logDate = cleanDate(body.date)
    if (!routineId || !logDate) return NextResponse.json({ error: 'Routine and date are required.' }, { status: 400 })

    const { data, error } = await supabaseAdmin
      .from('andarun_routine_logs')
      .upsert({
        routine_id: routineId,
        owner_id: identity.ownerId,
        log_date: logDate,
        amount: cleanAmount(body.amount),
        note: cleanText(body.note, 240) || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'routine_id,log_date' })
      .select('*')
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 503 })
    return NextResponse.json({ log: toLog(data) })
  }

  const title = cleanText(body.title)
  if (!title) return NextResponse.json({ error: 'Title is required.' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('andarun_routines')
    .insert({
      owner_id: identity.ownerId,
      title,
      unit: cleanText(body.unit, 40) || 'Einheit',
      daily_target: Math.max(cleanAmount(body.dailyTarget, 1), 0.01),
      color: COLORS.has(body.color) ? body.color : 'gold',
      updated_at: new Date().toISOString(),
    })
    .select('*')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 503 })
  return NextResponse.json({ routine: toRoutine(data) })
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
  if (typeof body.unit === 'string') update.unit = cleanText(body.unit, 40) || 'Einheit'
  if (body.dailyTarget != null) update.daily_target = Math.max(cleanAmount(body.dailyTarget, 1), 0.01)
  if (typeof body.color === 'string' && COLORS.has(body.color)) update.color = body.color
  if (typeof body.archived === 'boolean') update.archived = body.archived
  if (update.title === '') return NextResponse.json({ error: 'Title is required.' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('andarun_routines')
    .update(update)
    .eq('id', id)
    .eq('owner_id', identity.ownerId)
    .select('*')
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 503 })
  if (!data) return NextResponse.json({ error: 'Routine not found.' }, { status: 404 })
  return NextResponse.json({ routine: toRoutine(data) })
}

export async function DELETE(request) {
  const identity = await getAndarunIdentity()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  const { searchParams } = new URL(request.url)
  const id = cleanText(searchParams.get('id'), 80)
  if (!id) return NextResponse.json({ error: 'ID is required.' }, { status: 400 })

  const { error } = await supabaseAdmin
    .from('andarun_routines')
    .update({ archived: true, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('owner_id', identity.ownerId)

  if (error) return NextResponse.json({ error: error.message }, { status: 503 })
  return NextResponse.json({ ok: true })
}
