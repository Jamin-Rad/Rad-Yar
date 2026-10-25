'use client'

import LegacyLessonMigration from '@/components/lesson-template/LegacyLessonMigration'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from '../../gi/divertikulitis/page.module.css'
import InProgressBanner from '@/components/InProgressBanner'

const C={
  "de": {
    "title": "Pankreatische neuroendokrine Tumoren",
    "sub": "Arterielle Hypervaskularität erkennen und wichtige Mimics prüfen.",
    "lead": "Pankreatische neuroendokrine Neoplasien entstehen aus den endokrinen Zellen. Ein funktionelles Syndrom wird klinisch und biochemisch definiert; die Bildgebung allein bestimmt diesen Status nicht. Die hier gezeigten Beispiele betreffen vor allem hypervaskuläre Läsionen.",
    "cards": [
      [
        "Multiphasische CT",
        "Viele PanNETs zeigen eine deutliche arterielle Hyperanreicherung gegenüber dem Pankreas. Das Muster ist nicht obligat: Tumorgröße, Differenzierung und Nekrose verändern das Erscheinungsbild."
      ],
      [
        "MRT",
        "T1 meist hypointens, T2 häufig hyperintens; die arterielle Kontrastmittelaufnahme kann ausgeprägt sein. DWI, MRCP und Leber-MRT können zur ergänzenden Charakterisierung dienen."
      ],
      [
        "Metastasen und Gefäße",
        "Lebermetastasen können ebenfalls hypervaskulär sein. Leber-MRT ist hilfreich für Zahl und Verteilung; Gefäßkontakt, Pankreasgangbeziehung, Lymphknoten und Leberbefund systematisch erfassen."
      ],
      [
        "Wichtige Mimics",
        "Ein intrapankreatischer Splenulus kann dieselbe Enhancement- und Dichtecharakteristik wie Milzgewebe zeigen. Auf Übereinstimmung mit der Milz in allen Phasen achten; bei Zweifel gezielte Bestätigung statt vorschneller Tumordiagnose."
      ]
    ],
    "reportTitle": "Strukturierter Bericht",
    "report": [
      "Lokalisation, Größe, Zahl und Enhancementphasen",
      "Kontakt zu Hauptgang, Gefäßen und Nachbarorganen",
      "Nekrose, Verkalkung, Lymphknoten und Leberläsionen",
      "Funktioneller Status aus Klinik/Labor nicht aus Bildgebung ableiten",
      "Milzgewebe-Mimic im Pankreasschwanz berücksichtigen"
    ],
    "cave": "Insulinome und nichtfunktionelle PanNET sind unterschiedliche klinisch-biologische Gruppen. Angaben zur Benignität von Insulinomen sind keine allgemeine Risikoregel für kleine nichtfunktionelle PanNET. Grad, Wachstum, Bildbefund und Patientenkontext gehören zur individuellen Einordnung.",
    "source": "Abdeckung: Abdomen.pdf, Seiten 38–39. Primärleitlinie: ENETS 2023 guidance für nichtfunktionelle PanNET; chirurgischer Bildgebungs-Konsens: NANETS 2020.",
    "url": "https://doi.org/10.1111/jne.13343",
    "url2": "https://doi.org/10.1097/MPA.0000000000001454"
  },
  "en": {
    "title": "Pancreatic neuroendocrine tumours",
    "sub": "Recognise arterial hyperenhancement and check important mimics.",
    "lead": "Pancreatic neuroendocrine neoplasms arise from endocrine cells. A functioning syndrome is defined clinically and biochemically; imaging alone does not establish this status. The examples here mainly concern hypervascular lesions.",
    "cards": [
      [
        "Multiphasic CT",
        "Many PanNETs show marked arterial hyperenhancement relative to the pancreas. This is not obligatory: tumour size, differentiation and necrosis affect appearance."
      ],
      [
        "MRI",
        "Usually T1 hypointense and often T2 hyperintense, with potentially avid arterial enhancement. DWI, MRCP and liver MRI can add characterisation."
      ],
      [
        "Metastases and vessels",
        "Liver metastases may also be hypervascular. Liver MRI helps assess number and distribution; systematically document vascular contact, pancreatic duct relationship, nodes and liver findings."
      ],
      [
        "Important mimics",
        "An intrapancreatic accessory spleen can match splenic tissue in attenuation and enhancement. Compare with the spleen across phases; when uncertain, seek targeted confirmation rather than prematurely labelling a tumour."
      ]
    ],
    "reportTitle": "Structured report",
    "report": [
      "Location, size, number and enhancement phases",
      "Relationship to main duct, vessels and adjacent organs",
      "Necrosis, calcification, nodes and liver lesions",
      "Do not infer functional status from imaging; use clinical/laboratory data",
      "Consider splenic tissue as a pancreatic-tail mimic"
    ],
    "cave": "Insulinomas and nonfunctioning PanNETs are different clinical/biological groups. Insulinoma benignity data are not a general risk rule for small nonfunctioning PanNETs. Grade, growth, imaging and patient context inform individual assessment.",
    "source": "Coverage: Abdomen.pdf, pp. 38–39. Primary guidance: 2023 ENETS guidance for non-functioning PanNET; surgical imaging consensus: 2020 NANETS.",
    "url": "https://doi.org/10.1111/jne.13343",
    "url2": "https://doi.org/10.1097/MPA.0000000000001454"
  },
  "fa": {
    "title": "تومورهای نورواندوکرین پانکراس",
    "sub": "تقویت شریانی را بشناسید و افتراق‌های مهم را بررسی کنید.",
    "lead": "نئوپلاسم‌های نورواندوکرین پانکراس از سلول‌های اندوکرین منشأ می‌گیرند. سندرم فانکشنال بر پایهٔ یافته‌های بالینی و بیوشیمیایی تعریف می‌شود؛ تصویربرداری به‌تنهایی این وضعیت را تعیین نمی‌کند. مثال‌های این درس عمدتاً ضایعات پرعروق را نشان می‌دهند.",
    "cards": [
      [
        "CT چندفازی",
        "بسیاری از PanNETها نسبت به پانکراس تقویت شریانی واضح دارند. این ویژگی همیشگی نیست؛ اندازه، تمایز و نکروز تومور ظاهر را تغییر می‌دهند."
      ],
      [
        "MRI",
        "معمولاً T1 کم‌سیگنال و اغلب T2 پرسیگنال‌اند و ممکن است تقویت شریانی واضح داشته باشند. DWI، MRCP و MRI کبد می‌توانند به ارزیابی تکمیلی کمک کنند."
      ],
      [
        "متاستازها و عروق",
        "متاستازهای کبدی نیز ممکن است پرعروق باشند. MRI کبد برای ارزیابی تعداد و توزیع مفید است؛ تماس عروقی، ارتباط با مجرای پانکراس، گره‌ها و یافته‌های کبد را نظام‌مند ثبت کنید."
      ],
      [
        "افتراق مهم",
        "بافت طحال فرعی داخل پانکراس می‌تواند دانسیته و الگوی تقویت مشابه طحال داشته باشد. در همه فازها با طحال مقایسه کنید؛ در صورت تردید، تأیید هدفمند را به تشخیص شتاب‌زده تومور ترجیح دهید."
      ]
    ],
    "reportTitle": "گزارش ساختاریافته",
    "report": [
      "محل، اندازه، تعداد و فازهای تقویت",
      "ارتباط با مجرای اصلی، عروق و اندام‌های مجاور",
      "نکروز، کلسیفیکاسیون، گره‌ها و ضایعات کبدی",
      "وضعیت فانکشنال را از تصویر استنباط نکنید؛ داده بالینی/آزمایشگاهی لازم است",
      "بافت طحال را به‌عنوان افتراق توده دم پانکراس در نظر بگیرید"
    ],
    "cave": "انسولینوما و PanNET غیرفانکشنال، گروه‌های بالینی و زیستی متفاوت‌اند. داده‌های خوش‌خیمی انسولینوما، قاعدهٔ عمومی خطر برای PanNET کوچک غیرفانکشنال نیستند. گرید، رشد، تصویربرداری و زمینهٔ بیمار در ارزیابی فردی لحاظ می‌شوند.",
    "source": "پوشش: Abdomen.pdf صفحات ۳۸ تا ۳۹. راهنمای اولیه: ENETS 2023 برای PanNET غیرفانکشنال؛ اجماع تصویربرداری جراحی: NANETS 2020.",
    "url": "https://doi.org/10.1111/jne.13343",
    "url2": "https://doi.org/10.1097/MPA.0000000000001454"
  }
}
const ACTIONS={de:{quiz:'Fragen üben',cards:'Karteikarten'},en:{quiz:'Practise questions',cards:'Flashcards'},fa:{quiz:'تمرین پرسش‌ها',cards:'فلش‌کارت‌ها'}}
export default function PancreaticNETPage(){const{lang}=useLanguage();const c=C[lang]||C.de;const action=ACTIONS[lang]||ACTIONS.de;const rtl=lang==='fa';return <LegacyLessonMigration className={styles.page} dir={rtl?'rtl':'ltr'} lang={lang} lessonRoute="/abdomen/pankreas/neuroendokrine-tumoren" lessonId="/abdomen/pankreas/neuroendokrine-tumoren" summaryFallback={c.report.slice(0,5).map(item=>({title:item,detail:item}))}><InProgressBanner lang={lang}/><header className={styles.header}><div className={styles.breadcrumb}><Link href="/">RadYar</Link><span>›</span><Link href="/lernen/abdomen">Abdomen</Link><span>›</span><span>{c.title}</span></div><div className={styles.hero}><div className={styles.heroText}><h1>{c.title}</h1><p>{c.sub}</p></div></div></header><div className={styles.actions}><Link className={styles.actionBtn} href={`/ueben/quiz?fach=abdomen&n=4&themen=pnet&lang=${lang}`}>{action.quiz}</Link><Link className={styles.actionBtn} href={`/flashcards/pnet?lang=${lang}`}>{action.cards}</Link></div><div className={styles.main} style={{maxWidth:1080,margin:'2rem auto',padding:'0 1rem'}}><section className={styles.section}><p className={styles.lead}>{c.lead}</p><div className={styles.cardsGrid}>{c.cards.map(([title,text])=><article className={styles.infoCard} key={title}><h2>{title}</h2><p>{text}</p></article>)}</div></section><section className={styles.section}><h2>{c.reportTitle}</h2><ol>{c.report.map(x=><li key={x}>{x}</li>)}</ol><div className={styles.callout}><strong>⚠</strong><p>{c.cave}</p></div><small>{c.source}</small><p><a href={c.url} target="_blank" rel="noreferrer">ENETS 2023 guidance ↗</a></p><p><a href={c.url2} target="_blank" rel="noreferrer">NANETS consensus ↗</a></p></section></div></LegacyLessonMigration>}
