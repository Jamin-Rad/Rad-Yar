'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { EPENDYMOMA_COPY as C, EPENDYMOMA_ID, EPENDYMOMA_PATH, EPENDYMOMA_SECTIONS, EPENDYMOMA_SOURCES } from '@/data/gehirnEpendymomaLesson'
import styles from './page.module.css'

const value = (item, lang) => item[lang]
const L = (de, en, fa) => ({ de, en, fa })
const labels = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامه درس'),
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
  scan: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V4h4m8 0h4v4M20 16v4h-4M8 20H4v-4M7 12h10M12 7v10" /></svg>,
  compare: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4" /></svg>,
  brain: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5" /></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6" /></svg>,
  summary: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z" /></svg>,
}

function PatternDiagram({ lang }) {
  return <figure className={styles.diagram}>
    <img src="/educational/ependymoma/outlet-pattern.svg" alt={value(C.heroAlt, lang)} width="920" height="410" />
    <figcaption>{value(C.diagramCaption, lang)}</figcaption>
    <div className={styles.legend}><strong>{value(C.diagramLegendTitle, lang)}</strong><ol>{C.diagramLegend.map((item, index) => <li key={index}>{value(item, lang)}</li>)}</ol></div>
  </figure>
}

function CaseFrames({ lang }) {
  const frames = [
    { src: 't1c.png', label: L('Axiales T1 nach Kontrastmittel', 'Axial T1 post-contrast', 'T1 محوری پس از کنتراست') },
    { src: 'flair.png', label: L('Axiales FLAIR', 'Axial FLAIR', 'FLAIR محوری') },
  ]
  return <figure className={styles.caseFigure}>
    <figcaption className={styles.caseHeading}>{value(C.scanTitle, lang)}</figcaption>
    <p className={styles.scanTask}>{value(C.scanTask, lang)}</p>
    <div className={styles.caseGrid}>{frames.map((frame, index) => <figure key={frame.src}>
      <img src={`/educational/ependymoma/${frame.src}`} alt={`${value(C.frameAlt, lang)} · ${value(frame.label, lang)}`} />
      <figcaption>{value(frame.label, lang)}</figcaption>
      <p className={styles.observation}>{value(C.frameFindings[index], lang)}</p>
    </figure>)}</div>
    <figcaption className={styles.caseCaption}>{value(C.scanCaption, lang)}<br />{value(C.sourceCase, lang)}</figcaption>
  </figure>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  return <div className={styles.check}>
    <p>{value(C.question, lang)}</p>
    <div className={styles.options}>{C.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{value(option, lang)}</button>)}</div>
    {answer !== null ? <p role="status" className={styles.feedback}>{value(C.feedback[answer], lang)}</p> : null}
  </div>
}

export default function EpendymomaLesson() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const t = key => value(labels[key], lang)
  const langPath = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = EPENDYMOMA_SECTIONS.map(section => ({ ...section, label: value(section.label, lang) }))
  const sources = EPENDYMOMA_SOURCES.map(source => ({ ...source, citation: value(source.citation, lang), scope: value(source.scope, lang) }))
  return <StandardLessonShell lessonId={EPENDYMOMA_ID} lang={lang} title={value(C.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langPath('/') }, { label: value(C.chapter, lang), href: langPath('/lernen/gehirn') }, { label: value(C.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(labels).map(([key, localized]) => [key, value(localized, lang)]))} actions={{}}
    renderIcon={id => icons[id] || icons.scan}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/ependymoma/outlet-pattern.svg', heroImageOpacity: .9, accent: '#48b5c8', accentStrong: '#155d70', accentSoft: '#e0f4f6', secondary: '#d18b53', secondaryStrong: '#704325', heroBase: '#102535' }}
    className={styles.page} heroImageAlt={value(C.heroAlt, lang)} syncHashNavigation
    sources={<LessonSources title={t('sources')} items={sources} note={value(C.sourcesNote, lang)} />}>
    <div lang={lang} dir={rtl ? 'rtl' : 'ltr'}>
      <LessonSection id="orientation" title={value(EPENDYMOMA_SECTIONS[0].label, lang)} icon="scan"><p className={styles.lead}>{value(C.objective, lang)}</p><p>{value(C.intro, lang)}</p><p>{value(C.definition, lang)}</p><p>{value(C.anatomy, lang)}</p><PatternDiagram lang={lang} /></LessonSection>
      <LessonSection id="mri-pattern" title={value(EPENDYMOMA_SECTIONS[1].label, lang)} icon="compare"><p>{value(C.features, lang)}</p><CaseFrames lang={lang} /><aside className={styles.note}><strong>{lang === 'fa' ? 'محدودیت منبع' : lang === 'en' ? 'Source limit' : 'Quellenbegrenzung'}</strong><p>{value(C.scanCaption, lang)}</p></aside></LessonSection>
      <LessonSection id="limits" title={value(EPENDYMOMA_SECTIONS[2].label, lang)} icon="brain"><p>{value(C.plasticity, lang)}</p><aside className={styles.note}><strong>{lang === 'fa' ? 'طبقه‌بندی' : lang === 'en' ? 'Classification' : 'Klassifikation'}</strong><p>{value(C.classification, lang)}</p></aside><p>{value(C.scope, lang)}</p></LessonSection>
      <LessonSection id="self-check" title={value(EPENDYMOMA_SECTIONS[3].label, lang)} icon="check"><SelfCheck lang={lang} /></LessonSection>
      <LessonSection id="take-home" title={value(EPENDYMOMA_SECTIONS[4].label, lang)} icon="summary" emphasis><TakeHomeList items={C.takeaway.map(item => ({ title: value(item.title, lang), detail: value(item.detail, lang) }))} /></LessonSection>
    </div>
  </StandardLessonShell>
}
