import assert from 'node:assert/strict'
import fs from 'node:fs'
import { MENISCUS_PDF_GAP_ADDENDUM as addendum } from '../data/meniscusPdfGapAddendum.js'

assert.deepEqual(addendum.sourcePages, [49, 50, 51, 52, 54, 55])
assert.deepEqual(addendum.printedPages, [48, 49, 50, 51, 53, 54])
assert.deepEqual(addendum.tearTypes.map(item => item.id), ['parrot-beak', 'bucket-handle-signs', 'flipped-meniscus'])
assert.deepEqual(addendum.imagingPitfalls.map(item => item.id), ['transverse-ligament', 'meniscofemoral-ligaments', 'meniscocapsular-separation'])
assert.equal(addendum.rootTear.id, 'posterior-root-tear')
for (const locale of ['de', 'en', 'fa']) {
  for (const item of [...addendum.tearTypes, ...addendum.imagingPitfalls, addendum.rootTear]) {
    assert.ok(item.title[locale] && item.text[locale], `${locale}: ${item.id} copy`)
    assert.ok(item.image && item.imageAlt[locale], `${locale}: ${item.id} visual`)
    assert.ok(fs.statSync(`public${item.image}`).size > 5000, `${item.id}: source crop missing`)
  }
}
assert.match(addendum.tearTypes[0].text.en, /radial component/)
assert.match(addendum.tearTypes[0].text.en, /longitudinal extension/)
assert.match(addendum.tearTypes[0].text.en, /distance from the capsule changes/)
assert.match(addendum.tearTypes[1].text.en, /identify the fragment directly and correlate across planes/)
assert.match(addendum.tearTypes[1].text.en, /not every bucket-handle tear shows it/)
assert.match(addendum.tearTypes[2].text.en, /double-anterior-horn sign/)
assert.match(addendum.tearTypes[2].text.en, /empty-posterior-horn sign/)
assert.match(addendum.tearTypes[2].text.en, /anterior-horn variant may mimic duplication/)
assert.match(addendum.imagingPitfalls[0].text.en, /axial images/)
assert.match(addendum.imagingPitfalls[1].text.en, /Humphrey passes anterior.*Wrisberg posterior/)
assert.match(addendum.imagingPitfalls[1].text.en, /consecutive sagittal slices/)
assert.match(addendum.imagingPitfalls[2].text.en, /often associated with an ACL tear/)
assert.match(addendum.imagingPitfalls[2].text.en, /posteromedial tibial plateau bone bruise/)
assert.match(addendum.rootTear.text.en, /discontinuity close to the tibial root insertion/)
assert.match(addendum.rootTear.text.en, /may also be present/)
assert.match(addendum.rootTear.text.de, /Das sichere direkte MRT-Zeichen/)
assert.match(addendum.rootTear.text.de, /belegt weder klinischen Knorpelschaden noch ein klinisches Arthroserisiko/)
assert.match(addendum.rootTear.text.en, /provides a biomechanical rationale only/)
assert.match(addendum.rootTear.text.en, /does not establish clinical cartilage damage, osteoarthritis risk, or its course/)
assert.match(addendum.rootTear.text.fa, /فقط توجیه بیومکانیکی/)
assert.match(addendum.rootTear.text.fa, /خطر آرتروز یا سیر بالینی آن را اثبات نمی‌کند/)
assert.equal(addendum.rootTear.evidence, 'https://pubmed.ncbi.nlm.nih.gov/18762653/')

const route = fs.readFileSync('app/msk/knie/meniskus/page.js', 'utf8')
assert.match(route, /MENISCUS_PDF_GAP_ADDENDUM/)
assert.match(route, /data-pdf-source-addendum="msk-52-54-55"/)
assert.match(route, /data-pdf-source-addendum="msk-49-50-51"/)
assert.match(route, /meniscocapsular separation/)
assert.match(route, /physical PDF p\.\$\{item\.sourcePage\} \(printed p\.\$\{item\.printedPage\}\)/)
assert.match(route, /MENISCUS_PDF_GAP_ADDENDUM\.rootTear\.evidence/)

const ledger = fs.readFileSync('docs/lesson-quality/meniskus-msk-p49-p55-addendum.md', 'utf8')
for (const phrase of ['physical p.49 / printed p.48', 'physical p.50 / printed p.49', 'physical p.51 / printed p.50', 'physical p.52 / printed p.51', 'physical p.54 / printed p.53', 'physical p.55 / printed p.54', 'MEN-49-01', 'MEN-50-01', 'MEN-51-01', 'MEN-52-01', 'MEN-52-02', 'MEN-54-01', 'MEN-55-01', 'nine fresh-frozen cadaver knees', 'does not establish clinical cartilage damage, OA risk, or clinical course']) {
  assert.ok(ledger.toLowerCase().includes(phrase.toLowerCase()), `ledger: ${phrase}`)
}
console.log('Meniscus MSK.pdf p.49/p.52/p.54/p.55 addendum: source image crops, three-language claims, page mapping, ACL context, root morphology and cautious biomechanical attribution PASS.')
