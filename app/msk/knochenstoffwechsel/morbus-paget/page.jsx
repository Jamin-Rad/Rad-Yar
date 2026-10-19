'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { MSK_MORBUS_PAGET_LESSON as lesson } from '@/data/mskMorbusPagetLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] ?? value?.de ?? value

function Icon({ id }) {
  const paths = {
    pattern: 'M4 18V6h16v12H4Zm0-6h16M10 6v12m5-12v12',
    imaging: 'M4 5h16v14H4zM8 15l3-4 2 2 3-5 2 7',
    context: 'M12 3v18M5 7l7-4 7 4M5 17l7 4 7-4',
    check: 'M5 12h14M12 5l7 7-7 7',
    takeHome: 'M5 5h14M5 12h14M5 19h14',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern} /></svg>
}

function PhaseDiagram({ lang }) {
  const titles = [
    L('Osteolytisch', 'Osteolytic', 'استئولیتیک'),
    L('Gemischt', 'Mixed', 'مختلط'),
    L('Osteosklerotisch', 'Osteosclerotic', 'استئواسکلروتیک'),
  ]
  const captions = [
    L('Überwiegender Abbau', 'Predominant resorption', 'غلبهٔ تخریب'),
    L('Abbau + ungeordneter Aufbau', 'Resorption + disorganised formation', 'تخریب + استخوان‌سازی نامنظم'),
    L('Sklerotischer, laut PDF mechanisch instabiler Knochen', 'Sclerotic bone, described as mechanically unstable in the PDF', 'استخوان اسکلروتیک که طبق PDF از نظر مکانیکی ناپایدار است'),
  ]
  const fills = ['#e5bb9b', '#d9c28f', '#a9cadb']
  return <figure className={styles.phaseFigure}>
    <svg viewBox="0 0 780 210" role="img" aria-labelledby="paget-phase-title paget-phase-desc">
      <title id="paget-phase-title">{pick(L('Schematische Umbauphasen', 'Schematic remodelling phases', 'شماتیک مراحل بازسازی'), lang)}</title>
      <desc id="paget-phase-desc">{pick(L('Konzeptuelle, nicht maßstabsgetreue Folge aus Knochenabbau, gemischtem Umbau und sklerotischem Umbau.', 'Conceptual, not-to-scale sequence of bone resorption, mixed remodelling and sclerotic remodelling.', 'توالی مفهومی و غیرمقیاسی از تخریب استخوان، بازسازی مختلط و بازسازی اسکلروتیک.'), lang)}</desc>
      <defs><marker id="paget-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0 0 9 3 0 6" fill="none" stroke="#617b8d" strokeWidth="1.5"/></marker></defs>
      {[0,1,2].map((i) => <g key={i} transform={`translate(${18 + i * 260} 18)`}>
        <rect x="0" y="0" width="230" height="164" rx="14" fill={fills[i]} fillOpacity=".27" stroke={fills[i]} strokeWidth="2" />
        <path d="M24 48h182v65H24z" fill="#f7fbfd" stroke="#62869b" strokeWidth="3" />
        {i === 0 ? <path d="M24 48h182v65H24z" fill="#d69a70" fillOpacity=".45" /> : null}
        {i >= 1 ? <path d="m30 56 32 18-15 18 35 14 16-29 33 26 25-28 49 26M29 101l34-21 27 27 35-39 31 30 43-34" fill="none" stroke={i === 1 ? '#9a6b44' : '#557c91'} strokeWidth={i === 1 ? '4' : '6'} strokeLinecap="round" strokeLinejoin="round" opacity=".75" /> : null}
        {i === 2 ? <path d="M34 61h155M34 76h155M34 92h155M34 106h155" stroke="#6a91a5" strokeWidth="5" opacity=".45" /> : null}
        <text x="115" y="137" textAnchor="middle" fill="#243b4a" fontSize="16" fontWeight="700">{pick(titles[i], lang)}</text>
        <text x="115" y="155" textAnchor="middle" fill="#405b6b" fontSize="11">{pick(captions[i], lang)}</text>
      </g>)}
      <path d="M242 99h24M502 99h24" stroke="#617b8d" strokeWidth="2" markerEnd="url(#paget-arrow)" />
    </svg>
    <figcaption>{pick(L('Das Schema verdichtet die drei im PDF genannten Umbauphasen. Es zeigt weder einen tatsächlichen Verlauf bei einer Person noch diagnostische Bildmerkmale.', 'The diagram compresses the three remodelling phases named in the PDF. It does not show an individual patient course or diagnostic imaging signs.', 'نمودار سه مرحلهٔ بازسازی ذکرشده در PDF را خلاصه می‌کند. این نمودار سیر واقعی بیماری در یک فرد یا نشانه‌های تصویربرداری تشخیصی را نشان نمی‌دهد.'), lang)}</figcaption>
  </figure>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const correct = answer === lesson.check.answer
  return <div className={styles.decision}>
    <h3>{pick(L('Welche Zuordnung ist richtig?', 'Which pairing is correct?', 'کدام تطبیق درست است؟'), lang)}</h3>
    <p>{pick(lesson.check.question, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{lesson.check.options.map((option, index) => <label key={index}><input type="radio" name="paget-check" checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}</fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Bitte nochmals prüfen. ', 'Review this once more. ', 'لطفاً دوباره بررسی کنید. '), lang)}</strong>{pick(lesson.check.explanation, lang)}</p> : null}
  </div>
}

export default function MorbusPagetPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const labels = {
    path: t(L('Lernweg', 'Learning path', 'مسیر یادگیری')),
    contents: t(L('Inhalt', 'Contents', 'فهرست مطالب')),
    progress: t(L('gelesen', 'read', 'خوانده‌شده')),
    continue: t(L('Weiterlernen', 'Continue learning', 'ادامه یادگیری')),
    completeLesson: t(L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده')),
    lessonCompleted: t(L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد')),
    complete: t(L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری این بخش به‌عنوان خوانده‌شده')),
    completed: t(L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده')),
    open: t(L('Abschnitt öffnen', 'Open section', 'بازکردن بخش')),
    close: t(L('Schließen', 'Close', 'بستن')),
    takeHome: t(L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه قاعده برای یادآوری')),
    sources: t(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه')),
  }
  const langHref = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sections = [
    { id: 'pattern', label: t(L('Wie verändert sich der Knochen?', 'How does the bone change?', 'استخوان چگونه تغییر می‌کند؟')), icon: 'pattern' },
    { id: 'imaging', label: t(L('Welche Bildmuster nennt das PDF?', 'Which imaging patterns does the PDF describe?', 'PDF چه الگوهای تصویربرداری را توصیف می‌کند؟')), icon: 'imaging' },
    { id: 'context', label: t(L('Welche Begleitbefunde und Warnzeichen sind genannt?', 'Which associated findings and warning signs are listed?', 'چه یافته‌های همراه و نشانه‌های هشداری ذکر شده‌اند؟')), icon: 'context' },
    { id: 'check', label: t(L('Muster aktiv abrufen', 'Retrieve the pattern', 'الگو را به یاد بیاورید')), icon: 'check' },
    { id: 'take-home', label: labels.takeHome, icon: 'takeHome', emphasis: true },
  ]
  const sources = [
    { tag: 'MSK.pdf · pp. 131–132', title: t(L('Osteodystrophia deformans (Morbus Paget)', "Osteodystrophia deformans (Paget's disease)", 'استئودیستروفی دفرمانس (بیماری پاژه)')), citation: t(L('PDF S. 131–132; gedruckte S. 130–131. Bild-/Textprüfung durchgeführt; auf diesen Seiten kein Fallbild.', 'PDF pp. 131–132; printed pp. 130–131. Text and page-image review completed; no case image on these pages.', 'صفحات ۱۳۱–۱۳۲ PDF؛ صفحات چاپی ۱۳۰–۱۳۱. متن و تصویر صفحه بررسی شد؛ در این صفحات تصویر کیس وجود ندارد.')) },
    { tag: 'Clinical guideline · 2019', title: t(L('Diagnosis and Management of Paget’s Disease of Bone in Adults', 'Diagnosis and Management of Paget’s Disease of Bone in Adults', 'راهنمای تشخیص و مدیریت بیماری پاژهٔ استخوان در بزرگسالان')), href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6522384/', citation: 'Ralston et al. J Bone Miner Res. 2019;34:579–604. DOI: 10.1002/jbmr.3657.', scope: t(L('Zur ergänzenden fachlichen Orientierung und Abgrenzung, nicht als Ersatz für Prüfung und Freigabe durch einen Facharzt.', 'Additional clinical orientation and boundary check; not a substitute for specialist review and sign-off.', 'برای جهت‌گیری بالینی تکمیلی و بررسی مرزهاست؛ جایگزین بازبینی و تأیید متخصص نیست.')) },
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" heroImageAlt={t(L('Nichtdiagnostisches Schema eines umgebauten Knochens mit mosaikartigen Verdichtungen.', 'Non-diagnostic schematic of remodelled bone with mosaic-like sclerosis.', 'شماتیک غیرتشخیصی از استخوان بازسازی‌شده با تراکم‌های موزاییکی.'))} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: 'MSK', href: langHref('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={labels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/morbus-paget/hero.svg', heroImageOpacity: .9, accent: '#8baac2', accentStrong: '#345d7b', accentSoft: '#e9f0f5', secondary: '#d19b64', secondaryStrong: '#815124', heroBase: '#1e3545' }}
    className={styles.page} sources={<LessonSources title={labels.sources} items={sources} note={t(lesson.notice)} />}
  >
    <LessonSection id="pattern" icon="pattern" title={sections[0].label} bodyClassName={styles.body}>
      <p>{t(L('Morbus Paget ist laut PDF eine chronische Skeletterkrankung mit übermäßigem, ungeordnetem Knochenumbau. Der Aufbau folgt auf gesteigerten Abbau, bleibt aber qualitativ minderwertig.', "According to the PDF, Paget's disease is a chronic skeletal disorder with excessive, disorganised bone remodelling. Formation follows increased resorption but remains structurally inferior.", 'طبق PDF، بیماری پاژهٔ استخوان اختلال مزمن اسکلتی با بازسازی بیش‌ازحد و نامنظم استخوان است. استخوان‌سازی پس از افزایش تخریب رخ می‌دهد، اما کیفیت آن پایین می‌ماند.'))}</p>
      <p>{t(L('Die Quelle unterscheidet drei Umbauphasen. Merke: Sie beschreiben die dominierende Aktivität im Knochen; die Grafik ist nur ein Lernmodell.', 'The source distinguishes three remodelling phases. Remember: they describe the dominant activity in bone; the graphic is only a learning model.', 'منبع سه مرحلهٔ بازسازی را تفکیک می‌کند. به یاد داشته باشید: این مراحل فعالیت غالب در استخوان را توصیف می‌کنند و نمودار فقط مدل آموزشی است.'))}</p>
      <PhaseDiagram lang={lang} />
    </LessonSection>
    <LessonSection id="imaging" icon="imaging" title={sections[1].label} bodyClassName={styles.body}>
      <p>{t(L('Die PDF-Seiten zeigen keine Patientenaufnahme. Die folgende Tabelle ordnet deshalb nur die schriftlich beschriebenen Muster; sie ist kein Ersatz für Bildbeispiele.', 'The PDF pages show no patient image. The table therefore organises only the patterns described in text; it does not replace image examples.', 'صفحات PDF تصویر بیمار ندارند. بنابراین جدول زیر فقط الگوهای توصیف‌شده در متن را مرتب می‌کند و جایگزین نمونه‌های تصویری نیست.'))}</p>
      <div className={styles.tableWrap}><table><caption>{t(L('Schriftlich beschriebene Röntgen-/CT-Leitbefunde', 'Radiographic/CT findings described in the source', 'یافته‌های راهنمای رادیوگرافی/CT توصیف‌شده در منبع'))}</caption><thead><tr><th>{t(L('Region', 'Region', 'ناحیه'))}</th><th>{t(L('Befundlaut PDF', 'Finding in the PDF', 'یافته طبق PDF'))}</th></tr></thead><tbody>
        <tr><th scope="row">{t(L('Allgemein', 'General', 'عمومی'))}</th><td>{t(L('Grobere Spongiosatrabekel („Strähnenzeichnung“); vergrößertes Knochenvolumen und Verbiegung langer Röhrenknochen.', 'Coarsened cancellous trabeculae (“coarse striation”); increased bone volume and bowing of long bones.', 'ترابکول‌های درشت‌تر استخوان اسفنجی («نمای رگه‌ای»)، افزایش حجم استخوان و خمیدگی استخوان‌های بلند.'))}</td></tr>
        <tr><th scope="row">{t(L('Schädel · früh', 'Skull · early', 'جمجمه · زودرس'))}</th><td>{t(L('Scharf begrenzte Aufhellungen: „Osteoporosis circumscripta“.', 'Sharply marginated lucencies: “osteoporosis circumscripta”.', 'ناحیه‌های شفاف با حدود مشخص: «Osteoporosis circumscripta».'))}</td></tr>
        <tr><th scope="row">{t(L('Schädel · spät', 'Skull · late', 'جمجمه · دیررس'))}</th><td>{t(L('Flockige Sklerosierungen: „Cotton-wool appearance“.', 'Patchy sclerosis: “cotton-wool appearance”.', 'اسکلروزهای لکه‌لکه: «Cotton-wool appearance».'))}</td></tr>
        <tr><th scope="row">{t(L('Wirbelsäule', 'Spine', 'ستون فقرات'))}</th><td>{t(L('„Rahmenwirbel“ durch Randleistensklerose; die Quelle nennt den Elfenbeinwirbel als Differenzialdiagnose.', '“Frame vertebra” from sclerosis of the vertebral margins; the source lists ivory vertebra as a differential.', '«مهرهٔ قاب‌دار» به‌علت اسکلروز حاشیه‌ای؛ منبع مهرهٔ عاجی را به‌عنوان تشخیص افتراقی ذکر می‌کند.'))}</td></tr>
      </tbody></table></div>
    </LessonSection>
    <LessonSection id="context" icon="context" title={sections[2].label} bodyClassName={styles.body}>
      <div className={styles.tableWrap}><table><caption>{t(L('Begleitbefunde im PDF: nicht isoliert diagnostisch', 'Associated findings in the PDF: not diagnostic in isolation', 'یافته‌های همراه در PDF: به‌تنهایی تشخیصی نیستند'))}</caption><thead><tr><th>{t(L('Bereich', 'Area', 'حوزه'))}</th><th>{t(L('Quellenangabe', 'Source statement', 'بیان منبع'))}</th></tr></thead><tbody>
        <tr><th scope="row">{t(L('Labor', 'Laboratory', 'آزمایشگاه'))}</th><td>{t(L('Die PDF nennt eine isolierte AP-Erhöhung bei normalem Kalzium und Phosphat. Eine klinische Abklärung muss mögliche andere AP-Quellen berücksichtigen; die Leitlinie empfiehlt AP-Screening zusammen mit Leberwerten.', 'The PDF notes isolated ALP elevation with normal calcium and phosphate. Clinical assessment must consider other ALP sources; the guideline recommends ALP screening alongside liver tests.', 'PDF افزایش منفرد آلکالن‌فسفاتاز را همراه با کلسیم و فسفات طبیعی ذکر می‌کند. ارزیابی بالینی باید منابع دیگر ALP را هم در نظر بگیرد؛ راهنما غربالگری ALP را همراه با آزمایش‌های کبدی توصیه می‌کند.'))}</td></tr>
        <tr><th scope="row">{t(L('Szintigraphie', 'Scintigraphy', 'اسکن استخوان'))}</th><td>{t(L('Das PDF beschreibt Mehranreicherung zur Darstellung der Aktivität und des Befallsmusters. Eine konkrete Sensitivitätsrangfolge wird hier nicht wiederholt.', 'The PDF describes increased uptake to show activity and the distribution pattern. No comparative sensitivity ranking is repeated here.', 'PDF افزایش جذب را برای نشان‌دادن فعالیت و الگوی درگیری توصیف می‌کند. در اینجا رتبه‌بندی حساسیت تکرار نمی‌شود.'))}</td></tr>
        <tr><th scope="row">{t(L('Komplikationen', 'Complications', 'عوارض'))}</th><td>{t(L('Genannt werden Schmerzen bzw. sekundäre Arthrose, Hörminderung, High-Output-Herzinsuffizienz und eine seltene maligne Transformation. Neue Osteolysen mit Weichteilkomponente sind laut PDF ein Warnsignal und erfordern fachärztliche Einordnung.', 'The PDF lists pain or secondary osteoarthritis, hearing loss, high-output heart failure and rare malignant transformation. New osteolysis with a soft-tissue component is a warning sign in the source and requires specialist assessment.', 'PDF درد یا آرتروز ثانویه، کاهش شنوایی، نارسایی قلبی با برون‌ده بالا و دگرگونی بدخیم نادر را ذکر می‌کند. استئولیز جدید همراه جزء بافت نرم در منبع نشانهٔ هشدار است و نیاز به ارزیابی متخصص دارد.'))}</td></tr>
      </tbody></table></div>
      <p className={styles.note}>{t(L('Die Prozentangabe für Sarkomtransformation und die Häufigkeitsrangfolge aus der PDF-Zusammenfassung wurden bewusst nicht übernommen; sie brauchen eine separate fachliche Prüfung.', 'The PDF summary’s percentage for sarcomatous transformation and prevalence ranking were deliberately omitted pending separate specialist verification.', 'درصد دگرگونی سارکومی و رتبه‌بندی شیوعِ خلاصهٔ PDF عمداً وارد نشده‌اند تا جداگانه از نظر تخصصی بررسی شوند.'))}</p>
    </LessonSection>
    <LessonSection id="check" icon="check" title={sections[3].label} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="takeHome" title={sections[4].label} bodyClassName={styles.body}>
      <ul className={styles.rules}>{lesson.summary.map((item, i) => <li key={i}>{t(item)}</li>)}</ul>
    </LessonSection>
  </StandardLessonShell>
}
