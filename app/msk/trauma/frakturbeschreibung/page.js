'use client'
import LegacyLessonMigration from '@/components/lesson-template/LegacyLessonMigration'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { FRAKTUR_LESSON } from '@/data/frakturbeschreibung'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'
import heroStyles from './page.module.css'

const L = (v,l)=>v?.[l]||v?.de||v
const UI={
 de:{zoom:'Bild vergrößern',close:'Bildansicht schließen',mark:'Als gelesen markieren',read:'Als gelesen markiert',signIn:'Anmelden',auth:'Bitte melde dich an, um deinen Lernfortschritt zu speichern.',mcq:'MCQ',flash:'Flashcards'},
 en:{zoom:'Enlarge image',close:'Close image preview',mark:'Mark as read',read:'Marked as read',signIn:'Sign in',auth:'Please sign in to save your learning progress.',mcq:'MCQ',flash:'Flashcards'},
 fa:{zoom:'بزرگ‌نمایی تصویر',close:'بستن تصویر',mark:'علامت‌گذاری به‌عنوان خوانده‌شده',read:'به‌عنوان خوانده‌شده علامت خورد',signIn:'ورود',auth:'برای ذخیره پیشرفت لطفاً وارد شوید.',mcq:'MCQ',flash:'فلش‌کارت'}
}
function Section({id,title,lead,children,open,onToggle}){useMobileLearningLayout();return <section id={id} className={styles.section}><button type="button" className={styles.sectionHeader} onClick={()=>onToggle(id)} aria-expanded={open}><h2>{title}</h2><span>{open?'−':'+'}</span></button><div className={styles.sectionBody} hidden={!open}>{lead&&<p className={styles.lead}>{lead}</p>}{children}</div></section>}
function Table({headers,rows}){return <div className={styles.tableWrap}><table className={styles.table}><thead><tr>{headers.map((h,i)=><th key={i}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j}>{c}</td>)}</tr>)}</tbody></table></div>}
function Cards({items,lang}){return <div className={styles.cardsGrid}>{items.map(item=><div className={styles.infoCard} key={L(item.title,lang)}><span className={styles.cardIcon}>{item.icon}</span><h3>{L(item.title,lang)}</h3><p>{L(item.text,lang)}</p></div>)}</div>}
function Callout({label,cave=false,children}){return <div className={`${styles.callout} ${cave?styles.cave:''}`}><strong>{cave?'⚠️':'💡'} {label}</strong><p>{children}</p></div>}
function MorphologyLegend({lang}) {
 const t=value=>L(value,lang)
 return <div dir={lang==='fa'?'rtl':'ltr'}>
  <ul style={{display:'flex',flexWrap:'wrap',gap:'1rem',listStyle:'none',padding:0}}>{FRAKTUR_LESSON.morphologie.imagePanels.map((panel,index)=><li key={index}><bdi>{t(panel)}</bdi></li>)}</ul>
  <small>{t(FRAKTUR_LESSON.morphologie.imageCredit)}</small>
 </div>
}
function MorphologyCheck({lang}) {
 const [selected,setSelected]=useState(null)
 const check=FRAKTUR_LESSON.sourceCheck
 const t=value=>L(value,lang)
 return <div className={styles.infoCard}>
  <h3>{t(check.title)}</h3><p>{t(check.question)}</p>
  <div role="group" aria-label={t(check.title)} style={{display:'grid',gap:'.6rem',marginBlock:'1rem'}}>
   {check.options.map((option,index)=><button key={index} type="button" className={styles.actionBtn} aria-pressed={selected===index} onClick={()=>setSelected(index)} style={{textAlign:'start',whiteSpace:'normal',borderWidth:selected===index?'3px':'1px',borderStyle:'solid',borderColor:selected===index?'#f97316':undefined}}>{String.fromCharCode(65+index)} · {t(option)}</button>)}
  </div>
  <div aria-live="polite">{selected!==null&&<p>{t(check.feedback[selected])}</p>}</div>
 </div>
}
function ReadButton({isRead,toggleRead,authError,copy}){return <div className={styles.readControl}><button type="button" className={`${styles.readButton} ${isRead?styles.readButtonActive:''}`} onClick={toggleRead}><span className={styles.readCheck}>{isRead?'✓':''}</span><span>{isRead?copy.read:copy.mark}</span></button>{authError&&<div className={styles.readError}><span>{copy.auth}</span><Link href="/sign-in">{copy.signIn}</Link></div>}</div>}

export default function FrakturbeschreibungPage(){
 const{lang}=useLanguage();const copy=UI[lang]||UI.de;const c=v=>L(v,lang);const rtl=lang==='fa';const{isRead,toggleRead,authError}=useLessonReadStatus('frakturbeschreibung');const[active,setActive]=useState('systematik');const[openSection,setOpenSection]=useState('systematik');const[zoomed,setZoomed]=useState(false);const route='/msk/trauma/frakturbeschreibung';const withLang=href=>lang==='de'?href:(href.includes('?')?`${href}&lang=${lang}`:`${href}?lang=${lang}`);const rows=v=>v.map(r=>r.map(c))
 const updateSectionHash=id=>{const hash=id?`#${id}`:'';if(window.location.hash!==hash)window.history.pushState(null,'',`${window.location.pathname}${window.location.search}${hash}`)}
 const toggleSection=id=>{const next=openSection===id?'':id;setOpenSection(next);setActive(next||id);updateSectionHash(next)}
 const openFromToc=id=>{setActive(id);setOpenSection(id);updateSectionHash(id);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}
 useEffect(()=>{const syncFromLocation=()=>{const id=window.location.hash.slice(1);const valid=FRAKTUR_LESSON.sections.some(section=>section.id===id);const next=valid?id:'systematik';setOpenSection(next);setActive(next)};syncFromLocation();window.addEventListener('popstate',syncFromLocation);window.addEventListener('hashchange',syncFromLocation);return()=>{window.removeEventListener('popstate',syncFromLocation);window.removeEventListener('hashchange',syncFromLocation)}},[])
 useEffect(()=>{const os=FRAKTUR_LESSON.sections.map(s=>{const el=document.getElementById(s.id);if(!el)return null;const o=new IntersectionObserver(es=>{if(es[0].isIntersecting)setActive(s.id)},{rootMargin:'-30% 0px -60% 0px'});o.observe(el);return o});return()=>os.forEach(o=>o?.disconnect())},[])
 return <LegacyLessonMigration lessonRoute="/msk/trauma/frakturbeschreibung" lessonId="/msk/trauma/frakturbeschreibung" lang={lang}>
    <main className={`${styles.page} ${styles.mskTraumaPage}`} dir={rtl?'rtl':'ltr'} lang={lang}>
  <InProgressBanner lang={lang}/>
  <header className={styles.header}><div className={styles.breadcrumb}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/msk')}>MSK</Link><span>›</span><span>{c(FRAKTUR_LESSON.breadcrumb)}</span></div><div className={heroStyles.lessonHeroShell}><LessonHero title={c(FRAKTUR_LESSON.title)} imageSrc={FRAKTUR_LESSON.morphologie.image} imageAlt={c(FRAKTUR_LESSON.morphologie.imageAlt)} visualCaption={c(FRAKTUR_LESSON.morphologie.imageCredit)} lang={lang}/></div><div className={styles.actions}><Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=msk&n=12&themen=frakturbeschreibung&from=${encodeURIComponent(withLang(route))}`)}>🎯 {copy.mcq}</Link><Link className={styles.actionBtn} href={withLang(`/flashcards/frakturbeschreibung?from=${encodeURIComponent(withLang(route))}`)}>🧠 {copy.flash}</Link></div></header>
  <div className={styles.readBar}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy}/></div>
  <div className={styles.layout}><aside className={styles.sidebar}><div className={styles.sideTitle}>{c(FRAKTUR_LESSON.toc)}</div>{FRAKTUR_LESSON.sections.map(s=><button type="button" key={s.id} className={`${styles.sideItem} ${active===s.id?styles.sideItemActive:''}`} onClick={()=>openFromToc(s.id)} style={s.emphasis?{color:'#f59e0b',border:'1px solid rgba(245,158,11,.48)',background:'rgba(245,158,11,.12)',fontWeight:950}:undefined}><span>{s.icon}</span><strong>{c(s.label)}</strong></button>)}</aside>
  <div className={styles.main}>
   <Section migrationChapter id="systematik" title={c(FRAKTUR_LESSON.systematik.title)} lead={c(FRAKTUR_LESSON.systematik.lead)} open={openSection==='systematik'} onToggle={toggleSection}><Cards items={FRAKTUR_LESSON.systematik.items} lang={lang}/><Callout label={c(FRAKTUR_LESSON.keyLabel)}>{c(FRAKTUR_LESSON.systematik.key)}</Callout></Section>
   <Section migrationChapter id="entstehung" title={c(FRAKTUR_LESSON.entstehung.title)} lead={c(FRAKTUR_LESSON.entstehung.lead)} open={openSection==='entstehung'} onToggle={toggleSection}><Table headers={FRAKTUR_LESSON.entstehung.headers.map(c)} rows={rows(FRAKTUR_LESSON.entstehung.rows)}/><Callout label={c(FRAKTUR_LESSON.caveLabel)} cave>{c(FRAKTUR_LESSON.entstehung.note)}</Callout></Section>
   <Section migrationChapter id="morphologie" title={c(FRAKTUR_LESSON.morphologie.title)} lead={c(FRAKTUR_LESSON.morphologie.lead)} open={openSection==='morphologie'} onToggle={toggleSection}>
    <Table headers={FRAKTUR_LESSON.morphologie.headers.map(c)} rows={rows(FRAKTUR_LESSON.morphologie.rows)}/>
    <button type="button" className={styles.fractureMorphologyImage} onClick={()=>setZoomed(true)} aria-label={`${copy.zoom}: ${c(FRAKTUR_LESSON.morphologie.imageAlt)}`}><Image src={FRAKTUR_LESSON.morphologie.image} alt={c(FRAKTUR_LESSON.morphologie.imageAlt)} width={960} height={420}/></button>
    <MorphologyLegend lang={lang}/><p>{c(FRAKTUR_LESSON.morphologie.imageTask)}</p>
    <details style={{marginBlock:'1.25rem',padding:'1rem',border:'1px solid rgba(100,116,139,.25)',borderRadius:'1rem'}}>
     <summary style={{cursor:'pointer',fontWeight:800}}>{c({de:'Originalabbildung und drei ergänzende Begriffe aus der PDF',en:'Original figure and three additional PDF terms',fa:'تصویر اصلی و سه اصطلاح تکمیلی PDF'})}</summary>
     <figure style={{margin:'1rem 0'}}><Image src={FRAKTUR_LESSON.morphologie.sourceMorphologyImage} alt={c(FRAKTUR_LESSON.morphologie.sourceMorphologyAlt)} width={830} height={895} style={{display:'block',width:'min(100%, 680px)',height:'auto',marginInline:'auto'}}/><figcaption style={{maxWidth:'70ch',margin:'0.75rem auto',lineHeight:1.6}}>{c(FRAKTUR_LESSON.morphologie.sourceMorphologyNote)}<br/><small>{c(FRAKTUR_LESSON.morphologie.sourceMorphologyCredit)}</small></figcaption></figure>
     <Table headers={[L({de:'Zusätzliche Beschriftung in der Quelle',en:'Additional source labels',fa:'برچسب‌های تکمیلی منبع'},lang),L({de:'Was die Abbildung zeigt',en:'What the figure shows',fa:'آنچه شکل نشان می‌دهد'},lang),L({de:'Für die Beschreibung',en:'For reporting',fa:'برای توصیف'},lang)]} rows={rows(FRAKTUR_LESSON.morphologie.sourceMorphologyRows)}/>
    </details>
    <Callout label={c({de:'Ansatzfragmente',en:'Attachment fragments',fa:'قطعات محل اتصال'})}>{c(FRAKTUR_LESSON.morphologie.avulsionExamples)}</Callout><MorphologyCheck lang={lang}/>
   </Section>
   <Section migrationChapter id="dislokation" title={c(FRAKTUR_LESSON.dislokation.title)} lead={c(FRAKTUR_LESSON.dislokation.lead)} open={openSection==='dislokation'} onToggle={toggleSection}><Table headers={FRAKTUR_LESSON.dislokation.headers.map(c)} rows={rows(FRAKTUR_LESSON.dislokation.rows)}/><Callout label={c(FRAKTUR_LESSON.caveLabel)} cave>{c(FRAKTUR_LESSON.dislokation.cave)}</Callout></Section>
   <Section migrationChapter id="gelenk" title={c(FRAKTUR_LESSON.gelenk.title)} lead={c(FRAKTUR_LESSON.gelenk.lead)} open={openSection==='gelenk'} onToggle={toggleSection}><Cards items={FRAKTUR_LESSON.gelenk.items} lang={lang}/><Callout label={c(FRAKTUR_LESSON.keyLabel)}>{c(FRAKTUR_LESSON.gelenk.key)}</Callout></Section>
   <Section migrationChapter id="bildgebung" title={c(FRAKTUR_LESSON.bildgebung.title)} open={openSection==='bildgebung'} onToggle={toggleSection}><Table headers={FRAKTUR_LESSON.bildgebung.headers.map(c)} rows={rows(FRAKTUR_LESSON.bildgebung.rows)}/><Callout label={c(FRAKTUR_LESSON.caveLabel)} cave>{c(FRAKTUR_LESSON.bildgebung.cave)}</Callout></Section>
   <Section migrationChapter id="befund" title={c(FRAKTUR_LESSON.befund.title)} lead={c(FRAKTUR_LESSON.befund.lead)} open={openSection==='befund'} onToggle={toggleSection}><div className={styles.fractureReportTemplate}><p>{c(FRAKTUR_LESSON.befund.template)}</p></div><Callout label={c({de:'Beispiel',en:'Example',fa:'مثال'})}>{c(FRAKTUR_LESSON.befund.example)}</Callout></Section>
   <Section migrationChapter id="fehler" title={c(FRAKTUR_LESSON.fehler.title)} open={openSection==='fehler'} onToggle={toggleSection}><Cards items={FRAKTUR_LESSON.fehler.items} lang={lang}/></Section>
   <Section migrationChapter id="takehome" title={c(FRAKTUR_LESSON.takehome.title)} lead={c(FRAKTUR_LESSON.takehome.lead)} open={openSection==='takehome'} onToggle={toggleSection}><div className={styles.takeHomeGrid}>{FRAKTUR_LESSON.takehome.items.map((item,i)=><div className={styles.takeHomeItem} key={c(item.title)}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{c(item.title)}</h3><p>{c(item.text)}</p></div></div>)}</div></Section>
   <div className={styles.readBarBottom}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy}/></div>
  </div></div>
  {zoomed&&<div className={styles.strokeImageModal} role="dialog" aria-modal="true" aria-label={c(FRAKTUR_LESSON.morphologie.imageAlt)} onClick={()=>setZoomed(false)}><div className={styles.strokeImageModalContent} onClick={e=>e.stopPropagation()}><button type="button" className={styles.strokeImageModalClose} onClick={()=>setZoomed(false)} aria-label={copy.close}>×</button><img src={FRAKTUR_LESSON.morphologie.image} alt={c(FRAKTUR_LESSON.morphologie.imageAlt)}/><MorphologyLegend lang={lang}/></div></div>}
 </main>
    </LegacyLessonMigration>
}
