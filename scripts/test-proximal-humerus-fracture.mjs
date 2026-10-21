import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { PROXIMAL_HUMERUS_ID, PROXIMAL_HUMERUS_LESSON } from '../data/proximalHumerusLesson.js'
import { CURRICULUM } from '../data/curriculum.js'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARD_TOPICS, FLASHCARDS } from '../data/flashcards.js'

const langs = ['de', 'en', 'fa']
function findTopic(nodes, id) {
  for (const node of nodes || []) {
    if (node?.id === id) return node
    const found = findTopic(node?.kapitel, id) || findTopic(node?.themen, id) || findTopic(node?.sub, id)
    if (found) return found
  }
  return null
}

assert.equal(PROXIMAL_HUMERUS_LESSON.id, PROXIMAL_HUMERUS_ID)
assert.equal(PROXIMAL_HUMERUS_LESSON.segments.length, 4)
assert.match(PROXIMAL_HUMERUS_LESSON.displacement.de, /mehr als 1 cm.*mehr als 45°/)
assert.match(PROXIMAL_HUMERUS_LESSON.scope.de, /nur Themenüberschrift/)
assert.match(PROXIMAL_HUMERUS_LESSON.scope.en, /topic heading.*only/)
assert.match(PROXIMAL_HUMERUS_LESSON.scope.fa, /فقط عنوان/)
assert.deepEqual(PROXIMAL_HUMERUS_LESSON.sections.map(({ id }) => id), ['segmente', 'beschreibung'])

const curriculumTopic = findTopic(CURRICULUM, PROXIMAL_HUMERUS_ID)
assert.ok(curriculumTopic, 'exact curriculum topic should exist')
assert.equal(curriculumTopic.link, PROXIMAL_HUMERUS_LESSON.path)
assert.ok(curriculumTopic.mcqLink?.includes(PROXIMAL_HUMERUS_ID))
assert.ok(curriculumTopic.flashcardLink?.includes(PROXIMAL_HUMERUS_ID))

for (const lang of langs) {
  const qs = QUESTION_BANK[lang].filter(q => q.tags?.includes(PROXIMAL_HUMERUS_ID))
  assert.equal(qs.length, 2, `${lang} should have two linked MCQs`)
  assert.ok(qs.every(q => q.options.length === 4 && q.explanation && q.wrongExplanations))
  assert.ok(qs.every(q => q.source?.includes('MSK.pdf p.14 title only')))
}

assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === PROXIMAL_HUMERUS_ID))
assert.equal(FLASHCARDS.filter(card => card.topicId === PROXIMAL_HUMERUS_ID).length, 2)

const route = await readFile(new URL('../app/msk/trauma/proximale-humerusfraktur/page.jsx', import.meta.url), 'utf8')
const svg = await readFile(new URL('../public/educational/proximal-humerus/segments.svg', import.meta.url), 'utf8')
assert.match(route, /StandardLessonShell/)
assert.match(route, /setChecked\(true\)/)
assert.match(route, /checked && answer !== null/)
assert.match(route, /setChecked\(false\)/)
assert.match(route, /checkAnswer/)
assert.match(route, /A–D/)
assert.match(route, /heroImageAlt/)
assert.match(svg, /orientation schematic/i)
assert.match(svg, />A<.*>B<.*>C<.*>D</s)
assert.doesNotMatch(route, /treatment|Therapieempfehlung/i)

console.log('Proximal humerus lesson checks passed: exact curriculum link, 4 segments, DE/EN/FA scope, linked assessments and code-native schematic.')
