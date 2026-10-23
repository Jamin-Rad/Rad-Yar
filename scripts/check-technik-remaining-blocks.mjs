import assert from 'node:assert/strict'
import fs from 'node:fs'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { GRID_BLOCK, C_ARM_CT_BLOCK, REMAINING_BLOCK_TOPICS, REMAINING_BLOCK_QUESTIONS, REMAINING_BLOCK_FLASHCARDS } from '../data/technikRemainingBlocks.js'

for (const [anchor, block] of [['optimierung', GRID_BLOCK], ['fluoro', C_ARM_CT_BLOCK]]) {
  assert(TECHNIK_GRUNDLAGEN.sections.find(s => s.id === anchor)?.teachingBlocks.includes(block), `Rendered section must include ${block.id}`)
  assert(fs.existsSync(`public${block.visual.src}`))
  for (const lang of ['de', 'en', 'fa']) {
    for (const field of [block.title, block.lead, block.visual.alt, block.visual.caption, ...block.rows.flat()]) assert(field[lang]?.length > 3)
    const q = REMAINING_BLOCK_QUESTIONS.find(q => q.id === `${block.id}-${lang}-01`)
    assert(q && q.tags.includes(block.id))
    assert.equal(q.options.length, 4)
    assert.deepEqual(q.options.map(o => o.id), ['A', 'B', 'C', 'D'])
    assert(q.options.find(o => o.id === q.correct))
    for (const o of q.options.filter(o => o.id !== q.correct)) assert(q.wrongExplanations[o.id]?.length > 20)
  }
  const card = REMAINING_BLOCK_FLASHCARDS.find(c => c.topicId === block.id)
  for (const lang of ['de', 'en', 'fa']) assert(card.front[lang] && card.answer[lang])
}
assert.equal(REMAINING_BLOCK_TOPICS.length, 2)
assert(!/[\u0600-\u06ff]/u.test(TECHNIK_GRUNDLAGEN.sections.find(s => s.id === 'ct').rows[0][1].de), 'CT DE content must not contain Persian')
assert.match(C_ARM_CT_BLOCK.rows[3][1].en, /blood, contrast accumulation or both/)
assert.match(GRID_BLOCK.rows[2][1].en, /also removes primary radiation/)
console.log('PASS: Technik grid/C-arm source-block and assessment contracts; browser and scientific approval are separate.')
