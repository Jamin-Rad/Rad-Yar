const L = (de, en, fa) => ({ de, en, fa })

export const EOSINOPHILIC_GRANULOMA_PATH = '/msk/tumoren/eosinophiles-granulom'
export const EOSINOPHILIC_GRANULOMA_ID = 'eosinophiles-granulom'

const sourceStudy = 'Zhao M, Tang L, Sun S, Cui J, Chen H. World J Surg Oncol. 2021;19:146. doi:10.1186/s12957-021-02261-y; retrospective cohort of 82 pathology-confirmed patients.'
const sourceNci = 'National Cancer Institute. Langerhans Cell Histiocytosis Treatment (PDQ), Health Professional Version; bone biopsy and diagnostic confirmation sections.'

export const EOSINOPHILIC_GRANULOMA_LESSON = {
  id: EOSINOPHILIC_GRANULOMA_ID,
  title: L('Langerhans-Zell-Histiozytose des Knochens', 'Osseous Langerhans cell histiocytosis', 'هیستیوسیتوز سلول لانگرهانس در استخوان'),
  hero: '/educational/eosinophiles-granulom/hero.svg',
  sourceNote: L(
    'Ergänzender Lehrentwurf: MSK.pdf behandelt LCH hier nicht, sondern nennt „eosinophiles Granulom“ nur als Differenzialdiagnose des nicht-ossifizierenden Fibroms (PDF S. 108 / Druckseite 107). Die folgenden Lerninhalte stammen aus den separat aufgeführten Fachquellen. Die PDF führt den curricular verwendeten Begriff in der Differenzialdiagnose; der Titel dieser Lektion verwendet die Bezeichnung ossäre LCH. Diese Lektion behandelt ausschließlich die knöcherne Bildgebung; systemische Abklärung und Therapie sind nicht enthalten.',
    'Supplemental teaching draft: MSK.pdf does not teach LCH here; it only lists “eosinophilic granuloma” as a differential diagnosis for non-ossifying fibroma (PDF p. 108 / printed p. 107). The imaging teaching below is based primarily on a retrospective study of 82 pathology-confirmed patients; the NCI PDQ supports the tissue-confirmation boundary. The PDF uses the curriculum term in its differential; this lesson title uses osseous LCH. This lesson covers bone imaging only; systemic assessment and treatment are outside scope.',
    'پیش‌نویس آموزشی تکمیلی: در این بخش MSK.pdf، LCH آموزش داده نمی‌شود و فقط «گرانولوم ائوزینوفیلیک» را به‌عنوان تشخیص افتراقی فیبروم غیر استخوان‌ساز نام می‌برد (صفحهٔ PDF ۱۰۸ / صفحهٔ چاپی ۱۰۷). آموزش تصویربرداری زیر عمدتاً بر مطالعه‌ای گذشته‌نگر از ۸۲ بیمار با تأیید پاتولوژی استوار است؛ PDQ مؤسسهٔ ملی سرطان نیز مرز تأیید بافتی را پشتیبانی می‌کند. PDF اصطلاح برنامهٔ درسی را در فهرست افتراق به‌کار می‌برد؛ عنوان این درس از LCH استخوانی استفاده می‌کند. این درس فقط تصویربرداری استخوان را پوشش می‌دهد؛ ارزیابی سیستمیک و درمان خارج از دامنه‌اند.'
  ),
  caseStudy: {
    title: L('Radiopaedia-Fall: LCH des Schädels', 'Radiopaedia case: skull LCH', 'کیس رادیوپدیا: LCH جمجمه'),
    description: L(
      'Fall von Samantha Scott: Bei einem zweijährigen Jungen zeigen die frontale und seitliche Schädelaufnahme gruppierte osteolytische Läsionen entlang der rechten Koronarnaht mit abgeschrägten Rändern und Weichteilvorwölbung. Die Diagnose wurde pathologisch bestätigt. Achten Sie auf das Bildmuster; übertragen Sie die Fallbeschreibung nicht als spezifisches Zeichen auf jede Läsion.',
      'Case by Samantha Scott: in a 2-year-old boy, frontal and lateral skull radiographs show clustered lytic lesions along the right coronal suture, with bevelled margins and soft-tissue prominence. The diagnosis was pathologically confirmed. Study the imaging pattern; do not generalize the case description as a specific sign in every lesion.',
      'کیس از Samantha Scott: در پسر ۲ ساله، رادیوگرافی‌های فرونتال و لترال جمجمه ضایعات لیتیک خوشه‌ای در امتداد سوچور کرونال راست، با حاشیه‌های اریب و برجستگی بافت نرم را نشان می‌دهند. تشخیص با پاتولوژی تأیید شده است. الگوی تصویر را بررسی کنید و توصیف این کیس را به‌عنوان نشانه‌ای اختصاصی برای همهٔ ضایعات تعمیم ندهید.'
    ),
    linkLabel: L('Fall und Originalbilder bei Radiopaedia öffnen', 'Open case and original images on Radiopaedia', 'بازکردن کیس و تصاویر اصلی در Radiopaedia'),
    href: 'https://radiopaedia.org/cases/160614',
    attribution: 'Scott S. Langerhans cell histiocytosis - skull. Radiopaedia.org, rID 160614. DOI: 10.53347/rID-160614.',
  },
  sections: [
    { id: 'pattern', icon: 'clinical', title: L('Welche Knochenmuster legen LCH nahe?', 'Which bone patterns suggest LCH?', 'کدام الگوهای استخوانی LCH را مطرح می‌کنند؟') },
    { id: 'modalities', icon: 'imaging', title: L('Was beurteile ich in jeder Modalität?', 'What should I assess on each modality?', 'در هر روش تصویربرداری چه چیزی را بررسی کنم؟') },
    { id: 'limits', icon: 'differential', title: L('Wo endet die bildgebende Einordnung?', 'Where must the imaging impression stop?', 'برداشت تصویری در کجا باید متوقف شود؟') },
    { id: 'transfer', icon: 'check', title: L('Drei Regeln für den Befund', 'Three rules to carry into reporting', 'سه قاعده برای گزارش‌نویسی') },
  ],
  intro: L(
    'Der Knochenbefall bei LCH kann solitär oder multifokal sein. Das Knochenmuster ist variabel und unspezifisch: Beschreiben Sie das Muster und stellen Sie allein anhand der Bildgebung keine definitive Diagnose.',
    'Osseous LCH may be solitary or multifocal. The bone appearance is variable and nonspecific: describe the pattern and do not make a definitive diagnosis from imaging alone.',
    'درگیری استخوانی LCH می‌تواند منفرد یا چندکانونی باشد. نمای استخوانی متغیر و غیراختصاصی است؛ الگو را توصیف کنید و فقط بر پایهٔ تصویر تشخیص قطعی ندهید.'
  ),
  patternRows: [
    [L('Langer Röhrenknochen', 'Long bone', 'استخوان بلند'), L('Eine isolierte diaphysäre Destruktion mit spindelförmiger Periostreaktion und peripherem Ödem kann stark für LCH sprechen, ist aber nicht spezifisch.', 'Isolated diaphyseal destruction with fusiform periosteal reaction and peripheral oedema can strongly suggest LCH, but is not specific.', 'تخریب منفرد دیافیز همراه واکنش پریوست دوکی‌شکل و ادم محیطی می‌تواند قویاً مطرح‌کننده باشد، اما اختصاصی نیست.')],
    [L('Wirbel', 'Vertebra', 'مهره'), L('Eine Abflachung des Wirbelkörpers (Vertebra plana) ist ein hinweisendes Muster; hintere Elemente und eine mögliche epidurale Ausdehnung sind gesondert zu beurteilen.', 'Vertebra plana is a suggestive pattern; assess posterior element and epidural extension separately.', 'تخت‌شدن جسم مهره (vertebra plana) الگویی مطرح‌کننده است؛ گسترش به عناصر خلفی یا فضای اپیدورال را جداگانه بررسی کنید.')],
    [L('Schädel', 'Skull', 'جمجمه'), L('Ein osteolytischer Defekt mit abgeschrägten Rändern und begleitender Weichteilmasse kann hinweisend sein; Schädelmuster werden hier nur kurz überblickt.', 'A lytic defect with bevelled edges and an associated soft-tissue mass can be suggestive; skull patterns are included only as a brief overview here.', 'ضایعهٔ لیتیک با لبهٔ bevelled و تودهٔ همراه بافت نرم می‌تواند مطرح‌کننده باشد؛ الگوی جمجمه در این درس فقط به‌صورت مروری آمده است.')],
  ],
  modalityRows: [
    [L('Röntgen', 'Radiographs', 'رادیوگرافی'), L('Das Muster ist häufig osteolytisch; Form und Begrenzung der Läsion variieren. Eine Periostreaktion kann mehrschichtig oder spindelförmig sein, aber auch fehlen. Auch das PDF weist darauf hin, dass ein sklerotischer Randsaum nicht garantiert ist. Kein Merkmal ist allein diagnostisch.', 'The pattern is often lytic, with variable shape and margins. Periosteal reaction may be multilamellar or fusiform, and may also be absent. The PDF likewise notes that a sclerotic margin is not guaranteed. None of these features is diagnostic alone.', 'الگو اغلب لیتیک است و شکل و مرز ضایعه متغیرند. واکنش پریوست ممکن است چندلایه یا دوکی‌شکل باشد و گاهی وجود نداشته باشد. در PDF نیز ذکر شده که حاشیهٔ اسکلروتیک تضمین‌شده نیست. هیچ‌یک از این ویژگی‌ها به‌تنهایی تشخیصی نیست.')],
    [L('CT', 'CT', 'CT'), L('CT zeigt die Destruktion von Kortikalis und Trabekeln im Detail und kann an Stellen mit relevantem Frakturrisiko deren Ausdehnung genauer darstellen. Die Morphologie beweist keine Histologie.', 'Shows cortical and trabecular destruction in detail; it can better define the extent at sites where fracture risk matters. It does not establish histology.', 'جزئیات تخریب کورتکس و ترابکول‌ها را نشان می‌دهد و در محل‌های پرخطر از نظر شکستگی، وسعت تخریب را دقیق‌تر مشخص می‌کند؛ اما بافت‌شناسی را ثابت نمی‌کند.')],
    [L('MRT', 'MRI', 'MRI'), L('MRT stellt Knochenmark und Weichteilausdehnung zur Beurteilung der Läsionsausdehnung und eines möglichen neurologischen Risikos dar; Ödem oder eine Masse sind allein nicht spezifisch.', 'Assesses marrow and soft-tissue extent, including potential neurological risk; oedema or a mass alone is nonspecific.', 'مغز استخوان و گسترش بافت نرم را برای ارزیابی وسعت و خطر عصبی نشان می‌دهد؛ ادم یا توده به‌تنهایی اختصاصی نیستند.')],
  ],
  caution: L(
    'Der PDF-Hinweis zur NOF-Differenzialdiagnose besagt, dass ein aggressiveres Erscheinungsbild und eine Periostreaktion auftreten „können“ und ein sklerotischer Randsaum nicht garantiert ist. Auch die LCH-Bildgebungsstudie beschreibt die Periostreaktion als variabel und berichtet mehrschichtige oder spindelförmige Muster. Lesen Sie den PDF-Satz als differenzialdiagnostischen Hinweis, nicht als vollständige Beschreibung oder diagnostisches Kriterium für LCH.',
    'The PDF’s NOF differential note says a more aggressive appearance and periosteal reaction are possible, and a sclerotic rim is not guaranteed. The LCH imaging cohort also describes periosteal reaction as variable and reports multilamellar or fusiform patterns. Read the PDF sentence as a differential clue, not a complete description or diagnostic criterion for LCH.',
    'یادداشت افتراقی PDF دربارهٔ NOF می‌گوید ظاهر تهاجمی‌تر و واکنش پریوست «ممکن است» وجود داشته باشد و حاشیهٔ اسکلروتیک تضمین‌شده نیست. مطالعهٔ تصویربرداری LCH نیز واکنش پریوست را متغیر توصیف می‌کند و الگوی چندلایه یا دوکی‌شکل را گزارش می‌دهد. بنابراین جملهٔ PDF را سرنخ افتراقی بدانید، نه توصیف کامل یا معیار تشخیصی LCH.'
  ),
  limits: [
    L('Die Bildgebung stellt keine histologische Diagnose. Falls erforderlich, erfolgt die Bestätigung durch Gewebeentnahme und pathologische Untersuchung.', 'Imaging does not establish the histological diagnosis. When needed, confirmation relies on tissue sampling and pathology.', 'تصویربرداری تشخیص بافت‌شناختی را ثابت نمی‌کند. در صورت نیاز، تأیید بر نمونه‌برداری و پاتولوژی متکی است.'),
    L('Vertebra plana, eine osteolytische Schädelläsion und ein diaphysäres Muster erhöhen lediglich den Verdacht; osteolytische Läsionen haben weitere Ursachen.', 'Vertebra plana, a lytic skull lesion and a diaphyseal pattern only raise suspicion; lytic lesions have other causes.', 'تخت‌شدن مهره، ضایعهٔ لیتیک جمجمه و الگوی دیافیزی فقط شک را افزایش می‌دهند؛ ضایعات لیتیک علل دیگری نیز دارند.'),
    L('Diese Lektion behandelt weder die systemische Abklärung noch das Staging oder die Therapie von LCH. Ein Befund sollte Lokalisation, Muster, Kortikalisdestruktion und Weichteilausdehnung beschreiben und bei Bedarf eine weitere Abklärung empfehlen.', 'This lesson does not cover systemic assessment, LCH staging or treatment. A radiology report should state location, pattern, cortical destruction and soft-tissue extent, and recommend further assessment when appropriate.', 'این درس ارزیابی سیستمیک، مرحله‌بندی LCH یا درمان را پوشش نمی‌دهد. گزارش تصویری باید محل، الگو، تخریب کورتکس و گسترش بافت نرم را بیان کند و در صورت نیاز بررسی بیشتر را پیشنهاد دهد.'),
  ],
  check: {
    title: L('Das Muster vorsichtig anwenden', 'Apply the pattern with care', 'الگو را با احتیاط به‌کار ببرید'),
    prompt: L('Im Röntgenbild zeigt sich eine diaphysäre osteolytische Destruktion mit spindelförmiger Periostreaktion. Welche Einordnung ist am angemessensten?', 'Radiographs show diaphyseal lytic destruction with fusiform periosteal reaction. What is the most appropriate interpretation?', 'در رادیوگرافی، تخریب لیتیک دیافیز با واکنش پریوست دوکی‌شکل دیده می‌شود. مناسب‌ترین برداشت چیست؟'),
    options: [
      L('Dieses Muster spricht für LCH, ist aber nicht spezifisch und bestätigt die Histologie nicht.', 'This pattern suggests LCH but is not specific and does not establish histology.', 'این الگو LCH را مطرح می‌کند، اما اختصاصی نیست و تشخیص بافت‌شناختی را ثابت نمی‌کند.'),
      L('Eine Periostreaktion schließt LCH aus.', 'Periosteal reaction excludes LCH.', 'وجود واکنش پریوست، LCH را رد می‌کند.'),
      L('Dieser Befund sichert die Diagnose und schließt andere Ursachen aus.', 'This appearance confirms the diagnosis and excludes other causes.', 'این ظاهر تشخیص را قطعی می‌کند و علل دیگر را رد می‌کند.'),
    ], answer: 0,
    explanation: L('Richtig. Eine diaphysäre Destruktion mit spindelförmiger Reaktion kann stark für LCH sprechen, doch die Bildgebung ist unspezifisch und ersetzt keine Gewebediagnose.', 'Correct. Diaphyseal destruction with fusiform reaction can strongly suggest LCH, but imaging findings are nonspecific and do not replace tissue diagnosis.', 'درست است. تخریب دیافیز همراه واکنش دوکی‌شکل می‌تواند قویاً LCH را مطرح کند، اما یافته‌های تصویربرداری غیراختصاصی‌اند و جایگزین تشخیص بافتی نمی‌شوند.'),
    retry: L('Unterscheiden Sie zwischen „hinweisend“ und „diagnostisch“. Beschreiben Sie das Bildmuster; das Bild allein bestätigt die Erkrankung nicht.', 'Separate “suggestive” from “diagnostic.” Describe the imaging pattern; the image alone does not confirm the disease.', '«مطرح‌کننده» را از «تشخیصی» جدا کنید. الگوی تصویر را توصیف کنید؛ تصویر به‌تنهایی بیماری را تأیید نمی‌کند.'),
  },
  takeHome: [
    L('Die ossäre LCH zeigt ein variables osteolytisches Muster; ein sklerotischer Randsaum oder eine Periostreaktion sind nicht immer vorhanden.', 'Osseous LCH has a variable lytic pattern; a sclerotic margin or periosteal reaction is not always present.', 'LCH استخوانی الگوی لیتیک متغیری دارد؛ حاشیهٔ اسکلروتیک یا واکنش پریوست همیشه وجود ندارد.'),
    L('Diaphysäre Destruktion mit spindelförmiger Periostreaktion, Vertebra plana oder eine abgeschrägte Schädelläsion können hinweisend, aber nicht spezifisch sein.', 'Diaphyseal destruction with fusiform periosteal reaction, vertebra plana or a bevelled skull lesion can be suggestive, not specific.', 'تخریب دیافیز همراه واکنش پریوست دوکی‌شکل، vertebra plana یا ضایعهٔ bevelled جمجمه می‌توانند مطرح‌کننده باشند، نه اختصاصی.'),
    L('CT hilft bei der Beurteilung knöcherner Details, MRT bei Knochenmark und Weichteilen; keines der Verfahren bestätigt allein die Pathologie.', 'CT helps define bone detail and MRI marrow/soft tissue; neither alone provides pathological confirmation.', 'CT برای جزئیات استخوان و MRI برای مغز استخوان/بافت نرم مفیدند؛ هیچ‌کدام به‌تنهایی تأیید پاتولوژیک نمی‌دهند.'),
  ],
  refs: [
    { tag: 'MSK.pdf · p. 108', label: L('Nur Quellenverweis: LCH-Begriff in der NOF-Differenzialdiagnose', 'Source link only: LCH term in the NOF differential', 'فقط پیوند منبعی: نام LCH در افتراق NOF'), citation: L('Die PDF-Seite wurde anhand von Text und Abbildung geprüft. Sie behandelt NOF und zeigt Tibiaröntgenbilder; „eosinophiles Granulom“ wird nur in der Differenzialdiagnose genannt. Die Lehrinhalte dieser Lektion wurden nicht aus dieser Seite abgeleitet.', 'The PDF page was checked as text and image. It teaches NOF and shows tibial radiographs; “eosinophilic granuloma” appears only in its differential list. This lesson’s teaching content was not inferred from that page.', 'صفحهٔ PDF از نظر متن و تصویر بررسی شد. این صفحه NOF را آموزش می‌دهد و رادیوگرافی تیبیا را نشان می‌دهد؛ «گرانولوم ائوزینوفیلیک» فقط در فهرست افتراق‌ها آمده است. مطالب آموزشی این درس از آن صفحه استنتاج نشده‌اند.') },
    { tag: 'Radiopaedia · rID 160614', label: L('Externer Fall mit Originalaufnahmen', 'External case with original images', 'کیس خارجی همراه تصاویر اصلی'), href: 'https://radiopaedia.org/cases/160614', citation: 'Scott S. Langerhans cell histiocytosis - skull. Radiopaedia.org, rID 160614. DOI: 10.53347/rID-160614. Case report describes frontal/lateral skull radiographs in a 2-year-old boy with clustered lytic lesions along the right coronal suture, bevelled margins and soft tissue prominence; diagnosis pathologically confirmed.' },
    { tag: 'World J Surg Oncol · 2021', label: L('Bildgebungsstudie zu histologisch bestätigten Knochenläsionen', 'Pathology-confirmed imaging cohort of bone lesions', 'مطالعهٔ تصویربرداری ضایعات استخوانی با تأیید بافت‌شناختی'), href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8112044/', citation: `${sourceStudy} The paper reports variable/nonspecific imaging, variable periosteal reaction, and the pattern combinations that suggest LCH; it also states that diagnosis is histological and immunophenotypic.` },
    { tag: 'NCI · PDQ', label: L('Pathologische Bestätigung und Biopsie', 'Pathological confirmation and biopsy', 'تأیید پاتولوژیک و نمونه‌برداری'), href: 'https://www.cancer.gov/types/langerhans/hp/langerhans-treatment-pdq', citation: `${sourceNci} The NCI states that lytic bone lesions are among the sites most frequently biopsied for diagnosis; this is used only to support the imaging-versus-tissue distinction, not treatment advice.` },
  ],
}

const sourceImaging = 'Zhao et al. World J Surg Oncol. 2021;19:146, 82 pathology-confirmed cases; MSK.pdf p.108 only lists the term as a NOF differential.'
const questionSeeds = [
  {
    id: 'pattern',
    question: L('Welches Muster kann eine ossäre LCH stark nahelegen, ohne spezifisch zu sein?', 'Which pattern can strongly suggest osseous LCH without being specific?', 'کدام الگو می‌تواند LCH استخوانی را قویاً مطرح کند، بدون آنکه اختصاصی باشد؟'),
    options: [L('Isolierte diaphysäre Destruktion mit fusiformer Periostreaktion und peripherem Ödem', 'Isolated diaphyseal destruction with fusiform periosteal reaction and peripheral oedema', 'تخریب منفرد دیافیز همراه واکنش پریوست دوکی‌شکل و ادم محیطی'), L('Exzentrische metaphysäre Läsion mit durchgehendem sklerotischem Randsaum', 'Eccentric metaphyseal lesion with a continuous sclerotic rim', 'ضایعهٔ اکسنتریک متافیزی با حاشیهٔ اسکلروتیک پیوسته'), L('Subchondrale Zyste mit Kommunikation zum Gelenk', 'Subchondral cyst communicating with the joint', 'کیست ساب‌کندرال با ارتباط با مفصل')], correct: 0,
    fourth: L('Exzentrische metaphysäre Aufhellung mit sklerotischem Randsaum wie beim typischen NOF-Muster', 'Eccentric metaphyseal lucency with a sclerotic rim, as in the typical NOF pattern', 'شفافیت اکسنتریک متافیزی با حاشیهٔ اسکلروتیک، مانند الگوی تیپیک NOF'),
    fourthWrong: L('Das ist das im PDF gezeigte NOF-Muster, nicht die Kombination aus diaphysärer Destruktion, fusiformer Reaktion und Ödem, die LCH nahelegen kann.', 'That is the NOF pattern shown in the PDF, not the combination of diaphyseal destruction, fusiform reaction and oedema that can suggest LCH.', 'این الگوی NOF نشان‌داده‌شده در PDF است، نه ترکیب تخریب دیافیزی، واکنش دوکی‌شکل و ادم که می‌تواند LCH را مطرح کند.'),
    explanation: L('Die Kohortenstudie beschreibt dieses Muster als stark hinweisend, aber nicht spezifisch. Andere Ursachen der Knochenläsion bleiben möglich.', 'The cohort study describes this pattern as strongly suggestive but nonspecific. Other causes of the bone lesion remain possible.', 'مطالعهٔ کوهورت این الگو را قویاً مطرح‌کننده اما غیراختصاصی توصیف می‌کند؛ علل دیگر ضایعهٔ استخوانی همچنان ممکن‌اند.'),
    wrong: [null, L('Ein dichter Saum ist kein definierendes LCH-Muster; bei chronischer/heilender Läsion kann Sklerose auftreten.', 'A dense rim is not a defining LCH pattern; sclerosis may appear in chronic/healing lesions.', 'حاشیهٔ متراکم الگوی تعریف‌کنندهٔ LCH نیست؛ در ضایعهٔ مزمن/ترمیمی ممکن است اسکلروز دیده شود.'), L('Eine kommunizierende subchondrale Zyste ist nicht das beschriebene LCH-Hinweismuster.', 'A communicating subchondral cyst is not the described suggestive LCH pattern.', 'کیست ساب‌کندرالِ دارای ارتباط، الگوی مطرح‌کنندهٔ توصیف‌شده برای LCH نیست.')],
  },
  {
    id: 'modality',
    question: L('Welche Aussage zur Aufgabenverteilung von CT und MRT bei ossärer LCH passt am besten?', 'Which statement best describes the roles of CT and MRI in osseous LCH?', 'کدام گزاره نقش CT و MRI را در LCH استخوانی بهتر توصیف می‌کند؟'),
    options: [L('CT zeigt knöcherne Destruktion detailliert; MRT beurteilt Markraum und Weichteilausdehnung.', 'CT details bone destruction; MRI assesses marrow and soft-tissue extent.', 'CT تخریب استخوان را با جزئیات نشان می‌دهد؛ MRI مغز استخوان و گسترش بافت نرم را ارزیابی می‌کند.'), L('CT beweist die Histologie; MRT ist für Weichteile ungeeignet.', 'CT proves histology; MRI is unsuitable for soft tissues.', 'CT بافت‌شناسی را ثابت می‌کند؛ MRI برای بافت نرم مناسب نیست.'), L('Beide Modalitäten ersetzen bei jeder Läsion eine Gewebeprobe.', 'Both modalities replace tissue sampling for every lesion.', 'این دو روش در همهٔ ضایعات جایگزین نمونه‌برداری بافتی هستند.')], correct: 0,
    fourth: L('MRT beurteilt vor allem die Kortikalis; CT ist am besten für Markraumödem und Weichteilausdehnung.', 'MRI primarily assesses the cortex; CT is best for marrow oedema and soft-tissue extent.', 'MRI عمدتاً کورتکس را ارزیابی می‌کند؛ CT برای ادم مغز استخوان و گسترش بافت نرم مناسب‌تر است.'),
    fourthWrong: L('Die Aufgaben sind vertauscht: CT liefert knöcherne Details, MRT beurteilt Markraum und Weichteile.', 'The roles are reversed: CT provides bone detail, while MRI assesses marrow and soft tissues.', 'نقش‌ها جابه‌جا شده‌اند: CT جزئیات استخوانی را می‌دهد و MRI مغز استخوان و بافت نرم را ارزیابی می‌کند.'),
    explanation: L('CT kann Kortikalis und Trabekel genauer abbilden, MRT die Weichteilausdehnung. Die Modalitäten beantworten Ausdehnungsfragen, nicht die Histologie.', 'CT better depicts cortex and trabeculae, while MRI assesses soft-tissue extent. These modalities answer extent questions, not histology.', 'CT کورتکس و ترابکول‌ها را دقیق‌تر نشان می‌دهد و MRI گسترش بافت نرم را ارزیابی می‌کند. این روش‌ها به پرسش وسعت پاسخ می‌دهند، نه بافت‌شناسی.'),
    wrong: [null, L('CT/MRT liefern Bildmorphologie, keine histologische Bestätigung; MRT ist gerade für Weichteile hilfreich.', 'CT/MRI provide imaging morphology, not histological confirmation; MRI is useful for soft tissues.', 'CT/MRI مورفولوژی تصویری می‌دهند، نه تأیید بافت‌شناختی؛ MRI برای ارزیابی بافت نرم مفید است.'), L('Bildgebung und Gewebeprobe haben unterschiedliche Aufgaben; eine Probe kann je nach klinischer Abklärung erforderlich sein.', 'Imaging and tissue sampling have different roles; biopsy may be needed depending on the clinical work-up.', 'تصویربرداری و نمونه‌برداری وظایف متفاوتی دارند؛ بسته به بررسی بالینی ممکن است نمونه‌برداری لازم باشد.')],
  },
  {
    id: 'interpretation',
    question: L('Eine lytische Läsion hat keine sklerotische Begrenzung. Welche Aussage ist angemessen?', 'A lytic lesion has no sclerotic margin. Which statement is appropriate?', 'ضایعهٔ لیتیک حاشیهٔ اسکلروتیک ندارد. کدام گزاره مناسب است؟'),
    options: [L('Das Fehlen eines Saums ist mit dem beschriebenen Muster vereinbar, aber allein nicht diagnostisch.', 'Absence of a rim is compatible with the described pattern, but is not diagnostic by itself.', 'نبود حاشیه با الگوی توصیف‌شده سازگار است، اما به‌تنهایی تشخیصی نیست.'), L('Die fehlende Sklerose beweist LCH.', 'Absence of sclerosis proves LCH.', 'نبود اسکلروز، LCH را ثابت می‌کند.'), L('Ohne sklerotischen Saum muss die Läsion akut-frakturiert sein.', 'Without a sclerotic rim the lesion must be acutely fractured.', 'بدون حاشیهٔ اسکلروتیک، ضایعه حتماً دچار شکستگی حاد شده است.')], correct: 0,
    fourth: L('Ein sklerotischer Randsaum ist für die Diagnose von LCH erforderlich.', 'A sclerotic rim is required to diagnose LCH.', 'برای تشخیص LCH وجود حاشیهٔ اسکلروتیک الزامی است.'),
    fourthWrong: L('Das PDF sagt ausdrücklich, dass ein sklerotischer Saum nicht garantiert ist; er ist weder Voraussetzung noch alleiniger Beweis.', 'The PDF explicitly says a sclerotic rim is not guaranteed; it is neither a requirement nor proof by itself.', 'در PDF صریحاً آمده که حاشیهٔ اسکلروتیک تضمین‌شده نیست؛ وجود آن نه شرط لازم است و نه به‌تنهایی اثبات‌کننده.'),
    explanation: L('Die PDF hält ausdrücklich fest, dass ein sklerotischer Saum nicht garantiert ist; zugleich sind Bildmorphologie und Verlauf variabel. Die Bildgebung bleibt unspezifisch.', 'The PDF explicitly notes that a sclerotic rim is not guaranteed; imaging morphology and evolution also vary. Imaging remains nonspecific.', 'در PDF صریحاً آمده که حاشیهٔ اسکلروتیک تضمین‌شده نیست؛ مورفولوژی و سیر تصویری نیز متغیرند. تصویربرداری غیراختصاصی باقی می‌ماند.'),
    wrong: [null, L('Ein fehlender sklerotischer Saum ist nicht spezifisch für LCH.', 'An absent sclerotic margin is not specific for LCH.', 'نبود حاشیهٔ اسکلروتیک اختصاصی LCH نیست.'), L('Fehlende Sklerose legt allein keine Fraktur fest; die Kortikalis und eine Frakturlinie müssen gezielt beurteilt werden.', 'Absence of sclerosis alone does not establish fracture; assess cortex and any fracture line directly.', 'نبود اسکلروز به‌تنهایی شکستگی را ثابت نمی‌کند؛ کورتکس و خط شکستگی باید مستقیماً بررسی شوند.')],
  },
]

export const EOSINOPHILIC_GRANULOMA_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, questionSeeds.map(seed => ({
  id: `${EOSINOPHILIC_GRANULOMA_ID}-${lang}-${seed.id}`, fach: 'msk', tags: [EOSINOPHILIC_GRANULOMA_ID],
  question: seed.question[lang],
  options: [...seed.options, seed.fourth].map((option, i) => ({ id: String.fromCharCode(65 + i), text: option[lang] })),
  correct: String.fromCharCode(65 + seed.correct), explanation: seed.explanation[lang],
  wrongExplanations: Object.fromEntries([
    ...seed.wrong.flatMap((value, i) => value ? [[String.fromCharCode(65 + i), value[lang]]] : []),
    ['D', seed.fourthWrong[lang]],
  ]),
  source: sourceImaging,
}))]))

export const EOSINOPHILIC_GRANULOMA_FLASHCARDS = [
  { id: `${EOSINOPHILIC_GRANULOMA_ID}-diaphysis`, topicId: EOSINOPHILIC_GRANULOMA_ID, category: L('Muster', 'Pattern', 'الگو'), front: questionSeeds[0].question, answer: questionSeeds[0].options[0], explanation: questionSeeds[0].explanation, source: sourceImaging },
  { id: `${EOSINOPHILIC_GRANULOMA_ID}-modalities`, topicId: EOSINOPHILIC_GRANULOMA_ID, category: L('Modalitäten', 'Modalities', 'روش‌های تصویربرداری'), front: questionSeeds[1].question, answer: questionSeeds[1].options[0], explanation: questionSeeds[1].explanation, source: sourceImaging },
  { id: `${EOSINOPHILIC_GRANULOMA_ID}-specificity`, topicId: EOSINOPHILIC_GRANULOMA_ID, category: L('Grenze', 'Limit', 'محدودیت'), front: L('Bestätigt das knöcherne Bild allein eine LCH-Diagnose?', 'Does bone imaging alone confirm LCH?', 'آیا تصویر استخوان به‌تنهایی LCH را تأیید می‌کند؟'), answer: L('Nein. Das Muster kann den Verdacht stützen; die Diagnose darf nicht allein aus der Bildgebung abgeleitet werden.', 'No. The pattern can support suspicion; diagnosis should not be inferred from imaging alone.', 'خیر. الگو می‌تواند شک را تقویت کند؛ تشخیص نباید فقط از تصویربرداری استنباط شود.'), explanation: L('Bildgebung beschreibt Muster und Ausdehnung. Gewebe und klinischer Kontext beantworten andere Fragen.', 'Imaging describes pattern and extent. Tissue and clinical context answer different questions.', 'تصویربرداری الگو و وسعت را توصیف می‌کند؛ بافت و زمینهٔ بالینی به پرسش‌های دیگری پاسخ می‌دهند.'), source: `${sourceStudy}; ${sourceNci}` },
]

export const EOSINOPHILIC_GRANULOMA_FLASHCARD_TOPIC = {
  id: EOSINOPHILIC_GRANULOMA_ID,
  title: EOSINOPHILIC_GRANULOMA_LESSON.title,
  icon: '🦴', color: '#5f8291',
  description: L('LCH-Knochenmuster · Modalitäten · Grenzen der Bildgebung', 'Osseous LCH patterns · modalities · imaging limits', 'الگوهای LCH استخوانی · روش‌ها · محدودیت تصویربرداری'),
}
