'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { COPD_IMAGING_LESSON as lesson } from '@/data/copdImagingLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
const labels = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiter', 'Continue', 'ادامه'), completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark the full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Gelesen', 'Read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Lernpfad schließen', 'Close learning path', 'بستن مسیر یادگیری'),
  takeHome: L('Drei Regeln merken', 'Three rules to remember', 'سه نکته برای یادآوری'),
  mcq: L('Wissen prüfen', 'Check your knowledge', 'دانش خود را بسنجید'), cards: L('Lernkarten öffnen', 'Open flashcards', 'بازکردن فلش‌کارت‌ها'),
}
const iconPaths = {
  start: 'M12 3v18M3 12h18', pattern: 'M4 5h16v14H4zM5 15l4-4 3 2 6-6',
  categories: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  interpretation: 'M4 12h6m4 0h6M10 8l4 4-4 4M4 5h16M4 19h16', check: 'm4 12 5 5L20 6', summary: 'M5 5h14M5 12h14M5 19h14',
}
function Icon({ id = 'pattern' }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[id] || iconPaths.pattern}/></svg> }

function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  const t = value => pick(value, lang)
  const check = lesson.check
  return <div className={styles.check}>
    <p>{t(check.prompt)}</p>
    <fieldset><legend>{t(L('Eine Antwort wählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'))}</legend>
      {check.options.map((option, index) => <label key={index}><input type="radio" name="copd-check" checked={answer === index} onChange={() => setAnswer(index)}/><span>{t(option)}</span></label>)}
    </fieldset>
    {answer !== null && <div role="status" className={styles.feedback}><strong>{t(answer === check.answerIndex ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review the distinction. ', 'این تفاوت را دوباره بررسی کنید. '))}</strong><span>{t(check.feedback[answer])}</span>
      {answer !== check.answerIndex && <button type="button" onClick={() => setAnswer(null)}>{t(L('Erneut versuchen', 'Try again', 'تلاش دوباره'))}</button>}
    </div>}
  </div>
}

function ChapterContent({ chapter, lang }) {
  const t = value => pick(value, lang)
  return <div className={styles.body}>
    <p>{t(chapter.lead)}</p>
    {chapter.rows && <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={t(L('Emphysemmuster im CT', 'Emphysema patterns on CT', 'الگوهای آمفیزم در CT'))}>
      <table><thead><tr><th scope="col">{t(L('Muster', 'Pattern', 'الگو'))}</th><th scope="col">{t(L('Strukturierte Beschreibung', 'Structured description', 'توصیف ساختاریافته'))}</th></tr></thead><tbody>{chapter.rows.map(([label, description], i) => <tr key={i}><th scope="row">{t(label)}</th><td>{t(description)}</td></tr>)}</tbody></table>
    </div>}
    {chapter.id === 'emphysema-patterns' && <figure className={styles.figure}><img src={lesson.heroImage} alt={t(lesson.heroAlt)}/><figcaption>{t(chapter.visualNote)}</figcaption></figure>}
    {chapter.points && <ul className={styles.points}>{chapter.points.map((point, i) => <li key={i}>{t(point)}</li>)}</ul>}
    {chapter.note && <aside className={styles.note}><strong>{t(L('Formulierungsbeispiel', 'Example wording', 'نمونهٔ عبارت‌بندی'))}</strong><p>{t(chapter.note)}</p></aside>}
    {chapter.cave && <aside className={styles.cave}><strong>{t(L('Einordnung', 'Interpretation', 'تفسیر'))}</strong><p>{t(chapter.cave)}</p></aside>}
  </div>
}

export default function CopdImagingPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const path = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const start = L('Was zeigt das CT — und was nicht?', 'What does CT show—and what does it not show?', 'CT چه چیزی را نشان می‌دهد و چه چیزی را نه؟')
  const sectionList = [
    { id: 'start', label: t(start), icon: 'start' },
    ...lesson.chapters.map(chapter => ({ id: chapter.id, label: t(chapter.title), icon: chapter.icon })),
    { id: 'check', label: t(lesson.check.title), icon: 'check' },
    { id: 'take-home', label: t(labels.takeHome), icon: 'summary', emphasis: true },
  ]
  const localizedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))
  const sources = lesson.sources.map(source => ({ title: t(source.title), href: source.href, citation: source.citation, scope: t(source.scope) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar"
    breadcrumbs={[{ label: 'RadYar', href: path('/') }, { label: t(L('Thorax', 'Thorax', 'قفسهٔ سینه')), href: path('/lernen/thorax') }]}
    sections={sectionList} labels={localizedLabels} actions={{
      mcq: { label: localizedLabels.mcq, href: path('/ueben/quiz?fach=thorax&n=1&themen=copd') },
      flashcards: { label: localizedLabels.cards, href: path('/flashcards/copd') },
    }} renderIcon={id => <Icon id={id}/>} theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.heroImage, heroImageOpacity: .8, accent: '#84b5b0', accentStrong: '#286c70', accentSoft: '#e4f2ef', secondary: '#bd8b58', secondaryStrong: '#744d2c', heroBase: '#152b3a' }}
    heroImageAlt={t(lesson.heroAlt)} className={styles.page} syncHashNavigation
    sources={<LessonSources title={t(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'))} items={sources} note={t(lesson.notice)}/>}
  >
    <LessonSection id="start" icon="start" title={t(start)}>
      <div className={styles.body}><p className={styles.intro}>{t(lesson.intro)}</p><p className={styles.scope}>{t(lesson.scope)}</p><p><Link href={path('/thorax/hrct/dichteminderung')} className={styles.related}>{t(L('Verwandt: HRCT-Dichteminderung und Bullae-versus-Zysten-Differenzial', 'Related: HRCT low attenuation and the bulla-versus-cyst differential', 'مرتبط: کاهش دانسیته در HRCT و افتراق بول از کیست'))}</Link></p></div>
    </LessonSection>
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={t(chapter.title)}><ChapterContent chapter={chapter} lang={lang}/></LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)}><Check lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="summary" title={t(labels.takeHome)}><TakeHomeList items={lesson.takeHome.map(item => ({ title: t(item.title), detail: t(item.detail) }))}/></LessonSection>
  </StandardLessonShell>
}
