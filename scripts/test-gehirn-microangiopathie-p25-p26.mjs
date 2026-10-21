import assert from 'node:assert/strict'
import fs from 'node:fs'
import { HMA_LESSON, HMA_QUESTIONS, HMA_FLASHCARDS } from '../data/hypertensive-mikroangiopathie.js'

const asset = 'public/hypertensive-mikroangiopathie/fazekas-pdf-p25.png'
assert.ok(fs.existsSync(asset), 'cropped source panel exists')
assert.ok(fs.statSync(asset).size > 20_000, 'source panel is not empty')
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(HMA_LESSON.mrt.fazekasImageAlt[lang], `${lang}: image alt`)
  assert.ok(HMA_LESSON.mrt.fazekasImageCaption[lang].includes('E. De Marzio'), `${lang}: source credit`)
  assert.equal(HMA_LESSON.mrt.fazekasRows.length, 4, `${lang}: grades 0–3 remain distinct`)
  assert.ok(HMA_QUESTIONS[lang].length > 0, `${lang}: linked MCQ bank exists`)
}
assert.ok(HMA_FLASHCARDS.some(card => card.id.endsWith('-fazekas')), 'Fazekas retrieval card remains registered')
const page = fs.readFileSync('app/gehirn/vaskulaer/hypertensive-mikroangiopathie/page.js', 'utf8')
assert.match(page, /fazekas-pdf-p25\.png/)
assert.match(page, /fazekasImageAlt/)
assert.match(page, /<LessonHero[\s\S]*hero\.svg/)
assert.doesNotMatch(page, /<p>\{c\(HMA_LESSON\.definition\)\}<\/p>/)
console.log('Gehirn microangiopathy p25–26 source-panel checks PASS: asset, visible credit, DE/EN/FA alt/caption, grades 0–3, existing linked assessments.')
