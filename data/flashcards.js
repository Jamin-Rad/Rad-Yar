export const FLASHCARD_TOPICS = [
  {
    id: 'meniskus',
    area: 'MSK',
    chapter: 'Knie',
    icon: '🦵',
    color: '#f97316',
    href: '/flashcards/meniskus',
    title: {
      de: 'Meniskus',
      en: 'Meniscus',
      fa: 'منیسک',
    },
    subtitle: {
      de: 'Anatomie · MRT-Grading · Rissdiagnostik · Therapie',
      en: 'Anatomy · MRI grading · tear criteria · therapy',
      fa: 'آناتومی · گریدینگ MRI · تشخیص پارگی · درمان',
    },
  },
  {
    "id": "haemangiom",
    "area": "Abdomen",
    "chapter": "Leber",
    "icon": "🟢",
    "color": "#10b981",
    "href": "/flashcards/haemangiom",
    "title": {
        "de": "Leberhämangiome",
        "en": "Liver haemangiomas",
        "fa": "همانژیوم‌های کبدی"
    },
    "subtitle": {
        "de": "Sono · CT · MRT · atypische Formen · DD Metastasen",
        "en": "Ultrasound · CT · MRI · atypical forms · DD metastases",
        "fa": "سونوگرافی · CT · MRI · فرم آتیپیک · افتراق از متاستاز"
    }
}
]

export const FLASHCARDS = [
  {
    id: 'meniskus-01-anatomie-funktion',
    topicId: 'meniskus',
    category: { de: 'Anatomie', en: 'Anatomy', fa: 'آناتومی' },
    front: {
      de: 'Welche Grundfunktionen haben die Menisken im Kniegelenk?',
      en: 'What are the main functions of the menisci in the knee joint?',
      fa: 'وظایف اصلی منیسک‌ها در مفصل زانو چیست؟',
    },
    back: {
      de: 'Die Menisken sind faserknorpelige Strukturen zwischen Femurkondylen und Tibiaplateau. Sie verbessern die Kongruenz der Gelenkflächen, verteilen die axiale Last großflächiger und wirken als Stoßdämpfer bei Belastung und Rotation.',
      en: 'The menisci are fibrocartilaginous structures between the femoral condyles and the tibial plateau. They improve joint congruence, distribute axial load over a larger surface, and act as shock absorbers during loading and rotation.',
      fa: 'منیسک‌ها ساختارهای فیبروکارتیلاژ بین کندیل‌های فمور و پلاتوی تیبیا هستند. آن‌ها تطابق سطح مفصلی را بهتر می‌کنند، بار محوری را روی سطح بزرگ‌تری پخش می‌کنند و هنگام فشار و چرخش مثل ضربه‌گیر عمل می‌کنند.',
    },
  },
  {
    id: 'meniskus-02-innen-aussen',
    topicId: 'meniskus',
    category: { de: 'Anatomie', en: 'Anatomy', fa: 'آناتومی' },
    front: {
      de: 'Warum reißt der Innenmeniskus deutlich häufiger als der Außenmeniskus?',
      en: 'Why does the medial meniscus tear more often than the lateral meniscus?',
      fa: 'چرا منیسک داخلی خیلی بیشتر از منیسک خارجی پاره می‌شود؟',
    },
    back: {
      de: 'Der Innenmeniskus ist C-förmig und fest mit Gelenkkapsel und medialem Kollateralband verbunden. Dadurch ist er weniger mobil und kann Rotations- oder Scherkräften schlechter ausweichen. Der Außenmeniskus ist beweglicher und nicht am lateralen Kollateralband fixiert.',
      en: 'The medial meniscus is C-shaped and firmly attached to the capsule and medial collateral ligament. This reduces its mobility and makes it less able to escape rotational or shear forces. The lateral meniscus is more mobile and not fixed to the lateral collateral ligament.',
      fa: 'منیسک داخلی C شکل است و به کپسول مفصلی و لیگامان کولترال داخلی اتصال محکم دارد. به همین دلیل تحرک کمتری دارد و در برابر نیروهای چرخشی یا برشی کمتر می‌تواند جاخالی بدهد. منیسک خارجی متحرک‌تر است و به LCL متصل نیست.',
    },
  },
  {
    id: 'meniskus-03-wurzeln',
    topicId: 'meniskus',
    category: { de: 'Anatomie', en: 'Anatomy', fa: 'آناتومی' },
    front: {
      de: 'Welche Bedeutung haben die Meniskuswurzeln?',
      en: 'What is the role of the meniscal roots?',
      fa: 'اهمیت ریشه‌های منیسک چیست؟',
    },
    back: {
      de: 'Die Meniskuswurzeln verankern Vorderhorn und Hinterhorn jedes Meniskus fest am Tibiaplateau. Dadurch bleibt die Ringstruktur stabil und die Menisken können Last in zirkumferente Zugspannung umwandeln. Eine Root-Läsion wirkt biomechanisch ähnlich wie ein Funktionsverlust des Meniskus.',
      en: 'The meniscal roots firmly anchor the anterior and posterior horns of each meniscus to the tibial plateau. This stabilizes the ring structure and allows load transmission into circumferential hoop stress. A root tear is biomechanically similar to functional meniscal loss.',
      fa: 'ریشه‌های منیسک شاخ قدامی و خلفی هر منیسک را به پلاتوی تیبیا محکم متصل می‌کنند. این اتصال باعث حفظ ساختار حلقوی و تبدیل فشار به کشش محیطی می‌شود. پارگی ریشه از نظر بیومکانیک شبیه از دست رفتن عملکرد منیسک است.',
    },
  },
  {
    id: 'meniskus-04-vaskularisation',
    topicId: 'meniskus',
    category: { de: 'Vaskularisation', en: 'Vascularity', fa: 'خون‌رسانی' },
    front: {
      de: 'Welche vaskulären Zonen des Meniskus gibt es?',
      en: 'Which vascular zones are found in the meniscus?',
      fa: 'زون‌های خون‌رسانی منیسک کدام‌اند؟',
    },
    back: {
      de: 'Peripher liegt die rote Zone mit guter Blutversorgung, kapselnah meist < 3 mm. Daran schließt die rot-weiße Zone mit eingeschränkter Durchblutung an. Zentral liegt die weiße Zone; sie ist avaskulär und wird überwiegend über Synovialflüssigkeit ernährt.',
      en: 'Peripherally, the red zone has good blood supply, usually within 3 mm of the capsule. The red-white zone has limited vascularity. The central white zone is avascular and is mainly nourished by synovial fluid diffusion.',
      fa: 'در قسمت محیطی، زون قرمز قرار دارد که نزدیک کپسول است و خون‌رسانی خوبی دارد، معمولاً کمتر از ۳ میلی‌متر از کپسول. بعد از آن زون قرمز-سفید با خون‌رسانی محدود است. بخش مرکزی زون سفید است، آواسکولار بوده و بیشتر از مایع سینوویال تغذیه می‌شود.',
    },
  },
  {
    id: 'meniskus-05-heilung',
    topicId: 'meniskus',
    category: { de: 'Vaskularisation', en: 'Vascularity', fa: 'خون‌رسانی' },
    front: {
      de: 'Warum ist die Lage eines Meniskusrisses für die Heilung entscheidend?',
      en: 'Why is tear location crucial for meniscal healing?',
      fa: 'چرا محل پارگی منیسک برای ترمیم مهم است؟',
    },
    back: {
      de: 'Je näher der Riss an der Kapsel liegt, desto besser ist das Heilungspotenzial. Risse in der roten Zone haben die beste Chance für eine Naht. In der rot-weißen Zone ist die Entscheidung individuell. In der weißen Zone fehlt meist die biologische Heilungstendenz.',
      en: 'The closer the tear is to the capsule, the better the healing potential. Tears in the red zone have the best chance after repair. In the red-white zone the decision is individualized. In the white zone biological healing potential is usually poor.',
      fa: 'هرچه پارگی به کپسول نزدیک‌تر باشد، شانس ترمیم بهتر است. پارگی در زون قرمز بهترین شانس برای بخیه دارد. در زون قرمز-سفید تصمیم باید موردی باشد. در زون سفید معمولاً توان ترمیم بیولوژیک کافی وجود ندارد.',
    },
  },
  {
    id: 'meniskus-06-mrt-protokoll',
    topicId: 'meniskus',
    category: { de: 'MRT', en: 'MRI', fa: 'MRI' },
    front: {
      de: 'Welche MRT-Sequenzen sind für die Meniskusdiagnostik besonders wichtig?',
      en: 'Which MRI sequences are particularly important for meniscal imaging?',
      fa: 'کدام سکانس‌های MRI برای بررسی منیسک مهم‌تر هستند؟',
    },
    back: {
      de: 'Wichtig sind dünnschichtige sagittale und koronare PD- oder T2-gewichtete Sequenzen, häufig mit Fettsättigung. Flüssigkeitssensitive Sequenzen zeigen Rissspalt, Begleitödem und ligamentäre Begleitverletzungen deutlich. Zu dicke Schichten erhöhen den Partialvolumeneffekt.',
      en: 'Thin-slice sagittal and coronal PD- or T2-weighted sequences, often with fat suppression, are essential. Fluid-sensitive sequences show tear clefts, associated edema, and ligament injuries. Thick slices increase partial-volume artifacts.',
      fa: 'سکانس‌های نازک ساژیتال و کرونال PD یا T2، اغلب با Fat-Sat، مهم هستند. سکانس‌های حساس به مایع، شکاف پارگی، ادم همراه و آسیب رباط‌ها را بهتر نشان می‌دهند. ضخامت زیاد اسلایس باعث خطای Partial volume می‌شود.',
    },
  },
  {
    id: 'meniskus-07-normalbefund',
    topicId: 'meniskus',
    category: { de: 'MRT', en: 'MRI', fa: 'MRI' },
    front: {
      de: 'Wie sieht ein normaler Meniskus im MRT typischerweise aus?',
      en: 'What is the typical MRI appearance of a normal meniscus?',
      fa: 'نمای طبیعی منیسک در MRI چگونه است؟',
    },
    back: {
      de: 'Der normale Meniskus erscheint als homogen hypointense, dreieckige Struktur. Die Ränder sind glatt, die Form ist erhalten und es besteht keine pathologische Signalsteigerung mit Kontakt zur superioren oder inferioren Gelenkfläche.',
      en: 'A normal meniscus appears as a homogeneous low-signal triangular structure. The margins are smooth, morphology is preserved, and there is no abnormal signal reaching the superior or inferior articular surface.',
      fa: 'منیسک طبیعی به صورت ساختار مثلثی با سیگنال پایین و یکنواخت دیده می‌شود. حاشیه‌ها صاف هستند، شکل حفظ شده است و افزایش سیگنال پاتولوژیک با تماس با سطح فوقانی یا تحتانی مفصلی وجود ندارد.',
    },
  },
  {
    id: 'meniskus-08-lotysch-grad1',
    topicId: 'meniskus',
    category: { de: 'Lotysch', en: 'Lotysch', fa: 'Lotysch' },
    front: {
      de: 'Was bedeutet Grad 1 nach Lotysch?',
      en: 'What does Lotysch grade 1 mean?',
      fa: 'گرید ۱ در طبقه‌بندی Lotysch یعنی چه؟',
    },
    back: {
      de: 'Grad 1 beschreibt eine punktförmige oder kleine fokale Signalsteigerung innerhalb des Meniskus ohne Kontakt zur Oberfläche. Meist entspricht dies einer frühen intrameniskalen Degeneration und nicht einem sicheren Riss.',
      en: 'Grade 1 describes punctate or small focal intrameniscal signal increase without surface contact. It usually represents early intrameniscal degeneration rather than a definite tear.',
      fa: 'گرید ۱ یعنی افزایش سیگنال نقطه‌ای یا کوچک داخل منیسک بدون تماس با سطح مفصلی. این حالت معمولاً دژنراسیون اولیه داخل منیسک است و پارگی قطعی محسوب نمی‌شود.',
    },
  },
  {
    id: 'meniskus-09-lotysch-grad2',
    topicId: 'meniskus',
    category: { de: 'Lotysch', en: 'Lotysch', fa: 'Lotysch' },
    front: {
      de: 'Wie unterscheiden sich Grad 2a, 2b und 2c nach Lotysch?',
      en: 'How do Lotysch grades 2a, 2b and 2c differ?',
      fa: 'تفاوت گریدهای ۲a، ۲b و ۲c در Lotysch چیست؟',
    },
    back: {
      de: 'Grad 2a ist eine lineare Signalsteigerung ohne Oberflächenkontakt. Grad 2b ist linear und berührt die Oberfläche nur auf einer einzelnen Schicht. Grad 2c ist keilförmig oder globulär, bleibt aber ohne sicheren Oberflächenkontakt. Alle sind noch kein sicherer Grad-3-Riss.',
      en: 'Grade 2a is linear signal increase without surface contact. Grade 2b is linear and touches the surface on only one slice. Grade 2c is wedge-shaped or globular but lacks definite surface contact. None of these is a definite grade-3 tear.',
      fa: 'گرید ۲a افزایش سیگنال خطی بدون تماس سطحی است. گرید ۲b خطی است و فقط در یک اسلایس با سطح تماس دارد. گرید ۲c حالت گوه‌ای یا گلوبولار دارد ولی تماس سطحی قطعی ندارد. هیچ‌کدام هنوز پارگی قطعی گرید ۳ نیستند.',
    },
  },
  {
    id: 'meniskus-10-grad3',
    topicId: 'meniskus',
    category: { de: 'Rissdiagnostik', en: 'Tear diagnosis', fa: 'تشخیص پارگی' },
    front: {
      de: 'Was ist der entscheidende Schwellenwert für die Diagnose eines Meniskusrisses im MRT?',
      en: 'What is the key threshold for diagnosing a meniscal tear on MRI?',
      fa: 'آستانه کلیدی برای تشخیص پارگی منیسک در MRI چیست؟',
    },
    back: {
      de: 'Entscheidend ist Grad 3: eine pathologische Signalsteigerung im Meniskus mit sicherem Kontakt zur superioren oder inferioren Oberfläche. Für hohe Spezifität sollte der Oberflächenkontakt auf mindestens zwei direkt benachbarten Schichten nachvollziehbar sein.',
      en: 'The key threshold is grade 3: abnormal intrameniscal signal with definite contact to the superior or inferior surface. For high specificity, surface contact should be visible on at least two consecutive slices.',
      fa: 'نقطه تصمیم‌گیری گرید ۳ است: افزایش سیگنال پاتولوژیک داخل منیسک با تماس قطعی با سطح فوقانی یا تحتانی. برای اختصاصیت بالا، این تماس باید حداقل در دو اسلایس متوالی دیده شود.',
    },
  },
  {
    id: 'meniskus-11-two-slice',
    topicId: 'meniskus',
    category: { de: 'Rissdiagnostik', en: 'Tear diagnosis', fa: 'تشخیص پارگی' },
    front: {
      de: 'Wozu dient die Two-slice-touch-Regel?',
      en: 'What is the purpose of the two-slice-touch rule?',
      fa: 'قانون Two-slice-touch چه کاربردی دارد؟',
    },
    back: {
      de: 'Die Regel reduziert falsch-positive Befunde durch Partialvolumen, Rauschen oder einzelne degenerative Signale. Ein echter Riss ist wahrscheinlicher, wenn die Signalsteigerung die Meniskusoberfläche auf mindestens zwei benachbarten Schichten erreicht.',
      en: 'The rule reduces false positives caused by partial volume, noise, or isolated degenerative signal. A true tear is more likely when the signal reaches the meniscal surface on at least two adjacent slices.',
      fa: 'این قانون خطاهای مثبت کاذب ناشی از Partial volume، نویز یا سیگنال دژنراتیو منفرد را کاهش می‌دهد. وقتی افزایش سیگنال حداقل در دو اسلایس مجاور به سطح منیسک برسد، احتمال پارگی واقعی بیشتر است.',
    },
  },
  {
    id: 'meniskus-12-rissformen',
    topicId: 'meniskus',
    category: { de: 'Rissformen', en: 'Tear patterns', fa: 'انواع پارگی' },
    front: {
      de: 'Welche typischen Meniskusrissformen sollte man im MRT aktiv suchen?',
      en: 'Which common meniscal tear patterns should be actively searched for on MRI?',
      fa: 'در MRI باید فعالانه دنبال چه انواعی از پارگی منیسک گشت؟',
    },
    back: {
      de: 'Wichtige Muster sind horizontaler Riss, longitudinaler/vertikaler Riss, radiärer Riss, Korbhenkelriss, Flap-Riss und Root-Läsion. Radiäre und Root-Risse sind besonders relevant, weil sie die zirkumferente Lastübertragung stark stören können.',
      en: 'Important patterns include horizontal, longitudinal/vertical, radial, bucket-handle, flap, and root tears. Radial and root tears are particularly important because they can severely disrupt circumferential load transmission.',
      fa: 'الگوهای مهم شامل پارگی افقی، طولی/عمودی، رادیال، Bucket-handle، Flap و پارگی ریشه هستند. پارگی‌های رادیال و ریشه اهمیت ویژه دارند چون انتقال بار محیطی منیسک را به‌شدت مختل می‌کنند.',
    },
  },
  {
    id: 'meniskus-13-lokalisation',
    topicId: 'meniskus',
    category: { de: 'Rissdiagnostik', en: 'Tear diagnosis', fa: 'تشخیص پارگی' },
    front: {
      de: 'Wo liegen Meniskusrisse typischerweise am häufigsten?',
      en: 'Where are meniscal tears most commonly located?',
      fa: 'پارگی منیسک معمولاً بیشتر در کدام قسمت دیده می‌شود؟',
    },
    back: {
      de: 'Beim Innenmeniskus ist das Hinterhorn besonders häufig betroffen, in der Lernseite mit etwa 98 % angegeben. Beim Außenmeniskus ist das Hinterhorn ebenfalls wichtig, aber die Verteilung ist ausgeglichener; Vorderhorn und Corpus sind häufiger beteiligt als medial.',
      en: 'In the medial meniscus, the posterior horn is most frequently involved, listed on the learning page as about 98%. In the lateral meniscus, the posterior horn is also important, but distribution is more balanced, with the anterior horn and body involved more often than medially.',
      fa: 'در منیسک داخلی، شاخ خلفی شایع‌ترین محل درگیری است و در صفحه آموزشی حدود ۹۸٪ ذکر شده است. در منیسک خارجی، شاخ خلفی هم مهم است، ولی توزیع متعادل‌تر است و شاخ قدامی و تنه بیشتر از منیسک داخلی درگیر می‌شوند.',
    },
  },
  {
    id: 'meniskus-14-discoid',
    topicId: 'meniskus',
    category: { de: 'Discoider Meniskus', en: 'Discoid meniscus', fa: 'منیسک دیسکوئید' },
    front: {
      de: 'Was ist ein discoider Meniskus und welches sagittale MRT-Zeichen ist typisch?',
      en: 'What is a discoid meniscus and which sagittal MRI sign is typical?',
      fa: 'منیسک دیسکوئید چیست و علامت ساژیتال تیپیک آن در MRI چیست؟',
    },
    back: {
      de: 'Ein discoider Meniskus ist eine angeborene Variante, fast immer des Außenmeniskus, mit verbreitertem, scheibenförmigem Meniskuskörper. Typisch ist das sagittale Zeichen: Meniskusgewebe bleibt auf ungewöhnlich vielen konsekutiven Sagittalschichten sichtbar.',
      en: 'A discoid meniscus is a congenital variant, almost always affecting the lateral meniscus, with a widened disc-shaped body. A typical sagittal sign is persistent meniscal tissue visible on an unusually high number of consecutive sagittal slices.',
      fa: 'منیسک دیسکوئید یک واریانت مادرزادی است، تقریباً همیشه در منیسک خارجی، که در آن تنه منیسک پهن و دیسک‌مانند است. علامت ساژیتال تیپیک این است که بافت منیسک در تعداد غیرطبیعی زیادی از اسلایس‌های ساژیتال پشت سر هم دیده می‌شود.',
    },
  },
  {
    id: 'meniskus-15-save-meniscus',
    topicId: 'meniskus',
    category: { de: 'Therapie', en: 'Therapy', fa: 'درمان' },
    front: {
      de: 'Was bedeutet „Save the Meniscus“ therapeutisch?',
      en: 'What does “Save the Meniscus” mean therapeutically?',
      fa: 'اصل «Save the Meniscus» در درمان یعنی چه؟',
    },
    back: {
      de: 'Der Meniskus soll möglichst erhalten werden, weil seine Entfernung die Lastverteilung verschlechtert und langfristig das Arthroserisiko erhöht. Eine Naht ist besonders bei peripheren, frischen, longitudinalen Rissen und Root-Läsionen relevant; zentrale degenerative Risse werden häufiger teilreseziert oder konservativ behandelt.',
      en: 'The meniscus should be preserved whenever possible because removal worsens load distribution and increases long-term osteoarthritis risk. Repair is particularly relevant for peripheral, acute longitudinal tears and root tears; central degenerative tears are more often partially resected or treated conservatively.',
      fa: 'منیسک تا حد امکان باید حفظ شود، چون برداشتن آن توزیع بار را بدتر می‌کند و خطر آرتروز طولانی‌مدت را بالا می‌برد. بخیه به‌ویژه در پارگی‌های محیطی، تازه، طولی و پارگی ریشه مهم است؛ پارگی‌های مرکزی دژنراتیو بیشتر با رزکسیون محدود یا درمان محافظه‌کارانه مدیریت می‌شوند.',
    },
  },
  {
      "id": "haemangiom-01-definition",
      "topicId": "haemangiom",
      "category": {
        "de": "Grundlagen",
        "en": "Basics",
        "fa": "مبانی"
      },
      "front": {
        "de": "Was ist ein Leberhämangiom pathologisch?",
        "en": "What is a liver haemangioma pathologically?",
        "fa": "همانژیوم کبدی از نظر پاتولوژی چیست؟"
      },
      "answer": {
        "de": "Kavernöse nicht-neoplastische Malformation.",
        "en": "Cavernous non-neoplastic malformation.",
        "fa": "مالفورماسیون کاورنوز غیرنئوپلاستیک."
      },
      "explanation": {
        "de": "Ein Hämangiom ist kein echter maligner oder prämaligner Tumor, sondern eine vaskuläre Malformation. Deshalb ist bei klassischer Bildgebung meist keine invasive Abklärung nötig.",
        "en": "A haemangioma is not a true malignant or premalignant tumour, but a vascular malformation. Therefore, classic imaging usually does not require invasive work-up.",
        "fa": "همانژیوم یک تومور بدخیم یا پیش‌بدخیم واقعی نیست، بلکه یک مالفورماسیون عروقی است. بنابراین در تصویر تیپیک معمولاً نیازی به بررسی تهاجمی نیست."
      },
      "back": {
        "de": "Kavernöse nicht-neoplastische Malformation.\n\nEin Hämangiom ist kein echter maligner oder prämaligner Tumor, sondern eine vaskuläre Malformation. Deshalb ist bei klassischer Bildgebung meist keine invasive Abklärung nötig.",
        "en": "Cavernous non-neoplastic malformation.\n\nA haemangioma is not a true malignant or premalignant tumour, but a vascular malformation. Therefore, classic imaging usually does not require invasive work-up.",
        "fa": "مالفورماسیون کاورنوز غیرنئوپلاستیک.\n\nهمانژیوم یک تومور بدخیم یا پیش‌بدخیم واقعی نیست، بلکه یک مالفورماسیون عروقی است. بنابراین در تصویر تیپیک معمولاً نیازی به بررسی تهاجمی نیست."
      }
    },
    {
      "id": "haemangiom-02-epidemiologie",
      "topicId": "haemangiom",
      "category": {
        "de": "Grundlagen",
        "en": "Basics",
        "fa": "مبانی"
      },
      "front": {
        "de": "Welcher gutartige solide Lebertumor ist am häufigsten?",
        "en": "Which benign solid liver tumour is most common?",
        "fa": "شایع‌ترین تومور جامد خوش‌خیم کبد چیست؟"
      },
      "answer": {
        "de": "Leberhämangiom.",
        "en": "Liver haemangioma.",
        "fa": "همانژیوم کبدی."
      },
      "explanation": {
        "de": "Hämangiome werden häufig zufällig bei Screening- oder Staging-Untersuchungen gefunden. Sie sind bei Frauen häufiger und liegen oft peripher im Leberparenchym.",
        "en": "Haemangiomas are often found incidentally during screening or staging examinations. They are more frequent in women and are often peripheral in the liver parenchyma.",
        "fa": "همانژیوم‌ها اغلب به صورت اتفاقی در بررسی‌های screening یا staging دیده می‌شوند. در زنان شایع‌ترند و معمولاً در قسمت محیطی پارانشیم کبد قرار دارند."
      },
      "back": {
        "de": "Leberhämangiom.\n\nHämangiome werden häufig zufällig bei Screening- oder Staging-Untersuchungen gefunden. Sie sind bei Frauen häufiger und liegen oft peripher im Leberparenchym.",
        "en": "Liver haemangioma.\n\nHaemangiomas are often found incidentally during screening or staging examinations. They are more frequent in women and are often peripheral in the liver parenchyma.",
        "fa": "همانژیوم کبدی.\n\nهمانژیوم‌ها اغلب به صورت اتفاقی در بررسی‌های screening یا staging دیده می‌شوند. در زنان شایع‌ترند و معمولاً در قسمت محیطی پارانشیم کبد قرار دارند."
      }
    },
    {
      "id": "haemangiom-03-sono-klassisch",
      "topicId": "haemangiom",
      "category": {
        "de": "Sonographie",
        "en": "Ultrasound",
        "fa": "سونوگرافی"
      },
      "front": {
        "de": "Wann reicht die Sonographie bei einem Leberhämangiom oft aus?",
        "en": "When is ultrasound often sufficient for a liver haemangioma?",
        "fa": "چه زمانی سونوگرافی برای همانژیوم کبدی کافی است؟"
      },
      "answer": {
        "de": "Bei klassischer Sonomorphologie.",
        "en": "When morphology is classic.",
        "fa": "وقتی ظاهر سونوگرافی کاملاً تیپیک باشد."
      },
      "explanation": {
        "de": "Ein typisches Hämangiom ist meist scharf begrenzt und echoreich. Bei kleiner, klassischer Läsion in unauffälliger Leber ist häufig keine zusätzliche CT oder MRT nötig.",
        "en": "A typical haemangioma is usually sharply marginated and hyperechoic. If the lesion is small and classic in an otherwise unremarkable liver, additional CT or MRI is often unnecessary.",
        "fa": "همانژیوم تیپیک معمولاً خوش‌حد و اکوژن است. اگر ضایعه کوچک و تیپیک باشد و کبد زمینه‌ای مشکل خاصی نداشته باشد، اغلب CT یا MRI اضافی لازم نیست."
      },
      "back": {
        "de": "Bei klassischer Sonomorphologie.\n\nEin typisches Hämangiom ist meist scharf begrenzt und echoreich. Bei kleiner, klassischer Läsion in unauffälliger Leber ist häufig keine zusätzliche CT oder MRT nötig.",
        "en": "When morphology is classic.\n\nA typical haemangioma is usually sharply marginated and hyperechoic. If the lesion is small and classic in an otherwise unremarkable liver, additional CT or MRI is often unnecessary.",
        "fa": "وقتی ظاهر سونوگرافی کاملاً تیپیک باشد.\n\nهمانژیوم تیپیک معمولاً خوش‌حد و اکوژن است. اگر ضایعه کوچک و تیپیک باشد و کبد زمینه‌ای مشکل خاصی نداشته باشد، اغلب CT یا MRI اضافی لازم نیست."
      }
    },
    {
      "id": "haemangiom-04-ct-muster",
      "topicId": "haemangiom",
      "category": {
        "de": "CT",
        "en": "CT",
        "fa": "CT"
      },
      "front": {
        "de": "Welches CT-Enhancement ist typisch für ein Leberhämangiom?",
        "en": "Which CT enhancement pattern is typical for liver haemangioma?",
        "fa": "کدام الگوی enhancement در CT برای همانژیوم کبدی تیپیک است؟"
      },
      "answer": {
        "de": "Peripher nodulär mit zentripetaler Auffüllung.",
        "en": "Peripheral nodular enhancement with centripetal fill-in.",
        "fa": "enhancement ندولار محیطی با پرشدگی مرکزگرا."
      },
      "explanation": {
        "de": "Früharteriell beginnt die Kontrastmittelaufnahme diskontinuierlich am Rand. In portalvenösen und späteren Phasen füllt sich die Läsion langsam von außen nach innen auf.",
        "en": "Early arterial enhancement starts discontinuously at the rim. In portal venous and delayed phases, the lesion slowly fills in from the outside toward the centre.",
        "fa": "در فاز شریانی زودرس، جذب ماده حاجب به صورت ناپیوسته از حاشیه شروع می‌شود. در فاز پورتال و تأخیری، ضایعه آهسته از بیرون به مرکز پر می‌شود."
      },
      "back": {
        "de": "Peripher nodulär mit zentripetaler Auffüllung.\n\nFrüharteriell beginnt die Kontrastmittelaufnahme diskontinuierlich am Rand. In portalvenösen und späteren Phasen füllt sich die Läsion langsam von außen nach innen auf.",
        "en": "Peripheral nodular enhancement with centripetal fill-in.\n\nEarly arterial enhancement starts discontinuously at the rim. In portal venous and delayed phases, the lesion slowly fills in from the outside toward the centre.",
        "fa": "enhancement ندولار محیطی با پرشدگی مرکزگرا.\n\nدر فاز شریانی زودرس، جذب ماده حاجب به صورت ناپیوسته از حاشیه شروع می‌شود. در فاز پورتال و تأخیری، ضایعه آهسته از بیرون به مرکز پر می‌شود."
      },
      "diagram": {
        "de": "Arteriell: Randnoduli → Portal/spät: Zentrum füllt sich",
        "en": "Arterial: rim nodules → portal/delayed: centre fills in",
        "fa": "شریانی: ندول‌های محیطی → پورتال/تأخیری: پر شدن مرکز"
      }
    },
    {
      "id": "haemangiom-05-iris",
      "topicId": "haemangiom",
      "category": {
        "de": "CT",
        "en": "CT",
        "fa": "CT"
      },
      "front": {
        "de": "Was bedeutet das Irisblendenphänomen beim Leberhämangiom?",
        "en": "What does the iris diaphragm phenomenon mean in liver haemangioma?",
        "fa": "پدیده Iris diaphragm در همانژیوم کبدی یعنی چه؟"
      },
      "answer": {
        "de": "Zentripetale KM-Auffüllung.",
        "en": "Centripetal contrast fill-in.",
        "fa": "پرشدگی مرکزگرا با ماده حاجب."
      },
      "explanation": {
        "de": "Die Läsion füllt sich dynamisch von der Peripherie zum Zentrum. Dieses Verhalten ist viel typischer für Hämangiom als für malignes Ringenhancement.",
        "en": "The lesion fills dynamically from the periphery to the centre. This behaviour is far more typical of haemangioma than malignant rim enhancement.",
        "fa": "ضایعه به صورت دینامیک از محیط به سمت مرکز پر می‌شود. این رفتار برای همانژیوم بسیار تیپیک‌تر از rim enhancement بدخیم است."
      },
      "back": {
        "de": "Zentripetale KM-Auffüllung.\n\nDie Läsion füllt sich dynamisch von der Peripherie zum Zentrum. Dieses Verhalten ist viel typischer für Hämangiom als für malignes Ringenhancement.",
        "en": "Centripetal contrast fill-in.\n\nThe lesion fills dynamically from the periphery to the centre. This behaviour is far more typical of haemangioma than malignant rim enhancement.",
        "fa": "پرشدگی مرکزگرا با ماده حاجب.\n\nضایعه به صورت دینامیک از محیط به سمت مرکز پر می‌شود. این رفتار برای همانژیوم بسیار تیپیک‌تر از rim enhancement بدخیم است."
      }
    },
    {
      "id": "haemangiom-06-t2",
      "topicId": "haemangiom",
      "category": {
        "de": "MRT",
        "en": "MRI",
        "fa": "MRI"
      },
      "front": {
        "de": "Welches T2-Zeichen spricht stark für ein typisches Leberhämangiom?",
        "en": "Which T2 sign strongly supports a typical liver haemangioma?",
        "fa": "کدام علامت T2 به شدت به نفع همانژیوم تیپیک کبدی است؟"
      },
      "answer": {
        "de": "Light-bulb sign.",
        "en": "Light-bulb sign.",
        "fa": "علامت Light-bulb."
      },
      "explanation": {
        "de": "Typische Hämangiome sind in T2 sehr hell, teils sogar heller als Galle. Größere Hämangiome können durch Fibrose, Verkalkungen oder Thromben inhomogener wirken.",
        "en": "Typical haemangiomas are very bright on T2, sometimes even brighter than bile. Larger haemangiomas may appear heterogeneous because of fibrosis, calcifications or thrombi.",
        "fa": "همانژیوم تیپیک در T2 بسیار روشن است و گاهی حتی از صفرا روشن‌تر دیده می‌شود. ضایعات بزرگ‌تر ممکن است به علت فیبروز، کلسیفیکاسیون یا ترومبوز ناهمگون باشند."
      },
      "back": {
        "de": "Light-bulb sign.\n\nTypische Hämangiome sind in T2 sehr hell, teils sogar heller als Galle. Größere Hämangiome können durch Fibrose, Verkalkungen oder Thromben inhomogener wirken.",
        "en": "Light-bulb sign.\n\nTypical haemangiomas are very bright on T2, sometimes even brighter than bile. Larger haemangiomas may appear heterogeneous because of fibrosis, calcifications or thrombi.",
        "fa": "علامت Light-bulb.\n\nهمانژیوم تیپیک در T2 بسیار روشن است و گاهی حتی از صفرا روشن‌تر دیده می‌شود. ضایعات بزرگ‌تر ممکن است به علت فیبروز، کلسیفیکاسیون یا ترومبوز ناهمگون باشند."
      }
    },
    {
      "id": "haemangiom-07-dwi-adc",
      "topicId": "haemangiom",
      "category": {
        "de": "MRT",
        "en": "MRI",
        "fa": "MRI"
      },
      "front": {
        "de": "Warum ist ein helles DWI-Signal beim Hämangiom nicht automatisch verdächtig?",
        "en": "Why is bright DWI signal in haemangioma not automatically suspicious?",
        "fa": "چرا روشن بودن DWI در همانژیوم خودبه‌خود مشکوک نیست؟"
      },
      "answer": {
        "de": "Wegen T2-shine-through.",
        "en": "Because of T2 shine-through.",
        "fa": "به علت T2 shine-through."
      },
      "explanation": {
        "de": "Hämangiome können auf hohen b-Werten hell sein. Entscheidend ist die ADC-Karte: hohe ADC-Werte sprechen gegen echte Diffusionsrestriktion und helfen in der DD zu Metastasen.",
        "en": "Haemangiomas can be bright on high b-values. The ADC map is decisive: high ADC values argue against true diffusion restriction and help distinguish them from metastases.",
        "fa": "همانژیوم‌ها ممکن است در b-value بالا روشن باشند. ADC تعیین‌کننده است: ADC بالا علیه محدودیت انتشار واقعی است و در افتراق از متاستاز کمک می‌کند."
      },
      "back": {
        "de": "Wegen T2-shine-through.\n\nHämangiome können auf hohen b-Werten hell sein. Entscheidend ist die ADC-Karte: hohe ADC-Werte sprechen gegen echte Diffusionsrestriktion und helfen in der DD zu Metastasen.",
        "en": "Because of T2 shine-through.\n\nHaemangiomas can be bright on high b-values. The ADC map is decisive: high ADC values argue against true diffusion restriction and help distinguish them from metastases.",
        "fa": "به علت T2 shine-through.\n\nهمانژیوم‌ها ممکن است در b-value بالا روشن باشند. ADC تعیین‌کننده است: ADC بالا علیه محدودیت انتشار واقعی است و در افتراق از متاستاز کمک می‌کند."
      }
    },
    {
      "id": "haemangiom-08-t1c-dynamik",
      "topicId": "haemangiom",
      "category": {
        "de": "MRT",
        "en": "MRI",
        "fa": "MRI"
      },
      "front": {
        "de": "Wie verhält sich ein typisches Hämangiom in der dynamischen T1-KM-MRT?",
        "en": "How does a typical haemangioma behave on dynamic contrast-enhanced T1 MRI?",
        "fa": "همانژیوم تیپیک در T1 داینامیک بعد از کنتراست چگونه رفتار می‌کند؟"
      },
      "answer": {
        "de": "Randnoduli, dann zentripetale Auffüllung.",
        "en": "Rim nodules, then centripetal fill-in.",
        "fa": "ندول‌های محیطی، سپس پرشدگی مرکزگرا."
      },
      "explanation": {
        "de": "Arteriell beginnt die Aufnahme fleckig und diskontinuierlich am Rand. Portalvenös und spät zieht sie langsam in die Mitte, bis die Läsion blutpoolähnlich wird.",
        "en": "Arterially, enhancement begins patchy and discontinuously at the rim. In portal venous and delayed phases it slowly moves to the centre until the lesion becomes blood-pool-like.",
        "fa": "در فاز شریانی، enhancement به صورت لکه‌ای و ناپیوسته از حاشیه شروع می‌شود. در فاز پورتال و تأخیری آهسته به مرکز می‌رود تا ضایعه شبیه blood pool شود."
      },
      "back": {
        "de": "Randnoduli, dann zentripetale Auffüllung.\n\nArteriell beginnt die Aufnahme fleckig und diskontinuierlich am Rand. Portalvenös und spät zieht sie langsam in die Mitte, bis die Läsion blutpoolähnlich wird.",
        "en": "Rim nodules, then centripetal fill-in.\n\nArterially, enhancement begins patchy and discontinuously at the rim. In portal venous and delayed phases it slowly moves to the centre until the lesion becomes blood-pool-like.",
        "fa": "ندول‌های محیطی، سپس پرشدگی مرکزگرا.\n\nدر فاز شریانی، enhancement به صورت لکه‌ای و ناپیوسته از حاشیه شروع می‌شود. در فاز پورتال و تأخیری آهسته به مرکز می‌رود تا ضایعه شبیه blood pool شود."
      }
    },
    {
      "id": "haemangiom-09-gross",
      "topicId": "haemangiom",
      "category": {
        "de": "MRT",
        "en": "MRI",
        "fa": "MRI"
      },
      "front": {
        "de": "Warum können große Hämangiome in T2 inhomogen sein?",
        "en": "Why can large haemangiomas be heterogeneous on T2?",
        "fa": "چرا همانژیوم‌های بزرگ در T2 می‌توانند ناهمگون باشند؟"
      },
      "answer": {
        "de": "Durch Fibrose, Verkalkungen oder Thromben.",
        "en": "Due to fibrosis, calcifications or thrombi.",
        "fa": "به علت فیبروز، کلسیفیکاسیون یا ترومبوز."
      },
      "explanation": {
        "de": "Kleine Hämangiome sind oft homogen hell. Größere Läsionen können intern degenerieren oder sklerosieren und dadurch weniger klassisch aussehen.",
        "en": "Small haemangiomas are often homogeneously bright. Larger lesions can undergo internal degeneration or sclerosis and therefore look less classic.",
        "fa": "همانژیوم‌های کوچک اغلب هموژن و روشن هستند. ضایعات بزرگ‌تر ممکن است دچار تغییرات داخلی یا اسکلروز شوند و ظاهر کمتر تیپیک پیدا کنند."
      },
      "back": {
        "de": "Durch Fibrose, Verkalkungen oder Thromben.\n\nKleine Hämangiome sind oft homogen hell. Größere Läsionen können intern degenerieren oder sklerosieren und dadurch weniger klassisch aussehen.",
        "en": "Due to fibrosis, calcifications or thrombi.\n\nSmall haemangiomas are often homogeneously bright. Larger lesions can undergo internal degeneration or sclerosis and therefore look less classic.",
        "fa": "به علت فیبروز، کلسیفیکاسیون یا ترومبوز.\n\nهمانژیوم‌های کوچک اغلب هموژن و روشن هستند. ضایعات بزرگ‌تر ممکن است دچار تغییرات داخلی یا اسکلروز شوند و ظاهر کمتر تیپیک پیدا کنند."
      }
    },
    {
      "id": "haemangiom-10-atypisch-definition",
      "topicId": "haemangiom",
      "category": {
        "de": "Atypisch",
        "en": "Atypical",
        "fa": "آتیپیک"
      },
      "front": {
        "de": "Was macht ein Leberhämangiom radiologisch atypisch?",
        "en": "What makes a liver haemangioma radiologically atypical?",
        "fa": "چه چیزی همانژیوم کبدی را از نظر رادیولوژی آتیپیک می‌کند؟"
      },
      "answer": {
        "de": "Fehlendes klassisches Muster.",
        "en": "Absence of the classic pattern.",
        "fa": "نبود الگوی کلاسیک."
      },
      "explanation": {
        "de": "Atypisch sind z. B. ungewöhnliche Morphologie, fehlende zentripetale Auffüllung, Sklerosierung, Kalzifikationen oder parenchymale Begleitveränderungen. Dann wird die DD zu malignen Läsionen wichtiger.",
        "en": "Atypical features include unusual morphology, absent centripetal fill-in, sclerosis, calcifications or associated parenchymal changes. Then differentiation from malignant lesions becomes more important.",
        "fa": "ویژگی‌های آتیپیک شامل مورفولوژی غیرمعمول، نبود پرشدگی مرکزگرا، اسکلروز، کلسیفیکاسیون یا تغییرات همراه پارانشیم است. در این حالت افتراق از ضایعات بدخیم مهم‌تر می‌شود."
      },
      "back": {
        "de": "Fehlendes klassisches Muster.\n\nAtypisch sind z. B. ungewöhnliche Morphologie, fehlende zentripetale Auffüllung, Sklerosierung, Kalzifikationen oder parenchymale Begleitveränderungen. Dann wird die DD zu malignen Läsionen wichtiger.",
        "en": "Absence of the classic pattern.\n\nAtypical features include unusual morphology, absent centripetal fill-in, sclerosis, calcifications or associated parenchymal changes. Then differentiation from malignant lesions becomes more important.",
        "fa": "نبود الگوی کلاسیک.\n\nویژگی‌های آتیپیک شامل مورفولوژی غیرمعمول، نبود پرشدگی مرکزگرا، اسکلروز، کلسیفیکاسیون یا تغییرات همراه پارانشیم است. در این حالت افتراق از ضایعات بدخیم مهم‌تر می‌شود."
      }
    },
    {
      "id": "haemangiom-11-atypisch-t2",
      "topicId": "haemangiom",
      "category": {
        "de": "Atypisch",
        "en": "Atypical",
        "fa": "آتیپیک"
      },
      "front": {
        "de": "Typisches vs. atypisches Hämangiom: Wie unterscheidet sich T2?",
        "en": "Typical vs atypical haemangioma: how does T2 differ?",
        "fa": "همانژیوم تیپیک و آتیپیک در T2 چه تفاوتی دارند؟"
      },
      "answer": {
        "de": "Typisch sehr hell, atypisch weniger/inhomogen hell.",
        "en": "Typical very bright, atypical less/heterogeneously bright.",
        "fa": "تیپیک بسیار روشن، آتیپیک کمتر یا ناهمگون روشن."
      },
      "explanation": {
        "de": "Das klassische Light-bulb-Zeichen kann beim atypischen oder sklerosierten Hämangiom abgeschwächt sein. Zentrale hypointense Areale können fibrotischen Anteilen entsprechen.",
        "en": "The classic light-bulb sign may be reduced in atypical or sclerosed haemangioma. Central hypointense areas can correspond to fibrotic components.",
        "fa": "علامت کلاسیک Light-bulb در همانژیوم آتیپیک یا اسکلروزه ممکن است ضعیف‌تر باشد. نواحی مرکزی هیپواینتنس می‌توانند مربوط به بخش‌های فیبروتیک باشند."
      },
      "back": {
        "de": "Typisch sehr hell, atypisch weniger/inhomogen hell.\n\nDas klassische Light-bulb-Zeichen kann beim atypischen oder sklerosierten Hämangiom abgeschwächt sein. Zentrale hypointense Areale können fibrotischen Anteilen entsprechen.",
        "en": "Typical very bright, atypical less/heterogeneously bright.\n\nThe classic light-bulb sign may be reduced in atypical or sclerosed haemangioma. Central hypointense areas can correspond to fibrotic components.",
        "fa": "تیپیک بسیار روشن، آتیپیک کمتر یا ناهمگون روشن.\n\nعلامت کلاسیک Light-bulb در همانژیوم آتیپیک یا اسکلروزه ممکن است ضعیف‌تر باشد. نواحی مرکزی هیپواینتنس می‌توانند مربوط به بخش‌های فیبروتیک باشند."
      }
    },
    {
      "id": "haemangiom-12-atypisch-enhancement",
      "topicId": "haemangiom",
      "category": {
        "de": "Atypisch",
        "en": "Atypical",
        "fa": "آتیپیک"
      },
      "front": {
        "de": "Welche KM-Aufnahme kann bei atypischem Hämangiom statt des klassischen Musters auftreten?",
        "en": "Which enhancement pattern can occur in atypical haemangioma instead of the classic pattern?",
        "fa": "در همانژیوم آتیپیک به جای الگوی کلاسیک چه enhancement ممکن است دیده شود؟"
      },
      "answer": {
        "de": "Früharteriell homogen stark.",
        "en": "Strong homogeneous arterial enhancement.",
        "fa": "enhancement هموژن و قوی شریانی."
      },
      "explanation": {
        "de": "Atypische Hämangiome zeigen nicht immer periphere noduläre Aufnahme. Sie können früharteriell homogen stark kontrastieren und in späteren Phasen hyperintens bleiben.",
        "en": "Atypical haemangiomas do not always show peripheral nodular enhancement. They may enhance strongly and homogeneously in the arterial phase and remain hyperintense later.",
        "fa": "همانژیوم‌های آتیپیک همیشه enhancement ندولار محیطی ندارند. ممکن است در فاز شریانی به صورت هموژن و قوی enhancement داشته باشند و در فازهای بعدی هم هایپراینتنس بمانند."
      },
      "back": {
        "de": "Früharteriell homogen stark.\n\nAtypische Hämangiome zeigen nicht immer periphere noduläre Aufnahme. Sie können früharteriell homogen stark kontrastieren und in späteren Phasen hyperintens bleiben.",
        "en": "Strong homogeneous arterial enhancement.\n\nAtypical haemangiomas do not always show peripheral nodular enhancement. They may enhance strongly and homogeneously in the arterial phase and remain hyperintense later.",
        "fa": "enhancement هموژن و قوی شریانی.\n\nهمانژیوم‌های آتیپیک همیشه enhancement ندولار محیطی ندارند. ممکن است در فاز شریانی به صورت هموژن و قوی enhancement داشته باشند و در فازهای بعدی هم هایپراینتنس بمانند."
      }
    },
    {
      "id": "haemangiom-13-dd-metastase",
      "topicId": "haemangiom",
      "category": {
        "de": "Differenzialdiagnose",
        "en": "Differential diagnosis",
        "fa": "تشخیص افتراقی"
      },
      "front": {
        "de": "Welcher Befund spricht gegen Metastase und eher für Hämangiom?",
        "en": "Which finding argues against metastasis and supports haemangioma?",
        "fa": "کدام یافته علیه متاستاز و به نفع همانژیوم است؟"
      },
      "answer": {
        "de": "Hoher ADC-Wert mit Blutpool-Enhancement.",
        "en": "High ADC with blood-pool enhancement.",
        "fa": "ADC بالا همراه با enhancement شبیه blood pool."
      },
      "explanation": {
        "de": "Metastasen zeigen häufiger echte Diffusionsrestriktion mit niedrigerem ADC und kein typisches zentripetales Blutpool-Fill-in. Das Muster über mehrere Phasen ist wichtiger als ein Einzelbild.",
        "en": "Metastases more often show true diffusion restriction with lower ADC and no typical centripetal blood-pool fill-in. The multiphasic pattern is more important than a single image.",
        "fa": "متاستازها بیشتر محدودیت انتشار واقعی با ADC پایین‌تر نشان می‌دهند و الگوی پرشدگی مرکزگرا شبیه blood pool ندارند. الگوی چندفازی از یک تصویر منفرد مهم‌تر است."
      },
      "back": {
        "de": "Hoher ADC-Wert mit Blutpool-Enhancement.\n\nMetastasen zeigen häufiger echte Diffusionsrestriktion mit niedrigerem ADC und kein typisches zentripetales Blutpool-Fill-in. Das Muster über mehrere Phasen ist wichtiger als ein Einzelbild.",
        "en": "High ADC with blood-pool enhancement.\n\nMetastases more often show true diffusion restriction with lower ADC and no typical centripetal blood-pool fill-in. The multiphasic pattern is more important than a single image.",
        "fa": "ADC بالا همراه با enhancement شبیه blood pool.\n\nمتاستازها بیشتر محدودیت انتشار واقعی با ADC پایین‌تر نشان می‌دهند و الگوی پرشدگی مرکزگرا شبیه blood pool ندارند. الگوی چندفازی از یک تصویر منفرد مهم‌تر است."
      }
    },
    {
      "id": "haemangiom-14-reporting",
      "topicId": "haemangiom",
      "category": {
        "de": "Befundung",
        "en": "Reporting",
        "fa": "گزارش‌نویسی"
      },
      "front": {
        "de": "Was ist der wichtigste Befundungssatz beim typischen Leberhämangiom?",
        "en": "What is the most important reporting sentence for a typical liver haemangioma?",
        "fa": "مهم‌ترین جمله در گزارش همانژیوم تیپیک کبدی چیست؟"
      },
      "answer": {
        "de": "Typisches Hämangiom, kein suspekter Befund.",
        "en": "Typical haemangioma, no suspicious finding.",
        "fa": "همانژیوم تیپیک، یافته مشکوک نیست."
      },
      "explanation": {
        "de": "Bei klassischer Morphologie und Enhancement-Dynamik sollte der Befund klar benigne formuliert werden. Bei atypischen Zeichen besser beschreiben, vergleichen und ggf. Kontrolle/MRT empfehlen.",
        "en": "With classic morphology and enhancement dynamics, the report should clearly state benignity. If features are atypical, describe, compare with priors and consider follow-up or MRI.",
        "fa": "در مورفولوژی و دینامیک enhancement تیپیک، گزارش باید خوش‌خیم بودن را واضح بیان کند. در ویژگی‌های آتیپیک بهتر است توصیف، مقایسه با قبل و در صورت نیاز کنترل یا MRI پیشنهاد شود."
      },
      "back": {
        "de": "Typisches Hämangiom, kein suspekter Befund.\n\nBei klassischer Morphologie und Enhancement-Dynamik sollte der Befund klar benigne formuliert werden. Bei atypischen Zeichen besser beschreiben, vergleichen und ggf. Kontrolle/MRT empfehlen.",
        "en": "Typical haemangioma, no suspicious finding.\n\nWith classic morphology and enhancement dynamics, the report should clearly state benignity. If features are atypical, describe, compare with priors and consider follow-up or MRI.",
        "fa": "همانژیوم تیپیک، یافته مشکوک نیست.\n\nدر مورفولوژی و دینامیک enhancement تیپیک، گزارش باید خوش‌خیم بودن را واضح بیان کند. در ویژگی‌های آتیپیک بهتر است توصیف، مقایسه با قبل و در صورت نیاز کنترل یا MRI پیشنهاد شود."
      }
    },
]

export function getFlashcardTopic(topicId) {
  return FLASHCARD_TOPICS.find(topic => topic.id === topicId)
}

export function getCardsByTopic(topicId) {
  return FLASHCARDS.filter(card => card.topicId === topicId)
}

export function getCardById(cardId) {
  return FLASHCARDS.find(card => card.id === cardId)
}
