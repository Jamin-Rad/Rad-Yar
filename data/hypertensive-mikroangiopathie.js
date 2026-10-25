const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })
const F = (id, category, front, answer, explanation, diagram = null) => ({ id, category, front, answer, explanation, diagram })

// ─── Lesson ──────────────────────────────────────────────────────────────────

export const HMA_LESSON = {
  "pdfSourcePages": [
    25,
    26
  ],
  "breadcrumb": {
    "de": "Hypertensive Mikroangiopathie",
    "en": "Hypertensive Microangiopathy",
    "fa": "میکروآنژیوپاتی فشار خون بالا"
  },
  "title": {
    "de": "Hypertensive Mikroangiopathie",
    "en": "Hypertensive Microangiopathy",
    "fa": "میکروآنژیوپاتی فشار خون بالا"
  },
  "definition": {
    "de": "Folge chronischer Hypertonie auf die kleinen Hirnarterien mit Lipohyalinose und fibrinoider Nekrose – Spektrum aus Leukoaraiose, lakunären Infarkten und hypertensiver intrazerebraler Blutung.",
    "en": "Consequence of chronic hypertension on small cerebral arteries causing lipohyalinosis and fibrinoid necrosis, with a spectrum of leukoaraiosis, lacunar infarcts, and hypertensive intracerebral haemorrhage.",
    "fa": "پیامد فشار خون مزمن بر عروق کوچک مغزی با لیپوهیالینوز و نکروز فیبرینوئید — طیف شامل لوکوآرائوز، انفارکت لاکونار و خونریزی مغزی فشار خون بالا."
  },
  "sourceLabel": "Dr. Zia",
  "keyLabel": {
    "de": "Merke",
    "en": "Key point",
    "fa": "نکته کلیدی"
  },
  "caveLabel": {
    "de": "Cave",
    "en": "Warning",
    "fa": "هشدار"
  },
  "toc": {
    "de": "Inhalte",
    "en": "Contents",
    "fa": "فهرست"
  },
  "heroCards": [
    {
      "value": {
        "de": "Kleine Gefäße",
        "en": "Small vessels",
        "fa": "عروق کوچک"
      },
      "label": {
        "de": "Arteriolopathie",
        "en": "Arteriolopathy",
        "fa": "آرتریولوپاتی"
      },
      "text": {
        "de": "ischämische und hämorrhagische Schäden",
        "en": "ischaemic and haemorrhagic injury",
        "fa": "آسیب ایسکمیک و خونریزی‌دهنده"
      }
    },
    {
      "value": {
        "de": "5 Loci",
        "en": "5 Loci",
        "fa": "۵ محل"
      },
      "label": {
        "de": "Typische Lokalisationen",
        "en": "Typical locations",
        "fa": "محل‌های معمول"
      },
      "text": {
        "de": "Putamen · Thalamus · Pons · Kleinhirn · Capsula interna",
        "en": "Putamen · Thalamus · Pons · Cerebellum · Internal capsule",
        "fa": "پوتامن · تالاموس · پونز · مخچه · کپسول داخلی"
      }
    },
    {
      "value": {
        "de": "Spot-Sign",
        "en": "Spot Sign",
        "fa": "علامت اسپات (Spot sign)"
      },
      "label": {
        "de": "CTA-Marker",
        "en": "CTA marker",
        "fa": "نشانه CTA"
      },
      "text": {
        "de": "Hinweis auf erhöhtes Expansionsrisiko",
        "en": "marker of increased expansion risk",
        "fa": "نشانگر افزایش خطر گسترش"
      }
    }
  ],
  "sections": [
    {
      "id": "grundlagen",
      "icon": "📌",
      "label": {
        "de": "Grundlagen",
        "en": "Basics",
        "fa": "اساسیات"
      }
    },
    {
      "id": "pathophysio",
      "icon": "🔬",
      "label": {
        "de": "Pathophysiologie",
        "en": "Pathophysiology",
        "fa": "پاتوفیزیولوژی"
      }
    },
    {
      "id": "cct",
      "icon": "💻",
      "label": {
        "de": "CCT & CTA",
        "en": "CCT & CTA",
        "fa": "CCT و CTA"
      }
    },
    {
      "id": "mrt",
      "icon": "🧲",
      "label": {
        "de": "MRT",
        "en": "MRI",
        "fa": "MRI"
      }
    },
    {
      "id": "klinik",
      "icon": "🩺",
      "label": {
        "de": "Klinik",
        "en": "Clinical",
        "fa": "کلینیک"
      }
    },
    {
      "id": "differenzial",
      "icon": "⚖️",
      "label": {
        "de": "Differenzialdiagnose",
        "en": "Differential",
        "fa": "افتراقی"
      }
    },
    {
      "id": "therapie",
      "icon": "💊",
      "label": {
        "de": "Therapie",
        "en": "Treatment",
        "fa": "درمان"
      }
    },
    {
      "id": "takehome",
      "icon": "🏁",
      "label": {
        "de": "Take-home",
        "en": "Take-home",
        "fa": "جمع‌بندی"
      }
    }
  ],
  "grundlagen": {
    "title": {
      "de": "Grundlagen & Epidemiologie",
      "en": "Basics & Epidemiology",
      "fa": "اساسیات و اپیدمیولوژی"
    },
    "lead": {
      "de": "Die hypertensive Mikroangiopathie umfasst das Spektrum der Hirnschäden durch chronisch erhöhten Blutdruck auf die kleinen Hirnarterien (Perforatoren, Durchmesser <300 µm).",
      "en": "Hypertensive microangiopathy encompasses the spectrum of brain damage caused by chronically elevated blood pressure affecting small cerebral arteries (perforators, diameter <300 µm).",
      "fa": "میکروآنژیوپاتی فشار خون بالا طیفی از آسیب‌های مغزی ناشی از فشار خون مزمن بالا بر شریان‌های کوچک مغزی (پرفوراتورها، قطر <300 میکرومتر) را در بر می‌گیرد."
    },
    "items": [
      {
        "icon": "🩸",
        "title": {
          "de": "Hypertensive ICB",
          "en": "Hypertensive ICH",
          "fa": "ICH فشار خون بالا"
        },
        "text": {
          "de": "Frische kleine subkortikale Infarkte, chronische Lakunen und WMH sowie tiefe Mikroblutungen oder größere tiefe Blutungen. Kein einzelner Marker beweist Hypertonie als Ursache.",
          "en": "Recent small subcortical infarcts, chronic lacunes and WMH, alongside deep microbleeds or larger deep haemorrhages. No single marker establishes hypertension as the cause.",
          "fa": "انفارکت‌های کوچک زیرقشری تازه، لاکون‌های مزمن و پرسیگنالی مادهٔ سفید، همراه میکروخونریزی‌های عمقی یا خونریزی‌های عمقی بزرگ‌تر. هیچ نشانگر منفردی پرفشاری خون را به‌عنوان علت اثبات نمی‌کند."
        }
      },
      {
        "icon": "🧠",
        "title": {
          "de": "Chronische Mikroangiopathie",
          "en": "Chronic microangiopathy",
          "fa": "میکروآنژیوپاتی مزمن"
        },
        "text": {
          "de": "Lipohyalinose → Wandverdickung, Lumeneinengung → lakunäre Infarkte, WMH (Leukoaraiose) und zerebrale Mikroblutungen (CMBs).",
          "en": "Lipohyalinosis → wall thickening, luminal narrowing → lacunar infarcts, WMH (leukoaraiosis) and cerebral microbleeds (CMBs).",
          "fa": "لیپوهیالینوز → ضخیم شدن دیواره، تنگی لومن → انفارکت لاکونار، WMH (لوکوآرائوز) و خونریزی‌های میکرو مغزی (CMBs)."
        }
      },
      {
        "icon": "📊",
        "title": {
          "de": "Epidemiologie",
          "en": "Epidemiology",
          "fa": "اپیدمیولوژی"
        },
        "text": {
          "de": "Chronische Hypertonie ist ein wichtiger behandelbarer Risikofaktor für spontane ICB und kleine Gefäßerkrankung. Häufigkeiten hängen von Population und Definition ab.",
          "en": "Chronic hypertension is an important modifiable risk factor for spontaneous ICH and small-vessel disease. Frequencies depend on population and definition.",
          "fa": "پرفشاری خون مزمن عامل خطر مهم و قابل‌درمان خونریزی خودبه‌خودی داخل مغز و بیماری عروق کوچک است. فراوانی به جمعیت و تعریف وابسته است."
        }
      },
      {
        "icon": "⚠️",
        "title": {
          "de": "Risikofaktoren",
          "en": "Risk factors",
          "fa": "عوامل خطر"
        },
        "text": {
          "de": "Unkontrollierter Bluthochdruck (Hauptfaktor), Diabetes mellitus, Rauchen, Alter, männliches Geschlecht.",
          "en": "Uncontrolled hypertension (main factor), diabetes mellitus, smoking, age, male sex.",
          "fa": "فشار خون کنترل‌نشده (عامل اصلی)، دیابت ملیتوس، سیگار، سن، جنس مذکر."
        }
      }
    ],
    "key": {
      "de": "Frische kleine subkortikale Infarkte, chronische Lakunen und WMH sowie tiefe Mikroblutungen oder größere tiefe Blutungen. Kein einzelner Marker beweist Hypertonie als Ursache.",
      "en": "Recent small subcortical infarcts, chronic lacunes and WMH, alongside deep microbleeds or larger deep haemorrhages. No single marker establishes hypertension as the cause.",
      "fa": "انفارکت‌های کوچک زیرقشری تازه، لاکون‌های مزمن و پرسیگنالی مادهٔ سفید، همراه میکروخونریزی‌های عمقی یا خونریزی‌های عمقی بزرگ‌تر. هیچ نشانگر منفردی پرفشاری خون را به‌عنوان علت اثبات نمی‌کند."
    }
  },
  "pathophysio": {
    "title": {
      "de": "Pathophysiologie",
      "en": "Pathophysiology",
      "fa": "پاتوفیزیولوژی"
    },
    "lead": {
      "de": "Chronisch erhöhter Blutdruck schädigt die kleinen Hirnarterien über mehrere Mechanismen, die zu unterschiedlichen bildgebenden Manifestationen führen.",
      "en": "Chronic hypertension damages small cerebral arteries via several mechanisms, each producing distinct imaging manifestations.",
      "fa": "فشار خون مزمن بالا از طریق مکانیسم‌های مختلف به شریان‌های کوچک مغزی آسیب می‌زند که هر کدام تظاهرات تصویربرداری متفاوتی ایجاد می‌کند."
    },
    "headers": [
      {
        "de": "Mechanismus",
        "en": "Mechanism",
        "fa": "مکانیسم"
      },
      {
        "de": "Resultat",
        "en": "Result",
        "fa": "نتیجه"
      },
      {
        "de": "Bildgebung",
        "en": "Imaging",
        "fa": "تصویربرداری"
      }
    ],
    "rows": [
      [
        {
          "de": "Lipohyalinose",
          "en": "Lipohyalinosis",
          "fa": "لیپوهیالینوز"
        },
        {
          "de": "Wandverdickung, Lumenverengung",
          "en": "Wall thickening, luminal narrowing",
          "fa": "ضخیم‌شدن دیواره، تنگی لومن"
        },
        {
          "de": "WMH in T2/FLAIR",
          "en": "WMH on T2/FLAIR",
          "fa": "WMH در T2/FLAIR"
        }
      ],
      [
        {
          "de": "Fibrinoide Nekrose",
          "en": "Fibrinoid necrosis",
          "fa": "نکروز فیبرینوئید"
        },
        {
          "de": "Wandruptur → Extravasation",
          "en": "Wall rupture → extravasation",
          "fa": "پارگی دیواره → اکستراواسیون"
        },
        {
          "de": "Hyperdens im CCT",
          "en": "Hyperdense on CCT",
          "fa": "هیپردنس در CCT"
        }
      ],
      [
        {
          "de": "Charcot-Bouchard-Aneurysmen",
          "en": "Charcot-Bouchard aneurysms",
          "fa": "آنوریسم‌های Charcot-Bouchard"
        },
        {
          "de": "Möglicher historisch beschriebener Rupturmechanismus; nicht obligat",
          "en": "Historically described possible rupture mechanism, not obligatory",
          "fa": "مکانیسم احتمالی پارگی که در گذشته توصیف شده است؛ اجباری نیست"
        },
        {
          "de": "ICB im CCT/MRT",
          "en": "ICH on CCT/MRI",
          "fa": "ICH در CCT/MRI"
        }
      ],
      [
        {
          "de": "Perivaskuläre Demyelinisierung",
          "en": "Perivascular demyelination",
          "fa": "دمیلینیزاسیون پریواسکولار"
        },
        {
          "de": "Axonverlust, WMH",
          "en": "Axon loss, WMH",
          "fa": "از دست رفتن آکسون، WMH"
        },
        {
          "de": "FLAIR-Hyperintensitäten",
          "en": "FLAIR hyperintensities",
          "fa": "هایپرانتنسیتی در FLAIR"
        }
      ],
      [
        {
          "de": "Perforator-Verschluss",
          "en": "Perforator occlusion",
          "fa": "انسداد پرفوراتور"
        },
        {
          "de": "Frischer kleiner subkortikaler Infarkt (axial meist ≤20 mm)",
          "en": "Recent small subcortical infarct (usually ≤20 mm axially)",
          "fa": "انفارکت کوچک زیرقشری تازه (محوری معمولاً ≤۲۰ میلی‌متر)"
        },
        {
          "de": "Akut häufig DWI↑/ADC↓; spätere Kavitation möglich, nicht obligat",
          "en": "Often DWI↑/ADC↓ acutely; later cavitation possible, not obligatory",
          "fa": "در مرحلهٔ حاد اغلب DWI↑/ADC↓؛ ایجاد حفرهٔ بعدی ممکن است، نه اجباری"
        }
      ]
    ],
    "key": {
      "de": "Die Erkrankung betrifft kleine penetrierende Arterien und kann ischämische sowie hämorrhagische Läsionen verursachen. Ein lineares Obligatmodell aus Lipohyalinose, Mikroaneurysma und Blutung ist dafür nicht erforderlich.",
      "en": "The disease affects small penetrating arteries and can produce both ischaemic and haemorrhagic lesions. This does not require an obligatory linear sequence of lipohyalinosis, microaneurysm and haemorrhage.",
      "fa": "بیماری عروق نافذ کوچک را درگیر می‌کند و می‌تواند ضایعات ایسکمیک و خونریزی‌دهنده ایجاد کند. وجود توالی اجباری و خطی لیپوهیالینوز، میکروآنوریسم و خونریزی برای آن لازم نیست."
    }
  },
  "cct": {
    "title": {
      "de": "Bildgebung: CCT & CTA",
      "en": "Imaging: CCT & CTA",
      "fa": "تصویربرداری: CCT و CTA"
    },
    "lead": {
      "de": "Das native CCT ist meist die rasch verfügbare Akutuntersuchung: Es zeigt frisches Blut, Volumen, Ventrikeleinbruch und Ödem. Auch eine geeignete, unverzüglich verfügbare MRT kann akute Blutung erfassen; die Wahl richtet sich nach klinischer Situation und lokaler Verfügbarkeit.",
      "en": "Unenhanced CT is usually the promptly available acute study, showing fresh blood, volume, intraventricular extension and oedema. Suitable immediately available MRI can also detect acute haemorrhage; choose according to clinical circumstances and local availability.",
      "fa": "CT بدون تزریق معمولاً بررسی سریعِ در دسترس در مرحلهٔ حاد است و خون تازه، حجم، گسترش به بطن‌ها و ادم را نشان می‌دهد. MRI مناسب و بی‌درنگ در دسترس نیز می‌تواند خونریزی حاد را آشکار کند؛ انتخاب به وضعیت بالینی و امکانات محلی بستگی دارد."
    },
    "morphHeaders": [
      {
        "de": "Merkmal",
        "en": "Feature",
        "fa": "ویژگی"
      },
      {
        "de": "Befund",
        "en": "Finding",
        "fa": "یافته"
      },
      {
        "de": "Erklärung",
        "en": "Explanation",
        "fa": "توضیح"
      }
    ],
    "morphRows": [
      [
        {
          "de": "Dichte",
          "en": "Density",
          "fa": "دانسیته"
        },
        {
          "de": "Frisches Blut häufig hyperdens; abhängig von Hämatokrit und Technik",
          "en": "Fresh blood often hyperattenuating; depends on haematocrit and technique",
          "fa": "خون تازه اغلب پرچگال است؛ وابسته به هماتوکریت و تکنیک"
        },
        {
          "de": "Erythrozytenkonzentration beeinflusst die Dichte",
          "en": "Red-cell concentration affects attenuation",
          "fa": "غلظت گلبول قرمز بر دانسیته اثر می‌گذارد"
        }
      ],
      [
        {
          "de": "Form",
          "en": "Shape",
          "fa": "شکل"
        },
        {
          "de": "Irregulär, nicht vollkommen rund",
          "en": "Irregular, not perfectly round",
          "fa": "نامنظم، کاملاً گرد نیست"
        },
        {
          "de": "Akute Blutung folgt Gewebespalten",
          "en": "Acute bleed tracks tissue planes",
          "fa": "خون حاد در مسیر فضاهای بافتی گسترش می‌یابد"
        }
      ],
      [
        {
          "de": "Ödem",
          "en": "Oedema",
          "fa": "ادم"
        },
        {
          "de": "Anfangs gering, später zunehmendes Umgebungsödem",
          "en": "Initially mild, progressively increasing perilesional oedema",
          "fa": "در ابتدا خفیف، ادم اطراف ضایعه به تدریج افزایش می‌یابد"
        },
        {
          "de": "Proteintranssudat, Entzündungsreaktion",
          "en": "Protein transsudate, inflammatory reaction",
          "fa": "ترانسودا پروتئینی، واکنش التهابی"
        }
      ],
      [
        {
          "de": "Ventrikeleinbruch",
          "en": "Intraventricular extension",
          "fa": "گسترش داخل بطنی"
        },
        {
          "de": "Möglich, schlechtere Prognose",
          "en": "Possible, poorer prognosis",
          "fa": "ممکن است، پیش‌آگهی بدتر"
        },
        {
          "de": "Obstruktiver Hydrozephalus möglich",
          "en": "Obstructive hydrocephalus possible",
          "fa": "هیدروسفالی انسدادی ممکن"
        }
      ]
    ],
    "locHeaders": [
      {
        "de": "Lokalisation",
        "en": "Location",
        "fa": "محل"
      },
      {
        "de": "Gefäßkontext",
        "en": "Vascular context",
        "fa": "زمینهٔ عروقی"
      },
      {
        "de": "Klinik",
        "en": "Clinical",
        "fa": "کلینیک"
      }
    ],
    "locRows": [
      [
        {
          "de": "Putamen / Globus pallidus / Capsula interna",
          "en": "Putamen / Globus pallidus / Internal capsule",
          "fa": "پوتامن / گلوبوس پالیدوس / کپسول داخلی"
        },
        {
          "de": "Tiefes Perforatorgebiet",
          "en": "Deep perforator territory",
          "fa": "قلمرو پرفوراتور عمقی"
        },
        {
          "de": "Kontralat. Hemiplegie/-parese, Hemisensibilität",
          "en": "Contralat. hemiplegia/-paresis, hemisensory loss",
          "fa": "همی‌پلژی/همی‌پارزی کنترالترال، اختلال حسی نیمه"
        }
      ],
      [
        {
          "de": "Thalamus",
          "en": "Thalamus",
          "fa": "تالاموس"
        },
        {
          "de": "Tiefes Perforatorgebiet",
          "en": "Deep perforator territory",
          "fa": "قلمرو پرفوراتور عمقی"
        },
        {
          "de": "Hemisensibilität, vertikale Blickparese",
          "en": "Hemisensory loss, vertical gaze palsy",
          "fa": "اختلال حسی نیمه، فلج نگاه عمودی"
        }
      ],
      [
        {
          "de": "Pons",
          "en": "Pons",
          "fa": "پونز"
        },
        {
          "de": "Tiefes Perforatorgebiet",
          "en": "Deep perforator territory",
          "fa": "قلمرو پرفوراتور عمقی"
        },
        {
          "de": "Stecknadelkopf-Pupillen, Tetraparese, Koma",
          "en": "Pinpoint pupils, tetraparesis, coma",
          "fa": "مردمک‌های سوزن‌نقطه‌ای، تتراپارزی، کما"
        }
      ],
      [
        {
          "de": "Kleinhirn",
          "en": "Cerebellum",
          "fa": "مخچه"
        },
        {
          "de": "Tiefes Perforatorgebiet",
          "en": "Deep perforator territory",
          "fa": "قلمرو پرفوراتور عمقی"
        },
        {
          "de": "Ataxie, Schwindel, Erbrechen, Kopfschmerz",
          "en": "Ataxia, dizziness, vomiting, headache",
          "fa": "آتاکسی، سرگیجه، استفراغ، سردرد"
        }
      ],
      [
        {
          "de": "Lobär",
          "en": "Lobar",
          "fa": "لوبار"
        },
        {
          "de": "Weitere Ursachen, z. B. CAA, mitprüfen",
          "en": "Assess other causes, e.g. CAA",
          "fa": "علل دیگر، مانند CAA، نیز بررسی شوند"
        },
        {
          "de": "Fokal-neurologisch je nach Lappen",
          "en": "Focal neurological deficit per lobe",
          "fa": "نقص عصبی کانونی بر حسب لوب"
        }
      ]
    ],
    "spotHeaders": [
      {
        "de": "Merkmal",
        "en": "Feature",
        "fa": "ویژگی"
      },
      {
        "de": "Beschreibung",
        "en": "Description",
        "fa": "توضیح"
      }
    ],
    "spotRows": [
      [
        {
          "de": "Definition",
          "en": "Definition",
          "fa": "تعریف"
        },
        {
          "de": "Punktförmige KM-Anreicherung innerhalb der ICB im CTA",
          "en": "Focal contrast enhancement within the ICH on CTA",
          "fa": "تجمع کنتراست نقطه‌ای داخل ICH در CTA"
        }
      ],
      [
        {
          "de": "Bedeutung",
          "en": "Significance",
          "fa": "اهمیت"
        },
        {
          "de": "Fokaler Extravasationshinweis; kein sicherer Nachweis einer erneuten Blutung",
          "en": "Focal extravasation marker, not certain proof of recurrent bleeding",
          "fa": "نشانهٔ موضعی خروج مادهٔ حاجب؛ نه اثبات قطعی خونریزی مجدد"
        }
      ],
      [
        {
          "de": "Konsequenz",
          "en": "Consequence",
          "fa": "عواقب"
        },
        {
          "de": "Mit erhöhtem Expansionsrisiko assoziiert; keine individuelle Gewissheit",
          "en": "Associated with increased expansion risk, not individual certainty",
          "fa": "مرتبط با افزایش خطر گسترش، نه قطعیت فردی"
        }
      ],
      [
        {
          "de": "Prognose",
          "en": "Prognosis",
          "fa": "پیش‌آگهی"
        },
        {
          "de": "Mit Klinik, Ausgangsvolumen und Verlauf einordnen",
          "en": "Interpret with clinical context, baseline volume and evolution",
          "fa": "همراه زمینهٔ بالینی، حجم اولیه و سیر تفسیر شود"
        }
      ]
    ],
    "spotTitle": {
      "de": "Spot-Sign (CTA)",
      "en": "Spot Sign (CTA)",
      "fa": "علامت اسپات در CTA"
    },
    "locTitle": {
      "de": "Typische Lokalisationen der hypertensiven ICB",
      "en": "Typical locations of hypertensive ICH",
      "fa": "محل‌های معمول ICH فشار خون بالا"
    },
    "morphTitle": {
      "de": "CCT-Morphologie der akuten ICB",
      "en": "CCT morphology of acute ICH",
      "fa": "مورفولوژی CCT در ICH حاد"
    },
    "key": {
      "de": "Tiefe Lage im passenden vaskulären Kontext stützt Perforatorarteriopathie. Form und Ödem sind nicht spezifisch. Unverhältnismäßiges Ödem oder noduläres Restgewebe kann zusätzliche Ursachenabklärung auslösen.",
      "en": "Deep location in a compatible vascular context supports perforator arteriolopathy. Shape and oedema are nonspecific. Disproportionate oedema or nodular residual tissue can prompt additional investigation.",
      "fa": "محل عمقی در زمینهٔ عروقی سازگار از آرتریولوپاتی پرفوراتورها حمایت می‌کند. شکل و ادم اختصاصی نیستند. ادم نامتناسب یا بافت ندولار باقی‌مانده می‌تواند بررسی بیشتر علت را مطرح کند."
    },
    "imageAlt": {
      "de": "Zwei CT-Bilder aus Gehirn.pdf als Lehrvergleich unterschiedlicher Form, Lage und Ödemausprägung.",
      "en": "Two CT images from Gehirn.pdf comparing shape, location and extent of oedema for teaching.",
      "fa": "دو تصویر CT از Gehirn.pdf برای مقایسهٔ آموزشی شکل، محل و میزان ادم."
    },
    "imageCaptionA": {
      "de": "A – PDF-Zuordnung: hypertensive Blutung, irregulär und medial mit wenig Ödem. Die gezeigte Morphologie allein beweist die Ursache nicht.",
      "en": "A — PDF attribution: hypertensive haemorrhage, irregular and medial with little oedema. The depicted morphology alone does not establish the cause.",
      "fa": "A — نسبت‌دادن در PDF: خونریزی ناشی از پرفشاری خون، نامنظم و مدیال با ادم کم. مورفولوژی نشان‌داده‌شده به‌تنهایی علت را اثبات نمی‌کند."
    },
    "imageCaptionB": {
      "de": "B – PDF-Zuordnung: Metastase, rund und peripher mit ausgeprägtem Ödem. Dies ist die Quellenzuordnung, keine aus Form und Ödem allein gesicherte Histologie.",
      "en": "B — PDF attribution: metastasis, rounded and peripheral with prominent oedema. This is the source attribution, not histology established from shape and oedema alone.",
      "fa": "B — نسبت‌دادن در PDF: متاستاز، گرد و محیطی با ادم زیاد. این نسبت‌دادن منبع است، نه بافت‌شناسی اثبات‌شده صرفاً از شکل و ادم."
    }
  },
  "mrt": {
    "title": {
      "de": "Bildgebung: MRT",
      "en": "Imaging: MRI",
      "fa": "تصویربرداری: MRI"
    },
    "lead": {
      "de": "Das MRT liefert die empfindlichsten Zeichen der chronischen Mikroangiopathie: Leukoaraiose, Mikroblutungen (CMBs) und lakunäre Infarkte.",
      "en": "MRI provides the most sensitive signs of chronic microangiopathy: leukoaraiosis, microbleeds (CMBs) and lacunar infarcts.",
      "fa": "MRI حساس‌ترین نشانه‌های میکروآنژیوپاتی مزمن را نشان می‌دهد: لوکوآرائوز، خونریزی‌های میکرو (CMBs) و انفارکت‌های لاکونار."
    },
    "seqHeaders": [
      {
        "de": "Sequenz",
        "en": "Sequence",
        "fa": "سکانس"
      },
      {
        "de": "Befund",
        "en": "Finding",
        "fa": "یافته"
      },
      {
        "de": "Bedeutung",
        "en": "Significance",
        "fa": "اهمیت"
      }
    ],
    "seqRows": [
      [
        {
          "de": "T2 / FLAIR",
          "en": "T2 / FLAIR",
          "fa": "T2 / FLAIR"
        },
        {
          "de": "Periventrikuläre und tiefe WMH (weiß)",
          "en": "Periventricular and deep WMH (bright)",
          "fa": "WMH پریونتریکولار و عمقی (روشن)"
        },
        {
          "de": "WMH-Läsionslast, z. B. nach Fazekas; nicht allein ätiologiespezifisch",
          "en": "WMH burden, e.g. Fazekas grading; not aetiology-specific alone",
          "fa": "بار پرسیگنالی مادهٔ سفید، مثلاً درجه‌بندی فازکاس؛ به‌تنهایی اختصاصی علت نیست"
        }
      ],
      [
        {
          "de": "DWI / ADC",
          "en": "DWI / ADC",
          "fa": "DWI / ADC"
        },
        {
          "de": "Restriktionsmuster (subkortikal, axial meist ≤20 mm)",
          "en": "Restriction pattern (subcortical, usually ≤20 mm axially)",
          "fa": "الگوی محدودیت (زیرقشری، محوری معمولاً ≤۲۰ میلی‌متر)"
        },
        {
          "de": "Akuter lakunärer Infarkt (Perforator)",
          "en": "Acute lacunar infarct (perforator)",
          "fa": "انفارکت لاکونار حاد (پرفوراتور)"
        }
      ],
      [
        {
          "de": "GRE / SWI",
          "en": "GRE / SWI",
          "fa": "GRE / SWI"
        },
        {
          "de": "Rundliche Suszeptibilitätsherde mit Blooming; Mimics mitbeurteilen",
          "en": "Rounded susceptibility foci with blooming; assess mimics",
          "fa": "کانون‌های گرد سوسپتیبیلیتی همراه blooming؛ تقلیدکننده‌ها نیز بررسی شوند"
        },
        {
          "de": "Tiefe Herde in Basalganglien, Thalamus und Hirnstamm stützen tiefe Perforatorerkrankung. Streng lobäre Herde und kortikale superfizielle Siderose stützen CAA. Gemischte Muster und Mimics gesondert prüfen; keine Eins-zu-eins-Diagnose.",
          "en": "Deep foci in basal ganglia, thalamus and brainstem support deep perforator disease. Strictly lobar foci and cortical superficial siderosis support CAA. Evaluate mixed patterns and mimics separately; this is not a one-to-one diagnosis.",
          "fa": "کانون‌های عمقی عقده‌های قاعده‌ای، تالاموس و ساقهٔ مغز از بیماری پرفوراتور عمقی حمایت می‌کنند. کانون‌های کاملاً لوبار و سیدروز سطحی قشری از CAA حمایت می‌کنند. الگوهای مختلط و تقلیدکننده‌ها جداگانه بررسی شوند؛ رابطهٔ تشخیصی یک‌به‌یک نیست."
        }
      ],
      [
        {
          "de": "T1",
          "en": "T1",
          "fa": "T1"
        },
        {
          "de": "Hypointense Höhlen im Marklager / Basalganglien",
          "en": "Hypointense cavities in white matter / basal ganglia",
          "fa": "حفره‌های هایپوانتنس در ماده سفید / بازال گانگلیا"
        },
        {
          "de": "Chronische Lakunen: liquorähnliche Höhlen, keine starre Dreimonatsdefinition",
          "en": "Chronic lacunes: CSF-like cavities, not defined by a fixed three-month threshold",
          "fa": "لاکون‌های مزمن: حفره‌های شبیه مایع، بدون تعریف بر پایهٔ مرز ثابت سه‌ماهه"
        }
      ],
      [
        {
          "de": "T1 Gd",
          "en": "T1 Gd",
          "fa": "T1 Gd"
        },
        {
          "de": "Native und postkontrast-T1 vergleichen; mögliche Gewebeläsion suchen",
          "en": "Compare unenhanced and postcontrast T1; search for possible tissue lesion",
          "fa": "T1 پیش و پس از تزریق مقایسه و ضایعهٔ بافتی احتمالی جست‌وجو شود"
        },
        {
          "de": "Hilft bei Differenzierung Metastase vs. ICB",
          "en": "Helps differentiate metastasis from ICH",
          "fa": "کمک به تمایز متاستاز از ICH"
        }
      ]
    ],
    "fazekasHeaders": [
      {
        "de": "Fazekas-Grad",
        "en": "Fazekas Grade",
        "fa": "درجه Fazekas"
      },
      {
        "de": "Periventrikulär",
        "en": "Periventricular",
        "fa": "پریونتریکولار"
      },
      {
        "de": "Tiefe weiße Substanz",
        "en": "Deep white matter",
        "fa": "ماده سفید عمقی"
      }
    ],
    "fazekasRows": [
      [
        {
          "de": "Grad 0",
          "en": "Grade 0",
          "fa": "درجه ۰"
        },
        {
          "de": "Keine Läsion",
          "en": "No lesion",
          "fa": "بدون ضایعه"
        },
        {
          "de": "Keine Läsion",
          "en": "No lesion",
          "fa": "بدون ضایعه"
        }
      ],
      [
        {
          "de": "Grad 1",
          "en": "Grade 1",
          "fa": "درجه ۱"
        },
        {
          "de": "Caps oder bleistiftdünner Saum",
          "en": "Caps or pencil-thin lining",
          "fa": "کلاهک یا حاشیهٔ بسیار نازک"
        },
        {
          "de": "Gepunktelte Läsionen",
          "en": "Punctate lesions",
          "fa": "ضایعات نقطه‌ای"
        }
      ],
      [
        {
          "de": "Grad 2",
          "en": "Grade 2",
          "fa": "درجه ۲"
        },
        {
          "de": "Glatter Halo",
          "en": "Smooth halo",
          "fa": "هالهٔ صاف"
        },
        {
          "de": "Beginn der Konfluenz",
          "en": "Beginning confluent",
          "fa": "شروع تجمع"
        }
      ],
      [
        {
          "de": "Grad 3",
          "en": "Grade 3",
          "fa": "درجه ۳"
        },
        {
          "de": "Irreguläre Ausdehnung ins tiefe Marklager",
          "en": "Irregular extension into deep white matter",
          "fa": "گسترش نامنظم به مادهٔ سفید عمقی"
        },
        {
          "de": "Großflächig konfluierend",
          "en": "Large confluent areas",
          "fa": "مناطق تجمع وسیع"
        }
      ]
    ],
    "fazekasTitle": {
      "de": "Fazekas-Skala (FLAIR/T2)",
      "en": "Fazekas Scale (FLAIR/T2)",
      "fa": "مقیاس Fazekas (FLAIR/T2)"
    },
    "fazekasImageAlt": {
      "de": "FLAIR-MRT-Beispiele für Fazekas-Grade 1, 2 und 3; die Abbildungen zeigen zunehmende Konfluenz periventrikulärer und tiefer Marklagerhyperintensitäten.",
      "en": "FLAIR MRI examples of Fazekas grades 1, 2 and 3, showing increasing confluence of periventricular and deep white-matter hyperintensities.",
      "fa": "نمونه‌های FLAIR برای درجات ۱، ۲ و ۳ فازکاس؛ تصاویر افزایش پیوستگی هایپراینتنسیتی‌های پری‌ونتریکولار و ماده سفید عمقی را نشان می‌دهند."
    },
    "fazekasImageCaption": {
      "de": "Quelle: Gehirn.pdf, S. 25 (gedruckte S. 24); Bildnachweis B. Di Muzio. Originalausschnitt aus dem bereitgestellten PDF.",
      "en": "Source: Gehirn.pdf, p. 25 (printed p. 24); image credit B. Di Muzio. Cropped from the supplied PDF.",
      "fa": "منبع: Gehirn.pdf، صفحهٔ ۲۵ (شمارهٔ چاپی ۲۴)؛ اعتبار تصویر: B. Di Muzio. برش از PDF ارائه‌شده."
    },
    "key": {
      "de": "WMH, Lakunen und Mikroblutungen sind unterschiedliche Marker kleiner Gefäßerkrankung. Frische Infarkte von chronischen Lakunen trennen; kein obligates oder diagnostisch beweisendes Trias-Modell.",
      "en": "WMH, lacunes and microbleeds are distinct small-vessel disease markers. Separate recent infarcts from chronic lacunes; they do not form an obligatory or diagnostic-proof triad.",
      "fa": "پرسیگنالی مادهٔ سفید، لاکون و میکروخونریزی نشانگرهای متفاوت بیماری عروق کوچک‌اند. انفارکت تازه از لاکون مزمن جدا شود؛ تریاد اجباری یا اثبات‌کنندهٔ تشخیص نیستند."
    }
  },
  "klinik": {
    "title": {
      "de": "Klinik",
      "en": "Clinical Presentation",
      "fa": "تظاهرات بالینی"
    },
    "lead": {
      "de": "Das klinische Bild richtet sich nach der genauen Blutungslokalisation. Lakunäre Syndrome entstehen durch Verschluss einzelner Perforatoren.",
      "en": "The clinical picture depends on the exact bleeding location. Lacunar syndromes arise from occlusion of individual perforators.",
      "fa": "تصویر بالینی به محل دقیق خونریزی بستگی دارد. سندرم‌های لاکونار از انسداد پرفوراتورهای منفرد ناشی می‌شوند."
    },
    "lacunarTitle": {
      "de": "Lakunäre Syndrome",
      "en": "Lacunar Syndromes",
      "fa": "سندرم‌های لاکونار"
    },
    "lacunarItems": [
      {
        "icon": "💪",
        "title": {
          "de": "Pure Motor Hemiparesis",
          "en": "Pure Motor Hemiparesis",
          "fa": "همی‌پارزی خالص حرکتی"
        },
        "text": {
          "de": "Capsula interna (hinterer Schenkel) / Pons. Rein motorisches Defizit ohne Sensibilitätsstörung.",
          "en": "Internal capsule (posterior limb) / pons. Pure motor deficit without sensory loss.",
          "fa": "کپسول داخلی (بازوی خلفی) / پونز. نقص حرکتی خالص بدون اختلال حسی."
        }
      },
      {
        "icon": "🖐️",
        "title": {
          "de": "Pure Sensory Stroke",
          "en": "Pure Sensory Stroke",
          "fa": "سکته حسی خالص"
        },
        "text": {
          "de": "Thalamus (VPL-Kern). Rein sensibles Hemisyndrom ohne motorisches Defizit.",
          "en": "Thalamus (VPL nucleus). Pure hemisensory syndrome without motor deficit.",
          "fa": "تالاموس (هسته VPL). سندرم حسی نیمه خالص بدون نقص حرکتی."
        }
      },
      {
        "icon": "🤸",
        "title": {
          "de": "Ataktische Hemiparese",
          "en": "Ataxic Hemiparesis",
          "fa": "همی‌پارزی آتاکتیک"
        },
        "text": {
          "de": "Ataxie und Parese betreffen dieselbe Körperseite, meist kontralateral zur supratentoriellen oder pontinen Läsion. Das Syndrom lokalisiert nicht allein die Ursache.",
          "en": "Ataxia and weakness involve the same side of the body, usually contralateral to the supratentorial or pontine lesion. The syndrome does not establish the cause alone.",
          "fa": "آتاکسی و ضعف یک سمت بدن را درگیر می‌کنند و معمولاً در سمت مقابل ضایعهٔ فوق‌چادری یا پونتین‌اند. سندرم به‌تنهایی علت را تعیین نمی‌کند."
        }
      },
      {
        "icon": "🗣️",
        "title": {
          "de": "Dysarthrie-Clumsy-Hand-Syndrom",
          "en": "Dysarthria-Clumsy Hand Syndrome",
          "fa": "سندرم دیزآرتری-دست ناشیانه"
        },
        "text": {
          "de": "Dysarthrie mit Ungeschicklichkeit einer Hand; unter anderem bei pontinen oder kapsulären Läsionen.",
          "en": "Dysarthria with clumsiness of one hand, including in pontine or capsular lesions.",
          "fa": "دیس‌آرتری همراه دست‌وپاچلفتی‌شدن یک دست، از جمله در ضایعات پونتین یا کپسولی."
        }
      }
    ],
    "key": {
      "de": "Eine raumfordernde Kleinhirnblutung kann rasch Hirnstamm und Liquorabfluss gefährden. Größe, Ventrikelkompression und Klinik erfordern hier sofortige fachärztliche Beurteilung einer Entlastung; Ursachenabklärung darf diese nicht verzögern. Leitlinien empfehlen bzw. erwägen operative Entfernung bei großen Blutungen und/oder klinischer Verschlechterung, Hirnstammkompression oder obstruktivem Hydrozephalus.",
      "en": "A space-occupying cerebellar haemorrhage can rapidly compromise the brainstem and CSF drainage. Size, ventricular compression and clinical findings here warrant immediate specialist assessment of decompression; aetiologic investigation must not delay it. Guidelines recommend or suggest evacuation for large haemorrhages and/or neurological deterioration, brainstem compression or obstructive hydrocephalus.",
      "fa": "خونریزی فضاگیر مخچه می‌تواند سریعاً ساقهٔ مغز و تخلیهٔ مایع مغزی‌نخاعی را تهدید کند. اندازه، فشردگی بطن و یافته‌های بالینی در اینجا ارزیابی بی‌درنگ تخصصی برای رفع فشار را لازم می‌کنند؛ بررسی علت نباید آن را عقب بیندازد. راهنماها در خونریزی بزرگ و/یا افت عصبی، فشردگی ساقهٔ مغز یا هیدروسفالی انسدادی تخلیهٔ جراحی را توصیه یا مطرح می‌کنند."
    }
  },
  "differenzial": {
    "title": {
      "de": "Differenzialdiagnose der ICB",
      "en": "Differential Diagnosis of ICH",
      "fa": "تشخیص افتراقی ICH"
    },
    "lead": {
      "de": "Die hypertensive ICB muss von anderen Ursachen intrazerebraler Blutungen abgegrenzt werden. Wichtigste Kriterien: Lokalisation, Alter, Vorgeschichte, Blutungsmuster.",
      "en": "Hypertensive ICH must be distinguished from other causes of intracerebral haemorrhage. Key criteria: location, age, history, bleeding pattern.",
      "fa": "ICH فشار خون باید از سایر علل خونریزی داخل مغزی افتراق داده شود. معیارهای کلیدی: محل، سن، سابقه، الگوی خونریزی."
    },
    "ddHeaders": [
      {
        "de": "Diagnose",
        "en": "Diagnosis",
        "fa": "تشخیص"
      },
      {
        "de": "Lokalisation",
        "en": "Location",
        "fa": "محل"
      },
      {
        "de": "Schlüsselmerkmal",
        "en": "Key feature",
        "fa": "ویژگی کلیدی"
      }
    ],
    "ddRows": [
      [
        {
          "de": "Hypertensive ICB",
          "en": "Hypertensive ICH",
          "fa": "ICH فشار خون بالا"
        },
        {
          "de": "Tief: Putamen, Thalamus, Pons, Kleinhirn",
          "en": "Deep: putamen, thalamus, pons, cerebellum",
          "fa": "عمقی: پوتامن، تالاموس، پونز، مخچه"
        },
        {
          "de": "Irregulär, tiefe CMBs in SWI, Hypertonie-Anamnese",
          "en": "Irregular, deep CMBs on SWI, hypertension history",
          "fa": "نامنظم، CMBs عمقی در SWI، سابقه فشار خون"
        }
      ],
      [
        {
          "de": "Zerebrale Amyloidangiopathie (CAA)",
          "en": "Cerebral amyloid angiopathy (CAA)",
          "fa": "آنژیوپاتی آمیلوئید مغزی (CAA)"
        },
        {
          "de": "Lobär (kortikal-subkortikal)",
          "en": "Lobar (cortical-subcortical)",
          "fa": "لوبار (کورتیکال-ساب‌کورتیکال)"
        },
        {
          "de": "Älterer Patient, kortikale CMBs in SWI, Boston-Kriterien",
          "en": "Older patient, cortical CMBs on SWI, Boston criteria",
          "fa": "بیمار مسن‌تر، CMBs کورتیکال در SWI، معیارهای Boston"
        }
      ],
      [
        {
          "de": "Hirnmetastase",
          "en": "Brain metastasis",
          "fa": "متاستاز مغزی"
        },
        {
          "de": "Peripher, kortikal-subkortikal, oft multiple",
          "en": "Peripheral, cortical-subcortical, often multiple",
          "fa": "محیطی، کورتیکال-ساب‌کورتیکال، اغلب متعدد"
        },
        {
          "de": "Rund, ausgeprägtes perifokales Ödem, KM-Enhancement, Tumoranamnese",
          "en": "Round, prominent perilesional oedema, contrast enhancement, tumour history",
          "fa": "گرد، ادم پریفوکال شدید، تقویت پس از تزریق، سابقه تومور"
        }
      ],
      [
        {
          "de": "Kavernom",
          "en": "Cavernoma",
          "fa": "کاورنوم"
        },
        {
          "de": "Überall, oft im Hirnstamm",
          "en": "Anywhere, often brainstem",
          "fa": "همه‌جا، اغلب ساقه مغز"
        },
        {
          "de": "„Popcorn“-Muster in T2 und Hämosiderinsaum; häufig wenig Ödem, bei frischer Einblutung jedoch möglich. MRT zur Abklärung.",
          "en": "Popcorn appearance on T2 with a haemosiderin rim; often little oedema, but oedema may accompany recent haemorrhage. Evaluate with MRI.",
          "fa": "نمای پاپ‌کورن در T2 و حاشیهٔ هموسیدرین؛ اغلب ادم اندک، ولی در خونریزی تازه ادم ممکن است. بررسی با MRI."
        }
      ],
      [
        {
          "de": "AVM-Blutung",
          "en": "AVM haemorrhage",
          "fa": "خونریزی AVM"
        },
        {
          "de": "Variabel, oft lobär",
          "en": "Variable, often lobar",
          "fa": "متغیر، اغلب لوبار"
        },
        {
          "de": "Junger Patient, serpentiginöse Gefäßstrukturen im MRA/CTA, kein Hypertoniehintergrund",
          "en": "Young patient, serpiginous vascular structures on MRA/CTA, no hypertension background",
          "fa": "بیمار جوان، ساختارهای عروقی مارپیچی در MRA/CTA، بدون سابقه فشار خون"
        }
      ]
    ],
    "key": {
      "de": "Verteilung, Klinik und MRT-Morphologie liefern Hinweise. Tiefe Blutung ist nicht automatisch hypertensiv; Form, Ödem oder einzelne Mikroblutungen beweisen keine bestimmte Ursache.",
      "en": "Distribution, clinical context and MRI morphology provide clues. Deep haemorrhage is not automatically hypertensive; shape, oedema or individual microbleeds do not establish a specific cause.",
      "fa": "توزیع، زمینهٔ بالینی و مورفولوژی MRI سرنخ می‌دهند. خونریزی عمقی خودبه‌خود ناشی از پرفشاری خون نیست؛ شکل، ادم یا میکروخونریزی منفرد علت مشخصی را اثبات نمی‌کنند."
    }
  },
  "therapie": {
    "title": {
      "de": "Therapie",
      "en": "Treatment",
      "fa": "درمان"
    },
    "lead": {
      "de": "Die Behandlung der akuten hypertensiven ICB zielt auf Hämatomkontrolle, Hirndrucksenkung und Verhinderung von Rezidiven.",
      "en": "Treatment of acute hypertensive ICH aims at haematoma control, ICP reduction and prevention of recurrence.",
      "fa": "درمان ICH حاد فشار خون بالا به کنترل هماتوم، کاهش فشار داخل جمجمه و جلوگیری از عود هدف دارد."
    },
    "items": [
      {
        "icon": "💉",
        "title": {
          "de": "Blutdruckkontrolle",
          "en": "Blood pressure control",
          "fa": "کنترل فشار خون"
        },
        "text": {
          "de": "Bei leichter bis mittelschwerer spontaner ICB und initial systolisch 150–220 mmHg kann eine gleichmäßige Senkung auf etwa 140 mmHg mit Erhaltung im Bereich 130–150 mmHg erwogen werden. Nicht unter 130 mmHg senken. Bei schwerer ICB oder geplanter Dekompression individuell entscheiden.",
          "en": "For mild-to-moderate spontaneous ICH with initial systolic BP 150–220 mmHg, smooth lowering towards 140 mmHg and maintaining 130–150 mmHg may be reasonable. Do not lower below 130 mmHg. Individualise management in severe ICH or planned decompression.",
          "fa": "در خونریزی خودبه‌خودی خفیف تا متوسط با فشار سیستولیک اولیهٔ ۱۵۰ تا ۲۲۰ میلی‌متر جیوه، می‌توان کاهش یکنواخت تا حدود ۱۴۰ و حفظ فشار در محدودهٔ ۱۳۰ تا ۱۵۰ را در نظر گرفت. فشار را به زیر ۱۳۰ کاهش ندهید. در خونریزی شدید یا جراحی کاهش فشار برنامه‌ریزی‌شده، تصمیم باید فردی باشد."
        }
      },
      {
        "icon": "🔄",
        "title": {
          "de": "Antikoagulanzienwirkung aufheben",
          "en": "Reverse anticoagulation",
          "fa": "معکوس کردن ضد انعقادها"
        },
        "text": {
          "de": "Antikoagulans pausieren und Reversal notfallmäßig nach Wirkstoff planen. VKA: 4-Faktor-PCC (Dosis nach INR, Gewicht und Präparat) plus intravenöses Vitamin K; Dabigatran: Idarucizumab. Bei Apixaban/Rivaroxaban kommt Andexanet alfa bei lebensbedrohlicher oder unkontrollierter Blutung nach individueller Nutzen-Risiko-Abwägung infrage. Es begrenzt Hämatomexpansion, erhöht aber thrombotische Ereignisse; ein Überlebensvorteil ist nicht belegt. Alternativen wie PCC richten sich nach Spezialistenteam und lokalem Protokoll.",
          "en": "Stop anticoagulation and plan emergency reversal by drug. VKA: 4-factor PCC (dose according to INR, weight, and product) plus intravenous vitamin K; dabigatran: idarucizumab. For apixaban/rivaroxaban, andexanet alfa is an option for life-threatening or uncontrolled bleeding after individual benefit-risk assessment. It limits haematoma expansion but increases thrombotic events; a survival benefit has not been established. Alternatives such as PCC follow specialist advice and local protocols.",
          "fa": "ضدانعقاد قطع و خنثی‌سازی اورژانسی بر اساس دارو برنامه‌ریزی شود. آنتاگونیست ویتامین K: PCC چهارعاملی با دوز متناسب با INR، وزن و فرآورده، همراه ویتامین K وریدی؛ دابیگاتران: ایداروسیزوماب. در آپیکسابان/ریواروکسابان، اندکسانت آلفا برای خونریزی تهدیدکنندهٔ حیات یا کنترل‌نشده پس از سنجش فردی سود و خطر قابل طرح است. گسترش هماتوم را کاهش می‌دهد ولی رویدادهای ترومبوتیک را افزایش می‌دهد؛ سود بقا اثبات نشده است. گزینه‌هایی مانند PCC بر اساس نظر تیم متخصص و پروتکل مرکز انتخاب می‌شوند."
        }
      },
      {
        "icon": "🏥",
        "title": {
          "de": "Neurochirurgische Intervention",
          "en": "Neurosurgical intervention",
          "fa": "مداخله جراحی مغز"
        },
        "text": {
          "de": "Neurologische Verschlechterung, Hirnstammkompression, obstruktiver Hydrozephalus oder eine große Blutung. AHA/ASA2022 nennt≥15 ml als eine Operationsindikation; ESO/EANS2025 schlägt bei>15 ml eine Evakuation zur Überlebensverbesserung vor. Entscheidung und Technik werden akut im Spezialistenteam festgelegt.",
          "en": "Neurological deterioration, brainstem compression, obstructive hydrocephalus or a large haemorrhage. AHA/ASA2022 includes≥15 mL as an evacuation indication; ESO/EANS2025 suggests evacuation at>15 mL to improve survival. The specialist team determines acute management and technique.",
          "fa": "افت عصبی، فشردگی ساقهٔ مغز، هیدروسفالی انسدادی یا خونریزی بزرگ. AHA/ASA2022 حجم≥۱۵ میلی‌لیتر را یکی از اندیکاسیون‌های تخلیه می‌داند؛ ESO/EANS2025 تخلیه در حجم>۱۵ میلی‌لیتر را برای بهبود بقا مطرح می‌کند. تصمیم و روش به‌طور فوری در تیم تخصصی تعیین می‌شوند."
        }
      },
      {
        "icon": "💊",
        "title": {
          "de": "Osmotherapie / ICP-Management",
          "en": "Osmotherapy / ICP management",
          "fa": "اسمتراپی / مدیریت ICP"
        },
        "text": {
          "de": "Erhöhter Hirndruck oder Hydrozephalus erfordert neurointensivmedizinische und gegebenenfalls neurochirurgische Behandlung. Hyperosmolare Bolustherapie kann zur vorübergehenden ICP-Senkung erwogen werden; keine prophylaktische Dauergabe oder pauschale Konzentrations-/Dosierungsregel.",
          "en": "Elevated ICP or hydrocephalus requires neurocritical and, where appropriate, neurosurgical care. Hyperosmolar bolus therapy may be considered for transient ICP reduction; do not infer prophylactic continuous administration or a universal concentration/dose rule.",
          "fa": "افزایش فشار داخل جمجمه یا هیدروسفالی به مراقبت ویژهٔ عصبی و در صورت لزوم درمان جراحی مغز و اعصاب نیاز دارد. بولوس هیپراسمولار ممکن است برای کاهش موقت فشار مطرح شود؛ تجویز مداوم پیشگیرانه یا قاعدهٔ عمومی غلظت/دوز نتیجه نمی‌شود."
        }
      },
      {
        "icon": "🛡️",
        "title": {
          "de": "Sekundärprophylaxe",
          "en": "Secondary prevention",
          "fa": "پیشگیری ثانویه"
        },
        "text": {
          "de": "Langfristige Blutdruckkontrolle und Lebensstilanpassung sind wichtig. Statine und antithrombotische Medikamente nach ICB erfordern individuelle Indikations- und Nutzen-Risiko-Abwägung; kein pauschales Regime allein aufgrund von WMH oder einer alten Blutung.",
          "en": "Long-term blood-pressure control and lifestyle measures are important. Statins and antithrombotic drugs after ICH require individual indication and benefit–risk assessment, not a blanket regimen based only on WMH or an old haemorrhage.",
          "fa": "کنترل طولانی‌مدت فشار خون و اصلاح سبک زندگی مهم‌اند. استاتین و داروی ضدترومبوتیک پس از خونریزی داخل مغز به سنجش فردی اندیکاسیون و سود-زیان نیاز دارند، نه رژیم عمومی صرفاً بر اساس پرسیگنالی مادهٔ سفید یا خونریزی قدیمی."
        }
      }
    ],
    "cave": {
      "de": "Keine Thrombolyse (rtPA) bei intrazerebraler Blutung! Bei Antikoagulanzien-assoziierter ICB sofortige Reversal-Therapie anstreben.",
      "en": "No thrombolysis (rtPA) in intracerebral haemorrhage! In anticoagulant-associated ICH, aim for immediate reversal therapy.",
      "fa": "تروم‌بولیز (rtPA) در خونریزی داخل مغزی ممنوع! در ICH مرتبط با ضد انعقادها، درمان معکوس فوری انجام دهید."
    }
  },
  "takehome": {
    "title": {
      "de": "Take-home",
      "en": "Take-home",
      "fa": "جمع‌بندی"
    },
    "lead": {
      "de": "Die fünf wichtigsten Punkte zur hypertensiven Mikroangiopathie.",
      "en": "The five key points on hypertensive microangiopathy.",
      "fa": "پنج نکته مهم درباره میکروآنژیوپاتی فشار خون."
    },
    "items": [
      {
        "title": {
          "de": "Zwei Manifestationen",
          "en": "Two manifestations",
          "fa": "دو تظاهر"
        },
        "text": {
          "de": "Frische kleine subkortikale Infarkte, chronische Lakunen und WMH sowie tiefe Mikroblutungen oder größere tiefe Blutungen. Kein einzelner Marker beweist Hypertonie als Ursache.",
          "en": "Recent small subcortical infarcts, chronic lacunes and WMH, alongside deep microbleeds or larger deep haemorrhages. No single marker establishes hypertension as the cause.",
          "fa": "انفارکت‌های کوچک زیرقشری تازه، لاکون‌های مزمن و پرسیگنالی مادهٔ سفید، همراه میکروخونریزی‌های عمقی یا خونریزی‌های عمقی بزرگ‌تر. هیچ نشانگر منفردی پرفشاری خون را به‌عنوان علت اثبات نمی‌کند."
        }
      },
      {
        "title": {
          "de": "Verteilung als Hinweis",
          "en": "Distribution as a clue",
          "fa": "توزیع به‌عنوان سرنخ"
        },
        "text": {
          "de": "Basalganglien, Thalamus und Pons; auch Kleinhirnblutungen können dazugehören. Verteilung und weitere Marker gemeinsam bewerten, ohne feste Ortsprozentsätze oder einen sicheren Ätiologienachweis aus der Lage.",
          "en": "Basal ganglia, thalamus and pons; cerebellar haemorrhage may also occur. Assess distribution and other markers together without fixed location percentages or certainty of aetiology from location.",
          "fa": "عقده‌های قاعده‌ای، تالاموس و پونس؛ خونریزی مخچه نیز ممکن است دیده شود. توزیع و نشانگرهای دیگر با هم بررسی شوند، بدون درصد ثابت محل یا قطعیت علت صرفاً بر اساس مکان."
        }
      },
      {
        "title": {
          "de": "Spot-Sign im CTA",
          "en": "Spot sign on CTA",
          "fa": "علامت اسپات (Spot sign) در CTA"
        },
        "text": {
          "de": "Was: fokaler Kontrastmittelpool im/am Hämatom\nWo: CTA (nicht im nativen CT)\nBedeutung: mit erhöhtem Expansionsrisiko assoziiert; keine sichere Prognose",
          "en": "What: focal contrast pooling within/at the haematoma\nWhere: CTA (not NCCT)\nSignificance: associated with increased expansion risk; not a certain prognosis",
          "fa": "چیست: تجمع کانونی ماده حاجب درون/حاشیهٔ هماتوم\nکجا: CTA (نه CT بدون کنتراست)\nاهمیت: مرتبط با افزایش خطر گسترش؛ پیش‌بینی قطعی نیست"
        }
      },
      {
        "title": {
          "de": "Unterschiedliche MRT-Marker",
          "en": "Distinct MRI markers",
          "fa": "نشانگرهای متفاوت MRI"
        },
        "text": {
          "de": "WMH, Lakunen und Mikroblutungen sind unterschiedliche Marker kleiner Gefäßerkrankung. Frische Infarkte von chronischen Lakunen trennen; kein obligates oder diagnostisch beweisendes Trias-Modell.",
          "en": "WMH, lacunes and microbleeds are distinct small-vessel disease markers. Separate recent infarcts from chronic lacunes; they do not form an obligatory or diagnostic-proof triad.",
          "fa": "پرسیگنالی مادهٔ سفید، لاکون و میکروخونریزی نشانگرهای متفاوت بیماری عروق کوچک‌اند. انفارکت تازه از لاکون مزمن جدا شود؛ تریاد اجباری یا اثبات‌کنندهٔ تشخیص نیستند."
        }
      },
      {
        "title": {
          "de": "Therapie-Notfall",
          "en": "Treatment emergency",
          "fa": "اورژانس درمانی"
        },
        "text": {
          "de": "Akute Blutung rasch im Spezialistenteam behandeln. Blutdruck, Antikoagulation und raumfordernde Wirkung getrennt beurteilen; bei bedrohlicher Kleinhirnblutung die neurochirurgische Beurteilung nicht verzögern.",
          "en": "Treat acute haemorrhage promptly with the specialist team. Assess blood pressure, anticoagulation and mass effect separately; do not delay neurosurgical assessment of threatening cerebellar haemorrhage.",
          "fa": "خونریزی حاد سریعاً در تیم تخصصی درمان شود. فشار خون، ضدانعقاد و اثر فضاگیر جداگانه بررسی شوند؛ در خونریزی تهدیدکنندهٔ مخچه ارزیابی جراحی مغز و اعصاب به تأخیر نیفتد."
        }
      }
    ]
  },
  "learningGoals": [
    {
      "id": "hma-pattern",
      "text": {
        "de": "Gefäßkontext aus Lage, Blutungsmarkern und Begleitbefunden vorsichtig einordnen.",
        "en": "Interpret vascular context cautiously using location, haemorrhagic markers and associated findings.",
        "fa": "زمینهٔ عروقی را با احتیاط بر اساس محل، نشانگرهای خونریزی و یافته‌های همراه تفسیر کنید."
      },
      "questionIds": [
        "hma-de-hma-01",
        "hma-de-hma-04",
        "hma-de-hma-05",
        "hma-de-hma-08"
      ],
      "cardIds": [
        "hma-01-def",
        "hma-02-lipohyal",
        "hma-03-loci",
        "hma-04-cct-morph",
        "hma-07-cmbs",
        "hma-11-dd-icb"
      ]
    },
    {
      "id": "hma-wmh-infarct",
      "text": {
        "de": "Frischen kleinen subkortikalen Infarkt, chronische Lakune und Fazekas-Läsionslast unterscheiden.",
        "en": "Distinguish recent small subcortical infarct, chronic lacune and Fazekas lesion burden.",
        "fa": "انفارکت کوچک زیرقشری تازه، لاکون مزمن و بار ضایعهٔ فازکاس را از هم جدا کنید."
      },
      "questionIds": [
        "hma-de-hma-06",
        "hma-de-hma-07",
        "hma-de-hma-11",
        "hma-de-hma-12"
      ],
      "cardIds": [
        "hma-06-fazekas",
        "hma-08-lakunen"
      ]
    },
    {
      "id": "hma-expansion",
      "text": {
        "de": "Spot-Sign als Risikomarker erkennen, ohne sichere Expansion abzuleiten.",
        "en": "Recognise the spot sign as a risk marker without assuming certain expansion.",
        "fa": "Spot sign را به‌عنوان نشانگر خطر شناسایی کنید، بدون فرض گسترش قطعی."
      },
      "questionIds": [
        "hma-de-hma-02"
      ],
      "cardIds": [
        "hma-05-spotsign"
      ]
    },
    {
      "id": "hma-urgent",
      "text": {
        "de": "Zeitkritische Kleinhirn- und VKA-Blutung erkennen und individuelle Prognosefaktoren benennen.",
        "en": "Recognise time-critical cerebellar and VKA-associated haemorrhage and state individual prognostic factors.",
        "fa": "خونریزی زمان‌حساس مخچه و مرتبط با آنتاگونیست ویتامین K را شناسایی و عوامل فردی پیش‌آگهی را بیان کنید."
      },
      "questionIds": [
        "hma-de-hma-03",
        "hma-de-hma-09",
        "hma-de-hma-10"
      ],
      "cardIds": [
        "hma-09-pons-klinik",
        "hma-10-kleinhirn-op",
        "hma-12-reversal"
      ]
    }
  ]
}

// ─── MCQ Seeds ────────────────────────────────────────────────────────────────

const HMA_QUESTION_SEEDS = [
  {
    "id": "hma-01",
    "question": {
      "de": "Bei langjähriger Hypertonie sollen Blutung und weitere MRT-Marker gemeinsam eingeordnet werden. Welche Verteilung unterstützt am ehesten die Erkrankung tiefer Perforatoren?",
      "en": "In longstanding hypertension, haemorrhage and other MRI markers are assessed together. Which distribution most strongly supports deep perforator disease?",
      "fa": "در پرفشاری خون طولانی‌مدت، خونریزی و سایر نشانگرهای MRI با هم بررسی می‌شوند. کدام توزیع بیشتر از بیماری پرفوراتورهای عمقی حمایت می‌کند؟"
    },
    "options": [
      {
        "de": "Putaminale Blutung mit weiteren tiefen Mikroblutungen",
        "en": "Putaminal haemorrhage with additional deep microbleeds",
        "fa": "خونریزی پوتامن همراه میکروخونریزی‌های عمقی دیگر"
      },
      {
        "de": "Streng lobäre Mikroblutungen mit kortikaler superfizieller Siderose",
        "en": "Strictly lobar microbleeds with cortical superficial siderosis",
        "fa": "میکروخونریزی‌های کاملاً لوبار همراه سیدروز سطحی قشری"
      },
      {
        "de": "Parasagittale Blutung mit thrombosiertem Sinus sagittalis superior",
        "en": "Parasagittal haemorrhage with superior sagittal sinus thrombosis",
        "fa": "خونریزی پاراساژیتال همراه ترومبوز سینوس ساژیتال فوقانی"
      },
      {
        "de": "Blutung an einem kontrastaufnehmenden kortikalen Knoten",
        "en": "Haemorrhage associated with an enhancing cortical nodule",
        "fa": "خونریزی همراه ندول قشری جاذب مادهٔ حاجب"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Tiefe Blutungen und Mikroblutungen stützen eine Arteriolopathie tiefer Perforatoren. Das Verteilungsmuster wird mit Klinik und weiteren Befunden kombiniert; es beweist die Ursache nicht allein. Feste Ortsprozentsätze werden nicht als allgemeine Regel verwendet.",
      "en": "Deep haemorrhages and microbleeds support deep perforator arteriolopathy. Integrate distribution with clinical context and other findings; it does not establish the cause alone. Fixed location percentages are not used as a universal rule.",
      "fa": "خونریزی‌ها و میکروخونریزی‌های عمقی از آرتریولوپاتی پرفوراتورهای عمقی حمایت می‌کنند. توزیع با زمینهٔ بالینی و سایر یافته‌ها ترکیب می‌شود و به‌تنهایی علت را اثبات نمی‌کند. درصدهای ثابت محل به‌عنوان قاعدهٔ عمومی به کار نمی‌روند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Dieses streng lobäre Muster lenkt stärker auf CAA; den vollständigen Kriterienrahmen prüfen.",
        "en": "This strictly lobar pattern points more strongly toward CAA; assess the full criteria framework.",
        "fa": "این الگوی کاملاً لوبار بیشتر CAA را مطرح می‌کند؛ چارچوب کامل معیارها بررسی شود."
      },
      "C": {
        "de": "Die begleitende Sinusthrombose lenkt auf eine venöse Ursache der Blutung.",
        "en": "Associated sinus thrombosis points toward a venous cause of haemorrhage.",
        "fa": "ترومبوز سینوس همراه بیشتر علت وریدی خونریزی را مطرح می‌کند."
      },
      "D": {
        "de": "Ein kontrastaufnehmender Knoten fordert eine gezielte Abklärung einer zugrunde liegenden Gewebeläsion.",
        "en": "An enhancing nodule calls for targeted investigation of an underlying tissue lesion.",
        "fa": "ندول جاذب مادهٔ حاجب نیازمند بررسی هدفمند ضایعهٔ بافتی زمینه‌ای است."
      }
    },
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407; https://pmc.ncbi.nlm.nih.gov/articles/PMC3714437/"
  },
  {
    "id": "hma-02",
    "question": {
      "de": "In einem akuten Hämatom liegt auf CTA ein kleiner Kontrastmittelpool, der im Nativ-CT fehlt und keine erkennbare Verbindung zu einem Gefäß hat. Welche Einordnung passt am besten?",
      "en": "CTA shows a small contrast pool within an acute haematoma, absent on unenhanced CT and without an identifiable vessel connection. Which interpretation fits best?",
      "fa": "CTA تجمع کوچک مادهٔ حاجب را درون هماتوم حاد نشان می‌دهد که در CT بدون تزریق وجود ندارد و ارتباط عروقی مشخصی ندارد. کدام تفسیر مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "CTA-Spot-Sign als fokaler Extravasationshinweis",
        "en": "CTA spot sign indicating focal extravasation",
        "fa": "Spot sign در CTA به‌عنوان سرنخ خروج کانونی مادهٔ حاجب"
      },
      {
        "de": "Intrahämatomale Verkalkung",
        "en": "Intrahaematoma calcification",
        "fa": "کلسیفیکاسیون داخل هماتوم"
      },
      {
        "de": "Natives Swirl Sign",
        "en": "Unenhanced-CT swirl sign",
        "fa": "Swirl sign در CT بدون تزریق"
      },
      {
        "de": "Durch das Hämatom ziehendes kontrastiertes Gefäß",
        "en": "An enhancing vessel traversing the haematoma",
        "fa": "رگ حاوی مادهٔ حاجب که از هماتوم عبور می‌کند"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Ein neu sichtbarer fokaler Kontrastpool ohne Gefäßkontinuität passt zum Spot Sign. Es ist mit erhöhtem Expansionsrisiko assoziiert; Ausprägung und Vorhersage hängen unter anderem vom Aufnahmezeitpunkt ab. Ein positives Zeichen garantiert keine Expansion.",
      "en": "A new focal contrast pool without vessel continuity fits a spot sign. It is associated with increased expansion risk; appearance and prediction depend partly on acquisition timing. A positive sign does not guarantee expansion.",
      "fa": "تجمع کانونی جدید مادهٔ حاجب بدون تداوم عروقی با Spot sign سازگار است. این علامت با افزایش خطر گسترش همراه است؛ نما و ارزش پیش‌بینی تا حدی به زمان تصویربرداری بستگی دارند. مثبت‌بودن علامت گسترش را قطعی نمی‌کند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Kalk sollte bereits im korrespondierenden Nativbild sichtbar sein; der Fall beschreibt eine erst nach Kontrastmittelgabe auftretende Verdichtung.",
        "en": "Calcium should be visible on the corresponding unenhanced scan; the vignette describes attenuation appearing after contrast administration.",
        "fa": "کلسیم باید در تصویر متناظر بدون تزریق دیده شود؛ سناریو افزایش دانسیته‌ای را توصیف می‌کند که پس از تزریق پدیدار شده است."
      },
      "C": {
        "de": "Swirl ist ein Nativ-CT-Heterogenitätszeichen und kein neu auftretender Kontrastmittelpool.",
        "en": "Swirl is an unenhanced-CT heterogeneity sign rather than a newly appearing contrast pool.",
        "fa": "Swirl نشانهٔ ناهمگنی در CT بدون تزریق است، نه تجمع جدید مادهٔ حاجب."
      },
      "D": {
        "de": "Die Kontinuität über benachbarte Schichten und eine Verbindung zum Gefäßbaum sprechen für ein Gefäß-Mimic; diese fehlen im Fall.",
        "en": "Continuity across slices and connection to the vascular tree favour a vessel mimic; these are absent in the vignette.",
        "fa": "تداوم در برش‌های مجاور و اتصال به درخت عروقی بیشتر به نفع رگِ تقلیدکننده است؛ این موارد در سناریو وجود ندارند."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/17322083/"
  },
  {
    "id": "hma-03",
    "question": {
      "de": "Bei akuter Ataxie und Erbrechen zeigt das CT eine 18-ml-Kleinhirnblutung mit Einengung des vierten Ventrikels. Welche Priorisierung ist angemessen?",
      "en": "In acute ataxia and vomiting, CT shows an 18-mL cerebellar haemorrhage narrowing the fourth ventricle. Which priority is appropriate?",
      "fa": "در آتاکسی حاد و استفراغ، CT خونریزی ۱۸ میلی‌لیتری مخچه با تنگ‌شدن بطن چهارم نشان می‌دهد. کدام اولویت مناسب است؟"
    },
    "options": [
      {
        "de": "Dringende neurochirurgische Beurteilung parallel zur Akutstabilisierung",
        "en": "Urgent neurosurgical assessment alongside acute stabilisation",
        "fa": "ارزیابی فوری جراحی مغز و اعصاب هم‌زمان با پایدارسازی حاد"
      },
      {
        "de": "Zunächst elektive kontrastverstärkte MRT zur Ursachensuche",
        "en": "Begin with elective contrast-enhanced MRI for aetiologic evaluation",
        "fa": "ابتدا MRI انتخابی با تزریق برای بررسی علت"
      },
      {
        "de": "Zunächst komplette Katheterangiographie vor neurochirurgischer Rücksprache",
        "en": "Complete catheter angiography before neurosurgical consultation",
        "fa": "تکمیل آنژیوگرافی کاتتری پیش از مشاورهٔ جراحی مغز و اعصاب"
      },
      {
        "de": "Routinemäßige Verlaufskontrolle am Folgetag als nächste Maßnahme",
        "en": "Routine next-day follow-up imaging as the next measure",
        "fa": "تصویربرداری پیگیری معمول در روز بعد به‌عنوان اقدام بعدی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Eine raumfordernde Kleinhirnblutung kann rasch Hirnstamm und Liquorabfluss gefährden. Größe, Ventrikelkompression und Klinik erfordern hier sofortige fachärztliche Beurteilung einer Entlastung; Ursachenabklärung darf diese nicht verzögern. Leitlinien empfehlen bzw. erwägen operative Entfernung bei großen Blutungen und/oder klinischer Verschlechterung, Hirnstammkompression oder obstruktivem Hydrozephalus.",
      "en": "A space-occupying cerebellar haemorrhage can rapidly compromise the brainstem and CSF drainage. Size, ventricular compression and clinical findings here warrant immediate specialist assessment of decompression; aetiologic investigation must not delay it. Guidelines recommend or suggest evacuation for large haemorrhages and/or neurological deterioration, brainstem compression or obstructive hydrocephalus.",
      "fa": "خونریزی فضاگیر مخچه می‌تواند سریعاً ساقهٔ مغز و تخلیهٔ مایع مغزی‌نخاعی را تهدید کند. اندازه، فشردگی بطن و یافته‌های بالینی در اینجا ارزیابی بی‌درنگ تخصصی برای رفع فشار را لازم می‌کنند؛ بررسی علت نباید آن را عقب بیندازد. راهنماها در خونریزی بزرگ و/یا افت عصبی، فشردگی ساقهٔ مغز یا هیدروسفالی انسدادی تخلیهٔ جراحی را توصیه یا مطرح می‌کنند."
    },
    "wrongExplanations": {
      "B": {
        "de": "MRT kann später bei der Ursachenklärung helfen, darf die dringende Beurteilung des posterioren Masseneffekts nicht verzögern.",
        "en": "MRI can later assist aetiologic evaluation but must not delay urgent assessment of posterior-fossa mass effect.",
        "fa": "MRI بعداً می‌تواند به بررسی علت کمک کند، اما نباید ارزیابی فوری اثر فضاگیر حفرهٔ خلفی را عقب بیندازد."
      },
      "C": {
        "de": "Eine Gefäßabklärung kann wichtig sein, wird aber mit der Akutversorgung abgestimmt und nicht vor eine zeitkritische neurochirurgische Beurteilung gestellt.",
        "en": "Vascular investigation may be important but is coordinated with acute care rather than placed before time-critical neurosurgical assessment.",
        "fa": "بررسی عروقی ممکن است مهم باشد، اما با مراقبت حاد هماهنگ می‌شود و بر ارزیابی زمان‌حساس جراحی مغز و اعصاب مقدم نیست."
      },
      "D": {
        "de": "Das beschriebene Risiko rechtfertigt kein Warten auf eine routinemäßige Kontrolle am nächsten Tag.",
        "en": "The described risk does not justify waiting for routine next-day imaging.",
        "fa": "خطر توصیف‌شده انتظار برای تصویربرداری معمول روز بعد را توجیه نمی‌کند."
      }
    },
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407; https://pmc.ncbi.nlm.nih.gov/articles/PMC12098356/"
  },
  {
    "id": "hma-04",
    "question": {
      "de": "Bei tiefer Blutung und chronischen Zeichen einer Erkrankung kleiner Hirngefäße: Welche Gefäßveränderung passt am ehesten zur hypertensiven Arteriolopathie?",
      "en": "With deep haemorrhage and chronic cerebral small-vessel disease markers, which vascular change best fits hypertensive arteriolopathy?",
      "fa": "در خونریزی عمقی همراه نشانگرهای مزمن بیماری عروق کوچک مغز، کدام تغییر عروقی بیشتر با آرتریولوپاتی ناشی از پرفشاری خون سازگار است؟"
    },
    "options": [
      {
        "de": "Arteriolosklerotische/lipohyalinotische Schädigung kleiner tiefer Perforatoren",
        "en": "Arteriolosclerotic/lipohyalinotic injury of small deep perforators",
        "fa": "آسیب آرتریولواسکلروتیک/لیپوهیالینوتیک پرفوراتورهای کوچک عمقی"
      },
      {
        "de": "Amyloidablagerung überwiegend in kortikalen und leptomeningealen Gefäßen",
        "en": "Amyloid deposition predominantly in cortical and leptomeningeal vessels",
        "fa": "رسوب آمیلوئید عمدتاً در عروق قشری و لپتومننژیال"
      },
      {
        "de": "Atherosklerotische Plaque einer großen zervikalen Arterie",
        "en": "Atherosclerotic plaque in a large cervical artery",
        "fa": "پلاک آترواسکلروتیک در شریان بزرگ گردنی"
      },
      {
        "de": "Thrombotischer Verschluss eines duralen venösen Sinus",
        "en": "Thrombotic occlusion of a dural venous sinus",
        "fa": "انسداد ترومبوتیک سینوس وریدی دورال"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Die Erkrankung betrifft kleine penetrierende Arterien und kann ischämische sowie hämorrhagische Läsionen verursachen. Ein lineares Obligatmodell aus Lipohyalinose, Mikroaneurysma und Blutung ist dafür nicht erforderlich.",
      "en": "The disease affects small penetrating arteries and can produce both ischaemic and haemorrhagic lesions. This does not require an obligatory linear sequence of lipohyalinosis, microaneurysm and haemorrhage.",
      "fa": "بیماری عروق نافذ کوچک را درگیر می‌کند و می‌تواند ضایعات ایسکمیک و خونریزی‌دهنده ایجاد کند. وجود توالی اجباری و خطی لیپوهیالینوز، میکروآنوریسم و خونریزی برای آن لازم نیست."
    },
    "wrongExplanations": {
      "B": {
        "de": "Diese Verteilung ist für CAA charakteristisch und betrifft ein anderes Gefäßkompartiment.",
        "en": "This distribution is characteristic of CAA and involves a different vascular compartment.",
        "fa": "این توزیع مشخصهٔ CAA است و بخش عروقی دیگری را درگیر می‌کند."
      },
      "C": {
        "de": "Eine Plaque einer großen Arterie kann embolische oder hämodynamische Infarkte verursachen, beschreibt aber nicht die gesuchte kleine Perforatorarteriopathie.",
        "en": "Large-artery plaque can cause embolic or haemodynamic infarcts but does not describe the small perforator arteriolopathy sought.",
        "fa": "پلاک شریان بزرگ می‌تواند انفارکت آمبولیک یا همودینامیک ایجاد کند، اما آرتریولوپاتی پرفوراتور کوچک مورد نظر نیست."
      },
      "D": {
        "de": "Eine Sinusthrombose kann venöse Stauung und hämorrhagische Infarkte verursachen; sie ist ein anderer Mechanismus.",
        "en": "Sinus thrombosis can cause venous congestion and haemorrhagic infarction; it is a different mechanism.",
        "fa": "ترومبوز سینوس می‌تواند احتقان وریدی و انفارکت خونریزی‌دهنده ایجاد کند و مکانیسم دیگری است."
      }
    },
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407; https://pmc.ncbi.nlm.nih.gov/articles/PMC3714437/"
  },
  {
    "id": "hma-05",
    "question": {
      "de": "Bei einer 68-jährigen Person mit langjähriger Hypertonie zeigen SWI mehrere rundliche Blooming-Herde in Basalganglien, Thalami und Pons, zusätzlich bestehen Lakunen. Ein relevantes Trauma ist nicht bekannt. Welche Einordnung passt am besten?",
      "en": "In a 68-year-old with longstanding hypertension, SWI shows multiple rounded blooming foci in the basal ganglia, thalami and pons, with additional lacunes. There is no relevant trauma history. Which interpretation fits best?",
      "fa": "در فرد ۶۸ ساله با پرفشاری خون طولانی‌مدت، SWI چند کانون گرد با blooming در عقده‌های قاعده‌ای، تالاموس‌ها و پونس نشان می‌دهد و لاکون نیز وجود دارد. سابقهٔ ضربهٔ مرتبط وجود ندارد. کدام تفسیر مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Tiefe Mikroblutungen bei Arteriolopathie kleiner Perforatoren",
        "en": "Deep microbleeds in small perforator arteriolopathy",
        "fa": "میکروخونریزی‌های عمقی در آرتریولوپاتی پرفوراتورهای کوچک"
      },
      {
        "de": "Streng lobäres Blutungsmuster einer CAA",
        "en": "Strictly lobar haemorrhagic pattern of CAA",
        "fa": "الگوی خونریزی کاملاً لوبار در CAA"
      },
      {
        "de": "Multiple Kavernome als führende Einordnung",
        "en": "Multiple cavernomas as the leading interpretation",
        "fa": "کاورنوم‌های متعدد به‌عنوان تفسیر اصلی"
      },
      {
        "de": "Hämorrhagische diffuse axonale Verletzung",
        "en": "Haemorrhagic diffuse axonal injury",
        "fa": "آسیب آکسونی منتشر خونریزی‌دهنده"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Rundliche Suszeptibilitätsherde in tiefen Perforatorgebieten zusammen mit Lakunen und vaskulärer Anamnese stützen tiefe Mikroangiopathie. Mimics und andere Ursachen bleiben zu prüfen; Verteilung ist ein Hinweis und kein alleiniger ätiologischer Beweis.",
      "en": "Rounded susceptibility foci in deep perforator territories with lacunes and vascular history support deep small-vessel disease. Assess mimics and alternative causes; distribution is a clue rather than sole proof of aetiology.",
      "fa": "کانون‌های گرد سوسپتیبیلیتی در قلمروهای پرفوراتور عمقی همراه لاکون و سابقهٔ عروقی از بیماری عروق کوچک عمقی حمایت می‌کنند. تقلیدکننده‌ها و علل دیگر نیز بررسی شوند؛ توزیع سرنخ است، نه اثبات مستقل علت."
    },
    "wrongExplanations": {
      "B": {
        "de": "Die Herde liegen tief und nicht streng lobär. Ein gemischtes Muster wäre getrennt zu bewerten.",
        "en": "The foci are deep rather than strictly lobar. A mixed pattern requires separate assessment.",
        "fa": "کانون‌ها عمقی‌اند، نه کاملاً لوبار. الگوی مختلط به ارزیابی جداگانه نیاز دارد."
      },
      "C": {
        "de": "Kavernome sind ein Mimic; charakteristische Mischsignale, Familienanamnese und Gesamtmuster wären zu prüfen. Hier passt die Gesamtkonstellation eher zur kleinen Gefäßerkrankung.",
        "en": "Cavernomas are a mimic; assess characteristic mixed signal, family history and overall pattern. The constellation here better fits small-vessel disease.",
        "fa": "کاورنوم تقلیدکننده است؛ سیگنال مختلط مشخصه، سابقهٔ خانوادگی و کل الگو باید بررسی شوند. مجموعهٔ اینجا بیشتر با بیماری عروق کوچک سازگار است."
      },
      "D": {
        "de": "Eine diffuse axonale Verletzung braucht einen passenden Traumakontext und typische Verletzungsverteilung; diese fehlen hier.",
        "en": "Diffuse axonal injury requires compatible trauma and injury distribution, which are absent here.",
        "fa": "آسیب آکسونی منتشر به زمینهٔ ضربه و توزیع متناسب آسیب نیاز دارد که اینجا وجود ندارند."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3714437/; https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "id": "hma-06",
    "question": {
      "de": "Was beschreibt die Fazekas-Skala?",
      "en": "What does the Fazekas scale describe?",
      "fa": "مقیاس Fazekas چه چیزی را توصیف می‌کند؟"
    },
    "options": [
      {
        "de": "Ausmaß der periventrikulären und tiefen Marklager-WMH im MRT",
        "en": "Extent of periventricular and deep white matter WMH on MRI",
        "fa": "میزان WMH پریونتریکولار و ماده سفید عمقی در MRI"
      },
      {
        "de": "Schweregrad der hypertensiven ICB nach Volumen",
        "en": "Severity of hypertensive ICH by volume",
        "fa": "شدت ICH فشار خون بالا بر اساس حجم"
      },
      {
        "de": "Anzahl der Mikroblutungen im SWI",
        "en": "Number of microbleeds on SWI",
        "fa": "تعداد خونریزی‌های میکرو در SWI"
      },
      {
        "de": "Stenosegrad der intrazerebralen Arterien",
        "en": "Degree of stenosis of intracerebral arteries",
        "fa": "درجه تنگی شریان‌های داخل مغزی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Die ursprüngliche Fazekas-Skala bewertet periventrikuläre und tiefe WM-Hyperintensitäten getrennt von 0 bis 3. Sie beschreibt Läsionslast, nicht allein Ätiologie oder kognitive Diagnose.",
      "en": "The original Fazekas scale grades periventricular and deep white-matter hyperintensities separately from 0 to 3. It describes lesion burden rather than establishing aetiology or a cognitive diagnosis.",
      "fa": "مقیاس اصلی فازکاس پرسیگنالی‌های مادهٔ سفید دوربطن و عمقی را جداگانه از ۰ تا ۳ درجه‌بندی می‌کند. بار ضایعه را توصیف می‌کند، نه تعیین مستقل علت یا تشخیص شناختی."
    },
    "wrongExplanations": {
      "B": {
        "de": "Hämatomvolumen ist eine andere Messgröße und wird durch die Fazekas-Skala nicht bewertet.",
        "en": "Haematoma volume is a different measure and is not graded by Fazekas.",
        "fa": "حجم هماتوم کمیت دیگری است و با فازکاس درجه‌بندی نمی‌شود."
      },
      "C": {
        "de": "Mikroblutungen werden auf suszeptibilitätssensitiven Sequenzen erfasst; Fazekas bewertet T2/FLAIR-Marklagersignal.",
        "en": "Microbleeds are assessed on susceptibility-sensitive imaging; Fazekas grades T2/FLAIR white-matter signal.",
        "fa": "میکروخونریزی‌ها در تصویربرداری حساس به سوسپتیبیلیتی بررسی می‌شوند؛ فازکاس سیگنال مادهٔ سفید در T2/FLAIR را درجه‌بندی می‌کند."
      },
      "D": {
        "de": "Stenosen betreffen das Gefäßlumen; die Skala beurteilt Marklagerhyperintensitäten.",
        "en": "Stenosis concerns the vascular lumen; this scale assesses white-matter hyperintensities.",
        "fa": "تنگی مربوط به لومن عروق است؛ این مقیاس پرسیگنالی مادهٔ سفید را ارزیابی می‌کند."
      }
    },
    "source": "https://doi.org/10.2214/ajr.149.2.351"
  },
  {
    "id": "hma-07",
    "question": {
      "de": "Bei neu aufgetretener reiner Hemiparese bleibt das Nativ-CT ohne eindeutigen Infarktnachweis. Welche MRT-Aufnahme hilft besonders bei der Suche nach einem frischen kleinen subkortikalen Infarkt?",
      "en": "In new pure motor hemiparesis, unenhanced CT does not clearly show an infarct. Which MRI acquisition particularly helps identify a recent small subcortical infarct?",
      "fa": "در همی‌پارزی حرکتی خالصِ تازه، CT بدون تزریق انفارکت مشخصی نشان نمی‌دهد. کدام تصویربرداری MRI به‌ویژه برای جست‌وجوی انفارکت کوچک زیرقشری تازه کمک‌کننده است؟"
    },
    "options": [
      {
        "de": "DWI mit korrespondierender ADC-Karte",
        "en": "DWI with corresponding ADC map",
        "fa": "DWI همراه نقشهٔ ADC متناظر"
      },
      {
        "de": "Konventionelle native T1-Aufnahme",
        "en": "Conventional unenhanced T1 imaging",
        "fa": "تصویر متعارف T1 بدون تزریق"
      },
      {
        "de": "SWI zur Suche nach Suszeptibilitätsherden",
        "en": "SWI to search for susceptibility foci",
        "fa": "SWI برای جست‌وجوی کانون‌های سوسپتیبیلیتی"
      },
      {
        "de": "Postkontrast-T1 zur Suche nach Kontrastmittelaufnahme",
        "en": "Postcontrast T1 to assess enhancement",
        "fa": "T1 پس از تزریق برای جست‌وجوی جذب مادهٔ حاجب"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "DWI-Hyperintensität mit niedrigem ADC kann einen frischen kleinen subkortikalen Infarkt zeigen. Kleine oder sehr frühe Infarkte können dennoch DWI-negativ sein; bei passender Klinik sind Zeitpunkt, technische Qualität und Verlauf zu berücksichtigen.",
      "en": "DWI hyperintensity with low ADC can show a recent small subcortical infarct. Small or very early infarcts may still be DWI-negative; consider timing, technical quality and evolution when the clinical syndrome fits.",
      "fa": "روشن‌بودن در DWI همراه ADC پایین می‌تواند انفارکت کوچک زیرقشری تازه را نشان دهد. بااین‌حال انفارکت کوچک یا بسیار زودرس ممکن است در DWI منفی باشد؛ در تابلوی بالینی سازگار، زمان، کیفیت فنی و سیر بررسی شوند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Native T1 ist Teil der Morphologiebeurteilung, stellt frühe Diffusionsrestriktion aber nicht gezielt dar.",
        "en": "Unenhanced T1 supports morphological assessment but does not directly depict early diffusion restriction.",
        "fa": "T1 بدون تزریق در بررسی مورفولوژی نقش دارد، اما محدودیت زودرس انتشار را هدفمند نشان نمی‌دهد."
      },
      "C": {
        "de": "SWI hilft besonders bei Blutprodukten und anderen Suszeptibilitätsquellen; sie beantwortet die Frage nach frischer Ischämie nicht so direkt wie DWI/ADC.",
        "en": "SWI particularly helps with blood products and other susceptibility sources; it does not assess recent ischaemia as directly as DWI/ADC.",
        "fa": "SWI به‌ویژه برای فرآورده‌های خون و منابع دیگر سوسپتیبیلیتی کمک‌کننده است و ایسکمی تازه را به‌اندازهٔ DWI/ADC مستقیم بررسی نمی‌کند."
      },
      "D": {
        "de": "Kontrastmittelaufnahme ist zur frühen Erkennung eines kleinen subkortikalen Infarkts nicht das primär gesuchte Merkmal.",
        "en": "Enhancement is not the primary feature sought for early detection of a small subcortical infarct.",
        "fa": "جذب مادهٔ حاجب ویژگی اصلی مورد نظر برای تشخیص زودرس انفارکت کوچک زیرقشری نیست."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3714437/"
  },
  {
    "id": "hma-08",
    "question": {
      "de": "Welche Befundkonstellation fordert bei einer vermuteten spontanen Hirnblutung besonders die gezielte Suche nach einer zugrunde liegenden Gewebeläsion?",
      "en": "Which findings particularly call for targeted investigation of an underlying tissue lesion in presumed spontaneous cerebral haemorrhage?",
      "fa": "در خونریزی مغزی خودبه‌خودیِ احتمالی، کدام مجموعهٔ یافته‌ها به‌ویژه بررسی هدفمند ضایعهٔ بافتی زمینه‌ای را لازم می‌کند؟"
    },
    "options": [
      {
        "de": "Disproportionales Ödem und noduläres kontrastaufnehmendes Restgewebe an einer lobären Blutung",
        "en": "Disproportionate oedema and nodular enhancing residual tissue adjacent to lobar haemorrhage",
        "fa": "ادم نامتناسب و بافت ندولار جاذب مادهٔ حاجب کنار خونریزی لوبار"
      },
      {
        "de": "Tiefe Blutung mit weiteren tiefen Mikroblutungen und Lakunen",
        "en": "Deep haemorrhage with additional deep microbleeds and lacunes",
        "fa": "خونریزی عمقی همراه میکروخونریزی‌های عمقی دیگر و لاکون‌ها"
      },
      {
        "de": "Chronische liquorähnliche Lakune ohne angrenzendes solides Gewebe",
        "en": "Chronic CSF-like lacune without adjacent solid tissue",
        "fa": "لاکون مزمن هم‌سیگنال با مایع بدون بافت جامد مجاور"
      },
      {
        "de": "Langjährig stabile symmetrische Marklagerhyperintensitäten ohne Masse",
        "en": "Longstanding stable symmetric white-matter hyperintensities without a mass",
        "fa": "پرسیگنالی‌های متقارن و پایدار مادهٔ سفید بدون توده"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Noduläres Restgewebe und disproportionales Ödem können eine hämorrhagische Gewebeläsion wie einen Tumor vermuten lassen. Kein Form- oder Ödemkriterium beweist die Histologie. Kontrastverstärkte MRT und gegebenenfalls Verlauf nach Blutresorption helfen bei der Abklärung.",
      "en": "Nodular residual tissue and disproportionate oedema can raise suspicion of a haemorrhagic tissue lesion such as tumour. Neither shape nor oedema establishes histology. Contrast-enhanced MRI and, where appropriate, follow-up after blood resorption help investigate.",
      "fa": "بافت ندولار باقی‌مانده و ادم نامتناسب می‌توانند شک به ضایعهٔ بافتی خونریزی‌دهنده مانند تومور را ایجاد کنند. هیچ معیار شکل یا ادمی بافت‌شناسی را اثبات نمی‌کند. MRI با تزریق و در صورت لزوم پیگیری پس از جذب خون به بررسی کمک می‌کنند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Die Kombination stützt eher eine kleine Perforatorgefäßerkrankung. Sie enthält nicht das gesuchte verdächtige solide Gewebe; die Gesamtabklärung bleibt kontextabhängig.",
        "en": "This combination favours small perforator disease and does not contain the suspicious solid tissue sought; overall evaluation remains context-dependent.",
        "fa": "این ترکیب بیشتر از بیماری پرفوراتورهای کوچک حمایت می‌کند و بافت جامد مشکوک مورد نظر را ندارد؛ بررسی کلی همچنان به زمینه بستگی دارد."
      },
      "C": {
        "de": "Eine chronische flüssigkeitsähnliche Höhle ohne soliden Anteil ist keine solche Gewebeläsion.",
        "en": "A chronic fluid-like cavity without a solid component is not this type of tissue lesion.",
        "fa": "حفرهٔ مزمن شبیه مایع بدون جزء جامد، چنین ضایعهٔ بافتی‌ای نیست."
      },
      "D": {
        "de": "Stabile symmetrische WMH ohne Masse erklären den gesuchten Verdacht auf eine fokale hämorrhagische Gewebeläsion nicht.",
        "en": "Stable symmetric WMH without a mass do not provide the focal haemorrhagic tissue-lesion concern being sought.",
        "fa": "پرسیگنالی متقارن و پایدار بدون توده، شک مورد نظر به ضایعهٔ بافتی خونریزی‌دهندهٔ کانونی را ایجاد نمی‌کند."
      }
    },
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "id": "hma-09",
    "question": {
      "de": "Eine Person unter Warfarin hat eine akute intrazerebrale Blutung bei INR 3,2. Vier-Faktor-PCC ist verfügbar. Welche Strategie passt zur raschen VKA-Antagonisierung?",
      "en": "A patient taking warfarin has acute intracerebral haemorrhage with INR 3.2. Four-factor PCC is available. Which strategy fits rapid VKA reversal?",
      "fa": "فرد تحت درمان با وارفارین دچار خونریزی حاد داخل مغز با INR برابر ۳٫۲ شده است. PCC چهارعاملی در دسترس است. کدام راهبرد برای خنثی‌سازی سریع اثر آنتاگونیست ویتامین K مناسب است؟"
    },
    "options": [
      {
        "de": "Vier-Faktor-PCC zusammen mit intravenösem Vitamin K",
        "en": "Four-factor PCC together with intravenous vitamin K",
        "fa": "PCC چهارعاملی همراه ویتامین K وریدی"
      },
      {
        "de": "Vier-Faktor-PCC ohne ergänzendes Vitamin K",
        "en": "Four-factor PCC without additional vitamin K",
        "fa": "PCC چهارعاملی بدون ویتامین K تکمیلی"
      },
      {
        "de": "Intravenöses Vitamin K ohne Gerinnungsfaktorkonzentrat",
        "en": "Intravenous vitamin K without clotting-factor concentrate",
        "fa": "ویتامین K وریدی بدون کنسانترهٔ عوامل انعقادی"
      },
      {
        "de": "Frischplasma als primäre Strategie anstelle des verfügbaren PCC",
        "en": "Fresh frozen plasma as the primary strategy instead of available PCC",
        "fa": "پلاسمای تازهٔ منجمد به‌عنوان راهبرد اصلی به‌جای PCC در دسترس"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "PCC ersetzt Gerinnungsfaktoren rasch, Vitamin K unterstützt die anhaltende Korrektur und verhindert einen INR-Rebound. Auswahl und Dosierung richten sich nach Protokoll, INR, Gewicht und Präparat; INR engmaschig kontrollieren. Dies ist Teil der zeitkritischen Gesamtversorgung.",
      "en": "PCC replaces clotting factors rapidly; vitamin K supports sustained correction and prevents INR rebound. Selection and dosing depend on protocol, INR, weight and product; monitor INR closely. This is one component of time-critical overall care.",
      "fa": "PCC عوامل انعقادی را سریع جایگزین می‌کند؛ ویتامین K اصلاح پایدار را پشتیبانی و از افزایش مجدد INR جلوگیری می‌کند. انتخاب و دوز به پروتکل، INR، وزن و فرآورده وابسته است؛ INR دقیق پایش شود. این بخشی از مراقبت کلی زمان‌حساس است."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ohne Vitamin K kann die Wirkung des VKA nach Abklingen der kurz wirksamen Faktoren wieder überwiegen und INR erneut ansteigen.",
        "en": "Without vitamin K, VKA effects can predominate again after shorter-lived factors decline, causing INR rebound.",
        "fa": "بدون ویتامین K، پس از کاهش عوامل کوتاه‌اثر ممکن است اثر آنتاگونیست ویتامین K دوباره غالب و INR افزایش یابد."
      },
      "C": {
        "de": "Vitamin K wirkt nicht so rasch wie der unmittelbare Faktorersatz; bei akuter VKA-Blutung wird die Kombination verwendet.",
        "en": "Vitamin K does not act as rapidly as immediate factor replacement; acute VKA-associated haemorrhage is managed with the combination.",
        "fa": "اثر ویتامین K به‌سرعت جایگزینی مستقیم عوامل نیست؛ در خونریزی حاد مرتبط با آنتاگونیست ویتامین K از ترکیب استفاده می‌شود."
      },
      "D": {
        "de": "FFP kann in besonderen Situationen eine Rolle spielen; bei verfügbarem PCC normalisiert PCC die INR schneller und benötigt weniger Volumen.",
        "en": "FFP may have a role in selected circumstances; available PCC normalises INR faster and requires less volume.",
        "fa": "FFP در شرایط خاص ممکن است نقش داشته باشد؛ PCC در دسترس INR را سریع‌تر اصلاح می‌کند و به حجم کمتری نیاز دارد."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12098356/; https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "id": "hma-10",
    "question": {
      "de": "Eine kleine dorsale Ponsblutung wird im CT erkannt. Welche Informationen sollen für eine individuelle Prognose besonders gemeinsam berücksichtigt werden?",
      "en": "CT identifies a small dorsal pontine haemorrhage. Which information should particularly be integrated for individual prognostic assessment?",
      "fa": "CT خونریزی کوچک پشتی پونس را نشان می‌دهد. برای ارزیابی فردی پیش‌آگهی، کدام اطلاعات به‌ویژه باید با هم در نظر گرفته شوند؟"
    },
    "options": [
      {
        "de": "Bewusstseinslage bei Aufnahme und Hämatomgröße/-ausdehnung",
        "en": "Admission level of consciousness and haematoma size/extent",
        "fa": "سطح هوشیاری هنگام پذیرش و اندازه/گسترش هماتوم"
      },
      {
        "de": "Alter und chronische Marklagerläsionslast",
        "en": "Age and chronic white-matter lesion burden",
        "fa": "سن و بار ضایعات مزمن مادهٔ سفید"
      },
      {
        "de": "Ponslokalisation und Dauer der bekannten Hypertonie",
        "en": "Pontine location and duration of known hypertension",
        "fa": "محل پونس و مدت پرفشاری خون شناخته‌شده"
      },
      {
        "de": "Zahl alter Mikroblutungen und periventrikulärer Fazekas-Grad",
        "en": "Number of old microbleeds and periventricular Fazekas grade",
        "fa": "تعداد میکروخونریزی‌های قدیمی و درجهٔ فازکاس دوربطن"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Klinischer Schweregrad und Hämatomgröße/-ausdehnung beeinflussen den Verlauf wesentlich. Kleine dorsale Blutungen können einen günstigeren Verlauf haben als große ventrale oder massive Blutungen. Der Ort Pons allein erlaubt kein pauschales Unheilbarkeits- oder Therapiebegrenzungsurteil.",
      "en": "Clinical severity and haematoma size/extent substantially affect the course. Small dorsal haemorrhages can fare better than large ventral or massive haemorrhages. Pontine location alone does not justify a blanket futility or treatment-limitation judgement.",
      "fa": "شدت بالینی و اندازه/گسترش هماتوم به‌طور مهم بر سیر اثر می‌گذارند. خونریزی کوچک پشتی ممکن است سیر مطلوب‌تری از خونریزی بزرگ ونترال (قدامی) پونس یا خونریزی وسیع داشته باشد. محل پونس به‌تنهایی قضاوت کلی دربارهٔ بی‌فایدگی درمان یا محدودکردن آن را توجیه نمی‌کند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Alter und chronische Läsionslast sind Kontext, ersetzen aber die aktuelle Bewusstseinslage und Blutungsausdehnung nicht.",
        "en": "Age and chronic lesion burden provide context but do not replace current consciousness and haemorrhage extent.",
        "fa": "سن و بار ضایعات مزمن زمینه را فراهم می‌کنند، اما جای هوشیاری کنونی و گسترش خونریزی را نمی‌گیرند."
      },
      "C": {
        "de": "Die Ponslokalisation und Hypertonieanamnese liefern Kontext, erfassen aber weder aktuelle klinische Schwere noch die Blutungsausdehnung.",
        "en": "Pontine location and hypertension history provide context but capture neither current clinical severity nor haemorrhage extent.",
        "fa": "محل پونس و سابقهٔ پرفشاری خون زمینه را فراهم می‌کنند، اما نه شدت بالینی کنونی و نه گسترش خونریزی را نشان می‌دهند."
      },
      "D": {
        "de": "Mikroblutungen helfen bei der Gefäßerkrankungseinordnung, ersetzen jedoch nicht den aktuellen klinischen und raumfordernden Befund.",
        "en": "Microbleeds help classify vascular disease but do not replace current clinical and mass-effect assessment.",
        "fa": "میکروخونریزی‌ها در طبقه‌بندی بیماری عروقی کمک می‌کنند، اما جای ارزیابی بالینی و اثر فضاگیر کنونی را نمی‌گیرند."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7974614/"
  },
  {
    "id": "hma-11",
    "question": {
      "de": "Bei akutem rein motorischem Defizit zeigt MRT einen 8-mm-Herd in der Capsula interna mit DWI-Hyperintensität und niedrigem ADC. Eine flüssigkeitsähnliche Höhle besteht nicht. Welcher STRIVE-Begriff passt am besten?",
      "en": "With acute pure motor deficit, MRI shows an 8-mm internal-capsule lesion with DWI hyperintensity and low ADC, without a fluid-like cavity. Which STRIVE term fits best?",
      "fa": "در نقص حرکتی خالص حاد، MRI کانون ۸ میلی‌متری کپسول داخلی با DWI روشن و ADC پایین و بدون حفرهٔ شبیه مایع نشان می‌دهد. کدام اصطلاح STRIVE مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Frischer kleiner subkortikaler Infarkt",
        "en": "Recent small subcortical infarct",
        "fa": "انفارکت کوچک زیرقشری تازه"
      },
      {
        "de": "Chronische Lakune",
        "en": "Chronic lacune",
        "fa": "لاکون مزمن"
      },
      {
        "de": "Erweiterter perivaskulärer Raum",
        "en": "Enlarged perivascular space",
        "fa": "فضای دورعروقی گشادشده"
      },
      {
        "de": "Zerebrale Mikroblutung",
        "en": "Cerebral microbleed",
        "fa": "میکروخونریزی مغزی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Klinik, Perforatorlage und Diffusionsrestriktion passen zu einem frischen kleinen subkortikalen Infarkt. Eine Lakune bezeichnet dagegen eine chronische liquorähnliche Höhle; nicht jeder frische Infarkt kavitiert. Die ätiologische Einordnung erfordert zusätzlich die gesamte Gefäß- und klinische Abklärung.",
      "en": "Clinical syndrome, perforator location and restricted diffusion fit a recent small subcortical infarct. A lacune instead denotes a chronic CSF-like cavity; not every recent infarct cavitates. Aetiologic classification also requires overall vascular and clinical investigation.",
      "fa": "تابلوی بالینی، محل پرفوراتور و محدودیت انتشار با انفارکت کوچک زیرقشری تازه سازگارند. لاکون حفرهٔ مزمن شبیه مایع مغزی‌نخاعی است؛ همهٔ انفارکت‌های تازه حفره نمی‌شوند. تعیین علت علاوه بر این به بررسی کلی عروقی و بالینی نیاز دارد."
    },
    "wrongExplanations": {
      "B": {
        "de": "Eine chronische Lakune hat einen flüssigkeitsähnlichen Hohlraum; hier liegen akute Klinik und Diffusionsrestriktion vor.",
        "en": "A chronic lacune has a fluid-like cavity; this case has acute symptoms and restricted diffusion.",
        "fa": "لاکون مزمن حفرهٔ شبیه مایع دارد؛ این مورد علائم حاد و محدودیت انتشار دارد."
      },
      "C": {
        "de": "Perivaskuläre Räume folgen typischerweise Liquorsignal und erklären keine solche akute restriktive Läsion.",
        "en": "Perivascular spaces typically follow CSF signal and do not explain this acute diffusion-restricting lesion.",
        "fa": "فضاهای دورعروقی معمولاً سیگنال مایع دارند و این ضایعهٔ حاد با محدودیت انتشار را توضیح نمی‌دهند."
      },
      "D": {
        "de": "Mikroblutungen werden als Suszeptibilitätsherde beurteilt; der beschriebene akute DWI/ADC-Befund passt hier besser zum Infarkt.",
        "en": "Microbleeds are assessed as susceptibility foci; the acute DWI/ADC findings here fit infarction better.",
        "fa": "میکروخونریزی به‌عنوان کانون سوسپتیبیلیتی ارزیابی می‌شود؛ یافتهٔ حاد DWI/ADC اینجا بیشتر با انفارکت سازگار است."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3714437/"
  },
  {
    "id": "hma-12",
    "question": {
      "de": "In FLAIR bestehen große zusammenhängende Areale tiefer Marklagerhyperintensität. Nur der tiefe Fazekas-Teilscore soll bewertet werden. Welcher Grad passt?",
      "en": "FLAIR shows large confluent areas of deep white-matter hyperintensity. Only the deep Fazekas subscore is being rated. Which grade fits?",
      "fa": "FLAIR نواحی بزرگ و به‌هم‌پیوستهٔ پرسیگنالی مادهٔ سفید عمقی نشان می‌دهد. فقط بخش عمقی نمرهٔ فازکاس ارزیابی می‌شود. کدام درجه مناسب است؟"
    },
    "options": [
      {
        "de": "Grad 3",
        "en": "Grade 3",
        "fa": "درجهٔ ۳"
      },
      {
        "de": "Grad 1",
        "en": "Grade 1",
        "fa": "درجهٔ ۱"
      },
      {
        "de": "Grad 2",
        "en": "Grade 2",
        "fa": "درجهٔ ۲"
      },
      {
        "de": "Grad 0",
        "en": "Grade 0",
        "fa": "درجهٔ ۰"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Große konfluierende tiefe Marklagerareale entsprechen im ursprünglichen Fazekas-System dem tiefen Grad 3. Periventrikuläre Veränderungen werden separat bewertet. Der Grad beschreibt Läsionslast und ist keine alleinige Diagnose von Hypertonie oder Demenz.",
      "en": "Large confluent deep white-matter areas correspond to deep grade3 in the original Fazekas system. Periventricular abnormalities are scored separately. The grade describes lesion burden rather than establishing hypertension or dementia on its own.",
      "fa": "نواحی بزرگ و به‌هم‌پیوستهٔ مادهٔ سفید عمقی در سامانهٔ اصلی فازکاس با درجهٔ ۳ بخش عمقی مطابقت دارند. تغییرات دوربطن جداگانه درجه‌بندی می‌شوند. درجه بار ضایعه را توصیف می‌کند، نه تشخیص مستقل پرفشاری خون یا دمانس."
    },
    "wrongExplanations": {
      "B": {
        "de": "Tiefe Grad 1-Veränderungen sind punktförmig und noch nicht großflächig konfluierend.",
        "en": "Deep grade1 changes are punctate rather than large confluent areas.",
        "fa": "تغییرات عمقی درجهٔ ۱ نقطه‌ای‌اند، نه نواحی بزرگ به‌هم‌پیوسته."
      },
      "C": {
        "de": "Tiefe Grad 2-Veränderungen zeigen beginnende Konfluenz, nicht die beschriebenen großen konfluierenden Areale.",
        "en": "Deep grade2 changes show beginning confluence rather than the large confluent areas described.",
        "fa": "تغییرات عمقی درجهٔ ۲ شروع به‌هم‌پیوستن دارند، نه نواحی بزرگ به‌هم‌پیوستهٔ توصیف‌شده."
      },
      "D": {
        "de": "Grad 0 bedeutet keine Hyperintensitäten im bewerteten Kompartiment.",
        "en": "Grade 0 means no hyperintensities in the compartment being rated.",
        "fa": "درجهٔ ۰ یعنی پرسیگنالی در بخش مورد ارزیابی وجود ندارد."
      }
    },
    "source": "https://doi.org/10.2214/ajr.149.2.351"
  }
]

export const HMA_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, HMA_QUESTION_SEEDS.map(seed => ({
  id: `hma-${lang}-${seed.id}`,
  tags: ['hypertensive-mikroangiopathie', 'hypertensive-icb', 'gehirn'],
  fach: 'gehirn',
  question: seed.question[lang],
  options: seed.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
  correct: String.fromCharCode(65 + seed.correct),
  explanation: seed.explanation[lang],
  wrongExplanations: Object.fromEntries(Object.entries(seed.wrongExplanations).map(([id,text])=>[id,text[lang]])),
  source: seed.source,
}))]))

// ─── Flashcard Seeds ──────────────────────────────────────────────────────────

const HMA_FLASH_SEEDS = [
  {
    "id": "def",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "اساسیات"
    },
    "front": {
      "de": "Welche ischämischen und hämorrhagischen Bildgebungsmarker können zur hypertensiven kleinen Gefäßerkrankung gehören?",
      "en": "Which ischaemic and haemorrhagic imaging markers can accompany hypertensive small-vessel disease?",
      "fa": "کدام نشانگرهای تصویری ایسکمیک و خونریزی‌دهنده می‌توانند با بیماری عروق کوچک مرتبط با پرفشاری خون همراه باشند؟"
    },
    "answer": {
      "de": "Frische kleine subkortikale Infarkte, chronische Lakunen und WMH sowie tiefe Mikroblutungen oder größere tiefe Blutungen. Kein einzelner Marker beweist Hypertonie als Ursache.",
      "en": "Recent small subcortical infarcts, chronic lacunes and WMH, alongside deep microbleeds or larger deep haemorrhages. No single marker establishes hypertension as the cause.",
      "fa": "انفارکت‌های کوچک زیرقشری تازه، لاکون‌های مزمن و پرسیگنالی مادهٔ سفید، همراه میکروخونریزی‌های عمقی یا خونریزی‌های عمقی بزرگ‌تر. هیچ نشانگر منفردی پرفشاری خون را به‌عنوان علت اثبات نمی‌کند."
    },
    "explanation": {
      "de": "Tiefe Blutungen und Mikroblutungen stützen eine Arteriolopathie tiefer Perforatoren. Das Verteilungsmuster wird mit Klinik und weiteren Befunden kombiniert; es beweist die Ursache nicht allein. Feste Ortsprozentsätze werden nicht als allgemeine Regel verwendet.",
      "en": "Deep haemorrhages and microbleeds support deep perforator arteriolopathy. Integrate distribution with clinical context and other findings; it does not establish the cause alone. Fixed location percentages are not used as a universal rule.",
      "fa": "خونریزی‌ها و میکروخونریزی‌های عمقی از آرتریولوپاتی پرفوراتورهای عمقی حمایت می‌کنند. توزیع با زمینهٔ بالینی و سایر یافته‌ها ترکیب می‌شود و به‌تنهایی علت را اثبات نمی‌کند. درصدهای ثابت محل به‌عنوان قاعدهٔ عمومی به کار نمی‌روند."
    },
    "diagram": null,
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407; https://pmc.ncbi.nlm.nih.gov/articles/PMC3714437/"
  },
  {
    "id": "lipohyal",
    "category": {
      "de": "Pathophysiologie",
      "en": "Pathophysiology",
      "fa": "پاتوفیزیولوژی"
    },
    "front": {
      "de": "Was ist Lipohyalinose und was sind ihre Folgen?",
      "en": "What is lipohyalinosis and what are its consequences?",
      "fa": "لیپوهیالینوز چیست و عواقب آن چیست؟"
    },
    "answer": {
      "de": "Arteriolosklerotische/lipohyalinotische Wandveränderungen betreffen kleine penetrierende Arterien. Sie können mit ischämischen und hämorrhagischen Schäden zusammenhängen; nicht jede Läsion setzt ein Charcot-Bouchard-Mikroaneurysma voraus.",
      "en": "Arteriolosclerotic/lipohyalinotic wall changes affect small penetrating arteries. They can be associated with ischaemic and haemorrhagic injury; not every lesion requires a Charcot–Bouchard microaneurysm.",
      "fa": "تغییرات آرتریولواسکلروتیک/لیپوهیالینوتیک دیواره، شریان‌های نافذ کوچک را درگیر می‌کنند. می‌توانند با آسیب ایسکمیک و خونریزی‌دهنده همراه باشند؛ هر ضایعه مستلزم میکروآنوریسم شارکو-بوشار نیست."
    },
    "explanation": {
      "de": "Die Erkrankung betrifft kleine penetrierende Arterien und kann ischämische sowie hämorrhagische Läsionen verursachen. Ein lineares Obligatmodell aus Lipohyalinose, Mikroaneurysma und Blutung ist dafür nicht erforderlich.",
      "en": "The disease affects small penetrating arteries and can produce both ischaemic and haemorrhagic lesions. This does not require an obligatory linear sequence of lipohyalinosis, microaneurysm and haemorrhage.",
      "fa": "بیماری عروق نافذ کوچک را درگیر می‌کند و می‌تواند ضایعات ایسکمیک و خونریزی‌دهنده ایجاد کند. وجود توالی اجباری و خطی لیپوهیالینوز، میکروآنوریسم و خونریزی برای آن لازم نیست."
    },
    "diagram": null,
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407; https://pmc.ncbi.nlm.nih.gov/articles/PMC3714437/"
  },
  {
    "id": "loci",
    "category": {
      "de": "Lokalisation",
      "en": "Location",
      "fa": "محل"
    },
    "front": {
      "de": "Welche Blutungslokalisationen stützen im passenden Kontext eine tiefe Perforatorarteriopathie?",
      "en": "Which haemorrhage locations support deep perforator arteriolopathy in context?",
      "fa": "در زمینهٔ سازگار، کدام محل‌های خونریزی از آرتریولوپاتی پرفوراتورهای عمقی حمایت می‌کنند؟"
    },
    "answer": {
      "de": "Basalganglien, Thalamus und Pons; auch Kleinhirnblutungen können dazugehören. Verteilung und weitere Marker gemeinsam bewerten, ohne feste Ortsprozentsätze oder einen sicheren Ätiologienachweis aus der Lage.",
      "en": "Basal ganglia, thalamus and pons; cerebellar haemorrhage may also occur. Assess distribution and other markers together without fixed location percentages or certainty of aetiology from location.",
      "fa": "عقده‌های قاعده‌ای، تالاموس و پونس؛ خونریزی مخچه نیز ممکن است دیده شود. توزیع و نشانگرهای دیگر با هم بررسی شوند، بدون درصد ثابت محل یا قطعیت علت صرفاً بر اساس مکان."
    },
    "explanation": {
      "de": "Tiefe Blutungen und Mikroblutungen stützen eine Arteriolopathie tiefer Perforatoren. Das Verteilungsmuster wird mit Klinik und weiteren Befunden kombiniert; es beweist die Ursache nicht allein. Feste Ortsprozentsätze werden nicht als allgemeine Regel verwendet.",
      "en": "Deep haemorrhages and microbleeds support deep perforator arteriolopathy. Integrate distribution with clinical context and other findings; it does not establish the cause alone. Fixed location percentages are not used as a universal rule.",
      "fa": "خونریزی‌ها و میکروخونریزی‌های عمقی از آرتریولوپاتی پرفوراتورهای عمقی حمایت می‌کنند. توزیع با زمینهٔ بالینی و سایر یافته‌ها ترکیب می‌شود و به‌تنهایی علت را اثبات نمی‌کند. درصدهای ثابت محل به‌عنوان قاعدهٔ عمومی به کار نمی‌روند."
    },
    "diagram": null,
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "id": "cct-morph",
    "category": {
      "de": "CCT",
      "en": "CCT",
      "fa": "CCT"
    },
    "front": {
      "de": "Was lässt sich aus CT-Form und Ödem einer tiefen Blutung zur Ursache ableiten?",
      "en": "What can CT shape and oedema of a deep haemorrhage establish about its cause?",
      "fa": "از شکل و ادم خونریزی عمقی در CT دربارهٔ علت چه می‌توان نتیجه گرفت؟"
    },
    "answer": {
      "de": "Tiefe Lage im passenden vaskulären Kontext stützt Perforatorarteriopathie. Form und Ödem sind nicht spezifisch. Unverhältnismäßiges Ödem oder noduläres Restgewebe kann zusätzliche Ursachenabklärung auslösen.",
      "en": "Deep location in a compatible vascular context supports perforator arteriolopathy. Shape and oedema are nonspecific. Disproportionate oedema or nodular residual tissue can prompt additional investigation.",
      "fa": "محل عمقی در زمینهٔ عروقی سازگار از آرتریولوپاتی پرفوراتورها حمایت می‌کند. شکل و ادم اختصاصی نیستند. ادم نامتناسب یا بافت ندولار باقی‌مانده می‌تواند بررسی بیشتر علت را مطرح کند."
    },
    "explanation": {
      "de": "Noduläres Restgewebe und disproportionales Ödem können eine hämorrhagische Gewebeläsion wie einen Tumor vermuten lassen. Kein Form- oder Ödemkriterium beweist die Histologie. Kontrastverstärkte MRT und gegebenenfalls Verlauf nach Blutresorption helfen bei der Abklärung.",
      "en": "Nodular residual tissue and disproportionate oedema can raise suspicion of a haemorrhagic tissue lesion such as tumour. Neither shape nor oedema establishes histology. Contrast-enhanced MRI and, where appropriate, follow-up after blood resorption help investigate.",
      "fa": "بافت ندولار باقی‌مانده و ادم نامتناسب می‌توانند شک به ضایعهٔ بافتی خونریزی‌دهنده مانند تومور را ایجاد کنند. هیچ معیار شکل یا ادمی بافت‌شناسی را اثبات نمی‌کند. MRI با تزریق و در صورت لزوم پیگیری پس از جذب خون به بررسی کمک می‌کنند."
    },
    "diagram": null,
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "id": "spotsign",
    "category": {
      "de": "CTA",
      "en": "CTA",
      "fa": "CTA"
    },
    "front": {
      "de": "Spot Sign · Was, Wo, Bedeutung?",
      "en": "Spot Sign · What, where, significance?",
      "fa": "علامت اسپات (Spot sign) · چیست، کجا، اهمیت؟"
    },
    "answer": {
      "de": "Was: fokaler Kontrastmittelpool im/am Hämatom\nWo: CTA (nicht im nativen CT)\nBedeutung: mit erhöhtem Expansionsrisiko assoziiert; keine sichere Prognose",
      "en": "What: focal contrast pooling within/at the haematoma\nWhere: CTA (not NCCT)\nSignificance: associated with increased expansion risk; not a certain prognosis",
      "fa": "چیست: تجمع کانونی ماده حاجب درون/حاشیهٔ هماتوم\nکجا: CTA (نه CT بدون کنتراست)\nاهمیت: مرتبط با افزایش خطر گسترش؛ پیش‌بینی قطعی نیست"
    },
    "explanation": {
      "de": "Das Spot Sign ist ein fokaler Kontrastmittelpool innerhalb oder am Rand des Hämatoms in der CTA. Ein positives Zeichen ist mit einem erhöhten Risiko für Hämatomexpansion assoziiert. Vorhersagewerte variieren unter anderem mit Zeitpunkt und Protokoll; daraus folgt keine sichere individuelle Prognose. CTA-Bildgebung richtet sich nach klinischem Kontext und lokalem Protokoll.",
      "en": "The Spot Sign is a focal pool of contrast within or at the margin of the haematoma on CTA. A positive sign is associated with increased risk of haematoma expansion. Predictive values vary in part with timing and protocol, so it does not provide a certain individual prognosis. CTA imaging depends on the clinical context and local protocol.",
      "fa": "Spot sign تجمع کانونی ماده حاجب درون یا حاشیهٔ هماتوم در CTA است. مثبت‌بودن آن با افزایش خطر گسترش هماتوم ارتباط دارد. ارزش پیش‌بینی تا حدی با زمان و پروتکل تغییر می‌کند و پیش‌آگهی قطعی فردی نمی‌دهد. انجام CTA به زمینهٔ بالینی و پروتکل مرکز بستگی دارد."
    },
    "diagram": null,
    "source": "https://pubmed.ncbi.nlm.nih.gov/17322083/"
  },
  {
    "id": "fazekas",
    "category": {
      "de": "MRT",
      "en": "MRI",
      "fa": "MRI"
    },
    "front": {
      "de": "Wie werden periventrikuläre und tiefe WMH nach Fazekas getrennt bewertet?",
      "en": "How are periventricular and deep WMH scored separately with Fazekas?",
      "fa": "پرسیگنالی دوربطن و عمقی مادهٔ سفید در فازکاس چگونه جداگانه درجه‌بندی می‌شوند؟"
    },
    "answer": {
      "de": "Periventrikulär: 0 keine;1 Caps/dünner Saum;2 glatter Halo;3 irreguläre Ausdehnung ins tiefe Marklager.\nTief: 0 keine;1 Punkte;2 beginnende Konfluenz;3 große konfluierende Areale.",
      "en": "Periventricular: 0 absent;1 caps/thin lining;2 smooth halo;3 irregular extension into deep white matter.\nDeep: 0 absent;1 punctate foci;2 beginning confluence;3 large confluent areas.",
      "fa": "دوربطن:۰ بدون ضایعه؛۱ کلاهک/حاشیهٔ نازک؛۲ هالهٔ صاف؛۳ گسترش نامنظم به مادهٔ سفید عمقی.\nعمقی:۰ بدون ضایعه؛۱ کانون نقطه‌ای؛۲ شروع به‌هم‌پیوستن؛۳ نواحی بزرگ به‌هم‌پیوسته."
    },
    "explanation": {
      "de": "Die ursprüngliche Fazekas-Skala bewertet periventrikuläre und tiefe WM-Hyperintensitäten getrennt von 0 bis 3. Sie beschreibt Läsionslast, nicht allein Ätiologie oder kognitive Diagnose.",
      "en": "The original Fazekas scale grades periventricular and deep white-matter hyperintensities separately from 0 to 3. It describes lesion burden rather than establishing aetiology or a cognitive diagnosis.",
      "fa": "مقیاس اصلی فازکاس پرسیگنالی‌های مادهٔ سفید دوربطن و عمقی را جداگانه از ۰ تا ۳ درجه‌بندی می‌کند. بار ضایعه را توصیف می‌کند، نه تعیین مستقل علت یا تشخیص شناختی."
    },
    "diagram": null,
    "source": "https://doi.org/10.2214/ajr.149.2.351"
  },
  {
    "id": "cmbs",
    "category": {
      "de": "MRT/SWI",
      "en": "MRI/SWI",
      "fa": "MRI/SWI"
    },
    "front": {
      "de": "Wie stützt die Mikroblutungsverteilung die Unterscheidung tiefer Arteriolopathie und CAA?",
      "en": "How does microbleed distribution support differentiation between deep arteriolopathy and CAA?",
      "fa": "توزیع میکروخونریزی چگونه به افتراق آرتریولوپاتی عمقی و CAA کمک می‌کند؟"
    },
    "answer": {
      "de": "Tiefe Herde in Basalganglien, Thalamus und Hirnstamm stützen tiefe Perforatorerkrankung. Streng lobäre Herde und kortikale superfizielle Siderose stützen CAA. Gemischte Muster und Mimics gesondert prüfen; keine Eins-zu-eins-Diagnose.",
      "en": "Deep foci in basal ganglia, thalamus and brainstem support deep perforator disease. Strictly lobar foci and cortical superficial siderosis support CAA. Evaluate mixed patterns and mimics separately; this is not a one-to-one diagnosis.",
      "fa": "کانون‌های عمقی عقده‌های قاعده‌ای، تالاموس و ساقهٔ مغز از بیماری پرفوراتور عمقی حمایت می‌کنند. کانون‌های کاملاً لوبار و سیدروز سطحی قشری از CAA حمایت می‌کنند. الگوهای مختلط و تقلیدکننده‌ها جداگانه بررسی شوند؛ رابطهٔ تشخیصی یک‌به‌یک نیست."
    },
    "explanation": {
      "de": "Rundliche Suszeptibilitätsherde in tiefen Perforatorgebieten zusammen mit Lakunen und vaskulärer Anamnese stützen tiefe Mikroangiopathie. Mimics und andere Ursachen bleiben zu prüfen; Verteilung ist ein Hinweis und kein alleiniger ätiologischer Beweis.",
      "en": "Rounded susceptibility foci in deep perforator territories with lacunes and vascular history support deep small-vessel disease. Assess mimics and alternative causes; distribution is a clue rather than sole proof of aetiology.",
      "fa": "کانون‌های گرد سوسپتیبیلیتی در قلمروهای پرفوراتور عمقی همراه لاکون و سابقهٔ عروقی از بیماری عروق کوچک عمقی حمایت می‌کنند. تقلیدکننده‌ها و علل دیگر نیز بررسی شوند؛ توزیع سرنخ است، نه اثبات مستقل علت."
    },
    "diagram": null,
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3714437/; https://pmc.ncbi.nlm.nih.gov/articles/PMC9389452/"
  },
  {
    "id": "lakunen",
    "category": {
      "de": "MRT/DWI",
      "en": "MRI/DWI",
      "fa": "MRI/DWI"
    },
    "front": {
      "de": "Lakunärer Infarkt: Definition und MRT-Befunde?",
      "en": "Lacunar infarct: definition and MRI findings?",
      "fa": "انفارکت لاکونار: تعریف و یافته‌های MRI؟"
    },
    "answer": {
      "de": "Frischer kleiner subkortikaler Infarkt: Perforatorgebiet, axial meist bis etwa 20 mm; akut häufig DWI↑ und ADC↓.\nChronische Lakune: liquorähnliche Höhle von etwa 3–15 mm, oft mit FLAIR-Saum. Nicht jeder frische Infarkt hinterlässt eine Lakune.",
      "en": "Recent small subcortical infarct: perforator territory, usually up to about 20 mm axially; often DWI↑ and ADC↓ acutely.\nChronic lacune: CSF-like cavity about 3–15 mm, often with a FLAIR rim. Not every recent infarct leaves a lacune.",
      "fa": "انفارکت کوچک زیرقشری تازه: قلمرو پرفوراتور، معمولاً تا حدود ۲۰ میلی‌متر در صفحهٔ محوری؛ در فاز حاد اغلب DWI↑ و ADC↓.\nلاکون مزمن: حفرهٔ حدود ۳ تا ۱۵ میلی‌متر با سیگنال شبیه مایع مغزی‌نخاعی، اغلب با حاشیه در FLAIR. همهٔ انفارکت‌های تازه لاکون باقی نمی‌گذارند."
    },
    "explanation": {
      "de": "Frischer Infarkt ≠ chronische Lakune (3–15 mm)",
      "en": "Recent infarct ≠ chronic lacune (3–15 mm)",
      "fa": "انفارکت تازه ≠ لاکون مزمن (۳ تا ۱۵ میلی‌متر)"
    },
    "diagram": null,
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3714437/"
  },
  {
    "id": "pons-klinik",
    "category": {
      "de": "Klinik",
      "en": "Clinical",
      "fa": "کلینیک"
    },
    "front": {
      "de": "Welche klinischen und CT-Merkmale helfen bei der individuellen Prognose einer Ponsblutung?",
      "en": "Which clinical and CT features help assess the individual prognosis of pontine haemorrhage?",
      "fa": "کدام ویژگی‌های بالینی و CT به ارزیابی فردی پیش‌آگهی خونریزی پونس کمک می‌کنند؟"
    },
    "answer": {
      "de": "Bewusstseinslage bei Aufnahme und Hämatomgröße/-ausdehnung",
      "en": "Admission level of consciousness and haematoma size/extent",
      "fa": "سطح هوشیاری هنگام پذیرش و اندازه/گسترش هماتوم"
    },
    "explanation": {
      "de": "Klinischer Schweregrad und Hämatomgröße/-ausdehnung beeinflussen den Verlauf wesentlich. Kleine dorsale Blutungen können einen günstigeren Verlauf haben als große ventrale oder massive Blutungen. Der Ort Pons allein erlaubt kein pauschales Unheilbarkeits- oder Therapiebegrenzungsurteil.",
      "en": "Clinical severity and haematoma size/extent substantially affect the course. Small dorsal haemorrhages can fare better than large ventral or massive haemorrhages. Pontine location alone does not justify a blanket futility or treatment-limitation judgement.",
      "fa": "شدت بالینی و اندازه/گسترش هماتوم به‌طور مهم بر سیر اثر می‌گذارند. خونریزی کوچک پشتی ممکن است سیر مطلوب‌تری از خونریزی بزرگ ونترال (قدامی) پونس یا خونریزی وسیع داشته باشد. محل پونس به‌تنهایی قضاوت کلی دربارهٔ بی‌فایدگی درمان یا محدودکردن آن را توجیه نمی‌کند."
    },
    "diagram": null,
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7974614/"
  },
  {
    "id": "kleinhirn-op",
    "category": {
      "de": "Therapie",
      "en": "Treatment",
      "fa": "درمان"
    },
    "front": {
      "de": "Welche Konstellationen bei Kleinhirnblutung erfordern besonders dringende neurochirurgische Beurteilung?",
      "en": "Which cerebellar haemorrhage findings require particularly urgent neurosurgical assessment?",
      "fa": "کدام یافته‌ها در خونریزی مخچه به‌ویژه به ارزیابی فوری جراحی مغز و اعصاب نیاز دارند؟"
    },
    "answer": {
      "de": "Neurologische Verschlechterung, Hirnstammkompression, obstruktiver Hydrozephalus oder eine große Blutung. AHA/ASA2022 nennt≥15 ml als eine Operationsindikation; ESO/EANS2025 schlägt bei>15 ml eine Evakuation zur Überlebensverbesserung vor. Entscheidung und Technik werden akut im Spezialistenteam festgelegt.",
      "en": "Neurological deterioration, brainstem compression, obstructive hydrocephalus or a large haemorrhage. AHA/ASA2022 includes≥15 mL as an evacuation indication; ESO/EANS2025 suggests evacuation at>15 mL to improve survival. The specialist team determines acute management and technique.",
      "fa": "افت عصبی، فشردگی ساقهٔ مغز، هیدروسفالی انسدادی یا خونریزی بزرگ. AHA/ASA2022 حجم≥۱۵ میلی‌لیتر را یکی از اندیکاسیون‌های تخلیه می‌داند؛ ESO/EANS2025 تخلیه در حجم>۱۵ میلی‌لیتر را برای بهبود بقا مطرح می‌کند. تصمیم و روش به‌طور فوری در تیم تخصصی تعیین می‌شوند."
    },
    "explanation": {
      "de": "Die Leitlinien beruhen für Volumengrenzen wesentlich auf Beobachtungsdaten; Überlebensvorteil ist nicht gleichbedeutend mit gesichertem funktionellem Nutzen für jede Person.",
      "en": "Volume thresholds in these guidelines rely substantially on observational data; a survival advantage does not establish functional benefit for every patient.",
      "fa": "مرزهای حجمی این راهنماها عمدتاً بر داده‌های مشاهده‌ای تکیه دارند؛ برتری بقا به معنای اثبات سود عملکردی برای هر فرد نیست."
    },
    "diagram": null,
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407; https://pmc.ncbi.nlm.nih.gov/articles/PMC12098356/"
  },
  {
    "id": "dd-icb",
    "category": {
      "de": "Differenzialdiagnose",
      "en": "Differential",
      "fa": "تشخیص افتراقی"
    },
    "front": {
      "de": "DD der ICB: hypertensiv vs. CAA vs. Metastase vs. Kavernom — Schlüsselmerkmale",
      "en": "DDx of ICH: hypertensive vs. CAA vs. metastasis vs. cavernoma — key features",
      "fa": "تشخیص افتراقی ICH: فشار خون در مقابل CAA در مقابل متاستاز در مقابل کاورنوم — ویژگی‌های کلیدی"
    },
    "answer": {
      "de": "Hypertensive Arteriopathie: häufig tiefe Blutungen und tiefe Mikroblutungen.\nCAA: lobäre Blutungen und streng lobäre Mikroblutungen im passenden Kontext.\nMetastase: noduläre Anteile, Enhancement und ausgeprägtes Ödem können verdächtig sein.\nKavernom: Popcorn-Muster und Hämosiderinsaum; nach frischer Blutung ist Ödem möglich, Alter schließt es nicht aus.",
      "en": "Hypertensive arteriopathy: often deep haemorrhage and deep microbleeds.\nCAA: lobar haemorrhage and strictly lobar microbleeds in context.\nMetastasis: nodular tissue, enhancement, and prominent oedema can be suspicious.\nCavernoma: popcorn appearance and haemosiderin rim; recent bleeding may cause oedema, and age does not exclude it.",
      "fa": "آرتریوپاتی ناشی از پرفشاری خون: اغلب خونریزی عمقی و میکروخونریزی‌های عمقی.\nCAA: خونریزی لوبار و میکروخونریزی‌های صرفاً لوبار در زمینهٔ سازگار.\nمتاستاز: بافت ندولار، تقویت پس از تزریق و ادم برجسته می‌توانند مشکوک باشند.\nکاورنوم: نمای پاپ‌کورن و حاشیهٔ هموسیدرین؛ خونریزی تازه ممکن است ادم ایجاد کند و سن آن را رد نمی‌کند."
    },
    "explanation": {
      "de": "Verteilung und MRT-Morphologie liefern Hinweise; keine einzelne Form oder Altersgruppe beweist die Ursache.",
      "en": "Distribution and MRI morphology provide clues; no single shape or age group establishes the cause.",
      "fa": "توزیع و شکل‌شناسی MRI سرنخ می‌دهند؛ هیچ شکل یا گروه سنی به‌تنهایی علت را ثابت نمی‌کند."
    },
    "diagram": null,
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "id": "reversal",
    "category": {
      "de": "Therapie",
      "en": "Treatment",
      "fa": "درمان"
    },
    "front": {
      "de": "Welche Wirkprinzipien werden zur akuten Antikoagulanzien-Reversion bei ICB unterschieden?",
      "en": "Which approaches are distinguished for acute anticoagulant reversal in ICH?",
      "fa": "برای خنثی‌سازی حاد اثر داروهای ضدانعقاد در خونریزی داخل مغز چه رویکردهایی از هم جدا می‌شوند؟"
    },
    "answer": {
      "de": "VKA: 4-Faktor-PCC plus Vitamin K intravenös.\nDabigatran: Idarucizumab.\nApixaban/Rivaroxaban: spezifisches Reversal mit Andexanet individuell gegen Thromboserisiko abwägen; PCC kann nach Protokoll eine Alternative sein.\nAkut mit dem Behandlungsteam abstimmen.",
      "en": "VKA: 4-factor PCC plus intravenous vitamin K.\nDabigatran: idarucizumab.\nApixaban/rivaroxaban: weigh specific reversal with andexanet against thrombosis risk individually; PCC may be an alternative under local protocol.\nCoordinate urgently with the treating team.",
      "fa": "آنتاگونیست ویتامین K: PCC چهارعاملی همراه ویتامین K وریدی.\nدابیگاتران: ایداروسیزوماب.\nآپیکسابان/ریواروکسابان: خنثی‌سازی اختصاصی با اندکسانت در برابر خطر ترومبوز فردی سنجیده شود؛ PCC می‌تواند طبق پروتکل جایگزین باشد.\nبا تیم درمان فوراً هماهنگ شود."
    },
    "explanation": {
      "de": "PCC-Dosis richtet sich bei VKA nach INR, Gewicht und Produkt. ANNEXA-I zeigte mit Andexanet weniger Hämatomexpansion, aber mehr thrombotische Ereignisse einschließlich ischämischer Schlaganfälle. EMA-Indikation: Apixaban/Rivaroxaban, nicht pauschal alle Xa-Hemmer.",
      "en": "For VKA, PCC dose depends on INR, weight, and product. ANNEXA-I found less haematoma expansion with andexanet but more thrombotic events, including ischaemic stroke. EMA indication covers apixaban/rivaroxaban, not every Xa inhibitor.",
      "fa": "در آنتاگونیست ویتامین K، دوز PCC به INR، وزن و فرآورده وابسته است. ANNEXA-I گسترش کمتر هماتوم با اندکسانت، ولی رویدادهای ترومبوتیک بیشتر از جمله سکتهٔ ایسکمیک را نشان داد. اندیکاسیون EMA شامل آپیکسابان/ریواروکسابان است، نه همهٔ مهارکننده‌های Xa."
    },
    "diagram": null,
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12098356/; https://www.ema.europa.eu/en/medicines/human/EPAR/ondexxya"
  }
]

export const HMA_FLASHCARDS = HMA_FLASH_SEEDS.map((item, index) => ({
  id: `hma-${String(index + 1).padStart(2, '0')}-${item.id}`,
  topicId: 'hypertensive-mikroangiopathie',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
  source: item.source,
  ...(item.diagram ? { diagram: item.diagram } : {}),
}))

export const HMA_FLASHCARD_TOPIC = {
  id: 'hypertensive-mikroangiopathie',
  title: { de: 'Hypertensive Mikroangiopathie', en: 'Hypertensive Microangiopathy', fa: 'میکروآنژیوپاتی فشار خون بالا' },
  color: '#dc2626',
  icon: '🩸',
  description: {
    de: 'Lipohyalinose · Hypertensive ICB · Lakunäre Infarkte · Leukoaraiose · Fazekas-Skala',
    en: 'Lipohyalinosis · Hypertensive ICH · Lacunar infarcts · Leukoaraiosis · Fazekas scale',
    fa: 'لیپوهیالینوز · ICH فشار خون · انفارکت لاکونار · لوکوآرائوز · مقیاس Fazekas',
  },
}
