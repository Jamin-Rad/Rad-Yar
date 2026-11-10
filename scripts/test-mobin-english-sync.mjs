import assert from 'node:assert/strict'
import { WORD_CHALLENGE } from '../lib/mobinEnglish.js'
import { mergeEnglishHistory, normalizeEnglishHistory } from '../lib/mobinEnglishSync.js'
import { englishRunPosition } from '../lib/mobinEnglishProgress.js'
import { loadEnglishHistory, syncEnglishHistory } from '../lib/mobinEnglishOnline.js'
const make = (count, index = count, id = 'legacy-word-challenge', startedAt = null) => ({ 'word-challenge': { run: { id, startedAt, results: WORD_CHALLENGE.slice(0, count).map(q => ({id:q.id,chosen:q.correct,correct:true})), index } } })
const early = make(3), advanced = make(9,8)
assert.equal(mergeEnglishHistory(advanced,early)['word-challenge'].run.results.length,9)
assert.equal(mergeEnglishHistory(early,advanced)['word-challenge'].run.index,8)
assert.equal(mergeEnglishHistory(make(9,9),advanced)['word-challenge'].run.index,9)
assert.equal(englishRunPosition(mergeEnglishHistory({},advanced)['word-challenge'].run).feedback.id,WORD_CHALLENGE[8].id)
const reset = make(0,0,'new-run','2026-11-10T18:00:00Z')
assert.equal(mergeEnglishHistory(advanced,reset)['word-challenge'].run.id,'new-run')
assert.equal(mergeEnglishHistory(reset,advanced)['word-challenge'].run.results.length,0)
assert.equal(normalizeEnglishHistory({'word-challenge':{run:{results:advanced['word-challenge'].run.results}}})['word-challenge'].run.index,9)
const complete = { 'word-challenge': {...make(30,30)['word-challenge'], completed:true,date:'2026-11-10T17:00:00Z',last:30,best:30} }
const stale = {'word-challenge':{...early['word-challenge'],updatedAt:'2026-11-10T18:00:00Z'}}
assert.equal(mergeEnglishHistory(complete,stale)['word-challenge'].last,30)
assert.equal(mergeEnglishHistory(complete,stale)['word-challenge'].run.index,30)
assert.deepEqual(normalizeEnglishHistory({unknown:{run:{results:[]}}}),{})
assert.doesNotThrow(()=>normalizeEnglishHistory({'word-challenge':{missedIds:{},run:{reviewOnly:true,questionIds:{},results:[]}}}))

// Two independent browser stores share a test server. Exercises the actual
// migration/load/save client, including offline recovery, without production data.
const stores = [new Map(),new Map()]
let activeDevice=0, server={}, offline=false, patches=0
Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:k=>stores[activeDevice].get(k)||null,setItem:(k,v)=>stores[activeDevice].set(k,v)}})
globalThis.window={dispatchEvent(){}}
globalThis.fetch=async(_url,options)=>{
 if(offline) throw new Error('offline')
 if(options.method==='PATCH'){patches++;server=mergeEnglishHistory(server,JSON.parse(options.body).state)}
 return {ok:true,json:async()=>({state:structuredClone(server)})}
}
await syncEnglishHistory(advanced)
activeDevice=1
let loaded=await loadEnglishHistory()
assert.equal(loaded['word-challenge'].run.index,8)
assert.equal(englishRunPosition(loaded['word-challenge'].run).feedback.id,WORD_CHALLENGE[8].id)
await syncEnglishHistory(make(10,10))
activeDevice=0
loaded=await loadEnglishHistory()
assert.equal(loaded['word-challenge'].run.index,10)
offline=true
await assert.rejects(syncEnglishHistory(make(11)))
offline=false
await syncEnglishHistory(make(11))
activeDevice=1
assert.equal((await loadEnglishHistory())['word-challenge'].run.results.length,11)
assert.ok(patches>=3)
console.log('PASS: migration, two-device resume, feedback/cursor, stale writes, restart, completion, malformed data, offline retry')

// Execute the real route with isolated auth/database adapters.
const vm = await import('node:vm')
const {readFile} = await import('node:fs/promises')
let authorized=true, dbRow=null, conflictOnce=false, updates=0
const db={from(table){assert.equal(table,'mobin_progress');let action='read',value,filters={};const q={select(){return q},eq(k,v){filters[k]=v;return q},is(k,v){filters[k]=v;return q},insert(v){action='insert';value=v;return q},update(v){action='update';value=v;return q},single:finish,maybeSingle:finish};async function finish(){if(action==='read')return {data:structuredClone(dbRow)};if(action==='insert'){if(dbRow)return {error:{code:'23505'}};dbRow=value;return {data:structuredClone(dbRow)}}updates++;if(conflictOnce){conflictOnce=false;return {data:null}}if(filters.updated_at!==dbRow.updated_at)return {data:null};dbRow={...dbRow,...value};return {data:structuredClone(dbRow)}}return q}}
const context=vm.createContext({console,URL,Date,JSON,Number})
const route=new vm.SourceTextModule(await readFile(new URL('../app/api/mobin/english/route.js',import.meta.url),'utf8'),{context})
await route.link(specifier=>{
 const exports=specifier==='next/server'?{NextResponse:{json:(body,options)=>new Response(JSON.stringify(body),options)}}:specifier.includes('mobinAuth')?{hasMobinSession:async()=>authorized}:specifier.includes('supabase/server')?{supabaseAdmin:db}:{mergeEnglishHistory,normalizeEnglishHistory}
 return new vm.SyntheticModule(Object.keys(exports),function(){for(const[k,v]of Object.entries(exports))this.setExport(k,v)},{context})
})
await route.evaluate()
const patch=state=>route.namespace.PATCH(new Request('https://test.invalid/api/mobin/english',{method:'PATCH',headers:{origin:'https://test.invalid'},body:JSON.stringify({state})}))
authorized=false
assert.equal((await route.namespace.GET()).status,401)
assert.equal((await patch(advanced)).status,401)
assert.equal(dbRow,null)
authorized=true
assert.equal((await route.namespace.PATCH(new Request('https://test.invalid/api/mobin/english',{method:'PATCH',headers:{origin:'https://evil.invalid'},body:'{}'}))).status,403)
assert.equal((await patch(null)).status,400)
assert.equal((await patch(advanced)).status,200)
assert.equal(dbRow.id,'mobin-english-unit2-v1')
conflictOnce=true
assert.equal((await patch(make(10,10))).status,200)
assert.ok(updates>=2)
await patch(early)
assert.equal((await (await route.namespace.GET()).json()).state['word-challenge'].run.index,10)
console.log('PASS: real API auth, origin validation, payload validation, insert, CAS retry, stale-write protection and second-device read')
