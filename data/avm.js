const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })
const F = (id, category, front, answer, explanation) => ({ id, category, front, answer, explanation })

export const AVM_LESSON = {
  breadcrumb: L('Arteriovenöse Malformation (AVM)', 'Arteriovenous Malformation (AVM)', 'مالفورماسیون شریانی-وریدی (AVM)'),
  title: L('Arteriovenöse Malformation (AVM)', 'Arteriovenous Malformation (AVM)', 'مالفورماسیون شریانی-وریدی (AVM)'),
  definition: L(
    'Kongenitale Gefäßfehlbildung mit direktem arteriovenösem Shunt über einen Nidus dysplastischer Gefäße — ohne zwischengeschaltetes Kapillarbett.',
    'Congenital vascular malformation with a direct arteriovenous shunt via a nidus of dysplastic vessels — without an intervening capillary bed.',
    'مالفورماسیون عروقی مادرزادی با شانت مستقیم شریانی-وریدی از طریق نیدوس عروق دیسپلاستیک — بدون بستر مویرگی واسط.'
  ),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Warning', 'هشدار'),
  toc: L('Inhalte', 'Contents', 'فهرست'),

  heroCards: [
    {
      value: L('~2–4 %/Jahr', '~2–4 %/year', '~۲–۴٪/سال'),
      label: L('Blutungsrisiko', 'Haemorrhage risk', 'خطر خونریزی'),
      text: L('Häufigste Erstmanifestation (~50 %)', 'Most common first presentation (~50%)', 'شایع‌ترین تظاهر اولیه (~۵۰٪)'),
    },
    {
      value: L('Nidus', 'Nidus', 'نیدوس'),
      label: L('Kernstruktur der AVM', 'Core structure of AVM', 'ساختار مرکزی AVM'),
      text: L('Fehlt bei dAVF und Hämangiom', 'Absent in dAVF and haemangioma', 'در dAVF و همانژیوم وجود ندارد'),
    },
    {
      value: L('SM I–II', 'SM I–II', 'SM I–II'),
      label: L('Optimale OP-Kandidaten', 'Optimal surgical candidates', 'کاندیدای بهتر برای عمل'),
      text: L('Spetzler-Martin I–II', 'Spetzler-Martin I–II', 'Spetzler-Martin I–II'),
    },
  ],

  sections: [
    { id: 'grundlagen',   icon: '📌', label: L('Grundlagen',             'Basics',                'مبانی') },
    { id: 'klinik',       icon: '🩺', label: L('Klinik',                 'Clinical',              'بالین') },
    { id: 'spetzler',     icon: '📊', label: L('Spetzler-Martin-Score',  'Spetzler-Martin Score', 'امتیاز Spetzler-Martin'), emphasis: true },
    { id: 'bildgebung',   icon: '🧲', label: L('Bildgebung',             'Imaging',               'تصویربرداری') },
    { id: 'fall',         icon: '🖼️', label: L('Fallbeispiel rID 74111', 'Case rID 74111',        'کیس rID 74111') },
    { id: 'differenzial', icon: '⚖️', label: L('Differenzialdiagnose',   'Differential',          'افتراقی') },
    { id: 'management',   icon: '🔧', label: L('Management',             'Management',            'مدیریت') },
    { id: 'takehome',     icon: '🏁', label: L('TAKE HOME MESSAGE',      'TAKE HOME MESSAGE',     'TAKE HOME MESSAGE'), emphasis: true },
  ],

  grundlagen: {
    title: L('Grundlagen & Pathophysiologie', 'Basics & Pathophysiology', 'مبانی و پاتوفیزیولوژی'),
    lead: L(
      'Die AVM besteht aus drei Komponenten: zuführende Arterien (Feeder), dem Nidus aus dysplastischen Gefäßen und drainierenden Venen. Kein Kapillarbett = Hochdruckshunt = Blutungsrisiko.',
      'The AVM has three components: feeding arteries, the nidus of dysplastic vessels and draining veins. No capillary bed = high-pressure shunt = haemorrhage risk.',
      'AVM از سه بخش تشکیل می‌شود: شریان‌های تغذیه‌کننده، نیدوس از عروق دیسپلاستیک و وریدهای تخلیه‌کننده. بدون بستر مویرگی = شانت پرفشار = خطر خونریزی.'
    ),
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
          'Prävalenz ~0,1 %. Häufig junge Erwachsene (20.–40. LJ). Meist supratentoriell (~85 %) in den Hemisphären. Kein Geschlechtsunterschied. Meist sporadisch, selten hereditär (z. B. HHT).',
          'Prevalence ~0.1%. Typically young adults (2nd–4th decade). Mostly supratentorial (~85%) in the hemispheres. No sex predilection. Mostly sporadic, rarely hereditary (e.g. HHT).',
          'شیوع ~۰.۱٪. اغلب بزرگسالان جوان (دهه ۲–۴ زندگی). عمدتاً سوپراتنتوریال (~۸۵٪) در نیم‌کره‌ها. بدون تفاوت جنسی. اغلب اسپورادیک، به‌ندرت ارثی (مثلاً HHT).'
        ),
      },
    ],
    key: L(
      'AVM = Nidus (kongenital, kein Kapillarbett) + Hochdruckshunt + Blutungsrisiko ~2–4 %/Jahr. Hauptunterschied zur dAVF: Nidus vorhanden, erworben vs. kongenital.',
      'AVM = nidus (congenital, no capillary bed) + high-pressure shunt + ~2–4%/year haemorrhage risk. Key difference from dAVF: nidus present, congenital vs. acquired.',
      'AVM = نیدوس (مادرزادی، بدون بستر مویرگی) + شانت پرفشار + خطر خونریزی ~۲–۴٪/سال. تفاوت کلیدی با dAVF: نیدوس وجود دارد، مادرزادی در مقابل اکتسابی.'
    ),
  },

  klinik: {
    title: L('Klinik', 'Clinical Presentation', 'تظاهر بالینی'),
    lead: L(
      'Blutung ist mit ~50 % die häufigste Erstmanifestation. Das Blutungsrisiko beträgt ~2–4 % pro Jahr — aber nach erster Blutung steigt es deutlich an.',
      'Haemorrhage is the most common first presentation (~50%). Haemorrhage risk is ~2–4% per year — but rises significantly after a first bleed.',
      'خونریزی با ~۵۰٪ شایع‌ترین تظاهر اولیه است. خطر خونریزی ~۲–۴٪ در سال — اما بعد از اولین خونریزی به‌طور قابل‌توجهی افزایش می‌یابد.'
    ),
    headers: [
      L('Manifestation', 'Presentation', 'تظاهر'),
      L('Häufigkeit', 'Frequency', 'فراوانی'),
      L('Klinische Details', 'Clinical details', 'جزئیات بالینی'),
    ],
    rows: [
      [
        L('Intrazerebrale Blutung', 'Intracerebral haemorrhage', 'خونریزی داخل مغزی'),
        L('~50 % (häufigste!)', '~50% (most common!)', '~۵۰٪ (شایع‌ترین!)'),
        L('Oft lobär; bei tiefer Drainage auch IVB möglich; SAB bei oberflächlicher Lage', 'Often lobar; IVH possible with deep drainage; SAH with superficial location', 'اغلب لوبار؛ IVH با درناژ عمقی ممکن؛ SAH در محل سطحی'),
      ],
      [
        L('Krampfanfälle', 'Seizures', 'تشنج'),
        L('~30 %', '~30%', '~۳۰٪'),
        L('Häufig bei kortikaler Lage; fokal oder generalisiert', 'Common with cortical location; focal or generalised', 'شایع در محل کورتیکال؛ موضعی یا عمومی'),
      ],
      [
        L('Kopfschmerzen', 'Headache', 'سردرد'),
        L('~15 %', '~15%', '~۱۵٪'),
        L('Unspezifisch; Zufallsbefund bei Bildgebung möglich', 'Non-specific; incidental finding on imaging possible', 'غیراختصاصی؛ یافته اتفاقی در تصویربرداری ممکن'),
      ],
      [
        L('Fokale neurologische Defizite', 'Focal neurological deficits', 'کسری‌های عصبی موضعی'),
        L('~5 %', '~5%', '~۵٪'),
        L('Steal-Phänomen oder venöse Stauung möglich', 'Steal phenomenon or venous congestion possible', 'پدیده سرقت یا احتقان وریدی ممکن'),
      ],
    ],
    cave: L(
      'Nach erster AVM-Blutung steigt das Wiederholungsrisiko auf ~6–18 %/Jahr im ersten Jahr. AVMs in eloquenten Arealen oder mit tiefer Drainage bluten häufiger.',
      'After a first AVM bleed, re-bleeding risk rises to ~6–18%/year in the first year. AVMs in eloquent areas or with deep drainage bleed more often.',
      'بعد از اولین خونریزی AVM، خطر تکرار در سال اول به ~۶–۱۸٪/سال افزایش می‌یابد. AVM‌های در نواحی گویا یا با درناژ عمقی بیشتر خونریزی می‌کنند.'
    ),
  },

  spetzler: {
    title: L('Spetzler-Martin-Klassifikation', 'Spetzler-Martin Classification', 'طبقه‌بندی Spetzler-Martin'),
    lead: L(
      'Prüfungsrelevant! Bewertet das OP-Risiko anhand von 3 Kriterien. Je höher der Score, desto höher das chirurgische Risiko.',
      'Highly examinable! Assesses surgical risk based on 3 criteria. The higher the score, the higher the surgical risk.',
      'بسیار مهم! خطر جراحی را بر اساس ۳ معیار ارزیابی می‌کند. هر چه امتیاز بالاتر، خطر جراحی بیشتر.'
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
      headers: [L('Grad', 'Grade', 'درجه'), L('Gesamtpunkte', 'Total points', 'امتیاز کل'), L('OP-Empfehlung', 'Surgical recommendation', 'توصیه جراحی')],
      rows: [
        [L('I', 'I', 'I'), '1', L('Resektion empfohlen — geringstes Risiko', 'Resection recommended — lowest risk', 'رزکسیون توصیه می‌شود — کمترین خطر')],
        [L('II', 'II', 'II'), '2', L('Resektion empfohlen', 'Resection recommended', 'رزکسیون توصیه می‌شود')],
        [L('III', 'III', 'III'), '3', L('Individuell — Embolisation + OP oder Radiochirurgie', 'Individual — embolisation + surgery or radiosurgery', 'فردی — آمبولیزاسیون + جراحی یا رادیوجراحی')],
        [L('IV', 'IV', 'IV'), '4', L('Konservativ oder Radiochirurgie bevorzugt', 'Conservative or radiosurgery preferred', 'محافظه‌کارانه یا رادیوجراحی ترجیح داده می‌شود')],
        [L('V', 'V', 'V'), '5', L('Meist konservativ — OP-Risiko zu hoch', 'Usually conservative — surgical risk too high', 'اغلب محافظه‌کارانه — خطر جراحی بیش از حد')],
      ],
    },
    key: L(
      'SM I + II → OP. SM IV + V → meist konservativ/Radiochirurgie. Eloquenz = Sensomotorik, Sprache, Sehen, Thalamus, Hirnstamm!',
      'SM I + II → surgery. SM IV + V → usually conservative/radiosurgery. Eloquent = sensorimotor, language, vision, thalamus, brainstem!',
      'SM I + II → جراحی. SM IV + V → اغلب محافظه‌کارانه/رادیوجراحی. گویا = حسی-حرکتی، زبان، بینایی، تالاموس، ساقه مغز!'
    ),
  },

  bildgebung: {
    title: L('Bildgebung: Sequenz für Sequenz', 'Imaging: Sequence by Sequence', 'تصویربرداری: سکانس به سکانس'),
    lead: L(
      'MRT zeigt Flow voids und Hämosiderin, MRA stellt die Gefäßarchitektur dar — aber nur die DSA ist der Goldstandard.',
      'MRI shows flow voids and haemosiderin, MRA depicts the vascular architecture — but only DSA is the gold standard.',
      'MRI Flow voids و هموسیدرین را نشان می‌دهد، MRA معماری عروقی را نمایش می‌دهد — اما فقط DSA استاندارد طلایی است.'
    ),
    headers: [
      L('Sequenz', 'Sequence', 'سکانس'),
      L('Befund', 'Finding', 'یافته'),
      L('Bedeutung', 'Relevance', 'اهمیت'),
    ],
    rows: [
      [
        L('T1 / T2 nativ', 'T1 / T2 native', 'T1 / T2 نیتیو'),
        L('Flow voids = Signalauslöschung in schnell durchflossenen Gefäßen; ggf. T2-Hyperintensität (Gliose) im umgebenden Parenchym', 'Flow voids = signal void in fast-flowing vessels; possible T2 hyperintensity (gliosis) in surrounding parenchyma', 'Flow voids = از بین رفتن سیگنال در عروق با جریان سریع؛ احتمال هایپراینتنسیتی T2 (گلیوز) در پارانشیم اطراف'),
        L('Flow voids = Hochfluss = AVM-typisch', 'Flow voids = high flow = AVM-typical', 'Flow voids = جریان بالا = تیپیک AVM'),
      ],
      [
        L('T1 + KM', 'T1 + contrast', 'T1 + کنتراست'),
        L('Starkes Enhancement der Gefäßstrukturen (Feeder, Nidus, drainierende Venen)', 'Marked enhancement of vascular structures (feeder, nidus, draining veins)', 'افزایش قوی ساختارهای عروقی (تغذیه‌کننده، نیدوس، وریدهای تخلیه‌کننده)'),
        L('Abgrenzung Nidus-Ausdehnung', 'Delineation of nidus extent', 'ترسیم محدوده نیدوس'),
      ],
      [
        'SWI / T2*',
        L('Hämosiderin­saum bei stattgehabter Blutung; Blooming-Artefakt', 'Haemosiderin rim after prior bleed; blooming artefact', 'حاشیه هموسیدرین بعد از خونریزی قبلی؛ آرتفکت Blooming'),
        L('Zeigt vergangene Mikroblutungen; schließt Kavernom-Hybride aus', 'Shows prior microbleeds; helps exclude cavernoma hybrids', 'میکروخونریزی‌های قبلی را نشان می‌دهد؛ هیبریدهای کاورنوم را رد می‌کند'),
      ],
      [
        'TOF-MRA',
        L('Nidus, Feeder und drainierende Venen darstellbar; frühe Venenfüllung in arterieller Phase', 'Nidus, feeders and draining veins visible; early venous filling in arterial phase', 'نیدوس، تغذیه‌کنندگان و وریدهای تخلیه‌کننده قابل مشاهده؛ پُرشدگی زودرس وریدی در فاز شریانی'),
        L('Nicht-invasives Screening; schlechter als DSA bei kleinen AVMs', 'Non-invasive screening; inferior to DSA for small AVMs', 'غربالگری غیرتهاجمی؛ در AVM‌های کوچک نسبت به DSA ضعیف‌تر'),
      ],
      [
        L('DSA (Goldstandard!)', 'DSA (Gold standard!)', 'DSA (استاندارد طلایی!)'),
        L('Nidus + frühe venöse Füllung in arterieller Phase = pathognomonisch. Exakte Feeder-Darstellung und Flusskinetik', 'Nidus + early venous filling in arterial phase = pathognomonic. Exact feeder anatomy and flow kinetics', 'نیدوس + پُرشدگی زودرس وریدی در فاز شریانی = پاتوگنومونیک. تصویرسازی دقیق تغذیه‌کنندگان و سینتیک جریان'),
        L('Obligat vor jeder Therapie', 'Mandatory before any treatment', 'قبل از هر درمانی اجباری'),
      ],
    ],
    key: L(
      'Flow voids in T1/T2 = AVM-Verdacht. DSA obligat für Therapieplanung. Frühe Venenfüllung in arterieller Phase = AVM-Beweis.',
      'Flow voids on T1/T2 = suspect AVM. DSA mandatory for treatment planning. Early venous filling in arterial phase = AVM proof.',
      'Flow voids در T1/T2 = شک به AVM. DSA برای برنامه‌ریزی درمان اجباری. پُرشدگی زودرس وریدی در فاز شریانی = اثبات AVM.'
    ),
  },

  fall: {
    title: L('Fallbeispiel – Radiopaedia rID 74111', 'Case example – Radiopaedia rID 74111', 'نمونه کیس – Radiopaedia rID 74111'),
    lead: L(
      'Junger Patient mit erstmaliger Krampfanfall. MRT zeigt typische Flow voids mit starker Kontrastanreicherung.',
      'Young patient presenting with a first seizure. MRI shows typical flow voids with marked contrast enhancement.',
      'بیمار جوان با اولین تشنج. MRI Flow voids تیپیک با افزایش کنتراست قوی نشان می‌دهد.'
    ),
    caseLabel: L('AVM – Gehirn', 'AVM – Brain', 'AVM – مغز'),
    caseTitle: L('Arteriovenöse Malformation', 'Arteriovenous Malformation', 'مالفورماسیون شریانی-وریدی'),
    caseMeta: L(
      'Junger Erwachsener. Supratentorielle AVM mit typischen Flow voids und deutlichem Nidus in der MRA.',
      'Young adult. Supratentorial AVM with typical flow voids and clear nidus on MRA.',
      'بزرگسال جوان. AVM سوپراتنتوریال با Flow voids تیپیک و نیدوس واضح در MRA.'
    ),
    images: [
      {
        src: '/avm/case-74111/t1-nativ.jpeg',
        label: 'T1 nativ',
        alt: L('T1-MRT: Flow voids des AVM-Nidus', 'T1 MRI: AVM nidus flow voids', 'T1 MRI: Flow voids نیدوس AVM'),
        caption: L('T1 nativ: zentrale Flow voids als Ausdruck des schnellen Blutflusses im Nidus', 'T1 native: central flow voids reflecting rapid blood flow in the nidus', 'T1 نیتیو: Flow voids مرکزی منعکس‌کننده جریان خون سریع در نیدوس'),
      },
      {
        src: '/avm/case-74111/t2.jpeg',
        label: 'T2',
        alt: L('T2-MRT: Geschlängelte Flow voids der AVM', 'T2 MRI: Serpentine AVM flow voids', 'T2 MRI: Flow voids مارپیچ AVM'),
        caption: L('T2: serpentine Flow voids im Bereich des Nidus — klassisches Zeichen eines arteriovenösen Hochflusses', 'T2: serpentine flow voids in the nidus region — classic sign of arteriovenous high flow', 'T2: Flow voids مارپیچ در ناحیه نیدوس — علامت کلاسیک جریان شریانی-وریدی بالا'),
      },
      {
        src: '/avm/case-74111/mra.jpeg',
        label: 'MRA C+',
        alt: L('MRA C+: Nidus und drainierende Venen der AVM', 'MRA C+: Nidus and draining veins of AVM', 'MRA C+: نیدوس و وریدهای تخلیه‌کننده AVM'),
        caption: L('Kontrastmittel-MRA koronal: Nidus mit zuführenden Arterien und erweiterten drainierenden Venen deutlich darstellbar', 'Contrast-enhanced MRA coronal: nidus with feeding arteries and dilated draining veins clearly depicted', 'MRA کنتراستی کورونال: نیدوس با شریان‌های تغذیه‌کننده و وریدهای تخلیه‌کننده گشاد به‌وضوح نمایش داده می‌شود'),
      },
    ],
    findingsTitle: L('Radiologische Befunde', 'Radiological findings', 'یافته‌های رادیولوژیک'),
    findings: [
      L('T1 nativ: zentrale hypointense Flow voids im Bereich des Nidus (Signalauslöschung durch Hochfluss)', 'T1 native: central hypointense flow voids in the nidus region (signal loss due to high flow)', 'T1 نیتیو: Flow voids هیپواینتنس مرکزی در ناحیه نیدوس (از بین رفتن سیگنال به دلیل جریان بالا)'),
      L('T2: serpentine Hypointensitäten (Flow voids) ohne umgebende Gliose — reines Hochflussmuster', 'T2: serpentine hypointensities (flow voids) without surrounding gliosis — pure high-flow pattern', 'T2: هیپواینتنسیتی‌های مارپیچ (Flow voids) بدون گلیوز اطراف — الگوی خالص جریان بالا'),
      L('MRA C+: gut abgrenzbarer Nidus mit früher arterieller Kontrastierung; erweiterte drainierte Venen erkennbar', 'MRA C+: well-defined nidus with early arterial enhancement; dilated draining veins visible', 'MRA C+: نیدوس با حدود مشخص با افزایش زودرس شریانی؛ وریدهای تخلیه‌کننده گشاد قابل تشخیص'),
      L('Spetzler-Martin Einschätzung: kleiner Nidus (<3 cm, 1 Punkt), nicht-eloquente Lokalisation (0 Punkte), oberflächliche Drainage (0 Punkte) → Grad I', 'Spetzler-Martin assessment: small nidus (<3 cm, 1 point), non-eloquent location (0 points), superficial drainage (0 points) → Grade I', 'ارزیابی Spetzler-Martin: نیدوس کوچک (<۳ سانتی‌متر، ۱ امتیاز)، محل غیرگویا (۰ امتیاز)، درناژ سطحی (۰ امتیاز) → درجه I'),
    ],
    diagnosis: L(
      'Spetzler-Martin Grad I AVM — idealer OP-Kandidat. Empfehlung: mikrochirurgische Resektion nach DSA-Bestätigung.',
      'Spetzler-Martin Grade I AVM — ideal surgical candidate. Recommendation: microsurgical resection after DSA confirmation.',
      'AVM درجه I Spetzler-Martin — کاندیدای ایده‌آل جراحی. توصیه: رزکسیون میکروجراحی بعد از تأیید DSA.'
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
      'Flow voids به‌تنهایی اختصاصی نیستند — سایر ضایعات پرجریان باید رد شوند.'
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
        L('Diffuse, schlecht begrenzte AVM-Variante; kein klarer Nidus; diffuses Enhancement; meist kein Blutungsrisiko', 'Diffuse, poorly defined AVM variant; no clear nidus; diffuse enhancement; usually no haemorrhage risk', 'نوع AVM منتشر با حدود نامشخص؛ بدون نیدوس واضح؛ افزایش منتشر؛ معمولاً بدون خطر خونریزی'),
      ],
      [
        'Moyamoya',
        L('Viele kollaterale Gefäße (Puff-of-smoke in DSA/MRA); kein Nidus; Stenosen der ICA; junges Alter oder Asiaten', 'Multiple collateral vessels (puff of smoke on DSA/MRA); no nidus; ICA stenoses; young or Asian patients', 'عروق کولاترال فراوان (دود در DSA/MRA)؛ بدون نیدوس؛ تنگی ICA؛ سنین جوان یا بیماران آسیایی'),
      ],
    ],
  },

  management: {
    title: L('Management & Therapie', 'Management & Treatment', 'مدیریت و درمان'),
    lead: L(
      'Die Therapiestrategie basiert auf dem Spetzler-Martin-Score und dem individuellen Patientenrisiko. DSA ist immer vor Therapie obligat.',
      'Treatment strategy is based on the Spetzler-Martin score and individual patient risk. DSA is always mandatory before treatment.',
      'استراتژی درمان بر اساس امتیاز Spetzler-Martin و خطر فردی بیمار است. DSA همیشه قبل از درمان اجباری است.'
    ),
    items: [
      {
        icon: '🔪',
        title: L('Mikrochirurgische Resektion', 'Microsurgical resection', 'رزکسیون میکروجراحی'),
        text: L(
          'Therapie der Wahl bei Spetzler-Martin I–II. Ziel: vollständige Resektion des Nidus. Kurativ bei vollständiger Entfernung. Oft vorab Embolisation.',
          'Treatment of choice for Spetzler-Martin I–II. Goal: complete nidus resection. Curative with complete removal. Often preceded by embolisation.',
          'درمان انتخابی برای Spetzler-Martin I–II. هدف: رزکسیون کامل نیدوس. در صورت برداشت کامل، درمان‌کننده. اغلب قبل از آن آمبولیزاسیون.'
        ),
      },
      {
        icon: '🎯',
        title: L('Endovaskuläre Embolisation', 'Endovascular embolisation', 'آمبولیزاسیون اندوواسکولار'),
        text: L(
          'Meist präoperativ zur Flussreduktion. Alleine selten kurativ. Kathetembolisation der Feeder mit Flüssigkleber (Onyx) oder Partikeln.',
          'Mostly pre-operative to reduce flow. Rarely curative alone. Catheter embolisation of feeders with liquid embolic (Onyx) or particles.',
          'اغلب قبل از عمل برای کاهش جریان. به‌تنهایی به‌ندرت درمان‌کننده. آمبولیزاسیون کاتتری تغذیه‌کنندگان با آمبولیک مایع (Onyx) یا ذرات.'
        ),
      },
      {
        icon: '☢️',
        title: L('Stereotaktische Radiochirurgie (Gamma Knife)', 'Stereotactic radiosurgery (Gamma Knife)', 'رادیوجراحی استریوتاکتیک (Gamma Knife)'),
        text: L(
          'Für kleine (<3 cm), tief gelegene AVMs (SM III–IV). Wirkung über 2–3 Jahre. 80 % Obliterationsrate bei kleinen AVMs. In der Zwischenzeit bleibt Blutungsrisiko bestehen!',
          'For small (<3 cm), deep AVMs (SM III–IV). Effect over 2–3 years. 80% obliteration rate for small AVMs. Haemorrhage risk persists during this period!',
          'برای AVM‌های کوچک (<۳ سانتی‌متر) عمقی (SM III–IV). اثر طی ۲–۳ سال. نرخ ۸۰٪ انسداد برای AVM‌های کوچک. خطر خونریزی در این مدت همچنان وجود دارد!'
        ),
      },
    ],
    cave: L(
      'Spetzler-Martin IV–V: OP-Risiko überwiegt oft den Nutzen → meist konservatives Vorgehen oder Gamma Knife. Bei akuter Blutung: zunächst Hämatom-Evakuation, AVM-Therapie elektiv.',
      'Spetzler-Martin IV–V: surgical risk often outweighs benefit → usually conservative or Gamma Knife. With acute haemorrhage: first evacuate haematoma, then elective AVM treatment.',
      'Spetzler-Martin IV–V: خطر جراحی اغلب از مزیت پیشی می‌گیرد → معمولاً محافظه‌کارانه یا Gamma Knife. در خونریزی حاد: ابتدا تخلیه هماتوم، سپس درمان AVM به‌صورت انتخابی.'
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
          'نیدوس عامل افتراق AVM از dAVF است (بدون نیدوس). Flow voids در T1/T2 = شک به AVM. DSA = استاندارد طلایی برای تأیید.'
        ),
      },
      {
        title: L('Spetzler-Martin entscheidet', 'Spetzler-Martin decides', 'Spetzler-Martin تصمیم می‌گیرد'),
        text: L(
          'Score 1–5: Größe + Lokalisation (eloquent?) + Drainage (tief?). SM I–II → OP. SM IV–V → konservativ/Radiochirurgie. SM III → individuell.',
          'Score 1–5: size + location (eloquent?) + drainage (deep?). SM I–II → surgery. SM IV–V → conservative/radiosurgery. SM III → individual.',
          'امتیاز ۱–۵: اندازه + محل (گویا؟) + درناژ (عمقی؟). SM I–II → جراحی. SM IV–V → محافظه‌کارانه/رادیوجراحی. SM III → فردی.'
        ),
      },
      {
        title: L('Blutungsrisiko ~2–4 %/Jahr', 'Haemorrhage risk ~2–4%/year', 'خطر خونریزی ~۲–۴٪/سال'),
        text: L(
          'Nach erster Blutung steigt das Risiko auf ~6–18 %/Jahr. Blutung (~50 %) ist häufigste Erstmanifestation. Krampfanfälle (~30 %) sind zweithäufigst.',
          'After a first bleed, risk rises to ~6–18%/year. Haemorrhage (~50%) is the most common first presentation. Seizures (~30%) are second most common.',
          'بعد از اولین خونریزی، خطر به ~۶–۱۸٪/سال افزایش می‌یابد. خونریزی (~۵۰٪) شایع‌ترین تظاهر اولیه است. تشنج (~۳۰٪) دومین است.'
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
    L('Wie hoch ist das jährliche Blutungsrisiko einer unbehandelten AVM?',
      'What is the annual haemorrhage risk of an untreated AVM?',
      'خطر سالانه خونریزی یک AVM درمان‌نشده چقدر است؟'),
    [
      L('~2–4 %', '~2–4%', '~۲–۴٪'),
      L('~0,5–1 %', '~0.5–1%', '~۰.۵–۱٪'),
      L('~10–15 %', '~10–15%', '~۱۰–۱۵٪'),
      L('~20–25 %', '~20–25%', '~۲۰–۲۵٪'),
    ], 0,
    L('Das AVM-Blutungsrisiko beträgt ~2–4 % pro Jahr. Nach einer ersten Blutung steigt es auf ~6–18 %/Jahr im ersten Jahr.',
      'AVM haemorrhage risk is ~2–4% per year. After a first bleed it rises to ~6–18%/year in the first year.',
      'خطر خونریزی AVM ~۲–۴٪ در سال است. بعد از اولین خونریزی در سال اول به ~۶–۱۸٪/سال افزایش می‌یابد.')),

  Q('03',
    L('Was ist die häufigste klinische Erstmanifestation einer AVM?',
      'What is the most common first clinical presentation of an AVM?',
      'شایع‌ترین تظاهر بالینی اولیه AVM چیست؟'),
    [
      L('Intrazerebrale Blutung (~50 %)', 'Intracerebral haemorrhage (~50%)', 'خونریزی داخل مغزی (~۵۰٪)'),
      L('Krampfanfall (~50 %)', 'Seizure (~50%)', 'تشنج (~۵۰٪)'),
      L('Kopfschmerzen (~50 %)', 'Headache (~50%)', 'سردرد (~۵۰٪)'),
      L('Zufallsbefund (~50 %)', 'Incidental finding (~50%)', 'یافته اتفاقی (~۵۰٪)'),
    ], 0,
    L('Blutung ist mit ~50 % die häufigste Erstmanifestation der AVM. Krampfanfälle (~30 %) sind die zweithäufigste.',
      'Haemorrhage at ~50% is the most common first presentation of AVM. Seizures (~30%) are second most common.',
      'خونریزی با ~۵۰٪ شایع‌ترین تظاهر اولیه AVM است. تشنج (~۳۰٪) دومین است.')),

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
      L('Flow voids in T1/T2 durch schnellen Blutfluss', 'Flow voids on T1/T2 due to rapid blood flow', 'Flow voids در T1/T2 به دلیل جریان خون سریع'),
      L('Brush-like Enhancement in T1 C+', 'Brush-like enhancement on T1 C+', 'افزایش برس‌مانند در T1 C+'),
      L('Popcorn-Kern in T2', 'Popcorn core on T2', 'هسته پاپ‌کورنی در T2'),
      L('Periläsionäres Ödem in FLAIR', 'Perilesional oedema on FLAIR', 'ادم اطراف ضایعه در FLAIR'),
    ], 0,
    L('Flow voids entstehen durch Signalauslöschung bei schnell fließendem Blut. Sie sind das typische T1/T2-Zeichen einer AVM.',
      'Flow voids arise from signal loss with rapidly flowing blood. They are the typical T1/T2 sign of AVM.',
      'Flow voids از از بین رفتن سیگنال با خون با جریان سریع ایجاد می‌شوند. آن‌ها علامت تیپیک T1/T2 AVM هستند.')),

  Q('07',
    L('Was ist der Goldstandard zur Diagnostik und Therapieplanung einer AVM?',
      'What is the gold standard for AVM diagnosis and treatment planning?',
      'استاندارد طلایی برای تشخیص و برنامه‌ریزی درمان AVM چیست؟'),
    [
      L('Digitale Subtraktionsangiographie (DSA)', 'Digital subtraction angiography (DSA)', 'آنژیوگرافی تفریق دیجیتال (DSA)'),
      L('TOF-MRA', 'TOF-MRA', 'TOF-MRA'),
      L('CT-Angiographie', 'CT angiography', 'آنژیوگرافی CT'),
      L('3T-MRT mit SWI', '3T MRI with SWI', 'MRI 3T با SWI'),
    ], 0,
    L('Nur die DSA zeigt Nidus, alle Feeder, Flusskinetik und die genaue Drainageanatomie. Die frühe Venenfüllung in arterieller Phase ist pathognomonisch.',
      'Only DSA shows the nidus, all feeders, flow kinetics and exact drainage anatomy. Early venous filling in the arterial phase is pathognomonic.',
      'فقط DSA نیدوس، همه تغذیه‌کنندگان، سینتیک جریان و آناتومی دقیق درناژ را نشان می‌دهد. پُرشدگی زودرس وریدی در فاز شریانی پاتوگنومونیک است.')),

  Q('08',
    L('Welches bildgebende Muster in der DSA ist pathognomonisch für eine AVM?',
      'Which DSA finding is pathognomonic for an AVM?',
      'کدام الگوی تصویربرداری در DSA برای AVM پاتوگنومونیک است؟'),
    [
      L('Nidus + frühe Venenfüllung in der arteriellen Phase', 'Nidus + early venous filling in the arterial phase', 'نیدوس + پُرشدگی زودرس وریدی در فاز شریانی'),
      L('Aneurysma an der Bifurkation der A. cerebri media', 'Aneurysm at the MCA bifurcation', 'آنوریسم در انشعاب شریان مغزی میانی'),
      L('Retrograde Sinusfüllung ohne Nidus', 'Retrograde sinus filling without nidus', 'پُرشدگی رتروگراد سینوس بدون نیدوس'),
      L('Diffuses Hypervaskularisierungsmuster ohne Nidus', 'Diffuse hypervascularisation without nidus', 'الگوی هایپرواسکولاریزاسیون منتشر بدون نیدوس'),
    ], 0,
    L('Nidus + frühe venöse Füllung in arterieller Phase = klassisches DSA-Zeichen der AVM (Kurzschlussphänomen ohne Kapillarbett).',
      'Nidus + early venous filling in the arterial phase = classic DSA sign of AVM (shunting without capillary bed).',
      'نیدوس + پُرشدگی زودرس وریدی در فاز شریانی = علامت کلاسیک DSA AVM (پدیده اتصال کوتاه بدون بستر مویرگی).')),

  Q('09',
    L('Für welche AVM ist mikrochirurgische Resektion die bevorzugte Therapie?',
      'For which AVM is microsurgical resection the preferred treatment?',
      'برای کدام AVM رزکسیون میکروجراحی درمان ترجیحی است؟'),
    [
      L('Spetzler-Martin I und II', 'Spetzler-Martin I and II', 'Spetzler-Martin I و II'),
      L('Spetzler-Martin IV und V', 'Spetzler-Martin IV and V', 'Spetzler-Martin IV و V'),
      L('Alle AVMs unabhängig vom Score', 'All AVMs regardless of score', 'تمام AVM‌ها صرف‌نظر از امتیاز'),
      L('Nur bei akuter Blutung', 'Only with acute haemorrhage', 'فقط در خونریزی حاد'),
    ], 0,
    L('SM I–II haben kleines Nidusvolumen und/oder nicht-eloquente Lage → geringes OP-Risiko → Resektion empfohlen. SM IV–V: meist konservativ oder Radiochirurgie.',
      'SM I–II have small nidus volume and/or non-eloquent location → low surgical risk → resection recommended. SM IV–V: usually conservative or radiosurgery.',
      'SM I–II حجم نیدوس کوچک و/یا محل غیرگویا دارند → خطر پایین جراحی → رزکسیون توصیه می‌شود. SM IV–V: اغلب محافظه‌کارانه یا رادیوجراحی.')),

  Q('10',
    L('Welche Therapie ist für kleine, tief gelegene AVMs (SM III–IV) bei jungen Patienten geeignet?',
      'Which treatment is suitable for small, deep AVMs (SM III–IV) in young patients?',
      'کدام درمان برای AVM‌های کوچک عمقی (SM III–IV) در بیماران جوان مناسب است؟'),
    [
      L('Stereotaktische Radiochirurgie (Gamma Knife)', 'Stereotactic radiosurgery (Gamma Knife)', 'رادیوجراحی استریوتاکتیک (Gamma Knife)'),
      L('Notfallmäßige Kraniotomie', 'Emergency craniotomy', 'کرانیوتومی اورژانسی'),
      L('Alleinige Embolisation', 'Embolisation alone', 'آمبولیزاسیون به‌تنهایی'),
      L('Kortikosteroide', 'Corticosteroids', 'کورتیکواستروئیدها'),
    ], 0,
    L('Gamma Knife erreicht bei kleinen AVMs (<3 cm) eine Obliterationsrate von ~80 % über 2–3 Jahre. In der Zwischenzeit besteht weiterhin Blutungsrisiko.',
      'Gamma Knife achieves ~80% obliteration of small AVMs (<3 cm) over 2–3 years. Haemorrhage risk persists during this interval.',
      'Gamma Knife برای AVM‌های کوچک (<۳ سانتی‌متر) نرخ انسداد ~۸۰٪ طی ۲–۳ سال دارد. خطر خونریزی در این فاصله همچنان وجود دارد.')),

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
    L('Eine unbehandelte AVM blutet erstmalig. Wie verändert sich das jährliche Blutungsrisiko danach?',
      'An untreated AVM has its first bleed. How does the annual haemorrhage risk change afterwards?',
      'یک AVM درمان‌نشده اولین خونریزی را دارد. خطر سالانه خونریزی بعد از آن چگونه تغییر می‌کند؟'),
    [
      L('Steigt auf ~6–18 % im ersten Jahr', 'Rises to ~6–18% in the first year', 'به ~۶–۱۸٪ در سال اول افزایش می‌یابد'),
      L('Sinkt auf <1 % durch Fibrosierung', 'Falls to <1% due to fibrosis', 'به دلیل فیبروز به <۱٪ کاهش می‌یابد'),
      L('Bleibt unverändert bei 2–4 %', 'Remains unchanged at 2–4%', 'بدون تغییر در ۲–۴٪ می‌ماند'),
      L('Steigt auf >50 % im ersten Jahr', 'Rises to >50% in the first year', 'به >۵۰٪ در سال اول افزایش می‌یابد'),
    ], 0,
    L('Nach erster AVM-Blutung steigt das Wiederholungsrisiko auf ~6–18 %/Jahr im ersten Jahr — deutlich höher als das Basisrisiko von 2–4 %.',
      'After a first AVM bleed, re-bleeding risk rises to ~6–18%/year in the first year — significantly higher than the baseline 2–4%.',
      'بعد از اولین خونریزی AVM، خطر تکرار در سال اول به ~۶–۱۸٪/سال افزایش می‌یابد — به‌طور قابل‌توجهی بیشتر از خطر پایه ۲–۴٪.')),
]

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
    L('~85 % supratentoriell in den Hemisphären. Prävalenz ~0,1 %. Meist sporadisch; selten HHT (hereditäre hämorrhagische Teleangiektasie) mit multiplen AVMs.', '~85% supratentorial in the hemispheres. Prevalence ~0.1%. Usually sporadic; rarely HHT with multiple AVMs.', '~۸۵٪ سوپراتنتوریال در نیم‌کره‌ها. شیوع ~۰.۱٪. اغلب اسپورادیک؛ به‌ندرت HHT با AVM‌های متعدد.')),

  F('blutungsrisiko', L('Klinik', 'Clinical', 'بالینی'),
    L('Jährliches Blutungsrisiko einer AVM?', 'Annual haemorrhage risk of an AVM?', 'خطر سالانه خونریزی AVM؟'),
    L('~2–4 % / Jahr (nach erster Blutung ~6–18 %).', '~2–4%/year (after first bleed ~6–18%).', '~۲–۴٪/سال (بعد از اولین خونریزی ~۶–۱۸٪).'),
    L('Blutung (~50 %) ist häufigste Erstmanifestation. Krampfanfälle (~30 %) zweit. Das Risiko verdrei- bis verneunfacht sich nach erster Blutung im ersten Jahr.', 'Haemorrhage (~50%) is the most common first presentation. Seizures (~30%) are second. Risk triples to ninefold after a first bleed in year one.', 'خونریزی (~۵۰٪) شایع‌ترین تظاهر اولیه است. تشنج (~۳۰٪) دوم است. خطر بعد از اولین خونریزی در سال اول سه تا نه برابر می‌شود.')),

  F('spetzler-kriterien', L('Klassifikation', 'Classification', 'طبقه‌بندی'),
    L('Welche 3 Kriterien bewertet der Spetzler-Martin-Score?', 'Which 3 criteria does the Spetzler-Martin score assess?', 'کدام ۳ معیار را امتیاز Spetzler-Martin ارزیابی می‌کند؟'),
    L('Nidus-Größe + Lokalisation (eloquent?) + venöse Drainage (tief?)', 'Nidus size + location (eloquent?) + venous drainage (deep?)', 'اندازه نیدوس + محل (گویا؟) + درناژ وریدی (عمقی؟)'),
    L('Größe: <3 cm=1P, 3–6 cm=2P, >6 cm=3P. Eloquenz: nicht-eloquent=0P, eloquent=1P. Drainage: oberflächlich=0P, tief=1P. Gesamt 1–5 Punkte.', 'Size: <3 cm=1pt, 3–6 cm=2pt, >6 cm=3pt. Eloquence: non-eloquent=0pt, eloquent=1pt. Drainage: superficial=0pt, deep=1pt. Total 1–5 points.', 'اندازه: <۳ سانتی‌متر=۱ امتیاز، ۳–۶ سانتی‌متر=۲ امتیاز، >۶ سانتی‌متر=۳ امتیاز. گویا: غیرگویا=۰ امتیاز، گویا=۱ امتیاز. درناژ: سطحی=۰ امتیاز، عمقی=۱ امتیاز. جمع ۱–۵ امتیاز.')),

  F('spetzler-therapie', L('Klassifikation', 'Classification', 'طبقه‌بندی'),
    L('Spetzler-Martin I–II vs. IV–V: Therapiestrategie?', 'Spetzler-Martin I–II vs. IV–V: treatment strategy?', 'Spetzler-Martin I–II در مقابل IV–V: استراتژی درمان؟'),
    L('I–II: OP. IV–V: konservativ/Radiochirurgie.', 'I–II: surgery. IV–V: conservative/radiosurgery.', 'I–II: جراحی. IV–V: محافظه‌کارانه/رادیوجراحی.'),
    L('SM I–II: kleines/nicht-eloquentes Nidus, geringe Drainagetiefe → günstiges OP-Risiko. SM IV–V: OP-Risiko zu hoch → Gamma Knife oder beobachten. SM III: individuell abwägen.', 'SM I–II: small/non-eloquent nidus, superficial drainage → favourable surgical risk. SM IV–V: surgical risk too high → Gamma Knife or observe. SM III: individual assessment.', 'SM I–II: نیدوس کوچک/غیرگویا، درناژ سطحی → خطر جراحی مطلوب. SM IV–V: خطر جراحی بیش از حد → Gamma Knife یا مشاهده. SM III: ارزیابی فردی.')),

  F('eloquenz', L('Klassifikation', 'Classification', 'طبقه‌بندی'),
    L('Welche Areale gelten als eloquent?', 'Which areas are considered eloquent?', 'کدام نواحی گویا محسوب می‌شوند؟'),
    L('Sensomotorik, Sprache, Sehen, Thalamus, Hirnstamm, Kleinhirnstiele.', 'Sensorimotor, language, vision, thalamus, brainstem, cerebellar peduncles.', 'حسی-حرکتی، زبان، بینایی، تالاموس، ساقه مغز، پدیکل‌های مخچه‌ای.'),
    L('Vollständige Liste: Sensomotorik, Sprache, Sehrinde, Hypothalamus, Thalamus, Hirnstamm, Kleinhirnstiele, tiefe Kleinhirnkerne. Nicht-eloquent: Frontalpol, Okzipitalpol, Kleinhirnhemisphäre.', 'Complete list: sensorimotor, language, visual cortex, hypothalamus, thalamus, brainstem, cerebellar peduncles, deep cerebellar nuclei. Non-eloquent: frontal pole, occipital pole, cerebellar hemisphere.', 'لیست کامل: حسی-حرکتی، زبان، قشر بینایی، هیپوتالاموس، تالاموس، ساقه مغز، پدیکل‌های مخچه‌ای، هسته‌های عمقی مخچه. غیرگویا: قطب فرونتال، اکسیپیتال، نیم‌کره مخچه.')),

  F('flow-voids', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Welches MRT-Zeichen ist typisch für eine AVM?', 'Which MRI sign is typical of an AVM?', 'کدام علامت MRI برای AVM تیپیک است؟'),
    L('Flow voids (Signalauslöschung) in T1 und T2.', 'Flow voids (signal voids) on T1 and T2.', 'Flow voids (از بین رفتن سیگنال) در T1 و T2.'),
    L('Flow voids entstehen, wenn schnell fließendes Blut zwischen Akquisitionspulsen das Messvolumen verlässt → kein Signal. In T2 als schlängelnde hypointense Strukturen sichtbar.', 'Flow voids arise when fast-flowing blood leaves the acquisition volume between pulses → no signal. Visible on T2 as serpentine hypointense structures.', 'Flow voids ایجاد می‌شوند وقتی خون با جریان سریع بین پالس‌های اکتساب حجم اندازه‌گیری را ترک می‌کند → بدون سیگنال. در T2 به‌صورت ساختارهای هیپواینتنس مارپیچ دیده می‌شوند.')),

  F('dsa', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Welcher DSA-Befund ist pathognomonisch für eine AVM?', 'Which DSA finding is pathognomonic for AVM?', 'کدام یافته DSA برای AVM پاتوگنومونیک است؟'),
    L('Nidus + frühe Venenfüllung in arterieller Phase.', 'Nidus + early venous filling in the arterial phase.', 'نیدوس + پُرشدگی زودرس وریدی در فاز شریانی.'),
    L('In arterieller Phase erscheinen Feeder und Nidus. Wenn bereits in dieser Phase Venen gefüllt sind (frühe venöse Füllung), ist der AV-Shunt ohne Kapillarbett nachgewiesen — pathognomonisch.', 'In the arterial phase, feeders and nidus opacify. If veins are already filling in this phase (early venous filling), the capillary-free AV shunt is proven — pathognomonic.', 'در فاز شریانی، تغذیه‌کنندگان و نیدوس پُر می‌شوند. اگر وریدها در این فاز قبلاً پُر شوند (پُرشدگی زودرس وریدی)، شانت AV بدون مویرگ اثبات می‌شود — پاتوگنومونیک.')),

  F('therapie-wahl', L('Management', 'Management', 'مدیریت'),
    L('Erste Wahl bei Spetzler-Martin I–II?', 'First choice for Spetzler-Martin I–II?', 'انتخاب اول برای Spetzler-Martin I–II؟'),
    L('Mikrochirurgische Resektion.', 'Microsurgical resection.', 'رزکسیون میکروجراحی.'),
    L('SM I–II: geringes OP-Risiko → kurative Resektion. Oft präoperative Embolisation der Feeder zur Flussreduktion. SM IV–V: Gamma Knife oder konservativ.', 'SM I–II: low surgical risk → curative resection. Often pre-operative feeder embolisation for flow reduction. SM IV–V: Gamma Knife or conservative.', 'SM I–II: خطر پایین جراحی → رزکسیون درمان‌کننده. اغلب آمبولیزاسیون قبل از عمل تغذیه‌کنندگان برای کاهش جریان. SM IV–V: Gamma Knife یا محافظه‌کارانه.')),

  F('gamma-knife', L('Management', 'Management', 'مدیریت'),
    L('Für welche AVM ist Gamma Knife geeignet?', 'For which AVM is Gamma Knife suitable?', 'Gamma Knife برای کدام AVM مناسب است؟'),
    L('Kleine (<3 cm), tief gelegene AVMs (SM III–IV).', 'Small (<3 cm), deep AVMs (SM III–IV).', 'AVM‌های کوچک (<۳ سانتی‌متر) عمقی (SM III–IV).'),
    L('Obliterationsrate ~80 % bei kleinen AVMs nach 2–3 Jahren. In dieser Zeit besteht weiterhin Blutungsrisiko. Nicht geeignet für große AVMs >3 cm.', 'Obliteration rate ~80% for small AVMs after 2–3 years. Haemorrhage risk persists during this period. Not suitable for large AVMs >3 cm.', 'نرخ انسداد ~۸۰٪ برای AVM‌های کوچک بعد از ۲–۳ سال. خطر خونریزی در این مدت همچنان وجود دارد. برای AVM‌های بزرگ >۳ سانتی‌متر مناسب نیست.')),

  F('davf-unterschied', L('Differenzial', 'Differential', 'افتراقی'),
    L('Wie unterscheidet sich AVM von dAVF?', 'How does AVM differ from dAVF?', 'AVM چگونه از dAVF متمایز می‌شود؟'),
    L('AVM: Nidus, kongenital, Parenchym. dAVF: kein Nidus, erworben, Dura.', 'AVM: nidus, congenital, parenchymal. dAVF: no nidus, acquired, dural.', 'AVM: نیدوس، مادرزادی، پارانشیمی. dAVF: بدون نیدوس، اکتسابی، دورال.'),
    L('AVM liegt im Hirnparenchym, ist kongenital und hat einen Nidus aus dysplastischen Gefäßen. dAVF liegt in der Dura mater, ist meist erworben (Sinusthrombose) und hat keinen Nidus — nur eine direkte Fistel.', 'AVM lies in the brain parenchyma, is congenital and has a nidus of dysplastic vessels. dAVF lies in the dura mater, is mostly acquired (sinus thrombosis) and has no nidus — only a direct fistula.', 'AVM در پارانشیم مغز قرار دارد، مادرزادی است و نیدوسی از عروق دیسپلاستیک دارد. dAVF در دورامتر قرار دارد، اغلب اکتسابی است (ترومبوز سینوس) و نیدوس ندارد — فقط یک فیستول مستقیم.')),

  F('kavernom-unterschied', L('Differenzial', 'Differential', 'افتراقی'),
    L('Wie unterscheidet sich AVM von Kavernom in der MRT?', 'How does AVM differ from cavernoma on MRI?', 'AVM در MRI چگونه از کاورنوم متمایز می‌شود؟'),
    L('AVM: Flow voids (Hochfluss). Kavernom: Popcorn-Kern (Low-flow).', 'AVM: flow voids (high flow). Cavernoma: popcorn core (low flow).', 'AVM: Flow voids (جریان بالا). کاورنوم: هسته پاپ‌کورنی (کم‌جریان).'),
    L('AVM: Flow voids in T1/T2, Enhancement, angiographisch sichtbar (Nidus in DSA). Kavernom: gemischtsignaliger Popcorn-Kern + kompletter Hämosiderinsaum, angiographisch okkult (keine Feeder sichtbar).', 'AVM: flow voids on T1/T2, enhancement, visible angiographically (nidus on DSA). Cavernoma: mixed-signal popcorn core + complete haemosiderin rim, angiographically occult.', 'AVM: Flow voids در T1/T2، افزایش کنتراست، در آنژیوگرافی قابل مشاهده (نیدوس در DSA). کاورنوم: هسته با سیگنال مختلط + حاشیه کامل هموسیدرین، در آنژیوگرافی نهان.')),

  F('embolisation', L('Management', 'Management', 'مدیریت'),
    L('Welche Rolle spielt die Embolisation bei AVM?', 'What role does embolisation play in AVM?', 'آمبولیزاسیون چه نقشی در AVM دارد؟'),
    L('Meist präoperativ zur Flussreduktion — selten allein kurativ.', 'Mostly pre-operative for flow reduction — rarely curative alone.', 'اغلب قبل از عمل برای کاهش جریان — به‌ندرت به‌تنهایی درمان‌کننده.'),
    L('Durch Katheterembolisation der Feeder (Onyx, Partikel) wird der Blutfluss zum Nidus reduziert → einfachere Resektion. Alleinige Embolisation erreicht selten vollständige Okklusion.', 'Catheter embolisation of feeders (Onyx, particles) reduces blood flow to the nidus → easier resection. Embolisation alone rarely achieves complete occlusion.', 'آمبولیزاسیون کاتتری تغذیه‌کنندگان (Onyx، ذرات) جریان خون به نیدوس را کاهش می‌دهد → رزکسیون آسان‌تر. آمبولیزاسیون به‌تنهایی به‌ندرت انسداد کامل دارد.')),

  F('swi', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Was zeigt SWI/T2* bei AVM?', 'What does SWI/T2* show in AVM?', 'SWI/T2* در AVM چه نشان می‌دهد؟'),
    L('Hämosiderin nach stattgehabter Blutung (Blooming).', 'Haemosiderin after prior haemorrhage (blooming).', 'هموسیدرین بعد از خونریزی قبلی (Blooming).'),
    L('SWI ist sensitiv für alte Blutungsresiduen → Hämosiderin als Blooming-Artefakt. Zeigt stattgehabte Mikroblutungen an. Hilft auch bei Frage nach Hybridläsionen (AVM + Kavernom).', 'SWI is sensitive to old haemorrhage residua → haemosiderin as a blooming artefact. Reveals prior microbleeds. Also helpful when hybrid lesions (AVM + cavernoma) are suspected.', 'SWI برای بقایای خونریزی قدیمی حساس است → هموسیدرین به‌عنوان آرتفکت Blooming. میکروخونریزی‌های قبلی را نشان می‌دهد. همچنین در مورد ضایعات هیبریدی (AVM + کاورنوم) کمک می‌کند.')),
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
  subtitle: L('Spetzler-Martin · Nidus · Flow voids · DSA · Therapiestrategie', 'Spetzler-Martin · nidus · flow voids · DSA · treatment strategy', 'Spetzler-Martin · نیدوس · Flow voids · DSA · استراتژی درمان'),
}
