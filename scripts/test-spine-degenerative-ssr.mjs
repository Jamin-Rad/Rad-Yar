import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import React from 'react'
import { renderToString } from 'react-dom/server'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = path.join(root, 'tmp', 'spine-degenerative-ssr.cjs')
fs.mkdirSync(path.dirname(bundle), { recursive: true })

fs.writeFileSync(path.join(root,'tmp','spine-degenerative-entry.jsx'), "export {default as Spondylo} from '../app/wirbelsaeule/degenerative/spondylolisthesis/page'; export {default as Ossification} from '../app/wirbelsaeule/degenerative/ligamentossifikation/page'")
await build({
  absWorkingDir: root,
  entryPoints: ['tmp/spine-degenerative-entry.jsx'],
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


const require=createRequire(import.meta.url)
const pages=require(bundle)
const d=await import('../data/spineDegenerativeCompletion.js')
for(const [Page,lesson] of [[pages.Spondylo,d.SPONDYLO_LESSON],[pages.Ossification,d.OSSIFICATION_LESSON]]) for(const lang of ['de','en','fa']){
 globalThis.__testLang=lang
 const html=renderToString(React.createElement(Page))
 assert.equal((html.match(/<h1\b/g)||[]).length,1)
 assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`))
 assert.ok(html.includes(`lang="${lang}"`))
 assert.ok(html.includes(`themen=${lesson.id}`))
 assert.ok(html.includes('fach=wirbelsaeule'))
 assert.ok(html.includes(encodeURIComponent(`${lesson.path}?lang=${lang}`)))
 assert.ok(html.includes(`/flashcards/${lesson.id}`))
 for(const [i,c] of lesson.chapters.entries()){
  const panel=html.match(new RegExp(`<div id="${c.id}-panel"[^>]*>`))?.[0]
  assert.ok(panel);assert.equal(panel.includes('hidden=""'),i!==0)
 }
 for(const asset of [lesson.hero,...lesson.chapters.filter(c=>c.image).map(c=>c.image.src)]){assert.ok(html.includes(asset)||html.includes(encodeURIComponent(asset)));assert.ok(fs.statSync(path.join(root,'public',asset)).size>1000)}
 assert.ok(!html.includes('Befund &amp; Selbsttest'))
 const questions=d.SPINE_DEGENERATIVE_COMPLETION_QUESTIONS[lang].filter(q=>q.tags.includes(lesson.id))
 assert.equal(questions.length,2)
 for(const q of questions){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.options.some(o=>o.id===q.correct));assert.equal(Object.keys(q.wrongExplanations).length,3);assert.ok(q.explanation&&q.source)}
 const cards=d.SPINE_DEGENERATIVE_COMPLETION_CARDS.filter(c=>c.topicId===lesson.id)
 assert.equal(cards.length,2)
 for(const card of cards)for(const key of ['front','answer','explanation'])assert.ok(card[key][lang])
}
const renderer=fs.readFileSync(path.join(root,'app/wirbelsaeule/degenerative/spondylolisthesis/DegenerativeCompletionLesson.jsx'),'utf8')
assert.ok(renderer.includes('key={`${lang}-${i}`}'))
assert.ok(renderer.includes('item.feedback[choice][lang]'))
assert.ok(renderer.includes('aria-pressed={choice===i}'))
console.log('Spine degenerative SSR: 2 routes × DE/EN/FA, shared shell, chapter state, localized bank links, 12 questions, 4 trilingual cards, actual media assets, keyed feedback controls passed.')
