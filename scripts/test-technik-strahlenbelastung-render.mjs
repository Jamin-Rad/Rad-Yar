import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_STRAHLENBELASTUNG_LESSON as lesson } from '../data/technikStrahlenbelastungLesson.js'

assert.match(fs.readFileSync('data/curriculum.js', 'utf8'), /id: 'strahlenbelastung-medizin'[^\n]*link: '\/technik\/strahlenbelastung'/)

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
assert.equal(lesson.id, 'strahlenbelastung-medizin')
assert.equal(lesson.chapters.length, 4)
assert.equal(lesson.question.answer, 1)
assert.equal(lesson.question.options.length, 3)
assert.equal(lesson.summary.length, 3)
assert.match(lesson.chapters[1].paragraphs[0].de, /Sonnenaktivität/)
assert.match(lesson.chapters[1].paragraphs[0].en, /solar activity/)
assert.match(lesson.chapters[1].paragraphs[0].fa, /فعالیت خورشیدی/)
assert.match(lesson.question.options[0].de, /historische BfS-Mittelwert/)
assert.match(lesson.question.options[2].en, /collective dose/)
assert.match(lesson.chapters[0].paragraphs[1].de, /undatierte Unterrichtsangaben/)
assert.match(lesson.chapters[2].paragraphs[0].en, /2007–2018 data/)
assert.match(lesson.chapters[2].paragraphs[0].de, /größte Beitrag zur zivilisatorischen Exposition/)
assert.match(lesson.question.feedback.fa, /دوز فردی نیست/)
for (const chapter of lesson.chapters) assert.ok(chapter.title.de && chapter.title.en && chapter.title.fa, `${chapter.id}: translated heading`)

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
  '@/data/technikStrahlenbelastungLesson': { TECHNIK_STRAHLENBELASTUNG_LESSON: lesson },
}
function compile(path) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)((name) => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports.default
}
let activeLang = 'de'
const Page = compile('app/technik/strahlenbelastung/page.jsx')
const htmlFor = lang => { activeLang = lang; return renderToStaticMarkup(React.createElement(Page)) }
const route = fs.readFileSync('app/technik/strahlenbelastung/page.jsx', 'utf8')
assert.ok(route.includes('StandardLessonShell') && route.includes('syncHashNavigation') && route.includes('pick(lesson.question.feedback, lang)'))
for (const lang of langs) {
  const html = htmlFor(lang)
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  assert.ok(html.includes('data-hero="/technik/strahlenbelastung/hero.svg"') && html.includes(lesson.heroAlt[lang]), `${lang}: localized topic schematic`)
  assert.ok(html.includes('data-section-ids="population-average,natural-sources,medical-exposure,decision,take-home"'), `${lang}: section navigation`)
  for (const chapter of lesson.chapters) assert.ok(html.includes(`aria-label="${chapter.title[lang]}"`), `${lang}: chapter title ${chapter.id}`)
  for (const option of lesson.question.options) assert.ok(html.includes(option[lang]), `${lang}: localized self-check option`)
  assert.ok(html.includes('https://doris.bfs.de/jspui/handle/urn:nbn:de:0221-2023092039261') && html.includes('https://www.icrp.org/publication.asp?id=ICRP+Publication+103'), `${lang}: source references`)
  assert.ok(html.includes('Zahlen ohne erkennbaren Bezugszeitraum') || lang !== 'de', 'German note warns about undated source figures')
}
assert.match(fs.readFileSync('public/technik/strahlenbelastung/hero.svg', 'utf8'), /conceptual illustration/i)
console.log(`Population-radiation lesson audit PASS: ${units} localized units; DE/EN/FA static route render and RTL; 4 chapters; explanatory 3-option check; localized map; dated source scope.`)
