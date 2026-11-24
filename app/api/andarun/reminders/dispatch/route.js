import { NextResponse } from 'next/server'
import { calendarSchedulerAuthorization } from '@/utils/calendarSchedulerAuth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { pushConfigured, sendCalendarPush } from '@/lib/calendarPush'
import { validPushSubscription } from '@/utils/calendarReminders'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60
const reply = (body, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

function retryTime(header) {
  const now = Date.now()
  const value = String(header || '')
  const after = /^\d+$/.test(value) ? now + Number(value) * 1000 : Date.parse(value)
  // Retry on a later cron tick, within the SQL eligibility window.
  if (after > now + 300000) return 'infinity'
  const nextMinute = (Math.floor(now / 60000) + 1) * 60000
  return new Date(Math.max(nextMinute, Number.isFinite(after) ? after : 0)).toISOString()
}

async function deliver({ owner_id, endpoint_hash, reminder_key }) {
  const args = { p_owner: owner_id, p_endpoint: endpoint_hash, p_key: reminder_key }
  const claim = await supabaseAdmin.rpc('claim_due_calendar_push', args).maybeSingle()
  if (claim.error) throw new Error('Claim failed')
  if (!claim.data) return 'skipped'
  const { subscription, enabled_at, show_details, title, event_time, lead } = claim.data
  let status = 'rejected', retryAfter = null
  if (validPushSubscription(subscription)) {
    try {
      await sendCalendarPush(subscription, {
        title: lead === 1440 ? 'Termin in einem Tag' : 'Termin in 30 Minuten',
        body: show_details ? `${title} · ${event_time}` : 'Öffne deinen persönlichen Kalender für die Details.',
        tag: reminder_key,
      })
      status = 'sent'
    } catch (error) {
      if (error.statusCode === 404 || error.statusCode === 410) {
        const removal = await supabaseAdmin.from('calendar_push_subscriptions').delete()
          .eq('owner_id', owner_id).eq('endpoint_hash', endpoint_hash).eq('enabled_at', enabled_at)
        if (removal.error) throw new Error('Could not retire subscription')
      } else if (error.statusCode === 429 || error.statusCode === 503) {
        status = 'failed'
        retryAfter = retryTime(error.headers?.['retry-after'])
      } else if (!error.statusCode || error.statusCode >= 500) {
        status = 'uncertain'
      }
    }
  }
  const receipt = await supabaseAdmin.from('calendar_push_deliveries').update({ status, retry_after: retryAfter })
    .eq('owner_id', owner_id).eq('endpoint_hash', endpoint_hash).eq('reminder_key', reminder_key).eq('status', 'sending')
  if (receipt.error) throw new Error('Could not record delivery outcome')
  return status === 'sent' ? 'sent' : 'failed'
}

export async function GET(request) {
  if (!calendarSchedulerAuthorization(request,process.env.CALENDAR_CRON_SECRET)) return reply({ error: 'Unauthorized' },401)
  if (!pushConfigured()) return reply({ error: 'Push not configured' },503)
  let sent = 0, failed = 0
  const stopAt = Date.now() + 45000
  try {
    // Each new query excludes claimed receipts and sees cancellations or changed device settings.
    // Leave time for the final bounded group; any remaining work is eligible on the next tick.
    do {
      const { data, error } = await supabaseAdmin.rpc('calendar_push_candidates')
        .select('owner_id,endpoint_hash,reminder_key').limit(8)
      if (error) throw new Error('Could not read due reminders')
      if (!data?.length) break
      const outcomes = await Promise.allSettled(data.map(deliver))
      if (outcomes.some(result => result.status === 'rejected')) throw new Error('Storage unavailable')
      for (const { value } of outcomes) {
        if (value === 'sent') sent++
        if (value === 'failed') failed++
      }
      if (data.length < 8 || outcomes.every(result => result.value === 'skipped')) break
    } while (Date.now() < stopAt)
    return reply({ ok: true, sent, failed })
  } catch {
    return reply({ error: 'Storage unavailable' },503)
  }
}
