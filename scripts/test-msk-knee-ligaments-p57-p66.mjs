import assert from 'node:assert/strict'
import fs from 'node:fs'
import sharp from 'sharp'

const page = fs.readFileSync('app/msk/knie/kreuzbaender/page.js', 'utf8')
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
const ledger = fs.readFileSync('docs/lesson-quality/knieligamente-msk-p57-p66.md', 'utf8')

for (const [locale, start, end] of [
  ['de', 'de: {', 'en: {'],
  ['en', 'COPY.en.sections =', 'COPY.en.figures ='],
  ['fa', 'COPY.fa.sections =', 'COPY.fa.figures ='],
]) {
  const from = page.indexOf(start)
  const to = page.indexOf(end, from + start.length)
  assert.ok(from >= 0 && to > from, `${locale} localized lesson block exists`)
  const block = page.slice(from, to)
  assert.match(block, /non-contact|nicht-kontaktbedingt|غیرتماسی/i, `${locale} includes translated ACL mechanism`)
  assert.match(block, /posterolateral|posterolaterale|خلفی-لترال/i, `${locale} localizes contusion distribution`)
}
for (const caption of [
  'Beispiel einer Grad-I-MCL-Zerrung', 'Example of a grade I MCL sprain', 'نمونهٔ کشیدگی درجهٔ I در MCL',
  'knieligamente/mcl-sprain-followup.png', 'knieligamente/acl-avulsion-xray.jpeg',
]) assert.ok(page.includes(caption), `localized source figure coverage includes ${caption}`)

assert.match(page, /PDF-S\. 61 \(Druck-S\. 60\)/)
assert.match(page, /PDF-S\. 62 \(Druck-S\. 61\)/)
assert.match(page, /PDF-S\. 64 \(Druck-S\. 63\), rID 90186/)
assert.match(page, /PDF p\. 61 \(printed p\. 60\)/)
assert.match(page, /PDF p\. 62 \(printed p\. 61\)/)
assert.match(page, /PDF p\. 64 \(printed p\. 63\), rID 90186/)
assert.match(page, /صفحهٔ PDF ۶۱ \(صفحهٔ چاپی ۶۰\)/)
assert.match(page, /صفحهٔ PDF ۶۲ \(صفحهٔ چاپی ۶۱\)/)
assert.match(page, /صفحهٔ PDF ۶۴ \(صفحهٔ چاپی ۶۳\)، rID 90186/)
assert.match(page, /marked symptomatic instability that persists despite non-operative care/)
assert.match(page, /ausgeprägter symptomatischer Instabilität trotz nichtoperativer Behandlung/)
assert.match(page, /ناپایداری علامت‌دار و شدید که با درمان غیرجراحی برطرف نشده/)
assert.match(page, /Source: MSK\.pdf, physical p\. 61 \(printed p\. 60\)\. The embedded source note/)
assert.match(page, /Quelle: MSK\.pdf, PDF-S\. 61 \(Druck-S\. 60\)\./)
assert.match(page, /صفحهٔ PDF ۶۱ \(چاپی ۶۰\)\./)
assert.match(page, /MCL injuries are common; treatment is usually conservative/)
assert.match(page, /MCL-Verletzungen häufig, Therapie meist konservativ/)
assert.match(page, /آسیب‌های MCL شایع‌اند؛ درمان معمولاً محافظه‌کارانه است/)
for (const asset of ['mcl-sprain-followup.png', 'acl-avulsion-xray.jpeg']) {
  const metadata = await sharp(`public/knieligamente/${asset}`).metadata()
  assert.ok(metadata.width >= 250 && metadata.height >= 180, `${asset} has usable pixel dimensions`)
}
assert.match(curriculum, /id: 'kreuzbaender'[\s\S]*?link: '\/msk\/knie\/kreuzbaender'[\s\S]*?inProgress: true/)
assert.match(curriculum, /id: 'seitenbaender-knie'[\s\S]*?link: '\/msk\/knie\/kreuzbaender'[\s\S]*?inProgress: true/)
const pageTopics = [
  ['57 (56)', 'MRI grading'], ['58 (57)', 'Lateral collateral complex anatomy'],
  ['59 (58)', 'LCL injury/follow-up'], ['60 (59)', 'MCL, deep MCL'],
  ['61 (60)', 'Partial MCL tear'], ['62 (61)', 'MCL/POL rupture image set'],
  ['63 (62)', 'ACL anatomy'], ['64 (63)', 'ACL direct/indirect MRI signs'],
  ['65 (64)', 'Mucoid ACL degeneration'], ['66 (65)', 'PCL anatomy'],
]
for (const [pageNo, topic] of pageTopics) {
  const line = ledger.split('\n').find(row => row.startsWith(`| ${pageNo} |`))
  assert.ok(line?.includes(topic), `source ledger maps PDF p.${pageNo} to ${topic}`)
}
assert.match(ledger, /biceps heading has no accompanying explanatory content/i)
assert.match(ledger, /failed non-operative management/i)
assert.match(ledger, /embedded German treatment note in DE\/EN\/FA/i)
assert.doesNotMatch(page, /Fallbeispiele|Open space for your later cases|فضای آزاد برای کیس‌های بعدی/)
assert.doesNotMatch(page, /id="cases"|\['cases',/)
console.log('MSK knee-ligament p57–66 source/locale/assets/curriculum checks PASS. Browser QA, independent review and clinical sign-off remain separate gates.')
