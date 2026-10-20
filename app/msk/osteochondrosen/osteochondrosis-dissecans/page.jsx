'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { OSTEOCHONDROSIS_DISSECANS_LESSON as lesson } from '@/data/osteochondrosisDissecansLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''
const labels = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiterlernen', 'Continue learning', 'ادامه یادگیری'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'),
  close: L('Schließen', 'Close', 'بستن'), takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه قاعده برای یادآوری'),
  sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
}

function Icon({ id }) {
  const paths = { clinical: 'M12 3v18M5 8h14M7 16h10', imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7', differential: 'M12 3v5m0 4v9M5 8h14M5 16h14', check: 'M4 4h16v16H4zM8 9h8m-8 4h5', summary: 'M5 5h14M5 12h14M5 19h14' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.imaging} /></svg>
}

function Matrix({ rows, lang, caption }) {
  return <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={pick(caption, lang)}><table>
    <caption>{pick(caption, lang)}</caption>
    <thead><tr><th scope="col">{pick(L('Merkmal', 'Feature', 'ویژگی'), lang)}</th><th scope="col">{pick(L('Einordnung', 'Interpretation', 'تفسیر'), lang)}</th></tr></thead>
    <tbody>{rows.map(([term, detail], index) => <tr key={index}><th scope="row">{pick(term, lang)}</th><td>{pick(detail, lang)}</td></tr>)}</tbody>
  </table></div>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const check = lesson.check
  const correct = answer === check.answer
  return <div className={styles.decision}><h3>{pick(check.title, lang)}</h3><p>{pick(check.prompt, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کن'), lang)}</legend>
      {check.options.map((option, index) => <label key={index}><input type="radio" name="osteochondrosis-dissecans-retrieval" checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کن. '), lang)}</strong>{pick(correct ? check.explanation : check.retry, lang)}</p> : null}
  </div>
}

export default function OsteochondrosisDissecansPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const translatedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))
  const languagePath = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })), { id: 'check', label: t(lesson.check.title), icon: 'check' }, { id: 'take-home', label: translatedLabels.takeHome, icon: 'summary', emphasis: true }]
  const references = lesson.references.map(reference => ({ ...reference, title: t(reference.title), citation: reference.citation && (typeof reference.citation === 'string' ? reference.citation : t(reference.citation)) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    heroImageAlt={t(L('Nichtdiagnostisches Schema einer subchondralen Läsion mit abgegrenztem osteochondralem Fragment.', 'Non-diagnostic schematic of a subchondral lesion with a demarcated osteochondral fragment.', 'شماتیک غیرتشخیصی ضایعهٔ زیرغضروفی با قطعهٔ استئوکندرال مرزبندی‌شده'))}
    breadcrumbs={[{ label: 'RadYar', href: languagePath('/') }, { label: 'MSK', href: languagePath('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={translatedLabels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .94, accent: '#67bdb1', accentStrong: '#245e58', accentSoft: '#e5f2ee', secondary: '#d49a61', secondaryStrong: '#79502d', heroBase: '#18322f' }}
    className={styles.page} sources={<LessonSources title={translatedLabels.sources} items={references} note={t(lesson.sourceNote)} />}>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}>
      <p>{t(section.lead)}</p>
      {section.rows ? <Matrix rows={section.rows} lang={lang} caption={L('Befund und Einordnung', 'Finding and interpretation', 'یافته و تفسیر')} /> : null}
      {section.image ? <figure className={styles.caseImage}><img src={section.image} alt={t(section.imageAlt)} loading="lazy" /><figcaption>{t(section.imageCaption)}</figcaption></figure> : null}
      {section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}
    </LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="summary" title={translatedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
