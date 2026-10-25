// Explicitly selected, independently reviewed supplemental items only.
// Authoring modules may contain later packets still under review.
import fs from 'node:fs'
import * as brain from '../data/assessmentQuality/brain.js'
import * as mskSpine from '../data/assessmentQuality/mskSpine.js'
import * as abdomenTechnik from '../data/assessmentQuality/abdomenTechnik.js'
import * as thoraxMamma from '../data/assessmentQuality/thoraxMamma.js'
import {routeCoverage as mammaCoverage} from '../data/assessmentQuality/mammaCoverage.js'
const reviewed=JSON.parse(fs.readFileSync('data/assessmentQuality/reviewedPackets.json','utf8'))
const packets=[brain,mskSpine,abdomenTechnik,thoraxMamma]
function select(items,ids,label){
  const byId=new Map()
  for(const item of items){if(byId.has(item.id))throw Error(`Duplicate ${label}: ${item.id}`);byId.set(item.id,item)}
  return ids.map(id=>{if(!byId.has(id))throw Error(`Missing reviewed ${label}: ${id}`);return byId.get(id)})
}
const questions=Object.fromEntries(['de','en','fa'].map(lang=>[lang,select(packets.flatMap(p=>p.newQuestions(lang)),reviewed.questionIds.map(id=>id.replace(/-de(?=-|$)/,`-${lang}`)),lang+' question')]))
const cards=select(packets.flatMap(p=>p.newCards),reviewed.cardIds,'card')
const topicIds=new Set([...questions.de.flatMap(q=>q.tags),...cards.map(c=>c.topicId)])
const topics=packets.flatMap(p=>p.topics).filter(t=>topicIds.has(t.id))
const wantedRoutes=new Set(reviewed.routes)
const routeCoverage=[...packets.flatMap(p=>p.routeCoverage),...mammaCoverage].filter(r=>wantedRoutes.has(r.route))
if(new Set(routeCoverage.map(r=>r.route)).size!==wantedRoutes.size)throw Error('Reviewed route coverage missing')
const result={scope:'Generated from explicitly reviewed supplemental IDs. Clinical release acceptance is separate.',questions,cards,topics,routeCoverage}
fs.writeFileSync('data/assessmentQuality/publishedBank.json',JSON.stringify(result,null,2)+'\n')
console.log(`Published snapshot: ${questions.de.length} questions per language, ${cards.length} cards, ${wantedRoutes.size} route maps`)
