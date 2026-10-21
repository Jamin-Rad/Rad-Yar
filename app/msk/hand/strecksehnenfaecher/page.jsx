'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { WRIST_EXTENSOR_COMPARTMENTS_LESSON as lesson } from '@/data/wristExtensorCompartments'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] || value?.de || value

const LABELS = {
  contents: L('Lektionsinhalt', 'Lesson content', 'محتوای درس'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('Abschnitte gelesen', 'sections read', 'بخش خوانده‌شده'),
  continue: L('Weiter', 'Continue', 'ادامه'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'),
  close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Vier Orientierungspunkte', 'Four orientation points', 'چهار نکتهٔ جهت‌یابی'),
  sources: L('Quellen', 'Sources', 'منابع'),
  choose: L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'),
  correct: L('Richtig. ', 'Correct. ', 'درست است. '),
  revisit: L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '),
  deQuervain: L('Weiter: MRT-Muster bei De Quervain', 'Next: MRI pattern in De Quervain’s', 'ادامه: الگوی MRI در دو کروَن'),
}

function Icon({ id }) {
  const paths = {
    'carpal-orientation': 'M4 7h16M6 12h12M8 17h8M5 5l-1 2 1 2m14-2 1 2-1 2',
    'axial-orientation': 'M4 12h16M12 4v16M7 7l10 10M17 7 7 17',
    'tendon-map': 'M5 5h14M5 10h14M5 15h14M5 20h14',
    summary: 'm5 12 4 4L19 6',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[id] || paths.summary} /></svg>
}

function Decision({ lang, section }) {
  const [answer, setAnswer] = useState(null)
  const t = key => pick(LABELS[key], lang)
  return <div className={styles.decision}>
    <h3>{pick(L('Selbstcheck am Bild', 'Image-based self-check', 'خودآزمایی بر پایهٔ تصویر'), lang)}</h3>
    <p>{pick(section.task, lang)}</p>
    <fieldset><legend>{t('choose')}</legend>
      {section.options.map((option, index) => <label key={index}><input type="radio" name={`wrist-self-check-${section.id}`} checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={`${styles.feedback} ${answer === section.answer ? styles.correct : ''}`} role="status"><strong>{answer === section.answer ? t('correct') : t('revisit')}</strong>{pick(section.feedback[answer], lang)}</p> : null}
  </div>
}

export default function WristExtensorCompartmentsPage() {
  const { lang } = useLanguage()
  const t = key => pick(LABELS[key], lang)
  const sections = [
    ...lesson.sections.map(section => ({ id: section.id, label: pick(section.title, lang), icon: section.id })),
    { id: 'take-home', label: t('takeHome'), icon: 'summary', emphasis: true },
  ]
  const sources = lesson.references.map(reference => ({
    title: pick(reference.label, lang),
    citation: pick(reference.label, lang),
  }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)}
    breadcrumbs={[{ label: 'RadYar', href: '/' }, { label: 'MSK', href: '/lernen/msk' }, { label: pick(lesson.title, lang) }]}
    sections={sections}
    labels={Object.fromEntries(Object.entries(LABELS).map(([key, value]) => [key, pick(value, lang)]))}
    renderIcon={id => <Icon id={id} />}
    actions={{
      mcq: { href: '/ueben/quiz?fach=msk&n=1&themen=sehnenpathologien-hand', label: pick(L('Prüfungsfragen', 'Quiz questions', 'پرسش‌های آزمون'), lang) },
      flashcards: { href: '/flashcards/sehnenpathologien-hand', label: pick(L('Lernkarten', 'Flashcards', 'فلش‌کارت‌ها'), lang) },
    }}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: 1, accent: '#65c9be', accentStrong: '#176c68', accentSoft: '#d8f2ed', secondary: '#9fb4c0', secondaryStrong: '#476273', heroBase: '#182d3a' }}
    heroImageAlt={pick(lesson.heroAlt, lang)} className={styles.page}
    sources={<LessonSources title={t('sources')} items={sources} note={pick(lesson.scope, lang)} />}>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.id} title={pick(section.title, lang)} bodyClassName={styles.body}>
      <p className={styles.lead}>{pick(section.lead, lang)}</p>
      {section.image ? <figure className={styles.figure}><Image src={section.image} width={840} height={620} alt={pick(section.imageAlt, lang)} sizes="(max-width: 760px) 100vw, 850px" /><figcaption>{pick(section.imageCaption, lang)}</figcaption></figure> : null}
      {section.imageKey ? <div className={styles.figureKey}><h3>{pick(section.imageKeyTitle, lang)}</h3><dl>{section.imageKey.map((item, index) => <div key={index}><dt>{item.source}</dt><dd>{pick(item.label, lang)}</dd></div>)}</dl></div> : null}
      {section.rows ? <div className={styles.tableWrap}><table><caption>{pick(L('Sehnen und Landmarken der Strecksehnenfächer (nach MSK.pdf, S. 41)', 'Tendons and landmarks of the extensor compartments (from MSK.pdf, p. 41)', 'تاندون‌ها و نشانه‌های کمپارتمان‌های اکستانسور (بر اساس MSK.pdf، صفحهٔ ۴۱)'), lang)}</caption><thead><tr>{section.rows[0].map((cell, index) => <th scope="col" key={index}>{pick(cell, lang)}</th>)}</tr></thead><tbody>{section.rows.slice(1).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{pick(cell, lang)}</td>)}</tr>)}</tbody></table></div> : null}
      {section.note ? <p className={styles.note}>{pick(section.note, lang)}</p> : null}
      {section.task ? <Decision lang={lang} section={section} /> : null}
      {section.id === 'tendon-map' ? <p className={styles.related}><Link href="/msk/hand/de-quervain">{t('deQuervain')} →</Link></p> : null}
      {section.source ? <small className={styles.source}>{pick(section.source, lang)}</small> : null}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={t('takeHome')}><ol className={styles.summary}>{lesson.summary.map((rule, index) => <li key={index}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
