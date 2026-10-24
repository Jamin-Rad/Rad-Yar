'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources , TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { MELORHEOSTOSE_LESSON as lesson } from '@/data/melorheostoseLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] ?? value?.de ?? value

function Icon({ id }) {
  const paths = { pattern: 'M3 12h18M5 7c4 0 3 10 7 10s3-10 7-10', ct: 'M4 4h16v16H4zM7 15l3-4 3 2 4-6', mri: 'M5 5h14v14H5zM8 12h8M12 8v8', case: 'M4 6h16v12H4zM7 15l3-4 3 2 3-5', check: 'm4 12 5 5L20 6' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern} /></svg>
}

function Check({ lang }) {
  const t = value => pick(value, lang)
  const [answer, setAnswer] = useState(null)
  return <div className={styles.check}>
    <h3>{t(L('Muster anwenden', 'Apply the pattern', 'الگو را به‌کار ببرید'))}</h3>
    <p>{t(lesson.check.question)}</p>
    <fieldset><legend>{t(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'))}</legend>{lesson.check.options.map((option, i) => <label key={i}><input type="radio" name="melorheostose-check" checked={answer === i} onChange={() => setAnswer(i)} /><span>{t(option)}</span></label>)}</fieldset>
    {answer !== null && <p role="status" className={answer === lesson.check.answer ? styles.correct : styles.feedback}><strong>{answer === lesson.check.answer ? t(L('Richtig. ', 'Correct. ', 'درست است. ')) : t(L('Noch einmal prüfen. ', 'Review the imaging pattern. ', 'الگوی تصویربرداری را دوباره مرور کنید. '))}</strong>{t(lesson.check.feedback)}</p>}
  </div>
}

function DifferentialTable({ lang }) {
  const t = value => pick(value, lang)
  return <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={t(L('Wichtigste Differentialdiagnose', 'Key differential diagnosis', 'افتراق مهم'))}>
    <table><caption>{t(L('Die im Quell-PDF genannte Abgrenzung', 'The distinction named in the source PDF', 'تمایزی که در PDF منبع ذکر شده است'))}</caption><thead><tr><th scope="col">{t(L('Muster', 'Pattern', 'الگو'))}</th><th scope="col">{t(L('Beschreibung', 'Description', 'توصیف'))}</th></tr></thead><tbody>{lesson.differentials.map(([label, detail]) => <tr key={pick(label, lang)}><th scope="row">{t(label)}</th><td>{t(detail)}</td></tr>)}</tbody></table>
  </div>
}

export default function MelorheostosePage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const langHref = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const labels = {
    path: t(L('Lernweg', 'Learning path', 'مسیر یادگیری')), contents: t(L('Inhalt', 'Contents', 'فهرست')),
    progress: t(L('gelesen', 'read', 'خوانده‌شده')), continue: t(L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری')),
    completeLesson: t(L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده')),
    lessonCompleted: t(L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد')),
    complete: t(L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده')),
    completed: t(L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده')), open: t(L('Abschnitt öffnen', 'Open section', 'بازکردن بخش')),
    close: t(L('Schließen', 'Close', 'بستن')), takeHome: t(L('Merksätze', 'Take-home points', 'نکته‌های کلیدی')), sources: t(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه')),
  }
  const sources = [
    { tag: 'MSK.pdf · p. 133 (printed p. 132)', title: t(L('Melorheostose: Quelltext und Röntgenbild', 'Melorheostosis: source text and radiograph', 'ملوره‌اوستوز: متن منبع و رادیوگرافی')), citation: t(L('Vollständige PDF-Seite visuell geprüft und Text extrahiert. Die Seite enthält Definition, Klinik, Röntgen-/CT-Muster, Verteilung, mögliche Weichteilkomponente, MRT-Zeichen, die Aussage zu fehlendem Ödem/Enhancement, DD Enostose/Osteom und eine Hand-Röntgenaufnahme mit rID 199384.', 'Full PDF page visually reviewed and text extracted. It contains definition, clinical presentation, radiograph/CT pattern, distribution, possible soft-tissue component, MRI findings, the statement about absent oedema/enhancement, enostosis/osteoma differential and a hand radiograph labelled rID 199384.', 'صفحهٔ کامل PDF از نظر بصری بررسی و متن آن استخراج شد. صفحه شامل تعریف، تظاهر بالینی، الگوی رادیوگرافی/CT، توزیع، جزء احتمالی بافت نرم، یافته‌های MRI، گزارهٔ نبود ادم/افزایش سیگنال پس از تزریق مادهٔ حاجب، افتراق انوستوز/استئوما و رادیوگرافی دست با شناسهٔ rID 199384 است.')) },
    { tag: 'Radiopaedia · rID 199384', title: t(L('Quellfall: Röntgenbild der linken Hand', 'Source case: left-hand radiograph', 'کیس منبع: رادیوگرافی دست چپ')), href: 'https://doi.org/10.53347/rID-199384', citation: t(L('Die PDF-Seite nennt rID 199384, aber keinen Beitragenden. Gezeigt wird nur der Bildausschnitt aus der bereitgestellten MSK.pdf; die Nutzung solcher PDF-Bilder wurde vom Nutzer autorisiert. Beitragendenangabe und externe Lizenz konnten aus der Seite nicht festgestellt und werden nicht erfunden.', 'The PDF page gives rID 199384 but no contributor name. Only the crop from the supplied MSK.pdf is shown; the user authorized use of images from those PDFs. Contributor and external licence could not be established from the page and are not invented.', 'صفحهٔ PDF شناسهٔ rID 199384 را دارد اما نام مشارکت‌کننده در آن نیست. فقط برش تصویر از MSK.pdf ارائه‌شده نمایش داده می‌شود؛ کاربر استفاده از تصاویر این PDFها را مجاز کرده است. نام مشارکت‌کننده و مجوز بیرونی از صفحه قابل تعیین نبود و حدس زده نشده است.')) },
    { tag: 'JBMR Plus · 2021', title: t(lesson.refs[0].label), href: lesson.refs[0].href, citation: lesson.refs[0].citation },
    { tag: 'JKRS · 2000', title: t(lesson.refs[1].label), href: lesson.refs[1].href, citation: lesson.refs[1].citation },
    { tag: 'JBMR · 2019', title: t(lesson.refs[2].label), href: lesson.refs[2].href, citation: lesson.refs[2].citation },
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" heroImageAlt={t(L('Schematischer Röhrenknochen mit fließender kortikaler Verdickung; keine Patientenaufnahme.', 'Schematic long bone with flowing cortical thickening; not a patient image.', 'شماتیک استخوان بلند با ضخیم‌شدگی قشری پیوسته؛ تصویر بیمار نیست.'))} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: 'MSK', href: langHref('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={[...(lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.id }))),{id:'takehome',label:lang==='fa'?'پیام نهایی':'Take Home Message',icon:'summary',emphasis:true}]}
    labels={labels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/melorheostose/hero.svg', heroImageOpacity: .96, accent: '#9ab8c9', accentStrong: '#36596d', accentSoft: '#eaf0f4', secondary: '#d8a36f', secondaryStrong: '#80552d', heroBase: '#203746' }}
    className={styles.page} sources={<LessonSources title={labels.sources} items={sources} note={t(L('Begrenzte radiologische Lektion aus MSK.pdf p.133. Der Satz der Quelle „kein Ödem, kein Tumor-Enhancement“ wird als Quellenangabe sichtbar gemacht und durch eine Bildgebungsserie qualifiziert; das Fehlen von Ödem wird nicht als Ausschlusskriterium verwendet. Keine vollständige Differentialdiagnose und keine Therapieanleitung.', 'Bounded radiology lesson from MSK.pdf p.133. The source statement “no oedema, no tumour enhancement” is disclosed and qualified using an imaging series; absence of oedema is not used as an exclusion criterion. This is not a complete differential diagnosis or treatment guide.', 'درس محدود رادیولوژی از صفحهٔ ۱۳۳ MSK.pdf. گزارهٔ منبع «بدون ادم و بدون افزایش سیگنال پس از تزریق مادهٔ حاجب» آشکارا ذکر و با یک مجموعهٔ تصویربرداری تعدیل شده است؛ نبود ادم معیار رد بیماری نیست. این درس فهرست کامل افتراق یا راهنمای درمان نیست.'))} />}>
    <LessonSection id="pattern" icon="pattern" title={t(lesson.sections[0].title)} bodyClassName={styles.body}><p className={styles.lead}>{t(lesson.intro)}</p><ul className={styles.list}>{lesson.clinical.map((item, i) => <li key={i}>{t(item)}</li>)}</ul></LessonSection>
    <LessonSection id="ct" icon="ct" title={t(lesson.sections[1].title)} bodyClassName={styles.body}><ul className={styles.list}>{lesson.ct.map((item, i) => <li key={i}>{t(item)}</li>)}</ul><p className={styles.note}>{t(L('Merke: Die klassische „Kerzenwachs“-Form beschreibt ein fließendes, kortikales Verteilungsmuster. Eine kleine umschriebene Sklerose ohne dieses Muster ist nicht gleichbedeutend.', 'Remember: the classic “candle-wax” shape describes a flowing cortical distribution. A small circumscribed sclerosis without this pattern is not equivalent.', 'نکته: نمای کلاسیک «موم شمع» الگویی پیوسته و قشری را توصیف می‌کند. اسکلروز کوچک و محدود بدون این الگو معادل آن نیست.'))}</p></LessonSection>
    <LessonSection id="mri" icon="mri" title={t(lesson.sections[2].title)} bodyClassName={styles.body}><ul className={styles.list}>{lesson.mri.map((item, i) => <li key={i}>{t(item)}</li>)}</ul></LessonSection>
    <LessonSection id="case" icon="case" title={t(lesson.sections[3].title)} bodyClassName={styles.body}><figure className={styles.caseImage}><img src="/educational/melorheostose/pdf-case-p133.jpg" alt={t(L('Röntgenaufnahme der linken Hand aus MSK.pdf p.133, Radiopaedia rID 199384; keine zusätzliche Bildbeschriftung oder Markierung.', 'Left-hand radiograph from MSK.pdf p.133, Radiopaedia rID 199384; no additional labels or overlays.', 'رادیوگرافی دست چپ از صفحهٔ ۱۳۳ MSK.pdf، Radiopaedia rID 199384؛ بدون برچسب یا علامت‌گذاری افزوده.'))} width="400" height="432" loading="lazy" /><figcaption>{t(lesson.caseCaption)}</figcaption></figure><DifferentialTable lang={lang} /><Check lang={lang} /></LessonSection>

<LessonSection id="takehome" icon="summary"><TakeHomeList items={lesson.takeHome.map((item,i)=>({title:t(item),detail:''}))}/></LessonSection>
</StandardLessonShell>
}
