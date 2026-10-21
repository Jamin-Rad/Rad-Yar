import assert from 'node:assert/strict'
import fs from 'node:fs'
import { QUESTION_BANK } from '../data/questions.js'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'

const topicId = 'pdac'
const route = '/abdomen/pankreas/pankreaskarzinom'
const questionIds = ['abdomen-pdac-isoattenuating', 'abdomen-pdac-double-duct', 'abdomen-pdac-vessel-contact']
const curriculumTopic = CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen).find(topic => topic.id === topicId)
assert.ok(curriculumTopic, 'existing PDAC curriculum topic exists')
assert.equal(curriculumTopic.link, route)
assert.equal(curriculumTopic.mcqLink, '/ueben/quiz?fach=abdomen&n=3&themen=pdac')
assert.equal(curriculumTopic.flashcardLink, '/flashcards/pdac')
assert.equal(getLessonLinkForFlashcard(curriculumTopic.flashcardLink), route)
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === topicId))
assert.equal(getCardsByTopic(topicId).length, 4)

for (const lang of ['de', 'en', 'fa']) {
  for (const id of questionIds) {
    const question = QUESTION_BANK[lang].find(item => item.id === `${id}-${lang}-01`)
    assert.ok(question, `${id}: registered ${lang} question`)
    assert.ok(question.tags.includes(topicId))
    assert.equal(question.options.length, 4)
    assert.ok(question.options.some(option => option.id === question.correct))
  }
  for (const card of getCardsByTopic(topicId)) assert.ok(card.front[lang] && card.answer[lang] && card.explanation[lang], `${card.id}: complete ${lang} card`)
}

const routeSource = fs.readFileSync(new URL('../app/abdomen/pankreas/pankreaskarzinom/page.js', import.meta.url), 'utf8')
assert.ok(routeSource.includes('LessonReferenceShell'))
assert.ok(routeSource.includes('diagram="pdac"'))
assert.ok(routeSource.includes('source-ct-p36.jpg'))
assert.ok(routeSource.includes('source-mri-p37.jpg'))
const goalsBlock = routeSource.match(/goals=\{\[(.*?)\]\}/s)?.[1] || ''
assert.equal((goalsBlock.match(/L\(/g) || []).length, 4, 'four localized learning goals are present')
assert.ok(!routeSource.includes('alt={caseCopy.text}'), 'CT alt text is distinct from the long caption')
assert.ok(routeSource.includes('SAR/APA reporting consensus'))
assert.ok(!routeSource.includes('ACR Appropriateness Criteria'))
assert.ok(routeSource.includes('Acquisition phases are not labelled in the source.'))
assert.ok(routeSource.includes('Dieses Beispiel steht für lokale Ausbreitung, nicht für das typische frühe Erscheinungsbild.'))
const asset = new URL('../public/educational/pdac/source-ct-p36.jpg', import.meta.url)
assert.ok(fs.statSync(asset).size > 30000, 'source CT visual exists and is non-empty')
const mriAsset = new URL('../public/educational/pdac/source-mri-p37.jpg', import.meta.url)
assert.ok(fs.statSync(mriAsset).size > 30000, 'source MRI visual exists and is non-empty')
const flashcardSource = fs.readFileSync(new URL('../data/pdacFlashcards.js', import.meta.url), 'utf8')
assert.ok(flashcardSource.includes('prästenotische Gangdilatation'))
assert.ok(!flashcardSource.includes('upstream-Dilatation'))
const provenance = fs.readFileSync(new URL('../docs/lesson-quality/media-provenance.md', import.meta.url), 'utf8')
assert.ok(provenance.includes('source-ct-p36.jpg'))
assert.ok(provenance.includes('Abdomen.pdf`, physical page 36'))
assert.ok(provenance.includes('Radiopaedia rID 86457'))
assert.ok(provenance.includes('source-mri-p37.jpg'))
assert.ok(provenance.includes('Abdomen.pdf`, physical page 37'))
console.log('PDAC integration PASS: exact curriculum links, 4 localized goals, 3 localized four-choice MCQs, 4 localized flashcards, source CT/MRI and provenance.')
