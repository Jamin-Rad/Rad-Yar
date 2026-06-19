const L = (de, en, fa) => ({ de, en, fa })

export const EDH_LESSON = {
  toc: L('Inhaltsverzeichnis', 'Contents', 'فهرست مطالب'),
  breadcrumbArea: L('Kopf', 'Head', 'سر'),
  breadcrumbCurrent: L('Schädel-Hirn-Trauma · Epiduralhämatom', 'Head trauma · Epidural haematoma', 'ترومای سر · هماتوم اپیدورال'),
  title: L('Epiduralhämatom (EDH)', 'Epidural haematoma (EDH)', 'هماتوم اپیدورال (EDH)'),
  subtitle: L(
    'Akute extraaxiale Blutung zwischen Schädelkalotte und Dura mater, meist traumatisch und arteriell.',
    'An acute extra-axial haemorrhage between the skull and dura mater, usually traumatic and arterial.',
    'خونریزی حاد extra-axial بین جمجمه و dura mater که معمولاً تروماتیک و شریانی است.'
  ),
  sourceLabel: 'Dr. Zia',
  actionMcq: 'MCQ',
  actionFlash: L('Flashcards', 'Flashcards', 'فلش‌کارت'),
  keyLabel: L('Merke', 'Key point', 'نکته مهم'),
  caveLabel: L('CAVE', 'Caution', 'احتیاط'),
  openCase: L('Fall in Radiopaedia öffnen', 'Open case in Radiopaedia', 'باز کردن کیس در Radiopaedia'),
  sections: [
    { id: 'grundlagen', label: L('Grundlagen & Klinik', 'Basics & presentation', 'مبانی و تظاهرات بالینی'), icon: '🧠' },
    { id: 'pathomechanismus', label: L('Pathomechanismus', 'Mechanism', 'مکانیسم'), icon: '🩸' },
    { id: 'ct', label: L('CT-Diagnose', 'CT diagnosis', 'تشخیص با CT'), icon: '🩻' },
    { id: 'fraktur', label: L('Fraktur & Suturen', 'Fracture & sutures', 'شکستگی و sutures'), icon: '💀' },
    { id: 'blutungszeichen', label: L('Aktive Blutung', 'Active bleeding', 'خونریزی فعال'), icon: '🌀' },
    { id: 'notfall', label: L('Masseneffekt & Notfall', 'Mass effect & emergency', 'اثر فشاری و اورژانس'), icon: '🚨' },
    { id: 'differenzialdiagnosen', label: L('Differenzialdiagnosen', 'Differentials', 'تشخیص‌های افتراقی'), icon: '🔎' },
    { id: 'befundung', label: L('Befundung & Management', 'Reporting & management', 'گزارش و مدیریت'), icon: '📋' },
    { id: 'faelle', label: L('Lernfälle', 'Cases', 'کیس‌های آموزشی'), icon: '🔬' },
    { id: 'takehome', label: 'Take home message', icon: '💡' },
  ],
  heroCards: [
    {
      value: 'bikonvex',
      label: L('typische Form', 'typical shape', 'شکل تیپیک'),
      text: L('linsenförmig und meist suturbegrenzt', 'lentiform and usually limited by sutures', 'عدسی‌شکل و معمولاً محدود به sutures'),
    },
    {
      value: 'A. meningea media',
      label: L('klassische Quelle', 'classic source', 'منشأ کلاسیک'),
      text: L('besonders bei temporaler Kalottenfraktur', 'especially with a temporal skull fracture', 'به‌ویژه همراه شکستگی temporal bone'),
    },
    {
      value: '> 30 cm³',
      label: L('Operationskriterium', 'surgical criterion', 'معیار جراحی'),
      text: L('Evakuation unabhängig vom GCS empfohlen', 'evacuation recommended regardless of GCS', 'تخلیه صرف‌نظر از GCS توصیه می‌شود'),
    },
  ],
  basics: {
    title: L('Definition, Kontext und Klinik', 'Definition, setting and presentation', 'تعریف، زمینه و تظاهرات'),
    lead: L(
      'Das EDH entsteht durch Ablösung der Dura von der Schädelinnenseite. Der klinische Verlauf kann zunächst diskret sein und sich bei Hämatomwachstum rasch verschlechtern.',
      'EDH forms when blood strips the dura from the inner skull. Presentation may initially be subtle and deteriorate rapidly as the haematoma enlarges.',
      'EDH زمانی ایجاد می‌شود که خون، dura را از سطح داخلی جمجمه جدا کند. بیمار ممکن است ابتدا علائم خفیفی داشته باشد و با بزرگ‌شدن هماتوم سریعاً بدحال شود.'
    ),
    items: [
      { title: L('Typischer Kontext', 'Typical setting', 'زمینه تیپیک'), text: L('Stumpfes Schädeltrauma, häufig temporoparietal und ipsilateral zur direkten Gewalteinwirkung.', 'Blunt head trauma, often temporoparietal and ipsilateral to the impact.', 'ترومای blunt سر، اغلب در ناحیه temporoparietal و در همان سمت ضربه.') },
      { title: L('Luzides Intervall', 'Lucid interval', 'lucid interval'), text: L('Klassisch, aber weder häufig genug noch erforderlich für die Diagnose. Sein Fehlen schließt ein EDH nicht aus.', 'Classic but neither sufficiently common nor required for diagnosis. Its absence does not exclude EDH.', 'علامت کلاسیک است، اما برای تشخیص الزامی نیست و نبود آن EDH را رد نمی‌کند.') },
      { title: L('Warnsymptome', 'Red flags', 'علائم هشدار'), text: L('Zunehmender Kopfschmerz, Erbrechen, Vigilanzabfall, fokales Defizit, Krampfanfall oder Anisokorie.', 'Worsening headache, vomiting, reduced consciousness, focal deficit, seizure or anisocoria.', 'افزایش سردرد، استفراغ، افت سطح هوشیاری، deficit فوکال، تشنج یا anisocoria.') },
      { title: L('Notfalldynamik', 'Emergency dynamics', 'ماهیت اورژانسی'), text: L('Arterielle EDH können innerhalb kurzer Zeit wachsen; eine klinische Verschlechterung verlangt sofortige Reevaluation.', 'Arterial EDH may enlarge rapidly; clinical deterioration requires immediate reassessment.', 'EDH شریانی می‌تواند سریع بزرگ شود؛ هر افت بالینی نیازمند ارزیابی فوری است.') },
    ],
    key: L(
      'Das „talk-and-die“-Narrativ darf nicht beruhigen: Entscheidend sind Serienuntersuchung, Pupillenstatus, GCS und der aktuelle CT-Befund.',
      'The “talk-and-die” narrative must not reassure: serial examination, pupils, GCS and the current CT are what matter.',
      'عبارت «talk and die» نباید باعث اطمینان کاذب شود؛ معاینه سریال، وضعیت مردمک‌ها، GCS و CT فعلی تعیین‌کننده‌اند.'
    ),
  },
  mechanism: {
    title: L('Gefäßquelle und Pathomechanismus', 'Bleeding source and mechanism', 'منشأ خونریزی و مکانیسم'),
    lead: L(
      'Die Blutungsquelle hängt von Lokalisation und Frakturmuster ab. Nicht jedes EDH ist arteriell.',
      'The bleeding source depends on location and fracture pattern. Not every EDH is arterial.',
      'منشأ خونریزی به محل و الگوی شکستگی بستگی دارد و همه EDHها شریانی نیستند.'
    ),
    headers: [L('Quelle', 'Source', 'منشأ'), L('Typische Lokalisation', 'Typical location', 'محل تیپیک'), L('Praktischer Hinweis', 'Practical clue', 'نکته عملی')],
    rows: [
      [L('A. meningea media', 'Middle meningeal artery', 'middle meningeal artery'), L('temporal / temporoparietal', 'temporal / temporoparietal', 'temporal / temporoparietal'), L('häufig rasches Wachstum bei Fraktur im Pterionbereich', 'often rapid enlargement with a pterional fracture', 'اغلب با شکستگی ناحیه pterion و رشد سریع')],
      [L('Duraler Sinus', 'Dural venous sinus', 'dural venous sinus'), L('parietal, okzipital oder hintere Schädelgrube', 'parietal, occipital or posterior fossa', 'parietal، occipital یا posterior fossa'), L('kann langsamer verlaufen, bleibt aber potenziell gefährlich', 'may evolve more slowly but remains potentially dangerous', 'ممکن است آهسته‌تر پیش برود، ولی همچنان خطرناک است')],
      [L('Diploische Venen / Frakturrand', 'Diploic veins / fracture edge', 'diploic veins / لبه شکستگی'), L('frakturnah', 'adjacent to fracture', 'در مجاورت شکستگی'), L('kleinere venöse Hämatome sind eher konservativ behandelbar', 'smaller venous collections are more often observed', 'هماتوم‌های وریدی کوچک‌تر بیشتر قابل پیگیری محافظه‌کارانه‌اند')],
      [L('Nicht traumatisch', 'Non-traumatic', 'غیرتروماتیک'), L('selten und variabel', 'rare and variable', 'نادر و متغیر'), L('Koagulopathie, Gefäßläsion, Tumor oder Infektion erwägen', 'consider coagulopathy, vascular lesion, tumour or infection', 'coagulopathy، ضایعه عروقی، تومور یا عفونت را در نظر بگیرید')],
    ],
    key: L(
      'Temporalfraktur plus EDH: Verlauf der A. meningea media und ihrer Äste gezielt prüfen.',
      'Temporal fracture plus EDH: scrutinise the course of the middle meningeal artery and its branches.',
      'در شکستگی temporal همراه EDH، مسیر middle meningeal artery و شاخه‌های آن را دقیق بررسی کنید.'
    ),
  },
  ct: {
    title: L('Native CT: Diagnose in Sekunden', 'Non-contrast CT: rapid diagnosis', 'CT بدون کنتراست: تشخیص سریع'),
    lead: L(
      'Die native Schädel-CT ist die primäre Untersuchung. Neben dem Hämatom müssen Knochenfenster, Begleitverletzungen und Herniationszeichen systematisch beurteilt werden.',
      'Non-contrast head CT is the primary examination. The haematoma, bone windows, associated injuries and herniation signs must all be assessed systematically.',
      'CT بدون کنتراست روش اصلی است. علاوه بر هماتوم، bone window، آسیب‌های همراه و علائم herniation باید منظم بررسی شوند.'
    ),
    headers: [L('Merkmal', 'Feature', 'ویژگی'), L('Typischer Befund', 'Typical finding', 'یافته تیپیک'), L('Fallstrick', 'Pitfall', 'دام تشخیصی')],
    rows: [
      [L('Form', 'Shape', 'شکل'), L('bikonvex / linsenförmig extraaxial', 'biconvex / lentiform extra-axial collection', 'تجمع extra-axial عدسی‌شکل یا biconvex'), L('kleine EDH können weniger klassisch aussehen', 'small EDH may appear less classical', 'EDH کوچک ممکن است شکل کلاسیک نداشته باشد')],
      [L('Dichte', 'Density', 'دانسیته'), L('akut meist hyperdens', 'usually hyperattenuating when acute', 'در فاز حاد معمولاً hyperdense'), L('Anämie, Koagulopathie oder frisches ungeronnenes Blut können die Dichte senken', 'anaemia, coagulopathy or fresh unclotted blood may reduce attenuation', 'کم‌خونی، coagulopathy یا خون تازه لخته‌نشده می‌تواند دانسیته را کاهش دهد')],
      [L('Begrenzung', 'Boundary', 'حدود'), L('meist durch Suturen begrenzt', 'usually limited by sutures', 'معمولاً محدود به sutures'), L('Suturdiastase und schwächere durale Adhärenz erlauben Ausnahmen', 'suture diastasis and weaker dural attachment permit exceptions', 'suture diastasis یا اتصال ضعیف‌تر dura می‌تواند استثنا ایجاد کند')],
      [L('Masseneffekt', 'Mass effect', 'اثر فشاری'), L('Sulcuseffacement, Ventrikelkompression, Mittellinienverlagerung', 'sulcal effacement, ventricular compression and midline shift', 'محو sulci، فشردگی بطن و midline shift'), L('Hämatomgröße allein unterschätzt die Gefahr bei posteriorer Lokalisation', 'size alone may underestimate danger in the posterior fossa', 'در posterior fossa اندازه به‌تنهایی خطر را نشان نمی‌دهد')],
    ],
    key: L(
      'Zusätzlich zum Standard-Hirnfenster ein breites Traumafenster (etwa 100–150 HU Fensterweite) und dünne Knochenrekonstruktionen prüfen.',
      'In addition to the standard brain window, review a wide trauma window (approximately 100–150 HU width) and thin bone reconstructions.',
      'علاوه بر brain window استاندارد، trauma window با عرض تقریبی 100–150 HU و بازسازی‌های نازک استخوانی را بررسی کنید.'
    ),
  },
  fracture: {
    title: L('Fraktur, Suturen und Lokalisation', 'Fracture, sutures and location', 'شکستگی، sutures و محل'),
    lead: L(
      'Die Form des EDH wird durch die durale Anheftung an Suturen bestimmt. Die Fraktur kann die Blutungsquelle und den Ausbreitungsweg erklären.',
      'The shape of an EDH reflects dural attachment at sutures. A fracture may explain both the bleeding source and route of spread.',
      'شکل EDH تحت تأثیر اتصال dura به sutures است. شکستگی می‌تواند منشأ و مسیر گسترش خونریزی را توضیح دهد.'
    ),
    items: [
      { title: L('Fraktur suchen', 'Search for a fracture', 'جست‌وجوی شکستگی'), text: L('Dünne Schichten und MPR im Knochenfenster; besonders temporal, parietal, okzipital und an der Schädelbasis.', 'Use thin slices and bone-window MPR, especially temporal, parietal, occipital and skull base.', 'برش نازک و MPR در bone window، به‌ویژه temporal، parietal، occipital و skull base.') },
      { title: L('Suturregel', 'Suture rule', 'قاعده suture'), text: L('EDH überschreitet Suturen meist nicht; SDH kann Suturen überschreiten, wird aber durch Falx und Tentorium begrenzt.', 'EDH usually does not cross sutures; SDH may cross sutures but is limited by falx and tentorium.', 'EDH معمولاً از sutures عبور نمی‌کند؛ SDH می‌تواند عبور کند ولی به falx و tentorium محدود می‌شود.') },
      { title: L('Suturdiastase', 'Suture diastasis', 'suture diastasis'), text: L('Eine traumatisch eröffnete Sutur kann die feste Duraanheftung aufheben und eine atypische Ausdehnung ermöglichen.', 'A traumatically widened suture may disrupt dural attachment and allow atypical extension.', 'بازشدگی تروماتیک suture می‌تواند اتصال dura را مختل و گسترش غیرتیپیک ایجاد کند.') },
      { title: L('Hintere Schädelgrube', 'Posterior fossa', 'posterior fossa'), text: L('Oft okzipitale Fraktur und venöse Sinusverletzung; schon kleine Volumina können den 4. Ventrikel oder Hirnstamm komprimieren.', 'Often associated with occipital fracture and venous sinus injury; small volumes may compress the fourth ventricle or brainstem.', 'اغلب همراه شکستگی occipital و آسیب venous sinus است؛ حجم کم هم می‌تواند بطن چهارم یا brainstem را بفشارد.') },
    ],
    cave: L(
      'Eine fehlende Fraktur schließt ein EDH nicht aus, besonders bei Kindern oder nicht traumatischen Ursachen.',
      'Absence of a fracture does not exclude EDH, particularly in children or non-traumatic cases.',
      'نبود شکستگی EDH را رد نمی‌کند، به‌ویژه در کودکان یا علل غیرتروماتیک.'
    ),
  },
  bleeding: {
    title: L('Swirl sign und Hinweis auf aktive Blutung', 'Swirl sign and active bleeding', 'Swirl sign و نشانه خونریزی فعال'),
    lead: L(
      'Hypodense oder isodense Areale innerhalb eines hyperdensen akuten EDH können frisches, noch nicht koaguliertes Blut darstellen.',
      'Hypoattenuating or isoattenuating areas within an acute hyperattenuating EDH may represent fresh, unclotted blood.',
      'نواحی hypo- یا isodense داخل EDH حاد و hyperdense ممکن است خون تازه و هنوز لخته‌نشده باشند.'
    ),
    items: [
      { title: 'Swirl sign', text: L('Wirbel- oder fleckenartige niedrigere Dichte innerhalb des Hämatoms; mit aktiver Blutung und Expansion assoziiert.', 'Swirling or patchy lower attenuation within the haematoma; associated with active bleeding and expansion.', 'ناحیه چرخشی یا لکه‌ای با دانسیته کمتر داخل هماتوم که با خونریزی فعال و expansion ارتباط دارد.') },
      { title: L('Nicht pathognomonisch', 'Not pathognomonic', 'اختصاصی نیست'), text: L('Auch Gerinnungsstörung, Serumseparation oder unterschiedliche Blutalter können eine Heterogenität erzeugen.', 'Coagulopathy, serum separation or blood of different ages may also cause heterogeneity.', 'coagulopathy، جداشدن serum یا خون با سن متفاوت نیز می‌تواند ناهمگنی ایجاد کند.') },
      { title: L('Kontrastmittelaustritt', 'Contrast extravasation', 'contrast extravasation'), text: L('Bei CTA oder Kontrast-CT ist eine fokale Extravasation ein direkterer Hinweis auf fortbestehende Blutung.', 'On CTA or contrast CT, focal extravasation is a more direct sign of ongoing bleeding.', 'در CTA یا CT کنتراست‌دار، extravasation فوکال نشانه مستقیم‌تری از ادامه خونریزی است.') },
    ],
    cave: L(
      'Ein Swirl sign erhöht die Dringlichkeit, ersetzt aber nicht die Gesamtbewertung von GCS, Pupillen, Volumen, Dicke und Mittellinienverlagerung.',
      'A swirl sign increases urgency but does not replace integrated assessment of GCS, pupils, volume, thickness and midline shift.',
      'وجود Swirl sign فوریت را بیشتر می‌کند، اما جای ارزیابی هم‌زمان GCS، مردمک‌ها، حجم، ضخامت و midline shift را نمی‌گیرد.'
    ),
  },
  emergency: {
    title: L('Masseneffekt, Herniation und Zeitkritik', 'Mass effect, herniation and time criticality', 'اثر فشاری، herniation و اهمیت زمان'),
    lead: L(
      'Die radiologische Beurteilung muss unmittelbar erkennen lassen, ob ein neurochirurgischer Notfall vorliegt.',
      'The radiology assessment must immediately establish whether this is a neurosurgical emergency.',
      'گزارش رادیولوژی باید فوراً مشخص کند که آیا بیمار در وضعیت اورژانس neurosurgical قرار دارد یا نه.'
    ),
    headers: [L('Zeichen', 'Sign', 'علامت'), L('Bedeutung', 'Meaning', 'اهمیت'), L('Konsequenz', 'Implication', 'اقدام')],
    rows: [
      [L('Mittellinienverlagerung', 'Midline shift', 'midline shift'), L('asymmetrischer Masseneffekt', 'asymmetric mass effect', 'اثر فشاری نامتقارن'), L('in Millimetern messen und sofort kommunizieren', 'measure in millimetres and communicate immediately', 'به mm اندازه‌گیری و فوری اطلاع‌رسانی شود')],
      [L('Unkusherniation', 'Uncal herniation', 'uncal herniation'), L('Kompression von N. III und Hirnstamm', 'compression of CN III and brainstem', 'فشار بر CN III و brainstem'), L('Anisokorie + GCS-Abfall = höchste Dringlichkeit', 'anisocoria plus falling GCS is maximally urgent', 'anisocoria همراه افت GCS بسیار اورژانسی است')],
      [L('Basale Zisternen verstrichen', 'Effaced basal cisterns', 'محو basal cisterns'), L('erhöhter intrakranieller Druck', 'raised intracranial pressure', 'افزایش intracranial pressure'), L('Herniation aktiv ausschließen', 'actively assess for herniation', 'herniation به‌طور فعال بررسی شود')],
      [L('4.-Ventrikel-Kompression', 'Fourth-ventricle compression', 'فشردگی بطن چهارم'), L('posteriore Raumforderung', 'posterior fossa mass effect', 'اثر فشاری posterior fossa'), L('Hydrozephalus und Hirnstammkompression prüfen', 'assess hydrocephalus and brainstem compression', 'hydrocephalus و فشار بر brainstem بررسی شود')],
    ],
    cave: L(
      'Bei klinischer Verschlechterung nicht auf eine planmäßige Verlaufskontrolle warten: sofortige CT und neurochirurgische Rücksprache.',
      'Do not wait for scheduled follow-up if the patient deteriorates: obtain immediate CT and neurosurgical review.',
      'در صورت افت بالینی منتظر CT برنامه‌ریزی‌شده نمانید؛ CT فوری و مشاوره neurosurgery لازم است.'
    ),
  },
  differential: {
    title: L('Wichtige Differenzialdiagnosen', 'Key differential diagnoses', 'تشخیص‌های افتراقی مهم'),
    lead: L(
      'Form, Beziehung zu Suturen und Dura, Lokalisation sowie Begleitverletzungen trennen das EDH von anderen extraaxialen Prozessen.',
      'Shape, relation to sutures and dura, location and associated injuries distinguish EDH from other extra-axial processes.',
      'شکل، ارتباط با sutures و dura، محل و آسیب‌های همراه EDH را از سایر ضایعات extra-axial جدا می‌کند.'
    ),
    headers: [L('Diagnose', 'Diagnosis', 'تشخیص'), L('Typische Form/Verteilung', 'Typical shape/distribution', 'شکل یا توزیع تیپیک'), L('Abgrenzung', 'Distinguishing feature', 'نکته افتراقی')],
    rows: [
      [L('Akutes SDH', 'Acute SDH', 'SDH حاد'), L('sichelförmig, kann Suturen überschreiten', 'crescentic and may cross sutures', 'هلالی و قادر به عبور از sutures'), L('wird durch Falx/Tentorium begrenzt; häufig stärkere Parenchymverletzung', 'limited by falx/tentorium; often more parenchymal injury', 'به falx/tentorium محدود و اغلب با آسیب بیشتر parenchyma')],
      [L('Subperiostales Hämatom', 'Subperiosteal haematoma', 'هماتوم subperiosteal'), L('außerhalb der Kalotte', 'external to the skull', 'خارج از کالواریا'), L('Schädelknochen liegt zwischen Blutung und Gehirn', 'skull lies between collection and brain', 'استخوان بین خونریزی و مغز قرار دارد')],
      [L('Hämorrhagische Kontusion', 'Haemorrhagic contusion', 'contusion هموراژیک'), L('intraaxial, frontal/temporal, oft multifokal', 'intra-axial, frontal/temporal, often multifocal', 'intra-axial، frontal/temporal و اغلب چندکانونی'), L('Ödem und punktförmige Blutungen im Parenchym', 'oedema and punctate haemorrhage within brain', 'ادم و خونریزی نقطه‌ای داخل parenchyma')],
      [L('Duraler Tumor / Abszess', 'Dural tumour / abscess', 'تومور dural یا abscess'), L('extraaxiale Raumforderung, oft nicht akut hyperdens', 'extra-axial mass, usually not an acute hyperdense clot', 'توده extra-axial و معمولاً نه clot حاد hyperdense'), L('klinischer Verlauf, Enhancement und MRT helfen', 'clinical course, enhancement and MRI help', 'سیر بالینی، enhancement و MRI کمک‌کننده‌اند')],
    ],
    key: L(
      'EDH = bikonvex und suturbegrenzt; SDH = sichelförmig und durch durale Reflexionen begrenzt.',
      'EDH is lentiform and suture limited; SDH is crescentic and limited by dural reflections.',
      'EDH عدسی‌شکل و محدود به suture است؛ SDH هلالی و محدود به dural reflections.'
    ),
  },
  reporting: {
    title: L('Strukturierter Befund und Managementbezug', 'Structured report and management relevance', 'گزارش ساختاریافته و ارتباط با مدیریت'),
    lead: L(
      'Der Befund muss die Operationsentscheidung unterstützen und zeitkritische Informationen direkt kommunizieren.',
      'The report must support surgical decision-making and communicate time-critical information directly.',
      'گزارش باید تصمیم جراحی را پشتیبانی کند و اطلاعات time-critical را مستقیم منتقل کند.'
    ),
    reportItems: [
      { title: L('Lokalisation und Seite', 'Location and side', 'محل و سمت'), text: L('Frontal, temporal, parietal, okzipital, Schädelbasis oder hintere Schädelgrube.', 'Frontal, temporal, parietal, occipital, skull base or posterior fossa.', 'frontal، temporal، parietal، occipital، skull base یا posterior fossa.') },
      { title: L('Größe', 'Size', 'اندازه'), text: L('Maximale Dicke in mm, Ausdehnung in drei Ebenen und möglichst Volumen angeben.', 'Report maximal thickness in mm, three-plane dimensions and volume where possible.', 'حداکثر ضخامت به mm، ابعاد در سه صفحه و در صورت امکان volume ذکر شود.') },
      { title: L('Masseneffekt', 'Mass effect', 'اثر فشاری'), text: L('Mittellinienverlagerung, Ventrikel, Zisternen, Herniation und Hydrozephalus.', 'Midline shift, ventricles, cisterns, herniation and hydrocephalus.', 'midline shift، بطن‌ها، cisterns، herniation و hydrocephalus.') },
      { title: L('Blutungsaktivität', 'Bleeding activity', 'فعالیت خونریزی'), text: L('Heterogenität, Swirl sign oder Kontrastmittelaustritt beschreiben.', 'Describe heterogeneity, swirl sign or contrast extravasation.', 'ناهمگنی، Swirl sign یا contrast extravasation ذکر شود.') },
      { title: L('Fraktur und Quelle', 'Fracture and source', 'شکستگی و منشأ'), text: L('Frakturverlauf, Suturdiastase und mögliche arterielle oder venöse Quelle nennen.', 'State fracture course, suture diastasis and possible arterial or venous source.', 'مسیر شکستگی، suture diastasis و منشأ احتمالی شریانی یا وریدی ذکر شود.') },
      { title: L('Begleitverletzungen', 'Associated injuries', 'آسیب‌های همراه'), text: L('SDH, SAB, Kontusion, DAI, Pneumozephalus, Orbitagesichts- und Gefäßverletzung.', 'SDH, SAH, contusion, DAI, pneumocephalus, orbital/facial and vascular injury.', 'SDH، SAH، contusion، DAI، pneumocephalus و آسیب orbital/facial یا عروقی.') },
    ],
    criteriaHeaders: [L('Situation', 'Situation', 'وضعیت'), L('Richtwert', 'Threshold', 'معیار'), L('Vorgehen', 'Management', 'اقدام')],
    criteriaRows: [
      [L('Operationsindikation', 'Surgical indication', 'اندیکاسیون جراحی'), L('Volumen > 30 cm³', 'Volume > 30 cm³', 'حجم > 30 cm³'), L('Evakuation unabhängig vom GCS empfohlen', 'evacuation recommended regardless of GCS', 'تخلیه صرف‌نظر از GCS توصیه می‌شود')],
      [L('Konservative Option', 'Observation option', 'امکان درمان محافظه‌کارانه'), L('< 30 cm³, Dicke < 15 mm, Shift < 5 mm, GCS > 8, kein fokales Defizit', '< 30 cm³, thickness < 15 mm, shift < 5 mm, GCS > 8, no focal deficit', '< 30 cm³، ضخامت < 15 mm، shift < 5 mm، GCS > 8 و بدون deficit فوکال'), L('engmaschige Neurologie und serielle CT in neurochirurgischer Umgebung', 'close neurological observation and serial CT in a neurosurgical setting', 'پایش نزدیک نورولوژیک و CT سریال در مرکز دارای neurosurgery')],
      [L('Koma + Anisokorie', 'Coma plus anisocoria', 'کما همراه anisocoria'), L('GCS < 9 und Pupillendifferenz', 'GCS < 9 with pupillary asymmetry', 'GCS < 9 همراه عدم تقارن مردمک'), L('sofortige operative Evakuation', 'immediate surgical evacuation', 'تخلیه جراحی فوری')],
    ],
    cave: L(
      'Schwellenwerte sind Entscheidungshilfen, kein Ersatz für klinische Dynamik. Verschlechterung, Posterior-fossa-Lage oder aktive Blutung können ein früheres Eingreifen verlangen.',
      'Thresholds support decisions but do not replace clinical dynamics. Deterioration, posterior fossa location or active bleeding may require earlier intervention.',
      'این اعداد ابزار تصمیم‌گیری‌اند و جای سیر بالینی را نمی‌گیرند؛ افت بالینی، محل posterior fossa یا خونریزی فعال ممکن است مداخله زودتر بخواهد.'
    ),
  },
  cases: {
    title: L('Zwei Radiopaedia-Lernfälle', 'Two Radiopaedia learning cases', 'دو کیس آموزشی Radiopaedia'),
    lead: L(
      'Die Bilder lassen sich horizontal durchscrollen und einzeln vergrößern. Angezeigt werden nur die relevanten Bildbefunde.',
      'Scroll horizontally through the images and open each one in a large view. Only the relevant imaging findings are shown.',
      'تصاویر به‌صورت افقی قابل مرور و با کلیک قابل بزرگ‌نمایی‌اند. فقط یافته‌های تصویربرداری مرتبط نمایش داده می‌شود.'
    ),
  },
  takehome: {
    title: 'Take home message',
    lead: L('Kurz und merkbar.', 'Short and memorable.', 'کوتاه و به‌یادماندنی.'),
    items: [
      { title: L('Form erkennen', 'Recognise the shape', 'شکل را بشناسید'), text: L('bikonvex, extraaxial, meist suturbegrenzt.', 'lentiform, extra-axial and usually suture limited.', 'عدسی‌شکل، extra-axial و معمولاً محدود به suture.') },
      { title: L('Knochen mitlesen', 'Read the bone', 'استخوان را هم ببینید'), text: L('Fraktur und mögliche Gefäßquelle aktiv suchen.', 'actively search for fracture and bleeding source.', 'شکستگی و منشأ خونریزی را فعالانه جست‌وجو کنید.') },
      { title: L('Masseneffekt messen', 'Measure mass effect', 'اثر فشاری را اندازه بگیرید'), text: L('Dicke, Volumen, Shift, Zisternen und Herniation.', 'thickness, volume, shift, cisterns and herniation.', 'ضخامت، حجم، shift، cisterns و herniation.') },
      { title: L('Zeit ist Gehirn', 'Time is brain', 'زمان یعنی مغز'), text: L('Verschlechterung oder Anisokorie sofort kommunizieren.', 'communicate deterioration or anisocoria immediately.', 'افت بالینی یا anisocoria را فوراً اطلاع دهید.') },
    ],
  },
}

export const EDH_LEARNING_CASES = [
  {
    id: 'conservative-edh',
    url: 'https://radiopaedia.org/cases/6080',
    images: ['/edh/case-conservative-acute.jpg', '/edh/case-conservative-followup.jpg'],
    label: L('Fall 1 · kleines EDH', 'Case 1 · small EDH', 'کیس ۱ · EDH کوچک'),
    title: L('Parietales EDH mit Fraktur', 'Parietal EDH with fracture', 'EDH پاریتال همراه شکستگی'),
    text: L(
      'Rechts parietal liegt ein bikonvexes EDH unter einer linearen Fraktur. Der posteriore Rand wird durch die parieto-okzipitale Sutur begrenzt; der Fall wurde engmaschig konservativ behandelt.',
      'A right parietal biconvex EDH lies beneath a linear fracture. Its posterior margin is limited by the parieto-occipital suture; the case was managed with close observation.',
      'EDH عدسی‌شکل در ناحیه parietal راست زیر یک شکستگی خطی دیده می‌شود. حاشیه خلفی به parieto-occipital suture محدود است و بیمار با پایش نزدیک به‌صورت محافظه‌کارانه درمان شد.'
    ),
    alt: L('CT eines kleinen parietalen Epiduralhämatoms', 'CT of a small parietal epidural haematoma', 'CT هماتوم اپیدورال کوچک parietal'),
    credit: 'Case courtesy of Frank Gaillard, Radiopaedia.org, rID 6080, CC BY-NC-SA 3.0',
  },
  {
    id: 'large-edh',
    url: 'https://radiopaedia.org/cases/29440',
    images: ['/edh/case-large-edh-01.jpg', '/edh/case-large-edh-02.jpg'],
    label: L('Fall 2 · großes EDH', 'Case 2 · large EDH', 'کیس ۲ · EDH بزرگ'),
    title: L('Frontotemporales EDH mit Herniation', 'Frontotemporal EDH with herniation', 'EDH فرونتوتمپورال همراه herniation'),
    text: L(
      'Großes links frontotemporales EDH mit ausgeprägtem Masseneffekt, Mittellinienverlagerung und subfalziner Herniation. Begleitend bestehen eine frontotemporale Fraktur und eine orbitale Blow-out-Fraktur.',
      'Large left frontotemporal EDH with marked mass effect, midline shift and subfalcine herniation. Associated frontotemporal and orbital blow-out fractures are present.',
      'EDH بزرگ frontotemporal چپ با اثر فشاری واضح، midline shift و subfalcine herniation دیده می‌شود. شکستگی frontotemporal و orbital blow-out نیز همراه آن است.'
    ),
    alt: L('CT eines großen frontotemporalen Epiduralhämatoms', 'CT of a large frontotemporal epidural haematoma', 'CT هماتوم اپیدورال بزرگ frontotemporal'),
    credit: 'Case courtesy of David Puyó Vera, Radiopaedia.org, rID 29440, CC BY-NC-SA 3.0',
  },
]

const MCQ_SEEDS = [
  {
    id: 'shape-suture',
    question: L('Welcher CT-Befund ist für ein akutes Epiduralhämatom am typischsten?', 'Which CT finding is most typical of an acute epidural haematoma?', 'کدام یافته CT برای EDH حاد تیپیک‌تر است؟'),
    options: [
      L('Bikonvexe hyperdense extraaxiale Blutung, meist durch Suturen begrenzt', 'Biconvex hyperattenuating extra-axial haemorrhage, usually limited by sutures', 'خونریزی extra-axial عدسی‌شکل و hyperdense که معمولاً به sutures محدود است'),
      L('Sichelförmige Blutung, die Suturen frei überschreitet', 'Crescentic haemorrhage freely crossing sutures', 'خونریزی هلالی که آزادانه از sutures عبور می‌کند'),
      L('Punktförmige Blutungen im Corpus callosum', 'Punctate haemorrhages in the corpus callosum', 'خونریزی‌های نقطه‌ای در corpus callosum'),
      L('Blut ausschließlich in den basalen Zisternen', 'Blood confined to the basal cisterns', 'خون فقط در basal cisterns'),
    ],
    correct: 'A',
    explanation: L('Die feste Anheftung der Dura an den Suturen erzeugt die typische linsenförmige, suturbegrenzte Konfiguration.', 'Firm dural attachment at sutures produces the typical lentiform, suture-limited configuration.', 'اتصال محکم dura در sutures باعث شکل عدسی و محدودشدن تیپیک هماتوم می‌شود.'),
  },
  {
    id: 'source',
    question: L('Welche Kombination ist klassisch für ein temporales EDH?', 'Which combination is classic for a temporal EDH?', 'کدام ترکیب برای EDH تمپورال کلاسیک است؟'),
    options: [
      L('Temporalfraktur und Verletzung der A. meningea media', 'Temporal fracture and middle meningeal artery injury', 'شکستگی temporal و آسیب middle meningeal artery'),
      L('Okzipitalfraktur und Ruptur der A. cerebri anterior', 'Occipital fracture and anterior cerebral artery rupture', 'شکستگی occipital و پارگی anterior cerebral artery'),
      L('Nasenbeinfraktur und Ruptur der V. Galeni', 'Nasal fracture and vein of Galen rupture', 'شکستگی nasal bone و پارگی vein of Galen'),
      L('Orbitabodenfraktur und Ruptur der A. basilaris', 'Orbital floor fracture and basilar artery rupture', 'شکستگی orbital floor و پارگی basilar artery'),
    ],
    correct: 'A',
    explanation: L('Die A. meningea media verläuft an der Innenseite des dünnen Temporalknochens und ist bei Frakturen im Pterionbereich besonders gefährdet.', 'The middle meningeal artery courses along the inner temporal bone and is vulnerable in pterional fractures.', 'middle meningeal artery در سطح داخلی temporal bone نازک قرار دارد و در شکستگی ناحیه pterion آسیب‌پذیر است.'),
  },
  {
    id: 'swirl',
    question: L('Wie ist ein Swirl sign innerhalb eines akuten EDH am sinnvollsten zu bewerten?', 'How should a swirl sign within an acute EDH be interpreted?', 'Swirl sign داخل EDH حاد چگونه تفسیر می‌شود؟'),
    options: [
      L('Als Hinweis auf frisches ungeronnenes Blut und mögliche fortgesetzte Blutung', 'As a sign of fresh unclotted blood and possible ongoing bleeding', 'به‌عنوان نشانه خون تازه لخته‌نشده و احتمال ادامه خونریزی'),
      L('Als sicherer Beweis für eine verkalkte chronische Blutung', 'As proof of a calcified chronic haemorrhage', 'به‌عنوان اثبات قطعی خونریزی مزمن کلسیفیه'),
      L('Als typisches Zeichen eines Liquorlecks', 'As a typical sign of a CSF leak', 'به‌عنوان علامت تیپیک CSF leak'),
      L('Als Artefakt ohne klinische Bedeutung', 'As an artefact without clinical relevance', 'به‌عنوان artifact بدون اهمیت بالینی'),
    ],
    correct: 'A',
    explanation: L('Niedrigere Dichte im hyperdensen Hämatom kann frisches Blut darstellen und ist mit Expansion assoziiert, ist aber nicht pathognomonisch.', 'Lower attenuation within a dense clot may represent fresh blood and is associated with expansion, but is not pathognomonic.', 'دانسیته کمتر داخل clot متراکم می‌تواند خون تازه باشد و با expansion ارتباط دارد، اما اختصاصی نیست.'),
  },
  {
    id: 'window',
    question: L('Warum ist ein breites Traumafenster bei Verdacht auf EDH hilfreich?', 'Why is a wide trauma window useful when EDH is suspected?', 'چرا trauma window پهن در شک به EDH مفید است؟'),
    options: [
      L('Es verbessert die Abgrenzung von hyperdensem Hämatom und Schädelkalotte', 'It improves distinction between hyperattenuating clot and skull', 'افتراق clot پر دانسیته از استخوان جمجمه را بهتر می‌کند'),
      L('Es ersetzt die Knochenrekonstruktionen vollständig', 'It completely replaces bone reconstructions', 'به‌طور کامل جای bone reconstruction را می‌گیرد'),
      L('Es macht jedes akute Hämatom hypodens', 'It makes every acute haematoma hypoattenuating', 'هر هماتوم حاد را hypodense نشان می‌دهد'),
      L('Es dient ausschließlich zur Beurteilung der Nasennebenhöhlen', 'It is used only for paranasal sinus assessment', 'فقط برای بررسی paranasal sinuses است'),
    ],
    correct: 'A',
    explanation: L('Eine Fensterweite von ungefähr 100–150 HU erleichtert die Beurteilung extraaxialer Blutanteile direkt an der dichten Kalotte.', 'A window width of roughly 100–150 HU helps assess extra-axial blood adjacent to the dense skull.', 'عرض window حدود 100–150 HU ارزیابی خون extra-axial چسبیده به استخوان متراکم را آسان‌تر می‌کند.'),
  },
  {
    id: 'observation',
    question: L('Welche Konstellation passt am ehesten zu einer möglichen konservativen Behandlung?', 'Which constellation best fits possible non-operative management?', 'کدام وضعیت بیشتر با درمان محافظه‌کارانه سازگار است؟'),
    options: [
      L('EDH < 30 cm³, Dicke < 15 mm, Shift < 5 mm, GCS > 8, kein fokales Defizit', 'EDH < 30 cm³, thickness < 15 mm, shift < 5 mm, GCS > 8 and no focal deficit', 'EDH < 30 cm³، ضخامت < 15 mm، shift < 5 mm، GCS > 8 و بدون deficit فوکال'),
      L('EDH 45 cm³ mit Anisokorie und GCS 7', 'EDH 45 cm³ with anisocoria and GCS 7', 'EDH با حجم 45 cm³ همراه anisocoria و GCS 7'),
      L('Posteriores EDH mit Hirnstammkompression', 'Posterior fossa EDH with brainstem compression', 'EDH posterior fossa همراه فشار بر brainstem'),
      L('Zunehmende Vigilanzminderung trotz stabiler erster CT', 'Progressive reduction in consciousness despite an initially stable CT', 'افت پیشرونده هوشیاری با وجود CT اولیه ظاهراً پایدار'),
    ],
    correct: 'A',
    explanation: L('Diese Kriterien erlauben eine Beobachtung nur bei enger neurologischer Überwachung, serieller CT und sofortiger neurochirurgischer Verfügbarkeit.', 'These criteria permit observation only with close neurological monitoring, serial CT and immediate neurosurgical availability.', 'این معیارها فقط با پایش نزدیک نورولوژیک، CT سریال و دسترسی فوری به neurosurgery امکان observation می‌دهند.'),
  },
  {
    id: 'volume',
    question: L('Ab welchem EDH-Volumen wird eine operative Evakuation unabhängig vom GCS empfohlen?', 'Above what EDH volume is surgical evacuation recommended regardless of GCS?', 'از چه حجمی تخلیه جراحی EDH صرف‌نظر از GCS توصیه می‌شود؟'),
    options: [L('Über 30 cm³', 'Over 30 cm³', 'بیش از 30 cm³'), L('Über 5 cm³', 'Over 5 cm³', 'بیش از 5 cm³'), L('Über 10 cm³', 'Over 10 cm³', 'بیش از 10 cm³'), L('Erst über 100 cm³', 'Only over 100 cm³', 'فقط بیش از 100 cm³')],
    correct: 'A',
    explanation: L('Die etablierten neurochirurgischen Leitlinien empfehlen bei einem EDH über 30 cm³ die Evakuation unabhängig vom initialen GCS.', 'Established neurosurgical guidance recommends evacuation of an EDH over 30 cm³ regardless of the initial GCS.', 'راهنمای neurosurgical برای EDH بیش از 30 cm³ تخلیه را مستقل از GCS اولیه توصیه می‌کند.'),
  },
  {
    id: 'posterior',
    question: L('Warum kann ein relativ kleines EDH der hinteren Schädelgrube besonders gefährlich sein?', 'Why can a relatively small posterior fossa EDH be especially dangerous?', 'چرا EDH نسبتاً کوچک posterior fossa می‌تواند بسیار خطرناک باشد؟'),
    options: [
      L('Der enge Raum begünstigt frühe Hirnstamm- und 4.-Ventrikel-Kompression', 'The confined space promotes early brainstem and fourth-ventricle compression', 'فضای محدود باعث فشار زودرس بر brainstem و بطن چهارم می‌شود'),
      L('Es verursacht immer eine Ruptur der A. carotis interna', 'It always ruptures the internal carotid artery', 'همیشه باعث پارگی internal carotid artery می‌شود'),
      L('Es ist in der CT grundsätzlich unsichtbar', 'It is always invisible on CT', 'اصولاً در CT دیده نمی‌شود'),
      L('Es kann keine Herniation verursachen', 'It cannot cause herniation', 'نمی‌تواند herniation ایجاد کند'),
    ],
    correct: 'A',
    explanation: L('In der hinteren Schädelgrube stehen nur geringe Reserveräume zur Verfügung; Hydrozephalus und Hirnstammkompression können rasch entstehen.', 'The posterior fossa has little reserve space, so hydrocephalus and brainstem compression may develop rapidly.', 'posterior fossa فضای ذخیره کمی دارد؛ hydrocephalus و فشار بر brainstem می‌تواند سریع ایجاد شود.'),
  },
  {
    id: 'sdh-dd',
    question: L('Welches Merkmal spricht eher für ein akutes SDH als für ein EDH?', 'Which feature favours acute SDH rather than EDH?', 'کدام ویژگی بیشتر به نفع SDH حاد است تا EDH؟'),
    options: [
      L('Sichelförmige Blutung, die Suturen überschreiten kann', 'Crescentic haemorrhage that may cross sutures', 'خونریزی هلالی که می‌تواند از sutures عبور کند'),
      L('Bikonvexe Form unter einer Temporalfraktur', 'Biconvex collection beneath a temporal fracture', 'تجمع عدسی‌شکل زیر شکستگی temporal'),
      L('Begrenzung an der parieto-okzipitalen Sutur', 'Limitation at the parieto-occipital suture', 'محدودشدن در parieto-occipital suture'),
      L('Mögliche Verletzung der A. meningea media', 'Possible middle meningeal artery injury', 'احتمال آسیب middle meningeal artery'),
    ],
    correct: 'A',
    explanation: L('SDH breitet sich im Subduralraum sichelförmig aus und kann Suturen überschreiten, wird jedoch durch Falx und Tentorium begrenzt.', 'SDH spreads crescentically in the subdural space and may cross sutures, but is limited by falx and tentorium.', 'SDH در subdural space به شکل هلالی گسترش می‌یابد و می‌تواند از sutures عبور کند، اما به falx و tentorium محدود است.'),
  },
  {
    id: 'report',
    question: L('Welche Angabe ist in einem EDH-Befund für die Akutentscheidung am wenigsten verzichtbar?', 'Which item is least dispensable in an acute EDH report?', 'کدام مورد در گزارش حاد EDH ضروری‌تر است؟'),
    options: [
      L('Dicke/Volumen, Mittellinienverlagerung, Zisternen und Herniationszeichen', 'Thickness/volume, midline shift, cisterns and herniation signs', 'ضخامت/حجم، midline shift، cisterns و علائم herniation'),
      L('Nur die mittlere CT-Dichte in einer einzelnen ROI', 'Only the mean CT attenuation in one ROI', 'فقط میانگین دانسیته در یک ROI'),
      L('Nur das Alter der CT-Konsole', 'Only the age of the CT console', 'فقط سن دستگاه CT'),
      L('Nur die Beschreibung der Kopfhaut', 'Only a description of the scalp', 'فقط توصیف scalp'),
    ],
    correct: 'A',
    explanation: L('Diese Parameter bestimmen Dringlichkeit und neurochirurgisches Vorgehen; zusätzlich müssen Fraktur, Blutungsaktivität und Begleitverletzungen genannt werden.', 'These parameters determine urgency and neurosurgical management; fracture, bleeding activity and associated injuries must also be reported.', 'این پارامترها فوریت و مدیریت neurosurgical را تعیین می‌کنند؛ شکستگی، فعالیت خونریزی و آسیب‌های همراه نیز باید ذکر شوند.'),
  },
  {
    id: 'deterioration',
    question: L('Ein Patient mit bekanntem EDH entwickelt plötzlich GCS-Abfall und ipsilaterale Mydriasis. Was ist am ehesten richtig?', 'A patient with known EDH develops a sudden fall in GCS and ipsilateral mydriasis. What is most appropriate?', 'بیمار دارای EDH ناگهان افت GCS و mydriasis همان‌طرف پیدا می‌کند. اقدام صحیح چیست؟'),
    options: [
      L('Unkusherniation annehmen, sofort neurochirurgisch eskalieren und notfallmäßig handeln', 'Assume uncal herniation, escalate immediately to neurosurgery and act emergently', 'uncal herniation را محتمل بدانید و فوراً اقدام اورژانسی و مشاوره neurosurgery انجام دهید'),
      L('Bis zur routinemäßigen Kontrolle am nächsten Tag warten', 'Wait for routine follow-up the next day', 'تا کنترل روتین روز بعد صبر کنید'),
      L('Nur eine ambulante MRT in vier Wochen empfehlen', 'Recommend only outpatient MRI in four weeks', 'فقط MRI سرپایی چهار هفته بعد توصیه کنید'),
      L('Die Pupillendifferenz als harmlos dokumentieren', 'Document the pupillary asymmetry as benign', 'عدم تقارن مردمک را بی‌اهمیت ثبت کنید'),
    ],
    correct: 'A',
    explanation: L('GCS-Abfall und ipsilaterale Mydriasis sprechen für N.-III-Kompression bei Unkusherniation und verlangen sofortige operative Abklärung.', 'Falling GCS and ipsilateral mydriasis suggest CN III compression from uncal herniation and demand immediate surgical assessment.', 'افت GCS و mydriasis همان‌طرف به نفع فشار بر CN III در uncal herniation است و بررسی جراحی فوری می‌خواهد.'),
  },
]

export const EDH_QUESTIONS = Object.fromEntries(
  ['de', 'en', 'fa'].map(lang => [
    lang,
    MCQ_SEEDS.map((item, index) => ({
      id: `edh-${lang}-${String(index + 1).padStart(2, '0')}-${item.id}`,
      tags: ['epidurale-blutung', 'epiduralhaematom', 'gehirn', 'trauma'],
      fach: 'gehirn',
      question: item.question[lang],
      options: item.options.map((option, optionIndex) => ({ id: ['A', 'B', 'C', 'D'][optionIndex], text: option[lang] })),
      correct: item.correct,
      explanation: item.explanation[lang],
    })),
  ])
)

const FC = (id, category, front, answer, explanation, diagram = null) => ({
  id: `edh-fc-${id}`,
  topicId: 'epidurale-blutung',
  category,
  front,
  answer,
  explanation,
  ...(diagram ? { diagram } : {}),
})

export const EDH_FLASHCARDS = [
  FC('definition', L('Grundlagen', 'Basics', 'مبانی'), L('Was ist ein intrakranielles EDH?', 'What is an intracranial EDH?', 'EDH داخل جمجمه چیست؟'), L('Blut zwischen Schädel und Dura.', 'Blood between skull and dura.', 'خون بین جمجمه و dura.'), L('Es ist meist traumatisch, extraaxial und durch Ablösung der Dura von der Kalotte begrenzt.', 'It is usually traumatic and extra-axial, formed by stripping the dura from the skull.', 'معمولاً تروماتیک و extra-axial است و با جداشدن dura از کالواریا شکل می‌گیرد.')),
  FC('shape', L('CT', 'CT', 'CT'), L('Welche Form hat ein typisches EDH?', 'What shape does a typical EDH have?', 'شکل تیپیک EDH چیست؟'), L('Bikonvex bzw. linsenförmig.', 'Biconvex or lentiform.', 'عدسی‌شکل یا biconvex.'), L('Die feste durale Anheftung an den Suturen begrenzt die Ausbreitung und erzeugt die konvexe Innenkante.', 'Firm dural attachment at sutures limits spread and creates the convex inner margin.', 'اتصال محکم dura در sutures گسترش را محدود و حاشیه داخلی محدب ایجاد می‌کند.')),
  FC('sutures', L('Anatomie', 'Anatomy', 'آناتومی'), L('Kann ein EDH Suturen überschreiten?', 'Can an EDH cross sutures?', 'آیا EDH از sutures عبور می‌کند؟'), L('Meist nein.', 'Usually not.', 'معمولاً خیر.'), L('Ausnahmen sind bei Suturdiastase oder lokal schwächerer duraler Adhärenz möglich.', 'Exceptions occur with suture diastasis or locally weaker dural attachment.', 'در suture diastasis یا اتصال موضعی ضعیف‌تر dura استثنا ممکن است.')),
  FC('artery', L('Pathomechanismus', 'Mechanism', 'مکانیسم'), L('Welche Arterie ist klassisch beim temporalen EDH verletzt?', 'Which artery is classically injured in temporal EDH?', 'کدام شریان در EDH تمپورال کلاسیک آسیب می‌بیند؟'), L('A. meningea media.', 'Middle meningeal artery.', 'middle meningeal artery.'), L('Eine Fraktur im Pterionbereich kann die Arterie an der Schädelinnenseite zerreißen und eine rasch wachsende Blutung verursachen.', 'A pterional fracture may tear the artery along the inner skull and cause rapid expansion.', 'شکستگی pterion می‌تواند شریان سطح داخلی جمجمه را پاره و خونریزی سریع ایجاد کند.')),
  FC('venous', L('Pathomechanismus', 'Mechanism', 'مکانیسم'), L('Sind alle EDH arteriell?', 'Are all EDHs arterial?', 'آیا همه EDHها شریانی‌اند؟'), L('Nein.', 'No.', 'خیر.'), L('Verletzungen eines duralen Sinus oder diploischer Venen sind bei parietalen, okzipitalen und posterioren EDH wichtig und können langsamer verlaufen.', 'Dural sinus or diploic venous injury is important in parietal, occipital and posterior fossa EDH and may evolve more slowly.', 'آسیب dural sinus یا diploic veins در EDH پاریتال، occipital و posterior fossa مهم است و ممکن است آهسته‌تر پیش برود.')),
  FC('fracture', L('Knochen', 'Bone', 'استخوان'), L('Was muss bei jedem EDH im Knochenfenster gesucht werden?', 'What must be sought on bone windows in every EDH?', 'در bone window هر EDH چه چیزی باید جست‌وجو شود؟'), L('Fraktur und Suturdiastase.', 'Fracture and suture diastasis.', 'شکستگی و suture diastasis.'), L('Der Frakturverlauf kann die Blutungsquelle erklären; dünne Rekonstruktionen und MPR erhöhen die Nachweisrate.', 'The fracture course may explain the bleeding source; thin reconstructions and MPR improve detection.', 'مسیر شکستگی می‌تواند منشأ خونریزی را توضیح دهد و برش نازک و MPR حساسیت را بالا می‌برد.')),
  FC('swirl', L('CT', 'CT', 'CT'), L('Was bedeutet ein Swirl sign im EDH?', 'What does a swirl sign in EDH suggest?', 'Swirl sign در EDH چه مفهومی دارد؟'), L('Mögliche aktive Blutung.', 'Possible active bleeding.', 'احتمال خونریزی فعال.'), L('Niedrig dichte Anteile können frisches ungeronnenes Blut darstellen; der Befund ist mit Expansion assoziiert, aber nicht spezifisch.', 'Low-attenuation areas may be fresh unclotted blood; the sign is associated with expansion but is not specific.', 'نواحی کم‌دانسیته ممکن است خون تازه لخته‌نشده باشند؛ با expansion ارتباط دارد ولی اختصاصی نیست.')),
  FC('trauma-window', L('CT-Technik', 'CT technique', 'تکنیک CT'), L('Welche Fensterweite hilft beim EDH am Kalottenrand?', 'What window width helps assess EDH along the skull?', 'چه window width برای EDH کنار جمجمه مفید است؟'), L('Etwa 100–150 HU.', 'About 100–150 HU.', 'حدود 100–150 HU.'), L('Das breite Traumafenster trennt hyperdenses Blut besser von der sehr dichten Schädelkalotte; das Knochenfenster bleibt zusätzlich nötig.', 'A wide trauma window better separates dense blood from skull; bone windows remain necessary.', 'trauma window پهن خون پر دانسیته را بهتر از استخوان جدا می‌کند؛ bone window همچنان لازم است.')),
  FC('mass-effect', L('Notfall', 'Emergency', 'اورژانس'), L('Welche Masseneffekt-Zeichen müssen beim EDH berichtet werden?', 'Which mass-effect signs must be reported in EDH?', 'کدام علائم اثر فشاری در EDH باید گزارش شوند؟'), L('Shift, Zisternen, Ventrikel und Herniation.', 'Shift, cisterns, ventricles and herniation.', 'shift، cisterns، بطن‌ها و herniation.'), L('Diese Befunde sind für die Dringlichkeit oft wichtiger als die reine Hämatomform.', 'These findings often matter more for urgency than the shape alone.', 'این یافته‌ها برای فوریت اغلب مهم‌تر از شکل هماتوم‌اند.')),
  FC('posterior', L('Sonderlokalisation', 'Specific location', 'محل خاص'), L('Warum ist ein posteriores EDH zeitkritisch?', 'Why is posterior fossa EDH time critical?', 'چرا EDH posterior fossa time-critical است؟'), L('Wenig Reserveraum.', 'Little reserve space.', 'فضای ذخیره کم.'), L('Schon kleine Volumina können den Hirnstamm oder vierten Ventrikel komprimieren und einen Hydrozephalus auslösen.', 'Small volumes may compress the brainstem or fourth ventricle and cause hydrocephalus.', 'حجم کم می‌تواند brainstem یا بطن چهارم را بفشارد و hydrocephalus ایجاد کند.')),
  FC('sdh', L('Differenzialdiagnose', 'Differential', 'تشخیص افتراقی'), L('EDH versus SDH: wichtigste Formregel?', 'EDH versus SDH: key shape rule?', 'قاعده اصلی شکل EDH در برابر SDH چیست؟'), L('EDH bikonvex, SDH sichelförmig.', 'EDH lentiform, SDH crescentic.', 'EDH عدسی، SDH هلالی.'), L('EDH ist meist suturbegrenzt; SDH kann Suturen überschreiten, wird aber durch Falx und Tentorium begrenzt.', 'EDH is usually suture limited; SDH may cross sutures but is limited by falx and tentorium.', 'EDH معمولاً به suture محدود است؛ SDH می‌تواند عبور کند ولی به falx و tentorium محدود می‌شود.'), L('EDH → Linse + Suturgrenze\nSDH → Sichel + Falx/Tentorium')),
  FC('volume', L('Management', 'Management', 'مدیریت'), L('Welches EDH-Volumen spricht unabhängig vom GCS für Evakuation?', 'What EDH volume supports evacuation regardless of GCS?', 'چه حجم EDH مستقل از GCS به نفع تخلیه است؟'), L('Über 30 cm³.', 'Over 30 cm³.', 'بیش از 30 cm³.'), L('Der Schwellenwert stammt aus etablierten neurochirurgischen Empfehlungen und muss mit Klinik und Masseneffekt kombiniert werden.', 'This threshold comes from established neurosurgical guidance and must be integrated with clinical status and mass effect.', 'این آستانه از توصیه‌های neurosurgical می‌آید و باید با وضعیت بالینی و اثر فشاری ترکیب شود.')),
  FC('observe', L('Management', 'Management', 'مدیریت'), L('Welche Kurzformel beschreibt ein beobachtbares EDH?', 'What short rule describes an EDH suitable for observation?', 'قاعده کوتاه EDH قابل observation چیست؟'), L('<30 cm³, <15 mm, <5 mm, GCS >8, kein Defizit.', '<30 cm³, <15 mm, <5 mm, GCS >8, no deficit.', '<30 cm³، <15 mm، <5 mm، GCS >8، بدون deficit.'), L('Beobachtung ist nur mit enger neurologischer Kontrolle, serieller CT und sofortiger OP-Bereitschaft vertretbar.', 'Observation is acceptable only with close neurology, serial CT and immediate surgical capability.', 'observation فقط با پایش نزدیک، CT سریال و آمادگی فوری جراحی قابل قبول است.'), L('Volumen <30 + Dicke <15 + Shift <5 + GCS >8 + kein Defizit → eng beobachten')),
  FC('anisocoria', L('Notfall', 'Emergency', 'اورژانس'), L('Was bedeutet ipsilaterale Mydriasis beim wachsenden EDH?', 'What does ipsilateral mydriasis mean in an enlarging EDH?', 'mydriasis همان‌طرف در EDH در حال رشد چه مفهومی دارد؟'), L('Drohende Unkusherniation.', 'Impending uncal herniation.', 'uncal herniation قریب‌الوقوع.'), L('Die Kompression des N. III ist ein spätes und hochdringliches Zeichen; mit GCS-Abfall ist sofortige operative Eskalation nötig.', 'CN III compression is a late, highly urgent sign; with falling GCS it demands immediate surgical escalation.', 'فشار بر CN III علامت دیررس و بسیار اورژانسی است و همراه افت GCS نیاز به اقدام جراحی فوری دارد.')),
  FC('lucid', L('Klinik', 'Presentation', 'بالین'), L('Ist ein luzides Intervall für die EDH-Diagnose erforderlich?', 'Is a lucid interval required to diagnose EDH?', 'آیا lucid interval برای تشخیص EDH لازم است؟'), L('Nein.', 'No.', 'خیر.'), L('Es ist klassisch, kommt aber nicht bei allen Patienten vor und darf weder zum Ausschluss noch zur Beruhigung verwendet werden.', 'It is classic but not universal and must not be used to exclude EDH or reassure.', 'علامت کلاسیک است اما همیشگی نیست و نبود آن نباید EDH را رد یا اطمینان کاذب ایجاد کند.')),
  FC('report', L('Befundung', 'Reporting', 'گزارش'), L('Welche Kernangaben gehören in jeden EDH-Befund?', 'What belongs in every EDH report?', 'چه مواردی باید در هر گزارش EDH باشد؟'), L('Ort, Größe, Shift, Herniation, Fraktur, Begleitverletzungen.', 'Site, size, shift, herniation, fracture and associated injuries.', 'محل، اندازه، shift، herniation، شکستگی و آسیب‌های همراه.'), L('Zusätzlich Heterogenität oder Extravasation nennen und bei kritischen Befunden direkt neurochirurgisch kommunizieren.', 'Also report heterogeneity or extravasation and directly communicate critical findings to neurosurgery.', 'ناهمگنی یا extravasation نیز ذکر و یافته بحرانی مستقیم به neurosurgery اطلاع داده شود.')),
  FC('abc2', L('Messung', 'Measurement', 'اندازه‌گیری'), L('Kann ABC/2 das EDH-Volumen exakt bestimmen?', 'Does ABC/2 measure EDH volume exactly?', 'آیا ABC/2 حجم EDH را دقیق می‌دهد؟'), L('Nein, nur näherungsweise.', 'No, only approximately.', 'خیر، فقط تقریبی.'), L('Die bikonvexe, teils unregelmäßige Form kann die Schätzung verzerren; planimetrische Software ist genauer.', 'The lentiform and sometimes irregular shape may bias the estimate; planimetric software is more accurate.', 'شکل عدسی و گاهی نامنظم می‌تواند تخمین را منحرف کند؛ نرم‌افزار planimetric دقیق‌تر است.')),
  FC('workflow', L('Notfall', 'Emergency', 'اورژانس'), L('EDH mit klinischer Verschlechterung: nächster Schritt?', 'EDH with clinical deterioration: next step?', 'EDH همراه افت بالینی: قدم بعدی؟'), L('Sofort eskalieren.', 'Escalate immediately.', 'اقدام فوری.'), L('Neurologische Reevaluation, Notfall-CT und neurochirurgische Entscheidung dürfen nicht bis zur Routinekontrolle warten.', 'Neurological reassessment, emergency CT and neurosurgical decision must not wait for routine follow-up.', 'ارزیابی نورولوژیک، CT اورژانسی و تصمیم neurosurgical نباید تا کنترل روتین به تأخیر بیفتد.'), L('GCS↓ / Anisokorie → sofortige CT + Neurosurgery → Evakuation prüfen')),
]
