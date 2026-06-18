const L = (de, en, fa) => ({ de, en, fa })

export const HIE_LESSON = {
  toc: L('Inhaltsverzeichnis', 'Contents', 'فهرست مطالب'),
  breadcrumbArea: L('Kopf', 'Head', 'سر'),
  breadcrumbCurrent: L(
    'Vaskuläre Erkrankungen · Hypoxisch-ischämische Hirnschädigung',
    'Vascular diseases · Hypoxic-ischaemic brain injury',
    'بیماری‌های عروقی · آسیب هیپوکسیک-ایسکمیک مغز'
  ),
  title: L(
    'Globale hypoxisch-ischämische Hirnschädigung',
    'Global hypoxic-ischaemic brain injury',
    'آسیب گسترده هیپوکسیک-ایسکمیک مغز'
  ),
  subtitle: L(
    'Diffuse Hirnschädigung durch globalen Sauerstoff- oder Perfusionsausfall.',
    'Diffuse brain injury caused by global failure of oxygen delivery or perfusion.',
    'آسیب منتشر مغز در اثر کاهش شدید اکسیژن‌رسانی یا پرفیوژن کلی مغز.'
  ),
  sourceLabel: 'Dr. Zia',
  actionMcq: 'MCQ',
  actionFlash: L('Flashcards', 'Flashcards', 'فلش‌کارت'),
  keyLabel: L('Merke', 'Key point', 'نکته مهم'),
  caveLabel: L('CAVE', 'Caution', 'احتیاط'),
  openCase: L('Fall in Radiopaedia öffnen', 'Open case in Radiopaedia', 'باز کردن کیس در Radiopaedia'),
  sections: [
    { id: 'grundlagen', label: L('Grundlagen', 'Basics', 'مبانی'), icon: '🧠' },
    { id: 'vulnerabilitaet', label: L('Selektive Vulnerabilität', 'Selective vulnerability', 'آسیب‌پذیری انتخابی'), icon: '🎯' },
    { id: 'muster', label: L('Verteilungsmuster', 'Distribution patterns', 'الگوهای درگیری'), icon: '🗺️' },
    { id: 'ct', label: L('CT', 'CT', 'CT'), icon: '🩻' },
    { id: 'mrt', label: L('MRT', 'MRI', 'MRI'), icon: '🧲' },
    { id: 'zeitverlauf', label: L('Zeitlicher Verlauf', 'Temporal evolution', 'سیر زمانی'), icon: '⏱️' },
    { id: 'sonderformen', label: L('Sonderformen & DD', 'Specific patterns & DD', 'الگوهای خاص و افتراق'), icon: '🔎' },
    { id: 'prognose', label: L('Prognose & Befundung', 'Prognosis & reporting', 'پیش‌آگهی و گزارش'), icon: '📋' },
    { id: 'faelle', label: L('Lernfälle', 'Cases', 'کیس‌های آموزشی'), icon: '🔬' },
    { id: 'takehome', label: L('Take home message', 'Take home message', 'Take home message'), icon: '💡' },
  ],
  heroCards: [
    {
      value: 'DWI',
      label: L('frühestes MRT-Zeichen', 'earliest MRI sign', 'زودرس‌ترین علامت MRI'),
      text: L('Restriktion kann der FLAIR-Veränderung vorausgehen', 'restriction may precede FLAIR abnormality', 'محدودیت انتشار می‌تواند پیش از تغییرات FLAIR ظاهر شود'),
    },
    {
      value: 'bilateral',
      label: L('typisch symmetrisch', 'typically symmetric', 'معمولاً متقارن'),
      text: L('Kortex und tiefe graue Kerne gezielt prüfen', 'inspect cortex and deep grey nuclei', 'کورتکس و هسته‌های خاکستری عمقی را دقیق بررسی کنید'),
    },
    {
      value: '> 48 h',
      label: L('Prognose nur multimodal', 'multimodal prognosis only', 'پیش‌آگهی فقط چندوجهی'),
      text: L('Bildgebung nie isoliert zur Therapiebegrenzung nutzen', 'never use imaging alone to limit treatment', 'تصویربرداری به‌تنهایی مبنای محدودکردن درمان نیست'),
    },
  ],
  basics: {
    title: L('Definition, Ursachen und Klinik', 'Definition, causes and presentation', 'تعریف، علل و تظاهرات'),
    lead: L(
      'Die globale hypoxisch-ischämische Hirnschädigung entsteht, wenn Sauerstoffangebot und/oder zerebrale Perfusion diffus unter den metabolischen Bedarf des Gehirns fallen.',
      'Global hypoxic-ischaemic brain injury occurs when oxygen delivery and/or cerebral perfusion diffusely fall below the metabolic needs of the brain.',
      'آسیب هیپوکسیک-ایسکمیک زمانی رخ می‌دهد که اکسیژن‌رسانی یا خون‌رسانی مغز به‌طور گسترده از نیاز متابولیک بافت کمتر شود.'
    ),
    items: [
      { title: L('Kreislaufstillstand', 'Cardiac arrest', 'ایست قلبی'), text: L('Häufigster Kontext beim Erwachsenen; Schweregrad hängt unter anderem von No-flow-/Low-flow-Zeit und Reperfusion ab.', 'The most common adult setting; severity depends partly on no-flow/low-flow duration and reperfusion.', 'شایع‌ترین زمینه در بزرگسالان؛ شدت آسیب به مدت قطع یا کاهش جریان و زمان بازگشت پرفیوژن وابسته است.') },
      { title: L('Respiratorische Hypoxie', 'Respiratory hypoxia', 'هیپوکسی تنفسی'), text: L('Ertrinken, Strangulation, schwere Hypoxämie oder Atemdepression können ein ähnliches Muster erzeugen.', 'Drowning, strangulation, severe hypoxaemia or respiratory depression may produce a similar pattern.', 'غرق‌شدگی، خفگی، هیپوکسمی شدید یا دپرسیون تنفسی می‌توانند الگوی مشابهی ایجاد کنند.') },
      { title: L('Systemische Hypoperfusion', 'Systemic hypoperfusion', 'هیپوپرفیوژن سیستمیک'), text: L('Schock oder prolongierte schwere Hypotonie begünstigen vor allem Wasserscheidenläsionen.', 'Shock or prolonged severe hypotension particularly favours watershed injury.', 'شوک یا افت فشار شدید و طولانی به‌ویژه باعث آسیب نواحی مرزی خون‌رسانی می‌شود.') },
      { title: L('Toxische Hypoxie', 'Toxic hypoxia', 'هیپوکسی سمی'), text: L('CO, Zyanid und andere Toxine verursachen charakteristische, aber nicht vollständig spezifische Muster.', 'Carbon monoxide, cyanide and other toxins cause characteristic but not entirely specific patterns.', 'مونوکسیدکربن، سیانید و برخی سموم الگوهای مشخص ولی نه کاملاً اختصاصی ایجاد می‌کنند.') },
    ],
    clinical: [
      [L('Akut', 'Acute', 'حاد'), L('Bewusstseinsstörung bis Koma, Myoklonien, Krampfanfälle', 'Impaired consciousness to coma, myoclonus and seizures', 'اختلال هوشیاری تا کما، میوکلونوس و تشنج')],
      [L('Nach Erwachen', 'After awakening', 'پس از بیداری'), L('Gedächtnis-, Exekutiv- und motorische Defizite; kortikale Blindheit möglich', 'Memory, executive and motor deficits; cortical blindness may occur', 'اختلال حافظه، عملکرد اجرایی و حرکت؛ گاهی کوری کورتیکال')],
      [L('Verzögert', 'Delayed', 'تأخیری'), L('Biphasische Verschlechterung durch posthypoxische Leukoenzephalopathie', 'Biphasic deterioration from delayed post-hypoxic leukoencephalopathy', 'بدترشدن دو مرحله‌ای در لکوانسفالوپاتی تأخیری پس از هیپوکسی')],
    ],
    key: L(
      'Der klinische Kontext ist entscheidend: Ein symmetrisches DWI-Muster nach Reanimation ist anders zu gewichten als ein ähnliches Muster ohne dokumentierte Hypoxie.',
      'Clinical context is essential: a symmetric DWI pattern after resuscitation carries different meaning from the same pattern without documented hypoxia.',
      'زمینه بالینی تعیین‌کننده است؛ الگوی متقارن DWI پس از احیا معنای متفاوتی با همان الگو بدون سابقه هیپوکسی دارد.'
    ),
  },
  vulnerability: {
    title: L('Selektive Vulnerabilität', 'Selective vulnerability', 'آسیب‌پذیری انتخابی'),
    lead: L(
      'Neuronen mit hohem Energiebedarf und Regionen an den Grenzen arterieller Versorgungsgebiete reagieren besonders empfindlich auf Hypoxie und Hypoperfusion.',
      'Neurons with high energy demand and regions at arterial border zones are particularly sensitive to hypoxia and hypoperfusion.',
      'نورون‌های پرمصرف و نواحی مرزی بین قلمروهای شریانی نسبت به هیپوکسی و کاهش پرفیوژن حساس‌ترند.'
    ),
    headers: [L('Struktur', 'Structure', 'ساختار'), L('Typisches Muster', 'Typical pattern', 'الگوی تیپیک'), L('Klinische Bedeutung', 'Clinical relevance', 'اهمیت بالینی')],
    rows: [
      [L('Kortex', 'Cortex', 'کورتکس'), L('perirolandisch, okzipital und diffus gyriform', 'perirolandic, occipital and diffuse gyriform', 'پری‌رولاندیک، اکسیپیتال یا منتشر ژیری‌فرم'), L('schwere globale Schädigung oder kortikale Defizite', 'severe global injury or cortical deficits', 'آسیب شدید منتشر یا نقص‌های کورتیکال')],
      [L('Hippocampus', 'Hippocampus', 'هیپوکامپ'), L('besonders CA1-/Sommer-Sektor', 'especially the CA1/Sommer sector', 'به‌ویژه ناحیه CA1 یا Sommer'), L('Gedächtnisstörung', 'memory impairment', 'اختلال حافظه')],
      [L('Basalganglien', 'Basal ganglia', 'گانگلیون‌های قاعده‌ای'), L('Putamen und Nucleus caudatus, bei Toxinen auch Pallidum', 'putamen and caudate; pallidum in selected toxins', 'پوتامن و کودیت؛ در برخی سموم پالیدوم'), L('Hinweis auf schwere/profunde Hypoxie oder toxisches Muster', 'suggests severe/profound hypoxia or a toxic pattern', 'به نفع هیپوکسی عمیق یا الگوی سمی')],
      [L('Thalamus', 'Thalamus', 'تالاموس'), L('bilateral symmetrisch', 'bilateral and symmetric', 'دوطرفه و متقارن'), L('häufig zusammen mit tiefen grauen Kernen', 'often involved with other deep grey nuclei', 'اغلب همراه سایر هسته‌های خاکستری عمقی')],
      [L('Kleinhirn', 'Cerebellum', 'مخچه'), L('Purkinje-Zellen und Kleinhirnrinde', 'Purkinje cells and cerebellar cortex', 'سلول‌های پورکینژ و کورتکس مخچه'), L('DWI-Veränderungen können früh auftreten', 'DWI abnormality may occur early', 'تغییرات DWI ممکن است زودرس باشند')],
      [L('Wasserscheiden', 'Watershed zones', 'نواحی مرزی'), L('ACA/MCA und MCA/PCA, kortikal oder tief', 'ACA/MCA and MCA/PCA, cortical or internal', 'ACA/MCA و MCA/PCA، کورتیکال یا عمقی'), L('typisch bei inkompletter Ischämie und Hypotonie', 'typical of incomplete ischaemia and hypotension', 'تیپیک در ایسکمی ناکامل و افت فشار')],
    ],
    key: L(
      'Schwere, kurze Anoxie betrifft bevorzugt Kortex und tiefe graue Kerne; längere inkomplette Hypoperfusion kann Wasserscheidenzonen dominieren.',
      'Severe brief anoxia favours cortex and deep grey nuclei; prolonged incomplete hypoperfusion may predominantly affect watershed zones.',
      'آنکسی شدید و کوتاه بیشتر کورتکس و هسته‌های عمقی را درگیر می‌کند؛ هیپوپرفیوژن ناکامل و طولانی می‌تواند عمدتاً نواحی مرزی را گرفتار کند.'
    ),
  },
  patterns: {
    title: L('Radiologische Verteilungsmuster', 'Radiological distribution patterns', 'الگوهای توزیع در تصویربرداری'),
    lead: L(
      'Das Muster hängt von Schweregrad, Dauer, Ursache, Alter und Zeitpunkt der Bildgebung ab. Überlappungen sind häufig.',
      'The pattern depends on severity, duration, cause, age and imaging timing. Overlap is common.',
      'الگوی درگیری به شدت، مدت، علت، سن و زمان تصویربرداری وابسته است و هم‌پوشانی الگوها شایع است.'
    ),
    items: [
      { title: L('Profundes Muster', 'Profound pattern', 'الگوی عمیق'), text: L('Diffuse kortikale und tiefe graue Restriktion mit Verlust der Grau-Weiß-Differenzierung.', 'Diffuse cortical and deep-grey restriction with loss of grey-white differentiation.', 'محدودیت انتشار منتشر در کورتکس و هسته‌های عمقی همراه کاهش تمایز ماده خاکستری و سفید.') },
      { title: L('Wasserscheidenmuster', 'Watershed pattern', 'الگوی مرزی'), text: L('Parasagittale oder kortikale Grenzzonenläsionen nach Hypotonie oder inkompletter Ischämie.', 'Parasagittal or cortical border-zone injury after hypotension or incomplete ischaemia.', 'آسیب پاراساژیتال یا نواحی مرزی کورتکس پس از افت فشار یا ایسکمی ناکامل.') },
      { title: L('Zentrales Muster', 'Central pattern', 'الگوی مرکزی'), text: L('Basalganglien, Thalami und gegebenenfalls perirolandischer Kortex dominieren.', 'Basal ganglia, thalami and sometimes perirolandic cortex predominate.', 'گانگلیون‌های قاعده‌ای، تالاموس‌ها و گاهی کورتکس پری‌رولاندیک غالب‌اند.') },
      { title: L('Verzögertes Marklagermuster', 'Delayed white-matter pattern', 'الگوی تأخیری ماده سفید'), text: L('Nach scheinbarer Erholung folgt nach Tagen bis Wochen eine symmetrische Leukoenzephalopathie.', 'After apparent recovery, symmetric leukoencephalopathy develops days to weeks later.', 'پس از بهبود ظاهری، طی چند روز تا چند هفته لکوانسفالوپاتی متقارن ایجاد می‌شود.') },
    ],
    cave: L(
      'Ein einseitiges arterielles Territorium, eine asymmetrische Läsion oder dominanter Hirnstammbefall sollte alternative Diagnosen auslösen.',
      'A unilateral arterial territory, marked asymmetry or dominant brainstem involvement should prompt alternative diagnoses.',
      'درگیری یک‌طرفه در قلمرو یک شریان، عدم تقارن واضح یا غلبه درگیری ساقه مغز باید تشخیص‌های دیگری را مطرح کند.'
    ),
  },
  ct: {
    title: L('CT: schnell, aber früh begrenzt sensitiv', 'CT: rapid but less sensitive early', 'CT: سریع ولی با حساسیت محدود در مراحل اولیه'),
    lead: L(
      'Die native CT dient im Akutsetting vor allem zum Ausschluss von Blutung und zur Erfassung von diffusem Ödem, Masseneffekt und Herniation.',
      'Acute non-contrast CT primarily excludes haemorrhage and detects diffuse oedema, mass effect and herniation.',
      'CT بدون کنتراست در فاز حاد بیشتر برای رد خونریزی و تشخیص ادم منتشر، اثر فشاری و هرنیاسیون کاربرد دارد.'
    ),
    headers: [L('Zeichen', 'Sign', 'علامت'), L('Beschreibung', 'Description', 'توضیح'), L('Einordnung', 'Interpretation', 'تفسیر')],
    rows: [
      [L('Verlust der Grau-Weiß-Grenze', 'Loss of grey-white differentiation', 'کاهش تمایز خاکستری-سفید'), L('Kortex und tiefe Kerne werden relativ hypodens', 'cortex and deep nuclei become relatively hypoattenuating', 'کورتکس و هسته‌های عمقی نسبتاً هیپودنس می‌شوند'), L('frühes bis fortgeschrittenes zytotoxisches Ödem', 'early to advanced cytotoxic oedema', 'ادم سیتوتوکسیک زودرس تا پیشرفته')],
      [L('Diffuse Schwellung', 'Diffuse swelling', 'تورم منتشر'), L('sulkale Verstreichung, enge Ventrikel und basale Zisternen', 'sulcal effacement, small ventricles and compressed basal cisterns', 'محو شدن شیارها، کوچک‌شدن بطن‌ها و فشردگی سیسترن‌های قاعده‌ای'), L('Druckzeichen und Herniationsrisiko', 'raised pressure and herniation risk', 'نشانه افزایش فشار و خطر هرنیاسیون')],
      [L('White-cerebellum-/Reversal-Zeichen', 'White cerebellum/reversal sign', 'علامت مخچه سفید یا Reversal'), L('Kleinhirn, Hirnstamm und tiefe Kerne erscheinen relativ hyperdens zum ödematösen Großhirn', 'cerebellum, brainstem and deep nuclei appear relatively hyperattenuating to oedematous cerebrum', 'مخچه، ساقه و هسته‌های عمقی نسبت به نیمکره‌های ادماتو روشن‌تر دیده می‌شوند'), L('schwere diffuse Schädigung; ungünstiges Zeichen', 'severe diffuse injury; adverse sign', 'آسیب منتشر شدید و علامت نامطلوب')],
      [L('Pseudo-SAB', 'Pseudo-SAH', 'شبه SAH'), L('dichte basale Zisternen/Sulci durch Ödem, venöse Stauung und eingeengte Liquorräume', 'dense cisterns/sulci from oedema, venous engorgement and narrowed CSF spaces', 'سیسترن‌ها و شیارهای متراکم به علت ادم، احتقان وریدی و تنگی فضاهای CSF'), L('nicht mit echter Subarachnoidalblutung verwechseln', 'do not mistake for true subarachnoid haemorrhage', 'نباید با خونریزی واقعی ساب‌آراکنوئید اشتباه شود')],
    ],
    cave: L(
      'Eine frühe unauffällige CT schließt HIE nicht aus. Bei persistierendem Koma und passendem Ereignis ist die MRT mit DWI deutlich sensitiver.',
      'A normal early CT does not exclude HIBI. In persistent coma after an appropriate insult, MRI with DWI is substantially more sensitive.',
      'CT طبیعی در ساعات اولیه HIE را رد نمی‌کند. در کمای پایدار پس از یک رویداد سازگار، MRI همراه DWI حساس‌تر است.'
    ),
  },
  mri: {
    title: L('MRT: DWI ist der Schlüssel', 'MRI: DWI is the key sequence', 'MRI: سکانس کلیدی DWI است'),
    lead: L(
      'Die MRT zeigt zytotoxisches Ödem häufig früher als CT und konventionelle T2/FLAIR-Sequenzen. DWI muss immer zusammen mit ADC interpretiert werden.',
      'MRI often depicts cytotoxic oedema before CT and conventional T2/FLAIR. DWI must always be interpreted with ADC.',
      'MRI اغلب ادم سیتوتوکسیک را زودتر از CT و T2/FLAIR نشان می‌دهد. DWI باید همیشه همراه ADC تفسیر شود.'
    ),
    headers: [L('Sequenz', 'Sequence', 'سکانس'), L('Typischer Befund', 'Typical finding', 'یافته تیپیک'), L('Praktischer Nutzen', 'Practical use', 'کاربرد عملی')],
    rows: [
      ['DWI/ADC', L('gyriforme oder symmetrische DWI-Hyperintensität mit erniedrigtem ADC', 'gyriform or symmetric high DWI signal with low ADC', 'هایپراینتنسیتی ژیری‌فرم یا متقارن در DWI با ADC پایین'), L('frühester und sensitivster Nachweis des zytotoxischen Ödems', 'earliest and most sensitive sign of cytotoxic oedema', 'زودرس‌ترین و حساس‌ترین علامت ادم سیتوتوکسیک')],
      ['T2/FLAIR', L('anfangs diskret, später kortikale und tiefe graue Hyperintensität mit Schwellung', 'subtle initially, later cortical/deep-grey hyperintensity and swelling', 'ابتدا خفیف، سپس افزایش سیگنال کورتکس و هسته‌های عمقی همراه تورم'), L('Ausdehnung, Ödem und Marklagerbeteiligung', 'extent, oedema and white-matter involvement', 'وسعت آسیب، ادم و درگیری ماده سفید')],
      ['T1', L('subakut gyriforme kortikale Hyperintensität bei laminärer Nekrose', 'subacute gyriform cortical hyperintensity in laminar necrosis', 'هایپراینتنسیتی ژیری‌فرم کورتکس در نکروز لامینار زیرحاد'), L('zeitliche Einordnung; nicht automatisch Blut', 'temporal staging; not automatically haemorrhage', 'کمک به تعیین مرحله؛ الزاماً خونریزی نیست')],
      ['SWI/T2*', L('Mikroblutungen oder hämorrhagische Begleitkomponente', 'microhaemorrhage or haemorrhagic component', 'میکروخونریزی یا جزء هموراژیک'), L('Blut von nicht hämorrhagischer T1-Hyperintensität abgrenzen', 'distinguish blood from non-haemorrhagic T1 hyperintensity', 'افتراق خون از T1 هایپراینتنس غیرهموراژیک')],
      ['T1 C+', L('subakut mögliches gyriformes kortikales Enhancement', 'possible subacute gyriform cortical enhancement', 'احتمال enhancement ژیری‌فرم کورتکس در فاز زیرحاد'), L('Blut-Hirn-Schrankenstörung; kann Wochen persistieren', 'blood-brain barrier disruption; may persist for weeks', 'اختلال سد خونی-مغزی؛ ممکن است چند هفته باقی بماند')],
    ],
    key: L(
      'DWI hell ohne ADC-Abfall ist keine sichere Restriktion. T2-shine-through und Artefakte müssen ausgeschlossen werden.',
      'High DWI signal without low ADC is not definite restriction. Exclude T2 shine-through and artefact.',
      'سیگنال بالای DWI بدون کاهش ADC محدودیت واقعی را ثابت نمی‌کند؛ T2 shine-through و آرتیفکت باید رد شوند.'
    ),
  },
  timeline: {
    title: L('Zeitlicher Verlauf', 'Temporal evolution', 'سیر زمانی'),
    lead: L(
      'Das Erscheinungsbild verändert sich dynamisch. Zeitpunkt und Sequenz bestimmen, welche Komponente sichtbar ist.',
      'Imaging appearances evolve dynamically. Timing and sequence determine which component is visible.',
      'ظاهر تصویربرداری پویاست و زمان انجام و نوع سکانس تعیین می‌کند کدام بخش آسیب دیده شود.'
    ),
    items: [
      { title: L('Hyperakut: 0–24 h', 'Hyperacute: 0–24 h', 'فوق‌حاد: ۰ تا ۲۴ ساعت'), text: L('CT kann unauffällig sein; DWI zeigt oft bereits kortikale, tiefe graue oder zerebelläre Restriktion.', 'CT may be normal; DWI may already show cortical, deep-grey or cerebellar restriction.', 'CT ممکن است طبیعی باشد، ولی DWI می‌تواند محدودیت انتشار در کورتکس، هسته‌های عمقی یا مخچه را نشان دهد.') },
      { title: L('Akut: 1–7 Tage', 'Acute: 1–7 days', 'حاد: ۱ تا ۷ روز'), text: L('Diffusionsrestriktion und Schwellung werden deutlich; T2/FLAIR-Veränderungen nehmen zu.', 'Restriction and swelling become conspicuous; T2/FLAIR abnormality increases.', 'محدودیت انتشار و تورم واضح‌تر و تغییرات T2/FLAIR بیشتر می‌شوند.') },
      { title: L('Subakut: 1–3 Wochen', 'Subacute: 1–3 weeks', 'زیرحاد: ۱ تا ۳ هفته'), text: L('ADC pseudonormalisiert; laminäre kortikale Nekrose und gyriformes Enhancement können erscheinen.', 'ADC pseudonormalises; cortical laminar necrosis and gyriform enhancement may appear.', 'ADC ممکن است شبه‌طبیعی شود و نکروز لامینار کورتکس یا enhancement ژیری‌فرم ظاهر شود.') },
      { title: L('Chronisch', 'Chronic', 'مزمن'), text: L('Kortikale oder tiefe Atrophie, Enzephalomalazie und Ex-vacuo-Erweiterung.', 'Cortical or deep atrophy, encephalomalacia and ex-vacuo dilatation.', 'آتروفی کورتکس یا هسته‌های عمقی، انسفالومالاسی و اتساع ex vacuo.') },
    ],
    laminar: L(
      'Laminäre kortikale Nekrose: gyriformes T1-hyperintenses Band, typischerweise maximal nach etwa 2–4 Wochen. Die T1-Hyperintensität beruht nicht zwingend auf Blut.',
      'Cortical laminar necrosis: a gyriform T1-hyperintense band, often most conspicuous at about 2–4 weeks. The T1 hyperintensity is not necessarily blood.',
      'نکروز لامینار کورتکس به‌صورت نوار ژیری‌فرم هایپراینتنس در T1 دیده می‌شود و معمولاً حدود هفته دوم تا چهارم واضح‌تر است. این سیگنال بالا الزاماً ناشی از خون نیست.'
    ),
  },
  special: {
    title: L('Sondermuster und wichtige Differenzialdiagnosen', 'Specific patterns and key differentials', 'الگوهای خاص و تشخیص‌های افتراقی مهم'),
    lead: L(
      'Ähnliche symmetrische Muster können metabolisch, toxisch, infektiös oder epileptisch bedingt sein. Die Verteilung und der klinische Kontext entscheiden.',
      'Similar symmetric patterns may be metabolic, toxic, infectious or seizure-related. Distribution and clinical context are decisive.',
      'الگوهای متقارن مشابه می‌توانند متابولیک، سمی، عفونی یا پس از تشنج باشند؛ توزیع ضایعات و زمینه بالینی تعیین‌کننده است.'
    ),
    headers: [L('Kontext', 'Context', 'زمینه'), L('Typisches Muster', 'Typical pattern', 'الگوی تیپیک'), L('Hinweis zur Abgrenzung', 'Distinguishing clue', 'نکته افتراقی')],
    rows: [
      [L('CO-Intoxikation', 'Carbon monoxide poisoning', 'مسمومیت CO'), L('bilaterale Globus-pallidus-Läsionen; mögliches diffuses Marklagerödem', 'bilateral globus pallidus injury; possible diffuse white-matter injury', 'درگیری دوطرفه گلوبوس پالیدوس و گاهی ماده سفید منتشر'), L('verzögerte Leukoenzephalopathie nach scheinbarer Erholung möglich', 'delayed leukoencephalopathy may follow apparent recovery', 'پس از بهبود ظاهری ممکن است لکوانسفالوپاتی تأخیری رخ دهد')],
      [L('Hypoglykämie', 'Hypoglycaemia', 'هیپوگلیسمی'), L('Kortex, Hippocampi, Capsula interna oder Splenium; Pallidum oft ausgespart', 'cortex, hippocampi, internal capsules or splenium; pallidum often spared', 'کورتکس، هیپوکامپ، کپسول داخلی یا اسپلنیوم؛ پالیدوم اغلب سالم'), L('Blutzucker und rasche Reversibilität beachten', 'check glucose and potential rapid reversibility', 'قند خون و امکان برگشت سریع را در نظر بگیرید')],
      [L('Status epilepticus', 'Status epilepticus', 'استاتوس اپی‌لپتیکوس'), L('kortikale/hippocampale Restriktion, häufig asymmetrisch und nicht vaskulär', 'cortical/hippocampal restriction, often asymmetric and non-territorial', 'محدودیت کورتکس یا هیپوکامپ، اغلب نامتقارن و غیرقلمرویی'), L('EEG, Hyperperfusion und Verlauf helfen', 'EEG, hyperperfusion and interval evolution help', 'EEG، هایپرپرفیوژن و پیگیری کمک‌کننده‌اند')],
      [L('Enzephalitis', 'Encephalitis', 'انسفالیت'), L('limbisch, kortikal oder thalamisch; oft Schwellung/Enhancement', 'limbic, cortical or thalamic; often swelling/enhancement', 'لیمبیک، کورتیکال یا تالامیک همراه تورم یا enhancement'), L('Fieber, Liquorbefund und asymmetrisches Muster', 'fever, CSF analysis and asymmetric pattern', 'تب، بررسی CSF و الگوی نامتقارن')],
      [L('Arterielle Infarkte', 'Arterial infarcts', 'انفارکت شریانی'), L('Gefäßterritorium statt global-symmetrischer Verteilung', 'vascular territory rather than global symmetric distribution', 'توزیع قلمرویی به‌جای الگوی منتشر متقارن'), L('CTA/MRA und territorialer Kalibersprung', 'CTA/MRA and territorial vascular findings', 'CTA/MRA و یافته عروقی قلمرویی')],
    ],
    cave: L(
      'Bilaterale Pallidumläsionen sind klassisch für CO, aber nicht beweisend. Auch Hypoxie, andere Toxine und metabolische Erkrankungen können die Basalganglien betreffen.',
      'Bilateral pallidal lesions are classic for carbon monoxide but not diagnostic. Hypoxia, other toxins and metabolic disorders may also affect the basal ganglia.',
      'درگیری دوطرفه پالیدوم برای مسمومیت CO کلاسیک است، اما تشخیص را قطعی نمی‌کند؛ هیپوکسی، سموم دیگر و بیماری‌های متابولیک نیز می‌توانند گانگلیون‌های قاعده‌ای را درگیر کنند.'
    ),
  },
  prognosis: {
    title: L('Prognose und strukturierter Befund', 'Prognosis and structured reporting', 'پیش‌آگهی و گزارش ساختاریافته'),
    lead: L(
      'Ausgedehnte bilaterale kortikale und tiefe graue Diffusionsrestriktion ist prognostisch ungünstig, darf aber niemals isoliert und zu früh zur Therapiebegrenzung verwendet werden.',
      'Extensive bilateral cortical and deep-grey diffusion restriction is an adverse prognostic sign, but must never be used alone or prematurely to limit treatment.',
      'محدودیت انتشار گسترده و دوطرفه در کورتکس و هسته‌های عمقی علامت نامطلوبی است، اما هرگز نباید به‌تنهایی یا زودهنگام مبنای محدودکردن درمان قرار گیرد.'
    ),
    reportItems: [
      { title: L('1. Kontext und Zeitpunkt', '1. Context and timing', '۱. زمینه و زمان'), text: L('Art des hypoxischen Ereignisses, ROSC und Zeitpunkt der Bildgebung nennen.', 'State the insult, ROSC and imaging time point.', 'نوع رویداد هیپوکسیک، زمان بازگشت گردش خون و زمان تصویربرداری ذکر شود.') },
      { title: L('2. Verteilung', '2. Distribution', '۲. توزیع'), text: L('Kortex, Hippocampi, Basalganglien, Thalami, Kleinhirn, Hirnstamm und Marklager systematisch beschreiben.', 'Systematically describe cortex, hippocampi, basal ganglia, thalami, cerebellum, brainstem and white matter.', 'کورتکس، هیپوکامپ، گانگلیون‌های قاعده‌ای، تالاموس، مخچه، ساقه و ماده سفید به‌طور منظم گزارش شوند.') },
      { title: L('3. Sequenzbefund', '3. Sequence findings', '۳. یافته سکانس‌ها'), text: L('DWI und ADC gemeinsam, zusätzlich FLAIR, SWI und gegebenenfalls Enhancement beurteilen.', 'Interpret DWI with ADC and assess FLAIR, SWI and enhancement when available.', 'DWI همراه ADC و نیز FLAIR، SWI و در صورت وجود enhancement ارزیابی شوند.') },
      { title: L('4. Schwellung', '4. Swelling', '۴. تورم'), text: L('Sulci, Ventrikel, Zisternen, Mittellinie und Herniationszeichen prüfen.', 'Assess sulci, ventricles, cisterns, midline and herniation.', 'شیارها، بطن‌ها، سیسترن‌ها، خط وسط و نشانه‌های هرنیاسیون بررسی شوند.') },
      { title: L('5. Differenzialdiagnose', '5. Differential', '۵. تشخیص افتراقی'), text: L('Bei atypischer Verteilung toxische, metabolische, epileptische und infektiöse Ursachen diskutieren.', 'Discuss toxic, metabolic, seizure-related and infectious causes when distribution is atypical.', 'در توزیع آتیپیک، علل سمی، متابولیک، تشنجی و عفونی مطرح شوند.') },
      { title: L('6. Vorsichtige Einordnung', '6. Cautious conclusion', '۶. جمع‌بندی محتاطانه'), text: L('Ausdehnung und Schwere beschreiben, aber keine definitive Einzelmodalitätsprognose formulieren.', 'Describe extent and severity without making a definitive single-modality prognosis.', 'وسعت و شدت آسیب بیان شود، اما پیش‌آگهی قطعی فقط بر اساس تصویربرداری داده نشود.') },
    ],
    guideline: L(
      'Nach Kreislaufstillstand soll die neurologische Prognose multimodal, ohne Sedierungs-/Temperaturkonfounder und im Regelfall frühestens 72 Stunden nach ROSC beziehungsweise Wiedererwärmung erfolgen. CT oder MRT nach mehr als 48 Stunden gelten nur als moderat verlässliche Bausteine.',
      'After cardiac arrest, neuroprognostication should be multimodal, free of sedation/temperature confounders and generally delayed until at least 72 hours after ROSC or rewarming. CT or MRI after more than 48 hours are only moderately reliable components.',
      'پس از ایست قلبی، پیش‌آگهی نورولوژیک باید چندوجهی، بدون اثر مخدوش‌کننده داروهای آرام‌بخش یا دما و معمولاً حداقل ۷۲ ساعت پس از بازگشت گردش خون یا گرم‌کردن مجدد انجام شود. CT یا MRI پس از بیش از ۴۸ ساعت فقط یکی از اجزای با قابلیت اطمینان متوسط هستند.'
    ),
  },
  cases: {
    title: L('Zwei Radiopaedia-Lernfälle', 'Two Radiopaedia learning cases', 'دو کیس آموزشی Radiopaedia'),
    lead: L(
      'Die Bildserien lassen sich horizontal durchscrollen. Jede Schicht ist anklickbar; angezeigt werden ausschließlich die relevanten Befunde.',
      'Scroll horizontally through each image series. Every image opens in a large view; only the relevant findings are shown.',
      'سری تصاویر به‌صورت افقی قابل مرور است. هر تصویر با کلیک در نمای بزرگ باز می‌شود و فقط یافته‌های مرتبط نمایش داده می‌شوند.'
    ),
  },
  takehome: {
    title: 'Take home message',
    lead: L('Kurz und merkbar.', 'Short and memorable.', 'کوتاه و به‌یادماندنی.'),
    items: [
      { title: 'DWI + ADC', text: L('früheste und sensitivste Kombination.', 'the earliest and most sensitive combination.', 'زودرس‌ترین و حساس‌ترین ترکیب است.') },
      { title: L('Muster lesen', 'Read the pattern', 'الگو را بخوانید'), text: L('symmetrischer Kortex + tiefe Kerne spricht für schwere globale Hypoxie.', 'symmetric cortex plus deep nuclei suggests severe global hypoxia.', 'درگیری متقارن کورتکس و هسته‌های عمقی به نفع هیپوکسی شدید و منتشر است.') },
      { title: L('CT kann früh normal sein', 'Early CT may be normal', 'CT اولیه ممکن است طبیعی باشد'), text: L('bei klinischem Verdacht MRT nicht verzögern.', 'do not delay MRI when suspicion persists.', 'در صورت شک بالینی، MRI را به تأخیر نیندازید.') },
      { title: L('Prognose bleibt multimodal', 'Prognosis remains multimodal', 'پیش‌آگهی چندوجهی است'), text: L('Bildgebung nie allein zur Therapiebegrenzung.', 'never use imaging alone to limit treatment.', 'تصویربرداری هرگز به‌تنهایی مبنای محدودکردن درمان نیست.') },
    ],
  },
}

export const HIE_LEARNING_CASES = [
  {
    id: 'global-ct',
    url: 'https://radiopaedia.org/cases/global-hypoxic-ischaemic-brain-injury-1?lang=us',
    images: [
      '/hie/case-global-01.jpg',
      '/hie/case-global-02.jpg',
      '/hie/case-global-03.jpg',
      '/hie/case-global-04.jpg',
    ],
    label: L('Fall 1 · CT', 'Case 1 · CT', 'کیس ۱ · CT'),
    title: L('Globale hypoxisch-ischämische Hirnschädigung', 'Global hypoxic-ischaemic brain injury', 'آسیب گسترده هیپوکسیک-ایسکمیک مغز'),
    text: L(
      'Diffuse Hypodensität und Schwellung beider Hemisphären mit Verlust der Grau-Weiß-Differenzierung, sulkaler Verstreichung und eingeengten Ventrikeln. Das Muster entspricht einem schweren globalen hypoxischen Ödem.',
      'Diffuse bilateral hemispheric hypoattenuation and swelling with loss of grey-white differentiation, sulcal effacement and compressed ventricles, consistent with severe global hypoxic oedema.',
      'هیپودنسیتی و تورم منتشر دو نیمکره همراه کاهش تمایز ماده خاکستری-سفید، محو شدن شیارها و فشردگی بطن‌ها؛ سازگار با ادم شدید هیپوکسیک منتشر.'
    ),
    alt: L('Axiale CT bei globaler hypoxisch-ischämischer Hirnschädigung', 'Axial CT in global hypoxic-ischaemic brain injury', 'CT اکسیال در آسیب گسترده هیپوکسیک-ایسکمیک مغز'),
    credit: 'Case courtesy of David Cuete, Radiopaedia.org, rID 27704, CC BY-NC-SA 3.0',
  },
  {
    id: 'anoxic-mri',
    url: 'https://radiopaedia.org/cases/anoxic-brain-injury-1?lang=us',
    images: [
      '/hie/case-anoxic-01-dwi.jpg',
      '/hie/case-anoxic-02-flair.jpg',
      '/hie/case-anoxic-03-t1c.jpg',
      '/hie/case-anoxic-04.jpg',
    ],
    label: L('Fall 2 · MRT', 'Case 2 · MRI', 'کیس ۲ · MRI'),
    title: L('Anoxische Hirnschädigung mit kortikalem Muster', 'Anoxic brain injury with cortical pattern', 'آسیب آنوکسیک با الگوی کورتیکال'),
    text: L(
      'Ausgedehnte gyriforme Diffusionsrestriktion und FLAIR-Hyperintensität der Großhirnrinde. Die bilaterale, nicht territoriale Verteilung ist typisch für globale anoxische Schädigung.',
      'Extensive gyriform diffusion restriction and FLAIR hyperintensity of the cerebral cortex. The bilateral non-territorial distribution is typical of global anoxic injury.',
      'محدودیت انتشار ژیری‌فرم گسترده و افزایش سیگنال FLAIR در کورتکس. توزیع دوطرفه و غیرقلمرویی برای آسیب آنوکسیک منتشر تیپیک است.'
    ),
    alt: L('MRT bei anoxischer Hirnschädigung', 'MRI in anoxic brain injury', 'MRI در آسیب آنوکسیک مغز'),
    credit: 'Case courtesy of The Radswiki, Radiopaedia.org, rID 11192, CC BY-NC-SA 3.0',
  },
]

const MCQ_SEEDS = [
  {
    id: 'earliest-sequence',
    question: L('Welche MRT-Kombination ist für den frühesten Nachweis einer globalen HIE am wichtigsten?', 'Which MRI combination is most important for the earliest detection of global HIBI?', 'کدام ترکیب MRI برای تشخیص زودرس آسیب گسترده هیپوکسیک-ایسکمیک مهم‌تر است؟'),
    options: [
      L('DWI zusammen mit ADC', 'DWI together with ADC', 'DWI همراه ADC'),
      L('T1 nativ allein', 'Unenhanced T1 alone', 'T1 بدون کنتراست به‌تنهایی'),
      L('SWI allein', 'SWI alone', 'SWI به‌تنهایی'),
      L('T1 nach Kontrastmittel allein', 'Post-contrast T1 alone', 'T1 پس از کنتراست به‌تنهایی'),
    ],
    correct: 'A',
    explanation: L('Zytotoxisches Ödem führt früh zu DWI-Hyperintensität und erniedrigtem ADC. FLAIR und CT können zu diesem Zeitpunkt noch unauffällig sein.', 'Cytotoxic oedema causes early high DWI signal and low ADC. FLAIR and CT may still be normal.', 'ادم سیتوتوکسیک زود باعث افزایش سیگنال DWI و کاهش ADC می‌شود، درحالی‌که FLAIR و CT ممکن است هنوز طبیعی باشند.'),
  },
  {
    id: 'profound-pattern',
    question: L('Welches Muster spricht nach Kreislaufstillstand am ehesten für eine schwere globale hypoxisch-ischämische Schädigung?', 'Which pattern after cardiac arrest most strongly suggests severe global hypoxic-ischaemic injury?', 'کدام الگو پس از ایست قلبی بیش از همه به نفع آسیب شدید هیپوکسیک-ایسکمیک منتشر است؟'),
    options: [
      L('Bilaterale symmetrische Restriktion von Kortex und tiefen grauen Kernen', 'Bilateral symmetric restriction of cortex and deep grey nuclei', 'محدودیت انتشار دوطرفه و متقارن کورتکس و هسته‌های خاکستری عمقی'),
      L('Kleiner einseitiger lakunärer Infarkt im Thalamus', 'A small unilateral thalamic lacune', 'انفارکت لاکونار کوچک و یک‌طرفه تالاموس'),
      L('Isolierte mesiale Temporallappenläsion rechts', 'An isolated right mesial temporal lesion', 'ضایعه منفرد تمپورال مزیال راست'),
      L('Einzelne periventrikuläre T2-Läsion', 'A solitary periventricular T2 lesion', 'یک ضایعه منفرد T2 اطراف بطن'),
    ],
    correct: 'A',
    explanation: L('Die symmetrische Beteiligung energieabhängiger grauer Substanz ist typisch für eine globale, nicht territoriale Schädigung.', 'Symmetric involvement of metabolically demanding grey matter is typical of a global, non-territorial insult.', 'درگیری متقارن ماده خاکستری پرمصرف از نظر متابولیک برای آسیب منتشر و غیرقلمرویی تیپیک است.'),
  },
  {
    id: 'watershed',
    question: L('Welche Verteilung passt am besten zu prolongierter schwerer Hypotonie mit inkompletter globaler Ischämie?', 'Which distribution best fits prolonged severe hypotension with incomplete global ischaemia?', 'کدام توزیع با افت فشار شدید و طولانی همراه ایسکمی ناقص منتشر بیشترین تطابق را دارد؟'),
    options: [
      L('ACA/MCA- und MCA/PCA-Wasserscheidenzonen', 'ACA/MCA and MCA/PCA watershed zones', 'نواحی مرزی ACA/MCA و MCA/PCA'),
      L('Nur Nucleus dentatus beidseits', 'Only the bilateral dentate nuclei', 'فقط هسته دندانه‌ای دوطرفه'),
      L('Ein komplettes einseitiges PCA-Territorium', 'One complete unilateral PCA territory', 'یک قلمرو کامل PCA به‌صورت یک‌طرفه'),
      L('Nur die Hypophyse', 'Only the pituitary gland', 'فقط هیپوفیز'),
    ],
    correct: 'A',
    explanation: L('Grenzzonen sind bei systemischer Minderperfusion besonders gefährdet. Profunde kurze Anoxie betrifft dagegen häufiger Kortex und tiefe Kerne diffus.', 'Border zones are especially vulnerable to systemic hypoperfusion. Profound brief anoxia more often affects cortex and deep nuclei diffusely.', 'نواحی مرزی در کاهش پرفیوژن سیستمیک بسیار آسیب‌پذیرند؛ آنوکسی عمیق و کوتاه بیشتر کورتکس و هسته‌های عمقی را منتشر درگیر می‌کند.'),
  },
  {
    id: 'pseudo-sah',
    question: L('Warum können die basalen Zisternen bei schwerem globalem Hirnödem in der CT hyperdens erscheinen, obwohl keine SAB vorliegt?', 'Why may the basal cisterns appear hyperattenuating on CT in severe global cerebral oedema without true SAH?', 'چرا در ادم شدید منتشر مغز، سیسترن‌های قاعده‌ای در CT ممکن است بدون SAH واقعی هایپردنس دیده شوند؟'),
    options: [
      L('Venöse Stauung und eingeengte Liquorräume erzeugen eine Pseudo-SAB', 'Venous engorgement and narrowed CSF spaces produce pseudo-SAH', 'احتقان وریدی و تنگی فضاهای CSF باعث شبه SAH می‌شوند'),
      L('Liquor verkalkt innerhalb weniger Minuten', 'CSF calcifies within minutes', 'CSF طی چند دقیقه کلسیفیه می‌شود'),
      L('Gadolinium tritt nach nativer CT in die Zisternen über', 'Gadolinium enters the cisterns after non-contrast CT', 'پس از CT بدون کنتراست، گادولینیوم وارد سیسترن‌ها می‌شود'),
      L('Das Kleinhirn blutet immer gleichzeitig', 'The cerebellum always bleeds simultaneously', 'مخچه همیشه همزمان خونریزی می‌کند'),
    ],
    correct: 'A',
    explanation: L('Diffuse Hypodensität des Gehirns, venöse Gefäßprominenz und komprimierte Liquorräume steigern den relativen Kontrast der Zisternen.', 'Diffuse cerebral hypoattenuation, prominent veins and compressed CSF spaces increase the relative density of the cisterns.', 'هیپودنسیتی منتشر مغز، برجسته‌شدن وریدها و فشردگی فضاهای CSF باعث افزایش دانسیته نسبی سیسترن‌ها می‌شوند.'),
  },
  {
    id: 'white-cerebellum',
    question: L('Was beschreibt das White-cerebellum- beziehungsweise Reversal-Zeichen?', 'What does the white cerebellum or reversal sign describe?', 'علامت White cerebellum یا Reversal چه چیزی را توصیف می‌کند؟'),
    options: [
      L('Relative Hyperdensität des geschonten Kleinhirns gegenüber dem diffus ödematösen Großhirn', 'Relative hyperattenuation of the relatively spared cerebellum compared with diffusely oedematous cerebrum', 'دانسیته نسبی بالاتر مخچه نسبت به نیمکره‌های به‌شدت ادماتو'),
      L('Diffuse Verkalkung der Kleinhirnrinde', 'Diffuse calcification of the cerebellar cortex', 'کلسیفیکاسیون منتشر کورتکس مخچه'),
      L('Isolierte Kleinhirnblutung', 'An isolated cerebellar haemorrhage', 'خونریزی منفرد مخچه'),
      L('Kontrastmittelanreicherung nach Angiografie', 'Contrast enhancement after angiography', 'enhancement پس از آنژیوگرافی'),
    ],
    correct: 'A',
    explanation: L('Das Zeichen beruht auf dem starken Dichteverlust des ödematösen Großhirns; Kleinhirn und tiefe Strukturen erscheinen dadurch relativ weiß.', 'The sign reflects marked density loss in the oedematous cerebrum, making the cerebellum and deep structures appear relatively white.', 'این علامت ناشی از کاهش شدید دانسیته نیمکره‌های ادماتو است و مخچه و ساختارهای عمقی در مقایسه سفیدتر دیده می‌شوند.'),
  },
  {
    id: 'laminar-necrosis',
    question: L('Eine gyriforme T1-Hyperintensität der Großhirnrinde 3 Wochen nach globaler Hypoxie entspricht am ehesten was?', 'Gyriform cortical T1 hyperintensity three weeks after global hypoxia most likely represents what?', 'هایپراینتنسیتی ژیری‌فرم کورتکس در T1 سه هفته پس از هیپوکسی منتشر بیشتر نشان‌دهنده چیست؟'),
    options: [
      L('Laminärer kortikaler Nekrose', 'Cortical laminar necrosis', 'نکروز لامینار کورتکس'),
      L('Akuter bakterieller Meningitis', 'Acute bacterial meningitis', 'مننژیت باکتریال حاد'),
      L('Frischer Subarachnoidalblutung in jedem Fall', 'Acute subarachnoid haemorrhage in every case', 'خونریزی حاد ساب‌آراکنوئید در همه موارد'),
      L('Normaler Myelinisierung', 'Normal myelination', 'میلینیزاسیون طبیعی'),
    ],
    correct: 'A',
    explanation: L('Laminäre Nekrose kann nach 2–4 Wochen als gyriformes T1-hyperintenses Band erscheinen. Die Hyperintensität beweist keine Blutung.', 'Laminar necrosis may appear after 2–4 weeks as a gyriform T1-bright band. The signal does not prove haemorrhage.', 'نکروز لامینار پس از حدود ۲ تا ۴ هفته به‌صورت نوار ژیری‌فرم T1 روشن دیده می‌شود و این سیگنال به‌تنهایی خونریزی را ثابت نمی‌کند.'),
  },
  {
    id: 'co',
    question: L('Welcher Befund ist klassisch mit einer CO-Intoxikation assoziiert?', 'Which finding is classically associated with carbon monoxide poisoning?', 'کدام یافته به‌طور کلاسیک با مسمومیت مونوکسیدکربن همراه است؟'),
    options: [
      L('Bilaterale Läsionen des Globus pallidus', 'Bilateral globus pallidus lesions', 'ضایعات دوطرفه گلوبوس پالیدوس'),
      L('Isolierte einseitige Amygdala-Läsion', 'An isolated unilateral amygdala lesion', 'ضایعه منفرد و یک‌طرفه آمیگدال'),
      L('Nur kortikale Mikroblutungen', 'Only cortical microbleeds', 'فقط میکروخونریزی‌های کورتیکال'),
      L('Ausschließlich Aquäduktstenose', 'Aqueduct stenosis only', 'فقط تنگی مجرای مغزی'),
    ],
    correct: 'A',
    explanation: L('Pallidumläsionen sind typisch, aber nicht pathognomonisch. Zusätzlich kann eine diffuse oder verzögerte Marklagerschädigung auftreten.', 'Pallidal injury is characteristic but not pathognomonic. Diffuse or delayed white-matter injury may also occur.', 'درگیری پالیدوم تیپیک ولی غیرپاتوگنومونیک است و ممکن است آسیب منتشر یا تأخیری ماده سفید نیز رخ دهد.'),
  },
  {
    id: 'hypoglycaemia',
    question: L('Welches Merkmal spricht eher für eine hypoglykämische Enzephalopathie als für CO-Intoxikation?', 'Which feature favours hypoglycaemic encephalopathy over carbon monoxide poisoning?', 'کدام ویژگی بیشتر به نفع انسفالوپاتی هیپوگلیسمیک نسبت به مسمومیت CO است؟'),
    options: [
      L('Parietookzipitale/hippocampale Restriktion bei relativ ausgespartem Pallidum', 'Parieto-occipital/hippocampal restriction with relative pallidal sparing', 'محدودیت انتشار پاریتو-اکسیپیتال یا هیپوکامپ با حفظ نسبی پالیدوم'),
      L('Isolierte bilaterale Pallidumläsionen', 'Isolated bilateral pallidal lesions', 'ضایعات منفرد دوطرفه پالیدوم'),
      L('White-cerebellum-Zeichen in jeder Untersuchung', 'White cerebellum sign in every examination', 'علامت مخچه سفید در همه بررسی‌ها'),
      L('Einseitiger M1-Verschluss', 'A unilateral M1 occlusion', 'انسداد یک‌طرفه M1'),
    ],
    correct: 'A',
    explanation: L('Hypoglykämie kann Kortex, Hippocampi, Capsula interna und Splenium betreffen; der Globus pallidus ist häufig weniger prominent beteiligt als bei CO.', 'Hypoglycaemia may affect cortex, hippocampi, internal capsules and splenium; the globus pallidus is often less prominently involved than in CO poisoning.', 'هیپوگلیسمی می‌تواند کورتکس، هیپوکامپ، کپسول داخلی و اسپلنیوم را درگیر کند و پالیدوم اغلب نسبت به CO کمتر گرفتار است.'),
  },
  {
    id: 'delayed-leuko',
    question: L('Ein Patient verschlechtert sich 3 Wochen nach CO-Exposition nach anfänglicher Erholung erneut kognitiv und motorisch. Welche Diagnose passt?', 'A patient deteriorates cognitively and motorically three weeks after carbon monoxide exposure following initial recovery. What diagnosis fits?', 'بیماری سه هفته پس از مواجهه با CO و پس از بهبود اولیه، دوباره از نظر شناختی و حرکتی بدتر می‌شود. تشخیص محتمل چیست؟'),
    options: [
      L('Verzögerte posthypoxische Leukoenzephalopathie', 'Delayed post-hypoxic leukoencephalopathy', 'لکوانسفالوپاتی تأخیری پس از هیپوکسی'),
      L('Akute epidurale Blutung', 'Acute epidural haematoma', 'هماتوم اپیدورال حاد'),
      L('Isolierte Sinusitis', 'Isolated sinusitis', 'سینوزیت منفرد'),
      L('Chronische Subarachnoidalblutung', 'Chronic subarachnoid haemorrhage', 'خونریزی مزمن ساب‌آراکنوئید'),
    ],
    correct: 'A',
    explanation: L('Typisch ist ein biphasischer Verlauf mit lucid interval und anschließender symmetrischer Marklagerveränderung.', 'A biphasic course with a lucid interval followed by symmetric white-matter abnormality is typical.', 'سیر دو مرحله‌ای با یک دوره بهبود و سپس درگیری متقارن ماده سفید تیپیک است.'),
  },
  {
    id: 'prognosis',
    question: L('Welche Aussage zur neurologischen Prognose nach Kreislaufstillstand ist korrekt?', 'Which statement about neurological prognosis after cardiac arrest is correct?', 'کدام عبارت درباره پیش‌آگهی نورولوژیک پس از ایست قلبی صحیح است؟'),
    options: [
      L('Bildgebung ist ein Baustein einer verzögerten multimodalen Beurteilung und darf nicht isoliert verwendet werden.', 'Imaging is one component of delayed multimodal assessment and must not be used in isolation.', 'تصویربرداری یکی از اجزای ارزیابی تأخیری و چندوجهی است و نباید به‌تنهایی استفاده شود.'),
      L('Eine frühe normale CT beweist eine gute Prognose.', 'A normal early CT proves a good prognosis.', 'CT طبیعی در ساعات اولیه پیش‌آگهی خوب را ثابت می‌کند.'),
      L('DWI allein rechtfertigt innerhalb der ersten Stunden immer eine Therapiebegrenzung.', 'DWI alone always justifies treatment limitation within the first hours.', 'DWI به‌تنهایی در ساعات اولیه همیشه محدودکردن درمان را توجیه می‌کند.'),
      L('Sedierung und Hypothermie beeinflussen die Prognosebeurteilung nicht.', 'Sedation and hypothermia do not affect prognostication.', 'سدیشن و هیپوترمی بر ارزیابی پیش‌آگهی اثری ندارند.'),
    ],
    correct: 'A',
    explanation: L('Leitlinien empfehlen das Abwarten, das Ausschließen von Konfoundern und eine multimodale Bewertung. CT/MRT sind wichtige, aber nicht allein entscheidende Prädiktoren.', 'Guidelines recommend waiting, excluding confounders and using multimodal assessment. CT/MRI are important but not independently decisive predictors.', 'راهنماها بر صبر، حذف عوامل مخدوش‌کننده و ارزیابی چندوجهی تأکید دارند. CT و MRI مهم‌اند اما به‌تنهایی تعیین‌کننده نیستند.'),
  },
]

export const HIE_QUESTIONS = Object.fromEntries(
  ['de', 'en', 'fa'].map(lang => [
    lang,
    MCQ_SEEDS.map((item, index) => ({
      id: `hie-${lang}-${String(index + 1).padStart(2, '0')}-${item.id}`,
      tags: ['hypoxisch-ischaemische-hirnschaedigung', 'hie', 'gehirn'],
      fach: 'gehirn',
      question: item.question[lang],
      options: item.options.map((option, optionIndex) => ({ id: ['A', 'B', 'C', 'D'][optionIndex], text: option[lang] })),
      correct: item.correct,
      explanation: item.explanation[lang],
    })),
  ])
)

const FC = (id, category, front, answer, explanation, diagram = null) => ({
  id: `hie-fc-${id}`,
  topicId: 'hypoxisch-ischaemische-hirnschaedigung',
  category,
  front,
  answer,
  explanation,
  ...(diagram ? { diagram } : {}),
})

export const HIE_FLASHCARDS = [
  FC('definition', L('Grundlagen', 'Basics', 'مبانی'), L('Was ist eine globale hypoxisch-ischämische Hirnschädigung?', 'What is global hypoxic-ischaemic brain injury?', 'آسیب گسترده هیپوکسیک-ایسکمیک مغز چیست؟'), L('Diffuse Hirnschädigung durch global unzureichende Sauerstoffversorgung oder Perfusion.', 'Diffuse brain injury from globally inadequate oxygen delivery or perfusion.', 'آسیب منتشر مغز در اثر ناکافی بودن کلی اکسیژن‌رسانی یا پرفیوژن.'), L('Sie entsteht typischerweise nach Kreislaufstillstand, schwerer Hypoxämie oder prolongierter Hypotonie und folgt keinem einzelnen arteriellen Territorium.', 'It typically follows cardiac arrest, severe hypoxaemia or prolonged hypotension and does not follow a single arterial territory.', 'معمولاً پس از ایست قلبی، هیپوکسمی شدید یا افت فشار طولانی رخ می‌دهد و محدود به قلمرو یک شریان نیست.')),
  FC('causes', L('Grundlagen', 'Basics', 'مبانی'), L('Welche typischen Auslöser hat eine globale HIE?', 'What are typical causes of global HIBI?', 'علل شایع HIE گسترده چیست؟'), L('Kreislaufstillstand, Ertrinken, Strangulation, Atemdepression, Schock und schwere Hypotonie.', 'Cardiac arrest, drowning, strangulation, respiratory depression, shock and severe hypotension.', 'ایست قلبی، غرق‌شدگی، خفگی، دپرسیون تنفسی، شوک و افت فشار شدید.'), L('Toxine wie CO oder Zyanid verursachen zusätzlich spezifische Verteilungsmuster und verzögerte Komplikationen.', 'Toxins such as carbon monoxide or cyanide may add characteristic distribution patterns and delayed complications.', 'سمومی مانند CO یا سیانید می‌توانند الگوهای خاص و عوارض تأخیری ایجاد کنند.')),
  FC('vulnerable', L('Pathophysiologie', 'Pathophysiology', 'پاتوفیزیولوژی'), L('Welche Hirnregionen sind selektiv hypoxieempfindlich?', 'Which brain regions are selectively vulnerable to hypoxia?', 'کدام نواحی مغز نسبت به هیپوکسی حساس‌ترند؟'), L('Kortex, Hippocampus, Basalganglien, Thalamus, Purkinje-Zellen und Wasserscheidenzonen.', 'Cortex, hippocampus, basal ganglia, thalamus, Purkinje cells and watershed zones.', 'کورتکس، هیپوکامپ، گانگلیون‌های قاعده‌ای، تالاموس، سلول‌های پورکینژ و نواحی مرزی.'), L('Hoher Energiebedarf und eine ungünstige Perfusionsreserve erklären die selektive Vulnerabilität.', 'High energy demand and limited perfusion reserve explain selective vulnerability.', 'نیاز انرژی بالا و ذخیره پرفیوژن محدود علت آسیب‌پذیری انتخابی است.')),
  FC('profound-vs-watershed', L('Verteilungsmuster', 'Distribution patterns', 'الگوهای درگیری'), L('Profunde Anoxie versus inkomplette Hypoperfusion: welches Muster?', 'Profound anoxia versus incomplete hypoperfusion: what pattern?', 'آنکسی عمیق در برابر هیپوپرفیوژن ناکامل: چه الگویی؟'), L('Profund: Kortex + tiefe graue Kerne. Inkomplett: Wasserscheidenzonen.', 'Profound: cortex + deep grey nuclei. Incomplete: watershed zones.', 'عمیق: کورتکس و هسته‌های عمقی. ناکامل: نواحی مرزی.'), L('Dauer, Schweregrad und Ursache bestimmen das Muster; Überlappungen sind häufig.', 'Duration, severity and cause determine the pattern; overlap is common.', 'مدت، شدت و علت الگو را تعیین می‌کنند و هم‌پوشانی شایع است.'), L('profund → Kortex + BG/Thalamus\nHypotonie → ACA/MCA + MCA/PCA')),
  FC('dwi', L('MRT', 'MRI', 'MRI'), L('Was ist das früheste sensitive MRT-Zeichen der HIE?', 'What is the earliest sensitive MRI sign of HIBI?', 'زودرس‌ترین علامت حساس MRI در HIE چیست؟'), L('DWI-Hyperintensität mit erniedrigtem ADC.', 'High DWI signal with low ADC.', 'افزایش سیگنال DWI همراه کاهش ADC.'), L('DWI allein kann durch T2-shine-through falsch positiv sein; echte Restriktion verlangt den ADC-Abfall.', 'DWI may be falsely bright from T2 shine-through; true restriction requires low ADC.', 'DWI ممکن است به علت T2 shine-through روشن باشد؛ محدودیت واقعی نیازمند کاهش ADC است.')),
  FC('ct-early', L('CT', 'CT', 'CT'), L('Schließt eine frühe normale CT eine globale HIE aus?', 'Does a normal early CT exclude global HIBI?', 'آیا CT طبیعی در ساعات اولیه HIE را رد می‌کند؟'), L('Nein.', 'No.', 'خیر.'), L('Die CT kann in den ersten Stunden unauffällig sein. Bei persistierendem Koma ist die MRT mit DWI deutlich sensitiver.', 'CT may be normal during the first hours. MRI with DWI is much more sensitive in persistent coma.', 'CT در ساعات اولیه ممکن است طبیعی باشد و در کمای پایدار MRI همراه DWI حساس‌تر است.')),
  FC('ct-signs', L('CT', 'CT', 'CT'), L('Welche CT-Zeichen sprechen für schwere globale HIE?', 'Which CT signs suggest severe global HIBI?', 'کدام علائم CT به نفع HIE شدید و منتشرند؟'), L('Verlust der Grau-Weiß-Grenze, diffuse Schwellung, enge Zisternen, White-cerebellum-Zeichen und Pseudo-SAB.', 'Loss of grey-white differentiation, diffuse swelling, compressed cisterns, white cerebellum sign and pseudo-SAH.', 'کاهش تمایز خاکستری-سفید، تورم منتشر، فشردگی سیسترن‌ها، علامت مخچه سفید و شبه SAH.'), L('Diese Zeichen entstehen durch ausgeprägtes zytotoxisches Ödem und erhöhten intrakraniellen Druck.', 'These signs reflect marked cytotoxic oedema and raised intracranial pressure.', 'این علائم ناشی از ادم سیتوتوکسیک شدید و افزایش فشار داخل جمجمه‌اند.')),
  FC('white-cerebellum', L('CT', 'CT', 'CT'), L('Was bedeutet das White-cerebellum-Zeichen?', 'What is the white cerebellum sign?', 'علامت مخچه سفید چیست؟'), L('Relativ helles Kleinhirn gegenüber diffus hypodensem, ödematösem Großhirn.', 'A relatively bright cerebellum compared with diffusely hypoattenuating oedematous cerebrum.', 'مخچه نسبتاً روشن در مقایسه با نیمکره‌های هیپودنس و ادماتو.'), L('Es ist ein relatives Dichtephänomen und kein Beweis für eine Kleinhirnblutung.', 'It is a relative attenuation phenomenon and does not prove cerebellar haemorrhage.', 'یک پدیده دانسیته نسبی است و خونریزی مخچه را ثابت نمی‌کند.')),
  FC('pseudo-sah', L('CT', 'CT', 'CT'), L('Was verursacht eine Pseudo-SAB bei globalem Hirnödem?', 'What causes pseudo-SAH in global cerebral oedema?', 'علت شبه SAH در ادم منتشر مغز چیست؟'), L('Venöse Stauung, komprimierte Liquorräume und diffuse Hirnhypodensität.', 'Venous engorgement, compressed CSF spaces and diffuse cerebral hypoattenuation.', 'احتقان وریدی، فشردگی فضاهای CSF و هیپودنسیتی منتشر مغز.'), L('Der Befund kann eine echte SAB imitieren; Verteilung, Dichte und klinischer Kontext helfen bei der Abgrenzung.', 'It may mimic true SAH; distribution, attenuation and clinical context help distinguish it.', 'این یافته می‌تواند SAH واقعی را تقلید کند؛ توزیع، دانسیته و زمینه بالینی کمک‌کننده‌اند.')),
  FC('timeline', L('Zeitverlauf', 'Timeline', 'سیر زمانی'), L('Wie entwickelt sich HIE in der MRT zeitlich?', 'How does HIBI evolve on MRI?', 'سیر زمانی HIE در MRI چگونه است؟'), L('Früh DWI/ADC, danach FLAIR-Schwellung, subakut ADC-Pseudonormalisierung und laminäre Nekrose, spät Atrophie.', 'Early DWI/ADC, then FLAIR swelling, subacute ADC pseudonormalisation and laminar necrosis, late atrophy.', 'ابتدا DWI/ADC، سپس تورم FLAIR، در زیرحاد شبه‌طبیعی شدن ADC و نکروز لامینار و در دیررس آتروفی.'), L('Der optimale Sequenzbefund hängt vom Untersuchungszeitpunkt ab; eine einzelne negative Sequenz ist nicht ausreichend.', 'The optimal sequence depends on timing; one negative sequence is insufficient.', 'یافته مناسب به زمان تصویربرداری وابسته است و منفی بودن یک سکانس کافی نیست.'), L('0–24 h DWI → 1–7 d DWI+FLAIR → 1–3 w T1 laminar → chronisch Atrophie')),
  FC('laminar-necrosis', L('Zeitverlauf', 'Timeline', 'سیر زمانی'), L('Wie erscheint laminäre kortikale Nekrose?', 'How does cortical laminar necrosis appear?', 'نکروز لامینار کورتکس چگونه دیده می‌شود؟'), L('Gyriformes T1-hyperintenses Band, häufig nach 2–4 Wochen.', 'A gyriform T1-hyperintense band, often after 2–4 weeks.', 'نوار ژیری‌فرم هایپراینتنس در T1، اغلب پس از ۲ تا ۴ هفته.'), L('Die T1-Hyperintensität kann ohne Blutung entstehen; SWI hilft bei der Abgrenzung einer hämorrhagischen Komponente.', 'T1 hyperintensity may occur without haemorrhage; SWI helps identify a haemorrhagic component.', 'T1 هایپراینتنس ممکن است بدون خونریزی باشد و SWI برای بررسی جزء هموراژیک کمک می‌کند.')),
  FC('co', L('Sonderformen', 'Specific patterns', 'الگوهای خاص'), L('Welches MRT-Muster ist klassisch bei CO-Intoxikation?', 'What MRI pattern is classic in carbon monoxide poisoning?', 'الگوی کلاسیک MRI در مسمومیت CO چیست؟'), L('Bilaterale Globus-pallidus-Läsionen ± diffuse Marklagerschädigung.', 'Bilateral globus pallidus lesions ± diffuse white-matter injury.', 'ضایعات دوطرفه گلوبوس پالیدوس با یا بدون آسیب منتشر ماده سفید.'), L('Der Befund ist charakteristisch, aber nicht pathognomonisch; auch andere Hypoxien und Toxine können die Basalganglien betreffen.', 'The finding is characteristic but not pathognomonic; other hypoxic and toxic insults may affect the basal ganglia.', 'یافته مشخص است ولی اختصاصی نیست و هیپوکسی یا سموم دیگر نیز می‌توانند گانگلیون‌های قاعده‌ای را درگیر کنند.')),
  FC('hypoglycaemia', L('Differenzialdiagnose', 'Differential diagnosis', 'تشخیص افتراقی'), L('Welches Muster kann eine hypoglykämische Enzephalopathie zeigen?', 'What pattern may hypoglycaemic encephalopathy show?', 'انسفالوپاتی هیپوگلیسمیک چه الگویی می‌تواند داشته باشد؟'), L('Parietookzipitaler Kortex, Hippocampi, Capsula interna oder Splenium; Pallidum oft ausgespart.', 'Parieto-occipital cortex, hippocampi, internal capsules or splenium; pallidum often spared.', 'کورتکس پاریتو-اکسیپیتال، هیپوکامپ، کپسول داخلی یا اسپلنیوم؛ پالیدوم اغلب سالم.'), L('Die rasche Kontrolle des Blutzuckers ist entscheidend, weil Veränderungen potenziell reversibel sein können.', 'Immediate glucose measurement is essential because abnormalities may be reversible.', 'اندازه‌گیری فوری قند خون مهم است، زیرا برخی تغییرات می‌توانند برگشت‌پذیر باشند.')),
  FC('seizure-dd', L('Differenzialdiagnose', 'Differential diagnosis', 'تشخیص افتراقی'), L('Welche Merkmale sprechen eher für periiktale DWI-Veränderungen als für globale HIE?', 'Which features favour peri-ictal DWI changes over global HIBI?', 'کدام ویژگی‌ها بیشتر به نفع تغییرات پری‌ایکتال هستند تا HIE منتشر؟'), L('Asymmetrie, nicht territoriale fokale Verteilung, Hyperperfusion und passende EEG-Aktivität.', 'Asymmetry, focal non-territorial distribution, hyperperfusion and corresponding EEG activity.', 'عدم تقارن، توزیع فوکال غیرقلمرویی، هایپرپرفیوژن و فعالیت سازگار در EEG.'), L('Periiktale Läsionen können Kortex, Hippocampus und Thalamus betreffen und sich im Verlauf zurückbilden.', 'Peri-ictal lesions may involve cortex, hippocampus and thalamus and may resolve on follow-up.', 'ضایعات پری‌ایکتال ممکن است کورتکس، هیپوکامپ و تالاموس را درگیر کنند و در پیگیری پسرفت کنند.')),
  FC('dphl', L('Spätkomplikation', 'Delayed complication', 'عارضه تأخیری'), L('Was ist die verzögerte posthypoxische Leukoenzephalopathie?', 'What is delayed post-hypoxic leukoencephalopathy?', 'لکوانسفالوپاتی تأخیری پس از هیپوکسی چیست؟'), L('Biphasische Verschlechterung nach lucid interval mit symmetrischer Marklagerschädigung.', 'Biphasic deterioration after a lucid interval with symmetric white-matter injury.', 'بدترشدن دو مرحله‌ای پس از یک دوره بهبود همراه آسیب متقارن ماده سفید.'), L('Sie tritt typischerweise Tage bis Wochen nach CO-Exposition, Überdosierung oder anderer Hypoxie auf.', 'It typically occurs days to weeks after carbon monoxide exposure, overdose or another hypoxic insult.', 'معمولاً چند روز تا چند هفته پس از CO، اوردوز یا سایر رویدادهای هیپوکسیک رخ می‌دهد.'), L('Hypoxie → Erholung → lucid interval → Leukoenzephalopathie')),
  FC('report', L('Befundung', 'Reporting', 'گزارش'), L('Welche Strukturen müssen bei Verdacht auf globale HIE systematisch beurteilt werden?', 'Which structures should be assessed systematically in suspected global HIBI?', 'در شک به HIE گسترده کدام ساختارها باید منظم بررسی شوند؟'), L('Kortex, Hippocampi, Basalganglien, Thalami, Kleinhirn, Hirnstamm und Marklager.', 'Cortex, hippocampi, basal ganglia, thalami, cerebellum, brainstem and white matter.', 'کورتکس، هیپوکامپ، گانگلیون‌های قاعده‌ای، تالاموس، مخچه، ساقه و ماده سفید.'), L('Zusätzlich Schwellung, Zisternen, Herniation, Blutung und zeitliche Veränderung dokumentieren.', 'Also document swelling, cisterns, herniation, haemorrhage and interval evolution.', 'تورم، سیسترن‌ها، هرنیاسیون، خونریزی و تغییر نسبت به قبل نیز باید ذکر شوند.')),
  FC('prognosis', L('Prognose', 'Prognosis', 'پیش‌آگهی'), L('Darf eine schwere MRT-HIE allein zur Therapiebegrenzung führen?', 'May severe MRI HIBI alone justify treatment limitation?', 'آیا MRI شدید HIE به‌تنهایی می‌تواند مبنای محدودکردن درمان باشد؟'), L('Nein – Prognose muss verzögert, multimodal und ohne Konfounder erfolgen.', 'No—prognosis must be delayed, multimodal and free of confounders.', 'خیر؛ پیش‌آگهی باید با تأخیر، چندوجهی و بدون عوامل مخدوش‌کننده انجام شود.'), L('Sedierung, Temperaturmanagement und selbst erfüllende Prognosen können die Beurteilung verzerren. Bildgebung ist nur ein Baustein.', 'Sedation, temperature management and self-fulfilling prophecy may bias assessment. Imaging is only one component.', 'سدیشن، مدیریت دما و پیش‌گویی خودمحقق‌شونده می‌توانند ارزیابی را منحرف کنند و تصویربرداری فقط یکی از اجزاست.'), L('≥72 h + keine Konfounder + Klinik/EEG/SSEP/Biomarker/Bildgebung')),
]
