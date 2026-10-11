import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { QUESTION_BANK, getQuestionsForIds, getQuestionsByIds, countQuestions } from '../data/questions.js'
import { getCardsByTopic, getCardById } from '../data/flashcards.js'

const languages = ['de', 'en', 'fa']
const banks = languages.map(lang => QUESTION_BANK[lang].filter(q => q.tags.includes('meniskus')))
const keys = bank => bank.map(q => q.id.replace(/-(de|en|fa)-/, '-')).sort()
assert.ok(banks[0].length >= 20, 'Meniscus coverage unexpectedly shrank')
assert.equal(countQuestions(['meniskus']), banks[0].length)
const deIds = banks[0].map(q => q.id)
for (let index = 0; index < languages.length; index++) {
  const lang = languages[index], bank = banks[index]
  assert.deepEqual(keys(bank), keys(banks[0]), `Language IDs differ: ${lang}`)
  assert.equal(getQuestionsByIds(bank.map(q => q.id), lang).length, bank.length)
  assert.equal(getQuestionsForIds(deIds, lang).length, bank.length, `Cross-language lookup failed: ${lang}`)
  assert.equal(new Set(bank.map(q => q.question)).size, bank.length, `Duplicate stems: ${lang}`)
  for (const q of bank) {
    assert.equal(q.options.length, 4, q.id)
    assert.ok(q.options.some(o => o.id === q.correct), q.id)
    assert.equal(Object.keys(q.wrongExplanations).length, 3, q.id)
    assert.ok(!Object.hasOwn(q.wrongExplanations, q.correct), q.id)
    for (const option of q.options) assert.ok((option.id === q.correct ? q.explanation : q.wrongExplanations[option.id])?.trim(), `${q.id}/${option.id}`)
    if (q.image) {
      assert.ok(existsSync(fileURLToPath(new URL('../public' + q.image.src, import.meta.url))), `Missing asset: ${q.image.src}`)
      assert.ok(q.image.credit && q.image.sourceUrl && typeof q.image.caption === 'string', q.id)
    }
    assert.ok(q.sources?.every(url => url.startsWith('https://')), q.id)
  }
}
for (const suffix of ['05', '06', '09']) for (const lang of languages) assert.ok(!QUESTION_BANK[lang].some(q => q.id === `meniskus-${lang}-${suffix}`), `Retired question remains: ${suffix}`)
const cards = getCardsByTopic('meniskus')
assert.ok(cards.length >= 31)
assert.equal(new Set(cards.map(c => c.id)).size, cards.length)
for (const lang of languages) {
  assert.equal(new Set(cards.map(c => c.front[lang])).size, cards.length, `Duplicate flashcard fronts: ${lang}`)
  for (const card of cards) {
    assert.equal(getCardById(card.id), card)
    for (const key of ['front', 'answer', 'explanation', 'category']) assert.ok(card[key]?.[lang]?.trim(), `${card.id}/${key}/${lang}`)
    assert.ok(!card.explanation[lang].endsWith('---'), card.id)
  }
}
for (const suffix of ['08', '17', '25', '26']) assert.equal(getCardById(`meniskus-${suffix}`), undefined)
console.log(`Meniscus audit passed: ${banks[0].length} MCQs, ${cards.length} cards, 3 languages, all distractor feedback, cross-language lookups and image credits/assets.`)
