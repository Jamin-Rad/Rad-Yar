const L = (de, en, fa) => ({ de, en, fa })

export const WIRBELMETASTASEN_QUESTIONS = ['de', 'en', 'fa'].map(lang => ({
  id: `wirbelmetastasen-${lang}-ivory-vs-destructive`,
  fach: 'msk',
  tags: ['wirbelmetastasen'],
  source: 'Wirbelsäule.pdf, PDF pp.21–22 (printed pp.20–21); lesson source ledger: spinale-tumoren-grundlagen-p21-p22.md',
  question: L('Welche Aussage unterscheidet die PDF-Beispiele korrekt?', 'Which statement correctly distinguishes the PDF examples?', 'کدام گزاره نمونه‌های PDF را به‌درستی از هم متمایز می‌کند؟')[lang],
  options: [
    L('Ivory-Vertebra: einzelne diffuse Wirbelkörpersklerose bei erhaltener Größe/Kontur; extraduraler Metastasenhinweis: mögliche Wirbelkörperdestruktion mit möglicher epiduraler Kompression.', 'Ivory vertebra: single diffuse vertebral-body sclerosis with preserved size/contour; extradural metastatic pattern: possible vertebral-body destruction with possible epidural compression.', 'مهرهٔ عاجی: اسکلروز منتشر یک جسم مهره با اندازه و حاشیهٔ حفظ‌شده؛ الگوی متاستاز خارج‌دورال: تخریب احتمالی جسم مهره با امکان فشردگی اپیدورال.')[lang],
    L('Beide Begriffe bezeichnen ausschließlich eine intramedulläre Raumforderung.', 'Both terms refer exclusively to an intramedullary mass.', 'هر دو اصطلاح فقط به توده‌ای داخل‌مدولاری اشاره دارند.')[lang],
    L('Eine Ivory-Vertebra beweist ohne Differenzialdiagnose eine Prostatametastase.', 'An ivory vertebra proves a prostate metastasis without a differential diagnosis.', 'مهرهٔ عاجی بدون تشخیص افتراقی، متاستاز پروستات را ثابت می‌کند.')[lang],
    L('Eine extradural gelegene Metastase liegt definitionsgemäß innerhalb des Myelons.', 'An extradural metastasis is, by definition, within the spinal cord.', 'متاستاز خارج‌دورال بنا به تعریف درون طناب نخاعی قرار دارد.')[lang],
  ].map((text, index) => ({ id: String.fromCharCode(65 + index), text })),
  correct: 'A',
  explanation: L('Auf S. 21 beschreibt die PDF eine diffuse Wirbelkörpersklerose bei erhaltener Kontur; S. 22 ordnet die Metastase extradural ein und nennt Wirbelkörperdestruktion sowie mögliche epidurale Kompression. Das Sklerosemuster ist nicht spezifisch.', 'On p.21, the PDF describes diffuse vertebral-body sclerosis with preserved contour; p.22 places metastasis in the extradural compartment and notes vertebral-body destruction and possible epidural compression. The sclerotic pattern is not specific.', 'در صفحهٔ ۲۱، PDF اسکلروز منتشر جسم مهره با حاشیهٔ حفظ‌شده را توصیف می‌کند؛ صفحهٔ ۲۲ متاستاز را در کمپارتمان خارج‌دورال قرار می‌دهد و از تخریب جسم مهره و احتمال فشردگی اپیدورال می‌گوید. الگوی اسکلروز اختصاصی نیست.')[lang],
  wrongExplanations: {
    B: L('Die Ivory-Vertebra betrifft den Wirbelkörper; intramedullär bedeutet innerhalb des Myelons.', 'Ivory vertebra concerns the vertebral body; intramedullary means within the spinal cord.', 'مهرهٔ عاجی مربوط به جسم مهره است؛ داخل‌مدولاری یعنی درون طناب نخاعی.' )[lang],
    C: L('Das Erscheinungsbild ist nicht spezifisch; die PDF nennt auch Paget-Erkrankung und Lymphom als Differenziale.', 'The appearance is not specific; the PDF also lists Paget disease and lymphoma as differentials.', 'این ظاهر اختصاصی نیست؛ PDF بیماری پاژه و لنفوم را نیز در تشخیص افتراقی می‌آورد.')[lang],
    D: L('Extradural bezeichnet die Lage außerhalb des Duralsacks; es ist keine intramedulläre Lage.', 'Extradural means outside the dural sac; it is not an intramedullary location.', 'خارج‌دورال یعنی بیرون کیسهٔ دورال؛ این محل داخل‌مدولاری نیست.')[lang],
  },
}))

export const WIRBELMETASTASEN_TOPIC_GROUP = {
  fachId: 'msk',
  kapitelId: 'ws-tumoren',
  title: L('Tumoren der Wirbelsäule & des Spinalkanals', 'Tumours of the spine & spinal canal', 'تومورهای ستون فقرات و کانال نخاعی'),
  topics: [{ id: 'wirbelmetastasen', title: L('Wirbelmetastasen', 'Vertebral metastases', 'متاستاز مهره‌ای') }],
}

export const WIRBELMETASTASEN_FLASHCARD_TOPIC = {
  id: 'wirbelmetastasen', area: 'Wirbelsäule', chapter: 'Wirbel- und Spinalkanaltumoren', icon: 'MRT',
  color: '#397f8d', href: '/flashcards/wirbelmetastasen',
  title: L('Wirbelmetastasen', 'Vertebral metastases', 'متاستاز مهره‌ای'),
  subtitle: L('Ivory-Vertebra · extraduraler Befund', 'Ivory vertebra · extradural finding', 'مهرهٔ عاجی · یافتهٔ خارج‌دورال'),
}

export const WIRBELMETASTASEN_FLASHCARDS = [{
  id: 'wirbelmetastasen-ivory-vs-extradural', topicId: 'wirbelmetastasen',
  category: L('Wirbelmetastasen', 'Vertebral metastases', 'متاستاز مهره‌ای'),
  front: L('Wie unterscheiden sich die zwei Wirbelbefunde auf PDF S. 21–22?', 'How do the two vertebral findings on PDF pp.21–22 differ?', 'دو یافتهٔ مهره‌ای در صفحات ۲۱–۲۲ PDF چه تفاوتی دارند؟'),
  answer: L('Ivory-Vertebra: einzelne diffuse Wirbelkörpersklerose bei erhaltener Größe/Kontur, mit Differenzialdiagnosen. Extraduraler Metastasenbefund: mögliche Wirbelkörperdestruktion und mögliche epidurale Kompression.', 'Ivory vertebra: single diffuse vertebral-body sclerosis with preserved size/contour and a differential diagnosis. Extradural metastatic finding: possible vertebral-body destruction and possible epidural compression.', 'مهرهٔ عاجی: اسکلروز منتشر یک جسم مهره با اندازه و حاشیهٔ حفظ‌شده و دارای تشخیص افتراقی. یافتهٔ متاستاز خارج‌دورال: تخریب احتمالی جسم مهره و امکان فشردگی اپیدورال.'),
  explanation: L('Die Seite mit Sklerose und die Kompartiment-/Destruktionsbeschreibung sind zwei verschiedene Lernpunkte der PDF. Die Röntgenbeispiele der Seite werden hier nicht als validierte Radiopaedia-Fälle ausgegeben.', 'The sclerotic pattern and the compartment/destruction description are two distinct PDF learning points. The radiographs on the page are not presented here as validated Radiopaedia cases.', 'الگوی اسکلروتیک و توصیف کمپارتمان/تخریب دو نکتهٔ آموزشی جداگانه در PDF هستند. رادیوگرافی‌های صفحه در اینجا به‌عنوان کیس‌های تأییدشدهٔ Radiopaedia معرفی نمی‌شوند.'),
}]
