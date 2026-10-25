const L = (de, en, fa) => ({ de, en, fa })

export const MSK_OSTEOCHONDROM_LESSON = {
  id: 'osteochondrom',
  title: L('Osteochondrom', 'Osteochondroma', 'استئوکندروم'),
  hero: '/educational/osteochondrom/hero.svg',
  sourceNote: L(
    'Begrenzter Lehrentwurf nach MSK.pdf, PDF S. 84–86 (Druckseiten 83–85). Prozentangaben zur Entartung aus dem PDF werden wegen abweichender Schätzungen in der Literatur nicht als feste individuelle Risiken wiederholt.',
    'Bounded teaching draft based on MSK.pdf, PDF pp. 84–86 (printed pp. 83–85). The PDF’s transformation percentages are not repeated as fixed individual risks because estimates vary across the literature.',
    'پیش‌نویس آموزشی محدود بر پایهٔ MSK.pdf، صفحات PDF ۸۴ تا ۸۶ (صفحات چاپی ۸۳ تا ۸۵). درصدهای تبدیل بدخیم از PDF به‌عنوان خطر قطعی فردی تکرار نشده‌اند، چون برآوردها در منابع متفاوت‌اند.'
  ),
  sections: [
    {
      id: 'pattern', icon: 'clinical',
      title: L('Welches Grundmuster passt?', 'What is the defining pattern?', 'الگوی اصلی چیست؟'),
      lead: L(
        'Ein Osteochondrom ist ein knorpelüberzogener knöcherner Auswuchs, meist an einer Metaphyse während des Wachstums. Entscheidend ist die Kontinuität von Kortikalis und Markraum mit dem Ursprungsknochen.',
        'An osteochondroma is a cartilage-capped bony projection, usually metaphyseal and arising during growth. The defining imaging feature is continuity of both cortex and medullary canal with the parent bone.',
        'استئوکندروم زائده‌ای استخوانی با پوشش غضروفی است که معمولاً در متافیز و هنگام رشد ایجاد می‌شود. ویژگی تعیین‌کنندهٔ تصویربرداری، پیوستگی هم کورتکس و هم کانال مدولاری ضایعه با استخوان مادر است.'
      ),
      rows: [
        [L('Lokalisation', 'Location', 'محل'), L('Bevorzugt Metaphysen langer Röhrenknochen, besonders distal am Femur und proximal an Tibia und Humerus; der Auswuchs weist typischerweise von der Wachstumsfuge weg.', 'Favours metaphyses of long bones, especially the distal femur and proximal tibia or humerus; the projection typically points away from the growth plate.', 'بیشتر در متافیز استخوان‌های بلند، به‌ویژه انتهای دیستال فمور و متافیز پروگزیمال تیبیا یا هومروس دیده می‌شود؛ زائده معمولاً از صفحهٔ رشد دور می‌شود.')],
        [L('Form', 'Shape', 'شکل'), L('Gestielt (pedunkuliert) oder breitbasig (sessil). Die Form allein ersetzt nicht den Nachweis der Kontinuität.', 'Pedunculated or sessile. Shape alone does not replace demonstrating continuity.', 'پایه‌دار یا پهن‌پایه است. شکل به‌تنهایی جای اثبات پیوستگی را نمی‌گیرد.')],
        [L('Wachstum', 'Growth', 'رشد'), L('Entsteht meist im Kindes- und Jugendalter; das Wachstum endet gewöhnlich mit der Skelettreife. Wachstum oder neue Schmerzen danach sind Warnzeichen.', 'Usually develops in childhood or adolescence; growth usually stops at skeletal maturity. Continued growth or new pain afterward is a warning sign.', 'معمولاً در کودکی یا نوجوانی ایجاد می‌شود و رشد آن عموماً با بلوغ اسکلتی متوقف می‌شود. رشد ادامه‌دار یا درد تازه پس از آن علامت هشدار است.')],
      ],
      imageAlt: L('Zwei Röntgenansichten eines Osteochondroms am distalen Femur aus Radiopaedia rID 8434.', 'Two radiographic views of a distal femoral osteochondroma from Radiopaedia rID 8434.', 'دو نمای رادیوگرافی از استئوکندروم فمور دیستال، از Radiopaedia با شناسهٔ ۸۴۳۴.'),
      imageCaption: L('Radiopaedia-Fall rID 8434 (Frank Gaillard), aus MSK.pdf S. 85. Verfolge den Auswuchs bis zur Kontinuität mit dem Femur; die Abbildung zeigt nur ausgewählte Ansichten.', 'Radiopaedia case rID 8434 (Frank Gaillard), reproduced in MSK.pdf p. 85. Trace the projection to its continuity with the femur; only selected views are shown.', 'کیس Radiopaedia با شناسهٔ ۸۴۳۴ (Frank Gaillard)، بازنشرشده در MSK.pdf صفحهٔ ۸۵. پیوستگی زائده با فمور را دنبال کنید؛ فقط نماهای انتخابی نشان داده شده‌اند.'),
    },
    {
      id: 'cartilage-cap', icon: 'imaging',
      title: L('Wann braucht die Knorpelkappe Aufmerksamkeit?', 'When does the cartilage cap need attention?', 'چه زمانی کلاهک غضروفی اهمیت هشداردهنده دارد؟'),
      lead: L('Die Röntgenaufnahme zeigt die knöcherne Kontinuität; im MRT erscheint die Knorpelkappe typischerweise T2-hyperintens und lässt sich besser beurteilen.', 'Radiographs demonstrate osseous continuity; MRI depicts the cartilage cap as T2 hyperintense and is better suited to assess it.', 'رادیوگرافی پیوستگی استخوانی را نشان می‌دهد؛ کلاهک غضروفی معمولاً در MRI با T2 روشن است و در این روش بهتر ارزیابی می‌شود.'),
      rows: [
        [L('Messung', 'Measurement', 'اندازه‌گیری'), L('Kappendicke senkrecht zur Knorpeloberfläche messen. Das PDF nennt >2 cm, besonders bei Erwachsenen; Bernard et al. untersuchten 101 pathologisch bestätigte Läsionen (67 benigne, 34 sekundäre Chondrosarkome) und fanden ≥2 cm als Warnschwelle mit hoher Sensitivität und Spezifität. Bei Kindern kann die Kappe physiologisch dicker sein. Der Wert ist ein Warnhinweis, kein alleiniger Malignitätsnachweis und keine universelle Regel.', 'Measure perpendicular to the cartilage surface. The PDF flags >2 cm, particularly in adults; Bernard et al. studied 101 pathologically confirmed lesions (67 benign, 34 secondary chondrosarcomas) and found ≥2 cm to be a warning threshold with high sensitivity and specificity. The cap can be physiologically thicker in children. This is a warning sign, not proof of malignancy or a universal rule.', 'ضخامت را عمود بر سطح غضروف اندازه بگیرید. PDF بیش از ۲ سانتی‌متر را به‌ویژه در بزرگسالان مشکوک می‌داند؛ Bernard و همکاران ۱۰۱ ضایعهٔ تأییدشده با آسیب‌شناسی را بررسی کردند (۶۷ خوش‌خیم و ۳۴ کندروسارکوم ثانویه) و ≥۲ سانتی‌متر را آستانهٔ هشدار با حساسیت و ویژگی بالا یافتند. در کودکان کلاهک می‌تواند به‌طور طبیعی ضخیم‌تر باشد. این مقدار علامت هشدار است، نه اثبات بدخیمی یا قاعده‌ای جهان‌شمول.')],
        [L('Weitere Warnzeichen', 'Other warning signs', 'سایر نشانه‌های هشدار'), L('Neues Wachstum nach Skelettreife, neue oder zunehmende Schmerzen und atypische Morphologie zusammen mit der Kappendicke einordnen.', 'Interpret new growth after skeletal maturity, new or increasing pain, and atypical morphology together with cap thickness.', 'رشد تازه پس از بلوغ اسکلتی، درد تازه یا فزاینده و مورفولوژی غیرمعمول را همراه با ضخامت کلاهک تفسیر کنید.')],
      ],
      imageAlt: L('Zwei ausgewählte MRT-Ebenen eines Osteochondroms aus dem Radiopaedia-Fall rID 79580; die Quellseite nennt keine Sequenzen.', 'Two selected MRI planes from Radiopaedia case rID 79580; the source page does not identify the sequences.', 'دو برش انتخابی MRI از کیس Radiopaedia با شناسهٔ ۷۹۵۸۰؛ صفحهٔ منبع نام سکانس‌ها را مشخص نکرده است.'),
      imageCaption: L('Yusra Sheikh und Dai Roberts, Radiopaedia rID 79580, aus MSK.pdf S. 85. Die Sequenzen sind auf der Quellseite nicht beschriftet; daher wird kein spezifisches Signalzeichen an diesen Bildern behauptet. Messung und klinische Einordnung erfordern die vollständige Untersuchung.', 'Yusra Sheikh and Dai Roberts, Radiopaedia case rID 79580, from MSK.pdf p. 85. The source page does not label the sequences, so no specific signal sign is claimed from these images. Measurement and clinical interpretation require the full study.', 'Yusra Sheikh و Dai Roberts، کیس Radiopaedia با شناسهٔ ۷۹۵۸۰، از MSK.pdf صفحهٔ ۸۵. سکانس‌ها در صفحهٔ منبع برچسب ندارند؛ بنابراین از این تصاویر نشانهٔ سیگنال مشخصی ادعا نمی‌شود. اندازه‌گیری و تفسیر بالینی به بررسی کامل مطالعه نیاز دارد.'),
      note: L('Das PDF nennt multiple hereditäre Exostosen als autosomal-dominante Sonderform mit höherem Entartungsrisiko. Die Prozentwerte unterscheiden sich zwischen Quellen; sie werden hier nicht als feste Individualprognose angegeben.', 'The PDF describes hereditary multiple exostoses as an autosomal dominant form with increased transformation risk. Published percentages vary, so no fixed individual prognosis is given here.', 'PDF، اگزواستوزهای متعدد ارثی را شکلی اتوزومال غالب با خطر بیشتر تبدیل بدخیم توصیف می‌کند. درصدها میان منابع متفاوت‌اند؛ بنابراین اینجا به‌عنوان پیش‌آگهی قطعی فردی بیان نمی‌شوند.'),
    },
    {
      id: 'pitfalls', icon: 'differential',
      title: L('Welche Befunde sehen ähnlich aus?', 'Which findings can look similar?', 'چه یافته‌هایی ممکن است شبیه باشند؟'),
      lead: L('Ohne Kontinuität zum Markraum ist eine andere Oberflächenläsion wahrscheinlicher; die Lage hilft bei der Einordnung.', 'Without continuity with the medullary canal, another surface lesion is more likely; location helps narrow the differential.', 'اگر پیوستگی با کانال مدولاری وجود نداشته باشد، ضایعهٔ سطحی دیگری محتمل‌تر است؛ محل به افتراق کمک می‌کند.'),
      rows: [
        [L('Parosteales Osteosarkom', 'Parosteal osteosarcoma', 'استئوسارکوم پارواستئال'), L('Liegt an der Kortikalis, aber ohne Markraumkontinuität.', 'Arises along the cortex but lacks medullary continuity.', 'روی کورتکس قرار می‌گیرد، اما پیوستگی مدولاری ندارد.')],
        [L('Nora-Läsion', 'Nora lesion', 'ضایعهٔ نورا'), L('Floride reaktive periostale Proliferation, meist an Händen oder Füßen, ohne Markraumkontinuität.', 'Florid reactive periosteal proliferation, usually in hands or feet, without medullary continuity.', 'تکثیر واکنشی برجستهٔ پریوست، معمولاً در دست یا پا و بدون پیوستگی مدولاری.')],
        [L('Subunguale Exostose', 'Subungual exostosis', 'اگزواستوز زیرناخنی'), L('Spezielle Exostose unter dem Nagelbett, meist an der Großzehe.', 'A specific exostosis beneath the nail bed, usually at the great toe.', 'اگزواستوز خاص زیر بستر ناخن، معمولاً در شست پا.')],
      ],
      note: L('Komplikationen entstehen durch mechanische Reizung oder Druck auf Nachbarstrukturen, Bursa-Bildung oder Fraktur; eine Poplitealarterien-Kompression kann ein Pseudoaneurysma verursachen.', 'Complications include mechanical irritation or compression of adjacent structures, bursal formation, and fracture; popliteal artery compression can cause a pseudoaneurysm.', 'عوارض شامل تحریک یا فشار مکانیکی بر ساختارهای مجاور، تشکیل بورس و شکستگی است؛ فشار بر شریان پوپلیته می‌تواند پسودوآنوریسم ایجاد کند.'),
    },
  ],
  check: {
    title: L('Kontinuität als Entscheidung nutzen', 'Use continuity to make the call', 'از پیوستگی برای تصمیم‌گیری استفاده کنید'),
    prompt: L('Bei einer metaphysären knöchernen Ausziehung sind Kortikalis und Markraum kontinuierlich mit dem Ursprungsknochen verbunden. Welche Aussage passt am besten?', 'A metaphyseal bony projection shows continuity of both cortex and medullary canal with the parent bone. Which statement fits best?', 'در یک زائدهٔ استخوانی متافیزی، هم کورتکس و هم کانال مدولاری با استخوان مادر پیوسته‌اند. کدام گزاره مناسب‌تر است؟'),
    options: [
      L('Das Muster spricht für ein Osteochondrom; Wachstum weg von der Fuge und Knorpelkappe im MRT prüfen.', 'The pattern supports osteochondroma; assess growth away from the physis and the cartilage cap on MRI.', 'این الگو به نفع استئوکندروم است؛ جهت رشد دور از صفحهٔ رشد و کلاهک غضروفی را در MRI ارزیابی کنید.'),
      L('Eine Markraumkontinuität spricht für ein parosteales Osteosarkom.', 'Medullary continuity supports parosteal osteosarcoma.', 'پیوستگی مدولاری به نفع استئوسارکوم پارواستئال است.'),
      L('Die Kontinuität beweist eine maligne Entartung.', 'Continuity proves malignant transformation.', 'پیوستگی تبدیل بدخیم را ثابت می‌کند.'),
    ],
    answer: 0,
    explanation: L('Richtig. Die Kontinuität von Kortikalis und Markraum mit dem Ursprungsknochen ist das zentrale radiologische Merkmal des Osteochondroms. Sie beweist keine Malignität; dafür müssen unter anderem Wachstum, Symptome und Knorpelkappe beurteilt werden.', 'Correct. Continuity of cortex and medullary canal with the parent bone is the central radiographic feature of osteochondroma. It does not prove malignancy; growth, symptoms and cartilage cap also need assessment.', 'درست است. پیوستگی کورتکس و کانال مدولاری با استخوان مادر ویژگی مرکزی رادیوگرافیک استئوکندروم است. این یافته بدخیمی را ثابت نمی‌کند؛ رشد، علائم و کلاهک غضروفی نیز باید ارزیابی شوند.'),
    retry: L('Prüfe, was Kontinuität aussagt und welche zusätzliche Frage eine mögliche Entartung betrifft.', 'Review what continuity establishes and what additional question concerns possible transformation.', 'دوباره بررسی کنید که پیوستگی چه چیزی را نشان می‌دهد و چه پرسش دیگری به احتمال تبدیل بدخیم مربوط است.'),
  },
  summary: [
    L('Kortikalis- und Markraumkontinuität mit dem Ursprungsknochen aktiv suchen.', 'Actively look for cortical and medullary continuity with the parent bone.', 'پیوستگی کورتکس و کانال مدولاری با استخوان مادر را فعالانه بررسی کنید.'),
    L('Die Knorpelkappe im MRT messen; ≥2 cm ist ein Warnhinweis, kein alleiniger Beweis und keine universelle Regel.', 'Measure the cartilage cap on MRI; ≥2 cm is a warning sign, not proof by itself or a universal rule.', 'کلاهک غضروفی را در MRI اندازه بگیرید؛ ≥۲ سانتی‌متر علامت هشدار است، نه اثبات به‌تنهایی یا قاعده‌ای جهان‌شمول.'),
    L('Neues Wachstum oder neue Schmerzen nach Skelettreife ernst nehmen.', 'Take new growth or pain after skeletal maturity seriously.', 'رشد یا درد جدید پس از بلوغ اسکلتی را جدی بگیرید.'),
  ],
  references: [
    { tag: 'MSK.pdf · pp. 84–86', title: L('Nutzerquelle: Osteochondrom, Bildgebung, Differenzialdiagnosen und Komplikationen', 'User source: osteochondroma, imaging, differential and complications', 'منبع کاربر: استئوکندروم، تصویربرداری، افتراق و عوارض'), citation: L('PDF S. 84–86; Druck S. 83–85. Radiopaedia-Bildbeiträge als Ausschnitte übernommen; alle Bildauswahlen sind im Text einzeln ausgewiesen.', 'PDF pp. 84–86; printed pp. 83–85. Radiopaedia figures reproduced as crops; each image selection is identified in its caption.', 'صفحات PDF ۸۴ تا ۸۶؛ صفحات چاپی ۸۳ تا ۸۵. تصاویر Radiopaedia به‌صورت برش استفاده شده‌اند؛ هر انتخاب تصویر در توضیح آن مشخص شده است.') },
    { tag: 'Radiology · 2010', title: L('Bernard et al.: standardisierte Messung der Knorpelkappe', 'Bernard et al.: standardized cartilage-cap measurement', 'Bernard و همکاران: اندازه‌گیری استاندارد کلاهک غضروفی'), href: 'https://pubmed.ncbi.nlm.nih.gov/20392983/', citation: 'Radiology. 2010;255(3):857–865. DOI: 10.1148/radiol.10082120. Retrospective validation: 67 benign osteochondromas and 34 secondary chondrosarcomas.' },
    { tag: 'Radiopaedia · rID 8434', title: L('Frank Gaillard: distales femorales Osteochondrom im Röntgen', 'Frank Gaillard: distal femoral osteochondroma on radiographs', 'Frank Gaillard: استئوکندروم فمور دیستال در رادیوگرافی'), href: 'https://doi.org/10.53347/rID-8434', citation: 'Frank Gaillard, Radiopaedia case rID 8434; cropped from MSK.pdf, p. 85; CC BY-NC-SA 3.0.' },
    { tag: 'Radiopaedia · rID 79580', title: L('Yusra Sheikh und Dai Roberts: MRT des Osteochondroms', 'Yusra Sheikh and Dai Roberts: MRI of osteochondroma', 'Yusra Sheikh و Dai Roberts: MRI استئوکندروم'), href: 'https://doi.org/10.53347/rID-79580', citation: 'Radiopaedia case rID 79580; cropped from MSK.pdf, p. 85; CC BY-NC-SA 3.0.' },
  ],
}
