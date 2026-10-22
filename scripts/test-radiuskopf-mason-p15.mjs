import assert from 'node:assert/strict'
import fs from 'node:fs'
import { RADIUSKOPF_LESSON, RADIUSKOPF_QUESTIONS, RADIUSKOPF_FLASHCARDS } from '../data/radiuskopf.js'

const langs = ['de', 'en', 'fa']
const mason = RADIUSKOPF_LESSON.mason
assert.ok(mason, 'the existing Mason section remains in place')
assert.deepEqual(mason.headers.map(x => x.de), ['Typ', 'Definition', 'Radiologisches Merkmal'], 'classification table separates morphology from treatment')
assert.equal(mason.rows.length, 4)

for (const [index, row] of mason.rows.entries()) {
  for (const value of row) {
    assert.deepEqual(Object.keys(value).sort(), langs, `Mason row ${index + 1} is localized in all languages`)
    for (const lang of langs) assert.ok(value[lang].trim(), `Mason row ${index + 1} has ${lang} text`)
  }
}

const rowText = lang => mason.rows.map(row => row.map(cell => cell[lang]).join(' ')).join(' ')
for (const lang of langs) {
  assert.match(rowText(lang), /< 2 mm|< ۲ میلی‌متر/)
  assert.match(rowText(lang), /> 2 mm|> ۲ میلی‌متر/)
  assert.match(rowText(lang), /> 30 %|> ۳۰٪/)
  assert.match(rowText(lang), /multi-fragmentary|Mehrfragment|چندقطعه‌ای/i)
  assert.match(rowText(lang), /elbow dislocation|Ellenbogenluxation|لوکساسیون آرنج/i)
  assert.doesNotMatch(rowText(lang), /≥\s*3|≥\s*۳|entire radial head|gesamte[sr]? Radiusköpfchen|تمام سر رادیوس|ORIF/i)
  assert.match(mason.key[lang], /exactly 2 mm|exakt 2 mm|دقیقاً ۲ میلی‌متر/i, `${lang} key states the exactly-2-mm gap`)
  assert.match(mason.key[lang], /Figure legend|Bildlegende|راهنمای تصویر/i, `${lang} key visibly translates the figure labels`)
}

const question = (id, lang) => RADIUSKOPF_QUESTIONS[lang].find(item => item.id === `${id}-${lang}`)
for (const lang of langs) {
  const type12 = question('rk-mason-1', lang)
  assert.ok(type12)
  assert.match(type12.options[type12.correct.charCodeAt(0) - 65].text, /> 2 mm|> ۲ میلی‌متر/)
  assert.match(type12.options[type12.correct.charCodeAt(0) - 65].text, /> 30 %|> ۳۰٪/)
  assert.doesNotMatch(type12.explanation, /ORIF|conservative|konservativ|درمان محافظه‌کارانه/i)
  assert.match(type12.explanation, /exactly 2 mm|exakt 2 mm|دقیقاً ۲ میلی‌متر/i)

  const type3 = question('rk-therapie-1', lang)
  assert.ok(type3)
  assert.match(type3.options[type3.correct.charCodeAt(0) - 65].text, /comminuted|Mehrfragment|چندقطعه‌ای/i)
  assert.match(type3.explanation, /fixed fragment count|feste Fragmentzahl|تعداد قطعات ثابتی/i)
}

const cards = Object.fromEntries(RADIUSKOPF_FLASHCARDS.map(card => [card.id, card]))
for (const id of ['rk-fc-1', 'rk-fc-2']) {
  assert.ok(cards[id], `${id} remains registered`)
  for (const field of ['front', 'answer', 'explanation']) {
    assert.deepEqual(Object.keys(cards[id][field]).sort(), langs, `${id}.${field} is translated`)
    for (const lang of langs) assert.ok(cards[id][field][lang].trim(), `${id}.${field} has ${lang} copy`)
  }
}
assert.match(cards['rk-fc-1'].answer.en, /> 2 mm.*> 30 %/)
assert.match(cards['rk-fc-1'].answer.en, /Exactly 2 mm.*unassigned/i)
assert.doesNotMatch(cards['rk-fc-1'].answer.en, /ORIF/)
assert.match(cards['rk-fc-2'].answer.en, /No minimum fragment count/)
assert.doesNotMatch(cards['rk-fc-2'].answer.en, /≥ 3|ORIF.*not feasible|prosthesis/i)

const type4Treatment = RADIUSKOPF_LESSON.therapie.items.find(item => item.title.en.includes('Mason IV'))
assert.ok(type4Treatment, 'existing Mason IV treatment card remains')
for (const lang of langs) {
  assert.deepEqual(Object.keys(type4Treatment.text).sort(), langs)
  assert.match(type4Treatment.text[lang], /Stabilität|stability|پایداری/i)
  assert.match(type4Treatment.text[lang], /Rekonstruierbarkeit|reconstructibility|قابلیت بازسازی/i)
  assert.match(type4Treatment.text[lang], /Begleitverletzungen|associated injuries|آسیب‌های همراه/i)
  assert.match(type4Treatment.text[lang], /patientenbezogenen Faktoren|patient factors|عوامل مربوط به بیمار/i)
  assert.match(type4Treatment.text[lang], /reponieren|reduce the elbow dislocation|جااندازی/i)
  assert.doesNotMatch(type4Treatment.text[lang], /II: ORIF|II:.*ORIF|III: Prothese|III: arthroplasty|III: پروتز/i)

  const type2Management = question('rk-mason-therapie-2', lang)
  assert.ok(type2Management, 'linked treatment MCQ remains registered')
  assert.match(type2Management.options[type2Management.correct.charCodeAt(0) - 65].text, /ORIF/i)
  assert.match(type2Management.explanation, /alone does not mandate|allein.*keine Operation|به‌تنهایی جراحی را الزامی نمی‌کند/i)

  const terribleTriad = question('rk-terrible-triad-1', lang)
  assert.ok(terribleTriad)
  assert.match(terribleTriad.options[terribleTriad.correct.charCodeAt(0) - 65].text, /coronoid|Coronoid|کرونوئید/i, 'the original diagnostic question and answer remain intact')
  assert.match(terribleTriad.explanation, /patient factors|patientenbezogener Faktoren|عوامل مربوط به بیمار/i)
  assert.doesNotMatch(terribleTriad.explanation, /must be surgically addressed|müssen chirurgisch versorgt|باید جراحی شوند|MRI.*for ligament assessment|MRT für Bandbeurteilung|MRI برای ارزیابی رباط/i)

  const essex = question('rk-essex-1', lang)
  assert.ok(essex)
  assert.match(essex.options[essex.correct.charCodeAt(0) - 65].text, /interosseous membrane|Membrana interossea|غشای بین‌استخوانی/i, 'the original Essex-Lopresti diagnostic answer remains intact')
  assert.match(essex.explanation, /reconstructibility and associated injuries|Rekonstruierbarkeit und Begleitverletzungen|قابلیت بازسازی و آسیب‌های همراه/i)
  assert.doesNotMatch(essex.explanation, /contraindicated|Kontraindiziert|منع مصرف|prosthesis required|Prothese erforderlich|پروتز لازم است|never resect|nie resezieren|هرگز رزکسیون نکنید/i)
}

const masonTakehome = RADIUSKOPF_LESSON.takehome.items.filter(item => /Mason/i.test(`${item.title.de} ${item.title.en}`))
assert.equal(masonTakehome.length, 2, 'Mason take-home summaries remain present')
for (const item of masonTakehome) {
  for (const lang of langs) {
    assert.doesNotMatch(item.text[lang], /≤\s*2 mm|≤\s*30 %|≤\s*۲|II\s*(?:→|=|:).*ORIF|III\s*(?:→|=|:).*(?:Prothese|prosthesis|پروتز)/i, 'take-home must not restore the old threshold or class-to-treatment shortcut')
  }
}
const type12Takehome = masonTakehome.find(item => /Mason I vs/.test(item.title.en))
assert.ok(type12Takehome)
for (const lang of langs) assert.match(type12Takehome.text[lang], /exactly 2 mm|exakt 2 mm|دقیقاً ۲ میلی‌متر/i)
const type3Takehome = masonTakehome.find(item => /Mason III/.test(item.title.en))
assert.ok(type3Takehome)
assert.match(type3Takehome.text.en, /does not mandate arthroplasty/i)
assert.match(type3Takehome.text.fa, /پروتز را الزامی نمی‌کند/)

const treatmentCards = ['rk-fc-5', 'rk-fc-6', 'rk-fc-8'].map(id => cards[id])
for (const card of treatmentCards) {
  assert.ok(card, 'associated-injury and stability treatment card remains registered')
  for (const lang of langs) {
    const copy = `${card.answer[lang]} ${card.explanation[lang]}`
    assert.doesNotMatch(copy, /MUSS ersetzt|MUST be replaced|باید جایگزین شود|nie resezieren|never resect|هرگز رزکسیون نکنید|absolut kontraindiziert|absolute contraindication/i)
  }
}
assert.match(cards['rk-fc-5'].answer.en, /reconstructibility and associated injuries/i)
assert.match(cards['rk-fc-5'].answer.en, /not automatic/i)
assert.match(cards['rk-fc-6'].answer.en, /individualise management/i)
assert.match(cards['rk-fc-8'].answer.en, /depends on the overall injury/i)

const assetPath = 'public/radiuskopf/mason-klassifikation-msk-p15.png'
assert.ok(fs.existsSync(assetPath), 'source-page schematic crop exists')
assert.match(mason.schemaSrc, /mason-klassifikation-msk-p15\.png/)
for (const lang of langs) assert.match(mason.schemaAlt[lang], /MSK\.pdf|PDF/)
const asset = fs.readFileSync(assetPath)
assert.equal(asset.subarray(1, 4).toString(), 'PNG')
assert.ok(asset.readUInt32BE(20) >= 490, 'crop includes the full lower Type III caption')
const page = fs.readFileSync('app/msk/trauma/radiuskoepfchenfraktur/page.js', 'utf8')
assert.doesNotMatch(page, /useEffect\(\(\) => setOpen\(false\)/, 'sections must not close immediately after mounting')
assert.match(page, /querySelector\('button\[aria-expanded="false"\]'\)/, 'TOC expands its destination when it was manually closed')
assert.match(page, /header\?\.click\(\)[\s\S]*section\?\.scrollIntoView/, 'TOC opens the target before scrolling')

const ledger = fs.readFileSync('docs/lesson-quality/source-ledgers/radiuskopf-mason-msk-p15.md', 'utf8')
assert.match(ledger, /physical PDF p\.15 \/ printed p\.14/)
assert.match(ledger, /exactly 2 mm unassigned/)
assert.match(ledger, /not a treatment source/)
assert.match(ledger, /35545488/)
assert.match(ledger, /34511427/)
assert.match(ledger, /never resect.*absolutism/i)
assert.match(ledger, /RK-MASON-UX-01/)

const matrix = fs.readFileSync('docs/lesson-quality/msk-wirbelsaeule-curriculum-matrix.md', 'utf8')
assert.match(matrix, /radiuskopf-mason-msk-p15\.md/)
console.log('Radial-head Mason MSK.pdf p.15: source-aligned DE/EN/FA, linked MCQ/cards, and schematic provenance PASS.')
