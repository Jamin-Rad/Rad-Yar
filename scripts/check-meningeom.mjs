import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { MENING_COPY, MENING_CHAPTERS, MENING_CHECK, MENING_QUESTIONS, MENING_FLASHCARDS, MENING_PATH } from '../data/gehirnMeningeomLesson.js'
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
[MENING_COPY, MENING_CHAPTERS, MENING_CHECK, MENING_FLASHCARDS].forEach(walk)
const topics = CURRICULUM.flatMap(fach => fach.kapitel.flatMap(chapter => chapter.themen))
const topic = topics.find(item => item.id === 'meningeom')
assert.equal(topic.link, MENING_PATH)
assert.equal(topic.inProgress, true)
assert.equal(getLessonStatus(MENING_PATH), 'in_progress')
assert.equal(getLessonLinkForFlashcard('/flashcards/meningeom'), MENING_PATH)
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.fachId === 'gehirn' && group.topics.some(item => item.id === 'meningeom')))
const tumorGroups = MCQ_TOPIC_GROUPS.filter(group => group.fachId === 'gehirn' && group.kapitelId === 'kopf-tumoren')
assert.equal(tumorGroups.length, 1, 'one setup group for brain tumour chapter')
assert.ok(tumorGroups[0].topics.some(topic => topic.id === 'meningeom'))
assert.equal(countQuestions(['meningeom']), 2)
const deIds = MENING_QUESTIONS.de.map(q => q.id)
for (const lang of langs) {
  const actual = QUESTION_BANK[lang].filter(q => q.tags.includes('meningeom'))
  assert.equal(actual.length, 2)
  assert.deepEqual(getQuestionsForIds(deIds, lang).map(q => q.id), actual.map(q => q.id))
  actual.forEach(question => {
    assert.equal(question.options.length, 4)
    assert.ok(question.options.some(option => option.id === question.correct))
    assert.deepEqual(Object.keys(question.wrongExplanations).sort(), question.options.map(option => option.id).filter(id => id !== question.correct).sort())
    assert.ok(question.source)
  })
}
assert.equal(FLASHCARDS.filter(card => card.topicId === 'meningeom').length, 2)
assert.ok(getFlashcardTopic('meningeom'))
assert.equal(MENING_CHECK.correct, 0)
assert.equal(MENING_CHECK.feedback.length, MENING_CHECK.options.length)
const jsx = await readFile('app/gehirn/tumoren/meningeom/page.jsx', 'utf8')
require('esbuild').transformSync(jsx, { loader: 'jsx', format: 'esm' })
const provenance = JSON.parse(await readFile('public/educational/meningeom/image-provenance.json', 'utf8'))
assert.equal(provenance.lessonId, 'meningeom')
assert.ok((await readFile('public/educational/meningeom/hero.svg', 'utf8')).includes('<svg'))
for (const lang of langs) {
  const localized = MENING_PATH + (lang === 'de' ? '' : `?lang=${lang}`)
  const quiz = new URL(`https://example.invalid${topic.mcqLink}&from=${encodeURIComponent(localized)}${lang === 'de' ? '' : `&lang=${lang}`}`)
  assert.equal(quiz.searchParams.get('themen'), 'meningeom')
  assert.equal(quiz.searchParams.get('from'), localized)
  assert.equal(quiz.searchParams.get('lang') || 'de', lang)
}
console.log(`MENING scoped checks passed: ${semanticUnits} localized semantic units present; exact curriculum/status, 6 MCQs with option feedback, 2 cards, language-ID mapping, assets and JSX syntax. Browser/clinical equivalence not established by this check.`)

assert.equal(provenance.patientImage,false)
assert.match(MENING_COPY.limitsIntro.en,/neither invasion nor its absence/)
assert.match(MENING_COPY.diffusion.en,/ADC values overlapped between grade 1 and grade 2/)
assert.match(MENING_COPY.diffusion.de,/ADC-Werte der Grade 1 und 2/)
assert.match(MENING_COPY.diffusion.fa,/درجه ۱ و ۲ هم‌پوشانی/)
assert.doesNotMatch(JSON.stringify([MENING_COPY,MENING_QUESTIONS]),/overlap across grades|overlaps across grades|verschiedener Grade|میان درجات هم‌پوشانی/)
assert.match(MENING_COPY.scope.en,/Independent recognition.*neither trained nor tested/)
assert.match(MENING_COPY.scope.de,/selbstständige Erkennen.*weder trainiert noch geprüft/)
assert.match(MENING_COPY.scope.fa,/تشخیص مستقل.*نه تمرین و نه ارزیابی/)
assert.match(jsx,/c\(COPY.scope\)/, 'The narrowed goal must be visible to learners')
assert.match(MENING_CHECK.question.en,/A report describes/)
for (const question of MENING_QUESTIONS.en) assert.match(question.question,/A report describes/)
assert.match(MENING_COPY.mediaLimit.en,/contain no patient images/)
assert.ok(MENING_COPY.caseCaption.en.includes('rID 50810'))
assert.ok(MENING_COPY.caseNote.en.includes('study 56299'))
assert.ok(jsx.includes('/educational/meningeom/case-50810/t1c-sagittal.jpg'))
assert.ok(jsx.includes('/educational/meningeom/case-50810/t1c-coronal.jpg'))
assert.match(MENING_COPY.mediaLimit.en,/One labelled real MRI case/)
const caseProvenance = JSON.parse(await readFile('public/educational/meningeom/image-provenance.json','utf8')).caseImages
assert.equal(caseProvenance.caseId,50810)
assert.equal(caseProvenance.studyId,56299)
assert.deepEqual(caseProvenance.frames.map(frame=>frame.imageId),[28020528,28020530])
for (const frame of caseProvenance.frames) await readFile(`public/educational/meningeom/${frame.file}`)
