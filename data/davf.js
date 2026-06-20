const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })
const F = (id, category, front, answer, explanation) => ({ id, category, front, answer, explanation })

export const DAVF_LESSON = {
  breadcrumb: L('Durale AV-Fistel (dAVF)', 'Dural Arteriovenous Fistula (dAVF)', 'فیستول شریانی-وریدی دورال (dAVF)'),
  title: L('Durale AV-Fistel (dAVF)', 'Dural Arteriovenous Fistula (dAVF)', 'فیستول شریانی-وریدی دورال (dAVF)'),
  definition: L(
    'Erworbene arteriovenöse Verbindung innerhalb der Dura mater zwischen meningealen Arterien und einem duralen Sinus oder kortikaler Vene — ohne Nidus.',
    'Acquired arteriovenous connection within the dura mater between meningeal arteries and a dural sinus or cortical vein — without a nidus.',
    'اتصال شریانی-وریدی اکتسابی درون دورامتر بین شریان‌های مننژیال و سینوس دورال یا ورید کورتیکال — بدون نیدوس.'
  ),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Warning', 'هشدار'),
  toc: L('Inhalte', 'Contents', 'فهرست'),

  heroCards: [
    {
      value: L('Erworben', 'Acquired', 'اکتسابی'),
      label: L('im Gegensatz zur AVM', 'unlike AVM', 'بر خلاف AVM'),
      text: L('Sinusthrombose, Trauma oder Infektion als Auslöser', 'Sinus thrombosis, trauma or infection as triggers', 'ترومبوز سینوس، تروما یا عفونت به‌عنوان محرک'),
    },
    {
      value: L('Kein Nidus', 'No nidus', 'بدون نیدوس'),
      label: L('Wichtigster AVM-Unterschied', 'Key difference from AVM', 'تفاوت اصلی با AVM'),
      text: L('Direkte Fistelverbindung ohne Nidus', 'Direct fistulous connection without a nidus', 'اتصال مستقیم فیستولی بدون نیدوس'),
    },
    {
      value: L('DSA', 'DSA', 'DSA'),
      label: L('Goldstandard', 'Gold standard', 'استاندارد طلایی'),
      text: L('Direkter Fistelpunkt + Feeder-Darstellung', 'Direct fistula point + feeder anatomy', 'نقطه مستقیم فیستول + تغذیه‌کنندگان'),
    },
  ],

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
          'Auftreten meist im Erwachsenenalter (40.–60. Lebensjahr). Häufigste Lokalisation: Sinus transversus / sigmoideus. Sinus cavernosus als Sonderform (Carotis-Cavernosus-Fistel).',
          'Typically presents in adulthood (4th–6th decade). Most common location: transverse/sigmoid sinus. Cavernous sinus is a special variant (carotid-cavernous fistula).',
          'معمولاً در بزرگسالی (دهه ۴–۶ زندگی) رخ می‌دهد. شایع‌ترین محل: سینوس ترانسورسوس/سیگموئیدوس. سینوس کاورنوسوس به‌عنوان نوع خاص (فیستول کاروتید-کاورنوسوس).'
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
      'Die Symptome hängen entscheidend vom Drainagemuster ab — kortikale venöse Drainage bedeutet hohes Blutungsrisiko.',
      'Symptoms depend critically on the drainage pattern — cortical venous drainage means high haemorrhage risk.',
      'علائم به‌طور تعیین‌کننده به الگوی درناژ بستگی دارد — درناژ وریدی کورتیکال خطر خونریزی بالا را نشان می‌دهد.'
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
        L('Hoch! (Cognard IIb–V)', 'High! (Cognard IIb–V)', 'بالا! (Cognard IIb–V)'),
      ],
    ],
    cave: L(
      'Kortikale venöse Drainage (CVD) ist der wichtigste Risikofaktor — sie definiert Cognard IIb und höher und erhöht das jährliche Blutungsrisiko auf bis zu 10 %.',
      'Cortical venous drainage (CVD) is the most important risk factor — it defines Cognard IIb and above and raises annual haemorrhage risk to up to 10%.',
      'درناژ وریدی کورتیکال (CVD) مهم‌ترین عامل خطر است — Cognard IIb و بالاتر را تعریف می‌کند و خطر سالانه خونریزی را تا ۱۰٪ افزایش می‌دهد.'
    ),
  },

  cognard: {
    title: L('Cognard-Klassifikation', 'Cognard Classification', 'طبقه‌بندی Cognard'),
    lead: L(
      'Die Cognard-Klassifikation beschreibt das venöse Drainagemuster und damit das Blutungsrisiko. Kortikale venöse Drainage (CVD) ist der entscheidende Hochrisikofaktor.',
      'The Cognard classification describes the venous drainage pattern and thereby the haemorrhage risk. Cortical venous drainage (CVD) is the decisive high-risk factor.',
      'طبقه‌بندی Cognard الگوی درناژ وریدی و در نتیجه خطر خونریزی را توصیف می‌کند. درناژ وریدی کورتیکال (CVD) عامل خطر کلیدی است.'
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
        L('Niedrig (~2 %/Jahr) → konservativ', 'Low (~2%/year) → conservative', 'پایین (~۲٪/سال) → محافظه‌کارانه'),
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
        L('Hoch (~10 %/Jahr) — Therapie indiziert', 'High (~10%/year) — treatment indicated', 'بالا (~۱۰٪/سال) — درمان اندیکاسیون دارد'),
      ],
      [
        'IV',
        L('Direkte CVD + venöse Ektasie (Varize)', 'Direct CVD + venous ectasia (varix)', 'CVD مستقیم + اکتازی وریدی (واریس)'),
        L('Sehr hoch (~10 %/Jahr) — dringende Therapie', 'Very high (~10%/year) — urgent treatment', 'بسیار بالا (~۱۰٪/سال) — درمان فوری'),
      ],
      [
        'V',
        L('Spinale venöse Drainage', 'Spinal venous drainage', 'درناژ وریدی نخاعی'),
        L('Progressives Myelopathierisiko', 'Progressive myelopathy risk', 'خطر میلوپاتی پیشرونده'),
      ],
    ],
    key: L(
      'CVD = kortikale venöse Drainage. Ab Cognard IIb: CVD vorhanden → hohes Blutungsrisiko → Therapie erforderlich!',
      'CVD = cortical venous drainage. From Cognard IIb onwards: CVD present → high haemorrhage risk → treatment required!',
      'CVD = درناژ وریدی کورتیکال. از Cognard IIb به بعد: CVD وجود دارد → خطر خونریزی بالا → درمان لازم!'
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
        L('Einzige Methode zur Darstellung des genauen Fistelpunkts und zur Therapieplanung', 'Only method to show the exact fistula point and plan treatment', 'تنها روش برای نمایش نقطه دقیق فیستول و برنامه‌ریزی درمان'),
      ],
    ],
    key: L(
      'Pseudophlebitisches Muster in SWI = geschlängelte kortikale Venen = Zeichen der CVD. DSA ist Pflicht vor Therapie.',
      'Pseudophlebitic pattern on SWI = tortuous cortical veins = sign of CVD. DSA is mandatory before treatment.',
      'الگوی سودوفلبیتیک در SWI = وریدهای کورتیکال مارپیچ = علامت CVD. DSA قبل از درمان اجباری است.'
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
        L('Direkter Traumariss der ICA in den Sinus cavernosus; hochfluss; sofortige dramatische Symptome', 'Direct traumatic tear of ICA into cavernous sinus; high flow; immediate dramatic symptoms', 'پارگی تروماتیک مستقیم ICA به سینوس کاورنوسوس؛ پرجریان؛ علائم دراماتیک فوری'),
      ],
      [
        L('Sinusthrombose', 'Sinus thrombosis', 'ترومبوز سینوس'),
        L('Kann Ursache oder Folge der dAVF sein; kein arterieller Fluss im Sinus in TOF-MRA; kein früher arterieller Sinusnachfluss', 'Can be cause or consequence of dAVF; no arterial flow in sinus on TOF-MRA; no early arterial sinus filling', 'می‌تواند علت یا عارضه dAVF باشد؛ بدون جریان شریانی در سینوس در TOF-MRA؛ بدون پُرشدگی زودرس شریانی سینوس'),
      ],
      [
        L('Venöse Stauungsenzephalopathie (andere Ursachen)', 'Venous congestive encephalopathy (other causes)', 'آنسفالوپاتی احتقانی وریدی (علل دیگر)'),
        L('Diffuse T2-Hyperintensität ohne erkennbare Fistel; Ausschluss durch DSA', 'Diffuse T2 hyperintensity without identifiable fistula; exclude with DSA', 'هایپراینتنسیتی T2 弥漫ohne شناسایی فیستول؛ رد با DSA'),
      ],
    ],
  },

  management: {
    title: L('Management & Therapie', 'Management & Treatment', 'مدیریت و درمان'),
    lead: L(
      'Die Therapiestrategie hängt vom Cognard-Grad ab. Kortikale venöse Drainage ist immer eine Therapieindikation.',
      'Treatment strategy depends on the Cognard grade. Cortical venous drainage always indicates treatment.',
      'استراتژی درمان به درجه Cognard بستگی دارد. درناژ وریدی کورتیکال همیشه اندیکاسیون درمان است.'
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
      'Cognard IIb und höher (CVD vorhanden) = immer Therapie. Jährliches Blutungsrisiko 10 % bei Cognard III–IV — kein Abwarten!',
      'Cognard IIb and above (CVD present) = always treat. Annual haemorrhage risk is 10% for Cognard III–IV — do not wait!',
      'Cognard IIb و بالاتر (CVD وجود دارد) = همیشه درمان کنید. خطر سالانه خونریزی ۱۰٪ برای Cognard III–IV — منتظر نمانید!'
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
        title: L('CVD = Hochrisiko = Therapie', 'CVD = high risk = treat', 'CVD = خطر بالا = درمان'),
        text: L(
          'Kortikale venöse Drainage (CVD) ist der entscheidende Risikofaktor. Ab Cognard IIb: CVD vorhanden → jährliches Blutungsrisiko bis 10 % → immer behandeln.',
          'Cortical venous drainage (CVD) is the decisive risk factor. From Cognard IIb: CVD present → annual haemorrhage risk up to 10% → always treat.',
          'درناژ وریدی کورتیکال (CVD) عامل خطر تعیین‌کننده است. از Cognard IIb به بعد: CVD وجود دارد → خطر سالانه خونریزی تا ۱۰٪ → همیشه درمان کنید.'
        ),
      },
      {
        title: L('DSA vor Therapie obligat', 'DSA mandatory before treatment', 'DSA قبل از درمان اجباری'),
        text: L(
          'MRT/CTA können die Diagnose nahelegen, aber nur die DSA zeigt den genauen Fistelpunkt, alle Feeder und das venöse Drainagemuster — Pflicht vor Embolisation oder OP.',
          'MRI/CTA can suggest the diagnosis, but only DSA shows the exact fistula point, all feeders and the venous drainage pattern — mandatory before embolisation or surgery.',
          'MRI/CTA می‌توانند تشخیص را مطرح کنند، اما فقط DSA نقطه دقیق فیستول، تمام تغذیه‌کنندگان و الگوی درناژ وریدی را نشان می‌دهد — قبل از آمبولیزاسیون یا جراحی اجباری.'
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
    L('Cognard I = antegrade Drainage in den Sinus, kein CVD, niedriges Blutungsrisiko (~2 %/Jahr).',
      'Cognard I = antegrade drainage into sinus, no CVD, low haemorrhage risk (~2%/year).',
      'Cognard I = درناژ آنتروگراد به سینوس، بدون CVD، خطر پایین خونریزی (~۲٪/سال).')),

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
    L('CVD (kortikale venöse Drainage) ist der entscheidende Risikofaktor — ab Cognard IIb, Blutungsrisiko bis 10 %/Jahr.',
      'CVD (cortical venous drainage) is the decisive risk factor — from Cognard IIb onwards, haemorrhage risk up to 10%/year.',
      'CVD (درناژ وریدی کورتیکال) عامل خطر تعیین‌کننده است — از Cognard IIb به بعد، خطر خونریزی تا ۱۰٪/سال.')),

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
    L('Nur die DSA zeigt den genauen Fistelpunkt, alle Feeder und das venöse Drainagemuster — obligat vor Embolisation.',
      'Only DSA shows the exact fistula point, all feeders and the venous drainage pattern — mandatory before embolisation.',
      'فقط DSA نقطه دقیق فیستول، تمام تغذیه‌کنندگان و الگوی درناژ وریدی را نشان می‌دهد — اجباری قبل از آمبولیزاسیون.')),

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
    L('Was ist die häufigste Ursache für die Entstehung einer duralen AV-Fistel?',
      'What is the most common cause of dural arteriovenous fistula formation?',
      'شایع‌ترین علت تشکیل فیستول دورال AV چیست؟'),
    [
      L('Sinusthrombose mit nachfolgender Neovaskularisation', 'Sinus thrombosis with subsequent neovascularisation', 'ترومبوز سینوس با نئووسکولاریزاسیون بعدی'),
      L('Kongenitale Gefäßfehlbildung wie AVM', 'Congenital vascular malformation like AVM', 'مالفورماسیون عروقی مادرزادی مثل AVM'),
      L('Spontane Ruptur eines Aneurysmas', 'Spontaneous aneurysm rupture', 'پارگی خودبه‌خودی آنوریسم'),
      L('Venöse Angiome', 'Venous angiomas', 'آنژیوم‌های وریدی'),
    ], 0,
    L('Die dAVF ist meist erworben: Sinusthrombose → venöser Rückstau → Neovaskularisation → Fistelbildung.',
      'dAVF is mostly acquired: sinus thrombosis → venous back-pressure → neovascularisation → fistula formation.',
      'dAVF اغلب اکتسابی است: ترومبوز سینوس → فشار برگشتی وریدی → نئووسکولاریزاسیون → تشکیل فیستول.')),

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
      'CVD → فشار خون وریدی → هایپراینتنسیتی T2 弥漫 (آنسفالوپاتی احتقانی وریدی) = علامت خطر بالای خونریزی.')),
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
    L('Weitere Lokalisationen: Sinus cavernosus (Carotis-Cavernosus-Fistel als Sonderform), Tentorium, Sinus sagittalis superior, Foramen magnum.', 'Other locations: cavernous sinus (carotid-cavernous fistula as special variant), tentorium, superior sagittal sinus, foramen magnum.', 'محل‌های دیگر: سینوس کاورنوسوس (فیستول کاروتید-کاورنوسوس به‌عنوان نوع خاص)، تنتوریوم، سینوس ساژیتال فوقانی، فورامن ماگنوم.')),

  F('cognard-cvd', L('Klassifikation', 'Classification', 'طبقه‌بندی'),
    L('Was bedeutet CVD in der Cognard-Klassifikation?', 'What does CVD mean in the Cognard classification?', 'CVD در طبقه‌بندی Cognard چه معنایی دارد؟'),
    L('Kortikale venöse Drainage = Hochrisikofaktor.', 'Cortical venous drainage = high-risk factor.', 'درناژ وریدی کورتیکال = عامل خطر بالا.'),
    L('CVD (cortical venous drainage) bedeutet, dass das Blut direkt in kortikale Venen drainiert statt in den Sinus. Dies erhöht den venösen Druck im Parenchym und das Blutungsrisiko massiv. Ab Cognard IIb ist CVD vorhanden.', 'CVD means blood drains directly into cortical veins rather than the sinus. This massively increases venous pressure in the parenchyma and haemorrhage risk. CVD is present from Cognard IIb onwards.', 'CVD به این معناست که خون مستقیماً به وریدهای کورتیکال تخلیه می‌شود نه به سینوس. این فشار وریدی در پارانشیم و خطر خونریزی را به‌شدت افزایش می‌دهد. CVD از Cognard IIb به بعد وجود دارد.')),

  F('cognard-grading', L('Klassifikation', 'Classification', 'طبقه‌بندی'),
    L('Ab welchem Cognard-Grad ist immer eine Therapie indiziert?', 'From which Cognard grade is treatment always indicated?', 'از کدام درجه Cognard درمان همیشه اندیکاسیون دارد؟'),
    L('Ab Cognard IIb (CVD vorhanden).', 'From Cognard IIb onwards (CVD present).', 'از Cognard IIb به بعد (CVD وجود دارد).'),
    L('Cognard I (kein CVD) kann konservativ beobachtet werden. Ab IIb ist CVD vorhanden → hohes Blutungsrisiko → Embolisation oder OP. Cognard III–IV: Blutungsrisiko ~10 %/Jahr.', 'Cognard I (no CVD) may be observed conservatively. From IIb CVD is present → high haemorrhage risk → embolisation or surgery. Cognard III–IV: ~10%/year haemorrhage risk.', 'Cognard I (بدون CVD) می‌تواند به‌صورت محافظه‌کارانه مشاهده شود. از IIb CVD وجود دارد → خطر خونریزی بالا → آمبولیزاسیون یا جراحی. Cognard III–IV: خطر ~۱۰٪/سال.')),

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
    L('Diffuse T2-Hyperintensität im Marklager.', 'Diffuse T2 hyperintensity in the white matter.', 'هایپراینتنسیتی T2 弥漫 در ماده سفید.'),
    L('Bei kortikaler venöser Drainage steigt der venöse Druck → venöse Hypertension im Parenchym → T2-Hyperintensität (vasogenes Ödem) + neurologische Defizite. Zeigt Notfallbedarf an!', 'With cortical venous drainage, venous pressure rises → parenchymal venous hypertension → T2 hyperintensity (vasogenic oedema) + neurological deficits. Signals an emergency!', 'با درناژ وریدی کورتیکال، فشار وریدی افزایش می‌یابد → فشار خون وریدی پارانشیمی → هایپراینتنسیتی T2 (ادم واژوژنیک) + کسری‌های عصبی. نشانه اورژانس!')),

  F('pseudophlebitisch', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Was ist das "pseudophlebitische Muster" in der MRT?', 'What is the "pseudophlebitic pattern" on MRI?', 'الگوی "سودوفلبیتیک" در MRI چیست؟'),
    L('Erweiterte, geschlängelte kortikale Venen in SWI = Zeichen der CVD.', 'Dilated, tortuous cortical veins on SWI = sign of CVD.', 'وریدهای کورتیکال گشاد و مارپیچ در SWI = علامت CVD.'),
    L('In SWI/T2* erscheinen erweiterte, arterialisierte kortikale Venen als schlängelnde hypointense Strukturen. Dies ist ein wichtiger MRT-Hinweis auf CVD und damit auf hohes Blutungsrisiko.', 'On SWI/T2*, dilated arterialized cortical veins appear as serpentine hypointense structures. This is an important MRI clue to CVD and thereby high haemorrhage risk.', 'در SWI/T2*، وریدهای کورتیکال گشاد و شریانی‌شده به صورت ساختارهای هیپواینتنس مارپیچ ظاهر می‌شوند. این نشانه MRI مهمی از CVD و در نتیجه خطر بالای خونریزی است.')),

  F('dsa', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Warum ist DSA der Goldstandard bei dAVF?', 'Why is DSA the gold standard for dAVF?', 'چرا DSA استاندارد طلایی برای dAVF است؟'),
    L('Einzige Methode, die Fistelpunkt, alle Feeder und Drainagemuster zeigt.', 'Only method showing fistula point, all feeders and drainage pattern.', 'تنها روشی که نقطه فیستول، همه تغذیه‌کنندگان و الگوی درناژ را نشان می‌دهد.'),
    L('MRT und CTA können einen Verdacht liefern, aber nur die DSA zeigt: 1. Genauen Fistelpunkt, 2. Alle arteriellen Feeder, 3. Vollständiges venöses Drainagemuster → Grundlage für Therapieplanung.', 'MRI and CTA can raise suspicion but only DSA shows: 1. Exact fistula point, 2. All arterial feeders, 3. Complete venous drainage pattern → basis for treatment planning.', 'MRI و CTA می‌توانند شک ایجاد کنند اما فقط DSA نشان می‌دهد: ۱. نقطه دقیق فیستول، ۲. همه تغذیه‌کنندگان شریانی، ۳. الگوی کامل درناژ وریدی → پایه برنامه‌ریزی درمان.')),

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
    L('Cognard I hat antegrade Sinusdrainage ohne CVD und ein niedriges Blutungsrisiko (~2 %/Jahr). Engmaschige Bildgebungskontrollen. Ab Cognard IIb ist CVD vorhanden → sofortige Therapie.', 'Cognard I has antegrade sinus drainage without CVD and low haemorrhage risk (~2%/year). Close imaging follow-up. From Cognard IIb CVD is present → immediate treatment.', 'Cognard I درناژ آنتروگراد سینوس بدون CVD و خطر پایین خونریزی (~۲٪/سال) دارد. پیگیری تصویربرداری منظم. از Cognard IIb CVD وجود دارد → درمان فوری.')),
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
