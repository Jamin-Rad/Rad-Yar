'use client'
import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import { abdomenThoraxAssessmentDrafts } from '@/data/abdomenThoraxAssessmentDrafts'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })

const C={
 de:{title:'Pankreasgangadenokarzinom',sub:'Masse, Gangzeichen und Gefäßkontakt systematisch erfassen.',lead:'Das duktale Adenokarzinom ist der häufigste solide maligne Pankreastumor. Kleine Tumoren können schwer abgrenzbar sein; deshalb sind Protokollqualität, sekundäre Gangzeichen und multiplanare Gefäßbeurteilung zentral.',cards:[['CT-Muster','Oft hypoenhancierende, unscharf begrenzte Läsion im Vergleich zum Pankreasparenchym. Manche Tumoren sind annähernd isoattenuierend; fehlende deutliche Masse schließt PDAC nicht aus.'],['Sekundäre Zeichen','Abrupter Gangabbruch, prästenotische Dilatation des Pankreasgangs und/oder des Choledochus, Atrophie des distalen Pankreas und biliäre Obstruktion. Das Double-Duct-Zeichen lokalisiert einen Prozess, ist aber nicht spezifisch für PDAC.'],['Gefäßkontakt','Arterien und Venen getrennt beschreiben: Gefäß, Kontaktwinkel und -länge, Kontur, Stenose/Verschluss, Thrombus und Kollateralen. Für die venöse Rekonstruktionsplanung zusätzlich Lage/Länge der Engstelle und offene Anschlusssegmente proximal und distal angeben. Diese Angaben allein entscheiden die Resektabilität nicht.'],['MRT/MRCP','PDAC ist häufig T1-hypointens und zeigt gegenüber dem normalen Pankreas eine verzögerte oder geringere Anreicherung. T2-Signal ist variabel; MRCP kann Gangabbruch und prästenotische Dilatation zeigen.']],reportTitle:'Strukturierter Bericht',report:['Pankreasprotokoll und Phasen benennen; Voraufnahmen vergleichen','Lokalisation, Größe und Begrenzung der Läsion','Pankreas- und Gallengang: Kaliber, Abbruch, prästenotische Dilatation und Parenchymatrophie','Arterien und Venen einzeln auflisten; Kontaktwinkel und Kontur dokumentieren','Leber, Peritoneum, Lymphknoten und übrige Fernmetastasen prüfen','Unklare oder isoattenuierende Läsionen ausdrücklich kennzeichnen'],cave:'PDF S. 35 nennt ältere TNM-Kriterien. Diese Seite verwendet sie nicht als aktuelle Stadieneinteilung. Eine finale Resektabilitäts- oder Therapieentscheidung erfordert aktuelle Leitlinien und multidisziplinäre Beurteilung.',source:'Abdeckung: Abdomen.pdf, Seiten 35–37. Die strukturierte Gefäßbeurteilung orientiert sich am SAR/APA radiology reporting consensus.',url:'https://pubs.rsna.org/doi/10.1148/radiol.13131184'},
 en:{title:'Pancreatic ductal adenocarcinoma',sub:'Systematically assess the mass, ductal signs and vessel contact.',lead:'Ductal adenocarcinoma is the most common solid malignant pancreatic tumour. Small tumours can be difficult to delineate, making protocol quality, secondary ductal signs and multiplanar vascular assessment essential.',cards:[['CT pattern','Often a hypoenhancing, ill-defined lesion relative to pancreatic parenchyma. Some tumours are nearly isoattenuating; absence of a conspicuous mass does not exclude PDAC.'],['Secondary signs','Abrupt duct cut-off, upstream pancreatic duct and/or common bile duct dilatation, distal pancreatic atrophy and biliary obstruction. The double-duct sign localises a process but is not specific for PDAC.'],['Vessel contact','Describe arteries and veins separately: vessel, contact angle and length, contour, narrowing/occlusion, thrombus and collaterals. For venous reconstruction planning, also state the location/length of narrowing and patent adjacent segments above and below it. These findings alone do not determine resectability.'],['MRI/MRCP','PDAC is often T1 hypointense and enhances later or less than normal pancreatic parenchyma. T2 signal is variable; MRCP may show duct cut-off and upstream dilatation.']],reportTitle:'Structured report',report:['Name the pancreas protocol and phases; compare priors','Lesion location, size and margins','Pancreatic and bile ducts: calibre, cut-off, upstream dilatation and parenchymal atrophy','List arteries and veins separately; document contact angle and contour','Assess liver, peritoneum, nodes and other distant sites','Explicitly flag indeterminate or isoattenuating lesions'],cave:'PDF p. 35 contains older TNM criteria. They are not presented here as current staging. Final resectability or treatment decisions require current guidance and multidisciplinary review.',source:'Coverage: Abdomen.pdf, pp. 35–37. The structured vascular assessment follows the SAR/APA radiology reporting consensus.',url:'https://pubs.rsna.org/doi/10.1148/radiol.13131184'},
 fa:{title:'آدنوکارسینوم مجرایی پانکراس',sub:'توده، نشانه‌های مجاری و تماس عروقی را نظام‌مند ارزیابی کنید.',lead:'آدنوکارسینوم مجرایی شایع‌ترین تومور بدخیم جامد پانکراس است. توده‌های کوچک ممکن است به‌سختی مشخص شوند؛ بنابراین کیفیت پروتکل، نشانه‌های ثانویه مجاری و ارزیابی عروقی چندصفحه‌ای اهمیت دارند.',cards:[['الگوی CT','اغلب ضایعه‌ای با تقویت کمتر و حاشیه نامشخص نسبت به پارانشیم پانکراس است. برخی تومورها تقریباً هم‌دانسیته‌اند؛ نبود توده واضح PDAC را رد نمی‌کند.'],['نشانه‌های ثانویه','قطع ناگهانی مجرا، گشادشدگی بالادست مجرای پانکراس و/یا کلدوک، آتروفی پانکراس دیستال و انسداد صفراوی. علامت دو مجرا محل فرایند را نشان می‌دهد اما اختصاصی PDAC نیست.'],['تماس عروقی','شریان‌ها و وریدها را جداگانه توصیف کنید: رگ، زاویه و طول تماس، جدار، تنگی/انسداد، ترومبوز و کولترال‌ها. برای برنامه‌ریزی بازسازی وریدی، محل/طول تنگی و قطعات باز مجاور در پروگزیمال و دیستال نیز ذکر شوند. این یافته‌ها به‌تنهایی قابلیت برداشت را تعیین نمی‌کنند.'],['MRI/MRCP','PDAC اغلب در T1 کم‌سیگنال است و نسبت به پارانشیم طبیعی پانکراس دیرتر یا کمتر تقویت می‌شود. سیگنال T2 متغیر است؛ MRCP می‌تواند قطع مجرا و گشادشدگی بالادست را نشان دهد.']],reportTitle:'گزارش ساختاریافته',report:['پروتکل پانکراس و فازها را ذکر و با تصاویر قبلی مقایسه کنید','محل، اندازه و حاشیه ضایعه','مجرای پانکراس و صفرا: قطر، قطع‌شدگی، گشادشدگی بالادست و آتروفی پارانشیم','شریان‌ها و وریدها را جداگانه فهرست کنید؛ زاویه تماس و جدار را ثبت کنید','کبد، صفاق، گره‌ها و دیگر محل‌های متاستاز دوردست را بررسی کنید','ضایعات نامعین یا هم‌دانسیته را صریحاً مشخص کنید'],cave:'صفحه ۳۵ PDF معیارهای TNM قدیمی دارد. این درس آن‌ها را به‌عنوان مرحله‌بندی جاری ارائه نمی‌کند. تصمیم نهایی قابلیت برداشت یا درمان به راهنمای جاری و ارزیابی چندتخصصی نیاز دارد.',source:'پوشش: Abdomen.pdf صفحات ۳۵ تا ۳۷. ارزیابی ساختاریافته عروق بر اساس اجماع گزارش‌دهی رادیولوژی SAR/APA است.',url:'https://pubs.rsna.org/doi/10.1148/radiol.13131184'}
}
const CASE_COPY = {
  de: { title: 'Fortgeschrittenes Fallbeispiel', text: 'Zwei axiale kontrastverstärkte CT-Bilder aus einem fortgeschrittenen, im PDF wiedergegebenen Fall. Die Untersuchungsphasen sind in der Vorlage nicht gekennzeichnet. Die Läsion im Bereich der Porta hepatis zeigt geringe Kontrastmittelaufnahme sowie lokale Infiltration und Gefäßummantelung. Dieses Beispiel steht für lokale Ausbreitung, nicht für das typische frühe Erscheinungsbild.', link: 'Radiopaedia-Fall rID 86457 · Mohammad Taghi Niknejad' },
  en: { title: 'Advanced case example', text: 'Two axial contrast-enhanced CT images from an advanced case reproduced in the PDF. Acquisition phases are not labelled in the source. The lesion near the porta hepatis shows low enhancement with local invasion and vascular encasement. This illustrates local extension, not the typical early appearance.', link: 'Radiopaedia case rID 86457 · Mohammad Taghi Niknejad' },
  fa: { title: 'نمونهٔ پیشرفته', text: 'دو تصویر محوری CT با تزریق از یک مورد پیشرفته که در PDF بازنشر شده است. فازهای تصویربرداری در منبع برچسب‌گذاری نشده‌اند. ضایعه در نزدیکی Porta hepatis تقویت کمی دارد و با تهاجم موضعی و دربرگیری عروق همراه است. این نمونه گسترش موضعی را نشان می‌دهد، نه نمای تیپیک مراحل اولیه را.', link: 'مورد Radiopaedia با شناسهٔ rID 86457 · Mohammad Taghi Niknejad' },
}

const SUMMARY = {
  de: ['Eine isoattenuierende Läsion schließt PDAC nicht aus; indirekte Gang- und Parenchymzeichen suchen.', 'Das Double-Duct-Zeichen lokalisiert einen Prozess, ist aber nicht spezifisch.', 'Gefäße einzeln und strukturiert beschreiben; Kontaktwinkel allein entscheidet die Resektabilität nicht.'],
  en: ['An isoattenuating lesion does not exclude PDAC; look for indirect ductal and parenchymal signs.', 'The double-duct sign localises a process but is not specific.', 'Describe vessels individually and systematically; contact angle alone does not determine resectability.'],
  fa: ['ضایعهٔ هم‌دانسیته PDAC را رد نمی‌کند؛ به نشانه‌های غیرمستقیم مجرا و پارانشیم توجه کنید.', 'علامت دو مجرا فرایندی را موضع‌یابی می‌کند، اما اختصاصی نیست.', 'عروق را جداگانه و ساختاریافته توصیف کنید؛ زاویهٔ تماس به‌تنهایی قابلیت برداشت را تعیین نمی‌کند.'],
}

export default function PancreaticAdenocarcinomaPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  const caseCopy = CASE_COPY[lang] || CASE_COPY.de
  const checkDraft = abdomenThoraxAssessmentDrafts['abdomen-pdac-isoattenuating']
  const check = {
    ...checkDraft,
    explanation: checkDraft.rationale,
    diagramCaption: L('Schematische Lernhilfe zum Gefäßkontakt; keine Patientendarstellung.', 'Teaching schematic for vessel contact; not a patient image.', 'شماتیک آموزشی تماس عروقی؛ تصویر بیمار نیست.'),
  }
  const quizHref = `/ueben/quiz?fach=abdomen&n=3&themen=pdac&from=${encodeURIComponent('/abdomen/pankreas/pankreaskarzinom')}`
  const flashcardsHref = `/flashcards/pdac?from=${encodeURIComponent('/abdomen/pankreas/pankreaskarzinom')}`

  return <LessonReferenceShell
    lessonId="pdac"
    lang={lang}
    title={c.title}
    diagram="pdac"
    goals={[{"de":"Bei möglichem isoattenuierendem PDAC sekundäre Gang-/Parenchymzeichen erkennen und unterstützende MRT-/MRCP-Zeichen benennen.","en":"Recognise secondary ductal/parenchymal signs of possible isoattenuating PDAC and name supportive MRI/MRCP findings.","fa":"نشانه‌های ثانویهٔ مجرا/پارانشیم در PDAC احتمالی هم‌دانسیته را بشناسید و یافته‌های حمایتی MRI/MRCP را نام ببرید."},{"de":"Das Double-Duct-Muster distal lokalisieren und neoplastische von benignen Ursachen als offene Differenzialdiagnose trennen.","en":"Localise the double-duct pattern distally and retain both neoplastic and benign causes in the differential.","fa":"الگوی دو مجرا را در ناحیهٔ دیستال موضع‌یابی کنید و علل نئوپلاستیک و خوش‌خیم را در تشخیص افتراقی باز نگه دارید."},{"de":"Für die Gefäßplanung Kontakt, Kontur und venöse Anschlusssegmente strukturiert dokumentieren, ohne allein daraus die Resektabilität festzulegen.","en":"Document contact, contour and adjacent venous segments for vascular planning without determining resectability from these alone.","fa":"تماس، جدار و قطعات وریدی مجاور را برای برنامه‌ریزی عروقی ساختاریافته ثبت کنید، بدون آنکه تنها بر همان اساس قابلیت برداشت تعیین شود."}]}
    check={check}
    summary={SUMMARY[lang] || SUMMARY.de}
    copy={{ ...c, contentTitle: L('Bildmuster und strukturierte Beurteilung', 'Imaging patterns and structured assessment', 'الگوهای تصویربرداری و ارزیابی ساختاریافته') }}
    quizHref={quizHref}
    flashcardsHref={flashcardsHref}
  >
    <div className={styles.content}>
      <section className={styles.section}>
        <p className={styles.lead}>{c.lead}</p>
        <div className={styles.grid}>{c.cards.map(([title, text]) => <article className={styles.card} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className={styles.section}>
        <h2>{caseCopy.title}</h2>
        <figure className={styles.case}>
          <img src="/educational/pdac/source-ct-p36.jpg" width="1065" height="480" alt={L('Zwei axiale kontrastverstärkte CT-Aufnahmen eines fortgeschrittenen Pankreastumors.', 'Two axial contrast-enhanced CT images of an advanced pancreatic tumour.', 'دو تصویر محوری CT با تزریق از تومور پیشرفتهٔ پانکراس.')[lang]} />
          <figcaption>{caseCopy.text}<br /><a href="https://doi.org/10.53347/rID-86457" target="_blank" rel="noopener noreferrer">{caseCopy.link} ↗</a></figcaption>
        </figure>
      </section>
      <section className={styles.section}>
        <h2>{L('MRT-Muster im Vergleich', 'MRI patterns side by side', 'مقایسهٔ الگوهای MRI')[lang]}</h2>
        <figure className={styles.case}>
          <img src="/educational/pdac/source-mri-p37.jpg" width="1240" height="815" alt={L('Sechs beschriftete MRT-Aufnahmen in den Sequenzen T1w, T2w und T1 C+ in axialer und koronarer Ebene.', 'Six labelled MRI panels showing T1w, T2w and post-contrast T1 in axial and coronal planes.', 'شش پنل MRI با برچسب‌های T1w، T2w و T1 پس از تزریق در نماهای محوری و کرونال.')[lang]} />
          <figcaption>{L('Die Bildbeschriftungen folgen der PDF-Vorlage. Im dargestellten Fall wird eine unregelmäßige, unscharf begrenzte Raumforderung mit nekrotischem, nicht anreicherndem Zentrum beschrieben (Radiopaedia rID 22896).', 'Sequence labels follow the PDF source. The source describes an irregular, ill-defined mass with a necrotic, non-enhancing centre (Radiopaedia case rID 22896).', 'برچسب توالی‌ها مطابق PDF است. منبع، توده‌ای نامنظم و با حاشیهٔ نامشخص با مرکز نکروتیکِ بدون تقویت را توصیف می‌کند (مورد Radiopaedia با شناسهٔ rID 22896).')[lang]}<br /><small>{L('Quelle: Abdomen.pdf, S. 37 (druckseitig S. 36).', 'Source: Abdomen.pdf, p. 37 (printed p. 36).', 'منبع: Abdomen.pdf، صفحهٔ PDF ۳۷ (صفحهٔ چاپی ۳۶).')[lang]}</small></figcaption>
        </figure>
      </section>
      <section className={styles.section}>
        <h2>{c.reportTitle}</h2>
        <ol className={styles.report}>{c.report.map(item => <li key={item}>{item}</li>)}</ol>
        <p className={styles.notice}>{c.cave}</p>
        <small>{c.source}</small>
        <div className={styles.sources}><a href={c.url} target="_blank" rel="noopener noreferrer">SAR/APA reporting consensus ↗</a></div>
      </section>
    </div>
  </LessonReferenceShell>
}
