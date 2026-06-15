// Seed-Skript: data/curriculum.js -> Supabase (fachgebiete, kapitel, themen)
// Aufruf: npx tsx scripts/seed/01-curriculum.mjs
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { CURRICULUM } from '../../data/curriculum.js'
const { supabaseAdmin, isSupabaseAdminConfigured } = await import('../../lib/supabase/server.js')

if (!isSupabaseAdminConfigured) {
  console.error('Supabase ist nicht konfiguriert (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY fehlen in .env.local).')
  process.exit(1)
}

const fachgebiete = []
const kapitelRows = []
const themenRows = []

CURRICULUM.forEach((fach, fachIndex) => {
  fachgebiete.push({
    id: fach.id,
    key: fach.title?.de ?? fach.id,
    icon: fach.icon ?? null,
    color: fach.color ?? null,
    bg: fach.bg ?? null,
    body_zone: fach.bodyZone ?? null,
    sort_order: fachIndex,
  })

  ;(fach.kapitel ?? []).forEach((kap, kapIndex) => {
    kapitelRows.push({
      id: kap.id,
      fachgebiet_id: fach.id,
      title: kap.title,
      icon: kap.icon ?? null,
      sort_order: kapIndex,
    })

    ;(kap.themen ?? []).forEach((thema, themaIndex) => {
      themenRows.push(themaRow(thema, kap.id, null, themaIndex))

      ;(thema.sub ?? []).forEach((sub, subIndex) => {
        themenRows.push(themaRow(sub, kap.id, thema.id, subIndex))
      })
    })
  })
})

function themaRow(thema, kapitelId, parentId, sortOrder) {
  return {
    id: thema.id,
    kapitel_id: kapitelId,
    parent_id: parentId,
    title: thema.title,
    tags: thema.tags ?? [],
    diff: thema.diff ?? 1,
    link: thema.link ?? null,
    mcq_link: thema.mcqLink ?? null,
    flashcard_link: thema.flashcardLink ?? null,
    fall_link: thema.fallLink ?? null,
    ready: thema.ready ?? false,
    sort_order: sortOrder,
    updated_at: thema.updatedAt ?? null,
  }
}

async function upsertAll(table, rows, chunkSize = 200) {
  let count = 0
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize)
    const { error } = await supabaseAdmin.from(table).upsert(chunk, { onConflict: 'id' })
    if (error) throw new Error(`Upsert ${table} fehlgeschlagen: ${error.message}`)
    count += chunk.length
  }
  return count
}

const fachCount = await upsertAll('fachgebiete', fachgebiete)
const kapCount = await upsertAll('kapitel', kapitelRows)
const themenCount = await upsertAll('themen', themenRows)

console.log(`fachgebiete: ${fachCount} upserted`)
console.log(`kapitel: ${kapCount} upserted`)
console.log(`themen: ${themenCount} upserted (davon Unterthemen: ${themenRows.filter(t => t.parent_id).length})`)
