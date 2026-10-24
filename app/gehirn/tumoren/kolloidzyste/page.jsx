'use client'

import { useState } from 'react'
import Link from 'next/link'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { KOLLOID_COPY as C, KOLLOID_PATH, KOLLOID_SECTIONS, KOLLOID_SOURCES } from '@/data/gehirnKolloidzysteLesson'
import styles from './page.module.css'

const labels = {
  contents: { de: 'Lektionsinhalt', en: 'Lesson contents', fa: 'محتوای درس' }, path: { de: 'Lernpfad', en: 'Learning path', fa: 'مسیر یادگیری' },
  progress: { de: 'gelesen', en: 'read', fa: 'خوانده‌شده' }, continue: { de: 'Lektion fortsetzen', en: 'Continue lesson', fa: 'ادامهٔ درس' },
  completeLesson: { de: 'Ganze Lektion als gelesen markieren', en: 'Mark the whole lesson as read', fa: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده' },
  lessonCompleted: { de: 'Ganze Lektion gelesen', en: 'Full lesson marked as read', fa: 'کل درس خوانده شد' },
  complete: { de: 'Abschnitt als gelesen markieren', en: 'Mark section as read', fa: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده' },
  completed: { de: 'Als gelesen markiert', en: 'Marked as read', fa: 'خوانده‌شده' }, open: { de: 'Abschnitt öffnen', en: 'Open section', fa: 'بازکردن بخش' },
  close: { de: 'Schließen', en: 'Close', fa: 'بستن' }, takeHome: { de: 'Vier Regeln mitnehmen', en: 'Four rules to remember', fa: 'چهار قاعده برای یادآوری' },
}
const pick = (value, lang) => value?.[lang] || value?.de || ''
const icons = {
  scan: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 8V4h4m8 0h4v4M20 16v4h-4M8 20H4v-4M7 12h10M12 7v10" /></svg>,
  compare: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4" /></svg>,
  brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m4 12 5 5L20 6" /></svg>,
  summary: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 5h14M5 12h14M5 19h14" /><circle cx="2" cy="5" r="1" /><circle cx="2" cy="12" r="1" /><circle cx="2" cy="19" r="1" /></svg>,
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const c = value => pick(value, lang)
  return <div className={styles.check}>
    <p>{c(C.question)}</p>
    <div className={styles.options}>{C.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{c(option)}</button>)}</div>
    {answer !== null ? <p role="status" className={styles.feedback}>{c(C.feedback[answer])}</p> : null}
  </div>
}

function LocationDiagram({ lang }) {
  const text = {
    de: { alt: 'Nichtdiagnostisches Schema des Ventrikelsystems mit Seitenventrikeln, Foramen Monroi, drittem Ventrikel und einem einzelnen Marker nahe der Öffnung.', lateral: 'Seitenventrikel', foramen: 'Foramen Monroi', third: '3. Ventrikel', lesion: 'Lage einer Kolloidzyste' },
    en: { alt: 'Non-diagnostic ventricular schematic labeled lateral ventricles, foramen of Monro, third ventricle and one marker near the opening.', lateral: 'Lateral ventricles', foramen: 'Foramen of Monro', third: 'Third ventricle', lesion: 'Colloid cyst location' },
    fa: { alt: 'شماتیک غیرتشخیصی دستگاه بطنی با برچسب بطن‌های جانبی، سوراخ مونرو، بطن سوم و یک نشانگر در نزدیکی دهانه.', lateral: 'بطن‌های جانبی', foramen: 'سوراخ مونرو', third: 'بطن سوم', lesion: 'محل احتمالی کیست کلوئید' },
  }[lang] || { alt: '', lateral: '', foramen: '', third: '', lesion: '' }
  return <figure className={styles.figure}>
    <svg viewBox="0 0 840 420" role="img" aria-label={text.alt} className={styles.diagram}>
      <rect width="840" height="420" rx="28" fill="#f5f8fb" />
      <path d="M95 114c36-64 148-78 211-24 32 28 36 73 13 113-16 28-47 46-68 75-14 19-21 42-22 66H154c5-42-7-66-35-100-28-35-42-87-24-130Z" fill="#d5e8f3" stroke="#5a829f" strokeWidth="6" />
      <path d="M745 114c-36-64-148-78-211-24-32 28-36 73-13 113 16 28 47 46 68 75 14 19 21 42 22 66h75c-5-42 7-66 35-100 28-35 42-87 24-130Z" fill="#d5e8f3" stroke="#5a829f" strokeWidth="6" />
      <path d="M365 151c17-25 35-34 55-34s38 9 55 34l-11 34c-10 13-18 28-20 48h-48c-2-20-10-35-20-48l-11-34Z" fill="#c6ddeb" stroke="#5a829f" strokeWidth="6" />
      <path d="M306 244c31-20 66-30 104-31m20 0c38 1 73 11 104 31" fill="none" stroke="#4f86a8" strokeWidth="9" strokeLinecap="round" />
      <circle cx="410" cy="216" r="13" fill="#d89b52" stroke="#70472b" strokeWidth="5" />
      <path d="M410 201 475 151h132" fill="none" stroke="#70472b" strokeWidth="3" />
      <text x="87" y="83" fontSize="22" fill="#28475d">{text.lateral}</text>
      <text x="508" y="135" fontSize="20" fill="#28475d">{text.foramen}</text>
      <text x="348" y="330" fontSize="22" fill="#28475d">{text.third}</text>
      <text x="615" y="158" fontSize="18" fill="#70472b">{text.lesion}</text>
    </svg>
    <figcaption>{pick({ de: 'Konzeptschema zur räumlichen Orientierung, keine CT- oder MRT-Aufnahme.', en: 'Concept schematic for spatial orientation, not a CT or MRI image.', fa: 'شماتیک مفهومی برای جهت‌یابی فضایی است؛ تصویر CT یا MRI نیست.' }, lang)}</figcaption>
  </figure>
}

export default function ColloidCystLesson() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const rtl = lang === 'fa'
  const langPath = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sources = KOLLOID_SOURCES.map(source => ({ ...source, title: t(source.title), citation: source.citation, scope: t(source.scope) }))
  return <StandardLessonShell lessonId="kolloidzyste" lang={lang} title={t(C.title)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langPath('/') }, { label: t({ de: 'Gehirn', en: 'Brain', fa: 'مغز' }), href: langPath('/lernen/gehirn') }, { label: t(C.title) }]}
    sections={(KOLLOID_SECTIONS.map(section => ({ ...section, label: t(section.label) }))).map(section=>({...section,emphasis:section.emphasis||["take-home"].includes(section.id)}))}
    labels={Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))}
    actions={{}} renderIcon={name => icons[name] || icons.scan} syncHashNavigation className={styles.page}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/colloid-cyst/hero.svg', heroImageOpacity: .9, accent: '#6d8fb0', accentStrong: '#345977', accentSoft: '#eaf2f8', secondary: '#bc8756', secondaryStrong: '#70472b', heroBase: '#142838' }}
    heroImageAlt={pick({ de: 'Konzeptschema der Foramina Monroi und des dritten Ventrikels', en: 'Concept schematic of the foramina of Monro and third ventricle', fa: 'شماتیک مفهومی سوراخ‌های مونرو و بطن سوم' }, lang)}
    sources={<LessonSources title={t({ de: 'Quellen und Umfang', en: 'Sources and scope', fa: 'منابع و دامنه' })} items={sources} note={t(C.sourcesNote)} />}>
    <div lang={lang} dir={rtl ? 'rtl' : 'ltr'}>
      <LessonSection id="location" title={t(KOLLOID_SECTIONS[0].label)} icon="scan">
        <p className={styles.lead}>{t(C.intro)}</p><p className={styles.sourceNote}>{t(C.scope)}</p><LocationDiagram lang={lang} />
        <nav className={styles.actions} aria-label={t({ de: 'Übungen', en: 'Practice', fa: 'تمرین‌ها' })}>
          <Link href={langPath(`/ueben/quiz?fach=gehirn&n=1&themen=kolloidzyste&from=${encodeURIComponent(langPath(KOLLOID_PATH))}`)}>{t({ de: 'MCQ üben', en: 'Practise the MCQ', fa: 'تمرین پرسش چندگزینه‌ای' })}</Link>
          <Link href={langPath(`/flashcards/kolloidzyste?from=${encodeURIComponent(langPath(KOLLOID_PATH))}`)}>{t({ de: 'Flashcard öffnen', en: 'Open flashcard', fa: 'بازکردن فلش‌کارت' })}</Link>
        </nav>
      </LessonSection>
      <LessonSection id="signals" title={t(KOLLOID_SECTIONS[1].label)} icon="compare">
        <p>{t(C.signals)}</p>
        <div className={styles.tableScroll} role="region" tabIndex={0} aria-label={t({ de: 'Bildmuster im Vergleich', en: 'Imaging pattern overview', fa: 'نمای کلی الگوی تصویربرداری' })}>
          <table><thead><tr><th scope="col">{t({ de: 'Modalität / Sequenz', en: 'Modality / sequence', fa: 'روش / توالی' })}</th><th scope="col">{t({ de: 'Lernpunkt', en: 'Teaching point', fa: 'نکتهٔ آموزشی' })}</th></tr></thead><tbody>
            <tr><th scope="row">CT nativ</th><td>{t({ de: 'Häufig hyperdens, aber Dichte variabel; begleitende Ventrikelweite mitbeurteilen.', en: 'Often hyperattenuating, but density varies; assess ventricular size as well.', fa: 'اغلب پُرچگال است، اما چگالی متغیر است؛ اندازهٔ بطن‌ها را نیز ارزیابی کنید.' })}</td></tr>
            <tr><th scope="row">T1 / T2</th><td>{t({ de: 'Kein einheitliches Signal; der Zysteninhalt beeinflusst das Muster.', en: 'No uniform signal pattern; the cyst contents influence appearance.', fa: 'الگوی سیگنال واحدی وجود ندارد؛ محتوای کیست بر ظاهر اثر می‌گذارد.' })}</td></tr>
            <tr><th scope="row">FLAIR</th><td>{t({ de: 'Manche T2-hypointensen Zysten sind auch auf FLAIR schwer zu sehen; eine negative Sequenz schließt sie nicht sicher aus.', en: 'Some T2-hypointense cysts are also difficult to see on FLAIR; a negative sequence does not reliably exclude them.', fa: 'برخی کیست‌های کم‌سیگنال در T2 در FLAIR هم دشوار دیده می‌شوند؛ منفی‌بودن یک توالی آن‌ها را با اطمینان رد نمی‌کند.' })}</td></tr>
          </tbody></table>
        </div>
      </LessonSection>
      <LessonSection id="obstruction" title={t(KOLLOID_SECTIONS[2].label)} icon="brain">
        <p>{t(C.obstruction)}</p><aside className={styles.cave}><strong>{t({ de: 'CAVE', en: 'Caution', fa: 'احتیاط' })}</strong><p>{t(C.warning)}</p></aside>
      </LessonSection>
      <LessonSection id="self-check" title={t(KOLLOID_SECTIONS[3].label)} icon="check"><SelfCheck lang={lang} /></LessonSection>
      <LessonSection id="take-home" title={t(KOLLOID_SECTIONS[4].label)} icon="summary" emphasis><TakeHomeList items={C.takeaways.map((item,index)=>({title:t(item),detail:''}))}/></LessonSection>
    </div>
  </StandardLessonShell>
}
