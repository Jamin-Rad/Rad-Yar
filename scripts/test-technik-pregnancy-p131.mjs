import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { CONTRAST_LESSONS } from '../data/contrastLessons.js'
import { localizedText } from './contrast-source-helpers.mjs'
import { CONTRAST_FLASHCARDS, CONTRAST_QUESTIONS } from '../data/contrastMedia.js'

const lessonTerms = {
  de: ['ESUR 2026', 'ersten Lebenswoche', 'ACR (Abruf 2026)', 'keinen Zusatztest'],
  en: ['ESUR 2026', 'first-week', 'ACR (accessed 2026)', 'no extra test'],
  fa: ['ESUR ۲۰۲۶', 'هفتهٔ اول', 'ACR (مراجعه در ۲۰۲۶)', 'آزمایش اضافه'],
}
const diagram = readFileSync(new URL('../public/educational/pregnancy-contrast-pathways.svg', import.meta.url), 'utf8')
assert.ok(diagram.includes('placental transfer during pregnancy'))
assert.ok(diagram.includes('limited transfer through breast milk'))

for (const lang of ['de', 'en', 'fa']) {
  const lesson = CONTRAST_LESSONS.schwangerschaft
  assert.deepEqual(lesson.sections.map(section => section.id), ['grundprinzip', 'jod', 'gadolinium', 'stillzeit', 'takehome'])
  const iodine = localizedText(lesson.sections.find(section => section.id === 'jod').blocks, lang)
  const localizedIodine = lesson.sections.find(section => section.id === 'jod').blocks.at(-1).text[lang]
  for (const term of lessonTerms[lang]) assert.ok(iodine.includes(term), `${lang} lesson missing ${term}`)
  assert.ok(localizedIodine.includes(lessonTerms[lang][0]))
  const lactation = lesson.sections.find(section => section.id === 'stillzeit')
  const lactationJson = localizedText(lactation, lang)
  for (const term of (lang === 'de' ? ['24','< 1','0,5','0,04'] : lang === 'en' ? ['24','< 1','0.5','0.04'] : ['۲۴','۱٪','۰٫۵','۰٫۰۴'])) assert.ok(lactationJson.includes(term), `lactation table missing ${term}`)

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
