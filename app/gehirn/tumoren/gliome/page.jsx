'use client'

import Link from 'next/link'
import { useState } from 'react'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { GEHIRN_GLIOME_LESSON as lesson } from '@/data/gehirnGliomeLesson'
import styles from '@/app/technik/kontrastmittel/page.module.css'

const pick = (x, lang) => x?.[lang] || x?.de || ''

function GroupMap({ lang }) {
  const labels = lang === 'fa'
    ? ['گلیوم منتشر بزرگسالان','IDH-mutant astrocytoma','IDH-mutant + 1p/19q','IDH-wildtype']
    : lang === 'en'
      ? ['Adult-type diffuse glioma','Astrocytoma, IDH-mutant','Oligodendroglioma, IDH-mutant + 1p/19q','Glioblastoma, IDH-wildtype']
      : ['Adulte diffuse Gliome','Astrozytom, IDH-mutiert','Oligodendrogliom, IDH-mutiert + 1p/19q','Glioblastom, IDH-Wildtyp']
  const circ = lang === 'fa' ? 'گروه جداگانه: گلیوم آستروسیتی محدودشده' : lang === 'en' ? 'Separate family: circumscribed astrocytic glioma' : 'Separate Gruppe: zirkumskriptes astrozytäres Gliom'
  const pa = lang === 'fa' ? 'آستروسیتوم پیلوسیتیک · SEGA · PXA*' : lang === 'en' ? 'Pilocytic astrocytoma · SEGA · PXA*' : 'Pilozytisches Astrozytom · SEGA · PXA*'
  return <figure role="img" aria-label={labels.join('; ')} style={{margin:0,padding:14,border:'1px solid var(--border)',borderRadius:18,background:'var(--bg-card)',display:'grid',gap:10}}>
    <div style={{padding:12,border:'2px solid #3e8da0',borderRadius:14,background:'#eaf4f5'}}>
      <strong style={{display:'block',textAlign:'center',marginBottom:9,color:'#245c69'}}>{labels[0]}</strong>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:8}}>{labels.slice(1).map(label=><div key={label} style={{display:'grid',placeItems:'center',textAlign:'center',minHeight:54,padding:7,border:'1px solid #82b5bd',borderRadius:10,background:'white',fontSize:12,fontWeight:700}}>{label}</div>)}</div>
    </div>
    <div style={{padding:12,border:'2px solid #9774a4',borderRadius:14,background:'#f4eef8',textAlign:'center'}}><strong style={{display:'block',color:'#60486a'}}>{circ}</strong><span style={{display:'block',marginTop:6,fontSize:12,color:'#60486a'}}>{pa}</span></div>
    <figcaption style={{textAlign:'center',fontSize:12,color:'var(--text-muted)'}}>{lang==='fa'?'* فقط نام‌ها؛ بدون آموزش تصویربرداری.':'* Names only; imaging not covered.'}</figcaption>
  </figure>
}

export default function BrainGliomaLessonPage() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const [open,setOpen]=useState(0), [read,setRead]=useState([]), [answer,setAnswer]=useState(null)
  const t=lang==='fa'?{badge:'مغز · پیش‌نویس آموزشی PDF',crumb:'مغز',contents:'مسیر یادگیری',progress:'پیشرفت با علامت‌گذاری بخش خوانده‌شده ثبت می‌شود.',read:'این بخش را خواندم',self:'خودآزمایی: الگوی کیست و ندول',refs:'منبع و محدودیت‌ها',home:'درس‌های مغز',status:'پیش‌نویس آموزشی؛ برای تصمیم بالینی استفاده نشود.'}:lang==='en'?{badge:'Brain · PDF teaching draft',crumb:'Brain',contents:'Learning path',progress:'Progress is recorded when a section is marked as read.',read:'Mark section as read',self:'Self-check: cyst and nodule pattern',refs:'Sources and limits',home:'Brain lessons',status:'Teaching draft; not for clinical decisions.'}:{badge:'Gehirn · PDF-Lernentwurf',crumb:'Gehirn',contents:'Lernpfad',progress:'Fortschritt wird erst nach Markieren des Kapitels erfasst.',read:'Kapitel als gelesen markieren',self:'Selbstcheck: Zyste und Knoten',refs:'Quellen und Grenzen',home:'Gehirn-Lektionen',status:'Lernentwurf; nicht für klinische Entscheidungen.'}
  const url=path=>lang==='de'?path:`${path}?lang=${lang}`
  const chapter=lesson.chapters[open], pct=Math.round(read.length/lesson.chapters.length*100)
  const markRead=()=>setRead(prev=>prev.includes(open)?prev.filter(x=>x!==open):[...prev,open])
  return <main className={styles.page} dir={rtl?'rtl':'ltr'} lang={lang}>
    <header className={styles.header}><nav className={styles.breadcrumb} aria-label={rtl?'مسیر صفحه':lang==='en'?'Breadcrumb':'Seitennavigation'}><Link href={url('/')}>RadYar</Link><span>›</span><Link href={url('/lernen/gehirn')}>{t.crumb}</Link><span>›</span><span>{pick(lesson.title,lang)}</span></nav>
      <div className={styles.hero}><div className={styles.heroText}><span className={styles.sourceBadge}>{t.badge}</span><LessonHero title={pick(lesson.title,lang)} lang={lang} visual={<GroupMap lang={lang}/>} /></div><aside className={styles.heroStats}><div className={styles.heroStat}><strong>41–42</strong><span>{lang==='fa'?'صفحه‌های PDF':lang==='en'?'PDF pages':'PDF-Seiten'}</span><small>{lang==='fa'?'طبقه‌بندی و الگوی پيلوستیک':'Classification and pilocytic pattern'}</small></div><p role="status" style={{padding:14}}>{t.status}</p></aside></div>
    </header>
    <div className={styles.layout}><aside className={styles.sidebar}><div className={styles.sideTitle}>{t.contents}</div><div><div style={{height:8,margin:'8px 0',borderRadius:9,background:'var(--border)'}}><div style={{width:`${pct}%`,height:'100%',borderRadius:9,background:'#0f9f6e'}}/></div><small>{pct}% · {t.progress}</small></div>{lesson.chapters.map((c,i)=><button key={c.id} type="button" className={styles.sideItem} aria-current={open===i?'step':undefined} onClick={()=>setOpen(i)}><span aria-hidden="true">{read.includes(i)?'✓':'◈'}</span><strong>{pick(c.title,lang)}</strong></button>)}</aside>
      <div className={styles.main}><section className={styles.section}><div className={styles.sectionHeader}><span className={styles.sectionHeading}><span className={styles.sectionIcon} aria-hidden="true">◈</span><h2>{pick(chapter.title,lang)}</h2></span><span className={styles.sectionToggle} style={{width:'auto',paddingInline:12}}>{lang==='fa'? `PDF ${chapter.pages}`:lang==='en'?`PDF p. ${chapter.pages}`:`PDF S. ${chapter.pages}`}</span></div><div className={styles.sectionBody}>{open===0&&<p className={styles.lead}>{pick(lesson.objective,lang)}</p>}{open===1&&<figure style={{margin:'10px 0 20px'}}><img src="/gehirn/gliome/pilocytic-case-pdf-p42.jpg" alt={lang==='fa'?'MRI آکسیال در سه توالی T1، T1 پس از تزریق و FLAIR؛ کیست مخچه‌ای با ندول کنتراست‌گیر':'Axial MRI in T1, post-contrast T1, and FLAIR; cerebellar cyst with an enhancing mural nodule'} style={{display:'block',width:'100%',height:'auto',borderRadius:12}}/><figcaption style={{fontSize:12,color:'var(--text-muted)',marginTop:8}}>{lang==='fa'?'Gehirn.pdf، ص. ۴۲؛ Radiopaedia rID 36807. پنل منبع بدون تغییر محتوایی برش خورده است.':'Gehirn.pdf, p. 42; Radiopaedia rID 36807. Source panel cropped without changing its content.'}</figcaption></figure>}{pick(chapter.text,lang).split('\n\n').map((p,i)=><p key={i} className={i===0?styles.lead:undefined} style={{lineHeight:1.75}}>{p}</p>)}<button type="button" onClick={markRead} aria-pressed={read.includes(open)} className={styles.sectionToggle} style={{width:'auto',padding:'8px 14px',marginTop:14}}>{read.includes(open)?`✓ ${t.read}`:t.read}</button></div></section>
        <div style={{display:'flex',justifyContent:'space-between',gap:12}}><button type="button" className={styles.lessonLink} disabled={open===0} onClick={()=>setOpen(Math.max(0,open-1))}>{lang==='fa'?'فصل پیشین':lang==='en'?'Previous chapter':'Vorheriges Kapitel'}</button><button type="button" className={styles.lessonLink} disabled={open===lesson.chapters.length-1} onClick={()=>setOpen(Math.min(lesson.chapters.length-1,open+1))}>{lang==='fa'?'فصل بعدی':lang==='en'?'Next chapter':'Nächstes Kapitel'}</button></div>
        {open===lesson.chapters.length-1&&<><section className={styles.section}><div className={styles.sectionBody}><h2>{t.self}</h2><p className={styles.lead}>{pick(lesson.assessment.question,lang)}</p><div style={{display:'grid',gap:9}}>{lesson.assessment.options.map((o,i)=><button key={i} type="button" aria-pressed={answer===i} onClick={()=>setAnswer(i)} style={{padding:14,border:'1px solid var(--border)',borderRadius:12,color:'var(--text)',background:'var(--bg-card)',cursor:'pointer',textAlign:'start'}}>{pick(o,lang)}</button>)}</div>{answer!==null&&<p role="status" style={{marginTop:12}}>{answer===lesson.assessment.correctIndex?pick(lesson.assessment.feedback,lang):pick(lesson.assessment.options[lesson.assessment.correctIndex],lang)}</p>}</div></section><aside className={`${styles.callout} ${styles.calloutCave}`}><strong>{t.refs}</strong><p>{pick(lesson.media,lang)}</p><p style={{marginTop:10}}>{pick(lesson.sourceConflict,lang)}</p><p style={{marginTop:10}}>{pick(lesson.reviewStatus,lang)}</p><ul>{lesson.references.map(ref=><li key={ref.label}>{ref.href?<a href={ref.href} target="_blank" rel="noreferrer">{ref.label}</a>:ref.label}</li>)}</ul></aside></>}
        <Link className={styles.lessonLink} href={url('/lernen/gehirn')}>{t.home}<span aria-hidden="true">←</span></Link>
      </div>
    </div>
  </main>
}

