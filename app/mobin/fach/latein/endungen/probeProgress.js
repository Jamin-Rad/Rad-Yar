import { isCorrect, rounds } from './questions'
export const probeId = mode => {
 const m=/^probe24-([1-9]|1[0-7])(-review)?$/.exec(mode)
 return m ? `00000000-0024-4000-8000-${String(Number(m[1])*2+Number(Boolean(m[2]))).padStart(12,'0')}` : null
}
// Earlier confirmed answers and the furthest reached question cannot be rewound by a stale device.
export function mergeProbeDraft(previous, incoming) {
 if(!previous?.draft)return incoming
 if(!incoming?.draft)return previous
 const a=previous.draft,b=incoming.draft
 const winner=b.index>a.index?b:b.index<a.index?a:incoming.modifiedAt>previous.modifiedAt?b:a
 const answers={...a.answers,...b.answers},checked={...a.checked,...b.checked}
 for(const [key,value]of Object.entries(a.answers))if(Number(key)<a.index||a.checked[key])answers[key]=value
 for(const [key,value]of Object.entries(b.answers))if((Number(key)<b.index||b.checked[key])&&!(Number(key)<a.index||a.checked[key]))answers[key]=value
 return {modifiedAt:Math.max(previous.modifiedAt,incoming.modifiedAt),draft:{index:winner.index,answers,checked}}
}
export function gradeProbeResult(result, first) {
 const review=result.mode.endsWith('-review'),round=rounds[result.mode]
 if(review&&!first)return null
 const indices=review?first.mistakes:round.questions.map((_,i)=>i)
 if(!indices.length||indices.some(i=>!result.answers?.[i]?.trim()))return null
 return {...result,id:probeId(result.mode),unanswered:0,mistakes:indices.filter(i=>!isCorrect(round.questions[i],result.answers[i]))}
}
