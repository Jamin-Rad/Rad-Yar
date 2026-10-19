'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { OSTEOM_LESSON as lesson } from '@/data/osteomLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''

function Icon({ id }) {
  const paths = {
    pattern: 'M4 18h16M6 15l3-5 3 3 5-8 2 3', imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7',
    context: 'M12 3v5m0 4v9M5 8h14M5 16h14', compare: 'M5 5h14M5 12h14M5 19h14', check: 'm4 12 5 5L20 6', summary: 'M5 5h14M5 12h14M5 19h14',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern} /></svg>
}

function Table({ rows, lang, caption }) {
  const t = value => pick(value, lang)
  return <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={t(L('Vergleichstabelle', 'Comparison table', 'جدول مقایسه'))}>
    <table><caption>{t(caption)}</caption><thead><tr><th scope="col">{t(L('Merkmal', 'Feature', 'ویژگی'))}</th><th scope="col">{t(L('Befund und Einordnung', 'Finding and interpretation', 'یافته و تفسیر'))}</th></tr></thead>
      <tbody>{rows.map(([name, detail], index) => <tr key={index}><th scope="row">{t(name)}</th><td>{t(detail)}</td></tr>)}</tbody>
    </table>
  </div>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const t = value => pick(value, lang)
  const check = lesson.check
  return <div className={styles.check}>
    <h3>{t(check.title)}</h3><p>{t(check.prompt)}</p>
    <fieldset><legend>{t(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ انتخاب کن'))}</legend>
      {check.options.map((option, index) => <label key={index}><input type="radio" name="osteom-check" checked={answer === index} onChange={() => setAnswer(index)} /><span>{t(option)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{answer === check.answer ? t(L('Richtig. ', 'Correct. ', 'درست است. ')) : t(L('Noch einmal prüfen. ', 'Review the pattern. ', 'الگو را دوباره بررسی کن. '))}</strong>{t(answer === check.answer ? check.feedbackCorrect : check.feedbackIncorrect)}</p> : null}
  </div>
}

export default function OsteomPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const labels = {
    path: t(L('Lernweg', 'Learning path', 'مسیر یادگیری')), progress: t(L('gelesen', 'read', 'خوانده‌شده')),
    continue: t(L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری')),
    completeLesson: t(L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده')),
    lessonCompleted: t(L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد')),
    complete: t(L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم')),
    completed: t(L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده')), open: t(L('Abschnitt öffnen', 'Open section', 'بازکردن بخش')),
    close: t(L('Schließen', 'Close', 'بستن')), takeHome: t(L('Vier Regeln mitnehmen', 'Four rules to remember', 'چهار قاعده برای یادآوری')),
    sources: t(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه')),
  }
  const sections = [...lesson.sections.map(({ id, title, icon }) => ({ id, label: t(title), icon })), { id: 'check', label: t(lesson.check.title), icon: 'check' }, { id: 'take-home', label: labels.takeHome, icon: 'summary', emphasis: true }]
  const sourceItems = lesson.sources.map(item => ({ ...item, tag: t(item.tag), title: t(item.title), citation: t(item.citation) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar"
    heroImageAlt={t(L('Nichtdiagnostische Schemazeichnung eines dichten Osteoms an der Wand einer Nasennebenhöhle.', 'Non-diagnostic schematic of a dense osteoma along a paranasal sinus wall.', 'شماتیک غیرتشخیصی استئوم متراکم در دیوارهٔ سینوس پارانازال.'))}
    syncHashNavigation breadcrumbs={[{ label: 'RadYar', href: lang === 'de' ? '/' : `/?lang=${lang}` }, { label: 'MSK', href: lang === 'de' ? '/lernen/msk' : `/lernen/msk?lang=${lang}` }, { label: t(lesson.title) }]}
    sections={sections} labels={labels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .96, accent: '#8fb9c7', accentStrong: '#315f70', accentSoft: '#e6f0f2', secondary: '#d7a06b', secondaryStrong: '#80522b', heroBase: '#203746' }}
    className={styles.page} sources={<LessonSources title={labels.sources} items={sourceItems} note={t(lesson.sourceNote)} />}>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}>
      <p>{t(section.lead)}</p>
      {section.points ? <ul className={styles.points}>{section.points.map((point, index) => <li key={index}>{t(point)}</li>)}</ul> : null}
      {section.rows ? <Table rows={section.rows} lang={lang} caption={section.id === 'modalities' ? L('Rolle der Modalität', 'Role of each modality', 'نقش هر روش تصویربرداری') : L('Muster und Abgrenzung', 'Pattern and distinction', 'الگو و افتراق')} /> : null}
      {section.id === 'modalities' ? <figure className={styles.caseFigure}><img src="/educational/osteom-pdf-case.png" alt={t(section.imageAlt)} width="785" height="495" loading="lazy" /><figcaption>{t(section.imageCaption)}</figcaption></figure> : null}
      {section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}
    </LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="summary" title={labels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
