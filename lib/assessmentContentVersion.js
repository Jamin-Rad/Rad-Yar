import {canonicalAssessmentId} from './assessmentIdentity.js'

export function assessmentFingerprint(value) {
  const text=JSON.stringify(value)
  let hash=2166136261
  for(let i=0;i<text.length;i++) hash=Math.imul(hash^text.charCodeAt(i),16777619)
  return (hash>>>0).toString(36)
}

export function assessmentVersionRecords(banks) {
  const maps=Object.fromEntries(['de','en','fa'].map(lang=>[lang,new Map((banks[lang]||[]).map(q=>[canonicalAssessmentId(q.id),q]))]))
  return banks.de.map(question=>({
    id:question.id,tags:question.tags,
    fingerprint:assessmentFingerprint(['de','en','fa'].map(lang=>{
      const item=maps[lang].get(question.id)
      return item?{question:item.question,options:item.options,correct:item.correct}:null
    })),
  }))
}

export function selectedAssessmentVersion(records,topicIds=[],canonicalIds=[]) {
  const topics=new Set(topicIds),ids=new Set(canonicalIds)
  return assessmentFingerprint(records.filter(item=>ids.size?ids.has(item.id):item.tags.some(tag=>topics.has(tag)))
    .slice().sort((a,b)=>a.id<b.id?-1:a.id>b.id?1:0).map(({id,fingerprint})=>({id,fingerprint})))
}
