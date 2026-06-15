// Seed-Skript: data/questions.js -> Supabase (questions)
// Aufruf: npx tsx scripts/seed/02-questions.mjs
// Voraussetzung: scripts/seed/01-curriculum.mjs wurde bereits ausgeführt (themen-Tabelle gefüllt).
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { QUESTION_BANK } from '../../data/questions.js'
import { getContrastGroupForTopic } from '../../data/contrastMedia.js'
const { supabaseAdmin, isSupabaseAdminConfigured } = await import('../../lib/supabase/server.js')

if (!isSupabaseAdminConfigured) {
  console.error('Supabase ist nicht konfiguriert (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY fehlen in .env.local).')
  process.exit(1)
}

const LANGS = ['de', 'en', 'fa']
const ID_PATTERN = /^(.+)-(de|en|fa)-(\d+)$/

// 1. Pro Sprache nach <topic>-<num> gruppieren
const groups = new Map() // key -> { de, en, fa }
for (const lang of LANGS) {
  for (const entry of QUESTION_BANK[lang] ?? []) {
    const match = entry.id.match(ID_PATTERN)
    if (!match || match[2] !== lang) {
      throw new Error(`Unerwartetes ID-Format: ${entry.id}`)
    }
    const key = `${match[1]}-${match[3]}`
    if (!groups.has(key)) groups.set(key, {})
    groups.get(key)[lang] = entry
  }
}

// 2. Existierende Themen-IDs laden (für thema_id-Auflösung)
const { data: themenRows, error: themenError } = await supabaseAdmin.from('themen').select('id')
if (themenError) throw new Error(`Laden von themen fehlgeschlagen: ${themenError.message}`)
const themenIds = new Set(themenRows.map(t => t.id))

function resolveThemaId(tags) {
  for (const tag of tags ?? []) {
    if (themenIds.has(tag)) return tag
  }
  for (const tag of tags ?? []) {
    const group = getContrastGroupForTopic(tag)
    if (group && themenIds.has(group.readId)) return group.readId
  }
  return null
}

// 3. Zeilen bauen
const rows = []
const unresolved = []

for (const [key, byLang] of groups) {
  if (!byLang.de || !byLang.en || !byLang.fa) {
    unresolved.push({ key, reason: `fehlende Sprachvariante (${LANGS.filter(l => !byLang[l]).join(', ')})` })
    continue
  }
  const { de, en, fa } = byLang
  const thema_id = resolveThemaId(de.tags)
  if (!thema_id) {
    unresolved.push({ key, reason: `kein Tag passt zu themen.id (tags: ${(de.tags ?? []).join(', ')})` })
    continue
  }

  rows.push({
    id: key,
    thema_id,
    question: { de: de.question, en: en.question, fa: fa.question },
    options: de.options.map((opt, i) => ({
      id: opt.id,
      text: { de: opt.text, en: en.options[i].text, fa: fa.options[i].text },
    })),
    correct: de.correct,
    explanation: { de: de.explanation, en: en.explanation, fa: fa.explanation },
  })
}

// 4. Upsert
async function upsertAll(table, allRows, chunkSize = 100) {
  let count = 0
  for (let i = 0; i < allRows.length; i += chunkSize) {
    const chunk = allRows.slice(i, i + chunkSize)
    const { error } = await supabaseAdmin.from(table).upsert(chunk, { onConflict: 'id' })
    if (error) throw new Error(`Upsert ${table} fehlgeschlagen: ${error.message}`)
    count += chunk.length
  }
  return count
}

const inserted = await upsertAll('questions', rows)

console.log(`questions: ${inserted} upserted (von ${groups.size} Gruppen)`)
if (unresolved.length) {
  console.log(`\n${unresolved.length} Gruppen NICHT eingefügt:`)
  for (const u of unresolved) console.log(`  - ${u.key}: ${u.reason}`)
}
