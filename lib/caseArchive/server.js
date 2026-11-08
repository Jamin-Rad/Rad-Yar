import { NextResponse } from 'next/server'
import { requireAndarunSession, ANDARUN_OWNER_ID, getAndarunSessionSecret } from '@/lib/andarunPasswordAuth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { createArchiveStore } from './store.mjs'
import { ArchiveError } from './model.mjs'
import { verifyArchiveToken } from './token.mjs'

export function privateJson(value, status = 200) {
  return NextResponse.json(value, { status, headers: { 'Cache-Control': 'private, no-store, max-age=0', 'X-Robots-Tag': 'noindex, nofollow', 'X-Content-Type-Options': 'nosniff' } })
}

export async function archiveAccess(request, write = false) {
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) throw new ArchiveError('Anfrage nicht erlaubt.', 403)
  const token = request.headers.get('x-case-archive-token')
  if (token) {
    if (!verifyArchiveToken(token, getAndarunSessionSecret())) throw new ArchiveError('Bitte erneut bei Jaminova anmelden.', 403)
  } else {
    const identity = await requireAndarunSession()
    if (identity.error || (write && !origin)) throw new ArchiveError('Bitte erneut bei Jaminova anmelden.', 403)
  }
  return createArchiveStore(supabaseAdmin, ANDARUN_OWNER_ID)
}

export async function archiveBody(request) {
  if (!(request.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) throw new ArchiveError('JSON-Daten werden benötigt.', 415)
  if (Number(request.headers.get('content-length')) > 1500000) throw new ArchiveError('Die Anfrage ist zu groß.', 413)
  const raw = await request.text()
  if (Buffer.byteLength(raw, 'utf8') > 1500000) throw new ArchiveError('Die Anfrage ist zu groß.', 413)
  try {
    const body = JSON.parse(raw)
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid body')
    return body
  } catch { throw new ArchiveError('Die Falldaten sind ungültig.') }
}

export function archiveFailure(error) {
  if (error instanceof ArchiveError) return privateJson({ error: error.message }, error.status)
  // Never return database details or log reports/patient data.
  return privateJson({ error: 'Das Archiv konnte nicht gespeichert oder geladen werden. Bitte erneut versuchen.' }, 503)
}
