import test from 'node:test'
import assert from 'node:assert/strict'
import { CONTRAST_QUESTIONS, CONTRAST_GROUPS } from '../data/contrastMedia.js'
import { CONTRAST_LESSONS } from '../data/contrastLessons.js'
import { BOOK_QUESTION_MAPPINGS, questionIdsForSection } from '../components/book-view/pilots.js'
import { mappedQuestions } from '../components/book-view/pagination.mjs'

test('contrast checkpoints use existing, localized questions and real section mappings', () => {
  for (const lang of ['de', 'en', 'fa']) {
    const seen = new Set()
    for (const group of CONTRAST_GROUPS) {
      const id = group.id === 'ultraschall' ? `ref-${group.readId}` : group.readId
      const sections = CONTRAST_LESSONS[group.id].sections.map(section => section.id)
      for (const section of Object.keys(BOOK_QUESTION_MAPPINGS[id])) {
        assert.ok(sections.includes(section), `${id}/${section} exists`)
        const ids = questionIdsForSection(id, section, lang)
        const mapped = mappedQuestions(CONTRAST_QUESTIONS[lang], ids)
        assert.equal(mapped.length, ids.length)
        assert.ok(mapped.length >= 1 && mapped.length <= 3)
        for (const question of mapped) {
          assert.equal(question, CONTRAST_QUESTIONS[lang].find(source => source.id === question.id))
          assert.ok(question.tags.some(tag => group.topicIds.includes(tag)))
          assert.ok(!seen.has(question.id), `${question.id} repeated`)
          seen.add(question.id)
        }
      }
    }
  }
})
