import assert from 'node:assert/strict'
import { STROKE_FLASHCARDS, STROKE_LESSON, STROKE_QUESTIONS } from '../data/stroke.js'

const locales = ['de', 'en', 'fa']
const treatment = STROKE_LESSON.treatment.items[0].text
const mismatch = STROKE_LESSON.mri.mismatchText
const heroAgent = STROKE_LESSON.heroCards[2].text

for (const [label, value] of Object.entries({ treatment, mismatch, heroAgent })) {
  for (const locale of locales) {
    assert.equal(typeof value[locale], 'string', `${label}.${locale} must exist`)
    assert.ok(value[locale].trim(), `${label}.${locale} must not be empty`)
  }
}

assert.match(treatment.en, /alteplase or tenecteplase/i)
assert.match(treatment.en, /within 4\.5 hours/i)
assert.match(treatment.en, /eligible patients/i)
assert.match(treatment.en, /unknown onset, a DWI-FLAIR mismatch can support selection/i)
assert.match(treatment.en, /Between 4\.5 and 9 hours.*defined automated perfusion-mismatch criteria/i)
assert.match(treatment.en, /any positive CTP finding is not sufficient/i)
assert.match(treatment.de, /Alteplase oder Tenecteplase/)
assert.match(treatment.de, /unbekanntem Symptombeginn kann ein DWI-FLAIR-Mismatch/)
assert.match(treatment.de, /Zwischen 4,5 und 9 Stunden.*automatisierter Perfusions-Mismatch-Kriterien/)
assert.match(treatment.de, /beliebiger positiver CTP-Befund genügt nicht/)
assert.match(treatment.fa, /آلتپلاز یا تنکتپلاز/)
assert.match(treatment.fa, /زمان شروع نامشخص.*عدم تطابق DWI-FLAIR/)
assert.match(treatment.fa, /۴٫۵ تا ۹ ساعت.*عدم تطابق پرفیوژن/)
assert.match(treatment.fa, /هر یافته مثبت CTP کافی نیست/)

assert.match(mismatch.en, /selected patients with unknown symptom onset/i)
assert.match(mismatch.en, /does not establish the exact lesion age/i)
assert.match(mismatch.en, /does not establish the exact lesion age or determine treatment eligibility by itself/i)
assert.match(mismatch.de, /bestimmt das Läsionsalter nicht exakt/)
assert.match(mismatch.fa, /سن ضایعه را دقیق تعیین نمی‌کند/)

assert.match(heroAgent.en, /alteplase or tenecteplase/i)
assert.match(heroAgent.de, /Alteplase oder Tenecteplase/)
assert.match(heroAgent.fa, /آلتپلاز یا تنکتپلاز/)

const assessmentTexts = JSON.stringify({
  questions: STROKE_QUESTIONS,
  flashcards: STROKE_FLASHCARDS,
})
assert.doesNotMatch(assessmentTexts, /positive CTP.*(?:automatically|alone|sufficient)/i)

const mismatchCard = STROKE_FLASHCARDS.find(item => item.front?.en?.includes('DWI-FLAIR mismatch'))
assert.ok(mismatchCard, 'DWI-FLAIR retrieval card must remain linked')
for (const locale of locales) {
  const mismatchQuestion = STROKE_QUESTIONS[locale].find(item => item.question.includes('DWI-FLAIR'))
  assert.ok(mismatchQuestion, `DWI-FLAIR question must remain linked for ${locale}`)
  assert.match(mismatchQuestion.options[mismatchQuestion.correct.charCodeAt(0) - 65].text, /selection|Auswahl|انتخاب/i)
  assert.match(mismatchQuestion.explanation, /unknown symptom onset|unbekanntem Symptombeginn|زمان شروع نامشخص/i)
  assert.doesNotMatch(mismatchCard.answer[locale], /likely early infarct|wahrscheinlich früher Infarkt|احتمال انفارکت زودرس/i)
  assert.match(mismatchCard.answer[locale], /selected patients|ausgewählten Patienten|بیماران منتخب/i)
  assert.match(mismatchCard.diagram[locale], /timestamp|Zeitstempel|زمان دقیق/i)
}

console.log('Stroke p.8–9 mismatch and thrombolysis claim checks passed.')
