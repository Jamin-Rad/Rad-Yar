import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import React from 'react'
import { renderToString } from 'react-dom/server'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = path.join(root, 'tmp', 'spine-infectious-ssr.cjs')
fs.mkdirSync(path.dirname(bundle), { recursive: true })

fs.writeFileSync(path.join(root,'tmp','spine-infectious-entry.jsx'), "export {default as Lepto} from '../app/wirbelsaeule/entzuendlich/leptomeningitis/page'; export {default as Lyme} from '../app/wirbelsaeule/entzuendlich/neuroborreliose/page'; export {default as Existing} from '../app/wirbelsaeule/infektion/page'")
await build({
  absWorkingDir: root,
  entryPoints: ['tmp/spine-infectious-entry.jsx'],
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



const require=createRequire(import.meta.url),pages=require(bundle)
const d=await import('../data/spineInfectiousCompletion.js')
for(const [Page,lesson] of [[pages.Lepto,d.SPINE_INFECTIOUS_LESSONS[0]],[pages.Lyme,d.SPINE_INFECTIOUS_LESSONS[1]]]) for(const lang of ['de','en','fa']){
 globalThis.__testLang=lang
 const html=renderToString(React.createElement(Page))
 assert.equal((html.match(/<h1\b/g)||[]).length,1)
 assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`))
 assert.ok(html.includes(`themen=${lesson.id}`))
 assert.ok(html.includes(encodeURIComponent(`${lesson.path}?lang=${lang}`)))
 assert.ok(html.includes(`/flashcards/${lesson.id}`))
 for(const [i,c] of lesson.chapters.entries()){
  const panel=html.match(new RegExp(`<div id="${c.id}-panel"[^>]*>`))?.[0]
  assert.ok(panel);assert.equal(panel.includes('hidden=""'),i!==0)
 }
 for(const source of lesson.sources) assert.ok(html.includes(source.href),`Missing clickable source ${source.href}`)
 for(const asset of [lesson.hero,...lesson.chapters.filter(c=>c.image).map(c=>c.image.src)]){assert.ok(html.includes(asset)||html.includes(encodeURIComponent(asset)));assert.ok(fs.statSync(path.join(root,'public',asset)).size>1000)}
 assert.ok(html.includes('creativecommons.org/licenses/by/4.0/'))
 assert.equal(d.SPINE_INFECTIOUS_QUESTIONS[lang].filter(q=>q.tags.includes(lesson.id)).length,2)
 assert.equal(d.SPINE_INFECTIOUS_CARDS.filter(c=>c.topicId===lesson.id).length,2)
}
for(const lang of ['de','en','fa']){
 globalThis.__testLang=lang
 const html=renderToString(React.createElement(pages.Existing))
 for(const e of d.SPINE_EXISTING_INFECTION_PRACTICE){
  assert.ok(html.includes(`id="${e.id}"`));assert.ok(html.includes(`themen=${e.id}`));assert.ok(html.includes(`/flashcards/${e.id}`))
  const back=`/wirbelsaeule/infektion${lang==='de'?'':`?lang=${lang}`}#${e.anchor}`
  assert.ok(html.includes(encodeURIComponent(back)))
 }
 assert.equal(d.SPINE_INFECTIOUS_QUESTIONS[lang].length,7)
 for(const q of d.SPINE_INFECTIOUS_QUESTIONS[lang]){
  assert.ok(q.options.some(o=>o.id===q.correct));assert.equal(new Set(q.options.map(o=>o.text)).size,3)
  assert.equal(Object.keys(q.wrongExplanations).length,2);assert.ok(q.explanation&&q.source)
 }
 for(const c of d.SPINE_INFECTIOUS_CARDS)for(const key of ['front','answer','explanation'])assert.ok(c[key][lang])
}
console.log('PASS: infectious lessons and existing practice SSR, DE/EN/FA, source links, assets, exact topics and return anchors. Browser interaction/visual QA is separate.')
