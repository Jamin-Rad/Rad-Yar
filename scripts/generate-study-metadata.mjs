import { readFileSync, writeFileSync } from 'node:fs'
import { FLASHCARDS } from '../data/flashcards.js'
import { MCQ_TOPIC_GROUPS } from '../data/questions.js'

// The assistant and profile use identifiers and titles, without the exercise text.
function writeCatalog(filename, records) {
  const file = new URL('../data/' + filename, import.meta.url)
  const contents = JSON.stringify(records, null, 2) + '\n'
  let existing
  try {
    existing = readFileSync(file, 'utf8')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  if (contents !== existing) writeFileSync(file, contents)
}

writeCatalog('flashcardIds.json', FLASHCARDS.map(card => card.id))
writeCatalog('mcqTopicIndex.json', MCQ_TOPIC_GROUPS.map(({ fachId, kapitelId, topics }) => ({
  fachId,
  kapitelId,
  topics: topics.map(({ id, title }) => ({ id, title })),
})))
