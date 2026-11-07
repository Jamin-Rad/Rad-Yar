import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { NOTES_BUCKET } from '@/lib/todoNotesContract.mjs'

export function notesJSON(value, status = 200) {
  return NextResponse.json(value, { status, headers: { 'Cache-Control': 'private, no-store', 'Vary': 'Cookie, X-Andarun-Token' } })
}
// Personal notes never inherit the shared task/Fatima identity fallback.
export async function notesIdentity(request) {
  const identity = await requireAndarunSession()
  if (identity.error) return { response: notesJSON({ error: 'Bitte bei Jaminova anmelden.' }, identity.status) }
  if (request.method !== 'GET') {
    const origin = request.headers.get('origin')
    if ((origin && origin !== new URL(request.url).origin) || request.headers.get('sec-fetch-site') === 'cross-site') {
      return { response: notesJSON({ error: 'Invalid origin.' }, 403) }
    }
    if (!request.headers.get('content-type')?.startsWith('application/json')) return { response: notesJSON({ error: 'JSON required.' }, 415) }
  }
  if (!supabaseAdmin) return { response: notesJSON({ error: 'Synchronisierung gerade nicht verfügbar.' }, 503) }
  return identity
}
export async function notesBody(request) {
  const text = await request.text()
  if (text.length > 65536) return null
  try { return JSON.parse(text) } catch { return null }
}
export function notesUnavailable() { return notesJSON({ error: 'Nicht synchronisiert. Bitte erneut versuchen; lokale Notizen bleiben erhalten.' }, 503) }
export async function storedAudio(path) {
  const split = path.lastIndexOf('/')
  const { data, error } = await supabaseAdmin.storage.from(NOTES_BUCKET).list(path.slice(0, split), { search: path.slice(split + 1), limit: 2 })
  if (error) throw error
  return data?.find(file => file.name === path.slice(split + 1))
}
