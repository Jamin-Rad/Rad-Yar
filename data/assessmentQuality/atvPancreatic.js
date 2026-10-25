// ATV05 unpublished package; original shared repairs are proposals until canonical integration by Root.
import {newQuestions as cystQuestions} from './atvCysticPancreas'
export const newQuestions=(lang='de')=>cystQuestions(lang)
export const newCards=[]
export const topics=[]
export const routeCoverage=[
  {
    "route": "/abdomen/pankreas/neuroendokrine-tumoren",
    "topicId": "pnet",
    "status": "AUTHOR_FULL_ORIGINAL_PNET_POOL_READY_PACKET05_REVIEW_PENDING",
    "learningGoals": [
      {
        "id": "arterial-pattern",
        "text": {
          "de": "Häufige arterielle PanNET-Muster erkennen und atypisches Enhancement berücksichtigen.",
          "en": "Recognise common arterial PanNET patterns while considering atypical enhancement.",
          "fa": "الگوهای شریانی شایع PanNET را بشناسید و رفتار آتیپیک مادهٔ حاجب را در نظر بگیرید."
        },
        "questionIds": [
          "pnet-de-01"
        ],
        "cardIds": [
          "pnet-arterial-pattern"
        ]
      },
      {
        "id": "splenic-mimic",
        "text": {
          "de": "Ektopisches Milzgewebe durch Mehrphasen-/Sequenzvergleich als Pankreasschwanz-Mimic berücksichtigen.",
          "en": "Consider ectopic splenic tissue as a pancreatic-tail mimic using multiphase/sequence comparison.",
          "fa": "بافت طحال نابجا را با مقایسهٔ چندفازی و چندسکانسی به‌عنوان تقلیدکنندهٔ تودهٔ دم پانکراس در نظر بگیرید."
        },
        "questionIds": [
          "pnet-de-02"
        ],
        "cardIds": [
          "pnet-splenic-mimic"
        ]
      },
      {
        "id": "functionality",
        "text": {
          "de": "Ein funktionelles Hormonsyndrom klinisch-biochemisch statt anhand des Bildsignals einordnen.",
          "en": "Classify a functioning hormonal syndrome clinically and biochemically rather than by imaging signal.",
          "fa": "سندرم هورمونی فانکشنال را بر پایهٔ یافته‌های بالینی و بیوشیمیایی، نه سیگنال تصویر، ارزیابی کنید."
        },
        "questionIds": [
          "pnet-de-03"
        ],
        "cardIds": [
          "pnet-functional-status"
        ]
      },
      {
        "id": "risk-evidence",
        "text": {
          "de": "Insulinomdaten von der Risikoeinschätzung nichtfunktioneller PanNET trennen.",
          "en": "Separate insulinoma data from risk estimation for nonfunctioning PanNETs.",
          "fa": "داده‌های انسولینوما را از برآورد خطر PanNET غیرفانکشنال جدا کنید."
        },
        "questionIds": [
          "pnet-de-04"
        ],
        "cardIds": [
          "pnet-insulinoma-caveat"
        ]
      }
    ]
  },
  {
    "route": "/abdomen/pankreas/pankreaskarzinom",
    "topicId": "pdac",
    "status": "AUTHOR_FULL_ORIGINAL_POOL_DRAFT_SHARED_PROPOSALS_UNAPPLIED_INDEPENDENT_REVIEW_PENDING",
    "learningGoals": [
      {
        "id": "occult-obstruction",
        "text": {
          "de": "Bei möglichem isoattenuierendem PDAC sekundäre Gang-/Parenchymzeichen erkennen und unterstützende MRT-/MRCP-Zeichen benennen.",
          "en": "Recognise secondary ductal/parenchymal signs of possible isoattenuating PDAC and name supportive MRI/MRCP findings.",
          "fa": "نشانه‌های ثانویهٔ مجرا/پارانشیم در PDAC احتمالی هم‌دانسیته را بشناسید و یافته‌های حمایتی MRI/MRCP را نام ببرید."
        },
        "questionIds": [
          "abdomen-pdac-isoattenuating-de-01"
        ],
        "cardIds": [
          "pdac-isoattenuating",
          "pdac-mri"
        ]
      },
      {
        "id": "double-duct-localisation",
        "text": {
          "de": "Das Double-Duct-Muster distal lokalisieren und neoplastische von benignen Ursachen als offene Differenzialdiagnose trennen.",
          "en": "Localise the double-duct pattern distally and retain both neoplastic and benign causes in the differential.",
          "fa": "الگوی دو مجرا را در ناحیهٔ دیستال موضع‌یابی کنید و علل نئوپلاستیک و خوش‌خیم را در تشخیص افتراقی باز نگه دارید."
        },
        "questionIds": [
          "abdomen-pdac-double-duct-de-01"
        ],
        "cardIds": [
          "pdac-double-duct"
        ]
      },
      {
        "id": "vessel-planning",
        "text": {
          "de": "Für die Gefäßplanung Kontakt, Kontur und venöse Anschlusssegmente strukturiert dokumentieren, ohne allein daraus die Resektabilität festzulegen.",
          "en": "Document contact, contour and adjacent venous segments for vascular planning without determining resectability from these alone.",
          "fa": "تماس، جدار و قطعات وریدی مجاور را برای برنامه‌ریزی عروقی ساختاریافته ثبت کنید، بدون آنکه تنها بر همان اساس قابلیت برداشت تعیین شود."
        },
        "questionIds": [
          "abdomen-pdac-vessel-contact-de-01"
        ],
        "cardIds": [
          "pdac-vessel-reporting"
        ]
      }
    ]
  },
  {
    "route": "/abdomen/leber/psc-mrcp",
    "topicId": "psc-pbc",
    "status": "AUTHOR_FULL_ORIGINAL_POOL_REVISED_TWO_TARGETED_GOALS_ADDED_REVIEW_PENDING",
    "learningGoals": [
      {
        "id": "duct-pattern",
        "text": {
          "de": "Das typische multifokale Perlschnurmuster von konkurrierenden Gangmustern unterscheiden.",
          "en": "Distinguish multifocal beading from competing ductal patterns.",
          "fa": "الگوی مهره‌مهرهٔ چندکانونی را از الگوهای رقیب مجاری افتراق دهید."
        },
        "questionIds": [
          "psc-pbc-mrcp-beading-de"
        ],
        "cardIds": [
          "psc-pbc-mrcp-beading"
        ]
      },
      {
        "id": "quality-strategy",
        "text": {
          "de": "Eine technisch unzureichende MRCP von einem hochwertigen Normalbefund trennen und den nächsten diagnostischen Schritt begründen.",
          "en": "Distinguish inadequate MRCP from a high-quality normal examination and justify the next diagnostic step.",
          "fa": "MRCP ناکافی را از بررسی طبیعی و باکیفیت تفکیک کنید و گام تشخیصی بعدی را توضیح دهید."
        },
        "questionIds": [
          "aq-atv-psc-pbc-de-quality-next"
        ],
        "cardIds": [
          "aq-atv-psc-pbc-quality-next"
        ]
      },
      {
        "id": "clinical-relevance",
        "text": {
          "de": "Morphologische Strikturschwere von klinischer Relevanz mit obstruktiver Cholestase oder Cholangitis unterscheiden.",
          "en": "Distinguish morphological stricture severity from clinical relevance with obstructive cholestasis or cholangitis.",
          "fa": "شدت مورفولوژیک تنگی را از اهمیت بالینی همراه کلستاز انسدادی یا کلانژیت تفکیک کنید."
        },
        "questionIds": [
          "aq-atv-psc-pbc-de-relevant-stricture"
        ],
        "cardIds": [
          "aq-atv-psc-pbc-relevant-stricture"
        ]
      }
    ]
  },
  {
    "route": "/abdomen/pankreas/zystische-tumoren",
    "topicId": "ipmn",
    "cardTopicId": "abdomen-pancreatic-cysts",
    "status": "AUTHOR_ORIGINAL_POOL_AND_TWO_GAP_QUESTIONS_READY_REVIEW_PENDING",
    "learningGoals": [
      {
        "id": "post-inflammatory-context",
        "text": {
          "de": "Gangkommunikation gemeinsam mit Entzündungsverlauf und flüssigem oder nekrotischem Inhalt einordnen.",
          "en": "Interpret duct communication together with the inflammatory course and fluid versus necrotic contents.",
          "fa": "ارتباط مجرایی را همراه سیر التهاب و محتوای مایع یا نکروتیک تفسیر کنید."
        },
        "questionIds": [
          "abdomen-pancreatic-cysts-de-01"
        ],
        "cardIds": [
          "abdomen-pancreatic-cysts-pseudocyst-context-clues"
        ]
      },
      {
        "id": "serous-morphology",
        "text": {
          "de": "Seröse mikrozystische Hinweise erkennen und die begrenzte Aussage makrozystischer Kontur benennen.",
          "en": "Recognise serous microcystic clues and state the limitations of macrocystic contour.",
          "fa": "نشانه‌های میکروکیستیک سروزی را بشناسید و محدودیت حاشیهٔ ماکروکیستیک را بیان کنید."
        },
        "questionIds": [
          "aq-atv-ipmn-de-serous-pattern"
        ],
        "cardIds": [
          "abdomen-pancreatic-cysts-serous-macrocystic-contour"
        ]
      },
      {
        "id": "kyoto-risk",
        "text": {
          "de": "Enhancierende Wandknoten nach Kyoto2024 als HRS oder WF klassifizieren, ohne eine Krebsdiagnose oder automatische Operation abzuleiten.",
          "en": "Classify enhancing mural nodules as Kyoto2024 HRS or WF without inferring a cancer diagnosis or automatic surgery.",
          "fa": "ندول دیواره‌ای دارای جذب مادهٔ حاجب را طبق کیوتو۲۰۲۴ به HRS یا WF طبقه‌بندی کنید، بدون استنباط سرطان یا جراحی خودکار."
        },
        "questionIds": [
          "aq-atv-ipmn-de-nodule-risk"
        ],
        "cardIds": [
          "aq-atv-ipmn-nodule-risk"
        ]
      }
    ]
  },
  {
    "route": "/abdomen/pankreas/pankreatitis",
    "topicId": "pankreatitis",
    "learningGoals": [
      {
        "id": "etiology-timing",
        "text": {
          "de": "Biliäre Abflussstörung und Alkoholmechanismus einordnen sowie das benannte CT-Zeitfenster mit dringlichen Ausnahmen begründen.",
          "en": "Interpret biliary obstruction and alcohol mechanisms and justify the specified CT window and urgent exceptions.",
          "fa": "اختلال تخلیهٔ صفراوی و مکانیسم الکل را تفسیر کنید و بازهٔ مشخص CT و استثناهای فوری را توضیح دهید."
        },
        "questionIds": [
          "pankreatitis-de-biliary-cause",
          "pankreatitis-de-alcohol",
          "pankreatitis-de-necrosis-timing"
        ],
        "cardIds": [
          "pankreatitis-causes",
          "pankreatitis-biliary-mechanism",
          "pankreatitis-necrosis-timing"
        ]
      },
      {
        "id": "morphology-collections",
        "text": {
          "de": "Interstitielle und nekrotisierende Formen sowie APFC/Pseudozyste/ANC/WON aus Inhalt, Wand, Zeit und Kontext unterscheiden.",
          "en": "Distinguish interstitial and necrotising forms and APFC/pseudocyst/ANC/WON from contents, wall, time and context.",
          "fa": "انواع بینابینی و نکروزان و نیز APFC/پسودوسیست/ANC/WON را بر پایهٔ محتوا، دیواره، زمان و زمینه افتراق دهید."
        },
        "questionIds": [
          "pankreatitis-de-atlanta-morphology",
          "pankreatitis-de-collections",
          "pankreatitis-de-walled-off-necrosis"
        ],
        "cardIds": [
          "pankreatitis-atlanta-morphology",
          "pankreatitis-collections"
        ]
      },
      {
        "id": "ctsi-clinical",
        "text": {
          "de": "Den morphologischen CTSI von klinischer Atlanta-Schwere anhand Organversagen und Dauer trennen.",
          "en": "Separate morphological CTSI from clinical Atlanta severity using organ failure and duration.",
          "fa": "CTSI مورفولوژیک را با توجه به نارسایی عضو و مدت آن از شدت بالینی آتلانتا جدا کنید."
        },
        "questionIds": [
          "pankreatitis-de-ctsi-severe"
        ],
        "cardIds": [
          "pankreatitis-ctsi"
        ]
      },
      {
        "id": "complications",
        "text": {
          "de": "Arterielle Komplikationen und Infektionshinweise erkennen und bei Gangunterbrechung den vitalen vorgeschalteten Pankreasanteil berücksichtigen.",
          "en": "Recognise arterial complications and infection clues and consider viable upstream pancreas in duct disruption.",
          "fa": "عوارض شریانی و سرنخ‌های عفونت را بشناسید و در قطع مجرا بخش زندهٔ بالادست پانکراس را در نظر بگیرید."
        },
        "questionIds": [
          "pankreatitis-de-pseudoaneurysm",
          "pankreatitis-de-infected-necrosis"
        ],
        "cardIds": [
          "pankreatitis-pseudoaneurysm",
          "pankreatitis-infected-necrosis",
          "pankreatitis-duct-disruption"
        ]
      },
      {
        "id": "chronic-mass-differential",
        "text": {
          "de": "Chronische Gang-/Parenchymzeichen und tumorverdächtige Muster gewichten; bei möglicher Autoimmunpankreatitis die notwendige Tumorabklärung vor Steroidprobe benennen.",
          "en": "Weigh chronic ductal/parenchymal and tumour-suspicious patterns; name the required malignancy evaluation before a steroid trial in possible autoimmune pancreatitis.",
          "fa": "الگوهای مزمن مجرا/پارانشیم و الگوهای مشکوک به تومور را بسنجید؛ در احتمال پانکراتیت خودایمنی، بررسی لازم بدخیمی پیش از آزمون استروئید را بیان کنید."
        },
        "questionIds": [
          "pankreatitis-de-carcinoma-dd"
        ],
        "cardIds": [
          "pankreatitis-chronic-triad",
          "pankreatitis-carcinoma-dd",
          "pankreatitis-autoimmune"
        ]
      }
    ],
    "coverageLimit": "Question/card evidence combined; DPDS and AIP are focused retrieval cards rather than newly fabricated case quizzes. No fixed item quota.",
    "status": "AUTHOR_FULL_ORIGINAL_POOL_SHARED_PROPOSALS_UNAPPLIED_REVIEW_PENDING"
  }
]
