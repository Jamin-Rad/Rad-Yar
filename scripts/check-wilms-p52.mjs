import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { WILMS_LESSON } from '../data/wilmsLesson.js'
import { ABDOMEN_THORAX_REGISTERED_QUESTIONS } from '../data/abdomenThoraxRegisteredQuestions.js'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards.js'

const locales = ['de', 'en', 'fa']
const route = await readFile(new URL('../app/abdomen/niere/wilms-tumour/page.jsx', import.meta.url), 'utf8')
const curriculum = await readFile(new URL('../data/curriculum.js', import.meta.url), 'utf8')

assert.equal(WILMS_LESSON.id, 'nephroblastom-wilms')
assert.match(curriculum, /id: 'nephroblastom-wilms',[^\n]+link: '\/abdomen\/niere\/wilms-tumour'/)
assert.match(route, /<StandardLessonShell lessonId=\{l\.id\}/)
assert.match(route, /l\.images\.map/)
assert.match(route, /variant="wilms-tumour"/)
assert.match(route, /themen=nephroblastom-wilms/)
assert.match(route, /flashcards\/nephroblastom-wilms/)
assert.equal((route.match(/<main\b/g) || []).length, 0, 'lesson route should leave the single main landmark to StandardLessonShell')
assert.equal(WILMS_LESSON.images.length, 2)
assert.equal(WILMS_LESSON.check.answer, 0)

for (const locale of locales) {
  assert.ok(WILMS_LESSON.title[locale])
  assert.ok(WILMS_LESSON.subtitle[locale])
  assert.equal(WILMS_LESSON.goals.filter(goal => goal[locale]).length, 3)
  assert.equal(WILMS_LESSON.sections.filter(section => section.title[locale] && section.body[locale] && section.implication[locale]).length, 3)
  assert.equal(WILMS_LESSON.summary.filter(item => item[locale]).length, 3)
  assert.ok(WILMS_LESSON.check.question[locale])
  assert.equal(WILMS_LESSON.check.options.filter(option => option[locale]).length, 4)
  assert.ok(WILMS_LESSON.check.explanation[locale])
  assert.ok(WILMS_LESSON.check.retry[locale])
  assert.ok(WILMS_LESSON.source[locale])
  assert.ok(WILMS_LESSON.media[locale])
  for (const image of WILMS_LESSON.images) {
    assert.ok(image.alt[locale])
    assert.ok(image.caption[locale])
  }
}

const registeredQuestion = ABDOMEN_THORAX_REGISTERED_QUESTIONS['nephroblastom-wilms']
assert.ok(registeredQuestion, 'Wilms self-check must be registered in the shared MCQ bank')
for (const locale of locales) {
  const question = registeredQuestion[locale]
  assert.equal(question.question, WILMS_LESSON.check.question[locale])
  assert.equal(question.options.length, 4)
  WILMS_LESSON.check.options.forEach((option, index) => assert.equal(question.options[index].text, option[locale]))
  assert.equal(question.tags[0], 'nephroblastom-wilms')
}

const wilmsCards = FLASHCARDS.filter(card => card.topicId === 'nephroblastom-wilms')
assert.equal(wilmsCards.length, 2, 'Wilms flashcards must be registered')
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'nephroblastom-wilms'))

assert.match(WILMS_LESSON.media.en, /Both CT views are from the user-supplied Abdomen\.pdf/)
for (const image of WILMS_LESSON.images) {
  const relativeAsset = image.src.replace(/^\//, '../public/')
  assert.ok((await stat(new URL(relativeAsset, import.meta.url))).size > 10_000, `missing or too small: ${image.src}`)
  const provenance = new URL(`${relativeAsset.replace(/\.png$/, '')}.provenance.json`, import.meta.url)
  const record = JSON.parse(await readFile(provenance, 'utf8'))
  assert.equal(record.source, 'Abdomen.pdf')
  assert.equal(record.pdf_page, 52)
  assert.equal(record.diagnostic_evidence, true)
  assert.match(record.rights_basis, /user/i)
  assert.match(record.case_attribution, /not provided/i)
}

console.log('Wilms p52 checks passed: curriculum route, shared lesson shell, source CT crops/provenance, DE/EN/FA copy and embedded self-check. Browser QA remains untested.')
