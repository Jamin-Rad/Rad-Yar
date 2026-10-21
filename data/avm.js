const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })
const F = (id, category, front, answer, explanation) => ({ id, category, front, answer, explanation })

export const AVM_LESSON = {
  pdfSourcePages: [37,38], // user PDF page range; coverage still requires content comparison

  breadcrumb: L('Arteriovenöse Malformation (AVM)', 'Arteriovenous Malformation (AVM)', 'مالفورماسیون شریانی-وریدی (AVM)'),
  title: L('Arteriovenöse Malformation (AVM)', 'Arteriovenous Malformation (AVM)', 'مالفورماسیون شریانی-وریدی (AVM)'),
  definition: L(
    'Kongenitale Gefäßfehlbildung mit direktem arteriovenösem Shunt über einen Nidus dysplastischer Gefäße — ohne zwischengeschaltetes Kapillarbett.',
    'Congenital vascular malformation with a direct arteriovenous shunt via a nidus of dysplastic vessels — without an intervening capillary bed.',
    'مالفورماسیون عروقی مادرزادی با شانت مستقیم شریانی-وریدی از طریق نیدوس عروق دیسپلاستیک — بدون بستر مویرگی واسط.'
  ),
  keyLabel: L('Merke', 'Key point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Warning', 'هشدار'),
  toc: L('Inhalte', 'Contents', 'فهرست'),


  sections: [
    { id: 'grundlagen',   icon: '📌', label: L('Grundlagen',             'Basics',                'مبانی') },
    { id: 'klinik',       icon: '🩺', label: L('Klinik',                 'Clinical',              'بالین') },
    { id: 'spetzler',     icon: '📊', label: L('Spetzler-Martin-Score',  'Spetzler-Martin Score', 'امتیاز Spetzler-Martin'), emphasis: true },
    { id: 'bildgebung',   icon: '🧲', label: L('Bildgebung',             'Imaging',               'تصویربرداری') },
    { id: 'fall',         icon: '🖼️', label: L('Fallbeispiel rID 74111', 'Case rID 74111',        'کیس rID 74111') },
    { id: 'differenzial', icon: '⚖️', label: L('Differenzialdiagnose',   'Differential',          'افتراقی') },
    { id: 'management',   icon: '🔧', label: L('Management',             'Management',            'مدیریت') },
    { id: 'takehome',     icon: '🏁', label: L('Merke', 'Take-home message', 'نکات کلیدی'), emphasis: true },
  ],

  grundlagen: {
    title: L('Grundlagen & Pathophysiologie', 'Basics & Pathophysiology', 'مبانی و پاتوفیزیولوژی'),
    heroAlt: L('Medizinische Illustration einer zerebralen AVM mit zuführender Arterie, Nidus und drainierender Vene', 'Medical illustration of a cerebral AVM with feeding artery, nidus and draining vein', 'تصویر آموزشی AVM مغزی با شریان تغذیه‌کننده، نیدوس و ورید تخلیه‌کننده'),
    lead: L(
      'Die AVM besteht aus drei Komponenten: zuführende Arterien (Feeder), dem Nidus aus dysplastischen Gefäßen und drainierenden Venen. Kein Kapillarbett = Hochdruckshunt = Blutungsrisiko.',
      'The AVM has three components: feeding arteries, the nidus of dysplastic vessels and draining veins. No capillary bed = high-pressure shunt = haemorrhage risk.',
      'AVM از سه بخش تشکیل می‌شود: شریان‌های تغذیه‌کننده، نیدوس از عروق دیسپلاستیک و وریدهای تخلیه‌کننده. بدون بستر مویرگی = شانت پرفشار = خطر خونریزی.'
    ),
    visualAlt: L('Schema: zuführende Arterie, Nidus und drainierende Vene', 'Diagram: feeding artery, nidus and draining vein', 'شماتیک: شریان تغذیه‌کننده، نیدوس و ورید تخلیه‌کننده'),
    items: [
      {
        icon: '🔴',
        title: L('Feeder', 'Feeder arteries', 'شریان‌های تغذیه‌کننده'),
        text: L(
          'Zuführende Arterien, die das AVM-Nidus mit arteriellem Hochdruckblut versorgen. Meist aus kortikalen Ästen der A. cerebri media, anterior oder posterior.',
          'Feeding arteries supplying the AVM nidus with high-pressure arterial blood. Mostly cortical branches of the MCA, ACA or PCA.',
          'شریان‌های تغذیه‌کننده که نیدوس AVM را با خون شریانی پرفشار تامین می‌کنند. اغلب از شاخه‌های کورتیکال MCA، ACA یا PCA.'
        ),
      },
      {
        icon: '🌀',
        title: L('Nidus', 'Nidus', 'نیدوس'),
        text: L(
          'Konvolut dysplastischer Gefäße ohne Kapillarbett — die eigentliche Malformation. Direkte AV-Verbindung → arterieller Druck im venösen System → Wand­schwäche → Blutung.',
          'Tangle of dysplastic vessels without a capillary bed — the malformation itself. Direct AV connection → arterial pressure in the venous system → wall weakness → haemorrhage.',
          'کنولوت عروق دیسپلاستیک بدون بستر مویرگی — خود مالفورماسیون. اتصال مستقیم AV → فشار شریانی در سیستم وریدی → ضعف دیواره → خونریزی.'
        ),
      },
      {
        icon: '🔵',
        title: L('Drainierende Venen', 'Draining veins', 'وریدهای تخلیه‌کننده'),
        text: L(
          'Abführende, oft erweiterte Venen, die arterialisiertes Blut ableiten. Oberflächliche Drainage (in kortikale Venen/Sinus) vs. tiefe Drainage (in innere Hirnvenen) — wichtig für Spetzler-Martin.',
          'Draining — often dilated — veins carrying arterialized blood. Superficial drainage (into cortical veins/sinus) vs. deep drainage (into deep cerebral veins) — important for Spetzler-Martin.',
          'وریدهای تخلیه‌کننده اغلب گشاد که خون شریانی‌شده را منتقل می‌کنند. درناژ سطحی (به وریدهای کورتیکال/سینوس) در مقابل درناژ عمقی (به وریدهای عمقی مغز) — مهم برای Spetzler-Martin.'
        ),
      },
      {
        icon: '🧬',
        title: L('Epidemiologie', 'Epidemiology', 'اپیدمیولوژی'),
        text: L(
          'Häufig im jungen Erwachsenenalter (20.–40. Lebensjahr); meist supratentoriell in den Hemisphären.',
          'Often presents in young adulthood (2nd–4th decade); mostly supratentorial in the cerebral hemispheres.',
          'اغلب در بزرگسالی جوان (دهه دوم تا چهارم) دیده می‌شود؛ عمدتاً سوپراتنتوریال و در نیم‌کره‌های مغز است.'
        ),
      },
    ],
    key: L(
      'AVM = Nidus + direkter Shunt ohne Kapillarbett. Der Nidus unterscheidet sie von einer dAVF; die AVM liegt im Parenchym, die dAVF in der Dura.',
      'AVM = nidus + direct shunt without a capillary bed. The nidus distinguishes it from a dAVF; an AVM is parenchymal, a dAVF dural.',
      'AVM = نیدوس + شانت مستقیم بدون بستر مویرگی. نیدوس آن را از dAVF متمایز می‌کند؛ AVM پارانشیمی و dAVF دورال است.'
    ),
  },

  klinik: {
    title: L('Klinik', 'Clinical Presentation', 'تظاهر بالینی'),
    lead: L(
      'Blutung ist eine häufige Erstmanifestation; weitere mögliche Vorstellungen sind Krampfanfälle, Kopfschmerzen oder fokale Defizite.',
      'Haemorrhage is a common initial presentation; other possible presentations include seizures, headache or focal deficits.',
      'خونریزی یکی از تظاهرات اولیه شایع است؛ تظاهرات دیگر می‌توانند تشنج، سردرد یا نقص عصبی کانونی باشند.'
    ),
    headers: [
      L('Manifestation', 'Presentation', 'تظاهر'),
      L('Häufigkeit', 'Frequency', 'فراوانی'),
      L('Klinische Details', 'Clinical details', 'جزئیات بالینی'),
    ],
    rows: [
      [
        L('Intrazerebrale Blutung', 'Intracerebral haemorrhage', 'خونریزی داخل مغزی'),
        L('Häufigste Erstmanifestation laut Quelle', 'Most common initial presentation in source', 'شایع‌ترین تظاهر اولیه طبق منبع'),
        L('Oft lobär; bei tiefer Drainage auch IVB möglich; SAB bei oberflächlicher Lage', 'Often lobar; IVH possible with deep drainage; SAH with superficial location', 'اغلب لوبار؛ IVH با درناژ عمقی ممکن؛ SAH در محل سطحی'),
      ],
      [
        L('Krampfanfälle', 'Seizures', 'تشنج'),
        L('Häufige Vorstellung', 'Common presentation', 'تظاهر شایع'),
        L('Häufig bei kortikaler Lage; fokal oder generalisiert', 'Common with cortical location; focal or generalised', 'شایع در محل کورتیکال؛ موضعی یا عمومی'),
      ],
      [
        L('Kopfschmerzen', 'Headache', 'سردرد'),
        L('Möglich', 'Possible', 'ممکن'),
        L('Unspezifisch; Zufallsbefund bei Bildgebung möglich', 'Non-specific; incidental finding on imaging possible', 'غیراختصاصی؛ یافته اتفاقی در تصویربرداری ممکن'),
      ],
      [
        L('Fokale neurologische Defizite', 'Focal neurological deficits', 'کسری‌های عصبی موضعی'),
        L('Möglich', 'Possible', 'ممکن'),
        L('Steal-Phänomen oder venöse Stauung möglich', 'Steal phenomenon or venous congestion possible', 'پدیده سرقت یا احتقان وریدی ممکن'),
      ],
    ],
    cave: L(
      'Klinische Präsentation und Blutungsrisiko variieren. Zahlen hängen von Population, Rupturstatus und Nachbeobachtung ab; keine Einzelzahl beschreibt alle AVMs.',
      'Presentation and haemorrhage risk vary. Estimates depend on population, rupture status and follow-up; no single figure describes all AVMs.',
      'تظاهر بالینی و خطر خونریزی متغیرند. برآوردها به جمعیت، وضعیت پارگی و مدت پیگیری بستگی دارند؛ یک عدد واحد همه AVMها را توصیف نمی‌کند.'
    ),
  },

  spetzler: {
    title: L('Spetzler-Martin-Klassifikation', 'Spetzler-Martin Classification', 'طبقه‌بندی Spetzler-Martin'),
    lead: L(
      'Der Score schätzt das Risiko einer mikrochirurgischen Resektion anhand von drei Kriterien ein.',
      'The score estimates the risk of microsurgical resection using three criteria.',
      'این امتیاز خطر رزکسیون میکروجراحی را بر اساس سه معیار برآورد می‌کند.'
    ),
    headers: [
      L('Kriterium', 'Criterion', 'معیار'),
      L('Ausprägung', 'Category', 'دسته‌بندی'),
      L('Punkte', 'Points', 'امتیاز'),
    ],
    rows: [
      [
        L('Größe Nidus', 'Nidus size', 'اندازه نیدوس'),
        L('< 3 cm', '< 3 cm', '< ۳ سانتی‌متر'),
        '1',
      ],
      [
        '',
        L('3 – 6 cm', '3 – 6 cm', '۳ – ۶ سانتی‌متر'),
        '2',
      ],
      [
        '',
        L('> 6 cm', '> 6 cm', '> ۶ سانتی‌متر'),
        '3',
      ],
      [
        L('Lokalisation', 'Location', 'محل'),
        L('Nicht-eloquent (Frontal, Okzipital, Kleinhirn-Hemisphäre)', 'Non-eloquent (frontal, occipital, cerebellar hemisphere)', 'غیرگویا (فرونتال، اکسیپیتال، نیم‌کره مخچه)'),
        '0',
      ],
      [
        '',
        L('Eloquent (Sensomotorik, Sprache, Sehrinde, Hypothalamus, Thalamus, Hirnstamm, Kleinhirnstiele, tiefe Kleinhirnkerne)', 'Eloquent (sensorimotor, language, visual cortex, hypothalamus, thalamus, brainstem, cerebellar peduncles, deep cerebellar nuclei)', 'گویا (حسی-حرکتی، زبان، قشر بینایی، هیپوتالاموس، تالاموس، ساقه مغز، پدیکل‌های مخچه‌ای، هسته‌های عمقی مخچه)'),
        '1',
      ],
      [
        L('Venöse Drainage', 'Venous drainage', 'درناژ وریدی'),
        L('Nur oberflächlich', 'Superficial only', 'فقط سطحی'),
        '0',
      ],
      [
        '',
        L('Tief (in innere Hirnvenen)', 'Deep (into internal cerebral veins)', 'عمقی (به وریدهای داخلی مغز)'),
        '1',
      ],
    ],
    summary: {
      headers: [L('Grad', 'Grade', 'درجه'), L('Gesamtpunkte', 'Total points', 'امتیاز کل'), L('Risikogruppe (keine Therapieanweisung)', 'Risk group (not a treatment directive)', 'گروه خطر (نه دستور درمان)')],
      rows: [
        [L('I', 'I', 'I'), '1', L('Niedrigere operative Risikoklasse', 'Lower operative risk class', 'رده خطر جراحی پایین‌تر')],
        [L('II', 'II', 'II'), '2', L('Niedrigere operative Risikoklasse', 'Lower operative risk class', 'رده خطر جراحی پایین‌تر')],
        [L('III', 'III', 'III'), '3', L('Mittlere Risikoklasse', 'Intermediate risk class', 'رده خطر میانی')],
        [L('IV', 'IV', 'IV'), '4', L('Höhere operative Risikoklasse', 'Higher operative risk class', 'رده خطر جراحی بالاتر')],
        [L('V', 'V', 'V'), '5', L('Höhere operative Risikoklasse', 'Higher operative risk class', 'رده خطر جراحی بالاتر')],
      ],
    },
    key: L(
      'Der Score schätzt das Risiko einer mikrochirurgischen Resektion ein. Er ist keine eigenständige Therapieempfehlung; Entscheidung individuell und multidisziplinär.',
      'The score estimates the risk of microsurgical resection. It is not a stand-alone treatment recommendation; decisions are individual and multidisciplinary.',
      'این امتیاز خطر رزکسیون میکروجراحی را برآورد می‌کند. به‌تنهایی توصیه درمانی نیست؛ تصمیم‌گیری باید فردی و چندتخصصی باشد.'
    ),
  },

  bildgebung: {
    title: L('Bildgebung: Sequenz für Sequenz', 'Imaging: Sequence by Sequence', 'تصویربرداری: سکانس به سکانس'),
    lead: L(
      'MRT kann Flow voids und Blutungsresiduen zeigen; DSA ermöglicht die detaillierte dynamische Darstellung der Gefäßarchitektur.',
      'MRI can show flow voids and haemorrhagic residues; DSA provides detailed dynamic assessment of the vascular architecture.',
      'MRI می‌تواند فقدان سیگنال جریان و بقایای خونریزی را نشان دهد؛ DSA معماری عروقی را با جزئیات و به‌صورت دینامیک نمایش می‌دهد.'
    ),
    headers: [
      L('Sequenz', 'Sequence', 'سکانس'),
      L('Befund', 'Finding', 'یافته'),
      L('Bedeutung', 'Relevance', 'اهمیت'),
    ],
    rows: [
      [
        L('T1 / T2 nativ', 'T1 / T2 native', 'T1 / T2 نیتیو'),
        L('Flow voids = Signalauslöschung in schnell durchflossenen Gefäßen; ggf. T2-Hyperintensität (Gliose) im umgebenden Parenchym', 'Flow voids = signal void in fast-flowing vessels; possible T2 hyperintensity (gliosis) in surrounding parenchyma', 'فقدان سیگنال جریان (flow void) = از بین رفتن سیگنال در عروق با جریان سریع؛ احتمال هایپراینتنسیتی T2 (گلیوز) در پارانشیم اطراف'),
        L('Flow voids = Hochfluss = AVM-typisch', 'Flow voids = high flow = AVM-typical', 'فقدان سیگنال جریان (flow void) = جریان بالا = تیپیک AVM'),
      ],
      [
        L('T1 + KM', 'T1 + contrast', 'T1 + کنتراست'),
        L('Starkes Enhancement der Gefäßstrukturen (Feeder, Nidus, drainierende Venen)', 'Marked enhancement of vascular structures (feeder, nidus, draining veins)', 'افزایش قوی ساختارهای عروقی (تغذیه‌کننده، نیدوس، وریدهای تخلیه‌کننده)'),
        L('Abgrenzung Nidus-Ausdehnung', 'Delineation of nidus extent', 'ترسیم محدوده نیدوس'),
      ],
      [
        'SWI / T2*',
        L('Hämosiderin­saum bei stattgehabter Blutung; Blooming-Artefakt', 'Haemosiderin rim after prior bleed; blooming artefact', "حاشیه هموسیدرین بعد از خونریزی قبلی؛ آرتفکت آرتیفکت شکوفه‌ای (blooming)"),
        L('Kann Blutungsresiduen darstellen; kein sicherer Ausschluss einer Begleitläsion', 'Can depict haemorrhagic residues; does not reliably exclude a coexisting lesion', 'می‌تواند بقایای خونریزی را نشان دهد؛ وجود ضایعه همراه را با قطعیت رد نمی‌کند'),
      ],
      [
        'TOF-MRA',
        L('Kann Nidus und Gefäßverlauf darstellen; zeitliche Auflösung abhängig von Technik', 'Can depict the nidus and vascular course; temporal resolution depends on technique', 'می‌تواند نیدوس و مسیر عروق را نشان دهد؛ تفکیک زمانی به تکنیک وابسته است'),
        L('Nicht-invasive Gefäßdarstellung; ersetzt nicht in jedem Fall die DSA', 'Non-invasive vascular imaging; does not replace DSA in every case', 'تصویربرداری غیرتهاجمی عروق؛ در همه موارد جایگزین DSA نیست'),
      ],
      [
        L('DSA (Goldstandard!)', 'DSA (Gold standard!)', 'DSA (استاندارد طلایی!)'),
        L('Nidus und frühe venöse Drainage in der arteriellen Phase stützen den Nachweis eines arteriovenösen Shunts; DSA zeigt Feeder und Drainage dynamisch', 'A nidus and early venous drainage during the arterial phase support an arteriovenous shunt; DSA depicts feeders and drainage dynamically', 'نیدوس و درناژ زودرس وریدی در فاز شریانی از وجود شانت شریانی‌وریدی حمایت می‌کنند؛ DSA تغذیه‌کنندگان و درناژ را دینامیک نشان می‌دهد'),
        L('Referenzverfahren zur detaillierten Gefäß- und Therapieplanung', 'Reference method for detailed vascular and treatment planning', 'روش مرجع برای ارزیابی دقیق عروق و برنامه‌ریزی درمان'),
      ],
    ],
    key: L(
      'Flow voids in T1/T2 können den Verdacht wecken. DSA zeigt den Shunt mit hoher zeitlicher und räumlicher Auflösung.',
      'Flow voids on T1/T2 can raise suspicion. DSA depicts the shunt with high temporal and spatial resolution.',
      'فقدان سیگنال جریان در T1/T2 می‌تواند شک ایجاد کند. DSA شانت را با تفکیک زمانی و مکانی بالا نشان می‌دهد.'
    ),
  },

  fall: {
    title: L('Fallbeispiel – Radiopaedia rID 74111', 'Case example – Radiopaedia rID 74111', 'نمونه کیس – Radiopaedia rID 74111'),
    lead: L(
      'Die MRT-Bilder zeigen serpiginöse Gefäßstrukturen; die dargestellte MRA-Projektion erlaubt hier keine sichere Beurteilung des Nidus.',
      'The MRI images show serpiginous vascular structures; this MRA projection does not allow confident assessment of the nidus.',
      'تصاویر MRI ساختارهای عروقی مارپیچ را نشان می‌دهند؛ در این تصویر MRA ارزیابی مطمئن نیدوس ممکن نیست.'
    ),
    caseLabel: L('AVM – Gehirn', 'AVM – Brain', 'AVM – مغز'),
    caseTitle: L('Arteriovenöse Malformation', 'Arteriovenous Malformation', 'مالفورماسیون شریانی-وریدی'),
    caseMeta: L(
      'In den gezeigten MRT-Aufnahmen sind serpiginöse Gefäßstrukturen erkennbar. Die MRA-Projektion zeigt vorwiegend die basalen Hirnarterien; Nidus und Drainage sind in diesem Einzelbild nicht zuverlässig abgrenzbar.',
      'The displayed MRI images show serpiginous vascular structures. The MRA projection mainly shows the basal cerebral arteries; the nidus and drainage cannot be reliably delineated in this frame.',
      'در MRI ساختارهای عروقی مارپیچ دیده می‌شوند. تصویر MRA عمدتاً شریان‌های قاعده مغز را نشان می‌دهد؛ نیدوس و درناژ در این تک‌تصویر به‌طور قابل‌اعتماد مشخص نیستند.'
    ),
    images: [
      {
        src: '/avm/case-74111/t1-nativ.jpeg',
        label: 'T1 nativ',
        alt: L('T1-MRT: Flow voids des AVM-Nidus', 'T1 MRI: AVM nidus flow voids', 'T1 MRI: فقدان سیگنال جریان (flow void) نیدوس AVM'),
        caption: L('T1 nativ: zentrale Flow voids als Ausdruck des schnellen Blutflusses im Nidus', 'T1 native: central flow voids reflecting rapid blood flow in the nidus', 'T1 نیتیو: فقدان سیگنال جریان (flow void) مرکزی منعکس‌کننده جریان خون سریع در نیدوس'),
      },
      {
        src: '/avm/case-74111/t2.jpeg',
        label: 'T2',
        alt: L('T2-MRT: Geschlängelte Flow voids der AVM', 'T2 MRI: Serpentine AVM flow voids', 'T2 MRI: فقدان سیگنال جریان (flow void) مارپیچ AVM'),
        caption: L('T2: serpentine Flow voids im Bereich des Nidus — klassisches Zeichen eines arteriovenösen Hochflusses', 'T2: serpentine flow voids in the nidus region — classic sign of arteriovenous high flow', 'T2: فقدان سیگنال جریان (flow void) مارپیچ در ناحیه نیدوس — علامت کلاسیک جریان شریانی-وریدی بالا'),
      },
      {
        src: '/avm/case-74111/mra.jpeg',
        label: 'MRA C+',
        alt: L('MRA-Projektion mit Darstellung der basalen Hirnarterien', 'MRA projection showing the basal cerebral arteries', 'تصویر MRA با نمایش شریان‌های قاعده مغز'),
        caption: L('Diese Projektion zeigt vorwiegend die basalen Hirnarterien; ein Nidus oder frühe venöse Drainage lässt sich hier nicht sicher erkennen.', 'This projection mainly shows the basal cerebral arteries; a nidus or early venous drainage cannot be confidently identified here.', 'این تصویر عمدتاً شریان‌های قاعده مغز را نشان می‌دهد؛ نیدوس یا درناژ زودرس وریدی در آن با اطمینان قابل تشخیص نیست.'),
      },
    ],
    findingsTitle: L('Radiologische Befunde', 'Radiological findings', 'یافته‌های رادیولوژیک'),
    findings: [
      L('T1 nativ: zentrale hypointense Flow voids im Bereich des Nidus (Signalauslöschung durch Hochfluss)', 'T1 native: central hypointense flow voids in the nidus region (signal loss due to high flow)', 'T1 نیتیو: فقدان سیگنال جریان (flow void) هیپواینتنس مرکزی در ناحیه نیدوس (از بین رفتن سیگنال به دلیل جریان بالا)'),
      L('T2: serpiginöse Hypointensitäten (Flow voids); das Vorliegen einer umgebenden Gliose lässt sich aus diesem Einzelbild nicht sicher beurteilen.', 'T2: serpiginous hypointensities (flow voids); surrounding gliosis cannot be reliably assessed from this single frame.', 'T2: نواحی هیپواینتنس مارپیچ (flow void)؛ از این تک‌تصویر نمی‌توان وجود گلیوز اطراف را با اطمینان ارزیابی کرد.'),
      L('Die MRA-Projektion erlaubt in diesem Bild keine sichere Abgrenzung von Nidus, Feeder oder venöser Drainage; für die Fallbewertung sind vollständige Sequenzen erforderlich.', 'This MRA frame does not confidently delineate the nidus, feeders or venous drainage; full sequences are needed to assess the case.', 'در این تک‌تصویر MRA نیدوس، تغذیه‌کنندگان یا درناژ وریدی با اطمینان مشخص نیستند؛ ارزیابی کیس به سکانس‌های کامل نیاز دارد.'),
    ],
    diagnosis: L(
      'Eine AVM ist mit den gezeigten Einzelbildern vereinbar. Ein Spetzler-Martin-Grad und eine Therapieempfehlung sind ohne vollständige Angaben zu Größe, Eloquenz und venöser Drainage nicht ableitbar.',
      'The displayed images are compatible with an AVM. A Spetzler–Martin grade and treatment recommendation cannot be derived without complete information on size, eloquence and venous drainage.',
      'تصاویر نشان‌داده‌شده با AVM سازگارند. بدون اطلاعات کامل اندازه، ناحیه گویا و درناژ وریدی نمی‌توان درجه Spetzler–Martin یا توصیه درمانی تعیین کرد.'
    ),
    attribution: {
      caseUrl: 'https://radiopaedia.org/cases/74111/play',
      caseId: '74111',
    },
  },

  differenzial: {
    title: L('Differenzialdiagnose', 'Differential Diagnosis', 'تشخیص افتراقی'),
    lead: L(
      'Flow voids allein sind nicht spezifisch — andere Hochflussläsionen müssen ausgeschlossen werden.',
      'Flow voids alone are not specific — other high-flow lesions must be excluded.',
      'فقدان سیگنال جریان (flow void) به‌تنهایی اختصاصی نیستند — سایر ضایعات پرجریان باید رد شوند.'
    ),
    headers: [L('Diagnose', 'Diagnosis', 'تشخیص'), L('Abgrenzung zur AVM', 'Distinction from AVM', 'افتراق از AVM')],
    rows: [
      [
        L('Durale AV-Fistel (dAVF)', 'Dural arteriovenous fistula (dAVF)', 'فیستول AV دورال (dAVF)'),
        L('Kein Nidus; liegt in der Dura, nicht im Parenchym; meist erworben; meningeale Feeder', 'No nidus; dural not parenchymal; mostly acquired; meningeal feeders', 'بدون نیدوس؛ دورال نه پارانشیمی؛ اغلب اکتسابی؛ تغذیه‌کنندگان مننژیال'),
      ],
      [
        L('Kavernom (+ DVA)', 'Cavernoma (+ DVA)', 'کاورنوم (+ DVA)'),
        L('Low-flow; Popcorn-Kern + Hämosiderinsaum in T2/SWI; kein Nidus; angiographisch okkult', 'Low flow; popcorn core + haemosiderin rim on T2/SWI; no nidus; angiographically occult', 'کم‌جریان؛ هسته پاپ‌کورنی + حاشیه هموسیدرین در T2/SWI؛ بدون نیدوس؛ در آنژیوگرافی نهان'),
      ],
      [
        L('Proliferative Angiopathie', 'Proliferative angiopathy', 'آنژیوپاتی پرولیفراتیو'),
        L('Diffuse, schlecht begrenzte Gefäßveränderung ohne typischen Nidus; Abgrenzung kann schwierig sein', 'Diffuse, poorly defined vascular abnormality without a typical nidus; distinction may be difficult', 'ناهنجاری عروقی منتشر با حدود نامشخص و بدون نیدوس تیپیک؛ افتراق ممکن است دشوار باشد'),
      ],
      [
        'Moyamoya',
        L('Stenosen der terminalen ICA mit charakteristischem Kollateralnetz („Puff of smoke“); kein AVM-Nidus', 'Terminal ICA stenosis with a characteristic collateral network (“puff of smoke”); no AVM nidus', 'تنگی انتهایی ICA با شبکه کولترال مشخص («پف دود»)؛ بدون نیدوس AVM'),
      ],
    ],
  },

  management: {
    title: L('Management & Therapie', 'Management & Treatment', 'مدیریت و درمان'),
    lead: L(
      'Der Spetzler-Martin-Score ist ein Baustein der Behandlungsplanung, aber keine alleinige Therapieanweisung. Optionen werden im Einzelfall und im spezialisierten Team abgewogen.',
      'The Spetzler–Martin score is one part of treatment planning, not a stand-alone treatment directive. Options are weighed for each case by a specialist team.',
      'امتیاز Spetzler–Martin بخشی از برنامه‌ریزی درمان است، نه دستور مستقل درمان. گزینه‌ها برای هر بیمار در تیم تخصصی سنجیده می‌شوند.'
    ),
    items: [
      {
        icon: '🔪',
        title: L('Mikrochirurgische Resektion', 'Microsurgical resection', 'رزکسیون میکروجراحی'),
        text: L(
          'Eine mögliche Option; Nutzen und Risiko hängen unter anderem von Größe, Lage, Drainage und Patientenkontext ab. Die Auswahl erfolgt interdisziplinär.',
          'One possible option; benefit and risk depend on size, location, drainage and patient context. Selection is multidisciplinary.',
          'یکی از گزینه‌های ممکن است؛ فایده و خطر به اندازه، محل، درناژ و شرایط بیمار بستگی دارند. انتخاب چندتخصصی انجام می‌شود.'
        ),
      },
      {
        icon: '🎯',
        title: L('Endovaskuläre Embolisation', 'Endovascular embolisation', 'آمبولیزاسیون اندوواسکولار'),
        text: L(
          'Eine mögliche Behandlungsmodalität; ihre Rolle und Kombination mit anderen Verfahren werden anhand von Gefäßanatomie und Behandlungsziel individuell festgelegt.',
          'One possible treatment modality; its role and combination with other approaches are determined individually from vascular anatomy and treatment goals.',
          'یکی از روش‌های درمانی ممکن است؛ نقش آن و ترکیب با روش‌های دیگر بر اساس آناتومی عروقی و هدف درمان به‌صورت فردی تعیین می‌شود.'
        ),
      },
      {
        icon: '☢️',
        title: L('Stereotaktische Radiochirurgie (Gamma Knife)', 'Stereotactic radiosurgery (Gamma Knife)', "رادیوجراحی استریوتاکتیک (گامانایف (Gamma Knife))"),
        text: L(
          'Die Eignung hängt unter anderem von Größe, Lage und individuellen Faktoren ab. Eine Obliteration kann verzögert eintreten; die Entscheidung erfolgt interdisziplinär.',
          'Suitability depends on size, location and individual factors. Obliteration may be delayed; decisions are made by a multidisciplinary team.',
          'مناسب‌بودن به اندازه، محل و عوامل فردی بستگی دارد. انسداد ممکن است با تأخیر رخ دهد؛ تصمیم‌گیری چندتخصصی است.'
        ),
      },
    ],
    cave: L(
      'Der Spetzler-Martin-Score ist ein Baustein der Behandlungsplanung und legt die Therapie nicht allein fest. Mikrochirurgie, Embolisation und Radiochirurgie werden anhand des Einzelfalls und im spezialisierten Team abgewogen.',
      'The Spetzler–Martin score is one part of treatment planning and does not determine therapy by itself. Microsurgery, embolisation and radiosurgery are considered for each case by a specialist team.',
      'امتیاز Spetzler–Martin یکی از اجزای برنامه‌ریزی درمان است و به‌تنهایی درمان را تعیین نمی‌کند. میکروجراحی، آمبولیزاسیون و رادیوجراحی بر اساس شرایط هر بیمار و در تیم تخصصی بررسی می‌شوند.'
    ),
  },

  takehome: {
    title: L('Take-Home Message', 'Take-Home Message', 'پیام اصلی'),
    lead: L('Drei Kernaussagen für die Praxis.', 'Three key points for clinical practice.', 'سه نکته کلیدی برای عمل بالینی.'),
    items: [
      {
        title: L('Nidus = AVM-Kern', 'Nidus = AVM core', 'نیدوس = هسته AVM'),
        text: L(
          'Der Nidus ist das Unterscheidungsmerkmal der AVM von der dAVF (kein Nidus). Flow voids in T1/T2 = Verdacht. DSA = Goldstandard zur Bestätigung.',
          'The nidus distinguishes AVM from dAVF (no nidus). Flow voids on T1/T2 = suspect AVM. DSA = gold standard for confirmation.',
          'نیدوس عامل افتراق AVM از dAVF است (بدون نیدوس). فقدان سیگنال جریان (flow void) در T1/T2 = شک به AVM. DSA = استاندارد طلایی برای تأیید.'
        ),
      },
      {
        title: L('Spetzler-Martin schätzt OP-Risiko', 'Spetzler-Martin estimates operative risk', 'Spetzler-Martin خطر جراحی را برآورد می‌کند'),
        text: L(
          'Der Score ordnet das Risiko einer Resektion anhand von Nidusgröße, eloquenter Lage und venöser Drainage ein; er ist keine Therapieanweisung.',
          'The score estimates resection risk from nidus size, eloquent location and venous drainage; it is not a treatment directive.',
          'این امتیاز خطر رزکسیون را بر اساس اندازه نیدوس، محل گویا و درناژ وریدی برآورد می‌کند؛ دستور درمان نیست.'
        ),
      },
      {
        title: L('Klinische Präsentation', 'Clinical presentation', 'تظاهرات بالینی'),
        text: L(
          'Mögliche Erstmanifestationen sind Blutung, Krampfanfall, Kopfschmerz oder fokales Defizit. Die Häufigkeit variiert zwischen Studien und Populationen.',
          'Possible initial presentations include haemorrhage, seizure, headache or focal deficit. Frequencies vary across studies and populations.',
          'تظاهرات اولیه ممکن شامل خونریزی، تشنج، سردرد یا نقص کانونی است. فراوانی در مطالعات و جمعیت‌های مختلف تفاوت دارد.'
        ),
      },
    ],
  },
}

// ─── MCQ ─────────────────────────────────────────────────────────────────────

const TQ = [
  Q('01',
    L('Welche drei Strukturen gehören zur AVM?',
      'Which three structures make up an AVM?',
      'کدام سه ساختار AVM را تشکیل می‌دهند؟'),
    [
      L('Feeder, Nidus, drainierende Venen', 'Feeder, nidus, draining veins', 'تغذیه‌کننده، نیدوس، وریدهای تخلیه‌کننده'),
      L('Kapillarbett, Nidus, Dura', 'Capillary bed, nidus, dura', 'بستر مویرگی، نیدوس، دورا'),
      L('Arterie, Kapillare, Vene', 'Artery, capillary, vein', 'شریان، مویرگ، ورید'),
      L('Aneurysma, Nidus, Sinusthrombose', 'Aneurysm, nidus, sinus thrombosis', 'آنوریسم، نیدوس، ترومبوز سینوس'),
    ], 0,
    L('Die AVM besteht aus zuführenden Arterien (Feeder), dem Nidus dysplastischer Gefäße und drainierenden Venen — ohne Kapillarbett.',
      'AVM consists of feeding arteries (feeder), the nidus of dysplastic vessels, and draining veins — without a capillary bed.',
      'AVM از شریان‌های تغذیه‌کننده، نیدوس عروق دیسپلاستیک و وریدهای تخلیه‌کننده تشکیل می‌شود — بدون بستر مویرگی.')),

  Q('02',
    L('Mit welchen Beschwerden kann sich eine AVM erstmals zeigen?', 'Which symptoms may be an initial presentation of an AVM?', 'AVM ممکن است ابتدا با چه علائمی تظاهر کند؟'),
    [
      L('Blutung, Krampfanfall, Kopfschmerz oder fokales Defizit', 'Haemorrhage, seizure, headache or focal deficit', 'خونریزی، تشنج، سردرد یا نقص کانونی'),
      L('Nur Fieber und Nackensteifigkeit', 'Fever and neck stiffness only', 'فقط تب و سفتی گردن'),
      L('Ausschließlich Visusverlust', 'Visual loss exclusively', 'فقط از دست رفتن بینایی'),
      L('Nur asymptomatischer Zufallsbefund', 'Only an asymptomatic incidental finding', 'فقط یافته اتفاقی بدون علامت'),
    ], 0,
    L('Die PDF nennt Blutung als häufigste Erstmanifestation; Krampfanfall, Kopfschmerz und fokales Defizit sind weitere mögliche Vorstellungen.', 'The PDF identifies haemorrhage as the most common initial presentation; seizure, headache and focal deficit are other possible presentations.', 'PDF خونریزی را شایع‌ترین تظاهر اولیه می‌داند؛ تشنج، سردرد و نقص کانونی نیز از تظاهرات ممکن‌اند.')),

  Q('03',
    L('Welche Komplikation tritt bei einer AVM häufig auf?',
      'Which complication commonly occurs with an AVM?',
      'کدام عارضه در AVM شایع است؟'),
    [
      L('Intrazerebrale Blutung', 'Intracerebral haemorrhage', 'خونریزی داخل مغزی'),
      L('Sinusvenenthrombose', 'Cerebral venous sinus thrombosis', 'ترومبوز سینوس وریدی مغز'),
      L('Meningitis', 'Meningitis', 'مننژیت'),
      L('Hydrozephalus als typische Erstkomplikation', 'Hydrocephalus as the typical first complication', 'هیدروسفالی به‌عنوان عارضهٔ اولیهٔ تیپیک'),
    ], 0,
    L('Die PDF nennt intrazerebrale Blutungen als häufige Komplikation; die Erstmanifestationen werden separat behandelt.',
      'The PDF identifies intracerebral haemorrhage as a common complication; initial presentations are covered separately.',
      'PDF خونریزی داخل مغزی را عارضه‌ای شایع می‌داند؛ تظاهرات اولیه جداگانه بررسی شده‌اند.')),

  Q('04',
    L('Eine AVM hat einen Nidus von 4 cm, liegt im Thalamus, mit tiefer Drainage. Welcher Spetzler-Martin-Grad liegt vor?',
      'An AVM has a 4 cm nidus, lies in the thalamus, with deep drainage. What Spetzler-Martin grade is this?',
      'یک AVM نیدوس ۴ سانتی‌متری دارد، در تالاموس قرار دارد، با درناژ عمقی. کدام درجه Spetzler-Martin است؟'),
    [
      L('Grad IV (4 Punkte: 2+1+1)', 'Grade IV (4 points: 2+1+1)', 'درجه IV (۴ امتیاز: ۲+۱+۱)'),
      L('Grad II (2 Punkte)', 'Grade II (2 points)', 'درجه II (۲ امتیاز)'),
      L('Grad III (3 Punkte)', 'Grade III (3 points)', 'درجه III (۳ امتیاز)'),
      L('Grad V (5 Punkte)', 'Grade V (5 points)', 'درجه V (۵ امتیاز)'),
    ], 0,
    L('4 cm Nidus (3–6 cm = 2P) + Thalamus ist eloquent (1P) + tiefe Drainage (1P) = 4 Punkte = Spetzler-Martin Grad IV.',
      '4 cm nidus (3–6 cm = 2 pts) + thalamus is eloquent (1 pt) + deep drainage (1 pt) = 4 points = Spetzler-Martin Grade IV.',
      'نیدوس ۴ سانتی‌متری (۳–۶ سانتی‌متر = ۲ امتیاز) + تالاموس گویا است (۱ امتیاز) + درناژ عمقی (۱ امتیاز) = ۴ امتیاز = درجه IV.')),

  Q('05',
    L('Welche AVM-Lokalisation gilt als eloquent?',
      'Which AVM location is considered eloquent?',
      'کدام محل AVM گویا (eloquent) محسوب می‌شود؟'),
    [
      L('Thalamus', 'Thalamus', 'تالاموس'),
      L('Frontalpol', 'Frontal pole', 'قطب فرونتال'),
      L('Okzipitalpol', 'Occipital pole', 'قطب اکسیپیتال'),
      L('Kleinhirnhemisphäre', 'Cerebellar hemisphere', 'نیم‌کره مخچه'),
    ], 0,
    L('Eloquente Areale: Sensomotorik, Sprache, Sehrinde, Hypothalamus, Thalamus, Hirnstamm, Kleinhirnstiele, tiefe Kleinhirnkerne. Frontalpol, Okzipitalpol und Kleinhirnhemisphären gelten als nicht-eloquent.',
      'Eloquent areas: sensorimotor, language, visual cortex, hypothalamus, thalamus, brainstem, cerebellar peduncles, deep cerebellar nuclei. Frontal pole, occipital pole and cerebellar hemispheres are non-eloquent.',
      'نواحی گویا: حسی-حرکتی، زبان، قشر بینایی، هیپوتالاموس، تالاموس، ساقه مغز، پدیکل‌های مخچه‌ای، هسته‌های عمقی مخچه. قطب فرونتال، اکسیپیتال و نیم‌کره مخچه غیرگویا هستند.')),

  Q('06',
    L('Welcher MRT-Befund ist am typischsten für eine AVM?',
      'Which MRI finding is most typical of an AVM?',
      'کدام یافته MRI برای AVM تیپیک‌ترین است؟'),
    [
      L('Flow voids in T1/T2 durch schnellen Blutfluss', 'Flow voids on T1/T2 due to rapid blood flow', 'فقدان سیگنال جریان (flow void) در T1/T2 به دلیل جریان خون سریع'),
      L('Brush-like Enhancement in T1 C+', 'Brush-like enhancement on T1 C+', 'افزایش برس‌مانند در T1 C+'),
      L('Popcorn-Kern in T2', 'Popcorn core on T2', 'هسته پاپ‌کورنی در T2'),
      L('Periläsionäres Ödem in FLAIR', 'Perilesional oedema on FLAIR', 'ادم اطراف ضایعه در FLAIR'),
    ], 0,
    L('Flow voids entstehen durch Signalauslöschung bei schnell fließendem Blut. Sie sind das typische T1/T2-Zeichen einer AVM.',
      'Flow voids arise from signal loss with rapidly flowing blood. They are the typical T1/T2 sign of AVM.',
      'فقدان سیگنال جریان (flow void) از از بین رفتن سیگنال با خون با جریان سریع ایجاد می‌شوند. آن‌ها علامت تیپیک T1/T2 AVM هستند.')),

  Q('07',
    L('Welche Sequenz kann Blutabbauprodukte einer früheren Blutung als Suszeptibilität zeigen?',
      'Which sequence can show susceptibility from blood products of a prior haemorrhage?',
      'کدام سکانس می‌تواند سوسپتیبیلیتی ناشی از فرآورده‌های خونیِ خونریزی قبلی را نشان دهد؟'),
    [
      L('SWI bzw. T2*-gewichtete Sequenz', 'SWI or a T2*-weighted sequence', 'SWI یا سکانس T2*'),
      L('T1 nativ allein', 'Unenhanced T1 alone', 'فقط T1 بدون کنتراست'),
      L('TOF-MRA allein', 'TOF-MRA alone', 'فقط TOF-MRA'),
      L('DWI allein', 'DWI alone', 'فقط DWI'),
    ], 0,
    L('SWI und T2* sind empfindlich für Suszeptibilität durch Blutabbauprodukte; sie ersetzen die Gefäßdarstellung nicht.',
      'SWI and T2* are sensitive to susceptibility from blood products; they do not replace vascular imaging.',
      'SWI و T2* به سوسپتیبیلیتی ناشی از فرآورده‌های خونی حساس‌اند؛ جایگزین تصویربرداری عروقی نیستند.')),

  Q('08',
    L('Welcher DSA-Befund spricht für einen arteriovenösen Shunt?',
      'Which DSA finding supports an arteriovenous shunt?',
      'کدام یافته DSA به نفع شانت شریانی‌وریدی است؟'),
    [
      L('Nidus + frühe Venenfüllung in der arteriellen Phase', 'Nidus + early venous filling in the arterial phase', 'نیدوس + پُرشدگی زودرس وریدی در فاز شریانی'),
      L('Aneurysma an der Bifurkation der A. cerebri media', 'Aneurysm at the MCA bifurcation', 'آنوریسم در انشعاب شریان مغزی میانی'),
      L('Retrograde Sinusfüllung ohne Nidus', 'Retrograde sinus filling without nidus', 'پُرشدگی رتروگراد سینوس بدون نیدوس'),
      L('Diffuses Hypervaskularisierungsmuster ohne Nidus', 'Diffuse hypervascularisation without nidus', 'الگوی هایپرواسکولاریزاسیون منتشر بدون نیدوس'),
    ], 0,
    L('Nidus und frühe venöse Drainage während der arteriellen Phase sprechen für einen arteriovenösen Shunt.',
      'A nidus and early venous drainage during the arterial phase support an arteriovenous shunt.',
      'نیدوس و درناژ زودرس وریدی در فاز شریانی به نفع شانت شریانی‌وریدی است.')),

  Q('09',
    L('Welche drei Kriterien bilden den Spetzler-Martin-Score?', 'Which three criteria make up the Spetzler–Martin score?', 'سه معیار امتیاز Spetzler–Martin کدام‌اند؟'),
    [
      L('Nidusgröße, eloquente Lage, venöse Drainage', 'Nidus size, eloquent location, venous drainage', 'اندازه نیدوس، محل گویا، درناژ وریدی'),
      L('Alter, Blutungsstatus, Zahl der Feeder', 'Age, rupture status, number of feeders', 'سن، وضعیت پارگی، تعداد شریان‌های تغذیه‌کننده'),
      L('Nidusvolumen, Ödem, Aneurysmen', 'Nidus volume, oedema, aneurysms', 'حجم نیدوس، ادم، آنوریسم‌ها'),
      L('Lokalisation, Drainage, Zahl der Blutungen', 'Location, drainage, number of haemorrhages', 'محل، درناژ، تعداد خونریزی‌ها'),
    ], 0,
    L('Der Score kombiniert Nidusgröße, Eloquenz der Lage und venöse Drainage zur Einschätzung des operativen Risikos.', 'The score combines nidus size, eloquence of location and venous drainage to estimate operative risk.', 'این امتیاز اندازه نیدوس، گویا بودن محل و درناژ وریدی را برای برآورد خطر جراحی ترکیب می‌کند.')),

  Q('10',
    L('Welche Behandlungsverfahren werden in der Übersicht genannt?', 'Which treatment modalities are listed in the overview?', 'کدام روش‌های درمانی در مرور کلی ذکر شده‌اند؟'),
    [
      L('Mikrochirurgie, Embolisation und Radiochirurgie', 'Microsurgery, embolisation and radiosurgery', 'میکروجراحی، آمبولیزاسیون و رادیوجراحی'),
      L('Nur Antibiotika', 'Antibiotics only', 'فقط آنتی‌بیوتیک'),
      L('Nur Kortikosteroide', 'Corticosteroids only', 'فقط کورتیکواستروئید'),
      L('Ausschließlich Beobachtung', 'Observation only', 'فقط پیگیری'),
    ], 0,
    L('Die genannten Verfahren sind mögliche Optionen; die Liste allein bestimmt keine Empfehlung für den Einzelfall.', 'These modalities are possible options; the list alone does not determine a recommendation for an individual case.', 'این روش‌ها گزینه‌های ممکن‌اند؛ فهرست به‌تنهایی توصیه‌ای برای بیمار مشخص تعیین نمی‌کند.')),

  Q('11',
    L('Wie unterscheidet sich die AVM bildgebend von der dAVF?',
      'How does AVM differ from dAVF on imaging?',
      'AVM از نظر تصویربرداری چگونه از dAVF متمایز می‌شود؟'),
    [
      L('AVM hat Nidus im Parenchym; dAVF hat keinen Nidus und liegt in der Dura', 'AVM has a parenchymal nidus; dAVF has no nidus and lies in the dura', 'AVM نیدوس پارانشیمی دارد؛ dAVF نیدوس ندارد و در دورا قرار دارد'),
      L('AVM und dAVF sind bildgebend nicht zu unterscheiden', 'AVM and dAVF cannot be distinguished on imaging', 'AVM و dAVF از نظر تصویربرداری قابل افتراق نیستند'),
      L('dAVF hat immer einen größeren Nidus als AVM', 'dAVF always has a larger nidus than AVM', 'dAVF همیشه نیدوس بزرگ‌تری نسبت به AVM دارد'),
      L('AVM liegt immer in der Dura', 'AVM always lies in the dura', 'AVM همیشه در دورا قرار دارد'),
    ], 0,
    L('Die AVM hat einen Nidus im Hirnparenchym und ist kongenital. Die dAVF liegt in der Dura, hat keinen Nidus und ist meist erworben.',
      'AVM has a parenchymal nidus and is congenital. dAVF is dural, nidus-free and mostly acquired.',
      'AVM نیدوس پارانشیمی دارد و مادرزادی است. dAVF دورال است، بدون نیدوس و اغلب اکتسابی.')),

  Q('12',
    L('Welche Faktoren beeinflussen das Blutungsrisiko einer AVM?', 'Which factors influence haemorrhage risk in an AVM?', 'چه عواملی بر خطر خونریزی AVM اثر می‌گذارند؟'),
    [
      L('Unter anderem Rupturstatus und Population', 'Among other factors, rupture status and population', 'از جمله وضعیت پارگی و جمعیت مورد مطالعه'),
      L('Nur das Alter', 'Age only', 'فقط سن'),
      L('Nur die Nidusgröße', 'Nidus size only', 'فقط اندازه نیدوس'),
      L('Es ist für alle AVMs gleich', 'It is the same for all AVMs', 'برای همه AVMها یکسان است'),
    ], 0,
    L('Risikoangaben hängen vom Rupturstatus und der untersuchten Population ab; Einzelwerte sind nicht pauschal auf jeden Fall übertragbar.', 'Risk estimates depend on rupture status and the studied population; single values cannot be applied universally.', 'برآورد خطر به وضعیت پارگی و جمعیت مورد مطالعه بستگی دارد؛ نمی‌توان یک عدد را به همه موارد تعمیم داد.')),

]

// Distribute correct-option positions so learners cannot infer the answer pattern.
const answerPositions = [2, 1, 3, 0, 2, 1, 3, 0, 1, 2, 0, 3]
TQ.forEach((seed, index) => {
  const answer = seed.options.splice(seed.correct, 1)[0]
  seed.correct = answerPositions[index]
  seed.options.splice(seed.correct, 0, answer)
})

export const AVM_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, TQ.map(seed => ({
  id: `avm-zns-${lang}-${seed.id}`,
  tags: ['avm-zns', 'gefaessmalformationen', 'gehirn'],
  fach: 'gehirn',
  question: seed.question[lang],
  options: seed.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: typeof text === 'string' ? text : text[lang] })),
  correct: String.fromCharCode(65 + seed.correct),
  explanation: seed.explanation[lang],
}))]))

// ─── Flashcards ───────────────────────────────────────────────────────────────

const TF = [
  F('definition', L('Grundlagen', 'Basics', 'مبانی'),
    L('Was ist eine zerebrale AVM?', 'What is a cerebral AVM?', 'AVM مغزی چیست؟'),
    L('Kongenitaler AV-Shunt mit Nidus — ohne Kapillarbett.', 'Congenital AV shunt with nidus — without capillary bed.', 'شانت AV مادرزادی با نیدوس — بدون بستر مویرگی.'),
    L('Direkte arteriovenöse Verbindung über ein Konvolut dysplastischer Gefäße (Nidus). Kein zwischengeschaltetes Kapillarbett → Hochdruckshunt → Blutungsrisiko.', 'Direct arteriovenous connection via a tangle of dysplastic vessels (nidus). No intervening capillary bed → high-pressure shunt → haemorrhage risk.', 'اتصال مستقیم شریانی-وریدی از طریق یک کنولوت عروق دیسپلاستیک (نیدوس). بدون بستر مویرگی واسط → شانت پرفشار → خطر خونریزی.')),

  F('nidus', L('Grundlagen', 'Basics', 'مبانی'),
    L('Was ist der Nidus der AVM?', 'What is the AVM nidus?', 'نیدوس AVM چیست؟'),
    L('Konvolut dysplastischer Gefäße ohne Kapillarbett.', 'Tangle of dysplastic vessels without a capillary bed.', 'کنولوت عروق دیسپلاستیک بدون بستر مویرگی.'),
    L('Der Nidus ist der Kern der AVM — dysplastische Gefäße, die Arterien direkt mit Venen verbinden. Fehlt bei dAVF. Der arterielle Hochdruck im venösen System schwächt die Gefäßwände und verursacht Blutungsrisiko.', 'The nidus is the core of the AVM — dysplastic vessels directly connecting arteries to veins. Absent in dAVF. High arterial pressure in the venous system weakens vessel walls and creates haemorrhage risk.', 'نیدوس هسته AVM است — عروق دیسپلاستیک که شریان‌ها را مستقیماً به وریدها متصل می‌کنند. در dAVF وجود ندارد. فشار شریانی بالا در سیستم وریدی دیواره عروق را ضعیف و خطر خونریزی ایجاد می‌کند.')),

  F('epidemio', L('Grundlagen', 'Basics', 'مبانی'),
    L('Typisches Alter und Lokalisation der AVM?', 'Typical age and location of AVM?', 'سن و محل تیپیک AVM؟'),
    L('Junge Erwachsene (20–40 J), meist supratentoriell.', 'Young adults (20–40 years), mostly supratentorial.', 'بزرگسالان جوان (۲۰–۴۰ سال)، اغلب سوپراتنتوریال.'),
    L('Junges Erwachsenenalter und supratentorielle Lage sind typische Angaben der Quelle.', 'Young adulthood and supratentorial location are typical points in the source.', 'بزرگسالی جوان و محل سوپراتنتوریال نکات تیپیک این منبع‌اند.')),

  F('blutungsrisiko', L('Klinik', 'Clinical', 'بالینی'),
    L('Wovon hängen Blutungsrisiko-Schätzungen ab?', 'What do haemorrhage risk estimates depend on?', 'برآورد خطر خونریزی به چه عواملی بستگی دارد؟'),
    L('Variiert je nach Rupturstatus und untersuchter Population.', 'Varies by rupture status and studied population.', 'با وضعیت پارگی و جمعیت مورد مطالعه تفاوت دارد.'),
    L('Blutung ist eine häufige Erstmanifestation; auch Anfälle, Kopfschmerz oder fokale Defizite kommen vor.', 'Haemorrhage is a common initial presentation; seizures, headache or focal deficits may also occur.', 'خونریزی تظاهر اولیه شایعی است؛ تشنج، سردرد یا نقص کانونی نیز ممکن است رخ دهد.')),

  F('spetzler-kriterien', L('Klassifikation', 'Classification', 'طبقه‌بندی'),
    L('Welche 3 Kriterien bewertet der Spetzler-Martin-Score?', 'Which 3 criteria does the Spetzler-Martin score assess?', 'کدام ۳ معیار را امتیاز Spetzler-Martin ارزیابی می‌کند؟'),
    L('Nidus-Größe + Lokalisation (eloquent?) + venöse Drainage (tief?)', 'Nidus size + location (eloquent?) + venous drainage (deep?)', 'اندازه نیدوس + محل (گویا؟) + درناژ وریدی (عمقی؟)'),
    L('Größe: <3 cm=1P, 3–6 cm=2P, >6 cm=3P. Eloquenz: nicht-eloquent=0P, eloquent=1P. Drainage: oberflächlich=0P, tief=1P. Gesamt 1–5 Punkte.', 'Size: <3 cm=1pt, 3–6 cm=2pt, >6 cm=3pt. Eloquence: non-eloquent=0pt, eloquent=1pt. Drainage: superficial=0pt, deep=1pt. Total 1–5 points.', 'اندازه: <۳ سانتی‌متر=۱ امتیاز، ۳–۶ سانتی‌متر=۲ امتیاز، >۶ سانتی‌متر=۳ امتیاز. گویا: غیرگویا=۰ امتیاز، گویا=۱ امتیاز. درناژ: سطحی=۰ امتیاز، عمقی=۱ امتیاز. جمع ۱–۵ امتیاز.')),

  F('spetzler-therapie', L('Klassifikation', 'Classification', 'طبقه‌بندی'),
    L('Was sagt der Spetzler-Martin-Score aus?', 'What does the Spetzler-Martin score estimate?', 'امتیاز Spetzler-Martin چه چیزی را برآورد می‌کند؟'),
    L('Risiko einer mikrochirurgischen Resektion anhand von Größe, Eloquenz und Drainage.', 'Risk of microsurgical resection based on size, eloquence and drainage.', 'خطر رزکسیون میکروجراحی بر اساس اندازه، ناحیه گویا و درناژ.'),
    L('Der Score schätzt das operative Risiko ein; die Behandlung wird individuell und multidisziplinär festgelegt.', 'The score estimates operative risk; treatment is decided individually by a multidisciplinary team.', "این امتیاز خطر جراحی را برآورد می‌کند؛ درمان باید فردی و چندتخصصی تعیین شود.")),

  F('eloquenz', L('Klassifikation', 'Classification', 'طبقه‌بندی'),
    L('Welche Areale gelten als eloquent?', 'Which areas are considered eloquent?', 'کدام نواحی گویا محسوب می‌شوند؟'),
    L('Sensomotorik, Sprache, Sehen, Thalamus, Hirnstamm, Kleinhirnstiele.', 'Sensorimotor, language, vision, thalamus, brainstem, cerebellar peduncles.', 'حسی-حرکتی، زبان، بینایی، تالاموس، ساقه مغز، پدیکل‌های مخچه‌ای.'),
    L('Vollständige Liste: Sensomotorik, Sprache, Sehrinde, Hypothalamus, Thalamus, Hirnstamm, Kleinhirnstiele, tiefe Kleinhirnkerne. Nicht-eloquent: Frontalpol, Okzipitalpol, Kleinhirnhemisphäre.', 'Complete list: sensorimotor, language, visual cortex, hypothalamus, thalamus, brainstem, cerebellar peduncles, deep cerebellar nuclei. Non-eloquent: frontal pole, occipital pole, cerebellar hemisphere.', 'لیست کامل: حسی-حرکتی، زبان، قشر بینایی، هیپوتالاموس، تالاموس، ساقه مغز، پدیکل‌های مخچه‌ای، هسته‌های عمقی مخچه. غیرگویا: قطب فرونتال، اکسیپیتال، نیم‌کره مخچه.')),

  F('flow-voids', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Welches MRT-Zeichen ist typisch für eine AVM?', 'Which MRI sign is typical of an AVM?', 'کدام علامت MRI برای AVM تیپیک است؟'),
    L('Flow voids (Signalauslöschung) in T1 und T2.', 'Flow voids (signal voids) on T1 and T2.', 'فقدان سیگنال جریان (flow void) (از بین رفتن سیگنال) در T1 و T2.'),
    L('Flow voids entstehen, wenn schnell fließendes Blut zwischen Akquisitionspulsen das Messvolumen verlässt → kein Signal. In T2 als schlängelnde hypointense Strukturen sichtbar.', 'Flow voids arise when fast-flowing blood leaves the acquisition volume between pulses → no signal. Visible on T2 as serpentine hypointense structures.', 'فقدان سیگنال جریان (flow void) ایجاد می‌شوند وقتی خون با جریان سریع بین پالس‌های اکتساب حجم اندازه‌گیری را ترک می‌کند → بدون سیگنال. در T2 به‌صورت ساختارهای هیپواینتنس مارپیچ دیده می‌شوند.')),

  F('dsa', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Welcher DSA-Befund spricht für einen arteriovenösen Shunt?', 'Which DSA finding supports an arteriovenous shunt?', 'کدام یافته DSA به نفع شانت شریانی‌وریدی است؟'),
    L('Nidus + frühe Venenfüllung in arterieller Phase.', 'Nidus + early venous filling in the arterial phase.', 'نیدوس + پُرشدگی زودرس وریدی در فاز شریانی.'),
    L('Frühe venöse Drainage während der arteriellen Phase ist ein charakteristischer Hinweis auf einen arteriovenösen Shunt.', 'Early venous drainage during the arterial phase is a characteristic sign of an arteriovenous shunt.', 'درناژ زودرس وریدی در فاز شریانی یافته‌ای شاخص به نفع شانت شریانی‌وریدی است.')),

  F('therapie-wahl', L('Management', 'Management', 'مدیریت'),
    L('Welche Faktoren fließen in die Therapieentscheidung ein?', 'Which factors inform treatment decisions?', 'چه عواملی در تصمیم درمان نقش دارند؟'),
    L('Mehrere Optionen; individuelle interdisziplinäre Abwägung.', 'Several options; individual multidisciplinary assessment.', 'چند گزینه؛ ارزیابی فردی و چندتخصصی.'),
    L('Der Score schätzt das operative Risiko; die Therapie wird individuell und multidisziplinär festgelegt.', 'The score estimates operative risk; treatment is decided individually by a multidisciplinary team.', 'امتیاز، خطر جراحی را برآورد می‌کند؛ درمان فردی و چندتخصصی تعیین می‌شود.')),

  F('gamma-knife', L('Management', 'Management', 'مدیریت'),
    L('Für welche AVM ist Gamma Knife geeignet?', 'For which AVM is Gamma Knife suitable?', "گامانایف (Gamma Knife) برای کدام AVM مناسب است؟"),
    L('Indikation abhängig von Größe, Lage, Fallmerkmalen und Behandlungsziel.', 'Indication depends on size, location, case features and treatment goals.', 'اندیکاسیون به اندازه، محل، ویژگی‌های مورد و هدف درمان وابسته است.'),
    L('Die Wirkung ist verzögert; Nutzen und Risiken müssen im Einzelfall abgewogen werden.', 'The effect is delayed; benefits and risks must be weighed individually.', 'اثر درمان با تأخیر ظاهر می‌شود؛ فایده و خطر باید برای هر بیمار جداگانه سنجیده شود.')),

  F('davf-unterschied', L('Differenzial', 'Differential', 'افتراقی'),
    L('Wie unterscheidet sich AVM von dAVF?', 'How does AVM differ from dAVF?', 'AVM چگونه از dAVF متمایز می‌شود؟'),
    L('AVM: Nidus, kongenital, Parenchym. dAVF: kein Nidus, erworben, Dura.', 'AVM: nidus, congenital, parenchymal. dAVF: no nidus, acquired, dural.', 'AVM: نیدوس، مادرزادی، پارانشیمی. dAVF: بدون نیدوس، اکتسابی، دورال.'),
    L('AVM liegt im Hirnparenchym, ist kongenital und hat einen Nidus aus dysplastischen Gefäßen. dAVF liegt in der Dura mater, ist meist erworben (Sinusthrombose) und hat keinen Nidus — nur eine direkte Fistel.', 'AVM lies in the brain parenchyma, is congenital and has a nidus of dysplastic vessels. dAVF lies in the dura mater, is mostly acquired (sinus thrombosis) and has no nidus — only a direct fistula.', 'AVM در پارانشیم مغز قرار دارد، مادرزادی است و نیدوسی از عروق دیسپلاستیک دارد. dAVF در دورامتر قرار دارد، اغلب اکتسابی است (ترومبوز سینوس) و نیدوس ندارد — فقط یک فیستول مستقیم.')),

  F('kavernom-unterschied', L('Differenzial', 'Differential', 'افتراقی'),
    L('Wie unterscheidet sich AVM von Kavernom in der MRT?', 'How does AVM differ from cavernoma on MRI?', 'AVM در MRI چگونه از کاورنوم متمایز می‌شود؟'),
    L('AVM: Flow voids (Hochfluss). Kavernom: Popcorn-Kern (Low-flow).', 'AVM: flow voids (high flow). Cavernoma: popcorn core (low flow).', 'AVM: فقدان سیگنال جریان (flow void) (جریان بالا). کاورنوم: هسته پاپ‌کورنی (کم‌جریان).'),
    L('AVM: Flow voids in T1/T2, Enhancement, angiographisch sichtbar (Nidus in DSA). Kavernom: gemischtsignaliger Popcorn-Kern + kompletter Hämosiderinsaum, angiographisch okkult (keine Feeder sichtbar).', 'AVM: flow voids on T1/T2, enhancement, visible angiographically (nidus on DSA). Cavernoma: mixed-signal popcorn core + complete haemosiderin rim, angiographically occult.', 'AVM: فقدان سیگنال جریان (flow void) در T1/T2، افزایش کنتراست، در آنژیوگرافی قابل مشاهده (نیدوس در DSA). کاورنوم: هسته با سیگنال مختلط + حاشیه کامل هموسیدرین، در آنژیوگرافی نهان.')),

  F('embolisation', L('Management', 'Management', 'مدیریت'),
    L('Welche Rolle spielt die Embolisation bei AVM?', 'What role does embolisation play in AVM?', 'آمبولیزاسیون چه نقشی در AVM دارد؟'),
    L('Präoperativ oder als Teilbehandlung; die Rolle hängt vom individuellen Behandlungsplan ab.', 'Pre-operative or as part of treatment; its role depends on the individual treatment plan.', 'پیش از جراحی یا به‌عنوان بخشی از درمان؛ نقش آن به برنامهٔ درمانی هر بیمار بستگی دارد.'),
    L('Die Rolle der Embolisation hängt von Gefäßanatomie und geplantem Behandlungsweg ab; sie kann im Einzelfall mit anderen Verfahren kombiniert werden.', 'The role of embolisation depends on vascular anatomy and the planned treatment pathway; it may be combined with other modalities in an individual case.', 'نقش آمبولیزاسیون به آناتومی عروقی و مسیر درمانی برنامه‌ریزی‌شده بستگی دارد؛ در هر مورد ممکن است با روش‌های دیگر ترکیب شود.')),

  F('swi', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Was zeigt SWI/T2* bei AVM?', 'What does SWI/T2* show in AVM?', 'SWI/T2* در AVM چه نشان می‌دهد؟'),
    L('Hämosiderin nach stattgehabter Blutung (Blooming).', 'Haemosiderin after prior haemorrhage (blooming).', "هموسیدرین بعد از خونریزی قبلی (آرتیفکت شکوفه‌ای (blooming))."),
    L('SWI/T2* kann Suszeptibilität durch Blutabbauprodukte zeigen; ein negativer Befund schließt eine Begleitläsion nicht sicher aus.', 'SWI/T2* can show susceptibility from blood products; a negative finding does not reliably exclude a coexisting lesion.', "SWI/T2* می‌تواند سوسپتیبیلیتی ناشی از فرآورده‌های خونی را نشان دهد؛ یافته منفی ضایعه همراه را با اطمینان رد نمی‌کند.")),
]

export const AVM_FLASHCARDS = TF.map((item, index) => ({
  id: `avm-zns-${String(index + 1).padStart(2, '0')}-${item.id}`,
  topicId: 'avm-zns',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
}))

export const AVM_FLASHCARD_TOPIC = {
  id: 'avm-zns',
  area: 'Kopf',
  chapter: 'Vaskuläre Erkrankungen',
  icon: '🌀',
  iconImage: '/fach/gehirn.png',
  color: '#7c3aed',
  href: '/flashcards/avm-zns',
  title: L('Arteriovenöse Malformation (AVM)', 'Arteriovenous Malformation (AVM)', 'مالفورماسیون شریانی-وریدی (AVM)'),
  subtitle: L('Spetzler-Martin · Nidus · Flow voids · DSA · Therapiestrategie', 'Spetzler-Martin · nidus · flow voids · DSA · treatment strategy', 'Spetzler-Martin · نیدوس · فقدان سیگنال جریان (flow void) · DSA · استراتژی درمان'),
}
