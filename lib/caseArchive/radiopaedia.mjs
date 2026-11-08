// Contract reference: radiopaedia/RadiopaediaConnect, Services/RadiopaediaApiClient.cs
// and Models/RadiopaediaCaseModels.cs. This is a read-only account listing;
// it never sends original reports, patient identities or images to Radiopaedia.
import { ArchiveError } from './model.mjs'

export function remoteCaseSummary(value) {
  if (!Number.isSafeInteger(value?.id) || value.id < 1 || typeof value.title !== 'string' || !value.title.trim() || value.title.length > 500) throw new ArchiveError('Ungültiger Fall in der Radiopaedia-Antwort.')
  if (!['draft', 'pending_review', 'published'].includes(value.status)) throw new ArchiveError('Unbekannter Radiopaedia-Status; Import angehalten.')
  return { id: value.id, title: value.title.trim(), status: value.status, url: `https://radiopaedia.org/cases/${value.id}` }
}

export async function listRadiopaediaCases(token, { fetchImpl = fetch, maxPages = 200 } = {}) {
  if (!token) throw new ArchiveError('Eine autorisierte Radiopaedia-Verbindung fehlt.')
  const seen = new Set(), cases = new Map()
  let cursor = ''
  for (let page = 0; page < maxPages; page++) {
    const url = new URL('https://radiopaedia.org/api/v1/cases')
    url.searchParams.set('per_page', '100')
    if (cursor) url.searchParams.set('cursor', cursor)
    const response = await fetchImpl(url, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }, redirect: 'error', signal: AbortSignal.timeout(30000) })
    if (!response.ok) throw new ArchiveError(`Radiopaedia konnte nicht gelesen werden (HTTP ${response.status}).`, 502)
    const items = await response.json()
    if (!Array.isArray(items)) throw new ArchiveError('Unerwartete Radiopaedia-Antwort.', 502)
    for (const item of items) { const summary = remoteCaseSummary(item); cases.set(summary.id, summary) }
    cursor = response.headers.get('X-Next-Cursor') || ''
    if (!cursor) return [...cases.values()]
    if (!items.length || seen.has(cursor)) throw new ArchiveError('Radiopaedia-Paginierung ist unvollständig; es wurde noch nichts importiert.', 502)
    seen.add(cursor)
  }
  throw new ArchiveError('Radiopaedia-Seitenlimit erreicht; es wurde noch nichts importiert.', 502)
}
