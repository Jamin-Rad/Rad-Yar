'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { MSK_OSTEOMYELITIS_LESSON as lesson } from '@/data/mskOsteomyelitisLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] ?? value?.de ?? value

const LABELS = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiterlernen', 'Continue learning', 'ادامه یادگیری'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'),
  close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Die wichtigsten Regeln', 'Key takeaways', 'نکات کلیدی'),
  sourceTitle: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
}

function Icon({ id }) {
  const paths = { periosteum: 'M3 16c4-10 14-10 18 0M5 19c3-7 11-7 14 0', brodie: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8', scope: 'M4 12h15m-6-6 6 6-6 6', takeHome: 'M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z', case: 'M4 4h16v16H4zM8 9h8m-8 4h5' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.scope} /></svg>
}

function PatternTable({ chapter, lang }) {
  return <div className={styles.tableWrap}><table><caption>{pick(L('Muster und diagnostische Grenze', 'Pattern and diagnostic limitation', 'الگو و محدودیت تشخیصی'), lang)}</caption><thead><tr><th scope="col">{pick(L('Zeichen', 'Feature', 'نشانه'), lang)}</th><th scope="col">{pick(L('Einordnung', 'Interpretation', 'تفسیر'), lang)}</th></tr></thead><tbody>{chapter.rows.map(([term, detail], index) => <tr key={index}><th scope="row">{pick(term, lang)}</th><td>{pick(detail, lang)}</td></tr>)}</tbody></table></div>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const question = lesson.case
  const correct = answer === question.answerIndex
  return <div className={styles.decision}>
    <h3>{pick(question.title, lang)}</h3>
    <p>{pick(question.prompt, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{question.options.map((option, index) => <label key={index}><input type="radio" name="msk-osteomyelitis-case" checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}</fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(correct ? question.feedbackCorrect : question.feedbackIncorrect, lang)}</p> : null}
  </div>
}

export default function OsteomyelitisPage() {
  const { lang } = useLanguage()
  const labels = Object.fromEntries(Object.entries(LABELS).map(([key, value]) => [key, pick(value, lang)]))
  const sections = [
    ...lesson.chapters.map(chapter => ({ id: chapter.id, label: pick(chapter.title, lang), icon: chapter.icon })),
    { id: 'case', label: pick(lesson.case.title, lang), icon: 'case' },
    { id: 'take-home', label: labels.takeHome, icon: 'takeHome' },
  ]
  const langHref = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sources = [
    { tag: pick(L('Leitlinie', 'Guideline', 'راهنما'), lang), title: pick(lesson.references[0].label, lang), href: lesson.references[0].url, citation: 'J Pediatric Infect Dis Soc. 2021;10(8):801–844. DOI: 10.1093/jpids/piab027.', scope: pick(L('Empfehlung II.1–2, pädiatrische akute hämatogene Osteomyelitis.', 'Recommendations II.1–2, paediatric acute haematogenous osteomyelitis.', 'توصیه‌های II.1–2، استئومیلیت حاد هماتوژن کودکان.'), lang) },
    { tag: 'Radiology', title: pick(lesson.references[1].label, lang), href: lesson.references[1].url, citation: 'Radiology. 1979;132(1):15–23. PMID: 451190.', scope: pick(L('Fallserie (25 Fälle); stützt die Variabilitätscaveat, nicht jede hier genannte Einzelmorphologie.', 'Case series (25 cases); supports the variability caveat, not every individual morphology stated here.', 'مجموعه ۲۵ موردی؛ از هشدار تنوع ظاهر پشتیبانی می‌کند، نه تک‌تک مورفولوژی‌های این درس.'), lang) },
  ]

  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="RadYar"
    heroImageAlt={pick(lesson.alt, lang)} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: 'MSK', href: langHref('/lernen/msk') }, { label: pick(lesson.title, lang) }]}
    sections={sections} labels={labels} actions={{}}
    renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.heroImage, heroImageOpacity: .85, accent: '#8ab9a7', accentStrong: '#286451', accentSoft: '#e8f2ed', secondary: '#d19b64', secondaryStrong: '#815124', heroBase: '#18342e' }}
    className={styles.page}
    sources={<LessonSources title={labels.sourceTitle} items={sources} note={pick(lesson.notice, lang)} />}
  >
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={pick(chapter.title, lang)} bodyClassName={styles.body}>
      <p>{pick(chapter.lead, lang)}</p>
      <PatternTable chapter={chapter} lang={lang} />
      <p className={styles.note}>{pick(chapter.note, lang)}</p>
    </LessonSection>)}
    <LessonSection id="case" icon="case" title={pick(lesson.case.title, lang)} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="takeHome" title={labels.takeHome} bodyClassName={styles.body}><ol className={styles.rules}>{pick(lesson.takeHome, lang).map((rule, index) => <li key={index}>{rule}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
