// ── Moya-Moya ─────────────────────────────────────────────────────────────────
// Lesson · MCQs · Flashcards

const L = (de, en, fa) => ({ de, en, fa })

// ── LESSON ────────────────────────────────────────────────────────────────────

export const MOYAMOYA_LESSON = {
  toc:       L('Inhaltsverzeichnis', 'Contents', 'فهرست مطالب'),
  title:     L('Moya-Moya', 'Moyamoya Disease', 'بیماری Moya-Moya'),
  subtitle:  L(
    'Progressive ICA-Okklusion, Kollateralbildung und multimodale Gefäßdiagnostik',
    'Progressive ICA occlusion, collateral formation and multimodal vascular imaging',
    'انسداد پیشرونده ICA، تشکیل کولاترال و تصویربرداری عروقی چندوجهی',
  ),
  breadcrumb: L('Vaskuläre Erkrankungen · Moya-Moya', 'Vascular diseases · Moyamoya', 'بیماری‌های عروقی · Moya-Moya'),
  sourceLabel: 'Dr. Zia',
  keyLabel:  L('Merke', 'Key point', 'نکته مهم'),
  caveLabel: L('CAVE', 'Caution', 'احتیاط'),

  sections: [
    { id: 'grundlagen',      icon: '🧠', label: L('Grundlagen',             'Basics',                 'مبانی') },
    { id: 'pathophysio',     icon: '🔄', label: L('Pathophysiologie',        'Pathophysiology',        'پاتوفیزیولوژی') },
    { id: 'klinik',          icon: '🩺', label: L('Klinik & Assoziationen',  'Clinical & associations', 'بالین و اسوسیاسیون‌ها') },
    { id: 'bildgebung',      icon: '🖥️', label: L('CT & MRT',               'CT & MRI',               'CT و MRI') },
    { id: 'dsa',             icon: '🫀', label: L('MRA, CTA & DSA',          'MRA, CTA & DSA',         'MRA، CTA و DSA') },
    { id: 'therapie',        icon: '⚕️', label: L('Therapie',               'Treatment',              'درمان') },
    { id: 'fallbeispiele',   icon: '🧪', label: L('Fallbeispiele',           'Cases',                  'نمونه کیس‌ها') },
    { id: 'takehome',        icon: '💡', label: L('Take home message',       'Take-home message',      'نکات کلیدی') },
  ],

  heroCards: [
    {
      value: L('Bimodal', 'Bimodal', 'دوقله‌ای'),
      label: L('Altersgipfel', 'Age distribution', 'توزیع سنی'),
      text:  L(
        'Kinder 5–10 J. → Ischämie · Erwachsene 35–45 J. → Ischämie + Blutung',
        'Children 5–10 yrs → ischaemia · Adults 35–45 yrs → ischaemia + haemorrhage',
        'کودکان ۵–۱۰ سال → ایسکمی · بزرگسالان ۳۵–۴۵ سال → ایسکمی + خونریزی',
      ),
    },
    {
      value: L('"Rauch"', '"Smoke"', '"دود"'),
      label: L('Namensgebung', 'Naming', 'نام‌گذاری'),
      text:  L(
        '„もやもや" (japanisch) = Puff of smoke – das DSA-Bild der Basalganglien-Kollateralen',
        '"もやもや" (Japanese) = puff of smoke – DSA appearance of basal ganglia collaterals',
        '«もやもや» (ژاپنی) = ابر دود – تصویر DSA از کولاترال‌های بازال گانگلیا',
      ),
    },
    {
      value: 'Grad I–VI',
      label: L('Suzuki-Klassifikation', 'Suzuki classification', 'کلاسیفیکاسیون سوزوکی'),
      text:  L(
        'Progressive ICA-Okklusion mit wachsender und dann wieder abnehmender Kollateralbildung',
        'Progressive ICA occlusion with growing then diminishing collateral formation',
        'انسداد پیشرونده ICA با تشکیل کولاترال رو به افزایش و سپس کاهش',
      ),
    },
  ],

  // ── Section 1: Grundlagen ─────────────────────────────────────────────────
  grundlagen: {
    title: L('Grundlagen & Terminologie', 'Basics & terminology', 'مبانی و اصطلاح‌شناسی'),
    lead:  L(
      'Moya-Moya ist eine progressive stenosierende Erkrankung der supraklinoidalen ICA und ihrer proximalen Äste (ACA, MCA). Die entstehenden Kollateralen sehen im DSA-Bild wie eine Rauchwolke aus.',
      'Moyamoya is a progressive stenosing disease of the supraclinoid ICA and its proximal branches (ACA, MCA). The resulting collaterals appear like a puff of smoke on DSA.',
      'Moya-Moya یک بیماری تنگ‌کننده پیشرونده ICA سوپراکلینوئید و شاخه‌های پروگزیمال آن (ACA، MCA) است. کولاترال‌های حاصل در DSA شبیه ابر دود به نظر می‌رسند.',
    ),
    items: [
      {
        icon: '🏷️',
        title: L('Krankheit vs. Syndrom', 'Disease vs. syndrome', 'بیماری در مقابل سندرم'),
        text:  L(
          'Idiopathisch und bilateral → Moya-Moya-Krankheit. Mit bekannter Grunderkrankung (z. B. Down, NF1) oder unilateral → Moya-Moya-Syndrom.',
          'Idiopathic and bilateral → Moyamoya disease. With known underlying condition (e.g. Down, NF1) or unilateral → Moyamoya syndrome.',
          'ایدیوپاتیک و دوطرفه → بیماری Moya-Moya. با علت زمینه‌ای (مثل Down، NF1) یا یک‌طرفه → سندرم Moya-Moya.',
        ),
      },
      {
        icon: '🌏',
        title: L('Epidemiologie', 'Epidemiology', 'اپیدمیولوژی'),
        text:  L(
          'Häufiger in Ostasien (Japan ≈ 0,5–1/100.000/J.). Frauen etwas häufiger betroffen (1,8:1). RNF213-Genmutation als wichtigster genetischer Risikofaktor.',
          'More prevalent in East Asia (Japan ≈ 0.5–1/100,000/yr). Slightly more common in women (1.8:1). RNF213 gene mutation is the most important genetic risk factor.',
          'شایع‌تر در آسیای شرقی (ژاپن ≈ ۰.۵–۱/۱۰۰٬۰۰۰/سال). کمی شایع‌تر در زنان (۱.۸:۱). موتاسیون ژن RNF213 مهم‌ترین فاکتور ریسک ژنتیک است.',
        ),
      },
      {
        icon: '🔬',
        title: L('Histopathologie', 'Histopathology', 'هیستوپاتولوژی'),
        text:  L(
          'Fibröse Intimaproliferation ohne Entzündung, Atherosklerose oder Thrombose. Kein aktiver entzündlicher Prozess – deshalb keine immunsuppressive Therapie.',
          'Fibrous intimal proliferation without inflammation, atherosclerosis or thrombosis. No active inflammatory process — hence no immunosuppressive therapy.',
          'پرولیفراسیون فیبروز اینتیما بدون التهاب، آترواسکلروز یا ترومبوز. فرآیند التهابی فعال وجود ندارد — به همین دلیل درمان ایمونوساپرسیو جایی ندارد.',
        ),
      },
    ],
  },

  // ── Section 2: Pathophysiologie ───────────────────────────────────────────
  pathophysio: {
    title:   L('Pathophysiologie', 'Pathophysiology', 'پاتوفیزیولوژی'),
    lead:    L(
      'Die progressive Okklusion der ICA zwingt das Gehirn zu immer ausgeprägteren Kollateralnetzwerken. Diese lentikulostriatären und leptomeningealen Gefäße sind fragil und rupturanfällig.',
      'Progressive ICA occlusion forces the brain to develop increasingly prominent collateral networks. These lenticulostriate and leptomeningeal vessels are fragile and prone to rupture.',
      'انسداد پیشرونده ICA مغز را وادار به توسعه شبکه‌های کولاترال فزاینده می‌کند. این عروق لنتیکولواستریات و لپتومننژیال شکننده و مستعد پارگی هستند.',
    ),
    headers: [L('Schritt', 'Step', 'مرحله'), L('Vorgang', 'Process', 'فرآیند'), L('Klinische Folge', 'Clinical consequence', 'نتیجه بالینی')],
    rows: [
      [L('1', '1', '۱'), L('ICA-Bifurkationsstenose beginnt', 'ICA bifurcation stenosis begins', 'شروع تنگی بیفورکاسیون ICA'), L('Reduzierter Fluss in ACA/MCA', 'Reduced flow in ACA/MCA', 'کاهش جریان در ACA/MCA')],
      [L('2', '2', '۲'), L('Kollateralnetz bildet sich (lentikulostriatär, thalamoperforativ, leptomeningeal)', 'Collateral network forms (lenticulostriate, thalamoperforating, leptomeningeal)', 'شبکه کولاترال تشکیل می‌شود (لنتیکولواستریات، تالاموپرفوراتیو، لپتومننژیال)'), L('"Puff of smoke" im DSA sichtbar', '"Puff of smoke" visible on DSA', '"پف دود" در DSA قابل مشاهده')],
      [L('3', '3', '۳'), L('Chronische Minderperfusion → Wasserscheidenischämie', 'Chronic hypoperfusion → watershed ischaemia', 'هایپوپرفیوژن مزمن → ایسکمی watershed'), L('TIA, Schlaganfall, Kognitionsminderung', 'TIA, stroke, cognitive decline', 'TIA، سکته، کاهش شناخت')],
      [L('4', '4', '۴'), L('Fragile Kollateralen rupturieren (v. a. Erwachsene)', 'Fragile collaterals rupture (especially adults)', 'پارگی کولاترال‌های شکننده (به‌خصوص بزرگسالان)'), L('IVH, intrazerebrale Blutung (Basalganglien, Thalamus)', 'IVH, intracerebral haemorrhage (basal ganglia, thalamus)', 'IVH، خونریزی داخل مغزی (بازال گانگلیا، تالاموس)')],
    ],
    imageAlt: L('Suzuki-Klassifikation: Progression Grad I–VI', 'Suzuki classification: progression grades I–VI', 'کلاسیفیکاسیون سوزوکی: پیشرفت از درجه I تا VI'),
  },

  // ── Section 3: Klinik ─────────────────────────────────────────────────────
  klinik: {
    title:   L('Klinik & Assoziierte Erkrankungen', 'Clinical features & associated conditions', 'تظاهرات بالینی و بیماری‌های همراه'),
    lead:    L(
      'Kinder leiden fast ausschließlich an ischämischen Ereignissen; Erwachsene tragen zusätzlich ein relevantes Blutungsrisiko durch fragile Kollateralen.',
      'Children suffer almost exclusively from ischaemic events; adults also carry a significant haemorrhage risk from fragile collaterals.',
      'کودکان تقریباً فقط دچار رویدادهای ایسکمیک می‌شوند؛ بزرگسالان علاوه بر آن ریسک خونریزی قابل توجهی دارند.',
    ),
    headers: [L('Merkmal', 'Feature', 'ویژگی'), L('Kinder (5–10 J.)', 'Children (5–10 yrs)', 'کودکان (۵–۱۰ سال)'), L('Erwachsene (35–45 J.)', 'Adults (35–45 yrs)', 'بزرگسالان (۳۵–۴۵ سال)')],
    rows: [
      [L('Häufigste Manifestation', 'Most common presentation', 'شایع‌ترین تظاهر'), L('TIA, ischämischer Schlaganfall', 'TIA, ischaemic stroke', 'TIA، سکته ایسکمیک'), L('Ischämisch und hämorrhagisch', 'Ischaemic and haemorrhagic', 'ایسکمیک و هموراژیک')],
      [L('Typischer Auslöser', 'Typical trigger', 'محرک شایع'), L('Hyperventilation: Weinen, Blasinstrument, Sport', 'Hyperventilation: crying, wind instrument, exercise', 'هایپرونتیلاسیون: گریه، ساز بادی، ورزش'), L('Meist spontan', 'Usually spontaneous', 'معمولاً خودبه‌خود')],
      [L('Blutungslokalisation', 'Haemorrhage location', 'محل خونریزی'), L('Selten', 'Rare', 'نادر'), L('Basalganglien, Thalamus, intraventrikulär', 'Basal ganglia, thalamus, intraventricular', 'بازال گانگلیا، تالاموس، داخل بطنی')],
      [L('Sonstiges', 'Other', 'سایر'), L('Kopfschmerz, Epilepsie, Entwicklungsverzögerung', 'Headache, epilepsy, developmental delay', 'سردرد، صرع، تأخیر رشد'), L('Kognitionsminderung, choreatiforme Bewegungen', 'Cognitive decline, choreiform movements', 'کاهش شناخت، حرکات کوریفرم')],
    ],
    associationsItems: [
      { icon: '🧬', title: 'Down-Syndrom (Trisomie 21)', text: L('Häufigste genetische Assoziation; frühes Gefäßscreening empfohlen.', 'Most common genetic association; early vascular screening recommended.', 'شایع‌ترین اسوسیاسیون ژنتیک؛ غربالگری عروقی زودهنگام توصیه می‌شود.') },
      { icon: '🧬', title: 'NF1 (Neurofibromatose Typ 1)', text: L('Basalarterienveränderungen, v. a. nach zerebraler Bestrahlung verstärkt.', 'Skull-base artery changes, especially accentuated after cranial irradiation.', 'تغییرات شریان‌های پایه جمجمه، به‌ویژه پس از پرتودرمانی مغزی بیشتر.') },
      { icon: '🩸', title: L('Sichelzellanämie', 'Sickle cell disease', 'آنمی سلول داسی'), text: L('Vasookklusive Krisen → Moya-Moya-ähnliche Stenosierung.', 'Vasoocclusive crises → Moyamoya-like stenosis.', 'بحران‌های واسواکلوزیو → تنگی شبیه Moya-Moya.') },
      { icon: '☢️', title: L('Hirnbestrahlung', 'Cranial irradiation', 'پرتودرمانی مغز'), text: L('Z. B. nach Gliom-Therapie im Kindesalter; Latenz Monate bis Jahre.', 'e.g. after childhood glioma treatment; latency months to years.', 'مثلاً پس از درمان گلیوما در کودکی؛ تأخیر ماه‌ها تا سال‌ها.') },
    ],
    key: L(
      'Hyperventilation (Weinen, Blasinstrument, Flöte, sportliche Belastung) → CO₂-Abfall → zerebrale Vasokonstriktion → TIA. Bei Kindern mit Moya-Moya ist das der häufigste akute Auslöser.',
      'Hyperventilation (crying, wind instrument, flute, exercise) → CO₂ drop → cerebral vasoconstriction → TIA. In children with moyamoya this is the most common acute trigger.',
      'هایپرونتیلاسیون (گریه، ساز بادی، فلوت، ورزش) → کاهش CO₂ → وازوکونستریکشن مغزی → TIA. در کودکان مبتلا به Moya-Moya این شایع‌ترین محرک حاد است.',
    ),
  },

  // ── Section 4: CT & MRT ───────────────────────────────────────────────────
  bildgebung: {
    title: L('CT- und MRT-Befunde', 'CT and MRI findings', 'یافته‌های CT و MRI'),
    lead:  L(
      'MRT mit Gadolinium ist die primäre Modalität für Diagnose und Verlaufskontrolle. Die native CCT dient dem raschen Blutungsausschluss.',
      'Gadolinium-enhanced MRI is the primary modality for diagnosis and follow-up. NCCT serves for rapid haemorrhage exclusion.',
      'MRI با گادولینیوم روش اصلی برای تشخیص و پیگیری است. NCCT برای رد سریع خونریزی به کار می‌رود.',
    ),
    ctItems: [
      { title: L('Akute Blutung', 'Acute haemorrhage', 'خونریزی حاد'), text: L('Hyperdens intraventrikulär, thalamisch oder putaminal – typisch bei Erwachsenen.', 'Hyperattenuating intraventricularly, thalamically or putaminally – typical in adults.', 'هایپردنس داخل بطنی، تالامیک یا پوتامینال – تیپیک در بزرگسالان.') },
      { title: L('Chronische Infarkte', 'Chronic infarcts', 'انفارکت‌های مزمن'), text: L('Hypodense kortikale/subkortikale Areale, oft watershed-verteilt (ACA-MCA- oder MCA-PCA-Grenzzone).', 'Hypoattenuating cortical/subcortical areas, often watershed-distributed (ACA-MCA or MCA-PCA border zone).', 'نواحی هیپودنس کورتیکال/ساب‌کورتیکال، اغلب در zone آبشاری (مرز ACA-MCA یا MCA-PCA).') },
      { title: L('Atrophie', 'Atrophy', 'آتروفی'), text: L('Folge chronisch ischämischer Schädigung; oft asymmetrisch entsprechend dem betroffenen Territorium.', 'Consequence of chronic ischaemic injury; often asymmetric corresponding to affected territory.', 'نتیجه آسیب ایسکمیک مزمن؛ اغلب نامتقارن و متناسب با قلمرو درگیر.') },
    ],
    mriHeaders: [L('Sequenz', 'Sequence', 'سکوانس'), L('Typischer Befund', 'Typical finding', 'یافته تیپیک'), L('Bedeutung', 'Significance', 'اهمیت')],
    mriRows: [
      [L('T2 / FLAIR (nativ)', 'T2 / FLAIR (non-enhanced)', 'T2 / FLAIR (بدون کنتراست)'), L('Flow Voids in Basalganglien, Thalami und interner Kapsel', 'Flow voids in basal ganglia, thalami and internal capsule', 'Flow voids در بازال گانگلیا، تالاموس و کپسول داخلی'), L('Direkte Darstellung der Moya-Moya-Kollateralgefäße', 'Direct depiction of Moya-Moya collateral vessels', 'نمایش مستقیم عروق کولاترال Moya-Moya')],
      [L('FLAIR + Gadolinium → Ivy Sign', 'FLAIR + gadolinium → ivy sign', 'FLAIR + گادولینیوم → Ivy Sign'), L('Lineare/gyriforme leptomeningeale KM-Aufnahme entlang der Sulci – wie Efeu am Hirn', 'Linear/gyriform leptomeningeal enhancement along sulci – like ivy on the brain', 'تقویت لپتومننژیال خطی/ژیریفرم در امتداد sulci – مثل پیچک روی مغز'), L('Pathognomonisch für Moya-Moya; Zeichen aktiver langsamer leptomeningealer Kollateralversorgung', 'Pathognomonic for moyamoya; sign of active slow leptomeningeal collateral supply', 'پاتوگنومونیک Moya-Moya؛ نشانه کولاترال لپتومننژیال فعال با جریان کند')],
      [L('DWI', 'DWI', 'DWI'), L('Diffusionsrestriktion bei akutem Infarkt; watershed- oder lakunäres Muster', 'Diffusion restriction in acute infarct; watershed or lacunar pattern', 'محدودیت دیفیوژن در انفارکت حاد؛ الگوی watershed یا لاکونار'), L('Akute Ischämiediagnostik und Ausdehnungsbeurteilung', 'Acute ischaemia diagnosis and extent assessment', 'تشخیص ایسکمی حاد و ارزیابی وسعت')],
      [L('MR-Perfusion / ASL', 'MR perfusion / ASL', 'پرفیوژن MRI / ASL'), L('Reduzierter CBF und eingeschränkte cerebrale Vasoreserve (CVR) in betroffenen Territorien', 'Reduced CBF and impaired cerebrovascular reserve (CVR) in affected territories', 'کاهش CBF و اختلال reserve عروق مغزی (CVR) در قلمرو درگیر'), L('Präoperative Hämodynamik-Evaluierung; entscheidend für Timing der OP', 'Preoperative haemodynamic evaluation; crucial for surgical timing', 'ارزیابی همودینامیک قبل از عمل؛ حیاتی برای زمان‌بندی جراحی')],
    ],
    ivyKey: L(
      'Das Ivy Sign auf Gd-FLAIR ist das sensibelste und spezifischste MRT-Zeichen für aktives Moya-Moya. Der Name stammt vom efeuähnlichen Muster der leptomeningealen Kollateralen auf der Hirnoberfläche.',
      'The ivy sign on Gd-FLAIR is the most sensitive and specific MRI sign of active moyamoya. The name comes from the ivy-like pattern of leptomeningeal collaterals on the brain surface.',
      'Ivy sign در Gd-FLAIR حساس‌ترین و اختصاصی‌ترین علامت MRI در Moya-Moya فعال است. نام آن از الگوی شبیه پیچک کولاترال‌های لپتومننژیال روی سطح مغز گرفته شده است.',
    ),
  },

  // ── Section 5: MRA, CTA & DSA ─────────────────────────────────────────────
  dsa: {
    title: L('MRA, CTA und DSA – Gefäßdarstellung', 'MRA, CTA and DSA – vascular imaging', 'MRA، CTA و DSA – تصویربرداری عروقی'),
    lead:  L(
      'DSA ist der Goldstandard und die einzige Methode für die Suzuki-Klassifikation. MRA/CTA ermöglichen nicht-invasives Screening.',
      'DSA is the gold standard and the only method for Suzuki classification. MRA/CTA allow non-invasive screening.',
      'DSA استاندارد طلایی و تنها روش برای کلاسیفیکاسیون سوزوکی است. MRA/CTA امکان غربالگری غیرتهاجمی را فراهم می‌کنند.',
    ),
    modesHeaders: [L('Methode', 'Method', 'روش'), L('Typische Befunde', 'Typical findings', 'یافته‌های تیپیک'), L('Stärke / Schwäche', 'Strength / limitation', 'مزیت / محدودیت')],
    modesRows: [
      [L('TOF-MRA', 'TOF-MRA', 'TOF-MRA'), L('Stenose/Okklusion ICA-Bifurkation; fehlende MCA/ACA-Signale; kollaterale Netzwerke sichtbar', 'Stenosis/occlusion of ICA bifurcation; absent MCA/ACA signals; collateral networks visible', 'تنگی/انسداد بیفورکاسیون ICA؛ غیاب سیگنال MCA/ACA؛ شبکه کولاترال قابل مشاهده'), L('Nicht-invasiv, kein KM; Slow-flow-Artefakte möglich', 'Non-invasive, no contrast; slow-flow artefacts possible', 'غیرتهاجمی، بدون کنتراست؛ آرتیفکت جریان کند محتمل')],
      [L('CTA', 'CTA', 'CTA'), L('Supraklinoidale ICA-Stenose; Kollateralnetzwerke; intrakranielle Topographie', 'Supraclinoid ICA stenosis; collateral networks; intracranial topography', 'تنگی ICA سوپراکلینوئید؛ شبکه کولاترال؛ توپوگرافی داخل‌جمجمه'), L('Gute räumliche Auflösung; Strahlung + KM; keine Hämodynamik', 'Good spatial resolution; radiation + contrast; no haemodynamics', 'رزولوشن فضایی خوب؛ اشعه + کنتراست؛ بدون اطلاعات همودینامیک')],
      [L('DSA (Goldstandard)', 'DSA (gold standard)', 'DSA (استاندارد طلایی)'), L('"Puff of smoke"; Suzuki-Grad; Kollateraltypen; Hämodynamik; Komplikationsrisiko beurteilen', '"Puff of smoke"; Suzuki grade; collateral types; haemodynamics; complication risk assessment', '"پف دود"؛ درجه سوزوکی؛ انواع کولاترال؛ همودینامیک؛ ارزیابی ریسک عارضه'), L('Vollständigste Information; invasiv; Komplikationsrisiko ~0,5 %', 'Most complete information; invasive; complication risk ~0.5%', 'کامل‌ترین اطلاعات؛ تهاجمی؛ ریسک عارضه ~۰.۵٪')],
    ],
    suzukiTitle: L('Suzuki-Klassifikation (1969)', 'Suzuki Classification (1969)', 'کلاسیفیکاسیون سوزوکی (۱۹۶۹)'),
    suzukiHeaders: [L('Grad', 'Grade', 'درجه'), L('DSA-Befund', 'DSA finding', 'یافته DSA'), L('Klinische Phase', 'Clinical phase', 'فاز بالینی')],
    suzukiRows: [
      [L('I', 'I', 'I'), L('Nur Stenose der ICA-Bifurkation; keine Kollateralen', 'Stenosis of ICA bifurcation only; no collaterals', 'تنها تنگی بیفورکاسیون ICA؛ بدون کولاترال'), L('Frühphase; oft asymptomatisch', 'Early phase; often asymptomatic', 'مرحله اولیه؛ اغلب بدون علامت')],
      [L('II', 'II', 'II'), L('Beginn der Moya-Moya-Kollateralen; Dilatation aller Hauptarterien', 'Onset of Moya-Moya collaterals; dilation of all major arteries', 'شروع کولاترال‌های Moya-Moya؛ دیلاتاسیون همه شریان‌های اصلی'), L('Kompensationsphase', 'Compensation phase', 'فاز جبران')],
      [L('III', 'III', 'III'), L('Intensivierung der Moya-Moya-Gefäße; MCA beginnt zu verschwinden', 'Intensification of Moya-Moya vessels; MCA begins to disappear', 'تقویت عروق Moya-Moya؛ شروع ناپدید شدن MCA'), L('Zunehmende Ischämiegefahr', 'Increasing ischaemia risk', 'افزایش خطر ایسکمی')],
      [L('IV', 'IV', 'IV'), L('Abnahme der Moya-Moya-Gefäße; Einbeziehung der PCA', 'Diminution of Moya-Moya vessels; involvement of PCA', 'کاهش عروق Moya-Moya؛ درگیری PCA'), L('Oft klinisch kritisch', 'Often clinically critical', 'اغلب از نظر بالینی بحرانی')],
      [L('V', 'V', 'V'), L('Weitere Reduktion; externe Karotiskollateralen nehmen zu', 'Further reduction; external carotid collaterals increase', 'کاهش بیشتر؛ افزایش کولاترال‌های کاروتید خارجی'), L('Kritische Perfusion', 'Critical perfusion', 'پرفیوژن بحرانی')],
      [L('VI', 'VI', 'VI'), L('Alle Moya-Moya-Gefäße verschwunden; Versorgung nur noch aus extrakraniellen Kollateralen', 'All Moya-Moya vessels gone; supply only from extracranial collaterals', 'همه عروق Moya-Moya ناپدید؛ تغذیه فقط از کولاترال‌های خارج‌جمجمه'), L('Terminale Phase', 'Terminal phase', 'فاز نهایی')],
    ],
    suzukiImageAlt: L('Suzuki-Klassifikation Grad I–VI schematisch', 'Suzuki classification grades I–VI schematic', 'نمای شماتیک کلاسیفیکاسیون سوزوکی درجه I–VI'),
    key: L(
      'Die Suzuki-Klassifikation gilt für jede Seite separat. Bilateral kann unterschiedlicher Grad vorliegen. Nur die DSA erlaubt eine zuverlässige Graduierung.',
      'The Suzuki classification is applied per side separately. Bilaterally, different grades can be present. Only DSA allows reliable grading.',
      'کلاسیفیکاسیون سوزوکی برای هر سمت جداگانه اعمال می‌شود. در حالت دوطرفه ممکن است درجات متفاوتی وجود داشته باشد. فقط DSA درجه‌بندی قابل اعتماد را امکان‌پذیر می‌کند.',
    ),
  },

  // ── Section 6: Therapie ────────────────────────────────────────────────────
  therapie: {
    title: L('Therapie & Revaskularisation', 'Treatment & revascularisation', 'درمان و ریواسکولاریزاسیون'),
    lead:  L(
      'Ziel ist die zerebrale Revaskularisation. Medikamente allein sind keine kausale Therapie, aber adjuvant sinnvoll.',
      'The goal is cerebral revascularisation. Medication alone is not curative but is useful adjunctively.',
      'هدف ریواسکولاریزاسیون مغزی است. داروها به تنهایی علّی نیستند، اما به صورت adjuvant مفیدند.',
    ),
    items: [
      {
        icon: '🔗',
        title: L('Direkter Bypass – STA-MCA', 'Direct bypass – STA-MCA', 'بای‌پس مستقیم – STA-MCA'),
        text:  L(
          'Anastomose der A. temporalis superficialis (STA) mit einem kortikalen MCA-Ast. Sofortige Verbesserung der Perfusion. Goldstandard bei Erwachsenen.',
          'Anastomosis of the superficial temporal artery (STA) with a cortical MCA branch. Immediate perfusion improvement. Gold standard in adults.',
          'آناستوموز شریان temporalis superficialis (STA) با شاخه‌ای از MCA. بهبود فوری پرفیوژن. استاندارد طلایی در بزرگسالان.',
        ),
      },
      {
        icon: '🌱',
        title: L('Indirekter Bypass – EDAS', 'Indirect bypass – EDAS', 'بای‌پس غیرمستقیم – EDAS'),
        text:  L(
          'EDAS (Enzephaloduroarteriosynangiose): STA wird auf die Hirnoberfläche vernäht und induziert über Wochen Neovaskularisation. Methode der Wahl bei Kindern.',
          'EDAS (encephalo-duro-arterio-synangiosis): STA sutured onto brain surface, inducing neovascularisation over weeks. Method of choice in children.',
          'EDAS (Encephaloduroarteriosynangiosis): STA روی سطح مغز دوخته می‌شود و طی چند هفته نئوواسکولاریزاسیون ایجاد می‌کند. روش انتخابی در کودکان.',
        ),
      },
      {
        icon: '🔄',
        title: L('Kombinierter Bypass', 'Combined bypass', 'بای‌پس ترکیبی'),
        text:  L(
          'Kombination aus direktem und indirektem Bypass. Bei ausgeprägtem Befund oder Grad III–IV bevorzugt, um maximale Revaskularisation zu erreichen.',
          'Combination of direct and indirect bypass. Preferred in advanced disease or Suzuki grade III–IV for maximum revascularisation.',
          'ترکیب بای‌پس مستقیم و غیرمستقیم. در بیماری پیشرفته یا درجه III–IV سوزوکی برای حداکثر ریواسکولاریزاسیون ترجیح داده می‌شود.',
        ),
      },
      {
        icon: '💊',
        title: L('Medikamentöse Therapie', 'Medical treatment', 'درمان دارویی'),
        text:  L(
          'ASS (Antiplatelet-Therapie) zur Schlaganfallprophylaxe. Nimodipin adjuvant. Strikte Vermeidung von Hyperventilation und Dehydratation.',
          'Aspirin (antiplatelet) for stroke prophylaxis. Nimodipine adjuvant. Strict avoidance of hyperventilation and dehydration.',
          'آسپرین (آنتی‌پلاکت) برای پروفیلاکسی سکته. نیمودیپین به صورت adjuvant. اجتناب قاطعانه از هایپرونتیلاسیون و دهیدراتاسیون.',
        ),
      },
    ],
    cave: L(
      'Hyperventilation perioperativ strikt vermeiden: CO₂-Abfall → zerebrale Vasokonstriktion → intraoperativer Schlaganfall. Auch Dehydratation erhöht das Infarktrisiko.',
      'Strictly avoid perioperative hyperventilation: CO₂ drop → cerebral vasoconstriction → intraoperative stroke. Dehydration also raises infarct risk.',
      'هایپرونتیلاسیون پری‌اوپراتیو را قاطعانه اجتناب کنید: کاهش CO₂ → وازوکونستریکشن مغزی → سکته داخل عمل. دهیدراتاسیون نیز ریسک انفارکت را افزایش می‌دهد.',
    ),
  },

  // ── Cases ─────────────────────────────────────────────────────────────────
  cases: {
    title: L('Fallbeispiele', 'Cases', 'نمونه کیس‌ها'),
    lead:  L('Im Bildfeld scrollen oder den Slider verwenden.', 'Scroll over the image or use the slider.', 'روی تصویر اسکرول کنید یا از slider استفاده کنید.'),
    open:  L('Fall in Radiopaedia öffnen', 'Open case in Radiopaedia', 'باز کردن کیس در Radiopaedia'),
  },

  // ── Take-home ─────────────────────────────────────────────────────────────
  takehome: {
    title: L('Take home message', 'Take-home message', 'نکات کلیدی'),
    lead:  L('Fünf Kernpunkte, die sitzen müssen.', 'Five key points to remember.', 'پنج نکته کلیدی که باید در ذهن بماند.'),
    items: [
      { title: L('Flow Voids + Ivy Sign', 'Flow voids + ivy sign', 'Flow voids + Ivy sign'), text: L('T2 Flow Voids in Basalganglien + Ivy Sign auf Gd-FLAIR = klassisches MRT-Bild von Moya-Moya. Beide Zeichen aktiv suchen.', 'T2 flow voids in basal ganglia + ivy sign on Gd-FLAIR = classic MRI picture of moyamoya. Actively search for both signs.', 'Flow voids در T2 در بازال گانگلیا + Ivy sign در Gd-FLAIR = تصویر کلاسیک MRI در Moya-Moya. هر دو علامت را فعالانه جستجو کنید.') },
      { title: L('Bimodal – 2 Risikogruppen', 'Bimodal – 2 risk groups', 'دوقله‌ای – ۲ گروه ریسک'), text: L('Kinder → Ischämie (Hyperventilations-Trigger!). Erwachsene → auch intrakranielle Blutung (Basalganglien, IVH).', 'Children → ischaemia (hyperventilation trigger!). Adults → also intracranial haemorrhage (basal ganglia, IVH).', 'کودکان → ایسکمی (محرک هایپرونتیلاسیون!). بزرگسالان → همچنین خونریزی داخل‌جمجمه (بازال گانگلیا، IVH).') },
      { title: L('DSA = Goldstandard', 'DSA = gold standard', 'DSA = استاندارد طلایی'), text: L('Nur die DSA erlaubt zuverlässige Suzuki-Klassifikation. MRA und CTA eignen sich für Screening und Verlaufskontrolle.', 'Only DSA allows reliable Suzuki grading. MRA and CTA are suitable for screening and follow-up.', 'فقط DSA طبقه‌بندی سوزوکی را به‌طور قابل اعتماد امکان‌پذیر می‌کند. MRA و CTA برای غربالگری و پیگیری مناسبند.') },
      { title: L('Perfusion vor Bypass', 'Perfusion before bypass', 'پرفیوژن قبل از بای‌پس'), text: L('MR-Perfusion (ASL) oder CT-Perfusion zeigt die Gefährdungszone und entscheidet über Timing und Technik der chirurgischen Revaskularisation.', 'MR perfusion (ASL) or CT perfusion shows the at-risk zone and guides timing and technique of surgical revascularisation.', 'پرفیوژن MRI (ASL) یا CT پرفیوژن منطقه در خطر را نشان می‌دهد و زمان‌بندی و تکنیک ریواسکولاریزاسیون جراحی را هدایت می‌کند.') },
      { title: L('Assoziationen prüfen', 'Check associations', 'اسوسیاسیون‌ها را بررسی کنید'), text: L('Down-Syndrom, NF1, Sichelzellanämie, Radiatio – bei bekannter Grunderkrankung spricht man von Moya-Moya-Syndrom.', 'Down syndrome, NF1, sickle cell disease, irradiation – with a known underlying condition it is called Moyamoya syndrome.', 'Down syndrome، NF1، آنمی سلول داسی، پرتودرمانی – با علت زمینه‌ای شناخته‌شده به آن سندرم Moya-Moya می‌گویند.') },
    ],
  },
}

// ── MCQs ─────────────────────────────────────────────────────────────────────

const Q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })

export const MOYAMOYA_QUESTION_SEEDS = [
  Q('name',
    L('Was bedeutet „Moya-Moya" auf Japanisch?', 'What does "Moya-Moya" mean in Japanese?', '«Moya-Moya» به ژاپنی چه معنایی دارد؟'),
    [L('Wölkchen aus Rauch / Puff of smoke', 'Puff of smoke', 'ابر دود / Puff of smoke'), L('Rotes Blut', 'Red blood', 'خون قرمز'), L('Schwarzes Herz', 'Black heart', 'قلب سیاه'), L('Fließendes Wasser', 'Flowing water', 'آب جاری')],
    0,
    L('Der Name beschreibt das DSA-Bild der kollateralen Basalgangliengefäße, die wie eine Rauchwolke aussehen.', 'The name describes the DSA appearance of collateral basal ganglia vessels resembling a puff of smoke.', 'نام توصیف تصویر DSA از عروق کولاترال بازال گانگلیا است که شبیه ابر دود به نظر می‌رسد.'),
  ),
  Q('vessel',
    L('Welches Gefäßsegment ist bei Moya-Moya primär betroffen?', 'Which vessel segment is primarily affected in moyamoya?', 'کدام بخش از عروق در Moya-Moya اولین بار درگیر می‌شود؟'),
    [L('Supraklinoidale ICA und proximale ACA/MCA', 'Supraclinoid ICA and proximal ACA/MCA', 'ICA سوپراکلینوئید و ACA/MCA پروگزیمال'), L('Basilararterie', 'Basilar artery', 'شریان بازیلار'), L('Anteriore Spinalarterie', 'Anterior spinal artery', 'شریان نخاعی قدامی'), L('Vertebralarterien', 'Vertebral arteries', 'شریان‌های ورتبرال')],
    0,
    L('Die fibröse Intimaproliferation beginnt an der Bifurkation der ICA (Karotis-T-Gabel) und betrifft dann die proximalen ACA- und MCA-Segmente.', 'Fibrous intimal proliferation begins at the ICA bifurcation (carotid T-junction) then involves proximal ACA and MCA segments.', 'پرولیفراسیون فیبروز اینتیما از بیفورکاسیون ICA (اتصال T کاروتید) شروع می‌شود و سپس بخش‌های پروگزیمال ACA و MCA را درگیر می‌کند.'),
  ),
  Q('ivysign',
    L('Welches MRT-Zeichen ist für Moya-Moya pathognomonisch?', 'Which MRI sign is pathognomonic for moyamoya?', 'کدام علامت MRI برای Moya-Moya پاتوگنومونیک است؟'),
    [L('Ivy Sign – lineare leptomeningeale Aufnahme auf Gd-FLAIR', 'Ivy sign – linear leptomeningeal enhancement on Gd-FLAIR', 'Ivy sign – تقویت لپتومننژیال خطی در Gd-FLAIR'), L('Empty delta sign', 'Empty delta sign', 'Empty delta sign'), L('Blooming artifact in SWI', 'Blooming artefact on SWI', 'آرتیفکت Blooming در SWI'), L('Bright artery sign in DWI', 'Bright artery sign on DWI', 'Bright artery sign در DWI')],
    0,
    L('Das Ivy Sign beschreibt die gyriforme Enhancement-Aufnahme entlang der Sulci durch langsam fließende leptomeningeale Kollateralen auf Gd-FLAIR – wie Efeu auf der Hirnoberfläche.', 'The ivy sign describes gyriform enhancement along sulci from slow-flowing leptomeningeal collaterals on Gd-FLAIR – like ivy on the brain surface.', 'Ivy sign توصیف تقویت ژیریفرم در امتداد sulci ناشی از کولاترال‌های لپتومننژیال با جریان کند در Gd-FLAIR است – مثل پیچک روی سطح مغز.'),
  ),
  Q('goldstandard',
    L('Welche Modalität ist der Goldstandard für die Diagnose und Klassifikation von Moya-Moya?', 'Which modality is the gold standard for diagnosing and classifying moyamoya?', 'کدام روش استاندارد طلایی برای تشخیص و کلاسیفیکاسیون Moya-Moya است؟'),
    [L('DSA (digitale Subtraktionsangiographie)', 'DSA (digital subtraction angiography)', 'DSA (آنژیوگرافی تفریقی دیجیتال)'), L('CT-Perfusion', 'CT perfusion', 'CT پرفیوژن'), L('TOF-MRA', 'TOF-MRA', 'TOF-MRA'), L('Transkranielle Doppler-Sonographie', 'Transcranial Doppler', 'داپلر ترانس‌کرانیال')],
    0,
    L('Nur die DSA ermöglicht die Suzuki-Klassifikation (Grad I–VI), zeigt Kollateraltypen und Hämodynamik. MRA und CTA sind Screeningmethoden, aber keine Äquivalente.', 'Only DSA enables Suzuki classification (grades I–VI), shows collateral types and haemodynamics. MRA and CTA are screening tools but not equivalent.', 'فقط DSA کلاسیفیکاسیون سوزوکی (درجه I–VI) را ممکن می‌سازد، انواع کولاترال و همودینامیک را نشان می‌دهد. MRA و CTA ابزارهای غربالگری هستند، نه معادل.'),
  ),
  Q('flowvoids',
    L('Was repräsentieren die Flow Voids in den Basalganglien im T2-MRT?', 'What do T2 MRI flow voids in the basal ganglia represent?', 'Flow voids در بازال گانگلیا در T2 MRI نشان‌دهنده چه هستند؟'),
    [L('Kollaterale Moya-Moya-Gefäße (lentikulostriatär und thalamoperforativ)', 'Collateral Moya-Moya vessels (lenticulostriate and thalamoperforating)', 'عروق کولاترال Moya-Moya (لنتیکولواستریات و تالاموپرفوراتیو)'), L('Kleine Kavernome', 'Small cavernomas', 'کاورنوم‌های کوچک'), L('Mikrokalzifikationen', 'Microcalcifications', 'میکروکلسیفیکاسیون'), L('Perforierte Hämorrhagien', 'Perforated haemorrhages', 'خونریزی‌های پرفوره')],
    0,
    L('Schnell durchflossene Kollateralgefäße erzeugen keinen MRT-Signal (Flow Void). Diese lentikulostriatären und thalamoperforativen Kollateralen entsprechen genau dem „Puff of smoke" in der DSA.', 'Rapidly flowing collateral vessels produce no MRI signal (flow void). These lenticulostriate and thalamoperforating collaterals correspond exactly to the "puff of smoke" on DSA.', 'عروق کولاترال با جریان سریع سیگنال MRI ندارند (flow void). این کولاترال‌های لنتیکولواستریات و تالاموپرفوراتیو دقیقاً با "پف دود" در DSA مطابقت دارند.'),
  ),
  Q('hemorrhage',
    L('Welche Altersgruppe bei Moya-Moya hat das höchste Blutungsrisiko, und wo tritt die Blutung typischerweise auf?', 'Which age group with moyamoya has the highest haemorrhage risk, and where does bleeding typically occur?', 'در Moya-Moya کدام گروه سنی بیشترین خطر خونریزی را دارد و خونریزی معمولاً کجا رخ می‌دهد؟'),
    [L('Erwachsene (35–45 J.); Basalganglien, Thalamus, intraventrikulär', 'Adults (35–45 yrs); basal ganglia, thalamus, intraventricular', 'بزرگسالان (۳۵–۴۵ سال)؛ بازال گانگلیا، تالاموس، داخل بطنی'), L('Kinder (5–10 J.); Kortex', 'Children (5–10 yrs); cortex', 'کودکان (۵–۱۰ سال)؛ کورتکس'), L('Neugeborene; Kleinhirn', 'Neonates; cerebellum', 'نوزادان؛ مخچه'), L('Senioren (>70 J.); Subarachnoidalraum', 'Elderly (>70 yrs); subarachnoid space', 'سالمندان (>۷۰ سال)؛ فضای ساب‌آراکنوئید')],
    0,
    L('Fragile lentikulostriatäre und thalamoperforative Kollateralen rupturieren bei Erwachsenen häufig spontan und führen zu intrazerebralen oder intraventrikulären Blutungen.', 'Fragile lenticulostriate and thalamoperforating collaterals rupture spontaneously in adults, causing intracerebral or intraventricular haemorrhage.', 'کولاترال‌های شکننده لنتیکولواستریات و تالاموپرفوراتیو در بزرگسالان اغلب خودبه‌خود پاره می‌شوند و خونریزی داخل مغزی یا داخل بطنی ایجاد می‌کنند.'),
  ),
  Q('suzuki1',
    L('Was beschreibt Suzuki-Grad I?', 'What does Suzuki grade I describe?', 'سوزوکی درجه I چه چیزی را توصیف می‌کند؟'),
    [L('Stenose der ICA-Bifurkation ohne Kollateralen', 'Stenosis of ICA bifurcation without collaterals', 'تنگی بیفورکاسیون ICA بدون کولاترال'), L('Vollständige bilaterale ICA-Okklusion', 'Complete bilateral ICA occlusion', 'انسداد کامل دوطرفه ICA'), L('Nur leptomeningeale Kollateralen sichtbar', 'Only leptomeningeal collaterals visible', 'فقط کولاترال‌های لپتومننژیال قابل مشاهده'), L('Einbeziehung der Basilararterie', 'Involvement of the basilar artery', 'درگیری شریان بازیلار')],
    0,
    L('Grad I ist die Frühphase: isolierte Stenose der ICA-Bifurkation ohne erkennbare Kollateralenbildung, oft asymptomatisch.', 'Grade I is the early phase: isolated stenosis of ICA bifurcation without visible collateral formation, often asymptomatic.', 'درجه I فاز اولیه است: تنگی ایزوله بیفورکاسیون ICA بدون کولاترال قابل مشاهده، اغلب بدون علامت.'),
  ),
  Q('edas',
    L('Was beschreibt EDAS und für welche Patientengruppe ist es bevorzugt?', 'What does EDAS describe and for which patient group is it preferred?', 'EDAS چه چیزی است و برای کدام گروه بیماران ترجیح داده می‌شود؟'),
    [L('Enzephaloduroarteriosynangiose – indirekter Bypass, bevorzugt bei Kindern', 'Encephalo-duro-arterio-synangiosis – indirect bypass, preferred in children', 'Encephaloduroarteriosynangiosis – بای‌پس غیرمستقیم، ترجیح در کودکان'), L('Ein CT-Perfusionsprotokoll', 'A CT perfusion protocol', 'یک پروتکل CT پرفیوژن'), L('Direkter STA-MCA-Bypass bei Erwachsenen', 'Direct STA-MCA bypass in adults', 'بای‌پس مستقیم STA-MCA در بزرگسالان'), L('Eine Medikamentenklasse (Ca-Antagonisten)', 'A drug class (Ca-antagonists)', 'یک کلاس دارویی (آنتاگونیست‌های کلسیم)')],
    0,
    L('EDAS: Die A. temporalis superficialis wird auf die Hirnoberfläche aufgenäht und induziert über Wochen eine spontane Neovaskularisation. Bei Kindern bevorzugt, da deren Hirnoberfläche die Neovaskularisation gut unterstützt.', 'EDAS: The superficial temporal artery is sutured onto the brain surface, inducing spontaneous neovascularisation over weeks. Preferred in children because their brain surface supports neovascularisation well.', 'EDAS: STA روی سطح مغز دوخته می‌شود و طی چند هفته نئوواسکولاریزاسیون خودبه‌خود ایجاد می‌کند. در کودکان ترجیح دارد چون سطح مغز آن‌ها نئوواسکولاریزاسیون را خوب حمایت می‌کند.'),
  ),
  Q('hypervent',
    L('Warum löst Hyperventilation bei Kindern mit Moya-Moya häufig eine TIA aus?', 'Why does hyperventilation commonly trigger TIA in children with moyamoya?', 'چرا هایپرونتیلاسیون در کودکان مبتلا به Moya-Moya معمولاً TIA ایجاد می‌کند؟'),
    [L('CO₂-Abfall → zerebrale Vasokonstriktion → kritische Minderperfusion im ohnehin stenotierten Territorium', 'CO₂ drop → cerebral vasoconstriction → critical hypoperfusion in already stenosed territory', 'کاهش CO₂ → وازوکونستریکشن مغزی → هایپوپرفیوژن بحرانی در قلمرو از پیش تنگ‌شده'), L('Hyperventilation erhöht den Blutdruck massiv', 'Hyperventilation massively increases blood pressure', 'هایپرونتیلاسیون فشار خون را به شدت افزایش می‌دهد'), L('CO₂-Anstieg fördert Thrombosebildung', 'CO₂ rise promotes thrombus formation', 'افزایش CO₂ ترومبوز را تقویت می‌کند'), L('Hyperventilation aktiviert das sympathische Nervensystem nicht', 'Hyperventilation does not activate the sympathetic nervous system', 'هایپرونتیلاسیون سیستم عصبی سمپاتیک را فعال نمی‌کند')],
    0,
    L('Hyperventilation senkt den pCO₂, was physiologisch zerebrale Vasokonstriktion auslöst. Bei ohnehin kritisch stenosierter Perfusion genügt dies für transiente Ischämien. Bekannte Trigger: Weinen, Blasinstrument, Flöte, Sport.', 'Hyperventilation reduces pCO₂, physiologically triggering cerebral vasoconstriction. In already critically compromised perfusion this suffices for transient ischaemia. Known triggers: crying, wind instruments, flute, exercise.', 'هایپرونتیلاسیون pCO₂ را کاهش می‌دهد که به صورت فیزیولوژیک وازوکونستریکشن مغزی ایجاد می‌کند. در پرفیوژن از قبل بحرانی این برای ایسکمی گذرا کافی است. محرک‌های شناخته‌شده: گریه، ساز بادی، فلوت، ورزش.'),
  ),
  Q('sequence',
    L('Welche MRT-Sequenz zeigt das Ivy Sign am besten?', 'Which MRI sequence best demonstrates the ivy sign?', 'کدام سکوانس MRI Ivy sign را بهترین نشان می‌دهد؟'),
    [L('FLAIR nach Gadolinium-Gabe', 'FLAIR after gadolinium administration', 'FLAIR پس از تزریق گادولینیوم'), L('Natives T1', 'Non-enhanced T1', 'T1 بدون کنتراست'), L('Diffusion-weighted imaging (DWI)', 'Diffusion-weighted imaging (DWI)', 'تصویربرداری وزن‌دار دیفیوژن (DWI)'), L('SWI / GRE', 'SWI / GRE', 'SWI / GRE')],
    0,
    L('Auf Gd-FLAIR stellen sich die langsam durchflossenen leptomeningealen Kollateralen als lineare Hyperintensitäten entlang der Sulci dar – das Ivy Sign. Auf nativem FLAIR gelegentlich schwach erkennbar.', 'On Gd-FLAIR, slowly flowing leptomeningeal collaterals appear as linear hyperintensities along sulci – the ivy sign. Occasionally faintly visible on non-enhanced FLAIR.', 'در Gd-FLAIR، کولاترال‌های لپتومننژیال با جریان کند به صورت هایپراینتنسیتی خطی در امتداد sulci ظاهر می‌شوند – Ivy sign. گاهی در FLAIR بدون کنتراست هم ضعیف قابل مشاهده است.'),
  ),
  Q('association',
    L('Welche der folgenden Erkrankungen ist NICHT typisch mit Moya-Moya assoziiert?', 'Which of the following conditions is NOT typically associated with moyamoya?', 'کدام‌یک از بیماری‌های زیر معمولاً با Moya-Moya اسوسیاسیون ندارد؟'),
    [L('Diabetes mellitus Typ 2', 'Type 2 diabetes mellitus', 'دیابت ملیتوس نوع ۲'), L('Down-Syndrom (Trisomie 21)', 'Down syndrome (trisomy 21)', 'Down syndrome (تریزومی ۲۱)'), L('Sichelzellanämie', 'Sickle cell disease', 'آنمی سلول داسی'), L('Hirnbestrahlung in der Kindheit', 'Cranial irradiation in childhood', 'پرتودرمانی مغز در دوران کودکی')],
    0,
    L('Klassische Assoziationen sind Down-Syndrom, NF1, Sichelzellanämie, Hirnbestrahlung, Turner-Syndrom und Marfan-Syndrom. Diabetes Typ 2 gehört nicht dazu.', 'Classic associations include Down syndrome, NF1, sickle cell disease, cranial irradiation, Turner syndrome and Marfan syndrome. Type 2 diabetes is not among them.', 'اسوسیاسیون‌های کلاسیک شامل Down syndrome، NF1، آنمی سلول داسی، پرتودرمانی مغز، Turner syndrome و Marfan syndrome است. دیابت نوع ۲ در این لیست نیست.'),
  ),
  Q('perfusion',
    L('Welche Aussage zur CT-/MR-Perfusion bei Moya-Moya ist korrekt?', 'Which statement about CT/MR perfusion in moyamoya is correct?', 'کدام عبارت درباره CT/MR پرفیوژن در Moya-Moya صحیح است؟'),
    [L('Reduzierte CBF und CVR in Watershed-Territorien; entscheidend für präoperatives Timing', 'Reduced CBF and CVR in watershed territories; crucial for preoperative timing', 'CBF و CVR کاهش‌یافته در قلمرو watershed؛ حیاتی برای زمان‌بندی قبل از عمل'), L('Perfusion ist bei Moya-Moya immer normal', 'Perfusion is always normal in moyamoya', 'پرفیوژن در Moya-Moya همیشه طبیعی است'), L('Perfusion zeigt nur bei akuter Blutung Auffälligkeiten', 'Perfusion shows abnormalities only in acute haemorrhage', 'پرفیوژن فقط در خونریزی حاد اختلال نشان می‌دهد'), L('CT-Perfusion ist kontraindiziert', 'CT perfusion is contraindicated', 'CT پرفیوژن کنتراندیکاسیون دارد')],
    0,
    L('Perfusionsmessungen (CBF, CVR, Acetazolamide-Challenge) zeigen die Gefährdungszone und sind entscheidend für die OP-Indikation und das Timing der Revaskularisation.', 'Perfusion measurements (CBF, CVR, acetazolamide challenge) reveal the at-risk zone and are crucial for surgical indication and timing of revascularisation.', 'اندازه‌گیری‌های پرفیوژن (CBF، CVR، Acetazolamide challenge) منطقه در خطر را نشان می‌دهند و برای انديکاسیون جراحی و زمان‌بندی ریواسکولاریزاسیون حیاتی هستند.'),
  ),
  Q('bilateral',
    L('In welcher Situation spricht man von Moya-Moya-Syndrom statt Moya-Moya-Krankheit?', 'In which situation is the term "Moyamoya syndrome" used rather than "Moyamoya disease"?', 'در کدام شرایط از اصطلاح «سندرم Moya-Moya» به جای «بیماری Moya-Moya» استفاده می‌شود؟'),
    [L('Bei bekannter Grunderkrankung (z. B. Down, NF1, SCD) oder unilateralem Befall', 'With a known underlying condition (e.g. Down, NF1, SCD) or unilateral involvement', 'با یک بیماری زمینه‌ای شناخته‌شده (مثل Down، NF1، SCD) یا درگیری یک‌طرفه'), L('Bei Grad VI nach Suzuki', 'At Suzuki grade VI', 'در درجه VI سوزوکی'), L('Wenn nur die MCA betroffen ist', 'When only the MCA is affected', 'وقتی فقط MCA درگیر است'), L('Bei Kindern unter 5 Jahren', 'In children under 5 years', 'در کودکان زیر ۵ سال')],
    0,
    L('Moya-Moya-Krankheit = idiopathisch und bilateral. Sobald eine bekannte Grunderkrankung vorliegt oder der Befund unilateral ist, spricht man von Moya-Moya-Syndrom.', 'Moyamoya disease = idiopathic and bilateral. Once a known underlying condition exists or the finding is unilateral, it is termed Moyamoya syndrome.', 'بیماری Moya-Moya = ایدیوپاتیک و دوطرفه. وقتی بیماری زمینه‌ای شناخته‌شده وجود دارد یا یافته یک‌طرفه است، آن را سندرم Moya-Moya می‌نامند.'),
  ),
]

export const MOYAMOYA_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, MOYAMOYA_QUESTION_SEEDS.map(seed => ({
  id: `moyamoya-${lang}-${seed.id}`,
  tags: ['moya-moya', 'moyamoya', 'gehirn'],
  fach: 'gehirn',
  question: seed.question[lang],
  options: seed.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
  correct: String.fromCharCode(65 + seed.correct),
  explanation: seed.explanation[lang],
}))]))

// ── Flashcards ─────────────────────────────────────────────────────────────

export const MOYAMOYA_FLASHCARD_TOPIC = {
  id: 'moya-moya',
  area: 'Gehirn',
  chapter: 'Vaskuläre Erkrankungen',
  icon: '🌫️',
  iconImage: '/fach/gehirn.png',
  color: '#7c3aed',
  href: '/flashcards/moya-moya',
  title:    L('Moya-Moya', 'Moyamoya Disease', 'بیماری Moya-Moya'),
  subtitle: L('Pathophysiologie · Bildgebung · Ivy Sign · Suzuki · Therapie', 'Pathophysiology · Imaging · Ivy sign · Suzuki · Treatment', 'پاتوفیزیولوژی · تصویربرداری · Ivy sign · سوزوکی · درمان'),
}

const F = (id, category, front, answer, explanation, diagram = null) => ({ id, category, front, answer, explanation, diagram })

const FLASH_SEEDS = [
  F('name',
    L('Grundlagen', 'Basics', 'مبانی'),
    L('Was bedeutet „Moya-Moya" und woher stammt der Name?', 'What does "Moya-Moya" mean and where does the name come from?', '«Moya-Moya» چه معنایی دارد و نام از کجا آمده است؟'),
    L('Japanisch: „Wölkchen aus Rauch" (puff of smoke) – beschreibt das DSA-Bild der kollateralen Basalgangliengefäße.', 'Japanese: "puff of smoke" – describes the DSA appearance of collateral basal ganglia vessels.', 'ژاپنی: «ابر دود» (puff of smoke) – تصویر DSA از عروق کولاترال بازال گانگلیا را توصیف می‌کند.'),
    L('Das charakteristische DSA-Muster entsteht durch dichte lentikulostriatäre und thalamoperforative Kollateralen an der Hirnbasis.', 'The characteristic DSA pattern results from dense lenticulostriate and thalamoperforating collaterals at the skull base.', 'الگوی مشخصه DSA ناشی از کولاترال‌های متراکم لنتیکولواستریات و تالاموپرفوراتیو در پایه جمجمه است.'),
  ),
  F('vessel',
    L('Grundlagen', 'Basics', 'مبانی'),
    L('Welches Gefäßsegment ist bei Moya-Moya primär betroffen?', 'Which vessel segment is primarily involved in moyamoya?', 'کدام بخش از عروق در Moya-Moya اولاً درگیر می‌شود؟'),
    L('Supraklinoidale ICA (Karotis-T-Gabel) → dann proximate ACA und MCA.', 'Supraclinoid ICA (carotid T-junction) → then proximal ACA and MCA.', 'ICA سوپراکلینوئید (اتصال T کاروتید) → سپس ACA و MCA پروگزیمال.'),
    L('Fibröse Intimaproliferation ohne Atherosklerose oder Entzündung – histologisch einzigartig. RNF213-Mutation häufigster genetischer Risikofaktor.', 'Fibrous intimal proliferation without atherosclerosis or inflammation – histologically unique. RNF213 mutation is the most common genetic risk factor.', 'پرولیفراسیون فیبروز اینتیما بدون آترواسکلروز یا التهاب – از نظر هیستولوژی منحصربه‌فرد. موتاسیون RNF213 شایع‌ترین فاکتور ریسک ژنتیک است.'),
  ),
  F('bimodal',
    L('Klinik', 'Clinical', 'بالینی'),
    L('Wie manifestiert sich Moya-Moya altersabhängig?', 'How does moyamoya manifest differently by age?', 'Moya-Moya بر اساس سن چگونه تظاهر می‌یابد؟'),
    L('Kinder 5–10 J. → fast nur Ischämie. Erwachsene 35–45 J. → Ischämie UND Blutung.', 'Children 5–10 yrs → almost only ischaemia. Adults 35–45 yrs → ischaemia AND haemorrhage.', 'کودکان ۵–۱۰ سال → تقریباً فقط ایسکمی. بزرگسالان ۳۵–۴۵ سال → ایسکمی و خونریزی.'),
    L('Blutung bei Erwachsenen durch Ruptur fragiler lentikulostriatärer/thalamoperforativer Kollateralen – typisch intraventrikulär, putaminal oder thalamisch.', 'Haemorrhage in adults from rupture of fragile lenticulostriate/thalamoperforating collaterals – typically intraventricular, putaminal or thalamic.', 'خونریزی در بزرگسالان ناشی از پارگی کولاترال‌های شکننده لنتیکولواستریات/تالاموپرفوراتیو – معمولاً داخل بطنی، پوتامینال یا تالامیک.'),
    L('Kinder → Ischämie\nErwachsene → Ischämie + Blutung', 'Children → ischaemia\nAdults → ischaemia + haemorrhage', 'کودکان → ایسکمی\nبزرگسالان → ایسکمی + خونریزی'),
  ),
  F('hypervent',
    L('Klinik', 'Clinical', 'بالینی'),
    L('Warum löst Hyperventilation bei Kindern mit Moya-Moya TIA aus?', 'Why does hyperventilation trigger TIA in children with moyamoya?', 'چرا هایپرونتیلاسیون در کودکان Moya-Moya TIA ایجاد می‌کند؟'),
    L('CO₂ ↓ → zerebrale Vasokonstriktion → kritische Minderperfusion im ohnehin stenotierten Territorium.', 'CO₂ ↓ → cerebral vasoconstriction → critical hypoperfusion in already stenosed territory.', 'CO₂ ↓ → وازوکونستریکشن مغزی → هایپوپرفیوژن بحرانی در قلمرو از پیش تنگ‌شده.'),
    L('Trigger im Alltag: Weinen, Blasinstrument, Flöte, intensive körperliche Belastung. Eltern und Betroffene müssen darüber aufgeklärt werden.', 'Everyday triggers: crying, wind instrument, flute, intense exercise. Parents and patients must be educated about this.', 'محرک‌های روزمره: گریه، ساز بادی، فلوت، ورزش شدید. والدین و بیماران باید در این زمینه آموزش ببینند.'),
  ),
  F('flowvoids',
    L('MRT', 'MRI', 'MRI'),
    L('Was repräsentieren T2 Flow Voids in den Basalganglien bei Moya-Moya?', 'What do T2 flow voids in the basal ganglia represent in moyamoya?', 'Flow voids در T2 در بازال گانگلیا در Moya-Moya چه چیزی را نشان می‌دهند؟'),
    L('Kollaterale Moya-Moya-Gefäße (lentikulostriatär + thalamoperforativ).', 'Collateral Moya-Moya vessels (lenticulostriate + thalamoperforating).', 'عروق کولاترال Moya-Moya (لنتیکولواستریات + تالاموپرفوراتیو).'),
    L('Schnell fließendes Blut in engen Kollateralgefäßen erzeugt kein MRT-Signal → Flow Void. Dieses Bild entspricht genau dem „Puff of smoke" der DSA.', 'Rapidly flowing blood in narrow collateral vessels produces no MRI signal → flow void. This image corresponds exactly to the "puff of smoke" on DSA.', 'خون با جریان سریع در عروق کولاترال باریک سیگنال MRI ندارد → flow void. این تصویر دقیقاً با "پف دود" DSA مطابقت دارد.'),
  ),
  F('ivysign',
    L('MRT', 'MRI', 'MRI'),
    L('Was ist das Ivy Sign auf Gd-FLAIR?', 'What is the ivy sign on Gd-FLAIR?', 'Ivy sign در Gd-FLAIR چیست؟'),
    L('Lineare/gyriforme leptomeningeale KM-Aufnahme entlang der Sulci durch langsam fließende Kollateralen – wie Efeu am Hirn.', 'Linear/gyriform leptomeningeal enhancement along sulci from slowly flowing collaterals – like ivy on the brain.', 'تقویت لپتومننژیال خطی/ژیریفرم در امتداد sulci ناشی از کولاترال‌های با جریان کند – مثل پیچک روی مغز.'),
    L('Das Ivy Sign ist das sensibelste und spezifischste MRT-Zeichen für Moya-Moya. Auch auf nativem FLAIR manchmal schwach sichtbar. Auf nativem T1 nicht sichtbar.', 'The ivy sign is the most sensitive and specific MRI sign for moyamoya. Sometimes faintly visible on non-enhanced FLAIR. Not visible on non-enhanced T1.', 'Ivy sign حساس‌ترین و اختصاصی‌ترین علامت MRI برای Moya-Moya است. گاهی در FLAIR بدون کنتراست ضعیف قابل مشاهده است. در T1 بدون کنتراست قابل مشاهده نیست.'),
    L('Gd-FLAIR → Ivy Sign ✓ (sensitiv + spezifisch)\nT1 nativ → kein Ivy Sign\nFLAIR nativ → manchmal schwach', 'Gd-FLAIR → ivy sign ✓ (sensitive + specific)\nNon-enhanced T1 → no ivy sign\nNon-enhanced FLAIR → sometimes faint', 'Gd-FLAIR → Ivy sign ✓ (حساس + اختصاصی)\nT1 بدون کنتراست → بدون Ivy sign\nFLAIR بدون کنتراست → گاهی ضعیف'),
  ),
  F('goldstandard',
    L('Gefäßdarstellung', 'Vascular imaging', 'تصویربرداری عروقی'),
    L('Goldstandard und einzige Methode für Suzuki-Klassifikation?', 'Gold standard and only method for Suzuki classification?', 'استاندارد طلایی و تنها روش برای کلاسیفیکاسیون سوزوکی؟'),
    L('DSA (digitale Subtraktionsangiographie).', 'DSA (digital subtraction angiography).', 'DSA (آنژیوگرافی تفریقی دیجیتال).'),
    L('Nur DSA zeigt den vollständigen Kollateraltyp, Hämodynamik und ermöglicht die Suzuki-Graduierung. MRA und CTA sind Screening-Methoden und können Stenosen unterschätzen.', 'Only DSA shows complete collateral type, haemodynamics and enables Suzuki grading. MRA and CTA are screening tools and may underestimate stenoses.', 'فقط DSA نوع کامل کولاترال، همودینامیک را نشان می‌دهد و درجه‌بندی سوزوکی را ممکن می‌سازد. MRA و CTA ابزارهای غربالگری هستند و ممکن است تنگی را دست کم بگیرند.'),
  ),
  F('suzuki',
    L('DSA', 'DSA', 'DSA'),
    L('Suzuki-Klassifikation: Grad I–VI in Kurzform?', 'Suzuki classification: grades I–VI in brief?', 'کلاسیفیکاسیون سوزوکی: درجه I–VI به اختصار؟'),
    L('I Stenose · II MM-Gefäße beginnen · III MM intensiv, MCA schwindet · IV MM nimmt ab + PCA · V Externalkolateralen · VI nur Externalkollateralen', 'I stenosis · II MM vessels start · III MM intense, MCA fades · IV MM diminishes + PCA · V external collaterals · VI only external collaterals', 'I تنگی · II شروع عروق MM · III MM شدید، MCA محو · IV MM کاهش + PCA · V کولاترال خارجی · VI فقط کولاترال خارجی'),
    L('Wichtig: Klassifikation gilt pro Seite. Bilateral kann unterschiedlicher Grad vorliegen. Nur DSA ist für Graduierung geeignet.', 'Important: classification applies per side. Bilaterally, different grades can be present. Only DSA is suitable for grading.', 'مهم: کلاسیفیکاسیون برای هر سمت جداگانه است. دوطرفه ممکن است درجات متفاوتی داشته باشد. فقط DSA برای درجه‌بندی مناسب است.'),
    L('I → II → III → IV → V → VI\nKollateralen: ↑↑ dann ↓↓\nICA/MCA: progressiv okklus.', 'I → II → III → IV → V → VI\nCollaterals: ↑↑ then ↓↓\nICA/MCA: progressive occlusion', 'I → II → III → IV → V → VI\nکولاترال: ↑↑ سپس ↓↓\nICA/MCA: انسداد پیشرونده'),
  ),
  F('ct',
    L('CT', 'CT', 'CT'),
    L('Was zeigt das native CCT bei Moya-Moya?', 'What does NCCT show in moyamoya?', 'NCCT در Moya-Moya چه نشان می‌دهد؟'),
    L('Akut: hyperdens (Blutung, v. a. IVH, Putamen, Thalamus). Chronisch: hypodense Infarkte watershed-verteilt, Atrophie.', 'Acutely: hyperattenuating (haemorrhage, especially IVH, putamen, thalamus). Chronically: hypoattenuating infarcts watershed-distributed, atrophy.', 'حاد: هایپردنس (خونریزی، به‌خصوص IVH، پوتامن، تالاموس). مزمن: انفارکت‌های هیپودنس با توزیع watershed، آتروفی.'),
    L('Das CCT dient primär dem Blutungsausschluss. Für die eigentliche Diagnose ist MRT deutlich sensitiver und spezifischer.', 'NCCT primarily serves to exclude haemorrhage. MRI is far more sensitive and specific for the actual diagnosis.', 'NCCT اصلاً برای رد خونریزی است. MRI برای تشخیص اصلی بسیار حساس‌تر و اختصاصی‌تر است.'),
  ),
  F('bypass-direct',
    L('Therapie', 'Treatment', 'درمان'),
    L('Was ist der direkte Bypass bei Moya-Moya?', 'What is the direct bypass in moyamoya?', 'بای‌پس مستقیم در Moya-Moya چیست؟'),
    L('STA-MCA-Bypass: Anastomose der A. temporalis superficialis mit einem kortikalen MCA-Ast.', 'STA-MCA bypass: anastomosis of superficial temporal artery with a cortical MCA branch.', 'بای‌پس STA-MCA: آناستوموز شریان temporalis superficialis با شاخه‌ای از MCA.'),
    L('Vorteil: sofortige Verbesserung der Perfusion. Goldstandard bei Erwachsenen. Technisch anspruchsvoller als indirekter Bypass.', 'Advantage: immediate perfusion improvement. Gold standard in adults. Technically more demanding than indirect bypass.', 'مزیت: بهبود فوری پرفیوژن. استاندارد طلایی در بزرگسالان. از نظر تکنیکی پیچیده‌تر از بای‌پس غیرمستقیم.'),
    L('Direkt: STA → MCA (sofort)\nIndirekt: EDAS → Wachstum über Wochen', 'Direct: STA → MCA (immediate)\nIndirect: EDAS → growth over weeks', 'مستقیم: STA → MCA (فوری)\nغیرمستقیم: EDAS → رشد طی چند هفته'),
  ),
  F('edas',
    L('Therapie', 'Treatment', 'درمان'),
    L('Was ist EDAS und für wen ist es bevorzugt?', 'What is EDAS and for whom is it preferred?', 'EDAS چیست و برای چه کسی ترجیح دارد؟'),
    L('Enzephaloduroarteriosynangiose: STA auf Hirnoberfläche vernäht → induziert Neovaskularisation über Wochen. Bevorzugt bei Kindern.', 'Encephalo-duro-arterio-synangiosis: STA sutured onto brain surface → induces neovascularisation over weeks. Preferred in children.', 'Encephaloduroarteriosynangiosis: STA روی سطح مغز دوخته می‌شود → نئوواسکولاریزاسیون طی چند هفته. ترجیح در کودکان.'),
    L('Kindergehirn unterstützt Neovaskularisation durch EDAS besonders gut. Andere indirekte Methoden: EMS (Encephalomyosynangiose), EMAS.', 'The paediatric brain supports neovascularisation via EDAS particularly well. Other indirect methods: EMS (encephalomyosynangiosis), EMAS.', 'مغز کودک نئوواسکولاریزاسیون از طریق EDAS را خصوصاً خوب حمایت می‌کند. روش‌های غیرمستقیم دیگر: EMS، EMAS.'),
  ),
  F('associations',
    L('Assoziationen', 'Associations', 'اسوسیاسیون‌ها'),
    L('Welche Erkrankungen sind typisch mit Moya-Moya assoziiert (= Moya-Moya-Syndrom)?', 'Which conditions are typically associated with moyamoya (= Moyamoya syndrome)?', 'کدام بیماری‌ها با Moya-Moya اسوسیاسیون دارند (= سندرم Moya-Moya)?'),
    L('Down-Syndrom, NF1, Sichelzellanämie, Hirnbestrahlung, Turner-Syndrom, Marfan-Syndrom.', 'Down syndrome, NF1, sickle cell disease, cranial irradiation, Turner syndrome, Marfan syndrome.', 'Down syndrome، NF1، آنمی سلول داسی، پرتودرمانی مغز، Turner syndrome، Marfan syndrome.'),
    L('Moya-Moya-Krankheit = idiopathisch + bilateral. Mit bekannter Grunderkrankung ODER unilateral → Moya-Moya-Syndrom.', 'Moyamoya disease = idiopathic + bilateral. With known underlying condition OR unilateral → Moyamoya syndrome.', 'بیماری Moya-Moya = ایدیوپاتیک + دوطرفه. با بیماری زمینه‌ای شناخته‌شده یا یک‌طرفه → سندرم Moya-Moya.'),
  ),
  F('perfusion',
    L('Therapieplanung', 'Treatment planning', 'برنامه‌ریزی درمان'),
    L('Warum ist präoperative MR/CT-Perfusion bei Moya-Moya essenziell?', 'Why is preoperative MR/CT perfusion essential in moyamoya?', 'چرا MR/CT پرفیوژن قبل از عمل در Moya-Moya ضروری است؟'),
    L('Zeigt Ausmaß der CBF-Reduktion und der eingeschränkten Vasoreserve (CVR) → Indikation und Timing für Revaskularisation.', 'Shows degree of CBF reduction and impaired cerebrovascular reserve (CVR) → indication and timing for revascularisation.', 'درجه کاهش CBF و اختلال reserve عروق مغزی (CVR) را نشان می‌دهد → انديکاسیون و زمان‌بندی برای ریواسکولاریزاسیون.'),
    L('Acetazolamide (Diamox) Challenge: Reduktion der CVR unter Belastung beweist hämodynamisch relevante Stenose.', 'Acetazolamide (Diamox) challenge: reduction in CVR under stress proves haemodynamically significant stenosis.', 'Acetazolamide (Diamox) challenge: کاهش CVR تحت استرس، تنگی با اهمیت همودینامیک را ثابت می‌کند.'),
  ),
  F('cave',
    L('CAVE', 'Caution', 'احتیاط'),
    L('Welche Maßnahme muss bei Moya-Moya perioperativ strikt vermieden werden?', 'Which measure must be strictly avoided perioperatively in moyamoya?', 'کدام اقدام باید در Moya-Moya به شدت پری‌اوپراتیو اجتناب شود؟'),
    L('Hyperventilation (senkt pCO₂ → Vasokonstriktion → Schlaganfall). Auch Dehydratation strikt meiden.', 'Hyperventilation (lowers pCO₂ → vasoconstriction → stroke). Also strictly avoid dehydration.', 'هایپرونتیلاسیون (pCO₂ را کاهش می‌دهد → وازوکونستریکشن → سکته). دهیدراتاسیون را هم قاطعانه اجتناب کنید.'),
    L('Anästhesie-Protokoll: normovolämisch, Normokapnie, Normotension. ETCO₂ engmaschig überwachen.', 'Anaesthesia protocol: normovolaemic, normocapnic, normotensive. Close ETCO₂ monitoring.', 'پروتکل بیهوشی: نرموولمی، نرموکاپنی، نرموتانسیون. پایش دقیق ETCO₂.'),
  ),
]

export const MOYAMOYA_FLASHCARDS = FLASH_SEEDS.map((item, index) => ({
  id: `moyamoya-${String(index + 1).padStart(2, '0')}-${item.id}`,
  topicId: 'moya-moya',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
  ...(item.diagram ? { diagram: item.diagram } : {}),
}))
