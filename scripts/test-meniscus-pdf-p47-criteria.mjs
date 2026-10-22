import assert from 'node:assert/strict'
import fs from 'node:fs'
import { MENISCUS_QUESTIONS } from '../data/meniscusLearning.js'

const lesson = fs.readFileSync('app/andarun/test/MeniscusTextLesson.jsx', 'utf8')
for (const phrase of [
  'Kontakt zum Gelenkflächenrand', 'Das pathologisch erhöhte Signal erreicht die superiore oder inferiore Meniskusoberfläche.',
  'Die normale dreieckige Meniskuskonfiguration ist verloren oder deutlich verändert.', 'Two-slice-touch-Regel',
  'Contact with the articular surface', 'The normal triangular configuration is lost or clearly altered.', 'Two-slice-touch rule',
  'تماس با سطح مفصلی', 'سیگنال پاتولوژیک به سطح فوقانی یا تحتانی منیسک می‌رسد.',
  'شکل مثلثی طبیعی منیسک از بین رفته یا واضحاً تغییر کرده است.', 'قانون Two-slice-touch',
]) assert.ok(lesson.includes(phrase), `lesson copy includes: ${phrase}`)
assert.doesNotMatch(lesson, />90\s*%/)

for (const locale of ['de', 'en', 'fa']) {
  const question = MENISCUS_QUESTIONS[locale].find(item => item.id === `meniskus-${locale}-02`)
  assert.ok(question, `${locale}: two-slice-touch question exists`)
  assert.equal(question.correct, 'B')
  assert.equal(question.options.length, 4)
  assert.ok(question.explanation)
}

const ledger = fs.readFileSync('docs/lesson-quality/meniskus-msk-p47-p55-addendum.md', 'utf8')
for (const phrase of ['MEN-47-01', 'physical p.47 / printed p.46', '>90%', 'no study cohort, protocol']) assert.ok(ledger.includes(phrase))
console.log('Meniscus MSK.pdf p.47 criteria: surface contact, morphology, two-slice retrieval and source-statistic disposition PASS.')
