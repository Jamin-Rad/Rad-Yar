import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { CONTRAST_LESSONS } from '../data/contrastLessons.js'
import { CONTRAST_FLASHCARDS, CONTRAST_QUESTIONS } from '../data/contrastMedia.js'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARD_TOPICS, FLASHCARDS } from '../data/flashcards.js'

const locales = ['de', 'en', 'fa']
const lesson = CONTRAST_LESSONS.roentgen
const topicId = 'km-jod-reaktionen'
const visualSrc = '/educational/contrast-media/contrast-reaction-context.svg'
const questionPatterns = {
  de: /früherer schwerer unmittelbarer HSR/i,
  en: /previous severe immediate HSR/i,
  fa: /واکنش حساسیتی فوریِ شدید/i,
}

for (const locale of locales) {
  const section = lesson.sections.find(item => item.id === 'reaktionen')
  const recommendationTable = section.blocks.find(block => block.type === 'table' && block.rows?.length === 3)
  assert.ok(recommendationTable, `${locale}: severity-specific recommendation table exists`)
  assert.equal(recommendationTable.rows.length, 3, `${locale}: mild, moderate, severe rows are present`)
  for (const cell of [...recommendationTable.headers, ...recommendationTable.rows.flat()]) {
    assert.ok(cell[locale]?.length > 0, `${locale}: table cell is translated`)
  }
  assert.ok(section.blocks.some(block => block.type === 'sourceLink' && block.href === 'https://doi.org/10.1148/radiol.240100' && block.label[locale]), `${locale}: joint 2025 consensus is linked`)
  assert.ok(section.blocks.some(block => block.type === 'sourceLink' && block.href === 'https://doi.org/10.1007/s00330-025-11676-0' && block.label[locale]), `${locale}: ESUR 2025 guidance is linked`)
}

const reactionSection = lesson.sections.find(item => item.id === 'reaktionen')
const contextVisual = reactionSection.blocks.find(block => block.type === 'imageGallery')?.images.find(image => image.src === visualSrc)
assert.ok(contextVisual, 'reaction context visual is registered in the existing reaction section')
for (const locale of locales) {
  assert.ok(contextVisual.alt[locale] && contextVisual.caption[locale], `${locale}: context visual has localized alt text and caption`)
}
assert.match(contextVisual.alt.de, /Verlauf und Begleitzeichen/)
assert.match(contextVisual.alt.en, /progression and associated signs/)
assert.match(contextVisual.alt.fa, /روند و علائم همراه/)
const svg = await readFile(new URL(`../public${visualSrc}`, import.meta.url), 'utf8')
assert.match(svg, /Reaction pattern and severity/)
assert.match(svg, /does not diagnose from one symptom/)
assert.match(svg, /<text x="723" y="192"[^>]*>1<\/text>[\s\S]*<text x="807" y="192"[^>]*>2<\/text>[\s\S]*<text x="891" y="192"[^>]*>3<\/text>/)
assert.doesNotMatch(svg, /Radiopaedia|patient|case study/i, 'visual must remain an original concept schematic without patient material')

const questionByLocale = Object.fromEntries(locales.map(locale => {
  const question = CONTRAST_QUESTIONS[locale].find(item => item.tags.includes(topicId) && questionPatterns[locale].test(item.question))
  assert.ok(question, `${locale}: severe prior-reaction assessment exists`)
  assert.equal(question.options.length, 4, `${locale}: question has four options`)
  assert.equal(question.options.filter(option => option.id === question.correct).length, 1, `${locale}: exactly one keyed option exists`)
  assert.ok(question.explanation.length > 40, `${locale}: localized explanation is substantive`)
  return [locale, question]
}))

const [deQuestion, enQuestion, faQuestion] = locales.map(locale => questionByLocale[locale])
assert.equal(deQuestion.correct, enQuestion.correct)
assert.equal(deQuestion.correct, faQuestion.correct)

for (const locale of locales) {
  const question = questionByLocale[locale]
  const card = CONTRAST_FLASHCARDS.find(item => item.topicId === topicId && item.front[locale] === question.question)
  assert.ok(card, `${locale}: aligned flashcard exists`)
  assert.equal(card.answer[locale], question.options.find(option => option.id === question.correct).text, `${locale}: flashcard answer matches MCQ`)
  assert.equal(card.explanation[locale], question.explanation, `${locale}: flashcard feedback matches MCQ`)
  assert.ok(QUESTION_BANK[locale].some(item => item.id === question.id), `${locale}: question is registered in the exercise bank`)
}
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === topicId), 'reaction flashcard topic is registered')
assert.ok(FLASHCARDS.some(card => card.topicId === topicId && locales.every(locale => card.front[locale] === questionByLocale[locale].question)), 'reaction card is registered in the flashcard deck')

console.log('Röntgen reaction p.123 checks passed: severity table, source links, and DE/EN/FA severe-reaction MCQ/card parity.')
