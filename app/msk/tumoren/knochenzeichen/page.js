'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { MSK_BONE_AGGRESSIVENESS_LESSON as lesson } from '@/data/mskBoneAggressiveness'
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
  close: L('Schließen', 'Close', 'بستن'), takeHome: L('Die wichtigsten Regeln', 'Key takeaways', 'نکات کلیدی'),
}

function Icon({ id }) {
  const paths = { periosteum: 'M3 16c4-10 14-10 18 0M5 19c3-7 11-7 14 0', matrix: 'M4 5h16M4 12h16M4 19h16', lodwick: 'M4 4h16v16H4zM8 8h8v8H8z', case: 'M4 4h16v16H4zM8 9h8m-8 4h5', takeHome: 'M5 5h14M5 12h14M5 19h14' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.matrix}/></svg>
}

function PatternTable({ rows, lang, title }) {
  return <div className={styles.tableWrap}><table><caption>{pick(title || L('Muster und diagnostische Grenze', 'Pattern and diagnostic limitation', 'الگو و محدودیت تشخیصی'), lang)}</caption><thead><tr><th scope="col">{pick(L('Zeichen', 'Feature', 'یافته'), lang)}</th><th scope="col">{pick(L('Einordnung', 'Interpretation', 'تفسیر'), lang)}</th></tr></thead><tbody>{rows.map(([term, detail], index) => <tr key={index}><th scope="row">{pick(term, lang)}</th><td>{pick(detail, lang)}</td></tr>)}</tbody></table></div>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const question = lesson.case
  const correct = answer === question.answerIndex
  return <div className={styles.decision}><h3>{pick(question.title, lang)}</h3><p>{pick(question.prompt, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{question.options.map((option, index) => <label key={index}><input type="radio" name="msk-bone-pattern-check" checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}</fieldset>
    {answer !== null && <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(correct ? question.feedbackCorrect : question.feedbackIncorrect, lang)}</p>}
  </div>
}

export default function BoneAggressivenessPage() {
  const { lang } = useLanguage()
  const localized = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const translatedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, pick(value, lang)]))
  const sections = [...lesson.chapters.map(chapter => ({ id: chapter.id, label: pick(chapter.title, lang), icon: chapter.icon })), { id: 'case', label: pick(lesson.case.title, lang), icon: 'case' }, { id: 'take-home', label: translatedLabels.takeHome, icon: 'takeHome', emphasis: true }]
  const sources = lesson.references.map((source, index) => ({ tag: index === 0 ? 'Radiology · 1980' : index === 1 ? 'Skeletal Radiol · 2022' : 'Radiology · 1969', title: pick(source.label, lang), href: source.url }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="RadYar" heroImageAlt={pick(lesson.alt, lang)} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: localized('/') }, { label: 'MSK', href: localized('/lernen/msk') }, { label: pick(lesson.title, lang) }]}
    sections={sections} labels={translatedLabels} actions={{}} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.heroImage, heroImageOpacity: .8, accent: '#8ab9a7', accentStrong: '#286451', accentSoft: '#e8f2ed', secondary: '#d19b64', secondaryStrong: '#815124', heroBase: '#18342e' }}
    className={styles.page} sources={<LessonSources title={pick(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'), lang)} items={sources} note={pick(lesson.notice, lang)}/>}
  >
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.id} title={pick(chapter.title, lang)} bodyClassName={styles.body}>
      <p>{pick(chapter.lead, lang)}</p><PatternTable rows={chapter.rows} lang={lang}/>
      {chapter.extraRows && <><h3>{pick(chapter.subheading, lang)}</h3><PatternTable rows={chapter.extraRows} lang={lang} title={L('Zusätzliche Merkmale', 'Additional features', 'یافته‌های تکمیلی')}/></>}
      <p className={styles.note}>{pick(chapter.note, lang)}</p>
    </LessonSection>)}
    <LessonSection id="case" icon="case" title={pick(lesson.case.title, lang)} bodyClassName={styles.body}><SelfCheck lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="takeHome" title={translatedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.rules}>{lesson.takeHome.map((rule, index) => <li key={index}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
