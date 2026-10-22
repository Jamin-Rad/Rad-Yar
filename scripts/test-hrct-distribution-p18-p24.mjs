import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { HRCT_LESSONS } from '../data/hrct-muster.js'

const getSection = (lessonId, sectionId) => {
  const section = HRCT_LESSONS[lessonId]?.sections?.find((item) => item.id === sectionId)
  assert.ok(section, `Missing ${lessonId}/${sectionId}`)
  return section
}
const localizedNumber = (value) => new RegExp(`${value}|${String(value).replace(/[0-9]/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)])}`)

const reticular = HRCT_LESSONS['hrct-retikulaer-nodulaer']
assert.deepEqual(reticular.sourceReferences[0].pages, [16, 18, 19, 20, 21])
assert.deepEqual(reticular.sourceReferences[0].printedPages, [15, 17, 18, 19, 20])
const tree = getSection('hrct-retikulaer-nodulaer', 'treeinbud')
const treeText = tree.cards.find((card) => card.title.de.includes('mukoid'))
assert.ok(treeText, 'Tree-in-bud mucus-impaction card should exist')
for (const locale of ['de', 'en', 'fa']) {
  assert.match(treeText.text[locale], /Bronchiol|برونشیول/i, `Missing bronchiolar anatomy: ${locale}`)
  assert.match(treeText.text[locale], /Schleim|mucus|مخاط/i, `Missing possible mucus content: ${locale}`)
  assert.match(treeText.text[locale], /Entzündung|inflammation|التهاب/i, `Missing inflammation context: ${locale}`)
}
const treeImage = tree.images.find((image) => image.src.endsWith('image20.jpeg'))
assert.ok(treeImage, 'Expected source-matched p.20 CT image')
assert.deepEqual(treeImage.pdfSource, {
  source: 'Thorax.pdf', page: 20, printedPage: 19, radiopaediaId: 12039,
  match: 'Visually matched to the PDF p.20 axial CT panel; local asset derivation is not recorded.',
})
for (const locale of ['de', 'en', 'fa']) {
  assert.match(treeImage.caption[locale], localizedNumber(20))
  assert.match(treeImage.caption[locale], localizedNumber(19))
  assert.match(treeImage.caption[locale], localizedNumber(12039))
}
assert.ok(existsSync(new URL('../public/hrct/retikulaer-nodulaer/image20.jpeg', import.meta.url)))

const architecture = HRCT_LESSONS['hrct-architekturmuster']
assert.deepEqual(architecture.sourceReferences[0].pages, [22, 23])
assert.deepEqual(architecture.sourceReferences[0].printedPages, [21, 22])

const lowDensity = HRCT_LESSONS['hrct-dichteminderung']
assert.deepEqual(lowDensity.sourceReferences[0].pages, [24, 25, 26])
assert.deepEqual(lowDensity.sourceReferences[0].printedPages, [23, 24, 25])
for (const [filename, id] of [['image28.jpeg', 7959], ['image29.jpeg', 10493]]) {
  const image = lowDensity.sections.flatMap((section) => section.images ?? []).find((item) => item.src.endsWith(filename))
  assert.ok(image, `Missing ${filename}`)
  assert.equal(image.pdfSource.page, 24)
  assert.equal(image.pdfSource.printedPage, 23)
  assert.equal(image.pdfSource.radiopaediaId, id)
  for (const locale of ['de', 'en', 'fa']) {
    assert.match(image.caption[locale], localizedNumber(24))
    assert.match(image.caption[locale], localizedNumber(23))
    assert.match(image.caption[locale], localizedNumber(id))
  }
  assert.ok(existsSync(new URL(`../public/hrct/dichteminderung/${filename}`, import.meta.url)))
}

console.log('PASS: Thorax physical/printed pages 18–24, localized tree-in-bud claims, and p.20/p.24 image traceability')
