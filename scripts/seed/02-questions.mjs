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

// ── ID-Normalisierung ──────────────────────────────────────────────────────────
// Unterstützte Formate:
//   1. topic-de-01           (alt, Zahl am Ende)       → key: topic-01
//   2. topic-de-keyword      (Sprache in Mitte)         → key: topic-keyword
//   3. topic-keyword-01-de   (Sprache am Ende)          → key: topic-keyword-01
//   4. topic-q01             (sprachneutral)            → key: topic-q01

function canonicalId(deId) {
  // Format 3: endet auf -de
  if (deId.endsWith('-de')) return deId.slice(0, -3)
  // Format 1+2: -de- in der Mitte
  const mid = deId.indexOf('-de-')
  if (mid !== -1) return deId.slice(0, mid) + deId.slice(mid + 3) // entfernt "-de" aus "-de-"
  // Format 4: sprachneutral – unverändertes ID
  return deId
}

function findTranslation(deId, lang, byId) {
  // Format 4: gleiche ID in allen Sprachen
  if (byId.has(deId)) return byId.get(deId)
  // Format 3: -de am Ende ersetzen
  if (deId.endsWith('-de')) {
    const id = deId.slice(0, -3) + `-${lang}`
    if (byId.has(id)) return byId.get(id)
  }
  // Format 1+2: -de- in der Mitte ersetzen
  const translated = deId.replace('-de-', `-${lang}-`)
  if (byId.has(translated)) return byId.get(translated)
  return null
}

// ── Lookup-Maps für EN und FA ──────────────────────────────────────────────────
const enById = new Map((QUESTION_BANK.en ?? []).map(q => [q.id, q]))
const faById = new Map((QUESTION_BANK.fa ?? []).map(q => [q.id, q]))

// ── Existierende Themen-IDs laden (für thema_id-Auflösung) ────────────────────
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

// ── Zeilen bauen ───────────────────────────────────────────────────────────────
const rows = []
const unresolved = []
const seen = new Set()

for (const de of QUESTION_BANK.de ?? []) {
  const key = canonicalId(de.id)
  if (seen.has(key)) continue
  seen.add(key)

  const en = findTranslation(de.id, 'en', enById)
  const fa = findTranslation(de.id, 'fa', faById)

  if (!en || !fa) {
    unresolved.push({ key, reason: `fehlende Übersetzung (en:${!!en}, fa:${!!fa})` })
    continue
  }

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
      text: { de: opt.text, en: en.options[i]?.text, fa: fa.options[i]?.text },
    })),
    correct: de.correct,
    explanation: { de: de.explanation, en: en.explanation, fa: fa.explanation },
  })
}

// ── Upsert ─────────────────────────────────────────────────────────────────────
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

console.log(`questions: ${inserted} upserted (von ${[...seen].length} eindeutigen Fragen)`)
if (unresolved.length) {
  console.log(`\n${unresolved.length} Fragen NICHT eingefügt:`)
  for (const u of unresolved) console.log(`  - ${u.key}: ${u.reason}`)
}
