import assert from 'node:assert/strict'
import fs from 'node:fs'
import { MENISCUS_PDF_GAP_ADDENDUM as addendum } from '../data/meniscusPdfGapAddendum.js'
import { MENISCUS_QUESTIONS } from '../data/meniscusLearning.js'
import { getCardsByTopic } from '../data/flashcards.js'

const item = addendum.tearTypes.find(entry => entry.id === 'posterior-meniscofemoral-attachment-tear')
assert.ok(item)
assert.equal(item.sourcePage, 48)
assert.equal(item.printedPage, 47)
assert.equal(item.image, '/msk/knie/meniskus/posterior-meniscofemoral-attachment-pdf-p48.png')
assert.ok(fs.statSync(`public${item.image}`).size > 100_000)
for (const locale of ['de', 'en', 'fa']) assert.ok(item.title[locale] && item.text[locale] && item.imageAlt[locale])
assert.match(item.text.en, /near the posterior meniscofemoral ligament attachment/)
assert.match(item.text.en, /intact ligament in the same region can mimic a tear/)
assert.match(item.text.fa, /به‌تنهایی پارگی ACL را ثابت نمی‌کند/)

for (const locale of ['de', 'en', 'fa']) {
  const question = MENISCUS_QUESTIONS[locale].find(entry => entry.id === `meniskus-${locale}-37`)
  assert.ok(question)
  assert.match(question.question, /Wrisberg/)
  assert.equal(question.correct, 'B')
  assert.equal(question.options.length, 4)
  assert.ok(question.wrongExplanations.A && question.wrongExplanations.C && question.wrongExplanations.D)
}
const card = getCardsByTopic('meniskus').find(entry => entry.id === 'meniskus-37')
assert.ok(card)
for (const locale of ['de', 'en', 'fa']) assert.ok(card.front[locale] && card.answer[locale] && card.explanation[locale])

const route = fs.readFileSync('app/msk/knie/meniskus/page.js', 'utf8')
assert.match(route, /SSR consensus · Standardized MRI nomenclature/)
assert.match(route, /MENISCUS_PDF_GAP_ADDENDUM\.tearTypes\.map/)
assert.match(route, /data-pdf-source-addendum="msk-48-49-50-51"/)
const ledger = fs.readFileSync('docs/lesson-quality/meniskus-msk-p47-p55-addendum.md', 'utf8')
for (const phrase of ['MEN-48-01', 'physical p.48 / printed p.47', 'anatomic wording first', 'current SSR nomenclature']) assert.ok(ledger.includes(phrase))

console.log('Meniscus MSK.pdf p.48: localized source image, anatomic Wrisberg-rip description, ligament pitfall and assessment/card wiring PASS.')
