'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { FEMORAL_SHAFT_LESSON as lesson } from '@/data/femoralShaftLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] || value?.de || value

const LABELS = {
  progress: L('gelesen', 'read', 'خوانده‌شده'), continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Muster merken', 'Remember three patterns', 'سه الگو را به خاطر بسپارید'),
}

function Icon({ id }) {
  const paths = { pattern: 'M4 6h16M4 12h16M4 18h16', imaging: 'M4 19 20 5M4 12h16', summary: 'M5 5h14M5 12h14M5 19h14' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d={paths[id] || paths.ao32}/></svg>
}

function SelfCheck({ lang, section }) {
  const [answer, setAnswer] = useState(null)
  const t = (de, en, fa) => pick(L(de, en, fa), lang)
  return <div className={styles.decision}>
    <h3>{t('Selbstprüfung', 'Self-check', 'خودآزمایی')}</h3>
    <p>{pick(section.task, lang)}</p>
    <fieldset><legend>{t('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید')}</legend>
      {section.options.map((option, index) => <label key={index}><input type="radio" name="femoral-shaft-pattern" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={`${styles.feedback} ${answer === section.answer ? styles.correct : ''}`} role="status"><strong>{answer === section.answer ? t('Richtig. ', 'Correct. ', 'درست است. ') : t('Prüfen Sie die Frakturlinie erneut. ', 'Review the fracture line. ', 'خط شکستگی را دوباره بررسی کنید. ')}</strong>{pick(section.feedback[answer], lang)}</p> : null}
    <p className={styles.note}>{pick(section.note, lang)}</p>
  </div>
}

export default function FemoralShaftFracturePage() {
  const { lang } = useLanguage()
  const t = key => pick(LABELS[key], lang)
  const langHref = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: pick(section.title, lang), icon: section.icon })), { id: 'take-home', label: t('takeHome'), icon: 'summary', emphasis: true }]
  const sourceItems = lesson.references.map(reference => ({ ...reference, title: pick(reference.title, lang), citation: pick(reference.citation, lang) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="RadYar"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: 'MSK', href: langHref('/lernen/msk') }, { label: pick(lesson.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(LABELS).map(([key, value]) => [key, pick(value, lang)]))} renderIcon={id => <Icon id={id}/>}
    actions={{ mcq: { label: pick(L('Fragen zur AO-32-Morphologie', 'AO 32 morphology questions', 'پرسش‌های مورفولوژی AO 32'), lang), href: langHref('/ueben/quiz?fach=msk&n=2&themen=femurschaftfraktur') }, flashcards: { label: pick(L('Lernkarten zur Femurschaftfraktur', 'Femoral shaft flashcards', 'فلش‌کارت‌های شکستگی تنهٔ فمور'), lang), href: langHref('/flashcards/femurschaftfraktur') } }}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .78, accent: '#b98258', accentStrong: '#74462d', accentSoft: '#f4e8dd', secondary: '#8eb6bd', secondaryStrong: '#365f68', heroBase: '#27333a' }}
    heroImageAlt={pick(lesson.heroAlt, lang)} className={styles.page}
    sources={<LessonSources title={pick(L('Quellen', 'Sources', 'منابع'), lang)} items={sourceItems} note={pick(lesson.scope, lang)}/>}
  >
    {lesson.sections.map((section, index) => <LessonSection key={section.id} id={section.id} icon={section.icon} title={pick(section.title, lang)} bodyClassName={styles.body}>
      <p className={styles.lead}>{pick(section.lead, lang)}</p>
      {section.rows ? <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={pick(L('AO-32-Grundgruppen nach Morphologie', 'AO 32 basic groups by morphology', 'گروه‌های پایهٔ AO 32 بر اساس مورفولوژی'), lang)}><table><caption>{pick(L('AO-32-Grundgruppen nach Morphologie', 'AO 32 basic groups by morphology', 'گروه‌های پایهٔ AO 32 بر اساس مورفولوژی'), lang)}</caption><thead><tr><th scope="col">{pick(L('Gruppe', 'Group', 'گروه'), lang)}</th><th scope="col">{pick(L('Morphologie', 'Morphology', 'مورفولوژی'), lang)}</th></tr></thead><tbody>{section.rows.map((row, rowIndex) => <tr key={rowIndex}><th scope="row">{pick(row[0], lang)}</th><td>{pick(row[1], lang)}</td></tr>)}</tbody></table></div> : null}
      {section.image ? <figure className={styles.figure}><Image src={section.image} width={1112} height={610} alt={pick(section.imageAlt, lang)} sizes="(max-width: 760px) 100vw, 900px"/><figcaption>{pick(section.imageCaption, lang)}</figcaption></figure> : null}
      {section.options ? <SelfCheck lang={lang} section={section}/> : null}
      {section.note && !section.options ? <aside className={styles.note}>{pick(section.note, lang)}</aside> : null}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={t('takeHome')}><ol className={styles.rules}>{lesson.summary.map(rule => <li key={rule.de}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
