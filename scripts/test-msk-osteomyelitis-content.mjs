import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { MSK_OSTEOMYELITIS_LESSON as lesson } from '../data/mskOsteomyelitisLesson.js'

const locales = ['de', 'en', 'fa']
function assertLocalized(value, path = 'lesson') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertLocalized(item, `${path}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (locales.some(locale => Object.hasOwn(value, locale))) {
    for (const locale of locales) {
      assert.ok(typeof value[locale] === 'string' || Array.isArray(value[locale]), `${path}.${locale} must be translated`)
      if (Array.isArray(value[locale])) assert.ok(value[locale].every(item => typeof item === 'string'), `${path}.${locale} must contain translated strings`)
    }
    return
  }
  for (const [key, child] of Object.entries(value)) assertLocalized(child, `${path}.${key}`)
}

assert.equal(lesson.id, 'osteomyelitis')
assert.equal(lesson.chapters.length, 3)
assertLocalized(lesson)
assert.equal(lesson.case.answerIndex, 0)
assert.equal(lesson.case.options.length, 2)
assert.match(lesson.case.feedbackCorrect.de, /gedruckte S\. 72/)
assert.match(lesson.case.feedbackIncorrect.en, /not tumour-specific/)
assert.match(lesson.chapters[1].lead.fa, /بیدخورده/)
assert.match(lesson.chapters[1].rows[0][1].de, /gedruckte S\. 77/)
assert.match(lesson.intro.text.en, /central avascular area with reactive sclerosis/)
assert.match(lesson.notice.en, /physical PDF page 72 is only an “Infection” divider/)
assert.match(lesson.notice.en, /no infection teaching case could be independently identified and verified/)
assert.match(lesson.notice.en, /does not cover septic arthritis/)

const route = await readFile(new URL('../app/msk/infektionen/osteomyelitis/page.jsx', import.meta.url), 'utf8')
assert.match(route, /StandardLessonShell/)
assert.match(route, /syncHashNavigation/)
assert.match(route, /MSK_OSTEOMYELITIS_LESSON/)
const curriculum = await readFile(new URL('../data/curriculum.js', import.meta.url), 'utf8')
assert.match(curriculum, /id: 'osteomyelitis'[^\n]*link: '\/msk\/infektionen\/osteomyelitis'[^\n]*ready: true, inProgress: true/)
const septicEntry = curriculum.match(/\{ id: 'septische-arthritis'[^\n]*\}/)?.[0]
assert.ok(septicEntry, 'septic arthritis curriculum entry remains present')
assert.ok(!septicEntry.includes('link:'), 'septic arthritis remains unlinked because audited pages provide no teaching source')
await readFile(new URL('../public/educational/msk-osteomyelitis/bone-focus.svg', import.meta.url), 'utf8')

console.log('MSK osteomyelitis route/data/content checks passed. This is a focused content/source check, not browser or clinical sign-off.')
