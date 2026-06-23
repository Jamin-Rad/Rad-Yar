const L = (de, en, fa) => ({ de, en, fa })

export const RADIUSKOPF_LESSON = {
  id: 'radiuskoepfchenfraktur',
  title: L('Radiusköpfchenfraktur', 'Radial Head Fracture', 'شکستگی سر رادیوس'),
  definition: L(
    'Intraartikuläre Fraktur des Radiusköpfchens am Ellenbogen, klassifiziert nach Mason (I–IV), mit entscheidender Bedeutung für die Beurteilung der Gelenkkongruenz und assoziierter Ligamentverletzungen.',
    'Intra-articular fracture of the radial head at the elbow, classified by Mason (I–IV), with critical importance for assessing joint congruence and associated ligamentous injuries.',
    'شکستگی داخل مفصلی سر رادیوس در آرنج، طبق طبقه‌بندی ماسون (I–IV)، با اهمیت حیاتی برای ارزیابی تطابق مفصلی و آسیب‌های رباطی همراه.'
  ),
  breadcrumb: L('Radiusköpfchenfraktur', 'Radial Head Fracture', 'شکستگی سر رادیوس'),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key Point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Caution', 'هشدار'),
  toc: L('Inhalt', 'Contents', 'فهرست'),

  heroCards: [
    {
      value: L('~33 %', '~33 %', '~۳۳ %'),
      label: L('aller Ellenbogenfrakturen', 'of all elbow fractures', 'از تمام شکستگی‌های آرنج'),
      text: L('häufigste Ellenbogenfraktur des Erwachsenen', 'most common elbow fracture in adults', 'شایع‌ترین شکستگی آرنج در بزرگسالان'),
    },
    {
      value: L('Mason I–IV', 'Mason I–IV', 'ماسون I–IV'),
      label: L('Klassifikation', 'Classification', 'طبقه‌بندی'),
      text: L('Dislokation + Gelenkbeteiligung entscheidend', 'displacement + joint involvement decisive', 'جابجایی + درگیری مفصل تعیین‌کننده'),
    },
    {
      value: L('Fettkissen­zeichen', 'Fat pad sign', 'نشانه بالشتک چربی'),
      text: L('bei okkulter Fraktur', 'in occult fracture', 'در شکستگی پنهان'),
      label: L('Schlüsselzeichen', 'Key sign', 'نشانه کلیدی'),
    },
  ],

  sections: [
    { id: 'anatomie', icon: '🦴', label: L('Anatomie', 'Anatomy', 'آناتومی') },
    { id: 'bildgebung', icon: '🔬', label: L('Bildgebung', 'Imaging', 'تصویربرداری') },
    { id: 'mason', icon: '📊', label: L('Mason­klassifikation', 'Mason Classification', 'طبقه‌بندی ماسون'), emphasis: true },
    { id: 'therapie', icon: '💊', label: L('Therapie', 'Treatment', 'درمان') },
    { id: 'assoziiert', icon: '⚠️', label: L('Assoziierte Verletzungen', 'Associated Injuries', 'آسیب‌های همراه') },
    { id: 'takehome', icon: '✅', label: L('Take-home', 'Take-home', 'جمع‌بندی') },
  ],

  anatomie: {
    title: L('Anatomie & Mechanismus', 'Anatomy & Mechanism', 'آناتومی و مکانیسم'),
    lead: L(
      'Das Radiusköpfchen ist die wichtigste knöcherne Stabilisierungsstruktur des lateralen Ellenbogens und überträgt bis zu 60 % der axialen Last vom Unterarm auf den Humerus.',
      'The radial head is the most important bony stabiliser of the lateral elbow and transmits up to 60 % of the axial load from the forearm to the humerus.',
      'سر رادیوس مهم‌ترین تثبیت‌کننده استخوانی آرنج جانبی است و تا ۶۰٪ بار محوری از ساعد به هومروس را منتقل می‌کند.'
    ),
    items: [
      {
        icon: '⚡',
        title: L('Verletzungsmechanismus', 'Injury mechanism', 'مکانیسم آسیب'),
        text: L(
          'Sturz auf die ausgestreckte, pronierte Hand (FOOSH – Fall On OutStretched Hand). Axiale Kraftübertragung durch den Radius auf das Capitulum humeri → Radiusköpfchen wird gegen das Capitulum gepresst.',
          'Fall on outstretched, pronated hand (FOOSH). Axial force transmission through the radius onto the capitellum → radial head is compressed against the capitellum.',
          'افتادن روی دست کشیده و pronated (FOOSH). انتقال نیرو به صورت محوری از رادیوس به کاپیتولوم هومروس → سر رادیوس به کاپیتولوم فشرده می‌شود.'
        ),
      },
      {
        icon: '🔗',
        title: L('Funktion des Radiusköpfchens', 'Function of the radial head', 'عملکرد سر رادیوس'),
        text: L(
          'Lateraler Stabilisator gegen Valgusstress. Wichtiger Antagonist des medialen Kollateralbandes. Achsenstabilisierung des Unterarms (zusammen mit dem distalen Radioulnargelenk und der Membrana interossea).',
          'Lateral stabiliser against valgus stress. Important antagonist to the medial collateral ligament. Axial stabilisation of the forearm (together with the distal radioulnar joint and interosseous membrane).',
          'تثبیت‌کننده جانبی در برابر استرس والگوس. آنتاگونیست مهم رباط جانبی مدیال. پایداری محوری ساعد (همراه با مفصل رادیواولنار دیستال و غشای بین استخوانی).'
        ),
      },
      {
        icon: '🦾',
        title: L('N. interosseus posterior', 'Posterior interosseous nerve', 'عصب بین‌استخوانی خلفی'),
        text: L(
          'Der N. interosseus posterior (Ast des N. radialis) verläuft in direkter Nachbarschaft zum Radiusköpfchen. Verletzungs- und Operationsrisiko beachten – Verletzung → Extensionsparesen der Hand.',
          'The posterior interosseous nerve (branch of the radial nerve) runs in close proximity to the radial head. Consider injury and surgical risk – damage leads to wrist and finger extension paresis.',
          'عصب بین‌استخوانی خلفی (شاخه عصب رادیال) در مجاورت مستقیم سر رادیوس قرار دارد. خطر آسیب و جراحی را در نظر بگیرید – آسیب → فلج اکستانسوری مچ و انگشتان.'
        ),
      },
      {
        icon: '📐',
        title: L('Radiocapitellar Line', 'Radiocapitellar Line', 'خط رادیوکاپیتلار'),
        text: L(
          'Eine Linie durch die Längsachse des Radius muss in allen Projektionen und Flexionsgraden durch den Mittelpunkt des Capitulum humeri verlaufen. Abweichung → Radiusköpfchenluxation (Mason IV oder Monteggia).',
          'A line along the long axis of the radius must pass through the centre of the capitellum on all projections and at all degrees of flexion. Deviation → radial head dislocation (Mason IV or Monteggia).',
          'خطی در امتداد محور طولی رادیوس باید در تمام نماها و درجات خم شدن از مرکز کاپیتولوم هومروس عبور کند. انحراف → لوکساسیون سر رادیوس (ماسون IV یا مونتگیا).'
        ),
      },
    ],
  },

  bildgebung: {
    title: L('Radiologische Diagnostik', 'Radiological Diagnosis', 'تشخیص رادیولوژیک'),
    lead: L(
      'Konventionelles Röntgen in zwei Ebenen ist Standarddiagnostik. Das Fettkissenzeichen ist der wichtigste Hinweis auf eine okkulte Fraktur.',
      'Conventional X-ray in two planes is standard. The fat pad sign is the most important indicator of an occult fracture.',
      'رادیوگرافی معمولی در دو صفحه استاندارد است. نشانه بالشتک چربی مهم‌ترین اندیکاتور شکستگی پنهان است.'
    ),
    aufnahmen: {
      headers: [
        L('Aufnahme', 'View', 'نما'),
        L('Indikation / Information', 'Indication / Information', 'اندیکاسیون / اطلاعات'),
      ],
      rows: [
        [
          L('Ellenbogen lateral (90° Flexion)', 'Elbow lateral (90° flexion)', 'آرنج جانبی (۹۰ درجه خم)'),
          L('Wichtigste Aufnahme: Fettkissenzeichen, Dislokation, Gelenklinie sichtbar', 'Most important view: fat pad sign, displacement, joint line visible', 'مهم‌ترین نما: نشانه بالشتک چربی، جابجایی، خط مفصل قابل مشاهده'),
        ],
        [
          L('Ellenbogen AP (volle Extension)', 'Elbow AP (full extension)', 'آرنج AP (اکستانسیون کامل)'),
          L('Gelenkstufe, Fragmentanzahl, Radiusköpfchenkontur im Vergleich', 'Joint step, fragment count, radial head contour comparison', 'پله مفصلی، تعداد قطعات، مقایسه کانتور سر رادیوس'),
        ],
        [
          L('Radiusköpfchen-Spezialaufnahme (Greenspan)', 'Radial head view (Greenspan)', 'نمای ویژه سر رادیوس (گرین‌اسپن)'),
          L('Tangentiale Projektion; freie Darstellung des Radiusköpfchens ohne Überlagerung', 'Tangential projection; unobstructed view of radial head without overlap', 'نمای مماسی؛ تصویر آزاد سر رادیوس بدون اُورلپ'),
        ],
        [
          L('CT', 'CT', 'CT'),
          L('Bei unklarer Fragmentanzahl (Mason III vs. IV), präoperative OP-Planung, komplexe Luxationsfrakturen', 'For unclear fragment count (Mason III vs. IV), preoperative planning, complex fracture-dislocations', 'برای تعداد نامشخص قطعات (ماسون III در مقابل IV)، برنامه‌ریزی قبل از عمل، شکستگی‌های لوکساسیون پیچیده'),
        ],
      ],
    },
    fettkissen: {
      title: L('Fettkissenzeichen (Fat Pad Sign)', 'Fat Pad Sign', 'نشانه بالشتک چربی'),
      text: L(
        'Im Normalfall ist nur das anteriore Fettkissen als schmale radioluzente Linie sichtbar. Bei Gelenkerguss / Hämarthros werden beide Fettkissen nach außen verdrängt:',
        'Normally, only the anterior fat pad is visible as a thin radiolucent line. With joint effusion / haemarthrosis, both fat pads are displaced outward:',
        'در حالت طبیعی، فقط بالشتک چربی قدامی به صورت یک خط رادیولوسنت باریک قابل مشاهده است. با افیوژن مفصلی / همارتروس، هر دو بالشتک چربی به سمت بیرون رانده می‌شوند:'
      ),
      items: [
        {
          icon: '▲',
          title: L('Anteriores Fettkissen – Sail Sign', 'Anterior fat pad – Sail sign', 'بالشتک چربی قدامی – نشانه بادبان'),
          text: L('Eleviert und dreiecksförmig wie ein Segel – normal wenn sehr flach, pathologisch wenn eleviert.', 'Elevated and triangular like a sail – normal if very flat, pathological if elevated.', 'بالا رفته و مثلثی مثل بادبان – اگر بسیار صاف باشد طبیعی، اگر بالا آمده باشد پاتولوژیک است.'),
        },
        {
          icon: '▼',
          title: L('Posteriores Fettkissen – immer pathologisch', 'Posterior fat pad – always pathological', 'بالشتک چربی خلفی – همیشه پاتولوژیک'),
          text: L('Im Normal-Röntgen NICHT sichtbar. Jedes sichtbare posteriore Fettkissen = Gelenkerguss → Fraktur ausschließen, auch wenn knöcherner Befund unauffällig.', 'NOT visible on normal X-ray. Any visible posterior fat pad = joint effusion → exclude fracture, even if bony finding is unremarkable.', 'در رادیوگرافی طبیعی قابل مشاهده نیست. هر بالشتک چربی خلفی قابل مشاهده = افیوژن مفصلی → شکستگی را رد کنید، حتی اگر یافته استخوانی طبیعی باشد.'),
        },
      ],
    },
    rcLine: {
      title: L('Radiocapitellar Line (rID:41196)', 'Radiocapitellar Line (rID:41196)', 'خط رادیوکاپیتلار (rID:41196)'),
      radiopaediaUrl: 'https://radiopaedia.org/cases/41196/play',
      images: [
        {
          src: '/radiuskopf/radiocapitellar-line-rid41196.jpeg',
          caption: L('Radiocapitellar Line: Linie durch Radiusschaft-Mitte muss durch Capitulum-Mitte verlaufen – in jeder Projektion und jedem Flexionsgrad', 'Radiocapitellar line: line through the centre of the radial shaft must pass through the centre of the capitellum – in every projection and degree of flexion', 'خط رادیوکاپیتلار: خط از مرکز تنه رادیوس باید از مرکز کاپیتولوم عبور کند – در هر نما و هر درجه خم شدن'),
        },
      ],
    },
    masonIVCase: {
      title: L('Radiusköpfchenluxation – Mason IV', 'Radial head dislocation – Mason IV', 'لوکساسیون سر رادیوس – ماسون IV'),
      images: [
        {
          src: '/radiuskopf/mason-iv-luxation.jpeg',
          caption: L('Radiusköpfchenluxation: Radiocapitellar Line unterbrochen – Capitulum und Radius nicht mehr koaxial', 'Radial head dislocation: Radiocapitellar line disrupted – capitellum and radius no longer coaxial', 'لوکساسیون سر رادیوس: خط رادیوکاپیتلار قطع شده – کاپیتولوم و رادیوس دیگر هم‌محور نیستند'),
        },
      ],
    },
    cave: L(
      'Okkulte Frakturen (Mason I): Röntgen kann normal sein – nur das posteriore Fettkissenzeichen gibt den Hinweis. Bei klinischem Verdacht und isoliertem Fettkissenzeichen → Radiusköpfchenfraktur bis zum Beweis des Gegenteils.',
      'Occult fractures (Mason I): X-ray may appear normal – only the posterior fat pad sign gives the clue. With clinical suspicion and isolated fat pad sign → radial head fracture until proven otherwise.',
      'شکستگی‌های پنهان (ماسون I): رادیوگرافی ممکن است طبیعی به نظر برسد – فقط نشانه بالشتک چربی خلفی راهنما است. با ظن بالینی و نشانه بالشتک چربی به‌تنهایی → شکستگی سر رادیوس تا زمانی که خلاف آن ثابت نشود.'
    ),
  },

  mason: {
    title: L('Mason-Klassifikation', 'Mason Classification', 'طبقه‌بندی ماسون'),
    lead: L(
      'Die Mason-Klassifikation (modifiziert nach Johnston, Hotchkiss und Broberg) unterscheidet vier Typen nach Dislokation und Fragmentanzahl – die Grundlage für die Therapieentscheidung.',
      'The Mason classification (modified by Johnston, Hotchkiss and Broberg) distinguishes four types based on displacement and fragment count – the basis for treatment decisions.',
      'طبقه‌بندی ماسون (اصلاح‌شده توسط جانستون، هاچکیس و برابرگ) چهار نوع را بر اساس جابجایی و تعداد قطعات متمایز می‌کند – پایه تصمیم‌گیری درمانی.'
    ),
    schemaSrc: '/radiuskopf/mason-klassifikation-schema.png',
    schemaAlt: L('Mason-Klassifikation Typ I–IV – Schematische Darstellung', 'Mason Classification Types I–IV – Schematic diagram', 'طبقه‌بندی ماسون نوع I–IV – نمایش شماتیک'),
    headers: [
      L('Typ', 'Type', 'نوع'),
      L('Definition', 'Definition', 'تعریف'),
      L('Radiologisches Merkmal', 'Radiological feature', 'ویژگی رادیولوژیک'),
      L('Therapie', 'Treatment', 'درمان'),
    ],
    rows: [
      [
        L('I', 'I', 'I'),
        L('Nicht oder minimal dislozierte Fraktur', 'Non- or minimally displaced fracture', 'شکستگی بدون یا حداقل جابجایی'),
        L('Gelenkstufe < 2 mm; > 70 % der Gelenkfläche intakt', 'Joint step < 2 mm; > 70 % of articular surface intact', 'پله مفصلی < ۲ میلی‌متر؛ > ۷۰٪ سطح مفصلی سالم'),
        L('Konservativ: Gilchrist/Schlinge 1–2 Wo., frühe Mobilisation', 'Conservative: sling 1–2 weeks, early mobilisation', 'محافظه‌کارانه: اسلینگ ۱–۲ هفته، تحرک زودهنگام'),
      ],
      [
        L('II', 'II', 'II'),
        L('Dislozierte marginale Fraktur (Keilfraktur)', 'Displaced marginal fracture (wedge)', 'شکستگی حاشیه‌ای جابجا شده (گوه‌ای)'),
        L('Gelenkstufe > 2 mm ODER > 30 % der Gelenkfläche; Keilfragment; intra- oder extraartikulär', 'Joint step > 2 mm OR > 30 % of articular surface; wedge fragment; intra- or extra-articular', 'پله مفصلی > ۲ میلی‌متر یا > ۳۰٪ سطح مفصلی؛ قطعه گوه‌ای؛ داخل یا خارج مفصل'),
        L('Oft ORIF (Schraubenosteosynthese); selten konservativ wenn stabil', 'Often ORIF (screw fixation); rarely conservative if stable', 'اغلب ORIF (پیچ)؛ به ندرت محافظه‌کارانه اگر پایدار باشد'),
      ],
      [
        L('III', 'III', 'III'),
        L('Mehrfragmentäre / Trümmerfraktur', 'Multi-fragmentary / comminuted fracture', 'شکستگی چندقطعه‌ای / خرد شده'),
        L('≥ 3 Fragmente; gesamtes Radiusköpfchen zertrümmert; keine ORIF möglich', '≥ 3 fragments; entire radial head comminuted; ORIF not feasible', '≥ ۳ قطعه؛ تمام سر رادیوس خرد شده؛ ORIF ممکن نیست'),
        L('Radiusköpfchenprothese (Metallimplantat) oder Resektion (nur bei isolierter Fraktur ohne Instabilität)', 'Radial head arthroplasty (metal implant) or resection (only isolated fracture without instability)', 'پروتز سر رادیوس (ایمپلنت فلزی) یا رزکسیون (فقط شکستگی مجزا بدون ناپایداری)'),
      ],
      [
        L('IV', 'IV', 'IV'),
        L('Jede Radiusköpfchenfraktur + Ellenbogenluxation', 'Any radial head fracture + elbow dislocation', 'هر شکستگی سر رادیوس + لوکساسیون آرنج'),
        L('Radiocapitellar Line unterbrochen; Frakturtyp I–III kombiniert mit Dislokation', 'Radiocapitellar line disrupted; fracture type I–III combined with dislocation', 'خط رادیوکاپیتلار قطع شده؛ نوع شکستگی I–III همراه با جابجایی'),
        L('Zuerst Reposition der Luxation; dann Versorgung der Fraktur je nach Typ', 'First reduce the dislocation; then address the fracture according to type', 'ابتدا کاهش لوکساسیون؛ سپس درمان شکستگی بر اساس نوع'),
      ],
    ],
    key: L(
      'Entscheidungsgrenze Mason I vs. II: Gelenkstufe 2 mm und Gelenkflächenbeteiligung 30 %. Bei unklarem Befund: CT. Mason III immer operativ (Prothese), niemals isolierte Resektion bei Instabilität.',
      'Decision threshold Mason I vs. II: joint step 2 mm and articular surface involvement 30 %. If unclear: CT. Mason III always surgical (arthroplasty), never isolated resection if instability present.',
      'آستانه تصمیم ماسون I در مقابل II: پله مفصلی ۲ میلی‌متر و درگیری سطح مفصلی ۳۰٪. در صورت ابهام: CT. ماسون III همیشه جراحی (پروتز)، هرگز رزکسیون مجزا در صورت وجود ناپایداری.'
    ),
  },

  therapie: {
    title: L('Therapieübersicht', 'Treatment Overview', 'مرور درمان'),
    lead: L(
      'Die Therapie richtet sich nach Mason-Typ, Stabilität des Ellenbogengelenks und assoziierten Verletzungen.',
      'Treatment depends on Mason type, elbow joint stability, and associated injuries.',
      'درمان بستگی به نوع ماسون، پایداری مفصل آرنج و آسیب‌های همراه دارد.'
    ),
    items: [
      {
        icon: '🩹',
        title: L('Mason I – Konservativ', 'Mason I – Conservative', 'ماسون I – محافظه‌کارانه'),
        text: L(
          'Gilchrist-Schlinge oder Oberarmgips für 1–2 Wochen. Frühfunktionelle Mobilisation nach Schmerzrückgang (Ziel: keine Steifigkeit!). Vollbelastung und Arbeitsfähigkeit nach 4–6 Wochen.',
          'Gilchrist sling or above-elbow cast for 1–2 weeks. Early functional mobilisation once pain decreases (goal: avoid stiffness!). Full loading and return to work after 4–6 weeks.',
          'اسلینگ گیلکریست یا گچ بالای آرنج برای ۱–۲ هفته. تحرک عملکردی زودهنگام پس از کاهش درد (هدف: از سفتی جلوگیری کنید!). بار کامل و بازگشت به کار بعد از ۴–۶ هفته.'
        ),
      },
      {
        icon: '🔩',
        title: L('Mason II – ORIF', 'Mason II – ORIF', 'ماسون II – ORIF'),
        text: L(
          'Offene Reposition und interne Fixation (ORIF) mit Herbert-Schrauben oder Mini-Fragmente-Platten wenn: Gelenkstufe > 2 mm, > 30 % Gelenkfläche, Bewegungsblockierung. Ziel: anatomische Rekonstruktion.',
          'Open reduction and internal fixation (ORIF) with Herbert screws or mini-fragment plates when: joint step > 2 mm, > 30 % articular surface involved, motion block. Goal: anatomical reconstruction.',
          'کاهش باز و تثبیت داخلی (ORIF) با پیچ‌های هربرت یا صفحات قطعه‌کوچک در صورت: پله مفصلی > ۲ میلی‌متر، > ۳۰٪ سطح مفصلی، بلوک حرکتی. هدف: بازسازی آناتومیک.'
        ),
      },
      {
        icon: '🦾',
        title: L('Mason III – Prothese', 'Mason III – Arthroplasty', 'ماسون III – پروتز'),
        text: L(
          'Radiusköpfchenprothese (modulares Metallimplantat). ORIF nicht möglich bei Trümmerfraktur. Keine isolierte Resektion wenn Instabilität vorliegt (Essex-Lopresti, MCL-Ruptur) → Prothese.',
          'Radial head arthroplasty (modular metal implant). ORIF not possible in comminuted fracture. No isolated resection if instability present (Essex-Lopresti, MCL rupture) → arthroplasty.',
          'پروتز سر رادیوس (ایمپلنت فلزی مدولار). ORIF در شکستگی خرد شده ممکن نیست. رزکسیون مجزا در صورت ناپایداری ممنوع است (اسکس-لوپرستی، پارگی MCL) → پروتز.'
        ),
      },
      {
        icon: '🔄',
        title: L('Mason IV – Reposition zuerst', 'Mason IV – Reduction first', 'ماسون IV – ابتدا کاهش'),
        text: L(
          'Geschlossene Reposition der Ellenbogenluxation in Analgosedierung/Narkose → dann Stabilität prüfen → dann Frakturversorgung je nach Typ (I: konservativ, II: ORIF, III: Prothese).',
          'Closed reduction of elbow dislocation under anaesthesia/sedation → assess stability → then fracture treatment according to type (I: conservative, II: ORIF, III: arthroplasty).',
          'کاهش بسته لوکساسیون آرنج زیر بیهوشی/بی‌دردی → ارزیابی پایداری → سپس درمان شکستگی بر اساس نوع (I: محافظه‌کارانه، II: ORIF، III: پروتز).'
        ),
      },
    ],
    cave: L(
      'Ellenbogensteifigkeit ist die häufigste Komplikation! Jede unnötige Immobilisierung > 2 Wochen erhöht das Risiko drastisch. Frühfunktionelle Nachbehandlung ist entscheidend – besonders nach Mason I.',
      'Elbow stiffness is the most common complication! Any unnecessary immobilisation > 2 weeks dramatically increases the risk. Early functional rehabilitation is crucial – especially after Mason I.',
      'سفتی آرنج شایع‌ترین عارضه است! هر ایمبیلیزاسیون غیرضروری > ۲ هفته خطر را به شدت افزایش می‌دهد. توان‌بخشی عملکردی زودهنگام حیاتی است – به‌ویژه بعد از ماسون I.'
    ),
  },

  assoziiert: {
    title: L('Assoziierte Verletzungen', 'Associated Injuries', 'آسیب‌های همراه'),
    lead: L(
      'Radiusköpfchenfrakturen sind häufig Teil komplexer Verletzungsmuster. Immer systematisch nach begleitenden Verletzungen suchen.',
      'Radial head fractures are often part of complex injury patterns. Always systematically look for associated injuries.',
      'شکستگی‌های سر رادیوس اغلب بخشی از الگوهای آسیب پیچیده هستند. همیشه به طور سیستماتیک به دنبال آسیب‌های همراه باشید.'
    ),
    items: [
      {
        icon: '💥',
        title: L('Essex-Lopresti-Verletzung', 'Essex-Lopresti lesion', 'ضایعه اسکس-لوپرستی'),
        text: L(
          'Radiusköpfchenfraktur + Ruptur der Membrana interossea + Verletzung des distalen Radioulnargelenks (DRUG). Axiale Instabilität des Unterarms. Cave: DRUG-Instabilität klinisch prüfen (Ballottement-Test)!',
          'Radial head fracture + interosseous membrane rupture + distal radioulnar joint (DRUJ) injury. Axial forearm instability. Caution: test DRUJ instability clinically (ballottement test)!',
          'شکستگی سر رادیوس + پارگی غشای بین‌استخوانی + آسیب مفصل رادیواولنار دیستال (DRUJ). ناپایداری محوری ساعد. هشدار: ناپایداری DRUJ را بالینی آزمایش کنید (تست بالوتمنت)!'
        ),
      },
      {
        icon: '😱',
        title: L('Terrible Triad', 'Terrible Triad', 'سه‌گانه وحشتناک'),
        text: L(
          'Ellenbogenluxation + Radiusköpfchenfraktur + Proc.-coronoideus-Fraktur der Ulna. Hochinstabile Verletzung → chirurgische Versorgung aller drei Komponenten erforderlich. MRT zum Ligamentassessment.',
          'Elbow dislocation + radial head fracture + coronoid process fracture of the ulna. Highly unstable injury → surgical repair of all three components required. MRI for ligament assessment.',
          'لوکساسیون آرنج + شکستگی سر رادیوس + شکستگی زائده کرونوئید اولنا. آسیب بسیار ناپایدار → نیاز به ترمیم جراحی هر سه مؤلفه. MRI برای ارزیابی رباط.'
        ),
      },
      {
        icon: '🦴',
        title: L('Monteggia-Variante (Kinder)', 'Monteggia variant (children)', 'واریانت مونتگیا (کودکان)'),
        text: L(
          'Bei Kindern: Ulnafraktur + Radiusköpfchenluxation (klassische Monteggia-Fraktur). Radiocapitellar Line prüfen! Übersehene Luxation → Deformität. Bei Kindern häufiger als beim Erwachsenen.',
          'In children: ulna fracture + radial head dislocation (classic Monteggia fracture). Always check radiocapitellar line! Missed dislocation → deformity. More common in children than adults.',
          'در کودکان: شکستگی اولنا + لوکساسیون سر رادیوس (شکستگی مونتگیای کلاسیک). همیشه خط رادیوکاپیتلار را بررسی کنید! لوکساسیون از دست رفته → تغییر شکل. در کودکان شایع‌تر از بزرگسالان.'
        ),
      },
      {
        icon: '🔗',
        title: L('MCL-Ruptur (mediales Kollateralband)', 'MCL rupture (medial collateral ligament)', 'پارگی MCL (رباط جانبی مدیال)'),
        text: L(
          'Häufig bei Mason II–IV. Klinisch: Valgusstress-Instabilität. Wichtig für Therapieplanung: Mason-III-Resektion ohne MCL-Rekonstruktion → chronische Instabilität.',
          'Common with Mason II–IV. Clinically: valgus stress instability. Important for treatment: Mason III resection without MCL reconstruction → chronic instability.',
          'شایع در ماسون II–IV. بالینی: ناپایداری استرس والگوس. مهم برای درمان: رزکسیون ماسون III بدون بازسازی MCL → ناپایداری مزمن.'
        ),
      },
    ],
  },

  takehome: {
    title: L('Take-home Punkte', 'Take-home Points', 'نکات کلیدی'),
    lead: L('Die wichtigsten Merksätze auf einen Blick.', 'The most important points at a glance.', 'مهم‌ترین نکات در یک نگاه.'),
    items: [
      {
        title: L('Posteriores Fettkissen = Fraktur', 'Posterior fat pad = fracture', 'بالشتک چربی خلفی = شکستگی'),
        text: L('Im Seitenbild des Ellenbogens ist ein sichtbares posteriores Fettkissen immer pathologisch. Bei unauffälligem Röntgen + posteriorem Fettkissenzeichen → Mason-I-Fraktur behandeln.', 'A visible posterior fat pad on the lateral elbow view is always pathological. With normal X-ray + posterior fat pad sign → treat as Mason I fracture.', 'بالشتک چربی خلفی قابل مشاهده در نمای جانبی آرنج همیشه پاتولوژیک است. با رادیوگرافی طبیعی + نشانه بالشتک چربی خلفی → به عنوان ماسون I درمان کنید.'),
      },
      {
        title: L('Radiocapitellar Line prüfen', 'Check radiocapitellar line', 'خط رادیوکاپیتلار را بررسی کنید'),
        text: L('In jeder Ellenbogenaufnahme die Linie durch den Radius-Schaft auf das Capitulum prüfen. Abweichung = Luxation → Mason IV oder Monteggia.', 'On every elbow X-ray, check the line through the radial shaft to the capitellum. Deviation = dislocation → Mason IV or Monteggia.', 'در هر رادیوگرافی آرنج، خط از تنه رادیوس به کاپیتولوم را بررسی کنید. انحراف = لوکساسیون → ماسون IV یا مونتگیا.'),
      },
      {
        title: L('2 mm / 30 % – Grenze Mason I vs. II', '2 mm / 30 % – threshold Mason I vs. II', '۲ میلی‌متر / ۳۰٪ – آستانه ماسون I در مقابل II'),
        text: L('Gelenkstufe ≤ 2 mm und ≤ 30 % Gelenkfläche = Mason I (konservativ). Gelenkstufe > 2 mm oder > 30 % = Mason II (ORIF). Bei Unklarheit: CT.', 'Joint step ≤ 2 mm and ≤ 30 % articular surface = Mason I (conservative). Step > 2 mm or > 30 % = Mason II (ORIF). If unclear: CT.', 'پله مفصلی ≤ ۲ میلی‌متر و ≤ ۳۰٪ سطح مفصلی = ماسون I (محافظه‌کارانه). پله > ۲ میلی‌متر یا > ۳۰٪ = ماسون II (ORIF). در صورت ابهام: CT.'),
      },
      {
        title: L('Mason III → Prothese, nicht Resektion', 'Mason III → arthroplasty, not resection', 'ماسون III → پروتز، نه رزکسیون'),
        text: L('Bei Trümmerfraktur und vorhandener Instabilität (MCL-Ruptur, Essex-Lopresti) ist die isolierte Resektion kontraindiziert. Radiusköpfchenprothese als Platzhalter für axiale Stabilität.', 'In comminuted fracture with instability (MCL rupture, Essex-Lopresti), isolated resection is contraindicated. Radial head prosthesis as spacer for axial stability.', 'در شکستگی خرد شده با ناپایداری (پارگی MCL، اسکس-لوپرستی)، رزکسیون مجزا منع مصرف است. پروتز سر رادیوس به عنوان فاصله‌انداز برای پایداری محوری.'),
      },
      {
        title: L('Assoziierte Verletzungen ausschließen', 'Exclude associated injuries', 'آسیب‌های همراه را رد کنید'),
        text: L('Terrible Triad (Luxation + Radiusköpfchen + Coronoid), Essex-Lopresti (DRUG!), MCL-Ruptur. Immer DRUG klinisch prüfen und Coronoid im Röntgen/CT suchen.', 'Terrible Triad (dislocation + radial head + coronoid), Essex-Lopresti (DRUJ!), MCL rupture. Always clinically test DRUJ and look for coronoid on X-ray/CT.', 'سه‌گانه وحشتناک (لوکساسیون + سر رادیوس + کرونوئید)، اسکس-لوپرستی (DRUJ!)، پارگی MCL. همیشه DRUJ را بالینی آزمایش کنید و کرونوئید را روی رادیوگرافی/CT جستجو کنید.'),
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

export const RADIUSKOPF_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, [

  Q(`rk-mason-1-${lang}`,
    L('Welches Kriterium definiert die Grenze zwischen Mason Typ I und Typ II?',
      'Which criterion defines the threshold between Mason Type I and Type II?',
      'کدام معیار مرز بین ماسون نوع I و نوع II را تعریف می‌کند؟')[lang],
    [
      L('Gelenkstufe < 1 mm', 'Joint step < 1 mm', 'پله مفصلی < ۱ میلی‌متر')[lang],
      L('Gelenkstufe 2 mm und/oder > 30 % der Gelenkfläche betroffen', 'Joint step 2 mm and/or > 30 % of articular surface involved', 'پله مفصلی ۲ میلی‌متر و/یا > ۳۰٪ سطح مفصلی درگیر')[lang],
      L('Anzahl der Fragmente (≥ 2)', 'Number of fragments (≥ 2)', 'تعداد قطعات (≥ ۲)')[lang],
      L('Vorliegen einer Ellenbogenluxation', 'Presence of elbow dislocation', 'وجود لوکساسیون آرنج')[lang],
    ],
    1,
    L('Mason I: Gelenkstufe < 2 mm UND ≤ 30 % der Gelenkfläche → konservativ. Mason II: Gelenkstufe > 2 mm ODER > 30 % der Gelenkfläche → meist ORIF.', 'Mason I: joint step < 2 mm AND ≤ 30 % articular surface → conservative. Mason II: step > 2 mm OR > 30 % → usually ORIF.', 'ماسون I: پله مفصلی < ۲ میلی‌متر و ≤ ۳۰٪ سطح مفصلی → محافظه‌کارانه. ماسون II: پله > ۲ میلی‌متر یا > ۳۰٪ → معمولاً ORIF.')[lang]
  ),

  Q(`rk-mason-2-${lang}`,
    L('Was definiert Mason Typ IV?',
      'What defines Mason Type IV?',
      'ماسون نوع IV چه چیزی را تعریف می‌کند؟')[lang],
    [
      L('Trümmerfraktur des Radiusköpfchens', 'Comminuted fracture of the radial head', 'شکستگی خرد شده سر رادیوس')[lang],
      L('Jede Radiusköpfchenfraktur kombiniert mit einer Ellenbogenluxation', 'Any radial head fracture combined with an elbow dislocation', 'هر شکستگی سر رادیوس همراه با لوکساسیون آرنج')[lang],
      L('Dislozierte Fraktur > 2 mm', 'Displaced fracture > 2 mm', 'شکستگی جابجا شده > ۲ میلی‌متر')[lang],
      L('Fraktur mit Essex-Lopresti-Verletzung', 'Fracture with Essex-Lopresti lesion', 'شکستگی با ضایعه اسکس-لوپرستی')[lang],
    ],
    1,
    L('Mason IV = jede Radiusköpfchenfraktur (Typ I–III) in Kombination mit einer Ellenbogenluxation. Therapie: zuerst Reposition der Luxation, dann Frakturversorgung je nach Grundtyp.', 'Mason IV = any radial head fracture (Type I–III) combined with elbow dislocation. Treatment: first reduce dislocation, then address fracture according to underlying type.', 'ماسون IV = هر شکستگی سر رادیوس (نوع I–III) همراه با لوکساسیون آرنج. درمان: ابتدا کاهش لوکساسیون، سپس درمان شکستگی بر اساس نوع اصلی.')[lang]
  ),

  Q(`rk-fettkissen-1-${lang}`,
    L('Im Seitenbild des Ellenbogens zeigt sich ein posteriores Fettkissen bei normalem knöchernem Befund. Was bedeutet das?',
      'On the lateral elbow view, a posterior fat pad is visible with normal bony findings. What does this mean?',
      'در نمای جانبی آرنج، بالشتک چربی خلفی با یافته‌های استخوانی طبیعی قابل مشاهده است. این به چه معناست؟')[lang],
    [
      L('Normalbefund, keine weiteren Maßnahmen', 'Normal finding, no further action', 'یافته طبیعی، بدون اقدام بیشتر')[lang],
      L('Gelenkerguss → okkulte Fraktur möglich → Mason I bis zum Beweis des Gegenteils behandeln', 'Joint effusion → occult fracture possible → treat as Mason I until proven otherwise', 'افیوژن مفصلی → شکستگی پنهان ممکن → تا اثبات خلاف به عنوان ماسون I درمان کنید')[lang],
      L('Immer MRT indiziert', 'MRI always indicated', 'MRI همیشه اندیکاسیون دارد')[lang],
      L('Hinweis auf anteriore Gelenkkapselruptur', 'Indicates anterior joint capsule rupture', 'نشانه پارگی کپسول مفصلی قدامی')[lang],
    ],
    1,
    L('Das posteriore Fettkissen ist im Normalbild NICHT sichtbar. Jedes sichtbare posteriore Fettkissen = Gelenkerguss (Hämarthros bei Trauma). Bei normalem Röntgen + positivem Fettkissenzeichen → klinisch Mason-I-Fraktur annehmen und konservativ behandeln.', 'The posterior fat pad is NOT visible on a normal X-ray. Any visible posterior fat pad = joint effusion (haemarthrosis in trauma). With normal X-ray + positive fat pad sign → clinically assume Mason I and treat conservatively.', 'بالشتک چربی خلفی در رادیوگرافی طبیعی قابل مشاهده نیست. هر بالشتک چربی خلفی قابل مشاهده = افیوژن مفصلی (همارتروس در تروما). با رادیوگرافی طبیعی + نشانه بالشتک چربی مثبت → بالینی ماسون I را فرض کنید و محافظه‌کارانه درمان کنید.')[lang]
  ),

  Q(`rk-rcline-1-${lang}`,
    L('Was sagt die Radiocapitellar Line aus und wann ist sie pathologisch?',
      'What does the radiocapitellar line indicate and when is it pathological?',
      'خط رادیوکاپیتلار چه چیزی نشان می‌دهد و چه زمانی پاتولوژیک است؟')[lang],
    [
      L('Sie verläuft durch das Olekranon – pathologisch bei Abweichung > 5 mm', 'It passes through the olecranon – pathological if deviation > 5 mm', 'از اولکرانون عبور می‌کند – اگر انحراف > ۵ میلی‌متر پاتولوژیک است')[lang],
      L('Linie durch Radius-Schaft-Achse muss Capitulum-Mitte treffen – Abweichung = Radiusköpfchenluxation', 'Line through radial shaft axis must hit centre of capitellum – deviation = radial head dislocation', 'خط از محور تنه رادیوس باید مرکز کاپیتولوم را لمس کند – انحراف = لوکساسیون سر رادیوس')[lang],
      L('Sie gilt nur in der AP-Projektion', 'It only applies to the AP projection', 'فقط در نمای AP صدق می‌کند')[lang],
      L('Pathologisch wenn Winkel < 45°', 'Pathological when angle < 45°', 'اگر زاویه < ۴۵ درجه باشد پاتولوژیک است')[lang],
    ],
    1,
    L('Die Radiocapitellar Line wird durch die Längsachse des Radius gezogen. Sie muss in jeder Projektion (lateral, AP, axial) und jedem Flexionsgrad den Mittelpunkt des Capitulum humeri treffen. Abweichung → Luxation (Mason IV oder Monteggia).', 'The radiocapitellar line is drawn along the long axis of the radius. It must pass through the centre of the capitellum in every projection (lateral, AP, axial) and at all degrees of flexion. Deviation → dislocation (Mason IV or Monteggia).', 'خط رادیوکاپیتلار در امتداد محور طولی رادیوس کشیده می‌شود. باید در هر نما (جانبی، AP، محوری) و هر درجه خم شدن از مرکز کاپیتولوم هومروس عبور کند. انحراف → لوکساسیون (ماسون IV یا مونتگیا).')[lang]
  ),

  Q(`rk-therapie-1-${lang}`,
    L('Warum ist bei Mason III eine Radiusköpfchenresektion ohne Prothese bei Instabilität kontraindiziert?',
      'Why is radial head resection without prosthesis contraindicated in Mason III with instability?',
      'چرا رزکسیون سر رادیوس بدون پروتز در ماسون III با ناپایداری منع مصرف است؟')[lang],
    [
      L('Weil die Prothese billiger ist', 'Because the prosthesis is cheaper', 'چون پروتز ارزان‌تر است')[lang],
      L('Weil das Radiusköpfchen als axialer Stabilisator des Unterarms wirkt – Resektion → Cubitus valgus + proximale Radiusmigration', 'Because the radial head acts as an axial forearm stabiliser – resection → cubitus valgus + proximal radial migration', 'چون سر رادیوس به عنوان تثبیت‌کننده محوری ساعد عمل می‌کند – رزکسیون → کوبیتوس والگوس + مهاجرت پروگزیمال رادیوس')[lang],
      L('Wegen Infektionsgefahr', 'Due to infection risk', 'به دلیل خطر عفونت')[lang],
      L('Weil der N. interosseus posterior verletzt werden kann', 'Because the posterior interosseous nerve may be injured', 'چون عصب بین‌استخوانی خلفی ممکن است آسیب ببیند')[lang],
    ],
    1,
    L('Das Radiusköpfchen überträgt 60 % der axialen Last und ist wichtiger Antagonist des medialen Kollateralbandes. Bei Instabilität (MCL-Ruptur, Essex-Lopresti) ohne Prothese → chronische Valgusinstabilität, proximale Radiusmigration, DRUG-Instabilität.', 'The radial head transmits 60 % of the axial load and is a key antagonist of the medial collateral ligament. With instability (MCL rupture, Essex-Lopresti) without prosthesis → chronic valgus instability, proximal radial migration, DRUJ instability.', 'سر رادیوس ۶۰٪ بار محوری را منتقل می‌کند و آنتاگونیست مهم رباط جانبی مدیال است. با ناپایداری (پارگی MCL، اسکس-لوپرستی) بدون پروتز → ناپایداری والگوس مزمن، مهاجرت پروگزیمال رادیوس، ناپایداری DRUJ.')[lang]
  ),

  Q(`rk-terrible-triad-1-${lang}`,
    L('Welche drei Strukturen sind bei der "Terrible Triad" des Ellenbogens verletzt?',
      'Which three structures are injured in the "Terrible Triad" of the elbow?',
      'کدام سه ساختار در "سه‌گانه وحشتناک" آرنج آسیب می‌بینند؟')[lang],
    [
      L('Radiusköpfchen + Ulnafraktur + MCL', 'Radial head + ulna fracture + MCL', 'سر رادیوس + شکستگی اولنا + MCL')[lang],
      L('Ellenbogenluxation + Radiusköpfchenfraktur + Coronoidfraktur der Ulna', 'Elbow dislocation + radial head fracture + coronoid process fracture', 'لوکساسیون آرنج + شکستگی سر رادیوس + شکستگی زائده کرونوئید اولنا')[lang],
      L('Radiusköpfchen + MCL + LCL', 'Radial head + MCL + LCL', 'سر رادیوس + MCL + LCL')[lang],
      L('Dislocated olecranon + radial head + humerus', 'Dislocated olecranon + radial head + humerus', 'اولکرانون جابجا شده + سر رادیوس + هومروس')[lang],
    ],
    1,
    L('Terrible Triad: 1) Ellenbogenluxation (posteriore), 2) Radiusköpfchenfraktur, 3) Coronoidfraktur der Ulna. Hochinstabiles Muster → alle drei Strukturen müssen chirurgisch versorgt werden. MRT für Bandbeurteilung.', 'Terrible Triad: 1) Elbow dislocation (posterior), 2) radial head fracture, 3) coronoid process fracture of the ulna. Highly unstable pattern → all three structures must be surgically addressed. MRI for ligament assessment.', 'سه‌گانه وحشتناک: ۱) لوکساسیون آرنج (خلفی)، ۲) شکستگی سر رادیوس، ۳) شکستگی زائده کرونوئید اولنا. الگوی بسیار ناپایدار → هر سه ساختار باید جراحی شوند. MRI برای ارزیابی رباط.')[lang]
  ),

  Q(`rk-essex-1-${lang}`,
    L('Was ist das charakteristische Merkmal der Essex-Lopresti-Verletzung?',
      'What is the characteristic feature of an Essex-Lopresti lesion?',
      'مشخصه ضایعه اسکس-لوپرستی چیست؟')[lang],
    [
      L('Radiusköpfchenfraktur + Monteggia-Fraktur', 'Radial head fracture + Monteggia fracture', 'شکستگی سر رادیوس + شکستگی مونتگیا')[lang],
      L('Radiusköpfchenfraktur + Ruptur der Membrana interossea + DRUG-Verletzung', 'Radial head fracture + interosseous membrane rupture + DRUJ injury', 'شکستگی سر رادیوس + پارگی غشای بین‌استخوانی + آسیب DRUJ')[lang],
      L('Trümmerfraktur + MCL-Ruptur', 'Comminuted fracture + MCL rupture', 'شکستگی خرد شده + پارگی MCL')[lang],
      L('Radiusköpfchenfraktur + Koronodfraktur', 'Radial head fracture + coronoid fracture', 'شکستگی سر رادیوس + شکستگی کرونوئید')[lang],
    ],
    1,
    L('Essex-Lopresti = Radiusköpfchenfraktur + Ruptur der Membrana interossea des Unterarms + Verletzung des distalen Radioulnargelenks (DRUG). Führt zu axialer Instabilität des Unterarms. Isolierte Resektion des Radiusköpfchens kontraindiziert → Prothese!', 'Essex-Lopresti = radial head fracture + interosseous membrane rupture + distal radioulnar joint (DRUJ) injury. Results in axial forearm instability. Isolated radial head resection contraindicated → prosthesis!', 'اسکس-لوپرستی = شکستگی سر رادیوس + پارگی غشای بین‌استخوانی ساعد + آسیب مفصل رادیواولنار دیستال (DRUJ). منجر به ناپایداری محوری ساعد می‌شود. رزکسیون مجزای سر رادیوس منع مصرف → پروتز!')[lang]
  ),

  Q(`rk-mechanismus-1-${lang}`,
    L('Welcher Verletzungsmechanismus führt typischerweise zur Radiusköpfchenfraktur?',
      'Which injury mechanism typically leads to a radial head fracture?',
      'کدام مکانیسم آسیب معمولاً منجر به شکستگی سر رادیوس می‌شود؟')[lang],
    [
      L('Direkte Gewalt auf den Ellenbogen (Schlag)', 'Direct blow to the elbow', 'ضربه مستقیم به آرنج')[lang],
      L('FOOSH – Sturz auf ausgestreckte, pronierte Hand mit axialer Kraftübertragung durch den Radius', 'FOOSH – fall on outstretched pronated hand with axial force transmission through the radius', 'FOOSH – افتادن روی دست کشیده و pronated با انتقال نیروی محوری از رادیوس')[lang],
      L('Hyperextensionstrauma', 'Hyperextension injury', 'تروما هایپراکستانسیون')[lang],
      L('Rotationsgewalt am Unterarm', 'Rotational force on the forearm', 'نیروی چرخشی روی ساعد')[lang],
    ],
    1,
    L('FOOSH (Fall On OutStretched Hand): Sturz auf die ausgestreckte, pronierte Hand → axiale Kraft wird durch den Radius übertragen → Radiusköpfchen wird gegen das Capitulum humeri gepresst → Fraktur. Häufigster Mechanismus für alle Mason-Typen.', 'FOOSH (Fall On OutStretched Hand): fall on the outstretched pronated hand → axial force transmitted through the radius → radial head compressed against capitellum → fracture. Most common mechanism for all Mason types.', 'FOOSH (افتادن روی دست کشیده): افتادن روی دست کشیده و pronated → نیروی محوری از طریق رادیوس منتقل می‌شود → سر رادیوس به کاپیتولوم فشرده می‌شود → شکستگی. شایع‌ترین مکانیسم برای تمام انواع ماسون.')[lang]
  ),

  Q(`rk-nerv-1-${lang}`,
    L('Welche Struktur ist beim Radiusköpfchen operativ besonders gefährdet?',
      'Which structure is particularly at risk surgically near the radial head?',
      'کدام ساختار در حین جراحی سر رادیوس به‌ویژه در معرض خطر است؟')[lang],
    [
      L('N. medianus', 'Median nerve', 'عصب مدیان')[lang],
      L('N. ulnaris', 'Ulnar nerve', 'عصب اولنار')[lang],
      L('N. interosseus posterior (Ast des N. radialis)', 'Posterior interosseous nerve (branch of radial nerve)', 'عصب بین‌استخوانی خلفی (شاخه عصب رادیال)')[lang],
      L('A. radialis', 'Radial artery', 'شریان رادیال')[lang],
    ],
    2,
    L('Der N. interosseus posterior (tiefer Ast des N. radialis) verläuft in unmittelbarer Nähe zum Radiusköpfchen. Verletzung → Extensionsparese der Finger und Handgelenk (keine Sensibilitätsstörung da rein motorisch). Besonders bei dorsalem Zugang gefährdet.', 'The posterior interosseous nerve (deep branch of the radial nerve) runs in direct proximity to the radial head. Injury → extension paresis of fingers and wrist (no sensory loss as it is purely motor). Especially at risk with a posterior approach.', 'عصب بین‌استخوانی خلفی (شاخه عمیق عصب رادیال) در مجاورت مستقیم سر رادیوس قرار دارد. آسیب → فلج اکستانسوری انگشتان و مچ (بدون اختلال حسی چون کاملاً حرکتی است). به‌ویژه در رویکرد خلفی در معرض خطر است.')[lang]
  ),

  Q(`rk-mason-therapie-2-${lang}`,
    L('Ein 35-jähriger Patient hat nach FOOSH-Trauma eine Mason-II-Fraktur (Gelenkstufe 3 mm, 40 % Gelenkfläche). Welche Therapie ist indiziert?',
      'A 35-year-old patient has a Mason II fracture after FOOSH trauma (joint step 3 mm, 40 % articular surface). What treatment is indicated?',
      'یک بیمار ۳۵ ساله پس از تروما FOOSH یک شکستگی ماسون II دارد (پله مفصلی ۳ میلی‌متر، ۴۰٪ سطح مفصلی). کدام درمان اندیکاسیون دارد؟')[lang],
    [
      L('Konservativ mit Schlinge für 6 Wochen', 'Conservative with sling for 6 weeks', 'محافظه‌کارانه با اسلینگ برای ۶ هفته')[lang],
      L('ORIF (offene Reposition und interne Fixation) mit Schrauben', 'ORIF (open reduction and internal fixation) with screws', 'ORIF (کاهش باز و تثبیت داخلی) با پیچ')[lang],
      L('Radiusköpfchenprothese', 'Radial head arthroplasty', 'پروتز سر رادیوس')[lang],
      L('Primäre Radiusköpfchenresektion', 'Primary radial head resection', 'رزکسیون اولیه سر رادیوس')[lang],
    ],
    1,
    L('Mason II mit Gelenkstufe > 2 mm und > 30 % Gelenkfläche → ORIF indiziert. Ziel: anatomische Rekonstruktion mit Herbert-Schrauben oder Mini-Platten. Bei isolierter Mason-II-Fraktur ohne Instabilität und guter Knochenqualität: ORIF bevorzugt.', 'Mason II with joint step > 2 mm and > 30 % articular surface → ORIF indicated. Goal: anatomical reconstruction with Herbert screws or mini-plates. In isolated Mason II without instability and good bone quality: ORIF preferred.', 'ماسون II با پله مفصلی > ۲ میلی‌متر و > ۳۰٪ سطح مفصلی → ORIF اندیکاسیون دارد. هدف: بازسازی آناتومیک با پیچ‌های هربرت یا صفحات کوچک. در ماسون II مجزا بدون ناپایداری و کیفیت استخوان خوب: ORIF ترجیح داده می‌شود.')[lang]
  ),

  Q(`rk-komplikation-1-${lang}`,
    L('Was ist die häufigste Komplikation nach konservativ behandelter Radiusköpfchenfraktur?',
      'What is the most common complication after conservatively treated radial head fracture?',
      'شایع‌ترین عارضه پس از شکستگی سر رادیوس با درمان محافظه‌کارانه چیست؟')[lang],
    [
      L('Infektion', 'Infection', 'عفونت')[lang],
      L('Ellenbogensteifigkeit (Bewegungseinschränkung)', 'Elbow stiffness (restricted motion)', 'سفتی آرنج (محدودیت حرکتی)')[lang],
      L('Avaskuläre Nekrose', 'Avascular necrosis', 'نکروز آواسکولار')[lang],
      L('Lähmung des N. radialis', 'Radial nerve palsy', 'فلج عصب رادیال')[lang],
    ],
    1,
    L('Ellenbogensteifigkeit ist die häufigste Komplikation. Prolongierte Immobilisation > 2 Wochen fördert sie massiv. Deshalb: frühfunktionelle Mobilisation sobald tolerierbar (nach 1–2 Wochen). Physiotherapie essenziell.', 'Elbow stiffness is the most common complication. Prolonged immobilisation > 2 weeks greatly increases risk. Therefore: early functional mobilisation as soon as tolerable (after 1–2 weeks). Physiotherapy is essential.', 'سفتی آرنج شایع‌ترین عارضه است. ایمبیلیزاسیون طولانی > ۲ هفته خطر را به شدت افزایش می‌دهد. بنابراین: تحرک عملکردی زودهنگام به محض تحمل (بعد از ۱–۲ هفته). فیزیوتراپی ضروری است.')[lang]
  ),

  Q(`rk-kinder-1-${lang}`,
    L('Was muss beim Ellenbogenröntgen eines Kindes mit Unterarmfraktur besonders beachtet werden?',
      'What must be specifically checked on an elbow X-ray of a child with a forearm fracture?',
      'در رادیوگرافی آرنج کودک با شکستگی ساعد چه چیزی باید به‌ویژه بررسی شود؟')[lang],
    [
      L('Das Olekranon auf Avulsionsfraktur', 'The olecranon for avulsion fracture', 'اولکرانون از نظر شکستگی آوولسیون')[lang],
      L('Die Radiocapitellar Line auf Radiusköpfchenluxation (Monteggia!)', 'The radiocapitellar line for radial head dislocation (Monteggia!)', 'خط رادیوکاپیتلار برای لوکساسیون سر رادیوس (مونتگیا!)')[lang],
      L('Das Processus styloideus ulnae', 'The styloid process of the ulna', 'زائده استیلوئید اولنا')[lang],
      L('Den Humeruschaft auf Grünholzfraktur', 'The humeral shaft for greenstick fracture', 'تنه هومروس برای شکستگی گرین‌استیک')[lang],
    ],
    1,
    L('Monteggia-Fraktur bei Kindern: Ulnafraktur + Radiusköpfchenluxation. Immer Radiocapitellar Line prüfen! Übersehene Luxation → chronische Deformität und Bewegungseinschränkung. Merke: Ulna gebrochen → Radius-Köpfchen anschauen!', 'Monteggia fracture in children: ulna fracture + radial head dislocation. Always check the radiocapitellar line! Missed dislocation → chronic deformity and restricted motion. Remember: broken ulna → look at the radial head!', 'شکستگی مونتگیا در کودکان: شکستگی اولنا + لوکساسیون سر رادیوس. همیشه خط رادیوکاپیتلار را بررسی کنید! لوکساسیون از دست رفته → تغییر شکل مزمن و محدودیت حرکتی. به یاد داشته باشید: اولنا شکسته → به سر رادیوس نگاه کنید!')[lang]
  ),

].map(q => ({ ...q, tags: ['radiuskoepfchenfraktur'] }))]))

export const RADIUSKOPF_FLASHCARDS = [

  F('rk-fc-1', L('Mason', 'Mason', 'ماسون'),
    L('Mason I vs. II: Grenzwerte?', 'Mason I vs. II: Threshold values?', 'ماسون I در مقابل II: مقادیر آستانه؟'),
    L('Mason I: Gelenkstufe < 2 mm UND ≤ 30 % Gelenkfläche → konservativ. Mason II: > 2 mm ODER > 30 % → ORIF. CT bei Unklarheit.', 'Mason I: step < 2 mm AND ≤ 30 % articular surface → conservative. Mason II: > 2 mm OR > 30 % → ORIF. CT if unclear.', 'ماسون I: پله < ۲ میلی‌متر و ≤ ۳۰٪ سطح مفصلی → محافظه‌کارانه. ماسون II: > ۲ میلی‌متر یا > ۳۰٪ → ORIF. CT در صورت ابهام.'),
    L('2 mm / 30 % ist die magische Grenze. Darunter konservativ, darüber ORIF.', '2 mm / 30 % is the magic threshold. Below conservative, above ORIF.', '۲ میلی‌متر / ۳۰٪ آستانه جادویی است. زیر آن محافظه‌کارانه، بالای آن ORIF.')
  ),

  F('rk-fc-2', L('Mason', 'Mason', 'ماسون'),
    L('Mason III – warum keine ORIF, warum Prothese?', 'Mason III – why no ORIF, why arthroplasty?', 'ماسون III – چرا نه ORIF، چرا پروتز؟'),
    L('Trümmerfraktur (≥ 3 Fragmente): ORIF technisch nicht möglich. Prothese gibt axiale Stabilität (Ersatz für MCL-Antagonist) und verhindert proximale Radiusmigration. Resektion nur wenn keine Instabilität.', 'Comminuted (≥ 3 fragments): ORIF technically not feasible. Prosthesis provides axial stability (replaces MCL antagonist) and prevents proximal radial migration. Resection only if no instability.', 'خرد شده (≥ ۳ قطعه): ORIF از نظر فنی ممکن نیست. پروتز پایداری محوری می‌دهد (جایگزین آنتاگونیست MCL) و از مهاجرت پروگزیمال رادیوس جلوگیری می‌کند. رزکسیون فقط اگر ناپایداری نباشد.'),
    L('III = Trümmer → Prothese. Resektion nur ohne Instabilität!', 'III = comminuted → prosthesis. Resection only without instability!', 'III = خرد → پروتز. رزکسیون فقط بدون ناپایداری!')
  ),

  F('rk-fc-3', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Fettkissenzeichen: anteriores vs. posteriores?', 'Fat pad sign: anterior vs. posterior?', 'نشانه بالشتک چربی: قدامی در مقابل خلفی؟'),
    L('Anterior: normal sichtbar als flache Linie, pathologisch wenn eleviert (Sail Sign). Posterior: im Normalbild NIE sichtbar – jedes sichtbare posteriore Fettkissen = Gelenkerguss → okkulte Fraktur!', 'Anterior: normally visible as a flat line, pathological when elevated (sail sign). Posterior: NEVER visible normally – any visible posterior fat pad = joint effusion → occult fracture!', 'قدامی: معمولاً به صورت خط صاف قابل مشاهده، پاتولوژیک اگر بالا باشد (نشانه بادبان). خلفی: در حالت طبیعی هرگز قابل مشاهده نیست – هر بالشتک چربی خلفی قابل مشاهده = افیوژن → شکستگی پنهان!'),
    L('Posteriores Fettkissen = immer pathologisch!', 'Posterior fat pad = always pathological!', 'بالشتک چربی خلفی = همیشه پاتولوژیک!')
  ),

  F('rk-fc-4', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Radiocapitellar Line: Norm und Pathologie?', 'Radiocapitellar Line: normal and pathological?', 'خط رادیوکاپیتلار: طبیعی و پاتولوژیک؟'),
    L('Linie durch Längsachse des Radius → muss Zentrum des Capitulum humeri treffen. Gilt in JEDER Projektion und JEDEM Flexionsgrad. Abweichung → Luxation (Mason IV, Monteggia). Immer aktiv prüfen!', 'Line through long axis of radius → must hit centre of capitellum. Applies in EVERY projection and EVERY degree of flexion. Deviation → dislocation (Mason IV, Monteggia). Always actively check!', 'خط از محور طولی رادیوس → باید مرکز کاپیتولوم را لمس کند. در هر نما و هر درجه خم شدن صدق می‌کند. انحراف → لوکساسیون (ماسون IV، مونتگیا). همیشه فعالانه بررسی کنید!'),
    L('Merke: Radiocapitellar Line verletzt → immer an Luxation denken!', 'Remember: disrupted radiocapitellar line → always think dislocation!', 'به یاد داشته باشید: خط رادیوکاپیتلار قطع شده → همیشه به لوکساسیون فکر کنید!')
  ),

  F('rk-fc-5', L('Assoziiert', 'Associated', 'همراه'),
    L('Essex-Lopresti: Was ist es und warum wichtig?', 'Essex-Lopresti: what is it and why important?', 'اسکس-لوپرستی: چیست و چرا مهم است؟'),
    L('Radiusköpfchenfraktur + Ruptur Membrana interossea + DRUG-Verletzung. → Axiale Unterarminstabilität. Klinisch: DRUG-Ballottement-Test. Therapie: Radiusköpfchen MUSS ersetzt werden (Prothese) – nie resezieren!', 'Radial head fracture + interosseous membrane rupture + DRUJ injury. → Axial forearm instability. Clinically: DRUJ ballottement test. Treatment: radial head MUST be replaced (prosthesis) – never resect!', 'شکستگی سر رادیوس + پارگی غشای بین‌استخوانی + آسیب DRUJ. → ناپایداری محوری ساعد. بالینی: تست بالوتمنت DRUJ. درمان: سر رادیوس باید جایگزین شود (پروتز) – هرگز رزکسیون نکنید!'),
    L('Essex-Lopresti: 3 Strukturen. Resektion = absolut kontraindiziert.', 'Essex-Lopresti: 3 structures. Resection = absolutely contraindicated.', 'اسکس-لوپرستی: ۳ ساختار. رزکسیون = منع مطلق.')
  ),

  F('rk-fc-6', L('Assoziiert', 'Associated', 'همراه'),
    L('Terrible Triad des Ellenbogens: 3 Komponenten?', 'Terrible Triad of the elbow: 3 components?', 'سه‌گانه وحشتناک آرنج: ۳ مؤلفه؟'),
    L('1) Ellenbogenluxation (posterior). 2) Radiusköpfchenfraktur. 3) Coronoidfraktur der Ulna. Sehr instabil → alle 3 chirurgisch versorgen + Bandrekonstruktion + MRT präoperativ.', '1) Elbow dislocation (posterior). 2) Radial head fracture. 3) Coronoid process fracture. Very unstable → repair all 3 surgically + ligament reconstruction + MRI preoperatively.', '۱) لوکساسیون آرنج (خلفی). ۲) شکستگی سر رادیوس. ۳) شکستگی زائده کرونوئید. بسیار ناپایدار → هر ۳ را جراحی کنید + بازسازی رباط + MRI قبل از عمل.'),
    L('Terrible Triad = Luxation + Radiusköpfchen + Coronoid. Alle 3 operativ!', 'Terrible Triad = dislocation + radial head + coronoid. All 3 surgical!', 'سه‌گانه = لوکساسیون + سر رادیوس + کرونوئید. هر ۳ جراحی!')
  ),

  F('rk-fc-7', L('Therapie', 'Treatment', 'درمان'),
    L('Häufigste Komplikation nach Radiusköpfchenfraktur?', 'Most common complication after radial head fracture?', 'شایع‌ترین عارضه پس از شکستگی سر رادیوس؟'),
    L('Ellenbogensteifigkeit. Verhindert durch: frühfunktionelle Mobilisation (nach 1–2 Wo.), keine prolongierte Immobilisation. Physiotherapie zur Wiederherstellung der Pronosupination und Flexion/Extension.', 'Elbow stiffness. Prevented by: early functional mobilisation (after 1–2 weeks), no prolonged immobilisation. Physiotherapy to restore pronosupination and flexion/extension.', 'سفتی آرنج. پیشگیری: تحرک عملکردی زودهنگام (بعد از ۱–۲ هفته)، عدم ایمبیلیزاسیون طولانی. فیزیوتراپی برای بازگرداندن پروناسیون/سوپیناسیون و خم/صاف شدن.'),
    L('Steifigkeit = Hauptkomplikation. Früh mobilisieren!', 'Stiffness = main complication. Mobilise early!', 'سفتی = عارضه اصلی. زود تحرک دهید!')
  ),

  F('rk-fc-8', L('Anatomie', 'Anatomy', 'آناتومی'),
    L('Welchen Anteil der axialen Last überträgt das Radiusköpfchen?', 'What proportion of axial load does the radial head transmit?', 'چه نسبتی از بار محوری را سر رادیوس منتقل می‌کند؟'),
    L('~60 % der axialen Kraft vom Unterarm auf den Humerus (via Capitulum). Wichtig: deshalb Radiusköpfchen bei Instabilität nicht einfach resezieren – axiale Instabilität droht.', '~60 % of axial force from forearm to humerus (via capitellum). Important: therefore do not simply resect the radial head with instability – axial instability will follow.', '~۶۰٪ نیروی محوری از ساعد به هومروس (از طریق کاپیتولوم). مهم: بنابراین سر رادیوس را در صورت ناپایداری به سادگی رزکسیون نکنید – ناپایداری محوری در پیش است.'),
    L('60 % axiale Last + MCL-Antagonist → nie resezieren bei Instabilität!', '60 % axial load + MCL antagonist → never resect with instability!', '۶۰٪ بار محوری + آنتاگونیست MCL → هرگز در صورت ناپایداری رزکسیون نکنید!')
  ),

].map(fc => ({
  ...fc,
  topicId: 'radiuskoepfchenfraktur',
  front: fc.front,
  answer: fc.answer,
  explanation: fc.explanation,
}))

export const RADIUSKOPF_FLASHCARD_TOPIC = {
  id: 'radiuskoepfchenfraktur',
  title: {
    de: 'Radiusköpfchenfraktur',
    en: 'Radial Head Fracture',
    fa: 'شکستگی سر رادیوس',
  },
  color: '#0891b2',
}
