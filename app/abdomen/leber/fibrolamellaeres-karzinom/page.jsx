'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import styles from './page.module.css'
import { FLC_LESSON } from '@/data/abdomenFlcLesson'
const L=(de,en,fa)=>({de,en,fa})
const labels={takeHome:L('Drei Regeln mitnehmen','Three rules to remember','سه نکته برای یادآوری'),contents:L('Lektionsinhalt','Lesson contents','محتوای درس'),path:L('Lernpfad','Learning path','مسیر یادگیری'),progress:L('gelesen','read','خوانده‌شده'),continue:L('Lektion fortsetzen','Continue lesson','ادامهٔ درس'),completeLesson:L('Ganze Lektion als gelesen markieren','Mark whole lesson as read','علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),lessonCompleted:L('Ganze Lektion gelesen','Whole lesson read','کل درس خوانده شد'),complete:L('Abschnitt als gelesen markieren','Mark section as read','علامت‌گذاری بخش به‌عنوان خوانده‌شده'),completed:L('Als gelesen markiert','Marked as read','خوانده‌شده'),open:L('Abschnitt öffnen','Open section','بازکردن بخش'),close:L('Schließen','Close','بستن'),chapter:L('Leber','Liver','کبد'),sources:L('Quellen','Sources','منابع'),practice:L('Wissen prüfen','Check your knowledge','دانش خود را بسنجید'),cards:L('Karteikarten','Flashcards','فلش‌کارت‌ها'),pattern:L('Beobachtung','Observation','مشاهده'),meaning:L('Einordnung','Interpretation','تفسیر'),check:L('Kurz prüfen','Quick check','خودآزمایی کوتاه')}
function Icon({name}) {
 const paths={airway:'M12 3v9m0 0L5 19m7-7 7 7M8 16l-4-1m12 1 4-1',branch:'M12 21V11m0 0L5 5m7 6 7-6M5 5v4m0-4h4m10 0h-4m4 0v4',layers:'m3 7 9-4 9 4-9 4-9-4Zm0 5 9 4 9-4M3 17l9 4 9-4',scope:'M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5M8 12h8m-4-4v8',summary:'M5 6h14M5 12h14M5 18h14'}
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]||paths.airway}/></svg>
}
function Check({item,lang,lessonId}) {
 const [choice,setChoice]=useState(null),id=`${lessonId}-${item.slug}-check`
 return <div className={styles.check}><h3>{labels.check[lang]}</h3><p id={id}>{item.question[lang]}</p><div className={styles.options} role="group" aria-labelledby={id}>{item.options.map((option,i)=><button type="button" key={i} aria-pressed={choice===i} onClick={()=>setChoice(i)}><b dir="ltr">{'ABCD'[i]}.</b><span>{option[lang]}</span></button>)}</div><p role="status" aria-live="polite" className={choice!==null?styles.feedback:undefined}>{choice!==null?item.feedback[choice][lang]:''}</p></div>
}
export default function FlcLesson() {
 const lesson=FLC_LESSON
 const {lang}=useLanguage(),t=value=>value?.[lang]||value?.de||value
 const local=path=>`${path}${path.includes('?')?'&':'?'}lang=${lang}`
 const returnTo=local(lesson.path)
 const sections=lesson.chapters.map(c=>({...c,label:t(c.title)}))
 return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="Dr. Zia" syncHashNavigation
 breadcrumbs={[{label:'RadYar',href:local('/')},{label:t(labels.chapter),href:local('/lernen/abdomen')},{label:t(lesson.title)}]} sections={sections} labels={Object.fromEntries(Object.entries(labels).map(([k,v])=>[k,t(v)]))} renderIcon={name=><Icon name={name}/>}
 actions={{mcq:{label:t(labels.practice),href:local(`/ueben/quiz?fach=abdomen&n=2&themen=${lesson.id}&from=${encodeURIComponent(returnTo)}`)},flashcards:{label:t(labels.cards),href:local(`/flashcards/${lesson.id}?from=${encodeURIComponent(returnTo)}`)}}}
 theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:lesson.hero,heroImageOpacity:.82,accent:'#477e85',accentStrong:'#285a64',accentSoft:'#e6f1f3',secondary:'#a17b96',secondaryStrong:'#69566d',heroBase:'#142a37'}} heroImageAlt={t(lesson.heroAlt)} className={styles.page}
 sources={<LessonSources title={t(labels.sources)} note={t(lesson.scope)} items={lesson.sources.map(s=>({...s,tag:'FLC'}))}/> }>
 <div className={styles.copy} lang={lang} dir={lang==='fa'?'rtl':'ltr'}>{lesson.chapters.map(section=><LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)}>
 {section.paragraphs?.map((p,i)=><p key={i}>{t(p)}</p>)}
 {section.image&&<figure className={styles.figure}><Image src={section.image.src} alt={t(section.image.alt)} width={section.image.width} height={section.image.height} sizes="(max-width: 700px) 90vw, 784px"/><figcaption>{t(section.image.caption)}<a href={section.image.src} target="_blank" rel="noopener noreferrer">{t(L("Abbildung in voller Größe öffnen", "Open full-size figure", "بازکردن تصویر در اندازهٔ کامل"))}</a><a href="https://doi.org/10.1186/s40792-021-01295-4" target="_blank" rel="noopener noreferrer">Takahashi et al.2021 · Figure 1 · CC BY 4.0</a></figcaption></figure>}
 {section.rows&&<div className={styles.tableWrap} role="region" aria-label={t(section.title)} tabIndex={0}><table><thead><tr><th>{t(labels.pattern)}</th><th>{t(labels.meaning)}</th></tr></thead><tbody>{section.rows.map((row,i)=><tr key={i}><th scope="row">{t(row[0])}</th><td>{t(row[1])}</td></tr>)}</tbody></table></div>}
 {section.cave&&<aside className={styles.cave}>{t(section.cave)}</aside>}
 {section.checks?.map(i=><Check key={`${lang}-${i}`} item={lesson.checks[i]} lang={lang} lessonId={lesson.id}/>)}
 {section.takeaways&&<TakeHomeList items={section.takeaways.map(item=>({title:t(item.title),detail:t(item.detail)}))}/>}
 </LessonSection>)}</div>
 </StandardLessonShell>
}