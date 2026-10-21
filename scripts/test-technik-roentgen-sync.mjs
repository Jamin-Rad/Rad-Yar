import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARD_TOPICS, FLASHCARDS } from '../data/flashcards.js'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'

const topics = ['roentgenanlage-roehre', 'roentgenstrahlung-spektrum', 'roentgen-wechselwirkung-materie', 'roentgen-bildentstehung-detektor']
for (const lang of ['de', 'en', 'fa']) {
  for (const topic of topics) {
    const questions = QUESTION_BANK[lang].filter(question => question.tags.includes(topic))
    assert.equal(questions.length, 1, `${lang}: ${topic} must have exactly one linked MCQ`)
    assert.equal(questions[0].options.length, 4)
    assert.ok(questions[0].options.some(option => option.id === questions[0].correct))
  }
}
const cards = FLASHCARDS.filter(card => card.topicId === 'roentgenanlage-roehre')
assert.equal(cards.length, 4, 'Röntgen foundations deck should have four focused cards')
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'roentgenanlage-roehre'))

const [lesson, curriculum, page] = await Promise.all([
  readFile(new URL('../data/technikGrundlagenLesson.js', import.meta.url), 'utf8'),
  readFile(new URL('../data/curriculum.js', import.meta.url), 'utf8'),
  readFile(new URL('../app/technik/grundlagen/StandardPage.jsx', import.meta.url), 'utf8'),
])
const kEdgeSection = TECHNIK_GRUNDLAGEN.sections.find(section => section.id === 'wechselwirkung')
const kEdgeVisual = kEdgeSection.visuals.find(visual => visual.src.endsWith('mammography-k-edge.svg'))
assert.ok(kEdgeVisual, 'K-edge teaching visual should be linked in the interaction section')
const legendPhrases = {
  de: ['blaue durchgezogene Kurve', 'orange gestrichelte Kurve', 'violette Senkrechte'],
  en: ['solid blue', 'dashed orange', 'purple vertical line'],
  fa: ['خط پیوستهٔ آبی', 'خط‌چین نارنجی', 'خط عمودی بنفش'],
}
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(kEdgeVisual.alt[lang] && kEdgeVisual.caption[lang], `${lang}: K-edge visual needs localized alt and caption`)
  for (const phrase of legendPhrases[lang]) assert.ok(kEdgeVisual.caption[lang].includes(phrase), `${lang}: K-edge caption must map visual marks to their meaning`)
}
const kEdgeSvg = await readFile(new URL('../public/technik/grundlagen/mammography-k-edge.svg', import.meta.url), 'utf8')
assert.ok(!/<(?:text|title|desc)\b/i.test(kEdgeSvg), 'K-edge graphic must stay language-neutral and use localized lesson alt/caption')
assert.match(kEdgeSvg, /694 28[0-9]/, 'Filtered schematic must retain residual fluence beyond the K-edge')
for (const content of ['Kathode und Elektronenfokus', 'Tatsächlicher, thermischer und optischer Brennfleck', 'Vakuumhülle und Schutzgehäuse', 'Wovon hängt die Abschwächung ab?', 'K-Kantenfilter in der Mammographie', 'Computed Radiography (CR)', 'DR direkt']) assert.ok(lesson.includes(content), `Source-led lesson detail missing: ${content}`)
for (const asset of ['xray-tube.svg', 'heel-effect.svg', 'xray-interactions.svg', 'mammography-k-edge.svg', 'detector-chain.svg']) assert.ok(lesson.includes(asset), `Teaching diagram missing: ${asset}`)
assert.ok(page.includes('RetrievalCheck kind="roehre"') && page.includes('RetrievalCheck kind="wechselwirkung"') && page.includes('RetrievalCheck kind="detektor"'), 'Each updated chapter must include an inline knowledge check')
assert.ok(curriculum.includes("mcqLink: '/ueben/quiz?fach=technik&n=1&themen=roentgenanlage-roehre'") && curriculum.includes("flashcardLink: '/flashcards/roentgenanlage-roehre'"), 'Curriculum links should target the registered assessment and card deck')

console.log('Technik Röntgen sync passed: four source-linked topic IDs, DE/EN/FA checks, 4 cards and chapter visuals.')
