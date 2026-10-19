import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import * as data from '../data/technikGrundlagenLesson.js'

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}

const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Hero = compile('components/LessonHero.jsx', { 'next/image': ({ fill, priority, ...props }) => React.createElement('img', props), './LessonHero.module.css': styles }).default
let activeLanguage = 'de'
const Page = compile('app/technik/grundlagen/page.jsx', {
  'next/link': Link,
  '@/components/Footer': () => React.createElement('footer'),
  '@/components/LessonHero': Hero,
  '@/components/InProgressBanner': () => React.createElement('aside'),
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/technikGrundlagenLesson': data,
  '../kontrastmittel/page.module.css': styles,
}).default
const section = data.TECHNIK_GRUNDLAGEN.sections.find(item => item.id === 'wirkung')
assert.ok(section, 'PDF pp. 2–3 section exists')
const escape = value => renderToStaticMarkup(React.createElement(React.Fragment, null, value))

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: page language and direction`)
  assert.ok(html.includes('id="wirkung"'), `${lang}: section anchor`)
  assert.ok(html.includes('src="/technik/strahlenbiologie/dosis-wirkung.svg"'), `${lang}: conceptual diagram`)
  assert.ok(html.includes(escape(section.visuals[0].alt[lang])) && html.includes(escape(section.visuals[0].caption[lang])), `${lang}: localized visual description`)
  assert.ok(html.includes(escape(section.rows[0][1][lang])) && html.includes(escape(section.rows[4][1][lang])), `${lang}: localized mechanisms and effect distinction`)
  assert.ok(html.includes(escape(section.references[0].label[lang])) && html.includes(escape(section.references[2].label[lang])), `${lang}: localized scientific sources`)
  assert.ok(html.includes('id="radiation-effects-check"') && html.includes(escape(lang === 'de' ? 'Selbstcheck: Wahrscheinlichkeit oder Schwere?' : lang === 'en' ? 'Self-check: probability or severity?' : 'خودآزمایی: احتمال یا شدت؟')), `${lang}: embedded explanatory check`)
  const question = html.match(/id="radiation-effects-check"[\s\S]*?<div style="display:grid;gap:8px">([\s\S]*?)<\/div>/)?.[1] || ''
  assert.equal((question.match(/<button/g) || []).length, 3, `${lang}: three answer options`)
}

console.log('Technique radiation biology actual-route semantic SSR PASS: DE/EN/FA, RTL direction, section anchor, localized conceptual diagram, sources and self-check.')
