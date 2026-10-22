import assert from 'node:assert/strict'
import fs from 'node:fs'
import { PSC_MRCP_QUESTIONS, PSC_MRCP_FLASHCARDS, PSC_MRCP_FLASHCARD_TOPIC } from '../data/pscMrcpLearning.js'

const langs = ['de', 'en', 'fa']
const topicId = 'psc-pbc'
const routes = fs.readFileSync(new URL('../app/abdomen/leber/psc-mrcp/page.js', import.meta.url), 'utf8')
const curriculum = fs.readFileSync(new URL('../data/curriculum.js', import.meta.url), 'utf8')
const questionsRegistry = fs.readFileSync(new URL('../data/questions.js', import.meta.url), 'utf8')
const flashcardRegistry = fs.readFileSync(new URL('../data/flashcards.js', import.meta.url), 'utf8')
const provenance = JSON.parse(fs.readFileSync(new URL('../public/educational/psc-mrcp/image-provenance.json', import.meta.url), 'utf8'))
const topicRows = curriculum.match(/\{ id: 'psc-pbc',[^\n]+/g) || []
assert.equal(topicRows.length, 1, 'exact curriculum ID appears once')
assert.match(topicRows[0], /link: '\/abdomen\/leber\/psc-mrcp'/)
assert.match(topicRows[0], /mcqLink: '\/ueben\/quiz\?fach=abdomen&n=10&themen=psc-pbc'/)
assert.match(topicRows[0], /flashcardLink: '\/flashcards\/psc-pbc'/)
assert.match(topicRows[0], /inProgress: true/, 'AI work is not marked as publication-ready')
assert.match(questionsRegistry, /import \{ PSC_MRCP_QUESTIONS \} from '\.\/pscMrcpLearning'/)
assert.match(questionsRegistry, /MCQ_TOPIC_GROUPS[\s\S]*?id: 'psc-pbc'/, 'quiz topic selector registration')
assert.match(flashcardRegistry, /PSC_MRCP_FLASHCARD_TOPIC/)
assert.match(flashcardRegistry, /PSC_MRCP_FLASHCARDS/)

for (const lang of langs) {
  const questions = PSC_MRCP_QUESTIONS[lang]
  assert.equal(questions.length, 1, `${lang}: exactly one PSC/MRCP MCQ`)
  const [question] = questions
  assert.equal(question.tags[0], topicId)
  assert.equal(question.options.length, 4)
  assert.ok(question.options.some(option => option.id === question.correct))
  assert.match(question.source, /Abdomen\.pdf, PDF p\. 29 \(printed p\. 28\)/)
  assert.equal(PSC_MRCP_FLASHCARDS.length, 1, 'one retrieval card defined')
  for (const field of ['front', 'answer', 'explanation']) assert.ok(PSC_MRCP_FLASHCARDS[0][field][lang].length > 10, `${lang}: ${field} translated`)
}

assert.match(topicRows[0], /PSC \(MRCP; PBC nicht behandelt\)/)
assert.match(topicRows[0], /PSC \(MRCP; PBC not covered\)/)
assert.match(topicRows[0], /PBC در این درس نیست/)
assert.equal(PSC_MRCP_FLASHCARD_TOPIC.href, '/flashcards/psc-pbc')
for (const label of ['actionMcq', 'actionCards', 'actionBack']) {
  assert.match(routes, new RegExp(`${label}:`), `${label} labels exist`)
}
assert.match(routes, /themen=psc-pbc/)
assert.match(routes, /flashcards\/psc-pbc\?from=/)
assert.match(routes, /PBC wird auf den hier abgedeckten Seiten ebenfalls nicht gelehrt/)
assert.match(routes, /PBC is also not taught on the pages covered here/)
assert.match(routes, /در صفحات پوشش‌داده‌شده در این درس، PBC نیز آموزش داده نمی‌شود/)
assert.doesNotMatch(routes, /<h1/, 'the shared lesson shell owns the only H1')
assert.match(routes, /contentTitle: 'MRCP-Muster und Befundung'/)
assert.match(routes, /contentTitle: 'MRCP pattern and reporting'/)
assert.match(routes, /contentTitle: 'الگوی MRCP و گزارش'/)
assert.match(routes, /alt=\{c\.imageAlt\}/)
assert.match(routes, /figcaption[^>]*>\{c\.imageCaption\}/)
assert.equal(provenance.sourcePdfPage, 29)
assert.equal(provenance.printedPage, 28)
assert.match(provenance.rights, /user explicitly confirmed/)

console.log('PSC/MRCP curriculum, focused trilingual MCQ/card registration, source page mapping, PBC scope, and route actions passed.')
