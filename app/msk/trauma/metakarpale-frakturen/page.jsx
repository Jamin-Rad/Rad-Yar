'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { METAKARPALE_FRAKTUREN_LESSON as lesson } from '@/data/metakarpale-frakturen'
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
}
function Icon({ id }) {
  const d = { pattern: 'M5 18 12 5l7 13M8 13h8', compare: 'M4 5h16M4 12h16M4 19h16', decision: 'M4 12h16m-7-7 7 7-7 7', summary: 'M5 5h14M5 12h14M5 19h14' }[id] || 'M4 12h16'
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d={d}/></svg>
}
function Decision({ lang }) {
  const [answer, setAnswer] = useState(null)
  const c = (de, en, fa) => pick(L(de, en, fa), lang)
  return <div className={styles.decision}>
    <h3>{c('Selbstprüfung', 'Self-check', 'خودآزمایی')}</h3>
    <p>{pick(lesson.sections[2].task, lang)}</p>
    <fieldset><legend>{c('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید')}</legend>
      {lesson.sections[2].options.map((option, index) => <label key={index}><input type="radio" name="metacarpal-pattern" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={`${styles.feedback} ${answer === lesson.sections[2].answer ? styles.correct : ''}`} role="status"><strong>{answer === lesson.sections[2].answer ? c('Richtig. ', 'Correct. ', 'درست است. ') : c('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. ')}</strong>{pick(lesson.sections[2].feedback[answer], lang)}</p> : null}
  </div>
}
export default function MetakarpaleFrakturenPage() {
  const { lang } = useLanguage()
  const t = key => pick(LABELS[key], lang)
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: pick(section.title, lang), icon: section.id })), { id: 'take-home', label: t('takeHome'), icon: 'summary', emphasis: true }]
  const langHref = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const source = { tag: 'MSK.pdf · PDF S.21', title: L('MSK.pdf · Basisfrakturen Os metacarpale I', 'MSK.pdf · First metacarpal base fractures', 'MSK.pdf · شکستگی‌های قاعدهٔ متاکارپ اول'), citation: L('PDF S.21 (gedruckte S.20), Abschnitt „OS Metakarpale I – Basisfrakturen“; Text und vergleichende Illustration geprüft.', 'PDF p.21 (printed p.20), “First metacarpal base fractures”; text and comparative illustration inspected.', 'صفحهٔ PDF ۲۱ (چاپی ۲۰)، بخش «شکستگی‌های قاعدهٔ متاکارپ اول»؛ متن و تصویر مقایسه‌ای بررسی شد.') }
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: pick(L('MSK', 'MSK', 'عضلانی‌اسکلتی'), lang), href: langHref('/lernen/msk') }, { label: pick(lesson.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(LABELS).map(([key, value]) => [key, pick(value, lang)]))} renderIcon={id => <Icon id={id}/>}
    actions={{ mcq: { label: pick(L('Prüfungsfrage', 'Practice question', 'سؤال تمرینی'), lang), href: langHref('/ueben/quiz?fach=msk&n=1&themen=metakarpale-frakturen') } }}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .72, accent: '#65c9be', accentStrong: '#176c68', accentSoft: '#d8f2ed', secondary: '#9fb4c0', secondaryStrong: '#476273', heroBase: '#172d3a' }}
    heroImageAlt={pick(lesson.heroAlt, lang)} className={styles.page}
    sources={<LessonSources title={pick(L('Quelle', 'Source', 'منبع'), lang)} items={[{ ...source, title: pick(source.title, lang), citation: pick(source.citation, lang) }]} note={pick(lesson.scope, lang)}/>}
  >
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.id} title={pick(section.title, lang)} bodyClassName={styles.body}>
      <p>{pick(section.lead, lang)}</p>
      {section.paragraphs?.map((paragraph, index) => <p key={index}>{pick(paragraph, lang)}</p>)}
      {section.rows ? <div className={styles.tableWrap}><table><caption>{pick(L('Bildmorphologie an der Basis von Metakarpale I', 'Imaging morphology at the base of metacarpal I', 'مورفولوژی تصویربرداری در قاعدهٔ متاکارپ اول'), lang)}</caption><thead><tr><th scope="col">{pick(L('Muster', 'Pattern', 'الگو'), lang)}</th><th scope="col">{pick(L('Merkmale', 'Features', 'ویژگی‌ها'), lang)}</th></tr></thead><tbody>{section.rows.map((row, index) => <tr key={index}><th scope="row">{pick(row[0], lang)}</th><td>{pick(row[1], lang)}</td></tr>)}</tbody></table></div> : null}
      {section.image ? <figure className={styles.figure}><Image src={section.image} width={1209} height={431} alt={pick(section.imageAlt, lang)} sizes="(max-width: 760px) 100vw, 850px"/><figcaption>{pick(section.imageCaption, lang)}</figcaption></figure> : null}
      {section.task ? <><Decision lang={lang}/><p className={styles.scopeNote}>{pick(section.scopeNote, lang)}</p></> : null}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={t('takeHome')}><ol className={styles.rules}>{lesson.summary.map(rule => <li key={rule.de}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
