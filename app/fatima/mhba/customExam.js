import {statements} from './exam.js';
import {statementTranslations,explanationsDe} from './statementTranslations.js';
import {extraChapterPractice} from './chapterPractice.js';
export const topicKey=(lesson,chapter)=>`${lesson}:${chapter}`;
export function examTopics(lessons){return Object.values(lessons).flatMap(l=>l.chapters.filter(c=>!['intro','literatur'].includes(c.id)).map(c=>({...c,key:topicKey(l.id,c.id),lessonId:l.id,lessonFa:l.fa})));}
export function buildCustomExam(lessons,selected,type){
 const items=new Map();
 for(const topic of examTopics(lessons).filter(t=>selected.includes(t.key))){
  const l=lessons[topic.lessonId];
  if(type!=='questions'){
   for(const i of topic.statementIds){const id=`tf-${l.id}-${i}`;items.set(id,{...statements[l.id][i],id,kind:'binary',fa:statementTranslations[l.id][i],whyDe:explanationsDe[l.id][i],lessonId:l.id});}
   (extraChapterPractice[topic.key]||[]).forEach((q,i)=>{const id=`extra-${topic.key}-${i}`;items.set(id,{...q,id,kind:'binary',lessonId:l.id});});
  }
  if(type!=='binary'){
   const cards=topic.id==='fragen'?l.cards.filter(c=>c.source==='official'):l.cards.filter(c=>c.source==='concept'&&c.chapterId===topic.id);
   for(const c of cards)items.set(`qa-${c.id}`,{...c,id:`qa-${c.id}`,kind:'written'});
  }
 }
 return [...items.values()];
}

export function buildLessonPractice(lessons,selected,type){
 const chosen=Object.fromEntries(Object.entries(lessons).filter(([,l])=>selected.includes(l.id)));
 if(type==='official')return Object.values(chosen).flatMap(l=>l.cards.filter(c=>c.source==='official').map(c=>({...c,id:`qa-${c.id}`,kind:'written'})));
 const items=buildCustomExam(chosen,examTopics(chosen).map(t=>t.key),type==='written'?'questions':type);
 return items.filter(q=>!q.official);
}
