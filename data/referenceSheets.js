export const REFERENCE_COPY = {
  de: {
    homeLabel: 'Schnell nachschlagen',
    homeTitle: 'Spickzettel Radiologie',
    homeTitleFa: 'خلاصه‌های کاربردی رادیولوژی',
    homeDesc: 'Kompakte Referenzwerte, Größenkriterien, Klassifikationen und Scores für den radiologischen Alltag.',
    open: 'Ansehen',
    backHome: 'Zur Startseite',
    chooseChapter: 'Kapitel wählen',
    countSuffix: 'Einträge',
    empty: 'Für diesen Bereich sind noch keine Einträge angelegt.',
    sections: {
      measurements: {
        title: 'Größen & Messwerte',
        kicker: 'Normwerte, Grenzwerte und Messpunkte',
        desc: 'Orientierende Größenkriterien und Messwerte nach Organsystemen. MSK und Technik bleiben hier bewusst außen vor.',
      },
      classifications: {
        title: 'Klassifikationen & Scores',
        kicker: 'Scores, Systeme und strukturierte Einteilungen',
        desc: 'Radiologische Klassifikationen nach Fachgebiet, inklusive ausführlicher MSK-Unterteilung.',
      },
    },
  },
  en: {
    homeLabel: 'Quick reference',
    homeTitle: 'Radiology Quick Sheets',
    homeTitleFa: 'خلاصه‌های کاربردی رادیولوژی',
    homeDesc: 'Compact reference values, size criteria, classifications, and scores for day-to-day radiology.',
    open: 'Open',
    backHome: 'Back home',
    chooseChapter: 'Choose chapter',
    countSuffix: 'entries',
    empty: 'No entries have been added for this section yet.',
    sections: {
      measurements: {
        title: 'Sizes & Measurements',
        kicker: 'Normal values, thresholds, and measurement points',
        desc: 'Orientation values and size criteria by organ system. MSK and technique are intentionally excluded here.',
      },
      classifications: {
        title: 'Classifications & Scores',
        kicker: 'Scores, systems, and structured grading',
        desc: 'Radiology classifications by specialty, including a detailed MSK breakdown.',
      },
    },
  },
  fa: {
    homeLabel: 'مرجع سریع',
    homeTitle: 'خلاصه‌های کاربردی رادیولوژی',
    homeTitleFa: 'Radiology Quick Sheets',
    homeDesc: 'مقادیر مرجع، معیارهای اندازه، طبقه‌بندی‌ها و اسکورهای مهم برای استفاده روزمره در رادیولوژی.',
    open: 'مشاهده',
    backHome: 'بازگشت به خانه',
    chooseChapter: 'انتخاب فصل',
    countSuffix: 'مورد',
    empty: 'برای این بخش هنوز موردی ثبت نشده است.',
    sections: {
      measurements: {
        title: 'اندازه‌ها و مقادیر',
        kicker: 'مقادیر طبیعی، حدود مهم و نقاط اندازه‌گیری',
        desc: 'معیارهای اندازه و مقادیر کاربردی بر اساس سیستم‌های بدن. MSK و تکنیک عمدا در این بخش نیامده‌اند.',
      },
      classifications: {
        title: 'طبقه‌بندی‌ها و اسکورها',
        kicker: 'سیستم‌ها، اسکورهای بالینی-تصویری و گریدینگ',
        desc: 'طبقه‌بندی‌های رادیولوژی بر اساس حوزه، همراه با تقسیم‌بندی کامل‌تر MSK.',
      },
    },
  },
}

export const REFERENCE_SECTIONS = [
  {
    id: 'measurements',
    href: '/referenzen/messwerte',
    color: '#0ea5e9',
    icon: 'R',
    preview: {
      de: ['Abdomen', 'Thorax', 'Neuro / Kopf-Hals', 'Urogenital / Becken', 'Gefäße'],
      en: ['Abdomen', 'Thorax', 'Neuro / Head & Neck', 'Urogenital / Pelvis', 'Vessels'],
      fa: ['شکم', 'توراکس', 'نورو / سر و گردن', 'اورولوژی / لگن', 'عروق'],
    },
  },
  {
    id: 'classifications',
    href: '/referenzen/klassifikationen',
    color: '#f97316',
    icon: 'S',
    preview: {
      de: ['Abdomen', 'Thorax', 'Neuro / Kopf-Hals', 'Urogenital / Becken', 'Gefäße', 'MSK'],
      en: ['Abdomen', 'Thorax', 'Neuro / Head & Neck', 'Urogenital / Pelvis', 'Vessels', 'MSK'],
      fa: ['شکم', 'توراکس', 'نورو / سر و گردن', 'اورولوژی / لگن', 'عروق', 'MSK'],
    },
  },
]

export const REFERENCE_CONTENT = {
  measurements: [
    {
      id: 'abdomen',
      color: '#10b981',
      title: { de: 'Abdomen', en: 'Abdomen', fa: 'شکم' },
      desc: {
        de: 'Organe, Darm, Gallenwege, Nebennieren und abdominale Lymphknoten.',
        en: 'Solid organs, bowel, bile ducts, adrenals, and abdominal lymph nodes.',
        fa: 'ارگان‌های شکمی، روده، مجاری صفراوی، آدرنال و لنف‌نودهای شکمی.',
      },
      groups: [
        {
          title: { de: 'Organe', en: 'Organs', fa: 'ارگان‌ها' },
          items: [
            { title: 'Milzgröße', detail: 'Länge, Volumenabschätzung, Splenomegalie-Grenzen' },
            { title: 'Lebergröße', detail: 'Kraniokaudale Ausdehnung, Lappenverhältnisse, Zeichen der Hepatomegalie' },
            { title: 'Pankreasgang', detail: 'Normweite, altersabhängige Erweiterung, Double-duct-Konstellation' },
            { title: 'Nebennieren', detail: 'Größenkriterien, Dichtewerte, Washout-Messung' },
          ],
        },
        {
          title: { de: 'Darm & Gallenwege', en: 'Bowel & Bile Ducts', fa: 'روده و مجاری صفراوی' },
          items: [
            { title: 'Appendix', detail: 'Durchmesser, Wanddicke, periappendikuläre Zeichen' },
            { title: 'Darmwanddicke', detail: 'Dünndarm, Kolon, Rektum und entzündliche Muster' },
            { title: 'Ductus choledochus', detail: 'Alters- und postoperativ abhängige Weite' },
            { title: 'Gallenblasenwand', detail: 'Wanddicke, Hydrops, Steine und Entzündungszeichen' },
          ],
        },
        {
          title: { de: 'Lymphknoten', en: 'Lymph Nodes', fa: 'لنف‌نودها' },
          items: [
            { title: 'Retroperitoneale LK', detail: 'Kurzachsengrenzen nach Station und Morphologie' },
            { title: 'Mesenteriale LK', detail: 'Größe, Cluster, reaktive versus suspekte Muster' },
            { title: 'Leberhilus / Porta hepatis', detail: 'Messpunkte und typische Grenzwerte' },
          ],
        },
      ],
    },
    {
      id: 'thorax',
      color: '#0ea5e9',
      title: { de: 'Thorax', en: 'Thorax', fa: 'توراکس' },
      desc: {
        de: 'Lungenrundherde, mediastinale Lymphknoten, Pleura und zentrale Thoraxgefäße.',
        en: 'Pulmonary nodules, mediastinal lymph nodes, pleura, and central thoracic vessels.',
        fa: 'ندول‌های ریوی، لنف‌نودهای مدیاستن، پلورا و عروق مرکزی توراکس.',
      },
      groups: [
        {
          title: { de: 'Lunge & Pleura', en: 'Lung & Pleura', fa: 'ریه و پلورا' },
          items: [
            { title: 'Lungenrundherde', detail: 'Solide, subsolide und Milchglas-Knoten nach Größe' },
            { title: 'Pleuraerguss', detail: 'Schichtdicke, sonographische Tiefe, Drainage-relevante Orientierung' },
            { title: 'Bronchialwand', detail: 'Wandverdickung, Bronchiektasen und luminale Erweiterung' },
          ],
        },
        {
          title: { de: 'Mediastinum', en: 'Mediastinum', fa: 'مدیاستن' },
          items: [
            { title: 'Mediastinale LK', detail: 'Kurzachse nach Station, Morphologie und Kontext' },
            { title: 'Herzgröße', detail: 'Kardiothorakaler Quotient und CT-basierte Orientierung' },
            { title: 'Pulmonalarterie', detail: 'Hauptstammweite, Verhältnis zur Aorta, PH-Hinweise' },
          ],
        },
      ],
    },
    {
      id: 'neuro-head-neck',
      color: '#7c3aed',
      title: { de: 'Neuro / Kopf-Hals', en: 'Neuro / Head & Neck', fa: 'نورو / سر و گردن' },
      desc: {
        de: 'Ventrikel, Orbita, Nasennebenhöhlen und zervikale Lymphknoten.',
        en: 'Ventricles, orbit, paranasal sinuses, and cervical lymph nodes.',
        fa: 'بطن‌ها، اربیت، سینوس‌ها و لنف‌نودهای گردنی.',
      },
      groups: [
        {
          title: { de: 'Neurokranium', en: 'Neurocranium', fa: 'نوروکرانیوم' },
          items: [
            { title: 'Ventrikelweite', detail: 'Evans-Index, temporale Hörner, Hydrozephalus-Zeichen' },
            { title: 'Mittellinienverlagerung', detail: 'Messung am Septum pellucidum und klinische Relevanz' },
            { title: 'Tonsillentiefstand', detail: 'Foramen-magnum-Bezug und Chiari-Orientierung' },
          ],
        },
        {
          title: { de: 'Kopf-Hals', en: 'Head & Neck', fa: 'سر و گردن' },
          items: [
            { title: 'Nervus opticus / Orbitascheiden', detail: 'Durchmesser als Hinweis bei erhöhtem intrakraniellem Druck' },
            { title: 'Nasennebenhöhlen', detail: 'Schleimhautdicke, Flüssigkeitsspiegel, Ostien' },
            { title: 'Zervikale LK', detail: 'Level-basierte Kurzachsen, Nekrose, Form und Hilus' },
          ],
        },
      ],
    },
    {
      id: 'urogenital-pelvis',
      color: '#e11d48',
      title: { de: 'Urogenital / Becken', en: 'Urogenital / Pelvis', fa: 'اورولوژی / لگن' },
      desc: {
        de: 'Niere, ableitende Harnwege, Prostata, Uterus, Ovarien und Beckenlymphknoten.',
        en: 'Kidneys, urinary tract, prostate, uterus, ovaries, and pelvic lymph nodes.',
        fa: 'کلیه، مجاری ادراری، پروستات، رحم، تخمدان و لنف‌نودهای لگنی.',
      },
      groups: [
        {
          title: { de: 'Urogenital', en: 'Urogenital', fa: 'اورولوژی' },
          items: [
            { title: 'Nierenlänge', detail: 'Normbereich, Seitendifferenz, Atrophie und Kompensation' },
            { title: 'Harnstau', detail: 'Beckenkelchsystem, Ureterweite und Schweregrade' },
            { title: 'Prostatavolumen', detail: 'Ellipsoidformel und zonale Orientierung' },
          ],
        },
        {
          title: { de: 'Gynäkologisches Becken', en: 'Gynecologic Pelvis', fa: 'لگن زنان' },
          items: [
            { title: 'Endometrium', detail: 'Zyklus- und postmenopausale Grenzwerte' },
            { title: 'Ovarien', detail: 'Volumen, Follikel, Zysten und altersabhängige Bewertung' },
            { title: 'Becken-LK', detail: 'Obturatorisch, iliakal, inguinal: Kurzachsen und Morphologie' },
          ],
        },
      ],
    },
    {
      id: 'vessels',
      color: '#2563eb',
      title: { de: 'Gefäße', en: 'Vessels', fa: 'عروق' },
      desc: {
        de: 'Aorta, Carotis, Beinarterien und venöse Messungen ohne doppelte Technik-Kategorie.',
        en: 'Aorta, carotid arteries, lower-limb arteries, and venous measurements without a duplicate technique category.',
        fa: 'آئورت، کاروتید، شریان‌های اندام تحتانی و اندازه‌گیری‌های وریدی بدون بخش تکراری تکنیک.',
      },
      groups: [
        {
          title: { de: 'Arteriell', en: 'Arterial', fa: 'شریانی' },
          items: [
            { title: 'Aorta', detail: 'Thorakal, abdominal, Aneurysma-Grenzen und Messachsen' },
            { title: 'Carotisstenose', detail: 'NASCET-Messung, Referenzsegment und Prozentangabe' },
            { title: 'Beinarterien', detail: 'Stenosegrad, Referenzdurchmesser, Kaliberwechsel' },
          ],
        },
        {
          title: { de: 'Venös', en: 'Venous', fa: 'وریدی' },
          items: [
            { title: 'Vena cava inferior', detail: 'Durchmesser, Kollapsibilität, Stauungszeichen' },
            { title: 'Beckenvenen', detail: 'Thrombosezeichen, Kompression, postthrombotische Veränderungen' },
            { title: 'Pfortader', detail: 'Durchmesser, Flussrichtung, portale Hypertension' },
          ],
        },
      ],
    },
  ],
  classifications: [
    {
      id: 'abdomen',
      color: '#10b981',
      title: { de: 'Abdomen', en: 'Abdomen', fa: 'شکم' },
      desc: {
        de: 'Leber, Niere, Darm, Pankreas und onkologische Response-Systeme.',
        en: 'Liver, kidney, bowel, pancreas, and oncologic response systems.',
        fa: 'کبد، کلیه، روده، پانکراس و سیستم‌های پاسخ درمانی.',
      },
      groups: [
        {
          title: { de: 'Leber & Niere', en: 'Liver & Kidney', fa: 'کبد و کلیه' },
          items: [
            { title: 'LI-RADS', detail: 'HCC-Risikopatienten, CT/MRT-Kategorien, Major Features' },
            { title: 'Bosniak 2019', detail: 'Zystische Nierenläsionen, septale Wand, Enhancement und Follow-up' },
            { title: 'CEUS LI-RADS', detail: 'Kontrastmittelsonographie der Leber bei Risikopatienten' },
          ],
        },
        {
          title: { de: 'Entzündung & Onkologie', en: 'Inflammation & Oncology', fa: 'التهاب و انکولوژی' },
          items: [
            { title: 'Hinchey', detail: 'Divertikulitis mit Abszess, Peritonitis und Perforation' },
            { title: 'Balthazar / CTSI', detail: 'Akute Pankreatitis, Nekrosegrad und CT-Schwereindex' },
            { title: 'RECIST 1.1', detail: 'Target-Läsionen, Non-target-Läsionen und Response-Kategorien' },
            { title: 'TNM Abdomen', detail: 'Bildgebende T-, N- und M-Kriterien nach Organentität' },
          ],
        },
      ],
    },
    {
      id: 'thorax',
      color: '#0ea5e9',
      title: { de: 'Thorax', en: 'Thorax', fa: 'توراکس' },
      desc: {
        de: 'Lungenrundherde, Screening, Lungenembolie und thorakale Tumorstadien.',
        en: 'Pulmonary nodules, screening, pulmonary embolism, and thoracic tumor staging.',
        fa: 'ندول‌های ریوی، غربالگری، آمبولی ریه و استیجینگ تومورهای توراکس.',
      },
      groups: [
        {
          title: { de: 'Lunge', en: 'Lung', fa: 'ریه' },
          items: [
            { title: 'Fleischner', detail: 'Inzidentelle Lungenrundherde nach Größe, Dichte und Risiko' },
            { title: 'Lung-RADS', detail: 'Screening-Befunde und standardisierte Management-Kategorien' },
            { title: 'TNM Lunge', detail: 'Tumorgröße, Invasion, LK-Stationen und Metastasen' },
          ],
        },
        {
          title: { de: 'Akut & Mediastinum', en: 'Acute & Mediastinum', fa: 'حاد و مدیاستن' },
          items: [
            { title: 'Lungenembolie-Risikostratifizierung', detail: 'RV/LV-Ratio, Reflux, Embolieausmaß und Rechtsherzbelastung' },
            { title: 'Mediastinale LK-Stationen', detail: 'IASLC-Karte und onkologische Zuordnung' },
            { title: 'Pleura-Klassifikationen', detail: 'Empyem, Pneumothorax und pleurale Tumormuster' },
          ],
        },
      ],
    },
    {
      id: 'neuro-head-neck',
      color: '#7c3aed',
      title: { de: 'Neuro / Kopf-Hals', en: 'Neuro / Head & Neck', fa: 'نورو / سر و گردن' },
      desc: {
        de: 'Schlaganfall, Wirbelsäulen-Degeneration, weiße Substanz und Kopf-Hals-Tumoren.',
        en: 'Stroke, spine degeneration, white matter, and head-neck tumors.',
        fa: 'سکته، دژنراسیون ستون فقرات، ماده سفید و تومورهای سر و گردن.',
      },
      groups: [
        {
          title: { de: 'Neuro', en: 'Neuro', fa: 'نورو' },
          items: [
            { title: 'ASPECTS', detail: 'Frühe Ischämiezeichen im Media-Territorium' },
            { title: 'Fazekas', detail: 'Marklagerläsionen und mikroangiopathische Veränderungen' },
            { title: 'NI-RADS', detail: 'Kopf-Hals-Onkologie im Follow-up' },
            { title: 'Cavernoma / Blutungs-Scores', detail: 'Verlauf, Blutungszeichen und Risikomerkmale' },
          ],
        },
        {
          title: { de: 'Wirbelsäule degenerativ', en: 'Degenerative Spine', fa: 'ستون فقرات دژنراتیو' },
          items: [
            { title: 'Modic', detail: 'Endplattenveränderungen Typ I bis III' },
            { title: 'Pfirrmann', detail: 'Bandscheibendegeneration in der MRT' },
            { title: 'Meyerding', detail: 'Spondylolisthesis nach Gleitstrecke' },
            { title: 'Kang / Lee Stenose', detail: 'Zentrale und foraminale Spinalkanalstenose' },
          ],
        },
      ],
    },
    {
      id: 'urogenital-pelvis',
      color: '#e11d48',
      title: { de: 'Urogenital / Becken', en: 'Urogenital / Pelvis', fa: 'اورولوژی / لگن' },
      desc: {
        de: 'Prostata, Blase, Ovar, Endometrium und gynäkologische Tumorstadien.',
        en: 'Prostate, bladder, ovary, endometrium, and gynecologic tumor staging.',
        fa: 'پروستات، مثانه، تخمدان، اندومتر و استیجینگ تومورهای ژنیکولوژیک.',
      },
      groups: [
        {
          title: { de: 'Urologie', en: 'Urology', fa: 'اورولوژی' },
          items: [
            { title: 'PI-RADS v2.1', detail: 'Prostata-MRT nach Zone, DWI, T2 und DCE' },
            { title: 'VI-RADS', detail: 'MRT-Staging des Blasenkarzinoms und Muskelinvasion' },
            { title: 'Bosniak 2019', detail: 'Zystische Nierenläsionen, wenn urogenital einsortiert' },
          ],
        },
        {
          title: { de: 'Gynäkologie', en: 'Gynecology', fa: 'زنان' },
          items: [
            { title: 'O-RADS US / MRI', detail: 'Adnexläsionen und Malignitätsrisiko' },
            { title: 'IOTA / ADNEX', detail: 'Sonographische Risikomodelle für Adnexbefunde' },
            { title: 'FIGO bildgebend', detail: 'Zervix-, Endometrium- und Ovarialkarzinom' },
            { title: 'ESUR Endometrium / Cervix', detail: 'MRT-Protokolle und strukturierte Staging-Punkte' },
          ],
        },
      ],
    },
    {
      id: 'vessels',
      color: '#2563eb',
      title: { de: 'Gefäße', en: 'Vessels', fa: 'عروق' },
      desc: {
        de: 'Aortensyndrome, Stenosen, Endoleaks und venöse Einteilungen.',
        en: 'Aortic syndromes, stenoses, endoleaks, and venous classifications.',
        fa: 'سندرم‌های آئورت، تنگی‌ها، اندولیک و طبقه‌بندی‌های وریدی.',
      },
      groups: [
        {
          title: { de: 'Aorta & Arterien', en: 'Aorta & Arteries', fa: 'آئورت و شریان‌ها' },
          items: [
            { title: 'Stanford / DeBakey', detail: 'Aortendissektion nach Lokalisation und Ausdehnung' },
            { title: 'SVS / ESVS Aneurysma', detail: 'Aneurysma-Lokalisation, Morphologie und Therapieplanung' },
            { title: 'NASCET', detail: 'Carotisstenose in Prozent mit distalem Referenzdurchmesser' },
            { title: 'TASC II', detail: 'Periphere arterielle Verschlusskrankheit nach Läsionsmuster' },
          ],
        },
        {
          title: { de: 'Interventionell & Venös', en: 'Interventional & Venous', fa: 'مداخله‌ای و وریدی' },
          items: [
            { title: 'EVAR-Endoleak', detail: 'Typ I bis V und Management-Relevanz' },
            { title: 'CEAP', detail: 'Chronische Venenerkrankung klinisch und anatomisch' },
            { title: 'May-Thurner / Kompressionssyndrome', detail: 'Bildmuster und hämodynamische Relevanz' },
          ],
        },
      ],
    },
    {
      id: 'msk',
      color: '#f97316',
      title: { de: 'MSK', en: 'MSK', fa: 'MSK' },
      desc: {
        de: 'Ausführlicher MSK-Bereich mit oberer Extremität, unterer Extremität, Wirbelsäule und Trauma.',
        en: 'Detailed MSK section with upper limb, lower limb, spine, and trauma.',
        fa: 'بخش کامل‌تر MSK شامل اندام فوقانی، اندام تحتانی، ستون فقرات و تروما.',
      },
      groups: [
        {
          title: { de: 'Obere Extremität', en: 'Upper Limb', fa: 'اندام فوقانی' },
          items: [
            { title: 'Neer', detail: 'Proximale Humerusfrakturen nach Fragmenten und Dislokation' },
            { title: 'Rockwood', detail: 'AC-Gelenksprengung Typ I bis VI' },
            { title: 'Mason', detail: 'Radiuskopffrakturen und Therapieorientierung' },
            { title: 'AO / OTA Schulter-Humerus-Ellenbogen', detail: 'Lokalisation, Morphologie und Gelenkbeteiligung' },
            { title: 'TFCC / Handgelenk', detail: 'Palmer-Klassifikation und ulnokarpale Läsionen' },
            { title: 'Glenoid bone loss / Hill-Sachs', detail: 'Instabilität, on-track/off-track-Konzept' },
          ],
        },
        {
          title: { de: 'Untere Extremität', en: 'Lower Limb', fa: 'اندام تحتانی' },
          items: [
            { title: 'Weber / Lauge-Hansen', detail: 'Sprunggelenksfrakturen nach Höhe und Mechanismus' },
            { title: 'Garden / Pauwels', detail: 'Schenkelhalsfrakturen nach Dislokation und Scherwinkel' },
            { title: 'Schatzker', detail: 'Tibiaplateaufrakturen Typ I bis VI' },
            { title: 'Kellgren-Lawrence', detail: 'Arthrosegrad nach Osteophyten, Gelenkspalt und Sklerose' },
            { title: 'Meniskus: Root / Ramp / Stoller', detail: 'MRT-Muster, Instabilität und OP-Relevanz' },
            { title: 'Outerbridge / ICRS', detail: 'Knorpelschäden nach Tiefe und Ausdehnung' },
            { title: 'Lisfranc / Hawkins', detail: 'Mittelfußverletzungen und Talusfrakturen' },
          ],
        },
        {
          title: { de: 'Wirbelsäule', en: 'Spine', fa: 'ستون فقرات' },
          items: [
            { title: 'AO Spine', detail: 'A-, B-, C-Verletzungen, neurologischer Status und Modifier' },
            { title: 'TLICS', detail: 'Thorakolumbale Verletzungen nach Morphologie, PLC und Neurologie' },
            { title: 'SINS', detail: 'Spinale Instabilität bei neoplastischer Erkrankung' },
            { title: 'Modic', detail: 'Endplattenveränderungen Typ I bis III' },
            { title: 'Pfirrmann', detail: 'Bandscheibendegeneration in der MRT' },
            { title: 'Meyerding', detail: 'Spondylolisthesis Grad I bis V' },
          ],
        },
        {
          title: { de: 'Trauma allgemein', en: 'General Trauma', fa: 'ترومای عمومی' },
          items: [
            { title: 'AO / OTA allgemein', detail: 'Systematische Frakturklassifikation nach Region und Morphologie' },
            { title: 'Salter-Harris', detail: 'Epiphysenfugenverletzungen im Kindesalter' },
            { title: 'Gustilo-Anderson', detail: 'Offene Frakturen nach Weichteilschaden' },
            { title: 'Mirels', detail: 'Frakturrisiko bei Knochenmetastasen' },
            { title: 'Risser / Sanders', detail: 'Skelettreife bei Wirbelsäulen- und Wachstumsthemen' },
          ],
        },
      ],
    },
  ],
}

export function tr(value, lang) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.de || value.en || ''
}

export function getReferenceKindFromSlug(slug) {
  if (slug === 'messwerte') return 'measurements'
  if (slug === 'klassifikationen') return 'classifications'
  return null
}

export function countReferenceItems(category) {
  return category.groups.reduce((sum, group) => sum + group.items.length, 0)
}
