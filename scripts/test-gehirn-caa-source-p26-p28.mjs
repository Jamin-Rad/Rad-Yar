import assert from 'node:assert/strict'
import fs from 'node:fs'
import { CURRICULUM } from '../data/curriculum.js'
import { CAA_QUESTIONS, CAA_FLASHCARDS } from '../data/caaStudyBank.js'

const brain = CURRICULUM.find(subject => subject.id === 'gehirn')
const entry = brain.kapitel.flatMap(chapter => chapter.themen || []).find(topic => topic.id === 'caa')
assert.ok(entry, 'CAA curriculum entry exists')
assert.equal(entry.mcqLink, '/ueben/quiz?fach=gehirn&n=18&themen=caa', 'curriculum action matches the lesson MCQ count')
assert.equal(entry.flashcardLink, '/flashcards/caa')
assert.equal(entry.fallLink, '/faelle?thema=caa', 'curriculum retains the case selection flow')
for (const lang of ['de', 'en', 'fa']) {
  assert.equal(CAA_QUESTIONS[lang].length, 18, `${lang}: 18 localized CAA MCQs`)
  assert.ok(CAA_QUESTIONS[lang].every(question => question.options.length === 4 && question.explanation), `${lang}: complete option/explanation schema`)
}
assert.ok(CAA_FLASHCARDS.length > 0, 'localized CAA flashcards remain registered')
assert.ok(fs.existsSync('app/gehirn/vaskulaer/caa/page.js'), 'CAA lesson route remains available')
console.log('CAA pp.26–28 wiring PASS: curriculum, 18-item localized MCQs, flashcards, case selection route and lesson page.')
