import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { EPENDYMOMA_COPY as C, EPENDYMOMA_ID, EPENDYMOMA_PATH, EPENDYMOMA_SECTIONS, EPENDYMOMA_SOURCES } from '../data/gehirnEpendymomaLesson.js'

const langs = ['de', 'en', 'fa']
const route = await readFile('app/gehirn/tumoren/ependymom/page.jsx', 'utf8')
const ledger = await readFile('docs/lesson-quality/gehirn-ependymoma-p55.md', 'utf8')
const matrix = await readFile('docs/lesson-quality/gehirn-technik-curriculum-matrix.md', 'utf8')
const curriculum = await readFile('data/curriculum.js', 'utf8')
const provenance = JSON.parse(await readFile('public/educational/ependymoma/image-provenance.json', 'utf8'))
const localized = []

function visit(value, path = 'copy') {
  if (Array.isArray(value)) return value.forEach((item, index) => visit(item, `${path}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (langs.every(lang => typeof value[lang] === 'string')) {
    localized.push([path, value])
    for (const lang of langs) assert.ok(value[lang].trim().length > 1, `${path}/${lang} empty`)
    if (value.fa.length > 24) assert.match(value.fa, /[\u0600-\u06FF]/u, `${path}/fa lacks Persian script`)
    return
  }
  for (const [key, item] of Object.entries(value)) visit(item, `${path}.${key}`)
}
visit(C)
assert.ok(localized.length >= 36, `expected complete lesson localization coverage, found ${localized.length}`)
assert.deepEqual(EPENDYMOMA_SECTIONS.map(item => item.id), ['orientation', 'mri-pattern', 'limits', 'self-check', 'take-home'])
assert.equal(C.options.length, 4)
assert.equal(C.feedback.length, 4)
assert.equal(EPENDYMOMA_SOURCES.length, 3)
assert.match(C.plasticity.en, /not a pathognomonic sign/u)
assert.match(C.plasticity.fa, /پاتوگنومونیک نیست/u)
assert.match(C.classification.de, /keine Gradzuweisung/u)
assert.match(C.classification.en, /assigns no grade/u)
assert.match(C.classification.fa, /درجه تعیین نمی‌کند/u)
assert.match(C.sourceCase.en, /not independently reviewed/u)
assert.match(C.sourceCase.fa, /مستقلاً بررسی نشده‌اند/u)
assert.doesNotMatch(C.heroAlt.en, /MRI frames|beside it/u)
assert.match(C.scanTask.en, /These crops do not show a route through Luschka or Magendie/u)
assert.match(C.frameFindings[1].fa, /مسیر گسترش از خروجی‌ها را نشان نمی‌دهد/u)
assert.match(C.definition.de, /Ependymzellen der Ventrikelwände/u)
assert.match(C.features.en, /punctate signal voids/u)
assert.match(C.scope.fa, /الگوی دومرحله‌ای سن.*آموزش داده نمی‌شود/u)
assert.match(C.scanCaption.de, /kein vollständiges MRT-Protokoll/u)
assert.match(ledger, /not a complete ependymoma curriculum/u)
assert.match(ledger, /Biphasic age pattern.*Explicitly deferred/u)
assert.match(ledger, /punctate signal voids linked to calcification/u)
assert.match(ledger, /do not demonstrate extension through Luschka or Magendie/u)
assert.match(ledger, /full stack were not independently checked/u)
assert.match(ledger, /does not assert independent legal clearance/u)
assert.match(matrix, /\/gehirn\/tumoren\/ependymom/u)
assert.match(route, /syncHashNavigation/u)
assert.match(route, /actions=\{\{\}\}/u)
assert.match(route, /<LessonSection id="self-check"/u)
assert.match(route, /aria-pressed=\{answer === index\}/u)
assert.match(route, /role="status"/u)
assert.match(route, /outlet-pattern\.svg/u)
assert.match(route, /t1c\.png/u)
assert.match(route, /flair\.png/u)
assert.match(route, /C\.takeaway\.map\(item => \(\{ title: value\(item\.title/u)
assert.match(curriculum, new RegExp(`id: '${EPENDYMOMA_ID}'[^\\n]+link: '${EPENDYMOMA_PATH}', inProgress: true`))
assert.equal(provenance.pdfPage, 55)
assert.equal(provenance.printedPage, 54)
assert.equal(provenance.independentCaseMetadataReview, false)
assert.equal(provenance.fullOriginalStudyStackReviewed, false)
assert.deepEqual(provenance.frames.map(frame => [frame.output, frame.cropBoxPixels]), [
  ['t1c.png', [327, 1168, 562, 1478]],
  ['flair.png', [572, 1168, 807, 1478]],
])
for (const name of ['outlet-pattern.svg', 'image-provenance.json', 't1c.png', 'flair.png']) {
  const path = `public/educational/ependymoma/${name}`
  await access(path)
  if (name.endsWith('.png')) assert.ok((await readFile(path)).length > 20_000, `${name} unexpectedly small`)
}
console.log(`Ependymoma lesson checks passed (${localized.length} localized units, 1 curriculum ID, 2 source frames).`)
