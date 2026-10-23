import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import {
  BRAIN_METASTASES_COPY as copy,
  BRAIN_METASTASES_PATH as path,
  BRAIN_METASTASES_SECTIONS as sections,
  BRAIN_METASTASES_SOURCES as sources,
  BRAIN_METASTASES_ID as id,
  BRAIN_METASTASES_QUESTIONS as registeredQuestions,
  BRAIN_METASTASES_FLASHCARDS as cards,
  BRAIN_METASTASES_FLASHCARD_TOPIC as cardTopic,
} from '../data/gehirnHirnmetastasenLesson.js'

const locales = ['de', 'en', 'fa']
assert.equal(path, '/gehirn/tumoren/hirnmetastasen')
assert.equal(id, 'metastasen-meningeosis')
assert.deepEqual(sections.map(({ id }) => id), ['pattern', 'review', 'leptomeningeal', 'self-check', 'take-home'])
assert.equal(sections.filter(section => section.emphasis).length, 1)

for (const key of ['title', 'heroAlt', 'objective', 'intro', 'pattern', 'workflow', 'visualTitle', 'visualCaption', 'warning', 'question', 'scopeNote', 'leptomeningealTitle', 'leptomeningeal', 'leptomeningealWorkflow', 'leptomeningealWarning', 'leptomeningealVisualTitle', 'leptomeningealVisualCaption', 'leptomeningealQuestion']) {
  assert.deepEqual(Object.keys(copy[key]).sort(), locales.slice().sort(), `${key}: locale keys`)
  for (const lang of locales) assert.ok(copy[key][lang].trim().length > 20, `${key}/${lang}: non-empty localized text`)
}
assert.equal(copy.options.length, 4)
assert.equal(copy.feedback.length, 4)
assert.equal(copy.leptomeningealOptions.length, 4)
assert.equal(copy.leptomeningealFeedback.length, 4)
assert.equal(copy.takeaway.length, 5)
for (const [index, item] of copy.takeaway.entries()) for (const field of ['title', 'detail']) {
  assert.deepEqual(Object.keys(item[field]).sort(), locales.slice().sort(), `takeaway ${index}/${field}: locale keys`)
  for (const lang of locales) assert.ok(item[field][lang].trim().length > 4, `takeaway ${index}/${field}/${lang}: non-empty`)
}
for (const [index, localized] of [...copy.options, ...copy.feedback, ...copy.leptomeningealOptions, ...copy.leptomeningealFeedback].entries()) for (const lang of locales) {
  assert.ok(localized[lang].trim().length > 15, `assessment ${index}/${lang}: non-empty localized text`)
}
for (const lang of locales) {
  assert.equal(registeredQuestions[lang].length, 2)
  for (const question of registeredQuestions[lang]) {
    assert.equal(question.correct, 'A')
    assert.deepEqual(question.options.map(option => option.id), ['A', 'B', 'C', 'D'])
    assert.equal(question.tags[0], id)
    assert.equal(Object.keys(question.wrongExplanations).length, 3)
  }
}
assert.equal(cards.length, 5)
assert.equal(cardTopic.id, id)
assert.equal(cardTopic.href, `/flashcards/${id}`)

const terms = {
  de: ['schriftliche Befundmerkmale', 'parenchymal', 'leptomeningeale', 'Primärtumor'],
  en: ['written report descriptors', 'parenchymal', 'leptomeningeal', 'primary tumour'],
  fa: ['توصیف‌های مکتوب', 'پارانشیمی', 'لپتومننژیال', 'تومور اولیه'],
}
for (const lang of locales) for (const term of terms[lang]) {
  const allLessonText = [copy.objective, copy.intro, copy.pattern, copy.workflow, copy.warning, copy.leptomeningeal, copy.leptomeningealWorkflow, copy.leptomeningealWarning, copy.question, copy.leptomeningealQuestion, ...copy.options, ...copy.feedback, ...copy.leptomeningealOptions, ...copy.leptomeningealFeedback,
    ...copy.takeaway.flatMap(item => [item.title, item.detail])].map(value => value[lang]).join('\n')
  assert.ok(allLessonText.includes(term), `semantic coverage missing ${lang}: ${term}`)
}
assert.match(copy.objective.de, /schriftliche Befundmerkmale/i)
assert.match(copy.objective.en, /written report descriptors/i)
assert.match(copy.objective.fa, /توصیف‌های مکتوب/)
assert.match(copy.objective.de, /weder vermittelt noch geprüft/i)
assert.match(copy.objective.en, /neither taught nor assessed/i)
assert.match(copy.objective.fa, /آموزش داده یا ارزیابی نمی‌شود/)
assert.match(copy.question.de, /Befundbericht beschreibt/i)
assert.match(copy.question.en, /report describes/i)
assert.match(copy.question.fa, /گزارش تصویربرداری/)
for (const lang of locales) {
  assert.doesNotMatch(copy.scopeNote[lang], /metastasen-meningeosis|curriculum|inProgress|linked/i, `learner scope note contains implementation detail: ${lang}`)
  assert.match(copy.scopeNote[lang], /leptomeningeal|leptomeningeale|لپتومننژیال/i)
  assert.match(copy.scopeNote[lang], /parenchymal|parenchymale|پارانشیمی/i)
}
assert.ok(sources.some(source => source.href.includes('eano.eu')))
assert.ok(sources.some(source => source.href.includes('PMC10619142')))
assert.ok(sources.some(source => source.href.includes('PMC9527527')))
for (const source of sources) for (const lang of locales) assert.ok(source.citation[lang].trim(), `source translation ${lang}`)
const hero = await readFile(new URL('../public/educational/hirnmetastasen/hero.svg', import.meta.url), 'utf8')
const provenance = JSON.parse(await readFile(new URL('../public/educational/hirnmetastasen/image-provenance.json', import.meta.url), 'utf8'))
const curriculum = await readFile(new URL('../data/curriculum.js', import.meta.url), 'utf8')
const questionRegistry = await readFile(new URL('../data/questions.js', import.meta.url), 'utf8')
const flashcardRegistry = await readFile(new URL('../data/flashcards.js', import.meta.url), 'utf8')
assert.match(hero, /<svg[\s\S]*?<\/svg>/)
assert.equal(provenance.diagnosticImage, false)
assert.equal(provenance.patientPixels, false)
assert.match(curriculum, /id: 'metastasen-meningeosis'[^\n]+link: '\/gehirn\/tumoren\/hirnmetastasen'[^\n]+inProgress: true/)
assert.match(questionRegistry, /BRAIN_METASTASES_QUESTIONS/)
assert.match(flashcardRegistry, /BRAIN_METASTASES_FLASHCARD_TOPIC/)
assert.match(flashcardRegistry, /\.\.\.BRAIN_METASTASES_FLASHCARDS/)

console.log('Brain metastases checker passed: source scope, sections, two question/feedback sets and DE/EN/FA semantic anchors.')
