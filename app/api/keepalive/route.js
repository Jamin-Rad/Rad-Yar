import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

// Vercel Cron: täglich um 06:00 UTC aufgerufen (vercel.json)
// Hält das Supabase Free-Tier-Projekt aktiv (pausiert nach 7 Tagen Inaktivität).
export async function GET(request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ ok: false, error: 'Supabase nicht konfiguriert' }, { status: 503 })
  }

  const { count, error } = await supabaseAdmin
    .from('fachgebiete')
    .select('id', { count: 'exact', head: true })

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, fachgebiete: count, ts: new Date().toISOString() })
}
