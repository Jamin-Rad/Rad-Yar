'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { CAROTID_BODY_PARAGANGLIOMA_LESSON as lesson } from '@/data/carotidBodyParagangliomaLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''
const labels = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiterlernen', 'Continue learning', 'ادامه یادگیری'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'),
  close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه قاعده برای یادآوری'),
  sources: L('Quelle und Umfang', 'Source and scope', 'منبع و دامنه'),
  choose: L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'),
  correct: L('Richtig. ', 'Correct. ', 'درست است. '),
  retry: L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '),
}

function Icon({ id }) {
  const paths = {
    clinical: 'M12 3v18M5 8h14M7 16h10',
    imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7',
    differential: 'M12 3v5m0 4v9M5 8h14M5 16h14',
    check: 'M4 4h16v16H4zM8 9h8m-8 4h5',
    summary: 'M5 5h14M5 12h14M5 19h14',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.imaging}/></svg>
}

function Matrix({ rows, lang }) {
  return <div className={styles.tableWrap}><table>
    <thead><tr><th scope="col">{pick(L('Merkmal', 'Feature', 'ویژگی'), lang)}</th><th scope="col">{pick(L('Angabe der Quelle', 'Source description', 'توصیف منبع'), lang)}</th></tr></thead>
    <tbody>{rows.map(([term, detail], index) => <tr key={index}><th scope="row">{pick(term, lang)}</th><td>{pick(detail, lang)}</td></tr>)}</tbody>
  </table></div>
}

function SelfCheck({ lang, check, name }) {
  const [answer, setAnswer] = useState(null)
  return <div className={styles.decision}>
    <h3>{pick(check.title, lang)}</h3><p>{pick(check.prompt, lang)}</p>
    <fieldset><legend>{pick(labels.choose, lang)}</legend>
      {check.options.map((option, index) => <label key={index}><input type="radio" name={name} checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(answer === check.answer ? labels.correct : labels.retry, lang)}</strong>{pick(answer === check.answer ? check.explanation : check.retry, lang)}</p> : null}
  </div>
}

export default function CarotidBodyParagangliomaPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const translatedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))
  const sections = [
    ...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })),
    ...[lesson.check, lesson.additionalCheck].filter(Boolean).map((check, index) => ({ id: index === 0 ? 'check' : `check-${index + 1}`, label: t(check.title), icon: 'check' })),
    { id: 'take-home', label: translatedLabels.takeHome, icon: 'summary', emphasis: true },
  ]
  const references = lesson.references.map(reference => ({ ...reference, title: t(reference.title), citation: t(reference.citation), scope: t(reference.scope) }))
  const languagePath = path => lang === 'de' ? path : `${path}?lang=${lang}`

  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    heroImageAlt={t(L('Konzeptionelle anatomische Illustration der Karotisbifurkation mit einer Raumforderung zwischen den Gefäßästen; keine diagnostische Aufnahme.', 'Conceptual anatomical illustration of the carotid bifurcation with a mass between its branches; not a diagnostic image.', 'تصویرسازی مفهومی آناتومی دوشاخهٔ کاروتید با توده‌ای میان شاخه‌های عروقی؛ تصویر تشخیصی نیست.'))}
    breadcrumbs={[{ label: 'RadYar', href: languagePath('/') }, { label: t(L('Gehirn & Kopf-Hals', 'Brain & Head and Neck', 'مغز و سر و گردن')), href: languagePath('/lernen/gehirn') }, { label: t(lesson.title) }]}
    sections={sections} labels={translatedLabels} actions={{}} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .94, accent: '#54bfc0', accentStrong: '#1c6566', accentSoft: '#e2f4f1', secondary: '#9b78aa', secondaryStrong: '#604071', heroBase: '#173238' }}
    className={styles.page} sources={<LessonSources title={translatedLabels.sources} items={references} note={t(lesson.sourceNote)}/> }>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}>
      <p>{t(section.lead)}</p>
      {section.rows ? <Matrix rows={section.rows} lang={lang}/> : null}
      {section.id === 'imaging' ? <figure className={styles.figure}><Image src="/educational/carotid-body-paraganglioma/ct-case-rid47694.png" alt={t(section.imageAlt)} width={282} height={340} sizes="(max-width: 700px) 80vw, 282px"/><figcaption>{t(section.imageCaption)}</figcaption></figure> : null}
      {section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}
      {section.note2 ? <aside className={styles.note}>{t(section.note2)}</aside> : null}
    </LessonSection>)}
    {[lesson.check, lesson.additionalCheck].filter(Boolean).map((check, index) => {
      const id = index === 0 ? 'check' : `check-${index + 1}`
      return <LessonSection key={id} id={id} icon="check" title={t(check.title)} bodyClassName={styles.body}><SelfCheck lang={lang} check={check} name={`carotid-body-paraganglioma-selfcheck-${index + 1}`}/></LessonSection>
    })}
    <LessonSection id="take-home" icon="summary" title={translatedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
