import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { CONTRAST_LESSONS } from '../data/contrastLessons.js'
import { CONTRAST_FLASHCARDS, CONTRAST_QUESTIONS } from '../data/contrastMedia.js'

const lessonTerms = {
  de: ['ESUR 2026', 'ersten Lebenswoche', 'ACR 2026', 'keinen Zusatztest'],
  en: ['ESUR 2026', 'first-week', 'ACR 2026', 'no extra test'],
  fa: ['ESUR ۲۰۲۶', 'هفتهٔ اول', 'ACR ۲۰۲۶', 'آزمایش اضافه'],
}
const routeSource = readFileSync(new URL('../app/technik/kontrastmittel/ContrastGroupPage.jsx', import.meta.url), 'utf8')
const diagram = readFileSync(new URL('../public/educational/pregnancy-contrast-pathways.svg', import.meta.url), 'utf8')
assert.ok(routeSource.includes("groupId === 'schwangerschaft'"))
assert.ok(routeSource.includes('/educational/pregnancy-contrast-pathways.svg'))
assert.ok(routeSource.includes('Conceptual, non-anatomical diagram'))
assert.ok(routeSource.includes('طرح مفهومی و غیرآناتومیک'))
assert.ok(diagram.includes('placental transfer during pregnancy'))
assert.ok(diagram.includes('limited transfer through breast milk'))

for (const lang of ['de', 'en', 'fa']) {
  const lesson = CONTRAST_LESSONS.schwangerschaft
  assert.deepEqual(lesson.sections.map(section => section.id), ['grundprinzip', 'jod', 'gadolinium', 'stillzeit', 'takehome'])
  const iodine = JSON.stringify(lesson.sections.find(section => section.id === 'jod').blocks)
  const localizedIodine = lesson.sections.find(section => section.id === 'jod').blocks.at(-1).text[lang]
  for (const term of lessonTerms[lang]) assert.ok(iodine.includes(term), `${lang} lesson missing ${term}`)
  assert.ok(localizedIodine.includes(lessonTerms[lang][0]))
  const lactation = lesson.sections.find(section => section.id === 'stillzeit')
  const lactationJson = JSON.stringify(lactation)
  for (const term of ['24', '< 1', '0,5', '0.5', '0,04', '0.04']) assert.ok(lactationJson.includes(term), `lactation table missing ${term}`)

  const questions = CONTRAST_QUESTIONS[lang].filter(question => question.tags.includes('km-schwangerschaft-stillzeit'))
  const cards = CONTRAST_FLASHCARDS.filter(card => card.topicId === 'km-schwangerschaft-stillzeit')
  assert.equal(questions.length, 3, `${lang} should have three linked questions`)
  assert.equal(cards.length, 3, `${lang} should have three generated cards`)
  for (let index = 0; index < questions.length; index += 1) {
    const question = questions[index]
    assert.equal(question.options.length, 4)
    assert.ok(question.explanation.length > 100, `${lang} question ${question.id} needs explanatory feedback`)
    assert.ok(question.options.some(option => option.id === question.correct))
    assert.equal(cards[index].front[lang], question.question)
    assert.equal(cards[index].answer[lang], question.options.find(option => option.id === question.correct).text)
    assert.equal(cards[index].explanation[lang], question.explanation)
  }
}

console.log('p131 pregnancy/lactation source and assessment parity passed for DE/EN/FA')
