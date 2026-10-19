'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './BrainTumorLesson.module.css'

const value = (item, lang) => item?.[lang] ?? ''
const L = (de, en, fa) => ({ de, en, fa })
const icons = {
  brain: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5" /></svg>,
  scan: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V4h4m8 0h4v4M20 16v4h-4M8 20H4v-4M7 12h10M12 7v10" /></svg>,
  compare: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4" /></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6" /></svg>,
  summary: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z" /></svg>,
}

function Check({ item, lang }) {
  const [answer, setAnswer] = useState(null)
  return <div className={styles.check}>
    <p>{value(item.question, lang)}</p>
    <div className={styles.options}>{item.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{value(option, lang)}</button>)}</div>
    {answer !== null ? <p role="status" className={styles.feedback}>{value(item.feedback[answer], lang)}</p> : null}
  </div>
}

function CaseFigure({ item, lang }) {
  return <figure className={styles.caseFigure}>
    <p className={styles.scanTask}>{value(item.task, lang)}</p>
    <img src={item.src} alt={value(item.alt, lang)} />
    {item.frames ? <ul className={styles.frameLabels}>{item.frames.map((label, index) => <li key={index}>{value(label, lang)}</li>)}</ul> : null}
    <figcaption>{value(item.caption, lang)}</figcaption>
  </figure>
}

function ComparisonTable({ table, lang }) {
  return <>
    <div className={styles.tableWrap}><table><thead><tr>{table.headers.map((cell, index) => <th key={index} scope="col">{value(cell, lang)}</th>)}</tr></thead>
      <tbody>{table.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row">{value(cell, lang)}</th> : <td key={cellIndex}>{value(cell, lang)}</td>)}</tr>)}</tbody>
    </table></div>
    {table.note ? <aside className={styles.note}><strong>{value(L('Einordnung', 'Interpretation', 'تفسیر'), lang)}</strong><p>{value(table.note, lang)}</p></aside> : null}
  </>
}

export default function BrainTumorLesson({ lesson }) {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const labels = Object.fromEntries(Object.entries(lesson.labels).map(([key, localized]) => [key, value(localized, lang)]))
  const sections = lesson.sections.map(section => ({ ...section, label: value(section.title, lang) }))
  const sources = lesson.sources.map(source => ({ ...source, citation: value(source.citation, lang), scope: value(source.scope, lang) }))
  const path = lesson.path
  const withLang = url => lang === 'de' ? url : `${url}${url.includes('?') ? '&' : '?'}lang=${lang}`

  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={value(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: withLang('/') }, { label: value(L('Gehirn', 'Brain', 'مغز'), lang), href: withLang('/lernen/gehirn') }, { label: value(lesson.title, lang) }]}
    sections={sections} labels={labels} actions={{}} renderIcon={id => icons[id] || icons.scan}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .9, accent: '#48b5c8', accentStrong: '#155d70', accentSoft: '#e0f4f6', secondary: '#d18b53', secondaryStrong: '#704325', heroBase: '#102535' }}
    className={styles.page} heroImageAlt={value(lesson.heroAlt, lang)} syncHashNavigation
    sources={<LessonSources title={labels.sources} items={sources} note={value(lesson.sourcesNote, lang)} />}>
    <div lang={lang} dir={rtl ? 'rtl' : 'ltr'}>
      {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} title={value(section.title, lang)} icon={section.icon}>
        {section.paragraphs?.map((paragraph, index) => <p key={index}>{value(paragraph, lang)}</p>)}
        {section.callout ? <aside className={styles.note}><strong>{value(L('Hinweis', 'Note', 'نکته'), lang)}</strong><p>{value(section.callout, lang)}</p></aside> : null}
        {section.image ? <CaseFigure item={section.image} lang={lang} /> : null}
        {section.table ? <ComparisonTable table={section.table} lang={lang} /> : null}
        {section.check ? <Check item={section.check} lang={lang} /> : null}
        {section.takeaways ? <TakeHomeList items={section.takeaways.map((item, index) => ({ title: value(L(`Regel ${index + 1}`, `Rule ${index + 1}`, `قاعدهٔ ${index + 1}`), lang), detail: value(item, lang) }))} /> : null}
      </LessonSection>)}
    </div>
  </StandardLessonShell>
}
