import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { CURRICULUM } from '../data/curriculum.js'
import { OSTEOSYNTHESE_POSTOP } from '../data/osteosynthesePostop.js'

const languages = ['de', 'en', 'fa']
function verifyTranslations(value, path = 'lesson') {
  if (Array.isArray(value)) return value.forEach((item, index) => verifyTranslations(item, `${path}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (languages.some(language => Object.hasOwn(value, language))) {
    for (const language of languages) assert.ok(typeof value[language] === 'string' && value[language].trim(), `${path} missing ${language}`)
    return
  }
  for (const [key, item] of Object.entries(value)) verifyTranslations(item, `${path}.${key}`)
}

verifyTranslations(OSTEOSYNTHESE_POSTOP)
assert.equal(OSTEOSYNTHESE_POSTOP.id, 'msk-postop-osteosynthese')
assert.equal(OSTEOSYNTHESE_POSTOP.sections[0].rows.length, 4)
assert.equal(OSTEOSYNTHESE_POSTOP.sections[2].answer, 0)
assert.match(OSTEOSYNTHESE_POSTOP.sections[1].cave.de, /mindestens 5 mm/)
assert.match(OSTEOSYNTHESE_POSTOP.sections[1].cave.en, /not adopted.*universal threshold/i)
assert.doesNotMatch(JSON.stringify(OSTEOSYNTHESE_POSTOP.takeHome), /5 mm|5-mm|5 میلی/)

const msk = CURRICULUM.find(({ id }) => id === 'msk')
const topic = msk?.kapitel.flatMap(({ themen }) => themen || []).find(({ id }) => id === 'osteosynthese')
assert.ok(topic, 'exact osteosynthese curriculum ID must exist')
assert.equal(topic.link, '/msk/postop/osteosynthese')
assert.equal(topic.inProgress, true)
assert.equal(topic.ready, true)

const route = await readFile('app/msk/postop/osteosynthese/page.jsx', 'utf8')
const styles = await readFile('app/msk/postop/osteosynthese/page.module.css', 'utf8')
const hero = await readFile('public/educational/osteosynthese-postop/hero-v2.webp')
const ledger = await readFile('docs/lesson-quality/osteosynthese-postop-msk-p10.md', 'utf8')
assert.match(route, /StandardLessonShell/)
assert.match(route, /\/educational\/osteosynthese-postop\/hero-v2\.webp/)
assert.match(route, /CheckDiagram/)
assert.match(route, /Selbstcheck/)
assert.match(route, /LessonSources/)
assert.match(route, /useLanguage/)
const shell = await readFile('components/lesson-template/StandardLessonShell.jsx', 'utf8')
assert.match(shell, /dir=\{lang === 'fa' \? 'rtl' : 'ltr'\}/)
assert.match(styles, /@media \(max-width: 600px\)/)
assert.ok(hero.length > 10_000, 'polished non-diagnostic generated hero exists')
assert.match(OSTEOSYNTHESE_POSTOP.sections[1].cave.de, /Projektion/)
assert.match(ledger, /MSK\.pdf, PDF S\. 10 \/ Druck S\. 9/)
assert.match(ledger, /bewusst nicht als Kriterium übernommen/)
assert.match(ledger, /Abgerissener Trochanter minor/)

console.log('Postoperative osteosynthesis check passed: source scope, DE/EN/FA parity, threshold caveat, exact curriculum route, schematic, retrieval check and ledger.')
