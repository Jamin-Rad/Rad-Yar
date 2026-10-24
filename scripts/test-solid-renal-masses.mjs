import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { CURRICULUM } from '../data/curriculum.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { QUESTION_BANK, getQuestions } from '../data/questions.js'

const allTopics = value => Array.isArray(value) ? value.flatMap(allTopics) : value && typeof value === 'object' ? [...(value.id ? [value] : []), ...Object.values(value).flatMap(allTopics)] : []
const topics = allTopics(CURRICULUM)
const ids = ['angiomyolipom', 'onkozytom-niere', 'nierenzellkarzinom']
for (const id of ids) {
  const topic = topics.find(item => item.id === id)
  assert.ok(topic, `${id} exists`)
  assert.equal(topic.link, '/abdomen/niere/raumforderungen')
  assert.equal(topic.inProgress, true)
  assert.equal(topic.flashcardLink, '/flashcards/solide-nierenmassen')
}

for (const lang of ['de', 'en', 'fa']) {
  for (const id of ids) {
    const qs = getQuestions([id], lang, 10)
    assert.ok(qs.length >= 1, `${lang}/${id}: quiz link resolves`)
    assert.ok(qs.every(q => q.options.length === 4 && q.explanation?.length > 30 && q.source?.includes('Abdomen.pdf')))
  }
  for (const card of getCardsByTopic('solide-nierenmassen')) {
    for (const field of ['front', 'answer', 'explanation']) assert.ok(card[field][lang].length > 8)
  }
}
assert.equal(getCardsByTopic('solide-nierenmassen').length, 6)
assert.equal(FLASHCARD_TOPICS.filter(item => item.id === 'solide-nierenmassen').length, 1)
assert.equal(getQuestions(['angiomyolipom'], 'de', 10).length, 2)
assert.equal(getQuestions(['onkozytom-niere'], 'de', 10).length, 1)
assert.equal(getQuestions(['nierenzellkarzinom'], 'de', 10).length, 2)

const route = fs.readFileSync(new URL('../app/abdomen/niere/raumforderungen/page.js', import.meta.url), 'utf8')
const ledger = fs.readFileSync(new URL('../docs/lesson-quality/renal-masses-abdomen-p46-p51.md', import.meta.url), 'utf8')
const hero = fs.readFileSync(new URL('../public/educational/renal-masses/hero.svg', import.meta.url), 'utf8')
assert.match(route, /LessonHero|heroImageAlt/)
assert.match(route, /lessonId="abdomen-renal-masses"/)
assert.match(route, /aria-live|role="status"/)
assert.match(ledger, /physical p\.50[\s\S]*user[’']s explicit project-wide permission/i)
assert.match(ledger, /polycystic kidney disease/i)
assert.match(hero, /not patient imaging|not a patient image/i)
for (const text of ['solid renal mass', 'Nierenraumforderung', 'توده']) assert.ok(route.includes(text), `source/translation marker ${text}`)

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
const compile = (path, replacements) => {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const observeLessonHash = () => () => {}
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: (_id, ids) => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': ({ title, imageSrc, imageAlt }) => React.createElement('div', { className: 'hero', role: 'img', 'aria-label': imageAlt }, title, imageSrc),
  '@/lib/lessonHashNavigation': { observeLessonHash }, './StandardLessonShell.module.css': styles,
})
const contextAdditions=compile('components/lesson-template/AbdomenContextAdditions.jsx',{})
const practiceActions=compile('app/abdomen/gi/ulkuserkrankung/ExistingPracticeActions.jsx',{'next/link':Link,'./page.module.css':styles})
let lang = 'de'
const Page = compile('app/abdomen/niere/raumforderungen/page.js', {
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/components/lesson-template/AbdomenContextAdditions':contextAdditions,
  './page.module.css': styles,
}).default
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.match(html, new RegExp(`lang="${locale}"`))
  assert.match(html, new RegExp(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes('/educational/renal-masses/hero.svg'))
  assert.ok(html.includes('/educational/renal-masses/aml-axial-ct.png'))
  assert.ok(html.includes(locale === 'de' ? 'portalvenösen/nephrographischen' : locale === 'en' ? 'portal venous/nephrographic' : 'پورتوونوز/نفروگرافیک'))
  assert.ok(html.includes(locale === 'de' ? 'ink-artifact' : locale === 'en' ? 'ink artifact' : 'ink-artifact'))
  assert.ok(html.includes(locale === 'de' ? 'Wähle die beste Antwort.' : locale === 'en' ? 'Choose the best answer.' : 'بهترین پاسخ را انتخاب کنید.'))
  assert.ok(html.includes('role="status"') === false, 'feedback is hidden before an answer is selected')
}
console.log('Solid renal mass curriculum links, localized 4-option questions, flashcards, visual and source ledger passed.')
