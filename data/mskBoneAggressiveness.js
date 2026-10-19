const L = (de, en, fa) => ({ de, en, fa })
export const MSK_BONE_AGGRESSIVENESS_LESSON = {
  id: 'knochentumor-grundlagen',
  source: L('MSK.pdf, PDF S. 73–76; Lodwick et al., Radiology (1980); Caracciolo et al. (2022)', 'MSK.pdf, pp. 73–76; Lodwick et al., Radiology (1980); Caracciolo et al. (2022)', 'MSK.pdf، صفحات ۷۳–۷۶؛ Lodwick و همکاران، Radiology (1980)؛ Caracciolo و همکاران (2022)'),
  heroImage: '/educational/msk-bone-aggressiveness.svg',
  title: L('Aggressivität fokaler Knochenläsionen', 'Aggressiveness of focal bone lesions', 'ارزیابی تهاجمی‌بودن ضایعات کانونی استخوان'),
  alt: L('Schema: solide, lamelläre und spikulierte Periostreaktion sowie Codman-Dreieck', 'Diagram of solid, lamellated and spiculated periosteal reaction and Codman triangle', 'شماتیک واکنش پریوستئال جامد، لایه‌لایه، خاردار و مثلث کادمن'),
  intro: {
    title: L('Muster statt Etikett', 'Describe the pattern first', 'ابتدا الگو را توصیف کنید'),
    text: L('Beurteile den Übergang zwischen Läsion und Knochen, das Destruktionsmuster, die Matrix und die Periostreaktion. Diese Zeichen schätzen biologisches Verhalten ein; sie stellen allein keine Histologie oder Diagnose dar.', 'Assess the lesion–bone transition, destruction pattern, matrix and periosteal reaction. These features estimate biological behaviour; they do not establish histology or diagnosis by themselves.', 'مرز ضایعه و استخوان، الگوی تخریب، ماتریکس و واکنش پریوستئال را ارزیابی کنید. این نشانه‌ها رفتار زیستی را تخمین می‌زنند؛ به‌تنهایی بافت‌شناسی یا تشخیص قطعی نیستند.'),
  },
  chapters: [
    {
      id: 'periosteum', icon: '⌁', title: L('Wie reagiert das Periost?', 'How does the periosteum react?', 'پریوست چگونه واکنش نشان می‌دهد؟'), source: L('MSK.pdf, S. 73–74; Lee et al., Radiology 1969', 'MSK.pdf, pp. 73–74; Lee et al., Radiology 1969', 'MSK.pdf، صفحات ۷۳–۷۴؛ Lee و همکاران، Radiology 1969'),
      lead: L('Eine solide Reaktion entsteht bei langsamerem Verlauf; unterbrochene, mehrschichtige oder spikulierte Muster signalisieren eine aggressivere Reaktion, sind aber nicht tumorspezifisch.', 'A solid response is associated with slower processes; interrupted, multilamellar or spiculated patterns indicate a more aggressive response but are not tumour-specific.', 'واکنش جامد بیشتر با روند کندتر دیده می‌شود؛ الگوهای منقطع، چندلایه یا خاردار واکنش تهاجمی‌تری را مطرح می‌کنند، اما اختصاصی تومور نیستند.'),
      rows: [
        [L('Solide','Solid','جامد'), L('Glatt und kontinuierlich; kann bei Heilung, chronischer Infektion oder benignen Läsionen auftreten.','Smooth and continuous; may occur with healing, chronic infection or benign lesions.','صاف و پیوسته؛ ممکن است در ترمیم، عفونت مزمن یا ضایعات خوش‌خیم دیده شود.')],
        [L('Lamellär / Zwiebelschale','Lamellated / onion-skin','لایه‌لایه / پیازی'), L('Mehrere Schichten; aggressives Muster, aber Differentialdiagnose einschließlich Infektion beachten.','Multiple layers; an aggressive pattern, but include infection in the differential.','چندین لایه؛ الگویی تهاجمی است، اما عفونت را هم در تشخیص افتراقی لحاظ کنید.')],
        [L('Spikuliert / Sunburst','Spiculated / sunburst','خاردار / آفتاب‌تابان'), L('Radiäre Knochenneubildung; kann bei raschem aggressivem Prozess auftreten.','Radiating new bone; can occur with a rapidly aggressive process.','استخوان‌سازی شعاعی؛ ممکن است در روند تهاجمی سریع رخ دهد.')],
        [L('Codman-Dreieck','Codman triangle','مثلث کادمن'), L('Abgehobenes Periost mit randständigem dreieckigem Rest der Verknöcherung.','Elevated periosteum with a triangular remnant of peripheral ossification.','بلندشدن پریوست با باقی‌ماندن استخوان‌سازی مثلثی در حاشیه.')],
      ],
      note: L('Eine aggressive Periostreaktion ist ein Dringlichkeitssignal für vollständige Charakterisierung, keine spezifische Tumordiagnose.','An aggressive periosteal reaction signals the need for complete characterisation; it is not a specific tumour diagnosis.','واکنش تهاجمی پریوستئال نشانه نیاز به مشخصه‌یابی کامل است، نه تشخیص اختصاصی تومور.'),
    },
    {
      id: 'matrix', icon: '◈', title: L('Welche Matrix wird mineralisiert?', 'Which matrix is mineralising?', 'کدام ماتریکس معدنی می‌شود؟'), source: L('MSK.pdf, S. 74–75', 'MSK.pdf, pp. 74–75', 'MSK.pdf، صفحات ۷۴–۷۵'),
      lead: L('Die Mineralisationsform kann den Gewebeursprung nahelegen. Zusammen mit Alter, Lokalisation und Randzeichen ist sie ein Baustein der Einordnung.', 'The mineralisation pattern can suggest tissue origin. It is one part of interpretation alongside age, location and margin features.', 'الگوی معدنی‌شدن می‌تواند منشأ بافتی را مطرح کند و در کنار سن، محل و حاشیه ضایعه بخشی از ارزیابی است.'),
      rows: [
        [L('Osteoid','Osteoid','استئوئید'), L('Wolkig-flockige Dichte oder Elfenbeinsklerose; PDF-Beispiele: Osteosarkom, Osteoidosteom.','Cloud-like/fluffy density or ivory sclerosis; PDF examples: osteosarcoma, osteoid osteoma.','تراکم ابری/پنبه‌ای یا اسکلروز عاجی؛ مثال‌های PDF: استئوسارکوم و استئوئید استئوما.')],
        [L('Chondroid','Chondroid','کندروئید'), L('Ringe und Bögen, Popcorn- oder punktförmige Verkalkung; Enchondrom und Chondrosarkom sind wichtige Kontexte.','Rings-and-arcs, popcorn or stippled calcification; enchondroma and chondrosarcoma are relevant contexts.','کلسیفیکاسیون حلقه و قوس، پاپ‌کورن یا نقطه‌ای؛ انکندروم و کندروسارکوم زمینه‌های مهم هستند.')],
        [L('Fibros','Fibrous','فیبروز'), L('Milchglasartige Matrix; klassisch bei fibröser Dysplasie.','Ground-glass matrix; classically seen in fibrous dysplasia.','ماتریکس شیشه‌مات؛ به‌طور کلاسیک در دیسپلازی فیبرو دیده می‌شود.')],
      ],
      note: L('Matrixmuster sind Hinweise, keine eigenständigen Diagnosen. Endosteales Scalloping, Kortikalisdurchbruch und extraossäre Ausdehnung erhöhen die Sorge und gehören in die Beschreibung.','Matrix patterns are clues, not diagnoses. Endosteal scalloping, cortical breach and extraosseous extension raise concern and belong in the description.','الگوهای ماتریکس سرنخ هستند، نه تشخیص مستقل. فرسایش اندوستئال، شکستگی کورتکس و گسترش خارج‌استخوانی نگرانی را افزایش می‌دهند و باید توصیف شوند.'),
    },
    {
      id: 'lodwick', icon: '▦', title: L('Wie sieht die Osteolyse aus?', 'What is the pattern of osteolysis?', 'الگوی استئولیز چگونه است؟'), source: L('MSK.pdf, S. 76; Lodwick et al., Radiology 1980', 'MSK.pdf, p. 76; Lodwick et al., Radiology 1980', 'MSK.pdf، صفحه ۷۶؛ Lodwick و همکاران، Radiology 1980'),
      lead: L('Die Lodwick-Grundmuster ordnen die räumliche Destruktion nach ihrer vermuteten Wachstumsgeschwindigkeit. Sie ersetzen keine Gesamtbeurteilung.', 'Basic Lodwick patterns classify the spatial pattern of destruction by inferred growth rate. They do not replace the overall assessment.', 'الگوهای پایه لودویک تخریب فضایی را بر اساس سرعت رشد احتمالی طبقه‌بندی می‌کنند، اما جایگزین ارزیابی کلی نیستند.'),
      rows: [
        [L('I · geographisch','I · geographic','I · جغرافیایی'), L('Klar begrenzt; Ia mit, Ib ohne Sklerosesaum, Ic unschärfer ohne Saum.','Well defined; Ia with, Ib without a sclerotic rim, Ic less sharply defined without a rim.','مرزبندی واضح؛ Ia با حاشیه اسکلروتیک، Ib بدون آن و Ic با مرز کمتر واضح و بدون حاشیه.')],
        [L('II · mottenfraßähnlich','II · moth-eaten','II · پروانه‌خورده'), L('Mehrere unterschiedlich große, teilweise konfluierende Herde; aggressiveres Muster.','Multiple variably sized, partly confluent areas; a more aggressive pattern.','چندین کانون با اندازه‌های مختلف که گاهی به هم می‌پیوندند؛ الگویی تهاجمی‌تر.')],
        [L('III · permeativ','III · permeative','III · نفوذی'), L('Viele kleine, schlecht abgrenzbare Herde oder Streifen; hochaggressives Muster.','Numerous tiny, poorly defined foci or streaks; a highly aggressive pattern.','کانون‌ها یا نوارهای متعدد کوچک و با مرز نامشخص؛ الگویی بسیار تهاجمی.')],
      ],
      note: L('Die vollständige originale Lodwick-Systematik umfasst weitere Merkmale und ihre Interpretation kann zwischen Lesenden variieren. Bei Verdacht auf Malignität nicht anhand dieses Schemas allein beruhigen oder diagnostizieren.','The full original Lodwick system includes additional features and interpretation can vary between readers. Do not dismiss or diagnose malignancy from this schema alone.','سامانه اصلی لودویک ویژگی‌های بیشتری دارد و تفسیر آن ممکن است بین خوانندگان متفاوت باشد. بر پایه این شماتیک به‌تنهایی بدخیمی را رد یا تشخیص ندهید.'),
    },
  ],
  references: [
    { label: L('Lodwick et al. Wachstumsmuster fokaler Knochenläsionen im Röntgen (Radiology, 1980)', 'Lodwick et al. Growth rates of focal bone lesions on radiographs (Radiology, 1980)', 'Lodwick و همکاران. الگوهای رشد ضایعات کانونی استخوان در رادیوگرافی (Radiology، ۱۹۸۰)'), url: 'https://pubmed.ncbi.nlm.nih.gov/6928321/' },
    { label: L('Lodwick-Klassifikation: Entscheidungsbaum und Grenzen (2022)', 'Lodwick classification: decision tree and limitations (2022)', 'طبقه‌بندی Lodwick: درخت تصمیم و محدودیت‌ها (۲۰۲۲)'), url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8854272/' },
    { label: L('Lee et al. Periostreaktion bei Metastasen und primären Knochensarkomen (Radiology, 1969)', 'Lee et al. Periosteal response in metastases and primary bone sarcomas (Radiology, 1969)', 'Lee و همکاران. واکنش پریوستئال در متاستاز و سارکوم اولیه استخوان (Radiology، ۱۹۶۹)'), url: 'https://pubs.rsna.org/doi/10.1148/92.4.705' },
  ],
  case: {
    title: L('Mini-Fall: Was folgt aus dem Muster?', 'Quick case: What follows from the pattern?', 'تمرین کوتاه: از این الگو چه نتیجه‌ای می‌گیرید؟'),
    prompt: L('Eine Läsion zeigt mottenfraßähnliche Osteolyse und unterbrochene Periostreaktion. Welche Aussage passt?', 'A lesion has moth-eaten osteolysis and interrupted periosteal reaction. Which statement fits?', 'ضایعه استئولیز پروانه‌خورده و واکنش منقطع پریوستئال دارد. کدام گزاره مناسب است؟'),
    options: [L('Aggressives Muster; Ausdehnung charakterisieren und klinisch weiter abklären.','Aggressive pattern; characterise extent and pursue clinical work-up.','الگوی تهاجمی؛ وسعت را مشخص و ارزیابی بالینی را پیگیری کنید.'), L('Ein bestimmter maligner Tumor ist damit bewiesen.','A specific malignant tumour is proven.','وجود یک تومور بدخیم مشخص ثابت شده است.')],
    answerIndex: 0,
    feedbackCorrect: L('Richtig. Das Muster schätzt Aggressivität ein, bestimmt aber nicht allein die Histologie.','Correct. The pattern estimates aggressiveness but does not determine histology by itself.','درست است. الگو تهاجمی‌بودن را تخمین می‌زند اما به‌تنهایی بافت‌شناسی را مشخص نمی‌کند.'),
    feedbackIncorrect: L('Nicht ganz. Aggressive Zeichen sind nicht tumorspezifisch; beschreibe sie und kläre die Läsion vollständig ab.','Not quite. Aggressive signs are not tumour-specific; describe them and characterise the lesion fully.','نه کاملاً. نشانه‌های تهاجمی اختصاصی تومور نیستند؛ آن‌ها را توصیف و ضایعه را کامل بررسی کنید.'),
  },
  notice: L('Entwurf aus MSK.pdf S. 73–76. Klassifikationszeichen sind radiologische Heuristiken und keine Histologie. Tumorboard-/Biopsieentscheidungen gehören nicht zu diesem Lernentwurf.', 'Draft based on MSK.pdf pp. 73–76. Classification signs are imaging heuristics, not histology. Tumour-board and biopsy decisions are outside this draft.', 'پیش‌نویس بر اساس صفحات ۷۳ تا ۷۶ MSK.pdf است. نشانه‌های طبقه‌بندی، راهنمای تصویربرداری هستند نه بافت‌شناسی. تصمیم‌گیری بیوپسی یا توموربورد در دامنه این پیش‌نویس نیست.'),
}
