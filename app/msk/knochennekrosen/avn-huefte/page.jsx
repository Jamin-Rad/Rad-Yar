'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { MSK_AVN_HUEFTE_LESSON as lesson } from '@/data/mskAvnHuefteLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] ?? value?.de ?? value
function Icon({ id }) {
  const paths = {
    definition: 'M4 5h16v14H4zM8 9h8M8 13h5',
    imaging: 'M4 4h16v16H4zM7 15l3-4 2 2 4-6 2 8',
    differential: 'M12 3v18M4 6h6v5H4zm10 7h6v5h-6z',
    check: 'm4 12 5 5L20 6',
    summary: 'M5 5h14M5 12h14M5 19h14',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.definition} /></svg>
}

function DataTable({ caption, headers, rows, lang }) {
  const t = value => pick(value, lang)
  return <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={t(caption)}><table><caption>{t(caption)}</caption><thead><tr>{headers.map((header, i) => <th scope="col" key={i}>{t(header)}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{t(cell)}</th> : <td key={j}>{t(cell)}</td>)}</tr>)}</tbody></table></div>
}

function StagingDiagram({ lang }) {
  const t = value => pick(value, lang)
  const entries = [
    [L('0', '0', '۰'), L('Histologie', 'Histology', 'بافت‌شناسی'), L('Bildgebung unauffällig', 'Imaging unremarkable', 'تصویربرداری بدون یافته')],
    [L('I', 'I', 'I'), L('Früh', 'Early', 'زودرس'), L('Röntgen negativ · MRT-Ödem', 'X-ray negative · MRI oedema', 'رادیوگرافی منفی · ادم MRI')],
    [L('II', 'II', 'II'), L('Reparation', 'Repair', 'ترمیم'), L('Sklerose · Zysten', 'Sclerosis · cysts', 'اسکلروز · کیست')],
    [L('III', 'III', 'III'), L('Einbruch', 'Collapse', 'فروریزش'), L('Crescent · Fraktur', 'Crescent · fracture', 'کرسنت · شکستگی')],
    [L('IV', 'IV', 'IV'), L('Spät', 'Late', 'دیررس'), L('sekundäre Arthrose', 'secondary OA', 'آرتروز ثانویه')],
  ]
  return <figure className={styles.stageFigure}>
    <svg viewBox="0 0 1000 188" role="img" aria-labelledby="avn-stage-title avn-stage-desc" direction={lang === 'fa' ? 'rtl' : 'ltr'}>
      <title id="avn-stage-title">{t(L('Unversionierte Stadientabelle aus dem PDF', 'Unversioned stage table from the PDF', 'جدول مراحل بدون نسخه در PDF'))}</title>
      <desc id="avn-stage-desc">{t(L('Fünf getrennte Karten fassen die Stufen 0 bis IV der nicht datierten PDF-Tabelle zusammen. Sie sind nicht die 2019 revidierte ARCO-Klassifikation.', 'Five separate cards summarise stages 0 to IV in the undated PDF table. They are not the 2019 revised ARCO classification.', 'پنج کارت جداگانه مراحل ۰ تا IV جدول بدون تاریخ PDF را خلاصه می‌کنند. این‌ها طبقه‌بندی بازنگری‌شدهٔ ARCO در ۲۰۱۹ نیستند.'))}</desc>
      {entries.map((entry, i) => {
        const x = 8 + i * 198
        return <g key={i}>
          <rect x={x} y="8" width="184" height="164" rx="13" fill={i < 2 ? '#eef5f7' : '#faf2ea'} stroke={i < 2 ? '#8caab8' : '#c59b78'} strokeWidth="2" />
          <circle cx={x + 92} cy="39" r="21" fill={i < 2 ? '#d6e7ec' : '#efdcc9'} stroke={i < 2 ? '#53819b' : '#b77a48'} strokeWidth="2" />
          <text x={x + 92} y="45" textAnchor="middle" fontSize="17" fontWeight="700" fill="#203746">{t(entry[0])}</text>
          <text x={x + 92} y="84" textAnchor="middle" fontSize="14" fontWeight="700" fill="#203746">{t(entry[1])}</text>
          <text x={x + 92} y="119" textAnchor="middle" fontSize="12" fill="#405966">{t(entry[2])}</text>
        </g>
      })}
    </svg>
    <figcaption>{t(L('Lernschema nach MSK.pdf S. 120 (Druck S. 119). Die nicht datierte Quelle nennt keine Klassifikationsversion; die Karten werden unten mit der 2019 revidierten Systematik verglichen.', 'Learning schematic based on MSK.pdf p. 120 (printed p. 119). The undated source gives no classification version; the cards are compared with the 2019 revised system below.', 'شماتیک آموزشی بر پایهٔ MSK.pdf صفحهٔ ۱۲۰ (چاپی ۱۱۹). منبع بدون تاریخ نسخهٔ طبقه‌بندی را مشخص نمی‌کند؛ کارت‌ها در ادامه با نظام بازنگری‌شدهٔ ۲۰۱۹ مقایسه می‌شوند.'))}</figcaption>
  </figure>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const t = value => pick(value, lang)
  return <div className={styles.check}>
    <h3>{t(L('Welche Zuordnung stimmt?', 'Which pairing is correct?', 'کدام تطبیق درست است؟'))}</h3>
    <p>{t(lesson.check.question)}</p>
    <fieldset><legend>{t(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'))}</legend>{lesson.check.options.map((option, i) => <label key={i}><input type="radio" name="avn-arco-check" checked={answer === i} onChange={() => setAnswer(i)} /><span>{t(option)}</span></label>)}</fieldset>
    {answer !== null && <p role="status" className={answer === lesson.check.answer ? styles.correct : styles.feedback}><strong>{answer === lesson.check.answer ? t(L('Richtig. ', 'Correct. ', 'درست است. ')) : t(L('Noch einmal zuordnen. ', 'Try the pairing again. ', 'یک‌بار دیگر تطبیق دهید. '))}</strong>{t(lesson.check.feedback)}</p>}
  </div>
}

export default function AvnHueftePage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const labels = {
    path: t(L('Lernweg', 'Learning path', 'مسیر یادگیری')),
    contents: t(L('Inhalt', 'Contents', 'فهرست')),
    progress: t(L('gelesen', 'read', 'خوانده‌شده')),
    continue: t(L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری')),
    completeLesson: t(L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده')),
    lessonCompleted: t(L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد')),
    complete: t(L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده')),
    completed: t(L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده')),
    open: t(L('Abschnitt öffnen', 'Open section', 'بازکردن بخش')),
    close: t(L('Schließen', 'Close', 'بستن')),
    takeHome: t(lesson.sections[4].title),
    sources: t(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه')),
  }
  const langHref = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sources = [{
    tag: 'MSK.pdf · pp. 120–121',
    title: t(L('Avaskuläre Nekrose (AVN)', 'Avascular necrosis (AVN)', 'نکروز آواسکولار (AVN)')),
    citation: t(L('PDF S. 120–121; Druck S. 119–120. Text und Seitendarstellung geprüft. Keine Patienten- oder MRT-Fallbilder. Die AVN-Seite nennt das MRT als Goldstandard (Quellaussage).', 'PDF pp. 120–121; printed pp. 119–120. Text and page images reviewed; no patient or MRI case images. The AVN page calls MRI the gold standard (source statement).', 'صفحات PDF ۱۲۰–۱۲۱؛ صفحات چاپی ۱۱۹–۱۲۰. متن و تصویر صفحه بررسی شد؛ تصویر بیمار یا کیس MRI ندارد. صفحهٔ AVN، MRI را «استاندارد طلایی» می‌نامد (بیان منبع).')),
  }, {
    tag: 'ARCO · revised 2019',
    title: t(L('Revidierte ARCO-Stadieneinteilung der Femurkopfnekrose', '2019 revised ARCO staging for osteonecrosis of the femoral head', 'مرحله‌بندی بازنگری‌شدهٔ ARCO در ۲۰۱۹ برای نکروز سر فمور')),
    href: 'https://pubmed.ncbi.nlm.nih.gov/31866252/',
    citation: 'Yoon BH et al. J Arthroplasty. 2020;35(4):933–940. doi:10.1016/j.arth.2019.11.029. PMID:31866252.',
    scope: t(L('Primärquelle für den unten separat markierten Vergleich; der Quelltext der PDF wird dadurch nicht stillschweigend umgedeutet.', 'Primary source for the separately marked comparison below; this does not silently reinterpret the PDF source text.', 'منبع اولیه برای مقایسهٔ جداگانهٔ زیر است؛ متن منبع PDF به‌طور ضمنی بازتفسیر نمی‌شود.')),
  }]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" heroImageAlt={t(L('Nichtdiagnostisches Schema der im PDF beschriebenen Epiphysennekrose und ARCO-Bildkorrelate.', 'Non-diagnostic schematic of epiphyseal necrosis and the ARCO imaging correlates described in the PDF.', 'شماتیک غیرتشخیصی نکروز اپی‌فیز و همبسته‌های تصویربرداری ARCO توصیف‌شده در PDF.'))} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: 'MSK', href: langHref('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={lesson.sections.map((section, i) => ({ id: section.id, label: t(section.title), icon: ['definition','imaging','differential','check','summary'][i], emphasis: section.emphasis }))}
    labels={labels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/avn-huefte/hero.svg', heroImageOpacity: .92, accent: '#8baac2', accentStrong: '#345d7b', accentSoft: '#e9f0f5', secondary: '#d19b64', secondaryStrong: '#815124', heroBase: '#1e3545' }}
    className={styles.page} sources={<LessonSources title={labels.sources} items={sources} note={t(lesson.notice)} />}>
    <LessonSection id="definition" icon="definition" title={t(lesson.sections[0].title)} bodyClassName={styles.body}>
      <p className={styles.lead}>{t(lesson.intro)}</p>
      <p>{t(L('Das PDF nennt den Femurkopf als klassische Lokalisation und führt außerdem Humeruskopf, Femurkondylus, Talus und Skaphoid auf.', 'The PDF calls the femoral head the classic site and also names the humeral head, femoral condyle, talus and scaphoid.', 'PDF سر فمور را محل کلاسیک معرفی می‌کند و سر هومروس، کندیل فمور، تالوس و اسکافوئید را نیز نام می‌برد.'))}</p>
      <p>{t(lesson.bilateralNote)}</p>
      <ul className={styles.list}>{lesson.localizations.map((site, i) => <li key={i}>{t(site)}</li>)}</ul>
      <h3>{t(L('Im PDF genannte Ursachen', 'Causes listed in the PDF', 'علل ذکرشده در PDF'))}</h3>
      <ul className={styles.list}>{lesson.causes.map((cause, i) => <li key={i}>{t(cause)}</li>)}</ul>
      <p>{t(L('Die Tabelle auf PDF S. 120 trägt keine Jahres- oder Versionsangabe. Sie wird deshalb nur als unversionierte Quellangabe gezeigt und nicht als gültige aktuelle ARCO-Stadieneinteilung gelehrt.', 'The table on PDF p. 120 gives no year or version. It is therefore shown only as an unversioned source statement, not taught as the current ARCO staging system.', 'جدول صفحهٔ ۱۲۰ PDF سال یا نسخه‌ای ذکر نمی‌کند. بنابراین فقط به‌عنوان بیان بدون نسخهٔ منبع نشان داده می‌شود و به‌عنوان مرحله‌بندی جاری ARCO آموزش داده نمی‌شود.'))}</p>
      <DataTable lang={lang} caption={L('Unversionierte Stufenangaben in MSK.pdf (keine aktuelle ARCO-Klassifikation)', 'Unversioned stages in MSK.pdf (not the current ARCO classification)', 'مراحل بدون نسخه در MSK.pdf (نه طبقه‌بندی جاری ARCO)')} headers={[L('Stufe in PDF', 'PDF stage', 'مرحله در PDF'), L('Korrelat laut PDF', 'Correlate in PDF', 'همبسته طبق PDF')]} rows={lesson.pdfStages} />
      <StagingDiagram lang={lang} />
      <aside className={styles.note}><strong>{t(L('Ergänzung: revidiertes ARCO 2019', 'Supplement: revised ARCO 2019', 'تکمله: ARCO بازنگری‌شدهٔ ۲۰۱۹'))}</strong><p>{t(L('Die 2019 revidierte Primärklassifikation hat die Stufe 0 gestrichen. Stufe I: normales Röntgenbild bei positivem MRT oder Knochenszintigramm; ein MRT-Ödem allein ist kein vollständiges Staging-Kriterium. Stufe II: Röntgenveränderungen ohne Fraktur oder Abflachung. Stufe III: Fraktur im subchondralen oder nekrotischen Bereich, unterteilt in IIIA (Depression ≤2 mm) und IIIB (>2 mm). Stufe IV: radiographische Arthrosezeichen. Diese Ergänzung dient dem Versionsvergleich und ersetzt keine fachärztliche Freigabe.', 'The 2019 revised primary classification removed stage 0. Stage I: normal X-ray with positive MRI or bone scan; MRI oedema alone is not a complete staging criterion. Stage II: radiographic changes without fracture or flattening. Stage III: fracture in the subchondral or necrotic zone, divided into IIIA (depression ≤2 mm) and IIIB (>2 mm). Stage IV: radiographic signs of osteoarthritis. This supplement compares versions and does not replace specialist approval.', 'در طبقه‌بندی اولیهٔ بازنگری‌شدهٔ ۲۰۱۹، مرحلهٔ ۰ حذف شده است. مرحلهٔ I: رادیوگرافی طبیعی همراه MRI یا اسکن استخوان مثبت؛ ادم MRI به‌تنهایی معیار کامل مرحله‌بندی نیست. مرحلهٔ II: تغییرات رادیوگرافیک بدون شکستگی یا صاف‌شدن. مرحلهٔ III: شکستگی در ناحیهٔ زیرغضروفی یا نکروتیک که به IIIA (فرورفتگی ≤۲ میلی‌متر) و IIIB (>۲ میلی‌متر) تقسیم می‌شود. مرحلهٔ IV: نشانه‌های رادیوگرافیک آرتروز. این تکمله برای مقایسهٔ نسخه‌هاست و جایگزین تأیید متخصص نیست.'))}</p></aside>
      <DataTable lang={lang} caption={L('Separater Vergleich: ARCO 2019 revidiert (Yoon et al.)', 'Separate comparison: revised ARCO 2019 (Yoon et al.)', 'مقایسهٔ جداگانه: ARCO بازنگری‌شدهٔ ۲۰۱۹ (Yoon و همکاران)')} headers={[L('Stadium', 'Stage', 'مرحله'), L('Kernaussage der Primärquelle', 'Core statement from primary source', 'نکتهٔ اصلی منبع اولیه')]} rows={lesson.revisedStages} />
    </LessonSection>
    <LessonSection id="imaging" icon="imaging" title={t(lesson.sections[1].title)} bodyClassName={styles.body}>
      <p>{t(L('Die Seiten nennen Bildzeichen schriftlich, zeigen aber keine MRT- oder Röntgenfälle. Lies die Tabelle daher als Merkhilfe für die Textbeschreibung, nicht als Training zur Bilddiagnose.', 'The pages list imaging signs in text but show no MRI or radiographic cases. Use the table as a memory aid for the written descriptions, not as image-diagnosis training.', 'صفحات، نشانه‌های تصویربرداری را متنی ذکر می‌کنند، اما تصویر کیس MRI یا رادیوگرافی ندارند. بنابراین جدول را برای یادآوری توصیف‌ها بخوانید، نه برای تمرین تشخیص از روی تصویر.'))}</p>
      <DataTable lang={lang} caption={L('Im Modalitätenvergleich: ausschließlich schriftliche PDF-Angaben', 'Modality comparison: written PDF statements only', 'مقایسهٔ روش‌ها: فقط توضیحات متنی PDF')} headers={[L('Modalität/Sequenz', 'Modality/sequence', 'روش/توالی'), L('Beschriebenes Muster', 'Described pattern', 'الگوی توصیف‌شده'), L('Hinweis zum Quellenumfang', 'Source-scope note', 'یادداشت دامنهٔ منبع')]} rows={lesson.imaging} />
    </LessonSection>
    <LessonSection id="differentials" icon="differential" title={t(lesson.sections[2].title)} bodyClassName={styles.body}>
      <p>{t(L('Für die im PDF genannten Differenzialdiagnosen ist die Lokalisation zusammen mit dem beschriebenen Signal-/Ödemmuster der Anker. Die Liste ist auf diese drei Vergleiche begrenzt.', 'For the differentials named in the PDF, location together with the described signal/oedema pattern is the anchor. This list is limited to these three comparisons.', 'در افتراق‌های ذکرشده در PDF، محل به‌همراه الگوی سیگنال/ادم توصیف‌شده نقطهٔ اتکا است. فهرست به همین سه مقایسه محدود می‌شود.'))}</p>
      <DataTable lang={lang} caption={L('Abgrenzung nach dem PDF', 'Differential points from the PDF', 'نکات افتراقی طبق PDF')} headers={[L('Vergleich', 'Comparison', 'مقایسه'), L('Abgrenzung laut Quelle', 'Distinction in the source', 'تمایز طبق منبع')]} rows={lesson.differentials} />
    </LessonSection>
    <LessonSection id="check" icon="check" title={t(lesson.sections[3].title)} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="summary" title={t(lesson.sections[4].title)} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.takeHome.map((item, i) => <li key={i}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
