import { createHash } from 'node:crypto'
import { FLASHCARDS, FLASHCARD_TOPICS } from '@/data/flashcards'
import { CURRICULUM } from '@/data/curriculum'
import { hasFullAccess, getProAccess, FREE_TOPIC_LIMIT, FREE_ITEM_LIMIT } from '@/utils/subscription'

export const digest = value => createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex')
const text = (value, language) => typeof value === 'string' ? value : value?.[language] || value?.en || value?.de || value?.fa || ''
const prefix = 'radyar:'
export function catalog(user, language = 'en', progress = {}) {
  const lang = ['fa','de','en'].includes(language) ? language : 'en'
  const full = hasFullAccess(user)
  const started = new Set(FLASHCARDS.filter(c => progress[c.id]).map(c => c.topicId))
  const topics = FLASHCARD_TOPICS.filter(t => FLASHCARDS.some(c => c.topicId === t.id))
  const allowed = full ? topics : topics.filter(t => started.has(t.id)).slice(0, FREE_TOPIC_LIMIT)
  if (!full) for (const topic of topics) { if (allowed.length >= FREE_TOPIC_LIMIT) break; if (!allowed.includes(topic)) allowed.push(topic) }
  const decks = [{ id:prefix+'root', title:'RadYar', icon:'radyar', cards:[] }]
  for (const topic of allowed) {
    let parentID = prefix+'root'
    const matches=t=>t.flashcardLink === '/flashcards/'+topic.id || t.id === topic.id || (t.sub || []).some(matches)
    const fach = CURRICULUM.find(f => f.kapitel.some(k => k.themen.some(matches))) || CURRICULUM.find(f=>f.title.de===topic.area)
    const artwork=topic.iconImage?.match(/^\/fach\/([a-z-]+)\.png$/)?.[1] || (fach?.id==='interventionelle-radiologie' ? 'gefaesse-ir':fach?.id) || 'technik'
    const icon='radyar-'+artwork
    const chapter = fach?.kapitel.find(k => k.themen.some(matches))
    for (const group of [fach, chapter].filter(Boolean)) {
      const id=prefix+group.id
      if (!decks.some(d=>d.id===id)) decks.push({id,title:text(group.title,lang),icon,parentID,cards:[]})
      parentID=id
    }
    const lesson=chapter?.themen.find(matches)
    for(const name of lesson?.group || []) {
      const id=prefix+'group:'+digest(parentID+':'+name).slice(0,20)
      if(!decks.some(d=>d.id===id))decks.push({id,title:text(name,lang),icon,parentID,cards:[]})
      parentID=id
    }
    decks.push({id:prefix+'topic:'+topic.id,title:text(topic.title,lang),icon,parentID,cards:FLASHCARDS.filter(c=>c.topicId===topic.id).map(c=>({id:c.id,front:text(c.front ?? c.question,lang),answer:text(c.answer ?? c.back,lang),explanation:text(c.explanation,lang),diagram:text(c.diagram,lang)}))})
  }
  for (const deck of decks) deck.progress={}
  const access=getProAccess(user)
  // Renew the offline permission at least weekly; expiry never erases queued reviews.
  const until=Math.min(Date.now()+7*86400000, access.until ? new Date(access.until).getTime() : Infinity)
  return {decks,manifest:Object.fromEntries(decks.map(d=>[d.id,digest(d)])),fullAccess:full,sessionLimit:full ? null : FREE_ITEM_LIMIT,validUntil:new Date(until).toISOString()}
}
export function wireProgress(rows) {
  return Object.fromEntries(rows.map(r=>[r.card_id,{box:r.box,mastered:r.status==='mastered',due:r.due_at,reviewed:r.last_reviewed_at,correct:r.correct_count,wrong:r.wrong_count}]))
}
export function validEvents(events) {
  if (!Array.isArray(events) || events.length>500) return false
  return events.every(e=> typeof e.id==='string' && /^[0-9a-f-]{36}$/i.test(e.id) && typeof e.cardID==='string' && e.cardID.length<=200 &&
    (e.baseReviewed==null || Number.isFinite(Date.parse(e.baseReviewed))) && typeof e.known==='boolean' && Number.isFinite(Date.parse(e.reviewed)) && Date.parse(e.reviewed)<=Date.now()+300000 &&
    typeof e.due==='string' && Number.isFinite(Date.parse(e.due)) && Date.parse(e.due)>Date.parse(e.reviewed)-86400000 && Date.parse(e.due)<Date.parse(e.reviewed)+367*86400000)
}
