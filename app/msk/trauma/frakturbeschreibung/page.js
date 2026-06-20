'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { FRAKTUR_LESSON } from '@/data/frakturbeschreibung'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const L = (v,l)=>v?.[l]||v?.de||v
const UI={
 de:{zoom:'Bild vergrößern',close:'Bildansicht schließen',mark:'Als gelesen markieren',read:'Als gelesen markiert',signIn:'Anmelden',auth:'Bitte melde dich an, um deinen Lernfortschritt zu speichern.',mcq:'MCQ',flash:'Flashcards'},
 en:{zoom:'Enlarge image',close:'Close image preview',mark:'Mark as read',read:'Marked as read',signIn:'Sign in',auth:'Please sign in to save your learning progress.',mcq:'MCQ',flash:'Flashcards'},
 fa:{zoom:'بزرگ‌نمایی تصویر',close:'بستن تصویر',mark:'علامت‌گذاری به‌عنوان خوانده‌شده',read:'به‌عنوان خوانده‌شده علامت خورد',signIn:'ورود',auth:'برای ذخیره پیشرفت لطفاً وارد شوید.',mcq:'MCQ',flash:'فلش‌کارت'}
}
function Section({id,title,lead,children}){const mobile=useMobileLearningLayout();const[open,setOpen]=useState(true);useEffect(()=>setOpen(!mobile),[mobile,id]);return <section id={id} className={styles.section}><button type="button" className={styles.sectionHeader} onClick={()=>setOpen(v=>!v)} aria-expanded={open}><h2>{title}</h2><span>{open?'−':'+'}</span></button>{open&&<div className={styles.sectionBody}>{lead&&<p className={styles.lead}>{lead}</p>}{children}</div>}</section>}
function Table({headers,rows}){return <div className={styles.tableWrap}><table className={styles.table}><thead><tr>{headers.map((h,i)=><th key={i}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j}>{c}</td>)}</tr>)}</tbody></table></div>}
function Cards({items,lang}){return <div className={styles.cardsGrid}>{items.map(item=><div className={styles.infoCard} key={L(item.title,lang)}><span className={styles.cardIcon}>{item.icon}</span><h3>{L(item.title,lang)}</h3><p>{L(item.text,lang)}</p></div>)}</div>}
function Callout({label,cave=false,children}){return <div className={`${styles.callout} ${cave?styles.cave:''}`}><strong>{cave?'⚠️':'💡'} {label}</strong><p>{children}</p></div>}
function ReadButton({isRead,toggleRead,authError,copy}){return <div className={styles.readControl}><button type="button" className={`${styles.readButton} ${isRead?styles.readButtonActive:''}`} onClick={toggleRead}><span className={styles.readCheck}>{isRead?'✓':''}</span><span>{isRead?copy.read:copy.mark}</span></button>{authError&&<div className={styles.readError}><span>{copy.auth}</span><Link href="/sign-in">{copy.signIn}</Link></div>}</div>}

export default function FrakturbeschreibungPage(){
 const{lang}=useLanguage();const copy=UI[lang]||UI.de;const c=v=>L(v,lang);const rtl=lang==='fa';const{isRead,toggleRead,authError}=useLessonReadStatus('frakturbeschreibung');const[active,setActive]=useState('');const[zoomed,setZoomed]=useState(false);const route='/msk/trauma/frakturbeschreibung';const withLang=href=>lang==='de'?href:(href.includes('?')?`${href}&lang=${lang}`:`${href}?lang=${lang}`);const rows=v=>v.map(r=>r.map(c))
 useEffect(()=>{const os=FRAKTUR_LESSON.sections.map(s=>{const el=document.getElementById(s.id);if(!el)return null;const o=new IntersectionObserver(es=>{if(es[0].isIntersecting)setActive(s.id)},{rootMargin:'-30% 0px -60% 0px'});o.observe(el);return o});return()=>os.forEach(o=>o?.disconnect())},[])
 return <main className={`${styles.page} ${styles.mskTraumaPage}`} dir={rtl?'rtl':'ltr'} lang={lang}>
  <InProgressBanner lang={lang}/>
  <header className={styles.header}><div className={styles.breadcrumb}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/msk')}>MSK</Link><span>›</span><span>{c(FRAKTUR_LESSON.breadcrumb)}</span></div><div className={styles.hero}><div className={styles.heroText}><span className={styles.sourceBadge}>{FRAKTUR_LESSON.sourceLabel}</span><h1>{c(FRAKTUR_LESSON.title)}</h1><p>{c(FRAKTUR_LESSON.definition)}</p><div className={styles.actions}><Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=msk&n=12&themen=frakturbeschreibung&from=${encodeURIComponent(withLang(route))}`)}>🎯 {copy.mcq}</Link><Link className={styles.actionBtn} href={withLang(`/flashcards/frakturbeschreibung?from=${encodeURIComponent(withLang(route))}`)}>🧠 {copy.flash}</Link></div></div><div className={styles.heroStats}>{FRAKTUR_LESSON.heroCards.map(card=><div className={styles.heroStat} key={c(card.value)}><strong>{c(card.value)}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small></div>)}</div></div></header>
  <div className={styles.readBar}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy}/></div>
  <div className={styles.layout}><aside className={styles.sidebar}><div className={styles.sideTitle}>{c(FRAKTUR_LESSON.toc)}</div>{FRAKTUR_LESSON.sections.map(s=><button type="button" key={s.id} className={`${styles.sideItem} ${active===s.id?styles.sideItemActive:''}`} onClick={()=>document.getElementById(s.id)?.scrollIntoView({behavior:'smooth'})} style={s.emphasis?{color:'#f59e0b',border:'1px solid rgba(245,158,11,.48)',background:'rgba(245,158,11,.12)',fontWeight:950}:undefined}><span>{s.icon}</span><strong>{c(s.label)}</strong></button>)}</aside>
  <div className={styles.main}>
   <Section id="systematik" title={c(FRAKTUR_LESSON.systematik.title)} lead={c(FRAKTUR_LESSON.systematik.lead)}><Cards items={FRAKTUR_LESSON.systematik.items} lang={lang}/><Callout label={c(FRAKTUR_LESSON.keyLabel)}>{c(FRAKTUR_LESSON.systematik.key)}</Callout></Section>
   <Section id="entstehung" title={c(FRAKTUR_LESSON.entstehung.title)} lead={c(FRAKTUR_LESSON.entstehung.lead)}><Table headers={FRAKTUR_LESSON.entstehung.headers.map(c)} rows={rows(FRAKTUR_LESSON.entstehung.rows)}/></Section>
   <Section id="morphologie" title={c(FRAKTUR_LESSON.morphologie.title)} lead={c(FRAKTUR_LESSON.morphologie.lead)}><Table headers={FRAKTUR_LESSON.morphologie.headers.map(c)} rows={rows(FRAKTUR_LESSON.morphologie.rows)}/><button type="button" className={styles.fractureMorphologyImage} onClick={()=>setZoomed(true)} aria-label={`${copy.zoom}: ${c(FRAKTUR_LESSON.morphologie.imageAlt)}`}><Image src={FRAKTUR_LESSON.morphologie.image} alt={c(FRAKTUR_LESSON.morphologie.imageAlt)} width={1158} height={1230}/></button></Section>
   <Section id="dislokation" title={c(FRAKTUR_LESSON.dislokation.title)} lead={c(FRAKTUR_LESSON.dislokation.lead)}><Table headers={FRAKTUR_LESSON.dislokation.headers.map(c)} rows={rows(FRAKTUR_LESSON.dislokation.rows)}/><Callout label={c(FRAKTUR_LESSON.caveLabel)} cave>{c(FRAKTUR_LESSON.dislokation.cave)}</Callout></Section>
   <Section id="gelenk" title={c(FRAKTUR_LESSON.gelenk.title)} lead={c(FRAKTUR_LESSON.gelenk.lead)}><Cards items={FRAKTUR_LESSON.gelenk.items} lang={lang}/><Callout label={c(FRAKTUR_LESSON.keyLabel)}>{c(FRAKTUR_LESSON.gelenk.key)}</Callout></Section>
   <Section id="bildgebung" title={c(FRAKTUR_LESSON.bildgebung.title)}><Table headers={FRAKTUR_LESSON.bildgebung.headers.map(c)} rows={rows(FRAKTUR_LESSON.bildgebung.rows)}/><Callout label={c(FRAKTUR_LESSON.caveLabel)} cave>{c(FRAKTUR_LESSON.bildgebung.cave)}</Callout></Section>
   <Section id="befund" title={c(FRAKTUR_LESSON.befund.title)} lead={c(FRAKTUR_LESSON.befund.lead)}><div className={styles.fractureReportTemplate}><p>{c(FRAKTUR_LESSON.befund.template)}</p></div><Callout label={c({de:'Beispiel',en:'Example',fa:'مثال'})}>{c(FRAKTUR_LESSON.befund.example)}</Callout></Section>
   <Section id="fehler" title={c(FRAKTUR_LESSON.fehler.title)}><Cards items={FRAKTUR_LESSON.fehler.items} lang={lang}/></Section>
   <Section id="takehome" title={c(FRAKTUR_LESSON.takehome.title)} lead={c(FRAKTUR_LESSON.takehome.lead)}><div className={styles.takeHomeGrid}>{FRAKTUR_LESSON.takehome.items.map((item,i)=><div className={styles.takeHomeItem} key={c(item.title)}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{c(item.title)}</h3><p>{c(item.text)}</p></div></div>)}</div></Section>
   <div className={styles.readBarBottom}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy}/></div>
  </div></div>
  {zoomed&&<div className={styles.strokeImageModal} role="dialog" aria-modal="true" aria-label={c(FRAKTUR_LESSON.morphologie.imageAlt)} onClick={()=>setZoomed(false)}><div className={styles.strokeImageModalContent} onClick={e=>e.stopPropagation()}><button type="button" className={styles.strokeImageModalClose} onClick={()=>setZoomed(false)} aria-label={copy.close}>×</button><img src={FRAKTUR_LESSON.morphologie.image} alt={c(FRAKTUR_LESSON.morphologie.imageAlt)}/></div></div>}
 </main>
}
