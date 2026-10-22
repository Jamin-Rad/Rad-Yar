import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { CURRICULUM } from '../data/curriculum.js'
import { getCardsByTopic, getFlashcardTopic } from '../data/flashcards.js'
import { getQuestions, QUESTION_BANK } from '../data/questions.js'

const routePath = '/abdomen/pankreas/zystische-tumoren'
const sharedCardTopic = 'abdomen-pancreatic-cysts'
const topics = CURRICULUM.flatMap(area => area.kapitel.flatMap(chapter => chapter.themen || []))
const expected = {
  ipmn: { link: routePath, mcq: '/ueben/quiz?fach=abdomen&n=1&themen=ipmn', flashcard: `/flashcards/${sharedCardTopic}` },
  'mcn-pankreas': { link: undefined, mcq: undefined, flashcard: undefined },
  'seroeses-zystadenom': { link: routePath, mcq: undefined, flashcard: `/flashcards/${sharedCardTopic}` },
}

for (const [id, links] of Object.entries(expected)) {
  const topic = topics.find(item => item.id === id)
  assert.ok(topic, `${id} exists in the exact curriculum`)
  assert.equal(topic.link, links.link, `${id} route reflects actual source coverage`)
  assert.equal(topic.mcqLink, links.mcq, `${id} only advertises its actual global question`)
  assert.equal(topic.flashcardLink, links.flashcard)
}

const taggedQuestions = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  QUESTION_BANK[lang].filter(question => question.tags?.includes('ipmn')),
]))
for (const lang of ['de', 'en', 'fa']) {
  assert.equal(taggedQuestions[lang].length, 1, `${lang}: one existing global IPMN question`)
  assert.equal(getQuestions(['ipmn'], lang, 1)[0]?.id, taggedQuestions[lang][0].id)
  assert.equal(getQuestions(['mcn-pankreas'], lang, 1).length, 0, `${lang}: no unsupported MCN question is advertised`)
  assert.equal(getQuestions(['seroeses-zystadenom'], lang, 1).length, 0, `${lang}: no unsupported serous-neoplasm question is advertised`)
}

assert.equal(getFlashcardTopic(sharedCardTopic)?.href, `/flashcards/${sharedCardTopic}`)
const cards = getCardsByTopic(sharedCardTopic)
assert.equal(cards.length, 2, 'one foundational and one serous-specific retrieval card are registered')
assert.deepEqual(cards.map(card => card.id), [
  `${sharedCardTopic}-pseudocyst-context-clues`,
  `${sharedCardTopic}-serous-macrocystic-contour`,
])
for (const lang of ['de', 'en', 'fa']) {
  for (const card of cards) {
    for (const field of ['front', 'answer', 'explanation']) assert.ok(card[field]?.[lang], `${lang}: ${card.id} ${field} is localized`)
    assert.match(card.explanation[lang], /p\.40|صفحهٔ ۴۰/)
  }
  assert.ok(/Pankreaskopf|pancreatic head|سر پانکراس/.test(cards[1].answer[lang]), `${lang}: source-specific lobulated pancreatic-head clue`)
}

const route = await readFile(new URL('../app/abdomen/pankreas/zystische-tumoren/page.js', import.meta.url), 'utf8')
const image = await readFile(new URL('../public/educational/pancreatic-cysts/mri-mrcp-pdf-p41.jpg', import.meta.url))
const provenance = JSON.parse(await readFile(new URL('../public/educational/pancreatic-cysts/image-provenance.json', import.meta.url), 'utf8'))
assert.match(route, /title=\{copy\.title\}.*copy=\{\{ \.\.\.copy, labels: shellLabels \}\}.*quizHref=\{quizHref\}.*flashcardsHref=\{flashcardsHref\}/)
assert.match(route, /const returnTo = lang === 'de' \? '\/abdomen\/pankreas\/zystische-tumoren#first-look'/)
assert.match(route, /themen=ipmn&from=\$\{from\}\$\{language\}/)
assert.match(route, /flashcards\/abdomen-pancreatic-cysts\?from=\$\{from\}\$\{language\}/)
assert.match(route, /id: 'first-look'/)
assert.match(route, /selfCheck: 'Wandstruktur vergleichen'.*summary: 'Befund knapp strukturieren'/s)
assert.match(route, /selfCheck: 'Compare cyst walls'.*summary: 'Structure the report briefly'/s)
assert.match(route, /selfCheck: 'دیوارهٔ کیست‌ها را مقایسه کنید'.*summary: 'گزارش را کوتاه ساختاربندی کنید'/s)
assert.match(route, /check=\{selfCheck\}/)
assert.match(route, /src="\/educational\/pancreatic-cysts\/mri-mrcp-pdf-p41\.jpg" alt=\{copy\.imageAlt\}/)
assert.ok(image.length > 10_000, 'cropped source MRI/MRCP image is present')
assert.equal(provenance.sourcePdfPage, 41)
assert.equal(provenance.printedPage, 40)
assert.match(provenance.transformation, /320 dpi.*paired MRI\/MRCP panels/)
assert.match(provenance.rights, /user explicitly confirmed/)
for (const text of [
  'No marker identifies a specific duct connection',
  'The source does not mark a specific connection',
  'هیچ علامتی یک ارتباط مشخص با مجرا را نشان نمی‌دهد',
]) assert.ok(route.includes(text), `localized visual caveat present: ${text}`)
assert.doesNotMatch(route, /quizQ|quizOptions|quizFeedback/)
assert.doesNotMatch(route, /<h1>\{copy\.title\}<\/h1>/)

console.log('Pancreatic cyst assessment integration passed: existing IPMN MCQ only, scoped localized cards, MCN coverage boundary, direct links/return anchor, route-specific check and Shell props.')
