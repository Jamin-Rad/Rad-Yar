import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import { SCHWANNOMA_CPA } from '../data/gehirnSchwannomaCpaLesson.js'
import { HAEMANGIOBLASTOMA_VHL } from '../data/gehirnHaemangioblastomaVhlLesson.js'

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = props => React.createElement('a', props)
const Hero = compile('components/LessonHero.jsx', { 'next/image': ({ fill, priority, ...props }) => React.createElement('img', props), './LessonHero.module.css': styles }).default
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
const data = { SCHWANNOMA_CPA, HAEMANGIOBLASTOMA_VHL }
const lessonComponent = compile('components/brain/BrainTumorLesson.jsx', {
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  './BrainTumorLesson.module.css': styles,
}).default
let activeLanguage = 'de'
const routeSpecs = [
  ['schwannom-cpa', SCHWANNOMA_CPA, 'app/gehirn/tumoren/schwannom-cpa/page.jsx'],
  ['haemangioblastom-vhl', HAEMANGIOBLASTOMA_VHL, 'app/gehirn/tumoren/haemangioblastom-vhl/page.jsx'],
]
const htmlText = text => renderToStaticMarkup(React.createElement(React.Fragment, null, text))
const visit = (value, path, found) => {
  if (Array.isArray(value)) return value.forEach((item, index) => visit(item, `${path}[${index}]`, found))
  if (!value || typeof value !== 'object') return
  if (['de', 'en', 'fa'].every(lang => typeof value[lang] === 'string')) {
    found.push([path, value])
    for (const lang of ['de', 'en', 'fa']) assert.ok(value[lang].trim().length > 1, `${path}/${lang} empty`)
    if (value.fa.length > 24) assert.match(value.fa, /[\u0600-\u06FF]/u, `${path}/fa lacks Persian script`)
    return
  }
  for (const [key, item] of Object.entries(value)) visit(item, `${path}.${key}`, found)
}

for (const [name, lesson, routePath] of routeSpecs) {
  const routeText = fs.readFileSync(routePath, 'utf8')
  assert.match(routeText, /BrainTumorLesson/u)
  const found = []
  visit(lesson, name, found)
  assert.ok(found.length > 40, `${name}: unexpected localization count ${found.length}`)
  assert.deepEqual(lesson.sections.at(-1).takeaways.length, 4)
  assert.equal(lesson.sections.find(section => section.check)?.check.options.length, 3)
  assert.equal(lesson.sections.find(section => section.check)?.check.feedback.length, 3)
  const imageAlt = lesson.sections.find(section => section.image).image.alt
  assert.match(imageAlt.de, /Gehirn\.pdf/u, `${name}: German alt is not German`)
  assert.match(imageAlt.en, /Gehirn\.pdf/u, `${name}: English alt is missing source context`)
  assert.match(imageAlt.fa, /صفحه/u, `${name}: Persian alt is missing localized source context`)
  if (name === 'schwannom-cpa') {
    assert.match(lesson.sections.find(section => section.image).image.task.en, /whether a distinct cisternal component is visible/u)
    assert.match(lesson.sections.find(section => section.image).image.caption.en, /not established by these crops/u)
  } else {
    assert.match(lesson.sections.find(section => section.id === 'mri').paragraphs[0].en, /FLAIR signal can vary/u)
    assert.match(lesson.sections.find(section => section.image).image.task.en, /flow voids are not confidently demonstrated/u)
  }
  for (const lang of ['de', 'en', 'fa']) {
    activeLanguage = lang
    const html = renderToStaticMarkup(React.createElement(lessonComponent, { lesson }))
    assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${name}/${lang}: language direction`)
    assert.ok(html.includes(htmlText(lesson.title[lang])), `${name}/${lang}: title`)
    assert.ok(html.includes(`alt="${htmlText(lesson.heroAlt[lang])}"`), `${name}/${lang}: localized hero alt`)
    const check = lesson.sections.find(section => section.check).check
    assert.ok(html.includes(htmlText(check.question[lang])), `${name}/${lang}: check question`)
    check.options.forEach(item => assert.ok(html.includes(htmlText(item[lang])), `${name}/${lang}: option`))
    check.feedback.forEach(item => assert.ok(item[lang].trim().length > 20), `${name}/${lang}: localized feedback exists`)
    for (const section of lesson.sections) {
      section.paragraphs?.forEach(item => assert.ok(html.includes(htmlText(item[lang])), `${name}/${lang}: paragraph`))
      if (section.image) {
        assert.ok(html.includes(section.image.src))
        assert.ok(html.includes(htmlText(section.image.alt[lang])))
        assert.ok(html.includes(htmlText(section.image.caption[lang])))
        section.image.frames.forEach(frame => assert.ok(html.includes(htmlText(frame[lang])), `${name}/${lang}: frame label`))
      }
      if (section.table) section.table.rows.flat().forEach(item => assert.ok(html.includes(htmlText(item[lang])), `${name}/${lang}: table cell`))
    }
  }
  assert.match(fs.readFileSync('components/brain/BrainTumorLesson.jsx', 'utf8'), /role="status"/u)
  const assetDir = name === 'schwannom-cpa' ? 'schwannoma-cpa' : 'haemangioblastoma-vhl'
  const provenance = JSON.parse(fs.readFileSync(`public/educational/${assetDir}/image-provenance.json`, 'utf8'))
  assert.match(provenance.source, /Gehirn\.pdf/u)
  assert.match(provenance.case_id_source, /not independently verified/u)
  const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
  lesson.ids.forEach(id => assert.match(curriculum, new RegExp(`id: '${id}'[^\\n]+link: '${lesson.path}', inProgress: true`), `${name}: exact curriculum route for ${id}`))
  if (assetDir === 'schwannoma-cpa') assert.deepEqual(provenance.crop_box_pixels_xyxy, [66, 30, 770, 270])
  else assert.deepEqual(provenance.panel_order, ['A1', 'A1 C+', 'FLAIR', 'DWI', 'ADC'])
  for (const src of [lesson.hero, lesson.sections.find(section => section.image).image.src]) assert.ok(fs.statSync(`public${src}`).size > (src.endsWith('.svg') ? 500 : 1000), `${name}: missing/small asset ${src}`)
  console.log(`${name}: DE/EN/FA route SSR, translated media, comparison/check, provenance, curriculum link PASS (${found.length} localized units).`)
}
