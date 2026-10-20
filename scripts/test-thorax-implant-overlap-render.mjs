import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { CURRICULUM } from '../data/curriculum.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
let activeLanguage = 'de'
const source = transformSync(fs.readFileSync(path.join(root, 'app/thorax/roentgen-thorax-systematik/page.js'), 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const module = { exports: {} }
new Function('require', 'module', 'exports', source)(name => {
  if (name === 'next/link') return { __esModule: true, default: Link }
  if (name === '@/providers/LanguageProvider') return { useLanguage: () => ({ lang: activeLanguage }) }
  if (name === '@/components/LessonReferenceShell') return { __esModule: true, default: ({ children }) => React.createElement(React.Fragment, null, children) }
  if (name.endsWith('.module.css')) return styles
  return require(name)
}, module, module.exports)
const Page = module.exports.default
const text = {
  de: ['Überlagerung durch Brustimplantate', 'zwei konzentrische Konturen', 'normales Brustgewebe', 'Implantatkapsel', 'physische PDF-Seite 27 (gedruckte Seite 26)'],
  en: ['Breast implant superimposition', 'Two concentric contours', 'normal breast tissue', 'implant capsule', 'physical PDF p.27 (printed p.26)'],
  fa: ['هم‌پوشانی ایمپلنت پستان', 'دو حاشیه متحدالمرکز', 'بافت طبیعی پستان', 'کپسول ایمپلنت', 'صفحهٔ فیزیکی ۲۷ PDF (شمارهٔ چاپی ۲۶)'],
}

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  for (const phrase of text[lang]) assert.ok(html.includes(phrase), `${lang}: rendered implant-overlap cue includes ${phrase}`)
  assert.match(html, /intrapulmonal|intrapulmonary|داخل ریه/)
}

const matches = []
const visit = value => {
  if (!value) return
  if (Array.isArray(value)) return value.forEach(visit)
  if (typeof value !== 'object') return
  if (value.id === 'roentgen-thorax-systematik') matches.push(value)
  Object.values(value).forEach(visit)
}
visit(CURRICULUM)
assert.ok(matches.some(item => item.link === '/thorax/roentgen-thorax-systematik'), 'existing exact curriculum ID stays linked to the route')
const ledger = fs.readFileSync(path.join(root, 'docs/lesson-quality/source-ledgers/chest-xray-implant-overlap-thorax-p27.md'), 'utf8')
assert.match(ledger, /physical PDF p\.27 \/ printed p\.26/)
assert.match(ledger, /rID 26714/)
assert.match(ledger, /No implant integrity, rupture, complication, or mammographic interpretation claim/)
console.log('Thorax.pdf physical p.27 / printed p.26 implant-overlap actual-route SSR PASS: DE/EN/FA, RTL, bounded visual cue, exact source and existing curriculum route.')
