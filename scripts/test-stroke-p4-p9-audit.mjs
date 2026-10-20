import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { STROKE_FLASHCARDS, STROKE_LESSON, STROKE_QUESTIONS } from '../data/stroke.js'

const locales = ['de', 'en', 'fa']
const aspects = STROKE_LESSON.aspects
assert.deepEqual(aspects.regions.map(level => level.items.length), [7, 3])
assert.equal(aspects.regions.flatMap(level => level.items).length, 10)
for (const locale of locales) {
  assert.ok(aspects.regions.every(level => Boolean(level.level[locale])))
  for (const region of aspects.regions.flatMap(level => level.items)) assert.ok(aspects.regionNames[region][locale], `${region} missing ${locale}`)
  assert.ok(aspects.scoring[locale] && aspects.diagramNote[locale])
  assert.ok(aspects.sourceCaption[locale] && aspects.imageAlt[locale])
}
const aspectsCrop = readFileSync(new URL('../public/stroke/aspects-regions-p4.png', import.meta.url))
assert.equal(aspectsCrop.readUInt32BE(16), 840)
assert.equal(aspectsCrop.readUInt32BE(20), 605)

for (const [label, timeline, expectedRows] of [
  ['CT', STROKE_LESSON.ctTimeline, 8],
  ['MRI', STROKE_LESSON.mriTimeline, 9],
]) {
  assert.equal(timeline.rows.length, expectedRows, `${label} rows`)
  for (const locale of locales) {
    assert.ok(timeline.headers.every(header => header[locale]), `${label} headers missing ${locale}`)
    for (const row of timeline.rows) {
      assert.equal(row.length, 2)
      for (const cell of row) if (typeof cell !== 'string') assert.ok(cell[locale], `${label} cell missing ${locale}`)
    }
  }
}

assert.match(STROKE_LESSON.ctTimeline.rows[3][1].en, /mass effect and haemorrhagic transformation/i)
assert.match(STROKE_LESSON.mriTimeline.enhancementText.en, /peak at about 3–4 weeks/i)
assert.match(STROKE_LESSON.mriTimeline.rows[5][1].en, /luxury perfusion/i)
assert.doesNotMatch(JSON.stringify(STROKE_LESSON.mri.rows), /as a substitute for non-contrast CT/i)

for (const locale of locales) {
  const question = STROKE_QUESTIONS[locale].find(item => item.question.includes('DWI-FLAIR'))
  const answer = question.options.find(option => option.id === question.correct).text
  assert.match(answer, /selection|Auswahl|انتخاب/i)
  const card = STROKE_FLASHCARDS.find(item => item.front[locale]?.includes('DWI-FLAIR'))
  assert.ok(card, `DWI-FLAIR card missing ${locale}`)
  assert.doesNotMatch(card.answer[locale], /likely early infarct|wahrscheinlich früher Infarkt|احتمال انفارکت زودرس/i)

  const thrombectomy = STROKE_LESSON.treatment.items[1].text[locale]
  const thrombectomyQuestion = STROKE_QUESTIONS[locale].find(item => /Thrombektomie|thrombectomy|ترومبکتومی/i.test(item.question))
  const thrombectomyCard = STROKE_FLASHCARDS.find(item => /thrombectomy|thrombektomie|ترومبکتومی/i.test(item.front[locale]))
  const selectedWording = {
    de: /ausgewählten geeigneten Patienten.*klinischen und bildgebenden Auswahlkriterien/i,
    en: /selected eligible patients.*clinical and imaging selection criteria/i,
    fa: /بیماران منتخب و واجد شرایط.*معیارهای بالینی و تصویربرداری/i,
  }[locale]
  const diagramWording = {
    de: /Ausgewählte geeignete Patienten.*klinische und bildgebende Kriterien/i,
    en: /Selected eligible patients.*clinical and imaging criteria/i,
    fa: /بیماران منتخب و واجد شرایط.*معیارهای بالینی و تصویربرداری/i,
  }[locale]
  assert.match(thrombectomy, selectedWording)
  assert.match(thrombectomyQuestion.question, /selected eligible patients|ausgewählten geeigneten Patienten|بیماران منتخب و واجد شرایط/i)
  assert.match(thrombectomyCard.answer[locale], /selected eligible patients|ausgewählten geeigneten Patienten|بیماران منتخب و واجد شرایط/i)
  assert.match(thrombectomyCard.diagram[locale], diagramWording)
}

const page = readFileSync(new URL('../app/gehirn/vaskulaer/isch-aemischer-schlaganfall/page.js', import.meta.url), 'utf8')
assert.match(page, /function AspectsMap/)
assert.match(page, /imageSrc="\/stroke\/aspects-regions-p4\.png"/)
assert.match(page, /imageClassName=\{strokeStyles\.strokeHeroImage\}/)
assert.match(page, /visualCaption=\{c\(STROKE_LESSON\.aspects\.sourceCaption\)\}/)
assert.match(page, /STROKE_LESSON\.ctTimeline\.rows/)
assert.match(page, /STROKE_LESSON\.mriTimeline\.rows/)
assert.doesNotMatch(page, /\/stroke\/(?:ct|mri)-timeline\.png/)

console.log('Stroke p.4–9 localized coverage checks passed.')
