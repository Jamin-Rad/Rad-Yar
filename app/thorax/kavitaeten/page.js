'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { THORAX_CAVITIES as lesson } from '@/data/thoraxCavities'
import styles from '../lungenoedem/page.module.css'
import mediaStyles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
const labels = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiter', 'Continue', 'ادامه'), completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark the full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  retry: L('Erneut versuchen', 'Try again', 'تلاش دوباره'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson read', 'کل درس خوانده شد'), complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'), completed: L('Gelesen', 'Read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Abschnitt schließen', 'Close section', 'بستن بخش'), takeHome: L('Vier Regeln merken', 'Four rules to remember', 'چهار نکته برای یادآوری'),
}
const titleThorax = L('Thorax', 'Thorax', 'قفسه سینه')
const chapterName = L('Kavitäten und Hohlräume', 'Cavities and cyst-like spaces', 'حفره‌ها و فضاهای کیست‌مانند')
const iconPaths = { start: 'M12 3v18M3 12h18', sequence: 'M4 5h12m0 0-3-3m3 3-3 3M20 12H8m0 0 3-3m-3 3 3 3M4 19h12', case: 'M4 12h16M12 4v16', summary: 'M5 5h14M5 12h14M5 19h14' }
function Icon({ id }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[id] || iconPaths.sequence}/></svg> }

function FeatureTable({ rows, lang }) {
  return <div className={styles.tableWrap}><table><thead><tr><th scope="col">{pick(L('Muster', 'Pattern', 'الگو'), lang)}</th><th scope="col">{pick(L('Bildgebende Einordnung', 'Imaging interpretation', 'تفسیر تصویربرداری'), lang)}</th></tr></thead><tbody>{rows.map(([label, value], i) => <tr key={i}><th scope="row">{pick(label, lang)}</th><td>{pick(value, lang)}</td></tr>)}</tbody></table></div>
}

function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  const item = lesson.check
  const text = key => pick(labels[key], lang)
  return <div className={styles.check}>
    <h3>{pick(item.title, lang)}</h3><p>{pick(item.prompt, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort wählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{item.options.map((option, i) => <label key={i}><input type="radio" name="thorax-cavities-check" checked={answer === i} onChange={() => setAnswer(i)}/><span>{pick(option, lang)}</span></label>)}</fieldset>
    {answer !== null ? <div role="status" className={styles.feedback}><strong>{pick(answer === item.answerIndex ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Try again. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(answer === item.answerIndex ? item.correct : item.retry, lang)}{answer !== item.answerIndex ? <button type="button" onClick={() => setAnswer(null)}>{text('retry')}</button> : null}</div> : null}
  </div>
}

export default function PulmonaryCavitiesPage() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const label = key => pick(labels[key], lang)
  const route = href => lang === 'de' ? href : `${href}?lang=${lang}`
  const sectionList = [
    { id: 'start', label: pick(L('Hohlraum einordnen', 'Classify the space', 'نوع فضا را مشخص کنید'), lang), icon: 'start' },
    ...lesson.chapters.map(chapter => ({ id: chapter.id, label: pick(chapter.title, lang), icon: chapter.icon })),
    { id: 'check', label: pick(lesson.check.title, lang), icon: 'case' },
    { id: 'take-home', label: label('takeHome'), icon: 'summary', emphasis: true },
  ]
  const sourceTags = {
    'fleichner-glossary': L('Begriffsstandard', 'Terminology standard', 'استاندارد اصطلاح‌شناسی'),
    'pdf-case-image': L('CT-Fallbild · Radiopaedia', 'CT case image · Radiopaedia', 'تصویر کیس CT · Radiopaedia'),
    'cavity-thickness-study': L('Primärstudie · Wanddicke', 'Primary study · wall thickness', 'مطالعهٔ اولیه · ضخامت دیواره'),
    'abscess-ct': L('CT-Bildgebung · Abszess', 'CT imaging · abscess', 'تصویربرداری CT · آبسه'),
    'acr-pneumonia': L('Angemessenheitskriterien · ACR', 'Appropriateness criteria · ACR', 'معیارهای تناسب · ACR'),
    'cdc-tb': L('Diagnostik · CDC', 'Diagnosis · CDC', 'تشخیص · CDC'),
    'abscess-case': L('Fallbeispiel · Abszess', 'Case example · abscess', 'نمونه‌کیس · آبسه'),
    'tb-case': L('Fallbeispiel · TB', 'Case example · TB', 'نمونه‌کیس · سل'),
    'lung-cancer-study': L('Bildgebende Kohorte · Malignität', 'Imaging cohort · malignancy', 'مطالعهٔ تصویربرداری · بدخیمی'),
    'aspergilloma-guideline': L('Fachleitlinie · IDSA', 'Practice guideline · IDSA', 'راهنمای تخصصی · IDSA'),
    'aspergilloma-ers': L('Fachleitlinie · ERS', 'Practice guideline · ERS', 'راهنمای تخصصی · ERS'),
  }
  const sourceNotes = {
    'fleichner-glossary': L('Begriffsstandard; morphologische Benennung, keine Ätiologiediagnose.', 'Terminology standard; morphologic naming, not an aetiologic diagnosis.', 'استاندارد اصطلاح‌شناسی؛ توصیف مورفولوژیک است، نه تشخیص علت.'),
    'pdf-case-image': L('Im Thorax.pdf S. 25 wiederverwendeter und beschnittener CT-Ausschnitt. Im Ausschnitt sichtbar: rID 16033; Website und Mitwirkende sind nicht unabhängig verifiziert. Projekt-Bildnutzung wurde vom Nutzer bestätigt.', 'Cropped CT image reused from Thorax.pdf p. 25. The crop visibly shows rID 16033; site and contributor are not independently verified. The user confirmed image reuse permission for the project.', 'برش CT از Thorax.pdf صفحهٔ ۲۵ بازاستفاده و بریده شده است. در برش فقط rID 16033 دیده می‌شود؛ وب‌سایت و نام مشارکت‌کننده مستقلاً تأیید نشده‌اند. کاربر استفادهٔ پروژه از تصویر را تأیید کرده است.'),
    'cavity-thickness-study': L('Retrospektive Kohorte mit 96 solitären Kavitäten; untersuchte Cut-offs sind keine universelle Regel und werden hier nicht gelehrt.', 'Retrospective cohort of 96 solitary cavities; its cut-offs are not universal rules and are not taught here.', 'کوهورت گذشته‌نگر ۹۶ کاویتی منفرد؛ آستانه‌های آن قانون همگانی نیستند و در این درس آموزش داده نمی‌شوند.'),
    'abscess-ct': L('Radiologischer Vergleich von parenchymalem Abszess und Empyem; beschriebene Zeichen einzeln nicht absolut.', 'Radiologic comparison of parenchymal abscess and empyema; individual signs are not absolute.', 'مقایسهٔ رادیولوژیک آبسهٔ پارانشیمی و آمپیم؛ نشانه‌های منفرد قطعی نیستند.'),
    'acr-pneumonia': L('Aktuelle Angemessenheitskriterien für Bildgebung bei akuter respiratorischer Erkrankung.', 'Current appropriateness criteria for imaging acute respiratory illness.', 'معیارهای جاری تناسب تصویربرداری در بیماری حاد تنفسی.'),
    'cdc-tb': L('Radiologische Befunde können TB nahelegen, stellen aber keine definitive Diagnose.', 'Radiographic findings may suggest TB but do not establish a definitive diagnosis.', 'یافته‌های رادیوگرافیک می‌توانند سل را مطرح کنند، اما تشخیص قطعی نیستند.'),
    'abscess-case': L('Fallbeispiel, kein allgemeines Kriterium. Originalserie über die Radiopaedia-Fallseite ansehen.', 'Case example, not a universal criterion. View the original series on the Radiopaedia case page.', 'نمونه‌کیس است، نه معیار همگانی. سری اصلی را از صفحهٔ کیس Radiopaedia ببینید.'),
    'tb-case': L('Mikrobiologisch bestätigter Fall; keine universelle Verteilung. Originalserie auf Radiopaedia.', 'Microbiologically confirmed case; distribution is not universal. Original series on Radiopaedia.', 'کیس با تأیید میکروبی؛ توزیع همگانی نیست. سری اصلی در Radiopaedia.'),
    'lung-cancer-study': L('Retrospektive HRCT-Kohorte zum Vergleich kavitierender Adenokarzinome und Plattenepithelkarzinome; keine allgemeine Diagnosegrenze.', 'Retrospective HRCT cohort comparing cavitating adenocarcinoma and squamous cell carcinoma; no general diagnostic threshold.', 'کوهورت گذشته‌نگر HRCT برای مقایسهٔ آدنوکارسینوم و کارسینوم سلول سنگفرشی کاویتاری؛ آستانهٔ تشخیصی همگانی نیست.'),
    'aspergilloma-guideline': L('Quelle für fungal-ball-Morphologie; Befund in den klinischen Rahmen einordnen.', 'Source for fungal-ball morphology; interpret in clinical context.', 'منبع مورفولوژی تودهٔ قارچی؛ یافته را در زمینهٔ بالینی تفسیر کنید.'),
    'aspergilloma-ers': L('Quelle zur Mobilität des Pilzballs zwischen Rücken- und Bauchlage.', 'Source for mobility of a fungal ball between supine and prone positions.', 'منبع حرکت تودهٔ قارچی بین وضعیت طاق‌باز و دمر.'),
  }
  const sources = lesson.references.map(item => ({
    tag: pick(sourceTags[item.id], lang),
    title: pick(item.label, lang), href: item.url,
    citation: pick(sourceNotes[item.id], lang),
  }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: route('/') }, { label: pick(titleThorax, lang), href: route('/lernen/thorax') }]}
    sections={sectionList} labels={Object.fromEntries(Object.keys(labels).map(key => [key, label(key)]))} actions={{}} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.heroImage, heroImageOpacity: .75, accent: '#70bdc8', accentStrong: '#216a78', accentSoft: '#e1f3f5', secondary: '#9678c5', secondaryStrong: '#63428e', heroBase: '#172c3b' }}
    heroImageAlt={pick(lesson.alt, lang)} className={styles.page} syncHashNavigation
    sources={<LessonSources title={pick(L('Quellen und Geltungsbereich', 'Sources and scope', 'منابع و محدوده'), lang)} items={sources} note={pick(lesson.notice, lang)}/>}
  >
    <LessonSection id="start" icon="start" title={pick(chapterName, lang)}>
      <div className={styles.body}>
        <p>{pick(L('Beginne mit der Morphologie: Liegt der Hohlraum innerhalb einer Gewebeläsion oder handelt es sich um einen glatt begrenzten, dünnwandigen Luftraum? Danach Inhalt und Umgebung betrachten.', 'Start with morphology: is the space within a tissue lesion, or is it a smooth, thin-walled airspace? Then assess its contents and surroundings.', 'از مورفولوژی شروع کنید: فضای خالی درون ضایعهٔ بافتی قرار دارد یا فضای هوایی صاف و نازک‌دیواره است؟ سپس محتوا و بافت اطراف را بررسی کنید.'), lang)}</p>
        <img className={styles.diagram} src={lesson.heroImage} alt={pick(lesson.alt, lang)}/>
        <ol className={styles.visualLegend}>{[
          L('Unregelmäßiger Hohlraum innerhalb einer Läsion: Kavität', 'Irregular space within a lesion: cavity', 'فضای نامنظم درون ضایعه: کاویتی'),
          L('Glatt begrenzter, dünnwandiger Luftraum: morphologisch zystisch', 'Smooth, thin-walled airspace: cystic morphology', 'فضای هوایی صاف و نازک‌دیواره: مورفولوژی کیستیک'),
          L('Skizze zur Begriffsbildung; kein diagnostisches Bild', 'Concept sketch; not a diagnostic image', 'طرح مفهومی؛ تصویر تشخیصی نیست'),
        ].map((item, i) => <li key={i}><span>{i + 1}</span>{pick(item, lang)}</li>)}</ol>
        <figure className={mediaStyles.caseFigure}><img className={mediaStyles.caseImage} src={lesson.caseImage} alt={pick(lesson.caseImageAlt, lang)}/><figcaption>{pick(lesson.caseImageCaption, lang)}{' '}<a href="https://radiopaedia.org/cases/16033" target="_blank" rel="noreferrer">{pick(L('Mögliche Fallseite zur sichtbaren ID öffnen (nicht unabhängig verifiziert)', 'Open candidate case page for the visible ID (not independently verified)', 'بازکردن صفحهٔ احتمالی کیس برای شناسهٔ دیده‌شده (تأیید مستقل نشده)'), lang)}</a></figcaption></figure>
        <p className={styles.scope}>{pick(L('Die Wanddicke hilft, ist aber kein alleiniger Grenzwert für die Ursache. Beschreibe die Morphologie und nutze die gesamte Verteilung sowie Vergleichsaufnahmen.', 'Wall thickness helps, but it is not a stand-alone threshold for cause. Describe the morphology and use the full distribution and prior imaging.', 'ضخامت دیواره کمک‌کننده است، اما آستانهٔ مستقلی برای تعیین علت نیست. مورفولوژی، توزیع کامل و تصاویر قبلی را در نظر بگیرید.'), lang)}</p>
      </div>
    </LessonSection>
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={pick(chapter.title, lang)}><div className={styles.body}><p>{pick(chapter.lead, lang)}</p><FeatureTable rows={chapter.rows} lang={lang}/><p className={styles.scope}>{pick(chapter.note, lang)}</p><small>{pick(L('Thorax.pdf, PDF S. 25–26. Begriffe und diagnostische Einordnung ergänzt mit den verlinkten Quellen.', 'Thorax.pdf, PDF pp. 25–26. Terminology and diagnostic context supplemented by the linked sources.', 'Thorax.pdf، صفحات PDF ۲۵–۲۶. اصطلاحات و تفسیر تشخیصی با منابع پیوندشده تکمیل شده‌اند.'), lang)}</small></div></LessonSection>)}
    <LessonSection id="check" icon="case" title={pick(lesson.check.title, lang)}><div className={styles.body}><Check lang={lang}/><p className={styles.scope}>{pick(L('Der CT-Ausschnitt aus dem PDF ist eingebettet und nur mit der sichtbaren ID (rID 16033) gekennzeichnet; externe Website und Mitwirkende wurden nicht unabhängig verifiziert. Die separaten Radiopaedia-Referenzen zu Abszess und TB sind Links, keine eingebetteten Fälle.', 'The PDF-supplied CT crop is embedded and labeled only with its visible ID (rID 16033); its external site/contributor attribution was not independently verified. The separate abscess and TB Radiopaedia references below are links, not embedded cases.', 'برش CT برگرفته از PDF در صفحه درج شده و فقط با شناسهٔ قابل‌مشاهدهٔ rID 16033 مشخص شده است؛ وب‌سایت و مشارکت‌کنندهٔ بیرونی مستقلاً تأیید نشده‌اند. پیوندهای جداگانهٔ Radiopaedia برای آبسه و سل، لینک هستند و تصویر کیس را جاسازی نمی‌کنند.'), lang)}</p><nav aria-label={pick(L('Verwandte Lektionen', 'Related lessons', 'درس‌های مرتبط'), lang)}><ul><li><Link href={route('/thorax/tuberkulose-muster')}>{pick(L('Tuberkulose-Muster', 'Tuberculosis patterns', 'الگوهای سل'), lang)}</Link></li><li><Link href={route('/thorax/pneumonie-muster')}>{pick(L('Pneumoniemuster', 'Pneumonia patterns', 'الگوهای پنومونی'), lang)}</Link></li><li><Link href={route('/thorax/hrct/dichteminderung')}>{pick(L('HRCT: Dichteminderung', 'HRCT: decreased attenuation', 'HRCT: کاهش دانسیته'), lang)}</Link></li></ul></nav></div></LessonSection>
    <LessonSection id="take-home" icon="summary" title={label('takeHome')}><ol className={styles.rules}>{lesson.takeHome.map((rule, i) => <li key={i}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
