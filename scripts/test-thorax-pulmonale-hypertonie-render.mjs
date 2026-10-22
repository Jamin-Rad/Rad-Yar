import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const Hero = compile('components/LessonHero.jsx', {
  'next/image': ({ fill, priority, ...props }) => React.createElement('img', props),
  './LessonHero.module.css': styles,
}).default
let activeLanguage = 'de'
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
const Diagram = compile('components/PulmonaryHypertensionDiagram.jsx', {}).default
const Page = compile('app/thorax/pulmonale-hypertonie/page.jsx', {
  'next/link': Link,
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/components/PulmonaryHypertensionDiagram': Object.assign(Diagram, { PulmonaryHypertensionFigureCaption: compile('components/PulmonaryHypertensionDiagram.jsx', {}).PulmonaryHypertensionFigureCaption }),
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLanguage }) },
  './page.module.css': styles,
}).default

for (const lang of ['de', 'en', 'fa']) {
  activeLanguage = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  const localeSuffix = lang === 'de' ? '' : `&amp;lang=${lang}`
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  assert.ok(html.includes(`/ueben/quiz?fach=thorax&amp;n=2&amp;themen=pulmonale-hypertonie&amp;from=%2Fthorax%2Fpulmonale-hypertonie${localeSuffix}`), `${lang}: return-linked MCQ action`)
  assert.ok(html.includes(`/flashcards/pulmonale-hypertonie?from=%2Fthorax%2Fpulmonale-hypertonie${localeSuffix}`), `${lang}: return-linked flashcard action`)
  assert.ok(html.includes('CT-Hinweise') || lang !== 'de', `${lang}: diagram is rendered`)
  assert.ok(html.includes(lang === 'fa' ? 'شماتیک آموزشیِ غیرتشخیصی' : 'Non-diagnostic teaching schematic') || lang === 'de', `${lang}: the diagram is explicitly non-diagnostic`)
}

console.log('Pulmonary hypertension route, diagram and return-linked assessment actions render in DE/EN/FA.')
