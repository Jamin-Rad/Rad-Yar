import assert from 'node:assert/strict'
import fs from 'node:fs'
import { MENISCUS_PDF_GAP_ADDENDUM as addendum } from '../data/meniscusPdfGapAddendum.js'
import { MENISCUS_QUESTIONS } from '../data/meniscusLearning.js'
import { getCardsByTopic } from '../data/flashcards.js'

for (const [page, printed, id, image] of [
  [50, 49, 'bucket-handle-signs', '/msk/knie/meniskus/bucket-handle-signs-pdf-p50.png'],
  [51, 50, 'flipped-meniscus', '/msk/knie/meniskus/flipped-meniscus-signs-pdf-p51.png'],
]) {
  const item = addendum.tearTypes.find(entry => entry.id === id)
  assert.ok(item, `${id}: entry exists`)
  assert.equal(item.sourcePage, page)
  assert.equal(item.printedPage, printed)
  assert.equal(item.image, image)
  assert.ok(fs.statSync(`public${image}`).size > 100_000, `${id}: rendered source crop exists`)
  for (const locale of ['de', 'en', 'fa']) {
    assert.ok(item.title[locale] && item.text[locale] && item.imageAlt[locale], `${id}: ${locale} content`)
  }
}

for (const locale of ['de', 'en', 'fa']) {
  const question = MENISCUS_QUESTIONS[locale].find(item => item.id === `meniskus-${locale}-36`)
  assert.ok(question, `${locale}: source-specific flipped-meniscus MCQ`)
  assert.equal(question.options.length, 4)
  assert.equal(question.correct, 'D')
  assert.ok(question.tags.includes('meniskus'))
  assert.ok(question.wrongExplanations.A && question.wrongExplanations.B && question.wrongExplanations.C)
}

const card = getCardsByTopic('meniskus').find(item => item.id === 'meniskus-36')
assert.ok(card, 'registered flashcard exists under exact lesson topic')
for (const locale of ['de', 'en', 'fa']) {
  assert.ok(card.front[locale] && card.answer[locale] && card.explanation[locale], `${locale}: flashcard copy`)
}

const route = fs.readFileSync('app/msk/knie/meniskus/page.js', 'utf8')
assert.match(route, /data-pdf-source-addendum="msk-48-49-50-51"/)
assert.match(route, /MENISCUS_PDF_GAP_ADDENDUM\.tearTypes\.map/)
assert.match(route, /Helms et al\. · Bucket-handle tear MRI signs/)
assert.match(route, /Haims et al\. · The flipped meniscus sign/)

const ledger = fs.readFileSync('docs/lesson-quality/meniskus-msk-p47-p55-addendum.md', 'utf8')
for (const phrase of ['physical p.50 / printed p.49', 'physical p.51 / printed p.50', 'Double-PCL', 'anterior-horn variant', '210 dpi', 'MEN-50-01', 'MEN-51-01']) {
  assert.ok(ledger.toLowerCase().includes(phrase.toLowerCase()), `ledger includes ${phrase}`)
}

console.log('Meniscus MSK.pdf pp.50–51: localized source figures, displaced-tear pattern, MCQ and flashcard wiring PASS.')
