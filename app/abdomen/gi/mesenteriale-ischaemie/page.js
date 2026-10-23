'use client'

import Image from 'next/image'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const C = {
  de: {
    title: 'Mesenteriale Ischämie',
    goals: ['Die CTA systematisch in Arterien, Venen und Darm beurteilen.', 'Arterielle Okklusion, venöse Thrombose und NOMI als unterschiedliche Muster einordnen.', 'Schwere Darmzeichen beschreiben, ohne aus einem Einzelzeichen Irreversibilität abzuleiten.'],
    contentTitle: 'Von den Gefäßen zur Darmwand',
    intro: 'Bei Verdacht auf akute mesenteriale Ischämie ist die kontrastmittelgestützte CTA die zentrale Bildgebung. Lies die Untersuchung in drei Ebenen: arterielle Zufuhr, mesenterialer/portalvenöser Abfluss und anschließend Darmwand sowie angrenzendes Mesenterium.',
    protocolTitle: '1 · Ist die CTA für beide Gefäßsysteme vollständig?',
    protocol: 'Die ESVS-Leitlinie 2025 empfiehlt bei Verdacht auf akute mesenteriale Ischämie eine dringliche CTA mit arterieller und venöser Phase und dünnen Schichten (≤ 1 mm); eine native Phase kann ergänzen. Die Empfehlung gilt ausdrücklich unabhängig von der Nierenfunktion. Die arterielle Phase zeigt die Zufuhr, die venöse Phase unter anderem Mesenterialvenen und Darmwand. Eine fehlende Phase begrenzt die Beurteilung.',
    flowTitle: 'Drei Suchstationen', flow: ['Arterien: Aorta, Abgang und Verlauf der A. mesenterica superior sowie sichtbare Äste.', 'Venen: V. mesenterica superior und Pfortader auf Füllungsdefekt und Ausdehnung prüfen.', 'Darm: Wanddicke und Kontrastierung, mesenteriales Ödem, freie Flüssigkeit, Gas in Wand oder Pfortadersystem und freie Luft beschreiben.'],
    arterial: 'Arterielle Okklusion', arterialText: 'Ein Füllungsdefekt oder abruptes Gefäßende lokalisiert eine mögliche arterielle Ursache. Beurteile zusätzlich, welche Darmabschnitte betroffen sind und wie sie kontrastieren. Die CTA-Montage aus dem PDF zeigt ein arterielles Verschlussmuster; sie ersetzt keine vollständige Befundung.',
    venous: 'Venöse Thrombose', venousText: 'Ein Füllungsdefekt in der V. mesenterica superior oder Pfortader kann mit mesenterialem Ödem und auffälliger Darmwand einhergehen. Das PDF nennt Wandödem bei venöser Ischämie oder nach Reperfusion. Beschreibe den Thrombusort und seine Ausdehnung getrennt von den Darmfolgen.',
    strangulationTitle: 'Closed loop und Strangulation', strangulationText: 'Eine geschlossene Darmschlinge kann durch Strangulation eine Ursache akuter mesenterialer Ischämie sein. Suche nach der geschlossenen Schlinge und beurteile Gefäße, Wandkontrastierung und mesenteriale Begleitzeichen; die PDF-Häufigkeitsangabe wird nicht als aktuelle Zahl übernommen.',
    nomi: 'NOMI als Muster ohne großen Gefäßverschluss', nomiText: 'Bei passendem Kontext kann eine Minderperfusion des Darms trotz fehlender relevanter SMA-Stenose oder -Okklusion vorliegen. Die Leitlinie nennt Schock plus Darmzeichen in der CTA als Konstellation, die an NOMI denken lässt; das ist eine klinisch-radiologische Einordnung, kein einzelnes beweisendes CT-Zeichen.',
    imageVenousAlt: 'Zwei CT-Beispiele einer mesenterialen Venenthrombose mit markiertem venösem Thrombus und mesenterialen Darmveränderungen.',
    imageArterialAlt: 'Mehrteilige CTA-Montage mit markierten mesenterialen Arterien und arteriellen Verschlussstellen.',
    venousCaption: 'Abdomen.pdf, PDF-Seite 74 (Druckseite 73): CT-Beispiel mit im Quellmaterial markiertem Thrombus der V. mesenterica superior bis zur Pfortader sowie mesenterialen und intestinalen Begleitzeichen. Quelle und Markierungen aus dem bereitgestellten PDF.',
    arterialCaption: 'Abdomen.pdf, PDF-Seite 75 (Druckseite 74), CTA-Montage; im PDF mit rID 84614 gekennzeichnet. Die Originalbeschriftungen und Pfeile bleiben Teil des Quellenbildes.',
    bowelTitle: '2 · Was sagen Darmwand und Gas?',
    bowel: 'Das Target-Zeichen beschreibt eine dreischichtige Wand: Mukosa und Serosa reichern an, die ödematöse Submukosa erscheint relativ dunkel. Das PDF ordnet Wandverdickung und dieses Wandödem besonders venöser Ischämie oder Reperfusion zu. Eine papierdünne, nicht kontrastierende Wand ist ein ernstes Zeichen für fehlende Perfusion und wird im PDF als typisch für einen arteriellen Verschluss beschrieben. Pneumatosis und portomesenterisches Gas sind ebenfalls schwere Zeichen, beweisen aber nach ESVS 2025 allein keine irreversible Nekrose.',
    cave: 'Das Target-Zeichen und Wandverdickung sind nicht spezifisch genug, um Ursache oder Darmvitalität allein festzulegen. Gefäßbefund, Verteilung, Untersuchungsphasen und klinischen Kontext gemeinsam bewerten.',
    source: 'Quellen: Abdomen.pdf, PDF-Seiten 73–75 (Druckseiten 72–74); ESVS 2025 Clinical Practice Guidelines, Empfehlung 33 und Abschnitte zur CTA sowie Darmzeichen, DOI 10.1016/j.ejvs.2025.06.010.',
    checkQ: 'Bei einem Patienten im Schock ist die A. mesenterica superior durchgängig. Die CTA zeigt jedoch vermindertes Darmwand-Enhancement und Wandverdickung. Welche Einordnung ist am angemessensten?',
    options: ['NOMI als Möglichkeit erwägen; die Konstellation ist verdächtig, aber kein einzelnes Zeichen beweist sie.', 'Eine mesenteriale Ischämie ausschließen, weil kein SMA-Verschluss besteht.', 'Irreversible Nekrose allein aus der Wandverdickung ableiten.'],
    explanation: 'Die ESVS-Leitlinie beschreibt Schock und Darmzeichen ohne relevante SMA-Stenose/-Okklusion als Konstellation, die an NOMI denken lässt. Die Befunde müssen im klinischen Kontext eingeordnet werden.',
    summary: ['CTA bei Verdacht in arterieller und venöser Phase systematisch prüfen.', 'Arterielle Zufuhr, venösen Abfluss und Darmfolgen getrennt beschreiben.', 'Pneumatosis oder portomesenterisches Gas sind schwerwiegend, beweisen aber allein keine Irreversibilität.'],
  },
  en: {
    title: 'Mesenteric Ischaemia',
    goals: ['Assess CTA systematically across arteries, veins and bowel.', 'Distinguish arterial occlusion, venous thrombosis and NOMI as different patterns.', 'Describe severe bowel signs without inferring irreversibility from one finding.'],
    contentTitle: 'From vessels to bowel wall',
    intro: 'When acute mesenteric ischaemia is suspected, contrast-enhanced CTA is the central imaging test. Read it across three levels: arterial inflow, mesenteric/portal venous outflow, then bowel wall and adjacent mesentery.',
    protocolTitle: '1 · Does the CTA cover both vascular systems?',
    protocol: 'The 2025 ESVS guideline recommends urgent CTA with arterial and venous phases and thin sections (≤ 1 mm) when acute mesenteric ischaemia is suspected; a non-contrast phase may be added. This recommendation explicitly applies regardless of renal function. The arterial phase shows inflow; the venous phase evaluates, among other structures, mesenteric veins and bowel wall. A missing phase limits assessment.',
    flowTitle: 'Three search stations', flow: ['Arteries: aorta, origin and course of the superior mesenteric artery, and visible branches.', 'Veins: assess the superior mesenteric vein and portal vein for filling defects and extent.', 'Bowel: describe wall thickness and enhancement, mesenteric oedema, free fluid, mural or portomesenteric gas, and free air.'],
    arterial: 'Arterial occlusion', arterialText: 'A filling defect or abrupt vessel cut-off can localise a possible arterial cause. Also assess which bowel segments are involved and how they enhance. The PDF CTA montage shows an arterial occlusion pattern; it does not replace a complete interpretation.',
    venous: 'Venous thrombosis', venousText: 'A filling defect in the superior mesenteric or portal vein may accompany mesenteric oedema and abnormal bowel wall. The PDF links wall oedema with venous ischaemia or after reperfusion. Describe thrombus location and extent separately from bowel consequences.',
    strangulationTitle: 'Closed loop and strangulation', strangulationText: 'A closed bowel loop can cause acute mesenteric ischaemia through strangulation. Look for the closed loop and assess vessels, wall enhancement and mesenteric changes; the PDF frequency estimate is not carried forward as a current figure.',
    nomi: 'NOMI: a pattern without major-vessel occlusion', nomiText: 'In the appropriate context, bowel hypoperfusion may occur despite no relevant SMA stenosis or occlusion. The guideline identifies shock plus bowel signs on CTA as a constellation that should raise NOMI; this is a clinical-radiological interpretation, not one diagnostic CT sign.',
    imageVenousAlt: 'Two CT examples of mesenteric venous thrombosis with the source-marked venous thrombus and bowel/mesenteric changes.',
    imageArterialAlt: 'Multi-panel CTA montage with mesenteric arteries and arterial occlusion sites marked.',
    venousCaption: 'Abdomen.pdf, PDF p. 74 (printed p. 73): CT example with source-marked superior mesenteric vein thrombus extending to the portal vein and associated mesenteric/bowel findings. Source annotations are retained from the supplied PDF.',
    arterialCaption: 'Abdomen.pdf, PDF p. 75 (printed p. 74), CTA montage; labelled rID 84614 in the PDF. Original labels and arrows remain part of the source image.',
    bowelTitle: '2 · What do bowel wall and gas tell you?',
    bowel: 'The target sign describes a three-layered wall: mucosa and serosa enhance, while the oedematous submucosa appears relatively dark. The PDF associates wall thickening and this mural oedema particularly with venous ischaemia or reperfusion. A paper-thin non-enhancing wall is a serious sign of absent perfusion and is described in the PDF as typical of arterial occlusion. Pneumatosis and portomesenteric gas are also severe findings, but ESVS 2025 states they do not alone prove irreversible necrosis.',
    cave: 'The target sign and wall thickening are not specific enough to determine the cause or bowel viability on their own. Assess vascular findings, distribution, examination phases and clinical context together.',
    source: 'Sources: Abdomen.pdf, PDF pp. 73–75 (printed pp. 72–74); ESVS 2025 Clinical Practice Guidelines, recommendation 33 and CTA/bowel-sign sections, DOI 10.1016/j.ejvs.2025.06.010.',
    checkQ: 'A patient in shock has a patent superior mesenteric artery. CTA nevertheless shows reduced bowel-wall enhancement and wall thickening. What is the most appropriate interpretation?',
    options: ['Consider NOMI; the constellation is suspicious, but no single sign proves it.', 'Exclude mesenteric ischaemia because there is no SMA occlusion.', 'Infer irreversible necrosis from wall thickening alone.'],
    explanation: 'The ESVS guideline describes shock and bowel signs without relevant SMA stenosis/occlusion as a constellation that should raise NOMI. Interpret the findings in clinical context.',
    summary: ['Review CTA systematically in arterial and venous phases when ischaemia is suspected.', 'Describe arterial inflow, venous outflow and bowel consequences separately.', 'Pneumatosis or portomesenteric gas is severe, but alone does not prove irreversibility.'],
  },
  fa: {
    title: 'ایسکمی مزانتریک',
    goals: ['CTA را به‌صورت منظم در سه بخش شریان‌ها، وریدها و روده ارزیابی کنید.', 'انسداد شریانی، ترومبوز وریدی و NOMI را به‌عنوان الگوهای متفاوت بشناسید.', 'یافته‌های شدید روده‌ای را توصیف کنید، بی‌آنکه از یک علامت به برگشت‌ناپذیری برسید.'],
    contentTitle: 'از عروق تا دیواره روده',
    intro: 'در شک به ایسکمی حاد مزانتریک، CTA با ماده حاجب تصویربرداری محوری است. بررسی را در سه سطح پیش ببرید: ورود خون شریانی، تخلیه وریدی مزانتریک/پورت و سپس دیواره روده و مزانتر مجاور.',
    protocolTitle: '۱ · آیا CTA هر دو دستگاه عروقی را پوشش می‌دهد؟',
    protocol: 'راهنمای ESVS سال ۲۰۲۵ در شک به ایسکمی حاد مزانتریک، CTA فوری با فاز شریانی و وریدی و برش‌های نازک (≤ ۱ میلی‌متر) را توصیه می‌کند؛ فاز بدون تزریق را می‌توان افزود. این توصیه صراحتاً مستقل از عملکرد کلیه است. فاز شریانی ورود خون و فاز وریدی، از جمله وریدهای مزانتریک و دیواره روده را نشان می‌دهد. نبود هر فاز، ارزیابی را محدود می‌کند.',
    flowTitle: 'سه ایستگاه جست‌وجو', flow: ['شریان‌ها: آئورت، مبدأ و مسیر شریان مزانتریک فوقانی و شاخه‌های قابل مشاهده.', 'وریدها: ورید مزانتریک فوقانی و ورید پورت را از نظر نقص پرشدگی و گستره بررسی کنید.', 'روده: ضخامت و تقویت دیواره، ادم مزانتر، مایع آزاد، گاز دیواره یا پورتومزانتریک و هوای آزاد را توصیف کنید.'],
    arterial: 'انسداد شریانی', arterialText: 'نقص پرشدگی یا قطع ناگهانی مسیر رگ می‌تواند محل علت شریانی احتمالی را نشان دهد. همچنین قطعات درگیر روده و میزان تقویت آن‌ها را بسنجید. مونتاژ CTA در PDF الگوی انسداد شریانی را نشان می‌دهد، اما جایگزین تفسیر کامل نیست.',
    venous: 'ترومبوز وریدی', venousText: 'نقص پرشدگی در ورید مزانتریک فوقانی یا پورت ممکن است همراه ادم مزانتر و تغییرات دیواره روده باشد. PDF ادم دیواره را با ایسکمی وریدی یا پس از بازپرفیوژن مرتبط می‌داند. محل و گستره ترومبوز را جدا از پیامدهای روده‌ای توصیف کنید.',
    strangulationTitle: 'حلقه بسته و استرانگولاسیون', strangulationText: 'حلقه بستهٔ روده می‌تواند از راه استرانگولاسیون علت ایسکمی حاد مزانتریک باشد. حلقه بسته را پیدا کنید و عروق، تقویت دیواره و تغییرات مزانتر را بسنجید؛ درصد فراوانی PDF به‌عنوان عدد معتبر امروزی بازگو نمی‌شود.',
    nomi: 'NOMI: الگو بدون انسداد عروق بزرگ', nomiText: 'در زمینه مناسب، کاهش خون‌رسانی روده ممکن است بدون تنگی یا انسداد مهم SMA رخ دهد. راهنما شوک همراه علائم روده‌ای در CTA را الگویی می‌داند که باید NOMI را مطرح کند؛ این تفسیر بالینی-رادیولوژیک است و یک علامت منفرد CT تشخیصی نیست.',
    imageVenousAlt: 'دو نمونه CT از ترومبوز وریدی مزانتریک با ترومبوز و تغییرات روده و مزانتر که در تصویر منبع علامت‌گذاری شده‌اند.',
    imageArterialAlt: 'مونتاژ چندبخشی CTA با شریان‌های مزانتریک و محل‌های انسداد شریانی علامت‌گذاری‌شده.',
    venousCaption: 'Abdomen.pdf، صفحه PDF ۷۴ (صفحه چاپی ۷۳): نمونه CT با ترومبوز ورید مزانتریک فوقانی تا ورید پورت که در منبع علامت‌گذاری شده، همراه یافته‌های مزانتر و روده. نشانه‌گذاری‌های منبع حفظ شده‌اند.',
    arterialCaption: 'Abdomen.pdf، صفحه PDF ۷۵ (صفحه چاپی ۷۴)، مونتاژ CTA؛ در PDF با شناسه rID 84614 مشخص شده است. برچسب‌ها و پیکان‌های اصلی بخشی از تصویر منبع هستند.',
    bowelTitle: '۲ · دیواره روده و گاز چه می‌گویند؟',
    bowel: 'علامت هدف یعنی دیواره سه‌لایه دیده می‌شود: مخاط و سروزا تقویت می‌شوند و زیرمخاط ادماتو نسبتاً تیره است. PDF ضخیم‌شدن و ادم دیواره را به‌ویژه با ایسکمی وریدی یا پس از بازپرفیوژن مرتبط می‌داند. دیواره کاغذیِ بدون تقویت نشانه‌ای جدی از نبود پرفیوژن است و PDF آن را برای انسداد شریانی تیپیک می‌داند. پنوماتوز و گاز پورتومزانتریک نیز شدیدند، اما طبق ESVS 2025 به‌تنهایی نکروز برگشت‌ناپذیر را ثابت نمی‌کنند.',
    cave: 'علامت هدف و ضخیم‌شدن دیواره به‌تنهایی برای تعیین علت یا حیات‌پذیری روده اختصاصی نیستند. یافته‌های عروقی، توزیع، فازهای تصویربرداری و زمینه بالینی را با هم بسنجید.',
    source: 'منابع: Abdomen.pdf، صفحات PDF ۷۳–۷۵ (صفحات چاپی ۷۲–۷۴)؛ راهنمای بالینی ESVS 2025، توصیه ۳۳ و بخش‌های CTA و علائم روده‌ای، DOI 10.1016/j.ejvs.2025.06.010.',
    checkQ: 'بیماری در شوک است و شریان مزانتریک فوقانی باز است؛ بااین‌حال CTA کاهش تقویت و ضخیم‌شدن دیواره روده را نشان می‌دهد. مناسب‌ترین برداشت چیست؟',
    options: ['NOMI را مطرح کنید؛ این مجموعه مشکوک است، اما هیچ علامت منفردی آن را ثابت نمی‌کند.', 'چون انسداد SMA نیست، ایسکمی مزانتریک را رد کنید.', 'فقط از ضخیم‌شدن دیواره، نکروز برگشت‌ناپذیر نتیجه بگیرید.'],
    explanation: 'راهنمای ESVS شوک و علائم روده‌ای بدون تنگی یا انسداد مهم SMA را الگویی می‌داند که باید NOMI را مطرح کند. یافته‌ها باید در زمینه بالینی تفسیر شوند.',
    summary: ['در شک به ایسکمی، CTA را منظم در فاز شریانی و وریدی ببینید.', 'ورود شریانی، تخلیه وریدی و پیامدهای روده‌ای را جداگانه توصیف کنید.', 'پنوماتوز یا گاز پورتومزانتریک شدید است، اما به‌تنهایی برگشت‌ناپذیری را ثابت نمی‌کند.'],
  },
}

function SearchFlow({ c }) {
  return <ol className={styles.flow}>{c.flow.map((item) => <li key={item}>{item}</li>)}</ol>
}

export default function MesentericIschaemiaPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  const langHref = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const lessonReturn = `${langHref('/abdomen/gi/mesenteriale-ischaemie')}#cta-protocol`
  const check = { question: c.checkQ, options: c.options, answer: 0, explanation: c.explanation, diagramCaption: { de: 'Schema zur Orientierung; keine Patientendarstellung.', en: 'Orientation schematic; not patient data.', fa: 'شماتیک راهنما؛ تصویر بیمار نیست.' } }
  return <LessonReferenceShell lessonId="mesenteriale-ischaemie" lang={lang} title={c.title} diagram="bowel" goals={c.goals} check={check} summary={c.summary} copy={{ contentTitle: { de: c.contentTitle, en: c.contentTitle, fa: c.contentTitle } }} quizHref={langHref(`/ueben/quiz?fach=abdomen&n=1&themen=mesenteriale-ischaemie&from=${encodeURIComponent(lessonReturn)}`)} flashcardsHref={langHref(`/flashcards/mesenteriale-ischaemie?from=${encodeURIComponent(lessonReturn)}`)}>
    <main className={styles.content}>
      <p className={styles.lead}>{c.intro}</p>
      <section id="cta-protocol" className={styles.panel}><h2>{c.protocolTitle}</h2><p>{c.protocol}</p><SearchFlow c={c}/></section>
      <div className={styles.patterns}>
        <section><h2>{c.arterial}</h2><p>{c.arterialText}</p></section>
        <section><h2>{c.venous}</h2><p>{c.venousText}</p></section>
      </div>
      <section className={styles.panel}><h2>{c.strangulationTitle}</h2><p>{c.strangulationText}</p></section>
      <figure className={styles.figure}><Image src="/abdomen/mesenteric/arterial-occlusion-cta.png" width={1005} height={1083} alt={c.imageArterialAlt} sizes="(max-width: 800px) 100vw, 760px"/><figcaption>{c.arterialCaption}</figcaption></figure>
      <figure className={styles.figure}><Image src="/abdomen/mesenteric/venous-thrombosis-ct.png" width={1101} height={454} alt={c.imageVenousAlt} sizes="(max-width: 800px) 100vw, 760px"/><figcaption>{c.venousCaption}</figcaption></figure>
      <section className={styles.panel}><h2>{c.nomi}</h2><p>{c.nomiText}</p></section>
      <section className={styles.panel}><h2>{c.bowelTitle}</h2><p>{c.bowel}</p></section>
      <aside className={styles.cave}><strong>CAVE</strong><p>{c.cave}</p></aside>
      <small className={styles.source}>{c.source}</small>
    </main>
  </LessonReferenceShell>
}
