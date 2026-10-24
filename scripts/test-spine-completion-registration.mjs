import assert from 'node:assert/strict'
import fs from 'node:fs'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS, getQuestionsForIds } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards.js'
import { CURRICULUM } from '../data/curriculum.js'

const expected = {
  'spondylolisthesis': 2, 'dish-ossifikation-ligamente': 2, 'osteoporose-fraktur-ws': 2, 'renale-osteodystrophie-ws': 2,
  'spinale-leptomeningitis': 2, 'neuroborreliose-spinal': 2, 'wirbelsaeulentuberkulose': 1, 'paravertebraler-abszess': 1, 'epiduraler-abszess': 1,
  'spinale-arachnoiditis': 1, 'guillain-barre-syndrom': 1, 'funikulaere-myelose': 1,
  'spinale-tumoren-grundlagen': 1, 'epidermoid-spinal': 1, 'multiple-sklerose-spinal': 1,
}
const topics = CURRICULUM.find(f => f.id === 'wirbelsaeule').kapitel.flatMap(k => k.themen)
for (const [id, count] of Object.entries(expected)) {
  const topic = topics.find(t => t.id === id)
  assert.ok(topic?.link, `${id} curriculum link`)
  const route = topic.link.split('#')[0]
  assert.ok(['js', 'jsx', 'tsx'].some(ext => fs.existsSync(`app${route}/page.${ext}`)), `${id} real route`)
  assert.equal(MCQ_TOPIC_GROUPS.flatMap(g => g.topics).filter(t => t.id === id).length, 1, `${id} group`)
  assert.equal(FLASHCARD_TOPICS.filter(t => t.id === id).length, 1, `${id} card topic`)
  const base = QUESTION_BANK.de.filter(q => q.tags.includes(id))
  assert.equal(base.length, count, `${id} question count`)
  for (const lang of ['de', 'en', 'fa']) {
    const actual = getQuestionsForIds(base.map(q => q.id), lang)
    assert.equal(actual.length, count)
    for (const q of actual) {
      assert.ok((q.id.includes(`-${lang}-`) || q.id.endsWith(`-${lang}`)), `${id} locale ${lang}`)
      assert.ok(q.options.some(o => o.id === q.correct), q.id)
      assert.ok(q.explanation && q.source, q.id)
      for (const o of q.options) if (o.id !== q.correct) assert.ok(q.wrongExplanations[o.id], `${q.id} distractor feedback`)
    }
  }
  const cards = FLASHCARDS.filter(c => c.topicId === id)
  assert.ok(cards.length >= 1)
  for (const card of cards) for (const lang of ['de','en','fa']) for (const field of ['front','answer','explanation']) assert.ok(card[field][lang], `${id} ${field} ${lang}`)
}
// Preserve legacy saved IDs ending in a locale while returning actual translations.
for (const id of ['spinalkanalstenose', 'spondylodiszitis', 'morbus-bechterew-ws']) {
  const base = QUESTION_BANK.de.filter(q => q.tags.includes(id))
  assert.ok(base.length)
  for (const lang of ['en','fa']) for (const q of getQuestionsForIds(base.map(q => q.id), lang)) {
    assert.ok(q.id.endsWith(`-${lang}`), `${q.id}: terminal locale regression`)
    assert.ok(QUESTION_BANK[lang].includes(q), 'Must return target-language object, not DE fallback')
  }
}
console.log(`Spine completion PASS: ${Object.keys(expected).length} exact topics, localized banks/cards, real routes; legacy terminal-locale regression.`)
