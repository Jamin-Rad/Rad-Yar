'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { PROXIMALE_FEMURFRAKTUR_LESSON as lesson } from '@/data/proximaleFemurfrakturLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''
const labels = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری'), completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'), complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه قاعده برای یادآوری'), sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
  feature: L('Merkmal', 'Feature', 'ویژگی'), interpretation: L('Einordnung', 'Interpretation', 'تفسیر'), choose: L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'),
  quiz: L('Fragen zur proximalen Femurfraktur', 'Proximal femur questions', 'پرسش‌های شکستگی پروگزیمال فمور'), cards: L('Lernkarten zur proximalen Femurfraktur', 'Proximal femur flashcards', 'فلش‌کارت‌های شکستگی پروگزیمال فمور'),
}
const icons = { clinical: 'M12 3v18M5 8h14M7 16h10', imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7', differential: 'M12 3v5m0 4v9M5 8h14M5 16h14', check: 'M4 4h16v16H4zM8 9h8m-8 4h5', summary: 'M5 5h14M5 12h14M5 19h14' }
function Icon({ id }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[id] || icons.clinical} /></svg> }

function Table({ rows, lang, columns = 2, headers }) {
  const columnLabels = headers || (columns === 3 ? [labels.feature, L('Winkel', 'Angle', 'زاویه'), labels.interpretation] : [labels.feature, labels.interpretation])
  return <div className={styles.tableWrap}><table><thead><tr>{columnLabels.map((label, index) => <th scope="col" key={index}>{pick(label, lang)}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, column) => <td key={column}>{pick(cell, lang)}</td>)}</tr>)}</tbody></table></div>
}

function SelfCheck({ lang, check = lesson.check, name = 'proximal-femur-check' }) {
  const [answer, setAnswer] = useState(null)
  const correct = answer === check.answer
  return <div className={styles.decision}>
    <h3>{pick(check.title, lang)}</h3><p>{pick(check.prompt, lang)}</p>
    <fieldset><legend>{pick(labels.choose, lang)}</legend>{check.options.map((option, index) => <label key={index}><input type="radio" name={name} checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}</fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(correct ? check.explanation : check.retry, lang)}</p> : null}
  </div>
}

export default function ProximaleFemurfrakturPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const translatedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))
  const languagePath = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })), { id: 'take-home', label: translatedLabels.takeHome, icon: 'summary', emphasis: true }]
  const references = lesson.references.map(reference => ({ ...reference, title: t(reference.title), citation: typeof reference.citation === 'string' ? reference.citation : t(reference.citation) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    heroImageAlt={t(L('Schematische proximale Femurform mit markierten Frakturlinien; kein Patientenbild.', 'Schematic proximal femur with fracture lines; not a patient image.', 'نمای شماتیک فمور پروگزیمال با خطوط شکستگی؛ تصویر بیمار نیست.'))}
    breadcrumbs={[{ label: 'RadYar', href: languagePath('/') }, { label: 'MSK', href: languagePath('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={translatedLabels} actions={{ mcq: { label: translatedLabels.quiz, href: languagePath('/ueben/quiz?fach=msk&n=8&themen=proximale-femurfraktur') }, flashcards: { label: translatedLabels.cards, href: languagePath('/flashcards/proximale-femurfraktur') } }} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .94, accent: '#d49a61', accentStrong: '#79502d', accentSoft: '#f2e9de', secondary: '#8ab9a7', secondaryStrong: '#286451', heroBase: '#18342e' }}
    className={styles.page} sources={<LessonSources title={translatedLabels.sources} items={references} note={t(lesson.sourceNote)} />}>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}>
      <p className={styles.lead}>{t(section.lead)}</p>
      {section.image ? <figure className={styles.visual}><img src={section.image} alt={t(section.imageAlt)} loading="lazy" /><figcaption>{t(section.imageCaption)}</figcaption>{section.imageLegend ? <ul>{section.imageLegend.map(item => <li key={pick(item, lang)}>{t(item)}</li>)}</ul> : null}</figure> : null}
      {section.rows ? <Table rows={section.rows} lang={lang} headers={section.headers} /> : null}
      {section.subTables?.map((table, index) => <div key={index} className={styles.subTable}><h3>{t(table.title)}</h3><Table rows={table.rows} lang={lang} columns={table.rows[0].length} /></div>)}
      {section.visuals?.map(visual => <figure className={styles.visual} key={visual.src}><img src={visual.src} alt={t(visual.alt)} loading="lazy" /><figcaption>{t(visual.caption)}</figcaption></figure>)}
      {section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}
      {section.id === 'classifications' ? <SelfCheck lang={lang} /> : null}
      {section.id === 'imaging' ? <SelfCheck lang={lang} check={lesson.imagingCheck} name="proximal-femur-imaging-check" /> : null}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={translatedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map(item => <li key={pick(item, lang)}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
