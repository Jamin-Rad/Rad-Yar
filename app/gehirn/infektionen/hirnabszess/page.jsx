'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { HIRNABZESS_COPY as C, HIRNABZESS_ID, HIRNABZESS_SECTIONS, HIRNABZESS_SOURCES } from '@/data/gehirnHirnabszessLesson'
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
  { de: 'Wie lesen Sie das Zentrum und den Rand?', en: 'How do you read the centre and rim?', fa: 'مرکز و حاشیه را چگونه بررسی می‌کنید؟' },
  { de: 'Wie verbinden Sie die Befunde?', en: 'How do you integrate the findings?', fa: 'یافته‌ها را چگونه کنار هم می‌گذارید؟' },
  { de: 'Was trennt Abszess und Tumor – und was nicht?', en: 'What separates abscess from tumour, and what does not?', fa: 'چه چیزی آبسه را از تومور جدا می‌کند و چه چیزی نه؟' },
  { de: 'Selbstcheck: Was trägt die Aussage?', en: 'Self-check: what supports the conclusion?', fa: 'خودآزمایی: چه چیزی از نتیجه حمایت می‌کند؟' },
  { de: 'Vier übertragbare Merksätze', en: 'Four transferable takeaways', fa: 'چهار نکتهٔ کاربردی' },
]
const icons = {
  scan: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V4h4m8 0h4v4M20 16v4h-4M8 20H4v-4M7 12h10M12 7v10" /></svg>,
  brain: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5" /></svg>,
  compare: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4" /></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6" /></svg>,
  summary: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z" /></svg>,
}

function ConceptDiagram({ lang }) {
  return <figure className={styles.diagram}>
    <figcaption>{value(C.visualCaption, lang)}</figcaption>
    <img src="/educational/hirnabszess/hero.svg" width="840" height="430" alt={value(C.heroAlt, lang)} />
    <ul className={styles.diagramLegend}>{C.visualLegend.map((item, index) => <li key={index}>{value(item, lang)}</li>)}</ul>
  </figure>
}

function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  const t = key => value(labels[key], lang)
  return <section className={styles.check} aria-labelledby="abscess-self-check">
    <h3 id="abscess-self-check">{t('practice')}</h3><p>{value(C.question, lang)}</p>
    <div className={styles.options}>{C.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{value(option, lang)}</button>)}</div>
    {answer !== null ? <p role="status" className={styles.feedback}>{value(C.feedback[answer], lang)}</p> : null}
  </section>
}

export default function HirnabszessLesson() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const t = key => value(labels[key], lang)
  const langPath = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = HIRNABZESS_SECTIONS.map((section, index) => ({ ...section, label: value(titles[index], lang) }))
  const sources = HIRNABZESS_SOURCES.map(source => ({ ...source, citation: value(source.citation, lang), scope: value(source.scope, lang) }))
  return <StandardLessonShell lessonId={HIRNABZESS_ID} lang={lang} title={value(C.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langPath('/') }, { label: value(C.chapter, lang), href: langPath('/lernen/gehirn') }, { label: value(C.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(labels).map(([key, item]) => [key, value(item, lang)]))} actions={{}}
    renderIcon={id => icons[id] || icons.scan}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/hirnabszess/hero.svg', heroImageOpacity: .92, accent: '#58b5c2', accentStrong: '#185d69', accentSoft: '#e2f3f4', secondary: '#d18469', secondaryStrong: '#784632', heroBase: '#102734' }}
    className={styles.page} heroImageAlt={value(C.heroAlt, lang)} syncHashNavigation
    sources={<LessonSources title={t('sources')} items={sources} note={value(C.sourcesNote, lang)} />}>
    <div lang={lang} dir={rtl ? 'rtl' : 'ltr'}>
      <LessonSection id="read-pattern" title={value(titles[0], lang)} icon="scan">
        <p className={styles.lead}>{value(C.objective, lang)}</p><p>{value(C.intro, lang)}</p>
        <aside className={styles.urgency}><strong>{lang === 'fa' ? 'اقدام فوری' : lang === 'en' ? 'Urgency' : 'Dringlichkeit'}</strong><p>{value(C.urgency, lang)}</p></aside>
        <ConceptDiagram lang={lang}/>
        <div className={styles.sequence}>{C.sequence.map((item, index) => <section key={index}><h3>{value(item.title, lang)}</h3><p>{value(item.text, lang)}</p></section>)}</div>
      </LessonSection>
      <LessonSection id="integrate" title={value(titles[1], lang)} icon="brain">
        <h3>{lang === 'fa' ? 'سیر کلی، نه تقویم قطعی' : lang === 'en' ? 'A broad progression, not a fixed calendar' : 'Grobe Entwicklung, kein fester Zeitplan'}</h3>
        <p>{value(C.stage, lang)}</p>
        <h3>{lang === 'fa' ? 'حاشیهٔ دوگانه در SWI' : lang === 'en' ? 'The SWI dual-rim sign' : 'Dual-Rim-Zeichen in SWI'}</h3><p>{value(C.dualRim, lang)}</p>
        <p className={styles.caseLink}>{lang === 'fa' ? 'برای مشاهدهٔ کیس واقعی و سکانس‌ها:' : lang === 'en' ? 'View the real case and its sequence stack:' : 'Realen Fall und die Sequenzen ansehen:'}{' '}<a href="https://radiopaedia.org/cases/brain-abscess-with-dual-rim-sign-1" target="_blank" rel="noreferrer">{lang === 'fa' ? 'کیس Radiopaedia با علامت حاشیهٔ دوگانه' : lang === 'en' ? 'Radiopaedia case: brain abscess with dual-rim sign' : 'Radiopaedia-Fall: Hirnabszess mit Dual-Rim-Zeichen'}</a></p>
        <figure className={styles.caseFigure}>
          <img className={styles.caseImage} src="/educational/hirnabszess/radiopaedia-dual-rim-luu-hanh.jpeg" alt={value(C.caseFigureAlt, lang)} />
          <figcaption>{value(C.caseFigureCaption, lang)}</figcaption>
        </figure>
      </LessonSection>
      <LessonSection id="differentiate" title={value(titles[2], lang)} icon="compare">
        <p>{value(C.caveat, lang)}</p>
        <div className={styles.tableScroll} role="region" tabIndex={0} aria-label={lang === 'fa' ? 'مقایسهٔ آبسه و تومور' : lang === 'en' ? 'Abscess and tumour comparison' : 'Vergleich Abszess und Tumor'}>
          <table><thead><tr><th scope="col">{lang === 'fa' ? 'ویژگی' : lang === 'en' ? 'Feature' : 'Merkmal'}</th><th scope="col">{lang === 'fa' ? 'آبسهٔ پیوژنیک' : lang === 'en' ? 'Pyogenic abscess' : 'Pyogener Abszess'}</th><th scope="col">{lang === 'fa' ? 'تومور نکروتیک' : lang === 'en' ? 'Necrotic tumour' : 'Nekrotischer Tumor'}</th></tr></thead>
          <tbody>{C.differential.map((row, index) => <tr key={index}><th scope="row">{value(row.feature, lang)}</th><td>{value(row.abscess, lang)}</td><td>{value(row.tumour, lang)}</td></tr>)}</tbody></table>
        </div>
      </LessonSection>
      <LessonSection id="self-check" title={value(titles[3], lang)} icon="check"><Check lang={lang}/></LessonSection>
      <LessonSection id="take-home" title={value(titles[4], lang)} icon="summary"><TakeHomeList items={C.summary.map((item, index) => ({ title: value([{ de: 'Diffusion im Zentrum', en: 'Diffusion at the centre', fa: 'انتشار در مرکز' }, { de: 'Kapsel und Verteilung', en: 'Capsule and distribution', fa: 'کپسول و توزیع' }, { de: 'Dual-Rim-Zeichen', en: 'Dual-rim sign', fa: 'علامت حاشیهٔ دوگانه' }, { de: 'Klinische Einordnung', en: 'Clinical context', fa: 'زمینهٔ بالینی' }][index], lang), detail: value(item, lang) }))}/></LessonSection>
    </div>
  </StandardLessonShell>
}
