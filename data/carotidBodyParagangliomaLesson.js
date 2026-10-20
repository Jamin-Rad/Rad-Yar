const L = (de, en, fa) => ({ de, en, fa })

export const CAROTID_BODY_PARAGANGLIOMA_LESSON = {
  id: 'paragangliome-glomustumoren',
  title: L('Glomus caroticum: Paragangliom der Karotisbifurkation', 'Carotid body paraganglioma', 'پاراگانگلیوم جسم کاروتید'),
  hero: '/educational/carotid-body-paraganglioma/hero-v2.webp',
  sourceNote: L(
    'Begrenzter Entwurf nach Wirbelsäule.pdf, PDF-Seiten 23–24 (Druckseiten 22–23). Diese Seiten behandeln ausdrücklich das Glomus caroticum an der Karotisbifurkation. Sie belegen keine spinalen Paragangliome; die Curriculum-ID paragangliom-spinal bleibt separat und wird hier nicht bearbeitet.',
    'Bounded draft based on Wirbelsäule.pdf, PDF pp. 23–24 (printed pp. 22–23). These pages explicitly cover the carotid body at the carotid bifurcation. They do not support spinal paraganglioma content; curriculum ID paragangliom-spinal remains separate and is not covered here.',
    'پیش‌نویس محدود بر اساس Wirbelsäule.pdf، صفحات PDF ۲۳–۲۴ (صفحات چاپی ۲۲–۲۳). این صفحات صریحاً دربارهٔ جسم کاروتید در محل دوشاخه‌شدن کاروتید هستند. محتوایی دربارهٔ پاراگانگلیوم نخاعی پشتیبانی نمی‌کنند؛ شناسهٔ جداگانهٔ paragangliom-spinal در این درس پوشش داده نمی‌شود.'
  ),
  sections: [
    {
      id: 'location', icon: 'clinical',
      title: L('Wo liegt das Glomus caroticum?', 'Where is the carotid body tumour located?', 'تومور جسم کاروتید کجا قرار دارد؟'),
      lead: L(
        'Die PDF beschreibt einen neuroendokrinen Tumor der Chemorezeptorzellen des Glomus caroticum an der Karotisbifurkation. Für die Bildsuche ist zuerst die Aufzweigung der A. carotis communis entscheidend.',
        'The PDF describes a neuroendocrine tumour of the carotid-body chemoreceptor cells at the carotid bifurcation. On imaging, first identify the division of the common carotid artery.',
        'PDF آن را تومور نورواندوکرین سلول‌های کمورسپتور جسم کاروتید در محل دوشاخه‌شدن شریان کاروتید می‌داند. در تصویر ابتدا محل انشعاب شریان کاروتید مشترک را پیدا کنید.'
      ),
      note: L(
        'Abgrenzung: Diese Lektion behandelt ausschließlich das extrakranielle Glomus caroticum. Das separat geführte Curriculum-Thema „Spinales Paragangliom“ ist nicht dasselbe Lernziel; aus dieser PDF-Seite werden keine spinalen MRT-Merkmale abgeleitet.',
        'Scope distinction: this lesson covers only the extracranial carotid body. The separate curriculum topic “Spinal paraganglioma” is a different learning objective; no spinal MRI features are inferred from this PDF page.',
        'مرزبندی دامنه: این درس فقط جسم کاروتید خارج‌جمجمه‌ای را پوشش می‌دهد. موضوع جداگانهٔ curriculum با عنوان «پاراگانگلیوم نخاعی» هدف آموزشی دیگری است؛ از این صفحهٔ PDF ویژگی MRI نخاعی استنباط نمی‌شود.'
      ),
    },
    {
      id: 'imaging', icon: 'imaging',
      title: L('Welche Lage- und MRT-Zeichen nennt die Quelle?', 'Which location and MRI signs does the source describe?', 'منبع چه نشانه‌های مکانی و MRI را ذکر می‌کند؟'),
      lead: L(
        'An der Karotisgabel spreizt die Raumforderung A. carotis interna und externa auseinander. Die PDF bezeichnet dies als Lyra- beziehungsweise Splaying-Zeichen. Im MRT beschreibt sie T1-Signal ähnlich bis niedriger als Muskel, T2-Hyperintensität und Salt-and-Pepper; laut PDF wird dieses Muster ab etwa 2 cm Tumorgröße beschrieben. Das ist eine Quellenangabe, keine diagnostische Größenschwelle.',
        'At the carotid bifurcation, the mass splays the internal and external carotid arteries. The PDF calls this the lyre or splaying sign. On MRI it describes T1 signal similar to or lower than muscle, T2 hyperintensity and a salt-and-pepper pattern; the PDF notes this pattern from about 2 cm tumour size. This reports the source wording, not a diagnostic size threshold.',
        'در محل دوشاخهٔ کاروتید، توده شریان‌های کاروتید داخلی و خارجی را از هم باز می‌کند. PDF این یافته را علامت Lyre یا Splaying می‌نامد. در MRI سیگنال T1 مشابه یا پایین‌تر از عضله، T2 پرسیگنال و الگوی Salt-and-pepper توصیف شده است؛ طبق PDF این الگو از اندازهٔ تومور حدود ۲ سانتی‌متر به بالا ذکر می‌شود. این فقط بازگویی منبع است و آستانهٔ تشخیصی اندازه نیست.'
      ),
      rows: [
        [L('CT-Lokalisation', 'CT localisation', 'موضع‌یابی در CT'), L('Raumforderung an der Karotisbifurkation; im PDF-Beispiel sagittale CT. Die Abbildung illustriert die Lage, nicht einen vollständigen CT-Algorithmus.', 'Mass at the carotid bifurcation; the PDF example is a sagittal CT. The image illustrates location, not a complete CT algorithm.', 'توده در محل دوشاخه‌شدن کاروتید؛ نمونهٔ PDF یک CT ساژیتال است. تصویر محل را نشان می‌دهد، نه یک الگوریتم کامل CT.')],
        [L('Lyra-/Splaying-Zeichen', 'Lyre/splaying sign', 'علامت Lyre/Splaying'), L('A. carotis interna und externa weichen auseinander, laut PDF an der Karotisgabel.', 'The internal and external carotid arteries are displaced apart at the bifurcation, according to the PDF.', 'طبق PDF، شریان‌های کاروتید داخلی و خارجی در محل دوشاخه از هم فاصله می‌گیرند.')],
        [L('T1 / T2', 'T1 / T2', 'T1 / T2'), L('T1: iso- bis hypointens zur Muskulatur. T2: hyperintens.', 'T1: iso- to hypointense relative to muscle. T2: hyperintense.', 'T1: هم‌سیگنال تا کم‌سیگنال نسبت به عضله. T2: پرسیگنال.')],
        [L('Salt-and-Pepper', 'Salt-and-pepper', 'الگوی Salt-and-pepper'), L('Punktförmige Flow-Voids („pepper“) und hyperintense Areale beziehungsweise Hämorrhagien („salt“). Die PDF nennt das Muster ab etwa 2 cm Tumorgröße; dies ist kein Ausschlusskriterium für kleinere Läsionen.', 'Punctate flow voids (“pepper”) and hyperintense areas or haemorrhage (“salt”). The PDF notes the pattern from about 2 cm tumour size; this is not an exclusion criterion for smaller lesions.', 'Flow voidهای نقطه‌ای («pepper») و نواحی پرسیگنال یا خونریزی («salt»). PDF این الگو را از حدود ۲ سانتی‌متر به بالا ذکر می‌کند؛ این نکته معیار رد ضایعات کوچک‌تر نیست.')],
        [L('T1 nach Kontrastmittel, fettgesättigt', 'Post-contrast fat-suppressed T1', 'T1 پس از تزریق با سرکوب چربی'), L('Die Quelle beschreibt eine kräftige, frühe und homogene Kontrastmittelaufnahme als hypervaskuläres Muster.', 'The source describes avid, early, homogeneous enhancement as a hypervascular pattern.', 'منبع تقویت شدید، زودرس و همگن را به‌عنوان الگویی پرعروق توصیف می‌کند.')],
      ],
      note2: L(
        'Die PDF-Seite nennt DWI nur als Überschrift, ohne auswertbare Aussage. Deshalb wird hier kein DWI-Muster ergänzt.',
        'The PDF page shows DWI only as a heading, without an interpretable statement. No DWI pattern is added here.',
        'در صفحهٔ PDF فقط عنوان DWI آمده و توضیح قابل استفاده‌ای ندارد؛ بنابراین الگویی برای DWI اضافه نشده است.'
      ),
      imageAlt: L('Sagittale CT-Aufnahme aus dem PDF mit Raumforderung an der Karotisbifurkation.', 'Sagittal CT image from the PDF showing a mass at the carotid bifurcation.', 'تصویر CT ساژیتال از PDF با توده‌ای در محل دوشاخه‌شدن کاروتید.'),
      imageCaption: L('Quellbild: Wirbelsäule.pdf, PDF-Seite 23 (Druckseite 22), CT-Beispiel rID 47694. Es illustriert die Lage; die Pfeile oder weitere Phasen eines kompletten Befunds sind auf diesem Ausschnitt nicht dargestellt.', 'Source image: Wirbelsäule.pdf, PDF p. 23 (printed p. 22), CT example rID 47694. It illustrates location; arrows or additional phases from a complete examination are not shown in this crop.', 'تصویر منبع: Wirbelsäule.pdf، صفحهٔ PDF ۲۳ (صفحهٔ چاپی ۲۲)، نمونهٔ CT با شناسهٔ rID 47694. تصویر محل را نشان می‌دهد؛ پیکان‌ها یا فازهای دیگر یک بررسی کامل در این برش دیده نمی‌شوند.'),
    },
    {
      id: 'shamblin', icon: 'differential',
      title: L('Wie ordnet die PDF die Gefäßumfassung ein?', 'How does the PDF group vessel encasement?', 'PDF میزان درگیری عروق را چگونه دسته‌بندی می‌کند؟'),
      lead: L('Die Shamblin-Klassifikation wird auf der Quellseite als chirurgisch relevant bezeichnet. Hier dient sie nur dazu, die in der Bildgebung beschriebene Beziehung zur Karotis knapp zu ordnen.', 'The source page labels the Shamblin classification as surgically relevant. Here it is used only to organise the imaging description of the carotid relationship.', 'صفحهٔ منبع طبقه‌بندی Shamblin را از نظر جراحی مهم می‌داند. در اینجا فقط برای مرتب‌کردن توصیف تصویریِ ارتباط با کاروتید به‌کار می‌رود.'),
      rows: [
        [L('Shamblin I', 'Shamblin I', 'Shamblin I'), L('Klein und lokal begrenzt; laut PDF leicht resezierbar.', 'Small and locally limited; the PDF describes it as readily resectable.', 'کوچک و محدود به محل؛ PDF آن را به‌سادگی قابل برداشت توصیف می‌کند.')],
        [L('Shamblin II', 'Shamblin II', 'Shamblin II'), L('Anhaftend beziehungsweise teilweise umschließend an der Karotis.', 'Adherent to or partly surrounding the carotid artery.', 'چسبیده به یا تا حدی احاطه‌کنندهٔ شریان کاروتید.')],
        [L('Shamblin III', 'Shamblin III', 'Shamblin III'), L('Vollständige Umwandung der Karotis; die PDF erwähnt einen möglichen Gefäßersatz.', 'Complete encasement of the carotid artery; the PDF notes that vascular replacement may be needed.', 'احاطهٔ کامل شریان کاروتید؛ PDF احتمال نیاز به جایگزینی عروقی را ذکر می‌کند.')],
      ],
      note: L('Dies ist eine knappe Wiedergabe der PDF-Klassifikation und keine Operations- oder Therapieempfehlung.', 'This is a concise rendering of the PDF classification, not a surgical or treatment recommendation.', 'این بخش بازگویی خلاصهٔ طبقه‌بندی PDF است و توصیهٔ جراحی یا درمانی نیست.'),
    },
    {
      id: 'vascular-mapping', icon: 'imaging',
      title: L('Welche Methode beantwortet welche Gefäßfrage?', 'Which modality answers which vascular question?', 'هر روش به کدام پرسش عروقی پاسخ می‌دهد؟'),
      lead: L(
        'Die PDF ergänzt die lokale CT-/MRT-Morphologie um Gefäßdarstellung und Ganzkörper-Staging. Die Verfahren haben unterschiedliche Aufgaben; ein PET-Befund ersetzt keine anatomische Darstellung der Karotisgabel.',
        'The PDF adds vascular imaging and whole-body staging to local CT/MRI morphology. These methods answer different questions; PET does not replace anatomical assessment of the carotid bifurcation.',
        'PDF تصویربرداری عروقی و مرحله‌بندی کل بدن را به مورفولوژی موضعی CT/MRI اضافه می‌کند. هر روش پرسش متفاوتی را پاسخ می‌دهد؛ PET جای ارزیابی آناتومیک دوشاخهٔ کاروتید را نمی‌گیرد.'
      ),
      rows: [
        [L('TOF-MRA / CE-MRA', 'TOF-MRA / CE-MRA', 'TOF-MRA / CE-MRA'), L('Die Quellseite nennt ein Auseinanderweichen der Karotisgabel und eine kräftige Tumorperfusion. Kontrastverstärkte MRA mit großem Bildfeld kann bei bekanntem Kopf-Hals-Paragangliom helfen, multifokale Herde zu erkennen.', 'The source page notes carotid-bifurcation splaying and strong tumour perfusion. In known head-and-neck paraganglioma, contrast-enhanced MRA with a large field of view can help detect multifocal lesions.', 'صفحهٔ منبع از بازشدن دوشاخهٔ کاروتید و پرفیوژن زیاد تومور یاد می‌کند. در پاراگانگلیوم شناخته‌شدهٔ سر و گردن، MRA با تزریق و میدان دید وسیع می‌تواند به شناسایی ضایعات چندکانونی کمک کند.')],
        [L('DSA / Katheterangiographie', 'DSA / catheter angiography', 'DSA / آنژیوگرافی کاتتری'), L('Die PDF führt DSA zur detaillierten Gefäßdarstellung auf. DSA ist eine invasive Methode; diese Lektion nennt sie nur zur gezielten Darstellung der Gefäßanatomie, wenn diese Frage ausdrücklich gestellt wird, nicht als Routine-Erstuntersuchung.', 'The PDF lists DSA for detailed vascular depiction. DSA is invasive; this lesson presents it only as a method for targeted vascular mapping when that question is specifically being addressed, not as a routine first-line examination.', 'PDF، DSA را برای نمایش دقیق عروق ذکر می‌کند. DSA روشی تهاجمی است؛ در این درس فقط برای نقشه‌برداری هدفمند از آناتومی عروق، در صورت طرح مشخص این پرسش، مطرح می‌شود و نه به‌عنوان بررسی اولیهٔ معمول.')],
        [L('68Ga-DOTATATE-PET/CT', '68Ga-DOTATATE PET/CT', '68Ga-DOTATATE PET/CT'), L('Die PDF nennt die Methode für das Screening auf Multifokalität. Leitlinien und Fachkonsensus stützen SSTR-PET, wenn bei bekanntem Kopf-Hals-Paragangliom multifokale oder metastatische Erkrankung vermutet wird; PET ergänzt die anatomische Bildgebung.', 'The PDF names this method for multifocality screening. Guidance and specialty consensus support SSTR PET when multifocal or metastatic disease is suspected in known head-and-neck paraganglioma; PET complements anatomical imaging.', 'PDF این روش را برای غربالگری چندکانونی‌بودن ذکر می‌کند. راهنماها و اجماع تخصصی از SSTR-PET در صورت شک به بیماری چندکانونی یا متاستاتیک در پاراگانگلیوم شناخته‌شدهٔ سر و گردن پشتیبانی می‌کنند؛ PET مکمل تصویربرداری آناتومیک است.')],
      ],
    },
    {
      id: 'differential', icon: 'differential',
      title: L('Welche Raumforderungen können ähnlich aussehen?', 'Which masses can mimic this lesion?', 'چه توده‌هایی ممکن است شبیه این ضایعه باشند؟'),
      lead: L('Die PDF vergleicht die Lagebeziehung und Gefäßzeichen. Diese Muster grenzen ein; sie ersetzen keine vollständige radiologische Abklärung.', 'The PDF compares location and vascular signs. These patterns narrow the differential; they do not replace a complete radiologic work-up.', 'PDF ارتباط مکانی و نشانه‌های عروقی را مقایسه می‌کند. این الگوها افتراق را محدود می‌کنند، اما جای ارزیابی کامل رادیولوژیک را نمی‌گیرند.'),
      rows: [
        [L('Schwannom', 'Schwannoma', 'شوانوما'), L('Die PDF nennt fehlende typische Flow-Voids und kein Splaying der Karotisgabel; zystische Anteile sind möglich. Die genaue Verlagerungsrichtung von A. carotis interna und V. jugularis hängt vom Ursprungsnerv ab und darf nicht pauschal aus der verkürzten PDF-Angabe abgeleitet werden.', 'The PDF notes absent typical flow voids and no carotid-bifurcation splaying; cystic components may occur. The exact displacement of the internal carotid artery and jugular vein depends on the nerve of origin and should not be generalized from the abbreviated PDF statement.', 'PDF نبود Flow voidهای تیپیک و نبود بازشدن دوشاخهٔ کاروتید را ذکر می‌کند؛ اجزای کیستیک ممکن‌اند. جهت دقیق جابه‌جایی شریان کاروتید داخلی و ورید ژوگولار به عصب مبدأ بستگی دارد و نباید از عبارت کوتاه PDF به‌طور کلی نتیجه‌گیری شود.')],
        [L('Glomus vagale', 'Vagal paraganglioma', 'پاراگانگلیوم واگ'), L('Die PDF lokalisiert es oberhalb der Bifurkation und beschreibt kein Splaying; die A. carotis interna kann anteromedial verlagert sein. Dies ist ein anderes Kopf-Hals-Paragangliom, kein spinales Paragangliom.', 'The PDF places it above the bifurcation and describes no splaying; the internal carotid artery may be displaced anteromedially. This is a different head-and-neck paraganglioma, not a spinal paraganglioma.', 'PDF آن را بالاتر از دوشاخه قرار می‌دهد و بازشدن دوشاخه را توصیف نمی‌کند؛ شریان کاروتید داخلی ممکن است به جلو و داخل جابه‌جا شود. این نوع دیگری از پاراگانگلیوم سر و گردن است، نه پاراگانگلیوم نخاعی.')],
        [L('Lymphknotenmetastase', 'Lymph-node metastasis', 'متاستاز غدهٔ لنفاوی'), L('Die PDF nennt fehlende Flow-Voids und eine geringere Hypervaskularität als Unterscheidungshinweise.', 'The PDF notes absent flow voids and lower hypervascularity as distinguishing clues.', 'PDF نبود Flow void و پرعروق‌نبودن نسبی را از نشانه‌های افتراقی می‌داند.')],
        [L('Karotisaneurysma', 'Carotid aneurysm', 'آنوریسم کاروتید'), L('Auf eine direkte Verbindung zum Gefäßlumen und ein Flussphänomen achten; bei Verdacht muss die Gefäßkontinuität gezielt beurteilt werden.', 'Look for direct continuity with the vessel lumen and flow phenomenon; when suspected, assess vessel continuity directly.', 'به پیوستگی مستقیم با لومن رگ و پدیدهٔ جریان توجه کنید؛ در صورت شک، پیوستگی عروق باید به‌طور هدفمند بررسی شود.')],
      ],
    },
  ],
  check: {
    title: L('Salt-and-Pepper richtig zuordnen', 'Match the salt-and-pepper components', 'اجزای Salt-and-pepper را درست تطبیق دهید'),
    prompt: L('Welche Zuordnung entspricht der PDF-Seite?', 'Which pairing matches the PDF page?', 'کدام تطبیق با صفحهٔ PDF هم‌خوان است؟'),
    options: [
      L('Pepper = Flow-Voids; Salt = hyperintense Areale oder Hämorrhagien.', 'Pepper = flow voids; salt = hyperintense areas or haemorrhage.', 'Pepper = Flow void؛ Salt = نواحی پرسیگنال یا خونریزی.'),
      L('Pepper = Hämorrhagien; Salt = Flow-Voids.', 'Pepper = haemorrhage; salt = flow voids.', 'Pepper = خونریزی؛ Salt = Flow void.'),
      L('Pepper und Salt bezeichnen beide die Gefäßwand.', 'Pepper and salt both refer to the vessel wall.', 'Pepper و Salt هر دو به دیوارهٔ رگ اشاره دارند.'),
    ],
    answer: 0,
    explanation: L('Die Quelle ordnet die punktförmigen Flow-Voids dem „pepper“ und hyperintense Areale beziehungsweise Hämorrhagien dem „salt“ zu.', 'The source maps punctate flow voids to “pepper” and hyperintense areas or haemorrhage to “salt”.', 'منبع Flow voidهای نقطه‌ای را به «pepper» و نواحی پرسیگنال یا خونریزی را به «salt» نسبت می‌دهد.'),
    retry: L('Prüfe noch einmal, welcher Bestandteil im PDF als punktförmiger Flow-Void beschrieben wird.', 'Review which component the PDF describes as punctate flow voids.', 'دوباره بررسی کنید که PDF کدام جزء را Flow void نقطه‌ای می‌داند.'),
  },
  additionalCheck: {
    title: L('Anatomische und funktionelle Bildgebung unterscheiden', 'Separate anatomical and functional imaging', 'تصویربرداری آناتومیک و عملکردی را از هم تشخیص دهید'),
    prompt: L('Bei bekanntem Kopf-Hals-Paragangliom besteht der Verdacht auf multifokale Herde. Welche Aussage ordnet die Verfahren am besten ein?', 'A patient with known head-and-neck paraganglioma is suspected of having multifocal lesions. Which statement best distinguishes the modalities?', 'در بیمار مبتلا به پاراگانگلیوم شناخته‌شدهٔ سر و گردن، به ضایعات چندکانونی شک داریم. کدام عبارت روش‌ها را بهتر از هم تفکیک می‌کند؟'),
    options: [
      L('CE-MRA zeigt die Gefäß- und Tumoranatomie; 68Ga-DOTATATE-PET/CT kann die Suche nach multifokaler Erkrankung ergänzen.', 'CE-MRA depicts vascular and tumour anatomy; 68Ga-DOTATATE PET/CT can complement the search for multifocal disease.', 'CE-MRA آناتومی عروق و تومور را نشان می‌دهد؛ 68Ga-DOTATATE PET/CT می‌تواند جست‌وجوی بیماری چندکانونی را تکمیل کند.'),
      L('68Ga-DOTATATE-PET/CT ersetzt die lokale anatomische Beurteilung der Karotisgabel.', '68Ga-DOTATATE PET/CT replaces local anatomical assessment of the carotid bifurcation.', '68Ga-DOTATATE PET/CT جای ارزیابی آناتومیک موضعی دوشاخهٔ کاروتید را می‌گیرد.'),
      L('DSA ist bei jeder vermuteten Läsion eine nicht-invasive Erstuntersuchung.', 'DSA is a non-invasive first-line examination for every suspected lesion.', 'DSA برای هر ضایعهٔ مشکوک یک بررسی اولیهٔ غیرتهاجمی است.'),
    ],
    answer: 0,
    explanation: L('Die Verfahren beantworten komplementäre Fragen: MRA für anatomische Gefäßdarstellung, SSTR-PET bei gezielter Suche nach multifokaler oder metastatischer Erkrankung; DSA ist invasiv und wird in dieser Lektion nur als gezielte Methode zur Gefäßdarstellung eingeordnet.', 'The modalities answer complementary questions: MRA for vascular anatomy, SSTR PET for targeted assessment of multifocal or metastatic disease; DSA is invasive and is presented here only as a targeted method for vascular depiction.', 'این روش‌ها به پرسش‌های مکمل پاسخ می‌دهند: MRA برای آناتومی عروق و SSTR-PET برای بررسی هدفمند بیماری چندکانونی یا متاستاتیک؛ DSA تهاجمی است و در این درس فقط به‌عنوان روشی هدفمند برای نمایش عروق معرفی می‌شود.'),
    retry: L('Ordne die Verfahren nach anatomischer Gefäßdarstellung, Ganzkörper-Staging und Invasivität.', 'Sort the methods by vascular anatomy, whole-body staging and invasiveness.', 'روش‌ها را بر اساس نمایش آناتومی عروق، مرحله‌بندی کل بدن و تهاجمی‌بودن مرتب کنید.'),
  },
  summary: [
    L('Glomus caroticum liegt an der Karotisbifurkation; die PDF zeigt die Aufzweigung im sagittalen CT.', 'The carotid body lies at the carotid bifurcation; the PDF shows the branch point on sagittal CT.', 'جسم کاروتید در محل دوشاخه‌شدن کاروتید قرار دارد؛ PDF محل انشعاب را در CT ساژیتال نشان می‌دهد.'),
    L('Das Lyra-/Splaying-Zeichen beschreibt das Auseinanderweichen von A. carotis interna und externa.', 'The lyre/splaying sign describes separation of the internal and external carotid arteries.', 'علامت Lyre/Splaying فاصله‌گرفتن شریان‌های کاروتید داخلی و خارجی را توصیف می‌کند.'),
    L('MRI laut PDF: T1 iso-/hypointens, T2 hyperintens und kräftige frühe homogene Kontrastmittelaufnahme; Salt-and-Pepper beschreibt die Quelle ab etwa 2 cm Tumorgröße.', 'MRI per the PDF: T1 iso-/hypointense, T2 hyperintense and avid early homogeneous enhancement; the source describes salt-and-pepper from about 2 cm tumour size.', 'طبق PDF در MRI: T1 هم‌سیگنال/کم‌سیگنال، T2 پرسیگنال و تقویت شدید، زودرس و همگن؛ منبع الگوی Salt-and-pepper را از اندازهٔ حدود ۲ سانتی‌متر به بالا توصیف می‌کند.'),
    L('MRA und 68Ga-DOTATATE-PET/CT beantworten unterschiedliche Fragen; DSA ist invasiv und wird hier nur als gezielte Methode zur Gefäßdarstellung eingeordnet.', 'MRA and 68Ga-DOTATATE PET/CT answer different questions; DSA is invasive and presented here only as a targeted method for vascular depiction.', 'MRA و 68Ga-DOTATATE PET/CT به پرسش‌های متفاوتی پاسخ می‌دهند؛ DSA تهاجمی است و در اینجا فقط به‌عنوان روشی هدفمند برای نمایش عروق معرفی می‌شود.'),
  ],
  references: [{
    id: 'source-p23', tag: 'PDF',
    title: L('Wirbelsäule.pdf · Glomus caroticum', 'Wirbelsäule.pdf · carotid body', 'Wirbelsäule.pdf · جسم کاروتید'),
    citation: L('PDF-Seite 23, Druckseite 22. Die Seite wurde als Ganzes visuell geprüft; das CT-Beispiel trägt im PDF die Kennung rID 47694.', 'PDF p. 23, printed p. 22. The full page was visually inspected; the CT example is marked rID 47694 in the PDF.', 'صفحهٔ PDF ۲۳، صفحهٔ چاپی ۲۲. کل صفحه بصری بررسی شد؛ تصویر CT در PDF شناسهٔ rID 47694 دارد.'),
    scope: L('Nur Carotisgabel-Paragangliom; kein Beleg für das separate Curriculum-Thema „spinales Paragangliom“.', 'Carotid-bifurcation paraganglioma only; no evidence for the separate curriculum topic “spinal paraganglioma”.', 'فقط پاراگانگلیوم دوشاخهٔ کاروتید؛ بدون شواهد برای موضوع جداگانهٔ «پاراگانگلیوم نخاعی» در curriculum.'),
  }, {
    id: 'source-p24', tag: 'PDF',
    title: L('Wirbelsäule.pdf · Karotisgabel: Gefäßdarstellung und Differenzialdiagnosen', 'Wirbelsäule.pdf · carotid bifurcation: vascular imaging and differentials', 'Wirbelsäule.pdf · دوشاخهٔ کاروتید: تصویربرداری عروقی و تشخیص افتراقی'),
    citation: L('PDF-Seite 24, Druckseite 23. Visuell geprüft: TOF-/CE-MRA, DSA, 68Ga-DOTATATE-PET/CT und vier Differenzialdiagnosen.', 'PDF p. 24, printed p. 23. Visually inspected: TOF/CE-MRA, DSA, 68Ga-DOTATATE PET/CT and four differential diagnoses.', 'صفحهٔ PDF ۲۴، صفحهٔ چاپی ۲۳. موارد بررسی‌شده: TOF/CE-MRA، DSA، 68Ga-DOTATATE PET/CT و چهار تشخیص افتراقی.'),
    scope: L('Dieser Abschnitt behandelt die auf der Quellseite genannten Bildgebungs- und Differenzialhinweise.', 'This section covers the imaging and differential clues listed on the source page.', 'این بخش نشانه‌های تصویربرداری و افتراقی ذکرشده در صفحهٔ منبع را پوشش می‌دهد.'),
  }, {
    id: 'evidence-hnpgl-imaging', tag: 'Fachquelle',
    href: 'https://pubs.rsna.org/doi/10.1148/rycan.210088',
    title: L('Khan et al. · Head and Neck Paragangliomas: Imaging and Management Recommendations', 'Khan et al. · Head and Neck Paragangliomas: Imaging and Management Recommendations', 'Khan و همکاران · پاراگانگلیوم‌های سر و گردن: توصیه‌های تصویربرداری و مدیریت'),
    citation: L('Radiology: Imaging Cancer. 2022;4(3):e210088. doi:10.1148/rycan.210088. Verwendet für CE-MRA zur Multifokalität und SSTR-PET/CT bei multifokaler/metastatischer Fragestellung.', 'Radiology: Imaging Cancer. 2022;4(3):e210088. doi:10.1148/rycan.210088. Used for CE-MRA in multifocality assessment and SSTR PET/CT when multifocal or metastatic disease is suspected.', 'Radiology: Imaging Cancer. 2022;4(3):e210088. doi:10.1148/rycan.210088. برای بررسی چندکانونی با CE-MRA و استفاده از SSTR PET/CT در شک به بیماری چندکانونی یا متاستاتیک.'),
    scope: L('Fachkonsensus, keine klinische Freigabe dieser Lektion. Die PDF-Formulierung „sensitivste Methode“ ist auf den abgegrenzten Kontext multifokaler/metastatischer Erkrankung begrenzt.', 'Specialty consensus, not clinical approval of this lesson. The PDF wording “most sensitive method” is limited to the stated context of multifocal/metastatic disease.', 'اجماع تخصصی است و به‌معنای تأیید بالینی این درس نیست. عبارت PDF مبنی بر «حساس‌ترین روش» به زمینهٔ محدود بیماری چندکانونی/متاستاتیک محدود شده است.'),
  }],
}
