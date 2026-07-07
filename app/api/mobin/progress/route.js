import { NextResponse } from 'next/server'
import { hasMobinSession } from '@/lib/mobinAuth'
import { supabaseAdmin } from '@/lib/supabase/server'

const ROW_ID = 'main'

async function requireSession() {
  const ok = await hasMobinSession()
  if (!ok) return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 })
  return null
}

export async function GET() {
  const denied = await requireSession()
  if (denied) return denied

  if (!supabaseAdmin) return NextResponse.json({})

  const { data, error } = await supabaseAdmin
    .from('mobin_progress')
    .select('data')
    .eq('id', ROW_ID)
    .maybeSingle()

  if (error) return NextResponse.json({})
  return NextResponse.json(data?.data ?? {})
}

export async function POST(request) {
  const denied = await requireSession()
  if (denied) return denied

  if (!supabaseAdmin) return NextResponse.json({ ok: true })

  const body = await request.json()

  const { error } = await supabaseAdmin
    .from('mobin_progress')
    .upsert({ id: ROW_ID, data: body, updated_at: new Date().toISOString() })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
