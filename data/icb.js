// ── Intrazerebrale Blutung (ICB) ─────────────────────────────────────────────
// Alle Inhalte: Lesson, MCQs, Flashcards, Lernfälle

const L = (de, en, fa) => ({ de, en, fa })

// ── LESSON ───────────────────────────────────────────────────────────────────

export const ICB_LESSON = {
  pdfSourcePages: [18,21], // physical Gehirn.pdf pages inspected for this source slice

  toc: L('Inhaltsverzeichnis', 'Contents', 'فهرست مطالب'),
  breadcrumbArea: L('Kopf', 'Head', 'سر'),
  breadcrumbCurrent: L(
    'Vaskuläre Erkrankungen · Intrazerebrale Blutung',
    'Vascular diseases · Intracerebral haemorrhage',
    'بیماری‌های عروقی · خونریزی داخل مغزی'
  ),
  title: L('Intrazerebrale Blutung', 'Intracerebral Haemorrhage', 'خونریزی داخل مغزی'),
  subtitle: L(
    'CT-Stadien, MRT-Signalverhalten, Swirl-/Spot-Sign und Differenzialdiagnostik',
    'CT stages, MRI signal evolution, swirl/spot sign and differential diagnosis',
    'مراحل CT، سیر سیگنال MRI، علامت Swirl/Spot و تشخیص افتراقی'
  ),
  sourceLabel: 'Dr. Zia',
  actionMcq: 'MCQ',
  actionFlash: L('Flashcards', 'Flashcards', 'فلش‌کارت'),
  keyLabel: L('Merke', 'Key point', 'نکته مهم'),
  caveLabel: L('CAVE', 'Caution', 'احتیاط'),
  openCase: L('Fall in Radiopaedia öffnen', 'Open case in Radiopaedia', 'باز کردن کیس در Radiopaedia'),
  sections: [
    { id: 'klinik', label: L('Klinik & Ätiologie', 'Clinical & aetiology', 'بالین و علت‌شناسی'), icon: '🩸' },
    { id: 'ct', label: L('CT-Diagnostik', 'CT diagnosis', 'تشخیص CT'), icon: '🖥️' },
    { id: 'mrt', label: L('MRT-Signalverhalten', 'MRI signal evolution', 'سیر سیگنال MRI'), icon: '🧲' },
    { id: 'sequenzen', label: L('Sequenzen & Praxis', 'Sequences & practice', 'سکانس‌ها و کاربرد بالینی'), icon: '📋' },
    { id: 'faelle', label: L('Fallbeispiele', 'Cases', 'نمونه کیس‌ها'), icon: '🔬' },
    { id: 'takehome', label: L('Take home message', 'Take-home messages', 'نکات کلیدی'), icon: '💡' },
  ],
  heroCards: [
    {
      value: '50–80',
      label: L('HU akut', 'HU acute', 'HU حاد'),
      text: L('Frisches Blut ist nativ-CT hyperdens – das wichtigste erste Zeichen.', 'Fresh blood is hyperattenuating on NCCT — the key first sign.', 'خون تازه در CT بدون کنتراست هایپردنس است — اولین علامت کلیدی.'),
    },
    {
      value: 'T1↑',
      label: L('Früh subakut', 'Early subacute', 'اولیه زیرحاد'),
      text: L('T1-Hyperintensität kann mit Met-Hb im subakuten Verlauf auftreten; der genaue Zeitpunkt ist variabel.', 'T1 hyperintensity may occur with metHb during the subacute course; its exact timing is variable.', 'پرسیگنال‌شدن T1 ممکن است همراه مت‌هموگلوبین در سیر زیرحاد رخ دهد؛ زمان دقیق آن متغیر است.'),
    },
    {
      value: 'SWI',
      label: L('Chronisch sensitiv', 'Chronic detection', 'تشخیص مزمن'),
      text: L('SWI/T2* ist besonders sensitiv für kleine alte Blutprodukte und einen Suszeptibilitätsrand.', 'SWI/T2* is particularly sensitive to small old blood products and a susceptibility rim.', 'SWI/T2* برای محصولات خونی قدیمی کوچک و حاشیهٔ susceptibility حساس‌تر است.'),
    },
  ],

  // ── Section 1: Klinik & Ätiologie ─────────────────────────────────────────
  klinik: {
    title: L('Klinik & Ätiologie', 'Clinical features & aetiology', 'تظاهرات بالینی و علت‌شناسی'),
    lead: L(
      'Die ICB ist eine Einblutung ins Hirnparenchym. Sie macht etwa 10–15 % aller Schlaganfälle aus und hat eine 30-Tage-Mortalität von rund 40 %. Die genaue Ätiologie bestimmt Lokalisation, Verlauf und Therapie.',
      'ICB is bleeding into the brain parenchyma. It accounts for roughly 10–15 % of all strokes and carries a 30-day mortality of around 40 %. The aetiology determines location, course and treatment.',
      'ICB خونریزی داخل پارانشیم مغز است. حدود ۱۰-۱۵٪ از تمام سکته‌ها را تشکیل داده و مرگ‌ومیر ۳۰ روزه آن حدود ۴۰٪ است.'
    ),
    definitionTitle: L('Definition', 'Definition', 'تعریف'),
    definitionItems: [
      { title: L('Makroblutung', 'Macrobleed', 'ماکروبلید'), text: L('Durchmesser > 10 mm · klinisch symptomatisch', 'Diameter > 10 mm · clinically symptomatic', 'قطر > ۱۰ میلی‌متر · علامت‌دار بالینی') },
      { title: L('Mikroblutung', 'Microbleed', 'میکروبلید'), text: L('Durchmesser < 10 mm · oft nur auf SWI/T2* sichtbar · Marker für Mikroangiopathie oder CAA', 'Diameter < 10 mm · often visible only on SWI/T2* · marker of small-vessel disease or CAA', 'قطر < ۱۰ میلی‌متر · اغلب فقط روی SWI/T2* قابل رؤیت · نشانگر میکروآنژیوپاتی یا CAA') },
    ],
    aetiologyHeaders: [
      L('Ursache', 'Cause', 'علت'),
      L('Häufigkeit', 'Frequency', 'فراوانی'),
      L('Typische Lokalisation', 'Typical location', 'محل تیپیک'),
    ],
    aetiologyRows: [
      [L('Arterieller Hypertonus', 'Arterial hypertension', 'فشار خون شریانی'), '50–70 %', L('Putamen, Thalamus, Pons, Kleinhirn', 'Putamen, thalamus, pons, cerebellum', 'پوتامن، تالاموس، پونز، مخچه')],
      [L('Zerebrale Amyloidangiopathie (CAA)', 'Cerebral amyloid angiopathy (CAA)', 'آنژیوپاتی آمیلوئید مغزی (CAA)'), '15–20 %', L('Lobär (kortexnah), oft multipel', 'Lobar (cortical), often multiple', 'لوبار (نزدیک کورتکس)، اغلب چندگانه')],
      [L('Orale Antikoagulanzien (OAK)', 'Oral anticoagulants', 'ضدانعقادهای خوراکی'), '4–20 %', L('Meist lobär oder kleines Volumen', 'Usually lobar or small volume', 'معمولاً لوبار یا حجم کوچک')],
      [L('Einblutung in Tumor', 'Haemorrhage into tumour', 'خونریزی درون تومور'), '~5 %', L('Variabel, oft perifokal Ödem > Hämatom', 'Variable, perilesional oedema often > haematoma', 'متغیر، اغلب ادم اطراف > هماتوم')],
      [L('Vaskuläre Malformationen (AVM, Kavernom)', 'Vascular malformations (AVM, cavernoma)', 'مالفورماسیون‌های عروقی (AVM، کاورنوم)'), '1–2 %', L('Variabel, eher jüngere Patienten', 'Variable, younger patients more common', 'متغیر، بیماران جوان‌تر')],
    ],
    cave: L(
      'Ein unverhältnismäßig ausgeprägtes perifokales Ödem kann auf eine sekundäre Ursache wie Tumor oder hämorrhagischen Infarkt hinweisen. Bei jungem Alter, atypischer Lokalisation oder fehlenden Hinweisen auf eine hypertensive Mikroangiopathie sollte eine sekundäre vaskuläre Ursache gezielt erwogen werden; Auswahl und Zeitpunkt der Gefäßbildgebung richten sich nach dem klinisch-radiologischen Kontext.',
      'Disproportionate perilesional oedema may suggest a secondary cause such as tumour or haemorrhagic infarction. In a younger patient, atypical location or absence of small-vessel disease markers, consider a secondary vascular cause; the choice and timing of vascular imaging depend on the clinical and imaging context.',
      'ادم پریفوکال نامتناسب ممکن است علت ثانویه‌ای مانند تومور یا انفارکت هموراژیک را مطرح کند. در بیمار جوان، محل غیرمعمول یا نبود نشانه‌های بیماری عروق کوچک، علت عروقی ثانویه را هدفمند بررسی کنید؛ انتخاب و زمان تصویربرداری عروقی به زمینهٔ بالینی و تصویربرداری بستگی دارد.'
    ),
    key: L(
      'Bei spontaner ICB sind hypertensive Arteriopathie und CAA wichtige Ursachen. Verteilung, Alter, Anamnese und weitere Bildgebungsmarker helfen bei der Einordnung; sekundäre Ursachen müssen im passenden Kontext mitbedacht werden.',
      'In spontaneous ICH, hypertensive arteriopathy and CAA are important causes. Distribution, age, history and other imaging markers help with assessment; consider secondary causes in the appropriate context.',
      'در ICB خودبه‌خودی، آرتریوپاتی هیپرتانسیو و CAA از علل مهم هستند. توزیع، سن، شرح‌حال و سایر نشانگرهای تصویربرداری به ارزیابی کمک می‌کنند؛ علل ثانویه را نیز در زمینهٔ مناسب در نظر بگیرید.'
    ),
  },

  // ── Section 2: CT-Diagnostik ───────────────────────────────────────────────
  ct: {
    title: L('CT-Diagnostik · Stadien und Zeichen', 'CT diagnosis · stages and signs', 'تشخیص CT · مراحل و علائم'),
    lead: L(
      'Die native CCT ist der erste und wichtigste Schritt bei Verdacht auf ICB. Sie ist schnell, sensitiv für akutes Blut und zeigt Hämatomvolumen, Ventrikeleinbruch und perifokales Ödem.',
      'NCCT is the first and most important step when ICB is suspected. It is fast, sensitive for acute blood and shows haematoma volume, intraventricular extension and perilesional oedema.',
      'CT بدون کنتراست اولین و مهم‌ترین قدم در شک به ICB است. سریع بوده، برای خون حاد حساس است و حجم هماتوم، ورود به بطن‌ها و ادم اطراف را نشان می‌دهد.'
    ),
    stagesHeaders: [
      L('Stadium', 'Stage', 'مرحله'),
      L('Zeitraum', 'Timeframe', 'بازه زمانی'),
      L('CT nativ', 'NCCT', 'CT بدون کنتراست'),
      L('CT + KM', 'CT + contrast', 'CT با کنتراست'),
    ],
    stagesRows: [
      [L('Akut', 'Acute', 'حاد'), L('Stunden bis Tage; variabel', 'Hours to days; variable', 'ساعت تا چند روز؛ متغیر'), L('Oft hyperdens (im PDF-Beispiel 50–80 HU); abhängig u. a. von Hämatokrit und Technik', 'Often hyperattenuating (50–80 HU in the PDF example); also depends on haematocrit and technique', 'اغلب پرچگال (در مثال PDF حدود ۵۰ تا ۸۰ HU)؛ وابسته از جمله به هماتوکریت و تکنیک'), L('CTA-Spot-Sign: Kontrastmittelextravasation; Expansionsrisiko, keine Gewissheit', 'CTA spot sign: contrast extravasation; expansion risk, not certainty', 'Spot sign در CTA: خروج ماده حاجب؛ خطر گسترش را مطرح می‌کند، نه قطعیت')],
      [L('Subakut', 'Subacute', 'زیرحاد'), L('Tage bis Wochen; variabel', 'Days to weeks; variable', 'چند روز تا چند هفته؛ متغیر'), L('Dichte nimmt im Verlauf oft ab; kann vorübergehend hirnisodens werden', 'Attenuation often falls over time and may become temporarily isoattenuating to brain', 'دانسیته اغلب با گذشت زمان کم می‌شود و ممکن است موقتاً با پارانشیم هم‌دانسیته شود'), L('Randständige Kontrastmittelaufnahme kann auftreten; unspezifisch', 'Peripheral enhancement may occur; it is nonspecific', 'تقویت محیطی ممکن است دیده شود؛ اختصاصی نیست')],
      [L('Chronisch', 'Chronic', 'مزمن'), L('Wochen bis Monate; variabel', 'Weeks to months; variable', 'چند هفته تا چند ماه؛ متغیر'), L('Hypodense Resorptionshöhle oder Residualveränderungen', 'Hypoattenuating resorption cavity or residual change', 'حفرهٔ جذب کم‌دانسیته یا تغییرات باقی‌مانده'), L('Persistierende Randaufnahme ist möglich und allein nicht diagnostisch', 'Persistent peripheral enhancement is possible and is not diagnostic by itself', 'تقویت محیطی پایدار ممکن است رخ دهد و به‌تنهایی تشخیصی نیست')],
    ],
    signsTitle: L('Wichtige CT-Zeichen', 'Key CT signs', 'علائم مهم CT'),
    signs: [
      {
        title: L('Swirl Sign', 'Swirl Sign', 'Swirl Sign'),
        text: L('Hypodense Areale im hyperdensen Hämatom können einen noch nicht koagulierten Anteil darstellen. Als Heterogenitätszeichen können sie mit Hämatomexpansion assoziiert sein; sie beweisen keine aktuell aktive Blutung.', 'Hypoattenuating areas within a hyperattenuating haematoma may represent an unclotted component. As a heterogeneity marker they may be associated with haematoma expansion; they do not prove active bleeding at the time of imaging.', 'نواحی کم‌دانسیته درون هماتوم پرچگال ممکن است نشان‌دهندهٔ بخش لخته‌نشده باشند. این ناهمگنی می‌تواند با گسترش هماتوم ارتباط داشته باشد، اما خونریزی فعال در زمان تصویربرداری را ثابت نمی‌کند.')
      },
      {
        title: L('Spot Sign (CTA)', 'Spot Sign (CTA)', 'علامت اسپات در CTA'),
        text: L('Fokaler Kontrastmittelaustritt im Hämatom auf CTA; ein positives Spot Sign ist mit Hämatomexpansion assoziiert. Aussagekraft und Vorhersagewerte hängen unter anderem vom CTA-Zeitpunkt ab und erlauben keine sichere Individualprognose.', 'Focal contrast extravasation within the haematoma on CTA; a positive spot sign is associated with haematoma expansion. Its performance and predictive values depend in part on CTA timing and do not provide a certain individual prognosis.', 'خروج کانونی ماده حاجب درون هماتوم در CTA؛ Spot sign مثبت با گسترش هماتوم ارتباط دارد. عملکرد و ارزش پیش‌بینی آن تا حدی به زمان CTA وابسته است و پیش‌آگهی قطعی فردی نمی‌دهد.')
      },
      {
        title: L('Ventrikeleinbruch', 'Intraventricular extension', 'نفوذ به بطن'),
        text: L('Hämatom bricht in das Ventrikelsystem ein → Aufstau, Hydrozephalus, schlechtere Prognose.', 'Haematoma extends into the ventricular system → obstruction, hydrocephalus, worse prognosis.', 'هماتوم به سیستم بطنی نفوذ می‌کند → انسداد، هیدروسفالوس، پیش‌آگهی بدتر.')
      },
    ],
    key: L(
      'Natives CT: frisches Blut ist meist hyperdens. Mit der Resorption nimmt die Dichte ab und kann sich dem Hirnparenchym annähern; Zeitverlauf und HU sind variabel und erlauben keine lineare Datierung. Bei unspezifischer Randanreicherung Differenzialdiagnosen wie Infektion oder Tumor im Kontext prüfen.',
      'On non-contrast CT, fresh blood is usually hyperattenuating. Attenuation falls during resorption and may approach that of brain; timing and HU are variable and do not support linear age dating. If peripheral enhancement is present, assess alternatives such as infection or tumour in context.',
      'در CT بدون کنتراست، خون تازه معمولاً پرچگال است. با جذب هماتوم دانسیته کاهش می‌یابد و ممکن است به دانسیتهٔ پارانشیم مغز نزدیک شود؛ زمان‌بندی و HU متغیرند و برای تعیین خطی سن خونریزی مناسب نیستند. در صورت تقویت محیطی، علل دیگری مانند عفونت یا تومور را در زمینهٔ بالینی بررسی کنید.'
    ),
  },

  // ── Section 3: MRT-Signalverhalten ────────────────────────────────────────
  mrt: {
    title: L('MRT-Signalverhalten · Pathophysiologie', 'MRI signal behaviour · pathophysiology', 'سیر سیگنال MRI · پاتوفیزیولوژی'),
    lead: L(
      'Das MRT-Signal einer ICB ist kein einfaches Befundmuster, sondern spiegelt die biochemische Umwandlung von Hämoglobin wider. Entscheidend ist die Oxidationsstufe des Hämoglobins und die Integrität der Erythrozyten.',
      'The MRI signal of ICB does not follow a simple pattern: it reflects the biochemical conversion of haemoglobin. The oxidation state of haemoglobin and erythrocyte integrity are the key determinants.',
      'سیگنال MRI در ICB یک الگوی ساده نیست، بلکه تبدیل بیوشیمیایی هموگلوبین را منعکس می‌کند. وضعیت اکسیداسیون هموگلوبین و یکپارچگی اریتروسیت‌ها تعیین‌کننده‌های اصلی هستند.'
    ),
    pathophysItems: [
      {
        title: L('Oxy-Hb · hyperakut', 'Oxy-Hb · hyperacute', 'Oxy-Hb · فوق‌حاد'),
        text: L('Oxy-Hb ist diamagnetisch. Das typische Signalmodell beschreibt T1 als iso bis leicht hypointens und T2 als hyperintens; frühe Blutung kann in suszeptibilitätsgewichteten Sequenzen dennoch sichtbar sein. Einzelne Sequenzen und das exakte Alter reichen nicht allein zur Stadieneinteilung.', 'Oxyhaemoglobin is diamagnetic. The typical signal model describes T1 as iso- to mildly hypointense and T2 as hyperintense; early haemorrhage may still be visible on susceptibility-sensitive sequences. A single sequence or exact age alone is insufficient for staging.', 'اکسی‌هموگلوبین دیامغناطیس است. الگوی معمول، T1 ایزو تا کمی کم‌سیگنال و T2 پرسیگنال را توصیف می‌کند؛ با این حال خونریزی زودرس ممکن است در توالی‌های حساس به susceptibility هم دیده شود. یک توالی یا سن دقیق به‌تنهایی برای مرحله‌بندی کافی نیست.')
      },
      {
        title: L('Deoxy-Hb · akut', 'Deoxy-Hb · acute', 'Deoxy-Hb · حاد'),
        text: L('Paramagnetisch + intrazellulär kompartimentiert → starker T2*-Effekt (Blooming), aber KEINE T1-Verkürzung, weil Wasser das Eisen nicht erreicht. T1 iso/hypo, T2 stark hypo.', 'Paramagnetic + compartmentalised intracellularly → strong T2* effect (blooming), but NO T1 shortening because water cannot reach the iron. T1 iso/hypo, T2 markedly hypointense.', "پاراماگنتیک + در داخل سلول محدود → اثر قوی T2* (آرتیفکت شکوفه‌ای (blooming))، اما بدون کوتاه‌شدن T1 زیرا آب به آهن نمی‌رسد. T1 ایزو/هیپو، T2 شدیداً هیپو.")
      },
      {
        title: L('Met-Hb intrazellulär · früh subakut', 'Met-Hb intracellular · early subacute', 'Met-Hb داخل سلولی · زیرحاد اولیه'),
        text: L('Intrazelluläres Met-Hb geht häufig mit T1-Hyperintensität einher; T2 kann dabei noch hypointens sein. Der Übergang erfolgt nicht an einem festen Tag und kann innerhalb eines Hämatoms räumlich variieren.', 'Intracellular metHb is often associated with T1 hyperintensity while T2 may remain hypointense. The transition does not occur on a fixed day and can vary spatially within one haematoma.', 'مت‌هموگلوبین داخل‌سلولی اغلب با پرسیگنال‌شدن T1 همراه است و T2 ممکن است همچنان کم‌سیگنال باشد. این گذار در روز ثابتی رخ نمی‌دهد و می‌تواند در بخش‌های مختلف یک هماتوم متفاوت باشد.')
      },
      {
        title: L('Met-Hb extrazellulär · spät subakut', 'Met-Hb extracellular · late subacute', 'Met-Hb خارج سلولی · زیرحاد دیررس'),
        text: L('Nach der Erythrozytenlyse kann extrazelluläres Met-Hb sowohl T1 als auch T2 hyperintens erscheinen lassen. Dieses bright-bright-Muster ist nicht spezifisch; Suszeptibilität, Verlauf und klinischer Kontext helfen bei der Einordnung.', 'After erythrocyte lysis, extracellular metHb may make both T1 and T2 hyperintense. This bright-bright pattern is nonspecific; susceptibility, interval change and clinical context help with interpretation.', 'پس از لیز اریتروسیت، مت‌هموگلوبین خارج‌سلولی می‌تواند T1 و T2 را پرسیگنال کند. الگوی روشن-روشن اختصاصی نیست؛ susceptibility، تغییرات پیگیری و زمینهٔ بالینی به تفسیر کمک می‌کنند.')
      },
      {
        title: L('Hämosiderin · chronisch', 'Haemosiderin · chronic', 'هموسیدرین · مزمن'),
        text: L('Hämosiderin/Ferritin können als Suszeptibilitätsrand persistieren. SWI/T2* ist besonders sensitiv für solche Residuen und kleine Blutprodukte; ob eine alte größere Blutung im CT noch sichtbar ist, hängt von der Residualmorphologie ab.', 'Haemosiderin/ferritin may persist as a susceptibility rim. SWI/T2* is particularly sensitive to these residues and small blood products; whether a larger old haemorrhage remains visible on CT depends on its residual morphology.', 'هموسیدرین/فریتین ممکن است به‌شکل حاشیهٔ susceptibility باقی بمانند. SWI/T2* برای این بقایا و محصولات خونی کوچک حساس است؛ دیده‌شدن خونریزی قدیمی بزرگ‌تر در CT به مورفولوژی باقی‌مانده بستگی دارد.')
      },
    ],
    sourceFlowchartAlt: L('Originale Tabelle aus Gehirn.pdf, PDF-Seite 20: MRT-Signal einer intrazerebralen Blutung bei 1,5 T in sechs zeitlichen Stadien.', 'Original table from Gehirn.pdf, PDF page 20: MRI signal of intracerebral haemorrhage at 1.5 T across six time stages.', 'جدول اصلی از Gehirn.pdf، صفحهٔ ۲۰ PDF: سیگنال MRI خونریزی داخل‌مغزی در ۱٫۵ تسلا طی شش مرحلهٔ زمانی.'),
    sourceFlowchartCaption: L('Quelle: Gehirn.pdf, PDF-Seite 20 (gedruckte Seite 19). Die Zeitfenster und Signalmerkmale beziehen sich auf 1,5 T und sind ein Orientierungsmodell; Stadiengrenzen sind fließend und können innerhalb eines Hämatoms variieren.', 'Source: Gehirn.pdf, PDF page 20 (printed page 19). The time windows and signal features refer to 1.5 T and are a teaching model; stage boundaries are not sharp and can vary within a haematoma.', 'منبع: Gehirn.pdf، صفحهٔ ۲۰ PDF (صفحهٔ چاپی ۱۹). بازه‌های زمانی و ویژگی‌های سیگنال در منبع به ۱٫۵ تسلا مربوط‌اند و یک مدل آموزشی هستند؛ مرز مراحل قطعی نیست و در بخش‌های مختلف هماتوم تغییر می‌کند.'),
    signalDiagramAlt: L('Schematische Zusammenfassung von T1-, T2-, T2*/SWI- und DWI-Signal über sechs ICB-Stadien.', 'Conceptual summary of T1, T2, T2*/SWI and DWI signal across six ICH stages.', 'خلاصهٔ شماتیک سیگنال T1، T2، T2*/SWI و DWI در شش مرحلهٔ ICB.'),
    cave: L(
      'Die Stadiengrenzen sind fließend und hämatomgrößenabhängig. Die Konversion läuft von peripher nach zentral: Das Zentrum eines großen Hämatoms kann noch akutes Deoxy-Hb zeigen, während die Peripherie bereits Met-Hb aufweist.',
      'Stage boundaries are not sharp and depend on haematoma size. Conversion proceeds from periphery to centre: the centre of a large haematoma may still show acute deoxyHb while the periphery already shows metHb.',
      'مرزهای مراحل قطعی نیستند و به اندازه هماتوم بستگی دارند. تبدیل از محیط به مرکز پیش می‌رود: مرکز یک هماتوم بزرگ ممکن است هنوز Deoxy-Hb حاد نشان دهد در حالی که محیط آن Met-Hb دارد.'
    ),
    key: L(
      'T1-Hyperintensität kann im subakuten Verlauf auftreten, hat aber keinen festen Tagesgrenzwert. Bright–Bright ist unspezifisch: Suszeptibilität, Verlauf und klinischen Kontext gemeinsam beurteilen.',
      'T1 hyperintensity may occur during the subacute course, but it has no fixed day threshold. Bright-bright is nonspecific: assess susceptibility, interval change and clinical context together.',
      'پرسیگنال‌شدن T1 ممکن است در سیر زیرحاد رخ دهد، اما مرز روزانهٔ ثابتی ندارد. الگوی روشن-روشن اختصاصی نیست؛ susceptibility، تغییرات پیگیری و زمینهٔ بالینی را با هم ارزیابی کنید.'
    ),
  },

  // ── Section 4: Sequenzen & Praxis ─────────────────────────────────────────
  sequenzen: {
    title: L('Klinisch wertvolle Sequenzen je Stadium', 'Clinically useful sequences by stage', 'سکانس‌های مفید بالینی بر اساس مرحله'),
    lead: L(
      'Je nach klinischem Kontext und Stadium der Blutung sind unterschiedliche MRT-Sequenzen am aussagekräftigsten. Die Kombination mehrerer Sequenzen erhöht Sicherheit und Staging-Genauigkeit.',
      'Depending on the clinical context and stage of haemorrhage, different MRI sequences are most informative. Combining sequences improves confidence and staging accuracy.',
      'بسته به بافت بالینی و مرحله خونریزی، سکانس‌های مختلف MRI اطلاعات بیشتری می‌دهند. ترکیب چند سکانس اعتماد و دقت مرحله‌بندی را بهبود می‌دهد.'
    ),
    items: [
      {
        title: L('Hyperakut / akut → SWI / T2*', 'Hyperacute / acute → SWI / T2*', 'فوق‌حاد / حاد → SWI / T2*'),
        text: L('Deoxy-Hb kann ein Suszeptibilitätssignal erzeugen. SWI/T2* ergänzt die CT, ersetzt sie bei der Akutdiagnostik aber nicht; Aussagekraft und Sichtbarkeit hängen von Sequenz und Zeitpunkt ab.', 'DeoxyHb can produce susceptibility signal. SWI/T2* complements CT but does not replace it in acute diagnosis; conspicuity depends on sequence and timing.', 'Deoxy-Hb می‌تواند سیگنال susceptibility ایجاد کند. SWI/T2* مکمل CT است، اما در تشخیص حاد جایگزین آن نیست؛ وضوح یافته به سکانس و زمان تصویربرداری بستگی دارد.')
      },
      {
        title: L('Früh subakut → T1 w.o. KM', 'Early subacute → T1 without contrast', 'زیرحاد اولیه → T1 بدون کنتراست'),
        text: L('Intrazelluläres Met-Hb kann T1-hyperintens werden. Das kann im subakuten Verlauf auftreten, erlaubt wegen variabler Übergänge aber keine exakte Datierung; eine periphere Signaländerung kann der zentralen vorausgehen.', 'Intracellular metHb can become T1 hyperintense. This may occur during the subacute course, but variable transitions prevent exact dating; peripheral signal change may precede central change.', 'Met-Hb داخل‌سلولی می‌تواند در T1 پرسیگنال شود. این تغییر ممکن است در سیر زیرحاد رخ دهد، اما گذارهای متغیر اجازهٔ تاریخ‌گذاری دقیق نمی‌دهند؛ تغییر سیگنال محیطی ممکن است زودتر از مرکز رخ دهد.')
      },
      {
        title: L('Spät subakut → T1 + T2 + SWI', 'Late subacute → T1 + T2 + SWI', 'زیرحاد دیررس → T1 + T2 + SWI'),
        text: L('Extrazelluläres Met-Hb kann T1 und T2 hyperintens machen. Dieses Muster ist unspezifisch; Suszeptibilität, Morphologie, Verlauf und klinischer Kontext gehören zur Differenzialdiagnose.', 'Extracellular metHb can make both T1 and T2 hyperintense. This pattern is nonspecific; susceptibility, morphology, interval change and clinical context inform the differential.', 'Met-Hb خارج‌سلولی می‌تواند هر دو سکانس T1 و T2 را پرسیگنال کند. این الگو اختصاصی نیست؛ susceptibility، مورفولوژی، تغییرات پیگیری و زمینهٔ بالینی در تشخیص افتراقی کمک می‌کنند.')
      },
      {
        title: L('Chronisch → SWI / T2* ergänzen', 'Chronic → add SWI / T2*', 'مزمن → افزودن SWI / T2*'),
        text: L('SWI/T2* ist besonders sensitiv für kleine Residuen und Suszeptibilitätsränder. Die CT kann je nach verbliebener Morphologie weiterhin Veränderungen zeigen.', 'SWI/T2* is particularly sensitive to small residues and susceptibility rims. CT may still show changes depending on residual morphology.', 'SWI/T2* برای بقایای کوچک و حاشیه‌های susceptibility حساس است. CT نیز بسته به مورفولوژی باقی‌مانده ممکن است تغییرات را نشان دهد.')
      },
    ],
    ddItems: [
      {
        title: L('Bright–Bright → Melanommetastase?', '"Bright-bright" → melanoma metastasis?', "الگوی روشن-روشن (Bright-Bright) → متاستاز ملانوم؟"),
        text: L('T1/T2-Hyperintensität ist unspezifisch und kann auch bei Melanin oder Fett vorkommen. SWI/T2*, fettunterdrückte Sequenzen, Morphologie, Verlauf und Klinik gemeinsam beurteilen; kein Einzelzeichen ist beweisend.', 'T1/T2 hyperintensity is nonspecific and may also occur with melanin or fat. Assess SWI/T2*, fat-suppressed sequences, morphology, interval change and clinical context together; no single sign is definitive.', 'پرسیگنال‌شدن T1/T2 اختصاصی نیست و ممکن است در ملانین یا چربی نیز دیده شود. SWI/T2*، توالی‌های سرکوب چربی، مورفولوژی، تغییرات پیگیری و زمینهٔ بالینی را با هم ارزیابی کنید؛ هیچ علامت منفردی قطعی نیست.')
      },
      {
        title: L('Ringenhancement → Abszess? Tumor?', 'Ring enhancement → abscess? tumour?', 'حلقوی → آبسه؟ تومور؟'),
        text: L('DWI: Abszess zeigt Diffusionsrestriktion im Zentrum. Bei Tumor ist das Ödem oft größer als die Läsion und überproportional ausgeprägt.', 'DWI: abscess shows central diffusion restriction. In tumour, oedema is often larger than the lesion and disproportionate.', 'DWI: آبسه در مرکز محدودیت دیفیوژن نشان می‌دهد. در تومور، ادم اغلب بزرگ‌تر از ضایعه است.')
      },
    ],
    key: L(
      'Orientierung: CT zuerst bei akuter ICB; SWI/T2* ergänzt die Suszeptibilitätsbeurteilung. T1 kann im subakuten Verlauf hilfreich sein. Sequenzwahl und Datierung immer im klinischen und morphologischen Kontext.',
      'Orientation: CT first for acute ICH; SWI/T2* adds susceptibility assessment. T1 may help during the subacute course. Choose sequences and interpret timing in clinical and morphologic context.',
      'راهنما: در ICB حاد ابتدا CT؛ SWI/T2* ارزیابی susceptibility را تکمیل می‌کند. T1 ممکن است در سیر زیرحاد کمک‌کننده باشد. انتخاب سکانس و تفسیر زمان‌بندی باید در زمینهٔ بالینی و مورفولوژیک انجام شود.'
    ),
  },

  // ── Section 5: Fallbeispiele ──────────────────────────────────────────────
  cases: {
    title: L('Fallbeispiele · Radiopaedia', 'Cases · Radiopaedia', 'نمونه کیس‌ها · Radiopaedia'),
    lead: L(
      'Drei Fälle von Radiopaedia.org illustrieren CT und MRT der ICB in verschiedenen Stadien.',
      'Three Radiopaedia.org cases illustrate CT and MRI of ICB at different stages.',
      'سه کیس از Radiopaedia.org CT و MRI در مراحل مختلف ICB را نشان می‌دهند.'
    ),
  },

  // ── Section 6: Take home ──────────────────────────────────────────────────
  takehome: {
    title: L('Take home message', 'Take-home messages', 'نکات کلیدی'),
    lead: L('Die wichtigsten Merksätze zur ICB.', 'The key take-home points for ICB.', 'مهم‌ترین نکات کلیدی درباره ICB.'),
    items: [
      {
        title: L('CT-Dichte akut', 'Acute CT attenuation', 'دانسیته CT حاد'),
        text: L('Frisches Blut ist oft hyperdens. Bei der Resorption kann die Dichte abnehmen und das Hämatom vorübergehend hirnisodens werden; HU-Werte und Zeitpunkt variieren.', 'Fresh blood is often hyperattenuating. During resorption, attenuation may fall and the haematoma may temporarily become isoattenuating to brain; HU values and timing vary.', 'خون تازه اغلب پرچگال است. هنگام جذب، دانسیته ممکن است کم شود و هماتوم موقتاً با مغز هم‌دانسیته شود؛ مقدار HU و زمان‌بندی متغیر است.')
      },
      {
        title: L('Swirl & Spot Sign', 'Swirl & spot sign', 'علامت چرخش (Swirl sign) و علامت اسپات (Spot sign)'),
        text: L('Swirl- und Spot-Sign können mit Hämatomexpansion assoziiert sein. Beide Zeichen unterstützen die Risikoeinschätzung, beweisen aber nicht allein eine laufende Blutung oder eine sichere Expansion.', 'Swirl and spot signs may be associated with haematoma expansion. Both support risk assessment but do not alone prove ongoing bleeding or certain expansion.', 'علامت Swirl و Spot ممکن است با گسترش هماتوم ارتباط داشته باشند. این دو به ارزیابی خطر کمک می‌کنند، اما به‌تنهایی خونریزی جاری یا گسترش قطعی را ثابت نمی‌کنند.')
      },
      {
        title: L('MRT-Wendepunkt früh subakut', 'MRI turning point – early subacute', 'نقطه عطف MRI — زیرحاد اولیه'),
        text: L('T1-Hyperintensität kann im subakuten Verlauf auftreten, hat aber keinen festen Tagesgrenzwert; die Umwandlung kann an der Peripherie beginnen.', 'T1 hyperintensity may occur during the subacute course but has no fixed day threshold; conversion may begin at the periphery.', 'پرسیگنال‌شدن T1 ممکن است در سیر زیرحاد رخ دهد، اما مرز روزانهٔ ثابتی ندارد؛ تبدیل ممکن است از محیط آغاز شود.')
      },
      {
        title: L('Bright–Bright = Falle', '"Bright-bright" = pitfall', "الگوی روشن-روشن (Bright-Bright) = دام"),
        text: L('T1 und T2 können beide hell sein. Das Muster ist unspezifisch; SWI, Verlauf und klinischer Kontext müssen mitbeurteilt werden.', 'T1 and T2 may both be bright. The pattern is nonspecific; SWI, interval change and clinical context must also be assessed.', 'T1 و T2 ممکن است هر دو روشن باشند. این الگو اختصاصی نیست؛ SWI، تغییرات پیگیری و زمینهٔ بالینی را هم ارزیابی کنید.')
      },
      {
        title: L('SWI für Mikroblutungen', 'SWI for microbleeds', 'SWI برای میکروبلیدها'),
        text: L('SWI ist besonders sensitiv für Mikroblutungen. Verteilungsmuster können eine zugrunde liegende Mikroangiopathie nahelegen, sind aber im klinischen und bildgebenden Kontext zu bewerten.', 'SWI is particularly sensitive for microbleeds. Their distribution may suggest an underlying small-vessel disease but must be assessed in clinical and imaging context.', 'SWI برای میکروبلیدها حساس‌تر است. الگوی توزیع می‌تواند نوعی میکروآنژیوپاتی زمینه‌ای را مطرح کند، اما باید در زمینهٔ بالینی و تصویربرداری ارزیابی شود.')
      },
    ],
  },
}

// ── LEARNING CASES (in der Lernseite) ─────────────────────────────────────────

export const ICB_LEARNING_CASES = [
  {
    id: 'icb-cerebellum-akut',
    // CT axial: hyperdens Kleinhirnblutung rechts – aus dem Lehrmaterial
    images: ['/icb/case-ct-cerebellum-akut.png', '/icb/case-ct-cerebellum-gross.png'],
    url: 'https://radiopaedia.org/articles/intracerebral-haemorrhage?lang=us',
    credit: 'Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0',
    label: L('CT · axial · nativ · akute Kleinhirnblutung', 'CT · axial · NCCT · acute cerebellar haemorrhage', 'CT · اکسیال · بدون کنتراست · خونریزی مخچه حاد'),
    title: L(
      'Hypertensive ICB · Kleinhirn · CT nativ',
      'Hypertensive ICB · Cerebellum · NCCT',
      'ICB هیپرتانسیو · مخچه · CT بدون کنتراست'
    ),
    text: L(
      '72-jährige Patientin mit arterieller Hypertonie, akutem Schwindel und Ataxie. Bild links (akut): Hyperdens imponierende Kleinhirnblutung rechts, ~1 cm, kein perifokales Ödem. Bild rechts (Folge-CT): Zunahme auf ~3 cm mit deutlichem Ödemsaum und beginnender Kompression des 4. Ventrikels – typische Expansion einer hypertensiven ICB.',
      'A 72-year-old woman with hypertension, acute dizziness and ataxia. Left image (acute): hyperattenuating right cerebellar haemorrhage, ~1 cm, no perilesional oedema. Right image (follow-up CT): expansion to ~3 cm with oedema rim and early compression of the 4th ventricle — typical progression of hypertensive ICB.',
      'خانم ۷۲ ساله با فشار خون بالا، سرگیجه حاد و آتاکسی. تصویر چپ (حاد): خونریزی هایپردنس مخچه راست، ~۱ سانتی‌متر. تصویر راست (CT پیگیری): گسترش به ~۳ سانتی‌متر با حلقه ادم و فشار روی بطن چهارم — پیشرفت تیپیک ICB هیپرتانسیو.'
    ),
    alt: L('CT axial akute Kleinhirnblutung hyperdens', 'CT axial acute cerebellar haemorrhage hyperattenuating', 'CT اکسیال خونریزی حاد مخچه هایپردنس'),
  },
  {
    id: 'icb-t1-subakut',
    // T1 MRT subakut: hell (Wendepunkt früh subakut)
    images: ['/icb/case-t1-subakut-bright.jpg', '/icb/case-swi-blooming.jpg'],
    url: 'https://radiopaedia.org/articles/mri-signal-characteristics-of-intracerebral-haemorrhage?lang=us',
    credit: 'Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0',
    label: L('MRT · T1 · früh subakut → SWI · chronisch', 'MRI · T1 · early subacute → SWI · chronic', 'MRI · T1 · زیرحاد اولیه → SWI · مزمن'),
    title: L(
      'MRT-Signalwandel der ICB · T1 hell & SWI-Blooming',
      'MRI signal evolution · T1 bright & SWI blooming',
      "تغییر سیگنال MRI · T1 روشن و آرتیفکت شکوفه‌ای در SWI"
    ),
    text: L(
      'Bild links (T1 nativ): T1-Hyperintensität im subakuten Verlauf. Bild rechts (SWI): Suszeptibilitätssaum. Zeitpunkt und Signalausprägung sind variabel; eine einzelne Sequenz datiert die Blutung nicht sicher.',
      'Left image (T1 without contrast): T1 hyperintensity during the subacute course. Right image (SWI): susceptibility rim. Timing and signal appearance vary; a single sequence cannot reliably date the haemorrhage.',
      'تصویر چپ (T1 بدون کنتراست): پرسیگنال‌شدن T1 در سیر زیرحاد. تصویر راست (SWI): حاشیهٔ susceptibility. زمان و شدت سیگنال متغیر است؛ یک سکانس به‌تنهایی زمان خونریزی را با اطمینان تعیین نمی‌کند.'
    ),
    alt: L('MRT T1 hell subakut ICB und SWI Blooming', 'MRI T1 bright subacute ICB and SWI blooming', "MRI T1 روشن زیرحاد ICB و آرتیفکت شکوفه‌ای در SWI"),
  },
  {
    id: 'icb-mrt-flowchart',
    // MRT-Signalflussdiagramm aus dem Lehrdokument
    image: '/icb/mrt-flowchart.png',
    url: 'https://radiopaedia.org/articles/intracerebral-haemorrhage?lang=us',
    credit: 'Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0',
    label: L('MRT · Signalverlauf · Übersichtsdiagramm', 'MRI · signal evolution · overview chart', 'MRI · سیر سیگنال · نمودار کامل'),
    title: L(
      'MR-Signalverhalten intrazerebraler Blutungen · 1,5 T',
      'MRI signal behaviour of intracerebral haemorrhage · 1.5 T',
      'رفتار سیگنال MRI در خونریزی داخل مغزی · ۱.۵ تسلا'
    ),
    text: L(
      'Übersichtsflussdiagramm: Das Staging der ICB erfolgt durch Bestimmung des Hämoglobinabbauprodukts und der Erythrozytenintegrität. Hyperakut: Oxy-Hb, iso/hypo T1. Akut: Deoxy-Hb, T2 hypo, SWI Blooming. Früh subakut: intraz. Met-Hb → T1 HELL (Wendepunkt). Spät subakut: extraz. Met-Hb → T1+T2 HELL. Chronisch: Hämosiderin → SWI Blooming-Saum persistiert.',
      'Overview flowchart: ICB staging is based on the haemoglobin degradation product and erythrocyte integrity. Hyperacute: oxyHb, iso/hypo T1. Acute: deoxyHb, T2 hypo, SWI blooming. Early subacute: intracellular metHb → T1 BRIGHT (turning point). Late subacute: extracellular metHb → T1+T2 BRIGHT. Chronic: haemosiderin → SWI blooming rim persists.',
      "نمودار کلی: مرحله‌بندی ICB بر اساس محصول تجزیه هموگلوبین و یکپارچگی اریتروسیت است. فوق‌حاد: Oxy-Hb. حاد: Deoxy-Hb، T2 هیپو، آرتیفکت شکوفه‌ای (blooming). زیرحاد اولیه: Met-Hb داخل سلولی → T1 روشن (نقطه عطف). زیرحاد دیررس: Met-Hb خارج سلولی → T1+T2 روشن. مزمن: هموسیدرین → حلقه SWI پایدار."
    ),
    alt: L('MRT Signalflussdiagramm ICB alle Stadien', 'MRI signal flowchart ICB all stages', 'نمودار جریان سیگنال MRI ICB تمام مراحل'),
  },
]

// ── MCQ QUESTIONS (15) ────────────────────────────────────────────────────────

const ICB_QUESTION_SEEDS = [
  {
    id: 'icb-q01',
    question: L('Was unterscheidet eine Makroblutung von einer Mikroblutung?', 'What distinguishes a macrobleed from a microbleed?', 'تفاوت ماکروبلید و میکروبلید چیست؟'),
    options: [
      L('Makroblutung > 10 mm, klinisch relevant; Mikroblutung < 10 mm, oft nur auf SWI sichtbar', 'Macrobleed > 10 mm, clinically significant; microbleed < 10 mm, often visible only on SWI', 'ماکروبلید > ۱۰ میلی‌متر، بالینی مهم؛ میکروبلید < ۱۰ میلی‌متر، اغلب فقط روی SWI'),
      L('Mikroblutung tritt immer lobär auf, Makroblutung immer tief', 'Microbleed always occurs lobarly, macrobleed always deep', 'میکروبلید همیشه لوبار، ماکروبلید همیشه عمقی'),
      L('Makroblutung = venös, Mikroblutung = arteriell', 'Macrobleed = venous, microbleed = arterial', 'ماکروبلید = وریدی، میکروبلید = شریانی'),
      L('Kein klinisch relevanter Unterschied', 'No clinically relevant difference', 'تفاوت بالینی مرتبطی وجود ندارد'),
    ],
    correct: 'A',
    explanation: L(
      'Per Definition sind Makroblutungen > 10 mm und klinisch symptomatisch. Mikroblutungen (< 10 mm) sind häufig asymptomatisch und nur auf suszeptibilitätsgewichteten Sequenzen (SWI/T2*) sichtbar. Sie sind Marker für Mikroangiopathie oder CAA.',
      'By definition macrobleeds are >10 mm and clinically symptomatic. Microbleeds (<10 mm) are often asymptomatic and visible only on susceptibility-weighted sequences (SWI/T2*). They are markers of microangiopathy or CAA.',
      'ماکروبلیدها > ۱۰ میلی‌متر و بالینی علامت‌دار هستند. میکروبلیدها (< ۱۰ میلی‌متر) اغلب بدون علامت بوده و فقط روی SWI/T2* قابل رؤیت‌اند.'
    ),
  },
  {
    id: 'icb-q02',
    question: L('Was ist die häufigste Ursache einer primären ICB?', 'What is the most common cause of primary ICB?', 'شایع‌ترین علت ICB اولیه چیست؟'),
    options: [
      L('Arterieller Hypertonus (Putamen, Thalamus, Pons, Kleinhirn)', 'Arterial hypertension (putamen, thalamus, pons, cerebellum)', 'فشار خون شریانی (پوتامن، تالاموس، پونز، مخچه)'),
      L('Zerebrale Amyloidangiopathie (lobär)', 'Cerebral amyloid angiopathy (lobar)', 'آنژیوپاتی آمیلوئید مغزی (لوبار)'),
      L('Orale Antikoagulanzien', 'Oral anticoagulants', 'ضدانعقادهای خوراکی'),
      L('AVM und Kavernome', 'AVM and cavernomas', 'AVM و کاورنوم'),
    ],
    correct: 'A',
    explanation: L(
      'Arterieller Hypertonus ist mit 50–70 % die häufigste Ursache der primären ICB. Er führt zu Lipohyalinose kleiner penetrierender Arterien, bevorzugt im Putamen, Thalamus, Pons und Kleinhirn.',
      'Arterial hypertension is the most common cause of primary ICB (50–70 %). It causes lipohyalinosis of small penetrating arteries, predominantly in the putamen, thalamus, pons and cerebellum.',
      'فشار خون شریانی با ۵۰-۷۰٪ شایع‌ترین علت ICB اولیه است که باعث لیپوهیالینوز شریان‌های نفوذی کوچک در پوتامن، تالاموس، پونز و مخچه می‌شود.'
    ),
  },
  {
    id: 'icb-q03',
    question: L('Welche HU-Dichte hat eine frische ICB in der nativen CCT?', 'What HU attenuation does a fresh ICB show on NCCT?', 'دانسیته HU ICB تازه در CT بدون کنتراست چقدر است؟'),
    options: [
      L('0–10 HU (hypodens wie Wasser)', '0–10 HU (hypoattenuating like water)', '۰-۱۰ HU (هیپودنس مثل آب)'),
      L('20–35 HU (isodens wie Hirngewebe)', '20–35 HU (isoattenuating to brain)', '۲۰-۳۵ HU (ایزودنس مثل بافت مغز)'),
      L('50–80 HU (hyperdens)', '50–80 HU (hyperattenuating)', '۵۰-۸۰ HU (هایپردنس)'),
      L('> 120 HU (stark hyperdens wie Kalk)', '>120 HU (markedly hyperattenuating like calcification)', '> ۱۲۰ HU (مثل کلسیفیکاسیون)'),
    ],
    correct: 'C',
    explanation: L(
      'Frisches Blut ist in der nativen CCT häufig hyperdens; die genaue Dichte hängt unter anderem von Hämatokrit und Technik ab. Der zeitliche Dichteverlauf ist variabel und erlaubt keine lineare Altersbestimmung.',
      'Fresh blood is often hyperattenuating on NCCT; its exact attenuation depends in part on haematocrit and technique. Attenuation changes over time are variable and do not provide a linear clock for dating the haemorrhage.',
      'خون تازه در CT بدون کنتراست اغلب هایپردنس است؛ دانسیتهٔ دقیق از جمله به هماتوکریت و تکنیک بستگی دارد. تغییر دانسیته در طول زمان متغیر است و برای تعیین خطی سن خونریزی به کار نمی‌رود.'
    ),
  },
  {
    id: 'icb-q04',
    question: L('Was bedeutet das Swirl Sign im CT?', 'What does the Swirl Sign indicate on CT?', 'علامت چرخش (Swirl sign) در CT به چه معناست؟'),
    options: [
      L('Ringförmige KM-Aufnahme als Zeichen einer Resorptionsphase', 'Ring enhancement indicating the resorption phase', 'حلقوی نشانگر فاز جذب'),
      L('Möglicher unverklotteter Anteil, der mit Expansion assoziiert sein kann', 'Possible unclotted component that may be associated with expansion', 'احتمال وجود بخشی لخته‌نشده که ممکن است با گسترش مرتبط باشد'),
      L('Hyperdens imponiierendes Blut im Subarachnoidalraum', 'Hyperattenuating blood in the subarachnoid space', 'خون هایپردنس در فضای ساب‌آراکنوئید'),
      L('Diffuse Hypodensität des Hirnparenchyms als Zeichen eines Ödems', 'Diffuse parenchymal hypodensity indicating oedema', 'هیپودنسیتی منتشر پارانشیم نشانگر ادم'),
    ],
    correct: 'B',
    explanation: L(
      'Hypodense Areale innerhalb eines hyperdensen Hämatoms können einen nicht koagulierten Anteil darstellen. Als Heterogenitätszeichen können sie mit Expansion assoziiert sein, beweisen aber keine aktuell aktive Blutung.',
      'Hypoattenuating areas within a hyperattenuating haematoma may represent an unclotted component. As a heterogeneity sign they may be associated with expansion, but they do not prove active bleeding at the time of imaging.',
      'نواحی کم‌دانسیته درون هماتوم پرچگال ممکن است نشان‌دهندهٔ بخشی لخته‌نشده باشند. این ناهمگنی می‌تواند با گسترش هماتوم ارتباط داشته باشد، اما خونریزی فعال در زمان تصویربرداری را ثابت نمی‌کند.'
    ),
  },
  {
    id: 'icb-q05',
    question: L('Was ist das Spot Sign und welche Sequenz zeigt es?', 'What is the Spot Sign and which sequence shows it?', 'علامت اسپات (Spot sign) چیست و در کدام سکانس دیده می‌شود؟'),
    options: [
      L('Punktförmige Verkalkung im Hämatom · sichtbar in der nativen CCT', 'Punctate calcification in the haematoma · visible on NCCT', 'کلسیفیکاسیون نقطه‌ای در هماتوم · در CT بدون کنتراست'),
      L('Aktive KM-Extravasation im Hämatom · sichtbar in der CTA', 'Active CM extravasation in the haematoma · visible on CTA', 'خروج فعال ماده حاجب در هماتوم · در CTA'),
      L('Hämosiderin-Depot · sichtbar auf SWI', 'Haemosiderin deposit · visible on SWI', 'رسوب هموسیدرین · در SWI'),
      L('Ringenhancement im KM-CT · Zeichen der Resorption', 'Ring enhancement on contrast CT · sign of resorption', 'حلقوی در CT با کنتراست · نشانه جذب'),
    ],
    correct: 'B',
    explanation: L(
      'Das Spot Sign ist ein fokaler Kontrastmittelpool innerhalb oder am Rand des Hämatoms in der CTA. Ein positives Zeichen ist mit einem erhöhten Risiko für Hämatomexpansion assoziiert; seine Vorhersage hängt unter anderem von CTA-Zeitpunkt und Protokoll ab und ist keine sichere Individualprognose.',
      'The Spot Sign is a focal pool of contrast within or at the margin of the haematoma on CTA. A positive sign is associated with increased risk of haematoma expansion; its predictive performance depends in part on CTA timing and protocol and is not a certain individual prognosis.',
      'Spot sign تجمع کانونی ماده حاجب درون یا حاشیهٔ هماتوم در CTA است. مثبت‌بودن آن با افزایش خطر گسترش هماتوم ارتباط دارد؛ ارزش پیش‌بینی به زمان و پروتکل CTA هم وابسته است و پیش‌آگهی قطعی فردی نمی‌دهد.'
    ),
  },
  {
    id: 'icb-q06',
    question: L('Welche Aussage zur CT-Dichte während der Resorption einer ICB ist am zutreffendsten?', 'Which statement about CT attenuation during ICH resorption is most accurate?', 'کدام عبارت دربارهٔ دانسیتهٔ CT در زمان جذب ICB دقیق‌تر است؟'),
    options: [
      L('Sie sinkt in jedem Fall linear mit einer konstanten HU-Rate.', 'It always decreases linearly at a constant HU rate.', 'در همهٔ موارد با نرخ ثابت و به‌صورت خطی کاهش می‌یابد.'),
      L('Sie kann im Verlauf abnehmen, aber die Geschwindigkeit ist variabel und HU erlauben keine lineare Datierung.', 'It may decrease over time, but the rate varies and HU do not allow linear dating.', 'ممکن است با گذر زمان کاهش یابد، اما سرعت متغیر است و HU امکان تعیین خطی زمان را نمی‌دهد.'),
      L('Sie bleibt bis zur vollständigen Resorption unverändert.', 'It remains unchanged until complete resorption.', 'تا جذب کامل بدون تغییر می‌ماند.'),
      L('Sie nimmt nur bei einer sekundären ICB ab.', 'It decreases only in secondary ICH.', 'فقط در ICB ثانویه کاهش می‌یابد.'),
    ],
    correct: 'B',
    explanation: L(
      'Die Dichte kann im Resorptionsverlauf sinken und vorübergehend isodens werden. Zeitpunkt und Ausmaß variieren; ein einzelner HU-Wert datiert die Blutung nicht zuverlässig.',
      'Attenuation may decrease during resorption and can become temporarily isoattenuating. Timing and extent vary; a single HU value does not reliably date the haemorrhage.',
      'دانسیته ممکن است طی جذب کاهش یابد و موقتاً ایزودنس شود. زمان و میزان تغییر متغیر است؛ یک مقدار HU به‌تنهایی سن خونریزی را به‌طور قابل اعتماد تعیین نمی‌کند.'
    ),
  },
  {
    id: 'icb-q07',
    question: L('Warum erscheint eine hyperakute ICB (Oxy-Hb) auf T2 hyperintens?', 'Why does a hyperacute ICB (OxyHb) appear hyperintense on T2?', 'چرا ICB فوق‌حاد (Oxy-Hb) در T2 هایپرانتنس دیده می‌شود؟'),
    options: [
      L('Wegen des hohen Eisengehalts von Oxy-Hb', 'Because of the high iron content of oxyHb', 'به دلیل محتوای بالای آهن در Oxy-Hb'),
      L('Weil Oxy-Hb diamagnetisch ist und keinen Suszeptibilitätseffekt erzeugt – T2 bleibt wie Wasser hell', 'Because oxyHb is diamagnetic and produces no susceptibility effect — T2 remains bright like water', 'چون Oxy-Hb دیاماگنتیک است و اثر سوسپتیبیلیتی ندارد — T2 مثل آب روشن می‌ماند'),
      L('Wegen diffusiver Konversion zu Met-Hb', 'Due to diffuse conversion to metHb', 'به دلیل تبدیل منتشر به Met-Hb'),
      L('Wegen vasogenem Ödem um die Blutung', 'Due to vasogenic oedema around the bleed', 'به دلیل ادم واسوژنیک اطراف خونریزی'),
    ],
    correct: 'B',
    explanation: L(
      'Oxy-Hb ist diamagnetisch und erzeugt keinen Suszeptibilitätseffekt. Daher zeigt T2 ein hohes Signal – ähnlich wie Wasser. Im Gegensatz zu Deoxy-Hb (paramagnetisch) fehlt das Blooming auf T2*. Dies macht die hyperakute Phase im MRT schwer diagnostizierbar.',
      'OxyHb is diamagnetic and produces no susceptibility effect, so T2 remains bright — similar to water. Unlike deoxyHb (paramagnetic), there is no blooming on T2*. This makes the hyperacute stage difficult to diagnose on MRI.',
      "Oxy-Hb دیاماگنتیک است و اثر سوسپتیبیلیتی ندارد، پس T2 روشن می‌ماند — مثل آب. برخلاف Deoxy-Hb (پاراماگنتیک)، آرتیفکت شکوفه‌ای در T2* ندارد."
    ),
  },
  {
    id: 'icb-q08',
    question: L('Warum zeigt akutes Deoxy-Hb kein T1-Signal trotz Paramagnetismus?', 'Why does acute deoxyHb show no T1 signal despite its paramagnetism?', 'چرا Deoxy-Hb حاد با وجود پاراماگنتیسم، سیگنال T1 ندارد؟'),
    options: [
      L('Weil Deoxy-Hb extrazellulär vorliegt', 'Because deoxyHb is extracellular', 'چون Deoxy-Hb خارج سلولی است'),
      L('Weil Deoxy-Hb intrazellulär kompartimentiert ist und Wasser das Fe²⁺ nicht erreichen kann', 'Because deoxyHb is intracellularly compartmentalised and water cannot access the Fe²⁺', 'چون Deoxy-Hb داخل سلول محدود است و آب نمی‌تواند به Fe²⁺ دسترسی داشته باشد'),
      L('Weil die Erythrozyten bei akuter ICB bereits lysiert sind', 'Because erythrocytes have already lysed in acute ICB', 'چون اریتروسیت‌ها در ICB حاد از قبل لیز شده‌اند'),
      L('Weil T1-KM das Signal überlagert', 'Because T1 contrast overwhelms the signal', 'چون کنتراست T1 سیگنال را پوشش می‌دهد'),
    ],
    correct: 'B',
    explanation: L(
      'Für eine T1-Verkürzung ist eine direkte Dipol-Dipol-Wechselwirkung zwischen Wasser und Fe²⁺ nötig. Im akuten Stadium liegt Deoxy-Hb jedoch noch innerhalb intakter Erythrozyten (intrazellulär), sodass Wasser keinen Zugang zum Eisen hat. Deshalb fehlt das T1-Signal trotz Paramagnetismus.',
      'T1 shortening requires direct dipole-dipole interaction between water and Fe²⁺. In the acute stage, deoxyHb is still within intact erythrocytes (intracellular), so water cannot access the iron. Hence there is no T1 signal despite paramagnetism.',
      'کوتاه‌شدن T1 نیازمند برهم‌کنش مستقیم دوقطبی-دوقطبی بین آب و Fe²⁺ است. در مرحله حاد، Deoxy-Hb هنوز درون اریتروسیت‌های سالم (داخل سلول) است، پس آب به آهن دسترسی ندارد.'
    ),
  },
  {
    id: 'icb-q09',
    question: L('Welches MRT-Muster kann bei intrazellulärem Met-Hb im früh-subakuten Stadium auftreten?', 'Which MRI pattern may occur with intracellular metHb in the early subacute stage?', 'کدام الگوی MRI ممکن است با Met-Hb داخل‌سلولی در مرحلهٔ زیرحاد اولیه دیده شود؟'),
    options: [
      L('T2-Hypointensität auf der DWI-Sequenz', 'T2 hypointensity on DWI', 'هیپوانتنسیتی T2 در سکانس DWI'),
      L('T1-Hyperintensität durch intrazelluläres Met-Hb (früh subakut)', 'T1 hyperintensity from intracellular metHb (early subacute)', 'هایپرانتنسیتی T1 از Met-Hb داخل سلولی (زیرحاد اولیه)'),
      L('Ringenhancement in der T1-KM-Sequenz', 'Ring enhancement on T1 post-contrast', 'حلقوی در T1 پس از کنتراست'),
      L('Blooming auf SWI/T2*', 'Blooming on SWI/T2*', "آرتیفکت شکوفه‌ای در SWI/T2*"),
    ],
    correct: 'B',
    explanation: L(
      'Intrazelluläres Met-Hb ist häufig mit T1-Hyperintensität bei weiterhin möglicher T2-Hypointensität verbunden. Zeitpunkt und Ausprägung sind variabel; in größeren Hämatomen können verschiedene Stadien nebeneinander vorkommen.',
      'Intracellular metHb is often associated with T1 hyperintensity while T2 may remain hypointense. Timing and appearance vary; different stages may coexist within a larger haematoma.',
      'Met-Hb داخل‌سلولی اغلب با پرسیگنال‌شدن T1 همراه است، درحالی‌که T2 ممکن است همچنان کم‌سیگنال باشد. زمان و شدت متغیر است و در هماتوم بزرگ ممکن است چند مرحله هم‌زمان وجود داشته باشد.'
    ),
  },
  {
    id: 'icb-q10',
    question: L('Was ist das „Bright–Bright"-Muster auf MRT und welche Differenzialdiagnose muss bedacht werden?', 'What is the "bright-bright" pattern on MRI and which differential diagnosis must be considered?', 'الگوی روشن-روشن (Bright-Bright) در MRI چیست و تشخیص افتراقی آن کدام است؟'),
    options: [
      L('T1 hypo + T2 hypo · DD: Verkalkung', 'T1 hypo + T2 hypo · DD: calcification', 'T1 هیپو + T2 هیپو · DD: کلسیفیکاسیون'),
      L('T1 hell + T2 hell (spät subakut durch extrazelluläres Met-Hb) · DD: Melanommetastase, fettige Läsion', 'T1 bright + T2 bright (late subacute, extracellular metHb) · DD: melanoma metastasis, fatty lesion', 'T1 روشن + T2 روشن (زیرحاد دیررس از Met-Hb خارج سلولی) · DD: متاستاز ملانوم، ضایعه چربی'),
      L('T1 hypo + T2 hell · DD: Abszess', 'T1 hypo + T2 bright · DD: abscess', 'T1 هیپو + T2 روشن · DD: آبسه'),
      L('T1 hell + T2 hypo · DD: Fibrom', 'T1 bright + T2 hypo · DD: fibroma', 'T1 روشن + T2 هیپو · DD: فیبروم'),
    ],
    correct: 'B',
    explanation: L(
      'Im spät subakuten Verlauf kann extrazelluläres Met-Hb T1 und T2 hyperintens erscheinen lassen. Das bright-bright-Muster ist unspezifisch und kann Melaninmetastasen oder Fett imitieren. SWI/T2*, fettunterdrückte Sequenzen, Verlauf, Morphologie und Klinik helfen gemeinsam bei der Differenzialdiagnose; ein einzelner Befund ist nicht beweisend.',
      'During the late subacute course, extracellular metHb may make T1 and T2 hyperintense. The bright-bright pattern is nonspecific and can mimic melanin-containing metastases or fat. SWI/T2*, fat-suppressed sequences, interval change, morphology and clinical context help together with the differential; no single finding is definitive.',
      'در سیر زیرحاد دیررس، مت‌هموگلوبین خارج‌سلولی ممکن است T1 و T2 را پرسیگنال کند. الگوی روشن-روشن اختصاصی نیست و می‌تواند متاستاز حاوی ملانین یا چربی را تقلید کند. SWI/T2*، توالی‌های سرکوب چربی، تغییرات پیگیری، مورفولوژی و زمینهٔ بالینی در کنار هم به تشخیص افتراقی کمک می‌کنند؛ هیچ یافتهٔ منفردی قطعی نیست.'
    ),
  },
  {
    id: 'icb-q11',
    question: L('Welche Sequenz ist am sensitivsten für den Nachweis alter Mikroblutungen?', 'Which sequence is most sensitive for detecting old microbleeds?', 'کدام سکانس برای تشخیص میکروبلیدهای قدیمی حساس‌ترین است؟'),
    options: [
      L('T1-Wichtung ohne Kontrastmittel', 'T1-weighted without contrast', 'T1 بدون کنتراست'),
      L('FLAIR', 'FLAIR', 'FLAIR'),
      L('SWI (Suszeptibilitätsgewichtete Bildgebung) / T2*', 'SWI (susceptibility-weighted imaging) / T2*', 'SWI (تصویربرداری وزنی سوسپتیبیلیتی) / T2*'),
      L('Diffusionsgewichtete Bildgebung (DWI)', 'Diffusion-weighted imaging (DWI)', 'تصویربرداری وزنی دیفیوژن (DWI)'),
    ],
    correct: 'C',
    explanation: L(
      'Hämosiderin erzeugt einen ausgeprägten Suszeptibilitätseffekt auf SWI/T2*. CT und MRT beantworten unterschiedliche Fragen; kleine alte Blutprodukte werden mit susceptibility-sensitiven MRT-Sequenzen besonders gut erfasst.',
      'Haemosiderin produces marked susceptibility effects on SWI/T2*. CT and MRI answer different questions; small old blood products are particularly well depicted with susceptibility-sensitive MRI sequences.',
      'هموسیدرین در SWI/T2* اثر susceptibility برجسته ایجاد می‌کند. CT و MRI پرسش‌های متفاوتی را پاسخ می‌دهند؛ محصولات خونی کوچک و قدیمی با سکانس‌های حساس به susceptibility در MRI بهتر دیده می‌شوند.'
    ),
  },
  {
    id: 'icb-q12',
    question: L('Welcher Befund sollte bei einer ICB an eine sekundäre Ursache (z. B. Tumor) denken lassen?', 'Which finding should raise suspicion of a secondary cause (e.g. tumour) in ICB?', 'کدام یافته در ICB باید به علت ثانویه (مثلاً تومور) فکر کرد؟'),
    options: [
      L('Hämatom in den Basalganglien bei bekanntem Hypertonus', 'Haematoma in the basal ganglia with known hypertension', 'هماتوم در گانگلیون‌های قاعده‌ای با فشار خون شناخته‌شده'),
      L('Perifokales Ödem unverhältnismäßig groß im Vergleich zur Blutungsgröße', 'Perilesional oedema disproportionately large relative to haematoma size', 'ادم اطراف ضایعه نسبت به اندازه هماتوم بیش از حد بزرگ'),
      L('Hämatom kleiner als 5 ml bei älterem Patienten', 'Haematoma smaller than 5 ml in an elderly patient', 'هماتوم کوچک‌تر از ۵ میلی‌لیتر در بیمار مسن'),
      L('Swirl Sign im CT', 'Swirl Sign on CT', 'علامت چرخش (Swirl sign) در CT'),
    ],
    correct: 'B',
    explanation: L(
      'Bei einer primären ICB ist das perifokale Ödem meist proportional zur Blutungsgröße. Ein unverhältnismäßig großes Ödem (viel größer als das Hämatom) ist ein Warnsignal für eine sekundäre ICB durch Tumor oder hämorrhagischen Infarkt. Auch atypische Lokalisation oder junges Alter ohne vaskuläre Risikofaktoren sollten an AVM/Kavernom denken lassen → CTA.',
      'In primary ICB, perilesional oedema is usually proportional to haematoma size. Disproportionately large oedema (much larger than the haematoma) is a warning sign for secondary ICB from tumour or haemorrhagic infarct. Atypical location or young age without vascular risk factors should raise suspicion of AVM/cavernoma → CTA.',
      'در ICB اولیه ادم اطراف معمولاً متناسب با اندازه هماتوم است. ادم بیش از حد بزرگ هشدار ICB ثانویه از تومور یا انفارکت هموراژیک است.'
    ),
  },
  {
    id: 'icb-q13',
    question: L('Was ist die typische Lokalisation einer CAA-bedingten ICB?', 'What is the typical location of CAA-related ICB?', 'محل تیپیک ICB ناشی از CAA کجاست؟'),
    options: [
      L('Tief gelegen: Putamen, Thalamus, Pons', 'Deep: putamen, thalamus, pons', 'عمقی: پوتامن، تالاموس، پونز'),
      L('Lobär (kortexnah), oft multipel, häufig okzipital und parietal', 'Lobar (cortical), often multiple, frequently occipital and parietal', 'لوبار (نزدیک کورتکس)، اغلب چندگانه، غالباً اکسیپیتال و پاریتال'),
      L('Ausschließlich periventrikulär', 'Exclusively periventricular', 'فقط پری‌ونتریکولار'),
      L('Immer im Kleinhirn', 'Always in the cerebellum', 'همیشه در مخچه'),
    ],
    correct: 'B',
    explanation: L(
      'Die zerebrale Amyloidangiopathie (CAA) führt zu Amyloidablagerungen in kleinen kortikalen und leptomeningealen Gefäßen. Typisch sind lobäre ICBs (kortexnah), die häufig multipel auftreten und eine Prädilektion für den Okzipital- und Parietallappen zeigen. Multiple lobäre Mikroblutungen auf SWI stärken den Verdacht auf CAA. Im Gegensatz dazu: Hypertensive ICBs sind tief (Putamen, Thalamus).',
      'Cerebral amyloid angiopathy causes amyloid deposits in small cortical and leptomeningeal vessels. Typical are lobar ICBs (cortical), often multiple with a predilection for the occipital and parietal lobes. Multiple lobar microbleeds on SWI support CAA. In contrast, hypertensive ICBs are deep (putamen, thalamus).',
      'CAA باعث رسوب آمیلوئید در عروق کوچک کورتیکال و لپتومنینژال می‌شود. تیپیک ICBهای لوبار (نزدیک کورتکس) که اغلب چندگانه هستند با تمایل به لوب اکسیپیتال و پاریتال. میکروبلیدهای لوبار متعدد در SWI از CAA حمایت می‌کند.'
    ),
  },
  {
    id: 'icb-q14',
    question: L('Bis zu wie vielen Monaten nach einer ICB kann ein Ringenhancement im CT nachweisbar sein?', 'For how many months after ICB can ring enhancement persist on CT?', 'تا چند ماه پس از ICB می‌توان حلقوی را در CT تشخیص داد؟'),
    options: [
      L('Bis zu 2 Wochen', 'Up to 2 weeks', 'تا ۲ هفته'),
      L('Bis zu 6 Wochen', 'Up to 6 weeks', 'تا ۶ هفته'),
      L('Bis zu 6 Monaten', 'Up to 6 months', 'تا ۶ ماه'),
      L('Dauerhaft persistierend', 'Persisting indefinitely', 'به‌طور دائمی باقی می‌ماند'),
    ],
    correct: 'C',
    explanation: L(
      'Ein Ringenhancement nach ICB ist durch die Blut-Hirn-Schrankenstörung am Rand der Resorptionszone bedingt. Es kann bis zu 6 Monate nach dem Blutungsereignis nachweisbar sein. Dieser Befund kann leicht mit einem Abszess oder einer Metastase verwechselt werden (Differenzialdiagnose!) und erfordert klinische Korrelation und ggf. MRT mit DWI.',
      'Ring enhancement after ICB results from blood-brain barrier disruption at the periphery of the resorption zone. It can persist for up to 6 months after the haemorrhagic event. This finding may easily be confused with an abscess or metastasis (differential diagnosis!) and requires clinical correlation and DWI on MRI.',
      'حلقوی پس از ICB ناشی از اختلال سد خونی-مغزی در لبه ناحیه جذب است. تا ۶ ماه پس از رویداد خونریزی قابل تشخیص است و ممکن است با آبسه یا متاستاز اشتباه گرفته شود.'
    ),
  },
  {
    id: 'icb-q15',
    question: L('Ein junger Patient ohne Hypertonus hat eine lobäre ICB. Was sollte als nächstes veranlasst werden?', 'A young patient without hypertension has a lobar ICB. What should be the next step?', 'یک بیمار جوان بدون فشار خون بالا ICB لوبار دارد. قدم بعدی چیست؟'),
    options: [
      L('Keine weitere Abklärung nötig – lobäre ICB immer benigne', 'No further workup needed – lobar ICB is always benign', 'نیازی به بررسی بیشتر نیست — ICB لوبار همیشه خوش‌خیم است'),
      L('CTA zum Ausschluss einer vaskulären Malformation (AVM, Kavernom)', 'CTA to exclude vascular malformation (AVM, cavernoma)', 'CTA برای رد مالفورماسیون عروقی (AVM، کاورنوم)'),
      L('Sofortige Antikoagulation', 'Immediate anticoagulation', 'ضدانعقاد فوری'),
      L('PET-CT zum Tumorausschluss', 'PET-CT for tumour exclusion', 'PET-CT برای رد تومور'),
    ],
    correct: 'B',
    explanation: L(
      'Bei einem jungen Patienten ohne klassische Risikofaktoren (arterieller Hypertonus) und ohne Antikoagulanzieneinnahme ist eine vaskuläre Malformation (AVM, Kavernom, dAVF) eine wichtige Ursache. CTA (und ggf. DSA) zum Ausschluss einer AVM oder eines Aneurysmas ist indiziert. Die MRT (SWI) kann ein Kavernom mit typischem Popcorn-Muster zeigen.',
      'In a young patient without classical risk factors (hypertension) and not on anticoagulants, a vascular malformation (AVM, cavernoma, dAVF) is an important cause. CTA (and possibly DSA) to exclude AVM or aneurysm is indicated. MRI (SWI) may show a cavernoma with a typical popcorn pattern.',
      'در بیمار جوان بدون فاکتورهای خطر کلاسیک، مالفورماسیون عروقی (AVM، کاورنوم) علت مهمی است. CTA (و در صورت لزوم DSA) برای رد AVM یا آنوریسم ضروری است.'
    ),
  },
]

export const ICB_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  ICB_QUESTION_SEEDS.map(item => ({
    id: item.id,
    tags: ['intrazerebrale-blutung', 'gehirn-blutung'],
    fach: 'gehirn',
    question: item.question[lang] || item.question.de,
    options: item.options.map((opt, i) => ({
      id: ['A', 'B', 'C', 'D'][i],
      text: opt[lang] || opt.de,
    })),
    correct: item.correct,
    explanation: item.explanation[lang] || item.explanation.de,
  })),
]))

// ── FLASHCARDS ────────────────────────────────────────────────────────────────

export const ICB_FLASHCARD_TOPIC = {
  id: 'intrazerebrale-blutung',
  area: L('Gehirn', 'Brain', 'مغز'),
  chapter: L('Vaskuläre Erkrankungen', 'Vascular diseases', 'بیماری‌های عروقی'),
  icon: '🩸',
  iconImage: '/fach/gehirn.png',
  color: '#dc2626',
  href: '/flashcards/intrazerebrale-blutung',
  title: L('Intrazerebrale Blutung', 'Intracerebral Haemorrhage', 'خونریزی داخل مغزی'),
  subtitle: L(
    'CT-Stadien · MRT-Signal · Swirl/Spot-Sign · CAA vs. Hypertonus',
    'CT stages · MRI signal · Swirl/Spot Sign · CAA vs hypertension',
    'مراحل CT · سیگنال MRI · علائم Swirl/Spot · CAA در برابر فشار خون'
  ),
}

const ICB_FLASHCARD_SEEDS = [
  // ── 1. Oxy-Hb (hyperakut) ──────────────────────────────────────────────────
  {
    front: L('Oxy-Hb (hyperakut) · T1 und T2?', 'OxyHb (hyperacute) · T1 and T2?', 'Oxy-Hb (فوق‌حاد) · T1 و T2؟'),
    back: L(
      'T1: iso / leicht ↓\nT2: ↑↑ (wie Wasser)\nT2*/SWI: leicht ↓\n→ diamagnetisch, kein Suszeptibilitätseffekt',
      'T1: iso / mildly ↓\nT2: ↑↑ (like water)\nT2*/SWI: mildly ↓\n→ diamagnetic, no susceptibility effect',
      'T1: ایزو / کمی ↓\nT2: ↑↑ (مثل آب)\nT2*/SWI: کمی ↓\n→ دیاماگنتیک، بدون اثر سوسپتیبیلیتی',
    ),
    explanation: L(
      'Oxy-Hb hat keine ungepaarten Elektronen (diamagnetisch) → kein Suszeptibilitätseffekt. T2 bleibt hell wie freies Wasser. Auf SWI nur minimales Blooming. Diese Phase ist im MRT schwer zu erkennen – die Diagnose erfolgt primär mit dem nativen CT (hyperdens 50–80 HU). Das MRT ist in dieser Phase weniger sensitiv als das CT.',
      'OxyHb has no unpaired electrons (diamagnetic) → no susceptibility effect. T2 remains bright like free water. Only minimal SWI blooming. This phase is difficult to detect on MRI — diagnosis relies primarily on NCCT (hyperattenuating 50–80 HU). MRI is actually less sensitive than CT in the hyperacute stage.',
      "Oxy-Hb الکترون جفت‌نشده ندارد (دیاماگنتیک) → بدون اثر سوسپتیبیلیتی. T2 مانند آب آزاد روشن می‌ماند. در SWI فقط آرتیفکت شکوفه‌ای (blooming) حداقلی. این مرحله در MRI سخت تشخیص داده می‌شود — تشخیص اصلی با CT بدون کنتراست (هایپردنس ۵۰-۸۰ HU) است.",
    ),
    diagram: L(
      'Oxy-Hb (Fe²⁺, diamagn.) → kein Suszeptibilitätseffekt → T2 ↑↑ (wie Wasser) → SWI minimal ↓ → CT: hyperdens (50-80 HU)',
      'OxyHb (Fe²⁺, diamagnetic) → no susceptibility effect → T2 ↑↑ (like water) → SWI minimal ↓ → CT: hyperattenuating (50-80 HU)',
      'Oxy-Hb (Fe²⁺, دیاماگنتیک) → بدون سوسپتیبیلیتی → T2 ↑↑ (مثل آب) → SWI حداقلی ↓ → CT: هایپردنس (۵۰-۸۰ HU)',
    ),
    tag: 'icb-mrt',
  },
  // ── 2. Deoxy-Hb (akut) ─────────────────────────────────────────────────────
  {
    front: L('Deoxy-Hb (akut) · T1 und T2?', 'DeoxyHb (acute) · T1 and T2?', 'Deoxy-Hb (حاد) · T1 و T2؟'),
    back: L(
      'T1: iso / ↓ (kein T1-Signal!)\nT2: stark ↓↓\nT2*/SWI: Blooming ↓↓↓\n→ paramagnetisch, aber intrazellulär → kein Dipol-Dipol',
      'T1: iso / ↓ (no T1 signal!)\nT2: markedly ↓↓\nT2*/SWI: blooming ↓↓↓\n→ paramagnetic, but intracellular → no dipole-dipole',
      "T1: ایزو / ↓ (بدون سیگنال T1)\nT2: شدیداً ↓↓\nT2*/SWI: آرتیفکت شکوفه‌ای (blooming) ↓↓↓\n→ پاراماگنتیک، اما داخل سلولی → بدون دیپل-دیپل",
    ),
    explanation: L(
      'Deoxy-Hb ist paramagnetisch (4 ungepaarte Elektronen) → starker Suszeptibilitätseffekt → T2/SWI ↓↓. Warum kein T1-Signal? Deoxy-Hb liegt intrazellulär in intakten Erythrozyten vor: Wasser kann nicht direkt mit Fe²⁺ interagieren → kein Dipol-Dipol-Relaxationsmechanismus → T1 bleibt iso/hypo. Das SWI-Blooming ist der wichtigste und zuverlässigste MRT-Befund in dieser akuten Phase.',
      'DeoxyHb is paramagnetic (4 unpaired electrons) → strong susceptibility effect → T2/SWI ↓↓. Why no T1 signal? DeoxyHb is intracellular inside intact erythrocytes: water cannot directly access Fe²⁺ → no dipole-dipole relaxation mechanism → T1 stays iso/hypo. SWI blooming is the most important and reliable MRI finding in the acute phase.',
      'Deoxy-Hb پاراماگنتیک است (۴ الکترون جفت‌نشده) → اثر سوسپتیبیلیتی قوی → T2/SWI ↓↓. چرا سیگنال T1 وجود ندارد؟ Deoxy-Hb داخل اریتروسیت‌های سالم است: آب نمی‌تواند مستقیماً با Fe²⁺ تعامل داشته باشد → مکانیسم رلاکسیشن دیپل-دیپل وجود ندارد → T1 ایزو/هیپو می‌ماند.',
    ),
    diagram: L(
      'Deoxy-Hb intrazellulär → Suszeptibilitätseffekt → T2 ↓↓ + SWI Blooming → intakte Erythrozytenmembran → kein Dipol-Dipol → T1 iso',
      'DeoxyHb intracellular → susceptibility effect → T2 ↓↓ + SWI blooming → intact erythrocyte membrane → no dipole-dipole → T1 iso',
      "Deoxy-Hb داخل سلول → اثر سوسپتیبیلیتی → T2 ↓↓ + آرتیفکت شکوفه‌ای در SWI → غشای اریتروسیت سالم → بدون دیپل-دیپل → T1 ایزو",
    ),
    tag: 'icb-mrt',
  },
  // ── 3. Met-Hb intrazellulär (früh subakut) ─────────────────────────────────
  {
    front: L('Met-Hb intrazellulär (früh subakut) · T1 und T2?', 'MetHb intracellular (early subacute) · T1 and T2?', 'Met-Hb داخل سلولی (زیرحاد اولیه) · T1 و T2؟'),
    back: L(
      'T1: ↑↑ HELL ★ (wichtigster Wendepunkt!)\nT2: ↓ hypo (Kompartimentierung noch aktiv)\nT2*/SWI: stark ↓\n→ Wasser erreicht Fe³⁺ → Dipol-Dipol → T1↑',
      'T1: ↑↑ BRIGHT ★ (most important turning point!)\nT2: ↓ hypo (compartmentalisation still active)\nT2*/SWI: markedly ↓\n→ water reaches Fe³⁺ → dipole-dipole → T1↑',
      'T1: ↑↑ روشن ★ (مهم‌ترین نقطه عطف)\nT2: ↓ هیپو (محدودیت هنوز فعال)\nT2*/SWI: شدیداً ↓\n→ آب به Fe³⁺ می‌رسد → دیپل-دیپل → T1↑',
    ),
    explanation: L(
      'Oxy-Hb wird stufenweise zu Deoxy-Hb und dann zu Met-Hb (Fe³⁺) oxidiert. Met-Hb hat 5 ungepaarte Elektronen (noch stärker paramagnetisch als Deoxy-Hb). Entscheidend: Wasser kann jetzt durch die Erythrozytenmembran direkt mit Fe³⁺ interagieren → Dipol-Dipol-Relaxation → T1-Verkürzung → T1 hell. Die Erythrozyten sind aber noch intakt → Kompartimentierungseffekt → T2 bleibt hypo. Der Übergang von T2-dunkel (akut) zu T1-hell (früh subakut) ist der wichtigste Wendepunkt im MRT-Staging der ICB. Er beginnt an der Peripherie und schreitet zur Mitte fort.',
      'OxyHb is progressively oxidised to deoxyHb and then to metHb (Fe³⁺). MetHb has 5 unpaired electrons (even more paramagnetic than deoxyHb). The key: water can now directly access Fe³⁺ through the erythrocyte membrane → dipole-dipole relaxation → T1 shortening → T1 bright. Erythrocytes are still intact → compartmentalisation effect → T2 stays hypointense. The transition from T2-dark (acute) to T1-bright (early subacute) is the most important turning point in ICB MRI staging. It begins at the periphery and progresses inward.',
      'Oxy-Hb به تدریج به Deoxy-Hb و سپس به Met-Hb (Fe³⁺) اکسید می‌شود. Met-Hb دارای ۵ الکترون جفت‌نشده است. کلیدی: آب اکنون می‌تواند از طریق غشای اریتروسیت مستقیماً با Fe³⁺ تعامل داشته باشد → رلاکسیشن دیپل-دیپل → کوتاه‌شدن T1 → T1 روشن. اریتروسیت‌ها هنوز سالم‌اند → اثر محدودیت → T2 هیپو می‌ماند. این انتقال مهم‌ترین نقطه عطف در MRI ICB است.',
    ),
    diagram: L(
      'Oxy-Hb → Deoxy-Hb → Met-Hb intrazell. (Fe³⁺) → Dipol-Dipol-Relaxation → T1 ↑↑ hell\nErythrozyt intakt → Kompartimentierung → T2 ↓ hypo',
      'OxyHb → DeoxyHb → MetHb intracell. (Fe³⁺) → dipole-dipole relaxation → T1 ↑↑ bright\nErythrocyte intact → compartmentalisation → T2 ↓ hypo',
      'Oxy-Hb → Deoxy-Hb → Met-Hb داخل سلول (Fe³⁺) → رلاکسیشن دیپل-دیپل → T1 ↑↑ روشن\nاریتروسیت سالم → محدودیت → T2 ↓ هیپو',
    ),
    tag: 'icb-mrt',
  },
  // ── 4. Met-Hb extrazellulär (spät subakut) ─────────────────────────────────
  {
    front: L('Met-Hb extrazellulär (spät subakut) · T1 und T2?', 'MetHb extracellular (late subacute) · T1 and T2?', 'Met-Hb خارج سلولی (زیرحاد دیررس) · T1 و T2؟'),
    back: L(
      'T1: ↑↑ hell\nT2: ↑↑ hell → „bright-bright“\nDD: Melaninmetastase oder Fett möglich\nSWI/T2*, Fettsättigung und Verlauf gemeinsam prüfen',
      'T1: ↑↑ bright\nT2: ↑↑ bright → “bright-bright”\nDD: melanoma or fat may mimic\nAssess SWI/T2*, fat suppression and interval change together',
      'T1: ↑↑ روشن\nT2: ↑↑ روشن → «bright-bright»\nافتراق: ملانین یا چربی نیز ممکن است\nSWI/T2*، سرکوب چربی و تغییرات پیگیری را با هم بسنجید',
    ),
    explanation: L(
      'In der spät subakuten Phase kann extrazelluläres Met-Hb T1 und T2 hyperintens erscheinen lassen. Das Muster kann Melaninmetastasen oder Fett imitieren. SWI/T2*, Fettsättigung, Verlauf, Morphologie und Klinik gemeinsam beurteilen; ein Randsaum allein ist nicht beweisend.',
      'During the late subacute course, extracellular metHb may make T1 and T2 hyperintense. The pattern can mimic melanin-containing metastases or fat. Assess SWI/T2*, fat suppression, interval change, morphology and clinical context together; a rim alone is not definitive.',
      'در سیر زیرحاد دیررس، مت‌هموگلوبین خارج‌سلولی ممکن است T1 و T2 را پرسیگنال کند. این الگو می‌تواند متاستاز حاوی ملانین یا چربی را تقلید کند. SWI/T2*، سرکوب چربی، تغییرات پیگیری، مورفولوژی و زمینهٔ بالینی را با هم ارزیابی کنید؛ حلقهٔ منفرد قطعی نیست.',
    ),
    diagram: L(
      'Erythrozytenlyse → Met-Hb extrazell. → kein Kompartimentierungseffekt → T1 ↑↑ + T2 ↑↑ → SWI Hämosiderin-Randsaum',
      'Erythrocyte lysis → metHb extracellular → no compartmentalisation → T1 ↑↑ + T2 ↑↑ → SWI haemosiderin rim',
      'لیز اریتروسیت → Met-Hb خارج سلولی → بدون محدودیت → T1 ↑↑ + T2 ↑↑ → حلقه هموسیدرین SWI',
    ),
    tag: 'icb-mrt',
  },
  // ── 5. Hämosiderin (chronisch) ──────────────────────────────────────────────
  {
    front: L('Hämosiderin (chronisch) · Welche Sequenz ist entscheidend?', 'Haemosiderin (chronic) · Which sequence is essential?', 'هموسیدرین (مزمن) · کدام سکانس ضروری است؟'),
    back: L(
      'SWI / T2*: ausgeprägter Suszeptibilitätseffekt\nT1/T2: je nach Stadium variabel\nCT und MRT: komplementär',
      'SWI / T2*: marked susceptibility effect\nT1/T2: vary by stage\nCT and MRI: complementary',
      'SWI / T2*: اثر برجستهٔ susceptibility\nT1/T2: بسته به مرحله متغیر\nCT و MRI: مکمل',
    ),
    explanation: L(
      'Hämosiderin verursacht Blooming auf SWI/T2*. Kleine alte Blutprodukte werden mit susceptibility-sensitiven MRT-Sequenzen besonders gut erfasst. CT und MRT bleiben komplementär; keine einzelne Sequenz ersetzt die klinische Einordnung.',
      'Haemosiderin causes blooming on SWI/T2*. Small old blood products are particularly well depicted with susceptibility-sensitive MRI sequences. CT and MRI remain complementary; no single sequence replaces clinical context.',
      'هموسیدرین روی SWI/T2* باعث blooming می‌شود. محصولات خونی کوچک و قدیمی با سکانس‌های حساس به susceptibility در MRI بهتر دیده می‌شوند. CT و MRI مکمل‌اند و هیچ سکانسی جای زمینهٔ بالینی را نمی‌گیرد.',
    ),
    diagram: L(
      'Blutabbau → Hämosiderin → Suszeptibilitätseffekt auf SWI/T2*\nCT und MRT: komplementäre Information',
      'Blood breakdown → haemosiderin → susceptibility effect on SWI/T2*\nCT and MRI: complementary information',
      'تجزیهٔ خون → هموسیدرین → اثر susceptibility در SWI/T2*\nCT و MRI: اطلاعات مکمل',
    ),
    tag: 'icb-mrt',
  },
  // ── 6. Swirl Sign ──────────────────────────────────────────────────────────
  {
    front: L('Swirl Sign · Was, Wo, Bedeutung?', 'Swirl Sign · What, where, significance?', 'علامت چرخش (Swirl sign) · چیست، کجا، اهمیت؟'),
    back: L(
      'Was: Hypodense Areale im hyperdensen Hämatom\nWo: Natives CCT\nBedeutung: möglicher unverklotteter Anteil; mit Expansion assoziiert, kein Beweis aktiver Blutung',
      'What: Hypoattenuating areas in a hyperattenuating haematoma\nWhere: NCCT\nSignificance: possible unclotted component; associated with expansion, not proof of active bleeding',
      'چیست: نواحی کم‌دانسیته در هماتوم پرچگال\nکجا: CT بدون کنتراست\nاهمیت: احتمال بخشی لخته‌نشده؛ مرتبط با گسترش، نه اثبات خونریزی فعال',
    ),
    explanation: L(
      'Hypodense Areale innerhalb des Hämatoms können einen nicht koagulierten Anteil darstellen. Der Heterogenitätsbefund kann mit Expansion assoziiert sein, belegt aber keine laufende Blutung und erlaubt keine sichere Individualprognose.',
      'Hypoattenuating areas within the haematoma may represent an unclotted component. This heterogeneity sign may be associated with expansion, but it does not establish ongoing bleeding or provide a certain individual prognosis.',
      'نواحی کم‌دانسیته درون هماتوم ممکن است بخشی لخته‌نشده باشند. این ناهمگنی می‌تواند با گسترش ارتباط داشته باشد، اما خونریزی جاری را ثابت نمی‌کند و پیش‌آگهی قطعی فردی نمی‌دهد.',
    ),
    tag: 'icb-ct',
  },
  // ── 7. Spot Sign ──────────────────────────────────────────────────────────
  {
    front: L('Spot Sign · Was, Wo, Bedeutung?', 'Spot Sign · What, where, significance?', 'علامت اسپات (Spot sign) · چیست، کجا، اهمیت؟'),
    back: L(
      'Was: fokaler Kontrastmittelpool im/am Hämatom\nWo: CTA (nicht im nativen CT)\nBedeutung: mit erhöhtem Expansionsrisiko assoziiert; keine sichere Prognose',
      'What: focal contrast pooling within/at the haematoma\nWhere: CTA (not NCCT)\nSignificance: associated with increased expansion risk; not a certain prognosis',
      'چیست: تجمع کانونی ماده حاجب درون/حاشیهٔ هماتوم\nکجا: CTA (نه CT بدون کنتراست)\nاهمیت: مرتبط با افزایش خطر گسترش؛ پیش‌بینی قطعی نیست',
    ),
    explanation: L(
      'Das Spot Sign ist ein fokaler Kontrastmittelpool innerhalb oder am Rand des Hämatoms in der CTA. Ein positives Zeichen ist mit einem erhöhten Risiko für Hämatomexpansion assoziiert. Vorhersagewerte variieren unter anderem mit Zeitpunkt und Protokoll; daraus folgt keine sichere individuelle Prognose. CTA-Bildgebung richtet sich nach klinischem Kontext und lokalem Protokoll.',
      'The Spot Sign is a focal pool of contrast within or at the margin of the haematoma on CTA. A positive sign is associated with increased risk of haematoma expansion. Predictive values vary in part with timing and protocol, so it does not provide a certain individual prognosis. CTA imaging depends on the clinical context and local protocol.',
      'Spot sign تجمع کانونی ماده حاجب درون یا حاشیهٔ هماتوم در CTA است. مثبت‌بودن آن با افزایش خطر گسترش هماتوم ارتباط دارد. ارزش پیش‌بینی تا حدی با زمان و پروتکل تغییر می‌کند و پیش‌آگهی قطعی فردی نمی‌دهد. انجام CTA به زمینهٔ بالینی و پروتکل مرکز بستگی دارد.',
    ),
    tag: 'icb-ct',
  },
  // ── 8. CT-Dichte Stadien ───────────────────────────────────────────────────
  {
    front: L('CT-Dichte ICB: Akut, Subakut, Chronisch?', 'CT attenuation ICB: acute, subacute, chronic?', 'دانسیته CT ICB: حاد، زیرحاد، مزمن؟'),
    back: L(
      'Akut: Blut häufig hyperdens\nResorption: Dichte kann variabel abnehmen und zeitweise isodens werden\nSpäter: häufig hypodense Residualveränderung\n⚠ Verlauf und Zeitpunkt sind variabel; HU nicht als lineare Uhr verwenden.',
      'Acute: blood is often hyperattenuating\nResorption: attenuation may decrease variably and become temporarily isoattenuating\nLater: often a hypoattenuating residual change\n⚠ Course and timing vary; do not use HU as a linear clock.',
      'حاد: خون اغلب هایپردنس است\nجذب: دانسیته ممکن است متغیر کاهش یابد و موقتاً ایزودنس شود\nسپس: اغلب باقی‌ماندهٔ هیپودنس\n⚠ سیر و زمان متغیرند؛ HU را ساعت خطی تلقی نکنید.',
    ),
    explanation: L(
      'Frisches Blut ist häufig hyperdens. Während der Resorption kann die Dichte sinken und sich zeitweise der des Hirnparenchyms annähern; der Rest kann dadurch schwerer abgrenzbar sein. Zeitpunkt und Ausmaß variieren; Masseneffekt und Verlauf helfen bei der Einordnung.',
      'Fresh blood is often hyperattenuating. During resorption, attenuation may decrease and temporarily approach that of brain parenchyma, making the residual haemorrhage harder to delineate. Timing and extent vary; mass effect and interval change help with interpretation.',
      'خون تازه اغلب هایپردنس است. طی جذب، دانسیته ممکن است کاهش یابد و موقتاً به دانسیتهٔ پارانشیم نزدیک شود؛ در این حالت باقیماندهٔ خونریزی دشوارتر دیده می‌شود. زمان و میزان تغییر متغیر است؛ اثر جرم و تغییرات پیگیری به ارزیابی کمک می‌کنند.',
    ),
    diagram: L(
      'Akut: oft hyperdens → Resorption: variabel abnehmend / zeitweise isodens → später häufig hypodens',
      'Acute: often hyperattenuating → resorption: variable decrease / temporarily isoattenuating → later often hypoattenuating',
      'حاد: اغلب هایپردنس → جذب: کاهش متغیر / گاهی ایزودنس → سپس اغلب هیپودنس',
    ),
    tag: 'icb-ct',
  },
  // ── 9. CAA vs. Hypertensive ICB ────────────────────────────────────────────
  {
    front: L('CAA vs. Hypertensive ICB · Lokalisation?', 'CAA vs. hypertensive ICB · location?', 'CAA در برابر ICB هیپرتانسیو · محل؟'),
    back: L(
      'Hypertensiv: tief (Putamen 35%, Thalamus 20%, Pons, Kleinhirn)\nCAA: lobär, kortexnah, oft multipel\n  Prädilektion: okzipital + parietal\n  Multiple lobäre Mikroblutungen auf SWI → ✓ CAA',
      'Hypertensive: deep (putamen 35%, thalamus 20%, pons, cerebellum)\nCAA: lobar, cortical, often multiple\n  Predilection: occipital + parietal\n  Multiple lobar microbleeds on SWI → ✓ CAA',
      'هیپرتانسیو: عمقی (پوتامن ۳۵٪، تالاموس ۲۰٪، پونز، مخچه)\nCAA: لوبار، نزدیک کورتکس، اغلب چندگانه\n  تمایل: اکسیپیتال + پاریتال\n  میکروبلید لوبار متعدد در SWI → ✓ CAA',
    ),
    explanation: L(
      'Hypertensive ICB: Lipohyalinose kleiner penetrierender Arterien → Charcot-Bouchard-Mikroaneurysmen → Ruptur in tiefe Strukturen (Putamen häufigste Lokalisation ~35%, Thalamus ~20%, Pons, Kleinhirn). CAA: Amyloid-β-Ablagerungen in den Wänden kortikaler und leptomeningealer Arterien → Wandschwäche → lobäre Blutungen bevorzugt okzipital und parietal. SWI zeigt bei CAA multiple lobäre Mikroblutungen (>3 nach Boston-Kriterien). Alter: CAA tritt typischerweise bei Patienten >65 Jahre auf.',
      'Hypertensive ICB: lipohyalinosis of small penetrating arteries → Charcot-Bouchard microaneurysms → rupture into deep structures (putamen most common ~35%, thalamus ~20%, pons, cerebellum). CAA: amyloid-β deposition in walls of cortical and leptomeningeal arteries → wall weakness → lobar haemorrhages, preferentially occipital and parietal. SWI shows multiple lobar microbleeds (>3 on Boston criteria) in CAA. Age: CAA typically affects patients >65 years.',
      'ICB هیپرتانسیو: لیپوهیالینوز آرترئول‌های کوچک → ریزآنوریسم‌های Charcot-Bouchard → پارگی در ساختارهای عمقی (پوتامن ~۳۵٪، تالاموس ~۲۰٪). CAA: رسوب آمیلوئید-β در دیواره عروق کورتیکال → ضعف دیواره → خونریزی لوبار اکسیپیتال/پاریتال. SWI در CAA میکروبلیدهای لوبار متعدد نشان می‌دهد.',
    ),
    diagram: L(
      'Hypertonie → Lipohyalinose tiefer Arterien → Putamen / Thalamus / Pons\nCAA → Amyloid in kortikalen Gefäßen → lobär okzipital / parietal → SWI: multiple Mikroblutungen',
      'Hypertension → lipohyalinosis deep arteries → putamen / thalamus / pons\nCAA → amyloid in cortical vessels → lobar occipital / parietal → SWI: multiple microbleeds',
      'هیپرتانسیون → لیپوهیالینوز عروق عمقی → پوتامن / تالاموس / پونز\nCAA → آمیلوئید در عروق کورتیکال → لوبار اکسیپیتال / پاریتال → SWI: میکروبلید متعدد',
    ),
    tag: 'icb-aetiology',
  },
  // ── 10. Ringenhancement ────────────────────────────────────────────────────
  {
    front: L('Ringenhancement bei ICB · Wie lange? · DD?', 'Ring enhancement in ICB · How long? · DD?', 'Ring تقویت پس از تزریق در ICB · چقدر؟ · DD؟'),
    back: L(
      'Dauer: bis zu 6 Monate nach Blutung\nUrsache: Blut-Hirn-Schrankenstörung am Resorptionsrand\nDD: Abszess (DWI-Restriktion im Zentrum)\n    Metastase (Ödem > Läsion)\n    Glioblastom (irreguläres Enhancement)',
      'Duration: up to 6 months after haemorrhage\nCause: BBB disruption at resorption rim\nDD: abscess (DWI restriction in centre)\n    metastasis (oedema > lesion)\n    glioblastoma (irregular enhancement)',
      'مدت: تا ۶ ماه پس از خونریزی\nعلت: اختلال BBB در لبه جذب\nDD: آبسه (محدودیت DWI مرکزی)\n    متاستاز (ادم > ضایعه)\n    گلیوبلاستوم (تقویت پس از تزریق نامنظم)',
    ),
    explanation: L(
      'Ein Ringenhancement entsteht durch Störung der Blut-Hirn-Schranke am Resorptionsrand der Blutung – Makrophagen und Neovaskularisation bilden einen lecken Kapillarring. Es kann bis zu 6 Monate nach der initialen ICB persistieren und ist in der subakuten Phase normal. Wichtige Differenzialdiagnosen: Hirnabszess (DWI-Restriktion im Zentrum = Eiter), Hirnmetastase (perifokales Ödem größer als Läsion), Glioblastom (unregelmäßiges, wandnahes Enhancement). Der klinische Kontext (bekannte Blutung? Fieber? bekannter Tumor?) ist entscheidend.',
      'Ring enhancement arises from BBB disruption at the resorption rim of the haematoma — macrophages and neovascularisation form a leaky capillary ring. It can persist up to 6 months after the initial ICB and is normal in the subacute phase. Key differential diagnoses: brain abscess (DWI restriction in centre = pus), brain metastasis (perifocal oedema larger than lesion), glioblastoma (irregular wall-based enhancement). Clinical context (known haemorrhage? fever? known tumour?) is decisive.',
      'Ring تقویت پس از تزریق به دلیل اختلال سد خونی-مغزی در لبه جذب هماتوم ایجاد می‌شود — ماکروفاژها و نئوواسکولاریزاسیون یک حلقه مویرگی نشت‌دار تشکیل می‌دهند. می‌تواند تا ۶ ماه پس از ICB اولیه باقی بماند. DD مهم: آبسه (محدودیت DWI مرکزی)، متاستاز (ادم > ضایعه)، GBM (تقویت پس از تزریق نامنظم).',
    ),
    tag: 'icb-ct',
  },
  // ── 11. CAVE: unverhältnismäßiges Ödem ────────────────────────────────────
  {
    front: L('CAVE: Ödem unverhältnismäßig groß – woran denken?', 'CAUTION: oedema disproportionately large – think of?', 'احتیاط: ادم بیش از حد بزرگ — به چه فکر کنید؟'),
    back: L(
      '→ Sekundäre ICB!\nDD: Tumor mit Einblutung\n    Hämorrhagischer Infarkt\n    Vaskuläre Malformation (junger Patient)\nBei jungen Patienten ohne Hypertonus → CTA obligat!',
      '→ Secondary ICB!\nDD: tumour with haemorrhage\n    haemorrhagic infarct\n    vascular malformation (young patient)\nIn young patients without hypertension → CTA mandatory!',
      '→ ICB ثانویه!\nDD: تومور با خونریزی\n    انفارکت هموراژیک\n    مالفورماسیون عروقی (بیمار جوان)\nدر بیمار جوان بدون فشار خون → CTA اجباری!',
    ),
    explanation: L(
      'Ein Ödem, das unverhältnismäßig größer ist als das Hämatom, sollte immer an eine sekundäre Ursache denken lassen: (1) Tumor mit Einblutung (z.B. Glioblastom, Metastase) – das perifokale Ödem überwiegt die Blutung; (2) Hämorrhagischer Infarkt – kortikale/laminäre Hämorrhagie im Versorgungsgebiet einer Arterie, DWI-Restriktion; (3) Vaskuläre Malformation (AVM, Kavernom) – junger Patient ohne vaskuläre Risikofaktoren, ggf. Kavernomhalo in SWI. Bei jungen Patienten (<45 J.) ohne Hypertonie ist eine CTA obligat – eine behandelbare Ursache muss ausgeschlossen werden!',
      'Oedema disproportionately larger than the haematoma should always prompt consideration of a secondary cause: (1) tumour with haemorrhage (e.g. glioblastoma, metastasis) — perifocal oedema exceeds the haemorrhage; (2) haemorrhagic infarct — cortical/laminar haemorrhage in an arterial territory, DWI restriction; (3) vascular malformation (AVM, cavernoma) — young patient without vascular risk factors, possible cavernoma halo on SWI. In young patients (<45 years) without hypertension, CTA is mandatory — a treatable cause must be excluded!',
      'ادم بیش از حد بزرگ‌تر از هماتوم همیشه باید به یک علت ثانویه توجه کند: (۱) تومور با خونریزی (مثلاً GBM، متاستاز) — ادم پریفوکال بر خونریزی غلبه می‌کند؛ (۲) انفارکت هموراژیک — DWI محدودیت؛ (۳) مالفورماسیون عروقی (AVM، کاورنوم) — بیمار جوان بدون عوامل خطر. در بیماران جوان (<۴۵ سال) بدون هیپرتانسیون، CTA اجباری است!',
    ),
    diagram: L(
      'Ödem >> Hämatom → DD Tumor-Blutung → DD Hämorr. Infarkt → DD AVM/Kavernom → CTA obligat!',
      'Oedema >> haematoma → DD tumour bleed → DD haemorrhagic infarct → DD AVM/cavernoma → CTA mandatory!',
      'ادم >> هماتوم → DD خونریزی تومور → DD انفارکت هموراژیک → DD AVM/کاورنوم → CTA اجباری!',
    ),
    tag: 'icb-aetiology',
  },
  // ── 12. Sequenzen je Stadium ───────────────────────────────────────────────
  {
    front: L('Welche MRT-Sequenz für welche ICB-Phase?', 'Which MRI sequence for which ICB phase?', 'کدام سکانس MRI برای کدام مرحله ICB؟'),
    back: L(
      'Akut: CT zuerst; T2*/SWI ergänzt Suszeptibilitätsinformation\nSubakut: T1/T2 gemeinsam mit Blutprodukten interpretieren\nChronisch: Suszeptibilitätssequenzen helfen bei kleinen alten Blutprodukten\n⚠ Signale variieren; CT und MRT beantworten unterschiedliche Fragen.',
      'Acute: CT first; T2*/SWI add susceptibility information\nSubacute: interpret T1/T2 together with blood products\nChronic: susceptibility-sensitive sequences help depict small old blood products\n⚠ Signals vary; CT and MRI answer different questions.',
      'حاد: ابتدا CT؛ T2*/SWI اطلاعات susceptibility را تکمیل می‌کند\nزیرحاد: T1/T2 را همراه با محصولات خونی تفسیر کنید\nمزمن: سکانس‌های حساس به susceptibility برای محصولات خونی قدیمی کوچک کمک‌کننده‌اند\n⚠ سیگنال متغیر است؛ CT و MRI پرسش‌های متفاوتی را پاسخ می‌دهند.',
    ),
    explanation: L(
      'Das MRT-Signal hängt von Hämoglobinabbauprodukt und Erythrozytenintegrität ab. T1-/T2-Muster und Suszeptibilitätseffekte ändern sich im Verlauf; die Zeitpunkte sind variabel. Übergänge können peripher beginnen, sodass verschiedene Signalstadien gleichzeitig vorkommen.',
      'MRI signal depends on the haemoglobin degradation product and erythrocyte integrity. T1/T2 patterns and susceptibility effects change over time; timing is variable. Transitions may begin peripherally, so different signal stages can coexist.',
      'سیگنال MRI به محصول تجزیهٔ هموگلوبین و یکپارچگی اریتروسیت بستگی دارد. الگوهای T1/T2 و اثرات susceptibility در طول زمان تغییر می‌کنند و زمان‌بندی متغیر است. گذار ممکن است از محیط آغاز شود، بنابراین چند مرحلهٔ سیگنال هم‌زمان دیده شوند.',
    ),
    diagram: L(
      'Hyperakut/Akut (Deoxy-Hb) → SWI Blooming\nFrüh subakut (intrazell. Met-Hb) → T1 hell\nSpät subakut (extrazell. Met-Hb) → T1 + T2 + SWI\nChronisch (Hämosiderin) → SWI (lebenslang)',
      'Hyperacute/Acute (DeoxyHb) → SWI blooming\nEarly subacute (intracell. MetHb) → T1 bright\nLate subacute (extracell. MetHb) → T1 + T2 + SWI\nChronic (haemosiderin) → SWI (lifelong)',
      "فوق‌حاد/حاد (Deoxy-Hb) → آرتیفکت شکوفه‌ای در SWI\nزیرحاد اولیه (Met-Hb داخل) → T1 روشن\nزیرحاد دیررس (Met-Hb خارج) → T1 + T2 + SWI\nمزمن (هموسیدرین) → SWI (تمام عمر)",
    ),
    tag: 'icb-mrt',
  },
]

export const ICB_FLASHCARDS = ICB_FLASHCARD_SEEDS.map((item, index) => ({
  id: `icb-fc-${String(index + 1).padStart(2, '0')}`,
  topicId: 'intrazerebrale-blutung',
  front: item.front,
  back: item.back,
  explanation: item.explanation,
  diagram: item.diagram,
  tag: item.tag,
}))

// ── FALLPRÜFUNGS-CASES (für Homepage / faelle/pruefung) ─────────────────────

export const ICB_PRUEFUNG_CASES = [
  {
    id: 'icb-pruefung-swirl',
    fachId: 'gehirn',
    kapitelId: 'kopf-vaskulaer',
    topicId: 'intrazerebrale-blutung',
    image: '/icb/case-ct-cerebellum-gross.png',
    modality: 'CT',
    plane: 'CT · axial · nativ',
    title: L('Hyperdenses Hämatom im Kleinhirn mit Ödemsaum', 'Hyperattenuating cerebellar haematoma with oedema rim', 'هماتوم هایپردنس مخچه با حلقه ادم'),
    vignette: L(
      '71-jähriger Patient unter Phenprocoumon-Therapie (INR 3,8) mit plötzlich einsetzendem Schwindel, Erbrechen und schwerer Stand- und Gangataxie. GCS 12. Was ist die bildgebende Diagnose und was zeigt das beschriebene Zeichen an?',
      'A 71-year-old man on phenprocoumon (INR 3.8) presents with sudden vertigo, vomiting and severe truncal and gait ataxia. GCS 12. What is the imaging diagnosis and what does the described sign indicate?',
      'مرد ۷۱ ساله تحت درمان فنپروکومون (INR ۳.۸) با سرگیجه ناگهانی، استفراغ و آتاکسی شدید تنه و راه‌رفتن مراجعه می‌کند. GCS برابر ۱۲ است. تشخیص تصویربرداری و معنی علامت توصیف‌شده چیست؟'
    ),
    question: L(
      'Welche Befundung und Interpretation passen am besten zu diesem CT-Bild?',
      'Which reporting and interpretation best match this CT image?',
      'کدام گزارش و تفسیر با این تصویر CT بهترین تطابق را دارد؟'
    ),
    options: [
      { id: 'A', text: L('ICB mit Swirl Sign · möglicher Anteil unkoagulierten Blutes · erhöhtes Expansionsrisiko', 'ICB with swirl sign · possible unclotted blood component · increased expansion risk', 'ICB با علامت چرخش؛ احتمال وجود خون منعقدنشده و افزایش خطر گسترش') },
      { id: 'B', text: L('Ischämischer Infarkt mit perifokaler Hypodensität', 'Ischaemic infarct with perilesional hypodensity', 'انفارکت ایسکمیک با هیپودنسیتی اطراف') },
      { id: 'C', text: L('Abszess mit zentraler Nekrose · kein Hinweis auf Blutung', 'Abscess with central necrosis · no sign of haemorrhage', 'آبسه با نکروز مرکزی · بدون نشانه خونریزی') },
      { id: 'D', text: L('Subdurale Blutung über dem Parenchym', 'Subdural haematoma over the parenchyma', 'هماتوم ساب‌دورال روی پارانشیم') },
    ],
    correct: 'A',
    explanation: L(
      'Das hyperdense Hämatom mit eingestreuten hypodensen Arealen entspricht dem Swirl Sign. Die weniger dichten Anteile können unkoaguliertes Blut darstellen und sind mit einem erhöhten Risiko der Hämatomexpansion assoziiert; das Zeichen beweist eine aktuell aktive Blutung jedoch nicht allein. Bei OAK-Einnahme (INR 3,8) ist eine rasche Antagonisierung indiziert.',
      'A hyperattenuating haematoma with interspersed hypodense areas represents the swirl sign. The lower-density components may reflect unclotted blood and are associated with increased haematoma expansion risk, but the sign alone does not prove active bleeding at that moment. With anticoagulation (INR 3.8), rapid reversal is indicated.',
      'هماتوم هایپردنس با نواحی هیپودنس پراکنده با علامت چرخش سازگار است. بخش‌های کم‌دانسیته ممکن است خون منعقدنشده باشند و با افزایش خطر گسترش هماتوم ارتباط دارند، اما این علامت به‌تنهایی خونریزی فعال در همان لحظه را اثبات نمی‌کند. با مصرف ضدانعقاد و INR برابر ۳.۸، معکوس‌سازی سریع اندیکاسیون دارد.'
    ),
    source: 'https://radiopaedia.org/articles/intracerebral-haemorrhage?lang=us',
    credit: 'Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0',
  },
  {
    id: 'icb-pruefung-ring',
    fachId: 'gehirn',
    kapitelId: 'kopf-vaskulaer',
    topicId: 'intrazerebrale-blutung',
    image: '/icb/case-t1-subakut-bright.jpg',
    modality: 'MRT',
    plane: 'MRT · T1 · axial · nativ · früh subakut',
    title: L('ICB früh subakut · T1 hyperintens · Wendepunkt', 'ICB early subacute · T1 hyperintense · turning point', 'ICB زیرحاد اولیه · T1 هایپرانتنس · نقطه عطف'),
    vignette: L(
      '58-jährige Patientin, bekannte Hypertonikerin, stationäre Aufnahme nach initialer CCT-Diagnose einer Kleinhirnblutung. Kontroll-MRT am Tag 5: T1-gewichtete Sequenz zeigt eine hyperintense Läsion im rechten Kleinhirn. Welche Interpretation ist korrekt?',
      'A 58-year-old woman with known hypertension, admitted after initial NCCT diagnosis of cerebellar haemorrhage. Follow-up MRI on day 5: T1-weighted sequence shows a hyperintense lesion in the right cerebellum. Which interpretation is correct?',
      'خانم ۵۸ ساله با فشار خون شناخته‌شده، بستری پس از تشخیص اولیه CT از خونریزی مخچه. MRI کنترل در روز ۵: سکانس T1 ضایعه هایپرانتنس در مخچه راست نشان می‌دهد. کدام تفسیر صحیح است؟'
    ),
    question: L(
      'Was ist die Ursache der T1-Hyperintensität in diesem MRT-Bild?',
      'What causes the T1 hyperintensity in this MRI image?',
      'علت هایپرانتنسیتی T1 در این تصویر MRI چیست؟'
    ),
    options: [
      { id: 'A', text: L('Akutes Deoxy-Hb · paramagnetisch · T1 immer hell', 'Acute deoxyHb · paramagnetic · T1 always bright', 'Deoxy-Hb حاد · پاراماگنتیک · T1 همیشه روشن') },
      { id: 'B', text: L('Intrazelluläres Met-Hb (früh subakut) · T1 oft hell, T2 kann noch hypointens sein', 'Intracellular metHb (early subacute) · T1 often bright, T2 may remain hypointense', 'Met-Hb داخل‌سلولی (زیرحاد اولیه) · T1 اغلب پرسیگنال؛ T2 ممکن است همچنان کم‌سیگنال باشد') },
      { id: 'C', text: L('Hämosiderin in Makrophagen · SWI-Effekt', 'Haemosiderin in macrophages · SWI effect', 'هموسیدرین در ماکروفاژها · اثر SWI') },
      { id: 'D', text: L('Perifokales Ödem · T1 immer hyperintens', 'Perilesional oedema · T1 always hyperintense', 'ادم اطراف · T1 همیشه هایپرانتنس') },
    ],
    correct: 'B',
    explanation: L(
      'Im früh subakuten Verlauf ist intrazelluläres Met-Hb häufig mit T1-Hyperintensität und noch möglicher T2-Hypointensität verbunden. Zeitpunkt und Ausprägung sind variabel; der Übergang kann zuerst peripher auftreten.',
      'During the early subacute course, intracellular metHb is often associated with T1 hyperintensity while T2 may remain hypointense. Timing and appearance vary; the transition may first appear peripherally.',
      'در سیر زیرحاد اولیه، Met-Hb داخل‌سلولی اغلب با پرسیگنال‌شدن T1 همراه است، درحالی‌که T2 ممکن است کم‌سیگنال بماند. زمان و شدت متغیر است و گذار ممکن است ابتدا در محیط دیده شود.'
    ),
    source: 'https://radiopaedia.org/articles/intracerebral-haemorrhage?lang=us',
    credit: 'Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0',
  },
]
