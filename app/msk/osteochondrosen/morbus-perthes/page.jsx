'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources , TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { MORBUS_PERTHES_LESSON as lesson } from '@/data/morbusPerthesLesson'
import styles from './page.module.css'

const pick = (value, lang) => value?.[lang] ?? value?.de ?? value
const L = (de, en, fa) => ({ de, en, fa })
function Icon({ id }) {
  const paths = { pattern: 'M4 18h16M6 15l3-5 3 3 5-8 2 3', timeline: 'M4 12h16M6 8l-4 4 4 4m12-8 4 4-4 4', imaging: 'M4 4h16v16H4zM7 15l3-4 2 2 4-6 2 8', differential: 'M12 3v18M4 6h6v5H4zm10 7h6v5h-6z', check: 'm4 12 5 5L20 6' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern} /></svg>
}

function Table({ caption, headers, rows, lang }) {
  const t = value => pick(value, lang)
  return <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={t(caption)}><table><caption>{t(caption)}</caption><thead><tr>{headers.map((header, i) => <th scope="col" key={i}>{t(header)}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{t(cell)}</th> : <td key={j}>{t(cell)}</td>)}</tr>)}</tbody></table></div>
}

function RadiographSeries({ lang }) {
  const t = value => pick(value, lang)
  return <section className={styles.caseSeries} aria-label={t(L('Zeitserie der Röntgenbilder', 'Radiograph time series', 'سری زمانی رادیوگرافی'))}>
    <div className={styles.caseGallery} role="region" tabIndex={0} aria-label={t(L('Drei Zeitpunkte, horizontal durchblättern', 'Three time points, scroll horizontally', 'سه زمان؛ پیمایش افقی'))}>
      {lesson.radiographSeries.map(image => <figure className={styles.caseCard} key={image.src}>
        <img src={image.src} alt={t(image.alt)} width="722" height={246} loading="lazy" />
        <figcaption><strong>{t(image.period)}</strong><span>{t(L("Beckenübersicht und Lauenstein-Aufnahme. Fall: H. Salam, Radiopaedia, rID 9742; gekürzter Bildausschnitt.", "Pelvic overview and Lauenstein view. Case: H. Salam, Radiopaedia, rID 9742; cropped excerpt.", 'نمای کلی لگن و نمای لائونشتاین. کیس: H. Salam، رادیوپدیا، rID 9742؛ برش تصویر.'))}</span></figcaption>
      </figure>)}
    </div>
    <p className={styles.seriesNote}>{t(L('Die Reihenfolge folgt den ersten drei klar beschrifteten Zeilen auf PDF S. 126. Die widersprüchlich beschriftete Schlusszeile ist nicht enthalten. Kein Therapie- oder Prognosevergleich.', 'Order follows the first three clearly labelled rows on PDF p. 126. The final row with conflicting timing is omitted. This is not a treatment or prognosis comparison.', 'ترتیب تصاویر از سه ردیف نخست با برچسب روشن در صفحهٔ ۱۲۶ PDF پیروی می‌کند. ردیف پایانی با زمان متناقض حذف شده است. این تصویر مقایسهٔ درمان یا پیش‌آگهی نیست.'))}</p>
  </section>
}

function Timeline({ lang }) {
  const t = value => pick(value, lang)
  return <figure className={styles.timeline}>
    <svg viewBox="0 0 1000 235" role="img" aria-labelledby="perthes-timeline-title perthes-timeline-desc" direction={lang === 'fa' ? 'rtl' : 'ltr'}>
      <title id="perthes-timeline-title">{t(L('Schematischer zeitlicher Verlauf nach Waldenström', 'Schematic temporal course based on Waldenström', 'سیر زمانی شماتیک بر اساس والدنستروم'))}</title>
      <desc id="perthes-timeline-desc">{t(L('Fünf schematische Epiphysenformen von der Initialphase über Kondensation, Fragmentation und Reparatur bis zur möglichen Restform. Keine Röntgenaufnahmen.', 'Five schematic epiphyseal shapes from initial phase through condensation, fragmentation and repair to a possible residual shape. These are not radiographs.', 'پنج شکل شماتیک از اپی‌فیز، از مرحلهٔ اولیه تا تراکم، قطعه‌قطعه‌شدن، ترمیم و شکل باقی‌ماندهٔ احتمالی. این‌ها رادیوگرافی نیستند.'))}</desc>
      <path d="M78 116H922" stroke="#8aa5b0" strokeWidth="4" strokeLinecap="round" />
      {lesson.stages.map((stage, i) => {
        const x = 100 + i * 200
        const fills = ['#dbe8ec', '#c9dbe1', '#e7d0b4', '#e8d8c5', '#d6e5e6']
        return <g key={stage.shape}>
          <circle cx={x} cy="116" r="70" fill={fills[i]} stroke="#527486" strokeWidth="3" />
          {i === 0 && <path d={`M${x-26} 100q18-25 48-8`} fill="none" stroke="#b26c43" strokeWidth="7" strokeLinecap="round" />}
          {i === 1 && <path d={`M${x-35} 83q35-20 68 2M${x-37} 146q39 16 74-2`} fill="none" stroke="#b26c43" strokeWidth="6" strokeLinecap="round" />}
          {i === 2 && <><path d={`M${x-45} 104l23-24 15 23 23-20 28 22M${x-42} 132l25-18 20 24 22-19 25 19`} fill="none" stroke="#b26c43" strokeWidth="6" strokeLinejoin="round"/><path d={`M${x-52} 66h104`} stroke="#527486" strokeWidth="3" /></>}
          {i === 3 && <path d={`M${x-42} 112q38-35 82 0M${x-36} 135q35 28 72 0`} fill="none" stroke="#a97947" strokeWidth="6" strokeLinecap="round" />}
          {i === 4 && <path d={`M${x-43} 78q43-24 86 0v66q-43 24-86 0z`} fill="none" stroke="#527486" strokeWidth="5" />}
        </g>
      })}
    </svg>
    <figcaption>{t(L('Eigene Lehrgrafik zur fünfteiligen zeitlichen Beschreibung in MSK.pdf S. 125; Formen sind abstrahiert und keine diagnostischen Bildzeichen.', 'Original teaching graphic for the five-part temporal description in MSK.pdf p. 125; shapes are abstracted and are not diagnostic imaging signs.', 'نمودار آموزشی ساخته‌شده برای توصیف زمانی پنج‌بخشی MSK.pdf صفحهٔ ۱۲۵؛ شکل‌ها انتزاعی‌اند و نشانه‌های تشخیصی تصویربرداری نیستند.'))}</figcaption>
  </figure>
}

function Check({ lang }) {
  const t = value => pick(value, lang)
  const [answer, setAnswer] = useState(null)
  return <div className={styles.check}>
    <h3>{t(L('Bildgebung auswählen', 'Choose the imaging test', 'روش تصویربرداری را انتخاب کنید'))}</h3>
    <p>{t(lesson.check.question)}</p>
    <fieldset><legend>{t(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'))}</legend>{lesson.check.options.map((option, i) => <label key={i}><input type="radio" name="perthes-imaging-check" checked={answer === i} onChange={() => setAnswer(i)} /><span>{t(option)}</span></label>)}</fieldset>
    {answer !== null && <p role="status" className={answer === lesson.check.answer ? styles.correct : styles.feedback}><strong>{answer === lesson.check.answer ? t(L('Richtig. ', 'Correct. ', 'درست است. ')) : t(L('Noch einmal prüfen. ', 'Review the imaging roles. ', 'نقش روش‌های تصویربرداری را دوباره بررسی کنید. '))}</strong>{t(lesson.check.feedback)}</p>}
  </div>
}

export default function MorbusPerthesPage() {
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
    close: t(L('Schließen', 'Close', 'بستن')), takeHome: t(lesson.sections[4].title), sources: t(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه')),
  }
  const sources = [
    { tag: 'MSK.pdf · pp. 124–127', title: t(L('Morbus Perthes: Text und Seitenabbildungen', 'Perthes disease: text and page images', 'بیماری پرتس: متن و تصاویر صفحات')), citation: t(lesson.notice) },
    { tag: 'Radiopaedia · rID 9742', title: t(L('Legg-Calvé-Perthes disease', 'Legg-Calvé-Perthes disease', 'بیماری لگ-کالو-پرتس')), href: 'https://doi.org/10.53347/rID-9742', citation: t(L('H. Salam, Radiopaedia case rID 9742. Die ersten drei klar beschrifteten Zeitpunkte aus MSK.pdf S. 126 wurden als Zeilen-Ausschnitte übernommen; die widersprüchliche letzte Zeile wurde ausgelassen. Bildnutzung laut Nutzer für die Lerncore-PDFs freigegeben.', 'H. Salam, Radiopaedia case rID 9742. The first three clearly labelled time points from MSK.pdf p. 126 are used as row crops; the final row with conflicting timing is omitted. The user authorized image use from the Lerncore PDFs.', 'H. Salam، کیس Radiopaedia با شناسهٔ rID 9742. سه زمانِ دارای برچسب روشن از صفحهٔ ۱۲۶ MSK.pdf به‌صورت برش ردیف‌ها استفاده شده‌اند؛ ردیف پایانی با زمان متناقض حذف شده است. کاربر استفاده از تصاویر PDFهای Lerncore را مجاز دانسته است.')) },
    { tag: 'POSNA · Study Guide', title: t(L('Legg-Calvé-Perthes Disease', 'Legg-Calvé-Perthes disease', 'بیماری لگ-کالو-پرتس')), href: 'https://posna.org/physician-education/study-guide/legg-calve-perthes-disease', citation: L("Pediatric Orthopaedic Society of North America. Abgerufen am 20.10.2026. Zur Prüfung der Stadienfunktion und der Bedeutung einer synchronen beidseitigen Beteiligung verwendet.", "Pediatric Orthopaedic Society of North America. Accessed 2026-10-20. Used to verify stage roles and the significance of synchronous bilateral involvement.", "انجمن ارتوپدی کودکان آمریکای شمالی. تاریخ دسترسی: ۲۰۲۶-۱۰-۲۰. برای بررسی نقش مراحل و اهمیت درگیری هم‌زمان دوطرفه استفاده شده است.") },
    { tag: 'AJR · 2009', title: t(L('MRT bei Morbus Perthes', 'MRI of Perthes disease', 'MRI در بیماری پرتس')), href: 'https://pubmed.ncbi.nlm.nih.gov/19843759/', citation: 'Dillman JR, Hernandez RJ. AJR Am J Roentgenol. 2009;193(5):1394–1407. doi:10.2214/AJR.09.2444. PMID:19843759.' },
    { tag: 'J Child Orthop · 2023', title: t(L('Natürlicher Verlauf und Bildgebung', 'Natural evolution and imaging', 'سیر طبیعی و تصویربرداری')), href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10549695/', citation: 'Joseph B, Shah H, Perry DC. J Child Orthop. 2023;17(6):566–580. doi:10.1177/18632521231203009.' },
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" heroImageAlt={t(L('Schematische kindliche Hüfte mit markiertem Femurkopf und angedeuteter Durchblutung; keine Patientenaufnahme.', 'Schematic child hip with femoral head highlighted and blood supply suggested; not a patient image.', 'شماتیک لگن کودک با سر فمور مشخص و خون‌رسانی به‌صورت مفهومی؛ تصویر بیمار نیست.'))} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: 'MSK', href: langHref('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={(lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.id === 'take-home' ? 'check' : section.id }))).map(section=>({...section,emphasis:section.emphasis||["take-home"].includes(section.id)}))}
    labels={labels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/perthes-hero.svg', heroImageOpacity: .96, accent: '#8fb9c7', accentStrong: '#315f70', accentSoft: '#e6f0f2', secondary: '#d7a06b', secondaryStrong: '#80522b', heroBase: '#203746' }}
    className={styles.page} sources={<LessonSources title={labels.sources} items={sources} note={t(L('Drei klar beschriftete Zeitpunkte des Radiopaedia-Falls rID 9742 aus MSK.pdf S. 126 werden gezeigt; die letzte Zeile mit widersprüchlicher Zeitangabe wurde ausgelassen. Dies ist keine vollständige Verlaufsserie. Behandlung und individuelle Prognose sind nicht Gegenstand dieser begrenzten Lektion.', 'Three clearly labelled time points from Radiopaedia case rID 9742, reproduced in MSK.pdf p. 126, are shown; the final row with conflicting timing was omitted. This is not a complete follow-up series. Treatment and individual prognosis are outside this bounded lesson.', 'سه زمانِ دارای برچسب روشن از کیس Radiopaedia با شناسهٔ rID 9742 که در صفحهٔ ۱۲۶ MSK.pdf آمده‌اند نمایش داده می‌شوند؛ ردیف پایانی با زمان متناقض حذف شده است. این مجموعهٔ پیگیری کامل نیست. درمان و پیش‌آگهی فردی خارج از دامنهٔ این درس محدود هستند.'))} />}>
    <LessonSection id="pattern" icon="pattern" title={t(lesson.sections[0].title)} bodyClassName={styles.body}><p className={styles.lead}>{t(lesson.intro)}</p><ul className={styles.list}>{lesson.features.map((item, i) => <li key={i}>{t(item)}</li>)}</ul></LessonSection>
    <LessonSection id="timeline" icon="timeline" title={t(lesson.sections[1].title)} bodyClassName={styles.body}><p>{t(L('Das PDF bezeichnet seine fünf Abschnitte als Stadien nach Waldenström. Klassifikationen verwenden unterschiedliche Einteilungen: POSNA beschreibt die klassische Abfolge in vier Gruppen. Deshalb übernimmt die Lektion die fünf Begriffe des PDFs als zeitliche Beschreibung und macht daraus keine universelle oder prognostische Klassifikation.', 'The PDF calls its five parts Waldenström stages. Classifications use different groupings: POSNA describes the classic sequence in four groups. This lesson therefore preserves the PDF’s five terms as a temporal description, not as a universal or prognostic classification.', 'PDF این پنج بخش را مراحل والدنستروم می‌نامد. طبقه‌بندی‌ها تقسیم‌بندی‌های متفاوتی دارند؛ POSNA توالی کلاسیک را در چهار گروه توصیف می‌کند. بنابراین این درس اصطلاحات پنج‌گانهٔ PDF را به‌صورت توصیف زمانی حفظ می‌کند، نه طبقه‌بندی همگانی یا پیش‌آگهی‌دهنده.'))}</p><Timeline lang={lang} /><Table lang={lang} caption={L('Fünf zeitliche Abschnitte laut PDF', 'Five temporal phases in the PDF', 'پنج مرحلهٔ زمانی طبق PDF')} headers={[L('Phase', 'Phase', 'مرحله'), L('Bildidee', 'Imaging idea', 'نکتهٔ تصویری')]} rows={lesson.stages.map(stage => [stage.name, stage.finding])} /></LessonSection>
    <LessonSection id="imaging" icon="imaging" title={t(lesson.sections[2].title)} bodyClassName={styles.body}><h3>{t(L('Projektionsradiographie', 'Plain radiography', 'رادیوگرافی ساده'))}</h3><ul className={styles.list}>{lesson.radiograph.map((item, i) => <li key={i}>{t(item)}</li>)}</ul><RadiographSeries lang={lang} /><h3>{t(L('MRT', 'MRI', 'MRI'))}</h3><ul className={styles.list}>{lesson.mri.map((item, i) => <li key={i}>{t(item)}</li>)}</ul><p className={styles.note}>{t(L('Die MRT-Beschreibungen folgen dem PDF-Text. Die dort abgebildeten Panels sind nicht eindeutig sequenzbeschriftet und werden deshalb nicht als Bildbeweis gezeigt.', 'The MRI descriptions follow the PDF text. Its pictured panels are not clearly sequence-labelled, so they are not shown as image evidence.', 'توضیحات MRI از متن PDF پیروی می‌کنند. پنل‌های تصویری آن برچسب توالی روشنی ندارند و بنابراین به‌عنوان شاهد تصویری نمایش داده نمی‌شوند.'))}</p><Check lang={lang} /></LessonSection>
    <LessonSection id="differential" icon="differential" title={t(lesson.sections[3].title)} bodyClassName={styles.body}><p>{t(L('Das Bild darf nicht isoliert von Verlauf und Klinik gelesen werden. Das PDF nennt transiente Synovitis und andere Ursachen der Femurkopfnekrose; bei bilateralem Befall ist die Suche nach einer sekundären Ursache besonders relevant.', 'Imaging should not be read separately from the clinical course. The PDF names transient synovitis and other causes of femoral-head osteonecrosis; bilateral disease makes assessment for secondary causes particularly relevant.', 'تصویر نباید جدا از سیر بیماری و وضعیت بالینی تفسیر شود. PDF سینوویت گذرا و علل دیگر نکروز سر فمور را ذکر می‌کند؛ درگیری دوطرفه بررسی علل ثانویه را مهم‌تر می‌کند.'))}</p><Table lang={lang} caption={L('Differenzialdiagnosen aus PDF und fachlicher Referenz', 'Differentials from the PDF and clinical reference', 'افتراق‌ها بر پایهٔ PDF و مرجع تخصصی')} headers={[L('Vergleich', 'Differential', 'افتراق'), L('Was bei der Einordnung hilft', 'What helps with interpretation', 'چه چیزی در تفسیر کمک می‌کند')]} rows={lesson.differentials} /></LessonSection>
    <LessonSection id="take-home" icon="check" title={t(lesson.sections[4].title)} bodyClassName={styles.body}><TakeHomeList items={lesson.takeHome.map((item,i)=>({title:t(item),detail:''}))}/></LessonSection>
  </StandardLessonShell>
}
