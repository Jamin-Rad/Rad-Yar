import registry from '../data/assessmentQuality/routeLinks.json'

const labels={de:{mcq:'Wissen prüfen',flashcards:'Karteikarten'},en:{mcq:'Test your knowledge',flashcards:'Flashcards'},fa:{mcq:'دانش خود را بسنجید',flashcards:'فلش‌کارت‌ها'}}

// Only explicitly authored route-to-topic mappings may create a missing link.
// Existing custom actions retain their handler, label, return target and topic selection.
export function lessonAssessmentActions(route,lang='de',actions={}) {
 const mapping=registry.routes[route],copy=labels[lang]||labels.de
 const result={...actions}
 if(mapping?.questionCount && !result.mcq){
  const params=new URLSearchParams({fach:mapping.subject,n:String(mapping.questionCount),themen:mapping.topicIds.join(','),from:`${route}?lang=${lang}`,lang})
  result.mcq={label:copy.mcq,href:`/ueben/quiz?${params}`}
 }
 if(mapping?.cardTopic && !result.flashcards){
  const params=new URLSearchParams({from:`${route}?lang=${lang}`,lang})
  result.flashcards={label:copy.flashcards,href:`/flashcards/${mapping.cardTopic}?${params}`}
 }
 if(result.mcq?.href?.startsWith('/ueben/quiz?')){
  const url=new URL(result.mcq.href,'https://rad-yar.com')
  const ids=(url.searchParams.get('themen')||'').split(',').filter(Boolean)
  const sameMappedTopics=mapping && ids.length===mapping.topicIds.length && ids.every(id=>mapping.topicIds.includes(id))
  const available=sameMappedTopics?mapping.questionCount:ids.length===1?registry.counts[ids[0]]:null
  if(available){
   const requested=Number(url.searchParams.get('n')||10)
   url.searchParams.set('n',String(sameMappedTopics?available:Math.min(requested,available)))
   result.mcq={...result.mcq,href:url.pathname+url.search}
  }
 }
 return result
}
