'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { PROXIMAL_HUMERUS_LESSON as lesson, PROXIMAL_HUMERUS_ID } from '@/data/proximalHumerusLesson'
import styles from './page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value
const UI = {
  de: { report: 'Befundmuster', quiz: 'MCQ', cards: 'Flashcards', complete: 'Abschnitt als gelesen markieren', completeLesson: 'Ganze Lektion als gelesen markieren', continue: 'Weiter', choose: 'Eine Antwort wählen', path: 'Lernpfad', progress: 'gelesen', sources: 'Quellen und Geltungsbereich', takeHome: 'Drei Regeln merken' },
  en: { report: 'Fracture description', quiz: 'MCQ', cards: 'Flashcards', complete: 'Mark section as read', completeLesson: 'Mark full lesson as read', continue: 'Continue', choose: 'Choose one answer', path: 'Learning path', progress: 'read', sources: 'Sources and scope', takeHome: 'Three rules to remember' },
  fa: { report: 'الگوی شکستگی', quiz: 'MCQ', cards: 'فلش‌کارت', complete: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده', completeLesson: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده', continue: 'ادامه', choose: 'یک پاسخ انتخاب کنید', path: 'مسیر یادگیری', progress: 'خوانده‌شده', sources: 'منابع و محدوده', takeHome: 'سه قاعده برای یادآوری' },
}
function Icon({ id }) {
  const paths = { anatomy: 'M12 3c-4 0-7 3-7 7 0 3 2 5 4 6v5h6v-5c2-1 4-3 4-6 0-4-3-7-7-7Z', pattern: 'M4 5h16v14H4zM4 12h16', summary: 'M5 5h14M5 12h14M5 19h14' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern}/></svg>
}
function Decision({ lang }) {
  const [answer, setAnswer] = useState(null)
  const [checked, setChecked] = useState(false)
  const t = (de, en, fa) => L({ de, en, fa }, lang)
  return <div className={styles.decision}>
    <h3>{t('Selbstprüfung', 'Self-check', 'خودآزمایی')}</h3><p>{L(lesson.selfCheck.prompt, lang)}</p>
    <fieldset><legend>{UI[lang]?.choose || UI.de.choose}</legend>{lesson.selfCheck.options.map((option, index) => <label key={index}><input type="radio" name="proximal-humerus-part-count" checked={answer === index} onChange={() => { setAnswer(index); setChecked(false) }} /><span>{L(option, lang)}</span></label>)}</fieldset>
    <button className={styles.checkAnswer} type="button" disabled={answer === null} onClick={() => setChecked(true)}>{L(lesson.labels.checkAnswer, lang)}</button>
    {checked && answer !== null ? <p className={`${styles.feedback} ${answer === lesson.selfCheck.answer ? styles.correct : ''}`} role="status"><strong>{answer === lesson.selfCheck.answer ? t('Richtig. ', 'Correct. ', 'درست است. ') : t('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. ')}</strong>{L(lesson.selfCheck.explanation, lang)}</p> : null}
    <small>{L(lesson.selfCheckSource, lang)}</small>
  </div>
}

export default function ProximalHumerusFracturePage() {
  const { lang } = useLanguage()
  const ui = UI[lang] || UI.de
  const pick = value => L(value, lang)
  const langHref = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const from = encodeURIComponent(langHref(lesson.path))
  const actions = {
    mcq: { href: langHref(`/ueben/quiz?fach=msk&n=2&themen=${PROXIMAL_HUMERUS_ID}&from=${from}`), label: ui.quiz },
    flashcards: { href: langHref(`/flashcards/${PROXIMAL_HUMERUS_ID}?from=${from}`), label: ui.cards },
  }
  const labels = { ...lesson.labels, path: ui.path, progress: ui.progress, continue: ui.continue, complete: ui.complete, completeLesson: ui.completeLesson, sources: ui.sources, takeHome: ui.takeHome }
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: pick(section.title), icon: section.icon })), { id: 'take-home', label: ui.takeHome, icon: 'summary', emphasis: true }]
  const sourceItems = lesson.references.map(reference => ({ ...reference, title: pick(reference.title), citation: pick(reference.citation), scope: pick(reference.scope) }))

  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: 'MSK', href: langHref('/lernen/msk') }, { label: pick(lesson.title) }]}
    sections={sections} labels={labels} renderIcon={id => <Icon id={id}/>} actions={actions}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .7, accent: '#67c9be', accentStrong: '#176d67', accentSoft: '#dcf3ef', secondary: '#9cb4c1', secondaryStrong: '#4e6879', heroBase: '#182d3a' }}
    heroImageAlt={pick(lesson.heroAlt)} className={styles.page}
    sources={<LessonSources title={ui.sources} items={sourceItems} note={pick(lesson.scope)} />}>
    <LessonSection id="segmente" icon="anatomy" title={pick(lesson.sections[0].title)} bodyClassName={styles.body}>
      <p>{pick(lesson.segmentLead)}</p>
      <figure className={styles.figure}><Image src={lesson.hero} width={900} height={560} alt={pick(lesson.heroAlt)} /><figcaption>{pick(L({ de: 'Code-eigenes Orientierungsschema; keine Patientendaten und kein diagnostisches Bild.', en: 'Code-authored orientation schematic; no patient data and not diagnostic imaging.', fa: 'شماتیک جهت‌یابیِ ترسیم‌شده با کد؛ بدون دادهٔ بیمار و غیرتشخیصی.' }, lang))}</figcaption></figure>
      <div className={styles.tableWrap}><table><caption>{pick(L({ de: 'Legende zum Schema: A–D; vier Segmente für die Beschreibung', en: 'Schematic key: A–D; four segments for description', fa: 'راهنمای شماتیک: A تا D؛ چهار قطعه برای توصیف' }, lang))}</caption><thead><tr><th scope="col">{pick(L({ de: 'Segment', en: 'Segment', fa: 'قطعه' }, lang))}</th><th scope="col">{pick(L({ de: 'Radiologische Aufgabe', en: 'Radiology task', fa: 'وظیفهٔ رادیولوژیک' }, lang))}</th></tr></thead><tbody>{lesson.segments.map((row, index) => <tr key={index}><th scope="row"><span className={styles.segmentLetter}>{String.fromCharCode(65 + index)}</span>{pick(row[0])}</th><td>{pick(row[1])}</td></tr>)}</tbody></table></div>
    </LessonSection>
    <LessonSection id="beschreibung" icon="pattern" title={pick(lesson.sections[1].title)} bodyClassName={styles.body}>
      <p>{pick(lesson.patternLead)}</p><p className={styles.rule}>{pick(lesson.displacement)}</p>
      <aside className={styles.cave}><strong>{pick(L({ de: 'Cave · Klassifikationsgrenzen', en: 'Cave · classification limits', fa: 'هشدار · محدودیت طبقه‌بندی' }, lang))}</strong><p>{pick(lesson.cave)}</p></aside>
      <div className={styles.decisionWrap}><Decision lang={lang}/></div>
      <h3>{ui.report}</h3><p>{pick(L({ de: 'Im Befund mindestens Seite, Frakturort, betroffene Segmente, Gelenkflächenbezug, Fragmentstellung mit Richtung und Ausmaß sowie Impaktion oder Luxation nennen. Eine Neer-Partzahl kann ergänzen, ersetzt diese Angaben aber nicht.', en: 'At minimum, report side, fracture location, involved segments, articular relationship, fragment position with direction and extent, and any impaction or dislocation. A Neer part count may supplement but does not replace these details.', fa: 'در گزارش دست‌کم سمت، محل شکستگی، قطعات درگیر، ارتباط با سطح مفصلی، وضعیت قطعات همراه با جهت و میزان جابه‌جایی و هرگونه ایمپکشن یا دررفتگی را ذکر کنید. تعداد قطعات Neer می‌تواند مکمل باشد، اما جایگزین این جزئیات نیست.' }, lang))}</p>
    </LessonSection>
    <LessonSection id="take-home" icon="summary" title={ui.takeHome}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{pick(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
