import assert from 'node:assert/strict'
import fs from 'node:fs'
import { CURRICULUM } from '../data/curriculum.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { THORAX_CAVITIES } from '../data/thoraxCavities.js'

const routeSource = fs.readFileSync('app/thorax/kavitaeten/page.js', 'utf8')

const topic = CURRICULUM.flatMap(subject => subject.kapitel || []).flatMap(chapter => chapter.themen || []).find(item => item.id === 'lungenabszess')
assert.ok(topic, 'exact curriculum topic exists')
assert.equal(topic.link, '/thorax/kavitaeten')
assert.equal(topic.mcqLink, '/ueben/quiz?fach=thorax&n=1&themen=lungenabszess')
assert.equal(topic.flashcardLink, '/flashcards/lungenabszess')
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.topics.some(item => item.id === 'lungenabszess')), 'exact MCQ topic is registered')
assert.ok(FLASHCARD_TOPICS.some(item => item.id === 'lungenabszess'), 'exact flashcard topic is registered')
const cards = getCardsByTopic('lungenabszess')
assert.equal(cards.length, 1, 'one exact-topic flashcard')

for (const lang of ['de', 'en', 'fa']) {
  const questionSet = QUESTION_BANK[lang].filter(item => item.tags.includes('lungenabszess'))
  assert.equal(questionSet.length, 1, `${lang}: one exact-topic MCQ`)
  assert.equal(questionSet[0].options.length, 4, `${lang}: four answer choices`)
  assert.match(questionSet[0].options[1].text, /air-fluid level|Luft-Flüssigkeitsspiegel|سطح هوا/, `${lang}: option B tests air-fluid-level overinterpretation`)
  assert.match(questionSet[0].options[3].text, /pleural|Pleur|پلور/, `${lang}: option D tests pleural-location overinterpretation`)
  assert.doesNotMatch(questionSet[0].options[3].text, /air-fluid|Luft-Flüssigkeit|هواـمایع/, `${lang}: option D is distinct from option B`)
  assert.ok(questionSet[0].question && questionSet[0].explanation, `${lang}: question and explanation localized`)
  assert.ok(cards[0].front[lang] && cards[0].answer[lang] && cards[0].explanation[lang], `${lang}: flashcard localized`)
  assert.match(routeSource, new RegExp(`route\\('/thorax/kavitaeten#infection-patterns'\\)`), `${lang}: lesson actions define exact return anchor`)
  assert.match(routeSource, /actions=\{\{[\s\S]*?mcq:[\s\S]*?flashcards:/, `${lang}: lesson shell receives MCQ and flashcard actions`)
  assert.match(routeSource, /const route = href => \{[\s\S]*?split\('#', 2\)[\s\S]*?path\.includes\('\?'\) \? '&' : '\?'[\s\S]*?hash \? `\$\{localizedPath\}#\$\{hash\}`/, `${lang}: language query is added before a return hash`)
  assert.match(routeSource, /themen=lungenabszess&from=\$\{encodeURIComponent\(lessonReturn\)\}/, `${lang}: MCQ action uses exact topic and return route`)
  assert.match(routeSource, /flashcards\/lungenabszess\?from=\$\{encodeURIComponent\(lessonReturn\)\}/, `${lang}: card action carries return route`)
  const abscess = THORAX_CAVITIES.chapters.flatMap(chapter => chapter.rows).find(([label]) => label[lang] === (lang === 'de' ? 'Lungenabszess' : lang === 'en' ? 'Lung abscess' : 'آبسهٔ ریه'))
  assert.ok(abscess && abscess[1][lang].includes(lang === 'de' ? 'reicht nicht immer' : lang === 'en' ? 'may not always' : 'گاهی تصویر به‌تنهایی کافی نیست'), `${lang}: source lesson retains non-specificity caveat`)
}
assert.match(fs.readFileSync('docs/lesson-quality/thorax-cavities-pdf-review.md', 'utf8'), /Thorax\.pdf p\. 26/)
console.log('Lung abscess exact-topic MCQ/card integration passed: DE/EN/FA, curriculum links, lesson actions and return-anchor parity.')
