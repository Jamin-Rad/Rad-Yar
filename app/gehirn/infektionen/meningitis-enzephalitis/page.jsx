'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { MENINGITIS_COPY as C, MENINGITIS_ID, MENINGITIS_SECTIONS, MENINGITIS_SOURCES } from '@/data/gehirnMeningitisEnzephalitisLesson'
import styles from './page.module.css'

const value = (item, lang) => item?.[lang] || item?.de || ''
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
const chapterTitles = [
  { de: 'Welches Kompartiment ist betroffen?', en: 'Which compartment is involved?', fa: 'کدام بخش درگیر است؟' },
  { de: 'Wie beschreiben Sie das Muster?', en: 'How do you describe the pattern?', fa: 'الگو را چگونه توصیف می‌کنید؟' },
  { de: 'Selbstcheck: Was lässt sich sagen?', en: 'Self-check: what can you conclude?', fa: 'خودآزمایی: چه نتیجه‌ای می‌توان گرفت؟' },
]
const icons = {
  brain: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5" /></svg>,
  scan: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V4h4m8 0h4v4M20 16v4h-4M8 20H4v-4M7 12h10M12 7v10" /></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6" /></svg>,
}

function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  return <div className={styles.check}>
    <h3>{value(labels.practice, lang)}</h3><p>{value(C.question, lang)}</p>
    <div className={styles.options}>{C.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{value(option, lang)}</button>)}</div>
    {answer !== null ? <p role="status" className={styles.feedback}>{value(C.feedback[answer], lang)}</p> : null}
  </div>
}

export default function MeningitisEnzephalitisLesson() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const t = key => value(labels[key], lang)
  const langPath = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = MENINGITIS_SECTIONS.map((section, index) => ({ ...section, label: value(chapterTitles[index], lang) }))
  const sources = MENINGITIS_SOURCES.map(source => ({ ...source, tag: value(source.tag, lang), citation: value(source.citation, lang), scope: value(source.scope, lang) }))
  return <StandardLessonShell lessonId={MENINGITIS_ID} lang={lang} title={value(C.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langPath('/') }, { label: value(C.chapter, lang), href: langPath('/lernen/gehirn') }, { label: value(C.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(labels).map(([key, item]) => [key, value(item, lang)]))} actions={{}}
    renderIcon={id => icons[id] || icons.brain}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: `/educational/meningitis-enzephalitis/compartments-${lang}.svg`, heroImageOpacity: .92, accent: '#58b5c2', accentStrong: '#185d69', accentSoft: '#e2f3f4', secondary: '#d18469', secondaryStrong: '#784632', heroBase: '#102734' }}
    className={styles.page} heroImageAlt={value(C.heroAlt, lang)} syncHashNavigation
    sources={<LessonSources title={t('sources')} items={sources} note={value(C.sourcesNote, lang)} />}>
    <div lang={lang} dir={rtl ? 'rtl' : 'ltr'}>
      <LessonSection id="compartment" title={value(chapterTitles[0], lang)} icon="brain">
        <p className={styles.lead}>{value(C.objective, lang)}</p><p>{value(C.intro, lang)}</p>
        <figure className={styles.diagram}>
          <figcaption>{value(C.visualCaption, lang)}</figcaption>
          <img src={`/educational/meningitis-enzephalitis/compartments-${lang}.svg`} width="840" height="430" alt={value(C.heroAlt, lang)} />
          <ul className={styles.legend}>{C.visualLegend.map((item, index) => <li key={index}>{value(item, lang)}</li>)}</ul>
        </figure>
        <p className={styles.limit}>{value(C.noScanNote, lang)}</p>
      </LessonSection>
      <LessonSection id="describe" title={value(chapterTitles[1], lang)} icon="scan">
        <div className={styles.concepts}>{C.concepts.map((item, index) => <article key={index}><h3>{value(item.title, lang)}</h3><p>{value(item.text, lang)}</p></article>)}</div>
        <p className={styles.limit}>{value(C.scopeNote, lang)}</p>
      </LessonSection>
      <LessonSection id="self-check" title={value(chapterTitles[2], lang)} icon="check"><Check lang={lang}/></LessonSection>
    </div>
  </StandardLessonShell>
}
