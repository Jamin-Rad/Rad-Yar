const L = (de, en, fa) => ({ de, en, fa })
const option = (id, text) => ({ id, text })

export const WRIST_EXTENSOR_QUESTIONS = {
  "de": [
    {
      "id": "sehnenpathologien-hand-de-01",
      "fach": "msk",
      "tags": [
        "sehnenpathologien-hand"
      ],
      "question": "Textfall: Sie verfolgen eine einzelne Strecksehne in der dorsoulnaren Rinne der distalen Ulna nahe dem Ulnastyloid. Welche Sehne und welches reguläre Fach passen?",
      "options": [
        {
          "id": "A",
          "text": "ECU im Fach VI"
        },
        {
          "id": "B",
          "text": "EPL im Fach III"
        },
        {
          "id": "C",
          "text": "ECRL und ECRB im Fach II"
        },
        {
          "id": "D",
          "text": "EDC und EIP im Fach IV"
        }
      ],
      "correct": "A",
      "explanation": "Die ECU-Sehne verläuft im sechsten dorsalen Fach an der distalen Ulna. Den knöchernen Landmarken und dem Sehnenverlauf folgen; eine einzelne axiale Lagebeziehung nicht mit einer Pathologiediagnose verwechseln.",
      "wrongExplanations": {
        "B": "EPL verläuft am Lister-Tuberkulum des Radius im Fach III, nicht in der ulnaren ECU-Rinne.",
        "C": "ECRL und ECRB liegen gemeinsam radial des Lister-Tuberkulums im Fach II.",
        "D": "EDC und EIP liegen im größeren zentralen Fach IV und nicht in der beschriebenen dorsoulnaren Einzelrinne."
      },
      "source": "MSK.pdf, physical page 41 (printed40); actual page and labels freshly visually read2026-10-25",
      "difficulty": 1
    },
    {
      "id": "sehnenpathologien-hand-de-02",
      "fach": "msk",
      "tags": [
        "sehnenpathologien-hand"
      ],
      "question": "Bei der Orientierung der Handwurzel verfolgen Sie eine Gelenklinie zwischen proximaler und distaler Handwurzelreihe. Welches Gelenk ist gemeint?",
      "options": [
        {
          "id": "A",
          "text": "Mediokarpalgelenk zwischen den beiden Handwurzelreihen"
        },
        {
          "id": "B",
          "text": "Radiokarpalgelenk zwischen Radius und proximaler Handwurzelreihe"
        },
        {
          "id": "C",
          "text": "Daumensattelgelenk zwischen Trapezium und Metakarpale I"
        },
        {
          "id": "D",
          "text": "Intermetakarpalgelenke zwischen benachbarten Metakarpalbasen"
        }
      ],
      "correct": "A",
      "explanation": "Die beschriebene Verbindung ist das Mediokarpalgelenk. In der deutschen Quellenabbildung wird es auch „distales Handgelenk“ genannt; zur eindeutigen Befundbeschreibung die anatomische Gelenkbezeichnung verwenden.",
      "wrongExplanations": {
        "B": "Das Radiokarpalgelenk liegt proximal der proximalen Handwurzelreihe, nicht zwischen beiden Reihen.",
        "C": "Das Daumensattelgelenk verbindet Trapezium und Metakarpale I; es trennt nicht die beiden Handwurzelreihen.",
        "D": "Intermetakarpalgelenke verbinden benachbarte Mittelhandbasen distal der Handwurzel, nicht die beiden Handwurzelreihen."
      },
      "source": "MSK.pdf, physical page 40 (printed39); actual page and labels freshly visually read2026-10-25",
      "difficulty": 1
    }
  ],
  "en": [
    {
      "id": "sehnenpathologien-hand-en-01",
      "fach": "msk",
      "tags": [
        "sehnenpathologien-hand"
      ],
      "question": "Text vignette: you trace a single extensor tendon in the dorsoulnar groove of the distal ulna near the ulnar styloid. Which tendon and usual compartment fit?",
      "options": [
        {
          "id": "A",
          "text": "ECU in compartment VI"
        },
        {
          "id": "B",
          "text": "EPL in compartment III"
        },
        {
          "id": "C",
          "text": "ECRL and ECRB in compartment II"
        },
        {
          "id": "D",
          "text": "EDC and EIP in compartment IV"
        }
      ],
      "correct": "A",
      "explanation": "ECU runs in the sixth dorsal compartment at the distal ulna. Follow the bony landmarks and tendon course; one axial anatomical relationship is not a pathology diagnosis.",
      "wrongExplanations": {
        "B": "EPL passes around the radial Lister tubercle in compartment III, not in the ulnar ECU groove.",
        "C": "ECRL and ECRB share compartment II radial to Lister tubercle.",
        "D": "EDC and EIP occupy the larger central compartment IV rather than the described dorsoulnar single-tendon groove."
      },
      "source": "MSK.pdf, physical page 41 (printed40); actual page and labels freshly visually read2026-10-25",
      "difficulty": 1
    },
    {
      "id": "sehnenpathologien-hand-en-02",
      "fach": "msk",
      "tags": [
        "sehnenpathologien-hand"
      ],
      "question": "While orienting the carpus, you trace a joint line between the proximal and distal carpal rows. Which joint is this?",
      "options": [
        {
          "id": "A",
          "text": "Midcarpal joint between the two carpal rows"
        },
        {
          "id": "B",
          "text": "Radiocarpal joint between radius and proximal carpal row"
        },
        {
          "id": "C",
          "text": "Thumb carpometacarpal joint between trapezium and first metacarpal"
        },
        {
          "id": "D",
          "text": "Intermetacarpal joints between neighbouring metacarpal bases"
        }
      ],
      "correct": "A",
      "explanation": "The described articulation is the midcarpal joint. The German source figure also calls it the “distal wrist”; use the anatomical joint name for an unambiguous report.",
      "wrongExplanations": {
        "B": "The radiocarpal joint lies proximal to the proximal carpal row, not between the two rows.",
        "C": "The thumb carpometacarpal joint connects trapezium and first metacarpal; it does not separate the two carpal rows.",
        "D": "Intermetacarpal joints connect adjacent metacarpal bases distal to the carpus, not the two carpal rows."
      },
      "source": "MSK.pdf, physical page 40 (printed39); actual page and labels freshly visually read2026-10-25",
      "difficulty": 1
    }
  ],
  "fa": [
    {
      "id": "sehnenpathologien-hand-fa-01",
      "fach": "msk",
      "tags": [
        "sehnenpathologien-hand"
      ],
      "question": "سناریوی متنی: یک تاندون اکستانسور را در شیار پشتی‌اولنار انتهای اولنا نزدیک استایلوئید اولنا دنبال می‌کنید. کدام تاندون و کمپارتمان معمول مناسب است؟",
      "options": [
        {
          "id": "A",
          "text": "ECU در کمپارتمان VI"
        },
        {
          "id": "B",
          "text": "EPL در کمپارتمان III"
        },
        {
          "id": "C",
          "text": "ECRL و ECRB در کمپارتمان II"
        },
        {
          "id": "D",
          "text": "EDC و EIP در کمپارتمان IV"
        }
      ],
      "correct": "A",
      "explanation": "ECU در کمپارتمان ششم پشتی در سطح انتهای اولنا عبور می‌کند. لندمارک استخوانی و مسیر تاندون دنبال شوند؛ یک رابطهٔ آناتومیک محوری را نباید تشخیص پاتولوژی دانست.",
      "wrongExplanations": {
        "B": "EPL در کمپارتمان III کنار تکمهٔ لیستر رادیوس عبور می‌کند، نه در شیار اولنار ECU.",
        "C": "ECRL و ECRB در کمپارتمان II و در سمت رادیال تکمهٔ لیستر با هم قرار دارند.",
        "D": "EDC و EIP در کمپارتمان مرکزی و بزرگ‌تر IV قرار دارند، نه در شیار پشتی‌اولنار تک‌تاندونی توصیف‌شده."
      },
      "source": "MSK.pdf, physical page 41 (printed40); actual page and labels freshly visually read2026-10-25",
      "difficulty": 1
    },
    {
      "id": "sehnenpathologien-hand-fa-02",
      "fach": "msk",
      "tags": [
        "sehnenpathologien-hand"
      ],
      "question": "هنگام جهت‌یابی کارپ، خط مفصلی بین ردیف پروگزیمال و دیستال استخوان‌های کارپ را دنبال می‌کنید. کدام مفصل است؟",
      "options": [
        {
          "id": "A",
          "text": "مفصل میدکارپی بین دو ردیف استخوان‌های کارپ"
        },
        {
          "id": "B",
          "text": "مفصل رادیوکارپی بین رادیوس و ردیف پروگزیمال کارپ"
        },
        {
          "id": "C",
          "text": "مفصل کارپومتاکارپی شست بین تراپزیوم و متاکارپ اول"
        },
        {
          "id": "D",
          "text": "مفاصل بین‌متاکارپی بین قاعده‌های متاکارپ مجاور"
        }
      ],
      "correct": "A",
      "explanation": "اتصال توصیف‌شده مفصل میدکارپی است. در شکل آلمانی منبع، «مچ دیستال» نیز نامیده می‌شود؛ برای گزارش بدون ابهام از نام آناتومیک مفصل استفاده کنید.",
      "wrongExplanations": {
        "B": "مفصل رادیوکارپی در سمت پروگزیمال ردیف پروگزیمال کارپ است، نه بین دو ردیف.",
        "C": "مفصل کارپومتاکارپی شست تراپزیوم را به متاکارپ اول متصل می‌کند و دو ردیف کارپ را از هم جدا نمی‌کند.",
        "D": "مفاصل بین‌متاکارپی قاعده‌های متاکارپ مجاور را در دیستال کارپ متصل می‌کنند، نه دو ردیف کارپ را."
      },
      "source": "MSK.pdf, physical page 40 (printed39); actual page and labels freshly visually read2026-10-25",
      "difficulty": 1
    }
  ]
}

export const DE_QUERVAIN_QUESTIONS = {
  "de": [
    {
      "id": "de-quervain-de-01",
      "fach": "msk",
      "tags": [
        "de-quervain"
      ],
      "question": "Textfall: Bei radialem Handgelenkschmerz zeigt die MRT verdickte APL-/EPB-Sehnen über dem Radiusstyloid mit Flüssigkeit in der gemeinsamen Sehnenscheide und peritendinösem Ödem. Faserunterbrechung oder Retraktion sind nicht erkennbar. Welche Befundinterpretation passt am besten?",
      "options": [
        {
          "id": "A",
          "text": "Tenosynoviales Veränderungsmuster im ersten Strecksehnenfach, mit der Klinik einer de-Quervain-Erkrankung abzugleichen"
        },
        {
          "id": "B",
          "text": "Komplette APL-Ruptur im ersten Strecksehnenfach mit retrahiertem proximalem Sehnenstumpf"
        },
        {
          "id": "C",
          "text": "Längsgerichtete EPB-Spaltruptur als Erklärung eines flüssigkeitsgefüllten intratendinösen Spalts"
        },
        {
          "id": "D",
          "text": "Umschriebene Ganglionzyste neben unveränderter Sehnenscheide als Erklärung des radialen Schmerzes"
        }
      ],
      "correct": "A",
      "explanation": "APL und EPB gehören zum ersten Strecksehnenfach. Verdickung, Scheidenflüssigkeit und peritendinöses Ödem passen zu einem tenosynovialen Muster; sie sind mit Untersuchung und Beschwerden abzugleichen. Intratendinöses Signal und subkutanes Ödem können variieren und sind keine obligaten Einzelkriterien.",
      "wrongExplanations": {
        "B": "Für die beschriebene komplette Ruptur fehlen Faserunterbrechung und Retraktion. Scheidenflüssigkeit allein belegt keinen kompletten Sehnenriss.",
        "C": "Ein intratendinöser längsgerichteter Spalt ist nicht beschrieben. Das angegebene Flüssigkeitsmuster liegt in der Scheide und peritendinös.",
        "D": "Eine umschriebene Ganglionzyste erklärt nicht die beschriebenen Veränderungen der Sehnen und ihrer Scheide. Eine solche fokale Zyste ist hier nicht angegeben."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/8717121/"
    }
  ],
  "en": [
    {
      "id": "de-quervain-en-01",
      "fach": "msk",
      "tags": [
        "de-quervain"
      ],
      "question": "Text vignette: in radial wrist pain, MRI shows thickened APL/EPB tendons over the radial styloid with fluid in their common sheath and peritendinous oedema. No fibre discontinuity or retraction is visible. Which interpretation fits best?",
      "options": [
        {
          "id": "A",
          "text": "Tenosynovial change in the first extensor compartment, to correlate with clinical de Quervain disease"
        },
        {
          "id": "B",
          "text": "Complete APL rupture in the first extensor compartment with a retracted proximal tendon stump"
        },
        {
          "id": "C",
          "text": "Longitudinal EPB split tear explaining a fluid-filled intratendinous cleft"
        },
        {
          "id": "D",
          "text": "Focal ganglion beside an unchanged tendon sheath explaining radial pain"
        }
      ],
      "correct": "A",
      "explanation": "APL and EPB occupy the first extensor compartment. Thickening, sheath fluid and peritendinous oedema fit a tenosynovial pattern and require clinical correlation. Intratendinous signal and subcutaneous oedema may vary and are not mandatory individual criteria.",
      "wrongExplanations": {
        "B": "The stated complete tear lacks discontinuity and retraction. Sheath fluid alone does not establish a complete tendon tear.",
        "C": "No longitudinal intratendinous cleft is described. The stated fluid pattern is in the sheath and surrounding tissues.",
        "D": "A focal ganglion does not explain the described tendon and sheath changes. No such focal cyst is specified here."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/8717121/"
    }
  ],
  "fa": [
    {
      "id": "de-quervain-fa-01",
      "fach": "msk",
      "tags": [
        "de-quervain"
      ],
      "question": "سناریوی متنی: در درد رادیال مچ، MRI ضخیم‌شدن تاندون‌های APL/EPB روی استایلوئید رادیوس، مایع در غلاف مشترک و ادم اطراف تاندون را نشان می‌دهد. قطع رشته یا عقب‌کشیدگی دیده نمی‌شود. کدام تفسیر مناسب‌تر است؟",
      "options": [
        {
          "id": "A",
          "text": "الگوی تغییر تنوسینوویال در کمپارتمان اول اکستانسور، نیازمند تطبیق با بالین دو کروَن"
        },
        {
          "id": "B",
          "text": "پارگی کامل APL در کمپارتمان اول با عقب‌کشیدگی انتهای پروگزیمال تاندون"
        },
        {
          "id": "C",
          "text": "پارگی طولی شکاف‌دار EPB برای توضیح شکاف پر از مایع داخل تاندون"
        },
        {
          "id": "D",
          "text": "کیست گانگلیون محدود در کنار غلاف تاندون بدون تغییر به‌عنوان علت درد رادیال"
        }
      ],
      "correct": "A",
      "explanation": "APL و EPB در کمپارتمان اول اکستانسور قرار دارند. ضخیم‌شدن، مایع غلاف و ادم اطراف تاندون با الگوی تنوسینوویال سازگارند و باید با معاینه و علائم تطبیق داده شوند. سیگنال داخل تاندون و ادم زیرجلدی می‌توانند متغیر باشند و معیارهای منفرد الزامی نیستند.",
      "wrongExplanations": {
        "B": "برای پارگی کاملِ مطرح‌شده، قطع رشته و عقب‌کشیدگی وجود ندارد. مایع غلاف به‌تنهایی پارگی کامل تاندون را ثابت نمی‌کند.",
        "C": "شکاف طولی داخل تاندون توصیف نشده است؛ الگوی مایعِ ذکرشده در غلاف و بافت اطراف تاندون قرار دارد.",
        "D": "کیست گانگلیون محدود تغییرات توصیف‌شدهٔ تاندون و غلاف را توضیح نمی‌دهد؛ چنین کیست کانونی‌ای در اینجا ذکر نشده است."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/8717121/"
    }
  ]
}

export const WRIST_EXTENSOR_FLASHCARD_TOPIC = {
  id: 'sehnenpathologien-hand', area: 'MSK', chapter: 'Handgelenk', icon: 'MR', iconImage: '/fach/msk.png', color: '#0e7490', href: '/flashcards/sehnenpathologien-hand',
  title: L('Handgelenk: Knochen und Strecksehnenfächer', 'Wrist: carpal bones and extensor compartments', 'مچ دست: استخوان‌های کارپ و کمپارتمان‌های اکستانسور'),
  subtitle: L('Karpale Gelenklinien · Fächer I–VI', 'Carpal joint lines · compartments I–VI', 'خطوط مفصلی کارپ · کمپارتمان‌های I تا VI'),
}

export const DE_QUERVAIN_FLASHCARD_TOPIC = {
  id: 'de-quervain', area: 'MSK', chapter: 'Handgelenk', icon: 'MR', iconImage: '/fach/msk.png', color: '#0e7490', href: '/flashcards/de-quervain',
  title: L('Tendovaginitis de Quervain', "De Quervain's tenosynovitis", 'تنوسینوویت دو کروَن'),
  subtitle: L('Erstes Strecksehnenfach · APL/EPB · MRT', 'First extensor compartment · APL/EPB · MRI', 'کمپارتمان اول اکستانسور · APL/EPB · MRI'),
}

export const WRIST_EXTENSOR_FLASHCARDS = [
  {
    "id": "wrist-carpal-midcarpal",
    "topicId": "sehnenpathologien-hand",
    "category": {
      "de": "Handwurzelanatomie",
      "en": "Carpal anatomy",
      "fa": "آناتومی کارپ"
    },
    "front": {
      "de": "Welche Gelenklinie trennt die proximale von der distalen Handwurzelreihe?",
      "en": "Which joint line separates the proximal and distal carpal rows?",
      "fa": "کدام خط مفصلی ردیف پروگزیمال را از ردیف دیستال کارپ جدا می‌کند؟"
    },
    "answer": {
      "de": "Das Mediokarpalgelenk zwischen proximaler und distaler Handwurzelreihe.",
      "en": "The midcarpal joint between the proximal and distal carpal rows.",
      "fa": "مفصل میدکارپی بین ردیف پروگزیمال و دیستال استخوان‌های کارپ."
    },
    "explanation": {
      "de": "Das Mediokarpalgelenk liegt zwischen beiden Reihen; das Radiokarpalgelenk liegt weiter proximal zwischen Radius und proximaler Reihe.",
      "en": "The midcarpal joint lies between the rows; the radiocarpal joint is farther proximally between radius and proximal row.",
      "fa": "مفصل میدکارپی بین دو ردیف قرار دارد؛ مفصل رادیوکارپی در سمت پروگزیمال‌تر، بین رادیوس و ردیف پروگزیمال است."
    },
    "source": "MSK.pdf, physical pages40–41 (printed39–40); actual pages and labels freshly visually read2026-10-25"
  },
  {
    "id": "wrist-extensor-compartment-1",
    "topicId": "sehnenpathologien-hand",
    "category": {
      "de": "Anatomie",
      "en": "Anatomy",
      "fa": "آناتومی"
    },
    "front": {
      "de": "Welche Sehnen liegen im ersten Strecksehnenfach?",
      "en": "Which tendons lie in the first extensor compartment?",
      "fa": "کدام تاندون‌ها در کمپارتمان اول اکستانسور قرار دارند؟"
    },
    "answer": {
      "de": "APL und EPB.",
      "en": "APL and EPB.",
      "fa": "APL و EPB."
    },
    "explanation": {
      "de": "Das erste Fach liegt am radialen Processus styloideus.",
      "en": "The first compartment lies at the radial styloid.",
      "fa": "کمپارتمان اول در سطح استایلوئید رادیوس قرار دارد."
    },
    "source": "MSK.pdf, physical pages40–41 (printed39–40); actual pages and labels freshly visually read2026-10-25"
  },
  {
    "id": "wrist-extensor-compartment-6",
    "topicId": "sehnenpathologien-hand",
    "category": {
      "de": "Anatomie",
      "en": "Anatomy",
      "fa": "آناتومی"
    },
    "front": {
      "de": "Welche Sehne verläuft im sechsten Strecksehnenfach?",
      "en": "Which tendon runs in the sixth extensor compartment?",
      "fa": "کدام تاندون در کمپارتمان ششم اکستانسور قرار دارد؟"
    },
    "answer": {
      "de": "ECU in einer eigenen Rinne am Ulnastyloid.",
      "en": "ECU in a separate groove at the ulnar styloid.",
      "fa": "ECU در شیار اختصاصی روی استایلوئید اولنا."
    },
    "explanation": {
      "de": "Die sechs Kompartimente werden von radial nach ulnar zugeordnet.",
      "en": "The six compartments are mapped from radial to ulnar.",
      "fa": "شش کمپارتمان از سمت رادیال به اولنار شماره‌گذاری می‌شوند."
    },
    "source": "MSK.pdf, physical pages40–41 (printed39–40); actual pages and labels freshly visually read2026-10-25"
  }
]

export const DE_QUERVAIN_FLASHCARDS = [
  {
  "id": "de-quervain-anatomy",
  "topicId": "de-quervain",
  "category": {
    "de": "Anatomie",
    "en": "Anatomy",
    "fa": "آناتومی"
  },
  "front": {
    "de": "Welche Sehnen sind bei de Quervain betroffen?",
    "en": "Which tendons are involved in de Quervain disease?",
    "fa": "در دو کروَن کدام تاندون‌ها درگیرند؟"
  },
  "answer": {
    "de": "APL und EPB im ersten Strecksehnenfach.",
    "en": "APL and EPB in the first extensor compartment.",
    "fa": "APL و EPB در کمپارتمان اول اکستانسور."
  },
  "explanation": {
    "de": "Das Fach liegt über dem radialen Processus styloideus.",
    "en": "The compartment lies over the radial styloid.",
    "fa": "این کمپارتمان روی استایلوئید رادیوس قرار دارد."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/8717121/"
},
  {
  "id": "de-quervain-mri",
  "topicId": "de-quervain",
  "category": {
    "de": "MRT",
    "en": "MRI",
    "fa": "MRI"
  },
  "front": {
    "de": "Welche Strukturen sollten im MRT-Befund getrennt beschrieben werden?",
    "en": "Which structures should be described separately in the MRI findings?",
    "fa": "در گزارش MRI کدام ساختارها باید جداگانه توصیف شوند؟"
  },
  "answer": {
    "de": "Sehne, Sehnenscheide und umgebendes radiales subkutanes Gewebe.",
    "en": "Tendon, tendon sheath and surrounding radial subcutaneous tissue.",
    "fa": "تاندون، غلاف تاندون و بافت زیرجلدی رادیال اطراف."
  },
  "explanation": {
    "de": "Sehnenverdickung und peritendinöses Ödem waren in der kleinen ursprünglichen MRT-Serie besonders konsistent. Intratendinöses Signal und subkutanes Ödem waren variabler; einzelne Bildzeichen ersetzen die klinische Einordnung nicht.",
    "en": "Tendon thickening and peritendinous oedema were especially consistent in the small original MRI series. Intratendinous signal and subcutaneous oedema were more variable; individual imaging signs do not replace clinical interpretation.",
    "fa": "ضخیم‌شدن تاندون و ادم اطراف آن در مجموعهٔ کوچک MRI اصلی پایدارتر بودند. سیگنال داخل تاندون و ادم زیرجلدی متغیرتر بودند؛ نشانه‌های منفرد تصویری جای تفسیر بالینی را نمی‌گیرند."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/8717121/"
},
  {
  "id": "de-quervain-provocation",
  "topicId": "de-quervain",
  "category": {
    "de": "Klinik",
    "en": "Clinical",
    "fa": "بالینی"
  },
  "front": {
    "de": "Was ist bei einem schmerzhaften Provokationstest am radialen Handgelenk wichtig?",
    "en": "What matters when a provocative manoeuvre causes radial wrist pain?",
    "fa": "در مانور تحریکی دردناک در سمت رادیال مچ چه نکته‌ای مهم است؟"
  },
  "answer": {
    "de": "Schmerzprovokation ist kein alleiniger Beweis; Testausführung und Terminologie müssen genau benannt werden.",
    "en": "Pain provocation alone is not diagnostic; name the manoeuvre and its execution precisely.",
    "fa": "بازتولید درد به‌تنهایی تشخیصی نیست؛ نام و شیوهٔ اجرای مانور را دقیق ذکر کنید."
  },
  "explanation": {
    "de": "Der Daumen-in-der-Faust-Test mit Ulnardeviation wird häufig als Eichhoff-Manöver bezeichnet. In der Studie an beschwerdefreien Handgelenken waren falsch-positive Reaktionen möglich; daraus lässt sich keine Sensitivität bei Erkrankten ableiten.",
    "en": "The thumb-in-fist test with ulnar deviation is often termed the Eichhoff manoeuvre. False-positive responses occurred in the study of asymptomatic wrists; this cannot establish sensitivity in affected patients.",
    "fa": "آزمون قرار دادن شست داخل مشت همراه انحراف اولنار اغلب مانور آیکهوف نامیده می‌شود. در مطالعهٔ مچ‌های بدون علامت پاسخ مثبت کاذب ممکن بود؛ از آن نمی‌توان حساسیت آزمون را در بیماران نتیجه گرفت."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6103758/"
},
]
