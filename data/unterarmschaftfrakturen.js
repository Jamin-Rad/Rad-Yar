const L = (de, en, fa) => ({ de, en, fa })

export const UNTERARM_LESSON = {
  id: 'unterarmschaftfrakturen',
  title: L('Unterarmschaftfrakturen', 'Forearm Shaft Fractures', 'شکستگی‌های تنه ساعد'),
  definition: L(
    'Frakturen von Radius und/oder Ulna, bei denen neben der Schaftverletzung immer die Gelenkbeziehungen am Ellenbogen und distalen Radioulnargelenk beurteilt werden müssen.',
    'Fractures of the radius and/or ulna in which the elbow and distal radioulnar joint relationships must always be assessed in addition to the shaft injury.',
    'شکستگی تنه رادیوس و/یا اولنا که در آن علاوه بر آسیب تنه، روابط مفصلی آرنج و مفصل رادیواولنار دیستال باید همیشه ارزیابی شوند.'
  ),
  breadcrumb: L('Unterarmschaftfrakturen', 'Forearm Shaft Fractures', 'شکستگی‌های تنه ساعد'),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key Point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Caution', 'هشدار'),
  toc: L('Inhalt', 'Contents', 'فهرست'),
  heroCards: [
    {
      value: L('2 Knochen', '2 bones', '۲ استخوان'),
      label: L('eine Funktionseinheit', 'one functional unit', 'یک واحد عملکردی'),
      text: L('Radius, Ulna und Membrana interossea', 'radius, ulna and interosseous membrane', 'رادیوس، اولنا و غشای بین‌استخوانی'),
    },
    {
      value: L('Monteggia', 'Monteggia', 'مونتگیا'),
      label: L('Ulna + Radiusköpfchen', 'ulna + radial head', 'اولنا + سر رادیوس'),
      text: L('Radiokapitellare Linie prüfen', 'check the radiocapitellar line', 'خط رادیوکاپیتلار را بررسی کنید'),
    },
    {
      value: L('Galeazzi', 'Galeazzi', 'گالئاتزی'),
      label: L('Radius + DRUG', 'radius + DRUJ', 'رادیوس + DRUJ'),
      text: L('Handgelenk immer mit abbilden', 'always include the wrist', 'همیشه مچ را در تصویر بگنجانید'),
    },
  ],
  sections: [
    { id: 'grundlagen', icon: '🦴', label: L('Grundlagen', 'Fundamentals', 'مبانی') },
    { id: 'bildgebung', icon: '🩻', label: L('Bildgebung', 'Imaging', 'تصویربرداری') },
    { id: 'monteggia', icon: '📐', label: L('Monteggia & Bado', 'Monteggia & Bado', 'مونتگیا و بادو'), emphasis: true },
    { id: 'galeazzi', icon: '🔗', label: L('Galeazzi & DRUG', 'Galeazzi & DRUJ', 'گالئاتزی و DRUJ'), emphasis: true },
    { id: 'befund', icon: '📝', label: L('Befundschema', 'Reporting', 'گزارش‌نویسی') },
    { id: 'therapie', icon: '🛠️', label: L('Therapie & Komplikationen', 'Treatment & Complications', 'درمان و عوارض') },
    { id: 'takehome', icon: '✅', label: L('Take-home', 'Take-home', 'جمع‌بندی'), emphasis: true },
  ],
  grundlagen: {
    title: L('Funktionelle Anatomie & Frakturmuster', 'Functional Anatomy & Fracture Patterns', 'آناتومی عملکردی و الگوهای شکستگی'),
    lead: L(
      'Radius und Ulna bilden zusammen mit proximalem und distalem Radioulnargelenk sowie der Membrana interossea einen geschlossenen Ring. Eine Unterarmfraktur kann deshalb an einer zweiten Stelle eine Luxation oder Bandverletzung verursachen.',
      'The radius and ulna form a closed ring with the proximal and distal radioulnar joints and the interosseous membrane. A forearm fracture may therefore produce a second-site dislocation or ligament injury.',
      'رادیوس و اولنا همراه با مفاصل رادیواولنار پروگزیمال و دیستال و غشای بین‌استخوانی یک حلقه بسته می‌سازند؛ بنابراین شکستگی ساعد می‌تواند در نقطه‌ای دیگر لوکساسیون یا آسیب رباطی ایجاد کند.'
    ),
    items: [
      {
        icon: '↻',
        title: L('Pronation und Supination', 'Pronation and supination', 'پروناسیون و سوپیناسیون'),
        text: L(
          'Der Radius rotiert um die relativ stabile Ulna. Schon geringe Achs- oder Rotationsfehler verändern den radialen Bogen und können die Unterarmrotation dauerhaft einschränken.',
          'The radius rotates around the relatively stable ulna. Even small angular or rotational errors alter the radial bow and can permanently restrict forearm rotation.',
          'رادیوس حول اولنای نسبتاً ثابت می‌چرخد. حتی خطاهای کوچک زاویه‌ای یا چرخشی قوس رادیوس را تغییر داده و می‌توانند چرخش ساعد را به‌طور دائمی محدود کنند.'
        ),
      },
      {
        icon: '🦴',
        title: L('Beide-Knochen-Fraktur', 'Both-bone fracture', 'شکستگی هر دو استخوان'),
        text: L(
          'Fraktur von Radius- und Ulnaschaft, häufig deutlich disloziert und rotationsinstabil. Beschrieben werden Höhe, Morphologie, Verkürzung, Translation, Achsabweichung und Rotation beider Knochen.',
          'Fracture of both radial and ulnar shafts, often markedly displaced and rotationally unstable. Report level, morphology, shortening, translation, angulation and rotation of both bones.',
          'شکستگی تنه رادیوس و اولنا که اغلب جابجا و از نظر چرخشی ناپایدار است. سطح، مورفولوژی، کوتاهی، ترجمه، زاویه‌داری و چرخش هر دو استخوان باید گزارش شود.'
        ),
      },
      {
        icon: '🌙',
        title: L('Nightstick-Fraktur', 'Nightstick fracture', 'شکستگی نایت‌استیک'),
        text: L(
          'Isolierte Ulnaschaftfraktur nach direkter Gewalteinwirkung. Trotz scheinbar isolierter Fraktur muss die radiokapitellare Gelenkstellung geprüft werden, um eine Monteggia-Verletzung nicht zu übersehen.',
          'Isolated ulnar shaft fracture caused by direct trauma. Despite appearing isolated, radiocapitellar alignment must be checked to avoid missing a Monteggia injury.',
          'شکستگی منفرد تنه اولنا پس از ضربه مستقیم. با وجود ظاهر منفرد، هم‌راستایی رادیوکاپیتلار باید بررسی شود تا آسیب مونتگیا از دست نرود.'
        ),
      },
      {
        icon: '🧒',
        title: L('Kinder', 'Children', 'کودکان'),
        text: L(
          'Grünholz- und Bowing-Frakturen sind typisch. Eine plastische Deformierung der Ulna kann die einzige knöcherne Komponente einer Monteggia-Läsion sein; auf subtile Achsabweichung achten.',
          'Greenstick and bowing fractures are typical. Plastic deformation of the ulna may be the only bony component of a Monteggia lesion; look for subtle angulation.',
          'شکستگی‌های گرین‌استیک و خمیدگی تیپیک هستند. تغییر شکل پلاستیک اولنا ممکن است تنها جزء استخوانی ضایعه مونتگیا باشد؛ به انحراف ظریف محور توجه کنید.'
        ),
      },
    ],
    key: L(
      'Ein Knochen gebrochen bedeutet: beide angrenzenden Gelenke aktiv prüfen. Ulnafraktur → Radiusköpfchen; Radiusfraktur → DRUG.',
      'One fractured bone means actively checking both adjacent joints. Ulna fracture → radial head; radius fracture → DRUJ.',
      'شکستگی یک استخوان یعنی هر دو مفصل مجاور را فعالانه بررسی کنید: شکستگی اولنا ← سر رادیوس؛ شکستگی رادیوس ← DRUJ.'
    ),
  },
  bildgebung: {
    title: L('Radiologische Diagnostik', 'Radiological Assessment', 'ارزیابی رادیولوژیک'),
    lead: L(
      'Standard sind echte Aufnahmen des gesamten Unterarms in zwei Ebenen einschließlich Ellenbogen und Handgelenk. Zentrierte Teilaufnahmen können die entscheidende Gelenkverletzung abschneiden.',
      'Standard imaging consists of true two-plane radiographs of the entire forearm including elbow and wrist. Centred partial views may exclude the decisive joint injury.',
      'استاندارد، رادیوگرافی واقعی کل ساعد در دو نما شامل آرنج و مچ است. تصاویر محدود ممکن است آسیب مفصلی تعیین‌کننده را حذف کنند.'
    ),
    headers: [
      L('Prüfschritt', 'Review step', 'مرحله بررسی'),
      L('Was wird beurteilt?', 'What to assess', 'چه چیزی بررسی می‌شود؟'),
      L('Prüfungsrelevante Falle', 'Exam pitfall', 'دام آزمونی'),
    ],
    rows: [
      [
        L('1. Knochen', '1. Bones', '۱. استخوان‌ها'),
        L('Frakturhöhe, Morphologie, offene Zeichen, Verkürzung, Translation, Angulation und Rotation von Radius und Ulna', 'Fracture level, morphology, open-injury signs, shortening, translation, angulation and rotation of radius and ulna', 'سطح و مورفولوژی شکستگی، علائم باز بودن، کوتاهی، ترجمه، زاویه‌داری و چرخش رادیوس و اولنا'),
        L('Ein zweiter Frakturanteil kann überlagert oder nur inkomplett sein.', 'A second fracture may be overlapped or incomplete.', 'شکستگی دوم ممکن است روی‌هم‌افتاده یا ناکامل باشد.'),
      ],
      [
        L('2. Ellenbogen', '2. Elbow', '۲. آرنج'),
        L('Radiokapitellare Linie in AP und seitlich; Radiusköpfchen muss auf das Capitulum zeigen', 'Radiocapitellar line on AP and lateral views; radial head must point to the capitellum', 'خط رادیوکاپیتلار در نماهای AP و لترال؛ سر رادیوس باید به کاپیتولوم اشاره کند'),
        L('Monteggia-Luxation wird häufig übersehen, besonders bei Kindern.', 'Monteggia dislocation is often missed, especially in children.', 'لوکساسیون مونتگیا به‌ویژه در کودکان اغلب از دست می‌رود.'),
      ],
      [
        L('3. Handgelenk / DRUG', '3. Wrist / DRUJ', '۳. مچ / DRUJ'),
        L('DRUG-Weite, dorsale oder palmare Ulnakopfposition im Seitenbild, Ulnastyloid und radiale Verkürzung', 'DRUJ width, dorsal or volar ulnar-head position on lateral view, ulnar styloid and radial shortening', 'عرض DRUJ، موقعیت پشتی یا کف‌دستی سر اولنا در نمای لترال، استیلوئید اولنا و کوتاهی رادیوس'),
        L('Eine nicht exakt seitliche Aufnahme kann eine scheinbare Subluxation erzeugen.', 'A non-true lateral view can mimic subluxation.', 'نمای لترال غیرواقعی می‌تواند ساب‌لوکساسیون کاذب ایجاد کند.'),
      ],
      [
        L('4. Zusatzbildgebung', '4. Additional imaging', '۴. تصویربرداری تکمیلی'),
        L('CT bei komplexer Gelenkbeteiligung, unklarer DRUG-Kongruenz oder präoperativer Planung', 'CT for complex articular involvement, uncertain DRUJ congruity or preoperative planning', 'CT در درگیری پیچیده مفصل، نامشخص بودن تطابق DRUJ یا برنامه‌ریزی پیش از عمل'),
        L('CT ersetzt keine korrekten Ganzunterarm-Aufnahmen.', 'CT does not replace correct whole-forearm radiographs.', 'CT جایگزین رادیوگرافی صحیح کل ساعد نیست.'),
      ],
    ],
    cave: L(
      'Bei Verdacht auf DRUG-Verletzung immer die Gegenseite oder eine streng seitliche Aufnahme erwägen: Schon geringe Fehlrotation des Handgelenks verändert die scheinbare Stellung des Ulnakopfes.',
      'If DRUJ injury is suspected, consider a true lateral view or comparison with the opposite side: even slight wrist malrotation changes the apparent ulnar-head position.',
      'در شک به آسیب DRUJ، نمای لترال واقعی یا مقایسه با سمت مقابل را در نظر بگیرید؛ حتی چرخش کم مچ موقعیت ظاهری سر اولنا را تغییر می‌دهد.'
    ),
  },
  monteggia: {
    title: L('Monteggia-Fraktur-Luxation & Bado-Klassifikation', 'Monteggia Fracture-Dislocation & Bado Classification', 'شکستگی-دررفتگی مونتگیا و طبقه‌بندی بادو'),
    lead: L(
      'Die Monteggia-Läsion kombiniert eine Fraktur oder plastische Deformierung der proximalen Ulna mit einer Luxation des Radiusköpfchens. Bado klassifiziert nach der Luxationsrichtung des Radiusköpfchens.',
      'A Monteggia lesion combines fracture or plastic deformation of the proximal ulna with radial-head dislocation. Bado classification is based on the direction of radial-head dislocation.',
      'ضایعه مونتگیا ترکیبی از شکستگی یا تغییر شکل پلاستیک اولنای پروگزیمال و لوکساسیون سر رادیوس است. طبقه‌بندی بادو بر اساس جهت لوکساسیون سر رادیوس است.'
    ),
    schemaSrc: '/unterarmschaftfrakturen/bado-klassifikation.png',
    schemaAlt: L('Bado-Klassifikation der Monteggia-Fraktur-Luxation Typ I–IV', 'Bado classification of Monteggia fracture-dislocation Types I–IV', 'طبقه‌بندی بادو برای شکستگی-دررفتگی مونتگیا انواع I تا IV'),
    headers: [L('Bado-Typ', 'Bado type', 'نوع بادو'), L('Radiusköpfchen', 'Radial head', 'سر رادیوس'), L('Typisches Ulnamuster', 'Typical ulnar pattern', 'الگوی تیپیک اولنا')],
    rows: [
      [L('I (~60 %)', 'I (~60%)', 'I (حدود ۶۰٪)'), L('anterior luxiert', 'anterior dislocation', 'لوکساسیون قدامی'), L('anteriore Angulation der Ulna; häufig Hyperextension/Pronation', 'anterior ulnar angulation; often hyperextension/pronation', 'زاویه‌داری قدامی اولنا؛ اغلب هایپراکستانسیون/پروناسیون')],
      [L('II', 'II', 'II'), L('posterior oder posterolateral luxiert', 'posterior or posterolateral dislocation', 'لوکساسیون خلفی یا خلفی‌جانبی'), L('posteriore Angulation; häufiger beim Erwachsenen', 'posterior angulation; more common in adults', 'زاویه‌داری خلفی؛ شایع‌تر در بزرگسالان')],
      [L('III', 'III', 'III'), L('lateral oder anterolateral luxiert', 'lateral or anterolateral dislocation', 'لوکساسیون جانبی یا قدامی‌جانبی'), L('metaphysäre Ulnafraktur; häufiger bei Kindern', 'ulnar metaphyseal fracture; more common in children', 'شکستگی متافیزی اولنا؛ شایع‌تر در کودکان')],
      [L('IV', 'IV', 'IV'), L('meist anterior luxiert', 'usually anterior dislocation', 'معمولاً لوکساسیون قدامی'), L('Fraktur von Ulna und proximalem Radius', 'fracture of ulna and proximal radius', 'شکستگی اولنا و رادیوس پروگزیمال')],
    ],
    key: L(
      'Die Bado-Klasse richtet sich nach dem Radiusköpfchen, nicht nach der Richtung des Ulnagments. Die Ulnadeformität korreliert häufig, ist aber nicht das Definitionskriterium.',
      'Bado type is determined by radial-head direction, not by the direction of the ulnar fragment. Ulnar deformity often correlates but is not the defining criterion.',
      'نوع بادو بر اساس جهت سر رادیوس تعیین می‌شود، نه جهت قطعه اولنا. تغییر شکل اولنا اغلب همبستگی دارد اما معیار تعریف‌کننده نیست.'
    ),
    cave: L(
      'Bei jeder proximalen Ulnaschaftfraktur und jeder plastischen Ulnadeformierung die radiokapitellare Linie in beiden Ebenen prüfen. Eine übersehene Radiusköpfchenluxation führt zu chronischer Fehlstellung, Schmerz und eingeschränkter Pronosupination.',
      'In every proximal ulnar shaft fracture and plastic ulnar deformity, check the radiocapitellar line in both planes. A missed radial-head dislocation causes chronic deformity, pain and restricted pronosupination.',
      'در هر شکستگی تنه پروگزیمال اولنا و تغییر شکل پلاستیک اولنا، خط رادیوکاپیتلار را در هر دو نما بررسی کنید. لوکساسیون از دست‌رفته سر رادیوس باعث بدشکلی مزمن، درد و محدودیت پروناسیون/سوپیناسیون می‌شود.'
    ),
  },
  galeazzi: {
    title: L('Galeazzi-Fraktur-Luxation & DRUG-Verletzung', 'Galeazzi Fracture-Dislocation & DRUJ Injury', 'شکستگی-دررفتگی گالئاتزی و آسیب DRUJ'),
    lead: L(
      'Die Galeazzi-Läsion besteht aus einer Fraktur des distalen Radiusschaftes mit Verletzung des distalen Radioulnargelenks. Entscheidend ist nicht nur die Radiusfraktur, sondern der Nachweis oder Ausschluss der DRUG-Instabilität.',
      'A Galeazzi lesion consists of a distal radial shaft fracture with injury to the distal radioulnar joint. The key task is not only identifying the radial fracture but proving or excluding DRUJ instability.',
      'ضایعه گالئاتزی شامل شکستگی تنه دیستال رادیوس همراه با آسیب مفصل رادیواولنار دیستال است. نکته اصلی فقط تشخیص شکستگی رادیوس نیست، بلکه اثبات یا رد ناپایداری DRUJ است.'
    ),
    caseTitle: L('Fallbeispiel Galeazzi-Fraktur-Luxation · Radiopaedia rID 15484', 'Case: Galeazzi fracture-dislocation · Radiopaedia rID 15484', 'کیس شکستگی-دررفتگی گالئاتزی · رادیوپدیا rID 15484'),
    radiopaediaUrl: 'https://radiopaedia.org/cases/15484',
    images: [
      {
        src: '/unterarmschaftfrakturen/galeazzi-rid15484-lateral.png',
        caption: L('Seitliche Projektion: dislozierte Fraktur des distalen Radiusschaftes; DRUG-Stellung und Richtung der Ulnakopfdislokation beurteilen', 'Lateral view: displaced distal radial shaft fracture; assess DRUJ alignment and direction of ulnar-head displacement', 'نمای لترال: شکستگی جابجاشده تنه دیستال رادیوس؛ هم‌راستایی DRUJ و جهت جابجایی سر اولنا را بررسی کنید'),
      },
      {
        src: '/unterarmschaftfrakturen/galeazzi-rid15484-ap.png',
        caption: L('AP-Projektion: Radiusverkürzung und Achsabweichung; DRUG-Weite sowie Ulnastyloid mitbeurteilen', 'AP view: radial shortening and angulation; also assess DRUJ width and ulnar styloid', 'نمای AP: کوتاهی و زاویه‌داری رادیوس؛ عرض DRUJ و استیلوئید اولنا نیز بررسی شود'),
      },
    ],
    signs: [
      {
        icon: '↔',
        title: L('DRUG-Erweiterung', 'DRUJ widening', 'گشادشدگی DRUJ'),
        text: L('Verbreiterter Abstand zwischen distaler Ulna und Incisura ulnaris radii im AP-Bild; Vergleich mit Gegenseite bei Zweifel.', 'Widening between distal ulna and the radial sigmoid notch on AP imaging; compare with the opposite side if uncertain.', 'افزایش فاصله میان اولنای دیستال و ناچ سیگموئید رادیوس در نمای AP؛ در صورت تردید با سمت مقابل مقایسه شود.'),
      },
      {
        icon: '⬆',
        title: L('Ulnakopfdislokation', 'Ulnar-head displacement', 'جابجایی سر اولنا'),
        text: L('Im streng seitlichen Bild dorsale oder palmare Subluxation/Luxation des Ulnakopfes. Fehlrotation der Aufnahme unbedingt ausschließen.', 'On a true lateral view, dorsal or volar subluxation/dislocation of the ulnar head. Exclude projectional malrotation.', 'در نمای لترال واقعی، ساب‌لوکساسیون یا لوکساسیون پشتی/کف‌دستی سر اولنا دیده می‌شود. چرخش پروجکشن باید رد شود.'),
      },
      {
        icon: '📏',
        title: L('Radiale Verkürzung', 'Radial shortening', 'کوتاهی رادیوس'),
        text: L('Verkürzung und Verlust des radialen Bogens erhöhen den Verdacht auf DRUG-Instabilität; besonders bei deutlich dislozierter distaler Schaftfraktur.', 'Shortening and loss of radial bow increase suspicion of DRUJ instability, especially with a markedly displaced distal shaft fracture.', 'کوتاهی و از دست رفتن قوس رادیوس شک به ناپایداری DRUJ را افزایش می‌دهد، به‌ویژه در شکستگی جابجاشده تنه دیستال.'),
      },
      {
        icon: '✦',
        title: L('Begleitzeichen', 'Associated clues', 'علائم همراه'),
        text: L('Fraktur des Processus styloideus ulnae, TFCC-Verletzung oder kleine Avulsionsfragmente können eine instabile DRUG-Läsion anzeigen.', 'Ulnar styloid fracture, TFCC injury or small avulsion fragments may indicate an unstable DRUJ lesion.', 'شکستگی استیلوئید اولنا، آسیب TFCC یا قطعات آولسیون کوچک می‌توانند نشانه ضایعه ناپایدار DRUJ باشند.'),
      },
    ],
    key: L(
      'Galeazzi ist eine Fraktur-Luxation: Radius anatomisch rekonstruieren und danach die Stabilität des DRUG klinisch und bildgebend erneut prüfen.',
      'Galeazzi is a fracture-dislocation: restore radial anatomy and then reassess DRUJ stability clinically and radiographically.',
      'گالئاتزی یک شکستگی-دررفتگی است: آناتومی رادیوس بازسازی و سپس پایداری DRUJ از نظر بالینی و تصویربرداری دوباره ارزیابی شود.'
    ),
  },
  befund: {
    title: L('Strukturiertes Befundschema', 'Structured Reporting', 'الگوی ساختاری گزارش'),
    lead: L(
      'Ein guter Befund beschreibt nicht nur die Fraktur, sondern beantwortet die Frage nach der funktionellen Ringverletzung.',
      'A good report describes not only the fracture but also whether the functional forearm ring is disrupted.',
      'گزارش خوب نه‌تنها شکستگی را توصیف می‌کند، بلکه به سؤال آسیب حلقه عملکردی ساعد نیز پاسخ می‌دهد.'
    ),
    items: [
      { icon: '1', title: L('Lokalisation & Morphologie', 'Location & morphology', 'محل و مورفولوژی'), text: L('Betroffener Knochen, Schaftdrittel, Frakturverlauf, Mehrfragmentarität und offene Verletzungszeichen.', 'Bone involved, shaft third, fracture line, comminution and signs of open injury.', 'استخوان درگیر، یک‌سوم تنه، مسیر شکستگی، چندقطعه‌ای بودن و علائم آسیب باز.') },
      { icon: '2', title: L('Dislokation', 'Displacement', 'جابجایی'), text: L('Translation, Verkürzung, Angulation mit Scheitelrichtung und – soweit beurteilbar – Rotation getrennt für Radius und Ulna.', 'Translation, shortening, angulation with apex direction and, where assessable, rotation for radius and ulna separately.', 'ترجمه، کوتاهی، زاویه‌داری با جهت رأس و در صورت امکان چرخش برای رادیوس و اولنا جداگانه.') },
      { icon: '3', title: L('Proximales Gelenk', 'Proximal joint', 'مفصل پروگزیمال'), text: L('Radiokapitellare Kongruenz ausdrücklich dokumentieren; bei Luxation Bado-Richtung angeben.', 'Explicitly document radiocapitellar congruity; if dislocated, state Bado direction.', 'تطابق رادیوکاپیتلار صریحاً ذکر شود؛ در لوکساسیون جهت بادو گزارش شود.') },
      { icon: '4', title: L('Distales Gelenk', 'Distal joint', 'مفصل دیستال'), text: L('DRUG kongruent oder erweitert/subluxiert/luxiert; Richtung des Ulnakopfes und Begleitfraktur des Ulnastyloids.', 'DRUJ congruent or widened/subluxed/dislocated; ulnar-head direction and associated ulnar styloid fracture.', 'DRUJ هم‌راستا یا گشاد/ساب‌لوکس/لوکس؛ جهت سر اولنا و شکستگی همراه استیلوئید اولنا.') },
      { icon: '5', title: L('Weichteile & Empfehlung', 'Soft tissues & recommendation', 'بافت نرم و توصیه'), text: L('Schwellung, Fremdkörper oder Gas; bei unklarem DRUG bzw. komplexer Gelenkverletzung CT oder gezielte Zusatzaufnahme empfehlen.', 'Swelling, foreign body or gas; recommend CT or targeted additional views for uncertain DRUJ or complex joint injury.', 'تورم، جسم خارجی یا گاز؛ در DRUJ نامشخص یا آسیب پیچیده مفصل CT یا نماهای تکمیلی توصیه شود.') },
    ],
    sample: L(
      'Dislozierte, kurzstreckig mehrfragmentäre Fraktur des distalen Radiusschaftdrittels mit dorsaler Angulation und Verkürzung. Erweiterung und dorsale Subluxation des DRUG, vereinbar mit Galeazzi-Fraktur-Luxation. Ellenbogengelenk und radiokapitellare Stellung kongruent.',
      'Displaced short-segment comminuted fracture of the distal radial shaft with dorsal angulation and shortening. DRUJ widening and dorsal subluxation, consistent with a Galeazzi fracture-dislocation. Elbow and radiocapitellar alignment are congruent.',
      'شکستگی جابجاشده و چندقطعه‌ای کوتاه در یک‌سوم دیستال تنه رادیوس با زاویه‌داری پشتی و کوتاهی. گشادشدگی و ساب‌لوکساسیون پشتی DRUJ، سازگار با شکستگی-دررفتگی گالئاتزی. آرنج و هم‌راستایی رادیوکاپیتلار هم‌راستا هستند.'
    ),
  },
  therapie: {
    title: L('Therapieprinzipien & Komplikationen', 'Treatment Principles & Complications', 'اصول درمان و عوارض'),
    lead: L(
      'Die Therapie hängt von Alter, Stabilität, Frakturmuster und Begleitverletzungen ab. Im Erwachsenenalter sind dislozierte Schaftfrakturen meist operativ, bei Kindern ist häufig eine geschlossene Reposition möglich.',
      'Treatment depends on age, stability, fracture pattern and associated injury. In adults, displaced shaft fractures are usually treated operatively; in children, closed reduction is often possible.',
      'درمان به سن، پایداری، الگوی شکستگی و آسیب‌های همراه بستگی دارد. در بزرگسالان شکستگی‌های جابجاشده تنه معمولاً جراحی و در کودکان اغلب با جااندازی بسته درمان می‌شوند.'
    ),
    items: [
      { icon: '🔩', title: L('Erwachsene', 'Adults', 'بزرگسالان'), text: L('Anatomische Plattenosteosynthese von Radius und/oder Ulna mit Wiederherstellung von Länge, Achse, Rotation und radialem Bogen. Monteggia: Ulna rekonstruieren und Radiusköpfchen reponieren. Galeazzi: Radius fixieren und DRUG-Stabilität testen.', 'Anatomic plate fixation restoring length, axis, rotation and radial bow. Monteggia: reconstruct ulna and reduce radial head. Galeazzi: fix radius and test DRUJ stability.', 'فیکساسیون آناتومیک با پلاک و بازسازی طول، محور، چرخش و قوس رادیوس. مونتگیا: بازسازی اولنا و جااندازی سر رادیوس. گالئاتزی: فیکس رادیوس و آزمون پایداری DRUJ.') },
      { icon: '🩹', title: L('Kinder', 'Children', 'کودکان'), text: L('Geschlossene Reposition und Oberarmgips bei stabiler Stellung; elastisch-stabile intramedulläre Nagelung bei instabilen oder nicht haltbaren Frakturen. Engmaschige Verlaufskontrolle wegen Redislokation.', 'Closed reduction and above-elbow casting if stable; elastic stable intramedullary nailing for unstable or irreducible fractures. Close follow-up for redisplacement.', 'جااندازی بسته و گچ بالای آرنج در وضعیت پایدار؛ نیل داخل‌مدولاری الاستیک در شکستگی ناپایدار یا غیرقابل حفظ. پیگیری نزدیک برای جابجایی مجدد.') },
      { icon: '⚠️', title: L('Akute Risiken', 'Acute risks', 'خطرات حاد'), text: L('Offene Fraktur, Gefäß-/Nervenverletzung und Kompartmentsyndrom. Zunehmender Schmerz, passive Dehnungsschmerzen und gespannte Logen sind klinische Warnzeichen.', 'Open fracture, neurovascular injury and compartment syndrome. Increasing pain, pain on passive stretch and tense compartments are clinical warning signs.', 'شکستگی باز، آسیب عصبی‌عروقی و سندرم کمپارتمان. افزایش درد، درد با کشش غیرفعال و کمپارتمان‌های سفت علائم هشدار بالینی هستند.') },
      { icon: '↻', title: L('Spätfolgen', 'Late complications', 'عوارض دیررس'), text: L('Malunion mit Verlust der Pronosupination, Pseudarthrose, radioulnare Synostose, chronische Radiusköpfchenluxation oder persistierende DRUG-Instabilität.', 'Malunion with loss of pronosupination, non-union, radioulnar synostosis, chronic radial-head dislocation or persistent DRUJ instability.', 'بدجوش‌خوردگی با از دست رفتن پروناسیون/سوپیناسیون، جوش‌نخوردگی، سینوستوز رادیواولنار، لوکساسیون مزمن سر رادیوس یا ناپایداری پایدار DRUJ.') },
    ],
    cave: L(
      'Eine anatomisch gut aussehende Schaftosteosynthese ist kein ausreichender Abschlussbefund: Nach Reposition/Fixation müssen Radiusköpfchen und DRUG erneut auf Kongruenz und Stabilität geprüft werden.',
      'An anatomically satisfactory shaft fixation is not the end of assessment: after reduction/fixation, the radial head and DRUJ must be reassessed for congruity and stability.',
      'فیکساسیون ظاهراً آناتومیک تنه پایان ارزیابی نیست؛ پس از جااندازی/فیکساسیون، سر رادیوس و DRUJ باید دوباره از نظر تطابق و پایداری بررسی شوند.'
    ),
  },
  takehome: {
    title: L('Take-home Message', 'Take-home Message', 'پیام‌های کلیدی'),
    lead: L('Fünf Regeln verhindern die häufigsten übersehenen Verletzungen.', 'Five rules prevent the most commonly missed injuries.', 'پنج قانون از شایع‌ترین آسیب‌های از دست‌رفته جلوگیری می‌کند.'),
    items: [
      { title: L('Immer zwei Gelenke', 'Always two joints', 'همیشه دو مفصل'), text: L('Ganzunterarm in zwei Ebenen einschließlich Ellenbogen und Handgelenk.', 'Image the whole forearm in two planes including elbow and wrist.', 'کل ساعد در دو نما شامل آرنج و مچ تصویربرداری شود.') },
      { title: L('Ulna → Radiusköpfchen', 'Ulna → radial head', 'اولنا ← سر رادیوس'), text: L('Bei Ulnaschaftfraktur die radiokapitellare Linie aktiv prüfen: Monteggia ausschließen.', 'With an ulnar shaft fracture, actively check the radiocapitellar line: exclude Monteggia.', 'در شکستگی تنه اولنا خط رادیوکاپیتلار فعالانه بررسی شود: مونتگیا رد شود.') },
      { title: L('Radius → DRUG', 'Radius → DRUJ', 'رادیوس ← DRUJ'), text: L('Bei distaler Radiusschaftfraktur DRUG-Weite und Ulnakopfposition prüfen: Galeazzi ausschließen.', 'With a distal radial shaft fracture, assess DRUJ width and ulnar-head position: exclude Galeazzi.', 'در شکستگی تنه دیستال رادیوس عرض DRUJ و موقعیت سر اولنا بررسی شود: گالئاتزی رد شود.') },
      { title: L('Bado = Luxationsrichtung', 'Bado = dislocation direction', 'بادو = جهت لوکساسیون'), text: L('Die Richtung des Radiusköpfchens definiert den Bado-Typ.', 'The direction of the radial head defines the Bado type.', 'جهت سر رادیوس نوع بادو را تعریف می‌کند.') },
      { title: L('Rotation erhalten', 'Preserve rotation', 'حفظ چرخش'), text: L('Länge, Achse, Rotation und radialen Bogen anatomisch rekonstruieren, sonst droht dauerhafter Verlust der Pronosupination.', 'Restore length, axis, rotation and radial bow anatomically or permanent loss of pronosupination may result.', 'طول، محور، چرخش و قوس رادیوس باید آناتومیک بازسازی شوند؛ در غیر این صورت از دست رفتن دائمی پروناسیون/سوپیناسیون رخ می‌دهد.') },
    ],
  },
}

const LETTERS = ['A', 'B', 'C', 'D']
const Q = (id, question, options, correct, explanation) => ({
  id,
  question,
  options: options.map((text, i) => ({ id: LETTERS[i], text })),
  correct: LETTERS[correct],
  explanation,
  tags: ['unterarmschaftfrakturen'],
  fach: 'msk',
})

const QUESTION_CONTENT = [
  {
    id: 'monteggia-definition',
    q: L('Welche Kombination definiert eine klassische Monteggia-Fraktur-Luxation?', 'Which combination defines a classic Monteggia fracture-dislocation?', 'کدام ترکیب شکستگی-دررفتگی کلاسیک مونتگیا را تعریف می‌کند؟'),
    o: [
      L('Distale Radiusfraktur und DRUG-Luxation', 'Distal radial fracture and DRUJ dislocation', 'شکستگی دیستال رادیوس و لوکساسیون DRUJ'),
      L('Proximale Ulnafraktur oder Ulnadeformierung und Radiusköpfchenluxation', 'Proximal ulnar fracture or deformation and radial-head dislocation', 'شکستگی یا تغییر شکل اولنای پروگزیمال و لوکساسیون سر رادیوس'),
      L('Beide-Knochen-Fraktur ohne Gelenkbeteiligung', 'Both-bone fracture without joint involvement', 'شکستگی هر دو استخوان بدون درگیری مفصل'),
      L('Radiusköpfchenfraktur und Coronoidfraktur', 'Radial-head fracture and coronoid fracture', 'شکستگی سر رادیوس و کرونوئید'),
    ],
    c: 1,
    e: L('Monteggia verbindet eine proximale Ulnaverletzung mit einer Luxation des Radiusköpfchens. Bei Kindern kann statt einer sichtbaren Fraktur nur eine plastische Ulnadeformierung vorliegen.', 'Monteggia combines proximal ulnar injury with radial-head dislocation. In children, plastic ulnar deformation may replace an obvious fracture.', 'مونتگیا آسیب اولنای پروگزیمال را با لوکساسیون سر رادیوس ترکیب می‌کند. در کودکان ممکن است به‌جای شکستگی واضح فقط تغییر شکل پلاستیک اولنا وجود داشته باشد.'),
  },
  {
    id: 'bado-basis',
    q: L('Wodurch wird der Bado-Typ einer Monteggia-Läsion bestimmt?', 'What determines the Bado type of a Monteggia lesion?', 'نوع بادو در ضایعه مونتگیا بر چه اساسی تعیین می‌شود؟'),
    o: [L('Frakturhöhe der Ulna', 'Level of ulnar fracture', 'سطح شکستگی اولنا'), L('Richtung der Radiusköpfchenluxation', 'Direction of radial-head dislocation', 'جهت لوکساسیون سر رادیوس'), L('Anzahl der Ulnfragmente', 'Number of ulnar fragments', 'تعداد قطعات اولنا'), L('Grad der Radiusverkürzung', 'Degree of radial shortening', 'میزان کوتاهی رادیوس')],
    c: 1,
    e: L('Bado klassifiziert nach der Luxationsrichtung des Radiusköpfchens. Die Ulnangulation korreliert häufig, ist aber nicht das definierende Kriterium.', 'Bado classification is based on radial-head dislocation direction. Ulnar angulation often correlates but is not the defining criterion.', 'طبقه‌بندی بادو بر اساس جهت لوکساسیون سر رادیوس است. زاویه‌داری اولنا اغلب همبستگی دارد اما معیار تعریف‌کننده نیست.'),
  },
  {
    id: 'bado-one',
    q: L('Bei einer Monteggia-Läsion ist das Radiusköpfchen nach anterior luxiert. Welcher Bado-Typ liegt vor?', 'In a Monteggia lesion the radial head is dislocated anteriorly. Which Bado type is present?', 'در ضایعه مونتگیا سر رادیوس به قدام لوکس شده است. کدام نوع بادو مطرح است؟'),
    o: [L('Typ I', 'Type I', 'نوع I'), L('Typ II', 'Type II', 'نوع II'), L('Typ III', 'Type III', 'نوع III'), L('Typ IV', 'Type IV', 'نوع IV')],
    c: 0,
    e: L('Bado I ist die häufigste Form und zeigt eine anteriore Radiusköpfchenluxation, meist mit anteriorer Ulnangulation.', 'Bado I is the most common form and shows anterior radial-head dislocation, usually with anterior ulnar angulation.', 'بادو I شایع‌ترین نوع است و لوکساسیون قدامی سر رادیوس را نشان می‌دهد، معمولاً همراه با زاویه‌داری قدامی اولنا.'),
  },
  {
    id: 'galeazzi-definition',
    q: L('Welche Verletzungskombination entspricht einer Galeazzi-Fraktur-Luxation?', 'Which injury combination represents a Galeazzi fracture-dislocation?', 'کدام ترکیب آسیب با شکستگی-دررفتگی گالئاتزی مطابقت دارد؟'),
    o: [L('Distale Radiusschaftfraktur mit DRUG-Verletzung', 'Distal radial shaft fracture with DRUJ injury', 'شکستگی تنه دیستال رادیوس همراه با آسیب DRUJ'), L('Proximale Ulnafraktur mit Radiusköpfchenluxation', 'Proximal ulnar fracture with radial-head dislocation', 'شکستگی اولنای پروگزیمال همراه با لوکساسیون سر رادیوس'), L('Distale Ulnafraktur mit radiokarpaler Luxation', 'Distal ulnar fracture with radiocarpal dislocation', 'شکستگی دیستال اولنا همراه با لوکساسیون رادیوکارپال'), L('Radiusköpfchenfraktur mit Membrana-interossea-Ruptur', 'Radial-head fracture with interosseous-membrane rupture', 'شکستگی سر رادیوس همراه با پارگی غشای بین‌استخوانی')],
    c: 0,
    e: L('Galeazzi bedeutet distale Radiusschaftfraktur plus Verletzung des distalen Radioulnargelenks. Die DRUG-Instabilität darf nicht als Nebensache behandelt werden.', 'Galeazzi means a distal radial shaft fracture plus distal radioulnar joint injury. DRUJ instability must not be treated as incidental.', 'گالئاتزی یعنی شکستگی تنه دیستال رادیوس همراه با آسیب مفصل رادیواولنار دیستال. ناپایداری DRUJ نباید یافته فرعی تلقی شود.'),
  },
  {
    id: 'imaging-extent',
    q: L('Welche Röntgenuntersuchung ist bei Verdacht auf eine Unterarmschaftfraktur korrekt?', 'Which radiographic examination is correct for suspected forearm shaft fracture?', 'کدام بررسی رادیوگرافی برای شک به شکستگی تنه ساعد صحیح است؟'),
    o: [L('Nur die klinisch schmerzhafteste Stelle in einer Ebene', 'Only the most painful site in one view', 'فقط دردناک‌ترین محل در یک نما'), L('Unterarm in zwei Ebenen einschließlich Ellenbogen und Handgelenk', 'Forearm in two planes including elbow and wrist', 'ساعد در دو نما شامل آرنج و مچ'), L('Nur CT des Frakturbereichs', 'CT of the fracture area only', 'فقط CT محل شکستگی'), L('Nur Handgelenk AP und schräg', 'Wrist AP and oblique only', 'فقط مچ AP و مایل')],
    c: 1,
    e: L('Die gesamte funktionelle Einheit muss abgebildet werden. Nur so lassen sich Radiusköpfchenluxation bei Monteggia und DRUG-Verletzung bei Galeazzi sicher beurteilen.', 'The entire functional unit must be imaged. This is required to assess radial-head dislocation in Monteggia and DRUJ injury in Galeazzi.', 'کل واحد عملکردی باید تصویربرداری شود تا لوکساسیون سر رادیوس در مونتگیا و آسیب DRUJ در گالئاتزی قابل ارزیابی باشد.'),
  },
  {
    id: 'rcl',
    q: L('Welcher Befund spricht für eine Radiusköpfchenluxation?', 'Which finding indicates radial-head dislocation?', 'کدام یافته نشان‌دهنده لوکساسیون سر رادیوس است؟'),
    o: [L('Die Radiokapitellare Linie trifft nicht das Capitulum', 'The radiocapitellar line does not intersect the capitellum', 'خط رادیوکاپیتلار از کاپیتولوم عبور نمی‌کند'), L('Die anteriore Humeruslinie liegt vor dem Capitulum', 'The anterior humeral line lies anterior to the capitellum', 'خط قدامی هومروس جلوی کاپیتولوم قرار دارد'), L('Positive Ulnavarianz', 'Positive ulnar variance', 'واریانس اولنار مثبت'), L('Verbreitertes skapholunäres Intervall', 'Widened scapholunate interval', 'فاصله اسکافولونات گشاد')],
    c: 0,
    e: L('Die Achse des Radius muss in jeder Projektion durch das Capitulum verlaufen. Eine Abweichung ist hochverdächtig auf Radiusköpfchenluxation und bei Ulnaverletzung auf Monteggia.', 'The radial axis must pass through the capitellum on every view. Deviation strongly suggests radial-head dislocation and, with ulnar injury, Monteggia.', 'محور رادیوس باید در هر نما از کاپیتولوم عبور کند. انحراف به‌شدت به نفع لوکساسیون سر رادیوس و همراه با آسیب اولنا به نفع مونتگیا است.'),
  },
  {
    id: 'druj-pitfall',
    q: L('Warum darf eine scheinbare dorsale Ulnakopfsubluxation im Seitenbild nicht ungeprüft als Galeazzi-Verletzung gewertet werden?', 'Why should apparent dorsal ulnar-head subluxation on a lateral view not automatically be diagnosed as Galeazzi injury?', 'چرا ساب‌لوکساسیون ظاهری پشتی سر اولنا در نمای لترال نباید بدون بررسی به‌عنوان آسیب گالئاتزی تلقی شود؟'),
    o: [L('Weil das DRUG im Röntgen nie beurteilbar ist', 'Because the DRUJ can never be assessed on radiographs', 'چون DRUJ هرگز در رادیوگرافی قابل ارزیابی نیست'), L('Weil Fehlrotation der Aufnahme eine Pseudoluxation erzeugen kann', 'Because projectional malrotation can mimic dislocation', 'چون چرخش پروجکشن می‌تواند لوکساسیون کاذب ایجاد کند'), L('Weil Galeazzi nur bei Kindern vorkommt', 'Because Galeazzi occurs only in children', 'چون گالئاتزی فقط در کودکان رخ می‌دهد'), L('Weil der Ulnakopf physiologisch immer dorsal steht', 'Because the ulnar head is physiologically always dorsal', 'چون سر اولنا به‌طور طبیعی همیشه پشتی است')],
    c: 1,
    e: L('Eine streng seitliche Handgelenksaufnahme ist entscheidend. Bereits geringe Pronation oder Supination verändert die Projektion des Ulnakopfes und kann eine DRUG-Subluxation imitieren.', 'A true lateral wrist view is essential. Slight pronation or supination changes ulnar-head projection and may mimic DRUJ subluxation.', 'نمای لترال واقعی مچ ضروری است. پروناسیون یا سوپیناسیون خفیف تصویر سر اولنا را تغییر داده و می‌تواند ساب‌لوکساسیون DRUJ را تقلید کند.'),
  },
  {
    id: 'nightstick',
    q: L('Was bezeichnet der Begriff Nightstick-Fraktur?', 'What does the term nightstick fracture describe?', 'اصطلاح شکستگی نایت‌استیک به چه معناست؟'),
    o: [L('Isolierte Ulnaschaftfraktur nach direkter Gewalt', 'Isolated ulnar shaft fracture after direct trauma', 'شکستگی منفرد تنه اولنا پس از ضربه مستقیم'), L('Isolierte Radiusschaftfraktur nach Rotation', 'Isolated radial shaft fracture after rotation', 'شکستگی منفرد تنه رادیوس پس از چرخش'), L('Beide-Knochen-Fraktur bei Kindern', 'Paediatric both-bone fracture', 'شکستگی هر دو استخوان در کودک'), L('Ulnastyloidfraktur mit TFCC-Ruptur', 'Ulnar styloid fracture with TFCC tear', 'شکستگی استیلوئید اولنا همراه با پارگی TFCC')],
    c: 0,
    e: L('Die Nightstick-Fraktur ist eine isolierte Ulnaschaftfraktur durch direkten Schlag. Dennoch muss eine Radiusköpfchenluxation aktiv ausgeschlossen werden.', 'A nightstick fracture is an isolated ulnar shaft fracture caused by a direct blow. Radial-head dislocation must still be actively excluded.', 'نایت‌استیک شکستگی منفرد تنه اولنا بر اثر ضربه مستقیم است؛ با این حال لوکساسیون سر رادیوس باید فعالانه رد شود.'),
  },
  {
    id: 'adult-treatment',
    q: L('Was ist das zentrale operative Ziel bei dislozierten Unterarmschaftfrakturen des Erwachsenen?', 'What is the central surgical goal in displaced adult forearm shaft fractures?', 'هدف اصلی جراحی در شکستگی جابجاشده تنه ساعد بزرگسال چیست؟'),
    o: [L('Nur Verkürzung ausgleichen', 'Correct shortening only', 'فقط اصلاح کوتاهی'), L('Anatomische Wiederherstellung von Länge, Achse, Rotation und radialem Bogen', 'Anatomic restoration of length, axis, rotation and radial bow', 'بازسازی آناتومیک طول، محور، چرخش و قوس رادیوس'), L('Primäre Resektion des Radius', 'Primary radial resection', 'رزکسیون اولیه رادیوس'), L('Sechs Wochen Immobilisation ohne Reposition', 'Six weeks of immobilisation without reduction', 'شش هفته بی‌حرکتی بدون جااندازی')],
    c: 1,
    e: L('Die Unterarmrotation hängt stark von korrekter Länge, Achse, Rotation und radialem Bogen ab. Schon geringe Fehlstellungen können die Pronosupination dauerhaft einschränken.', 'Forearm rotation depends on correct length, axis, rotation and radial bow. Even small malalignment can permanently restrict pronosupination.', 'چرخش ساعد به طول، محور، چرخش و قوس صحیح رادیوس وابسته است. حتی بدراستایی کم می‌تواند پروناسیون/سوپیناسیون را دائماً محدود کند.'),
  },
  {
    id: 'child-bowing',
    q: L('Ein Kind hat eine subtile Biegung der proximalen Ulna ohne klare Frakturlinie. Welcher zusätzliche Befund muss besonders gesucht werden?', 'A child has subtle bowing of the proximal ulna without a clear fracture line. Which additional finding must be sought?', 'کودکی خمیدگی ظریف اولنای پروگزیمال بدون خط شکستگی واضح دارد. کدام یافته اضافی باید جستجو شود؟'),
    o: [L('Radiusköpfchenluxation', 'Radial-head dislocation', 'لوکساسیون سر رادیوس'), L('Skapholunäre Dissoziation', 'Scapholunate dissociation', 'دیسوسیشن اسکافولونات'), L('Kahnbeinfraktur', 'Scaphoid fracture', 'شکستگی اسکافوئید'), L('Humeruskopfnekrose', 'Humeral-head osteonecrosis', 'نکروز سر هومروس')],
    c: 0,
    e: L('Eine plastische Ulnadeformierung kann bei Kindern die knöcherne Monteggia-Komponente darstellen. Deshalb muss die radiokapitellare Linie sorgfältig geprüft werden.', 'Plastic ulnar deformation may be the bony component of a paediatric Monteggia lesion. The radiocapitellar line must therefore be carefully assessed.', 'تغییر شکل پلاستیک اولنا می‌تواند جزء استخوانی مونتگیا در کودک باشد؛ بنابراین خط رادیوکاپیتلار باید دقیق بررسی شود.'),
  },
  {
    id: 'compartment',
    q: L('Welche klinische Entwicklung ist nach einer dislozierten Unterarmschaftfraktur besonders alarmierend?', 'Which clinical development is particularly concerning after a displaced forearm shaft fracture?', 'کدام تغییر بالینی پس از شکستگی جابجاشده تنه ساعد به‌ویژه هشداردهنده است؟'),
    o: [L('Zunehmender Schmerz und Schmerz bei passiver Fingerdehnung', 'Increasing pain and pain with passive finger stretch', 'افزایش درد و درد با کشش غیرفعال انگشتان'), L('Leichte Hämatomverfärbung', 'Mild bruising', 'کبودی خفیف'), L('Schmerzabnahme nach Ruhigstellung', 'Pain reduction after immobilisation', 'کاهش درد پس از بی‌حرکتی'), L('Vorübergehende Schwellung unmittelbar nach Trauma', 'Transient swelling immediately after trauma', 'تورم گذرا بلافاصله پس از تروما')],
    c: 0,
    e: L('Zunehmender unverhältnismäßiger Schmerz, passive Dehnungsschmerzen und gespannte Muskellogen sind Warnzeichen eines akuten Kompartmentsyndroms und erfordern sofortige klinische Eskalation.', 'Increasing disproportionate pain, pain on passive stretch and tense compartments are warning signs of acute compartment syndrome and require immediate escalation.', 'درد فزاینده نامتناسب، درد با کشش غیرفعال و کمپارتمان‌های سفت علائم سندرم کمپارتمان حاد هستند و نیاز به اقدام فوری دارند.'),
  },
  {
    id: 'post-reduction',
    q: L('Was muss nach operativer Rekonstruktion einer Galeazzi-Fraktur erneut geprüft werden?', 'What must be reassessed after surgical reconstruction of a Galeazzi fracture?', 'پس از بازسازی جراحی شکستگی گالئاتزی چه چیزی باید دوباره بررسی شود؟'),
    o: [L('Nur die Hautnaht', 'Only the skin closure', 'فقط بخیه پوست'), L('Stabilität und Kongruenz des DRUG', 'DRUJ stability and congruity', 'پایداری و تطابق DRUJ'), L('Radiokarpaler Winkel ohne DRUG', 'Radiocarpal angle without the DRUJ', 'زاویه رادیوکارپال بدون DRUJ'), L('Nur die Ulnalänge', 'Only ulnar length', 'فقط طول اولنا')],
    c: 1,
    e: L('Nach Wiederherstellung der Radiuslänge und des radialen Bogens kann sich das DRUG reponieren, bleibt aber gelegentlich instabil. Deshalb sind erneute klinische und bildgebende Stabilitätsprüfung entscheidend.', 'Restoring radial length and bow may reduce the DRUJ, but instability can persist. Repeat clinical and radiographic stability assessment is therefore essential.', 'بازسازی طول و قوس رادیوس ممکن است DRUJ را جااندازی کند، اما ناپایداری می‌تواند باقی بماند؛ بنابراین ارزیابی مجدد بالینی و تصویربرداری ضروری است.'),
  },
]

export const UNTERARM_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  QUESTION_CONTENT.map(item => Q(
    `unterarm-${lang}-${item.id}`,
    item.q[lang],
    item.o.map(option => option[lang]),
    item.c,
    item.e[lang]
  )),
]))

const F = (id, category, front, answer, explanation) => ({
  id,
  topicId: 'unterarmschaftfrakturen',
  category,
  front,
  answer,
  explanation,
})

export const UNTERARM_FLASHCARDS = [
  F('unterarm-fc-01', L('Definition', 'Definition', 'تعریف'),
    L('Welche Strukturen bilden die funktionelle Einheit des Unterarms?', 'Which structures form the functional forearm unit?', 'کدام ساختارها واحد عملکردی ساعد را تشکیل می‌دهند؟'),
    L('Radius, Ulna, proximales und distales Radioulnargelenk sowie Membrana interossea.', 'Radius, ulna, proximal and distal radioulnar joints, and the interosseous membrane.', 'رادیوس، اولنا، مفاصل رادیواولنار پروگزیمال و دیستال و غشای بین‌استخوانی.'),
    L('Diese Strukturen bilden einen geschlossenen funktionellen Ring. Deshalb kann eine Schaftfraktur mit einer zweiten Gelenk- oder Bandverletzung kombiniert sein; bei der Bildanalyse müssen Ellenbogen und Handgelenk immer einbezogen werden.', 'These structures form a closed functional ring. A shaft fracture may therefore be combined with a second joint or ligament injury; elbow and wrist must always be included in imaging assessment.', 'این ساختارها یک حلقه عملکردی بسته می‌سازند. بنابراین شکستگی تنه می‌تواند با آسیب دوم مفصل یا رباط همراه باشد و آرنج و مچ باید همیشه در ارزیابی تصویربرداری وارد شوند.')),
  F('unterarm-fc-02', L('Bildgebung', 'Imaging', 'تصویربرداری'),
    L('Welche Standardaufnahmen sind bei einer Unterarmschaftfraktur erforderlich?', 'Which standard radiographs are required for a forearm shaft fracture?', 'کدام رادیوگرافی‌های استاندارد در شکستگی تنه ساعد لازم است؟'),
    L('Gesamter Unterarm in AP und streng seitlich, jeweils mit Ellenbogen und Handgelenk.', 'The entire forearm in AP and true lateral views, including elbow and wrist.', 'کل ساعد در نماهای AP و لترال واقعی، شامل آرنج و مچ.'),
    L('Teilaufnahmen können die entscheidende zweite Verletzung abschneiden. Am Ellenbogen wird die radiokapitellare Stellung für Monteggia, am Handgelenk das DRUG für Galeazzi beurteilt.', 'Partial views may exclude the decisive second injury. At the elbow, radiocapitellar alignment is checked for Monteggia; at the wrist, the DRUJ is assessed for Galeazzi.', 'نماهای محدود ممکن است آسیب دوم تعیین‌کننده را حذف کنند. در آرنج هم‌راستایی رادیوکاپیتلار برای مونتگیا و در مچ DRUJ برای گالئاتزی بررسی می‌شود.')),
  F('unterarm-fc-03', L('Monteggia', 'Monteggia', 'مونتگیا'),
    L('Was ist eine Monteggia-Fraktur-Luxation?', 'What is a Monteggia fracture-dislocation?', 'شکستگی-دررفتگی مونتگیا چیست؟'),
    L('Proximale Ulnaverletzung plus Luxation des Radiusköpfchens.', 'Proximal ulnar injury plus radial-head dislocation.', 'آسیب اولنای پروگزیمال همراه با لوکساسیون سر رادیوس.'),
    L('Die Ulnaverletzung kann eine komplette Fraktur, Grünholzfraktur oder besonders bei Kindern nur eine plastische Deformierung sein. Entscheidend ist die gestörte radiokapitellare Kongruenz.', 'The ulnar injury may be a complete fracture, greenstick fracture or, especially in children, plastic deformation only. The defining feature is disrupted radiocapitellar congruity.', 'آسیب اولنا می‌تواند شکستگی کامل، گرین‌استیک یا به‌ویژه در کودکان فقط تغییر شکل پلاستیک باشد. ویژگی اصلی اختلال تطابق رادیوکاپیتلار است.')),
  F('unterarm-fc-04', L('Monteggia', 'Monteggia', 'مونتگیا'),
    L('Was definiert die Bado-Klassifikation bei einer Monteggia-Läsion?', 'What defines the Bado classification in a Monteggia lesion?', 'طبقه‌بندی بادو در ضایعه مونتگیا بر چه اساسی است؟'),
    L('Die Richtung der Radiusköpfchenluxation.', 'The direction of radial-head dislocation.', 'جهت لوکساسیون سر رادیوس.'),
    L('Bado I ist anterior, Bado II posterior/posterolateral, Bado III lateral/anterolateral. Bado IV kombiniert meist eine anteriore Luxation mit Frakturen von Ulna und proximalem Radius.', 'Bado I is anterior, Bado II posterior/posterolateral and Bado III lateral/anterolateral. Bado IV usually combines anterior dislocation with fractures of the ulna and proximal radius.', 'بادو I قدامی، بادو II خلفی/خلفی‌جانبی و بادو III جانبی/قدامی‌جانبی است. بادو IV معمولاً لوکساسیون قدامی را با شکستگی اولنا و رادیوس پروگزیمال ترکیب می‌کند.')),
  F('unterarm-fc-05', L('Monteggia', 'Monteggia', 'مونتگیا'),
    L('Wie wird die radiokapitellare Linie zur Suche nach einer Monteggia-Luxation verwendet?', 'How is the radiocapitellar line used to detect Monteggia dislocation?', 'خط رادیوکاپیتلار چگونه برای تشخیص لوکساسیون مونتگیا استفاده می‌شود؟'),
    L('Die Radiusachse muss in jeder Projektion durch das Capitulum verlaufen.', 'The radial axis must pass through the capitellum on every projection.', 'محور رادیوس باید در هر نما از کاپیتولوم عبور کند.'),
    L('Trifft die Linie das Capitulum nicht, besteht der Verdacht auf Radiusköpfchenluxation. Die Prüfung ist bei jeder proximalen Ulnaverletzung und besonders bei kindlicher Ulnabiegung obligatorisch.', 'If the line misses the capitellum, radial-head dislocation is suspected. This check is mandatory in every proximal ulnar injury, especially paediatric ulnar bowing.', 'اگر خط از کاپیتولوم عبور نکند، لوکساسیون سر رادیوس مطرح است. این بررسی در هر آسیب اولنای پروگزیمال و به‌ویژه خمیدگی اولنا در کودک الزامی است.')),
  F('unterarm-fc-06', L('Galeazzi', 'Galeazzi', 'گالئاتزی'),
    L('Was ist eine Galeazzi-Fraktur-Luxation?', 'What is a Galeazzi fracture-dislocation?', 'شکستگی-دررفتگی گالئاتزی چیست؟'),
    L('Distale Radiusschaftfraktur plus Verletzung des DRUG.', 'Distal radial shaft fracture plus DRUJ injury.', 'شکستگی تنه دیستال رادیوس همراه با آسیب DRUJ.'),
    L('Die DRUG-Verletzung kann als Erweiterung, Subluxation oder Luxation mit dorsaler oder palmarer Ulnakopfverlagerung auftreten. Die Radiusfraktur allein beschreibt die Verletzung daher unvollständig.', 'DRUJ injury may present as widening, subluxation or dislocation with dorsal or volar ulnar-head displacement. Describing the radial fracture alone is therefore incomplete.', 'آسیب DRUJ ممکن است به‌صورت گشادشدگی، ساب‌لوکساسیون یا لوکساسیون با جابجایی پشتی یا کف‌دستی سر اولنا باشد؛ بنابراین توصیف شکستگی رادیوس به‌تنهایی ناکامل است.')),
  F('unterarm-fc-07', L('Galeazzi', 'Galeazzi', 'گالئاتزی'),
    L('Welche Röntgenzeichen sprechen bei einer Radiusfraktur für eine DRUG-Verletzung?', 'Which radiographic signs suggest DRUJ injury in a radial fracture?', 'کدام علائم رادیوگرافی در شکستگی رادیوس به نفع آسیب DRUJ هستند؟'),
    L('DRUG-Erweiterung, Ulnakopf-Subluxation, radiale Verkürzung und Ulnastyloidfraktur.', 'DRUJ widening, ulnar-head subluxation, radial shortening and ulnar styloid fracture.', 'گشادشدگی DRUJ، ساب‌لوکساسیون سر اولنا، کوتاهی رادیوس و شکستگی استیلوئید اولنا.'),
    L('Im AP-Bild wird die Gelenkweite beurteilt, im streng seitlichen Bild die dorsale oder palmare Ulnakopfposition. Kleine Avulsionsfragmente oder TFCC-Zeichen können zusätzliche Hinweise sein.', 'AP imaging assesses joint width; a true lateral view assesses dorsal or volar ulnar-head position. Small avulsion fragments or TFCC clues provide additional evidence.', 'در نمای AP عرض مفصل و در نمای لترال واقعی موقعیت پشتی یا کف‌دستی سر اولنا بررسی می‌شود. قطعات آولسیون کوچک یا علائم TFCC شواهد تکمیلی هستند.')),
  F('unterarm-fc-08', L('Galeazzi', 'Galeazzi', 'گالئاتزی'),
    L('Was ist die wichtigste Projektionsfalle bei der Beurteilung des DRUG?', 'What is the key projectional pitfall when assessing the DRUJ?', 'مهم‌ترین دام پروجکشن در ارزیابی DRUJ چیست؟'),
    L('Eine nicht echte Seitenaufnahme kann eine Ulnakopfsubluxation vortäuschen.', 'A non-true lateral view can mimic ulnar-head subluxation.', 'نمای لترال غیرواقعی می‌تواند ساب‌لوکساسیون سر اولنا را تقلید کند.'),
    L('Schon geringe Pronation oder Supination verändert die relative Projektion von Radius und Ulna. Bei Zweifel sind eine streng seitliche Wiederholungsaufnahme, Vergleichsaufnahme oder CT sinnvoll.', 'Even slight pronation or supination changes the relative projection of radius and ulna. If uncertain, obtain a true lateral repeat view, comparison view or CT.', 'حتی پروناسیون یا سوپیناسیون کم تصویر نسبی رادیوس و اولنا را تغییر می‌دهد. در صورت تردید نمای لترال واقعی تکراری، مقایسه‌ای یا CT مفید است.')),
  F('unterarm-fc-09', L('Frakturmuster', 'Fracture pattern', 'الگوی شکستگی'),
    L('Was ist eine Nightstick-Fraktur des Unterarms?', 'What is a nightstick fracture of the forearm?', 'شکستگی نایت‌استیک ساعد چیست؟'),
    L('Eine isolierte Ulnaschaftfraktur nach direkter Gewalteinwirkung.', 'An isolated ulnar shaft fracture caused by direct trauma.', 'شکستگی منفرد تنه اولنا بر اثر ضربه مستقیم.'),
    L('Der Name bezieht sich auf den Abwehrmechanismus gegen einen direkten Schlag. Trotz isolierter Ulnafraktur muss die radiokapitellare Stellung geprüft werden, damit keine Monteggia-Komponente übersehen wird.', 'The name refers to defending against a direct blow. Despite an isolated ulnar fracture, radiocapitellar alignment must be checked to avoid missing a Monteggia component.', 'نام آن به دفاع در برابر ضربه مستقیم اشاره دارد. با وجود شکستگی منفرد اولنا، هم‌راستایی رادیوکاپیتلار باید بررسی شود تا جزء مونتگیا از دست نرود.')),
  F('unterarm-fc-10', L('Kinder', 'Children', 'کودکان'),
    L('Warum ist eine plastische Ulnadeformierung beim Kind prüfungsrelevant?', 'Why is plastic ulnar deformation in a child exam-relevant?', 'چرا تغییر شکل پلاستیک اولنا در کودک از نظر آزمونی مهم است؟'),
    L('Sie kann die einzige knöcherne Komponente einer Monteggia-Läsion sein.', 'It may be the only bony component of a Monteggia lesion.', 'ممکن است تنها جزء استخوانی ضایعه مونتگیا باشد.'),
    L('Es muss keine klare Frakturlinie vorliegen. Eine subtile Ulnabiegung verändert die Länge und Achse des Rings und kann mit einer Radiusköpfchenluxation kombiniert sein.', 'There may be no clear fracture line. Subtle ulnar bowing alters ring length and axis and may be combined with radial-head dislocation.', 'ممکن است خط شکستگی واضح وجود نداشته باشد. خمیدگی ظریف اولنا طول و محور حلقه را تغییر داده و می‌تواند با لوکساسیون سر رادیوس همراه باشد.')),
  F('unterarm-fc-11', L('Befund', 'Reporting', 'گزارش'),
    L('Welche Dislokationsparameter gehören in den Befund einer Unterarmschaftfraktur?', 'Which displacement parameters belong in a forearm shaft fracture report?', 'کدام پارامترهای جابجایی باید در گزارش شکستگی تنه ساعد ذکر شوند؟'),
    L('Translation, Verkürzung, Angulation mit Scheitelrichtung und Rotation.', 'Translation, shortening, angulation with apex direction, and rotation.', 'ترجمه، کوتاهی، زاویه‌داری با جهت رأس و چرخش.'),
    L('Diese Parameter werden für Radius und Ulna getrennt beschrieben. Zusätzlich sind Frakturhöhe, Morphologie, Mehrfragmentarität sowie Ellenbogen- und DRUG-Kongruenz anzugeben.', 'These parameters are described separately for radius and ulna. Also report fracture level, morphology, comminution, and elbow and DRUJ congruity.', 'این پارامترها برای رادیوس و اولنا جداگانه توصیف می‌شوند. همچنین سطح، مورفولوژی، چندقطعه‌ای بودن و تطابق آرنج و DRUJ گزارش شود.')),
  F('unterarm-fc-12', L('Therapie', 'Treatment', 'درمان'),
    L('Was ist das Rekonstruktionsziel bei einer dislozierten Unterarmschaftfraktur des Erwachsenen?', 'What is the reconstruction goal in a displaced adult forearm shaft fracture?', 'هدف بازسازی در شکستگی جابجاشده تنه ساعد بزرگسال چیست؟'),
    L('Anatomische Wiederherstellung von Länge, Achse, Rotation und radialem Bogen.', 'Anatomic restoration of length, axis, rotation and radial bow.', 'بازسازی آناتومیک طول، محور، چرخش و قوس رادیوس.'),
    L('Die Pronosupination reagiert empfindlich auf Fehlstellung. Eine reine Stabilisierung ohne Wiederherstellung des radialen Bogens kann trotz knöcherner Heilung zu erheblicher Funktionseinschränkung führen.', 'Pronosupination is highly sensitive to malalignment. Stabilisation without restoring radial bow may cause major functional restriction despite bony union.', 'پروناسیون/سوپیناسیون به بدراستایی حساس است. تثبیت بدون بازسازی قوس رادیوس می‌تواند با وجود جوش‌خوردگی استخوانی محدودیت عملکردی شدید ایجاد کند.')),
  F('unterarm-fc-13', L('Therapie', 'Treatment', 'درمان'),
    L('Was muss nach Fixation einer Galeazzi-Fraktur überprüft werden?', 'What must be checked after fixation of a Galeazzi fracture?', 'پس از فیکساسیون شکستگی گالئاتزی چه چیزی باید بررسی شود؟'),
    L('Kongruenz und Stabilität des DRUG.', 'DRUJ congruity and stability.', 'تطابق و پایداری DRUJ.'),
    L('Die anatomische Radiusrekonstruktion kann das DRUG reponieren, garantiert aber keine Stabilität. Eine persistierende Instabilität kann zusätzliche Fixation oder Stabilisierung erfordern.', 'Anatomic radial reconstruction may reduce the DRUJ but does not guarantee stability. Persistent instability may require additional fixation or stabilisation.', 'بازسازی آناتومیک رادیوس ممکن است DRUJ را جااندازی کند اما پایداری را تضمین نمی‌کند. ناپایداری پایدار ممکن است به فیکساسیون یا تثبیت اضافی نیاز داشته باشد.')),
  F('unterarm-fc-14', L('Komplikation', 'Complication', 'عارضه'),
    L('Welche akute Komplikation muss bei Unterarmschaftfrakturen klinisch sofort ausgeschlossen werden?', 'Which acute complication must be urgently excluded clinically in forearm shaft fractures?', 'کدام عارضه حاد باید فوراً از نظر بالینی در شکستگی تنه ساعد رد شود؟'),
    L('Akutes Kompartmentsyndrom.', 'Acute compartment syndrome.', 'سندرم کمپارتمان حاد.'),
    L('Warnzeichen sind zunehmender unverhältnismäßiger Schmerz, Schmerz bei passiver Fingerdehnung und gespannte Muskellogen. Die Diagnose ist primär klinisch und darf nicht durch Bildgebung verzögert werden.', 'Warning signs are increasing disproportionate pain, pain on passive finger stretch and tense compartments. Diagnosis is primarily clinical and must not be delayed by imaging.', 'علائم هشدار شامل درد فزاینده نامتناسب، درد با کشش غیرفعال انگشتان و کمپارتمان‌های سفت است. تشخیص عمدتاً بالینی است و نباید با تصویربرداری به تأخیر افتد.')),
  F('unterarm-fc-15', L('Komplikation', 'Complication', 'عارضه'),
    L('Welche typischen Spätfolgen können nach Unterarmschaftfrakturen auftreten?', 'Which typical late complications may follow forearm shaft fractures?', 'چه عوارض دیررس تیپیکی پس از شکستگی تنه ساعد رخ می‌دهند؟'),
    L('Malunion, Pseudarthrose, radioulnare Synostose und chronische Gelenkinstabilität.', 'Malunion, non-union, radioulnar synostosis and chronic joint instability.', 'بدجوش‌خوردگی، جوش‌نخوردگی، سینوستوز رادیواولنار و ناپایداری مزمن مفصل.'),
    L('Fehlheilung kann den radialen Bogen und damit die Pronosupination beeinträchtigen. Zusätzlich können eine chronische Radiusköpfchenluxation nach übersehener Monteggia-Läsion oder eine persistierende DRUG-Instabilität nach Galeazzi verbleiben.', 'Malunion may alter radial bow and restrict pronosupination. Missed Monteggia injury may leave chronic radial-head dislocation, while Galeazzi injury may leave persistent DRUJ instability.', 'بدجوش‌خوردگی می‌تواند قوس رادیوس را تغییر داده و پروناسیون/سوپیناسیون را محدود کند. مونتگیای از دست‌رفته ممکن است لوکساسیون مزمن سر رادیوس و گالئاتزی ناپایداری پایدار DRUJ ایجاد کند.')),
]

export const UNTERARM_FLASHCARD_TOPIC = {
  id: 'unterarmschaftfrakturen',
  title: L('Unterarmschaftfrakturen', 'Forearm Shaft Fractures', 'شکستگی‌های تنه ساعد'),
  subtitle: L('Monteggia · Bado · Galeazzi · DRUG · Befundschema', 'Monteggia · Bado · Galeazzi · DRUJ · reporting', 'مونتگیا · بادو · گالئاتزی · DRUJ · گزارش'),
  area: 'MSK',
  chapter: L('Traumatologie & Frakturen', 'Trauma & Fractures', 'تروما و شکستگی‌ها'),
  icon: '🦴',
  iconImage: '/fach/msk.png',
  color: '#f97316',
  href: '/flashcards/unterarmschaftfrakturen',
}
