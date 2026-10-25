const L = (de, en, fa) => ({ de, en, fa })

export const AK_LUXATION_LESSON = {
  id: 'ak-luxation',
  title: L(
    'Akromioklavikuläre Luxation',
    'Acromioclavicular Joint Dislocation',
    'لوکساسیون مفصل آکرومیوکلاویکولار'
  ),
  definition: L("Traumatische Verletzung der AC-Stabilisatoren von Banddistorsion bis Ruptur mit Verlagerung, nach Rockwood in sechs Typen eingeteilt.", "Traumatic injury of the AC stabilisers ranging from ligament sprain to rupture with displacement, classified into six Rockwood types.", "آسیب تروماتیک تثبیت‌کننده‌های AC، از کشیدگی رباط تا پارگی همراه جابجایی، در شش نوع راک‌وود طبقه‌بندی می‌شود."),
  breadcrumb: L('AC-Luxation', 'AC Joint Dislocation', 'لوکساسیون AC'),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key Point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Caution', 'هشدار'),
  toc: L('Inhalt', 'Contents', 'فهرست'),

  heroCards: [
    {
      value: L('Sturz', 'Fall', 'افتادن'),
      label: L('Hauptmechanismus', 'Main mechanism', 'مکانیسم اصلی'),
      text: L('auf Schulter bei adduziertem Arm', 'on shoulder with adducted arm', 'روی شانه با بازوی آدوکته'),
    },
    {
      value: L('Typ I–VI', 'Type I–VI', 'نوع I–VI'),
      label: L('Rockwood', 'Rockwood', 'راک‌وود'),
      text: L('Schweregrad-Klassifikation', 'Severity classification', 'طبقه‌بندی شدت آسیب'),
    },
    {
      value: L('CCD', 'CCD', 'CCD'),
      label: L('Schlüssel­parameter', 'Key parameter', 'پارامتر کلیدی'),
      text: L('korakoklavikuläre Distanz im Seitenvergleich', 'coracoclavicular distance vs. contralateral side', 'فاصله کوراکوکلاویکولار در مقایسه با طرف مقابل'),
    },
  ],

  sections: [
    { id: 'anatomie', icon: '🦴', label: L('Anatomie & Bänder', 'Anatomy & Ligaments', 'آناتومی و رباط‌ها') },
    { id: 'mechanismus', icon: '⚡', label: L('Mechanismus', 'Mechanism', 'مکانیسم') },
    { id: 'bildgebung', icon: '🔬', label: L('Bildgebung', 'Imaging', 'تصویربرداری') },
    { id: 'rockwood', icon: '📊', label: L('Rockwood­klassifikation', 'Rockwood Classification', 'طبقه‌بندی راک‌وود'), emphasis: true },
    { id: 'therapie', icon: '💊', label: L('Therapie', 'Treatment', 'درمان') },
    { id: 'takehome', icon: '✅', label: L('Take-home', 'Take-home', 'جمع‌بندی') },
  ],

  anatomie: {
    title: L('Anatomie des AC-Gelenks', 'Anatomy of the AC Joint', 'آناتومی مفصل AC'),
    lead: L(
      'Das Akromioklavikulargelenk verbindet Klavikula und Akromion. Seine Stabilität hängt von zwei Bandgruppen ab.',
      'The acromioclavicular joint connects the clavicle to the acromion. Its stability depends on two ligament groups.',
      'مفصل آکرومیوکلاویکولار کلاویکول را به آکرومیون متصل می‌کند. پایداری آن به دو گروه رباط بستگی دارد.'
    ),
    items: [
      {
        icon: '🔵',
        title: L('AC-Bänder (akromioklavikulär)', 'AC Ligaments (acromioclavicular)', 'رباط‌های AC (آکرومیوکلاویکولار)'),
        text: L(
          'Oberes und unteres AC-Band stabilisieren das Gelenk gegen horizontale Kräfte (anteriore/posteriore Verschiebung). Wichtigste Stabilisatoren für die AP-Translationsstabilität.',
          'Superior and inferior AC ligaments stabilise the joint against horizontal forces (anterior/posterior translation). Primary stabilisers for AP translational stability.',
          'رباط‌های فوقانی و تحتانی AC مفصل را در برابر نیروهای افقی (جابجایی قدامی/خلفی) تثبیت می‌کنند. مهم‌ترین تثبیت‌کننده‌های پایداری AP.'
        ),
      },
      {
        icon: '🟠',
        title: L('CC-Bänder (korakoklavikulär)', 'CC Ligaments (coracoclavicular)', 'رباط‌های CC (کوراکوکلاویکولار)'),
        text: L(
          'Trapezoid- und Konoidband stabilisieren gegen vertikale Kräfte (superiore Dislokation der Klavikula). Die CC-Distanz ist der Schlüsselmesswert für den Schweregrad.',
          'Trapezoid and conoid ligaments stabilise against vertical forces (superior clavicular displacement). CC distance is the key measurement for severity.',
          'رباط‌های ترپزوئید و کونوئید در برابر نیروهای عمودی (جابجایی فوقانی کلاویکول) تثبیت می‌کنند. فاصله CC پارامتر کلیدی برای ارزیابی شدت است.'
        ),
      },
      {
        icon: '💪',
        title: L('Muskuläre Stabilisatoren', 'Muscular Stabilisers', 'تثبیت‌کننده‌های عضلانی'),
        text: L("Deltoideus und Trapezius sind mit der lateralen Klavikula und der deltotrapezialen Faszie verbunden. Bei ausgeprägten Verletzungen können diese faszialen Ansätze abgelöst sein; nicht mit einer vollständigen Ruptur des Muskelbauchs gleichsetzen.", "Deltoid and trapezius attach to the lateral clavicle and deltotrapezial fascia. Severe injuries may strip these fascial attachments; this is not synonymous with complete muscle-belly rupture.", "دلتوئید و تراپزیوس به بخش جانبی کلاویکول و فاسیای دلتوتراپزیوس متصل‌اند. در آسیب‌های شدید، این اتصالات فاسیایی ممکن است جدا شوند؛ این یافته معادل پارگی کامل شکم عضله نیست."),
      },
    ],
    key: L("CC-Bänder tragen wesentlich zur vertikalen, AC-Kapsel/Bänder besonders zur horizontalen Stabilität bei; ihre Beiträge hängen auch von Richtung und Ausmaß der Last ab. Rockwood berücksichtigt Bandverletzung sowie Richtung und Ausmaß der Verlagerung.", "CC ligaments substantially contribute to vertical stability and the AC capsule/ligaments particularly to horizontal stability; contributions also depend on load direction and magnitude. Rockwood incorporates ligament injury and displacement direction/extent.", "رباط‌های CC سهم مهمی در پایداری عمودی دارند و کپسول/رباط‌های AC به‌ویژه در پایداری افقی نقش دارند؛ سهم آن‌ها به جهت و مقدار بار نیز وابسته است. راک‌وود آسیب رباط و جهت و میزان جابجایی را در نظر می‌گیرد."),
  },

  mechanismus: {
    title: L('Verletzungsmechanismus', 'Injury Mechanism', 'مکانیسم آسیب'),
    lead: L(
      'AC-Luxationen entstehen meist durch direkte Krafteinwirkung auf die Schulter.',
      'AC dislocations usually result from direct force on the shoulder.',
      'لوکساسیون AC معمولاً از طریق نیروی مستقیم بر شانه ایجاد می‌شود.'
    ),
    items: [
      {
        icon: '⬇️',
        title: L('Direkter Mechanismus (häufig)', 'Direct mechanism (common)', 'مکانیسم مستقیم (شایع)'),
        text: L(
          'Sturz auf die Schulterseite bei adduziertem Arm → Kraft auf Akromion → Akromion wird inferior gedrängt, Klavikula bleibt durch Muskeln in Position → Bänderriss.',
          'Fall onto the side of the shoulder with the arm adducted → force on the acromion → acromion is pushed inferiorly while the clavicle is held in position by muscles → ligament failure.',
          'افتادن روی طرف شانه با بازوی آدوکته → نیرو روی آکرومیون → آکرومیون به سمت پایین رانده می‌شود در حالی که کلاویکول توسط عضلات در جای خود باقی می‌ماند → پارگی رباط.'
        ),
      },
      {
        icon: '↗️',
        title: L('Indirekter Mechanismus (selten)', 'Indirect mechanism (rare)', 'مکانیسم غیرمستقیم (نادر)'),
        text: L(
          'Sturz auf die ausgestreckte Hand → axiale Kraftübertragung nach proximal → Humeruskopf stößt gegen Akromion von kaudal.',
          'Fall on the outstretched hand → axial force transmission proximally → humeral head strikes the acromion from below.',
          'افتادن روی دست کشیده → انتقال نیرو به صورت محوری به سمت پروگزیمال → سر هومروس از پایین به آکرومیون برخورد می‌کند.'
        ),
      },
      {
        icon: '🏃',
        title: L('Epidemiologie', 'Epidemiology', 'اپیدمیولوژی'),
        text: L(
          'Häufige Sportverletzung (Kontaktsportarten, Radsport, Wintersport). Häufiger bei Männern (4:1). Betrifft bevorzugt das 20.–40. Lebensjahr.',
          'Common sports injury (contact sports, cycling, winter sports). More common in men (4:1). Predominant age: 20–40 years.',
          'آسیب ورزشی شایع (ورزش‌های تماسی، دوچرخه‌سواری، ورزش‌های زمستانی). در مردان شایع‌تر (۴:۱). سن غالب: ۲۰–۴۰ سال.'
        ),
      },
    ],
  },

  bildgebung: {
    title: L('Radiologische Diagnostik', 'Radiological Diagnosis', 'تشخیص رادیولوژیک'),
    lead: L(
      'Das konventionelle Röntgen ist die Basisbildgebung. Die korakoklavikuläre Distanz (CCD) ist der wichtigste Messparameter.',
      'Conventional X-ray is the primary imaging modality. The coracoclavicular distance (CCD) is the key measurement parameter.',
      'رادیوگرافی معمولی تصویربرداری پایه است. فاصله کوراکوکلاویکولار (CCD) مهم‌ترین پارامتر اندازه‌گیری است.'
    ),
    headers: [
      L('Aufnahme', 'View', 'نمای رادیوگرافی'),
      L('Technik', 'Technique', 'تکنیک'),
      L('Aussage', 'Information gained', 'اطلاعات به‌دست‌آمده'),
    ],
    rows: [
      [
        L('Schulter AP', 'Shoulder AP', 'شانه AP'),
        L('Stehend, beide Seiten zum Vergleich', 'Standing, both sides for comparison', 'ایستاده، هر دو طرف برای مقایسه'),
        L('CCD-Messung, Hochstand der Klavikula, Achsfehlstellung', 'CCD measurement, clavicular elevation, axis malalignment', 'اندازه‌گیری CCD، ارتفاع کلاویکول، ناهنجاری محوری'),
      ],
      [
        L('Schulter axial', "Shoulder axial", "شانه محوری"),
        L('Standardprojektionen', 'Standard projections', 'نماهای استاندارد'),
        L('Posteriore Dislokation (Typ IV)', 'Posterior dislocation (Type IV)', 'جابجایی خلفی (نوع IV)'),
      ],
      [
        L('Panorama-/Belastungsaufnahme (selektiv)', 'Panoramic/weighted view (selective)', 'نمای پانورامیک/استرس (انتخابی)'),
        L('PDF beschreibt beidseitig 10–15 kg pro Seite; Zusatzbelastung nur nach klinischer Fragestellung/lokalem Protokoll erwägen.', 'The PDF describes 10–15 kg per side bilaterally; consider added load only for a specific clinical question/local protocol.', 'PDF بار دوطرفه ۱۰–۱۵ کیلوگرم در هر طرف را توصیف می‌کند؛ بارگذاری افزوده را فقط بر اساس پرسش بالینی مشخص/پروتکل محلی در نظر بگیرید.'),
        L('CCD-Seitenvergleich; Evidenz zum Zusatznutzen gewichteter Aufnahmen ist widersprüchlich, daher keine Routineaufnahme.', 'Compare CCD side to side; evidence for added value of weighted views conflicts, so they are not routine.', 'CCD را در دو طرف مقایسه کنید؛ شواهد ارزش افزوده نماهای وزنه‌دار متناقض است، بنابراین نمای روتین نیست.'),
      ],
    ],
    ccdNote: {
      title: L('CCD-Messung', 'CCD Measurement', 'اندازه‌گیری CCD'),
      text: L(
      'Die PDF nennt 11–13 mm als Orientierungsbereich; publizierte radiologische Referenzen geben denselben Bereich an, weisen aber auf individuelle Varianz hin. Technik beachten und möglichst mit der Gegenseite vergleichen. Zur Zusatzklassifikation durch Belastungsaufnahmen ist die Evidenz widersprüchlich: Nordin et al. (online 2020, Ausgabe 2021; doi:10.1177/0284185120939270) fanden keinen signifikanten Klassifikationsgewinn; Ibrahim et al. (2015; doi:10.1016/j.injury.2015.06.028) berichteten einen Nutzen bilateraler gewichteter Aufnahmen. Die PDF-Angabe 10–15 kg pro Seite ist eine Quellangabe, keine Routineempfehlung; andere Referenzen nennen geringere Lasten.',
      'The PDF gives 11–13 mm as an orienting range; published radiology references report the same range but note individual variation. Account for technique and compare with the other side when possible. Evidence on added classification from weighted views conflicts: Nordin et al. (online 2020, issue 2021; doi:10.1177/0284185120939270) found no significant classification gain, while Ibrahim et al. (2015; doi:10.1016/j.injury.2015.06.028) reported value from bilateral weighted views. The PDF’s 10–15 kg per-side load is a source-specific statement, not a routine recommendation; other references describe lower loads.',
      'PDF محدوده ۱۱ تا ۱۳ میلی‌متر را به‌عنوان راهنما ذکر می‌کند؛ منابع منتشرشده رادیولوژی نیز همین محدوده را گزارش می‌کنند، اما به تفاوت فردی اشاره دارند. تکنیک را در نظر بگیرید و در صورت امکان طرف مقابل را مقایسه کنید. شواهد ارزش افزوده نماهای وزنه‌دار برای طبقه‌بندی متناقض است: نوردین و همکاران (انتشار آنلاین ۲۰۲۰، شماره ۲۰۲۱؛ doi:10.1177/0284185120939270) بهبود معناداری نیافتند، اما ابراهیم و همکاران (۲۰۱۵؛ doi:10.1016/j.injury.2015.06.028) برای نماهای وزنه‌دار دوطرفه ارزش گزارش کردند. بار ۱۰ تا ۱۵ کیلوگرم در هر طرف، نقل قول اختصاصی از PDF است و توصیه‌ای برای استفاده روتین نیست؛ منابع دیگر بار کمتری ذکر می‌کنند.'
      ),
    },
    caseTitle: L('Fallbeispiel Normal / Typ I – AP-Aufnahme (rID:48600)', 'Case: Normal / Type I – AP view (rID:48600)', 'مورد: طبیعی / نوع I – نمای AP (rID:48600)'),
    radiopaediaUrl: 'https://radiopaedia.org/cases/48600/play',
    caseImages: [
      {
        src: '/ak-luxation/schulter-ap-rid48600.png',
        caption: L(
          'Schulter AP – Normal-/Typ-I-Befund: annotierte CCD (gelb) und AC-Gelenkspalt (lila). Kein Hochstand der Klavikula.',
          'Shoulder AP – Normal/Type I: annotated CCD (yellow) and AC joint space (purple). No clavicular elevation.',
          'شانه AP – طبیعی/نوع I: CCD علامت‌گذاری‌شده (زرد) و فضای مفصل AC (بنفش). بدون ارتفاع کلاویکول.'
        ),
      },
    ],
    cave: L(
      'Eine posteriore Dislokation (Typ IV) kann im AP-Bild schwer erkennbar sein. Bei klinischem oder radiologischem Verdacht ergänzt eine axiale/axilläre Projektion die Abklärung.',
      'Posterior displacement (Type IV) can be difficult to see on the AP view. If clinically or radiographically suspected, add an axial/axillary projection for assessment.',
      'جابجایی خلفی (نوع IV) ممکن است در نمای AP به‌سختی دیده شود. در صورت شک بالینی یا رادیوگرافیک، نمای محوری/آگزیلاری را برای ارزیابی اضافه کنید.'
    ),
  },

  rockwood: {
    title: L('Rockwood-Klassifikation', 'Rockwood Classification', 'طبقه‌بندی راک‌وود'),
    lead: L(
      'Die weit verbreitete Rockwood-Klassifikation unterscheidet sechs Verletzungstypen anhand der Bandverletzung und der Richtung/des Ausmaßes der Dislokation. Die PDF beschreibt die ältere Tossy-Klassifikation (I–III) als veraltet.',
      'The widely used Rockwood classification distinguishes six injury types by ligament injury and direction/degree of displacement. The PDF describes the older Tossy classification (I–III) as outdated.',
      'طبقه‌بندی رایج راک‌وود شش نوع آسیب را بر اساس آسیب رباط‌ها و جهت/میزان جابجایی متمایز می‌کند. PDF طبقه‌بندی قدیمی‌تر توسی (I–III) را منسوخ می‌داند.'
    ),
    illustrationSrc: '/ak-luxation/rockwood-klassifikation.png',
    illustrationAlt: L(
      'Rockwood-Schema I–VI (Radiopaedia): I Distorsion ohne Dislokation; II AC-Ruptur/CC-Zerrung; III AC- und CC-Ruptur; IV posterior; V ausgeprägter Hochstand mit deltotrapezialer Ablösung; VI inferior.',
      'Rockwood schematic I–VI (Radiopaedia): I sprain without displacement; II AC tear/CC sprain; III AC and CC rupture; IV posterior; V marked elevation with deltotrapezial detachment; VI inferior.',
      'نمای شماتیک راک‌وود I–VI (رادیوپدیا): I کشیدگی بدون جابجایی؛ II پارگی AC/کشیدگی CC؛ III پارگی AC و CC؛ IV خلفی؛ V ارتفاع شدید با جداشدگی دلتوتراپزیوس؛ VI تحتانی.'
    ),
    headers: [
      L('Typ', 'Type', 'نوع'),
      L('Pathologie', 'Pathology', 'پاتولوژی'),
      L('Radiologischer Befund', 'Radiological finding', 'یافته رادیولوژیک'),
      L('Merkmal', 'Key feature', 'ویژگی کلیدی'),
    ],
    rows: [
      [
        L('I', 'I', 'I'),
        L('Zerrung (partielle Ruptur) AC-Bänder', 'Sprain (partial rupture) of AC ligaments', 'کشش (پارگی جزئی) رباط‌های AC'),
        L('Normalbefund', 'Normal X-ray', 'رادیوگرافی طبیعی'),
        L('Klinische Diagnose; kein Hochstand', 'Clinical diagnosis; no elevation', 'تشخیص بالینی؛ بدون ارتفاع'),
      ],
      [
        L('II', 'II', 'II'),
        L('Ruptur der AC-Bänder/Kapsel; CC-Bänder gezerrt oder partiell verletzt', 'Rupture of AC ligaments/capsule; CC ligaments sprained or partially injured', 'پارگی رباط‌ها/کپسول AC؛ کشیدگی یا آسیب جزئی رباط‌های CC'),
        L('Leichte Dehiszenz; CCD-Zunahme < 25 % gegenüber der unverletzten Seite', 'Mild widening; CCD increase <25% compared with the uninjured side', 'اتساع خفیف؛ افزایش CCD کمتر از ۲۵٪ در مقایسه با سمت سالم'),
        L('Im Seitenvergleich messen; absolute CCD-Werte individuell variieren', 'Measure side to side; absolute CCD values vary between individuals', 'اندازه‌گیری در مقایسه دو طرف؛ مقدار مطلق CCD بین افراد متفاوت است'),
      ],
      [
        L('III', 'III', 'III'),
        L('Ruptur AC- und CC-Bänder', 'Rupture of both AC and CC ligaments', 'پارگی رباط‌های AC و CC'),
        L('Klavikula über dem Akromion; CCD-Zunahme 25–100 % gegenüber der unverletzten Seite', 'Clavicle elevated above the acromion; CCD increase 25–100% versus the uninjured side', 'کلاویکول بالاتر از آکرومیون؛ افزایش CCD به میزان ۲۵ تا ۱۰۰٪ نسبت به سمت سالم'),
        L('Therapie kontrovers; keine automatische OP-Indikation', 'Treatment is debated; this is not an automatic indication for surgery', 'درمان مورد اختلاف است؛ این یافته به‌تنهایی اندیکاسیون قطعی جراحی نیست'),
      ],
      [
        L('IV', 'IV', 'IV'),
        L('AC-Bänder rupturiert; posteriore Dislokation in/durch den M. trapezius; CC-Verletzung möglich', 'AC ligaments torn; posterior displacement into/through trapezius; CC injury may occur', 'رباط‌های AC پاره؛ جابجایی خلفی به داخل/از میان تراپزیوس؛ احتمال آسیب CC'),
        L('Axial-/Axillärprojektion bei Verdacht ergänzen', 'Add an axial/axillary view when suspected', 'در صورت شک، نمای محوری/آگزیلاری اضافه شود'),
      ],
      [
        L('V', 'V', 'V'),
        L("AC-/CC-Verletzung mit ausgeprägter deltotrapezialer Ablösung", "AC/CC injury with extensive deltotrapezial stripping", "آسیب AC/CC همراه جداشدگی شدید دلتوتراپزیوس"),
        L('Deutlicher Hochstand; CCD-Zunahme meist >100 % (ca. 100–300 %) gegenüber der Gegenseite', 'Marked elevation; CCD increase usually >100% (about 100–300%) versus the opposite side', 'ارتفاع واضح؛ افزایش CCD معمولاً بیش از ۱۰۰٪ (حدود ۱۰۰ تا ۳۰۰٪) نسبت به سمت مقابل'),
        L("Ausmaß der Verlagerung und Weichteilablösung gemeinsam werten", "Interpret displacement extent and soft-tissue stripping together", "میزان جابجایی و جداشدگی بافت نرم با هم ارزیابی شوند"),
      ],
      [
        L('VI', 'VI', 'VI'),
        L('Inferiore Dislokation; Verletzungsmuster der Bänder kann variieren', 'Inferior displacement; ligament injury pattern may vary', 'جابجایی تحتانی؛ الگوی آسیب رباط‌ها ممکن است متفاوت باشد'),
        L('Klavikula inferior unter Akromion/Proc. coracoideus luxiert', 'Clavicle dislocated inferiorly below acromion/coracoid', 'کلاویکول به صورت تحتانی زیر آکرومیون/پروسه کوراکوئید جابجا شده'),
        L('Seltenster Typ; meistens schweres Trauma', 'Rarest type; usually severe trauma', 'نادرترین نوع؛ معمولاً تروما شدید'),
      ],
    ],
    tossy: L(
      'Historisch: Tossy I–III entsprechen ungefähr Rockwood I–III; Rockwood ergänzt die Richtungs-/Schweregrade IV–VI. Die Systeme sind nicht in jedem Detail deckungsgleich.',
      'Historical note: Tossy I–III roughly correspond to Rockwood I–III; Rockwood adds the directional/severity grades IV–VI. The systems are not identical in every detail.',
      'تاریخی: توسی I–III تقریباً با راک‌وود I–III مطابقت دارند؛ راک‌وود انواع IV–VI را بر اساس جهت/شدت اضافه می‌کند. این دو طبقه‌بندی در همه جزئیات کاملاً یکسان نیستند.'
    ),
    key: L(
      'Typ I–II werden üblicherweise konservativ behandelt. Bei symptomatischen Typen IV–VI wird eine operative Versorgung häufig empfohlen/erwogen. Typ III bleibt umstritten; Entscheidung individuell nach Befund und Patientenzielen.',
      'Types I–II are usually managed conservatively. Symptomatic Types IV–VI are commonly considered for operative treatment. Type III remains debated; decisions are individualised around findings and patient goals.',
      'نوع I–II معمولاً به‌صورت محافظه‌کارانه درمان می‌شوند. برای انواع علامت‌دار IV–VI اغلب درمان جراحی مطرح یا توصیه می‌شود. درمان نوع III همچنان مورد اختلاف است و بر اساس یافته‌ها و اهداف بیمار فردی‌سازی می‌شود.'
    ),
  },

  therapie: {
    title: L('Therapie', 'Treatment', 'درمان'),
    lead: L(
      'Die Therapiewahl richtet sich nach dem Rockwood-Typ, dem Patientenalter und dem Aktivitätsniveau.',
      'Treatment is guided by Rockwood type, patient age, and activity level.',
      'انتخاب درمان بر اساس نوع راک‌وود، سن بیمار و سطح فعالیت است.'
    ),
    headers: [
      L('Rockwood', 'Rockwood', 'راک‌وود'),
      L('Therapie', 'Treatment', 'درمان'),
      L('Methode / Bemerkung', 'Method / Note', 'روش / توضیح'),
    ],
    rows: [
      [
        L('I und II', 'I and II', 'I و II'),
        L('Konservativ', 'Conservative', 'محافظه‌کارانه'),
        L('Kurzzeitige Ruhigstellung/Schlinge nach Bedarf, Analgesie und schrittweise Mobilisation/Physiotherapie; Dauer nach Symptomen und lokalem Protokoll.', 'Brief sling use as needed, analgesia, and gradual mobilisation/physiotherapy; duration depends on symptoms and local protocol.', 'استفاده کوتاه‌مدت از آویز در صورت نیاز، ضد درد و شروع تدریجی حرکت/فیزیوتراپی؛ مدت بر اساس علائم و پروتکل محلی تعیین می‌شود.'),
      ],
      [
        L('III (kontrovers)', 'III (controversial)', 'III (بحث‌برانگیز)'),
        L('Individuell', 'Individualised', 'فردی'),
        L('Häufig zunächst konservativ. Bei anhaltender funktioneller Einschränkung kann eine operative Option nach individueller orthopädischer Beurteilung und gemeinsamer Entscheidungsfindung erwogen werden; Beruf/Sport allein erzwingen keine OP.', 'Often initially managed conservatively. If functional limitation persists, operative treatment may be considered after individual orthopaedic assessment and shared decision-making; occupation or sport alone does not mandate surgery.', 'اغلب ابتدا درمان محافظه‌کارانه انجام می‌شود. در صورت تداوم محدودیت عملکرد، پس از ارزیابی ارتوپدی فردی و تصمیم‌گیری مشترک می‌توان جراحی را بررسی کرد؛ شغل یا ورزش به‌تنهایی جراحی را الزامی نمی‌کند.'),
      ],
      [
        L('IV, V, VI', 'IV, V, VI', 'IV، V، VI'),
        L('Häufig operative Versorgung erwägen', 'Operative treatment is commonly considered', 'اغلب درمان جراحی بررسی می‌شود'),
        L('Bei symptomatischen Typen IV–VI häufig operative Stabilisierung/Rekonstruktion; Entscheidung nach Orthopädie/Traumatologie, Verletzungsmuster, Begleitverletzungen und Patientenzielen. Verfahren variieren.', 'Symptomatic Types IV–VI are commonly treated with operative stabilisation/reconstruction; the decision depends on orthopaedic/trauma assessment, injury pattern, associated injuries, and patient goals. Techniques vary.', 'در انواع علامت‌دار IV–VI اغلب تثبیت/بازسازی جراحی انجام می‌شود؛ تصمیم بر اساس ارزیابی ارتوپدی/تروما، الگوی آسیب، آسیب‌های همراه و اهداف بیمار است. روش‌ها متفاوت‌اند.'),
      ],
    ],
    key: L(
      'Typ III ist umstritten: Weder die Klassifikation noch ein einzelner Aktivitätsfaktor ordnet automatisch eine Operation an; Befund, Funktion, Beschwerden und Patientenziele gemeinsam bewerten.',
      'Type III management is debated: neither the classification nor one activity factor automatically mandates surgery; consider findings, function, symptoms, and patient goals together.',
      'درمان نوع III مورد اختلاف است: نه طبقه‌بندی و نه یک عامل فعالیت به‌تنهایی جراحی را الزامی نمی‌کند؛ یافته‌ها، عملکرد، علائم و اهداف بیمار را با هم ارزیابی کنید.'
    ),
  },

  takehome: {
    title: L('Take-home Punkte', 'Take-home Points', 'نکات کلیدی'),
    lead: L('Die wichtigsten Punkte auf einen Blick.', 'The most important points at a glance.', 'مهم‌ترین نکات در یک نگاه.'),
    items: [
      {
        title: L('Sturz auf adduzierte Schulter', 'Fall onto adducted shoulder', 'افتادن روی شانه آدوکته'),
        text: L('Direkter Mechanismus → Kraft auf Akromion bei relativ fixierter Klavikula → je nach Ausmaß Verletzung von AC-/CC-Stabilisatoren und gegebenenfalls deltotrapezialen Ansätzen.', 'Direct mechanism → force on the acromion while the clavicle is relatively fixed → depending on severity, injury to AC/CC stabilisers and possibly deltotrapezial attachments.', 'مکانیسم مستقیم → نیرو روی آکرومیون در حالی که کلاویکول نسبتاً ثابت است → بسته به شدت، آسیب تثبیت‌کننده‌های AC/CC و گاهی محل اتصال دلتوتراپزیوس.'),
      },
      {
        title: L('CCD im Seitenvergleich messen', 'Measure CCD on both sides', 'CCD را در مقایسه دو طرف اندازه‌گیری کنید'),
      text: L("Relative Zunahme = (verletzte − unverletzte CCD) / unverletzte CCD × 100 %. Gleiche Technik und Richtungsbefund beachten; gewichtete Aufnahmen nur gezielt bei uneinheitlicher Evidenz.", "Relative increase = (injured − uninjured CCD) / uninjured CCD × 100%. Use comparable technique and assess direction; weighted views are selective because evidence conflicts.", "افزایش نسبی برابر اختلاف CCD سمت آسیب‌دیده و سالم، تقسیم بر CCD سمت سالم و ضرب‌در ۱۰۰ است. تکنیک قابل مقایسه و جهت ارزیابی شوند؛ با توجه به شواهد متناقض، نمای وزنه‌دار انتخابی است."),
      },
      {
        title: L('Typ IV – hintere Dislokation', 'Type IV – posterior displacement', 'نوع IV – جابجایی خلفی'),
        text: L('Bei Verdacht auf posteriore Verlagerung ergänzt eine axiale/axilläre Projektion die AP-Aufnahme; keine einzelne Projektion schließt alle Verletzungen sicher aus.', 'If posterior displacement is suspected, add an axial/axillary projection to the AP view; no single projection excludes every injury with certainty.', 'در صورت شک به جابجایی خلفی، نمای محوری/آگزیلاری را به نمای AP اضافه کنید؛ هیچ نمای منفردی همه آسیب‌ها را با قطعیت رد نمی‌کند.'),
      },
      {
        title: L('Tossy und Rockwood', 'Tossy and Rockwood', 'توسی و راک‌وود'),
        text: L('Tossy I–III entsprechen ungefähr Rockwood I–III; Rockwood ergänzt die Richtungs-/Schweregrade IV–VI. Die Systeme sind nicht in jedem Detail deckungsgleich.', 'Tossy I–III roughly correspond to Rockwood I–III; Rockwood adds directional/severity grades IV–VI. The systems are not identical in every detail.', 'توسی I–III تقریباً با راک‌وود I–III مطابقت دارد؛ راک‌وود انواع IV–VI را بر اساس جهت/شدت اضافه می‌کند. این دو طبقه‌بندی در همه جزئیات کاملاً یکسان نیستند.'),
      },
      {
        title: L('Therapieprinzip', 'Treatment principle', 'اصل درمان'),
        text: L('I–II üblicherweise konservativ; symptomatische IV–VI häufig operativ beurteilt; III umstritten und individuell. Befund, Funktion, Begleitverletzungen und Patientenziele berücksichtigen.', 'I–II usually conservative; symptomatic IV–VI commonly assessed for surgery; III debated and individualised. Consider findings, function, associated injuries, and patient goals.', 'I–II معمولاً محافظه‌کارانه؛ برای IV–VI علامت‌دار اغلب جراحی بررسی می‌شود؛ III مورد اختلاف و فردی‌سازی‌شده است. یافته‌ها، عملکرد، آسیب‌های همراه و اهداف بیمار را لحاظ کنید.'),
      },
    ],
  },
}

const LETTERS = ['A', 'B', 'C', 'D']
const Q = (id, question, options, correct, explanation, wrongExplanations, source) => ({
  id, question, options: options.map((text, i) => ({ id: LETTERS[i], text })),
  correct: LETTERS[correct], explanation, wrongExplanations, source,
})
const F = (id, category, front, answer, explanation, source) => ({ id, category, front, answer, explanation, source })

export const AK_LUXATION_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, [

  Q(`ak-lux-mech-1-${lang}`,
    L("Eine Sportlerin stürzt mit angelegtem Arm direkt auf die seitliche Schulter und hat danach Schmerzen über dem AC-Gelenk. Welche Kraftübertragung erklärt eine typische AC-Verletzung?", "An athlete falls directly onto the lateral shoulder with the arm adducted and develops pain over the AC joint. Which force transmission explains a typical AC injury?", "ورزشکاری با بازوی نزدیک تنه مستقیم روی بخش جانبی شانه می‌افتد و سپس روی مفصل AC درد دارد. کدام مسیر انتقال نیرو آسیب تیپیک AC را توضیح می‌دهد؟")[lang],
    [L("Axialkraft über Hand und Humerus gegen die Unterfläche des Akromions", "Axial load through hand and humerus against the undersurface of the acromion", "نیروی محوری از دست و هومروس به سطح زیرین آکرومیون")[lang],
     L("Direkte Kraft auf das Akromion mit Absenkung des Schultergürtels relativ zur Klavikula", "Direct load onto the acromion with inferior displacement of the shoulder girdle relative to the clavicle", "نیروی مستقیم بر آکرومیون با جابجایی رو به پایین کمربند شانه نسبت به کلاویکول")[lang],
     L("Zug über den abduzierten Arm mit Belastung der unteren Glenohumeralkapsel", "Traction through the abducted arm loading the inferior glenohumeral capsule", "کشش از طریق بازوی دورشده از تنه با بارگذاری کپسول تحتانی گلنوهومرال")[lang],
     L("Hebelwirkung bei Außenrotation mit Abstützung des Humeruskopfs am vorderen Glenoid", "Leverage during external rotation with the humeral head levering against the anterior glenoid", "اثر اهرمی هنگام چرخش خارجی با تکیهٔ سر هومروس به گلنوئید قدامی")[lang]],
    1,
    L("Der beschriebene direkte Aufprall belastet das Akromion und drängt den Schultergürtel relativ zur Klavikula nach unten. AC-/CC-Stabilisatoren können dabei verletzt werden. Ein indirekter Sturzmechanismus ist möglich, entspricht aber nicht dieser Vignette.", "The described direct impact loads the acromion and drives the shoulder girdle inferiorly relative to the clavicle. AC/CC stabilisers may be injured. An indirect fall mechanism is possible but does not match this vignette.", "ضربهٔ مستقیم توصیف‌شده به آکرومیون نیرو وارد می‌کند و کمربند شانه را نسبت به کلاویکول پایین می‌راند. تثبیت‌کننده‌های AC/CC ممکن است آسیب ببینند. مکانیسم غیرمستقیم نیز ممکن است، ولی با این شرح حال تطابق ندارد.")[lang],
    {"A": L("Das beschreibt einen indirekten Mechanismus über die Hand. Hier erfolgte der Aufprall direkt auf die Schulter.", "This describes an indirect mechanism through the hand. Here the impact was directly onto the shoulder.", "این مسیر مکانیسم غیرمستقیم از طریق دست را توصیف می‌کند؛ در اینجا ضربه مستقیم به شانه وارد شده است.")[lang],
     "C": L("Diese Zugbelastung betrifft vor allem die Glenohumeralkapsel und passt nicht zur angegebenen Armhaltung und Aufprallrichtung.", "This traction loads the glenohumeral capsule and does not match the stated arm position and impact direction.", "این کشش بیشتر به کپسول گلنوهومرال نیرو وارد می‌کند و با وضعیت بازو و جهت ضربهٔ گفته‌شده سازگار نیست.")[lang],
     "D": L("Eine Hebelbelastung am Glenoid ist eine andere Verletzungskonstellation als der direkte akromiale Aufprall.", "Leverage against the glenoid is a different injury configuration from direct acromial impact.", "اهرم شدن روی گلنوئید با ضربهٔ مستقیم به آکرومیون، که در این مورد شرح داده شده، متفاوت است.")[lang]},
    "https://www.sciencedirect.com/science/article/pii/S2666638320300190"
  ),

  Q(`ak-lux-band-1-${lang}`,
    L("Im AC-Verletzungsmuster fällt eine vergrößerte korakoklavikuläre Distanz auf. Welche Bandgruppe trägt besonders zur Begrenzung der superioren Klavikulaverschiebung bei?", "An AC injury has an increased coracoclavicular distance. Which ligament group particularly contributes to limiting superior clavicular displacement?", "در الگوی آسیب AC فاصلهٔ کوراکوکلاویکولار افزایش یافته است. کدام گروه رباط به‌ویژه در محدود کردن جابجایی فوقانی کلاویکول نقش دارد؟")[lang],
    [L("AC-Bänder (akromioklavikuläre Bänder)", "AC ligaments (acromioclavicular)", "رباط‌های AC (آکرومیوکلاویکولار)")[lang],
     L("CC-Bänder (Trapezoid + Konoid)", "CC ligaments (trapezoid + conoid)", "رباط‌های CC (ترپزوئید + کونوئید)")[lang],
     L("Glenohumerale Bänder", "Glenohumeral ligaments", "رباط‌های گلنوهومرال")[lang],
     L("Korakohumerale Bänder", "Coracohumeral ligaments", "رباط‌های کوراکوهومرال")[lang]],
    1,
    L("Die CC-Bänder, insbesondere das Konoidband, tragen wesentlich zur Begrenzung superiorer Verschiebung bei. Die AC-Kapsel/Bänder sind für horizontale Stabilität wichtig. Die Beiträge hängen von Richtung und Ausmaß der Belastung ab; dies ist keine vollständige Trennung in rein horizontale und rein vertikale Systeme.", "The CC ligaments, particularly the conoid, substantially restrain superior displacement. The AC capsule/ligaments are important for horizontal stability. Contributions depend on load direction and magnitude; this is not a complete division into exclusively horizontal and vertical systems.", "رباط‌های CC، به‌ویژه کونوئید، نقش مهمی در محدود کردن جابجایی فوقانی دارند. کپسول/رباط‌های AC برای پایداری افقی مهم‌اند. سهم هر ساختار به جهت و مقدار بار وابسته است؛ این تقسیم‌بندی به معنای دو سامانهٔ کاملاً جدا و صرفاً افقی یا عمودی نیست.")[lang],
    {"A": L("AC-Kapsel/Bänder tragen zur Stabilität bei, besonders horizontal. Bei superiorer Verschiebung ist die CC-Gruppe besonders relevant.", "The AC capsule/ligaments contribute to stability, particularly horizontally. The CC group is especially relevant to superior displacement.", "کپسول/رباط‌های AC در پایداری، به‌ویژه افقی، نقش دارند؛ برای جابجایی فوقانی گروه CC اهمیت ویژه دارد.")[lang],
     "C": L("Glenohumerale Bänder stabilisieren das Schulterhauptgelenk, nicht die Verbindung zwischen Korakoid und Klavikula.", "Glenohumeral ligaments stabilise the glenohumeral joint, not the coracoid–clavicle connection.", "رباط‌های گلنوهومرال مفصل گلنوهومرال را پایدار می‌کنند، نه اتصال بین کوراکوئید و کلاویکول را.")[lang],
     "D": L("Das Korakohumeralband zieht zum Humerus. Die gefragten CC-Bänder verbinden Korakoid und Klavikula.", "The coracohumeral ligament runs to the humerus. The requested CC ligaments connect coracoid and clavicle.", "رباط کوراکوهومرال به هومروس می‌رود؛ رباط‌های CC مورد سؤال کوراکوئید را به کلاویکول متصل می‌کنند.")[lang]},
    "https://pubmed.ncbi.nlm.nih.gov/3949839/"
  ),

  Q(`ak-lux-rock-1-${lang}`,
    L("Nach direktem Schultertrauma zeigt der Seitenvergleich eine geringe AC-Gelenkaufweitung und rund 15 % CCD-Zunahme. Axial besteht keine posteriore Verlagerung. Welches Rockwood-Muster passt am besten?", "After direct shoulder trauma, side-to-side comparison shows mild AC joint widening and about a 15% CCD increase. There is no posterior displacement on the axial view. Which Rockwood pattern fits best?", "پس از ضربهٔ مستقیم شانه، مقایسهٔ دو طرف اتساع خفیف مفصل AC و حدود ۱۵٪ افزایش CCD را نشان می‌دهد. در نمای محوری جابجایی خلفی وجود ندارد. کدام الگوی راک‌وود مناسب‌تر است؟")[lang],
    [L("Typ I: Distorsion ohne radiologische Fehlstellung", "Type I: sprain without radiographic malalignment", "نوع I: کشیدگی بدون اختلال راستای رادیوگرافیک")[lang],
     L("Typ II: geringe Aufweitung, CCD normal bis leicht vergrößert", "Type II: mild widening, normal to mildly increased CCD", "نوع II: اتساع خفیف، CCD طبیعی تا کمی افزایش‌یافته")[lang],
     L("Typ III: vollständige AC-/CC-Instabilität mit deutlicherem Hochstand", "Type III: complete AC/CC instability with more marked elevation", "نوع III: ناپایداری کامل AC/CC با ارتفاع بیشتر کلاویکول")[lang],
     L("Typ IV: posteriore Verlagerung der lateralen Klavikula", "Type IV: posterior displacement of the lateral clavicle", "نوع IV: جابجایی خلفی بخش جانبی کلاویکول")[lang]],
    1,
    L("Eine geringe Aufweitung mit kleiner relativer CCD-Zunahme passt zu Typ II. Die üblichen radiologischen Bereiche sind Orientierungen; Aufnahmequalität, Projektionen und das gesamte Verletzungsmuster mitbeurteilen. Das Fehlen posteriorer Verlagerung spricht gegen Typ IV.", "Mild widening with a small relative CCD increase fits Type II. Common radiographic ranges are guides; assess image quality, projections and the entire injury pattern. Absence of posterior displacement argues against Type IV.", "اتساع خفیف همراه افزایش نسبی کم CCD با نوع II سازگار است. محدوده‌های رایج رادیوگرافیک راهنما هستند؛ کیفیت تصویر، نماها و کل الگوی آسیب باید ارزیابی شوند. نبود جابجایی خلفی علیه نوع IV است.")[lang],
    {"A": L("Typ I hat üblicherweise keine radiologisch erkennbare Aufweitung oder Verlagerung. Hier besteht ein kleiner, aber beschriebener Seitenunterschied.", "Type I usually has no radiographically visible widening or displacement. Here a small but specified side-to-side difference is present.", "نوع I معمولاً اتساع یا جابجایی قابل مشاهدهٔ رادیوگرافیک ندارد؛ در اینجا اختلاف خفیف اما مشخص دو طرف توصیف شده است.")[lang],
     "C": L("Typ III geht typischerweise mit größerer vertikaler Separation einher; die geringe Zunahme in diesem Fall passt eher zu Typ II.", "Type III typically has greater vertical separation; this small increase fits Type II better.", "نوع III معمولاً جدایی عمودی بیشتری دارد؛ افزایش خفیف این مورد بیشتر با نوع II تطابق دارد.")[lang],
     "D": L("Typ IV wird durch posteriore Verlagerung bestimmt. Diese ist in der axialen Beurteilung gerade nicht vorhanden.", "Type IV is defined by posterior displacement, which is absent on the stated axial assessment.", "نوع IV با جابجایی خلفی تعریف می‌شود؛ این یافته در ارزیابی محوری توصیف‌شده وجود ندارد.")[lang]},
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12081960/"
  ),

  Q(`ak-lux-rock-2-${lang}`,
    L("Bei kompletter AC-/CC-Verletzung wird ein deutlich ausgeprägterer Hochstand als bei Typ III beschrieben. Welches zusätzliche Muster spricht für Rockwood V?", "In a complete AC/CC injury, elevation is markedly greater than in Type III. Which additional pattern supports Rockwood V?", "در آسیب کامل AC/CC ارتفاع کلاویکول به‌وضوح بیش از نوع III توصیف می‌شود. کدام الگوی افزوده به نفع راک‌وود V است؟")[lang],
    [L("Vorwiegend anteriore Verlagerung bei relativ erhaltener vertikaler Beziehung", "Predominantly anterior displacement with relatively preserved vertical alignment", "جابجایی عمدتاً قدامی با راستای عمودی نسبتاً حفظ‌شده")[lang],
     L("Vorwiegend posteriore Verlagerung in oder durch den Trapezius", "Predominantly posterior displacement into or through trapezius", "جابجایی عمدتاً خلفی به داخل یا از میان تراپزیوس")[lang],
     L("Ausgeprägte vertikale Separation mit deltotrapezialer Ablösung, CCD oft mehr als verdoppelt", "Marked vertical separation with deltotrapezial detachment, often more than doubled CCD", "جدایی عمودی شدید با جداشدگی دلتوتراپزیوس، اغلب با CCD بیش از دو برابر")[lang],
     L("Vorwiegend inferiore Verlagerung unter Akromion oder Korakoid", "Predominantly inferior displacement below acromion or coracoid", "جابجایی عمدتاً تحتانی به زیر آکرومیون یا کوراکوئید")[lang]],
    2,
    L("Typ V umfasst eine AC-/CC-Verletzung mit besonders ausgeprägter vertikaler Separation und deltotrapezialer Ablösung. Übliche CCD-Orientierungsbereiche liegen bei >100–300 % Zunahme gegenüber der Gegenseite. Nicht die Faszie allein oder ein Prozentwert, sondern das gesamte Muster und die klinische Situation bestimmen Klassifikation und weitere Behandlung.", "Type V combines AC/CC injury with particularly marked vertical separation and deltotrapezial stripping. Common CCD guides are an increase of >100–300% over the other side. Neither fascia alone nor one percentage determines classification and treatment; assess the full pattern and clinical situation.", "نوع V ترکیبی از آسیب AC/CC با جدایی عمودی به‌ویژه شدید و جداشدگی دلتوتراپزیوس است. محدودهٔ رایج راهنمای CCD افزایش بیش از ۱۰۰ تا ۳۰۰٪ نسبت به سمت مقابل است. نه فاسیا به‌تنهایی و نه یک درصد منفرد، طبقه‌بندی و درمان را تعیین نمی‌کند؛ کل الگو و وضعیت بالینی باید بررسی شوند.")[lang],
    {"A": L("Eine anteriore Richtung ist nicht das definierende Muster von Typ V; hier stehen ausgeprägter Hochstand und deltotrapeziale Ablösung im Vordergrund.", "An anterior direction does not define Type V; marked elevation and deltotrapezial detachment are the relevant pattern.", "جهت قدامی الگوی تعریف‌کنندهٔ نوع V نیست؛ ارتفاع شدید و جداشدگی دلتوتراپزیوس یافته‌های اصلی‌اند.")[lang],
     "B": L("Posteriore Verlagerung in/durch den Trapezius spricht für Typ IV, nicht für den vorwiegend vertikalen Typ V.", "Posterior displacement into/through trapezius supports Type IV rather than predominantly vertical Type V.", "جابجایی خلفی به داخل یا از میان تراپزیوس به نفع نوع IV است، نه نوع V که عمدتاً عمودی است.")[lang],
     "D": L("Inferiore subakromiale oder subkorakoidale Verlagerung bezeichnet Typ VI.", "Inferior subacromial or subcoracoid displacement denotes Type VI.", "جابجایی تحتانی زیرآکرومیال یا زیرکوراکوئید مشخصهٔ نوع VI است.")[lang]},
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12081960/"
  ),

  Q(`ak-lux-rock-3-${lang}`,
    L("Eine 28-jährige Patientin stürzt beim Radfahren auf die linke Schulter. Das AP-Röntgen wirkt normal. Die axiale Aufnahme zeigt, dass die Klavikula nach dorsal in den M. trapezius verlagert ist. Welcher Rockwood-Typ liegt vor?", "A 28-year-old woman falls onto her left shoulder while cycling. The AP X-ray looks normal. The axial view shows the clavicle displaced posteriorly into the trapezius muscle. Which Rockwood type is this?", "یک زن ۲۸ ساله هنگام دوچرخه‌سواری روی شانه چپ می‌افتد. رادیوگرافی AP طبیعی به نظر می‌رسد. نمای محوری نشان می‌دهد کلاویکول به صورت خلفی در عضله تراپزیوس جابجا شده. کدام نوع راک‌وود است؟")[lang],
    [L("Rockwood I", "Rockwood I", "راک‌وود I")[lang],
     L("Rockwood III", "Rockwood III", "راک‌وود III")[lang],
     L("Rockwood IV", "Rockwood IV", "راک‌وود IV")[lang],
     L("Rockwood VI", "Rockwood VI", "راک‌وود VI")[lang]],
    2,
    L("Rockwood Typ IV: posteriore Verlagerung in/durch den M. trapezius. Bei Verdacht axiale/axilläre Aufnahme ergänzen. Symptomatische Typ-IV-Verletzungen werden häufig operativ beurteilt/behandelt; diese allgemeine Regel ersetzt keine fachärztliche Beurteilung.", "Rockwood Type IV: posterior displacement into/through trapezius. Add an axial/axillary view when suspected. Symptomatic Type IV injuries are commonly assessed/treated surgically; this general pattern does not replace specialist assessment.", "راک‌وود نوع IV: جابجایی خلفی به داخل/از میان تراپزیوس. در صورت شک، نمای محوری/آگزیلاری اضافه کنید. آسیب‌های علامت‌دار نوع IV اغلب برای درمان جراحی ارزیابی می‌شوند؛ این الگوی کلی جایگزین ارزیابی تخصصی نیست.")[lang],
    {"A": L("Bei Typ I besteht eine Distorsion ohne solche Verlagerung. Die dorsale Klavikula ist ein höhergradiges Richtungsmerkmal.", "Type I is a sprain without this displacement. A posteriorly displaced clavicle is a higher-grade directional feature.", "نوع I کشیدگی بدون چنین جابجایی است؛ جابجایی خلفی کلاویکول ویژگی جهت‌دارِ آسیب شدیدتر است.")[lang],
     "B": L("Typ III beschreibt vor allem die vertikale Separation bei AC-/CC-Ruptur. Hier ist die posteriore Richtung entscheidend.", "Type III mainly describes vertical separation with AC/CC rupture. Posterior direction is decisive here.", "نوع III عمدتاً جدایی عمودی همراه پارگی AC/CC را توصیف می‌کند؛ در این مورد جهت خلفی تعیین‌کننده است.")[lang],
     "D": L("Typ VI ist eine inferiore Verlagerung unter Akromion oder Korakoid, nicht dorsal in den Trapezius.", "Type VI is inferior displacement below acromion or coracoid, not posteriorly into trapezius.", "نوع VI جابجایی تحتانی زیر آکرومیون یا کوراکوئید است، نه جابجایی خلفی به داخل تراپزیوس.")[lang]},
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12081960/"
  ),

  Q(`ak-lux-ccd-1-${lang}`,
    L("Nach Schultertrauma beträgt die CCD bei gleicher Aufnahmetechnik rechts 13 mm, links unverletzt 10 mm. Wie wird die relative Zunahme rechts korrekt angegeben?", "After shoulder trauma, using the same radiographic technique, CCD measures 13 mm on the right and 10 mm on the uninjured left. How is the relative right-sided increase correctly reported?", "پس از ترومای شانه، با تکنیک یکسان، CCD در راست ۱۳ میلی‌متر و در چپِ سالم ۱۰ میلی‌متر است. افزایش نسبی سمت راست چگونه درست گزارش می‌شود؟")[lang],
    [L("Zunahme um 3 % gegenüber der unverletzten Seite.", "A 3% increase relative to the uninjured side.", "افزایش ۳٪ نسبت به سمت سالم.")[lang],
     L("Zunahme um 30 % gegenüber der unverletzten Seite.", "A 30% increase relative to the uninjured side.", "افزایش ۳۰٪ نسبت به سمت سالم.")[lang],
     L("Zunahme um 130 % gegenüber der unverletzten Seite.", "A 130% increase relative to the uninjured side.", "افزایش ۱۳۰٪ نسبت به سمت سالم.")[lang],
     L("Zunahme um etwa 23 % gegenüber der unverletzten Seite.", "An approximately 23% increase relative to the uninjured side.", "افزایش حدود ۲۳٪ نسبت به سمت سالم.")[lang]],
    1,
    L("Die Zunahme wird auf die unverletzte Seite bezogen: (13 − 10) / 10 × 100 = 30 %. Ein absoluter Wert von 13 mm reicht zur Klassifikation nicht; Verlagerungsrichtung und gesamte Morphologie mitbeurteilen.", "Reference the increase to the uninjured side: (13 − 10) / 10 × 100 = 30%. An absolute value of 13 mm is insufficient for classification; assess displacement direction and overall morphology.", "افزایش نسبت به سمت سالم محاسبه می‌شود: (۱۳ − ۱۰) / ۱۰ × ۱۰۰ = ۳۰٪. مقدار مطلق ۱۳ میلی‌متر برای طبقه‌بندی کافی نیست؛ جهت جابه‌جایی و مورفولوژی کلی نیز ارزیابی شوند.")[lang],
    {"A": L("3 mm ist die absolute Differenz; geteilt durch 10 mm ergibt sie 30 %, nicht 3 %.", "3 mm is the absolute difference; dividing by 10 mm gives 30%, not 3%.", "۳ میلی‌متر اختلاف مطلق است؛ تقسیم آن بر ۱۰ میلی‌متر، ۳۰٪ می‌دهد، نه ۳٪.")[lang],
     "C": L("13 / 10 ergibt 130 % des Ausgangswerts; die Zunahme gegenüber diesem Ausgangswert beträgt 30 %.", "13 / 10 is 130% of the reference value; the increase above that reference is 30%.", "۱۳ / ۱۰ برابر ۱۳۰٪ مقدار مرجع است؛ افزایش نسبت به آن مرجع ۳۰٪ است.")[lang],
     "D": L("Etwa 23 % entsteht mit 13 mm im Nenner. Für den Seitenvergleich ist aber die unverletzte Seite mit 10 mm die Referenz.", "About 23% results from using 13 mm as denominator. The uninjured 10 mm side is the reference.", "حدود ۲۳٪ از قرار دادن ۱۳ میلی‌متر در مخرج حاصل می‌شود؛ سمت سالم با ۱۰ میلی‌متر مرجع است.")[lang]},
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12081960/"
  ),

  Q(`ak-lux-therapie-1-${lang}`,
    L("Bei einer isolierten akuten Rockwood-II-Verletzung ohne Begleitfraktur oder neurovaskulären Ausfall wird der Behandlungsplan besprochen. Welche Erststrategie passt am besten?", "An isolated acute Rockwood II injury without associated fracture or neurovascular deficit is being discussed. Which initial strategy fits best?", "برنامهٔ درمان آسیب حاد و منفرد راک‌وود II، بدون شکستگی همراه یا نقص عصبی‌عروقی، بررسی می‌شود. کدام راهبرد اولیه مناسب‌تر است؟")[lang],
    [L("Primäre CC-Stabilisierung allein wegen der Typ-II-Einstufung", "Primary CC stabilisation based on the Type II label", "تثبیت اولیهٔ CC صرفاً بر پایهٔ برچسب نوع II")[lang],
     L("Symptomorientierte konservative Behandlung mit kurzzeitiger Schlinge und schrittweiser Mobilisation", "Symptom-guided nonoperative care with brief sling use and gradual mobilisation", "درمان محافظه‌کارانه بر اساس علائم با آویز کوتاه‌مدت و شروع تدریجی حرکت")[lang],
     L("Primäre distale Klavikularesektion zur Beseitigung der Gelenkaufweitung", "Primary distal clavicle excision to eliminate the joint widening", "رزکسیون اولیهٔ انتهای کلاویکول برای برطرف کردن اتساع مفصل")[lang],
     L("Längerfristige starre Immobilisation bis zur vollständigen radiologischen Normalisierung", "Prolonged rigid immobilisation until complete radiographic normalisation", "بی‌حرکتی سفت و طولانی‌مدت تا طبیعی شدن کامل رادیوگرافی")[lang]],
    1,
    L("Isolierte Typ-I-/II-Verletzungen werden üblicherweise zunächst konservativ behandelt: Analgesie, kurzzeitige Schlinge nach Bedarf und symptomadaptierte Mobilisation. Persistierende Beschwerden werden kontrolliert. Bei höhergradigen Verletzungen ist die Entscheidung gesondert zu treffen; Typ III ist keine automatische OP-Indikation.", "Isolated Type I/II injuries are usually initially managed nonoperatively: analgesia, a brief sling as needed and symptom-guided mobilisation. Persistent symptoms require reassessment. Higher-grade injuries need a separate decision; Type III is not an automatic surgical indication.", "آسیب‌های منفرد نوع I/II معمولاً ابتدا محافظه‌کارانه درمان می‌شوند: ضد درد، آویز کوتاه‌مدت در صورت نیاز و شروع حرکت متناسب با علائم. علائم پایدار نیازمند ارزیابی مجددند. دربارهٔ آسیب‌های شدیدتر باید جداگانه تصمیم گرفت؛ نوع III به‌تنهایی اندیکاسیون خودکار جراحی نیست.")[lang],
    {"A": L("Die geringe Instabilität von Typ II ist üblicherweise kein Anlass für eine primäre CC-Rekonstruktion. Symptome und Gesamtbefund bleiben maßgeblich.", "The mild instability of Type II usually does not warrant primary CC reconstruction. Symptoms and the overall findings remain relevant.", "ناپایداری خفیف نوع II معمولاً دلیل بازسازی اولیهٔ CC نیست؛ علائم و کل یافته‌ها تعیین‌کننده‌اند.")[lang],
     "C": L("Eine distale Klavikularesektion ist kein übliches primäres Vorgehen bei der beschriebenen akuten Typ-II-Verletzung.", "Distal clavicle excision is not usual initial care for this acute Type II injury.", "رزکسیون انتهای کلاویکول اقدام اولیهٔ معمول برای آسیب حاد نوع II توصیف‌شده نیست.")[lang],
     "D": L("Die Mobilisation wird klinisch gesteuert. Eine lange starre Ruhigstellung bis zur radiologischen Normalisierung ist hier nicht das Behandlungsziel.", "Mobilisation is clinically guided. Prolonged rigid immobilisation until radiographic normalisation is not the treatment goal here.", "شروع حرکت بر اساس وضعیت بالینی هدایت می‌شود؛ بی‌حرکتی سفت و طولانی تا طبیعی شدن تصویر، هدف درمان این مورد نیست.")[lang]},
    "https://pubmed.ncbi.nlm.nih.gov/33439041/"
  ),

  Q(`ak-lux-tossy-1-${lang}`,
    L("Ein alter Befund nennt nur „Tossy III“. Welche zusätzliche Unterscheidung liefert die sechstypige Rockwood-Klassifikation für eine präzisere AC-Verletzungsbeschreibung?", "An old report states only “Tossy III.” Which additional distinction does the six-type Rockwood classification provide for a more precise AC injury description?", "در گزارش قدیمی فقط «توسی III» آمده است. طبقه‌بندی شش‌نوعی راک‌وود کدام تمایز افزوده را برای توصیف دقیق‌تر آسیب AC فراهم می‌کند؟")[lang],
    [L("Zusätzliche Unterteilung kompletter Luxationen nach dem zeitlichen Abstand seit dem Trauma", "Additional subdivision of complete dislocations by time elapsed since injury", "زیرگروه‌بندی افزودهٔ لوکساسیون کامل بر اساس زمان سپری‌شده از آسیب")[lang],
     L("Zusätzliche Richtungs-/Schweregrade IV–VI für posterior, ausgeprägten Hochstand und inferior", "Additional direction/severity grades IV–VI for posterior displacement, marked elevation and inferior displacement", "درجات افزودهٔ IV–VI بر اساس جهت/شدت برای جابجایی خلفی، ارتفاع شدید و جابجایی تحتانی")[lang],
     L("Zusätzliche Unterteilung kompletter Luxationen nach Schmerzintensität und Einschränkung der Schulterfunktion", "Additional subdivision of complete dislocations by pain intensity and limitation of shoulder function", "زیرگروه‌بندی افزودهٔ لوکساسیون کامل بر اساس شدت درد و محدودیت عملکرد شانه")[lang],
     L("Erstmalige Trennung von isolierter AC-Bandverletzung und kombinierter AC-/CC-Ruptur", "First distinction between isolated AC ligament injury and combined AC/CC rupture", "تفکیک برای نخستین بار میان آسیب منفرد رباط AC و پارگی ترکیبی AC/CC")[lang]],
    1,
    L("Tossy I–III unterscheidet posteriore oder inferiore Verlagerungen und besonders ausgeprägten Hochstand nicht als eigene Typen IV–VI. Rockwood ergänzt diese Richtungs-/Schweregradtypen; die Klassifikation ersetzt keine klinische Beurteilung.", "Tossy I–III does not distinguish posterior or inferior displacement and particularly marked elevation as separate Types IV–VI. Rockwood adds these directional/severity types; classification does not replace clinical assessment.", "توسی I–III جابجایی خلفی یا تحتانی و ارتفاع به‌ویژه شدید را به‌صورت انواع مستقل IV–VI تفکیک نمی‌کند. راک‌وود این انواع جهت‌دار و مبتنی بر شدت را اضافه می‌کند؛ طبقه‌بندی جایگزین ارزیابی بالینی نیست.")[lang],
    {"A": L("Der zeitliche Abstand beeinflusst die Behandlungsplanung, definiert aber nicht die sechs Rockwood-Richtungstypen.", "Time since injury influences management but does not define the six Rockwood directional types.", "زمان سپری‌شده از آسیب بر برنامهٔ درمان اثر دارد، ولی شش نوع جهت‌دار راک‌وود را تعریف نمی‌کند.")[lang],
     "C": L("Schmerz und Funktion sind klinisch wichtig. Die zusätzlichen Typen IV–VI werden jedoch anhand von Verlagerungsrichtung und ausgeprägter Separation unterschieden.", "Pain and function matter clinically, but the additional Types IV–VI distinguish displacement direction and marked separation.", "درد و عملکرد از نظر بالینی مهم‌اند، اما انواع افزودهٔ IV–VI با جهت جابجایی و جدایی شدید متمایز می‌شوند.")[lang],
     "D": L("Die Unterscheidung der beteiligten Bandgruppen ist bereits in den ungefähr überlappenden Typen I–III enthalten. Die zusätzliche Rockwood-Differenzierung betrifft IV–VI.", "The ligament-group distinction already exists within the roughly overlapping Types I–III. Rockwood’s additional distinction concerns IV–VI.", "تمایز گروه‌های رباطی در انواع I–III که تقریباً هم‌پوشان‌اند وجود دارد؛ تمایز افزودهٔ راک‌وود به انواع IV–VI مربوط است.")[lang]},
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12081960/"
  ),

  Q(`ak-lux-belastung-1-${lang}`,
    L("Nach geeigneten Standardaufnahmen einer akuten AC-Verletzung wird über eine zusätzliche gewichtete Panoramaaufnahme zur CCD-Klassifikation diskutiert. Wie ist ihr Zusatznutzen einzuordnen?", "After suitable standard radiographs of an acute AC injury, an additional weighted panoramic view is discussed for CCD-based classification. How should its added value be interpreted?", "پس از رادیوگرافی‌های استاندارد مناسب برای آسیب حاد AC، نمای پانورامیک وزنه‌دار افزوده برای طبقه‌بندی بر اساس CCD مطرح می‌شود. ارزش افزودهٔ آن چگونه باید تفسیر شود؟")[lang],
    [L("Als verlässlicher Nachweis einer klinisch relevanten horizontalen Instabilität", "As reliable proof of clinically relevant horizontal instability", "به‌عنوان اثبات مطمئن ناپایداری افقیِ مهم از نظر بالینی")[lang],
     L("Als uneinheitlich belegter Zusatz zur vertikalen Seitenvergleichsfrage, gezielt nach Fragestellung/Protokoll", "As an adjunct with conflicting evidence for the vertical side-to-side question, selected for the question/protocol", "به‌عنوان بررسی تکمیلی با شواهد متناقض برای مقایسهٔ عمودی دو طرف، به‌صورت هدفمند بر اساس پرسش و پروتکل")[lang],
     L("Als bessere Darstellung einer posterioren Verlagerung als eine geeignete Axialprojektion", "As a better depiction of posterior displacement than a suitable axial projection", "به‌عنوان نمایش بهتر جابجایی خلفی نسبت به نمای محوری مناسب")[lang],
     L("Als direkte Darstellung des Zustands der einzelnen CC-Bandfasern", "As direct depiction of the integrity of individual CC ligament fibres", "به‌عنوان نمایش مستقیم وضعیت رشته‌های منفرد رباط CC")[lang]],
    1,
    L("Die Evidenz ist widersprüchlich: Nordin et al. (online 2020/Ausgabe 2021, doi:10.1177/0284185120939270) fanden keinen signifikanten Klassifikationsgewinn; Ibrahim et al. (2015, doi:10.1016/j.injury.2015.06.028) berichteten einen Nutzen bilateraler Belastungsaufnahmen. Daher nur bei konkreter Fragestellung/lokalem Protokoll erwägen, nicht routinemäßig; geeignete Standard-/Axialaufnahmen bleiben erforderlich.", "Evidence conflicts: Nordin et al. (online 2020/issue 2021, doi:10.1177/0284185120939270) found no significant classification gain; Ibrahim et al. (2015, doi:10.1016/j.injury.2015.06.028) reported value from bilateral weighted views. Consider them only for a specific question/local protocol, not routinely; appropriate standard/axial views remain necessary.", "شواهد متناقض‌اند: نوردین و همکاران (آنلاین ۲۰۲۰/شماره ۲۰۲۱، doi:10.1177/0284185120939270) بهبود معناداری در طبقه‌بندی نیافتند؛ ابراهیم و همکاران (۲۰۱۵، doi:10.1016/j.injury.2015.06.028) برای نماهای وزنه‌دار دوطرفه ارزش گزارش کردند. بنابراین فقط برای پرسش مشخص/پروتکل محلی و نه به‌صورت روتین در نظر بگیرید؛ نماهای استاندارد/محوری مناسب همچنان لازم‌اند.")[lang],
    {"A": L("Die gewichtete CCD-Messung betrifft vorwiegend den vertikalen Abstand. Horizontale Instabilität braucht passende klinische und gegebenenfalls zusätzliche projektionsbezogene Beurteilung.", "Weighted CCD measurement primarily concerns vertical distance. Horizontal instability needs appropriate clinical and, when indicated, additional projection-specific assessment.", "اندازه‌گیری CCD با وزنه عمدتاً فاصلهٔ عمودی را بررسی می‌کند؛ ناپایداری افقی به ارزیابی بالینی مناسب و در صورت نیاز نماهای تکمیلی مرتبط نیاز دارد.")[lang],
     "C": L("Mehr Gewicht macht eine AP-Panoramaaufnahme nicht zu einer axialen Darstellung der posterioren Richtung.", "Adding weight does not turn an AP panoramic radiograph into an axial depiction of posterior direction.", "افزودن وزنه، نمای پانورامیک AP را به نمای محوری برای نمایش جهت خلفی تبدیل نمی‌کند.")[lang],
     "D": L("Die Röntgenaufnahme zeigt knöcherne Abstände und Stellung, nicht die einzelnen CC-Bandfasern direkt.", "Radiography shows bony distances and alignment, not individual CC ligament fibres directly.", "رادیوگرافی فواصل استخوانی و راستا را نشان می‌دهد، نه رشته‌های منفرد رباط CC را به‌طور مستقیم.")[lang]},
    "https://pubmed.ncbi.nlm.nih.gov/32660317/"
  ),

  Q(`ak-lux-rock-vi-1-${lang}`,
    L("Was ist charakteristisch für die Rockwood-Typ-VI-Luxation?", "What characterises a Rockwood Type VI dislocation?", "چه چیزی مشخصه لوکساسیون راک‌وود نوع VI است؟")[lang],
    [L("Superiore Klavikulaverlagerung mit vergrößerter CC-Distanz", "Superior clavicular displacement with increased CC distance", "جابجایی فوقانی کلاویکول با افزایش فاصلهٔ CC")[lang],
     L("Posteriore Klavikulaverlagerung in oder durch den Trapezius", "Posterior clavicular displacement into or through trapezius", "جابجایی خلفی کلاویکول به داخل یا از میان تراپزیوس")[lang],
     L("Inferiore Klavikulaverlagerung unter Akromion oder Korakoid", "Inferior clavicular displacement below acromion or coracoid", "جابجایی تحتانی کلاویکول به زیر آکرومیون یا کوراکوئید")[lang],
     L("Geringe AC-Aufweitung bei normaler oder leicht vergrößerter CC-Distanz", "Mild AC widening with normal or slightly increased CC distance", "اتساع خفیف AC با فاصلهٔ CC طبیعی یا کمی افزایش‌یافته")[lang]],
    2,
    L("Rockwood VI ist selten; die Klavikula ist inferior subakromial oder subkorakoidal verlagert. Diese Hochgradverletzung erfordert zeitnahe fachärztliche Beurteilung; konkrete Therapie nach Gesamtbefund und Patient.", "Rockwood VI is rare; the clavicle is displaced inferiorly into a subacromial or subcoracoid position. This high-grade injury warrants timely specialist assessment; treatment depends on the overall findings and patient.", "راک‌وود VI نادر است؛ کلاویکول به موقعیت تحتانی زیرآکرومیال یا زیرکوراکوئید جابجا می‌شود. این آسیب شدید نیازمند ارزیابی به‌موقع متخصص است؛ درمان بر اساس یافته‌های کلی و شرایط بیمار تعیین می‌شود.")[lang],
    {"A": L("Superiore Separation findet sich bei anderen Rockwood-Mustern, insbesondere III/V. Typ VI ist inferior gerichtet.", "Superior separation occurs in other Rockwood patterns, particularly III/V. Type VI is directed inferiorly.", "جدایی فوقانی در الگوهای دیگر راک‌وود، به‌ویژه III/V، دیده می‌شود؛ جهت نوع VI تحتانی است.")[lang],
     "B": L("Die posteriore Verlagerung bezeichnet Typ IV. Typ VI liegt unter Akromion oder Korakoid.", "Posterior displacement denotes Type IV. Type VI lies below the acromion or coracoid.", "جابجایی خلفی مشخصهٔ نوع IV است؛ در نوع VI کلاویکول زیر آکرومیون یا کوراکوئید قرار می‌گیرد.")[lang],
     "D": L("Dieses gering ausgeprägte Muster passt eher zu Typ II und nicht zur inferioren Luxation.", "This mild pattern fits Type II better than an inferior dislocation.", "این الگوی خفیف بیشتر با نوع II سازگار است، نه لوکساسیون تحتانی.")[lang]},
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12081960/"
  ),

  Q(`ak-lux-norm-1-${lang}`,
    L("Nach direktem Schultertrauma bestehen lokaler AC-Druckschmerz und ein passender klinischer Befund. Geeignete Röntgenaufnahmen zeigen weder Aufweitung noch Verlagerung. Welche Einordnung bleibt möglich?", "After direct shoulder trauma there is focal AC tenderness and compatible clinical examination. Suitable radiographs show neither widening nor displacement. Which diagnosis remains possible?", "پس از ضربهٔ مستقیم شانه، حساسیت موضعی AC و معاینهٔ بالینی متناسب وجود دارد. رادیوگرافی‌های مناسب نه اتساع و نه جابجایی نشان می‌دهند. کدام تشخیص همچنان ممکن است؟")[lang],
    [L("Rockwood II mit radiologisch erkennbarer Gelenkaufweitung", "Rockwood II with radiographically visible joint widening", "راک‌وود II با اتساع مفصلِ قابل مشاهده در رادیوگرافی")[lang],
     L("Rockwood I als klinische Banddistorsion ohne radiologische Dislokation", "Rockwood I as a clinical ligament sprain without radiographic displacement", "راک‌وود I به‌صورت کشیدگی بالینی رباط بدون جابجایی رادیوگرافیک")[lang],
     L("Rockwood III mit deutlicher vertikaler Separation", "Rockwood III with marked vertical separation", "راک‌وود III با جدایی عمودی واضح")[lang],
     L("Rockwood IV mit nachgewiesener posteriorer Verlagerung", "Rockwood IV with demonstrated posterior displacement", "راک‌وود IV با جابجایی خلفی اثبات‌شده")[lang]],
    1,
    L("Typ I: leichte AC-Banddistorsion ohne radiologische Dislokation; Diagnose klinisch bei passenden Befunden. Üblicherweise konservative symptomorientierte Behandlung.", "Type I: mild AC-ligament sprain without radiographic displacement; diagnosis is clinical when findings fit. Usually managed conservatively according to symptoms.", "نوع I: کشیدگی خفیف رباط AC بدون جابجایی رادیوگرافیک؛ در صورت تطابق یافته‌ها تشخیص بالینی است. معمولاً بر اساس علائم به‌صورت محافظه‌کارانه درمان می‌شود.")[lang],
    {"A": L("Typ II beinhaltet gewöhnlich eine geringe radiologische Aufweitung/Fehlstellung. Die beschriebene Distorsion ohne solche Zeichen passt eher zu Typ I.", "Type II usually includes mild radiographic widening/malalignment. A sprain without these signs fits Type I better.", "نوع II معمولاً اتساع یا اختلال راستای خفیف رادیوگرافیک دارد؛ کشیدگی بدون این نشانه‌ها بیشتر با نوع I تطابق دارد.")[lang],
     "C": L("Eine deutliche vertikale Separation ist hier nicht vorhanden. Ein unauffälliges Bild kann eine leichte klinische AC-Verletzung dennoch nicht ausschließen.", "Marked vertical separation is absent here. Unremarkable imaging still does not exclude a mild clinical AC injury.", "جدایی عمودی واضح در اینجا وجود ندارد؛ با این حال تصویر بدون یافتهٔ بارز، آسیب بالینی خفیف AC را رد نمی‌کند.")[lang],
     "D": L("Eine nachgewiesene posteriore Verlagerung ist nicht beschrieben. Bei weiterem Richtungsverdacht müssen die Projektionen trotzdem kritisch geprüft werden.", "Demonstrated posterior displacement is not described. If directional concern persists, the adequacy of projections still requires review.", "جابجایی خلفیِ اثبات‌شده توصیف نشده است؛ اگر شک به این جهت باقی بماند، مناسب بودن نماها همچنان باید بررسی شود.")[lang]},
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12081960/"
  ),

  Q(`ak-lux-op-1-${lang}`,
    L("Für eine akute höhergradige AC-Verletzung ist nach fachärztlicher Gesamtbeurteilung eine operative Stabilisierung vorgesehen. Welche Verfahrensgruppe stellt die AC-/CC-Stabilität gezielt wieder her?", "Operative stabilisation is planned for an acute high-grade AC injury after specialist assessment. Which procedure group specifically restores AC/CC stability?", "پس از ارزیابی کامل تخصصی، برای آسیب حاد و شدید AC تثبیت جراحی برنامه‌ریزی شده است. کدام گروه روش‌ها به‌طور هدفمند پایداری AC/CC را بازمی‌گرداند؟")[lang],
    [L("Subakromiale Dekompression mit Bursektomie", "Subacromial decompression with bursectomy", "دکمپرشن زیرآکرومیال همراه بورسکتومی")[lang],
     L("Reposition und Stabilisierung mit geeignetem Suspensionssystem oder Hakenplatte", "Reduction and stabilisation with an appropriate suspensory device or hook plate", "جااندازی و تثبیت با سامانهٔ تعلیقی مناسب یا صفحهٔ قلاب‌دار")[lang],
     L("Distale Klavikularesektion ohne ergänzende Bandstabilisierung", "Distal clavicle excision without additional ligament stabilisation", "رزکسیون انتهای کلاویکول بدون تثبیت تکمیلی رباط")[lang],
     L("Isolierte Naht einer begleitenden Rotatorenmanschettenläsion", "Isolated repair of an associated rotator cuff lesion", "ترمیم منفرد ضایعهٔ همراه روتاتور کاف")[lang]],
    1,
    L("Suspensionssysteme (z. B. Tight-Rope) und Hakenplatten sind Beispiele operativer Stabilisierung. Technik und zusätzliche Bandrekonstruktion richten sich nach Verletzungsmuster und lokalem Vorgehen; eine spätere Entfernung der Hakenplatte hängt vom Implantat-/Behandlungsplan ab.", "Suspensory devices (e.g. tight-rope) and hook plates are examples of operative stabilisation. Technique and additional ligament reconstruction depend on the injury pattern and local approach; later hook-plate removal depends on the implant/treatment plan.", "سیستم‌های تعلیقی (مانند تایت‌روپ) و صفحات قلاب‌دار نمونه‌هایی از تثبیت جراحی هستند. روش و بازسازی اضافی رباط بر اساس الگوی آسیب و رویکرد محلی انتخاب می‌شود؛ خارج کردن بعدی صفحه قلاب‌دار به نوع ایمپلنت و برنامه درمان بستگی دارد.")[lang],
    {"A": L("Eine subakromiale Dekompression behandelt nicht die unterbrochene AC-/CC-Stabilität.", "Subacromial decompression does not restore disrupted AC/CC stability.", "دکمپرشن زیرآکرومیال پایداری ازبین‌رفتهٔ AC/CC را بازنمی‌گرداند.")[lang],
     "C": L("Eine isolierte Resektion rekonstruiert die gerissenen Stabilisatoren nicht. Die geplante Versorgung muss das Instabilitätsmuster adressieren.", "Isolated resection does not reconstruct the torn stabilisers. The planned procedure must address the instability pattern.", "رزکسیون منفرد، تثبیت‌کننده‌های پاره را بازسازی نمی‌کند؛ روش برنامه‌ریزی‌شده باید الگوی ناپایداری را اصلاح کند.")[lang],
     "D": L("Eine Sehnennaht kann eine Begleitläsion behandeln, stellt aber die AC-/CC-Verbindung nicht wieder her.", "Tendon repair may treat an associated lesion but does not restore the AC/CC connection.", "ترمیم تاندون ممکن است ضایعهٔ همراه را درمان کند، ولی اتصال AC/CC را بازنمی‌گرداند.")[lang]},
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC8225517/"
  ),

].map(q => ({ ...q, tags: ['ak-luxation'] }))]))

export const AK_LUXATION_FLASHCARDS = [

  F("ak-lux-fc-1", L("Anatomie", "Anatomy", "آناتومی"),
    L("Welche zwei Bandgruppen stabilisieren das AC-Gelenk?", "Which two ligament groups stabilise the AC joint?", "کدام دو گروه رباط مفصل AC را تثبیت می‌کنند؟"),
    L("AC-Kapsel/Bänder: besonders horizontale Stabilität. CC-Bänder (Konoid/Trapezoid): wesentlicher Beitrag zur vertikalen Stabilität.", "AC capsule/ligaments: particularly horizontal stability. CC ligaments (conoid/trapezoid): substantial contribution to vertical stability.", "کپسول/رباط‌های AC: به‌ویژه پایداری افقی. رباط‌های CC (کونوئید/ترپزوئید): سهم مهم در پایداری عمودی."),
    L("Die Beiträge hängen auch von Last und Richtung ab; die Systeme wirken gemeinsam. Typ III beinhaltet eine Verletzung beider Bandgruppen.", "Contributions also depend on load and direction; the systems act together. Type III involves injury to both ligament groups.", "سهم هر ساختار به بار و جهت نیز وابسته است و این سامانه‌ها با هم عمل می‌کنند. نوع III شامل آسیب هر دو گروه رباط است."),
    "https://pubmed.ncbi.nlm.nih.gov/3949839/"
  ),

  F("ak-lux-fc-2", L("Bildgebung", "Imaging", "تصویربرداری"),
    L("Wie berechnen und interpretieren Sie die relative CCD-Zunahme; ist eine gewichtete Aufnahme Routine?", "How do you calculate and interpret relative CCD increase; is a weighted view routine?", "افزایش نسبی CCD را چگونه محاسبه و تفسیر می‌کنید؛ آیا نمای وزنه‌دار روتین است؟"),
    L("(Verletzte − unverletzte CCD) / unverletzte CCD × 100 %. Gleiche Technik und gesamte Morphologie beachten; gewichtete Aufnahmen nur gezielt bei uneinheitlicher Evidenz.", "(Injured − uninjured CCD) / uninjured CCD × 100%. Use comparable technique and assess overall morphology; weighted views are selective because evidence conflicts.", "(CCD سمت آسیب‌دیده منهای CCD سمت سالم) تقسیم بر CCD سمت سالم، ضرب‌در ۱۰۰. تکنیک قابل مقایسه و کل مورفولوژی بررسی شوند؛ با توجه به شواهد متناقض، نمای وزنه‌دار انتخابی است."),
    L("13 gegenüber 10 mm bedeutet 30 % Zunahme, nicht 130 %. Nordin fand keinen relevanten Klassifikationsgewinn durch Zusatzgewicht, Ibrahim berichtete dagegen Hochstufungen. Ein Einzelwert ersetzt weder Seitenvergleich noch Richtungsbeurteilung.", "13 versus 10 mm means a 30% increase, not 130%. Nordin found no relevant classification gain with added weight, whereas Ibrahim reported upgrades. An isolated value replaces neither side-to-side nor directional assessment.", "۱۳ در برابر ۱۰ میلی‌متر یعنی ۳۰٪ افزایش، نه ۱۳۰٪. نوردین با افزودن وزنه بهبود مهمی در طبقه‌بندی نیافت، در حالی که ابراهیم ارتقای درجه گزارش کرد. مقدار منفرد جای مقایسهٔ دو طرف و ارزیابی جهت را نمی‌گیرد."),
    "https://pubmed.ncbi.nlm.nih.gov/32660317/"
  ),

  F("ak-lux-fc-3", L("Rockwood", "Rockwood", "راک‌وود"),
    L("Rockwood I–VI: Therapieprinzip?", "Rockwood I–VI: Treatment principle?", "راک‌وود I–VI: اصل درمان؟"),
    L("I–II: meist zunächst konservativ. III: individuell und kontrovers. Höhergradige IV–VI: zeitnahe fachärztliche Beurteilung einer möglichen Stabilisierung.", "I–II: usually initially nonoperative. III: individualised and debated. Higher-grade IV–VI: prompt specialist assessment for possible stabilisation.", "I–II: معمولاً ابتدا محافظه‌کارانه. III: فردی و مورد اختلاف. درجات شدیدتر IV–VI: ارزیابی به‌موقع متخصص برای تثبیت احتمالی."),
    L("Typ und radiologischer Hochstand entscheiden nicht allein über eine Operation: Funktion, Instabilität, Begleitverletzungen und Patientenziele einbeziehen. Eine randomisierte Typ-III-Studie zeigte keine überlegenen Funktionsresultate der primären Operation.", "Type and radiographic elevation do not determine surgery alone: include function, instability, associated injury and patient goals. A randomised Type III trial found no superior functional results with primary surgery.", "نوع آسیب و ارتفاع رادیوگرافیک به‌تنهایی جراحی را تعیین نمی‌کنند؛ عملکرد، ناپایداری، آسیب همراه و اهداف بیمار لحاظ شوند. یک مطالعهٔ تصادفی نوع III برتری عملکردی جراحی اولیه را نشان نداد."),
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC10467399/"
  ),

  F("ak-lux-fc-4", L("Rockwood", "Rockwood", "راک‌وود"),
    L("Rockwood Typ IV: Worin besteht die Besonderheit?", "Rockwood Type IV: What is the distinctive feature?", "راک‌وود نوع IV: ویژگی خاص چیست؟"),
    L("Posteriore Verlagerung der lateralen Klavikula in oder durch den Trapezius. Bei Richtungsverdacht AP durch geeignete axiale/axilläre Beurteilung ergänzen.", "Posterior displacement of the lateral clavicle into or through trapezius. When this direction is suspected, supplement AP with appropriate axial/axillary assessment.", "جابجایی خلفی بخش جانبی کلاویکول به داخل یا از میان تراپزیوس. در صورت شک به این جهت، AP با ارزیابی محوری/آگزیلاری مناسب تکمیل شود."),
    L("Eine unauffällige AP-Projektion schließt diese Verlagerungsrichtung nicht zuverlässig aus. Die klinische Instabilitätsbeurteilung gehört dazu.", "An unremarkable AP projection does not reliably exclude this displacement direction. Include clinical instability assessment.", "نمای AP بدون یافتهٔ بارز، این جهت جابجایی را با اطمینان رد نمی‌کند؛ ارزیابی بالینی ناپایداری نیز لازم است."),
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12081960/"
  ),

  F("ak-lux-fc-5", L("Rockwood", "Rockwood", "راک‌وود"),
    L("Unterschied Rockwood III vs. V?", "Difference Rockwood III vs. V?", "تفاوت راک‌وود III در مقابل V؟"),
    L("III: AC-/CC-Verletzung mit vertikaler Separation. V: deutlich stärkere vertikale Separation und deltotrapeziale Ablösung; CCD häufig mehr als verdoppelt.", "III: AC/CC injury with vertical separation. V: substantially greater vertical separation and deltotrapezial detachment; CCD often more than doubled.", "III: آسیب AC/CC با جدایی عمودی. V: جدایی عمودی بسیار بیشتر همراه جداشدگی دلتوتراپزیوس؛ CCD اغلب بیش از دو برابر است."),
    L("Übliche radiologische Orientierungsbereiche der relativen CCD-Zunahme sind ungefähr 25–100 % für III und >100–300 % für V. Grenzen sind keine alleinige Therapieentscheidung; Projektion, Richtung und Gesamtmuster beachten.", "Common radiographic guides for relative CCD increase are approximately 25–100% for III and >100–300% for V. Boundaries alone do not decide treatment; account for projection, direction and the overall pattern.", "محدوده‌های رایج راهنمای افزایش نسبی CCD تقریباً ۲۵ تا ۱۰۰٪ برای III و بیش از ۱۰۰ تا ۳۰۰٪ برای V هستند. مرزها به‌تنهایی درمان را تعیین نمی‌کنند؛ نما، جهت و کل الگو بررسی شوند."),
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12081960/"
  ),

  F("ak-lux-fc-6", L("Bildgebung", "Imaging", "تصویربرداری"),
    L("Welche AC-Verletzungen können trotz unauffälliger AP-Aufnahme bestehen?", "Which AC injuries may remain despite an unremarkable AP radiograph?", "با وجود نمای AP بدون یافتهٔ بارز، کدام آسیب‌های AC ممکن است وجود داشته باشند؟"),
    L("Typ I als klinische Distorsion ohne radiologische Dislokation; bei Typ IV kann die posteriore Richtung im AP übersehen werden.", "Type I as a clinical sprain without radiographic displacement; in Type IV, the posterior direction may be missed on AP.", "نوع I به‌صورت کشیدگی بالینی بدون جابجایی رادیوگرافیک؛ در نوع IV جهت خلفی ممکن است در AP دیده نشود."),
    L("Bei passenden Symptomen klinisch weiterprüfen. Besteht Verdacht auf posteriore Verlagerung, geeignete axiale/axilläre Projektion ergänzen; „normal im AP“ ist kein allgemeiner Ausschluss.", "Continue clinical assessment when symptoms fit. If posterior displacement is suspected, add a suitable axial/axillary projection; “normal on AP” is not a general exclusion.", "در صورت تطابق علائم، ارزیابی بالینی ادامه یابد. اگر شک به جابجایی خلفی وجود دارد، نمای محوری/آگزیلاری مناسب اضافه شود؛ «طبیعی در AP» به معنای رد کلی آسیب نیست."),
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12081960/"
  ),

  F("ak-lux-fc-7", L("Anatomie", "Anatomy", "آناتومی"),
    L("Tossy vs. Rockwood: Was ergänzt Rockwood?", "Tossy vs. Rockwood: What does Rockwood add?", "توسی در برابر راک‌وود: راک‌وود چه چیزی اضافه می‌کند؟"),
    L("Rockwood unterscheidet zusätzlich posteriore Verlagerung (IV), besonders ausgeprägten Hochstand (V) und inferiore Verlagerung (VI).", "Rockwood additionally distinguishes posterior displacement (IV), particularly marked elevation (V) and inferior displacement (VI).", "راک‌وود افزون بر آن جابجایی خلفی (IV)، ارتفاع به‌ویژه شدید (V) و جابجایی تحتانی (VI) را متمایز می‌کند."),
    L("Die historischen Systeme überlappen, sind aber nicht in jedem Detail identisch. Eine alte Tossy-Angabe ersetzt keine Beschreibung der tatsächlichen Richtung und Ausdehnung.", "The historical systems overlap but are not identical in every detail. An old Tossy label does not replace description of actual direction and extent.", "سامانه‌های تاریخی هم‌پوشانی دارند، ولی در همهٔ جزئیات یکسان نیستند. برچسب قدیمی توسی جای توصیف جهت و میزان واقعی را نمی‌گیرد."),
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC12081960/"
  ),

  F("ak-lux-fc-8", L("Therapie", "Treatment", "درمان"),
    L("Welche OP-Verfahren werden bei Typ IV–VI eingesetzt?", "Which surgical procedures are used for Types IV–VI?", "کدام روش‌های جراحی برای نوع IV–VI استفاده می‌شوند؟"),
    L("Beispiele sind Reposition/Stabilisierung mit Suspensionssystem oder Hakenplatte; gegebenenfalls zusätzliche AC-/CC-Bandrekonstruktion.", "Examples are reduction/stabilisation with a suspensory device or hook plate; additional AC/CC ligament reconstruction may be needed.", "از نمونه‌ها جااندازی و تثبیت با سامانهٔ تعلیقی یا صفحهٔ قلاب‌دار است؛ ممکن است بازسازی تکمیلی رباط AC/CC لازم باشد."),
    L("Die Wahl richtet sich nach akutem oder chronischem Muster, Instabilität und Patientenfaktoren. Ein Suspensionssystem und eine Hakenplatte sind nicht für jeden Fall austauschbar; Implantatnachbehandlung wird gesondert geplant.", "Choice depends on acute or chronic injury pattern, instability and patient factors. Suspensory devices and hook plates are not interchangeable in every case; implant follow-up is planned separately.", "انتخاب به حاد یا مزمن بودن الگو، ناپایداری و عوامل مربوط به بیمار وابسته است. سامانهٔ تعلیقی و صفحهٔ قلاب‌دار در هر مورد قابل جایگزینی نیستند؛ پیگیری ایمپلنت جداگانه برنامه‌ریزی می‌شود."),
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC8225517/"
  ),

].map(fc => ({
  ...fc,
  topicId: 'ak-luxation',
  front: fc.front,
  answer: fc.answer,
  explanation: fc.explanation,
}))

export const AK_LUXATION_FLASHCARD_TOPIC = {
  id: 'ak-luxation',
  title: {
    de: 'Akromioklavikuläre Luxation',
    en: 'AC Joint Dislocation',
    fa: 'لوکساسیون مفصل AC',
  },
  color: '#1d4ed8',
}
