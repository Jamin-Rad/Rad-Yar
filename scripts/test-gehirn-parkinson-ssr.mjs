import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import React from 'react'
import { renderToString } from 'react-dom/server'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = path.join(root, 'tmp', 'parkinson-route-ssr.cjs')
fs.mkdirSync(path.dirname(bundle), { recursive: true })

await build({
  absWorkingDir: root,
  entryPoints: ['app/gehirn/neurodegeneration/parkinson/page.jsx'],
  outfile: bundle,
  bundle: true,
  jsx: 'automatic',
  platform: 'node',
  format: 'cjs',
  external: ['react', 'react-dom', 'next/*'],
  plugins: [{
    name: 'radyar-ssr-fixtures',
    setup(builder) {
      builder.onResolve({ filter: /^@\/providers\/LanguageProvider$/ }, () => ({ path: 'language-provider', namespace: 'fixture' }))
      builder.onLoad({ filter: /.*/, namespace: 'fixture' }, () => ({ contents: "export function useLanguage(){return {lang:globalThis.__testLang||'de'}}", loader: 'js' }))
      builder.onResolve({ filter: /\.css$/ }, args => ({ path: path.resolve(args.resolveDir, args.path), namespace: 'css-mock' }))
      builder.onLoad({ filter: /.*/, namespace: 'css-mock' }, () => ({ contents: 'export default new Proxy({}, { get: (_, key) => String(key) })', loader: 'js' }))
      builder.onResolve({ filter: /^@\// }, args => {
        const base = path.resolve(root, args.path.slice(2))
        const resolved = ['', '.js', '.jsx', '.mjs', '.json'].map(ext => `${base}${ext}`).find(file => fs.existsSync(file))
        return resolved ? { path: resolved } : { errors: [{ text: `Unresolved alias: ${args.path}` }] }
      })
    },
  }],
})

const require = createRequire(import.meta.url)
const Page = require(bundle).default
for (const lang of ['de', 'en', 'fa']) {
  globalThis.__testLang = lang
  const html = renderToString(React.createElement(Page))
  for (const expected of ['data-lesson-progress-managed="true"', 'nigrosome-normal.png', 'nigrosome-parkinson.png', 'Clinical MR imaging in Parkinson']) assert.ok(html.includes(expected), `${lang} SSR output missing ${expected}`)
  assert.ok(html.includes(`lang="${lang}"`), `${lang} SSR root language missing`)
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang} SSR direction incorrect`)
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${lang} route should render exactly one h1 and no nested duplicate header`)
  for (const id of ['mri', 'nuclear', 'report']) {
    const panel = html.match(new RegExp(`<div id="${id}-panel"[^>]*>`))?.[0]
    assert.ok(panel, `${lang} route is missing ${id} lesson panel`)
    assert.equal(panel.includes('hidden=""'), id !== 'mri', `${lang} SSR should initially open only the first chapter`)
  }
  assert.ok(!html.includes('Befund & Selbsttest'), `${lang} output includes unrelated default chapter label`)
  assert.ok(!html.includes('morbus-parkinson'), `${lang} route should not link a nonexistent quiz topic`)
}
const routeSource = fs.readFileSync(path.join(root, 'app/gehirn/neurodegeneration/parkinson/page.jsx'), 'utf8')
assert.ok(routeSource.includes("from '@/components/lesson-template/StandardLessonShell'"), 'route must use the maintained shared lesson shell')
assert.ok(routeSource.includes('question.optionFeedback[answer]'), 'answer feedback must be selected for the chosen option')
assert.ok(routeSource.includes('answer === question.correctIndex ?'), 'correct and retry feedback must be distinguished')
console.log('Parkinson route React SSR passed in DE/EN/FA: maintained shared shell, unique title, initial single-open chapter, RTL direction, source imagery, references, and per-answer retry mapping are present.')
