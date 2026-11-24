import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { ROUTINE_LIMITS, sanitizeLogs, validDay, validId, validStep } from '@/lib/mobinaRoutine'

export const dynamic = 'force-dynamic'
const reply = (body, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } })
const unavailable = () => reply({ online: false, error: 'Online-Speicher nicht erreichbar.' }, 503)
const reload = () => reply({ online: false, error: 'Bitte die Seite neu laden.' }, 409)

async function read() {
  const { data, error } = await supabaseAdmin.from('mobin_progress').select('data,updated_at').eq('id', 'mobina-routine').maybeSingle()
  if (error) throw error
  return { logs: sanitizeLogs(data?.data?.logs), versions: data?.data?.stepVersions || {}, updatedAt: data?.updated_at ?? null }
}

export async function GET(request) {
  if (!supabaseAdmin) return reply({ logs: null, online: false })
  try {
    const state = await read()
    if (new URL(request.url).searchParams.get('v') === '2') return reply({ ...state, online: true })
    // Older pages echo unknown log keys. A view can update a slot it saw or last edited.
    const view = { id: crypto.randomUUID(), versions: state.versions }
    return reply({ logs: { ...state.logs, __view: view }, updatedAt: state.updatedAt, online: true })
  } catch { return unavailable() }
}

async function apply(steps) {
  const { data, error } = await supabaseAdmin.rpc('apply_mobina_routine_steps', { p_steps: steps })
  if (error) throw error
  return data
}

export async function PATCH(request) {
  const body = await request.json().catch(() => null)
  const steps = body?.steps
  if (!Array.isArray(steps) || !steps.length || steps.length > 64 || !steps.every(validStep)) {
    return reply({ error: 'Ungültige Schritte.' }, 400)
  }
  if (!supabaseAdmin) return unavailable()
  try { return reply({ results: await apply(steps), online: true }) } catch { return unavailable() }
}

// Compatibility for pages already open during deployment. Never replace the shared history.
export async function POST(request) {
  const body = await request.json().catch(() => null)
  if (!body?.logs || typeof body.logs !== 'object' || Array.isArray(body.logs)) return reply({ error: 'Ungültige Daten.' }, 400)
  if (!supabaseAdmin) return unavailable()
  try {
    const { logs, versions } = await read()
    const view = body.logs.__view
    const steps = []
    let conflict = false
    for (const day of Object.keys(body.logs).filter(validDay).sort().slice(-730)) {
      for (const [routine, count] of Object.entries(ROUTINE_LIMITS)) {
        const bits = body.logs[day]?.[routine]
        if (!Array.isArray(bits)) continue
        for (let index = 0; index < count; index++) {
          const checked = bits[index]
          if (typeof checked !== 'boolean' || checked === Boolean(logs[day]?.[routine]?.[index])) continue
          if (!validId.test(view?.id)) return reload()
          const key = routine + ':' + index
          const base = versions[day]?.[key] ?? null
          if (base !== (view.versions?.[day]?.[key] ?? null) && !base?.startsWith(view.id + '/')) {
            conflict = true
            continue
          }
          steps.push({ id: view.id + '/' + crypto.randomUUID(), day, routine, index, checked, base })
        }
      }
    }
    if (steps.length > 64) return reload()
    if (steps.length) {
      const results = await apply(steps)
      conflict ||= results.some((result, i) => result.checked !== steps[i].checked)
    }
    return conflict ? reload() : reply({ ok: true, online: true })
  } catch { return unavailable() }
}
