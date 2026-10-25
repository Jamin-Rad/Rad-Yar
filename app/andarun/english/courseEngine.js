import { questions, questionMap, flashcards, flashcardMap, lessonMap } from './courseContent.js'

export const LEGACY_STORAGE_KEY = 'jaminova-english-b1-pilot-v1'
export const STORAGE_KEY = 'jaminova-english-b1-v2'
export const DAY = 86400000
export const emptyState = () => ({ version: 2, updatedAt: 0, attempts: 0, mistakes: {}, cards: {}, session: null, sessionUpdatedAt: 0, history: [] })
const validTime = n => Number.isSafeInteger(n) && n >= 0 && n < 9000000000000
const validAnswer = n => Number.isInteger(n) && n >= 0 && n < 4
const stamp = (state, now) => Math.max(now, state.updatedAt + 1)
export const activeMistakes = (state, lessonId, category) => questions.filter(q => (!lessonId || lessonId === 'all' || q.lessonId === lessonId) && (!category || q.category === category) && state.mistakes[q.id] && !state.mistakes[q.id].resolved)
export function shuffle(items, seed) {
  const a = [...items]
  let h = [...String(seed)].reduce((n,c) => (Math.imul(n,31)+c.charCodeAt(0))>>>0, 7)
  h=Math.imul(h^(h>>>16),0x85ebca6b)>>>0;h=Math.imul(h^(h>>>13),0xc2b2ae35)>>>0;h=(h^(h>>>16))>>>0
  for (let i=a.length-1;i>0;i--) {
    h=(Math.imul(h,1664525)+1013904223)>>>0
    const j=Math.floor(h/4294967296*(i+1)); [a[i],a[j]]=[a[j],a[i]]
  }
  return a
}
export function readState(raw) {
  const clean=emptyState()
  if (!raw || ![1,2].includes(raw.version)) return clean
  const legacy=raw.version===1
  clean.updatedAt=validTime(raw.updatedAt)?raw.updatedAt:0
  clean.sessionUpdatedAt=validTime(raw.sessionUpdatedAt)?raw.sessionUpdatedAt:0
  clean.attempts=Number.isSafeInteger(raw.attempts)&&raw.attempts>=0?raw.attempts:0
  for (const q of questions) {
    const m=raw.mistakes?.[q.id]
    if(m&&validTime(m.due)&&[0,1].includes(m.streak)) clean.mistakes[q.id]={due:m.due,streak:m.streak,resolved:m.resolved===true,lastVariant:m.lastVariant===1?1:0,updatedAt:validTime(m.updatedAt)?m.updatedAt:1}
  }
  for(const c of flashcards){
    const entry=raw.cards?.[c.id]
    if(entry&&validTime(entry.due)&&Number.isInteger(entry.box)&&entry.box>=0&&entry.box<=5)
      clean.cards[c.id]={due:entry.due,box:entry.box,updatedAt:validTime(entry.updatedAt)?entry.updatedAt:1}
  }
  clean.history=Array.isArray(raw.history)?raw.history.filter(h=>h&&['test','review','random'].includes(h.mode)&&validTime(h.at)&&Number.isInteger(h.correct)&&Number.isInteger(h.total)&&h.total>0&&h.total<=120&&h.correct>=0&&h.correct<=h.total).slice(-100).map(h=>({
    id:typeof h.id==='string'?h.id.slice(0,120):'legacy-'+h.at,mode:h.mode,at:h.at,lessonId:h.lessonId==='all'?'all':Object.hasOwn(lessonMap,h.lessonId)?h.lessonId:'b1-01',
    category:['reading','grammar','vocabulary','conversation'].includes(h.category)?h.category:'mixed',correct:h.correct,total:h.total
  })):[]
  const s=raw.session
  if(s&&typeof s.id==='string'&&['test','review','random'].includes(s.mode)&&Array.isArray(s.ids)&&s.ids.length>0&&s.ids.length<=120&&
    new Set(s.ids).size===s.ids.length&&s.ids.every(id=>Object.hasOwn(questionMap,id))&&
    Number.isInteger(s.index)&&s.index>=0&&s.index<=s.ids.length&&[0,1].includes(s.variant)){
    const answers=Object.fromEntries(s.ids.filter(id=>validAnswer(s.answers?.[id])).map(id=>[id,s.answers[id]]))
    const lessonId=legacy?'b1-01':s.lessonId
    if((Object.hasOwn(lessonMap,lessonId)||lessonId==='all')&&(lessonId==='all'?s.mode!=='test':s.ids.every(id=>questionMap[id].lessonId===lessonId))&&(s.mode!=='random'||(lessonId==='all'&&['grammar','vocabulary'].includes(s.category)&&s.ids.length<=10&&s.ids.every(id=>questionMap[id].category===s.category)))&&s.ids.slice(0,s.index).every(id=>validAnswer(answers[id]))&&s.ids.slice(s.index+1).every(id=>answers[id]===undefined))
      clean.session={id:s.id.slice(0,120),mode:s.mode,lessonId,category:['reading','grammar','vocabulary','conversation'].includes(s.category)?s.category:'mixed',ids:s.ids,index:s.index,variant:s.variant,variants:Object.fromEntries(s.ids.filter(id=>[0,1].includes(s.variants?.[id])).map(id=>[id,s.variants[id]])),answers}
  }
  if(legacy){clean.updatedAt=Math.max(clean.updatedAt,...clean.history.map(h=>h.at),clean.attempts?1:0);clean.sessionUpdatedAt=clean.session?clean.updatedAt:0}
  return clean
}
const latest = (a,b) => (a?.updatedAt||0)>(b?.updatedAt||0)?a:b
export function mergeState(left,right) {
  const a=readState(left),b=readState(right)
  const mergeRecords=(x,y)=>Object.fromEntries([...new Set([...Object.keys(x),...Object.keys(y)])].map(id=>[id,latest(x[id],y[id])]))
  const winner=a.sessionUpdatedAt>b.sessionUpdatedAt?a:b
  return readState({
    ...winner,version:2,updatedAt:Math.max(a.updatedAt,b.updatedAt),attempts:Math.max(a.attempts,b.attempts),
    mistakes:mergeRecords(a.mistakes,b.mistakes),cards:mergeRecords(a.cards,b.cards),
    history:[...new Map([...a.history,...b.history].map(h=>[h.id,h])).values()].sort((x,y)=>x.at-y.at).slice(-100)
  })
}

export function startSession(state,{mode='test',lessonId='b1-01',category='reading'},now=Date.now()) {
  if((!Object.hasOwn(lessonMap,lessonId)&&lessonId!=='all')||!['test','review','random'].includes(mode))return state
  if(mode==='test'&&lessonId==='all')return state
  if(mode==='random'&&(lessonId!=='all'||!['grammar','vocabulary'].includes(category)))return state
  let pool=mode==='review'?activeMistakes(state,lessonId,category==='mixed'?null:category):questions.filter(q=>(lessonId==='all'||q.lessonId===lessonId)&&q.category===category)
  if(!pool.length)return state
  const updatedAt=stamp(state,now),attempts=state.attempts+1
  const id=globalThis.crypto?.randomUUID?.()||`${updatedAt}-${attempts}-${Math.random().toString(36).slice(2)}`
  if(mode==='random'){
    // Interleave independently shuffled lesson pools, then take ten unique concepts.
    const groups=shuffle(Object.keys(lessonMap),id).map(l=>shuffle(pool.filter(q=>q.lessonId===l),id+l))
    const balanced=[]
    while(balanced.length<10&&groups.some(g=>g.length))for(const group of groups)if(group.length&&balanced.length<10)balanced.push(group.shift())
    pool=balanced
  }
  return {...state,updatedAt,attempts,sessionUpdatedAt:updatedAt,session:{id,mode,lessonId,category,ids:shuffle(pool.map(q=>q.id),id),index:0,variant:mode==='review'?1:(attempts-1)%2,variants:mode==='review'?Object.fromEntries(pool.map(q=>[q.id,1-(state.mistakes[q.id].lastVariant||0)])):{},answers:{}}}
}
export function currentQuestion(session) {
  const concept=questionMap[session?.ids[session.index]]
  return concept?{...concept.variants[session.variants?.[concept.id]??session.variant],id:concept.id,lessonId:concept.lessonId,category:concept.category}:null
}
export const optionOrder=session=>shuffle([0,1,2,3],session.id+'-'+session.index)
export function answer(state,selected,now=Date.now()) {
  const s=state.session,q=currentQuestion(s)
  if(!q||!validAnswer(selected)||s.answers[q.id]!==undefined)return state
  const updatedAt=stamp(state,now),mistakes={...state.mistakes},old=mistakes[q.id],lastVariant=s.variants?.[q.id]??s.variant
  if(selected!==q.answer)mistakes[q.id]={due:now,streak:0,resolved:false,lastVariant,updatedAt}
  else if(s.mode==='review'&&old&&!old.resolved&&now>=old.due){
    mistakes[q.id]=old.streak===1?{...old,resolved:true,lastVariant,updatedAt}:{due:now+DAY,streak:1,resolved:false,lastVariant,updatedAt}
  }
  return {...state,updatedAt,sessionUpdatedAt:updatedAt,mistakes,session:{...s,answers:{...s.answers,[q.id]:selected}}}
}
export function result(session) {
  return session.ids.reduce((r,id)=>{
    const category=questionMap[id].category,correct=session.answers[id]===questionMap[id].variants[session.variants?.[id]??session.variant].answer
    r.total++;r.correct+=Number(correct);r.rows[category]||={total:0,correct:0};r.rows[category].total++;r.rows[category].correct+=Number(correct);return r
  },{total:0,correct:0,rows:{}})
}
export function advance(state,now=Date.now()) {
  const s=state.session,q=currentQuestion(s)
  if(!q||s.answers[q.id]===undefined)return state
  const updatedAt=stamp(state,now),next={...s,index:s.index+1},score=result(next)
  const history=next.index===next.ids.length?[...state.history,{id:s.id,mode:s.mode,lessonId:s.lessonId,category:s.category,at:now,correct:score.correct,total:score.total}].slice(-100):state.history
  return {...state,updatedAt,sessionUpdatedAt:updatedAt,session:next,history}
}
export function dueCards(state,lessonId,now=Date.now()) {
  return flashcards.filter(c=>(lessonId==='all'||c.lessonId===lessonId)&&(!state.cards[c.id]||state.cards[c.id].due<=now))
}
export function rateCard(state,id,remembered,now=Date.now()) {
  if(!Object.hasOwn(flashcardMap,id))return state
  const old=state.cards[id],updatedAt=stamp(state,now)
  if(remembered&&old&&now<old.due)return state
  const box=remembered?Math.min(5,(old?.box||0)+1):0
  const delay=[10*60000,DAY,3*DAY,7*DAY,14*DAY,30*DAY][box]
  return {...state,updatedAt,cards:{...state.cards,[id]:{box,due:now+delay,updatedAt}}}
}
