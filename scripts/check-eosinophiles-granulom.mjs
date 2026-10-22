import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import {
  EOSINOPHILIC_GRANULOMA_ID,
  EOSINOPHILIC_GRANULOMA_PATH,
  EOSINOPHILIC_GRANULOMA_LESSON,
  EOSINOPHILIC_GRANULOMA_QUESTIONS,
  EOSINOPHILIC_GRANULOMA_FLASHCARDS,
  EOSINOPHILIC_GRANULOMA_FLASHCARD_TOPIC,
} from '../data/eosinophilesGranulomLesson.js'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS, getQuestionsForIds, countQuestions } from '../data/questions.js'
import { FLASHCARDS, getFlashcardTopic } from '../data/flashcards.js'

const require = createRequire(import.meta.url)
const languages = ['de', 'en', 'fa']
const persianScript = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/u
let translatedUnits = 0

function checkTranslations(value, path = 'root') {
  if (Array.isArray(value)) return value.forEach((item, i) => checkTranslations(item, `${path}[${i}]`))
  if (!value || typeof value !== 'object') return
  if (('de' in value || 'en' in value || 'fa' in value) && languages.every(lang => typeof value[lang] === 'string')) {
    for (const lang of languages) {
      assert.ok(typeof value[lang] === 'string' && value[lang].trim(), `Missing ${lang} translation at ${path}`)
      if (lang === 'de' || lang === 'en') {
        assert.doesNotMatch(value[lang], persianScript, `Persian-script text leaked into ${lang.toUpperCase()} at ${path}: ${value[lang]}`)
      }
    }
    translatedUnits += 1
    return
  }
  Object.entries(value).forEach(([key, item]) => checkTranslations(item, `${path}.${key}`))
}

checkTranslations(EOSINOPHILIC_GRANULOMA_LESSON)
checkTranslations(EOSINOPHILIC_GRANULOMA_QUESTIONS)
checkTranslations(EOSINOPHILIC_GRANULOMA_FLASHCARDS)
checkTranslations(EOSINOPHILIC_GRANULOMA_FLASHCARD_TOPIC)

const topics = CURRICULUM.flatMap(subject => subject.kapitel.flatMap(chapter => chapter.themen))
const topic = topics.find(item => item.id === EOSINOPHILIC_GRANULOMA_ID)
assert.ok(topic, 'curriculum topic exists')
assert.equal(topic.link, EOSINOPHILIC_GRANULOMA_PATH)
assert.equal(topic.mcqLink, '/ueben/quiz?fach=msk&n=3&themen=eosinophiles-granulom')
assert.equal(topic.flashcardLink, '/flashcards/eosinophiles-granulom')
assert.equal(topic.inProgress, true)
assert.equal(getLessonLinkForFlashcard(topic.flashcardLink), EOSINOPHILIC_GRANULOMA_PATH)
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.fachId === 'msk' && group.topics.some(item => item.id === EOSINOPHILIC_GRANULOMA_ID)))
assert.equal(countQuestions([EOSINOPHILIC_GRANULOMA_ID]), 3)

const deIds = EOSINOPHILIC_GRANULOMA_QUESTIONS.de.map(question => question.id)
for (const lang of languages) {
  const questions = QUESTION_BANK[lang].filter(question => question.tags.includes(EOSINOPHILIC_GRANULOMA_ID))
  assert.equal(questions.length, 3, `${lang} question count`)
  assert.deepEqual(getQuestionsForIds(deIds, lang).map(question => question.id), questions.map(question => question.id))
  for (const question of questions) {
    assert.equal(question.options.length, 4)
    assert.ok(question.options.some(option => option.id === question.correct))
    assert.deepEqual(Object.keys(question.wrongExplanations).sort(), question.options.map(option => option.id).filter(id => id !== question.correct).sort())
    assert.match(question.source, /Zhao et al\./)
  }
}

assert.equal(FLASHCARDS.filter(card => card.topicId === EOSINOPHILIC_GRANULOMA_ID).length, 3)
assert.ok(getFlashcardTopic(EOSINOPHILIC_GRANULOMA_ID))
assert.equal(EOSINOPHILIC_GRANULOMA_FLASHCARD_TOPIC.id, EOSINOPHILIC_GRANULOMA_ID)
assert.equal(EOSINOPHILIC_GRANULOMA_LESSON.sections.length, 4)
assert.ok(EOSINOPHILIC_GRANULOMA_LESSON.sourceNote.de.includes('Ergänzender Lehrentwurf'))
assert.equal(EOSINOPHILIC_GRANULOMA_LESSON.title.de, 'Langerhans-Zell-Histiozytose des Knochens')
assert.equal(EOSINOPHILIC_GRANULOMA_LESSON.sections[0].title.de, 'Welche Knochenmuster legen LCH nahe?')
assert.equal(EOSINOPHILIC_GRANULOMA_LESSON.sections[0].title.en, 'Which bone patterns suggest LCH?')
assert.equal(EOSINOPHILIC_GRANULOMA_LESSON.sections[0].title.fa, 'کدام الگوهای استخوانی LCH را مطرح می‌کنند؟')
assert.equal(EOSINOPHILIC_GRANULOMA_LESSON.patternRows[0][0].de, 'Langer Röhrenknochen')
assert.equal(EOSINOPHILIC_GRANULOMA_LESSON.modalityRows[0][0].de, 'Röntgen')
assert.ok(EOSINOPHILIC_GRANULOMA_LESSON.caution.de.startsWith('Der PDF-Hinweis zur NOF-Differenzialdiagnose'))
assert.ok(EOSINOPHILIC_GRANULOMA_LESSON.check.prompt.de.startsWith('Im Röntgenbild zeigt sich'))
assert.ok(EOSINOPHILIC_GRANULOMA_LESSON.refs[0].citation.de.includes('wurden nicht aus dieser Seite abgeleitet'))

const page = await readFile('app/msk/tumoren/eosinophiles-granulom/page.jsx', 'utf8')
require('esbuild').transformSync(page, { loader: 'jsx', format: 'esm' })
assert.match(page, /ueben\/quiz\?fach=msk&n=3&themen=\$\{lesson\.id\}/)
assert.match(page, /flashcards\/\$\{lesson\.id\}/)
assert.match(page, /lang === 'de' \? path : `\$\{path\}\$\{path\.includes\('\?'\) \? '&' : '\?'\}lang=\$\{lang\}`/)
for (const asset of ['hero.svg', 'patterns.svg']) {
  const svg = await readFile(`public/educational/eosinophiles-granulom/${asset}`, 'utf8')
  assert.match(svg, /<svg\b/)
  assert.doesNotMatch(svg, /<text\b/, 'SVG labels remain localized in the translated alt/caption')
}
const ledger = await readFile('docs/lesson-quality/eosinophiles-granulom-source-ledger.md', 'utf8')
assert.match(ledger, /VIS partial\/open/)
assert.match(EOSINOPHILIC_GRANULOMA_LESSON.caseStudy.href, /^https:\/\/radiopaedia\.org\/cases\/160614$/)
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(EOSINOPHILIC_GRANULOMA_LESSON.caseStudy.title[lang])
  assert.ok(EOSINOPHILIC_GRANULOMA_LESSON.caseStudy.description[lang])
  assert.ok(EOSINOPHILIC_GRANULOMA_LESSON.caseStudy.linkLabel[lang])
}
assert.match(ledger, /MSK\.pdf`? physical p\.108/)

console.log(`Eosinophilic granuloma scoped checks passed: ${translatedUnits} translated units; exact curriculum, quiz, flashcard and language wiring; 9 localized MCQs with per-distractor explanations; 3 flashcards; route JSX and schematic assets. Browser behavior, real-image recognition and scientific approval remain unverified.`)
