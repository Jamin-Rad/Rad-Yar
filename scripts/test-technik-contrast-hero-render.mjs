import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { CONTRAST_GROUPS } from '../data/contrastMedia.js'
import { CONTRAST_LESSONS, CONTRAST_UI, localizeContrast } from '../data/contrastLessons.js'

const require = createRequire(import.meta.url)
const escapeHtml = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('\"','&quot;').replaceAll("'",'&#x27;')
const styles = new Proxy({}, { get: (_, key) => String(key) })
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
for (const lang of ['de', 'en', 'fa']) {
 currentLang = lang
 for (const group of CONTRAST_GROUPS) {
  currentGroup = group.id
  const html = renderToStaticMarkup(React.createElement(Page, {groupId:group.id}))
  const lesson = CONTRAST_LESSONS[group.id]
  assert.ok(html.includes('data-contrast-curriculum="2026-pdf-rebuild"'))
  assert.equal((html.match(/<h1\b/g)||[]).length,1)
  assert.ok(html.includes(escapeHtml(lesson.title[lang])))
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.ok(html.includes(CONTRAST_UI[lang].mcq) && html.includes(CONTRAST_UI[lang].flashcards))
  assert.ok(html.includes(lang==='de'?'Präsentation':lang==='en'?'Presentation':'نمای ارائه'))
  for(const section of lesson.sections) {
   assert.ok(html.includes(`id="${section.id}"`),`${group.id}/${lang}: stable chapter anchor`)
   assert.ok(html.includes(escapeHtml(section.title[lang])))
   for(const block of section.blocks) {
    if(block.type==='diagram') assert.ok(fs.existsSync(`public${block.src}`))
    if(block.type==='imageGallery') for(const image of block.images) {
     assert.ok(fs.existsSync(`public${image.src}`))
     assert.ok(html.includes(escapeHtml(image.alt[lang])) && html.includes('figcaption'))
    }
   }
  }
  assert.ok(!html.includes('andarun-galaxy'),'No tall decorative hero')
  assert.ok(html.includes('data-book-checkpoint'),'Existing questions are available in both views')
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

console.log('Five source-rebuilt contrast routes render in DE/EN/FA; stable anchors, real source assets, assessment actions and unrelated lesson isolation pass.')
