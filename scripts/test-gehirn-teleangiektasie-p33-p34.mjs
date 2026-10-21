import assert from 'node:assert/strict'
import fs from 'node:fs'
import { TELEANGIEKTASIE_LESSON, TELEANGIEKTASIE_QUESTIONS, TELEANGIEKTASIE_FLASHCARDS } from '../data/kapillaere-teleangiektasie.js'

const route = fs.readFileSync('app/gehirn/vaskulaer/kapillaere-teleangiektasie/page.js', 'utf8')
assert.match(route, /<LessonHero[\s\S]*imageSrc="\/kapillaere-teleangiektasie\/hero\.svg"/)
assert.match(route, /id === 'grundlagen'/)
assert.match(route, /item\.sequenceImages \|\|/)
assert.match(route, /setZoomed\(\{ caseIndex: index, sequenceIndex \}\)/)
assert.doesNotMatch(route, /lesson\.trias|lesson\.befundung/)
assert.equal(TELEANGIEKTASIE_LESSON.sections.length, 7, 'duplicate triad/report chapters consolidated')
assert.ok(TELEANGIEKTASIE_LESSON.bildgebung.key && TELEANGIEKTASIE_LESSON.fall.findings.length === 4, 'triad and structured interpretation remain in relevant chapters')
assert.equal(TELEANGIEKTASIE_LESSON.fall.cases[0].sequenceImages.length, 3)
assert.equal(TELEANGIEKTASIE_LESSON.fall.cases[1].sequenceImages.length, 4)
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(TELEANGIEKTASIE_QUESTIONS[lang].length >= 12, `${lang}: MCQ bank present`)
  assert.ok(TELEANGIEKTASIE_QUESTIONS[lang].every(q => q.question && q.options.length === 4 && q.explanation), `${lang}: assessment content complete`)
  assert.ok(TELEANGIEKTASIE_FLASHCARDS.length > 0 && TELEANGIEKTASIE_FLASHCARDS.every(card => card.front[lang] && card.answer[lang] && card.explanation[lang]), `${lang}: flashcard content present`)
  for (const caseItem of TELEANGIEKTASIE_LESSON.fall.cases) {
    assert.ok(caseItem.sequenceImages.every(image => image.alt[lang] && (typeof image.label === 'string' || image.label?.[lang])), `${lang}: every displayed sequence has localized alt and caption`)
  }
}
for (const caseItem of TELEANGIEKTASIE_LESSON.fall.cases) for (const sequence of caseItem.sequenceImages) {
  assert.ok(fs.existsSync(`public${sequence.image}`), `asset exists: ${sequence.image}`)
}
assert.ok(fs.existsSync('public/kapillaere-teleangiektasie/hero.svg'))
console.log('Gehirn capillary telangiectasia pp.33–34 checks PASS: shared hero, default opening section, seven credited/localized source-case sequences, zoom wiring, and DE/EN/FA assessments/cards.')
