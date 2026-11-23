import { NextResponse } from 'next/server'
import { hasMobinSession } from '@/lib/mobinAuth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { validDraft, validResult } from '@/app/mobin/fach/latein/endungen/progress'
import { probeId, mergeProbeDraft, gradeProbeResult } from '@/app/mobin/fach/latein/endungen/probeProgress'

const prefix = 'mobin-latin-v1:'
const draftPrefix = prefix + 'draft:'
const resultPrefix = prefix + 'result:'

function reply(body, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } })
}

async function serve(operation) {
  if (!await hasMobinSession()) return reply({ error: 'Anmeldung erforderlich.' }, 401)
  if (!supabaseAdmin) return reply({ error: 'Online-Speicher nicht verfügbar.' }, 503)
  try {
    return await operation(supabaseAdmin.from('mobin_progress'))
  } catch (error) {
    console.error('Mobin Latin progress storage failed', error.code || error.message)
    return reply({ error: 'Online-Speicher nicht erreichbar.' }, 503)
  }
}

export function GET() {
  return serve(async (table) => {
    const results = []
    const drafts = {}
    let lastId = prefix
    while (true) {
      const { data, error } = await table.select('id,data').like('id', prefix + '%')
        .gt('id', lastId).order('id').limit(500)
      if (error) throw error
      for (const row of data) {
        const mode = row.id.slice(draftPrefix.length)
        if (row.id.startsWith(draftPrefix) && validDraft(mode, row.data)) drafts[mode] = row.data
        if (row.id.startsWith(resultPrefix) && validResult(row.data)) results.push(row.data)
      }
      if (data.length < 500) return reply({ results, drafts })
      lastId = data.at(-1).id
    }
  })
}

export function POST(request) {
  return serve(async (table) => {
    if (request.headers.get('origin') && request.headers.get('sec-fetch-site') === 'cross-site') {
      return reply({ error: 'Ungültige Anfrage.' }, 403)
    }
    if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') ?? '')) {
      return reply({ error: 'JSON erforderlich.' }, 415)
    }
    let body
    try {
      const raw = await request.text()
      if (raw.length > 60000) return reply({ error: 'Anfrage zu groß.' }, 413)
      body = JSON.parse(raw)
    } catch {
      return reply({ error: 'Ungültige Anfrage.' }, 400)
    }

    const drafts = Object.entries(body?.drafts ?? {})
    const results = body?.results
    if (!Array.isArray(results) || results.length > 100 || !results.every(validResult)
      || !drafts.every(([mode, entry]) => validDraft(mode, entry) && entry.modifiedAt <= Date.now() + 300000)) {
      return reply({ error: 'Ungültiger Lernstand.' }, 400)
    }
    if (results.length) {
      const updated_at = new Date().toISOString()
      const rows = []
      for (let result of results) {
        if (probeId(result.mode)) {
          let first
          if (result.mode.endsWith('-review')) {
            first = results.find(r => r.mode === result.mode.replace('-review', ''))
            // The stored first attempt is authoritative, even when another device submits both.
            const { data, error } = await table.select('data').eq('id', resultPrefix + probeId(result.mode.replace('-review', ''))).maybeSingle()
            if (error) throw error
            first = data?.data || (first ? gradeProbeResult(first) : null)
            if (!first) return reply({ error: 'Zuerst den ersten Versuch speichern.' }, 409)
          }
          result = gradeProbeResult(result, first)
          if (!result) return reply({ error: 'Der Versuch ist nicht vollständig.' }, 400)
        }
        rows.push({ id: resultPrefix + result.id, data: result, updated_at })
      }
      const { error } = await table.upsert(rows, { onConflict: 'id', ignoreDuplicates: true })
      if (error) throw error
    }
    for (const [mode, entry] of drafts) {
      const id = draftPrefix + mode
      if (probeId(mode)) {
        for (let attempt = 0; attempt < 4; attempt++) {
          const { data: previous, error: readError } = await table.select('data,updated_at').eq('id', id).maybeSingle()
          if (readError) throw readError
          const merged = mergeProbeDraft(previous?.data, entry)
          const stamp = new Date(Math.max(Date.now(), (Date.parse(previous?.updated_at) || 0) + 1)).toISOString()
          if (!previous) {
            const { error } = await table.insert({ id, data: merged, updated_at: stamp })
            if (error?.code === '23505') {
              if (attempt === 3) return reply({ error: 'Bitte erneut synchronisieren.' }, 409)
              continue
            }
            if (error) throw error
            break
          }
          const { data, error } = await table.update({ data: merged, updated_at: stamp }).eq('id', id).eq('updated_at', previous.updated_at).select('id')
          if (error) throw error
          if (data?.length) break
          if (attempt === 3) return reply({ error: 'Bitte erneut synchronisieren.' }, 409)
        }
        continue
      }
      const updated_at = new Date(entry.modifiedAt).toISOString()
      const { error: insertError } = await table.upsert({ id, data: entry, updated_at }, { onConflict: 'id', ignoreDuplicates: true })
      if (insertError) throw insertError
      // The comparison happens in the database so delayed requests cannot restore a superseded draft.
      const { error } = await table.update({ data: entry, updated_at }).eq('id', id).lt('updated_at', updated_at)
      if (error) throw error
    }
    return reply({ saved: true })
  })
}
