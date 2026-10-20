'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { UIP_IPF_LESSON as lesson } from '@/data/thoraxUipIpfLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
const labels = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiter', 'Continue', 'ادامه'), completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark the full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson read', 'کل درس خوانده شد'), complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'), completed: L('Gelesen', 'Read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Abschnitt schließen', 'Close section', 'بستن بخش'), takeHome: L('Vier Regeln merken', 'Four rules to remember', 'چهار نکته برای یادآوری'),
}
const chapterIcons = {
  start: 'M12 3v18M3 12h18', pattern: 'M4 5h16v14H4zM5 15l4-4 3 2 6-6',
  categories: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  interpretation: 'M4 12h6m4 0h6M10 8l4 4-4 4M4 5h16M4 19h16', check: 'm4 12 5 5L20 6', summary: 'M5 5h14M5 12h14M5 19h14',
}
function Icon({ id = 'pattern' }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={chapterIcons[id] || chapterIcons.pattern}/></svg> }
function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  const c = value => pick(value, lang)
  return <div className={styles.check}>
    <h3>{c(lesson.check.title)}</h3><p>{c(lesson.check.prompt)}</p>
    <fieldset><legend>{c(L('Eine Antwort wählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'))}</legend>
      {lesson.check.options.map((option, i) => <label key={i}><input type="radio" name="uip-ipf-check" checked={answer === i} onChange={() => setAnswer(i)}/><span>{c(option)}</span></label>)}
    </fieldset>
    {answer !== null && <div role="status" className={styles.feedback}>
      <strong>{c(answer === lesson.check.answerIndex ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review the pattern. ', 'الگو را دوباره بررسی کنید. '))}</strong>
      <span>{c(lesson.check.feedback[answer])}</span>
      {answer !== lesson.check.answerIndex && <button type="button" onClick={() => setAnswer(null)}>{c(L('Erneut versuchen', 'Try again', 'تلاش دوباره'))}</button>}
    </div>}
  </div>
}
function ChapterContent({ chapter, lang }) {
  const t = value => pick(value, lang)
  return <div className={styles.body}>
    <p>{t(chapter.lead)}</p>
    {chapter.points && <ul className={styles.points}>{chapter.points.map((point, i) => <li key={i}>{t(point)}</li>)}</ul>}
    {chapter.id === 'pattern' && <figure className={styles.figure}><img src={lesson.heroImage} alt={t(lesson.heroAlt)}/><figcaption>{t(chapter.visualNote)}</figcaption></figure>}
    {chapter.rows && <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={t(L('HRCT-Musterkategorien', 'HRCT pattern categories', 'دسته‌های الگوی HRCT'))}>
      <table><thead><tr><th scope="col">{t(L('Kategorie', 'Category', 'دسته'))}</th><th scope="col">{t(L('Wesentliche HRCT-Merkmale', 'Key HRCT features', 'ویژگی‌های اصلی HRCT'))}</th></tr></thead>
        <tbody>{chapter.rows.map(([label, description], i) => <tr key={i}><th scope="row">{t(label)}</th><td>{t(description)}</td></tr>)}</tbody>
      </table>
    </div>}
    {chapter.note && <aside className={styles.note}><strong>{t(L('Merke', 'Key point', 'نکتهٔ اصلی'))}</strong><p>{t(chapter.note)}</p></aside>}
    {chapter.cave && <aside className={styles.cave}><strong>{t(L('CAVE', 'Caution', 'احتیاط'))}</strong><p>{t(chapter.cave)}</p></aside>}
  </div>
}
export default function UipIpfPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const localizedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))
  const path = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const sectionList = [{ id: 'start', label: t(L('Muster und Diagnose trennen', 'Separate pattern from diagnosis', 'الگو را از تشخیص جدا کنید')), icon: 'start' }, ...lesson.chapters.map(chapter => ({ id: chapter.id, label: t(chapter.title), icon: chapter.icon })), { id: 'check', label: t(lesson.check.title), icon: 'check' }, { id: 'take-home', label: localizedLabels.takeHome, icon: 'summary', emphasis: true }]
  const sources = lesson.sources.filter(source => source.href).map(source => ({ title: t(source.title), href: source.href, citation: t(source.citation) }))
  sources.unshift({ title: t(lesson.sources[0].title), citation: t(lesson.sources[0].citation) })
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: path('/') }, { label: t(L('Thorax', 'Thorax', 'قفسهٔ سینه')), href: path('/lernen/thorax') }]}
    sections={sectionList} labels={localizedLabels} actions={{}} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.heroImage, heroImageOpacity: .72, accent: '#77b7b2', accentStrong: '#286c70', accentSoft: '#e4f2ef', secondary: '#bd8b58', secondaryStrong: '#744d2c', heroBase: '#152b3a' }}
    heroImageAlt={t(lesson.heroAlt)} className={styles.page} syncHashNavigation
    sources={<LessonSources title={t(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'))} items={sources} note={t(lesson.notice)}/>}
  >
    <LessonSection id="start" icon="start" title={t(L('Muster und Diagnose trennen', 'Separate pattern from diagnosis', 'الگو را از تشخیص جدا کنید'))}>
      <div className={styles.body}><p className={styles.intro}>{t(lesson.intro)}</p><p className={styles.scope}>{t(lesson.scope)}</p>
        <nav className={styles.actions} aria-label={t(L('Übungen', 'Practice', 'تمرین‌ها'))}>
          <Link href={path('/ueben/quiz?fach=thorax&n=1&themen=uip-ipf')}>{t(L('MCQ üben', 'Practise the MCQ', 'تمرین پرسش چندگزینه‌ای'))}</Link>
          <Link href={path('/flashcards/uip-ipf')}>{t(L('Lernkarte öffnen', 'Open flashcard', 'بازکردن فلش‌کارت'))}</Link>
        </nav>
      </div>
    </LessonSection>
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={t(chapter.title)}><ChapterContent chapter={chapter} lang={lang}/></LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)}><Check lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="summary" title={localizedLabels.takeHome} emphasis><ol className={styles.takeHome}>{lesson.takeHome.map((item, i) => <li key={i}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
