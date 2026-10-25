// Explicitly selected, independently reviewed supplemental items only.
// Authoring modules may contain later packets still under review.
import fs from 'node:fs'
import {canonicalAssessmentId} from '../lib/assessmentIdentity.js'
import * as brain from '../data/assessmentQuality/brain.js'
import * as mskSpine from '../data/assessmentQuality/mskSpine.js'
import * as abdomenTechnik from '../data/assessmentQuality/abdomenTechnik.js'
import * as thoraxMamma from '../data/assessmentQuality/thoraxMamma.js'
import * as upperGiLiver from '../data/assessmentQuality/atvUpperGiLiverEarly.js'
import * as pancreatic from '../data/assessmentQuality/atvPancreatic.js'
import * as liver from '../data/assessmentQuality/atvLiver.js'
import {routeCoverage as mammaCoverage} from '../data/assessmentQuality/mammaCoverage.js'
const reviewed=JSON.parse(fs.readFileSync('data/assessmentQuality/reviewedPackets.json','utf8'))
const originalCoverage=JSON.parse(fs.readFileSync('data/assessmentQuality/originalPoolCoverage.json','utf8'))
const packets=[brain,mskSpine,abdomenTechnik,thoraxMamma,upperGiLiver,pancreatic,liver]
function select(items,ids,label,identity=item=>item.id){
  const byId=new Map()
  for(const item of items){const key=identity(item);if(byId.has(key))throw Error(`Duplicate ${label}: ${key}`);byId.set(key,item)}
  return ids.map(id=>{if(!byId.has(id))throw Error(`Missing reviewed ${label}: ${id}`);return byId.get(id)})
}
const questions=Object.fromEntries(['de','en','fa'].map(lang=>[lang,select(packets.flatMap(p=>p.newQuestions(lang)),reviewed.questionIds,lang+' question',item=>canonicalAssessmentId(item.id))]))
const cards=select(packets.flatMap(p=>p.newCards),reviewed.cardIds,'card')
const topicIds=new Set([...questions.de.flatMap(q=>q.tags),...cards.map(c=>c.topicId)])
const topics=packets.flatMap(p=>p.topics).filter(t=>topicIds.has(t.id))
const wantedRoutes=new Set(reviewed.routes)
const routeCoverage=[...packets.flatMap(p=>p.routeCoverage),...mammaCoverage,...originalCoverage].filter(r=>wantedRoutes.has(r.route))
if(routeCoverage.length!==wantedRoutes.size || new Set(routeCoverage.map(r=>r.route)).size!==wantedRoutes.size)throw Error('Reviewed route coverage missing or duplicated')
const result={scope:'Generated from explicitly reviewed supplemental IDs. Clinical release acceptance is separate.',questions,cards,topics,routeCoverage}
fs.writeFileSync('data/assessmentQuality/publishedBank.json',JSON.stringify(result,null,2)+'\n')
console.log(`Published snapshot: ${questions.de.length} questions per language, ${cards.length} cards, ${wantedRoutes.size} route maps`)
