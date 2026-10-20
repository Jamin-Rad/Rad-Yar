import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARDS } from '../data/flashcards.js'

const languages = ['de', 'en', 'fa']
for (const lang of languages) {
  const questions = (QUESTION_BANK[lang] || []).filter(item => item.id?.startsWith(`fnh-${lang}-`))
  assert.equal(questions.length, 10, `${lang}: FNH MCQ count should match the lesson CTA`)
  assert.ok(questions.every(item => item.options?.length === 4 && item.options.some(option => option.id === item.correct)), `${lang}: FNH questions must have four options and a valid answer`)
}

const cards = FLASHCARDS.filter(item => item.topicId === 'fnh')
assert.equal(cards.length, 12, 'FNH should have 12 registered flashcards')
const managementCard = cards.find(item => item.id === 'fnh-12-reporting')
assert.ok(managementCard?.explanation?.de.includes('EASL') && managementCard?.explanation?.en.includes('EASL') && managementCard?.explanation?.fa.includes('EASL'), 'Management card should cite the same source in all languages')

const [page, curriculum] = await Promise.all([
  readFile(new URL('../app/abdomen/leber/fnh/page.js', import.meta.url), 'utf8'),
  readFile(new URL('../data/curriculum.js', import.meta.url), 'utf8'),
])
const header = page.slice(page.indexOf('<header'), page.indexOf('</header>'))
assert.ok(header.includes('<LessonHero') && header.includes('<FnhHeroDiagram'), 'FNH should use a topic-specific shared hero')
assert.ok(!header.includes('source-mri-p14.jpg'), 'The source MRI plate belongs inside the MRI chapter, not the hero')
assert.ok(page.indexOf('source-mri-p14.jpg') > page.indexOf('<Section id="mrt"'), 'The source MRI plate should be placed in the MRI chapter')
assert.ok(page.includes('mobilePath') && page.includes('aria-expanded={mobilePathOpen}'), 'Mobile chapter navigation should be available and accessible')
assert.ok(page.includes("window.history.replaceState(null, '', `#${id}`)") && page.includes("window.addEventListener('hashchange', syncHash)"), 'Chapter navigation, manual scroll, and direct links should synchronize with the URL hash')
assert.ok(page.includes('hepatozellulären Adenom') && page.includes('تقویت همگن در برابر ندول‌های محیطی همانژیوم'), 'Corrected German and Persian terminology should remain present')
const fnhEntry = curriculum.slice(curriculum.indexOf("id: 'fnh'"), curriculum.indexOf("id: 'leberadenom'"))
assert.ok(fnhEntry.includes('inProgress: true') && !fnhEntry.includes('ready: true'), 'Curriculum status must agree with the in-progress route banner')

console.log('FNH sync passed: 10 MCQs, 12 cards, source-image placement, shared hero, mobile nav, terminology and curriculum state.')
