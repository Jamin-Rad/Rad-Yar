import { ORMOND_LESSON } from './ormondLesson'
import { PANNICULITIS_LESSON } from './panniculitisLesson'
import { PERITONEAL_LESSON } from './peritonealCarcinomatosisLesson'
const entries=[
 {lesson:ORMOND_LESSON,source:'Abdomen.pdf physical pp95–96; existing Ormond lesson source qualifications preserved.'},
 {lesson:PANNICULITIS_LESSON,source:'Abdomen.pdf physical p98; existing panniculitis lesson source qualifications preserved.'},
 {lesson:PERITONEAL_LESSON,source:'Abdomen.pdf physical p99; existing peritoneal carcinomatosis lesson source qualifications preserved.'}
]
// Reuse the lesson's authored retrieval pairs; include its title so cards remain self-contained outside the lesson.
export const ABDOMEN_LEGACY_CARDS=entries.flatMap(({lesson,source})=>lesson.cards.map(([front,answer],i)=>({id:`${lesson.id}-retrieval-${i+1}`,topicId:lesson.id,category:lesson.title,front:Object.fromEntries(['de','en','fa'].map(lang=>[lang,`${lesson.title[lang]} — ${front[lang]}`])),answer,source})))
export const ABDOMEN_LEGACY_CARD_TOPICS=entries.map(({lesson})=>({id:lesson.id,href:`/flashcards/${lesson.id}`,title:lesson.title,description:{de:'Bildmuster und diagnostische Grenzen',en:'Imaging patterns and diagnostic limits',fa:'الگوهای تصویربرداری و محدودیت‌های تشخیصی'},icon:'◉',color:'#397c8b'}))
