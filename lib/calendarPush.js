import 'server-only'
import webpush from 'web-push'
import { supabaseAdmin } from '@/lib/supabase/server'

export function pushConfigured() {
  return Boolean(supabaseAdmin && /^[A-Za-z0-9_-]{87}$/.test(process.env.CALENDAR_VAPID_PUBLIC_KEY || '') && /^[A-Za-z0-9_-]{43}$/.test(process.env.CALENDAR_VAPID_PRIVATE_KEY || '') && /^(mailto:|https:\/\/)/.test(process.env.CALENDAR_VAPID_SUBJECT || '') && process.env.CALENDAR_CRON_SECRET?.length >= 32)
}

export async function pushReadiness() {
  if (!pushConfigured()) return { ready: false, reason: 'Server-Einrichtung steht noch aus.' }
  const { data, error } = await supabaseAdmin.from('calendar_push_health').select('last_run').eq('id', 1).maybeSingle()
  if (error || !data) return { ready: false, reason: 'Datenbank und Zeitplan müssen noch eingerichtet werden.' }
  const active = Date.now() - Date.parse(data.last_run) < 3 * 60000
  return { ready: active, reason: active ? '' : 'Automatischer Versand ist derzeit nicht aktiv.' }
}

export async function sendCalendarPush(subscription, payload) {
  if (!pushConfigured()) throw new Error('Push not configured')
  return webpush.sendNotification(subscription, JSON.stringify(payload), {
    vapidDetails: { subject: process.env.CALENDAR_VAPID_SUBJECT, publicKey: process.env.CALENDAR_VAPID_PUBLIC_KEY, privateKey: process.env.CALENDAR_VAPID_PRIVATE_KEY },
    TTL: 300, urgency: 'high', timeout: 5000,
  })
}
