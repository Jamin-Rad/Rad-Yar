import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { CURRICULUM } from '../data/curriculum.js'
import { SPINE_INFECTION_LESSON } from '../data/spineInfection.js'
import { MSK_SPINE_LESSON_QUESTION_DRAFTS, MSK_SPINE_LESSON_FLASHCARD_DRAFTS } from '../data/mskSpineLessonAssessmentDrafts.js'

const langs = ['de', 'en', 'fa']
const verifyTranslations = (value, path = 'lesson') => {
  if (Array.isArray(value)) return value.forEach((item, i) => verifyTranslations(item, `${path}[${i}]`))
  if (!value || typeof value !== 'object') return
  if (langs.some(lang => Object.hasOwn(value, lang))) {
    for (const lang of langs) assert.ok(typeof value[lang] === 'string' && value[lang].trim(), `${path} missing ${lang}`)
    return
  }
  for (const [key, item] of Object.entries(value)) verifyTranslations(item, `${path}.${key}`)
}

verifyTranslations(SPINE_INFECTION_LESSON)
assert.equal(SPINE_INFECTION_LESSON.id, 'spondylodiszitis')
assert.match(SPINE_INFECTION_LESSON.source, /Wirbelsäule\.pdf, PDF S\. 14–15/)
assert.deepEqual(SPINE_INFECTION_LESSON.chapters.map(({ id }) => id), ['pattern', 'tuberculosis', 'differentiate'])
assert.equal(SPINE_INFECTION_LESSON.takeHome.length, 4)
assert.match(SPINE_INFECTION_LESSON.references.find(({ url }) => url.includes('acsearch'))?.label.de || '', /2021/)
assert.match(SPINE_INFECTION_LESSON.chapters[0].note.en, /Supplement to the PDF/)
assert.match(SPINE_INFECTION_LESSON.chapters[0].rows.find(([label]) => label.de === 'DWI bei Abszess')?.[1].fa || '', /محدودیت انتشار/)
assert.match(SPINE_INFECTION_LESSON.chapters[1].rows[2][1].en, /group-level feature/)
assert.match(SPINE_INFECTION_LESSON.chapters[2].note.en, /small and retrospective/)
assert.doesNotMatch(JSON.stringify(SPINE_INFECTION_LESSON), /pathognomonic|always proves|until proven otherwise/i)

const spine = CURRICULUM.find(({ id }) => id === 'wirbelsaeule')
const topic = spine?.kapitel.flatMap(({ kapitel, themen }) => [...(kapitel || []).flatMap(item => item.themen || []), ...(themen || [])]).find(({ id }) => id === 'spondylodiszitis')
assert.ok(topic, 'exact spondylodiszitis curriculum ID must exist')
assert.equal(topic.link, '/wirbelsaeule/infektion', 'the existing exact route link must be preserved')
assert.equal(topic.mcqLink, undefined, 'global MCQ integration remains pending')
assert.equal(topic.flashcardLink, undefined, 'global flashcard integration remains pending')

const question = MSK_SPINE_LESSON_QUESTION_DRAFTS.filter(({ tags }) => tags.includes('spondylodiszitis'))
const cards = MSK_SPINE_LESSON_FLASHCARD_DRAFTS.filter(({ topicId }) => topicId === 'spondylodiszitis')
assert.ok(question.some(({ id }) => id === 'spondylodiszitis-tb-pattern-01'))
assert.ok(question.some(({ id }) => id === 'spondylodiszitis-modic-claw-02'))
assert.ok(cards.some(({ id }) => id === 'spondylodiszitis-tb-clues'))
assert.ok(cards.some(({ id }) => id === 'spondylodiszitis-modic-claw'))
verifyTranslations(question, 'question')
verifyTranslations(cards, 'flashcard')
for (const item of question) {
  assert.equal(item.options.length, 3, `${item.id} needs three options`)
  assert.ok(item.options.some((_, index) => 'ABC'[index] === item.correct), `${item.id} has invalid answer key`)
  assert.ok(item.explanation)
}

const route = await readFile('app/wirbelsaeule/infektion/page.js', 'utf8')
const component = await readFile('app/wirbelsaeule/degenerative/Lesson.jsx', 'utf8')
const svg = await readFile('public/educational/spine-infection-schematic.svg', 'utf8')
const ledger = await readFile('docs/lesson-quality/spine-infection-14-15.md', 'utf8')
assert.match(route, /SPINE_INFECTION_LESSON/)
assert.match(route, /Vier Regeln merken/)
assert.match(route, /ACR · Pädiatrie/)
assert.match(route, /ACR · کودکان/)
assert.match(component, /visualCaption=/)
assert.match(svg, /^\s*<svg\b/)
assert.match(svg, /<\/svg>\s*$/)
assert.match(ledger, /WS S\. 14–15|Wirbelsäule\.pdf.*14–15/)
assert.match(ledger, /noch nicht in globale Question-\/Flashcard-Bänke verdrahtet/)

console.log('Spine infection pp. 14–15 checks passed: source scope, DE/EN/FA parity, ACR supplement, cautious pattern language, exact curriculum ID status, assessments, route, visual and ledger.')
