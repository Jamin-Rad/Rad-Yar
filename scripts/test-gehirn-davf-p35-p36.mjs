import assert from 'node:assert/strict'
import fs from 'node:fs'
import { DAVF_LESSON, DAVF_QUESTIONS, DAVF_FLASHCARDS } from '../data/davf.js'

const route = fs.readFileSync('app/gehirn/vaskulaer/davf/page.js', 'utf8')
const source = fs.readFileSync('data/davf.js', 'utf8')
assert.match(route, /<LessonHero[\s\S]*imageSrc="\/davf\/hero\.svg"/)
assert.match(route, /id === 'grundlagen'/)
assert.match(route, /drainage-patterns\.svg/)
assert.match(route, /cortical reflux/i)
assert.doesNotMatch(route, /DAVF_LESSON\.(definition|sourceLabel|heroCards)/)
assert.ok(DAVF_LESSON.sections.length >= 6)
assert.ok(DAVF_LESSON.cognard.rows.some(row => row[0] === 'IIa+b'))
assert.ok(DAVF_LESSON.cognard.rows.some(row => row[0] === 'V' && String(row[1].de).toLowerCase().includes('spinale')))
assert.match(source, /Barrow B–D/)
assert.doesNotMatch(source, /~2\s*%|~10\s*%|~2%|~10%|always treat|immer behandeln|immer eine Therapie indiziert/)
assert.ok(fs.existsSync('public/davf/hero.svg'))
assert.ok(fs.existsSync('public/davf/drainage-patterns.svg'))
for (const lang of ['de', 'en', 'fa']) {
  assert.equal(DAVF_QUESTIONS[lang].length, 12, `${lang}: 12 MCQs`)
  assert.ok(DAVF_QUESTIONS[lang].every(q => q.options.length === 4 && q.explanation), `${lang}: valid MCQ explanations`)
  assert.ok(DAVF_FLASHCARDS.every(card => card.front[lang] && card.answer[lang] && card.explanation[lang]), `${lang}: localized flashcards`)
}
console.log('dAVF pp.35–36 checks PASS: shared hero, first chapter open, Cognard V distinction, no grade-wide annual-rate absolutes, and localized linked assessments.')
