// Concise, trilingual reading lesson. The quiz/flashcard bank stays in caa.js.
const L = (de, en, fa) => ({ de, en, fa })
export const CAA_CHAPTERS = [
  { id: 'grundlagen', icon: 'brain', title: L('Grundlagen', 'Foundations', 'مبانی') },
  { id: 'klinik', icon: 'clinical', title: L('Klinische Manifestationen', 'Clinical manifestations', 'تظاهرات بالینی') },
  { id: 'mrt-def', icon: 'scan', title: L('MRT-Marker gezielt lesen', 'Read the MRI markers', 'نشانگرهای MRI را بررسی کنید') },
  { id: 'boston', icon: 'chart', title: L('Boston v2.0 anwenden', 'Apply Boston v2.0', 'معیارهای Boston v2.0 را به کار ببرید') },
  { id: 'differenzial', icon: 'vessel', title: L('Differenzialdiagnosen abgrenzen', 'Separate the differentials', 'تشخیص‌های افتراقی را تفکیک کنید') },
  { id: 'takehome', icon: 'spark', title: 'Take Home Message', emphasis: true },
]
export const CAA_TRACKED_IDS = CAA_CHAPTERS.filter(s => !s.emphasis).map(s => s.id)
export const CAA_COPY = {
  title: L('Zerebrale Amyloidangiopathie', 'Cerebral amyloid angiopathy', 'آنژیوپاتی آمیلوئید مغزی'),
  intro: L('Lobäre Blutungsmuster erkennen und Boston v2.0 sicher anwenden.', 'Recognise lobar bleeding patterns and apply Boston v2.0 with confidence.', 'الگوهای خونریزی لوبار را بشناسید و معیارهای Boston v2.0 را درست به کار ببرید.'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  read: L('gelesen', 'read', 'خوانده‌شده'),
  mark: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  marked: L('Als gelesen markiert', 'Marked as read', 'خوانده شد'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامه درس'),
  fullMark: L('Alles als gelesen', 'Mark all read', 'ثبت خواندن کل درس'),
  fullMarked: L('Alles gelesen', 'All read', 'کل درس خوانده شد'),
  auth: L('Anmelden, um den Abschluss im Profil zu speichern.', 'Sign in to save lesson completion to your profile.', 'برای ذخیره پایان درس در پروفایل، وارد شوید.'),
  login: L('Anmelden', 'Sign in', 'ورود'),
  mcq: L('MCQ starten', 'Start MCQs', 'شروع MCQ'),
  flashcards: L('Flashcards', 'Flashcards', 'فلش‌کارت‌ها'),
  key: L('Merke', 'Key point', 'نکته کلیدی'),
  warning: L('Cave', 'Caution', 'احتیاط'),
  sources: L('Quellen & Vertiefung', 'Sources & further reading', 'منابع و مطالعه بیشتر'),
  basics: [
    L('Die CAA beruht auf der pathologischen Ablagerung von β-Amyloid, insbesondere in den Wänden kleiner und mittelgroßer kortikaler und leptomeningealer Arterien sowie Arteriolen.', 'CAA results from pathological β-amyloid deposition, particularly in the walls of small and medium-sized cortical and leptomeningeal arteries and arterioles.', 'CAA ناشی از رسوب پاتولوژیک β-آمیلوئید، به‌ویژه در دیواره شریان‌های کوچک و متوسط و آرتریول‌های کورتیکال و لپتومننژیال است.'),
    L('Die Ablagerungen schädigen die Gefäßwand, beeinträchtigen ihre Elastizität und machen sie anfällig für Rupturen.', 'The deposits damage the vessel wall, impair its elasticity and make it vulnerable to rupture.', 'این رسوبات به دیواره رگ آسیب می‌زنند، انعطاف‌پذیری آن را کاهش می‌دهند و احتمال پارگی را بالا می‌برند.'),
  ],
  pathologyTitle: L('Pathologie', 'Pathology', 'پاتولوژی'),
  associationsTitle: L('Alzheimer & genetische Prädisposition', 'Alzheimer disease & genetic predisposition', 'آلزهایمر و زمینه ژنتیکی'),
  systemicWarning: L('Die sporadische β-Amyloid-CAA ist keine Manifestation einer systemischen Amyloidose.', 'Sporadic β-amyloid CAA is not a manifestation of systemic amyloidosis.', 'CAA اسپورادیک ناشی از β-آمیلوئید، تظاهر آمیلوئیدوز سیستمیک نیست.'),
  backgroundTitle: L('Häufigkeit, Alter & Geschlechter', 'Frequency, age & sex', 'شیوع، سن و جنسیت'),
  background: [
    { title: L('Häufigkeit', 'Frequency', 'شیوع'), paragraphs: [
      L('CAA gehört zu den wichtigsten Ursachen spontaner lobärer ICH im höheren Lebensalter.', 'CAA is a leading cause of spontaneous lobar ICH in older adults.', 'CAA از مهم‌ترین علل ICH لوبار خودبخودی در سالمندان است.'),
      L('Als grobe Orientierung werden etwa 15 % der spontanen intrazerebralen Blutungen im höheren Lebensalter der CAA zugeschrieben; publizierte Schätzungen reichen von 5–20 %.', 'As a rough guide, about 15% of spontaneous intracerebral haemorrhages in older adults are attributed to CAA; published estimates range from 5–20%.', 'به‌عنوان برآورد تقریبی، حدود ۱۵٪ خونریزی‌های داخل مغزی خودبخودی در سالمندان به CAA نسبت داده می‌شود؛ برآوردهای منتشرشده بین ۵ تا ۲۰٪ است.'),
    ] },
    { title: L('Alter & Formen', 'Age & forms', 'سن و انواع بیماری'), paragraphs: [
      L('Die sporadische Form betrifft überwiegend Menschen über 60 Jahre und die Häufigkeit steigt mit dem Alter.', 'The sporadic form mainly affects people over 60 and becomes more frequent with age.', 'نوع اسپورادیک بیشتر در افراد بالای ۶۰ سال دیده می‌شود و با افزایش سن شایع‌تر است.'),
      L('Hereditäre Formen, zum Beispiel Dutch-type CAA durch eine APP-Mutation, können deutlich früher auftreten.', 'Hereditary forms, such as Dutch-type CAA caused by an APP mutation, may present much earlier.', 'انواع ارثی، مانند CAA نوع هلندی ناشی از جهش APP، می‌توانند بسیار زودتر بروز کنند.'),
    ] },
    { title: L('Geschlechter', 'Sex', 'جنسیت'), paragraphs: [
      L('Männer und Frauen sind ungefähr gleich häufig betroffen.', 'Men and women are affected approximately equally often.', 'مردان و زنان تقریباً به یک اندازه درگیر می‌شوند.'),
      L('Das Geschlecht ist kein Boston-Kriterium.', 'Sex is not a Boston criterion.', 'جنسیت جزو معیارهای Boston نیست.'),
    ] },
  ],
  associations: [
    { title: L('Alzheimer-Assoziation', 'Association with Alzheimer disease', 'ارتباط با آلزهایمر'), paragraphs: [
      L('Bei Menschen mit Alzheimer kommt eine CAA häufig zusätzlich vor.', 'CAA often coexists with Alzheimer disease.', 'CAA اغلب همراه با بیماری آلزهایمر دیده می‌شود.'),
      L('In einer Metaanalyse wurde bei etwa 79 % der untersuchten Alzheimer-Fälle eine milde bis schwere CAA im Hirngewebe nachgewiesen.', 'A meta-analysis found mild-to-severe CAA in brain tissue in about 79% of the Alzheimer cases studied.', 'یک متاآنالیز، CAA خفیف تا شدید را در بافت مغز حدود ۷۹٪ موارد آلزهایمرِ بررسی‌شده نشان داد.'),
    ] },
    { title: L('Genetische Prädisposition', 'Genetic predisposition', 'زمینه ژنتیکی'), paragraphs: [
      L('Das APP-Gen liegt auf Chromosom 21. Bei Trisomie 21 führt die zusätzliche Genkopie zu mehr Amyloid-Vorläuferprotein und begünstigt frühe β-Amyloid-Ablagerungen, auch in Gefäßwänden.', 'The APP gene is located on chromosome 21. In trisomy 21, the additional gene copy increases amyloid precursor protein and favours early β-amyloid deposition, including in vessel walls.', 'ژن APP روی کروموزوم ۲۱ قرار دارد. در تریزومی ۲۱، نسخه اضافی ژن تولید پروتئین پیش‌ساز آمیلوئید را افزایش می‌دهد و زمینه رسوب زودرس β-آمیلوئید، از جمله در دیواره عروق، را فراهم می‌کند.'),
    ] },
  ],
  workflowTitle: L('So liest du das Blutungsmuster', 'How to read the bleeding pattern', 'چگونه الگوی خونریزی را بررسی کنیم؟'),
  workflow: [
    [L('Lobär oder tief?', 'Lobar or deep?', 'لوبار یا عمقی؟'), L('Kortex und subkortikales Mark von tiefen Kernen unterscheiden.', 'Separate cortex and subcortical white matter from deep nuclei.', 'قشر و ماده سفید زیرقشری را از هسته‌های عمقی تفکیک کنید.'), 'brain'],
    ['SWI / GRE', L('Mikroblutungen und oberflächliche Siderose suchen.', 'Look for microbleeds and superficial siderosis.', 'میکروخونریزی و سیدروز سطحی را جست‌وجو کنید.'), 'scan'],
    ['FLAIR / T2', L('cSAH und spezifische Marklager-Marker prüfen.', 'Check cSAH and specific white matter markers.', 'cSAH و نشانگرهای اختصاصی ماده سفید را بررسی کنید.'), 'vessel'],
    ['Boston v2.0', L('Klinik, Alter und Ausschlusskriterien einbeziehen.', 'Include clinical presentation, age and exclusions.', 'علائم بالینی، سن و معیارهای رد را در نظر بگیرید.'), 'chart'],
  ],
  amyloid: [
    L('CAA und Alzheimer teilen die β-Amyloid-Pathologie mit unterschiedlichen Ablagerungsorten:', 'CAA and Alzheimer disease share β-amyloid pathology at different deposit locations:', 'CAA و آلزهایمر پاتولوژی β-آمیلوئید مشترکی دارند، اما محل رسوب متفاوت است:'),
    L('Gefäßwand bei CAA.', 'Vessel walls in CAA.', 'دیواره رگ در CAA.'),
    L('Parenchymale Plaques bei Alzheimer.', 'Parenchymal plaques in Alzheimer disease.', 'پلاک‌های پارانشیمی در آلزهایمر.'),
  ],
  deepWarning: L('Eine tiefe ICH oder Mikroblutung verhindert die MRT-Einstufung als probable oder possible CAA nach Boston v2.0. Sie schließt eine gleichzeitig bestehende CAA jedoch nicht aus.', 'A deep ICH or microbleed prevents an MRI-based classification as probable or possible CAA under Boston v2.0. It does not exclude coexisting CAA.', 'وجود ICH یا میکروخونریزی عمقی مانع طبقه‌بندی MRI به‌عنوان CAA محتمل یا ممکن طبق Boston v2.0 می‌شود؛ اما هم‌زمانی CAA را رد نمی‌کند.'),
  schematic: L('Entscheidend ist die Verteilung, nicht die Zahl der Punkte.', 'Focus on distribution, not the number of dots.', 'به توزیع توجه کنید، نه تعداد نقطه‌ها.'),
  lobar: L('CAA: lobär', 'CAA: lobar', 'CAA: لوبار'),
  deep: L('Arteriolosklerose: tief', 'Arteriolosclerosis: deep', 'آرتریولواسکلروز: عمقی'),
  markerIntro: [
    L('Vier typische Blutungsmuster prägen die CAA: lobäre ICH, strikt lobäre Mikroblutungen, Konvexitäts-SAH und kortikale superfizielle Siderose. Sie betreffen die lobären oder oberflächlichen Kompartimente; tiefe ICH/CMB sprechen gegen die MRT-Kategorien der Boston-Kriterien.', 'Four typical bleeding patterns characterise CAA: lobar ICH, strictly lobar microbleeds, convexity SAH and cortical superficial siderosis. They involve lobar or superficial compartments; deep ICH/CMB preclude the MRI-based Boston categories.', 'چهار الگوی خونریزی شاخص CAA عبارت‌اند از ICH لوبار، میکروخونریزی صرفاً لوبار، SAH کانوکسیتی و سیدروز سطحی قشری. این الگوها در نواحی لوبار یا سطحی دیده می‌شوند؛ ICH یا CMB عمقی با طبقه‌بندی MRI طبق Boston سازگار نیست.'),
    L('SWI oder T2*-GRE erfasst Blutabbauprodukte; FLAIR und T2 ergänzen die Beurteilung. Ein dunkler Punkt allein ist noch keine Mikroblutung: Gefäße, Verkalkung und Artefakte ausschließen.', 'SWI or T2*-GRE detects blood products; FLAIR and T2 provide complementary information. A dark dot alone is not a microbleed: exclude vessels, calcification and artefacts.', 'SWI یا T2*-GRE محصولات خون را نشان می‌دهد؛ FLAIR و T2 اطلاعات تکمیلی می‌دهند. هر نقطه تیره میکروخونریزی نیست: رگ، کلسیفیکاسیون و آرتیفکت را کنار بگذارید.'),
  ],
  markerHeaders: [L('Blutungsmuster', 'Bleeding pattern', 'الگوی خونریزی'), L('Lokalisation & Sequenz', 'Location & sequence', 'محل و سکانس'), L('Bild & Bedeutung', 'Appearance & significance', 'تصویر و اهمیت')],
  markerRows: [
    [L('Lobäre ICH', 'Lobar ICH', 'ICH لوبار'), [L('Kortex / subkortikales Mark eines Hirnlappens.', 'Cortex / subcortical white matter of a cerebral lobe.', 'قشر یا ماده سفید زیرقشری یک لوب مغزی.'), 'CT / MRT'], [L('Lobäres Hämatom, oft mit Masseneffekt.', 'Lobar haematoma, often with mass effect.', 'هماتوم لوبار، اغلب با اثر فشاری.'), L('Klinisch besonders wichtig: akute schlaganfallähnliche Ausfälle.', 'A major clinical presentation: acute stroke-like deficits.', 'تظاهر بالینی مهم: نقص عصبی حاد شبیه سکته.')]],
    [L('CMB · Mikroblutungen', 'CMB · Cerebral microbleeds', 'CMB · میکروخونریزی مغزی'), [L('Strikt lobär: kortikal / subkortikal.', 'Strictly lobar: cortical / subcortical.', 'صرفاً لوبار: قشری یا زیرقشری.'), 'SWI / GRE'], [L('Kleine rundliche Suszeptibilitätsherde mit Blooming.', 'Small rounded susceptibility foci with blooming.', 'کانون‌های کوچک و گرد سوسپتیبیلیتی با blooming.'), L('Meist ohne akute Symptome; tiefe CMB weisen eher auf Arteriolosklerose hin.', 'Usually without acute symptoms; deep CMB favour arteriolosclerosis.', 'اغلب بدون علامت حاد؛ CMB عمقی بیشتر به نفع آرتریولواسکلروز است.')]],
    [L('cSAH · Konvexitäts-SAH', 'cSAH · Convexity subarachnoid haemorrhage', 'cSAH · خونریزی زیرعنکبوتیه کانوکسیتی'), [L('Oberflächliche Sulci über den Konvexitäten.', 'Superficial sulci over the convexities.', 'شیارهای سطحی کانوکسیتی مغز.'), 'CT / FLAIR / SWI'], [L('Akutes sulkales Blut; von basaler / aneurysmatischer SAH unterscheiden.', 'Acute sulcal blood; distinguish from basal / aneurysmal SAH.', 'خون حاد داخل شیار؛ از SAH قاعده‌ای یا آنوریسمی تفکیک شود.'), L('Kann TFNE oder Kopfschmerzen begleiten; nicht CAA-spezifisch.', 'May accompany TFNE or headache; not specific to CAA.', 'می‌تواند با TFNE یا سردرد همراه باشد؛ اختصاصی CAA نیست.')]],
    [L('cSS · Kortikale superfizielle Siderose', 'cSS · Cortical superficial siderosis', 'cSS · سیدروز سطحی قشری'), [L('Entlang der kortikalen Sulci.', 'Along the cortical sulci.', 'در امتداد شیارهای قشری.'), 'SWI / GRE'], [L('Kurvilineares Hämosiderin als Residuum früherer oberflächlicher Blutungen.', 'Curvilinear haemosiderin as residue of previous superficial bleeding.', 'هموسیدرین خطی یا منحنی به‌عنوان اثر خونریزی سطحی قبلی.'), L('Charakteristischer CAA-Marker; mit TFNE und erhöhtem Blutungsrisiko assoziiert.', 'A characteristic CAA marker associated with TFNE and increased bleeding risk.', 'نشانگر شاخص CAA، مرتبط با TFNE و افزایش خطر خونریزی.')]],
  ],
  clinicalIntro: L('Die Klinik reicht von akuten fokalen Ausfällen bis zu schleichender kognitiver Verschlechterung. Mikroblutungen und eine kortikale superfizielle Siderose (cSS) können auch ohne aktuelle Beschwerden nachgewiesen werden.', 'Presentation ranges from acute focal deficits to gradual cognitive decline. Microbleeds and cortical superficial siderosis (cSS) may also be detected without current symptoms.', 'تظاهرات از نقص عصبی کانونی حاد تا افت شناختی تدریجی متفاوت است. میکروخونریزی و سیدروز سطحی قشری (cSS) ممکن است بدون علائم فعلی نیز شناسایی شوند.'),
  acuteTitle: L('Akute Manifestationen', 'Acute manifestations', 'تظاهرات حاد'),
  acute: [
    { title: L('Lobäre intrazerebrale Hämorrhagie', 'Lobar intracerebral haemorrhage', 'خونریزی داخل مغزی لوبار'), paragraphs: [
      L('Plötzliche Schlaganfallsymptome, abhängig vom betroffenen Lappen, zum Beispiel Hemiparese, Aphasie oder Gesichtsfeldausfall.', 'Sudden stroke-like symptoms depending on the affected lobe, such as hemiparesis, aphasia or a visual field deficit.', 'علائم ناگهانی شبیه سکته، بسته به لوب درگیر: مانند همی‌پارزی، آفازی یا نقص میدان بینایی.'),
    ] },
    { title: L('Transiente fokale neurologische Episoden (TFNE)', 'Transient focal neurological episodes (TFNE)', 'حملات عصبی کانونی گذرا (TFNE)'), paragraphs: [
      L('Transiente fokale neurologische Episoden sind meist kurz, wiederkehrend und stereotyp. Typisch sind wandernde Parästhesien, zum Beispiel von der Hand zum Arm; auch Schwäche oder Sprachstörungen sind möglich.', 'Transient focal neurological episodes are usually brief, recurrent and stereotyped. Spreading paraesthesias, for example from the hand to the arm, are typical; weakness or language disturbances may also occur.', 'حملات عصبی کانونی گذرا معمولاً کوتاه، تکرارشونده و با الگوی مشابه‌اند. پارستزی گسترش‌یابنده، مثلاً از دست به بازو، شاخص است؛ ضعف یا اختلال گفتار هم ممکن است رخ دهد.'),
      L('Sie dauern häufig Minuten und können bei cSAH oder cSS auftreten. Das Muster kann eine TIA imitieren, ist aber kein Beleg für eine arterielle Embolie.', 'They commonly last minutes and may occur with cSAH or cSS. The pattern can mimic a TIA but is not evidence of an arterial embolus.', 'اغلب چند دقیقه طول می‌کشند و می‌توانند با cSAH یا cSS همراه باشند. این الگو ممکن است شبیه TIA باشد، اما وجود آمبولی شریانی را ثابت نمی‌کند.'),
    ] },
  ],
  otherClinicalTitle: L('Chronische Manifestationen', 'Chronic manifestations', 'تظاهرات مزمن'),
  otherClinical: [
    { title: L('Kognitive Störung / Demenz', 'Cognitive impairment / dementia', 'اختلال شناختی یا دمانس'), paragraphs: [
      L('Ein chronisch-progressiver Verlauf ist möglich, etwa mit verlangsamter Verarbeitung und exekutiven Defiziten. Vaskuläre Schädigung und eine begleitende Alzheimer-Pathologie können gemeinsam beitragen.', 'A chronic progressive course is possible, with slowed processing and executive deficits. Vascular injury and coexisting Alzheimer pathology may both contribute.', 'سیر مزمن و پیشرونده ممکن است با کندی پردازش و اختلال عملکرد اجرایی همراه باشد. آسیب عروقی و پاتولوژی هم‌زمان آلزهایمر می‌توانند هر دو نقش داشته باشند.'),
      L('Eine kognitive Störung ist eine mögliche klinische Eingangsvoraussetzung für Boston v2.0, aber weder zwingend vorhanden noch allein diagnostisch.', 'Cognitive impairment is one possible qualifying clinical presentation for Boston v2.0, but it is neither mandatory nor diagnostic on its own.', 'اختلال شناختی یکی از تظاهرات بالینی قابل قبول برای Boston v2.0 است؛ وجود آن الزامی نیست و به‌تنهایی تشخیصی محسوب نمی‌شود.'),
    ] },
    { title: L('Epileptische Anfälle', 'Epileptic seizures', 'حملات صرعی'), paragraphs: [
      L('Fokale Anfälle können bei kortikaler Blutung oder ihren Residuen auftreten. Sie sind nicht auf den chronischen Verlauf beschränkt; TFNE sind nicht automatisch epileptische Anfälle.', 'Focal seizures may occur with cortical bleeding or its sequelae. They are not confined to the chronic course; TFNE are not automatically epileptic seizures.', 'تشنج کانونی ممکن است در زمینه خونریزی قشری یا آثار آن رخ دهد و محدود به سیر مزمن نیست؛ TFNE لزوماً حمله صرعی نیست.'),
    ] },
    { title: L('Kopfschmerzen', 'Headache', 'سردرد'), paragraphs: [
      L('Möglich, aber unspezifisch und auch bei akuter Blutung. Neue starke Kopfschmerzen verlangen die Suche nach Blutung und anderen Ursachen; sie beweisen weder CAA noch rezidivierende Mikroblutungen.', 'Possible but nonspecific, and may accompany acute bleeding. New severe headache requires assessment for bleeding and other causes; it proves neither CAA nor recurrent microbleeds.', 'ممکن است رخ دهد، اما غیراختصاصی است و در خونریزی حاد هم دیده می‌شود. سردرد شدید جدید نیازمند بررسی خونریزی و علل دیگر است؛ به‌تنهایی CAA یا میکروخونریزی مکرر را ثابت نمی‌کند.'),
    ] },
  ],
  wmTitle: L('Nur diese zwei White-Matter-Marker zählen', 'Only these two white matter markers count', 'فقط این دو نشانگر ماده سفید در معیارها حساب می‌شوند'),
  wm: [
    { title: L('Schwere CSO-PVS', 'Severe CSO-PVS', 'CSO-PVS شدید'), text: L('Mehr als 20 sichtbare perivaskuläre Räume im Centrum semiovale einer Hemisphäre auf einer axialen T2-Schicht. Basalganglien-PVS ersetzen diesen Marker nicht.', 'More than 20 visible perivascular spaces in the centrum semiovale of one hemisphere on one axial T2 slice. Basal ganglia PVS do not substitute for this marker.', 'بیش از ۲۰ فضای اطراف عروقی در centrum semiovale یک نیمکره، در یک برش آگزیال T2. PVS عقده‌های قاعده‌ای جایگزین این نشانگر نیست.') },
    { title: L('WMH-Multispot-Muster', 'WMH multispot pattern', 'الگوی چندنقطه‌ای WMH'), text: L('Mehr als 10 kleine rundliche oder ovale T2/FLAIR-Hyperintensitäten im subkortikalen Mark beider Hemisphären. Unspezifische konfluierende WMH allein genügen nicht.', 'More than 10 small round or oval T2/FLAIR hyperintensities in the subcortical white matter of both hemispheres. Nonspecific confluent WMH alone is insufficient.', 'بیش از ۱۰ کانون کوچک گرد یا بیضی با سیگنال بالای T2/FLAIR در ماده سفید زیرقشری دو نیمکره. WMH به‌هم‌پیوسته و غیراختصاصی به‌تنهایی کافی نیست.') },
  ],
  bostonIntro: [
    L('Boston v2.0 ermöglicht eine klinisch-radiologische Einstufung als probable oder possible CAA ohne Gewebeprobe. Dafür werden Klinik und MRT-Muster gemeinsam beurteilt.', 'Boston v2.0 allows a clinical–radiological classification as probable or possible CAA without tissue sampling. Clinical presentation and MRI pattern are assessed together.', 'Boston v2.0 امکان طبقه‌بندی بالینی–رادیولوژیک CAA محتمل یا ممکن را بدون نمونه بافت فراهم می‌کند. علائم بالینی و الگوی MRI باید در کنار هم ارزیابی شوند.'),
    L('Voraussetzungen: Alter ≥50 Jahre und spontane ICH, TFNE oder kognitive Störung / Demenz. Es dürfen keine tiefen ICH/CMB und keine andere Ursache der relevanten Läsionen vorliegen.', 'Prerequisites: age ≥50 and spontaneous ICH, TFNE or cognitive impairment / dementia. There must be no deep ICH/CMB and no alternative cause of the relevant lesions.', 'پیش‌شرط‌ها: سن \u2066≥۵۰\u2069 سال و ICH خودبخودی، TFNE یا اختلال شناختی / دمانس. ICH یا CMB عمقی و علت دیگری برای ضایعات مورد ارزیابی نباید وجود داشته باشد.'),
  ],
  probable: L('Probable CAA', 'Probable CAA', 'CAA محتمل · Probable'),
  possible: L('Possible CAA', 'Possible CAA', 'CAA ممکن · Possible'),
  hemorrhages: L('strikt lobäre Blutungsläsionen', 'strictly lobar haemorrhagic lesions', 'ضایعات خونریزی‌دهنده صرفاً لوبار'),
  combination: L('lobäre Blutungsläsion + spezifischer WM-Marker', 'lobar haemorrhagic lesion + specific WM marker', 'ضایعه خونریزی لوبار + نشانگر اختصاصی ماده سفید'),
  possibleRule: L('Eine strikt lobäre Blutungsläsion ODER ein spezifischer WM-Marker, ohne die probable-Kriterien zu erfüllen.', 'One strictly lobar haemorrhagic lesion OR one specific WM marker, without meeting probable criteria.', 'یک ضایعه خونریزی صرفاً لوبار یا یک نشانگر اختصاصی ماده سفید، بدون احراز معیارهای CAA محتمل.'),
  or: L('ODER', 'OR', 'یا'),
  counting: L('ICH, CMB und cSS/cSAH-Herde zählen in beliebiger Kombination. Räumlich getrennte cSS/cSAH-Herde können mehrere Läsionen darstellen; Blut und Siderose am selben Ort nicht doppelt zählen. Kleinhirnblutungen zählen weder als lobär noch als tief.', 'ICH, CMB and cSS/cSAH foci count in any combination. Spatially separate cSS/cSAH foci can represent multiple lesions; do not double-count blood and siderosis at the same site. Cerebellar haemorrhages count as neither lobar nor deep.', 'ICH، CMB و کانون‌های cSS/cSAH در هر ترکیبی حساب می‌شوند. کانون‌های جدا از هم می‌توانند چند ضایعه باشند؛ خون و سیدروز در یک محل را دوبار نشمارید. خونریزی مخچه نه لوبار و نه عمقی محسوب می‌شود.'),
  pathology: L('Probable ist eine klinisch-radiologische Kategorie. Definite CAA erfordert die vollständige postmortale Untersuchung; eine Biopsie kann die Kategorie mit unterstützender Pathologie begründen.', 'Probable is a clinical–radiological category. Definite CAA requires full postmortem examination; biopsy can support the category with supporting pathology.', 'CAA محتمل یک طبقه‌بندی بالینی–رادیولوژیک است. CAA قطعی به بررسی کامل پس از مرگ نیاز دارد؛ بیوپسی می‌تواند طبقه «محتمل با پشتیبانی پاتولوژی» را تأیید کند.'),
  ddIntro: L('Die Verteilung ist stärker als eine Hypertonieanamnese: Hypertonie kann auch bei CAA bestehen. Bei gemischten Mustern keine reine CAA aus der MRT ableiten.', 'Distribution is more informative than a history of hypertension: hypertension can coexist with CAA. Do not infer pure CAA from a mixed pattern.', 'توزیع ضایعات از سابقه فشار خون راهگشاتر است؛ پرفشاری خون می‌تواند با CAA هم‌زمان باشد. از الگوی مختلط، CAA خالص نتیجه نگیرید.'),
  ddHeaders: [L('Diagnose', 'Diagnosis', 'تشخیص'), L('Typisches Muster', 'Typical pattern', 'الگوی معمول'), L('Abgrenzung / nächster Schritt', 'Distinction / next step', 'افتراق و گام بعدی')],
  ddRows: [
    ['CAA', L('Lobäre ICH/CMB, sulkale cSS oder cSAH.', 'Lobar ICH/CMB, sulcal cSS or cSAH.', 'ICH یا CMB لوبار، cSS شیاری یا cSAH.'), L('Höheres Alter und TFNE unterstützen den Verdacht; Boston-Kriterien und Alternativursachen prüfen.', 'Older age and TFNE support suspicion; check Boston criteria and alternative causes.', 'سن بالاتر و TFNE شک را تقویت می‌کنند؛ معیارهای Boston و علل جایگزین بررسی شوند.')],
    [L('Hypertensive Arteriolosklerose', 'Hypertensive arteriolosclerosis', 'آرتریولواسکلروز مرتبط با فشار خون'), L('ICH/CMB in Basalganglien, Thalamus oder Pons; auch Kleinhirnblutungen möglich.', 'ICH/CMB in basal ganglia, thalamus or pons; cerebellar haemorrhage is also possible.', 'ICH یا CMB در عقده‌های قاعده‌ای، تالاموس یا پونز؛ خونریزی مخچه هم ممکن است.'), L('Basalganglien-PVS und konfluierende WMH können begleiten, sind aber unspezifisch. Hypertonie allein trennt nicht von CAA.', 'Basal ganglia PVS and confluent WMH may accompany it but are nonspecific. Hypertension alone does not distinguish it from CAA.', 'PVS عقده‌های قاعده‌ای و WMH به‌هم‌پیوسته ممکن است همراه باشند، اما اختصاصی نیستند. فشار خون بالا به‌تنهایی CAA را تفکیک نمی‌کند.')],
    [L('AVM-Blutung', 'AVM haemorrhage', 'خونریزی AVM'), L('Variable, auch lobäre Blutung; serpiginöse Gefäße / Flow-Voids oder ein Nidus.', 'Variable bleeding, including lobar; serpiginous vessels / flow voids or a nidus.', 'خونریزی با محل متغیر، از جمله لوبار؛ عروق مارپیچی، flow void یا نیدوس.'), L('CTA/MRA zur Gefäßabklärung, bei begründetem Verdacht gegebenenfalls DSA. Auch bei älteren Patienten ausschließen.', 'Evaluate vessels with CTA/MRA; consider DSA when suspicion warrants it. Also exclude it in older patients.', 'ارزیابی عروقی با CTA یا MRA؛ در صورت شک موجه، DSA نیز ممکن است لازم باشد. در سالمندان هم باید بررسی شود.')],
    [L('Kavernom', 'Cavernous malformation', 'کاورنوم'), L('Gemischte Blutprodukte im „Popcorn“-Muster mit Hämosiderinsaum; kleine Läsionen können CMB ähneln.', 'Mixed blood products with a popcorn appearance and haemosiderin rim; small lesions may resemble CMB.', 'محصولات خون با سن متفاوت، نمای پاپ‌کورن و حاشیه هموسیدرین؛ ضایعات کوچک ممکن است شبیه CMB باشند.'), L('T1/T2 und SWI zusammen lesen, eine begleitende DVA suchen. Enhancement ist möglich; frische Blutung kann Ödem verursachen.', 'Read T1/T2 together with SWI and look for an associated DVA. Enhancement is possible; recent bleeding may cause oedema.', 'T1 و T2 را همراه SWI بررسی کنید و به‌دنبال DVA همراه باشید. جذب کنتراست ممکن است وجود داشته باشد و خونریزی تازه می‌تواند ادم ایجاد کند.')],
    [L('Hämorrhagische Metastase / Tumor', 'Haemorrhagic metastasis / tumour', 'متاستاز یا تومور خونریزی‌دهنده'), L('Blutende Raumforderung, oft mit vasogenem Ödem und nodulärem KM-Enhancement; Metastasen können multipel sein.', 'Haemorrhagic mass, often with vasogenic oedema and nodular enhancement; metastases may be multiple.', 'توده خونریزی‌دهنده، اغلب با ادم وازوژنیک و جذب کنتراست ندولار؛ متاستازها ممکن است متعدد باشند.'), L('Tumoranamnese und KM-MRT einbeziehen. Akutes Blut kann die zugrunde liegende Läsion verdecken; gegebenenfalls Verlaufskontrolle.', 'Consider cancer history and contrast-enhanced MRI. Acute blood may obscure the underlying lesion; follow-up may be needed.', 'سابقه تومور و MRI با کنتراست را در نظر بگیرید. خون حاد ممکن است ضایعه زمینه‌ای را بپوشاند؛ گاهی پیگیری تصویربرداری لازم است.')],
  ],
  redFlagsTitle: L('Diese Begleitbefunde ändern die Abklärung', 'These associated findings change the work-up', 'یافته‌های همراهی که مسیر بررسی را تغییر می‌دهند'),
  redFlags: [
    { title: L('cSAH + Donnerschlagkopfschmerz', 'cSAH + thunderclap headache', 'cSAH و سردرد رعدآسا'), paragraphs: [L('Unter anderem RCVS oder venöse Thrombose prüfen. Bei atypischer lobärer Blutung auch Trauma und hämorrhagischen Infarkt berücksichtigen.', 'Consider RCVS or venous thrombosis, among other causes. In atypical lobar bleeding, also consider trauma and haemorrhagic infarction.', 'از جمله RCVS یا ترومبوز وریدی را بررسی کنید. در خونریزی لوبار غیرمعمول، تروما و انفارکت هموراژیک هم در نظر گرفته شوند.')] },
    { title: L('Asymmetrisches Ödem + lobäre CMB/cSS', 'Asymmetric oedema + lobar CMB/cSS', 'ادم نامتقارن و CMB لوبار یا cSS'), paragraphs: [L('Bei subakuter Enzephalopathie, Kopfschmerzen oder Anfällen an CAA-related inflammation denken und klinisch weiter abklären.', 'With subacute encephalopathy, headache or seizures, consider CAA-related inflammation and arrange further clinical assessment.', 'در انسفالوپاتی تحت‌حاد، سردرد یا تشنج، التهاب مرتبط با CAA را در نظر بگیرید و ارزیابی تکمیلی انجام دهید.')] },
  ],
  tfne: [
    L('Wandernde Parästhesien bei älteren Patienten können TFNE im Zusammenhang mit cSAH/cSS sein. Vor der Einordnung als TIA Blut-sensitive Sequenzen und den klinischen Kontext prüfen.', 'Spreading paraesthesias in older patients may be TFNE related to cSAH/cSS. Review blood-sensitive sequences and the clinical context before labelling them TIA.', 'پارستزی گسترش‌یابنده در سالمندان ممکن است TFNE مرتبط با cSAH یا cSS باشد. پیش از نسبت‌دادن به TIA، سکانس‌های حساس به خون و زمینه بالینی را بررسی کنید.'),
  ],
  takehome: [
    { title: L("Verteilung zuerst.", "Distribution first.", "ابتدا توزیع ضایعات."), detail: L('Verteilung zuerst: lobär spricht für CAA, tief eher für Arteriolosklerose.', 'Distribution first: lobar favours CAA, deep favours arteriolosclerosis.', 'ابتدا توزیع: لوبار به نفع CAA و عمقی بیشتر به نفع آرتریولواسکلروز است.') },
    { title: L("Blutungs- und WM-Marker unterscheiden.", "Distinguish bleeding and WM markers.", "نشانگرهای خونریزی و ماده سفید را تفکیک کنید."), detail: L('SWI/GRE: CMB und cSS. FLAIR/T2: cSAH und spezifische WM-Marker.', 'SWI/GRE: CMB and cSS. FLAIR/T2: cSAH and specific WM markers.', 'SWI/GRE برای CMB و cSS؛ FLAIR/T2 برای cSAH و نشانگرهای اختصاصی ماده سفید.') },
    { title: L("Probable CAA: ≥2 oder 1 + 1.", "Probable CAA: ≥2 or 1 + 1.", "CAA محتمل: \u2066≥۲\u2069 یا ۱ + ۱."), detail: L('Probable: ≥2 lobäre Blutungsläsionen ODER 1 lobäre Läsion + 1 WM-Marker.', 'Probable: ≥2 lobar haemorrhagic lesions OR 1 lobar lesion + 1 WM marker.', 'محتمل: \u2066≥۲\u2069 ضایعه خونریزی لوبار یا ۱ ضایعه لوبار + ۱ نشانگر ماده سفید.') },
    { title: L("Ausschlusskriterien konsequent prüfen.", "Check the exclusion criteria.", "معیارهای رد را دقیق بررسی کنید."), detail: L('Alter ≥50, passende Klinik, keine tiefe Blutung, keine andere Ursache. Kleinhirn neutral.', 'Age ≥50, compatible presentation, no deep bleeding, no alternative cause. Cerebellum is neutral.', 'سن \u2066≥۵۰\u2069، علائم سازگار، نبود خونریزی عمقی و علت دیگر؛ مخچه خنثی است.') },
    { title: L("TFNE und gemischte Muster benennen.", "Recognise TFNE and mixed patterns.", "TFNE و الگوهای مختلط را شناسایی کنید."), detail: L('Gemischtes Muster und TFNE bewusst benennen; CAA nicht mit Alzheimer gleichsetzen.', 'Explicitly recognise mixed patterns and TFNE; do not equate CAA with Alzheimer disease.', 'الگوی مختلط و TFNE را آگاهانه شناسایی کنید؛ CAA را معادل آلزهایمر ندانید.') },
  ],
}

// Sources for the reading lesson; individual claims are mapped in docs/caa-content-review.md.
export const CAA_SOURCES = [
  { href: 'https://www.frontiersin.org/journals/aging-neuroscience/articles/10.3389/fnagi.2025.1632252/full', label: 'CAA narrative review · Epidemiology and sex distribution, 2025' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3079153/', label: 'Yamada · CAA systematic review: estimated ICH contribution, 2011' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9389452/', label: 'Charidimou et al. · Boston criteria v2.0 · Lancet Neurology, 2022' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11592298/', label: 'Neuroradiological findings in CAA · Imaging review, 2024' },
  { href: 'https://alz-journals.onlinelibrary.wiley.com/doi/10.1002/alz.12366', label: 'Jäkel et al. · CAA prevalence: systematic review & meta-analysis, 2022' },
  { href: 'https://pubmed.ncbi.nlm.nih.gov/34016709/', label: 'Smith et al. · CAA-related transient focal neurological episodes, 2021' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5660938/', label: 'Carmona-Iragui et al. · CAA in Down syndrome and Alzheimer disease, 2017' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10962436/', label: 'Temporal ordering of biomarkers in Dutch-type hereditary CAA, 2024' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9855754/', label: 'Koemans et al. · Sex differences in CAA onset and progression, 2023' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12680281/', label: 'Akers et al. · Cavernous malformation consensus recommendations, 2025' },
  { href: 'https://www.ncbi.nlm.nih.gov/mesh/68016657', label: 'NLM MeSH · CAA and systemic amyloidosis' },
]
