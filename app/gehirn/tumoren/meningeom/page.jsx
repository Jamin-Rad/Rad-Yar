'use client'

import Link from 'next/link'
import { useState } from 'react'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { GEHIRN_MENINGEOM_LESSON as lesson } from '@/data/gehirnMeningeomLesson'
import styles from '@/app/technik/kontrastmittel/page.module.css'

const pick = (x, lang) => x?.[lang] || x?.de || ''

function ExtraaxialDiagram({ lang }) {
  const labels = lang === 'fa'
    ? { dura:'دورا', mass:'توده با پایهٔ پهن', brain:'قشر و مادهٔ سفید', cleft:'CSF cleft', tail:'دم دورال' }
    : lang === 'en'
      ? { dura:'Dura', mass:'Broad-based mass', brain:'Cortex and white matter', cleft:'CSF cleft', tail:'Dural tail' }
      : { dura:'Dura', mass:'Raumforderung mit breiter Basis', brain:'Kortex und weiße Substanz', cleft:'CSF-Cleft', tail:'Dural Tail' }
  return <figure role="img" aria-label={Object.values(labels).join(', ')} style={{margin:0,padding:16,border:'1px solid var(--border)',borderRadius:18,background:'var(--bg-card)',display:'grid',gap:10}}>
    <div style={{position:'relative',height:160,marginTop:8}}>
      <div style={{position:'absolute',left:0,right:0,top:60,height:8,background:'#427f90',borderRadius:8}} title={labels.dura}/>
      <div style={{position:'absolute',left:'40%',top:8,width:'24%',height:58,borderRadius:'45% 45% 12% 12%',background:'#b8a4c8',border:'2px solid #755d88',textAlign:'center',paddingTop:14,fontSize:12,fontWeight:700,color:'#382b42'}}>{labels.mass}</div>
      <div style={{position:'absolute',left:'39%',top:57,width:'26%',height:9,borderTop:'2px dashed #d28a45',borderRadius:'50%'}} title={labels.cleft}/>
      <div style={{position:'absolute',left:0,right:0,top:69,height:82,borderRadius:'42% 42% 10px 10px',background:'#dcebef',border:'2px solid #8bb5c0',textAlign:'center',paddingTop:42,fontSize:12,fontWeight:700,color:'#315b66'}}>{labels.brain}</div>
      <div style={{position:'absolute',left:'39%',top:47,width:'26%',height:16,borderTop:'4px solid #8b679d',borderRadius:'50%'}} title={labels.tail}/>
    </div>
    <figcaption style={{display:'flex',justifyContent:'center',flexWrap:'wrap',gap:12,fontSize:12,color:'var(--text-muted)'}}><span>━━ {labels.dura}</span><span>┄┄ {labels.cleft}</span><span>━ {labels.tail}</span><span>{lang==='fa'?'شماتیک است، نه تصویر تشخیصی.':lang==='en'?'Schematic, not a diagnostic image.':'Schemazeichnung, kein diagnostisches Bild.'}</span></figcaption>
  </figure>
}

export default function MeningeomaLessonPage() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const [open,setOpen]=useState(0), [read,setRead]=useState([]), [answer,setAnswer]=useState(null)
  const t=lang==='fa'?{badge:'مغز · پیش‌نویس آموزشی PDF',crumb:'مغز',contents:'مسیر یادگیری',progress:'پیشرفت با علامت‌گذاری بخش خوانده‌شده ثبت می‌شود.',read:'این بخش را خواندم',self:'خودآزمایی: دم دورال',refs:'منبع و محدودیت‌ها',home:'درس‌های مغز',status:'پیش‌نویس آموزشی؛ برای تصمیم بالینی استفاده نشود.'}:lang==='en'?{badge:'Brain · PDF teaching draft',crumb:'Brain',contents:'Learning path',progress:'Progress is recorded when a section is marked as read.',read:'Mark section as read',self:'Self-check: dural tail',refs:'Sources and limits',home:'Brain lessons',status:'Teaching draft; not for clinical decisions.'}:{badge:'Gehirn · PDF-Lernentwurf',crumb:'Gehirn',contents:'Lernpfad',progress:'Fortschritt wird erst nach Markieren des Kapitels erfasst.',read:'Kapitel als gelesen markieren',self:'Selbstcheck: Dural Tail',refs:'Quellen und Grenzen',home:'Gehirn-Lektionen',status:'Lernentwurf; nicht für klinische Entscheidungen.'}
  const url=path=>lang==='de'?path:`${path}?lang=${lang}`
  const chapter=lesson.chapters[open], pct=Math.round(read.length/lesson.chapters.length*100)
  const markRead=()=>setRead(prev=>prev.includes(open)?prev.filter(x=>x!==open):[...prev,open])
  return <main className={styles.page} dir={rtl?'rtl':'ltr'} lang={lang}>
    <header className={styles.header}><nav className={styles.breadcrumb} aria-label={rtl?'مسیر صفحه':lang==='en'?'Breadcrumb':'Seitennavigation'}><Link href={url('/')}>RadYar</Link><span>›</span><Link href={url('/lernen/gehirn')}>{t.crumb}</Link><span>›</span><span>{pick(lesson.title,lang)}</span></nav>
      <div className={styles.hero}><div className={styles.heroText}><span className={styles.sourceBadge}>{t.badge}</span><LessonHero title={pick(lesson.title,lang)} lang={lang} visual={<ExtraaxialDiagram lang={lang}/>} /></div><aside className={styles.heroStats}><div className={styles.heroStat}><strong>45–46</strong><span>{lang==='fa'?'صفحه‌های PDF':lang==='en'?'PDF pages':'PDF-Seiten'}</span><small>{lang==='fa'?'CT، MRI و نشانه‌های محل':'CT, MRI and location signs'}</small></div><p role="status" style={{padding:14}}>{t.status}</p></aside></div>
    </header>
    <div className={styles.layout}><aside className={styles.sidebar}><div className={styles.sideTitle}>{t.contents}</div><div><div style={{height:8,margin:'8px 0',borderRadius:9,background:'var(--border)'}}><div style={{width:`${pct}%`,height:'100%',borderRadius:9,background:'#0f9f6e'}}/></div><small>{pct}% · {t.progress}</small></div>{lesson.chapters.map((c,i)=><button key={c.id} type="button" className={styles.sideItem} aria-current={open===i?'step':undefined} onClick={()=>setOpen(i)}><span aria-hidden="true">{read.includes(i)?'✓':'◈'}</span><strong>{pick(c.title,lang)}</strong></button>)}</aside>
      <div className={styles.main}><section className={styles.section}><div className={styles.sectionHeader}><span className={styles.sectionHeading}><span className={styles.sectionIcon} aria-hidden="true">◈</span><h2>{pick(chapter.title,lang)}</h2></span><span className={styles.sectionToggle} style={{width:'auto',paddingInline:12}}>{lang==='fa'?`PDF ${chapter.pages}`:lang==='en'?`PDF p. ${chapter.pages}`:`PDF S. ${chapter.pages}`}</span></div><div className={styles.sectionBody}>{open===0&&<p className={styles.lead}>{pick(lesson.objective,lang)}</p>}{pick(chapter.text,lang).split('\n\n').map((p,i)=><p key={i} className={i===0?styles.lead:undefined} style={{lineHeight:1.75}}>{p}</p>)}<button type="button" onClick={markRead} aria-pressed={read.includes(open)} className={styles.sectionToggle} style={{width:'auto',padding:'8px 14px',marginTop:14}}>{read.includes(open)?`✓ ${t.read}`:t.read}</button></div></section>
        <div style={{display:'flex',justifyContent:'space-between',gap:12}}><button type="button" className={styles.lessonLink} disabled={open===0} onClick={()=>setOpen(Math.max(0,open-1))}>{lang==='fa'?'فصل پیشین':lang==='en'?'Previous chapter':'Vorheriges Kapitel'}</button><button type="button" className={styles.lessonLink} disabled={open===lesson.chapters.length-1} onClick={()=>setOpen(Math.min(lesson.chapters.length-1,open+1))}>{lang==='fa'?'فصل بعدی':lang==='en'?'Next chapter':'Nächstes Kapitel'}</button></div>
        {open===lesson.chapters.length-1&&<><section className={styles.section}><div className={styles.sectionBody}><h2>{t.self}</h2><p className={styles.lead}>{pick(lesson.assessment.question,lang)}</p><div style={{display:'grid',gap:9}}>{lesson.assessment.options.map((o,i)=><button key={i} type="button" aria-pressed={answer===i} onClick={()=>setAnswer(i)} style={{padding:14,border:'1px solid var(--border)',borderRadius:12,color:'var(--text)',background:'var(--bg-card)',cursor:'pointer',textAlign:'start'}}>{pick(o,lang)}</button>)}</div>{answer!==null&&<p role="status" style={{marginTop:12}}>{answer===lesson.assessment.correctIndex?pick(lesson.assessment.feedback,lang):pick(lesson.assessment.options[lesson.assessment.correctIndex],lang)}</p>}</div></section><aside className={`${styles.callout} ${styles.calloutCave}`}><strong>{t.refs}</strong><p>{pick(lesson.media,lang)}</p><p style={{marginTop:10}}>{pick(lesson.sourceConflict,lang)}</p><p style={{marginTop:10}}>{pick(lesson.reviewStatus,lang)}</p><ul>{lesson.references.map(ref=><li key={ref.label}>{ref.href?<a href={ref.href} target="_blank" rel="noreferrer">{ref.label}</a>:ref.label}</li>)}</ul></aside></>}
        <Link className={styles.lessonLink} href={url('/lernen/gehirn')}>{t.home}<span aria-hidden="true">←</span></Link>
      </div>
    </div>
  </main>
}

