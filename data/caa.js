const L = (de, en, fa) => ({ de, en, fa })

// ─── Lesson ──────────────────────────────────────────────────────────────────

export const CAA_LESSON = {
  breadcrumb: L('Zerebrale Amyloidangiopathie', 'Cerebral Amyloid Angiopathy', 'آنژیوپاتی آمیلوئید مغزی'),
  title: L('CAA – Zerebrale Amyloidangiopathie', 'CAA – Cerebral Amyloid Angiopathy', 'CAA – آنژیوپاتی آمیلوئید مغزی'),
  definition: L(
    'Mikroangiopathische Schädigung der Gefäßwand durch Ablagerung von β-Amyloid in den Wänden kortikaler und leptomeningealer Gefäße – häufigste Ursache lobärer Hirnblutungen im Alter.',
    'Microangiopathic vessel wall injury caused by β-amyloid deposition in cortical and leptomeningeal vessels — leading cause of lobar intracerebral haemorrhage in the elderly.',
    'آسیب میکروآنژیوپاتیک دیواره عروقی ناشی از رسوب β-آمیلوئید در دیواره عروق کورتیکال و لپتومننژیال — شایع‌ترین علت خونریزی داخل مغزی لوبار در سالمندان.'
  ),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Warning', 'هشدار'),
  toc: L('Inhalte', 'Contents', 'فهرست'),

  heroCards: [
    {
      value: L('15–20 %', '15–20 %', '۱۵–۲۰٪'),
      label: L('aller spontanen ICBs', 'of all spontaneous ICH', 'از تمام ICH‌های خودبخودی'),
      text: L('bei Patienten > 60 Jahre', 'in patients > 60 years', 'در بیماران > ۶۰ سال'),
    },
    {
      value: L('Boston v2.0', 'Boston v2.0', 'Boston v2.0'),
      label: L('MRT-Diagnosekriterien', 'MRI diagnostic criteria', 'معیارهای تشخیصی MRI'),
      text: L('Probable + Possible CAA', 'Probable + Possible CAA', 'Probable CAA + Possible CAA'),
    },
    {
      value: L('85 %', '85 %', '۸۵٪'),
      label: L('Alzheimer-Assoziation', 'Alzheimer association', 'همراهی با آلزهایمر'),
      text: L('häufigste Komorbidität', 'most common comorbidity', 'شایع‌ترین بیماری همراه'),
    },
  ],

  sections: [
    { id: 'grundlagen',   icon: '📌', label: L('Grundlagen',           'Basics',              'اساسیات') },
    { id: 'pathophysio',  icon: '🔬', label: L('Pathophysiologie',     'Pathophysiology',     'پاتوفیزیولوژی') },
    { id: 'lokalisation', icon: '📍', label: L('Lokalisation & Klinik','Location & Clinical', 'محل و کلینیک') },
    { id: 'boston',       icon: '🎯', label: L('Boston-Kriterien v2.0','Boston Criteria v2.0','معیارهای Boston v2.0') },
    { id: 'mrt-def',      icon: '🧲', label: L('MRT-Definitionen',     'MRI Definitions',     'تعاریف MRI') },
    { id: 'differenzial', icon: '⚖️', label: L('Differenzialdiagnose', 'Differential',        'افتراقی') },
    { id: 'takehome',     icon: '🏁', label: L('Take-home',            'Take-home',           'جمع‌بندی') },
  ],

  // ── 1. Grundlagen ──────────────────────────────────────────────────────────
  grundlagen: {
    title: L('Grundlagen & Epidemiologie', 'Basics & Epidemiology', 'اساسیات و اپیدمیولوژی'),
    lead: L(
      'Die zerebrale Amyloidangiopathie entsteht durch Ablagerung von β-Amyloid-Protein in den Wänden überwiegend kortikaler und leptomeningealer Arterien und Arteriolen – unabhängig von systemischer Amyloidose.',
      'Cerebral amyloid angiopathy results from β-amyloid protein deposition in the walls of predominantly cortical and leptomeningeal arteries and arterioles — independent of systemic amyloidosis.',
      'آنژیوپاتی آمیلوئید مغزی از رسوب پروتئین β-آمیلوئید در دیواره عمدتاً شریان‌ها و آرتریول‌های کورتیکال و لپتومننژیال ناشی می‌شود — مستقل از آمیلوئیدوز سیستمیک.'
    ),
    items: [
      {
        icon: '📊',
        title: L('Häufigkeit', 'Frequency', 'فراوانی'),
        text: L('Ursächlich für ca. 15–20 % aller intrazerebralen Blutungen bei Patienten > 60 Jahren. Häufigste Ursache der lobären ICB im Alter.', 'Accounts for approximately 15–20% of all intracerebral haemorrhages in patients > 60 years. Most common cause of lobar ICH in the elderly.', 'مسئول حدود ۱۵–۲۰٪ از تمام خونریزی‌های داخل مغزی در بیماران > ۶۰ سال. شایع‌ترین علت ICH لوبار در سالمندی.'),
      },
      {
        icon: '👴',
        title: L('Altersverteilung', 'Age distribution', 'توزیع سنی'),
        text: L('Sporadische Form: meist bei Menschen über 60 Jahren. Hereditäre Variante (z. B. Dutch-type): häufiger bei jüngeren Patienten. Geschlecht: M = F.', 'Sporadic form: mainly in persons over 60 years. Hereditary variant (e.g. Dutch type): more common in younger patients. Sex: M = F.', 'فرم اسپورادیک: عمدتاً در افراد بالای ۶۰ سال. نوع ارثی (مثلاً Dutch-type): شایع‌تر در بیماران جوان‌تر. جنس: M = F.'),
      },
      {
        icon: '🧠',
        title: L('Assoziation mit Alzheimer', 'Association with Alzheimer', 'همراهی با آلزهایمر'),
        text: L('In ca. 85 % der Alzheimer-Fälle findet sich gleichzeitig eine CAA. Beide Erkrankungen teilen die β-Amyloid-Pathologie – CAA betrifft die Gefäßwand, Alzheimer das Hirnparenchym (Plaques).', 'Approximately 85% of Alzheimer cases also have CAA. Both share β-amyloid pathology — CAA affects vessel walls, Alzheimer the brain parenchyma (plaques).', 'در حدود ۸۵٪ موارد آلزهایمر CAA نیز وجود دارد. هر دو پاتولوژی β-آمیلوئید را به اشتراک می‌گذارند — CAA دیواره عروقی، آلزهایمر پارانشیم مغز (پلاک) را درگیر می‌کند.'),
      },
      {
        icon: '⬇️',
        title: L('Down-Syndrom', 'Down syndrome', 'سندرم داون'),
        text: L('Erhöhte CAA-Assoziation durch Trisomie 21 mit verstärkter β-Amyloid-Produktion (APP-Gen auf Chromosom 21). Frühzeitige amyloide Ablagerungen möglich.', 'Increased CAA association via trisomy 21 with enhanced β-amyloid production (APP gene on chromosome 21). Early amyloid deposits possible.', 'همراهی بیشتر CAA با تریزومی ۲۱ به دلیل افزایش تولید β-آمیلوئید (ژن APP روی کروموزوم ۲۱). رسوبات آمیلوئیدی زودرس ممکن است.'),
      },
    ],
    key: L(
      'CAA = lobäre Blutung + älterer Patient + kein tiefer Hypertonusbefund. Sporadisch häufig + Alzheimer-Komorbidität in ~85 %.',
      'CAA = lobar haemorrhage + elderly patient + no deep hypertensive finding. Sporadic common + Alzheimer comorbidity in ~85%.',
      'CAA = خونریزی لوبار + بیمار مسن + بدون یافته عمقی فشار خون بالا. اسپورادیک شایع + همراهی آلزهایمر در ~۸۵٪.'
    ),
  },

  // ── 2. Pathophysiologie ────────────────────────────────────────────────────
  pathophysio: {
    title: L('Pathophysiologie', 'Pathophysiology', 'پاتوفیزیولوژی'),
    lead: L(
      'β-Amyloid lagert sich progressiv in den Wänden kortikaler Arterien, Arteriolen und Kapillaren ab – dies führt zu Wandschwächung, Elastizitätsverlust und schließlich zu Blutungskomplikationen.',
      'β-amyloid progressively deposits in the walls of cortical arteries, arterioles and capillaries, causing wall weakening, loss of elasticity and ultimately haemorrhagic complications.',
      'β-آمیلوئید به تدریج در دیواره شریان‌ها، آرتریول‌ها و مویرگ‌های کورتیکال رسوب می‌کند — این باعث تضعیف دیواره، از دست دادن الاستیسیته و نهایتاً عوارض خونریزی می‌شود.'
    ),
    headers: [
      L('Schritt', 'Step', 'مرحله'),
      L('Pathomechanismus', 'Pathomechanism', 'پاتومکانیسم'),
      L('Bildgebliches Korrelat', 'Imaging correlate', 'همبستگی تصویربرداری'),
    ],
    rows: [
      [L('1. β-Amyloid-Ablagerung', '1. β-amyloid deposition', '۱. رسوب β-آمیلوئید'), L('Akkumulation in Adventitia und Media kortikaler Gefäße', 'Accumulation in adventitia and media of cortical vessels', 'تجمع در ادوانتیشیا و مدیا عروق کورتیکال'), L('Wandverdickung (MRT nicht direkt sichtbar)', 'Wall thickening (not directly visible on MRI)', 'ضخیم شدن دیواره (مستقیماً در MRI قابل مشاهده نیست)')],
      [L('2. Gefäßwandschwächung', '2. Vessel wall weakening', '۲. تضعیف دیواره عروقی'), L('Verlust der glatten Muskulatur, fibrinoide Nekrose', 'Loss of smooth muscle, fibrinoid necrosis', 'از دست دادن عضله صاف، نکروز فیبرینوئید'), L('Prädisposition zu Mikroblutungen', 'Predisposition to microbleeds', 'استعداد به خونریزی‌های میکرو')],
      [L('3. Kortikale Mikroblutungen', '3. Cortical microbleeds', '۳. خونریزی‌های میکرو کورتیکال'), L('Ruptur kleiner Kortexgefäße → Hämosiderinablagerung', 'Rupture of small cortical vessels → haemosiderin deposition', 'پارگی عروق کوچک کورتکس → رسوب هموسیدرین'), L('SWI/GRE: kortikal-subkortikale Hypointensitäten (lobäre CMBs)', 'SWI/GRE: cortical-subcortical hypointensities (lobar CMBs)', 'SWI/GRE: هایپوانتنسیتی‌های کورتیکال-ساب‌کورتیکال (CMBs لوبار)')],
      [L('4. Kortikale Siderose (cSS)', '4. Cortical siderosis (cSS)', '۴. سیدروز کورتیکال (cSS)'), L('Hämosiderin entlang der Hirnfurchen als Narben früherer Einblutungen', 'Haemosiderin along sulci as scars of prior cortical bleeds', 'هموسیدرین در طول شیارهای مغزی به عنوان اسکار خونریزی‌های کورتیکال قبلی'), L('SWI: lineare Hypointensität entlang Kortexoberfläche', 'SWI: linear hypointensity along cortical surface', 'SWI: هایپوانتنسیتی خطی در امتداد سطح کورتکس')],
      [L('5. Lobäre ICB', '5. Lobar ICH', '۵. ICH لوبار'), L('Ruptur mittelgroßer kortikaler Gefäße → makroskopische Lappen-Blutung', 'Rupture of medium cortical vessels → macroscopic lobar haemorrhage', 'پارگی عروق کورتیکال متوسط → خونریزی لوبار ماکروسکوپیک'), L('CT/MRT: lobäre ICH, keine Beteiligung der Tiefen', 'CT/MRI: lobar ICH, no deep involvement', 'CT/MRI: ICH لوبار، بدون درگیری عمقی')],
    ],
    key: L(
      'β-Amyloid schwächt die Kortexgefäße → Mikroblutungen (CMBs) → cSS → lobäre ICB. Tiefe Strukturen (Basalganglien, Thalamus) bleiben bei CAA typischerweise frei.',
      'β-amyloid weakens cortical vessels → microbleeds (CMBs) → cSS → lobar ICH. Deep structures (basal ganglia, thalamus) are typically spared in CAA.',
      'β-آمیلوئید عروق کورتکس را تضعیف می‌کند → خونریزی‌های میکرو (CMBs) → cSS → ICH لوبار. ساختارهای عمقی (بازال گانگلیا، تالاموس) معمولاً در CAA درگیر نمی‌شوند.'
    ),
  },

  // ── 3. Lokalisation & Klinik ──────────────────────────────────────────────
  lokalisation: {
    title: L('Lokalisation & Klinik', 'Location & Clinical Presentation', 'محل و تظاهرات بالینی'),
    lead: L(
      'CAA manifestiert sich durch vier charakteristische Blutungsmuster – alle strikt lobar/kortikal. Die Klinik variiert von akuter Schlaganfallsymptomatik bis zu chronisch-progressivem Verlauf.',
      'CAA presents with four characteristic bleeding patterns — all strictly lobar/cortical. Clinical features range from acute stroke-like symptoms to a chronically progressive course.',
      'CAA با چهار الگوی مشخص خونریزی تظاهر می‌کند — همه به‌طور دقیق لوبار/کورتیکال. تظاهرات بالینی از علائم حاد شبیه سکته تا سیر مزمن-پیشرونده متغیر است.'
    ),
    lokHeaders: [
      L('Blutungstyp', 'Bleeding type', 'نوع خونریزی'),
      L('Lokalisation', 'Location', 'محل'),
      L('Charakteristikum', 'Characteristic', 'ویژگی'),
    ],
    lokRows: [
      [L('Lobäre ICH', 'Lobar ICH', 'ICH لوبار'), L('Kortikal-subkortikal, ein Hirnlappen', 'Cortical-subcortical, one cerebral lobe', 'کورتیکال-ساب‌کورتیکال، یک لوب مغزی'), L('Wichtigste klinische Manifestation, schlaganfallähnliche Symptomatik', 'Most important clinical manifestation, stroke-like symptoms', 'مهم‌ترین تظاهر بالینی، علائم شبیه سکته')],
      [L('Kortikale Mikroblutungen', 'Cortical microbleeds', 'خونریزی‌های میکرو کورتیکال'), L('Ausschließlich kortikal/subkortikal verteilt', 'Distributed exclusively cortically/subcortically', 'توزیع انحصاری کورتیکال/ساب‌کورتیکال'), L('Kleine SWI-Signalauslöschungen; kein tiefer Befund (DD: Hypertonie)', 'Small SWI signal voids; no deep finding (DDx: hypertension)', 'سیگنال‌های کوچک SWI؛ بدون یافته عمقی (DD: فشار خون)')],
      [L('Konvexitäts-SAH (cSAH)', 'Convexity SAH (cSAH)', 'SAH کانوکسیتی (cSAH)'), L('Oberflächliche Subarachnoidalräume über den Konvexitäten', 'Superficial subarachnoid spaces over the convexities', 'فضاهای زیر عنکبوتیه سطحی روی کانوکسیتی‌ها'), L('Frische kortikale SAB; kann TIA-ähnliche Symptome (TFNE) verursachen', 'Fresh cortical SAH; may cause TIA-like symptoms (TFNE)', 'SAB کورتیکال تازه؛ می‌تواند علائم شبیه TIA (TFNE) ایجاد کند')],
      [L('Kortikale superfizielle Siderose (cSS)', 'Cortical superficial siderosis (cSS)', 'سیدروز سطحی کورتیکال (cSS)'), L('Entlang der Rindenfurchen (Sulci)', 'Along sulci (brain grooves)', 'در امتداد شیارهای مغزی'), L('Lineare Hämosiderin-Narben früherer kortikaler Blutungen; klassisches CAA-Bild', 'Linear haemosiderin scars of prior cortical bleeds; classic CAA pattern', 'اسکارهای هموسیدرین خطی خونریزی‌های کورتیکال قبلی؛ تصویر کلاسیک CAA')],
    ],
    klinikAkutTitle: L('Akute Manifestationen', 'Acute Manifestations', 'تظاهرات حاد'),
    klinikAkutItems: [
      {
        icon: '🩸',
        title: L('Lobäre Hirnblutung', 'Lobar intracerebral haemorrhage', 'خونریزی داخل مغزی لوبار'),
        text: L('Wichtigste klinische Präsentation. Schlaganfallähnliche Symptome je nach betroffem Lappen (Hemiplegie, Aphasie, Gesichtsfeldausfall). Keine tiefen Strukturen betroffen.', 'Most important clinical presentation. Stroke-like symptoms depending on affected lobe (hemiplegia, aphasia, visual field loss). No deep structures involved.', 'مهم‌ترین تظاهر بالینی. علائم شبیه سکته بر اساس لوب درگیر (همی‌پلژی، آفازی، اختلال میدان بینایی). ساختارهای عمقی درگیر نیستند.'),
      },
      {
        icon: '⚡',
        title: L('TIA-ähnliche Episoden (TFNE)', 'TIA-like episodes (TFNE)', 'اپیزودهای شبیه TIA (TFNE)'),
        text: L('Transiente fokale neurologische Episoden (TFNE) durch akute Konvexitäts-SAB. Typisch: wandernde Päresthesien über Sekunden bis Minuten — unterscheidet sich von klassischer TIA (Embolie).', 'Transient focal neurological episodes (TFNE) from acute convexity SAH. Typical: spreading paraesthesias over seconds to minutes — differs from classic TIA (embolism).', 'اپیزودهای عصبی کانونی گذرا (TFNE) ناشی از SAB کانوکسیتی حاد. معمول: پارستزی‌های گسترش‌یابنده در طی ثانیه تا دقیقه — با TIA کلاسیک (آمبولی) متفاوت است.'),
      },
    ],
    klinikChronTitle: L('Chronische Manifestationen', 'Chronic Manifestations', 'تظاهرات مزمن'),
    klinikChronItems: [
      {
        icon: '🤕',
        title: L('Kopfschmerzen', 'Headaches', 'سردرد'),
        text: L('Häufig, unspezifisch. Können auf rezidivierende Mikroblutungen oder kortikale Siderose hinweisen.', 'Common, non-specific. May indicate recurrent microbleeds or cortical siderosis.', 'شایع، غیراختصاصی. ممکن است نشانه خونریزی‌های میکرو عود کننده یا سیدروز کورتیکال باشد.'),
      },
      {
        icon: '⚡',
        title: L('Epileptische Anfälle', 'Epileptic seizures', 'تشنج‌های صرعی'),
        text: L('Durch kortikale Reizung infolge Hämosiderinablagerung. Fokale Anfälle je nach Lokalisation der cSS/CMBs.', 'Due to cortical irritation from haemosiderin deposition. Focal seizures depending on cSS/CMB location.', 'به دلیل تحریک کورتیکال ناشی از رسوب هموسیدرین. تشنج‌های کانونی بر اساس محل cSS/CMBs.'),
      },
      {
        icon: '🧠',
        title: L('Demenz (30 %)', 'Dementia (30%)', 'دمانس (۳۰٪)'),
        text: L('In ca. 30 % der CAA-Patienten. Kombination aus vaskulärer Pathologie und oft gleichzeitiger Alzheimer-Erkrankung. Kognitive Störung als Voraussetzung für Boston-Kriterien anerkannt.', 'In approximately 30% of CAA patients. Combination of vascular pathology and frequent coexisting Alzheimer disease. Cognitive impairment recognised as a qualifying criterion for Boston criteria.', 'در حدود ۳۰٪ بیماران CAA. ترکیبی از پاتولوژی عروقی و بیماری آلزهایمر همزمان. اختلال شناختی به عنوان معیار واجد شرایط برای معیارهای Boston شناخته شده است.'),
      },
    ],
    key: L(
      'Merke: cSAH kann TIA-ähnliche wandernde Päresthesien (TFNE) verursachen — durch kortikale Blutreizung statt eines arteriellen Embolus. Bei älteren Patienten ist dieses Muster ein wichtiger Hinweis auf CAA.',
      'Remember: cSAH can cause TIA-like spreading paraesthesias (TFNE) through cortical irritation by blood rather than an arterial embolus. In older patients this pattern is an important clue to CAA.',
      'به یاد بسپار: cSAH می‌تواند به‌علت تحریک قشر توسط خون، پارستزی‌های گسترش‌یابنده شبیه TIA ایجاد کند، نه به‌علت آمبول شریانی. در سالمندان این الگو سرنخ مهمی برای CAA است.'
    ),
  },

  // ── 4. Boston-Kriterien v2.0 ───────────────────────────────────────────────
  boston: {
    title: L('Boston-Kriterien v2.0', 'Boston Criteria v2.0', 'معیارهای Boston v2.0'),
    lead: L(
      'Die Boston-Kriterien v2.0 ermöglichen die klinisch-radiologische Diagnose der CAA ohne Gewebeprobe. Voraussetzung: ≥50 Jahre, passende Klinik, kein alternativer Befund, keine tiefen Blutungen.',
      'The Boston Criteria v2.0 allow clinico-radiological diagnosis of CAA without biopsy. Requirements: ≥50 years, compatible clinical features, no alternative finding, no deep haemorrhages.',
      'معیارهای Boston v2.0 تشخیص بالینی-رادیولوژیک CAA را بدون بیوپسی ممکن می‌کنند. پیش‌نیازها: ≥۵۰ سال، تظاهرات بالینی سازگار، بدون یافته جایگزین، بدون خونریزی عمقی.'
    ),
    criteriaHeaders: [
      L('Kategorie', 'Category', 'دسته'),
      L('MRT-Bedingung', 'MRI condition', 'شرط MRI'),
    ],
    criteriaRows: [
      [L('Probable CAA – Option A', 'Probable CAA – Option A', 'Probable CAA – گزینه A'), L('≥ 2 lobäre hämorrhagische Läsionen (beliebige Kombination)', '≥ 2 lobar haemorrhagic lesions (any combination)', '≥ ۲ ضایعه هموراژیک لوبار (هر ترکیبی)')],
      [L('Probable CAA – Option B', 'Probable CAA – Option B', 'Probable CAA – گزینه B'), L('1 lobäre hämorrhagische Läsion + 1 White-Matter-Marker', '1 lobar haemorrhagic lesion + 1 White Matter marker', '۱ ضایعه هموراژیک لوبار + ۱ نشانگر ماده سفید')],
      [L('Possible CAA – Option A', 'Possible CAA – Option A', 'Possible CAA – گزینه A'), L('1 einzige lobäre hämorrhagische Läsion (ohne WM-Marker)', '1 single lobar haemorrhagic lesion (without WM marker)', '۱ ضایعه هموراژیک لوبار منفرد (بدون نشانگر ماده سفید)')],
      [L('Possible CAA – Option B', 'Possible CAA – Option B', 'Possible CAA – گزینه B'), L('1 White-Matter-Marker (ohne lobäre hämorrhagische Läsion)', '1 White Matter marker (without lobar haemorrhagic lesion)', '۱ نشانگر ماده سفید (بدون ضایعه هموراژیک لوبار)')],
    ],
    voraussTitle: L('Voraussetzungen (alle müssen erfüllt sein)', 'Prerequisites (all must be met)', 'پیش‌نیازها (همه باید برآورده شوند)'),
    voraussItems: [
      {
        icon: '👴',
        title: L('Alter ≥ 50 Jahre', 'Age ≥ 50 years', 'سن ≥ ۵۰ سال'),
        text: L('Altersgrenze für die Boston-Kriterien. Darunter an hereditäre CAA-Varianten denken.', 'Age cut-off for the Boston criteria. Below this, consider hereditary CAA variants.', 'محدوده سنی برای معیارهای Boston. زیر این سن، به انواع ارثی CAA فکر کنید.'),
      },
      {
        icon: '🩺',
        title: L('Passende Klinik', 'Compatible clinical features', 'تظاهرات بالینی سازگار'),
        text: L('Spontane lobäre ICB, transiente fokale neurologische Episoden (TFNE) oder kognitive Störung.', 'Spontaneous lobar ICH, transient focal neurological episodes (TFNE), or cognitive impairment.', 'ICH لوبار خودبخودی، اپیزودهای عصبی کانونی گذرا (TFNE) یا اختلال شناختی.'),
      },
      {
        icon: '🚫',
        title: L('Keine alternative Ursache', 'No alternative cause', 'بدون علت جایگزین'),
        text: L('Keine AVM, kein Tumor, kein Trauma, keine Koagulopathie als Ursache der Blutung.', 'No AVM, tumour, trauma, or coagulopathy as the cause of haemorrhage.', 'بدون AVM، تومور، تروما یا کواگولوپاتی به عنوان علت خونریزی.'),
      },
      {
        icon: '⬇️',
        title: L('Keine tiefen Blutungen', 'No deep haemorrhages', 'بدون خونریزی عمقی'),
        text: L('Keine tiefen CMBs (Basalganglien, Thalamus, Hirnstamm). Kleinhirnläsionen zählen weder als lobär noch als tief → neutral.', 'No deep CMBs (basal ganglia, thalamus, brainstem). Cerebellar lesions count as neither lobar nor deep → neutral.', 'بدون CMBs عمقی (بازال گانگلیا، تالاموس، ساقه مغز). ضایعات مخچه‌ای نه لوبار و نه عمقی محسوب می‌شوند → خنثی.'),
      },
    ],
    key: L(
      'Probable CAA = ≥2 lobäre Hämorrhagien ODER 1 lobäre Hämorrhagie + 1 WM-Marker. Kleinhirnläsionen sind diagnostisch neutral.',
      'Probable CAA = ≥2 lobar haemorrhages OR 1 lobar haemorrhage + 1 WM marker. Cerebellar lesions are diagnostically neutral.',
      'Probable CAA = ≥۲ خونریزی لوبار یا ۱ خونریزی لوبار + ۱ نشانگر ماده سفید. ضایعات مخچه‌ای از نظر تشخیصی خنثی هستند.'
    ),
  },

  // ── 5. MRT-Definitionen ───────────────────────────────────────────────────
  mrtDef: {
    title: L('MRT-Kriterien: Definitionen', 'MRI Criteria: Definitions', 'معیارهای MRI: تعاریف'),
    lead: L(
      'Die Boston-Kriterien v2.0 teilen die MRT-Befunde in zwei Gruppen: strikt lobäre hämorrhagische Läsionen und White-Matter-Marker.',
      'The Boston Criteria v2.0 divide MRI findings into two groups: strictly lobar haemorrhagic lesions and White Matter markers.',
      'معیارهای Boston v2.0 یافته‌های MRI را به دو گروه تقسیم می‌کنند: ضایعات هموراژیک دقیقاً لوبار و نشانگرهای ماده سفید.'
    ),
    lobHeaders: [
      L('Läsionstyp', 'Lesion type', 'نوع ضایعه'),
      L('MRT-Sequenz', 'MRI sequence', 'سکانس MRI'),
      L('Definition', 'Definition', 'تعریف'),
    ],
    lobRows: [
      [L('Lobäre ICH', 'Lobar ICH', 'ICH لوبار'), L('T1, T2, FLAIR, GRE/SWI', 'T1, T2, FLAIR, GRE/SWI', 'T1, T2, FLAIR, GRE/SWI'), L('Blutung im kortikal-subkortikalen Bereich ohne Beteiligung tiefer Strukturen', 'Haemorrhage in the cortical-subcortical region without involvement of deep structures', 'خونریزی در ناحیه کورتیکال-ساب‌کورتیکال بدون درگیری ساختارهای عمقی')],
      [L('Lobäre Mikroblutungen', 'Lobar microbleeds', 'خونریزی‌های میکرو لوبار'), L('SWI / GRE', 'SWI / GRE', 'SWI / GRE'), L('Kleine, punktförmige Signalauslöschungen ausschließlich kortikal/subkortikal verteilt — kein tiefer Befund', 'Small, punctate signal voids distributed exclusively cortically/subcortically — no deep finding', 'سیگنال‌های نقطه‌ای کوچک توزیع‌شده انحصاراً کورتیکال/ساب‌کورتیکال — بدون یافته عمقی')],
      [L('Multiple cSS-Herde', 'Multiple cSS lesions', 'ضایعات متعدد cSS'), L('SWI / GRE', 'SWI / GRE', 'SWI / GRE'), L('Lineare Hämosiderinablagerungen entlang der Rindenfurchen als Narben früherer kortikaler Blutungen — klassisches CAA-Markerbild', 'Linear haemosiderin deposits along sulci as scars of prior cortical bleeds — classic CAA marker pattern', 'رسوبات هموسیدرین خطی در امتداد شیارهای مغزی به عنوان اسکار خونریزی‌های کورتیکال قبلی — تصویر نشانگر کلاسیک CAA')],
      [L('Multiple cSAH-Herde', 'Multiple cSAH lesions', 'ضایعات متعدد cSAH'), L('FLAIR, SWI', 'FLAIR, SWI', 'FLAIR, SWI'), L('Frische, oberflächliche Subarachnoidalblutungen über den Konvexitäten — in FLAIR hyperintens, in SWI hypointens', 'Fresh superficial subarachnoid haemorrhages over the convexities — hyperintense on FLAIR, hypointense on SWI', 'خونریزی‌های زیرعنکبوتیه سطحی تازه روی کانوکسیتی‌ها — هایپرانتنس در FLAIR، هایپوانتنس در SWI')],
    ],
    wmHeaders: [
      L('WM-Marker', 'WM marker', 'نشانگر WM'),
      L('Schwellenwert', 'Threshold', 'آستانه'),
      L('Charakteristikum (CAVE: Unterschied zu HMA)', 'Characteristic (CAVE: difference from HMA)', 'ویژگی (توجه: تفاوت با HMA)'),
    ],
    wmRows: [
      [L('Schwere PVS im Centrum semiovale', 'Severe PVS in centrum semiovale', 'PVS شدید در مرکز نیمه‌بیضی (centrum semiovale)'), L('> 20 PVS in einem Hemisphären-Schnitt', '> 20 PVS in one hemispheric slice', '> ۲۰ PVS در یک برش نیمکره'), L('Massiv erweiterte PVS in CSO-Lokalisation — NICHT basalganglionär wie bei hypertensiver Mikroangiopathie', 'Massively enlarged PVS in CSO location — NOT in basal ganglia as in hypertensive microangiopathy', 'PVS بسیار بزرگ شده در محل CSO — نه در بازال گانگلیا مانند میکروآنژیوپاتی فشار خون بالا')],
      [L('Multispot-WMH-Muster', 'Multispot WMH pattern', 'الگوی WMH چندنقطه‌ای'), L('> 10 subkortikale FLAIR-Dots beidseits', '> 10 subcortical FLAIR dots bilaterally', '> ۱۰ نقطه FLAIR ساب‌کورتیکال در هر دو طرف'), L('Kleine, punktförmige, bilateral verteilte FLAIR-Signalanhebungen — charakteristisches Fleckmuster, nicht konfluierend wie bei klassischer Mikroangiopathie', 'Small, punctate, bilaterally distributed FLAIR hyperintensities — characteristic spotted pattern, not confluent as in classical microangiopathy', 'هایپرانتنسیتی‌های FLAIR کوچک، نقطه‌ای، با توزیع دوطرفه — الگوی لکه‌ای مشخص، نه کانفلوئنت مانند میکروآنژیوپاتی کلاسیک')],
    ],
    key: L(
      'PVS bei CAA: im Centrum semiovale (CSO) — bei HMA in den Basalganglien. Multispot-WMH: punktförmige Flecken (CAA) ≠ konfluierende WMH (HMA/Fazekas).',
      'PVS in CAA: in the centrum semiovale (CSO) — in HMA in the basal ganglia. Multispot WMH: punctate spots (CAA) ≠ confluent WMH (HMA/Fazekas).',
      'در CAA، فضاهای اطراف عروقی (PVS) عمدتاً در مرکز نیمه‌بیضی (CSO) دیده می‌شوند؛ در میکروآنژیوپاتی پرفشاری خون، عقده‌های قاعده‌ای محل تیپیک‌تری هستند. الگوی چندنقطه‌ای WMH بیشتر به نفع CAA است و با WMH به‌هم‌پیوسته در میکروآنژیوپاتی پرفشاری خون تفاوت دارد.'
    ),
  },

  // ── 6. Differenzialdiagnose ───────────────────────────────────────────────
  differenzial: {
    title: L('Differenzialdiagnose', 'Differential Diagnosis', 'تشخیص افتراقی'),
    lead: L(
      'Die entscheidende Abgrenzung der CAA gegenüber der hypertensiven Mikroangiopathie erfolgt über Blutungsmuster + CMB-Lokalisation im SWI.',
      'The decisive distinction of CAA from hypertensive microangiopathy relies on the bleeding pattern and CMB location on SWI.',
      'تمایز قطعی CAA از میکروآنژیوپاتی فشار خون بالا از طریق الگوی خونریزی + محل CMB در SWI انجام می‌شود.'
    ),
    ddHeaders: [
      L('Diagnose', 'Diagnosis', 'تشخیص'),
      L('Blutungslokalisation', 'Haemorrhage location', 'محل خونریزی'),
      L('CMBs in SWI', 'CMBs on SWI', 'CMBs در SWI'),
      L('Schlüsselmerkmal', 'Key feature', 'ویژگی کلیدی'),
    ],
    ddRows: [
      [L('CAA', 'CAA', 'CAA'), L('Lobär (kortikal-subkortikal)', 'Lobar (cortical-subcortical)', 'لوبار (کورتیکال-ساب‌کورتیکال)'), L('Kortikal/subkortikal', 'Cortical/subcortical', 'کورتیکال/ساب‌کورتیکال'), L('Älterer Patient, Boston-Kriterien, TFNE, Alzheimer-Komorbidität', 'Elderly patient, Boston criteria, TFNE, Alzheimer comorbidity', 'بیمار مسن‌تر، معیارهای Boston، TFNE، همراهی آلزهایمر')],
      [L('Hypertensive Mikroangiopathie', 'Hypertensive microangiopathy', 'میکروآنژیوپاتی فشار خون بالا'), L('Tief: Putamen, Thalamus, Pons, Kleinhirn', 'Deep: putamen, thalamus, pons, cerebellum', 'عمقی: پوتامن، تالاموس، پونز، مخچه'), L('Tief (Basalganglien, Thalamus)', 'Deep (basal ganglia, thalamus)', 'عمقی (بازال گانگلیا، تالاموس)'), L('Bekannte Hypertonie, PVS in Basalganglien, konfluierende WMH (Fazekas)', 'Known hypertension, PVS in basal ganglia, confluent WMH (Fazekas)', 'فشار خون شناخته‌شده، PVS در بازال گانگلیا، WMH کانفلوئنت (Fazekas)')],
      [L('AVM-Blutung', 'AVM haemorrhage', 'خونریزی AVM'), L('Variabel, oft lobär', 'Variable, often lobar', 'متغیر، اغلب لوبار'), L('Fehlt / unspezifisch', 'Absent / non-specific', 'غایب / غیراختصاصی'), L('Junger Patient, serpentiginöse Gefäße im MRA/CTA', 'Young patient, serpiginous vessels on MRA/CTA', 'بیمار جوان، عروق مارپیچی در MRA/CTA')],
      [L('Kavernom', 'Cavernoma', 'کاورنوم'), L('Überall, oft Hirnstamm', 'Anywhere, often brainstem', 'همه‌جا، اغلب ساقه مغز'), L('„Popcorn"-Muster, SWI-Halo', '"Popcorn" pattern, SWI halo', 'الگوی «پاپ‌کورن»، هاله SWI'), L('Kein Ödem, kein Enhancement, oft jung, familiär', 'No oedema, no enhancement, often young, familial', "بدون ادم، بدون تقویت پس از تزریق، اغلب جوان، ارثی")],
      [L('Hirnmetastase', 'Brain metastasis', 'متاستاز مغزی'), L('Peripher, kortikal-subkortikal, multipel', 'Peripheral, cortical-subcortical, multiple', 'محیطی، کورتیکال-ساب‌کورتیکال، متعدد'), L('Fehlt / unspezifisch', 'Absent / non-specific', 'غایب / غیراختصاصی'), L('Rund, ausgeprägtes Ödem, KM-Enhancement, Tumoranamnese', 'Round, prominent oedema, contrast enhancement, tumour history', "گرد، ادم شدید، تقویت پس از تزریق، سابقه تومور")],
    ],
    key: L(
      'Schlüssel-DD: CAA (lobär, kortikal-CMBs, alt) vs. Hypertonie (tief, tiefe CMBs, Hypertonieanamnese). Bei beiden kann klinisch Demenz auftreten — CAA eher mit Alzheimer assoziiert.',
      'Key DDx: CAA (lobar, cortical CMBs, elderly) vs. hypertension (deep, deep CMBs, hypertension history). Dementia can occur in both — CAA more often associated with Alzheimer.',
      'تشخیص افتراقی کلیدی: CAA (لوبار، CMBs کورتیکال، مسن) در مقابل فشار خون (عمقی، CMBs عمقی، سابقه فشار خون). دمانس در هر دو می‌تواند رخ دهد — CAA بیشتر با آلزهایمر مرتبط است.'
    ),
  },

  // ── 7. Take-home ──────────────────────────────────────────────────────────
  takehome: {
    title: L('Take-home', 'Take-home', 'جمع‌بندی'),
    lead: L(
      'Die fünf wichtigsten Punkte zur zerebralen Amyloidangiopathie.',
      'The five key points on cerebral amyloid angiopathy.',
      'پنج نکته مهم درباره آنژیوپاتی آمیلوئید مغزی.'
    ),
    items: [
      {
        title: L('β-Amyloid → Kortex-Gefäße', 'β-Amyloid → cortical vessels', 'β-آمیلوئید → عروق کورتکس'),
        text: L('CAA = Ablagerung von β-Amyloid in kortikalen und leptomeningealen Arterien. Betroffen sind ausschließlich oberflächliche Gefäße — keine tiefen Perforatoren wie bei der Hypertonie.', 'CAA = deposition of β-amyloid in cortical and leptomeningeal arteries. Only superficial vessels affected — not deep perforators as in hypertension.', 'CAA = رسوب β-آمیلوئید در شریان‌های کورتیکال و لپتومننژیال. فقط عروق سطحی درگیر می‌شوند — نه پرفوراتورهای عمقی مانند فشار خون.'),
      },
      {
        title: L('4 Blutungstypen — alle lobär', '4 bleeding types — all lobar', '۴ نوع خونریزی — همه لوبار'),
        text: L('Lobäre ICH + lobäre CMBs + cSS (Hämosiderin entlang Sulci) + cSAH (Konvexitäts-SAB). Kein tiefer Befund = typisch für CAA. cSAH → TFNE (wandernde Päresthesien).', 'Lobar ICH + lobar CMBs + cSS (haemosiderin along sulci) + cSAH (convexity SAH). No deep finding = typical for CAA. cSAH → TFNE (spreading paraesthesias).', 'ICH لوبار + CMBs لوبار + cSS (هموسیدرین در امتداد شیارها) + cSAH (SAB کانوکسیتی). بدون یافته عمقی = تیپیک CAA. cSAH → TFNE (پارستزی‌های گسترش‌یابنده).'),
      },
      {
        title: L('Boston v2.0: Probable vs. Possible', 'Boston v2.0: Probable vs. Possible', 'Boston v2.0: Probable CAA در مقابل Possible CAA'),
        text: L('Probable: ≥2 lobäre Hämorrhagien ODER 1 lobäre + 1 WM-Marker. Possible: 1 lobäre ODER 1 WM-Marker allein. Voraussetzung: ≥50 J., keine Tiefbefunde, keine Alternative.', 'Probable: ≥2 lobar haemorrhages OR 1 lobar + 1 WM marker. Possible: 1 lobar OR 1 WM marker alone. Requirement: ≥50 yr, no deep findings, no alternative.', 'Probable CAA: ≥۲ خونریزی لوبار یا ۱ لوبار + ۱ نشانگر WM. Possible CAA: ۱ لوبار یا ۱ نشانگر WM به تنهایی. شرط: ≥۵۰ سال، بدون یافته‌های عمقی، بدون جایگزین.'),
      },
      {
        title: L('WM-Marker: CSO-PVS + Multispot', 'WM markers: CSO-PVS + multispot', 'نشانگرهای WM: CSO-PVS + چندنقطه‌ای'),
        text: L('Schwere PVS (>20) im Centrum semiovale (nicht Basalganglien!) + Multispot-WMH (>10 subkortikale FLAIR-Dots, punktförmig ≠ konfluierend). Beide unterscheiden CAA von HMA.', 'Severe PVS (>20) in the centrum semiovale (not basal ganglia!) + multispot WMH (>10 subcortical FLAIR dots, punctate ≠ confluent). Both distinguish CAA from HMA.', 'PVS شدید (>۲۰) در مرکز نیمه‌بیضی (centrum semiovale) (نه بازال گانگلیا!) + WMH چندنقطه‌ای (>۱۰ نقطه FLAIR ساب‌کورتیکال، نقطه‌ای ≠ کانفلوئنت). هر دو CAA را از HMA تمایز می‌دهند.'),
      },
      {
        title: L('Komorbidität: Alzheimer 85 %', 'Comorbidity: Alzheimer 85%', 'همراهی: آلزهایمر ۸۵٪'),
        text: L('In 85 % der Alzheimer-Fälle besteht gleichzeitig eine CAA. Kognitive Störung + lobäre Blutung bei altem Patient → CAA aktiv mitdenken. Keine spezifische Therapie; Sekundärprophylaxe: Antihypertensiva, Antikoagulation vermeiden.', 'CAA coexists in 85% of Alzheimer cases. Cognitive impairment + lobar haemorrhage in elderly patient → actively consider CAA. No specific therapy; secondary prevention: antihypertensives, avoid anticoagulation.', 'CAA در ۸۵٪ موارد آلزهایمر همزمان وجود دارد. اختلال شناختی + خونریزی لوبار در بیمار مسن → CAA را فعالانه در نظر بگیرید. درمان اختصاصی وجود ندارد؛ پیشگیری ثانویه: ضد فشار خون، اجتناب از ضد انعقاد.'),
      },
    ],
  },
}

// Maintained study bank, reviewed separately from the legacy lesson data above.
export { CAA_QUESTIONS, CAA_FLASHCARDS, CAA_FLASHCARD_TOPIC } from './caaStudyBank.js'
