// Run after authoring. Never import assessment banks into every lesson's client bundle.
import fs from 'node:fs'
import path from 'node:path'
import {execFileSync} from 'node:child_process'
import {createRequire} from 'node:module'

// During a partial release, unfinished original producers can remain in the
// checkout. Derive publication counts from the actual staged sources instead.
async function loadBanks() {
 if(!process.argv.includes('--staged')){
  const [q,c,coverage]=await Promise.all([import('../data/questions.js'),import('../data/flashcards.js'),import('../data/assessmentQuality/index.js')])
  return {...q,...c,...coverage}
 }
 const {build}=await import('esbuild')
 const root=process.cwd(),outfile=path.join(root,'tmp/assessment-quality/staged-assessment-banks.cjs')
 fs.mkdirSync(path.dirname(outfile),{recursive:true})
 await build({
  stdin:{contents:"export {QUESTION_BANK} from './data/questions.js'; export {FLASHCARDS} from './data/flashcards.js'; export {qualityCoverage} from './data/assessmentQuality/index.js';",resolveDir:root,sourcefile:'reviewed-index-entry.js'},
  outfile,bundle:true,platform:'node',format:'cjs',jsx:'automatic',loader:{'.js':'jsx'},external:['react'],
  plugins:[{name:'reviewed-git-index',setup(b){b.onLoad({filter:/\.(?:[jm]sx?|json)$/},args=>{
   const relative=path.relative(root,args.path).replaceAll('\\','/')
   if(relative.startsWith('node_modules/')||relative.startsWith('../'))return
   const contents=execFileSync('git',['show',`:${relative}`],{encoding:'utf8',maxBuffer:20*1024*1024})
   return {contents,loader:relative.endsWith('.json')?'json':'jsx',resolveDir:path.dirname(args.path)}
  })}}],
 })
 return createRequire(import.meta.url)(outfile)
}
const {QUESTION_BANK,FLASHCARDS,qualityCoverage}=await loadBanks()
const counts=Object.fromEntries([...new Set(QUESTION_BANK.de.flatMap(q=>q.tags))].map(id=>[id,QUESTION_BANK.de.filter(q=>q.tags.includes(id)).length]))
const cards=Object.fromEntries([...new Set(FLASHCARDS.map(c=>c.topicId))].map(id=>[id,FLASHCARDS.filter(c=>c.topicId===id).length]))
const routes={}
for(const r of qualityCoverage){
 const topicIds=[...new Set([...(routes[r.route]?.topicIds||[]),r.topicId])]
 const questionCount=QUESTION_BANK.de.filter(q=>q.tags.some(id=>topicIds.includes(id))).length
 const cardTopic=topicIds.find(id=>cards[id]>0)
 const subject=QUESTION_BANK.de.find(q=>q.tags.some(id=>topicIds.includes(id)))?.fach
 routes[r.route]={topicIds,questionCount,cardTopic,subject}
}
fs.writeFileSync('data/assessmentQuality/routeLinks.json',JSON.stringify({routes,counts},null,2)+'\n')
console.log(`${Object.keys(routes).length} explicit goal-mapped lesson links generated from ${process.argv.includes('--staged')?'staged sources':'working sources'} (${QUESTION_BANK.de.length} questions)`)
