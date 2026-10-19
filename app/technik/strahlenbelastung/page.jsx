'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { TECHNIK_STRAHLENBELASTUNG_LESSON as lesson } from '@/data/technikStrahlenbelastungLesson'
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
  { tag: 'BfS', title: 'Umweltradioaktivität und Strahlenbelastung: Jahresbericht 2020', href: 'https://doris.bfs.de/jspui/handle/urn:nbn:de:0221-2023092039261', citation: 'Federal Office for Radiation Protection (BfS), 2023 publication; medical-exposure data evaluated for 2007–2018.', scope: L('Historischer Datenzeitraum: medizinische Exposition als wesentlicher zivilisatorischer Beitrag; CT als wesentlicher Treiber der Dosisentwicklung.', 'Historical data period: medical exposure as a major human-made contribution; CT as a major driver of the dose trend.', 'دورهٔ دادهٔ تاریخی: پرتوگیری پزشکی سهمی عمده از منبع انسانی داشت و CT عامل مهم روند دوز بود.') },
  { tag: 'BfS/BMUV', title: 'Grundlagen zur Umweltradioaktivität und Strahlenbelastung in Deutschland', href: 'https://doris.bfs.de/jspui/handle/urn:nbn:de:0221-2023032136841', citation: 'Status December 2021; published 2023.', scope: L('Grundlagen natürlicher und künstlicher Quellen sowie deren Variabilität.', 'Foundations on natural and human-made sources and their variability.', 'مبانی منابع طبیعی و انسانی و تغییرپذیری آن‌ها.') },
  { tag: 'ICRP', title: 'ICRP Publication 103 (2007): The 2007 Recommendations of the International Commission on Radiological Protection', href: 'https://www.icrp.org/publication.asp?id=ICRP+Publication+103', citation: 'Annals of the ICRP. 2007;37(2–4).', scope: L('Begriffsrahmen für effektive Dosis und ihre Anwendung als Schutzgröße.', 'Framework for effective dose and its use as a protection quantity.', 'چارچوب مفهوم دوز مؤثر و کاربرد آن به‌عنوان کمیت حفاظت پرتویی.') },
]

function Icon({ id }) {
  const paths = {
    map: 'M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2zM9 3v16m6-14v16',
    sun: 'M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6L7 7m10 10 1.4 1.4m0-12.8L17 7M7 17l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
    ct: 'M4 4h16v16H4zM8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0',
    check: 'M4 12.5l5 5L20 6.5',
    summary: 'M5 5h14M5 12h14M5 19h14',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.map}/></svg>
}

function ExposureMap({ lang }) {
  const groups = {
    de: [['Natürliche Quellen', 'Kosmisch · Boden · Radon · Nahrung'], ['Anwendungen durch den Menschen', 'Medizinische Bildgebung · weitere Quellen']],
    en: [['Natural sources', 'Cosmic · ground · radon · food'], ['Human-made uses', 'Medical imaging · other sources']],
    fa: [['منابع طبیعی', 'کیهانی · خاک · رادون · غذا'], ['کاربردهای انسانی', 'تصویربرداری پزشکی · منابع دیگر']],
  }[lang] || []
  return <figure className={styles.map} aria-label={lang === 'fa' ? 'نمای مفهومی منابع پرتوگیری' : lang === 'en' ? 'Concept map of exposure sources' : 'Konzeptkarte der Expositionsquellen'}>
    {groups.map(([title, detail], index) => <div className={styles.source} key={title}><span className={styles.marker}>{index + 1}</span><div><strong>{title}</strong><p>{detail}</p></div></div>)}
    <figcaption>{lang === 'fa' ? 'نقشهٔ مفهومی؛ اندازه یا ترتیب جعبه‌ها نشان‌دهندهٔ مقدار دوز نیست.' : lang === 'en' ? 'Conceptual map; box size and order do not represent dose magnitude.' : 'Konzeptkarte; Größe und Reihenfolge der Felder stellen keine Dosisanteile dar.'}</figcaption>
  </figure>
}

function ExposureCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const copy = {
    de: { title: 'Selbstcheck: Jahresmittel und Einzeldosis', choose: 'Eine Antwort auswählen' },
    en: { title: 'Self-check: annual average and individual dose', choose: 'Choose one answer' },
    fa: { title: 'خودآزمایی: میانگین سالانه و دوز فردی', choose: 'یک پاسخ انتخاب کنید' },
  }[lang] || {}
  return <div className={styles.check}>
    <h3>{copy.title}</h3><p>{pick(lesson.chapters[3].task, lang)}</p>
    <fieldset><legend>{copy.choose}</legend>{lesson.question.options.map((option, index) => <label key={index}><input type="radio" name="exposure-check" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}</fieldset>
    {answer !== null && <p className={styles.feedback} role="status">{answer === lesson.question.answer ? pick(lesson.question.feedback, lang) : pick(L('Ein Mittelwert der Bevölkerung ist kein persönlicher Dosiswert. Prüfen Sie, welche Daten für die konkrete Untersuchung fehlen.', 'A population average is not a personal dose. Consider which details about the specific examination are missing.', 'میانگین جمعیت دوز شخصی نیست. بررسی کنید چه اطلاعاتی دربارهٔ بررسی مشخص در دسترس نیست.'), lang)}</p>}
  </div>
}

export default function RadiationExposurePage() {
  const { lang } = useLanguage()
  const value = item => pick(item, lang)
  const labelsForLang = Object.fromEntries(Object.entries(labels).map(([key, item]) => [key, value(item)]))
  const langHref = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = [...lesson.chapters.map(chapter => ({ id: chapter.id, label: value(chapter.title), icon: chapter.icon })), { id: 'take-home', label: labelsForLang.takeHome, icon: 'summary', emphasis: true }]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={value(lesson.title)} author="Dr. Zia" sections={sections} labels={labelsForLang} renderIcon={id => <Icon id={id}/>}
    actions={{}}
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: value(L('Technik & Physik', 'Technique & Physics', 'تکنیک و فیزیک')), href: langHref('/lernen/technik') }, { label: value(lesson.title) }]}
    heroImageAlt={value(lesson.heroAlt)} theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/technik/strahlenbelastung/hero.svg', heroImageOpacity: .94, accent: '#60b6c5', accentStrong: '#245d68', accentSoft: '#e8f5f7', secondary: '#c69a54', secondaryStrong: '#75531f', heroBase: '#132b35' }}
    syncHashNavigation className={styles.page} sources={<LessonSources title={value(L('Quellen und Aussagebereich', 'Sources and scope', 'منابع و محدودهٔ گزاره‌ها'))} items={sources} note={value(L('PDF-Grundlage: Technik.pdf, Seite 4 (gedruckte Seite 3). Beispiele und historische Mittelwerte sind keine individuelle Dosisangabe oder klinische Beratung. Zahlen ohne erkennbaren Bezugszeitraum wurden bewusst nicht übernommen.', 'PDF basis: Technik.pdf, page 4 (printed page 3). Examples and historical averages are not individual dose estimates or clinical advice. Figures without a clear reference period were deliberately omitted.', 'مبنای PDF: Technik.pdf، صفحهٔ ۴ (صفحهٔ چاپی ۳). مثال‌ها و میانگین‌های تاریخی دوز فردی یا توصیهٔ بالینی نیستند. اعداد بدون دورهٔ مرجع مشخص عمداً وارد نشده‌اند.'))}/>}
  >
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={value(chapter.title)} bodyClassName={styles.body}>
      {chapter.paragraphs.map((paragraph, index) => <p key={index}>{value(paragraph)}</p>)}
      {chapter.id === 'natural-sources' && <ExposureMap lang={lang}/>}
      {chapter.id === 'decision' && <ExposureCheck lang={lang}/>}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={labelsForLang.takeHome}><ol className={styles.rules}>{lesson.summary.map(rule => <li key={rule.de}>{value(rule)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
