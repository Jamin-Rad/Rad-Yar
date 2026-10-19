import fs from 'node:fs'
import assert from 'node:assert/strict'
import parser from 'next/dist/compiled/babel/parser.js'
import sharp from 'sharp'
import { PERITONEAL_LESSON as lesson, PERITONEAL_QUESTIONS as questions } from '../data/peritonealCarcinomatosisLesson.js'

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
assert.equal(lesson.id, 'peritonealkarzinose')
assert.equal(lesson.chapters.length, 3)
assert.equal(new Set(lesson.chapters.map(chapter => chapter.id)).size, 3)
assert.equal(lesson.ctRows.length, 4)
assert.equal(lesson.cards.length, 3)
assert.equal(lesson.summary.length, 3)
assert.equal(lesson.question.answer, 1)
assert.equal(lesson.question.options.length, 4)
for (const lang of languages) {
  const question = questions[lang][0]
  assert.equal(question.id, `peritonealkarzinose-${lang}-01`)
  assert.equal(question.fach, 'abdomen')
  assert.equal(question.correct, 'B')
  assert.equal(question.question, lesson.question.question[lang])
  assert.equal(question.explanation, lesson.question.feedback[lang])
  assert.deepEqual(question.tags, ['peritonealkarzinose'])
  assert.equal(new Set(question.options.map(option => option.text)).size, 4)
}
const route = fs.readFileSync('app/abdomen/peritoneum/peritonealkarzinose/page.jsx', 'utf8')
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
assert.ok(route.includes('themen=peritonealkarzinose') && route.includes('href={lesson.figure.sourceUrl}'))
assert.ok(route.includes("encodeURIComponent(langHref('/abdomen/peritoneum/peritonealkarzinose'))"), 'Encoded language-specific quiz return target')
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
assert.deepEqual(lesson.chapters.map(chapter => chapter.id), ['surface-spread', 'ct-patterns', 'extent-limits'])
assert.match(lesson.chapters[1].paragraphs[0].en, /No individual sign is mandatory/)
assert.match(lesson.chapters[2].paragraphs[0].en, /mesothelioma can produce a similar appearance/)
assert.match(lesson.chapters[2].paragraphs[1].en, /For ovarian and colorectal cancer/)
assert.match(lesson.chapters[2].paragraphs[1].en, /does not establish complete resectability/)
assert.match(lesson.ctRows[3][1].en, /one still image cannot demonstrate loss of mobility/)
assert.match(lesson.figure.caption.en, /original English image label/)
assert.match(lesson.question.feedback.en, /does not reliably exclude small implants/)
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /id: 'peritonealkarzinose'[^\n]+link: '\/abdomen\/peritoneum\/peritonealkarzinose'[^\n]+inProgress: true/)
assert.match(curriculum, /id: 'peritonealkarzinose'[^\n]+mcqLink: '\/ueben\/quiz\?fach=abdomen&n=1&themen=peritonealkarzinose'/)
const bank = fs.readFileSync('data/questions.js', 'utf8')
assert.ok(bank.includes('...PERITONEAL_QUESTIONS[lang]'))
assert.match(bank, /kapitelId: 'abdomen-peritoneum'[^\n]+id: 'peritonealkarzinose'/)
assert.equal((bank.match(/kapitelId: 'abdomen-peritoneum'/g) || []).length, 1, 'Preserve one shared peritoneum group')
const status = fs.readFileSync('data/lessonStatus.js', 'utf8')
assert.ok(!status.includes('/abdomen/peritoneum/peritonealkarzinose'), 'Do not mark lesson scientifically complete')
const provenance = JSON.parse(fs.readFileSync('public/abdomen/peritoneal-carcinomatosis/image-provenance.json', 'utf8'))
assert.equal(provenance.pdfPage, 99)
assert.equal(provenance.printedPage, 98)
assert.equal(provenance.sourceCaseId, 'rID162382')
assert.equal(provenance.caseUrl, lesson.figure.sourceUrl)
assert.equal(provenance.contributor, null)
assert.match(provenance.contributorStatus, /unverified/)
assert.match(provenance.sourceCrop.retainedContent, /original orange arrow and English Omental thickening label/)
assert.match(provenance.authorization, /No independent contributor-level rights or legal-clearance claim/)
const metadata = await sharp('public/abdomen/peritoneal-carcinomatosis/omental-cake.png').metadata()
assert.equal(metadata.width, provenance.sourceCrop.width)
assert.equal(metadata.height, provenance.sourceCrop.height)
assert.equal(metadata.width, lesson.figure.width)
assert.equal(metadata.height, lesson.figure.height)
const ledger = fs.readFileSync('docs/lesson-quality/peritonealkarzinose-p99-review.md', 'utf8')
assert.equal((ledger.match(/\| C\d\d \|/g) || []).length, 10)
assert.match(ledger, /Independent review pending/)
assert.match(ledger, /BLOCKED/)
for (const asset of ['public/abdomen/peritoneal-carcinomatosis/hero.svg', 'public/abdomen/peritoneal-carcinomatosis/omental-cake.png']) assert.ok(fs.statSync(asset).size > 200)
console.log(`Peritoneal carcinomatosis scoped audit passed: ${translations} content and ${interfaceUnits} interface translation units; 3 chapters, 4 CT patterns, 1 connected four-option question per language, 3 retrieval cards, image/provenance and exact curriculum mapping.`)
