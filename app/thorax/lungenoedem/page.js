'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { PULMONARY_EDEMA_LESSON as lesson } from '@/data/pulmonaryEdema'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
const LABELS = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiter', 'Continue', 'ادامه'), completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark the full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson read', 'کل درس خوانده شد'), complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'), completed: L('Gelesen', 'Read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Abschnitt schließen', 'Close section', 'بستن بخش'), takeHome: L('Vier Regeln merken', 'Four rules to remember', 'چهار نکته برای یادآوری'),
}
const TITLE = L('Thorax', 'Thorax', 'قفسه سینه')
function Icon({ id }) {
  const paths = { start: 'M12 3v18M3 12h18', sequence: 'M4 5h12m0 0-3-3m3 3-3 3M20 12H8m0 0 3-3m-3 3 3 3M4 19h12', hrct: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5', differentiate: 'M5 5h6v6H5zM13 13h6v6h-6z', ards: 'M12 3v8m0 0-6 4m6-4 6 4M6 15v5m12-5v5', case: 'M4 12h16M12 4v16', summary: 'M5 5h14M5 12h14M5 19h14' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.sequence}/></svg>
}
function FeatureTable({ rows, lang }) {
  return <div className={styles.tableWrap}><table><thead><tr><th scope="col">{pick(L('Muster', 'Pattern', 'الگو'), lang)}</th><th scope="col">{pick(L('Bildgebende Einordnung', 'Imaging interpretation', 'تفسیر تصویربرداری'), lang)}</th></tr></thead><tbody>{rows.map(([label, value], i) => <tr key={i}><th scope="row">{pick(label, lang)}</th><td>{pick(value, lang)}</td></tr>)}</tbody></table></div>
}
function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  const item = lesson.check
  return <div className={styles.check}><h3>{pick(item.title, lang)}</h3><p>{pick(item.prompt, lang)}</p><fieldset><legend>{pick(L('Eine Antwort wählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{item.options.map((option, i) => <label key={i}><input type="radio" name="pulmonary-edema-check" checked={answer === i} onChange={() => setAnswer(i)}/><span>{pick(option, lang)}</span></label>)}</fieldset>{answer !== null && <div role="status" className={styles.feedback}><strong>{pick(answer === item.answerIndex ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Try again. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(answer === item.answerIndex ? item.correct : item.retry, lang)}{answer !== item.answerIndex && <button type="button" onClick={() => setAnswer(null)}>{pick(L('Erneut versuchen', 'Try again', 'تلاش دوباره'), lang)}</button>}</div>}</div>
}
export default function PulmonaryOedemaPage() {
  const { lang } = useLanguage()
  const t = key => pick(LABELS[key], lang)
  const labels = Object.fromEntries(Object.keys(LABELS).map(key => [key, t(key)]))
  const path = href => lang === 'de' ? href : `${href}?lang=${lang}`
  const sections = [{ id: 'start', label: pick(L('Das Muster in drei Stufen', 'The pattern in three stages', 'الگو در سه مرحله'), lang), icon: 'start' }, ...lesson.chapters.map(c => ({ id: c.id, label: pick(c.title, lang), icon: c.icon })), { id: 'case', label: pick(lesson.check.title, lang), icon: 'case' }, { id: 'take-home', label: t('takeHome'), icon: 'summary', emphasis: true }]
  const sourceTags = [L('Globaler Konsens · Definition', 'Global consensus · definition', 'تعریف اجماعی جهانی'), L('ARDS · Berlin-Definition', 'ARDS · Berlin definition', 'ARDS · تعریف برلین'), L('Röntgen · Vergleichskohorte', 'Radiography · comparative cohort', 'رادیوگرافی · مطالعهٔ مقایسه‌ای')]
  const sources = lesson.references.filter(item => item.url).map((item, i) => ({ tag: item.tag ? pick(item.tag, lang) : pick(sourceTags[i], lang), title: pick(item.label, lang), href: item.url, citation: pick(L('Studie oder Konsensusquelle; Stichprobe und Geltungsbereich beachten.', 'Study or consensus source; note its sample and scope.', 'مطالعه یا منبع اجماعی؛ نمونه و محدودهٔ کاربرد را در نظر بگیرید.'), lang) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: path('/') }, { label: pick(TITLE, lang), href: path('/lernen/thorax') }]}
    sections={sections} labels={labels} actions={{ mcq: { label: pick(L('Quiz zum Lungenödem', 'Pulmonary oedema quiz', 'آزمون ادم ریوی'), lang), href: `/ueben/quiz?fach=thorax&n=2&themen=lungenoedem${lang === 'de' ? '' : `&lang=${lang}`}` }, flashcards: { label: pick(L('Lungenödem-Flashcards', 'Pulmonary oedema flashcards', 'فلش‌کارت‌های ادم ریوی'), lang), href: path('/flashcards/lungenoedem') } }} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.heroImage, heroImageOpacity: .75, accent: '#70bdc8', accentStrong: '#216a78', accentSoft: '#e1f3f5', secondary: '#9678c5', secondaryStrong: '#63428e', heroBase: '#172c3b' }}
    heroImageAlt={pick(lesson.alt, lang)} className={styles.page} syncHashNavigation
    sources={<LessonSources title={pick(L('Quellen und Geltungsbereich', 'Sources and scope', 'منابع و محدوده'), lang)} items={sources} note={pick(lesson.notice, lang)}/>}
  >
    <LessonSection id="start" icon="start" title={pick(L('Das Muster in drei Stufen', 'The pattern in three stages', 'الگو در سه مرحله'), lang)}><div className={styles.body}><p>{pick(L('Lungenödem ist Flüssigkeit im pulmonalen Interstitium und/oder in den Alveolen. Lies die Thoraxaufnahme als Muster aus Gefäßen, Interstitium und Lufträumen – nicht als direkte Druckmessung.', 'Pulmonary oedema is fluid in the pulmonary interstitium and/or alveoli. Read the chest image as a pattern across vessels, interstitium and airspaces—not as a direct pressure measurement.', 'ادم ریوی تجمع مایع در بینابینی و/یا آلوئول‌های ریه است. تصویر قفسه سینه را به‌صورت الگویی از عروق، فضای بینابینی و فضاهای هوایی بخوانید، نه اندازه‌گیری مستقیم فشار.'), lang)}</p><img className={styles.diagram} src={lesson.heroImage} alt={pick(lesson.alt, lang)}/><ol className={styles.visualLegend}>{lesson.visualLegend.map((label, i) => <li key={i}><span>{i + 1}</span>{pick(label, lang)}</li>)}</ol><p className={styles.scope}>{pick(lesson.visualNote, lang)}</p></div></LessonSection>
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={pick(chapter.title, lang)}><div className={styles.body}><p>{pick(chapter.lead, lang)}</p><FeatureTable rows={chapter.rows} lang={lang}/>{chapter.figure && <figure className={styles.sourceFigure}><img src={chapter.figure.src} alt={pick(chapter.figure.alt, lang)}/><div className={styles.sourceImageLabels}>{chapter.figure.labels.map((label, i) => <span key={i}>{pick(label, lang)}</span>)}</div><figcaption>{pick(chapter.figure.caption, lang)}</figcaption></figure>}<p className={styles.scope}>{pick(chapter.note, lang)}</p><small>{pick(chapter.id === 'ards' ? L('Thorax.pdf, PDF S. 49 (Druckseite 48); ARDS Global Definition 2024.', 'Thorax.pdf, PDF p. 49 (printed p. 48); Global ARDS Definition 2024.', 'Thorax.pdf، صفحهٔ PDF ۴۹ (چاپی ۴۸)؛ تعریف جهانی ARDS سال ۲۰۲۴.') : chapter.id === 'hrct' ? L('Thorax.pdf, PDF S. 17 (Druckseite 16); Ribeiro et al. 2006; Kim et al. 2001.', 'Thorax.pdf, PDF p. 17 (printed p. 16); Ribeiro et al. 2006; Kim et al. 2001.', 'Thorax.pdf، صفحهٔ PDF ۱۷ (چاپی ۱۶)؛ Ribeiro و همکاران، ۲۰۰۶؛ Kim و همکاران، ۲۰۰۱.') : L('Thorax.pdf, PDF S. 48–49 (Druckseiten 47–48).', 'Thorax.pdf, PDF pp. 48–49 (printed pp. 47–48).', 'Thorax.pdf، صفحات PDF ۴۸–۴۹ (چاپی ۴۷–۴۸).'), lang)}</small></div></LessonSection>)}
    <LessonSection id="case" icon="case" title={pick(lesson.check.title, lang)}><Check lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="summary" title={t('takeHome')}><ol className={styles.rules}>{lesson.takeHome.map((rule, i) => <li key={i}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
