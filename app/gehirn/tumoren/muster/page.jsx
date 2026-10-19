'use client'

import Link from 'next/link'
import { useState } from 'react'
import LessonHero from '@/components/LessonHero'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { GEHIRN_TUMORMUSTER } from '@/data/gehirnTumorMusterLesson'
import styles from '@/app/technik/kontrastmittel/page.module.css'

const pick = (value, lang) => value?.[lang] || value?.de || ''

function PatternPath({ lang }) {
  const labels = lang === 'fa'
    ? ['کمپارتمان','محل','سیگنال','افتراق']
    : lang === 'en'
      ? ['Compartment','Location','Signal','Differential']
      : ['Kompartiment','Lokalisation','Signal','Differenzialdiagnose']
  return <figure aria-label={labels.join(' → ')} style={{margin:'12px 0 22px',padding:18,border:'1px solid var(--border)',borderRadius:20,background:'var(--surface-soft)'}}>
    <svg viewBox="0 0 760 136" role="img" aria-label={labels.join(' → ')} style={{display:'block',width:'100%',height:'auto'}}>
      {[0,1,2,3].map((n)=>{const x=10+n*188;return <g key={labels[n]}><rect x={x} y="27" width="158" height="74" rx="15" fill="var(--bg-card)" stroke="var(--line)" strokeWidth="2"/><circle cx={x+20} cy="48" r="12" fill="#0f9f6e"/><text x={x+20} y="53" fill="white" fontSize="12" textAnchor="middle">{n+1}</text><foreignObject x={x+8} y="64" width="142" height="26"><div xmlns="http://www.w3.org/1999/xhtml" style={{fontSize:12,fontWeight:800,textAlign:'center',color:'var(--text-strong)'}}>{labels[n]}</div></foreignObject>{n<3&&<path d={`M${x+162} 64h13m-5-5 5 5-5 5`} fill="none" stroke="#0f9f6e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>}</g>})}
    </svg><figcaption style={{marginTop:5,textAlign:'center',color:'var(--text-muted)',fontSize:12}}>{lang==='fa'?'الگوی تصویری را مرحله‌به‌مرحله تفسیر کنید؛ یک نشانه به‌تنهایی تشخیص نیست.':lang==='en'?'Interpret the imaging pattern step by step; no single sign makes the diagnosis.':'Lesen Sie das Bildmuster schrittweise; kein Einzelzeichen beweist die Diagnose.'}</figcaption>
  </figure>
}

function RetrievalQuestion({ lang }) {
  const [answer,setAnswer]=useState(null)
  const t=lang==='fa'?{
    title:'خودآزمایی: افتراق کیست‌ها',q:'ضایعه‌ای شبیه CSF در T1/T2 است، در FLAIR کامل سرکوب نمی‌شود و DWI بالا با ADC پایین دارد. کدام الگو محتمل‌تر است؟',a:['کیست آراکنوئید','اپیدرموئید','کیست ساده CSF'],ok:'درست: این ترکیب به نفع اپیدرموئید است؛ ظاهر شبیه CSF به‌تنهایی کافی نیست.',no:'به FLAIR و ADC برگردید؛ محدودیت انتشار و سرکوب ناقص نکته‌های افتراقی‌اند.'
  }:lang==='en'?{
    title:'Retrieval check: cyst differential',q:'A lesion is CSF-like on T1/T2, incompletely suppresses on FLAIR, and is bright on DWI with low ADC. Which pattern is favoured?',a:['Arachnoid cyst','Epidermoid','Simple CSF space'],ok:'Correct: this combination favours epidermoid; CSF-like appearance alone is insufficient.',no:'Recheck FLAIR and ADC: incomplete suppression and restricted diffusion are the discriminators.'
  }:{
    title:'Wiederabruf: Zystendifferenzierung',q:'Eine Läsion ist T1/T2-liquorähnlich, unterdrückt sich in FLAIR nicht vollständig und ist in DWI hell bei niedrigem ADC. Welches Muster passt besser?',a:['Arachnoidalzyste','Epidermoid','Einfacher Liquorraum'],ok:'Richtig: Die Kombination spricht für ein Epidermoid; ein liquorähnliches Signal allein reicht nicht.',no:'Prüfen Sie FLAIR und ADC erneut: unvollständige Unterdrückung und Diffusionsrestriktion helfen bei der Abgrenzung.'
  }
  return <section className={styles.section} aria-labelledby="tumor-check"><div className={styles.sectionBody}><h2 id="tumor-check">{t.title}</h2><p className={styles.lead}>{t.q}</p><div style={{display:'grid',gap:8}}>{t.a.map((option,i)=><button type="button" aria-pressed={answer===i} onClick={()=>setAnswer(i)} key={option} style={{padding:12,border:'1px solid var(--border)',borderRadius:12,background:'var(--bg-card)',color:'var(--text)',textAlign:'start',cursor:'pointer'}}>{option}</button>)}</div>{answer!==null?<p role="status" style={{marginTop:12}}>{answer===1?t.ok:t.no}</p>:null}</div></section>
}

export default function BrainTumourPatternsPage() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  return <><main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
    <InProgressBanner lang={lang} />
    <header className={styles.header}>
      <nav className={styles.breadcrumb} aria-label={lang === 'de' ? 'Seitennavigation' : lang === 'fa' ? 'مسیر صفحه' : 'Breadcrumb'}>
        <Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/gehirn')}>{lang === 'fa' ? 'مغز' : lang === 'de' ? 'Gehirn' : 'Brain'}</Link><span>›</span><span>{pick(GEHIRN_TUMORMUSTER.title, lang)}</span>
      </nav>
      <div className={styles.hero}><div className={styles.heroText}><span className={styles.sourceBadge}>{lang==='fa'?'مغز · پیش‌نویس آموزشی PDF':lang==='en'?'Brain · PDF teaching draft':'Gehirn · PDF-Lernentwurf'}</span><LessonHero title={pick(GEHIRN_TUMORMUSTER.title,lang)} lang={lang} visual={<svg viewBox="0 0 240 150" role="img" aria-label={lang==='fa'?'شماتیک مفهومی بررسی تودهٔ مغزی':lang==='en'?'Concept schematic for assessing a brain mass':'Konzeptschema zur Beurteilung einer Hirnläsion'}><path d="M54 107c-22-11-27-37-12-55 10-12 25-17 39-12 10-18 35-18 47-3 19-8 40 8 37 28 18 13 11 41-10 47-10 13-35 14-48 3-14 12-37 8-44-5-3 0-6-1-9-3z" fill="#d9eaf0" stroke="#39849a" strokeWidth="3"/><circle cx="128" cy="68" r="21" fill="#a38ab7"/><circle cx="128" cy="68" r="10" fill="#74557f"/><path d="M149 68h46m-7-7 7 7-7 7" stroke="#159c7e" strokeWidth="3" fill="none"/><text x="120" y="140" textAnchor="middle" fontSize="12" fill="var(--text)">{lang==='fa'?'محل · سیگنال · افتراق':lang==='en'?'Location · signal · differential':'Lokalisation · Signal · Differenzialdiagnose'}</text></svg>} />
        <div className={styles.heroStats}><div className={styles.heroStat}><strong>41–60</strong><span>PDF-Seiten</span><small>{lang === 'fa' ? 'الگوهای توموری و افتراق' : lang === 'en' ? 'Tumour patterns and differentials' : 'Tumormuster und Differenzialdiagnosen'}</small></div></div></div></div>
    </header>
    <div className={styles.layout}><aside className={styles.sidebar}><div className={styles.sideTitle}>{lang === 'fa' ? 'فهرست مطالب' : lang === 'en' ? 'Contents' : 'Inhalt'}</div>
      {GEHIRN_TUMORMUSTER.topics.map(topic => <a className={styles.sideItem} href={`#${topic.id}`} key={topic.id}><span>◈</span><strong>{pick(topic.title, lang)}</strong></a>)}
    </aside><div className={styles.main}>
      <section className={styles.section}><div className={styles.sectionBody}><p className={styles.lead}>{pick(GEHIRN_TUMORMUSTER.intro, lang)}</p><PatternPath lang={lang} /></div></section>
      {GEHIRN_TUMORMUSTER.topics.map(topic => <section id={topic.id} className={styles.section} key={topic.id}>
        <div className={styles.sectionHeader}><span className={styles.sectionHeading}><span className={styles.sectionIcon}>◈</span><h2>{pick(topic.title, lang)}</h2></span><span className={styles.sectionToggle} style={{ width: 'auto', paddingInline: 12, flex: '0 0 auto', fontSize: 11 }}>{lang === 'fa' ? `صفحهٔ PDF ${topic.pages}` : lang === 'en' ? `PDF page ${topic.pages}` : `PDF-Seite ${topic.pages}`}</span></div>
        <div className={styles.sectionBody}><p className={styles.lead}>{pick(topic.pattern, lang)}</p>{topic.dd ? <aside className={styles.callout}><strong>{lang === 'fa' ? 'افتراق' : lang === 'en' ? 'Differential' : 'Differenzialdiagnose'}</strong><p>{pick(topic.dd, lang)}</p></aside> : null}</div>
      </section>)}
      <RetrievalQuestion lang={lang} />
      <section className={styles.section}><div className={styles.sectionBody}><h2>{lang==='fa'?'سه قاعدهٔ خواندن تصویر':lang==='en'?'Three image-reading rules':'Drei Regeln zum Bildlesen'}</h2><ol><li>{lang==='fa'?'ابتدا خارج‌محوری یا داخل‌محوری بودن و محل را مشخص کنید.':lang==='en'?'First determine the compartment and location.':'Bestimmen Sie zuerst Kompartiment und Lokalisation.'}</li><li>{lang==='fa'?'یک علامت منفرد، مثل دُرال‌تیل، تشخیص قطعی نیست.':lang==='en'?'A single sign, such as a dural tail, is not diagnostic by itself.':'Ein Einzelzeichen wie der Dural Tail ist für sich nicht diagnostisch.'}</li><li>{lang==='fa'?'DWI را با ADC و FLAIR تطبیق دهید.':lang==='en'?'Correlate DWI with ADC and FLAIR.':'Korrelieren Sie DWI mit ADC und FLAIR.'}</li></ol></div></section>
      <aside className={`${styles.callout} ${styles.calloutCave}`}><strong>{lang === 'fa' ? 'محدودیت منبع و بازبینی' : lang === 'en' ? 'Source and review limits' : 'Quellen- und Prüfgrenzen'}</strong><p>{pick(GEHIRN_TUMORMUSTER.limitations, lang)}</p><p>{pick(GEHIRN_TUMORMUSTER.verification, lang)}</p><p>{lang === 'fa' ? 'این پیش‌نویس هنوز ترجمه و رفتار مرورگر مستقل بازبینی نشده است؛ تصویر Radiopaedia هم بازنشر نشده است.' : lang === 'en' ? 'This draft has not had independent translation or browser review; no Radiopaedia image has been republished.' : 'Dieser Entwurf wurde noch nicht unabhängig sprachlich oder im Browser geprüft; Radiopaedia-Bilder wurden nicht erneut veröffentlicht.'}</p><ul>{GEHIRN_TUMORMUSTER.references.map(ref=><li key={ref.href}><a href={ref.href} target="_blank" rel="noopener noreferrer">{ref.label}</a></li>)}</ul></aside>
    </div></div>
  </main></>
}
