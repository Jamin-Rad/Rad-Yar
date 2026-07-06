import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { isAndarunUser } from '@/lib/andarunAuth'
import { canonicalUserEmail } from '@/lib/emailIdentity'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const LANES = new Set(['urgent', 'today', 'watch'])

function unavailable() {
  return NextResponse.json({ error: 'Andarun storage is not available.' }, { status: 503 })
}

async function getAndarunIdentity() {
  const user = await currentUser()
  if (!user) return { error: 'Not signed in', status: 401 }
  if (!isAndarunUser(user)) return { error: 'Not allowed for Andarun', status: 403 }

  const email = canonicalUserEmail(user)
  return { ownerId: `email:${email}` }
}

function toClient(row) {
  return {
    id: row.id,
    title: row.title,
    note: row.note || '',
    lane: row.lane,
    deadline: row.deadline || '',
    done: Boolean(row.done),
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

export async function GET() {
  const identity = await getAndarunIdentity()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  const { data, error } = await supabaseAdmin
    .from('andarun_todos')
    .select('*')
    .eq('owner_id', identity.ownerId)
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
  const lane = LANES.has(body.lane) ? body.lane : 'today'
  if (!title) return NextResponse.json({ error: 'Title is required.' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('andarun_todos')
    .insert({
      owner_id: identity.ownerId,
      title,
      note: cleanText(body.note, 500) || null,
      lane,
      deadline: cleanDeadline(body.deadline),
      done: false,
      updated_at: new Date().toISOString(),
    })
    .select('*')
    .single()

  if (error) {
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
  if (typeof body.deadline === 'string') update.deadline = cleanDeadline(body.deadline)
  if (typeof body.done === 'boolean') update.done = body.done

  if (update.title === '') return NextResponse.json({ error: 'Title is required.' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('andarun_todos')
    .update(update)
    .eq('id', id)
    .eq('owner_id', identity.ownerId)
    .select('*')
    .maybeSingle()

  if (error) {
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
    .eq('owner_id', identity.ownerId)

  if (error) {
    console.error('[andarun-todos] DELETE failed', error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
