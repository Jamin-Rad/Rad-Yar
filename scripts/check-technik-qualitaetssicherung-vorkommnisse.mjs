import fs from 'node:fs'
import assert from 'node:assert/strict'

const page = fs.readFileSync(new URL('../app/technik/qualitaetssicherung-vorkommnisse/page.jsx', import.meta.url), 'utf8')
const ledger = fs.readFileSync(new URL('../docs/lesson-quality/technik-qualitaetssicherung-vorkommnisse-p21-p22.md', import.meta.url), 'utf8')
const script = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/

function readTriples(input) {
  const result = []
  let at = 0
  while ((at = input.indexOf('L(', at)) >= 0) {
    let start = at + 2
    while (/\s/.test(input[start] || '')) start += 1
    if (!['\'', '"', '`'].includes(input[start])) { at = start + 1; continue }
    let quote = null; let depth = 0; let escape = false; const commas = []; let end = -1
    for (let i = start; i < input.length; i += 1) {
      const c = input[i]
      if (quote) { if (escape) escape = false; else if (c === '\\') escape = true; else if (c === quote) quote = null; continue }
      if (c === '\'' || c === '"' || c === '`') { quote = c; continue }
      if (c === '(' || c === '[' || c === '{') { depth += 1; continue }
      if (c === ')' || c === ']' || c === '}') { if (c === ')' && depth === 0) { end = i; break } depth -= 1; continue }
      if (c === ',' && depth === 0) commas.push(i)
    }
    assert.notEqual(end, -1, `Unclosed L() at ${at}`)
    assert.equal(commas.length, 2, `Expected three language strings at ${at}`)
    const values = [start, commas[0] + 1, commas[1] + 1].map((s, i) => {
      const e = [commas[0], commas[1], end][i]; const raw = input.slice(s, e).trim()
      assert.ok(raw.length >= 2 && ['\'', '"', '`'].includes(raw[0]) && raw.at(-1) === raw[0], `Nonliteral translation at ${s}`)
      return raw.slice(1, -1)
    })
    result.push(values); at = end + 1
  }
  return result
}

const triples = readTriples(page)
assert.ok(triples.length >= 40, `Expected substantial translation coverage; found ${triples.length}`)
for (const [i, [de, en, fa]] of triples.entries()) {
  assert.ok(!script.test(de), `German slot contains Persian text at L(${i})`)
  assert.ok(!script.test(en), `English slot contains Persian text at L(${i})`)
  assert.ok(script.test(fa), `Persian slot lacks Persian script at L(${i})`)
}
for (const [de, en, fa, label] of [
  ['bei CT des Gehirns oder', 'for a CT of the brain or', 'در CT مغز یا', 'head CT threshold'],
  ['DRW einer einzelnen Untersuchung um 200 % überschritten wurde', 'DRL for a single examination has been exceeded by 200%', 'مقدار در یک بررسی منفرد، به میزان ۲۰۰٪ از DRL مربوط فراتر رفته باشد', 'literal conditional group criterion'],
  ['75. Perzentils national erhobener dosisrelevanter Werte', '75th percentile of nationally collected dose-relevant values', 'صدک ۷۵ داده‌های ملیِ مرتبط با دوز', 'DRW percentile definition'],
  ['unverzüglich melden', 'notify without delay', 'اطلاع‌رسانی بی‌درنگ', 'immediate notification'],
  ['30 Jahre', '30 years', '۳۰ سال', 'retention'],
  ['Eine vorab geplante, gerechtfertigte und wie vorgesehen durchgeführte Hochdosisuntersuchung', 'A high-dose examination planned and justified in advance and performed as intended', 'بررسی دوزبالایی که از پیش برنامه‌ریزی و توجیه شده و مطابق برنامه انجام شده', 'planned justified exam caveat'],
]) {
  assert.ok(triples.some(([d, e, f]) => d.includes(de) && e.includes(en) && f.includes(fa)), `Missing aligned translation: ${label}`)
}
assert.match(page, /ID = 'qualitaetssicherung-vorkommnisse'/)
assert.match(page, /CTDIvol &gt;120 mGy/)
assert.match(page, /<bdi dir="ltr">&gt;80 mGy<\/bdi>/)
assert.match(page, /20 000 cGy·cm²/)
assert.match(page, /50 000 cGy·cm²/)
assert.match(page, /conventional projection radiography and dental CBCT are excluded/)
assert.match(page, /Gesamt-Dosisflächenprodukt über 20 000 cGy·cm² \(Anlage 14 I\)/)
assert.match(page, /Gesamt-Dosisflächenprodukt über 20 000 cGy·cm² \(Anlage 14 II\)/)
assert.match(page, /role="status"/)
assert.match(page, /Schritte 3a und 3b laufen parallel/)
assert.match(page, /Steps 3a and 3b proceed in parallel/)
assert.match(page, /گام‌های ۳الف و ۳ب هم‌زمان انجام می‌شوند/)
assert.match(page, /If significant: notify the authority without delay with available information/)
assert.match(page, /Ursachen und Auswirkungen jedes Vorkommnisses unverzüglich untersuchen und dokumentieren/)
assert.match(page, /within six months/)
assert.match(page, /akut oder innerhalb von 21 Tagen nach der Intervention/)
assert.match(page, /an acute deterministic skin injury of grade 2 or higher occurs, or such an injury occurs within 21 days/)
assert.doesNotMatch(page, /acute or 21-day grade/)
assert.match(page, /§ 108 und systematische Untersuchung sowie Aufzeichnung nach § 109 parallel/)
assert.match(page, /notification under § 108 and investigation\/recording under § 109 proceed in parallel/)
assert.match(page, /اطلاع‌رسانی فوری طبق مادهٔ ۱۰۸ و بررسی نظام‌مند و ثبت طبق مادهٔ ۱۰۹ هم‌زمان/)
assert.match(page, /Dosis und Umstände prüfen; bei erfülltem Kriterium unverzüglich mit verfügbaren Angaben melden und parallel systematisch untersuchen/)
assert.match(page, /notify without delay using available information while investigating and recording in parallel/)
assert.match(page, /بی‌درنگ با اطلاعات موجود اطلاع دهید و هم‌زمان بررسی و ثبت نظام‌مند/)
assert.match(page, /Nach § 1 Abs\. 22 StrlSchV setzt ein Vorkommnis eine unbeabsichtigte Exposition voraus/)
assert.match(page, /Under § 1\(22\) StrlSchV, an incident requires unintended exposure/)
assert.match(page, /طبق مادهٔ ۱ بند ۲۲ StrlSchV، رویداد مستلزم مواجههٔ ناخواسته است/)
assert.ok(page.indexOf('Ein Vorkommnis setzt eine unbeabsichtigte Exposition voraus') < page.indexOf('Ausgewählte Kriterien für CT'), 'Operational distinction must precede threshold table')
assert.match(page, /unbeabsichtigt das Hochdosis-\/Perfusionsprotokoll statt des vorgesehenen Standardprotokolls gewählt; CTDIvol beträgt 125 mGy/)
assert.match(page, /protocol was unintentionally selected instead of the intended standard protocol; CTDIvol is 125 mGy/)
assert.match(page, /به‌اشتباه پروتکل دوزبالا\/پرفیوژن به‌جای پروتکل استانداردِ موردنظر انتخاب شده و CTDIvol برابر ۱۲۵ mGy است/)
assert.match(page, /The protocol was unintentionally changed from the intended one/)
assert.match(page, /در این سناریو، پروتکل به‌اشتباه از پروتکل موردنظر منحرف شده است/)
assert.match(page, /Ärztliche Stelle der Bayerischen Landesärztekammer \(BLÄK\) · Erkennung von Vorkommnissen \(04\/2025\)/)
assert.match(page, /Ärztliche Stelle der Bayerischen Landesärztekammer \(BLÄK\), 04\/2025, S\. 2/)
assert.match(page, /Medical Advisory Unit of the Bavarian State Medical Association \(BLÄK\), 04\/2025, p\. 2/)
assert.match(page, /واحد پزشکی انجمن پزشکی ایالت بایرن \(BLÄK\)، ۰۴\/۲۰۲۵، ص\. ۲/)
assert.doesNotMatch(page, /Strahlenschutzkommission Bayern|lines 70–78|Z\. 70–78|سطرهای ۷۰–۷۸/)
assert.match(page, /Winter et al\. · Significant incidents during X-ray exposures in humans \(2025\)/)
assert.doesNotMatch(page, />\s*3\s*[×x]/i)
assert.match(ledger, /PDF pages 21–22/)
assert.match(ledger, /mean of the last 20 consecutive same-type examinations/)
assert.match(ledger, /30 years/)
assert.match(ledger, /excluding conventional projection radiography and dental CBCT/)
assert.match(ledger, /DLP is not taught in this route/)
assert.match(ledger, /Not taught within the historical p\.21–22 incident-reporting scope.*later extended with selected p\.23 MPE participation requirements/s)
assert.match(ledger, /historical p\.21–22 scope ledger.*route was later extended/s)
assert.match(ledger, /technik-inbetriebnahme-konstanzpruefung-p23\.md/)
assert.match(ledger, /75th percentile of nationally collected dose-relevant values/)
assert.match(ledger, /A justified high-dose CT.*Restored narrowly and checked against the Ärztliche Stelle der Bayerischen Landesärztekammer \(BLÄK\), 04\/2025, p\.2/s)
assert.match(ledger, /Ärztliche Stelle der Bayerischen Landesärztekammer \(BLÄK\).*p\. 2/)
assert.doesNotMatch(ledger, /lines 70–78|lines 70–78|Z\. 70–78/)
assert.match(ledger, /Winter KS, Schweden M, Brix G, et al\./)
assert.match(ledger, /planned, justified high-dose examination correctly performed as specified is not automatically an incident solely because it exceeds the Annex 14 threshold/)
assert.match(ledger, /unintended selection of a high-dose\/perfusion protocol instead of the intended standard head CT protocol results in CTDIvol 125 mGy/)
assert.match(ledger, /notify without delay using available information \*\*while\*\* investigation and recording proceed/)
const curriculum = fs.readFileSync(new URL('../data/curriculum.js', import.meta.url), 'utf8')
assert.match(curriculum, /id: 'qualitaetssicherung-vorkommnisse'[^\n]+link: '\/technik\/qualitaetssicherung-vorkommnisse', inProgress: true/)
assert.match(ledger, /embedded in the lesson only; no global MCQ-bank item or quiz link is claimed/)
assert.doesNotMatch(ledger, /global MCQ item is registered/)
console.log(`Technik incidents translation/source audit passed (${triples.length} aligned units).`)
