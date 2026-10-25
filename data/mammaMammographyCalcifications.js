import { CALCIFICATION_REVIEW_QUESTIONS, CALCIFICATION_REVIEW_CARDS } from './mammaCalcificationReview'
import { MAMMA_CALCIFICATION_CLINICAL_CONTENT as content } from './assessmentQuality/mammaCalcClinicalDraft'
const L = (de, en, fa) => ({ de, en, fa })
const QUESTIONS = ["size-alone","magnification","popcorn","milk-calcium","rods-versus-linear","amorphous-distribution","pleomorphic-segmental","highest-suspicion","evolution-context","no-correlate"].map(id => ({ id, ...content[id] }))

export const MAMMOGRAPHY_CALCIFICATIONS_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, [...QUESTIONS, ...CALCIFICATION_REVIEW_QUESTIONS].map(item => ({
  id: `mammographie-mikrokalk-${lang}-${item.id}`, tags: ['mammographie-mikrokalk', 'mamma', 'mammographie', 'verkalkungen', 'bi-rads'], fach: 'mamma',
  question: item.question[lang], options: item.options.map((text, index) => ({ id: 'ABCD'[index], text: text[lang] })), correct: item.correct,
  explanation: item.explanation[lang], wrongExplanations: Object.fromEntries(Object.entries(item.wrong).map(([id, value]) => [id, value[lang]])),
  source: item.source, sources: item.sources, difficulty: item.difficulty, learningGoalIds: item.learningGoalIds,
}))]))

const CARDS = [
  {
    "id": "mammographie-mikrokalk-01",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Grundprinzip",
      "en": "Core principle",
      "fa": "اصل پایه"
    },
    "front": {
      "de": "Welche vier Merkmale werden zunächst systematisch beurteilt?",
      "en": "Which four features are initially assessed systematically?",
      "fa": "کدام چهار ویژگی ابتدا به‌صورت نظام‌مند ارزیابی می‌شوند؟"
    },
    "answer": {
      "de": "Partikelgröße, Morphologie, Verteilung und Gesamtausdehnung.",
      "en": "Particle size, morphology, distribution and total extent.",
      "fa": "اندازه ذرات، مورفولوژی، توزیع و وسعت کل."
    },
    "explanation": {
      "de": "Verlauf, Begleitbefunde und Risikokontext ergänzen die Gesamtbeurteilung; kein Merkmal allein ist eine Diagnose.",
      "en": "Evolution, associated findings and risk context complete the assessment; no single feature is a diagnosis.",
      "fa": "روند، یافته‌های همراه و زمینه خطر ارزیابی را تکمیل می‌کنند؛ هیچ ویژگی منفردی تشخیص نیست."
    },
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "learningGoalIds": [
      "calc08-characterise"
    ]
  },
  {
    "id": "mammographie-mikrokalk-02",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Technik",
      "en": "Technique",
      "fa": "تکنیک"
    },
    "front": {
      "de": "Wozu dienen Magnifikationsaufnahmen?",
      "en": "What are magnification views used for?",
      "fa": "نمای بزرگ‌نمایی چه کاربردی دارد؟"
    },
    "answer": {
      "de": "Zur präziseren Beurteilung von Form, Zahl und räumlicher Anordnung feiner Partikel.",
      "en": "More precise assessment of the shape, number and spatial arrangement of fine particles.",
      "fa": "ارزیابی دقیق‌تر شکل، تعداد و آرایش فضایی ذرات ظریف."
    },
    "explanation": {
      "de": "Sie charakterisieren Kalk, ersetzen aber weder Vergleich noch Assessment.",
      "en": "They characterise calcium but replace neither comparison nor assessment.",
      "fa": "این نما کلسیفیکاسیون را مشخص می‌کند، اما جایگزین مقایسه و ارزیابی نیست."
    },
    "source": "https://www.gov.uk/government/publications/breast-screening-clinical-guidelines-for-screening-management/clinical-guidance-for-breast-cancer-screening-assessment",
    "sources": [
      "https://www.gov.uk/government/publications/breast-screening-clinical-guidelines-for-screening-management/clinical-guidance-for-breast-cancer-screening-assessment",
      "https://www.acr.org/-/media/ACR/Files/Practice-Parameters/dig-mamo.pdf"
    ],
    "learningGoalIds": [
      "calc08-characterise"
    ]
  },
  {
    "id": "mammographie-mikrokalk-03",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Benigne Form",
      "en": "Benign form",
      "fa": "فرم خوش‌خیم"
    },
    "front": {
      "de": "Welche Ursache passt zu grobem konfluierendem Kalk (Coarse, klassisch popcornartig) in einer bekannten umschriebenen Masse?",
      "en": "Which cause fits coarse confluent calcification (classically popcorn-like) in a known circumscribed mass?",
      "fa": "کدام علت با کلسیفیکاسیون درشت و به‌هم‌پیوسته (Coarse، کلاسیک پاپ‌کورنی) در تودهٔ شناخته‌شده با حدود مشخص تطابق دارد؟"
    },
    "answer": {
      "de": "Ein involutierendes Fibroadenom.",
      "en": "An involuting fibroadenoma.",
      "fa": "فیبروآدنوم در حال پسرفت."
    },
    "explanation": {
      "de": "„Coarse“ ist der aktuelle Deskriptor. Das klassische dichte popcornartige Muster in einer bekannten umschriebenen Masse spricht für Involution; grob heterogener suspekter Kalk ist ein anderer Deskriptor.",
      "en": "“Coarse” is the current descriptor. The classic dense popcorn-like pattern in a known circumscribed mass favours involution; suspicious coarse heterogeneous calcification is a different descriptor.",
      "fa": "«درشت» اصطلاح کنونی است. الگوی کلاسیک متراکم پاپ‌کورنی در تودهٔ شناخته‌شده با حدود مشخص به نفع پسرفت است؛ کلسیفیکاسیون مشکوک درشت ناهمگون اصطلاح دیگری است."
    },
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "learningGoalIds": [
      "calc08-characterise"
    ]
  },
  {
    "id": "mammographie-mikrokalk-04",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Benigne Form",
      "en": "Benign form",
      "fa": "فرم خوش‌خیم"
    },
    "front": {
      "de": "Was ist eine Rim Calcification?",
      "en": "What is a rim calcification?",
      "fa": "کلسیفیکاسیون حلقوی چیست؟"
    },
    "answer": {
      "de": "Eine dünne randständige Verkalkung, häufig um eine Ölzyste nach Fettnekrose.",
      "en": "A thin peripheral calcification, often around an oil cyst after fat necrosis.",
      "fa": "کلسیفیکاسیون نازک محیطی، اغلب پیرامون کیست روغنی پس از نکروز چربی."
    },
    "explanation": {
      "de": "Der fetthaltige Inhalt und der glatte Ring stützen die benigne Einordnung.",
      "en": "Fat-containing centre and a smooth rim support benignity.",
      "fa": "مرکز حاوی چربی و حلقه صاف به نفع خوش‌خیمی است."
    },
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "learningGoalIds": [
      "calc08-characterise"
    ]
  },
  {
    "id": "mammographie-mikrokalk-05",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Benigne Form",
      "en": "Benign form",
      "fa": "فرم خوش‌خیم"
    },
    "front": {
      "de": "Wie erkennt man Layering (historisch: Milk of Calcium)?",
      "en": "How is layering (historically: milk of calcium) recognised?",
      "fa": "لایه‌بندی (اصطلاح قدیمی: شیر کلسیم) چگونه شناخته می‌شود؟"
    },
    "answer": {
      "de": "Durch lageabhängiges Sediment mit halbmond- oder teetassenförmigem Bild in der echten seitlichen Projektion.",
      "en": "By position-dependent sediment forming crescent or teacup shapes on a true lateral view.",
      "fa": "با رسوب وابسته به وضعیت و شکل هلالی یا فنجانی در نمای لترال واقعی."
    },
    "explanation": {
      "de": "Der Formwechsel zwischen Projektionen ist diagnostisch wertvoll.",
      "en": "The change in shape between projections is diagnostically useful.",
      "fa": "تغییر شکل بین نماها ارزش تشخیصی دارد."
    },
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "learningGoalIds": [
      "calc08-characterise"
    ]
  },
  {
    "id": "mammographie-mikrokalk-06",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Morphologie",
      "en": "Morphology",
      "fa": "مورفولوژی"
    },
    "front": {
      "de": "Welche Kalkmorphologien sind suspekt, und welche Rangordnung ist zu vermeiden?",
      "en": "Which calcification morphologies are suspicious, and which ranking should be avoided?",
      "fa": "کدام مورفولوژی‌های کلسیفیکاسیون مشکوک‌اند و از کدام رتبه‌بندی باید پرهیز کرد؟"
    },
    "answer": {
      "de": "Amorph, grob heterogen, fein pleomorph und fein linear/verzweigt sind suspekte Deskriptoren. Amorph und grob heterogen besitzen keine universelle feste Risikoreihenfolge.",
      "en": "Amorphous, coarse heterogeneous, fine pleomorphic and fine linear/branching are suspicious descriptors. Amorphous and coarse heterogeneous have no universal fixed risk order.",
      "fa": "آمورف، درشت ناهمگون، پلئومورفیک ظریف و ظریف خطی/شاخه‌دار توصیف‌های مشکوک‌اند. آمورف و درشت ناهمگون ترتیب ثابت و همگانی خطر ندارند."
    },
    "explanation": {
      "de": "Fine-lineare/verzweigte Formen tragen typischerweise einen höheren Verdacht. Für die anderen Muster variieren Kohortenwerte mit Verteilung und Auswahl; Youk fand keinen signifikanten Unterschied zwischen amorph und grob heterogen. Grob heterogen nicht mit typisch benignem grobem Kalk verwechseln.",
      "en": "Fine linear/branching forms typically carry higher suspicion. Cohort estimates for other patterns vary with distribution and selection; Youk found no significant difference between amorphous and coarse heterogeneous. Do not confuse coarse heterogeneous with typically benign coarse calcifications.",
      "fa": "اشکال ظریف خطی/شاخه‌دار معمولاً شک بیشتری دارند. برآوردهای کوهورت برای الگوهای دیگر با توزیع و انتخاب موارد تغییر می‌کنند؛ Youk تفاوت معناداری میان آمورف و درشت ناهمگون نیافت. درشت ناهمگون با کلسیفیکاسیون درشت تیپیک خوش‌خیم اشتباه نشود."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6923207/",
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC6923207/",
      "https://pubmed.ncbi.nlm.nih.gov/20410428/"
    ],
    "learningGoalIds": [
      "calc08-characterise"
    ]
  },
  {
    "id": "mammographie-mikrokalk-07",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Verteilung",
      "en": "Distribution",
      "fa": "توزیع"
    },
    "front": {
      "de": "Welche Verteilungskategorien werden beschrieben?",
      "en": "Which distribution categories are described?",
      "fa": "کدام دسته‌های توزیع توصیف می‌شوند؟"
    },
    "answer": {
      "de": "Diffus, regional, gruppiert, linear und segmental.",
      "en": "Diffuse, regional, grouped, linear and segmental.",
      "fa": "منتشر، ناحیه‌ای، گروهی، خطی و سگمنتال."
    },
    "explanation": {
      "de": "Die Verteilung beschreibt die Geographie des Prozesses, nicht die Form einzelner Partikel.",
      "en": "Distribution describes process geography, not individual particle shape.",
      "fa": "توزیع جغرافیای فرایند را بیان می‌کند، نه شکل ذره منفرد را."
    },
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "learningGoalIds": [
      "calc08-distribution"
    ]
  },
  {
    "id": "mammographie-mikrokalk-08",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Duktales Muster",
      "en": "Ductal pattern",
      "fa": "الگوی داکتال"
    },
    "front": {
      "de": "Warum sind lineare und segmentale Verteilungen wichtig?",
      "en": "Why are linear and segmental distributions important?",
      "fa": "چرا توزیع خطی و سگمنتال مهم است؟"
    },
    "answer": {
      "de": "Sie können den Verlauf eines Ganges beziehungsweise eines Gangsystems abbilden.",
      "en": "They may map the course of a duct or ductal system.",
      "fa": "می‌تواند مسیر یک مجرا یا سیستم مجاری را نشان دهد."
    },
    "explanation": {
      "de": "Gemeinsam mit suspekter Morphologie entsteht ein stärkeres duktales Verdachtsmuster.",
      "en": "Together with suspicious morphology they create a stronger ductal pattern.",
      "fa": "همراه با مورفولوژی مشکوک، الگوی داکتال قوی‌تری ایجاد می‌کند."
    },
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "learningGoalIds": [
      "calc08-distribution"
    ]
  },
  {
    "id": "mammographie-mikrokalk-09",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Kombination",
      "en": "Combination",
      "fa": "ترکیب"
    },
    "front": {
      "de": "Welche Kombination ist besonders hochsuspekt?",
      "en": "Which combination is particularly highly suspicious?",
      "fa": "کدام ترکیب بسیار مشکوک است؟"
    },
    "answer": {
      "de": "Fine-linear branching Morphologie mit segmentaler Verteilung.",
      "en": "Fine linear branching morphology with segmental distribution.",
      "fa": "مورفولوژی خطی ظریف شاخه‌دار با توزیع سگمنتال."
    },
    "explanation": {
      "de": "Partikelform und räumliche Architektur sprechen gemeinsam für irreguläre Gangausgüsse.",
      "en": "Particle form and spatial architecture together suggest irregular ductal casts.",
      "fa": "شکل ذرات و معماری فضایی با هم به نفع قالب‌های نامنظم داکتال‌اند."
    },
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "learningGoalIds": [
      "calc08-distribution"
    ]
  },
  {
    "id": "mammographie-mikrokalk-10",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Verlauf",
      "en": "Evolution",
      "fa": "روند"
    },
    "front": {
      "de": "Welche Verlaufsänderungen sind relevant?",
      "en": "Which interval changes matter?",
      "fa": "کدام تغییرات زمانی اهمیت دارند؟"
    },
    "answer": {
      "de": "Neuauftreten, Zunahme der Zahl, Ausdehnung oder morphologischen Heterogenität.",
      "en": "New development, increasing number, extent or morphologic heterogeneity.",
      "fa": "ایجاد تازه، افزایش تعداد، وسعت یا ناهمگونی مورفولوژیک."
    },
    "explanation": {
      "de": "Technisch vergleichbare Voraufnahmen verwenden. Echte Veränderung kann auch bei benignem Umbau vorkommen; entscheidend sind Art der Veränderung und Gesamtbefund.",
      "en": "Use technically comparable prior images. True change can also occur during benign evolution; the nature of change and overall findings matter.",
      "fa": "از تصاویر قبلی با تکنیک قابل‌مقایسه استفاده شود. تغییر واقعی ممکن است در تحولات خوش‌خیم هم رخ دهد؛ نوع تغییر و کل یافته‌ها اهمیت دارد."
    },
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "learningGoalIds": [
      "calc08-evolution"
    ],
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
      "https://pubmed.ncbi.nlm.nih.gov/10541387/"
    ]
  },
  {
    "id": "mammographie-mikrokalk-11",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "DCIS",
      "en": "DCIS",
      "fa": "DCIS"
    },
    "front": {
      "de": "Welche Rolle spielen Verkalkungen beim DCIS?",
      "en": "What is the role of calcifications in DCIS?",
      "fa": "نقش کلسیفیکاسیون در DCIS چیست؟"
    },
    "answer": {
      "de": "Sie können die einzige mammographische Manifestation sein und die duktale Ausdehnung sichtbar machen.",
      "en": "They may be the only mammographic manifestation and may depict ductal extent.",
      "fa": "می‌تواند تنها تظاهر ماموگرافیک باشد و وسعت داکتال را نشان دهد."
    },
    "explanation": {
      "de": "Nicht jedes DCIS verkalkt, und nicht jede Verkalkung ist DCIS.",
      "en": "Not every DCIS calcifies, and not every calcification is DCIS.",
      "fa": "هر DCIS کلسیفیه نمی‌شود و هر کلسیفیکاسیون DCIS نیست."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/2544922/",
    "learningGoalIds": [
      "calc08-management"
    ],
    "sources": [
      "https://pubmed.ncbi.nlm.nih.gov/2544922/",
      "https://pubmed.ncbi.nlm.nih.gov/2536185/"
    ]
  },
  {
    "id": "mammographie-mikrokalk-12",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Modalitäten",
      "en": "Modalities",
      "fa": "مدالیته‌ها"
    },
    "front": {
      "de": "Entwarnt ein fehlendes Ultraschallkorrelat oder MRT-Enhancement?",
      "en": "Does absent ultrasound correlation or MRI enhancement reassure?",
      "fa": "آیا نبود همبستگی سونوگرافی یا تقویت پس از تزریق در MRI اطمینان‌بخش است؟"
    },
    "answer": {
      "de": "Nein. Eine suspekte Mammographiemorphologie bleibt maßgeblich.",
      "en": "No. Suspicious mammographic morphology remains decisive.",
      "fa": "خیر. مورفولوژی مشکوک ماموگرافی همچنان تعیین‌کننده است."
    },
    "explanation": {
      "de": "Ein Ultraschallkorrelat hilft beim Biopsiezugang. Eine negative MRT kann das Risiko beeinflussen, hebt eine suspekte Mammographiemorphologie aber nicht automatisch auf.",
      "en": "An ultrasound correlate helps choose the biopsy route. Negative MRI may influence risk but does not automatically negate suspicious mammographic morphology.",
      "fa": "تطابق سونوگرافیک به انتخاب مسیر بیوپسی کمک می‌کند. MRI منفی ممکن است بر خطر اثر بگذارد، اما مورفولوژی مشکوک ماموگرافی را خودکار منتفی نمی‌کند."
    },
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC7907894/",
      "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0188679"
    ],
    "learningGoalIds": [
      "calc08-management"
    ]
  }
]
export const MAMMOGRAPHY_CALCIFICATIONS_FLASHCARDS = [...CARDS, ...CALCIFICATION_REVIEW_CARDS]

export const MAMMOGRAPHY_CALCIFICATIONS_FLASHCARD_TOPIC = {
  id: 'mammographie-mikrokalk',
  area: 'Mamma',
  chapter: 'Bildgebung · Mammographie',
  icon: 'Ca',
  iconImage: '/fach/mamma.png',
  color: '#e83668',
  href: '/flashcards/mammographie-mikrokalk',
  title: L('Mammographie: Verkalkungen', 'Mammography: Calcifications', 'ماموگرافی: کلسیفیکاسیون‌ها'),
  subtitle: L('Morphologie · Verteilung · Verlauf · Kontext', 'Morphology · distribution · evolution · context', 'مورفولوژی · توزیع · روند · زمینه'),
}
