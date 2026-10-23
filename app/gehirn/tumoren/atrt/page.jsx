'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { ATRT_COPY as C, ATRT_ID, ATRT_PATH, ATRT_SECTIONS, ATRT_SOURCES } from '@/data/atrtLesson'
import styles from './page.module.css'

const labels = {
  contents: { de: 'Lektionsinhalt', en: 'Lesson contents', fa: 'محتوای درس' },
  path: { de: 'Lernpfad', en: 'Learning path', fa: 'مسیر یادگیری' },
  progress: { de: 'gelesen', en: 'read', fa: 'خوانده‌شده' },
  continue: { de: 'Lektion fortsetzen', en: 'Continue lesson', fa: 'ادامهٔ درس' },
  completeLesson: { de: 'Ganze Lektion als gelesen markieren', en: 'Mark the whole lesson as read', fa: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده' },
  lessonCompleted: { de: 'Ganze Lektion gelesen', en: 'Full lesson marked as read', fa: 'کل درس خوانده شد' },
  complete: { de: 'Abschnitt als gelesen markieren', en: 'Mark section as read', fa: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده' },
  completed: { de: 'Als gelesen markiert', en: 'Marked as read', fa: 'خوانده‌شده' },
  open: { de: 'Abschnitt öffnen', en: 'Open section', fa: 'بازکردن بخش' },
  close: { de: 'Schließen', en: 'Close', fa: 'بستن' },
  takeHome: { de: 'Vier Regeln', en: 'Four rules', fa: 'چهار قاعده' },
  sources: { de: 'Quellen und Umfang', en: 'Sources and scope', fa: 'منابع و دامنه' },
  practice: { de: 'Wissen prüfen', en: 'Check your knowledge', fa: 'دانش خود را بسنجید' },
  cards: { de: 'Karteikarten', en: 'Flashcards', fa: 'فلش‌کارت‌ها' },
}
const icons = {
  scan: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V4h4m8 0h4v4M20 16v4h-4M8 20H4v-4M7 12h10M12 7v10" /></svg>,
  brain: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5" /></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6" /></svg>,
  summary: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z" /></svg>,
}
const v = (value, lang) => value?.[lang] || value?.de || ''
const iconFor = id => icons[id] || icons.scan

function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  const choices = C.options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: v(option, lang) }))
  return <div className={styles.check}>
    <p className={styles.question} id="atrt-check-question">{v(C.question, lang)}</p>
    <div className={styles.options} role="group" aria-labelledby="atrt-check-question">
      {choices.map((option, index) => <button type="button" key={option.id} aria-pressed={answer === index} onClick={() => setAnswer(index)}><strong>{option.id}</strong><span>{option.text}</span></button>)}
    </div>
    {answer !== null ? <p className={styles.feedback} role="status">{v(C.feedback[answer], lang)}</p> : null}
  </div>
}

export default function AtrtLesson() {
  const { lang } = useLanguage()
  const t = key => v(labels[key], lang)
  const langPath = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const returnPath = langPath(ATRT_PATH)
  const sections = ATRT_SECTIONS.map(section => ({ ...section, label: v(section.label, lang) }))
  const sources = ATRT_SOURCES.map(source => ({ ...source, tag: v(source.tag, lang), title: v(source.title, lang), citation: v(source.citation, lang), scope: v(source.scope, lang) }))
  const actions = {
    mcq: { label: t('practice'), href: langPath(`/ueben/quiz?fach=gehirn&n=1&themen=${ATRT_ID}&from=${encodeURIComponent(returnPath)}`) },
    flashcards: { label: t('cards'), href: langPath(`/flashcards/${ATRT_ID}?from=${encodeURIComponent(returnPath)}`) },
  }
  const takeHome = C.takeaways.map(item => ({ title: v(item.title, lang), detail: v(item.detail, lang) }))
  return <StandardLessonShell lessonId={ATRT_ID} lang={lang} title={v(C.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langPath('/') }, { label: v(C.chapter, lang), href: langPath('/lernen/gehirn') }, { label: v(C.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(labels).map(([key, val]) => [key, v(val, lang)]))}
    renderIcon={iconFor} actions={actions}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/atrt-mri-pattern.svg', heroImageOpacity: .9, accent: '#5b8aa2', accentStrong: '#244d68', accentSoft: '#e6f1f5', secondary: '#bd8d69', secondaryStrong: '#73503a', heroBase: '#142635' }}
    className={styles.page} heroImageAlt={v(C.heroAlt, lang)} syncHashNavigation
    sources={<LessonSources title={t('sources')} items={sources} note={v(C.scopeNote, lang)} />}>
    <div className={styles.lessonCopy} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <LessonSection id="pattern" title={v(sections[0].label, lang)} icon="scan">
        <p className={styles.lead}>{v(C.intro, lang)}</p>
        <p>{v(C.objective, lang)}</p>
        <aside className={styles.scope}><strong>{lang === 'fa' ? 'محدودهٔ منبع' : lang === 'en' ? 'Source boundary' : 'Quellengrenze'}</strong><p>{v(C.scopeNote, lang)}</p></aside>
      </LessonSection>
      <LessonSection id="sequences" title={v(sections[1].label, lang)} icon="brain">
        <p className={styles.lead}>{v(C.patternIntro, lang)}</p>
        <div className={styles.tableWrap}><table><thead><tr><th scope="col">{lang === 'fa' ? 'توالی / روش' : lang === 'en' ? 'Sequence / method' : 'Sequenz / Methode'}</th><th scope="col">{lang === 'fa' ? 'یافتهٔ احتمالی و محدودیت' : lang === 'en' ? 'Possible finding and limit' : 'Möglicher Befund und Grenze'}</th></tr></thead>
          <tbody>{C.patternRows.map((row, index) => <tr key={index}><th scope="row">{v(row[0], lang)}</th><td>{v(row[1], lang)}</td></tr>)}</tbody></table></div>
        <aside className={styles.note}><strong>{lang === 'fa' ? 'محدودیت انتشار' : lang === 'en' ? 'Diffusion caveat' : 'CAVE Diffusion'}</strong><p>{v(C.comparison, lang)}</p></aside>
      </LessonSection>
      <LessonSection id="limits" title={v(sections[2].label, lang)} icon="brain">
        <p className={styles.lead}>{v(C.diagnosis, lang)}</p>
        <p>{lang === 'fa' ? 'در گزارش: محل، اندازه، اثر فشاری/انسداد، اجزای توده، الگوی enhancement و محدودیت بررسی را ثبت کنید؛ افتراق را با زمینهٔ بالینی و ارزیابی بافتی باز بگذارید.' : lang === 'en' ? 'In the report, document location, size, mass effect/obstruction, tumour components, enhancement pattern and examination limits; keep the differential open for clinical and tissue correlation.' : 'Im Befund Lage, Größe, Masseneffekt/Obstruktion, Tumoranteile, Enhancement und Untersuchungsgrenzen dokumentieren; die Differenzialdiagnose bleibt für klinische und Gewebekorrelation offen.'}</p>
      </LessonSection>
      <LessonSection id="check" title={v(sections[3].label, lang)} icon="check"><Check lang={lang} /></LessonSection>
      <LessonSection id="take-home" title={v(sections[4].label, lang)} icon="summary"><TakeHomeList items={takeHome} /></LessonSection>
    </div>
  </StandardLessonShell>
}
