'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { SPINE_INFECTION_LESSON as lesson } from '@/data/spineInfection'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
const LABELS = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiter', 'Continue', 'ادامه'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark the full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Gelesen', 'Read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'),
  close: L('Abschnitt schließen', 'Close section', 'بستن بخش'),
  takeHome: L('Drei Regeln merken', 'Three rules to remember', 'سه نکته برای یادآوری'),
}
const TITLE = L('Wirbelsäule', 'Spine', 'ستون فقرات')

function Icon({ id }) {
  const paths = {
    start: 'M12 3v18M3 12h18', pattern: 'M4 6h16M4 12h16M4 18h16',
    tuberculosis: 'M12 3v18M5 7l14 10M19 7 5 17', differentiate: 'M5 5h6v6H5zM13 13h6v6h-6z',
    case: 'M4 12h16M12 4v16', summary: 'M5 5h14M5 12h14M5 19h14',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d={paths[id] || paths.pattern}/></svg>
}

function Comparison({ rows, lang }) {
  return <div className={styles.tableWrap}><table><thead><tr><th scope="col">{pick(L('Sequenz / Frage', 'Sequence / question', 'سکانس / پرسش'), lang)}</th><th scope="col">{pick(L('Einordnung', 'Interpretation', 'تفسیر'), lang)}</th></tr></thead><tbody>{rows.map(([label, value], index) => <tr key={`${pick(label, lang)}-${index}`}><th scope="row">{pick(label, lang)}</th><td>{pick(value, lang)}</td></tr>)}</tbody></table></div>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const item = lesson.case
  const correct = answer === item.answerIndex
  return <div className={styles.decision}>
    <h3>{pick(item.title, lang)}</h3><p>{pick(item.prompt, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort wählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'), lang)}</legend>
      {item.options.map((option, index) => <label key={index}><input type="radio" name="spine-infection-check" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null && <div className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Try again. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(correct ? item.feedbackCorrect : item.feedbackIncorrect, lang)}{!correct && <button type="button" onClick={() => setAnswer(null)}>{pick(L('Erneut versuchen', 'Try again', 'تلاش دوباره'), lang)}</button>}</div>}
  </div>
}

export default function SpineInfectionPage() {
  const { lang } = useLanguage()
  const t = key => pick(LABELS[key], lang)
  const labels = Object.fromEntries(Object.keys(LABELS).map(key => [key, t(key)]))
  const localizedPath = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const chapters = lesson.chapters
  const sections = [
    { id: 'start', label: pick(lesson.intro.title, lang), icon: 'start' },
    ...chapters.map(chapter => ({ id: chapter.id, label: pick(chapter.title, lang), icon: chapter.id })),
    { id: 'case', label: pick(lesson.case.title, lang), icon: 'case' },
    { id: 'take-home', label: t('takeHome'), icon: 'summary', emphasis: true },
  ]
  const sourceTags = ['ACR · Adults', 'ACR · Paediatrics', 'IDSA · Adults', 'MRI · Review', 'AJNR · Primary study', 'MRI · Meta-analysis', 'TB · Imaging review']
  const sources = lesson.references.map((item, index) => ({
    tag: sourceTags[index] || 'MRI',
    title: pick(item.label, lang), href: item.url,
    citation: pick(L('Ergänzende Quelle; Geltungsbereich im Titel beachten.', 'Supplementary source; note the population in its title.', 'منبع تکمیلی؛ جمعیت مورد مطالعه را در عنوان منبع ببینید.'), lang),
  }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: localizedPath('/') }, { label: pick(TITLE, lang), href: localizedPath('/lernen/wirbelsaeule') }]}
    sections={sections} labels={labels} actions={{}} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.heroImage, heroImageOpacity: .6, accent: '#72b7c7', accentStrong: '#236c7d', accentSoft: '#dff2f5', secondary: '#9a79c5', secondaryStrong: '#62418e', heroBase: '#172c3b' }}
    heroImageAlt={pick(lesson.alt, lang)} className={styles.page} syncHashNavigation
    sources={<LessonSources title={pick(L('Quellen und Geltungsbereich', 'Sources and scope', 'منابع و محدوده'), lang)} items={sources} note={pick(lesson.notice, lang)}/>}
  >
    <LessonSection id="start" icon="start" title={pick(lesson.intro.title, lang)}>
      <div className={styles.body}><p>{pick(lesson.intro.text, lang)}</p><p className={styles.scope}>{pick(lesson.media, lang)}</p><p className={styles.scope}>{pick(L('Lernziel: das Muster aus Bandscheibe, angrenzenden Endplatten und Weichteilausdehnung gemeinsam beschreiben. Das ist kein Erregernachweis.', 'Objective: describe the combined disc, adjacent endplate and soft-tissue pattern. This does not identify an organism.', 'هدف: الگوی دیسک، صفحات انتهایی مجاور و گسترش بافت نرم را در کنار هم توصیف کنید. این کار عامل عفونی را مشخص نمی‌کند.'), lang)}</p></div>
    </LessonSection>
    {chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={pick(chapter.title, lang)}>
      <div className={styles.body}><p>{pick(chapter.lead, lang)}</p><Comparison rows={chapter.rows} lang={lang}/><p className={styles.scope}>{pick(chapter.note, lang)}</p><small>{pick(chapter.source, lang)}</small></div>
    </LessonSection>)}
    <LessonSection id="case" icon="case" title={pick(lesson.case.title, lang)}><SelfCheck lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="summary" title={t('takeHome')}><ol className={styles.rules}>{(lesson.takeHome || []).map((rule, index) => <li key={index}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
