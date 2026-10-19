'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { GEHIRN_CJD_MUSTER_LESSON as C } from '@/data/gehirnCjdMusterLesson'
import styles from './page.module.css'

const value = (item, lang) => item?.[lang] || item?.de || ''
const labels = {
  path: { de: 'Lernpfad', en: 'Learning path', fa: 'مسیر یادگیری' },
  progress: { de: 'gelesen', en: 'read', fa: 'خوانده‌شده' },
  continue: { de: 'Lektion fortsetzen', en: 'Continue lesson', fa: 'ادامهٔ درس' },
  completeLesson: { de: 'Ganze Lektion als gelesen markieren', en: 'Mark the whole lesson as read', fa: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده' },
  lessonCompleted: { de: 'Ganze Lektion gelesen', en: 'Full lesson marked as read', fa: 'کل درس خوانده شد' },
  complete: { de: 'Abschnitt als gelesen markieren', en: 'Mark section as read', fa: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده' },
  completed: { de: 'Gelesen', en: 'Read', fa: 'خوانده شد' },
  open: { de: 'Abschnitt öffnen', en: 'Open section', fa: 'بازکردن بخش' },
  close: { de: 'Schließen', en: 'Close', fa: 'بستن' },
  takeHome: { de: 'Drei Regeln mitnehmen', en: 'Three takeaways', fa: 'سه نکتهٔ کلیدی' },
  sources: { de: 'Quellen und Grenzen', en: 'Sources and scope', fa: 'منابع و محدوده' },
}

const sectionTitles = [
  { id: 'cortical', icon: 'scan' },
  { id: 'deep-gray', icon: 'brain' },
  { id: 'interpret', icon: 'compare' },
  { id: 'self-check', icon: 'check' },
  { id: 'take-home', icon: 'summary', emphasis: true },
]

function Icon({ name }) {
  const paths = {
    scan: 'M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z',
    brain: 'M12 4a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V4m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V4',
    compare: 'M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4',
    check: 'm4 12 5 5L20 6',
    summary: 'm12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z',
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name] || paths.scan} /></svg>
}

function CjdDiagram({ lang }) {
  const labels = lang === 'fa'
    ? ['قشر: ribboning', 'استریاتوم', 'ADC + زمینه']
    : lang === 'en' ? ['Cortex: ribboning', 'Striatum', 'ADC + context'] : ['Kortex: Ribboning', 'Striatum', 'ADC + Kontext']
  const deep = lang === 'fa' ? 'هستهٔ دمی · پوتامن' : lang === 'en' ? 'Caudate · putamen' : 'Caudatus · Putamen'
  return <figure className={styles.diagram}>
    <svg viewBox="0 0 570 170" role="img" aria-label={labels.join(' → ')}>
      {labels.map((label, i) => {
        const x = 20 + i * 182
        return <g key={label}>
          <rect x={x} y="20" width="160" height="112" rx="18" className={styles.diagramCard} />
          {i === 0 ? <g><path d={`M${x+46} 91c-15-34 10-57 35-48 18-18 47-3 38 21 18 20-1 43-24 37-17 14-39 11-49-10z`} fill="#c6e1e8" stroke="#4189a7" strokeWidth="3"/><path d={`M${x+56} 65q18-12 36-3t21 0M${x+51} 82q18-10 37-2t20 0`} fill="none" stroke="#dc7078" strokeWidth="4" strokeLinecap="round"/></g>
            : i === 1 ? <g><path d={`M${x+53} 58c13-16 30-12 32 4 3 15-13 21-26 17-12-3-17-11-6-21zm37 0c13-16 30-12 32 4 3 15-13 21-26 17-12-3-17-11-6-21z`} fill="#d6c5e0" stroke="#825b93" strokeWidth="3"/><text x={x+80} y="110" textAnchor="middle" className={styles.diagramSmall}>{deep}</text></g>
              : <g><path d={`M${x+50} 49h60v22H${x+50}zm0 34h60v22H${x+50}z`} fill="#d4eadf" stroke="#39876a" strokeWidth="2"/><text x={x+80} y="64" textAnchor="middle" className={styles.diagramSmall}>DWI</text><text x={x+80} y="99" textAnchor="middle" className={styles.diagramSmall}>ADC</text></g>}
          <foreignObject x={x+8} y="138" width="144" height="26"><div xmlns="http://www.w3.org/1999/xhtml" className={styles.diagramLabel}>{label}</div></foreignObject>
        </g>
      })}
    </svg>
    <figcaption>{lang === 'fa' ? 'شماتیک آموزشی است، نه تصویر واقعی بیمار.' : lang === 'en' ? 'Educational schematic, not a patient image.' : 'Konzeptgrafik, kein Patientenbild.'}</figcaption>
  </figure>
}

function CaseFigure({ figure, id, lang }) {
  return <figure id={id} className={styles.caseFigure}>
    <img src={figure.src} alt={value(figure.alt, lang)} width="1000" height="650" />
    <figcaption>{figure.credit}</figcaption>
  </figure>
}

function Paragraphs({ text }) {
  return text.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)
}

function CaseFigures({ lang }) {
  return <div className={styles.cases}>
    <CaseFigure id="source-pdf" figure={C.figures[0]} lang={lang} />
  </div>
}

function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  const t = lang === 'fa' ? 'خودآزمایی: تطبیق DWI و ADC' : lang === 'en' ? 'Self-check: compare DWI and ADC' : 'Selbstcheck: DWI und ADC vergleichen'
  return <section className={styles.quiz} aria-labelledby="cjd-self-check">
    <h3 id="cjd-self-check">{t}</h3><p>{value(C.assessment.question, lang)}</p>
    <div className={styles.options}>{C.assessment.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{value(option, lang)}</button>)}</div>
    {answer !== null ? <p role="status" className={styles.feedback}>{value(answer === C.assessment.correctIndex ? C.assessment.feedback : C.assessment.retry, lang)}</p> : null}
  </section>
}

export default function CjdLessonPage() {
  const { lang } = useLanguage()
  const chapter = lang === 'fa' ? 'مغز' : lang === 'en' ? 'Brain' : 'Gehirn'
  const t = lang === 'fa' ? 'منابع و محدودیت‌ها' : lang === 'en' ? 'Sources and limits' : 'Quellen und Grenzen'
  const sections = [...C.chapters.map(item => ({ id: item.id, label: value(item.title, lang), icon: sectionTitles.find(s => s.id === item.id)?.icon })),
    { id: 'self-check', label: lang === 'fa' ? 'خودآزمایی' : lang === 'en' ? 'Self-check' : 'Selbstcheck', icon: 'check' },
    { id: 'take-home', label: lang === 'fa' ? 'سه نکتهٔ کلیدی' : lang === 'en' ? 'Three takeaways' : 'Drei Merksätze', icon: 'summary', emphasis: true },
  ]
  const sources = C.references.map((ref, index) => ({ tag: index === 0 ? 'PDF · pp.75–76' : 'REFERENCE', title: ref.label, href: ref.href || '#source-pdf', citation: ref.href ? ref.href : 'Gehirn.pdf · printed pp.74–75', scope: '' }))
  const summary = C.takeaways || [
    { title: { de: 'Verteilung', en: 'Distribution', fa: 'توزیع' }, detail: { de: 'Kortex, Caudatus/Putamen und Thalamus systematisch prüfen.', en: 'Systematically assess cortex, caudate/putamen, and thalamus.', fa: 'قشر، هستهٔ دمی/پوتامن و تالاموس را نظام‌مند بررسی کنید.' } },
    { title: { de: 'DWI und ADC', en: 'DWI and ADC', fa: 'DWI و ADC' }, detail: { de: 'DWI-Hyperintensität mit ADC abgleichen; DWI allein beweist keine Restriktion.', en: 'Compare DWI hyperintensity with ADC; DWI alone does not prove restriction.', fa: 'افزایش سیگنال DWI را با ADC تطبیق دهید؛ DWI به‌تنهایی محدودیت انتشار را ثابت نمی‌کند.' } },
    { title: { de: 'Klinischer Kontext', en: 'Clinical context', fa: 'زمینهٔ بالینی' }, detail: { de: 'MRT-Muster sind Hinweise und müssen mit Verlauf und Differenzialdiagnosen verbunden werden.', en: 'MRI patterns are clues and must be integrated with the clinical course and differential.', fa: 'الگوهای MRI سرنخ هستند و باید با سیر بالینی و تشخیص‌های افتراقی ترکیب شوند.' } },
  ]

  return <StandardLessonShell lessonId="creutzfeldt-jakob" lang={lang} title={value(C.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: lang === 'de' ? '/' : `/?lang=${lang}` }, { label: chapter, href: lang === 'de' ? '/lernen/gehirn' : `/lernen/gehirn?lang=${lang}` }, { label: value(C.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(labels).map(([key, item]) => [key, value(item, lang)]))} actions={{}}
    renderIcon={name => <Icon name={name} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/cjd/pattern-overview.svg', heroImageOpacity: .7, accent: '#58b5c2', accentStrong: '#185d69', accentSoft: '#e2f3f4', secondary: '#d18469', secondaryStrong: '#784632', heroBase: '#102734' }}
    className={styles.page} heroImageAlt={lang === 'fa' ? 'شماتیک غیرتشخیصی: حاشیهٔ نارنجی پیرامونی قشر را نشان می‌دهد و دو هستهٔ عمقی بنفش‌اند؛ این تصویر بیمار نیست و جایگزین DWI یا ADC واقعی نمی‌شود.' : lang === 'en' ? 'Non-diagnostic schematic: the orange outer rim marks cortex and the paired purple ovals represent deep grey nuclei; this is not a patient image or a substitute for actual DWI/ADC.' : 'Nichtdiagnostisches Schema: Der orange Rand markiert den Kortex, die beiden violetten Ovale stehen für tiefe graue Kerne; kein Patientenbild und kein Ersatz für echte DWI-/ADC-Aufnahmen.'} syncHashNavigation
    sources={<LessonSources title={t} items={sources} note={value(C.media, lang)} />}>
    <LessonSection id="cortical" title={value(C.chapters[0].title, lang)} icon="scan">
      <p className={styles.lead}>{value(C.objective, lang)}</p><Paragraphs text={value(C.chapters[0].text, lang)} /><CjdDiagram lang={lang} /><CaseFigures lang={lang} />
    </LessonSection>
    <LessonSection id="deep-gray" title={value(C.chapters[1].title, lang)} icon="brain"><Paragraphs text={value(C.chapters[1].text, lang)} /><CaseFigure id="source-pdf-deep-gray" figure={C.figures[1]} lang={lang} /></LessonSection>
    <LessonSection id="interpret" title={value(C.chapters[2].title, lang)} icon="compare"><Paragraphs text={value(C.chapters[2].text, lang)} /></LessonSection>
    <LessonSection id="self-check" title={sections[3].label} icon="check"><Check lang={lang} /></LessonSection>
    <LessonSection id="take-home" title={sections[4].label} icon="summary"><TakeHomeList items={summary.map(item => ({ title: value(item.title, lang), detail: value(item.detail, lang) }))} /></LessonSection>
  </StandardLessonShell>
}
