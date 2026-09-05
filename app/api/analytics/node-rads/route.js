import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const EVENT_PATHS = {
  recommend_open: '/node-rads/event/recommend-open',
  whatsapp_click: '/node-rads/event/whatsapp-click',
  copy_link: '/node-rads/event/copy-link',
}
const REFERRAL_CHANNELS = new Set(['whatsapp', 'copy', 'qr'])

export async function POST(request) {
  try {
    if (!isSupabaseAdminConfigured || !supabaseAdmin) {
      return new NextResponse(null, { status: 204 })
    }

    const payload = await request.json()
    const event = typeof payload.event === 'string' ? payload.event : ''
    const channel = typeof payload.channel === 'string' ? payload.channel : ''
    const path = event === 'referral_visit' && REFERRAL_CHANNELS.has(channel)
      ? `/node-rads/event/referral-${channel}`
      : EVENT_PATHS[event]

    if (!path) return NextResponse.json({ error: 'Ungültiges Event' }, { status: 400 })

    const { error } = await supabaseAdmin.from('analytics_pages').insert({
      visitor_id: `ne_${crypto.randomUUID().replaceAll('-', '')}`,
      user_id: null,
      path,
      views: 1,
      active_seconds: 0,
    })

    if (error) {
      console.error('Node-RADS-Event konnte nicht gespeichert werden:', error.message)
      return NextResponse.json({ error: 'Statistik nicht verfügbar' }, { status: 503 })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Node-RADS-Analytics-Fehler:', error)
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
  }
}
