const L = (de, en, fa) => ({ de, en, fa })

export const MSK_OSTEOMYELITIS_LESSON = {
  id: 'osteomyelitis',
  source: L('MSK.pdf, gedruckte S. 72–77 (nur Differentialhinweise); PIDS/IDSA-Leitlinie 2021; Miller et al., Radiology 1979', 'MSK.pdf, printed pp. 72–77 (differential clues only); PIDS/IDSA guideline 2021; Miller et al., Radiology 1979', 'MSK.pdf، صفحات چاپی ۷۲ تا ۷۷ (فقط سرنخ افتراقی)؛ راهنمای PIDS/IDSA سال ۲۰۲۱؛ Miller و همکاران، Radiology سال ۱۹۷۹'),
  heroImage: '/educational/msk-osteomyelitis/bone-focus.svg',
  title: L('Osteomyelitis als Knochenläsion', 'Osteomyelitis as a bone lesion', 'استئومیلیت به‌عنوان ضایعه استخوانی'),
  alt: L('Schematischer Längsschnitt eines Röhrenknochens mit umschriebenem Markherd und glatter periostaler Reaktion; kein diagnostisches Bild', 'Schematic long-bone section with a focal marrow lesion and smooth periosteal response; not a diagnostic image', 'شماتیک برش طولی استخوان بلند با کانون مغز استخوان و واکنش صاف پریوست؛ تصویر تشخیصی واقعی نیست'),
  intro: {
    title: L('Infektion bleibt eine Differentialdiagnose', 'Keep infection in the differential', 'عفونت را در تشخیص افتراقی نگه دارید'),
    text: L('Die PDF liefert einzelne Zeichen, keine vollständige Osteomyelitis-Lehre: die Infektionsseite ist nur ein Trenner. Hier geht es eng um eine Differentialfrage: Periostreaktion ist nicht tumorspezifisch; im Brodie-Abszess-Differential beschreibt das PDF einen zentral avaskulären Bereich mit reaktiver Sklerose (gedruckte S. 77).', 'The PDF offers isolated clues, not a complete osteomyelitis lesson: its infection page is only a divider. This lesson stays with one differential question: periosteal response is not tumour-specific; in the Brodie abscess differential, the PDF describes a central avascular area with reactive sclerosis (printed p. 77).', 'PDF فقط سرنخ‌های پراکنده دارد و آموزش کامل استئومیلیت نیست؛ صفحه عفونت تنها جداکننده فصل است. دامنه درس محدود به یک پرسش افتراقی است: واکنش پریوست اختصاصی تومور نیست؛ PDF در افتراق آبسه برودی از ناحیه مرکزی بدون عروق و اسکلروز واکنشی یاد می‌کند (صفحه چاپی ۷۷).'),
  },
  chapters: [
    {
      id: 'periosteum', icon: '⌁', title: L('Was sagt die Periostreaktion aus?', 'What does the periosteal response tell you?', 'واکنش پریوست چه چیزی می‌گوید؟'), source: L('MSK.pdf, gedruckte S. 72–73; PIDS/IDSA 2021', 'MSK.pdf, printed pp. 72–73; PIDS/IDSA 2021', 'MSK.pdf، صفحات چاپی ۷۲ تا ۷۳؛ PIDS/IDSA ۲۰۲۱'),
      lead: L('Das PDF nennt eine mehrschichtige „Zwiebelschalen“-Reaktion bei Ewing-Sarkom oder Osteomyelitis und eine solide Reaktion bei chronischer, langsam verlaufender Osteomyelitis. Das sind Kontexte, keine spezifischen Diagnosen.', 'The PDF lists a multilamellar “onion-skin” response with Ewing sarcoma or osteomyelitis, and a solid response with slowly evolving chronic osteomyelitis. These are contexts, not specific diagnoses.', 'PDF واکنش چندلایه «پوسته‌پیازی» را در سارکوم یوئینگ یا استئومیلیت و واکنش جامد را در استئومیلیت مزمن و آهسته‌سیر ذکر می‌کند. این‌ها زمینه‌های افتراقی‌اند، نه تشخیص اختصاصی.'),
      rows: [
        [L('Mehrschichtig','Multilamellar','چندلایه'), L('Kann bei aggressiver Reaktion auftreten; Infektion bleibt neben Neoplasie möglich.','May occur with an aggressive response; infection remains possible alongside neoplasia.','ممکن است در واکنش تهاجمی دیده شود؛ عفونت در کنار نئوپلازی همچنان مطرح است.')],
        [L('Solide','Solid','جامد'), L('Kann bei langsamem Verlauf oder chronischer Infektion auftreten; allein kein Beweis für chronische Osteomyelitis.','May occur with slower processes or chronic infection; it does not prove chronic osteomyelitis by itself.','ممکن است در روند آهسته یا عفونت مزمن دیده شود؛ به‌تنهایی اثبات‌کننده استئومیلیت مزمن نیست.')],
      ],
      note: L('Beschreibe die Reaktion und den Destruktionsrand. Leite aus einem einzelnen Periostmuster weder Erreger noch Histologie ab.','Describe the response and the margin of destruction. Do not infer a pathogen or histology from one periosteal pattern.','واکنش و حاشیه تخریب را توصیف کنید. از یک الگوی منفرد پریوست نه عامل عفونی و نه بافت‌شناسی را نتیجه نگیرید.'),
    },
    {
      id: 'brodie', icon: '◉', title: L('Wie passt der Brodie-Abszess ins Bild?', 'How does a Brodie abscess fit the pattern?', 'آبسه برودی چگونه در الگو می‌گنجد؟'), source: L('MSK.pdf, gedruckte S. 73, 75 und 77; Miller et al., Radiology 1979', 'MSK.pdf, printed pp. 73, 75 and 77; Miller et al., Radiology 1979', 'MSK.pdf، صفحات چاپی ۷۳، ۷۵ و ۷۷؛ Miller و همکاران، Radiology ۱۹۷۹'),
      lead: L('Der PDF-Text führt den Brodie-Abszess als Beispiel einer chronischen Osteomyelitis mit solider Periostreaktion an; im Abschnitt zum mottenfraßähnlichen Muster wird Osteomyelitis als mögliche Ursache aggressiver Osteolyse genannt.', 'The PDF cites Brodie abscess as an example of chronic osteomyelitis with solid periosteal response; its moth-eaten pattern section lists osteomyelitis among possible causes of aggressive osteolysis.', 'PDF آبسه برودی را نمونه‌ای از استئومیلیت مزمن همراه واکنش جامد پریوست می‌آورد؛ در بخش الگوی بیدخورده نیز استئومیلیت از علل احتمالی استئولیز تهاجمی ذکر شده است.'),
      rows: [
        [L('PDF-Hinweis','PDF clue','سرنخ PDF'), L('In der Osteoidosteom-Differentialdiagnose nennt das PDF einen zentral avaskulären Bereich mit reaktiver Sklerose (gedruckte S. 77). Es ist kein abgebildeter oder bestätigter Infektionsfall.','In its osteoid osteoma differential, the PDF notes a central avascular area with reactive sclerosis (printed p. 77). It is not an illustrated or confirmed infection case.','PDF در افتراق استئوئید استئوما از ناحیه مرکزی بدون عروق و اسکلروز واکنشی یاد می‌کند (صفحه چاپی ۷۷). این یک کیس تصویری یا تأییدشده عفونت نیست.')],
        [L('Einordnung','Interpretation','تفسیر'), L('Chronische/subakute Infektion ist eine wichtige Differentialdiagnose, aber die Bildgebung allein beweist sie nicht.','Chronic/subacute infection is an important differential, but imaging alone does not prove it.','عفونت مزمن/تحت‌حاد تشخیص افتراقی مهمی است، اما تصویربرداری به‌تنهایی آن را ثابت نمی‌کند.')],
      ],
      note: L("Miller et al. beschreiben variable Bildgebung in ihrer Serie von 25 Fällen; auch eine Periostreaktion war nicht in jedem Fall vorhanden. Eine einzige Morphologie sollte daher nicht als Ausschluss- oder Bestätigungskriterium dienen.","Miller et al. describe variable appearances in their 25-case series; periosteal response was not present in every case. No single morphology should therefore serve as a rule-in or rule-out criterion.","Miller و همکاران در مجموعهٔ ۲۵ موردی خود ظاهر متغیر را گزارش می‌کنند؛ واکنش پریوست نیز در همهٔ موارد وجود نداشت. بنابراین یک مورفولوژی منفرد نباید معیار اثبات یا رد باشد."),
    },
    {
      id: 'scope', icon: '↗', title: L('Was klärt die Bildgebung – und was nicht?', 'What imaging can and cannot settle', 'تصویربرداری چه چیزی را روشن می‌کند و چه چیزی را نه؟'), source: L('PIDS/IDSA 2021 guideline, recommendation II', 'PIDS/IDSA 2021 guideline, recommendation II', 'توصیه دوم راهنمای PIDS/IDSA سال ۲۰۲۱'),
      lead: L('Für Kinder mit vermuteter akuter hämatogener Osteomyelitis empfiehlt die Leitlinie zunächst Röntgenaufnahmen. Sind weitere Bilder nötig, wird MRT gegenüber Szintigrafie, CT oder Ultraschall bevorzugt; die Empfehlung ist konditional und die Evidenz sehr unsicher.', 'For children with suspected acute haematogenous osteomyelitis, the guideline recommends initial radiographs. If more imaging is needed, it suggests MRI over scintigraphy, CT or ultrasound; this is a conditional recommendation based on very low-certainty evidence.', 'برای کودکان با شک به استئومیلیت حاد هماتوژن، راهنما ابتدا رادیوگرافی را توصیه می‌کند. اگر تصویربرداری بیشتر لازم باشد، MRI را بر اسکن استخوان، CT یا سونوگرافی ترجیح می‌دهد؛ این توصیه مشروط و قطعیت شواهد بسیار پایین است.'),
      rows: [
        [L('Röntgen','Radiographs','رادیوگرافی'), L('Schnell und hilfreich für wichtige Alternativdiagnosen; frühe Aufnahmen können wenig sensitiv sein.','Quick and useful for important alternative diagnoses; early films may have low sensitivity.','سریع و برای تشخیص‌های جایگزین مهم مفید است؛ حساسیت تصاویر اولیه ممکن است پایین باشد.')],
        [L('MRT','MRI','MRI'), L('Bei weiterem Bildgebungsbedarf bei pädiatrischer akuter hämatogener Osteomyelitis bevorzugte nächste Modalität laut Leitlinie.','Preferred next modality when additional imaging is needed in paediatric acute haematogenous osteomyelitis.','طبق راهنما، در صورت نیاز به تصویربرداری بیشتر برای استئومیلیت حاد هماتوژن کودکان، MRI روش ترجیحی بعدی است.')],
      ],
      note: L('Diese Empfehlung bezieht sich auf pädiatrische akute hämatogene Osteomyelitis. Sie ist keine allgemeine Protokollregel für Erwachsene, Wirbelsäuleninfektion, diabetischen Fuß oder septische Arthritis.','This recommendation applies to paediatric acute haematogenous osteomyelitis. It is not a general protocol rule for adults, spinal infection, diabetic foot or septic arthritis.','این توصیه درباره استئومیلیت حاد هماتوژن کودکان است و قاعده پروتکل عمومی برای بزرگسالان، عفونت ستون فقرات، پای دیابتی یا آرتریت سپتیک نیست.'),
    },
  ],
  takeHome: L(
    [
      'Periostreaktion und Osteolysemuster sind Hinweise, keine Erreger- oder Histologiediagnose.',
      'Osteomyelitis gehört bei lamellärer Periostreaktion und aggressiver Osteolyse in die Differentialdiagnose.',
      'Das PDF nennt im Brodie-Abszess-Differential einen zentral avaskulären Bereich mit reaktiver Sklerose; die Bildgebung ist variabel.',
      'Die MRT-Empfehlung hier ist auf Kinder mit akuter hämatogener Osteomyelitis begrenzt.',
    ],
    [
      'Periosteal response and osteolysis pattern are clues, not pathogen or histologic diagnoses.',
      'Include osteomyelitis in the differential for lamellated periosteal response and aggressive osteolysis.',
      'The PDF notes a central avascular area with reactive sclerosis in the Brodie abscess differential; appearances vary.',
      'The MRI recommendation here is limited to children with acute haematogenous osteomyelitis.',
    ],
    [
      'واکنش پریوست و الگوی استئولیز سرنخ‌اند، نه تشخیص عامل یا بافت‌شناسی.',
      'در واکنش پریوست لایه‌لایه و استئولیز تهاجمی، استئومیلیت را در تشخیص افتراقی بگنجانید.',
      'PDF در افتراق آبسه برودی از ناحیه مرکزی بدون عروق و اسکلروز واکنشی یاد می‌کند؛ ظاهر تصویربرداری متغیر است.',
      'توصیه MRI در این درس به کودکان مبتلا به استئومیلیت حاد هماتوژن محدود است.',
    ],
  ),
  references: [
    { label: L('Woods et al. PIDS/IDSA Guideline: Acute Hematogenous Osteomyelitis in Pediatrics (2021)', 'Woods et al. PIDS/IDSA Guideline: Acute Haematogenous Osteomyelitis in Pediatrics (2021)', 'Woods و همکاران. راهنمای PIDS/IDSA: استئومیلیت حاد هماتوژن در کودکان (۲۰۲۱)'), url: 'https://doi.org/10.1093/jpids/piab027' },
    { label: L('Miller, Murphy & Gilula. Brodie abscess: reappraisal (Radiology, 1979)', 'Miller, Murphy & Gilula. Brodie abscess: reappraisal (Radiology, 1979)', 'Miller، Murphy و Gilula. بازنگری آبسه برودی (Radiology، ۱۹۷۹)'), url: 'https://pubmed.ncbi.nlm.nih.gov/451190/' },
  ],
  case: {
  "title": {
    "de": "Selbstprüfung: spezifisch oder differentialdiagnostisch?",
    "en": "Self-check: specific or differential?",
    "fa": "خودآزمایی: اختصاصی یا افتراقی؟"
  },
  "prompt": {
    "de": "Textfall: Bei einem Jugendlichen zeigt eine osteolytische Knochenläsion eine mehrschichtige Periostreaktion. Klinik und Labor liegen noch nicht vor. Welche Befundbeurteilung berücksichtigt die Aussagegrenze des Musters am besten?",
    "en": "Text vignette: an adolescent has an osteolytic bone lesion with a multilamellar periosteal response. Clinical and laboratory information is not yet available. Which report best respects the limits of this pattern?",
    "fa": "سناریوی متنی: نوجوانی ضایعهٔ استئولیتیک استخوان با واکنش پریوست چندلایه دارد. اطلاعات بالینی و آزمایشگاهی هنوز در دسترس نیست. کدام ارزیابی گزارش، محدودیت این الگو را بهتر رعایت می‌کند؟"
  },
  "options": [
    {
      "de": "Aggressiv wirkende Läsion; das Schichtmuster legt vorrangig eine neoplastische Ursache gegenüber Infektion nahe.",
      "en": "Aggressive-appearing lesion; the layered pattern primarily favours neoplasia over infection.",
      "fa": "ضایعه با ظاهر تهاجمی؛ الگوی لایه‌لایه در درجهٔ اول نئوپلازی را بر عفونت ترجیح می‌دهد."
    },
    {
      "de": "Aggressiv wirkende Läsion; infektiöse und neoplastische Ursachen sind mit Klinik und weiteren Befunden abzugleichen.",
      "en": "Aggressive-appearing lesion; correlate infectious and neoplastic possibilities with clinical and additional findings.",
      "fa": "ضایعه با ظاهر تهاجمی؛ علل عفونی و نئوپلاستیک باید با بالین و یافته‌های تکمیلی تطبیق داده شوند."
    },
    {
      "de": "Langsam verlaufende Läsion; die mehreren Periostschichten sprechen eher für einen nichtaggressiven Verlauf.",
      "en": "Slowly evolving lesion; multiple periosteal layers favour a nonaggressive course.",
      "fa": "ضایعهٔ آهسته‌سیر؛ لایه‌های متعدد پریوست بیشتر به نفع روند غیرتهاجمی‌اند."
    },
    {
      "de": "Traumatische Knochenreaktion; das Schichtmuster spricht vorrangig für eine organisierte Frakturheilung.",
      "en": "Traumatic bone response; the layered pattern primarily favours organised fracture healing.",
      "fa": "واکنش تروماتیک استخوان؛ الگوی لایه‌لایه در درجهٔ اول به نفع ترمیم سازمان‌یافتهٔ شکستگی است."
    }
  ],
  "answerIndex": 1,
  "feedbackCorrect": {
    "de": "Eine lamelläre Periostreaktion beschreibt die Knochenantwort und ist nicht tumorspezifisch. Sowohl Ewing-Sarkom als auch Osteomyelitis gehören in die Differentialdiagnose; aus dem Muster allein folgen weder Histologie noch Erreger.",
    "en": "Lamellated periosteal response describes the bone reaction and is not tumour-specific. Both Ewing sarcoma and osteomyelitis belong in the differential; the pattern alone establishes neither histology nor pathogen.",
    "fa": "واکنش پریوست لایه‌لایه پاسخ استخوان را توصیف می‌کند و اختصاصی تومور نیست. سارکوم یوئینگ و استئومیلیت هر دو در افتراق قرار دارند؛ الگو به‌تنهایی نه بافت‌شناسی و نه عامل عفونی را تعیین می‌کند."
  },
  "feedbackIncorrect": {
    "de": "Prüfen Sie, welche Information allein aus dem Periostmuster folgt und welche zusätzliche Befunde benötigt.",
    "en": "Review what the periosteal pattern alone supports and what needs additional findings.",
    "fa": "بررسی کنید الگوی پریوست به‌تنهایی چه چیزی را پشتیبانی می‌کند و کدام نتیجه به یافته‌های تکمیلی نیاز دارد."
  },
  "feedbackByOption": [
    {
      "de": "Das Muster allein begründet keine Priorisierung von Neoplasie gegenüber Infektion; die fehlenden Kontextdaten sind relevant.",
      "en": "The pattern alone does not justify prioritising neoplasia over infection; missing context matters.",
      "fa": "الگو به‌تنهایی ترجیح نئوپلازی بر عفونت را توجیه نمی‌کند؛ اطلاعات زمینه‌ای هنوز در دسترس نیست و اهمیت دارد."
    },
    {
      "de": "Eine lamelläre Periostreaktion beschreibt die Knochenantwort und ist nicht tumorspezifisch. Sowohl Ewing-Sarkom als auch Osteomyelitis gehören in die Differentialdiagnose; aus dem Muster allein folgen weder Histologie noch Erreger.",
      "en": "Lamellated periosteal response describes the bone reaction and is not tumour-specific. Both Ewing sarcoma and osteomyelitis belong in the differential; the pattern alone establishes neither histology nor pathogen.",
      "fa": "واکنش پریوست لایه‌لایه پاسخ استخوان را توصیف می‌کند و اختصاصی تومور نیست. سارکوم یوئینگ و استئومیلیت هر دو در افتراق قرار دارند؛ الگو به‌تنهایی نه بافت‌شناسی و نه عامل عفونی را تعیین می‌کند."
    },
    {
      "de": "Mehrere Periostlamellen sind nicht mit einer einzigen glatten soliden Periostreaktion gleichzusetzen.",
      "en": "Multiple lamellae are not equivalent to a single smooth solid periosteal response.",
      "fa": "لایه‌های متعدد با واکنش پریوست جامد و صافِ منفرد یکسان نیستند."
    },
    {
      "de": "Eine Fraktur oder ein entsprechender Heilungsverlauf ist nicht beschrieben. Aus Lamellierung allein lässt sich die traumatische Ursache nicht ableiten.",
      "en": "No fracture or corresponding healing course is described. Lamellation alone does not establish traumatic origin.",
      "fa": "شکستگی یا سیر ترمیمی متناظر توصیف نشده است؛ لایه‌لایه‌بودن به‌تنهایی منشأ تروماتیک را تعیین نمی‌کند."
    }
  ]
},
  notice: L('Begrenzter Entwurf: Die physische PDF-Seite 72 ist nur ein Trenner „Infektion“. Die auf S. 73, 74 und 76 angesehenen Bilder sind für allgemeine Tumor-/Periostzeichen beschriftet; ein infektiologischer Lehrfall konnte unabhängig nicht identifiziert und verifiziert werden. Verwendet werden konkrete Differentialhinweise der gedruckten S. 72–77 sowie eine pädiatrische Leitlinienempfehlung. Septische Arthritis, vollständige Infektionsdiagnostik und Erwachsenenprotokolle sind nicht abgedeckt. Die Hero-Grafik ist eine eigens gezeichnete schematische Illustration.', 'Narrow draft: physical PDF page 72 is only an “Infection” divider. The inspected images on pp. 73, 74 and 76 are labelled for general tumour/periosteal signs; no infection teaching case could be independently identified and verified. This lesson uses differential clues from printed pp. 72–77 and a paediatric guideline recommendation. It does not cover septic arthritis, a complete infection work-up or adult protocols. The hero is a purpose-drawn schematic.', 'پیش‌نویس محدود: صفحه فیزیکی ۷۲ PDF فقط جداکننده «عفونت» است. تصاویر بررسی‌شده در صفحات ۷۳، ۷۴ و ۷۶ برای نشانه‌های عمومی تومور/پریوست برچسب‌گذاری شده‌اند؛ کیس آموزشی عفونت به‌طور مستقل شناسایی و تأیید نشده است. درس از سرنخ‌های افتراقی صفحات چاپی ۷۲ تا ۷۷ و توصیه راهنمای کودکان استفاده می‌کند. آرتریت سپتیک، ارزیابی کامل عفونت و پروتکل بزرگسالان پوشش داده نمی‌شوند. تصویر هدر شماتیک آموزشی اختصاصی است.'),
}
