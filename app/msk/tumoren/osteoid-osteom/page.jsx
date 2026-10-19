'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { MSK_OSTEOID_OSTEOM_LESSON as lesson } from '@/data/mskOsteoidOsteomLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''

const labels = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiterlernen', 'Continue learning', 'ادامه یادگیری'),
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

function Matrix({ rows, lang, caption }) {
  return <div className={styles.tableWrap}><table>
    <caption>{pick(caption, lang)}</caption>
    <thead><tr><th scope="col">{pick(L('Merkmal', 'Feature', 'ویژگی'), lang)}</th><th scope="col">{pick(L('Einordnung', 'Interpretation', 'تفسیر'), lang)}</th></tr></thead>
    <tbody>{rows.map(([term, detail], index) => <tr key={index}><th scope="row">{pick(term, lang)}</th><td>{pick(detail, lang)}</td></tr>)}</tbody>
  </table></div>
}

function NidusDiagram({ lang }) {
  const labels = {
    de: { title: 'Schema: kleiner Nidus in reaktiver Sklerose', desc: 'Ein kleiner zentraler Tumorherd liegt innerhalb der deutlich größeren reaktiven Knochenverdickung. Keine Patientenaufnahme.', sclerosis: 'Reaktive Sklerose', nidus: 'Kleiner Nidus', caption: 'Konzeptzeichnung: Tumorherd und umgebende Knochenreaktion sind getrennt zu beurteilen.' },
    en: { title: 'Schematic: small nidus within reactive sclerosis', desc: 'A small central tumour focus sits inside a much larger reactive bone thickening. Not a patient scan.', sclerosis: 'Reactive sclerosis', nidus: 'Small nidus', caption: 'Concept drawing: assess the tumour focus separately from the surrounding bone reaction.' },
    fa: { title: 'شماتیک: نیدوس کوچک در اسکلروز واکنشی', desc: 'کانون کوچک مرکزی درون ضخیم‌شدگی واکنشی بزرگ‌تر استخوان قرار دارد؛ تصویر بیمار نیست.', sclerosis: 'اسکلروز واکنشی', nidus: 'نیدوس کوچک', caption: 'طرح مفهومی: کانون تومور و واکنش استخوانی اطراف را جداگانه ارزیابی کنید.' },
  }
  const t = labels[lang] || labels.de
  return <figure className={styles.diagram}>
    <svg viewBox="0 0 560 430" role="img" aria-labelledby="nidus-title nidus-desc">
      <title id="nidus-title">{t.title}</title><desc id="nidus-desc">{t.desc}</desc>
      <rect x="20" y="20" width="520" height="390" rx="26" fill="#132c2a" />
      <rect x="90" y="70" width="380" height="285" rx="42" fill="#edcf9e" stroke="#fff2dc" strokeWidth="8" />
      <rect x="135" y="105" width="290" height="215" rx="30" fill="#f5f0e4" stroke="#92806a" strokeWidth="4" />
      <ellipse cx="280" cy="210" rx="104" ry="74" fill="#d87845" opacity=".25" />
      <circle cx="280" cy="210" r="28" fill="#7b3d30" stroke="#572c25" strokeWidth="5" /><circle cx="280" cy="210" r="7" fill="#f5cf78" />
      <path d="M305 194 402 132" stroke="#315e58" strokeWidth="3" /><rect x="360" y="90" width="165" height="44" rx="11" fill="#e6f1e9" /><text x="442" y="118" textAnchor="middle" fontSize="17" fontWeight="700" fill="#244b43">{t.sclerosis}</text>
      <path d="m254 232-50 68" stroke="#7b3d30" strokeWidth="3" /><rect x="82" y="296" width="145" height="44" rx="11" fill="#fff0dd" /><text x="154" y="324" textAnchor="middle" fontSize="18" fontWeight="700" fill="#6a3228">{t.nidus}</text>
    </svg>
    <figcaption>{t.caption}</figcaption>
  </figure>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const check = lesson.check
  const correct = answer === check.answer
  return <div className={styles.decision}>
    <h3>{pick(check.title, lang)}</h3><p>{pick(check.prompt, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>
      {check.options.map((option, index) => <label key={index}><input type="radio" name="osteoid-osteom-retrieval" checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(correct ? check.explanation : check.retry, lang)}</p> : null}
  </div>
}

export default function OsteoidOsteomPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const translatedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))
  const languagePath = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sections = [
    ...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })),
    { id: 'check', label: t(lesson.check.title), icon: 'check' },
    { id: 'take-home', label: translatedLabels.takeHome, icon: 'summary', emphasis: true },
  ]
  const references = lesson.references.map(reference => ({ tag: reference.tag, title: t(reference.title), href: reference.href, citation: reference.citation && (typeof reference.citation === 'string' ? reference.citation : t(reference.citation)) }))

  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" heroImageAlt={t(L('Nichtdiagnostisches Schema: kleiner Nidus innerhalb einer reaktiven Knochenverdickung.', 'Non-diagnostic schematic: a small nidus within reactive bone thickening.', 'شماتیک غیرتشخیصی: نیدوس کوچک درون ضخیم‌شدگی واکنشی استخوان.'))} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: languagePath('/') }, { label: 'MSK', href: languagePath('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={translatedLabels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .92, accent: '#d49a61', accentStrong: '#79502d', accentSoft: '#f2e9de', secondary: '#8ab9a7', secondaryStrong: '#286451', heroBase: '#18342e' }}
    className={styles.page} sources={<LessonSources title={translatedLabels.sources} items={references} note={t(lesson.sourceNote)} />}
  >
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}>
      <p>{t(section.lead)}</p>
      {section.rows ? <Matrix rows={section.rows} lang={lang} caption={L('Muster und diagnostische Grenze', 'Pattern and diagnostic limit', 'الگو و محدودیت تشخیصی')} /> : null}
      {section.modalities ? <Matrix rows={section.modalities} lang={lang} caption={L('Welche Information liefert die Modalität?', 'What does each modality contribute?', 'هر مودالیته چه اطلاعاتی می‌دهد؟')} /> : null}
      {section.id === 'imaging' ? <><NidusDiagram lang={lang} /><figure className={styles.caseImage}><img src="/educational/osteoid-osteom/pdf-case-figure.jpg" alt={t(section.imageAlt)} loading="lazy" /><figcaption>{t(section.imageCaption)}</figcaption></figure></> : null}
      {section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}
    </LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="summary" title={translatedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
