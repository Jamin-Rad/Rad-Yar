'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { KNOCHENMETASTASEN_LESSON as lesson } from '@/data/knochenmetastasenLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''
const labels = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری'), completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'), lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Vier Regeln mitnehmen', 'Four rules to remember', 'چهار قاعده برای یادآوری'), sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
}
const paths = { clinical: 'M12 3v18M5 8h14M7 16h10', imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7', differential: 'M12 3v5m0 4v9M5 8h14M5 16h14', check: 'M4 4h16v16H4zM8 9h8m-8 4h5', summary: 'M5 5h14M5 12h14M5 19h14' }
function Icon({ id }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.imaging} /></svg> }
function Matrix({ rows, lang }) {
  return <div className={styles.tableWrap}><table><caption>{pick(L('Muster und diagnostische Grenze', 'Pattern and diagnostic limit', 'الگو و محدودیت تشخیصی'), lang)}</caption><thead><tr><th scope="col">{pick(L('Merkmal', 'Feature', 'ویژگی'), lang)}</th><th scope="col">{pick(L('Befund und Einordnung', 'Finding and interpretation', 'یافته و تفسیر'), lang)}</th></tr></thead><tbody>{rows.map(([term, detail], index) => <tr key={index}><th scope="row">{pick(term, lang)}</th><td>{pick(detail, lang)}</td></tr>)}</tbody></table></div>
}
function ModalityDiagram({ lang }) {
  const t = {
    de: { title: 'Bildgebungsfrage nach Modalität', desc: 'Zuordnung jeder Modalität zur Frage, die sie in diesem Lernpfad beantwortet.', items: [['Röntgen', 'Welches Knochenmuster?'], ['CT', 'Wie sind Matrix und Kortikalis?'], ['MRT', 'Ist das Knochenmark betroffen?'], ['Szintigraphie', 'Wo reagiert der Knochenumbau?']] },
    en: { title: 'Imaging question by modality', desc: 'Each modality is matched to the question it answers in this learning path.', items: [['Radiograph', 'What is the bone pattern?'], ['CT', 'What are the matrix and cortex like?'], ['MRI', 'Is the marrow involved?'], ['Scintigraphy', 'Where is bone turnover active?']] },
    fa: { title: 'پرسش تصویربرداری بر اساس روش', desc: 'هر روش تصویربرداری به پرسشی وصل شده که در این مسیر آموزشی پاسخ می‌دهد.', items: [['رادیوگرافی', 'الگوی استخوانی چیست؟'], ['CT', 'وضعیت ماتریکس و کورتکس چگونه است؟'], ['MRI', 'آیا مغز استخوان درگیر است؟'], ['اسکن استخوان', 'بازسازی استخوان در کجا فعال است؟']] }
  }[lang]
  const rtl = lang === 'fa'
  const cards = t.items.map(([method, question], index) => {
    const x = 24 + index * 288
    return <g key={method} transform={`translate(${x} 0)`}>
      <rect x="0" y="24" width="256" height="250" rx="20" fill={index % 2 ? '#f4e9d8' : '#e5f0e9'} stroke="#8aa79b" strokeWidth="3" />
      <circle cx="128" cy="76" r="31" fill="#1c4548" />
      <text x="128" y="84" textAnchor="middle" fontSize="19" fontWeight="700" fill="#fff">{index + 1}</text>
      <text x="128" y="144" textAnchor="middle" fontSize="23" fontWeight="700" fill="#18383b" direction={rtl ? 'rtl' : 'ltr'}>{method}</text>
      <path d="M128 163v25" stroke="#ac7448" strokeWidth="4" />
      <path d="m119 182 9 11 9-11" fill="none" stroke="#ac7448" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <foreignObject x="14" y="205" width="228" height="56"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color:'#18383b', font:'600 17px/1.45 system-ui,sans-serif', textAlign:'center', direction:rtl?'rtl':'ltr' }}>{question}</div></foreignObject>
    </g>
  })
  return <figure className={styles.modalityDiagram}><svg viewBox="0 0 1176 300" role="img" aria-labelledby="modality-diagram-title modality-diagram-desc"><title id="modality-diagram-title">{t.title}</title><desc id="modality-diagram-desc">{t.desc}</desc>{cards}</svg><figcaption>{t.desc}</figcaption></figure>
}
function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const check = lesson.check
  const correct = answer === check.answer
  return <div className={styles.decision}><h3>{pick(check.title, lang)}</h3><p>{pick(check.prompt, lang)}</p><fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{check.options.map((option, index) => <label key={index}><input type="radio" name="bone-metastases-retrieval" checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}</fieldset>{answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید.'), lang)}</strong>{pick(correct ? check.feedback : check.retry, lang)}</p> : null}</div>
}
export default function KnochenmetastasenPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const translatedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))
  const languagePath = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })), { id: 'check', label: t(lesson.check.title), icon: 'check' }, { id: 'take-home', label: translatedLabels.takeHome, icon: 'summary', emphasis: true }]
  const references = lesson.references.map(reference => ({ ...reference, title: t(reference.title), citation: typeof reference.citation === 'string' ? reference.citation : t(reference.citation) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    heroImageAlt={t(L('Nichtdiagnostische Schemaansicht mit osteolytischer und sklerotischer Knochenläsion.', 'Non-diagnostic schematic showing osteolytic and sclerotic bone lesions.', 'شماتیک غیرتشخیصی از ضایعات استئولیتیک و اسکلروتیک استخوان.'))}
    breadcrumbs={[{ label: 'RadYar', href: languagePath('/') }, { label: 'MSK', href: languagePath('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={translatedLabels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .94, accent: '#d49a61', accentStrong: '#79502d', accentSoft: '#f2e9de', secondary: '#8ab9a7', secondaryStrong: '#286451', heroBase: '#18342e' }} className={styles.page}
    sources={<LessonSources title={translatedLabels.sources} items={references} note={t(lesson.sourceNote)} />}>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}><p>{t(section.lead)}</p>{section.rows ? <Matrix rows={section.rows} lang={lang} /> : null}{section.diagram ? <ModalityDiagram lang={lang} /> : null}{section.image ? <figure className={styles.caseImage}><img src={section.image} alt={t(section.imageAlt)} loading="lazy" /><figcaption>{t(section.imageCaption)}</figcaption></figure> : null}{section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}</LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="summary" title={translatedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
