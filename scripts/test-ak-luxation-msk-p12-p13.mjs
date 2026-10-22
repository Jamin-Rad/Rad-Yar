import assert from 'node:assert/strict'
import fs from 'node:fs'
import { AK_LUXATION_LESSON, AK_LUXATION_QUESTIONS, AK_LUXATION_FLASHCARDS } from '../data/ak-luxation.js'

const langs = ['de', 'en', 'fa']
const lesson = AK_LUXATION_LESSON
const ledger = fs.readFileSync(new URL('../docs/lesson-quality/source-ledgers/ak-luxation-msk-p12-p13.md', import.meta.url), 'utf8')
const pageSource = fs.readFileSync(new URL('../app/msk/trauma/ak-luxation/page.js', import.meta.url), 'utf8')
const sharedLessonStyles = fs.readFileSync(new URL('../app/abdomen/gi/divertikulitis/page.module.css', import.meta.url), 'utf8')
const expectedQuestionIds = [
  'ak-lux-mech-1', 'ak-lux-band-1', 'ak-lux-rock-1', 'ak-lux-rock-2',
  'ak-lux-rock-3', 'ak-lux-ccd-1', 'ak-lux-therapie-1', 'ak-lux-tossy-1',
  'ak-lux-belastung-1', 'ak-lux-rock-vi-1', 'ak-lux-norm-1', 'ak-lux-op-1',
]

assert.equal(lesson.id, 'ak-luxation')
assert.match(pageSource, /import LessonHero from '@\/components\/LessonHero'/)
assert.match(pageSource, /imageSrc=\{D\.rockwood\.illustrationSrc\}/)
assert.match(pageSource, /imageAlt=\{c\(D\.rockwood\.illustrationAlt\)\}/)
assert.doesNotMatch(pageSource, /<h1>\{c\(D\.title\)\}<\/h1>/)
assert.match(pageSource, /lead=\{`\$\{c\(D\.definition\)\} \$\{c\(D\.anatomie\.lead\)\}`\}/)
assert.match(sharedLessonStyles, /\.akLuxationPage \.heroText :global\(\[data-lesson-hero\]\) h1/)
assert.match(sharedLessonStyles, /\.akLuxationPage \.heroText :global\(\[data-lesson-hero\]\[lang='fa'\]\) h1[\s\S]*?'Vazirmatn'/)
assert.match(sharedLessonStyles, /\.akLuxationPage \.heroText :global\(\[data-lesson-hero\]\) figure img \{ transform: none; object-fit: contain; \}/)
assert.equal(lesson.rockwood.rows.length, 6)
assert.equal(AK_LUXATION_FLASHCARDS.length, 8)

for (const lang of langs) {
  const rows = lesson.rockwood.rows
  const joined = rows.map(row => row.map(cell => cell[lang]).join(' ')).join(' ')
  assert.match(joined, lang === 'fa' ? /۲۵٪/ : /25\s*%/i, `${lang}: Type II relative threshold`)
  assert.match(joined, /25–100 ?%|25-100 ?%|۲۵ تا ۱۰۰٪|۲۵–۱۰۰ ?٪/i, `${lang}: Type III relative threshold`)
  assert.match(joined, /100–300 ?%|100-300 ?%|۱۰۰ تا ۳۰۰٪|۱۰۰–۳۰۰ ?٪/i, `${lang}: Type V relative threshold`)
  assert.match(joined, /Gegenseite|unverletzten Seite|opposite side|uninjured side|سمت مقابل|سمت سالم/i, `${lang}: percentages are relative to the opposite side`)
  assert.doesNotMatch(joined, /CCD\s*>\s*25\s*mm|CCD\s*<\s*25\s*mm|Hochstand\s*>\s*50\s*%|elevation\s*>\s*50\s*%|ارتفاع\s*>\s*۵۰٪/i, `${lang}: source's disputed absolute/height cutoffs are not used as definitions`)
  assert.match(lesson.rockwood.illustrationAlt[lang], /I.*II.*III.*IV.*V.*VI/, `${lang}: image types are mapped in localized alt text`)
  assert.match(lesson.bildgebung.ccdNote.text[lang], /10–15 kg|۱۰ تا ۱۵ کیلوگرم/i, `${lang}: PDF load is retained`)
  assert.match(lesson.bildgebung.ccdNote.text[lang], /Nordin|نوردین/i, `${lang}: conflicting weighted-view evidence named`)
  assert.match(lesson.bildgebung.ccdNote.text[lang], /lower loads|geringere Lasten|بار کمتری/i, `${lang}: lower published loads noted`)
  assert.match(lesson.bildgebung.ccdNote.text[lang], /individu|individual|تفاوت فردی/i, `${lang}: normal CCD individual variation noted`)

  const questions = AK_LUXATION_QUESTIONS[lang]
  assert.equal(questions.length, 12, `${lang}: all 12 linked MCQs are present`)
  assert.deepEqual(questions.map(({ id }) => id.replace(`-${lang}`, '')).sort(), [...expectedQuestionIds].sort(), `${lang}: all expected linked MCQ IDs are present`)
  for (const question of questions) {
    assert.ok(question.explanation.trim(), `${question.id}: explanation exists`)
    assert.ok(question.options.some(({ id }) => id === question.correct), `${question.id}: correct option is linked`)
    assert.doesNotMatch(question.explanation, /always surgical|always treated surgically|immer operativ|immer\s+OP|obligatory|mandatory|axial view zwingend|immer\s+schweres Trauma|همیشه جراحی|اجباری است|الزامی است/i, `${question.id}: explanation avoids categorical treatment/imaging claims`)
    assert.doesNotMatch(question.explanation, /CCD\s*>\s*25\s*mm|CCD\s*<\s*25\s*mm|>\s*25\s*mm/i, `${question.id}: explanation avoids absolute 25 mm threshold`)
  }

  const byId = Object.fromEntries(questions.map(question => [question.id, question]))
  const ccdQuestion = byId[`ak-lux-ccd-1-${lang}`]
  const ccdCorrectOption = ccdQuestion.options.find(({ id }) => id === ccdQuestion.correct)
  assert.ok(ccdCorrectOption, `${lang}: CCD question has a linked correct option`)
  assert.doesNotMatch(ccdCorrectOption.text, /not independently (verified|confirmed)|nicht.*unabhängig.*bestätigt|مستقلاً تأییدنشده/i, `${lang}: correct answer does not contradict independent support for 11–13 mm`)
  assert.match(ccdCorrectOption.text, /published|publiziert|منتشرشده/i, `${lang}: correct answer identifies 11–13 mm as a published range`)
  assert.match(ccdCorrectOption.text, /side|Seitenvergleich|طرف/i, `${lang}: correct answer retains side comparison`)
  assert.match(ccdCorrectOption.text, /technique|Technik|تکنیک/i, `${lang}: correct answer retains technique caveat`)
  assert.match(ccdQuestion.explanation, /11–13 mm|۱۱ تا ۱۳ میلی‌متر/, `${lang}: CCD explanation matches the corrected answer`)
  assert.match(byId[`ak-lux-rock-1-${lang}`].explanation, /25 ?%|۲۵ ?٪/i, `${lang}: Type II teaching is in its linked question`)
  assert.match(byId[`ak-lux-rock-2-${lang}`].explanation, /100–300 ?%|100-300 ?%|۱۰۰ تا ۳۰۰٪|۱۰۰–۳۰۰ ?٪/i, `${lang}: Type V teaching is in its linked question`)
  assert.match(byId[`ak-lux-therapie-1-${lang}`].explanation, /usually|üblicherweise|معمولاً/i, `${lang}: treatment is qualified`)
  assert.match(byId[`ak-lux-belastung-1-${lang}`].explanation, /Nordin|نوردین/i, `${lang}: weighted-view evidence is consistent in MCQ`)
}

const cards = Object.fromEntries(AK_LUXATION_FLASHCARDS.map(card => [card.id, card]))
for (const id of Array.from({ length: 8 }, (_, index) => `ak-lux-fc-${index + 1}`)) {
  assert.ok(cards[id], `${id}: linked card exists`)
  for (const field of ['front', 'answer', 'explanation']) {
    for (const lang of langs) assert.ok(cards[id][field][lang]?.trim(), `${id}.${field}.${lang} exists`)
  }
}
for (const lang of langs) {
  const treatmentCards = [cards['ak-lux-fc-3'], cards['ak-lux-fc-4'], cards['ak-lux-fc-8']]
  for (const card of treatmentCards) {
    assert.doesNotMatch(`${card.answer[lang]} ${card.explanation[lang]}`, /always surgical|immer operativ|must be removed|muss entfernt werden|همیشه جراحی|باید برداشته شود/i, `${card.id}.${lang}: no unsupported absolute mandate`)
  }
  assert.match(cards['ak-lux-fc-5'].answer[lang], /25–100 ?%|25-100 ?%|۲۵ تا ۱۰۰٪|۲۵–۱۰۰ ?٪/i)
  assert.match(cards['ak-lux-fc-5'].answer[lang], /100–300 ?%|100-300 ?%|۱۰۰ تا ۳۰۰٪|۱۰۰–۳۰۰ ?٪/i)
  assert.match(cards['ak-lux-fc-2'].answer[lang], /10–15 kg|10–15 kg|۱۰ تا ۱۵ کیلوگرم/i)
  assert.match(cards['ak-lux-fc-2'].answer[lang], /Nordin|نوردین/i)
  assert.match(cards['ak-lux-fc-2'].explanation[lang], /side|Seitenvergleich|طرف/i)
}

for (const filename of ['schulter-ap-rid48600.png', 'rockwood-klassifikation.png']) {
  const stat = fs.statSync(new URL(`../public/ak-luxation/${filename}`, import.meta.url))
  assert.ok(stat.size > 10_000, `${filename} exists and is non-empty`)
}
assert.equal(lesson.bildgebung.radiopaediaUrl, 'https://radiopaedia.org/cases/48600/play')
assert.match(ledger, /physical MSK\.pdf pp\.12–13/i)
assert.match(ledger, /Andrew Murphy, 2019/)
assert.match(ledger, /J\. Hocking/)
assert.match(ledger, /weighted views\s+conflicts|Evidence conflicts/i)
assert.match(ledger, /does not replace specialist assessment|no automatic/i)

console.log('AC-joint dislocation MSK.pdf pp.12–13 source-alignment checks passed for DE/EN/FA.')
