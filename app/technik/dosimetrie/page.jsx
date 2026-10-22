'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { TECHNIK_DOSIMETRIE_LESSON as lesson } from '@/data/technikDosimetrieLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] || value?.de || ''
const labels = {
  contents: L('Lektionsinhalt', 'Lesson content', 'محتوای درس'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'), continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه قاعده برای یادآوری'),
}

function Icon({ id }) {
  const d = { map: 'M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2zM9 3v16m6-14v16', units: 'M4 5h16M4 12h16M4 19h16M8 3v4m8 3v4m-8 3v4', ct: 'M4 4h16v16H4zM8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0', check: 'M4 12.5l5 5L20 6.5', summary: 'M5 5h14M5 12h14M5 19h14' }[id] || 'M4 12h16'
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d}/></svg>
}

function DoseMap({ lang }) {
  const items = lang === 'fa'
    ? ['انرژی بر جرم · Gy', 'وزن‌دهی نوع پرتو · Hₜ · Sv', 'وزن‌دهی بافت مرجع · E · Sv']
    : lang === 'en'
      ? ['Energy per mass · Gy', 'Radiation weighting · Hₜ · Sv', 'Reference tissue weighting · E · Sv']
      : ['Energie pro Masse · Gy', 'Strahlungsgewichtung · Hₜ · Sv', 'Gewebewichtung im Referenzmodell · E · Sv']
  return <figure className={styles.map} aria-label={lang === 'fa' ? 'نقشهٔ مفهومی کمیت‌های دوز' : lang === 'en' ? 'Conceptual map of dose quantities' : 'Konzeptkarte der Dosisgrößen'}>
    {items.map((item, index) => <div className={styles.mapItem} key={item}><span>{index + 1}</span><strong>{item}</strong>{index < 2 && <i aria-hidden="true">↓</i>}</div>)}
    <figcaption>{lang === 'fa' ? 'هر مرحله پاسخ متفاوتی می‌دهد؛ دوز مؤثر اندازه‌گیری مستقیم بیمار نیست.' : lang === 'en' ? 'Each step answers a different question; effective dose is not a direct patient measurement.' : 'Jede Stufe beantwortet eine andere Frage; die Effektivdosis ist keine direkte Patientenmessung.'}</figcaption>
  </figure>
}

function DoseCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const copy = {
    de: { title: 'Selbstcheck: Scanlänge und DLP', prompt: pick(lesson.chapters[3].task, lang), choose: 'Eine Antwort auswählen' },
    en: { title: 'Self-check: scan length and DLP', prompt: pick(lesson.chapters[3].task, lang), choose: 'Choose one answer' },
    fa: { title: 'خودآزمایی: طول اسکن و DLP', prompt: pick(lesson.chapters[3].task, lang), choose: 'یک پاسخ انتخاب کنید' },
  }[lang] || {}
  const sections = [
    { title: L('CTDIvol verdoppelt sich; das DLP bleibt gleich.', 'CTDIvol doubles; DLP stays the same.', 'CTDIvol دو برابر می‌شود؛ DLP ثابت می‌ماند.') },
    { title: L('Das DLP verdoppelt sich; daraus folgt nicht direkt eine verdoppelte individuelle Organdosis.', 'DLP doubles; this does not directly imply a doubled individual organ dose.', 'DLP دو برابر می‌شود؛ از این موضوع نمی‌توان مستقیماً دو برابرشدن دوز اندامی فرد را نتیجه گرفت.') },
    { title: L('Beide Größen geben dann exakt die individuelle Effektivdosis an.', 'Both quantities then give the exact individual effective dose.', 'در این حالت هر دو کمیت دوز مؤثر دقیق فرد را نشان می‌دهند.') },
  ]
  return <div className={styles.check}>
    <h3>{copy.title}</h3><p>{copy.prompt}</p><fieldset><legend>{copy.choose}</legend>{sections.map((option, index) => <label key={index}><input type="radio" name="dosimetry-check" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option.title, lang)}</span></label>)}</fieldset>
    {answer !== null && <p className={styles.feedback} role="status">{answer === lesson.question.answer ? pick(lesson.question.feedback, lang) : (lang === 'fa' ? 'رابطهٔ تعریف را دوباره بررسی کنید: DLP حاصل ضرب CTDIvol در طول اسکن است.' : lang === 'en' ? 'Review the definition: DLP is the product of CTDIvol and scan length.' : 'Prüfen Sie die Definition erneut: DLP ist das Produkt aus CTDIvol und Scanlänge.')}</p>}
  </div>
}

export default function DosimetryPage() {
  const { lang } = useLanguage()
  const value = item => pick(item, lang)
  const labelsForLang = Object.fromEntries(Object.entries(labels).map(([key, item]) => [key, value(item)]))
  const langHref = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = [...lesson.chapters.map(chapter => ({ id: chapter.id, label: value(chapter.title), icon: chapter.icon })), { id: 'take-home', label: labelsForLang.takeHome, icon: 'summary', emphasis: true }]
  const sources = [
    { tag: 'ICRP', title: 'ICRP Publication 103 (2007): The 2007 Recommendations of the International Commission on Radiological Protection', href: 'https://www.icrp.org/publication.asp?id=ICRP+Publication+103', citation: 'Ann. ICRP. 2007;37(2–4). DOI 10.1016/j.icrp.2007.10.003.', scope: L('Definitionen und vorgesehene Anwendung von Energie-, Äquivalent- und Effektivdosis.', 'Definitions and intended use of absorbed, equivalent and effective dose.', 'تعریف و کاربرد موردنظر دوز جذب‌شده، معادل و مؤثر.') },
    { tag: 'ICRP', title: 'ICRP Publication 147 (2021): Use of Dose Quantities in Radiological Protection', href: 'https://www.icrp.org/publication.asp?id=ICRP+Publication+147', citation: 'Ann. ICRP. 2021;50(1). DOI 10.1177/0146645320911864.', scope: L('Erläutert die Grenzen der Effektivdosis bei individueller Risikobewertung und wann Organdosen vorzuziehen sind.', 'Clarifies the limitations of effective dose for individual risk estimation and when organ doses are preferable.', 'محدودیت‌های دوز مؤثر در برآورد خطر فردی و موارد مناسب‌تر بودن دوز اندامی را روشن می‌کند.') },
    { tag: 'AAPM', title: 'AAPM Report 96: The Measurement, Reporting, and Management of Radiation Dose in CT', href: 'https://www.aapm.org/pubs/reports/detail.asp?docid=97', citation: 'AAPM Task Group 23. Report No. 96.', scope: L('CTDIvol und DLP als Scanner-Ausgabegrößen mit Bezug auf standardisierte Phantome.', 'CTDIvol and DLP as scanner-output quantities referenced to standardized phantoms.', 'CTDIvol و DLP به‌عنوان کمیت‌های خروجی دستگاه با ارجاع به فانتوم‌های استاندارد.') },
    { tag: 'AAPM/EFOMP', title: 'AAPM Report 246: Estimating Patient Organ Dose with Computed Tomography', href: 'https://www.aapm.org/pubs/reports/detail.asp?docid=190', citation: 'AAPM Task Group 246 and EFOMP (2019).', scope: L('Grenzen von CTDI/DLP als Ersatzgrößen für die individuelle Organdosis.', 'Limits of CTDI/DLP as surrogates for individual organ dose.', 'محدودیت CTDI و DLP به‌عنوان شاخص‌های جایگزین برای دوز اندامی فردی.') },
    { tag: 'IAEA', title: 'IAEA Human Health Series No. 42: Establishing and Improving Interventional Radiology', href: 'https://www-pub.iaea.org/MTCD/Publications/PDF/PUB1983_web.pdf', citation: 'IAEA, 2023, §5.2 (KAP/DFP definition; PDF p.53, printed p.41).', scope: L('Definition und Bedeutung des KAP/Luftkerma-Flächen-Produkts in Radiographie und Durchleuchtung (§5.2).', 'Definition and use of KAP/air kerma-area product in radiography and fluoroscopy (§5.2).', 'تعریف و کاربرد KAP یا حاصل‌ضرب کرما در مساحت در رادیوگرافی و فلوروسکوپی (§۵٫۲).') },
    { tag: 'IAEA', title: 'IAEA Technical Reports Series No. 457: Dosimetry in Diagnostic Radiology', href: 'https://www-pub.iaea.org/MTCD/publications/PDF/TRS457_web.pdf', citation: 'IAEA, 2007, §§8.4.3.3–8.4.3.4, PDF pp.137–138 (incident and entrance-surface air kerma; direct TLD and backscatter-factor methods).', scope: L('Definition und direkte bzw. indirekte Bestimmung des incident und entrance-surface air kerma; Rückstreufaktor und TLD (§8.4.3.4).', 'Definitions and direct or indirect assessment of incident and entrance-surface air kerma; backscatter factor and TLD (§8.4.3.4).', 'تعریف و سنجش مستقیم یا غیرمستقیم کرمای فرودی و کرمای هوای سطح ورودی؛ ضریب پس‌پراکندگی و TLD (§8.4.3.4).') },
  ].map(item => ({ ...item, tag: value(L(item.tag, item.tag, item.tag)), scope: value(item.scope) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={value(lesson.title)} author="Dr. Zia" heroImageAlt={value(lesson.heroAlt)} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: value(L('Technik & Physik', 'Technique & Physics', 'تکنیک و فیزیک')), href: langHref('/lernen/technik') }, { label: value(lesson.title) }]}
    sections={sections} labels={labelsForLang} renderIcon={id => <Icon id={id}/>}
    actions={{}}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/technik/dosimetrie/hero.svg', heroImageOpacity: .94, accent: '#60b6c5', accentStrong: '#245d68', accentSoft: '#e8f5f7', secondary: '#c69a54', secondaryStrong: '#75531f', heroBase: '#132b35' }}
    className={styles.page}
    sources={<LessonSources title={value(L('Quellen', 'Sources', 'منابع'))} items={sources} note={value(L('Inhaltliche Basis: Technik.pdf, PDF-Seiten 5–8. Wertevergleiche und Umrechnungsfaktoren aus der PDF wurden nicht übernommen, weil sie kontext- und populationsabhängig sind. Dies ist eine Grundlagenlektion, keine individuelle Dosis- oder Risikoermittlung.', 'Content basis: Technik.pdf, PDF pages 5–8. Numerical comparisons and conversion factors from the PDF are omitted because they depend on context and reference population. This is a foundations lesson, not an individual dose or risk calculation.', 'مبنای محتوا: Technik.pdf، صفحات ۵ تا ۸. مقایسه‌های عددی و ضرایب تبدیل PDF به‌دلیل وابستگی به زمینه و جمعیت مرجع وارد نشده‌اند. این درس مبانی است، نه محاسبهٔ دوز یا خطر فردی.'))}/>}
  >
    {lesson.chapters.map((chapter, index) => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={value(chapter.title)} bodyClassName={styles.body}>
      {chapter.paragraphs.map((paragraph, pIndex) => <p key={pIndex}>{value(paragraph)}</p>)}
      {chapter.id === 'protection-quantities' && <DoseMap lang={lang}/>}
      {chapter.id === 'scanner-indices' && <div className={styles.formula} aria-label={value(L('DLP gleich CTDIvol mal Scanlänge', 'DLP equals CTDIvol times scan length', 'DLP برابر CTDIvol ضرب‌در طول اسکن است'))}><span>DLP</span><b>=</b><span>CTDI<sub>vol</sub></span><b>×</b><span>{value(L('Scanlänge', 'scan length', 'طول اسکن'))}</span><small>mGy × cm = mGy·cm</small></div>}
      {chapter.id === 'entrance-surface' && <figure className={styles.formula} aria-label={value(L('Kₑ gleich Kᵢ mal Rückstreufaktor B', 'Kₑ equals Kᵢ times backscatter factor B', 'Kₑ برابر Kᵢ ضرب‌در ضریب پس‌پراکندگی B'))}><span>Kₑ</span><b>=</b><span>Kᵢ</span><b>×</b><span>B</span><small>{value(L('B = Rückstreufaktor; abhängig von Strahlqualität und Feld', 'B = backscatter factor; depends on beam quality and field', 'B = ضریب پس‌پراکندگی؛ وابسته به کیفیت پرتو و میدان'))}</small></figure>}
      {chapter.id === 'decision' && <DoseCheck lang={lang}/>}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={labelsForLang.takeHome}><ol className={styles.rules}>{lesson.summary.map(rule => <li key={rule.de}>{value(rule)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
