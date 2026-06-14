// Seed-Skript: data/cases.js -> Supabase (cases)
// Aufruf: npx tsx scripts/seed/04-cases.mjs
// Voraussetzung: scripts/seed/01-curriculum.mjs wurde bereits ausgeführt (themen-Tabelle gefüllt)
// und Migration 0004_content_extras.sql wurde ausgeführt (cases-Tabelle existiert).
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { CASE_BANK } from '../../data/cases.js'
import { supabaseAdmin, isSupabaseAdminConfigured } from '../../lib/supabase/server.js'

if (!isSupabaseAdminConfigured) {
  console.error('Supabase ist nicht konfiguriert (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY fehlen in .env.local).')
  process.exit(1)
}

const LANGS = ['de', 'en', 'fa']

// Nach id gruppieren (gleiche id in de/en/fa, gleiche Reihenfolge)
const byId = new Map()
for (const lang of LANGS) {
  for (const entry of CASE_BANK[lang] ?? []) {
    if (!byId.has(entry.id)) byId.set(entry.id, {})
    byId.get(entry.id)[lang] = entry
  }
}

const rows = []
const skipped = []

for (const [id, byLang] of byId) {
  if (!byLang.de || !byLang.en || !byLang.fa) {
    skipped.push({ id, reason: `fehlende Sprachvariante (${LANGS.filter(l => !byLang[l]).join(', ')})` })
    continue
  }
  const { de, en, fa } = byLang
  rows.push({
    id,
    thema_id: de.topicId,
    image: de.image ?? null,
    plane: de.plane ?? null,
    title: { de: de.title, en: en.title, fa: fa.title },
    vignette: { de: de.vignette, en: en.vignette, fa: fa.vignette },
    question: { de: de.question, en: en.question, fa: fa.question },
    options: de.options.map((opt, i) => ({
      id: opt.id,
      text: { de: opt.text, en: en.options[i].text, fa: fa.options[i].text },
    })),
    correct: de.correct,
    explanation: { de: de.explanation, en: en.explanation, fa: fa.explanation },
    source: de.source ?? null,
    credit: de.credit ?? null,
  })
}

const { error } = await supabaseAdmin.from('cases').upsert(rows, { onConflict: 'id' })
if (error) throw new Error(`Upsert cases fehlgeschlagen: ${error.message}`)

console.log(`cases: ${rows.length} upserted`)
if (skipped.length) {
  console.log(`\n${skipped.length} Einträge NICHT eingefügt:`)
  for (const s of skipped) console.log(`  - ${s.id}: ${s.reason}`)
}
