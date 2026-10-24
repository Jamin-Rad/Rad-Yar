'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { LCH_ID, LCH_PATH, LCH_TITLE, LCH_SECTIONS, LCH_LABELS, LCH_CHECKS, LCH_IMAGES, LCH_TAKEAWAYS } from '@/data/thoraxLchLesson'
import styles from './page.module.css'
function iconFor(name) {
 const paths={lungs:'M12 3v9M9 6C5 7 3 12 3 18c0 3 6 2 7-1V9m5-3c4 1 6 6 6 12 0 3-6 2-7-1V9m-5 4 3-3 3 3',layers:'m3 7 9-4 9 4-9 4-9-4Zm0 5 9 4 9-4M3 17l9 4 9-4',scope:'M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5M8 12h8m-4-4v8'}
 return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]||paths.lungs}/></svg>
}
function Check({item,lang}) {
 const [answer,setAnswer]=useState(null),id=`${LCH_ID}-${item.slug}-check`
 return <div className={styles.check}><p id={id} className={styles.question}>{item.question[lang]}</p><div role="group" aria-labelledby={id} className={styles.options}>{item.options.map((option,i)=><button type="button" key={i} aria-pressed={answer===i} onClick={()=>setAnswer(i)}><b aria-hidden="true">{'ABCD'[i]}</b><span>{option[lang]}</span></button>)}</div>{answer!==null&&<p role="status" className={styles.feedback}>{item.feedback[answer][lang]}</p>}</div>
}
export default function PulmonaryLchLesson() {
 const {lang}=useLanguage(),t=key=>LCH_LABELS[key][lang]
 const langPath=path=>lang==='de'?path:`${path}${path.includes('?')?'&':'?'}lang=${lang}`
 const returnPath=langPath(LCH_PATH),sections=LCH_SECTIONS.map(s=>({...s,label:s.title[lang]}))
 return <StandardLessonShell lessonId={LCH_ID} lang={lang} title={LCH_TITLE[lang]} author="Dr. Zia"
 breadcrumbs={[{label:'RadYar',href:langPath('/')},{label:t('chapter'),href:langPath('/lernen/thorax')},{label:LCH_TITLE[lang]}]}
 sections={sections} labels={Object.fromEntries(Object.entries(LCH_LABELS).map(([key,value])=>[key,value[lang]]))} renderIcon={iconFor} syncHashNavigation
 actions={{mcq:{label:t('practice'),href:langPath(`/ueben/quiz?fach=thorax&n=2&themen=${LCH_ID}&from=${encodeURIComponent(returnPath)}`)},flashcards:{label:t('cards'),href:langPath(`/flashcards/${LCH_ID}?from=${encodeURIComponent(returnPath)}`)}}}
 theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:'/educational/thorax-lch/hero.png',heroImageOpacity:.6,accent:'#507f97',accentStrong:'#315b72',accentSoft:'#e8f1f5',secondary:'#648d96',secondaryStrong:'#315c66',heroBase:'#102435'}} heroImageAlt={t('heroAlt')} className={styles.page}
 sources={<LessonSources title={t('sources')} note={t('scope')} items={[{tag:'Consensus',href:'https://doi.org/10.1182/blood.2021014343',title:'Goyal et al. · Blood · 2022',citation:'International expert consensus recommendations for the diagnosis and treatment of Langerhans cell histiocytosis in adults. 139:2601–2621.',scope:t('consensusScope')}]}/> }>
 <div className={styles.copy} lang={lang} dir={lang==='fa'?'rtl':'ltr'}>{sections.map((section,i)=><LessonSection key={section.id} id={section.id} title={section.label} icon={section.icon}>
 {section.text.map((text,j)=><p key={j} className={j===0?styles.lead:undefined}>{text[lang]}</p>)}
 {i===1&&<><div className={styles.images}>{LCH_IMAGES.map(img=><figure key={img.src}><h3>{img.label[lang]}</h3><a href={img.src} target="_blank" rel="noopener noreferrer"><Image src={img.src} alt={img.alt[lang]} width={img.width} height={img.height} sizes="(max-width: 700px) 90vw, 40vw"/></a><figcaption>{img.caption[lang]}</figcaption></figure>)}</div><p className={styles.source}><a href="https://radiopaedia.org/cases/161054" target="_blank" rel="noopener noreferrer">{t('imageSource')}</a></p><p className={styles.caveat}>{t('imageLimit')}</p><Check key={`${lang}-${LCH_CHECKS[0].slug}`} item={LCH_CHECKS[0]} lang={lang}/></>}
 {i===2&&<><Check key={`${lang}-${LCH_CHECKS[1].slug}`} item={LCH_CHECKS[1]} lang={lang}/><TakeHomeList items={LCH_TAKEAWAYS.map(item=>({title:item.title[lang],detail:item.detail[lang]}))}/></>}
 </LessonSection>)}</div>
 </StandardLessonShell>
}
