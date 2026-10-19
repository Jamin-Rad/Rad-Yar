'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { OSTEOSARKOM_LESSON as lesson } from '@/data/osteosarkomLesson'
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

function Matrix({ rows, lang, caption }) {
  return <div className={styles.tableWrap}><table><caption>{pick(caption, lang)}</caption><thead><tr><th scope="col">{pick(L('Merkmal', 'Feature', 'ویژگی'), lang)}</th><th scope="col">{pick(L('Befund und Einordnung', 'Finding and interpretation', 'یافته و تفسیر'), lang)}</th></tr></thead><tbody>{rows.map(([term, detail], index) => <tr key={index}><th scope="row">{pick(term, lang)}</th><td>{pick(detail, lang)}</td></tr>)}</tbody></table></div>
}

function PatternDiagram({ lang }) {
  const t = {
    de: { title: 'Schematische Osteosarkom-Merkmale', desc: 'Nichtdiagnostisches Schema einer metaphysären Knochenläsion mit Markraumkomponente, Kortikalisdurchbruch, radiären Knochenneubildungen und abgehobenem Periost.', metaphysis: 'Metaphyse', marrow: 'Markraum', sunburst: ['Strahlenförmige', 'Knochenneubildung'], codman: ['Abgehobenes', 'Periost'], caption: 'Konzeptschema zur räumlichen Orientierung; keine Röntgenaufnahme und kein diagnostischer Beweis.' },
    en: { title: 'Schematic osteosarcoma features', desc: 'Non-diagnostic schematic of a metaphyseal bone lesion with medullary component, cortical breakthrough, radiating new bone and elevated periosteum.', metaphysis: 'Metaphysis', marrow: 'marrow', sunburst: ['Radiating new', 'bone'], codman: ['Elevated', 'periosteum'], caption: 'Conceptual orientation diagram; not a radiograph and not diagnostic proof.' },
    fa: { title: 'شماتیک ویژگی‌های استئوسارکوما', desc: 'شماتیک غیرتشخیصی ضایعهٔ متافیزی استخوان با جزء مغز استخوانی، تخریب کورتکس، استخوان‌سازی شعاعی و پریوست بالا‌آمده.', metaphysis: 'متافیز', marrow: 'مغز استخوان', sunburst: ['استخوان‌سازی', 'شعاعی'], codman: ['پریوست', 'بالا‌آمده'], caption: 'طرح مفهومی برای جهت‌یابی؛ رادیوگرافی و مدرک تشخیصی نیست.' },
  }[lang] || null
  const c = t || { title: 'Schematic osteosarcoma features', desc: 'Non-diagnostic schematic.', metaphysis: 'Metaphysis', marrow: 'marrow', sunburst: ['Radiating new', 'bone'], codman: ['Elevated', 'periosteum'], caption: 'Conceptual orientation diagram; not diagnostic imaging.' }
  return <figure className={styles.diagram}><svg viewBox="0 0 720 390" role="img" aria-labelledby="osteo-title osteo-desc"><title id="osteo-title">{c.title}</title><desc id="osteo-desc">{c.desc}</desc>
    <rect x="18" y="18" width="684" height="354" rx="24" fill="#10252d" />
    <path d="M290 50h140l28 38v226l-28 28H290l-28-28V88z" fill="#e7d4ac" stroke="#fff0d0" strokeWidth="8" />
    <path d="M310 82h100l15 22v190l-15 20H310l-15-20V104z" fill="#f7f1e6" stroke="#9b8b74" strokeWidth="4" />
    <path d="M322 180c20-32 53-43 84-20 24 18 22 59-3 79-29 23-71 11-85-16-8-15-6-29 4-43z" fill="#bb6844" opacity=".8" stroke="#6c302b" strokeWidth="5" />
    <path d="M437 122l43-24m-42 45 60-6m-65 34 58 16m-65 17 48 39m-57-120 14-48m32 215 34 27m-98-222-1-32" stroke="#e3a35b" strokeWidth="9" strokeLinecap="round" />
    <path d="M425 276l35 34 25-9" fill="none" stroke="#65c2bf" strokeWidth="8" strokeLinecap="round" />
    <path d="M288 58v-20h144v20" fill="none" stroke="#65c2bf" strokeWidth="5" strokeDasharray="9 7" />
    <path d="M370 176 150 125" stroke="#f2ca74" strokeWidth="3" /><rect x="38" y="99" width="192" height="50" rx="10" fill="#fff1d8"/><text x="134" y="131" textAnchor="middle" fontSize="19" fill="#283c40">{c.marrow}</text>
    <path d="M475 131 590 100" stroke="#e3a35b" strokeWidth="3"/><rect x="492" y="58" width="196" height="66" rx="10" fill="#fff1d8"/><text x="590" y="84" textAnchor="middle" fontSize="15" fill="#283c40" direction={lang === 'fa' ? 'rtl' : 'ltr'}><tspan x="590">{c.sunburst[0]}</tspan><tspan x="590" dy="20">{c.sunburst[1]}</tspan></text>
    <path d="M230 244 266 244" stroke="#65c2bf" strokeWidth="3"/><rect x="38" y="218" width="192" height="52" rx="10" fill="#dcf5ed"/><text x="134" y="250" textAnchor="middle" fontSize="17" fill="#194f4b">{c.metaphysis}</text>
    <path d="M450 294 580 294" stroke="#65c2bf" strokeWidth="3"/><rect x="500" y="298" width="188" height="56" rx="10" fill="#dcf5ed"/><text x="594" y="321" textAnchor="middle" fontSize="16" fill="#194f4b" direction={lang === 'fa' ? 'rtl' : 'ltr'}><tspan x="594">{c.codman[0]}</tspan><tspan x="594" dy="19">{c.codman[1]}</tspan></text>
  </svg><figcaption>{c.caption}</figcaption></figure>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const check = lesson.check
  const correct = answer === check.answer
  return <div className={styles.decision}><h3>{pick(check.title, lang)}</h3><p>{pick(check.prompt, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{check.options.map((option, index) => <label key={index}><input type="radio" name="osteosarkom-next-step" checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}</fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کن. '), lang)}</strong>{pick(correct ? check.feedback : check.retry, lang)}</p> : null}
  </div>
}

export default function OsteosarkomPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const translatedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))
  const languagePath = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })), { id: 'check', label: t(lesson.check.title), icon: 'check' }, { id: 'take-home', label: translatedLabels.takeHome, icon: 'summary', emphasis: true }]
  const references = lesson.references.map(reference => ({ ...reference, title: t(reference.title), citation: t(reference.citation) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    heroImageAlt={t(L('Nichtdiagnostisches Schema einer metaphysären Knochenläsion mit aggressiver Periostreaktion.', 'Non-diagnostic schematic of a metaphyseal bone lesion with aggressive periosteal reaction.', 'شماتیک غیرتشخیصی ضایعهٔ متافیزی استخوان با واکنش تهاجمی پریوست.'))}
    breadcrumbs={[{ label: 'RadYar', href: languagePath('/') }, { label: 'MSK', href: languagePath('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={translatedLabels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .94, accent: '#d49a61', accentStrong: '#79502d', accentSoft: '#f2e9de', secondary: '#8ab9a7', secondaryStrong: '#286451', heroBase: '#18342e' }} className={styles.page}
    sources={<LessonSources title={translatedLabels.sources} items={references} note={t(lesson.sourceNote)} />}>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}>
      <p>{t(section.lead)}</p>
      {section.rows ? <Matrix rows={section.rows} lang={lang} caption={L('Muster und diagnostische Grenze', 'Pattern and diagnostic limit', 'الگو و محدودیت تشخیصی')} /> : null}
      {section.diagram ? <PatternDiagram lang={lang} /> : null}
      {section.image ? <figure className={styles.caseImage}><img src={section.image} alt={t(section.imageAlt)} loading="lazy" /><figcaption>{t(section.imageCaption)}</figcaption></figure> : null}
      {section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}
    </LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="summary" title={translatedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
