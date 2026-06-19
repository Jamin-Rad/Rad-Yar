const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })
const F = (id, category, front, answer, explanation) => ({ id, category, front, answer, explanation })

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
      text: L('Probable + Possible CAA', 'Probable + Possible CAA', 'CAA محتمل + ممکن'),
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
      'Merke: cSAH verursacht TIA-ähnliche wandernde Päresthesien (TFNE) — kein echter Embolus, sondern kortikale Blutreizung. Dieses Muster ist praktisch pathognomonisch für CAA.',
      'Remember: cSAH causes TIA-like spreading paraesthesias (TFNE) — not a true embolus, but cortical blood irritation. This pattern is practically pathognomonic for CAA.',
      'به یاد بسپار: cSAH پارستزی‌های گسترش‌یابنده شبیه TIA (TFNE) ایجاد می‌کند — نه آمبول واقعی، بلکه تحریک کورتیکال خون. این الگو تقریباً پاتوگنومونیک CAA است.'
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
      [L('Probable CAA – Option A', 'Probable CAA – Option A', 'CAA محتمل – گزینه A'), L('≥ 2 lobäre hämorrhagische Läsionen (beliebige Kombination)', '≥ 2 lobar haemorrhagic lesions (any combination)', '≥ ۲ ضایعه هموراژیک لوبار (هر ترکیبی)')],
      [L('Probable CAA – Option B', 'Probable CAA – Option B', 'CAA محتمل – گزینه B'), L('1 lobäre hämorrhagische Läsion + 1 White-Matter-Marker', '1 lobar haemorrhagic lesion + 1 White Matter marker', '۱ ضایعه هموراژیک لوبار + ۱ نشانگر ماده سفید')],
      [L('Possible CAA – Option A', 'Possible CAA – Option A', 'CAA ممکن – گزینه A'), L('1 einzige lobäre hämorrhagische Läsion (ohne WM-Marker)', '1 single lobar haemorrhagic lesion (without WM marker)', '۱ ضایعه هموراژیک لوبار منفرد (بدون نشانگر ماده سفید)')],
      [L('Possible CAA – Option B', 'Possible CAA – Option B', 'CAA ممکن – گزینه B'), L('1 White-Matter-Marker (ohne lobäre hämorrhagische Läsion)', '1 White Matter marker (without lobar haemorrhagic lesion)', '۱ نشانگر ماده سفید (بدون ضایعه هموراژیک لوبار)')],
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
      'CAA محتمل = ≥۲ خونریزی لوبار یا ۱ خونریزی لوبار + ۱ نشانگر ماده سفید. ضایعات مخچه‌ای از نظر تشخیصی خنثی هستند.'
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
      [L('Schwere PVS im Centrum semiovale', 'Severe PVS in centrum semiovale', 'PVS شدید در Centrum semiovale'), L('> 20 PVS in einem Hemisphären-Schnitt', '> 20 PVS in one hemispheric slice', '> ۲۰ PVS در یک برش نیمکره'), L('Massiv erweiterte PVS in CSO-Lokalisation — NICHT basalganglionär wie bei hypertensiver Mikroangiopathie', 'Massively enlarged PVS in CSO location — NOT in basal ganglia as in hypertensive microangiopathy', 'PVS بسیار بزرگ شده در محل CSO — نه در بازال گانگلیا مانند میکروآنژیوپاتی فشار خون بالا')],
      [L('Multispot-WMH-Muster', 'Multispot WMH pattern', 'الگوی WMH چندنقطه‌ای'), L('> 10 subkortikale FLAIR-Dots beidseits', '> 10 subcortical FLAIR dots bilaterally', '> ۱۰ نقطه FLAIR ساب‌کورتیکال در هر دو طرف'), L('Kleine, punktförmige, bilateral verteilte FLAIR-Signalanhebungen — charakteristisches Fleckmuster, nicht konfluierend wie bei klassischer Mikroangiopathie', 'Small, punctate, bilaterally distributed FLAIR hyperintensities — characteristic spotted pattern, not confluent as in classical microangiopathy', 'هایپرانتنسیتی‌های FLAIR کوچک، نقطه‌ای، با توزیع دوطرفه — الگوی لکه‌ای مشخص، نه کانفلوئنت مانند میکروآنژیوپاتی کلاسیک')],
    ],
    key: L(
      'PVS bei CAA: im Centrum semiovale (CSO) — bei HMA in den Basalganglien. Multispot-WMH: punktförmige Flecken (CAA) ≠ konfluierende WMH (HMA/Fazekas).',
      'PVS in CAA: in the centrum semiovale (CSO) — in HMA in the basal ganglia. Multispot WMH: punctate spots (CAA) ≠ confluent WMH (HMA/Fazekas).',
      'PVS در CAA: در Centrum semiovale (CSO) — در HMA در بازال گانگلیا. WMH چندنقطه‌ای: نقاط نقطه‌ای (CAA) ≠ WMH کانفلوئنت (HMA/Fazekas).'
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
      [L('Kavernom', 'Cavernoma', 'کاورنوم'), L('Überall, oft Hirnstamm', 'Anywhere, often brainstem', 'همه‌جا، اغلب ساقه مغز'), L('„Popcorn"-Muster, SWI-Halo', '"Popcorn" pattern, SWI halo', 'الگوی «پاپ‌کورن»، هاله SWI'), L('Kein Ödem, kein Enhancement, oft jung, familiär', 'No oedema, no enhancement, often young, familial', 'بدون ادم، بدون انهانسمنت، اغلب جوان، ارثی')],
      [L('Hirnmetastase', 'Brain metastasis', 'متاستاز مغزی'), L('Peripher, kortikal-subkortikal, multipel', 'Peripheral, cortical-subcortical, multiple', 'محیطی، کورتیکال-ساب‌کورتیکال، متعدد'), L('Fehlt / unspezifisch', 'Absent / non-specific', 'غایب / غیراختصاصی'), L('Rund, ausgeprägtes Ödem, KM-Enhancement, Tumoranamnese', 'Round, prominent oedema, contrast enhancement, tumour history', 'گرد، ادم شدید، انهانسمنت کنتراستی، سابقه تومور')],
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
        title: L('Boston v2.0: Probable vs. Possible', 'Boston v2.0: Probable vs. Possible', 'Boston v2.0: محتمل در مقابل ممکن'),
        text: L('Probable: ≥2 lobäre Hämorrhagien ODER 1 lobäre + 1 WM-Marker. Possible: 1 lobäre ODER 1 WM-Marker allein. Voraussetzung: ≥50 J., keine Tiefbefunde, keine Alternative.', 'Probable: ≥2 lobar haemorrhages OR 1 lobar + 1 WM marker. Possible: 1 lobar OR 1 WM marker alone. Requirement: ≥50 yr, no deep findings, no alternative.', 'محتمل: ≥۲ خونریزی لوبار یا ۱ لوبار + ۱ نشانگر WM. ممکن: ۱ لوبار یا ۱ نشانگر WM به تنهایی. شرط: ≥۵۰ سال، بدون یافته‌های عمقی، بدون جایگزین.'),
      },
      {
        title: L('WM-Marker: CSO-PVS + Multispot', 'WM markers: CSO-PVS + multispot', 'نشانگرهای WM: CSO-PVS + چندنقطه‌ای'),
        text: L('Schwere PVS (>20) im Centrum semiovale (nicht Basalganglien!) + Multispot-WMH (>10 subkortikale FLAIR-Dots, punktförmig ≠ konfluierend). Beide unterscheiden CAA von HMA.', 'Severe PVS (>20) in the centrum semiovale (not basal ganglia!) + multispot WMH (>10 subcortical FLAIR dots, punctate ≠ confluent). Both distinguish CAA from HMA.', 'PVS شدید (>۲۰) در Centrum semiovale (نه بازال گانگلیا!) + WMH چندنقطه‌ای (>۱۰ نقطه FLAIR ساب‌کورتیکال، نقطه‌ای ≠ کانفلوئنت). هر دو CAA را از HMA تمایز می‌دهند.'),
      },
      {
        title: L('Komorbidität: Alzheimer 85 %', 'Comorbidity: Alzheimer 85%', 'همراهی: آلزهایمر ۸۵٪'),
        text: L('In 85 % der Alzheimer-Fälle besteht gleichzeitig eine CAA. Kognitive Störung + lobäre Blutung bei altem Patient → CAA aktiv mitdenken. Keine spezifische Therapie; Sekundärprophylaxe: Antihypertensiva, Antikoagulation vermeiden.', 'CAA coexists in 85% of Alzheimer cases. Cognitive impairment + lobar haemorrhage in elderly patient → actively consider CAA. No specific therapy; secondary prevention: antihypertensives, avoid anticoagulation.', 'CAA در ۸۵٪ موارد آلزهایمر همزمان وجود دارد. اختلال شناختی + خونریزی لوبار در بیمار مسن → CAA را فعالانه در نظر بگیرید. درمان اختصاصی وجود ندارد؛ پیشگیری ثانویه: ضد فشار خون، اجتناب از ضد انعقاد.'),
      },
    ],
  },
}

// ─── MCQ Seeds ────────────────────────────────────────────────────────────────

const CAA_QUESTION_SEEDS = [
  Q('caa-01',
    L('Welche Lokalisation der Hirnblutung ist typisch für die zerebrale Amyloidangiopathie (CAA)?',
      'Which location of intracerebral haemorrhage is typical for cerebral amyloid angiopathy (CAA)?',
      'کدام محل خونریزی داخل مغزی برای آنژیوپاتی آمیلوئید مغزی (CAA) تیپیک است؟'),
    [
      L('Lobär (kortikal-subkortikal)', 'Lobar (cortical-subcortical)', 'لوبار (کورتیکال-ساب‌کورتیکال)'),
      L('Putamen / Basalganglien', 'Putamen / basal ganglia', 'پوتامن / بازال گانگلیا'),
      L('Thalamus', 'Thalamus', 'تالاموس'),
      L('Pons', 'Pons', 'پونز'),
    ], 0,
    L('CAA betrifft ausschließlich kortikale und leptomeningeale Gefäße → lobäre Blutungen. Tiefe Strukturen (Putamen, Thalamus, Pons) sind typisch für die hypertensive Mikroangiopathie. Diese Unterscheidung ist der wichtigste klinisch-radiologische DD-Schritt.',
      'CAA affects exclusively cortical and leptomeningeal vessels → lobar haemorrhages. Deep structures (putamen, thalamus, pons) are typical of hypertensive microangiopathy. This distinction is the most important clinico-radiological DDx step.',
      'CAA انحصاراً عروق کورتیکال و لپتومننژیال را درگیر می‌کند → خونریزی‌های لوبار. ساختارهای عمقی (پوتامن، تالاموس، پونز) مشخصه میکروآنژیوپاتی فشار خون بالا هستند. این تمایز مهم‌ترین مرحله تشخیص افتراقی بالینی-رادیولوژیک است.')
  ),

  Q('caa-02',
    L('Was sind die Bedingungen für eine Probable CAA nach den Boston-Kriterien v2.0?',
      'What are the conditions for Probable CAA according to the Boston Criteria v2.0?',
      'شرایط برای CAA محتمل بر اساس معیارهای Boston v2.0 چیست؟'),
    [
      L('≥ 2 lobäre hämorrhagische Läsionen ODER 1 lobäre Läsion + 1 WM-Marker', '≥ 2 lobar haemorrhagic lesions OR 1 lobar lesion + 1 WM marker', '≥ ۲ ضایعه هموراژیک لوبار یا ۱ ضایعه لوبار + ۱ نشانگر WM'),
      L('≥ 1 lobäre Läsion ohne weitere Bedingungen', '≥ 1 lobar lesion without further conditions', '≥ ۱ ضایعه لوبار بدون شرایط بیشتر'),
      L('Histologischer Nachweis von β-Amyloid in der Gefäßwand', 'Histological evidence of β-amyloid in the vessel wall', 'شواهد هیستولوژیک β-آمیلوئید در دیواره عروقی'),
      L('Nur tiefe CMBs im SWI', 'Only deep CMBs on SWI', 'فقط CMBs عمقی در SWI'),
    ], 0,
    L('Boston v2.0 Probable CAA: Option A = ≥2 lobäre hämorrhagische Läsionen (beliebige Kombination); Option B = 1 lobäre Läsion + 1 White-Matter-Marker. Voraussetzungen: ≥50 Jahre, passende Klinik, keine alternative Ursache, keine tiefen Blutungen.',
      'Boston v2.0 Probable CAA: Option A = ≥2 lobar haemorrhagic lesions (any combination); Option B = 1 lobar lesion + 1 White Matter marker. Requirements: ≥50 years, compatible clinical features, no alternative cause, no deep haemorrhages.',
      'Boston v2.0 CAA محتمل: گزینه A = ≥۲ ضایعه هموراژیک لوبار (هر ترکیبی)؛ گزینه B = ۱ ضایعه لوبار + ۱ نشانگر ماده سفید. پیش‌نیازها: ≥۵۰ سال، تظاهرات بالینی سازگار، بدون علت جایگزین، بدون خونریزی عمقی.')
  ),

  Q('caa-03',
    L('Was ist cortical superficial siderosis (cSS) und welche Bedeutung hat sie für die CAA-Diagnose?',
      'What is cortical superficial siderosis (cSS) and what is its significance for the CAA diagnosis?',
      'سیدروز سطحی کورتیکال (cSS) چیست و اهمیت آن برای تشخیص CAA چیست؟'),
    [
      L('Lineare Hämosiderinablagerungen entlang der Rindenfurchen als Narben früherer kortikaler Blutungen — klassisches CAA-Bild', 'Linear haemosiderin deposits along sulci as scars of prior cortical bleeds — classic CAA pattern', 'رسوبات هموسیدرین خطی در امتداد شیارهای مغزی به عنوان اسکار خونریزی‌های کورتیکال قبلی — تصویر کلاسیک CAA'),
      L('Globale Hämosiderinablagerung im gesamten Subarachnoidalraum', 'Global haemosiderin deposition throughout the subarachnoid space', 'رسوب هموسیدرین کلی در کل فضای زیرعنکبوتیه'),
      L('Thalamus-Siderose durch hypertensive Blutung', 'Thalamic siderosis from hypertensive haemorrhage', 'سیدروز تالاموس ناشی از خونریزی فشار خون بالا'),
      L('Zufallsbefund ohne klinische Bedeutung', 'Incidental finding without clinical significance', 'یافته اتفاقی بدون اهمیت بالینی'),
    ], 0,
    L('cSS zeigt sich als lineare SWI/GRE-Hypointensitäten entlang der kortikalen Oberfläche (Sulci). Entstehung: früherer kortikaler Einblutungen hinterlassen Hämosiderin-Narben. cSS zählt als strikt lobäre hämorrhagische Läsion in den Boston-Kriterien v2.0.',
      'cSS appears as linear SWI/GRE hypointensities along the cortical surface (sulci). Origin: prior cortical bleeds leave haemosiderin scars. cSS counts as a strictly lobar haemorrhagic lesion in the Boston Criteria v2.0.',
      'cSS به صورت هایپوانتنسیتی‌های خطی SWI/GRE در امتداد سطح کورتیکال (شیارها) ظاهر می‌شود. منشأ: خونریزی‌های کورتیکال قبلی اسکارهای هموسیدرین باقی می‌گذارند. cSS در معیارهای Boston v2.0 به عنوان ضایعه هموراژیک دقیقاً لوبار محسوب می‌شود.')
  ),

  Q('caa-04',
    L('Ein 72-jähriger Patient berichtet über wiederkehrende, sich über Sekunden ausbreitende Kribbelsensationen im Arm. Welche CAA-Manifestation ist die wahrscheinlichste Ursache?',
      'A 72-year-old patient reports recurrent tingling sensations spreading over seconds up the arm. Which CAA manifestation is the most likely cause?',
      'یک بیمار ۷۲ ساله از پارستزی‌های مکرر که در طی ثانیه‌ها به سمت بالا در بازو گسترش می‌یابد گزارش می‌دهد. کدام تظاهر CAA احتمالاً علت است؟'),
    [
      L('Konvexitäts-Subarachnoidalblutung (cSAH) mit TFNE', 'Convexity subarachnoid haemorrhage (cSAH) with TFNE', 'خونریزی زیرعنکبوتیه کانوکسیتی (cSAH) با TFNE'),
      L('Klassische TIA durch arterielle Embolie', 'Classic TIA from arterial embolism', 'TIA کلاسیک ناشی از آمبولی شریانی'),
      L('Epileptischer Anfall durch Hirnmetastase', 'Epileptic seizure from brain metastasis', 'تشنج صرعی از متاستاز مغزی'),
      L('Lakunärer Infarkt im Thalamus', 'Lacunar infarct in the thalamus', 'انفارکت لاکونار در تالاموس'),
    ], 0,
    L('Akute Konvexitäts-SAB (cSAH) bei CAA verursacht transiente fokale neurologische Episoden (TFNE): charakteristisch sind sich ausbreitende (marchende) Päresthesien über Sekunden bis Minuten. Unterschied zur klassischen TIA: TFNE breitet sich aus (kortikale Reizung), TIA durch Embolie ist sofort maximal.',
      'Acute convexity SAH (cSAH) in CAA causes transient focal neurological episodes (TFNE): characteristically spreading (marching) paraesthesias over seconds to minutes. Differs from classic TIA: TFNE spreads (cortical irritation); TIA from embolism is maximal immediately.',
      'SAB کانوکسیتی حاد (cSAH) در CAA اپیزودهای عصبی کانونی گذرا (TFNE) ایجاد می‌کند: پارستزی‌های گسترش‌یابنده (مارشینگ) در طی ثانیه تا دقیقه مشخصه هستند. تفاوت با TIA کلاسیک: TFNE گسترش می‌یابد (تحریک کورتیکال)؛ TIA از آمبولی بلافاصله حداکثر است.')
  ),

  Q('caa-05',
    L('Wo befinden sich die erweiterten perivaskulären Räume (PVS) als White-Matter-Marker bei CAA — und wo bei hypertensiver Mikroangiopathie?',
      'Where are the enlarged perivascular spaces (PVS) as a White Matter marker in CAA — and where in hypertensive microangiopathy?',
      'فضاهای پریواسکولار بزرگ‌شده (PVS) به عنوان نشانگر ماده سفید در CAA کجا هستند — و در میکروآنژیوپاتی فشار خون کجا؟'),
    [
      L('CAA: Centrum semiovale (CSO) — HMA: Basalganglien', 'CAA: centrum semiovale (CSO) — HMA: basal ganglia', 'CAA: Centrum semiovale (CSO) — HMA: بازال گانگلیا'),
      L('CAA: Basalganglien — HMA: Centrum semiovale', 'CAA: basal ganglia — HMA: centrum semiovale', 'CAA: بازال گانگلیا — HMA: Centrum semiovale'),
      L('Beide in den Basalganglien', 'Both in the basal ganglia', 'هر دو در بازال گانگلیا'),
      L('Beide im Centrum semiovale', 'Both in the centrum semiovale', 'هر دو در Centrum semiovale'),
    ], 0,
    L('Schwere PVS im Centrum semiovale (CSO, >20 pro Hemisphärenschnitt) sind White-Matter-Marker der CAA. Bei hypertensiver Mikroangiopathie entstehen erweiterte PVS dagegen bevorzugt in den Basalganglien. Diese Unterscheidung ist klinisch wichtig!',
      'Severe PVS in the centrum semiovale (CSO, >20 per hemispheric slice) are a White Matter marker of CAA. In hypertensive microangiopathy, enlarged PVS occur preferentially in the basal ganglia. This distinction is clinically important!',
      'PVS شدید در Centrum semiovale (CSO، >۲۰ در هر برش نیمکره) نشانگر ماده سفید CAA هستند. در میکروآنژیوپاتی فشار خون بالا، PVS بزرگ‌شده ترجیحاً در بازال گانگلیا رخ می‌دهند. این تمایز از نظر بالینی مهم است!')
  ),

  Q('caa-06',
    L('Welche Erkrankung ist in ca. 85 % der Fälle mit CAA assoziiert?',
      'Which disease is associated with CAA in approximately 85% of cases?',
      'کدام بیماری در حدود ۸۵٪ موارد با CAA مرتبط است؟'),
    [
      L('Morbus Alzheimer', "Alzheimer's disease", 'بیماری آلزهایمر'),
      L('Diabetes mellitus Typ 2', 'Type 2 diabetes mellitus', 'دیابت ملیتوس نوع ۲'),
      L('Parkinson-Erkrankung', "Parkinson's disease", 'بیماری پارکینسون'),
      L('Multiple Sklerose', 'Multiple sclerosis', 'مولتیپل اسکلروزیس'),
    ], 0,
    L('β-Amyloid ist das Schlüsselprotein beider Erkrankungen: Bei Alzheimer als parenchymale Plaques, bei CAA in der Gefäßwand. ~85 % aller Alzheimer-Fälle haben histologisch nachweisbare CAA. Klinisch wichtig: kognitiver Abbau bei lobärer Blutung → CAA + Alzheimer als gemeinsame Pathologie erwägen.',
      'β-amyloid is the key protein in both diseases: in Alzheimer as parenchymal plaques, in CAA in the vessel wall. ~85% of all Alzheimer cases have histologically detectable CAA. Clinically important: cognitive decline with lobar haemorrhage → consider CAA + Alzheimer as shared pathology.',
      'β-آمیلوئید پروتئین کلیدی هر دو بیماری است: در آلزهایمر به صورت پلاک‌های پارانشیمی، در CAA در دیواره عروقی. ~۸۵٪ تمام موارد آلزهایمر CAA قابل تشخیص هیستولوژیک دارند. مهم بالینی: کاهش شناختی با خونریزی لوبار → CAA + آلزهایمر را به عنوان پاتولوژی مشترک در نظر بگیرید.')
  ),

  Q('caa-07',
    L('Was beschreibt das Multispot-WMH-Muster als White-Matter-Marker der CAA?',
      'What does the multispot WMH pattern describe as a White Matter marker of CAA?',
      'الگوی WMH چندنقطه‌ای (Multispot) به عنوان نشانگر ماده سفید CAA چه چیزی را توصیف می‌کند؟'),
    [
      L('> 10 kleine, punktförmige, bilateral verteilte FLAIR-Signalanhebungen im subkortikalen Marklager — kein konfluierendes Muster', '> 10 small, punctate, bilaterally distributed FLAIR hyperintensities in the subcortical white matter — not confluent', '> ۱۰ هایپرانتنسیتی FLAIR کوچک، نقطه‌ای، با توزیع دوطرفه در ماده سفید ساب‌کورتیکال — غیرکانفلوئنت'),
      L('Ausgedehnte, konfluierende periventrikuläre WMH beidseits (Fazekas 3)', 'Extensive, confluent periventricular WMH bilaterally (Fazekas 3)', 'WMH پریونتریکولار وسیع، کانفلوئنت، دوطرفه (Fazekas 3)'),
      L('Einzelne WMH > 2 cm im Frontallappen', 'Single WMH > 2 cm in the frontal lobe', 'WMH منفرد > ۲ سانتی‌متر در لوب فرونتال'),
      L('Tiefe Marklager-WMH in den Basalganglien', 'Deep white matter WMH in the basal ganglia', 'WMH ماده سفید عمقی در بازال گانگلیا'),
    ], 0,
    L('Multispot-WMH ist ein CAA-spezifisches Muster: >10 punktförmige, bilateral verteilte FLAIR-Hyperintensitäten im subkortikalen Marklager. Wichtig: NICHT konfluierend (≠ klassische Mikroangiopathie/Fazekas). Dieses „Fleckmuster" unterscheidet CAA von hypertensiver WMH.',
      'Multispot WMH is a CAA-specific pattern: >10 punctate, bilaterally distributed FLAIR hyperintensities in the subcortical white matter. Important: NOT confluent (≠ classical microangiopathy/Fazekas). This "spotted pattern" distinguishes CAA from hypertensive WMH.',
      'WMH چندنقطه‌ای الگویی اختصاصی CAA است: >۱۰ هایپرانتنسیتی FLAIR نقطه‌ای، با توزیع دوطرفه در ماده سفید ساب‌کورتیکال. مهم: نه کانفلوئنت (≠ میکروآنژیوپاتی کلاسیک/Fazekas). این «الگوی لکه‌ای» CAA را از WMH فشار خون بالا متمایز می‌کند.')
  ),

  Q('caa-08',
    L('Welche Altersgrenze gilt für die Anwendung der Boston-Kriterien v2.0 bei CAA?',
      'What age threshold applies to the use of the Boston Criteria v2.0 for CAA?',
      'کدام محدوده سنی برای استفاده از معیارهای Boston v2.0 در CAA اعمال می‌شود؟'),
    [
      L('≥ 50 Jahre', '≥ 50 years', '≥ ۵۰ سال'),
      L('≥ 60 Jahre', '≥ 60 years', '≥ ۶۰ سال'),
      L('≥ 40 Jahre', '≥ 40 years', '≥ ۴۰ سال'),
      L('≥ 70 Jahre', '≥ 70 years', '≥ ۷۰ سال'),
    ], 0,
    L('Die Boston-Kriterien v2.0 setzen ein Mindestalter von ≥50 Jahren voraus. Unterhalb dieser Grenze muss an hereditäre CAA-Varianten gedacht werden (z. B. Dutch-type mit APP-Mutation). Die sporadische Form tritt typischerweise bei > 60 Jahren auf.',
      'The Boston Criteria v2.0 require a minimum age of ≥50 years. Below this threshold, hereditary CAA variants must be considered (e.g. Dutch type with APP mutation). The sporadic form typically occurs in patients > 60 years.',
      'معیارهای Boston v2.0 حداقل سن ≥۵۰ سال را مستلزم می‌دانند. زیر این آستانه، باید به انواع ارثی CAA فکر کرد (مثلاً Dutch-type با جهش APP). فرم اسپورادیک معمولاً در بیماران > ۶۰ سال رخ می‌دهد.')
  ),
]

export const CAA_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, CAA_QUESTION_SEEDS.map(seed => ({
  id: `caa-${lang}-${seed.id}`,
  tags: ['caa', 'zerebrale-amyloidangiopathie', 'gehirn'],
  fach: 'gehirn',
  question: seed.question[lang],
  options: seed.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
  correct: String.fromCharCode(65 + seed.correct),
  explanation: seed.explanation[lang],
}))]))

// ─── Flashcard Seeds ──────────────────────────────────────────────────────────

const CAA_FLASH_SEEDS = [
  F('def', L('Grundlagen', 'Basics', 'اساسیات'),
    L('Was ist die zerebrale Amyloidangiopathie (CAA)?', 'What is cerebral amyloid angiopathy (CAA)?', 'آنژیوپاتی آمیلوئید مغزی (CAA) چیست؟'),
    L('Ablagerung von β-Amyloid in den Wänden kortikaler und leptomeningealer Arterien/Arteriolen → Wandschwächung → lobäre Blutungskomplikationen. Häufigste Ursache lobärer ICB im Alter (15–20 % aller spontanen ICBs >60 J.)', 'β-amyloid deposition in walls of cortical and leptomeningeal arteries/arterioles → wall weakening → lobar haemorrhagic complications. Most common cause of lobar ICH in the elderly (15–20% of all spontaneous ICH >60 yr)', 'رسوب β-آمیلوئید در دیواره شریان‌ها/آرتریول‌های کورتیکال و لپتومننژیال → تضعیف دیواره → عوارض خونریزی لوبار. شایع‌ترین علت ICH لوبار در سالمندی (۱۵–۲۰٪ تمام ICH‌های خودبخودی >۶۰ سال)'),
    L('β-Amyloid → Kortex-Gefäße → lobäre Blutung', 'β-amyloid → cortical vessels → lobar haemorrhage', 'β-آمیلوئید → عروق کورتکس → خونریزی لوبار')
  ),

  F('vier-typen', L('Lokalisation', 'Location', 'محل'),
    L('4 charakteristische Blutungstypen der CAA — alle strikt lobär', '4 characteristic bleeding types in CAA — all strictly lobar', '۴ نوع خونریزی مشخص CAA — همه دقیقاً لوبار'),
    L('1. Lobäre ICH (kortikal-subkortikal)\n2. Lobäre Mikroblutungen (SWI: kortikale Hypointensitäten)\n3. cSS – cortical superficial siderosis (lineare SWI-Narben entlang Sulci)\n4. cSAH – Konvexitäts-SAB (FLAIR hyperintens, SWI hypointens)\nKeine tiefen Strukturen!', '1. Lobar ICH (cortical-subcortical)\n2. Lobar microbleeds (SWI: cortical hypointensities)\n3. cSS – cortical superficial siderosis (linear SWI scars along sulci)\n4. cSAH – convexity SAH (FLAIR hyperintense, SWI hypointense)\nNo deep structures!', '۱. ICH لوبار (کورتیکال-ساب‌کورتیکال)\n۲. خونریزی‌های میکرو لوبار (SWI: هایپوانتنسیتی‌های کورتیکال)\n۳. cSS – سیدروز سطحی کورتیکال (اسکارهای خطی SWI در امتداد شیارها)\n۴. cSAH – SAB کانوکسیتی (هایپرانتنس FLAIR، هایپوانتنس SWI)\nبدون ساختارهای عمقی!'),
    L('ICH + CMBs + cSS + cSAH — alle lobär, nie tief', 'ICH + CMBs + cSS + cSAH — all lobar, never deep', 'ICH + CMBs + cSS + cSAH — همه لوبار، هرگز عمقی')
  ),

  F('tfne', L('Klinik', 'Clinical', 'کلینیک'),
    L('Was sind TFNE und wie entstehen sie bei CAA?', 'What are TFNE and how do they arise in CAA?', 'TFNE چیست و چگونه در CAA ایجاد می‌شود؟'),
    L('Transient Focal Neurological Episodes (TFNE):\n→ Ursache: akute Konvexitäts-SAB (cSAH)\n→ Symptome: sich ausbreitende (marchende) Päresthesien über Sekunden bis Minuten\n→ DD zu klassischer TIA: TFNE breitet sich aus (kortikale Reizung); TIA ist sofort maximal\nPraktisch pathognomonisch für CAA!', 'Transient Focal Neurological Episodes (TFNE):\n→ Cause: acute convexity SAH (cSAH)\n→ Symptoms: spreading (marching) paraesthesias over seconds to minutes\n→ DDx classic TIA: TFNE spreads (cortical irritation); TIA is maximal immediately\nPractically pathognomonic for CAA!', 'اپیزودهای عصبی کانونی گذرا (TFNE):\n→ علت: SAB کانوکسیتی حاد (cSAH)\n→ علائم: پارستزی‌های گسترش‌یابنده در طی ثانیه تا دقیقه\n→ تشخیص افتراقی TIA کلاسیک: TFNE گسترش می‌یابد (تحریک کورتیکال)؛ TIA بلافاصله حداکثر است\nتقریباً پاتوگنومونیک CAA!'),
    L('TFNE = marchende Päresthesien = cSAH = CAA', 'TFNE = marching paraesthesias = cSAH = CAA', 'TFNE = پارستزی مارشینگ = cSAH = CAA')
  ),

  F('boston-v2', L('Boston-Kriterien', 'Boston Criteria', 'معیارهای Boston'),
    L('Boston-Kriterien v2.0: Probable vs. Possible CAA', 'Boston Criteria v2.0: Probable vs. Possible CAA', 'معیارهای Boston v2.0: CAA محتمل در مقابل ممکن'),
    L('Probable CAA:\nA) ≥2 lobäre hämorrhagische Läsionen (beliebige Komb.)\nB) 1 lobäre Läsion + 1 WM-Marker\n\nPossible CAA:\nA) 1 einzige lobäre Läsion\nB) 1 WM-Marker allein\n\nVoraussetzung alle: ≥50 J., passende Klinik, keine tiefen Blutungen, keine Alternative', 'Probable CAA:\nA) ≥2 lobar haemorrhagic lesions (any combination)\nB) 1 lobar lesion + 1 WM marker\n\nPossible CAA:\nA) 1 single lobar lesion\nB) 1 WM marker alone\n\nRequired for all: ≥50 yr, compatible clinical, no deep haemorrhages, no alternative', 'CAA محتمل:\nA) ≥۲ ضایعه هموراژیک لوبار (هر ترکیبی)\nB) ۱ ضایعه لوبار + ۱ نشانگر WM\n\nCAA ممکن:\nA) ۱ ضایعه لوبار منفرد\nB) ۱ نشانگر WM به تنهایی\n\nشرط همه: ≥۵۰ سال، کلینیک سازگار، بدون خونریزی عمقی، بدون جایگزین'),
    L('Probable: ≥2 lobär ODER 1 lobär + 1 WM-Marker', 'Probable: ≥2 lobar OR 1 lobar + 1 WM marker', 'محتمل: ≥۲ لوبار یا ۱ لوبار + ۱ نشانگر WM')
  ),

  F('wm-marker', L('WM-Marker', 'WM Markers', 'نشانگرهای WM'),
    L('White-Matter-Marker der CAA: Welche zwei und was unterscheidet sie von HMA?', 'White Matter markers of CAA: which two and what distinguishes them from HMA?', 'نشانگرهای ماده سفید CAA: کدام دو و چه چیزی آن‌ها را از HMA متمایز می‌کند؟'),
    L('1. Schwere PVS im Centrum semiovale (CSO): >20 PVS pro Hemisphärenschnitt\n   → Bei HMA: PVS in Basalganglien!\n\n2. Multispot-WMH: >10 subkortikale FLAIR-Dots beidseits\n   → punktförmig, nicht konfluierend\n   → Bei HMA: konfluierende WMH (Fazekas)', '1. Severe PVS in centrum semiovale (CSO): >20 PVS per hemispheric slice\n   → In HMA: PVS in basal ganglia!\n\n2. Multispot WMH: >10 subcortical FLAIR dots bilaterally\n   → punctate, not confluent\n   → In HMA: confluent WMH (Fazekas)', '۱. PVS شدید در Centrum semiovale (CSO): >۲۰ PVS در هر برش نیمکره\n   → در HMA: PVS در بازال گانگلیا!\n\n۲. WMH چندنقطه‌ای: >۱۰ نقطه FLAIR ساب‌کورتیکال در هر دو طرف\n   → نقطه‌ای، نه کانفلوئنت\n   → در HMA: WMH کانفلوئنت (Fazekas)'),
    L('CSO-PVS (≠ BG) + Multispot (≠ konfluierend)', 'CSO-PVS (≠ BG) + multispot (≠ confluent)', 'CSO-PVS (≠ BG) + چندنقطه‌ای (≠ کانفلوئنت)')
  ),

  F('dd-hma', L('Differenzialdiagnose', 'Differential', 'تشخیص افتراقی'),
    L('DD CAA vs. hypertensive Mikroangiopathie — wichtigste Unterscheidungsmerkmale', 'DDx CAA vs. hypertensive microangiopathy — most important distinguishing features', 'تشخیص افتراقی CAA در مقابل میکروآنژیوپاتی فشار خون بالا — مهم‌ترین ویژگی‌های تمایز'),
    L('CAA:\n→ Blutungslokalisation: lobär (kortex-subkortikal)\n→ CMBs in SWI: kortikal/subkortikal\n→ PVS: Centrum semiovale\n→ WMH: punktförmig (Multispot)\n→ Patient: alt, Alzheimer-Komorbidität\n\nHMA:\n→ Blutungslokalisation: tief (Putamen, Thalamus, Pons)\n→ CMBs in SWI: tief (Basalganglien)\n→ PVS: Basalganglien\n→ WMH: konfluierend (Fazekas)\n→ Patient: Hypertonieanamnese', 'CAA:\n→ Haemorrhage: lobar (cortical-subcortical)\n→ CMBs on SWI: cortical/subcortical\n→ PVS: centrum semiovale\n→ WMH: punctate (multispot)\n→ Patient: elderly, Alzheimer comorbidity\n\nHMA:\n→ Haemorrhage: deep (putamen, thalamus, pons)\n→ CMBs on SWI: deep (basal ganglia)\n→ PVS: basal ganglia\n→ WMH: confluent (Fazekas)\n→ Patient: hypertension history', 'CAA:\n→ خونریزی: لوبار (کورتیکال-ساب‌کورتیکال)\n→ CMBs در SWI: کورتیکال/ساب‌کورتیکال\n→ PVS: Centrum semiovale\n→ WMH: نقطه‌ای (Multispot)\n→ بیمار: مسن، همراهی آلزهایمر\n\nHMA:\n→ خونریزی: عمقی (پوتامن، تالاموس، پونز)\n→ CMBs در SWI: عمقی (بازال گانگلیا)\n→ PVS: بازال گانگلیا\n→ WMH: کانفلوئنت (Fazekas)\n→ بیمار: سابقه فشار خون'),
    L('CAA: lobär + CSO-PVS + Multispot | HMA: tief + BG-PVS + Fazekas', 'CAA: lobar + CSO-PVS + multispot | HMA: deep + BG-PVS + Fazekas', 'CAA: لوبار + CSO-PVS + Multispot | HMA: عمقی + BG-PVS + Fazekas')
  ),

  F('kleinhirn', L('Boston-Kriterien', 'Boston Criteria', 'معیارهای Boston'),
    L('Wie werden Kleinhirnläsionen in den Boston-Kriterien v2.0 gewertet?', 'How are cerebellar lesions classified in the Boston Criteria v2.0?', 'ضایعات مخچه در معیارهای Boston v2.0 چگونه ارزیابی می‌شوند؟'),
    L('Kleinhirnläsionen = NEUTRAL\n→ Zählen WEDER als lobäre hämorrhagische Läsion\n→ NOCH als tiefe Blutung\n→ Werden für die Kategorisierung (Probable/Possible) nicht verwendet\n\nNur lobäre (kortikal-subkortikal) und tiefe Läsionen zählen.', 'Cerebellar lesions = NEUTRAL\n→ Count NEITHER as lobar haemorrhagic lesion\n→ NOR as deep haemorrhage\n→ Not used for categorisation (Probable/Possible)\n\nOnly lobar (cortical-subcortical) and deep lesions count.', 'ضایعات مخچه = خنثی\n→ نه به عنوان ضایعه هموراژیک لوبار محسوب می‌شوند\n→ نه به عنوان خونریزی عمقی\n→ برای دسته‌بندی (محتمل/ممکن) استفاده نمی‌شوند\n\nفقط ضایعات لوبار (کورتیکال-ساب‌کورتیکال) و عمقی محاسبه می‌شوند.'),
    L('Kleinhirn = neutral (weder lobär noch tief)', 'Cerebellum = neutral (neither lobar nor deep)', 'مخچه = خنثی (نه لوبار نه عمقی)')
  ),

  F('alzheimer', L('Epidemiologie', 'Epidemiology', 'اپیدمیولوژی'),
    L('CAA + Alzheimer: Wie hängen beide zusammen und was ist das klinische Implikat?', 'CAA + Alzheimer: how are they linked and what is the clinical implication?', 'CAA + آلزهایمر: چه ارتباطی دارند و پیامد بالینی چیست؟'),
    L('Gemeinsame Pathologie: β-Amyloid\n• Alzheimer: parenchymale Amyloid-Plaques (Aβ im Hirngewebe)\n• CAA: β-Amyloid in der Gefäßwand\n\nEpidemiologie: ~85 % der Alzheimer-Fälle haben CAA\n\nKlinisch:\n→ Kognitive Störung + lobäre Blutung bei altem Patient\n→ Antikoagulation vorsichtig! (Rezidivblutungsrisiko ↑↑)\n→ Anti-Amyloid-Antikörper (ARIA!) neu beachten', 'Shared pathology: β-amyloid\n• Alzheimer: parenchymal amyloid plaques (Aβ in brain tissue)\n• CAA: β-amyloid in vessel wall\n\nEpidemiology: ~85% of Alzheimer cases have CAA\n\nClinically:\n→ Cognitive impairment + lobar haemorrhage in elderly patient\n→ Anticoagulation cautiously! (recurrent bleed risk ↑↑)\n→ Anti-amyloid antibodies (ARIA!) newly relevant', 'پاتولوژی مشترک: β-آمیلوئید\n• آلزهایمر: پلاک‌های آمیلوئید پارانشیمی (Aβ در بافت مغز)\n• CAA: β-آمیلوئید در دیواره عروقی\n\nاپیدمیولوژی: ~۸۵٪ موارد آلزهایمر CAA دارند\n\nبالینی:\n→ اختلال شناختی + خونریزی لوبار در بیمار مسن\n→ ضد انعقاد با احتیاط! (خطر خونریزی مجدد ↑↑)\n→ آنتی‌بادی‌های ضد آمیلوئید (ARIA!) تازه مرتبط'),
    L('Alzheimer 85 % = gleiche Aβ-Pathologie; Antikoagulation↑↑Risiko', 'Alzheimer 85% = same Aβ pathology; anticoagulation ↑↑ risk', 'آلزهایمر ۸۵٪ = پاتولوژی Aβ یکسان؛ ضد انعقاد ↑↑ خطر')
  ),
]

export const CAA_FLASHCARDS = CAA_FLASH_SEEDS.map((item, index) => ({
  id: `caa-${String(index + 1).padStart(2, '0')}-${item.id}`,
  topicId: 'caa',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
}))

export const CAA_FLASHCARD_TOPIC = {
  id: 'caa',
  title: { de: 'Zerebrale Amyloidangiopathie', en: 'Cerebral Amyloid Angiopathy', fa: 'آنژیوپاتی آمیلوئید مغزی' },
  color: '#7c3aed',
  icon: '🫧',
  description: {
    de: 'Boston-Kriterien v2.0 · lobäre ICB · cSS · cSAH · WM-Marker · Alzheimer-Assoziation',
    en: 'Boston Criteria v2.0 · lobar ICH · cSS · cSAH · WM markers · Alzheimer association',
    fa: 'معیارهای Boston v2.0 · ICH لوبار · cSS · cSAH · نشانگرهای WM · همراهی آلزهایمر',
  },
}
