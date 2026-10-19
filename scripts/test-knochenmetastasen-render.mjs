import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import sharp from 'sharp'
import { KNOCHENMETASTASEN_LESSON as lesson } from '../data/knochenmetastasenLesson.js'

const require = createRequire(import.meta.url)
let activeLanguage = 'de'
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compileExports(file, replacements) {
  const source = transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const mod = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), mod, mod.exports)
  return mod.exports
}
const Shell = compileExports('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => [new Set(), () => {}] },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageSrc, imageAlt }) => React.createElement('div', { 'data-hero-title': title, 'data-hero-image': imageSrc, 'aria-label': imageAlt }) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': styles,
})
const Page = compileExports('app/msk/tumoren/knochenmetastasen/page.jsx', {
  'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
  '@/components/lesson-template/StandardLessonShell': { ...Shell, __esModule: true, default: Shell.default, LessonSection: Shell.LessonSection, LessonSources: Shell.LessonSources },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  '@/data/knochenmetastasenLesson': { KNOCHENMETASTASEN_LESSON: lesson },
  './page.module.css': styles,
}).default

function assertLocalized(value, key = 'lesson') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertLocalized(item, `${key}[${index}]`))
  if (!value || typeof value !== 'object') return
  if (Object.keys(value).some(locale => ['de', 'en', 'fa'].includes(locale))) {
    for (const locale of ['de', 'en', 'fa']) assert.ok(typeof value[locale] === 'string' && value[locale].length > 0, `${key}.${locale} translated`)
    return
  }
  for (const [childKey, child] of Object.entries(value)) assertLocalized(child, `${key}.${childKey}`)
}

assertLocalized(lesson)
assert.equal(lesson.id, 'knochenmetastasen')
assert.equal(lesson.sections.length, 3)
assert.equal(lesson.check.options.length, 3)
assert.equal(lesson.check.answer, 0)
assert.equal(lesson.sections[1].diagram, true)
assert.match(lesson.sections[0].rows[0][1].en, /renal-cell/)
assert.match(lesson.sections[1].rows[1][1].de, /Kortikalis/)
assert.match(lesson.sections[2].rows[1][1].en, /grey zone/)
assert.match(lesson.sourceNote.en, /80% figure.*omitted/i)
const provenance = JSON.parse(fs.readFileSync('public/educational/knochenmetastasen/image-provenance.json', 'utf8'))
assert.equal(provenance.assets.length, 1, 'only the original conceptual hero remains')
assert.ok(!lesson.references.some(reference => reference.href === '#'), 'no placeholder reference links')
assert.ok(!JSON.stringify(lesson).includes('rID 21937'), 'low-resolution case is not included in lesson data')
assert.match(lesson.summary[0].fa, /لیتیک/)
assert.doesNotMatch(lesson.summary[0].fa, /لیتیك/)
assert.match(fs.readFileSync('public/educational/knochenmetastasen/hero.svg', 'utf8'), /Non-diagnostic comparison/)

for (const locale of ['de', 'en', 'fa']) {
  activeLanguage = locale
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language and direction`)
  assert.ok(html.includes(lesson.title[locale]), `${locale}: localized title`)
  assert.ok(html.includes(lesson.sourceNote[locale]) && html.includes('MSK.pdf'), `${locale}: source scope`)
  assert.ok(html.includes('/educational/knochenmetastasen/hero.svg'), `${locale}: topic hero`)
  assert.ok(html.includes('modality-diagram-title') && html.includes('modality-diagram-desc'), `${locale}: accessible modality diagram`)
  assert.ok(html.includes(locale === 'fa' ? 'الگوی استخوانی چیست؟' : locale === 'de' ? 'Welches Knochenmuster?' : 'What is the bone pattern?'), `${locale}: modality maps to learner question`)
  const modalityPairs = {
    de: [['Röntgen', 'Welches Knochenmuster?'], ['CT', 'Wie sind Matrix und Kortikalis?'], ['MRT', 'Ist das Knochenmark betroffen?'], ['Szintigraphie', 'Wo reagiert der Knochenumbau?']],
    en: [['Radiograph', 'What is the bone pattern?'], ['CT', 'What are the matrix and cortex like?'], ['MRI', 'Is the marrow involved?'], ['Scintigraphy', 'Where is bone turnover active?']],
    fa: [['رادیوگرافی', 'الگوی استخوانی چیست؟'], ['CT', 'وضعیت ماتریکس و کورتکس چگونه است؟'], ['MRI', 'آیا مغز استخوان درگیر است؟'], ['اسکن استخوان', 'بازسازی استخوان در کجا فعال است؟']]
  }
  for (const [method, question] of modalityPairs[locale]) assert.ok(html.includes(method) && html.includes(question), `${locale}: ${method} → question`)
  assert.ok(html.includes(lesson.check.prompt[locale]) && html.includes(lesson.check.options[0][locale]), `${locale}: self-check`)
  for (const section of lesson.sections) assert.ok(html.includes(`id="${section.id}"`) && html.includes(section.title[locale]), `${locale}: ${section.id}`)
  assert.ok(html.includes(lesson.summary[0][locale]), `${locale}: take-home points`)
  assert.ok(html.includes('https://pubmed.ncbi.nlm.nih.gov/2684463/'), `${locale}: Mirels primary reference`)
}

const rendered = await sharp('public/educational/knochenmetastasen/hero.svg').metadata()
assert.ok(rendered.width >= 700 && rendered.height >= 400, 'hero dimensions')
console.log('Bone metastases SSR, translations, modality diagram, source and assessment checks passed for DE/EN/FA.')
