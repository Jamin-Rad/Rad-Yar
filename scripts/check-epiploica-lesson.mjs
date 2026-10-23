import fs from 'node:fs'
import assert from 'node:assert/strict'
import parser from 'next/dist/compiled/babel/parser.js'
import sharp from 'sharp'
import { EPIPLOICA_LESSON as lesson, EPIPLOICA_QUESTIONS as questions, EPIPLOICA_FLASHCARDS as lessonCards, EPIPLOICA_FLASHCARD_TOPIC as lessonTopic } from '../data/epiploicaLesson.js'

const languages = ['de', 'en', 'fa']
const persian = /[\u0600-\u06ff]/u
let translations = 0
function inspect(value) {
  if (!value || typeof value !== 'object') return
  if (languages.every(lang => typeof value[lang] === 'string')) {
    translations += 1
    assert.ok(languages.every(lang => value[lang].trim()), 'Empty translation')
    assert.ok(!persian.test(value.de) && !persian.test(value.en) && persian.test(value.fa), 'Language-slot mismatch')
  } else Object.values(value).forEach(inspect)
}
inspect(lesson)
assert.equal(lesson.id, 'appendicitis-epiploica')
assert.equal(lesson.chapters.length, 3)
assert.equal(new Set(lesson.chapters.map(chapter => chapter.id)).size, 3)
assert.equal(lesson.ctRows.length, 3)
assert.equal(lesson.cards.length, 3)
assert.equal(lesson.summary.length, 3)
assert.equal(lesson.question.answer, 1)
assert.equal(lesson.question.options.length, 4)
assert.equal(new Set(lesson.question.options.map(option => option.de)).size, 4)
assert.equal(lessonCards.length, lesson.cards.length)
assert.equal(lessonTopic.id, lesson.id)
assert.ok(lessonCards.every(card => Object.keys(card.front).join(',') === 'de,en,fa' && Object.keys(card.answer).join(',') === 'de,en,fa'))
for (const lang of languages) {
  const question = questions[lang][0]
  assert.equal(question.id, `appendicitis-epiploica-${lang}-01`)
  assert.equal(question.fach, 'abdomen')
  assert.equal(question.correct, 'B')
  assert.equal(question.question, lesson.question.question[lang])
  assert.equal(question.explanation, lesson.question.feedback[lang])
  assert.deepEqual(question.tags, ['appendicitis-epiploica'])
  assert.equal(new Set(question.options.map(option => option.text)).size, 4)
}
const route = fs.readFileSync('app/abdomen/peritoneum/appendicitis-epiploica/page.jsx', 'utf8')
const ast = parser.parse(route, { sourceType: 'module', plugins: ['jsx'] })
let interfaceUnits = 0
function inspectInterface(node) {
  if (!node || typeof node !== 'object') return
  if (node.type === 'CallExpression' && node.callee.name === 'L') {
    const values = node.arguments.map(argument => argument.value)
    assert.equal(values.length, 3)
    assert.ok(values.every(value => typeof value === 'string' && value.trim()))
    assert.ok(!persian.test(values[0]) && !persian.test(values[1]) && persian.test(values[2]), 'Interface language-slot mismatch')
    interfaceUnits += 1
  }
  for (const [key, value] of Object.entries(node)) if (key !== 'loc') {
    if (Array.isArray(value)) value.forEach(inspectInterface)
    else if (value && typeof value === 'object') inspectInterface(value)
  }
}
inspectInterface(ast)
assert.ok(route.includes('StandardLessonShell') && route.includes('<Decision lang={lang}/>'))
assert.ok(route.includes('themen=appendicitis-epiploica') && route.includes('href={lesson.figure.sourceUrl}'))
assert.match(route, /const lessonReturn = `\/abdomen\/peritoneum\/appendicitis-epiploica\$\{lang === 'de' \? '' : `\?lang=\$\{lang\}`\}`/)
assert.match(route, /themen=appendicitis-epiploica&from=\$\{encodeURIComponent\(lessonReturn\)\}/)
assert.match(route, /\/flashcards\/appendicitis-epiploica\?from=\$\{encodeURIComponent\(lessonReturn\)\}/)
assert.ok(route.includes('href={lesson.figure.src}') && route.includes('aria-label='))
assert.ok(route.includes('heroImageAlt={pick(lesson.heroAlt, lang)} syncHashNavigation'), 'Opt into accessible hero and location synchronization')
for (const lang of languages) assert.ok(lesson.heroAlt[lang]?.trim(), `Missing hero alt: ${lang}`)
const shell = fs.readFileSync('components/lesson-template/StandardLessonShell.jsx', 'utf8')
assert.match(shell, /import LessonHero from '@\/components\/LessonHero'/)
assert.match(shell, /<LessonHero title=\{title\} imageSrc=\{theme.heroImage\} imageAlt=\{heroImageAlt\} lang=\{lang\}/)
assert.match(shell, /syncHashNavigation = false/)
assert.match(shell, /return observeLessonHash\(/)
const navigation = fs.readFileSync('lib/lessonHashNavigation.js', 'utf8')
for (const event of ['hashchange', 'popstate']) {
  assert.ok(navigation.includes(`target.addEventListener('${event}', synchronize)`), `Missing listener: ${event}`)
  assert.ok(navigation.includes(`target.removeEventListener('${event}', synchronize)`), `Missing cleanup: ${event}`)
}
assert.match(lesson.chapters[1].paragraphs[0].en, /3 cm is not a rigid diagnostic exclusion cutoff/)
assert.match(lesson.ctRows[2][1].en, /absent in many cases/)
assert.match(lesson.chapters[2].paragraphs[0].en, /secondary appendage inflammation/)
assert.match(lesson.chapters[2].paragraphs[1].en, /Confidently diagnosed uncomplicated primary/)
assert.match(lesson.chapters[2].paragraphs[1].en, /not routinely needed/)
assert.match(lesson.chapters[2].paragraphs[1].en, /worsen, persist or recur/)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /id: 'appendicitis-epiploica'[^\n]+title: \{ de: 'Epiploische Appendagitis', en: 'Epiploic appendagitis', fa: 'التهاب زائدهٔ چربی کولون' \}[^\n]+link: '\/abdomen\/peritoneum\/appendicitis-epiploica'[^\n]+mcqLink: '\/ueben\/quiz\?fach=abdomen&n=1&themen=appendicitis-epiploica&from=%2Fabdomen%2Fperitoneum%2Fappendicitis-epiploica'[^\n]+flashcardLink: '\/flashcards\/appendicitis-epiploica\?from=%2Fabdomen%2Fperitoneum%2Fappendicitis-epiploica'[^\n]+inProgress: true/)
const flashcardRegistry = fs.readFileSync('data/flashcards.js', 'utf8')
assert.match(flashcardRegistry, /import \{ EPIPLOICA_FLASHCARDS, EPIPLOICA_FLASHCARD_TOPIC \} from '\.\/epiploicaLesson'/)
assert.match(flashcardRegistry, /EPIPLOICA_FLASHCARD_TOPIC/)
assert.match(flashcardRegistry, /\.\.\.EPIPLOICA_FLASHCARDS/)
assert.match(route, /flashcards: \{ label: pick\(L\('Lernkarten', 'Flashcards', 'فلش‌کارت‌ها'\), lang\), href: langHref\(`\/flashcards\/appendicitis-epiploica\?from=\$\{encodeURIComponent\(lessonReturn\)\}`\) \}/)
const flashcardPage = fs.readFileSync('app/flashcards/[topicId]/page.js', 'utf8')
assert.match(flashcardPage, /getFlashcardTopic\(topicId\)/)
assert.match(flashcardPage, /FLASHCARDS\.filter\(card => card\.topicId === topicId\)/)
const bank = fs.readFileSync('data/questions.js', 'utf8')
assert.ok(bank.includes('...EPIPLOICA_QUESTIONS[lang]'))
assert.match(bank, /kapitelId: 'abdomen-peritoneum'[^\n]+id: 'appendicitis-epiploica'/)
const status = fs.readFileSync('data/lessonStatus.js', 'utf8')
assert.ok(!status.includes('/abdomen/peritoneum/appendicitis-epiploica'), 'Do not mark lesson scientifically complete')
const provenance = JSON.parse(fs.readFileSync('public/abdomen/epiploica/image-provenance.json', 'utf8'))
assert.equal(provenance.pdfPage, 97)
assert.equal(provenance.printedPage, 96)
assert.equal(provenance.sourceCaseId, 'rID85024')
assert.equal(provenance.caseUrl, lesson.figure.sourceUrl)
assert.equal(provenance.contributor, null)
assert.match(provenance.contributorStatus, /unverified/)
const metadata = await sharp('public/abdomen/epiploica/ct-montage.png').metadata()
assert.equal(metadata.width, provenance.sourceCrop.width)
assert.equal(metadata.height, provenance.sourceCrop.height)
assert.equal(metadata.width, lesson.figure.width)
assert.equal(metadata.height, lesson.figure.height)
const ledger = fs.readFileSync('docs/lesson-quality/appendicitis-epiploica-p97-review.md', 'utf8')
assert.equal((ledger.match(/\| E\d\d \|/g) || []).length, 13)
assert.match(ledger, /independent review/i)
assert.match(ledger, /BLOCKED/)
for (const asset of ['public/abdomen/epiploica/hero.svg', 'public/abdomen/epiploica/ct-montage.png']) assert.ok(fs.statSync(asset).size > 200)
console.log(`Epiploica scoped audit passed: ${translations} content and ${interfaceUnits} interface translation units; 3 chapters, 3 CT observations, 1 connected four-option question per language, 3 retrieval cards, image/provenance and exact curriculum mapping.`)
