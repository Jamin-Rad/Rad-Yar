const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })
const F = (id, category, front, answer, explanation) => ({ id, category, front, answer, explanation })

export const DAVF_LESSON = {
  pdfSourcePages: [35,36], // user PDF page range; coverage still requires content comparison

  breadcrumb: L('Durale AV-Fistel (dAVF)', 'Dural Arteriovenous Fistula (dAVF)', 'فیستول شریانی-وریدی دورال (dAVF)'),
  title: L('Durale AV-Fistel (dAVF)', 'Dural Arteriovenous Fistula (dAVF)', 'فیستول شریانی-وریدی دورال (dAVF)'),
  keyLabel: L('Merke', 'Key point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Warning', 'هشدار'),
  toc: L('Inhalte', 'Contents', 'فهرست'),

  sections: [
    { id: 'grundlagen',   icon: '📌', label: L('Grundlagen',           'Basics',               'مبانی') },
    { id: 'klinik',       icon: '🩺', label: L('Klinik',               'Clinical',             'بالین') },
    { id: 'cognard',      icon: '📊', label: L('Cognard-Klassifikation','Cognard Classification','طبقه‌بندی Cognard'), emphasis: true },
    { id: 'bildgebung',   icon: '🧲', label: L('Bildgebung',           'Imaging',              'تصویربرداری') },
    { id: 'differenzial', icon: '⚖️', label: L('Differenzialdiagnose', 'Differential',         'افتراقی') },
    { id: 'management',   icon: '🔧', label: L('Management',           'Management',           'مدیریت') },
    { id: 'takehome',     icon: '🏁', label: L('TAKE HOME MESSAGE',    'TAKE HOME MESSAGE',    'TAKE HOME MESSAGE'), emphasis: true },
  ],

  grundlagen: {
    title: L('Grundlagen & Pathophysiologie', 'Basics & Pathophysiology', 'مبانی و پاتوفیزیولوژی'),
    lead: L(
      'Die durale AV-Fistel ist eine direkte arteriovenöse Verbindung innerhalb der Dura mater. Im Gegensatz zur zerebralen AVM entsteht sie meist erworben und besitzt keinen Nidus.',
      'The dural arteriovenous fistula is a direct arteriovenous connection within the dura mater. Unlike cerebral AVM, it is mostly acquired and has no nidus.',
      'فیستول دورال AV یک اتصال مستقیم شریانی-وریدی درون دورامتر است. بر خلاف AVM مغزی، معمولاً اکتسابی است و نیدوس ندارد.'
    ),
    items: [
      {
        icon: '🔗',
        title: L('Definition', 'Definition', 'تعریف'),
        text: L(
          'Direkte Verbindung zwischen meningealen Arterien und einem duralen Sinus oder kortikaler Vene innerhalb der Dura mater. Kein Nidus — das ist der Hauptunterschied zur AVM.',
          'Direct connection between meningeal arteries and a dural sinus or cortical vein within the dura mater. No nidus — the main difference from AVM.',
          'اتصال مستقیم بین شریان‌های مننژیال و سینوس دورال یا ورید کورتیکال درون دورامتر. بدون نیدوس — تفاوت اصلی با AVM.'
        ),
      },
      {
        icon: '🧬',
        title: L('Ätiologie', 'Aetiology', 'اتیولوژی'),
        text: L(
          'Meist erworben — im Gegensatz zur AVM (meist kongenital). Auslöser: Sinusthrombose, Trauma, OP oder Infektion → Neovaskularisation → Fistelbildung.',
          'Mostly acquired — unlike AVM (usually congenital). Triggers: sinus thrombosis, trauma, surgery or infection → neovascularisation → fistula formation.',
          'اغلب اکتسابی — بر خلاف AVM (معمولاً مادرزادی). محرک‌ها: ترومبوز سینوس، تروما، جراحی یا عفونت → نئووسکولاریزاسیون → تشکیل فیستول.'
        ),
      },
      {
        icon: '👨‍⚕️',
        title: L('Epidemiologie', 'Epidemiology', 'اپیدمیولوژی'),
        text: L(
          'Auftreten meist im Erwachsenenalter (40.–60. Lebensjahr). Häufigste Lokalisation: Sinus transversus / sigmoideus. Eine kavernöse Sinus-dAVF ist meist eine indirekte durale Karotis-Kavernosus-Fistel (Barrow B–D); sie ist von der direkten ICA-Fistel (Barrow A) zu unterscheiden.',
          'Typically presents in adulthood (4th–6th decade). Most common location: transverse/sigmoid sinus. A cavernous sinus dAVF is usually an indirect dural carotid-cavernous fistula (Barrow B–D), distinct from a direct ICA fistula (Barrow A).',
          'معمولاً در بزرگسالی (دهه ۴–۶ زندگی) رخ می‌دهد. شایع‌ترین محل: سینوس ترانسورسوس/سیگموئیدوس. dAVF سینوس کاورنوسوس معمولاً فیستول غیرمستقیم دورال کاروتید–کاورنوسوس (Barrow B–D) است و با فیستول مستقیم ICA (Barrow A) تفاوت دارد.'
        ),
      },
      {
        icon: '📍',
        title: L('Lokalisation', 'Location', 'محل'),
        text: L(
          'Sinus transversus/sigmoideus (häufigste) · Sinus cavernosus · Tentorium · Sinus sagittalis superior · Foramen magnum.',
          'Transverse/sigmoid sinus (most common) · Cavernous sinus · Tentorium · Superior sagittal sinus · Foramen magnum.',
          'سینوس ترانسورسوس/سیگموئیدوس (شایع‌ترین) · سینوس کاورنوسوس · تنتوریوم · سینوس ساژیتال فوقانی · فورامن ماگنوم.'
        ),
      },
    ],
    key: L(
      'dAVF = erworben + kein Nidus. Hauptauslöser: Sinusthrombose → Neovaskularisation → Fistelbildung.',
      'dAVF = acquired + no nidus. Main trigger: sinus thrombosis → neovascularisation → fistula formation.',
      'dAVF = اکتسابی + بدون نیدوس. محرک اصلی: ترومبوز سینوس → نئووسکولاریزاسیون → فیستول.'
    ),
  },

  klinik: {
    title: L('Klinik', 'Clinical Presentation', 'تظاهر بالینی'),
    lead: L(
      'Die Symptome und das Risiko hängen vom venösen Abfluss ab. Kortikaler Reflux ist ein aggressives Muster; das individuelle Risiko hängt zusätzlich von Präsentation und venöser Ektasie ab.',
      'Symptoms and risk depend on venous outflow. Cortical venous reflux is an aggressive pattern; individual risk also depends on presentation and venous ectasia.',
      'علائم و خطر به خروج وریدی بستگی دارند. رفلاکس وریدی کورتیکال الگویی پرخطر است؛ خطر فردی به نحوه تظاهر و اکتازی وریدی نیز بستگی دارد.'
    ),
    headers: [
      L('Lokalisation / Situation', 'Location / Situation', 'محل / وضعیت'),
      L('Symptome', 'Symptoms', 'علائم'),
      L('Risiko', 'Risk', 'خطر'),
    ],
    rows: [
      [
        L('Sinus transversus-DAVF', 'Transverse sinus DAVF', 'DAVF سینوس ترانسورسوس'),
        L('Pulssynchroner Tinnitus', 'Pulsatile tinnitus', 'تینیتوس سنکرون با نبض'),
        L('Niedrig (Cognard I)', 'Low (Cognard I)', 'پایین (Cognard I)'),
      ],
      [
        L('Sinus cavernosus-DAVF', 'Cavernous sinus DAVF', 'DAVF سینوس کاورنوسوس'),
        L('Exophthalmus, Chemose, Visusstörung, Ptosis', 'Proptosis, chemosis, visual disturbance, ptosis', 'اگزوفتالموس، کموز، اختلال بینایی، پتوز'),
        L('Variabel', 'Variable', 'متغیر'),
      ],
      [
        L('Kortikale venöse Drainage (CVD)', 'Cortical venous drainage (CVD)', 'درناژ وریدی کورتیکال (CVD)'),
        L('Intrakranielle Blutung, Krampfanfälle, neurologische Defizite, venöse Stauungsenzephalopathie', 'Intracranial haemorrhage, seizures, focal deficits, venous congestive encephalopathy', 'خونریزی داخل جمجمه، تشنج، کسری‌های عصبی، آنسفالوپاتی احتقانی وریدی'),
        L('Aggressives Muster; Risiko individuell beurteilen', 'Aggressive pattern; assess risk individually', 'الگوی پرخطر؛ ارزیابی خطر به‌صورت فردی'),
      ],
    ],
    cave: L(
      'Corticaler venöser Reflux kennzeichnet Cognard IIb, IIa+b, III und IV. Cognard V beschreibt spinalen venösen Abfluss. Blutungs- und neurologisches Risiko variieren unter anderem mit venöser Ektasie und klinischer Präsentation; pauschale Jahresraten sind hierfür nicht geeignet.',
      'Cortical venous reflux defines Cognard IIb, IIa+b, III and IV. Cognard V describes spinal venous drainage. Haemorrhagic and neurological risk varies with factors including venous ectasia and clinical presentation; one annual rate cannot represent every grade.',
      'رفلاکس وریدی کورتیکال در درجات Cognard IIb، IIa+b، III و IV وجود دارد. Cognard V درناژ وریدی نخاعی را توصیف می‌کند. خطر خونریزی و علائم عصبی به عواملی مانند اکتازی وریدی و تظاهر بالینی وابسته است؛ یک نرخ سالانه برای همه درجات مناسب نیست.'
    ),
  },

  cognard: {
    title: L('Cognard-Klassifikation', 'Cognard Classification', 'طبقه‌بندی Cognard'),
    lead: L(
      'Die Cognard-Klassifikation beschreibt das venöse Drainagemuster. CVD liegt bei IIb, IIa+b, III und IV vor; Grad V bezeichnet spinalen venösen Abfluss. Das Muster unterstützt die Risikoeinschätzung, ersetzt aber keine klinische Einzelfallbewertung.',
      'The Cognard classification describes venous drainage. CVD occurs in IIb, IIa+b, III and IV; grade V denotes spinal venous drainage. The pattern informs risk assessment but does not replace individualized clinical evaluation.',
      'طبقه‌بندی Cognard الگوی درناژ وریدی را توصیف می‌کند. CVD در IIb، IIa+b، III و IV وجود دارد؛ درجه V درناژ وریدی نخاعی است. این الگو به ارزیابی خطر کمک می‌کند اما جای ارزیابی بالینی فردی را نمی‌گیرد.'
    ),
    headers: [
      L('Grad', 'Grade', 'درجه'),
      L('Drainagemuster', 'Drainage pattern', 'الگوی درناژ'),
      L('Blutungsrisiko', 'Haemorrhage risk', 'خطر خونریزی'),
    ],
    rows: [
      [
        'I',
        L('Antegrade Drainage in Sinus — kein CVD', 'Antegrade drainage into sinus — no CVD', 'درناژ آنتروگراد به سینوس — بدون CVD'),
        L('Ohne CVD; Management nach Symptomen und individuellem Befund', 'No CVD; management depends on symptoms and individual findings', 'بدون CVD؛ مدیریت بر اساس علائم و یافته‌های فردی'),
      ],
      [
        'IIa',
        L('Retrograde Drainage in Sinus — kein CVD', 'Retrograde drainage in sinus — no CVD', 'درناژ رتروگراد در سینوس — بدون CVD'),
        L('Mäßig — Stauungszeichen möglich', 'Moderate — congestion possible', 'متوسط — احتقان ممکن'),
      ],
      [
        'IIb',
        L('Antegrade Sinusdrainage + CVD', 'Antegrade sinus drainage + CVD', 'درناژ آنتروگراد سینوس + CVD'),
        L('Erhöht — CVD vorhanden!', 'Elevated — CVD present!', 'بالا — CVD وجود دارد!'),
      ],
      [
        'IIa+b',
        L('Retrograde Sinusdrainage + CVD', 'Retrograde sinus drainage + CVD', 'درناژ رتروگراد سینوس + CVD'),
        L('Hoch — CVD vorhanden!', 'High — CVD present!', 'بالا — CVD وجود دارد!'),
      ],
      [
        'III',
        L('Direkte CVD — keine venöse Ektasie', 'Direct CVD — no venous ectasia', 'CVD مستقیم — بدون اکتازی وریدی'),
        L('CVD ohne Ektasie; klinisches Risiko individuell bewerten', 'CVD without ectasia; assess clinical risk individually', 'CVD بدون اکتازی؛ خطر بالینی فردی ارزیابی شود'),
      ],
      [
        'IV',
        L('Direkte CVD + venöse Ektasie (Varize)', 'Direct CVD + venous ectasia (varix)', 'CVD مستقیم + اکتازی وریدی (واریس)'),
        L('CVD mit Ektasie; klinisches Risiko individuell bewerten', 'CVD with ectasia; assess clinical risk individually', 'CVD همراه اکتازی؛ خطر بالینی فردی ارزیابی شود'),
      ],
      [
        'V',
        L('Spinale venöse Drainage', 'Spinal venous drainage', 'درناژ وریدی نخاعی'),
        L('Progressives Myelopathierisiko', 'Progressive myelopathy risk', 'خطر میلوپاتی پیشرونده'),
      ],
    ],
    key: L(
      'CVD = kortikale venöse Drainage. Sie liegt bei Cognard IIb, IIa+b, III und IV vor; Grad V beschreibt spinalen venösen Abfluss. CVD erfordert eine fachärztliche, individualisierte Risikobewertung und Therapieplanung.',
      'CVD = cortical venous drainage. It occurs in Cognard IIb, IIa+b, III and IV; grade V describes spinal venous drainage. CVD warrants specialist, individualized risk assessment and treatment planning.',
      'CVD = درناژ وریدی کورتیکال. در Cognard IIb، IIa+b، III و IV وجود دارد؛ درجه V درناژ وریدی نخاعی را توصیف می‌کند. CVD نیازمند ارزیابی خطر و برنامه‌ریزی درمانی فردمحور توسط متخصص است.'
    ),
  },

  bildgebung: {
    title: L('Bildgebung: Schritt für Schritt', 'Imaging: Step by Step', 'تصویربرداری: گام به گام'),
    lead: L(
      'MRT/MRA für Screening und Stauungszeichen, CTA für Gefäßanatomie, DSA als Goldstandard zur definitiven Diagnose und Therapieplanung.',
      'MRI/MRA for screening and congestion signs, CTA for vascular anatomy, DSA as gold standard for definitive diagnosis and treatment planning.',
      'MRI/MRA برای غربالگری و علائم احتقان، CTA برای آناتومی عروقی، DSA به‌عنوان استاندارد طلایی برای تشخیص قطعی و برنامه‌ریزی درمان.'
    ),
    headers: [
      L('Modalität', 'Modality', 'روش'),
      L('Befund', 'Finding', 'یافته'),
      L('Klinische Bedeutung', 'Clinical relevance', 'اهمیت بالینی'),
    ],
    rows: [
      [
        L('T2 (MRT)', 'T2 (MRI)', 'T2 (MRI)'),
        L('Flow voids in Dura/Sinus; T2-Hyperintensität bei venöser Stauungsenzephalopathie', 'Flow voids in dura/sinus; T2 hyperintensity in venous congestive encephalopathy', 'Flow voids در دورا/سینوس؛ هایپراینتنسیتی T2 در آنسفالوپاتی احتقانی وریدی'),
        L('T2-Hyperintensität → CVD, venöse Stauung', 'T2 hyperintensity → CVD, venous congestion', 'هایپراینتنسیتی T2 → CVD، احتقان وریدی'),
      ],
      [
        L('SWI (MRT)', 'SWI (MRI)', 'SWI (MRI)'),
        L('Blutungsresiduen bei stattgehabter Hämorrhagie; erweiterte kortikale Venen', 'Haemorrhage residua; dilated cortical veins', 'بقایای خونریزی؛ وریدهای کورتیکال گشاد'),
        L('Pseudophlebitisches Muster = CVD-Zeichen', 'Pseudophlebitic pattern = CVD sign', 'الگوی سودوفلبیتیک = علامت CVD'),
      ],
      [
        L('TOF-MRA', 'TOF-MRA', 'TOF-MRA'),
        L('Signal im Sinus (arterialisiertes Blut); Sinusthrombose möglich', 'Signal in sinus (arterialized blood); sinus thrombosis possible', 'سیگنال در سینوس (خون شریانی‌شده)؛ ترومبوز سینوس ممکن'),
        L('Arterielles Signal im venösen Sinus = Hinweis auf Fistel', 'Arterial signal in venous sinus = fistula clue', 'سیگنال شریانی در سینوس وریدی = نشانه فیستول'),
      ],
      [
        'CTA',
        L('Erweiterte meningeale Arterien; frühe Sinusanfüllung; geschlängelte kortikale Venen', 'Dilated meningeal arteries; early sinus filling; tortuous cortical veins', 'شریان‌های مننژیال گشاد؛ پُرشدگی زودرس سینوس؛ وریدهای کورتیکال مارپیچ'),
        L('Gut für Gefäßanatomie und präoperative Planung', 'Good for vascular anatomy and pre-operative planning', 'مناسب برای آناتومی عروقی و برنامه‌ریزی قبل از عمل'),
      ],
      [
        L('DSA (Goldstandard!)', 'DSA (Gold standard!)', 'DSA (استاندارد طلایی!)'),
        L('Direkter Fistelpunkt; frühe Sinusfüllung in arterieller Phase; selektive Feeder-Darstellung (meist A. carotis externa)', 'Direct fistula point; early sinus filling in arterial phase; selective feeder anatomy (mostly external carotid artery)', 'نقطه مستقیم فیستول؛ پُرشدگی زودرس سینوس در فاز شریانی؛ تصویرسازی انتخابی تغذیه‌کنندگان (اغلب شریان کاروتید خارجی)'),
        L('Referenz zur vollständigen Darstellung von Fistelpunkt, Feeder und Drainagemuster sowie zur Therapieplanung', 'Reference standard for full depiction of fistula point, feeders and drainage pattern and for treatment planning', 'روش مرجع برای نمایش کامل نقطه فیستول، تغذیه‌کنندگان و الگوی درناژ و برنامه‌ریزی درمان'),
      ],
    ],
    key: L(
      'Pseudophlebitisches Muster in SWI = geschlängelte kortikale Venen = Hinweis auf CVD. DSA charakterisiert die Angioarchitektur vor Therapie umfassend.',
      'Pseudophlebitic pattern on SWI = tortuous cortical veins = clue to CVD. DSA comprehensively characterizes angioarchitecture before treatment.',
      'الگوی سودوفلبیتیک در SWI = وریدهای کورتیکال مارپیچ = نشانه‌ای از CVD. DSA آنژیوآناتومی را پیش از درمان به‌طور کامل مشخص می‌کند.'
    ),
  },

  differenzial: {
    title: L('Differenzialdiagnose', 'Differential Diagnosis', 'تشخیص افتراقی'),
    lead: L(
      'Wichtig ist die Abgrenzung zu anderen intrakraniellen Gefäßmalformationen und zur venösen Sinusthrombose.',
      'Important differential diagnoses include other intracranial vascular malformations and venous sinus thrombosis.',
      'تشخیص افتراقی مهم شامل سایر مالفورماسیون‌های عروقی داخل جمجمه و ترومبوز سینوس وریدی است.'
    ),
    headers: [
      L('Diagnose', 'Diagnosis', 'تشخیص'),
      L('Abgrenzung zur dAVF', 'Distinction from dAVF', 'افتراق از dAVF'),
    ],
    rows: [
      [
        L('Zerebrale AVM', 'Cerebral AVM', 'AVM مغزی'),
        L('AVM hat Nidus; meist kongenital; liegt im Parenchym, nicht in der Dura; DSA zeigt typischen Nidus und Drainagevene', 'AVM has a nidus; mostly congenital; parenchymal not dural; DSA shows typical nidus and draining vein', 'AVM نیدوس دارد؛ اغلب مادرزادی؛ پارانشیمی نه دورال؛ DSA نیدوس و ورید تخلیه را نشان می‌دهد'),
      ],
      [
        L('Karotis-Cavernosus-Fistel (direkt)', 'Direct carotid-cavernous fistula', 'فیستول مستقیم کاروتید-کاورنوسوس'),
        L('Direkte ICA-Fistel (Barrow A; oft traumatisch) von indirekter duraler Karotis-Kavernosus-Fistel (Barrow B–D) unterscheiden.', 'Distinguish a direct ICA fistula (Barrow A; often traumatic) from an indirect dural carotid-cavernous fistula (Barrow B–D).', 'فیستول مستقیم ICA (Barrow A؛ اغلب تروماتیک) را از فیستول غیرمستقیم دورال کاروتید–کاورنوسوس (Barrow B–D) افتراق دهید.'),
      ],
      [
        L('Sinusthrombose', 'Sinus thrombosis', 'ترومبوز سینوس'),
        L('Kann Ursache oder Folge der dAVF sein; kein arterieller Fluss im Sinus in TOF-MRA; kein früher arterieller Sinusnachfluss', 'Can be cause or consequence of dAVF; no arterial flow in sinus on TOF-MRA; no early arterial sinus filling', 'می‌تواند علت یا عارضه dAVF باشد؛ بدون جریان شریانی در سینوس در TOF-MRA؛ بدون پُرشدگی زودرس شریانی سینوس'),
      ],
      [
        L('Venöse Stauungsenzephalopathie (andere Ursachen)', 'Venous congestive encephalopathy (other causes)', 'آنسفالوپاتی احتقانی وریدی (علل دیگر)'),
        L('Diffuse T2-Hyperintensität ohne erkennbare Fistel; Ausschluss durch DSA', 'Diffuse T2 hyperintensity without identifiable fistula; exclude with DSA', 'هایپراینتنسیتی منتشر T2 بدون شناسایی فیستول؛ رد قطعی با DSA'),
      ],
    ],
  },

  management: {
    title: L('Management & Therapie', 'Management & Treatment', 'مدیریت و درمان'),
    lead: L(
      'Die Therapieentscheidung berücksichtigt Drainagemuster, Symptome, Blutungsanamnese, venöse Ektasie und den Gesamtzustand. CVD verlangt eine zeitnahe neurovaskuläre Fachbeurteilung; das Vorgehen wird individuell geplant.',
      'Treatment decisions consider drainage pattern, symptoms, haemorrhage history, venous ectasia and overall condition. CVD warrants timely neurovascular specialist assessment; management is individualized.',
      'تصمیم درمان با توجه به الگوی درناژ، علائم، سابقه خونریزی، اکتازی وریدی و وضعیت کلی گرفته می‌شود. CVD نیازمند ارزیابی به‌موقع متخصص نوروعروقی است و برنامه درمان فردی تعیین می‌شود.'
    ),
    items: [
      {
        icon: '🎯',
        title: L('Endovaskuläre Embolisation', 'Endovascular embolisation', 'آمبولیزاسیون اندوواسکولار'),
        text: L(
          'Therapie der ersten Wahl — transarteriell oder transvenös. Transvenöse Okklusion des beteiligten Sinussegments ist oft kurativ.',
          'Treatment of first choice — transarterial or transvenous. Transvenous occlusion of the involved sinus segment is often curative.',
          'درمان انتخابی — ترانس‌شریانی یا ترانس‌وریدی. انسداد ترانس‌وریدی سگمان سینوس درگیر اغلب درمان‌کننده است.'
        ),
      },
      {
        icon: '🔪',
        title: L('Mikrochirurgie', 'Microsurgery', 'میکروجراحی'),
        text: L(
          'Bei endovaskulär nicht erreichbaren Fisteln oder nach fehlgeschlagener Embolisation. Ziel ist die Unterbrechung der kortikalen venösen Drainage.',
          'For fistulas inaccessible by endovascular approach or after failed embolisation. The goal is to interrupt the cortical venous drainage.',
          'برای فیستول‌های غیرقابل‌دسترس از راه اندوواسکولار یا پس از شکست آمبولیزاسیون. هدف قطع درناژ وریدی کورتیکال است.'
        ),
      },
      {
        icon: '🛡️',
        title: L('Konservatives Management', 'Conservative management', 'مدیریت محافظه‌کارانه'),
        text: L(
          'Nur bei Cognard I (benigne, kein CVD, asymptomatisch oder nur Tinnitus). Regelmäßige Bildgebungskontrollen. Kompression der Jugularvene kann helfen (Vorsicht: keine starke Evidenz).',
          'Only for Cognard I (benign, no CVD, asymptomatic or pulsatile tinnitus only). Regular imaging follow-up. Compression of the jugular vein may help (caution: limited evidence).',
          'فقط برای Cognard I (خوش‌خیم، بدون CVD، بدون علامت یا فقط تینیتوس). پیگیری تصویربرداری منظم. فشردن ورید ژوگولار می‌تواند کمک کند (احتیاط: شواهد محدود).'
        ),
      },
    ],
    cave: L(
      'Bei CVD ist eine zeitnahe neurovaskuläre Beurteilung angezeigt. Dringlichkeit und Therapie hängen von Drainageanatomie, klinischer Präsentation und individuellen Risikomerkmalen ab; pauschale Jahresraten sind nicht übertragbar.',
      'CVD warrants timely neurovascular assessment. Urgency and treatment depend on drainage anatomy, clinical presentation and individual risk features; blanket annual rates are not transferable.',
      'در CVD ارزیابی به‌موقع نوروعروقی لازم است. فوریت و درمان به آناتومی درناژ، تظاهر بالینی و عوامل خطر فردی بستگی دارد؛ نرخ سالانهٔ کلی قابل تعمیم نیست.'
    ),
  },

  takehome: {
    title: L('Take-Home Message', 'Take-Home Message', 'پیام اصلی'),
    lead: L(
      'Drei Kernaussagen, die bei jeder dAVF entscheidend sind.',
      'Three key points that are decisive in every dAVF.',
      'سه نکته کلیدی که در هر dAVF تعیین‌کننده است.'
    ),
    items: [
      {
        title: L('Kein Nidus = kein AVM', 'No nidus = not an AVM', 'بدون نیدوس = AVM نیست'),
        text: L(
          'Die dAVF ist eine erworbene direkte Fistel in der Dura — ohne Nidus. Das ist der wichtigste Unterschied zur zerebralen AVM (kongenital, mit Nidus im Parenchym).',
          'The dAVF is an acquired direct fistula in the dura — without a nidus. This is the key difference from cerebral AVM (congenital, parenchymal nidus).',
          'dAVF یک فیستول مستقیم اکتسابی در دورا است — بدون نیدوس. این تفاوت اصلی با AVM مغزی (مادرزادی، نیدوس پارانشیمی) است.'
        ),
      },
      {
        title: L('CVD = zeitnahe Fachbeurteilung', 'CVD = timely specialist assessment', 'CVD = ارزیابی به‌موقع تخصصی'),
        text: L(
          'CVD liegt bei Cognard IIb, IIa+b, III und IV vor. Präsentation, Drainageanatomie und venöse Ektasie beeinflussen die individuelle Risikoeinschätzung und Therapieplanung.',
          'CVD occurs in Cognard IIb, IIa+b, III and IV. Presentation, drainage anatomy and venous ectasia inform individualized risk assessment and treatment planning.',
          'CVD در درجات Cognard IIb، IIa+b، III و IV وجود دارد. تظاهر، آناتومی درناژ و اکتازی وریدی در ارزیابی خطر و برنامه‌ریزی درمان فردی نقش دارند.'
        ),
      },
      {
        title: L('DSA zur Therapieplanung', 'DSA for treatment planning', 'DSA برای برنامه‌ریزی درمان'),
        text: L(
          'MRT/CTA können die Diagnose nahelegen; die DSA dient als Referenz zur umfassenden Darstellung der Angioarchitektur und Therapieplanung.',
          'MRI/CTA can suggest the diagnosis; DSA is the reference examination for comprehensive angiographic characterization and treatment planning.',
          'MRI و CTA می‌توانند تشخیص را مطرح کنند؛ DSA روش مرجع برای بررسی جامع آنژیوآناتومی و برنامه‌ریزی درمان است.'
        ),
      },
    ],
  },
}

// ─── MCQ ─────────────────────────────────────────────────────────────────────

const TQ = [
  Q('01',
    L('Was ist der wichtigste strukturelle Unterschied zwischen einer duralen AV-Fistel (dAVF) und einer zerebralen AVM?',
      'What is the most important structural difference between a dural AV fistula (dAVF) and a cerebral AVM?',
      'مهم‌ترین تفاوت ساختاری بین فیستول AV دورال (dAVF) و AVM مغزی چیست؟'),
    [
      L('Die dAVF hat keinen Nidus.', 'The dAVF has no nidus.', 'dAVF نیدوس ندارد.'),
      L('Die dAVF liegt im Hirnparenchym.', 'The dAVF lies in the brain parenchyma.', 'dAVF در پارانشیم مغز قرار دارد.'),
      L('Die AVM ist immer erworben.', 'The AVM is always acquired.', 'AVM همیشه اکتسابی است.'),
      L('Die dAVF hat keinen venösen Abfluss.', 'The dAVF has no venous drainage.', 'dAVF درناژ وریدی ندارد.'),
    ], 0,
    L('Die dAVF ist eine direkte Fistelverbindung in der Dura mater ohne Nidus — das ist der Hauptunterschied zur AVM.',
      'The dAVF is a direct fistulous connection in the dura mater without a nidus — the main difference from AVM.',
      'dAVF یک اتصال فیستولی مستقیم در دورامتر بدون نیدوس است — تفاوت اصلی با AVM.')),

  Q('02',
    L('Welcher Cognard-Grad ist typischerweise konservativ behandelbar und hat ein niedriges Blutungsrisiko?',
      'Which Cognard grade is typically managed conservatively and carries a low haemorrhage risk?',
      'کدام درجه Cognard معمولاً به‌صورت محافظه‌کارانه قابل مدیریت است و خطر خونریزی پایینی دارد؟'),
    [
      L('Cognard I', 'Cognard I', 'Cognard I'),
      L('Cognard IIb', 'Cognard IIb', 'Cognard IIb'),
      L('Cognard III', 'Cognard III', 'Cognard III'),
      L('Cognard IV', 'Cognard IV', 'Cognard IV'),
    ], 0,
    L('Cognard I = antegrade Sinusdrainage ohne CVD. Das Management richtet sich nach Symptomen und individueller Beurteilung.',
      'Cognard I = antegrade sinus drainage without CVD. Management depends on symptoms and individualized assessment.',
      'Cognard I = درناژ آنتروگراد سینوس بدون CVD. مدیریت به علائم و ارزیابی فردی بستگی دارد.')),

  Q('03',
    L('Welcher Befund erhöht das Blutungsrisiko bei einer dAVF am stärksten?',
      'Which finding most significantly increases the haemorrhage risk in a dAVF?',
      'کدام یافته خطر خونریزی را در dAVF بیشتر افزایش می‌دهد؟'),
    [
      L('Kortikale venöse Drainage (CVD)', 'Cortical venous drainage (CVD)', 'درناژ وریدی کورتیکال (CVD)'),
      L('Sinusthrombose als Ursache', 'Sinus thrombosis as cause', 'ترومبوز سینوس به‌عنوان علت'),
      L('Lokalisation am Sinus transversus', 'Transverse sinus location', 'محل سینوس ترانسورسوس'),
      L('Pulssynchroner Tinnitus', 'Pulsatile tinnitus', 'تینیتوس سنکرون با نبض'),
    ], 0,
    L('CVD kommt bei Cognard IIb, IIa+b, III und IV vor; Grad V beschreibt spinalen venösen Abfluss.',
      'CVD occurs in Cognard IIb, IIa+b, III and IV; grade V describes spinal venous drainage.',
      'CVD در Cognard IIb، IIa+b، III و IV وجود دارد؛ درجه V درناژ وریدی نخاعی را توصیف می‌کند.')),

  Q('04',
    L('Welches bildgebende Verfahren ist der Goldstandard zur Diagnostik und Therapieplanung der dAVF?',
      'Which imaging modality is the gold standard for diagnosis and treatment planning of dAVF?',
      'کدام روش تصویربرداری استاندارد طلایی برای تشخیص و برنامه‌ریزی درمان dAVF است؟'),
    [
      L('Digitale Subtraktionsangiographie (DSA)', 'Digital subtraction angiography (DSA)', 'آنژیوگرافی تفریق دیجیتال (DSA)'),
      L('MRT mit Gadolinium', 'MRI with gadolinium', 'MRI با گادولینیوم'),
      L('CTA', 'CTA', 'CTA'),
      L('TOF-MRA', 'TOF-MRA', 'TOF-MRA'),
    ], 0,
    L('Die DSA ist die Referenz zur umfassenden Darstellung von Fistelpunkt, Feeder und venösem Drainagemuster als Grundlage der Therapieplanung.',
      'DSA is the reference examination for comprehensive depiction of fistula point, feeders and venous drainage as a basis for treatment planning.',
      'DSA روش مرجع برای نمایش جامع نقطه فیستول، تغذیه‌کنندگان و الگوی درناژ وریدی برای برنامه‌ریزی درمان است.')),

  Q('05',
    L('Welches Symptom ist typisch für eine Sinus-transversus-dAVF?',
      'Which symptom is typical of a transverse sinus dAVF?',
      'کدام علامت برای dAVF سینوس ترانسورسوس تیپیک است؟'),
    [
      L('Pulssynchroner Tinnitus', 'Pulsatile tinnitus', 'تینیتوس سنکرون با نبض'),
      L('Exophthalmus und Chemose', 'Proptosis and chemosis', 'اگزوفتالموس و کموز'),
      L('Zerebelläre Ataxie', 'Cerebellar ataxia', 'آتاکسی مخچه‌ای'),
      L('Bitemporal Hemianopsie', 'Bitemporal hemianopia', 'همیانوپسی بیتمپورال'),
    ], 0,
    L('Die Sinus-transversus-dAVF drainiert retrograd in die Jugularvene → Turbulenzgeräusch = pulssynchroner Tinnitus.',
      'Transverse sinus dAVF drains retrogradely into the jugular vein → turbulent flow = pulsatile tinnitus.',
      'dAVF سینوس ترانسورسوس به‌صورت رتروگراد به ورید ژوگولار تخلیه می‌کند → صدای توربولانس = تینیتوس سنکرون با نبض.')),

  Q('06',
    L('Eine Patientin klagt über Exophthalmus, Chemose, Rötung des Auges und Visusstörung. Welche dAVF-Lokalisation ist am wahrscheinlichsten?',
      'A patient presents with proptosis, chemosis, ocular redness and visual disturbance. Which dAVF location is most likely?',
      'بیماری با اگزوفتالموس، کموز، قرمزی چشم و اختلال بینایی مراجعه می‌کند. کدام محل dAVF محتمل‌تر است؟'),
    [
      L('Sinus cavernosus', 'Cavernous sinus', 'سینوس کاورنوسوس'),
      L('Sinus transversus', 'Transverse sinus', 'سینوس ترانسورسوس'),
      L('Sinus sagittalis superior', 'Superior sagittal sinus', 'سینوس ساژیتال فوقانی'),
      L('Tentorium cerebelli', 'Tentorium cerebelli', 'تنتوریوم سربلی'),
    ], 0,
    L('Sinus-cavernosus-dAVF: Arterialisierung des Sinus → Stauung der Augenvene → Exophthalmus, Chemose, Visusstörung.',
      'Cavernous sinus dAVF: arterialisation of the sinus → orbital vein congestion → proptosis, chemosis, visual disturbance.',
      'dAVF سینوس کاورنوسوس: شریانی‌شدن سینوس → احتقان ورید اوربیتال → اگزوفتالموس، کموز، اختلال بینایی.')),

  Q('07',
    L('Welcher Mechanismus ist bei der Entstehung einer erworbenen duralen AV-Fistel gut belegt?',
      'Which mechanism is well recognised in the development of an acquired dural arteriovenous fistula?',
      'کدام مکانیسم در ایجاد فیستول شریانی‌وریدی دورال اکتسابی به‌خوبی شناخته شده است؟'),
    [
      L('Sinusthrombose mit nachfolgender Neovaskularisation', 'Sinus thrombosis with subsequent neovascularisation', 'ترومبوز سینوس با نئووسکولاریزاسیون بعدی'),
      L('Embolische Okklusion einer kortikalen Arterie', 'Embolic occlusion of a cortical artery', 'انسداد آمبولیک یک شریان کورتیکال'),
      L('Ruptur eines sakkulären Aneurysmas in einen venösen Sinus', 'Rupture of a saccular aneurysm into a venous sinus', 'پارگی آنوریسم ساکولار به داخل سینوس وریدی'),
      L('Thrombose einer Entwicklungsvenenanomalie', 'Thrombosis of a developmental venous anomaly', 'ترومبوز آنومالی وریدی تکاملی'),
    ], 0,
    L('Die Ursache bleibt bei vielen dAVF unklar. Sinusthrombose und venöse Hypertension sind jedoch gut belegte Assoziationen: venöser Rückstau kann Angiogenese und die Öffnung duraler arteriovenöser Verbindungen fördern.',
      'The cause remains unclear in many dAVFs. Sinus thrombosis and venous hypertension are well-recognised associations: venous congestion can promote angiogenesis and opening of dural arteriovenous channels.',
      'علت بسیاری از dAVFها نامشخص می‌ماند. با این حال ترومبوز سینوس و پرفشاری وریدی ارتباط شناخته‌شده‌ای دارند؛ احتقان وریدی می‌تواند آنژیوژنز و باز شدن ارتباطات شریانی‌وریدی دورال را تحریک کند.')),

  Q('08',
    L('Welche Therapie ist die erste Wahl bei einer symptomatischen dAVF mit kortikaler venöser Drainage?',
      'What is the first-line treatment for a symptomatic dAVF with cortical venous drainage?',
      'درمان انتخابی اول برای dAVF علامت‌دار با درناژ وریدی کورتیکال چیست؟'),
    [
      L('Endovaskuläre Embolisation (transarteriell oder transvenös)', 'Endovascular embolisation (transarterial or transvenous)', 'آمبولیزاسیون اندوواسکولار (ترانس‌شریانی یا ترانس‌وریدی)'),
      L('Strahlentherapie', 'Radiotherapy', 'پرتودرمانی'),
      L('Konservatives Abwarten', 'Conservative watch-and-wait', 'انتظار محافظه‌کارانه'),
      L('Kortikosteroide', 'Corticosteroids', 'کورتیکواستروئیدها'),
    ], 0,
    L('Endovaskuläre Embolisation (transarteriell oder transvenös) ist die Therapie der ersten Wahl. Transvenöse Okklusion des Sinus ist oft kurativ.',
      'Endovascular embolisation (transarterial or transvenous) is first-line treatment. Transvenous sinus occlusion is often curative.',
      'آمبولیزاسیون اندوواسکولار (ترانس‌شریانی یا ترانس‌وریدی) درمان انتخابی اول است. انسداد ترانس‌وریدی سینوس اغلب درمان‌کننده است.')),

  Q('09',
    L('Welches MRT-Zeichen ist typisch für eine kortikale venöse Drainage (CVD) bei dAVF?',
      'Which MRI finding is typical for cortical venous drainage (CVD) in dAVF?',
      'کدام یافته MRI برای درناژ وریدی کورتیکال (CVD) در dAVF تیپیک است؟'),
    [
      L('Pseudophlebitisches Muster (erweiterte, geschlängelte kortikale Venen) in SWI', 'Pseudophlebitic pattern (dilated, tortuous cortical veins) on SWI', 'الگوی سودوفلبیتیک (وریدهای کورتیکال گشاد و مارپیچ) در SWI'),
      L('Brush-like Enhancement in T1 C+', 'Brush-like enhancement on T1 C+', 'افزایش برس‌مانند در T1 C+'),
      L('Popcorn-Kern in T2', 'Popcorn core on T2', 'هسته پاپ‌کورنی در T2'),
      L('Diffusionsrestriktion in DWI', 'Diffusion restriction on DWI', 'محدودیت انتشار در DWI'),
    ], 0,
    L('Das pseudophlebitische Muster in SWI beschreibt erweiterte, geschlängelte kortikale Venen — Zeichen der CVD und damit hohen Blutungsrisikos.',
      'The pseudophlebitic pattern on SWI describes dilated, tortuous cortical veins — a sign of CVD and high haemorrhage risk.',
      'الگوی سودوفلبیتیک در SWI وریدهای کورتیکال گشاد و مارپیچ را توصیف می‌کند — علامت CVD و در نتیجه خطر بالای خونریزی.')),

  Q('10',
    L('Welche Feederarterie ist bei der dAVF am häufigsten beteiligt?',
      'Which feeder artery is most commonly involved in dAVF?',
      'کدام شریان تغذیه‌کننده اغلب در dAVF درگیر است؟'),
    [
      L('Äste der A. carotis externa', 'Branches of the external carotid artery', 'شاخه‌های شریان کاروتید خارجی'),
      L('A. cerebri media', 'Middle cerebral artery', 'شریان مغزی میانی'),
      L('A. vertebralis', 'Vertebral artery', 'شریان ورتبرال'),
      L('A. cerebri anterior', 'Anterior cerebral artery', 'شریان مغزی قدامی'),
    ], 0,
    L('Die meisten dAVF-Feeder stammen aus der A. carotis externa: A. meningea media, A. occipitalis, A. pharyngea ascendens.',
      'Most dAVF feeders come from the external carotid artery: middle meningeal, occipital and ascending pharyngeal arteries.',
      'اغلب تغذیه‌کنندگان dAVF از شریان کاروتید خارجی می‌آیند: شریان مننژ میانی، اکسیپیتال و فارنکس صعودی.')),

  Q('11',
    L('Welcher Cognard-Grad hat eine direkte kortikale venöse Drainage OHNE venöse Ektasie?',
      'Which Cognard grade has direct cortical venous drainage WITHOUT venous ectasia?',
      'کدام درجه Cognard درناژ وریدی کورتیکال مستقیم بدون اکتازی وریدی دارد؟'),
    [
      L('Cognard III', 'Cognard III', 'Cognard III'),
      L('Cognard IIa', 'Cognard IIa', 'Cognard IIa'),
      L('Cognard IV', 'Cognard IV', 'Cognard IV'),
      L('Cognard V', 'Cognard V', 'Cognard V'),
    ], 0,
    L('Cognard III = direkte CVD ohne venöse Ektasie. Cognard IV = CVD MIT venöser Ektasie (Varize).',
      'Cognard III = direct CVD without venous ectasia. Cognard IV = CVD WITH venous ectasia (varix).',
      'Cognard III = CVD مستقیم بدون اکتازی وریدی. Cognard IV = CVD با اکتازی وریدی (واریس).')),

  Q('12',
    L('Ein Patient mit bekannter dAVF entwickelt plötzlich eine T2-Hyperintensität im Marklager und fokale neurologische Defizite. Was ist der wahrscheinlichste Grund?',
      'A patient with known dAVF develops sudden T2 hyperintensity in the white matter and focal neurological deficits. What is the most likely cause?',
      'بیماری با dAVF شناخته‌شده به‌طور ناگهانی هایپراینتنسیتی T2 در ماده سفید و کسری‌های عصبی موضعی ایجاد می‌کند. محتمل‌ترین علت چیست؟'),
    [
      L('Venöse Stauungsenzephalopathie durch kortikale venöse Drainage', 'Venous congestive encephalopathy due to cortical venous drainage', 'آنسفالوپاتی احتقانی وریدی ناشی از درناژ وریدی کورتیکال'),
      L('Spontane Regression der Fistel', 'Spontaneous regression of the fistula', 'پسرفت خودبه‌خودی فیستول'),
      L('Ischämischer Schlaganfall in A.-cerebri-media-Territorium', 'Ischaemic stroke in MCA territory', 'سکته ایسکمیک در قلمرو شریان مغزی میانی'),
      L('Sinusitis als Auslöser', 'Sinusitis as trigger', 'سینوزیت به‌عنوان محرک'),
    ], 0,
    L('CVD → venöse Hypertension → diffuse T2-Hyperintensität (venöse Stauungsenzephalopathie) = Zeichen des hohen Blutungsrisikos.',
      'CVD → venous hypertension → diffuse T2 hyperintensity (venous congestive encephalopathy) = sign of high haemorrhage risk.',
      'CVD → پرفشاری وریدی → هایپراینتنسیتی منتشر T2 (آنسفالوپاتی احتقانی وریدی) = نشانه خطر بالای خونریزی.')),
]

export const DAVF_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, TQ.map(seed => ({
  id: `davf-${lang}-${seed.id}`,
  tags: ['davf', 'gefaessmalformationen', 'gehirn'],
  fach: 'gehirn',
  question: seed.question[lang],
  options: seed.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: typeof text === 'string' ? text : text[lang] })),
  correct: String.fromCharCode(65 + seed.correct),
  explanation: seed.explanation[lang],
}))]))

// ─── Flashcards ───────────────────────────────────────────────────────────────

const TF = [
  F('definition', L('Grundlagen', 'Basics', 'مبانی'),
    L('Was ist eine durale AV-Fistel (dAVF)?', 'What is a dural arteriovenous fistula (dAVF)?', 'فیستول دورال AV (dAVF) چیست؟'),
    L('Erworbene AV-Verbindung in der Dura mater — ohne Nidus.', 'Acquired AV connection in the dura mater — without a nidus.', 'اتصال AV اکتسابی در دورامتر — بدون نیدوس.'),
    L('Direkte Verbindung zwischen meningealen Arterien und einem duralen Sinus oder kortikaler Vene. Kein Nidus ist der wichtigste Unterschied zur AVM.', 'Direct connection between meningeal arteries and a dural sinus or cortical vein. No nidus is the key distinction from AVM.', 'اتصال مستقیم بین شریان‌های مننژیال و سینوس دورال یا ورید کورتیکال. نبود نیدوس مهم‌ترین تفاوت با AVM است.')),

  F('avm-unterschied', L('Grundlagen', 'Basics', 'مبانی'),
    L('Wichtigster Unterschied dAVF vs. AVM?', 'Most important difference dAVF vs. AVM?', 'مهم‌ترین تفاوت dAVF در مقابل AVM؟'),
    L('dAVF: kein Nidus, erworben. AVM: Nidus, meist kongenital.', 'dAVF: no nidus, acquired. AVM: nidus, mostly congenital.', 'dAVF: بدون نیدوس، اکتسابی. AVM: نیدوس، اغلب مادرزادی.'),
    L('Die AVM hat einen Nidus aus dysplastischen Gefäßen im Parenchym und ist meist kongenital. Die dAVF liegt in der Dura, hat keinen Nidus und entsteht fast immer erworben (z. B. durch Sinusthrombose).', 'AVM has a nidus of dysplastic parenchymal vessels and is mostly congenital. dAVF is dural, nidus-free and almost always acquired (e.g. by sinus thrombosis).', 'AVM نیدوسی از عروق دیسپلاستیک پارانشیمی دارد و اغلب مادرزادی است. dAVF دورال است، بدون نیدوس و تقریباً همیشه اکتسابی است (مثلاً از ترومبوز سینوس).')),

  F('aetiologie', L('Grundlagen', 'Basics', 'مبانی'),
    L('Häufigste Ursache einer dAVF?', 'Most common cause of dAVF?', 'شایع‌ترین علت dAVF؟'),
    L('Sinusthrombose mit Neovaskularisation.', 'Sinus thrombosis with neovascularisation.', 'ترومبوز سینوس با نئووسکولاریزاسیون.'),
    L('Sinusthrombose, Trauma, OP oder Infektion → venöse Druckerhöhung → Neovaskularisation → Fistelbildung. Die dAVF ist die erworbene Form der kranialen AV-Malformationen.', 'Sinus thrombosis, trauma, surgery or infection → increased venous pressure → neovascularisation → fistula formation. dAVF is the acquired form of cranial AV malformations.', 'ترومبوز سینوس، تروما، جراحی یا عفونت → افزایش فشار وریدی → نئووسکولاریزاسیون → تشکیل فیستول. dAVF فرم اکتسابی مالفورماسیون‌های AV جمجمه است.')),

  F('lokalisation', L('Grundlagen', 'Basics', 'مبانی'),
    L('Häufigste Lokalisation der dAVF?', 'Most common dAVF location?', 'شایع‌ترین محل dAVF؟'),
    L('Sinus transversus / sigmoideus.', 'Transverse / sigmoid sinus.', 'سینوس ترانسورسوس / سیگموئیدوس.'),
    L('Weitere Lokalisationen: Sinus cavernosus (meist indirekte durale Barrow-B–D-Fistel), Tentorium, Sinus sagittalis superior, Foramen magnum.', 'Other locations: cavernous sinus (usually an indirect dural Barrow B–D fistula), tentorium, superior sagittal sinus, foramen magnum.', 'محل‌های دیگر: سینوس کاورنوسوس (معمولاً فیستول دورال غیرمستقیم Barrow B–D)، تنتوریوم، سینوس ساژیتال فوقانی، فورامن ماگنوم.')),

  F('cognard-cvd', L('Klassifikation', 'Classification', 'طبقه‌بندی'),
    L('Was bedeutet CVD in der Cognard-Klassifikation?', 'What does CVD mean in the Cognard classification?', 'CVD در طبقه‌بندی Cognard چه معنایی دارد؟'),
    L('Kortikale venöse Drainage = Hochrisikofaktor.', 'Cortical venous drainage = high-risk factor.', 'درناژ وریدی کورتیکال = عامل خطر بالا.'),
    L('CVD bedeutet kortikalen venösen Reflux. Er liegt bei Cognard IIb, IIa+b, III und IV vor; Grad V beschreibt spinalen Abfluss.', 'CVD means cortical venous reflux. It occurs in Cognard IIb, IIa+b, III and IV; grade V describes spinal drainage.', 'CVD به معنای رفلاکس وریدی کورتیکال است. در درجات Cognard IIb، IIa+b، III و IV وجود دارد؛ درجه V درناژ نخاعی را توصیف می‌کند.')),

  F('cognard-grading', L('Klassifikation', 'Classification', 'طبقه‌بندی'),
    L('Welche Cognard-Grade weisen kortikale venöse Drainage auf?', 'Which Cognard grades have cortical venous drainage?', 'کدام درجات Cognard درناژ وریدی کورتیکال دارند؟'),
    L('IIb, IIa+b, III und IV.', 'IIb, IIa+b, III and IV.', 'IIb، IIa+b، III و IV.'),
    L('Grad V beschreibt spinalen venösen Abfluss und gehört nicht zur CVD-Gruppe. Therapieentscheidungen werden anhand von Angiographie und klinischem Risikoprofil individuell getroffen.', 'Grade V describes spinal venous drainage and is not part of the CVD group. Treatment decisions are individualized using angiography and the clinical risk profile.', 'درجه V درناژ وریدی نخاعی را توصیف می‌کند و جزو گروه CVD نیست. تصمیم درمان با توجه به آنژیوگرافی و پروفایل خطر بالینی فردی گرفته می‌شود.')),

  F('tinnitus', L('Klinik', 'Clinical', 'بالینی'),
    L('Welches Symptom ist klassisch für eine Sinus-transversus-dAVF?', 'Which symptom is classic for transverse sinus dAVF?', 'کدام علامت برای dAVF سینوس ترانسورسوس کلاسیک است؟'),
    L('Pulssynchroner Tinnitus.', 'Pulsatile tinnitus.', 'تینیتوس سنکرون با نبض.'),
    L('Die Fistel am Sinus transversus/sigmoideus leitet arterielles Blut in den Sinus → Turbulenzen → Tinnitus synchron mit dem Herzschlag. Meist einseitig.', 'The fistula at the transverse/sigmoid sinus routes arterial blood into the sinus → turbulence → tinnitus synchronous with heartbeat. Usually unilateral.', 'فیستول در سینوس ترانسورسوس/سیگموئیدوس خون شریانی را به سینوس هدایت می‌کند → توربولانس → تینیتوس سنکرون با ضربان قلب. معمولاً یک‌طرفه.')),

  F('cavernosus', L('Klinik', 'Clinical', 'بالینی'),
    L('Typische Symptomtrias der Sinus-cavernosus-dAVF?', 'Typical symptom triad of cavernous sinus dAVF?', 'تریاد علائم تیپیک dAVF سینوس کاورنوسوس؟'),
    L('Exophthalmus, Chemose, Visusstörung.', 'Proptosis, chemosis, visual disturbance.', 'اگزوفتالموس، کموز، اختلال بینایی.'),
    L('Die Arterialisierung des Sinus cavernosus erhöht den Druck in der V. ophthalmika → Stauung → Exophthalmus, Chemose, Rötung, Visusstörung. Auch Ptosis und Doppelbilder möglich.', 'Arterialisation of the cavernous sinus raises ophthalmic vein pressure → congestion → proptosis, chemosis, redness, visual disturbance. Ptosis and diplopia also possible.', 'شریانی‌شدن سینوس کاورنوسوس فشار ورید چشمی را افزایش می‌دهد → احتقان → اگزوفتالموس، کموز، قرمزی، اختلال بینایی. پتوز و دیپلوپی نیز ممکن است.')),

  F('mrt-befunde', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Welcher T2-Befund deutet auf eine venöse Stauungsenzephalopathie bei dAVF?', 'Which T2 finding suggests venous congestive encephalopathy in dAVF?', 'کدام یافته T2 به آنسفالوپاتی احتقانی وریدی در dAVF اشاره دارد؟'),
    L('Diffuse T2-Hyperintensität im Marklager.', 'Diffuse T2 hyperintensity in the white matter.', 'هایپراینتنسیتی منتشر T2 در ماده سفید.'),
    L('Bei kortikaler venöser Drainage steigt der venöse Druck → venöse Hypertension im Parenchym → T2-Hyperintensität (vasogenes Ödem) + neurologische Defizite. Zeigt Notfallbedarf an!', 'With cortical venous drainage, venous pressure rises → parenchymal venous hypertension → T2 hyperintensity (vasogenic oedema) + neurological deficits. Signals an emergency!', 'با درناژ وریدی کورتیکال، فشار وریدی افزایش می‌یابد → فشار خون وریدی پارانشیمی → هایپراینتنسیتی T2 (ادم واژوژنیک) + کسری‌های عصبی. نشانه اورژانس!')),

  F('pseudophlebitisch', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Was ist das "pseudophlebitische Muster" in der MRT?', 'What is the "pseudophlebitic pattern" on MRI?', 'الگوی "سودوفلبیتیک" در MRI چیست؟'),
    L('Erweiterte, geschlängelte kortikale Venen in SWI = Zeichen der CVD.', 'Dilated, tortuous cortical veins on SWI = sign of CVD.', 'وریدهای کورتیکال گشاد و مارپیچ در SWI = علامت CVD.'),
    L('In SWI/T2* erscheinen erweiterte, arterialisierte kortikale Venen als schlängelnde hypointense Strukturen. Dies ist ein wichtiger MRT-Hinweis auf CVD und damit auf hohes Blutungsrisiko.', 'On SWI/T2*, dilated arterialized cortical veins appear as serpentine hypointense structures. This is an important MRI clue to CVD and thereby high haemorrhage risk.', 'در SWI/T2*، وریدهای کورتیکال گشاد و شریانی‌شده به صورت ساختارهای هیپواینتنس مارپیچ ظاهر می‌شوند. این نشانه MRI مهمی از CVD و در نتیجه خطر بالای خونریزی است.')),

  F('dsa', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Warum ist DSA die Referenzuntersuchung bei dAVF?', 'Why is DSA the reference examination for dAVF?', 'چرا DSA روش مرجع بررسی dAVF است؟'),
    L('Referenzstandard zur vollständigen Charakterisierung von Fistelpunkt, Feeder und Drainagemuster.', 'Reference standard for full characterization of fistula point, feeders and drainage pattern.', 'استاندارد مرجع برای مشخص‌کردن کامل نقطه فیستول، تغذیه‌کنندگان و الگوی درناژ.'),
    L('MRT und CTA können einen Verdacht liefern; DSA ist die Referenz zur umfassenden Charakterisierung von Fistelpunkt, Feeder und Drainagemuster sowie für die Therapieplanung.', 'MRI and CTA can raise suspicion; DSA is the reference examination for comprehensive characterization of fistula point, feeders and drainage pattern and for treatment planning.', 'MRI و CTA می‌توانند شک ایجاد کنند؛ DSA روش مرجع برای مشخص‌کردن جامع نقطه فیستول، تغذیه‌کنندگان و الگوی درناژ و برنامه‌ریزی درمان است.')),

  F('feeder', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Aus welchen Arterien stammen die meisten dAVF-Feeder?', 'From which arteries do most dAVF feeders arise?', 'اغلب تغذیه‌کنندگان dAVF از کدام شریان‌ها می‌آیند؟'),
    L('Äste der A. carotis externa (A. meningea media, A. occipitalis).', 'External carotid artery branches (middle meningeal, occipital arteries).', 'شاخه‌های شریان کاروتید خارجی (مننژ میانی، اکسیپیتال).'),
    L('Die häufigsten Feeder sind: A. meningea media, A. occipitalis, A. pharyngea ascendens — alle aus der A. carotis externa. Gelegentlich auch Äste der A. carotis interna oder A. vertebralis beteiligt.', 'The most common feeders are: middle meningeal, occipital, ascending pharyngeal arteries — all from the external carotid. Branches from the internal carotid or vertebral arteries may also contribute.', 'شایع‌ترین تغذیه‌کنندگان: شریان مننژ میانی، اکسیپیتال، فارنکس صعودی — همه از کاروتید خارجی. شاخه‌های کاروتید داخلی یا ورتبرال نیز ممکن است مشارکت داشته باشند.')),

  F('therapie', L('Management', 'Management', 'مدیریت'),
    L('Erste Wahl bei dAVF mit CVD?', 'First-line treatment for dAVF with CVD?', 'درمان انتخابی اول برای dAVF با CVD؟'),
    L('Endovaskuläre Embolisation (transvenös oder transarteriell).', 'Endovascular embolisation (transvenous or transarterial).', 'آمبولیزاسیون اندوواسکولار (ترانس‌وریدی یا ترانس‌شریانی).'),
    L('Transvenöse Okklusion des Sinussegments ist oft kurativ. Transarterielle Embolisation der Feeder kann ergänzend sein. Mikrochirurgie bei nicht erreichbaren Fisteln als Alternative.', 'Transvenous occlusion of the sinus segment is often curative. Transarterial feeder embolisation may be complementary. Microsurgery for inaccessible fistulas as an alternative.', 'انسداد ترانس‌وریدی سگمان سینوس اغلب درمان‌کننده است. آمبولیزاسیون ترانس‌شریانی تغذیه‌کنندگان می‌تواند تکمیلی باشد. میکروجراحی برای فیستول‌های غیرقابل‌دسترس به‌عنوان جایگزین.')),

  F('konservativ', L('Management', 'Management', 'مدیریت'),
    L('Wann ist konservatives Management bei dAVF akzeptabel?', 'When is conservative management acceptable in dAVF?', 'چه زمانی مدیریت محافظه‌کارانه در dAVF قابل قبول است؟'),
    L('Nur bei Cognard I (kein CVD, asymptomatisch oder Tinnitus).', 'Only for Cognard I (no CVD, asymptomatic or tinnitus only).', 'فقط برای Cognard I (بدون CVD، بدون علامت یا فقط تینیتوس).'),
    L('Cognard I hat antegrade Sinusdrainage ohne CVD. Management und Verlaufskontrolle richten sich nach Symptomen und individueller Beurteilung.', 'Cognard I has antegrade sinus drainage without CVD. Management and follow-up depend on symptoms and individualized assessment.', 'Cognard I درناژ آنتروگراد سینوس بدون CVD دارد. مدیریت و پیگیری بر اساس علائم و ارزیابی فردی است.')),
]

export const DAVF_FLASHCARDS = TF.map((item, index) => ({
  id: `davf-${String(index + 1).padStart(2, '0')}-${item.id}`,
  topicId: 'davf',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
}))

export const DAVF_FLASHCARD_TOPIC = {
  id: 'davf',
  area: 'Kopf',
  chapter: 'Vaskuläre Erkrankungen',
  icon: '🔗',
  iconImage: '/fach/gehirn.png',
  color: '#dc2626',
  href: '/flashcards/davf',
  title: L('Durale AV-Fistel (dAVF)', 'Dural Arteriovenous Fistula (dAVF)', 'فیستول دورال AV (dAVF)'),
  subtitle: L('Cognard-Klassifikation · CVD · DSA · Embolisation · Differenzialdiagnose', 'Cognard classification · CVD · DSA · embolisation · differential', 'طبقه‌بندی Cognard · CVD · DSA · آمبولیزاسیون · افتراقی'),
}
