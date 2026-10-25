'use client'

import Link from 'next/link'
import { useState } from 'react'
import StandardLessonShell, { LessonSection, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { SOURCE_LESSON_UI } from '@/data/sourceLessonUi'
import design from '@/app/gehirn/shared-pattern-design.module.css'
import { useLanguage } from '@/providers/LanguageProvider'
import { GEHIRN_CHIARI_LESSON as lesson } from '@/data/gehirnChiariLesson'
import styles from '@/app/technik/kontrastmittel/page.module.css'

const pick=(x,lang)=>x?.[lang]||x?.de||''
function ChiariDiagram({lang}){
 const labels=lang==='fa'?['بازیون','خط مک‌ری','اوپیستیون']:lang==='en'?['Basion','McRae line','Opisthion']:['Basion','McRae-Linie','Opisthion']
 return <figure style={{margin:0,padding:14,border:'1px solid var(--border)',borderRadius:18,background:'var(--bg-card)'}}><svg viewBox="0 0 510 190" role="img" aria-label={labels.join(' → ')} style={{display:'block',width:'100%',height:'auto'}}><path d="M130 54c-48 12-70 51-51 86 11 20 37 27 60 20 10-23 26-34 50-36 28-3 41 7 56 26 24 10 55-1 61-26 7-27-17-55-45-62-35-21-86-20-131-8z" fill="#d5e7ed" stroke="#4189a7" strokeWidth="4"/><path d="M184 87q32-10 64 0" fill="none" stroke="#a77a9b" strokeWidth="7" strokeLinecap="round"/><circle cx="185" cy="87" r="7" fill="#d46f79"/><circle cx="248" cy="87" r="7" fill="#d46f79"/><path d="M185 87h63" stroke="#e1a845" strokeWidth="3" strokeDasharray="6 5"/><path d="M217 90v35" stroke="#0f9f6e" strokeWidth="3" markerEnd="url(#chiari-arrow)"/><defs><marker id="chiari-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 8 4 0 8" fill="#0f9f6e"/></marker></defs><text x="185" y="72" textAnchor="middle" fill="var(--text-strong)" fontSize="12">{labels[0]}</text><text x="248" y="72" textAnchor="middle" fill="var(--text-strong)" fontSize="12">{labels[2]}</text><foreignObject x="121" y="131" width="194" height="28"><div xmlns="http://www.w3.org/1999/xhtml" style={{display:'grid',height:'100%',placeItems:'center',color:'var(--text-strong)',fontSize:12,fontWeight:800,textAlign:'center'}}>{labels[1]}</div></foreignObject><text x="340" y="120" fill="var(--text-muted)" fontSize="11">{lang==='fa'?'اندازه‌گیری فقط یک جزء تفسیر است':lang==='en'?'Measurement is one part of interpretation':'Messung ist nur ein Teil der Einordnung'}</text></svg><figcaption style={{color:'var(--text-muted)',fontSize:12,textAlign:'center'}}>{lang==='fa'?'شماتیک مفهومی، نه تصویر MRI.':lang==='en'?'Conceptual schematic, not an MRI.':'Konzeptgrafik, keine MRT.'}</figcaption></figure>
}
function ChiariCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  return <div className={design.check}><p className={design.lead}>{pick(lesson.assessment.question, lang)}</p><div className={design.options}>{lesson.assessment.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{pick(option, lang)}</button>)}</div>{answer !== null ? <p role="status" className={design.feedback}>{lesson.assessment.optionFeedback?.[answer] ? pick(lesson.assessment.optionFeedback[answer], lang) : (answer === lesson.assessment.correctIndex ? pick(lesson.assessment.feedback, lang) : pick(lesson.assessment.retry, lang))}</p> : null}</div>
}
export default function ChiariLessonPage() {
  const { lang } = useLanguage()
  const ui = SOURCE_LESSON_UI[lang] || SOURCE_LESSON_UI.de
  const summary = lang === 'fa' ? 'پیام نهایی' : 'Take Home Message'
  const checkTitle = lang === 'fa' ? 'خودآزمایی: افتادگی لوزه' : lang === 'en' ? 'Self-check: tonsillar descent' : 'Selbstcheck: Tonsillentiefstand'
  const sourceTitle = lang === 'fa' ? 'منبع و محدودیت‌ها' : lang === 'en' ? 'Source and limits' : 'Quelle und Grenzen'
  const labels = { contents: ui.breadcrumb, path: ui.toc, progress: ui.progress, complete: ui.mark, completed: ui.read, continue: ui.continue, completeLesson: ui.completeLesson, lessonCompleted: ui.lessonCompleted, open: ui.open, close: ui.close, takeHome: summary }
  const url = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = [...lesson.chapters.map(chapter => ({ id: chapter.id, label: pick(chapter.title, lang), icon: 'content' })), { id: 'self-check', label: checkTitle, icon: 'check' }, { id: 'takehome', label: summary, icon: 'summary', emphasis: true }]
  const icon = name => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={name === 'summary' ? 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z' : name === 'check' ? 'M4 12l5 5L20 6' : 'M4 4h16v16H4zM7 12h10M12 7v10'} /></svg>
  return <StandardLessonShell lessonId={lesson.id} heroLessonId="/gehirn/anatomie/chiari" lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia" sections={sections} labels={labels} syncHashNavigation renderIcon={icon} heroImageAlt={pick(lesson.title, lang)}
    breadcrumbs={[{ label: 'RadYar', href: url('/') }, { label: lang === 'fa' ? 'مغز' : lang === 'en' ? 'Brain' : 'Gehirn', href: url('/lernen/gehirn') }, { label: pick(lesson.title, lang) }]}
    actions={{ mcq: { label: lang === 'fa' ? 'آزمون این درس' : lang === 'en' ? 'Quiz this lesson' : 'Lektion abfragen', href: url(`/ueben/quiz?fach=gehirn&n=10&themen=chiari-malformation&from=${encodeURIComponent(url('/gehirn/anatomie/chiari'))}`) } }}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', accent: '#658c9b', accentStrong: '#31596d', accentSoft: '#e5f0f5', secondary: '#ab87a4', secondaryStrong: '#69506b', heroBase: '#132533' }}
    sources={<aside className={design.sources}><h2>{sourceTitle}</h2><p>{pick(lesson.media, lang)}</p><p>{pick(lesson.reviewStatus, lang)}</p><ul>{lesson.references.map(ref => <li key={ref.label}>{ref.href ? <a href={ref.href} target="_blank" rel="noreferrer">{ref.label}</a> : ref.label}</li>)}</ul><Link href={url('/lernen/gehirn')}>{lang === 'fa' ? 'درس‌های مغز' : lang === 'en' ? 'Brain lessons' : 'Gehirn-Lektionen'}</Link></aside>}>
    {lesson.chapters.map((chapter, index) => <LessonSection key={chapter.id} id={chapter.id} bodyClassName={design.content}>{index === 0 ? <><p className={design.lead}>{pick(lesson.objective, lang)}</p><ChiariDiagram lang={lang} /></> : null}{pick(chapter.text, lang).split('\n\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}</LessonSection>)}
    <LessonSection id="self-check"><ChiariCheck key={lang} lang={lang} /></LessonSection>
    <LessonSection id="takehome"><TakeHomeList items={lesson.chapters.map(chapter => ({ title: pick(chapter.title, lang), detail: '' }))} /></LessonSection>
  </StandardLessonShell>
}
