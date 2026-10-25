'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import { lowerGiRows, lowerGiCoverage } from '@/data/assessmentQuality/atvLowerGiBleeding'
import styles from '../divertikulitis/page.module.css'

const C = {
  de: {
    title: 'Untere GI-Blutung: CTA-Muster', contentTitle: 'Phasenvergleich und Befundlokalisation',
    intro: 'Die CT-Angiographie beantwortet eine konkrete Frage: Ist zum Untersuchungszeitpunkt eine aktive Blutung sichtbar, und wo liegt sie? Blutungsaktivität kann intermittierend sein; eine negative CTA schließt eine klinisch relevante Blutung nicht sicher aus.',
    phasesTitle: 'Mehrphasen-CTA vergleichen', phases: [
      ['Nativ', 'Vorhandenes hyperdenses Material im Darmlumen erkennen, bevor Kontrastmittel hinzukommt.'],
      ['Arteriell', 'Eine neu auftretende fokale Kontrastmittelaustrittstelle oder ein „Jet“ ins Lumen suchen.'],
      ['Portalvenös', 'Zunahme und Ausbreitung der intraluminalen Kontrastierung gegenüber der arteriellen Phase verfolgen.'],
    ],
    reportTitle: 'Lokalisation zuerst, Deutung danach', report: [
      'Segment und Gefäßterritorium so genau wie möglich benennen.',
      'Aktive Extravasation von hyperdichtem Blut, Inhalt oder Material unterscheiden, das bereits nativ sichtbar war.',
      'Blutungszeichen in arterieller und portalvenöser Phase vergleichen; Untersuchungszeitpunkt und Bewegungsartefakte berücksichtigen.',
      'Bei positivem CTA-Befund die Lokalisation zeitnah an das behandelnde Team kommunizieren.',
    ],
    contextTitle: 'Modalität an Blutungsaktivität anpassen', context: 'CTA ist eine Lokalisationsoption, aber kein starres Schema für alle. ESGE empfiehlt CTA bei Instabilität und vermuteter fortgesetzter Blutung vor einer Therapie; ASGE 2026 akzeptiert Koloskopie oder CT ± Angiographie als Erstuntersuchung, mit Koloskopie nach Stabilisierung und CT ± Angiographie bei anhaltender Instabilität. Nach positiver CT kann im passenden klinischen Kontext eine radiologische Intervention folgen.',
    cave: 'CTA ist zeitabhängig: Wenn die Blutung pausiert oder intermittiert, kann die Untersuchung negativ bleiben. Ein negativer Befund ist deshalb kein allgemeiner Ausschluss und ersetzt keine klinische Risikoeinschätzung.',
    angioTitle: 'Was folgt bei lokalisierter aktiver Blutung?',
    angioIntro: 'Zeigt die CTA eine Extravasation, kann bei anhaltender Blutung und passendem klinischem Kontext eine Katheterangiographie mit möglicher selektiver Embolisation folgen. Der PDF-Ausdruck „Goldstandard“ ist keine pauschale Handlungsregel: Stabilität, Blutungsaktivität und der lokale interdisziplinäre Pfad bestimmen das Vorgehen.',
    angioSteps: [
      ['1 · Gefäßterritorium wählen', 'Transfemoraler Zugang; die selektive Darstellung richtet sich nach der vermuteten Region: A. mesenterica superior für Dünndarm/rechtes Kolon, A. mesenterica inferior für linkes Kolon. Die obere Rektumversorgung läuft über die A. rectalis superior aus der IMA; weitere Rektumäste können aus dem Stromgebiet der A. iliaca interna kommen.'],
      ['2 · Blutungsast lokalisieren', 'Die Angiographie kann die CTA-Lokalisation bestätigen. Ist die Blutung inzwischen pausiert oder intermittierend, kann auch die Katheterangiographie ohne sichtbare Extravasation bleiben.'],
      ['3 · Selektiv embolisieren', 'Bei passender angiographischer Lokalisation kann der blutende Ast superselektiv mit Mikrokatheter erreicht und verschlossen werden; das PDF nennt meist Coils oder Partikel.'],
      ['4 · Kontrollangiographie', 'Abschließend wird geprüft und dokumentiert, ob noch Extravasation sichtbar ist. Der gewünschte Blutstillungseffekt muss gegen das Risiko einer Darmischämie abgewogen werden.'],
    ],
    surgery: 'Eine Operation bleibt laut PDF seltenen, nicht kontrollierbaren Blutungen vorbehalten; die aktuelle Entscheidung gehört in den interdisziplinären Behandlungspfad.',
    source: 'Quellabdeckung: Abdomen.pdf, physische S. 86–87 (gedruckt S. 85–86); p. 86 Bildfolge geprüft, p. 87 Ablaufseite geprüft. Primärleitlinien: ESGE 2021, DOI 10.1055/a-1496-8969; ACR 2021, DOI 10.1016/j.jacr.2021.02.018; ACG 2023, PMID 36735555; ASGE 2026, DOI 10.1016/j.gie.2026.06.046. Die rektale Gefäßvariante wird begrenzt erläutert; Park et al., JVIR 2020, PMID 31530489, ist eine kleine retrospektive RAE-Kohorte, keine allgemeine Handlungsregel.',
    finalSummary: ['CTA: neue Extravasation in den Phasen vergleichen und exakt lokalisieren.', 'Ein negativer CTA- oder Angiographiebefund schließt eine intermittierende Blutung nicht sicher aus.', 'Bei positiver CTA kann je nach anhaltender Blutung und klinischem Kontext eine selektive Katheterangiographie mit möglicher Embolisation folgen.', 'Kontrollangiographie und Darmperfusion gemeinsam im Blick behalten.'],
  },
  en: {
    title: 'Lower GI bleeding: CTA patterns', contentTitle: 'Phase comparison and localisation',
    intro: 'CT angiography answers a focused question: is active bleeding visible at the time of the examination, and where is it located? Bleeding can be intermittent; a negative CTA does not reliably exclude clinically important bleeding.',
    phasesTitle: 'Compare multiphase CTA', phases: [
      ['Unenhanced', 'Identify pre-existing hyperdense material in the bowel lumen before contrast is administered.'],
      ['Arterial', 'Look for a new focal site of contrast extravasation or a jet into the lumen.'],
      ['Portal venous', 'Track increase and spread of intraluminal contrast compared with the arterial phase.'],
    ],
    reportTitle: 'Localise first, interpret next', report: [
      'Name the bowel segment and vascular territory as precisely as possible.',
      'Distinguish active extravasation from hyperdense blood, contents or material already visible on the unenhanced series.',
      'Compare arterial and portal venous phases; account for timing and motion artefact.',
      'Communicate a positive CTA localisation promptly to the treating team.',
    ],
    contextTitle: 'Match modality to bleeding activity', context: 'CTA is a localisation option, not a fixed pathway for everyone. ESGE recommends CTA before treatment when bleeding is ongoing and the patient is unstable; ASGE 2026 accepts colonoscopy or CT ± angiography initially, with colonoscopy after stabilisation and CT ± angiography for ongoing instability. After positive CT, radiologic intervention may follow in the appropriate clinical context.',
    cave: 'CTA is time-dependent: if bleeding has stopped or is intermittent, the examination may be negative. A negative result is therefore not a general rule-out and does not replace clinical risk assessment.',
    angioTitle: 'What follows when active bleeding is localised?',
    angioIntro: 'If CTA shows extravasation, catheter angiography with possible selective embolisation may follow when bleeding continues and the clinical context supports it. The PDF’s phrase “gold standard” is not a universal action rule: stability, bleeding activity and the local multidisciplinary pathway guide the next step.',
    angioSteps: [
      ['1 · Select the vascular territory', 'Transfemoral access; selective angiography is guided by the suspected region: the superior mesenteric artery for small bowel/right colon and the inferior mesenteric artery for left colon. The superior rectal artery arises from the IMA; additional rectal branches may come from the internal iliac territory.'],
      ['2 · Localise the bleeding branch', 'Angiography may confirm the CTA location. If bleeding has paused or is intermittent, catheter angiography may also show no active extravasation.'],
      ['3 · Embolise selectively', 'When angiographic localisation is suitable, the bleeding branch may be reached superselectively with a microcatheter and occluded; the PDF lists coils or particles as common materials.'],
      ['4 · Completion angiography', 'Check and document whether extravasation remains visible. The intended haemostatic effect must be balanced against the risk of bowel ischaemia.'],
    ],
    surgery: 'The PDF reserves surgery for rare, uncontrollable bleeding; the current decision belongs to the multidisciplinary care pathway.',
    source: 'Coverage: Abdomen.pdf, physical pp. 86–87 (printed pp. 85–86); p. 86 image sequence and p. 87 pathway visually reviewed. Primary guidelines: ESGE 2021, DOI 10.1055/a-1496-8969; ACR 2021, DOI 10.1016/j.jacr.2021.02.018; ACG 2023, PMID 36735555; ASGE 2026, DOI 10.1016/j.gie.2026.06.046. Rectal artery variation is qualified; Park et al., JVIR 2020, PMID 31530489, is a small retrospective RAE cohort, not a universal action rule.',
    finalSummary: ['CTA: compare phases for new extravasation and report its location precisely.', 'A negative CTA or angiogram does not reliably exclude intermittent bleeding.', 'After positive CTA, selective catheter angiography with possible embolisation may follow, depending on ongoing bleeding and clinical context.', 'Assess completion angiography and bowel perfusion together.'],
  },
  fa: {
    title: 'خون‌ریزی تحتانی گوارش: الگوهای CTA', contentTitle: 'مقایسهٔ فازها و تعیین محل',
    intro: 'CTA به پرسشی مشخص پاسخ می‌دهد: آیا هنگام بررسی خون‌ریزی فعال دیده می‌شود و محل آن کجاست؟ خون‌ریزی می‌تواند متناوب باشد؛ CTA منفی خون‌ریزی بالینی مهم را با اطمینان رد نمی‌کند.',
    phasesTitle: 'CTA چندفازی را مقایسه کنید', phases: [
      ['بدون تزریق', 'مواد پرچگال از پیش موجود در لومن روده را پیش از ورود ماده حاجب مشخص کنید.'],
      ['شریانی', 'به‌دنبال محل کانونی تازه نشت ماده حاجب یا «جت» به داخل لومن باشید.'],
      ['پورتوونوس', 'افزایش و گسترش ماده حاجب داخل لومن را در مقایسه با فاز شریانی دنبال کنید.'],
    ],
    reportTitle: 'ابتدا محل را مشخص کنید، سپس تفسیر کنید', report: [
      'سگمان روده و قلمرو عروقی را تا حد امکان دقیق نام ببرید.',
      'نشت فعال را از خون پرچگال، محتویات یا ماده‌ای که در تصاویر بدون تزریق هم دیده می‌شود تفکیک کنید.',
      'فازهای شریانی و پورتوونوس را مقایسه کنید و زمان تصویربرداری و آرتیفکت حرکتی را در نظر بگیرید.',
      'یافته مثبت CTA را سریع به تیم درمان اطلاع دهید.',
    ],
    contextTitle: 'روش را با فعالیت خون‌ریزی تطبیق دهید', context: 'CTA یکی از روش‌های مکان‌یابی است و مسیر ثابتی برای همه نیست. ESGE در بیمار ناپایدار با شک به خون‌ریزی ادامه‌دار، CTA را پیش از درمان توصیه می‌کند؛ ASGE در ۲۰۲۶ کولونوسکوپی یا CT ± آنژیوگرافی را برای بررسی نخست می‌پذیرد، با کولونوسکوپی پس از پایدارشدن و CT ± آنژیوگرافی در صورت تداوم ناپایداری. پس از CT مثبت، در زمینهٔ بالینی مناسب ممکن است مداخلهٔ رادیولوژیک انجام شود.',
    cave: 'CTA به زمان وابسته است: اگر خون‌ریزی متوقف یا متناوب باشد، بررسی ممکن است منفی شود. بنابراین نتیجه منفی قاعده‌ای برای رد کلی نیست و جایگزین ارزیابی خطر بالینی نمی‌شود.',
    angioTitle: 'پس از مکان‌یابی خون‌ریزی فعال چه می‌شود؟',
    angioIntro: 'اگر CTA نشت مادهٔ حاجب را نشان دهد، در صورت تداوم خون‌ریزی و تناسب شرایط بالینی ممکن است آنژیوگرافی کاتتری و سپس آمبولیزاسیون انتخابی انجام شود. عبارت «استاندارد طلایی» در PDF قاعده‌ای همگانی برای اقدام نیست؛ پایداری بیمار، فعالیت خون‌ریزی و مسیر تصمیم‌گیری تیمی تعیین‌کننده‌اند.',
    angioSteps: [
      ['۱ · قلمرو عروقی را انتخاب کنید', 'دسترسی ترانس‌فمورال؛ انتخاب عروق برای تصویربرداری انتخابی بر اساس ناحیهٔ مشکوک است: شریان مزانتریک فوقانی برای رودهٔ باریک/کولون راست و شریان مزانتریک تحتانی برای کولون چپ. شریان رکتال فوقانی از IMA می‌آید؛ شاخه‌های دیگر رکتوم ممکن است از قلمرو ایلیاک داخلی باشند.'],
      ['۲ · شاخهٔ خون‌ریز را مکان‌یابی کنید', 'آنژیوگرافی ممکن است محل دیده‌شده در CTA را تأیید کند. اگر خون‌ریزی متوقف یا متناوب شده باشد، ممکن است در آنژیوگرافی کاتتری نیز نشت فعالی دیده نشود.'],
      ['۳ · آمبولیزاسیون انتخابی', 'اگر محل خون‌ریزی برای مداخله مناسب باشد، شاخهٔ مربوط ممکن است به‌صورت سوپرسلکتیو با میکروکاتتر انتخاب و مسدود شود؛ PDF معمولاً کویل یا ذرات را نام می‌برد.'],
      ['۴ · آنژیوگرافی پایانی', 'بررسی و ثبت کنید که آیا هنوز نشت مادهٔ حاجب دیده می‌شود یا نه. اثر هموستاز باید در کنار خطر ایسکمی روده سنجیده شود.'],
    ],
    surgery: 'PDF جراحی را به خون‌ریزی‌های نادر و مهارنشدنی محدود می‌کند؛ تصمیم فعلی باید در مسیر درمان تیمی گرفته شود.',
    source: 'پوشش منبع: Abdomen.pdf، صفحات فیزیکی ۸۶–۸۷ (شمارهٔ چاپی ۸۵–۸۶)؛ توالی تصویر p.86 و مسیر p.87 دیداری بررسی شدند. راهنماهای اولیه: ESGE 2021، DOI 10.1055/a-1496-8969؛ ACR 2021، DOI 10.1016/j.jacr.2021.02.018؛ ACG 2023، PMID 36735555؛ ASGE 2026، DOI 10.1016/j.gie.2026.06.046. تنوع عروق رکتوم توضیح داده شده؛ مقالهٔ Park و همکاران در JVIR 2020، PMID 31530489، کوهورت کوچک گذشته‌نگر RAE است، نه قاعدهٔ اقدام همگانی.',
    finalSummary: ['در CTA فازها را برای نشت تازه مقایسه و محل را دقیق گزارش کنید.', 'CTA یا آنژیوگرافی منفی، خون‌ریزی متناوب را با اطمینان رد نمی‌کند.', 'پس از CTA مثبت، با توجه به تداوم خون‌ریزی و زمینهٔ بالینی ممکن است آنژیوگرافی انتخابی با امکان آمبولیزاسیون انجام شود.', 'آنژیوگرافی پایانی و خون‌رسانی روده را با هم در نظر بگیرید.'],
  },
}

export default function LowerGIBleedingPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  const item = lowerGiRows.find(row => row.key === 'lowergi-territory')
  const text = value => value[lang] || value.de
  const check = { question: text(item.question), options: item.options.map(text), answer: 'ABCD'.indexOf(item.correct), explanation: text(item.explanation), wrongFeedback: Object.fromEntries(item.wrong.flatMap((value, index) => value ? [[index, text(value)]] : [])) }
  const lessonPath = '/abdomen/gi/untere-gi-blutung'
  const lessonReturn = lang === 'de' ? lessonPath : `${lessonPath}?lang=${lang}`
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  return <LessonReferenceShell lessonId="abdomen-lower-gi-bleeding" lang={lang} title={c.title} diagram="gi-bleed" copy={c} goals={lowerGiCoverage.learningGoals.map(goal => goal.text)} check={check} summary={c.finalSummary} mainLandmark quizHref={withLang(`/ueben/quiz?fach=abdomen&n=3&themen=untere-gi-blutung&from=${encodeURIComponent(lessonReturn)}`)} flashcardsHref={withLang(`/flashcards/untere-gi-blutung?from=${encodeURIComponent(lessonReturn)}`)}>
    <div className={styles.page} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <div className={styles.main} style={{ maxWidth: 1080, margin: '2rem auto', padding: '0 1rem' }}>
        <section className={styles.section}><p className={styles.lead}>{c.intro}</p><h2>{c.phasesTitle}</h2><div className={styles.cardsGrid}>{c.phases.map(([title, text]) => <article className={styles.infoCard} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className={styles.section}><h2>{c.reportTitle}</h2><ol>{c.report.map(item => <li key={item}>{item}</li>)}</ol><h2>{c.contextTitle}</h2><p>{c.context}</p><div className={styles.callout}><strong>⚠</strong><p>{c.cave}</p></div><small>{c.source}</small><p><a href="https://acsearch.acr.org/docs/69457/Narrative/" target="_blank" rel="noreferrer">ACR Appropriateness Criteria: Lower GI Bleeding ↗</a></p><p><a href="https://www.esge.com/diagnosis-and-management-of-acute-lower-gastrointestinal-bleeding-esge-guideline" target="_blank" rel="noreferrer">ESGE Guideline 2021 ↗</a></p><p><a href="https://pubmed.ncbi.nlm.nih.gov/36735555/" target="_blank" rel="noreferrer">ACG Guideline 2023 ↗</a></p><p><a href="https://www.giejournal.org/article/S0016-5107%2826%2906857-4/fulltext" target="_blank" rel="noreferrer">ASGE Guideline 2026 ↗</a></p></section>
        <section className={styles.section}><h2>{c.angioTitle}</h2><p>{c.angioIntro}</p><div className={styles.cardsGrid}>{c.angioSteps.map(([title, text]) => <article className={styles.infoCard} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><div className={styles.callout}><strong>⚠</strong><p>{c.surgery}</p></div></section>
      </div>
    </div>
  </LessonReferenceShell>
}
