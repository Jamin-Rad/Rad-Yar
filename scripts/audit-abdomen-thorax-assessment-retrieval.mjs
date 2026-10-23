import assert from 'node:assert/strict'
import fs from 'node:fs'
import { CURRICULUM } from '../data/curriculum.js'
import { QUESTION_BANK, getQuestions } from '../data/questions.js'
import { ABDOMEN_THORAX_REGISTERED_QUESTIONS, ABDOMEN_THORAX_REGISTERED_TOPIC_GROUPS } from '../data/abdomenThoraxRegisteredQuestions.js'

const languages = ['de', 'en', 'fa']
const curriculumIds = new Set()
const chapterIdsBySubject = new Map()
for (const subject of CURRICULUM) {
  chapterIdsBySubject.set(subject.id, new Set((subject.kapitel || []).map(chapter => chapter.id)))
}
const walk = value => {
  if (Array.isArray(value)) return value.forEach(walk)
  if (value && typeof value === 'object') {
    if (value.id) curriculumIds.add(value.id)
    Object.values(value).forEach(walk)
  }
}
walk(CURRICULUM)

for (const group of ABDOMEN_THORAX_REGISTERED_TOPIC_GROUPS) {
  assert.ok(chapterIdsBySubject.get(group.fachId)?.has(group.kapitelId), `${group.fachId}/${group.kapitelId}: topic group references a missing curriculum chapter`)
}

let topicCount = 0
for (const [draftKey, byLanguage] of Object.entries(ABDOMEN_THORAX_REGISTERED_QUESTIONS)) {
  const expectedTags = byLanguage.de.tags
  assert.ok(expectedTags.length > 0, `${draftKey}: no curriculum tags`)
  for (const lang of languages) {
    const question = byLanguage[lang]
    assert.ok(question, `${draftKey}: missing ${lang} registration`)
    assert.equal(question.id, `${draftKey}-${lang}-01`)
    assert.deepEqual(question.tags, expectedTags)
    assert.ok(question.tags.every(tag => curriculumIds.has(tag)), `${draftKey}: tag is not an exact curriculum ID`)
    assert.equal(QUESTION_BANK[lang].filter(item => item.id === question.id).length, 1, `${question.id}: not uniquely registered`)
  }
  topicCount += expectedTags.length
}

for (const tag of new Set(Object.values(ABDOMEN_THORAX_REGISTERED_QUESTIONS).flatMap(byLanguage => byLanguage.de.tags))) {
  for (const lang of languages) {
    const expectedIds = Object.values(ABDOMEN_THORAX_REGISTERED_QUESTIONS)
      .filter(byLanguage => byLanguage[lang].tags.includes(tag))
      .map(byLanguage => byLanguage[lang].id)
    const retrieved = getQuestions([tag], lang, QUESTION_BANK[lang].length)
    const retrievedIds = new Set(retrieved.map(item => item.id))
    assert.equal(retrievedIds.size, retrieved.length, `${lang}/${tag}: duplicate question IDs in retrieval`)
    assert.ok(retrieved.every(item => item.tags.includes(tag)), `${lang}/${tag}: retrieval included a question without the exact tag`)
    for (const id of expectedIds) assert.ok(retrievedIds.has(id), `${lang}/${tag}: registered question ${id} is not retrievable`)
  }
}

const lowerGIBleeding = ABDOMEN_THORAX_REGISTERED_QUESTIONS['abdomen-lower-gi-bleeding']
assert.ok(lowerGIBleeding, 'Lower-GI bleeding MCQ registration is missing')
for (const lang of languages) {
  const question = lowerGIBleeding[lang]
  assert.equal(question.tags[0], 'untere-gi-blutung')
  assert.equal(question.options.length, 4)
  assert.equal(question.correct, 'A')
  assert.equal(new Set(question.options.map(option => option.text)).size, 4)
}
const lowerGIPage = fs.readFileSync('app/abdomen/gi/untere-gi-blutung/page.js', 'utf8')
assert.match(lowerGIPage, /n=1&themen=untere-gi-blutung&from=\$\{encodeURIComponent\(lessonReturn\)\}/)
assert.match(lowerGIPage, /flashcardsHref=\{withLang\(`\/flashcards\/untere-gi-blutung\?from=\$\{encodeURIComponent\(lessonReturn\)\}`\)\}/)
const lowerGICurriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(lowerGICurriculum, /id: 'untere-gi-blutung'[^\n]+mcqLink: '\/ueben\/quiz\?fach=abdomen&n=1&themen=untere-gi-blutung&from=%2Fabdomen%2Fgi%2Funtere-gi-blutung'[^\n]+flashcardLink: '\/flashcards\/untere-gi-blutung\?from=%2Fabdomen%2Fgi%2Funtere-gi-blutung'/)

console.log(`Assessment retrieval passed: ${Object.keys(ABDOMEN_THORAX_REGISTERED_QUESTIONS).length} registered questions, ${topicCount} exact curriculum tags, DE/EN/FA retrieval.`)
