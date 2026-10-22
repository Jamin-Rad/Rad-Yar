'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { SKAPHOIDFRAKTUR_LESSON as lesson } from '@/data/skaphoidfraktur'
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
  takeHome: L('Drei Regeln merken', 'Three rules to remember', 'سه قاعده را به خاطر بسپارید'),
  quiz: L('Fragen zur Skaphoidfraktur', 'Scaphoid fracture questions', 'پرسش‌های شکستگی اسکافوئید'),
  flashcards: L('Skaphoidfraktur – Lernkarten', 'Scaphoid fracture flashcards', 'فلش‌کارت‌های شکستگی اسکافوئید'),
}
function Icon({ id }) {
  const d = { klassifikation: 'M5 5h14v14H5zM8 9h8M8 13h8', 'pseudarthrose-snac': 'M4 12h5l2-6 3 12 2-6h4', abgrenzung: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m0 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10', summary: 'M5 5h14M5 12h14M5 19h14' }[id] || 'M4 12h16'
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d={d}/></svg>
}
function Decision({ lang, section }) {
  const [answer, setAnswer] = useState(null)
  const c = (de, en, fa) => pick(L(de, en, fa), lang)
  return <div className={styles.decision}>
    <h3>{c('Selbstprüfung', 'Self-check', 'خودآزمایی')}</h3><p>{pick(section.task, lang)}</p>
    <fieldset><legend>{c('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید')}</legend>
      {section.options.map((option, index) => <label key={index}><input type="radio" name="scaphoid-herbert-subtype" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={`${styles.feedback} ${answer === section.answer ? styles.correct : ''}`} role="status"><strong>{answer === section.answer ? c('Richtig. ', 'Correct. ', 'درست است. ') : c('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. ')}</strong>{pick(section.feedback[answer], lang)}</p> : null}
    <p className={styles.note}>{pick(section.note, lang)}</p>
  </div>
}
export default function SkaphoidfrakturPage() {
  const { lang } = useLanguage()
  const t = key => pick(LABELS[key], lang)
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: pick(section.title, lang), icon: section.id })), { id: 'take-home', label: t('takeHome'), icon: 'summary', emphasis: true }]
  const langHref = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const references = lesson.references.map(reference => ({ ...reference, title: pick(reference.title, lang), citation: pick(reference.citation, lang) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: pick(L('MSK', 'MSK', 'عضلانی‌اسکلتی'), lang), href: langHref('/lernen/msk') }, { label: pick(lesson.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(LABELS).map(([key, value]) => [key, pick(value, lang)]))} renderIcon={id => <Icon id={id}/>}
    actions={{
      mcq: { label: t('quiz'), href: langHref(`/ueben/quiz?fach=msk&n=8&themen=skaphoidfraktur`) },
      flashcards: { label: t('flashcards'), href: langHref('/flashcards/skaphoidfraktur') },
    }}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .72, accent: '#65c9be', accentStrong: '#176c68', accentSoft: '#d8f2ed', secondary: '#9fb4c0', secondaryStrong: '#476273', heroBase: '#182d3a' }}
    heroImageAlt={pick(lesson.heroAlt, lang)} className={styles.page}
    sources={<LessonSources title={pick(L('Quellen', 'Sources', 'منابع'), lang)} items={references} note={pick(lesson.scope, lang)}/>}
  >
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.id} title={pick(section.title, lang)} bodyClassName={styles.body}>
      <p>{pick(section.lead, lang)}</p>
      {section.paragraphs?.map((paragraph, index) => <p key={index}>{pick(paragraph, lang)}</p>)}
      {section.rows ? <div className={styles.tableWrap}><table><caption>{pick(L('Ausbreitung des SNAC-Arthrosemusters', 'Spread of the SNAC arthritis pattern', 'گسترش الگوی آرتروز SNAC'), lang)}</caption><thead><tr><th scope="col">{pick(L('Abschnitt', 'Pattern', 'مرحله'), lang)}</th><th scope="col">{pick(L('Betroffene Gelenke', 'Articulations involved', 'مفاصل درگیر'), lang)}</th></tr></thead><tbody>{section.rows.map((row, index) => <tr key={index}><th scope="row">{pick(row[0], lang)}</th><td>{pick(row[1], lang)}</td></tr>)}</tbody></table></div> : null}
      {section.image ? <figure className={styles.figure}><Image src={section.image} width={section.id === 'pseudarthrose-snac' ? 406 : section.id === 'abgrenzung' ? 924 : 815} height={section.id === 'pseudarthrose-snac' ? 444 : section.id === 'abgrenzung' ? 394 : 590} alt={pick(section.imageAlt, lang)} sizes="(max-width: 760px) 100vw, 850px"/><figcaption>{pick(section.imageCaption, lang)}</figcaption>{section.imageLabelTranslations ? <ul className={styles.imageLabels} aria-label={pick(L('Übersetzung der Bildbeschriftungen', 'Translations of figure labels', 'ترجمهٔ برچسب‌های تصویر'), lang)}>{section.imageLabelTranslations.map((item, index) => <li key={index}>{pick(item, lang)}</li>)}</ul> : null}</figure> : null}
      {section.task ? <Decision lang={lang} section={section}/> : null}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={t('takeHome')}><ol className={styles.rules}>{lesson.summary.map(rule => <li key={rule.de}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
