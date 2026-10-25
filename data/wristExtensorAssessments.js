const L = (de, en, fa) => ({ de, en, fa })
const option = (id, text) => ({ id, text })

export const WRIST_EXTENSOR_QUESTIONS = {
  de: [
    { id: 'sehnenpathologien-hand-de-01', fach: 'msk', tags: ['sehnenpathologien-hand'], question: 'Welche Sehne verläuft im sechsten Strecksehnenfach am Ulnastyloid?', options: [option('A', 'ECU · M. extensor carpi ulnaris'), option('B', 'EPL · M. extensor pollicis longus'), option('C', 'ECRL und ECRB'), option('D', 'EDC und EIP')], correct: 'A', explanation: 'Fach VI enthält die ECU-Sehne in einer eigenen Rinne am Ulnastyloid; das entspricht der Zuordnung in MSK.pdf p.41.' },
    { id: 'sehnenpathologien-hand-de-02', fach: 'msk', tags: ['sehnenpathologien-hand'], question: 'Welche Gelenkverbindung ist in der Abbildung als „distales Handgelenk (Art. mediocarpalis)“ bezeichnet?', options: [option('A', 'Mediokarpalgelenk zwischen den beiden Handwurzelreihen'), option('B', 'Radiokarpalgelenk zwischen Radius und proximaler Handwurzelreihe'), option('C', 'Daumensattelgelenk'), option('D', 'Intermetakarpalgelenke')], correct: 'A', explanation: 'Die Quelle bezeichnet die Verbindung zwischen proximaler und distaler Handwurzelreihe als distales Handgelenk bzw. Art. mediocarpalis (MSK.pdf, S.40).'},
  ],
  en: [
    { id: 'sehnenpathologien-hand-en-01', fach: 'msk', tags: ['sehnenpathologien-hand'], question: 'Which tendon runs in the sixth extensor compartment at the ulnar styloid?', options: [option('A', 'ECU · extensor carpi ulnaris'), option('B', 'EPL · extensor pollicis longus'), option('C', 'ECRL and ECRB'), option('D', 'EDC and EIP')], correct: 'A', explanation: 'Compartment VI contains the ECU tendon in its own groove at the ulnar styloid, matching MSK.pdf p.41.' },
    { id: 'sehnenpathologien-hand-en-02', fach: 'msk', tags: ['sehnenpathologien-hand'], question: 'Which joint is labelled “distal wrist (Art. mediocarpalis)” in the figure?', options: [option('A', 'The midcarpal joint between the two carpal rows'), option('B', 'The radiocarpal joint between radius and proximal carpal row'), option('C', 'The thumb carpometacarpal joint'), option('D', 'The intermetacarpal joints')], correct: 'A', explanation: 'The source labels the articulation between the proximal and distal carpal rows as the distal wrist or Art. mediocarpalis (MSK.pdf, p.40).'},
  ],
  fa: [
    { id: 'sehnenpathologien-hand-fa-01', fach: 'msk', tags: ['sehnenpathologien-hand'], question: 'کدام تاندون در کمپارتمان ششم اکستانسور در سطح استایلوئید اولنا قرار دارد؟', options: [option('A', 'ECU · extensor carpi ulnaris'), option('B', 'EPL · extensor pollicis longus'), option('C', 'ECRL و ECRB'), option('D', 'EDC و EIP')], correct: 'A', explanation: 'کمپارتمان VI تاندون ECU را در شیار اختصاصی روی استایلوئید اولنا دربر می‌گیرد؛ مطابق صفحهٔ ۴۱ MSK.pdf.' },
    { id: 'sehnenpathologien-hand-fa-02', fach: 'msk', tags: ['sehnenpathologien-hand'], question: 'در شکل، کدام مفصل با عنوان «مفصل دیستال مچ دست (Art. mediocarpalis)» مشخص شده است؟', options: [option('A', 'مفصل میدکارپی بین دو ردیف استخوان‌های کارپ'), option('B', 'مفصل رادیوکارپی بین رادیوس و ردیف پروگزیمال کارپ'), option('C', 'مفصل کارپومتاکارپی شست'), option('D', 'مفاصل بین‌متاکارپی')], correct: 'A', explanation: 'منبع، مفصل بین ردیف پروگزیمال و دیستال کارپ را «مچ دیستال» یا Art. mediocarpalis نامیده است (MSK.pdf، صفحهٔ ۴۰).'},
  ],
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
  { id: 'wrist-carpal-midcarpal', topicId: 'sehnenpathologien-hand', category: L('Handwurzelanatomie', 'Carpal anatomy', 'آناتومی کارپ'), front: L('Was bezeichnet die Beschriftung „distales Handgelenk (Art. mediocarpalis)“?', 'What does the label “distal wrist (Art. mediocarpalis)” identify?', 'برچسب «مچ دیستال (Art. mediocarpalis)» به کدام مفصل اشاره می‌کند؟'), answer: L('Das Mediokarpalgelenk zwischen proximaler und distaler Handwurzelreihe.', 'The midcarpal joint between the proximal and distal carpal rows.', 'مفصل میدکارپی بین ردیف پروگزیمال و دیستال استخوان‌های کارپ.'), explanation: L('So bezeichnet es die beschriftete dorsale Übersicht in MSK.pdf, S.40.', 'That is how the labelled dorsal overview in MSK.pdf, p.40 identifies it.', 'نمای پشتی برچسب‌گذاری‌شده در MSK.pdf، صفحهٔ ۴۰ این مفصل را چنین مشخص می‌کند.') },
  { id: 'wrist-extensor-compartment-1', topicId: 'sehnenpathologien-hand', category: L('Anatomie', 'Anatomy', 'آناتومی'), front: L('Welche Sehnen liegen im ersten Strecksehnenfach?', 'Which tendons lie in the first extensor compartment?', 'کدام تاندون‌ها در کمپارتمان اول اکستانسور قرار دارند؟'), answer: L('APL und EPB.', 'APL and EPB.', 'APL و EPB.'), explanation: L('Das erste Fach liegt am radialen Processus styloideus.', 'The first compartment lies at the radial styloid.', 'کمپارتمان اول در سطح استایلوئید رادیوس قرار دارد.') },
  { id: 'wrist-extensor-compartment-6', topicId: 'sehnenpathologien-hand', category: L('Anatomie', 'Anatomy', 'آناتومی'), front: L('Welche Sehne verläuft im sechsten Strecksehnenfach?', 'Which tendon runs in the sixth extensor compartment?', 'کدام تاندون در کمپارتمان ششم اکستانسور قرار دارد؟'), answer: L('ECU in einer eigenen Rinne am Ulnastyloid.', 'ECU in a separate groove at the ulnar styloid.', 'ECU در شیار اختصاصی روی استایلوئید اولنا.'), explanation: L('Die sechs Kompartimente werden von radial nach ulnar zugeordnet.', 'The six compartments are mapped from radial to ulnar.', 'شش کمپارتمان از سمت رادیال به اولنار شماره‌گذاری می‌شوند.') },
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
