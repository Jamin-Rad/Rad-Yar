'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import styles from './page.module.css'

const CONTENT = {
  "de": {
    "toc": "Inhaltsverzeichnis",
    "breadcrumbAbdomen": "Abdomen",
    "breadcrumbCurrent": "Leber · Hämangiome",
    "title": "Leberhämangiome",
    "subtitle": "Klassische und atypische Bildgebung in Sonographie, CT und MRT",
    "sourceLabel": "Dr. Zia",
    "actionMcq": "MCQ",
    "actionFlash": "Flashcards",
    "keyLabel": "Merke",
    "caveLabel": "CAVE",
    "sections": [
      {
        "id": "grundlagen",
        "label": "Grundlagen",
        "icon": "🧬"
      },
      {
        "id": "sono",
        "label": "Sonographie",
        "icon": "🔊"
      },
      {
        "id": "ct",
        "label": "CT",
        "icon": "🩻"
      },
      {
        "id": "mrt",
        "label": "MRT",
        "icon": "🧲"
      },
      {
        "id": "atypisch",
        "label": "Atypische Hämangiome",
        "icon": "⚠️"
      },
      {
        "id": "takehome",
        "label": "Take home",
        "icon": "☾"
      }
    ],
    "heroCards": [
      {
        "value": "häufigste",
        "label": "benigne solide Leberläsion",
        "text": "meist Zufallsbefund"
      },
      {
        "value": "T2",
        "label": "Light-bulb sign",
        "text": "sehr helles Signal"
      },
      {
        "value": "ADC ↑",
        "label": "kein echter DWI-Restriktionsbefund",
        "text": "T2-shine-through"
      }
    ],
    "basics": {
      "title": "Klinische Grundlagen",
      "lead": "Das Leberhämangiom ist eine kavernöse, nicht neoplastische vaskuläre Malformation und der häufigste gutartige solide Lebertumor. Es wird häufig zufällig bei Staging- oder Screening-Untersuchungen entdeckt.",
      "items": [
        {
          "title": "Definition",
          "text": "Kavernöse, nicht neoplastische Malformation."
        },
        {
          "title": "Epidemiologie",
          "text": "Häufigster gutartiger solider Lebertumor, häufiger bei Frauen als bei Männern."
        },
        {
          "title": "Typische Lage",
          "text": "Oft peripher im Leberparenchym."
        }
      ],
      "key": "Bei klassischem Enhancement-Verhalten ist das Leberhämangiom eine Blickdiagnose. Entscheidend ist die Kombination aus sehr hohem T2-Signal und Blutpool-ähnlicher Kontrastmittelaufnahme."
    },
    "sono": {
      "title": "Sonographie",
      "lead": "In der Sonographie zeigt das typische Leberhämangiom eine sehr charakteristische Morphologie.",
      "tableHeaders": [
        "Merkmal",
        "Typischer Befund"
      ],
      "tableRows": [
        [
          "Echogenität",
          "meist echoreich, etwa 70 %"
        ],
        [
          "Begrenzung",
          "scharf begrenzt"
        ],
        [
          "Doppler",
          "gelegentlich periphere Gefäßstrukturen"
        ],
        [
          "Konsequenz",
          "bei klassischer Sonomorphologie keine weitere Diagnostik nötig"
        ]
      ],
      "key": "Ein kleines, scharf begrenztes, echoreiches Hämangiom bei unauffälliger Leber und typischer Morphologie braucht oft keine zusätzliche CT oder MRT."
    },
    "ct": {
      "title": "CT-Diagnostik",
      "lead": "Das typische Hämangiom zeigt in der dynamischen CT eine diskontinuierliche periphere noduläre Kontrastmittelaufnahme mit langsamer zentripetaler Auffüllung.",
      "tableHeaders": [
        "Phase",
        "Befund"
      ],
      "tableRows": [
        [
          "Nativ",
          "scharf begrenzte hypodense Läsion"
        ],
        [
          "Früharteriell",
          "peripher-noduläre, diskontinuierliche KM-Aufnahme"
        ],
        [
          "Portalvenös",
          "zentripetale Auffüllung vom Rand zur Mitte"
        ],
        [
          "Spätphase",
          "zunehmend homogen, ggf. vollständig hyperdens bzw. blutpoolähnlich"
        ]
      ],
      "irisTitle": "Irisblendenphänomen",
      "irisText": "Die Kontrastmittelaufnahme schreitet von außen nach innen fort – vergleichbar mit einer Irisblende, die sich von der Peripherie zum Zentrum schließt.",
      "key": "Die periphere noduläre KM-Aufnahme darf nicht mit einem malignen Ringenhancement verwechselt werden: Beim Hämangiom füllt sich die Läsion langsam zentripetal auf."
    },
    "mri": {
      "title": "MRT-Diagnostik",
      "lead": "Die MRT ist besonders hilfreich, wenn Sono oder CT nicht eindeutig sind. Typisch sind das sehr helle T2-Signal und das dynamische Blutpool-Enhancement.",
      "tableHeaders": [
        "Sequenz",
        "Typischer Befund",
        "Praktische Bedeutung"
      ],
      "tableRows": [
        [
          "T1 nativ",
          "hypo- bis isointens zur Leber",
          "unspezifisch"
        ],
        [
          "T2",
          "sehr helles Signal, Light-bulb sign",
          "oft heller als Galle"
        ],
        [
          "DWI",
          "hyperintens auf hohen b-Werten",
          "nicht spezifisch"
        ],
        [
          "ADC",
          "hohe ADC-Werte",
          "kein echter Diffusionsrestriktionsbefund"
        ],
        [
          "T1 C+ arteriell",
          "periphere noduläre, fleckige KM-Aufnahme",
          "Beginn am Rand"
        ],
        [
          "T1 C+ portal/spät",
          "zentripetale Auffüllung bis blutpoolähnlich",
          "klassisches Hämangiom-Muster"
        ]
      ],
      "lightBulbTitle": "Light-bulb sign",
      "lightBulbText": "Das typische Hämangiom ist in T2 sehr stark hyperintens. Kleine Hämangiome sind eher homogen, größere können durch Fibrosierung, Verkalkungen oder Thromben inhomogen sein.",
      "dwiTitle": "DWI richtig interpretieren",
      "dwiText": "Ein Hämangiom kann auf hohen b-Werten hell sein. Entscheidend ist aber die ADC-Karte: hohe ADC-Werte sprechen für T2-shine-through und gegen echte Restriktion.",
      "key": "DWI-Hyperintensität allein ist keine Metastase. Ohne niedrigen ADC-Wert liegt keine echte Diffusionsrestriktion vor."
    },
    "atypical": {
      "title": "Atypisches Leberhämangiom",
      "lead": "Atypische Hämangiome können durch ungewöhnliche Morphologie, fehlende zentripetale Auffüllung, Sklerosierung, Verkalkungen oder parenchymale Begleitveränderungen malignitätsverdächtig wirken.",
      "tableHeaders": [
        "Merkmal",
        "Typisches Hämangiom",
        "Atypisches Hämangiom"
      ],
      "tableRows": [
        [
          "T2",
          "sehr hyperintens, Light-bulb",
          "inhomogen hyperintens, oft weniger strahlend"
        ],
        [
          "DWI/ADC",
          "hell auf b-Werten, hohe ADC-Werte",
          "randständig hell, diskrete ADC-Einschränkung möglich"
        ],
        [
          "T1 nativ",
          "hypo- bis isointens",
          "häufig hypointens"
        ],
        [
          "T1 C+",
          "peripher nodulär + zentripetal",
          "oft früharteriell homogen starke KM-Aufnahme"
        ]
      ],
      "cave": "Wenn die klassische periphere noduläre Aufnahme und die zentripetale Auffüllung fehlen, sollte die Diagnose nicht vorschnell als typisches Hämangiom formuliert werden.",
      "key": "Atypische Hämangiome können Metastasen imitieren. Hilfreich sind Verlauf, Blutpool-Verhalten, ADC-Karte und Vergleich mit Voruntersuchungen."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "Die wichtigsten Befundungsregeln für die Praxis.",
      "items": [
        {
          "title": "Typisches Muster",
          "text": "Periphere noduläre KM-Aufnahme + zentripetale Auffüllung = klassisch für Hämangiom."
        },
        {
          "title": "MRT-Schlüssel",
          "text": "Sehr helles T2-Signal und hohe ADC-Werte sprechen für Hämangiom."
        },
        {
          "title": "DWI-Falle",
          "text": "Helles DWI-Signal ist häufig T2-shine-through und nicht automatisch Diffusionsrestriktion."
        },
        {
          "title": "Atypische Läsion",
          "text": "Fehlt das klassische Enhancement, müssen Metastasen und andere Leberläsionen sorgfältig differenziert werden."
        }
      ]
    }
  },
  "en": {
    "toc": "Contents",
    "breadcrumbAbdomen": "Abdomen",
    "breadcrumbCurrent": "Liver · Haemangiomas",
    "title": "Liver haemangiomas",
    "subtitle": "Classic and atypical imaging in ultrasound, CT and MRI",
    "sourceLabel": "Dr. Zia",
    "actionMcq": "MCQ",
    "actionFlash": "Flashcards",
    "keyLabel": "Key point",
    "caveLabel": "Caution",
    "sections": [
      {
        "id": "grundlagen",
        "label": "Basics",
        "icon": "🧬"
      },
      {
        "id": "sono",
        "label": "Ultrasound",
        "icon": "🔊"
      },
      {
        "id": "ct",
        "label": "CT",
        "icon": "🩻"
      },
      {
        "id": "mrt",
        "label": "MRI",
        "icon": "🧲"
      },
      {
        "id": "atypisch",
        "label": "Atypical haemangiomas",
        "icon": "⚠️"
      },
      {
        "id": "takehome",
        "label": "Take home",
        "icon": "☾"
      }
    ],
    "heroCards": [
      {
        "value": "most common",
        "label": "benign solid liver lesion",
        "text": "usually incidental"
      },
      {
        "value": "T2",
        "label": "light-bulb sign",
        "text": "very bright signal"
      },
      {
        "value": "ADC ↑",
        "label": "no true DWI restriction",
        "text": "T2 shine-through"
      }
    ],
    "basics": {
      "title": "Clinical basics",
      "lead": "A liver haemangioma is a cavernous, non-neoplastic vascular malformation and the most common benign solid liver tumour. It is often found incidentally during staging or screening examinations.",
      "items": [
        {
          "title": "Definition",
          "text": "Cavernous non-neoplastic malformation."
        },
        {
          "title": "Epidemiology",
          "text": "Most common benign solid liver tumour, more frequent in women than in men."
        },
        {
          "title": "Typical location",
          "text": "Often peripheral in the liver parenchyma."
        }
      ],
      "key": "With classic enhancement, liver haemangioma is a pattern diagnosis. The key combination is very high T2 signal and blood-pool-like enhancement."
    },
    "sono": {
      "title": "Ultrasound",
      "lead": "On ultrasound, a typical liver haemangioma often has a characteristic morphology.",
      "tableHeaders": [
        "Feature",
        "Typical finding"
      ],
      "tableRows": [
        [
          "Echogenicity",
          "usually hyperechoic, about 70%"
        ],
        [
          "Margins",
          "well-defined"
        ],
        [
          "Doppler",
          "occasionally peripheral vessels"
        ],
        [
          "Consequence",
          "no further imaging needed when morphology is classic"
        ]
      ],
      "key": "A small, sharply marginated, hyperechoic lesion with typical morphology in an otherwise unremarkable liver often needs no additional CT or MRI."
    },
    "ct": {
      "title": "CT diagnosis",
      "lead": "A typical haemangioma shows discontinuous peripheral nodular enhancement with slow centripetal fill-in on dynamic CT.",
      "tableHeaders": [
        "Phase",
        "Finding"
      ],
      "tableRows": [
        [
          "Non-contrast",
          "well-defined hypodense lesion"
        ],
        [
          "Early arterial",
          "peripheral nodular discontinuous enhancement"
        ],
        [
          "Portal venous",
          "centripetal fill-in from rim to centre"
        ],
        [
          "Delayed",
          "increasingly homogeneous, possibly completely hyperdense / blood-pool-like"
        ]
      ],
      "irisTitle": "Iris diaphragm phenomenon",
      "irisText": "Enhancement progresses from the periphery to the centre, like an iris diaphragm closing from outside to inside.",
      "key": "Peripheral nodular enhancement should not be mistaken for malignant rim enhancement: a haemangioma slowly fills in centripetally."
    },
    "mri": {
      "title": "MRI diagnosis",
      "lead": "MRI is especially useful when ultrasound or CT is equivocal. The key features are very bright T2 signal and dynamic blood-pool enhancement.",
      "tableHeaders": [
        "Sequence",
        "Typical finding",
        "Practical meaning"
      ],
      "tableRows": [
        [
          "Native T1",
          "hypo- to isointense to liver",
          "non-specific"
        ],
        [
          "T2",
          "very bright signal, light-bulb sign",
          "often brighter than bile"
        ],
        [
          "DWI",
          "hyperintense on high b-values",
          "not specific"
        ],
        [
          "ADC",
          "high ADC values",
          "no true diffusion restriction"
        ],
        [
          "T1 C+ arterial",
          "peripheral nodular patchy enhancement",
          "starts at the rim"
        ],
        [
          "T1 C+ portal/delayed",
          "centripetal fill-in until blood-pool-like",
          "classic haemangioma pattern"
        ]
      ],
      "lightBulbTitle": "Light-bulb sign",
      "lightBulbText": "A typical haemangioma is very hyperintense on T2. Small haemangiomas are often homogeneous, whereas larger ones may be heterogeneous due to fibrosis, calcification or thrombi.",
      "dwiTitle": "How to interpret DWI",
      "dwiText": "A haemangioma can be bright on high b-values. The ADC map is decisive: high ADC values indicate T2 shine-through and argue against true restriction.",
      "key": "DWI hyperintensity alone is not metastasis. Without low ADC, there is no true diffusion restriction."
    },
    "atypical": {
      "title": "Atypical liver haemangioma",
      "lead": "Atypical haemangiomas may appear suspicious because of unusual morphology, absent centripetal fill-in, sclerosis, calcifications or associated parenchymal changes.",
      "tableHeaders": [
        "Feature",
        "Typical haemangioma",
        "Atypical haemangioma"
      ],
      "tableRows": [
        [
          "T2",
          "very hyperintense, light-bulb",
          "heterogeneously hyperintense, often less bright"
        ],
        [
          "DWI/ADC",
          "bright on b-values, high ADC",
          "rim hyperintensity, mild ADC decrease possible"
        ],
        [
          "Native T1",
          "hypo- to isointense",
          "often hypointense"
        ],
        [
          "T1 C+",
          "peripheral nodular + centripetal",
          "often strong homogeneous arterial enhancement"
        ]
      ],
      "cave": "If classic peripheral nodular enhancement and centripetal fill-in are absent, the lesion should not be called a typical haemangioma too quickly.",
      "key": "Atypical haemangiomas can mimic metastases. Helpful features are follow-up stability, blood-pool behaviour, ADC map and comparison with prior imaging."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "The most important reporting rules for practice.",
      "items": [
        {
          "title": "Classic pattern",
          "text": "Peripheral nodular enhancement + centripetal fill-in = classic for haemangioma."
        },
        {
          "title": "MRI key",
          "text": "Very bright T2 signal and high ADC values support haemangioma."
        },
        {
          "title": "DWI pitfall",
          "text": "Bright DWI signal is often T2 shine-through and not automatically diffusion restriction."
        },
        {
          "title": "Atypical lesion",
          "text": "When classic enhancement is absent, metastases and other liver lesions must be carefully differentiated."
        }
      ]
    }
  },
  "fa": {
    "toc": "فهرست مطالب",
    "breadcrumbAbdomen": "شکم",
    "breadcrumbCurrent": "کبد · همانژیوم",
    "title": "همانژیوم‌های کبدی",
    "subtitle": "تصویربرداری تیپیک و آتیپیک در سونوگرافی، CT و MRI",
    "sourceLabel": "Dr. Zia",
    "actionMcq": "MCQ",
    "actionFlash": "فلش‌کارت",
    "keyLabel": "نکته مهم",
    "caveLabel": "احتیاط",
    "sections": [
      {
        "id": "grundlagen",
        "label": "مبانی",
        "icon": "🧬"
      },
      {
        "id": "sono",
        "label": "سونوگرافی",
        "icon": "🔊"
      },
      {
        "id": "ct",
        "label": "CT",
        "icon": "🩻"
      },
      {
        "id": "mrt",
        "label": "MRI",
        "icon": "🧲"
      },
      {
        "id": "atypisch",
        "label": "همانژیوم آتیپیک",
        "icon": "⚠️"
      },
      {
        "id": "takehome",
        "label": "Take home",
        "icon": "☾"
      }
    ],
    "heroCards": [
      {
        "value": "شایع‌ترین",
        "label": "ضایعه جامد خوش‌خیم کبد",
        "text": "اغلب اتفاقی دیده می‌شود"
      },
      {
        "value": "T2",
        "label": "Light-bulb sign",
        "text": "سیگنال بسیار روشن"
      },
      {
        "value": "ADC ↑",
        "label": "بدون محدودیت انتشار واقعی",
        "text": "T2 shine-through"
      }
    ],
    "basics": {
      "title": "مبانی بالینی",
      "lead": "همانژیوم کبدی یک مالفورماسیون عروقی کاورنوز و غیرنئوپلاستیک است و شایع‌ترین تومور جامد خوش‌خیم کبد محسوب می‌شود. معمولاً به صورت یافته اتفاقی در بررسی‌های staging یا screening دیده می‌شود.",
      "items": [
        {
          "title": "تعریف",
          "text": "مالفورماسیون کاورنوز غیرنئوپلاستیک."
        },
        {
          "title": "اپیدمیولوژی",
          "text": "شایع‌ترین تومور جامد خوش‌خیم کبد، در زنان شایع‌تر از مردان."
        },
        {
          "title": "محل تیپیک",
          "text": "اغلب در قسمت محیطی پارانشیم کبد."
        }
      ],
      "key": "وقتی الگوی enhancement کلاسیک باشد، همانژیوم کبدی تشخیص الگویی است. ترکیب مهم: سیگنال T2 بسیار بالا و enhancement شبیه blood pool."
    },
    "sono": {
      "title": "سونوگرافی",
      "lead": "در سونوگرافی، همانژیوم تیپیک کبدی معمولاً مورفولوژی بسیار مشخصی دارد.",
      "tableHeaders": [
        "ویژگی",
        "یافته تیپیک"
      ],
      "tableRows": [
        [
          "اکوژنیسیته",
          "اغلب اکوژن، حدود ۷۰٪"
        ],
        [
          "حاشیه",
          "واضح و sharply defined"
        ],
        [
          "داپلر",
          "گاهی عروق محیطی"
        ],
        [
          "نتیجه",
          "اگر ظاهر کاملاً تیپیک باشد، تصویربرداری بیشتر لازم نیست"
        ]
      ],
      "key": "یک ضایعه کوچک، خوش‌حد، اکوژن و تیپیک در کبد بدون مشکل زمینه‌ای اغلب نیاز به CT یا MRI اضافه ندارد."
    },
    "ct": {
      "title": "تشخیص در CT",
      "lead": "همانژیوم تیپیک در CT دینامیک، enhancement ندولار محیطی و ناپیوسته با پرشدگی آهسته از محیط به مرکز نشان می‌دهد.",
      "tableHeaders": [
        "فاز",
        "یافته"
      ],
      "tableRows": [
        [
          "بدون کنتراست",
          "ضایعه هیپودنس و خوش‌حد"
        ],
        [
          "شریانی زودرس",
          "enhancement ندولار محیطی و ناپیوسته"
        ],
        [
          "پورتال",
          "پرشدگی centripetal از حاشیه به مرکز"
        ],
        [
          "تأخیری",
          "به‌تدریج هموژن، گاهی کاملاً hyperdense یا شبیه blood pool"
        ]
      ],
      "irisTitle": "پدیده Iris diaphragm",
      "irisText": "جذب ماده حاجب از محیط به سمت مرکز پیش می‌رود؛ شبیه دیافراگم عنبیه که از بیرون به داخل بسته می‌شود.",
      "key": "enhancement ندولار محیطی را نباید با rim enhancement بدخیم اشتباه گرفت: همانژیوم آهسته از محیط به مرکز پر می‌شود."
    },
    "mri": {
      "title": "تشخیص در MRI",
      "lead": "MRI زمانی بسیار کمک‌کننده است که سونوگرافی یا CT قطعی نباشد. نکته کلیدی، T2 بسیار روشن و enhancement دینامیک شبیه blood pool است.",
      "tableHeaders": [
        "سکانس",
        "یافته تیپیک",
        "معنای عملی"
      ],
      "tableRows": [
        [
          "T1 نیتیو",
          "هیپو تا ایزواینتنس نسبت به کبد",
          "غیراختصاصی"
        ],
        [
          "T2",
          "سیگنال بسیار روشن، Light-bulb sign",
          "گاهی حتی روشن‌تر از صفرا"
        ],
        [
          "DWI",
          "هایپراینتنس در b-value بالا",
          "اختصاصی نیست"
        ],
        [
          "ADC",
          "ADC بالا",
          "محدودیت انتشار واقعی ندارد"
        ],
        [
          "T1 C+ شریانی",
          "enhancement ندولار و لکه‌ای محیطی",
          "شروع از حاشیه"
        ],
        [
          "T1 C+ پورتال/تأخیری",
          "پرشدگی مرکزگرا تا حالت blood-pool-like",
          "الگوی کلاسیک همانژیوم"
        ]
      ],
      "lightBulbTitle": "Light-bulb sign",
      "lightBulbText": "همانژیوم تیپیک در T2 بسیار هایپراینتنس است. همانژیوم‌های کوچک اغلب هموژن هستند، ولی ضایعات بزرگ‌تر می‌توانند به علت فیبروز، کلسیفیکاسیون یا ترومبوز ناهمگون باشند.",
      "dwiTitle": "تفسیر درست DWI",
      "dwiText": "همانژیوم می‌تواند در b-value بالا روشن باشد. اما ADC تعیین‌کننده است: ADC بالا یعنی T2 shine-through و علیه محدودیت انتشار واقعی است.",
      "key": "هایپراینتنس بودن در DWI به تنهایی متاستاز نیست. بدون ADC پایین، محدودیت انتشار واقعی وجود ندارد."
    },
    "atypical": {
      "title": "همانژیوم آتیپیک کبدی",
      "lead": "همانژیوم‌های آتیپیک به علت مورفولوژی غیرمعمول، نبود پرشدگی مرکزگرا، اسکلروز، کلسیفیکاسیون یا تغییرات همراه پارانشیم ممکن است شبیه ضایعات بدخیم دیده شوند.",
      "tableHeaders": [
        "ویژگی",
        "همانژیوم تیپیک",
        "همانژیوم آتیپیک"
      ],
      "tableRows": [
        [
          "T2",
          "بسیار هایپراینتنس، Light-bulb",
          "ناهمگون هایپراینتنس، اغلب کمتر درخشان"
        ],
        [
          "DWI/ADC",
          "روشن در b-value، ADC بالا",
          "روشن محیطی، کاهش خفیف ADC ممکن است"
        ],
        [
          "T1 نیتیو",
          "هیپو تا ایزواینتنس",
          "اغلب هیپواینتنس"
        ],
        [
          "T1 C+",
          "ندولار محیطی + centripetal",
          "اغلب enhancement هموژن و قوی در فاز شریانی"
        ]
      ],
      "cave": "اگر enhancement ندولار محیطی و پرشدگی مرکزگرا وجود نداشته باشد، نباید سریع تشخیص همانژیوم تیپیک نوشته شود.",
      "key": "همانژیوم آتیپیک می‌تواند متاستاز را تقلید کند. پیگیری، رفتار blood-pool، ADC و مقایسه با تصاویر قبلی کمک‌کننده هستند."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "مهم‌ترین قوانین گزارش‌نویسی برای عمل روزمره.",
      "items": [
        {
          "title": "الگوی کلاسیک",
          "text": "enhancement ندولار محیطی + پرشدگی مرکزگرا = تیپیک برای همانژیوم."
        },
        {
          "title": "کلید MRI",
          "text": "T2 بسیار روشن و ADC بالا به نفع همانژیوم است."
        },
        {
          "title": "دام DWI",
          "text": "DWI روشن اغلب T2 shine-through است و خودبه‌خود محدودیت انتشار نیست."
        },
        {
          "title": "ضایعه آتیپیک",
          "text": "اگر enhancement کلاسیک وجود ندارد، متاستاز و سایر ضایعات کبدی باید دقیق افتراق داده شوند."
        }
      ]
    }
  }
}


const CASE_COPY = {
  de: {
    label: 'Fallbeispiele',
    title: 'Fallbeispiele',
    lead: 'Dieser Abschnitt ist als Ziel für die automatische Fallbeispiele-Verknüpfung vorbereitet. Konkrete Fälle können hier später ergänzt werden.',
    placeholderTitle: 'Fallbeispiele werden ergänzt',
    placeholderText: 'Sobald echte Bildfälle zu Leberhämangiomen vorhanden sind, erscheinen sie hier direkt im Kapitel.',
  },
  en: {
    label: 'Cases',
    title: 'Cases',
    lead: 'This section is prepared as the target for automatic case links. Concrete cases can be added here later.',
    placeholderTitle: 'Cases will be added',
    placeholderText: 'As soon as real imaging cases for liver haemangiomas are available, they will appear directly in this chapter.',
  },
  fa: {
    label: 'نمونه کیس‌ها',
    title: 'نمونه کیس‌ها',
    lead: 'این بخش به عنوان مقصد لینک خودکار Fallbeispiele آماده شده است. کیس‌های واقعی بعداً همین‌جا اضافه می‌شوند.',
    placeholderTitle: 'کیس‌ها بعداً اضافه می‌شوند',
    placeholderText: 'به محض آماده شدن کیس‌های تصویری واقعی برای همانژیوم کبد، همین‌جا داخل فصل نمایش داده می‌شوند.',
  },
}

const READ_COPY = {
  de: { mark: 'Lektion abschließen', read: 'Lektion abgeschlossen', hint: 'Fortschritt im Profil speichern', doneHint: 'Als gelesen gespeichert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Complete lesson', read: 'Lesson completed', hint: 'Save progress to your profile', doneHint: 'Saved as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'تکمیل درس', read: 'درس تکمیل شد', hint: 'ذخیره پیشرفت در پروفایل', doneHint: 'به‌عنوان خوانده‌شده ذخیره شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

function ReadButton({ isRead, onClick, authError }) {
  const { lang } = useLanguage()
  const copy = READ_COPY[lang] || READ_COPY.de
  return (
    <div className={styles.readControl}>
      <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={onClick}>
        <span className={styles.readIcon}>{isRead ? '✓' : '○'}</span>
        <span className={styles.readText}><strong>{isRead ? copy.read : copy.mark}</strong><small>{isRead ? copy.doneHint : copy.hint}</small></span>
      </button>
      {authError && <div className={styles.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function Table({ headers, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({ type = 'note', label, children }) {
  return (
    <div className={`${styles.callout} ${type === 'cave' ? styles.cave : ''}`.trim()}>
      <strong>{type === 'cave' ? '⚠️' : '💡'} {label}</strong>
      <p>{children}</p>
    </div>
  )
}

function Section({ id, title, lead, children }) {
  const [open, setOpen] = useState(true)
  return (
    <section id={id} className={styles.section}>
      <button className={styles.sectionHeader} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <h2>{title}</h2>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className={styles.sectionBody}>
          {lead && <p className={styles.lead}>{lead}</p>}
          {children}
        </div>
      )}
    </section>
  )
}

export default function LeberHaemangiomPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const caseCopy = CASE_COPY[lang] || CASE_COPY.de
  const pageSections = useMemo(() => {
    const exists = copy.sections.some(section => section.id === 'fallbeispiele')
    if (exists) return copy.sections
    const takeHomeIndex = copy.sections.findIndex(section => section.id === 'takehome')
    const caseSection = { id: 'fallbeispiele', label: caseCopy.label, icon: '🧪' }
    if (takeHomeIndex === -1) return [...copy.sections, caseSection]
    return [...copy.sections.slice(0, takeHomeIndex), caseSection, ...copy.sections.slice(takeHomeIndex)]
  }, [copy.sections, caseCopy.label])
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(pageSections[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus('haemangiom')
  const withLang = (href) => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

  const sectionIds = useMemo(() => pageSections.map(section => section.id), [pageSections])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/abdomen')}>{copy.breadcrumbAbdomen}</Link>
          <span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
            <div className={styles.actions}>
              <Link href={withLang('/ueben/quiz?fach=abdomen&n=10&themen=haemangiom')} className={styles.actionBtn}>🎯 {copy.actionMcq}</Link>
              <Link href={withLang('/flashcards/haemangiom')} className={styles.actionBtn}>🧠 {copy.actionFlash}</Link>
              <ReadButton isRead={isRead} onClick={toggleRead} authError={authError} />
            </div>
          </div>
          <div className={styles.heroStats}>
            {copy.heroCards.map(card => (
              <div className={styles.heroStat} key={card.label}>
                <strong>{card.value}</strong>
                <span>{card.label}</span>
                <small>{card.text}</small>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{copy.toc}</div>
          {pageSections.map(section => (
            <button
              type="button"
              key={section.id}
              className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
              onClick={() => scrollTo(section.id)}
            >
              <span>{section.icon}</span>
              <strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={copy.basics.title} lead={copy.basics.lead}>
            <div className={styles.cardsGrid}>
              {copy.basics.items.map(item => (
                <div className={styles.infoCard} key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <Callout label={copy.keyLabel}>{copy.basics.key}</Callout>
          </Section>

          <Section id="sono" title={copy.sono.title} lead={copy.sono.lead}>
            <Table headers={copy.sono.tableHeaders} rows={copy.sono.tableRows} />
            <Callout label={copy.keyLabel}>{copy.sono.key}</Callout>
          </Section>

          <Section id="ct" title={copy.ct.title} lead={copy.ct.lead}>
            <Table headers={copy.ct.tableHeaders} rows={copy.ct.tableRows} />
            <div className={styles.highlightBox}>
              <h3>{copy.ct.irisTitle}</h3>
              <p>{copy.ct.irisText}</p>
            </div>
            <Callout label={copy.keyLabel}>{copy.ct.key}</Callout>
          </Section>

          <Section id="mrt" title={copy.mri.title} lead={copy.mri.lead}>
            <Table headers={copy.mri.tableHeaders} rows={copy.mri.tableRows} />
            <div className={styles.splitGrid}>
              <div className={styles.infoCard}>
                <h3>{copy.mri.lightBulbTitle}</h3>
                <p>{copy.mri.lightBulbText}</p>
              </div>
              <div className={styles.infoCard}>
                <h3>{copy.mri.dwiTitle}</h3>
                <p>{copy.mri.dwiText}</p>
              </div>
            </div>
            <Callout label={copy.keyLabel}>{copy.mri.key}</Callout>
          </Section>

          <Section id="atypisch" title={copy.atypical.title} lead={copy.atypical.lead}>
            <Table headers={copy.atypical.tableHeaders} rows={copy.atypical.tableRows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.atypical.cave}</Callout>
            <Callout label={copy.keyLabel}>{copy.atypical.key}</Callout>
          </Section>


          <Section id="fallbeispiele" title={caseCopy.title} lead={caseCopy.lead}>
            <div className={styles.casePlaceholder}>
              <span>🧪</span>
              <div>
                <h3>{caseCopy.placeholderTitle}</h3>
                <p>{caseCopy.placeholderText}</p>
              </div>
            </div>
          </Section>

          <Section id="takehome" title={copy.takehome.title} lead={copy.takehome.lead}>
            <div className={styles.takeHomeGrid}>
              {copy.takehome.items.map((item, index) => (
                <div className={styles.takeHomeItem} key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <ReadButton isRead={isRead} onClick={toggleRead} authError={authError} />
          </Section>
        </div>
      </div>
    </main>
  )
}
