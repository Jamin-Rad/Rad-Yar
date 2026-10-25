// Run after authoring. Never import assessment banks into every lesson's client bundle.
import fs from 'node:fs'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARDS } from '../data/flashcards.js'
import { qualityCoverage } from '../data/assessmentQuality/index.js'
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
console.log(`${Object.keys(routes).length} explicit goal-mapped lesson links generated`)
