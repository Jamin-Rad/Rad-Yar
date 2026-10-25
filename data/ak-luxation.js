const L = (de, en, fa) => ({ de, en, fa })

export const AK_LUXATION_LESSON = {
  id: 'ak-luxation',
  title: L(
    'Akromioklavikuläre Luxation',
    'Acromioclavicular Joint Dislocation',
    'لوکساسیون مفصل آکرومیوکلاویکولار'
  ),
  definition: L(
    'Traumatische Verletzung des Akromioklavikulargelenks (AC-Gelenk) mit Ruptur der AC- und/oder korakoklavikulären Bänder, klassifiziert nach Rockwood in sechs Typen.',
    'Traumatic injury of the acromioclavicular (AC) joint with rupture of the AC and/or coracoclavicular ligaments, classified by Rockwood into six types.',
    'آسیب تروماتیک مفصل آکرومیوکلاویکولار (AC) با پارگی رباط‌های AC و/یا کوراکوکلاویکولار، طبق طبقه‌بندی راک‌وود در شش نوع.'
  ),
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
        text: L(
          'M. deltoideus und M. trapezius strahlen in die laterale Klavikula ein und unterstützen die dynamische Stabilität. Bei Typ V werden diese Ansätze abgerissen.',
          'Deltoid and trapezius muscles insert into the lateral clavicle and support dynamic stability. In Type V, these insertions are avulsed.',
          'عضلات دلتوئید و تراپزیوس به کلاویکول جانبی چسبیده و پایداری دینامیک را پشتیبانی می‌کنند. در نوع V، این نقاط اتصال جدا می‌شوند.'
        ),
      },
    ],
    key: L(
      'CC-Bänder tragen vor allem zur vertikalen, AC-Kapsel/Bänder zur horizontalen Stabilität bei. Das Rockwood-Muster ergibt sich aus Bandverletzung und Dislokationsrichtung; Typ III bedeutet eine Ruptur beider Bandgruppen.',
      'CC ligaments primarily contribute to vertical stability, while the AC capsule/ligaments contribute to horizontal stability. Rockwood grading reflects ligament injury and displacement direction; Type III denotes rupture of both ligament groups.',
      'رباط‌های CC عمدتاً در پایداری عمودی و کپسول/رباط‌های AC در پایداری افقی نقش دارند. درجه‌بندی راک‌وود بر اساس آسیب رباط‌ها و جهت جابجایی است؛ نوع III به پارگی هر دو گروه رباط اشاره دارد.'
    ),
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
        L('Wie Typ III, plus Abriss M. deltoideus/trapezius', 'Like Type III, plus avulsion of deltoid/trapezius', 'مثل نوع III، به علاوه جداشدگی عضلات دلتوئید/تراپزیوس'),
        L('Deutlicher Hochstand; CCD-Zunahme meist >100 % (ca. 100–300 %) gegenüber der Gegenseite', 'Marked elevation; CCD increase usually >100% (about 100–300%) versus the opposite side', 'ارتفاع واضح؛ افزایش CCD معمولاً بیش از ۱۰۰٪ (حدود ۱۰۰ تا ۳۰۰٪) نسبت به سمت مقابل'),
        L('Muskelkontinuität unterbrochen', 'Muscle continuity disrupted', 'پیوستگی عضلانی قطع شده'),
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
      text: L('CCD im Seitenvergleich messen. 11–13 mm sind ein publizierter Orientierungsbereich mit individueller Varianz. Die Evidenz zu Belastungsaufnahmen ist widersprüchlich: Nordin et al. (online 2020/Ausgabe 2021, doi:10.1177/0284185120939270) fanden keinen signifikanten Gewinn; Ibrahim et al. (2015, doi:10.1016/j.injury.2015.06.028) berichteten einen Nutzen. Die PDF-Angabe 10–15 kg pro Seite ist keine Routineempfehlung; andere Quellen nennen geringere Lasten.', 'Measure CCD side to side. 11–13 mm is a published orienting range with individual variation. Evidence on weighted views conflicts: Nordin et al. (online 2020/issue 2021, doi:10.1177/0284185120939270) found no significant gain; Ibrahim et al. (2015, doi:10.1016/j.injury.2015.06.028) reported value. The PDF’s 10–15 kg per-side load is not a routine recommendation; other sources describe lower loads.', 'CCD را در دو طرف اندازه‌گیری و مقایسه کنید. ۱۱ تا ۱۳ میلی‌متر محدوده‌ای راهنما در منابع منتشرشده است و تفاوت فردی دارد. شواهد نماهای وزنه‌دار متناقض است: نوردین و همکاران (آنلاین ۲۰۲۰/شماره ۲۰۲۱، doi:10.1177/0284185120939270) بهبود معناداری نیافتند؛ ابراهیم و همکاران (۲۰۱۵، doi:10.1016/j.injury.2015.06.028) ارزش آن را گزارش کردند. بار ۱۰ تا ۱۵ کیلوگرم در هر طرف که در PDF آمده توصیه روتین نیست؛ منابع دیگر بار کمتری ذکر می‌کنند.'),
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

const TARGETED_WRONG_FEEDBACK = {
  "ak-lux-ccd-1": {
    "A": {
      "de": "3 mm ist die absolute Differenz; geteilt durch 10 mm ergibt sie 30 %, nicht 3 %.",
      "en": "3 mm is the absolute difference; dividing by 10 mm gives 30%, not 3%.",
      "fa": "۳ میلی‌متر اختلاف مطلق است؛ تقسیم آن بر ۱۰ میلی‌متر، ۳۰٪ می‌دهد، نه ۳٪."
    },
    "C": {
      "de": "13 / 10 ergibt 130 % des Ausgangswerts; die Zunahme gegenüber diesem Ausgangswert beträgt 30 %.",
      "en": "13 / 10 is 130% of the reference value; the increase above that reference is 30%.",
      "fa": "۱۳ / ۱۰ برابر ۱۳۰٪ مقدار مرجع است؛ افزایش نسبت به آن مرجع ۳۰٪ است."
    },
    "D": {
      "de": "Etwa 23 % entsteht mit 13 mm im Nenner. Für den gefragten Seitenvergleich ist aber die unverletzte Seite mit 10 mm die Referenz.",
      "en": "About 23% results from using 13 mm as denominator. For this comparison, the uninjured 10 mm side is the reference.",
      "fa": "حدود ۲۳٪ از قرار دادن ۱۳ میلی‌متر در مخرج حاصل می‌شود؛ در این مقایسه، سمت سالم با ۱۰ میلی‌متر مرجع است."
    }
  }
}
const targetedWrongFeedback = id => { const lang=id.match(/-(de|en|fa)$/)?.[1]; const feedback=TARGETED_WRONG_FEEDBACK[id.replace(/-(de|en|fa)$/, '')]; return feedback ? Object.fromEntries(Object.entries(feedback).map(([key,value])=>[key,value[lang]])) : undefined }
const LETTERS = ['A', 'B', 'C', 'D', 'E']
const Q = (id, question, options, correct, explanation) => ({
  id,
  question,
  options: options.map((text, i) => ({ id: LETTERS[i], text })),
  correct: LETTERS[correct],
  explanation,
  ...(targetedWrongFeedback(id) ? { wrongExplanations: targetedWrongFeedback(id) } : {}),
})
const F = (id, category, front, answer, explanation) => ({ id, category, front, answer, explanation })

export const AK_LUXATION_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, [

  Q(`ak-lux-mech-1-${lang}`,
    L('Welcher Mechanismus führt am häufigsten zur akromioklavikulären Luxation?',
      'Which mechanism most commonly causes acromioclavicular joint dislocation?',
      'کدام مکانیسم بیشتر از همه منجر به لوکساسیون مفصل آکرومیوکلاویکولار می‌شود؟')[lang],
    [
      L('Sturz auf ausgestreckte Hand', 'Fall on outstretched hand', 'افتادن روی دست کشیده')[lang],
      L('Direkter Sturz auf die Schulterseite bei adduziertem Arm', 'Direct fall onto the shoulder with arm adducted', 'افتادن مستقیم روی طرف شانه با بازوی آدوکته')[lang],
      L('Hyperabduktion des Arms', 'Hyperabduction of the arm', 'هیپرآبداکسیون بازو')[lang],
      L('Rotationstrauma des Rumpfs', 'Rotational trunk injury', 'تروما چرخشی تنه')[lang],
    ],
    1,
    L('Der häufigste Mechanismus ist der direkte Sturz auf die Schulterseite bei adduziertem Arm. Das Akromion wird inferiorisiert, während die Klavikula durch die Muskeln relativ fixiert bleibt → Bänderriss.', 'The most common mechanism is a direct fall onto the shoulder with the arm adducted. The acromion is driven inferiorly while the clavicle is relatively fixed by muscles → ligament failure.', 'شایع‌ترین مکانیسم افتادن مستقیم روی طرف شانه با بازوی آدوکته است. آکرومیون به سمت پایین رانده می‌شود در حالی که کلاویکول نسبتاً توسط عضلات ثابت است → پارگی رباط.')[lang]
  ),

  Q(`ak-lux-band-1-${lang}`,
    L('Welche Bänder sichern das AC-Gelenk primär gegen vertikale Instabilität?',
      'Which ligaments primarily secure the AC joint against vertical instability?',
      'کدام رباط‌ها به طور اولیه مفصل AC را در برابر ناپایداری عمودی ثابت می‌کنند؟')[lang],
    [
      L('AC-Bänder (akromioklavikuläre Bänder)', 'AC ligaments (acromioclavicular)', 'رباط‌های AC (آکرومیوکلاویکولار)')[lang],
      L('CC-Bänder (Trapezoid + Konoid)', 'CC ligaments (trapezoid + conoid)', 'رباط‌های CC (ترپزوئید + کونوئید)')[lang],
      L('Glenohumerale Bänder', 'Glenohumeral ligaments', 'رباط‌های گلنوهومرال')[lang],
      L('Korakohumerale Bänder', 'Coracohumeral ligaments', 'رباط‌های کوراکوهومرال')[lang],
    ],
    1,
    L('CC-Bänder tragen vor allem zur vertikalen, AC-Kapsel/Bänder zur horizontalen Stabilität bei. Typ III umfasst eine Ruptur beider Bandgruppen; die übrigen Rockwood-Typen unterscheiden sich zusätzlich nach Richtung und Ausmaß der Dislokation.', 'CC ligaments mainly contribute to vertical stability, while the AC capsule/ligaments contribute to horizontal stability. Type III includes rupture of both ligament groups; other Rockwood types are further distinguished by displacement direction and extent.', 'رباط‌های CC عمدتاً در پایداری عمودی و کپسول/رباط‌های AC در پایداری افقی نقش دارند. نوع III شامل پارگی هر دو گروه رباط است؛ انواع دیگر راک‌وود علاوه بر آن بر اساس جهت و میزان جابجایی متمایز می‌شوند.')[lang]
  ),

  Q(`ak-lux-rock-1-${lang}`,
    L('Bei Rockwood Typ II liegt radiologisch vor:',
      'In Rockwood Type II, the X-ray shows:',
      'در راک‌وود نوع II، رادیوگرافی نشان می‌دهد:')[lang],
    [
      L('Normalbefund', 'Normal X-ray', 'رادیوگرافی طبیعی')[lang],
      L('Leichte Dehiszenz; CCD-Zunahme < 25 % gegenüber der unverletzten Seite', 'Mild widening; CCD increase <25% versus the uninjured side', 'اتساع خفیف؛ افزایش CCD کمتر از ۲۵٪ نسبت به سمت سالم')[lang],
      L('Deutlicher Hochstand; CCD-Zunahme 25–100 % gegenüber der unverletzten Seite', 'Marked elevation; CCD increase 25–100% versus the uninjured side', 'ارتفاع واضح؛ افزایش CCD به میزان ۲۵ تا ۱۰۰٪ نسبت به سمت سالم')[lang],
      L('Posteriore Verlagerung der Klavikula', 'Posterior displacement of the clavicle', 'جابجایی خلفی کلاویکول')[lang],
    ],
    1,
    L('Rockwood II = AC-Bänder rupturiert, CC-Bänder gezerrt/partiell verletzt; die CCD-Zunahme liegt üblicherweise unter 25 % gegenüber der unverletzten Seite. Typ I–II werden meist konservativ behandelt.', 'Rockwood II = AC ligaments torn, CC ligaments sprained/partially injured; CCD increase is usually below 25% versus the uninjured side. Types I–II are usually managed conservatively.', 'راک‌وود II = پارگی رباط‌های AC و کشیدگی/آسیب جزئی رباط‌های CC؛ افزایش CCD معمولاً کمتر از ۲۵٪ نسبت به سمت سالم است. انواع I–II معمولاً محافظه‌کارانه درمان می‌شوند.')[lang]
  ),

  Q(`ak-lux-rock-2-${lang}`,
    L('Was unterscheidet Rockwood Typ V von Typ III?',
      'What distinguishes Rockwood Type V from Type III?',
      'چه چیزی راک‌وود نوع V را از نوع III متمایز می‌کند؟')[lang],
    [
      L('Anteriore Dislokation der Klavikula', 'Anterior dislocation of the clavicle', 'جابجایی قدامی کلاویکول')[lang],
      L('Posteriore Dislokation der Klavikula', 'Posterior dislocation of the clavicle', 'جابجایی خلفی کلاویکول')[lang],
      L('Wie Typ III, zusätzlich deltotrapeziale Faszienablösung und CCD-Zunahme meist >100 % gegenüber der Gegenseite', 'As Type III, plus deltotrapezial fascia detachment and usually >100% CCD increase versus the opposite side', 'مانند نوع III، به‌علاوه جداشدگی فاسیای دلتوتراپزیوس و معمولاً افزایش CCD بیش از ۱۰۰٪ نسبت به سمت مقابل')[lang],
      L('Inferiore Luxation der Klavikula', 'Inferior dislocation of the clavicle', 'جابجایی تحتانی کلاویکول')[lang],
    ],
    2,
    L('Typ V umfasst wie Typ III eine Verletzung der AC- und CC-Stabilisatoren, zusätzlich eine Ablösung der deltotrapezialen Faszie und meist eine CCD-Zunahme von etwa 100–300 % gegenüber der Gegenseite. Die Therapie wird fachärztlich beurteilt; Typ V allein ersetzt keine individuelle Indikationsstellung.', 'Type V, like Type III, involves injury to the AC and CC stabilisers, with additional deltotrapezial fascia detachment and usually about 100–300% CCD increase versus the opposite side. Treatment requires specialist assessment; the Type V label does not replace individual indication setting.', 'نوع V مانند نوع III شامل آسیب تثبیت‌کننده‌های AC و CC است و علاوه بر آن فاسیای دلتوتراپزیوس جدا می‌شود و معمولاً CCD حدود ۱۰۰ تا ۳۰۰٪ نسبت به سمت مقابل افزایش می‌یابد. درمان باید توسط متخصص ارزیابی شود؛ برچسب نوع V جایگزین تعیین اندیکاسیون فردی نیست.')[lang]
  ),

  Q(`ak-lux-rock-3-${lang}`,
    L('Eine 28-jährige Patientin stürzt beim Radfahren auf die linke Schulter. Das AP-Röntgen wirkt normal. Die axiale Aufnahme zeigt, dass die Klavikula nach dorsal in den M. trapezius verlagert ist. Welcher Rockwood-Typ liegt vor?',
      'A 28-year-old woman falls onto her left shoulder while cycling. The AP X-ray looks normal. The axial view shows the clavicle displaced posteriorly into the trapezius muscle. Which Rockwood type is this?',
      'یک زن ۲۸ ساله هنگام دوچرخه‌سواری روی شانه چپ می‌افتد. رادیوگرافی AP طبیعی به نظر می‌رسد. نمای محوری نشان می‌دهد کلاویکول به صورت خلفی در عضله تراپزیوس جابجا شده. کدام نوع راک‌وود است؟')[lang],
    [
      L('Rockwood I', 'Rockwood I', 'راک‌وود I')[lang],
      L('Rockwood III', 'Rockwood III', 'راک‌وود III')[lang],
      L('Rockwood IV', 'Rockwood IV', 'راک‌وود IV')[lang],
      L('Rockwood VI', 'Rockwood VI', 'راک‌وود VI')[lang],
    ],
    2,
    L('Rockwood Typ IV: posteriore Verlagerung in/durch den M. trapezius. Bei Verdacht axiale/axilläre Aufnahme ergänzen. Symptomatische Typ-IV-Verletzungen werden häufig operativ beurteilt/behandelt; diese allgemeine Regel ersetzt keine fachärztliche Beurteilung.', 'Rockwood Type IV: posterior displacement into/through trapezius. Add an axial/axillary view when suspected. Symptomatic Type IV injuries are commonly assessed/treated surgically; this general pattern does not replace specialist assessment.', 'راک‌وود نوع IV: جابجایی خلفی به داخل/از میان تراپزیوس. در صورت شک، نمای محوری/آگزیلاری اضافه کنید. آسیب‌های علامت‌دار نوع IV اغلب برای درمان جراحی ارزیابی می‌شوند؛ این الگوی کلی جایگزین ارزیابی تخصصی نیست.')[lang]
  ),

  Q(`ak-lux-ccd-1-${lang}`,
    L("Nach Schultertrauma beträgt die CCD bei gleicher Aufnahmetechnik rechts 13 mm, links unverletzt 10 mm. Wie wird die relative Zunahme rechts korrekt angegeben?",
      "After shoulder trauma, using the same radiographic technique, CCD measures 13 mm on the right and 10 mm on the uninjured left. How is the relative right-sided increase correctly reported?",
      "پس از ترومای شانه، با تکنیک یکسان، CCD در راست ۱۳ میلی‌متر و در چپِ سالم ۱۰ میلی‌متر است. افزایش نسبی سمت راست چگونه درست گزارش می‌شود؟")[lang],
    [
      L("Zunahme um 3 % gegenüber der unverletzten Seite.", "A 3% increase relative to the uninjured side.", "افزایش ۳٪ نسبت به سمت سالم.")[lang],
      L("Zunahme um 30 % gegenüber der unverletzten Seite.", "A 30% increase relative to the uninjured side.", "افزایش ۳۰٪ نسبت به سمت سالم.")[lang],
      L("Zunahme um 130 % gegenüber der unverletzten Seite.", "A 130% increase relative to the uninjured side.", "افزایش ۱۳۰٪ نسبت به سمت سالم.")[lang],
      L("Zunahme um etwa 23 % gegenüber der unverletzten Seite.", "An approximately 23% increase relative to the uninjured side.", "افزایش حدود ۲۳٪ نسبت به سمت سالم.")[lang],
    ],
    1,
    L("Die Zunahme wird auf die unverletzte Seite bezogen: (13 − 10) / 10 × 100 = 30 %. Ein absoluter Wert von 13 mm reicht zur Klassifikation nicht; Verlagerungsrichtung und gesamte Morphologie mitbeurteilen.", "Reference the increase to the uninjured side: (13 − 10) / 10 × 100 = 30%. An absolute value of 13 mm is insufficient for classification; assess displacement direction and overall morphology.", "افزایش نسبت به سمت سالم محاسبه می‌شود: (۱۳ − ۱۰) / ۱۰ × ۱۰۰ = ۳۰٪. مقدار مطلق ۱۳ میلی‌متر برای طبقه‌بندی کافی نیست؛ جهت جابه‌جایی و مورفولوژی کلی نیز ارزیابی شوند.")[lang]
  ),

  Q(`ak-lux-therapie-1-${lang}`,
    L('Welche Aussage zur Therapie der AC-Luxation ist RICHTIG?',
      'Which statement about AC joint dislocation treatment is CORRECT?',
      'کدام گزینه درباره درمان لوکساسیون مفصل AC درست است؟')[lang],
    [
      L('Rockwood III wird immer operiert', 'Rockwood III is always treated surgically', 'راک‌وود III همیشه جراحی می‌شود')[lang],
      L('Rockwood I und II werden üblicherweise konservativ behandelt', 'Rockwood I and II are usually managed conservatively', 'راک‌وود I و II معمولاً به‌صورت محافظه‌کارانه درمان می‌شوند')[lang],
      L('Rockwood IV wird primär konservativ behandelt', 'Rockwood IV is primarily treated conservatively', 'راک‌وود IV به صورت اولیه محافظه‌کارانه درمان می‌شود')[lang],
      L('Typ VI tritt am häufigsten auf', 'Type VI is the most common type', 'نوع VI شایع‌ترین است')[lang],
    ],
    1,
    L('Typ I–II werden üblicherweise konservativ behandelt; symptomatische IV–VI werden häufig operativ beurteilt. Typ III bleibt umstritten und individuell. Typ VI ist selten. Therapieentscheidung nach klinischem Gesamtbild.', 'Types I–II are usually managed conservatively; symptomatic IV–VI are commonly assessed for surgery. Type III remains debated and individualised. Type VI is rare. Treatment decisions depend on the overall clinical picture.', 'نوع I–II معمولاً محافظه‌کارانه درمان می‌شوند؛ انواع علامت‌دار IV–VI اغلب برای جراحی ارزیابی می‌شوند. نوع III همچنان مورد اختلاف و فردی‌سازی‌شده است. نوع VI نادر است. تصمیم درمانی بر اساس کل وضعیت بالینی گرفته می‌شود.')[lang]
  ),

  Q(`ak-lux-tossy-1-${lang}`,
    L('Welche Einschränkung hat die Tossy-Klassifikation gegenüber Rockwood?',
      'What is a limitation of the Tossy classification compared with Rockwood?',
      'محدودیت طبقه‌بندی توسی در مقایسه با راک‌وود چیست؟')[lang],
    [
      L('Weil sie zu komplex ist', 'Because it is too complex', 'چون خیلی پیچیده است')[lang],
      L('Weil sie nur 3 Typen unterscheidet und die posteriore/inferiore Dislokation nicht erfasst', 'Because it only distinguishes 3 types and does not capture posterior/inferior dislocation', 'چون فقط ۳ نوع را متمایز می‌کند و جابجایی خلفی/تحتانی را در نظر نمی‌گیرد')[lang],
      L('Weil sie röntgenologisch nicht anwendbar ist', 'Because it cannot be applied radiologically', 'چون از نظر رادیولوژیک قابل استفاده نیست')[lang],
      L('Weil sie keine klinischen Zeichen einbezieht', 'Because it does not include clinical signs', 'چون علائم بالینی را در بر نمی‌گیرد')[lang],
    ],
    1,
    L('Tossy I–III deckt posteriore/inferiore Dislokationen und extreme Hochstände nicht ab; Rockwood erweitert die Einteilung auf IV–VI. Rockwood ist verbreitet, die Klassifikation ersetzt jedoch keine klinische Beurteilung.', 'Tossy I–III does not cover posterior/inferior displacement or extreme elevation; Rockwood extends the classification to IV–VI. Rockwood is widely used, but classification does not replace clinical assessment.', 'توسی I–III جابجایی خلفی/تحتانی یا ارتفاع شدید را پوشش نمی‌دهد؛ راک‌وود طبقه‌بندی را به IV–VI گسترش می‌دهد. راک‌وود رایج است، اما طبقه‌بندی جایگزین ارزیابی بالینی نیست.')[lang]
  ),

  Q(`ak-lux-belastung-1-${lang}`,
    L('Wann kann eine Panorama-Belastungsaufnahme ergänzend erwogen werden?',
      'When may a panoramic stress view be considered as an adjunct?',
      'نمای پانورامیک استرس را چه زمانی می‌توان به‌صورت تکمیلی در نظر گرفت؟')[lang],
    [
      L('Zum Nachweis von Rotatorenmanschettenrissen', 'To detect rotator cuff tears', 'برای تشخیص پارگی روتاتور کاف')[lang],
      L('Bei konkreter Zusatzfrage zur CCD-Seitendifferenz; der Klassifikationsnutzen ist begrenzt/uneinheitlich, keine Routineaufnahme.', 'For a specific unresolved question about side-to-side CCD difference; classification benefit is limited/inconsistent, not a routine view.', 'برای پرسش مشخص و حل‌نشده درباره اختلاف CCD دو طرف؛ ارزش آن برای طبقه‌بندی محدود/متناقض است و نمای روتین نیست.')[lang],
      L('Zur Erkennung einer Clavicula-Fraktur', 'To detect clavicle fracture', 'برای تشخیص شکستگی کلاویکول')[lang],
      L('Als Ersatz für die axiale Aufnahme', 'As a substitute for the axial view', 'به عنوان جایگزین نمای محوری')[lang],
    ],
    1,
    L('Die Evidenz ist widersprüchlich: Nordin et al. (online 2020/Ausgabe 2021, doi:10.1177/0284185120939270) fanden keinen signifikanten Klassifikationsgewinn; Ibrahim et al. (2015, doi:10.1016/j.injury.2015.06.028) berichteten einen Nutzen bilateraler Belastungsaufnahmen. Daher nur bei konkreter Fragestellung/lokalem Protokoll erwägen, nicht routinemäßig; geeignete Standard-/Axialaufnahmen bleiben erforderlich.', 'Evidence conflicts: Nordin et al. (online 2020/issue 2021, doi:10.1177/0284185120939270) found no significant classification gain; Ibrahim et al. (2015, doi:10.1016/j.injury.2015.06.028) reported value from bilateral weighted views. Consider them only for a specific question/local protocol, not routinely; appropriate standard/axial views remain necessary.', 'شواهد متناقض‌اند: نوردین و همکاران (آنلاین ۲۰۲۰/شماره ۲۰۲۱، doi:10.1177/0284185120939270) بهبود معناداری در طبقه‌بندی نیافتند؛ ابراهیم و همکاران (۲۰۱۵، doi:10.1016/j.injury.2015.06.028) برای نماهای وزنه‌دار دوطرفه ارزش گزارش کردند. بنابراین فقط برای پرسش مشخص/پروتکل محلی و نه به‌صورت روتین در نظر بگیرید؛ نماهای استاندارد/محوری مناسب همچنان لازم‌اند.')[lang]
  ),

  Q(`ak-lux-rock-vi-1-${lang}`,
    L('Was ist charakteristisch für die Rockwood-Typ-VI-Luxation?',
      'What characterises a Rockwood Type VI dislocation?',
      'چه چیزی مشخصه لوکساسیون راک‌وود نوع VI است؟')[lang],
    [
      L('Superiore Dislokation der Klavikula', 'Superior dislocation of the clavicle', 'جابجایی فوقانی کلاویکول')[lang],
      L('Anteriore Dislokation der Klavikula', 'Anterior dislocation of the clavicle', 'جابجایی قدامی کلاویکول')[lang],
      L('Inferiore Dislokation der Klavikula unter Akromion oder Processus coracoideus', 'Inferior dislocation of the clavicle below the acromion or coracoid process', 'جابجایی تحتانی کلاویکول زیر آکرومیون یا پروسه کوراکوئید')[lang],
      L('Fraktur der Klavikula', 'Fracture of the clavicle', 'شکستگی کلاویکول')[lang],
    ],
    2,
    L('Rockwood VI ist selten; die Klavikula ist inferior subakromial oder subkorakoidal verlagert. Diese Hochgradverletzung erfordert zeitnahe fachärztliche Beurteilung; konkrete Therapie nach Gesamtbefund und Patient.', 'Rockwood VI is rare; the clavicle is displaced inferiorly into a subacromial or subcoracoid position. This high-grade injury warrants timely specialist assessment; treatment depends on the overall findings and patient.', 'راک‌وود VI نادر است؛ کلاویکول به موقعیت تحتانی زیرآکرومیال یا زیرکوراکوئید جابجا می‌شود. این آسیب شدید نیازمند ارزیابی به‌موقع متخصص است؛ درمان بر اساس یافته‌های کلی و شرایط بیمار تعیین می‌شود.')[lang]
  ),

  Q(`ak-lux-norm-1-${lang}`,
    L('Welcher Befund ist bei Rockwood Typ I zu erwarten?',
      'Which finding is expected in Rockwood Type I?',
      'کدام یافته در راک‌وود نوع I انتظار می‌رود؟')[lang],
    [
      L('Leichte Dehiszenz des AC-Gelenks', 'Mild AC joint widening', 'اتساع خفیف مفصل AC')[lang],
      L('Normales Röntgenbild – klinische Diagnose', 'Normal X-ray – clinical diagnosis', 'رادیوگرافی طبیعی – تشخیص بالینی')[lang],
      L('Hochstand > 100 % gegenüber der Gegenseite', 'Elevation >100% versus the opposite side', 'ارتفاع بیش از ۱۰۰٪ نسبت به سمت مقابل')[lang],
      L('Posteriore Verlagerung der Klavikula', 'Posterior displacement of the clavicle', 'جابجایی خلفی کلاویکول')[lang],
    ],
    1,
    L('Typ I: leichte AC-Banddistorsion ohne radiologische Dislokation; Diagnose klinisch bei passenden Befunden. Üblicherweise konservative symptomorientierte Behandlung.', 'Type I: mild AC-ligament sprain without radiographic displacement; diagnosis is clinical when findings fit. Usually managed conservatively according to symptoms.', 'نوع I: کشیدگی خفیف رباط AC بدون جابجایی رادیوگرافیک؛ در صورت تطابق یافته‌ها تشخیص بالینی است. معمولاً بر اساس علائم به‌صورت محافظه‌کارانه درمان می‌شود.')[lang]
  ),

  Q(`ak-lux-op-1-${lang}`,
    L('Welches Operationsverfahren wird bei AC-Luxation Typ IV–VI häufig eingesetzt?',
      'Which surgical technique is commonly used for AC dislocation Types IV–VI?',
      'کدام روش جراحی معمولاً برای لوکساسیون AC نوع IV–VI استفاده می‌شود؟')[lang],
    [
      L('Schulterarthroskopie ohne Fixation', 'Shoulder arthroscopy without fixation', 'آرتروسکوپی شانه بدون تثبیت')[lang],
      L('Tight-Rope-System (arthroskopisch) oder Hakenplatte', 'Tight-rope system (arthroscopic) or hook plate', 'سیستم تایت‌روپ (آرتروسکوپیک) یا صفحه قلاب‌دار')[lang],
      L('Klavikulaentfernung (Resektionsarthroplastik)', 'Clavicle resection arthroplasty', 'برداشتن کلاویکول (آرتروپلاستی رزکسیون)')[lang],
      L('Gipsruhigstellung für 12 Wochen', 'Plaster cast immobilisation for 12 weeks', 'تثبیت گچی برای ۱۲ هفته')[lang],
    ],
    1,
    L('Suspensionssysteme (z. B. Tight-Rope) und Hakenplatten sind Beispiele operativer Stabilisierung. Technik und zusätzliche Bandrekonstruktion richten sich nach Verletzungsmuster und lokalem Vorgehen; eine spätere Entfernung der Hakenplatte hängt vom Implantat-/Behandlungsplan ab.', 'Suspensory devices (e.g. tight-rope) and hook plates are examples of operative stabilisation. Technique and additional ligament reconstruction depend on the injury pattern and local approach; later hook-plate removal depends on the implant/treatment plan.', 'سیستم‌های تعلیقی (مانند تایت‌روپ) و صفحات قلاب‌دار نمونه‌هایی از تثبیت جراحی هستند. روش و بازسازی اضافی رباط بر اساس الگوی آسیب و رویکرد محلی انتخاب می‌شود؛ خارج کردن بعدی صفحه قلاب‌دار به نوع ایمپلنت و برنامه درمان بستگی دارد.')[lang]
  ),

].map(q => ({ ...q, tags: ['ak-luxation'] }))]))

export const AK_LUXATION_FLASHCARDS = [

  F('ak-lux-fc-1', L('Anatomie', 'Anatomy', 'آناتومی'),
    L('Welche zwei Bandgruppen stabilisieren das AC-Gelenk?', 'Which two ligament groups stabilise the AC joint?', 'کدام دو گروه رباط مفصل AC را تثبیت می‌کنند؟'),
    L('1) AC-Kapsel/Bänder tragen zur horizontalen (AP), 2) CC-Bänder (Trapezoid + Konoid) zur vertikalen Stabilität bei. Typ III umfasst eine Ruptur beider Bandgruppen.', '1) AC capsule/ligaments contribute to horizontal (AP), and 2) CC ligaments (trapezoid + conoid) to vertical stability. Type III includes rupture of both ligament groups.', '۱) کپسول/رباط‌های AC در پایداری افقی (AP) و ۲) رباط‌های CC (ترپزوئید و کونوئید) در پایداری عمودی نقش دارند. نوع III شامل پارگی هر دو گروه رباط است.'),
    L('AC = vor allem horizontal; CC = vor allem vertikal. Klassifikation anhand des gesamten Verletzungsmusters.', 'AC = mainly horizontal; CC = mainly vertical. Classification uses the overall injury pattern.', 'AC = عمدتاً افقی؛ CC = عمدتاً عمودی. طبقه‌بندی بر اساس الگوی کلی آسیب است.')
  ),

  F('ak-lux-fc-2', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Wie hilft der CCD-Seitenvergleich; wann kann Zusatzbelastung erwogen werden?', 'How does side-to-side CCD comparison help, and when might added load be considered?', 'مقایسه CCD دو طرف چه کمکی می‌کند و چه زمانی می‌توان بارگذاری افزوده را در نظر گرفت؟'),
    L('CCD im Seitenvergleich messen; 11–13 mm ist ein publizierter Orientierungsbereich mit individueller Varianz. Die Evidenz zur Zusatzbelastung ist widersprüchlich: Nordin et al. (online 2020/Ausgabe 2021, doi:10.1177/0284185120939270) fanden keinen signifikanten Gewinn; Ibrahim et al. (2015, doi:10.1016/j.injury.2015.06.028) berichteten Nutzen. Die PDF-Angabe 10–15 kg pro Seite ist keine Routineempfehlung; andere Quellen nennen geringere Lasten.', 'Measure CCD side to side; 11–13 mm is a published orienting range with individual variation. Evidence on weighted views conflicts: Nordin et al. (online 2020/issue 2021, doi:10.1177/0284185120939270) found no significant gain; Ibrahim et al. (2015, doi:10.1016/j.injury.2015.06.028) reported value. The PDF’s 10–15 kg per-side load is not a routine recommendation; other sources describe lower loads.', 'CCD را در دو طرف اندازه‌گیری و مقایسه کنید؛ ۱۱ تا ۱۳ میلی‌متر محدوده‌ای راهنما در منابع منتشرشده است و تفاوت فردی دارد. شواهد نماهای وزنه‌دار متناقض است: نوردین و همکاران (آنلاین ۲۰۲۰/شماره ۲۰۲۱، doi:10.1177/0284185120939270) بهبود معناداری نیافتند؛ ابراهیم و همکاران (۲۰۱۵، doi:10.1016/j.injury.2015.06.028) ارزش آن را گزارش کردند. بار ۱۰ تا ۱۵ کیلوگرم در هر طرف که در PDF آمده توصیه روتین نیست؛ منابع دیگر بار کمتری ذکر می‌کنند.'),
    L('Seitenvergleich, keine starre Einzelgrenze; gewichtete Aufnahme nur gezielt.', 'Compare sides, avoid rigid single cutoff; use weighted view selectively.', 'مقایسه دو طرف، نه مرز مطلق؛ نمای وزنه‌دار فقط به‌صورت انتخابی.')
  ),

  F('ak-lux-fc-3', L('Rockwood', 'Rockwood', 'راک‌وود'),
    L('Rockwood I–VI: Therapieprinzip?', 'Rockwood I–VI: Treatment principle?', 'راک‌وود I–VI: اصل درمان؟'),
    L('I–II meist konservativ. III umstritten und individuell. Symptomatische IV–VI häufig operativ beurteilt; Befund, Begleitverletzungen und Patientenziele einbeziehen.', 'I–II usually conservative. III debated and individualised. Symptomatic IV–VI commonly assessed for surgery; consider findings, associated injuries, and patient goals.', 'I–II معمولاً محافظه‌کارانه. III مورد اختلاف و فردی‌سازی‌شده. IV–VI علامت‌دار اغلب برای جراحی ارزیابی می‌شوند؛ یافته‌ها، آسیب‌های همراه و اهداف بیمار را لحاظ کنید.'),
    L('Therapieprinzipien sind Orientierung, keine automatische OP-Regel; Typ III bleibt die Grauzone.', 'Treatment principles are guidance, not automatic surgery rules; Type III remains the grey zone.', 'اصول درمان راهنما هستند، نه قاعده خودکار جراحی؛ نوع III همچنان ناحیه خاکستری است.')
  ),

  F('ak-lux-fc-4', L('Rockwood', 'Rockwood', 'راک‌وود'),
    L('Rockwood Typ IV: Worin besteht die Besonderheit?', 'Rockwood Type IV: What is the distinctive feature?', 'راک‌وود نوع IV: ویژگی خاص چیست؟'),
    L('Posteriore Verlagerung der Klavikula in/durch den M. trapezius. Bei Verdacht axiale/axilläre Projektion ergänzen; symptomatische Verletzungen häufig fachärztlich operativ beurteilen.', 'Posterior displacement of the clavicle into/through trapezius. Add an axial/axillary projection when suspected; symptomatic injuries are commonly assessed for surgery by a specialist.', 'جابجایی خلفی کلاویکول به داخل/از میان تراپزیوس. در صورت شک نمای محوری/آگزیلاری اضافه کنید؛ آسیب‌های علامت‌دار اغلب توسط متخصص برای جراحی ارزیابی می‌شوند.'),
    L('Typ IV = posterior; bei Verdacht axial/axillär ergänzen.', 'Type IV = posterior; add axial/axillary view when suspected.', 'نوع IV = خلفی؛ در صورت شک نمای محوری/آگزیلاری اضافه شود.')
  ),

  F('ak-lux-fc-5', L('Rockwood', 'Rockwood', 'راک‌وود'),
    L('Unterschied Rockwood III vs. V?', 'Difference Rockwood III vs. V?', 'تفاوت راک‌وود III در مقابل V؟'),
    L('Typ III: AC- und CC-Bandverletzung mit CCD-Zunahme 25–100 % im Seitenvergleich. Typ V: zusätzliche Ablösung der deltotrapezialen Faszie und meist 100–300 % CCD-Zunahme.', 'Type III: AC and CC ligament injury with 25–100% CCD increase side to side. Type V: additional deltotrapezial fascia detachment and usually 100–300% CCD increase.', 'نوع III: آسیب رباط‌های AC و CC با افزایش ۲۵ تا ۱۰۰٪ CCD در مقایسه دو طرف. نوع V: به‌علاوه جداشدگی فاسیای دلتوتراپزیوس و معمولاً افزایش ۱۰۰ تا ۳۰۰٪ CCD.'),
    L('V = stärkere vertikale Verschiebung plus deltotrapeziale Faszienablösung; Prozentwerte im Seitenvergleich.', 'V = greater vertical displacement plus deltotrapezial fascia detachment; percentages refer to side-to-side comparison.', 'V = جابجایی عمودی بیشتر به‌علاوه جداشدگی فاسیای دلتوتراپزیوس؛ درصدها بر پایه مقایسه دو طرف هستند.')
  ),

  F('ak-lux-fc-6', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Wann ist ein normales AP-Röntgen trotzdem falsch-negativ für eine AC-Luxation?', 'When is a normal AP X-ray still falsely negative for AC dislocation?', 'چه زمانی رادیوگرافی AP طبیعی برای لوکساسیون AC کاذب-منفی است؟'),
    L('Bei Verdacht auf Typ IV kann posteriore Verlagerung im AP übersehen werden; axial/axillär ergänzen. Typ I zeigt typischerweise keine radiologische Dislokation.', 'If Type IV is suspected, posterior displacement may be missed on AP; add an axial/axillary view. Type I typically has no radiographic displacement.', 'در صورت شک به نوع IV، جابجایی خلفی ممکن است در AP دیده نشود؛ نمای محوری/آگزیلاری اضافه شود. نوع I معمولاً جابجایی رادیوگرافیک ندارد.'),
    L('Typ IV: Verdacht → axiale/axilläre Zusatzprojektion; Typ I: meist Normalbefund.', 'Type IV: suspicion → add axial/axillary view; Type I: usually normal radiograph.', 'نوع IV: شک بالینی → نمای محوری/آگزیلاری افزوده؛ نوع I: معمولاً رادیوگرافی طبیعی.')
  ),

  F('ak-lux-fc-7', L('Anatomie', 'Anatomy', 'آناتومی'),
    L('Tossy vs. Rockwood: Was ergänzt Rockwood?', 'Tossy vs. Rockwood: What does Rockwood add?', 'توسی در برابر راک‌وود: راک‌وود چه چیزی اضافه می‌کند؟'),
    L('Tossy I–III deckt posteriore/inferiore Dislokation und extreme Hochstände nicht ab; Rockwood ergänzt Typ IV–VI. Rockwood ist verbreitet, ersetzt aber keine klinische Beurteilung.', 'Tossy I–III does not cover posterior/inferior displacement or extreme elevation; Rockwood adds Types IV–VI. Rockwood is widely used but does not replace clinical assessment.', 'توسی I–III جابجایی خلفی/تحتانی و ارتفاع شدید را پوشش نمی‌دهد؛ راک‌وود انواع IV–VI را اضافه می‌کند. راک‌وود رایج است اما جایگزین ارزیابی بالینی نیست.'),
    L('Tossy I–III entsprechen ungefähr Rockwood I–III; Rockwood ergänzt IV–VI.', 'Tossy I–III roughly correspond to Rockwood I–III; Rockwood adds IV–VI.', 'توسی I–III تقریباً متناظر با راک‌وود I–III؛ راک‌وود IV–VI را اضافه می‌کند.')
  ),

  F('ak-lux-fc-8', L('Therapie', 'Treatment', 'درمان'),
    L('Welche OP-Verfahren werden bei Typ IV–VI eingesetzt?', 'Which surgical procedures are used for Types IV–VI?', 'کدام روش‌های جراحی برای نوع IV–VI استفاده می‌شوند؟'),
    L('Suspensionssysteme (z. B. Tight-Rope) und Hakenplatten sind Beispiele operativer Stabilisierung. Technik und zusätzliche Bandrekonstruktion richten sich nach Verletzungsmuster und lokalem Vorgehen; eine spätere Entfernung der Hakenplatte hängt vom Implantat-/Behandlungsplan ab.', 'Suspensory devices (e.g. tight-rope) and hook plates are examples of operative stabilisation. Technique and additional ligament reconstruction depend on the injury pattern and local approach; later hook-plate removal depends on the implant/treatment plan.', 'سیستم‌های تعلیقی (مانند تایت‌روپ) و صفحات قلاب‌دار نمونه‌هایی از تثبیت جراحی هستند. روش و بازسازی اضافی رباط بر اساس الگوی آسیب و رویکرد محلی انتخاب می‌شود؛ خارج کردن بعدی صفحه قلاب‌دار به نوع ایمپلنت و برنامه درمان بستگی دارد.'),
    L('Beispiele, keine abschließende Methodenliste; Eingriff und Implantatmanagement werden individuell festgelegt.', 'Examples, not an exhaustive list; the operation and implant plan are individualised.', 'نمونه‌هایی از روش‌ها، نه فهرستی جامع؛ عمل و برنامه ایمپلنت به‌صورت فردی تعیین می‌شود.')
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
