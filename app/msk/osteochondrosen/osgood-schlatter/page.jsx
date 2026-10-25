'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources , TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { OSGOOD_SCHLATTER_LESSON as lesson } from '@/data/osgoodSchlatterLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] ?? value?.de ?? value

function Icon({ id }) {
  const paths = { pattern: 'M12 3v18M5 8h14M7 8v10m10-10v10', radiograph: 'M4 4h16v16H4zM7 15l3-4 3 2 4-6', mri: 'M5 5h14v14H5zM8 12h8M12 8v8', case: 'M4 6h16v12H4zM7 15l3-4 3 2 3-5', check: 'm4 12 5 5L20 6' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern} /></svg>
}

function Check({ lang }) {
  const t = value => pick(value, lang)
  const [answer, setAnswer] = useState(null)
  return <div className={styles.check}>
    <h3>{t(L('Selbst prüfen', 'Check your understanding', 'خودآزمایی'))}</h3>
    <p>{t(lesson.check.question)}</p>
    <fieldset><legend>{t(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'))}</legend>{lesson.check.options.map((option, i) => <label key={i}><input type="radio" name="osgood-schlatter-check" checked={answer === i} onChange={() => setAnswer(i)} /><span>{t(option)}</span></label>)}</fieldset>
    {answer !== null && <p role="status" className={answer === lesson.check.answer ? styles.correct : styles.feedback}><strong>{answer === lesson.check.answer ? t(L('Richtig. ', 'Correct. ', 'درست است. ')) : t(L('Noch einmal prüfen. ', 'Review the source caveat. ', 'هشدار منبع را دوباره مرور کنید. '))}</strong>{t(lesson.check.feedback)}</p>}
  </div>
}

export default function OsgoodSchlatterPage() {
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
    { tag: 'MSK.pdf · p. 71 (printed p. 70)', title: t(L('Morbus Osgood-Schlatter: Quelltext und Fallabbildung', 'Osgood-Schlatter disease: source text and case image', 'بیماری آزگود–اشلاتر: متن منبع و تصویر کیس')), citation: t(L('Vollständige PDF-Seite visuell geprüft und Text extrahiert. Die Seite enthält Definition, Epidemiologie, Zugmechanismus, Röntgen- und MRT-Zeichen, Normalvariante-Warnung, Fallbild sowie konservative Therapiehinweise. Die Lektion übernimmt die Bildgebungslehre und begrenzt klinische Therapieaussagen.', 'Full PDF page visually reviewed and text extracted. It contains definition, epidemiology, traction mechanism, radiographic and MRI findings, a normal-variant warning, case image and conservative-treatment notes. The lesson focuses on imaging and limits clinical treatment claims.', 'صفحهٔ کامل PDF از نظر بصری بررسی و متن آن استخراج شد. صفحه شامل تعریف، اپیدمیولوژی، مکانیسم کششی، یافته‌های رادیوگرافی و MRI، هشدار گونهٔ طبیعی، تصویر کیس و نکات درمان محافظه‌کارانه است. درس بر تصویربرداری متمرکز است و ادعاهای درمانی را محدود می‌کند.')) },
    { tag: 'Radiopaedia · rID 61412', title: t(L('Fallbild aus der gelieferten MSK-PDF', 'Case image in the supplied MSK PDF', 'تصویر کیس در PDF ارائه‌شدهٔ MSK')), href: 'https://doi.org/10.53347/rID-61412', citation: t(L('Auf der gelieferten Quellseite als rID 61412 gekennzeichnet; der Name des Beitragenden ist auf dieser Seite nicht angegeben. Es wird ausschließlich der vom Nutzer für diese Arbeit freigegebene PDF-Ausschnitt verwendet; eine eigenständige externe Lizenzprüfung wurde nicht vorgenommen.', 'Identified on the supplied source page as rID 61412; the contributor name is not given on that page. Only the crop from the PDF, which the user authorized for this work, is used; no independent external licence verification is claimed.', 'در صفحهٔ منبع ارائه‌شده با rID 61412 مشخص شده است؛ نام مشارکت‌کننده در آن صفحه درج نشده. فقط برش تصویر از PDF که کاربر استفاده از آن را برای این کار مجاز دانسته به‌کار رفته است؛ ادعای بررسی مستقل مجوز بیرونی نداریم.')) },
    { tag: 'Radiographics · 2022', title: t(L('Normale und abnorme Skelettreifung', 'Normal and abnormal skeletal maturation', 'بلوغ طبیعی و غیرطبیعی اسکلت')), href: 'https://pubs.rsna.org/doi/full/10.1148/rg.210088', citation: L("Kheiralla et al. RadioGraphics. 2022;42(1):E1–E22. doi:10.1148/rg.210088. Stützt den Hinweis, dass eine Fragmentierung der Tuberositas tibiae während der Reifung auch asymptomatisch vorkommen kann.", "Kheiralla et al. RadioGraphics. 2022;42(1):E1–E22. doi:10.1148/rg.210088. Used for the caution that tibial-tubercle fragmentation can occur in asymptomatic maturation.", "Kheiralla و همکاران. RadioGraphics. 2022;42(1):E1–E22. doi:10.1148/rg.210088. برای این هشدار استفاده شده که قطعه‌قطعه‌شدن برجستگی درشت‌نی در جریان بلوغ می‌تواند بدون علامت نیز رخ دهد.") },
    { tag: 'Curr Opin Pediatr · 2020', title: t(L('Aktualisierte Übersicht zur Epidemiologie', 'Updated review of epidemiology', 'مرور به‌روز اپیدمیولوژی')), href: 'https://pubmed.ncbi.nlm.nih.gov/31714260/', citation: L("Ladenhauf HN, Seitlinger G, Green DW. Curr Opin Pediatr. 2020;32(1):107–112. DOI 10.1097/MOP.0000000000000842. Die Übersicht weist darauf hin, dass ein heutiger Geschlechtsunterschied möglicherweise nicht erkennbar ist.", "Ladenhauf HN, Seitlinger G, Green DW. Curr Opin Pediatr. 2020;32(1):107–112. DOI 10.1097/MOP.0000000000000842. The review notes that a current sex difference may not be evident.", "Ladenhauf HN, Seitlinger G, Green DW. Curr Opin Pediatr. 2020;32(1):107–112. DOI 10.1097/MOP.0000000000000842. این مرور اشاره می‌کند که ممکن است امروزه تفاوتی میان دو جنس آشکار نباشد.") },
    { tag: 'Radiology · 1992', title: t(L('Bildgebungsmerkmale der Osgood-Schlatter-Läsion', 'Imaging features of the Osgood-Schlatter lesion', 'ویژگی‌های تصویربرداری ضایعهٔ آزگود–اشلاتر')), href: 'https://pubmed.ncbi.nlm.nih.gov/1438775/', citation: L("Rosenberg ZS, Kawelblum M, Cheung YY, Beltran J, Lehman WB, Grant AD. Radiology. 1992;185(3):853–858. DOI 10.1148/radiology.185.3.1438775. Retrospektive Bildgebungsserie; verdeutlicht, dass Sehnen-/Weichteilbefunde und Ossikel nicht eins zu eins den Symptomen entsprechen.", "Rosenberg ZS, Kawelblum M, Cheung YY, Beltran J, Lehman WB, Grant AD. Radiology. 1992;185(3):853–858. DOI 10.1148/radiology.185.3.1438775. Retrospective imaging series; used to qualify that tendon/soft-tissue findings and ossicles do not map one-to-one to symptoms.", "Rosenberg ZS, Kawelblum M, Cheung YY, Beltran J, Lehman WB, Grant AD. Radiology. 1992;185(3):853–858. DOI 10.1148/radiology.185.3.1438775. مجموعهٔ گذشته‌نگر تصویربرداری؛ برای روشن‌کردن اینکه یافته‌های تاندون/بافت نرم و استخوانچه‌ها تطابق یک‌به‌یک با علائم ندارند استفاده شده است.") },
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" heroImageAlt={t(L('Schematisches Knie mit markierter Tuberositas tibiae und Ansatz des Patellabands; keine Patientenaufnahme.', 'Schematic knee highlighting the tibial tubercle and patellar-ligament insertion; not a patient image.', 'شماتیک زانو با برجستگی درشت‌نی و محل اتصال رباط کشککی مشخص‌شده؛ تصویر بیمار نیست.'))} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: 'MSK', href: langHref('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={[...(lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.id }))),{id:'takehome',label:lang==='fa'?'پیام نهایی':'Take Home Message',icon:'summary',emphasis:true}]}
    labels={labels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/osgood-schlatter/hero.svg', heroImageOpacity: .96, accent: '#6aabc1', accentStrong: '#27576b', accentSoft: '#e7f1f4', secondary: '#d8a36f', secondaryStrong: '#80552d', heroBase: '#203746' }}
    className={styles.page} sources={<LessonSources title={labels.sources} items={sources} note={t(L('Begrenzte radiologische Lektion aus MSK.pdf S. 71. Es werden keine diagnostischen Kriterien, Altersgrenzen oder Therapieempfehlungen über die dokumentierten Quellen hinaus behauptet. Das einzelne Fallbild wird nicht als Beleg jedes Listenmerkmals ausgegeben.', 'Bounded radiology lesson from MSK.pdf p. 71. No diagnostic criteria, age cut-offs or treatment recommendations beyond the documented sources are asserted. The single case image is not presented as evidence of every listed finding.', 'درس محدود رادیولوژی بر اساس صفحهٔ ۷۱ MSK.pdf است. معیار تشخیصی، آستانهٔ سنی یا توصیهٔ درمانی فراتر از منابع ثبت‌شده مطرح نمی‌شود. تصویر منفرد کیس نیز شاهدی برای همهٔ یافته‌های فهرست‌شده معرفی نمی‌شود.'))} />}>
    <LessonSection id="pattern" icon="pattern" title={t(lesson.sections[0].title)} bodyClassName={styles.body}><p className={styles.lead}>{t(lesson.intro)}</p><ul className={styles.list}>{lesson.fundamentals.map((item, i) => <li key={i}>{t(item)}</li>)}</ul></LessonSection>
    <LessonSection id="radiograph" icon="radiograph" title={t(lesson.sections[1].title)} bodyClassName={styles.body}><ul className={styles.list}>{lesson.radiograph.map((item, i) => <li key={i}>{t(item)}</li>)}</ul><p className={styles.note}>{t(L('CAVE: Eine fragmentierte Apophyse kann auch ohne Erkrankung vorkommen. Nicht das Einzelzeichen, sondern das Muster im klinischen Kontext zählt.', 'CAVE: An apophysis can be fragmented without disease. Interpret the pattern in clinical context, not the isolated sign.', 'هشدار: آپوفیز می‌تواند بدون بیماری هم قطعه‌قطعه باشد. الگو را در زمینهٔ بالینی تفسیر کنید، نه یک نشانهٔ منفرد را.'))}</p></LessonSection>
    <LessonSection id="mri" icon="mri" title={t(lesson.sections[2].title)} bodyClassName={styles.body}><ul className={styles.list}>{lesson.mri.map((item, i) => <li key={i}>{t(item)}</li>)}</ul></LessonSection>
    <LessonSection id="case" icon="case" title={t(lesson.sections[3].title)} bodyClassName={styles.body}><figure className={styles.caseImage}><img src="/educational/osgood-schlatter/pdf-case-p71.jpg" alt={t(L('Seitliche Röntgenaufnahme und sagittale MRT-Aufnahme des Knies aus der Quell-PDF, Radiopaedia rID 61412; Sequenz des MRT-Bildes nicht verlässlich beschriftet.', 'Lateral knee radiograph and sagittal MRI image from the source PDF, Radiopaedia rID 61412; MRI sequence is not reliably labelled.', 'رادیوگرافی لترال و تصویر ساژیتال MRI زانو از PDF منبع، Radiopaedia rID 61412؛ سکانس تصویر MRI به‌طور قابل‌اعتماد برچسب‌گذاری نشده است.'))} width="1200" height="760" loading="lazy" /><figcaption>{t(lesson.caseCaption)}</figcaption></figure><Check lang={lang} /></LessonSection>

<LessonSection id="takehome" icon="summary"><TakeHomeList items={lesson.takeHome.map((item,i)=>({title:t(item),detail:''}))}/></LessonSection>
</StandardLessonShell>
}
