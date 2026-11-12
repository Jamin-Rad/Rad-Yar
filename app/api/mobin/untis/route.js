import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'
import { hasMobinSession, getMobinSessionSecret } from '@/lib/mobinAuth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { parseUntisCalendar } from '@/lib/mobinUntis'

const school = 'privates-gym-esslingen.webuntis.com'
const key = 'mobin-school-untis-v1'
const targets = ['calendar', 'timetable']
const json = (value, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'private, no-store' } })
const encryptionKey = () => createHash('sha256').update('mobin-untis-v1:' + getMobinSessionSecret()).digest()

function encrypt(link) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv)
  return [iv, cipher.update(link, 'utf8'), cipher.final(), cipher.getAuthTag()].map(item => item.toString('base64url'))
}

function decrypt(parts) {
  const [iv, data, end, tag] = parts.map(item => Buffer.from(item, 'base64url'))
  const cipher = createDecipheriv('aes-256-gcm', encryptionKey(), iv)
  cipher.setAuthTag(tag)
  return Buffer.concat([cipher.update(Buffer.concat([data, end])), cipher.final()]).toString('utf8')
}

function publicData(data, target) {
  return { available: Boolean(data.link), connected: Boolean(data[target]), events: data[target] ? data.events ?? [] : [], updated: data[target] ? data.updated : null }
}

async function loadFeed(link) {
  const url = new URL(link)
  if (url.protocol !== 'https:' || url.hostname !== school || url.port || url.username || url.password) {
    throw new Error('Verwende den iCal-Link deiner Schule auf ' + school + '.')
  }
  const response = await fetch(url, { redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(10000) })
  if (!response.ok || !response.body) throw new Error('WebUntis konnte den Kalender nicht liefern.')
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let size = 0
  let raw = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > 1500000) { await reader.cancel(); throw new Error('Der WebUntis-Kalender ist zu groß.') }
    raw += decoder.decode(value, { stream: true })
  }
  return parseUntisCalendar(raw + decoder.decode())
}

async function handle(request) {
  if (!await hasMobinSession()) return json({ error: 'Anmeldung erforderlich.' }, 401)
  if (!supabaseAdmin || !getMobinSessionSecret()) return json({ error: 'Untis-Speicher ist nicht verfügbar.' }, 503)
  const target = new URL(request.url).searchParams.get('target')
  if (!targets.includes(target)) return json({ error: 'Ungültiger Bereich.' }, 400)
  const table = supabaseAdmin.from('mobin_progress')
  const result = await table.select('data,updated_at').eq('id', key).maybeSingle()
  if (result.error) return json({ error: 'Untis-Verbindung konnte nicht geladen werden.' }, 503)
  const data = result.data?.data ?? {}
  if (request.method === 'GET') return json(publicData(data, target))
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'Ungültige Anfrage.' }, 415)
  let body
  try { body = await request.json() } catch { return json({ error: 'Ungültige Anfrage.' }, 400) }
  if (!body || (body.link != null && (typeof body.link !== 'string' || body.link.length > 2500))) return json({ error: 'Ungültiger iCal-Link.' }, 400)
  const link = body.link?.trim()
  if (!link && !data.link) return json({ error: 'Ein iCal-Link ist erforderlich.' }, 400)
  try {
    if (link || body.refresh || !data.updated) {
      data.events = await loadFeed(link || decrypt(data.link))
      data.updated = new Date().toISOString()
    }
    if (link) data.link = encrypt(link)
    data[target] = true
    const row = { data, updated_at: new Date().toISOString() }
    const saved = result.data
      ? await table.update(row).eq('id', key).eq('updated_at', result.data.updated_at).select('id').maybeSingle()
      : await table.insert({ id: key, ...row }).select('id').maybeSingle()
    if (saved.error?.code === '23505' || (!saved.error && !saved.data)) {
      return json({ error: 'Die Verbindung wurde gerade geändert. Bitte lade die Seite neu.' }, 409)
    }
    if (saved.error) return json({ error: 'Untis-Verbindung konnte nicht gespeichert werden.' }, 503)
    return json(publicData(data, target))
  } catch {
    return json({ error: 'Der iCal-Import ist fehlgeschlagen. Prüfe den aktiven Abo-Link deiner Schule.' }, 422)
  }
}

export const GET = handle
export const POST = handle
