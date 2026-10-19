const L = (de, en, fa) => ({ de, en, fa })

export const MSK_FIBROESE_DYSPLASIE_LESSON = {
  id: 'fibroese-dysplasie',
  title: L('Fibröse Dysplasie', 'Fibrous dysplasia', 'دیسپلازی فیبروزی'),
  hero: '/educational/fibroese-dysplasie/hero.svg',
  sourceNote: L(
    'Begrenzter Lehrentwurf nach MSK.pdf, PDF S. 114–116 (Druckseiten 113–115). Die Bildbeispiele stammen aus der bereitgestellten PDF. Die PDF nennt CT „Goldstandard“; das wird hier enger als besonders hilfreiche Darstellung von Matrix und Knochenform wiedergegeben, nicht als pauschale Untersuchungsregel. Browser- und fachärztliche Freigabe stehen noch aus.',
    'Bounded teaching draft based on MSK.pdf, PDF pp. 114–116 (printed pp. 113–115). The image examples are from the supplied PDF. The PDF calls CT the “gold standard”; this lesson narrows that to its value for depicting matrix and bone shape, not a universal imaging rule. Browser and specialist review remain pending.',
    'پیش‌نویس آموزشی محدود بر پایهٔ MSK.pdf، صفحات PDF ۱۱۴–۱۱۶ (صفحات چاپی ۱۱۳–۱۱۵). نمونه‌های تصویری از PDF ارائه‌شده هستند. PDF، CT را «استاندارد طلایی» می‌نامد؛ در این درس این عبارت به ارزش CT برای نمایش ماتریکس و شکل استخوان محدود شده و به‌صورت قاعده‌ای همگانی برای تصویربرداری بیان نمی‌شود. بازبینی مرورگر و متخصص هنوز انجام نشده است.'
  ),
  sections: [
    {
      id: 'pattern', icon: 'clinical',
      title: L('Was ändert sich innerhalb dieses Spektrums?', 'What changes across this spectrum?', 'در این طیف چه چیزی تغییر می‌کند؟'),
      lead: L(
        'Fibröse Dysplasie (FD) ist eine gutartige Entwicklungsstörung des Knochens. Normales Mark und Spongiosa werden durch ungeordnetes fibröses Gewebe und unreifen Geflechtknochen ersetzt. Für die Bildgebung ist die erste Frage: Ist ein oder sind mehrere Knochen betroffen?',
        'Fibrous dysplasia (FD) is a benign developmental bone disorder. Normal marrow and cancellous bone are replaced by disorganised fibrous tissue and immature woven bone. The first imaging question is whether one bone or several are involved.',
        'دیسپلازی فیبروزی (FD) اختلالی خوش‌خیم در تکامل استخوان است. مغز استخوان و استخوان اسفنجی طبیعی با بافت فیبروزی نامنظم و استخوان نابالغ جایگزین می‌شوند. نخستین پرسش تصویربرداری این است که یک استخوان درگیر است یا چند استخوان.'
      ),
      rows: [
        [L('Monostotisch', 'Monostotic', 'مونواستوتیک'), L('Ein Knochen ist betroffen. Die PDF gibt ca. 70–80 % an und nennt Rippen, Femur, Tibia und Schädel als häufige Lokalisationen. FD wird dort als meist im Kindes- oder frühen Erwachsenenalter diagnostiziert beschrieben.', 'One bone is involved. The PDF gives approximately 70–80% and lists ribs, femur, tibia and skull among common sites. It describes FD as usually diagnosed in childhood or early adulthood.', 'یک استخوان درگیر است. PDF فراوانی حدود ۷۰ تا ۸۰٪ را ذکر می‌کند و دنده‌ها، فمور، تیبیا و جمجمه را از محل‌های شایع می‌داند. در PDF تشخیص بیماری معمولاً در کودکی یا اوایل بزرگسالی توصیف شده است.')],
        [L('Polyostotisch', 'Polyostotic', 'پلی‌استوتیک'), L('Mehrere Knochen sind betroffen. Die PDF gibt ca. 20–30 % an, beschreibt häufig einen früheren Beginn im Kindesalter und nennt mögliche endokrine Assoziationen.', 'Several bones are involved. The PDF gives approximately 20–30%, describes a commonly earlier presentation in childhood and notes possible endocrine associations.', 'چند استخوان درگیرند. PDF فراوانی حدود ۲۰ تا ۳۰٪ را ذکر می‌کند، شروع زودتر در کودکی را توصیف می‌کند و به احتمال همراهی با اختلالات غدد درون‌ریز اشاره دارد.')],
        [L('McCune-Albright-Syndrom', 'McCune-Albright syndrome', 'سندرم مک‌کیون–آلبرایت'), L('Die PDF nennt die Kombination aus polyostotischer FD, Café-au-lait-Hautflecken und Endokrinopathie. Ein Bildbefund allein belegt dieses Syndrom nicht.', 'The PDF lists polyostotic FD, café-au-lait skin pigmentation and endocrinopathy as the combination. Imaging alone does not establish the syndrome.', 'PDF ترکیب FD پلی‌استوتیک، لکه‌های پوستی کافه‌اوله و اختلال غدد درون‌ریز را ذکر می‌کند. یافتهٔ تصویربرداری به‌تنهایی این سندرم را اثبات نمی‌کند.')],
      ],
      note: L('Die Alters- und Häufigkeitsangaben sind aus der PDF übernommen und in diesem Entwurf nicht unabhängig epidemiologisch geprüft.', 'Age and frequency figures are transcribed from the PDF and have not been independently verified epidemiologically in this draft.', 'سن و فراوانی از PDF نقل شده‌اند و در این پیش‌نویس به‌طور مستقل از نظر اپیدمیولوژیک بررسی نشده‌اند.'),
    },
    {
      id: 'radiograph-ct', icon: 'imaging',
      title: L('Welche Knochenmerkmale bilden das typische Muster?', 'What ties the bone pattern together?', 'چه چیزی الگوی استخوانی را به هم پیوند می‌دهد؟'),
      lead: L(
        'Auf Röntgen und CT kann die Matrix wie fein granuliertes Milchglas wirken. Zusammen mit einer glatt begrenzten, expansiven Läsion und einer von innen ausgedünnten, aber oft erhaltenen Kortikalis ergibt sich ein typisches Muster. Die Ausprägung kann zwischen Läsionen variieren.',
        'On radiographs and CT, the matrix may have a finely granular ground-glass appearance. With a smoothly marginated, expansile lesion and cortex thinned from within but often preserved, this forms a typical pattern. The appearance can vary between lesions.',
        'در رادیوگرافی و CT، ماتریکس ممکن است ظاهر شیشه‌ماتِ دانه‌ریز داشته باشد. همراهی آن با ضایعه‌ای با گسترش و حاشیهٔ صاف و کورتکسی که از داخل نازک شده اما اغلب حفظ شده است، الگویی تیپیک می‌سازد. شدت این ویژگی‌ها بین ضایعات متفاوت است.'
      ),
      rows: [
        [L('Matrix', 'Matrix', 'ماتریکس'), L('Feingranuläre Milchglasopazität; interne Trabekel sind möglicherweise nicht deutlich abgrenzbar.', 'Fine granular ground-glass opacity; internal trabeculae may not be clearly delineated.', 'کدورت شیشه‌ماتِ دانه‌ریز؛ ترابکول‌های داخلی ممکن است به‌وضوح قابل تفکیک نباشند.')],
        [L('Form und Rand', 'Shape and margin', 'شکل و حاشیه'), L('Meist glatt begrenzt; ein schmaler sklerotischer Randsaum kann vorhanden sein.', 'Usually smoothly marginated; a thin sclerotic rim may be present.', 'معمولاً با حاشیهٔ صاف؛ ممکن است نوار اسکلروتیک باریکی وجود داشته باشد.')],
        [L('Kortikalis', 'Cortex', 'کورتکس'), L('Expansile Remodellierung und endostale Ausdünnung/Scalloping sind möglich; die Kortikalis kann erhalten bleiben.', 'Expansile remodelling and endosteal thinning/scalloping may occur; the cortex may remain intact.', 'بازسازی همراه با اتساع و نازک‌شدن/اسکالوپینگ اندوستئال ممکن است دیده شود؛ کورتکس می‌تواند پیوسته بماند.')],
        [L('Verformung', 'Deformity', 'دفورمیتی'), L('Die PDF zeigt eine Verbiegung des proximalen Femurs („Hirtenstabdeformität“) als mögliche Folge einer tragenden Knochenläsion.', 'The PDF shows bowing of the proximal femur (“shepherd’s crook” deformity) as a possible consequence in a weight-bearing bone.', 'PDF خمیدگی فمور پروگزیمال («دفورمیتی عصای چوپان») را به‌عنوان پیامد احتمالی ضایعه در استخوان باربر نشان می‌دهد.')],
      ],
      image: '/educational/fibroese-dysplasie/msk-pdf-p115-femur.jpg',
      imageAlt: L('رادیوگرافی فمور پروگزیمال با ضایعهٔ مختلط لیتیک–اسکلروتیک، ماتریکس شیشه‌مات و خمیدگی خفیف؛ برش از MSK.pdf صفحهٔ ۱۱۵.', 'Radiograph of the proximal femur with a mixed lytic-sclerotic lesion, ground-glass matrix and mild bowing; crop from MSK.pdf p. 115.', 'رادیوگرافی فمور پروگزیمال با ضایعهٔ مختلط لیتیک–اسکلروتیک، ماتریکس شیشه‌مات و خمیدگی خفیف؛ برش از صفحهٔ ۱۱۵ PDF.'),
      imageCaption: L('MSK.pdf, PDF S. 115 (Druckseite 114), rID 17974. Die Bildlegende beschreibt eine femorale metaphysäre Läsion mit diskreter Verbiegung und abschnittsweisem Milchglasaspekt. Die Aufnahme illustriert ein Muster, sie beweist keine Diagnose für sich allein.', 'MSK.pdf, PDF p. 115 (printed p. 114), rID 17974. The source caption describes a femoral metaphyseal lesion with mild bowing and focal ground-glass appearance. The image illustrates a pattern; it does not establish a diagnosis by itself.', 'MSK.pdf، صفحهٔ PDF ۱۱۵ (صفحهٔ چاپی ۱۱۴)، rID 17974. شرح منبع ضایعهٔ متافیزی فمور با خمیدگی خفیف و ظاهر شیشه‌مات در بخش‌هایی از آن را توصیف می‌کند. تصویر یک الگو را نشان می‌دهد و به‌تنهایی تشخیص را اثبات نمی‌کند.'),
    },
    {
      id: 'mri', icon: 'imaging',
      title: L('Warum kann die MRT in die Irre führen?', 'Why can MRI mislead?', 'چرا MRI می‌تواند گمراه‌کننده باشد؟'),
      lead: L(
        'Das MRT-Signal hängt vom Anteil an fibrösem Gewebe, Knochenbälkchen, Zysten und Blutprodukten ab. In der PDF sind T1 und T2 meist signalarm bis intermediär beschrieben; zystische Anteile können T2-Signal anheben. Nach Kontrastmittel ist oft eine kräftige, heterogene Anreicherung zu sehen.',
        'MRI signal depends on the proportions of fibrous tissue, bony trabeculae, cysts and blood products. The PDF describes T1 and T2 signal as usually low to intermediate; cystic components can raise T2 signal. Post-contrast enhancement is often avid and heterogeneous.',
        'سیگنال MRI به نسبت بافت فیبروزی، ترابکول‌های استخوانی، کیست‌ها و فرآورده‌های خونی بستگی دارد. PDF سیگنال T1 و T2 را معمولاً پایین تا متوسط توصیف می‌کند؛ اجزای کیستیک می‌توانند سیگنال T2 را بالا ببرند. پس از تزریق مادهٔ حاجب، افزایش سیگنال اغلب شدید و ناهمگون است.'
      ),
      note: L('Ein niedriges T1/T2-Signal mit deutlicher Kontrastmittelaufnahme kann aggressiv wirken. Prüfe die passende Knochenmatrix im Röntgen/CT und korreliere die Modalitäten, bevor du die MRT isoliert einordnest. Die PDF stellt die MRT nicht als Methode der Wahl dar.', 'Low T1/T2 signal with conspicuous enhancement can look aggressive. Check for the corresponding bone matrix on radiographs/CT and correlate modalities before interpreting MRI in isolation. The PDF does not present MRI as the modality of choice.', 'سیگنال پایین T1/T2 همراه با افزایش سیگنال واضح پس از تزریق می‌تواند تهاجمی به نظر برسد. پیش از تفسیر مستقل MRI، ماتریکس متناظر استخوانی را در رادیوگرافی/CT بررسی و روش‌ها را با هم تطبیق دهید. PDF، MRI را روش انتخابی معرفی نمی‌کند.'),
      image: '/educational/fibroese-dysplasie/msk-pdf-p116-mri.jpg',
      imageAlt: L('سه پنل MRI ساق در توالی‌های T1، T2 و T1 پس از تزریق از نمونهٔ MSK.pdf صفحهٔ ۱۱۶.', 'Three lower-leg MRI panels in T1, T2 and post-contrast T1 from the example in MSK.pdf p. 116.', 'سه پنل MRI ساق در توالی‌های T1، T2 و T1 پس از تزریق از نمونهٔ صفحهٔ ۱۱۶ PDF.'),
      imageCaption: L('MSK.pdf, PDF S. 116 (Druckseite 115), rID 14236. Die Beschriftung ordnet die drei Sequenzen T1, T2 und T1 C+ zu. Die genaue Signalstärke der Läsion wird hier nicht unabhängig aus dem Bild abgeleitet.', 'MSK.pdf, PDF p. 116 (printed p. 115), rID 14236. The source labels the three sequences T1, T2 and post-contrast T1. Lesion signal intensity is not independently inferred from this crop.', 'MSK.pdf، صفحهٔ PDF ۱۱۶ (صفحهٔ چاپی ۱۱۵)، rID 14236. منبع سه توالی را T1، T2 و T1 پس از تزریق برچسب‌گذاری می‌کند. شدت سیگنال ضایعه در این برش به‌طور مستقل از تصویر استنباط نشده است.'),
    },
    {
      id: 'differential', icon: 'differential',
      title: L('Wie führen Lokalisation und Matrix zur Differenzialdiagnose?', 'Use site and matrix to guide the differential', 'افتراق را با محل و ماتریکس هدایت کنید'),
      lead: L(
        'Die PDF gruppiert mögliche Differenzialdiagnosen nach der Region. Das ist ein Startpunkt, keine vollständige Differenzialdiagnose: Alter, Verteilung, Matrix, Rand, Kortikalis und klinische Angaben müssen gemeinsam beurteilt werden.',
        'The PDF groups possible differentials by region. This is a starting point, not an exhaustive differential: age, distribution, matrix, margin, cortex and clinical context must be assessed together.',
        'PDF تشخیص‌های افتراقی احتمالی را بر اساس ناحیه گروه‌بندی می‌کند. این فقط نقطهٔ شروع است و فهرست کاملی نیست: سن، توزیع، ماتریکس، حاشیه، کورتکس و زمینهٔ بالینی باید در کنار هم ارزیابی شوند.'
      ),
      rows: [
        [L('Kraniofazial', 'Craniofacial', 'کرانیوفاسیال'), L('Zemento-ossifizierendes Fibrom: laut PDF schärfer begrenzt. Intraossäres Meningeom: stärker sklerosiert. Morbus Paget betrifft eher das Schädeldach.', 'Cemento-ossifying fibroma: more sharply marginated in the PDF. Intraosseous meningioma: more sclerotic. Paget disease more often affects the calvarium.', 'فیبروم سمنتواوسفایینگ: طبق PDF حاشیهٔ واضح‌تری دارد. مننژیوم داخل‌استخوانی: اسکلروتیک‌تر است. بیماری پاژه بیشتر سقف جمجمه را درگیر می‌کند.')],
        [L('Lange Röhrenknochen', 'Long bones', 'استخوان‌های بلند'), L('Die PDF nennt NOF, Enchondrom und einfache Knochenzyste; das jeweilige Muster muss mit Lokalisation und Matrix abgeglichen werden.', 'The PDF lists NOF, enchondroma and simple bone cyst; each pattern must be checked against location and matrix.', 'PDF، NOF، انکندروم و کیست سادهٔ استخوان را نام می‌برد؛ الگوی هرکدام باید با محل و ماتریکس تطبیق داده شود.')],
      ],
      note: L('Bei atypischem Muster oder klinischem Verdacht lässt sich die Abklärung nicht aus dieser Kurzliste ableiten; die PDF-Seiten behandeln weder ein vollständiges Management noch Biopsieindikationen.', 'For an atypical pattern or clinical concern, further work-up cannot be determined from this short list; these PDF pages do not cover full management or biopsy indications.', 'در الگوی نامعمول یا نگرانی بالینی، بررسی بیشتر را نمی‌توان از این فهرست کوتاه تعیین کرد؛ این صفحات PDF مدیریت کامل یا اندیکاسیون بیوپسی را پوشش نمی‌دهند.'),
      warning: L('Eine maligne Transformation ist selten. Rasche Größenzunahme mit neuem fokalem Schmerz sowie kortikale Destruktion oder eine neue extraossäre Weichteilkomponente sind Warnzeichen und erfordern fachärztliche Abklärung; sie beweisen eine Malignität nicht und können sich mit benignen aggressiven Varianten oder sekundärer aneurysmatischer Knochenzyste überschneiden.', 'Malignant transformation is rare. Rapid enlargement with new focal pain, cortical destruction or a new extraosseous soft-tissue component are red flags for specialist assessment; they do not prove malignancy and can overlap with benign aggressive variants or a secondary aneurysmal bone cyst.', 'تبدیل بدخیم نادر است. بزرگ‌شدن سریع همراه با درد کانونی جدید، تخریب کورتکس یا ایجاد مؤلفهٔ جدید بافت نرم خارج‌استخوانی از علائم هشدارند و نیاز به ارزیابی تخصصی دارند؛ این علائم بدخیمی را اثبات نمی‌کنند و ممکن است با انواع خوش‌خیم تهاجمی یا کیست استخوانی آنوریسمال ثانویه همپوشانی داشته باشند.'),
    },
  ],
  check: {
    title: L('یک دام تصویربرداری را حل کن', 'Resolve an imaging pitfall', 'یک دام تصویربرداری را حل کنید'),
    prompt: L('Bei einer proximalen Femurläsion zeigt das MRT ein niedriges T1/T2-Signal und kräftige heterogene Anreicherung. Im Röntgen/CT findet sich eine glatt begrenzte expansile Läsion mit Milchglasmatrix. Welche Einordnung passt am besten zu diesem Lernpfad?', 'A proximal femoral lesion has low T1/T2 signal and avid heterogeneous enhancement on MRI. Radiographs/CT show a smoothly marginated expansile lesion with a ground-glass matrix. Which interpretation best fits this learning path?', 'در ضایعهٔ فمور پروگزیمال، MRI سیگنال پایین T1/T2 و افزایش سیگنال شدید و ناهمگون نشان می‌دهد. در رادیوگرافی/CT ضایعه‌ای با گسترش، حاشیهٔ صاف و ماتریکس شیشه‌مات دیده می‌شود. کدام تفسیر با این مسیر آموزشی سازگارتر است؟'),
    options: [
      L('Die MRT-Anreicherung kann alarmierend aussehen; ordne sie zusammen mit der Knochenmatrix im Röntgen/CT ein.', 'MRI enhancement can look alarming; interpret it together with the bone matrix on radiographs/CT.', 'افزایش سیگنال MRI ممکن است نگران‌کننده به نظر برسد؛ آن را همراه با ماتریکس استخوانی در رادیوگرافی/CT تفسیر کنید.'),
      L('Die Kombination aus niedrigem T1/T2-Signal und kräftiger heterogener Anreicherung reicht aus, um die Läsion als malign zu klassifizieren.', 'The combination of low T1/T2 signal and avid heterogeneous enhancement is enough to classify the lesion as malignant.', 'ترکیب سیگنال پایین T1/T2 و افزایش سیگنال شدید و ناهمگون برای طبقه‌بندی ضایعه به‌عنوان بدخیم کافی است.'),
      L('Eine hohe T2-Signalintensität schließt FD aus, auch wenn zystische Anteile vorliegen.', 'High T2 signal excludes FD, even when cystic components are present.', 'سیگنال بالای T2، حتی در حضور اجزای کیستیک، FD را رد می‌کند.'),
    ],
    answer: 0,
    explanation: L('Richtig. Das PDF warnt vor dieser MRT-Falle und empfiehlt die Korrelation mit der Milchglasmatrix im Röntgen/CT. Kein Einzelmerkmal aus dieser Kurzvignette ersetzt die vollständige Befundung.', 'Correct. The PDF warns about this MRI pitfall and recommends correlation with the ground-glass matrix on radiographs/CT. No single feature in this short vignette replaces full image interpretation.', 'درست است. PDF دربارهٔ این دام MRI هشدار می‌دهد و تطبیق با ماتریکس شیشه‌مات در رادیوگرافی/CT را توصیه می‌کند. هیچ ویژگی منفردی در این سناریوی کوتاه جایگزین تفسیر کامل تصویر نیست.'),
    retry: L('Trenne die MRI-Signalwirkung von der Gesamtmorphologie. Welches Muster zeigt die Knochenmatrix in Röntgen/CT?', 'Separate the MRI signal effect from the overall morphology. What does the bone matrix look like on radiographs/CT?', 'اثر سیگنال MRI را از مورفولوژی کلی جدا کنید. ماتریکس استخوانی در رادیوگرافی/CT چه الگویی دارد؟'),
  },
  summary: [
    L('Beginne mit der Verteilung: ein Knochen oder mehrere?', 'Start with distribution: one bone or several?', 'با توزیع شروع کنید: یک استخوان یا چند استخوان؟'),
    L('Milchglasmatrix, glatte Begrenzung und mögliche Expansion/Scalloping gehören zum typischen Knochenmuster.', 'Ground-glass matrix, smooth margin and possible expansion/scalloping form the typical bone pattern.', 'ماتریکس شیشه‌مات، حاشیهٔ صاف و احتمال اتساع/اسکالوپینگ، الگوی تیپیک استخوانی را می‌سازند.'),
    L('MRT-Signal ist variabel; eine kräftige Anreicherung allein macht die Läsion nicht malign.', 'MRI signal is variable; avid enhancement alone does not make the lesion malignant.', 'سیگنال MRI متغیر است؛ افزایش سیگنال شدید به‌تنهایی ضایعه را بدخیم نمی‌کند.'),
    L('Bei möglicher FD MRT stets mit Röntgen/CT-Matrix und Verteilung korrelieren.', 'When FD is possible, correlate MRI with the radiographic/CT matrix and distribution.', 'در صورت احتمال FD، MRI را با ماتریکس رادیوگرافی/CT و توزیع ضایعات تطبیق دهید.'),
  ],
  references: [
    { tag: 'MSK.pdf · pp. 114–116', title: L('منبع کاربر: دیسپلازی فیبروزی و الگوهای تصویربرداری', 'User source: fibrous dysplasia and imaging patterns', 'منبع کاربر: دیسپلازی فیبروزی و الگوهای تصویربرداری'), citation: L('PDF S. 114–116; Druckseiten 113–115. Die Röntgen- und MRT-Ausschnitte stammen aus PDF S. 115–116 (rID 17974 und 14236).', 'PDF pp. 114–116; printed pp. 113–115. Radiograph and MRI crops are from PDF pp. 115–116 (rID 17974 and 14236).', 'صفحات PDF ۱۱۴–۱۱۶؛ صفحات چاپی ۱۱۳–۱۱۵. برش‌های رادیوگرافی و MRI از صفحات PDF ۱۱۵–۱۱۶ هستند (rID 17974 و 14236).') },
    { tag: 'Javaid et al. · 2019', title: L('راهنمای توافقی FD/MAS و نقش تصویربرداری', 'FD/MAS consensus guidance and imaging', 'راهنمای توافقی FD/MAS و نقش تصویربرداری'), href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6567644/', citation: 'Javaid MK, et al. Orphanet J Rare Dis. 2019;14:139. Consensus guidance; cross-check for FD/MAS scope and imaging context.' },
    { tag: 'Kushchayeva et al. · 2018', title: L('علائم هشدار تصویربرداری برای تبدیل بدخیم نادر', 'Imaging red flags for rare malignant transformation', 'علائم هشدار تصویربرداری برای تبدیل بدخیم نادر'), href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6269335/', citation: 'Kushchayeva YS, et al. Insights Imaging. 2018;9:1035–1056. Review. Describes rapid expansion/new pain and cortical destruction/soft-tissue mass as concerning but not uniquely diagnostic; benign aggressive FD and secondary ABC can overlap.' },
  ],
}
