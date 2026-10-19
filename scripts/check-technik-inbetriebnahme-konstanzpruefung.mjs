import fs from 'node:fs'
import assert from 'node:assert/strict'

const page = fs.readFileSync(new URL('../app/technik/qualitaetssicherung-vorkommnisse/page.jsx', import.meta.url), 'utf8')
const ledger = fs.readFileSync(new URL('../docs/lesson-quality/technik-inbetriebnahme-konstanzpruefung-p23.md', import.meta.url), 'utf8')
const curriculum = fs.readFileSync(new URL('../data/curriculum.js', import.meta.url), 'utf8')
const rtlScript = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/

for (const [pattern, label] of [
  [/id: 'device-qa'/, 'device QA chapter'],
  [/mindestens zwei Wochen vor dem geplanten Betriebsbeginn/, 'DE current notification lead time'],
  [/at least two weeks before intended operation/, 'EN current notification lead time'],
  [/دست‌کم دو هفته پیش از شروع برنامه‌ریزی‌شدهٔ کار/, 'FA current notification lead time'],
  [/spätestens 4 Wochen|four weeks before|چهار هفته/, 'obsolete four-week statement'],
  [/Eine pauschale Monatsfrist gilt nicht für jedes Gerät/, 'DE no universal monthly schedule'],
  [/There is no blanket monthly interval for every device/, 'EN no universal monthly schedule'],
  [/فاصلهٔ ماهانه برای همهٔ دستگاه‌ها یکسان نیست/, 'FA no universal monthly schedule'],
  [/Konstanzprüfungen werden fünf Jahre aufbewahrt/, 'DE five-year retention'],
  [/constancy-test records are kept for five years/, 'EN five-year retention'],
  [/سوابق آزمون پایداری پنج سال نگهداری می‌شوند/, 'FA five-year retention'],
  [/mindestens jedoch bis drei Jahre nach der nächsten vollständigen Abnahmeprüfung/, 'DE acceptance record retention'],
  [/at least three years after the next complete acceptance test/, 'EN acceptance record retention'],
  [/دست‌کم تا سه سال پس از آزمون پذیرش کامل بعدی/, 'FA acceptance record retention'],
  [/Strahlenschutzverordnung, §§ 115–117, 129–132/, 'current ordinance source'],
  [/Strahlenschutzgesetz, § 19/, 'operating notification source'],
  [/Strahlenschutzgesetz, § 172/, 'expert inspection source'],
  [/A medical physics expert must be involved in CT, three-dimensional imaging of objects with low X-ray contrast \(except tomosynthesis\), and fluoroscopy-guided interventions involving substantial exposure/, 'MPE involvement scope'],
  [/id="device-qa"/, 'rendered section id'],
  [/<figure className=\{styles\.qaFigure\}/, 'code-native process visual'],
  [/software update/i, 'assessment prompt'],
  [/§ 19 Abs\. 3 Nr\. 3–4/, 'SSB appointment and expertise evidence under §19(3)3–4'],
  [/erforderlichen Zahl von Strahlenschutzbeauftragten/, 'required number of SSBs'],
  [/required number of radiation-protection officers have been appointed/, 'EN required SSB number and appointment'],
  [/تعداد لازمِ مسئولان حفاظت پرتویی/, 'FA required SSB number'],
  [/Ursache unverzüglich festzustellen und zu beseitigen/, 'DE §116(4) identify and eliminate cause without delay'],
  [/cause must be identified and eliminated without delay/, 'EN §116(4) identify and eliminate cause without delay'],
  [/علت باید بی‌درنگ مشخص و برطرف شود/, 'FA §116(4) identify and eliminate cause without delay'],
  [/Ursache unverzüglich feststellen und beseitigen/, 'DE process visual §116(4)'],
  [/identify and eliminate the cause without delay/, 'EN process visual §116(4)'],
  [/علت را بی‌درنگ مشخص و برطرف کنید/, 'FA process visual §116(4)'],
]) {
  if (pattern.source.includes('four-week') || pattern.source.startsWith('spätestens 4 Wochen')) assert.doesNotMatch(page, pattern, label)
  else assert.match(page, pattern, label)
}

assert.match(ledger, /PDF page 24 pregnancy exposure.*Excluded from this bounded lesson/s)
assert.match(ledger, /Two-year retention.*Corrected to §117/s)
assert.match(ledger, /No universal physical presence is implied/s)
assert.match(ledger, /required number of SSBs are appointed and have required expertise under StrlSchG §19\(3\) nos\. 3–4/s)
assert.match(ledger, /cause to be identified and eliminated without delay/s)
const historicalLedger = fs.readFileSync(new URL('../docs/lesson-quality/technik-qualitaetssicherung-vorkommnisse-p21-p22.md', import.meta.url), 'utf8')
assert.match(historicalLedger, /historical p\.21–22 scope ledger.*route was later extended/s)
assert.match(historicalLedger, /technik-inbetriebnahme-konstanzpruefung-p23\.md/)
assert.match(historicalLedger, /route was later extended with selected p\.23 MPE participation requirements/)
const curriculaLine = curriculum.split(/\r?\n/).find(line => line.includes("id: 'qualitaetssicherung-vorkommnisse'"))
assert.ok(curriculaLine?.includes("link: '/technik/qualitaetssicherung-vorkommnisse', inProgress: true"), 'exact existing curriculum route/status')
assert.ok(rtlScript.test(page), 'Persian content must be present')
console.log('Technik p.23 equipment-QA source and language audit passed.')
