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
    id: 'mass-features',
    question: L('Welche drei Merkmalsgruppen werden bei einer Mass in der Mamma-MRT systematisch beurteilt?', 'Which three feature groups are systematically assessed for a mass on breast MRI?', 'در ارزیابی سیستماتیک Mass در MRI پستان کدام سه گروه ویژگی بررسی می‌شوند؟'),
    options: [
      L('Form, Rand und internes Anreicherungsmuster', 'Shape, margin and internal enhancement pattern', 'شکل، حاشیه و الگوی Enhancement داخلی'),
      L('Größe, ADC-Wert und BPE', 'Size, ADC value and BPE', 'اندازه، مقدار ADC و BPE'),
      L('Verteilung, FGT und Kinetik', 'Distribution, FGT and kinetics', 'توزیع، FGT و کینتیک'),
      L('T2-Signal, Implantatintegrität und Hautdicke', 'T2 signal, implant integrity and skin thickness', 'سیگنال T2، سلامت ایمپلنت و ضخامت پوست'),
    ], correct: 'A',
    explanation: L('Form, Rand und internes Anreicherungsmuster bilden die morphologische Beschreibung einer Mass.', 'Shape, margin and internal enhancement pattern form the morphological description of a mass.', 'شکل، حاشیه و الگوی Enhancement داخلی، توصیف مورفولوژیک Mass را تشکیل می‌دهند.'),
  },
  {
    id: 'spiculated',
    question: L('Welche Kombination von Form und Rand einer Mass ist in der Mamma-MRT morphologisch am stärksten suspekt?', 'Which combination of mass shape and margin is morphologically most suspicious on breast MRI?', 'کدام ترکیب شکل و حاشیه Mass در MRI پستان از نظر مورفولوژیک بیشترین شک به بدخیمی را ایجاد می‌کند؟'),
    options: [L('Irreguläre Form mit spikuliertem Rand', 'Irregular shape with a spiculated margin', 'شکل Irregular با حاشیه Spiculated'), L('Ovale Form mit scharf begrenztem Rand', 'Oval shape with a circumscribed margin', 'شکل بیضی با حاشیه واضح و صاف'), L('Runde Form mit scharf begrenztem Rand', 'Round shape with a circumscribed margin', 'شکل گرد با حاشیه واضح و صاف'), L('Ovale Form mit dunklen internen Septierungen', 'Oval shape with dark internal septations', 'شکل بیضی با سپتاهای داخلی تیره')], correct: 'A',
    explanation: L('Die Kombination aus irregulärer Form und spikuliertem Rand besitzt ein hohes morphologisches Gewicht. Sie ist stark suspekt, beweist allein aber keine Malignität.', 'The combination of irregular shape and a spiculated margin carries substantial morphological weight. It is highly suspicious but does not prove malignancy by itself.', 'ترکیب شکل Irregular و حاشیه Spiculated از نظر مورفولوژیک اهمیت زیادی دارد؛ بسیار مشکوک است، اما به‌تنهایی بدخیمی را اثبات نمی‌کند.'),
  },
  {
    id: 'rim-enhancement',
    question: L('Welche Aussage beschreibt ein Rim Enhancement einer Mass in der Mamma-MRT korrekt?', 'Which statement correctly describes rim enhancement of a mass on breast MRI?', 'کدام عبارت Rim Enhancement یک Mass را در MRI پستان به‌درستی توصیف می‌کند؟'),
    options: [
      L('Das Enhancement liegt überwiegend am Läsionsrand und ist häufig suspekt.', 'Enhancement is predominantly located at the lesion rim and is often suspicious.', 'Enhancement عمدتاً در حاشیه ضایعه قرار دارد و اغلب مشکوک است.'),
      L('Die gesamte Mass reichert gleichmäßig an und ist damit sicher benign.', 'The entire mass enhances uniformly and is therefore definitely benign.', 'تمام Mass به‌طور یکنواخت Enhancement نشان می‌دهد و بنابراین قطعاً خوش‌خیم است.'),
      L('Es handelt sich um nicht anreichernde Septen innerhalb der Mass.', 'It refers to non-enhancing septa within the mass.', 'منظور سپتاهای بدون Enhancement درون Mass است.'),
      L('Es beschreibt ausschließlich die Verteilung eines NME.', 'It exclusively describes the distribution of NME.', 'این اصطلاح فقط توزیع NME را توصیف می‌کند.'),
    ], correct: 'A',
    explanation: L('Beim Rim Enhancement reichert sich vor allem der Rand der Mass an. Das Muster ist häufig suspekt, besonders bei invasiven Karzinomen.', 'With rim enhancement, enhancement is concentrated at the mass margin. The pattern is often suspicious, particularly in invasive carcinomas.', 'در Rim Enhancement، جذب کنتراست عمدتاً در حاشیه Mass دیده می‌شود. این الگو به‌ویژه در کارسینوم‌های مهاجم اغلب مشکوک است.'),
  },
  {
    id: 'dark-septa',
    question: L('Wofür sind nicht anreichernde dunkle Septen innerhalb einer sonst benign imponierenden Mass besonders typisch?', 'What do non-enhancing dark septa within an otherwise benign-appearing mass particularly suggest?', 'سپتاهای تیره بدون Enhancement در یک Mass با سایر ویژگی‌های خوش‌خیم، بیشتر مطرح‌کننده چیست؟'),
    options: [L('Fibroadenom', 'Fibroadenoma', 'فیبروآدنوم'), L('Invasives duktales Karzinom', 'Invasive ductal carcinoma', 'کارسینوم داکتال مهاجم'), L('DCIS', 'DCIS', 'DCIS'), L('Entzündliches Mammakarzinom', 'Inflammatory breast cancer', 'سرطان التهابی پستان')], correct: 'A',
    explanation: L('Dark internal septations sind ein klassisches hilfreiches Zeichen des Fibroadenoms, sofern auch die übrige Morphologie benign ist.', 'Dark internal septations are a classic helpful sign of fibroadenoma when the remaining morphology is also benign.', 'Dark internal septations در صورت خوش‌خیم بودن سایر ویژگی‌های مورفولوژیک، نشانه کلاسیک و کمک‌کننده فیبروآدنوم است.'),
  },
  {
    id: 'nme-features',
    question: L('Welche zwei Merkmalsgruppen werden zur Beschreibung eines Non-Mass Enhancement in der Mamma-MRT verwendet?', 'Which two feature groups are used to describe non-mass enhancement on breast MRI?', 'برای توصیف Non-Mass Enhancement در MRI پستان از کدام دو گروه ویژگی استفاده می‌شود؟'),
    options: [
      L('Verteilung und internes Anreicherungsmuster', 'Distribution and internal enhancement pattern', 'توزیع و الگوی Enhancement داخلی'),
      L('Form und Rand', 'Shape and margin', 'شکل و حاشیه'),
      L('FGT und BPE', 'FGT and BPE', 'FGT و BPE'),
      L('T2-Signal und Implantatintegrität', 'T2 signal and implant integrity', 'سیگنال T2 و سلامت ایمپلنت'),
    ], correct: 'A',
    explanation: L('Ein NME bildet keine klar abgrenzbare dreidimensionale Mass. Es wird deshalb anhand seiner Verteilung und seines internen Anreicherungsmusters beschrieben.', 'NME does not form a clearly defined three-dimensional mass. It is therefore described by its distribution and internal enhancement pattern.', 'NME یک Mass سه‌بعدی با حدود مشخص ایجاد نمی‌کند؛ بنابراین بر اساس توزیع و الگوی Enhancement داخلی توصیف می‌شود.'),
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
    options: [L('Clustered Ring', 'Clustered ring', 'Clustered Ring'), L('Homogen', 'Homogeneous', 'همگن'), L('Heterogen', 'Heterogeneous', 'ناهمگن'), L('Klumpig', 'Clumped', 'توده‌ای و خوشه‌ای')], correct: 'A',
    explanation: L('Clustered-ring Enhancement ist unter den NME-Mustern besonders suspekt.', 'Clustered-ring enhancement is particularly suspicious among NME patterns.', 'Clustered-ring enhancement در میان الگوهای NME به‌طور ویژه مشکوک است.'),
  },
  {
    id: 'kinetic-phases',
    question: L('Welche beiden Abschnitte der dynamischen Kontrastmittelaufnahme werden bei einer Mamma-MRT-Läsion getrennt beurteilt?', 'Which two phases of dynamic contrast enhancement are assessed separately in a breast MRI lesion?', 'در ارزیابی دینامیک Enhancement ضایعه در MRI پستان کدام دو فاز جداگانه بررسی می‌شوند؟'),
    options: [
      L('Initialer Anstieg und später Signalverlauf', 'Initial rise and delayed signal course', 'افزایش اولیه و روند تأخیری سیگنال'),
      L('T2-Signal und ADC-Wert', 'T2 signal and ADC value', 'سیگنال T2 و مقدار ADC'),
      L('FGT und BPE', 'FGT and BPE', 'FGT و BPE'),
      L('Form und Rand', 'Shape and margin', 'شکل و حاشیه'),
    ], correct: 'A',
    explanation: L('Zuerst wird die Geschwindigkeit des initialen Anstiegs beurteilt. Anschließend wird der späte Verlauf als persistent, Plateau oder Washout eingeordnet.', 'First, the speed of the initial rise is assessed. The delayed course is then classified as persistent, plateau or washout.', 'ابتدا سرعت افزایش اولیه بررسی می‌شود؛ سپس روند تأخیری به‌صورت Persistent، Plateau یا Washout طبقه‌بندی می‌شود.'),
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
  ['Focus', 'Wie ist ein Focus in der Mamma-MRT definiert?', 'Ein punktförmiges Enhancement unter 5 mm, das zu klein für eine zuverlässige morphologische Charakterisierung ist.', 'Ein Focus ist nicht automatisch benign und muss vom normalen BPE abgegrenzt werden.', 'Focus', 'How is a focus defined on breast MRI?', 'A punctate enhancement smaller than 5 mm that is too small for reliable morphological characterisation.', 'A focus is not automatically benign and must be distinguished from normal BPE.', 'Focus', 'Focus در MRI پستان چگونه تعریف می‌شود؟', 'یک Enhancement نقطه‌ای کوچک‌تر از ۵ میلی‌متر که برای توصیف مطمئن مورفولوژیک بیش از حد کوچک است.', 'Focus الزاماً خوش‌خیم نیست و باید از BPE طبیعی تفکیک شود.'],
  ['Focus', 'Welche Verlaufsmerkmale sind bei einem Focus in der Mamma-MRT besonders wichtig?', 'Neu oder bekannt, stabil oder größer, einzeln oder multipel und Abgrenzbarkeit vom BPE.', 'Ein neuer oder wachsender Focus verdient besondere Aufmerksamkeit.', 'Focus', 'Which follow-up features matter most for a focus on breast MRI?', 'New or known, stable or enlarging, solitary or multiple, and distinctness from BPE.', 'A new or growing focus deserves particular attention.', 'Focus', 'در پیگیری Focus در MRI پستان کدام ویژگی‌ها اهمیت بیشتری دارند؟', 'جدید یا قدیمی بودن، ثبات یا افزایش اندازه، منفرد یا متعدد بودن و قابلیت تفکیک از BPE.', 'Focus جدید یا در حال رشد نیازمند توجه ویژه است.'],
  ['Mass', 'Welche drei Merkmalsgruppen werden bei einer Mass in der Mamma-MRT systematisch beurteilt?', 'Form, Rand und internes Enhancement.', 'Die getrennte Beschreibung dieser drei Gruppen macht die morphologische Beurteilung reproduzierbar.', 'Mass', 'Which three feature groups are systematically assessed for a mass on breast MRI?', 'Shape, margin and internal enhancement.', 'Describing these three groups separately makes the morphological assessment reproducible.', 'Mass', 'در ارزیابی سیستماتیک Mass در MRI پستان کدام سه گروه ویژگی بررسی می‌شوند؟', 'شکل، حاشیه و الگوی Enhancement داخلی.', 'توصیف جداگانه این سه گروه، ارزیابی مورفولوژیک را قابل تکرار می‌کند.'],
  ['Mass – Form', 'Welche Formkategorien werden für eine Mass in der Mamma-MRT verwendet?', 'Rund, oval oder irregulär.', 'Die Form wird getrennt vom Rand beschrieben.', 'Mass shape', 'Which shape categories are used for a mass on breast MRI?', 'Round, oval or irregular.', 'Shape is described separately from the margin.', 'شکل Mass', 'برای توصیف شکل Mass در MRI پستان از چه دسته‌هایی استفاده می‌شود؟', 'گرد، بیضی یا Irregular.', 'شکل باید جدا از حاشیه توصیف شود.'],
  ['Mass – Rand', 'Welche Randkategorien werden für eine Mass in der Mamma-MRT verwendet?', 'Scharf begrenzt, irregulär oder spikuliert.', 'Ein spikulierter Rand ist hochgradig suspekt, aber nicht allein beweisend.', 'Mass margin', 'Which margin categories are used for a mass on breast MRI?', 'Circumscribed, irregular or spiculated.', 'A spiculated margin is highly suspicious but not diagnostic by itself.', 'حاشیه Mass', 'برای توصیف حاشیه Mass در MRI پستان از چه دسته‌هایی استفاده می‌شود؟', 'واضح و صاف، Irregular یا Spiculated.', 'حاشیه Spiculated بسیار مشکوک است، اما به‌تنهایی تشخیصی نیست.'],
  ['Mass – Enhancement', 'Welche internen Anreicherungsmuster werden bei einer Mass in der Mamma-MRT unterschieden?', 'Homogen, heterogen, Rim Enhancement und Dark Internal Septations.', 'Das Anreicherungsmuster wird zusammen mit Form und Rand bewertet.', 'Mass enhancement', 'Which internal enhancement patterns are distinguished for a mass on breast MRI?', 'Homogeneous, heterogeneous, rim enhancement and dark internal septations.', 'The enhancement pattern is assessed together with shape and margin.', 'Enhancement در Mass', 'در Mass پستان کدام الگوهای Enhancement داخلی تفکیک می‌شوند؟', 'همگن، ناهمگن، Rim Enhancement و Dark Internal Septations.', 'الگوی Enhancement همراه با شکل و حاشیه ارزیابی می‌شود.'],
  ['Rand', 'Warum ist ein spikulierter Rand einer Mass in der Mamma-MRT wichtig?', 'Strahlenförmige Ausläufer sind ein hochgradig suspektes morphologisches Warnzeichen.', 'Sie beweisen allein keine Malignität, besitzen aber hohes diagnostisches Gewicht.', 'Margin', 'Why is a spiculated mass margin important on breast MRI?', 'Radiating extensions are a highly suspicious morphological warning sign.', 'They do not prove malignancy alone but carry substantial diagnostic weight.', 'حاشیه', 'چرا حاشیه Spiculated در Mass پستان اهمیت دارد؟', 'امتدادهای شعاعی یک علامت مورفولوژیک بسیار مشکوک هستند.', 'به‌تنهایی بدخیمی را اثبات نمی‌کنند، اما وزن تشخیصی بالایی دارند.'],
  ['Enhancement', 'Welche Kombination morphologischer Mass-Merkmale ist in der Mamma-MRT besonders suspekt?', 'Irreguläre Form plus irregulärer/spikulierter Rand plus heterogenes oder Rim Enhancement.', 'Das Zusammentreffen mehrerer suspekter Merkmale ist aussagekräftiger als ein Einzelzeichen.', 'Enhancement', 'Which combination of mass features is particularly suspicious on breast MRI?', 'Irregular shape plus irregular/spiculated margin plus heterogeneous or rim enhancement.', 'Combining several suspicious features is more informative than a single sign.', 'Enhancement', 'کدام ترکیب ویژگی‌های Mass در MRI پستان بسیار مشکوک است؟', 'شکل Irregular همراه با حاشیه Irregular/Spiculated و Heterogeneous یا Rim Enhancement.', 'هم‌زمانی چند ویژگی مشکوک از یک علامت منفرد ارزشمندتر است.'],
  ['Fibroadenom', 'Welche Bedeutung haben Dark Internal Septations in einer sonst benign imponierenden Mass?', 'Sie sind ein klassisches hilfreiches Zeichen eines Fibroadenoms.', 'Die übrige Morphologie muss in die Bewertung einbezogen werden.', 'Fibroadenoma', 'What is the significance of dark internal septations in an otherwise benign-appearing mass?', 'They are a classic helpful sign of fibroadenoma.', 'The remaining morphology must also be considered.', 'فیبروآدنوم', 'Dark Internal Septations در یک Mass با ظاهر خوش‌خیم چه اهمیتی دارند؟', 'نشانه کلاسیک و کمک‌کننده فیبروآدنوم هستند.', 'سایر ویژگی‌های مورفولوژیک نیز باید در ارزیابی لحاظ شوند.'],
  ['NME', 'Welche zwei Merkmalsgruppen beschreiben ein Non-Mass Enhancement in der Mamma-MRT?', 'Distribution und internes Enhancement-Muster.', 'NME bildet keine klar abgrenzbare dreidimensionale Mass.', 'NME', 'Which two feature groups describe non-mass enhancement on breast MRI?', 'Distribution and internal enhancement pattern.', 'NME does not form a clearly defined three-dimensional mass.', 'NME', 'Non-Mass Enhancement در MRI پستان با کدام دو گروه ویژگی توصیف می‌شود؟', 'توزیع و الگوی Enhancement داخلی.', 'NME یک Mass سه‌بعدی مشخص تشکیل نمی‌دهد.'],
  ['NME – Verteilung', 'Welche Verteilungskategorien werden bei einem NME in der Mamma-MRT unterschieden?', 'Fokal, linear, segmental, regional, mehrere Regionen und diffus.', 'Die segmentale Verteilung folgt häufig einem Gangsystem und ist suspekter.', 'NME distribution', 'Which distribution categories are distinguished for NME on breast MRI?', 'Focal, linear, segmental, regional, multiple regions and diffuse.', 'Segmental distribution often follows a ductal system and is more suspicious.', 'توزیع NME', 'در NME پستان کدام دسته‌های توزیع تفکیک می‌شوند؟', 'Focal، Linear، Segmental، Regional، چند ناحیه و Diffuse.', 'توزیع Segmental اغلب از یک سیستم مجرایی پیروی می‌کند و مشکوک‌تر است.'],
  ['NME – Muster', 'Welche internen Anreicherungsmuster werden bei einem NME in der Mamma-MRT unterschieden?', 'Homogen, heterogen, klumpig und gruppiert ringförmig.', 'Klumpige und besonders gruppiert-ringförmige Muster sind suspekter.', 'NME pattern', 'Which internal enhancement patterns are distinguished for NME on breast MRI?', 'Homogeneous, heterogeneous, clumped and clustered ring.', 'Clumped and especially clustered-ring patterns are more suspicious.', 'الگوی NME', 'در NME پستان کدام الگوهای Enhancement داخلی تفکیک می‌شوند؟', 'همگن، ناهمگن، Clumped و Clustered Ring.', 'الگوهای Clumped و به‌ویژه Clustered Ring مشکوک‌تر هستند.'],
  ['DCIS', 'Welche NME-Kombination in der Mamma-MRT sollte besonders an DCIS denken lassen?', 'Segmentale Distribution mit Clumped oder Clustered-Ring Enhancement.', 'Sie kann einem malignen duktalen Prozess entsprechen.', 'DCIS', 'Which NME combination on breast MRI should particularly suggest DCIS?', 'Segmental distribution with clumped or clustered-ring enhancement.', 'It may represent a malignant ductal process.', 'DCIS', 'کدام ترکیب NME در MRI پستان باید بیشتر DCIS را مطرح کند؟', 'توزیع Segmental همراه با Clumped یا Clustered-Ring Enhancement.', 'این ترکیب می‌تواند بیانگر فرایند بدخیم مجرایی باشد.'],
  ['Kinetik', 'Welche drei klassischen Signalverläufe werden in der späten Phase der dynamischen Mamma-MRT unterschieden?', 'Type I Persistent, Type II Plateau und Type III Washout.', 'Keine Kurve beweist allein Benignität oder Malignität.', 'Kinetics', 'Which three classic signal courses are distinguished in the delayed phase of dynamic breast MRI?', 'Type I persistent, type II plateau and type III washout.', 'No curve alone proves benignity or malignancy.', 'کینتیک', 'در فاز تأخیری MRI دینامیک پستان کدام سه روند کلاسیک سیگنال تفکیک می‌شوند؟', 'Type I Persistent، Type II Plateau و Type III Washout.', 'هیچ منحنی‌ای به‌تنهایی خوش‌خیمی یا بدخیمی را اثبات نمی‌کند.'],
  ['T2', 'Warum ist ein T2-hyperintenser Mammabefund nicht automatisch benign?', 'Auch maligne Tumoren können T2-hyperintens sein, beispielsweise das muzinöse Karzinom.', 'T2-Signal ist ein Zusatzmerkmal und muss mit den übrigen Parametern korreliert werden.', 'T2', 'Why is a T2-hyperintense breast lesion not automatically benign?', 'Malignant tumours can also be T2 hyperintense, for example mucinous carcinoma.', 'T2 signal is an adjunct and must be correlated with other parameters.', 'T2', 'چرا ضایعه پستان با سیگنال بالا در T2 الزاماً خوش‌خیم نیست؟', 'تومورهای بدخیم مانند کارسینوم موسینوس نیز می‌توانند در T2 پرسیگنال باشند.', 'سیگنال T2 یک ویژگی تکمیلی است و باید با سایر پارامترها تطبیق داده شود.'],
  ['DWI/ADC', 'Welche diagnostische Bedeutung hat DWI hoch plus ADC niedrig bei einer Mammaläsion?', 'Die Kombination unterstützt den Verdacht auf Malignität, ist aber nicht beweisend.', 'ADC ist wegen Überschneidungen ein Zusatzkriterium, kein alleiniger Entscheidungsparameter.', 'DWI/ADC', 'What is the diagnostic significance of high DWI plus low ADC in a breast lesion?', 'The combination supports suspicion of malignancy but is not diagnostic.', 'Because of overlap, ADC is an adjunct rather than a standalone decision parameter.', 'DWI/ADC', 'DWI بالا همراه با ADC پایین در ضایعه پستان چه ارزش تشخیصی دارد؟', 'این ترکیب از احتمال بدخیمی حمایت می‌کند، اما تشخیصی نیست.', 'به‌دلیل هم‌پوشانی، ADC معیار تکمیلی است و نباید به‌تنهایی مبنای تصمیم‌گیری باشد.'],
  ['Algorithmus', 'Wie erfolgt die systematische Gesamtbewertung einer Läsion in der Mamma-MRT?', 'Zuerst als Focus, Mass oder NME einordnen und die Morphologie beschreiben; danach T2, DWI/ADC, Kinetik und Voraufnahmen korrelieren.', 'Aus der Gesamtschau folgt die BI-RADS-Kategorie.', 'Algorithm', 'How is a breast MRI lesion assessed systematically?', 'First classify it as a focus, mass or NME and describe its morphology; then correlate T2, DWI/ADC, kinetics and prior studies.', 'The BI-RADS category follows from the overall assessment.', 'الگوریتم', 'ارزیابی سیستماتیک یک ضایعه در MRI پستان چگونه انجام می‌شود؟', 'ابتدا ضایعه به‌صورت Focus، Mass یا NME طبقه‌بندی و مورفولوژی آن توصیف می‌شود؛ سپس T2، DWI/ADC، کینتیک و بررسی‌های قبلی با هم تطبیق داده می‌شوند.', 'دسته BI-RADS بر اساس جمع‌بندی همه یافته‌ها تعیین می‌شود.'],
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
