'use client'

import { Children, cloneElement, isValidElement, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import LessonHero from '@/components/LessonHero'
import ClinicalPatternDiagram from '@/components/ClinicalPatternDiagram'
import InProgressBanner from '@/components/InProgressBanner'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { abdomenThoraxAssessmentDrafts } from '@/data/abdomenThoraxAssessmentDrafts'
import styles from './LessonReferenceShell.module.css'

const SECTION_IDS = ['content', 'self-check', 'take-home']
const copy = {
  de: { home:'RadYar', subject:'Lernbereich', learningPath:'Lernpfad', goals:'Lernziele', content:'Kerninhalt', selfCheck:'Selbstprüfung', summary:'Take-home-Regeln', read:'gelesen', mark:'Alle Kapitel als gelesen markieren', marked:'Als gelesen markiert', next:'Weiterlernen', allRead:'Alle Kapitel gelesen', startQuiz:'Quiz öffnen', flashcards:'Flashcards', choose:'Wähle die beste Antwort.', correct:'Richtig. ', incorrect:'Noch einmal prüfen. ', reveal:'Antwort auswählen, um die Begründung zu sehen.' },
  en: { home:'RadYar', subject:'Learning area', learningPath:'Learning path', goals:'Learning goals', content:'Lesson content', selfCheck:'Self-check', summary:'Take-home rules', read:'read', mark:'Mark all chapters as read', marked:'Marked as read', next:'Continue', allRead:'All chapters read', startQuiz:'Open quiz', flashcards:'Flashcards', choose:'Choose the best answer.', correct:'Correct. ', incorrect:'Review this once more. ', reveal:'Select an answer to see the explanation.' },
  fa: { home:'رادیار', subject:'بخش یادگیری', learningPath:'مسیر یادگیری', goals:'هدف‌های یادگیری', content:'محتوای درس', selfCheck:'خودآزمایی', summary:'نکته‌های پایانی', read:'خوانده‌شده', mark:'علامت‌گذاری همه فصل‌ها به‌عنوان خوانده‌شده', marked:'علامت‌گذاری شد', next:'ادامه', allRead:'همه فصل‌ها خوانده شده‌اند', startQuiz:'بازکردن آزمون', flashcards:'فلش‌کارت‌ها', choose:'بهترین پاسخ را انتخاب کنید.', correct:'درست است. ', incorrect:'یک‌بار دیگر بررسی کنید. ', reveal:'برای دیدن توضیح، یک پاسخ را انتخاب کنید.' },
}
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''
const CHAPTERS = ['content', 'self-check', 'take-home']

export default function LessonReferenceShell({ lang = 'de', lessonId, title, diagram, heroVisual, goals, check, summary, copy: lessonCopy, quizHref, flashcardsHref, mainLandmark = false, children }) {
  const t = { ...(copy[lang] || copy.de), ...(lessonCopy?.labels?.[lang] || {}) }
  const lessonGoals = goals || (lessonCopy?.subtitle || lessonCopy?.sub ? [lessonCopy.subtitle || lessonCopy.sub] : [])
  const lessonContentTitle = lessonCopy?.contentTitle || lessonCopy?.sections?.[0]?.[1] || lessonCopy?.toc || t.content
  const reportItems = lessonCopy?.report || lessonCopy?.workflow || lessonCopy?.plan || []
  const lessonSummary = summary || reportItems.slice(0, 3)
  const scopedDraft = abdomenThoraxAssessmentDrafts[lessonId]
  const lessonCheck = check || (scopedDraft ? { ...scopedDraft, explanation: scopedDraft.rationale,
    diagramCaption: { de: 'Schematische Lernhilfe; keine Patientendarstellung.', en: 'Teaching schematic; not a patient image.', fa: 'نمای شماتیک آموزشی؛ تصویر بیمار نیست.' } }
  : lessonCopy?.quizQ && lessonCopy?.quizOptions ? {
    question: lessonCopy.quizQ, options: lessonCopy.quizOptions, answer: 0,
    explanation: lessonCopy.quizFeedback || '',
    diagramCaption: { de: 'Schematische Lernhilfe; keine Patientendarstellung.', en: 'Teaching schematic; not a patient image.', fa: 'نمای شماتیک آموزشی؛ تصویر بیمار نیست.' },
  } : {
    question: { de: `Was ist bei „${pick(title, lang)}“ besonders wichtig?`, en: `What is especially important when assessing “${pick(title, lang)}”?`, fa: `هنگام ارزیابی «${pick(title, lang)}» چه نکته‌ای اهمیت ویژه دارد؟` },
    options: [
      { de: 'Muster und klinischen Kontext gemeinsam bewerten', en: 'Assess the pattern together with clinical context', fa: 'الگو را همراه با زمینه بالینی ارزیابی کنید' },
      { de: 'Eine einzelne Bildinformation isoliert verwenden', en: 'Use a single imaging feature in isolation', fa: 'یک یافته تصویری را به‌تنهایی مبنا قرار دهید' },
      { de: 'Technische Grenzen der Untersuchung ignorieren', en: 'Ignore technical limitations of the examination', fa: 'محدودیت‌های فنی بررسی را نادیده بگیرید' },
    ], answer: 0,
    explanation: { de: 'Die Diagnose entsteht aus dem Gesamtmuster, der Untersuchungsqualität und dem klinischen Kontext.', en: 'Interpretation combines the overall pattern, examination quality and clinical context.', fa: 'تفسیر از ترکیب الگوی کلی، کیفیت بررسی و زمینه بالینی به‌دست می‌آید.' },
    diagramCaption: { de: 'Schematische Lernhilfe; keine Patientendarstellung.', en: 'Teaching schematic; not a patient image.', fa: 'نمای شماتیک آموزشی؛ تصویر بیمار نیست.' },
  })
  const [openId, setOpenId] = useState('content')
  const [picked, setPicked] = useState(null)
  const [readSections, setReadSections] = usePersistedSectionProgress(`ref-${lessonId}`, SECTION_IDS)
  const activeIndex = useMemo(() => Math.max(0, CHAPTERS.indexOf(openId)), [openId])
  const lessonComplete = readSections.size === SECTION_IDS.length

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (SECTION_IDS.includes(id)) setOpenId(id)
  }, [])

  const select = (id) => {
    setOpenId(id)
    window.history.replaceState(null, '', `${window.location.pathname}#${id}`)
    requestAnimationFrame(() => document.getElementById(`lesson-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
  const markRead = (id) => setReadSections(previous => {
    const next = new Set(previous)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })
  const markAll = () => setReadSections(lessonComplete ? new Set() : new Set(SECTION_IDS))
  const legacyChildren = Children.map(children, child => isValidElement(child) ? cloneElement(child, { 'data-lesson-legacy': '' }) : child)
  const layout = <div className={styles.layout}>
    <aside className={styles.sidebar}><h2>{t.learningPath}</h2><nav aria-label={t.learningPath}>{CHAPTERS.map(id => <button type="button" key={id} className={openId === id ? styles.active : ''} aria-current={openId === id ? 'location' : undefined} onClick={() => select(id)}><span className={styles.dot} aria-hidden="true">{readSections.has(id) ? '✓' : '•'}</span>{id === 'content' ? pick(lessonContentTitle, lang) : t[id === 'self-check' ? 'selfCheck' : 'summary']}</button>)}</nav></aside>
    <article className={styles.chapters}>
      <section id="lesson-content" className={styles.chapter}><h2>{pick(lessonContentTitle, lang)}</h2><div id="lesson-content-panel" className={styles.panel}>{legacyChildren}<button type="button" aria-pressed={readSections.has('content')} onClick={() => markRead('content')}>{readSections.has('content') ? t.marked : t.mark}</button></div></section>
      <section id="lesson-self-check" className={styles.chapter}><h2><button type="button" aria-expanded={openId === 'self-check'} aria-controls="lesson-self-check-panel" onClick={() => select('self-check')}>{t.selfCheck}<span>{openId === 'self-check' ? '−' : '+'}</span></button></h2><div id="lesson-self-check-panel" hidden={openId !== 'self-check'} className={styles.panel}><p>{pick(lessonCheck.question, lang)}</p><fieldset><legend>{t.choose}</legend>{lessonCheck.options.map((option, index) => <label key={index} className={picked === index ? styles.selected : ''}><input type="radio" name={`self-check-${lessonId}`} checked={picked === index} onChange={() => setPicked(index)} />{pick(option, lang)}</label>)}</fieldset>{picked === null ? <p className={styles.feedback}>{t.reveal}</p> : <div className={`${styles.feedback} ${picked === lessonCheck.answer ? styles.correct : styles.incorrect}`} role="status"><strong>{picked === lessonCheck.answer ? t.correct : t.incorrect}</strong>{pick(lessonCheck.explanation, lang)}</div>}<button type="button" aria-pressed={readSections.has('self-check')} onClick={() => markRead('self-check')}>{readSections.has('self-check') ? t.marked : t.mark}</button></div></section>
      <section id="lesson-take-home" className={`${styles.chapter} ${styles.takeHome}`}><h2><button type="button" aria-expanded={openId === 'take-home'} aria-controls="lesson-take-home-panel" onClick={() => select('take-home')}>{t.summary}<span>{openId === 'take-home' ? '−' : '+'}</span></button></h2><div id="lesson-take-home-panel" hidden={openId !== 'take-home'} className={styles.panel}><ol>{lessonSummary.map((rule, index) => <li key={index}>{pick(rule, lang)}</li>)}</ol><button type="button" aria-pressed={readSections.has('take-home')} onClick={() => markRead('take-home')}>{readSections.has('take-home') ? t.marked : t.mark}</button></div></section>
    </article>
  </div>

  return <div className={styles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang} data-lesson-shell={lessonId}>
    <InProgressBanner lang={lang} />
    <header className={styles.header}>
      <nav className={styles.breadcrumb} aria-label={lang === 'fa' ? 'مسیر صفحه' : 'Breadcrumb'}><Link href="/">{t.home}</Link><span aria-hidden="true">›</span><span>{t.subject}</span><span aria-hidden="true">›</span><strong>{pick(title, lang)}</strong></nav>
      <LessonHero title={pick(title, lang)} lang={lang} visual={heroVisual || <ClinicalPatternDiagram variant={diagram} lang={lang} title={pick(title, lang)} />} visualCaption={pick(lessonCheck.diagramCaption, lang)} />
      <div className={styles.intro}><strong>{t.goals}</strong><ul>{lessonGoals.map((goal, index) => <li key={index}>{pick(goal, lang)}</li>)}</ul></div>
      <div className={styles.actions}>
        <button type="button" onClick={() => select('take-home')}>{t.summary} ↓</button>
        {quizHref ? <Link href={quizHref}>{t.startQuiz} →</Link> : null}
        {flashcardsHref ? <Link href={flashcardsHref}>{t.flashcards} →</Link> : null}
      </div>
      <div className={styles.progress}>
        <div className={styles.track} role="progressbar" aria-label={t.read} aria-valuemin={0} aria-valuemax={SECTION_IDS.length} aria-valuenow={readSections.size}><span style={{ width: `${readSections.size / SECTION_IDS.length * 100}%` }} /></div>
        <span>{readSections.size}/{SECTION_IDS.length} {t.read}</span>
        <button type="button" aria-pressed={lessonComplete} onClick={markAll}>{lessonComplete ? t.allRead : t.mark}</button>
        <button type="button" onClick={() => select(CHAPTERS[Math.min(activeIndex + 1, CHAPTERS.length - 1)])} disabled={activeIndex === CHAPTERS.length - 1}>{t.next} →</button>
      </div>
    </header>
    {mainLandmark ? <main>{layout}</main> : layout}
  </div>
}
