'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { TECHNIK_BERUFSDOSIMETRIE_LESSON as lesson } from '@/data/technikBerufsdosimetrieLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] || value?.de || ''
const labels = {
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'),
  close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه قاعده برای یادآوری'),
}

const sources = [
  { tag: 'PDF', title: 'Technik.pdf · PDF p. 9 / printed p. 8', citation: 'User-provided course summary; rendered and visually checked.', scope: L('Ausgangsbasis für Dosimeterprinzipien, Dokumentationsweg und SSR-Nummer. Undatierte Messbereiche und unklare aktuelle Gerätestandards wurden nicht übernommen.', 'Source for detector principles, record workflow and the SSR identifier. Undated ranges and unclear current equipment claims were not carried over.', 'مبنای اصول آشکارساز، گردش ثبت و شناسهٔ SSR؛ بازه‌های اندازه‌گیری بی‌تاریخ و ادعاهای نامشخص دربارهٔ استاندارد جاری وارد نشدند.') },
  { tag: 'BMJ', title: 'Strahlenschutzverordnung (StrlSchV), § 66: Messung der Personendosis', href: 'https://www.gesetze-im-internet.de/strlschv_2018/__66.html', citation: 'Current German ordinance text; accessed 20 October 2026.', scope: L('Trageort, amtliche Messwege, regelmäßige Rückgabe nach einem Monat, behördlich gestattete Verlängerung und direkt feststellbares Dosimeter auf Verlangen.', 'Wear location, official measurement paths, monthly return, authority-permitted extension and a dosimeter whose reading can be determined at any time on request.', 'محل استفاده، مسیرهای رسمی اندازه‌گیری، بازگرداندن ماهانه، تمدید با اجازهٔ مرجع صالح و امکان دریافت دوزیمتری با خوانش در هر زمان به درخواست فرد.') },
  { tag: 'BMJ', title: 'Strahlenschutzgesetz (StrlSchG), § 170: Strahlenschutzregister', href: 'https://www.gesetze-im-internet.de/strlschg/__170.html', citation: 'Current German Act text; accessed 20 October 2026.', scope: L('Zweck des Registers, personenbezogene Einträge und Vergabe einer persönlichen Kennnummer durch das BfS.', 'Register purpose, person-linked records and assignment of a personal identifier by the BfS.', 'هدف ثبت، سوابق مرتبط با فرد و اختصاص شناسهٔ شخصی از سوی BfS.') },
  { tag: 'BfS', title: 'Die berufliche Strahlenexposition in Deutschland 2024', href: 'https://doris.bfs.de/jspui/bitstream/urn%3Anbn%3Ade%3A0221-2025112457250/1/BfS-73-25.pdf', citation: 'BfS-73/25, published 18 December 2025.', scope: L('Aktueller Bericht des Registers; beschreibt die SSR-Nummer als persönliche Kennnummer für erfasste Personen.', 'Current register report; describes the SSR number as a personal identifier for recorded individuals.', 'گزارش جاری ثبت؛ شمارهٔ SSR را شناسهٔ شخصی افراد ثبت‌شده توصیف می‌کند.') },
]

function Icon({ id }) {
  const paths = {
    badge: 'M7 3h10v4H7zM5 7h14v14H5zM9 11h6m-6 4h6',
    types: 'M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v6H4zM14 15h6v6h-6z',
    record: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5',
    check: 'M4 12.5l5 5L20 6.5',
    summary: 'M5 5h14M5 12h14M5 19h14',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.badge}/></svg>
}

function Workflow({ lang }) {
  const steps = {
    de: [['Tragen', 'repräsentative Körperstelle'], ['Auslesen', 'Messstelle / zugelassenes Verfahren'], ['Zuordnen', 'persönliche SSR-Kennnummer']],
    en: [['Wear', 'representative body location'], ['Evaluate', 'monitoring service / approved procedure'], ['Link', 'personal SSR identifier']],
    fa: [['پوشیدن', 'محل نمایندهٔ پرتوگیری'], ['ارزیابی', 'مرکز اندازه‌گیری / روش مجاز'], ['اتصال', 'شناسهٔ شخصی SSR']],
  }[lang] || []
  return <figure className={styles.workflow} aria-label={lang === 'fa' ? 'گردش پایش دوزیمتری شغلی' : lang === 'en' ? 'Occupational dosimetry workflow' : 'Ablauf der beruflichen Dosimetrie'}>
    {steps.map(([title, detail], index) => <div className={styles.step} key={title}><span>{index + 1}</span><strong>{title}</strong><small>{detail}</small></div>)}
    <figcaption>{lang === 'fa' ? 'شناسه، ثبت را به فرد وصل می‌کند و مقدار دوز نیست.' : lang === 'en' ? 'The identifier links the record to a person; it is not a dose value.' : 'Die Kennnummer ordnet den Datensatz einer Person zu; sie ist kein Dosiswert.'}</figcaption>
  </figure>
}

function DosimetryCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const copy = {
    de: { title: 'Selbstcheck: Anzeige und amtliche Messung', choose: 'Eine Antwort auswählen' },
    en: { title: 'Self-check: display and official measurement', choose: 'Choose one answer' },
    fa: { title: 'خودآزمایی: نمایشگر و اندازه‌گیری رسمی', choose: 'یک پاسخ انتخاب کنید' },
  }[lang] || {}
  return <div className={styles.check}>
    <h3>{copy.title}</h3><p>{pick(lesson.chapters[2].task, lang)}</p><fieldset><legend>{copy.choose}</legend>
      {lesson.question.options.map((option, index) => <label key={index}><input type="radio" name="occupational-dosimetry-check" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null && <p className={styles.feedback} role="status">{pick(answer === lesson.question.answer ? lesson.question.feedback : L('Eine Anzeige sagt allein noch nichts darüber aus, ob die Messung amtlich anerkannt und dem Register korrekt zugeordnet ist.', 'A display alone does not establish whether the measurement is officially recognized and correctly linked in the register.', 'نمایشگر به‌تنهایی مشخص نمی‌کند که اندازه‌گیری رسمی است و درست به ثبت فردی وصل شده است.'), lang)}</p>}
  </div>
}

export default function OccupationalDosimetryPage() {
  const { lang } = useLanguage()
  const value = item => pick(item, lang)
  const labelsForLang = Object.fromEntries(Object.entries(labels).map(([key, item]) => [key, value(item)]))
  const langHref = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = [...lesson.chapters.map(chapter => ({ id: chapter.id, label: value(chapter.title), icon: chapter.icon })), { id: 'take-home', label: labelsForLang.takeHome, icon: 'summary', emphasis: true }]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={value(lesson.title)} author="Dr. Zia" sections={sections} labels={labelsForLang} renderIcon={id => <Icon id={id}/>}
    actions={{}} breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: value(L('Technik & Physik', 'Technique & Physics', 'تکنیک و فیزیک')), href: langHref('/lernen/technik') }, { label: value(lesson.title) }]}
    heroImageAlt={value(lesson.heroAlt)} syncHashNavigation className={styles.page}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/technik/berufsdosimetrie/hero.svg', heroImageOpacity: .94, accent: '#60b6c5', accentStrong: '#245d68', accentSoft: '#e8f5f7', secondary: '#c69a54', secondaryStrong: '#75531f', heroBase: '#132b35' }}
    sources={<LessonSources title={value(L('Quellen und Aussagebereich', 'Sources and scope', 'منابع و محدودهٔ گزاره‌ها'))} items={sources} note={value(L('Rechtsbezug: Deutschland, StrlSchV und StrlSchG in der am 20. Oktober 2026 abgerufenen Fassung. Dies ist eine Lehrübersicht und ersetzt keine betriebliche Einweisung oder Rechtsberatung.', 'Jurisdiction: Germany; StrlSchV and StrlSchG as accessed on 20 October 2026. This is an educational overview, not workplace instruction or legal advice.', 'محدودهٔ قانونی: آلمان؛ متن StrlSchV و StrlSchG در نسخهٔ بازبینی‌شده در ۲۰ اکتبر ۲۰۲۶. این مرور آموزشی جایگزین آموزش محل کار یا مشاورهٔ حقوقی نیست.'))}/>}
  >
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={value(chapter.title)} bodyClassName={styles.body}>
      {chapter.paragraphs.map((paragraph, index) => <p key={index}>{value(paragraph)}</p>)}
      {chapter.id === 'evaluation-and-record' && <Workflow lang={lang}/>}
      {chapter.id === 'evaluation-and-record' && <DosimetryCheck lang={lang}/>}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={labelsForLang.takeHome}><ol className={styles.rules}>{lesson.summary.map(rule => <li key={rule.de}>{value(rule)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
