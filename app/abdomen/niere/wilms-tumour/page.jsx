'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import ClinicalPatternDiagram from '@/components/ClinicalPatternDiagram'
import { WILMS_LESSON as lesson } from '@/data/wilmsLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] ?? value?.de ?? ''
const labels = {
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه نکته برای یادآوری'),
}

function Icon({ id }) {
  const d = id === 'pattern' ? 'M4 12c0-6 4-9 8-9s8 3 8 9-4 9-8 9-8-3-8-9Zm4 0h8m-4-4v8'
    : id === 'origin' ? 'M4 5h6v14H4zM10 12h9m-4-4 4 4-4 4'
      : 'M5 5h14M5 12h14M5 19h14'
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d}/></svg>
}

function Decision({ lang }) {
  const [answer, setAnswer] = useState(null)
  const q = lesson.check
  return <div className={styles.decision}>
    <h3>{pick(L('Selbstcheck: Wo liegt der Ursprungsort?', 'Self-check: Where is the site of origin?', 'خودآزمایی: محل منشأ کجاست؟'), lang)}</h3>
    <p>{pick(q.question, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>
      {q.options.map((option, index) => <label key={index}><input type="radio" name="wilms-claw-sign" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(answer === q.answer ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(answer === q.answer ? q.explanation : q.retry, lang)}</p> : null}
  </div>
}

export default function WilmsTumourLessonPage() {
  const { lang } = useLanguage()
  const localizedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, pick(value, lang)]))
  const l = lesson
  const sections = [
    { id: 'pattern', label: pick(l.sections[0].title, lang), icon: 'pattern' },
    { id: 'origin', label: pick(l.sections[1].title, lang), icon: 'origin' },
    { id: 'spread', label: pick(l.sections[2].title, lang), icon: 'report' },
    { id: 'take-home', label: localizedLabels.takeHome, icon: 'summary', emphasis: true },
  ]
  const langHref = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const takeHome = l.summary.map((item, index) => ({ title: pick(L(`Regel ${index + 1}`, `Rule ${index + 1}`, `قاعدهٔ ${index + 1}`), lang), detail: pick(item, lang) }))
  const sourceItems = [{ id: 'abdomen-p52', tag: 'PDF · 52 / printed 51', title: pick(L('Abdomen.pdf – Nephroblastom (Wilms-Tumor)', 'Abdomen.pdf – Nephroblastoma (Wilms tumour)', 'Abdomen.pdf – نفروبلاستوما (تومور ویلمز)'), lang), citation: pick(L('Abdeckungsquelle: Bildmuster und genannte Metastasenorte; Fallbild und ungeprüfte Epidemiologie-/Prognoseangaben ausgeschlossen.', 'Coverage source: imaging pattern and listed metastatic sites; the case image and unverified epidemiology/prognosis claims are excluded.', 'مبنای پوشش: الگوی تصویربرداری و محل‌های متاستاز ذکرشده؛ تصویر کیس و ادعاهای تأییدنشده درباره پیش‌آگهی/همه‌گیرشناسی وارد نشده‌اند.'), lang), scope: pick(l.media, lang) }]
  return <StandardLessonShell lessonId={l.id} lang={lang} title={pick(l.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: pick(L('Abdomen', 'Abdomen', 'شکم'), lang), href: langHref('/lernen/abdomen') }, { label: pick(L('Niere', 'Kidney', 'کلیه'), lang), href: langHref('/lernen/abdomen') }]}
    sections={sections} labels={localizedLabels} renderIcon={id => <Icon id={id}/>} syncHashNavigation actions={{}}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/wilms/hero.svg', heroImageOpacity: .9, accent: '#78d0d7', accentStrong: '#166c78', accentSoft: '#e1f3f4', secondary: '#b8a0cf', secondaryStrong: '#674c81', heroBase: '#173341' }}
    heroImageAlt={pick(L('Schematische Niere mit großer Raumforderung; keine diagnostische Aufnahme', 'Schematic kidney with a large mass; not a diagnostic image', 'شماتیک کلیه با توده بزرگ؛ تصویر تشخیصی نیست'), lang)}
    className={styles.page} sources={<LessonSources title={pick(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'), lang)} items={sourceItems} note={pick(l.sourceReview, lang)}/>}>
    {l.sections.map((section, index) => <LessonSection key={sections[index].id} id={sections[index].id} icon={sections[index].icon} title={pick(section.title, lang)}>
      <p className={styles.body}>{pick(section.body, lang)}</p>
      <p className={styles.note}>{pick(section.implication, lang)}</p>
      {index === 1 ? <><figure className={styles.diagram}><ClinicalPatternDiagram variant="wilms-tumour" lang={lang} title={pick(l.check.diagramCaption, lang)}/><figcaption>{pick(l.check.diagramCaption, lang)}</figcaption></figure><Decision lang={lang}/></> : null}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={localizedLabels.takeHome}><TakeHomeList items={takeHome}/></LessonSection>
  </StandardLessonShell>
}
