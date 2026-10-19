import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { EPIDERMOID_ARACHNOID_COPY as C, EPIDERMOID_ARACHNOID_ID, EPIDERMOID_ARACHNOID_SECTIONS as sections, EPIDERMOID_ARACHNOID_SOURCES as sources } from '../data/gehirnEpidermoidArachnoidLesson.js'

const langs = ['de', 'en', 'fa']
const route = await readFile('app/gehirn/tumoren/epidermoid-arachnoid/page.jsx', 'utf8')
const ledger = await readFile('docs/lesson-quality/gehirn-epidermoid-arachnoid-p51-52.md', 'utf8')
const matrix = await readFile('docs/lesson-quality/gehirn-technik-curriculum-matrix.md', 'utf8')
const curriculum = await readFile('data/curriculum.js', 'utf8')
const localeUnits = []

function visit(value, key = 'copy') {
  if (Array.isArray(value)) return value.forEach((item, index) => visit(item, `${key}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (langs.every(lang => typeof value[lang] === 'string')) {
    localeUnits.push([key, value])
    for (const lang of langs) assert.ok(value[lang].trim().length > 1, `${key}/${lang} is empty`)
    if (value.de.length > 28 && value.en.length > 28) assert.notEqual(value.de, value.en, `${key}: German and English unexpectedly identical`)
    if (value.fa.length > 24) assert.match(value.fa, /[\u0600-\u06FF]/u, `${key}/fa lacks Persian script`)
    if (value.de.length > 35) assert.match(value.de, /[A-Za-zÄÖÜäöüß]/u, `${key}/de lacks German-script text`)
    if (value.en.length > 35) assert.match(value.en, /[A-Za-z]/u, `${key}/en lacks English-script text`)
    return
  }
  for (const [childKey, child] of Object.entries(value)) visit(child, `${key}.${childKey}`)
}
visit(C)
assert.ok(localeUnits.length >= 38, `expected full localization coverage, found ${localeUnits.length}`)
assert.equal(C.diagramLegend.length, 3)
assert.deepEqual(C.diagramLegend.map(item => item.de), [
  '1 · Beide können auf T1/T2 liquorähnlich aussehen',
  '2 · FLAIR: Restsignal beim Epidermoid; Unterdrückung bei Arachnoidalzyste',
  '3 · DWI/ADC: Epidermoid fällt auf; Arachnoidalzyste folgt eher dem Liquor',
])
assert.deepEqual(C.diagramLegend.map(item => item.en), [
  '1 · Both may look CSF-like on T1/T2',
  '2 · FLAIR: residual signal in epidermoid; suppression in arachnoid cyst',
  '3 · DWI/ADC: epidermoid stands out; arachnoid cyst more closely follows CSF',
])
assert.deepEqual(C.diagramLegend.map(item => item.fa), [
  '۱ · هر دو ممکن است در T1/T2 شبیه CSF باشند',
  '۲ · FLAIR: در اپیدرموئید سیگنال باقی می‌ماند؛ در آراکنوئید سرکوب می‌شود',
  '۳ · DWI/ADC: اپیدرموئید برجسته است؛ آراکنوئید بیشتر از CSF پیروی می‌کند',
])
assert.match(C.pattern.de, /^Im typischen Muster/u)
assert.match(C.pattern.en, /^In the typical pattern/u)
assert.match(C.pattern.fa, /^در الگوی تیپیک/u)
assert.match(C.feedback[1].de, /DWI-Signal allein reicht nicht/u)
assert.match(C.feedback[1].en, /^DWI signal alone is insufficient/u)
assert.match(C.feedback[1].fa, /سیگنال DWI/u)
assert.match(C.warning.de, /ADC-Karte/u)
assert.match(C.warning.en, /ADC map/u)
assert.match(C.warning.fa, /نقشهٔ ADC/u)
assert.match(C.shape.fa, /امتداد در فضاهای مایع اشاره دارد، نه تهاجم به بافت/u)
assert.match(C.takeaway[3].detail.fa, /امتداد نامنظم در امتداد فضاهای CSF/u)
assert.doesNotMatch(C.shape.fa, /نفوذ/u)
assert.match(ledger, /Congenital origin, inclusion-cyst definition and keratin\/cholesterol composition are deferred/u)
assert.match(route, /actions=\{\{\}\}/u)
assert.equal(C.sequenceLabels.length, 5)
assert.equal(C.options.length, 4)
assert.equal(C.feedback.length, 4)
assert.deepEqual(sections.map(section => section.id), ['pattern', 'compare', 'limits', 'self-check', 'take-home'])
assert.match(route, /syncHashNavigation/)
assert.match(route, /<LessonSection id="self-check"/)
assert.match(route, /aria-pressed=\{answer === index\}/)
assert.match(route, /role="status"/)
assert.match(route, /useLanguage/)
assert.match(route, /CaseImageSet/)
assert.match(route, /patternDiagram/)
assert.match(route, /C\.diagramLegend\.map\(\(item, index\)/u)
assert.match(route, /value\(item, lang\)/u)
assert.match(route, /className=\{styles\.diagramColumns\} dir="ltr"/u)
assert.match(route, /<strong dir=\{lang === 'fa' \? 'rtl' : 'ltr'\}>/u)
assert.match(C.sourceCaseCaption.en, /ADC map is not included/u)
assert.match(ledger, /PDF p\.51 \/ printed p\.50/)
assert.match(ledger, /PDF p\.52 \/ printed p\.51/)
assert.match(ledger, /rID 9772/)
assert.match(ledger, /not independently inspected; no image-level claims rely on them/u)
assert.match(ledger, /Original Radiopaedia study\/frame identifiers, current case terms, and the full image stack were not independently inspected/u)
assert.match(ledger, /does not assert independent legal clearance/u)
assert.match(ledger, /PDF p\.52 \(printed p\.51\).*T1 \(175,49,443,367\).*DWI \(414,383,702,716\)/u)
assert.match(matrix, /epidermoid-arachnoid/)
for (const id of [EPIDERMOID_ARACHNOID_ID, 'arachnoidalzyste-tumor']) {
  assert.match(curriculum, new RegExp(`id: '${id}'[^\\n]+link: '/gehirn/tumoren/epidermoid-arachnoid', inProgress: true`), `${id} exact curriculum link/inProgress`)
}
for (const name of ['hero.svg', 'image-provenance.json', 'case-t1.png', 'case-t2.png', 'case-flair.png', 'case-t1c.png', 'case-dwi.png']) {
  const file = `public/educational/epidermoid-arachnoid/${name}`
  await access(file)
  if (name.endsWith('.png')) {
    const png = await readFile(file)
    assert.ok(png.length > 8000, `${name} looks unexpectedly small`)
    assert.equal(png.readUInt32BE(16) > 150, true, `${name} width is too small`)
    assert.equal(png.readUInt32BE(20) > 150, true, `${name} height is too small`)
  }
}
assert.ok(sources.some(source => source.href.includes('rID-9772')))
assert.ok(sources.some(source => source.href.includes('14730949')))
console.log(`Epidermoid/arachnoid lesson checks passed (${localeUnits.length} localized units, 2 curriculum IDs, 5 case frames).`)
