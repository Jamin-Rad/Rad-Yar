import assert from 'node:assert/strict'
import fs from 'node:fs'
import { MENISCUS_PDF_P53_P56 as addendum } from '../data/meniscusPdfAddendum.js'

assert.deepEqual(addendum.sourcePages, [53, 56])
assert.deepEqual(addendum.printedPages, [52, 55])
assert.equal(addendum.items.length, 2)
assert.deepEqual(addendum.items.map(item => item.id), ['flounce', 'extrusion'])
for (const locale of ['de', 'en', 'fa']) {
  assert.ok(addendum.heading[locale], `${locale}: heading`)
  for (const item of addendum.items) {
    assert.ok(item.title[locale] && item.text[locale], `${locale}: ${item.id} copy`)
  }
}
assert.match(addendum.items[0].text.en, /single sagittal slice/)
assert.match(addendum.items[0].text.en, /separate radial component/)
assert.match(addendum.items[0].text.en, /otherwise homogeneous signal/)
assert.match(addendum.items[0].text.en, /other tear signs argue against/)
assert.match(addendum.items[1].text.en, />3 mm/)
assert.match(addendum.items[1].text.en, /medial[- ]meniscus/)
assert.match(addendum.items[1].text.en, /proves neither a tear nor a root tear/)
assert.match(addendum.items[1].text.en, /2\.5–4 mm/)
assert.match(addendum.items[1].text.en, /mid-tibial plateau level/)

const route = fs.readFileSync('app/msk/knie/meniskus/page.js', 'utf8')
assert.match(route, /MENISCUS_PDF_P53_P56/)
assert.match(route, /data-pdf-source-addendum="msk-53-56"/)
assert.match(route, /flounce-pdf-p53-rid39464\.jpg/)
assert.match(route, /Illustrative example, not a universal rule/)
assert.match(route, /https:\/\/pubs\.rsna\.org\/doi\/10\.1148\/radiology\.203\.2\.9114114/)
assert.match(route, /https:\/\/pmc\.ncbi\.nlm\.nih\.gov\/articles\/PMC13424353\//)

const ledger = fs.readFileSync('docs/lesson-quality/meniskus-msk-p53-p56-addendum.md', 'utf8')
assert.ok(fs.statSync('public/msk/knie/meniskus/flounce-pdf-p53-rid39464.jpg').size > 1000)
for (const phrase of ['physical p.53 / printed p.52', 'physical p.56 / printed p.55', 'MEN-53-01', 'MEN-56-01', '2.5–4 mm', 'rID 39464', '/msk/knie/chondrokalzinose']) {
  assert.ok(ledger.toLowerCase().includes(phrase.toLowerCase()), `ledger: ${phrase}`)
}
console.log('Meniscus MSK.pdf p.53/p.56 addendum: source-image crop, localized flounce/extrusion claims, 2.5–4 mm threshold range, measurement level, references and separate CPPD scope PASS.')
