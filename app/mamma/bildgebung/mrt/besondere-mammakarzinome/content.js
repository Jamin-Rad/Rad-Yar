const L = (de, en, fa) => ({ de, en, fa })

export const pick = (value, lang) => value?.[lang] ?? value?.de ?? value

export const COPY = {
  title: L('Besondere Mammakarzinome', 'Special Breast Carcinomas', 'کارسینوم‌های ویژه پستان'),
  subtitle: L(
    'MRT-Muster, diagnostische Fallstricke und typische Ausbreitungsformen',
    'MRI patterns, diagnostic pitfalls and characteristic patterns of spread',
    'الگوهای MRI، دام‌های تشخیصی و الگوهای تیپیک گسترش'
  ),
  contents: L('Inhaltsverzeichnis', 'Contents', 'فهرست مطالب'),
  mamma: L('Mamma', 'Breast', 'پستان'),
  imaging: L('Bildgebung', 'Imaging', 'تصویربرداری'),
  breastMri: L('Mamma-MRT', 'Breast MRI', 'MRI پستان'),
  flashcards: L('Flashcards', 'Flashcards', 'فلش‌کارت‌ها'),
}

export const SECTIONS = [
  { id: 'warum', icon: '01', label: L('Warum Sonderformen wichtig sind', 'Why special types matter', 'چرا انواع ویژه مهم‌اند') },
  { id: 'ilc', icon: '02', label: L('Invasiv-lobuläres Karzinom', 'Invasive lobular carcinoma', 'کارسینوم لوبولار مهاجم') },
  { id: 'muzinoes', icon: '03', label: L('Muzinöses Karzinom', 'Mucinous carcinoma', 'کارسینوم موسینوس') },
  { id: 'tnbc', icon: '04', label: L('Triple-negatives Mammakarzinom', 'Triple-negative breast cancer', 'سرطان پستان سه‌گانه منفی') },
  { id: 'inflammatorisch', icon: '05', label: L('Inflammatorisches Mammakarzinom', 'Inflammatory breast cancer', 'سرطان التهابی پستان') },
  { id: 'paget', icon: '06', label: L('Morbus Paget der Mamille', 'Mammary Paget disease', 'بیماری پاژه پستان') },
  { id: 'metaplastisch', icon: '07', label: L('Metaplastisches Karzinom', 'Metaplastic carcinoma', 'کارسینوم متاپلاستیک') },
  { id: 'vergleich', icon: '08', label: L('Vergleich und Befundstrategie', 'Comparison and reporting strategy', 'مقایسه و راهبرد گزارش') },
]
export const INTRO_DIMENSIONS = [
  {
    key: 'morphology',
    title: L('Morphologie', 'Morphology', 'مورفولوژی'),
    text: L('Manche aggressive Tumoren wirken rund oder scharf begrenzt; andere wachsen diffus infiltrativ.', 'Some aggressive tumours appear round or circumscribed; others grow diffusely and infiltratively.', 'برخی تومورهای تهاجمی گرد یا با حاشیه واضح دیده می‌شوند؛ برخی دیگر رشد منتشر و نفوذی دارند.'),
  },
  {
    key: 'multiparametric',
    title: L('T2 · DWI/ADC', 'T2 · DWI/ADC', 'T2 · DWI/ADC'),
    text: L('Muzin, Nekrose, Zellgehalt und Ödem verändern Signal und Diffusion – ohne allein die Diagnose zu beweisen.', 'Mucin, necrosis, cellularity and oedema alter signal and diffusion without proving the diagnosis by themselves.', 'موسین، نکروز، تراکم سلولی و ادم سیگنال و دیفیوژن را تغییر می‌دهند، اما به‌تنهایی تشخیص را اثبات نمی‌کنند.'),
  },
  {
    key: 'extent',
    title: L('Ausbreitung', 'Extent', 'گسترش'),
    text: L('Multifokalität, diffuse Infiltration, Hautbefall oder eine subareoläre Komponente bestimmen das Staging.', 'Multifocality, diffuse infiltration, skin involvement or a subareolar component determine staging.', 'چندکانونی بودن، نفوذ منتشر، درگیری پوست یا جزء ساب‌آرئولار در مرحله‌بندی تعیین‌کننده‌اند.'),
  },
]

export const TUMOURS = {
  ilc: {
    short: 'ILC',
    tone: 'rose',
    title: L('Invasiv-lobuläres Karzinom', 'Invasive lobular carcinoma', 'کارسینوم لوبولار مهاجم'),
    definition: L(
      'Dissoziiert infiltrierendes Karzinom, typischerweise mit Verlust der E-Cadherin-Expression. Das Wachstum kann das normale Stroma durchsetzen, ohne früh eine kompakte Raumforderung zu bilden.',
      'A discohesive infiltrating carcinoma, typically with loss of E-cadherin expression. It may permeate normal stroma without forming a compact mass early on.',
      'کارسینومی با رشد نفوذی و سلول‌های جدا از هم که معمولاً با از دست رفتن بیان E-cadherin همراه است و می‌تواند بدون تشکیل زودهنگام یک توده فشرده در استروما گسترش یابد.'
    ),
    pattern: [
      L('Irreguläre oder spikulierte Mass, Non-Mass Enhancement oder Architekturstörung', 'Irregular or spiculated mass, non-mass enhancement or architectural distortion', 'Mass نامنظم یا اسپیکوله، Non-Mass Enhancement یا دیستورشن معماری'),
      L('Häufig heterogenes, teils nur diskretes oder verzögertes Enhancement', 'Often heterogeneous, sometimes subtle or delayed enhancement', 'Enhancement اغلب ناهمگن و گاهی خفیف یا تأخیری'),
      L('Erhöhte Neigung zu multifokalem, multizentrischem oder bilateralem Befall', 'Greater tendency toward multifocal, multicentric or bilateral disease', 'تمایل بیشتر به درگیری چندکانونی، چندمرکزی یا دوطرفه'),
    ],
    pitfalls: [
      L('Größe und Ausdehnung können in Mammographie und Sonographie unterschätzt werden.', 'Size and extent may be underestimated on mammography and ultrasound.', 'اندازه و وسعت ضایعه ممکن است در ماموگرافی و سونوگرافی کمتر از واقع برآورد شود.'),
      L('Fehlende ausgeprägte KM-Aufnahme schließt ILC nicht aus.', 'Lack of avid enhancement does not exclude ILC.', 'نبود Enhancement شدید، ILC را رد نمی‌کند.'),
      L('Zusatzherde vor Therapieänderung gezielt korrelieren und histologisch sichern.', 'Correlate and sample additional lesions before changing treatment.', 'پیش از تغییر درمان، کانون‌های اضافی باید هدفمند تطبیق داده و از نظر بافت‌شناسی تأیید شوند.'),
    ],
    remember: L('Bei ILC beantwortet die MRT vor allem die Frage nach der tatsächlichen Ausdehnung.', 'In ILC, MRI is particularly valuable for defining true disease extent.', 'در ILC ارزش اصلی MRI تعیین وسعت واقعی بیماری است.'),
  },
  muzinoes: {
    short: L('Muzinös', 'Mucinous', 'موسینوس'),
    tone: 'blue',
    title: L('Muzinöses Karzinom', 'Mucinous carcinoma', 'کارسینوم موسینوس'),
    definition: L(
      'Tumor mit extrazellulären Muzinseen. Reine und gemischte Formen unterscheiden sich biologisch und können auch bildmorphologisch variieren.',
      'A tumour containing extracellular pools of mucin. Pure and mixed forms differ biologically and may also vary in imaging appearance.',
      'توموری حاوی مخازن موسین خارج‌سلولی؛ انواع خالص و مختلط از نظر زیستی و تصویربرداری می‌توانند متفاوت باشند.'
    ),
    pattern: [
      L('Häufig rund, oval oder lobuliert und relativ scharf begrenzt', 'Often round, oval or lobulated and relatively circumscribed', 'اغلب گرد، بیضی یا لوبوله با حاشیه نسبتاً واضح'),
      L('Typischerweise deutlich T2-hyperintens durch hohen Muzingehalt', 'Typically markedly T2 hyperintense because of abundant mucin', 'به‌طور تیپیک به‌علت موسین فراوان در T2 بسیار پرسیگنال'),
      L('Oft persistentes oder allmähliches Enhancement; zellreichere Anteile können kräftiger und heterogener anreichern', 'Often persistent or gradual enhancement; more cellular components may enhance more avidly and heterogeneously', 'اغلب Enhancement تدریجی یا Persistent؛ بخش‌های پرسلول‌تر ممکن است شدیدتر و ناهمگن‌تر Enhancement نشان دهند'),
    ],
    pitfalls: [
      L('Kann wegen T2-Hyperintensität und glatter Kontur wie ein Fibroadenom wirken.', 'It may mimic a fibroadenoma because of T2 hyperintensity and smooth contours.', 'به‌دلیل پرسیگنالی T2 و کانتور صاف می‌تواند شبیه فیبروآدنوم باشد.'),
      L('Ein hoher ADC kann durch Muzin erklärt sein und darf nicht isoliert beruhigen.', 'A high ADC may reflect mucin and must not be reassuring in isolation.', 'ADC بالا ممکن است ناشی از موسین باشد و به‌تنهایی نباید اطمینان‌بخش تلقی شود.'),
      L('Gemischte Formen können weniger typisch und biologisch ungünstiger erscheinen.', 'Mixed forms may appear less typical and behave less favourably.', 'انواع مختلط ممکن است ظاهر کمتر تیپیک و رفتار زیستی نامطلوب‌تری داشته باشند.'),
    ],
    remember: L('T2-hell bedeutet wasser- oder muzinhaltig – nicht automatisch benign.', 'T2 bright means water- or mucin-rich, not automatically benign.', 'پرسیگنال بودن در T2 به معنی محتوای آب یا موسین است، نه الزاماً خوش‌خیمی.'),
  },
  tnbc: {
    short: 'TNBC',
    tone: 'amber',
    title: L('Triple-negatives Mammakarzinom', 'Triple-negative breast cancer', 'سرطان پستان سه‌گانه منفی'),
    definition: L(
      'Molekularer beziehungsweise immunhistochemischer Phänotyp ohne Expression von ER und PR sowie ohne HER2-Überexpression – keine eigene histologische Form.',
      'A molecular or immunohistochemical phenotype lacking ER and PR expression and HER2 overexpression; it is not a distinct histological type.',
      'فنوتیپ مولکولی یا ایمونوهیستوشیمیایی بدون بیان ER و PR و بدون بیش‌بیانی HER2؛ نه یک نوع بافت‌شناختی مستقل.'
    ),
    pattern: [
      L('Häufig runde oder ovale Mass mit relativ scharfem Rand trotz aggressiver Biologie', 'Often a round or oval mass with a relatively circumscribed margin despite aggressive biology', 'اغلب Mass گرد یا بیضی با حاشیه نسبتاً واضح، با وجود زیست‌شناسی تهاجمی'),
      L('Thick Rim Enhancement, zentrale Nekrose und intratumorale T2-Hyperintensität', 'Thick rim enhancement, central necrosis and intratumoral T2 hyperintensity', 'Thick Rim Enhancement، نکروز مرکزی و پرسیگنالی داخل‌توموری در T2'),
      L('Peritumorales Ödem und häufig rasche initiale KM-Aufnahme', 'Peritumoral oedema and often rapid initial enhancement', 'ادم پری‌تومورال و اغلب Enhancement سریع در فاز اولیه'),
    ],
    pitfalls: [
      L('Die glatte Kontur kann fälschlich benign wirken.', 'The smooth contour may falsely appear benign.', 'کانتور صاف ممکن است به‌اشتباه خوش‌خیم به نظر برسد.'),
      L('Nekrose kann eine komplex-zystische Läsion oder einen Abszess imitieren.', 'Necrosis may mimic a complex cystic lesion or abscess.', 'نکروز می‌تواند ضایعه کمپلکس کیستیک یا آبسه را تقلید کند.'),
      L('Das MRT-Muster kann den Rezeptorstatus nicht ersetzen.', 'The MRI pattern cannot replace receptor testing.', 'الگوی MRI جایگزین تعیین وضعیت گیرنده‌ها نیست.'),
    ],
    remember: L('Benigne Form ist nicht gleichbedeutend mit benigner Biologie.', 'Benign shape does not equal benign biology.', 'شکل ظاهراً خوش‌خیم به معنی زیست‌شناسی خوش‌خیم نیست.'),
  },
  inflammatorisch: {
    short: 'IBC',
    tone: 'red',
    title: L('Inflammatorisches Mammakarzinom', 'Inflammatory breast cancer', 'سرطان التهابی پستان'),
    definition: L(
      'Klinisch definierte, aggressive Erkrankung mit rasch aufgetretenem Erythem und Ödem beziehungsweise Peau d’orange. Eine diskrete oder fehlende Mass schließt sie nicht aus.',
      'A clinically defined aggressive disease with rapid-onset erythema and oedema or peau d’orange. A subtle or absent mass does not exclude it.',
      'بیماری تهاجمی با تعریف بالینی شامل شروع سریع اریتم و ادم یا نمای پوست پرتقالی؛ وجود Mass واضح برای تشخیص الزامی نیست.'
    ),
    pattern: [
      L('Diffuse Hautverdickung und Haut-Enhancement', 'Diffuse skin thickening and skin enhancement', 'ضخیم‌شدگی منتشر پوست و Enhancement پوستی'),
      L('T2-hyperintenses Ödem, verdickte Trabekel und häufig heterogenes diffuses NME', 'T2-hyperintense oedema, thickened trabeculae and often heterogeneous diffuse NME', 'ادم پرسیگنال در T2، ضخیم‌شدگی ترابکول‌ها و اغلب NME منتشر و ناهمگن'),
      L('Mass, Multifokalität und suspekte axilläre oder interne mammäre Lymphknoten möglich', 'A mass, multifocal disease and suspicious axillary or internal mammary nodes may be present', 'امکان وجود Mass، بیماری چندکانونی و غدد لنفاوی آگزیلاری یا ماماری داخلی مشکوک'),
    ],
    pitfalls: [
      L('Mastitis und Abszess können ein ähnliches Bild erzeugen.', 'Mastitis and abscess may look similar.', 'ماستیت و آبسه می‌توانند نمای مشابهی ایجاد کنند.'),
      L('Fehlende fokale Mass darf die Abklärung nicht verzögern.', 'Absence of a focal mass must not delay evaluation.', 'نبود Mass کانونی نباید باعث تأخیر در بررسی شود.'),
      L('Die Diagnose entsteht aus Klinik, Bildgebung und Gewebe – nicht aus der MRT allein.', 'Diagnosis integrates clinical findings, imaging and tissue sampling, not MRI alone.', 'تشخیص حاصل ترکیب یافته‌های بالینی، تصویربرداری و نمونه‌برداری است، نه MRI به‌تنهایی.'),
    ],
    remember: L('Bei rascher entzündlicher Klinik ist IBC ein onkologischer Notfall bis zum Beweis des Gegenteils.', 'With rapidly developing inflammatory signs, treat IBC as an oncologic emergency until excluded.', 'در علائم التهابی با شروع سریع، تا زمان رد شدن باید IBC را یک اورژانس انکولوژیک دانست.'),
  },
  paget: {
    short: 'Paget',
    tone: 'violet',
    title: L('Morbus Paget der Mamille', 'Mammary Paget disease', 'بیماری پاژه پستان'),
    definition: L(
      'Intraepidermale Ausbreitung maligner Zellen im Mamillen-Areola-Komplex, häufig mit zugrunde liegendem DCIS oder invasivem Karzinom.',
      'Intraepidermal spread of malignant cells in the nipple–areolar complex, often associated with underlying DCIS or invasive carcinoma.',
      'گسترش داخل‌اپیدرمی سلول‌های بدخیم در مجموعه نوک پستان–آرئول که اغلب با DCIS یا کارسینوم مهاجم زمینه‌ای همراه است.'
    ),
    pattern: [
      L('Asymmetrische Verdickung und pathologisches Enhancement der Mamille oder Areola', 'Asymmetric thickening and abnormal enhancement of the nipple or areola', 'ضخیم‌شدگی نامتقارن و Enhancement غیرطبیعی نوک پستان یا آرئول'),
      L('Subareoläre Mass oder lineares/segmentales NME als Zeichen einer zugrunde liegenden Tumorkomponente', 'A subareolar mass or linear/segmental NME indicating an underlying tumour component', 'Mass ساب‌آرئولار یا NME خطی/سگمنتال به‌عنوان نشانه جزء توموری زمینه‌ای'),
      L('Mamillenretraktion oder duktale Veränderungen können hinzukommen', 'Nipple retraction or ductal changes may coexist', 'ممکن است رتراکسیون نوک پستان یا تغییرات مجرایی همراه باشد'),
    ],
    pitfalls: [
      L('Ein ekzematöser Befund kann als benigne Dermatitis fehlgedeutet werden.', 'An eczematous lesion may be mistaken for benign dermatitis.', 'ضایعه اگزمایی ممکن است با درماتیت خوش‌خیم اشتباه شود.'),
      L('Normale Mammographie oder MRT schließt Paget nicht sicher aus.', 'Normal mammography or MRI does not reliably exclude Paget disease.', 'ماموگرافی یا MRI طبیعی، بیماری پاژه را با اطمینان رد نمی‌کند.'),
      L('Bei persistierender einseitiger Mamillenveränderung ist die klinische Biopsie entscheidend.', 'Persistent unilateral nipple change requires clinical biopsy.', 'در تغییر پایدار و یک‌طرفه نوک پستان، بیوپسی بالینی تعیین‌کننده است.'),
    ],
    remember: L('Die MRT sucht die intramammäre Ausdehnung; die Mamillenbiopsie stellt die Diagnose.', 'MRI maps intramammary extent; nipple biopsy establishes the diagnosis.', 'MRI وسعت داخل پستان را مشخص می‌کند؛ تشخیص با بیوپسی نوک پستان انجام می‌شود.'),
  },
  metaplastisch: {
    short: L('Metaplastisch', 'Metaplastic', 'متاپلاستیک'),
    tone: 'cyan',
    title: L('Metaplastisches Karzinom', 'Metaplastic carcinoma', 'کارسینوم متاپلاستیک'),
    definition: L(
      'Seltene heterogene Gruppe invasiver Karzinome mit plattenepithelialer und/oder mesenchymaler Differenzierung; häufig triple-negativer Phänotyp.',
      'A rare heterogeneous group of invasive carcinomas with squamous and/or mesenchymal differentiation, often with a triple-negative phenotype.',
      'گروهی نادر و ناهمگون از کارسینوم‌های مهاجم با تمایز سنگفرشی و/یا مزانشیمی که اغلب فنوتیپ سه‌گانه منفی دارند.'
    ),
    pattern: [
      L('Oft große, rasch wachsende Mass mit runder, ovaler oder irregulärer Form', 'Often a large rapidly growing mass with round, oval or irregular shape', 'اغلب Mass بزرگ و سریع‌الرشد با شکل گرد، بیضی یا نامنظم'),
      L('Heterogen hohes T2-Signal durch Nekrose, Zysten, Blutung oder Matrix', 'Heterogeneously high T2 signal from necrosis, cystic change, haemorrhage or matrix', 'سیگنال ناهمگن و بالا در T2 به‌علت نکروز، تغییرات کیستیک، خونریزی یا ماتریکس'),
      L('Häufig Thick Rim Enhancement und große nicht anreichernde Anteile', 'Often thick rim enhancement and large non-enhancing components', 'اغلب Thick Rim Enhancement و بخش‌های وسیع بدون Enhancement'),
    ],
    pitfalls: [
      L('Kann einen Abszess, ein Hämatom, einen Phyllodestumor oder ein Sarkom imitieren.', 'It may mimic an abscess, haematoma, phyllodes tumour or sarcoma.', 'می‌تواند آبسه، هماتوم، تومور فیلودس یا سارکوم را تقلید کند.'),
      L('Ein kleines Biopsat kann die heterogene Histologie unvollständig erfassen.', 'A small biopsy may incompletely sample the heterogeneous histology.', 'نمونه بیوپسی کوچک ممکن است ناهمگنی بافت‌شناختی را کامل نشان ندهد.'),
      L('Radiologisch-pathologische Diskordanz verlangt erneute Probengewinnung.', 'Radiologic–pathologic discordance requires repeat sampling.', 'عدم تطابق رادیولوژی و پاتولوژی نیازمند نمونه‌برداری مجدد است.'),
    ],
    remember: L('Groß, nekrotisch und scheinbar glatt begrenzt kann dennoch hochaggressiv sein.', 'A large necrotic and seemingly circumscribed lesion may still be highly aggressive.', 'ضایعه بزرگ، نکروتیک و ظاهراً با حاشیه واضح می‌تواند بسیار تهاجمی باشد.'),
  },
}

export const COMPARISON_ROWS = [
  { tumour: TUMOURS.ilc.title, pattern: L('Spikulierte Mass oder infiltratives NME', 'Spiculated mass or infiltrative NME', 'Mass اسپیکوله یا NME نفوذی'), pitfall: L('Ausdehnung unterschätzt', 'Extent underestimated', 'برآورد کمتر از واقع وسعت'), key: L('Multifokalität aktiv suchen', 'Actively search for multifocality', 'جست‌وجوی فعال چندکانونی بودن') },
  { tumour: TUMOURS.muzinoes.title, pattern: L('T2-hell, oft glatt begrenzt', 'T2 bright, often circumscribed', 'پرسیگنال T2، اغلب با حاشیه واضح'), pitfall: L('Fibroadenom-Mimik', 'Fibroadenoma mimic', 'تقلید فیبروآدنوم'), key: L('T2 ist kein Benignitätsbeweis', 'T2 is not proof of benignity', 'T2 دلیل قطعی خوش‌خیمی نیست') },
  { tumour: TUMOURS.tnbc.title, pattern: L('Rund/oval, Thick Rim, Nekrose', 'Round/oval, thick rim, necrosis', 'گرد/بیضی، Thick Rim، نکروز'), pitfall: L('Benigne wirkender Rand', 'Benign-appearing margin', 'حاشیه ظاهراً خوش‌خیم'), key: L('Biologie schlägt Form', 'Biology can trump shape', 'زیست‌شناسی بر شکل غلبه می‌کند') },
  { tumour: TUMOURS.inflammatorisch.title, pattern: L('Haut + Ödem + diffuses NME', 'Skin + oedema + diffuse NME', 'پوست + ادم + NME منتشر'), pitfall: L('Mastitis-Mimik', 'Mastitis mimic', 'تقلید ماستیت'), key: L('Klinische Diagnose, rasch handeln', 'Clinical diagnosis; act rapidly', 'تشخیص بالینی؛ اقدام سریع') },
  { tumour: TUMOURS.paget.title, pattern: L('Mamillen-Enhancement ± subareoläre Läsion', 'Nipple enhancement ± subareolar lesion', 'Enhancement نوک پستان ± ضایعه ساب‌آرئولار'), pitfall: L('Ekzem-Mimik', 'Eczema mimic', 'تقلید اگزما'), key: L('Biopsie trotz negativer Bildgebung', 'Biopsy despite negative imaging', 'بیوپسی با وجود تصویربرداری منفی') },
  { tumour: TUMOURS.metaplastisch.title, pattern: L('Groß, T2-heterogen, nekrotisch', 'Large, T2 heterogeneous, necrotic', 'بزرگ، T2 ناهمگن، نکروتیک'), pitfall: L('Abszess/Sarkom-Mimik', 'Abscess/sarcoma mimic', 'تقلید آبسه/سارکوم'), key: L('Diskordanz nicht akzeptieren', 'Do not accept discordance', 'عدم تطابق را نپذیرید') },
]

export const REPORT_STEPS = [
  {
    label: L('Einordnen', 'Classify', 'طبقه‌بندی'),
    text: L('Mass, NME, Haut-/Mamillenbefall oder Kombination?', 'Mass, NME, skin/nipple involvement or a combination?', 'Mass، NME، درگیری پوست/نوک پستان یا ترکیبی از آن‌ها؟'),
  },
  {
    label: L('Ausdehnung', 'Map extent', 'تعیین وسعت'),
    text: L('Ipsilateral multifokal/multizentrisch, kontralateral, Thoraxwand und Lymphknoten beurteilen.', 'Assess ipsilateral multifocal/multicentric disease, the contralateral breast, chest wall and nodes.', 'درگیری چندکانونی/چندمرکزی همان‌طرف، پستان مقابل، دیواره قفسه سینه و غدد لنفاوی را بررسی کنید.'),
  },
  {
    label: L('Korrelation', 'Correlate', 'تطبیق'),
    text: L('Morphologie, T2, DWI/ADC, Kinetik, Klinik und Histologie zusammenführen.', 'Integrate morphology, T2, DWI/ADC, kinetics, clinical findings and histology.', 'مورفولوژی، T2، DWI/ADC، کینتیک، یافته‌های بالینی و بافت‌شناسی را یکپارچه کنید.'),
  },
  {
    label: L('Diskordanz', 'Resolve discordance', 'رفع عدم تطابق'),
    text: L('Bei Widerspruch zwischen Bildgebung und Pathologie gezielte Re-Biopsie oder Exzision empfehlen.', 'If imaging and pathology disagree, recommend targeted repeat biopsy or excision.', 'در صورت عدم تطابق تصویربرداری و پاتولوژی، بیوپسی مجدد هدفمند یا اکسیزیون توصیه کنید.'),
  },
]
