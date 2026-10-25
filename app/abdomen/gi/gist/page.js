'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import { gistAssessment } from '@/data/assessmentQuality/gistRevision'
import styles from './page.module.css'

const C = {
  de: {
    title: 'Gastrointestinale Stromatumoren (GIST)', goals: [
      'Eine vom Magen ausgehende, häufig exophytische Raumforderung als mögliches GIST-Muster erkennen.',
      'Lobulierte Kontur und hypodense Binnenanteile beschreiben, ohne daraus allein eine Diagnose abzuleiten.',
      'Die Bildgrenzen der drei nicht phasenbeschrifteten CT-Abbildungen benennen und wichtige Differenzialdiagnosen offenhalten.',
    ], contentTitle: 'Was zeigt die CT?', lead: 'GIST können sich als gut abgrenzbare, häufig exophytische gastrointestinale Raumforderungen mit heterogenem Enhancement präsentieren. Die hier gezeigte PDF-Serie illustriert eine lobulierte, vom Magen ausgehende Masse mit hypodensen Anteilen; sie beweist für sich allein weder Histologie noch Kontrastphase.',
    patternTitle: 'Muster beschreiben, nicht überdehnen', bullets: [
      'Herkunft und Wachstumsrichtung prüfen: Die PDF beschreibt die Raumforderung als vom Magen ausgehend; exophytisches Wachstum ist ein hilfreiches räumliches Muster.',
      'Binnenstruktur beschreiben: Hypodense oder heterogene Anteile können degenerative beziehungsweise nekrotische Bereiche widerspiegeln, sind aber nicht spezifisch.',
      'Die PDF-Folie beschreibt GIST allgemein als hypervaskulär mit besonders deutlichem Enhancement in der arteriellen Phase. Diese allgemeine Musteraussage ordnet keinem der drei unbeschrifteten CT-Bilder eine Phase zu.',
      'Nachbarschaft prüfen: Die PDF-Bildlegende nennt keine umgebende Fettsträhnigkeit oder Ödem. Das ist eine Bildbeobachtung, kein Ausschlusskriterium für andere Diagnosen.',
    ], figureTitle: 'Drei CT-Ansichten aus dem bereitgestellten PDF', figureNote: 'Die Originalfolie ordnet den Bildern keine Kontrastphase oder Sequenz zu. Deshalb werden die Ansichten nur nach ihrer Orientierung benannt; eine Phase oder ein Zielorgan wird nicht aus dem Bildstil erschlossen.', labels: ['Axialansicht 1', 'Axialansicht 2', 'Koronare Ansicht'], alts: ['Axiale CT-Abbildung einer lobulierten Magenraumforderung; Phase nicht angegeben.', 'Zweite axiale CT-Abbildung derselben PDF-Falltafel; Phase und Zeitbezug nicht angegeben.', 'Koronare CT-Abbildung der Magenraumforderung aus der PDF-Falltafel; Phase nicht angegeben.'],
    ddTitle: 'Welche Differenzialdiagnosen bleiben offen?', ddIntro: 'Die PDF nennt Magenkarzinom, Lymphom und Lipom als Differenzialdiagnosen. Eine einzelne Form- oder Dichtebeobachtung trennt diese Entitäten nicht zuverlässig.', ddItems: ['Magenkarzinom: Wandursprung, Ausdehnung und Schleimhautbezug mit Endoskopie und Klinik korrelieren.', 'Lymphom: Verteilungsmuster und weitere Lymphknoten-/Organbefunde im Gesamtkontext beurteilen.', 'Lipom: tatsächliche Fettattenuation im geeigneten CT-Kontext prüfen; „hypodens“ allein bedeutet nicht „Fett“.'],
    caveTitle: 'Grenzen dieser Bildtafel', cave: 'Die drei CT-Ausschnitte sind in der PDF weder nach Kontrastphase noch nach Untersuchungsdatum oder Fallnummer beschriftet. Die Bildlegende nennt eine lobulierte, vom Magen ausgehende Masse mit hypodensen Anteilen und fehlendem umgebendem Fettödem. Daraus wird hier keine sichere Diagnose, Phasenzuordnung oder Stadieneinteilung abgeleitet.',
    refTitle: 'Quellen und Umfang', ref: 'Primärstoff: Abdomen.pdf, physische S. 67–68 (gedruckte S. 66–67); visuell geprüft. Die drei CT-Ausschnitte stammen von der Fallfolie auf physischer S. 68. Bild-Credits/Fall-ID stehen im bereitgestellten PDF nicht dabei; Wiederverwendung der bereitgestellten PDF-Bilder ist vom Nutzer autorisiert. Ergänzende klinische Einordnung: Serrano C, et al. 2023 GEIS Guidelines for gastrointestinal stromal tumors. Therapeutic Advances in Medical Oncology. DOI: 10.1177/17588359231192388.',
    excludedTitle: 'Bewusst nicht übernommen', excluded: 'Die PDF enthält historische TNM-, PET-, Therapie- und Choi-Aussagen. Sie sind in dieser eng begrenzten Lektion nicht als aktuelle Kriterien übernommen. Der Fokus bleibt auf der CT-Morphologie und der vorsichtigen Differenzialdiagnose.',
    takeHome: ['Beschreibe den Magenursprung, die Wachstumsrichtung und die Binnenstruktur.', 'Heterogene oder hypodense Komponenten sind morphologische Hinweise, keine spezifische Diagnose.', 'Ordne keiner der drei nicht beschrifteten Ansichten eine Kontrastphase zu.', 'CT kann GIST vermuten lassen; die definitive Einordnung hängt vom klinischen und gegebenenfalls pathologischen Kontext ab.'],
  },
  en: {
    title: 'Gastrointestinal stromal tumours (GIST)', goals: [
      'Recognise a mass arising from the stomach, often with exophytic growth, as a possible GIST pattern.',
      'Describe lobulated contour and hypoattenuating internal areas without treating them as diagnostic on their own.',
      'State the limits of the three unlabelled CT panels and keep key differentials open.',
    ], contentTitle: 'What does CT show?', lead: 'GIST may appear as a well-defined, often exophytic gastrointestinal mass with heterogeneous enhancement. The PDF case shown here illustrates a lobulated mass arising from the stomach with hypoattenuating components; by itself, it proves neither histology nor contrast phase.',
    patternTitle: 'Describe the pattern without overcalling it', bullets: [
      'Check origin and growth direction: the PDF describes a mass arising from the stomach; exophytic growth is a useful spatial pattern.',
      'Describe internal structure: hypoattenuating or heterogeneous areas may reflect degenerative or necrotic components, but are not specific.',
      'The PDF slide generally describes GIST as hypervascular, with particularly marked arterial enhancement. This general pattern statement does not assign a phase to any of the three unlabelled CT panels.',
      'Assess adjacent tissues: the PDF caption notes no surrounding fat stranding or oedema. This is an observation, not an exclusion criterion for other diagnoses.',
    ], figureTitle: 'Three CT views from the supplied PDF', figureNote: 'The source slide does not assign a contrast phase or sequence to these images. The views are therefore labelled by orientation only; phase and target organ are not inferred from image appearance.', labels: ['Axial view 1', 'Axial view 2', 'Coronal view'], alts: ['Axial CT panel of a lobulated gastric mass; phase not specified.', 'Second axial CT panel from the PDF case slide; phase and timing not specified.', 'Coronal CT panel of the gastric mass from the PDF case slide; phase not specified.'],
    ddTitle: 'Which differentials remain open?', ddIntro: 'The PDF lists gastric carcinoma, lymphoma and lipoma as differentials. A single observation of shape or attenuation does not reliably separate these entities.', ddItems: ['Gastric carcinoma: correlate wall origin, extent and mucosal relationship with endoscopy and clinical findings.', 'Lymphoma: assess distribution and other nodal or organ findings in context.', 'Lipoma: assess true fat attenuation in the appropriate CT context; “hypoattenuating” alone does not mean “fat”.'],
    caveTitle: 'Limits of this image plate', cave: 'The three CT crops are not labelled by contrast phase, examination date or case number in the PDF. Its caption describes a lobulated mass arising from the stomach with hypoattenuating components and no surrounding fat oedema. This lesson does not infer a definitive diagnosis, phase assignment or stage from those details.',
    refTitle: 'Sources and scope', ref: 'Core source: Abdomen.pdf, physical pp. 67–68 (printed pp. 66–67); visually checked. The three CT crops come from the case slide on physical p.68. The supplied PDF does not identify image contributors or a case ID; reuse of the provided PDF images is authorised by the user. Supplementary clinical context: Serrano C, et al. 2023 GEIS Guidelines for gastrointestinal stromal tumors. Therapeutic Advances in Medical Oncology. DOI: 10.1177/17588359231192388.',
    excludedTitle: 'Intentionally excluded', excluded: 'The PDF includes historical TNM, PET, treatment and Choi statements. They are not reproduced as current criteria in this narrowly scoped lesson. The focus is CT morphology and cautious differential diagnosis.',
    takeHome: ['Describe gastric origin, growth direction and internal structure.', 'Heterogeneous or hypoattenuating components are morphologic clues, not a specific diagnosis.', 'Do not assign a contrast phase to any of the three unlabelled views.', 'CT may raise GIST; definitive classification depends on clinical and, where appropriate, pathologic context.'],
  },
  fa: {
    title: 'تومور استرومایی گوارشی (GIST)', goals: [
      'توده‌ای با منشأ معده و اغلب رشد برون‌گرا را به‌عنوان الگویی ممکن برای GIST بشناسید.',
      'حاشیه لوبوله و بخش‌های داخلی کم‌دانسیته را توصیف کنید، بی‌آنکه آن‌ها را به‌تنهایی تشخیصی بدانید.',
      'محدودیت سه تصویر CT بدون برچسب را بیان کنید و افتراق‌های مهم را باز نگه دارید.',
    ], contentTitle: 'CT چه چیزی نشان می‌دهد؟', lead: 'GIST ممکن است به شکل توده گوارشی با حدود مشخص، اغلب برون‌گرا و با جذب ناهمگن دیده شود. نمونه PDF در اینجا توده‌ای لوبوله با منشأ معده و بخش‌های کم‌دانسیته را نشان می‌دهد؛ این تصویر به‌تنهایی بافت‌شناسی یا فاز تزریق را ثابت نمی‌کند.',
    patternTitle: 'الگو را توصیف کنید، نه بیش از آن', bullets: [
      'منشأ و جهت رشد را بررسی کنید: PDF توده را با منشأ معده توصیف می‌کند؛ رشد برون‌گرا یک الگوی فضایی مفید است.',
      'ساختار داخلی را توصیف کنید: بخش‌های کم‌دانسیته یا ناهمگن ممکن است بازتاب تغییرات دژنراتیو یا نکروتیک باشند، اما اختصاصی نیستند.',
      'اسلاید PDF، GIST را به‌طور کلی پرعروق و دارای جذب واضح‌تر به‌ویژه در فاز شریانی توصیف می‌کند. این توصیف کلی، فاز هیچ‌یک از سه تصویر CT بدون برچسب را مشخص نمی‌کند.',
      'بافت مجاور را بررسی کنید: شرح PDF از استرندینگ چربی یا ادم اطراف یاد نمی‌کند. این یک مشاهده است، نه معیار رد سایر تشخیص‌ها.',
    ], figureTitle: 'سه نمای CT از PDF ارائه‌شده', figureNote: 'در اسلاید منبع فاز تزریق یا سکانس این تصاویر مشخص نشده است. بنابراین فقط جهت نما ذکر می‌شود و فاز یا عضو هدف از ظاهر تصویر حدس زده نمی‌شود.', labels: ['نمای آگزیال ۱', 'نمای آگزیال ۲', 'نمای کرونال'], alts: ['تصویر آگزیال CT از توده لوبوله معده؛ فاز مشخص نشده است.', 'دومین تصویر آگزیال CT از اسلاید مورد PDF؛ فاز و زمان مشخص نشده است.', 'تصویر کرونال CT از توده معده در اسلاید PDF؛ فاز مشخص نشده است.'],
    ddTitle: 'کدام افتراق‌ها همچنان باز هستند؟', ddIntro: 'PDF کارسینوم معده، لنفوم و لیپوم را در افتراق ذکر می‌کند. یک مشاهده منفرد از شکل یا دانسیته این موجودیت‌ها را با اطمینان جدا نمی‌کند.', ddItems: ['کارسینوم معده: منشأ دیواره، وسعت و ارتباط با مخاط را با اندوسکوپی و یافته‌های بالینی تطبیق دهید.', 'لنفوم: توزیع و سایر یافته‌های غدد لنفاوی یا اندام‌ها را در زمینه کلی ارزیابی کنید.', 'لیپوم: وجود دانسیته واقعی چربی را در زمینه مناسب CT بررسی کنید؛ «کم‌دانسیته» به‌تنهایی به معنی چربی نیست.'],
    caveTitle: 'محدودیت این مجموعه تصاویر', cave: 'سه برش CT در PDF با فاز تزریق، تاریخ بررسی یا شماره مورد برچسب‌گذاری نشده‌اند. شرح اسلاید توده‌ای لوبوله با منشأ معده و بخش‌های کم‌دانسیته، بدون ادم چربی اطراف را توصیف می‌کند. در این درس از این جزئیات تشخیص قطعی، تعیین فاز یا مرحله نتیجه‌گیری نمی‌شود.',
    refTitle: 'منابع و محدوده', ref: 'منبع اصلی: Abdomen.pdf، صفحات فیزیکی ۶۷–۶۸ (صفحات چاپی ۶۶–۶۷)؛ به‌صورت تصویری بررسی شد. سه برش CT از اسلاید مورد در صفحه فیزیکی ۶۸ هستند. PDF ارائه‌شده نام مشارکت‌کننده تصاویر یا شناسه مورد را ندارد؛ استفاده دوباره از تصاویر PDF توسط کاربر مجاز اعلام شده است. زمینه بالینی تکمیلی: Serrano C, et al. 2023 GEIS Guidelines for gastrointestinal stromal tumors. Therapeutic Advances in Medical Oncology. DOI: 10.1177/17588359231192388.',
    excludedTitle: 'مواردی که عمداً وارد نشدند', excluded: 'PDF شامل مطالب تاریخی درباره TNM، PET، درمان و معیار Choi است. این مطالب در این درس محدود به‌عنوان معیارهای جاری تکرار نشده‌اند. تمرکز بر مورفولوژی CT و افتراق محتاطانه است.',
    takeHome: ['منشأ معده، جهت رشد و ساختار داخلی را توصیف کنید.', 'بخش‌های ناهمگن یا کم‌دانسیته سرنخ‌های مورفولوژیک‌اند، نه تشخیص اختصاصی.', 'برای هیچ‌یک از سه نمای بدون برچسب، فاز تزریق تعیین نکنید.', 'CT می‌تواند GIST را مطرح کند؛ طبقه‌بندی قطعی به زمینه بالینی و در صورت لزوم آسیب‌شناسی وابسته است.'],
  },
}

export default function GistLessonPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  const check={question:gistAssessment.question,options:gistAssessment.options,answer:1,explanation:gistAssessment.explanation}
  const images = [
    ['/educational/gist/pdf-p68-axial-1.png', c.labels[0], c.alts[0]],
    ['/educational/gist/pdf-p68-axial-2.png', c.labels[1], c.alts[1]],
    ['/educational/gist/pdf-p68-coronal.png', c.labels[2], c.alts[2]],
  ]
  return <LessonReferenceShell lang={lang} lessonId="abdomen-gist" title={c.title} diagram="gist" goals={c.goals} check={check} lessonCopy={{ contentTitle: c.contentTitle }} summary={c.takeHome} quizHref="/ueben/quiz?fach=abdomen&n=10&themen=gist" flashcardsHref="/flashcards/gist?topic=gist">
    <div className={styles.lesson}>
      <p className={styles.lead}>{c.lead}</p>
      <section className={styles.section}><h3>{c.patternTitle}</h3><ul>{c.bullets.map(x => <li key={x}>{x}</li>)}</ul></section>
      <section className={styles.section}><h3>{c.figureTitle}</h3><p>{c.figureNote}</p><div className={styles.imageGrid}>{images.map(([src, label, alt]) => <figure key={src}><img src={src} alt={alt} /><figcaption>{label}</figcaption></figure>)}</div><p className={styles.credit}>{c.ref}</p></section>
      <section className={styles.section}><h3>{c.ddTitle}</h3><p>{c.ddIntro}</p><ul>{c.ddItems.map(x => <li key={x}>{x}</li>)}</ul></section>
      <aside className={styles.cave}><h3>{c.caveTitle}</h3><p>{c.cave}</p></aside>
      <section className={styles.section}><h3>{c.refTitle}</h3><p>{c.ref}</p><p><strong>{c.excludedTitle}:</strong> {c.excluded}</p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10467260/" target="_blank" rel="noreferrer">GEIS 2023 guideline (full text)</a></section>
    </div>
  </LessonReferenceShell>
}
