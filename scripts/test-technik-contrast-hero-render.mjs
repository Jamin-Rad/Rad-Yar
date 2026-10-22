import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { CONTRAST_GROUPS, getContrastGroup } from '../data/contrastMedia.js'
import { CONTRAST_LESSONS, CONTRAST_UI, localizeContrast } from '../data/contrastLessons.js'

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => String(key) })
const contrastStyles = fs.readFileSync('app/technik/kontrastmittel/page.module.css', 'utf8')
assert.match(contrastStyles, /\[data-lesson-hero\]\[lang='fa'\][^\{]*\.contrastHeroTitle\s*\{[^}]*font-family:\s*'Vazirmatn',\s*sans-serif;[^}]*font-size:\s*clamp\(34px,\s*4vw,\s*52px\);[^}]*letter-spacing:\s*0;[^}]*line-height:\s*1\.5;/s, 'Persian desktop title uses Vazirmatn with RTL-safe spacing and line height')
const mobileStyles = contrastStyles.slice(contrastStyles.search(/@media\s*\(max-width:\s*760px\)/))
assert.match(mobileStyles, /\[data-lesson-hero\]\[lang='fa'\][^\{]*\.contrastHeroTitle\s*\{[^}]*font-size:\s*clamp\(25px,\s*6\.5vw,\s*34px\);[^}]*line-height:\s*1\.55;/s, 'Persian mobile title retains legible sizing and line height')
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)((name) => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}

const Page = compile('app/technik/kontrastmittel/ContrastGroupPage.jsx', {
  'next/image': { __esModule: true, default: ({ src, alt }) => React.createElement('img', { src, alt }) },
  'next/link': { __esModule: true, default: ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children) },
  '@/components/Navbar': { __esModule: true, default: () => React.createElement('nav') },
  '@/components/InProgressBanner': { __esModule: true, default: () => React.createElement('aside') },
  '@/components/LessonHero': { __esModule: true, default: ({ title, visual, visualCaption, lang }) => React.createElement('div', { 'data-lesson-hero': true, lang }, React.createElement('h1', null, title), React.createElement('figure', null, visual, React.createElement('figcaption', null, visualCaption))) },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: currentLang }) },
  '@/hooks/useLessonReadStatus': { useLessonReadStatus: () => ({ isRead: false, toggleRead: () => {}, authError: null }) },
  '@/hooks/useMobileLearningLayout': { useMobileLearningLayout: () => false },
  '@/data/contrastMedia': { CONTRAST_GROUPS, getContrastGroup },
  '@/data/contrastLessons': { CONTRAST_LESSONS, CONTRAST_UI, localizeContrast },
  './page.module.css': { __esModule: true, default: styles },
}).default

let currentLang = 'de'
const expectedAssets = {
  roentgen: ['/educational/xray-contrast-attenuation.svg', 'Weichteilgewebe', 'Soft tissue'],
  nierenfunktion: ['/educational/renal-contrast-pass.svg', 'Applikationsweg und renale Erstpassage', 'Administration route and renal first pass'],
  mrt: ['/educational/gadolinium-chelate.svg', 'Chelatgeometrie', 'Chelate geometry'],
  schwangerschaft: ['/educational/pregnancy-contrast-pathways.svg', 'Plazentapassage', 'placental transfer'],
}
const groupsUnderTest = CONTRAST_GROUPS.filter(group => Object.hasOwn(expectedAssets, group.id))
assert.equal(groupsUnderTest.length, 4)

for (const lang of ['de', 'en', 'fa']) {
  currentLang = lang
  for (const group of groupsUnderTest) {
    const html = renderToStaticMarkup(React.createElement(Page, { groupId: group.id }))
    const lesson = CONTRAST_LESSONS[group.id]
    const expected = expectedAssets[group.id]
    assert.ok(html.includes(`data-lesson-hero="true" lang="${lang}"`), `${group.id}/${lang}: shared LessonHero`)
    assert.ok(html.includes(`<h1>${lesson.title[lang]}</h1>`), `${group.id}/${lang}: semantic localized title`)
    assert.ok(html.includes(expected[0]), `${group.id}/${lang}: topic-specific visual`)
    assert.ok(html.includes('alt=') && html.includes('figcaption'), `${group.id}/${lang}: accessible visual and caption`)
    if (lang === 'fa') assert.match(html, /[\u0600-\u06ff]/u, `${group.id}/${lang}: Persian visual text`)
    else assert.ok(html.includes(expected[lang === 'de' ? 1 : 2]), `${group.id}/${lang}: localized visual explanation`)
    assert.ok(html.includes(CONTRAST_UI[lang].mcq) && html.includes(CONTRAST_UI[lang].flashcards), `${group.id}/${lang}: assessment actions retained`)
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${group.id}/${lang}: exactly one page title`)
    assert.ok(fs.existsSync(`public${expected[0]}`), `${group.id}: hero asset exists`)
  }
}

console.log('Contrast-group shared LessonHero, localized topic assets/captions, page titles and assessment actions passed SSR for all four groups in DE/EN/FA.')
