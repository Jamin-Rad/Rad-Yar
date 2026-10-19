'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { TGCT_LESSON as lesson } from '@/data/tgctLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''
const labels = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'), continue: L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'), lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Vier Regeln mitnehmen', 'Four rules to remember', 'چهار قاعده برای یادآوری'), sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
}
function Icon({ id }) {
  const paths = { clinical: 'M12 3v18M5 8h14M7 16h10', imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7', differential: 'M12 3v5m0 4v9M5 8h14M5 16h14', check: 'M4 4h16v16H4zM8 9h8m-8 4h5', summary: 'M5 5h14M5 12h14M5 19h14' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.imaging} /></svg>
}
function Matrix({ rows, lang }) {
  return <div className={styles.tableWrap}><table><caption>{pick(L('Muster und diagnostische Einordnung', 'Pattern and diagnostic interpretation', 'الگو و تفسیر تشخیصی'), lang)}</caption><thead><tr><th scope="col">{pick(L('Merkmal', 'Feature', 'ویژگی'), lang)}</th><th scope="col">{pick(L('Befund', 'Finding', 'یافته'), lang)}</th></tr></thead><tbody>{rows.map(([term, detail], index) => <tr key={index}><th scope="row">{pick(term, lang)}</th><td>{pick(detail, lang)}</td></tr>)}</tbody></table></div>
}
function GrowthPattern({ lang }) {
  const c = {
    de: { title: 'Lokalisiertes und diffuses Wachstum', desc: 'Vergleichsschema: ein umschriebener Knoten gegenüber diffuser synovialer Verdickung.', local: 'Lokalisiert / nodulär', diffuse: 'Diffus', capsule: 'Gelenkraum' },
    en: { title: 'Localized and diffuse growth', desc: 'Comparison schematic: one circumscribed nodule versus diffuse synovial thickening.', local: 'Localized / nodular', diffuse: 'Diffuse', capsule: 'Joint space' },
    fa: { title: 'رشد موضعی و منتشر', desc: 'شماتیک مقایسه‌ای: یک ندول محدود در برابر ضخیم‌شدگی منتشر سینوویوم.', local: 'موضعی / ندولار', diffuse: 'منتشر', capsule: 'فضای مفصل' },
  }[lang]
  return <figure className={styles.diagram}><svg viewBox="0 0 720 320" role="img" aria-labelledby="tgct-pattern-title tgct-pattern-desc"><title id="tgct-pattern-title">{c.title}</title><desc id="tgct-pattern-desc">{c.desc}</desc>
    <rect x="16" y="16" width="688" height="288" rx="22" fill="#10252d" />
    {[52, 374].map(x => <g key={x}><rect x={x} y="72" width="284" height="170" rx="72" fill="#edf4ef" stroke="#65c2bf" strokeWidth="8"/><path d={`M${x+24} 110 Q${x+142} 74 ${x+260} 110 M${x+24} 205 Q${x+142} 238 ${x+260} 205`} fill="none" stroke="#8ab9a7" strokeWidth="12"/></g>)}
    <ellipse cx="194" cy="158" rx="34" ry="27" fill="#bb6844" stroke="#f2ca74" strokeWidth="5"/>
    <path d="M402 110 Q516 73 630 110 M402 205 Q516 239 630 205" fill="none" stroke="#bb6844" strokeWidth="18" strokeLinecap="round" opacity=".9"/>
    <text x="194" y="52" textAnchor="middle" fontSize="18" fill="#fff1d8" direction={lang === 'fa' ? 'rtl' : 'ltr'} unicodeBidi="plaintext">{c.local}</text><text x="516" y="52" textAnchor="middle" fontSize="18" fill="#fff1d8" direction={lang === 'fa' ? 'rtl' : 'ltr'} unicodeBidi="plaintext">{c.diffuse}</text>
    <text x="194" y="276" textAnchor="middle" fontSize="14" fill="#d9e8e0" direction={lang === 'fa' ? 'rtl' : 'ltr'} unicodeBidi="plaintext">{c.capsule}</text><text x="516" y="276" textAnchor="middle" fontSize="14" fill="#d9e8e0" direction={lang === 'fa' ? 'rtl' : 'ltr'} unicodeBidi="plaintext">{c.capsule}</text>
  </svg><figcaption>{pick(L('Konzeptschema: links ein einzelner synovialer Knoten, rechts ausgedehnte synoviale Beteiligung. Nichtdiagnostische Darstellung.', 'Concept schematic: one synovial nodule on the left, extensive synovial involvement on the right. Not diagnostic imaging.', 'شماتیک مفهومی: در چپ یک ندول سینوویال و در راست درگیری گستردهٔ سینوویوم. تصویر تشخیصی نیست.'), lang)}</figcaption></figure>
}
function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const check = lesson.check
  const correct = answer === check.answer
  return <div className={styles.decision}><h3>{pick(check.title, lang)}</h3><p>{pick(check.prompt, lang)}</p><fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{check.options.map((option, index) => <label key={index}><input type="radio" name="tgct-next-step" checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}</fieldset>{answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کن.'), lang)}</strong>{pick(correct ? check.feedback : check.retry, lang)}</p> : null}</div>
}
export default function TGCTPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const translatedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))
  const languagePath = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })), { id: 'check', label: t(lesson.check.title), icon: 'check' }, { id: 'take-home', label: translatedLabels.takeHome, icon: 'summary', emphasis: true }]
  const references = lesson.references.map(reference => ({ ...reference, title: t(reference.title), citation: t(reference.citation) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    heroImageAlt={t(L('Nichtdiagnostisches Schema eines Gelenks mit lokalisiertem Knoten beziehungsweise diffuser Synovialproliferation.', 'Non-diagnostic joint schematic showing a localized nodule versus diffuse synovial proliferation.', 'شماتیک غیرتشخیصی مفصل با ندول موضعی در برابر تکثیر منتشر سینوویوم.'))}
    breadcrumbs={[{ label: 'RadYar', href: languagePath('/') }, { label: 'MSK', href: languagePath('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={translatedLabels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .94, accent: '#d49a61', accentStrong: '#79502d', accentSoft: '#f2e9de', secondary: '#8ab9a7', secondaryStrong: '#286451', heroBase: '#18342e' }} className={styles.page}
    sources={<LessonSources title={translatedLabels.sources} items={references} note={t(lesson.sourceNote)} />}>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}><p>{t(section.lead)}</p>{section.rows ? <Matrix rows={section.rows} lang={lang} /> : null}{section.id === 'forms' ? <GrowthPattern lang={lang} /> : null}{section.image ? <figure className={styles.caseImage}><img src={section.image} alt={t(section.imageAlt)} loading="lazy" /><figcaption>{t(section.imageCaption)}</figcaption></figure> : null}{section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}</LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="summary" title={translatedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
