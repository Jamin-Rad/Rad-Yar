const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })
const F = (id, category, front, answer, explanation, diagram = null) => ({ id, category, front, answer, explanation, diagram })

// ─── Lesson ──────────────────────────────────────────────────────────────────

export const HMA_LESSON = {
  breadcrumb: L('Hypertensive Mikroangiopathie', 'Hypertensive Microangiopathy', 'میکروآنژیوپاتی فشار خون بالا'),
  title: L('Hypertensive Mikroangiopathie', 'Hypertensive Microangiopathy', 'میکروآنژیوپاتی فشار خون بالا'),
  subtitle: L(
    'Lipohyalinose · Hypertensive ICB · Lakunäre Infarkte · Leukoaraiose',
    'Lipohyalinosis · Hypertensive ICH · Lacunar Infarcts · Leukoaraiosis',
    'لیپوهیالینوز · خونریزی مغزی فشار خون · انفارکت لاکونار · لوکوآرائوز'
  ),
  sourceLabel: 'CCT · CTA · MRT',
  keyLabel: L('Merke', 'Key point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Warning', 'هشدار'),
  toc: L('Inhalte', 'Contents', 'فهرست'),

  heroCards: [
    {
      value: L('~50 %', '~50 %', '~۵۰٪'),
      label: L('aller spontanen ICBs', 'of all spontaneous ICH', 'از تمام ICH‌های خودبخودی'),
      text: L('sind hypertensiv bedingt', 'are hypertension-related', 'ناشی از فشار خون بالا هستند'),
    },
    {
      value: L('5 Loci', '5 Loci', '۵ محل'),
      label: L('Typische Lokalisationen', 'Typical locations', 'محل‌های معمول'),
      text: L('Putamen · Thalamus · Pons · Kleinhirn · Capsula interna', 'Putamen · Thalamus · Pons · Cerebellum · Internal capsule', 'پوتامن · تالاموس · پونز · مخچه · کپسول داخلی'),
    },
    {
      value: L('Spot-Sign', 'Spot Sign', 'Spot Sign'),
      label: L('CTA-Marker', 'CTA marker', 'نشانه CTA'),
      text: L('aktive Nachblutung, Hämatomexpansion', 'active re-bleeding, haematoma expansion', 'خونریزی فعال، گسترش هماتوم'),
    },
  ],

  sections: [
    { id: 'grundlagen',   icon: '📌', label: L('Grundlagen',           'Basics',              'اساسیات') },
    { id: 'pathophysio',  icon: '🔬', label: L('Pathophysiologie',     'Pathophysiology',     'پاتوفیزیولوژی') },
    { id: 'cct',          icon: '💻', label: L('CCT & CTA',            'CCT & CTA',           'CCT و CTA') },
    { id: 'mrt',          icon: '🧲', label: L('MRT',                  'MRI',                 'MRI') },
    { id: 'klinik',       icon: '🩺', label: L('Klinik',               'Clinical',            'کلینیک') },
    { id: 'differenzial', icon: '⚖️', label: L('Differenzialdiagnose', 'Differential',        'افتراقی') },
    { id: 'therapie',     icon: '💊', label: L('Therapie',             'Treatment',           'درمان') },
    { id: 'takehome',     icon: '🏁', label: L('Take-home',            'Take-home',           'جمع‌بندی') },
  ],

  // ── 1. Grundlagen ──────────────────────────────────────────────────────────
  grundlagen: {
    title: L('Grundlagen & Epidemiologie', 'Basics & Epidemiology', 'اساسیات و اپیدمیولوژی'),
    lead: L(
      'Die hypertensive Mikroangiopathie umfasst das Spektrum der Hirnschäden durch chronisch erhöhten Blutdruck auf die kleinen Hirnarterien (Perforatoren, Durchmesser <300 µm).',
      'Hypertensive microangiopathy encompasses the spectrum of brain damage caused by chronically elevated blood pressure affecting small cerebral arteries (perforators, diameter <300 µm).',
      'میکروآنژیوپاتی فشار خون بالا طیفی از آسیب‌های مغزی ناشی از فشار خون مزمن بالا بر شریان‌های کوچک مغزی (پرفوراتورها، قطر <300 میکرومتر) را در بر می‌گیرد.'
    ),
    items: [
      {
        icon: '🩸',
        title: L('Hypertensive ICB', 'Hypertensive ICH', 'ICH فشار خون بالا'),
        text: L('Ruptur von Charcot-Bouchard-Mikroaneurysmen → akute intrazerebrale Blutung. Häufigste Ursache der spontanen ICB (~50 %).', 'Rupture of Charcot-Bouchard microaneurysms → acute intracerebral haemorrhage. Most common cause of spontaneous ICH (~50 %).', 'پارگی میکرو‌آنوریسم‌های Charcot-Bouchard → خونریزی داخل مغزی حاد. شایع‌ترین علت ICH خودبخودی (~۵۰٪).'),
      },
      {
        icon: '🧠',
        title: L('Chronische Mikroangiopathie', 'Chronic microangiopathy', 'میکروآنژیوپاتی مزمن'),
        text: L('Lipohyalinose → Wandverdickung, Lumeneinengung → lakunäre Infarkte, WMH (Leukoaraiose) und zerebrale Mikroblutungen (CMBs).', 'Lipohyalinosis → wall thickening, luminal narrowing → lacunar infarcts, WMH (leukoaraiosis) and cerebral microbleeds (CMBs).', 'لیپوهیالینوز → ضخیم شدن دیواره، تنگی لومن → انفارکت لاکونار، WMH (لوکوآرائوز) و خونریزی‌های میکرو مغزی (CMBs).'),
      },
      {
        icon: '📊',
        title: L('Epidemiologie', 'Epidemiology', 'اپیدمیولوژی'),
        text: L('Zweithäufigste Schlaganfallursache nach dem ischämischen Schlaganfall. Lebenszeitrisiko für ICB bei unkontrollierter Hypertonie 4-fach erhöht.', 'Second most common stroke cause after ischaemic stroke. Lifetime risk of ICH is 4-fold increased in uncontrolled hypertension.', 'دومین علت شایع سکته مغزی پس از سکته ایسکمیک. خطر مادام‌العمر ICH با فشار خون کنترل‌نشده ۴ برابر افزایش می‌یابد.'),
      },
      {
        icon: '⚠️',
        title: L('Risikofaktoren', 'Risk factors', 'عوامل خطر'),
        text: L('Unkontrollierter Bluthochdruck (Hauptfaktor), Diabetes mellitus, Rauchen, Alter, männliches Geschlecht.', 'Uncontrolled hypertension (main factor), diabetes mellitus, smoking, age, male sex.', 'فشار خون کنترل‌نشده (عامل اصلی)، دیابت ملیتوس، سیگار، سن، جنس مذکر.'),
      },
    ],
    key: L(
      'Zwei Manifestationen merken: akute ICB (Charcot-Bouchard-Aneurysmen) + chronische Mikroangiopathie (Lakunen + WMH + CMBs).',
      'Remember two manifestations: acute ICH (Charcot-Bouchard aneurysms) + chronic microangiopathy (lacunes + WMH + CMBs).',
      'دو تظاهر را بخاطر بسپار: ICH حاد (آنوریسم‌های Charcot-Bouchard) + میکروآنژیوپاتی مزمن (لاکون + WMH + CMBs).'
    ),
  },

  // ── 2. Pathophysiologie ────────────────────────────────────────────────────
  pathophysio: {
    title: L('Pathophysiologie', 'Pathophysiology', 'پاتوفیزیولوژی'),
    lead: L(
      'Chronisch erhöhter Blutdruck schädigt die kleinen Hirnarterien über mehrere Mechanismen, die zu unterschiedlichen bildgebenden Manifestationen führen.',
      'Chronic hypertension damages small cerebral arteries via several mechanisms, each producing distinct imaging manifestations.',
      'فشار خون مزمن بالا از طریق مکانیسم‌های مختلف به شریان‌های کوچک مغزی آسیب می‌زند که هر کدام تظاهرات تصویربرداری متفاوتی ایجاد می‌کند.'
    ),
    headers: [
      L('Mechanismus', 'Mechanism', 'مکانیسم'),
      L('Resultat', 'Result', 'نتیجه'),
      L('Bildgebung', 'Imaging', 'تصویربرداری'),
    ],
    rows: [
      [L('Lipohyalinose', 'Lipohyalinosis', 'لیپوهیالینوز'), L('Wandverdickung, Lumenverengung', 'Wall thickening, luminal narrowing', 'ضخیم‌شدن دیواره، تنگی لومن'), L('WMH in T2/FLAIR', 'WMH on T2/FLAIR', 'WMH در T2/FLAIR')],
      [L('Fibrinoide Nekrose', 'Fibrinoid necrosis', 'نکروز فیبرینوئید'), L('Wandruptur → Extravasation', 'Wall rupture → extravasation', 'پارگی دیواره → اکستراواسیون'), L('Hyperdens im CCT', 'Hyperdense on CCT', 'هیپردنس در CCT')],
      [L('Charcot-Bouchard-Aneurysmen', 'Charcot-Bouchard aneurysms', 'آنوریسم‌های Charcot-Bouchard'), L('Ruptur → intrazerebrale Blutung', 'Rupture → intracerebral haemorrhage', 'پارگی → خونریزی داخل مغزی'), L('ICB im CCT/MRT', 'ICH on CCT/MRI', 'ICH در CCT/MRI')],
      [L('Perivaskuläre Demyelinisierung', 'Perivascullar demyelination', 'دمیلینیزاسیون پریواسکولار'), L('Axonverlust, WMH', 'Axon loss, WMH', 'از دست رفتن آکسون، WMH'), L('FLAIR-Hyperintensitäten', 'FLAIR hyperintensities', 'هایپرانتنسیتی در FLAIR')],
      [L('Perforator-Verschluss', 'Perforator occlusion', 'انسداد پرفوراتور'), L('Lakunärer Infarkt (<15 mm)', 'Lacunar infarct (<15 mm)', 'انفارکت لاکونار (<15 میلی‌متر)'), L('DWI-Restriktion, später T2-Höhle', 'DWI restriction, later T2 cavity', 'محدودیت DWI، بعداً حفره T2')],
    ],
    key: L(
      'Charcot-Bouchard-Aneurysmen entstehen durch Lipohyalinose der Perforatoren und sind die direkte Ursache der hypertensiven ICB.',
      'Charcot-Bouchard aneurysms arise from lipohyalinosis of perforators and are the direct cause of hypertensive ICH.',
      'آنوریسم‌های Charcot-Bouchard از لیپوهیالینوز پرفوراتورها ناشی می‌شوند و علت مستقیم ICH فشار خون بالا هستند.'
    ),
  },

  // ── 3. CCT & CTA ──────────────────────────────────────────────────────────
  cct: {
    title: L('Bildgebung: CCT & CTA', 'Imaging: CCT & CTA', 'تصویربرداری: CCT و CTA'),
    lead: L(
      'Das CCT ist die Methode der Wahl bei Verdacht auf akute intrazerebrale Blutung: schnell, überall verfügbar, sensitiv für Frischblut.',
      'CCT is the method of choice when acute intracerebral haemorrhage is suspected: fast, universally available, sensitive for fresh blood.',
      'CCT روش انتخابی برای مشکوک به خونریزی داخل مغزی حاد است: سریع، همه‌جا در دسترس، حساس برای خون تازه.'
    ),
    morphHeaders: [
      L('Merkmal', 'Feature', 'ویژگی'),
      L('Befund', 'Finding', 'یافته'),
      L('Erklärung', 'Explanation', 'توضیح'),
    ],
    morphRows: [
      [L('Dichte', 'Density', 'دانسیته'), L('Hyperdens (50–70 HU)', 'Hyperdense (50–70 HU)', 'هیپردنس (50–70 HU)'), L('Koaguliertes Hämoglobin', 'Coagulated haemoglobin', 'هموگلوبین منعقد')],
      [L('Form', 'Shape', 'شکل'), L('Irregulär, nicht vollkommen rund', 'Irregular, not perfectly round', 'نامنظم، کاملاً گرد نیست'), L('Akute Blutung folgt Gewebespalten', 'Acute bleed tracks tissue planes', 'خون حاد مسیر فضاهای بافتی را می‌رود')],
      [L('Ödem', 'Oedema', 'ادم'), L('Anfangs gering, später zunehmendes Umgebungsödem', 'Initially mild, progressively increasing perilesional oedema', 'در ابتدا خفیف، ادم اطراف ضایعه به تدریج افزایش می‌یابد'), L('Proteintranssudat, Entzündungsreaktion', 'Protein transsudate, inflammatory reaction', 'ترانسودا پروتئینی، واکنش التهابی')],
      [L('Ventrikeleinbruch', 'Intraventricular extension', 'بسط بطنی'), L('Möglich, schlechtere Prognose', 'Possible, poorer prognosis', 'ممکن است، پیش‌آگهی بدتر'), L('Obstruktiver Hydrozephalus möglich', 'Obstructive hydrocephalus possible', 'هیدروسفالی انسدادی ممکن')],
    ],
    locHeaders: [
      L('Lokalisation', 'Location', 'محل'),
      L('Häufigkeit', 'Frequency', 'فراوانی'),
      L('Klinik', 'Clinical', 'کلینیک'),
    ],
    locRows: [
      [L('Putamen / Globus pallidus / Capsula interna', 'Putamen / Globus pallidus / Internal capsule', 'پوتامن / گلوبوس پالیدوس / کپسول داخلی'), L('~50 % (häufigste!)', '~50 % (most common!)', '~۵۰٪ (شایع‌ترین!)'), L('Kontralat. Hemiplegie/-parese, Hemisensibilität', 'Contralat. hemiplegia/-paresis, hemisensory loss', 'همی‌پلژی/همی‌پارزی کنترالترال، اختلال حسی نیمه')],
      [L('Thalamus', 'Thalamus', 'تالاموس'), L('~15 %', '~15 %', '~۱۵٪'), L('Hemisensibilität, vertikale Blickparese', 'Hemisensory loss, vertical gaze palsy', 'اختلال حسی نیمه، فلج نگاه عمودی')],
      [L('Pons', 'Pons', 'پونز'), L('~10 %', '~10 %', '~۱۰٪'), L('Stecknadelkopf-Pupillen, Tetraparese, Koma', 'Pinpoint pupils, tetraparesis, coma', 'مردمک‌های سوزن‌نقطه‌ای، تتراپارزی، کما')],
      [L('Kleinhirn', 'Cerebellum', 'مخچه'), L('~10 %', '~10 %', '~۱۰٪'), L('Ataxie, Schwindel, Erbrechen, Kopfschmerz', 'Ataxia, dizziness, vomiting, headache', 'آتاکسی، سرگیجه، استفراغ، سردرد')],
      [L('Lobär (selten, eher CAA)', 'Lobar (rare, more likely CAA)', 'لوبار (نادر، بیشتر CAA)'), L('<10 %', '<10 %', '<۱۰٪'), L('Fokal-neurologisch je nach Lappen', 'Focal neurological deficit per lobe', 'نقص عصبی کانونی بر حسب لوب')],
    ],
    spotHeaders: [
      L('Merkmal', 'Feature', 'ویژگی'),
      L('Beschreibung', 'Description', 'توضیح'),
    ],
    spotRows: [
      [L('Definition', 'Definition', 'تعریف'), L('Punktförmige KM-Anreicherung innerhalb der ICB im CTA', 'Focal contrast enhancement within the ICH on CTA', 'تجمع کنتراست نقطه‌ای داخل ICH در CTA')],
      [L('Bedeutung', 'Significance', 'اهمیت'), L('Aktive Nachblutung aus einem kleinen Gefäß', 'Active re-bleeding from a small vessel', 'خونریزی فعال از یک عروق کوچک')],
      [L('Konsequenz', 'Consequence', 'عواقب'), L('Hohes Risiko der Hämatomexpansion', 'High risk of haematoma expansion', 'خطر بالای گسترش هماتوم')],
      [L('Prognose', 'Prognosis', 'پیش‌آگهی'), L('Erhöhte 90-Tage-Mortalität', 'Increased 90-day mortality', 'افزایش مرگ‌ومیر ۹۰ روزه')],
    ],
    spotTitle: L('Spot-Sign (CTA)', 'Spot Sign (CTA)', 'Spot Sign (CTA)'),
    locTitle: L('Typische Lokalisationen der hypertensiven ICB', 'Typical locations of hypertensive ICH', 'محل‌های معمول ICH فشار خون بالا'),
    morphTitle: L('CCT-Morphologie der akuten ICB', 'CCT morphology of acute ICH', 'مورفولوژی CCT در ICH حاد'),
    key: L(
      'Irregulär + tief (Basalganglien/Thalamus/Pons/Kleinhirn) + wenig Ödem + bekannte Hypertonie = hypertensive ICB.',
      'Irregular + deep (basal ganglia / thalamus / pons / cerebellum) + minimal oedema + known hypertension = hypertensive ICH.',
      'نامنظم + عمقی (بازال گانگلیا/تالاموس/پونز/مخچه) + ادم کم + فشار خون شناخته‌شده = ICH فشار خون بالا.'
    ),
    imageAlt: L('CCT-Beispiel: Hypertensive Kleinhirnblutung vs. Metastase', 'CCT example: hypertensive cerebellar haemorrhage vs. metastasis', 'مثال CCT: خونریزی مخچه‌ای فشار خون بالا در مقابل متاستاز'),
    imageCaptionA: L('A – Hypertensive Blutung: irregulär, medial, geringes Ödem', 'A – Hypertensive haemorrhage: irregular, medial, little oedema', 'A – خونریزی فشار خون: نامنظم، مدیال، ادم کم'),
    imageCaptionB: L('B – Metastase: rund, peripher, ausgeprägtes Ödem', 'B – Metastasis: round, peripheral, prominent oedema', 'B – متاستاز: گرد، محیطی، ادم شدید'),
  },

  // ── 4. MRT ────────────────────────────────────────────────────────────────
  mrt: {
    title: L('Bildgebung: MRT', 'Imaging: MRI', 'تصویربرداری: MRI'),
    lead: L(
      'Das MRT liefert die empfindlichsten Zeichen der chronischen Mikroangiopathie: Leukoaraiose, Mikroblutungen (CMBs) und lakunäre Infarkte.',
      'MRI provides the most sensitive signs of chronic microangiopathy: leukoaraiosis, microbleeds (CMBs) and lacunar infarcts.',
      'MRI حساس‌ترین نشانه‌های میکروآنژیوپاتی مزمن را نشان می‌دهد: لوکوآرائوز، خونریزی‌های میکرو (CMBs) و انفارکت‌های لاکونار.'
    ),
    seqHeaders: [
      L('Sequenz', 'Sequence', 'سکانس'),
      L('Befund', 'Finding', 'یافته'),
      L('Bedeutung', 'Significance', 'اهمیت'),
    ],
    seqRows: [
      [L('T2 / FLAIR', 'T2 / FLAIR', 'T2 / FLAIR'), L('Periventrikuläre und tiefe WMH (weiß)', 'Periventricular and deep WMH (bright)', 'WMH پریونتریکولار و عمقی (روشن)'), L('Leukoaraiose = chronische Ischämie, Fazekas-Klassifikation', 'Leukoaraiosis = chronic ischaemia, Fazekas classification', 'لوکوآرائوز = ایسکمی مزمن، طبقه‌بندی Fazekas')],
      [L('DWI / ADC', 'DWI / ADC', 'DWI / ADC'), L('Restriktionsmuster (<15 mm, tief)', 'Restriction pattern (<15 mm, deep)', 'الگوی محدودیت (<15 میلی‌متر، عمقی)'), L('Akuter lakunärer Infarkt (Perforator)', 'Acute lacunar infarct (perforator)', 'انفارکت لاکونار حاد (پرفوراتور)')],
      [L('GRE / SWI', 'GRE / SWI', 'GRE / SWI'), L('Punktförmige Hypointensitäten (Blütenmuster)', 'Punctate hypointensities (blooming artefact)', 'هایپوانتنسیتی‌های نقطه‌ای (الگوی شکوفه)'), L('Zerebrale Mikroblutungen (CMBs): tief = Hypertonie, kortikal = CAA', 'CMBs: deep = hypertension, cortical = CAA', 'CMBs: عمقی = فشار خون، کورتیکال = CAA')],
      [L('T1', 'T1', 'T1'), L('Hypointense Höhlen im Marklager / Basalganglien', 'Hypointense cavities in white matter / basal ganglia', 'حفره‌های هایپوانتنس در ماده سفید / بازال گانگلیا'), L('Chronische Lakunen (>3 Monate alt)', 'Chronic lacunes (>3 months old)', 'لاکون‌های مزمن (>3 ماه)')],
      [L('T1 Gd', 'T1 Gd', 'T1 Gd'), L('Keine Enhancement (außer im akuten Infarkt)', 'No enhancement (except in acute infarct)', 'بدون انهانسمنت (جز در انفارکت حاد)'), L('Hilft bei Differenzierung Metastase vs. ICB', 'Helps differentiate metastasis from ICH', 'کمک به تمایز متاستاز از ICH')],
    ],
    fazekasHeaders: [
      L('Fazekas-Grad', 'Fazekas Grade', 'درجه Fazekas'),
      L('Periventrikulär', 'Periventricular', 'پریونتریکولار'),
      L('Tiefe weiße Substanz', 'Deep white matter', 'ماده سفید عمقی'),
    ],
    fazekasRows: [
      [L('Grad 0', 'Grade 0', 'درجه ۰'), L('Keine Läsion', 'No lesion', 'بدون ضایعه'), L('Keine Läsion', 'No lesion', 'بدون ضایعه')],
      [L('Grad 1', 'Grade 1', 'درجه ۱'), L('Gepunktelte Caps / Bänder', 'Punctate caps/bands', 'کپ‌های/باندهای نقطه‌ای'), L('Gepunktelte Läsionen', 'Punctate lesions', 'ضایعات نقطه‌ای')],
      [L('Grad 2', 'Grade 2', 'درجه ۲'), L('Halo um die Ventrikel', 'Halo around ventricles', 'هاله دور بطن‌ها'), L('Beginn der Konfluenz', 'Beginning confluent', 'شروع تجمع')],
      [L('Grad 3', 'Grade 3', 'درجه ۳'), L('Ausgedehnte periventrikuläre WMH', 'Extensive periventricular WMH', 'WMH پریونتریکولار وسیع'), L('Großflächig konfluierend', 'Large confluent areas', 'مناطق تجمع وسیع')],
    ],
    fazekasTitle: L('Fazekas-Skala (FLAIR/T2)', 'Fazekas Scale (FLAIR/T2)', 'مقیاس Fazekas (FLAIR/T2)'),
    key: L(
      'Tiefe CMBs in SWI + Fazekas WMH + lakunäre Infarkte in DWI = MRT-Trias der chronischen hypertensiven Mikroangiopathie.',
      'Deep CMBs on SWI + Fazekas WMH + lacunar infarcts on DWI = MRI triad of chronic hypertensive microangiopathy.',
      'CMBs عمقی در SWI + WMH Fazekas + انفارکت‌های لاکونار در DWI = تریاد MRI میکروآنژیوپاتی فشار خون مزمن.'
    ),
  },

  // ── 5. Klinik ─────────────────────────────────────────────────────────────
  klinik: {
    title: L('Klinik', 'Clinical Presentation', 'تظاهرات بالینی'),
    lead: L(
      'Das klinische Bild richtet sich nach der genauen Blutungslokalisation. Lakunäre Syndrome entstehen durch Verschluss einzelner Perforatoren.',
      'The clinical picture depends on the exact bleeding location. Lacunar syndromes arise from occlusion of individual perforators.',
      'تصویر بالینی به محل دقیق خونریزی بستگی دارد. سندرم‌های لاکونار از انسداد پرفوراتورهای منفرد ناشی می‌شوند.'
    ),
    lacunarTitle: L('Lakunäre Syndrome', 'Lacunar Syndromes', 'سندرم‌های لاکونار'),
    lacunarItems: [
      {
        icon: '💪',
        title: L('Pure Motor Hemiparesis', 'Pure Motor Hemiparesis', 'همی‌پارزی خالص حرکتی'),
        text: L('Capsula interna (hinteres Schenkel) / Pons. Rein motorisches Defizit ohne Sensibilitätsstörung.', 'Internal capsule (posterior limb) / pons. Pure motor deficit without sensory loss.', 'کپسول داخلی (پای خلفی) / پونز. نقص حرکتی خالص بدون اختلال حسی.'),
      },
      {
        icon: '🖐️',
        title: L('Pure Sensory Stroke', 'Pure Sensory Stroke', 'سکته حسی خالص'),
        text: L('Thalamus (VPL-Kern). Rein sensibles Hemisyndrom ohne motorisches Defizit.', 'Thalamus (VPL nucleus). Pure hemisensory syndrome without motor deficit.', 'تالاموس (هسته VPL). سندرم حسی نیمه خالص بدون نقص حرکتی.'),
      },
      {
        icon: '🤸',
        title: L('Ataktische Hemiparese', 'Ataxic Hemiparesis', 'همی‌پارزی آتاکتیک'),
        text: L('Pons / Capsula interna. Ipsilaterale Ataxie + kontralaterale Hemiparese = dissoziierts Bild.', 'Pons / internal capsule. Ipsilateral ataxia + contralateral hemiparesis = dissociated picture.', 'پونز / کپسول داخلی. آتاکسی همان‌طرف + همی‌پارزی طرف مقابل = تصویر تجزیه‌شده.'),
      },
      {
        icon: '🗣️',
        title: L('Dysarthrie-Clumsy-Hand-Syndrom', 'Dysarthria-Clumsy Hand Syndrome', 'سندرم دیزآرتری-دست ناشیانه'),
        text: L('Knie der Capsula interna / Pons. Dysarthrie + Feinmotorikverlust der ipsilateralen Hand.', 'Genu of internal capsule / pons. Dysarthria + loss of fine motor control of ipsilateral hand.', 'زانوی کپسول داخلی / پونز. دیزآرتری + از دست دادن کنترل حرکات ظریف دست همان‌طرف.'),
      },
    ],
    key: L(
      'Kleinhirnblutung: Ataxie + Kopfschmerz + Erbrechen ohne Hemiparese. Ab 3 cm oder bei Dekompensation: neurochirurgische Evaluation!',
      'Cerebellar haemorrhage: ataxia + headache + vomiting without hemiparesis. If ≥3 cm or decompensation: neurosurgical evaluation!',
      'خونریزی مخچه: آتاکسی + سردرد + استفراغ بدون همی‌پارزی. در صورت ≥3 سانتی‌متر یا جبران‌ناپذیری: ارزیابی جراحی مغز!'
    ),
  },

  // ── 6. Differenzialdiagnose ───────────────────────────────────────────────
  differenzial: {
    title: L('Differenzialdiagnose der ICB', 'Differential Diagnosis of ICH', 'تشخیص افتراقی ICH'),
    lead: L(
      'Die hypertensive ICB muss von anderen Ursachen intrazerebraler Blutungen abgegrenzt werden. Wichtigste Kriterien: Lokalisation, Alter, Vorgeschichte, Blutungsmuster.',
      'Hypertensive ICH must be distinguished from other causes of intracerebral haemorrhage. Key criteria: location, age, history, bleeding pattern.',
      'ICH فشار خون باید از سایر علل خونریزی داخل مغزی افتراق داده شود. معیارهای کلیدی: محل، سن، سابقه، الگوی خونریزی.'
    ),
    ddHeaders: [
      L('Diagnose', 'Diagnosis', 'تشخیص'),
      L('Lokalisation', 'Location', 'محل'),
      L('Schlüsselmerkmal', 'Key feature', 'ویژگی کلیدی'),
    ],
    ddRows: [
      [L('Hypertensive ICB', 'Hypertensive ICH', 'ICH فشار خون بالا'), L('Tief: Putamen, Thalamus, Pons, Kleinhirn', 'Deep: putamen, thalamus, pons, cerebellum', 'عمقی: پوتامن، تالاموس، پونز، مخچه'), L('Irregulär, tiefe CMBs in SWI, Hypertonie-Anamnese', 'Irregular, deep CMBs on SWI, hypertension history', 'نامنظم، CMBs عمقی در SWI، سابقه فشار خون')],
      [L('Zerebrale Amyloidangiopathie (CAA)', 'Cerebral amyloid angiopathy (CAA)', 'آنژیوپاتی آمیلوئید مغزی (CAA)'), L('Lobär (kortikal-subkortikal)', 'Lobar (cortical-subcortical)', 'لوبار (کورتیکال-ساب‌کورتیکال)'), L('Älterer Patient, kortikale CMBs in SWI, Boston-Kriterien', 'Older patient, cortical CMBs on SWI, Boston criteria', 'بیمار مسن‌تر، CMBs کورتیکال در SWI، معیارهای Boston')],
      [L('Hirnmetastase', 'Brain metastasis', 'متاستاز مغزی'), L('Peripher, kortikal-subkortikal, oft multiple', 'Peripheral, cortical-subcortical, often multiple', 'محیطی، کورتیکال-ساب‌کورتیکال، اغلب متعدد'), L('Rund, ausgeprägtes perifokales Ödem, KM-Enhancement, Tumoranamnese', 'Round, prominent perilesional oedema, contrast enhancement, tumour history', 'گرد، ادم پریفوکال شدید، انهانسمنت کنتراستی، سابقه تومور')],
      [L('Kavernom', 'Cavernoma', 'کاورنوم'), L('Überall, oft im Hirnstamm', 'Anywhere, often brainstem', 'همه‌جا، اغلب ساقه مغز'), L('„Popcorn"-Muster T2, SWI-Hypointensität, kein Ödem, MRT-typisch', '"Popcorn" pattern T2, SWI hypointensity, no oedema, typical MRI', 'الگوی «پاپ‌کورن» T2، هایپوانتنسیتی SWI، بدون ادم، تیپیک MRI')],
      [L('AVM-Blutung', 'AVM haemorrhage', 'خونریزی AVM'), L('Variabel, oft lobär', 'Variable, often lobar', 'متغیر، اغلب لوبار'), L('Junger Patient, serpentiginöse Gefäßstrukturen im MRA/CTA, kein Hypertoniehintergrund', 'Young patient, serpiginous vascular structures on MRA/CTA, no hypertension background', 'بیمار جوان، ساختارهای عروقی مارپیچی در MRA/CTA، بدون سابقه فشار خون')],
    ],
    key: L(
      'Merkhilfe: Hypertensive ICB = tief + irregulär. CAA = lobär + kortikal. Metastase = rund + viel Ödem + Enhancement.',
      'Mnemonic: hypertensive ICH = deep + irregular. CAA = lobar + cortical. Metastasis = round + lots of oedema + enhancement.',
      'جمله‌یادآور: ICH فشار خون = عمقی + نامنظم. CAA = لوبار + کورتیکال. متاستاز = گرد + ادم زیاد + انهانسمنت.'
    ),
  },

  // ── 7. Therapie ───────────────────────────────────────────────────────────
  therapie: {
    title: L('Therapie', 'Treatment', 'درمان'),
    lead: L(
      'Die Behandlung der akuten hypertensiven ICB zielt auf Hämatomkontrolle, Hirndrucksenkung und Verhinderung von Rezidiven.',
      'Treatment of acute hypertensive ICH aims at haematoma control, ICP reduction and prevention of recurrence.',
      'درمان ICH حاد فشار خون بالا به کنترل هماتوم، کاهش فشار داخل جمجمه و جلوگیری از عود هدف دارد.'
    ),
    items: [
      {
        icon: '💉',
        title: L('Blutdruckkontrolle', 'Blood pressure control', 'کنترل فشار خون'),
        text: L('Ziel akut: <140 mmHg systolisch (AHA/ASA-Leitlinien). Iv. Labetalol, Nicardipine oder Urapidil. Senkt Hämatomexpansionsrisiko.', 'Acute target: <140 mmHg systolic (AHA/ASA guidelines). IV labetalol, nicardipine, or urapidil. Reduces haematoma expansion risk.', 'هدف حاد: <140 mmHg سیستولیک (دستورالعمل AHA/ASA). لابتالول، نیکاردیپین یا اورادیپیل IV. خطر گسترش هماتوم را کاهش می‌دهد.'),
      },
      {
        icon: '🔄',
        title: L('Antikoagulanzienwirkung aufheben', 'Reverse anticoagulation', 'معکوس کردن ضد انعقادها'),
        text: L('Phenprocoumon/Warfarin: PCC (25 IE/kg) + Vit. K iv. DOAK: Idarucizumab (Dabigatran), Andexanet alfa (Faktor-Xa-Inhibitoren). Ziel: INR <1,3 innerhalb 4 h.', 'Phenprocoumon/warfarin: PCC (25 IU/kg) + IV vitamin K. DOACs: idarucizumab (dabigatran), andexanet alfa (factor Xa inhibitors). Target: INR <1.3 within 4 h.', 'فنپروکومون/وارفارین: PCC (25 IU/kg) + ویتامین K IV. DOACها: ایداروسیزوماب (داbiگاتران)، اندگزانت آلفا (مهارکننده‌های فاکتور Xa). هدف: INR <1.3 در عرض 4 ساعت.'),
      },
      {
        icon: '🏥',
        title: L('Neurochirurgische Intervention', 'Neurosurgical intervention', 'مداخله جراحی مغز'),
        text: L('Kleinhirnblutung ≥3 cm oder mit Kompression des 4. Ventrikels: dringende chirurgische Entlastung. Supratentorielle ICB: in ausgewählten Fällen (raumfordernd, jung, gute Prognose).', 'Cerebellar haemorrhage ≥3 cm or compressing the 4th ventricle: urgent surgical decompression. Supratentorial ICH: selected cases (space-occupying, young patient, good prognosis).', 'خونریزی مخچه ≥3 سانتی‌متر یا با فشار به بطن چهارم: کاهش فشار جراحی فوری. ICH سوپراتانتوریال: موارد انتخابی (فضا اشغال‌کننده، بیمار جوان، پیش‌آگهی خوب).'),
      },
      {
        icon: '💊',
        title: L('Osmotherapie / ICP-Management', 'Osmotherapy / ICP management', 'اسمتراپی / مدیریت ICP'),
        text: L('Mannitol 20 % (0,5–1 g/kg) oder hypertone NaCl 7,5 % bei erhöhtem Hirndruck. Oberkörperhochlagerung 30°, Ventrikeldrainage bei Hydrozephalus.', 'Mannitol 20% (0.5–1 g/kg) or hypertonic NaCl 7.5% for elevated ICP. Head-of-bed elevation 30°, ventricular drain for hydrocephalus.', 'مانیتول ۲۰٪ (0.5–1 g/kg) یا NaCl هیپرتونیک 7.5٪ برای ICP بالا. ارتفاع سر تخت 30 درجه، تخلیه بطنی برای هیدروسفالی.'),
      },
      {
        icon: '🛡️',
        title: L('Sekundärprophylaxe', 'Secondary prevention', 'پیشگیری ثانویه'),
        text: L('Strikte Langzeit-Blutdruckkontrolle (Ziel <130/80 mmHg). Lebensstilanpassung (Gewicht, Alkohol, Rauchen). Statine. Lakunäre Infarkte: Thrombozytenaggregationshemmer.', 'Strict long-term BP control (target <130/80 mmHg). Lifestyle modification (weight, alcohol, smoking). Statins. Lacunar infarcts: antiplatelet therapy.', 'کنترل فشار خون بلندمدت دقیق (هدف <130/80 mmHg). اصلاح سبک زندگی (وزن، الکل، سیگار). استاتین‌ها. انفارکت لاکونار: ضد تجمع پلاکتی.'),
      },
    ],
    cave: L(
      'Keine Thrombolyse (rtPA) bei intrazerebraler Blutung! Bei Antikoagulanzien-assoziierter ICB sofortige Reversal-Therapie anstreben.',
      'No thrombolysis (rtPA) in intracerebral haemorrhage! In anticoagulant-associated ICH, aim for immediate reversal therapy.',
      'تروم‌بولیز (rtPA) در خونریزی داخل مغزی ممنوع! در ICH مرتبط با ضد انعقادها، درمان معکوس فوری انجام دهید.'
    ),
  },

  // ── 8. Take-home ──────────────────────────────────────────────────────────
  takehome: {
    title: L('Take-home', 'Take-home', 'جمع‌بندی'),
    lead: L(
      'Die fünf wichtigsten Punkte zur hypertensiven Mikroangiopathie.',
      'The five key points on hypertensive microangiopathy.',
      'پنج نکته مهم درباره میکروآنژیوپاتی فشار خون.'
    ),
    items: [
      {
        title: L('Zwei Manifestationen', 'Two manifestations', 'دو تظاهر'),
        text: L('Akute hypertensive ICB (Charcot-Bouchard-Aneurysmen) + Chronische Mikroangiopathie (WMH + Lakunen + CMBs) — beide durch Lipohyalinose kleiner Gefäße.', 'Acute hypertensive ICH (Charcot-Bouchard aneurysms) + Chronic microangiopathy (WMH + lacunes + CMBs) — both from lipohyalinosis of small vessels.', 'ICH حاد فشار خون (آنوریسم‌های Charcot-Bouchard) + میکروآنژیوپاتی مزمن (WMH + لاکون + CMBs) — هر دو از لیپوهیالینوز عروق کوچک.'),
      },
      {
        title: L('CCT: tief + irregulär = hypertensiv', 'CCT: deep + irregular = hypertensive', 'CCT: عمقی + نامنظم = فشار خون'),
        text: L('Putamen (50 %) > Thalamus > Kleinhirn > Pons. Irregulär, wenig Ödem. Rund + peripher + viel Ödem → eher Metastase oder CAA.', 'Putamen (50%) > thalamus > cerebellum > pons. Irregular, little oedema. Round + peripheral + lots of oedema → more likely metastasis or CAA.', 'پوتامن (50٪) > تالاموس > مخچه > پونز. نامنظم، ادم کم. گرد + محیطی + ادم زیاد → بیشتر متاستاز یا CAA.'),
      },
      {
        title: L('Spot-Sign im CTA', 'Spot sign on CTA', 'Spot Sign در CTA'),
        text: L('Kontrastmittelanreicherung innerhalb der Blutung = aktive Nachblutung. Prädiktiv für Hämatomexpansion und erhöhte Mortalität.', 'Contrast enhancement within the bleed = active re-bleeding. Predictive of haematoma expansion and increased mortality.', 'انهانسمنت کنتراستی داخل خونریزی = خونریزی فعال مجدد. پیش‌بینی‌کننده گسترش هماتوم و مرگ‌ومیر بالاتر.'),
      },
      {
        title: L('MRT-Trias der Mikroangiopathie', 'MRI triad of microangiopathy', 'تریاد MRI میکروآنژیوپاتی'),
        text: L('SWI: tiefe CMBs | FLAIR: WMH (Fazekas 1–3) | DWI: akute Lakunen. Tiefe CMBs = Hypertonie, kortikale CMBs = CAA (wichtig für DD!).', 'SWI: deep CMBs | FLAIR: WMH (Fazekas 1–3) | DWI: acute lacunes. Deep CMBs = hypertension, cortical CMBs = CAA (important for DDx!).', 'SWI: CMBs عمقی | FLAIR: WMH (Fazekas 1-3) | DWI: لاکون‌های حاد. CMBs عمقی = فشار خون، CMBs کورتیکال = CAA (مهم برای تشخیص افتراقی!).'),
      },
      {
        title: L('Therapie-Notfall', 'Treatment emergency', 'اورژانس درمانی'),
        text: L('RR <140 mmHg (iv.) + Antikoagulanzienwirkung aufheben + Kleinhirnblutung ≥3 cm neurochirurgisch evaluieren. Keine Lyse!', 'BP <140 mmHg (IV) + reverse anticoagulation + cerebellar haemorrhage ≥3 cm → neurosurgical evaluation. No thrombolysis!', 'فشار خون <140 mmHg (IV) + معکوس ضد انعقاد + خونریزی مخچه ≥3 سانتی‌متر → ارزیابی جراحی مغز. تروم‌بولیز ممنوع!'),
      },
    ],
  },
}

// ─── MCQ Seeds ────────────────────────────────────────────────────────────────

const HMA_QUESTION_SEEDS = [
  Q('hma-01',
    L('Welche Lokalisation ist bei der hypertensiven intrazerebralen Blutung am häufigsten?',
      'Which location is most common in hypertensive intracerebral haemorrhage?',
      'کدام محل در خونریزی داخل مغزی فشار خون بالا شایع‌ترین است؟'),
    [
      L('Putamen / Globus pallidus', 'Putamen / Globus pallidus', 'پوتامن / گلوبوس پالیدوس'),
      L('Thalamus', 'Thalamus', 'تالاموس'),
      L('Lobär (Frontallappen)', 'Lobar (frontal lobe)', 'لوبار (لوب فرونتال)'),
      L('Pons', 'Pons', 'پونز'),
    ], 0,
    L('Putamen/Globus pallidus/Capsula interna sind mit ~50 % die häufigste Lokalisation der hypertensiven ICB, gefolgt von Thalamus (~15 %), Kleinhirn (~10 %) und Pons (~10 %). Lobäre Blutungen sprechen eher für CAA.',
      'Putamen/globus pallidus/internal capsule account for ~50% of hypertensive ICH locations, followed by thalamus (~15%), cerebellum (~10%) and pons (~10%). Lobar haemorrhage suggests CAA rather than hypertension.',
      'پوتامن/گلوبوس پالیدوس/کپسول داخلی با ~۵۰٪ شایع‌ترین محل ICH فشار خون بالا هستند، سپس تالاموس (~۱۵٪)، مخچه (~۱۰٪) و پونز (~۱۰٪). خونریزی لوبار بیشتر به CAA اشاره دارد.')
  ),

  Q('hma-02',
    L('Was bedeutet ein Spot-Sign im CTA?',
      'What does a spot sign on CTA indicate?',
      'Spot Sign در CTA چه معنایی دارد؟'),
    [
      L('Aktive Nachblutung mit Risiko der Hämatomexpansion', 'Active re-bleeding with risk of haematoma expansion', 'خونریزی فعال مجدد با خطر گسترش هماتوم'),
      L('Zerebrale Mikroblutungen', 'Cerebral microbleeds', 'خونریزی‌های میکرو مغزی'),
      L('Lakunärer Infarkt', 'Lacunar infarct', 'انفارکت لاکونار'),
      L('Abszessbildung', 'Abscess formation', 'تشکیل آبسه'),
    ], 0,
    L('Das Spot-Sign bezeichnet eine punktförmige Kontrastmittelanreicherung innerhalb der ICB im CTA. Es ist ein direkter Hinweis auf eine aktive Nachblutung und prädiktiv für Hämatomexpansion sowie erhöhte Mortalität.',
      'The spot sign refers to focal contrast enhancement within the ICH on CTA. It is a direct indicator of active re-bleeding and is predictive of haematoma expansion and increased mortality.',
      'Spot Sign به تجمع کنتراست نقطه‌ای داخل ICH در CTA اشاره دارد. این نشانه مستقیماً نشان‌دهنده خونریزی فعال مجدد است و پیش‌بینی‌کننده گسترش هماتوم و افزایش مرگ‌ومیر است.')
  ),

  Q('hma-03',
    L('Ein 72-jähriger Patient mit langjährigem Bluthochdruck hat akut eine Ataxie, Schwindel und Erbrechen. Das CCT zeigt eine hyperdens Läsion im Kleinhirn mit 3,5 cm Durchmesser. Was ist der nächste Schritt?',
      'A 72-year-old patient with long-standing hypertension presents with acute ataxia, dizziness and vomiting. CCT shows a hyperdense lesion in the cerebellum 3.5 cm in diameter. What is the next step?',
      'یک بیمار ۷۲ ساله با فشار خون مزمن با آتاکسی حاد، سرگیجه و استفراغ مراجعه می‌کند. CCT یک ضایعه هیپردنس در مخچه با قطر 3.5 سانتی‌متر نشان می‌دهد. قدم بعدی چیست؟'),
    [
      L('Dringende neurochirurgische Evaluation', 'Urgent neurosurgical evaluation', 'ارزیابی فوری جراحی مغز'),
      L('Thrombolyse mit rtPA', 'Thrombolysis with rtPA', 'تروم‌بولیز با rtPA'),
      L('Sofortige Antikoagulation', 'Immediate anticoagulation', 'ضد انعقاد فوری'),
      L('Abwarten und CCT-Kontrolle nach 24 h', 'Wait and repeat CCT after 24 h', 'صبر و تکرار CCT بعد از ۲۴ ساعت'),
    ], 0,
    L('Kleinhirnblutungen ≥3 cm oder mit Kompression des 4. Ventrikels sind ein neurochirurgischer Notfall. Die Gefahr eines obstruktiven Hydrozephalus und Hirnstammkompression erfordert dringende chirurgische Intervention. Lyse ist bei ICB absolut kontraindiziert.',
      'Cerebellar haemorrhages ≥3 cm or compressing the 4th ventricle are a neurosurgical emergency. The risk of obstructive hydrocephalus and brainstem compression requires urgent surgical intervention. Thrombolysis is absolutely contraindicated in ICH.',
      'خونریزی‌های مخچه ≥3 سانتی‌متر یا با فشار به بطن چهارم اورژانس جراحی مغز هستند. خطر هیدروسفالی انسدادی و فشار به ساقه مغز نیاز به مداخله جراحی فوری دارد. تروم‌بولیز در ICH مطلقاً منع مصرف است.')
  ),

  Q('hma-04',
    L('Was ist der pathologische Hauptmechanismus der hypertensiven Mikroangiopathie?',
      'What is the main pathological mechanism of hypertensive microangiopathy?',
      'مکانیسم پاتولوژیک اصلی میکروآنژیوپاتی فشار خون بالا چیست؟'),
    [
      L('Lipohyalinose der kleinen Perforatoren', 'Lipohyalinosis of small perforators', 'لیپوهیالینوز پرفوراتورهای کوچک'),
      L('Embolie aus dem Herzen', 'Cardiac embolism', 'آمبولی از قلب'),
      L('Atherosklerose der großen Gefäße', 'Atherosclerosis of large vessels', 'آترواسکلروز عروق بزرگ'),
      L('Amyloidablagerung in der Adventitia', 'Amyloid deposition in the adventitia', 'رسوب آمیلوئید در ادوانتیشیا'),
    ], 0,
    L('Chronisch erhöhter Blutdruck führt zur Lipohyalinose der kleinen Perforatoren: Wandverdickung, Lumenverengung und fibrinoide Nekrose. Die daraus entstehenden Charcot-Bouchard-Mikroaneurysmen können rupturieren → ICB. Wandverdickung mit Lumenverengung → Lakunäre Infarkte und WMH.',
      'Chronic hypertension leads to lipohyalinosis of small perforators: wall thickening, luminal narrowing and fibrinoid necrosis. The resulting Charcot-Bouchard microaneurysms may rupture → ICH. Wall thickening with luminal narrowing → lacunar infarcts and WMH.',
      'فشار خون مزمن بالا منجر به لیپوهیالینوز پرفوراتورهای کوچک می‌شود: ضخیم شدن دیواره، تنگی لومن و نکروز فیبرینوئید. میکروآنوریسم‌های Charcot-Bouchard ممکن است پاره شوند → ICH. ضخیم شدن دیواره با تنگی لومن → انفارکت لاکونار و WMH.')
  ),

  Q('hma-05',
    L('Im MRT/SWI zeigt ein 68-jähriger Patient zahlreiche kleine Hypointensitäten in Basalganglien, Thalamus und Pons. Was ist die wahrscheinlichste Diagnose?',
      'On MRI/SWI a 68-year-old patient shows numerous small hypointensities in the basal ganglia, thalamus and pons. What is the most likely diagnosis?',
      'در MRI/SWI یک بیمار ۶۸ ساله هایپوانتنسیتی‌های کوچک متعددی در بازال گانگلیا، تالاموس و پونز نشان می‌دهد. محتمل‌ترین تشخیص چیست؟'),
    [
      L('Hypertensive Mikroangiopathie mit CMBs', 'Hypertensive microangiopathy with CMBs', 'میکروآنژیوپاتی فشار خون بالا با CMBs'),
      L('Zerebrale Amyloidangiopathie (CAA)', 'Cerebral amyloid angiopathy (CAA)', 'آنژیوپاتی آمیلوئید مغزی (CAA)'),
      L('Multiple Kavernome', 'Multiple cavernomas', 'کاورنوم‌های متعدد'),
      L('Diffuse axonale Verletzung', 'Diffuse axonal injury', 'آسیب آکسونال منتشر'),
    ], 0,
    L('Tiefe zerebrale Mikroblutungen (CMBs) in SWI — lokalisiert in Basalganglien, Thalamus, Pons — sind typisch für die hypertensive Mikroangiopathie. CAA zeigt dagegen kortikale/subkortikale CMBs. Diese Differenzierung (tief vs. kortikal) ist klinisch wichtig für die Diagnosestellung und Rezidivrisikobewertung.',
      'Deep cerebral microbleeds (CMBs) on SWI localised in basal ganglia, thalamus and pons are typical of hypertensive microangiopathy. CAA shows cortical/subcortical CMBs. This distinction (deep vs. cortical) is clinically important for diagnosis and recurrence risk assessment.',
      'خونریزی‌های میکرو مغزی (CMBs) عمقی در SWI که در بازال گانگلیا، تالاموس و پونز قرار دارند، مشخصه میکروآنژیوپاتی فشار خون بالا هستند. CAA CMBs کورتیکال/ساب‌کورتیکال نشان می‌دهد. این تمایز (عمقی در مقابل کورتیکال) از نظر بالینی برای تشخیص و ارزیابی خطر عود مهم است.')
  ),

  Q('hma-06',
    L('Was beschreibt die Fazekas-Skala?',
      'What does the Fazekas scale describe?',
      'مقیاس Fazekas چه چیزی را توصیف می‌کند؟'),
    [
      L('Ausmaß der periventrikulären und tiefen Marklager-WMH im MRT', 'Extent of periventricular and deep white matter WMH on MRI', 'میزان WMH پریونتریکولار و ماده سفید عمقی در MRI'),
      L('Schweregrad der hypertensiven ICB nach Volumen', 'Severity of hypertensive ICH by volume', 'شدت ICH فشار خون بالا بر اساس حجم'),
      L('Anzahl der Mikroblutungen im SWI', 'Number of microbleeds on SWI', 'تعداد خونریزی‌های میکرو در SWI'),
      L('Stenosegrad der intrazerebralen Arterien', 'Degree of stenosis of intracerebral arteries', 'درجه تنگی شریان‌های داخل مغزی'),
    ], 0,
    L('Die Fazekas-Skala klassifiziert das Ausmaß der WMH (Leukoaraiose) in FLAIR/T2: Grad 0 (keine) → Grad 3 (konfluierend). Getrennte Bewertung für periventrikuläre (Caps/Bands) und tiefe weiße Substanz.',
      'The Fazekas scale classifies the extent of WMH (leukoaraiosis) on FLAIR/T2: grade 0 (none) → grade 3 (confluent). Separate scoring for periventricular (caps/bands) and deep white matter.',
      'مقیاس Fazekas میزان WMH (لوکوآرائوز) را در FLAIR/T2 طبقه‌بندی می‌کند: درجه ۰ (هیچ) → درجه ۳ (تجمع‌یافته). نمره‌دهی جداگانه برای ماده سفید پریونتریکولار (کپ‌ها/باندها) و عمقی.')
  ),

  Q('hma-07',
    L('Welche Sequenz zeigt einen akuten lakunären Infarkt am sensitivsten?',
      'Which sequence is most sensitive for detecting an acute lacunar infarct?',
      'کدام سکانس برای تشخیص انفارکت لاکونار حاد حساس‌ترین است؟'),
    [
      L('DWI (Diffusions-gewichtete Bildgebung)', 'DWI (diffusion-weighted imaging)', 'DWI (تصویربرداری با وزن انتشار)'),
      L('T2 / FLAIR', 'T2 / FLAIR', 'T2 / FLAIR'),
      L('SWI (Susceptibility Weighted Imaging)', 'SWI (susceptibility weighted imaging)', 'SWI (تصویربرداری با وزن حساسیت)'),
      L('CCT nativ', 'Non-contrast CCT', 'CCT بدون کنتراست'),
    ], 0,
    L('DWI zeigt akute Ischämien (einschließlich lakunärer Infarkte <15 mm in tiefen Territorien) als Restriktionsmuster bereits innerhalb von Minuten. T2/FLAIR wird erst nach 6–24 h positiv. CCT ist für kleine lakunäre Infarkte wenig sensitiv.',
      'DWI shows acute ischaemia (including lacunar infarcts <15 mm in deep territories) as a restriction pattern within minutes. T2/FLAIR becomes positive only after 6–24 h. CCT has low sensitivity for small lacunar infarcts.',
      'DWI ایسکمی حاد (از جمله انفارکت‌های لاکونار <15 میلی‌متر در مناطق عمقی) را در عرض چند دقیقه به عنوان الگوی محدودیت نشان می‌دهد. T2/FLAIR فقط پس از 6-24 ساعت مثبت می‌شود. CCT برای انفارکت‌های لاکونار کوچک حساسیت کمی دارد.')
  ),

  Q('hma-08',
    L('Welcher Befund im CCT spricht am stärksten für eine Metastase und NICHT für eine hypertensive ICB?',
      'Which CCT finding most strongly suggests a metastasis and NOT hypertensive ICH?',
      'کدام یافته CCT بیشتر از همه به متاستاز اشاره دارد و نه ICH فشار خون بالا؟'),
    [
      L('Runde Form + perifokales Ödem + periphere Lokalisation', 'Round shape + perilesional oedema + peripheral location', 'شکل گرد + ادم پریفوکال + محل محیطی'),
      L('Irreguläre Form + tiefe Lokalisation', 'Irregular shape + deep location', 'شکل نامنظم + محل عمقی'),
      L('Hyperdens + Ventrikeleinbruch', 'Hyperdense + intraventricular extension', 'هیپردنس + گسترش بطنی'),
      L('Kleine Hypodensitäten in den Basalganglien', 'Small hypodensities in the basal ganglia', 'هایپودنسیته‌های کوچک در بازال گانگلیا'),
    ], 0,
    L('Metastasen-typische CCT-Zeichen: rund, peripher, ausgeprägtes perifokales Ödem, oft multipel. KM-Enhancement. Hypertensive ICB ist irregulär, tief, mit relativ wenigem Ödem. Das Ödem-Ausmaß ist ein wichtiges Differenzierungskriterium.',
      'Metastasis-typical CCT signs: round, peripheral, prominent perilesional oedema, often multiple. Contrast enhancement. Hypertensive ICH is irregular, deep, with relatively little oedema. The extent of oedema is an important differentiating criterion.',
      'نشانه‌های تیپیک CCT متاستاز: گرد، محیطی، ادم پریفوکال شدید، اغلب متعدد. انهانسمنت کنتراستی. ICH فشار خون نامنظم، عمقی، با ادم نسبتاً کم است. میزان ادم یک معیار مهم تمایز است.')
  ),

  Q('hma-09',
    L('Ein Patient hat eine hypertensive ICB unter Warfarin (INR 3,2). Welche Maßnahme hat die höchste Priorität?',
      'A patient has a hypertensive ICH while on warfarin (INR 3.2). Which measure has the highest priority?',
      'یک بیمار با وارفارین (INR 3.2) دچار ICH فشار خون بالا می‌شود. کدام اقدام بالاترین اولویت را دارد؟'),
    [
      L('Sofortige Antagonisierung mit PCC + Vitamin K iv.', 'Immediate reversal with PCC + IV vitamin K', 'معکوس فوری با PCC + ویتامین K IV'),
      L('Frisches gefrorenes Plasma (FFP) allein', 'Fresh frozen plasma (FFP) alone', 'پلاسمای تازه منجمد (FFP) به تنهایی'),
      L('Abwarten bis INR spontan sinkt', 'Wait for INR to fall spontaneously', 'صبر کردن تا INR به طور خودبخود کاهش یابد'),
      L('Thrombozytenkonzentrat', 'Platelet concentrate', 'کنسانتره پلاکتی'),
    ], 0,
    L('Bei Warfarin-assoziierter ICB: sofort PCC (25 IE/kg) zur schnellen Reversal der Antikoagulation + Vitamin K iv. zur dauerhaften Normalisierung. Ziel: INR <1,3 innerhalb von 4 h. FFP allein ist zu langsam und voluminös. Thrombozytenkonzentrat nur bei Thrombozytopenie / ASS-Einnahme.',
      'In warfarin-associated ICH: immediately PCC (25 IU/kg) for rapid reversal of anticoagulation + IV vitamin K for sustained normalisation. Target: INR <1.3 within 4 h. FFP alone is too slow and bulky. Platelet concentrate only for thrombocytopenia or aspirin use.',
      'در ICH مرتبط با وارفارین: فوراً PCC (25 IU/kg) برای معکوس سریع ضد انعقاد + ویتامین K IV برای نرمال‌سازی پایدار. هدف: INR <1.3 در عرض 4 ساعت. FFP به تنهایی خیلی کند و حجیم است. کنسانتره پلاکتی فقط برای ترومبوسیتوپنی یا مصرف آسپرین.')
  ),

  Q('hma-10',
    L('Was ist das klassische klinische Bild einer Pons-Blutung?',
      'What is the classic clinical picture of a pontine haemorrhage?',
      'تصویر بالینی کلاسیک خونریزی پونز چیست؟'),
    [
      L('Stecknadelkopf-Pupillen + Tetraparese + Koma', 'Pinpoint pupils + tetraparesis + coma', 'مردمک‌های سوزن‌نقطه‌ای + تتراپارزی + کما'),
      L('Kontralaterale Hemiparese + Hemisensibilitätsstörung', 'Contralateral hemiparesis + hemisensory loss', 'همی‌پارزی کنترالترال + اختلال حسی نیمه'),
      L('Ataxie + Schwindel + Erbrechen', 'Ataxia + dizziness + vomiting', 'آتاکسی + سرگیجه + استفراغ'),
      L('Hemisensibilitätsstörung + vertikale Blickparese', 'Hemisensory loss + vertical gaze palsy', 'اختلال حسی نیمه + فلج نگاه عمودی'),
    ], 0,
    L('Ponsblutung: charakteristisch sind beidseitige Stecknadelkopf-Pupillen (sympathische Fasern bilateral betroffen), Tetraparese (bilateral deszendierend) und rascher Bewusstseinsverlust bis zum Koma. Schlechteste Prognose aller ICB-Lokalisationen.',
      'Pontine haemorrhage: characteristic bilateral pinpoint pupils (bilateral involvement of sympathetic fibres), tetraparesis (bilateral descending tracts) and rapid loss of consciousness to coma. Worst prognosis of all ICH locations.',
      'خونریزی پونز: مردمک‌های سوزن‌نقطه‌ای دوطرفه مشخصه (درگیری دوطرفه فیبرهای سمپاتیک)، تتراپارزی (مسیرهای نزولی دوطرفه) و از دست دادن سریع هوشیاری تا کما. بدترین پیش‌آگهی از تمام محل‌های ICH.')
  ),

  Q('hma-11',
    L('Welche Aussage zum lakunären Infarkt trifft zu?',
      'Which statement about lacunar infarct is correct?',
      'کدام گزارش درباره انفارکت لاکونار صحیح است؟'),
    [
      L('Größe <15 mm, durch Perforatoren-Verschluss bedingt, im tiefen Territorium', 'Size <15 mm, caused by perforator occlusion, in deep territory', 'اندازه <15 میلی‌متر، ناشی از انسداد پرفوراتور، در مناطق عمقی'),
      L('Immer >2 cm, kortikal gelegen', 'Always >2 cm, cortical location', 'همیشه >2 سانتی‌متر، محل کورتیکال'),
      L('Durch große Gefäßatherosklerose bedingt', 'Caused by large vessel atherosclerosis', 'ناشی از آترواسکلروز عروق بزرگ'),
      L('Nur im MRT, nicht im CCT sichtbar', 'Visible on MRI only, not CCT', 'فقط در MRI قابل مشاهده، نه در CCT'),
    ], 0,
    L('Lakunäre Infarkte entstehen durch Verschluss einzelner Perforatoren (Aa. lenticulostriatae etc.) durch Lipohyalinose. Definition: <15 mm, im tiefen Territorium (Basalganglien, Capsula interna, Thalamus, Pons). Im akuten Stadium DWI-positiv, chronisch als T1-hypointense Höhle sichtbar.',
      'Lacunar infarcts arise from occlusion of individual perforators (lenticulostriate arteries etc.) by lipohyalinosis. Definition: <15 mm, in deep territory (basal ganglia, internal capsule, thalamus, pons). Acute stage: DWI positive; chronic: visible as T1 hypointense cavity.',
      'انفارکت‌های لاکونار از انسداد پرفوراتورهای منفرد (شریان‌های لنتیکولواستریات و غیره) توسط لیپوهیالینوز ناشی می‌شوند. تعریف: <15 میلی‌متر، در مناطق عمقی (بازال گانگلیا، کپسول داخلی، تالاموس، پونز). مرحله حاد: DWI مثبت؛ مزمن: به عنوان حفره هایپوانتنس T1 قابل مشاهده.')
  ),

  Q('hma-12',
    L('Ein 70-jähriger mit Bluthochdruck: MRT FLAIR zeigt großflächige periventrikuläre und konfluierende tiefe WMH. Fazekas-Grad?',
      'A 70-year-old with hypertension: MRI FLAIR shows extensive periventricular and confluent deep WMH. Fazekas grade?',
      'یک ۷۰ ساله با فشار خون: MRI FLAIR وسیع WMH پریونتریکولار و تجمع عمقی نشان می‌دهد. درجه Fazekas؟'),
    [
      L('Grad 3', 'Grade 3', 'درجه ۳'),
      L('Grad 1', 'Grade 1', 'درجه ۱'),
      L('Grad 2', 'Grade 2', 'درجه ۲'),
      L('Grad 0', 'Grade 0', 'درجه ۰'),
    ], 0,
    L('Fazekas Grad 3: ausgedehnte periventrikuläre WMH (kein abgrenzbares Halo mehr, sondern irreguläre Randzone) + großflächig konfluierende tiefe Marklagerläsionen. Grad 1 = gepunktet, Grad 2 = beginnende Konfluenz. Fazekas 3 korreliert mit kognitivem Abbau und erhöhtem Schlaganfallrisiko.',
      'Fazekas grade 3: extensive periventricular WMH (no longer a distinct halo but an irregular margin) + large confluent deep white matter lesions. Grade 1 = punctate, grade 2 = beginning confluence. Fazekas 3 correlates with cognitive decline and increased stroke risk.',
      'Fazekas درجه ۳: WMH پریونتریکولار وسیع (دیگر هاله متمایزی وجود ندارد، بلکه حاشیه نامنظم) + ضایعات ماده سفید عمقی تجمع وسیع. درجه ۱ = نقطه‌ای، درجه ۲ = شروع تجمع. Fazekas 3 با کاهش شناختی و افزایش خطر سکته مرتبط است.')
  ),
]

export const HMA_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, HMA_QUESTION_SEEDS.map(seed => ({
  id: `hma-${lang}-${seed.id}`,
  tags: ['hypertensive-mikroangiopathie', 'hypertensive-icb', 'gehirn'],
  fach: 'gehirn',
  question: seed.question[lang],
  options: seed.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
  correct: String.fromCharCode(65 + seed.correct),
  explanation: seed.explanation[lang],
}))]))

// ─── Flashcard Seeds ──────────────────────────────────────────────────────────

const HMA_FLASH_SEEDS = [
  F('def', L('Grundlagen', 'Basics', 'اساسیات'),
    L('Was ist die hypertensive Mikroangiopathie und welche zwei Hauptmanifestationen hat sie?', 'What is hypertensive microangiopathy and what are its two main manifestations?', 'میکروآنژیوپاتی فشار خون بالا چیست و دو تظاهر اصلی آن کدامند؟'),
    L('Hirnschädigung durch chronisch erhöhten Blutdruck auf kleine Perforatoren.\n1. Akute hypertensive ICB (Charcot-Bouchard-Aneurysmen)\n2. Chronische Mikroangiopathie: Lakunen + WMH + CMBs', 'Brain damage from chronic hypertension affecting small perforators.\n1. Acute hypertensive ICH (Charcot-Bouchard aneurysms)\n2. Chronic microangiopathy: lacunes + WMH + CMBs', 'آسیب مغزی ناشی از فشار خون مزمن بالا بر پرفوراتورهای کوچک.\n۱. ICH حاد فشار خون (آنوریسم‌های Charcot-Bouchard)\n۲. میکروآنژیوپاتی مزمن: لاکون + WMH + CMBs'),
    L('Zwei Manifestationen: akute ICB + chronische Mikroangiopathie', 'Two manifestations: acute ICH + chronic microangiopathy', 'دو تظاهر: ICH حاد + میکروآنژیوپاتی مزمن')
  ),

  F('lipohyal', L('Pathophysiologie', 'Pathophysiology', 'پاتوفیزیولوژی'),
    L('Was ist Lipohyalinose und was sind ihre Folgen?', 'What is lipohyalinosis and what are its consequences?', 'لیپوهیالینوز چیست و عواقب آن چیست؟'),
    L('Schädigung der kleinen Gehirnarterien durch chronischen Bluthochdruck:\n→ Wandverdickung mit Lumenverengung\n→ Fibrinoide Nekrose\n→ Charcot-Bouchard-Mikroaneurysmen\nFolgen: ICB, Lakunäre Infarkte, WMH', 'Damage to small cerebral arteries by chronic hypertension:\n→ Wall thickening with luminal narrowing\n→ Fibrinoid necrosis\n→ Charcot-Bouchard microaneurysms\nConsequences: ICH, lacunar infarcts, WMH', 'آسیب به شریان‌های کوچک مغزی توسط فشار خون مزمن:\n→ ضخیم شدن دیواره با تنگی لومن\n→ نکروز فیبرینوئید\n→ میکروآنوریسم‌های Charcot-Bouchard\nعواقب: ICH، انفارکت لاکونار، WMH'),
    L('Lipohyalinose → Charcot-Bouchard → ICB', 'Lipohyalinosis → Charcot-Bouchard → ICH', 'لیپوهیالینوز → Charcot-Bouchard → ICH')
  ),

  F('loci', L('Lokalisation', 'Location', 'محل'),
    L('Typische Lokalisationen der hypertensiven ICB (häufigste zuerst)', 'Typical locations of hypertensive ICH (most common first)', 'محل‌های معمول ICH فشار خون بالا (شایع‌ترین اول)'),
    L('1. Putamen / Globus pallidus / Capsula interna (~50 %)\n2. Thalamus (~15 %)\n3. Kleinhirn (~10 %)\n4. Pons (~10 %)\n5. Lobär (<10 %, eher CAA)', '1. Putamen / globus pallidus / internal capsule (~50%)\n2. Thalamus (~15%)\n3. Cerebellum (~10%)\n4. Pons (~10%)\n5. Lobar (<10%, more likely CAA)', '۱. پوتامن / گلوبوس پالیدوس / کپسول داخلی (~۵۰٪)\n۲. تالاموس (~۱۵٪)\n۳. مخچه (~۱۰٪)\n۴. پونز (~۱۰٪)\n۵. لوبار (<۱۰٪، بیشتر CAA)'),
    L('Putamen > Thalamus > Kleinhirn > Pons', 'Putamen > thalamus > cerebellum > pons', 'پوتامن > تالاموس > مخچه > پونز')
  ),

  F('cct-morph', L('CCT', 'CCT', 'CCT'),
    L('CCT-Morphologie der hypertensiven ICB: Was sind die typischen Merkmale?', 'CCT morphology of hypertensive ICH: what are the typical features?', 'مورفولوژی CCT در ICH فشار خون بالا: ویژگی‌های معمول چیست؟'),
    L('• Hyperdens (50–70 HU)\n• Irregulär, nicht vollkommen rund\n• Tiefe Lokalisation\n• Anfangs wenig Umgebungsödem\n(≠ Metastase: rund + peripher + viel Ödem)', '• Hyperdense (50–70 HU)\n• Irregular, not perfectly round\n• Deep location\n• Initially little surrounding oedema\n(≠ metastasis: round + peripheral + lots of oedema)', '• هیپردنس (50–70 HU)\n• نامنظم، کاملاً گرد نیست\n• محل عمقی\n• در ابتدا ادم اطراف کم\n(≠ متاستاز: گرد + محیطی + ادم زیاد)'),
    L('Hyperdens + irregulär + tief + wenig Ödem', 'Hyperdense + irregular + deep + little oedema', 'هیپردنس + نامنظم + عمقی + ادم کم')
  ),

  F('spotsign', L('CTA', 'CTA', 'CTA'),
    L('Was ist das Spot-Sign und welche klinische Bedeutung hat es?', 'What is the spot sign and what is its clinical significance?', 'Spot Sign چیست و اهمیت بالینی آن چیست؟'),
    L('Punktförmige KM-Anreicherung innerhalb der ICB im CTA\n= aktive Nachblutung aus kleinem Gefäß\n→ Risiko der Hämatomexpansion ↑↑\n→ erhöhte 90-Tage-Mortalität', 'Focal contrast enhancement within the ICH on CTA\n= active re-bleeding from small vessel\n→ haematoma expansion risk ↑↑\n→ increased 90-day mortality', 'تجمع کنتراست نقطه‌ای داخل ICH در CTA\n= خونریزی فعال مجدد از عروق کوچک\n→ خطر گسترش هماتوم ↑↑\n→ افزایش مرگ‌ومیر ۹۰ روزه'),
    L('Spot-Sign = aktive Nachblutung = Hämatomexpansion', 'Spot sign = active re-bleeding = haematoma expansion', 'Spot Sign = خونریزی فعال = گسترش هماتوم')
  ),

  F('fazekas', L('MRT', 'MRI', 'MRI'),
    L('Fazekas-Skala: Grad 0–3 für WMH in FLAIR/T2', 'Fazekas scale: grades 0–3 for WMH on FLAIR/T2', 'مقیاس Fazekas: درجه ۰-۳ برای WMH در FLAIR/T2'),
    L('Grad 0: keine WMH\nGrad 1: gepunktete Caps/Bänder (periventrikulär), Punkte (tief)\nGrad 2: Halo (periventrik.) + beginnende Konfluenz (tief)\nGrad 3: ausgedehnte periventrikuläre WMH + großflächig konfluierend', 'Grade 0: no WMH\nGrade 1: punctate caps/bands (periventricular), dots (deep)\nGrade 2: halo (periventricular) + beginning confluence (deep)\nGrade 3: extensive periventricular WMH + large confluent areas', 'درجه ۰: بدون WMH\nدرجه ۱: کپ‌های/باندهای نقطه‌ای (پریونتریکولار)، نقطه‌ها (عمقی)\nدرجه ۲: هاله (پریونتریکولار) + شروع تجمع (عمقی)\nدرجه ۳: WMH پریونتریکولار وسیع + مناطق تجمع بزرگ'),
    L('0=keine, 1=Punkte, 2=Halo/Konfluenz, 3=ausgedehnt', '0=none, 1=dots, 2=halo/confluence, 3=extensive', '۰=هیچ، ۱=نقطه، ۲=هاله/تجمع، ۳=وسیع')
  ),

  F('cmbs', L('MRT/SWI', 'MRI/SWI', 'MRI/SWI'),
    L('Zerebrale Mikroblutungen (CMBs) im SWI: Wie unterscheidet man Hypertonie von CAA?', 'Cerebral microbleeds (CMBs) on SWI: how to distinguish hypertension from CAA?', 'خونریزی‌های میکرو مغزی (CMBs) در SWI: چگونه فشار خون را از CAA تشخیص می‌دهیم؟'),
    L('Hypertensive Mikroangiopathie:\n→ Tiefe CMBs: Basalganglien, Thalamus, Pons, Kleinhirn\n\nZerebrale Amyloidangiopathie (CAA):\n→ Kortikale/subkortikale CMBs: Kortex, Mark-Rinden-Grenze\nLobar + älterer Patient + Boston-Kriterien', 'Hypertensive microangiopathy:\n→ Deep CMBs: basal ganglia, thalamus, pons, cerebellum\n\nCerebral amyloid angiopathy (CAA):\n→ Cortical/subcortical CMBs: cortex, grey-white junction\nLobar + older patient + Boston criteria', 'میکروآنژیوپاتی فشار خون:\n→ CMBs عمقی: بازال گانگلیا، تالاموس، پونز، مخچه\n\nآنژیوپاتی آمیلوئید مغزی (CAA):\n→ CMBs کورتیکال/ساب‌کورتیکال: کورتکس، مرز ماده خاکستری-سفید\nلوبار + بیمار مسن‌تر + معیارهای Boston'),
    L('Tief = Hypertonie | Kortikal = CAA', 'Deep = hypertension | Cortical = CAA', 'عمقی = فشار خون | کورتیکال = CAA')
  ),

  F('lakunen', L('MRT/DWI', 'MRI/DWI', 'MRI/DWI'),
    L('Lakunärer Infarkt: Definition und MRT-Befunde?', 'Lacunar infarct: definition and MRI findings?', 'انفارکت لاکونار: تعریف و یافته‌های MRI؟'),
    L('Definition: ischämischer Infarkt <15 mm durch Perforator-Verschluss im tiefen Territorium (Basalganglien, Capsula interna, Thalamus, Pons)\n\nMRT:\n• Akut: DWI hyperintens + ADC hypointens\n• Chronisch: T1 hypointense Höhle (Lakune)\n• FLAIR: umgebende WMH', 'Definition: ischaemic infarct <15 mm from perforator occlusion in deep territory (basal ganglia, internal capsule, thalamus, pons)\n\nMRI:\n• Acute: DWI hyperintense + ADC hypointense\n• Chronic: T1 hypointense cavity (lacune)\n• FLAIR: surrounding WMH', 'تعریف: انفارکت ایسکمیک <15 میلی‌متر از انسداد پرفوراتور در منطقه عمقی (بازال گانگلیا، کپسول داخلی، تالاموس، پونز)\n\nMRI:\n• حاد: DWI هایپرانتنس + ADC هایپوانتنس\n• مزمن: حفره هایپوانتنس T1 (لاکون)\n• FLAIR: WMH اطراف'),
    L('Lakunen <15 mm tief, DWI akut, T1-Höhle chronisch', 'Lacunes <15 mm deep, DWI acute, T1 cavity chronic', 'لاکون <15 میلی‌متر عمقی، DWI حاد، حفره T1 مزمن')
  ),

  F('pons-klinik', L('Klinik', 'Clinical', 'کلینیک'),
    L('Klinik der Ponsblutung – welche 3 klassischen Zeichen?', 'Clinical features of pontine haemorrhage – which 3 classic signs?', 'تظاهرات بالینی خونریزی پونز – ۳ نشانه کلاسیک کدامند؟'),
    L('1. Stecknadelkopf-Pupillen (bds. Miosis: Sympathikus bilateral betroffen)\n2. Tetraparese (bilateral deszendierende motorische Bahn)\n3. Rascher Bewusstseinsverlust bis Koma\n⚠️ Schlechteste Prognose aller ICB-Lokalisationen', '1. Pinpoint pupils (bilateral miosis: bilateral sympathetic involvement)\n2. Tetraparesis (bilateral descending motor pathway)\n3. Rapid loss of consciousness to coma\n⚠️ Worst prognosis of all ICH locations', '۱. مردمک‌های سوزن‌نقطه‌ای (میوز دوطرفه: درگیری دوطرفه سمپاتیک)\n۲. تتراپارزی (مسیر حرکتی نزولی دوطرفه)\n۳. از دست دادن سریع هوشیاری تا کما\n⚠️ بدترین پیش‌آگهی از تمام محل‌های ICH'),
    L('Pons: Stecknadelkopf + Tetraparese + Koma', 'Pons: pinpoint + tetraparesis + coma', 'پونز: سوزن‌نقطه‌ای + تتراپارزی + کما')
  ),

  F('kleinhirn-op', L('Therapie', 'Treatment', 'درمان'),
    L('Wann ist bei einer Kleinhirnblutung eine neurochirurgische Intervention indiziert?', 'When is neurosurgical intervention indicated for cerebellar haemorrhage?', 'چه زمانی مداخله جراحی مغز برای خونریزی مخچه نشان داده می‌شود؟'),
    L('Indikationen:\n• Durchmesser ≥3 cm\n• Kompression des 4. Ventrikels\n• Obstruktiver Hydrozephalus\n• Neurologische Verschlechterung trotz konservativer Therapie\n\nDringend: klinischer Zustand verschlechtert sich rasch', 'Indications:\n• Diameter ≥3 cm\n• Compression of the 4th ventricle\n• Obstructive hydrocephalus\n• Neurological deterioration despite conservative treatment\n\nUrgent: rapidly deteriorating clinical condition', 'اندیکاسیون‌ها:\n• قطر ≥3 سانتی‌متر\n• فشار به بطن چهارم\n• هیدروسفالی انسدادی\n• تدهور عصبی علیرغم درمان محافظه‌کارانه\n\nفوری: وضعیت بالینی به سرعت بدتر می‌شود'),
    L('Kleinhirn ≥3 cm → neurochirurgisch', 'Cerebellum ≥3 cm → neurosurgical', 'مخچه ≥3 سانتی‌متر → جراحی مغز')
  ),

  F('dd-icb', L('Differenzialdiagnose', 'Differential', 'تشخیص افتراقی'),
    L('DD der ICB: hypertensiv vs. CAA vs. Metastase vs. Kavernom — Schlüsselmerkmale', 'DDx of ICH: hypertensive vs. CAA vs. metastasis vs. cavernoma — key features', 'تشخیص افتراقی ICH: فشار خون در مقابل CAA در مقابل متاستاز در مقابل کاورنوم — ویژگی‌های کلیدی'),
    L('Hypertensiv: tief, irregulär, CMBs tief (SWI)\nCAA: lobär, kortikal, CMBs kortikal, alt\nMetastase: rund, peripher, Ödem ↑↑, Enhancement, multipel\nKavernom: Popcorn-T2, SWI-Halo, kein Ödem, jung', 'Hypertensive: deep, irregular, CMBs deep (SWI)\nCAA: lobar, cortical, CMBs cortical, elderly\nMetastasis: round, peripheral, oedema ↑↑, enhancement, multiple\nCavernoma: popcorn T2, SWI halo, no oedema, young', 'فشار خون: عمقی، نامنظم، CMBs عمقی (SWI)\nCAA: لوبار، کورتیکال، CMBs کورتیکال، مسن\nمتاستاز: گرد، محیطی، ادم ↑↑، انهانسمنت، متعدد\nکاورنوم: پاپ‌کورن T2، هاله SWI، بدون ادم، جوان'),
    L('Tief=Hypertonus | Lobär=CAA | Rund+Ödem=Meta | Popcorn=Kavernom', 'Deep=hypertension | Lobar=CAA | Round+oedema=meta | Popcorn=cavernoma', 'عمقی=فشار خون | لوبار=CAA | گرد+ادم=متا | پاپ‌کورن=کاورنوم')
  ),

  F('reversal', L('Therapie', 'Treatment', 'درمان'),
    L('Antikoagulanzien-Reversal bei ICB: Welches Mittel für welches Antikoagulans?', 'Anticoagulant reversal in ICH: which agent for which anticoagulant?', 'معکوس ضد انعقاد در ICH: کدام عامل برای کدام ضد انعقاد؟'),
    L('Warfarin/Phenprocoumon:\n→ PCC (25 IU/kg) + Vitamin K iv. (Ziel INR <1,3)\n\nDabigatran (DTI):\n→ Idarucizumab (Praxbind®)\n\nFaktor-Xa-Inhibitoren (Rivaroxaban, Apixaban):\n→ Andexanet alfa\n\nAlle: so schnell wie möglich!', 'Warfarin/phenprocoumon:\n→ PCC (25 IU/kg) + IV vitamin K (target INR <1.3)\n\nDabigatran (DTI):\n→ Idarucizumab (Praxbind®)\n\nFactor Xa inhibitors (rivaroxaban, apixaban):\n→ Andexanet alfa\n\nAll: as fast as possible!', 'وارفارین/فنپروکومون:\n→ PCC (25 IU/kg) + ویتامین K IV (هدف INR <1.3)\n\nداbیگاتران (DTI):\n→ ایداروسیزوماب (Praxbind®)\n\nمهارکننده‌های فاکتور Xa (ریواروکسابان، آپیکسابان):\n→ اندگزانت آلفا\n\nهمه: در اسرع وقت!'),
    L('Warfarin→PCC+VitK | Dabigatran→Idarucizumab | Xa→Andexanet', 'Warfarin→PCC+VitK | Dabigatran→idarucizumab | Xa→andexanet', 'وارفارین→PCC+VitK | داbیگاتران→ایداروسیزوماب | Xa→اندگزانت')
  ),
]

export const HMA_FLASHCARDS = HMA_FLASH_SEEDS.map((item, index) => ({
  id: `hma-${String(index + 1).padStart(2, '0')}-${item.id}`,
  topicId: 'hypertensive-mikroangiopathie',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
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
