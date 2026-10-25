import { MAMMA_CALCIFICATION_CLINICAL_CONTENT as content } from './assessmentQuality/mammaCalcClinicalDraft'

export const CALCIFICATION_REVIEW_QUESTIONS = ["round-group-followup","stable-suspicious","regional-definition","segmental-apex","modifiers-not-score","mri-4a-selected","mri-4b-risk","coarse-heterogeneous-size"].map(id => ({ id, ...content[id] }))

export const CALCIFICATION_REVIEW_CARDS = [
  {
    "id": "mammographie-mikrokalk-size",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Größe",
      "en": "Size",
      "fa": "اندازه"
    },
    "front": {
      "de": "Sind Mikroverkalkungen unter 0,5 mm automatisch maligne?",
      "en": "Are microcalcifications below 0.5 mm automatically malignant?",
      "fa": "آیا میکروکلسیفیکاسیون‌های کوچک‌تر از ۰٫۵ میلی‌متر خودبه‌خود بدخیم‌اند؟"
    },
    "answer": {
      "de": "Nein. Malignitätsassoziierte Partikel sind häufig sehr klein; auch benigner Kalk kann klein sein.",
      "en": "No. Malignancy-associated particles are often very small, but benign calcium can also be small.",
      "fa": "خیر. ذرات همراه بدخیمی اغلب بسیار کوچک‌اند، اما کلسیم خوش‌خیم نیز می‌تواند کوچک باشد."
    },
    "explanation": {
      "de": "Morphologie und Verteilung sind entscheidend; Größe allein ist kein Trennkriterium.",
      "en": "Morphology and distribution are essential; size alone is not a discriminator.",
      "fa": "مورفولوژی و توزیع تعیین‌کننده‌اند؛ اندازه به‌تنهایی معیار افتراق نیست."
    },
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "learningGoalIds": [
      "calc08-characterise"
    ]
  },
  {
    "id": "mammographie-mikrokalk-dbt",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Technik",
      "en": "Technique",
      "fa": "تکنیک"
    },
    "front": {
      "de": "Ersetzt DBT die gezielte Kalkvergrößerung?",
      "en": "Does DBT replace targeted calcification magnification?",
      "fa": "آیا DBT جایگزین بزرگ‌نمایی هدفمند کلسیفیکاسیون است؟"
    },
    "answer": {
      "de": "Nein. DBT ergänzt Lokalisation und Gewebekontext; 2D-Vergrößerungsaufnahmen zeigen die feinen Kalkdetails.",
      "en": "No. DBT adds localisation and tissue context; 2D magnification shows fine calcification detail.",
      "fa": "خیر. DBT محل و زمینه بافتی را تکمیل می‌کند؛ بزرگ‌نمایی دوبعدی جزئیات ظریف کلسیفیکاسیون را نشان می‌دهد."
    },
    "explanation": {
      "de": "Die Verfahren ergänzen sich. Ein kleiner Brennfleck begrenzt bei Vergrößerung die geometrische Unschärfe.",
      "en": "The techniques complement each other. A small focal spot limits geometric blur during magnification.",
      "fa": "این روش‌ها مکمل هم‌اند. کانون کوچک، تاری هندسی هنگام بزرگ‌نمایی را محدود می‌کند."
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
    "id": "mammographie-mikrokalk-grouped",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Verteilung",
      "en": "Distribution",
      "fa": "توزیع"
    },
    "front": {
      "de": "Wie unterscheiden sich gruppierte und regionale Verkalkungen?",
      "en": "How do grouped and regional calcifications differ?",
      "fa": "کلسیفیکاسیون‌های گروهی و ناحیه‌ای چه تفاوتی دارند؟"
    },
    "answer": {
      "de": "Gruppiert: mindestens fünf Partikel in 1 cm oder mehr Partikel innerhalb von 2 cm. Regional: locker verstreut in einem Areal über 2 cm ohne duktale Orientierung.",
      "en": "Grouped: at least five particles in 1 cm or more particles within 2 cm. Regional: loosely scattered over an area larger than 2 cm without ductal orientation.",
      "fa": "گروهی: حداقل پنج ذره در ۱ سانتی‌متر یا تعداد بیشتر در محدوده ۲ سانتی‌متر. ناحیه‌ای: پراکنده در ناحیه بیش از ۲ سانتی‌متر بدون جهت‌گیری داکتال."
    },
    "explanation": {
      "de": "Die Verteilung muss immer mit der Morphologie kombiniert werden.",
      "en": "Always combine distribution with morphology.",
      "fa": "توزیع را همواره با مورفولوژی ترکیب کنید."
    },
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "learningGoalIds": [
      "calc08-distribution"
    ]
  },
  {
    "id": "mammographie-mikrokalk-segmental",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Verteilung",
      "en": "Distribution",
      "fa": "توزیع"
    },
    "front": {
      "de": "Wohin zeigt die Spitze einer segmentalen Verteilung?",
      "en": "Where does the apex of a segmental distribution point?",
      "fa": "رأس توزیع سگمنتال به کدام سمت است؟"
    },
    "answer": {
      "de": "Zur Mamille; das dreieckige beziehungsweise keilförmige Muster folgt einem Gang und seinen Verzweigungen.",
      "en": "Towards the nipple; the triangular or wedge-shaped pattern follows a duct and its branches.",
      "fa": "به‌سوی نوک پستان؛ الگوی مثلثی یا گوه‌ای از مجرا و شاخه‌های آن پیروی می‌کند."
    },
    "explanation": {
      "de": "Ein duktales Muster beweist allein keine bestimmte Histologie.",
      "en": "A ductal pattern alone does not prove a specific histology.",
      "fa": "الگوی داکتال به‌تنهایی بافت‌شناسی مشخصی را اثبات نمی‌کند."
    },
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "learningGoalIds": [
      "calc08-distribution"
    ]
  },
  {
    "id": "mammographie-mikrokalk-round-3",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "BI-RADS 3",
      "en": "BI-RADS 3",
      "fa": "BI-RADS 3"
    },
    "front": {
      "de": "Wann kommt eine einzelne runde Gruppe (historisch auch punktförmig) für BI-RADS 3 infrage?",
      "en": "When may a solitary round group (historically also termed punctate) qualify for BI-RADS 3?",
      "fa": "چه زمانی یک گروه منفرد گرد (با اصطلاح قدیمی نقطه‌ای نیز بیان‌شده) می‌تواند BI-RADS 3 باشد؟"
    },
    "answer": {
      "de": "Nach vollständiger diagnostischer Abklärung ohne suspekte Merkmale, auch wenn keine Voraufnahmen vorliegen. Erste Kontrolle nach 6 Monaten.",
      "en": "After complete diagnostic work-up without suspicious features, including when prior images are unavailable. First follow-up at 6 months.",
      "fa": "پس از بررسی تشخیصی کامل و نبود ویژگی مشکوک، از جمله در نبود تصاویر قبلی. نخستین پیگیری پس از ۶ ماه است."
    },
    "explanation": {
      "de": "Fehlende Voraufnahmen allein genügen nicht. Die Regel gilt nicht pauschal für amorphen Kalk.",
      "en": "Lack of prior images alone is insufficient. The rule does not routinely apply to amorphous calcium.",
      "fa": "نبود تصاویر قبلی به‌تنهایی کافی نیست. این قاعده به‌طور کلی برای کلسیم آمورف صدق نمی‌کند."
    },
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
      "https://pubmed.ncbi.nlm.nih.gov/32427557/"
    ],
    "learningGoalIds": [
      "calc08-management"
    ]
  },
  {
    "id": "mammographie-mikrokalk-stability",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Verlauf",
      "en": "Evolution",
      "fa": "روند"
    },
    "front": {
      "de": "Beweist langjährige Stabilität die Benignität suspekter Verkalkungen?",
      "en": "Does long-term stability prove suspicious calcifications are benign?",
      "fa": "آیا پایداری طولانی‌مدت، خوش‌خیمی کلسیفیکاسیون مشکوک را اثبات می‌کند؟"
    },
    "answer": {
      "de": "Nein. DCIS kann langsam wachsen oder lange bildmorphologisch unverändert bleiben.",
      "en": "No. DCIS may grow slowly or remain unchanged on imaging for a long time.",
      "fa": "خیر. DCIS ممکن است آهسته رشد کند یا مدت طولانی در تصویربرداری بدون تغییر بماند."
    },
    "explanation": {
      "de": "Stabilität ist ein Modifikator, aber keine Entwarnung bei suspekter Morphologie.",
      "en": "Stability is a modifier, not reassurance when morphology is suspicious.",
      "fa": "پایداری عامل تعدیل‌کننده است، نه نشانه رفع خطر در مورفولوژی مشکوک."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/8208928/",
    "sources": [
      "https://pubmed.ncbi.nlm.nih.gov/8208928/",
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf"
    ],
    "learningGoalIds": [
      "calc08-evolution"
    ]
  },
  {
    "id": "mammographie-mikrokalk-modifiers",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Modifikatoren",
      "en": "Modifiers",
      "fa": "عوامل تعدیل‌کننده"
    },
    "front": {
      "de": "Welche vier Zusatzaspekte gehören zur Gesamtbeurteilung?",
      "en": "Which four additional aspects belong in the overall assessment?",
      "fa": "کدام چهار جنبه تکمیلی در ارزیابی کلی لحاظ می‌شوند؟"
    },
    "answer": {
      "de": "Verlauf, Gesamtausdehnung, Begleitbefunde sowie Alter und persönliche Anamnese.",
      "en": "Evolution, total extent, associated findings, and age/personal history.",
      "fa": "روند، وسعت کل، یافته‌های همراه و سن/سابقه شخصی."
    },
    "explanation": {
      "de": "Keine festen Plus-/Minus-Kategorien. Der Matrixwert ist ein Studienmodell, keine individuelle Risikoberechnung.",
      "en": "No fixed category increments or decrements. The matrix is a research model, not an individual risk calculation.",
      "fa": "بدون افزایش یا کاهش ثابت دسته‌ها. ماتریس مدل پژوهشی است، نه محاسبه خطر فردی."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6923207/",
    "learningGoalIds": [
      "calc08-evolution"
    ]
  },
  {
    "id": "mammographie-mikrokalk-mri4a",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Negative MRT",
      "en": "Negative MRI",
      "fa": "MRI منفی"
    },
    "front": {
      "de": "Darf bei BI-RADS 4A nach negativer MRT generell auf Biopsie verzichtet werden?",
      "en": "Can biopsy routinely be omitted in BI-RADS 4A after negative MRI?",
      "fa": "آیا در BI-RADS 4A پس از MRI منفی می‌توان به‌طور کلی از بیوپسی صرف‌نظر کرد؟"
    },
    "answer": {
      "de": "Nein. Bei bestätigter mammographischer Kategorie 4A bleibt Gewebediagnostik das Standardmanagement. Eine negative MRT allein rechtfertigt keine automatische Herabstufung.",
      "en": "No. Tissue diagnosis remains standard management for confirmed mammographic category 4A. Negative MRI alone does not justify automatic downgrading.",
      "fa": "خیر. در دستهٔ ماموگرافیک تأییدشدهٔ 4A، تشخیص بافتی مدیریت استاندارد باقی می‌ماند. MRI منفی به‌تنهایی کاهش خودکار دسته را توجیه نمی‌کند."
    },
    "explanation": {
      "de": "Fueger 2021 diskutiert bei ausgewähltem niedrigem Ausgangsrisiko eine Überwachungsstrategie; 6–12 Monate sind ein Vorschlag der Autoren, kein prospektiv validierter Biopsieersatz. Die Metaanalyse liefert keine allgemeine 4A/4B/4C-Regel. DCIS kann trotz negativer MRT vorliegen.",
      "en": "Fueger 2021 discusses surveillance at selected low baseline risk; 6–12 months is an author proposal, not a prospectively validated replacement for biopsy. The meta-analysis provides no general 4A/4B/4C rule. DCIS may be present despite negative MRI.",
      "fa": "Fueger ۲۰۲۱ در خطر اولیهٔ پایینِ منتخب راهبرد پایش را مطرح می‌کند؛ ۶ تا ۱۲ ماه پیشنهاد نویسندگان است، نه جایگزین آینده‌نگرِ اعتبارسنجی‌شده برای بیوپسی. فراتحلیل قاعدهٔ عمومی 4A/4B/4C ارائه نمی‌دهد. با وجود MRI منفی، DCIS ممکن است وجود داشته باشد."
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
  },
  {
    "id": "mammographie-mikrokalk-mri4b5",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Negative MRT",
      "en": "Negative MRI",
      "fa": "MRI منفی"
    },
    "front": {
      "de": "Wie werden BI-RADS 4B, 4C und 5 bei negativer MRT eingeordnet?",
      "en": "How are BI-RADS 4B, 4C and 5 managed after negative MRI?",
      "fa": "BI-RADS 4B، 4C و 5 پس از MRI منفی چگونه مدیریت می‌شوند؟"
    },
    "answer": {
      "de": "Bei bestätigter mammographischer Kategorie 4B, 4C oder 5 bleibt Gewebediagnostik das Standardmanagement, auch nach negativer MRT.",
      "en": "Tissue diagnosis remains standard management for confirmed mammographic category 4B, 4C or 5, including after negative MRI.",
      "fa": "در دستهٔ ماموگرافیک تأییدشدهٔ 4B، 4C یا 5، تشخیص بافتی حتی پس از MRI منفی مدیریت استاندارد باقی می‌ماند."
    },
    "explanation": {
      "de": "Kategorien sind keine individuellen Restrisiken nach MRT. Dafür wären ein geeignetes Prätestrisiko und Testdaten einer vergleichbaren Population nötig. Eine modellierte 22-%-Schwelle aus MRT-Forschung ist keine Grenze zwischen den Kategorien und keine validierte allgemeine Biopsieverzichtsregel.",
      "en": "Categories are not individual residual risks after MRI. Estimation would require an appropriate pretest risk and test data from a comparable population. A modelled 22% threshold from MRI research is neither a category boundary nor a validated general biopsy-omission rule.",
      "fa": "دسته‌ها خطر باقی‌ماندهٔ فردی پس از MRI نیستند. برآورد آن به خطر پیش‌آزمون مناسب و دادهٔ آزمون در جمعیت قابل‌مقایسه نیاز دارد. آستانهٔ مدل‌شدهٔ ۲۲٪ در پژوهش MRI نه مرز دسته‌ها و نه قاعدهٔ عمومی اعتبارسنجی‌شده برای حذف بیوپسی است."
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
  },
  {
    "id": "mammographie-mikrokalk-usmacro",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Ultraschall",
      "en": "Ultrasound",
      "fa": "سونوگرافی"
    },
    "front": {
      "de": "Wie erscheinen Makroverkalkungen im Ultraschall?",
      "en": "How do macrocalcifications appear on ultrasound?",
      "fa": "ماکروکلسیفیکاسیون‌ها در سونوگرافی چگونه دیده می‌شوند؟"
    },
    "answer": {
      "de": "Echogen, häufig mit dorsalem Schallschatten; beispielsweise in Fibroadenomen, verkalkten Ölzysten oder Fettnekrose.",
      "en": "Echogenic, often with posterior acoustic shadowing; for example in fibroadenomas, calcified oil cysts or fat necrosis.",
      "fa": "اکوژن، اغلب با سایه صوتی خلفی؛ برای مثال در فیبروآدنوم، کیست روغنی کلسیفیه یا نکروز چربی."
    },
    "explanation": {
      "de": "Mikrokalk kann als feine echogene Foci sichtbar sein, muss sonographisch aber nicht nachweisbar sein.",
      "en": "Microcalcifications may appear as fine echogenic foci but need not be detectable on ultrasound.",
      "fa": "میکروکلسیفیکاسیون ممکن است به شکل کانون اکوژن ظریف دیده شود، اما الزاماً در سونوگرافی قابل تشخیص نیست."
    },
    "source": "https://www.aur.org/assets/Affinity_Groups/ACER/Educator-Resources/How-to-Page/How%20to%20Approach%20Breast%20Ultrasoundaa5a.pdf",
    "learningGoalIds": [
      "calc08-characterise"
    ]
  }
]
