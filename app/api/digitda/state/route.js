import { NextResponse } from 'next/server'
import { requireDigitDASession } from '@/lib/digitdaAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const STATE_ID = 'digitda:finance'

export async function GET() {
  const access = await requireDigitDASession()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })
  if (!isSupabaseAdminConfigured) return NextResponse.json({ state: null, localOnly: true })

  const { data, error } = await supabaseAdmin
    .from('digitda_finance_state')
    .select('state,updated_at')
    .eq('id', STATE_ID)
    .maybeSingle()

  if (error) {
    if (/does not exist|schema cache|PGRST205|42P01/i.test(error.message || '')) {
      return NextResponse.json({ state: null, localOnly: true })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ state: data?.state ?? null, updatedAt: data?.updated_at ?? null })
}

export async function PUT(request) {
  const access = await requireDigitDASession()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })
  if (!isSupabaseAdminConfigured) return NextResponse.json({ ok: true, localOnly: true })

  let body = {}
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'Ungültige Daten.' }, { status: 400 })
  }
  if (!body.state || typeof body.state !== 'object') {
    return NextResponse.json({ error: 'Ungültiger Finanzstatus.' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('digitda_finance_state').upsert({
    id: STATE_ID,
    state: body.state,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' })

  if (error) {
    if (/does not exist|schema cache|PGRST205|42P01/i.test(error.message || '')) {
      return NextResponse.json({ ok: true, localOnly: true })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
