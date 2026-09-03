export const L = (de, en, fa) => ({ de, en, fa })
export const pick = (value, lang) => value?.[lang] ?? value?.de ?? value

export const COPY = {
  title: L('Mammographie – Grundlagen der Befundung', 'Mammography – Reporting Fundamentals', 'ماموگرافی – مبانی گزارش‌نویسی'),
  subtitle: L('Erst beschreiben, dann bewerten.', 'Describe first, assess second.', 'ابتدا توصیف کنید، سپس ارزیابی کنید.'),
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'),
  flashcards: L('Flashcards', 'Flashcards', 'فلش‌کارت‌ها'),
  mamma: L('Mamma', 'Breast', 'پستان'),
  imaging: L('Bildgebung & BI-RADS', 'Imaging & BI-RADS', 'تصویربرداری و BI-RADS'),
  mammography: L('Mammographie', 'Mammography', 'ماموگرافی'),
}

export const SECTIONS = [
  ['systematik', 'Systematische Befundung', 'Systematic reporting', 'گزارش‌نویسی سیستماتیک'],
  ['composition', 'Breast Composition', 'Breast composition', 'ترکیب بافت پستان'],
  ['mass', 'Mass', 'Mass', 'توده'],
  ['kalk', 'Verkalkungen', 'Calcifications', 'کلسیفیکاسیون‌ها'],
  ['asymmetrie', 'Asymmetrie & Architekturstörung', 'Asymmetry & distortion', 'آسیمتری و دیستورشن'],
  ['problemloeser', 'DBT & CEM', 'DBT & CEM', 'DBT و CEM'],
  ['assessment', 'BI-RADS Assessment', 'BI-RADS assessment', 'ارزیابی BI-RADS'],
  ['algorithmus', 'Befundalgorithmus', 'Reporting algorithm', 'الگوریتم گزارش'],
  ['action', 'Read Before You Diagnose', 'Read Before You Diagnose', 'پیش از تشخیص بخوانید'],
].map(([id, de, en, fa], index) => ({ id, label: L(de, en, fa), number: String(index + 1).padStart(2, '0') }))

export const FINDINGS = [
  { key: 'mass', title: L('Mass', 'Mass', 'توده'), text: L('Dreidimensionale Raumforderung: Shape, Margin und Density beschreiben.', 'A three-dimensional space-occupying lesion: describe shape, margin and density.', 'ضایعه فضاگیر سه‌بعدی: شکل، حاشیه و دانسیته را توصیف کنید.') },
  { key: 'calc', title: L('Calcifications', 'Calcifications', 'کلسیفیکاسیون‌ها'), text: L('Morphologie und Verteilung getrennt erfassen und gemeinsam bewerten.', 'Record morphology and distribution separately, then assess them together.', 'مورفولوژی و توزیع را جداگانه ثبت و سپس با هم ارزیابی کنید.') },
  { key: 'asym', title: L('Asymmetry', 'Asymmetry', 'آسیمتری'), text: L('Dichte ohne sämtliche Kriterien einer dreidimensionalen Mass.', 'Density that does not fulfil all criteria of a three-dimensional mass.', 'دانسیته‌ای که همه معیارهای یک توده سه‌بعدی را ندارد.') },
  { key: 'dist', title: L('Architectural Distortion', 'Architectural distortion', 'دیستورشن معماری'), text: L('Gestörte Gewebearchitektur ohne sicher abgrenzbare Mass.', 'Distorted tissue architecture without a definite mass.', 'اختلال معماری بافت بدون توده مشخص.') },
]

export const COMPOSITION = [
  ['A', 'The breasts are almost entirely fatty', 'Fast vollständig fetthaltig', 'پستان‌ها تقریباً کاملاً چربی هستند'],
  ['B', 'There are scattered areas of fibroglandular density', 'Vereinzelte fibroglanduläre Dichteareale', 'نواحی پراکنده با دانسیته فیبروگلاندولار وجود دارد'],
  ['C', 'The breasts are heterogeneously dense, which may obscure small masses', 'Heterogen dicht; kleine Herde können verdeckt sein', 'پستان‌ها به‌طور ناهمگون متراکم‌اند و ممکن است توده‌های کوچک پنهان شوند'],
  ['D', 'The breasts are extremely dense, which lowers the sensitivity of mammography', 'Extrem dicht; geringere Mammographie-Sensitivität', 'پستان‌ها بسیار متراکم‌اند و حساسیت ماموگرافی کاهش می‌یابد'],
].map(([code, official, de, fa]) => ({ code, official, text: L(de, official, fa) }))

export const MASS_GROUPS = [
  { title: L('Shape', 'Shape', 'شکل'), items: L('Oval · Round · Lobulated · Irregular', 'Oval · Round · Lobulated · Irregular', 'بیضی · گرد · لوبوله · نامنظم') },
  { title: L('Margin', 'Margin', 'حاشیه'), items: L('Circumscribed · Obscured · Indistinct · Spiculated', 'Circumscribed · Obscured · Indistinct · Spiculated', 'واضح · پوشیده · نامشخص · اسپیکوله') },
  { title: L('Density', 'Density', 'دانسیته'), items: L('High · Equal · Low · Fat-containing', 'High · Equal · Low · Fat-containing', 'بالا · برابر · پایین · حاوی چربی') },
]

export const CALC_MORPHOLOGY = [
  L('Round', 'Round', 'گرد'), L('Amorphous', 'Amorphous', 'آمورف'), L('Coarse heterogeneous', 'Coarse heterogeneous', 'درشت و ناهمگون'), L('Fine pleomorphic', 'Fine pleomorphic', 'ظریف و پلئومورفیک'), L('Fine linear / fine-linear branching', 'Fine linear / fine-linear branching', 'ظریف خطی / ظریف خطی شاخه‌دار'),
]
export const CALC_DISTRIBUTION = [
  L('Diffuse', 'Diffuse', 'منتشر'), L('Regional', 'Regional', 'ناحیه‌ای'), L('Grouped', 'Grouped', 'گروهی'), L('Linear', 'Linear', 'خطی'), L('Segmental', 'Segmental', 'سگمنتال'),
]
export const CALC_EXAMPLES = [
  { left: L('Round', 'Round', 'گرد'), right: L('diffuse', 'diffuse', 'منتشر'), level: L('eher benign', 'more often benign', 'اغلب خوش‌خیم'), tone: 'soft' },
  { left: L('Amorphous', 'Amorphous', 'آمورف'), right: L('grouped', 'grouped', 'گروهی'), level: L('abklärungsbedürftig', 'requires work-up', 'نیازمند بررسی'), tone: 'mid' },
  { left: L('Fine pleomorphic', 'Fine pleomorphic', 'ظریف پلئومورفیک'), right: L('segmental', 'segmental', 'سگمنتال'), level: L('deutlich suspekt', 'clearly suspicious', 'به‌وضوح مشکوک'), tone: 'hot' },
  { left: L('Fine linear/branching', 'Fine linear/branching', 'ظریف خطی/شاخه‌دار'), right: L('segmental', 'segmental', 'سگمنتال'), level: L('hochgradig suspekt', 'highly suspicious', 'بسیار مشکوک'), tone: 'hot' },
]

export const ASYMMETRY_POINTS = [
  L('Zusatzaufnahmen lösen Überlagerungen auf: DBT, Spot Compression, weitere Projektionen.', 'Additional views resolve tissue overlap: DBT, spot compression and further projections.', 'نماهای تکمیلی هم‌پوشانی بافت را برطرف می‌کنند: DBT، فشرده‌سازی موضعی و نماهای بیشتر.'),
  L('Persistiert der Befund, folgen gezielte morphologische Bewertung und gegebenenfalls Sonographie.', 'If the finding persists, proceed to targeted morphologic assessment and, where appropriate, ultrasound.', 'اگر یافته باقی بماند، ارزیابی هدفمند مورفولوژی و در صورت لزوم سونوگرافی انجام می‌شود.'),
  L('Eine Architekturstörung kann postoperativ, radial-sklerosierend oder maligne bedingt sein.', 'Architectural distortion may be postoperative, radial-sclerosing or malignant.', 'دیستورشن معماری می‌تواند پس از عمل، ناشی از ضایعه اسکلروزان شعاعی یا بدخیمی باشد.'),
]

export const BIRADS = [
  ['0', 'Incomplete', 'Weitere Bildgebung / Voraufnahmen', 'Additional imaging / priors', 'تصویربرداری بیشتر / تصاویر قبلی'],
  ['1', 'Negative', 'Routine', 'Routine', 'روتین'], ['2', 'Benign', 'Routine', 'Routine', 'روتین'],
  ['3', 'Probably benign', 'Kurzfristige Kontrolle', 'Short-interval follow-up', 'پیگیری کوتاه‌مدت'],
  ['4', 'Suspicious', 'Gewebediagnostik', 'Tissue diagnosis', 'تشخیص بافتی'],
  ['5', 'Highly suggestive of malignancy', 'Gewebediagnostik', 'Tissue diagnosis', 'تشخیص بافتی'],
  ['6', 'Known biopsy-proven malignancy', 'Bekanntes Malignom', 'Known malignancy', 'بدخیمی اثبات‌شده'],
].map(([code, meaning, de, en, fa]) => ({ code, meaning, management: L(de, en, fa) }))

export const ALGORITHM = [
  [L('Breast Composition', 'Breast composition', 'ترکیب بافت پستان'), L('A / B / C / D – kann Gewebe eine Läsion maskieren?', 'A / B / C / D – could tissue mask a lesion?', 'A / B / C / D – آیا بافت می‌تواند ضایعه‌ای را پنهان کند؟')],
  [L('Finding erkennen', 'Identify the finding', 'شناسایی یافته'), L('Mass / Calcifications / Asymmetry / Architectural Distortion', 'Mass / Calcifications / Asymmetry / Architectural Distortion', 'توده / کلسیفیکاسیون / آسیمتری / دیستورشن معماری')],
  [L('Finding beschreiben', 'Describe the finding', 'توصیف یافته'), L('Mass → Shape · Margin · Density | Kalk → Morphology · Distribution', 'Mass → shape · margin · density | Calcifications → morphology · distribution', 'توده ← شکل · حاشیه · دانسیته | کلسیفیکاسیون ← مورفولوژی · توزیع')],
  [L('Voraufnahmen vergleichen', 'Compare prior studies', 'مقایسه با تصاویر قبلی'), L('Neu? Wachstum? Morphologische Änderung? Langzeitstabilität?', 'New? Growing? Morphologic change? Long-term stability?', 'جدید؟ رشد؟ تغییر مورفولوژی؟ ثبات طولانی‌مدت؟')],
  [L('Problem lösen', 'Resolve the problem', 'حل مسئله'), L('DBT · Magnification · Spot Compression · Ultrasound', 'DBT · Magnification · Spot compression · Ultrasound', 'DBT · بزرگنمایی · فشرده‌سازی موضعی · سونوگرافی')],
  [L('Assessment', 'Assessment', 'ارزیابی'), L('BI-RADS erst nach vollständiger Beschreibung', 'Assign BI-RADS only after complete description', 'BI-RADS تنها پس از توصیف کامل')],
  [L('Management', 'Management', 'اقدام'), L('Routine · Follow-up · weitere Bildgebung · Biopsie', 'Routine · Follow-up · further imaging · Biopsy', 'روتین · پیگیری · تصویربرداری بیشتر · بیوپسی')],
].map(([title, text], index) => ({ number: index + 1, title, text }))

export const CASE_STEPS = [
  {
    question: L('Was beurteilen Sie zuerst?', 'What do you assess first?', 'ابتدا چه چیزی را ارزیابی می‌کنید؟'),
    context: L('58-jährige Patientin, Screening. Neue Mikroverkalkungen im oberen äußeren Quadranten.', '58-year-old screening patient. New calcifications in the upper outer quadrant.', 'بیمار ۵۸ ساله در غربالگری؛ کلسیفیکاسیون‌های جدید در ربع فوقانی خارجی.'),
    options: [L('Enhancement', 'Enhancement', 'Enhancement'), L('Morphology', 'Morphology', 'مورفولوژی'), L('BI-RADS-Kategorie', 'BI-RADS category', 'دسته BI-RADS'), L('Histologie', 'Histology', 'بافت‌شناسی')], correct: 1,
    feedback: L('Richtig: Der Befund wird zuerst morphologisch beschrieben. Die Kategorie folgt erst danach.', 'Correct: describe the morphology first. The assessment category comes later.', 'درست است: ابتدا مورفولوژی یافته توصیف می‌شود و سپس دسته ارزیابی تعیین می‌گردد.'),
    wrong: L('Noch nicht. Beginnen Sie mit dem sichtbaren Descriptor – der Morphologie.', 'Not yet. Start with the visible descriptor: morphology.', 'هنوز نه. با دسکریپتور قابل مشاهده، یعنی مورفولوژی، شروع کنید.'),
  },
  {
    question: L('Was fehlt für die vollständige Beschreibung?', 'What is missing for a complete description?', 'برای توصیف کامل چه چیزی کم است؟'),
    context: L('Magnifikationsaufnahme: fine pleomorphic calcifications.', 'Magnification view: fine pleomorphic calcifications.', 'نمای بزرگنمایی: کلسیفیکاسیون‌های ظریف پلئومورفیک.'),
    options: [L('Breast Composition', 'Breast composition', 'ترکیب پستان'), L('Distribution', 'Distribution', 'توزیع'), L('Mass Density', 'Mass density', 'دانسیته توده'), L('Enhancement-Kinetik', 'Enhancement kinetics', 'کینتیک Enhancement')], correct: 1,
    feedback: L('Richtig: Morphologie und Distribution bilden gemeinsam die vollständige Kalkbeschreibung.', 'Correct: morphology and distribution together complete the calcification description.', 'درست است: مورفولوژی و توزیع با هم توصیف کامل کلسیفیکاسیون را می‌سازند.'),
    wrong: L('Der zweite obligatorische Kalk-Descriptor ist die Verteilung.', 'The second mandatory calcification descriptor is distribution.', 'دومین دسکریپتور ضروری کلسیفیکاسیون، توزیع است.'),
  },
  {
    question: L('Welche Interpretation ist am sinnvollsten?', 'Which interpretation is most appropriate?', 'کدام تفسیر مناسب‌تر است؟'),
    context: L('Neu aufgetretene fine pleomorphic Verkalkungen in segmentaler Distribution.', 'New fine pleomorphic calcifications in a segmental distribution.', 'کلسیفیکاسیون‌های ظریف پلئومورفیک جدید با توزیع سگمنتال.'),
    options: [L('Typisch benigne', 'Typically benign', 'تیپیک خوش‌خیم'), L('Tissue Overlap', 'Tissue overlap', 'هم‌پوشانی بافت'), L('Suspekt – Gewebediagnostik', 'Suspicious – tissue diagnosis', 'مشکوک – تشخیص بافتی'), L('Ohne Ultraschallkorrelat keine Abklärung', 'No work-up without an ultrasound correlate', 'بدون همبستگی سونوگرافی نیازی به بررسی نیست')], correct: 2,
    feedback: L('Richtig: Die Kombination ist suspekt und erfordert eine adäquate Gewebediagnostik.', 'Correct: this combination is suspicious and requires appropriate tissue diagnosis.', 'درست است: این ترکیب مشکوک است و نیاز به تشخیص بافتی مناسب دارد.'),
    wrong: L('Fine pleomorphic plus segmental ist ein suspektes duktales Muster; ein fehlendes Ultraschallkorrelat entwarnt nicht.', 'Fine pleomorphic plus segmental is a suspicious ductal pattern; absent ultrasound correlation is not reassuring.', 'پلئومورفیک ظریف همراه با توزیع سگمنتال یک الگوی داکتال مشکوک است؛ نبود همبستگی سونوگرافی اطمینان‌بخش نیست.'),
  },
]

export const TAKE_HOME = [
  L('Describe before you diagnose.', 'Describe before you diagnose.', 'پیش از تشخیص، توصیف کنید.'),
  L('Mass = Shape + Margin + Density.', 'Mass = shape + margin + density.', 'توده = شکل + حاشیه + دانسیته.'),
  L('Calcifications = Morphology + Distribution.', 'Calcifications = morphology + distribution.', 'کلسیفیکاسیون = مورفولوژی + توزیع.'),
  L('Obscured bedeutet nicht beurteilbar; indistinct bedeutet tatsächlich unscharf.', 'Obscured means not assessable; indistinct means truly ill-defined.', 'Obscured یعنی قابل ارزیابی نیست؛ indistinct یعنی واقعاً نامشخص است.'),
  L('No enhancement does not downgrade suspicious calcifications.', 'No enhancement does not downgrade suspicious calcifications.', 'نبود Enhancement باعث کاهش درجه کلسیفیکاسیون مشکوک نمی‌شود.'),
]
