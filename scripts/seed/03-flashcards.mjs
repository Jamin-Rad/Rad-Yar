// Seed-Skript: data/flashcards.js -> Supabase (flashcard_topics, flashcards)
// Aufruf: npx tsx scripts/seed/03-flashcards.mjs
// Voraussetzung: scripts/seed/01-curriculum.mjs wurde bereits ausgeführt (themen-Tabelle gefüllt).
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { FLASHCARD_TOPICS, FLASHCARDS } from '../../data/flashcards.js'
const { supabaseAdmin, isSupabaseAdminConfigured } = await import('../../lib/supabase/server.js')

if (!isSupabaseAdminConfigured) {
  console.error('Supabase ist nicht konfiguriert (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY fehlen in .env.local).')
  process.exit(1)
}

const { data: themenRows, error: themenError } = await supabaseAdmin.from('themen').select('id')
if (themenError) throw new Error(`Laden von themen fehlgeschlagen: ${themenError.message}`)
const themenIds = new Set(themenRows.map(t => t.id))

const topicRows = FLASHCARD_TOPICS.map(topic => ({
  id: topic.id,
  thema_id: themenIds.has(topic.id) ? topic.id : null,
  area: topic.area ?? null,
  chapter: topic.chapter ?? null,
  icon: topic.icon ?? null,
  icon_image: topic.iconImage ?? null,
  color: topic.color ?? null,
  href: topic.href ?? null,
  title: topic.title,
  subtitle: topic.subtitle ?? null,
}))

const cardRows = FLASHCARDS.map(card => ({
  id: card.id,
  topic_id: card.topicId,
  category: card.category ?? null,
  front: card.front,
  back: card.back ?? card.answer,
  explanation: card.explanation ?? null,
  diagram: card.diagram ?? null,
}))

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

const topicCount = await upsertAll('flashcard_topics', topicRows)
const cardCount = await upsertAll('flashcards', cardRows)

console.log(`flashcard_topics: ${topicCount} upserted`)
console.log(`flashcards: ${cardCount} upserted`)
