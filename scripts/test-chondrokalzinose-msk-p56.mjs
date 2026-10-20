import assert from 'node:assert/strict'
import fs from 'node:fs'
import { CHONDROKALZINOSE_LESSON as lesson } from '../data/chondrokalzinoseLesson.js'

assert.equal(lesson.id, 'chondrokalzinose')
assert.ok(lesson.title.de && lesson.title.en && lesson.title.fa)
assert.equal(lesson.check.answer, 1)
assert.equal(lesson.summary.length, 4)
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(lesson.title[lang] && lesson.alt[lang] && lesson.intro[lang], lang + ' lesson intro')
  assert.ok(lesson.radiograph.alt[lang] && lesson.radiograph.caption[lang], lang + ' image copy')
  for (const goal of lesson.goals) assert.ok(goal[lang], lang + ' learning goal')
  for (const key of ['xrayTitle', 'xray', 'mriTitle', 'mri', 'caveTitle', 'cave']) assert.ok(lesson.content[key][lang], lang + ' ' + key)
  assert.ok(lesson.check.question[lang] && lesson.check.explanation[lang] && lesson.check.incorrectExplanation[lang], lang + ' question and feedback')
  for (const option of lesson.check.options) assert.ok(option[lang], lang + ' answer option')
  for (const point of lesson.summary) assert.ok(point[lang], lang + ' summary')
}
const assertNoPersianInGerman = value => {
  if (Array.isArray(value)) return value.forEach(assertNoPersianInGerman)
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (key === 'de' && typeof child === 'string') assert.doesNotMatch(child, /[\u0600-\u06FF]/, 'German locale contains Arabic/Persian script: ' + child)
      else assertNoPersianInGerman(child)
    }
  }
}
assertNoPersianInGerman(lesson)
assert.match(lesson.content.mri.en, /mimicking a tear/)
assert.match(lesson.content.cave.en, /does not prove a meniscal tear/)
assert.match(lesson.content.cave.en, /does not prove that current symptoms are caused by CPPD/)
assert.equal(lesson.radiograph.src, '/msk/knie/chondrokalzinose/msk-p56-rid-22147.jpg')
assert.ok(fs.statSync('public/msk/knie/chondrokalzinose/msk-p56-rid-22147.jpg').size > 1000)
assert.ok(fs.statSync('public/msk/knie/chondrokalzinose/msk-p56-rid-22147-joint-detail.jpg').size > 1000)
assert.ok(fs.existsSync('public/educational/chondrokalzinose-knee.svg'))

const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /id: 'chondrokalzinose'[^\n]*link: '\/msk\/knie\/chondrokalzinose'/)
const page = fs.readFileSync('app/msk/knie/chondrokalzinose/page.js', 'utf8')
for (const phrase of ['StandardLessonShell', 'LessonSection', 'LessonSources', 'role="status"']) assert.ok(page.includes(phrase), phrase)
assert.match(page, /lesson\.check\.incorrectExplanation/)
assert.match(page, /chondrokalzinose-knee\.svg/)
assert.match(page, /detailSrc/)
assert.match(page, /11566703/)
const ledger = fs.readFileSync('docs/lesson-quality/chondrokalzinose-msk-p56.md', 'utf8')
for (const phrase of ['CPPD-56-01', 'CPPD-56-07', 'physical p.56 / printed p.55', 'rID 22147', 'pending']) assert.ok(ledger.includes(phrase), phrase)
console.log('Chondrocalcinosis MSK.pdf p.56: source coverage, DE/EN/FA parity, image provenance, exact curriculum mapping and assessment PASS.')
