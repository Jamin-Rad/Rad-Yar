'use client'

import { Children, cloneElement, createElement, isValidElement, useState } from 'react'
import StandardLessonShell, { LessonSection, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { abdomenThoraxAssessmentDrafts } from '@/data/abdomenThoraxAssessmentDrafts'
import styles from './LessonReferenceShell.module.css'

const COPY = {
  de: { home: 'RadYar', subject: 'Lernbereich', contents: 'Seitenpfad', path: 'Lernpfad', goals: 'Lernziele', content: 'Kerninhalt', selfCheck: 'Selbstprüfung', takeHome: 'Take Home Message', progress: 'gelesen', complete: 'Abschnitt als gelesen markieren', completed: 'Als gelesen markiert', continue: 'Weiterlernen', completeLesson: 'Gesamte Lektion als gelesen markieren', lessonCompleted: 'Alle Kapitel gelesen', open: 'Öffnen', close: 'Schließen', startQuiz: 'Quiz öffnen', flashcards: 'Flashcards', choose: 'Wähle die beste Antwort.', correct: 'Richtig. ', incorrect: 'Noch einmal prüfen. ', reveal: 'Antwort auswählen, um die Begründung zu sehen.' },
  en: { home: 'RadYar', subject: 'Learning area', contents: 'Breadcrumb', path: 'Learning path', goals: 'Learning goals', content: 'Lesson content', selfCheck: 'Self-check', takeHome: 'Take Home Message', progress: 'read', complete: 'Mark section as read', completed: 'Marked as read', continue: 'Continue', completeLesson: 'Mark the entire lesson as read', lessonCompleted: 'All chapters read', open: 'Open', close: 'Close', startQuiz: 'Open quiz', flashcards: 'Flashcards', choose: 'Select the best answer.', correct: 'Correct. ', incorrect: 'Review this once more. ', reveal: 'Select an answer to see the explanation.' },
  fa: { home: 'رادیار', subject: 'بخش یادگیری', contents: 'مسیر صفحه', path: 'مسیر یادگیری', goals: 'هدف‌های یادگیری', content: 'محتوای درس', selfCheck: 'خودآزمایی', takeHome: 'پیام نهایی', progress: 'خوانده‌شده', complete: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده', completed: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', continue: 'ادامهٔ درس', completeLesson: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده', lessonCompleted: 'همهٔ فصل‌ها خوانده شده‌اند', open: 'باز کردن', close: 'بستن', startQuiz: 'بازکردن آزمون', flashcards: 'فلش‌کارت‌ها', choose: 'بهترین پاسخ را انتخاب کنید.', correct: 'درست است. ', incorrect: 'یک‌بار دیگر بررسی کنید. ', reveal: 'برای دیدن توضیح، یک پاسخ را انتخاب کنید.' },
}
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''
const BASE_THEME = { backgroundImage: '/andarun-galaxy-v3.png', accent: '#477e85', accentStrong: '#285a64', accentSoft: '#e6f1f3', secondary: '#a17b96', secondaryStrong: '#69566d', heroBase: '#142a37' }

function ChapterIcon({ name }) {
  const paths = {
    content: 'M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-2H4zM13 7a3 3 0 0 1 3-3h5v15h-4a4 4 0 0 0-4 2',
    'self-check': 'M9 4H5v17h14V4h-4M9 3h6v4H9zM8 13l2 2 5-5',
    'take-home': 'M12 3l2.1 6.1L20 11l-5.9 2.1L12 20l-2.1-6.9L4 11l5.9-1.9z',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.content} /></svg>
}

function ReferenceCheck({ lessonId, lang, check, labels }) {
  const [picked, setPicked] = useState(null)
  return <>
    <p>{pick(check.question, lang)}</p>
    <fieldset className={styles.options}><legend>{labels.choose}</legend>{check.options.map((option, index) => <label key={index} className={picked === index ? styles.selected : ''}>
      <input type="radio" name={`self-check-${lessonId}`} checked={picked === index} onChange={() => setPicked(index)} />{pick(option, lang)}
    </label>)}</fieldset>
    {picked === null ? <p className={styles.feedback}>{labels.reveal}</p> : <div className={`${styles.feedback} ${picked === check.answer ? styles.correct : styles.incorrect}`} role="status"><strong>{picked === check.answer ? labels.correct : labels.incorrect}</strong>{pick(check.explanation, lang)}</div>}
  </>
}

function normalizeLegacyLandmarks(nodes) {
  return Children.map(nodes, node => {
    if (!isValidElement(node)) return node
    const props = { ...node.props }
    if (Object.hasOwn(props, 'children')) props.children = normalizeLegacyLandmarks(props.children)
    const tag = node.type === 'main' ? 'div' : node.type === 'h1' ? 'h2' : null
    return tag ? createElement(tag, props) : cloneElement(node, props)
  })
}

export default function LessonReferenceShell({ lang = 'de', lessonId, title, diagram, heroVisual, heroImageSrc, heroImageAlt, goals, check, summary, copy: lessonCopy, quizHref, flashcardsHref, mainLandmark = false, theme, children }) {
  const labels = { ...(COPY[lang] || COPY.de), ...(lessonCopy?.labels?.[lang] || {}) }
  labels.takeHome = COPY[lang]?.takeHome || COPY.de.takeHome
  const lessonGoals = goals || (lessonCopy?.subtitle || lessonCopy?.sub ? [lessonCopy.subtitle || lessonCopy.sub] : [])
  const lessonContentTitle = lessonCopy?.contentTitle || lessonCopy?.sections?.[0]?.[1] || lessonCopy?.toc || labels.content
  const reportItems = lessonCopy?.report || lessonCopy?.workflow || lessonCopy?.plan || []
  const lessonSummary = summary || reportItems.slice(0, 3)
  const scopedDraft = abdomenThoraxAssessmentDrafts[lessonId]
  const lessonCheck = check || (scopedDraft ? { ...scopedDraft, explanation: scopedDraft.rationale }
    : lessonCopy?.quizQ && lessonCopy?.quizOptions ? { question: lessonCopy.quizQ, options: lessonCopy.quizOptions, answer: 0, explanation: lessonCopy.quizFeedback || '' }
    : {
      question: { de: `Was ist bei „${pick(title, lang)}“ besonders wichtig?`, en: `What is especially important when assessing “${pick(title, lang)}”?`, fa: `هنگام ارزیابی «${pick(title, lang)}» چه نکته‌ای اهمیت ویژه دارد؟` },
      options: [
        { de: 'Muster und klinischen Kontext gemeinsam bewerten', en: 'Assess the pattern together with clinical context', fa: 'الگو را همراه با زمینه بالینی ارزیابی کنید' },
        { de: 'Eine einzelne Bildinformation isoliert verwenden', en: 'Use a single imaging feature in isolation', fa: 'یک یافته تصویری را به‌تنهایی مبنا قرار دهید' },
        { de: 'Technische Grenzen der Untersuchung ignorieren', en: 'Ignore technical limitations of the examination', fa: 'محدودیت‌های فنی بررسی را نادیده بگیرید' },
      ], answer: 0,
      explanation: { de: 'Die Diagnose entsteht aus dem Gesamtmuster, der Untersuchungsqualität und dem klinischen Kontext.', en: 'Interpretation combines the overall pattern, examination quality and clinical context.', fa: 'تفسیر از ترکیب الگوی کلی، کیفیت بررسی و زمینه بالینی به‌دست می‌آید.' },
    })
  const sections = [
    { id: 'content', label: pick(lessonContentTitle, lang), icon: 'content' },
    { id: 'self-check', label: labels.selfCheck, icon: 'self-check' },
    { id: 'take-home', label: labels.takeHome, icon: 'take-home', emphasis: true },
  ]
  // A few legacy callers supply a main landmark. The standard shell owns the
  // single page landmark; retain their content and props without nesting mains.
  const legacyChildren = Children.map(normalizeLegacyLandmarks(children), child => {
    if (!isValidElement(child)) return child
    const props = { ...child.props, 'data-lesson-legacy': '' }
    return child.type === 'main' ? createElement('div', props, child.props.children) : cloneElement(child, props)
  })

  return <StandardLessonShell lessonId={`ref-${lessonId}`} heroLessonId={lessonId} lang={lang} title={pick(title, lang)} author="Dr. Zia"
    className={styles.page} sections={sections} labels={labels} syncHashNavigation progressIncludesSummary
    breadcrumbs={[{ label: labels.home, href: '/' }, { label: labels.subject }, { label: pick(title, lang) }]}
    actions={{ mcq: quizHref ? { label: labels.startQuiz, href: quizHref } : null, flashcards: flashcardsHref ? { label: labels.flashcards, href: flashcardsHref } : null }}
    renderIcon={name => <ChapterIcon name={name} />} theme={{ ...BASE_THEME, ...theme, heroImage: heroImageSrc || theme?.heroImage }}
    heroImageSrc={heroImageSrc} heroImageAlt={pick(heroImageAlt, lang)} heroVisual={heroVisual}>
    <LessonSection id="content" bodyClassName={styles.legacyContent}>
      {lessonGoals.length ? <aside className={styles.goals}><h3>{labels.goals}</h3><ul>{lessonGoals.map((goal, index) => <li key={index}>{pick(goal, lang)}</li>)}</ul></aside> : null}
      {legacyChildren}
    </LessonSection>
    <LessonSection id="self-check"><ReferenceCheck key={`${lessonId}-${lang}`} lessonId={lessonId} lang={lang} check={lessonCheck} labels={labels} /></LessonSection>
    <LessonSection id="take-home"><TakeHomeList items={lessonSummary.map(rule => ({ title: pick(rule, lang), detail: '' }))} /></LessonSection>
  </StandardLessonShell>
}
