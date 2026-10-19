'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { FUNIKULAERE_MYELOSE_LESSON as lesson } from '@/data/funikulaereMyeloseLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''

const shellLabels = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'),
  close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه قاعده برای یادآوری'),
  sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
}

function Icon({ id }) {
  const paths = {
    clinical: 'M12 3v18M5 8h14M7 16h10',
    imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7',
    differential: 'M12 3v5m0 4v9M5 8h14M5 16h14',
    management: 'M4 12h16M12 4v16M7 7l10 10',
    check: 'M4 4h16v16H4zM8 9h8m-8 4h5',
    summary: 'M5 5h14M5 12h14M5 19h14',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.imaging} /></svg>
}

function PatternDiagram({ lang }) {
  const labels = {
    de: { title: 'Nichtdiagnostische Skizze: symmetrische Hinterstränge', desc: 'Axialer Schema-Querschnitt des Rückenmarks mit hervorgehobenen beidseitigen Hintersträngen. Keine Patientenaufnahme und kein diagnostischer Befund.', caption: 'Die Skizze zeigt nur Lage und Symmetrie; sie bildet keine MRT-Aufnahme nach.' },
    en: { title: 'Non-diagnostic schematic: symmetric posterior columns', desc: 'Axial schematic cross-section of the spinal cord with paired posterior columns highlighted. Not a patient scan or diagnostic finding.', caption: 'The schematic shows location and symmetry only; it does not reproduce an MRI scan.' },
    fa: { title: 'شماتیک غیرتشخیصی: ستون‌های خلفی متقارن', desc: 'مقطع شماتیک آکسیال نخاع با برجسته‌سازی ستون‌های خلفی دوطرفه؛ تصویر بیمار یا یافتهٔ تشخیصی نیست.', caption: 'طرح فقط محل و تقارن را نشان می‌دهد و بازسازی یک تصویر MRI نیست.' },
  }
  const t = labels[lang] || labels.de
  return <figure className={styles.diagram}>
    <svg viewBox="0 0 560 430" role="img" aria-labelledby="cord-title cord-desc">
      <title id="cord-title">{t.title}</title><desc id="cord-desc">{t.desc}</desc>
      <rect x="12" y="12" width="536" height="406" rx="34" fill="#102b37" />
      <ellipse cx="280" cy="218" rx="170" ry="132" fill="#e9d7c1" stroke="#fff5e9" strokeWidth="9" />
      <ellipse cx="280" cy="224" rx="110" ry="88" fill="#627d88" stroke="#b5cad0" strokeWidth="6" />
      <path d="M226 265Q244 285 280 286Q316 285 334 265L310 247Q280 262 250 247Z" fill="#f2bd68" stroke="#fff1d3" strokeWidth="5" />
      <path d="M280 253v31" stroke="#fff1d3" strokeWidth="4" strokeLinecap="round" opacity=".8" />
      <path d="M280 203c-20 0-31 15-31 32 0 18 14 31 31 42 17-11 31-24 31-42 0-17-11-32-31-32Z" fill="#36545e" opacity=".82" />
      <circle cx="280" cy="240" r="17" fill="#203d47" />
      <path d="M222 320h116" stroke="#f2bd68" strokeWidth="3" strokeLinecap="round" />
      <circle cx="222" cy="320" r="5" fill="#f2bd68" /><circle cx="338" cy="320" r="5" fill="#f2bd68" />
    </svg>
    <figcaption>{t.caption}</figcaption>
  </figure>
}

function FeatureTable({ rows, lang, caption }) {
  return <div className={styles.tableWrap}><table>
    <caption>{pick(caption, lang)}</caption>
    <thead><tr><th scope="col">{pick(L('Merkmal', 'Feature', 'ویژگی'), lang)}</th><th scope="col">{pick(L('Einordnung', 'Interpretation', 'تفسیر'), lang)}</th></tr></thead>
    <tbody>{rows.map(([term, detail], index) => <tr key={index}><th scope="row">{pick(term, lang)}</th><td>{pick(detail, lang)}</td></tr>)}</tbody>
  </table></div>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const check = lesson.check
  const correct = answer === check.answer
  return <div className={styles.decision}>
    <h3>{pick(check.title, lang)}</h3><p>{pick(check.prompt, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>
      {check.options.map((option, index) => <label key={index}><input type="radio" name="funikulaere-myelose-retrieval" checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(correct ? check.explanation : check.retry, lang)}</p> : null}
  </div>
}

export default function FunikulaereMyelosePage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const labels = Object.fromEntries(Object.entries(shellLabels).map(([key, value]) => [key, t(value)]))
  const sections = [
    ...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })),
    { id: 'check', label: t(lesson.check.title), icon: 'check' },
    { id: 'take-home', label: labels.takeHome, icon: 'summary', emphasis: true },
  ]
  const languagePath = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const references = lesson.references.map(reference => ({ tag: reference.tag, title: t(reference.title), href: reference.href, citation: reference.citation && (typeof reference.citation === 'string' ? reference.citation : t(reference.citation)) }))
  const heroAlt = L('Nichtdiagnostische Schemazeichnung: symmetrische Hinterstränge im axialen Querschnitt.', 'Non-diagnostic schematic: symmetric posterior columns in axial cross-section.', 'شماتیک غیرتشخیصی: ستون‌های خلفی متقارن در مقطع آکسیال.')

  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" heroImageAlt={t(heroAlt)} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: languagePath('/') }, { label: t(L('Wirbelsäule', 'Spine', 'ستون فقرات')), href: languagePath('/lernen/wirbelsaeule') }, { label: t(lesson.title) }]}
    sections={sections} labels={labels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .92, accent: '#77c5cf', accentStrong: '#255b68', accentSoft: '#e5f2f2', secondary: '#d49a61', secondaryStrong: '#79502d', heroBase: '#173843' }}
    className={styles.page} sources={<LessonSources title={labels.sources} items={references} note={t(lesson.sourceNote)} />}
  >
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}>
      <p>{t(section.lead)}</p>
      <FeatureTable rows={section.rows} lang={lang} caption={L('Muster und diagnostische Grenze', 'Pattern and diagnostic limit', 'الگو و محدودیت تشخیصی')} />
      {section.id === 'imaging' ? <PatternDiagram lang={lang} /> : null}
      {section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}
    </LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="summary" title={labels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
