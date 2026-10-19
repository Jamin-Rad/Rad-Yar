'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { GEHIRN_PRES_LESSON as lesson } from '@/data/gehirnPresLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] || value?.de || ''
const labels = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark the whole lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'),
  close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Kernaussagen', 'Key points', 'نکات کلیدی'),
  sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
  practice: L('Selbstcheck', 'Self-check', 'خودآزمایی'),
  cards: L('Karteikarten', 'Flashcards', 'فلش‌کارت‌ها'),
}
const icons = {
  pattern: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8c0-3 2-5 5-5 1 0 2 .5 2 2 0-1.5 1-2 2-2 3 0 5 2 5 5 2 2 2 5 0 7 0 3-2 5-5 5-1 0-2-.5-2-2 0 1.5-1 2-2 2-3 0-5-2-5-5-2-2-2-5 0-7Z"/><path d="M12 5v14"/></svg>,
  diffusion: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M7 8l-4 4 4 4m10-8 4 4-4 4"/><circle cx="12" cy="12" r="3"/></svg>,
  distribution: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16M12 5v5m0 0-6 6m6-6 6 6M6 16v4m12-4v4"/></svg>,
  practice: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6"/></svg>,
  summary: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z"/></svg>,
}

function PatternFigure({ lang }) {
  const orientation = lang === 'fa' ? { posterior: 'خلفی', anterior: 'قدامی' } : lang === 'en' ? { posterior: 'Posterior', anterior: 'Anterior' } : { posterior: 'Posterior', anterior: 'Anterior' }
  const caption = pick(L(
    'Schema: symmetrische parieto-okzipitale Betonung. Es zeigt eine Verteilung, keine MRT-Aufnahme.',
    'Schematic: symmetric parieto-occipital predominance. It shows a distribution, not an MRI.',
    'شماتیک: غلبهٔ متقارن آهیانه‌ای ـ پس‌سری. این تصویر فقط توزیع را نشان می‌دهد و MRI نیست.'
  ), lang)
  return <figure className={styles.figure}>
    <div className={styles.mapWrap}>
      <span className={styles.posterior}>{orientation.posterior}</span>
      <img src="/educational/pres/posterior-pattern.svg" width="800" height="360" alt={pick(lesson.diagramAlt, lang)} />
      <span className={styles.anterior}>{orientation.anterior}</span>
    </div>
    <figcaption>{caption}</figcaption>
    <ul className={styles.legend}>
      {lesson.diagramLegend.map((item, index) => <li key={index}><strong>{pick(item.title, lang)}</strong><span>{pick(item.text, lang)}</span></li>)}
    </ul>
  </figure>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const t = lang === 'fa'
    ? { result: 'بازخورد' }
    : lang === 'en'
      ? { result: 'Feedback' }
      : { result: 'Rückmeldung' }
  return <div className={styles.check}>
    <p className={styles.lead}>{pick(lesson.assessment.question, lang)}</p>
    <div className={styles.options}>{lesson.assessment.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{pick(option, lang)}</button>)}</div>
    {answer !== null ? <p role="status" className={styles.feedback}><strong>{t.result}:</strong> {answer === lesson.assessment.correctIndex ? pick(lesson.assessment.feedback, lang) : pick(lesson.assessment.retry, lang)}</p> : null}
  </div>
}

export default function PresLessonPage() {
  const { lang } = useLanguage()
  const t = key => pick(labels[key], lang)
  const path = route => lang === 'de' ? route : `${route}?lang=${lang}`
  const sections = [
    ...lesson.chapters.map((chapter, index) => ({ id: chapter.id, label: pick(chapter.title, lang), icon: ['pattern', 'diffusion', 'distribution', 'practice'][index] })),
    { id: 'take-home', label: t('takeHome'), icon: 'summary', emphasis: true },
  ]
  const sources = lesson.references.filter(item => item.href).map((item, index) => ({
    href: item.href,
    title: item.label,
    tag: 'Primary study',
    citation: pick(item.scope, lang),
    scope: '',
  }))
  const takeaways = lesson.takeaways.map(item => ({ title: pick(item.title, lang), detail: pick(item.detail, lang) }))
  const rubric = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, pick(value, lang)]))
  return <StandardLessonShell lessonId="pres-muster" lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: path('/') }, { label: pick(L('Gehirn', 'Brain', 'مغز'), lang), href: path('/lernen/gehirn') }, { label: pick(lesson.title, lang) }]}
    sections={sections} labels={rubric} actions={{}} renderIcon={id => icons[id] || icons.pattern}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/pres/posterior-pattern.svg', heroImageOpacity: .92, accent: '#607fbb', accentStrong: '#304d83', accentSoft: '#e9effb', secondary: '#9b71bd', secondaryStrong: '#61427d', heroBase: '#152239' }}
    className={styles.page} heroImageAlt={pick(lesson.diagramAlt, lang)} syncHashNavigation
    sources={<LessonSources title={t('sources')} items={sources} note={pick(lesson.scopeNote, lang)} />}>
    <div lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <LessonSection id="pattern" title={pick(lesson.chapters[0].title, lang)} icon="pattern"><p className={styles.lead}>{pick(lesson.objective, lang)}</p>{pick(lesson.chapters[0].text, lang).split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}<PatternFigure lang={lang} /></LessonSection>
      <LessonSection id="diffusion" title={pick(lesson.chapters[1].title, lang)} icon="diffusion">{pick(lesson.chapters[1].text, lang).split('\n\n').map((paragraph, index) => <p key={index} className={index > 0 ? styles.cave : undefined}>{paragraph}</p>)}</LessonSection>
      <LessonSection id="distribution" title={pick(lesson.chapters[2].title, lang)} icon="distribution">{pick(lesson.chapters[2].text, lang).split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</LessonSection>
      <LessonSection id="carry-away" title={pick(lesson.chapters[3].title, lang)} icon="practice">{pick(lesson.chapters[3].text, lang).split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}<SelfCheck lang={lang} /></LessonSection>
      <LessonSection id="take-home" title={t('takeHome')} icon="summary" emphasis><TakeHomeList items={takeaways} /></LessonSection>
    </div>
  </StandardLessonShell>
}
