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
      'Die Mason-Einteilung auf der PDF-Seite ordnet die Frakturen nach Dislokation, Fragmentierung und Ellenbogenluxation ein. Die Tabelle direkt unter der Abbildung dient zugleich als übersetzte Bildlegende.',
      'The Mason scheme on the PDF page classifies fractures by displacement, fragmentation, and elbow dislocation. The table directly below the figure also serves as its translated legend.',
      'طبقه‌بندی ماسون در صفحهٔ PDF شکستگی‌ها را بر اساس جابجایی، چندقطعه‌ای بودن و لوکساسیون آرنج دسته‌بندی می‌کند. جدول زیر تصویر، راهنمای ترجمه‌شدهٔ آن نیز هست.'
    ),
    schemaSrc: '/radiuskopf/mason-klassifikation-msk-p15.png',
    schemaAlt: L('Ausschnitt der Mason-Schemata auf MSK.pdf S. 15: Typen I–IV, bei Typ IV mit Ellenbogenluxation', 'Crop of the Mason schematics on MSK.pdf p. 15: Types I–IV, with elbow dislocation in Type IV', 'برشی از شماتیک‌های ماسون در MSK.pdf صفحهٔ ۱۵: انواع I تا IV؛ نوع IV همراه با لوکساسیون آرنج'),
    headers: [
      L('Typ', 'Type', 'نوع'),
      L('Definition', 'Definition', 'تعریف'),
      L('Radiologisches Merkmal', 'Radiological feature', 'ویژگی رادیولوژیک'),
    ],
    rows: [
      [
        L('I', 'I', 'I'),
        L('Nicht oder minimal dislozierte Fraktur', 'Non- or minimally displaced fracture', 'شکستگی بدون یا حداقل جابجایی'),
        L('Gelenkstufe < 2 mm', 'Joint step < 2 mm', 'پله مفصلی < ۲ میلی‌متر'),
      ],
      [
        L('II', 'II', 'II'),
        L('Dislozierte marginale Fraktur (Keilfraktur)', 'Displaced marginal fracture (wedge)', 'شکستگی حاشیه‌ای جابجا شده (گوه‌ای)'),
        L('Gelenkstufe > 2 mm ODER > 30 % Gelenkfläche; oft Keilfraktur; intra- oder extraartikulär', 'Joint step > 2 mm OR > 30 % of the articular surface; often a wedge fracture; intra- or extra-articular', 'پله مفصلی > ۲ میلی‌متر یا درگیری > ۳۰٪ سطح مفصلی؛ اغلب شکستگی گوه‌ای؛ داخل یا خارج مفصل'),
      ],
      [
        L('III', 'III', 'III'),
        L('Mehrfragmentäre / Trümmerfraktur', 'Multi-fragmentary / comminuted fracture', 'شکستگی چندقطعه‌ای / خرد شده'),
        L('Mason III: mehrfragmentär / Trümmerfraktur; keine Mindestzahl auf der PDF-Seite', 'Mason III: multi-fragmentary / comminuted; no minimum count on the PDF page', 'ماسون III: چندقطعه‌ای / خردشده؛ صفحهٔ PDF حداقل تعداد را ذکر نمی‌کند'),
      ],
      [
        L('IV', 'IV', 'IV'),
        L('Jede Radiusköpfchenfraktur + Ellenbogenluxation', 'Any radial head fracture + elbow dislocation', 'هر شکستگی سر رادیوس + لوکساسیون آرنج'),
        L('Jede Radiusköpfchenfraktur mit Ellenbogenluxation', 'Any radial head fracture with elbow dislocation', 'هر شکستگی سر رادیوس همراه با لوکساسیون آرنج'),
      ],
    ],
    key: L(
      'Bildlegende: I nicht/minimal disloziert; II dislozierte Rand-/Keilfraktur; III mehrfragmentär/Trümmerfraktur; IV Radiusköpfchenfraktur mit Ellenbogenluxation. Laut PDF gilt Typ I bei Gelenkstufe < 2 mm und Typ II bei > 2 mm oder > 30 % Gelenkfläche; exakt 2 mm ohne > 30 % Beteiligung wird auf dieser Seite nicht zugeordnet. Die Klassifikation beschreibt Morphologie, nicht automatisch die Therapie; Mason-Modifikationen können abweichen.',
      'Figure legend: I non/minimally displaced; II displaced marginal/wedge fracture; III multi-fragmentary/comminuted; IV radial head fracture with elbow dislocation. The PDF assigns Type I to a joint step < 2 mm and Type II to > 2 mm or > 30 % articular involvement; it does not assign exactly 2 mm without > 30 % involvement. The classification describes morphology, not an automatic treatment; Mason modifications may differ.',
      'راهنمای تصویر: I بدون جابجایی/با جابجایی کم؛ II شکستگی حاشیه‌ای/گوه‌ای جابجا‌شده؛ III چندقطعه‌ای/خردشده؛ IV شکستگی سر رادیوس همراه لوکساسیون آرنج. طبق PDF، پلهٔ < ۲ میلی‌متر نوع I و پلهٔ > ۲ میلی‌متر یا درگیری > ۳۰٪ نوع II است؛ برای پلهٔ دقیقاً ۲ میلی‌متر بدون درگیری > ۳۰٪، صفحه نوعی تعیین نمی‌کند. طبقه‌بندی مورفولوژی را توصیف می‌کند، نه درمان خودکار؛ نسخه‌های اصلاح‌شدهٔ ماسون ممکن است متفاوت باشند.'
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
        title: L('Mason II – Therapie nach Befund', 'Mason II – treatment based on findings', 'ماسون II – درمان بر اساس یافته‌ها'),
        text: L(
          'Eine Gelenkstufe > 2 mm oder ein Befall von > 30 % ordnet die Fraktur in der PDF-Kurzfassung Typ II zu, begründet für sich allein aber keine ORIF. Therapieentscheidungen berücksichtigen unter anderem einen persistierenden mechanischen Bewegungsblock, Stabilität, Rekonstruierbarkeit und Begleitverletzungen.',
          'A joint step > 2 mm or involvement of > 30 % places the fracture in Type II in the PDF summary, but does not by itself justify ORIF. Treatment decisions also consider a persistent mechanical block, stability, reconstructibility, and associated injuries.',
          'در خلاصهٔ PDF، پلهٔ مفصلی > ۲ میلی‌متر یا درگیری > ۳۰٪ شکستگی را در نوع II قرار می‌دهد، اما به‌تنهایی توجیه‌کنندهٔ ORIF نیست. تصمیم درمانی همچنین به بلوک مکانیکی پایدار، پایداری، امکان بازسازی و آسیب‌های همراه توجه می‌کند.'
        ),
      },
      {
        icon: '🦾',
        title: L('Mason III – Rekonstruierbarkeit prüfen', 'Mason III – assess reconstructibility', 'ماسون III – امکان بازسازی را بسنجید'),
        text: L(
          'Mehrfragmentär bedeutet nicht automatisch unreponierbar. Ob eine Fixation möglich ist und ob ein Ersatz des Radiusköpfchens erforderlich wird, hängt von Rekonstruierbarkeit, Ellenbogenstabilität und Begleitverletzungen ab; diese Klassifikationsseite legt keine Behandlung fest.',
          'Multi-fragmentary does not automatically mean unreconstructible. Whether fixation is feasible or radial-head replacement is needed depends on reconstructibility, elbow stability, and associated injuries; this classification page does not prescribe treatment.',
          'چندقطعه‌ای بودن به‌طور خودکار به معنای غیرقابل بازسازی بودن نیست. امکان تثبیت یا نیاز به جایگزینی سر رادیوس به قابلیت بازسازی، پایداری آرنج و آسیب‌های همراه بستگی دارد؛ این صفحهٔ طبقه‌بندی درمانی تجویز نمی‌کند.'
        ),
      },
      {
        icon: '🔄',
        title: L('Mason IV – Reposition zuerst', 'Mason IV – Reduction first', 'ماسون IV – ابتدا کاهش'),
        text: L(
          'Ellenbogenluxation zeitnah geschlossen reponieren → anschließend Stabilität beurteilen. Die weitere Frakturbehandlung wird orthopädisch anhand von Stabilität, Rekonstruierbarkeit, Begleitverletzungen und patientenbezogenen Faktoren festgelegt; Mason-Typ II oder III schreibt nicht automatisch ORIF oder Prothese vor.',
          'Promptly reduce the elbow dislocation, then assess stability. Orthopaedic assessment determines subsequent fracture treatment based on stability, reconstructibility, associated injuries, and patient factors; Mason Type II or III does not automatically prescribe ORIF or arthroplasty.',
          'لوکساسیون آرنج را به‌موقع به‌صورت بسته جااندازی کنید و سپس پایداری را ارزیابی کنید. درمان بعدی شکستگی باید با ارزیابی ارتوپدی و بر اساس پایداری، قابلیت بازسازی، آسیب‌های همراه و عوامل مربوط به بیمار تعیین شود؛ ماسون II یا III به‌طور خودکار ORIF یا پروتز را تجویز نمی‌کند.'
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
        title: L('Mason I vs. II – PDF-Grenzwerte', 'Mason I vs. II – PDF thresholds', 'ماسون I در برابر II – آستانه‌های PDF'),
        text: L('PDF-Kurzfassung: Typ I Gelenkstufe < 2 mm; Typ II > 2 mm ODER > 30 % Gelenkfläche. Exakt 2 mm ohne > 30 % Beteiligung bleibt auf dieser Seite unzugeordnet. Die Grenzwerte beschreiben Morphologie und ordnen keine Therapie an.', 'PDF summary: Type I joint step < 2 mm; Type II > 2 mm OR > 30 % articular surface involvement. Exactly 2 mm without > 30 % involvement is unassigned on this page. These thresholds describe morphology and do not prescribe treatment.', 'خلاصهٔ PDF: پلهٔ نوع I < ۲ میلی‌متر؛ نوع II > ۲ میلی‌متر یا درگیری > ۳۰٪ سطح مفصلی است. پلهٔ دقیقاً ۲ میلی‌متر بدون درگیری > ۳۰٪ در این صفحه تعیین‌تکلیف نشده است. این آستانه‌ها مورفولوژی را توصیف می‌کنند و درمان تجویز نمی‌کنند.'),
      },
      {
        title: L('Mason III – Klassifikationsmerkmal', 'Mason III – classification feature', 'ماسون III – ویژگی طبقه‌بندی'),
        text: L('Die PDF-Seite definiert Mason III als mehrfragmentäre oder Trümmerfraktur des Radiusköpfchens. Sie gibt weder eine Mindestzahl von Fragmenten noch eine Therapieempfehlung; die Klasse allein bedeutet keine automatische Prothese.', 'The PDF page defines Mason III as a multi-fragmentary or comminuted radial head fracture. It gives neither a minimum fragment count nor a treatment recommendation; the class alone does not mandate arthroplasty.', 'صفحهٔ PDF ماسون III را شکستگی چندقطعه‌ای یا خردشدهٔ سر رادیوس تعریف می‌کند. در آن نه حداقل تعداد قطعات آمده و نه توصیهٔ درمانی؛ این طبقه به‌تنهایی پروتز را الزامی نمی‌کند.'),
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
      L('Gelenkstufe > 2 mm oder > 30 % der Gelenkfläche betroffen', 'Joint step > 2 mm or > 30 % of the articular surface involved', 'پلهٔ مفصلی > ۲ میلی‌متر یا درگیری > ۳۰٪ سطح مفصلی')[lang],
      L('Anzahl der Fragmente (≥ 2)', 'Number of fragments (≥ 2)', 'تعداد قطعات (≥ ۲)')[lang],
      L('Vorliegen einer Ellenbogenluxation', 'Presence of elbow dislocation', 'وجود لوکساسیون آرنج')[lang],
    ],
    1,
    L('Laut PDF-Kurzfassung: Mason I mit Gelenkstufe < 2 mm; Typ II mit Gelenkstufe > 2 mm oder > 30 % Gelenkflächenbeteiligung. Exakt 2 mm ohne > 30 % Beteiligung wird auf dieser Seite nicht zugeordnet. Morphologie, keine automatische Therapieentscheidung.', 'In the PDF summary: Mason I has a joint step < 2 mm; Type II has a step > 2 mm or > 30 % articular involvement. Exactly 2 mm without > 30 % involvement is not assigned on this page. These are morphological criteria, not an automatic treatment decision.', 'طبق خلاصهٔ PDF: ماسون I پلهٔ مفصلی < ۲ میلی‌متر دارد؛ نوع II پلهٔ > ۲ میلی‌متر یا درگیری > ۳۰٪ سطح مفصلی دارد. پلهٔ دقیقاً ۲ میلی‌متر بدون درگیری > ۳۰٪ در این صفحه به نوعی اختصاص داده نشده است. این‌ها معیارهای مورفولوژیک‌اند، نه تصمیم خودکار درمانی.')[lang]
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
    L('Mason IV = jede Radiusköpfchenfraktur in Kombination mit einer Ellenbogenluxation – unabhängig von der Fragmentzahl.', 'Mason IV = any radial head fracture combined with an elbow dislocation, regardless of fragment count.', 'ماسون IV = هر شکستگی سر رادیوس همراه با لوکساسیون آرنج، مستقل از تعداد قطعات.')[lang]
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
    L('Welches Merkmal beschreibt Mason Typ III auf der PDF-Seite?',
      'Which feature describes Mason Type III on the PDF page?',
      'کدام ویژگی ماسون نوع III را در صفحهٔ PDF توصیف می‌کند؟')[lang],
    [
      L('Mehrfragmentäre oder Trümmerfraktur des Radiusköpfchens', 'Multi-fragmentary or comminuted radial head fracture', 'شکستگی چندقطعه‌ای یا خردشدهٔ سر رادیوس')[lang],
      L('Jede Fraktur mit Gelenkstufe > 2 mm', 'Any fracture with a joint step > 2 mm', 'هر شکستگی با پلهٔ مفصلی > ۲ میلی‌متر')[lang],
      L('Jede Fraktur mit Ellenbogenluxation', 'Any fracture with elbow dislocation', 'هر شکستگی همراه با لوکساسیون آرنج')[lang],
      L('Jede Fraktur mit einer Essex-Lopresti-Verletzung', 'Any fracture with an Essex-Lopresti injury', 'هر شکستگی همراه با آسیب اسکس-لوپرستی')[lang],
    ],
    0,
    L('Die PDF-Seite beschreibt Mason III als mehrfragmentäre oder Trümmerfraktur; sie nennt weder eine feste Fragmentzahl noch Rekonstruierbarkeit oder Therapie.', 'The PDF page describes Mason III as a multi-fragmentary or comminuted fracture; it specifies neither a fixed fragment count nor reconstructibility or treatment.', 'صفحهٔ PDF ماسون III را شکستگی چندقطعه‌ای یا خردشده تعریف می‌کند؛ نه تعداد قطعات ثابتی می‌دهد و نه امکان بازسازی یا درمان را مشخص می‌کند.')[lang]
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
    L('Die Kombination ist häufig instabil. Stabilität und jede Begleitverletzung beurteilen; die Therapie wird anhand des Gesamtbefunds, der Rekonstruierbarkeit und patientenbezogener Faktoren geplant. Eine operative Versorgung aller Komponenten oder ein MRT ist nicht automatisch erforderlich.', 'This combination is often unstable. Assess stability and each associated injury; plan treatment based on the overall findings, reconstructibility, and patient factors. Surgery for every component or MRI is not automatic.', 'این ترکیب اغلب ناپایدار است. پایداری و هر آسیب همراه را ارزیابی کنید؛ درمان را بر اساس مجموع یافته‌ها، قابلیت بازسازی و عوامل مربوط به بیمار برنامه‌ریزی کنید. جراحی همهٔ مؤلفه‌ها یا MRI به‌طور خودکار لازم نیست.')[lang]
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
    L('Essex-Lopresti = Radiusköpfchenfraktur + Ruptur der Membrana interossea + DRUG-Verletzung; das Muster kann longitudinale Unterarminstabilität verursachen. DRUG und Unterarmlänge/Stabilität prüfen. Bei bestätigter Instabilität wird die radiale Länge erhalten oder wiederhergestellt; Fixation oder Ersatz richten sich nach Rekonstruierbarkeit und Begleitverletzungen. Keine automatische Prothese und keine pauschale Resektionsregel.', 'Essex-Lopresti = radial head fracture + interosseous membrane rupture + DRUJ injury; the pattern can cause longitudinal forearm instability. Assess the DRUJ and forearm length/stability. With confirmed instability, preserve or restore radial length; fixation or replacement depends on reconstructibility and associated injuries. Neither arthroplasty nor a blanket rule against resection is automatic.', 'اسکس-لوپرستی = شکستگی سر رادیوس + پارگی غشای بین‌استخوانی + آسیب DRUJ؛ این الگو می‌تواند موجب ناپایداری طولی ساعد شود. DRUJ و طول/پایداری ساعد را ارزیابی کنید. در ناپایداری تأییدشده، طول رادیوس حفظ یا بازسازی می‌شود؛ تثبیت یا جایگزینی به قابلیت بازسازی و آسیب‌های همراه بستگی دارد. نه پروتز خودکار است و نه قاعده‌ای مطلق برای منع رزکسیون وجود دارد.')[lang]
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
    L('Ein 35-jähriger Patient hat nach FOOSH-Trauma eine rekonstruierbare Mason-II-Fraktur. Nach Analgesie und Gelenkaspiration bleibt ein eindeutiger mechanischer Block der Pro- und Supination bestehen. Welche Therapie ist am ehesten indiziert?',
      'A 35-year-old patient has a reconstructible Mason II fracture after FOOSH trauma. After analgesia and joint aspiration, a clear mechanical block to pronation and supination persists. Which treatment is most appropriate?',
      'بیمار ۳۵ ساله پس از تروما FOOSH دچار شکستگی قابل بازسازی ماسون II شده است. پس از بی‌دردی و آسپیراسیون مفصل، بلوک مکانیکی واضح پروناسیون و سوپیناسیون باقی می‌ماند. مناسب‌ترین درمان چیست؟')[lang],
    [
      L('Frühfunktionelle konservative Therapie; der mechanische Block ist ohne Bedeutung', 'Early non-operative mobilisation; the mechanical block is irrelevant', 'درمان غیرجراحی با تحرک زودهنگام؛ بلوک مکانیکی اهمیتی ندارد')[lang],
      L('ORIF (offene Reposition und interne Fixation) mit Schrauben', 'ORIF (open reduction and internal fixation) with screws', 'ORIF (کاهش باز و تثبیت داخلی) با پیچ')[lang],
      L('Radiusköpfchenprothese trotz gut rekonstruierbarer Fraktur', 'Radial head arthroplasty despite a readily reconstructible fracture', 'پروتز سر رادیوس با وجود قابل بازسازی بودن شکستگی')[lang],
      L('Sechswöchige Ruhigstellung ohne Repositionsversuch', 'Six weeks of immobilisation without attempting reduction', 'بی‌حرکتی شش‌هفته‌ای بدون تلاش برای جااندازی')[lang],
    ],
    1,
    L('Ein persistierender mechanischer Rotationsblock ist bei einer rekonstruierbaren Mason-II-Fraktur eine klare Operationsindikation; ORIF stellt die Gelenkfläche wieder her. Eine isolierte stabile Mason-II-Fraktur ohne Block kann dagegen häufig frühfunktionell konservativ behandelt werden. Stufenhöhe oder Fragmentgröße allein erzwingen keine Operation.', 'A persistent mechanical block to rotation is a clear operative indication in a reconstructible Mason II fracture; ORIF restores the articular surface. An isolated stable Mason II fracture without a block can often be managed non-operatively with early mobilisation. Step height or fragment size alone does not mandate surgery.', 'بلوک مکانیکی پایدار در چرخش ساعد، در شکستگی قابل بازسازی ماسون II اندیکاسیون روشن جراحی است و ORIF سطح مفصلی را بازسازی می‌کند. شکستگی ماسون II مجزا و پایدار بدون بلوک را اغلب می‌توان با تحرک زودهنگام به‌صورت غیرجراحی درمان کرد. ارتفاع پله یا اندازه قطعه به‌تنهایی جراحی را الزامی نمی‌کند.')[lang]
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
    L('Welche PDF-Merkmale trennen Mason I und II?', 'Which PDF features distinguish Mason I and II?', 'کدام ویژگی‌های PDF ماسون I را از II جدا می‌کنند؟'),
    L('PDF-Kurzfassung: Typ I Gelenkstufe < 2 mm; Typ II Gelenkstufe > 2 mm ODER > 30 % Gelenkfläche. Exakt 2 mm ohne > 30 % Beteiligung bleibt auf der Seite unzugeordnet.', 'PDF summary: Type I joint step < 2 mm; Type II joint step > 2 mm OR > 30 % articular surface. Exactly 2 mm without > 30 % involvement is unassigned on the page.', 'خلاصهٔ PDF: نوع I پلهٔ مفصلی < ۲ میلی‌متر؛ نوع II پلهٔ > ۲ میلی‌متر یا درگیری > ۳۰٪ سطح مفصلی. پلهٔ دقیقاً ۲ میلی‌متر بدون درگیری > ۳۰٪ در صفحه تعیین‌تکلیف نشده است.'),
    L('Die Zahlen beschreiben die Klassifikation. Sie allein ordnen keine ORIF an.', 'The numbers describe the classification. They do not, by themselves, mandate ORIF.', 'این اعداد طبقه‌بندی را توصیف می‌کنند و به‌تنهایی ORIF را الزامی نمی‌کنند.')
  ),

  F('rk-fc-2', L('Mason', 'Mason', 'ماسون'),
    L('Was sagt die PDF-Seite über Mason III?', 'What does the PDF page say about Mason III?', 'صفحهٔ PDF دربارهٔ ماسون III چه می‌گوید؟'),
    L('Mehrfragmentäre oder Trümmerfraktur des Radiusköpfchens. Keine Fragment-Mindestzahl und keine Therapieempfehlung angegeben.', 'A multi-fragmentary or comminuted radial head fracture. No minimum fragment count or treatment recommendation is given.', 'شکستگی چندقطعه‌ای یا خردشدهٔ سر رادیوس؛ حداقل تعداد قطعه و توصیهٔ درمانی ذکر نشده است.'),
    L('Die Fragmentzahl allein beweist weder fehlende Rekonstruierbarkeit noch eine bestimmte Therapie.', 'Fragment count alone does not establish irreconstructibility or dictate a specific treatment.', 'تعداد قطعات به‌تنهایی غیرقابل‌بازسازی بودن یا درمان مشخصی را ثابت نمی‌کند.')
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
    L('Radiusköpfchenfraktur + Ruptur der Membrana interossea + DRUG-Verletzung → Risiko longitudinaler Unterarminstabilität. DRUG und Unterarmlänge/Stabilität gezielt prüfen. Bei bestätigter Instabilität wird die radiale Länge erhalten oder wiederhergestellt; Fixation oder Ersatz richten sich nach Rekonstruierbarkeit und Begleitverletzungen. Eine Resektion ist keine pauschale Option, aber auch eine Prothese nicht automatisch vorgeschrieben.', 'Radial head fracture + interosseous membrane rupture + DRUJ injury → risk of longitudinal forearm instability. Assess the DRUJ and forearm length/stability. With confirmed instability, preserve or restore radial length; fixation or replacement depends on reconstructibility and associated injuries. Resection is not a default option, but arthroplasty is not automatic either.', 'شکستگی سر رادیوس + پارگی غشای بین‌استخوانی + آسیب DRUJ → خطر ناپایداری طولی ساعد. DRUJ و طول/پایداری ساعد را هدفمند ارزیابی کنید. در ناپایداری تأییدشده، طول رادیوس حفظ یا بازسازی می‌شود؛ تثبیت یا جایگزینی به قابلیت بازسازی و آسیب‌های همراه بستگی دارد. رزکسیون گزینهٔ پیش‌فرض نیست، اما پروتز هم خودکار تجویز نمی‌شود.'),
    L('Essex-Lopresti: 3 Strukturen; Längsstabilität prüfen und Therapie individuell planen.', 'Essex-Lopresti: 3 structures; assess longitudinal stability and individualise treatment.', 'اسکس-لوپرستی: ۳ ساختار؛ پایداری طولی را بسنجید و درمان را فردی تعیین کنید.')
  ),

  F('rk-fc-6', L('Assoziiert', 'Associated', 'همراه'),
    L('Terrible Triad des Ellenbogens: 3 Komponenten?', 'Terrible Triad of the elbow: 3 components?', 'سه‌گانه وحشتناک آرنج: ۳ مؤلفه؟'),
    L('1) Ellenbogenluxation (posterior). 2) Radiusköpfchenfraktur. 3) Coronoidfraktur der Ulna. Begleitverletzungen und Stabilität jeder Komponente beurteilen; die Behandlungsplanung ist individuell und orientiert sich an der Gesamtstabilität.', '1) Posterior elbow dislocation. 2) Radial head fracture. 3) Coronoid process fracture. Assess associated injuries and the stability of each component; individualise management to the overall stability.', '۱) لوکساسیون خلفی آرنج. ۲) شکستگی سر رادیوس. ۳) شکستگی زائدهٔ کرونوئید اولنا. آسیب‌های همراه و پایداری هر مؤلفه را بسنجید؛ درمان را بر اساس پایداری کلی و به‌صورت فردی برنامه‌ریزی کنید.'),
    L('Terrible Triad: 3 Verletzungen erkennen; Therapie nach Gesamtstabilität planen.', 'Terrible triad: identify the 3 injuries; plan treatment for overall stability.', 'سه‌گانهٔ وحشتناک: سه آسیب را بشناسید؛ درمان را بر پایهٔ پایداری کلی برنامه‌ریزی کنید.')
  ),

  F('rk-fc-7', L('Therapie', 'Treatment', 'درمان'),
    L('Häufigste Komplikation nach Radiusköpfchenfraktur?', 'Most common complication after radial head fracture?', 'شایع‌ترین عارضه پس از شکستگی سر رادیوس؟'),
    L('Ellenbogensteifigkeit. Verhindert durch: frühfunktionelle Mobilisation (nach 1–2 Wo.), keine prolongierte Immobilisation. Physiotherapie zur Wiederherstellung der Pronosupination und Flexion/Extension.', 'Elbow stiffness. Prevented by: early functional mobilisation (after 1–2 weeks), no prolonged immobilisation. Physiotherapy to restore pronosupination and flexion/extension.', 'سفتی آرنج. پیشگیری: تحرک عملکردی زودهنگام (بعد از ۱–۲ هفته)، عدم ایمبیلیزاسیون طولانی. فیزیوتراپی برای بازگرداندن پروناسیون/سوپیناسیون و خم/صاف شدن.'),
    L('Steifigkeit = Hauptkomplikation. Früh mobilisieren!', 'Stiffness = main complication. Mobilise early!', 'سفتی = عارضه اصلی. زود تحرک دهید!')
  ),

  F('rk-fc-8', L('Anatomie', 'Anatomy', 'آناتومی'),
    L('Welchen Anteil der axialen Last überträgt das Radiusköpfchen?', 'What proportion of axial load does the radial head transmit?', 'چه نسبتی از بار محوری را سر رادیوس منتقل می‌کند؟'),
    L('Das Radiusköpfchen trägt zur axialen Unterarmstabilität bei. Bei vermuteter Instabilität vor einer Resektion die Begleitverletzungen und Längsstabilität vollständig beurteilen; Erhalt, Fixation oder Ersatz hängen vom Gesamtbefund ab.', 'The radial head contributes to axial forearm stability. If instability is suspected, assess associated injuries and longitudinal stability fully before considering excision; preservation, fixation, or replacement depends on the overall injury.', 'سر رادیوس به پایداری محوری ساعد کمک می‌کند. در صورت شک به ناپایداری، پیش از بررسی رزکسیون، آسیب‌های همراه و پایداری طولی را کامل ارزیابی کنید؛ حفظ، تثبیت یا جایگزینی به مجموع یافته‌ها بستگی دارد.'),
    L('Radialkopf stabilisiert mit – erst Begleitverletzungen und Längsstabilität prüfen, dann individuell entscheiden.', 'The radial head contributes to stability—assess associated injuries and longitudinal stability before deciding.', 'سر رادیوس در پایداری نقش دارد؛ ابتدا آسیب‌های همراه و پایداری طولی را بسنجید، سپس فردی تصمیم بگیرید.')
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
