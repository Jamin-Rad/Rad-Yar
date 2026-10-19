'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { INTRAOSSEOUS_GANGLION_LESSON as lesson } from '@/data/mskIntraosseousGanglionLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''
const labels = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'), continue: L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'), lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه نکته برای یادآوری'), sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'), check: L('Selbstcheck', 'Self-check', 'خودآزمایی'),
}
const iconPaths = { clinical: 'M12 3v18M5 8h14M7 16h10', imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7', differential: 'M12 3v5m0 4v9M5 8h14M5 16h14', check: 'M4 4h16v16H4zM8 9h8m-8 4h5', summary: 'M5 5h14M5 12h14M5 19h14' }
function Icon({ id }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[id] || iconPaths.imaging} /></svg> }
function Matrix({ rows, lang }) {
  const t = value => pick(value, lang)
  return <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={t(L('Merkmalsübersicht', 'Feature overview', 'نمای کلی ویژگی‌ها'))}>
    <table><caption>{t(L('Muster laut Kursquelle', 'Pattern in the course source', 'الگو بر اساس منبع آموزشی'))}</caption><thead><tr><th scope="col">{t(L('Merkmal', 'Feature', 'ویژگی'))}</th><th scope="col">{t(L('Beschreibung', 'Description', 'توصیف'))}</th></tr></thead><tbody>{rows.map(([name, detail], i) => <tr key={i}><th scope="row">{t(name)}</th><td>{t(detail)}</td></tr>)}</tbody></table>
  </div>
}
function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null); const item = lesson.check; const t = value => pick(value, lang)
  return <div className={styles.decision}><h3>{t(item.title)}</h3><p>{t(item.prompt)}</p><fieldset><legend>{t(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'))}</legend>{item.options.map((option, i) => <label key={i}><input type="radio" name="intraosseous-ganglion-check" checked={answer === i} onChange={() => setAnswer(i)} /><span>{t(option)}</span></label>)}</fieldset>{answer !== null ? <p className={styles.feedback} role="status"><strong>{t(answer === item.answer ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '))}</strong>{t(answer === item.answer ? item.explanation : item.retry)}</p> : null}</div>
}
export default function IntraosseousGanglionPage() {
  const { lang } = useLanguage(); const t = value => pick(value, lang)
  const translated = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))
  const langPath = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })), { id: 'check', label: translated.check, icon: 'check' }, { id: 'take-home', label: translated.takeHome, icon: 'summary', emphasis: true }]
  const refs = lesson.references.map(reference => ({ ...reference, title: t(reference.title), citation: t(reference.citation) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    heroImageAlt={t(L('Nichtdiagnostische Orientierungsskizze einer gelenknahen, flüssigkeitsgefüllten Knochenläsion.', 'Non-diagnostic orientation schematic of a fluid-filled bone lesion near a joint.', 'شماتیک جهت‌یابی غیردیاگنوستیک از ضایعه‌ای استخوانی و مایع‌دار نزدیک مفصل.'))}
    breadcrumbs={[{ label: 'RadYar', href: langPath('/') }, { label: 'MSK', href: langPath('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={translated} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .96, accent: '#7f9ca8', accentStrong: '#355b69', accentSoft: '#e7f0f2', secondary: '#c49e70', secondaryStrong: '#765a36', heroBase: '#203640' }} className={styles.page}
    sources={<LessonSources title={translated.sources} items={refs} note={t(lesson.sourceNote)} />}>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}><p>{t(section.lead)}</p><Matrix rows={section.rows} lang={lang}/>{section.imageAlt ? <figure className={styles.schematic}><img src={section.image ?? lesson.hero} alt={t(section.imageAlt)} /><figcaption>{t(section.imageCaption)}</figcaption></figure> : null}{section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}</LessonSection>)}
    <LessonSection id="check" icon="check" title={translated.check} bodyClassName={styles.body}><SelfCheck lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="summary" title={translated.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, i) => <li key={i}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
