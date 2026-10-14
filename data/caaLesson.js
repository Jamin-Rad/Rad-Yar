// Concise, trilingual reading lesson. The quiz/flashcard bank stays in caa.js.
const L = (de, en, fa) => ({ de, en, fa })
export const CAA_CHAPTERS = [
  { id: 'grundlagen', icon: 'brain', title: L('Grundlagen', 'Foundations', 'مبانی') },
  { id: 'klinik', icon: 'clinical', title: L('Klinische Manifestationen', 'Clinical manifestations', 'تظاهرات بالینی') },
  { id: 'mrt-diagnostik', icon: 'scan', title: L('MRT-Diagnostik', 'MRI diagnosis', 'تشخیص با MRI') },
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
  amyloid: [
    L('CAA und Alzheimer teilen die β-Amyloid-Pathologie mit unterschiedlichen Ablagerungsorten:', 'CAA and Alzheimer disease share β-amyloid pathology at different deposit locations:', 'CAA و آلزهایمر پاتولوژی β-آمیلوئید مشترکی دارند، اما محل رسوب متفاوت است:'),
    L('Gefäßwand bei CAA.', 'Vessel walls in CAA.', 'دیواره رگ در CAA.'),
    L('Parenchymale Plaques bei Alzheimer.', 'Parenchymal plaques in Alzheimer disease.', 'پلاک‌های پارانشیمی در آلزهایمر.'),
  ],
  deepWarning: L('Eine tiefe ICH oder Mikroblutung verhindert die MRT-Einstufung als probable oder possible CAA nach Boston v2.0. Sie schließt eine gleichzeitig bestehende CAA jedoch nicht aus.', 'A deep ICH or microbleed prevents an MRI-based classification as probable or possible CAA under Boston v2.0. It does not exclude coexisting CAA.', 'وجود ICH یا میکروخونریزی عمقی مانع طبقه‌بندی MRI به‌عنوان CAA محتمل یا ممکن طبق Boston v2.0 می‌شود؛ اما هم‌زمانی CAA را رد نمی‌کند.'),
  schematic: L('Entscheidend ist die Verteilung, nicht die Zahl der Punkte.', 'Focus on distribution, not the number of dots.', 'به توزیع توجه کنید، نه تعداد نقطه‌ها.'),
  lobar: L('CAA: lobär', 'CAA: lobar', 'CAA: لوبار'),
  deep: L('Arteriolosklerose: tief', 'Arteriolosclerosis: deep', 'آرتریولواسکلروز: عمقی'),
  mriTitle: L('MRT-Befunde', 'MRI findings', 'یافته‌های MRI'),
  markerIntro: [
    L('Typisch für CAA sind Blutungen in den Hirnlappen und an der Hirnoberfläche. Entscheidend ist die Verteilung: lobär beziehungsweise kortikal statt in den tiefen Hirnstrukturen.', 'CAA typically causes haemorrhagic lesions in the cerebral lobes and at the brain surface. Distribution is key: lobar or cortical rather than in deep brain structures.', 'الگوی شاخص CAA، ضایعات خونریزی در لوب‌ها و سطح مغز است. نکته اصلی، توزیع لوبار یا قشری به‌جای ساختارهای عمقی مغز است.'),
  ],
  sequencesTitle: L('Benötigte Sequenzen', 'Required sequences', 'سکانس‌های مورد نیاز'),
  sequences: [
    { title: L('SWI oder T2*-GRE', 'SWI or T2*-GRE', 'SWI یا T2*-GRE'), paragraphs: [L('Nachweis von Mikroblutungen und Hämosiderinablagerungen.', 'Detection of microbleeds and haemosiderin deposits.', 'شناسایی میکروخونریزی‌ها و رسوب هموسیدرین.')] },
    { title: 'FLAIR', paragraphs: [
      L('Beurteilung von akutem Blut in den Sulci.', 'Assessment of acute blood in the sulci.', 'بررسی خون حاد در شیارها.'),
      L('Beurteilung von Veränderungen des Marklagers.', 'Assessment of white matter changes.', 'بررسی تغییرات ماده سفید.'),
      L('Ergänzende Beurteilung perivaskulärer Räume.', 'Complementary assessment of perivascular spaces.', 'ارزیابی تکمیلی فضاهای اطراف عروقی.'),
    ] },
    { title: 'T2', paragraphs: [L('Zählung perivaskulärer Räume im Centrum semiovale für den PVS-Marker der Boston-Kriterien v2.0.', 'Counting perivascular spaces in the centrum semiovale for the PVS marker in Boston criteria v2.0.', 'شمارش فضاهای اطراف عروقی در centrum semiovale برای نشانگر PVS در معیارهای Boston v2.0.')] },
  ],
  caseExamples: L('Fallbeispiele', 'Case examples', 'نمونه‌های موردی'),
  bostonTitle: L('Boston-Kriterien v2.0', 'Boston criteria v2.0', 'معیارهای Boston v2.0'),
  markerRows: [
    [L('Lobäre intrazerebrale Hämorrhagie', 'Lobar intracerebral haemorrhage', 'خونریزی داخل مغزی لوبار'), [L('Kortex / subkortikales Mark eines Hirnlappens.', 'Cortex / subcortical white matter of a cerebral lobe.', 'قشر یا ماده سفید زیرقشری یک لوب مغزی.'), 'CT / MRT'], [L('Lobäres Hämatom, oft mit Masseneffekt.', 'Lobar haematoma, often with mass effect.', 'هماتوم لوبار، اغلب با اثر فشاری.'), L('Klinisch besonders wichtig: akute schlaganfallähnliche Ausfälle.', 'A major clinical presentation: acute stroke-like deficits.', 'تظاهر بالینی مهم: نقص عصبی حاد شبیه سکته.')]],
    [L('Zerebrale Mikroblutungen', 'Cerebral microbleeds', 'میکروخونریزی‌های مغزی'), [L('Strikt lobär: kortikal / subkortikal.', 'Strictly lobar: cortical / subcortical.', 'صرفاً لوبار: قشری یا زیرقشری.'), 'SWI / T2*-GRE'], [L('Kleine rundliche Suszeptibilitätsherde mit Blooming.', 'Small rounded susceptibility foci with blooming.', 'کانون‌های کوچک و گرد سوسپتیبیلیتی با blooming.'), L('Meist ohne akute Symptome; tiefe CMB weisen eher auf Arteriolosklerose hin.', 'Usually without acute symptoms; deep CMB favour arteriolosclerosis.', 'اغلب بدون علامت حاد؛ CMB عمقی بیشتر به نفع آرتریولواسکلروز است.')]],
    [L('Konvexitäts-Subarachnoidalblutung', 'Convexity subarachnoid haemorrhage', 'خونریزی زیرعنکبوتیه در تحدب مغز'), [L('Oberflächliche Sulci über den Konvexitäten.', 'Superficial sulci over the convexities.', 'شیارهای سطحی کانوکسیتی مغز.'), 'CT / FLAIR / SWI'], [L('Akutes sulkales Blut; von basaler / aneurysmatischer SAH unterscheiden.', 'Acute sulcal blood; distinguish from basal / aneurysmal SAH.', 'خون حاد داخل شیار؛ از SAH قاعده‌ای یا آنوریسمی تفکیک شود.'), L('Kann TFNE oder Kopfschmerzen begleiten; nicht CAA-spezifisch.', 'May accompany TFNE or headache; not specific to CAA.', 'می‌تواند با TFNE یا سردرد همراه باشد؛ اختصاصی CAA نیست.')]],
    [L('Kortikale superfizielle Siderose', 'Cortical superficial siderosis', 'سیدروز سطحی قشری'), [L('Entlang der kortikalen Sulci.', 'Along the cortical sulci.', 'در امتداد شیارهای قشری.'), 'SWI / T2*-GRE'], [L('Kurvilineares Hämosiderin als Residuum früherer oberflächlicher Blutungen.', 'Curvilinear haemosiderin as residue of previous superficial bleeding.', 'هموسیدرین خطی یا منحنی به‌عنوان اثر خونریزی سطحی قبلی.'), L('Charakteristischer CAA-Marker; mit TFNE und erhöhtem Blutungsrisiko assoziiert.', 'A characteristic CAA marker associated with TFNE and increased bleeding risk.', 'نشانگر شاخص CAA، مرتبط با TFNE و افزایش خطر خونریزی.')]],
  ],
  clinicalIntro: L('Die Klinik reicht von akuten fokalen Ausfällen bis zu schleichender kognitiver Verschlechterung. Mikroblutungen und eine kortikale superfizielle Siderose (cSS) können auch ohne aktuelle Beschwerden nachgewiesen werden.', 'Presentation ranges from acute focal deficits to gradual cognitive decline. Microbleeds and cortical superficial siderosis (cSS) may also be detected without current symptoms.', 'تظاهرات از نقص عصبی کانونی حاد تا افت شناختی تدریجی متفاوت است. میکروخونریزی و سیدروز سطحی قشری (cSS) ممکن است بدون علائم فعلی نیز شناسایی شوند.'),
  acuteTitle: L('Akute Manifestationen', 'Acute manifestations', 'تظاهرات حاد'),
  acute: [
    { title: L('Akute schlaganfallartige Ausfälle', 'Acute stroke-like deficits', 'نقص‌های عصبی حاد شبیه سکته'), paragraphs: [
      L('Eine lobäre intrazerebrale Hämorrhagie kann plötzlich einsetzende neurologische Ausfälle verursachen.', 'A lobar intracerebral haemorrhage can cause sudden neurological deficits.', 'خونریزی داخل مغزی لوبار می‌تواند باعث نقص عصبی ناگهانی شود.'),
      L('Welche Symptome auftreten, hängt vom betroffenen Hirnlappen ab: zum Beispiel Hemiparese, Aphasie oder Gesichtsfeldausfall.', 'The symptoms depend on the affected cerebral lobe, for example hemiparesis, aphasia or a visual field deficit.', 'نوع علائم به لوب درگیر بستگی دارد؛ برای مثال همی‌پارزی، آفازی یا نقص میدان بینایی.'),
    ] },
    { title: L('Transiente fokale neurologische Episoden (TFNE)', 'Transient focal neurological episodes (TFNE)', 'حملات عصبی کانونی گذرا (TFNE)'), paragraphs: [
      L('Transiente fokale neurologische Episoden sind meist kurz, wiederkehrend und stereotyp. Typisch sind wandernde Parästhesien, zum Beispiel von der Hand zum Arm; auch Schwäche oder Sprachstörungen sind möglich.', 'Transient focal neurological episodes are usually brief, recurrent and stereotyped. Spreading paraesthesias, for example from the hand to the arm, are typical; weakness or language disturbances may also occur.', 'حملات عصبی کانونی گذرا معمولاً کوتاه، تکرارشونده و با الگوی مشابه‌اند. پارستزی گسترش‌یابنده، مثلاً از دست به بازو، شاخص است؛ ضعف یا اختلال گفتار هم ممکن است رخ دهد.'),
      L('Die Episoden dauern häufig einige Minuten und können bei cSAH (Konvexitäts-Subarachnoidalblutung) oder cSS (kortikale superfizielle Siderose) auftreten.', 'The episodes often last several minutes and may occur with cSAH (convexity subarachnoid haemorrhage) or cSS (cortical superficial siderosis).', 'این حملات اغلب چند دقیقه طول می‌کشند و ممکن است همراه با cSAH (خونریزی زیرعنکبوتیه در تحدب مغز) یا cSS (سیدروز سطحی قشری) رخ دهند.'),
      L('Der Verlauf kann einer TIA ähneln. Diese Ähnlichkeit allein ist jedoch kein Hinweis auf eine arterielle Embolie.', 'The course can resemble a TIA. This similarity alone does not indicate an arterial embolus.', 'سیر علائم ممکن است شبیه TIA باشد. این شباهت به‌تنهایی نشانهٔ آمبولی شریانی نیست.'),
    ] },
  ],
  otherClinicalTitle: L('Chronische Manifestationen', 'Chronic manifestations', 'تظاهرات مزمن'),
  otherClinical: [
    { title: L('Kognitive Störung / Demenz', 'Cognitive impairment / dementia', 'اختلال شناختی یا دمانس'), paragraphs: [
      L('CAA kann die geistige Leistungsfähigkeit beeinträchtigen. Möglich sind langsameres Denken und Schwierigkeiten beim Planen oder Organisieren von Aufgaben.', 'CAA can affect cognitive function. Possible symptoms include slower thinking and difficulty planning or organising tasks.', 'CAA می‌تواند عملکرد شناختی را مختل کند. کندتر شدن تفکر و دشواری در برنامه‌ریزی یا سازمان‌دهی کارها از علائم احتمالی هستند.'),
      L('Die Beschwerden können schleichend zunehmen und bis zu einer Demenz führen. Neben der Gefäßschädigung kann eine gleichzeitig bestehende Alzheimer-Erkrankung dazu beitragen.', 'Symptoms may gradually worsen and progress to dementia. In addition to vascular injury, coexisting Alzheimer disease may contribute.', 'علائم ممکن است به‌تدریج تشدید شوند و به دمانس برسند. علاوه بر آسیب عروقی، بیماری آلزهایمرِ هم‌زمان هم می‌تواند نقش داشته باشد.'),
    ] },
    { title: L('Epileptische Anfälle', 'Epileptic seizures', 'حملات صرعی'), paragraphs: [
      L('Bei CAA können Blutungen an der Hirnrinde und zurückbleibende Blutabbauprodukte fokale epileptische Anfälle begünstigen.', 'In CAA, bleeding at the cerebral cortex and residual blood breakdown products can promote focal epileptic seizures.', 'در CAA، خونریزی در قشر مغز و محصولات تجزیهٔ خونِ باقی‌مانده می‌توانند زمینه‌ساز تشنج کانونی شوند.'),
      L('Die Anfälle können während einer akuten Blutung oder erst später auftreten.', 'Seizures may occur during an acute bleed or later on.', 'تشنج ممکن است هنگام خونریزی حاد یا مدتی بعد رخ دهد.'),
    ] },
    { title: L('Kopfschmerzen', 'Headache', 'سردرد'), paragraphs: [
      L('Kopfschmerzen können bei CAA auftreten, zum Beispiel im Zusammenhang mit einer akuten Blutung.', 'Headache may occur in CAA, for example in association with an acute bleed.', 'سردرد ممکن است در CAA رخ دهد، برای مثال همراه با خونریزی حاد.'),
      L('Neu auftretende, starke Kopfschmerzen müssen abgeklärt werden. Dabei sollte nach einer akuten Hirnblutung und anderen möglichen Ursachen gesucht werden.', 'New severe headache requires assessment for an acute brain bleed and other possible causes.', 'سردرد شدیدِ تازه‌شروع‌شده نیاز به بررسی دارد. در این بررسی باید خونریزی حاد مغزی و سایر علل احتمالی در نظر گرفته شوند.'),
    ] },
  ],
  wmTitle: L('spezifischer WM-Marker', 'Specific WM marker', 'نشانگر اختصاصی ماده سفید'),
  wm: [
    {
      tab: L('Erweiterte PVS', 'Enlarged PVS', 'PVS گشادشده'),
      title: L('Erweiterte perivaskuläre Räume', 'Enlarged perivascular spaces', 'فضاهای گشادشده اطراف عروقی'),
      paragraphs: [
        L('Perivaskuläre Räume (PVS) begleiten kleine Hirngefäße und enthalten Liquor.', 'Perivascular spaces (PVS) surround small brain vessels and contain cerebrospinal fluid.', 'فضاهای اطراف عروقی (PVS) در کنار عروق کوچک مغز قرار دارند و حاوی مایع مغزی–نخاعی هستند.'),
        L('CSO-PVS bezeichnet erweiterte PVS im Centrum semiovale, dem oberen Marklager.', 'CSO-PVS refers to enlarged PVS in the centrum semiovale, the upper cerebral white matter.', 'CSO-PVS به PVS گشادشده در centrum semiovale، یعنی ماده سفید بالایی مغز، گفته می‌شود.'),
      ],
      facts: [
        { label: L('Lokalisation', 'Location', 'محل'), text: L('Centrum semiovale einer Hemisphäre.', 'Centrum semiovale of one hemisphere.', 'Centrum semiovale یک نیمکره.') },
        { label: L('Sequenz', 'Sequence', 'سکانس'), text: L('Axiale T2-Sequenz.', 'Axial T2-weighted imaging.', 'سکانس T2 آگزیال.') },
        { label: L('Zählregel', 'Counting rule', 'قاعده شمارش'), text: L('Mehr als 20 sichtbare Räume auf einer Schicht.', 'More than 20 visible spaces on one slice.', 'بیش از ۲۰ فضای قابل مشاهده در یک برش.') },
      ],
      note: L('PVS in den Basalganglien zählen für diesen Boston-Marker nicht.', 'Basal ganglia PVS do not count towards this Boston marker.', 'فضاهای اطراف عروقی در عقده‌های قاعده‌ای برای این نشانگر Boston حساب نمی‌شوند.'),
    },
    {
      tab: L('Multispot-Muster', 'Multispot pattern', 'الگوی چندنقطه‌ای'),
      title: L('Punktförmige T2-Signalerhöhungen im Marklager', 'Small focal T2 hyperintensities in the white matter', 'کانون‌های کوچک با سیگنال بالای T2 در ماده سفید'),
      paragraphs: [
        L('WMH steht für „white matter hyperintensities“: helle Signalveränderungen der weißen Substanz in T2/FLAIR.', 'WMH means white matter hyperintensities: bright white matter signal changes on T2/FLAIR.', 'WMH مخفف white matter hyperintensities است؛ تغییرات با سیگنال روشن در ماده سفید در T2/FLAIR.'),
        L('„Multispot“ bedeutet viele einzelne kleine Flecken.', 'Multispot means many separate small spots.', '«چندنقطه‌ای» یعنی تعداد زیادی کانون کوچک و جدا از هم.'),
      ],
      facts: [
        { label: L('Lokalisation', 'Location', 'محل'), text: L('Subkortikale weiße Substanz beider Hemisphären.', 'Subcortical white matter of both hemispheres.', 'ماده سفید زیرقشری هر دو نیمکره.') },
        { label: L('Sequenz', 'Sequence', 'سکانس'), text: 'T2 / FLAIR' },
        { label: L('Zählregel', 'Counting rule', 'قاعده شمارش'), text: L('Mehr als 10 kleine, runde oder ovale helle Herde in beiden Hemisphären.', 'More than 10 small, round or oval bright foci in both hemispheres.', 'بیش از ۱۰ کانون روشن کوچک، گرد یا بیضی در هر دو نیمکره.') },
      ],
      note: L('Große zusammenfließende Marklagerveränderungen allein erfüllen dieses Kriterium nicht.', 'Large confluent white matter changes alone do not meet this criterion.', 'تغییرات بزرگ و به‌هم‌پیوسته ماده سفید به‌تنهایی این معیار را برآورده نمی‌کنند.'),
    },
  ],
  bostonIntro: [L('Die Boston-Kriterien verknüpfen die MRT-Befunde mit Alter und klinischer Präsentation. Sie ermöglichen die Einstufung als probable oder possible CAA ohne Gewebeprobe.', 'The Boston criteria combine MRI findings with age and clinical presentation. They allow classification as probable or possible CAA without tissue sampling.', 'معیارهای Boston یافته‌های MRI را در کنار سن و تظاهرات بالینی قرار می‌دهند و امکان طبقه‌بندی CAA محتمل یا ممکن را بدون نمونه‌برداری بافت فراهم می‌کنند.')],
  eligibilityTitle: L('Voraussetzungen', 'Prerequisites', 'پیش‌شرط‌ها'),
  categoryTitle: L('Diagnostische Kategorien', 'Diagnostic categories', 'طبقه‌بندی تشخیصی'),
  categoryLeads: [
    L('Bei erfüllten Voraussetzungen gibt es zwei mögliche MRT-Konstellationen:', 'When the prerequisites are met, either of these two MRI patterns qualifies:', 'در صورت برقرار بودن پیش‌شرط‌ها، یکی از این دو الگوی MRI کافی است:'),
    L('Die Voraussetzungen sind erfüllt, die probable-Kriterien aber nicht. Es liegt eines dieser MRT-Muster vor:', 'The prerequisites are met, but the probable criteria are not. One of these MRI patterns is present:', 'پیش‌شرط‌ها برقرارند، اما معیارهای probable برآورده نشده‌اند. یکی از این الگوهای MRI وجود دارد:'),
  ],
  hemorrhageSingle: L('strikt lobäre Blutungsläsion', 'strictly lobar haemorrhagic lesion', 'ضایعه خونریزی صرفاً لوبار'),
  countingGuideTitle: L('Worauf ist zu achten?', 'What needs checking?', 'چه نکاتی باید بررسی شوند؟'),
  bleedingGuideTitle: L('Blutungsläsionen: Typ und Zählung', 'Haemorrhagic lesions: type and counting', 'ضایعات خونریزی: نوع و شمارش'),
  whiteMatterGuideTitle: L('WM-Marker: Lokalisation, Sequenz und Zählregel', 'WM markers: location, sequence and counting rule', 'نشانگرهای WM: محل، سکانس و قاعده شمارش'),
  attention: L('Achtung', 'Attention', 'توجه'),
  eligibility: [
    { title: L('Alter und Klinik', 'Age and presentation', 'سن و تظاهرات بالینی'), paragraphs: [L('Mindestens 50 Jahre.', 'Age at least 50.', 'سن حداقل ۵۰ سال.'), L('Spontane intrazerebrale Blutung, TFNE oder kognitive Störung / Demenz.', 'Spontaneous intracerebral haemorrhage, TFNE or cognitive impairment / dementia.', 'خونریزی داخل مغزی خودبخودی، TFNE یا اختلال شناختی / دمانس.')] },
    { title: L('Keine tiefen Blutungsläsionen', 'No deep haemorrhagic lesions', 'نبود ضایعات خونریزی عمقی'), paragraphs: [L('Keine intrazerebrale Blutung und keine Mikroblutung in den tiefen Hirnstrukturen.', 'No intracerebral haemorrhage or microbleed in deep brain structures.', 'نبود خونریزی داخل مغزی یا میکروخونریزی در ساختارهای عمقی مغز.'), L('Kleinhirnblutungen zählen für diese Kriterien weder als lobär noch als tief.', 'For these criteria, cerebellar haemorrhages count as neither lobar nor deep.', 'در این معیارها، خونریزی مخچه نه لوبار و نه عمقی محسوب می‌شود.')] },
    { title: L('Keine andere erklärende Ursache', 'No alternative explanation', 'نبود علت دیگری که ضایعات را توضیح دهد'), paragraphs: [L('Die bewerteten Läsionen dürfen keine andere erklärende Ursache haben, zum Beispiel Trauma, eine Gefäßmalformation oder einen blutenden Tumor.', 'The lesions being assessed must have no alternative explanation, such as trauma, a vascular malformation or a haemorrhagic tumour.', 'ضایعات مورد ارزیابی نباید با علت دیگری مانند تروما، ناهنجاری عروقی یا تومور خونریزی‌دهنده توضیح داده شوند.')] },
  ],
  probable: L('Probable CAA', 'Probable CAA', 'CAA محتمل · Probable'),
  possible: L('Possible CAA', 'Possible CAA', 'CAA ممکن · Possible'),
  hemorrhages: L('strikt lobäre Blutungsläsionen', 'strictly lobar haemorrhagic lesions', 'ضایعات خونریزی‌دهنده صرفاً لوبار'),
  combination: L('strikt lobäre Blutungsläsion + spezifischer WM-Marker', 'strictly lobar haemorrhagic lesion + specific WM marker', 'ضایعه خونریزی صرفاً لوبار + نشانگر اختصاصی ماده سفید'),
  possibleRule: L('Eine strikt lobäre Blutungsläsion ODER ein spezifischer WM-Marker, ohne die probable-Kriterien zu erfüllen.', 'One strictly lobar haemorrhagic lesion OR one specific WM marker, without meeting probable criteria.', 'یک ضایعه خونریزی صرفاً لوبار یا یک نشانگر اختصاصی ماده سفید، بدون احراز معیارهای CAA محتمل.'),
  or: L('ODER', 'OR', 'یا'),
  counting: [
    L('Als Blutungsläsionen zählen lobäre ICH, Mikroblutungen sowie cSS- oder cSAH-Herde. Die Kombination der verschiedenen Typen ist zulässig.', 'Haemorrhagic lesions include lobar ICH, microbleeds and cSS or cSAH foci. Different lesion types may be combined.', 'ICH لوبار، میکروخونریزی و کانون‌های cSS یا cSAH به‌عنوان ضایعات خونریزی حساب می‌شوند. ترکیب انواع مختلف ضایعه مجاز است.'),
    L('Getrennte cSS/cSAH-Herde können einzeln zählen. Blut und Siderose am selben Ort werden nicht doppelt gezählt.', 'Separate cSS/cSAH foci can count individually. Blood and siderosis at the same site must not be counted twice.', 'کانون‌های جداگانه cSS/cSAH می‌توانند جداگانه شمارش شوند. خون و سیدروز در یک محل را نباید دوبار حساب کرد.'),
  ],
  pathology: [
    L('Probable und possible CAA sind klinisch-radiologische Einstufungen. Sie sind kein histologischer Nachweis.', 'Probable and possible CAA are clinical–radiological categories. They do not constitute histological confirmation.', 'CAA محتمل و ممکن طبقه‌بندی‌های بالینی–رادیولوژیک هستند و به معنی تأیید بافت‌شناختی نیستند.'),
    L('Eine Gewebeprobe aus Biopsie oder Hämatomausräumung kann bei passender Klinik die Kategorie „probable CAA mit unterstützender Pathologie“ begründen.', 'With a compatible clinical presentation, tissue from biopsy or haematoma evacuation can support the category “probable CAA with supporting pathology”.', 'در صورت تظاهرات بالینی سازگار، نمونه بافت از بیوپسی یا تخلیه هماتوم می‌تواند مبنای طبقه «CAA محتمل با پشتیبانی پاتولوژی» باشد.'),
    L('Definite CAA setzt nach Boston v2.0 eine vollständige postmortale Untersuchung voraus.', 'Under Boston v2.0, definite CAA requires a full postmortem examination.', 'طبق Boston v2.0، CAA قطعی به بررسی کامل پس از مرگ نیاز دارد.'),
  ],
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
  { href: 'https://pubmed.ncbi.nlm.nih.gov/31945583/', label: 'Paradise et al. · PVS rating on T1-weighted and FLAIR images' },
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
