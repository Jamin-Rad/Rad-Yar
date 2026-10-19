'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { MSK_FIBROESE_DYSPLASIE_LESSON as lesson } from '@/data/mskFibroeseDysplasieLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''
const labels = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری'), completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'), lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Vier Regeln mitnehmen', 'Four rules to remember', 'چهار نکته برای یادآوری'), sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
}
const icons = { clinical: 'M12 3v18M5 8h14M7 16h10', imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7', differential: 'M12 3v5m0 4v9M5 8h14M5 16h14', check: 'M4 4h16v16H4zM8 9h8m-8 4h5', summary: 'M5 5h14M5 12h14M5 19h14' }
function Icon({ id }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[id] || icons.imaging} /></svg> }
function Matrix({ rows, lang }) { return <div className={styles.tableWrap}><table><caption>{pick(L('Befund und Einordnung', 'Finding and interpretation', 'یافته و تفسیر'), lang)}</caption><thead><tr><th scope="col">{pick(L('Merkmal', 'Feature', 'ویژگی'), lang)}</th><th scope="col">{pick(L('Muster', 'Pattern', 'الگو'), lang)}</th></tr></thead><tbody>{rows.map(([a, b], i) => <tr key={i}><th scope="row">{pick(a, lang)}</th><td>{pick(b, lang)}</td></tr>)}</tbody></table></div> }
function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const c = lesson.check
  return <div className={styles.decision}><h3>{pick(c.title, lang)}</h3><p>{pick(c.prompt, lang)}</p><fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{c.options.map((option, i) => <label key={i}><input type="radio" name="fd-retrieval" checked={answer === i} onChange={() => setAnswer(i)} /><span>{pick(option, lang)}</span></label>)}</fieldset>{answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(answer === c.answer ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید.'), lang)}</strong>{pick(answer === c.answer ? c.explanation : c.retry, lang)}</p> : null}</div>
}

export default function FibroeseDysplasiePage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const translatedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))
  const languagePath = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })), { id: 'check', label: t(lesson.check.title), icon: 'check' }, { id: 'take-home', label: translatedLabels.takeHome, icon: 'summary', emphasis: true }]
  const references = lesson.references.map(reference => ({ ...reference, title: t(reference.title), citation: typeof reference.citation === 'string' ? reference.citation : t(reference.citation) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    heroImageAlt={t(L('Schematische Langknochenläsion mit Milchglasmatrix; keine diagnostische Aufnahme.', 'Schematic long-bone lesion with a ground-glass matrix; not a diagnostic image.', 'شماتیک ضایعه‌ای در استخوان بلند با ماتریکس شیشه‌مات؛ تصویر تشخیصی نیست.'))}
    breadcrumbs={[{ label: 'RadYar', href: languagePath('/') }, { label: 'MSK', href: languagePath('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={translatedLabels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .94, accent: '#d49a61', accentStrong: '#79502d', accentSoft: '#f2e9de', secondary: '#8ab9a7', secondaryStrong: '#286451', heroBase: '#18342e' }} className={styles.page}
    sources={<LessonSources title={translatedLabels.sources} items={references} note={t(lesson.sourceNote)} />}>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}><p>{t(section.lead)}</p>{section.rows ? <Matrix rows={section.rows} lang={lang} /> : null}{section.image ? <figure className={styles.caseImage}><img src={section.image} alt={t(section.imageAlt)} loading="lazy" /><figcaption>{t(section.imageCaption)}</figcaption></figure> : null}{section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}{section.warning ? <aside className={styles.warning}>{t(section.warning)}</aside> : null}</LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="summary" title={translatedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
