const L = (de, en, fa) => ({ de, en, fa })

export const MSK_OSTEOID_OSTEOM_LESSON = {
  id: 'osteoid-osteom',
  title: L('Osteoid-Osteom', 'Osteoid osteoma', 'استئوئید استئوما'),
  hero: '/educational/osteoid-osteom/hero.svg',
  sourceNote: L(
    'Lehrentwurf nach MSK.pdf, PDF S. 77–79 (Druckseiten 76–78). Behandlungsangaben geben die Zusammenfassung der Quelle wieder und ersetzen keine individuelle Therapieentscheidung.',
    'Teaching draft based on MSK.pdf, PDF pp. 77–79 (printed pp. 76–78). Treatment statements reflect the source summary and do not replace an individual treatment decision.',
    'پیش‌نویس آموزشی بر اساس MSK.pdf، صفحات PDF ۷۷ تا ۷۹ (صفحات چاپی ۷۶ تا ۷۸). مطالب درمانی بازتاب خلاصهٔ منبع‌اند و جایگزین تصمیم درمانی فردی نیستند.'
  ),
  sections: [
    {
      id: 'clinical', icon: 'clinical',
      title: L('Welches klinische Muster passt?', 'What clinical pattern fits?', 'کدام الگوی بالینی سازگار است؟'),
      lead: L(
        'Das Osteoidosteom ist ein benigner knochenbildender Tumor. Der wichtigste klinische Hinweis im PDF ist ausgeprägter Nachtschmerz, der prompt auf NSAR ansprechen kann.',
        'Osteoid osteoma is a benign bone-forming tumour. The key clinical clue in the PDF is marked night pain, which may respond promptly to NSAIDs.',
        'استئوئید استئوما توموری خوش‌خیم و استخوان‌ساز است. سرنخ بالینی اصلی در PDF درد شدید شبانه است که ممکن است سریع به NSAID پاسخ دهد.'
      ),
      rows: [
        [L('Alter / Geschlecht', 'Age / sex', 'سن / جنس'), L('Typisch 10–25 Jahre; Männer häufiger (im PDF etwa 2:1 bis 3:1).', 'Typically 10–25 years; more common in males (about 2:1 to 3:1 in the PDF).', 'معمولاً ۱۰ تا ۲۵ سالگی؛ در مردان شایع‌تر (در PDF حدود ۲ به ۱ تا ۳ به ۱).')],
        [L('Schmerz', 'Pain', 'درد'), L('Ausgeprägt nachts; promptes Ansprechen auf NSAR wird im PDF mit Prostaglandin-Vermittlung erklärt.', 'Marked at night; the PDF attributes prompt NSAID response to prostaglandin mediation.', 'شدید در شب؛ PDF پاسخ سریع به NSAID را به واسطه‌گری پروستاگلاندین نسبت می‌دهد.')],
        [L('Ort', 'Location', 'محل'), L('Meist lange Röhrenknochen, im PDF etwa 50 % Femur und Tibia; überwiegend intrakortikal in Diaphyse oder Metaphyse.', 'Usually the long bones; the PDF gives femur and tibia as about 50% of cases, predominantly intracortical in the diaphysis or metaphysis.', 'معمولاً استخوان‌های بلند؛ PDF فمور و تیبیا را در حدود ۵۰٪ موارد ذکر می‌کند و محل غالب را داخل کورتکس دیافیز یا متافیز می‌داند.')],
      ],
      note: L('Klinik lenkt den Blick, ersetzt aber nicht den Nachweis und die Lokalisation des Nidus.', 'Clinical features direct the search but do not replace finding and localising the nidus.', 'تظاهر بالینی مسیر جست‌وجو را مشخص می‌کند، اما جای یافتن و تعیین محل نیدوس را نمی‌گیرد.'),
    },
    {
      id: 'imaging', icon: 'imaging',
      title: L('Wo sitzt der Nidus?', 'Where is the nidus?', 'نیدوس کجاست؟'),
      lead: L(
        'Suche nach einem kleinen Nidus innerhalb der reaktiven Sklerose. Die Kortikalisreaktion kann auffällig sein, während der eigentliche Tumor als kleine Aufhellung leicht übersehen wird.',
        'Look for a small nidus within the reactive sclerosis. The cortical reaction may be conspicuous while the tumour itself, a small lucency, is easy to overlook.',
        'درون اسکلروز واکنشی به دنبال نیدوسی کوچک بگردید. واکنش کورتیکال ممکن است برجسته باشد، در حالی‌که خود تومور به‌صورت ناحیهٔ شفاف کوچک به‌راحتی از نظر دور می‌ماند.'
      ),
      modalities: [
        [L('Röntgen', 'Radiograph', 'رادیوگرافی'), L('Scharf begrenzte kortikale Verdickung / Sklerose; darin gegebenenfalls eine kleine runde Aufhellung als Nidus.', 'Well-defined cortical thickening / sclerosis; within it, a small round lucency may represent the nidus.', 'ضخیم‌شدگی یا اسکلروز کورتیکال با حدود مشخص؛ گاهی نیدوس به‌صورت شفاف‌شدگی گرد کوچک درون آن دیده می‌شود.')],
        [L('CT', 'CT', 'CT'), L('Das PDF bezeichnet CT als Goldstandard zur Diagnosesicherung. Der Nidus ist meist <2 cm und hypodens in der reaktiven Sklerose; zentral kann eine punktförmige Verkalkung liegen. Der Scan schreibt dafür „Sequestrid“; dieser unklare Ausdruck wird hier nicht übernommen.', 'The PDF calls CT the gold standard for diagnostic confirmation. The nidus is usually <2 cm and hypodense within reactive sclerosis; a central punctate calcification may be present. The scan uses the unclear term “Sequestrid”, which is not carried into this lesson.', 'PDF، CT را استاندارد طلایی تأیید تشخیص می‌نامد. نیدوس معمولاً <۲ سانتی‌متر و درون اسکلروز واکنشی هیپودنس است؛ ممکن است کلسیفیکاسیون نقطه‌ای مرکزی داشته باشد. متن اسکن‌شده واژهٔ نامشخص «Sequestrid» را به‌کار برده که در این درس تکرار نشده است.')],
        [L('MRT', 'MRI', 'MRI'), L('Das PDF beschreibt eine hohe Sensitivität bei geringerer Spezifität: MRT zeigt Knochenmark- und Weichteilödem gut; das Ödem kann den kleinen Nidus überdecken. Der Nidus kann kräftig Kontrastmittel aufnehmen. Die Darstellung der Reaktion ist nicht gleichbedeutend mit sicherer Nidus-Erkennung.', 'The PDF describes high sensitivity but lower specificity: MRI shows marrow and soft-tissue oedema well, which can obscure the small nidus. The nidus may enhance avidly. Seeing the reaction does not mean the nidus has been confidently identified.', 'PDF حساسیت بالا و اختصاصیت کمتر را توصیف می‌کند: MRI ادم مغز استخوان و بافت نرم را خوب نشان می‌دهد، اما ادم ممکن است نیدوس کوچک را بپوشاند. نیدوس ممکن است افزایش جذب کنتراست شدیدی داشته باشد. مشاهدهٔ واکنش با شناسایی مطمئن نیدوس یکسان نیست.')],
      ],
      diagramCaption: L("Schema, keine diagnostische Aufnahme: Der kleine Nidus und die umgebende Sklerosereaktion sind getrennte Komponenten.", 'Schematic, not diagnostic imaging: the small nidus and surrounding sclerotic reaction are separate components.', 'شماتیک و نه تصویر تشخیصی: نیدوس کوچک و واکنش اسکلروتیک پیرامون آن دو جزء جدا هستند.'),
      imageAlt: L("Drei Bildausschnitte aus MSK.pdf, Druck-S. 77: Röntgenaufnahme des rechten Femurs und MRT-STIR sowie ein mittleres Bild, dessen Sequenz in der PDF-Bildunterschrift nicht benannt wird.", 'Three image panels from MSK.pdf, printed p. 77: right femur radiograph and MRI-STIR, with a middle panel whose sequence is not identified in the PDF caption.', 'سه پنل تصویری از MSK.pdf، صفحهٔ چاپی ۷۷: رادیوگرافی و MRI-STIR فمور راست، همراه پنل میانی که توالی آن در توضیح PDF مشخص نشده است.'),
      imageCaption: L("Die PDF-Bildunterschrift beschreibt eine Kortikalisverdickung im Röntgenbild und den Nidus mit umgebender Reaktion in der MRT-STIR. Das mittlere Bild bleibt ohne Modalitätsbezeichnung, weil die PDF-Bildunterschrift diese nicht nennt. Entnommen aus dem vom Nutzer bereitgestellten Lehr-PDF im Rahmen seiner erklärten Freigabe für dessen Bilder; Mitwirkende und ursprüngliche Lizenz werden im PDF nicht genannt.", 'The PDF caption describes cortical thickening on radiography and the nidus with surrounding reaction on MRI-STIR. The middle panel is left unlabeled because the PDF does not identify its modality. Extracted from the user-supplied teaching PDF under the user’s stated permission for its images; contributor and original licence are not named in the PDF.', 'توضیح PDF ضخیم‌شدگی کورتیکال را در رادیوگرافی و نیدوس همراه واکنش پیرامون را در MRI-STIR توصیف می‌کند. پنل میانی بدون برچسب مانده، چون مودالیتهٔ آن در PDF مشخص نشده است. تصویر با اجازهٔ اعلام‌شدهٔ کاربر برای تصاویر PDF آموزشی استخراج شده؛ نام مشارکت‌کننده و مجوز اصلی در خود PDF ذکر نشده است.'),
    },
    {
      id: 'differential', icon: 'differential',
      title: L('Welche Differenzialdiagnose verändert die Einordnung?', 'Which differential changes the interpretation?', 'کدام تشخیص افتراقی تفسیر را تغییر می‌دهد؟'),
      lead: L('Größe, Nidus und Reaktionsmuster gemeinsam beurteilen; ein einzelnes Merkmal entscheidet nicht allein.', 'Assess size, nidus and reaction pattern together; no single feature decides the diagnosis.', 'اندازه، نیدوس و الگوی واکنش را با هم بسنجید؛ هیچ ویژگی منفردی به‌تنهایی تشخیص را تعیین نمی‌کند.'),
      rows: [
        [L('Brodie-Abszess', 'Brodie abscess', 'آبسه برودی'), L('Subakute Osteomyelitis; im PDF zentral avaskulärer Bereich mit reaktiver Sklerose. Ein Nidus darf nicht allein aus einer kleinen zentralen Aufhellung abgeleitet werden.', 'Subacute osteomyelitis; the PDF describes a central avascular area with reactive sclerosis. A nidus should not be inferred from a small central lucency alone.', 'استئومیلیت تحت‌حاد؛ PDF ناحیهٔ مرکزی بدون عروق همراه اسکلروز واکنشی را ذکر می‌کند. صرفاً از شفاف‌شدگی کوچک مرکزی نمی‌توان وجود نیدوس را نتیجه گرفت.')],
        [L('Osteoblastom', 'Osteoblastoma', 'استئوبلاستوما'), L('Im PDF meist >2 cm, aggressiver und bevorzugt spinal; Größe und Wirbelsäulenlokalisation sind Warnhinweise, keine alleinige histologische Diagnose.', 'In the PDF usually >2 cm, more aggressive and with spinal predilection; size and spinal location are clues, not histologic proof.', 'در PDF معمولاً >۲ سانتی‌متر، تهاجمی‌تر و با تمایل به محل ستون فقرات است؛ اندازه و محل ستون فقرات سرنخ‌اند، نه اثبات بافت‌شناسی.')],
        [L('Ewing-Sarkom', 'Ewing sarcoma', 'سارکوم یوئینگ'), L('Maligner Tumor; das PDF nennt Periostreaktion (Zwiebelschalenmuster) und fehlenden CT-Nidus als abgrenzende Hinweise.', 'Malignant tumour; the PDF lists a periosteal response (onion-skin pattern) and absence of a CT nidus as differentiating clues.', 'توموری بدخیم؛ PDF واکنش پریوستئال (الگوی پیازی) و نبود نیدوس در CT را از سرنخ‌های افتراقی ذکر می‌کند.')],
        [L('Enostose', 'Enostosis', 'انوستوز'), L('Rein sklerotisch; im PDF ohne Nidus und ohne klinische Symptome / Schmerzen.', 'Purely sclerotic; the PDF describes no nidus and no clinical symptoms / pain.', 'کاملاً اسکلروتیک؛ در PDF بدون نیدوس و بدون علائم بالینی یا درد توصیف شده است.')],
      ],
      note: L('Die Schwelle >2 cm ist hier als im PDF genannte Abgrenzungshilfe wiedergegeben, nicht als alleinige diagnostische Regel.', 'The >2 cm threshold is presented here as a differentiating clue given in the PDF, not as a stand-alone diagnostic rule.', 'آستانهٔ >۲ سانتی‌متر در اینجا به‌عنوان سرنخ افتراقیِ ذکرشده در PDF آمده است، نه قاعدهٔ تشخیصی مستقل.'),
    },
    {
      id: 'management', icon: 'management',
      title: L('Was fasst die Quelle zur Therapie zusammen?', 'What does the source summarise about treatment?', 'منبع دربارهٔ درمان چه خلاصه می‌کند؟'),
      lead: L('Diese Lektion beschreibt nur die Angaben auf PDF-Seite 79; sie gibt keine individuelle Behandlungsempfehlung.', 'This lesson reports only the statements on PDF p. 79; it does not provide an individual treatment recommendation.', 'این درس فقط مطالب صفحهٔ ۷۹ PDF را بازگو می‌کند و توصیهٔ درمانی فردی نیست.'),
      rows: [
        [L('Interventionell', 'Interventional', 'مداخله‌ای'), L('CT-gesteuerte Radiofrequenzablation (RFA): laut PDF wird der Nidus thermisch zerstört; die Quelle nennt eine Erfolgsquote >90 %. Eine Primärstudie mit 47 Patientinnen und Patienten berichtete klinischen Erfolg bei 44/47 (94 %); Ergebnisse hängen von Definition und Nachbeobachtung ab.', 'CT-guided radiofrequency ablation (RFA): the PDF says the nidus is thermally destroyed and reports >90% success. A primary series of 47 patients reported clinical success in 44/47 (94%); outcomes depend on definitions and follow-up.', 'ابلیشن رادیوفرکانسی با هدایت CT: طبق PDF نیدوس با حرارت تخریب می‌شود و منبع میزان موفقیت >۹۰٪ را ذکر می‌کند. یک مطالعهٔ اولیه روی ۴۷ بیمار موفقیت بالینی را در ۴۴ از ۴۷ نفر (۹۴٪) گزارش کرد؛ نتایج به تعریف موفقیت و مدت پیگیری وابسته‌اند.')],
        [L('Konservativ', 'Conservative', 'درمان محافظه‌کارانه'), L('Bei milden Beschwerden kann laut PDF unter NSAR beobachtet werden; eine spontane Regression ist möglich. Das PDF nennt hier keine Kriterien für die Auswahl oder Nachkontrolle.', 'For mild symptoms, the PDF says observation with NSAIDs may be considered; spontaneous regression is possible. The PDF gives no selection or follow-up criteria here.', 'طبق PDF در علائم خفیف می‌توان با NSAID پیگیری کرد؛ پسرفت خودبه‌خودی ممکن است. PDF در اینجا معیار انتخاب یا پیگیری را مشخص نمی‌کند.')],
      ],
      note: L('Die Therapieentscheidung gehört in den klinischen Kontext; die Quelle fasst nur Optionen zusammen.', 'Treatment decisions depend on clinical context; the source only summarises options.', 'تصمیم درمانی به زمینهٔ بالینی وابسته است؛ منبع فقط گزینه‌ها را خلاصه می‌کند.'),
    },
  ],
  check: {
    title: L('Den nächsten Bildgebungsschritt begründen', 'Justify the next imaging step', 'گام بعدی تصویربرداری را توجیه کنید'),
    prompt: L('Eine 17-jährige Person hat ausgeprägte nächtliche Schmerzen am Femur, die prompt auf NSAR ansprechen. Im Röntgen fällt kortikale Sklerose auf; im MRT dominiert Ödem und der kleine Nidus bleibt unklar. Welche Einordnung passt am besten?', 'A 17-year-old has marked night pain in the femur that responds promptly to NSAIDs. Radiographs show cortical sclerosis; MRI is dominated by oedema and the small nidus remains unclear. Which interpretation best fits?', 'فردی ۱۷ساله درد شدید شبانهٔ فمور دارد که سریع به NSAID پاسخ می‌دهد. در رادیوگرافی اسکلروز کورتیکال دیده می‌شود؛ در MRI ادم غالب است و نیدوس کوچک واضح نیست. کدام تفسیر مناسب‌تر است؟'),
    options: [
      L('Osteoidosteom bleibt eine passende Arbeitshypothese; CT gezielt zur Darstellung des Nidus prüfen.', 'Osteoid osteoma remains a fitting working hypothesis; use targeted CT to assess the nidus.', 'استئوئید استئوما همچنان فرضیهٔ کاری مناسبی است؛ برای بررسی نیدوس از CT هدفمند استفاده کنید.'),
      L('Das MRT-Ödem beweist ein Ewing-Sarkom; CT ist nicht hilfreich.', 'MRI oedema proves Ewing sarcoma; CT will not help.', 'ادم MRI وجود سارکوم یوئینگ را ثابت می‌کند؛ CT کمکی نمی‌کند.'),
      L('Der fehlende sichtbare Nidus im MRT schließt Osteoidosteom aus.', 'Failure to see the nidus on MRI excludes osteoid osteoma.', 'دیده‌نشدن نیدوس در MRI استئوئید استئوما را رد می‌کند.'),
    ],
    answer: 0,
    explanation: L('Richtig: Das klinische Muster und die kortikale Sklerose passen; das MRT-Ödem kann den Nidus verdecken. Die PDF beschreibt CT als Methode zur Darstellung des kleinen hypodensen Nidus. Das ist eine Lernentscheidung, kein vollständiger diagnostischer Algorithmus.', 'Correct: the clinical pattern and cortical sclerosis fit; MRI oedema may obscure the nidus. The PDF describes CT as the method for depicting the small hypodense nidus. This is a learning decision, not a complete diagnostic algorithm.', 'درست است: الگوی بالینی و اسکلروز کورتیکال سازگارند؛ ادم MRI ممکن است نیدوس را بپوشاند. PDF، CT را روشی برای نمایش نیدوس کوچک هیپودنس توصیف می‌کند. این تمرین آموزشی است، نه الگوریتم کامل تشخیصی.'),
    retry: L('Vergleiche die Rückmeldung mit Klinik, Lage der Sklerose und der MRT-Grenze.', 'Compare the feedback with the clinical clues, location of sclerosis and MRI limitation.', 'بازخورد را با سرنخ‌های بالینی، محل اسکلروز و محدودیت MRI مقایسه کنید.'),
  },
  summary: [
    L('Kleine Läsion im Zentrum der reaktiven Kortikalsklerose suchen.', 'Look for a small lesion within the reactive cortical sclerosis.', 'در مرکز اسکلروز کورتیکال واکنشی به‌دنبال ضایعه‌ای کوچک بگردید.'),
    L('CT dient laut PDF der Nidus-Darstellung; MRT-Ödem kann ihn verdecken.', 'The PDF uses CT to depict the nidus; MRI oedema may obscure it.', 'طبق PDF، CT برای نمایش نیدوس به‌کار می‌رود؛ ادم MRI ممکن است آن را بپوشاند.'),
    L('Brodie-Abszess, Osteoblastom, Ewing-Sarkom und Enostose anhand des Gesamtmusters abgrenzen.', 'Differentiate Brodie abscess, osteoblastoma, Ewing sarcoma and enostosis using the overall pattern.', 'آبسه برودی، استئوبلاستوما، سارکوم یوئینگ و انوستوز را با الگوی کلی افتراق دهید.'),
  ],
  references: [
    { tag: 'MSK.pdf · pp. 77–79', title: L('Nutzerquelle: Osteoidosteom, Bildgebung, Differenzialdiagnosen und Therapie', 'User source: osteoid osteoma, imaging, differentials and treatment', 'منبع کاربر: استئوئید استئوما، تصویربرداری، تشخیص افتراقی و درمان'), citation: L('PDF S. 77–79; Druck S. 76–78. Bildbeitragende nicht ausgewiesen; Verwendung gemäß ausdrücklicher Nutzerfreigabe für PDF-Abbildungen.', 'PDF pp. 77–79; printed pp. 76–78. Image contributors not identified; used under the user’s explicit permission for PDF figures.', 'صفحات PDF ۷۷ تا ۷۹؛ صفحات چاپی ۷۶ تا ۷۸. نام مشارکت‌کنندگان تصویر مشخص نیست؛ استفاده طبق اجازهٔ صریح کاربر برای تصاویر PDF.') },
    { tag: 'Radiology · 1994', title: L('Assoun et al. CT versus MRT bei Osteoidosteom (19 histologisch bestätigte Fälle)', 'Assoun et al. CT versus MRI in osteoid osteoma (19 histologically proven cases)', 'Assoun و همکاران. مقایسهٔ CT و MRI در استئوئید استئوما (۱۹ مورد تأییدشده با بافت‌شناسی)'), href: 'https://pubmed.ncbi.nlm.nih.gov/8134575/', citation: 'Radiology. 1994;191(1):217–223. DOI: 10.1148/radiology.191.1.8134575.' },
    { tag: 'JVIR · 2001', title: L('Woertler et al. CT-gesteuerte RFA und Nachbeobachtung bei 47 Personen', 'Woertler et al. CT-guided RFA and follow-up in 47 patients', 'Woertler و همکاران. RFA با هدایت CT و پیگیری ۴۷ بیمار'), href: 'https://pubmed.ncbi.nlm.nih.gov/11389223/', citation: 'J Vasc Interv Radiol. 2001;12(6):717–722. DOI: 10.1016/S1051-0443(07)61443-2.' },
  ],
}
