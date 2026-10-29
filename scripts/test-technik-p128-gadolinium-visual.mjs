import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { CONTRAST_TOPICS, CONTRAST_QUESTIONS, CONTRAST_FLASHCARDS, CONTRAST_GROUPS } from '../data/contrastMedia.js'
import { CONTRAST_LESSONS } from '../data/contrastLessons.js'
import { CURRICULUM } from '../data/curriculum.js'

const sourceImage = 'public/kontrastmittel/technik-p128-gadolinium-retention.png'
assert.ok(existsSync(sourceImage), 'the source-page crop exists')

const group = CONTRAST_GROUPS.find(item => item.id === 'mrt')
assert.ok(group, 'MRI contrast lesson group exists')
assert.ok(group.topicIds.includes('km-gadolinium-retention-nsf'), 'the visual sits in the existing assessed MRI topic')
assert.ok(CONTRAST_TOPICS.some(item => item.id === 'km-gadolinium-retention-nsf'), 'the source topic remains registered')

const section = CONTRAST_LESSONS.mrt.sections.find(item => item.id === 'retention')
const gallery = section?.blocks.find(item => item.type === 'imageGallery')
assert.equal(gallery?.images.length, 1, 'the source triptych is presented once as a coherent comparison')
const image = gallery.images[0]
assert.equal(image.src, '/kontrastmittel/technik-p128-gadolinium-retention.png')
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(image.alt[lang], `${lang}: accessible image description exists`)
  assert.match(image.caption[lang], /rID 40640/)
  assert.match(image.caption[lang], /128|۱۲۸/)
  assert.match(image.caption[lang], /klinisch|clinical|بالینی/)
  const questions = CONTRAST_QUESTIONS[lang].filter(item => item.tags.includes('km-gadolinium-retention-nsf'))
  assert.equal(questions.length, 3, `${lang}: the visual item augments the two existing registered retrieval questions`)
  assert.ok(questions.every(item => item.question && item.explanation && item.options.length === 4), `${lang}: retrieval content is localized`)
}
const cards = CONTRAST_FLASHCARDS.filter(item => item.topicId === 'km-gadolinium-retention-nsf')
assert.equal(cards.length, 3, 'the retention topic has two existing flashcards plus the visual retrieval card')
assert.ok(cards.every(item => ['de', 'en', 'fa'].every(lang => item.front[lang] && item.answer[lang] && item.explanation[lang])), 'all linked flashcards have three-language content')

const curriculum = CURRICULUM.find(item => item.id === 'technik')
const chapter = curriculum?.kapitel.find(item => item.id === 'technik-kontrastmittel')
assert.ok(chapter?.themen.some(item => item.id === group.readId && item.link === '/technik/kontrastmittel/mrt'), 'the source-mapped MRI contrast route is linked in curriculum')

console.log('Technik p.128 Gadolinium visual audit PASS: source crop, interpretation caveat, attribution, DE/EN/FA alt/captions, curriculum route, MCQ and flashcard retrieval verified.')
