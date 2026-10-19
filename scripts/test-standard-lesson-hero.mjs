import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import { EPIPLOICA_LESSON as lesson } from '../data/epiploicaLesson.js'

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
// Next Image/Link need a Next runtime; retain their semantic output for this
// isolated SSR regression. This does not test their browser or loading behaviour.
const Image = ({ fill, priority, ...props }) => React.createElement('img', props)
const Link = props => React.createElement('a', props)
const Hero = compile('components/LessonHero.jsx', { 'next/image': Image, './LessonHero.module.css': styles }).default
const { default: Shell, LessonSection } = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': Link,
  '@/components/LessonHero': Hero,
  '@/lib/lessonHashNavigation': { observeLessonHash },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  './StandardLessonShell.module.css': styles,
})
for (const lang of ['de', 'en', 'fa']) {
  const props = {
    lessonId: lesson.id, lang, title: lesson.title[lang], author: 'Dr. Zia', breadcrumbs: [], actions: {},
    sections: [{ id: 'ct-pattern', label: lesson.chapters[1].title[lang] }],
    labels: { path: 'Path', progress: 'Read', close: 'Close', continue: 'Continue', completeLesson: 'Read all', complete: 'Read', completed: 'Read' },
    renderIcon: () => null,
    theme: { backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/abdomen/epiploica/hero.svg' },
    children: React.createElement(LessonSection, { id: 'ct-pattern', title: lesson.chapters[1].title[lang] }, 'content'),
  }
  const semantic = renderToStaticMarkup(React.createElement(Shell, { ...props, heroImageAlt: lesson.heroAlt[lang], syncHashNavigation: true }))
  assert.ok(semantic.includes('data-lesson-hero="true"'), `Maintained LessonHero missing: ${lang}`)
  assert.ok(semantic.includes(`alt="${lesson.heroAlt[lang]}"`), `Translated hero alt missing: ${lang}`)
  assert.ok(semantic.includes(`lang="${lang}"`) && semantic.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.equal((semantic.match(/<h1>/g) || []).length, 1, 'Only one lesson title')
  assert.ok(!semantic.includes('class="heroVisual"'), 'Accessible hero must not use the hidden CSS image')
  assert.ok(semantic.includes('id="ct-pattern-panel"') && semantic.includes('content'), 'Lesson structure preserved')
  const legacy = renderToStaticMarkup(React.createElement(Shell, props))
  assert.ok(legacy.includes('class="heroVisual" aria-hidden="true"'), 'Existing consumers retain their decorative hero branch')
  assert.ok(!legacy.includes('data-lesson-hero='), 'Accessible hero remains opt-in')
  assert.equal((legacy.match(/<h1>/g) || []).length, 1)
}
console.log('StandardLessonShell SSR PASS: actual LessonHero, DE/EN/FA alt, single title, language/direction, content and legacy default branch. Next Image/Link mocked; browser layout remains unverified.')
