import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { MEDULLO_COPY, MEDULLO_CHAPTERS, MEDULLO_CHECK, MEDULLO_QUESTIONS, MEDULLO_FLASHCARDS, MEDULLO_FLASHCARD_TOPIC, MEDULLO_PATH } from '../data/medulloblastomLesson.js'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS, getQuestionsForIds, countQuestions } from '../data/questions.js'
import { FLASHCARDS, getFlashcardTopic } from '../data/flashcards.js'
import { getLessonStatus } from '../data/lessonStatus.js'

const require = createRequire(import.meta.url)
const langs = ['de', 'en', 'fa']
let semanticUnits = 0
function walk(value) {
  if (Array.isArray(value)) return value.forEach(walk)
  if (!value || typeof value !== 'object') return
  if ('de' in value || 'en' in value || 'fa' in value) {
    langs.forEach(lang => assert.ok(typeof value[lang] === 'string' && value[lang].trim(), `Missing ${lang} text`))
    semanticUnits++
  } else Object.values(value).forEach(walk)
}
[MEDULLO_COPY, MEDULLO_CHAPTERS, MEDULLO_CHECK, MEDULLO_FLASHCARDS].forEach(walk)
const topics = CURRICULUM.flatMap(fach => fach.kapitel.flatMap(chapter => chapter.themen))
const topic = topics.find(item => item.id === 'medulloblastom')
assert.equal(topic.link, MEDULLO_PATH)
assert.equal(topic.inProgress, true)
assert.equal(getLessonStatus(MEDULLO_PATH), 'in_progress')
assert.equal(getLessonLinkForFlashcard('/flashcards/medulloblastom'), MEDULLO_PATH)
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.fachId === 'gehirn' && group.topics.some(item => item.id === 'medulloblastom')))
const tumorGroups = MCQ_TOPIC_GROUPS.filter(group => group.fachId === 'gehirn' && group.kapitelId === 'kopf-tumoren')
assert.equal(tumorGroups.length, 1, 'one setup group for brain tumour chapter')
assert.ok(tumorGroups[0].topics.some(topic => topic.id === 'medulloblastom'))
assert.equal(countQuestions(['medulloblastom']), 2)
const deIds = MEDULLO_QUESTIONS.de.map(q => q.id)
for (const lang of langs) {
  const actual = QUESTION_BANK[lang].filter(q => q.tags.includes('medulloblastom'))
  assert.equal(actual.length, 2)
  assert.deepEqual(getQuestionsForIds(deIds, lang).map(q => q.id), actual.map(q => q.id))
  actual.forEach(question => {
    assert.equal(question.options.length, 4)
    assert.ok(question.options.some(option => option.id === question.correct))
    assert.deepEqual(Object.keys(question.wrongExplanations).sort(), question.options.map(option => option.id).filter(id => id !== question.correct).sort())
    assert.ok(question.source)
  })
}
assert.equal(FLASHCARDS.filter(card => card.topicId === 'medulloblastom').length, 2)
assert.ok(getFlashcardTopic('medulloblastom'))
assert.equal(MEDULLO_CHECK.correct, 1)
assert.equal(MEDULLO_CHECK.feedback.length, MEDULLO_CHECK.options.length)
const jsx = await readFile('app/gehirn/tumoren/medulloblastom/page.js', 'utf8')
require('esbuild').transformSync(jsx, { loader: 'jsx', format: 'esm' })
const provenance = JSON.parse(await readFile('public/educational/medulloblastom/image-provenance.json', 'utf8'))
assert.equal(provenance.lessonId, 'medulloblastom')
assert.ok((await readFile('public/educational/medulloblastom/hero.svg', 'utf8')).includes('<svg'))
for (const lang of langs) {
  const localized = MEDULLO_PATH + (lang === 'de' ? '' : `?lang=${lang}`)
  const quiz = new URL(`https://example.invalid${topic.mcqLink}&from=${encodeURIComponent(localized)}${lang === 'de' ? '' : `&lang=${lang}`}`)
  assert.equal(quiz.searchParams.get('themen'), 'medulloblastom')
  assert.equal(quiz.searchParams.get('from'), localized)
  assert.equal(quiz.searchParams.get('lang') || 'de', lang)
}
console.log(`MEDULLO scoped checks passed: ${semanticUnits} localized semantic units present; exact curriculum/status, 6 MCQs with option feedback, 2 cards, language-ID mapping, assets and JSX syntax. Browser/clinical equivalence not established by this check.`)

assert.ok(jsx.includes('https://radiopaedia.org/cases/10997'))
assert.equal(provenance.caseId, 'rID10997')
assert.equal(provenance.contributor, null)

const png = await readFile('public/educational/medulloblastom/source-mri.png')
assert.equal(png.readUInt32BE(16),1340)
assert.equal(png.readUInt32BE(20),550)
assert.deepEqual(provenance.panels,{left:'sagittal T1',middle:'axial FLAIR',right:'axial T1 C+'})

// Persian MRI diffusion must stay distinct from tumour dissemination.
const localizedArtifacts = [MEDULLO_COPY, MEDULLO_CHAPTERS, MEDULLO_CHECK, MEDULLO_QUESTIONS, MEDULLO_FLASHCARDS, MEDULLO_FLASHCARD_TOPIC]
assert.ok(!JSON.stringify(localizedArtifacts).includes('انتشار مولکولی'), 'Ambiguous Persian molecular-diffusion wording')
assert.match(MEDULLO_COPY.title.fa, /تصویربرداری انتشار/)
assert.match(MEDULLO_COPY.basics.fa, /تصویربرداری انتشار/)
assert.match(MEDULLO_COPY.patternIntro.fa, /توالی‌های انتشار/)
assert.match(MEDULLO_COPY.patternRows[3][1].fa, /محدودیت انتشار/)
assert.match(MEDULLO_FLASHCARD_TOPIC.description.fa, /تصویربرداری انتشار/)
assert.match(MEDULLO_FLASHCARDS[0].explanation.fa, /توالی/)
assert.match(MEDULLO_COPY.extentIntro.fa, /گسترش/)
assert.match(MEDULLO_COPY.summary[2].fa, /گسترش لپتومننژیال/)
for (const lang of langs) assert.match(MEDULLO_COPY.figureCaption[lang], /DWI\/ADC/)
assert.match(MEDULLO_COPY.figureCaption.de, /Wirbelsäulenbilder fehlen/)
assert.match(MEDULLO_COPY.figureCaption.en, /spine images are absent/)
assert.match(MEDULLO_COPY.figureCaption.fa, /تصاویر ستون فقرات وجود ندارند/)
console.log('Persian MRI diffusion terminology and explicit missing DWI/ADC/spine limits passed.')
