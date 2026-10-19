const L = (de, en, fa) => ({ de, en, fa })

export const INTRAOSSEOUS_GANGLION_LESSON = {
  id: 'intraossaeres-ganglion',
  title: L('Intraossäres Ganglion', 'Intraosseous ganglion', 'گانگلیون داخل‌استخوانی'),
  hero: '/educational/intraosseous-ganglion/hero.svg',
  sourceNote: L(
    'Begrenzte Lektion ausschließlich nach MSK.pdf, PDF-S. 119 (Druckseite 118). Diese Seite enthält Definition, Lokalisation, Klinik, Röntgen/CT-, MRT-Merkmale und drei Differenzialdiagnosen. Sie enthält keine Patientenbilder; die Lektion trainiert keine Befundung echter Bildfälle. Die ergänzenden Vektoren sind eigens erstellte, nichtdiagnostische Erklärungsskizzen; externe klinische Aussagen wurden nicht ergänzt. Browser- und fachärztliche Prüfung stehen aus.',
    'Bounded lesson based exclusively on MSK.pdf, PDF p. 119 (printed p. 118). This page covers definition, location, symptoms, radiographic/CT and MRI features, and three differentials. It contains no patient images, and the lesson does not train recognition from real cases. Its original vector diagrams are explanatory and non-diagnostic; no external clinical claims were added. Browser and specialist review remain pending.',
    'درس محدود و منحصراً بر پایهٔ MSK.pdf، صفحهٔ PDF ۱۱۹ (صفحهٔ چاپی ۱۱۸) است. این صفحه تعریف، محل، علائم، ویژگی‌های رادیوگرافی/CT و MRI و سه تشخیص افتراقی را پوشش می‌دهد و تصویر بیمار ندارد؛ درس مهارت تشخیص از روی تصاویر واقعی را آموزش نمی‌دهد. شکل‌های برداری همراه، شماتیک‌های توضیحیِ غیرتشخیصی هستند؛ ادعای بالینی بیرونی اضافه نشده است. بررسی مرورگری و متخصص هنوز انجام نشده است.'
  ),
  sections: [
    {
      id: 'pattern', icon: 'clinical',
      title: L('Welche Grundidee passt zum Ganglion?', 'What is the core pattern of a ganglion?', 'الگوی اصلی گانگلیون چیست؟'),
      lead: L(
        'Ein intraossäres Ganglion ist laut Kursquelle eine gutartige, zystische Läsion im Markraum und histologisch identisch mit einem Weichteilganglion. Es ist häufig asymptomatisch; eine größere Läsion oder mechanischer Druck auf die Gelenkfläche kann belastungsabhängige Schmerzen verursachen.',
        'The course source describes an intraosseous ganglion as a benign cystic lesion in the medullary cavity, histologically identical to a soft-tissue ganglion. It is often asymptomatic; a larger lesion or mechanical pressure on the articular surface may cause pain with loading.',
        'طبق منبع آموزشی، گانگلیون داخل‌استخوانی ضایعه‌ای کیستیک و خوش‌خیم در مغز استخوان است و از نظر بافت‌شناسی با گانگلیون بافت نرم یکسان است. اغلب بی‌علامت است؛ ضایعهٔ بزرگ‌تر یا فشار مکانیکی بر سطح مفصل ممکن است درد وابسته به تحمل وزن ایجاد کند.'
      ),
      rows: [
        [L('Lage', 'Location', 'محل'), L('Typischerweise epiphysär oder metaphysär und gelenknah. Genannte Stellen sind der mediale Malleolus, Femurkopf/Acetabulum und die Carpalknochen, besonders Scaphoid und Lunatum.', 'Typically epiphyseal or metaphyseal and close to a joint. Listed sites are the medial malleolus, femoral head/acetabulum and carpal bones, especially the scaphoid and lunate.', 'معمولاً اپی‌فیزی یا متافیزی و نزدیک مفصل است. محل‌های ذکرشده قوزک داخلی، سر فمور/استابولوم و استخوان‌های کارپ، به‌ویژه اسکافوئید و لونیت هستند.')],
        [L('Klinik', 'Symptoms', 'علائم'), L('Oft asymptomatischer Zufallsbefund; bei größerer Läsion oder mechanischem Druck auf die Gelenkfläche sind belastungsabhängige Schmerzen möglich.', 'Often an asymptomatic incidental finding; a larger lesion or mechanical pressure on the articular surface may cause pain with loading.', 'اغلب یافته‌ای اتفاقی و بی‌علامت است؛ ضایعهٔ بزرگ‌تر یا فشار مکانیکی بر سطح مفصل ممکن است درد وابسته به تحمل وزن ایجاد کند.')],
      ],
      imageAlt: L('Nichtdiagnostische Schemazeichnung: eine flüssigkeitsgefüllte Läsion im gelenknahen Knochen, ohne Darstellung eines echten Röntgen- oder MRT-Befunds.', 'Non-diagnostic schematic of a fluid-filled lesion in bone near a joint; it does not depict a real radiograph or MRI.', 'شماتیک غیردیاگنوستیک از ضایعه‌ای مایع‌دار در استخوان نزدیک مفصل؛ تصویر واقعی رادیوگرافی یا MRI نیست.'),
      imageCaption: L('Orientierungsskizze, eigens für diese Lektion erstellt. Sie zeigt nur die gelenknahe Lage und ist kein diagnostisches Bild.', 'Original orientation schematic made for this lesson. It shows only the juxta-articular location and is not a diagnostic image.', 'شماتیک جهت‌یابی که برای این درس ساخته شده است. فقط محل نزدیک مفصل را نشان می‌دهد و تصویر تشخیصی نیست.'),
      note: L('Die Seite nennt eine mögliche feine Verbindung zum angrenzenden Gelenkspalt. Sie beschreibt diese als häufig, nicht als notwendiges Einzelkriterium.', 'The page mentions a possible fine connection to the adjacent joint space. It describes this as frequent, not as a required stand-alone criterion.', 'صفحه به ارتباط ظریف احتمالی با فضای مفصلی مجاور اشاره می‌کند؛ آن را شایع توصیف می‌کند، نه معیار ضروری و مستقل.'),
    },
    {
      id: 'imaging', icon: 'imaging',
      title: L('Welche Bildmerkmale nennt die Quelle?', 'Which imaging features does the source describe?', 'منبع چه ویژگی‌های تصویربرداری را ذکر می‌کند؟'),
      lead: L('Beginne mit der Form und dem Rand im Röntgenbild oder CT, dann ordne das Flüssigkeitssignal im MRT ein. Die folgenden Merkmale sind die Beschreibung der einzelnen Kursseite.', 'Start with shape and margin on radiographs or CT, then interpret the fluid signal on MRI. The following features reproduce the course page description.', 'ابتدا شکل و حاشیه را در رادیوگرافی یا CT بررسی کنید، سپس سیگنال مایع را در MRI تفسیر کنید. ویژگی‌های زیر توصیف همان صفحهٔ آموزشی هستند.'),
      rows: [
        [L('Röntgen / CT', 'Radiograph / CT', 'رادیوگرافی / CT'), L('Scharf begrenzte lytische Läsion, typischerweise mit sklerotischem Randsaum; laut PDF keine Periostreaktion und keine Matrixverkalkung.', 'A well-defined lytic lesion, typically with a sclerotic rim; the PDF reports no periosteal reaction and no matrix mineralisation.', 'ضایعهٔ لیتیک خوش‌مرز، معمولاً با حاشیهٔ اسکلروتیک؛ طبق PDF واکنش پریوست و کلسیفیکاسیون ماتریکس ندارد.')],
        [L('T1', 'T1-weighted', 'T1'), L('Niedriges Signal, entsprechend dem flüssigkeitsgefüllten Inhalt.', 'Low signal, consistent with fluid content.', 'سیگنال پایین، سازگار با محتوای مایع.')],
        [L('T2 / STIR', 'T2 / STIR', 'T2 / STIR'), L('Sehr hohes Signal, typisch für Flüssigkeit.', 'Very high signal, typical of fluid.', 'سیگنال بسیار بالا، تیپیک مایع.')],
        [L('Nach Kontrastmittel', 'After contrast', 'پس از تزریق مادهٔ حاجب'), L('Nur randständige Anreicherung der Kapsel, keine zentrale Anreicherung.', 'Only marginal enhancement of the capsule, with no central enhancement.', 'فقط تقویت کنتراست در حاشیهٔ کپسول دیده می‌شود و تقویت مرکزی وجود ندارد.')],
      ],
      image: '/educational/intraosseous-ganglion/mri-signal-schematic.svg',
      imageAlt: L('Dreiteilige, nichtdiagnostische Schemazeichnung, kein echtes MRT: niedriges T1-Signal, hohes T2/STIR-Signal und nach Kontrastmittel nur ein schmaler Rand mit Enhancement; das Zentrum bleibt ohne Enhancement.', 'Three-panel non-diagnostic schematic, not real MRI: low signal on T1, high signal on T2/STIR, and only a thin peripheral enhancement ring after contrast; the center does not enhance.', 'شماتیک غیرتشخیصی سه‌پنلی و نه MRI واقعی: سیگنال پایین در T1، بالا در T2/STIR و پس از تزریق فقط حلقهٔ باریک تقویت در حاشیه؛ مرکز تقویت نمی‌شود.'),
      imageCaption: L('Schema nach den Signalmerkmalen von MSK.pdf S. 119; keine Patientendaten und kein diagnostischer Fall. Der PDF-Seite fehlt ein MRT-Fallbild.', 'Diagram derived from the signal features in MSK.pdf p. 119; no patient data or diagnostic case. The PDF page contains no MRI case image.', 'شماتیک بر پایهٔ ویژگی‌های سیگنال در صفحهٔ ۱۱۹ MSK.pdf؛ بدون دادهٔ بیمار یا کیس تشخیصی. صفحهٔ PDF تصویر کیس MRI ندارد.'),
      note: L('Ein feiner Anschluss an den Gelenkspalt kann laut PDF vorkommen. Die Seite enthält kein Röntgen-, CT- oder MRT-Fallbild; die beiden Schemata erklären nur Lage und Signalbeschreibung.', 'A fine connection to the joint space may be present according to the PDF. The page contains no radiograph, CT or MRI case; the two diagrams explain location and signal description only.', 'طبق PDF ممکن است ارتباط ظریفی با فضای مفصل وجود داشته باشد. صفحهٔ PDF تصویر موردی از رادیوگرافی، CT یا MRI ندارد؛ دو شماتیک فقط محل و توصیف سیگنال را توضیح می‌دهند.'),
    },
    {
      id: 'differential', icon: 'differential',
      title: L('Welche drei Differenzialdiagnosen kontrastiert die PDF?', 'Which three differentials does the PDF contrast?', 'PDF کدام سه تشخیص افتراقی را مقایسه می‌کند؟'),
      lead: L('Die Quelle grenzt die Läsion knapp anhand von Lage, Arthrosekontext und Fettmerkmalen ab. Diese Gegenüberstellung bleibt auf genau die dort genannten Merkmale beschränkt.', 'The source briefly contrasts the lesion using location, osteoarthritis context and fat characteristics. This comparison is limited to the features stated there.', 'منبع با تکیه بر محل، زمینهٔ آرتروز و ویژگی چربی، افتراق را به‌اختصار بیان می‌کند. این مقایسه به همان ویژگی‌های ذکرشده در منبع محدود است.'),
      rows: [
        [L('Einfache Knochenzyste (SBC)', 'Simple bone cyst (SBC)', 'کیست سادهٔ استخوان (SBC)'), L('Laut PDF eher zentral, meist bei jüngeren Patientinnen und Patienten sowie oft diaphysär/metaphysär.', 'According to the PDF, more often central, usually in younger patients, and often diaphyseal/metaphyseal.', 'طبق PDF معمولاً مرکزی‌تر، اغلب در بیماران جوان‌تر و بیشتر دیافیزی/متافیزی است.')],
        [L('Subchondrale Geode', 'Subchondral geode', 'ژئود ساب‌کندرال'), L('Die PDF ordnet sie einer fortgeschrittenen Arthrose zu.', 'The PDF associates it with advanced osteoarthritis.', 'PDF آن را در زمینهٔ آرتروز پیشرفته قرار می‌دهد.')],
        [L('Intraossäres Lipom', 'Intraosseous lipoma', 'لیپوم داخل‌استخوانی'), L('Laut PDF zeigt es Fettattenuation mit negativem HU-Wert im CT und hohes T1-Signal im MRT.', 'According to the PDF, it shows fat attenuation with negative HU values on CT and high T1 signal on MRI.', 'طبق PDF، در CT دانسیتهٔ چربی با HU منفی و در MRI سیگنال T1 بالا دارد.')],
      ],
    },
  ],
  check: {
    title: L('Selbstcheck: Welche Zuordnung passt zur PDF?', 'Self-check: Which combination matches the PDF?', 'خودآزمایی: کدام ترکیب با PDF سازگار است؟'),
    prompt: L('Eine gelenknahe, scharf begrenzte lytische Läsion hat niedriges T1-Signal, sehr hohes T2/STIR-Signal und nur randständiges Kapselenhancement. Welche Beschreibung passt am besten zur Kursseite?', 'A juxta-articular, well-defined lytic lesion has low T1 signal, very high T2/STIR signal and only marginal capsular enhancement. Which description best matches the course page?', 'ضایعه‌ای لیتیک و خوش‌مرز نزدیک مفصل، سیگنال پایین T1، سیگنال بسیار بالای T2/STIR و فقط تقویت کنتراست در حاشیهٔ کپسول دارد. کدام توصیف بیشترین تطابق را با صفحهٔ آموزشی دارد؟'),
    options: [
      L('Das dort beschriebene Muster eines intraossären Ganglions.', 'The intraosseous ganglion pattern described there.', 'الگوی گانگلیون داخل‌استخوانی که در آن صفحه توصیف شده است.'),
      L('Eine subchondrale Geode, weil die PDF sie unabhängig vom Arthrosekontext definiert.', 'A subchondral geode, because the PDF defines it independently of osteoarthritis.', 'ژئود ساب‌کندرال، چون PDF آن را مستقل از زمینهٔ آرتروز تعریف می‌کند.'),
      L('Ein intraossäres Lipom mit hohem T1-Signal.', 'An intraosseous lipoma with high T1 signal.', 'لیپوم داخل‌استخوانی با سیگنال T1 بالا.'),
    ],
    answer: 0,
    explanation: L('Die Kombination übernimmt die Quellenbeschreibung: gelenknahe Lage, flüssigkeitstypisches niedriges T1 und hohes T2/STIR sowie randständiges Kapselenhancement. Die PDF ordnet die Geode der fortgeschrittenen Arthrose zu und nennt beim Lipom negatives HU im CT und hohes T1-Signal.', 'This combination follows the source description: juxta-articular location, fluid-like low T1 and high T2/STIR signal, and marginal capsular enhancement. The PDF associates a geode with advanced osteoarthritis and lists negative CT HU values and high T1 signal for lipoma.', 'این ترکیب از توصیف منبع پیروی می‌کند: محل نزدیک مفصل، سیگنال مایع‌مانند پایین در T1 و بالا در T2/STIR، و تقویت کنتراست در حاشیهٔ کپسول. PDF ژئود را به آرتروز پیشرفته و لیپوم را به HU منفی در CT و سیگنال بالای T1 مرتبط می‌کند.'),
    retry: L('Prüfe den Signalvergleich: Die Kursseite beschreibt das Ganglion mit niedrigem T1- und sehr hohem T2/STIR-Signal; das Lipom wird in der Differenzialdiagnose durch hohes T1-Signal kontrastiert.', 'Check the signal contrast: the course page describes the ganglion with low T1 and very high T2/STIR signal; lipoma is contrasted by high T1 signal in the differential.', 'تفاوت سیگنال را بررسی کنید: صفحهٔ آموزشی گانگلیون را با سیگنال پایین T1 و بسیار بالای T2/STIR توصیف می‌کند؛ لیپوم در افتراق با سیگنال بالای T1 مشخص شده است.'),
  },
  summary: [
    L('Das beschriebene Ganglion liegt typischerweise gelenknah in Epiphyse oder Metaphyse.', 'The described ganglion is typically juxta-articular in the epiphysis or metaphysis.', 'گانگلیون توصیف‌شده معمولاً نزدیک مفصل و در اپی‌فیز یا متافیز قرار دارد.'),
    L('Die PDF nennt eine scharf begrenzte lytische Läsion mit sklerotischem Randsaum und ohne Matrixverkalkung.', 'The PDF describes a well-defined lytic lesion with a sclerotic rim and no matrix mineralisation.', 'PDF ضایعه‌ای لیتیک و خوش‌مرز با حاشیهٔ اسکلروتیک و بدون کلسیفیکاسیون ماتریکس توصیف می‌کند.'),
    L('Im MRT beschreibt die Quelle niedriges T1, sehr hohes T2/STIR und nur marginales Kapselenhancement.', 'On MRI, the source describes low T1, very high T2/STIR and only marginal capsular enhancement.', 'در MRI، منبع سیگنال پایین T1، بسیار بالای T2/STIR و فقط تقویت کنتراست در حاشیهٔ کپسول را توصیف می‌کند.'),
  ],
  references: [
    { title: L('Kursquelle', 'Course source', 'منبع آموزشی'), citation: L('MSK.pdf, PDF-S. 119; gedruckte Seite 118. Die PDF-Seite enthält Text, aber keine Patientenabbildung.', 'MSK.pdf, PDF p. 119; printed p. 118. This page contains text but no patient image.', 'MSK.pdf، صفحهٔ PDF ۱۱۹؛ صفحهٔ چاپی ۱۱۸. این صفحه متن دارد اما تصویر بیمار ندارد.'), href: '' },
  ],
}
