'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, {LessonSection,LessonSources,TakeHomeList} from '@/components/lesson-template/StandardLessonShell'
import {CIRRHOSIS_LESSON} from '@/data/abdomenCirrhosisLesson'
import {CIRRHOSIS_LABELS} from '@/data/abdomenCirrhosisUi'
import styles from './page.module.css'
function iconFor(name){return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={name==='scope'?'M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5M8 12h8m-4-4v8':'m3 7 9-4 9 4-9 4-9-4Zm0 5 9 4 9-4M3 17l9 4 9-4'}/></svg>}
function Check({item,lang,id}){const [answer,setAnswer]=useState(null);return <div className={styles.check}><p id={id} className={styles.question}>{item.question[lang]}</p><div role="group" aria-labelledby={id} className={styles.options}>{item.options.map((o,i)=><button type="button" key={i} aria-pressed={answer===i} onClick={()=>setAnswer(i)}><b aria-hidden="true">{'ABCD'[i]}</b><span>{o[lang]}</span></button>)}</div>{answer!==null&&<p role="status" className={styles.feedback}>{item.feedback[answer][lang]}</p>}</div>}
export default function CirrhosisLesson(){
 const {lang}=useLanguage(),lesson=CIRRHOSIS_LESSON,t=k=>CIRRHOSIS_LABELS[k][lang]
 const langPath=p=>lang==='de'?p:`${p}${p.includes('?')?'&':'?'}lang=${lang}`,returnPath=langPath(lesson.path),sections=lesson.sections.map(s=>({...s,label:s.title[lang]}))
 return <StandardLessonShell lessonId={lesson.id} lang={lang} title={lesson.title[lang]} author="Dr. Zia" breadcrumbs={[{label:'RadYar',href:langPath('/')},{label:t('chapter'),href:langPath('/lernen/abdomen')},{label:lesson.title[lang]}]} sections={[...(sections),{id:'takehome',label:lang==='fa'?'پیام نهایی':'Take Home Message',icon:'summary',emphasis:true}]} labels={Object.fromEntries(Object.entries(CIRRHOSIS_LABELS).map(([k,v])=>[k,v[lang]]))} renderIcon={iconFor} syncHashNavigation actions={{mcq:{label:t('practice'),href:langPath(`/ueben/quiz?fach=abdomen&n=2&themen=${lesson.id}&from=${encodeURIComponent(returnPath)}`)},flashcards:{label:t('cards'),href:langPath(`/flashcards/${lesson.id}?from=${encodeURIComponent(returnPath)}`)}}} theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:lesson.hero,heroImageOpacity:.6,accent:'#507f97',accentStrong:'#315b72',accentSoft:'#e8f1f5',secondary:'#648d96',secondaryStrong:'#315c66',heroBase:'#102435'}} heroImageAlt={lesson.heroAlt[lang]} sources={<LessonSources title={t('sources')} note={lesson.sourceNote[lang]} items={lesson.sources}/> }>
 <div className={styles.copy} lang={lang} dir={lang==='fa'?'rtl':'ltr'}>{sections.map((s,i)=><LessonSection key={s.id} id={s.id} title={s.label} icon={s.icon}>{s.text.map((p,j)=><p key={j} className={j===0?styles.lead:undefined}>{p[lang]}</p>)}
 {s.image&&<figure className={styles.caseFigure}><div className={s.image.clip?styles.ctPanel:styles.fullImage}><Image src={s.image.src} width={s.image.width} height={s.image.height} alt={s.image.alt[lang]} sizes="(max-width:700px) 90vw, 700px"/></div><figcaption>{s.image.caption[lang]} <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3748773/" target="_blank" rel="noopener noreferrer">Sangster et al. 2013 · CC Attribution</a></figcaption></figure>}
 {i===1&&<Check key={`${lang}-${lesson.id}-0`} id={`${lesson.id}-0`} item={lesson.checks[0]} lang={lang}/>}{i===2&&<><Check key={`${lang}-${lesson.id}-1`} id={`${lesson.id}-1`} item={lesson.checks[1]} lang={lang}/></>}
 </LessonSection>)}</div>
<LessonSection id="takehome" icon="summary"><TakeHomeList items={lesson.takeaways.map(v=>({title:v[lang],detail:''}))}/></LessonSection>
</StandardLessonShell>
}
