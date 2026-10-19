const L = (de, en, fa) => ({ de, en, fa })

export const MSK_AVN_HUEFTE_LESSON = {
  id: 'avn-huefte',
  title: L('Avaskuläre Nekrose des Femurkopfs', 'Avascular necrosis of the femoral head', 'نکروز آواسکولار سر فمور'),
  intro: L(
    'Das PDF definiert AVN als aseptische Knochennekrose der Epiphyse und bezeichnet das MRT als Goldstandard. Seine undatierte Stadientabelle wird von der 2019 revidierten ARCO-Klassifikation getrennt; die aktuelle Stufe I verlangt mehr als ein Ödem allein.',
    'The PDF defines AVN as aseptic epiphyseal bone necrosis and calls MRI the gold standard. Its undated stage table is separated from the 2019 revised ARCO classification; current stage I requires more than oedema alone.',
    'PDF نکروز آواسکولار را نکروز آسپتیک استخوان در اپی‌فیز تعریف می‌کند و MRI را «استاندارد طلایی» می‌نامد. جدول بدون تاریخ آن از طبقه‌بندی بازنگری‌شدهٔ ARCO در ۲۰۱۹ جدا شده است؛ مرحلهٔ I در تعریف جاری به بیش از ادم به‌تنهایی نیاز دارد.'
  ),
  notice: L(
    'Quellenumfang: MSK.pdf, PDF S. 120–121 (Druck S. 119–120). Die Seiten enthalten Text und eine undatierte, unversionierte Stadientabelle, aber keine Patientenbilder. Die PDF-Tabelle wird getrennt von der 2019 revidierten ARCO-Systematik dargestellt.',
    'Source scope: MSK.pdf, PDF pp. 120–121 (printed pp. 119–120). These pages contain text and an undated, unversioned stage table, but no patient images. The PDF table is presented separately from the 2019 revised ARCO system.',
    'دامنهٔ منبع: MSK.pdf، صفحات PDF ۱۲۰–۱۲۱ (صفحات چاپی ۱۱۹–۱۲۰). این صفحات متن و جدول مراحل بدون تاریخ/نسخه دارند، اما تصویر بیمار ندارند. جدول PDF جدا از نظام بازنگری‌شدهٔ ARCO در ۲۰۱۹ نمایش داده می‌شود.'
  ),
  sections: [
    { id: 'definition', title: L('Was bedeutet AVN hier?', 'What does AVN mean here?', 'AVN در اینجا چه معنایی دارد؟') },
    { id: 'imaging', title: L('Was beschreibt das PDF in der Bildgebung?', 'What imaging findings does the PDF describe?', 'PDF در تصویربرداری چه یافته‌هایی را توصیف می‌کند؟') },
    { id: 'differentials', title: L('Welche Lage hilft bei der Abgrenzung?', 'How does location help with the differential?', 'محل ضایعه چگونه به افتراق کمک می‌کند؟') },
    { id: 'check', title: L('Muster abrufen', 'Retrieve the pattern', 'الگو را به یاد بیاورید') },
    { id: 'take-home', title: L('Drei Regeln zum Mitnehmen', 'Three rules to remember', 'سه نکته برای یادآوری'), emphasis: true },
  ],
  causes: [
    L('Trauma: insbesondere Schenkelhalsfraktur oder Luxation (so im PDF genannt).', 'Trauma, particularly femoral-neck fracture or dislocation (as listed in the PDF).', 'تروما، به‌ویژه شکستگی گردن فمور یا دررفتگی (طبق فهرست PDF).'),
    L('Systemische Langzeittherapie mit Glukokortikoiden.', 'Long-term systemic glucocorticoid therapy.', 'درمان سیستمیک طولانی‌مدت با گلوکوکورتیکوئیدها.'),
    L('Chronischer Alkoholabusus und Hämoglobinopathien, zum Beispiel Sichelzellkrankheit.', 'Chronic alcohol misuse and haemoglobinopathies, such as sickle-cell disease.', 'مصرف مزمن الکل و هموگلوبینوپاتی‌ها، مانند بیماری سلول داسی‌شکل.'),
  ],
  localizations: [
    L('Femurkopf (im PDF als klassisch bezeichnet)', 'Femoral head (called classic in the PDF)', 'سر فمور (در PDF محل کلاسیک نامیده شده)'),
    L('Humeruskopf', 'Humeral head', 'سر هومروس'),
    L('Femurkondylus', 'Femoral condyle', 'کندیل فمور'),
    L('Talus', 'Talus', 'تالوس'),
    L('Skaphoid', 'Scaphoid', 'اسکافوئید'),
  ],
  bilateralNote: L(
    'Die PDF gibt an, dass in 50 % der Fälle beide Femurköpfe betroffen seien; worauf sich der Nenner bezieht, bleibt unklar.',
    'The PDF states that both femoral heads are involved in 50% of cases; the denominator is unclear.',
    'PDF می‌گوید در ۵۰٪ موارد هر دو سر فمور درگیرند؛ مخرج این درصد روشن نیست.'
  ),
  pdfStages: [
    [L('0', '0', '۰'), L('Histologische Diagnose; Bildgebung unauffällig', 'Histological diagnosis; imaging unremarkable', 'تشخیص بافت‌شناختی؛ تصویربرداری بدون یافته')],
    [L('I', 'I', 'I'), L('Röntgen negativ; MRT-Ödem', 'Radiograph negative; MRI oedema', 'رادیوگرافی منفی؛ ادم در MRI')],
    [L('II', 'II', 'II'), L('Sklerose/Zysten; Knorpel intakt; keine Fraktur', 'Sclerosis/cysts; cartilage intact; no fracture', 'اسکلروز/کیست؛ غضروف سالم؛ بدون شکستگی')],
    [L('III', 'III', 'III'), L('Gelenkeinbruch; Crescent-Zeichen/subchondrale Fraktur; Abflachung', 'Articular collapse; crescent sign/subchondral fracture; flattening', 'فروریزش مفصل؛ علامت کرسنت/شکستگی زیرغضروفی؛ صاف‌شدن')],
    [L('IV', 'IV', 'IV'), L('Sekundäre Arthrose', 'Secondary osteoarthritis', 'آرتروز ثانویه')],
  ],
  revisedStages: [
    [L('I', 'I', 'I'), L('Röntgen normal; MRT oder Knochenszintigrafie positiv', 'Normal X-ray; MRI or bone scan positive', 'رادیوگرافی طبیعی؛ MRI یا اسکن استخوان مثبت')],
    [L('II', 'II', 'II'), L('Röntgen abnormal; keine subchondrale oder nekrotische Fraktur und keine Abflachung', 'Abnormal X-ray; no subchondral or necrotic fracture and no flattening', 'رادیوگرافی غیرطبیعی؛ بدون شکستگی زیرغضروفی یا ناحیه نکروتیک و بدون صاف‌شدن')],
    [L('IIIA', 'IIIA', 'IIIA'), L('Fraktur; Femurkopfdepression ≤ 2 mm', 'Fracture; femoral-head depression ≤ 2 mm', 'شکستگی؛ فرورفتگی سر فمور ≤ ۲ میلی‌متر')],
    [L('IIIB', 'IIIB', 'IIIB'), L('Fraktur; Femurkopfdepression > 2 mm', 'Fracture; femoral-head depression > 2 mm', 'شکستگی؛ فرورفتگی سر فمور > ۲ میلی‌متر')],
    [L('IV', 'IV', 'IV'), L('Röntgenzeichen der Arthrose mit Gelenkspaltverschmälerung, Acetabulumveränderung und/oder Gelenkdestruktion', 'Radiographic osteoarthritis with joint-space narrowing, acetabular changes and/or joint destruction', 'نشانه‌های رادیوگرافیک آرتروز همراه کاهش فضای مفصلی، تغییر استابولوم و/یا تخریب مفصل')],
  ],
  imaging: [
    [L('Projektionsradiographie', 'Plain radiography', 'رادیوگرافی ساده'), L('Früh oft unauffällig; später fleckige Transparenzminderung und Sklerosezonen.', 'Often unremarkable early; later patchy increased opacity and areas of sclerosis.', 'در مراحل اولیه اغلب طبیعی؛ سپس کاهش لکه‌ای شفافیت و نواحی اسکلروز.'), L('Eine gelenkflächenparallele subchondrale Aufhellungslinie wird im PDF als Crescent-Zeichen bezeichnet.', 'The PDF calls a subchondral lucent line parallel to the articular surface the crescent sign.', 'PDF خط شفاف زیرغضروفی موازی سطح مفصلی را علامت کرسنت می‌نامد.')],
    [L('MRT · T1', 'MRI · T1', 'MRI · T1'), L('Schmale hypointense Randlinie zwischen Infarktareal und gesundem Fettmark („Randwall“).', 'A thin hypointense rim between the infarcted area and healthy fatty marrow (“rim sign”).', 'خط حاشیه‌ای باریک کم‌سیگنال بین ناحیهٔ انفارکته و مغز استخوان چرب سالم («علامت حاشیه»).'), L('Die PDF nennt keinen konkreten Fall oder Sequenzparameter.', 'The PDF provides no specific case or sequence parameters.', 'PDF کیس مشخص یا پارامتر توالی را ارائه نمی‌کند.')],
    [L('MRT · T2/STIR', 'MRI · T2/STIR', 'MRI · T2/STIR'), L('Double-Line-Zeichen: innen hyperintense, außen hypointense Linie; Knochenmarködem kann begleitend auftreten.', 'Double-line sign: an inner hyperintense and outer hypointense line; marrow oedema may accompany it.', 'علامت خط دوگانه: خط داخلی پرسیگنال و خط خارجی کم‌سیگنال؛ ادم مغز استخوان ممکن است همراه باشد.'), L('Diese Merkmale sind hier als Textangaben der PDF wiedergegeben; eine Bilddemonstration fehlt.', 'These are reported as text findings in the PDF; no image demonstration is provided.', 'این موارد به‌عنوان توضیحات متنی PDF گزارش شده‌اند؛ نمایش تصویری وجود ندارد.')],
    [L('MRT · T1 nach Kontrastmittel', 'MRI · post-contrast T1', 'MRI · T1 پس از تزریق مادهٔ حاجب'), L('Laut PDF kein Enhancement im nekrotischen Areal; die Randzone nimmt Kontrastmittel auf.', 'According to the PDF, the necrotic area does not enhance; the peripheral zone shows enhancement.', 'طبق PDF ناحیهٔ نکروتیک enhancement ندارد؛ ناحیهٔ حاشیه‌ای مادهٔ حاجب می‌گیرد.'), L('Die PDF-Seite enthält kein kontrastverstärktes Fallbild.', 'The PDF page contains no contrast-enhanced case image.', 'صفحهٔ PDF تصویر کیس پس از تزریق ندارد.')],
  ],
  differentials: [
    [L('Knocheninfarkt', 'Bone infarct', 'انفارکت استخوان'), L('Ähnliche Signalcharakteristika; laut PDF in Meta-/Diaphyse ohne Gelenkbeteiligung lokalisiert.', 'Similar signal characteristics; according to the PDF located in the metaphysis/diaphysis without joint involvement.', 'ویژگی‌های سیگنالی مشابه؛ طبق PDF در متافیز/دیافیز و بدون درگیری مفصل قرار دارد.')],
    [L('Osteochondrosis dissecans (OCD)', 'Osteochondritis dissecans (OCD)', 'استئوکندریت دیسکانس (OCD)'), L('Eher fokal/kleinflächig; das PDF nennt jugendliche Betroffene und Prädilektionsstellen wie den medialen Femurkondylus.', 'More focal/small; the PDF lists young patients and typical sites such as the medial femoral condyle.', 'معمولاً کانونی و کوچک؛ PDF بیماران نوجوان و محل‌های مستعد مانند کندیل داخلی فمور را ذکر می‌کند.')],
    [L('Knochenmarködem-Syndrom (BMES)', 'Bone marrow oedema syndrome (BMES)', 'سندرم ادم مغز استخوان (BMES)'), L('Im PDF: diffuses Ödem ohne umschriebene Nekrosezone oder Randwall.', 'In the PDF: diffuse oedema without a circumscribed necrotic zone or rim.', 'طبق PDF: ادم منتشر بدون ناحیهٔ نکروز محدود یا حاشیه.')],
  ],
  check: {
    question: L('Welche Zuordnung entspricht der 2019 revidierten ARCO-Klassifikation?', 'Which pairing matches the 2019 revised ARCO classification?', 'کدام تطبیق با طبقه‌بندی بازنگری‌شدهٔ ARCO در ۲۰۱۹ مطابقت دارد؟'),
    options: [
      L('Stadium I: Röntgen normal, aber MRT oder Knochenszintigrafie positiv', 'Stage I: normal X-ray, but MRI or bone scan positive', 'مرحلهٔ I: رادیوگرافی طبیعی، اما MRI یا اسکن استخوان مثبت'),
      L('Stadium I: normales Röntgenbild und MRT-Ödem allein', 'Stage I: normal X-ray and MRI oedema alone', 'مرحلهٔ I: رادیوگرافی طبیعی و فقط ادم در MRI'),
      L('Stadium III: Sklerose und Zysten ohne Fraktur', 'Stage III: sclerosis and cysts without fracture', 'مرحلهٔ III: اسکلروز و کیست بدون شکستگی'),
    ],
    answer: 0,
    feedback: L('Im revidierten System ist Stadium I bei normalem Röntgenbild durch positives MRT oder Knochenszintigramm definiert; Ödem allein gilt hier nicht als vollständiges Staging-Kriterium.', 'In the revised system, stage I requires a normal X-ray with a positive MRI or bone scan; oedema alone is not taught here as a complete staging criterion.', 'در نظام بازنگری‌شده، مرحلهٔ I با رادیوگرافی طبیعی و MRI یا اسکن استخوان مثبت تعریف می‌شود؛ ادم به‌تنهایی در اینجا معیار کامل مرحله‌بندی نیست.'),
  },
  takeHome: [
    L('Die im PDF definierende Lokalisation der AVN ist die Epiphyse; der Knocheninfarkt wird topographisch davon abgegrenzt.', 'The PDF defines AVN by epiphyseal location; bone infarct is distinguished topographically.', 'در PDF محل تعریف‌کنندهٔ AVN اپی‌فیز است؛ انفارکت استخوان از نظر محل از آن جدا می‌شود.'),
    L('Ein frühes Röntgenbild kann unauffällig sein; das PDF beschreibt das MRT als wichtig für frühe Veränderungen.', 'An early radiograph may be unremarkable; the PDF describes MRI as important for early changes.', 'رادیوگرافی اولیه ممکن است طبیعی باشد؛ PDF MRI را برای تغییرات زودرس مهم توصیف می‌کند.'),
    L('Crescent-Zeichen und subchondrale Fraktur markieren in der Tabelle den Übergang zu Stadium III.', 'In the table, the crescent sign and subchondral fracture mark stage III.', 'در جدول، علامت کرسنت و شکستگی زیرغضروفی با مرحلهٔ III همراه‌اند.'),
  ],
}
