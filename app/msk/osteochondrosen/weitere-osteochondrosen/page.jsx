'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { OSTEOCHONDROSEN_ORIENTATION as lesson } from '@/data/osteochondrosenOrientation'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''
const labels = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری'), completeLesson: L('Ganze Seite als gelesen markieren', 'Mark full page as read', 'علامت‌گذاری کل صفحه به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Seite gelesen', 'Full page marked as read', 'کل صفحه خوانده شد'), complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه قاعده برای یادآوری'), sources: L('Quelle und Umfang', 'Source and scope', 'منبع و دامنه'),
}
function Icon({ id }) {
  const paths = { clinical: 'M12 3v18M5 8h14M5 16h14', differential: 'M12 3v18M5 8h5v5H5zm9 0h5v5h-5z', imaging: 'M4 4h16v16H4zM7 15l3-4 2 2 3-5 2 7', check: 'm4 12 5 5L20 6', summary: 'M5 5h14M5 12h14M5 19h14' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.clinical} /></svg>
}
function Matrix({ rows, lang }) {
  return <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={pick(L('Begriffe im Vergleich', 'Terminology comparison', 'مقایسهٔ اصطلاحات'), lang)}><table>
    <caption>{pick(L('Begriffe im Vergleich', 'Terminology comparison', 'مقایسهٔ اصطلاحات'), lang)}</caption>
    <thead><tr><th scope="col">{pick(L('Begriff', 'Term', 'اصطلاح'), lang)}</th><th scope="col">{pick(L('Einordnung laut PDF', 'Meaning in the PDF', 'معنا در PDF'), lang)}</th></tr></thead>
    <tbody>{rows.map((row, index) => <tr key={index}><th scope="row">{pick(row[0], lang)}</th><td>{pick(row[1], lang)}</td></tr>)}</tbody>
  </table></div>
}
function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  const correct = answer === lesson.check.answer
  return <div className={styles.check}><h3>{pick(lesson.check.title, lang)}</h3><p>{pick(lesson.check.prompt, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>
      {lesson.check.options.map((option, index) => <label key={index}><input type="radio" name="osteochondrosis-terms" checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(correct ? lesson.check.explanation : lesson.check.retry, lang)}</p> : null}
  </div>
}
export default function WeitereOsteochondrosenPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const translatedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))
  const route = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })), { id: 'check', label: t(lesson.check.title), icon: 'check' }, { id: 'take-home', label: translatedLabels.takeHome, icon: 'summary', emphasis: true }]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    heroImageAlt={t(L('Nichtdiagnostisches Schema: Knorpel, Wachstumsfuge und Knochen mit angedeutetem Übergang.', 'Non-diagnostic schematic of cartilage, physis and bone with an indicated transition.', 'شماتیک غیرتشخیصی غضروف، صفحهٔ رشد و استخوان با نمایش گذار میان آن‌ها'))}
    breadcrumbs={[{ label: 'RadYar', href: route('/') }, { label: 'MSK', href: route('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={translatedLabels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .94, accent: '#67bdb1', accentStrong: '#245e58', accentSoft: '#e5f2ee', secondary: '#d49a61', secondaryStrong: '#79502d', heroBase: '#18322f' }}
    className={styles.page} sources={<LessonSources title={translatedLabels.sources} items={[]} note={t(lesson.sourceNote)} />}>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}>
      <p>{t(section.lead)}</p>
      {section.rows ? <Matrix rows={section.rows} lang={lang} /> : null}
      {section.note ? <aside className={styles.feedback}>{t(section.note)}</aside> : null}
      {section.links ? <ul className={styles.links}>{section.links.map(link => <li key={link.href}><Link href={route(link.href)}>{t(link.label)} →</Link></li>)}</ul> : null}
    </LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><Check lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="summary" title={translatedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
