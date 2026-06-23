const L = (de, en, fa) => ({ de, en, fa })

export const FRAKTUR_KINDER_LESSON = {
  id: 'frakturen-kindesalter',
  title: L('Frakturen im Kindesalter', 'Paediatric Fractures', 'شکستگی‌های دوران کودکی'),
  definition: L(
    'Kindliche Knochen unterscheiden sich anatomisch und biomechanisch von Erwachsenenknochen – mit klinisch relevanten Besonderheiten bei Frakturmuster, Heilung und Wachstumsfolgen.',
    'Paediatric bones differ anatomically and biomechanically from adult bones – with clinically relevant differences in fracture pattern, healing, and growth consequences.',
    'استخوان‌های کودکان از نظر آناتومیک و بیومکانیک با استخوان‌های بزرگسالان متفاوتند – با تفاوت‌های بالینی مرتبط در الگوی شکستگی، ترمیم و عوارض رشد.'
  ),
  breadcrumb: L('Frakturen im Kindesalter', 'Paediatric Fractures', 'شکستگی‌های کودکان'),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key Point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Caution', 'هشدار'),
  toc: L('Inhalt', 'Contents', 'فهرست'),

  heroCards: [
    {
      value: L('15–25 %', '15–25 %', '۱۵–۲۵ %'),
      label: L('Physenbeteiligung', 'Physeal involvement', 'درگیری صفحه رشد'),
      text: L('aller Kinderfrakturen', 'of all paediatric fractures', 'از تمام شکستگی‌های کودکان'),
    },
    {
      value: L('Typ II', 'Type II', 'نوع II'),
      label: L('Salter-Harris', 'Salter-Harris', 'سالتر-هریس'),
      text: L('häufigster Typ (≈ 75 %)', 'most common type (≈ 75 %)', 'شایع‌ترین نوع (≈ ۷۵ %)'),
    },
    {
      value: L('Toddler', 'Toddler', 'توددلر'),
      label: L('Fraktur okkulto', 'occult fracture', 'شکستگی پنهان'),
      text: L('Röntgen oft negativ', 'X-ray often negative', 'رادیوگرافی اغلب منفی'),
    },
  ],

  sections: [
    { id: 'grundlagen', icon: '🦴', label: L('Grundlagen', 'Basics', 'مبانی') },
    { id: 'salter-harris', icon: '📊', label: L('Salter-Harris', 'Salter-Harris', 'سالتر-هریس'), emphasis: true },
    { id: 'schaft', icon: '🔩', label: L('Schaft­frakturen', 'Shaft Fractures', 'شکستگی دیافیز') },
    { id: 'toddler', icon: '🚶', label: L('Toddler-Fraktur', 'Toddler Fracture', 'شکستگی توددلر') },
    { id: 'uebergang', icon: '🔀', label: L('Übergangs­frakturen', 'Transitional Fractures', 'شکستگی‌های گذار'), emphasis: true },
    { id: 'takehome', icon: '✅', label: L('Take-home', 'Take-home', 'جمع‌بندی') },
  ],

  grundlagen: {
    title: L('Anatomische Besonderheiten im Kindesalter', 'Anatomical Peculiarities in Children', 'ویژگی‌های آناتومیک در کودکان'),
    lead: L(
      'Drei anatomische Strukturen prägen das kindliche Frakturmuster: der dickere Periostmantel, die Wachstumsfuge (Physis) und das nachgiebige Knochengewebe.',
      'Three anatomical structures shape the paediatric fracture pattern: the thicker periosteal sleeve, the growth plate (physis), and the more pliable bone tissue.',
      'سه ساختار آناتومیک الگوی شکستگی کودکان را شکل می‌دهند: پوشش پریوست ضخیم‌تر، صفحه رشد (فیزیس) و بافت استخوانی انعطاف‌پذیرتر.'
    ),
    items: [
      {
        icon: '🛡️',
        title: L('Periost', 'Periosteum', 'پریوست'),
        text: L(
          'Dicker, gefäßreicher Periostmantel → schützt vor vollständiger Dislokation, beschleunigt Heilung und fördert Kallusbildung.',
          'Thick, vascular periosteal sleeve → protects against complete dislocation, accelerates healing, and promotes callus formation.',
          'پوشش پریوست ضخیم و عروقی → از دررفتگی کامل محافظت می‌کند، ترمیم را تسریع می‌کند و تشکیل کالوس را تقویت می‌نماید.'
        ),
      },
      {
        icon: '📏',
        title: L('Wachstumsfuge (Physis)', 'Growth Plate (Physis)', 'صفحه رشد (فیزیس)'),
        text: L(
          'Knorpelige Zone zwischen Epi- und Metaphyse. Schwächste Struktur im kindlichen Skelett → bevorzugte Frakturlinie, v.a. unter Scherbelastung.',
          'Cartilaginous zone between epiphysis and metaphysis. Weakest structure in the paediatric skeleton → preferred fracture line, especially under shear stress.',
          'ناحیه غضروفی بین اپی‌فیز و متافیز. ضعیف‌ترین ساختار در اسکلت کودکان → خط شکستگی ترجیحی، به‌ویژه تحت نیروی برشی.'
        ),
      },
      {
        icon: '🌿',
        title: L('Knochenelastizität', 'Bone Elasticity', 'الاستیسیته استخوان'),
        text: L(
          'Mehr organische Matrix (Kollagen) als bei Erwachsenen → Knochen bricht nicht vollständig, sondern biegt sich → Grünholz- und Wulstfrakturen möglich.',
          'More organic matrix (collagen) than in adults → bone does not break completely but bends → Greenstick and Torus fractures are possible.',
          'ماتریکس ارگانیک بیشتر (کلاژن) نسبت به بزرگسالان → استخوان کاملاً نمی‌شکند بلکه خم می‌شود → شکستگی‌های Greenstick و Torus ممکن است رخ دهند.'
        ),
      },
      {
        icon: '⚡',
        title: L('Remodellierung', 'Remodelling', 'بازسازی استخوان'),
        text: L(
          'Hohes Remodellierungspotenzial, besonders physennah → klinisch tolerierbare Achsfehlstellungen oft korrigierbar ohne Operation.',
          'High remodelling potential, especially near the physis → clinically tolerable angular deformities are often correctable without surgery.',
          'پتانسیل بالای بازسازی استخوان، به‌ویژه در نزدیکی فیزیس → ناهنجاری‌های محوری قابل تحمل بالینی اغلب بدون جراحی قابل اصلاح هستند.'
        ),
      },
    ],
    key: L(
      'Bänder und Kapseln sind bei Kindern oft stabiler als die Physis – deshalb Luxation bei Kindern seltener, Physenverletzung häufiger.',
      'Ligaments and capsules are often stronger than the physis in children – so dislocation is rarer in children, physeal injury is more common.',
      'رباط‌ها و کپسول‌ها در کودکان اغلب از فیزیس محکم‌ترند – بنابراین دررفتگی در کودکان نادرتر و آسیب به فیزیس شایع‌تر است.'
    ),
  },

  salterHarris: {
    title: L('Salter-Harris-Klassifikation', 'Salter-Harris Classification', 'طبقه‌بندی سالتر-هریس'),
    lead: L(
      'Die Salter-Harris-Klassifikation beschreibt Physenverletzungen bei Kindern in 5 Typen. Je höher der Typ, desto höher das Risiko einer Wachstumsstörung.',
      'The Salter-Harris classification describes physeal injuries in children in 5 types. The higher the type, the higher the risk of growth disturbance.',
      'طبقه‌بندی سالتر-هریس آسیب‌های فیزیس کودکان را در ۵ نوع توصیف می‌کند. هر چه نوع بالاتر، خطر اختلال رشد بیشتر.'
    ),
    schema: {
      src: '/frakturen-kindesalter/salter-harris-schema.png',
      alt: L('Salter-Harris Klassifikation Schema (Typ I–V)', 'Salter-Harris Classification Diagram (Type I–V)', 'شمای طبقه‌بندی سالتر-هریس (نوع I–V)'),
    },
    headers: [
      L('Typ', 'Type', 'نوع'),
      L('Mnemonic', 'Mnemonic', 'یادآوری'),
      L('Frakturlinie', 'Fracture line', 'خط شکستگی'),
      L('Prognose / Häufigkeit', 'Prognosis / Frequency', 'پیش‌آگهی / فراوانی'),
    ],
    rows: [
      [
        L('I', 'I', 'I'),
        L('S – Straight (Slip)', 'S – Straight (Slip)', 'S – مستقیم (لغزش)'),
        L('Rein physäre Fraktur, Metaphyse/Epiphyse intakt', 'Pure physeal fracture, metaphysis/epiphysis intact', 'شکستگی خالص فیزیال، متافیز/اپی‌فیز سالم'),
        L('Gut; Röntgen oft negativ (5 %)', 'Good; X-ray often negative (5 %)', 'خوب؛ رادیوگرافی اغلب منفی (۵ %)'),
      ],
      [
        L('II', 'II', 'II'),
        L('A – Above (Metaphyse)', 'A – Above (Metaphysis)', 'A – بالا (متافیز)'),
        L('Linie durch Physis + Metaphysenfragment (Thurston-Holland-Zeichen)', 'Line through physis + metaphyseal fragment (Thurston-Holland sign)', 'خط از طریق فیزیس + قطعه متافیز (نشانه تورستون-هولاند)'),
        L('Sehr gut; häufigster Typ (≈ 75 %)', 'Excellent; most common type (≈ 75 %)', 'بسیار خوب؛ شایع‌ترین نوع (≈ ۷۵ %)'),
      ],
      [
        L('III', 'III', 'III'),
        L('L – Lower (Epiphyse)', 'L – Lower (Epiphysis)', 'L – پایین (اپی‌فیز)'),
        L('Linie durch Physis + Epiphyse, intraartikulär', 'Line through physis + epiphysis, intra-articular', 'خط از طریق فیزیس + اپی‌فیز، داخل مفصل'),
        L('Mäßig; OP-pflichtig wenn disloziert (< 10 %)', 'Moderate; surgery if displaced (< 10 %)', 'متوسط؛ نیاز به جراحی در صورت جابجایی (< ۱۰ %)'),
      ],
      [
        L('IV', 'IV', 'IV'),
        L('T – Through (Komplett)', 'T – Through (Complete)', 'T – از طریق (کامل)'),
        L('Durchläuft Metaphyse, Physis und Epiphyse (T-förmig)', 'Runs through metaphysis, physis, and epiphysis (T-shaped)', 'از متافیز، فیزیس و اپی‌فیز عبور می‌کند (T شکل)'),
        L('Schlecht; hohe Gefahr der Wachstumsfugenverschluss (10 %)', 'Poor; high risk of physeal bar formation (10 %)', 'ضعیف؛ خطر بالای تشکیل بار فیزیال (۱۰ %)'),
      ],
      [
        L('V', 'V', 'V'),
        L('R – Rammed (Kompression)', 'R – Rammed (Compression)', 'R – کوبیده شده (فشاری)'),
        L('Kompressionsverletzung der Physis, Röntgen oft unauffällig', 'Compression injury of the physis, X-ray often unremarkable', 'آسیب فشاری به فیزیس، رادیوگرافی اغلب طبیعی'),
        L('Sehr schlecht; häufig Wachstumsstörung (< 1 %)', 'Very poor; growth disturbance common (< 1 %)', 'بسیار ضعیف؛ اختلال رشد شایع (< ۱ %)'),
      ],
    ],
    key: L(
      'Merkhilfe SALTR: S = Straight through (I), A = Above metaphysis (II), L = Lower epiphysis (III), T = Through all (IV), R = Rammed/Compression (V).',
      'Mnemonic SALTR: S = Straight through (I), A = Above metaphysis (II), L = Lower epiphysis (III), T = Through all (IV), R = Rammed/Compression (V).',
      'یادآوری SALTR: S = مستقیم (I)، A = بالای متافیز (II)، L = پایین اپی‌فیز (III)، T = از طریق همه (IV)، R = کوبیده/فشاری (V).'
    ),
    cave: L(
      'Typ V ist retrospektiv – auf Röntgen oft nicht erkennbar. Diagnose erst bei Wachstumsstörung im Verlauf.',
      'Type V is retrospective – often not visible on X-ray. Diagnosis only confirmed when growth disturbance appears at follow-up.',
      'نوع V گذشته‌نگر است – اغلب روی رادیوگرافی قابل تشخیص نیست. تشخیص تنها هنگام بروز اختلال رشد در پیگیری تأیید می‌شود.'
    ),
  },

  schaft: {
    title: L('Schaftsfrakturen: Wulst- und Grünholzfraktur', 'Shaft Fractures: Torus and Greenstick', 'شکستگی دیافیز: توروس و گرین‌استیک'),
    lead: L(
      'Die erhöhte Knochenelastizität bei Kindern führt zu zwei charakteristischen, bei Erwachsenen nicht vorkommenden Frakturmustern.',
      'The increased bone elasticity in children leads to two characteristic fracture patterns that do not occur in adults.',
      'الاستیسیته افزایش‌یافته استخوان در کودکان منجر به دو الگوی شکستگی مشخص می‌شود که در بزرگسالان دیده نمی‌شوند.'
    ),
    schema: {
      src: '/frakturen-kindesalter/wulst-vs-gruenholz-schema.png',
      alt: L('Wulstfraktur vs. Grünholzfraktur – schematischer Vergleich', 'Torus vs. Greenstick Fracture – schematic comparison', 'شکستگی توروس در مقابل گرین‌استیک – مقایسه شماتیک'),
    },
    headers: [
      L('Merkmal', 'Feature', 'ویژگی'),
      L('Wulstfraktur (Torus)', 'Torus Fracture (Buckle)', 'شکستگی توروس (باکل)'),
      L('Grünholzfraktur (Greenstick)', 'Greenstick Fracture', 'شکستگی گرین‌استیک'),
    ],
    rows: [
      [
        L('Mechanismus', 'Mechanism', 'مکانیسم'),
        L('Axiale Stauchung', 'Axial compression', 'فشار محوری'),
        L('Biegebelastung (Dreipunkt)', 'Bending force (three-point)', 'نیروی خمشی (سه‌نقطه)'),
      ],
      [
        L('Kortexbeteiligung', 'Cortex involvement', 'درگیری کورتکس'),
        L('Beide Kortizes aufgeworfen (Knick), kein Bruch', 'Both cortices buckled, no break', 'هر دو کورتکس فرورفته، بدون شکستگی'),
        L('Eine Kortex gebrochen, andere intakt', 'One cortex broken, other intact', 'یک کورتکس شکسته، دیگری سالم'),
      ],
      [
        L('Stabilität', 'Stability', 'پایداری'),
        L('Stabil', 'Stable', 'پایدار'),
        L('Instabil (Tendenz zur Progression)', 'Unstable (tendency to progress)', 'ناپایدار (تمایل به پیشرفت)'),
      ],
      [
        L('Therapie', 'Treatment', 'درمان'),
        L('Funktionell oder weiche Schiene 3–4 Wo.', 'Functional or soft splint 3–4 weeks', 'عملکردی یا آتل نرم ۳–۴ هفته'),
        L('Reduktion + Gips 4–6 Wochen', 'Reduction + cast 4–6 weeks', 'کاهش + گچ ۴–۶ هفته'),
      ],
      [
        L('Röntgen', 'X-ray', 'رادیوگرافی'),
        L('Aufwerfung der Kortex – metaphysär', 'Cortical buckling – metaphyseal', 'فرورفتگی کورتکس – متافیزی'),
        L('Einseitige Kortexunterbrechung + Biegung', 'Unilateral cortex disruption + bowing', 'قطع یک‌طرفه کورتکس + خم شدن'),
      ],
    ],
    wulstCase: {
      title: L('Fallbeispiel Wulstfraktur (rID:65820)', 'Case: Torus Fracture (rID:65820)', 'مورد: شکستگی توروس (rID:65820)'),
      radiopaediaUrl: 'https://radiopaedia.org/cases/65820/play',
      images: [
        {
          src: '/frakturen-kindesalter/wulst-hand.jpeg',
          caption: L('Handgelenk AP – metaphysäre Aufwerfung (Wulstfraktur)', 'Wrist AP – metaphyseal buckle (Torus fracture)', 'مچ دست AP – فرورفتگی متافیزی (شکستگی توروس)'),
        },
        {
          src: '/frakturen-kindesalter/wulst-lateral.jpeg',
          caption: L('Seitliche Aufnahme – Kortexunterbrechung distal', 'Lateral view – distal cortex disruption', 'نمای جانبی – قطع کورتکس دیستال'),
        },
      ],
    },
    gruenholzCase: {
      title: L('Fallbeispiel Grünholzfraktur (rID:89402)', 'Case: Greenstick Fracture (rID:89402)', 'مورد: شکستگی گرین‌استیک (rID:89402)'),
      radiopaediaUrl: 'https://radiopaedia.org/cases/89402/play',
      images: [
        {
          src: '/frakturen-kindesalter/gruenholz-ap-1.jpeg',
          caption: L('Unterarm AP – einseitige Kortexunterbrechung', 'Forearm AP – unilateral cortex disruption', 'ساعد AP – قطع یک‌طرفه کورتکس'),
        },
        {
          src: '/frakturen-kindesalter/gruenholz-ap-2.jpeg',
          caption: L('Zweite Aufnahme – Biegung sichtbar', 'Second view – bowing visible', 'نمای دوم – خم شدن مشهود'),
        },
      ],
    },
    key: L(
      'Wulstfraktur = stabiler Beulenbruch, oft nur weiche Schiene nötig. Grünholzfraktur = instabiler Biegebruch, Reposition meist erforderlich.',
      'Torus = stable buckle fracture, often only a soft splint needed. Greenstick = unstable bending fracture, reduction usually required.',
      'توروس = شکستگی باکل پایدار، اغلب فقط به آتل نرم نیاز است. گرین‌استیک = شکستگی خمشی ناپایدار، معمولاً نیاز به کاهش.'
    ),
  },

  toddler: {
    title: L('Toddler-Fraktur', 'Toddler Fracture', 'شکستگی توددلر'),
    lead: L(
      'Okkulte Schaftsfraktur der Tibia bei Kindern im Laufalter (9 Monate – 3 Jahre) nach Bagatelltrauma. Häufig Röntgen-negativ bei Erstvorstellung.',
      'Occult tibial shaft fracture in toddlers (9 months – 3 years) after minor trauma. Often X-ray negative at first presentation.',
      'شکستگی پنهان دیافیز تیبیا در کودکان در سن راه رفتن (۹ ماه تا ۳ سال) بعد از ضربه جزئی. اغلب رادیوگرافی در ابتدا منفی است.'
    ),
    items: [
      {
        icon: '👶',
        title: L('Altersgruppe', 'Age group', 'گروه سنی'),
        text: L('9 Monate – 3 Jahre; häufigste Ursache für einseitiges Hinken ohne Trauma in dieser Altersgruppe.', '9 months – 3 years; most common cause of unilateral limp without clear trauma in this age group.', '۹ ماه تا ۳ سال؛ شایع‌ترین علت لنگیدن یک‌طرفه بدون ضربه مشخص در این گروه سنی.'),
      },
      {
        icon: '📍',
        title: L('Lokalisation', 'Location', 'محل'),
        text: L('Tibia (distal 1/3); spiralförmige, nicht dislozierte Frakturlinie – im konventionellen Röntgen oft unsichtbar.', 'Tibia (distal 1/3); spiral, non-displaced fracture line – often invisible on conventional X-ray.', 'تیبیا (۱/۳ دیستال)؛ خط شکستگی مارپیچ و بدون جابجایی – اغلب روی رادیوگرافی معمولی نامرئی است.'),
      },
      {
        icon: '🔍',
        title: L('Diagnostik', 'Diagnostics', 'تشخیص'),
        text: L('Erströntgen negativ → Klinische Diagnose! Bei Zweifeln: MRT (sensitivste Methode) oder Knochenszintigraphie nach 72 h.', 'Initial X-ray negative → clinical diagnosis! If uncertain: MRI (most sensitive) or bone scan after 72 h.', 'رادیوگرافی اولیه منفی → تشخیص بالینی! در صورت تردید: MRI (حساس‌ترین روش) یا اسکن استخوان بعد از ۷۲ ساعت.'),
      },
      {
        icon: '💊',
        title: L('Therapie', 'Treatment', 'درمان'),
        text: L('Gespaltener Unterschenkelgips oder Oberschenkelgips für 3–4 Wochen. Prognose exzellent.', 'Split below-knee or above-knee cast for 3–4 weeks. Prognosis excellent.', 'گچ شکافته ساق پا یا ران به مدت ۳–۴ هفته. پیش‌آگهی عالی.'),
      },
    ],
    caseTitle: L('Fallbeispiel Toddler-Fraktur (rID:12023)', 'Case: Toddler Fracture (rID:12023)', 'مورد: شکستگی توددلر (rID:12023)'),
    radiopaediaUrl: 'https://radiopaedia.org/cases/12023/play',
    images: [
      {
        src: '/frakturen-kindesalter/toddler-tibia.jpeg',
        caption: L('Tibia AP – okkulte Spiralfraktur (Pfeil), Röntgen oft unauffällig', 'Tibia AP – occult spiral fracture (arrow), X-ray often unremarkable', 'تیبیا AP – شکستگی مارپیچ پنهان (فلش)، رادیوگرافی اغلب طبیعی'),
      },
    ],
    cave: L(
      'Toddler-Fraktur kann mit Kindesmisshandlung verwechselt werden. Bei atypischem Befund, multiplen Läsionen oder fehlendem Trauma-Mechanismus → Kinderschutzprotokoll einleiten.',
      'Toddler fracture can be confused with non-accidental injury. With atypical findings, multiple lesions, or no trauma mechanism → activate child protection protocol.',
      'شکستگی توددلر می‌تواند با کودک‌آزاری اشتباه گرفته شود. در یافته‌های غیرمعمول، ضایعات متعدد، یا بدون مکانیسم ضربه → پروتکل حمایت از کودک را فعال کنید.'
    ),
  },

  uebergang: {
    title: L('Übergangsfrakturen (Transitional Fractures)', 'Transitional Fractures', 'شکستگی‌های گذار'),
    lead: L(
      'Übergangsfrakturen entstehen während des Schlusses der distalen Tibia-Physis im Adoleszentenalter (10–16 Jahre). Der partielle Fugenschluss schafft mechanisch schwache Zonen.',
      'Transitional fractures occur during closure of the distal tibial physis in adolescence (10–16 years). Partial physeal closure creates mechanically weak zones.',
      'شکستگی‌های گذار در طول بسته شدن فیزیس تیبیای دیستال در دوران نوجوانی (۱۰–۱۶ سال) رخ می‌دهند. بسته شدن جزئی فیزیس ناحیه‌های ضعیف مکانیکی ایجاد می‌کند.'
    ),
    tillaux: {
      title: L('Tillaux-Fraktur', 'Tillaux Fracture', 'شکستگی تیلو'),
      text: L(
        'Abriss des anterolateralen Epiphysenfragments der distalen Tibia durch Zug des vorderen Syndesmosenbandes bei Außenrotationstrauma. Die mediale und zentrale Physis ist bereits geschlossen, nur die anterolaterale Physis ist noch offen (Salter-Harris III).',
        'Avulsion of the anterolateral epiphyseal fragment of the distal tibia by traction of the anterior inferior tibiofibular ligament during external rotation injury. The medial and central physis are already closed; only the anterolateral physis remains open (Salter-Harris III).',
        'پارگی قطعه اپی‌فیزی قدامی-جانبی تیبیای دیستال توسط کشش رباط سیندزموز قدامی-تحتانی در آسیب چرخش خارجی. فیزیس مدیال و مرکزی قبلاً بسته شده‌اند؛ فقط فیزیس قدامی-جانبی باز مانده (سالتر-هریس III).'
      ),
      age: L('12–14 Jahre', '12–14 years', '۱۲–۱۴ سال'),
      imaging: L(
        'Röntgen: laterales Epiphysenfragment in AP-Projektion. Lateral oft unauffällig. CT bei unklarer Dislokation.',
        'X-ray: lateral epiphyseal fragment on AP view. Lateral often unremarkable. CT for uncertain displacement.',
        'رادیوگرافی: قطعه اپی‌فیزی جانبی در نمای AP. نمای جانبی اغلب طبیعی. CT در صورت ابهام درباره جابجایی.'
      ),
      caseTitle: L('Fallbeispiel Tillaux (rID:168812)', 'Case: Tillaux (rID:168812)', 'مورد: تیلو (rID:168812)'),
      radiopaediaUrl: 'https://radiopaedia.org/cases/168812/play',
      images: [
        {
          src: '/frakturen-kindesalter/tillaux-ap.png',
          caption: L('Sprunggelenk AP – anterolaterales Epiphysenfragment (Tillaux-Fraktur)', 'Ankle AP – anterolateral epiphyseal fragment (Tillaux fracture)', 'مچ پا AP – قطعه اپی‌فیزی قدامی-جانبی (شکستگی تیلو)'),
        },
        {
          src: '/frakturen-kindesalter/tillaux-lateral.png',
          caption: L('Sprunggelenk lateral – lateral oft unauffällig bei Tillaux', 'Ankle lateral – lateral view often unremarkable in Tillaux', 'مچ پا جانبی – نمای جانبی اغلب در تیلو طبیعی است'),
        },
      ],
    },
    triplane: {
      title: L('Triplane-Fraktur', 'Triplane Fracture', 'شکستگی سه‌صفحه‌ای'),
      text: L(
        'Komplexe Fraktur in 3 Ebenen: sagittale Ebene (Epiphyse), axiale Ebene (Physis), koronare Ebene (Metaphyse). Klassisch 2- oder 3-Fragment-Typen. CT ist für die genaue Fragmentdarstellung und OP-Planung essenziell.',
        'Complex fracture in 3 planes: sagittal plane (epiphysis), axial plane (physis), coronal plane (metaphysis). Classically 2- or 3-fragment types. CT is essential for precise fragment delineation and surgical planning.',
        'شکستگی پیچیده در ۳ صفحه: صفحه ساژیتال (اپی‌فیز)، صفحه محوری (فیزیس)، صفحه کرونال (متافیز). به‌طور کلاسیک ۲ یا ۳ قطعه. CT برای تصویربرداری دقیق قطعات و برنامه‌ریزی جراحی ضروری است.'
      ),
      age: L('13–15 Jahre', '13–15 years', '۱۳–۱۵ سال'),
      schema: {
        src: '/frakturen-kindesalter/triplane-schema.png',
        alt: L('Triplane-Fraktur – Ebenen-Schema (sagittal, axial, koronal)', 'Triplane Fracture – planes diagram (sagittal, axial, coronal)', 'شکستگی سه‌صفحه‌ای – شمای صفحات (ساژیتال، محوری، کرونال)'),
      },
      caseTitle: L('Fallbeispiel Triplane-Fraktur (rID:33599)', 'Case: Triplane Fracture (rID:33599)', 'مورد: شکستگی سه‌صفحه‌ای (rID:33599)'),
      radiopaediaUrl: 'https://radiopaedia.org/cases/33599/play',
      images: [
        {
          src: '/frakturen-kindesalter/triplane-lateral-1.jpeg',
          caption: L('Sprunggelenk lateral – Metaphysenfragment posterior (Triplane)', 'Ankle lateral – posterior metaphyseal fragment (Triplane)', 'مچ پا جانبی – قطعه متافیزی خلفی (سه‌صفحه‌ای)'),
        },
        {
          src: '/frakturen-kindesalter/triplane-lateral-2.jpeg',
          caption: L('Sprunggelenk lateral 2 – weitere Frakturlinien erkennbar', 'Ankle lateral 2 – further fracture lines visible', 'مچ پا جانبی ۲ – خطوط شکستگی بیشتر قابل مشاهده'),
        },
        {
          src: '/frakturen-kindesalter/triplane-ct-sagittal.png',
          caption: L('CT sagittal – Frakturlinie in der Epiphyse', 'CT sagittal – fracture line in the epiphysis', 'CT ساژیتال – خط شکستگی در اپی‌فیز'),
        },
        {
          src: '/frakturen-kindesalter/triplane-ct-coronal.png',
          caption: L('CT koronal – metaphysäres Fragment und Gelenkbeteiligung', 'CT coronal – metaphyseal fragment and joint involvement', 'CT کرونال – قطعه متافیزی و درگیری مفصل'),
        },
      ],
    },
    cave: L(
      'Übergangsfrakturen sehen im Röntgen komplex aus – immer CT anfordern, da der Dislokationsgrad die Therapieentscheidung (konservativ vs. OP) bestimmt (Grenze: 2 mm Gelenkstufenbildung).',
      'Transitional fractures look complex on X-ray – always request CT, as the degree of displacement determines treatment (conservative vs. surgery; threshold: 2 mm articular step).',
      'شکستگی‌های گذار روی رادیوگرافی پیچیده به نظر می‌رسند – همیشه CT بخواهید، زیرا میزان جابجایی تصمیم درمان را تعیین می‌کند (مرز: ۲ میلی‌متر پله مفصلی).'
    ),
  },

  takehome: {
    title: L('Take-home Punkte', 'Take-home Points', 'نکات کلیدی'),
    lead: L('Die wichtigsten Merksätze für die Praxis.', 'The most important points for clinical practice.', 'مهم‌ترین نکات برای عمل بالینی.'),
    items: [
      {
        title: L('Physis = schwächste Struktur', 'Physis = weakest structure', 'فیزیس = ضعیف‌ترین ساختار'),
        text: L('Bei Kindern bricht die Physis vor Bändern und Kapseln. Bei klinischem Verdacht und negativem Röntgen an Salter-Harris I oder V denken.', 'In children, the physis fails before ligaments and capsules. With clinical suspicion and negative X-ray, consider Salter-Harris I or V.', 'در کودکان، فیزیس قبل از رباط‌ها و کپسول‌ها آسیب می‌بیند. در صورت ظن بالینی و رادیوگرافی منفی، به سالتر-هریس I یا V فکر کنید.'),
      },
      {
        title: L('SALTR-Regel für Prognose', 'SALTR rule for prognosis', 'قانون SALTR برای پیش‌آگهی'),
        text: L('Typ I/II: gute Prognose. Typ III/IV: intraartikulär, OP-pflichtig bei Dislokation. Typ V: schlechteste Prognose (Kompressionsverletzung).', 'Type I/II: good prognosis. Type III/IV: intra-articular, surgery if displaced. Type V: worst prognosis (compression injury).', 'نوع I/II: پیش‌آگهی خوب. نوع III/IV: داخل مفصل، جراحی در صورت جابجایی. نوع V: بدترین پیش‌آگهی (آسیب فشاری).'),
      },
      {
        title: L('Toddler-Fraktur = klinische Diagnose', 'Toddler fracture = clinical diagnosis', 'شکستگی توددلر = تشخیص بالینی'),
        text: L('Röntgen oft negativ. Kind mit Hinken ohne klares Trauma → Toddler-Fraktur ausschließen. MRT/Szintigraphie wenn klinisch hochverdächtig.', 'X-ray often negative. Child with limp and no clear trauma → exclude Toddler fracture. MRI/scintigraphy if clinically highly suspicious.', 'رادیوگرافی اغلب منفی. کودک با لنگ و بدون ضربه مشخص → شکستگی توددلر را رد کنید. MRI/اسکن اگر بالینی بسیار مشکوک است.'),
      },
      {
        title: L('Übergangsfrakturen → CT', 'Transitional fractures → CT', 'شکستگی‌های گذار → CT'),
        text: L('Tillaux und Triplane immer mit CT vervollständigen. Gelenkstufenbildung > 2 mm ist Operationsindikation.', 'Always complete Tillaux and Triplane assessment with CT. Articular step > 2 mm is an indication for surgery.', 'تیلو و سه‌صفحه‌ای را همیشه با CT کامل کنید. پله مفصلی > ۲ میلی‌متر نشانه عمل است.'),
      },
      {
        title: L('Remodellierung', 'Remodelling', 'بازسازی استخوان'),
        text: L('Achsfehlstellungen < 20–25° in der Wachstumsachse korrigieren sich oft. Rotationsfehlstellungen und Verkürzungen korrigieren sich NICHT.', 'Angular deformities < 20–25° in the growth axis often self-correct. Rotational malalignment and shortening do NOT correct.', 'ناهنجاری‌های محوری < ۲۰–۲۵ درجه در محور رشد اغلب خودبخود اصلاح می‌شوند. ناهنجاری‌های چرخشی و کوتاه شدن اصلاح نمی‌شوند.'),
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

export const FRAKTUR_KINDER_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, [

  Q(`fk-sh-1-${lang}`,
    L('Welcher Salter-Harris-Typ verläuft nur durch die Physis ohne Meta- oder Epiphysenbeteiligung?',
      'Which Salter-Harris type runs only through the physis without metaphyseal or epiphyseal involvement?',
      'کدام نوع سالتر-هریس فقط از طریق فیزیس عبور می‌کند بدون درگیری متافیز یا اپی‌فیز؟')[lang],
    [
      L('Typ I', 'Type I', 'نوع I')[lang],
      L('Typ II', 'Type II', 'نوع II')[lang],
      L('Typ III', 'Type III', 'نوع III')[lang],
      L('Typ IV', 'Type IV', 'نوع IV')[lang],
    ],
    0,
    L('Salter-Harris Typ I = rein physäre Fraktur. Röntgen oft negativ. Diagnose klinisch (Druckschmerz über der Physis).', 'Salter-Harris Type I = pure physeal fracture. X-ray often negative. Diagnosis is clinical (tenderness over physis).', 'سالتر-هریس نوع I = شکستگی خالص فیزیال. رادیوگرافی اغلب منفی. تشخیص بالینی (حساسیت روی فیزیس).')[lang]
  ),

  Q(`fk-sh-2-${lang}`,
    L('Welcher Salter-Harris-Typ ist am häufigsten (≈ 75 %)?',
      'Which Salter-Harris type is most common (≈ 75 %)?',
      'کدام نوع سالتر-هریس شایع‌ترین است (≈ ۷۵ %)?')[lang],
    [
      L('Typ I', 'Type I', 'نوع I')[lang],
      L('Typ II (mit Metaphysenfragment)', 'Type II (with metaphyseal fragment)', 'نوع II (با قطعه متافیزی)')[lang],
      L('Typ III', 'Type III', 'نوع III')[lang],
      L('Typ V', 'Type V', 'نوع V')[lang],
    ],
    1,
    L('Salter-Harris II zeigt neben der physären Fraktur ein charakteristisches Metaphysenfragment (Thurston-Holland-Zeichen). Häufigster Typ mit sehr guter Prognose.', 'Salter-Harris II shows a characteristic metaphyseal fragment (Thurston-Holland sign) alongside the physeal fracture. Most common type with excellent prognosis.', 'سالتر-هریس II در کنار شکستگی فیزیال، قطعه متافیزی مشخصی نشان می‌دهد (نشانه تورستون-هولاند). شایع‌ترین نوع با پیش‌آگهی عالی.')[lang]
  ),

  Q(`fk-sh-3-${lang}`,
    L('Ein 10-jähriger Junge hat nach einem Sturz Schmerzen am Knöchel. Das Röntgen zeigt eine Frakturlinie durch die Physis und die Epiphyse bis in das Gelenk. Welcher Salter-Harris-Typ liegt vor?',
      'A 10-year-old boy has ankle pain after a fall. X-ray shows a fracture line through the physis and epiphysis extending into the joint. Which Salter-Harris type is this?',
      'پسری ۱۰ ساله بعد از افتادن درد مچ پا دارد. رادیوگرافی خط شکستگی از طریق فیزیس و اپی‌فیز تا داخل مفصل نشان می‌دهد. کدام نوع سالتر-هریس است؟')[lang],
    [
      L('Typ II', 'Type II', 'نوع II')[lang],
      L('Typ III (intraartikulär)', 'Type III (intra-articular)', 'نوع III (داخل مفصل)')[lang],
      L('Typ IV', 'Type IV', 'نوع IV')[lang],
      L('Typ V', 'Type V', 'نوع V')[lang],
    ],
    1,
    L('Typ III durchläuft Physis + Epiphyse → intraartikulär. Therapie: OP bei Dislokation > 2 mm (anatomische Reposition des Gelenks erforderlich).', 'Type III runs through physis + epiphysis → intra-articular. Treatment: surgery if displacement > 2 mm (anatomic reduction of the joint required).', 'نوع III از فیزیس + اپی‌فیز عبور می‌کند → داخل مفصل. درمان: جراحی در صورت جابجایی > ۲ میلی‌متر (نیاز به ریداکسیون آناتومیک مفصل).')[lang]
  ),

  Q(`fk-sh-4-${lang}`,
    L('Welcher Salter-Harris-Typ hat das höchste Risiko für Wachstumsfugenbrücken (physeal bars)?',
      'Which Salter-Harris type carries the highest risk of physeal bar formation?',
      'کدام نوع سالتر-هریس بیشترین خطر تشکیل بار فیزیال (فیزیال بار) را دارد؟')[lang],
    [
      L('Typ I', 'Type I', 'نوع I')[lang],
      L('Typ II', 'Type II', 'نوع II')[lang],
      L('Typ IV (und V)', 'Type IV (and V)', 'نوع IV (و V)')[lang],
      L('Typ III', 'Type III', 'نوع III')[lang],
    ],
    2,
    L('Typ IV durchläuft Metaphyse, Physis und Epiphyse. Ohne anatomische Reposition bilden sich Knochenbrücken (physeal bars) → vorzeitiger Fugenschluss → Wachstumsstörung/Achsdeformität.', 'Type IV runs through metaphysis, physis, and epiphysis. Without anatomic reduction, bony bridges (physeal bars) form → premature physeal closure → growth disturbance/angular deformity.', 'نوع IV از متافیز، فیزیس و اپی‌فیز عبور می‌کند. بدون ریداکسیون آناتومیک، پل‌های استخوانی (فیزیال بار) تشکیل می‌شوند → بسته شدن زودهنگام فیزیس → اختلال رشد/ناهنجاری محوری.')[lang]
  ),

  Q(`fk-sh-5-${lang}`,
    L('Was charakterisiert eine Salter-Harris-Typ-V-Verletzung?',
      'What characterises a Salter-Harris Type V injury?',
      'چه چیزی آسیب سالتر-هریس نوع V را مشخص می‌کند؟')[lang],
    [
      L('Epiphysäres Fragment sichtbar im Röntgen', 'Epiphyseal fragment visible on X-ray', 'قطعه اپی‌فیزی در رادیوگرافی قابل مشاهده')[lang],
      L('Kompressionsverletzung der Physis – Röntgen oft unauffällig, retrospektive Diagnose', 'Compression injury of the physis – X-ray often normal, retrospective diagnosis', 'آسیب فشاری به فیزیس – رادیوگرافی اغلب طبیعی، تشخیص گذشته‌نگر')[lang],
      L('Reine Epiphysenfraktur', 'Pure epiphyseal fracture', 'شکستگی خالص اپی‌فیز')[lang],
      L('Transphysäre Fraktur mit Metaphysenfragment', 'Transphyseal fracture with metaphyseal fragment', 'شکستگی ترانس‌فیزیال با قطعه متافیزی')[lang],
    ],
    1,
    L('Typ V ist eine axiale Kompressionsverletzung der Wachstumsfuge ohne sichtbare Frakturlinie. Diagnose oft erst retrospektiv bei Wachstumsstörung. Schlechteste Prognose aller Typen.', 'Type V is an axial compression injury of the growth plate without a visible fracture line. Diagnosis often only retrospective when growth disturbance appears. Worst prognosis of all types.', 'نوع V آسیب فشاری محوری به صفحه رشد بدون خط شکستگی قابل مشاهده است. تشخیص اغلب گذشته‌نگر هنگام بروز اختلال رشد. بدترین پیش‌آگهی از همه انواع.')[lang]
  ),

  Q(`fk-wulst-1-${lang}`,
    L('Was ist charakteristisch für eine Wulstfraktur (Torus-Fraktur)?',
      'What is characteristic of a Torus (buckle) fracture?',
      'چه چیزی مشخصه شکستگی توروس (باکل) است؟')[lang],
    [
      L('Vollständige Kortexunterbrechung auf beiden Seiten', 'Complete cortical disruption on both sides', 'قطع کامل کورتکس در هر دو طرف')[lang],
      L('Metaphysäre Kortexaufwerfung ohne vollständige Fraktur – stabile Verletzung', 'Metaphyseal cortical buckling without complete fracture – stable injury', 'فرورفتگی کورتکس متافیزی بدون شکستگی کامل – آسیب پایدار')[lang],
      L('Einseitige Kortexunterbrechung mit Biegung', 'Unilateral cortex disruption with bowing', 'قطع یک‌طرفه کورتکس با خم شدن')[lang],
      L('Spiralförmige Fraktur durch axialen Stress', 'Spiral fracture from axial stress', 'شکستگی مارپیچ از استرس محوری')[lang],
    ],
    1,
    L('Wulstfraktur = stabile Kompressionsdeformität durch axiale Stauchung. Beide Kortizes sind „aufgeworfen" (geknäuelt), aber nicht vollständig unterbrochen. Therapie: weiche Schiene oder kurzfristiger Gips.', 'Torus fracture = stable compression deformity from axial load. Both cortices are "buckled" but not completely disrupted. Treatment: soft splint or short-term cast.', 'شکستگی توروس = تغییر شکل فشاری پایدار از بار محوری. هر دو کورتکس «فرورفته» هستند اما کاملاً قطع نشده‌اند. درمان: آتل نرم یا گچ کوتاه‌مدت.')[lang]
  ),

  Q(`fk-gruenholz-1-${lang}`,
    L('Warum ist die Grünholzfraktur instabiler als die Wulstfraktur?',
      'Why is a Greenstick fracture more unstable than a Torus fracture?',
      'چرا شکستگی گرین‌استیک ناپایدارتر از شکستگی توروس است؟')[lang],
    [
      L('Weil sie die Physis betrifft', 'Because it involves the physis', 'چون فیزیس را درگیر می‌کند')[lang],
      L('Weil eine Kortex vollständig gebrochen ist, während die andere intakt bleibt – Tendenz zur Progression', 'Because one cortex is completely broken while the other remains intact – tendency to progress', 'چون یک کورتکس کاملاً شکسته در حالی که دیگری سالم می‌ماند – تمایل به پیشرفت')[lang],
      L('Weil beide Kortizes unterbrochen sind', 'Because both cortices are disrupted', 'چون هر دو کورتکس قطع شده‌اند')[lang],
      L('Weil Grünholzfrakturen immer disloziert sind', 'Because Greenstick fractures are always displaced', 'چون شکستگی‌های گرین‌استیک همیشه جابجا هستند')[lang],
    ],
    1,
    L('Grünholzfraktur = Biegebruch: eine Kortex bricht (Zugseite), die andere biegt sich nur (Druckseite). Der Periostmantel bleibt auf der gebogenen Seite intakt. Tendenz zur Verschlechterung → Reposition erforderlich.', 'Greenstick fracture = bending fracture: one cortex breaks (tension side), the other only bends (compression side). Periosteal sleeve remains intact on the bent side. Tendency to worsen → reduction required.', 'شکستگی گرین‌استیک = شکستگی خمشی: یک کورتکس می‌شکند (طرف کشش)، دیگری فقط خم می‌شود (طرف فشار). پوشش پریوست در طرف خمیده سالم می‌ماند. تمایل به بدتر شدن → نیاز به کاهش.')[lang]
  ),

  Q(`fk-toddler-1-${lang}`,
    L('Ein 18 Monate altes Kind kommt mit plötzlichem Hinken ohne klares Trauma. Das Röntgen ist unauffällig. Was ist die wahrscheinlichste Diagnose?',
      'An 18-month-old child presents with sudden limping and no clear trauma. X-ray is unremarkable. What is the most likely diagnosis?',
      'کودکی ۱۸ ماهه با لنگ ناگهانی و بدون ضربه مشخص مراجعه می‌کند. رادیوگرافی طبیعی است. محتمل‌ترین تشخیص چیست؟')[lang],
    [
      L('Septische Arthritis', 'Septic arthritis', 'آرتریت سپتیک')[lang],
      L('Toddler-Fraktur (okkulte Tibiafraktur)', 'Toddler fracture (occult tibial fracture)', 'شکستگی توددلر (شکستگی پنهان تیبیا)')[lang],
      L('Morbus Perthes', 'Legg-Calvé-Perthes disease', 'بیماری پرتس')[lang],
      L('Salter-Harris Typ IV', 'Salter-Harris Type IV', 'سالتر-هریس نوع IV')[lang],
    ],
    1,
    L('Toddler-Fraktur = okkulte Spiralfraktur der distalen Tibia bei Kleinkindern (9 Mon.–3 J.). Initialröntgen oft negativ. Bei klinischem Verdacht: Gipsbehandlung, MRT oder Knochenszintigraphie nach 72 h.', 'Toddler fracture = occult spiral fracture of the distal tibia in toddlers (9 mo – 3 yr). Initial X-ray often negative. With clinical suspicion: cast, MRI or bone scan after 72 h.', 'شکستگی توددلر = شکستگی مارپیچ پنهان تیبیای دیستال در کودکان نوپا (۹ ماه – ۳ سال). رادیوگرافی اولیه اغلب منفی. در صورت ظن بالینی: گچ، MRI یا اسکن استخوان بعد از ۷۲ ساعت.')[lang]
  ),

  Q(`fk-tillaux-1-${lang}`,
    L('Bei welcher Altersgruppe tritt die Tillaux-Fraktur typischerweise auf und warum?',
      'At what age does the Tillaux fracture typically occur and why?',
      'شکستگی تیلو به‌طور معمول در کدام گروه سنی رخ می‌دهد و چرا؟')[lang],
    [
      L('5–8 Jahre; vollständig offene Physis', '5–8 years; completely open physis', '۵–۸ سال؛ فیزیس کاملاً باز')[lang],
      L('12–14 Jahre; nur anterolaterale Physis noch offen', '12–14 years; only anterolateral physis still open', '۱۲–۱۴ سال؛ فقط فیزیس قدامی-جانبی هنوز باز')[lang],
      L('16–18 Jahre; alle Physen geschlossen', '16–18 years; all physes closed', '۱۶–۱۸ سال؛ همه فیزیس‌ها بسته')[lang],
      L('Alle Altersgruppen gleich häufig', 'All age groups equally common', 'همه گروه‌های سنی به یک اندازه شایع')[lang],
    ],
    1,
    L('Die distale Tibia-Physis schließt von zentral nach lateral. Bei 12–14-Jährigen ist die anterolaterale Physis als letzte noch offen → Tillaux-Fraktur: Abriss durch das vordere Syndesmosenband bei Außenrotationstrauma.', 'The distal tibial physis closes from central to lateral. At 12–14 years, the anterolateral physis is the last to remain open → Tillaux fracture: avulsion by the anterior inferior tibiofibular ligament in external rotation injury.', 'فیزیس تیبیای دیستال از مرکز به جانب بسته می‌شود. در ۱۲–۱۴ سالگی، فیزیس قدامی-جانبی آخرین است که باز می‌ماند → شکستگی تیلو: پارگی توسط رباط سیندزموز قدامی-تحتانی در آسیب چرخش خارجی.')[lang]
  ),

  Q(`fk-triplane-1-${lang}`,
    L('Welche Bildgebung ist bei einer Triplane-Fraktur essenziell und warum?',
      'Which imaging is essential in a Triplane fracture and why?',
      'کدام تصویربرداری در شکستگی سه‌صفحه‌ای ضروری است و چرا؟')[lang],
    [
      L('MRT – wegen Weichteilbeteiligung', 'MRI – due to soft tissue involvement', 'MRI – به دلیل درگیری بافت نرم')[lang],
      L('CT – genaue Fragmentdarstellung und Beurteilung der Gelenkstufenbildung (OP-Indikation > 2 mm)', 'CT – precise fragment delineation and assessment of articular step (surgery if > 2 mm)', 'CT – تصویربرداری دقیق قطعات و ارزیابی پله مفصلی (جراحی اگر > ۲ میلی‌متر)')[lang],
      L('Szintigraphie – zum Frakturnachweis', 'Scintigraphy – for fracture detection', 'اسکن استخوان – برای تشخیص شکستگی')[lang],
      L('Konventionelles Röntgen reicht aus', 'Conventional X-ray is sufficient', 'رادیوگرافی معمولی کافی است')[lang],
    ],
    1,
    L('Triplane-Fraktur = 3 Ebenen (sagittal, axial, koronal). CT ist unerlässlich, um Anzahl und Position der Fragmente und v.a. den Dislokationsgrad im Gelenk zu beurteilen. Grenze zur OP: Gelenkstufenbildung > 2 mm.', 'Triplane fracture = 3 planes (sagittal, axial, coronal). CT is essential to assess number and position of fragments and especially the degree of intra-articular displacement. Surgical threshold: articular step > 2 mm.', 'شکستگی سه‌صفحه‌ای = ۳ صفحه (ساژیتال، محوری، کرونال). CT برای ارزیابی تعداد و موقعیت قطعات و به‌ویژه میزان جابجایی داخل مفصل ضروری است. آستانه جراحی: پله مفصلی > ۲ میلی‌متر.')[lang]
  ),

  Q(`fk-remodel-1-${lang}`,
    L('Welche Fehlstellung bei Kinderfrakturen korrigiert sich NICHT durch Remodellierung?',
      'Which malalignment in paediatric fractures does NOT correct through remodelling?',
      'کدام ناهنجاری در شکستگی‌های کودکان از طریق بازسازی استخوان اصلاح نمی‌شود؟')[lang],
    [
      L('Achsfehlstellung in der Bewegungsebene des nächsten Gelenks (< 20°)', 'Angular deformity in the plane of adjacent joint motion (< 20°)', 'ناهنجاری محوری در صفحه حرکت مفصل مجاور (< ۲۰ درجه)')[lang],
      L('Rotationsfehlstellung', 'Rotational malalignment', 'ناهنجاری چرخشی')[lang],
      L('Leichte Seitenverschiebung bei Diaphysenfrakturen', 'Mild lateral displacement in diaphyseal fractures', 'جابجایی جانبی خفیف در شکستگی‌های دیافیز')[lang],
      L('Geringer Längenunterschied bei jungen Kindern', 'Minor length discrepancy in young children', 'اختلاف طول جزئی در کودکان کوچک‌تر')[lang],
    ],
    1,
    L('Rotationsfehlstellungen remodellieren sich NICHT, ebenso wenig wie erhebliche Verkürzungen. Achsfehlstellungen in der Bewegungsebene (v.a. physennah, junge Kinder) können sich korrigieren; Rotationen tun es nicht.', 'Rotational malalignment does NOT remodel, nor does significant shortening. Angular deformity in the plane of motion (especially near the physis, young children) can correct; rotation cannot.', 'ناهنجاری‌های چرخشی بازسازی نمی‌شوند، کوتاه‌شدگی قابل توجه هم نه. ناهنجاری محوری در صفحه حرکت (به‌ویژه نزدیک فیزیس، کودکان کوچک‌تر) می‌تواند اصلاح شود؛ چرخش نمی‌تواند.')[lang]
  ),

  Q(`fk-misshandlung-1-${lang}`,
    L('Welches Frakturmuster gilt als hochverdächtig für Kindesmisshandlung?',
      'Which fracture pattern is highly suspicious for non-accidental injury (NAI)?',
      'کدام الگوی شکستگی بسیار مشکوک به کودک‌آزاری است؟')[lang],
    [
      L('Distale Radiusfraktur nach Sturz auf die Hand', 'Distal radius fracture after fall on outstretched hand', 'شکستگی دیستال رادیوس بعد از افتادن روی دست')[lang],
      L('Klassische Metaphysenfraktur (corner fracture) + posteriore Rippenfrakturen verschiedenen Alters', 'Classic metaphyseal lesion (corner fracture) + posterior rib fractures of different ages', 'ضایعه متافیزی کلاسیک (شکستگی گوشه) + شکستگی‌های دنده‌های خلفی در سنین مختلف')[lang],
      L('Wulstfraktur des distalen Radius', 'Torus fracture of the distal radius', 'شکستگی توروس رادیوس دیستال')[lang],
      L('Klavikulafraktur nach Geburt', 'Clavicle fracture at birth', 'شکستگی کلاویکول هنگام تولد')[lang],
    ],
    1,
    L('Klassische Metaphysenfraktur (bucket-handle/corner fracture) und posteriore Rippenfrakturen sind hochspezifisch für nicht-akzidentelles Trauma. Multiple Frakturen verschiedenen Alters, Schädel-, Spiral- oder Femurfrakturen ohne Erklärung → Kinderschutzprotokoll.', 'Classic metaphyseal lesion and posterior rib fractures are highly specific for non-accidental trauma. Multiple fractures of different ages, skull, spiral, or femur fractures without explanation → child protection protocol.', 'ضایعه متافیزی کلاسیک (سطل/گوشه) و شکستگی‌های دنده‌های خلفی برای تروما غیرعمدی بسیار اختصاصی هستند. شکستگی‌های متعدد در سنین مختلف، جمجمه، مارپیچ یا فمور بدون توضیح → پروتکل حمایت از کودک.')[lang]
  ),

].map(q => ({ ...q, tags: ['frakturen-kindesalter'] }))]))

export const FRAKTUR_KINDER_FLASHCARDS = [

  F('fk-fc-sh1', L('Salter-Harris', 'Salter-Harris', 'سالتر-هریس'),
    L('Salter-Harris Typ I: Was zeigt das Röntgen? Prognose?', 'Salter-Harris Type I: What does X-ray show? Prognosis?', 'سالتر-هریس نوع I: رادیوگرافی چه نشان می‌دهد؟ پیش‌آگهی؟'),
    L('Röntgen oft negativ (nur Weichteilschwellung). Diagnose klinisch: Druckschmerz über der Physis. Prognose: sehr gut.', 'X-ray often negative (soft tissue swelling only). Diagnosis is clinical: tenderness over the physis. Prognosis: excellent.', 'رادیوگرافی اغلب منفی (فقط تورم بافت نرم). تشخیص بالینی: حساسیت روی فیزیس. پیش‌آگهی: بسیار خوب.'),
    L('Typ I = rein physäre Verletzung – Röntgen oft blank.', 'Type I = pure physeal injury – X-ray often blank.', 'نوع I = آسیب خالص فیزیال – رادیوگرافی اغلب خالی.')
  ),

  F('fk-fc-sh2', L('Salter-Harris', 'Salter-Harris', 'سالتر-هریس'),
    L('Salter-Harris Typ II: Beschreibe die Frakturlinie und das Röntgenzeichen.', 'Salter-Harris Type II: Describe the fracture line and the X-ray sign.', 'سالتر-هریس نوع II: خط شکستگی و نشانه رادیوگرافی را توصیف کنید.'),
    L('Frakturlinie durch Physis + Metaphysenfragment. Thurston-Holland-Zeichen = dreieckiges Metaphysenfragment. Häufigster Typ (75 %). Prognose: sehr gut.', 'Fracture line through physis + metaphyseal fragment. Thurston-Holland sign = triangular metaphyseal fragment. Most common type (75 %). Prognosis: excellent.', 'خط شکستگی از طریق فیزیس + قطعه متافیزی. نشانه تورستون-هولاند = قطعه متافیزی مثلثی. شایع‌ترین نوع (۷۵ %). پیش‌آگهی: بسیار خوب.'),
    L('Thurston-Holland-Zeichen = Dreieck-Metaphysenfragment.', 'Thurston-Holland sign = triangular metaphyseal fragment.', 'نشانه تورستون-هولاند = قطعه متافیزی مثلثی.')
  ),

  F('fk-fc-sh3', L('Salter-Harris', 'Salter-Harris', 'سالتر-هریس'),
    L('Salter-Harris Typ III vs. IV: Was ist der Hauptunterschied?', 'Salter-Harris Type III vs. IV: What is the key difference?', 'سالتر-هریس نوع III در مقابل IV: تفاوت اصلی چیست؟'),
    L('Typ III: Physis + Epiphyse (intraartikulär). Typ IV: Physis + Epiphyse + Metaphyse (T-förmig). Beide erfordern OP wenn > 2 mm disloziert. Typ IV hat höheres Risiko für physeal bar.', 'Type III: physis + epiphysis (intra-articular). Type IV: physis + epiphysis + metaphysis (T-shaped). Both require surgery if > 2 mm displaced. Type IV has higher risk of physeal bar.', 'نوع III: فیزیس + اپی‌فیز (داخل مفصل). نوع IV: فیزیس + اپی‌فیز + متافیز (T شکل). هر دو در صورت > ۲ میلی‌متر جابجایی نیاز به جراحی دارند. نوع IV خطر بالاتری برای فیزیال بار دارد.'),
    L('III = Lower (Epiphyse), IV = Through all three layers.', 'III = Lower (epiphysis), IV = Through all three layers.', 'III = پایین (اپی‌فیز)، IV = از طریق هر سه لایه.')
  ),

  F('fk-fc-sh5', L('Salter-Harris', 'Salter-Harris', 'سالتر-هریس'),
    L('Salter-Harris Typ V: Warum wird er meist retrospektiv diagnostiziert?', 'Salter-Harris Type V: Why is it usually diagnosed retrospectively?', 'سالتر-هریس نوع V: چرا معمولاً به‌صورت گذشته‌نگر تشخیص داده می‌شود؟'),
    L('Typ V = axiale Kompressionsverletzung der Physis ohne sichtbare Frakturlinie. Erst wenn im Verlauf eine Wachstumsstörung/vorzeitiger Fugenschluss auftritt, wird die Diagnose gestellt. Seltenster Typ, schlechteste Prognose.', 'Type V = axial compression injury of the physis without a visible fracture line. Diagnosis is only made when growth disturbance/premature physeal closure appears at follow-up. Rarest type, worst prognosis.', 'نوع V = آسیب فشاری محوری به فیزیس بدون خط شکستگی قابل مشاهده. تشخیص تنها هنگام بروز اختلال رشد/بسته شدن زودهنگام فیزیس در پیگیری داده می‌شود. نادرترین نوع، بدترین پیش‌آگهی.'),
    L('SALTR-Eselsbrücke: R = Rammed (Kompressionsverletzung).', 'SALTR mnemonic: R = Rammed (compression injury).', 'یادآوری SALTR: R = کوبیده شده (آسیب فشاری).')
  ),

  F('fk-fc-wulst', L('Schaftsfrakturen', 'Shaft Fractures', 'شکستگی دیافیز'),
    L('Was ist eine Wulstfraktur (Torus) und wie wird sie behandelt?', 'What is a Torus (buckle) fracture and how is it treated?', 'شکستگی توروس (باکل) چیست و چگونه درمان می‌شود؟'),
    L('Metaphysäre Kortexaufwerfung durch axiale Stauchung – beide Kortizes aufgeworfen, nicht vollständig unterbrochen. Stabile Verletzung. Therapie: weiche Schiene oder kurzfristiger Gips 3–4 Wo.', 'Metaphyseal cortical buckling from axial compression – both cortices buckled, not fully disrupted. Stable injury. Treatment: soft splint or short cast 3–4 weeks.', 'فرورفتگی کورتکس متافیزی از فشار محوری – هر دو کورتکس فرورفته، کاملاً قطع نشده. آسیب پایدار. درمان: آتل نرم یا گچ کوتاه ۳–۴ هفته.'),
    L('Stabil → nur weiche Schiene nötig. Im Gegensatz zur Grünholzfraktur!', 'Stable → only soft splint needed. Unlike Greenstick!', 'پایدار → فقط آتل نرم لازم. برخلاف گرین‌استیک!')
  ),

  F('fk-fc-gruenholz', L('Schaftsfrakturen', 'Shaft Fractures', 'شکستگی دیافیز'),
    L('Was ist eine Grünholzfraktur und warum muss sie repositioniert werden?', 'What is a Greenstick fracture and why must it be reduced?', 'شکستگی گرین‌استیک چیست و چرا باید کاهش یابد؟'),
    L('Biegebruch: eine Kortex vollständig unterbrochen (Zugseite), andere nur gebogen (Druckseite). Instabil → Tendenz zur Progression. Reposition + Gips 4–6 Wo. Periost auf der Druckseite intakt.', 'Bending fracture: one cortex fully disrupted (tension side), other only bent (compression side). Unstable → tendency to progress. Reduction + cast 4–6 weeks. Periosteum intact on compression side.', 'شکستگی خمشی: یک کورتکس کاملاً قطع (طرف کشش)، دیگری فقط خم (طرف فشار). ناپایدار → تمایل به پیشرفت. کاهش + گچ ۴–۶ هفته. پریوست در طرف فشار سالم.'),
    L('Grünholz = wie grünes Holz: außen intakt, innen gebrochen.', 'Greenstick = like a green stick: outside intact, inside broken.', 'گرین‌استیک = مثل چوب سبز: بیرون سالم، داخل شکسته.')
  ),

  F('fk-fc-toddler', L('Toddler-Fraktur', 'Toddler Fracture', 'شکستگی توددلر'),
    L('Toddler-Fraktur: typisches Alter, Klinik, Diagnostik?', 'Toddler fracture: typical age, presentation, diagnosis?', 'شکستگی توددلر: سن معمول، تظاهرات بالینی، تشخیص؟'),
    L('9 Monate – 3 Jahre. Okkulte Spiralfraktur distale Tibia nach Bagatelltrauma. Klinik: plötzliches Hinken, Druckschmerz. Röntgen oft negativ. MRT oder Szintigraphie nach 72 h bei Zweifel.', '9 months – 3 years. Occult spiral fracture of the distal tibia after minor trauma. Presentation: sudden limp, point tenderness. X-ray often negative. MRI or bone scan after 72 h if uncertain.', '۹ ماه تا ۳ سال. شکستگی مارپیچ پنهان تیبیای دیستال بعد از ضربه جزئی. تظاهرات: لنگ ناگهانی، حساسیت نقطه‌ای. رادیوگرافی اغلب منفی. MRI یا اسکن استخوان بعد از ۷۲ ساعت در صورت تردید.'),
    L('Immer an Toddler-Fraktur denken bei Kleinkind mit Hinken ohne klares Trauma!', 'Always think of Toddler fracture in a toddler with limp and no clear trauma!', 'همیشه به شکستگی توددلر فکر کنید در کودک نوپا با لنگ و بدون ضربه مشخص!')
  ),

  F('fk-fc-tillaux', L('Übergangsfrakturen', 'Transitional Fractures', 'شکستگی‌های گذار'),
    L('Tillaux-Fraktur: Mechanismus, Alter, Lokalisation?', 'Tillaux fracture: mechanism, age, location?', 'شکستگی تیلو: مکانیسم، سن، محل؟'),
    L('Außenrotationstrauma → Abriss des anterolateralen Epiphysenfragments der distalen Tibia durch vorderes Syndesmosenband. Alter: 12–14 J. Die anterolaterale Physis ist als letzte noch offen (Salter-Harris III). Im Röntgen-AP sichtbar; lateral oft unauffällig.', 'External rotation injury → avulsion of anterolateral epiphyseal fragment of distal tibia by anterior inferior tibiofibular ligament. Age: 12–14 yr. The anterolateral physis is the last to remain open (Salter-Harris III). Visible on AP X-ray; lateral often unremarkable.', 'آسیب چرخش خارجی → پارگی قطعه اپی‌فیزی قدامی-جانبی تیبیای دیستال توسط رباط سیندزموز قدامی-تحتانی. سن: ۱۲–۱۴ سال. فیزیس قدامی-جانبی آخرین باز است (سالتر-هریس III). در رادیوگرافی AP قابل مشاهده؛ نمای جانبی اغلب طبیعی.'),
    L('Tipp: Lateral unauffällig bei Tillaux – immer AP beachten!', 'Tip: Lateral unremarkable in Tillaux – always check AP!', 'نکته: نمای جانبی در تیلو طبیعی است – همیشه AP را بررسی کنید!')
  ),

  F('fk-fc-triplane', L('Übergangsfrakturen', 'Transitional Fractures', 'شکستگی‌های گذار'),
    L('Triplane-Fraktur: Welche 3 Ebenen sind betroffen? Warum CT?', 'Triplane fracture: Which 3 planes are involved? Why CT?', 'شکستگی سه‌صفحه‌ای: کدام ۳ صفحه درگیر هستند؟ چرا CT؟'),
    L('Sagittal (Epiphyse), axial (Physis), koronal (Metaphyse). Alter: 13–15 J. CT ist essenziell für: Fragmentanzahl, Gelenkstufenbildung > 2 mm (OP-Indikation) und OP-Planung.', 'Sagittal (epiphysis), axial (physis), coronal (metaphysis). Age: 13–15 yr. CT is essential for: fragment count, articular step > 2 mm (surgical indication) and surgical planning.', 'ساژیتال (اپی‌فیز)، محوری (فیزیس)، کرونال (متافیز). سن: ۱۳–۱۵ سال. CT برای: تعداد قطعات، پله مفصلی > ۲ میلی‌متر (نشانه جراحی) و برنامه‌ریزی جراحی ضروری است.'),
    L('3 Ebenen: SAK – Sagittal-Axial-Koronal.', '3 planes: SAC – Sagittal-Axial-Coronal.', '۳ صفحه: ساژیتال-محوری-کرونال.')
  ),

  F('fk-fc-periost', L('Grundlagen', 'Basics', 'مبانی'),
    L('Warum hat der kindliche Periostmantel protektive Funktion bei Frakturen?', 'Why does the paediatric periosteal sleeve have a protective function in fractures?', 'چرا پوشش پریوست کودکانه نقش محافظتی در شکستگی‌ها دارد؟'),
    L('Dicker, gefäßreicher Periostmantel: 1) verhindert vollständige Dislokation (wirkt wie Scharnier), 2) liefert Osteoprogenitorzellen für schnelle Kallusbildung, 3) bewirkt rasche Heilung.', 'Thick, vascular periosteal sleeve: 1) prevents complete dislocation (acts as a hinge), 2) supplies osteoprogenitor cells for rapid callus formation, 3) results in rapid healing.', 'پوشش پریوست ضخیم و عروقی: ۱) از دررفتگی کامل جلوگیری می‌کند (مثل لولا عمل می‌کند)، ۲) سلول‌های استئوپروژنیتور برای تشکیل سریع کالوس تأمین می‌کند، ۳) ترمیم سریع را موجب می‌شود.'),
    L('Periost bei Kindern = protektiver, regenerativer Mantel.', 'Periosteum in children = protective, regenerative sleeve.', 'پریوست در کودکان = پوشش محافظ و بازسازنده.')
  ),

  F('fk-fc-remodel', L('Grundlagen', 'Basics', 'مبانی'),
    L('Was remodelliert sich bei Kinderfrakturen, was nicht?', 'What remodels and what does NOT in paediatric fractures?', 'در شکستگی‌های کودکان چه چیزی بازسازی می‌شود و چه چیزی نه؟'),
    L('Remodelliert: Achsfehlstellungen in der Bewegungsebene < 20–25° (v.a. physennah, junges Alter). NICHT: Rotationsfehlstellungen, erhebliche Verkürzungen, Achsfehlstellungen > 25°.', 'Remodels: angular deformities in the plane of motion < 20–25° (especially near physis, young age). Does NOT: rotational malalignment, significant shortening, angular deformities > 25°.', 'بازسازی می‌شود: ناهنجاری‌های محوری در صفحه حرکت < ۲۰–۲۵ درجه (به‌ویژه نزدیک فیزیس، سن پایین). نمی‌شود: ناهنجاری‌های چرخشی، کوتاه‌شدگی قابل توجه، ناهنجاری‌های محوری > ۲۵ درجه.'),
    L('Rotation remodelliert NICHT – Achse ja, Rotation nein!', 'Rotation does NOT remodel – axis yes, rotation no!', 'چرخش بازسازی نمی‌شود – محور بله، چرخش نه!')
  ),

  F('fk-fc-physis-anat', L('Grundlagen', 'Basics', 'مبانی'),
    L('Warum ist die Physis (Wachstumsfuge) die schwächste Struktur im kindlichen Skelett?', 'Why is the physis (growth plate) the weakest structure in the paediatric skeleton?', 'چرا فیزیس (صفحه رشد) ضعیف‌ترین ساختار در اسکلت کودکان است؟'),
    L('Knorpeliges Gewebe mit geringer Scherfestigkeit. Unter Scherbelastung oder Torsion gibt sie vor Bändern und Kapseln nach → bei Erwachsenen Bandruptur, bei Kindern Physenfraktur. Zonen der hypertrophen Chondrozyten sind am vulnerabelsten.', 'Cartilaginous tissue with low shear strength. Under shear or torsional load, it fails before ligaments and capsules → adults get ligament rupture, children get physeal fracture. The hypertrophic chondrocyte zone is most vulnerable.', 'بافت غضروفی با مقاومت برشی کم. تحت بار برشی یا پیچشی، قبل از رباط‌ها و کپسول‌ها آسیب می‌بیند → بزرگسالان پارگی رباط، کودکان شکستگی فیزیس. ناحیه کندروسیت‌های هیپرتروفیک آسیب‌پذیرترین است.'),
    L('Kinder luxieren seltener – sie frakturieren die Physis stattdessen.', 'Children rarely dislocate – they fracture the physis instead.', 'کودکان به ندرت دچار دررفتگی می‌شوند – به جای آن فیزیس را می‌شکنند.')
  ),

  F('fk-fc-nai', L('Grundlagen', 'Basics', 'مبانی'),
    L('Welche Frakturtypen sind hochspezifisch für Kindesmisshandlung (NAI)?', 'Which fracture types are highly specific for non-accidental injury (NAI)?', 'کدام انواع شکستگی برای کودک‌آزاری (NAI) بسیار اختصاصی هستند؟'),
    L('Klassische Metaphysenfraktur (bucket-handle/corner), posteriore Rippenfrakturen, Schädelbasisfrakturen ohne Trauma, multiple Frakturen verschiedenen Alters. Cave: Toddler-Fraktur kann ähnlich aussehen.', 'Classic metaphyseal lesion (bucket-handle/corner), posterior rib fractures, skull base fractures without trauma, multiple fractures of different ages. Caution: Toddler fracture can look similar.', 'ضایعه متافیزی کلاسیک (سطل/گوشه)، شکستگی‌های دنده‌های خلفی، شکستگی‌های پایه جمجمه بدون ضربه، شکستگی‌های متعدد در سنین مختلف. هشدار: شکستگی توددلر می‌تواند مشابه به نظر برسد.'),
    L('NAI-Triad: Metaphysenfraktur + Rippenfraktur + intrakranielle Verletzung.', 'NAI triad: metaphyseal fracture + rib fracture + intracranial injury.', 'سه‌گانه NAI: شکستگی متافیز + شکستگی دنده + آسیب داخل جمجمه.')
  ),

  F('fk-fc-uebergang-ct', L('Übergangsfrakturen', 'Transitional Fractures', 'شکستگی‌های گذار'),
    L('Wann ist CT bei Kinderfrakturen indiziert?', 'When is CT indicated in paediatric fractures?', 'CT در کودکان چه زمانی در شکستگی‌ها اندیکاسیون دارد؟'),
    L('1) Übergangsfrakturen (Tillaux/Triplane): immer CT zum Ausschluss > 2 mm Gelenkstufenbildung. 2) Komplexe Gelenkfrakturen. 3) Operative Planung. 4) Verdacht auf Kindesmisshandlung (Ganzkörper-Skelettszintigraphie oder Low-dose CT).', '1) Transitional fractures (Tillaux/Triplane): always CT to exclude > 2 mm articular step. 2) Complex articular fractures. 3) Surgical planning. 4) Suspected NAI (whole-body bone scan or low-dose CT).', '۱) شکستگی‌های گذار (تیلو/سه‌صفحه‌ای): همیشه CT برای رد > ۲ میلی‌متر پله مفصلی. ۲) شکستگی‌های پیچیده مفصلی. ۳) برنامه‌ریزی جراحی. ۴) ظن به NAI (اسکن استخوان کل بدن یا CT کم‌دوز).'),
    L('Tillaux + Triplane → immer CT. Schwellenwert: 2 mm Gelenkstufe.', 'Tillaux + Triplane → always CT. Threshold: 2 mm articular step.', 'تیلو + سه‌صفحه‌ای → همیشه CT. آستانه: ۲ میلی‌متر پله مفصلی.')
  ),

].map(fc => ({
  ...fc,
  topicId: 'frakturen-kindesalter',
  front: fc.front,
  answer: fc.answer,
  explanation: fc.explanation,
}))

export const FRAKTUR_KINDER_FLASHCARD_TOPIC = {
  id: 'frakturen-kindesalter',
  title: {
    de: 'Frakturen im Kindesalter',
    en: 'Paediatric Fractures',
    fa: 'شکستگی‌های دوران کودکی',
  },
  color: '#d97706',
}
