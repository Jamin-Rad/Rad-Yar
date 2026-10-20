'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { PATELLA_STRECKAPPARAT_LESSON as lesson } from '@/data/patellaStreckapparatLesson'
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
  takeHome: L('Vier Regeln merken', 'Four rules to remember', 'چهار قاعده را به خاطر بسپارید'), sources: L('Quellen', 'Sources', 'منابع'),
}
function Icon({ id }) {
  const d = { anatomy: 'M12 3v18M5 8h14M7 8v10m10-10v10', morphology: 'M4 6h16v12H4zM4 12h16', dislocation: 'M5 5l14 14M19 5 5 19', tendinopathy: 'M12 3v18M8 7h8m-8 10h8', summary: 'M5 5h14M5 12h14M5 19h14' }[id] || 'M4 12h16'
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d={d}/></svg>
}
function Decision({ lang }) {
  const [answer, setAnswer] = useState(null)
  const check = lesson.check
  const c = (de, en, fa) => pick(L(de, en, fa), lang)
  return <div className={styles.check}>
    <h3>{c('Selbst prüfen', 'Check your understanding', 'خودآزمایی')}</h3><p>{pick(check.question, lang)}</p>
    <fieldset><legend>{c('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید')}</legend>{check.options.map((option, i) => <label key={i}><input type="radio" name="patella-dislocation-pattern" checked={answer === i} onChange={() => setAnswer(i)}/><span>{pick(option, lang)}</span></label>)}</fieldset>
    {answer !== null ? <p role="status" className={answer === check.answer ? styles.correct : styles.feedback}><strong>{answer === check.answer ? c('Richtig. ', 'Correct. ', 'درست است. ') : c('Noch einmal prüfen. ', 'Review the pattern. ', 'الگو را دوباره بررسی کنید. ')}</strong>{pick(check.feedback[answer], lang)}</p> : null}
  </div>
}
export default function PatellaStreckapparatPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const langHref = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.id })), { id: 'take-home', label: t(LABELS.takeHome), icon: 'summary', emphasis: true }]
  const sources = lesson.references.map(reference => ({ ...reference, title: t(reference.title), citation: typeof reference.citation === 'string' ? reference.citation : t(reference.citation) }))
  const figure = (src, alt, caption, width, height) => <figure className={styles.figure}><Image src={src} width={width} height={height} alt={t(alt)} sizes="(max-width: 760px) 100vw, 760px"/><figcaption>{t(caption)}</figcaption></figure>
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: t(L('MSK', 'MSK', 'عضلانی‌اسکلتی')), href: langHref('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(LABELS).map(([key, value]) => [key, t(value)]))} renderIcon={id => <Icon id={id}/>} actions={{}}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .85, accent: '#6aabc1', accentStrong: '#27576b', accentSoft: '#e7f1f4', secondary: '#d8a36f', secondaryStrong: '#80552d', heroBase: '#203746' }}
    heroImageAlt={t(lesson.heroAlt)} className={styles.page}
    sources={<LessonSources title={t(LABELS.sources)} items={sources} note={t(lesson.scope)}/>}
  >
    <LessonSection id="anatomy" icon="anatomy" title={t(lesson.sections[0].title)} bodyClassName={styles.body}>
      <p className={styles.lead}>{t(lesson.anatomy.lead)}</p>{lesson.anatomy.paragraphs.map((paragraph, i) => <p key={i}>{t(paragraph)}</p>)}
    </LessonSection>
    <LessonSection id="morphology" icon="morphology" title={t(lesson.sections[1].title)} bodyClassName={styles.body}>
      <p className={styles.lead}>{t(lesson.morphology.lead)}</p>
      <div className={styles.tableWrap}><table><caption>{t(L('Wiberg: Morphologie der Patellafacetten', 'Wiberg: patellar-facet morphology', 'ویبرگ: مورفولوژی فاست‌های کشکک'))}</caption><thead><tr><th scope="col">{t(L('Typ', 'Type', 'تیپ'))}</th><th scope="col">{t(L('Form in der Axialebene', 'Appearance on axial view', 'شکل در نمای محوری'))}</th></tr></thead><tbody>{lesson.morphology.rows.map((row, i) => <tr key={i}><th scope="row">{t(row[0])}</th><td>{t(row[1])}</td></tr>)}</tbody></table></div>
      {figure(lesson.morphology.image, lesson.morphology.imageAlt, lesson.morphology.imageCaption, 790, 244)}
      <h3>{t(L('Bipartite Patella oder Fraktur?', 'Bipartite patella or fracture?', 'کشکک دوقسمتی یا شکستگی؟'))}</h3>
      <ul className={styles.list}>{lesson.morphology.paragraphs.map((paragraph, i) => <li key={i}>{t(paragraph)}</li>)}</ul>
      <div className={styles.tableWrap}><table><caption>{t(L('Bildgebende Vergleichsmerkmale', 'Imaging comparison features', 'ویژگی‌های افتراقی در تصویربرداری'))}</caption><thead><tr><th scope="col">{t(L('Merkmal', 'Feature', 'ویژگی'))}</th><th scope="col">{t(L('Bipartite Patella', 'Bipartite patella', 'کشکک دوقسمتی'))}</th><th scope="col">{t(L('Akute Fraktur', 'Acute fracture', 'شکستگی حاد'))}</th></tr></thead><tbody>{lesson.morphology.comparisonRows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{t(cell)}</th> : <td key={j}>{t(cell)}</td>)}</tr>)}</tbody></table></div>
      <p className={styles.note}>{t(lesson.morphology.comparisonNote)}</p>
      {figure(lesson.morphology.comparisonImage, lesson.morphology.comparisonAlt, lesson.morphology.comparisonCaption, 380, 282)}
    </LessonSection>
    <LessonSection id="dislocation" icon="dislocation" title={t(lesson.sections[2].title)} bodyClassName={styles.body}>
      <p className={styles.lead}>{t(lesson.dislocation.lead)}</p><ol className={styles.list}>{lesson.dislocation.paragraphs.map((paragraph, i) => <li key={i}>{t(paragraph)}</li>)}</ol>
      {figure(lesson.dislocation.image, lesson.dislocation.imageAlt, lesson.dislocation.imageCaption, 680, 480)}
      <Decision lang={lang}/>
    </LessonSection>
    <LessonSection id="tendinopathy" icon="tendinopathy" title={t(lesson.sections[3].title)} bodyClassName={styles.body}>
      <p className={styles.lead}>{t(lesson.tendinopathy.lead)}</p>{lesson.tendinopathy.paragraphs.map((paragraph, i) => <p key={i}>{t(paragraph)}</p>)}
      {figure(lesson.tendinopathy.image, lesson.tendinopathy.imageAlt, lesson.tendinopathy.imageCaption, 620, 280)}
    </LessonSection>
    <LessonSection id="take-home" icon="summary" title={t(LABELS.takeHome)}><ol className={styles.summary}>{lesson.summary.map((rule, i) => <li key={i}>{t(rule)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
