import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { CURRICULUM } from '../data/curriculum.js'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARDS } from '../data/flashcards.js'

const route = await readFile(new URL('../app/msk/schulter/rotatorenmanschette/page.js', import.meta.url), 'utf8')
const ledger = await readFile(new URL('../docs/lesson-quality/rotator-cuff-msk-p36-p38.md', import.meta.url), 'utf8')

const findTopic = nodes => {
  for (const node of nodes) {
    if (node?.id === 'rotatorenmanschette') return node
    const found = findTopic(node?.themen || node?.children || node?.kapitel || [])
    if (found) return found
  }
  return null
}

const topic = findTopic(CURRICULUM)
assert.ok(topic, 'rotator-cuff curriculum topic exists')
assert.equal(topic.link, '/msk/schulter/rotatorenmanschette')
assert.match(topic.mcqLink, /themen=rotatorenmanschette/)
assert.match(decodeURIComponent(topic.mcqLink), /from=\/msk\/schulter\/rotatorenmanschette/)
assert.equal(topic.flashcardLink, '/flashcards/rotatorenmanschette')

for (const lang of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[lang].filter(question => question.tags?.includes('rotatorenmanschette'))
  assert.equal(questions.length, 15, `${lang}: expected 15 exact-topic questions`)
  for (const question of questions) {
    assert.equal(question.options.length, 4)
    assert.ok(question.options.some(option => option.id === question.correct))
  }
}

const cards = FLASHCARDS.filter(card => card.topicId === 'rotatorenmanschette')
assert.equal(cards.length, 12)
for (const card of cards) {
  for (const lang of ['de', 'en', 'fa']) {
    assert.ok(card.front?.[lang], `${card.id}: missing ${lang} front`)
    assert.ok(card.answer?.[lang], `${card.id}: missing ${lang} answer`)
  }
}
const tangentCard = cards.find(card => card.id === 'rotatorenmanschette-11')
assert.match(tangentCard.answer.de, /Supraspinatus-Muskelbauch/)
assert.match(tangentCard.answer.en, /supraspinatus muscle belly/)
assert.match(tangentCard.answer.fa, /شکم عضله سوپراسپیناتوس/)
assert.doesNotMatch(tangentCard.answer.de, /Humeruskopf überschreitet/)

assert.match(route, /href=\{withLang\('\/msk\/schulter\/impingement-kalkschulter'\)\}/)
assert.match(route, /LessonHero title=\{copy\.title\} imageSrc="\/educational\/rotator-cuff-schematic\.svg"/)
assert.match(route, /const \[openId, setOpenId\] = useState\(copy\.sections\[0\]\.id\)/)
assert.match(route, /setOpenId\(id\)/)
assert.match(route, /window\.history\.replaceState\(null, '', `\$\{window\.location\.pathname\}\$\{window\.location\.search\}#\$\{id\}`\)/)
assert.match(route, /window\.addEventListener\('hashchange', syncFromHash\)/)
assert.match(route, /Kurz prüfen/)
assert.match(route, /خودآزمایی کوتاه/)
assert.doesNotMatch(route, /setOpen\(false\)/)
for (const phrase of ['Positiv: Der Supraspinatus-Muskelbauch reicht nicht über die Linie hinaus', 'supraspinatus muscle belly does not extend above the line', 'مثبت بودن علامت یعنی شکم عضله سوپراسپیناتوس از خط بالاتر نمی‌رود']) assert.ok(route.includes(phrase), `missing corrected tangent definition: ${phrase}`)
for (const localizedLabel of ['Impingement-Muster gezielt vertiefen', 'Review impingement patterns', 'مرور متمرکز الگوهای ایمپینجمنت']) {
  assert.ok(route.includes(localizedLabel), `missing localized link label: ${localizedLabel}`)
}
for (const sourcePage of ['p. 36', 'p. 37', 'p. 38']) assert.ok(ledger.includes(sourcePage))

console.log('Rotator cuff p.36–38 checks passed: curriculum/action links, exact-tag questions, localized cards, related impingement link and page coverage ledger.')
