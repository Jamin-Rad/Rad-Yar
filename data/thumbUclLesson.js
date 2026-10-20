const L = (de, en, fa) => ({ de, en, fa })

export const THUMB_UCL_LESSON = {
  id: 'ulnares-kollateralband-daumen',
  title: L('Ulnare Seitenbandverletzung am Daumen', 'Thumb ulnar collateral ligament injury', 'آسیب رباط کولترال اولنار شست'),
  hero: '/msk/thumb-ucl/thumb-ucl-mechanism.svg',
  heroAlt: L('Schematische Darstellung des UCL am MCP-Gelenk des Daumens und einer Stener-Läsion', 'Schematic of the thumb MCP UCL and a Stener lesion', 'نمای شماتیک UCL در MCP شست و ضایعهٔ استنر'),
  scope: L('Die Lektion ordnet Mechanismus, knöchernen Ausriss und die Morphologie einer UCL-Ruptur einschließlich Stener-Läsion. Sie behandelt die Bildgebung, nicht klinische Stabilitätstests oder Therapie.', 'This lesson links the injury mechanism, osseous avulsion, and UCL tear morphology, including a Stener lesion. It focuses on imaging, not clinical stability testing or treatment.', 'این درس سازوکار آسیب، کنده‌شدگی استخوانی و مورفولوژی پارگی UCL از جمله ضایعهٔ استنر را مرور می‌کند. تمرکز بر تصویربرداری است، نه آزمون پایداری بالینی یا درمان.'),
  sections: [
    {
      id: 'verletzungsmuster',
      title: L('Was wird verletzt?', 'What is injured?', 'چه ساختاری آسیب می‌بیند؟'),
      lead: L('Das ulnare Kollateralband stabilisiert die ulnare Seite des MCP-I-Gelenks. Eine gewaltsame Abduktion und Hyperextension des Daumens kann es überdehnen oder zerreißen.', 'The ulnar collateral ligament stabilizes the ulnar side of the thumb MCP joint. Forceful abduction and hyperextension can sprain or tear it.', 'رباط کولترال اولنار سمت اولنار مفصل MCP شست را پایدار می‌کند. ابداکسیون و هایپراکستنشن شدید می‌تواند آن را دچار کشیدگی یا پارگی کند.'),
      paragraphs: [
        L('Der typische Mechanismus ist ein nach radial abgespreizter, überstreckter Daumen, etwa bei einem Sturz mit gehaltenem Skistock. „Skidaumen“ bezeichnet diesen Verletzungskomplex.', 'A typical mechanism is a thumb forced radially away and into hyperextension, for example in a fall while holding a ski pole. “Skier’s thumb” names this injury pattern.', 'سازوکار تیپیک، رانده‌شدن شست به سمت رادیال همراه با هایپراکستنشن است؛ برای مثال هنگام افتادن در حالی که چوب اسکی در دست است. «شست اسکی‌باز» نام این الگوی آسیب است.'),
        L('Eine distale Avulsion an der ulnaren Basis der Grundphalanx ist möglich. Bei Bandrissen können Diskontinuität, verändertes Signal oder eine proximale Retraktion des distalen Bandanteils auffallen.', 'A distal avulsion from the ulnar base of the proximal phalanx may occur. With ligament tears, look for discontinuity, altered signal, or proximal retraction of the distal ligament segment.', 'کنده‌شدگی دیستال از قاعدهٔ اولنار فالانژ پروگزیمال ممکن است رخ دهد. در پارگی رباط، به گسستگی، تغییر سیگنال یا رتراکشن پروگزیمال بخش دیستال رباط توجه کنید.'),
      ],
    },
    {
      id: 'roentgen',
      title: L('Zuerst nach einem knöchernen Ausriss suchen', 'First check for an osseous avulsion', 'ابتدا به‌دنبال کنده‌شدگی استخوانی باشید'),
      lead: L('Auf den Röntgenaufnahmen steht die ulnare Basis der Grundphalanx im Fokus.', 'On radiographs, focus on the ulnar base of the proximal phalanx.', 'در رادیوگرافی، قاعدهٔ اولنار فالانژ پروگزیمال را بررسی کنید.'),
      paragraphs: [
        L('Ein kleines knöchernes Fragment kann eine ligamentäre Avulsion markieren. Beurteile Fragmentursprung und Gelenkbeteiligung in den verfügbaren Projektionen; eine unauffällige knöcherne Kontur schließt eine reine Bandverletzung nicht aus.', 'A small osseous fragment may mark ligamentous avulsion. Assess its origin and joint involvement across the available views; normal-appearing bone does not exclude an isolated ligament injury.', 'قطعهٔ کوچک استخوانی می‌تواند نشانگر کنده‌شدگی رباطی باشد. منشأ قطعه و درگیری مفصل را در نماهای موجود بسنجید؛ طبیعی‌بودن نمای استخوان، آسیب منفرد رباط را رد نمی‌کند.'),
        L('Bei Erwachsenen empfiehlt die ACR für vermutete Handbandverletzungen nach radiologisch sichtbarer akuter Handfraktur oder bei MCP-Fehlstellung ohne Fraktur MRT ohne Kontrastmittel oder Ultraschall als nächste Bildgebung. Außerhalb dieser Szenarien richtet sich die Wahl nach der konkreten Fragestellung und lokaler Expertise.', 'For adults with suspected hand ligament trauma, ACR considers noncontrast MRI or ultrasound usually appropriate next when radiographs show an acute hand fracture or MCP malalignment without fracture. Outside those scenarios, imaging choice depends on the specific question and local expertise.', 'در بزرگسالان با شک به آسیب رباط دست، ACR پس از مشاهدهٔ شکستگی حاد دست در رادیوگرافی یا بدراستایی MCP بدون شکستگی، MRI بدون تزریق یا سونوگرافی را به‌عنوان تصویربرداری بعدی معمولاً مناسب می‌داند. در موقعیت‌های دیگر، انتخاب تصویربرداری به پرسش مشخص و تخصص محلی بستگی دارد.'),
      ],
    },
    {
      id: 'weichteilbildgebung',
      title: L('Ruptur und Stener-Läsion erkennen', 'Recognize a tear and a Stener lesion', 'پارگی و ضایعهٔ استنر را تشخیص دهید'),
      lead: L('Verfolge das UCL bis zu seinem Ansatz an der ulnaren Basis der Grundphalanx und achte darauf, wo ein abgerissener Bandanteil zur Adduktorenaponeurose liegt.', 'Trace the UCL to its insertion at the ulnar base of the proximal phalanx, then assess the position of any torn ligament relative to the adductor aponeurosis.', 'رباط UCL را تا محل اتصالش به قاعدهٔ اولنار فالانژ پروگزیمال دنبال کنید و جای بخش پاره‌شده را نسبت به آپونوروز اداکتور بسنجید.'),
      paragraphs: [
        L('Im MRT sprechen Diskontinuität oder abnormes intraligamentäres Signal für eine Verletzung; Gelenkerguss und Knochenmarködem können Begleitbefunde sein. Der Bandansatz ist häufig distal betroffen.', 'On MRI, discontinuity or abnormal intraligamentous signal supports injury; joint effusion and marrow edema may accompany it. The distal attachment is commonly involved.', 'در MRI، گسستگی یا سیگنال غیرطبیعی داخل رباط مؤید آسیب است؛ افیوژن مفصل و ادم مغز استخوان می‌توانند یافته‌های همراه باشند. محل اتصال دیستال اغلب درگیر است.'),
        L('Bei der Stener-Läsion retrahiert das gerissene UCL nach proximal und verlagert sich oberflächlich über die Aponeurose des M. adductor pollicis. Die Aponeurose liegt damit zwischen Bandstumpf und Ansatz. Im MRT kann der runde, retrahierte Bandstumpf mit der Aponeurose als „Yo-yo-on-a-string“-Zeichen erscheinen.', 'In a Stener lesion, the torn UCL retracts proximally and displaces superficial to the adductor pollicis aponeurosis. The aponeurosis then lies between the ligament stump and its insertion. On MRI, the rounded retracted stump and aponeurosis may form the “yo-yo on a string” appearance.', 'در ضایعهٔ استنر، UCL پاره‌شده به سمت پروگزیمال رتراکته شده و به سطح سطحی آپونوروز عضلهٔ اداکتور پولیسیس جابه‌جا می‌شود؛ آپونوروز میان انتهای رباط و محل اتصال آن قرار می‌گیرد. در MRI، انتهای گرد و رتراکتهٔ رباط همراه آپونوروز ممکن است نمای «یو‌یو روی نخ» ایجاد کند.'),
      ],
      image: '/msk/thumb-ucl/stener-mri-pdf-p23.jpg',
      imageWidth: 665,
      imageHeight: 328,
      imageAlt: L('MRT-Beispiele einer Stener-Läsion in koronarer und axialer PD-Aufnahme; Pfeile markieren Band und Adduktorenaponeurose', 'Coronal and axial PD MRI examples of a Stener lesion; arrows mark the ligament and adductor aponeurosis', 'نمونه‌های MRI ضایعهٔ استنر در نماهای PD کرونال و محوری؛ پیکان‌ها رباط و آپونوروز اداکتور را نشان می‌دهند'),
      imageCaption: L('MSK.pdf, PDF-S.23 (gedruckte S.22), beide MRT-Panels: koronal PD links, axial PD rechts. Gelbe Pfeile: rupturiertes/retrahiertes UCL; rote Pfeile: Adduktorenaponeurose. Die PDF nennt Fall-ID rID 33700, aber auf dieser Seite keinen individuellen Bildbeitragenden. Bild aus der vom Nutzer bereitgestellten und zur Bildnutzung freigegebenen PDF.', 'MSK.pdf, PDF p.23 (printed p.22), both MRI panels: coronal PD left, axial PD right. Yellow arrows: torn/retracted UCL; red arrows: adductor aponeurosis. The PDF gives case ID rID 33700 but no individual image contributor on this page. Image cropped from the user-provided PDF, whose figures the user authorized for use.', 'MSK.pdf، صفحهٔ PDF ۲۳ (چاپی ۲۲)، هر دو پنل MRI: نمای PD کرونال در چپ و محوری در راست. پیکان زرد: UCL پاره و رتراکته؛ پیکان قرمز: آپونوروز اداکتور. شناسهٔ کیس در PDF برابر rID 33700 است، اما مشارکت‌کنندهٔ تصویر در این صفحه مشخص نشده. تصویر از PDF ارائه‌شده توسط کاربر برش خورده و کاربر استفاده از تصاویر آن را مجاز دانسته است.'),
      task: L('In beiden Ebenen liegt der abgerissene UCL-Stumpf oberflächlich zur Adduktorenaponeurose. Welche Beziehung definiert die Stener-Läsion?', 'In both planes, the torn UCL stump lies superficial to the adductor aponeurosis. Which relationship defines a Stener lesion?', 'در هر دو نما، انتهای پاره‌شدهٔ UCL سطحی‌تر از آپونوروز اداکتور قرار دارد. کدام رابطه ضایعهٔ استنر را تعریف می‌کند؟'),
      options: [
        L('Die Aponeurose liegt zwischen retrahiertem Bandstumpf und Ansatz.', 'The aponeurosis lies between the retracted ligament stump and its insertion.', 'آپونوروز بین انتهای رتراکتهٔ رباط و محل اتصال آن قرار دارد.'),
        L('Das UCL bleibt kontinuierlich und signalarm unter der Aponeurose.', 'The UCL remains continuous and low-signal beneath the aponeurosis.', 'UCL زیر آپونوروز پیوسته و کم‌سیگنال باقی می‌ماند.'),
        L('Ein knöchernes Fragment liegt an der radialen Basis der Grundphalanx.', 'An osseous fragment lies at the radial base of the proximal phalanx.', 'قطعهٔ استخوانی در قاعدهٔ رادیال فالانژ پروگزیمال قرار دارد.'),
      ],
      answer: 0,
      feedback: [
        L('Richtig: Die dazwischenliegende Aponeurose kennzeichnet die Stener-Läsion.', 'Correct: interposition of the aponeurosis defines a Stener lesion.', 'درست است: قرارگیری آپونوروز در میان رباط و محل اتصال، ضایعهٔ استنر را تعریف می‌کند.'),
        L('Eine intakte, unter der Aponeurose verlaufende Kontur beschreibt keine Stener-Läsion.', 'An intact ligament beneath the aponeurosis does not describe a Stener lesion.', 'رباط سالم در زیر آپونوروز با ضایعهٔ استنر تطبیق ندارد.'),
        L('Ein Fragment an der radialen Seite entspricht nicht dem typischen ulnaren Ansatz des UCL.', 'A radial-sided fragment does not match the typical ulnar UCL insertion.', 'قطعه در سمت رادیال با محل اتصال تیپیک اولنار UCL تطبیق ندارد.'),
      ],
      source: L('MSK.pdf, PDF-S.22–23; Qamhawi et al., 2021; Melville et al., 2013.', 'MSK.pdf, PDF pp.22–23; Qamhawi et al., 2021; Melville et al., 2013.', 'MSK.pdf، صفحات PDF ۲۲–۲۳؛ Qamhawi و همکاران، ۲۰۲۱؛ Melville و همکاران، ۲۰۱۳.'),
    },
  ],
  summary: [
    L('Das UCL verläuft an der ulnaren Seite des Daumen-MCP-I; die distale Basis der Grundphalanx ist ein wichtiger Ansatzpunkt.', 'The UCL lies on the ulnar side of thumb MCP I; the distal base of the proximal phalanx is an important attachment site.', 'UCL در سمت اولنار MCP-I شست قرار دارد؛ قاعدهٔ دیستال فالانژ پروگزیمال محل اتصال مهمی است.'),
    L('Auf Röntgenbildern nach einer knöchernen Avulsion an der ulnaren Phalangenbasis suchen.', 'On radiographs, look for an osseous avulsion at the ulnar phalangeal base.', 'در رادیوگرافی به‌دنبال کنده‌شدگی استخوانی در قاعدهٔ اولنار فالانژ باشید.'),
    L('MRT oder Ultraschall können bei verbleibendem Verdacht die Bandmorphologie und Verlagerung beurteilen.', 'MRI or ultrasound can assess ligament morphology and displacement when suspicion remains.', 'در صورت تداوم شک، MRI یا سونوگرافی می‌تواند مورفولوژی و جابه‌جایی رباط را بررسی کند.'),
    L('Bei der Stener-Läsion liegt die Adduktorenaponeurose zwischen retrahiertem UCL-Stumpf und Ansatz.', 'In a Stener lesion, the adductor aponeurosis lies between the retracted UCL stump and its insertion.', 'در ضایعهٔ استنر، آپونوروز اداکتور بین انتهای رتراکتهٔ UCL و محل اتصال آن قرار دارد.'),
  ],
  references: [
    { label: L('Qamhawi et al. Diagnostische Genauigkeit von Ultraschall und MRT bei Stener-Läsionen: systematische Übersichtsarbeit und Metaanalyse, 2021.', 'Qamhawi et al. Diagnostic accuracy of ultrasound and MRI for Stener lesions: systematic review and meta-analysis, 2021.', 'Qamhawi و همکاران. دقت تشخیصی سونوگرافی و MRI برای ضایعات استنر: مرور نظام‌مند و متاآنالیز، ۲۰۲۱.'), url: 'https://doi.org/10.1177/1753193421993015' },
    { label: L('Melville et al. Sonographie dislozierter Daumen-UCL-Rupturen: Stener-Läsion, 2013.', 'Melville et al. Ultrasound of displaced thumb UCL tears: the Stener lesion, 2013.', 'Melville و همکاران. سونوگرافی پارگی جابه‌جاشدهٔ UCL شست: ضایعهٔ استنر، ۲۰۱۳.'), url: 'https://pubmed.ncbi.nlm.nih.gov/23001117/' },
    { label: L('ACR Appropriateness Criteria: Acute Hand and Wrist Trauma.', 'ACR Appropriateness Criteria: Acute Hand and Wrist Trauma.', 'معیارهای تناسب ACR: ترومای حاد دست و مچ.'), url: 'https://acsearch.acr.org/docs/69418/Narrative/' },
  ],
}
