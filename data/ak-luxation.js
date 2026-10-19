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
      'CC-Bänder halten die Klavikula in der Vertikalen; AC-Bänder sichern sie horizontal. Erst bei Ruptur beider Systeme kommt es zur vollständigen Luxation (Rockwood ≥ III).',
      'CC ligaments hold the clavicle vertically; AC ligaments secure it horizontally. Complete dislocation (Rockwood ≥ III) only occurs when both systems rupture.',
      'رباط‌های CC کلاویکول را به صورت عمودی نگه می‌دارند؛ رباط‌های AC آن را به صورت افقی ثابت می‌کنند. لوکساسیون کامل (راک‌وود ≥ III) فقط هنگامی رخ می‌دهد که هر دو سیستم پاره شوند.'
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
        L('Schulter axial', 'Shoulder axial/lateral', 'شانه محوری/جانبی'),
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
        'Die PDF nennt 11–13 mm als Orientierungsbereich; ein passender unabhängiger Normwertbeleg ist noch ausstehend. Technik und individuelle Varianz beachten und möglichst mit der Gegenseite vergleichen. Zur Zusatzklassifikation durch Belastungsaufnahmen ist die Evidenz widersprüchlich: Nordin et al. (online 2020, Ausgabe 2021; doi:10.1177/0284185120939270) fanden keinen signifikanten Klassifikationsgewinn; Ibrahim et al. (2015; doi:10.1016/j.injury.2015.06.028) berichteten einen Nutzen bilateraler gewichteter Aufnahmen.',
        'The PDF gives 11–13 mm as an orienting range; an appropriate independent normative reference is still pending. Account for technique and individual variation, and compare with the other side when possible. Evidence on added classification from weighted views conflicts: Nordin et al. (online 2020, issue 2021; doi:10.1177/0284185120939270) found no significant classification gain, while Ibrahim et al. (2015; doi:10.1016/j.injury.2015.06.028) reported value from bilateral weighted views.',
        'PDF محدوده ۱۱ تا ۱۳ میلی‌متر را به‌عنوان راهنما ذکر می‌کند؛ منبع مستقل و مناسب برای مقدار هنجار هنوز در انتظار بررسی است. تفاوت تکنیک و فردی را لحاظ کنید و در صورت امکان طرف مقابل را مقایسه کنید. شواهد ارزش افزوده نماهای وزنه‌دار برای طبقه‌بندی متناقض است: نوردین و همکاران (انتشار آنلاین ۲۰۲۰، شماره ۲۰۲۱؛ doi:10.1177/0284185120939270) بهبود معناداری در طبقه‌بندی نیافتند، اما ابراهیم و همکاران (۲۰۱۵؛ doi:10.1016/j.injury.2015.06.028) برای نماهای وزنه‌دار دوطرفه ارزش گزارش کردند.'
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
      'Typ IV (posteriore Dislokation) ist im AP-Bild oft unauffällig! Axiale Aufnahme ist obligat zum Ausschluss.',
      'Type IV (posterior dislocation) is often inconspicuous on AP! Axial view is mandatory to exclude it.',
      'نوع IV (جابجایی خلفی) در نمای AP اغلب قابل توجه نیست! نمای محوری برای رد آن اجباری است.'
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
      'Rockwood-Klassifikation Typ I–VI – schematische Darstellung (Radiopaedia)',
      'Rockwood Classification Types I–VI – schematic illustration (Radiopaedia)',
      'طبقه‌بندی راک‌وود نوع I–VI – نمایش شماتیک (رادیوپدیا)'
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
        L('Ruptur AC-Bänder + Zerrung CC-Bänder + Kapselriss', 'Rupture of AC ligaments + sprain of CC ligaments + capsular tear', 'پارگی رباط‌های AC + کشش رباط‌های CC + پارگی کپسول'),
        L('Leichte Dehiszenz; Hochstand < 50 % der Gelenkhöhe', 'Mild widening; elevation < 50 % of joint height', 'اتساع خفیف؛ ارتفاع < ۵۰٪ ارتفاع مفصل'),
        L('CCD leicht erhöht (< 25 % Seitendifferenz)', 'CCD mildly elevated (< 25 % side difference)', 'CCD اندکی افزایش یافته (< ۲۵٪ تفاوت دو طرف)'),
      ],
      [
        L('III', 'III', 'III'),
        L('Ruptur AC- und CC-Bänder', 'Rupture of both AC and CC ligaments', 'پارگی رباط‌های AC و CC'),
        L('Komplette Luxation; Hochstand > 50 % (CCD < 25 mm)', 'Complete dislocation; elevation > 50 % (CCD < 25 mm)', 'لوکساسیون کامل؛ ارتفاع > ۵۰٪ (CCD < ۲۵ میلی‌متر)'),
        L('Therapie kontrovers (konservativ vs. OP)', 'Treatment controversial (conservative vs. surgery)', 'درمان بحث‌برانگیز (محافظه‌کارانه در مقابل جراحی)'),
      ],
      [
        L('IV', 'IV', 'IV'),
        L('Ruptur AC- und CC-Bänder + posteriore Dislokation', 'Rupture of AC and CC ligaments + posterior dislocation', 'پارگی رباط‌های AC و CC + جابجایی خلفی'),
        L('Klavikula nach posterior in M. trapezius verlagert', 'Clavicle displaced posteriorly into trapezius muscle', 'کلاویکول به صورت خلفی در عضله تراپزیوس جابجا شده'),
        L('AP oft unauffällig → Axiale Aufnahme obligat', 'AP often unremarkable → axial view mandatory', 'AP اغلب طبیعی → نمای محوری اجباری'),
      ],
      [
        L('V', 'V', 'V'),
        L('Wie Typ III, plus Abriss M. deltoideus/trapezius', 'Like Type III, plus avulsion of deltoid/trapezius', 'مثل نوع III، به علاوه جداشدگی عضلات دلتوئید/تراپزیوس'),
        L('Extremer Hochstand (CCD > 25 mm / > 100 % Seitendifferenz)', 'Extreme elevation (CCD > 25 mm / > 100 % side difference)', 'ارتفاع شدید (CCD > ۲۵ میلی‌متر / > ۱۰۰٪ تفاوت دو طرف)'),
        L('Muskelkontinuität unterbrochen', 'Muscle continuity disrupted', 'پیوستگی عضلانی قطع شده'),
      ],
      [
        L('VI', 'VI', 'VI'),
        L('Ruptur AC- und CC-Bänder + inferiore Dislokation', 'Rupture of AC and CC ligaments + inferior dislocation', 'پارگی رباط‌های AC و CC + جابجایی تحتانی'),
        L('Klavikula inferior unter Akromion/Proc. coracoideus luxiert', 'Clavicle dislocated inferiorly below acromion/coracoid', 'کلاویکول به صورت تحتانی زیر آکرومیون/پروسه کوراکوئید جابجا شده'),
        L('Seltenster Typ; meistens schweres Trauma', 'Rarest type; usually severe trauma', 'نادرترین نوع؛ معمولاً تروما شدید'),
      ],
    ],
    tossy: L(
      'Historisch: Tossy-Klassifikation (I–III) → heute ersetzt durch Rockwood. Tossy I ≈ Rockwood I, Tossy II ≈ Rockwood II, Tossy III ≈ Rockwood III.',
      'Historical note: Tossy classification (I–III) → now replaced by Rockwood. Tossy I ≈ Rockwood I, Tossy II ≈ Rockwood II, Tossy III ≈ Rockwood III.',
      'تاریخچه: طبقه‌بندی توسی (I–III) → اکنون با راک‌وود جایگزین شده. توسی I ≈ راک‌وود I، توسی II ≈ راک‌وود II، توسی III ≈ راک‌وود III.'
    ),
    key: L(
      'Entscheidend für die Therapie: Rockwood I+II → konservativ. Rockwood IV–VI → operativ. Rockwood III → individuell (Alter, Aktivität, Beruf).',
      'Key for treatment: Rockwood I+II → conservative. Rockwood IV–VI → surgical. Rockwood III → individualised (age, activity, occupation).',
      'کلیدی برای درمان: راک‌وود I+II → محافظه‌کارانه. راک‌وود IV–VI → جراحی. راک‌وود III → فردی (سن، فعالیت، شغل).'
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
        L('Ruhigstellung im Gilchrist-Verband (1–3 Wo.) → Analgesie → Physiotherapie. Vollständige Erholung zu erwarten.', 'Immobilisation in Gilchrist sling (1–3 weeks) → analgesia → physiotherapy. Full recovery expected.', 'تثبیت در باند گیلکریست (۱–۳ هفته) → ضد درد → فیزیوتراپی. بهبودی کامل انتظار می‌رود.'),
      ],
      [
        L('III (kontrovers)', 'III (controversial)', 'III (بحث‌برانگیز)'),
        L('Individuell', 'Individualised', 'فردی'),
        L('Konservativ bei niedrigem Anspruch; OP bei Überkopfarbeitern, Hochleistungssportlern oder persistierender Symptomatik (> 3 Monate)', 'Conservative for low-demand patients; surgery for overhead workers, high-performance athletes, or persistent symptoms (> 3 months)', 'محافظه‌کارانه برای بیماران با فعالیت فیزیکی پایین؛ جراحی برای کارگران سر بالا، ورزشکاران حرفه‌ای یا علائم مداوم (> ۳ ماه)'),
      ],
      [
        L('IV, V, VI', 'IV, V, VI', 'IV، V، VI'),
        L('Operativ', 'Surgical', 'جراحی'),
        L('Tight-Rope-System (arthroskopisch, CC-Rekonstruktion) oder Hakenplatte (Hook-Plate). Ziel: anatomische Reposition und Bandrekonstruktion.', 'Tight-rope system (arthroscopic, CC reconstruction) or hook plate. Goal: anatomical reduction and ligament reconstruction.', 'سیستم تایت‌روپ (آرتروسکوپیک، بازسازی CC) یا صفحه قلاب‌دار (Hook-Plate). هدف: ریداکسیون آناتومیک و بازسازی رباط.'),
      ],
    ],
    key: L(
      'Merke: Typ III ist die klinische Grauzone. Überlegte Indikationsstellung – nicht jede Typ-III-Luxation braucht eine Operation.',
      'Note: Type III is the clinical grey zone. Careful indication setting – not every Type III dislocation requires surgery.',
      'نکته: نوع III ناحیه خاکستری بالینی است. تعیین دقیق اندیکاسیون – هر لوکساسیون نوع III نیازی به جراحی ندارد.'
    ),
  },

  takehome: {
    title: L('Take-home Punkte', 'Take-home Points', 'نکات کلیدی'),
    lead: L('Die wichtigsten Punkte auf einen Blick.', 'The most important points at a glance.', 'مهم‌ترین نکات در یک نگاه.'),
    items: [
      {
        title: L('Sturz auf adduzierte Schulter', 'Fall onto adducted shoulder', 'افتادن روی شانه آدوکته'),
        text: L('Direkter Mechanismus → Kraft auf Akromion bei fixierter Klavikula → Bänderverletzung in typischer Reihenfolge: AC → CC → Muskelansätze.', 'Direct mechanism → force on acromion with fixed clavicle → ligament failure in sequence: AC → CC → muscle insertions.', 'مکانیسم مستقیم → نیرو روی آکرومیون با کلاویکول ثابت → آسیب رباط به ترتیب: AC → CC → محل‌های اتصال عضله.'),
      },
      {
        title: L('CCD im Seitenvergleich messen', 'Measure CCD on both sides', 'CCD را در مقایسه دو طرف اندازه‌گیری کنید'),
        text: L('Absoluten CCD-Wert im Kontext beurteilen; Seitenvergleich hilft, individuelle Varianz zu berücksichtigen. 11–13 mm ist die PDF-Angabe, deren unabhängige Normwertquelle noch aussteht. Die Evidenz zur Zusatzklassifikation durch Belastungsaufnahmen ist widersprüchlich: Nordin et al. (online 2020/Ausgabe 2021, doi:10.1177/0284185120939270) fanden keinen signifikanten Gewinn; Ibrahim et al. (2015, doi:10.1016/j.injury.2015.06.028) berichteten einen Nutzen bilateraler Gewichtung.', 'Interpret the absolute CCD in context; side-to-side comparison helps account for individual variation. The 11–13 mm value is quoted from the PDF and its independent normative source is pending. Evidence on classification benefit from weighted views conflicts: Nordin et al. (online 2020/issue 2021, doi:10.1177/0284185120939270) found no significant gain; Ibrahim et al. (2015, doi:10.1016/j.injury.2015.06.028) reported value from bilateral weighting.', 'مقدار مطلق CCD را در زمینه بالینی تفسیر کنید؛ مقایسه دو طرف به تفاوت فردی کمک می‌کند. مقدار ۱۱ تا ۱۳ میلی‌متر از PDF نقل شده و منبع هنجاری مستقل آن در انتظار بررسی است. شواهد ارزش طبقه‌بندی نماهای وزنه‌دار متناقض است: نوردین و همکاران (آنلاین ۲۰۲۰/شماره ۲۰۲۱، doi:10.1177/0284185120939270) بهبود معناداری نیافتند؛ ابراهیم و همکاران (۲۰۱۵، doi:10.1016/j.injury.2015.06.028) ارزش وزن‌دهی دوطرفه را گزارش کردند.'),
      },
      {
        title: L('Typ IV – Axiale Aufnahme obligat', 'Type IV – Axial view is mandatory', 'نوع IV – نمای محوری اجباری است'),
        text: L('Posteriore Dislokation der Klavikula im AP-Bild oft nicht erkennbar! Axiale Projektion schließt Typ IV aus.', 'Posterior clavicular dislocation is often missed on AP view! Axial projection rules out Type IV.', 'جابجایی خلفی کلاویکول در نمای AP اغلب دیده نمی‌شود! نمای محوری نوع IV را رد می‌کند.'),
      },
      {
        title: L('Tossy ist veraltet', 'Tossy is outdated', 'توسی منسوخ شده است'),
        text: L('Tossy I–III entspricht Rockwood I–III, aber Rockwood unterscheidet zusätzlich Typ IV–VI. In der modernen Literatur und Klinik stets Rockwood verwenden.', 'Tossy I–III corresponds to Rockwood I–III, but Rockwood additionally distinguishes Types IV–VI. Always use Rockwood in modern literature and clinical practice.', 'توسی I–III با راک‌وود I–III مطابقت دارد، اما راک‌وود علاوه بر این نوع IV–VI را متمایز می‌کند. همیشه در ادبیات و عمل بالینی مدرن از راک‌وود استفاده کنید.'),
      },
      {
        title: L('Therapieprinzip', 'Treatment principle', 'اصل درمان'),
        text: L('I+II konservativ, IV–VI operativ, III individuell. Bei Typ III Entscheidung abhängig von Alter, Aktivitätsniveau und Beruf.', 'I+II conservative, IV–VI surgical, III individualised. For Type III, decision depends on age, activity level, and occupation.', 'I+II محافظه‌کارانه، IV–VI جراحی، III فردی. برای نوع III، تصمیم به سن، سطح فعالیت و شغل بستگی دارد.'),
      },
    ],
  },
}

const LETTERS = ['A', 'B', 'C', 'D', 'E']
const Q = (id, question, options, correct, explanation) => ({
  id,
  question,
  options: options.map((text, i) => ({ id: LETTERS[i], text })),
  correct: LETTERS[correct],
  explanation,
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
    L('Die korakoklavikulären Bänder (Trapezoid + Konoid) stabilisieren gegen vertikale Kräfte. Die AC-Bänder sichern primär die horizontale (AP) Stabilität. Beide müssen rupturieren für eine vollständige Luxation (Rockwood ≥ III).', 'The coracoclavicular ligaments (trapezoid + conoid) stabilise against vertical forces. The AC ligaments secure primarily horizontal (AP) stability. Both must rupture for complete dislocation (Rockwood ≥ III).', 'رباط‌های کوراکوکلاویکولار (ترپزوئید + کونوئید) در برابر نیروهای عمودی تثبیت می‌کنند. رباط‌های AC عمدتاً پایداری افقی (AP) را تأمین می‌کنند. هر دو باید پاره شوند تا لوکساسیون کامل ایجاد شود (راک‌وود ≥ III).')[lang]
  ),

  Q(`ak-lux-rock-1-${lang}`,
    L('Bei Rockwood Typ II liegt radiologisch vor:',
      'In Rockwood Type II, the X-ray shows:',
      'در راک‌وود نوع II، رادیوگرافی نشان می‌دهد:')[lang],
    [
      L('Normalbefund', 'Normal X-ray', 'رادیوگرافی طبیعی')[lang],
      L('Leichte Dehiszenz / Hochstand < 50 % der Gelenkhöhe', 'Mild widening / elevation < 50 % of joint height', 'اتساع خفیف / ارتفاع < ۵۰٪ ارتفاع مفصل')[lang],
      L('Komplette Luxation mit CCD > 25 mm', 'Complete dislocation with CCD > 25 mm', 'لوکساسیون کامل با CCD > ۲۵ میلی‌متر')[lang],
      L('Posteriore Verlagerung der Klavikula', 'Posterior displacement of the clavicle', 'جابجایی خلفی کلاویکول')[lang],
    ],
    1,
    L('Rockwood II = Ruptur AC-Bänder + Zerrung CC-Bänder. Röntgen: leichte Dehiszenz und Hochstand < 50 % der Gelenkhöhe. Therapie: konservativ.', 'Rockwood II = AC ligament rupture + CC ligament sprain. X-ray: mild joint widening and elevation < 50 % of joint height. Treatment: conservative.', 'راک‌وود II = پارگی رباط‌های AC + کشش رباط‌های CC. رادیوگرافی: اتساع خفیف مفصل و ارتفاع < ۵۰٪ ارتفاع مفصل. درمان: محافظه‌کارانه.')[lang]
  ),

  Q(`ak-lux-rock-2-${lang}`,
    L('Was unterscheidet Rockwood Typ V von Typ III?',
      'What distinguishes Rockwood Type V from Type III?',
      'چه چیزی راک‌وود نوع V را از نوع III متمایز می‌کند؟')[lang],
    [
      L('Anteriore Dislokation der Klavikula', 'Anterior dislocation of the clavicle', 'جابجایی قدامی کلاویکول')[lang],
      L('Posteriore Dislokation der Klavikula', 'Posterior dislocation of the clavicle', 'جابجایی خلفی کلاویکول')[lang],
      L('Extremer Hochstand (CCD > 25 mm) + Abriss M. deltoideus/trapezius', 'Extreme elevation (CCD > 25 mm) + avulsion of deltoid/trapezius', 'ارتفاع شدید (CCD > ۲۵ میلی‌متر) + جداشدگی دلتوئید/تراپزیوس')[lang],
      L('Inferiore Luxation der Klavikula', 'Inferior dislocation of the clavicle', 'جابجایی تحتانی کلاویکول')[lang],
    ],
    2,
    L('Typ V hat die gleiche Bandpathologie wie Typ III (Ruptur AC + CC), aber der Hochstand ist extrem (CCD > 25 mm / > 100 % Seitendifferenz) und die muskulären Ansätze (M. deltoideus, M. trapezius) sind abgerissen. Immer operativ.', 'Type V has the same ligament pathology as Type III (AC + CC rupture), but the elevation is extreme (CCD > 25 mm / > 100 % side difference) and the muscular insertions (deltoid, trapezius) are avulsed. Always surgical.', 'نوع V پاتولوژی رباط یکسانی با نوع III دارد (پارگی AC + CC)، اما ارتفاع شدید است (CCD > ۲۵ میلی‌متر / > ۱۰۰٪ تفاوت دو طرف) و محل‌های اتصال عضلانی (دلتوئید، تراپزیوس) جدا شده‌اند. همیشه جراحی.')[lang]
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
    L('Rockwood Typ IV: Posteriore Dislokation der Klavikula in den M. trapezius. Im AP-Bild oft unauffällig – deshalb ist die axiale Aufnahme obligat! Therapie: immer operativ.', 'Rockwood Type IV: Posterior dislocation of the clavicle into the trapezius muscle. Often unremarkable on AP – axial view is therefore mandatory! Treatment: always surgical.', 'راک‌وود نوع IV: جابجایی خلفی کلاویکول به داخل عضله تراپزیوس. در نمای AP اغلب طبیعی – بنابراین نمای محوری اجباری است! درمان: همیشه جراحی.')[lang]
  ),

  Q(`ak-lux-ccd-1-${lang}`,
    L('Wie ist die CCD-Angabe 11–13 mm aus der PDF einzuordnen?',
      'How should the PDF value of 11–13 mm for CCD be interpreted?',
      'مقدار ۱۱ تا ۱۳ میلی‌متر CCD در PDF را چگونه باید تفسیر کرد؟')[lang],
    [
      L('1–5 mm', '1–5 mm', '۱–۵ میلی‌متر')[lang],
      L('Als PDF-Orientierungswert, nicht als unabhängig bestätigte starre Norm; Seitenvergleich und Technik berücksichtigen.', 'As a PDF orienting value, not an independently verified rigid norm; consider side-to-side comparison and technique.', 'به‌عنوان مقدار راهنمای PDF، نه هنجار قطعیِ مستقلاً تأییدشده؛ مقایسه دو طرف و تکنیک را در نظر بگیرید.')[lang],
      L('20–25 mm', '20–25 mm', '۲۰–۲۵ میلی‌متر')[lang],
      L('30–35 mm', '30–35 mm', '۳۰–۳۵ میلی‌متر')[lang],
    ],
    1,
    L('Die PDF nennt 11–13 mm als Orientierungswert; ein unabhängiger Normwertbeleg ist noch ausstehend. Technik und individuelle Varianz beachten. Beim Rockwood-Typ V kann die CCD deutlich erhöht sein (PDF-Grenze >25 mm); wenn möglich mit der Gegenseite vergleichen.', 'The PDF gives 11–13 mm as an orienting value; an independent normative reference is still pending. Account for technique and individual variation. Rockwood Type V may show marked CCD widening (PDF threshold >25 mm); compare with the other side when possible.', 'PDF مقدار ۱۱ تا ۱۳ میلی‌متر را به‌عنوان راهنما ذکر می‌کند؛ منبع مستقل برای مقدار هنجار هنوز در انتظار بررسی است. تکنیک و تفاوت فردی را لحاظ کنید. در راک‌وود نوع V ممکن است CCD به‌طور واضح افزایش یابد (آستانه PDF بیش از ۲۵ میلی‌متر)؛ در صورت امکان با طرف مقابل مقایسه کنید.')[lang]
  ),

  Q(`ak-lux-therapie-1-${lang}`,
    L('Welche Aussage zur Therapie der AC-Luxation ist RICHTIG?',
      'Which statement about AC joint dislocation treatment is CORRECT?',
      'کدام گزینه درباره درمان لوکساسیون مفصل AC درست است؟')[lang],
    [
      L('Rockwood III wird immer operiert', 'Rockwood III is always treated surgically', 'راک‌وود III همیشه جراحی می‌شود')[lang],
      L('Rockwood I und II werden konservativ behandelt', 'Rockwood I and II are treated conservatively', 'راک‌وود I و II به صورت محافظه‌کارانه درمان می‌شوند')[lang],
      L('Rockwood IV wird primär konservativ behandelt', 'Rockwood IV is primarily treated conservatively', 'راک‌وود IV به صورت اولیه محافظه‌کارانه درمان می‌شود')[lang],
      L('Typ VI tritt am häufigsten auf', 'Type VI is the most common type', 'نوع VI شایع‌ترین است')[lang],
    ],
    1,
    L('Rockwood I und II → konservativ (Gilchrist-Verband). Rockwood IV–VI → immer operativ. Rockwood III → kontrovers / individuell. Typ VI ist der seltenste Typ.', 'Rockwood I and II → conservative (Gilchrist sling). Rockwood IV–VI → always surgical. Rockwood III → controversial / individualised. Type VI is the rarest type.', 'راک‌وود I و II → محافظه‌کارانه (باند گیلکریست). راک‌وود IV–VI → همیشه جراحی. راک‌وود III → بحث‌برانگیز / فردی. نوع VI نادرترین نوع است.')[lang]
  ),

  Q(`ak-lux-tossy-1-${lang}`,
    L('Warum wird die Tossy-Klassifikation heute nicht mehr verwendet?',
      'Why is the Tossy classification no longer used today?',
      'چرا طبقه‌بندی توسی امروزه دیگر استفاده نمی‌شود؟')[lang],
    [
      L('Weil sie zu komplex ist', 'Because it is too complex', 'چون خیلی پیچیده است')[lang],
      L('Weil sie nur 3 Typen unterscheidet und die posteriore/inferiore Dislokation nicht erfasst', 'Because it only distinguishes 3 types and does not capture posterior/inferior dislocation', 'چون فقط ۳ نوع را متمایز می‌کند و جابجایی خلفی/تحتانی را در نظر نمی‌گیرد')[lang],
      L('Weil sie röntgenologisch nicht anwendbar ist', 'Because it cannot be applied radiologically', 'چون از نظر رادیولوژیک قابل استفاده نیست')[lang],
      L('Weil sie keine klinischen Zeichen einbezieht', 'Because it does not include clinical signs', 'چون علائم بالینی را در بر نمی‌گیرد')[lang],
    ],
    1,
    L('Tossy (I–III) unterscheidet nur drei Typen und erfasst nicht die posteriore Dislokation (Typ IV), den extremen Hochstand mit Muskelausriss (Typ V) und die inferiore Dislokation (Typ VI). Rockwood bietet die vollständige Einteilung.', 'Tossy (I–III) only distinguishes three types and does not capture posterior dislocation (Type IV), extreme elevation with muscle avulsion (Type V), or inferior dislocation (Type VI). Rockwood provides the complete classification.', 'توسی (I–III) فقط سه نوع را متمایز می‌کند و جابجایی خلفی (نوع IV)، ارتفاع شدید با جداشدگی عضله (نوع V) و جابجایی تحتانی (نوع VI) را در بر نمی‌گیرد. راک‌وود طبقه‌بندی کامل را ارائه می‌دهد.')[lang]
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
    L('Rockwood VI ist der seltenste Typ. Die Klavikula luxiert inferior unter das Akromion oder den Processus coracoideus. Immer schweres Trauma. Therapie: operativ.', 'Rockwood VI is the rarest type. The clavicle dislocates inferiorly below the acromion or coracoid process. Always involves severe trauma. Treatment: surgical.', 'راک‌وود VI نادرترین نوع است. کلاویکول به صورت تحتانی زیر آکرومیون یا پروسه کوراکوئید جابجا می‌شود. همیشه با تروما شدید همراه است. درمان: جراحی.')[lang]
  ),

  Q(`ak-lux-norm-1-${lang}`,
    L('Welcher Befund ist bei Rockwood Typ I zu erwarten?',
      'Which finding is expected in Rockwood Type I?',
      'کدام یافته در راک‌وود نوع I انتظار می‌رود؟')[lang],
    [
      L('Leichte Dehiszenz des AC-Gelenks', 'Mild AC joint widening', 'اتساع خفیف مفصل AC')[lang],
      L('Normales Röntgenbild – klinische Diagnose', 'Normal X-ray – clinical diagnosis', 'رادیوگرافی طبیعی – تشخیص بالینی')[lang],
      L('CCD > 25 mm', 'CCD > 25 mm', 'CCD > ۲۵ میلی‌متر')[lang],
      L('Posteriore Verlagerung der Klavikula', 'Posterior displacement of the clavicle', 'جابجایی خلفی کلاویکول')[lang],
    ],
    1,
    L('Typ I = Zerrung (partielle Ruptur) der AC-Bänder ohne vollständige Ruptur. Röntgenbild: normal. Diagnose klinisch (lokaler Druckschmerz über AC-Gelenk). Therapie: konservativ, Ausheilung in 1–2 Wochen.', 'Type I = sprain (partial rupture) of AC ligaments without complete rupture. X-ray: normal. Diagnosis clinical (local tenderness over AC joint). Treatment: conservative, heals in 1–2 weeks.', 'نوع I = کشش (پارگی جزئی) رباط‌های AC بدون پارگی کامل. رادیوگرافی: طبیعی. تشخیص بالینی (حساسیت موضعی روی مفصل AC). درمان: محافظه‌کارانه، بهبودی در ۱–۲ هفته.')[lang]
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
    L('Das arthroskopische Tight-Rope-System (CC-Rekonstruktion mit Fadenschlinge) und die offene Hakenplatte sind die häufigsten Verfahren. Ziel: anatomische Reposition und Bandrekonstruktion. Die Hakenplatte muss nach Heilung entfernt werden.', 'The arthroscopic tight-rope system (CC reconstruction with suture loop) and open hook plate are the most common procedures. Goal: anatomical reduction and ligament reconstruction. The hook plate must be removed after healing.', 'سیستم تایت‌روپ آرتروسکوپیک (بازسازی CC با حلقه بخیه) و صفحه قلاب‌دار باز شایع‌ترین روش‌ها هستند. هدف: ریداکسیون آناتومیک و بازسازی رباط. صفحه قلاب‌دار باید بعد از بهبودی برداشته شود.')[lang]
  ),

].map(q => ({ ...q, tags: ['ak-luxation'] }))]))

export const AK_LUXATION_FLASHCARDS = [

  F('ak-lux-fc-1', L('Anatomie', 'Anatomy', 'آناتومی'),
    L('Welche zwei Bandgruppen stabilisieren das AC-Gelenk?', 'Which two ligament groups stabilise the AC joint?', 'کدام دو گروه رباط مفصل AC را تثبیت می‌کنند؟'),
    L('1) AC-Bänder → horizontale Stabilität (AP). 2) CC-Bänder (Trapezoid + Konoid) → vertikale Stabilität. Beide müssen reißen → vollständige Luxation.', '1) AC ligaments → horizontal stability (AP). 2) CC ligaments (trapezoid + conoid) → vertical stability. Both must rupture → complete dislocation.', '۱) رباط‌های AC → پایداری افقی (AP). ۲) رباط‌های CC (ترپزوئید + کونوئید) → پایداری عمودی. هر دو باید پاره شوند → لوکساسیون کامل.'),
    L('AC = horizontal, CC = vertikal. Beide weg → Typ III oder höher.', 'AC = horizontal, CC = vertical. Both gone → Type III or higher.', 'AC = افقی، CC = عمودی. هر دو پاره → نوع III یا بالاتر.')
  ),

  F('ak-lux-fc-2', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Wie hilft der CCD-Seitenvergleich; wann kann Zusatzbelastung erwogen werden?', 'How does side-to-side CCD comparison help, and when might added load be considered?', 'مقایسه CCD دو طرف چه کمکی می‌کند و چه زمانی می‌توان بارگذاری افزوده را در نظر گرفت؟'),
    L('CCD beidseits vergleichen; 11–13 mm ist nur der PDF-Orientierungswert, ein unabhängiger Normwertbeleg steht aus. Die Evidenz zur Zusatzbelastung ist widersprüchlich: Nordin et al. (online 2020/Ausgabe 2021, doi:10.1177/0284185120939270) fanden keinen signifikanten Gewinn; Ibrahim et al. (2015, doi:10.1016/j.injury.2015.06.028) berichteten Nutzen. Nur konkrete Fragestellung/lokales Protokoll, keine Routine.', 'Compare CCD on both sides; 11–13 mm is only the PDF orienting value and an independent normative reference is pending. Evidence on added load conflicts: Nordin et al. (online 2020/issue 2021, doi:10.1177/0284185120939270) found no significant gain; Ibrahim et al. (2015, doi:10.1016/j.injury.2015.06.028) reported value. Use only for a specific question/local protocol, not routinely.', 'CCD را در دو طرف مقایسه کنید؛ ۱۱ تا ۱۳ میلی‌متر فقط مقدار راهنمای PDF است و منبع هنجاری مستقل آن در انتظار بررسی است. شواهد بارگذاری افزوده متناقض است: نوردین و همکاران (آنلاین ۲۰۲۰/شماره ۲۰۲۱، doi:10.1177/0284185120939270) بهبود معناداری نیافتند؛ ابراهیم و همکاران (۲۰۱۵، doi:10.1016/j.injury.2015.06.028) ارزش آن را گزارش کردند. فقط برای پرسش مشخص/پروتکل محلی، نه به‌صورت روتین.'),
    L('Seitenvergleich, keine starre Einzelgrenze; gewichtete Aufnahme nur gezielt.', 'Compare sides, avoid rigid single cutoff; use weighted view selectively.', 'مقایسه دو طرف، نه مرز مطلق؛ نمای وزنه‌دار فقط به‌صورت انتخابی.')
  ),

  F('ak-lux-fc-3', L('Rockwood', 'Rockwood', 'راک‌وود'),
    L('Rockwood I–VI: Therapieprinzip?', 'Rockwood I–VI: Treatment principle?', 'راک‌وود I–VI: اصل درمان؟'),
    L('I+II → Konservativ (Gilchrist-Verband). III → Individuell (Alter, Aktivität, Beruf). IV–VI → Operativ (Tight-Rope oder Hakenplatte).', 'I+II → Conservative (Gilchrist sling). III → Individualised (age, activity, occupation). IV–VI → Surgical (tight-rope or hook plate).', 'I+II → محافظه‌کارانه (باند گیلکریست). III → فردی (سن، فعالیت، شغل). IV–VI → جراحی (تایت‌روپ یا صفحه قلاب‌دار).'),
    L('Grauzone = Typ III. Regel: I+II konservativ, IV–VI operativ.', 'Grey zone = Type III. Rule: I+II conservative, IV–VI surgical.', 'ناحیه خاکستری = نوع III. قانون: I+II محافظه‌کارانه، IV–VI جراحی.')
  ),

  F('ak-lux-fc-4', L('Rockwood', 'Rockwood', 'راک‌وود'),
    L('Rockwood Typ IV: Worin besteht die Besonderheit?', 'Rockwood Type IV: What is the distinctive feature?', 'راک‌وود نوع IV: ویژگی خاص چیست؟'),
    L('Posteriore Dislokation der Klavikula in den M. trapezius. Im AP-Röntgen oft unauffällig! Axiale Aufnahme ist zwingend erforderlich. Immer operative Therapie.', 'Posterior dislocation of the clavicle into the trapezius. Often unremarkable on AP X-ray! Axial view is mandatory. Always surgical treatment.', 'جابجایی خلفی کلاویکول به داخل عضله تراپزیوس. در رادیوگرافی AP اغلب طبیعی! نمای محوری اجباری است. همیشه درمان جراحی.'),
    L('Typ IV = posterior. AP normal → Axial obligat!', 'Type IV = posterior. AP normal → axial mandatory!', 'نوع IV = خلفی. AP طبیعی → محوری اجباری!')
  ),

  F('ak-lux-fc-5', L('Rockwood', 'Rockwood', 'راک‌وود'),
    L('Unterschied Rockwood III vs. V?', 'Difference Rockwood III vs. V?', 'تفاوت راک‌وود III در مقابل V؟'),
    L('Typ III: Ruptur AC + CC-Bänder, CCD erhöht, Hochstand > 50 % der Gelenkhöhe. Typ V: wie III + Abriss M. deltoideus/trapezius + extremer Hochstand (CCD > 25 mm).', 'Type III: AC + CC ligament rupture, elevated CCD, elevation > 50 % of joint height. Type V: like III + deltoid/trapezius avulsion + extreme elevation (CCD > 25 mm).', 'نوع III: پارگی رباط AC + CC، CCD افزایش یافته، ارتفاع > ۵۰٪ ارتفاع مفصل. نوع V: مثل III + جداشدگی دلتوئید/تراپزیوس + ارتفاع شدید (CCD > ۲۵ میلی‌متر).'),
    L('V = III + Muskelabriss + extremer Hochstand (CCD > 25 mm).', 'V = III + muscle avulsion + extreme elevation (CCD > 25 mm).', 'V = III + جداشدگی عضله + ارتفاع شدید (CCD > ۲۵ میلی‌متر).')
  ),

  F('ak-lux-fc-6', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Wann ist ein normales AP-Röntgen trotzdem falsch-negativ für eine AC-Luxation?', 'When is a normal AP X-ray still falsely negative for AC dislocation?', 'چه زمانی رادیوگرافی AP طبیعی برای لوکساسیون AC کاذب-منفی است؟'),
    L('Bei Rockwood Typ IV (posteriore Dislokation). Das AP-Bild zeigt keinen vertikalen Hochstand → axiale Aufnahme zwingend nötig. Auch bei Typ I ist das Röntgen normal (klinische Diagnose).', 'In Rockwood Type IV (posterior dislocation). The AP view shows no vertical elevation → axial view mandatory. Also in Type I the X-ray is normal (clinical diagnosis).', 'در راک‌وود نوع IV (جابجایی خلفی). نمای AP ارتفاع عمودی نشان نمی‌دهد → نمای محوری اجباری. همچنین در نوع I رادیوگرافی طبیعی است (تشخیص بالینی).'),
    L('Typ I und IV → AP normal. Typ IV → Axial obligat.', 'Type I and IV → AP normal. Type IV → Axial mandatory.', 'نوع I و IV → AP طبیعی. نوع IV → محوری اجباری.')
  ),

  F('ak-lux-fc-7', L('Anatomie', 'Anatomy', 'آناتومی'),
    L('Tossy vs. Rockwood: Warum ist Tossy veraltet?', 'Tossy vs. Rockwood: Why is Tossy outdated?', 'توسی در مقابل راک‌وود: چرا توسی منسوخ است؟'),
    L('Tossy unterscheidet nur 3 Typen (I–III). Rockwood ergänzt Typ IV (posteriore), V (extremer Hochstand + Muskelabriss) und VI (inferiore Dislokation). Diese Zusatztypen haben jeweils distinkte Therapieimplikationen.', 'Tossy distinguishes only 3 types (I–III). Rockwood adds Type IV (posterior), V (extreme elevation + muscle avulsion), and VI (inferior dislocation). These additional types each have distinct treatment implications.', 'توسی فقط ۳ نوع (I–III) را متمایز می‌کند. راک‌وود نوع IV (خلفی)، V (ارتفاع شدید + جداشدگی عضله) و VI (جابجایی تحتانی) را اضافه می‌کند. این انواع اضافی هر کدام مفاهیم درمانی متمایزی دارند.'),
    L('Tossy = I–III (veraltet). Rockwood = I–VI (aktuell).', 'Tossy = I–III (outdated). Rockwood = I–VI (current).', 'توسی = I–III (منسوخ). راک‌وود = I–VI (فعلی).')
  ),

  F('ak-lux-fc-8', L('Therapie', 'Treatment', 'درمان'),
    L('Welche OP-Verfahren werden bei Typ IV–VI eingesetzt?', 'Which surgical procedures are used for Types IV–VI?', 'کدام روش‌های جراحی برای نوع IV–VI استفاده می‌شوند؟'),
    L('1) Tight-Rope-System: arthroskopisch, CC-Rekonstruktion mit Fadenschlinge. 2) Hakenplatte (Hook-Plate): offen, muss nach Heilung entfernt werden. Ziel: anatomische Reposition + Bandrekonstruktion.', '1) Tight-rope system: arthroscopic, CC reconstruction with suture loop. 2) Hook plate: open, must be removed after healing. Goal: anatomical reduction + ligament reconstruction.', '۱) سیستم تایت‌روپ: آرتروسکوپیک، بازسازی CC با حلقه بخیه. ۲) صفحه قلاب‌دار: باز، باید بعد از بهبودی برداشته شود. هدف: ریداکسیون آناتومیک + بازسازی رباط.'),
    L('Tight-Rope = arthroskopisch. Hakenplatte = offen, muss entfernt werden.', 'Tight-rope = arthroscopic. Hook plate = open, must be removed.', 'تایت‌روپ = آرتروسکوپیک. صفحه قلاب‌دار = باز، باید برداشته شود.')
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
