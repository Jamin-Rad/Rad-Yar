'use client'

import LessonReferenceShell from '@/components/LessonReferenceShell'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'
import { LIRADS_NEXT, LIRADS_QUESTIONS } from '@/data/abdomenHccPlanning'

const C = {
  "de": {
    "title": "LI-RADS CT/MRT: erst Zielgruppe, dann Kategorie",
    "goals": [
      "LI-RADS-Zielgruppe und technische Eignung vor der Kategorie prüfen.",
      "Die LR-5-Regel bei 10–19 mm mit den v2018-Major-Features korrekt anwenden.",
      "Grenzen von Ancillary Features und der HCC-Spezifität von LR-TIV benennen.",
      "Bei LR-4 Bildkontrolle und Biopsie anhand der konkreten klinischen Entscheidung abwägen."
    ],
    "intro": "LI-RADS standardisiert die Befundung unbehandelter Leberbeobachtungen in einer definierten HCC-Risikogruppe. Die Kategorie ist kein allgemeines Leberläsionssystem: zuerst Zielgruppe und Untersuchungsqualität prüfen, dann die diagnostischen Schritte durchlaufen.",
    "flowTitle": "Der sichere Weg zur Kategorie",
    "flowLabels": [
      "Zielgruppe & Untersuchung",
      "Sonderkategorien zuerst",
      "Major Features & Größe",
      "Kategorie + Plausibilitätscheck"
    ],
    "flowCaption": "Schematische Reihenfolge für die CT/MRT-Diagnostik; keine vollständige LI-RADS-Tabelle.",
    "eligibleTitle": "Für wen gilt diese CT/MRT-Diagnostik?",
    "eligible": "ACR v2018: Erwachsene mit Zirrhose, chronischer Hepatitis B oder aktuellem/früherem HCC. Nicht anwenden unter 18 Jahren, ohne diese Risikofaktoren, bei kongenitaler hepatischer Fibrose oder Zirrhose durch vaskuläre Erkrankungen. Erforderlich ist eine Mehrphasen-CT oder -MRT mit geeignetem Kontrastmittel. Pathologisch gesicherte Malignome und benigne Läsionen nicht-hepatozellulären Ursprungs (z. B. Hämangiome) erhalten keine LI-RADS-Kategorie; die Pathologiediagnose wird berichtet. Bei pathologisch gesicherten benignen hepatozellulären Läsionen (z. B. regenerativen oder dysplastischen Knoten) wird die LI-RADS-Kategorie zusätzlich zur Pathologiediagnose angegeben.",
    "classifyTitle": "Vor der Merkmaltabelle: drei Abzweigungen",
    "categories": [
      [
        "LR-NC",
        "Wegen fehlender oder degradierter Bildinformation nicht sinnvoll kategorisierbar."
      ],
      [
        "LR-TIV",
        "Eindeutiger Tumor in einer Vene; mögliche Ursache angeben, wenn beurteilbar."
      ],
      [
        "LR-M",
        "Wahrscheinlich oder sicher maligne, aber nicht HCC-spezifisch (z. B. targetoid)."
      ],
      [
        "LR-1 / LR-2",
        "Sicher bzw. wahrscheinlich benigne."
      ],
      [
        "LR-3 / LR-4 / LR-5",
        "Mittlere Malignitätswahrscheinlichkeit / wahrscheinlich HCC / sicher HCC innerhalb der Zielgruppe."
      ]
    ],
    "majorTitle": "Welche Hauptmerkmale fließen ein?",
    "majorFeatures": [
      [
        "Nicht-randständiges APHE",
        "Arterielle Hyperanreicherung, die nicht nur randständig ist."
      ],
      [
        "Nicht-peripheres Wash-out",
        "Relative zeitliche Abnahme bis zur Hypoanreicherung: mit extrazellulärem Kontrastmittel portalvenös oder spät, mit Gadoxetat nur portalvenös. Transitional-/hepatobiliäre Hypointensität ersetzt Wash-out nicht."
      ],
      [
        "Enhancing capsule",
        "Anreichernde kapselartige Begrenzung."
      ],
      [
        "Größe",
        "Größenklasse der Beobachtung; an der Phase mit bester Begrenzbarkeit messen, möglichst nicht arteriell."
      ],
      [
        "Threshold growth",
        "Durchmesserzunahme ≥50 % innerhalb von höchstens 6 Monaten (v2018-Definition)."
      ]
    ],
    "lr5Title": "LR-5: die kompakte Entscheidungsregel",
    "lr5": [
      "Für eine Beobachtung von 10–19 mm: nicht-randständiges APHE plus nicht-peripheres Wash-out reicht für LR-5. APHE plus Threshold Growth erreicht ebenfalls LR-5. Eine Kapsel allein statt Wash-out/Threshold Growth reicht in dieser Größenklasse nicht.",
      "Ab 20 mm: nicht-randständiges APHE plus mindestens ein weiteres Major Feature (Wash-out, Kapsel oder Threshold Growth) erfüllt LR-5.",
      "Ohne nicht-randständiges APHE oder unter 10 mm wird LR-5 nicht über die diagnostische Tabelle erreicht. Bei Unsicherheit ein Major Feature als nicht vorhanden werten."
    ],
    "cautionTitle": "Ancillary Features sind keine Abkürzung",
    "caution": "Ancillary Features können die Kategorie nach ACR-Regeln höchstens bis LR-4 hochstufen; sie dürfen nicht zu LR-5 führen. Wenn Merkmale für Malignität und Benignität zugleich vorliegen, wird nicht angepasst. LR-5 bedeutet innerhalb der geeigneten Zielgruppe „sicher HCC“; das ist keine Aussage über Patienten außerhalb dieser Zielgruppe.",
    "reportTitle": "Was gehört in den Bericht?",
    "report": "Beobachtung einzeln lokalisieren und messen, relevante Major Features nennen und die Kategorie mit der verwendeten CT/MRT- und LI-RADS-Version angeben. Bei LR-M die wahrscheinliche Ätiologie nennen, falls möglich; bei LR-TIV betroffene Vene und wahrscheinlichen Ursprung beschreiben. Empfehlungen zu Verlauf, Biopsie oder Therapie hängen vom klinischen Kontext und multidisziplinärer Entscheidung ab.",
    "source": "Quellen: Abdomen.pdf, PDF-Seiten 20–23 (Druckseiten 19–22); ACR LI-RADS CT/MRI v2018 Core, Diagnostic Algorithm / Getting Started / Diagnostic Table / Ancillary Features. Die nächsten Schritte sind mit AASLD2023 ergänzt; die Therapieplanung ist separat verlinkt.",
    "checkQ": "Zirrhose, geeignete Mehrphasen-MRT mit extrazellulärem Kontrastmittel: zwei unbehandelte 15-mm-Beobachtungen, beide mit nonrim APHE, ohne LR-M-Merkmale oder Tumor in vein. X zeigt nicht-peripheres portalvenöses Wash-out; Y eine anreichernde Kapsel, aber kein Wash-out und kein Schwellenwachstum. Welche Kategorien gelten nach v2018?",
    "options": [
      "X: LR-5; Y: LR-5",
      "X: LR-5; Y: LR-4",
      "X: LR-4; Y: LR-5",
      "X: LR-4; Y: LR-4"
    ],
    "why": "Bei 10–19 mm erreicht nonrim APHE plus nicht-peripheres Wash-out LR-5. APHE plus anreichernde Kapsel allein bleibt in dieser Größenklasse LR-4; Schwellenwachstum wäre ebenfalls ein Weg zu LR-5.",
    "summary": [
      "Zielgruppe und Mehrphasenqualität zuerst prüfen.",
      "LR-M und LR-TIV vor der HCC-Merkmaltabelle erkennen.",
      "Major Features, Größe und Schwellenwachstum nach ACR v2018 kombinieren.",
      "Ancillary Features können LR-5 nicht erzeugen."
    ]
  },
  "en": {
    "title": "CT/MRI LI-RADS: population first, category next",
    "goals": [
      "Check LI-RADS population and technical eligibility before categorisation.",
      "Apply the v2018 LR-5 rule for 10–19 mm observations using major features.",
      "State the limits of ancillary features and the HCC specificity of LR-TIV.",
      "Weigh follow-up imaging against biopsy in LR-4 according to the clinical decision needed."
    ],
    "intro": "LI-RADS standardises reporting of untreated liver observations in a defined HCC-risk population. It is not a general liver-lesion system: check the target population and examination quality first, then follow the diagnostic steps.",
    "flowTitle": "A safe route to the category",
    "flowLabels": [
      "Population & examination",
      "Special categories first",
      "Major features & size",
      "Category + plausibility check"
    ],
    "flowCaption": "Schematic order for CT/MRI diagnosis; not the complete LI-RADS table.",
    "eligibleTitle": "Who is eligible for this CT/MRI diagnostic system?",
    "eligible": "ACR v2018: adults with cirrhosis, chronic hepatitis B, or current/prior HCC. Do not apply below age 18, without these risk factors, with congenital hepatic fibrosis, or with cirrhosis due to vascular disorders. A multiphase CT or MRI with an appropriate contrast agent is required. Do not assign a LI-RADS category to path-proven malignancies or benign lesions of non-hepatocellular origin (e.g., hemangiomas); report the pathology diagnosis. For path-proven benign hepatocellular lesions (e.g., regenerative or dysplastic nodules), report the LI-RADS category in addition to the pathology diagnosis.",
    "classifyTitle": "Before the feature table: three branches",
    "categories": [
      [
        "LR-NC",
        "Cannot be meaningfully categorised because images are omitted or degraded."
      ],
      [
        "LR-TIV",
        "Definite tumour in vein; state the likely aetiology if assessable."
      ],
      [
        "LR-M",
        "Probably or definitely malignant, but not HCC-specific (for example, targetoid)."
      ],
      [
        "LR-1 / LR-2",
        "Definitely / probably benign."
      ],
      [
        "LR-3 / LR-4 / LR-5",
        "Intermediate malignancy probability / probably HCC / definitely HCC within the target population."
      ]
    ],
    "majorTitle": "Which major features are assessed?",
    "majorFeatures": [
      [
        "Nonrim APHE",
        "Arterial phase hyperenhancement that is not confined to the rim."
      ],
      [
        "Nonperipheral washout",
        "Temporal relative reduction resulting in hypoenhancement: portal venous or delayed with extracellular agents, portal venous only with gadoxetate. Transitional/hepatobiliary hypointensity does not replace washout."
      ],
      [
        "Enhancing capsule",
        "An enhancing capsule-like border."
      ],
      [
        "Size",
        "Observation size class; measure in the phase where the margin is best defined, preferably not the arterial phase."
      ],
      [
        "Threshold growth",
        "At least 50% diameter increase within 6 months (v2018 definition)."
      ]
    ],
    "lr5Title": "LR-5: the concise decision rule",
    "lr5": [
      "For a 10–19 mm observation: nonrim APHE plus nonperipheral washout is sufficient for LR-5. APHE plus threshold growth also reaches LR-5. In this size class, capsule alone instead of washout/threshold growth is insufficient.",
      "At 20 mm or larger: nonrim APHE plus at least one other major feature (washout, capsule, or threshold growth) meets LR-5.",
      "Without nonrim APHE or below 10 mm, the diagnostic table does not yield LR-5. If uncertain, treat a major feature as absent."
    ],
    "cautionTitle": "Ancillary features are not a shortcut",
    "caution": "Under ACR rules, ancillary features may upgrade a category only as far as LR-4; they cannot produce LR-5. If features favouring malignancy and benignity are both present, do not adjust. LR-5 means “definitely HCC” within the eligible target population; it does not apply to patients outside that population.",
    "reportTitle": "What belongs in the report?",
    "report": "Localise and measure each observation, state relevant major features, and give the category together with the CT/MRI and LI-RADS version used. For LR-M, name the likely aetiology if possible; for LR-TIV, describe the involved vein and likely origin. Follow-up, biopsy, or treatment recommendations depend on clinical context and multidisciplinary discussion.",
    "source": "Sources: Abdomen.pdf, PDF pp.20–23 (printed pp.19–22); ACR LI-RADS CT/MRI v2018 Core, Diagnostic Algorithm / Getting Started / Diagnostic Table / Ancillary Features. Next-step guidance is supplemented by AASLD2023; treatment planning is linked separately.",
    "checkQ": "Cirrhosis and adequate multiphasic extracellular-agent MRI: two untreated 15-mm observations, both with nonrim APHE, no LR-M features or tumour in vein. X has nonperipheral portal venous washout; Y has an enhancing capsule but no washout or threshold growth. Which v2018 categories apply?",
    "options": [
      "X: LR-5; Y: LR-5",
      "X: LR-5; Y: LR-4",
      "X: LR-4; Y: LR-5",
      "X: LR-4; Y: LR-4"
    ],
    "why": "At 10–19 mm, nonrim APHE plus nonperipheral washout reaches LR-5. APHE plus an enhancing capsule alone remains LR-4 in this size group; threshold growth is another route to LR-5.",
    "summary": [
      "Check the target population and multiphase quality first.",
      "Recognise LR-M and LR-TIV before the HCC feature table.",
      "Combine major features, size and threshold growth under ACR v2018.",
      "Ancillary features cannot create LR-5."
    ]
  },
  "fa": {
    "title": "LI-RADS در CT/MRI: ابتدا گروه هدف، سپس رده",
    "goals": [
      "پیش از تعیین رده، گروه هدف و کفایت فنی LI-RADS را بررسی کنید.",
      "قاعدهٔ LR-5 در اندازهٔ ۱۰ تا ۱۹ میلی‌متر را با ویژگی‌های اصلی نسخهٔ ۲۰۱۸ درست به‌کار برید.",
      "محدودیت ویژگی‌های کمکی و اختصاصیت LR-TIV برای HCC را بیان کنید.",
      "در LR-4 پیگیری تصویربرداری و بیوپسی را بر پایهٔ تصمیم بالینی موردنیاز بسنجید."
    ],
    "intro": "LI-RADS گزارش ضایعات درمان‌نشده کبد را در گروه مشخصی از بیماران پرخطر HCC استاندارد می‌کند. این یک سیستم عمومی برای همه ضایعات کبدی نیست: ابتدا گروه هدف و کیفیت بررسی را بسنجید، سپس مراحل تشخیصی را اجرا کنید.",
    "flowTitle": "مسیر مطمئن برای رسیدن به رده",
    "flowLabels": [
      "گروه هدف و بررسی",
      "ابتدا رده‌های ویژه",
      "ویژگی‌های اصلی و اندازه",
      "رده و بازبینی منطقی بودن"
    ],
    "flowCaption": "ترتیب شماتیک برای تشخیص CT/MRI؛ جدول کامل LI-RADS نیست.",
    "eligibleTitle": "این سیستم تشخیصی CT/MRI برای چه کسانی است؟",
    "eligible": "طبق ACR v2018، این سیستم برای بزرگسالان مبتلا به سیروز، هپاتیت B مزمن یا HCC فعلی/قبلی به‌کار می‌رود؛ در افراد زیر ۱۸ سال، بدون این عوامل خطر، در فیبروز مادرزادی کبد یا سیروز ناشی از اختلالات عروقی به‌کار نمی‌رود. CT یا MRI چندفازی با ماده حاجب مناسب لازم است. برای بدخیمیِ اثبات‌شده با پاتولوژی یا ضایعهٔ خوش‌خیم با منشأ غیرهپاتوسلولار (مثل همانژیوم)، ردهٔ LI-RADS تعیین نکنید و تشخیص پاتولوژی را گزارش کنید. برای ضایعهٔ خوش‌خیم هپاتوسلولارِ اثبات‌شده با پاتولوژی (مثل ندول بازسازی‌شونده یا دیسپلاستیک)، ردهٔ LI-RADS را علاوه بر تشخیص پاتولوژی گزارش کنید.",
    "classifyTitle": "پیش از جدول ویژگی‌ها: سه مسیر جداگانه",
    "categories": [
      [
        "LR-NC",
        "به‌علت حذف یا افت کیفیت تصاویر، رده‌بندی معنادار ممکن نیست."
      ],
      [
        "LR-TIV",
        "وجود قطعی تومور در ورید؛ در صورت امکان منشأ محتمل را ذکر کنید."
      ],
      [
        "LR-M",
        "احتمالاً یا قطعاً بدخیم، اما اختصاصی HCC نیست (برای نمونه الگوی targetoid)."
      ],
      [
        "LR-1 / LR-2",
        "قطعاً / احتمالاً خوش‌خیم."
      ],
      [
        "LR-3 / LR-4 / LR-5",
        "احتمال متوسط بدخیمی / احتمالاً HCC / قطعاً HCC در گروه هدف."
      ]
    ],
    "majorTitle": "کدام ویژگی‌های اصلی بررسی می‌شوند؟",
    "majorFeatures": [
      [
        "APHE غیرحاشیه‌ای",
        "تقویت شریانی که فقط به حاشیه محدود نیست."
      ],
      [
        "Wash-out غیرمحیطی",
        "کاهش زمانی نسبی تا جذب کمتر: با حاجب خارج‌سلولی در فاز پورتال یا تأخیری، با گادوکسیتات فقط پورتال. کم‌سیگنالی انتقالی/هپاتوبیلیاری جای واش‌اوت را نمی‌گیرد."
      ],
      [
        "کپسول دارای تقویت",
        "حدّ شبه‌کپسولی که پس از تزریق تقویت می‌شود."
      ],
      [
        "اندازه",
        "رده اندازه ضایعه؛ در فازی اندازه بگیرید که حدود بهتر مشخص است و ترجیحاً نه در فاز شریانی."
      ],
      [
        "رشد آستانه‌ای",
        "افزایش قطر دست‌کم ۵۰٪ طی حداکثر ۶ ماه (تعریف v2018)."
      ]
    ],
    "lr5Title": "LR-5: قاعده تصمیم‌گیری فشرده",
    "lr5": [
      "برای ضایعه ۱۰ تا ۱۹ میلی‌متری: APHE غیرحاشیه‌ای به‌همراه wash-out غیرمحیطی برای LR-5 کافی است. APHE به‌همراه رشد آستانه‌ای نیز به LR-5 می‌رسد. در این اندازه، کپسول به‌تنهایی به‌جای wash-out/رشد آستانه‌ای کافی نیست.",
      "از ۲۰ میلی‌متر به بالا: APHE غیرحاشیه‌ای همراه دست‌کم یک ویژگی اصلی دیگر (wash-out، کپسول یا رشد آستانه‌ای) معیار LR-5 را برآورده می‌کند.",
      "بدون APHE غیرحاشیه‌ای یا در اندازه کمتر از ۱۰ میلی‌متر، جدول تشخیصی به LR-5 نمی‌رسد. اگر وجود ویژگی اصلی نامطمئن است، آن را غایب در نظر بگیرید."
    ],
    "cautionTitle": "ویژگی‌های کمکی راه میان‌بُر نیستند",
    "caution": "طبق قواعد ACR، ویژگی کمکی می‌تواند رده را حداکثر تا LR-4 بالا ببرد و نمی‌تواند LR-5 ایجاد کند. اگر هم ویژگی به نفع بدخیمی و هم ویژگی به نفع خوش‌خیمی وجود دارد، رده را تغییر ندهید. LR-5 در گروه هدف واجد شرایط به معنای «قطعاً HCC» است؛ این رده برای افراد خارج از گروه هدف کاربرد ندارد.",
    "reportTitle": "چه مواردی در گزارش بیاید؟",
    "report": "هر ضایعه را مکان‌یابی و اندازه‌گیری کنید، ویژگی‌های اصلی مرتبط را بنویسید و رده را همراه نسخه CT/MRI و LI-RADS ذکر کنید. برای LR-M در صورت امکان منشأ محتمل را بنویسید؛ در LR-TIV ورید درگیر و منشأ احتمالی را توصیف کنید. توصیه پیگیری، نمونه‌برداری یا درمان به زمینه بالینی و تصمیم چندتخصصی وابسته است.",
    "source": "منابع: Abdomen.pdf، صفحات PDF ۲۰–۲۳ (صفحات چاپی ۱۹–۲۲)؛ ACR LI-RADS CT/MRI v2018 Core، الگوریتم تشخیصی / گروه هدف / جدول تشخیصی / ویژگی‌های کمکی. اقدام بعدی با AASLD2023 تکمیل شده است؛ برنامه‌ریزی درمان در پیوند جداگانه آمده است.",
    "checkQ": "در سیروز و MRI چندفازی مناسب با حاجب خارج‌سلولی، دو ضایعهٔ درمان‌نشدهٔ ۱۵ میلی‌متری هر دو APHE غیرحاشیه‌ای دارند و فاقد ویژگی LR-M یا تومور داخل وریدند. X واش‌اوت غیرمحیطی پورتال دارد؛ Y کپسول دارای جذب دارد، ولی واش‌اوت و رشد آستانه‌ای ندارد. طبق نسخهٔ ۲۰۱۸ رده‌ها کدام‌اند؟",
    "options": [
      "X: LR-5؛ Y: LR-5",
      "X: LR-5؛ Y: LR-4",
      "X: LR-4؛ Y: LR-5",
      "X: LR-4؛ Y: LR-4"
    ],
    "why": "در اندازهٔ ۱۰ تا ۱۹ میلی‌متر، APHE غیرحاشیه‌ای همراه واش‌اوت غیرمحیطی به LR-5 می‌رسد. APHE همراه کپسول دارای جذب به‌تنهایی در این گروه LR-4 می‌ماند؛ رشد آستانه‌ای نیز راه دیگری برای LR-5 است.",
    "summary": [
      "ابتدا گروه هدف و کیفیت چندفازی را بررسی کنید.",
      "پیش از جدول ویژگی‌های HCC، LR-M و LR-TIV را تشخیص دهید.",
      "ویژگی‌های اصلی، اندازه و رشد آستانه‌ای را طبق ACR v2018 ترکیب کنید.",
      "ویژگی‌های کمکی نمی‌توانند LR-5 ایجاد کنند."
    ]
  }
}

function DecisionFlow({ c }) {
  return <ol className={styles.flow} aria-label={c.flowTitle}>{c.flowLabels.map((label, i) => <li key={label}><span>{i+1}</span>{label}</li>)}</ol>
}

export default function LiRadsPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  const t = value => value[lang] || value.de
  const local = path => `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const from = encodeURIComponent(local('/abdomen/leber/li-rads'))
  const q = (LIRADS_QUESTIONS[lang] || LIRADS_QUESTIONS.de).find(item => item.id.endsWith('-major-rule'))
  const check = { question:q.question, options:q.options.map(o => o.text), answer:'ABCD'.indexOf(q.correct), explanation:q.explanation, wrongFeedback:q.options.map(o => q.wrongExplanations[o.id] || q.explanation), diagramCaption:c.flowCaption }
  return <LessonReferenceShell lessonId="li-rads" lang={lang} title={c.title} quizHref={local(`/ueben/quiz?fach=abdomen&n=5&themen=li-rads&from=${from}`)} flashcardsHref={local(`/flashcards/li-rads?from=${from}`)} diagram="liver" goals={c.goals} check={check} summary={c.summary} copy={{ contentTitle:{ de:'Die diagnostische Kategorie sicher anwenden', en:'Applying the diagnostic category safely', fa:'کاربرد ایمن رده تشخیصی' } }}>
    <main className={styles.content}>
      <p className={styles.lead}>{c.intro}</p>
      <section className={styles.panel}><h2>{c.flowTitle}</h2><DecisionFlow c={c}/><p className={styles.caption}>{c.flowCaption}</p></section>
      <section className={styles.panel}><h2>{c.eligibleTitle}</h2><p>{c.eligible}</p></section>
      <section className={styles.panel}><h2>{c.classifyTitle}</h2><dl className={styles.categories}>{c.categories.map(([term, desc])=><div key={term}><dt>{term}</dt><dd>{desc}</dd></div>)}</dl></section>
      <section className={styles.panel}><h2>{c.majorTitle}</h2><dl className={styles.features}>{c.majorFeatures.map(([term, desc])=><div key={term}><dt>{term}</dt><dd>{desc}</dd></div>)}</dl></section>
      <section className={styles.decision}><h2>{c.lr5Title}</h2><ol>{c.lr5.map(point=><li key={point}>{point}</li>)}</ol></section>
      <aside className={styles.cave}><h2>{c.cautionTitle}</h2><p>{c.caution}</p></aside>
      <section className={styles.panel}><h2>{c.reportTitle}</h2><p>{c.report}</p></section>
      <section className={styles.panel}><h2>{t(LIRADS_NEXT.title)}</h2><dl className={styles.categories}>{LIRADS_NEXT.rows.map(([term, text]) => <div key={term}><dt>{term}</dt><dd>{t(text)}</dd></div>)}</dl><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/" target="_blank" rel="noopener noreferrer">AASLD2023 · 19–21</a><p><a href={`${local('/abdomen/leber/hcc')}#therapieplanung`}>{t({de:'Zur HCC-Therapieplanung',en:'HCC treatment planning',fa:'برنامه‌ریزی درمان HCC'})}</a></p></section>
      <small className={styles.source}>{c.source} <a href="https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf" target="_blank" rel="noopener noreferrer">ACR CT/MRI LI-RADS v2018 Core</a></small>
    </main>
  </LessonReferenceShell>
}
