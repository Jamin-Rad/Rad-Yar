import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

const ROW_ID = 'mobina-routine'
const ROUTINE_LIMITS = {
  malen: 2,
  anton: 2,
  sport: 1,
  fernsehen: 6,
  lesen: 2,
  schach: 2,
  tablet: 2,
}

export const dynamic = 'force-dynamic'

function sanitizeLogs(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  const dates = Object.keys(value)
    .filter(date => /^\d{4}-\d{2}-\d{2}$/.test(date))
    .sort()
    .slice(-730)

  return Object.fromEntries(dates.map(date => {
    const daily = value[date] && typeof value[date] === 'object' ? value[date] : {}
    const routines = Object.entries(ROUTINE_LIMITS).map(([id, limit]) => [
      id,
      Array.from({ length: limit }, (_, index) => Boolean(daily[id]?.[index])),
    ])
    return [date, Object.fromEntries(routines)]
  }))
}

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ logs: null, online: false }, { headers: { 'Cache-Control': 'no-store' } })
  }

  const { data, error } = await supabaseAdmin
    .from('mobin_progress')
    .select('data, updated_at')
    .eq('id', ROW_ID)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ logs: null, online: false, error: error.message }, { status: 503 })
  }

  return NextResponse.json(
    { logs: sanitizeLogs(data?.data?.logs), online: true, updatedAt: data?.updated_at || null },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}

export async function POST(request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Online-Speicherung ist nicht konfiguriert.' }, { status: 503 })
  }

  const body = await request.json()
  const logs = sanitizeLogs(body?.logs)

  const { error } = await supabaseAdmin
    .from('mobin_progress')
    .upsert({ id: ROW_ID, data: { logs }, updated_at: new Date().toISOString() }, { onConflict: 'id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, online: true })
}
