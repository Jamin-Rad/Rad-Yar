import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const STATE_ID = 'andarun:work'

const EMPTY_STATE = {
  shifts: [],
  findings: [],
}

function unavailable() {
  return NextResponse.json({ error: 'Andarun work storage is not available.' }, { status: 503 })
}

function normalizeState(value) {
  const state = value && typeof value === 'object' ? value : {}
  return {
    shifts: Array.isArray(state.shifts) ? state.shifts : [],
    findings: Array.isArray(state.findings) ? state.findings : [],
  }
}

function cleanText(value, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function cleanDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : ''
}

function cleanTime(value) {
  return typeof value === 'string' && /^\d{2}:\d{2}$/.test(value) ? value : ''
}

async function readState() {
  const { data, error } = await supabaseAdmin
    .from('admin_budget_state')
    .select('store')
    .eq('id', STATE_ID)
    .maybeSingle()

  if (error) throw error
  return normalizeState(data?.store || EMPTY_STATE)
}

async function writeState(state) {
  const store = normalizeState(state)
  const payload = {
    id: STATE_ID,
    store,
    updated_at: new Date().toISOString(),
  }
  const result = await supabaseAdmin
    .from('admin_budget_state')
    .upsert(payload, { onConflict: 'id' })
    .select('store')
    .single()

  if (!result.error) return normalizeState(result.data?.store || store)

  const text = `${result.error?.message || ''} ${result.error?.details || ''} ${result.error?.hint || ''} ${result.error?.code || ''}`
  if (!/updated_at|schema cache|PGRST204/i.test(text)) throw result.error

  const fallback = await supabaseAdmin
    .from('admin_budget_state')
    .upsert({ id: STATE_ID, store }, { onConflict: 'id' })
    .select('store')
    .single()

  if (fallback.error) throw fallback.error
  return normalizeState(fallback.data?.store || store)
}

async function requireAccess() {
  const identity = await requireAndarunSession()
  if (identity.error) return { response: NextResponse.json({ error: identity.error }, { status: identity.status }) }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return { response: unavailable() }
  return {}
}

function sanitizeShift(value) {
  const date = cleanDate(value?.date)
  return {
    id: cleanText(value?.id, 80) || `shift-${date}`,
    date,
    model: cleanText(value?.model, 20),
    duty: cleanText(value?.duty, 20),
    plannedStart: cleanTime(value?.plannedStart),
    plannedEnd: cleanTime(value?.plannedEnd),
    actualStart: cleanTime(value?.actualStart),
    actualEnd: cleanTime(value?.actualEnd),
    note: cleanText(value?.note, 280),
    updatedAt: new Date().toISOString(),
  }
}

function sanitizeFinding(value) {
  return {
    id: cleanText(value?.id, 80) || `finding-${Date.now()}`,
    examDate: cleanDate(value?.examDate),
    birthDate: cleanDate(value?.birthDate),
    modality: cleanText(value?.modality, 40),
    exam: cleanText(value?.exam, 120),
    vd: cleanText(value?.vd, 160),
    organ: cleanText(value?.organ, 100),
    question: cleanText(value?.question, 500),
    status: cleanText(value?.status, 40) || 'offen',
    createdAt: value?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export async function GET() {
  const access = await requireAccess()
  if (access.response) return access.response

  try {
    return NextResponse.json(await readState())
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 503 })
  }
}

export async function POST(request) {
  const access = await requireAccess()
  if (access.response) return access.response

  let body = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  try {
    const state = await readState()

    if (body.type === 'shift') {
      const shift = sanitizeShift(body.shift)
      if (!shift.date || !shift.model) return NextResponse.json({ error: 'Dienst und Datum fehlen.' }, { status: 400 })
      const next = {
        ...state,
        shifts: [shift, ...state.shifts.filter(item => item.date !== shift.date)]
          .sort((a, b) => String(a.date).localeCompare(String(b.date))),
      }
      return NextResponse.json(await writeState(next))
    }

    if (body.type === 'finding') {
      const finding = sanitizeFinding(body.finding)
      if (!finding.examDate && !finding.question) return NextResponse.json({ error: 'Befunddaten fehlen.' }, { status: 400 })
      const next = {
        ...state,
        findings: [finding, ...state.findings.filter(item => item.id !== finding.id)]
          .sort((a, b) => String(b.examDate || b.createdAt).localeCompare(String(a.examDate || a.createdAt))),
      }
      return NextResponse.json(await writeState(next))
    }

    return NextResponse.json({ error: 'Unknown type.' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  const access = await requireAccess()
  if (access.response) return access.response

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const id = cleanText(searchParams.get('id'), 80)
  if (!type || !id) return NextResponse.json({ error: 'Typ und ID fehlen.' }, { status: 400 })

  try {
    const state = await readState()
    const next = type === 'finding'
      ? { ...state, findings: state.findings.filter(item => item.id !== id) }
      : { ...state, shifts: state.shifts.filter(item => item.id !== id && item.date !== id) }
    return NextResponse.json(await writeState(next))
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
