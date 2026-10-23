import assert from 'node:assert/strict'
import { UIP_IPF_LESSON } from '../data/thoraxUipIpfLesson.js'
import { CURRICULUM } from '../data/curriculum.js'
import { getQuestions } from '../data/questions.js'
import { getCardsByTopic } from '../data/flashcards.js'

const row = UIP_IPF_LESSON.chapters.find(chapter => chapter.id === 'categories').rows.find(([label]) => label.de === 'Wahrscheinliche UIP')
assert.ok(row, 'probable UIP category row exists')
for (const lang of ['de', 'en', 'fa']) {
  const text = row[1][lang].toLowerCase()
  assert.match(text, lang === 'de' ? /ohne subpleurales sparing/ : lang === 'en' ? /no subpleural sparing/ : /حفظ نسبی ناحیهٔ ساب‌پلورال/)
  const prompt = UIP_IPF_LESSON.check.prompt[lang].toLowerCase()
  assert.match(prompt, lang === 'de' ? /kein subpleurales sparing/ : lang === 'en' ? /subpleural sparing/ : /حفظ نسبی ناحیهٔ ساب‌پلورال/)
  const lengths = UIP_IPF_LESSON.check.options.map(option => option[lang].length)
  assert.ok(lengths[0] < Math.max(...lengths), `${lang}: correct response must not be the longest option`)
  const questions = getQuestions(['uip-ipf'], lang, 20)
  assert.equal(questions.length, 1, `${lang}: exactly one exact-topic MCQ`)
  assert.equal(questions[0].correct, 'A')
  assert.equal(questions[0].options[0].text, UIP_IPF_LESSON.check.options[0][lang])
  assert.ok(questions[0].explanation)
}
assert.equal(getCardsByTopic('uip-ipf').length, 1)
const topic = CURRICULUM.flatMap(subject => subject.kapitel || []).flatMap(chapter => chapter.themen || []).find(item => item.id === 'uip-ipf')
assert.ok(topic, 'UIP/IPF curriculum topic exists')
console.log('UIP/IPF probable-pattern criteria, balanced options and exact DE/EN/FA assessment retrieval pass.')
