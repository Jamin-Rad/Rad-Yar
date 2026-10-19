'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { EWING_SARKOM_LESSON as lesson } from '@/data/ewingSarkomLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''
const labels = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری'), completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'), lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Vier Regeln mitnehmen', 'Four rules to remember', 'چهار قاعده برای یادآوری'), sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
}
function Icon({ id }) {
  const paths = { clinical: 'M12 3v18M5 8h14M7 16h10', imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7', differential: 'M12 3v5m0 4v9M5 8h14M5 16h14', management: 'M4 12h16M12 4v16M7 7l10 10', check: 'M4 4h16v16H4zM8 9h8m-8 4h5', summary: 'M5 5h14M5 12h14M5 19h14' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.imaging} /></svg>
}
function Matrix({ rows, lang }) {
  return <div className={styles.tableWrap}><table><caption>{pick(L('Muster und diagnostische Grenze', 'Pattern and diagnostic limit', 'الگو و محدودیت تشخیصی'), lang)}</caption><thead><tr><th scope="col">{pick(L('Merkmal', 'Feature', 'ویژگی'), lang)}</th><th scope="col">{pick(L('Befund und Einordnung', 'Finding and interpretation', 'یافته و تفسیر'), lang)}</th></tr></thead><tbody>{rows.map(([term, detail], index) => <tr key={index}><th scope="row">{pick(term, lang)}</th><td>{pick(detail, lang)}</td></tr>)}</tbody></table></div>
}
function PatternDiagram({ lang }) {
  const t = {
    de: { title: 'Schematisches diaphysäres Läsionsmuster', desc: 'Nichtdiagnostisches Längsschema eines Röhrenknochens mit mittdiaphysärer Läsion und lamellärer periostaler Reaktion.', shaft: 'Diaphyse', lesion: 'Läsion', periosteum: 'Lamelläre Periostreaktion', caption: 'Konzeptschema zur Orientierung; keine Röntgenaufnahme und kein diagnostischer Beweis.' },
    en: { title: 'Schematic diaphyseal lesion pattern', desc: 'Non-diagnostic long-bone diagram showing a mid-diaphyseal lesion and lamellated periosteal response.', shaft: 'Diaphysis', lesion: 'Lesion', periosteum: 'Lamellated periosteal response', caption: 'Conceptual orientation diagram; not a radiograph and not diagnostic proof.' },
    fa: { title: 'شماتیک الگوی ضایعهٔ دیافیزی', desc: 'شماتیک غیرتشخیصی استخوان بلند با ضایعهٔ میانی دیافیز و واکنش لایه‌لایهٔ پریوست.', shaft: 'دیافیز', lesion: 'ضایعه', periosteum: 'واکنش لایه‌لایهٔ پریوست', caption: 'طرح مفهومی برای جهت‌یابی؛ رادیوگرافی و مدرک تشخیصی نیست.' }
  }[lang]
  return <figure className={styles.diagram}><svg viewBox="0 0 720 390" role="img" aria-labelledby="ewing-title ewing-desc"><title id="ewing-title">{t.title}</title><desc id="ewing-desc">{t.desc}</desc>
    <rect x="18" y="18" width="684" height="354" rx="24" fill="#10252d" />
    <path d="M300 45h120l30 46v208l-30 46H300l-30-46V91z" fill="#e7d4ac" stroke="#fff0d0" strokeWidth="8" />
    <path d="M320 70h80l18 30v190l-18 30h-80l-18-30V100z" fill="#f7f1e6" stroke="#9b8b74" strokeWidth="4" />
    <path d="M320 156c20-22 57-22 80 0v75c-23 22-60 22-80 0z" fill="#bb6844" opacity=".86" stroke="#6c302b" strokeWidth="5" />
    <path d="M306 146c28-26 80-26 108 0M303 238c31 25 83 25 114 0M296 136c34-33 96-33 128 0M294 248c36 34 96 34 132 0" fill="none" stroke="#e3a35b" strokeWidth="5" />
    <path d="M346 193 166 122" stroke="#f2ca74" strokeWidth="3"/><rect x="38" y="95" width="172" height="52" rx="10" fill="#fff1d8"/><text x="124" y="127" textAnchor="middle" fontSize="19" fill="#283c40">{t.lesion}</text>
    <path d="M420 120 536 96" stroke="#e3a35b" strokeWidth="3"/><rect x="500" y="48" width="188" height="80" rx="10" fill="#fff1d8"/><text x="594" y="81" textAnchor="middle" fontSize="16" fill="#283c40" direction={lang === 'fa' ? 'rtl' : 'ltr'}>{t.periosteum}</text>
    <path d="M290 313 194 313" stroke="#65c2bf" strokeWidth="3"/><rect x="38" y="286" width="172" height="52" rx="10" fill="#dcf5ed"/><text x="124" y="318" textAnchor="middle" fontSize="18" fill="#194f4b">{t.shaft}</text>
  </svg><figcaption>{t.caption}</figcaption></figure>
}
function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const check = lesson.check
  const correct = answer === check.answer
  return <div className={styles.decision}><h3>{pick(check.title, lang)}</h3><p>{pick(check.prompt, lang)}</p><fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{check.options.map((option, index) => <label key={index}><input type="radio" name="ewing-next-step" checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}</fieldset>{answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کن.'), lang)}</strong>{pick(correct ? check.feedback : check.retry, lang)}</p> : null}</div>
}
export default function EwingSarkomPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const translatedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))
  const languagePath = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })), { id: 'check', label: t(lesson.check.title), icon: 'check' }, { id: 'take-home', label: translatedLabels.takeHome, icon: 'summary', emphasis: true }]
  const references = lesson.references.map(reference => ({ ...reference, title: t(reference.title), citation: t(reference.citation) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    heroImageAlt={t(L('Nichtdiagnostisches Schema einer diaphysären Läsion mit lamellärer Periostreaktion.', 'Non-diagnostic schematic of a diaphyseal lesion with lamellated periosteal response.', 'شماتیک غیرتشخیصی ضایعهٔ دیافیزی با واکنش لایه‌لایهٔ پریوست.'))}
    breadcrumbs={[{ label: 'RadYar', href: languagePath('/') }, { label: 'MSK', href: languagePath('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={translatedLabels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .94, accent: '#d49a61', accentStrong: '#79502d', accentSoft: '#f2e9de', secondary: '#8ab9a7', secondaryStrong: '#286451', heroBase: '#18342e' }} className={styles.page}
    sources={<LessonSources title={translatedLabels.sources} items={references} note={t(lesson.sourceNote)} />}>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}><p>{t(section.lead)}</p>{section.rows ? <Matrix rows={section.rows} lang={lang} /> : null}{section.diagram ? <PatternDiagram lang={lang} /> : null}{section.image ? <figure className={styles.caseImage}><img src={section.image} alt={t(section.imageAlt)} loading="lazy" /><figcaption>{t(section.imageCaption)}</figcaption></figure> : null}{section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}</LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="summary" title={translatedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
