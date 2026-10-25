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
      value: L('Physis', 'Physis', 'فیزیس'),
      label: L('Wachstumsfuge', 'growth plate', 'صفحهٔ رشد'),
      text: L('eigene Frakturmuster', 'distinct injury patterns', 'الگوهای آسیب ویژه'),
    },
    {
      value: L('Typ II', 'Type II', 'نوع II'),
      label: L('Salter-Harris', 'Salter-Harris', 'سالتر-هریس'),
      text: L('häufigster Typ', 'most common type', 'شایع‌ترین نوع'),
    },
    {
      value: L('Toddler', 'Toddler', 'توددلر'),
      label: L('Okkulte Fraktur', 'occult fracture', 'شکستگی پنهان'),
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
          'Thick, vascular periosteal sleeve → helps prevent complete displacement of the fracture fragments, accelerates healing, and promotes callus formation.',
          'پوشش پریوست ضخیم و عروقی → به جلوگیری از جابه‌جایی کامل قطعات شکستگی کمک می‌کند، ترمیم را تسریع می‌کند و تشکیل کالوس را تقویت می‌نماید.'
        ),
      },
      {
        icon: '📏',
        title: L('Wachstumsfuge (Physis)', 'Growth Plate (Physis)', 'صفحه رشد (فیزیس)'),
        text: L(
          'Knorpelige Wachstumszone zwischen Epi- und Metaphyse; eine charakteristische Lokalisation für Frakturen im wachsenden Skelett.',
          'Cartilaginous growth zone between epiphysis and metaphysis; a characteristic site of fractures in the growing skeleton.',
          'ناحیه غضروفی رشد میان اپی‌فیز و متافیز؛ محل مشخصی برای شکستگی در اسکلت در حال رشد.'
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
      'Bei offenen Wachstumsfugen die Physis als mögliche Verletzungsstruktur und mögliche Wachstumsfolgen mitbeurteilen.',
      'When growth plates are open, include the physis as a possible injury site and consider potential growth consequences.',
      'هنگامی که صفحه رشد باز است، فیزیس را به‌عنوان محل احتمالی آسیب و پیامدهای احتمالی رشد در ارزیابی در نظر بگیرید.'
    ),
  },

  salterHarris: {
    title: L('Salter-Harris-Klassifikation', 'Salter-Harris Classification', 'طبقه‌بندی سالتر-هریس'),
    lead: L(
      'Die Klassifikation beschreibt fünf Frakturverläufe durch die Physis. Das Risiko einer Wachstumsstörung hängt vom Typ und der konkreten Verletzung ab; Typ III/IV reichen in die Gelenkfläche, Typ V kann initial subtil sein.',
      'The classification describes five fracture paths involving the physis. Growth-disturbance risk depends on type and the specific injury; types III/IV reach the joint surface, while type V may be subtle initially.',
      'این طبقه‌بندی پنج مسیر شکستگی درگیرکنندهٔ فیزیس را توصیف می‌کند. خطر اختلال رشد به نوع و آسیب مشخص بستگی دارد؛ انواع III/IV به سطح مفصلی می‌رسند و نوع V ممکن است در ابتدا ظریف باشد.'
    ),
    schema: {
      src: '/frakturen-kindesalter/salter-harris-schema.svg',
      alt: L('Salter-Harris Klassifikation Schema (Typ I–V)', 'Salter-Harris Classification Diagram (Type I–V)', 'شمای طبقه‌بندی سالتر-هریس (نوع I–V)'),
      note: L('I: Physis · II: Physis + Metaphyse · III: Physis + Epiphyse · IV: Metaphyse + Physis + Epiphyse · V: Kompression der Physis', 'I: physis · II: physis + metaphysis · III: physis + epiphysis · IV: metaphysis + physis + epiphysis · V: physeal compression', 'I: فیزیس · II: فیزیس + متافیز · III: فیزیس + اپی‌فیز · IV: متافیز + فیزیس + اپی‌فیز · V: فشار فیزیس'),
    },
    headers: [
      L('Typ', 'Type', 'نوع'),
      L('Mnemonic', 'Mnemonic', 'یادآوری'),
      L('Frakturlinie', 'Fracture line', 'خط شکستگی'),
      L('Bildgebung / Risiko', 'Imaging / risk', 'تصویربرداری / خطر'),
    ],
    rows: [
      [
        L('I', 'I', 'I'),
        L('S – Straight (Slip)', 'S – Straight (Slip)', 'S – مستقیم (لغزش)'),
        L('Rein physäre Fraktur, Metaphyse/Epiphyse intakt', 'Pure physeal fracture, metaphysis/epiphysis intact', 'شکستگی خالص فیزیال، متافیز/اپی‌فیز سالم'),
        L('Röntgen kann unauffällig sein; ggf. indirekte Physenverbreiterung im Seitenvergleich', 'X-ray may be normal; indirect physeal widening may be seen relative to the other side', 'رادیوگرافی ممکن است طبیعی باشد؛ گاهی پهن‌شدن غیرمستقیم فیزیس در مقایسه با سمت مقابل دیده می‌شود'),
      ],
      [
        L('II', 'II', 'II'),
        L('A – Above (Metaphyse)', 'A – Above (Metaphysis)', 'A – بالا (متافیز)'),
        L('Linie durch Physis + Metaphysenfragment (Thurston-Holland-Zeichen)', 'Line through physis + metaphyseal fragment (Thurston-Holland sign)', 'خط از طریق فیزیس + قطعه متافیز (نشانه تورستون-هولاند)'),
        L('Häufigster Typ; meist günstiger Verlauf', 'Most common type; usually favourable course', 'شایع‌ترین نوع؛ معمولاً سیر مطلوب'),
      ],
      [
        L('III', 'III', 'III'),
        L('L – Lower (Epiphyse)', 'L – Lower (Epiphysis)', 'L – پایین (اپی‌فیز)'),
        L('Linie durch Physis + Epiphyse, intraartikulär', 'Line through physis + epiphysis, intra-articular', 'خط از طریق فیزیس + اپی‌فیز، داخل مفصل'),
        L('Intraartikulär: Gelenkfläche und mögliches Risiko für Wachstumsstörung beachten.', 'Intra-articular: note the joint surface and possible risk of growth disturbance.', 'داخل‌مفصلی: سطح مفصل و احتمال خطر اختلال رشد را در نظر بگیرید.'),
      ],
      [
        L('IV', 'IV', 'IV'),
        L('T – Through (Komplett)', 'T – Through (Complete)', 'T – از طریق (کامل)'),
        L('Durchläuft Metaphyse, Physis und Epiphyse (T-förmig)', 'Runs through metaphysis, physis, and epiphysis (T-shaped)', 'از متافیز، فیزیس و اپی‌فیز عبور می‌کند (T شکل)'),
        L('Gelenkbeteiligung; Risiko einer Wachstumsstörung', 'Joint involvement; risk of growth disturbance', 'درگیری مفصل؛ خطر اختلال رشد'),
      ],
      [
        L('V', 'V', 'V'),
        L('R – Rammed (Kompression)', 'R – Rammed (Compression)', 'R – کوبیده شده (فشاری)'),
        L('Kompressionsverletzung der Physis, Röntgen oft unauffällig', 'Compression injury of the physis, X-ray often unremarkable', 'آسیب فشاری به فیزیس، رادیوگرافی اغلب طبیعی'),
        L('Kompression oft initial subtil; Physenverschmälerung kann später auffallen, Wachstumsstörung möglich', 'Compression can be subtle initially; physeal narrowing may become apparent later, and growth disturbance can occur', 'فشار ممکن است در ابتدا ظریف باشد؛ باریک‌شدن فیزیس می‌تواند بعداً آشکار شود و اختلال رشد ممکن است رخ دهد'),
      ],
    ],
    key: L(
      'Merkhilfe SALTR: S = Straight through (I), A = Above metaphysis (II), L = Lower epiphysis (III), T = Through all (IV), R = Rammed/Compression (V).',
      'Mnemonic SALTR: S = Straight through (I), A = Above metaphysis (II), L = Lower epiphysis (III), T = Through all (IV), R = Rammed/Compression (V).',
      'یادآوری SALTR: S = مستقیم (I)، A = بالای متافیز (II)، L = پایین اپی‌فیز (III)، T = از طریق همه (IV)، R = کوبیده/فشاری (V).'
    ),
    cave: L(
      'Typ V kann initial radiologisch subtil sein; eine Physenverschmälerung oder Wachstumsstörung kann sich erst im Verlauf zeigen. Ein unauffälliges Erstbild schließt die Verletzung nicht sicher aus.',
      'Type V can be radiologically subtle at first; physeal narrowing or growth disturbance may only become visible over time. A normal initial image does not reliably exclude the injury.',
      'نوع V ممکن است در ابتدا در رادیوگرافی ظریف باشد؛ باریک‌شدن فیزیس یا اختلال رشد می‌تواند در پیگیری آشکار شود. تصویر اولیهٔ طبیعی آسیب را با اطمینان رد نمی‌کند.'
    ),
  },

  schaft: {
    title: L('Schaftsfrakturen: Wulst- und Grünholzfraktur', 'Shaft Fractures: Torus and Greenstick', 'شکستگی دیافیز: توروس و گرین‌استیک'),
    lead: L(
      'Die erhöhte Knochenelastizität führt bei Kindern zu charakteristischen Mustern wie Wulst- und Grünholzfrakturen; diese sind bei Kindern deutlich häufiger als bei Erwachsenen.',
      'Increased bone elasticity produces characteristic patterns such as Torus and Greenstick fractures in children; these are far more common in children than in adults.',
      'الاستیسیتهٔ بیشتر استخوان در کودکان الگوهای شاخصی مانند توروس و گرین‌استیک ایجاد می‌کند؛ این الگوها در کودکان بسیار شایع‌تر از بزرگسالان هستند.'
    ),
    schema: {
      src: '/frakturen-kindesalter/wulst-vs-gruenholz-schema.png',
      alt: L('Wulstfraktur vs. Grünholzfraktur – schematischer Vergleich', 'Torus vs. Greenstick Fracture – schematic comparison', 'شکستگی توروس در مقابل گرین‌استیک – مقایسه شماتیک'),
      note: L('Torus: kortikale Aufwerfung ohne vollständige Unterbrechung. Grünholz: eine Kortikalis unterbrochen, die Gegenseite gebogen.', 'Torus: cortical buckling without complete disruption. Greenstick: one cortex disrupted, opposite side bent.', 'توروس: برجستگی کورتکس بدون قطع کامل. گرین‌استیک: یک کورتکس قطع و سمت مقابل خمیده است.'),
    },
    headers: [
      L('Merkmal', 'Feature', 'ویژگی'),
      L('Wulstfraktur (Torus)', 'Torus Fracture (Buckle)', 'شکستگی توروس (باکل)'),
      L('Grünholzfraktur (Greenstick)', 'Greenstick Fracture', 'شکستگی گرین‌استیک'),
    ],
    rows: [
      [
        L('Morphologie', 'Morphology', 'ریخت‌شناسی'),
        L('Kortikale Aufwerfung/Bulge ohne vollständige Kortikalisunterbrechung; oft am Übergang Metaphyse–Diaphyse', 'Cortical bulge/buckling without complete cortical disruption; often at the metaphysis–diaphysis junction', 'برجستگی/تاخوردگی کورتکس بدون قطع کامل؛ اغلب در محل اتصال متافیز و دیافیز'),
        L('Biegefraktur: eine Kortikalis bricht, die Gegenseite bleibt gebogen', 'Bending fracture: one cortex breaks while the opposite side remains bent', 'شکستگی خمشی: یک کورتکس می‌شکند و سمت مقابل خمیده می‌ماند'),
      ],
      [
        L('Periost / Stabilität', 'Periosteum / stability', 'پریوست / پایداری'),
        L('Periost intakt; typischerweise stabil', 'Periosteum intact; typically stable', 'پریوست سالم؛ معمولاً پایدار'),
        L('Periost auf der gebogenen Gegenseite meist intakt; weniger stabil als Torus', 'Periosteum on the bent opposite side usually remains intact; less stable than torus', 'پریوست در سمت مقابلِ خم‌شده معمولاً سالم می‌ماند؛ از توروس ناپایدارتر است'),
      ],
      [
        L('Typische Projektion', 'Typical projection', 'نمای معمول'),
        L('Die Aufwerfung ist in der seitlichen Aufnahme oft deutlicher', 'The buckle is often clearer on the lateral view', 'برجستگی در نمای لترال اغلب واضح‌تر است'),
        L('Meist diaphysär; Frakturlinie/Biegung oft in beiden Ebenen erkennbar', 'Usually diaphyseal; fracture line/bowing often visible in both views', 'معمولاً دیافیزی؛ خط شکستگی/خمیدگی اغلب در هر دو نما دیده می‌شود'),
      ],
    ],
    wulstCase: {
      title: L('Fallbeispiel Wulstfraktur (rID:65820)', 'Case: Torus Fracture (rID:65820)', 'مورد: شکستگی توروس (rID:65820)'),
      radiopaediaUrl: 'https://radiopaedia.org/cases/65820/play',
      images: [
        {
          src: '/frakturen-kindesalter/wulst-hand.jpeg',
          caption: L('Handgelenk AP – metaphysäre kortikale Aufwerfung', 'Wrist AP – metaphyseal cortical buckling', 'مچ دست AP – برجستگی کورتیکال متافیزی'),
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
      'Torus zeigt eine kortikale Aufwerfung ohne vollständige Unterbrechung; bei der Grünholzfraktur ist eine Kortikalis gebrochen und die Gegenseite gebogen. Achte auf die Ebene, in der die Veränderung am besten sichtbar ist.',
      'Torus shows cortical buckling without complete disruption; in a greenstick fracture one cortex is broken and the opposite side is bent. Check which view best shows the abnormality.',
      'در توروس کورتکس برجسته/تاخورده است اما کاملاً قطع نشده؛ در گرین‌استیک یک کورتکس شکسته و سمت مقابل خمیده است. به نمایی توجه کنید که تغییر در آن واضح‌تر دیده می‌شود.'
    ),
  },

  toddler: {
    title: L('Toddler-Fraktur', 'Toddler Fracture', 'شکستگی توددلر'),
    lead: L(
      'Typische, meist nicht dislozierte oblique/spirale distale Tibiaschaftfraktur im Laufalter (etwa 9 Monate–3 Jahre) nach geringem Torsionstrauma. Die Erstaufnahme kann unauffällig sein.',
      'A typical, usually undisplaced oblique/spiral distal tibial shaft fracture in a walking toddler (about 9 months–3 years) after minor twisting trauma. Initial radiographs may be normal.',
      'شکستگی مایل/مارپیچی معمولاً بدون جابجایی در بخش دیستال دیافیز تیبیا در کودک نوپا و راه‌رونده (حدود ۹ ماه تا ۳ سال) پس از پیچش خفیف. رادیوگرافی اولیه ممکن است طبیعی باشد.'
    ),
    items: [
      {
        icon: '👶',
        title: L('Altersgruppe', 'Age group', 'گروه سنی'),
        text: L('Etwa 9 Monate – 3 Jahre; das Kind kann plötzlich hinken oder das Belasten verweigern. Befund und Mechanismus im Kontext beurteilen.', 'About 9 months – 3 years; the child may suddenly limp or refuse to bear weight. Interpret the presentation and mechanism in context.', 'حدود ۹ ماه تا ۳ سال؛ کودک ممکن است ناگهان بلنگد یا از تحمل وزن خودداری کند. تظاهر و مکانیسم را در زمینهٔ بالینی تفسیر کنید.'),
      },
      {
        icon: '📍',
        title: L('Lokalisation', 'Location', 'محل'),
        text: L('Distales Tibiaschaftdrittel; meist nicht dislozierte oblique/spirale Linie. Die Fibula ist häufig intakt.', 'Distal third of the tibial shaft; usually an undisplaced oblique/spiral line. The fibula is often intact.', 'یک‌سوم دیستال دیافیز تیبیا؛ معمولاً خط مایل/مارپیچی بدون جابجایی. فیبولا اغلب سالم است.'),
      },
      {
        icon: '🔍',
        title: L('Röntgen und Verlauf', 'Radiographs and follow-up', 'رادیوگرافی و پیگیری'),
        text: L('AP und seitliche Aufnahmen von Tibia/Fibula (mit Knie und Sprunggelenk) prüfen. Ist die Erstaufnahme negativ, schließt das die Fraktur nicht aus: Bei anhaltendem Verdacht kann eine Schrägaufnahme helfen; eine Verlaufskontrolle nach etwa 1–2 Wochen kann periostale Reaktion zeigen.', 'Review AP and lateral tibia/fibula views (including knee and ankle). A negative initial study does not exclude fracture: an oblique view may help when suspicion persists, and repeat radiographs at about 1–2 weeks may show periosteal reaction.', 'نماهای AP و لترال تیبیا/فیبولا (با پوشش زانو و مچ پا) بررسی شوند. رادیوگرافی اولیهٔ منفی شکستگی را رد نمی‌کند: در صورت تداوم ظن، نمای مایل می‌تواند کمک کند و رادیوگرافی مجدد حدود ۱ تا ۲ هفته بعد ممکن است واکنش پریوستی را نشان دهد.'),
      },
    ],
    caseTitle: L('Fallbeispiel Toddler-Fraktur (rID:12023)', 'Case: Toddler Fracture (rID:12023)', 'مورد: شکستگی توددلر (rID:12023)'),
    radiopaediaUrl: 'https://radiopaedia.org/cases/12023/play',
    images: [
      {
        src: '/frakturen-kindesalter/toddler-tibia.jpeg',
        caption: L('Tibia AP – Erstaufnahme; Toddler-Frakturen können anfangs radiologisch subtil oder okkult sein', 'Tibia AP – initial view; toddler fractures may be subtle or occult initially', 'تیبیا AP – نمای اولیه؛ شکستگی توددلر ممکن است در ابتدا در رادیوگرافی ظریف یا پنهان باشد'),
      },
    ],
    cave: L(
      'Eine einfache Toddler-Fraktur allein beweist keine Misshandlung. Entwicklungsstand, Anamnese und Befund müssen zusammenpassen; bei atypischen oder widersprüchlichen Hinweisen ist eine kinderschutzmedizinische Einschätzung nach lokalem Vorgehen erforderlich.',
      'A toddler fracture alone does not establish abuse. Developmental stage, history, and findings should be concordant; atypical or conflicting features warrant safeguarding assessment under local pathways.',
      'شکستگی توددلر به‌تنهایی اثبات‌کنندهٔ کودک‌آزاری نیست. سطح رشد، شرح حال و یافته‌ها باید با هم سازگار باشند؛ نشانه‌های غیرمعمول یا متناقض نیازمند ارزیابی حفاظتی طبق مسیر محلی هستند.'
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
        'Frakturlinien verlaufen in drei Ebenen: sagittal durch die Epiphyse, transversal durch die Physis und koronal durch die posteriore Metaphyse. In der AP-Projektion kann das Muster wie Typ III/Tillaux, lateral wie Typ IV (teils auch Typ II) erscheinen. CT kann die räumliche Fragmentkonfiguration ergänzen, wenn die Röntgenbilder dafür nicht ausreichen.',
        'Fracture lines run in three planes: sagittally through the epiphysis, transversely through the physis, and coronally through the posterior metaphysis. On AP projection the pattern may resemble type III/Tillaux, while laterally it may resemble type IV (sometimes type II). CT can add spatial detail when radiographs are insufficient.',
        'خطوط شکستگی در سه صفحه قرار دارند: ساژیتال از اپی‌فیز، عرضی از فیزیس و کرونال از متافیز خلفی می‌گذرند. در نمای AP الگو ممکن است شبیه نوع III/تیلو و در نمای لترال شبیه نوع IV (گاهی نوع II) باشد. اگر رادیوگرافی کافی نباشد، CT می‌تواند جزئیات فضایی قطعات را تکمیل کند.'
      ),
      age: L('13–15 Jahre', '13–15 years', '۱۳–۱۵ سال'),
      schema: {
        src: '/frakturen-kindesalter/triplane-schema.png',
        alt: L('Triplane-Fraktur – Ebenen-Schema (sagittal, axial, koronal)', 'Triplane Fracture – planes diagram (sagittal, axial, coronal)', 'شکستگی سه‌صفحه‌ای – شمای صفحات (ساژیتال، محوری، کرونال)'),
        note: L('Sagittal: Epiphyse · transversal: Physis · koronal: posteriore Metaphyse', 'Sagittal: epiphysis · transverse: physis · coronal: posterior metaphysis', 'ساژیتال: اپی‌فیز · عرضی: فیزیس · کرونال: متافیز خلفی'),
      },
      caseTitle: L('Fallbeispiel Triplane-Fraktur (rID:33599)', 'Case: Triplane Fracture (rID:33599)', 'مورد: شکستگی سه‌صفحه‌ای (rID:33599)'),
      radiopaediaUrl: 'https://radiopaedia.org/cases/33599/play',
      images: [
        {
          src: '/frakturen-kindesalter/triplane-lateral-1.jpeg',
          caption: L('Sprunggelenk lateral – Metaphysenfragment posterior (Triplane)', 'Ankle lateral – posterior metaphyseal fragment (Triplane)', 'مچ پا جانبی – قطعه متافیزی خلفی (سه‌صفحه‌ای)'),
        },
        {
          src: '/frakturen-kindesalter/triplane-ap.jpeg',
          caption: L('Sprunggelenk AP – Frakturlinien des Triplane-Musters', 'Ankle AP – fracture lines of the triplane pattern', 'مچ پا AP – خطوط شکستگی الگوی سه‌صفحه‌ای'),
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
    twoPlane: {
      title: L('Zwei-Ebenen-Muster (PDF-Bezeichnung)', 'Two-plane pattern (PDF wording)', 'الگوی دوصفحه‌ای (اصطلاح PDF)'),
      text: L(
        'Die PDF beschreibt eine sagittale Frakturlinie durch die Epiphyse und eine transversale Linie durch die Physis, ohne das für das klassische Triplane-Muster charakteristische posteriore metaphysäre Fragment. Beschreibe die tatsächlich betroffenen Ebenen; die Bezeichnung allein ersetzt keine Morphologie.',
        'The PDF describes a sagittal fracture line through the epiphysis and a transverse line through the physis, without the posterior metaphyseal fragment characteristic of the classic triplane pattern. Describe the actual planes involved; the label alone does not replace morphology.',
        'PDF خط شکستگی ساژیتال از اپی‌فیز و خط عرضی از فیزیس را توصیف می‌کند، بدون قطعهٔ متافیزی خلفی که مشخصهٔ الگوی کلاسیک سه‌صفحه‌ای است. صفحات درگیر را بر اساس مورفولوژی واقعی توصیف کنید؛ نام به‌تنهایی جایگزین مورفولوژی نیست.'
      ),
    },
    cave: L(
      'Bei Verdacht auf Tillaux-/Triplane-Fraktur kann CT zusätzliche räumliche Information zur Fragmentkonfiguration und Gelenkbeteiligung liefern, wenn die Röntgenaufnahmen dafür nicht ausreichen. Die PDF enthält außerdem Behandlungsempfehlungen; konkrete Therapieentscheidungen sind nicht Teil dieses bildgebungsorientierten Abschnitts.',
      'When Tillaux/triplane fracture is suspected, CT can add spatial information about fragment configuration and joint involvement if radiographs are insufficient. The PDF also contains treatment recommendations; specific treatment decisions are outside this imaging-focused section.',
      'در ظن به شکستگی تیلو/سه‌صفحه‌ای، اگر رادیوگرافی کافی نباشد، CT می‌تواند اطلاعات فضایی بیشتری دربارهٔ آرایش قطعات و درگیری مفصل بدهد. PDF توصیه‌های درمانی نیز دارد؛ تصمیم‌های درمانی مشخص خارج از دامنهٔ این بخش تصویربرداری‌محور هستند.'
    ),
  },

  takehome: {
    title: L('Take-home Punkte', 'Take-home Points', 'نکات کلیدی'),
    lead: L('Die wichtigsten Merksätze für die Praxis.', 'The most important points for clinical practice.', 'مهم‌ترین نکات برای عمل بالینی.'),
    items: [
      {
        title: L('Physis: typische Verletzungszone', 'Physis: characteristic injury site', 'فیزیس: محل شاخص آسیب'),
        text: L('Die Physis ist eine knorpelige Wachstumszone. Bei passendem klinischem Verdacht und zunächst unauffälligem Röntgenbild können insbesondere Typ I oder V subtil sein.', 'The physis is a cartilaginous growth zone. With compatible clinical suspicion and initially unremarkable radiographs, type I or V injuries may be subtle.', 'فیزیس ناحیه غضروفی رشد است. در صورت ظن بالینی سازگار و طبیعی بودن رادیوگرافی اولیه، آسیب نوع I یا V ممکن است ظریف باشد.'),
      },
      {
        title: L('Salter-Harris: Verlauf der Frakturlinie', 'Salter-Harris: fracture-line path', 'سالتر-هریس: مسیر خط شکستگی'),
        text: L('Typ III/IV reichen in die Gelenkfläche und können Wachstumsstörungen verursachen; Typ V ist eine Kompressionsverletzung und kann anfangs radiologisch subtil sein. Bildmorphologie und Verlauf getrennt beurteilen.', 'Types III/IV reach the joint surface and may cause growth disturbance; type V is a compression injury and can be radiologically subtle initially. Assess morphology and follow-up separately.', 'انواع III/IV به سطح مفصل می‌رسند و ممکن است اختلال رشد ایجاد کنند؛ نوع V آسیب فشاری است و در ابتدا ممکن است در رادیوگرافی ظریف باشد. مورفولوژی و پیگیری را جداگانه ارزیابی کنید.'),
      },
      {
        title: L('Toddler-Fraktur: Erstbild kann negativ sein', 'Toddler fracture: initial films may be negative', 'شکستگی توددلر: تصویر اولیه ممکن است منفی باشد'),
        text: L('AP- und Seitenaufnahmen prüfen; bei anhaltendem Verdacht kann eine Schrägaufnahme oder Verlaufskontrolle nach etwa 1–2 Wochen die Frakturlinie bzw. periostale Reaktion zeigen.', 'Review AP and lateral views; with persistent suspicion, an oblique view or repeat imaging at about 1–2 weeks may show the fracture line or periosteal reaction.', 'نماهای AP و لترال را بررسی کنید؛ در صورت تداوم ظن، نمای مایل یا تصویربرداری مجدد حدود ۱ تا ۲ هفته بعد ممکن است خط شکستگی یا واکنش پریوستی را نشان دهد.'),
      },
      {
        title: L('Übergangsfrakturen → CT', 'Transitional fractures → CT', 'شکستگی‌های گذار → CT'),
        text: L('CT kann bei unklarer Fragmentkonfiguration oder Gelenkbeteiligung ergänzende räumliche Information liefern. Ob CT erforderlich ist, hängt von Bildgebung und klinischer Planung ab.', 'CT can add spatial information when fragment configuration or joint involvement is unclear. Whether CT is needed depends on the imaging findings and clinical planning.', 'اگر آرایش قطعات یا درگیری مفصل روشن نباشد، CT می‌تواند اطلاعات فضایی تکمیلی بدهد. نیاز به CT به یافته‌های تصویربرداری و برنامه‌ریزی بالینی بستگی دارد.'),
      },
      {
        title: L('Remodellierung', 'Remodelling', 'بازسازی استخوان'),
        text: L('Korrektur durch Remodellierung hängt unter anderem von Alter, Knochen, Frakturort und Deformitätsebene ab. Rotationsfehlstellungen korrigieren sich in der Regel nicht zuverlässig.', 'Remodelling depends on factors including age, bone, fracture location, and plane of deformity. Rotational malalignment generally does not correct reliably.', 'اصلاح با بازسازی استخوان به عواملی مانند سن، استخوان، محل شکستگی و صفحه ناهنجاری بستگی دارد. ناهنجاری چرخشی معمولاً به‌طور قابل اتکا اصلاح نمی‌شود.'),
      },
    ],
  },

  sources: {
    title: L('Weiterführende Quellen', 'Further reading', 'منابع تکمیلی'),
    items: [
      { label: L('Royal Children’s Hospital Melbourne: Tibial shaft fractures (ED guideline)', 'Royal Children’s Hospital Melbourne: Tibial shaft fractures (ED guideline)', 'بیمارستان سلطنتی کودکان ملبورن: شکستگی‌های تنهٔ تیبیا (راهنمای اورژانس)'), href: 'https://www.rch.org.au/clinicalguide/guideline_index/fractures/tibial_shaft_emergency/' },
      { label: L('Royal Children’s Hospital Melbourne: Distal tibia/fibula physeal fractures (ED guideline)', 'Royal Children’s Hospital Melbourne: Distal tibia/fibula physeal fractures (ED guideline)', 'بیمارستان سلطنتی کودکان ملبورن: شکستگی‌های فیزیال دیستال تیبیا/فیبولا (راهنمای اورژانس)'), href: 'https://www.rch.org.au/clinicalguide/guideline_index/fractures/ankle_emergency/' },
      { label: L('Royal Children’s Hospital Melbourne: Physeal (growth plate) injuries', 'Royal Children’s Hospital Melbourne: Physeal (growth plate) injuries', 'بیمارستان سلطنتی کودکان ملبورن: آسیب‌های فیزیس (صفحهٔ رشد)'), href: 'https://www.rch.org.au/fracture-education/growth_plate_injuries/physeal_growth_plate_injuries/' },
      { label: L('BSCOS: Paediatric fracture templates', 'BSCOS: Paediatric fracture templates', 'انجمن ارتوپدی کودکان بریتانیا: الگوهای شکستگی کودکان'), href: 'https://www.bscos.org.uk/Portals/0/downloads/resources/BSCOS%20modifiable%20fracture%20templates.pdf' },
      { label: L('American Academy of Pediatrics: Evaluating Young Children With Fractures for Child Abuse (2025)', 'American Academy of Pediatrics: Evaluating Young Children With Fractures for Child Abuse (2025)', 'آکادمی پزشکی کودکان آمریکا: ارزیابی شکستگی در کودکان خردسال در زمینهٔ کودک‌آزاری (۲۰۲۵)'), href: 'https://publications.aap.org/pediatrics/article/155/2/e2024070074/200638/Evaluating-Young-Children-With-Fractures-for-Child' },
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
    L('Welcher Salter-Harris-Typ ist am häufigsten?',
      'Which Salter-Harris type is most common?',
      'کدام نوع سالتر-هریس شایع‌ترین است؟')[lang],
    [
      L('Typ I', 'Type I', 'نوع I')[lang],
      L('Typ II (mit Metaphysenfragment)', 'Type II (with metaphyseal fragment)', 'نوع II (با قطعه متافیزی)')[lang],
      L('Typ III', 'Type III', 'نوع III')[lang],
      L('Typ V', 'Type V', 'نوع V')[lang],
    ],
    1,
    L('Salter-Harris II zeigt neben der physären Fraktur ein charakteristisches Metaphysenfragment (Thurston-Holland-Zeichen). Es ist der häufigste Typ; der Verlauf ist meist günstig.', 'Salter-Harris II shows a characteristic metaphyseal fragment (Thurston-Holland sign) alongside the physeal fracture. It is the most common type and the course is generally favourable.', 'سالتر-هریس II در کنار شکستگی فیزیال، قطعهٔ متافیزی مشخصی نشان می‌دهد (نشانهٔ تورستون-هولاند). این نوع شایع‌ترین است و سیر آن معمولاً مطلوب است.')[lang]
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
    L('Typ III verläuft durch Physis und Epiphyse bis zur Gelenkfläche. Die intraartikuläre Morphologie und mögliche Wachstumsfolgen sind relevant; konkrete Therapie richtet sich nach dem individuellen Befund.', 'Type III crosses the physis and epiphysis to the joint surface. Intra-articular morphology and possible growth consequences matter; specific treatment depends on the individual findings.', 'نوع III از فیزیس و اپی‌فیز تا سطح مفصل امتداد می‌یابد. مورفولوژی داخل‌مفصلی و پیامدهای احتمالی رشد مهم‌اند؛ درمان مشخص به یافته‌های هر بیمار بستگی دارد.')[lang]
  ),

  Q(`fk-sh-4-${lang}`,
    L('Welcher Salter-Harris-Typ verläuft durch Metaphyse, Physis und Epiphyse?',
      'Which Salter-Harris type crosses the metaphysis, physis, and epiphysis?',
      'کدام نوع سالتر-هریس از متافیز، فیزیس و اپی‌فیز عبور می‌کند؟')[lang],
    [
      L('Typ I', 'Type I', 'نوع I')[lang],
      L('Typ II', 'Type II', 'نوع II')[lang],
      L('Typ IV', 'Type IV', 'نوع IV')[lang],
      L('Typ III', 'Type III', 'نوع III')[lang],
    ],
    2,
    L('Typ IV durchquert alle drei Abschnitte. Typ V ist dagegen eine Kompressionsverletzung der Physis.', 'Type IV crosses all three regions. Type V, by contrast, is a compression injury of the physis.', 'نوع IV از هر سه بخش عبور می‌کند. در مقابل، نوع V آسیب فشاری فیزیس است.')[lang]
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
    L('Typ V ist eine axiale Kompressionsverletzung der Wachstumsfuge ohne sichere sichtbare Frakturlinie. Sie kann erst im Verlauf durch Physenverschmälerung oder Wachstumsstörung erkennbar werden.', 'Type V is an axial compression injury of the growth plate without a reliably visible fracture line. It may only become apparent over time through physeal narrowing or growth disturbance.', 'نوع V آسیب فشاری محوری صفحهٔ رشد است و ممکن است خط شکستگی قابل مشاهدهٔ مطمئنی نداشته باشد. گاهی فقط در پیگیری با باریک‌شدن فیزیس یا اختلال رشد آشکار می‌شود.')[lang]
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
    L('Kortikale Aufwerfung/Bulge ohne vollständige Kortikalisunterbrechung; meist stabil. Im Röntgen kann die Aufwerfung in der seitlichen Projektion deutlicher sein.', 'Cortical buckling/bulge without complete cortical disruption; usually stable. On radiographs the buckle may be clearer on the lateral view.', 'برجستگی/تاخوردگی کورتکس بدون قطع کامل؛ معمولاً پایدار. در رادیوگرافی ممکن است برجستگی در نمای لترال واضح‌تر باشد.')[lang]
  ),

  Q(`fk-gruenholz-1-${lang}`,
    L('Was unterscheidet eine Grünholz- von einer Wulstfraktur?',
      'How does a Greenstick fracture differ from a Torus fracture?',
      'شکستگی گرین‌استیک چه تفاوتی با توروس دارد؟')[lang],
    [
      L('Weil sie die Physis betrifft', 'Because it involves the physis', 'چون فیزیس را درگیر می‌کند')[lang],
      L('Weil eine Kortikalis unterbrochen ist und die Gegenseite gebogen bleibt', 'Because one cortex is disrupted and the opposite side remains bent', 'چون یک کورتکس قطع شده و سمت مقابل خمیده باقی می‌ماند')[lang],
      L('Weil beide Kortizes unterbrochen sind', 'Because both cortices are disrupted', 'چون هر دو کورتکس قطع شده‌اند')[lang],
      L('Weil Grünholzfrakturen immer disloziert sind', 'Because Greenstick fractures are always displaced', 'چون شکستگی‌های گرین‌استیک همیشه جابجا هستند')[lang],
    ],
    1,
    L('Eine Kortikalis ist unterbrochen, die Gegenseite gebogen; das Periost bleibt dort meist intakt. Stabilität und Behandlung lassen sich nicht allein aus dem Musternamen festlegen.', 'One cortex is disrupted and the opposite side is bent; the periosteum usually remains intact there. Stability and treatment cannot be determined from the pattern name alone.', 'یک کورتکس قطع و سمت مقابل خمیده است؛ پریوست در آن سمت معمولاً سالم می‌ماند. پایداری و درمان را نمی‌توان تنها بر اساس نام الگو تعیین کرد.')[lang]
  ),

  Q(`fk-toddler-1-${lang}`,
    L('Bei einem Laufkind mit möglicher Toddler-Fraktur ist das Erst-Röntgen unauffällig. Was folgt daraus?',
      'A walking toddler with possible toddler fracture has an unremarkable initial X-ray. What follows?',
      'در کودک نوپای راه‌رونده با احتمال شکستگی توددلر، رادیوگرافی اولیه طبیعی است. نتیجه چیست؟')[lang],
    [
      L('Die Fraktur ist damit ausgeschlossen.', 'This excludes fracture.', 'این مورد شکستگی را رد می‌کند.')[lang],
      L('Sie ist nicht ausgeschlossen; Schräg- oder Verlaufskontrolle kann helfen.', 'It is not excluded; an oblique or follow-up view may help.', 'شکستگی رد نشده است؛ نمای مایل یا پیگیری رادیوگرافیک می‌تواند کمک کند.')[lang],
      L('Eine MRT ist immer der nächste Schritt.', 'MRI is always the next step.', 'MRI همیشه اقدام بعدی است.')[lang],
      L('Eine Knochenszintigraphie nach 72 Stunden ist zwingend.', 'A bone scan at 72 hours is mandatory.', 'اسکن استخوان در ۷۲ ساعت اجباری است.')[lang],
    ],
    1,
    L('Eine Toddler-Fraktur ist typischerweise eine nicht dislozierte schräge/spiralige Fraktur des distalen Tibiaschafts. Ein frühes negatives Röntgenbild schließt sie nicht aus; Schrägaufnahme oder Verlaufskontrolle kann die Frakturlinie bzw. periostale Reaktion zeigen.', 'A toddler fracture is typically a nondisplaced oblique/spiral fracture of the distal tibial shaft. An initially negative radiograph does not exclude it; an oblique view or follow-up may show the fracture line or periosteal reaction.', 'شکستگی توددلر معمولاً شکستگی مایل/مارپیچی بدون جابه‌جایی در بخش دیستال تنهٔ تیبیاست. رادیوگرافی اولیهٔ منفی آن را رد نمی‌کند؛ نمای مایل یا تصویربرداری پیگیری ممکن است خط شکستگی یا واکنش پریوست را نشان دهد.')[lang]
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
    L('Wann kann CT bei einer Triplane-Fraktur hilfreich sein?',
      'When can CT be helpful in a Triplane fracture?',
      'CT چه زمانی در شکستگی سه‌صفحه‌ای می‌تواند کمک‌کننده باشد؟')[lang],
    [
      L('MRT – wegen Weichteilbeteiligung', 'MRI – due to soft tissue involvement', 'MRI – به دلیل درگیری بافت نرم')[lang],
      L('CT ergänzen, wenn Röntgen Fragmentkonfiguration oder Gelenkstufe nicht ausreichend zeigt oder die Behandlungsplanung zusätzliche räumliche Information benötigt.', 'Add CT when radiographs do not adequately show fragment configuration or articular step, or when treatment planning needs additional spatial detail.', 'اگر رادیوگرافی آرایش قطعات یا پله مفصلی را به‌اندازه کافی نشان ندهد، یا برنامه‌ریزی درمان به جزئیات فضایی بیشتری نیاز داشته باشد، CT را اضافه کنید.')[lang],
      L('Szintigraphie – zum Frakturnachweis', 'Scintigraphy – for fracture detection', 'اسکن استخوان – برای تشخیص شکستگی')[lang],
      L('Konventionelles Röntgen reicht aus', 'Conventional X-ray is sufficient', 'رادیوگرافی معمولی کافی است')[lang],
    ],
    1,
    L('Triplane-Fraktur: sagittale Linie durch die Epiphyse, transversale durch die Physis, koronare durch die posteriore Metaphyse. CT kann ergänzen, wenn Röntgen die räumliche Fragmentkonfiguration oder Gelenkbeteiligung nicht ausreichend zeigt.', 'Triplane fracture: sagittal line through the epiphysis, transverse through the physis, and coronal through the posterior metaphysis. CT can add information when radiographs do not adequately show spatial fragment configuration or joint involvement.', 'شکستگی سه‌صفحه‌ای: خط ساژیتال از اپی‌فیز، خط عرضی از فیزیس و خط کرونال از متافیز خلفی می‌گذرد. اگر رادیوگرافی آرایش فضایی قطعات یا درگیری مفصل را کافی نشان ندهد، CT می‌تواند اطلاعات تکمیلی بدهد.')[lang]
  ),

  Q(`fk-two-plane-1-${lang}`,
    L('Laut PDF: Welche Frakturlinien kennzeichnen das Zwei-Ebenen-Muster im Unterschied zum klassischen Triplane-Muster?', 'In the PDF, which fracture lines define the two-plane pattern compared with the classic triplane pattern?', 'طبق PDF، کدام خطوط شکستگی الگوی دوصفحه‌ای را از الگوی کلاسیک سه‌صفحه‌ای متمایز می‌کنند؟')[lang],
    [
      L('Sagittal durch die Epiphyse und transversal durch die Physis; kein posteriores metaphysäres Fragment', 'Sagittal through the epiphysis and transverse through the physis; no posterior metaphyseal fragment', 'ساژیتال از اپی‌فیز و عرضی از فیزیس؛ بدون قطعهٔ متافیزی خلفی')[lang],
      L('Drei Ebenen: Epiphyse, Physis und posteriore Metaphyse', 'Three planes: epiphysis, physis, and posterior metaphysis', 'سه صفحه: اپی‌فیز، فیزیس و متافیز خلفی')[lang],
      L('Nur eine epiphysäre Frakturlinie ohne Physenbeteiligung', 'Only an epiphyseal fracture line without physeal involvement', 'فقط خط شکستگی اپی‌فیزی بدون درگیری فیزیس')[lang],
      L('Nur eine metaphysäre Frakturlinie ohne Gelenkbeteiligung', 'Only a metaphyseal fracture line without joint involvement', 'فقط خط شکستگی متافیزی بدون درگیری مفصل')[lang],
    ],
    0,
    L('Die PDF verwendet „Zwei-Ebenen-Muster“ für die sagittale epiphysäre und transversale physäre Linie. Das klassische Triplane-Muster umfasst zusätzlich die koronare posteriore Metaphyse; beschreibe die sichtbare Morphologie.', 'The PDF uses “two-plane pattern” for the sagittal epiphyseal and transverse physeal lines. The classic triplane pattern also includes the coronal posterior metaphysis; describe the visible morphology.', 'PDF اصطلاح «الگوی دوصفحه‌ای» را برای خط ساژیتال اپی‌فیزی و خط عرضی فیزیال به‌کار می‌برد. الگوی کلاسیک سه‌صفحه‌ای متافیز خلفی کرونال را نیز دربر می‌گیرد؛ مورفولوژی دیده‌شده را توصیف کنید.')[lang]
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
    L('Wie sollen auffällige Frakturmuster im Kinderschutz eingeordnet werden?',
      'How should concerning fracture patterns be interpreted in safeguarding assessment?',
      'الگوهای شکستگی نگران‌کننده در ارزیابی حمایت از کودک چگونه باید تفسیر شوند؟')[lang],
    [
      L('Distale Radiusfraktur nach Sturz auf die Hand', 'Distal radius fracture after fall on outstretched hand', 'شکستگی دیستال رادیوس بعد از افتادن روی دست')[lang],
      L('Klassische metaphysäre Läsion oder posteriore Rippenfraktur: im Gesamtkontext sorgfältig abklären', 'Classic metaphyseal lesion or posterior rib fracture: assess carefully in the full context', 'ضایعه متافیزی کلاسیک یا شکستگی دنده خلفی: با توجه به کل زمینه با دقت بررسی شود')[lang],
      L('Wulstfraktur des distalen Radius', 'Torus fracture of the distal radius', 'شکستگی توروس رادیوس دیستال')[lang],
      L('Klavikulafraktur nach Geburt', 'Clavicle fracture at birth', 'شکستگی کلاویکول هنگام تولد')[lang],
    ],
    1,
    L('Verletzungsmuster zusammen mit Alter, Entwicklungsstand, Anamnese und Gesamtbefund bewerten; der Frakturtyp allein beweist keine Misshandlung.', 'Assess injury patterns alongside age, developmental ability, history, and the overall findings; fracture type alone does not prove abuse.', 'الگوی آسیب را همراه با سن، توانایی رشدی، شرح‌حال و مجموعه یافته‌ها ارزیابی کنید؛ نوع شکستگی به‌تنهایی کودک‌آزاری را ثابت نمی‌کند.')[lang]
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
    L('Frakturlinie durch Physis + metaphysäres Fragment. Das Thurston-Holland-Zeichen ist ein dreieckiges metaphysäres Fragment; Typ II ist der häufigste Typ und der Verlauf meist günstig.', 'Fracture line through physis + metaphyseal fragment. The Thurston-Holland sign is a triangular metaphyseal fragment; type II is the most common type and the course is generally favourable.', 'خط شکستگی از فیزیس و قطعهٔ متافیزی می‌گذرد. نشانهٔ تورستون-هولاند قطعهٔ متافیزی مثلثی است؛ نوع II شایع‌ترین نوع است و سیر آن معمولاً مطلوب است.'),
    L('Thurston-Holland-Zeichen = Dreieck-Metaphysenfragment.', 'Thurston-Holland sign = triangular metaphyseal fragment.', 'نشانه تورستون-هولاند = قطعه متافیزی مثلثی.')
  ),

  F('fk-fc-sh3', L('Salter-Harris', 'Salter-Harris', 'سالتر-هریس'),
    L('Salter-Harris Typ III vs. IV: Was ist der Hauptunterschied?', 'Salter-Harris Type III vs. IV: What is the key difference?', 'سالتر-هریس نوع III در مقابل IV: تفاوت اصلی چیست؟'),
    L('Typ III: Physis + Epiphyse (intraartikulär). Typ IV: Physis + Epiphyse + Metaphyse. Beide reichen zur Gelenkfläche; Typ IV durchquert zusätzlich die Metaphyse.', 'Type III: physis + epiphysis (intra-articular). Type IV: physis + epiphysis + metaphysis. Both reach the joint surface; type IV also crosses the metaphysis.', 'نوع III: فیزیس + اپی‌فیز (داخل مفصل). نوع IV: فیزیس + اپی‌فیز + متافیز. هر دو به سطح مفصل می‌رسند؛ نوع IV علاوه بر آن از متافیز نیز عبور می‌کند.'),
    L('III = Lower (Epiphyse), IV = Through all three layers.', 'III = Lower (epiphysis), IV = Through all three layers.', 'III = پایین (اپی‌فیز)، IV = از طریق هر سه لایه.')
  ),

  F('fk-fc-sh5', L('Salter-Harris', 'Salter-Harris', 'سالتر-هریس'),
    L('Salter-Harris Typ V: Warum wird er oft erst im Verlauf erkannt?', 'Salter-Harris Type V: Why may it only be recognized on follow-up?', 'سالتر-هریس نوع V: چرا ممکن است در پیگیری تشخیص داده شود؟'),
    L('Typ V ist eine Kompressionsverletzung der Physis und kann initial subtil sein. Sie kann sich im Verlauf zeigen; eine spätere Physenverschmälerung oder Wachstumsstörung kann den Verdacht unterstützen, ist aber nicht Voraussetzung dafür, dass die Verletzung zunächst vermutet wird.', 'Type V is a compression injury of the physis and may be subtle initially. It may become apparent on follow-up; later physeal narrowing or growth disturbance can support suspicion, but is not required before the injury can first be suspected.', 'نوع V آسیب فشاری فیزیس است و ممکن است در ابتدا ظریف باشد. ممکن است در پیگیری آشکار شود؛ باریک‌شدن بعدی فیزیس یا اختلال رشد می‌تواند ظن را تقویت کند، اما برای مطرح‌شدن اولیهٔ آسیب الزامی نیست.'),
    L('SALTR-Eselsbrücke: R = Rammed (Kompressionsverletzung).', 'SALTR mnemonic: R = Rammed (compression injury).', 'یادآوری SALTR: R = کوبیده شده (آسیب فشاری).')
  ),

  F('fk-fc-wulst', L('Schaftsfrakturen', 'Shaft Fractures', 'شکستگی دیافیز'),
    L('Wie erkennst du eine Wulstfraktur (Torus) im Röntgen?', 'How do you recognize a Torus (buckle) fracture on radiographs?', 'شکستگی توروس در رادیوگرافی چگونه تشخیص داده می‌شود؟'),
    L('Kortikale Aufwerfung/Bulge ohne vollständige Kortikalisunterbrechung, häufig am metaphysär-diaphysären Übergang; in der seitlichen Projektion oft deutlicher. Der Mustername allein legt keine Behandlung fest.', 'Cortical buckling/bulge without complete cortical disruption, often at the metaphyseal–diaphyseal junction; often clearer on the lateral view. The pattern name alone does not determine treatment.', 'برجستگی/تاخوردگی کورتکس بدون قطع کامل، اغلب در محل اتصال متافیز و دیافیز؛ معمولاً در نمای لترال واضح‌تر است. نام الگو به‌تنهایی درمان را تعیین نمی‌کند.'),
    L('Torus = kortikale Aufwerfung ohne vollständigen Durchbruch.', 'Torus = cortical buckling without complete disruption.', 'توروس = برجستگی کورتکس بدون قطع کامل.')
  ),

  F('fk-fc-gruenholz', L('Schaftsfrakturen', 'Shaft Fractures', 'شکستگی دیافیز'),
    L('Was kennzeichnet die Grünholzfraktur?', 'What characterizes a Greenstick fracture?', 'ویژگی شکستگی گرین‌استیک چیست؟'),
    L('Biegefraktur: Eine Kortikalis ist unterbrochen, die Gegenseite bleibt gebogen; das Periost dort meist intakt. Stabilität hängt vom Einzelfall ab.', 'Bending fracture: one cortex is disrupted and the opposite side remains bent; the periosteum there is usually intact. Stability depends on the individual injury.', 'شکستگی خمشی: یک کورتکس قطع شده و سمت مقابل خمیده می‌ماند؛ پریوست آن سمت معمولاً سالم است. پایداری به خود آسیب بستگی دارد.'),
    L('Grünholz = wie grünes Holz: außen intakt, innen gebrochen.', 'Greenstick = like a green stick: outside intact, inside broken.', 'گرین‌استیک = مثل چوب سبز: بیرون سالم، داخل شکسته.')
  ),

  F('fk-fc-toddler', L('Toddler-Fraktur', 'Toddler Fracture', 'شکستگی توددلر'),
    L('Toddler-Fraktur: typisches Alter, Klinik, Diagnostik?', 'Toddler fracture: typical age, presentation, diagnosis?', 'شکستگی توددلر: سن معمول، تظاهرات بالینی، تشخیص؟'),
    L('Typischerweise schräge/spiralige, nicht dislozierte Fraktur des distalen Tibiaschafts bei einem Laufkind; Röntgen kann anfangs unauffällig sein. Schrägaufnahme oder Verlaufskontrolle nach etwa 1–2 Wochen kann periostale Reaktion sichtbar machen.', 'Typically a nondisplaced oblique/spiral distal tibial shaft fracture in a walking toddler; initial radiographs may be unremarkable. An oblique view or follow-up at about 1–2 weeks may show periosteal reaction.', 'معمولاً شکستگی مایل/مارپیچی بدون جابه‌جایی در تنهٔ دیستال تیبیا در کودک نوپای راه‌رونده است؛ رادیوگرافی اولیه ممکن است طبیعی باشد. نمای مایل یا پیگیری حدود ۱ تا ۲ هفته بعد ممکن است واکنش پریوست را نشان دهد.'),
    L('Immer an Toddler-Fraktur denken bei Kleinkind mit Hinken ohne klares Trauma!', 'Always think of Toddler fracture in a toddler with limp and no clear trauma!', 'همیشه به شکستگی توددلر فکر کنید در کودک نوپا با لنگ و بدون ضربه مشخص!')
  ),

  F('fk-fc-tillaux', L('Übergangsfrakturen', 'Transitional Fractures', 'شکستگی‌های گذار'),
    L('Tillaux-Fraktur: Mechanismus, Alter, Lokalisation?', 'Tillaux fracture: mechanism, age, location?', 'شکستگی تیلو: مکانیسم، سن، محل؟'),
    L('Außenrotationstrauma → Abriss des anterolateralen Epiphysenfragments der distalen Tibia durch vorderes Syndesmosenband. Alter: 12–14 J. Die anterolaterale Physis ist als letzte noch offen (Salter-Harris III). Im Röntgen-AP sichtbar; lateral oft unauffällig.', 'External rotation injury → avulsion of anterolateral epiphyseal fragment of distal tibia by anterior inferior tibiofibular ligament. Age: 12–14 yr. The anterolateral physis is the last to remain open (Salter-Harris III). Visible on AP X-ray; lateral often unremarkable.', 'آسیب چرخش خارجی → پارگی قطعه اپی‌فیزی قدامی-جانبی تیبیای دیستال توسط رباط سیندزموز قدامی-تحتانی. سن: ۱۲–۱۴ سال. فیزیس قدامی-جانبی آخرین باز است (سالتر-هریس III). در رادیوگرافی AP قابل مشاهده؛ نمای جانبی اغلب طبیعی.'),
    L('Tipp: Lateral unauffällig bei Tillaux – immer AP beachten!', 'Tip: Lateral unremarkable in Tillaux – always check AP!', 'نکته: نمای جانبی در تیلو طبیعی است – همیشه AP را بررسی کنید!')
  ),

  F('fk-fc-triplane', L('Übergangsfrakturen', 'Transitional Fractures', 'شکستگی‌های گذار'),
    L('Triplane-Fraktur: Welche 3 Ebenen sind betroffen? Wann kann CT zusätzliche Information liefern?', 'Triplane fracture: Which 3 planes are involved? When can CT add useful information?', 'شکستگی سه‌صفحه‌ای: کدام ۳ صفحه درگیر هستند؟ CT چه زمانی اطلاعات مفیدی اضافه می‌کند؟'),
    L('Sagittal durch die Epiphyse, transversal durch die Physis, koronal durch die posteriore Metaphyse. CT kann ergänzen, wenn die Röntgenbilder die räumliche Konfiguration nicht ausreichend darstellen.', 'Sagittal through the epiphysis, transverse through the physis, and coronal through the posterior metaphysis. CT can add information when radiographs do not adequately show the spatial configuration.', 'ساژیتال از اپی‌فیز، عرضی از فیزیس و کرونال از متافیز خلفی می‌گذرد. اگر رادیوگرافی آرایش فضایی را کافی نشان ندهد، CT می‌تواند اطلاعات تکمیلی بدهد.'),
    L('3 Ebenen: SAK – Sagittal-Axial-Koronal.', '3 planes: SAC – Sagittal-Axial-Coronal.', '۳ صفحه: ساژیتال-محوری-کرونال.')
  ),

  F('fk-fc-two-plane', L('Übergangsfrakturen', 'Transitional Fractures', 'شکستگی‌های گذار'),
    L('Wie unterscheidet das PDF das Zwei-Ebenen-Muster vom klassischen Triplane-Muster?', 'How does the PDF distinguish the two-plane pattern from the classic triplane pattern?', 'PDF الگوی دوصفحه‌ای را چگونه از الگوی کلاسیک سه‌صفحه‌ای متمایز می‌کند؟'),
    L('Sagittale Frakturlinie durch die Epiphyse und transversale Linie durch die Physis; kein posteriores metaphysäres Fragment. Die sichtbare Morphologie beschreiben.', 'A sagittal fracture line through the epiphysis and a transverse line through the physis; no posterior metaphyseal fragment. Describe the visible morphology.', 'خط شکستگی ساژیتال از اپی‌فیز و خط عرضی از فیزیس می‌گذرد؛ قطعهٔ متافیزی خلفی وجود ندارد. مورفولوژی قابل مشاهده را توصیف کنید.'),
    L('Zwei Ebenen: Epiphyse + Physis; das klassische Triplane schließt zusätzlich die posteriore Metaphyse ein.', 'Two planes: epiphysis + physis; classic triplane also includes the posterior metaphysis.', 'دو صفحه: اپی‌فیز + فیزیس؛ سه‌صفحه‌ای کلاسیک متافیز خلفی را نیز دربر می‌گیرد.')
  ),

  F('fk-fc-periost', L('Grundlagen', 'Basics', 'مبانی'),
    L('Warum hat der kindliche Periostmantel protektive Funktion bei Frakturen?', 'Why does the paediatric periosteal sleeve have a protective function in fractures?', 'چرا پوشش پریوست کودکانه نقش محافظتی در شکستگی‌ها دارد؟'),
    L('Dicker, gefäßreicher Periostmantel: 1) verhindert vollständige Dislokation (wirkt wie Scharnier), 2) liefert Osteoprogenitorzellen für schnelle Kallusbildung, 3) bewirkt rasche Heilung.', 'Thick, vascular periosteal sleeve: 1) helps prevent complete displacement of the fracture fragments (acts as a hinge), 2) supplies osteoprogenitor cells for rapid callus formation, 3) results in rapid healing.', 'پوشش پریوست ضخیم و عروقی: ۱) به جلوگیری از جابه‌جایی کامل قطعات شکستگی کمک می‌کند (مثل لولا عمل می‌کند)، ۲) سلول‌های استئوپروژنیتور برای تشکیل سریع کالوس تأمین می‌کند، ۳) ترمیم سریع را موجب می‌شود.'),
    L('Periost bei Kindern = protektiver, regenerativer Mantel.', 'Periosteum in children = protective, regenerative sleeve.', 'پریوست در کودکان = پوشش محافظ و بازسازنده.')
  ),

  F('fk-fc-remodel', L('Grundlagen', 'Basics', 'مبانی'),
    L('Was remodelliert sich bei Kinderfrakturen, was nicht?', 'What remodels and what does NOT in paediatric fractures?', 'در شکستگی‌های کودکان چه چیزی بازسازی می‌شود و چه چیزی نه؟'),
    L('Korrektur durch Remodellierung hängt unter anderem von Alter, Knochen, Frakturort und Deformitätsebene ab. Rotationsfehlstellungen korrigieren sich in der Regel nicht zuverlässig.', 'Remodelling depends on factors including age, bone, fracture location, and plane of deformity. Rotational malalignment generally does not correct reliably.', 'اصلاح با بازسازی استخوان به عواملی مانند سن، استخوان، محل شکستگی و صفحه ناهنجاری بستگی دارد. ناهنجاری چرخشی معمولاً به‌طور قابل اتکا اصلاح نمی‌شود.'),
    L('Rotation remodelliert NICHT – Achse ja, Rotation nein!', 'Rotation does NOT remodel – axis yes, rotation no!', 'چرخش بازسازی نمی‌شود – محور بله، چرخش نه!')
  ),

  F('fk-fc-physis-anat', L('Grundlagen', 'Basics', 'مبانی'),
    L('Was ist die Physis und welche Rolle spielt sie bei kindlichen Frakturen?', 'What is the physis and what role does it play in paediatric fractures?', 'فیزیس چیست و چه نقشی در شکستگی‌های کودکان دارد؟'),
    L('Die Physis ist die knorpelige Wachstumszone zwischen Epiphyse und Metaphyse und damit eine charakteristische Verletzungslokalisation im wachsenden Skelett.', 'The physis is the cartilaginous growth zone between epiphysis and metaphysis and therefore a characteristic injury site in the growing skeleton.', 'فیزیس ناحیه غضروفی رشد بین اپی‌فیز و متافیز است و بنابراین محل شاخص آسیب در اسکلت در حال رشد محسوب می‌شود.'),
    L('Physis = Wachstumszone zwischen Meta- und Epiphyse.', 'Physis = growth zone between metaphysis and epiphysis.', 'فیزیس = ناحیه رشد بین متافیز و اپی‌فیز.')
  ),

  F('fk-fc-nai', L('Grundlagen', 'Basics', 'مبانی'),
    L('Wie werden auffällige Verletzungsmuster bewertet?', 'How are concerning injury patterns assessed?', 'الگوهای آسیب نگران‌کننده چگونه ارزیابی می‌شوند؟'),
    L('Im Kontext von Alter, Entwicklungsstand, Anamnese und Gesamtbefund; kein einzelner Frakturtyp beweist für sich Misshandlung.', 'In context of age, developmental ability, history, and overall findings; no single fracture type alone proves abuse.', 'در زمینه سن، توانایی رشدی، شرح‌حال و مجموعه یافته‌ها؛ هیچ نوع شکستگی به‌تنهایی کودک‌آزاری را ثابت نمی‌کند.')
  ),

  F('fk-fc-uebergang-ct', L('Übergangsfrakturen', 'Transitional Fractures', 'شکستگی‌های گذار'),
    L('Wann ist CT bei Kinderfrakturen indiziert?', 'When is CT indicated in paediatric fractures?', 'CT در کودکان چه زمانی در شکستگی‌ها اندیکاسیون دارد؟'),
    L('1) Bei Tillaux-/Triplane-Frakturen CT häufig ergänzend erwägen, wenn Röntgen Frakturausdehnung oder Gelenkdislokation nicht sicher zeigt. 2) Komplexe Gelenkfrakturen. 3) Operative Planung. 4) Bei Verdacht auf Kindesmisshandlung geeignete Bildgebung nach lokalem Protokoll.', '1) Often consider adding CT for Tillaux/triplane fractures when radiographs do not clearly show fracture extent or articular displacement. 2) Complex articular fractures. 3) Surgical planning. 4) For suspected non-accidental injury, use imaging appropriate to local protocol.', '۱) در شکستگی تیلو/سه‌صفحه‌ای اگر رادیوگرافی گستره شکستگی یا جابجایی مفصلی را روشن نکند، افزودن CT را در نظر بگیرید. ۲) شکستگی‌های پیچیده مفصلی. ۳) برنامه‌ریزی جراحی. ۴) در ظن به کودک‌آزاری، تصویربرداری مطابق پروتکل محلی.'),
    L('Tillaux/Triplane: CT kann die räumliche Fragment- und Gelenkbeurteilung ergänzen, wenn die Röntgenbilder dafür nicht ausreichen.', 'Tillaux/triplane: CT can supplement spatial assessment of fragments and the joint when radiographs are insufficient.', 'در تیلو/سه‌صفحه‌ای، اگر رادیوگرافی کافی نباشد CT می‌تواند ارزیابی فضایی قطعات و مفصل را تکمیل کند.')
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
