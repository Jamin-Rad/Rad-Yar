import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_BERUFSDOSIMETRIE_LESSON as lesson } from '../data/technikBerufsdosimetrieLesson.js'

const langs = ['de', 'en', 'fa']
const persian = /[\u0600-\u06ff]/u
let units = 0
function inspect(value) {
  if (!value || typeof value !== 'object') return
  if (langs.every(lang => typeof value[lang] === 'string')) {
    units++
    assert.ok(langs.every(lang => value[lang].trim()), 'translation must not be empty')
    assert.ok(!persian.test(value.de) && !persian.test(value.en) && persian.test(value.fa), 'translation stored in wrong language slot')
  } else Object.values(value).forEach(inspect)
}
inspect(lesson)
assert.equal(lesson.id, 'berufsdosimetrie')
assert.equal(lesson.chapters.length, 3)
assert.equal(lesson.question.answer, 1)
assert.equal(lesson.question.options.length, 3)
assert.equal(lesson.summary.length, 3)
assert.match(lesson.chapters[1].paragraphs[0].de, /Thermolumineszenzdosimeter \(TLD\)/)
assert.match(lesson.chapters[1].paragraphs[0].en, /optical stimulation/)
assert.match(lesson.chapters[2].paragraphs[0].de, /nach Ablauf eines Monats/)
assert.match(lesson.chapters[2].paragraphs[0].de, /bis zu drei Monaten gestatten/)
assert.match(lesson.chapters[2].paragraphs[0].de, /§ 66 Absatz 1 Nummer 1/)
assert.match(lesson.chapters[2].paragraphs[0].en, /section 66\(1\)\(2\)/)
assert.match(lesson.chapters[2].paragraphs[1].fa, /مادهٔ ۶۶ بند ۵/)
assert.match(lesson.chapters[2].paragraphs[2].fa, /شناسهٔ شخصی/)
assert.match(lesson.question.options[1].fa, /روش تأییدشده/)
assert.ok(!lesson.chapters[1].paragraphs.some(row => /Schwangere|pregnant|باردار/.test(`${row.de} ${row.en} ${row.fa}`)), "do not generalize the source's pregnant-visitor claim")

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => String(key) })
const replacements = {
  './page.module.css': { __esModule: true, default: styles },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLang }) },
  '@/components/lesson-template/StandardLessonShell': {
    __esModule: true,
    default: ({ children, lang, title, sections, theme, heroImageAlt, sources }) => React.createElement('main', { lang, dir: lang === 'fa' ? 'rtl' : 'ltr', 'data-lesson-title': title, 'data-hero': theme.heroImage, 'data-hero-alt': heroImageAlt, 'data-section-ids': sections.map(section => section.id).join(',') }, children, sources),
    LessonSection: ({ id, title, children }) => React.createElement('section', { id, 'aria-label': title }, children),
    LessonSources: ({ title, items, note }) => React.createElement('aside', { 'data-sources': items.map(item => item.href).join('|'), 'data-source-scopes': items.map(item => item.scope).join('|'), 'data-source-note': note }, title),
  },
  '@/data/technikBerufsdosimetrieLesson': { TECHNIK_BERUFSDOSIMETRIE_LESSON: lesson },
}
function compile(path) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)((name) => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports.default
}
let activeLang = 'de'
const Page = compile('app/technik/berufsdosimetrie/page.jsx')
const htmlFor = lang => { activeLang = lang; return renderToStaticMarkup(React.createElement(Page)) }
const route = fs.readFileSync('app/technik/berufsdosimetrie/page.jsx', 'utf8')
assert.ok(route.includes('StandardLessonShell') && route.includes('syncHashNavigation') && route.includes('pick(answer === lesson.question.answer ? lesson.question.feedback'))
for (const lang of langs) {
  const html = htmlFor(lang)
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  assert.ok(html.includes('data-hero="/technik/berufsdosimetrie/hero.svg"') && html.includes(lesson.heroAlt[lang]), `${lang}: localized topic-specific hero`)
  assert.ok(html.includes('data-section-ids="what-it-measures,dosimeter-types,evaluation-and-record,take-home"'), `${lang}: lesson navigation`)
  for (const chapter of lesson.chapters) assert.ok(html.includes(`aria-label="${chapter.title[lang]}"`), `${lang}: chapter title ${chapter.id}`)
  for (const option of lesson.question.options) assert.ok(html.includes(option[lang]), `${lang}: assessment option`)
  assert.ok(html.includes('https://www.gesetze-im-internet.de/strlschv_2018/__66.html') && html.includes('https://www.gesetze-im-internet.de/strlschg/__170.html'), `${lang}: current German legal sources`)
}
const ledger = fs.readFileSync('docs/lesson-quality/technik-berufsdosimetrie-p9.md', 'utf8')
assert.match(ledger, /PDF p\. 9 \/ printed p\. 8/)
assert.match(ledger, /§66\(3\)[\s\S]*?up to three months/)
assert.match(fs.readFileSync('public/technik/berufsdosimetrie/hero.svg', 'utf8'), /secure person-linked record/)
console.log(`Occupational dosimetry lesson audit PASS: ${units} localized units; DE/EN/FA static route render and RTL; three chapters; 3-option explanatory check; current official German legal references; source ledger and schematic.`)
