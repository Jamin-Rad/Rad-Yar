import fs from 'node:fs'
import assert from 'node:assert/strict'
import parser from 'next/dist/compiled/babel/parser.js'
import sharp from 'sharp'
import { PANNICULITIS_LESSON as lesson, PANNICULITIS_QUESTIONS as questions } from '../data/panniculitisLesson.js'

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
assert.equal(lesson.id, 'mesenteriale-panniculitis')
assert.deepEqual(lesson.chapters.map(chapter => chapter.id), ['fat-pattern', 'lymphoma-mimic', 'clinical-context'])
assert.equal(lesson.ctRows.length, 3)
assert.equal(lesson.cards.length, 3)
assert.equal(lesson.summary.length, 3)
assert.equal(lesson.question.answer, 1)
assert.equal(lesson.question.options.length, 4)
for (const lang of languages) {
  const question = questions[lang][0]
  assert.equal(questions[lang].length, 1)
  assert.equal(question.id, `mesenteriale-panniculitis-${lang}-01`)
  assert.equal(question.fach, 'abdomen')
  assert.equal(question.correct, 'B')
  assert.equal(question.question, lesson.question.question[lang])
  assert.equal(question.explanation, lesson.question.feedback[lang])
  assert.deepEqual(question.tags, ['mesenteriale-panniculitis'])
  assert.deepEqual(question.options.map(option => option.id), ['A', 'B', 'C', 'D'])
  assert.deepEqual(question.options.map(option => option.text), lesson.question.options.map(option => option[lang]))
  assert.equal(new Set(question.options.map(option => option.text)).size, 4)
}
const route = fs.readFileSync('app/abdomen/peritoneum/mesenteriale-panniculitis/page.jsx', 'utf8')
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
assert.ok(route.includes('themen=mesenteriale-panniculitis') && route.includes('href={figure.sourceUrl}'))
assert.ok(route.includes("encodeURIComponent(langHref('/abdomen/peritoneum/mesenteriale-panniculitis'))"), 'Encoded language-specific quiz return target')
assert.ok(route.includes('href={figure.src}') && route.includes('aria-label='))
assert.ok(route.includes('<SourceFigure figure={lesson.figures.pattern} lang={lang}/>'))
assert.ok(route.includes('<SourceFigure figure={lesson.figures.lymphoma} lang={lang} compact/>'))
assert.ok(route.includes('heroImageAlt={pick(lesson.heroAlt, lang)} syncHashNavigation'))
assert.ok(!route.includes('subtitle='))
assert.match(lesson.chapters[0].paragraphs[1].en, /not a single diagnosis/)
assert.match(lesson.chapters[1].paragraphs[1].en, /fat ring can also occur in lymphoproliferative disease/)
assert.match(lesson.ctRows[2][1].en, /neither obligatory nor diagnostic on its own/)
assert.match(lesson.chapters[2].paragraphs[0].en, /may remain stable or regress/)
assert.match(lesson.chapters[2].paragraphs[1].en, /selected symptomatic cases/)
assert.match(lesson.question.feedback.en, /15-mm cutoff proves benignity/)
assert.match(lesson.figures.lymphoma.caption.en, /different source case, not a later stage/)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /id: 'mesenteriale-panniculitis'[^\n]+link: '\/abdomen\/peritoneum\/mesenteriale-panniculitis'[^\n]+inProgress: true/)
assert.match(curriculum, /id: 'mesenteriale-panniculitis'[^\n]+mcqLink: '\/ueben\/quiz\?fach=abdomen&n=1&themen=mesenteriale-panniculitis'/)
const bank = fs.readFileSync('data/questions.js', 'utf8')
assert.ok(bank.includes('...PANNICULITIS_QUESTIONS[lang]'))
assert.match(bank, /kapitelId: 'abdomen-peritoneum'[^\n]+id: 'mesenteriale-panniculitis'/)
assert.equal((bank.match(/kapitelId: 'abdomen-peritoneum'/g) || []).length, 1)
assert.ok(!fs.readFileSync('data/lessonStatus.js', 'utf8').includes('/abdomen/peritoneum/mesenteriale-panniculitis'))
const provenance = JSON.parse(fs.readFileSync('public/abdomen/panniculitis/image-provenance.json', 'utf8'))
assert.equal(provenance.pdfPage, 98)
assert.equal(provenance.printedPage, 97)
assert.equal(provenance.assets.length, 2)
for (const [key, id] of [['pattern', 'rID10092'], ['lymphoma', 'rID11906']]) {
  const figure = lesson.figures[key]
  const record = provenance.assets.find(asset => asset.sourceCaseId === id)
  assert.equal(record.caseUrl, figure.sourceUrl)
  const metadata = await sharp(`public${figure.src}`).metadata()
  assert.equal(metadata.width, record.sourceCrop.width)
  assert.equal(metadata.height, record.sourceCrop.height)
  assert.equal(metadata.width, figure.width)
  assert.equal(metadata.height, figure.height)
}
assert.equal(provenance.assets[0].contributor, null)
assert.match(provenance.assets[0].contributorStatus, /unverified/)
assert.equal(provenance.assets[1].contributor, 'The Radswiki')
assert.match(provenance.assets[1].contributorStatus, /Indexed original/)
assert.match(provenance.assets[1].contributorStatus, /402\/inaccessible/)
assert.match(provenance.authorization, /no independent legal-clearance claim/)
const ledger = fs.readFileSync('docs/lesson-quality/mesenteriale-panniculitis-p98-review.md', 'utf8')
assert.equal((ledger.match(/\| P\d\d \|/g) || []).length, 14)
assert.match(ledger, /Independent review pending/)
assert.match(ledger, /BLOCKED/)
for (const asset of ['hero.svg', 'ct-pattern.png', 'ct-lymphoma.png']) assert.ok(fs.statSync(`public/abdomen/panniculitis/${asset}`).size > 200)
console.log(`Panniculitis scoped audit passed: ${translations} content and ${interfaceUnits} interface translation units; 3 chapters, 3 CT observations, 1 connected four-option question per language, 3 cards, two source crops/provenance and exact curriculum mapping. Static assertions do not replace independent source or browser review.`)
