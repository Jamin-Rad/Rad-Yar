import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import React from 'react'
import { renderToString } from 'react-dom/server'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = path.join(root, 'tmp', 'spine-metabolic-ssr.cjs')
fs.mkdirSync(path.dirname(bundle), { recursive: true })

await build({
  absWorkingDir: root,
  entryPoints: ['app/wirbelsaeule/metabolisch/osteoporose/page.js'],
  outfile: bundle,
  bundle: true,
  jsx: 'automatic',
  loader: { '.js':'jsx' },
  platform: 'node',
  format: 'cjs',
  external: ['react', 'react-dom', 'next/*'],
  plugins: [{
    name: 'radyar-ssr-fixtures',
    setup(builder) {
      builder.onResolve({ filter: /^@\/providers\/LanguageProvider$/ }, () => ({ path: 'language-provider', namespace: 'fixture' }))
      builder.onLoad({ filter: /.*/, namespace: 'fixture' }, () => ({ contents: "export function useLanguage(){return {lang:globalThis.__testLang||'de',texts:{footerLegalLink:'RadYar',footerCopy:'RadYar'}}}", loader: 'js' }))
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
const {SPINE_METABOLIC_LESSONS:lessons,SPINE_METABOLIC_QUESTIONS:questions,SPINE_METABOLIC_CARDS:cards}=await import('../data/spineMetabolicCompletion.js')
for(const lang of ['de','en','fa']) {
 globalThis.__testLang=lang
 for(const lesson of lessons){
  const html=renderToString(React.createElement(Page,{lessonId:lesson.id}))
  assert.equal((html.match(/<h1\b/g)||[]).length,1)
  assert.ok(html.includes(`lang="${lang}"`))
  assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`))
  for(const [i,section] of lesson.sections.entries()){
   const panel=html.match(new RegExp(`<div id="${section.id}-panel"[^>]*>`))?.[0]
   assert.ok(panel);assert.equal(panel.includes('hidden=""'),i!==0)
  }
  for(const src of [lesson.hero,...lesson.images.map(i=>i.src)]){
   assert.ok(fs.statSync(path.join(root,'public',src)).size>1000)
   assert.ok(html.includes(src)||html.includes(encodeURIComponent(src)))
  }
  assert.ok(html.includes(`themen=${lesson.id}`));assert.ok(html.includes('fach=wirbelsaeule'))
  const ret=lang==='de'?lesson.path:`${lesson.path}?lang=${lang}`
  assert.ok(html.includes(`from=${encodeURIComponent(ret)}`))
  assert.ok(html.includes(`/flashcards/${lesson.id}`));assert.ok(!html.includes('Befund &amp; Selbsttest'))
  assert.equal(questions[lang].filter(q=>q.tags.includes(lesson.id)).length,2)
 }
 for(const q of questions[lang]){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.options.some(o=>o.id===q.correct));assert.equal(Object.keys(q.wrongExplanations).length,3);assert.ok(q.source&&q.explanation)}
 for(const c of cards)for(const key of ['front','answer','explanation'])assert.ok(c[key][lang])
}
const source=fs.readFileSync(path.join(root,'app/wirbelsaeule/metabolisch/osteoporose/page.js'),'utf8')
assert.ok(source.includes('item.feedback[answer]'));assert.ok(source.includes('key={`${lang}-${lesson.id}-0`}'))
assert.equal(cards.length,4)
console.log('Spine metabolic SSR: 2 lessons x3 languages; shell, chapters, real assets, assessment counts, feedback, localized return routes and cards pass.')
