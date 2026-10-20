'use client'

import LessonReferenceShell from '@/components/LessonReferenceShell'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const C = {
  de: {
    title: 'Lebermetastasen', subtitle: 'Vaskularität über die Kontrastphasen einordnen und den Herdbefund systematisch beschreiben.',
    goals: ['Hypo- und hypervaskuläre Muster anhand der arteriellen und portalvenösen Phase unterscheiden.', 'Einzelherd schließt Metastase nicht aus; Zahl, Verteilung und Nekrose mitberichten.', 'Das Enhancement-Muster als Hinweis, nicht als alleinigen Beweis des Primärtumors verwenden.'],
    intro: 'Der erste Lernschritt ist der Vergleich über mehrere Phasen: Bleibt der Herd relativ hypodens, oder reichert er arteriell stark an und wird später wieder hypodens? Das Muster ordnet die Suche, beweist aber allein weder den Primärtumor noch die Diagnose.',
    hypo: 'Hypovaskuläres Muster', hypoText: 'Im PDF meist geringe arterielle Anreicherung; portalvenös bleibt der Herd deutlich hypodens/hypointens. Eine diskrete, inhomogene Randanreicherung und eine zentrale Nekrose können vorkommen. In der Spätphase wird keine zentrale Anreicherung beschrieben.',
    hyper: 'Hypervaskuläres Muster', hyperText: 'Im PDF starke früharterielle Anreicherung; portalvenös und spät kann rasches Wash-out folgen, sodass der Herd wieder hypodens/hypointens erscheint.',
    diagramTitle: 'Schematischer Phasenvergleich', diagramCaption: 'Prinzipdarstellung, keine Patientendaten: Das hypovaskuläre Muster bleibt unter der schematischen Leberreferenz; das hypervaskuläre steigt früh an und fällt später ab. Qualitativ, nicht quantitativ; tatsächliche Muster variieren.',
    arterial: 'Früharteriell', portal: 'Portalvenös', late: 'Spät', liver: 'Leber', hypoLabel: 'hypovaskulär', hyperLabel: 'hypervaskulär',
    describe: 'Was gehört in die Beschreibung?', describeText: 'Zahl (auch solitär möglich), Verteilung und Größe nennen. Anschließend Morphologie, unscharfe Begrenzung, mögliche Nekrose sowie das Verhalten in den tatsächlich vorhandenen Kontrastphasen festhalten. CT und MRT nicht aus einem einzelnen Bild beurteilen.',
    cave: 'Im PDF genannte Primärtumor-Beispiele sind Orientierung, keine spezifischen Zuordnungsregeln. Ein Enhancement-Muster allein bestimmt den Primärtumor nicht. Die Quelle nennt für MRT eine typische Diffusionsrestriktion; die Aussage ist hier nicht als obligates Merkmal übernommen und benötigt klinisch-wissenschaftliche Prüfung.',
    source: 'Quellennachweis: Abdomen.pdf, PDF-Seiten 24–25 (Druckseiten 23–24). CT-Fallbeispiel aus PDF-Seite 24; Phasenbezeichnungen gemäß PDF-Bildlegende.',
    checkQ: 'Ein einzelner Leberherd zeigt geringe arterielle Anreicherung und bleibt portalvenös deutlich hypodens. Welche Schlussfolgerung ist am besten?',
    checkOptions: ['Das passt zu einem hypovaskulären Muster; solitäres Auftreten schließt Metastase nicht aus.', 'Damit ist der Primärtumor sicher ein kolorektales Karzinom.', 'Ohne mehrere Herde ist eine Metastase ausgeschlossen.'],
    checkWhy: 'Das PDF beschreibt hypovaskuläre Muster und warnt ausdrücklich, dass ein solitärer Herd eine Metastase nicht ausschließt. Das Muster bestimmt den Primärtumor nicht allein.',
    summary: ['Phasen vergleichen; nicht aus einem Einzelbild schließen.', 'Vaskularität, Zahl, Verteilung, Morphologie und mögliche Nekrose beschreiben.', 'Muster als Hinweis interpretieren und klinischen Kontext ergänzen.'],
  },
  en: {
    title: 'Liver metastases', subtitle: 'Classify vascularity across contrast phases and describe the lesion systematically.',
    goals: ['Distinguish hypo- and hypervascular patterns using arterial and portal venous phases.', 'A solitary lesion does not exclude metastasis; report number, distribution and necrosis.', 'Treat enhancement pattern as a clue, not proof of the primary tumour.'],
    intro: 'Start by comparing phases: does the lesion remain relatively hypoattenuating, or does it enhance strongly in the arterial phase and become hypoattenuating later? The pattern helps guide interpretation, but alone proves neither the primary tumour nor the diagnosis.',
    hypo: 'Hypovascular pattern', hypoText: 'The PDF describes little arterial enhancement in most cases; the lesion remains clearly hypoattenuating/hypointense in the portal venous phase. Subtle heterogeneous rim enhancement and central necrosis may occur. No central enhancement is described in the delayed phase.',
    hyper: 'Hypervascular pattern', hyperText: 'The PDF describes strong early arterial enhancement; rapid wash-out may follow in portal venous and delayed phases, making the lesion hypoattenuating/hypointense again.',
    diagramTitle: 'Schematic phase comparison', diagramCaption: 'Teaching diagram, not patient data: the hypovascular curve stays below the schematic liver reference; the hypervascular curve rises early and falls later. Qualitative, not quantitative; actual patterns vary.',
    arterial: 'Early arterial', portal: 'Portal venous', late: 'Delayed', liver: 'Liver', hypoLabel: 'hypovascular', hyperLabel: 'hypervascular',
    describe: 'What should the description include?', describeText: 'State number (a solitary lesion is possible), distribution and size. Then describe morphology, indistinct margins, possible necrosis and behaviour in the contrast phases actually acquired. Do not assess CT or MRI from a single image.',
    cave: 'Primary tumour examples in the PDF are orientation, not specific assignment rules. Enhancement pattern alone does not identify the primary tumour. The source calls diffusion restriction typical on MRI; this lesson does not treat it as an obligatory feature, and it requires clinical-scientific review.',
    source: 'Source: Abdomen.pdf, PDF pp. 24–25 (printed pp. 23–24). CT case from PDF p. 24; phase labels follow the PDF caption.',
    checkQ: 'A solitary liver lesion shows little arterial enhancement and remains clearly hypoattenuating in the portal venous phase. What is the best conclusion?',
    checkOptions: ['This fits a hypovascular pattern; solitary presentation does not exclude metastasis.', 'This proves the primary tumour is colorectal cancer.', 'Metastasis is excluded unless multiple lesions are present.'],
    checkWhy: 'The PDF describes hypovascular patterns and explicitly warns that a solitary lesion does not exclude metastasis. Pattern alone does not identify the primary tumour.',
    summary: ['Compare phases; do not conclude from one image.', 'Describe vascularity, number, distribution, morphology and possible necrosis.', 'Interpret the pattern as a clue and add clinical context.'],
  },
  fa: {
    title: 'متاستازهای کبدی', subtitle: 'عروق‌رسانی را در فازهای تزریق بسنجید و ضایعه را منظم توصیف کنید.',
    goals: ['الگوهای کم‌عروق و پرعروق را با مقایسه فاز شریانی و پورت تفکیک کنید.', 'منفرد بودن ضایعه متاستاز را رد نمی‌کند؛ تعداد، توزیع و نکروز را گزارش کنید.', 'الگوی تقویت را سرنخ بدانید، نه اثبات منشأ اولیه تومور.'],
    intro: 'نخست فازها را با هم مقایسه کنید: ضایعه نسبت به کبد کم‌دانسیته می‌ماند یا در فاز شریانی واضح تقویت می‌شود و بعد دوباره کم‌دانسیته می‌گردد؟ این الگو به جهت‌دهی تفسیر کمک می‌کند، اما به‌تنهایی نه منشأ اولیه تومور را اثبات می‌کند و نه تشخیص را.',
    hypo: 'الگوی کم‌عروق', hypoText: 'در PDF معمولاً تقویت شریانی کم است؛ ضایعه در فاز پورت نیز آشکارا کم‌دانسیته/کم‌سیگنال می‌ماند. تقویت حاشیه‌ای خفیف و ناهمگون و نکروز مرکزی ممکن است دیده شود. در فاز تأخیری، تقویت مرکزی توصیف نشده است.',
    hyper: 'الگوی پرعروق', hyperText: 'در PDF تقویت شریانی زودرس و واضح توصیف شده است؛ در فاز پورت و تأخیری ممکن است wash-out سریع رخ دهد و ضایعه دوباره کم‌دانسیته/کم‌سیگنال شود.',
    diagramTitle: 'مقایسهٔ شماتیک فازها', diagramCaption: 'شماتیک آموزشی و نه تصویر بیمار: منحنی کم‌عروق پایین‌تر از خط مرجع کبد می‌ماند؛ منحنی پرعروق زود بالا می‌رود و بعد افت می‌کند. نمایش کیفی است، نه کمی؛ الگوهای واقعی متفاوت‌اند.',
    arterial: 'شریانی زودرس', portal: 'پورت', late: 'تأخیری', liver: 'کبد', hypoLabel: 'کم‌عروق', hyperLabel: 'پرعروق',
    describe: 'چه چیزهایی را توصیف کنیم؟', describeText: 'تعداد (ضایعه منفرد هم ممکن است)، توزیع و اندازه را ذکر کنید. سپس مورفولوژی، حدود نامشخص، نکروز احتمالی و رفتار در فازهای تزریقی انجام‌شده را ثبت کنید. CT یا MRI را بر اساس یک تصویر تنها ارزیابی نکنید.',
    cave: 'نمونه‌های منشأ اولیه در PDF برای جهت‌یابی‌اند و قاعده اختصاصی انتساب نیستند. الگوی تقویت به‌تنهایی منشأ اولیه را تعیین نمی‌کند. منبع محدودیت انتشار را در MRI تیپیک می‌داند؛ این درس آن را معیار الزامی تلقی نمی‌کند و این ادعا به بازبینی علمی نیاز دارد.',
    source: 'منبع: Abdomen.pdf، صفحات PDF ۲۴–۲۵ (صفحات چاپی ۲۳–۲۴). نمونه CT از صفحه ۲۴؛ نام فازها مطابق زیرنویس PDF است.',
    checkQ: 'یک ضایعه منفرد کبدی تقویت شریانی کمی دارد و در فاز پورت آشکارا کم‌دانسیته باقی می‌ماند. بهترین نتیجه کدام است؟',
    checkOptions: ['با الگوی کم‌عروق سازگار است؛ منفرد بودن متاستاز را رد نمی‌کند.', 'منشأ کولورکتال را قطعی می‌کند.', 'تا وقتی چند ضایعه وجود ندارد، متاستاز رد می‌شود.'],
    checkWhy: 'PDF الگوی کم‌عروق را شرح می‌دهد و صریحاً هشدار می‌دهد که ضایعه منفرد متاستاز را رد نمی‌کند. الگو به‌تنهایی منشأ اولیه را مشخص نمی‌کند.',
    summary: ['فازها را مقایسه کنید و از یک تصویر نتیجه‌گیری نکنید.', 'عروق‌رسانی، تعداد، توزیع، مورفولوژی و نکروز احتمالی را توصیف کنید.', 'الگو را سرنخ بدانید و زمینه بالینی را اضافه کنید.'],
  },
}

function PhaseDiagram({ c }) {
  return <svg className={styles.diagram} viewBox="0 0 760 330" role="img" aria-label={c.diagramTitle}>
    <rect x="1" y="1" width="758" height="328" rx="18" fill="var(--bg-card, #fff)" stroke="var(--border, #b8d7e5)" />
    {[0,1,2].map((i) => <g key={i}><text x={150 + i*220} y="36" textAnchor="middle" className={styles.axis}>{[c.arterial,c.portal,c.late][i]}</text><line x1={58+i*220} y1="265" x2={240+i*220} y2="265" className={styles.axisLine}/></g>)}
    <text x="20" y="108" className={styles.label}>{c.hypoLabel}</text>
    <line x1="82" y1="72" x2="630" y2="72" className={styles.liverRef}/>
    <path d="M82 123 C150 125 173 130 200 131 S276 133 300 133 S380 134 410 134 S490 135 520 135 S595 136 630 136" className={styles.hypo}/>
    <text x="20" y="202" className={styles.label}>{c.hyperLabel}</text>
    <line x1="82" y1="176" x2="630" y2="176" className={styles.liverRef}/>
    <path d="M82 224 C148 222 171 130 200 118 S270 199 300 211 S380 220 410 222 S490 225 520 226 S595 228 630 229" className={styles.hyper}/>
    <text x="684" y="77" className={styles.axis}>{c.liver}</text><text x="684" y="181" className={styles.axis}>{c.liver}</text>
  </svg>
}

export default function LiverMetastasesPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  const check = { question:c.checkQ, options:c.checkOptions, answer:0, explanation:c.checkWhy, diagramCaption:c.diagramCaption }
  return <LessonReferenceShell lessonId="lebermetastasen" lang={lang} title={c.title} heroVisual={<PhaseDiagram c={c}/>} diagram="liver" goals={c.goals} check={check} summary={c.summary} quizHref="/ueben/quiz?fach=abdomen&n=2&themen=lebermetastasen" flashcardsHref="/flashcards/lebermetastasen" copy={{ contentTitle: { de:'Vom Phasenmuster zur Beschreibung', en:'From phase pattern to description', fa:'از الگوی فازی تا توصیف' } }}>
    <main className={styles.content}>
      <p className={styles.lead}>{c.intro}</p>
      <p className={styles.caption}>{c.diagramTitle}: {c.diagramCaption}</p>
      <figure className={styles.caseFigure}>
        <Image src="/educational/liver-metastases/ct-case-p24.jpg" alt={lang === 'fa' ? 'دو تصویر محوری CT از متاستازهای کبدی در فاز شریانی و پورت' : lang === 'en' ? 'Two axial CT images of liver metastases in arterial and portal venous phases' : 'Zwei axiale CT-Aufnahmen von Lebermetastasen in arterieller und portalvenöser Phase'} width={704} height={279} sizes="(max-width: 760px) 100vw, 760px" />
        <figcaption>{lang === 'fa' ? 'نمونهٔ آموزشی از Abdomen.pdf، صفحهٔ ۲۴: سمت چپ فاز شریانی و سمت راست فاز پورت؛ آدنوکارسینوم طبق زیرنویس منبع.' : lang === 'en' ? 'Teaching case from Abdomen.pdf, p. 24: arterial phase on the left and portal venous phase on the right; adenocarcinoma per source caption.' : 'Lehrfall aus Abdomen.pdf, S. 24: links arterielle, rechts portalvenöse Phase; Adenokarzinom laut Quellenlegende.'}</figcaption>
      </figure>
      <div className={styles.patterns}><section><h2>{c.hypo}</h2><p>{c.hypoText}</p></section><section><h2>{c.hyper}</h2><p>{c.hyperText}</p></section></div>
      <section className={styles.reporting}><h2>{c.describe}</h2><p>{c.describeText}</p></section>
      <aside className={styles.cave}><strong>CAVE</strong><p>{c.cave}</p></aside>
      <small className={styles.source}>{c.source}</small>
    </main>
  </LessonReferenceShell>
}
