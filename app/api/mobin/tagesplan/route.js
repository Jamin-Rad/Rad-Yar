import { NextResponse } from 'next/server'
import { hasMobinSession } from '@/lib/mobinAuth'
import { supabaseAdmin } from '@/lib/supabase/server'

const today = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' })
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i
const reply = (body, status = 200) => NextResponse.json(body, {
  status, headers: { 'Cache-Control': 'private, no-store' },
})

function table() { return supabaseAdmin.from('mobin_daily_plans') }

function validPlan(plan) {
  if (!plan || typeof plan.start !== 'string' || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(plan.start)
      || !Array.isArray(plan.blocks) || !plan.blocks.length || plan.blocks.length > 72) return false
  const ids = new Set()
  let total = 0
  for (const block of plan.blocks) {
    if (!block || typeof block.id !== 'string' || !block.id.length || block.id.length > 80 || ids.has(block.id)
        || typeof block.name !== 'string' || !block.name.length || block.name.length > 80
        || !['focus', 'pause'].includes(block.group)
        || !Number.isInteger(block.units) || block.units < 1 || block.units > 72
        || (block.done != null && (!Number.isInteger(block.done) || block.done < 0 || block.done > block.units))
        || (block.activityId != null && (typeof block.activityId !== 'string' || block.activityId.length > 80))) return false
    ids.add(block.id)
    total += block.units
  }
  const [hour, minute] = plan.start.split(':').map(Number)
  return total <= 72 && hour * 60 + minute + total * 5 <= 1440
}

async function readPlan(day) {
  const { data, error } = await table().select('id,start_time,blocks').eq('day', day).maybeSingle()
  if (error) throw error
  return data ? { id: data.id, start: data.start_time, blocks: data.blocks } : null
}

async function serve(request, operation) {
  if (!await hasMobinSession()) return reply({ error: 'Anmeldung erforderlich.' }, 401)
  if (!supabaseAdmin) return reply({ error: 'Der Online-Speicher ist nicht verfügbar.' }, 503)
  let body
  if (request.method !== 'GET') {
    if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') || '')) {
      return reply({ error: 'JSON erforderlich.' }, 415)
    }
    try {
      const raw = await request.text()
      if (raw.length > 32000) return reply({ error: 'Der Plan ist zu groß.' }, 413)
      body = JSON.parse(raw)
    } catch { return reply({ error: 'Ungültige Anfrage.' }, 400) }
  }
  try { return await operation(today(), body) } catch (error) {
    console.error('Mobin daily plan storage failed', error.code || error.message)
    return reply({ error: 'Der Online-Speicher ist gerade nicht erreichbar.' }, 503)
  }
}

export function GET(request) {
  return serve(request, async day => reply({ day, plan: await readPlan(day) }))
}

export function PUT(request) {
  return serve(request, async (day, body) => {
    if (!validPlan(body?.plan) || (body.previousId != null && !uuid.test(body.previousId))) {
      return reply({ error: 'Ungültiger Tagesplan.' }, 400)
    }
    if (body.day !== day) return reply({ error: 'Der Tag hat gewechselt. Bitte lade die Seite neu.' }, 409)
    const plan = {
      id: crypto.randomUUID(), start_time: body.plan.start,
      blocks: body.plan.blocks.map(({ id, name, group, units, done = 0, activityId }) =>
        ({ id, name, group, units, done, ...(activityId ? { activityId } : {}) })),
    }
    if (body.previousId) {
      const { data, error } = await table().update(plan).eq('day', day).eq('id', body.previousId).select('id').maybeSingle()
      if (error) throw error
      if (!data) return reply({ error: 'Der Plan wurde auf einem anderen Gerät ersetzt. Bitte lade die Seite neu.' }, 409)
    } else {
      const { data, error } = await table().upsert({ day, ...plan }, { onConflict: 'day', ignoreDuplicates: true }).select('id').maybeSingle()
      if (error) throw error
      if (!data && !body.importLocal) return reply({ error: 'Für heute gibt es bereits einen Online-Plan. Bitte lade die Seite neu.' }, 409)
    }
    return reply({ day, plan: await readPlan(day) })
  })
}

export function PATCH(request) {
  return serve(request, async (day, body) => {
    if (!uuid.test(body?.planId) || typeof body.blockId !== 'string' || !body.blockId.length || body.blockId.length > 80
        || !Number.isInteger(body.done) || body.done < 0 || body.done > 72) {
      return reply({ error: 'Ungültiger Fortschritt.' }, 400)
    }
    if (body.day !== day) return reply({ error: 'Der Tag hat gewechselt. Bitte lade die Seite neu.' }, 409)
    const { data, error } = await supabaseAdmin.rpc('update_mobin_plan_progress', {
      p_day: day, p_plan: body.planId, p_block: body.blockId, p_done: body.done,
    })
    if (error) throw error
    return data ? reply({ saved: true }) : reply({ error: 'Der Plan wurde geändert. Bitte lade die Seite neu.' }, 409)
  })
}
