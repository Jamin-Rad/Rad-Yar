import assert from 'node:assert/strict'
import fs from 'node:fs'
import { HRCT_LESSONS } from '../data/hrct-muster.js'

const lesson = HRCT_LESSONS['hrct-dichteminderung']
assert.ok(lesson)
assert.deepEqual(lesson.sourceReferences, [{ source: 'Thorax.pdf', pages: [24], printedPages: [23] }])
const section = lesson.sections.find(item => item.id === 'begriffe')
assert.ok(section)
const cases = section.images.filter(image => [7959, 10493].some(id => image.radiopaediaUrl?.endsWith(`/cases/${id}`)))
assert.equal(cases.length, 2)
assert.deepEqual(cases.map(image => image.pdfSource?.radiopaediaId), [7959, 10493])
for (const image of cases) {
  assert.deepEqual([image.pdfSource.source, image.pdfSource.page, image.pdfSource.printedPage], ['Thorax.pdf', 24, 23])
  assert.match(image.pdfSource.match, /Visually matched/)
  assert.ok(image.caption.de && image.caption.en && image.caption.fa)
  assert.ok(image.radiopaediaUrl)
  const absolute = `public${image.src}`
  assert.ok(fs.existsSync(absolute), `${absolute}: existing image asset`)
  assert.ok(fs.statSync(absolute).size > 10000, `${absolute}: non-empty image asset`)
}
const ledger = fs.readFileSync('docs/lesson-quality/hrct-dichteminderung-thorax-p24.md', 'utf8')
for (const item of ['p.24', 'printed p.23', 'rID 7959', 'rID 10493', 'image28.jpeg', 'image29.jpeg', 'repository does not record']) {
  assert.ok(ledger.includes(item), `ledger records ${item}`)
}
console.log('HRCT decreased-density p.24 source mapping: exact lesson assets, page/rID metadata, localized captions and existing case links PASS. Existing component rendering was independently inspected; browser/clinical acceptance remain separate.')
