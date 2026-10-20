import assert from 'node:assert/strict'
import fs from 'node:fs'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { CONTRAST_FLASHCARDS, CONTRAST_FLASHCARD_TOPICS, CONTRAST_GROUPS, CONTRAST_QUESTIONS } from '../data/contrastMedia.js'
import { CURRICULUM } from '../data/curriculum.js'

const langs = ['de', 'en', 'fa']
const section = TECHNIK_GRUNDLAGEN.sections.find(item => item.id === 'sono')
assert.ok(section)
assert.equal(section.pages, '132–134')
for (const lang of langs) {
  assert.ok(section.lead[lang].trim())
  if (lang === 'de') assert.doesNotMatch(section.lead.de, /[\u0600-\u06ff]/u, 'German lead must not contain Persian script')
  for (const [label, text] of section.rows) {
    assert.ok(label[lang].trim())
    assert.ok(text[lang].trim())
    if (lang === 'de') {
      assert.doesNotMatch(label.de, /[\u0600-\u06ff]/u)
      assert.doesNotMatch(text.de, /[\u0600-\u06ff]/u)
    }
  }
}

const technik = CURRICULUM.find(item => item.id === 'technik')
assert.ok(technik)
const topics = technik.kapitel.flatMap(chapter => chapter.themen || [])
assert.equal(topics.find(item => item.id === 'sonographie-physikalische-grundlagen')?.link, '/technik/sonographie/grundlagen')
assert.equal(topics.find(item => item.id === 'doppler-duplex-sonographie')?.link, '/technik/sonographie/grundlagen')

const group = CONTRAST_GROUPS.find(item => item.id === 'ultraschall')
assert.equal(group?.readId, 'kontrastmittel-ultraschall')
assert.deepEqual(group?.topicIds, ['km-ultraschall'])
const harmonic = Object.fromEntries(langs.map(lang => [lang, CONTRAST_QUESTIONS[lang].find(question => question.id === `km-ultraschall-${lang}-3`)]))
for (const lang of langs) {
  assert.ok(harmonic[lang], `missing ${lang} harmonic assessment`)
  assert.equal(harmonic[lang].options.length, 4)
  assert.equal(harmonic[lang].options.find(option => option.id === harmonic[lang].correct)?.text, harmonic[lang].explanation)
}
assert.match(harmonic.de.question, /niedrigem MI/)
assert.match(harmonic.de.explanation, /harmonische Anteile/)
assert.match(harmonic.en.explanation, /harmonic components/)
assert.match(harmonic.fa.explanation, /هارمونیک/)
const card = CONTRAST_FLASHCARDS.find(item => item.id === 'km-ultraschall-card-3')
assert.ok(card)
for (const lang of langs) {
  assert.ok(card.front[lang])
  assert.ok(card.answer[lang])
  assert.ok(card.explanation[lang])
}
assert.ok(CONTRAST_FLASHCARD_TOPICS.some(item => item.id === 'km-ultraschall'))

const page = fs.readFileSync(new URL('../app/technik/kontrastmittel/ultraschall/page.jsx', import.meta.url), 'utf8')
for (const phrase of ['Niedriger MI: bessere Trennung', 'Low MI: better separation', 'MI پایین: جداسازی بهتر', 'CEUS-Signal', 'Seiten 133–134', 'Dietrich-CF-Averkiou-M-Nielsen-MB-How-to-perform']) assert.ok(page.includes(phrase), `missing source/visual content: ${phrase}`)
assert.ok(page.includes('Mikrobläschen: nichtlinear, Harmonische'))
assert.ok(page.includes('Microbubble: nonlinear, harmonics'))

const ledger = fs.readFileSync('docs/lesson-quality/technik-sonographie-review.md', 'utf8')
assert.ok(fs.existsSync(new URL('../docs/lesson-quality/technik-sonographie-review.md', import.meta.url)))
console.log('Technique PDF pp.132–134 cross-topic language, curriculum links, CEUS retrieval, translations and ledger checks passed.')
