import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const read = path => readFile(new URL(path, root), 'utf8')
const moduleText = await read('data/foreignBodyAspirationLearning.js')
const moduleUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(moduleText)}`
const learning = await import(moduleUrl)

for (const lang of ['de', 'en', 'fa']) {
  const questions = learning.FOREIGN_BODY_ASPIRATION_QUESTIONS[lang]
  assert.equal(questions.length, 1, `${lang}: exactly one focused MCQ`)
  assert.equal(questions[0].topicId, 'fremdkoerper-atemwege')
  assert.equal(questions[0].options.length, 4)
  assert.equal(new Set(questions[0].options.map(option => option.id)).size, 4)
  assert.equal(questions[0].options.some(option => option.id === questions[0].correct), true)
  assert.ok(questions[0].explanation.includes(lang === 'fa' ? 'صفحهٔ ۳۱' : lang === 'de' ? 'PDF-S. 31' : 'PDF p. 31'))
  for (const value of [questions[0].question, questions[0].explanation, ...questions[0].options.map(option => option.text)]) {
    assert.ok(value.trim(), `${lang}: no empty localized assessment text`)
  }
}

assert.equal(learning.FOREIGN_BODY_ASPIRATION_FLASHCARDS.length, 1)
assert.equal(learning.FOREIGN_BODY_ASPIRATION_FLASHCARDS[0].topicId, 'fremdkoerper-atemwege')
for (const lang of ['de', 'en', 'fa']) {
  const card = learning.FOREIGN_BODY_ASPIRATION_FLASHCARDS[0]
  assert.ok(card.front[lang] && card.answer[lang] && card.explanation[lang])
  assert.match(card.explanation[lang], /30|۳۰/)
}

const questionsRegistry = await read('data/questions.js')
const flashcardsRegistry = await read('data/flashcards.js')
const curriculum = await read('data/curriculum.js')
const route = await read('app/thorax/fremdkoerperaspiration/page.js')
const ledger = await read('docs/lesson-quality/abdomen-thorax-authoring-ledger.md')
const map = await read('docs/lesson-quality/pdf-map-abdomen-thorax.md')

assert.match(questionsRegistry, /FOREIGN_BODY_ASPIRATION_QUESTIONS\[lang\]/)
assert.match(questionsRegistry, /id: 'fremdkoerper-atemwege'.*Fremdkörperaspiration bei Kindern/s)
assert.match(flashcardsRegistry, /FOREIGN_BODY_ASPIRATION_FLASHCARD_TOPIC/)
assert.match(flashcardsRegistry, /\.\.\.FOREIGN_BODY_ASPIRATION_FLASHCARDS/)
assert.match(curriculum, /id: 'fremdkoerper-atemwege'.*mcqLink: '\/ueben\/quiz\?fach=thorax&n=10&themen=fremdkoerper-atemwege'.*flashcardLink: '\/flashcards\/fremdkoerper-atemwege'/)
assert.match(route, /quizHref=\{quizHref\} flashcardsHref=\{flashcardsHref\}/)
assert.match(route, /href="\/lernen\/thorax">\{c\.returnToThorax\}/)
assert.match(route, /PDF-S\. 30–31 \(gedruckte S\. 29–30\)/)
assert.match(route, /PDF pp\. 30–31 \(printed pp\. 29–30\)/)
assert.match(route, /صفحات چاپی ۲۹–۳۰/)
assert.match(ledger, /physical pp\. 30–31 \(printed pp\. 29–30\).*one localized MCQ.*one retrieval card/s)
assert.match(map, /physical pp\. 30–31 \(printed pp\. 29–30\).*one linked DE\/EN\/FA MCQ.*one linked retrieval card/s)

console.log('FBA assessment integration passed: one MCQ and one card in DE/EN/FA, exact topic links, route return actions, and PDF page mapping.')
