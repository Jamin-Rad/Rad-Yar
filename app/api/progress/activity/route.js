import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getSignedInUserIdentity } from '@/lib/userIdentity'

export async function GET() {
  const identity = await getSignedInUserIdentity()
  if (!identity) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: 'Speicher nicht verfügbar' }, { status: 503 })
  }

  const { data, error } = await supabaseAdmin
    .from('analytics_daily')
    .select('day,active_seconds,visits')
    .in('user_id', identity.lookupIds)
    .order('day', { ascending: true })

  if (error) {
    console.error('Aktivitätsdaten konnten nicht geladen werden:', error)
    return NextResponse.json({ error: 'Aktivität nicht verfügbar' }, { status: 503 })
  }

  // Aggregate by day (user may have multiple visitor_ids per day)
  const byDay = {}
  for (const row of data || []) {
    const key = row.day
    if (!byDay[key]) byDay[key] = { activeSeconds: 0, visits: 0 }
    byDay[key].activeSeconds += Number(row.active_seconds || 0)
    byDay[key].visits += Number(row.visits || 0)
  }

  return NextResponse.json({ days: byDay })
}
