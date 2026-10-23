'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { ADPKD_COPY as C, ADPKD_ID, ADPKD_PATH, ADPKD_SECTIONS, ADPKD_SOURCES } from '@/data/adpkdImagingLesson'
import styles from './page.module.css'

const value = (v, lang) => v?.[lang] ?? v?.de ?? ''
const L = (de, en, fa) => ({ de, en, fa })
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
  takeHome: L('Drei Regeln', 'Three rules', 'سه قاعده'),
  sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
  practice: L('Fragen üben', 'Practise questions', 'تمرین سؤال‌ها'),
  cards: L('Karteikarten', 'Flashcards', 'فلش‌کارت‌ها'),
}

const titles = {
  orientation: L('Welche Frage klärt die Bildgebung?', 'What question does imaging answer?', 'تصویربرداری به چه پرسشی پاسخ می‌دهد؟'),
  pattern: L('Welche Verteilung ist bei adulter ADPKD typisch?', 'Which distribution is typical in adult ADPKD?', 'چه توزیعی در ADPKD بزرگسالان تیپیک است؟'),
  workup: L('Wann helfen weitere Untersuchungen?', 'When can additional tests help?', 'چه زمانی بررسی‌های تکمیلی کمک می‌کنند؟'),
  takeHome: L('Drei Regeln für den Befund', 'Three reporting rules', 'سه قاعده برای گزارش'),
}

const icons = {
  brain: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5" /></svg>,
  kidney: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4C5 3 3 7 4 12c1 4 4 7 7 5 2-1 2-4 3-7 1-4-1-6-5-6Zm6 0c4-1 6 3 5 8-1 4-4 7-7 5-2-1-2-4-3-7-1-4 1-6 5-6Z" /></svg>,
  scan: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V4h4m8 0h4v4M20 16v4h-4M8 20H4v-4M7 12h10M12 7v10" /></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6" /></svg>,
  summary: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z" /></svg>,
}

function PatternDiagram({ lang }) {
  const title = value(C.visualTitle, lang)
  const alt = value(C.visualAlt, lang)
  return <figure className={styles.figure}>
    <p className={styles.figureTitle}>{title}</p>
    <svg viewBox="0 0 760 330" role="img" aria-labelledby="adpkd-diagram-title adpkd-diagram-desc">
      <title id="adpkd-diagram-title">{title}</title>
      <desc id="adpkd-diagram-desc">{alt}</desc>
      <path d="M370 38c-37-34-91-30-123 8-35 41-30 103-8 145 22 41 66 49 96 22 23-21 34-63 40-100 6-34 23-57-5-75Z" fill="#e5f1ed" stroke="#507d73" strokeWidth="4" />
      <path d="M390 38c37-34 91-30 123 8 35 41 30 103 8 145-22 41-66 49-96 22-23-21-34-63-40-100-6-34-23-57 5-75Z" fill="#e5f1ed" stroke="#507d73" strokeWidth="4" />
      <g fill="#c87861" fillOpacity=".88" stroke="#fff" strokeWidth="2">
        <circle cx="292" cy="85" r="11"/><circle cx="342" cy="103" r="15"/><circle cx="300" cy="137" r="13"/><circle cx="355" cy="158" r="10"/><circle cx="317" cy="190" r="9"/>
        <circle cx="468" cy="85" r="11"/><circle cx="418" cy="103" r="15"/><circle cx="460" cy="137" r="13"/><circle cx="405" cy="158" r="10"/><circle cx="443" cy="190" r="9"/>
      </g>
      <path d="M108 107c22-31 70-32 89 0 15 24 7 68-8 91-14 23-44 29-62 11-17-16-18-43-27-65-5-13-3-25 8-37Z" fill="#eef0f2" stroke="#8494a0" strokeWidth="3" />
      <circle cx="151" cy="145" r="9" fill="#c87861" />
      <path d="M193 140h53" stroke="#9b6b4a" strokeWidth="2" strokeDasharray="5 5" />
      <text x="380" y="278" textAnchor="middle" className={styles.diagramLabel}>{lang === 'fa' ? 'هر دو کلیه · کیست‌های متعدد' : lang === 'en' ? 'Both kidneys · multiple cysts' : 'Beide Nieren · multiple Zysten'}</text>
    </svg>
    <figcaption className={styles.caption}>{value(C.visualCaption, lang)}</figcaption>
  </figure>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  return <div className={styles.check}>
    <p id="adpkd-self-check-question">{value(C.question, lang)}</p>
    <div className={styles.options} role="group" aria-labelledby="adpkd-self-check-question">
      {C.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{value(option, lang)}</button>)}
    </div>
    {answer !== null ? <p className={styles.feedback} role="status">{value(C.feedback[answer], lang)}</p> : null}
  </div>
}

export default function AdpkdImagingLesson() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const t = key => value(labels[key], lang)
  const langPath = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const returnPath = langPath(ADPKD_PATH)
  const sections = ADPKD_SECTIONS.map(section => ({ ...section, label: value(titles[section.id] ?? titles.takeHome, lang) }))
  const sources = ADPKD_SOURCES.map(source => ({ ...source, citation: value(source.citation, lang), scope: value(source.scope, lang) }))
  const actions = {
    mcq: { label: t('practice'), href: langPath(`/ueben/quiz?fach=abdomen&n=2&themen=${ADPKD_ID}&from=${encodeURIComponent(returnPath)}`) },
    flashcards: { label: t('cards'), href: langPath(`/flashcards/${ADPKD_ID}?from=${encodeURIComponent(returnPath)}`) },
  }
  const takeHome = C.takeHome.map(item => ({ title: value(item.title, lang), detail: value(item.detail, lang) }))

  return <StandardLessonShell lessonId={ADPKD_ID} lang={lang} title={value(C.title, lang)} author="RadYar"
    breadcrumbs={[{ label: 'RadYar', href: langPath('/') }, { label: value(L('Abdomen', 'Abdomen', 'شکم'), lang), href: langPath('/lernen/abdomen') }, { label: value(L('Niere', 'Kidney', 'کلیه'), lang), href: langPath('/lernen/abdomen') }, { label: value(C.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(labels).map(([key, val]) => [key, value(val, lang)]))}
    renderIcon={id => icons[id] || icons.scan} actions={actions}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/adpkd/hero.svg', heroImageOpacity: .92, accent: '#438d83', accentStrong: '#205e58', accentSoft: '#e3f1ec', secondary: '#c87861', secondaryStrong: '#754737', heroBase: '#122f39' }}
    className={styles.page} heroImageAlt={value(C.heroAlt, lang)} syncHashNavigation
    sources={<LessonSources title={t('sources')} items={sources} note={value(C.scopeNote, lang)} />}>
    <div lang={lang} dir={rtl ? 'rtl' : 'ltr'}>
      <LessonSection id="orientation" title={value(titles.orientation, lang)} icon="brain">
        <p className={styles.lead}>{value(C.intro, lang)}</p>
      </LessonSection>
      <LessonSection id="pattern" title={value(titles.pattern, lang)} icon="kidney">
        <p className={styles.lead}>{value(C.pattern, lang)}</p>
        <PatternDiagram lang={lang} />
      </LessonSection>
      <LessonSection id="workup" title={value(titles.workup, lang)} icon="scan">
        <p>{value(C.next, lang)}</p>
        <h3>{value(L('Worauf achten Sie im Befund?', 'What should the report address?', 'در گزارش به چه مواردی توجه کنیم؟'), lang)}</h3>
        <ul>{C.checklist.map((item, index) => <li key={index}>{value(item, lang)}</li>)}</ul>
        <aside className={styles.cave}><strong>{value(L('Einordnung', 'Interpretation', 'تفسیر'), lang)}</strong><p>{value(L('Bildgebung beschreibt den Phänotyp. Sie bestimmt nicht allein die genetische Ursache und ersetzt keine ärztliche Gesamtbeurteilung.', 'Imaging describes the phenotype. It does not establish the genetic cause by itself or replace integrated clinical assessment.', 'تصویربرداری فنوتیپ را توصیف می‌کند؛ به‌تنهایی علت ژنتیکی را تعیین نمی‌کند و جای ارزیابی یکپارچهٔ پزشکی را نمی‌گیرد.'), lang)}</p></aside>
        <SelfCheck lang={lang} />
      </LessonSection>
      <LessonSection id="take-home" title={value(titles.takeHome, lang)} icon="summary">
        <TakeHomeList items={takeHome} />
      </LessonSection>
    </div>
  </StandardLessonShell>
}
