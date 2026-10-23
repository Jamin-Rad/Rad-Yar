import * as accessAssessment from '../data/technikTopicAccessAssessment.js'
import * as remainingBlocks from '../data/technikRemainingBlocks.js'
import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'

const langs = ['de', 'en', 'fa']
const sections = new Map(TECHNIK_GRUNDLAGEN.sections.map(section => [section.id, section]))
const optimization = sections.get('optimierung')
const geometry = sections.get('ct-dose-geometry')
const intervention = sections.get('intervention-3a')
assert.ok(optimization && geometry && intervention)
assert.equal(optimization.curriculumId, 'alara')
assert.equal(geometry.curriculumId, 'ct-dosisreduktion')
assert.equal(intervention.curriculumId, 'interventioneller-strahlenschutz')
assert.equal(optimization.pages, '10–11')
assert.equal(geometry.pages, '11–14')
assert.equal(intervention.pages, '15')
assert.equal(optimization.rows.length, 3)
assert.equal(geometry.rows.length, 3)
assert.equal(geometry.visuals.length, 1)
assert.ok(geometry.references.some(item => item.href.includes('rpt_111.pdf')))
assert.ok(intervention.references.some(item => item.href.includes('PUB1775_web.pdf')))

function inspect(value, path = 'lesson') {
  if (!value || typeof value !== 'object') return
  if (langs.some(lang => Object.hasOwn(value, lang))) {
    for (const lang of langs) {
      assert.equal(typeof value[lang], 'string', `${path}.${lang} must exist`)
      assert.ok(value[lang].trim(), `${path}.${lang} must not be empty`)
      if (lang !== 'fa') assert.ok(!/[\u0600-\u06ff]/u.test(value[lang]), `${path}.${lang} contains Persian text`)
    }
    return
  }
  for (const [key, child] of Object.entries(value)) inspect(child, `${path}.${key}`)
}
inspect(optimization, 'optimization')
inspect(geometry, 'geometry')
inspect(intervention, 'intervention')
assert.match(geometry.rows[1][1].fa, /پیشروی تخت/)
assert.match(geometry.rows[2][1].fa, /پهنای بخش فعال آشکارساز/)
assert.match(intervention.lead.fa, /پراکندگی پرتو از بیمار/)

const require = createRequire(import.meta.url)
let activeLang = 'de'
const styles = new Proxy({}, { get: (_, key) => String(key) })
const assessmentModule = { exports: {} }
new Function('require', 'module', 'exports', transformSync(fs.readFileSync('components/lesson-template/TopicAssessment.jsx','utf8'), {loader:'jsx',jsx:'automatic',format:'cjs'}).code)(require,assessmentModule,assessmentModule.exports)
const replacements = {
  '@/components/lesson-template/TopicAssessment': assessmentModule.exports,
  '@/data/technikTopicAccessAssessment': accessAssessment,
  '@/data/technikRemainingBlocks': remainingBlocks,
  'next/link': { __esModule: true, default: ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children) },
  '@/components/Footer': { __esModule: true, default: () => React.createElement('footer') },
  '@/components/lesson-template/StandardLessonShell': { __esModule: true, default: ({ children, lang, syncHashNavigation, sections, sources }) => React.createElement('main', { lang, 'data-shell': 'StandardLessonShell', 'data-sync-hash': syncHashNavigation, 'data-section-count': sections.length }, children, sources), LessonSection: ({ id, title, children }) => React.createElement('section', { id }, React.createElement('h2', null, title), children), LessonSources: ({ title, items }) => React.createElement('aside', null, React.createElement('h2', null, title), items.map(item => React.createElement('div', { key: item.href }, React.createElement('small', null, item.tag), React.createElement('a', { href: item.href }, item.title), React.createElement('p', null, item.citation), React.createElement('p', null, item.scope)))) },
  '@/components/InProgressBanner': { __esModule: true, default: () => React.createElement('aside', null, 'in progress') },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLang }) },
  '@/data/technikGrundlagenLesson': { TECHNIK_GRUNDLAGEN },
  './completion.module.css': { __esModule: true, default: styles },
  '../kontrastmittel/page.module.css': { __esModule: true, default: styles },
}
const source = transformSync(fs.readFileSync('app/technik/grundlagen/StandardPage.jsx', 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const module = { exports: {} }
new Function('require', 'module', 'exports', source)((name) => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
const Page = module.exports.default
for (const lang of langs) {
  activeLang = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`))
  assert.ok(html.includes('data-shell="StandardLessonShell"') && html.includes('data-sync-hash="true"'))
  assert.ok(html.includes('/technik/ct-optimization.svg'))
  assert.ok(html.includes('Pitch') || html.includes('pitch'))
  assert.ok(html.includes('aria-pressed="false"') && html.includes('role="img"'))
  assert.ok(html.includes('IAEA') && html.includes('AAPM') && html.includes('3A'))
  assert.ok(html.includes(lang === 'fa' ? 'منبع تخصصی' : lang === 'en' ? 'Technical source' : 'Fachquelle'))
  assert.ok(html.includes(lang === 'fa' ? 'متن رسمی قانون' : lang === 'en' ? 'Official legal text' : 'Amtlicher Gesetzestext'))
  if (lang !== 'de') assert.ok(!html.includes('Amtlicher Gesetzestext'))
  assert.ok(html.includes(lang === 'fa' ? 'حفاظ' : lang === 'en' ? 'Shield' : 'Schutzschirm'))
  assert.ok(html.includes(lang === 'fa' ? 'خودآزمایی' : lang === 'en' ? 'Self-check' : 'Selbstcheck'))
  assert.ok(html.includes(optimization.title[lang]) && html.includes(geometry.title[lang]))
  assert.ok(html.includes('pitch') || html.includes('Pitch'))
}

const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
for (const [id, anchor] of [['alara', 'optimierung'], ['ct-dosisreduktion', 'ct-dose-geometry'], ['interventioneller-strahlenschutz', 'intervention-3a']]) {
  assert.match(curriculum, new RegExp(`id: '${id}'[^\\n]+link: '/technik/grundlagen#${anchor}'[^\\n]+inProgress: true`))
}
const svg = fs.readFileSync('public/technik/ct-optimization.svg', 'utf8')
assert.match(svg, /p = Δz \/ nT/)
assert.doesNotMatch(svg, /feed \/ rotation|active rows|planned range|extra end exposure|helical overrange/)
console.log('CT optimization lesson render and curriculum links passed in DE/EN/FA.')
