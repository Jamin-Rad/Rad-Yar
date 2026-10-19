'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { GEHIRN_BALKENAGENESIE_LESSON as lesson } from '@/data/gehirnBalkenagenesieLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const value = (item, lang) => item?.[lang] || item?.de || ''
const labels = {
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark the whole lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'),
  close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Kernaussagen', 'Key points', 'نکات کلیدی'),
  sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
}
const icons = {
  sagittal: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12c1-5 5-8 10-8 3 0 5 2 6 5-1 5-5 9-10 9-3 0-5-2-6-6Zm5 0h8" /></svg>,
  planes: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h6v14H4zM14 5h6v14h-6zM7 9h1m9 0h1" /></svg>,
  report: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l4 4v14H6zM15 3v5h4M9 12h7M9 16h7" /></svg>,
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const a = lesson.assessment
  return <div className={styles.selfCheck}>
    <p className={styles.lead}>{value(a.question, lang)}</p>
    <div className={styles.options}>{a.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{value(option, lang)}</button>)}</div>
    {answer !== null ? <p role="status" className={styles.feedback}>{value(answer === a.correctIndex ? a.feedback : a.retry, lang)}</p> : null}
  </div>
}

export default function CallosalAgenesisPage() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const text = lang === 'fa'
    ? { crumb: 'مغز', draft: 'پیش‌نویس آموزشی؛ برای تصمیم بالینی استفاده نشود.', visual: 'شماتیک آموزشی سه صفحه برای یادآوری ترتیب بررسی؛ MRI بیمار نیست.', scope: 'PDF درصدها و ارتباط‌های احتمالی را فهرست می‌کند، اما این صفحات ارزیابی کامل یا مبنای کافی برای نسبت‌دادن یک سندرم به فرد را ارائه نمی‌کنند. بنابراین ارتباط‌ها و درصدها در این درس تکرار نمی‌شوند؛ یافته‌های همراه را جداگانه ثبت کنید.', conflict: 'عبارت PDF دربارهٔ اینکه کدام بخش‌ها ابتدا در نوع ناقص غایب می‌شوند، روشن نیست و تا بررسی منبع تکاملی وارد آموزش نشده است.', note: 'صفحات منبع: Gehirn.pdf، صفحات PDF ۸۵–۸۶ (شمارهٔ چاپی ۸۴–۸۵). این پیش‌نویس بازبینی مستقل و ارزیابی مرورگر را نگذرانده است.' }
    : lang === 'en'
      ? { crumb: 'Brain', draft: 'Teaching draft; not for clinical decision-making.', visual: 'Three-plane teaching schematic to cue the viewing sequence; not a patient MRI.', scope: 'The PDF lists possible associations and percentages, but these pages do not provide a complete assessment or sufficient basis for assigning a syndrome to an individual. This lesson therefore does not repeat the associations or percentages; document associated findings separately.', conflict: 'The PDF statement about which callosal segments are first absent in partial forms is unclear and is withheld pending targeted developmental-source verification.', note: 'Source: Gehirn.pdf, PDF pages 85–86 (printed pages 84–85). Independent review and browser assessment remain pending.' }
      : { crumb: 'Gehirn', draft: 'Lernentwurf; nicht für klinische Entscheidungen.', visual: 'Drei-Ebenen-Schema zur Orientierung; keine MRT-Aufnahme eines Patienten.', scope: 'Das PDF listet mögliche Assoziationen und Prozentangaben, liefert auf diesen Seiten aber weder eine vollständige Abklärung noch eine ausreichende Grundlage, einer einzelnen Person ein Syndrom zuzuordnen. Deshalb wiederholt diese Lektion die Assoziationen und Prozentangaben nicht; Begleitbefunde werden getrennt dokumentiert.', conflict: 'Die Aussage des PDFs dazu, welche Balkenabschnitte bei partieller Fehlanlage zuerst fehlen, ist unklar und bleibt bis zur gezielten entwicklungsbiologischen Quellenprüfung ausgespart.', note: 'Quelle: Gehirn.pdf, PDF-Seiten 85–86 (Druckseiten 84–85). Unabhängige Prüfung und Browserkontrolle stehen noch aus.' }
  const t = key => value(labels[key], lang)
  const path = href => lang === 'de' ? href : `${href}?lang=${lang}`
  const sections = lesson.chapters.map((chapter, index) => ({ id: chapter.id, label: value(chapter.title, lang), icon: ['sagittal', 'planes', 'report'][index] || 'planes' }))
  const sources = [
    { href: 'https://radiopaedia.org/cases/10662', title: 'Gaillard F. Callosal dysgenesis. Radiopaedia case rID 10662.', citation: 'The supplied PDF marks its p. 86 MRI montage rID 10662. A secondary PACS.DE listing supplies the title, contributor and CC BY-NC-SA 3.0 label; the primary case page was unavailable in this review.', scope: lang === 'fa' ? 'تصویرهای همین درس از PDF مجازشدهٔ کاربر گرفته شده‌اند؛ هویت و مجوز اختصاصی کیس هنوز از منبع اصلی تأیید نشده است.' : lang === 'en' ? 'This lesson crops the user-authorized PDF frames; case-specific identity and terms still await confirmation from the primary source.' : 'Diese Lektion verwendet Ausschnitte aus dem vom Nutzer autorisierten PDF; fallbezogene Identität und Lizenzbedingungen sind über die Primärquelle noch zu bestätigen.' },
    { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2964797/', title: 'Singh S, Garge S. Agenesis of the corpus callosum.', citation: 'J Pediatr Neurosci. 2010;5(1):83–85. PMID: 21042520.', scope: lang === 'fa' ? 'مرور آژنزی جسم پینه‌ای و یافته‌های همراه.' : lang === 'en' ? 'Review of callosal agenesis and associated findings.' : 'Übersicht zu Balkenagenesie und assoziierten Befunden.' },
    { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3932574/', title: 'Kazi AZ, et al. MRI evaluation of pathologies affecting the corpus callosum: a pictorial essay.', citation: 'Indian J Radiol Imaging. 2013;23(4):321–332.', scope: lang === 'fa' ? 'مرور تصویربرداری بیماری‌های جسم پینه‌ای.' : lang === 'en' ? 'Imaging review of corpus-callosum pathologies.' : 'Bildgebungsübersicht zu Pathologien des Corpus callosum.' },
    { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3763572/', title: 'Krupa K, Bekiesinska-Figatowska M. Congenital and acquired abnormalities of the corpus callosum: a pictorial essay.', citation: 'Biomed Res Int. 2013;2013:265619.', scope: lang === 'fa' ? 'مرور ناهنجاری‌های مادرزادی و اکتسابی جسم پینه‌ای.' : lang === 'en' ? 'Review of congenital and acquired callosal abnormalities.' : 'Übersicht angeborener und erworbener Balkenfehlbildungen.' },
  ]
  return <StandardLessonShell lessonId="balkenfehlbildung" lang={lang} title={value(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: path('/') }, { label: text.crumb, href: path('/lernen/gehirn') }, { label: value(lesson.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(labels).map(([key, localized]) => [key, value(localized, lang)]))} actions={{}}
    renderIcon={id => icons[id] || icons.planes}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/callosal/planes.svg', heroImageOpacity: .9, accent: '#48b5c8', accentStrong: '#155d70', accentSoft: '#e0f4f6', secondary: '#d18b53', secondaryStrong: '#704325', heroBase: '#102535' }}
    className={styles.page} heroImageAlt={text.visual} syncHashNavigation>
    <div lang={lang} dir={rtl ? 'rtl' : 'ltr'}>
      {lesson.chapters.map((chapter, index) => <LessonSection key={chapter.id} id={chapter.id} title={value(chapter.title, lang)} icon={['sagittal', 'planes', 'report'][index]}>
        {index === 0 ? <><p className={styles.lead}>{value(lesson.objective, lang)}</p><p>{text.draft}</p></> : null}
        {chapter.text[lang].split('\n\n').map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
        {index === 1 ? <figure className={styles.caseGallery}>
          <figcaption className={styles.galleryIntro}>{lang === 'fa' ? 'مقایسهٔ هدایت‌شدهٔ فریم‌های منبع: ابتدا صفحه را مشخص کنید، سپس آرایش بطن‌ها را با متن بالا تطبیق دهید. PDF توالی و محل دقیق برش‌های ساژیتال را مشخص نمی‌کند.' : lang === 'en' ? 'Guided comparison of source frames: identify the plane first, then compare ventricular configuration with the text above. The PDF does not specify sequence or exact position of the sagittal crops.' : 'Geführter Vergleich der Quellbilder: Bestimmen Sie zuerst die Ebene und vergleichen Sie dann die Ventrikelkonfiguration mit dem Text oben. Das PDF nennt weder Sequenz noch genaue Lage der sagittalen Ausschnitte.'}</figcaption>
          <div className={styles.frameGrid}>{lesson.frames.map(frame => <figure key={frame.src}>
            <img src={`/educational/callosal/${frame.src}`} alt={`${value(frame.label, lang)}. ${value(frame.task, lang)}`} />
            <figcaption><strong>{value(frame.label, lang)}</strong><span>{value(frame.task, lang)}</span></figcaption>
          </figure>)}</div>
          <p className={styles.gallerySource}>{lang === 'fa' ? 'منبع: Gehirn.pdf، ص. ۸۶؛ تصویرها در PDF با rID 10662 مشخص شده‌اند. شناسنامه و محدودیت انتساب در بخش منابع آمده است.' : lang === 'en' ? 'Source: Gehirn.pdf, p. 86; the image set is marked rID 10662 in the PDF. Attribution limits are documented in the sources.' : 'Quelle: Gehirn.pdf, S. 86; der Bildsatz ist dort mit rID 10662 gekennzeichnet. Grenzen der Zuordnung sind bei den Quellen dokumentiert.'}</p>
        </figure> : null}
        {index === lesson.chapters.length - 1 ? <><aside className={styles.note}><strong>{lang === 'fa' ? 'دامنه و محدودیت منبع' : lang === 'en' ? 'Source scope' : 'Quellenumfang'}</strong><p>{text.scope}</p><p>{text.conflict}</p><p>{text.note}</p><p>{value(lesson.media, lang)}</p></aside><SelfCheck lang={lang} /></> : null}
      </LessonSection>)}
    </div>
    <LessonSources title={t('sources')} items={sources} note={text.note} />
  </StandardLessonShell>
}
