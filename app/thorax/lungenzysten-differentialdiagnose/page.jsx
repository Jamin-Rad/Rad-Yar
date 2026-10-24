'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources , TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import TopicAssessment from '@/components/lesson-template/TopicAssessment'
import { CYST_ID, CYST_PATH, CYST_TITLE, CYST_SECTIONS, CYST_LABELS, CYST_QUESTIONS, CYST_RECAP } from '@/data/thoraxCystsLesson'
import styles from './page.module.css'
import DistributionDiagram from './DistributionDiagram'
function Icon({name}) {
 const paths={scope:'M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5M8 12h8m-4-4v8',layers:'m3 7 9-4 9 4-9 4-9-4Zm0 5 9 4 9-4M3 17l9 4 9-4',lungs:'M12 3v9M9 6C5 7 3 12 3 18c0 3 6 2 7-1V9m5-3c4 1 6 6 6 12 0 3-6 2-7-1V9'}
 return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7"><path d={paths[name]||paths.scope}/></svg>
}
export default function LungCystDifferentialPage(){
 const {lang}=useLanguage(), t=value=>value[lang]||value.de
 const local=href=>{ const [path,hash]=href.split('#'); return `${path}${path.includes('?')?'&':'?'}lang=${lang}${hash?'#'+hash:''}` }
 const returnTo=local(CYST_PATH)
 const sections=CYST_SECTIONS.map(s=>({...s,label:t(s.title)}))
 const sources=[
 {tag:'Terminology',title:'Fleischner Society · 2024',href:'https://doi.org/10.1148/radiol.232558',citation:'Glossary of Terms for Thoracic Imaging: cyst, cystic, bulla, cavity, honeycombing.'},
 {tag:'Guideline',title:'ATS/JRS · LAM · 2017',href:'https://pmc.ncbi.nlm.nih.gov/articles/PMC5694834/',citation:'Lymphangioleiomyomatosis Diagnosis and Management: HRCT, Transbronchial Lung Biopsy, and Pleural Disease Management.'},
 {tag:'Guideline',title:'ERN GENTURIS · Birt-Hogg-Dubé · 2024',href:'https://doi.org/10.1038/s41431-024-01671-2',citation:'Clinical practice guidelines for diagnosis, surveillance and management; diagnostic recommendations 1–6.'},
 {tag:'Consensus',title:'Goyal et al. · LCH · 2022',href:'https://doi.org/10.1182/blood.2021014343',citation:'International expert consensus recommendations for the diagnosis and treatment of Langerhans cell histiocytosis in adults.'}
 ]
 return <StandardLessonShell lessonId={CYST_ID} lang={lang} title={t(CYST_TITLE)} author="Dr. Zia" breadcrumbs={[{label:'RadYar',href:local('/')},{label:t(CYST_LABELS.chapter),href:local('/lernen/thorax')},{label:t(CYST_TITLE)}]} sections={[...(sections),{id:'takehome',label:lang==='fa'?'پیام نهایی':'Take Home Message',icon:'summary',emphasis:true}]} labels={Object.fromEntries(Object.entries(CYST_LABELS).map(([k,v])=>[k,t(v)]))} renderIcon={name=><Icon name={name}/>} syncHashNavigation
 actions={{mcq:{label:t(CYST_LABELS.practice),href:local(`/ueben/quiz?fach=thorax&n=2&themen=${CYST_ID}&from=${encodeURIComponent(returnTo)}`)},flashcards:{label:t(CYST_LABELS.cards),href:local(`/flashcards/${CYST_ID}?from=${encodeURIComponent(returnTo)}`)}}}
 theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:'/educational/thorax-cysts/hero.png',heroImageOpacity:.6,accent:'#507f97',accentStrong:'#315b72',accentSoft:'#e8f1f5',secondary:'#648d96',secondaryStrong:'#315c66',heroBase:'#102435'}} heroImageAlt={t(CYST_LABELS.heroAlt)}
 sources={<LessonSources title={t(CYST_LABELS.sources)} note={t(CYST_LABELS.scope)} items={sources}/>}>
 <div className={styles.copy} lang={lang} dir={lang==='fa'?'rtl':'ltr'}>{sections.map((section,i)=><LessonSection key={section.id} id={section.id} title={section.label} icon={section.icon}>
 {section.text.map((text,j)=><p key={j}>{t(text)}</p>)}
 {i===2&&<DistributionDiagram lang={lang}/>}
 {section.cards&&<div className={styles.grid}>{section.cards.map(([title,text])=><article key={title.de}><h3>{t(title)}</h3><p>{t(text)}</p></article>)}</div>}
 {i===0&&<nav className={styles.related}><Link href={local('/thorax/hrct/dichteminderung#begriffe')}>{t({de:'CT-Vergleich: Bulla und Zyste',en:'CT comparison: bulla and cyst',fa:'مقایسهٔ CT: بولا و کیست'})}</Link><Link href={local('/thorax/kavitaeten')}>{t(CYST_LABELS.cavityLink)}</Link><Link href={local('/thorax/hrct/architekturmuster#honeycombing')}>{t({de:'Honeycombing im CT',en:'Honeycombing on CT',fa:'هانی‌کومبینگ در CT'})}</Link></nav>}
 {i===1&&<><figure className={styles.figure}><a href="/educational/thorax-cysts/source-cyst.jpg" target="_blank" rel="noopener noreferrer"><Image src="/educational/thorax-cysts/source-cyst.jpg" alt={t(section.text[0])} width={630} height={571} sizes="(max-width:700px) 90vw, 630px"/></a><figcaption>{t(section.caption)} <a href="https://radiopaedia.org/cases/10493" target="_blank" rel="noopener noreferrer">Radiopaedia ↗</a></figcaption></figure><TopicAssessment key={lang} question={CYST_QUESTIONS[lang][0]} topic={CYST_ID} fach="thorax" lang={lang} returnTo={returnTo}/></>}
 {i===2&&<><nav className={styles.related}><Link href={local('/thorax/lch-lunge')}>{t(CYST_LABELS.lchLink)}</Link><Link href={local('/thorax/bronchiektasen')}>{t(CYST_LABELS.bronchiectasisLink)}</Link><Link href={local('/thorax/kavitaeten')}>{t(CYST_LABELS.cavityLink)}</Link></nav><TopicAssessment key={lang} question={CYST_QUESTIONS[lang][1]} topic={CYST_ID} fach="thorax" lang={lang} returnTo={returnTo}/></>}
 </LessonSection>)}</div>
<LessonSection id="takehome" icon="summary"><TakeHomeList items={CYST_RECAP.map((item)=>({title:t(item),detail:''}))}/></LessonSection>
</StandardLessonShell>
}
