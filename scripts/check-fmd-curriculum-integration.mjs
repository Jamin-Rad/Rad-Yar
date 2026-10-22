import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { CURRICULUM } from '../data/curriculum.js'
import { FMD_QUESTIONS, FMD_FLASHCARDS, FMD_FLASHCARD_TOPIC } from '../data/fmdAssessments.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards.js'

const langs = ['de', 'en', 'fa']
const node = CURRICULUM.flatMap(subject => subject.kapitel.flatMap(chapter => chapter.themen || [])).find(topic => topic.id === 'fibromuskulaere-dysplasie')
assert.ok(node, 'FMD curriculum node exists')
assert.equal(node.link, '/abdomen/gefaesse/fmd')
assert.equal(node.mcqLink, '/ueben/quiz?fach=abdomen&n=3&themen=fibromuskulaere-dysplasie')
assert.equal(node.flashcardLink, '/flashcards/fibromuskulaere-dysplasie')
assert.equal(node.inProgress, true)

for (const lang of langs) {
  assert.equal(FMD_QUESTIONS[lang].length, 3)
  assert.equal(QUESTION_BANK[lang].filter(question => question.tags?.includes('fibromuskulaere-dysplasie')).length, 3)
  for (const question of FMD_QUESTIONS[lang]) {
    assert.equal(question.options.length, 4)
    assert.ok(question.explanation)
  }
}

assert.ok(MCQ_TOPIC_GROUPS.some(group => group.fachId === 'abdomen' && group.topics?.some(topic => topic.id === 'fibromuskulaere-dysplasie')))
assert.equal(FMD_FLASHCARD_TOPIC.id, 'fibromuskulaere-dysplasie')
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === FMD_FLASHCARD_TOPIC.id && topic.href === FMD_FLASHCARD_TOPIC.href))
assert.equal(FMD_FLASHCARDS.length, 3)
assert.equal(FLASHCARDS.filter(card => card.topicId === 'fibromuskulaere-dysplasie').length, 3)

const route = await readFile('app/abdomen/gefaesse/fmd/page.js', 'utf8')
const ledger = await readFile('docs/lesson-quality/abdomen-thorax-supplemental-evidence-ledger.md', 'utf8')
const shell = await readFile('components/LessonReferenceShell.jsx', 'utf8')
const provenance = JSON.parse(await readFile('public/abdomen/fmd/source-provenance.json', 'utf8'))
const image = await readFile('public/abdomen/fmd/renal-cta-source.png')
assert.match(route, /lessonId="abdomen-fmd"/)
assert.match(route, /quizHref="\/ueben\/quiz\?fach=abdomen&n=3&themen=fibromuskulaere-dysplasie"/)
assert.match(route, /flashcardsHref="\/flashcards\/fibromuskulaere-dysplasie"/)
assert.match(route, /Von der Gefäßform zur Bildgebung/)
assert.match(route, /rID 31157/)
assert.match(shell, /lessonCopy\?\.labels\?\.\[lang\]/)
assert.match(ledger, /Abdomen\.pdf p\. 92/)
assert.match(ledger, /three DE\/EN\/FA MCQs and three flashcards/)
assert.equal(provenance.physicalPdfPage, 92)
assert.equal(provenance.printedPage, 91)
assert.ok(provenance.rights.includes('User explicitly authorized'))
assert.ok(image.length > 10000)

console.log('FMD integration checks passed: exact curriculum route, 3 localized MCQs, 3 flashcards, source CTA crop/provenance, lesson-specific shell labels and p.92 evidence ledger.')
