'use client'

import Link from 'next/link'
import { useState } from 'react'
import StandardLessonShell, { LessonSection, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { SOURCE_LESSON_UI } from '@/data/sourceLessonUi'
import design from '@/app/gehirn/shared-pattern-design.module.css'
import { useLanguage } from '@/providers/LanguageProvider'
import { GEHIRN_INFEKTIONSMUSTER } from '@/data/gehirnInfektionsmusterLesson'
import styles from '@/app/technik/kontrastmittel/page.module.css'

const pick=(x,l)=>x?.[l]||x?.de||''
function PatternCheck({lang}){
 const [answer,setAnswer]=useState(null)
 const t=lang==='fa'?{title:'خودآزمایی: محدودیت انتشار',q:'در یک ضایعهٔ حلقه‌ای، کدام ترکیب بیشترین پشتیبانی را از آبسهٔ پیوژنیک می‌کند؟',options:['سیگنال بالای DWI همراه ADC پایین در مرکز ضایعه','سیگنال بالای DWI بدون بررسی ADC','فقط enhancement حلقوی'],ok:'پاسخ درست است: تطبیق DWI بالا با ADC پایین از محدودیت انتشار واقعی حمایت می‌کند. این یافته به‌تنهایی تشخیص قطعی نیست و باید با الگوی تصویری و زمینهٔ بالینی ترکیب شود.',no:'بازنگری کنید: DWI بالا به‌تنهایی می‌تواند shine-through باشد؛ نقشهٔ ADC و الگوی کلی را هم ببینید.'}:lang==='en'?{title:'Self-check: diffusion limitation',q:'For a ring-enhancing lesion, which combination most supports a pyogenic abscess?',options:['High DWI signal with low ADC in the lesion centre','High DWI signal without checking ADC','Ring enhancement alone'],ok:'Correct: high DWI with low ADC supports true restricted diffusion. It is not diagnostic alone and must be integrated with the imaging pattern and clinical context.',no:'Try again: high DWI alone can reflect shine-through; check ADC and the overall pattern.'}:{title:'Selbstcheck: Diffusionsrestriktion',q:'Welche Kombination spricht bei einer ringförmig kontrastierenden Läsion am ehesten für einen pyogenen Abszess?',options:['Hohes DWI-Signal und niedriger ADC im Läsionszentrum','Hohes DWI-Signal ohne Prüfung des ADC','Nur ringförmige Kontrastmittelaufnahme'],ok:'Richtig: Hohes DWI-Signal bei niedrigem ADC spricht für echte Diffusionsrestriktion. Allein ist dies nicht diagnostisch; Bildmuster und klinischen Kontext einbeziehen.',no:'Noch einmal: Hohes DWI-Signal allein kann T2-shine-through sein. Prüfen Sie ADC und das Gesamtmuster.'}
 return <section className={styles.section}><div className={styles.sectionBody}><h2>{t.title}</h2><p className={styles.lead}>{t.q}</p><div style={{display:'grid',gap:8}}>{t.options.map((o,i)=><button key={o} type="button" aria-pressed={answer===i} onClick={()=>setAnswer(i)} style={{padding:12,border:'1px solid var(--border)',borderRadius:12,background:'var(--bg-card)',color:'var(--text)',textAlign:'start',cursor:'pointer'}}>{o}</button>)}</div>{answer!==null&&<p role="status" style={{marginTop:12}}>{answer===0?t.ok:t.no}</p>}<small>{lang==='fa'?'منبع آموزشی: Gehirn.pdf، صفحهٔ ۶۷–۶۸؛ تأیید علمی مستقل باز است.':lang==='en'?'Teaching source: Gehirn.pdf, pp. 67–68; independent scientific verification remains open.':'Lehrquelle: Gehirn.pdf, S. 67–68; unabhängige wissenschaftliche Prüfung steht aus.'}</small></div></section>
}
export default function BrainPatternsPage() {
  const { lang } = useLanguage()
  const ui = SOURCE_LESSON_UI[lang] || SOURCE_LESSON_UI.de
  const summary = lang === 'fa' ? 'پیام نهایی' : 'Take Home Message'
  const labels = { contents: ui.breadcrumb, path: ui.toc, progress: ui.progress, complete: ui.mark, completed: ui.read, continue: ui.continue, completeLesson: ui.completeLesson, lessonCompleted: ui.lessonCompleted, open: ui.open, close: ui.close, takeHome: summary }
  const url = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const lesson = GEHIRN_INFEKTIONSMUSTER
  const route = '/gehirn/infektionen/muster'
  const readingPath = lang === 'fa' ? ['ناحیه و تقارن', 'DWI با ADC', 'شکل enhancement'] : lang === 'en' ? ['Region and symmetry', 'DWI with ADC', 'Enhancement pattern'] : ['Region und Symmetrie', 'DWI mit ADC', 'Kontrastmuster']
  const firstTitle = lang === 'fa' ? 'مسیر تفسیر: توزیع ← انتشار ← enhancement' : lang === 'en' ? 'Reading path: distribution → diffusion → enhancement' : 'Lesepfad: Verteilung → Diffusion → Kontrastmittelaufnahme'
  const checkTitle = lang === 'fa' ? 'خودآزمایی: محدودیت انتشار' : lang === 'en' ? 'Self-check: diffusion limitation' : 'Selbstcheck: Diffusionsrestriktion'
  const summaryItems = readingPath.map(title => ({ title, detail: '' }))
  const sections = [{ id: 'orientation', label: firstTitle, icon: 'content' }, ...lesson.topics.map(topic => ({ id: topic.id, label: pick(topic.title, lang), icon: 'content' })), { id: 'self-check', label: checkTitle, icon: 'check' }, { id: 'takehome', label: summary, icon: 'summary', emphasis: true }]
  const icon = name => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={name === 'summary' ? 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z' : name === 'check' ? 'M4 12l5 5L20 6' : 'M4 4h16v16H4zM7 12h10M12 7v10'} /></svg>
  return <StandardLessonShell lessonId={route} heroLessonId={route} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia" sections={sections} labels={labels} syncHashNavigation renderIcon={icon} heroImageAlt={pick(lesson.title, lang)}
    breadcrumbs={[{ label: 'RadYar', href: url('/') }, { label: lang === 'fa' ? 'مغز' : lang === 'en' ? 'Brain' : 'Gehirn', href: url('/lernen/gehirn') }, { label: pick(lesson.title, lang) }]}
    actions={{}} theme={{ backgroundImage: '/andarun-galaxy-v3.png', accent: '#658c9b', accentStrong: '#31596d', accentSoft: '#e5f0f5', secondary: '#ab87a4', secondaryStrong: '#69506b', heroBase: '#132533' }}
    sources={<aside className={design.sources}><h2>{lang === 'fa' ? 'منبع و محدودیت‌ها' : lang === 'en' ? 'Source and limits' : 'Quelle und Grenzen'}</h2>
      <p>{pick(lesson.source, lang)}</p><p>{lang === 'fa' ? 'این پیش‌نویس هنوز به بازبینی مستقل علمی، زبانی و مرورگر نیاز دارد.' : lang === 'en' ? 'This draft still requires independent scientific, language and browser review.' : 'Dieser Entwurf benötigt noch eine unabhängige wissenschaftliche, sprachliche und Browser-Prüfung.'}</p>
    </aside>}>
    <LessonSection id="orientation" bodyClassName={design.content}><p className={design.lead}>{pick(lesson.intro, lang)}</p>
      <div className={design.path}>{readingPath.map(item => <strong key={item}>{item}</strong>)}</div>
    </LessonSection>
    {lesson.topics.map(topic => <LessonSection id={topic.id} key={topic.id} bodyClassName={design.content}>
      <p className={design.lead}>{pick(topic.text, lang)}</p>
      <small>{lang === 'fa' ? `صفحهٔ PDF ${topic.pages}` : lang === 'en' ? `PDF page ${topic.pages}` : `PDF-Seite ${topic.pages}`}</small>
    </LessonSection>)}
    <LessonSection id="self-check" bodyClassName={design.content}>
      <PatternCheck key={lang} lang={lang} />
    </LessonSection>
    <LessonSection id="takehome"><TakeHomeList items={summaryItems} /></LessonSection>
  </StandardLessonShell>
}
