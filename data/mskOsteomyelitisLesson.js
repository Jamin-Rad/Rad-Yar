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
      note: L('Miller et al. beschreiben eine variable Bildgebung in ihrer Serie von 25 Fällen; eine einzige Morphologie sollte daher nicht als Ausschluss- oder Bestätigungskriterium dienen.','Miller et al. describe variable appearances in their 25-case series; no single morphology should be used as a rule-in or rule-out criterion.','Miller و همکاران در مجموعه ۲۵ موردی خود ظاهر متغیر را گزارش می‌کنند؛ بنابراین یک مورفولوژی منفرد نباید معیار اثبات یا رد باشد.'),
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
    title: L('Selbstprüfung: spezifisch oder differentialdiagnostisch?', 'Self-check: specific or differential?', 'خودآزمایی: اختصاصی یا افتراقی؟'),
    prompt: L('Eine Läsion zeigt eine mehrschichtige Periostreaktion. Welche Schlussfolgerung ist am besten?', 'A lesion has a multilamellar periosteal response. Which conclusion is best?', 'ضایعه واکنش پریوست چندلایه دارد. بهترین نتیجه‌گیری چیست؟'),
    options: [L('Das Muster kann bei aggressiver Läsion auftreten; Infektion und Neoplasie bleiben im Kontext zu prüfen.','This can occur with an aggressive lesion; infection and neoplasia remain in the differential.','این الگو ممکن است در ضایعه تهاجمی دیده شود؛ عفونت و نئوپلازی باید در زمینه بالینی بررسی شوند.'), L('Die Bildgebung beweist ein Ewing-Sarkom.','Imaging proves Ewing sarcoma.','تصویربرداری وجود سارکوم یوئینگ را ثابت می‌کند.')],
    answerIndex: 0,
    feedbackCorrect: L('Richtig. Die PDF nennt sowohl Ewing-Sarkom als auch Osteomyelitis; die Periostreaktion ist nicht spezifisch. (MSK.pdf, gedruckte S. 72.)','Correct. The PDF lists both Ewing sarcoma and osteomyelitis; the periosteal response is not specific. (MSK.pdf, printed p. 72.)','درست است. PDF هم سارکوم یوئینگ و هم استئومیلیت را ذکر می‌کند؛ واکنش پریوست اختصاصی نیست. (MSK.pdf، صفحه چاپی ۷۲.)'),
    feedbackIncorrect: L('Nicht ganz. Das Muster ist nicht tumorspezifisch; die PDF nennt auch Osteomyelitis als Kontext. (MSK.pdf, gedruckte S. 72.)','Not quite. The pattern is not tumour-specific; the PDF also lists osteomyelitis as a context. (MSK.pdf, printed p. 72.)','نه کاملاً. این الگو اختصاصی تومور نیست؛ PDF استئومیلیت را نیز به‌عنوان زمینه ذکر می‌کند. (MSK.pdf، صفحه چاپی ۷۲.)'),
  },
  notice: L('Begrenzter Entwurf: Die physische PDF-Seite 72 ist nur ein Trenner „Infektion“. Die auf S. 73, 74 und 76 angesehenen Bilder sind für allgemeine Tumor-/Periostzeichen beschriftet; ein infektiologischer Lehrfall konnte unabhängig nicht identifiziert und verifiziert werden. Verwendet werden konkrete Differentialhinweise der gedruckten S. 72–77 sowie eine pädiatrische Leitlinienempfehlung. Septische Arthritis, vollständige Infektionsdiagnostik und Erwachsenenprotokolle sind nicht abgedeckt. Die Hero-Grafik ist eine eigens gezeichnete schematische Illustration.', 'Narrow draft: physical PDF page 72 is only an “Infection” divider. The inspected images on pp. 73, 74 and 76 are labelled for general tumour/periosteal signs; no infection teaching case could be independently identified and verified. This lesson uses differential clues from printed pp. 72–77 and a paediatric guideline recommendation. It does not cover septic arthritis, a complete infection work-up or adult protocols. The hero is a purpose-drawn schematic.', 'پیش‌نویس محدود: صفحه فیزیکی ۷۲ PDF فقط جداکننده «عفونت» است. تصاویر بررسی‌شده در صفحات ۷۳، ۷۴ و ۷۶ برای نشانه‌های عمومی تومور/پریوست برچسب‌گذاری شده‌اند؛ کیس آموزشی عفونت به‌طور مستقل شناسایی و تأیید نشده است. درس از سرنخ‌های افتراقی صفحات چاپی ۷۲ تا ۷۷ و توصیه راهنمای کودکان استفاده می‌کند. آرتریت سپتیک، ارزیابی کامل عفونت و پروتکل بزرگسالان پوشش داده نمی‌شوند. تصویر هدر شماتیک آموزشی اختصاصی است.'),
}
