'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const C = {
  de: {
    title: 'Solide Nierenraumforderungen', lead: 'Beginne mit der Zusammensetzung: echtes Fett, zystische Morphologie oder solide anreichernde Masse? Bildgebung kann eine Läsion einordnen, aber nicht jede Histologie sicher bestimmen.',
    questions: ['Ist die Läsion zystisch oder überwiegend solide?', 'Gibt es makroskopisches Fett oder Verkalkung?', 'Wie verhalten sich Enhancement und Signal über die Phasen?', 'Reicht die Bildgebung für eine sichere Einordnung?'],
    findingsTitle: 'Was die Bildgebung zeigt', findings: [
      ['Nierenzellkarzinom (RCC)', 'Das PDF beschreibt meist eine gut abgrenzbare solide Masse. Nekrose und unregelmäßige Verkalkungen können vorkommen. Klarzellige Tumoren zeigen häufig kräftige frühe arterielle Anreicherung mit relativer Abnahme gegenüber dem Nierenparenchym in der portalvenösen/nephrographischen Phase. MRT-Signal und T2-Muster hängen vom Subtyp ab. Prüfe die Nierenvene und V. cava auf Tumorausdehnung.'],
      ['Onkozytom', 'Eine zentrale sternförmige Narbe kann vorkommen, ist aber kein verlässliches Einzelkriterium. Onkozytom und RCC lassen sich präoperativ bildgebend oft nicht sicher trennen.'],
      ['Angiomyolipom (AML)', 'Makroskopisches Fett auf nativer CT spricht im passenden Kontext für AML. Das PDF beschreibt kräftige Anreicherung der vaskulären/muskulären Anteile; Verkalkungen sollten die Differenzialdiagnose RCC offenhalten. Sporadische AML sind oft solitär, bei tuberöser Sklerose (TSC) häufiger multipel und bilateral.'],
      ['Fettarmes AML', 'Fehlt sichtbares makroskopisches Fett, kann AML bildgebend unbestimmt bleiben und papilläres RCC ähneln. In Opposed-phase kann ein dünner Signalabfall am Rand des Fett-Parenchym-Übergangs (*ink-artifact*) auftreten; ein Signalabfall im gesamten Tumor spricht eher für mikroskopisches Fett und ist ein anderes Muster. Fettsuppression kann Fett bestätigen, sichert aber nicht jede Histologie.'],
    ],
    reportTitle: 'Systematisch beschreiben', report: ['Seite, Größe, Lage und Ausdehnung der Läsion', 'Zystische oder solide Zusammensetzung; Fett, Nekrose und Verkalkung', 'Enhancementmuster und relevante CT-/MRT-Sequenzen', 'Nierenvene und V. cava auf Tumorthrombus; weitere Ausdehnung im Untersuchungsfeld'],
    caseTitle: 'Entscheidung am Bildmuster', case: 'Eine solide Nierenmasse enthält auf der nativen CT klar erkennbares makroskopisches Fett. Was ist die beste bildgebende Einordnung?', choose: 'Wähle die beste Antwort.', opts: ['Das Muster stützt ein klassisches AML; die übrigen Merkmale und der Kontext bleiben mitzubeurteilen.', 'Ein RCC ist damit ausgeschlossen, unabhängig von Verkalkung oder Morphologie.', 'Das beweist ein fettarmes AML.', 'Eine zentrale Narbe beweist ein Onkozytom.'], good: 'Richtig. Makroskopisches Fett ist ein wichtiger AML-Hinweis. Es ersetzt nicht die Prüfung des Gesamtmusters; insbesondere sollte Verkalkung die Differenzialdiagnose offenhalten.', retry: 'Achte auf die Formulierung „stützt“: Fett ist ein hilfreicher Hinweis, aber kein Freibrief, widersprechende Merkmale zu ignorieren.',
    summary: [['Zuerst zusammensetzen', 'Zystisch oder solide, Fett, Verkalkung und Enhancement getrennt erfassen.'], ['Muster statt Einzelzeichen', 'Zentrale Narbe und fehlendes Fett beweisen keine Histologie.'], ['Ausdehnung prüfen', 'Bei soliden Tumoren venöse Tumorausdehnung gezielt beurteilen.'], ['Unsicherheit benennen', 'Fettarme AML und RCC können bildgebend überlappen.']],
    sourceNote: 'Abdomen.pdf, physische Seiten 48–51 (Druckseiten 47–50), visuell geprüft. Die axiale AML-Abbildung aus der Nutzer-PDF wird mit der projektweiten Erlaubnis des Nutzers verwendet. Phase und Sequenz sind nicht beschriftet; die Bildlegende lenkt deshalb nur auf Lage/Morphologie und behauptet nicht, dass die Aufnahme makroskopisches Fett zeigt. Die Therapieangaben „4-cm-Grenze“ und Schwangerschaftsrisiko wurden wegen fehlender aktueller Verifikation nicht als Empfehlung übernommen. Seite 47 enthält nur eine unvollständige Überschrift zur polyzystischen Nierenerkrankung; daraus wurde keine Lektion konstruiert.',
    bosniak: 'Zystische Nierenmassen werden in der separaten Lektion mit Bosniak v2019 behandelt.', sources: 'Quellen', footer: 'Bildgebende Muster aus dem PDF; Bosniak v2019 und RCC-Einordnung mit den unten aufgeführten Primär-/Leitlinienquellen abgeglichen.',
  },
  en: {
    title: 'Solid renal masses', lead: 'Start with composition: macroscopic fat, cystic morphology or a solid enhancing mass? Imaging can characterise a lesion, but does not establish every histology with certainty.',
    questions: ['Is the lesion cystic or predominantly solid?', 'Is macroscopic fat or calcification present?', 'How do enhancement and signal behave across phases?', 'Can imaging support a confident classification?'],
    findingsTitle: 'What imaging shows', findings: [
      ['Renal cell carcinoma (RCC)', 'The PDF describes a usually well-defined solid mass. Necrosis and irregular calcification may occur. Clear-cell tumours often show avid early arterial enhancement with relative reduction compared with renal parenchyma in the portal venous/nephrographic phase. MRI signal and T2 pattern vary by subtype. Assess the renal vein and IVC for tumour extension.'],
      ['Oncocytoma', 'A central stellate scar may occur, but it is not a reliable stand-alone criterion. Imaging often cannot confidently distinguish oncocytoma from RCC before surgery.'],
      ['Angiomyolipoma (AML)', 'Macroscopic fat on unenhanced CT supports AML in the appropriate context. The PDF describes avid enhancement of vascular/muscular components; calcification should keep RCC in the differential. Sporadic AML is often solitary; AML with tuberous sclerosis (TSC) is more often multiple and bilateral.'],
      ['Fat-poor AML', 'Without visible macroscopic fat, AML may remain indeterminate and resemble papillary RCC. On opposed-phase imaging, a thin signal-loss rim may occur at the fat–parenchyma interface (*ink artifact*); signal loss throughout the tumour instead suggests microscopic fat and is a different pattern. Fat suppression can confirm fat but cannot establish every histology.'],
    ],
    reportTitle: 'Describe systematically', report: ['Side, size, location and extent', 'Cystic or solid composition; fat, necrosis and calcification', 'Enhancement pattern and relevant CT/MRI sequences', 'Renal vein and IVC for tumour thrombus; additional extent in the field of view'],
    caseTitle: 'Decide from the imaging pattern', case: 'A solid renal mass contains clearly visible macroscopic fat on unenhanced CT. What is the best imaging interpretation?', choose: 'Choose the best answer.', opts: ['The pattern supports classic AML; assess the remaining features and context as well.', 'RCC is excluded regardless of calcification or morphology.', 'This proves fat-poor AML.', 'A central scar proves oncocytoma.'], good: 'Correct. Macroscopic fat is an important clue to AML. It does not replace review of the whole pattern; calcification in particular should keep the differential open.', retry: 'Notice the calibrated wording “supports”: fat is useful, but discordant features still matter.',
    summary: [['Start with composition', 'Assess cystic or solid makeup, fat, calcification and enhancement separately.'], ['Use the whole pattern', 'A central scar or absent fat does not prove histology.'], ['Check extent', 'In solid tumours, deliberately assess venous extension.'], ['State uncertainty', 'Fat-poor AML and RCC may overlap on imaging.']],
    sourceNote: 'Abdomen.pdf, physical pp. 48–51 (printed pp. 47–50), visually checked. The axial AML image is reused from the user-provided PDF with the user’s project-wide permission. The phase and sequence are not labelled, so the caption directs attention to location/morphology only and does not claim that it demonstrates macroscopic fat. The “4-cm threshold” and pregnancy-risk statements were not carried forward as recommendations because current verification was not established. Page 47 contains only an incomplete heading on polycystic kidney disease; no lesson was inferred from it.',
    bosniak: 'Cystic renal masses are covered separately in the Bosniak v2019 lesson.', sources: 'Sources', footer: 'Imaging patterns from the PDF; Bosniak v2019 and RCC framing checked against the primary/guideline sources below.',
  },
  fa: {
    title: 'توده‌های جامد کلیه', lead: 'با ترکیب ضایعه شروع کنید: چربی ماکروسکوپیک، مورفولوژی کیستیک یا توده جامدِ تقویت‌شونده؟ تصویربرداری به مشخصه‌یابی کمک می‌کند، اما بافت‌شناسی همه ضایعات را قطعی نمی‌کند.',
    questions: ['ضایعه کیستیک است یا عمدتاً جامد؟', 'چربی ماکروسکوپیک یا کلسیفیکاسیون وجود دارد؟', 'تقویت و سیگنال در فازها چگونه تغییر می‌کنند؟', 'آیا تصویربرداری برای دسته‌بندی مطمئن کافی است؟'],
    findingsTitle: 'تصویربرداری چه نشان می‌دهد؟', findings: [
      ['کارسینوم سلول کلیوی (RCC)', 'PDF توده‌ای جامد و معمولاً نسبتاً مشخص را توصیف می‌کند. نکروز و کلسیفیکاسیون نامنظم ممکن است دیده شوند. تومورهای سلول روشن اغلب در فاز شریانی تقویت واضح دارند و در فاز پورتوونوز/نفروگرافیک نسبت به پارانشیم کلیه تقویت کمتری نشان می‌دهند. سیگنال MRI و الگوی T2 برحسب زیرگروه متفاوت است. ورید کلیوی و IVC را از نظر گسترش تومور بررسی کنید.'],
      ['انکوسیتوم', 'ممکن است اسکار ستاره‌ای مرکزی دیده شود، اما معیار مستقل و قابل اتکایی نیست. تصویربرداری اغلب پیش از جراحی نمی‌تواند انکوسیتوم را با اطمینان از RCC جدا کند.'],
      ['آنژیومیولیپوما (AML)', 'چربی ماکروسکوپیک در CT بدون تزریق، در زمینه مناسب، به نفع AML است. PDF از تقویت واضح اجزای عروقی/عضلانی می‌گوید؛ در صورت کلسیفیکاسیون، RCC را در افتراق نگه دارید. AML پراکنده اغلب منفرد است؛ AML همراه اسکلروز توبروز (TSC) بیشتر چندکانونی و دوطرفه است.'],
      ['AML کم‌چربی', 'اگر چربی ماکروسکوپیک دیده نشود، AML ممکن است نامعین بماند و شبیه RCC پاپیلاری باشد. در تصویر opposed-phase ممکن است نوار باریک افت سیگنال در مرز چربی و پارانشیم (*ink-artifact*) دیده شود؛ افت سیگنال در سراسر تومور بیشتر با چربی میکروسکوپیک سازگار است و الگوی متفاوتی دارد. سرکوب چربی می‌تواند وجود چربی را تأیید کند، اما بافت‌شناسی را در همه موارد تعیین نمی‌کند.'],
    ],
    reportTitle: 'توصیف منظم', report: ['سمت، اندازه، محل و وسعت ضایعه', 'ترکیب کیستیک یا جامد؛ چربی، نکروز و کلسیفیکاسیون', 'الگوی تقویت و توالی‌های مرتبط CT/MRI', 'ورید کلیوی و IVC از نظر تومورترومبوز؛ گسترش دیگر در محدوده تصویربرداری'],
    caseTitle: 'تصمیم بر پایه الگوی تصویری', case: 'در توده جامد کلیه، CT بدون تزریق چربی ماکروسکوپیک واضح نشان می‌دهد. بهترین تفسیر تصویری چیست؟', choose: 'بهترین پاسخ را انتخاب کنید.', opts: ['این الگو از AML کلاسیک حمایت می‌کند؛ سایر ویژگی‌ها و زمینه را نیز بررسی کنید.', 'RCC مستقل از کلسیفیکاسیون یا مورفولوژی رد می‌شود.', 'این یافته AML کم‌چربی را ثابت می‌کند.', 'اسکار مرکزی انکوسیتوم را ثابت می‌کند.'], good: 'درست است. چربی ماکروسکوپیک سرنخ مهمی به نفع AML است، اما جایگزین بررسی کل الگو نیست؛ به‌ویژه با وجود کلسیفیکاسیون باید افتراق باز بماند.', retry: 'به واژه «حمایت می‌کند» توجه کنید: چربی سرنخ مفیدی است، اما ویژگی‌های ناسازگار را نباید نادیده گرفت.',
    summary: [['ابتدا ترکیب', 'ترکیب کیستیک یا جامد، چربی، کلسیفیکاسیون و تقویت را جداگانه بسنجید.'], ['کل الگو را ببینید', 'اسکار مرکزی یا نبود چربی، بافت‌شناسی را ثابت نمی‌کند.'], ['وسعت را بررسی کنید', 'در تومور جامد، گسترش وریدی را هدفمند ارزیابی کنید.'], ['عدم قطعیت را بیان کنید', 'AML کم‌چربی و RCC ممکن است در تصویربرداری همپوشانی داشته باشند.']],
    sourceNote: 'Abdomen.pdf، صفحات فیزیکی ۴۸ تا ۵۱ (شماره چاپی ۴۷ تا ۵۰)، به‌صورت تصویری بررسی شد. تصویر محوری AML با مجوز کلی شما برای تصاویر PDF در پروژه استفاده شده است؛ فاز و توالی در اسلاید برچسب نخورده، بنابراین زیرنویس فقط محل و مورفولوژی ضایعه را هدف می‌گیرد و ادعا نمی‌کند که چربی ماکروسکوپیک را نشان می‌دهد. آستانه «۴ سانتی‌متر» و خطر بارداری به دلیل تأییدنشدن بر پایه منبع روز، به‌صورت توصیه منتقل نشدند. صفحه ۴۷ فقط عنوان ناقص بیماری کلیه پلی‌کیستیک را دارد؛ از آن درس محتوایی ساخته نشد.',
    bosniak: 'توده‌های کیستیک کلیه در درس جداگانه Bosniak v2019 بررسی می‌شوند.', sources: 'منابع', footer: 'الگوهای تصویربرداری بر پایه PDF هستند؛ چارچوب RCC و Bosniak v2019 با منابع اولیه/راهنماهای زیر سنجیده شده‌اند.',
  },
}

function t(value, lang) { return value?.[lang] || value?.de || '' }
function Icon({ id }) { const glyph = { composition: '◉', pattern: '◫', report: '▤', case: '⌕', takehome: '✦' }; return <span aria-hidden="true">{glyph[id] || '•'}</span> }
function Content({ lang }) {
  const c = C[lang] || C.de
  return <>
    <LessonSection id="pattern" title={t(L('Von welcher Läsion sprechen wir?', 'What type of lesion are we assessing?', 'با چه نوع ضایعه‌ای روبه‌رو هستیم؟'), lang)} icon="composition" bodyClassName={styles.body}>
      <p>{c.lead}</p><ol>{c.questions.map(q => <li key={q}>{q}</li>)}</ol>
      <p><a href={lang === 'de' ? '/abdomen/niere/nierenzysten' : `/abdomen/niere/nierenzysten?lang=${lang}`}>{c.bosniak}</a></p>
    </LessonSection>
    <LessonSection id="findings" title={c.findingsTitle} icon="pattern" bodyClassName={styles.body}>
      {c.findings.map(([title, text], index) => <section key={title}><h3>{title}</h3><p>{text}</p>{index === 2 ? <figure className={styles.caseImage}><img src="/educational/renal-masses/aml-axial-ct.png" alt={t(L('Axiale CT aus Abdomen.pdf: Raumforderung am rechten Nierenoberpol (bildlinks); Phase nicht angegeben.', 'Axial CT from Abdomen.pdf: mass at the upper pole of the right kidney (image-left); phase not specified.', 'CT محوری از Abdomen.pdf: توده در قطب فوقانی کلیه راست (سمت چپ تصویر)؛ فاز مشخص نشده است.'), lang)} /><figcaption>{t(L('Abdomen.pdf, physische S. 50: Beachte die exophytische Läsion am rechten Nierenoberpol (bildlinks). Die Phase ist nicht angegeben; die Aufnahme dient hier der Lokalisation und Morphologie, nicht dem Nachweis makroskopischen Fetts.', 'Abdomen.pdf, physical p.50: note the exophytic lesion at the upper pole of the right kidney (image-left). The phase is not labelled; this image is used for location and morphology, not to demonstrate macroscopic fat.', 'Abdomen.pdf، صفحه فیزیکی ۵۰: به ضایعه اگزوفتیک در قطب فوقانی کلیه راست (سمت چپ تصویر) توجه کنید. فاز مشخص نشده؛ تصویر برای محل و مورفولوژی است، نه نمایش چربی ماکروسکوپیک.'), lang)}</figcaption></figure> : null}</section>)}
    </LessonSection>
    <LessonSection id="report" title={c.reportTitle} icon="report" bodyClassName={styles.body}>
      <ol>{c.report.map(item => <li key={item}>{item}</li>)}</ol>
    </LessonSection>
    <LessonSection id="case" title={c.caseTitle} icon="case" bodyClassName={styles.body}>
      <p>{c.case}</p><Assessment c={c} />
    </LessonSection>
    <LessonSection id="takehome" title={t(L('Vier Regeln für den Befund', 'Four reporting rules', 'چهار قاعده برای گزارش'), lang)} icon="takehome" bodyClassName={styles.body}>
      <TakeHomeList items={c.summary.map(([title, detail]) => ({ title, detail }))} />
    </LessonSection>
  </>
}
function Assessment({ c }) {
  const [selected, setSelected] = useState(null)
  return <div className={styles.assessment}><fieldset><legend>{c.choose}</legend>{c.opts.map((option, index) => <label key={option}><input type="radio" name="renal-mass-case" checked={selected === index} onChange={() => setSelected(index)} /> {option}</label>)}</fieldset>{selected !== null ? <p role="status">{selected === 0 ? c.good : c.retry}</p> : null}</div>
}

const labels = Object.fromEntries(Object.entries({ complete: L('Als gelesen markieren', 'Mark as read', 'به‌عنوان خوانده‌شده علامت بزنید'), completed: L('Gelesen', 'Read', 'خوانده شد'), continue: L('Weiter', 'Continue', 'ادامه'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('Fortschritt', 'Progress', 'پیشرفت'), takeHome: L('Vier Regeln', 'Four rules', 'چهار قاعده'), sources: L('Quellen', 'Sources', 'منابع'), close: L('Schließen', 'Close', 'بستن'), contents: L('Seitenpfad', 'Breadcrumb', 'مسیر صفحه'), open: L('Öffnen', 'Open', 'بازکردن'), completeLesson: L('Lektion abschließen', 'Complete lesson', 'درس را کامل کنید'), lessonCompleted: L('Lektion abgeschlossen', 'Lesson completed', 'درس کامل شد') }).map(([key, value]) => [key, t(value, 'de')]))

export default function RenalMassesPage() {
  const { lang } = useLanguage(); const c = C[lang] || C.de
  const localizedLabels = Object.fromEntries(Object.keys(labels).map(key => [key, t({ complete: L('Als gelesen markieren', 'Mark as read', 'به‌عنوان خوانده‌شده علامت بزنید'), completed: L('Gelesen', 'Read', 'خوانده شد'), continue: L('Weiter', 'Continue', 'ادامه'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('Fortschritt', 'Progress', 'پیشرفت'), takeHome: L('Vier Regeln', 'Four rules', 'چهار قاعده'), sources: L('Quellen', 'Sources', 'منابع'), close: L('Schließen', 'Close', 'بستن'), contents: L('Seitenpfad', 'Breadcrumb', 'مسیر صفحه'), open: L('Öffnen', 'Open', 'بازکردن'), completeLesson: L('Lektion abschließen', 'Complete lesson', 'درس را کامل کنید'), lessonCompleted: L('Lektion abgeschlossen', 'Lesson completed', 'درس کامل شد') }[key], lang)]))
  const local = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sections = [
    { id: 'pattern', label: t(L('Erst die Zusammensetzung', 'Start with composition', 'ابتدا ترکیب ضایعه'), lang), icon: 'composition' },
    { id: 'findings', label: t(L('Muster solider Läsionen', 'Patterns in solid lesions', 'الگوهای ضایعات جامد'), lang), icon: 'pattern' },
    { id: 'report', label: t(L('Befund strukturieren', 'Structure the report', 'ساختار گزارش'), lang), icon: 'report' },
    { id: 'case', label: t(L('Am Muster entscheiden', 'Decide from the pattern', 'تصمیم بر پایه الگو'), lang), icon: 'case' },
    { id: 'takehome', label: t(L('Vier Befundregeln', 'Four reporting rules', 'چهار قاعده گزارش'), lang), icon: 'takehome', emphasis: true },
  ]
  const sources = [
    { tag: 'RCC', title: 'European Association of Urology. EAU Guidelines on Renal Cell Carcinoma, Diagnostic Evaluation.', href: 'https://uroweb.org/guidelines/renal-cell-carcinoma/chapter/diagnostic-evaluation', citation: t(L('Leitlinienabschnitt zu Bildgebung, Charakterisierung und venöser Tumorausdehnung.', 'Guideline section on imaging, characterisation and venous tumour extension.', 'بخش راهنما درباره تصویربرداری، مشخصه‌یابی و گسترش وریدی تومور.'), lang) },
    { tag: 'AML', title: 'European Association of Urology. EAU Guidelines on Renal Cell Carcinoma, Epidemiology, Aetiology and Pathology.', href: 'https://uroweb.org/guidelines/renal-cell-carcinoma/chapter/epidemiology-aetiology-and-pathology', citation: t(L('Hinweis: fettarme AML sind bildgebend nicht immer sicher erkennbar.', 'Note that fat-poor AML cannot always be confidently identified by imaging.', 'توجه: AML کم‌چربی همیشه با تصویربرداری به‌طور مطمئن قابل شناسایی نیست.'), lang) },
    { tag: 'Bosniak', title: 'Silverman SG, Pedrosa I, Ellis JH, et al. Bosniak Classification of Cystic Renal Masses, Version 2019: An Update Proposal and Needs Assessment. Radiology. 2019;292:475–488. doi:10.1148/radiol.2019182646.', href: 'https://doi.org/10.1148/radiol.2019182646', citation: c.bosniak },
  ]
  return <StandardLessonShell lessonId="abdomen-renal-masses" lang={lang} title={c.title} author="RadYar"
    breadcrumbs={[{ label: 'RadYar', href: local('/') }, { label: t(L('Abdomen', 'Abdomen', 'شکم'), lang), href: local('/lernen/abdomen') }, { label: t(L('Niere', 'Kidney', 'کلیه'), lang) }, { label: c.title }]}
    sections={sections} labels={localizedLabels} renderIcon={id => <Icon id={id} />} actions={{ mcq: { href: local('/ueben/quiz?fach=abdomen&n=5&themen=nierenzellkarzinom,onkozytom-niere,angiomyolipom'), label: t(L('Fünf passende Fragen', 'Five related questions', 'پنج پرسش مرتبط'), lang) }, flashcards: { href: local('/flashcards/solide-nierenmassen'), label: t(L('Lernkarten', 'Flashcards', 'فلش‌کارت‌ها'), lang) } }} syncHashNavigation
    heroImageAlt={t(L('Code-native schematische Nierenquerschnittsansicht mit solider Läsion; keine Patientenaufnahme.', 'Code-native schematic renal section with a solid lesion; not a patient image.', 'شماتیک کدنویسی‌شده از مقطع کلیه با ضایعه جامد؛ تصویر بیمار نیست.'), lang)}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/renal-masses/hero.svg', heroImageOpacity: .95, accent: '#4caeb9', accentStrong: '#145f69', accentSoft: '#dff3f2', secondary: '#d69c5b', secondaryStrong: '#784316', heroBase: '#101b2d' }} className={styles.page}
    sources={<LessonSources title={localizedLabels.sources} items={sources} note={c.sourceNote} />}><Content lang={lang} /></StandardLessonShell>
}
