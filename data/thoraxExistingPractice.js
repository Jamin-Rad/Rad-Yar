import { FIRST_RIB_LESSON } from './firstRibPseudoarticulation'
import { PULMONARY_INFARCT_LESSON } from './pulmonaryInfarctLesson'

// Reuse the existing, source-scoped local checks; this adds practice access.
const entries = [
  { lesson: FIRST_RIB_LESSON, chapter: 'thorax-thoraxwand', source: 'Thorax.pdf p10; Paling & Dwyer, PMID7217428; ACR pulmonary nodule guidance 2023.' },
  { lesson: PULMONARY_INFARCT_LESSON, chapter: 'thorax-gefaesse-pulmonal', source: 'Thorax.pdf p12; Worsley et al. PIOPED, PMID8372182.' },
]
export const THORAX_EXISTING_QUESTIONS = Object.fromEntries(['de','en','fa'].map(lang => [lang, entries.map(({lesson,source}) => {
  const q = lesson.check
  return {id:`${lesson.id}-${lang}-source-check`,fach:'thorax',tags:[lesson.id],question:q.prompt[lang],options:q.options.map((text,i)=>({id:'ABCD'[i],text:text[lang]})),correct:'ABCD'[q.answerIndex],explanation:q.correct[lang],wrongExplanations:Object.fromEntries(q.options.map((_,i)=>['ABCD'[i],q.retry[lang]]).filter((_,i)=>i!==q.answerIndex)),source}
})]))
export const THORAX_EXISTING_CARDS = entries.map(({lesson,source})=>({id:`${lesson.id}-source-check`,topicId:lesson.id,category:lesson.title,front:lesson.check.prompt,answer:lesson.check.options[lesson.check.answerIndex],explanation:lesson.check.correct,source}))
export const THORAX_EXISTING_CARD_TOPICS = entries.map(({lesson})=>({id:lesson.id,href:`/flashcards/${lesson.id}`,title:lesson.title,description:lesson.check.title,icon:'◉',color:'#397c8b'}))
export const THORAX_EXISTING_TOPIC_GROUPS = entries.map(({lesson,chapter})=>({fachId:'thorax',kapitelId:chapter,title:lesson.title,topics:[{id:lesson.id,title:lesson.title}]}))
