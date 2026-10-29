import {marginOffsets} from './sourceLayout.js';
// Adjacent translation paragraphs sometimes explain a single source paragraph.
// Each tuple consumes complete, contiguous source blocks without changing text.
const plans={
 '4:4.1.1:4':[[1,1],[1,1],[1,1],[8,8]],
 '5:5.1:4':[[1,1],[1,1],[2,1],[1,1],[1,1]],
 '5:5.1:5':[[1,1],[1,1],[1,1],[2,1]],
 '5:5.2.3.3:30':[[1,1],[1,1],[1,1],[2,1],[1,1],[1,1]],
 '1:1.4:14':[[1,1],[1,1],[1,1],[1,1],[1,1],[2,1]],
 '1:intro:3':[[1,2],[1,1]],'1:1.3:10':[[1,1],[1,1],[1,1],[1,2],[1,1],[1,1]],'1:1.3:11':[[1,2],[1,1],[1,1]],
 '1:1.3:12':[[1,2],[1,1],[1,3],[1,1]],'1:1.5:21':[[1,1],[1,2],[1,1],[1,1]],'1:1.5:22':[[1,1],[1,3],[1,1],[1,1],[1,1]],
 '1:1.5:23':[[1,2],[1,1],[1,1],[1,1]],'1:1.5:24':[[1,1],[1,1],[1,2],[1,1],[1,1]],'1:1.7.1:32':[[1,1],[1,3],[1,1],[1,1]],
 '1:1.7.3:40':[[1,1],[2,1],[1,1],[1,1],[1,1],[1,1],[1,1]],'1:1.7.3:41':[[1,1],[1,1],[1,1],[1,4],[1,1]],
 '2:intro:3':[[1,3]],'2:2.1.1:7':[[1,2],[1,3],[1,1]],'2:2.1.1:8':[[1,1],[1,1],[1,2],[1,1],[1,1],[1,1]],
 '2:2.1.1:10':[[1,1],[1,2],[1,1],[1,1],[1,1],[1,1]],'2:2.1.1:11':[[1,1],[1,1],[2,1]],
 '2:2.1.2:11':[[1,1],[1,2],[1,1],[1,1]],'2:2.1.2:12':[[1,1],[1,1],[1,1],[1,2],[1,1]],'2:2.1.2:13':[[1,1],[1,1],[1,1],[1,2],[1,1]],
 '2:2.1.2:14':[[1,1],[1,2]],'2:2.1.2.1:17':[[1,1],[1,1],[1,2]],'2:2.1.2.2:18':[[1,1],[1,1],[1,2],[1,1],[1,1]],
 '2:2.1.2.2:21':[[1,1],[1,2],[1,1],[1,1]],'2:2.1.2.2:22':[[1,1],[1,2],[1,1],[1,1]],
 '2:2.1.3:23':[[1,1],[1,1],[1,2],[1,1]],'2:2.1.4:24':[[1,1],[1,3],[1,1]],'2:2.1.5:25':[[1,1],[1,1],[1,1],[1,4],[1,1]],
 '2:2.1.5:26':[[1,3],[1,1],[1,1],[1,1]],'2:2.1.5:27':[[1,6]],'2:2.2.1:29':[[1,1],[1,1],[1,2],[1,1]],'2:2.2.1:30':[[1,4]],
 '2:2.2.2:31':[[1,1],[1,3],[1,1]],'2:2.2.2:32':[[1,4]],'2:2.2.3:33':[[1,1],[1,1],[1,2],[1,1],[1,1]],'2:2.2.3:35':[[2,1]],
 '2:2.2.4:35':[[1,1],[1,1],[2,1],[1,1],[1,1]],'2:2.2.4:36':[[1,1],[1,2],[2,1],[1,1]],'2:2.2.4:38':[[1,5],[1,1]],
 '2:2.2.4:39':[[1,1],[1,1],[2,1],[1,1]],'2:2.4:41':[[1,1],[1,1],[1,2],[1,1]],'2:2.4:42':[[1,2],[1,1],[1,1],[1,1]],
 '2:2.4:44':[[1,1],[1,4],[1,1]],'2:2.4:46':[[2,1]],
};
export function textBlocks(text,offset=0){
 const boundaries=[0];for(const m of text.matchAll(/\n[ \t]*\n+/g))boundaries.push(m.index+m[0].length);boundaries.push(text.length);
 const raw=boundaries.slice(0,-1).map((start,i)=>({text:text.slice(start,boundaries[i+1]),start:offset+start,end:offset+boundaries[i+1]})).filter(b=>b.text.length);
 const result=[];let leading='';for(const b of raw){if(!b.text.trim()){if(result.length){result.at(-1).text+=b.text;result.at(-1).end=b.end;}else leading+=b.text;}else{result.push({...b,text:leading+b.text,start:b.start-leading.length});leading='';}}return result.length?result:raw;
}
function sourceBlocks(chunk,lessonId){
 const margin=marginOffsets[`${lessonId}:${chunk.page}`];
 if(margin>=chunk.deStart&&margin<chunk.deEnd){const local=margin-chunk.deStart;return [...textBlocks(chunk.text.slice(0,local),chunk.deStart),{text:chunk.text.slice(local),start:margin,end:chunk.deEnd,margin:true}];}
 return textBlocks(chunk.text,chunk.deStart);
}
const join=blocks=>({text:blocks.map(b=>b.text).join(''),start:blocks[0]?.start,end:blocks.at(-1)?.end,margin:blocks.some(b=>b.margin)});
function groupedRows(chunk,lessonId){
 const de=sourceBlocks(chunk,lessonId),fa=textBlocks(chunk.fa,chunk.faStart);
 const plan=plans[`${lessonId}:${chunk.key}`];
 if(plan&&plan.reduce((s,p)=>s+p[0],0)===de.length&&plan.reduce((s,p)=>s+p[1],0)===fa.length){let a=0,b=0;return plan.map(([x,y])=>({de:join(de.slice(a,a+=x)),fa:join(fa.slice(b,b+=y))}));}
 if(de.length===fa.length)return de.map((d,i)=>({de:d,fa:fa[i]}));
 // Preserve uncertain source structures together rather than misaligning translations.
 return [{de:join(de),fa:join(fa)}];
}

function listParts(part){
 const boundaries=[0];for(const m of part.text.matchAll(/\n(?=[ \t]*[*•]\s)/g))boundaries.push(m.index+1);boundaries.push(part.text.length);
 return boundaries.slice(0,-1).map((start,i)=>({...part,text:part.text.slice(start,boundaries[i+1]),start:part.start+start,end:part.start+boundaries[i+1]}));
}
export function parallelRows(chunk,lessonId){
 return groupedRows(chunk,lessonId).flatMap(row=>{const de=listParts(row.de),fa=listParts(row.fa);return de.length>1&&de.length===fa.length?de.map((part,i)=>({de:part,fa:fa[i]})):[row];});
}
