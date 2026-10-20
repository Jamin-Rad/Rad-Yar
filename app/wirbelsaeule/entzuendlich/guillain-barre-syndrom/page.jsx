'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { GUILLAIN_BARRE_SPINE_LESSON as lesson } from '@/data/guillainBarreSpineLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
const LABELS = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'),
  sources: L('Quelle und Umfang', 'Sources and scope', 'منابع و دامنه'),
  choose: L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'),
  takeHome: L('Drei Regeln merken', 'Three rules to remember', 'سه نکته برای یادآوری'),
}

function Icon({ id }) {
  const paths = {
    start: 'M12 3v18M3 12h18', decision: 'M12 3v5m0 4v9M5 8h14M5 16h14',
    imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7', caveat: 'M12 3 2.8 20h18.4L12 3Zm0 6v5m0 3h.01',
    check: 'M4 12h16', summary: 'M5 5h14M5 12h14M5 19h14',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.imaging}/></svg>
}

function Key({ lang }) {
  const items = [
    L('1 · Klinischer Kontext', '1 · Clinical context', '۱ · زمینه بالینی'),
    L('2 · MRT bei atypischer/unklarer Präsentation', '2 · MRI in atypical/uncertain presentations', '۲ · MRI در تظاهر غیرمعمول یا نامطمئن'),
    L('3 · Anreicherung unterstützt; normal schließt nicht aus', '3 · Enhancement is supportive; normal MRI does not exclude', '۳ · افزایش سیگنال حمایتی است؛ MRI طبیعی بیماری را رد نمی‌کند'),
  ]
  return <ol className={styles.key}>{items.map((item, index) => <li key={index}>{pick(item, lang)}</li>)}</ol>
}

function FeatureTable({ rows, lang }) {
  return <div className={styles.tableWrap}><table><thead><tr>
    <th scope="col">{pick(L('Sequenz / Situation', 'Sequence / situation', 'توالی / وضعیت'), lang)}</th>
    <th scope="col">{pick(L('Befund und Einordnung', 'Finding and interpretation', 'یافته و تفسیر'), lang)}</th>
  </tr></thead><tbody>{rows.map(([term, detail], index) => <tr key={index}><th scope="row">{pick(term, lang)}</th><td>{pick(detail, lang)}</td></tr>)}</tbody></table></div>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const correct = answer === lesson.check.answerIndex
  return <div className={styles.decision}><h3>{pick(lesson.check.title, lang)}</h3><p>{pick(lesson.check.prompt, lang)}</p>
    <fieldset><legend>{pick(LABELS.choose, lang)}:</legend>{lesson.check.options.map((option, index) => <label key={index}>
      <input type="radio" name="gbs-mri-check" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span>
    </label>)}</fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Die Einordnung: ', 'Interpretation: ', 'تفسیر: ') : L('Prüfe die Aussagegrenze: ', 'Review the diagnostic limit: ', 'محدودیت تشخیصی را دوباره بررسی کنید: '), lang)}</strong>{pick(lesson.check.feedback, lang)}</p> : null}
  </div>
}

export default function GuillainBarreSpinePage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const localized = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const labels = { contents: t(LABELS.contents), takeHome: t(LABELS.takeHome) }
  const sections = [
    { id: 'start', label: t(lesson.intro.title), icon: 'start' },
    ...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })),
    { id: 'check', label: t(lesson.check.title), icon: 'check' },
    { id: 'take-home', label: labels.takeHome, icon: 'summary', emphasis: true },
  ]
  const references = lesson.references.map(reference => ({ tag: reference.tag, title: t(reference.title), href: reference.href, citation: t(reference.citation) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" heroImageAlt={t(lesson.alt)} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: localized('/') }, { label: t(L('Wirbelsäule', 'Spine', 'ستون فقرات')), href: localized('/lernen/wirbelsaeule') }, { label: t(lesson.title) }]}
    sections={sections} labels={labels} actions={{}} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .95, accent: '#81bfca', accentStrong: '#255e69', accentSoft: '#e4f1f3', secondary: '#a34d7b', secondaryStrong: '#713450', heroBase: '#18333d' }}
    className={styles.page} sources={<LessonSources title={t(LABELS.sources)} items={references} note={t(lesson.scope)}/>}
  >
    <LessonSection id="start" icon="start" title={t(lesson.intro.title)} bodyClassName={styles.body}>
      <p>{t(lesson.intro.text)}</p>
      <Key lang={lang}/>
      <aside className={styles.note}>{t(lesson.scope)}</aside>
    </LessonSection>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}>
      <p>{t(section.lead)}</p>
      <FeatureTable rows={section.rows} lang={lang}/>
      {section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}
    </LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><SelfCheck lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="summary" title={labels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
