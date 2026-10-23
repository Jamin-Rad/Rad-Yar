'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { BRAIN_METASTASES_COPY as C, BRAIN_METASTASES_ID, BRAIN_METASTASES_SECTIONS as SECTION_DATA, BRAIN_METASTASES_SOURCES } from '@/data/gehirnHirnmetastasenLesson'
import styles from './page.module.css'

const value = (v, lang) => v[lang]
const labels = {
  contents: { de: 'Lektionsinhalt', en: 'Lesson contents', fa: 'محتوای درس' },
  path: { de: 'Lernpfad', en: 'Learning path', fa: 'مسیر یادگیری' },
  progress: { de: 'gelesen', en: 'read', fa: 'خوانده‌شده' },
  continue: { de: 'Lektion fortsetzen', en: 'Continue lesson', fa: 'ادامهٔ درس' },
  completeLesson: { de: 'Ganze Lektion als gelesen markieren', en: 'Mark the whole lesson as read', fa: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده' },
  lessonCompleted: { de: 'Ganze Lektion gelesen', en: 'Full lesson marked as read', fa: 'کل درس خوانده شد' },
  complete: { de: 'Abschnitt als gelesen markieren', en: 'Mark section as read', fa: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده' },
  completed: { de: 'Als gelesen markiert', en: 'Marked as read', fa: 'خوانده‌شده' },
  open: { de: 'Abschnitt öffnen', en: 'Open section', fa: 'بازکردن بخش' },
  close: { de: 'Schließen', en: 'Close', fa: 'بستن' },
  takeHome: { de: 'Kernaussagen', en: 'Key points', fa: 'نکات کلیدی' },
  sources: { de: 'Quellen und Umfang', en: 'Sources and scope', fa: 'منابع و دامنه' },
  practice: { de: 'Prüfungsfrage', en: 'Practice question', fa: 'سؤال تمرینی' },
  cards: { de: 'Karteikarten', en: 'Flashcards', fa: 'فلش‌کارت‌ها' },
}
const icons = {
  scan: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V4h4m8 0h4v4M20 16v4h-4M8 20H4v-4M7 12h10M12 7v10" /></svg>,
  brain: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5" /></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6" /></svg>,
  summary: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z" /></svg>,
}
const titles = [
  { de: 'Was beschreiben Befundberichte?', en: 'What do radiology reports describe?', fa: 'گزارش تصویربرداری چه چیزی را توصیف می‌کند؟' },
  { de: 'Wie ordnen Sie die Beschreibungen ein?', en: 'How should the descriptors be interpreted?', fa: 'توصیف‌ها را چگونه تفسیر کنید؟' },
  { de: 'Hinweise auf leptomeningeale Ausbreitung', en: 'Clues to leptomeningeal spread', fa: 'سرنخ‌های گسترش لپتومننژیال' },
  { de: 'Selbstcheck: Was ist belegt?', en: 'Self-check: what is supported?', fa: 'خودآزمایی: چه چیزی پشتیبانی می‌شود؟' },
  { de: 'Kernaussagen', en: 'Key points', fa: 'نکات کلیدی' },
]
function Diagram({ lang }) {
  const t = lang === 'fa'
    ? { label: 'توصیف گزارش: یک یا چند ضایعه و ادم احتمالی', lesions: 'یک یا چند ضایعه', edema: 'ادم احتمالی پیرامونی' }
    : lang === 'en'
      ? { label: 'Report descriptors: one or more lesions and possible oedema', lesions: 'One or more lesions', edema: 'Possible surrounding oedema' }
      : { label: 'Befundbegriffe: eine oder mehrere Läsionen, mögliches Ödem', lesions: 'Eine oder mehrere Läsionen', edema: 'Mögliches perifokales Ödem' }
  return <figure className={styles.diagram}>
    <p className={styles.diagramTitle}>{value(C.visualTitle, lang)}</p>
    <svg viewBox="0 0 760 340" role="img" aria-labelledby="brainmets-diagram-title brainmets-diagram-desc">
      <title id="brainmets-diagram-title">{value(C.visualTitle, lang)}</title>
      <desc id="brainmets-diagram-desc">{value(C.visualCaption, lang)}</desc>
      <path d="M122 188c-25-33-8-85 27-103 15-39 61-53 94-29 35-36 91-17 98 23 44 4 65 51 43 86 13 36-16 75-52 76-25 36-77 33-100 2-32 24-78 12-88-22-13 1-22-12-22-33Z" fill="#eaf3f4" stroke="#527f8d" strokeWidth="4" />
      <path d="M204 133c27-16 54-13 79 0M290 113c22 12 37 31 42 52M194 199c32 16 65 16 91 2" fill="none" stroke="#b8d1d5" strokeWidth="15" strokeLinecap="round" />
      <circle cx="195" cy="129" r="26" fill="#e6a35d" fillOpacity=".2" /><circle cx="195" cy="129" r="11" fill="#b94f4f" />
      <circle cx="321" cy="162" r="26" fill="#e6a35d" fillOpacity=".2" /><circle cx="321" cy="162" r="11" fill="#b94f4f" />
      <circle cx="237" cy="224" r="26" fill="#e6a35d" fillOpacity=".2" /><circle cx="237" cy="224" r="11" fill="#b94f4f" />
      <path d="M195 95V53h97" fill="none" stroke="#365e6a" strokeWidth="2" /><text x="301" y="58" className={styles.svgLabel}>{t.lesions}</text>
      <path d="M348 162h80v43" fill="none" stroke="#8b5a2c" strokeWidth="2" /><text x="433" y="226" className={styles.svgLabel}>{t.edema}</text>
      <text x="122" y="306" className={styles.svgSub}>{t.label}</text>
    </svg>
    <figcaption className={styles.caption}>{value(C.visualCaption, lang)}</figcaption>
  </figure>
}

function LeptomeningealDiagram({ lang }) {
  const t = lang === 'fa'
    ? { brain: 'سطح مغز و سولکوس‌ها', cerebellum: 'فولیاهای مخچه', roots: 'ریشه‌های دم‌اسبی', linear: 'الگوی خطی یا ندولار', csf: 'فضاهای CSF' }
    : lang === 'en'
      ? { brain: 'Brain surface and sulci', cerebellum: 'Cerebellar folia', roots: 'Cauda equina roots', linear: 'Linear or nodular pattern', csf: 'CSF spaces' }
      : { brain: 'Hirnoberfläche und Sulci', cerebellum: 'Kleinhirnfolia', roots: 'Cauda-equina-Wurzeln', linear: 'Lineares oder noduläres Muster', csf: 'Liquorräume' }
  return <figure className={styles.diagram}>
    <p className={styles.diagramTitle}>{value(C.leptomeningealVisualTitle, lang)}</p>
    <svg viewBox="0 0 760 340" role="img" aria-labelledby="brainmets-lm-title brainmets-lm-desc">
      <title id="brainmets-lm-title">{value(C.leptomeningealVisualTitle, lang)}</title>
      <desc id="brainmets-lm-desc">{value(C.leptomeningealVisualCaption, lang)}</desc>
      <path d="M92 150c-22-34 3-77 39-79 12-39 64-49 91-18 39-23 83 0 84 38 39 11 48 60 20 84-4 39-49 57-78 34-32 25-79 6-79-31-36 5-58-17-57-28Z" fill="#eaf3f4" stroke="#527f8d" strokeWidth="4" />
      <path d="M116 133c22-34 45 31 68-1s41 25 62-2" fill="none" stroke="#b94f4f" strokeWidth="7" strokeLinecap="round" strokeDasharray="2 12" />
      <circle cx="142" cy="114" r="7" fill="#b94f4f" /><circle cx="205" cy="128" r="7" fill="#b94f4f" /><circle cx="261" cy="121" r="7" fill="#b94f4f" />
      <path d="M343 165c19-33 47-32 64 0-14 23-48 25-64 0Z" fill="#eaf3f4" stroke="#527f8d" strokeWidth="4" />
      <path d="M350 157c10-12 13 17 22 0s13 16 22 0" fill="none" stroke="#b94f4f" strokeWidth="5" strokeLinecap="round" />
      <path d="M511 67c-5 56-5 97 0 145m20-145c-5 56-5 97 0 145m20-145c-5 56-5 97 0 145" fill="none" stroke="#527f8d" strokeWidth="4" strokeLinecap="round" />
      <path d="M511 175c-17 18-16 35-29 51m29-44c-2 24-9 41-15 57m35-64c16 19 14 35 28 51m-28-44c2 24 9 41 15 57" fill="none" stroke="#b94f4f" strokeWidth="4" strokeLinecap="round" />
      <path d="M161 87V42h100m-34 99h67m41 24h45m111 28h105" fill="none" stroke="#365e6a" strokeWidth="2" />
      <text x="266" y="47" className={styles.svgLabel}>{t.brain}</text>
      <text x="268" y="193" className={styles.svgLabel}>{t.linear}</text>
      <text x="366" y="142" className={styles.svgLabel}>{t.cerebellum}</text>
      <text x="558" y="203" className={styles.svgLabel}>{t.roots}</text>
      <text x="92" y="303" className={styles.svgSub}>{t.csf}</text>
    </svg>
    <figcaption className={styles.caption}>{value(C.leptomeningealVisualCaption, lang)}</figcaption>
  </figure>
}

function Check({ lang, question, options, feedback, id }) {
  const [answer, setAnswer] = useState(null)
  return <div className={styles.check}>
    <p id={`${id}-question`}>{value(question, lang)}</p>
    <div className={styles.options} role="group" aria-labelledby={`${id}-question`}>{options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{value(option, lang)}</button>)}</div>
    {answer !== null ? <p role="status" className={styles.feedback}>{value(feedback[answer], lang)}</p> : null}
  </div>
}

export default function BrainMetastasesLesson() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const t = key => value(labels[key], lang)
  const langPath = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = SECTION_DATA.map((section, i) => ({ ...section, label: value(titles[i], lang) }))
  const sources = BRAIN_METASTASES_SOURCES.map(source => ({ ...source, tag: source.tag, title: source.title, citation: value(source.citation, lang), scope: value(source.scope, lang) }))
  const returnPath = langPath('/gehirn/tumoren/hirnmetastasen')
  const actions = {
    mcq: { label: t('practice'), href: langPath(`/ueben/quiz?fach=gehirn&n=2&themen=${BRAIN_METASTASES_ID}&from=${encodeURIComponent(returnPath)}`) },
    flashcards: { label: t('cards'), href: langPath(`/flashcards/${BRAIN_METASTASES_ID}?from=${encodeURIComponent(returnPath)}`) },
  }
  return <StandardLessonShell lessonId={BRAIN_METASTASES_ID} lang={lang} title={value(C.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langPath('/') }, { label: value(C.chapter, lang), href: langPath('/lernen/gehirn') }, { label: value(C.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(labels).map(([key, val]) => [key, value(val, lang)]))}
    renderIcon={id => icons[id] || icons.scan} actions={actions}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/hirnmetastasen/hero.svg', heroImageOpacity: .88, accent: '#48b5c8', accentStrong: '#155d70', accentSoft: '#e0f4f6', secondary: '#d18b53', secondaryStrong: '#704325', heroBase: '#102535' }}
    className={styles.page} heroImageAlt={value(C.heroAlt, lang)} syncHashNavigation
    sources={<LessonSources title={t('sources')} items={sources} note={value(C.scopeNote, lang)} />}>
    <div lang={lang} dir={rtl ? 'rtl' : 'ltr'}>
      <LessonSection id="pattern" title={value(titles[0], lang)} icon="scan"><p className={styles.lead}>{value(C.intro, lang)}</p><Diagram lang={lang} /></LessonSection>
      <LessonSection id="review" title={value(titles[1], lang)} icon="brain"><p>{value(C.pattern, lang)}</p><p>{value(C.workflow, lang)}</p><aside className={styles.warning}><strong>{lang === 'fa' ? 'محدودیت' : lang === 'en' ? 'Limit' : 'Grenze'}</strong><p>{value(C.warning, lang)}</p></aside></LessonSection>
      <LessonSection id="leptomeningeal" title={value(titles[2], lang)} icon="brain"><p className={styles.lead}>{value(C.leptomeningeal, lang)}</p><LeptomeningealDiagram lang={lang} /><p>{value(C.leptomeningealWorkflow, lang)}</p><aside className={styles.warning}><strong>{lang === 'fa' ? 'محدودیت' : lang === 'en' ? 'Limit' : 'Grenze'}</strong><p>{value(C.leptomeningealWarning, lang)}</p></aside></LessonSection>
      <LessonSection id="self-check" title={value(titles[3], lang)} icon="check"><Check id="parenchymal-question" lang={lang} question={C.question} options={C.options} feedback={C.feedback} /><Check id="leptomeningeal-question" lang={lang} question={C.leptomeningealQuestion} options={C.leptomeningealOptions} feedback={C.leptomeningealFeedback} /></LessonSection>
      <LessonSection id="take-home" title={value(titles[4], lang)} icon="summary"><TakeHomeList items={C.takeaway.map(item => ({ title: value(item.title, lang), detail: value(item.detail, lang) }))} /></LessonSection>
    </div>
  </StandardLessonShell>
}
