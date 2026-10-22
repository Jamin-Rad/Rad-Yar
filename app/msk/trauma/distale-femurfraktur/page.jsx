'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { DISTALE_FEMURFRAKTUR_LESSON as lesson } from '@/data/distaleFemurfraktur'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] || value?.de || value
const LABELS = {
  contents: L('Lektionsinhalt', 'Lesson content', 'محتوای درس'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'), continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Muster merken', 'Remember three patterns', 'سه الگو را به خاطر بسپارید'),
  quiz: L('Fragen zur distalen Femurfraktur', 'Distal femur questions', 'پرسش‌های شکستگی دیستال فمور'), cards: L('Lernkarten zur distalen Femurfraktur', 'Distal femur flashcards', 'فلش‌کارت‌های شکستگی دیستال فمور'),
}
function Icon({ id }) {
  const d = { pattern: 'M5 18 12 5l7 13M8 13h8', summary: 'M5 5h14M5 12h14M5 19h14' }[id] || 'M4 12h16'
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d={d}/></svg>
}
function SelfCheck({ lang, section }) {
  const [answer, setAnswer] = useState(null)
  const c = (de, en, fa) => pick(L(de, en, fa), lang)
  return <div className={styles.decision}>
    <h3>{c('Selbstprüfung', 'Self-check', 'خودآزمایی')}</h3><p>{pick(section.task, lang)}</p>
    <fieldset><legend>{c('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید')}</legend>
      {section.options.map((option, index) => <label key={index}><input type="radio" name="distal-femur-pattern" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={`${styles.feedback} ${answer === section.answer ? styles.correct : ''}`} role="status"><strong>{answer === section.answer ? c('Richtig. ', 'Correct. ', 'درست است. ') : c('Prüfen Sie das Muster erneut. ', 'Review the pattern. ', 'الگو را دوباره بررسی کنید. ')}</strong>{pick(section.feedback[answer], lang)}</p> : null}
    <p className={styles.note}>{pick(section.note, lang)}</p>
  </div>
}
export default function DistaleFemurfrakturPage() {
  const { lang } = useLanguage()
  const t = key => pick(LABELS[key], lang)
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: pick(section.title, lang), icon: section.id })), { id: 'take-home', label: t('takeHome'), icon: 'summary', emphasis: true }]
  const langHref = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const sourceItems = lesson.references.map(reference => ({ ...reference, title: pick(reference.title, lang), citation: pick(reference.citation, lang) }))
  const section = lesson.sections[0]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: pick(L('MSK', 'MSK', 'عضلانی‌اسکلتی'), lang), href: langHref('/lernen/msk') }, { label: pick(lesson.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(LABELS).map(([key, value]) => [key, pick(value, lang)]))} renderIcon={id => <Icon id={id}/>} actions={{ mcq: { label: t('quiz'), href: langHref('/ueben/quiz?fach=msk&n=8&themen=distale-femurfraktur') }, flashcards: { label: t('cards'), href: langHref('/flashcards/distale-femurfraktur') } }}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .72, accent: '#63c7bd', accentStrong: '#176c68', accentSoft: '#d8f2ed', secondary: '#9fb4c0', secondaryStrong: '#476273', heroBase: '#182d3a' }}
    heroImageAlt={pick(lesson.heroAlt, lang)} className={styles.page}
    sources={<LessonSources title={pick(L('Quellen', 'Sources', 'منابع'), lang)} items={sourceItems} note={pick(lesson.scope, lang)}/>}
  >
    <LessonSection id={section.id} icon={section.id} title={pick(section.title, lang)} bodyClassName={styles.body}>
      <p>{pick(section.lead, lang)}</p>
      <div className={styles.tableWrap}><table><caption>{pick(L('AO-Grundgruppen 33-A bis 33-C', 'AO basic groups 33-A to 33-C', 'گروه‌های پایهٔ AO از 33-A تا 33-C'), lang)}</caption><thead><tr><th scope="col">{pick(L('Gruppe', 'Group', 'گروه'), lang)}</th><th scope="col">{pick(L('Morphologie', 'Morphology', 'مورفولوژی'), lang)}</th></tr></thead><tbody>{section.rows.map((row, index) => <tr key={index}><th scope="row">{pick(row[0], lang)}</th><td>{pick(row[1], lang)}</td></tr>)}</tbody></table></div>
      <figure className={styles.figure}><Image src={lesson.hero} width={900} height={520} alt={pick(lesson.heroAlt, lang)} sizes="(max-width: 760px) 100vw, 760px"/><figcaption>{pick(L('Schema zur Gelenkbeteiligung; keine Patientenaufnahme.', 'Schematic of articular involvement; not a patient image.', 'شماتیک درگیری مفصل؛ تصویر بیمار نیست.'), lang)}</figcaption></figure>
      <figure className={styles.figure}><Image src={section.image} width={930} height={540} alt={pick(section.imageAlt, lang)} sizes="(max-width: 760px) 100vw, 760px"/><figcaption>{pick(section.imageCaption, lang)}</figcaption></figure>
      <SelfCheck lang={lang} section={section}/>
    </LessonSection>
    <LessonSection id="take-home" icon="summary" title={t('takeHome')}><ol className={styles.rules}>{lesson.summary.map(rule => <li key={rule.de}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
