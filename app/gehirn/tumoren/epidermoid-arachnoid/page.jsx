'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { EPIDERMOID_ARACHNOID_COPY as C, EPIDERMOID_ARACHNOID_ID, EPIDERMOID_ARACHNOID_SECTIONS, EPIDERMOID_ARACHNOID_SOURCES } from '@/data/gehirnEpidermoidArachnoidLesson'
import styles from './page.module.css'

const value = (item, lang) => item[lang]
const L = (de, en, fa) => ({ de, en, fa })
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
  practice: { de: 'Selbstcheck', en: 'Self-check', fa: 'خودآزمایی' },
  cards: { de: 'Karteikarten', en: 'Flashcards', fa: 'فلش‌کارت‌ها' },
}
const sectionTitles = [
  { de: 'Warum helfen T1 und T2 allein wenig?', en: 'Why do T1 and T2 alone help little?', fa: 'چرا T1 و T2 به‌تنهایی کافی نیستند؟' },
  { de: 'Wie unterscheiden FLAIR und DWI/ADC?', en: 'How do FLAIR and DWI/ADC differ?', fa: 'FLAIR و DWI/ADC چگونه افتراق می‌دهند؟' },
  { de: 'Welche Grenzen bleiben?', en: 'What are the remaining limits?', fa: 'چه محدودیت‌هایی باقی می‌مانند؟' },
  { de: 'Selbstcheck: Was spricht wofür?', en: 'Self-check: which pattern is supported?', fa: 'خودآزمایی: کدام الگو پشتیبانی می‌شود؟' },
  { de: 'Kernaussagen', en: 'Key points', fa: 'نکات کلیدی' },
]
const icons = {
  scan: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V4h4m8 0h4v4M20 16v4h-4M8 20H4v-4M7 12h10M12 7v10" /></svg>,
  compare: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4" /></svg>,
  brain: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5" /></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6" /></svg>,
  summary: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z" /></svg>,
}

function PatternDiagram({ lang }) {
  return <figure className={styles.patternDiagram}>
    <figcaption>{lang === 'fa' ? 'شماتیک مفهومی، نه تصویر تشخیصی' : lang === 'en' ? 'Concept schematic, not a diagnostic image' : 'Konzeptschema, kein diagnostisches Bild'}</figcaption>
    <img src="/educational/epidermoid-arachnoid/hero.svg" alt={value(C.heroAlt, lang)} width="840" height="410" />
    <div className={styles.diagramColumns} dir="ltr"><span aria-hidden="true"/><strong dir={lang === 'fa' ? 'rtl' : 'ltr'}>{lang === 'fa' ? 'اپیدرموئید' : 'Epidermoid'}</strong><strong dir={lang === 'fa' ? 'rtl' : 'ltr'}>{lang === 'fa' ? 'آراکنوئید' : lang === 'en' ? 'Arachnoid cyst' : 'Arachnoidalzyste'}</strong></div>
    <ol>{C.diagramLegend.map((item, index) => <li key={index}>{value(item, lang)}</li>)}</ol>
  </figure>
}

function CaseImageSet({ lang }) {
  const srcs = ['case-t1.png', 'case-t2.png', 'case-flair.png', 'case-t1c.png', 'case-dwi.png']
  return <figure className={styles.caseFigure}>
    <figcaption className={styles.caseTitle}>{value(C.sourceCaseTitle, lang)}</figcaption>
    <div className={styles.caseGrid}>{srcs.map((src, index) => <figure key={src}>
      <img src={`/educational/epidermoid-arachnoid/${src}`} alt={`${value(C.sourceCaseAlt, lang)} · ${value(C.sequenceLabels[index], lang)}`} />
      <figcaption>{value(C.sequenceLabels[index], lang)}</figcaption>
    </figure>)}</div>
    <figcaption className={styles.caseCaption}>{value(C.sourceCaseCaption, lang)} <a href="https://doi.org/10.53347/rID-9772" target="_blank" rel="noreferrer">Radiopaedia rID 9772</a></figcaption>
  </figure>
}

function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  return <div className={styles.check}>
    <p>{value(C.question, lang)}</p>
    <div className={styles.options}>{C.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{value(option, lang)}</button>)}</div>
    {answer !== null ? <p role="status" className={styles.feedback}>{value(C.feedback[answer], lang)}</p> : null}
  </div>
}

export default function EpidermoidArachnoidLesson() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const t = key => value(labels[key], lang)
  const langPath = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = EPIDERMOID_ARACHNOID_SECTIONS.map((section, i) => ({ ...section, label: value(sectionTitles[i], lang) }))
  const sources = EPIDERMOID_ARACHNOID_SOURCES.map(source => ({ ...source, citation: value(source.citation, lang), scope: value(source.scope, lang) }))
  return <StandardLessonShell lessonId={EPIDERMOID_ARACHNOID_ID} lang={lang} title={value(C.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langPath('/') }, { label: value(C.chapter, lang), href: langPath('/lernen/gehirn') }, { label: value(C.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(labels).map(([key, val]) => [key, value(val, lang)]))} actions={{}}
    renderIcon={id => icons[id] || icons.scan}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/epidermoid-arachnoid/hero.svg', heroImageOpacity: .9, accent: '#48b5c8', accentStrong: '#155d70', accentSoft: '#e0f4f6', secondary: '#d18b53', secondaryStrong: '#704325', heroBase: '#102535' }}
    className={styles.page} heroImageAlt={value(C.heroAlt, lang)} syncHashNavigation
    sources={<LessonSources title={t('sources')} items={sources} note={value(C.sourcesNote, lang)} />}>
    <div lang={lang} dir={rtl ? 'rtl' : 'ltr'}>
      <LessonSection id="pattern" title={value(sectionTitles[0], lang)} icon="scan"><p className={styles.lead}>{value(C.objective, lang)}</p><p>{value(C.intro, lang)}</p><PatternDiagram lang={lang} /><CaseImageSet lang={lang} /></LessonSection>
      <LessonSection id="compare" title={value(sectionTitles[1], lang)} icon="compare"><p>{value(C.pattern, lang)}</p><p>{value(C.compare, lang)}</p><div className={styles.tableScroll} role="region" tabIndex={0} aria-label={lang === 'fa' ? 'جدول مقایسه' : lang === 'en' ? 'Pattern comparison table' : 'Mustervergleich'}><table><thead><tr><th scope="col">{lang === 'fa' ? 'ویژگی' : lang === 'en' ? 'Feature' : 'Merkmal'}</th><th scope="col">{lang === 'fa' ? 'اپیدرموئید' : lang === 'en' ? 'Epidermoid' : 'Epidermoid'}</th><th scope="col">{lang === 'fa' ? 'آراکنوئید' : lang === 'en' ? 'Arachnoid cyst' : 'Arachnoidalzyste'}</th></tr></thead><tbody>
        {[
          [L('T1/T2', 'T1/T2', 'T1/T2'), L('Liquorähnlich', 'CSF-like', 'شبیه CSF'), L('Liquorähnlich', 'CSF-like', 'شبیه CSF')],
          [L('FLAIR', 'FLAIR', 'FLAIR'), L('Inhomogenes Restsignal („dirty CSF“)', 'Heterogeneous residual signal (“dirty CSF”)', 'سیگنال باقیماندهٔ ناهمگون («CSF کثیف»)'), L('Weitgehende Liquorunterdrückung', 'Near-complete CSF suppression', 'سرکوب تقریباً کامل مانند CSF')],
          [L('DWI / ADC', 'DWI / ADC', 'DWI / ADC'), L('DWI meist hell; ADC unter freiem Liquor, oft parenchymnah', 'Often bright on DWI; ADC below free CSF, often closer to parenchyma', 'اغلب روشن در DWI؛ ‏ADC کمتر از CSF آزاد و اغلب نزدیک به پارانشیم'), L('DWI folgt eher Liquor; hoher ADC wie freier Liquor', 'DWI more closely follows CSF; high ADC like free CSF', 'DWI بیشتر از CSF پیروی می‌کند؛ ADC بالا و مانند CSF آزاد')],
        ].map(([feature, epidermoid, arachnoid], index) => <tr key={index}><th scope="row">{value(feature, lang)}</th><td>{value(epidermoid, lang)}</td><td>{value(arachnoid, lang)}</td></tr>)}
      </tbody></table></div><p>{value(C.shape, lang)}</p></LessonSection>
      <LessonSection id="limits" title={value(sectionTitles[2], lang)} icon="brain"><p>{value(C.enhancement, lang)}</p><p>{value(C.ctNote, lang)}</p><aside className={styles.warning}><strong>{lang === 'fa' ? 'نکتهٔ احتیاطی' : lang === 'en' ? 'Caution' : 'CAVE'}</strong><p>{value(C.warning, lang)}</p></aside><p className={styles.clinicalNote}>{value(C.clinicalContext, lang)}</p></LessonSection>
      <LessonSection id="self-check" title={value(sectionTitles[3], lang)} icon="check"><Check lang={lang} /></LessonSection>
      <LessonSection id="take-home" title={value(sectionTitles[4], lang)} icon="summary" emphasis><TakeHomeList items={C.takeaway.map(item => ({ title: value(item.title, lang), detail: value(item.detail, lang) }))} /></LessonSection>
    </div>
  </StandardLessonShell>
}
