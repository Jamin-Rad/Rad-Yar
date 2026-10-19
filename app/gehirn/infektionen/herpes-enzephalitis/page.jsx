'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { HSV_LESSON as COPY } from '@/data/gehirnHsvEnzephalitisLesson'
import styles from './page.module.css'

const c = (value, lang) => value[lang]
const labels = {
  path: { de: 'Lernpfad', en: 'Learning path', fa: 'مسیر یادگیری' },
  progress: { de: 'gelesen', en: 'read', fa: 'خوانده‌شده' },
  continue: { de: 'Weiterlernen', en: 'Continue learning', fa: 'ادامهٔ یادگیری' },
  completeLesson: { de: 'Ganze Lektion als gelesen markieren', en: 'Mark the whole lesson as read', fa: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده' },
  lessonCompleted: { de: 'Ganze Lektion gelesen', en: 'Full lesson marked as read', fa: 'کل درس خوانده شد' },
  completed: { de: 'Gelesen', en: 'Read', fa: 'خوانده شد' },
  complete: { de: 'Abschnitt als gelesen markieren', en: 'Mark section as read', fa: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده' },
  open: { de: 'Abschnitt öffnen', en: 'Open section', fa: 'بازکردن بخش' },
  close: { de: 'Schließen', en: 'Close', fa: 'بستن' },
  takeHome: { de: 'Drei Regeln mitnehmen', en: 'Three takeaways', fa: 'سه نکتهٔ کلیدی' },
  sources: { de: 'Quellen und Grenzen', en: 'Sources and scope', fa: 'منابع و محدوده' },
}

function Icon({ name }) {
  const d = {
    brain: 'M12 4a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V4m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V4',
    scan: 'M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z',
    compare: 'M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4',
    check: 'm4 12 5 5L20 6',
  }[name] || 'm4 12 5 5L20 6'
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
}

function CaseQuestion({ lang }) {
  const [answer, setAnswer] = useState(null)
  const question = COPY.check
  return <section className={styles.quiz} aria-labelledby="hsv-case-question">
    <h3 id="hsv-case-question">{c(COPY.quiz, lang)}</h3>
    <p>{c(question.question, lang)}</p>
    <div className={styles.answers}>{question.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{c(option, lang)}</button>)}</div>
    <div aria-live="polite" aria-atomic="true">{answer !== null ? <p className={styles.feedback}>{c(question.feedback[answer], lang)}</p> : null}</div>
  </section>
}

export default function HerpesEncephalitisPage() {
  const { lang } = useLanguage()
  const sections = COPY.chapters.map(chapter => ({ id: chapter.id, label: c(chapter.title, lang), icon: chapter.icon, emphasis: chapter.id === 'takehome' }))
  const sources = [
    { tag: 'PDF · p.65–66', title: 'Gehirn.pdf', href: '#source-pdf', citation: c(COPY.imageCaption, lang), scope: c(COPY.sourceNote, lang) },
    { tag: 'Guideline · 2008', title: 'Tunkel et al. · IDSA encephalitis guideline', href: 'https://pubmed.ncbi.nlm.nih.gov/18582201/', citation: lang === 'fa' ? 'راهنمای IDSA؛ زمینهٔ فوریت ارزیابی انسفالیت.' : lang === 'en' ? 'IDSA guideline; supports the time-critical context of encephalitis evaluation.' : 'IDSA-Leitlinie; stützt den zeitkritischen Kontext der Enzephalitis-Abklärung.' },
    { tag: 'Review · 2020', title: 'Li et al. · Common infectious CNS diseases: imaging characteristics', href: 'https://doi.org/10.21037/qims-20-886', citation: lang === 'fa' ? 'مرور ویژگی‌های تصویربرداری عفونت‌های شایع دستگاه عصبی مرکزی.' : lang === 'en' ? 'Review of imaging characteristics of common CNS infections.' : 'Übersicht zu Bildgebungsmerkmalen häufiger ZNS-Infektionen.' },
    { tag: 'Textbook chapter · 2024', title: 'Lim & Thurnher · Intracranial Infection and Inflammation', href: 'https://www.ncbi.nlm.nih.gov/books/NBK608614/', citation: lang === 'fa' ? 'فصل ۶ از کتاب تصویربرداری ۲۰۲۴–۲۰۲۷؛ مبنای الگوهای HSV و افتراق خودایمنی.' : lang === 'en' ? 'Chapter 6 of the 2024–2027 imaging textbook; supports HSV patterns and autoimmune mimics.' : 'Kapitel 6 des Bildgebungslehrbuchs 2024–2027; stützt HSV-Muster und autoimmune Differenzialdiagnosen.' },
  ]
  const takeaways = COPY.summary.map((rule, index) => ({
    title: c([{ de: 'Verteilung', en: 'Distribution', fa: 'توزیع' }, { de: 'Sequenzen', en: 'Sequences', fa: 'سکانس‌ها' }, { de: 'Grenzen', en: 'Limits', fa: 'محدودیت‌ها' }][index], lang),
    detail: c(rule, lang),
  }))

  return <StandardLessonShell
    lessonId="herpes-enzephalitis"
    lang={lang}
    title={c(COPY.title, lang)}
    author="Dr. Zia"
    breadcrumbs={[
      { label: 'RadYar', href: lang === 'de' ? '/' : `/?lang=${lang}` },
      { label: lang === 'fa' ? 'مغز' : lang === 'en' ? 'Brain' : 'Gehirn', href: lang === 'de' ? '/lernen/gehirn' : `/lernen/gehirn?lang=${lang}` },
      { label: c(COPY.title, lang) },
    ]}
    sections={sections}
    labels={Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, c(value, lang)]))}
    actions={{}}
    renderIcon={name => <Icon name={name} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/herpes-enzephalitis/hero.svg', heroImageOpacity: .54, accent: '#58b5c2', accentStrong: '#185d69', accentSoft: '#e2f3f4', secondary: '#d18469', secondaryStrong: '#784632', heroBase: '#102734' }}
    className={styles.page}
    heroImageAlt={c(COPY.heroAlt, lang)}
    syncHashNavigation
    sources={<LessonSources title={c(labels.sources, lang)} items={sources} note={c(COPY.sourceNote, lang)} />}
  >
    <LessonSection id="pattern" title={c(COPY.chapters[0].title, lang)} icon="brain">
      <p className={styles.lead}>{c(COPY.intro, lang)}</p>
      <ul className={styles.rules}>{COPY.pattern.map((point, index) => <li key={index}>{c(point, lang)}</li>)}</ul>
      <figure className={styles.case} id="source-pdf"><img src="/educational/herpes-enzephalitis/pdf-case.png" alt={c(COPY.imageAlt, lang)} width="680" height="410" /><figcaption>{c(COPY.imageCaption, lang)}</figcaption></figure>
    </LessonSection>
    <LessonSection id="sequences" title={c(COPY.chapters[1].title, lang)} icon="scan">
      <div className={styles.findings}>{COPY.sequence.map((item, index) => <section key={index}><h3>{c(item.title, lang)}</h3><p>{c(item.text, lang)}</p></section>)}</div>
    </LessonSection>
    <LessonSection id="mimics" title={c(COPY.chapters[2].title, lang)} icon="compare">
      <div className={styles.findings}>{COPY.mimics.map((item, index) => <section key={index}><h3>{c(item.title, lang)}</h3><p>{c(item.text, lang)}</p></section>)}</div>
      <aside className={styles.warning}><strong>{lang === 'de' ? 'CAVE' : lang === 'en' ? 'Caution' : 'هشدار'}</strong><p>{c(COPY.warning, lang)}</p></aside>
      <CaseQuestion lang={lang} />
    </LessonSection>
    <LessonSection id="takehome" title={c(COPY.chapters[3].title, lang)} icon="check"><TakeHomeList items={takeaways} /></LessonSection>
  </StandardLessonShell>
}
