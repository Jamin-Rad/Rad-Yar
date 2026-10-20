import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { FRAKTUR_KINDER_LESSON as lesson, FRAKTUR_KINDER_QUESTIONS as questions, FRAKTUR_KINDER_FLASHCARDS as cards } from '../data/frakturen-kindesalter.js'

const locales = ['de', 'en', 'fa']
const localized = value => locales.every(locale => typeof value?.[locale] === 'string' && value[locale].trim())
for (const [section, key] of [['Salter-Harris', 'salterHarris'], ['shaft patterns', 'schaft'], ['toddler fracture', 'toddler'], ['transition fractures', 'uebergang']]) {
  assert.ok(lesson[key], `missing ${section} section`)
}
for (const locale of locales) {
  assert.ok(questions[locale].some(q => q.id === `fk-two-plane-1-${locale}`), `missing localized two-plane question: ${locale}`)
  const q = questions[locale].find(q => q.id === `fk-two-plane-1-${locale}`)
  assert.ok(q.question && q.explanation && q.options.length === 4, `incomplete two-plane assessment: ${locale}`)
  assert.ok(cards.some(card => card.id === 'fk-fc-two-plane'), 'missing two-plane flashcard')
  const toddler = lesson.toddler
  assert.ok(localized(toddler.lead), `toddler lead missing locale ${locale}`)
  assert.ok(localized(toddler.items[2].text), `toddler imaging text missing locale ${locale}`)
  assert.match(lesson.salterHarris.rows[4][3][locale], /narrow|verschmäler|باریک/)
  assert.match(lesson.uebergang.twoPlane.text[locale], /posterior|posteriore|خلفی/)
  for (const schema of [lesson.salterHarris.schema, lesson.schaft.schema, lesson.uebergang.triplane.schema]) {
    assert.ok(schema.note?.[locale]?.trim(), `missing localized schema equivalent in ${locale}`)
  }
  assert.ok(lesson.sources.items.every(source => source.label[locale]), `missing learner-facing sources in ${locale}`)
}
const correctAssessmentText = JSON.stringify({ lesson, cards, questions: Object.fromEntries(Object.entries(questions).map(([locale, list]) => [locale, list.map(q => ({ explanation: q.explanation, correct: q.options.find(o => o.id === q.correct)?.text }))])) })
for (const obsolete of [/75\s*%/, /after 72 hours/i, /nach 72 h/i, /۷۲ ساعت/, /soft splint or short cast/i, /weiche Schiene oder kurzfristiger Gips/i, /Lurie et al\./i, /JBJS 2020/i]) {
  assert.doesNotMatch(correctAssessmentText, obsolete, `outdated claim remains: ${obsolete}`)
}
const route = await readFile(new URL('../app/msk/trauma/frakturen-kindesalter/page.js', import.meta.url), 'utf8')
assert.match(route, /D\.uebergang\.twoPlane\.title/)
assert.match(route, /D\.uebergang\.twoPlane\.text/)
assert.match(route, /D\.sources\.items\.map/)
assert.match(route, /D\.salterHarris\.schema\.note/)
assert.match(route, /D\.schaft\.schema\.note/)
assert.match(route, /D\.uebergang\.triplane\.schema\.note/)
for (const href of ['tibial_shaft_emergency', 'ankle_emergency', 'BSCOS%20modifiable%20fracture%20templates.pdf']) {
  assert.ok(lesson.sources.items.some(source => source.href.includes(href)), `missing learner-facing source ${href}`)
}
assert.doesNotMatch(JSON.stringify(lesson.schaft.wulstCase.images), /wulst-lateral/)
assert.match(lesson.toddler.images[0].caption.de, /können anfangs radiologisch subtil oder okkult sein/)
assert.doesNotMatch(lesson.toddler.images[0].caption.de, /Pfeil|arrow/i)
assert.match(questions.de.find(q => q.id.startsWith('fk-sh-2-')).explanation, /meist günstig/)
assert.match(cards.find(card => card.id === 'fk-fc-sh2').answer.en, /generally favourable/)
assert.match(cards.find(card => card.id === 'fk-fc-sh5').answer.en, /may be subtle initially/)
assert.doesNotMatch(lesson.schaft.lead.en, /do not occur in adults/i)
assert.match(lesson.schaft.lead.en, /far more common in children than in adults/i)
for (const prefix of ['/frakturen-kindesalter/', '/public/frakturen-kindesalter/']) {
  const images = [...route.matchAll(/src:\s*['"]([^'"]+\.(?:png|jpe?g|webp))['"]/gi)].map(match => match[1])
  for (const src of images) {
    const file = src.startsWith('/public/') ? `.${src.replace('/public', '')}` : `public${src}`
    assert.ok(existsSync(file), `missing lesson image asset ${src}`)
  }
}
const ledger = await readFile(new URL('../docs/lesson-quality/frakturen-kindesalter-msk-p5-p9-coverage.md', import.meta.url), 'utf8')
assert.match(ledger, /MSK\.pdf p\.5/)
assert.match(ledger, /p\.9/)
assert.match(ledger, /license|licensing/i)
console.log('Pediatric fracture source coverage and localization checks passed (DE/EN/FA).')
