import { NextResponse } from 'next/server'
import { calendarSchedulerAuthorization } from '@/utils/calendarSchedulerAuth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { ANDARUN_OWNER_ID, ANDARUN_LEGACY_OWNER_IDS } from '@/lib/andarunPasswordAuth'
import { pushConfigured, sendCalendarPush } from '@/lib/calendarPush'
import { dueReminders, eventFromRow, validPushSubscription } from '@/utils/calendarReminders'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60
const reply = (body, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

export async function GET(request) {
  const authorization = calendarSchedulerAuthorization(request,process.env.CALENDAR_CRON_SECRET)
  if (!authorization) return reply({ error: 'Unauthorized' }, 401)
  if (!pushConfigured()) return reply({ error: 'Push not configured' }, 503)
  const now = Date.now()
  const devices = await supabaseAdmin.from('calendar_push_subscriptions').select('*').eq('owner_id', ANDARUN_OWNER_ID).limit(20)
  if (devices.error) return reply({ error: 'Storage unavailable' }, 503)
  const activeDevices = (devices.data || []).filter(device => validPushSubscription(device.subscription) && device.leads.length > 0)
  const events = activeDevices.length ? await supabaseAdmin.from('andarun_todos').select('*').in('owner_id', [ANDARUN_OWNER_ID, ...ANDARUN_LEGACY_OWNER_IDS]).eq('done', false)
    .gte('deadline', new Date(now).toISOString().slice(0, 10)).lte('deadline', new Date(now + 2 * 86400000).toISOString().slice(0, 10))
    : { data: [], error: null }
  if (events.error) return reply({ error: 'Storage unavailable' }, 503)
  if (authorization === 'signed') {
    const heartbeat = await supabaseAdmin.from('calendar_push_health').upsert({ id: 1, last_run: new Date(now).toISOString() })
    if (heartbeat.error) return reply({ error: 'Scheduler storage unavailable' }, 503)
  }
  // Decode schedules and resolve Berlin/DST once per event, rather than once per device.
  // This is request-local; delivery still re-reads the current appointment and device below.
  const leads = [...new Set(activeDevices.flatMap(device => device.leads))]
  const candidates = (events.data || []).map(row => ({ row, reminders: dueReminders(eventFromRow(row), leads, now) }))
    .filter(candidate => candidate.reminders.length > 0)
  let sent = 0, failed = 0
  for (const device of activeDevices) {
    for (const { row, reminders } of candidates) {
      for (const reminder of reminders) {
        if (!device.leads.includes(reminder.lead)) continue
        if (Date.parse(device.enabled_at) > reminder.due) continue
        const claimed = await supabaseAdmin.rpc('claim_calendar_push', { p_owner: device.owner_id, p_endpoint: device.endpoint_hash, p_key: reminder.key })
        if (claimed.error || !claimed.data) continue
        // Re-read status/schedule after claiming: editing an appointment cancels old delivery.
        const fresh = await supabaseAdmin.from('andarun_todos').select('*').eq('id', row.id).eq('owner_id', row.owner_id).maybeSingle()
        if (fresh.error) { failed++; continue }
        if (!fresh.data || !dueReminders(eventFromRow(fresh.data), device.leads, now).some(item => item.key === reminder.key)) continue
        const deviceNow = await supabaseAdmin.from('calendar_push_subscriptions').select('leads, show_details, enabled_at').eq('owner_id', device.owner_id).eq('endpoint_hash', device.endpoint_hash).maybeSingle()
        if (deviceNow.error || !deviceNow.data || !deviceNow.data.leads.includes(reminder.lead) || Date.parse(deviceNow.data.enabled_at) > reminder.due) continue
        const current = eventFromRow(fresh.data)
        const title = reminder.lead === 1440 ? 'Termin in einem Tag' : 'Termin in 30 Minuten'
        const body = deviceNow.data.show_details ? `${current.title} · ${current.time}` : 'Öffne deinen persönlichen Kalender für die Details.'
        try {
          await sendCalendarPush(device.subscription, { title, body, tag: reminder.key })
          await supabaseAdmin.from('calendar_push_deliveries').update({ status: 'sent' }).eq('owner_id', device.owner_id).eq('endpoint_hash', device.endpoint_hash).eq('reminder_key', reminder.key)
          sent++
        } catch (error) {
          failed++
          if (error.statusCode === 404 || error.statusCode === 410) await supabaseAdmin.from('calendar_push_subscriptions').delete().eq('owner_id', device.owner_id).eq('endpoint_hash', device.endpoint_hash)
          await supabaseAdmin.from('calendar_push_deliveries').update({ status: 'failed' }).eq('owner_id', device.owner_id).eq('endpoint_hash', device.endpoint_hash).eq('reminder_key', reminder.key)
        }
      }
    }
  }
  await supabaseAdmin.from('calendar_push_deliveries').delete().lt('claimed_at', new Date(now - 30 * 86400000).toISOString())
  return reply({ ok: true, sent, failed })
}
