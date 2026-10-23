'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import Footer from '@/components/Footer'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { MR_MYEL_ID, MR_MYEL_PATH, MR_MYEL_TITLE, MR_MYEL_SECTIONS, MR_MYEL_LABELS, MR_MYEL_CHECKS, MR_MYEL_TAKEAWAYS } from '@/data/technikMrMyelographyLesson'
import styles from './page.module.css'

function iconFor(name) {
 const paths={fluid:'M12 3C10 7 5 11 5 15a7 7 0 0 0 14 0c0-4-5-8-7-12Z',layers:'m3 7 9-4 9 4-9 4-9-4Zm0 5 9 4 9-4M3 17l9 4 9-4',scope:'M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5M8 12h8m-4-4v8',check:'m4 12 5 5L20 6'}
 return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name]||paths.fluid}/></svg>
}
function Check({item,lang}) {
 const [answer,setAnswer]=useState(null),id=`${MR_MYEL_ID}-${item.slug}-check`
 return <div className={styles.check}><p id={id} className={styles.question}>{item.question[lang]}</p><div role="group" aria-labelledby={id} className={styles.options}>{item.options.map((option,i)=><button type="button" key={i} aria-pressed={answer===i} onClick={()=>setAnswer(i)}><b aria-hidden="true">{'ABCD'[i]}</b><span>{option[lang]}</span></button>)}</div>{answer!==null&&<p role="status" className={styles.feedback}>{item.feedback[answer][lang]}</p>}</div>
}
export default function MrMyelographyLesson() {
 const {lang}=useLanguage(),t=key=>MR_MYEL_LABELS[key][lang]
 const langPath=path=>lang==='de'?path:`${path}${path.includes('?')?'&':'?'}lang=${lang}`
 const returnPath=langPath(MR_MYEL_PATH),sections=MR_MYEL_SECTIONS.map(s=>({...s,label:s.title[lang]}))
 return <><StandardLessonShell lessonId={MR_MYEL_ID} lang={lang} title={MR_MYEL_TITLE[lang]} author="Dr. Zia"
 breadcrumbs={[{label:'RadYar',href:langPath('/')},{label:t('chapter'),href:langPath('/lernen/technik')},{label:MR_MYEL_TITLE[lang]}]}
 sections={sections} labels={Object.fromEntries(Object.entries(MR_MYEL_LABELS).map(([key,value])=>[key,value[lang]]))} renderIcon={iconFor} syncHashNavigation
 actions={{mcq:{label:t('practice'),href:langPath(`/ueben/quiz?fach=technik&n=2&themen=${MR_MYEL_ID}&from=${encodeURIComponent(returnPath)}`)},flashcards:{label:t('cards'),href:langPath(`/flashcards/${MR_MYEL_ID}?from=${encodeURIComponent(returnPath)}`)}}}
 theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:'/educational/mr-myelography/hero.png',heroImageOpacity:.6,accent:'#507f97',accentStrong:'#315b72',accentSoft:'#e8f1f5',secondary:'#648d96',secondaryStrong:'#315c66',heroBase:'#102435'}} heroImageAlt={t('heroAlt')} className={styles.page}
 sources={<LessonSources title={t('sources')} note={t('scope')} items={[{tag:'Primary study',href:'https://pmc.ncbi.nlm.nih.gov/articles/PMC7357665/',title:'Dobrocky et al. · AJNR · 2020',citation:'doi:10.3174/ajnr.A6592',scope:lang==='de'?'Stark T2-gewichtete Sequenzen: Nachweis epiduraler Flüssigkeit und Grenzen der Lecklokalisation.':lang==='en'?'Heavily T2-weighted sequences: epidural fluid detection and limits of leak localization.':'توالی‌های با وزن‌دهی شدید T2: تشخیص مایع اپیدورال و محدودیت تعیین محل نشت.'}]}/> }>
 <div className={styles.copy} lang={lang} dir={lang==='fa'?'rtl':'ltr'}>{sections.map((section,i)=><LessonSection key={section.id} id={section.id} title={section.label} icon={section.icon}>
 {section.text.map((text,j)=><p key={j} className={j===0?styles.lead:undefined}>{text[lang]}</p>)}
 {i===1&&<><figure className={styles.diagram}><ol className={styles.flow}>{['acquisition','mip','correlation'].map((key,j)=><li key={key}><strong>{t(key)}</strong>{j<2&&<span aria-hidden="true">↓</span>}</li>)}</ol><figcaption>{t('diagram')}</figcaption></figure><Check item={MR_MYEL_CHECKS[0]} lang={lang}/></>}
 {i===3&&<><TakeHomeList items={MR_MYEL_TAKEAWAYS.map(item=>({title:item.title[lang],detail:item.detail[lang]}))}/><Check item={MR_MYEL_CHECKS[1]} lang={lang}/></>}
 </LessonSection>)}</div>
 </StandardLessonShell><Footer/></>
}
