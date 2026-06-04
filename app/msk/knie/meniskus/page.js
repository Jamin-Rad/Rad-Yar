'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const CONTENT = {
  de: {
    toc: 'Inhaltsverzeichnis',
    breadcrumbMsk: 'Muskuloskelettales',
    breadcrumbCurrent: 'Knie · Meniskus',
    title: 'Meniskus',
    subtitle: 'Grundlagen, Anatomie, MRT-Diagnostik und sichere Risskriterien',
    sourceLabel: 'Skript Dr. Zia',
    keyLabel: 'Merke',
    caveLabel: 'CAVE',
    mcqTitle: 'MCQs zum Meniskus',
    mcqDesc: 'Passende Prüfungsfragen zu Anatomie, MRT-Grading und Rissdiagnostik.',
    mcqCta: 'MCQs starten',
    sections: [
      { id: 'grundlagen', label: 'Grundlagen', icon: '🦵' },
      { id: 'anatomie', label: 'Anatomie', icon: '🦴' },
      { id: 'vaskularisation', label: 'Vaskularisation', icon: '🩸' },
      { id: 'mrt', label: 'MRT-Diagnostik', icon: '🩻' },
      { id: 'grading', label: 'MRT-Grading', icon: '📊' },
      { id: 'risskriterien', label: 'Meniskusriss', icon: '⚠️' },
      { id: 'therapie', label: 'Therapieprinzip', icon: '🧵' },
    ],
    heroCards: [
      { value: '2/3', label: 'aller Risse', text: 'betreffen den Innenmeniskus' },
      { value: '98 %', label: 'Innenmeniskus', text: 'Risse typischerweise im Hinterhorn' },
      { value: '3 mm', label: 'Standard', text: 'MRT-Schnittdicke im Knieprotokoll' },
    ],
    basics: {
      title: 'Kniegelenk · Meniskus · Grundlagen',
      lead: 'Die Menisken sind fibrocartilaginäre Strukturen zwischen Femurkondylen und Tibiaplateau. Sie verbessern die Kongruenz, verteilen die Last und wirken als Stoßdämpfer. Für die MRT-Befundung sind Form, Fixierung, Durchblutung und Oberflächenkontakt des Signals entscheidend.',
      bullets: [
        'Innenmeniskus: C-förmig, kapsel- und MCL-fixiert, deutlich weniger mobil.',
        'Außenmeniskus: eher O-förmig, nicht an das laterale Kollateralband fixiert, beweglicher.',
        'Die tibiale Verankerung erfolgt über Meniskuswurzeln am Vorder- und Hinterhorn.',
      ],
    },
    anatomy: {
      title: 'Anatomie: Innen- und Außenmeniskus',
      lead: 'Der Unterschied zwischen Innen- und Außenmeniskus erklärt viele typische Verletzungsmuster.',
      tableHeaders: ['Merkmal', 'Innenmeniskus', 'Außenmeniskus'],
      tableRows: [
        ['Form', 'C-förmig', 'eher O-förmig'],
        ['Fixierung', 'fest mit Gelenkkapsel und medialem Seitenband verwachsen', 'nicht mit den lateralen Bändern fixiert'],
        ['Mobilität', 'wenig beweglich', 'mobiler und dadurch weniger verletzungsanfällig'],
        ['Risshäufigkeit', 'etwa zwei Drittel aller Meniskusrisse', 'seltener betroffen'],
        ['Häufigste Lokalisation', 'Hinterhorn in ca. 98 %', 'Hinterhorn in ca. 50 %, Rest in Corpus und Vorderhorn'],
      ],
      rootsTitle: 'Anschlüsse und Meniskuswurzeln',
      rootsText: 'Die Menisken artikulieren mit den Femurkondylen. Ihre proximale Oberfläche ist konvex. Die feste tibiale Verankerung erfolgt über die Meniskuswurzeln, jeweils am Vorder- und Hinterhorn pro Meniskus.',
      imageCaption: 'Schematische Übersicht der Meniskuswurzeln: Vorderhorn, Corpus und Hinterhorn.',
      key: 'Die verminderte Beweglichkeit des Innenmeniskus ist der wichtigste Grund, warum er bei Rotations- und Schertrauma deutlich häufiger reißt.',
    },
    vascular: {
      title: 'Vaskularisation und Heilungspotenzial',
      lead: 'Die Blutversorgung erfolgt nur kapselnah über den perimeniskalen Plexus. Von peripher nach zentral nimmt die Durchblutung ab. Daraus ergibt sich direkt die Heilungschance.',
      zones: [
        { name: 'Rote Zone · Zone I', range: '< 3 mm von der Kapsel', status: 'gut durchblutet', therapy: 'beste Nahtchance' },
        { name: 'Rot-weiße Zone · Zone II', range: '3–5 mm von der Kapsel', status: 'eingeschränkte Durchblutung', therapy: 'Naht individuell abwägen' },
        { name: 'Weiße Zone · Zone III', range: 'zentral gelegen', status: 'avaskulär', therapy: 'keine relevante Heilungstendenz' },
      ],
      tableHeaders: ['Zone', 'Lage', 'Durchblutung', 'Konsequenz'],
      tableRows: [
        ['Rote Zone', '< 3 mm von der Kapsel', 'gut', 'gute Heilungschancen'],
        ['Rot-weiße Zone', '3–5 mm von der Kapsel', 'eingeschränkt', 'unsichere Heilungstendenz'],
        ['Weiße Zone', 'zentral', 'avaskulär', 'keine relevante Heilungstendenz'],
      ],
      key: 'Je näher der Riss an der Kapsel liegt, desto besser ist die biologische Voraussetzung für eine Meniskusnaht.',
    },
    mri: {
      title: 'Die MRT-Diagnostik',
      lead: 'Die MRT-Diagnostik des Meniskus basiert auf einem dünnschichtigen Knieprotokoll und flüssigkeitssensitiven Sequenzen.',
      protocol: [
        { name: 'T1-Wichtung', text: 'Anatomische Übersicht und Beurteilung chronischer Fibrose.' },
        { name: 'T2-w / PD-fs', text: 'Nachweis von Rissen, Knochenödemen und Kontinuitätsunterbrechungen der Bänder.' },
        { name: 'Schnittdicke', text: 'Standardmäßig 3 mm, damit kleine Risse nicht durch Volumenmitteleffekt übersehen werden.' },
      ],
      normalTitle: 'Normalbefund',
      normalText: 'Der gesunde Meniskus stellt sich homogen hypointens dar. In der sagittalen Ansicht besitzt er eine typische dreieckige Struktur.',
      key: 'Ein reiner Signalanstieg im Meniskus ist noch kein Riss. Entscheidend ist der reproduzierbare Kontakt zur superioren oder inferioren Gelenkfläche.',
    },
    grading: {
      title: 'MRT-Grading von Meniskusläsionen',
      lead: 'Die Klassifikation nach Lotysch dient der Unterscheidung zwischen degenerativen Veränderungen und traumatischen Rissen. Grad 4 wird hier als komplexer Riss nach Stoller ergänzt.',
      lotyschTitle: 'Grad 1 bis 3 nach Lotysch',
      tableHeaders: ['Grad', 'Morphologie', 'Oberflächenkontakt', 'Bedeutung'],
      tableRows: [
        ['Grad 1', 'punktförmige oder kleine fokale Signalsteigerung', 'kein Kontakt', 'frühe mukoide Degeneration, meist asymptomatisch'],
        ['Grad 2a', 'rein lineare Signalsteigerung', 'kein Kontakt', 'fortgeschrittene Degeneration'],
        ['Grad 2b', 'lineares Signal', 'Kontakt auf einem einzelnen Bild', 'inkonklusiv für echten Riss'],
        ['Grad 2c', 'keilförmiges oder globuläres Signal', 'kein eindeutiger Kontakt', 'hohes Risiko für okkulten Riss'],
        ['Grad 3', 'lineares oder flächiges Signal', 'Kontakt auf mindestens zwei aufeinanderfolgenden Schichten', 'radiologisch gesicherter Meniskusriss'],
        ['Grad 4', 'komplexe Risskonfiguration oder Destruktion', 'meist mehrfach', 'komplexer Meniskusriss nach Stoller'],
      ],
      complexTitle: 'Grad 4: komplexer Meniskusriss',
      complexBullets: [
        'mehrere Risslinien in verschiedenen Ebenen, zum Beispiel horizontal und vertikal',
        'Mazeration und Zerfransung des Meniskusgewebes',
        'dislozierte Fragmente, zum Beispiel Korbhenkelriss oder Flap-Riss',
      ],
      key: 'Grad 3 ist der entscheidende Schwellenwert: Signal mit sicherem Oberflächenkontakt auf mindestens zwei Schichten.',
    },
    tear: {
      title: 'MRT-Kriterien für einen Meniskusriss',
      lead: 'Für die Diagnose „Meniskusriss“ müssen verbindliche Kriterien erfüllt sein. Dadurch lassen sich Sensitivität und Spezifität deutlich verbessern.',
      cave: 'Ein reiner intrameniskaler Signalanstieg reicht nicht aus, um einen Meniskusriss sicher zu diagnostizieren.',
      criteria: [
        { title: 'Kontakt zum Gelenkflächenrand', text: 'Das pathologisch erhöhte Signal erreicht die superiore oder inferiore Meniskusoberfläche.' },
        { title: 'Deformität', text: 'Die normale dreieckige Meniskuskonfiguration ist verloren oder deutlich verändert.' },
        { title: 'Two-slice-touch-Regel', text: 'Die Läsion ist auf mindestens zwei aufeinanderfolgenden Schichten mit Oberflächenkontakt erkennbar.' },
      ],
      key: 'Die Two-slice-touch-Regel erhöht die Spezifität, weil ein Einzelbild-Artefakt nicht fälschlich als Riss gewertet wird.',
    },
    therapy: {
      title: 'Therapieüberlegungen: Save the Meniscus',
      lead: 'Die Therapie richtet sich nach Symptomatik, Rissmorphologie, Lokalisation und Vaskularisation. Ziel ist der möglichst weitgehende Erhalt von Meniskusgewebe.',
      tableHeaders: ['Situation', 'Prinzip'],
      tableRows: [
        ['asymptomatische oder rein degenerative Läsion', 'konservative Therapie'],
        ['frischer Riss in der roten Zone', 'Meniskusnaht'],
        ['irreparables, mechanisch relevantes Fragment', 'sparsame Teilresektion'],
      ],
      key: 'So viel Meniskus wie möglich erhalten, so wenig wie nötig resezieren.',
    },
  },
  en: {
    toc: 'Contents',
    breadcrumbMsk: 'Musculoskeletal',
    breadcrumbCurrent: 'Knee · Meniscus',
    title: 'Meniscus',
    subtitle: 'Basics, anatomy, MRI diagnosis and reliable tear criteria',
    sourceLabel: 'Dr. Zia script',
    keyLabel: 'Key point',
    caveLabel: 'Caution',
    mcqTitle: 'Meniscus MCQs',
    mcqDesc: 'Exam questions on anatomy, MRI grading and tear diagnosis.',
    mcqCta: 'Start MCQs',
    sections: [
      { id: 'grundlagen', label: 'Basics', icon: '🦵' },
      { id: 'anatomie', label: 'Anatomy', icon: '🦴' },
      { id: 'vaskularisation', label: 'Vascular supply', icon: '🩸' },
      { id: 'mrt', label: 'MRI diagnosis', icon: '🩻' },
      { id: 'grading', label: 'MRI grading', icon: '📊' },
      { id: 'risskriterien', label: 'Meniscal tear', icon: '⚠️' },
      { id: 'therapie', label: 'Treatment principle', icon: '🧵' },
    ],
    heroCards: [
      { value: '2/3', label: 'of tears', text: 'involve the medial meniscus' },
      { value: '98%', label: 'medial meniscus', text: 'typically posterior horn tears' },
      { value: '3 mm', label: 'standard', text: 'MRI slice thickness in knee protocols' },
    ],
    basics: {
      title: 'Knee joint · Meniscus · Basics',
      lead: 'The menisci are fibrocartilaginous structures between the femoral condyles and the tibial plateau. They improve congruity, distribute load and absorb shock. For MRI reporting, shape, fixation, vascularity and surface contact of signal are central.',
      bullets: [
        'Medial meniscus: C-shaped, fixed to the capsule and MCL, therefore much less mobile.',
        'Lateral meniscus: more O-shaped, not attached to the lateral collateral ligament, therefore more mobile.',
        'Tibial anchoring is provided by the meniscal roots at the anterior and posterior horns.',
      ],
    },
    anatomy: {
      title: 'Anatomy: medial and lateral meniscus',
      lead: 'The differences between the medial and lateral meniscus explain many typical injury patterns.',
      tableHeaders: ['Feature', 'Medial meniscus', 'Lateral meniscus'],
      tableRows: [
        ['Shape', 'C-shaped', 'more O-shaped'],
        ['Fixation', 'firmly attached to capsule and medial collateral ligament', 'not fixed to the lateral ligaments'],
        ['Mobility', 'less mobile', 'more mobile and therefore less injury-prone'],
        ['Frequency of tears', 'about two thirds of all meniscal tears', 'less commonly affected'],
        ['Most common location', 'posterior horn in approx. 98%', 'posterior horn in approx. 50%, remainder in body and anterior horn'],
      ],
      rootsTitle: 'Attachments and meniscal roots',
      rootsText: 'The menisci articulate with the femoral condyles. Their proximal surface is convex. The firm tibial anchoring is provided by the meniscal roots at the anterior and posterior horn of each meniscus.',
      imageCaption: 'Schematic overview of the meniscal roots: anterior horn, body and posterior horn.',
      key: 'Reduced mobility of the medial meniscus is the main reason why it tears much more often during rotational and shear trauma.',
    },
    vascular: {
      title: 'Vascular supply and healing potential',
      lead: 'Blood supply is limited to the capsular periphery via the perimeniscal plexus. Vascularity decreases from the periphery to the center, directly determining healing potential.',
      zones: [
        { name: 'Red zone · Zone I', range: '< 3 mm from the capsule', status: 'well vascularized', therapy: 'best chance for repair' },
        { name: 'Red-white zone · Zone II', range: '3–5 mm from the capsule', status: 'limited blood supply', therapy: 'repair depends on case' },
        { name: 'White zone · Zone III', range: 'central area', status: 'avascular', therapy: 'no relevant healing potential' },
      ],
      tableHeaders: ['Zone', 'Location', 'Vascularity', 'Consequence'],
      tableRows: [
        ['Red zone', '< 3 mm from the capsule', 'good', 'good healing potential'],
        ['Red-white zone', '3–5 mm from the capsule', 'limited', 'uncertain healing'],
        ['White zone', 'central', 'avascular', 'no relevant healing potential'],
      ],
      key: 'The closer the tear is to the capsule, the better the biological conditions for meniscal repair.',
    },
    mri: {
      title: 'MRI diagnosis',
      lead: 'MRI assessment of the meniscus relies on a thin-slice knee protocol and fluid-sensitive sequences.',
      protocol: [
        { name: 'T1-weighting', text: 'Anatomical overview and assessment of chronic fibrosis.' },
        { name: 'T2-w / PD-fs', text: 'Detection of tears, bone marrow edema and ligament discontinuity.' },
        { name: 'Slice thickness', text: 'Usually 3 mm so that small tears are not hidden by volume averaging.' },
      ],
      normalTitle: 'Normal appearance',
      normalText: 'A healthy meniscus is homogeneously hypointense. On sagittal images it has a typical triangular configuration.',
      key: 'Intrameniscal signal alone is not a tear. The decisive feature is reproducible contact with the superior or inferior articular surface.',
    },
    grading: {
      title: 'MRI grading of meniscal lesions',
      lead: 'The Lotysch classification distinguishes degenerative changes from traumatic tears. Grade 4 is added here as a complex tear according to Stoller.',
      lotyschTitle: 'Grades 1 to 3 according to Lotysch',
      tableHeaders: ['Grade', 'Morphology', 'Surface contact', 'Meaning'],
      tableRows: [
        ['Grade 1', 'punctate or small focal signal increase', 'no contact', 'early mucoid degeneration, usually asymptomatic'],
        ['Grade 2a', 'purely linear signal increase', 'no contact', 'advanced degeneration'],
        ['Grade 2b', 'linear signal', 'contact on a single image', 'inconclusive for a true tear'],
        ['Grade 2c', 'wedge-shaped or globular signal', 'no definite contact', 'high risk of an occult tear'],
        ['Grade 3', 'linear or broad signal', 'contact on at least two consecutive slices', 'radiologically proven meniscal tear'],
        ['Grade 4', 'complex tear configuration or destruction', 'usually multiple', 'complex meniscal tear according to Stoller'],
      ],
      complexTitle: 'Grade 4: complex meniscal tear',
      complexBullets: [
        'multiple tear lines in different planes, for example horizontal and vertical',
        'maceration and fraying of meniscal tissue',
        'displaced fragments such as bucket-handle or flap tears',
      ],
      key: 'Grade 3 is the key threshold: signal with reliable surface contact on at least two slices.',
    },
    tear: {
      title: 'MRI criteria for a meniscal tear',
      lead: 'Specific criteria must be fulfilled before diagnosing a meniscal tear. This improves sensitivity and specificity.',
      cave: 'Intrameniscal signal increase alone is not sufficient to confidently diagnose a meniscal tear.',
      criteria: [
        { title: 'Contact with the articular surface', text: 'The abnormal high signal reaches the superior or inferior meniscal surface.' },
        { title: 'Deformity', text: 'The normal triangular configuration is lost or clearly altered.' },
        { title: 'Two-slice-touch rule', text: 'The lesion is visible with surface contact on at least two consecutive slices.' },
      ],
      key: 'The two-slice-touch rule increases specificity because a single-slice artifact is not overcalled as a tear.',
    },
    therapy: {
      title: 'Treatment concept: Save the meniscus',
      lead: 'Management depends on symptoms, tear morphology, location and vascularity. The goal is to preserve as much meniscal tissue as possible.',
      tableHeaders: ['Situation', 'Principle'],
      tableRows: [
        ['asymptomatic or purely degenerative lesion', 'conservative treatment'],
        ['fresh tear in the red zone', 'meniscal repair'],
        ['irreparable mechanically relevant fragment', 'limited partial resection'],
      ],
      key: 'Preserve as much meniscus as possible, resect only as much as necessary.',
    },
  },
  fa: {
    toc: 'فهرست مطالب',
    breadcrumbMsk: 'اسکلتی-عضلانی',
    breadcrumbCurrent: 'زانو · منیسک',
    title: 'منیسک',
    subtitle: 'مبانی، آناتومی، تشخیص MRI و معیارهای قطعی پارگی',
    sourceLabel: 'جزوه دکتر ضیا',
    keyLabel: 'نکته مهم',
    caveLabel: 'احتیاط',
    mcqTitle: 'سوالات منیسک',
    mcqDesc: 'سوالات مرتبط با آناتومی، درجه‌بندی MRI و تشخیص پارگی.',
    mcqCta: 'شروع سوالات',
    sections: [
      { id: 'grundlagen', label: 'مبانی', icon: '🦵' },
      { id: 'anatomie', label: 'آناتومی', icon: '🦴' },
      { id: 'vaskularisation', label: 'خون‌رسانی', icon: '🩸' },
      { id: 'mrt', label: 'تشخیص MRI', icon: '🩻' },
      { id: 'grading', label: 'درجه‌بندی MRI', icon: '📊' },
      { id: 'risskriterien', label: 'پارگی منیسک', icon: '⚠️' },
      { id: 'therapie', label: 'اصل درمان', icon: '🧵' },
    ],
    heroCards: [
      { value: '۲/۳', label: 'پارگی‌ها', text: 'مربوط به منیسک داخلی هستند' },
      { value: '۹۸٪', label: 'منیسک داخلی', text: 'اغلب در شاخ پشتی پاره می‌شود' },
      { value: '۳ mm', label: 'استاندارد', text: 'ضخامت برش در پروتکل MRI زانو' },
    ],
    basics: {
      title: 'مفصل زانو · منیسک · مبانی',
      lead: 'منیسک‌ها ساختارهای فیبروکارتیلاژ بین کندیل‌های فمور و پلاتوی تیبیا هستند. آن‌ها تطابق مفصلی را بهتر می‌کنند، نیرو را پخش می‌کنند و نقش ضربه‌گیر دارند. در گزارش MRI، شکل، میزان تثبیت، خون‌رسانی و تماس سیگنال با سطح مفصل اهمیت اصلی دارد.',
      bullets: [
        'منیسک داخلی: C شکل، متصل به کپسول و MCL، بنابراین تحرک کمتر دارد.',
        'منیسک خارجی: بیشتر O شکل، به رباط خارجی متصل نیست و تحرک بیشتری دارد.',
        'اتصال به تیبیا از طریق ریشه‌های منیسک در شاخ قدامی و خلفی انجام می‌شود.',
      ],
    },
    anatomy: {
      title: 'آناتومی: منیسک داخلی و خارجی',
      lead: 'تفاوت منیسک داخلی و خارجی بسیاری از الگوهای تیپیک آسیب را توضیح می‌دهد.',
      tableHeaders: ['ویژگی', 'منیسک داخلی', 'منیسک خارجی'],
      tableRows: [
        ['شکل', 'C شکل', 'بیشتر O شکل'],
        ['تثبیت', 'به کپسول مفصلی و رباط جانبی داخلی متصل است', 'به رباط‌های خارجی متصل نیست'],
        ['تحرک', 'کم‌تحرک', 'متحرک‌تر و در نتیجه کمتر مستعد آسیب'],
        ['شیوع پارگی', 'حدود دو سوم همه پارگی‌های منیسک', 'کمتر درگیر می‌شود'],
        ['محل شایع پارگی', 'شاخ پشتی در حدود ۹۸٪', 'شاخ پشتی در حدود ۵۰٪، بقیه در بدنه و شاخ قدامی'],
      ],
      rootsTitle: 'اتصالات و ریشه‌های منیسک',
      rootsText: 'منیسک‌ها با کندیل‌های فمور مفصل می‌شوند. سطح پروگزیمال آن‌ها محدب است. اتصال محکم به تیبیا از طریق ریشه‌های منیسک در شاخ قدامی و خلفی هر منیسک انجام می‌شود.',
      imageCaption: 'نمای شماتیک ریشه‌های منیسک: شاخ قدامی، بدنه و شاخ خلفی.',
      key: 'تحرک کمتر منیسک داخلی مهم‌ترین دلیل پارگی بیشتر آن در تروماهای چرخشی و نیروهای برشی است.',
    },
    vascular: {
      title: 'خون‌رسانی و پتانسیل ترمیم',
      lead: 'خون‌رسانی منیسک فقط از ناحیه نزدیک کپسول و از طریق شبکه پیرامنیسکی انجام می‌شود. هرچه به مرکز نزدیک‌تر شویم خون‌رسانی کمتر می‌شود و شانس ترمیم هم کاهش می‌یابد.',
      zones: [
        { name: 'ناحیه قرمز · Zone I', range: 'کمتر از ۳ میلی‌متر از کپسول', status: 'خون‌رسانی خوب', therapy: 'بهترین شانس برای بخیه' },
        { name: 'ناحیه قرمز-سفید · Zone II', range: '۳ تا ۵ میلی‌متر از کپسول', status: 'خون‌رسانی محدود', therapy: 'بخیه بسته به شرایط' },
        { name: 'ناحیه سفید · Zone III', range: 'قسمت مرکزی', status: 'بدون عروق', therapy: 'ترمیم قابل توجه ندارد' },
      ],
      tableHeaders: ['ناحیه', 'محل', 'خون‌رسانی', 'نتیجه'],
      tableRows: [
        ['قرمز', 'کمتر از ۳ میلی‌متر از کپسول', 'خوب', 'شانس ترمیم خوب'],
        ['قرمز-سفید', '۳ تا ۵ میلی‌متر از کپسول', 'محدود', 'ترمیم نامطمئن'],
        ['سفید', 'مرکزی', 'بدون عروق', 'بدون پتانسیل ترمیم قابل توجه'],
      ],
      key: 'هرچه پارگی به کپسول نزدیک‌تر باشد، شرایط بیولوژیک برای بخیه منیسک بهتر است.',
    },
    mri: {
      title: 'تشخیص MRI',
      lead: 'ارزیابی MRI منیسک بر اساس پروتکل زانو با برش‌های نازک و سکانس‌های حساس به مایع انجام می‌شود.',
      protocol: [
        { name: 'T1', text: 'نمای کلی آناتومیک و ارزیابی فیبروز مزمن.' },
        { name: 'T2-w / PD-fs', text: 'تشخیص پارگی، ادم استخوان و قطع‌شدگی رباط‌ها.' },
        { name: 'ضخامت برش', text: 'به طور استاندارد ۳ میلی‌متر، تا پارگی‌های کوچک به علت Volume Averaging پنهان نشوند.' },
      ],
      normalTitle: 'نمای طبیعی',
      normalText: 'منیسک سالم به صورت هموژن هیپواینتنس دیده می‌شود. در نمای ساژیتال شکل مثلثی تیپیک دارد.',
      key: 'افزایش سیگنال داخل منیسک به تنهایی پارگی محسوب نمی‌شود. معیار اصلی، تماس تکرارپذیر سیگنال با سطح مفصلی فوقانی یا تحتانی است.',
    },
    grading: {
      title: 'درجه‌بندی MRI ضایعات منیسک',
      lead: 'طبقه‌بندی Lotysch برای تفکیک تغییرات دژنراتیو از پارگی تروماتیک استفاده می‌شود. در این صفحه، درجه ۴ به عنوان پارگی پیچیده طبق Stoller اضافه شده است.',
      lotyschTitle: 'درجه ۱ تا ۳ طبق Lotysch',
      tableHeaders: ['درجه', 'مورفولوژی', 'تماس با سطح', 'معنا'],
      tableRows: [
        ['درجه ۱', 'افزایش سیگنال نقطه‌ای یا کوچک', 'بدون تماس', 'دژنراسیون موکوئید اولیه، معمولاً بی‌علامت'],
        ['درجه 2a', 'افزایش سیگنال خطی', 'بدون تماس', 'دژنراسیون پیشرفته'],
        ['درجه 2b', 'سیگنال خطی', 'تماس فقط در یک تصویر', 'برای پارگی قطعی ناکافی'],
        ['درجه 2c', 'سیگنال گوه‌ای یا گرد', 'بدون تماس واضح', 'ریسک بالا برای پارگی مخفی'],
        ['درجه ۳', 'سیگنال خطی یا پهن', 'تماس در حداقل دو برش متوالی', 'پارگی منیسک از نظر رادیولوژیک قطعی'],
        ['درجه ۴', 'الگوی پیچیده یا تخریب منیسک', 'معمولاً متعدد', 'پارگی پیچیده طبق Stoller'],
      ],
      complexTitle: 'درجه ۴: پارگی پیچیده منیسک',
      complexBullets: [
        'چند خط پارگی در صفحات مختلف، مثلاً افقی و عمودی',
        'ماسره شدن و ریش‌ریش شدن بافت منیسک',
        'قطعات جابجا شده مانند Bucket-handle یا Flap tear',
      ],
      key: 'درجه ۳ مرز مهم تشخیصی است: سیگنال باید حداقل در دو برش متوالی با سطح مفصلی تماس داشته باشد.',
    },
    tear: {
      title: 'معیارهای MRI برای پارگی منیسک',
      lead: 'برای تشخیص پارگی منیسک باید معیارهای مشخص وجود داشته باشد. این کار حساسیت و ویژگی تشخیص را بهتر می‌کند.',
      cave: 'افزایش سیگنال داخل منیسک به تنهایی برای تشخیص قطعی پارگی کافی نیست.',
      criteria: [
        { title: 'تماس با سطح مفصلی', text: 'سیگنال پاتولوژیک به سطح فوقانی یا تحتانی منیسک می‌رسد.' },
        { title: 'دفورمیتی', text: 'شکل مثلثی طبیعی منیسک از بین رفته یا واضحاً تغییر کرده است.' },
        { title: 'قانون Two-slice-touch', text: 'ضایعه باید حداقل در دو برش متوالی با تماس سطحی دیده شود.' },
      ],
      key: 'قانون Two-slice-touch اختصاصیت را بالا می‌برد، چون یک آرتیفکت تک‌برشی به اشتباه پارگی حساب نمی‌شود.',
    },
    therapy: {
      title: 'اصول درمان: Save the Meniscus',
      lead: 'تصمیم درمانی به علائم، شکل پارگی، محل پارگی و خون‌رسانی بستگی دارد. هدف، حفظ حداکثری بافت منیسک است.',
      tableHeaders: ['وضعیت', 'اصل درمانی'],
      tableRows: [
        ['ضایعه بدون علامت یا صرفاً دژنراتیو', 'درمان محافظه‌کارانه'],
        ['پارگی تازه در ناحیه قرمز', 'بخیه منیسک'],
        ['قطعه غیرقابل ترمیم و مکانیکی', 'رزکسیون محدود و محافظه‌کارانه'],
      ],
      key: 'تا حد امکان منیسک را حفظ کن؛ فقط به اندازه لازم رزکسیون انجام بده.',
    },
  },
}

function Table({ headers, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({ type = 'note', label, children }) {
  const icon = type === 'cave' ? '⚠️' : type === 'success' ? '✅' : '💡'
  return (
    <div className={`${styles.callout} ${styles[type]}`}>
      <span className={styles.calloutLabel}>{icon} {label}</span>
      <div className={styles.calloutBody}>{children}</div>
    </div>
  )
}

function Section({ id, eyebrow, title, lead, children }) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2>{title}</h2>
        {lead && <p>{lead}</p>}
      </div>
      {children}
    </section>
  )
}

function Sidebar({ sections, toc, activeId, onClick }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sideTitle}>{toc}</div>
      <nav className={styles.sideNav}>
        {sections.map(section => (
          <button
            key={section.id}
            type="button"
            className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
            onClick={() => onClick(section.id)}
          >
            <span className={styles.sideIcon}>{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

function ImageFigure({ src, alt, caption }) {
  return (
    <figure className={styles.figure}>
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default function MeniskusPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'
  const mainRef = useRef(null)
  const [activeId, setActiveId] = useState(copy.sections[0].id)

  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])
  const withLang = (href) => lang === 'de' ? href : `${href}?lang=${lang}`

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    setActiveId(copy.sections[0].id)
  }, [copy.sections])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { root: null, rootMargin: '-18% 0px -70% 0px', threshold: 0.01 }
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <div className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')} className={styles.breadLink}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/msk')} className={styles.breadLink}>{copy.breadcrumbMsk}</Link>
          <span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
            <Link href={withLang('/msk/knie/meniskus/mcq')} className={styles.mcqButton}>
              <span>🎯</span>
              <span>{copy.mcqTitle}</span>
            </Link>
          </div>
          <div className={styles.heroStats}>
            {copy.heroCards.map(card => (
              <div key={card.label} className={styles.heroStatCard}>
                <strong>{card.value}</strong>
                <span>{card.label}</span>
                <small>{card.text}</small>
              </div>
            ))}
          </div>
        </div>

        <Link href={withLang('/msk/knie/meniskus/mcq')} className={styles.mcqStrip}>
          <div>
            <strong>{copy.mcqTitle}</strong>
            <span>{copy.mcqDesc}</span>
          </div>
          <em>{copy.mcqCta} →</em>
        </Link>
      </header>

      <div className={styles.layout}>
        <Sidebar sections={copy.sections} toc={copy.toc} activeId={activeId} onClick={scrollTo} />

        <main className={styles.main} ref={mainRef}>
          <Section id="grundlagen" eyebrow="01" title={copy.basics.title} lead={copy.basics.lead}>
            <div className={styles.bulletCard}>
              {copy.basics.bullets.map(item => (
                <div key={item} className={styles.bulletItem}>
                  <span>✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="anatomie" eyebrow="02" title={copy.anatomy.title} lead={copy.anatomy.lead}>
            <Table headers={copy.anatomy.tableHeaders} rows={copy.anatomy.tableRows} />
            <div className={styles.splitGrid}>
              <div className={styles.card}>
                <h3>{copy.anatomy.rootsTitle}</h3>
                <p>{copy.anatomy.rootsText}</p>
              </div>
              <ImageFigure src="/meniskus/anatomy-roots.png" alt={copy.anatomy.rootsTitle} caption={copy.anatomy.imageCaption} />
            </div>
            <Callout label={copy.keyLabel}>{copy.anatomy.key}</Callout>
          </Section>

          <Section id="vaskularisation" eyebrow="03" title={copy.vascular.title} lead={copy.vascular.lead}>
            <div className={styles.zoneGrid}>
              {copy.vascular.zones.map((zone, index) => (
                <div key={zone.name} className={`${styles.zoneCard} ${styles[`zone${index + 1}`]}`}>
                  <h3>{zone.name}</h3>
                  <span>{zone.range}</span>
                  <p>{zone.status}</p>
                  <small>{zone.therapy}</small>
                </div>
              ))}
            </div>
            <div className={styles.splitGrid}>
              <ImageFigure src="/meniskus/vascular-zones.png" alt={copy.vascular.title} />
              <Table headers={copy.vascular.tableHeaders} rows={copy.vascular.tableRows} />
            </div>
            <Callout label={copy.keyLabel}>{copy.vascular.key}</Callout>
          </Section>

          <Section id="mrt" eyebrow="04" title={copy.mri.title} lead={copy.mri.lead}>
            <div className={styles.protocolGrid}>
              {copy.mri.protocol.map(item => (
                <div key={item.name} className={styles.protocolCard}>
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <div className={styles.cardAccent}>
              <h3>{copy.mri.normalTitle}</h3>
              <p>{copy.mri.normalText}</p>
            </div>
            <Callout label={copy.keyLabel}>{copy.mri.key}</Callout>
          </Section>

          <Section id="grading" eyebrow="05" title={copy.grading.title} lead={copy.grading.lead}>
            <div className={styles.splitGrid}>
              <ImageFigure src="/meniskus/lotysch-grading.png" alt={copy.grading.title} />
              <div className={styles.card}>
                <h3>{copy.grading.lotyschTitle}</h3>
                <p>{copy.grading.lead}</p>
              </div>
            </div>
            <Table headers={copy.grading.tableHeaders} rows={copy.grading.tableRows} />
            <div className={styles.cardDanger}>
              <h3>{copy.grading.complexTitle}</h3>
              <ul>
                {copy.grading.complexBullets.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <Callout label={copy.keyLabel}>{copy.grading.key}</Callout>
          </Section>

          <Section id="risskriterien" eyebrow="06" title={copy.tear.title} lead={copy.tear.lead}>
            <Callout type="cave" label={copy.caveLabel}>{copy.tear.cave}</Callout>
            <div className={styles.criteriaGrid}>
              {copy.tear.criteria.map((item, index) => (
                <div key={item.title} className={styles.criteriaCard}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <Callout label={copy.keyLabel}>{copy.tear.key}</Callout>
          </Section>

          <Section id="therapie" eyebrow="07" title={copy.therapy.title} lead={copy.therapy.lead}>
            <Table headers={copy.therapy.tableHeaders} rows={copy.therapy.tableRows} />
            <Callout type="success" label={copy.keyLabel}>{copy.therapy.key}</Callout>
          </Section>
        </main>
      </div>
    </div>
  )
}
