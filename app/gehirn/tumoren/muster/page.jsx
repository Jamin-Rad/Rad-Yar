'use client'

import Link from 'next/link'
import { useState } from 'react'
import StandardLessonShell, { LessonSection, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { SOURCE_LESSON_UI } from '@/data/sourceLessonUi'
import design from '@/app/gehirn/shared-pattern-design.module.css'
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

export default function BrainPatternsPage() {
  const { lang } = useLanguage()
  const ui = SOURCE_LESSON_UI[lang] || SOURCE_LESSON_UI.de
  const summary = lang === 'fa' ? 'پیام نهایی' : 'Take Home Message'
  const labels = { contents: ui.breadcrumb, path: ui.toc, progress: ui.progress, complete: ui.mark, completed: ui.read, continue: ui.continue, completeLesson: ui.completeLesson, lessonCompleted: ui.lessonCompleted, open: ui.open, close: ui.close, takeHome: summary }
  const url = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const lesson = GEHIRN_TUMORMUSTER
  const route = '/gehirn/tumoren/muster'
  const firstTitle = lang === 'fa' ? 'مسیر خواندن تصویر' : lang === 'en' ? 'Image-reading path' : 'Lesepfad'
  const checkTitle = lang === 'fa' ? 'خودآزمایی: افتراق کیست‌ها' : lang === 'en' ? 'Retrieval check: cyst differential' : 'Wiederabruf: Zystendifferenzierung'
  const summaryRules = lang === 'fa' ? ['ابتدا خارج‌محوری یا داخل‌محوری بودن و محل را مشخص کنید.', 'یک علامت منفرد، مثل دُرال‌تیل، تشخیص قطعی نیست.', 'DWI را با ADC و FLAIR تطبیق دهید.'] : lang === 'en' ? ['First determine the compartment and location.', 'A single sign, such as a dural tail, is not diagnostic by itself.', 'Correlate DWI with ADC and FLAIR.'] : ['Bestimmen Sie zuerst Kompartiment und Lokalisation.', 'Ein Einzelzeichen wie der Dural Tail ist für sich nicht diagnostisch.', 'Korrelieren Sie DWI mit ADC und FLAIR.']
  const summaryItems = summaryRules.map(title => ({ title, detail: '' }))
  const sections = [{ id: 'orientation', label: firstTitle, icon: 'content' }, ...lesson.topics.map(topic => ({ id: topic.id, label: pick(topic.title, lang), icon: 'content' })), { id: 'self-check', label: checkTitle, icon: 'check' }, { id: 'takehome', label: summary, icon: 'summary', emphasis: true }]
  const icon = name => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={name === 'summary' ? 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z' : name === 'check' ? 'M4 12l5 5L20 6' : 'M4 4h16v16H4zM7 12h10M12 7v10'} /></svg>
  return <StandardLessonShell lessonId={route} heroLessonId={route} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia" sections={sections} labels={labels} syncHashNavigation renderIcon={icon} heroImageAlt={pick(lesson.title, lang)}
    breadcrumbs={[{ label: 'RadYar', href: url('/') }, { label: lang === 'fa' ? 'مغز' : lang === 'en' ? 'Brain' : 'Gehirn', href: url('/lernen/gehirn') }, { label: pick(lesson.title, lang) }]}
    actions={{}} theme={{ backgroundImage: '/andarun-galaxy-v3.png', accent: '#658c9b', accentStrong: '#31596d', accentSoft: '#e5f0f5', secondary: '#ab87a4', secondaryStrong: '#69506b', heroBase: '#132533' }}
    sources={<aside className={design.sources}><h2>{lang === 'fa' ? 'منبع و محدودیت‌ها' : lang === 'en' ? 'Source and limits' : 'Quelle und Grenzen'}</h2>
      <p>{pick(lesson.limitations, lang)}</p><p>{pick(lesson.verification, lang)}</p><p>{lang === 'fa' ? 'این پیش‌نویس هنوز ترجمه و رفتار مرورگر مستقل بازبینی نشده است؛ تصویر Radiopaedia هم بازنشر نشده است.' : lang === 'en' ? 'This draft has not had independent translation or browser review; no Radiopaedia image has been republished.' : 'Dieser Entwurf wurde noch nicht unabhängig sprachlich oder im Browser geprüft; Radiopaedia-Bilder wurden nicht erneut veröffentlicht.'}</p><ul>{lesson.references.map(ref => <li key={ref.href}><a href={ref.href} target="_blank" rel="noopener noreferrer">{ref.label}</a></li>)}</ul>
    </aside>}>
    <LessonSection id="orientation" bodyClassName={design.content}><p className={design.lead}>{pick(lesson.intro, lang)}</p>
      <PatternPath lang={lang} />
    </LessonSection>
    {lesson.topics.map(topic => <LessonSection id={topic.id} key={topic.id} bodyClassName={design.content}>
      <p className={design.lead}>{pick(topic.pattern, lang)}</p>{topic.dd ? <aside className={styles.callout}><strong>{lang === 'fa' ? 'افتراق' : lang === 'en' ? 'Differential' : 'Differenzialdiagnose'}</strong><p>{pick(topic.dd, lang)}</p></aside> : null}
      <small>{lang === 'fa' ? `صفحهٔ PDF ${topic.pages}` : lang === 'en' ? `PDF page ${topic.pages}` : `PDF-Seite ${topic.pages}`}</small>
    </LessonSection>)}
    <LessonSection id="self-check" bodyClassName={design.content}>
      <RetrievalQuestion key={lang} lang={lang} />
    </LessonSection>
    <LessonSection id="takehome"><TakeHomeList items={summaryItems} /></LessonSection>
  </StandardLessonShell>
}
