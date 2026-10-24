import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { build } from 'esbuild'
import React from 'react'
import { renderToString } from 'react-dom/server'

// Render the actual page/component graph. Fixtures supply only browser/session
// context and CSS names; the maintained lesson shells and authored content run.
const root=process.cwd()
const inventory=JSON.parse(fs.readFileSync('docs/lesson-quality/lesson-design-route-inventory.json','utf8'))
const routes=inventory.routes.filter(route=>route.renderer!=='redirect')
const target=path.join(root,'tmp','lesson-design-all-routes')
fs.mkdirSync(target,{recursive:true})
fs.writeFileSync(path.join(target,'entry.jsx'),routes.map((route,index)=>`export {default as Page${index}} from '../../${route.entry}'`).join('\n'))
const bundle=path.join(target,'pages.cjs')
await build({absWorkingDir:root,entryPoints:[path.join(target,'entry.jsx')],outfile:bundle,bundle:true,jsx:'automatic',loader:{'.js':'jsx'},platform:'node',format:'cjs',external:['react','react-dom','next/*'],plugins:[{name:'lesson-design-context-fixtures',setup(builder){
  builder.onResolve({filter:/^@\/providers\/LanguageProvider$/},()=>({path:'language',namespace:'fixture'}))
  builder.onResolve({filter:/^@\/hooks\/useLessonReadStatus$/},()=>({path:'read',namespace:'fixture'}))
  builder.onResolve({filter:/^next\/navigation$/},()=>({path:'navigation',namespace:'fixture'}))
  builder.onResolve({filter:/^@clerk\/nextjs$/},()=>({path:'clerk',namespace:'fixture'}))
  builder.onLoad({filter:/.*/,namespace:'fixture'},args=>({loader:'js',contents:args.path==='language'?"export const useLanguage=()=>({lang:globalThis.__testLang||'de',setLang:()=>{},texts:{footerLegalLink:'RadYar',footerCopy:'RadYar'}})":args.path==='read'?"export const useLessonReadStatus=()=>({isRead:false,toggleRead:()=>false,authError:false})":args.path==='navigation'?"export const usePathname=()=>globalThis.__testRoute;export const useSearchParams=()=>new URLSearchParams('lang='+globalThis.__testLang);export const useRouter=()=>({push:()=>{},replace:()=>{}});export const redirect=()=>{throw Error('Unexpected redirect in nonredirect inventory')}":"export const useUser=()=>({isLoaded:true,isSignedIn:false,user:null});export const useAuth=()=>({isLoaded:true,isSignedIn:false});export const SignedIn=({children})=>children;export const SignedOut=({children})=>children;export const ClerkLoaded=({children})=>children;export const ClerkLoading=()=>null;export const UserButton=()=>null"}))
  builder.onResolve({filter:/\.css$/},args=>({path:path.resolve(args.resolveDir,args.path),namespace:'css-fixture'}))
  builder.onLoad({filter:/.*/,namespace:'css-fixture'},()=>({loader:'js',contents:'export default new Proxy({}, {get:(_,name)=>String(name)})'}))
  builder.onResolve({filter:/^@\//},args=>{const base=path.join(root,args.path.slice(2));const resolved=['','.js','.jsx','.mjs','.json'].map(extension=>base+extension).find(file=>fs.existsSync(file)&&fs.statSync(file).isFile());return resolved?{path:resolved}:{errors:[{text:`Unresolved alias: ${args.path}`}]}})
}}]})
const require=createRequire(import.meta.url)
const pages=require(bundle)
const records=[]
const clean=value=>value.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()
for(const lang of ['de','en','fa']){
  globalThis.__testLang=lang
  for(const [index,route] of routes.entries()){
    globalThis.__testRoute=route.route
    const record={route:route.route,lang,entry:route.entry,baselineRenderer:route.renderer}
    try{
      const Page=pages[`Page${index}`]
      const element=Page.constructor.name==='AsyncFunction'?await Page({}):React.createElement(Page)
      const html=renderToString(element)
      fs.writeFileSync(path.join(target,`${index}-${lang}.html`),html)
      const headings=[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)]
      const sections=[...html.matchAll(/<section\b([^>]*\bid="[^"]+"[^>]*)>/g)].filter(match=>/\bclass="[^"]*\bsection\b/.test(match[1]))
      const summary=sections.filter(match=>/\btakeHomeSection\b/.test(match[1]))
      const last=sections.at(-1)
      record.title=headings[0]?clean(headings[0][1]):null
      record.h1Count=headings.length
      record.teachingSectionCount=sections.length
      record.finalSection=last?.[1].match(/\bid="([^"]+)"/)?.[1]||null
      record.summaryCount=summary.length
      record.summaryIsFinal=Boolean(summary.length&&summary.at(-1)===last)
      record.sharedHero=html.includes('data-lesson-hero')
      record.hasNotice=/Diese Lektion wird noch bearbeitet|Dieses Kapitel wird noch vervollständigt|This lesson is still being developed|این درس هنوز در حال تکمیل است/.test(html)
      const summaryIndex=summary.at(-1)?.index
      let summaryHtml=''
      if(summaryIndex!==undefined){let depth=0;const tail=html.slice(summaryIndex);for(const tag of tail.matchAll(/<\/?section\b[^>]*>/g)){depth+=tag[0].startsWith('</')?-1:1;if(depth===0){summaryHtml=tail.slice(0,tag.index+tag[0].length);break}}}
      record.summaryRows=(summaryHtml.match(/<li\b/g)||[]).length
      const panel=summaryHtml.match(/<div\b[^>]*class="[^"]*\bsectionBody\b[^"]*"[^>]*>([\s\S]*)<\/div>/)?.[1]||''
      record.summaryHasText=clean(panel).length>30
      record.renderedLang=html.match(/<main[^>]*\blang="([^"]+)"/)?.[1]||lang
      record.summaryTitle=record.renderedLang==='fa'?/پیام نهایی|نکات کلیدی/.test(summaryHtml):/Take Home Message/i.test(summaryHtml)
      const failures=[]
      if(record.h1Count!==1)failures.push('expected one h1')
      if(!record.sharedHero)failures.push('missing maintained topic hero')
      if(record.hasNotice)failures.push('in-progress notice remains')
      if(record.summaryCount!==1)failures.push('expected one final emphasized summary')
      if(!record.summaryIsFinal)failures.push('summary is not final teaching section')
      if(!record.summaryHasText)failures.push('empty or absent summary content')
      if(!record.summaryTitle)failures.push('summary title not normalized')
      record.failures=failures
      record.status=failures.length?'FAIL':'PASS'
    }catch(error){record.status='ERROR';record.failures=[error.message]}
    records.push(record)
  }
}
const result={date:new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()),scope:'Actual page graph SSR in DE/EN/FA. Browser/session hooks and CSS names are fixtures; no source-content or shared lesson-shell fixture. Does not establish browser visual quality, authentication behavior, loaded media or client interaction.',routeCount:routes.length,renderCount:records.length,passed:records.filter(record=>record.status==='PASS').length,failed:records.filter(record=>record.status!=='PASS').length,records}
fs.writeFileSync('docs/lesson-quality/lesson-design-route-verification.json',JSON.stringify(result,null,2)+'\n')
for(const record of records.filter(record=>record.status!=='PASS'))console.log(`${record.lang} ${record.route}: ${record.failures.join('; ')}`)
console.log(`${result.passed}/${result.renderCount} actual route/locale SSR checks passed.`)
assert.equal(result.failed,0,`${result.failed} route/locale failures; see lesson-design-route-verification.json`)
