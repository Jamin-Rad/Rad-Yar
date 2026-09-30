const L = (de, en, fa) => ({ de, en, fa })
const TOPIC_ID = 'myokardinfarkt-differentialdiagnosen'

const QUESTION_CONTENT = [
  {
    id: 'acute-pathway',
    question: L('Thoraxschmerz, Troponinanstieg und ST-Hebung: Was ist der nächste Schritt?', 'Chest pain, elevated troponin, and ST elevation: what is the next step?', 'درد قفسه سینه، افزایش تروپونین و بالا رفتن قطعهٔ ST: اقدام بعدی چیست؟'),
    options: [L('Kardio-MRT als erste Untersuchung', 'Cardiac MRI as the first test', 'MRI قلب به‌عنوان اولین بررسی'), L('Herzkatheterlabor', 'Cardiac catheterization lab', 'Cardiac catheterization lab'), L('Stressperfusion', 'Stress perfusion imaging', 'پرفیوژن استرس'), L('Kontrolle nach 24 Stunden', 'Reassessment after 24 hours', 'ارزیابی مجدد پس از ۲۴ ساعت')],
    correct: 'B',
    explanation: L('Bei ST-Hebung darf die Akutversorgung nicht durch eine CMR verzögert werden. Die sofortige invasive Abklärung hat Vorrang.', 'With ST elevation, CMR must not delay acute treatment. Immediate invasive assessment takes priority.', 'در بالا رفتن قطعهٔ ST، انجام CMR نباید درمان اورژانسی را به تأخیر بیندازد. ارزیابی تهاجمی فوری اولویت دارد.'),
  },
  {
    id: 'ischaemic-lge',
    question: L('Welches LGE-Muster spricht am stärksten für eine ischämische Myokardschädigung?', 'Which LGE pattern most strongly indicates ischaemic myocardial injury?', 'کدام الگوی LGE بیش از همه به نفع آسیب ایسکمیک میوکارد است؟'),
    options: [L('Subepikardial inferolateral', 'Subepicardial inferolateral', 'ساب‌اپیکاردیال اینفرولاترال'), L('Fleckig basal-septal', 'Patchy basal-septal', 'لکه‌ای بازال‌سپتال'), L('Subendokardial in einem Koronarterritorium', 'Subendocardial within a coronary territory', 'ساب‌اندوکاردیال در یک قلمرو کرونری'), L('Kein LGE bei apikalem Ballooning', 'No LGE with apical ballooning', 'نبود LGE همراه با بالونینگ اپیکال')],
    correct: 'C',
    explanation: L('Infarkt-LGE beginnt subendokardial und kann sich je nach Infarkttiefe bis transmural ausbreiten.', 'Infarct-pattern LGE begins in the subendocardium and may extend transmurally depending on infarct depth.', 'LGE انفارکتی از ساب‌اندوکارد آغاز می‌شود و بسته به عمق انفارکت می‌تواند تا تمام ضخامت دیواره گسترش یابد.'),
  },
  {
    id: 'takotsubo',
    question: L('Nichtobstruktive Koronarien, apikales Ballooning und typischerweise kein LGE: Welche Diagnose ist am wahrscheinlichsten?', 'Non-obstructive coronary arteries, apical ballooning, and typically no LGE: which diagnosis is most likely?', 'عروق کرونر غیرانسدادی، بالونینگ اپیکال و معمولاً بدون LGE: محتمل‌ترین تشخیص چیست؟'),
    options: [L('Chronischer Infarkt', 'Chronic infarction', 'انفارکت مزمن'), L('Takotsubo-Syndrom', 'Takotsubo syndrome', 'سندروم تاکوتسوبو'), L('Kardiale Sarkoidose', 'Cardiac sarcoidosis', 'سارکوئیدوز قلبی'), L('Amyloidose', 'Amyloidosis', 'آمیلوئیدوز')],
    correct: 'B',
    explanation: L('Das territoriumsübergreifende Bewegungsmuster in Cine bei typischerweise fehlendem LGE spricht für Takotsubo.', 'A cine wall-motion pattern extending beyond a single coronary territory with typically absent LGE supports Takotsubo syndrome.', 'الگوی اختلال حرکت دیواره در Cine که از یک قلمرو کرونری فراتر می‌رود و معمولاً با نبود LGE همراه است، به نفع تاکوتسوبو است.'),
  },
  {
    id: 'myocarditis',
    question: L('Welche Kombination passt am besten zu einer akuten Myokarditis?', 'Which combination best fits acute myocarditis?', 'کدام ترکیب بیشترین تطابق را با میوکاردیت حاد دارد؟'),
    options: [L('Subendokardiales LGE ohne Ödem', 'Subendocardial LGE without oedema', 'LGE ساب‌اندوکاردیال بدون ادم'), L('Subepikardiales LGE plus T2-Ödem', 'Subepicardial LGE plus T2 oedema', 'LGE ساب‌اپیکاردیال همراه با ادم T2'), L('Transmurales LGE im LAD-Territorium', 'Transmural LGE in the LAD territory', 'LGE ترانس‌مورال در قلمرو LAD'), L('Apikale Wandverdünnung ohne Ödem', 'Apical wall thinning without oedema', 'نازکی دیواره اپیکال بدون ادم')],
    correct: 'B',
    explanation: L('Myokarditis zeigt typischerweise ein nichtischämisches subepikardiales oder midmyokardiales LGE und bei Aktivität ein T2-basiertes Ödemzeichen.', 'Myocarditis typically shows non-ischaemic subepicardial or mid-wall LGE and, when active, a T2-based marker of oedema.', 'میوکاردیت معمولاً با LGE غیرایسکمیک ساب‌اپیکاردیال یا میدوال دیده می‌شود و در فاز فعال یک نشانهٔ ادم مبتنی بر T2 دارد.'),
  },
  {
    id: 'chronic-infarct',
    question: L('Welcher Befund spricht eher für einen chronischen als für einen akuten Infarkt?', 'Which finding favours chronic rather than acute infarction?', 'کدام یافته بیشتر به نفع انفارکت مزمن نسبت به انفارکت حاد است؟'),
    options: [L('Deutlich erhöhtes T2-Signal', 'Markedly elevated T2 signal', 'افزایش واضح سیگنال T2'), L('Mikrovaskuläre Obstruktion', 'Microvascular obstruction', 'انسداد میکروواسکولار'), L('Persistierendes LGE mit Wandverdünnung ohne Ödem', 'Persistent LGE with wall thinning and no oedema', 'LGE پایدار همراه با نازکی دیواره و بدون ادم'), L('Intramyokardiale Einblutung', 'Intramyocardial haemorrhage', 'خونریزی داخل میوکارد')],
    correct: 'C',
    explanation: L('Chronische Narben zeigen persistierendes LGE, häufig Wandverdünnung und kein relevantes T2-Ödem.', 'Chronic scars show persistent LGE, often with wall thinning and no relevant T2 oedema.', 'اسکارهای مزمن LGE پایدار، اغلب نازکی دیواره و نبود ادم قابل‌توجه در T2 نشان می‌دهند.'),
  },
  {
    id: 'mvo',
    question: L('Wie erscheint eine mikrovaskuläre Obstruktion im LGE?', 'How does microvascular obstruction appear on LGE imaging?', 'انسداد میکروواسکولار در تصاویر LGE چگونه دیده می‌شود؟'),
    options: [L('Als dunkler Kern im hellen Infarktareal', 'As a dark core within the bright infarct area', 'به‌صورت هسته‌ای تیره در ناحیه روشن انفارکت'), L('Als diffuse perikardiale Anreicherung', 'As diffuse pericardial enhancement', 'به‌صورت enhancement منتشر پریکارد'), L('Als homogen helles Blutpool-Signal', 'As a uniformly bright blood-pool signal', 'به‌صورت سیگنال همگن و روشن blood pool'), L('Als isoliertes subepikardiales LGE', 'As isolated subepicardial LGE', 'به‌صورت LGE منفرد ساب‌اپیکاردیال')],
    correct: 'A',
    explanation: L('MVO ist eine dunkle Aussparung innerhalb des hell kontrastierenden Infarktareals und prognostisch relevant.', 'MVO is a dark defect within the brightly enhancing infarct area and has prognostic significance.', 'MVO به‌صورت ناحیه‌ای تیره درون بخش روشن انفارکت دیده می‌شود و از نظر پیش‌آگهی اهمیت دارد.'),
  },
]

const buildQuestions = lang => QUESTION_CONTENT.map((item, index) => ({
  id: `${TOPIC_ID}-${lang}-${String(index + 1).padStart(2, '0')}`,
  tags: [TOPIC_ID, 'kardio-mrt'],
  fach: 'thorax',
  question: item.question[lang],
  options: item.options.map((text, optionIndex) => ({ id: String.fromCharCode(65 + optionIndex), text: text[lang] })),
  correct: item.correct,
  explanation: item.explanation[lang],
}))

export const MYOCARDIAL_INJURY_QUESTIONS = {
  de: buildQuestions('de'),
  en: buildQuestions('en'),
  fa: buildQuestions('fa'),
}

const CARDS = [
  [L('LGE-Grundlagen', 'LGE basics', 'مبانی LGE'), L('Was zeigt LGE?', 'What does LGE show?', 'LGE چه چیزی را نشان می‌دهد؟'), L('Eine Vergrößerung des Extrazellulärraums bei Nekrose oder Fibrose.', 'Expansion of the extracellular space caused by necrosis or fibrosis.', 'افزایش فضای خارج‌سلولی در نکروز یا فیبروز.'), L('Entscheidend sind Wandschicht und Verteilung.', 'The involved wall layer and distribution are decisive.', 'لایهٔ درگیر دیواره و نحوهٔ توزیع تعیین‌کننده‌اند.')],
  [L('Ischämie', 'Ischaemia', 'ایسکمی'), L('Wie sieht ischämisches LGE aus?', 'What does ischaemic LGE look like?', 'LGE ایسکمیک چگونه دیده می‌شود؟'), L('Es beginnt subendokardial, folgt einem Koronarterritorium und kann bis transmural reichen.', 'It begins subendocardially, follows a coronary territory, and may extend transmurally.', 'از ساب‌اندوکارد آغاز می‌شود، از قلمرو کرونری پیروی می‌کند و می‌تواند تا ترانس‌مورال گسترش یابد.'), L('Die subendokardiale Beteiligung ist der zentrale Hinweis auf eine ischämische Schädigung.', 'Subendocardial involvement is the key clue to ischaemic injury.', 'درگیری ساب‌اندوکارد مهم‌ترین نشانهٔ آسیب ایسکمیک است.')],
  [L('Myokarditis', 'Myocarditis', 'میوکاردیت'), L('Wie sieht Myokarditis typischerweise aus?', 'What is the typical appearance of myocarditis?', 'ظاهر تیپیک میوکاردیت چگونه است؟'), L('Subepikardiales oder midmyokardiales LGE, häufig inferolateral, plus T2-Ödem bei aktiver Entzündung.', 'Subepicardial or mid-wall LGE, often inferolateral, with T2 oedema when inflammation is active.', 'LGE ساب‌اپیکاردیال یا میدوال، اغلب اینفرولاترال، همراه با ادم T2 در التهاب فعال.'), L('Das Muster hält sich nicht an ein Koronarterritorium.', 'The pattern does not conform to a coronary territory.', 'این الگو از قلمرو کرونری پیروی نمی‌کند.')],
  [L('Takotsubo', 'Takotsubo', 'تاکوتسوبو'), L('Was ist für Takotsubo entscheidend?', 'What is decisive for Takotsubo syndrome?', 'در تاکوتسوبو چه چیزی تعیین‌کننده است؟'), L('Das Cine-Muster: apikales, midventrikuläres, basales oder fokales Ballooning – typischerweise ohne LGE.', 'The cine pattern: apical, mid-ventricular, basal, or focal ballooning—typically without LGE.', 'الگوی Cine: بالونینگ اپیکال، میدونتریکولار، بازال یا فوکال؛ معمولاً بدون LGE.'), L('Die Wandbewegungsstörung überschreitet meist ein einzelnes Koronarterritorium.', 'The wall-motion abnormality usually extends beyond a single coronary territory.', 'اختلال حرکت دیواره معمولاً از یک قلمرو کرونری منفرد فراتر می‌رود.')],
  [L('Infarktalter', 'Infarct age', 'قدمت انفارکت'), L('Akuter vs. chronischer Infarkt?', 'Acute vs. chronic infarction?', 'انفارکت حاد در برابر مزمن؟'), L('Akut: T2-Ödem. Chronisch: kein Ödem, persistierende Narbe und häufig Wandverdünnung.', 'Acute: T2 oedema. Chronic: no oedema, persistent scar, and often wall thinning.', 'حاد: ادم T2. مزمن: بدون ادم، اسکار پایدار و اغلب نازکی دیواره.'), L('T2 hilft, die Aktivität beziehungsweise das Alter der Schädigung einzuordnen.', 'T2 helps determine the activity or age of the injury.', 'T2 به تعیین فعالیت یا قدمت آسیب کمک می‌کند.')],
  [L('MINOCA', 'MINOCA', 'MINOCA'), L('Was bedeutet MINOCA?', 'What does MINOCA mean?', 'MINOCA به چه معناست؟'), L('Ein echter ischämischer Myokardinfarkt ohne Koronarstenose ≥ 50 %.', 'A true ischaemic myocardial infarction without coronary stenosis ≥50%.', 'یک انفارکت واقعی ایسکمیک میوکارد بدون تنگی کرونر ۵۰٪ یا بیشتر.'), L('Bei der Angiographie ist MINOCA zunächst eine Arbeitsdiagnose. Myokarditis und Takotsubo sind nach der weiteren Abklärung eigenständige Alternativdiagnosen und keine Ursachen eines bestätigten MINOCA.', 'At angiography, MINOCA is initially a working diagnosis. After further evaluation, myocarditis and Takotsubo syndrome are separate alternative diagnoses—not causes of confirmed MINOCA.', 'در زمان آنژیوگرافی، MINOCA ابتدا یک تشخیص کاری است. پس از بررسی تکمیلی، میوکاردیت و تاکوتسوبو تشخیص‌های جایگزین مستقلی هستند و علت MINOCA تأییدشده محسوب نمی‌شوند.')],
  [L('Komplikationen', 'Complications', 'عوارض'), L('Was ist MVO?', 'What is MVO?', 'MVO چیست؟'), L('Eine dunkle Aussparung im hellen Infarkt-LGE als Zeichen fehlender mikrovaskulärer Reperfusion.', 'A dark defect within bright infarct LGE, indicating failure of microvascular reperfusion.', 'ناحیه‌ای تیره درون LGE روشن انفارکت که نشان‌دهندهٔ عدم برقراری مجدد پرفیوژن میکروواسکولار است.'), L('MVO ist prognostisch relevant; zusätzlich auf intramyokardiale Einblutung und LV-Thrombus achten.', 'MVO has prognostic significance; also assess for intramyocardial haemorrhage and LV thrombus.', 'MVO از نظر پیش‌آگهی مهم است؛ خونریزی داخل میوکارد و ترومبوس بطن چپ نیز بررسی شوند.')],
  [L('Indikation', 'Indication', 'اندیکاسیون'), L('Wann hilft CMR bei Troponinanstieg?', 'When is CMR helpful in a patient with elevated troponin?', 'CMR چه زمانی در افزایش تروپونین کمک‌کننده است؟'), L('Nach Ausschluss einer dringlichen koronaren Ursache, wenn die Ursache der Myokardschädigung unklar bleibt.', 'After an urgent coronary cause has been excluded, when the cause of myocardial injury remains unclear.', 'پس از رد علت کرونری اورژانسی، زمانی که علت آسیب میوکارد همچنان نامشخص است.'), L('Bei STEMI oder hämodynamischer Instabilität darf CMR die Akutversorgung nicht verzögern.', 'In STEMI or haemodynamic instability, CMR must not delay acute treatment.', 'در STEMI یا ناپایداری همودینامیک، CMR نباید درمان اورژانسی را به تأخیر بیندازد.')],
]

export const MYOCARDIAL_INJURY_FLASHCARDS = CARDS.map((item, index) => ({
  id: `${TOPIC_ID}-${String(index + 1).padStart(2, '0')}`,
  topicId: TOPIC_ID,
  category: item[0],
  front: item[1],
  answer: item[2],
  explanation: item[3],
}))

export const MYOCARDIAL_INJURY_FLASHCARD_TOPIC = {
  id: TOPIC_ID,
  area: L('Thorax', 'Thorax', 'قفسه سینه'),
  chapter: L('Kardiale Bildgebung · Kardio-MRT', 'Cardiac imaging · cardiac MRI', 'تصویربرداری قلب · MRI قلب'),
  icon: 'MR',
  iconImage: '/fach/thorax.png',
  color: '#8f204f',
  href: `/flashcards/${TOPIC_ID}`,
  title: L('Kardio-MRT bei Troponinanstieg', 'Cardiac MRI in patients with elevated troponin', 'MRI قلب در بیمار با افزایش تروپونین'),
  subtitle: L('Akutpfad · LGE-Muster · Infarkt · Myokarditis · Takotsubo · MINOCA', 'Acute pathway · LGE patterns · infarction · myocarditis · Takotsubo · MINOCA', 'مسیر اورژانسی · الگوهای LGE · انفارکت · میوکاردیت · تاکوتسوبو · MINOCA'),
}
