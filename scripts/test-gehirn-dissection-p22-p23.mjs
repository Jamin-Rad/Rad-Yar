import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { DISSECTION_LESSON, DISSECTION_QUESTIONS, DISSECTION_FLASHCARDS } from '../data/dissection.js'

const route = await readFile(new URL('../app/gehirn/vaskulaer/gefaessdissektion/page.js', import.meta.url), 'utf8')
const ledger = await readFile(new URL('../docs/lesson-quality/gehirn-dissection-source-p22-p23.md', import.meta.url), 'utf8')

assert.deepEqual(DISSECTION_LESSON.pdfSourcePages, [22, 23])
assert.match(DISSECTION_LESSON.mri.rows[0][2].en, /first 48–72 h/i)
assert.match(DISSECTION_LESSON.mri.cave.en, /does not exclude dissection/i)
assert.doesNotMatch(JSON.stringify(DISSECTION_LESSON), /20\s*%/, 'unverified PDF prevalence statistic remains omitted')

const intervention = DISSECTION_LESSON.complications.items.find(item => item.title.en === 'Recanalisation / intervention')
assert.ok(intervention)
assert.match(intervention.text.en, /Stenting is not routine/i)
assert.match(intervention.text.en, /recurrent ischaemia despite optimal antithrombotic therapy/i)
assert.match(intervention.text.en, /symptomatic hypoperfusion/i)
assert.match(intervention.text.en, /expanding dissecting aneurysm causing compression/i)
assert.match(intervention.text.en, /for example/i)
assert.doesNotMatch(intervention.text.en, /consider it only/i)
assert.equal(DISSECTION_LESSON.complications.references.length, 2)
assert.ok(DISSECTION_LESSON.complications.references.some(ref => ref.href.includes('ahajournals.org/doi/10.1161/STR.0000000000000457')))
assert.ok(DISSECTION_LESSON.complications.references.some(ref => ref.href.includes('ESO_Dissection_Guideline_03092021.pdf')))
assert.match(route, /DISSECTION_LESSON\.complications\.references\.map/)

for (const lang of ['de', 'en', 'fa']) {
  assert.ok(intervention.text[lang], `${lang}: intervention guidance translated`)
  assert.match(intervention.text[lang], lang === 'de' ? /z\. B\./ : lang === 'fa' ? /برای مثال/ : /for example/)
  assert.ok(DISSECTION_LESSON.complications.sourceNote[lang], `${lang}: visible source note translated`)
  assert.ok(DISSECTION_LESSON.complications.references.every(ref => ref.label[lang]), `${lang}: guideline links localized`)
  const questions = DISSECTION_QUESTIONS[lang]
  for (const id of ['early-mri', 'string', 'flame', 'tof-pitfall', 'pseudoaneurysm']) {
    const item = questions.find(question => question.id === `dissection-${lang}-${id}`)
    assert.ok(item, `${lang}: linked MCQ ${id} registered`)
    assert.ok(item.options.length >= 3 && item.options.some(option => option.id === item.correct), `${lang}: ${id} response key valid`)
  }
  for (const id of ['crescent', 'early', 'string', 'flame', 'tof', 'treatment']) {
    const card = DISSECTION_FLASHCARDS.find(item => item.topicId === 'gefaessdissektion-hirn' && item.id.endsWith(`-${id}`))
    assert.ok(card?.front[lang] && card.answer[lang] && card.explanation[lang], `${lang}: linked flashcard ${id} complete`)
  }
}

assert.match(ledger, /DIS-01/)
assert.match(ledger, /DIS-10/)
assert.match(ledger, /denominator/i)
console.log('Gehirn dissection pp.22–23 reconciliation PASS: source ledger, DE/EN/FA assessment links, early MRI caveat and guideline-qualified intervention checked.')
