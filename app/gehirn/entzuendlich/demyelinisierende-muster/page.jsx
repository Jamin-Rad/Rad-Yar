'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { DEMYELINATION_COPY as C, DEMYELINATION_IDS, DEMYELINATION_PATH, DEMYELINATION_SECTIONS, DEMYELINATION_SOURCES } from '@/data/gehirnDemyelinationLesson'
import styles from './page.module.css'

const value = (item, lang) => item[lang]
const labels = {
  contents: { de: 'Lektionsinhalt', en: 'Lesson contents', fa: 'محتوای درس' },
  path: { de: 'Lernpfad', en: 'Learning path', fa: 'مسیر یادگیری' },
  progress: { de: 'gelesen', en: 'read', fa: 'خوانده‌شده' },
  continue: { de: 'Lektion fortsetzen', en: 'Continue lesson', fa: 'ادامهٔ درس' },
  completeLesson: { de: 'Ganze Lektion als gelesen markieren', en: 'Mark the whole lesson as read', fa: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده' },
  lessonCompleted: { de: 'Ganze Lektion gelesen', en: 'Full lesson marked as read', fa: 'کل درس خوانده شد' },
  complete: { de: 'Abschnitt als gelesen markieren', en: 'Mark section as read', fa: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده' },
  completed: { de: 'Gelesen', en: 'Read', fa: 'خوانده شد' },
  open: { de: 'Abschnitt öffnen', en: 'Open section', fa: 'بازکردن بخش' },
  close: { de: 'Schließen', en: 'Close', fa: 'بستن' },
  takeHome: { de: 'Kernaussagen', en: 'Key points', fa: 'نکات کلیدی' },
  sources: { de: 'Quellen und Umfang', en: 'Sources and scope', fa: 'منابع و دامنه' },
  practice: { de: 'Selbstcheck', en: 'Self-check', fa: 'خودآزمایی' },
  cards: { de: 'Karteikarten', en: 'Flashcards', fa: 'فلش‌کارت‌ها' },
}
const titles = [
  { de: 'Wie lesen Sie die Verteilung?', en: 'How do you read the distribution?', fa: 'توزیع را چگونه ارزیابی می‌کنید؟' },
  { de: 'Welche Muster helfen bei der Abgrenzung?', en: 'Which patterns help with differentiation?', fa: 'کدام الگوها به افتراق کمک می‌کنند؟' },
  { de: 'Selbstcheck: Was stützt die Aussage?', en: 'Self-check: what supports the interpretation?', fa: 'خودآزمایی: چه چیزی از تفسیر پشتیبانی می‌کند؟' },
  { de: 'Vier Regeln für den Befund', en: 'Four reporting rules', fa: 'چهار قاعده برای گزارش' },
]

function PatternDiagram({ lang }) {
  return <figure className={styles.visual}>
    <figcaption>{value(C.visualCaption, lang)}</figcaption>
    <img src={`/educational/demyelinisierende-muster/pattern-map-${lang}.svg`} width="960" height="480" alt={value(C.heroAlt, lang)} />
    <ul>{C.visualLegend.map((item, index) => <li key={index}>{value(item, lang)}</li>)}</ul>
  </figure>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const t = key => value(labels[key], lang)
  return <section className={styles.check} aria-labelledby="demyelination-check">
    <h3 id="demyelination-check">{t('practice')}</h3><p>{value(C.question, lang)}</p>
    <div className={styles.options}>{C.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{value(option, lang)}</button>)}</div>
    {answer !== null ? <p role="status" className={styles.feedback}>{value(C.feedback[answer], lang)}</p> : null}
  </section>
}

const icons = {
  scan: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V4h4m8 0h4v4M20 16v4h-4M8 20H4v-4M7 12h10M12 7v10"/></svg>,
  compare: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4"/></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6"/></svg>,
  summary: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z"/></svg>,
}

export default function DemyelinatingPatternsLesson() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const t = key => value(labels[key], lang)
  const langPath = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = DEMYELINATION_SECTIONS.map((section, index) => ({ ...section, label: value(titles[index], lang) }))
  const sources = DEMYELINATION_SOURCES.map(source => ({ ...source, tag: value(source.tag, lang), citation: value(source.citation, lang), scope: value(source.scope, lang) }))
  return <StandardLessonShell lessonId={DEMYELINATION_IDS[0]} lang={lang} title={value(C.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langPath('/') }, { label: value(C.chapter, lang), href: langPath('/lernen/gehirn') }, { label: value(C.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(labels).map(([key, item]) => [key, value(item, lang)]))} actions={{}}
    renderIcon={id => icons[id] || icons.scan}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: `/educational/demyelinisierende-muster/pattern-map-${lang}.svg`, heroImageOpacity: .9, accent: '#61b5c4', accentStrong: '#185d69', accentSoft: '#e2f3f4', secondary: '#a78bfa', secondaryStrong: '#5b3c87', heroBase: '#102734' }}
    className={styles.page} heroImageAlt={value(C.heroAlt, lang)} syncHashNavigation
    sources={<LessonSources title={t('sources')} items={sources} note={`${value(C.scope, lang)} ${value(C.sourcesNote, lang)}`} />}>
    <div lang={lang} dir={rtl ? 'rtl' : 'ltr'}>
      <LessonSection id="orient" title={value(titles[0], lang)} icon="scan">
        <p className={styles.lead}>{value(C.objective, lang)}</p><p>{value(C.intro, lang)}</p>
        <PatternDiagram lang={lang}/>
        <aside className={styles.caveat}><strong>{lang === 'fa' ? 'محدودیت تفسیر' : lang === 'en' ? 'Interpretation limit' : 'Interpretationsgrenze'}</strong><p>{value(C.caveat, lang)}</p></aside>
      </LessonSection>
      <LessonSection id="compare" title={value(titles[1], lang)} icon="compare">
        <p className={styles.lead}>{lang === 'fa' ? 'این مقایسه، سرنخ‌های تصویربرداری را خلاصه می‌کند؛ هیچ خانه‌ای معیار تشخیصی مستقل نیست.' : lang === 'en' ? 'This comparison summarizes imaging clues; no cell is a standalone diagnostic criterion.' : 'Der Vergleich fasst Bildhinweise zusammen; keine Tabellenzelle ist ein eigenständiges Diagnosekriterium.'}</p>
        <div className={styles.tableScroll} role="region" tabIndex={0} aria-label={lang === 'fa' ? 'مقایسهٔ الگوهای تصویربرداری' : lang === 'en' ? 'Imaging pattern comparison' : 'Vergleich der Bildmuster'}>
          <table><thead><tr><th scope="col">{lang === 'fa' ? 'یافته' : lang === 'en' ? 'Feature' : 'Merkmal'}</th><th scope="col">MS</th><th scope="col">NMOSD</th><th scope="col">MOGAD</th><th scope="col">ADEM</th></tr></thead><tbody>{C.comparison.map(row => <tr key={row.feature.en}><th scope="row">{value(row.feature, lang)}</th><td>{value(row.ms, lang)}</td><td>{value(row.nmosd, lang)}</td><td>{value(row.mog, lang)}</td><td>{value(row.adem, lang)}</td></tr>)}</tbody></table>
        </div>
      </LessonSection>
      <LessonSection id="self-check" title={value(titles[2], lang)} icon="check"><SelfCheck lang={lang}/></LessonSection>
      <LessonSection id="take-home" title={value(titles[3], lang)} icon="summary"><TakeHomeList items={C.summary.map((item, index) => ({ title: value([{ de: 'Zuerst beschreiben', en: 'Describe first', fa: 'ابتدا توصیف کنید' }, { de: 'Optik und Myelon prüfen', en: 'Check optic pathways and cord', fa: 'راه بینایی و نخاع را بررسی کنید' }, { de: 'Überlappung berücksichtigen', en: 'Allow for overlap', fa: 'هم‌پوشانی را در نظر بگیرید' }, { de: 'Befund integrieren', en: 'Integrate the findings', fa: 'یافته‌ها را یکپارچه کنید' }][index], lang), detail: value(item, lang) }))}/></LessonSection>
      <p className={styles.curriculum}>{lang === 'fa' ? 'موضوع‌های مرتبط در برنامهٔ درسی:' : lang === 'en' ? 'Related curriculum topics:' : 'Verknüpfte Themen im Curriculum:'}{' '}{DEMYELINATION_IDS.map((id, index) => <span key={id}>{index ? ' · ' : ''}{id === 'multiple-sklerose' ? 'MS' : id.toUpperCase()}</span>)}</p>
    </div>
  </StandardLessonShell>
}
