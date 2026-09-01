const L = (de, en, fa) => ({ de, en, fa })

const QUESTIONS = [
  {
    id: 'principle',
    question: L('Welche Aussage beschreibt das Grundprinzip der Läsionscharakterisierung in der Mamma-MRT am besten?', 'Which statement best describes the core principle of breast MRI lesion characterisation?', 'کدام عبارت اصل اساسی ارزیابی ضایعه در MRI پستان را بهتر توصیف می‌کند؟'),
    options: [
      L('Morphologie, Enhancement, T2-Signal, Diffusion und Kinetik werden kombiniert.', 'Morphology, enhancement, T2 signal, diffusion and kinetics are combined.', 'مورفولوژی، Enhancement، سیگنال T2، دیفیوژن و کینتیک با یکدیگر ترکیب می‌شوند.'),
      L('Die Kinetik entscheidet unabhängig von allen anderen Sequenzen.', 'Kinetics determine the diagnosis independently of all other sequences.', 'کینتیک مستقل از سایر Sequenceها تشخیص را تعیین می‌کند.'),
      L('Ein einzelnes suspektes Merkmal beweist Malignität.', 'A single suspicious feature proves malignancy.', 'یک ویژگی مشکوک منفرد، بدخیمی را اثبات می‌کند.'),
      L('Nur die Größe der Läsion ist für BI-RADS relevant.', 'Only lesion size is relevant to BI-RADS.', 'در BI-RADS فقط اندازه ضایعه اهمیت دارد.'),
    ], correct: 'A',
    explanation: L('Kein Einzelmerkmal entscheidet sicher über Benignität oder Malignität; entscheidend ist die multiparametrische Gesamtschau.', 'No single feature reliably determines benignity or malignancy; the multiparametric overall assessment is decisive.', 'هیچ ویژگی منفردی خوش‌خیمی یا بدخیمی را با قطعیت تعیین نمی‌کند؛ ارزیابی چندپارامتری اهمیت اصلی را دارد.'),
  },
  {
    id: 'focus',
    question: L('Welcher Befund erhöht bei einem Focus in der Mamma-MRT die Aufmerksamkeit am stärksten?', 'Which finding most increases concern for a focus on breast MRI?', 'کدام یافته درباره Focus در MRI پستان بیش از همه نیاز به توجه دارد؟'),
    options: [
      L('Neu aufgetreten oder im Verlauf größer geworden', 'New or enlarging on follow-up', 'جدید بودن یا افزایش اندازه در پیگیری'),
      L('Seit Jahren unverändert und Teil multipler symmetrischer Foci', 'Unchanged for years and one of multiple symmetric foci', 'سال‌ها بدون تغییر و بخشی از Focusهای متعدد و متقارن'),
      L('Nicht vom normalen BPE abgrenzbar', 'Indistinguishable from normal BPE', 'غیرقابل تفکیک از BPE طبیعی'),
      L('Fehlende zuverlässige Kinetik durch Partialvolumen', 'Lack of reliable kinetics because of partial volume', 'قابل اعتماد نبودن کینتیک به‌دلیل Partial volume'),
    ], correct: 'A',
    explanation: L('Ein neu aufgetretener oder größer werdender Focus verdient besondere Aufmerksamkeit; ein Focus ist nicht automatisch benign.', 'A new or enlarging focus deserves particular attention; a focus is not automatically benign.', 'Focus جدید یا در حال بزرگ‌شدن نیازمند توجه ویژه است و Focus الزاماً خوش‌خیم نیست.'),
  },
  {
    id: 'mass-order',
    question: L('In welcher Reihenfolge wird die Morphologie einer Mass in der Mamma-MRT beschrieben?', 'In what order is mass morphology described on breast MRI?', 'مورفولوژی Mass در MRI پستان با چه ترتیبی توصیف می‌شود؟'),
    options: [
      L('Form → Rand → internes Enhancement', 'Shape → margin → internal enhancement', 'شکل ← حاشیه ← الگوی Enhancement داخلی'),
      L('ADC → T2 → Größe', 'ADC → T2 → size', 'ADC ← T2 ← اندازه'),
      L('Distribution → Kinetik → BPE', 'Distribution → kinetics → BPE', 'توزیع ← کینتیک ← BPE'),
      L('Rand → Distribution → FGT', 'Margin → distribution → FGT', 'حاشیه ← توزیع ← FGT'),
    ], correct: 'A',
    explanation: L('Bei einer Mass werden systematisch Form, Rand und internes Enhancement beurteilt.', 'For a mass, shape, margin and internal enhancement are assessed systematically.', 'در Mass، شکل، حاشیه و الگوی Enhancement داخلی به‌صورت سیستماتیک ارزیابی می‌شوند.'),
  },
  {
    id: 'spiculated',
    question: L('Welcher Rand einer Mass ist in der Mamma-MRT morphologisch am stärksten suspekt?', 'Which mass margin is morphologically most suspicious on breast MRI?', 'کدام نوع حاشیه Mass در MRI پستان از نظر مورفولوژیک بیشترین شک به بدخیمی را ایجاد می‌کند؟'),
    options: [L('Spiculated', 'Spiculated', 'Spiculated'), L('Circumscribed', 'Circumscribed', 'Circumscribed'), L('Glatt', 'Smooth', 'صاف'), L('Oval', 'Oval', 'بیضی')], correct: 'A',
    explanation: L('Spikulierte, strahlenförmige Ausläufer gehören zu den wichtigsten morphologischen Warnzeichen.', 'Spiculated radiating extensions are among the most important morphological warning signs.', 'امتدادهای شعاعی Spiculated از مهم‌ترین علائم هشداردهنده مورفولوژیک هستند.'),
  },
  {
    id: 'dark-septa',
    question: L('Wofür sind nicht anreichernde dunkle Septen innerhalb einer sonst benign imponierenden Mass besonders typisch?', 'What do non-enhancing dark septa within an otherwise benign-appearing mass particularly suggest?', 'سپتاهای تیره بدون Enhancement در یک Mass با سایر ویژگی‌های خوش‌خیم، بیشتر مطرح‌کننده چیست؟'),
    options: [L('Fibroadenom', 'Fibroadenoma', 'فیبروآدنوم'), L('Invasives duktales Karzinom', 'Invasive ductal carcinoma', 'کارسینوم داکتال مهاجم'), L('DCIS', 'DCIS', 'DCIS'), L('Entzündliches Mammakarzinom', 'Inflammatory breast cancer', 'سرطان التهابی پستان')], correct: 'A',
    explanation: L('Dark internal septations sind ein klassisches hilfreiches Zeichen des Fibroadenoms, sofern auch die übrige Morphologie benign ist.', 'Dark internal septations are a classic helpful sign of fibroadenoma when the remaining morphology is also benign.', 'Dark internal septations در صورت خوش‌خیم بودن سایر ویژگی‌های مورفولوژیک، نشانه کلاسیک و کمک‌کننده فیبروآدنوم است.'),
  },
  {
    id: 'nme-distribution',
    question: L('Welche NME-Distribution bildet typischerweise ein keil- oder dreieckförmiges, zur Mamille gerichtetes Areal?', 'Which NME distribution typically forms a wedge- or triangular-shaped area directed toward the nipple?', 'کدام نوع توزیع NME معمولاً ناحیه‌ای گوه‌ای یا مثلثی رو به نوک پستان ایجاد می‌کند؟'),
    options: [L('Segmental', 'Segmental', 'Segmental'), L('Focal', 'Focal', 'Focal'), L('Regional', 'Regional', 'Regional'), L('Diffuse', 'Diffuse', 'Diffuse')], correct: 'A',
    explanation: L('Die segmentale Distribution kann einem Gangsystem entsprechen und ist daher verdächtiger.', 'Segmental distribution may correspond to a ductal system and is therefore more suspicious.', 'توزیع Segmental می‌تواند با یک سیستم مجرایی تطابق داشته باشد و به همین دلیل مشکوک‌تر است.'),
  },
  {
    id: 'clustered-ring',
    question: L('Welches interne Enhancement-Muster eines NME gilt als besonders verdächtig?', 'Which internal enhancement pattern of NME is considered particularly suspicious?', 'کدام الگوی Enhancement داخلی در NME به‌طور ویژه مشکوک محسوب می‌شود؟'),
    options: [L('Clustered Ring', 'Clustered ring', 'Clustered Ring'), L('Homogeneous', 'Homogeneous', 'Homogeneous'), L('Symmetrisch minimal', 'Symmetric minimal', 'حداقل و متقارن'), L('Nicht anreichernde Septen', 'Non-enhancing septa', 'سپتاهای بدون Enhancement')], correct: 'A',
    explanation: L('Clustered-ring Enhancement ist unter den NME-Mustern besonders suspekt.', 'Clustered-ring enhancement is particularly suspicious among NME patterns.', 'Clustered-ring enhancement در میان الگوهای NME به‌طور ویژه مشکوک است.'),
  },
  {
    id: 'kinetics',
    question: L('Welche Aussage zur Kinetik einer Mamma-MRT-Läsion ist korrekt?', 'Which statement about breast MRI lesion kinetics is correct?', 'کدام عبارت درباره کینتیک ضایعه در MRI پستان صحیح است؟'),
    options: [
      L('Persistent ist nicht automatisch benign und Washout nicht automatisch malign.', 'Persistent is not automatically benign, and washout is not automatically malignant.', 'Persistent الزاماً خوش‌خیم و Washout الزاماً بدخیم نیست.'),
      L('Eine Type-I-Kurve beweist Benignität.', 'A type I curve proves benignity.', 'منحنی Type I خوش‌خیمی را اثبات می‌کند.'),
      L('Washout ersetzt die morphologische Beurteilung.', 'Washout replaces morphological assessment.', 'Washout جایگزین ارزیابی مورفولوژیک می‌شود.'),
      L('Die initiale Anstiegsgeschwindigkeit ist ohne diagnostische Bedeutung.', 'The initial rise rate has no diagnostic significance.', 'سرعت افزایش اولیه هیچ ارزش تشخیصی ندارد.'),
    ], correct: 'A',
    explanation: L('Kinetik und Morphologie müssen gemeinsam interpretiert werden; keine Kurve ist allein beweisend.', 'Kinetics and morphology must be interpreted together; no curve is diagnostic by itself.', 'کینتیک و مورفولوژی باید با هم تفسیر شوند و هیچ منحنی‌ای به‌تنهایی تشخیصی نیست.'),
  },
  {
    id: 't2',
    question: L('Welche Aussage zu einem deutlich T2-hyperintensen Mammabefund ist richtig?', 'Which statement about a markedly T2-hyperintense breast lesion is correct?', 'کدام عبارت درباره ضایعه پستان با سیگنال بسیار بالا در T2 صحیح است؟'),
    options: [
      L('Er ist häufig benign, aber auch maligne Tumoren wie das muzinöse Karzinom können T2-hyperintens sein.', 'It is often benign, but malignant tumours such as mucinous carcinoma can also be T2 hyperintense.', 'اغلب خوش‌خیم است، اما تومورهای بدخیم مانند کارسینوم موسینوس نیز می‌توانند در T2 پرسیگنال باشند.'),
      L('Er beweist eine Zyste.', 'It proves a cyst.', 'وجود کیست را اثبات می‌کند.'),
      L('Er schließt ein Karzinom aus.', 'It excludes carcinoma.', 'کارسینوم را رد می‌کند.'),
      L('Er macht DWI und Morphologie überflüssig.', 'It makes DWI and morphology unnecessary.', 'نیاز به DWI و مورفولوژی را از بین می‌برد.'),
    ], correct: 'A',
    explanation: L('T2-Hyperintensität ist häufig bei wasserreichen benignen Läsionen, schließt Malignität jedoch nicht aus.', 'T2 hyperintensity is common in water-rich benign lesions but does not exclude malignancy.', 'T2 Hyperintensity در ضایعات خوش‌خیم غنی از آب شایع است، اما بدخیمی را رد نمی‌کند.'),
  },
  {
    id: 'adc',
    question: L('Wie soll eine Kombination aus hohem DWI-Signal und niedrigem ADC bewertet werden?', 'How should high DWI signal combined with low ADC be assessed?', 'ترکیب سیگنال بالای DWI و ADC پایین چگونه باید ارزیابی شود؟'),
    options: [
      L('Als unterstützendes Malignitätskriterium, das mit Morphologie und Kinetik korreliert werden muss', 'As a supportive malignancy feature that must be correlated with morphology and kinetics', 'به‌عنوان معیار تکمیلی به نفع بدخیمی که باید با مورفولوژی و کینتیک تطبیق داده شود'),
      L('Als alleiniger Beweis für Mammakarzinom', 'As standalone proof of breast cancer', 'به‌عنوان اثبات مستقل سرطان پستان'),
      L('Als sicheres Zeichen eines Fibroadenoms', 'As a definite sign of fibroadenoma', 'به‌عنوان نشانه قطعی فیبروآدنوم'),
      L('Als technisch nicht verwertbarer Befund', 'As a technically unusable finding', 'به‌عنوان یافته‌ای بدون ارزش فنی'),
    ], correct: 'A',
    explanation: L('Wegen der Überschneidung zwischen benignen und malignen Läsionen ist ADC ein Zusatzkriterium und kein alleiniger Entscheidungsparameter.', 'Because benign and malignant lesions overlap, ADC is an adjunct rather than a standalone decision parameter.', 'به‌دلیل هم‌پوشانی ضایعات خوش‌خیم و بدخیم، ADC معیار تکمیلی است و نباید به‌تنهایی مبنای تصمیم‌گیری باشد.'),
  },
]

export const MAMMA_MRT_LESION_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, QUESTIONS.map(item => ({
  id: `mamma-mrt-laesionscharakterisierung-${lang}-${item.id}`,
  tags: ['mamma-mrt-laesionscharakterisierung', 'mamma', 'mrt'],
  fach: 'mamma', question: item.question[lang],
  options: item.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
  correct: item.correct, explanation: item.explanation[lang],
}))]))

const CARDS = [
  ['Grundprinzip', 'Wie wird eine Läsion in der Mamma-MRT multiparametrisch charakterisiert?', 'Durch die gemeinsame Bewertung von Morphologie, Enhancement, T2-Signal, Diffusion und Kinetik.', 'Kein einzelnes Merkmal entscheidet sicher über Benignität oder Malignität.', 'Core principle', 'How is a breast MRI lesion characterised multiparametrically?', 'By jointly assessing morphology, enhancement, T2 signal, diffusion and kinetics.', 'No single feature reliably determines benignity or malignancy.', 'اصل کلی', 'ارزیابی چندپارامتری ضایعه در MRI پستان چگونه انجام می‌شود؟', 'با ارزیابی هم‌زمان مورفولوژی، Enhancement، سیگنال T2، دیفیوژن و کینتیک.', 'هیچ ویژگی منفردی خوش‌خیمی یا بدخیمی را با قطعیت تعیین نمی‌کند.'],
  ['Focus', 'Welche Verlaufsmerkmale sind bei einem Focus in der Mamma-MRT besonders wichtig?', 'Neu oder bekannt, stabil oder größer, einzeln oder multipel und Abgrenzbarkeit vom BPE.', 'Ein neuer oder wachsender Focus verdient besondere Aufmerksamkeit.', 'Focus', 'Which follow-up features matter most for a focus on breast MRI?', 'New or known, stable or enlarging, solitary or multiple, and distinctness from BPE.', 'A new or growing focus deserves particular attention.', 'Focus', 'در پیگیری Focus در MRI پستان کدام ویژگی‌ها اهمیت بیشتری دارند؟', 'جدید یا قدیمی بودن، ثبات یا افزایش اندازه، منفرد یا متعدد بودن و قابلیت تفکیک از BPE.', 'Focus جدید یا در حال رشد نیازمند توجه ویژه است.'],
  ['Mass', 'Welche drei Merkmalsgruppen werden bei einer Mass in der Mamma-MRT systematisch beurteilt?', 'Form, Rand und internes Enhancement.', 'Die Reihenfolge schafft eine reproduzierbare morphologische Beschreibung.', 'Mass', 'Which three feature groups are systematically assessed for a mass on breast MRI?', 'Shape, margin and internal enhancement.', 'This order provides a reproducible morphological description.', 'Mass', 'در ارزیابی سیستماتیک Mass در MRI پستان کدام سه گروه ویژگی بررسی می‌شوند؟', 'شکل، حاشیه و الگوی Enhancement داخلی.', 'این ترتیب توصیف مورفولوژیک قابل تکراری ایجاد می‌کند.'],
  ['Rand', 'Warum ist ein spikulierter Rand einer Mass in der Mamma-MRT wichtig?', 'Strahlenförmige Ausläufer sind ein hochgradig suspektes morphologisches Warnzeichen.', 'Sie beweisen allein keine Malignität, besitzen aber hohes diagnostisches Gewicht.', 'Margin', 'Why is a spiculated mass margin important on breast MRI?', 'Radiating extensions are a highly suspicious morphological warning sign.', 'They do not prove malignancy alone but carry substantial diagnostic weight.', 'حاشیه', 'چرا حاشیه Spiculated در Mass پستان اهمیت دارد؟', 'امتدادهای شعاعی یک علامت مورفولوژیک بسیار مشکوک هستند.', 'به‌تنهایی بدخیمی را اثبات نمی‌کنند، اما وزن تشخیصی بالایی دارند.'],
  ['Enhancement', 'Welche Kombination morphologischer Mass-Merkmale ist in der Mamma-MRT besonders suspekt?', 'Irreguläre Form plus irregulärer/spikulierter Rand plus heterogenes oder Rim Enhancement.', 'Das Zusammentreffen mehrerer suspekter Merkmale ist aussagekräftiger als ein Einzelzeichen.', 'Enhancement', 'Which combination of mass features is particularly suspicious on breast MRI?', 'Irregular shape plus irregular/spiculated margin plus heterogeneous or rim enhancement.', 'Combining several suspicious features is more informative than a single sign.', 'Enhancement', 'کدام ترکیب ویژگی‌های Mass در MRI پستان بسیار مشکوک است؟', 'شکل Irregular همراه با حاشیه Irregular/Spiculated و Heterogeneous یا Rim Enhancement.', 'هم‌زمانی چند ویژگی مشکوک از یک علامت منفرد ارزشمندتر است.'],
  ['Fibroadenom', 'Welche Bedeutung haben Dark Internal Septations in einer sonst benign imponierenden Mass?', 'Sie sind ein klassisches hilfreiches Zeichen eines Fibroadenoms.', 'Die übrige Morphologie muss in die Bewertung einbezogen werden.', 'Fibroadenoma', 'What is the significance of dark internal septations in an otherwise benign-appearing mass?', 'They are a classic helpful sign of fibroadenoma.', 'The remaining morphology must also be considered.', 'فیبروآدنوم', 'Dark Internal Septations در یک Mass با ظاهر خوش‌خیم چه اهمیتی دارند؟', 'نشانه کلاسیک و کمک‌کننده فیبروآدنوم هستند.', 'سایر ویژگی‌های مورفولوژیک نیز باید در ارزیابی لحاظ شوند.'],
  ['NME', 'Welche zwei Merkmalsgruppen beschreiben ein Non-Mass Enhancement in der Mamma-MRT?', 'Distribution und internes Enhancement-Muster.', 'NME bildet keine klar abgrenzbare dreidimensionale Mass.', 'NME', 'Which two feature groups describe non-mass enhancement on breast MRI?', 'Distribution and internal enhancement pattern.', 'NME does not form a clearly defined three-dimensional mass.', 'NME', 'Non-Mass Enhancement در MRI پستان با کدام دو گروه ویژگی توصیف می‌شود؟', 'توزیع و الگوی Enhancement داخلی.', 'NME یک Mass سه‌بعدی مشخص تشکیل نمی‌دهد.'],
  ['DCIS', 'Welche NME-Kombination in der Mamma-MRT sollte besonders an DCIS denken lassen?', 'Segmentale Distribution mit Clumped oder Clustered-Ring Enhancement.', 'Sie kann einem malignen duktalen Prozess entsprechen.', 'DCIS', 'Which NME combination on breast MRI should particularly suggest DCIS?', 'Segmental distribution with clumped or clustered-ring enhancement.', 'It may represent a malignant ductal process.', 'DCIS', 'کدام ترکیب NME در MRI پستان باید بیشتر DCIS را مطرح کند؟', 'توزیع Segmental همراه با Clumped یا Clustered-Ring Enhancement.', 'این ترکیب می‌تواند بیانگر فرایند بدخیم مجرایی باشد.'],
  ['Kinetik', 'Welche drei klassischen Kurventypen werden in der späten Phase der Mamma-MRT unterschieden?', 'Type I Persistent, Type II Plateau und Type III Washout.', 'Keine Kurve beweist allein Benignität oder Malignität.', 'Kinetics', 'Which three classic curve types are distinguished in the delayed phase of breast MRI?', 'Type I persistent, type II plateau and type III washout.', 'No curve alone proves benignity or malignancy.', 'کینتیک', 'در فاز تأخیری MRI پستان کدام سه نوع منحنی کلاسیک تفکیک می‌شوند؟', 'Type I Persistent، Type II Plateau و Type III Washout.', 'هیچ منحنی‌ای به‌تنهایی خوش‌خیمی یا بدخیمی را اثبات نمی‌کند.'],
  ['T2', 'Warum ist ein T2-hyperintenser Mammabefund nicht automatisch benign?', 'Auch maligne Tumoren können T2-hyperintens sein, beispielsweise das muzinöse Karzinom.', 'T2-Signal ist ein Zusatzmerkmal und muss mit den übrigen Parametern korreliert werden.', 'T2', 'Why is a T2-hyperintense breast lesion not automatically benign?', 'Malignant tumours can also be T2 hyperintense, for example mucinous carcinoma.', 'T2 signal is an adjunct and must be correlated with other parameters.', 'T2', 'چرا ضایعه پستان با سیگنال بالا در T2 الزاماً خوش‌خیم نیست؟', 'تومورهای بدخیم مانند کارسینوم موسینوس نیز می‌توانند در T2 پرسیگنال باشند.', 'سیگنال T2 یک ویژگی تکمیلی است و باید با سایر پارامترها تطبیق داده شود.'],
  ['DWI/ADC', 'Welche diagnostische Bedeutung hat DWI hoch plus ADC niedrig bei einer Mammaläsion?', 'Die Kombination unterstützt den Verdacht auf Malignität, ist aber nicht beweisend.', 'ADC ist wegen Überschneidungen ein Zusatzkriterium, kein alleiniger Entscheidungsparameter.', 'DWI/ADC', 'What is the diagnostic significance of high DWI plus low ADC in a breast lesion?', 'The combination supports suspicion of malignancy but is not diagnostic.', 'Because of overlap, ADC is an adjunct rather than a standalone decision parameter.', 'DWI/ADC', 'DWI بالا همراه با ADC پایین در ضایعه پستان چه ارزش تشخیصی دارد؟', 'این ترکیب از احتمال بدخیمی حمایت می‌کند، اما تشخیصی نیست.', 'به‌دلیل هم‌پوشانی، ADC معیار تکمیلی است و نباید به‌تنهایی مبنای تصمیم‌گیری باشد.'],
  ['Algorithmus', 'Wie lautet der abschließende Ablauf der Läsionscharakterisierung in der Mamma-MRT?', 'Focus/Mass/NME einordnen, Morphologie beschreiben, dann T2, DWI/ADC, Kinetik und Voraufnahmen korrelieren.', 'Anschließend erfolgt die BI-RADS-Gesamtbewertung.', 'Algorithm', 'What is the final workflow for breast MRI lesion characterisation?', 'Classify as focus/mass/NME, describe morphology, then correlate T2, DWI/ADC, kinetics and prior studies.', 'The overall BI-RADS assessment follows.', 'الگوریتم', 'روند نهایی ارزیابی ضایعه در MRI پستان چیست؟', 'طبقه‌بندی به Focus/Mass/NME، توصیف مورفولوژی و سپس تطبیق T2، DWI/ADC، کینتیک و بررسی‌های قبلی.', 'پس از آن ارزیابی نهایی BI-RADS انجام می‌شود.'],
]

export const MAMMA_MRT_LESION_FLASHCARDS = CARDS.map((item, index) => ({
  id: `mamma-mrt-laesionscharakterisierung-${String(index + 1).padStart(2, '0')}`,
  topicId: 'mamma-mrt-laesionscharakterisierung',
  category: L(item[0], item[4], item[8]), front: L(item[1], item[5], item[9]),
  answer: L(item[2], item[6], item[10]), explanation: L(item[3], item[7], item[11]),
}))

export const MAMMA_MRT_LESION_FLASHCARD_TOPIC = {
  id: 'mamma-mrt-laesionscharakterisierung', area: 'Mamma', chapter: 'Bildgebung · MRT', icon: 'MR', iconImage: '/fach/mamma.png', color: '#be185d', href: '/flashcards/mamma-mrt-laesionscharakterisierung',
  title: L('Mamma-MRT: Läsionscharakterisierung', 'Breast MRI: Lesion Characterisation', 'MRI پستان: ارزیابی ضایعه'),
  subtitle: L('Mass · NME · Kinetik · T2 · DWI/ADC', 'Mass · NME · kinetics · T2 · DWI/ADC', 'Mass · NME · کینتیک · T2 · DWI/ADC'),
}
