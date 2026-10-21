import assert from 'node:assert/strict'
import fs from 'node:fs'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'

const route = '/abdomen/leber/adenom'
const topicId = 'leberadenom'
const definitions = [
  'hepatic-adenoma-hbp',
  'hepatic-adenoma-opposed-phase',
  'hepatic-adenoma-dynamic-ct',
  'hepatic-adenoma-caveat',
]
const topic = CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen).find(item => item.id === topicId)
assert.ok(topic, 'existing leberadenom curriculum topic exists')
assert.equal(topic.link, route)
assert.equal(topic.flashcardLink, '/flashcards/leberadenom')
assert.equal(topic.mcqLink, '/ueben/quiz?fach=abdomen&n=4&themen=leberadenom')
assert.equal(getLessonLinkForFlashcard(topic.flashcardLink), route)
assert.ok(FLASHCARD_TOPICS.some(item => item.id === topicId))
assert.equal(getCardsByTopic(topicId).length, 5)

for (const lang of ['de', 'en', 'fa']) {
  const addedDistractors = []
  for (const id of definitions) {
    const question = QUESTION_BANK[lang].find(item => item.id === `${id}-${lang}-01`)
    assert.ok(question, `${id}: registered ${lang} MCQ`)
    assert.ok(question.tags.includes(topicId))
    assert.equal(question.options.length, 4)
    assert.ok(question.options.some(option => option.id === question.correct))
    addedDistractors.push(question.options.find(option => option.id === 'D').text)
  }
  assert.equal(new Set(addedDistractors).size, definitions.length, `${lang}: each HCA MCQ has its own lesson-specific distractor`)
  for (const card of getCardsByTopic(topicId)) assert.ok(card.front[lang] && card.answer[lang] && card.explanation[lang], `${card.id}: complete ${lang} card`)
}
for (const id of ['hepatic-adenoma-opposed-phase', 'hepatic-adenoma-dynamic-ct']) {
  const de = QUESTION_BANK.de.find(item => item.id === `${id}-de-01`)
  const en = QUESTION_BANK.en.find(item => item.id === `${id}-en-01`)
  assert.notEqual(de.explanation, en.explanation, `${id}: German rationale is translated, not copied from English`)
}
const dynamicCtDe = QUESTION_BANK.de.find(item => item.id === 'hepatic-adenoma-dynamic-ct-de-01')
assert.ok(dynamicCtDe.options.some(option => option.id === 'D' && option.text === 'Ein portalvenöses Hypoenhancement ist spezifisch für HCA'))

const routeSource = fs.readFileSync(new URL('../app/abdomen/leber/adenom/page.js', import.meta.url), 'utf8')
const focalRoute = fs.readFileSync(new URL('../app/abdomen/leber/fokale-laesionen/page.js', import.meta.url), 'utf8')
assert.ok(focalRoute.includes('title={copy.title}'), 'focal liver comparison uses the defined localized copy object')
const asset = new URL('../public/educational/hepatic-adenoma/source-mri-p17.jpg', import.meta.url)
assert.ok(fs.statSync(asset).size > 20000, 'source MRI figure exists and is non-empty')
const provenance = fs.readFileSync(new URL('../docs/lesson-quality/media-provenance.md', import.meta.url), 'utf8')
assert.ok(provenance.includes('source-mri-p17.jpg'))
assert.ok(provenance.includes('x=225, y=936, width=1200, height=585'))
assert.ok(provenance.includes('user explicitly authorized reuse of figures in the supplied PDFs'))
for (const phrase of [
  'Hepatozelluläres Adenom', 'Hepatocellular adenoma', 'آدنوم هپاتوسلولار',
  'Die hepatobiliäre Phase ist auf dieser Bildtafel nicht enthalten.',
  'The hepatobiliary phase is not included in this figure.',
  'فاز هپاتوبیلیاری در این تصویر وجود ندارد.',
  'every 6 months for 2 years, then annually',
  'هر ۶ ماه به‌مدت ۲ سال و سپس سالانه',
  'alle 6 Monate für 2 Jahre, danach jährlich',
  'definitive treatment should be pursued if size remains ≥5 cm',
  'soll eine definitive Behandlung erfolgen',
  'درمان قطعی باید انجام شود',
  'https://doi.org/10.14309/ajg.0000000000002857',
]) assert.ok(routeSource.includes(phrase), `HCA source, scope and localized route content include: ${phrase}`)

console.log('Hepatic adenoma integration PASS: exact curriculum route, four localized MCQs, five localized flashcards, source figure/provenance and language coverage.')
