const L = (de, en, fa) => ({ de, en, fa })

export const RADIUSKOPF_LESSON = {
  id: 'radiuskoepfchenfraktur',
  title: L('Radiusköpfchenfraktur', 'Radial Head Fracture', 'شکستگی سر رادیوس'),
  definition: L(
    "Intraartikuläre Fraktur des Radiusköpfchens am Ellenbogen, klassifiziert nach Mason mit Johnston-Erweiterung (I–IV), mit entscheidender Bedeutung für die Beurteilung der Gelenkkongruenz und assoziierter Ligamentverletzungen.",
    "Intra-articular fracture of the radial head at the elbow, classified by Mason with the Johnston extension (I–IV), with critical importance for assessing joint congruence and associated ligamentous injuries.",
    "شکستگی داخل مفصلی سر رادیوس در آرنج، با طبقه‌بندی ماسون همراه با گسترش جانستون (I–IV)، با اهمیت حیاتی برای ارزیابی تطابق مفصلی و آسیب‌های رباطی همراه."
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
          "Der N. interosseus posterior verläuft nahe dem Radiusköpfchen und kann bei der Operation verletzt werden. Eine isolierte Läsion schwächt die Finger- und Daumenextension ohne kutanen Sensibilitätsausfall. Die Handgelenkextension bleibt durch den erhaltenen M. extensor carpi radialis longus typischerweise möglich, gegebenenfalls mit Radialabweichung.",
          "The posterior interosseous nerve runs near the radial head and may be injured during surgery. An isolated lesion weakens finger and thumb extension without cutaneous sensory loss. Wrist extension is typically preserved by the spared extensor carpi radialis longus, sometimes with radial deviation.",
          "عصب بین‌استخوانی خلفی نزدیک سر رادیوس می‌گذرد و ممکن است هنگام جراحی آسیب ببیند. آسیب منفرد آن اکستنشن انگشتان و شست را بدون نقص حسی پوستی ضعیف می‌کند. اکستنشن مچ معمولاً به‌واسطهٔ حفظ عضلهٔ اکستانسور کارپی رادیالیس لونگوس باقی می‌ماند و ممکن است با انحراف رادیال همراه باشد."
        ),
      },
      {
        icon: '📐',
        title: L('Radiocapitellar Line', 'Radiocapitellar Line', 'خط رادیوکاپیتلار'),
        text: L(
          "Eine entlang des Radiushalses gezogene Linie ist im echten Seitenbild die verlässlichere Orientierung. Bei Kindern beeinflussen Alter, Ossifikation und Projektion die Beziehung zum Capitulum; selbst eine normale Linie trifft nicht immer dessen Zentrum. Fehlende Deckung erfordert eine Prüfung der Technik und der gesamten Gelenkstellung, beweist allein aber keine Luxation.",
          "A line along the radial neck on a true lateral view is the more reliable reference. In children, age, ossification and projection affect its relationship to the capitellum; a normal line does not invariably cross its centre. Nonintersection warrants checking technique and overall joint alignment but does not alone prove dislocation.",
          "خط در امتداد گردن رادیوس در نمای لترال واقعی مرجع قابل‌اتکاتری است. در کودکان، سن، استخوانی‌شدن و نما بر رابطهٔ خط با کاپیتولوم اثر دارند؛ خط طبیعی نیز همیشه از مرکز آن عبور نمی‌کند. عبور نکردن خط نیازمند بررسی تکنیک و هم‌راستایی کلی مفصل است، اما به‌تنهایی دررفتگی را ثابت نمی‌کند."
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
          L("Bei unklarer Fragmentmorphologie, zur präoperativen Planung und bei komplexen Frakturluxationen.", "For uncertain fragment morphology, preoperative planning and complex fracture-dislocations.", "در مورفولوژی نامشخص قطعات، برنامه‌ریزی پیش از عمل و شکستگی‌دررفتگی‌های پیچیده."),
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
          title: L("Posteriores Fettkissen – Ergusszeichen", "Posterior fat pad – effusion sign", "بالشتک چربی خلفی – نشانهٔ افیوژن"),
          text: L("Ein sichtbares posteriores Fettkissen im echten Seitenbild spricht für einen Gelenkerguss. Nach Trauma ist eine okkulte Fraktur möglich; das Zeichen legt weder Frakturort noch Mason-Typ fest.", "A visible posterior fat pad on a true lateral view supports joint effusion. After trauma an occult fracture is possible; the sign establishes neither fracture location nor Mason type.", "دیده‌شدن بالشتک چربی خلفی در نمای لترال واقعی به نفع افیوژن مفصل است. پس از تروما شکستگی پنهان ممکن است؛ این علامت نه محل شکستگی و نه نوع ماسون را تعیین می‌کند."),
        },
      ],
    },
    rcLine: {
      title: L('Radiocapitellar Line (rID:41196)', 'Radiocapitellar Line (rID:41196)', 'خط رادیوکاپیتلار (rID:41196)'),
      radiopaediaUrl: 'https://radiopaedia.org/cases/41196/play',
      images: [
        {
          src: '/radiuskopf/radiocapitellar-line-rid41196.jpeg',
          caption: L("Radiocapitellar Line zur Orientierung prüfen. Eine Linie entlang des Radiushalses ist im echten Seitenbild verlässlicher; bei Kindern Alter, Ossifikation und Projektion beachten. Fehlende Deckung beweist allein keine Luxation.", "Check the radiocapitellar line for orientation. A radial-neck line on a true lateral view is more reliable; in children consider age, ossification and projection. Nonintersection alone does not prove dislocation.", "خط رادیوکاپیتلار را برای جهت‌یابی بررسی کنید. خط در امتداد گردن رادیوس در نمای لترال واقعی قابل‌اتکاتر است؛ در کودکان سن، استخوانی‌شدن و نما را لحاظ کنید. عبور نکردن خط به‌تنهایی دررفتگی را ثابت نمی‌کند."),
        },
      ],
    },
    masonIVCase: {
      title: L("Radiokapitellare Fehlstellung erkennen", "Recognise radiocapitellar malalignment", "تشخیص بدراستایی رادیوکاپیتلار"),
      images: [
        {
          src: '/radiuskopf/mason-iv-luxation.jpeg',
          caption: L('Radiusköpfchenluxation: Radiocapitellar Line unterbrochen – Capitulum und Radius nicht mehr koaxial', 'Radial head dislocation: Radiocapitellar line disrupted – capitellum and radius no longer coaxial', 'لوکساسیون سر رادیوس: خط رادیوکاپیتلار قطع شده – کاپیتولوم و رادیوس دیگر هم‌محور نیستند'),
        },
      ],
    },
    cave: L(
      "Bei Erwachsenen mit akutem Trauma, fortbestehendem Frakturverdacht und normalem oder unklarem Röntgen kommen je nach klinischer Frage eine Röntgenkontrolle nach 10–14 Tagen oder CT ohne Kontrastmittel infrage. Ein isoliertes Fettkissenzeichen beweist keine Radiusköpfchenfraktur und ordnet keine Mason-I-Behandlung an.",
      "In adults after acute trauma with persistent fracture suspicion and normal or indeterminate radiographs, repeat radiographs after 10–14 days or noncontrast CT may be appropriate for the clinical question. An isolated fat pad sign does not prove a radial-head fracture or prescribe Mason I treatment.",
      "در بزرگسالان پس از ترومای حاد با تداوم شک به شکستگی و رادیوگرافی طبیعی یا نامشخص، بر اساس پرسش بالینی می‌توان رادیوگرافی پیگیری پس از ۱۰ تا ۱۴ روز یا CT بدون کنتراست را در نظر گرفت. علامت منفرد بالشتک چربی شکستگی سر رادیوس را ثابت نمی‌کند و درمان ماسون I را تجویز نمی‌کند."
    ),
  },

  mason: {
    title: L('Mason-Klassifikation', 'Mason Classification', 'طبقه‌بندی ماسون'),
    lead: L(
      "Die PDF-Abbildung zeigt die Typen I–IV. Die Tabelle ergänzt die Quellenkurzfassung um die deskriptive Trennung von Teil- und Ganzkopffraktur; Typ IV bezeichnet die zusätzliche Ellenbogenluxation nach Johnston.",
      "The PDF figure shows types I–IV. The table supplements the source summary with the descriptive distinction between partial-head and whole-head fractures; type IV denotes associated elbow dislocation in the Johnston extension.",
      "تصویر PDF انواع I تا IV را نشان می‌دهد. جدول، خلاصهٔ منبع را با تمایز توصیفی شکستگی بخشی از سر و تمام سر رادیوس تکمیل می‌کند؛ نوع IV در گسترش جانستون به دررفتگی همراه آرنج اشاره دارد."
    ),
    schemaSrc: '/radiuskopf/mason-klassifikation-msk-p15.png',
    schemaAlt: L('Ausschnitt der Mason-Schemata auf MSK.pdf S. 15: Typen I–IV, bei Typ IV mit Ellenbogenluxation', 'Crop of the Mason schematics on MSK.pdf p. 15: Types I–IV, with elbow dislocation in Type IV', 'برشی از شماتیک‌های ماسون در MSK.pdf صفحهٔ ۱۵: انواع I تا IV؛ نوع IV همراه با لوکساسیون آرنج'),
    headers: [
      L('Typ', 'Type', 'نوع'),
      L("Deskriptives Grundmuster", "Descriptive pattern", "الگوی توصیفی"),
      L('Radiologisches Merkmal', 'Radiological feature', 'ویژگی رادیولوژیک'),
    ],
    rows: [
      [
        L('I', 'I', 'I'),
        L('Nicht oder minimal dislozierte Fraktur', 'Non- or minimally displaced fracture', 'شکستگی بدون یا حداقل جابجایی'),
        L("Geringe Dislokation; Gelenkstufe messen und verwendete Modifikation nennen", "Minimal displacement; measure the articular step and name the modification used", "جابه‌جایی کم؛ پلهٔ مفصلی را اندازه بگیرید و نسخهٔ اصلاح‌شدهٔ مورد استفاده را نام ببرید"),
      ],
      [
        L('II', 'II', 'II'),
        L("Dislozierte Teilkopffraktur, zum Beispiel Rand-/Keilfragment", "Displaced partial-head fracture, for example a marginal/wedge fragment", "شکستگی جابه‌جاشدهٔ بخشی از سر، مثلاً قطعهٔ حاشیه‌ای یا گوه‌ای"),
        L("Gelenkstufe und betroffenen Gelenkflächenanteil angeben; auch mehrfragmentär möglich", "Report the articular step and proportion of articular surface involved; may also be multifragmentary", "پلهٔ مفصلی و سهم سطح مفصلی درگیر را گزارش کنید؛ چندقطعه‌ای‌بودن نیز ممکن است"),
      ],
      [
        L('III', 'III', 'III'),
        L("Fraktur des gesamten Radiusköpfchens", "Fracture involving the entire radial head", "شکستگی درگیرکنندهٔ تمام سر رادیوس"),
        L("Fragmentzahl variabel; Ganzkopfbeteiligung von einer mehrfragmentären Teilkopffraktur unterscheiden", "Variable fragment count; distinguish whole-head involvement from a multifragmentary partial-head fracture", "تعداد قطعات متغیر است؛ درگیری تمام سر را از شکستگی چندقطعه‌ایِ بخشی از سر جدا کنید"),
      ],
      [
        L('IV', 'IV', 'IV'),
        L('Jede Radiusköpfchenfraktur + Ellenbogenluxation', 'Any radial head fracture + elbow dislocation', 'هر شکستگی سر رادیوس + لوکساسیون آرنج'),
        L('Jede Radiusköpfchenfraktur mit Ellenbogenluxation', 'Any radial head fracture with elbow dislocation', 'هر شکستگی سر رادیوس همراه با لوکساسیون آرنج'),
      ],
    ],
    key: L(
      "PDF-Kurzfassung: Typ I < 2 mm Gelenkstufe; Typ II > 2 mm ODER > 30 % Gelenkfläche; Typ III mehrfragmentär. Exakt 2 mm ohne > 30 % Beteiligung bleibt dort unzugeordnet. Diese quellenbezogenen Zahlengrenzen sind nicht universell: Teil- und Ganzkopfbeteiligung unterscheiden, die verwendete Modifikation nennen und Begleitluxation dokumentieren. Auch Typ II kann mehrfragmentär sein; Morphologie allein legt keine Therapie fest.",
      "PDF summary: type I articular step < 2 mm; type II > 2 mm OR > 30% articular involvement; type III multifragmentary. Exactly 2 mm without > 30% involvement is unassigned there. These source-specific numerical boundaries are not universal: distinguish partial-head from whole-head involvement, name the modification used and document associated dislocation. Type II may also be multifragmentary; morphology alone does not prescribe treatment.",
      "خلاصهٔ PDF: پلهٔ مفصلی نوع I کمتر از ۲ میلی‌متر؛ نوع II بیش از ۲ میلی‌متر یا درگیری بیش از ۳۰٪ سطح مفصلی؛ نوع III چندقطعه‌ای. پلهٔ دقیقاً ۲ میلی‌متر بدون درگیری بیش از ۳۰٪ در آن تعیین‌تکلیف نشده است. این آستانه‌های عددیِ منبع، همگانی نیستند: درگیری بخشی از سر را از تمام سر جدا کنید، نسخهٔ اصلاح‌شده را نام ببرید و دررفتگی همراه را ثبت کنید. نوع II نیز می‌تواند چندقطعه‌ای باشد؛ مورفولوژی به‌تنهایی درمان را تجویز نمی‌کند."
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
          "Bei isolierter stabiler, nicht oder gering verschobener Fraktur früh schmerzadaptiert mobilisieren; eine Schlinge kann kurzzeitig entlasten. Keine pauschale Wartezeit von 1–2 Wochen oder feste Freigabe zur Vollbelastung: Belastungsaufbau und Rückkehr zur Arbeit richten sich nach Stabilität, Beschwerden und klinischer Kontrolle.",
          "For an isolated stable, nondisplaced or minimally displaced fracture, begin early pain-adapted motion; a sling may provide brief support. There is no universal 1–2-week wait or fixed clearance for full loading: loading progression and return to work depend on stability, symptoms and clinical follow-up.",
          "در شکستگی منفرد و پایدار، بدون جابه‌جایی یا با جابه‌جایی کم، حرکت زودهنگام متناسب با درد آغاز می‌شود؛ اسلینگ می‌تواند مدت کوتاهی برای راحتی استفاده شود. انتظار همگانی ۱ تا ۲ هفته یا زمان ثابتی برای تحمل بار کامل وجود ندارد؛ افزایش بار و بازگشت به کار به پایداری، علائم و پیگیری بالینی بستگی دارند."
        ),
      },
      {
        icon: '🔩',
        title: L('Mason II – Therapie nach Befund', 'Mason II – treatment based on findings', 'ماسون II – درمان بر اساس یافته‌ها'),
        text: L(
          "Eine dislozierte Teilkopffraktur begründet für sich allein keine ORIF. Therapieentscheidungen berücksichtigen unter anderem einen persistierenden mechanischen Bewegungsblock, Stabilität, Rekonstruierbarkeit und Begleitverletzungen.",
          "A displaced partial-head fracture does not by itself justify ORIF. Treatment decisions also consider a persistent mechanical block, stability, reconstructibility and associated injuries.",
          "شکستگی جابه‌جاشدهٔ بخشی از سر به‌تنهایی توجیه‌کنندهٔ ORIF نیست. تصمیم درمانی همچنین بلوک مکانیکی پایدار، پایداری، قابلیت بازسازی و آسیب‌های همراه را در نظر می‌گیرد."
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
        title: L("Mason IV – Reposition zuerst", "Mason IV – Reduction first", "ماسون IV – ابتدا جااندازی"),
        text: L(
          'Ellenbogenluxation zeitnah geschlossen reponieren → anschließend Stabilität beurteilen. Die weitere Frakturbehandlung wird orthopädisch anhand von Stabilität, Rekonstruierbarkeit, Begleitverletzungen und patientenbezogenen Faktoren festgelegt; Mason-Typ II oder III schreibt nicht automatisch ORIF oder Prothese vor.',
          'Promptly reduce the elbow dislocation, then assess stability. Orthopaedic assessment determines subsequent fracture treatment based on stability, reconstructibility, associated injuries, and patient factors; Mason Type II or III does not automatically prescribe ORIF or arthroplasty.',
          'لوکساسیون آرنج را به‌موقع به‌صورت بسته جااندازی کنید و سپس پایداری را ارزیابی کنید. درمان بعدی شکستگی باید با ارزیابی ارتوپدی و بر اساس پایداری، قابلیت بازسازی، آسیب‌های همراه و عوامل مربوط به بیمار تعیین شود؛ ماسون II یا III به‌طور خودکار ORIF یا پروتز را تجویز نمی‌کند.'
        ),
      },
    ],
    cave: L(
      "Unnötig lange Ruhigstellung begünstigt eine Bewegungseinschränkung. Bei einfachen stabilen Verletzungen früh schmerzadaptiert üben; eine angeleitete Eigenübung kann genügen. Formale Physiotherapie ist nicht für jede isolierte gering verschobene Fraktur obligatorisch.",
      "Unnecessarily prolonged immobilisation favours loss of motion. With simple stable injuries, start early pain-adapted exercises; instructed home exercise may suffice. Formal physiotherapy is not mandatory for every isolated minimally displaced fracture.",
      "بی‌حرکتی غیرضروری و طولانی محدودیت حرکت را تشدید می‌کند. در آسیب ساده و پایدار، تمرین زودهنگام متناسب با درد آغاز شود؛ تمرین خانگی با آموزش مناسب ممکن است کافی باشد. فیزیوتراپی رسمی برای همهٔ شکستگی‌های منفرد با جابه‌جایی کم الزامی نیست."
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
          "Ellenbogenluxation mit Radiusköpfchen- und Coronoidfraktur. Häufig instabil: nach Reposition Gelenkkongruenz, Bewegungsblock und Stabilität prüfen und die Frakturen meist im CT charakterisieren. Die orthopädische Therapie wird individuell geplant; sorgfältig ausgewählte stabile Verletzungen können unter engmaschiger Kontrolle nichtoperativ behandelt werden. Nicht jede Komponente erfordert automatisch eine Operation.",
          "Elbow dislocation with radial-head and coronoid fractures. Often unstable: after reduction assess joint congruity, mechanical block and stability, and usually characterise the fractures with CT. Orthopaedic treatment is individualised; carefully selected stable injuries may be managed nonoperatively with close follow-up. Not every component automatically requires surgery.",
          "دررفتگی آرنج همراه شکستگی سر رادیوس و کرونوئید. اغلب ناپایدار است؛ پس از جااندازی، تطابق مفصل، مانع مکانیکی حرکت و پایداری بررسی و شکستگی‌ها معمولاً با CT توصیف شوند. درمان ارتوپدی فردی‌سازی می‌شود؛ آسیب‌های پایدارِ با انتخاب دقیق ممکن است با پایش نزدیک غیرجراحی درمان شوند. هر مؤلفه به‌طور خودکار نیازمند جراحی نیست."
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
        title: L("Posteriores Fettkissen: Erguss und Frakturverdacht", "Posterior fat pad: effusion and fracture suspicion", "بالشتک چربی خلفی: افیوژن و شک به شکستگی"),
        text: L("Ein sichtbares posteriores Fettkissen im echten Seitenbild spricht für einen Gelenkerguss. Nach Trauma ist eine okkulte Fraktur möglich; das Zeichen legt weder Frakturort noch Mason-Typ fest.", "A visible posterior fat pad on a true lateral view supports joint effusion. After trauma an occult fracture is possible; the sign establishes neither fracture location nor Mason type.", "دیده‌شدن بالشتک چربی خلفی در نمای لترال واقعی به نفع افیوژن مفصل است. پس از تروما شکستگی پنهان ممکن است؛ این علامت نه محل شکستگی و نه نوع ماسون را تعیین می‌کند."),
      },
      {
        title: L('Radiocapitellar Line prüfen', 'Check radiocapitellar line', 'خط رادیوکاپیتلار را بررسی کنید'),
        text: L("Radiokapitellare Stellung in beiden Ebenen prüfen; im echten Seitenbild bevorzugt am Radiushals orientieren. Bei Kindern technische und altersabhängige Abweichungen beachten: Eine auffällige Linie beweist allein keine Luxation.", "Assess radiocapitellar alignment in both planes, using the radial neck as the preferred lateral reference. In children consider technical and age-related variation: an abnormal line alone does not prove dislocation.", "هم‌راستایی رادیوکاپیتلار را در هر دو نما بررسی کنید و در لترال واقعی گردن رادیوس را مرجع قرار دهید. در کودکان تغییرات تکنیکی و وابسته به سن را لحاظ کنید؛ خط غیرطبیعی به‌تنهایی دررفتگی را ثابت نمی‌کند."),
      },
      {
        title: L("Mason I/II: Morphologie und Version", "Mason I/II: morphology and version", "ماسون I و II: مورفولوژی و نسخه"),
        text: L("Typ I ist nicht oder minimal disloziert; Typ II betrifft einen dislozierten Teil des Kopfes. Gelenkstufe und Gelenkflächenanteil messen und die verwendete Modifikation nennen; die PDF-Zahlengrenzen nicht als universellen Therapieauftrag verwenden.", "Type I is nondisplaced or minimally displaced; type II involves a displaced part of the head. Measure the articular step and surface involvement, name the modification used and do not treat the PDF cutoffs as universal treatment instructions.", "نوع I بدون جابه‌جایی یا با جابه‌جایی کم است؛ نوع II بخشی جابه‌جاشده از سر را درگیر می‌کند. پلهٔ مفصلی و سهم سطح درگیر را اندازه بگیرید، نسخهٔ اصلاح‌شده را نام ببرید و آستانه‌های PDF را دستور همگانی درمان ندانید."),
      },
      {
        title: L("Mason III: Ganzkopfbeteiligung", "Mason III: whole-head involvement", "ماسون III: درگیری تمام سر"),
        text: L("Typ III betrifft den gesamten Kopf. Die Fragmentzahl allein trennt II und III nicht: Auch Teilkopffrakturen können mehrfragmentär sein. Rekonstruierbarkeit, Stabilität und Begleitverletzungen beurteilen; Typ III bedeutet keine automatische Prothese.", "Type III involves the entire head. Fragment count alone does not separate II from III: partial-head fractures may also be multifragmentary. Assess reconstructibility, stability and associated injuries; type III does not automatically mandate arthroplasty.", "نوع III تمام سر را درگیر می‌کند. تعداد قطعات به‌تنهایی II را از III جدا نمی‌کند؛ شکستگی بخشی از سر نیز می‌تواند چندقطعه‌ای باشد. قابلیت بازسازی، پایداری و آسیب‌های همراه را ارزیابی کنید؛ نوع III پروتز را خودکار الزامی نمی‌کند."),
      },
      {
        title: L('Assoziierte Verletzungen ausschließen', 'Exclude associated injuries', 'آسیب‌های همراه را رد کنید'),
        text: L('Terrible Triad (Luxation + Radiusköpfchen + Coronoid), Essex-Lopresti (DRUG!), MCL-Ruptur. Immer DRUG klinisch prüfen und Coronoid im Röntgen/CT suchen.', 'Terrible Triad (dislocation + radial head + coronoid), Essex-Lopresti (DRUJ!), MCL rupture. Always clinically test DRUJ and look for coronoid on X-ray/CT.', 'سه‌گانه وحشتناک (لوکساسیون + سر رادیوس + کرونوئید)، اسکس-لوپرستی (DRUJ!)، پارگی MCL. همیشه DRUJ را بالینی آزمایش کنید و کرونوئید را روی رادیوگرافی/CT جستجو کنید.'),
      },
    ],
  },
}

const LETTERS = ['A', 'B', 'C', 'D', 'E']
const Q = (id, question, options, correct, explanation, wrong, source) => ({
  id,
  question,
  options: options.map((text, i) => ({ id: LETTERS[i], text })),
  correct: LETTERS[correct],
  explanation,
  wrongExplanations: Object.fromEntries(Object.entries(wrong).map(([key, value]) => [key, value[id.match(/-(de|en|fa)$/)[1]]])),
  source,
})
const F = (id, category, front, answer, explanation, source) => ({ id, category, front, answer, explanation, source })

export const RADIUSKOPF_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, [

  Q(`rk-mason-1-${lang}`,
    {"de":"Welche Frakturmorphologie entspricht Mason II im deskriptiven Schema mit Johnston-Erweiterung?","en":"Which fracture morphology corresponds to Mason II in the descriptive scheme with the Johnston extension?","fa":"در طرح توصیفی ماسون با گسترش جانستون، کدام مورفولوژی شکستگی با نوع II مطابقت دارد؟"}[lang],
    [{"de":"Nicht dislozierte Fissur oder Randfraktur","en":"Nondisplaced fissure or marginal fracture","fa":"ترک یا شکستگی حاشیه‌ای بدون جابه‌جایی"}[lang],
     {"de":"Dislozierte Fraktur eines Teils des Radiusköpfchens","en":"Displaced fracture involving part of the radial head","fa":"شکستگی جابه‌جا‌شدهٔ بخشی از سر رادیوس"}[lang],
     {"de":"Mehrfragmentäre Fraktur des gesamten Radiusköpfchens","en":"Comminuted fracture involving the entire radial head","fa":"شکستگی چندقطعه‌ای تمام سر رادیوس"}[lang],
     {"de":"Radiusköpfchenfraktur mit Ellenbogenluxation","en":"Radial head fracture with elbow dislocation","fa":"شکستگی سر رادیوس همراه دررفتگی آرنج"}[lang]],
    1,
    {"de":"Mason II beschreibt eine dislozierte Teilkopffraktur; eine Ganzkopffraktur gehört zu III, eine zusätzliche Ellenbogenluxation zur Johnston-Erweiterung IV. Auch Teilkopffrakturen können mehrfragmentär sein. Stufenhöhe und Gelenkflächenanteil im Befund messen und die verwendete Modifikation nennen, statt unterschiedliche Zahlengrenzen als universell zu vermischen.","en":"Mason II describes a displaced partial-head fracture; a whole-head fracture corresponds to III, and associated elbow dislocation to Johnston type IV. Partial-head fractures can also be multifragmentary. Measure displacement and articular involvement and identify the classification modification rather than mixing numerical definitions into a universal rule.","fa":"ماسون II شکستگی جابه‌جا‌شدهٔ بخشی از سر رادیوس را توصیف می‌کند؛ شکستگی تمام سر در نوع III و دررفتگی همراه آرنج در گسترش جانستون، نوع IV است. شکستگی بخشی از سر نیز می‌تواند چندقطعه‌ای باشد. جابه‌جایی و میزان درگیری سطح مفصلی را اندازه‌گیری و نسخهٔ طبقه‌بندی را مشخص کنید؛ مرزهای عددی نسخه‌های مختلف را به یک قاعدهٔ همگانی تبدیل نکنید."}[lang],
    {"A":{"de":"Fissur/Randfraktur ohne Dislokation entspricht dem Grundmuster von Typ I.","en":"A nondisplaced fissure or marginal fracture is the basic type-I pattern.","fa":"ترک یا شکستگی حاشیه‌ای بدون جابه‌جایی، الگوی پایهٔ نوع I است."},"C":{"de":"Die Beteiligung des gesamten Kopfes kennzeichnet hier Typ III; Fragmentzahl allein trennt II und III nicht.","en":"Whole-head involvement characterizes type III here; fragment count alone does not distinguish II from III.","fa":"درگیری تمام سر در اینجا مشخصهٔ نوع III است؛ تعداد قطعات به‌تنهایی II را از III جدا نمی‌کند."},"D":{"de":"Die Ellenbogenluxation führt in der Johnston-Erweiterung zur Kategorie IV.","en":"Elbow dislocation places the injury in Johnston type IV.","fa":"در گسترش جانستون، دررفتگی آرنج آسیب را در نوع IV قرار می‌دهد."}},
    "https://pubmed.ncbi.nlm.nih.gov/20566295/; MSK.pdf physical15 /printed14"
  ),

  Q(`rk-mason-2-${lang}`,
    {"de":"Was definiert Mason Typ IV?","en":"What defines Mason Type IV?","fa":"ماسون نوع IV چه چیزی را تعریف می‌کند؟"}[lang],
    [{"de":"Mehrfragmentäre Ganzkopffraktur ohne Ellenbogenluxation","en":"Comminuted whole-head fracture without elbow dislocation","fa":"شکستگی چندقطعه‌ای تمام سر بدون دررفتگی آرنج"}[lang],
     {"de":"Radiusköpfchenfraktur kombiniert mit einer Ellenbogenluxation","en":"Radial head fracture combined with elbow dislocation","fa":"شکستگی سر رادیوس همراه دررفتگی آرنج"}[lang],
     {"de":"Dislozierte Teilkopffraktur ohne Ellenbogenluxation","en":"Displaced partial-head fracture without elbow dislocation","fa":"شکستگی جابه‌جا‌شدهٔ بخشی از سر بدون دررفتگی آرنج"}[lang],
     {"de":"Radiusköpfchenfraktur mit IOM-/DRUJ-Verletzung ohne Ellenbogenluxation","en":"Radial head fracture with IOM/DRUJ injury but no elbow dislocation","fa":"شکستگی سر رادیوس همراه آسیب IOM/DRUJ، بدون دررفتگی آرنج"}[lang]],
    1,
    {"de":"In der Johnston-Erweiterung ist Typ IV die Kombination aus Radiusköpfchenfraktur und Ellenbogenluxation. Der gesamte Verletzungskomplex wird zusätzlich beschrieben; Fragmentzahl allein definiert IV nicht.","en":"In the Johnston extension, type IV combines a radial head fracture with elbow dislocation. Describe the full associated injury pattern separately; fragment count alone does not define IV.","fa":"در گسترش جانستون، نوع IV ترکیب شکستگی سر رادیوس و دررفتگی آرنج است. مجموعهٔ کامل آسیب‌های همراه را نیز توصیف کنید؛ تعداد قطعات به‌تنهایی نوع IV را تعریف نمی‌کند."}[lang],
    {"A":{"de":"Eine mehrfragmentäre Ganzkopffraktur ohne Luxation entspricht dem Typ-III-Muster.","en":"A comminuted whole-head fracture without dislocation is the type-III pattern.","fa":"شکستگی چندقطعه‌ای تمام سر بدون دررفتگی، الگوی نوع III است."},"C":{"de":"Eine dislozierte Teilkopffraktur ohne Ellenbogenluxation beschreibt das Typ-II-Muster.","en":"A displaced partial-head fracture without elbow dislocation describes the type-II pattern.","fa":"شکستگی جابه‌جا‌شدهٔ بخشی از سر بدون دررفتگی آرنج، الگوی نوع II است."},"D":{"de":"IOM-/DRUJ-Verletzungen sprechen für eine Essex-Lopresti-Konstellation; sie ersetzen das Luxationskriterium von IV nicht.","en":"IOM/DRUJ injury suggests an Essex–Lopresti pattern; it does not substitute for the elbow-dislocation criterion of IV.","fa":"آسیب IOM/DRUJ الگوی اسکس–لوپرستی را مطرح می‌کند و جای معیار دررفتگی آرنج برای نوع IV را نمی‌گیرد."}},
    "MSK.pdf physical15 /printed14; https://pubmed.ncbi.nlm.nih.gov/20566295/"
  ),

  Q(`rk-fettkissen-1-${lang}`,
    {"de":"Nach einem Ellenbogentrauma beim Erwachsenen ist im echten Seitenbild ein posteriores Fettkissen abgehoben, eine Fraktur aber nicht sichtbar. Welche Einordnung passt?","en":"After elbow trauma in an adult, a true lateral view shows an elevated posterior fat pad but no visible fracture. Which interpretation fits?","fa":"پس از ترومای آرنج در بزرگسال، در نمای لترال واقعی بالشتک چربی خلفی بالا آمده است، اما شکستگی دیده نمی‌شود. کدام تفسیر مناسب است؟"}[lang],
    [{"de":"Normale Fettkissenlage ohne Gelenkerguss","en":"Normal fat-pad position without joint effusion","fa":"وضعیت طبیعی بالشتک چربی بدون افیوژن مفصل"}[lang],
     {"de":"Gelenkerguss mit möglicher okkulter Fraktur","en":"Joint effusion with a possible occult fracture","fa":"افیوژن مفصل همراه شکستگی پنهان احتمالی"}[lang],
     {"de":"Bereits gesicherte okkulte Mason-I-Radiusköpfchenfraktur","en":"An already established occult Mason-I radial head fracture","fa":"شکستگی پنهان ماسون I سر رادیوس که از پیش اثبات شده است"}[lang],
     {"de":"Bereits gesicherte okkulte Olekranonfraktur","en":"An already established occult olecranon fracture","fa":"شکستگی پنهان اولکرانون که از پیش اثبات شده است"}[lang]],
    1,
    {"de":"Ein abgehobenes posteriores Fettkissen spricht für einen Erguss und im Traumakontext für eine mögliche okkulte Fraktur. Es legt weder den Frakturort noch einen Mason-Typ fest. Bei fortbestehendem Frakturverdacht kommen je nach klinischer Frage eine Röntgenkontrolle nach 10–14 Tagen oder CT ohne Kontrastmittel infrage.","en":"An elevated posterior fat pad supports an effusion and, after trauma, a possible occult fracture. It establishes neither fracture location nor a Mason type. If fracture suspicion persists, repeat radiographs after 10–14 days or noncontrast CT may be appropriate according to the clinical question.","fa":"بالا آمدن بالشتک چربی خلفی به نفع افیوژن و در زمینهٔ تروما مطرح‌کنندهٔ شکستگی پنهان احتمالی است. این علامت نه محل شکستگی و نه نوع ماسون را تعیین می‌کند. در صورت تداوم شک به شکستگی، بر اساس پرسش بالینی می‌توان رادیوگرافی پیگیری پس از ۱۰ تا ۱۴ روز یا CT بدون کنتراست را در نظر گرفت."}[lang],
    {"A":{"de":"Ein abgehobenes posteriores Fettkissen im echten Seitenbild spricht für einen Erguss und ist nach Trauma kein unauffälliges Fettmuster.","en":"An elevated posterior fat pad on a true lateral view supports effusion rather than an unremarkable post-traumatic fat pattern.","fa":"بالا آمدن بالشتک خلفی در نمای لترال واقعی به نفع افیوژن است، نه الگوی چربی طبیعی پس از تروما."},"C":{"de":"Eine okkulte Radiusköpfchenfraktur ist möglich, aber das Ergusszeichen allein legt weder den Frakturort noch den Mason-Typ fest.","en":"An occult radial head fracture is possible, but the effusion sign alone determines neither fracture location nor Mason type.","fa":"شکستگی پنهان سر رادیوس ممکن است، اما علامت افیوژن به‌تنهایی نه محل شکستگی و نه نوع ماسون را تعیین می‌کند."},"D":{"de":"Auch andere Frakturorte können hinter einem Erguss stehen; das Fettkissenzeichen lokalisiert nicht sicher zum Olekranon.","en":"Other fracture sites can underlie an effusion; the fat-pad sign does not securely localize an olecranon fracture.","fa":"محل‌های دیگر شکستگی نیز می‌توانند با افیوژن همراه باشند؛ علامت بالشتک چربی شکستگی اولکرانون را به‌طور قطعی مشخص نمی‌کند."}},
    "https://pubmed.ncbi.nlm.nih.gov/15232392/; https://acsearch.acr.org/docs/3195154/Narrative"
  ),

  Q(`rk-rcline-1-${lang}`,
    {"de":"Welche Orientierung beurteilt die radiokapitellare Stellung im kindlichen Röntgen am zuverlässigsten?","en":"Which reference most reliably assesses radiocapitellar alignment on pediatric radiographs?","fa":"کدام مرجع برای ارزیابی هم‌راستایی رادیوکاپیتلار در رادیوگرافی کودک قابل‌اتکاتر است؟"}[lang],
    [{"de":"Radiusschaftachse in der AP-Aufnahme mit Zentrierung auf den Capitulumkern","en":"Radial-shaft axis on the AP view, centered on the capitellar ossification centre","fa":"محور تنهٔ رادیوس در نمای AP با هدف‌گیری مرکز هستهٔ استخوانی‌شدن کاپیتولوم"}[lang],
     {"de":"Radiushalsachse im echten Seitenbild, mit Berücksichtigung von Alter und Projektion","en":"Radial-neck axis on a true lateral view, interpreted with age and projection","fa":"محور گردن رادیوس در نمای لترال واقعی، با توجه به سن و نما"}[lang],
     {"de":"Radiusschaftachse im Seitenbild mit Zentrierung auf den Capitulumkern","en":"Radial-shaft axis on the lateral view, centered on the capitellar ossification centre","fa":"محور تنهٔ رادیوس در نمای لترال با هدف‌گیری مرکز هستهٔ استخوانی‌شدن کاپیتولوم"}[lang],
     {"de":"Vordere Humeruslinie im Seitenbild als radiokapitellare Referenz","en":"Anterior humeral line on the lateral view as a radiocapitellar reference","fa":"خط قدامی هومروس در نمای لترال به‌عنوان مرجع رادیوکاپیتلار"}[lang]],
    1,
    {"de":"Eine entlang des Radiushalses gezogene Linie ist im echten Seitenbild die verlässlichere Orientierung. Bei Kindern beeinflussen Alter, Ossifikation und Projektion die Beziehung zum Capitulum; selbst eine normale Linie trifft nicht immer dessen Zentrum. Fehlende Deckung erfordert eine Prüfung der Technik und der gesamten Gelenkstellung, beweist allein aber keine Luxation.","en":"A line along the radial neck on a true lateral view is the more reliable reference. In children, age, ossification and projection affect its relationship to the capitellum; a normal line does not invariably cross its centre. Nonintersection warrants checking technique and overall joint alignment but does not alone prove dislocation.","fa":"خط در امتداد گردن رادیوس در نمای لترال واقعی مرجع قابل‌اتکاتری است. در کودکان، سن، استخوانی‌شدن و نما بر رابطهٔ خط با کاپیتولوم اثر دارند؛ خط طبیعی نیز همیشه از مرکز آن عبور نمی‌کند. عبور نکردن خط نیازمند بررسی تکنیک و هم‌راستایی کلی مفصل است، اما به‌تنهایی دررفتگی را ثابت نمی‌کند."}[lang],
    {"A":{"de":"Die Normalkinder-Studie fand die Halslinie im Seitenbild verlässlicher als die Schaftlinie in AP; zentrale Treffgenauigkeit ist außerdem altersabhängig.","en":"The normal-child study found the lateral neck line more reliable than the AP shaft line; central intersection also varies with age.","fa":"مطالعهٔ کودکان طبیعی، خط گردن در نمای لترال را از خط تنه در AP قابل‌اتکاتر یافت؛ عبور از مرکز نیز با سن تغییر می‌کند."},"C":{"de":"Die gebogene Radiusachse kann die Schaftlinie versetzen; die Halslinie im echten Seitenbild war die verlässlichere Orientierung.","en":"Radial bowing can alter the shaft line; the neck line on a true lateral view was the more reliable reference.","fa":"قوس رادیوس می‌تواند خط تنه را تغییر دهد؛ خط گردن در نمای لترال واقعی مرجع قابل‌اتکاتری بود."},"D":{"de":"Die vordere Humeruslinie beschreibt einen humeralen Bezug; sie ersetzt nicht die Radius-Hals-Linie zur radiokapitellaren Stellung.","en":"The anterior humeral line is a humeral reference and does not replace the radial-neck line for radiocapitellar alignment.","fa":"خط قدامی هومروس مرجعی مربوط به هومروس است و جای خط گردن رادیوس را برای هم‌راستایی رادیوکاپیتلار نمی‌گیرد."}},
    "https://pubmed.ncbi.nlm.nih.gov/21841436/"
  ),

  Q(`rk-therapie-1-${lang}`,
    {"de":"CT beschreibt eine dislozierte Fraktur eines Teils des Radiusköpfchens mit drei Gelenkfragmenten; der übrige Kopf bleibt zusammenhängend. Eine Ellenbogenluxation liegt nicht vor. Welcher Mason-Typ passt zur deskriptiven Morphologie?","en":"CT describes a displaced fracture involving part of the radial head with three articular fragments; the remainder of the head stays continuous. There is no elbow dislocation. Which Mason type fits the descriptive morphology?","fa":"CT شکستگی جابه‌جا‌شدهٔ بخشی از سر رادیوس با سه قطعهٔ مفصلی را توصیف می‌کند؛ بقیهٔ سر پیوسته باقی مانده است. دررفتگی آرنج وجود ندارد. کدام نوع ماسون با مورفولوژی توصیفی سازگار است؟"}[lang],
    [{"de":"II","en":"II","fa":"II"}[lang],
     {"de":"III","en":"III","fa":"III"}[lang],
     {"de":"I","en":"I","fa":"I"}[lang],
     {"de":"IV","en":"IV","fa":"IV"}[lang]],
    0,
    {"de":"Die Teilkopfbeteiligung passt zu Mason II, auch wenn mehrere Fragmente vorliegen. Die primäre 3D-CT-Studie zeigte, dass Teilkopffrakturen häufig mehrfragmentär sind; Typ III beschreibt die Ganzkopffraktur. Fragmentzahl und Rekonstruierbarkeit müssen separat beurteilt werden.","en":"Partial-head involvement fits Mason II even when multiple fragments are present. The primary 3D-CT study found that partial-head fractures are frequently multifragmentary; type III describes whole-head involvement. Assess fragment count and reconstructibility separately.","fa":"درگیری بخشی از سر با ماسون II سازگار است، حتی اگر چند قطعه وجود داشته باشد. مطالعهٔ اولیهٔ CT سه‌بعدی نشان داد شکستگی بخشی از سر اغلب چندقطعه‌ای است؛ نوع III درگیری تمام سر را توصیف می‌کند. تعداد قطعات و امکان بازسازی باید جداگانه ارزیابی شوند."}[lang],
    {"B":{"de":"Drei Fragmente allein machen keine Ganzkopffraktur. Der erhaltene zusammenhängende Kopfanteil ist hier entscheidend.","en":"Three fragments alone do not make a whole-head fracture. The remaining continuous part of the head is decisive here.","fa":"سه قطعه به‌تنهایی به معنی شکستگی تمام سر نیست؛ بخش پیوستهٔ باقی‌ماندهٔ سر در اینجا اهمیت دارد."},"C":{"de":"Die beschriebene dislozierte Teilkopffraktur entspricht nicht dem nicht/minimal dislozierten Typ-I-Grundmuster.","en":"The described displaced partial-head fracture does not fit the nondisplaced/minimally displaced type-I pattern.","fa":"شکستگی جابه‌جا‌شدهٔ بخشی از سر با الگوی پایهٔ نوع I بدون یا با حداقل جابه‌جایی مطابقت ندارد."},"D":{"de":"Die für Typ IV zusätzliche Ellenbogenluxation fehlt in der Beschreibung.","en":"The associated elbow dislocation required for type IV is absent from the description.","fa":"دررفتگی همراه آرنج که برای نوع IV لازم است، در توصیف وجود ندارد."}},
    "https://pubmed.ncbi.nlm.nih.gov/20566295/; MSK.pdf physical15 /printed14"
  ),

  Q(`rk-terrible-triad-1-${lang}`,
    {"de":"Welche Verletzungskombination bezeichnet die Terrible Triad des Ellenbogens?","en":"Which injury combination defines the terrible triad of the elbow?","fa":"کدام ترکیب آسیب، سه‌گانهٔ وحشتناک آرنج را تعریف می‌کند؟"}[lang],
    [{"de":"Ellenbogenluxation + Radiusköpfchenfraktur + Olekranonfraktur","en":"Elbow dislocation + radial head fracture + olecranon fracture","fa":"دررفتگی آرنج + شکستگی سر رادیوس + شکستگی اولکرانون"}[lang],
     {"de":"Ellenbogenluxation + Radiusköpfchenfraktur + Coronoidfraktur","en":"Elbow dislocation + radial head fracture + coronoid fracture","fa":"دررفتگی آرنج + شکستگی سر رادیوس + شکستگی کرونوئید"}[lang],
     {"de":"Ellenbogenluxation + distale Humerusfraktur + Coronoidfraktur","en":"Elbow dislocation + distal humeral fracture + coronoid fracture","fa":"دررفتگی آرنج + شکستگی دیستال هومروس + شکستگی کرونوئید"}[lang],
     {"de":"Ellenbogenluxation + Radiushalsfraktur + Ulnaschaftfraktur","en":"Elbow dislocation + radial neck fracture + ulnar shaft fracture","fa":"دررفتگی آرنج + شکستگی گردن رادیوس + شکستگی تنهٔ اولنا"}[lang]],
    1,
    {"de":"Die Kombination ist häufig instabil. Stabilität und jede Begleitverletzung beurteilen; die Therapie wird anhand des Gesamtbefunds, der Rekonstruierbarkeit und patientenbezogener Faktoren geplant. Eine operative Versorgung aller Komponenten oder ein MRT ist nicht automatisch erforderlich.","en":"This combination is often unstable. Assess stability and each associated injury; plan treatment based on the overall findings, reconstructibility, and patient factors. Surgery for every component or MRI is not automatic.","fa":"این ترکیب اغلب ناپایدار است. پایداری و هر آسیب همراه را ارزیابی کنید؛ درمان را بر اساس مجموع یافته‌ها، قابلیت بازسازی و عوامل مربوط به بیمار برنامه‌ریزی کنید. جراحی همهٔ مؤلفه‌ها یا MRI به‌طور خودکار لازم نیست."}[lang],
    {"A":{"de":"Der Begriff verlangt die Coronoidfraktur; eine Olekranonfraktur ist eine andere knöcherne Begleitverletzung.","en":"The definition requires a coronoid fracture; an olecranon fracture is a different associated bony injury.","fa":"تعریف به شکستگی کرونوئید نیاز دارد؛ شکستگی اولکرانون، آسیب استخوانی همراه متفاوتی است."},"C":{"de":"Hier fehlt die definierende Radiusköpfchenfraktur. Eine distale Humerusfraktur ersetzt sie nicht.","en":"The defining radial head fracture is missing; a distal humeral fracture does not replace it.","fa":"شکستگی تعریف‌کنندهٔ سر رادیوس در این گزینه وجود ندارد؛ شکستگی دیستال هومروس جای آن را نمی‌گیرد."},"D":{"de":"Radiushals- und Ulnaschaftfraktur bilden nicht die verlangte Kombination aus Radiusköpfchen- und Coronoidfraktur.","en":"Radial-neck and ulnar-shaft fractures do not form the required radial-head/coronoid fracture combination.","fa":"شکستگی گردن رادیوس و تنهٔ اولنا، ترکیب لازمِ شکستگی سر رادیوس و کرونوئید را تشکیل نمی‌دهند."}},
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC4048392/"
  ),

  Q(`rk-essex-1-${lang}`,
    {"de":"Welche Kombination kennzeichnet die Essex-Lopresti-Verletzung?","en":"Which combination characterizes an Essex–Lopresti injury?","fa":"کدام ترکیب، آسیب اسکس–لوپرستی را مشخص می‌کند؟"}[lang],
    [{"de":"Radiusköpfchenfraktur + proximale Ulnafraktur + proximale Radiusluxation","en":"Radial head fracture + proximal ulnar fracture + proximal radial dislocation","fa":"شکستگی سر رادیوس + شکستگی پروگزیمال اولنا + دررفتگی پروگزیمال رادیوس"}[lang],
     {"de":"Radiusköpfchenfraktur + IOM-Ruptur + DRUJ-Verletzung","en":"Radial head fracture + IOM rupture + DRUJ injury","fa":"شکستگی سر رادیوس + پارگی IOM + آسیب DRUJ"}[lang],
     {"de":"Radiusköpfchenfraktur + Coronoidfraktur + Ellenbogenluxation","en":"Radial head fracture + coronoid fracture + elbow dislocation","fa":"شکستگی سر رادیوس + شکستگی کرونوئید + دررفتگی آرنج"}[lang],
     {"de":"Radiusschaftfraktur + DRUJ-Luxation + Ulnastyloidfraktur","en":"Radial shaft fracture + DRUJ dislocation + ulnar styloid fracture","fa":"شکستگی تنهٔ رادیوس + دررفتگی DRUJ + شکستگی استیلوئید اولنا"}[lang]],
    1,
    {"de":"Essex-Lopresti = Radiusköpfchenfraktur + Ruptur der Membrana interossea + DRUG-Verletzung; das Muster kann longitudinale Unterarminstabilität verursachen. DRUG und Unterarmlänge/Stabilität prüfen. Bei bestätigter Instabilität wird die radiale Länge erhalten oder wiederhergestellt; Fixation oder Ersatz richten sich nach Rekonstruierbarkeit und Begleitverletzungen.","en":"Essex-Lopresti = radial head fracture + interosseous membrane rupture + DRUJ injury; the pattern can cause longitudinal forearm instability. Assess the DRUJ and forearm length/stability. With confirmed instability, preserve or restore radial length; fixation or replacement depends on reconstructibility and associated injuries.","fa":"اسکس-لوپرستی = شکستگی سر رادیوس + پارگی غشای بین‌استخوانی + آسیب DRUJ؛ این الگو می‌تواند موجب ناپایداری طولی ساعد شود. DRUJ و طول/پایداری ساعد را ارزیابی کنید. در ناپایداری تأییدشده، طول رادیوس حفظ یا بازسازی می‌شود؛ تثبیت یا جایگزینی به قابلیت بازسازی و آسیب‌های همراه بستگی دارد."}[lang],
    {"A":{"de":"Die proximale Ulna-/Radiuskonstellation lenkt auf eine Monteggia-assoziierte Verletzung; die longitudinale IOM-/DRUJ-Komponente der Essex-Lopresti-Verletzung ist damit nicht beschrieben.","en":"The proximal ulnar/radial pattern points toward a Monteggia-associated injury; it does not describe the longitudinal IOM/DRUJ components of Essex–Lopresti injury.","fa":"ترکیب پروگزیمال اولنا/رادیوس آسیب همراهِ مونتگیا را مطرح می‌کند و اجزای طولی IOM/DRUJ در اسکس–لوپرستی را توصیف نمی‌کند."},"C":{"de":"Dies ist die Terrible-Triad-Kombination am Ellenbogen, nicht die definierende IOM-/DRUJ-Konstellation.","en":"This is the terrible-triad combination at the elbow, not the defining IOM/DRUJ pattern.","fa":"این ترکیب سه‌گانهٔ وحشتناک آرنج است، نه الگوی تعریف‌کنندهٔ IOM/DRUJ."},"D":{"de":"Radiusschaftfraktur mit DRUJ-Luxation gehört zur Galeazzi-Konstellation; die proximale Radiusköpfchenfraktur und IOM-Ruptur werden hier nicht beschrieben.","en":"Radial-shaft fracture with DRUJ dislocation is a Galeazzi pattern; the proximal radial-head fracture and IOM rupture are not described here.","fa":"شکستگی تنهٔ رادیوس همراه دررفتگی DRUJ الگوی گالئاتزی است؛ شکستگی پروگزیمال سر رادیوس و پارگی IOM در این گزینه توصیف نشده‌اند."}},
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC5895887/"
  ),

  Q(`rk-mechanismus-1-${lang}`,
    {"de":"Welcher direkte Kraftweg erklärt die axiale Kompression des Radiusköpfchens beim Sturz auf die Hand?","en":"Which direct force pathway explains axial compression of the radial head after a fall onto the hand?","fa":"کدام مسیر مستقیم انتقال نیرو، فشرده‌شدن محوری سر رادیوس را پس از افتادن روی دست توضیح می‌دهد؟"}[lang],
    [{"de":"Ulna → Trochlea humeri","en":"Ulna → humeral trochlea","fa":"از اولنا به تروکلئای هومروس"}[lang],
     {"de":"Radius → Capitulum humeri","en":"Radius → humeral capitellum","fa":"از رادیوس به کاپیتولوم هومروس"}[lang],
     {"de":"Radius → Trochlea humeri","en":"Radius → humeral trochlea","fa":"از رادیوس به تروکلئای هومروس"}[lang],
     {"de":"Ulna → Capitulum humeri","en":"Ulna → humeral capitellum","fa":"از اولنا به کاپیتولوم هومروس"}[lang]],
    1,
    {"de":"Axiale Last kann über den Radius auf das Capitulum übertragen werden und dort das Radiusköpfchen komprimieren. Unterarmrotation und zusätzliche Kräfte beeinflussen das Verletzungsmuster; Pronation ist keine Voraussetzung aller Radiusköpfchenfrakturen.","en":"Axial load can be transmitted through the radius to the capitellum, compressing the radial head at that contact. Forearm rotation and additional forces influence the injury pattern; pronation is not a prerequisite of every radial head fracture.","fa":"بار محوری می‌تواند از راه رادیوس به کاپیتولوم منتقل شود و سر رادیوس را در این محل تماس بفشارد. چرخش ساعد و نیروهای همراه بر الگوی آسیب اثر دارند؛ پروناسیون شرط لازم تمام شکستگی‌های سر رادیوس نیست."}[lang],
    {"A":{"de":"Der ulnatrochleare Weg gehört zur Ellenbogenlastübertragung, beschreibt aber nicht den direkten Kontakt des Radiusköpfchens mit dem Capitulum.","en":"The ulnotrochlear pathway contributes to elbow load transfer but does not describe direct radial-head/capitellar contact.","fa":"مسیر اولنوتروکلئار در انتقال بار آرنج نقش دارد، اما تماس مستقیم سر رادیوس با کاپیتولوم را توصیف نمی‌کند."},"C":{"de":"Der proximale Radius artikuliert im hier gefragten Kontakt mit dem Capitulum, nicht der Trochlea.","en":"At the requested contact, the proximal radius articulates with the capitellum, not the trochlea.","fa":"در تماس مورد سؤال، پروگزیمال رادیوس با کاپیتولوم مفصل می‌شود، نه تروکلئا."},"D":{"de":"Der direkte humerale Kontakt des Radiusköpfchens ist radiokapitellar; die Ulna ist nicht dessen Ersatz.","en":"The radial head’s direct humeral contact is radiocapitellar; the ulna does not substitute for it.","fa":"تماس مستقیم سر رادیوس با هومروس، رادیوکاپیتلار است؛ اولنا جای آن را نمی‌گیرد."}},
    "https://pubmed.ncbi.nlm.nih.gov/14668511/; https://pmc.ncbi.nlm.nih.gov/articles/PMC6451781/"
  ),

  Q(`rk-nerv-1-${lang}`,
    {"de":"Nach einer Radiusköpfchenfraktur sind Finger- und Daumenextension geschwächt. Handgelenkextension ist erhalten, die kutane Sensibilität unauffällig. Welche isolierte Nervenläsion passt am besten?","en":"After a radial head fracture, finger and thumb extension are weak. Wrist extension is preserved and cutaneous sensation is intact. Which isolated nerve lesion fits best?","fa":"پس از شکستگی سر رادیوس، اکستنشن انگشتان و شست ضعیف است. اکستنشن مچ حفظ شده و حس پوستی طبیعی است. کدام آسیب منفرد عصبی مناسب‌تر است؟"}[lang],
    [{"de":"N. medianus","en":"Median nerve","fa":"عصب مدیان"}[lang],
     {"de":"N. ulnaris","en":"Ulnar nerve","fa":"عصب اولنار"}[lang],
     {"de":"N. interosseus posterior","en":"Posterior interosseous nerve","fa":"عصب بین‌استخوانی خلفی"}[lang],
     {"de":"R. superficialis des N. radialis","en":"Superficial branch of the radial nerve","fa":"شاخهٔ سطحی عصب رادیال"}[lang]],
    2,
    {"de":"Der N. interosseus posterior verläuft nahe dem Radiusköpfchen und kann bei der Operation verletzt werden. Eine isolierte Läsion schwächt die Finger- und Daumenextension ohne kutanen Sensibilitätsausfall. Die Handgelenkextension bleibt durch den erhaltenen M. extensor carpi radialis longus typischerweise möglich, gegebenenfalls mit Radialabweichung.","en":"The posterior interosseous nerve runs near the radial head and may be injured during surgery. An isolated lesion weakens finger and thumb extension without cutaneous sensory loss. Wrist extension is typically preserved by the spared extensor carpi radialis longus, sometimes with radial deviation.","fa":"عصب بین‌استخوانی خلفی نزدیک سر رادیوس می‌گذرد و ممکن است هنگام جراحی آسیب ببیند. آسیب منفرد آن اکستنشن انگشتان و شست را بدون نقص حسی پوستی ضعیف می‌کند. اکستنشن مچ معمولاً به‌واسطهٔ حفظ عضلهٔ اکستانسور کارپی رادیالیس لونگوس باقی می‌ماند و ممکن است با انحراف رادیال همراه باشد."}[lang],
    {"A":{"de":"Eine Medianusläsion erklärt dieses isolierte Finger-/Daumenstreckdefizit bei erhaltener kutaner Sensibilität nicht am besten.","en":"A median nerve lesion does not best explain this isolated finger/thumb extension deficit with preserved cutaneous sensation.","fa":"آسیب مدیان بهترین توضیح برای این ضعف منفرد اکستنشن انگشتان/شست همراه حس پوستی حفظ‌شده نیست."},"B":{"de":"Der Ulnaris versorgt nicht das hier ausgefallene Finger-/Daumenstrecksystem; ein ulnarer Ausfall hätte ein anderes motorisch-sensibles Muster.","en":"The ulnar nerve does not supply the impaired finger/thumb extensor system; ulnar injury produces a different motor-sensory pattern.","fa":"عصب اولنار، سیستم اکستانسور انگشتان/شستِ درگیر در اینجا را عصب‌دهی نمی‌کند؛ آسیب آن الگوی حرکتی‌ـ‌حسی متفاوتی دارد."},"D":{"de":"Der oberflächliche Radialisast ist sensibel und erklärt keine isolierte Parese dieser Streckmuskeln.","en":"The superficial radial branch is sensory and does not explain isolated weakness of these extensors.","fa":"شاخهٔ سطحی رادیال حسی است و ضعف منفرد این عضلات اکستانسور را توضیح نمی‌دهد."}},
    "https://pubmed.ncbi.nlm.nih.gov/28050547/; https://pubmed.ncbi.nlm.nih.gov/20079998/"
  ),

  Q(`rk-mason-therapie-2-${lang}`,
    {"de":"Ein 35-jähriger Patient hat nach FOOSH-Trauma eine rekonstruierbare Mason-II-Fraktur. Nach Analgesie und Gelenkaspiration bleibt ein eindeutiger mechanischer Block der Pro- und Supination bestehen. Welche Therapie ist am ehesten indiziert?","en":"A 35-year-old patient has a reconstructible Mason II fracture after FOOSH trauma. After analgesia and joint aspiration, a clear mechanical block to pronation and supination persists. Which treatment is most appropriate?","fa":"بیمار ۳۵ ساله پس از افتادن روی دست کشیده (FOOSH) دچار شکستگی قابل بازسازی ماسون II شده است. پس از بی‌دردی و آسپیراسیون مفصل، بلوک مکانیکی واضح پروناسیون و سوپیناسیون باقی می‌ماند. مناسب‌ترین درمان چیست؟"}[lang],
    [{"de":"Frühfunktionelle nichtoperative Behandlung ohne Reposition","en":"Early functional nonoperative treatment without reduction","fa":"درمان غیرجراحی با حرکت زودهنگام، بدون جااندازی"}[lang],
     {"de":"Reposition und interne Fixation des rekonstruierbaren Fragments","en":"Reduction and internal fixation of the reconstructible fragment","fa":"جااندازی و تثبیت داخلی قطعهٔ قابل بازسازی"}[lang],
     {"de":"Primärer Ersatz des Radiusköpfchens","en":"Primary radial head replacement","fa":"جایگزینی اولیهٔ سر رادیوس"}[lang],
     {"de":"Primäre Resektion des Radiusköpfchens ohne Ersatz","en":"Primary radial head excision without replacement","fa":"برداشت اولیهٔ سر رادیوس بدون جایگزینی"}[lang]],
    1,
    {"de":"Der nach Schmerzausschaltung persistierende mechanische Block verlangt hier eine operative Beurteilung. Unter den genannten Optionen erlaubt Reposition/Fixation den Erhalt der rekonstruierbaren Gelenkfläche. Die konkrete Technik richtet sich nach Fragmentmorphologie und erreichbarer Stabilität; nicht jede Mason-II-Fraktur benötigt Operation, und nicht jede Operation ist zwingend eine offene Schraubenfixation.","en":"A persistent mechanical block after pain control requires operative assessment here. Among the listed options, reduction/fixation preserves the reconstructible articular surface. Technique depends on fragment morphology and achievable stability; not every Mason-II fracture requires surgery, and surgery does not invariably mean open screw fixation.","fa":"بلوک مکانیکی باقی‌مانده پس از کنترل درد، در اینجا به ارزیابی جراحی نیاز دارد. در میان گزینه‌ها، جااندازی/تثبیت امکان حفظ سطح مفصلیِ قابل بازسازی را فراهم می‌کند. روش دقیق به مورفولوژی قطعه و پایداری قابل دستیابی بستگی دارد؛ همهٔ شکستگی‌های ماسون II به جراحی نیاز ندارند و هر جراحی نیز الزاماً تثبیت باز با پیچ نیست."}[lang],
    {"A":{"de":"Der bestätigte mechanische Rotationsblock wird durch bloße Mobilisation ohne Korrektur des blockierenden Fragments nicht beseitigt.","en":"Mobilisation alone without addressing the blocking fragment does not resolve the confirmed mechanical rotation block.","fa":"حرکت‌دادن به‌تنهایی، بدون برطرف‌کردن قطعهٔ ایجادکنندهٔ بلوک، بلوک مکانیکی چرخشِ تأییدشده را برطرف نمی‌کند."},"C":{"de":"Die beschriebene gute Rekonstruierbarkeit spricht für eine erhaltende Lösung; ein Ersatz ist nicht allein durch die Typ-II-Bezeichnung begründet.","en":"The stated reconstructibility supports preservation; the type-II label alone does not justify replacement.","fa":"قابلیت بازسازیِ ذکرشده از راهکار حفظ‌کننده حمایت می‌کند؛ نام نوع II به‌تنهایی جایگزینی را توجیه نمی‌کند."},"D":{"de":"Eine primäre Resektion gibt die rekonstruierbare Gelenkfläche auf und erfordert besonders sorgfältige Beurteilung der Begleitstabilität; sie ist hier nicht die bevorzugte erhaltende Option.","en":"Primary excision sacrifices a reconstructible articular surface and requires careful assessment of associated stability; it is not the preferred preserving option here.","fa":"برداشت اولیه، سطح مفصلیِ قابل بازسازی را از بین می‌برد و به بررسی دقیق پایداری همراه نیاز دارد؛ در اینجا گزینهٔ حفظ‌کنندهٔ ترجیحی نیست."}},
    "https://pubmed.ncbi.nlm.nih.gov/33753275/; https://pmc.ncbi.nlm.nih.gov/articles/PMC12487719/"
  ),

  Q(`rk-komplikation-1-${lang}`,
    {"de":"Bei einer einfachen stabilen Radiusköpfchenfraktur ist frühe schmerzadaptierte Bewegung vorgesehen. Welche Komplikation soll damit vor allem vermieden werden?","en":"Early pain-adapted motion is planned for a simple stable radial head fracture. Which complication is this primarily intended to avoid?","fa":"برای شکستگی ساده و پایدار سر رادیوس، حرکت زودهنگام متناسب با درد برنامه‌ریزی شده است. هدف اصلی، پیشگیری از کدام عارضه است؟"}[lang],
    [{"de":"Infektion","en":"Infection","fa":"عفونت"}[lang],
     {"de":"Ellenbogensteifigkeit","en":"Elbow stiffness","fa":"سفتی آرنج"}[lang],
     {"de":"Avaskuläre Nekrose","en":"Avascular necrosis","fa":"نکروز آواسکولار"}[lang],
     {"de":"Isolierte PIN-Parese","en":"Isolated PIN palsy","fa":"ضعف منفرد عصب PIN"}[lang]],
    1,
    {"de":"Ellenbogensteifigkeit ist eine wichtige Komplikation. Bei einfachen stabilen Frakturen unterstützt frühe schmerzadaptierte Bewegung die Funktion; unnötig lange Ruhigstellung vermeiden. Eine starre Wartezeit von 1–2 Wochen und formale Physiotherapie für jeden Fall sind nicht belegt. Die Begleitverletzungen bestimmen die individuelle Nachbehandlung.","en":"Elbow stiffness is an important complication. In simple stable fractures, early pain-adapted motion supports function; avoid unnecessary prolonged immobilisation. A fixed 1–2-week wait and formal physiotherapy for every case are not supported. Associated injuries determine individual rehabilitation.","fa":"سفتی آرنج عارضه‌ای مهم است. در شکستگی ساده و پایدار، حرکت زودهنگام متناسب با درد به عملکرد کمک می‌کند؛ از بی‌حرکتی غیرضروری و طولانی پرهیز شود. انتظار ثابت ۱ تا ۲ هفته و فیزیوتراپی رسمی برای همهٔ موارد پشتوانه ندارد. آسیب‌های همراه برنامهٔ توان‌بخشی فردی را تعیین می‌کنند."}[lang],
    {"A":{"de":"Frühe Bewegung behandelt nicht die Ursachen einer Infektion; das hier angesprochene Ziel ist der Erhalt der Gelenkbeweglichkeit.","en":"Early motion does not treat infection mechanisms; the targeted aim here is preserving joint motion.","fa":"حرکت زودهنگام سازوکارهای عفونت را درمان نمی‌کند؛ هدف مورد سؤال، حفظ حرکت مفصل است."},"C":{"de":"Eine Nekrose ist nicht mit immobilisationsbedingter Gelenksteife gleichzusetzen; Bewegung allein ist kein spezifischer Nekroseschutz.","en":"Necrosis is not equivalent to immobilisation-related stiffness; motion alone is not a specific protection against necrosis.","fa":"نکروز معادل سفتی مفصل ناشی از بی‌حرکتی نیست؛ حرکت به‌تنهایی محافظت اختصاصی در برابر نکروز ایجاد نمی‌کند."},"D":{"de":"Eine PIN-Läsion wird durch die neurologische Untersuchung erfasst; Mobilisation zur Steifevermeidung ersetzt diese Prüfung nicht.","en":"PIN injury is identified by neurological assessment; mobilisation to prevent stiffness does not substitute for that examination.","fa":"آسیب PIN با ارزیابی عصبی بررسی می‌شود؛ حرکت‌دادن برای پیشگیری از سفتی جای این معاینه را نمی‌گیرد."}},
    "https://pubmed.ncbi.nlm.nih.gov/22576643/; https://pubmed.ncbi.nlm.nih.gov/29664851/"
  ),

  Q(`rk-kinder-1-${lang}`,
    {"de":"Bei einem Kind mit Ulnaschaftfraktur bestätigen korrekt eingestellte Aufnahmen eine Radiusköpfchenluxation. Welche Verletzungskonstellation liegt vor?","en":"In a child with an ulnar shaft fracture, adequately positioned radiographs confirm radial-head dislocation. Which injury pattern is present?","fa":"در کودکی با شکستگی تنهٔ اولنا، رادیوگرافی‌های با وضعیت‌گیری مناسب دررفتگی سر رادیوس را تأیید می‌کنند. کدام الگوی آسیب وجود دارد؟"}[lang],
    [{"de":"Galeazzi-Verletzung","en":"Galeazzi injury","fa":"آسیب گالئاتزی"}[lang],
     {"de":"Monteggia-Verletzung","en":"Monteggia injury","fa":"آسیب مونتگیا"}[lang],
     {"de":"Essex-Lopresti-Verletzung","en":"Essex–Lopresti injury","fa":"آسیب اسکس–لوپرستی"}[lang],
     {"de":"Isolierte Radiusköpfchenfraktur","en":"Isolated radial head fracture","fa":"شکستگی منفرد سر رادیوس"}[lang]],
    1,
    {"de":"Ulnafraktur und Radiusköpfchenluxation bilden die Monteggia-Konstellation. Ulnaverlauf und radiokapitellare Stellung vollständig beurteilen; eine auffällige Hilfslinie allein beweist bei Kindern keine Luxation. Übersehene Fehlstellung kann die spätere Funktion beeinträchtigen.","en":"Ulnar fracture and radial-head dislocation form a Monteggia pattern. Assess the full ulnar contour and radiocapitellar alignment; an abnormal reference line alone does not prove pediatric dislocation. A missed malalignment can impair later function.","fa":"شکستگی اولنا و دررفتگی سر رادیوس، الگوی مونتگیا را تشکیل می‌دهند. تمام مسیر اولنا و هم‌راستایی رادیوکاپیتلار را ارزیابی کنید؛ خط کمکی غیرطبیعی به‌تنهایی دررفتگی را در کودک ثابت نمی‌کند. بدراستاییِ تشخیص‌داده‌نشده می‌تواند عملکرد بعدی را مختل کند."}[lang],
    {"A":{"de":"Galeazzi bezeichnet eine Radiusschaftfraktur mit distaler Radioulnarverletzung; hier sind Ulna und proximale Radiusstellung betroffen.","en":"Galeazzi denotes a radial-shaft fracture with distal radioulnar injury; here the ulna and proximal radial alignment are involved.","fa":"گالئاتزی به شکستگی تنهٔ رادیوس همراه آسیب رادیواولنار دیستال گفته می‌شود؛ در اینجا اولنا و هم‌راستایی پروگزیمال رادیوس درگیرند."},"C":{"de":"Essex-Lopresti verlangt die Radiusköpfchen-/IOM-/DRUJ-Konstellation, nicht nur eine Ulnafraktur mit proximaler Radiusluxation.","en":"Essex–Lopresti requires the radial-head/IOM/DRUJ pattern, rather than an ulnar fracture with proximal radial dislocation.","fa":"اسکس–لوپرستی به الگوی سر رادیوس/IOM/DRUJ نیاز دارد، نه صرفاً شکستگی اولنا همراه دررفتگی پروگزیمال رادیوس."},"D":{"de":"Es ist eine Luxation und eine Ulnaschaftfraktur beschrieben; das ist keine isolierte Radiusköpfchenfraktur.","en":"The description includes dislocation and an ulnar-shaft fracture, not an isolated radial-head fracture.","fa":"توصیف شامل دررفتگی و شکستگی تنهٔ اولنا است، نه شکستگی منفرد سر رادیوس."}},
    "https://pubmed.ncbi.nlm.nih.gov/24978320/; https://pubmed.ncbi.nlm.nih.gov/21841436/"
  ),

].map(q => ({ ...q, tags: ['radiuskoepfchenfraktur'] }))]))

export const RADIUSKOPF_FLASHCARDS = [

  F("rk-fc-1",
    {"de":"Mason","en":"Mason","fa":"ماسون"},
    {"de":"Welche Grundmorphologie trennt Mason I und II?","en":"Which basic morphology distinguishes Mason I from II?","fa":"کدام مورفولوژی پایه ماسون I را از II جدا می‌کند؟"},
    {"de":"I: nicht/minimal dislozierte Fissur oder Randfraktur. II: dislozierte Teilkopffraktur.","en":"I: nondisplaced/minimally displaced fissure or marginal fracture. II: displaced partial-head fracture.","fa":"I: ترک یا شکستگی حاشیه‌ای بدون یا با حداقل جابه‌جایی. II: شکستگی جابه‌جا‌شدهٔ بخشی از سر."},
    {"de":"Numerische 2-mm-/30%-Grenzen gehören zu unterschiedlichen Modifikationen und sind keine universelle Operationsregel. Gemessene Stufenhöhe, Gelenkflächenanteil und Begleitverletzungen beschreiben und die verwendete Version nennen.","en":"Numerical 2-mm/30% thresholds belong to differing modifications and are not a universal surgery rule. Report measured displacement, articular involvement and associated injuries, and identify the version used.","fa":"مرزهای عددی ۲ میلی‌متر/۳۰٪ مربوط به نسخه‌های اصلاح‌شدهٔ متفاوت‌اند و قاعدهٔ همگانی جراحی نیستند. ارتفاع پله، درگیری سطح مفصلی و آسیب‌های همراه را توصیف و نسخهٔ استفاده‌شده را مشخص کنید."},
    "https://pubmed.ncbi.nlm.nih.gov/20566295/; MSK.pdf physical15 /printed14"),

  F("rk-fc-2",
    {"de":"Mason","en":"Mason","fa":"ماسون"},
    {"de":"Warum trennt die Fragmentzahl allein Mason II und III nicht?","en":"Why does fragment count alone not distinguish Mason II from III?","fa":"چرا تعداد قطعات به‌تنهایی ماسون II را از III جدا نمی‌کند؟"},
    {"de":"Auch Teilkopffrakturen (II) können mehrfragmentär sein. III beschreibt die Fraktur des gesamten Kopfes; Umfang und Fragmentmorphologie getrennt beurteilen.","en":"Partial-head fractures (II) can also be multifragmentary. III describes whole-head involvement; assess extent and fragment morphology separately.","fa":"شکستگی بخشی از سر (II) نیز می‌تواند چندقطعه‌ای باشد. III درگیری تمام سر را توصیف می‌کند؛ وسعت و مورفولوژی قطعات را جداگانه ارزیابی کنید."},
    {"de":"Die primäre 3D-CT-Studie fand komplexe Teilkopffrakturen und Ganzkopffrakturen mit wenigen Fragmenten. Die Typzahl ist damit kein alleiniger Beweis fehlender Rekonstruierbarkeit oder einer bestimmten Therapie.","en":"The primary 3D-CT study found complex partial-head fractures and whole-head fractures with few fragments. The type number therefore does not alone prove irreconstructibility or dictate treatment.","fa":"مطالعهٔ اولیهٔ CT سه‌بعدی، شکستگی پیچیدهٔ بخشی از سر و شکستگی تمام سر با قطعات کم را یافت. بنابراین شمارهٔ نوع به‌تنهایی غیرقابل‌بازسازی بودن یا درمان معین را ثابت نمی‌کند."},
    "https://pubmed.ncbi.nlm.nih.gov/20566295/"),

  F("rk-fc-3",
    {"de":"Bildgebung","en":"Imaging","fa":"تصویربرداری"},
    {"de":"Fettkissenzeichen: anteriores vs. posteriores?","en":"Fat pad sign: anterior vs. posterior?","fa":"نشانه بالشتک چربی: قدامی در مقابل خلفی؟"},
    {"de":"Im echten Seitenbild ist ein flaches anteriores Fettkissen normal sichtbar. Ein eleviertes anteriores oder sichtbares posteriores Fettkissen spricht für einen Erguss; nach Trauma ist eine okkulte Fraktur möglich.","en":"On a true lateral view, a flat anterior fat pad may be normal. An elevated anterior or visible posterior fat pad supports effusion; an occult fracture is possible after trauma.","fa":"در نمای لترال واقعی، بالشتک قدامی صاف می‌تواند طبیعی دیده شود. بالا آمدن بالشتک قدامی یا دیده‌شدن بالشتک خلفی به نفع افیوژن است؛ پس از تروما، شکستگی پنهان ممکن است."},
    {"de":"Ergusszeichen im klinischen Kontext bewerten; daraus allein weder Frakturort noch Mason-Typ ableiten.","en":"Interpret the effusion sign in clinical context; it alone establishes neither fracture location nor Mason type.","fa":"علامت افیوژن را در زمینهٔ بالینی تفسیر کنید؛ به‌تنهایی محل شکستگی یا نوع ماسون را تعیین نمی‌کند."},
    "https://pubmed.ncbi.nlm.nih.gov/15232392/; https://doi.org/10.1016/S0020-1383(79)80071-6"),

  F("rk-fc-4",
    {"de":"Bildgebung","en":"Imaging","fa":"تصویربرداری"},
    {"de":"Radiocapitellar Line: Norm und Pathologie?","en":"Radiocapitellar Line: normal and pathological?","fa":"خط رادیوکاپیتلار: طبیعی و پاتولوژیک؟"},
    {"de":"Die Radiushalslinie im echten Seitenbild ist die verlässlichere Orientierung. Eine fehlende Deckung ist ein Anlass zur Prüfung von Technik und Gesamtstellung, kein alleiniger Luxationsbeweis.","en":"The radial-neck line on a true lateral view is the more reliable reference. Nonintersection prompts checking technique and overall alignment; it does not alone prove dislocation.","fa":"خط گردن رادیوس در نمای لترال واقعی مرجع قابل‌اتکاتری است. عبور نکردن خط، بررسی تکنیک و هم‌راستایی کلی را لازم می‌کند، اما به‌تنهایی دررفتگی را ثابت نمی‌کند."},
    {"de":"Alter, Ossifikation und Rotation verändern den Bezug zum Capitulumkern; selbst normale Linien müssen nicht dessen Zentrum treffen. Bei Monteggia-Verdacht den gesamten Ulnaverlauf und die radiokapitellare Stellung beurteilen.","en":"Age, ossification and rotation alter the relationship to the capitellar centre; normal lines need not cross its centre. When Monteggia injury is suspected, assess the full ulna and radiocapitellar alignment.","fa":"سن، استخوانی‌شدن و چرخش بر رابطه با مرکز هستهٔ کاپیتولوم اثر دارند؛ خط طبیعی نیز لزوماً از مرکز عبور نمی‌کند. در شک به مونتگیا، تمام مسیر اولنا و هم‌راستایی رادیوکاپیتلار را بررسی کنید."},
    "https://pubmed.ncbi.nlm.nih.gov/21841436/; https://pubmed.ncbi.nlm.nih.gov/24978320/"),

  F("rk-fc-5",
    {"de":"Assoziiert","en":"Associated","fa":"همراه"},
    {"de":"Essex-Lopresti: Was ist es und warum wichtig?","en":"Essex-Lopresti: what is it and why important?","fa":"اسکس-لوپرستی: چیست و چرا مهم است؟"},
    {"de":"Radiusköpfchenfraktur + IOM-Ruptur + DRUJ-Verletzung: Risiko longitudinaler Unterarminstabilität.","en":"Radial head fracture + IOM rupture + DRUJ injury: risk of longitudinal forearm instability.","fa":"شکستگی سر رادیوس + پارگی IOM + آسیب DRUJ: خطر ناپایداری طولی ساعد."},
    {"de":"DRUJ, Unterarmlänge und Stabilität gezielt prüfen. Bei bestätigter Instabilität radiale Länge erhalten/wiederherstellen; Fixation oder Ersatz nach Rekonstruierbarkeit und Begleitverletzungen. Weder Resektion noch Prothese ist eine automatische Standardantwort.","en":"Assess the DRUJ, forearm length and stability. With confirmed instability, preserve/restore radial length; choose fixation or replacement according to reconstructibility and associated injuries. Neither excision nor arthroplasty is automatic.","fa":"DRUJ، طول ساعد و پایداری را هدفمند بررسی کنید. در ناپایداری تأییدشده، طول رادیوس را حفظ/بازسازی کنید؛ تثبیت یا جایگزینی به امکان بازسازی و آسیب‌های همراه بستگی دارد. نه برداشت و نه پروتز پاسخ خودکار استاندارد نیست."},
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC5895887/"),

  F("rk-fc-6",
    {"de":"Assoziiert","en":"Associated","fa":"همراه"},
    {"de":"Terrible Triad des Ellenbogens: 3 Komponenten?","en":"Terrible Triad of the elbow: 3 components?","fa":"سه‌گانه وحشتناک آرنج: ۳ مؤلفه؟"},
    {"de":"Ellenbogenluxation (typisch posterior) + Radiusköpfchenfraktur + Coronoidfraktur der Ulna.","en":"Elbow dislocation (typically posterior) + radial head fracture + ulnar coronoid fracture.","fa":"دررفتگی آرنج (معمولاً خلفی) + شکستگی سر رادیوس + شکستگی کرونوئید اولنا."},
    {"de":"Jede Komponente und Begleitverletzung beurteilen. Die Gesamtstabilität und Rekonstruierbarkeit bestimmen die individuelle Planung; nicht jede Komponente muss automatisch operiert werden.","en":"Assess each component and associated injury. Overall stability and reconstructibility guide individual planning; surgery for every component is not automatic.","fa":"هر مؤلفه و آسیب همراه را ارزیابی کنید. پایداری کلی و امکان بازسازی، برنامهٔ فردی را تعیین می‌کنند؛ جراحی هر مؤلفه به‌طور خودکار لازم نیست."},
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC4048392/"),

  F("rk-fc-7",
    {"de":"Therapie","en":"Treatment","fa":"درمان"},
    {"de":"Welche funktionelle Komplikation begründet frühe Bewegung bei einfacher stabiler Radiusköpfchenfraktur?","en":"Which functional complication motivates early motion after a simple stable radial head fracture?","fa":"در شکستگی ساده و پایدار سر رادیوس، پیشگیری از کدام عارضهٔ عملکردی حرکت زودهنگام را توجیه می‌کند؟"},
    {"de":"Ellenbogensteifigkeit: unnötig lange Ruhigstellung vermeiden und bei stabiler Verletzung früh schmerzadaptiert üben.","en":"Elbow stiffness: avoid unnecessarily prolonged immobilisation and begin pain-adapted exercise early when the injury is stable.","fa":"سفتی آرنج: از بی‌حرکتی غیرضروری و طولانی پرهیز و در آسیب پایدار، تمرین زودهنگام متناسب با درد را آغاز کنید."},
    {"de":"Bei isolierten gering verschobenen Frakturen kann angeleitete Eigenübung genügen; formale Physiotherapie ist nicht für jeden Fall obligatorisch. Begleitverletzungen bestimmen die Nachbehandlung. Kein starrer Wartezeit- oder pauschaler Belastungsfreigabetermin.","en":"In isolated minimally displaced fractures, instructed home exercise may suffice; formal physiotherapy is not mandatory for every case. Associated injuries determine rehabilitation. No fixed waiting period or universal return-to-load date is implied.","fa":"در شکستگی منفرد با جابه‌جایی کم، تمرین خانگی آموزش‌داده‌شده ممکن است کافی باشد؛ فیزیوتراپی رسمی برای همهٔ موارد الزامی نیست. آسیب‌های همراه برنامهٔ توان‌بخشی را تعیین می‌کنند. زمان انتظار ثابت یا موعد همگانی بازگشت به بارگذاری مطرح نیست."},
    "https://pubmed.ncbi.nlm.nih.gov/22576643/; https://pubmed.ncbi.nlm.nih.gov/29664851/"),

  F("rk-fc-8",
    {"de":"Anatomie","en":"Anatomy","fa":"آناتومی"},
    {"de":"Welche Bedeutung hat das Radiusköpfchen für die Unterarmstabilität?","en":"What is the role of the radial head in forearm stability?","fa":"سر رادیوس چه نقشی در پایداری ساعد دارد؟"},
    {"de":"Das Radiusköpfchen trägt zur axialen Unterarmstabilität und Erhaltung der radialen Länge bei.","en":"The radial head contributes to axial forearm stability and preservation of radial length.","fa":"سر رادیوس به پایداری محوری ساعد و حفظ طول رادیوس کمک می‌کند."},
    {"de":"Vor einer Resektion Begleitverletzungen und Längsstabilität vollständig beurteilen, besonders IOM und DRUJ. Erhalt, Fixation oder Ersatz richten sich nach dem gesamten Verletzungsmuster.","en":"Before excision, fully assess associated injuries and longitudinal stability, especially the IOM and DRUJ. Preservation, fixation or replacement depends on the entire injury pattern.","fa":"پیش از برداشت، آسیب‌های همراه و پایداری طولی، به‌ویژه IOM و DRUJ را کامل ارزیابی کنید. حفظ، تثبیت یا جایگزینی به مجموعهٔ الگوی آسیب بستگی دارد."},
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC5895887/"),

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
