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

function LodwickSchematic({ lang }) {
  const labelsByLang = {
    de: { title: 'Schematische Muster der Osteolyse', geographic: 'Geographisch · I', moth: 'Mottenfraß · II', permeative: 'Permeativ · III', caption: 'Konzeptzeichnung nach MSK.pdf, S. 76; keine Röntgenaufnahme und keine eigenständige Diagnose.' },
    en: { title: 'Schematic osteolysis patterns', geographic: 'Geographic · I', moth: 'Moth-eaten · II', permeative: 'Permeative · III', caption: 'Conceptual drawing based on MSK.pdf, p. 76; not a radiograph or a diagnosis.' },
    fa: { title: 'الگوهای شماتیک استئولیز', geographic: 'جغرافیایی · I', moth: 'بیدخورده · II', permeative: 'نفوذی · III', caption: 'طرح مفهومی بر پایهٔ MSK.pdf، صفحهٔ ۷۶؛ رادیوگرافی یا تشخیص نیست.' },
  }
  const t = labelsByLang[lang] || labelsByLang.de
  return <figure className={styles.lodwickFigure}>
    <div className={styles.lodwickScroll} role="region" tabIndex="0" aria-label={t.title}>
    <svg viewBox="0 0 900 230" role="img" aria-labelledby="lodwick-title lodwick-desc">
      <title id="lodwick-title">{t.title}</title><desc id="lodwick-desc">{t.caption}</desc>
      {[90, 390, 690].map((x, i) => <g key={x}>
        <rect x={x} y="24" width="180" height="140" rx="20" fill="#edf4f1" stroke="#58756a" strokeWidth="5" />
        {i === 0 && <><ellipse cx={x + 90} cy="94" rx="38" ry="27" fill="#f0a26a" stroke="#a9512b" strokeWidth="3"/><ellipse cx={x + 90} cy="94" rx="48" ry="37" fill="none" stroke="#718c7d" strokeWidth="4"/></>}
        {i === 1 && <><circle cx={x + 57} cy="72" r="13" fill="#f0a26a"/><circle cx={x + 114} cy="63" r="10" fill="#f0a26a"/><circle cx={x + 91} cy="105" r="15" fill="#f0a26a"/><circle cx={x + 137} cy="113" r="11" fill="#f0a26a"/><circle cx={x + 50} cy="124" r="8" fill="#f0a26a"/></>}
        {i === 2 && <><path d={`M${x+42} 48l18 14-13 12 19 11-16 15 18 10-12 19`} fill="none" stroke="#b84d32" strokeWidth="8" strokeLinecap="round"/><path d={`M${x+105} 43l-12 18 14 12-17 16 13 13-16 15 11 17`} fill="none" stroke="#b84d32" strokeWidth="7" strokeLinecap="round"/><path d={`M${x+65} 94h13m25-30v16m21 40h12`} stroke="#b84d32" strokeWidth="6" strokeLinecap="round"/></>}
        <text x={x + 90} y="202" textAnchor="middle" direction={lang === 'fa' ? 'rtl' : 'ltr'} unicodeBidi="plaintext" className={styles.lodwickLabel}>{[t.geographic, t.moth, t.permeative][i]}</text>
      </g>)}
    </svg>
    </div>
    <figcaption>{t.caption}</figcaption>
  </figure>
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
  const sources = lesson.references.map(source => ({ tag: pick(source.tag, lang), title: pick(source.label, lang), href: source.url }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="RadYar" heroImageAlt={pick(lesson.alt, lang)} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: localized('/') }, { label: 'MSK', href: localized('/lernen/msk') }, { label: pick(lesson.title, lang) }]}
    sections={sections} labels={translatedLabels} actions={{ mcq: { label: pick(L('Frage zum Quellenbeispiel', 'Question on the source example', 'پرسش دربارهٔ نمونهٔ منبع'), lang), href: `/ueben/quiz?fach=msk&n=1&themen=riesenzelltumor&from=${encodeURIComponent(localized('/msk/tumoren/knochenzeichen#lodwick'))}` }, flashcards: { label: pick(L('Lernkarte zum Quellenbeispiel', 'Flashcard on the source example', 'فلش‌کارت دربارهٔ نمونهٔ منبع'), lang), href: `/flashcards/riesenzelltumor?from=${encodeURIComponent(localized('/msk/tumoren/knochenzeichen#lodwick'))}` } }} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.heroImage, heroImageOpacity: .8, accent: '#8ab9a7', accentStrong: '#286451', accentSoft: '#e8f2ed', secondary: '#d19b64', secondaryStrong: '#815124', heroBase: '#18342e' }}
    className={styles.page} sources={<LessonSources title={pick(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'), lang)} items={sources} note={pick(lesson.notice, lang)}/>}
  >
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.id} title={pick(chapter.title, lang)} bodyClassName={styles.body}>
      <p>{pick(chapter.lead, lang)}</p><PatternTable rows={chapter.rows} lang={lang}/>
      {chapter.id === 'lodwick' && <LodwickSchematic lang={lang}/>}
      {chapter.extraRows && <><h3>{pick(chapter.subheading, lang)}</h3><PatternTable rows={chapter.extraRows} lang={lang} title={chapter.id === 'lodwick' ? L('Quellenbeispiel', 'Source example', 'نمونهٔ منبع') : L('Zusätzliche Merkmale', 'Additional features', 'یافته‌های تکمیلی')}/></>}
      {chapter.exampleNote && <p className={styles.note}>{pick(chapter.exampleNote, lang)}</p>}
      <p className={styles.note}>{pick(chapter.note, lang)}</p>
    </LessonSection>)}
    <LessonSection id="case" icon="case" title={pick(lesson.case.title, lang)} bodyClassName={styles.body}><SelfCheck lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="takeHome" title={translatedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.rules}>{lesson.takeHome.map((rule, index) => <li key={index}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
