import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getSignedInUserIdentity } from '@/lib/userIdentity'
import { getActivityCategory } from '@/utils/activityCategory'

export async function GET() {
  const identity = await getSignedInUserIdentity()
  if (!identity) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: 'Speicher nicht verfügbar' }, { status: 503 })
  }

  const [{ data: daily, error: dailyError }, { data: pages, error: pagesError }] = await Promise.all([
    supabaseAdmin
      .from('analytics_daily')
      .select('day,active_seconds,visits')
      .in('user_id', identity.lookupIds)
      .order('day', { ascending: true }),
    supabaseAdmin
      .from('analytics_pages')
      .select('day,path,active_seconds')
      .in('user_id', identity.lookupIds)
      .order('day', { ascending: true }),
  ])

  if (dailyError || pagesError) {
    console.error('Aktivitätsdaten konnten nicht geladen werden:', dailyError?.message || pagesError?.message)
    return NextResponse.json({ error: 'Aktivität nicht verfügbar' }, { status: 503 })
  }

  // Aggregate by day (user may have multiple visitor_ids per day)
  const byDay = {}
  for (const row of daily || []) {
    const key = row.day
    if (!byDay[key]) byDay[key] = { activeSeconds: 0, visits: 0, categories: {} }
    byDay[key].activeSeconds += Number(row.active_seconds || 0)
    byDay[key].visits += Number(row.visits || 0)
  }

  for (const row of pages || []) {
    const key = row.day
    if (!byDay[key]) byDay[key] = { activeSeconds: 0, visits: 0, categories: {} }
    const category = getActivityCategory(row.path)
    const seconds = Number(row.active_seconds || 0)
    byDay[key].categories[category] = Number(byDay[key].categories[category] || 0) + seconds
  }

  return NextResponse.json({ days: byDay })
}
