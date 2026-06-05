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
