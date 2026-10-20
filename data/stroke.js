const L = (de, en, fa) => ({ de, en, fa })

export const STROKE_LESSON = {
  pdfSourcePages: [3,9], // PDF p.3 classification audited; p.4–9 comparison remains open

  toc: L('Inhaltsverzeichnis', 'Contents', 'فهرست مطالب'),
  breadcrumbArea: L('Kopf', 'Head', 'سر'),
  breadcrumbCurrent: L(
    'Vaskuläre Erkrankungen · Ischämischer Schlaganfall',
    'Vascular diseases · Ischaemic stroke',
    'بیماری‌های عروقی · سکته مغزی ایسکمیک'
  ),
  title: L('Ischämischer Schlaganfall', 'Ischaemic stroke', 'سکته مغزی ایسکمیک'),
  subtitle: L(
    'Klinische Merkmale, CT- und MRT-Diagnostik, Verlauf und Therapie',
    'Clinical features, CT and MRI diagnosis, evolution and treatment',
    'ویژگی‌های بالینی، تشخیص CT و MRI، سیر و درمان'
  ),
  sourceLabel: 'Dr. Zia',
  actionMcq: 'MCQ',
  actionFlash: L('Flashcards', 'Flashcards', 'فلش‌کارت'),
  keyLabel: L('Merke', 'Key point', 'نکته مهم'),
  caveLabel: L('CAVE', 'Caution', 'احتیاط'),
  openCase: L('Fall in Radiopaedia öffnen', 'Open case in Radiopaedia', 'باز کردن کیس در Radiopaedia'),
  sections: [
    { id: 'klassifikation', label: L('Klassifikation & Begriffe', 'Classification & terms', 'طبقه‌بندی و اصطلاحات'), icon: '🗂️' },
    { id: 'grundlagen', label: L('Klinische Grundlagen', 'Clinical basics', 'مبانی بالینی'), icon: '🧠' },
    { id: 'akut-ct', label: L('Akut-CT, CTA & CTP', 'Acute CT, CTA & CTP', 'CT حاد، CTA و CTP'), icon: '🩻' },
    { id: 'ctp', label: L('CT-Perfusion interpretieren', 'Interpreting CT perfusion', 'تفسیر پرفیوژن CT'), icon: '🌡️' },
    { id: 'aspects', label: L('ASPECTS', 'ASPECTS', 'ASPECTS'), icon: '🔟' },
    { id: 'ct-verlauf', label: L('CT-Zeitverlauf', 'CT evolution', 'سیر زمانی CT'), icon: '⏱️' },
    { id: 'mrt', label: L('MRT-Protokoll', 'MRI protocol', 'پروتکل MRI'), icon: '🧲' },
    { id: 'mrt-verlauf', label: L('MRT-Zeitverlauf', 'MRI evolution', 'سیر زمانی MRI'), icon: '📈' },
    { id: 'verlauf', label: L('Fallstricke & Komplikationen', 'Pitfalls & complications', 'دام‌ها و عوارض'), icon: '⚠️' },
    { id: 'therapie', label: L('Therapie & Akutbefund', 'Treatment & acute report', 'درمان و گزارش حاد'), icon: '🚑' },
    { id: 'faelle', label: L('Fallbeispiele', 'Cases', 'نمونه کیس‌ها'), icon: '🔬' },
    { id: 'takehome', label: L('Take home message', 'Take-home messages', 'نکات کلیدی'), icon: '💡' },
  ],
  heroCards: [
    {
      value: L('2 Formen', '2 forms', '۲ شکل'),
      label: L('Grundmuster', 'Core patterns', 'الگوهای اصلی'),
      text: L('Ischämischer Infarkt oder primäre Blutung', 'Ischaemic infarction or primary haemorrhage', 'انفارکت ایسکمیک یا خونریزی اولیه'),
    },
    {
      value: '0–42',
      label: 'NIHSS',
      text: L('Klinische Beurteilung des Schweregrads', 'Clinical severity assessment', 'ارزیابی بالینی شدت'),
    },
    {
      value: '4,5 h',
      label: L('IV-Lyse', 'IV thrombolysis', 'ترومبولیز وریدی'),
      text: L('Standardzeitfenster mit Alteplase oder Tenecteplase', 'Standard window with alteplase or tenecteplase', 'پنجره استاندارد با آلتپلاز یا تنکتپلاز'),
    },
  ],
  basics: {
    title: L('Klinische Grundlagen', 'Clinical basics', 'مبانی بالینی'),
    introTitle: L('Einleitung und Klassifikation', 'Introduction and classification', 'مقدمه و طبقه‌بندی'),
    classificationTitle: L('Klassifikation & Begriffe', 'Classification & terms', 'طبقه‌بندی و اصطلاحات'),
    classificationCaveLabel: L('Wichtige Abgrenzung', 'Important distinction', 'تمایز مهم'),
    classificationGroups: [
      {
        title: L('Grundformen', 'Core forms', 'شکل‌های اصلی'),
        items: [
          {
            title: L('Ischämischer Schlaganfall', 'Ischaemic stroke', 'سکته ایسکمیک'),
            text: [
              L('Ein ischämischer Schlaganfall beruht auf einem Infarkt von Gewebe des Zentralnervensystems infolge einer Ischämie.', 'An ischaemic stroke is an infarction of central nervous system tissue caused by ischaemia.', 'سکته ایسکمیک بر اثر انفارکت بافت دستگاه عصبی مرکزی در پی ایسکمی رخ می‌دهد.'),
            ],
          },
          {
            title: L('Hämorrhagischer Schlaganfall', 'Haemorrhagic stroke', 'سکته هموراژیک'),
            text: [
              L('Primäre intrakranielle Blutungen umfassen die intrazerebrale und die Subarachnoidalblutung.', 'Primary intracranial haemorrhages include intracerebral and subarachnoid haemorrhage.', 'خونریزی‌های اولیه داخل جمجمه شامل خونریزی داخل پارانشیم مغز و خونریزی زیرعنکبوتیه هستند.'),
              L('Eine sekundäre hämorrhagische Transformation eines Infarkts ist davon zu unterscheiden.', 'Secondary haemorrhagic transformation of an infarct is a separate process.', 'تبدیل هموراژیک ثانویهٔ انفارکت باید از این موارد تفکیک شود.'),
            ],
          },
        ],
      },
      {
        title: L('Infarktmuster', 'Infarct patterns', 'الگوهای انفارکت'),
        items: [
          { title: L('Territorialinfarkt', 'Territorial infarct', 'انفارکت قلمرویی'), text: [L('Infarkt im Versorgungsgebiet einer größeren hirnversorgenden Arterie.', 'Infarction in the territory supplied by a larger cerebral artery.', 'انفارکت در قلمرو خون‌رسانی یک شریان بزرگ‌تر مغزی.') ] },
          { title: L('Kleiner subkortikaler (lakunärer) Infarkt', 'Small subcortical (lacunar) infarct', 'انفارکت کوچک زیرقشری (لاکونار)'), text: [L('Kleiner tiefer Infarkt in einem Perforatorgebiet; die Größenabgrenzung hängt von der verwendeten Definition ab.', 'A small deep infarct in a perforator territory; size cut-offs depend on the definition used.', 'انفارکت کوچک عمقی در قلمرو یک شریان پرفوراتور؛ حد اندازه به تعریف مورد استفاده بستگی دارد.') ] },
          { title: L('Endstrominfarkt', 'Distal end-artery infarct', 'انفارکت شریان انتهایی'), text: [L('Distaler Infarkt in einem Gebiet mit begrenzter Kollateralversorgung.', 'A distal infarct in a territory with limited collateral supply.', 'انفارکت دیستال در قلمرویی با خون‌رسانی جانبی محدود.') ] },
          { title: L('Grenzzoneninfarkt', 'Watershed infarct', 'انفارکت مرزی'), text: [L('Infarkt an der Grenze benachbarter arterieller Versorgungsgebiete.', 'Infarction at the border between adjacent arterial territories.', 'انفارکت در مرز قلمروهای شریانی مجاور.') ] },
        ],
      },
      {
        title: L('Entstehungsmechanismus', 'Mechanism', 'مکانیسم'),
        items: [
          {
            title: L('Embolisch', 'Embolic', 'آمبولیک'),
            text: [
              L('Ein Embolus verschließt ein Gefäß.', 'An embolus occludes a vessel.', 'آمبولی یک رگ را مسدود می‌کند.'),
              L('Mögliche Quellen sind das Herz oder eine proximale Arterie.', 'Possible sources include the heart or a proximal artery.', 'منشأهای احتمالی شامل قلب یا یک شریان پروگزیمال هستند.'),
            ],
          },
          { title: L('Thrombotisch', 'Thrombotic', 'ترومبوتیک'), text: [L('Ein Thrombus entsteht lokal im Gefäß.', 'A thrombus forms locally within a vessel.', 'ترومبوس به‌صورت موضعی درون رگ شکل می‌گیرد.') ] },
          { title: L('Venöser Infarkt', 'Venous infarction', 'انفارکت وریدی'), text: [L('Venöse Abflussstörung durch eine Venen- oder Sinusthrombose; das Infarktareal ist häufig hämorrhagisch.', 'Impaired venous drainage due to venous or sinus thrombosis; the infarct is often haemorrhagic.', 'اختلال تخلیه وریدی ناشی از ترومبوز ورید یا سینوس؛ ناحیه انفارکت اغلب مؤلفه هموراژیک دارد.') ] },
        ],
      },
      {
        title: L('TIA und Schlaganfall', 'TIA and stroke', 'TIA و سکته مغزی'),
        items: [
          { title: L('Transitorische ischämische Attacke (TIA)', 'Transient ischaemic attack (TIA)', 'حمله ایسکمیک گذرا (TIA)'), text: [L('Vorübergehende fokale neurologische Funktionsstörung durch Ischämie ohne Infarkt.', 'Transient focal neurological dysfunction caused by ischaemia without infarction.', 'اختلال گذرای عملکرد عصبی فوکال ناشی از ایسکمی، بدون انفارکت.'), L('Die Dauer der Symptome allein trennt TIA und Infarkt nicht.', 'Symptom duration alone does not distinguish TIA from infarction.', 'مدت علائم به‌تنهایی TIA را از انفارکت جدا نمی‌کند.') ] },
          { title: L('NIHSS', 'NIHSS', 'NIHSS'), text: [L('Standardisierte Skala zur Quantifizierung neurologischer Ausfälle (0–42 Punkte).', 'A standardised scale for quantifying neurological deficits (0–42 points).', 'مقیاسی استاندارد برای کمی‌سازی نقص عصبی (۰ تا ۴۲ امتیاز).'), L('Der Score allein legt nicht fest, ob ein Defizit für die einzelne Person behindernd ist; auch ein niedriger Wert kann mit einem behindernden Defizit einhergehen.', 'The score alone does not determine whether a deficit is disabling for an individual; a low score can still accompany a disabling deficit.', 'نمره به‌تنهایی تعیین نمی‌کند که نقص برای فرد ناتوان‌کننده است؛ حتی نمره پایین نیز می‌تواند با نقص ناتوان‌کننده همراه باشد.') ] },
        ],
      },
    ],
    classificationCave: L('Eine hämorrhagische Transformation ist eine sekundäre Einblutung in ein ischämisches Infarktareal. Sie ist von einer primären intrakraniellen Blutung zu unterscheiden.', 'Haemorrhagic transformation is secondary bleeding into an ischaemic infarct. It is distinct from primary intracranial haemorrhage.', 'تبدیل هموراژیک، خونریزی ثانویه در ناحیه انفارکت ایسکمیک است و باید از خونریزی اولیه داخل جمجمه تفکیک شود.'),
    territoriesTitle: L('Gefäßterritorien und klinische Syndrome', 'Vascular territories and clinical syndromes', 'قلمروهای عروقی و سندرم‌های بالینی'),
    headers: [
      L('Gefäß', 'Vessel', 'رگ'),
      L('Versorgungsgebiet', 'Territory', 'قلمرو خون‌رسانی'),
      L('Leitsymptomatik', 'Key symptoms', 'علائم کلیدی'),
    ],
    rows: [
      [
        L('A. cerebri anterior (ACA)', 'Anterior cerebral artery (ACA)', 'شریان مغزی قدامی (ACA)'),
        L('Medialer Frontal- und Parietallappen', 'Medial frontal and parietal lobes', 'لوب فرونتال و پاریتال مدیال'),
        L('Kontralaterale beinbetonte Hemiparese; Harninkontinenz', 'Contralateral leg-predominant hemiparesis; urinary incontinence', 'همی‌پارزی غالب پا در سمت مقابل؛ بی‌اختیاری ادرار'),
      ],
      [
        L('A. cerebri media (MCA)', 'Middle cerebral artery (MCA)', 'شریان مغزی میانی (MCA)'),
        L('Lateraler Frontal-, Parietal- und Temporallappen', 'Lateral frontal, parietal and temporal lobes', 'لوب‌های فرونتال، پاریتال و تمپورال لترال'),
        L('Arm- und gesichtsbetonte Hemiparese, homonyme Hemianopsie. Links: Aphasie. Rechts: Neglect.', 'Arm- and face-predominant hemiparesis, homonymous hemianopia. Left: aphasia. Right: neglect.', 'همی‌پارزی غالب دست و صورت، همی‌آنوپی هومونیم. چپ: آفازی. راست: نگلکت.'),
      ],
      [
        L('A. cerebri posterior (PCA)', 'Posterior cerebral artery (PCA)', 'شریان مغزی خلفی (PCA)'),
        L('Okzipitallappen, Thalamus', 'Occipital lobe and thalamus', 'لوب اکسیپیتال و تالاموس'),
        L('Kontralaterale homonyme Hemianopsie; Sensibilitätsstörung (Thalamus)', 'Contralateral homonymous hemianopia; sensory disturbance (thalamus)', 'همی‌آنوپی هومونیم مقابل؛ اختلال حسی (تالاموس)'),
      ],
      [
        L('A. basilaris / Vertebralis', 'Basilar / vertebral arteries', 'شریان بازیلار / ورتبرال'),
        L('Hirnstamm und Kleinhirn', 'Brainstem and cerebellum', 'ساقه مغز و مخچه'),
        L('Schwindel, Ataxie, Diplopie, Dysarthrie, Bewusstseinsstörungen', 'Vertigo, ataxia, diplopia, dysarthria, impaired consciousness', 'سرگیجه، آتاکسی، دوبینی، دیزآرتری، اختلال هوشیاری'),
      ],
      [
        L('PICA (Wallenberg-Syndrom)', 'PICA (Wallenberg syndrome)', 'PICA (سندرم والنبرگ)'),
        L('Kleinhirnunterfläche, Medulla oblongata', 'Inferior cerebellar surface and medulla oblongata', 'سطح تحتانی مخچه و بصل‌النخاع'),
        L('Ipsilateral Horner-Syndrom und Ataxie; kontralaterale dissoziierte Sensibilitätsstörung für Schmerz und Temperatur', 'Ipsilateral Horner syndrome and ataxia; contralateral dissociated sensory loss for pain and temperature', 'سندرم هورنر و آتاکسی همان‌طرف؛ اختلال حسی تفکیک‌شده سمت مقابل برای درد و حرارت'),
      ],
    ],
    footnote: L('Homonyme Hemianopsie = Ausfall der gleichseitigen Gesichtsfeldhälften beider Augen', 'Homonymous hemianopia = loss of the same-sided visual field halves in both eyes', 'همی‌آنوپی هومونیم = از بین رفتن نیمه‌های هم‌نام میدان بینایی در هر دو چشم'),
    items: [
      {
        title: L('Sprachdominanz', 'Language dominance', 'غلبه زبانی'),
        text: L('Bei etwa 95% der Rechtshänder liegt das Sprachzentrum links. Auch bei den meisten Linkshändern ist die linke Hemisphäre sprachdominant; häufiger als bei Rechtshändern kann Sprache aber rechts oder beidseitig organisiert sein.', 'In about 95% of right-handed people, language is left-dominant. Most left-handed people are also left-dominant, although right-sided or bilateral language organisation is more common than in right-handed people.', 'در حدود ۹۵٪ راست‌دست‌ها مرکز زبان در نیمکره چپ است. در بیشتر چپ‌دست‌ها نیز نیمکره چپ غالب زبانی است، اما سازمان‌دهی راست‌طرفه یا دوطرفه زبان نسبت به راست‌دست‌ها شایع‌تر است.'),
      },
      {
        title: L('NIHSS', 'NIHSS', 'NIHSS'),
        text: L('Skala von 0 bis 42; zur individuellen Bewertung der Behinderung siehe „TIA und Schlaganfall“.', 'A 0–42 scale; see “TIA and stroke” for individual assessment of disability.', 'مقیاس ۰ تا ۴۲؛ برای ارزیابی فردی ناتوان‌کننده‌بودن نقص، بخش «TIA و سکته مغزی» را ببینید.'),
      },
      {
        title: L('Mimics bedenken', 'Consider mimics', 'در نظر گرفتن تقلیدکننده‌ها'),
        text: L('Hypoglykämie, postiktale Parese, Migräne, Tumor, Enzephalitis und funktionelle Symptome können einen Schlaganfall imitieren.', 'Hypoglycaemia, postictal paresis, migraine, tumour, encephalitis and functional symptoms may mimic stroke.', 'هیپوگلیسمی، پارزی پس از تشنج، میگرن، تومور، انسفالیت و علائم عملکردی ممکن است سکته را تقلید کنند.'),
      },
    ],
    key: L('Dominante Hemisphäre: Aphasie. Nicht dominante Hemisphäre: Neglect. Meist gilt: links Aphasie, rechts Neglect.', 'Dominant hemisphere: aphasia. Non-dominant hemisphere: neglect. In most patients: left means aphasia, right means neglect.', 'نیمکره غالب: آفازی. نیمکره غیرغالب: نگلکت. در بیشتر بیماران: چپ یعنی آفازی، راست یعنی نگلکت.'),
  },
  acuteCt: {
    title: L('Multimodale CT im Akutsetting', 'Multimodal CT in the acute setting', 'CT چندوجهی در فاز حاد'),
    lead: L('Die Standardstrategie kombiniert native CCT, CT-Angiografie und bei ausgewählten Patienten CT-Perfusion.', 'The standard strategy combines non-contrast CT, CT angiography and, in selected patients, CT perfusion.', 'راهبرد استاندارد شامل CT بدون کنتراست، CTA و در بیماران منتخب CTP است.'),
    headers: [
      L('Baustein', 'Component', 'جزء'),
      L('Hauptfrage', 'Main question', 'سؤال اصلی'),
      L('Wichtige Befunde', 'Key findings', 'یافته‌های مهم'),
    ],
    rows: [
      ['NCCT', L('Ischämiefrühzeichen?', 'Early signs of ischaemia?', 'علائم اولیه ایسکمی؟'), L('Hyperdenses Gefäß, Verlust der Grau-Weiß-Grenze und fokale Schwellung mit Sulcusverstrich', 'Hyperdense vessel, loss of grey-white differentiation and focal swelling with sulcal effacement', 'رگ هایپردنس، از بین رفتن تمایز خاکستری-سفید و تورم فوکال با محوشدن سولکوس')],
      ['CTA', L('Liegt ein Gefäßverschluss vor?', 'Is there a vessel occlusion?', 'آیا انسداد عروقی وجود دارد؟'), L('Nachweis von Gefäßverschlüssen', 'Detection of vessel occlusion', 'تشخیص انسداد عروقی')],
      ['CTP', L('Infarktkern oder Penumbra?', 'Infarct core or penumbra?', 'هسته انفارکت یا پنومبرا؟'), L('Unterscheidung von Infarktkern und rettbarem Gewebe, besonders bei unklarem Zeitfenster', 'Distinguishes infarct core from salvageable tissue, especially when the time window is unclear', 'تفکیک هسته انفارکت از بافت قابل نجات، به‌ویژه در پنجره زمانی نامشخص')],
    ],
    earlySigns: [
      { title: L('Dense artery sign', 'Dense artery sign', 'علامت رگ هایپردنس'), text: L('Hyperdenses thrombosiertes Gefäß, klassisch als Dense-MCA-Zeichen.', 'Hyperdense thrombosed vessel, classically the dense MCA sign.', 'رگ ترومبوزه هایپردنس، به‌طور کلاسیک علامت MCA هایپردنس.') },
      { title: L('Insular ribbon', 'Insular ribbon', 'نوار اینسولا'), text: L('Verlust der Grau-Weiß-Differenzierung der Insula als frühes MCA-Zeichen.', 'Loss of insular grey-white differentiation as an early MCA sign.', 'از بین رفتن تمایز خاکستری-سفید اینسولا به‌عنوان علامت زودرس MCA.') },
      { title: L('Nucleus lentiformis', 'Lentiform nucleus', 'هسته لنتی‌فرم'), text: L('Verwaschene Kontur oder Hypodensität bei tiefem MCA-Befall.', 'Obscuration or low attenuation with deep MCA involvement.', 'محو شدن یا هیپودنس شدن در درگیری عمقی MCA.') },
      { title: L('Sulcal effacement', 'Sulcal effacement', 'محو شدن سولکوس'), text: L('Fokale Gyrusschwellung durch frühes zytotoxisches Ödem.', 'Focal gyral swelling caused by early cytotoxic oedema.', 'تورم فوکال ژیروس در اثر ادم سیتوتوکسیک اولیه.') },
    ],
    cave: L('In der ersten Stunde ist die native CT in der Regel unauffällig; die DWI kann bereits positiv sein.', 'During the first hour, non-contrast CT is usually normal while DWI may already be positive.', 'در ساعت اول CT بدون کنتراست معمولاً طبیعی است، در حالی که DWI ممکن است مثبت باشد.'),
  },
  ctpInterpretation: {
    title: L('CT-Perfusion interpretieren', 'Interpreting CT perfusion', 'تفسیر پرفیوژن CT'),
    lead: L('Zuerst die Parameterkarten prüfen, dann Infarktkern und hypoperfundiertes Gewebe vergleichen.', 'First review the parameter maps, then compare infarct core with hypoperfused tissue.', 'ابتدا نقشه‌های پارامتری را بررسی کنید، سپس هسته انفارکت را با بافت کم‌پرفیوژن مقایسه کنید.'),
    items: [
      { title: 'CBF', text: L('Cerebral Blood Flow: Blutfluss pro Gewebeeinheit. Stark vermindert im Infarktkern; relatives CBF < 30 % wird in etablierter automatisierter Auswertung häufig als Kernschwelle verwendet.', 'Cerebral blood flow per tissue unit. Markedly reduced in the infarct core; relative CBF <30% is commonly used as a core threshold in established automated processing.', 'جریان خون مغزی در هر واحد بافت. در هسته انفارکت به‌شدت کاهش می‌یابد؛ CBF نسبی کمتر از ۳۰٪ اغلب به‌عنوان آستانه هسته استفاده می‌شود.') },
      { title: 'CBV', text: L('Cerebral Blood Volume: Blutvolumen im Gewebe. Im Kern meist vermindert, in der Penumbra anfangs relativ erhalten; nicht isoliert beurteilen.', 'Cerebral blood volume in tissue. Usually reduced in the core and initially relatively preserved in the penumbra; do not interpret it in isolation.', 'حجم خون مغزی در بافت. در هسته معمولاً کاهش می‌یابد و در پنومبرا در ابتدا نسبتاً حفظ می‌شود؛ به‌تنهایی تفسیر نشود.') },
      { title: 'MTT / Tmax', text: L('Zeitparameter der Boluspassage. Eine Verlängerung zeigt verzögerte Perfusion; Tmax > 6 s wird häufig zur Abgrenzung relevant hypoperfundierten Gewebes verwendet.', 'Time parameters of bolus passage. Prolongation indicates delayed perfusion; Tmax >6 s is commonly used to define relevant hypoperfused tissue.', 'پارامترهای زمانی عبور بولوس. طولانی‌شدن نشان‌دهنده پرفیوژن تأخیری است؛ Tmax بیش از ۶ ثانیه اغلب برای تعیین بافت کم‌پرفیوژن مهم استفاده می‌شود.') },
      { title: L('Mismatch / Penumbra', 'Mismatch / penumbra', 'عدم تطابق / پنومبرا'), text: L('Ist das Volumen mit Tmax > 6 s größer als der rCBF-<30-%-Kern, entspricht die Differenz dem potenziell rettbaren Gewebe.', 'When the Tmax >6 s volume is larger than the rCBF <30% core, the difference represents potentially salvageable tissue.', 'اگر حجم Tmax بیش از ۶ ثانیه بزرگ‌تر از هسته rCBF کمتر از ۳۰٪ باشد، اختلاف نمایانگر بافت بالقوه قابل نجات است.') },
    ],
    steps: [
      { title: L('1. Technische Qualität', '1. Technical quality', '۱. کیفیت فنی'), text: L('Bewegung, unvollständige Abdeckung und fehlerhaften Kontrastmittelbolus ausschließen.', 'Exclude motion, incomplete coverage and an inadequate contrast bolus.', 'حرکت، پوشش ناقص و بولوس نامناسب ماده حاجب را رد کنید.') },
      { title: L('2. Seitenvergleich', '2. Side comparison', '۲. مقایسه دو طرف'), text: L('CBF/CBV und Zeitkarten mit der Gegenseite vergleichen und das Muster einem Gefäßterritorium zuordnen.', 'Compare CBF/CBV and time maps with the opposite side and assign the pattern to a vascular territory.', 'نقشه‌های CBF/CBV و زمان را با سمت مقابل مقایسه و الگو را به یک قلمرو عروقی نسبت دهید.') },
      { title: L('3. Kern und Mismatch', '3. Core and mismatch', '۳. هسته و عدم تطابق'), text: L('Kernvolumen bestimmen und prüfen, ob darüber hinaus relevantes verzögert perfundiertes Gewebe besteht.', 'Determine core volume and assess whether additional relevant delayed-perfusion tissue is present.', 'حجم هسته را تعیین و وجود بافت اضافی با پرفیوژن تأخیری مهم را بررسی کنید.') },
      { title: L('4. Plausibilitätskontrolle', '4. Plausibility check', '۴. کنترل سازگاری'), text: L('Ergebnis immer mit Klinik, nativer CT und CTA abgleichen.', 'Always correlate the result with clinical findings, non-contrast CT and CTA.', 'نتیجه را همیشه با یافته‌های بالینی، CT بدون کنتراست و CTA تطبیق دهید.') },
    ],
    cave: L('Schwellenwerte sind softwareabhängig. Sehr frühe Untersuchung, Rekanalisation, Bewegung, schlechter Bolus und chronische Stenosen können Kern oder Penumbra falsch abschätzen.', 'Thresholds are software-dependent. Very early imaging, recanalisation, motion, a poor bolus and chronic stenoses may misestimate core or penumbra.', 'آستانه‌ها به نرم‌افزار وابسته‌اند. تصویربرداری بسیار زودرس، بازشدن مجدد عروق، حرکت، بولوس ضعیف و تنگی‌های مزمن می‌توانند هسته یا پنومبرا را نادرست برآورد کنند.'),
  },
  aspects: {
    title: L('ASPECTS richtig anwenden', 'Using ASPECTS correctly', 'کاربرد صحیح ASPECTS'),
    lead: L('ASPECTS bewertet zehn definierte Regionen des MCA-Territoriums. Ausgangswert 10; für jede Region mit frühen ischämischen Veränderungen wird ein Punkt abgezogen.', 'ASPECTS evaluates ten defined MCA-territory regions. Start at 10 and subtract one point for each region with early ischaemic change.', 'ASPECTS ده ناحیه مشخص در قلمرو MCA را ارزیابی می‌کند؛ از ۱۰ شروع و برای هر ناحیه ایسکمیک یک امتیاز کم می‌شود.'),
    items: [
      { title: 'ASPECTS 10', text: L('Unauffälliger Befund.', 'Normal examination.', 'یافته طبیعی.') },
      { title: 'ASPECTS 0', text: L('Kompletter Mediainfarkt.', 'Complete MCA infarction.', 'انفارکت کامل MCA.') },
    ],
    regions: [
      { level: L('Basalganglien-Ebene', 'Basal ganglia level', 'سطح گانگلیون‌های قاعده‌ای'), items: ['C', 'IC', 'L', 'I', 'M1', 'M2', 'M3'] },
      { level: L('Supraganglionäre Ebene', 'Supraganglionic level', 'سطح فوق‌گانگلیونی'), items: ['M4', 'M5', 'M6'] },
    ],
    regionNames: {
      C: L('Nucleus caudatus', 'Caudate nucleus', 'هسته دُم‌دار'),
      IC: L('Capsula interna', 'Internal capsule', 'کپسول داخلی'),
      L: L('Nucleus lentiformis', 'Lentiform nucleus', 'هسته عدسی'),
      I: L('Insula', 'Insula', 'اینسولا'),
      M1: L('Vorderes Mediastromgebiet (fronto-operculär)', 'Anterior MCA territory (fronto-opercular)', 'قلمرو قدامی MCA (فرونتو-اوپرکولار)'),
      M2: L('Laterales Mediastromgebiet / anteriorer Temporallappen', 'Lateral MCA territory / anterior temporal lobe', 'قلمرو خارجی MCA / لوب تمپورال قدامی'),
      M3: L('Hinteres Mediastromgebiet / posteriorer Temporallappen', 'Posterior MCA territory / posterior temporal lobe', 'قلمرو خلفی MCA / لوب تمپورال خلفی'),
      M4: L('Vorderes Mediastromgebiet oberhalb M1', 'Anterior MCA territory above M1', 'قلمرو قدامی MCA در بالای M1'),
      M5: L('Laterales Mediastromgebiet oberhalb M2', 'Lateral MCA territory above M2', 'قلمرو خارجی MCA در بالای M2'),
      M6: L('Hinteres Mediastromgebiet oberhalb M3', 'Posterior MCA territory above M3', 'قلمرو خلفی MCA در بالای M3'),
    },
    scoring: L('Ausgangspunkt 10 Punkte; pro betroffener Region einen Punkt abziehen. Die Punkte beschreiben frühe Parenchymveränderungen und sind keine eigenständige Therapieentscheidung.', 'Start at 10 points and subtract one for each affected region. The score describes early parenchymal change and is not a treatment decision by itself.', 'امتیاز از ۱۰ شروع می‌شود و برای هر ناحیه درگیر یک امتیاز کم می‌شود. این امتیاز تغییرات زودرس پارانشیم را توصیف می‌کند و به‌تنهایی تصمیم درمانی نیست.'),
    diagramNote: L('Schematische Lageübersicht; keine exakten anatomischen Grenzen und nicht zur diagnostischen Anwendung.', 'Schematic location map; it does not show exact anatomical boundaries and is not for diagnostic use.', 'نمای شماتیک از موقعیت نواحی؛ مرزهای دقیق آناتومیک را نشان نمی‌دهد و برای تشخیص کاربرد ندارد.'),
    imageAlt: L('Zwei axiale ASPECTS-Schemata mit farbig markierten MCA-Regionen auf Basalganglien- und supraganglionärer Ebene.', 'Two axial ASPECTS diagrams with colour-coded MCA regions at basal ganglia and supraganglionic levels.', 'دو نمای محوری ASPECTS با نواحی رنگی MCA در سطح گانگلیون‌های قاعده‌ای و فوق‌گانگلیونی.'),
    sourceCaption: L('Bildbeschnitt aus Gehirn.pdf, S. 4: nur die beiden axialen Regionenkarten. Die Abbildungsbeschriftungen sind im deutschen Original; die Regionslegende folgt unten in der gewählten Sprache.', 'Crop from Gehirn.pdf p.4 showing only the two axial region maps. Figure labels remain in the German source; the regional key below follows the selected language.', 'برش از صفحهٔ ۴ Gehirn.pdf شامل دو نقشهٔ محوری نواحی است. برچسب‌های داخل تصویر به زبان اصلی آلمانی‌اند؛ راهنمای نواحی در ادامه به زبان انتخاب‌شده آمده است.'),
    key: L('ASPECTS bewertet Parenchymveränderungen, nicht den Gefäßverschluss selbst.', 'ASPECTS scores parenchymal change, not the vessel occlusion itself.', 'ASPECTS تغییرات پارانشیم را امتیازدهی می‌کند، نه خود انسداد عروقی را.'),
  },
  ctTimeline: {
    title: L('CT-Veränderungen im Zeitverlauf', 'CT changes over time', 'تغییرات CT در طول زمان'),
    lead: L('Parenchymdichte, Ödem, Kontrastmittelaufnahme und Raumforderung verändern sich charakteristisch.', 'Parenchymal density, oedema, enhancement and mass effect evolve in a characteristic pattern.', 'دانسیته پارانشیم، ادم، جذب کنتراست و اثر فضاگیر به‌صورت مشخص تغییر می‌کنند.'),
    imageAlt: L('CT-Veränderungen beim ischämischen Schlaganfall im Zeitverlauf', 'Temporal CT changes in ischaemic stroke', 'تغییرات زمانی CT در سکته ایسکمیک'),
    items: [
      { title: '< 6 h', text: L('CT kann unauffällig sein; Gefäß- und Parenchymfrühzeichen aktiv suchen.', 'CT may be normal; actively search for vascular and parenchymal early signs.', 'CT ممکن است طبیعی باشد؛ علائم زودرس عروقی و پارانشیمی فعالانه جستجو شوند.') },
      { title: '12–24 h', text: L('Territoriale Hypodensität und Schwellung werden deutlicher.', 'Territorial low attenuation and swelling become more conspicuous.', 'هیپودنسیتی قلمرویی و تورم واضح‌تر می‌شوند.') },
      { title: 'Tag 1–5', text: L('Ödem und Raumforderung maximal; Herniationsgefahr und hämorrhagische Transformation.', 'Oedema and mass effect peak; risk of herniation and haemorrhagic transformation.', 'ادم و اثر فضاگیر به اوج می‌رسند؛ خطر هرنیاسیون و تبدیل هموراژیک.') },
      { title: 'Woche 2–3', text: L('Fogging-Effekt kann den Infarkt vorübergehend isodens erscheinen lassen.', 'Fogging may make the infarct temporarily isodense.', "اثر پدیده محوشدگی (Fogging) ممکن است انفارکت را موقتاً ایزودنس نشان دهد.") },
      { title: 'Ab Woche 6', text: L('Enzephalomalazie mit liquordichtem Defekt und Ex-vacuo-Erweiterung.', 'Encephalomalacia with CSF-density tissue loss and ex-vacuo dilatation.', 'انسفالومالاسی با نقص هم‌دانسیته CSF و اتساع ex-vacuo.') },
    ],
    headers: [L('Zeit nach Symptombeginn', 'Time from symptom onset', 'زمان پس از شروع علائم'), L('Typische CT-Entwicklung', 'Typical CT evolution', 'سیر معمول CT')],
    rows: [
      [L('< 1 h', '< 1 h', 'کمتر از ۱ ساعت'), L('CT kann noch unauffällig sein.', 'CT may still be normal.', 'CT ممکن است هنوز طبیعی باشد.')],
      ['2–6 h', L('Frühzeichen können auftreten: hyperdenses Gefäß, verstrichene Sulci und Verlust der Mark-Rinden-Grenze.', 'Early signs may appear: hyperdense vessel, sulcal effacement and loss of grey–white differentiation.', 'ممکن است علائم زودرس مانند عروق هایپردنس، محوشدن سولکوس‌ها و کاهش تمایز ماده خاکستری و سفید دیده شوند.')],
      ['12–24 h', L('Territoriale Hypodensität und Schwellung werden deutlicher.', 'Territorial hypoattenuation and swelling become more conspicuous.', 'هیپودنسیتی قلمرویی و تورم واضح‌تر می‌شوند.')],
      [L('1–3 Tage', '1–3 days', '۱ تا ۳ روز'), L('Hypodensität und Ödem nehmen zu; raumfordernde Wirkung und hämorrhagische Transformation sind möglich.', 'Hypoattenuation and oedema increase; mass effect and haemorrhagic transformation may occur.', 'هیپودنسیتی و ادم افزایش می‌یابند؛ اثر فضاگیر و تبدیل هموراژیک ممکن است رخ دهد.')],
      [L('4–7 Tage', '4–7 days', '۴ تا ۷ روز'), L('Ödem kann maximal sein; gyriforme Kontrastmittelaufnahme kann auftreten.', 'Oedema may peak; gyriform enhancement may occur.', 'ادم ممکن است به اوج برسد؛ تقویت قشری/ژیریفورم ممکن است دیده شود.')],
      ['2–3 Wochen', L('Fogging kann die Infarkthypodensität vorübergehend abschwächen.', 'Fogging may temporarily reduce infarct hypoattenuation.', 'پدیده Fogging ممکن است هیپودنسیتی انفارکت را موقتاً کاهش دهد.')],
      [L('4–6 Wochen', '4–6 weeks', '۴ تا ۶ هفته'), L('Zunehmender Gewebeverlust und beginnende Kolliquation.', 'Increasing tissue loss and developing liquefaction.', 'از دست‌رفتن بافت افزایش می‌یابد و نکروز مایع‌شونده آغاز می‌شود.')],
      [L('Ab 6 Wochen bis Monate/Jahre', 'From 6 weeks to months/years', 'از ۶ هفته تا ماه‌ها/سال‌ها'), L('Enzephalomalazie, Gliose und Ex-vacuo-Erweiterung können zurückbleiben.', 'Encephalomalacia, gliosis and ex-vacuo dilatation may remain.', 'انسفالومالاسی، گلیوز و اتساع ex-vacuo ممکن است باقی بمانند.')],
    ],
  },
  mri: {
    title: L('MRT-Schlaganfallprotokoll', 'MRI stroke protocol', 'پروتکل MRI سکته'),
    lead: L('Alternative bei unklarem Zeitfenster oder zur Detektion von Kleinstinfarkten; in manchen Kliniken primär statt multimodaler CT.', 'Alternative when the time window is unclear or for detecting very small infarcts; used primarily instead of multimodal CT in some centres.', 'جایگزین در پنجره زمانی نامشخص یا برای تشخیص انفارکت‌های بسیار کوچک؛ در برخی مراکز به‌جای CT چندوجهی استفاده می‌شود.'),
    headers: [L('Sequenz', 'Sequence', 'سکانس'), L('Akutbefund', 'Acute finding', 'یافته حاد'), L('Nutzen', 'Purpose', 'کاربرد')],
    rows: [
      ['DWI + ADC', L('DWI hyperintens, ADC vermindert', 'DWI high, ADC low', 'DWI بالا و ADC پایین'), L('Frühester Nachweis des zytotoxischen Ödems; echte Restriktion bestätigen', 'Earliest detection of cytotoxic oedema; confirms true restriction', 'زودترین تشخیص ادم سیتوتوکسیک و تأیید محدودیت واقعی')],
      ['FLAIR/T2', L('Früh oft unauffällig, später hyperintens und geschwollen', 'Often normal early, then high signal and swelling', 'ابتدا اغلب طبیعی و سپس هایپراینتنس و متورم'), L('Infarktalter, Ödem und DWI-FLAIR-Mismatch', 'Infarct age, oedema and DWI-FLAIR mismatch', 'سن انفارکت، ادم و عدم تطابق DWI-FLAIR')],
      ['T2*/SWI', L('Signalabsenkungen bei Blutprodukten oder Eisenablagerungen', 'Signal loss from blood products or iron deposition', 'افت سیگنال ناشی از محصولات خون یا رسوب آهن'), L('Nachweis von Blutprodukten und Suszeptibilitätszeichen; Rolle im Akutprotokoll abhängig von Klinik und lokalem Vorgehen', 'Detects blood products and susceptibility signs; its role in acute imaging depends on the clinical setting and local protocol', 'تشخیص محصولات خون و علائم حساسیت مغناطیسی؛ نقش آن در پروتکل حاد به شرایط بالینی و روش مرکز بستگی دارد')],
      ['MRA', L('Fehlender Flow im verschlossenen Gefäß', 'Absent flow in the occluded vessel', 'عدم جریان در رگ مسدود'), L('Nicht-invasive Gefäßdarstellung, häufig TOF', 'Non-invasive vascular imaging, often TOF', 'تصویربرداری غیرتهاجمی عروق، اغلب TOF')],
      ['PWI', L('Optionale Perfusions-MRT', 'Optional perfusion MRI', 'MRI پرفیوژن اختیاری'), L('Ergänzende Perfusionsbeurteilung', 'Additional perfusion assessment', 'ارزیابی تکمیلی پرفیوژن')],
    ],
    mismatchTitle: L('DWI-FLAIR-Mismatch', 'DWI-FLAIR mismatch', 'عدم تطابق DWI-FLAIR'),
    mismatchText: L('Eine DWI-Läsion ohne deutliche entsprechende FLAIR-Hyperintensität kann bei ausgewählten Patienten mit unbekanntem Symptombeginn als Bildgebungskriterium für eine erweiterte Therapiewahl dienen. Sie bestimmt das Läsionsalter nicht exakt und begründet allein keine Therapie.', 'A DWI lesion without marked corresponding FLAIR hyperintensity can support imaging-based treatment selection in selected patients with unknown symptom onset. It does not establish the exact lesion age or determine treatment eligibility by itself.', 'ضایعه در DWI بدون هایپراینتنس واضح متناظر در FLAIR می‌تواند در بیماران منتخب با زمان شروع نامشخص علائم، به‌عنوان معیار تصویربرداری برای انتخاب درمان در پنجره گسترده‌تر به‌کار رود. این الگو سن ضایعه را دقیق تعیین نمی‌کند و به‌تنهایی واجد شرایط بودن برای درمان را ثابت نمی‌کند.'),
    cave: L('DWI-Hyperintensität allein beweist keine fortbestehende Restriktion: ADC prüfen, da ab etwa Tag 10 T2-shine-through auftreten kann.', 'DWI hyperintensity alone does not prove ongoing restriction: check ADC because T2 shine-through may occur from about day 10.', "هایپراینتنس DWI به‌تنهایی محدودیت فعال را ثابت نمی‌کند؛ ADC بررسی شود زیرا از حدود روز ۱۰ اثر عبور سیگنال T2 (shine-through) ممکن است رخ دهد."),
  },
  mriTimeline: {
    title: L('MRT-Signalverlauf', 'MRI signal evolution', 'سیر سیگنال MRI'),
    lead: L('DWI reagiert zuerst; ADC pseudonormalisiert später, während T2/FLAIR und Enhancement länger persistieren.', 'DWI changes first; ADC later pseudonormalises while T2/FLAIR abnormality and enhancement persist longer.', 'DWI زودتر تغییر می‌کند؛ ADC بعداً شبه‌طبیعی می‌شود و تغییرات T2/FLAIR و تقویت پس از تزریق طولانی‌تر باقی می‌مانند.'),
    imageAlt: L('MRT-Signalveränderungen beim ischämischen Schlaganfall im Zeitverlauf', 'Temporal MRI signal changes in ischaemic stroke', 'تغییرات زمانی سیگنال MRI در سکته ایسکمیک'),
    headers: [L('Zeit nach Symptombeginn', 'Time from symptom onset', 'زمان پس از شروع علائم'), L('Typische MRT-Entwicklung', 'Typical MRI evolution', 'سیر معمول MRI')],
    rows: [
      [L('< 1 h', '< 1 h', 'کمتر از ۱ ساعت'), L('DWI kann früh hyperintens sein, ADC ist vermindert; T2/FLAIR kann noch unauffällig sein.', 'DWI may become hyperintense early with reduced ADC; T2/FLAIR may still be normal.', 'DWI ممکن است زودرس هایپراینتنس و ADC کاهش‌یافته باشد؛ T2/FLAIR ممکن است هنوز طبیعی باشد.')],
      [L('Bis 12 h', 'Up to 12 h', 'تا ۱۲ ساعت'), L('FLAIR wird vor T2 hyperintens; Gyri schwellen an. Eine meningeale Kontrastmittelaufnahme kann den Infarkt umgeben.', 'FLAIR becomes hyperintense before T2; gyri swell. Meningeal enhancement may surround the infarct.', 'FLAIR زودتر از T2 هایپراینتنس می‌شود و ژیروس‌ها متورم می‌شوند. ممکن است تقویت مننژیال اطراف انفارکت دیده شود.')],
      ['12–24 h', L('FLAIR-Hyperintensität und raumfordernde Wirkung nehmen zu; ADC bleibt niedrig.', 'FLAIR hyperintensity and mass effect increase; ADC remains low.', 'هایپراینتنسیتی FLAIR و اثر فضاگیر افزایش می‌یابند؛ ADC پایین می‌ماند.')],
      [L('1–3 Tage', '1–3 days', '۱ تا ۳ روز'), L('Ödem und Raumforderung erreichen oft ihr Maximum; ADC ist stark vermindert. Meningeale Aufnahme kann in parenchymale übergehen.', 'Oedema and mass effect often peak; ADC is markedly reduced. Meningeal enhancement may transition to parenchymal enhancement.', 'ادم و اثر فضاگیر اغلب به اوج می‌رسند و ADC به‌شدت کاهش می‌یابد. تقویت مننژیال ممکن است به تقویت پارانشیمی تبدیل شود.')],
      [L('4–7 Tage', '4–7 days', '۴ تا ۷ روز'), L('Das Ödem beginnt zu regredieren; kräftige gyriforme parenchymale Aufnahme und hämorrhagische Transformation können auftreten.', 'Oedema begins to regress; strong gyriform parenchymal enhancement and haemorrhagic transformation may occur.', 'ادم شروع به پسرفت می‌کند؛ تقویت پارانشیمی ژیریفورم قوی و تبدیل هموراژیک ممکن است دیده شوند.')],
      [L('2. Woche', 'Week 2', 'هفته دوم'), L('Fogging kann T2-Veränderungen abschwächen. Kontrastmittelaufnahme kann durch Luxusperfusion vorübergehend ausgeprägt sein.', 'Fogging may reduce T2 conspicuity. Enhancement may be temporarily prominent with luxury perfusion.', 'پدیده Fogging ممکن است تغییرات T2 را کم‌وضوح کند. تقویت ناشی از پرفیوژن لوکس ممکن است موقتاً برجسته باشد.')],
      [L('Ab Tag 10', 'From day 10', 'از روز ۱۰'), L('DWI kann durch T2-shine-through hell bleiben, obwohl ADC ansteigt und keine echte Restriktion mehr besteht.', 'DWI may remain bright from T2 shine-through as ADC rises and true restriction resolves.', 'DWI ممکن است به‌علت اثر عبور سیگنال T2 روشن بماند، در حالی که ADC افزایش یافته و محدودیت واقعی برطرف شده است.')],
      [L('Bis 8–10 Wochen', 'Up to 8–10 weeks', 'تا ۸ تا ۱۰ هفته'), L('Die Kontrastmittelaufnahme klingt allmählich ab.', 'Enhancement gradually fades.', 'تقویت پس از تزریق به‌تدریج کاهش می‌یابد.')],
      [L('Monate bis Jahre', 'Months to years', 'ماه‌ها تا سال‌ها'), L('Enzephalomalazie und Gliose; keine echte Diffusionsrestriktion mehr.', 'Encephalomalacia and gliosis; no true diffusion restriction.', 'انسفالومالاسی و گلیوز؛ دیگر محدودیت واقعی انتشار وجود ندارد.')],
    ],
    enhancementTitle: L('Blut-Hirn-Schranke und Kontrastmittel', 'Blood–brain barrier and enhancement', 'سد خونی‌مغزی و تقویت پس از تزریق'),
    enhancementText: L('Eine Schrankenstörung und Kontrastmittelaufnahme treten typischerweise erst nach einigen Tagen auf, erreichen nach etwa 3–4 Wochen ihr Maximum und bilden sich anschließend zurück. Eine Aufnahme kann bis 8–10 Wochen persistieren. Vorübergehende Hyperperfusion/Luxusperfusion kann in der subakuten Phase starkes Enhancement verursachen und einen Tumor imitieren.', 'Blood–brain barrier disruption and enhancement typically appear after several days, peak at about 3–4 weeks and then regress. Enhancement may persist for 8–10 weeks. Transient hyperperfusion/luxury perfusion in the subacute phase can cause marked enhancement and mimic tumour.', 'اختلال سد خونی‌مغزی و تقویت معمولاً پس از چند روز ظاهر می‌شوند، حدود ۳ تا ۴ هفته به اوج می‌رسند و سپس پسرفت می‌کنند. تقویت ممکن است تا ۸ تا ۱۰ هفته باقی بماند. هایپرپرفیوژن گذرا/پرفیوژن لوکس در فاز تحت‌حاد می‌تواند تقویت واضح ایجاد کند و تومور را تقلید کند.'),
  },
  pitfalls: {
    title: L('Fallstricke und Verlaufskomplikationen', 'Pitfalls and complications', 'دام‌ها و عوارض سیر بیماری'),
    lead: L('Subakute Veränderungen können Blutung oder Tumor imitieren und verlangen die gemeinsame Bewertung aller Sequenzen und des zeitlichen Verlaufs.', 'Subacute changes may mimic haemorrhage or tumour and require combined assessment of all sequences and the timeline.', 'تغییرات تحت‌حاد ممکن است خونریزی یا تومور را تقلید کنند و نیازمند ارزیابی همزمان سکانس‌ها و سیر زمانی هستند.'),
    items: [
      { title: L('Hämorrhagische Transformation', 'Haemorrhagic transformation', 'تبدیل هموراژیک'), text: L('Kann sekundär als Einblutung eines Infarkts auftreten; in der nativen CT zeigt sie sich als hyperdense Fläche.', 'May occur secondarily as haemorrhage into an infarct and appears hyperdense on non-contrast CT.', 'ممکن است به‌صورت ثانویه به شکل خونریزی در انفارکت رخ دهد و در CT بدون کنتراست هایپردنس دیده شود.') },
      { title: L('Fogging-Effekt', 'Fogging effect', "اثر پدیده محوشدگی (Fogging)"), text: L('Vorübergehende Normalisierung der CT-Dichte beziehungsweise Abschwächung des T2-Signals in der subakuten Phase.', 'Temporary normalisation of CT density or attenuation of T2 abnormality in the subacute phase.', 'طبیعی‌شدن موقت دانسیته CT یا کاهش تغییرات T2 در فاز تحت‌حاد.') },
      { title: L('Luxusperfusion', 'Luxury perfusion', 'پرفیوژن لوکس'), text: L('Hyperämie nach Reperfusion bei gestörter Autoregulation; Enhancement und erhöhtes CBF sind nicht automatisch Tumor.', 'Post-reperfusion hyperaemia from impaired autoregulation; enhancement and raised CBF do not automatically indicate tumour.', 'هایپرمی پس از بازپرفیوژن به‌دلیل اختلال اتورگولاسیون؛ تقویت پس از تزریق و CBF بالا الزاماً تومور نیستند.') },
    ],
    cave: L('Kontrastmittelaufnahme und Fogging können einen Tumor imitieren. Verlauf, Klinik und DWI helfen bei der Einordnung.', 'Enhancement and fogging can mimic a tumour. Evolution, clinical findings and DWI help with interpretation.', "جذب ماده حاجب و پدیده محوشدگی (Fogging) می‌توانند تومور را تقلید کنند؛ سیر، یافته‌های بالینی و DWI به تفسیر کمک می‌کنند."),
  },
  treatment: {
    title: L('Therapiekonzepte', 'Treatment concepts', 'مفاهیم درمانی'),
    lead: L('Intravenöse Thrombolyse und mechanische Thrombektomie.', 'Intravenous thrombolysis and mechanical thrombectomy.', 'ترومبولیز وریدی و ترومبکتومی مکانیکی.')
    ,
    items: [
      { title: L('IV-Thrombolyse', 'IV thrombolysis', 'ترومبولیز وریدی'), text: L('Alteplase oder Tenecteplase bei geeigneten Patienten innerhalb von 4,5 Stunden. Bei unbekanntem Symptombeginn kann ein DWI-FLAIR-Mismatch die Auswahl unterstützen. Zwischen 4,5 und 9 Stunden werden geeignete Patienten anhand definierter automatisierter Perfusions-Mismatch-Kriterien ausgewählt; ein beliebiger positiver CTP-Befund genügt nicht.', 'Alteplase or tenecteplase may be used in eligible patients within 4.5 hours. For unknown onset, a DWI-FLAIR mismatch can support selection. Between 4.5 and 9 hours, eligible patients are selected using defined automated perfusion-mismatch criteria; any positive CTP finding is not sufficient.', 'آلتپلاز یا تنکتپلاز برای بیماران واجد شرایط تا ۴٫۵ ساعت قابل استفاده است. در زمان شروع نامشخص علائم، عدم تطابق DWI-FLAIR می‌تواند به انتخاب بیمار کمک کند. در بازه ۴٫۵ تا ۹ ساعت، بیماران واجد شرایط بر اساس معیارهای تعریف‌شده و خودکارِ عدم تطابق پرفیوژن انتخاب می‌شوند؛ هر یافته مثبت CTP کافی نیست.') },
      { title: L('Mechanische Thrombektomie', 'Mechanical thrombectomy', 'ترومبکتومی مکانیکی'), text: L('Bei ausgewählten geeigneten Patienten mit Großgefäßverschluss, die die geltenden klinischen und bildgebenden Auswahlkriterien erfüllen, kann eine Thrombektomie bis 24 Stunden nach last known well erwogen werden. Das Zeitfenster gilt nicht automatisch für jeden Großgefäßverschluss.', 'For selected eligible patients with large-vessel occlusion who meet applicable clinical and imaging selection criteria, thrombectomy may be considered up to 24 hours from last known well. This window does not apply automatically to every large-vessel occlusion.', 'برای بیماران منتخب و واجد شرایط مبتلا به انسداد عروق بزرگ که معیارهای بالینی و تصویربرداری مربوط را دارند، می‌توان ترومبکتومی را تا ۲۴ ساعت پس از آخرین زمان سالم در نظر گرفت. این پنجره به‌طور خودکار برای همه انسدادهای عروق بزرگ صدق نمی‌کند.') },
      { title: L('Techniken', 'Techniques', 'تکنیک‌ها'), text: L('Aspiration, Stent-Retriever oder kombiniert.', 'Aspiration, stent retriever or a combined technique.', 'آسپیراسیون، استنت رتریور یا روش ترکیبی.') },
    ],
    reportItems: [
      { title: L('1. Blutung und Mimic', '1. Haemorrhage and mimic', '۱. خونریزی و تقلیدکننده'), text: L('Intrakranielle Blutung, Raumforderung oder andere akute Alternative?', 'Any intracranial haemorrhage, mass lesion or alternative acute diagnosis?', 'آیا خونریزی داخل جمجمه، توده یا تشخیص حاد دیگری وجود دارد؟') },
      { title: L('2. Frühischämie', '2. Early ischaemia', '۲. ایسکمی زودرس'), text: L('Seite, Gefäßterritorium, betroffene Strukturen und ASPECTS angeben.', 'Report side, vascular territory, involved structures and ASPECTS.', 'سمت، قلمرو عروقی، ساختارهای درگیر و ASPECTS ذکر شود.') },
      { title: L('3. Gefäßverschluss', '3. Vessel occlusion', '۳. انسداد عروقی'), text: L('Exakte Verschlusshöhe, Tandemläsion, Stenose/Dissektion und Kollateralstatus.', 'Exact occlusion site, tandem lesion, stenosis/dissection and collateral status.', 'محل دقیق انسداد، ضایعه تاندوم، تنگی/دیسکسیون و وضعیت کولترال‌ها.') },
      { title: L('4. Kern und Penumbra', '4. Core and penumbra', '۴. هسته و پنومبرا'), text: L('Bei Perfusion: Kernvolumen, Mismatch und technische Limitationen nennen.', 'For perfusion imaging, state core volume, mismatch and technical limitations.', 'در پرفیوژن، حجم هسته، mismatch و محدودیت‌های فنی ذکر شوند.') },
      { title: L('5. Komplikationen', '5. Complications', '۵. عوارض'), text: L('Ödem, Mittellinienverlagerung, Herniation oder hämorrhagische Transformation.', 'Oedema, midline shift, herniation or haemorrhagic transformation.', 'ادم، شیفت خط وسط، هرنیاسیون یا تبدیل هموراژیک.') },
    ],
    key: L('Ein guter Akutbefund beantwortet drei Fragen: Blutung? Verschluss? Wie viel Gewebe ist bereits infarziert und wie viel potenziell rettbar?', 'A good acute report answers three questions: haemorrhage? occlusion? how much tissue is infarcted and how much may still be salvageable?', 'گزارش حاد خوب به سه سؤال پاسخ می‌دهد: خونریزی؟ انسداد؟ چه مقدار بافت انفارکت شده و چه مقدار قابل نجات است؟'),
  },
  cases: {
    title: L('Zwei Radiopaedia-Fallbeispiele', 'Two Radiopaedia cases', 'دو کیس Radiopaedia'),
    lead: L('Die Fälle ergänzen sich: ein klassisches frühes CT-Zeichen und ein subtiler CT-Befund mit deutlich positiver DWI.', 'The cases complement each other: a classic early CT sign and subtle CT changes with clearly positive DWI.', 'این دو کیس مکمل یکدیگرند: علامت کلاسیک اولیه CT و یافته ظریف CT با DWI واضحاً مثبت.'),
  },
  takehome: {
    title: L('Take home message', 'Take-home messages', 'نکات کلیدی'),
    lead: L('Die wichtigsten Regeln für die Akutdiagnostik.', 'The essential rules for acute imaging.', 'قواعد اصلی تصویربرداری حاد.'),
    items: [
      { title: L('NCCT kann früh normal sein', 'Early NCCT may be normal', 'NCCT اولیه ممکن است طبیعی باشد'), text: L('Klinik und Gefäßbildgebung bleiben entscheidend.', 'Clinical findings and vascular imaging remain decisive.', 'علائم بالینی و تصویربرداری عروقی تعیین‌کننده می‌مانند.') },
      { title: L('CTA lokalisiert die LVO', 'CTA localises LVO', 'CTA محل LVO را مشخص می‌کند'), text: L('Verschlusshöhe, Tandemläsion und Kollateralen beeinflussen die Therapie.', 'Occlusion level, tandem lesions and collaterals affect treatment.', 'سطح انسداد، ضایعه تاندوم و کولترال‌ها بر درمان اثر دارند.') },
      { title: L('DWI immer mit ADC', 'Always pair DWI with ADC', 'DWI همیشه همراه ADC'), text: L('Nur DWI hoch plus ADC niedrig beweist echte akute Restriktion.', 'Only high DWI with low ADC confirms true acute restriction.', 'فقط DWI بالا همراه ADC پایین محدودیت واقعی حاد را تأیید می‌کند.') },
      { title: L('Zeitverlauf verhindert Fehler', 'Timeline prevents errors', 'سیر زمانی از خطا جلوگیری می‌کند'), text: L('Fogging, Enhancement und Shine-through sind ohne zeitlichen Kontext irreführend.', 'Fogging, enhancement and shine-through are misleading without temporal context.', "پدیده محوشدگی (Fogging)، تقویت پس از تزریق و اثر عبور سیگنال T2 (shine-through) بدون زمینه زمانی گمراه‌کننده‌اند.") },
      { title: L('Therapie nicht unnötig verzögern', 'Do not delay treatment unnecessarily', 'درمان را بی‌دلیل به تأخیر نیندازید'), text: L('Zusatzbildgebung gezielt einsetzen und Reperfusionskandidaten rasch erkennen.', 'Use additional imaging selectively and identify reperfusion candidates rapidly.', 'تصویربرداری تکمیلی هدفمند و شناسایی سریع کاندیدهای بازپرفیوژن.') },
    ],
  },
}

export const STROKE_LEARNING_CASES = [
  {
    id: 'dense-mca',
    image: '/stroke/case-dense-mca-rid-45310.png',
    url: 'https://radiopaedia.org/cases/acute-ischaemic-stroke-dense-mca-sign?lang=us',
    credit: 'Case courtesy of Gaurav Som Prakash Gupta, Radiopaedia.org · rID-45310 · CC BY-NC-SA 3.0',
    label: L('CT-Frühzeichen', 'Early CT sign', 'علامت زودرس CT'),
    title: L('Akuter linker MCA-Infarkt mit Dense-MCA-Zeichen', 'Acute left MCA infarct with dense MCA sign', 'انفارکت حاد MCA چپ با علامت MCA هایپردنس'),
    text: L(
      '80-jährige Patientin mit akuter Aphasie und rechtsseitiger Schwäche. NCCT zeigt ein hyperdenses linkes MCA-Segment, Verlust des Insular ribbon und beginnende Hypodensität im linken MCA-Territorium.',
      'An 80-year-old woman with acute aphasia and right-sided weakness. NCCT shows a dense left MCA segment, loss of the insular ribbon and early low attenuation in the left MCA territory.',
      'خانم ۸۰ ساله با آفازی حاد و ضعف سمت راست؛ NCCT سگمان هایپردنس MCA چپ، محوشدن نوار اینسولا و هیپودنسیتی اولیه در قلمرو MCA چپ را نشان می‌دهد.'
    ),
    alt: L('Native CCT mit hyperdensem linken MCA-Zeichen', 'Non-contrast CT with a dense left MCA sign', 'CT بدون کنتراست با علامت MCA هایپردنس چپ'),
  },
  {
    id: 'ct-dwi',
    images: ['/stroke/case-left-mca-ct-rid-78956.png', '/stroke/case-left-mca-dwi-rid-78956.jpg'],
    url: 'https://radiopaedia.org/cases/left-mca-acute-ischaemic-stroke?lang=us',
    credit: 'Case courtesy of Abdulrahman Abdo Ali Abbas, Radiopaedia.org · rID-78956 · CC BY-NC-SA 3.0',
    label: L('CT–DWI-Korrelation', 'CT–DWI correlation', 'همبستگی CT و DWI'),
    title: L('Subtiler CT-Befund, deutliche DWI-Restriktion', 'Subtle CT findings with clear DWI restriction', 'یافته ظریف CT با محدودیت واضح DWI'),
    text: L(
      '30-jährige Patientin fünf Tage postpartal mit akuter Aphasie und rechtsseitiger Parese. CT zeigt nur diskrete Grau-Weiß-Verwaschung; DWI/ADC bestätigt den akuten distalen linken MCA-Infarkt.',
      'A 30-year-old woman five days postpartum presents with aphasia and right-sided paresis. CT shows only subtle grey-white blurring; DWI/ADC confirms an acute distal left MCA infarct.',
      'خانم ۳۰ ساله پنج روز پس از زایمان با آفازی و پارزی راست؛ CT فقط محوشدگی ظریف خاکستری-سفید و DWI/ADC انفارکت حاد دیستال MCA چپ را تأیید می‌کند.'
    ),
    alt: L('CT und DWI eines akuten linken MCA-Infarkts', 'CT and DWI of an acute left MCA infarct', 'CT و DWI انفارکت حاد MCA چپ'),
  },
]

const QUESTION_SEEDS = [
  {
    id: 'first-imaging',
    question: L('Welche Untersuchung ist beim akuten Schlaganfall typischerweise der erste Bildgebungsschritt?', 'What is typically the first imaging step in acute stroke?', 'در سکته حاد معمولاً اولین روش تصویربرداری کدام است؟'),
    options: [
      L('Native kraniale CT', 'Non-contrast head CT', 'CT بدون کنتراست مغز'),
      L('Kontrastverstärkte T1-MRT', 'Contrast-enhanced T1 MRI', 'MRI T1 با کنتراست'),
      L('Konventionelle Angiografie ohne Vorbildgebung', 'Catheter angiography without prior imaging', 'آنژیوگرافی کاتتر بدون تصویربرداری قبلی'),
      L('PET-CT', 'PET-CT', 'PET-CT'),
    ],
    correct: 'A',
    explanation: L('Die native CCT ist schnell verfügbar und dient primär zum Ausschluss einer intrakraniellen Blutung sowie zur Erfassung früher Ischämiezeichen.', 'NCCT is rapidly available and primarily excludes intracranial haemorrhage while assessing early ischaemic change.', 'NCCT سریع در دسترس است و برای رد خونریزی داخل جمجمه و بررسی علائم اولیه ایسکمی استفاده می‌شود.'),
  },
  {
    id: 'dense-mca',
    question: L('Was bedeutet ein Dense-MCA-Zeichen in der nativen CCT?', 'What does a dense MCA sign on NCCT represent?', 'علامت MCA هایپردنس در NCCT نشان‌دهنده چیست؟'),
    options: [
      L('Verkalkung des Plexus choroideus', 'Choroid plexus calcification', 'کلسیفیکاسیون شبکه کوروئید'),
      L('Akuter Thrombus in der A. cerebri media', 'Acute thrombus in the middle cerebral artery', 'ترومبوس حاد در شریان مغزی میانی'),
      L('Subarachnoidalblutung', 'Subarachnoid haemorrhage', 'خونریزی ساب‌آراکنوئید'),
      L('Chronische Mikroangiopathie', 'Chronic small-vessel disease', 'میکروآنژیوپاتی مزمن'),
    ],
    correct: 'B',
    explanation: L('Das hyperdense Gefäß entspricht häufig einem akuten intraluminalen Thrombus und ist ein frühes indirektes Zeichen eines MCA-Verschlusses.', 'The hyperdense vessel commonly reflects acute intraluminal thrombus and is an early indirect sign of MCA occlusion.', 'رگ هایپردنس معمولاً ناشی از ترومبوس حاد داخل‌لومنی و علامت غیرمستقیم انسداد MCA است.'),
  },
  {
    id: 'insular-ribbon',
    question: L('Welcher frühe CT-Befund wird als „Insular-ribbon-Zeichen“ bezeichnet?', 'Which early CT finding is called the insular ribbon sign?', 'کدام یافته زودرس CT علامت نوار اینسولا نام دارد؟'),
    options: [
      L('Hyperdensität der Falx', 'Hyperdensity of the falx', 'هایپردنسیتی فالکس'),
      L('Verlust der Grau-Weiß-Differenzierung der Insula', 'Loss of insular grey-white differentiation', 'از بین رفتن تمایز خاکستری-سفید اینسولا'),
      L('Erweiterung des Seitenventrikels', 'Lateral ventricular enlargement', 'اتساع بطن جانبی'),
      L('Verkalkung der Basalganglien', 'Basal ganglia calcification', 'کلسیفیکاسیون گانگلیون‌های قاعده‌ای'),
    ],
    correct: 'B',
    explanation: L('Die Insula ist bei MCA-Ischämie häufig früh betroffen; ihre normale kortikale Abgrenzung geht verloren.', 'The insula is often affected early in MCA ischaemia and its normal cortical definition is lost.', 'اینسولا در ایسکمی MCA اغلب زود درگیر شده و مرزبندی طبیعی کورتکس آن از بین می‌رود.'),
  },
  {
    id: 'aspects',
    question: L('Wie wird der ASPECTS berechnet?', 'How is ASPECTS calculated?', 'ASPECTS چگونه محاسبه می‌شود؟'),
    options: [
      L('Start bei 0, pro normale Region +1', 'Start at 0 and add 1 for each normal region', 'شروع از ۰ و افزودن ۱ برای هر ناحیه طبیعی'),
      L('Start bei 10, pro ischämische Region −1', 'Start at 10 and subtract 1 for each ischaemic region', 'شروع از ۱۰ و کم کردن ۱ برای هر ناحیه ایسکمیک'),
      L('Anzahl hyperdenser Gefäße', 'Number of hyperdense vessels', 'تعداد عروق هایپردنس'),
      L('Volumen des Perfusionsdefizits in Millilitern', 'Perfusion deficit volume in millilitres', 'حجم نقص پرفیوژن به میلی‌لیتر'),
    ],
    correct: 'B',
    explanation: L('ASPECTS beginnt bei 10. Jede der zehn MCA-Regionen mit frühen ischämischen Veränderungen reduziert den Score um einen Punkt.', 'ASPECTS begins at 10; each of ten MCA regions with early ischaemic change reduces the score by one.', 'ASPECTS از ۱۰ شروع می‌شود و هر ناحیه ایسکمیک از ده ناحیه MCA یک امتیاز کم می‌کند.'),
  },
  {
    id: 'cta',
    question: L('Welche Hauptinformation liefert die CT-Angiografie im Akutsetting?', 'What is the main information provided by CTA in acute stroke?', 'اطلاعات اصلی CTA در سکته حاد چیست؟'),
    options: [
      L('Exakte ADC-Werte', 'Exact ADC values', 'مقادیر دقیق ADC'),
      L('Verschlusshöhe, Stenosen und Kollateralstatus', 'Occlusion level, stenoses and collateral status', 'سطح انسداد، تنگی‌ها و وضعیت کولترال‌ها'),
      L('Histologische Infarktart', 'Histological infarct type', 'نوع هیستولوژیک انفارکت'),
      L('NIHSS-Score', 'NIHSS score', 'نمره NIHSS'),
    ],
    correct: 'B',
    explanation: L('CTA lokalisiert den Gefäßverschluss und zeigt zusätzliche vaskuläre Befunde, die für die Thrombektomieplanung wichtig sind.', 'CTA localises the occlusion and shows additional vascular findings important for thrombectomy planning.', 'CTA محل انسداد و یافته‌های عروقی مهم برای برنامه‌ریزی ترومبکتومی را نشان می‌دهد.'),
  },
  {
    id: 'perfusion-mismatch',
    question: L('Was beschreibt ein relevantes Perfusions-Mismatch?', 'What does a relevant perfusion mismatch indicate?', 'عدم تطابق مهم پرفیوژن چه چیزی را نشان می‌دهد؟'),
    options: [
      L('Perfusionsdefizit und Infarktkern sind gleich groß', 'Perfusion deficit and infarct core are identical', 'نقص پرفیوژن و هسته انفارکت هم‌اندازه‌اند'),
      L('Perfusionsdefizit ist größer als der irreversible Kern', 'Perfusion deficit is larger than the irreversible core', 'نقص پرفیوژن بزرگ‌تر از هسته غیرقابل برگشت است'),
      L('Nur eine Blutung ist sichtbar', 'Only haemorrhage is visible', 'فقط خونریزی دیده می‌شود'),
      L('Normale Perfusion bei großem DWI-Kern', 'Normal perfusion with a large DWI core', 'پرفیوژن طبیعی با هسته بزرگ DWI'),
    ],
    correct: 'B',
    explanation: L('Die Differenz entspricht potenziell rettbarer Penumbra und kann die Reperfusionsauswahl im erweiterten Zeitfenster unterstützen.', 'The difference represents potentially salvageable penumbra and may support reperfusion selection in extended windows.', 'این اختلاف نمایانگر پنومبرای قابل نجات است و در پنجره زمانی گسترده به انتخاب بازپرفیوژن کمک می‌کند.'),
  },
  {
    id: 'dwi-adc',
    question: L('Welche Kombination beweist eine echte akute Diffusionsrestriktion?', 'Which combination confirms true acute diffusion restriction?', 'کدام ترکیب محدودیت واقعی انتشار حاد را تأیید می‌کند؟'),
    options: [
      L('DWI dunkel, ADC hoch', 'Low DWI, high ADC', 'DWI پایین و ADC بالا'),
      L('DWI hell, ADC niedrig', 'High DWI, low ADC', 'DWI بالا و ADC پایین'),
      L('DWI hell, ADC hoch', 'High DWI, high ADC', 'DWI بالا و ADC بالا'),
      L('FLAIR dunkel, T1 hell', 'Low FLAIR, high T1', 'FLAIR پایین و T1 بالا'),
    ],
    correct: 'B',
    explanation: L('Akutes zytotoxisches Ödem führt zu hoher DWI-Signalintensität und erniedrigtem ADC.', 'Acute cytotoxic oedema produces high DWI signal and low ADC.', 'ادم سیتوتوکسیک حاد باعث افزایش DWI و کاهش ADC می‌شود.'),
  },
  {
    id: 'dwi-flair',
    question: L('Was kann ein DWI-FLAIR-Mismatch bei ausgewählten Patienten mit unbekanntem Symptombeginn unterstützen?', 'What can a DWI-FLAIR mismatch support in selected patients with unknown symptom onset?', 'عدم تطابق DWI-FLAIR در بیماران منتخب با زمان شروع نامشخص علائم چه کمکی می‌تواند بکند؟'),
    options: [
      L('Bildgebungsbasierte Therapieauswahl; keine genaue Läsionsuhr', 'Imaging-based treatment selection; not an exact lesion clock', 'انتخاب درمان بر پایه تصویربرداری؛ نه تعیین دقیق زمان ضایعه'),
      L('Chronische Enzephalomalazie', 'Chronic encephalomalacia', 'انسفالومالاسی مزمن'),
      L('Sichere intrazerebrale Blutung', 'Definite intracerebral haemorrhage', 'خونریزی قطعی داخل مغزی'),
      L('Normalbefund', 'Normal examination', 'یافته طبیعی'),
    ],
    correct: 'A',
    explanation: L('Das Muster kann bei ausgewählten Patienten mit unbekanntem Symptombeginn eine Bildgebungsauswahl unterstützen. Es datiert den Infarkt nicht exakt und begründet allein keine Therapie.', 'In selected patients with unknown symptom onset, the pattern may support imaging-based selection. It does not precisely date the infarct or establish treatment eligibility by itself.', 'این الگو در بیماران منتخب با زمان شروع نامشخص می‌تواند به انتخاب بر پایه تصویربرداری کمک کند؛ اما سن انفارکت را دقیق تعیین نمی‌کند و به‌تنهایی واجد شرایط بودن برای درمان را ثابت نمی‌کند.'),
  },
  {
    id: 'swi',
    question: L('Welche Sequenz ist besonders wichtig zum Nachweis von Einblutung und Suszeptibilitätszeichen?', 'Which sequence is particularly important for haemorrhage and susceptibility signs?', 'کدام سکانس برای خونریزی و علائم افت سیگنال حساسیت مغناطیسی مهم است؟'),
    options: [L('T1 ohne KM', 'Unenhanced T1', 'T1 بدون کنتراست'), L('T2*/SWI', 'T2*/SWI', 'T2*/SWI'), L('TOF allein', 'TOF alone', 'فقط TOF'), L('MRCP', 'MRCP', 'MRCP')],
    correct: 'B',
    explanation: L('T2*-gewichtete und suszeptibilitätsgewichtete Sequenzen reagieren empfindlich auf Blutabbauprodukte und thrombotisches Suszeptibilitätssignal.', 'T2*-weighted and susceptibility-weighted sequences are sensitive to blood products and thrombus susceptibility.', 'T2* و SWI به محصولات خون و افت سیگنال حساسیت مغناطیسی ترومبوس حساس‌اند.'),
  },
  {
    id: 'fogging',
    question: L('Was ist der Fogging-Effekt?', 'What is the fogging effect?', "اثر پدیده محوشدگی (Fogging) چیست؟"),
    options: [
      L('Vorübergehende scheinbare Normalisierung eines subakuten Infarkts', 'Temporary apparent normalisation of a subacute infarct', 'طبیعی به نظر رسیدن موقت انفارکت تحت‌حاد'),
      L('Dauerhafte Verkalkung des Infarkts', 'Permanent infarct calcification', 'کلسیفیکاسیون دائمی انفارکت'),
      L('Akute Kontrastmittelallergie', 'Acute contrast allergy', 'حساسیت حاد به کنتراست'),
      L('Artefakt durch Metall', 'Metal artefact', 'آرتیفکت فلزی'),
    ],
    correct: 'A',
    explanation: L('In der subakuten Phase kann die Läsion vorübergehend isodens beziehungsweise weniger T2-auffällig werden und dadurch übersehen werden.', 'In the subacute phase the lesion may temporarily become isodense or less conspicuous on T2 and be overlooked.', 'در فاز تحت‌حاد ضایعه ممکن است موقتاً ایزودنس یا در T2 کم‌واضح شود و نادیده بماند.'),
  },
  {
    id: 'shine-through',
    question: L('Woran erkennt man T2-shine-through statt echter Restriktion?', 'How is T2 shine-through distinguished from true restriction?', "چگونه اثر عبور سیگنال T2 (shine-through) از محدودیت واقعی افتراق داده می‌شود؟"),
    options: [
      L('DWI hell und ADC ebenfalls normal/erhöht', 'High DWI with normal or high ADC', 'DWI بالا با ADC طبیعی یا بالا'),
      L('DWI hell und ADC deutlich niedrig', 'High DWI with markedly low ADC', 'DWI بالا با ADC به‌شدت پایین'),
      L('T1 hyperintens und SWI normal', 'High T1 and normal SWI', 'T1 بالا و SWI طبیعی'),
      L('Nur durch CTA', 'Only by CTA', 'فقط با CTA'),
    ],
    correct: 'A',
    explanation: L('Beim Shine-through bleibt DWI wegen des T2-Anteils hell, während ADC nicht mehr erniedrigt ist.', 'With shine-through DWI remains bright because of T2 contribution while ADC is no longer reduced.', "در اثر عبور سیگنال T2 (shine-through)، DWI به علت مؤلفه T2 روشن می‌ماند ولی ADC دیگر کاهش ندارد."),
  },
  {
    id: 'oedema-peak',
    question: L('Wann sind Ödem und Raumforderung eines großen Infarkts typischerweise am stärksten?', 'When do oedema and mass effect from a large infarct typically peak?', 'ادم و اثر فضاگیر انفارکت بزرگ معمولاً چه زمانی به اوج می‌رسند؟'),
    options: [L('In den ersten 10 Minuten', 'Within the first 10 minutes', 'در ۱۰ دقیقه اول'), L('Etwa Tag 3–5', 'Around days 3–5', 'حدود روز ۳ تا ۵'), L('Nach 6 Monaten', 'After 6 months', 'پس از ۶ ماه'), L('Nur nach Kontrastmittel', 'Only after contrast', 'فقط پس از کنتراست')],
    correct: 'B',
    explanation: L('Das Infarktödem nimmt über die ersten Tage zu und erreicht häufig um Tag 3–5 sein Maximum.', 'Infarct oedema increases over the first days and often peaks around days 3–5.', 'ادم انفارکت طی روزهای اول افزایش یافته و اغلب در روز ۳ تا ۵ بیشینه می‌شود.'),
  },
  {
    id: 'haemorrhagic-transformation',
    question: L('Welche Methode erkennt kleine hämorrhagische Transformationen besonders sensitiv?', 'Which method is particularly sensitive for small haemorrhagic transformation?', 'کدام روش برای تبدیل هموراژیک کوچک حساس‌تر است؟'),
    options: [L('T2*/SWI', 'T2*/SWI', 'T2*/SWI'), L('Nur FLAIR', 'FLAIR only', 'فقط FLAIR'), L('Ultraschall', 'Ultrasound', 'سونوگرافی'), L('Röntgen Schädel', 'Skull radiograph', 'رادیوگرافی جمجمه')],
    correct: 'A',
    explanation: L('Suszeptibilitätssequenzen zeigen auch kleine Blutprodukte als Signalverlust.', 'Susceptibility sequences demonstrate even small blood products as signal loss.', 'سکانس‌های افت سیگنال حساسیت مغناطیسی حتی محصولات خون کوچک را به‌صورت افت سیگنال نشان می‌دهند.'),
  },
  {
    id: 'thrombolysis',
    question: L('Welche Aussage zur intravenösen Thrombolyse entspricht der AHA/ASA-Leitlinie 2026?', 'Which statement about intravenous thrombolysis reflects the 2026 AHA/ASA guideline?', 'کدام عبارت درباره ترومبولیز وریدی با راهنمای AHA/ASA سال ۲۰۲۶ مطابقت دارد؟'),
    options: [
      L('Nur Alteplase ist zulässig', 'Only alteplase may be used', 'فقط آلتپلاز مجاز است'),
      L('Alteplase oder Tenecteplase können bei geeigneten Patienten eingesetzt werden', 'Alteplase or tenecteplase may be used in eligible patients', 'آلتپلاز یا تنکتپلاز در بیماران واجد شرایط قابل استفاده‌اند'),
      L('NIHSS unter 6 schließt Therapie immer aus', 'NIHSS below 6 always excludes treatment', 'NIHSS کمتر از ۶ همیشه درمان را رد می‌کند'),
      L('Bildgebung ist vor Lyse nicht erforderlich', 'Imaging is unnecessary before thrombolysis', 'تصویربرداری قبل از ترومبولیز لازم نیست'),
    ],
    correct: 'B',
    explanation: L('Die Leitlinie 2026 unterstützt beide Thrombolytika bei geeigneten Patienten; entscheidend sind behinderndes Defizit, Zeitfenster und Kontraindikationen.', 'The 2026 guideline supports either thrombolytic in eligible patients; disabling deficit, timing and contraindications are key.', 'راهنمای ۲۰۲۶ هر دو دارو را در بیماران واجد شرایط می‌پذیرد؛ نقص ناتوان‌کننده، زمان و منع‌ها تعیین‌کننده‌اند.'),
  },
  {
    id: 'thrombectomy',
    question: L('Bis wann kann eine Thrombektomie bei ausgewählten geeigneten Patienten erwogen werden, die die klinischen und bildgebenden Auswahlkriterien erfüllen?', 'How late may thrombectomy be considered for selected eligible patients who meet clinical and imaging selection criteria?', 'ترومبکتومی را برای بیماران منتخب و واجد شرایط که معیارهای بالینی و تصویربرداری را دارند تا چه زمانی می‌توان در نظر گرفت؟'),
    options: [L('30 Minuten', '30 minutes', '۳۰ دقیقه'), L('4,5 Stunden absolut', 'An absolute 4.5 hours', 'فقط ۴٫۵ ساعت'), L('Bis 24 Stunden nach last known well', 'Up to 24 hours from last known well', 'تا ۲۴ ساعت پس از آخرین زمان سالم'), L('Erst nach 72 Stunden', 'Only after 72 hours', 'فقط پس از ۷۲ ساعت')],
    correct: 'C',
    explanation: L('Bei ausgewählten Großgefäßverschlüssen kann die Thrombektomie anhand klinischer und bildgebender Kriterien bis 24 Stunden nach last known well erfolgen.', 'Selected patients with large-vessel occlusion may undergo thrombectomy up to 24 hours from last known well based on clinical and imaging criteria.', 'در انسداد عروق بزرگ منتخب، بر اساس معیارهای بالینی و تصویربرداری ترومبکتومی تا ۲۴ ساعت پس از آخرین زمان سالم ممکن است انجام شود.'),
  },
]

export const STROKE_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  QUESTION_SEEDS.map((item, index) => ({
    id: `ischaemischer-schlaganfall-${lang}-${String(index + 1).padStart(2, '0')}`,
    tags: ['ischaemischer-schlaganfall', 'schlaganfall', 'gehirn'],
    fach: 'gehirn',
    question: item.question[lang],
    options: item.options.map((text, optionIndex) => ({ id: ['A', 'B', 'C', 'D'][optionIndex], text: text[lang] })),
    correct: item.correct,
    explanation: item.explanation[lang],
  })),
]))

export const STROKE_FLASHCARD_TOPIC = {
  id: 'ischaemischer-schlaganfall',
  area: 'Kopf',
  chapter: 'Vaskuläre Erkrankungen',
  icon: '🧠',
  iconImage: '/fach/gehirn.png',
  color: '#7c3aed',
  href: '/flashcards/ischaemischer-schlaganfall',
  title: STROKE_LESSON.title,
  subtitle: L(
    'NCCT · CTA · CTP · ASPECTS · DWI/ADC · Zeitverlauf',
    'NCCT · CTA · CTP · ASPECTS · DWI/ADC · timeline',
    'NCCT · CTA · CTP · ASPECTS · DWI/ADC · سیر زمانی'
  ),
}

const FLASHCARD_SEEDS = [
  {
    category: L('Akutdiagnostik', 'Acute imaging', 'تصویربرداری حاد'),
    front: L('Was ist der erste Bildgebungsschritt beim akuten Schlaganfall?', 'What is the first imaging step in acute stroke?', 'اولین روش تصویربرداری در سکته حاد چیست؟'),
    answer: L('Native kraniale CT (NCCT).', 'Non-contrast head CT (NCCT).', 'CT بدون کنتراست مغز (NCCT).'),
    explanation: L('Sie ist schnell verfügbar, schließt eine intrakranielle Blutung aus und zeigt frühe Ischämiezeichen. Bei möglicher Großgefäßokklusion folgt ohne unnötige Verzögerung die CTA.', 'It is rapidly available, excludes intracranial haemorrhage and may show early ischaemic change. If large-vessel occlusion is possible, CTA follows without unnecessary delay.', 'این روش سریع است، خونریزی داخل جمجمه را رد می‌کند و ممکن است علائم اولیه ایسکمی را نشان دهد. در شک به انسداد عروق بزرگ، CTA بدون تأخیر غیرضروری انجام می‌شود.'),
    diagram: L('NCCT → Blutung ausschließen\nCTA → Verschluss lokalisieren\n± CTP → Kern/Penumbra', 'NCCT → exclude haemorrhage\nCTA → localise occlusion\n± CTP → core/penumbra', 'NCCT → رد خونریزی\nCTA → تعیین محل انسداد\n± CTP → هسته/پنومبرا'),
  },
  {
    category: L('CT-Frühzeichen', 'Early CT signs', 'علائم زودرس CT'),
    front: L('Was bedeutet das Dense-MCA-Zeichen?', 'What does the dense MCA sign mean?', 'علامت MCA هایپردنس به چه معناست؟'),
    answer: L('Akuter Thrombus in der A. cerebri media.', 'Acute thrombus in the middle cerebral artery.', 'ترومبوس حاد در شریان مغزی میانی.'),
    explanation: L('Das Gefäß erscheint durch den frischen intraluminalen Thrombus hyperdens. Das Zeichen ist ein früher indirekter Hinweis auf einen MCA-Verschluss, muss aber von Verkalkung und hohem Hämatokrit abgegrenzt werden.', 'The vessel appears hyperdense because of fresh intraluminal thrombus. It is an early indirect sign of MCA occlusion, but calcification and high haematocrit are important mimics.', 'رگ به علت ترومبوس تازه داخل‌لومنی هایپردنس می‌شود. این علامت نشانه غیرمستقیم زودرس انسداد MCA است، اما باید از کلسیفیکاسیون و هماتوکریت بالا افتراق داده شود.'),
  },
  {
    category: L('CT-Frühzeichen', 'Early CT signs', 'علائم زودرس CT'),
    front: L('Was ist das Insular-ribbon-Zeichen?', 'What is the insular ribbon sign?', 'علامت نوار اینسولا چیست؟'),
    answer: L('Verlust der Grau-Weiß-Differenzierung der Insula.', 'Loss of insular grey-white differentiation.', 'از بین رفتن تمایز خاکستری-سفید اینسولا.'),
    explanation: L('Die Insula wird im MCA-Territorium häufig früh ischämisch. Zytotoxisches Ödem lässt die normale kortikale Abgrenzung verschwimmen; deshalb ist das Zeichen ein sensibles frühes Parenchymmerkmal.', 'The insula is often affected early in MCA ischaemia. Cytotoxic oedema blurs its normal cortical outline, making this a sensitive early parenchymal sign.', 'اینسولا در ایسکمی MCA اغلب زود درگیر می‌شود. ادم سیتوتوکسیک مرز طبیعی کورتکس را محو می‌کند و این علامت را به یک یافته زودرس حساس تبدیل می‌کند.'),
  },
  {
    category: L('ASPECTS', 'ASPECTS', 'ASPECTS'),
    front: L('Wie wird ASPECTS berechnet?', 'How is ASPECTS calculated?', 'ASPECTS چگونه محاسبه می‌شود؟'),
    answer: L('Start bei 10; pro ischämische MCA-Region −1 Punkt.', 'Start at 10; subtract 1 per ischaemic MCA region.', 'شروع از ۱۰؛ برای هر ناحیه ایسکمیک MCA یک امتیاز کم می‌شود.'),
    explanation: L('Bewertet werden zehn definierte Regionen: C, L, IC, I sowie M1–M6. Ein niedriger Score bedeutet eine größere frühe Infarktausdehnung; ASPECTS bewertet das Parenchym, nicht den Gefäßverschluss.', 'Ten regions are assessed: C, L, IC, I and M1–M6. A lower score means more extensive early infarction; ASPECTS scores parenchymal change, not the vessel occlusion.', 'ده ناحیه C، L، IC، I و M1 تا M6 ارزیابی می‌شوند. نمره پایین‌تر به معنی وسعت بیشتر انفارکت اولیه است؛ ASPECTS پارانشیم را می‌سنجد، نه خود انسداد عروقی را.'),
    diagram: L('10 = keine Region betroffen\njede betroffene Region → −1\n0 = gesamtes MCA-Gebiet', '10 = no region involved\neach involved region → −1\n0 = entire MCA territory', '۱۰ = بدون ناحیه درگیر\nهر ناحیه درگیر → ۱−\n۰ = کل قلمرو MCA'),
  },
  {
    category: L('CTA', 'CTA', 'CTA'),
    front: L('Welche drei Kerninformationen liefert die CTA?', 'Which three core findings does CTA provide?', 'CTA کدام سه یافته اصلی را ارائه می‌دهد؟'),
    answer: L('Verschlusshöhe, Gefäßursache und Kollateralstatus.', 'Occlusion level, vascular cause and collateral status.', 'سطح انسداد، علت عروقی و وضعیت کولترال‌ها.'),
    explanation: L('Die CTA zeigt beispielsweise ICA-, M1-, M2- oder Basilarisverschlüsse, Tandemläsionen, Stenosen und Dissektionen. Diese Angaben sind zentral für Thrombektomieplanung und Prognose.', 'CTA demonstrates ICA, M1, M2 or basilar occlusion, tandem lesions, stenosis and dissection. These findings are central to thrombectomy planning and prognosis.', 'CTA انسداد ICA، M1، M2 یا بازیلار، ضایعات تاندوم، تنگی و دیسکسیون را نشان می‌دهد. این اطلاعات برای برنامه‌ریزی ترومبکتومی و پیش‌آگهی مهم‌اند.'),
    diagram: L('Wo? → Verschlusshöhe\nWarum? → Stenose/Dissektion\nWie versorgt? → Kollateralen', 'Where? → occlusion level\nWhy? → stenosis/dissection\nAlternative supply? → collaterals', 'کجا؟ → سطح انسداد\nچرا؟ → تنگی/دیسکسیون\nخون‌رسانی جایگزین؟ → کولترال‌ها'),
  },
  {
    category: L('Perfusion', 'Perfusion', 'پرفیوژن'),
    front: L('Was ist die Penumbra?', 'What is the penumbra?', 'پنومبرا چیست؟'),
    answer: L('Hypoperfundiertes, aber potenziell rettbares Hirngewebe.', 'Hypoperfused but potentially salvageable brain tissue.', 'بافت مغزی کم‌خون اما بالقوه قابل نجات.'),
    explanation: L('Die Penumbra ist funktionell gestört, aber noch nicht irreversibel infarziert. Ein Perfusionsdefizit, das größer als der Infarktkern ist, spricht für ein Mismatch und damit für rettbares Gewebe.', 'The penumbra is dysfunctional but not yet irreversibly infarcted. A perfusion deficit larger than the infarct core represents mismatch and suggests salvageable tissue.', 'پنومبرا عملکرد مختل دارد اما هنوز به‌طور برگشت‌ناپذیر انفارکت نشده است. بزرگ‌تر بودن نقص پرفیوژن از هسته انفارکت نشان‌دهنده mismatch و بافت قابل نجات است.'),
    diagram: L('Infarktkern = irreversibel\nPerfusionsdefizit − Kern = Penumbra', 'Infarct core = irreversible\nPerfusion deficit − core = penumbra', 'هسته انفارکت = برگشت‌ناپذیر\nنقص پرفیوژن − هسته = پنومبرا'),
  },
  {
    category: L('MRT', 'MRI', 'MRI'),
    front: L('Welche Kombination bestätigt echte akute Diffusionsrestriktion?', 'Which combination confirms true acute diffusion restriction?', 'کدام ترکیب محدودیت واقعی انتشار حاد را تأیید می‌کند؟'),
    answer: L('DWI hoch und ADC niedrig.', 'High DWI and low ADC.', 'DWI بالا و ADC پایین.'),
    explanation: L('Akutes zytotoxisches Ödem schränkt die Wasserbewegung ein. DWI allein genügt nicht, weil auch T2-shine-through hell erscheinen kann; erst der erniedrigte ADC bestätigt die Restriktion.', 'Acute cytotoxic oedema restricts water motion. DWI alone is insufficient because T2 shine-through can also appear bright; low ADC confirms true restriction.', "ادم سیتوتوکسیک حاد حرکت آب را محدود می‌کند. DWI به‌تنهایی کافی نیست، زیرا اثر عبور سیگنال T2 (shine-through) نیز روشن است؛ ADC پایین محدودیت واقعی را تأیید می‌کند."),
    diagram: L('DWI ↑ + ADC ↓ → echte Restriktion\nDWI ↑ + ADC ↔/↑ → Shine-through', 'DWI ↑ + ADC ↓ → true restriction\nDWI ↑ + ADC ↔/↑ → shine-through', "DWI ↑ + ADC ↓ → محدودیت واقعی\nDWI ↑ + ADC ↔/↑ → اثر عبور سیگنال T2 (shine-through)"),
  },
  {
    category: L('MRT', 'MRI', 'MRI'),
    front: L('Was bedeutet ein DWI-FLAIR-Mismatch?', 'What does a DWI-FLAIR mismatch suggest?', 'عدم تطابق DWI-FLAIR به چه معناست؟'),
    answer: L('Kann bei ausgewählten Patienten mit unbekanntem Symptombeginn die bildgebungsbasierte Auswahl unterstützen; datiert den Infarkt nicht exakt.', 'May support imaging-based selection in selected patients with unknown symptom onset; it does not precisely date the infarct.', 'می‌تواند در بیماران منتخب با زمان شروع نامشخص به انتخاب درمان بر پایه تصویربرداری کمک کند؛ اما سن انفارکت را دقیق تعیین نمی‌کند.'),
    explanation: L('DWI-FLAIR-Mismatch ist ein Auswahlmuster, keine genaue Läsionsuhr. Es begründet allein keine Therapie; Klinik, weitere Bildgebung und die geltenden Kriterien müssen mitbewertet werden.', 'DWI-FLAIR mismatch is a selection pattern, not an exact lesion clock. It does not establish treatment eligibility by itself; clinical findings, other imaging and applicable criteria must also be assessed.', 'عدم تطابق DWI-FLAIR الگویی برای انتخاب است، نه ساعت دقیق ضایعه. این یافته به‌تنهایی واجد شرایط بودن برای درمان را ثابت نمی‌کند؛ شرایط بالینی، تصویربرداری دیگر و معیارهای مربوط نیز باید ارزیابی شوند.'),
    diagram: L('DWI-Läsion + keine deutliche FLAIR-Hyperintensität\n→ kann Auswahl bei unbekanntem Symptombeginn unterstützen\n→ kein exakter Zeitstempel, keine alleinige Therapieentscheidung', 'DWI lesion + no marked FLAIR hyperintensity\n→ may support selection when onset is unknown\n→ not an exact timestamp or a treatment decision by itself', 'ضایعه DWI + نبود هایپراینتنسیتی واضح FLAIR\n← می‌تواند در شروع نامشخص به انتخاب کمک کند\n← زمان دقیق را نشان نمی‌دهد و به‌تنهایی مبنای درمان نیست'),
  },
  {
    category: L('MRT', 'MRI', 'MRI'),
    front: L('Wozu dienen T2*/SWI im Schlaganfallprotokoll?', 'Why are T2*/SWI included in a stroke protocol?', 'کاربرد T2*/SWI در پروتکل سکته چیست؟'),
    answer: L('Zum Nachweis von Blutung und Suszeptibilitätszeichen.', 'To detect haemorrhage and susceptibility signs.', 'برای تشخیص خونریزی و علائم افت سیگنال حساسیت مغناطیسی.'),
    explanation: L('Blutprodukte, Mikroblutungen und ein thrombotisches Suszeptibilitätszeichen führen zu Signalverlust. Die Sequenzen helfen damit beim Blutungsausschluss und bei der Erkennung hämorrhagischer Transformationen.', 'Blood products, microbleeds and thrombus susceptibility cause signal loss. These sequences help exclude haemorrhage and detect haemorrhagic transformation.', 'محصولات خون، میکروبلید و افت سیگنال حساسیت مغناطیسی ترومبوس باعث افت سیگنال می‌شوند. این سکانس‌ها به رد خونریزی و تشخیص تبدیل هموراژیک کمک می‌کنند.'),
  },
  {
    category: L('Zeitverlauf', 'Timeline', 'سیر زمانی'),
    front: L('Wann erreicht das Infarktödem typischerweise sein Maximum?', 'When does infarct oedema typically peak?', 'ادم انفارکت معمولاً چه زمانی به اوج می‌رسد؟'),
    answer: L('Etwa an Tag 3–5.', 'Around days 3–5.', 'حدود روز ۳ تا ۵.'),
    explanation: L('In den ersten Tagen nehmen Schwellung und Raumforderung zu. Bei großen MCA-Infarkten ist in dieser Phase die Gefahr von Mittellinienverlagerung und Herniation besonders hoch.', 'Swelling and mass effect increase during the first days. In large MCA infarcts, the risk of midline shift and herniation is greatest during this period.', 'در روزهای نخست تورم و اثر فضاگیر افزایش می‌یابد. در انفارکت بزرگ MCA خطر شیفت خط وسط و هرنیاسیون در این دوره بیشتر است.'),
  },
  {
    category: L('Zeitverlauf', 'Timeline', 'سیر زمانی'),
    front: L('Was ist der Fogging-Effekt?', 'What is the fogging effect?', "اثر پدیده محوشدگی (Fogging) چیست؟"),
    answer: L('Vorübergehende scheinbare Normalisierung eines subakuten Infarkts.', 'Temporary apparent normalisation of a subacute infarct.', 'طبیعی به نظر رسیدن موقت انفارکت تحت‌حاد.'),
    explanation: L('Meist in der zweiten bis dritten Woche wird der Infarkt in der CT vorübergehend isodens und kann übersehen werden. Voraufnahmen, Klinik und gegebenenfalls MRT verhindern die Fehlinterpretation.', 'Usually during weeks 2–3, the infarct may become temporarily isodense on CT and be overlooked. Prior imaging, clinical context and MRI help prevent misinterpretation.', 'معمولاً در هفته دوم تا سوم انفارکت در CT موقتاً ایزودنس می‌شود و ممکن است دیده نشود. تصاویر قبلی، زمینه بالینی و MRI از تفسیر اشتباه جلوگیری می‌کنند.'),
    diagram: L('akut → hypodens\nWoche 2–3 → scheinbar isodens\nchronisch → Enzephalomalazie', 'acute → hypoattenuating\nweeks 2–3 → apparently isodense\nchronic → encephalomalacia', 'حاد → هیپودنس\nهفته ۲–۳ → ظاهراً ایزودنس\nمزمن → انسفالومالاسی'),
  },
  {
    category: L('Zeitverlauf', 'Timeline', 'سیر زمانی'),
    front: L('Wie unterscheidet man T2-shine-through von echter Restriktion?', 'How is T2 shine-through distinguished from true restriction?', "چگونه اثر عبور سیگنال T2 (shine-through) از محدودیت واقعی افتراق داده می‌شود؟"),
    answer: L('ADC prüfen: beim Shine-through ist er normal oder erhöht.', 'Check ADC: it is normal or high in shine-through.', "ADC را بررسی کنید: در اثر عبور سیگنال T2 (shine-through) طبیعی یا بالا است."),
    explanation: L('DWI kann durch seinen T2-Anteil noch lange hyperintens bleiben, obwohl keine aktive Restriktion mehr besteht. Ein niedriger ADC spricht für echte Restriktion, ein pseudonormaler oder hoher ADC für Shine-through.', 'DWI may remain bright because of its T2 component even after restriction has resolved. Low ADC indicates true restriction; pseudonormal or high ADC indicates shine-through.', "DWI به علت مؤلفه T2 ممکن است پس از رفع محدودیت نیز روشن بماند. ADC پایین نشان‌دهنده محدودیت واقعی و ADC شبه‌طبیعی یا بالا نشان‌دهنده اثر عبور سیگنال T2 (shine-through) است."),
    diagram: L('echte Restriktion → DWI ↑ / ADC ↓\nShine-through → DWI ↑ / ADC ↔ oder ↑', 'true restriction → DWI ↑ / ADC ↓\nshine-through → DWI ↑ / ADC ↔ or ↑', "محدودیت واقعی → DWI ↑ / ADC ↓\nاثر عبور سیگنال T2 (shine-through) → DWI ↑ / ADC ↔ یا ↑"),
  },
  {
    category: L('Komplikationen', 'Complications', 'عوارض'),
    front: L('Wie zeigt sich eine hämorrhagische Transformation?', 'How does haemorrhagic transformation appear?', 'تبدیل هموراژیک چگونه دیده می‌شود؟'),
    answer: L('Hyperdens in der NCCT, suszeptibel in T2*/SWI.', 'Hyperdense on NCCT and susceptible on T2*/SWI.', 'در NCCT هایپردنس و در T2*/SWI دارای افت سیگنال حساسیت مغناطیسی.'),
    explanation: L('Das Spektrum reicht von petechialen Einblutungen bis zum raumfordernden Parenchymhämatom. T2*/SWI ist besonders empfindlich für kleine Blutprodukte; die klinische Relevanz hängt von Typ und Raumforderung ab.', 'The spectrum ranges from petechial haemorrhage to space-occupying parenchymal haematoma. T2*/SWI is particularly sensitive to small blood products; clinical significance depends on type and mass effect.', 'طیف از خونریزی پتشیال تا هماتوم پارانشیمی فضاگیر است. T2*/SWI برای محصولات خون کوچک حساس است و اهمیت بالینی به نوع و اثر فضاگیر بستگی دارد.'),
  },
  {
    category: L('Therapie', 'Treatment', 'درمان'),
    front: L('Welches Standardzeitfenster gilt für die IV-Thrombolyse?', 'What is the standard time window for IV thrombolysis?', 'پنجره زمانی استاندارد ترومبولیز وریدی چیست؟'),
    answer: L('Bis 4,5 Stunden bei geeigneten Patienten.', 'Up to 4.5 hours in eligible patients.', 'تا ۴٫۵ ساعت در بیماران واجد شرایط.'),
    explanation: L('Die Behandlung soll so früh wie möglich erfolgen. Entscheidend sind ein behinderndes Defizit, fehlende Kontraindikationen und der Ausschluss einer Blutung; bei definiertem Mismatch ist eine erweiterte Auswahl möglich.', 'Treatment should be given as early as possible. A disabling deficit, absence of contraindications and exclusion of haemorrhage are key; defined mismatch patterns may allow extended selection.', 'درمان باید هرچه زودتر انجام شود. نقص ناتوان‌کننده، نبود منع و رد خونریزی مهم‌اند؛ در الگوهای مشخص mismatch انتخاب گسترده‌تر ممکن است.'),
  },
  {
    category: L('Therapie', 'Treatment', 'درمان'),
    front: L('Bis wann kann eine Thrombektomie bei ausgewählten LVO-Patienten erfolgen?', 'How late may thrombectomy be performed in selected LVO patients?', 'ترومبکتومی در بیماران منتخب LVO تا چه زمانی ممکن است؟'),
    answer: L('Bis 24 Stunden nach last known well – nur bei ausgewählten geeigneten Patienten nach klinischen und bildgebenden Kriterien.', 'Up to 24 hours from last known well, only for selected eligible patients meeting clinical and imaging criteria.', 'تا ۲۴ ساعت پس از آخرین زمان سالم؛ فقط برای بیماران منتخب و واجد شرایط بر اساس معیارهای بالینی و تصویربرداری.'),
    explanation: L('Das erweiterte Zeitfenster gilt nicht automatisch für jede LVO. Klinischer Zustand, Verschlusshöhe und Infarktkern sowie geeignete bildgebende Auswahlkriterien müssen gemeinsam beurteilt werden; im frühen Fenster darf Zusatzbildgebung die Therapie nicht unnötig verzögern.', 'The extended window does not automatically apply to every LVO. Clinical status, occlusion site and infarct core, together with applicable imaging selection criteria, must be assessed; in the early window, additional imaging must not unnecessarily delay treatment.', 'پنجره گسترده برای هر LVO به‌طور خودکار صدق نمی‌کند. وضعیت بالینی، محل انسداد و هسته انفارکت همراه با معیارهای تصویربرداری مربوط باید ارزیابی شوند؛ در پنجره زودرس تصویربرداری اضافی نباید درمان را بی‌دلیل به تأخیر اندازد.'),
    diagram: L('Ausgewählte geeignete Patienten: LVO + passende klinische und bildgebende Kriterien (u. a. Kern/Mismatch) → Thrombektomie bis 24 h erwägen', 'Selected eligible patients: LVO + applicable clinical and imaging criteria (including core/mismatch) → consider thrombectomy up to 24 h', 'بیماران منتخب و واجد شرایط: LVO + معیارهای بالینی و تصویربرداری مربوط (از جمله هسته/عدم تطابق) ← بررسی ترومبکتومی تا ۲۴ ساعت'),
  },
]

export const STROKE_FLASHCARDS = FLASHCARD_SEEDS.map((item, index) => ({
  id: `ischaemischer-schlaganfall-${String(index + 1).padStart(2, '0')}`,
  topicId: 'ischaemischer-schlaganfall',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
  diagram: item.diagram || null,
}))
