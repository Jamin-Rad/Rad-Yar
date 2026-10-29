import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { CONTRAST_GROUPS } from '../data/contrastMedia.js'
import { CONTRAST_LESSONS, CONTRAST_UI, localizeContrast } from '../data/contrastLessons.js'

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => String(key) })
const contrastStyles = fs.readFileSync('app/technik/kontrastmittel/page.module.css', 'utf8')
assert.match(contrastStyles, /\[data-lesson-hero\]\[lang='fa'\][^\{]*\.contrastHeroTitle\s*\{[^}]*font-family:\s*'Vazirmatn',\s*sans-serif;[^}]*font-size:\s*clamp\(34px,\s*4vw,\s*52px\);[^}]*letter-spacing:\s*0;[^}]*line-height:\s*1\.5;/s, 'Persian desktop title uses Vazirmatn with RTL-safe spacing and line height')
const mobileStyles = contrastStyles.slice(contrastStyles.search(/@media\s*\(max-width:\s*760px\)/))
assert.match(mobileStyles, /\[data-lesson-hero\]\[lang='fa'\][^\{]*\.contrastHeroTitle\s*\{[^}]*font-size:\s*clamp\(25px,\s*6\.5vw,\s*34px\);[^}]*line-height:\s*1\.55;/s, 'Persian mobile title retains legible sizing and line height')
// Exercise the real shared shell and presentation integration in their initial
// Classic state. Only browser routing, persistence and Next media/link adapters
// are replaced; lesson content and the shell's markup are rendered normally.
const shared = {
  'next/image': { __esModule: true, default: ({ src, alt }) => React.createElement('img', { src, alt }) },
  'next/link': { __esModule: true, default: ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children) },
  'next/navigation': { usePathname: () => `/technik/kontrastmittel/${currentGroup}` },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: currentLang }) },
  '@/hooks/useLessonReadStatus': { useLessonReadStatus: () => ({ isRead: false, toggleRead: () => {}, authError: null }) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
}
const cache = new Map()
function loadLocal(path) {
  if (cache.has(path)) return cache.get(path)
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  cache.set(path, module.exports)
  new Function('require', 'module', 'exports', source)(name => {
    if (Object.hasOwn(shared, name)) return shared[name]
    if (name.endsWith('.module.css')) return { __esModule: true, default: styles }
    const local = name.startsWith('@/') ? name.slice(2) : name.startsWith('./') ? `${path.slice(0, path.lastIndexOf('/'))}/${name.slice(2)}` : null
    if (local) {
      const resolved = [local, `${local}.jsx`, `${local}.js`, `${local}.mjs`].find(file => fs.existsSync(file))
      if (resolved.endsWith('.jsx')) return loadLocal(resolved)
      return require(`../${resolved}`)
    }
    return require(name)
  }, module, module.exports)
  cache.set(path, module.exports)
  return module.exports
}
const Page = loadLocal('app/technik/kontrastmittel/ContrastGroupPage.jsx').default

let currentLang = 'de'
let currentGroup = 'roentgen'
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
    currentGroup = group.id
    const html = renderToStaticMarkup(React.createElement(Page, { groupId: group.id }))
    const lesson = CONTRAST_LESSONS[group.id]
    const expected = expectedAssets[group.id]
    assert.ok(new RegExp(`data-lesson-hero="true"[^>]*lang="${lang}"`).test(html), `${group.id}/${lang}: shared LessonHero`)
    assert.ok(html.includes(`<h1>${lesson.title[lang]}</h1>`), `${group.id}/${lang}: semantic localized title`)
    assert.ok(html.includes(expected[0]), `${group.id}/${lang}: topic-specific visual`)
    assert.ok(html.includes('alt=') && html.includes('figcaption'), `${group.id}/${lang}: accessible visual and caption`)
    if (lang === 'fa') assert.match(html, /[\u0600-\u06ff]/u, `${group.id}/${lang}: Persian visual text`)
    else assert.ok(html.includes(expected[lang === 'de' ? 1 : 2]), `${group.id}/${lang}: localized visual explanation`)
    assert.ok(html.includes(CONTRAST_UI[lang].mcq) && html.includes(CONTRAST_UI[lang].flashcards), `${group.id}/${lang}: assessment actions retained`)
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${group.id}/${lang}: exactly one page title`)
    assert.ok(html.includes(lang === 'de' ? 'Präsentation' : lang === 'en' ? 'Presentation' : 'نمای ارائه'), `${group.id}/${lang}: presentation header action`)
    assert.ok(!html.includes('data-book-checkpoint'), `${group.id}/${lang}: presentation questions do not alter Classic`)
    assert.ok(fs.existsSync(`public${expected[0]}`), `${group.id}: hero asset exists`)
  }
}

const StandardLessonShell = loadLocal('components/lesson-template/StandardLessonShell.jsx').default
const unrelated = renderToStaticMarkup(React.createElement(StandardLessonShell, {
  lessonId: 'unrelated-lesson', lang: 'en', title: 'Unrelated lesson', author: 'Author',
  breadcrumbs: [], sections: [], renderIcon: () => null, theme: {},
}, React.createElement('p', null, 'Original content')))
assert.ok(unrelated.includes('Original content'))
assert.ok(!unrelated.includes('data-book-'), 'Other lessons do not opt in to presentation markup')
assert.ok(!unrelated.includes('Presentation'), 'Other lessons do not acquire a presentation action')

console.log('Contrast-group shared LessonHero, localized topic assets/captions, page titles and assessment actions passed SSR for all four groups in DE/EN/FA.')
