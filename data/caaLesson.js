// Concise, trilingual reading lesson. The quiz/flashcard bank stays in caa.js.
const L = (de, en, fa) => ({ de, en, fa })
export const CAA_CHAPTERS = [
  { id: 'grundlagen', icon: 'brain', title: L('Grundlagen', 'Foundations', 'مبانی') },
  { id: 'klinik', icon: 'clinical', title: L('Klinische Manifestationen', 'Clinical manifestations', 'تظاهرات بالینی') },
  { id: 'mrt-diagnostik', icon: 'scan', title: L('MRT-Diagnostik', 'MRI assessment', 'ارزیابی با MRI') },
  { id: 'differenzial', icon: 'vessel', title: L('Differenzialdiagnose', 'Differential diagnosis', 'تشخیص افتراقی') },
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
  auth: L('Anmelden, um den Abschluss im Profil zu speichern.', 'Sign in to save lesson completion to your profile.', 'برای ذخیرهٔ وضعیت تکمیل درس در پروفایل خود وارد شوید.'),
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
      L('CAA gehört zu den wichtigsten Ursachen spontaner lobärer ICH im höheren Lebensalter.', 'CAA is a leading cause of spontaneous lobar ICH in older adults.', 'CAA از مهم‌ترین علل خونریزی داخل مغزی (ICH) خودبه‌خودیِ لوبار در سالمندان است.'),
      L('Als grobe Orientierung werden etwa 15 % der spontanen intrazerebralen Blutungen im höheren Lebensalter der CAA zugeschrieben; publizierte Schätzungen reichen von 5–20 %.', 'As a rough guide, about 15% of spontaneous intracerebral haemorrhages in older adults are attributed to CAA; published estimates range from 5% to 20%.', 'به‌عنوان برآورد تقریبی، حدود ۱۵٪ خونریزی‌های داخل مغزی خودبه‌خودی در سالمندان به CAA نسبت داده می‌شود؛ برآوردهای منتشرشده بین ۵ تا ۲۰٪ است.'),
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
      L('In einer Metaanalyse wurde bei etwa 79 % der untersuchten Alzheimer-Fälle eine milde bis schwere CAA im Hirngewebe nachgewiesen.', 'A meta-analysis found histological evidence of CAA, ranging from mild to severe, in about 79% of the Alzheimer cases studied.', 'در یک فراتحلیل، شواهد بافت‌شناختی CAA با شدت خفیف تا شدید در حدود ۷۹٪ موارد آلزهایمرِ بررسی‌شده یافت شد.'),
    ] },
    { title: L('Genetische Prädisposition', 'Genetic predisposition', 'زمینه ژنتیکی'), paragraphs: [
      L('Das APP-Gen liegt auf Chromosom 21. Bei Trisomie 21 führt die zusätzliche Genkopie zu mehr Amyloid-Vorläuferprotein und begünstigt frühe β-Amyloid-Ablagerungen, auch in Gefäßwänden.', 'The APP gene is on chromosome 21. In trisomy 21, the additional gene copy increases production of amyloid precursor protein and favours early β-amyloid deposition, including in vessel walls.', 'ژن APP روی کروموزوم ۲۱ قرار دارد. در تریزومی ۲۱، نسخه اضافی ژن تولید پروتئین پیش‌ساز آمیلوئید را افزایش می‌دهد و زمینه رسوب زودرس β-آمیلوئید، از جمله در دیواره عروق، را فراهم می‌کند.'),
    ] },
  ],
  amyloid: [
    L('CAA und Alzheimer teilen die β-Amyloid-Pathologie mit unterschiedlichen Ablagerungsorten:', 'CAA and Alzheimer disease both involve β-amyloid, but the characteristic sites of deposition differ:', 'در CAA و آلزهایمر، پروتئین β-آمیلوئید رسوب می‌کند، اما محل شاخص رسوب متفاوت است:'),
    L('Gefäßwand bei CAA.', 'Vessel walls in CAA.', 'دیواره رگ در CAA.'),
    L('Parenchymale Plaques bei Alzheimer.', 'Parenchymal plaques in Alzheimer disease.', 'پلاک‌های پارانشیمی در آلزهایمر.'),
  ],
  deepWarning: L('Eine tiefe ICH oder Mikroblutung verhindert die MRT-Einstufung als probable oder possible CAA nach Boston v2.0. Sie schließt eine gleichzeitig bestehende CAA jedoch nicht aus.', 'A deep ICH or microbleed prevents an MRI-based classification as probable or possible CAA under Boston v2.0. It does not exclude coexisting CAA.', 'وجود ICH یا میکروخونریزی عمقی مانع طبقه‌بندی MRI به‌عنوان CAA محتمل یا ممکن طبق Boston v2.0 می‌شود؛ اما هم‌زمانی CAA را رد نمی‌کند.'),
  schematic: L('Entscheidend ist die Verteilung, nicht die Zahl der Punkte.', 'Focus on distribution, not the number of dots.', 'به توزیع توجه کنید، نه تعداد نقطه‌ها.'),
  lobar: L('CAA: lobär', 'CAA: lobar', 'CAA: لوبار'),
  deep: L('Arteriolosklerose: tief', 'Arteriolosclerosis: deep', 'آرتریولواسکلروز: عمقی'),
  mriTitle: L('MRT-Befunde', 'MRI findings', 'یافته‌های MRI'),
  markerIntro: [
    L('Typisch für CAA sind Blutungen in den Hirnlappen und an der Hirnoberfläche. Entscheidend ist die Verteilung: lobär beziehungsweise kortikal statt in den tiefen Hirnstrukturen.', 'CAA typically causes haemorrhagic lesions in the cerebral lobes and at the brain surface. Distribution is key: lobar or cortical rather than in deep brain structures.', 'الگوی شاخص CAA، ضایعات ناشی از خونریزی در لوب‌ها و سطح مغز است. نکته اصلی، توزیع لوبار یا قشری به‌جای ساختارهای عمقی مغز است.'),
  ],
  sequencesTitle: L('Benötigte Sequenzen', 'Required sequences', 'سکانس‌های مورد نیاز'),
  sequences: [
    { title: L('SWI oder T2*-GRE', 'SWI or T2*-GRE', 'SWI یا T2*-GRE'), paragraphs: [L('Nachweis von Mikroblutungen und Hämosiderinablagerungen.', 'Detection of microbleeds and haemosiderin deposits.', 'شناسایی میکروخونریزی‌ها و رسوب هموسیدرین.')] },
    { title: 'FLAIR', paragraphs: [
      L('Beurteilung von akutem Blut in den Sulci.', 'Assessment of acute blood in the sulci.', 'بررسی خون حاد در شیارها.'),
      L('Beurteilung von Veränderungen des Marklagers.', 'Assessment of white matter changes.', 'بررسی تغییرات مادهٔ سفید.'),
      L('Ergänzende Beurteilung perivaskulärer Räume.', 'Complementary assessment of perivascular spaces.', 'ارزیابی تکمیلی فضاهای اطراف عروقی.'),
    ] },
    { title: 'T2', paragraphs: [L('Zählung perivaskulärer Räume im Centrum semiovale für den PVS-Marker der Boston-Kriterien v2.0.', 'Counting perivascular spaces in the centrum semiovale for the PVS marker in Boston criteria v2.0.', 'شمارش فضاهای اطراف عروقی در سنتروم سمی‌اووال برای نشانگر PVS در معیارهای Boston v2.0.')] },
  ],
  caseExamples: L('Fallbeispiele', 'Case examples', 'نمونه‌های موردی'),
  bostonTitle: L('Boston-Kriterien v2.0', 'Boston criteria v2.0', 'معیارهای Boston v2.0'),
  markerRows: [
    [L('Lobäre intrazerebrale Hämorrhagie', 'Lobar intracerebral haemorrhage', 'خونریزی داخل مغزی لوبار'), [L('Kortex / subkortikales Mark eines Hirnlappens.', 'Cortex / subcortical white matter of a cerebral lobe.', 'قشر یا مادهٔ سفید زیرقشری یک لوب مغزی.'), L('CT / MRT', 'CT / MRI', 'CT / MRI')], [L('Lobäres Hämatom, oft mit Masseneffekt.', 'Lobar haematoma, often with mass effect.', 'هماتوم لوبار، اغلب با اثر فشاری.'), L('Klinisch besonders wichtig: akute schlaganfallähnliche Ausfälle.', 'A major clinical presentation: acute stroke-like deficits.', 'تظاهر بالینی مهم: نقص عصبی حاد شبیه سکته.')]],
    [L('Zerebrale Mikroblutungen', 'Cerebral microbleeds', 'میکروخونریزی‌های مغزی'), [L('Strikt lobär: kortikal / subkortikal.', 'Strictly lobar: cortical / subcortical.', 'صرفاً لوبار: قشری یا زیرقشری.'), 'SWI / T2*-GRE'], [L('Kleine rundliche Suszeptibilitätsherde mit Blooming.', 'Small rounded susceptibility foci with blooming.', 'کانون‌های کوچک و گردِ افت سیگنال ناشی از حساسیت مغناطیسی، همراه با اثر blooming.'), L('Meist ohne akute Symptome; tiefe CMB weisen eher auf Arteriolosklerose hin.', 'Usually without acute symptoms; deep CMB favour arteriolosclerosis.', 'اغلب بدون علامت حاد؛ CMB عمقی بیشتر به نفع آرتریولواسکلروز است.')]],
    [L('Konvexitäts-Subarachnoidalblutung', 'Convexity subarachnoid haemorrhage', 'خونریزی زیرعنکبوتیه در تحدب مغز'), [L('Oberflächliche Sulci über den Konvexitäten.', 'Superficial sulci over the convexities.', 'شیارهای سطحی کانوکسیتی مغز.'), 'CT / FLAIR / SWI'], [L('Akutes sulkales Blut; von basaler / aneurysmatischer SAH unterscheiden.', 'Acute sulcal blood; distinguish from basal / aneurysmal SAH.', 'خون حاد داخل شیار؛ از SAH قاعده‌ای یا آنوریسمی تفکیک شود.'), L('Kann TFNE oder Kopfschmerzen begleiten; nicht CAA-spezifisch.', 'May accompany TFNE or headache; not specific to CAA.', 'می‌تواند با TFNE یا سردرد همراه باشد؛ اختصاصی CAA نیست.')]],
    [L('Kortikale superfizielle Siderose', 'Cortical superficial siderosis', 'سیدروز سطحی قشری'), [L('Entlang der kortikalen Sulci.', 'Along the cortical sulci.', 'در امتداد شیارهای قشری.'), 'SWI / T2*-GRE'], [L('Kurvilineares Hämosiderin als Residuum früherer oberflächlicher Blutungen.', 'Curvilinear haemosiderin as residue of previous superficial bleeding.', 'هموسیدرین خطی یا منحنی به‌عنوان اثر خونریزی سطحی قبلی.'), L('Charakteristischer CAA-Marker; mit TFNE und erhöhtem Blutungsrisiko assoziiert.', 'A characteristic CAA marker associated with TFNE and increased bleeding risk.', 'نشانگر شاخص CAA، مرتبط با TFNE و افزایش خطر خونریزی.')]],
  ],
  clinicalIntro: L('Die Klinik reicht von akuten fokalen Ausfällen bis zu schleichender kognitiver Verschlechterung. Mikroblutungen und eine kortikale superfizielle Siderose (cSS) können auch ohne aktuelle Beschwerden nachgewiesen werden.', 'Clinical manifestations range from acute focal neurological deficits to gradual cognitive decline. Microbleeds and cortical superficial siderosis (cSS) may also be found in the absence of current symptoms.', 'تظاهرات بالینی از علائم عصبی کانونی حاد تا افت تدریجی شناخت متغیر است. میکروخونریزی‌ها و سیدروز سطحی قشری (cSS) ممکن است بدون وجود علائم فعلی نیز در تصویربرداری دیده شوند.'),
  acuteTitle: L('Akute Manifestationen', 'Acute manifestations', 'تظاهرات حاد'),
  acute: [
    { title: L('Akute schlaganfallartige Ausfälle', 'Acute stroke-like deficits', 'نقص‌های عصبی حاد شبیه سکته'), paragraphs: [
      L('Eine lobäre intrazerebrale Hämorrhagie kann plötzlich einsetzende neurologische Ausfälle verursachen.', 'A lobar intracerebral haemorrhage can cause sudden neurological deficits.', 'خونریزی داخل مغزی لوبار می‌تواند باعث نقص عصبی ناگهانی شود.'),
      L('Welche Symptome auftreten, hängt vom betroffenen Hirnlappen ab: zum Beispiel Hemiparese, Aphasie oder Gesichtsfeldausfall.', 'The symptoms depend on the affected cerebral lobe, for example hemiparesis, aphasia or a visual field deficit.', 'نوع علائم به لوب درگیر بستگی دارد؛ برای مثال همی‌پارزی، آفازی یا نقص میدان بینایی.'),
    ] },
    { title: L('Transiente fokale neurologische Episoden (TFNE)', 'Transient focal neurological episodes (TFNE)', 'اپیزودهای گذرای علائم عصبی کانونی (TFNE)'), paragraphs: [
      L('Transiente fokale neurologische Episoden sind meist kurz, wiederkehrend und stereotyp. Typisch sind wandernde Parästhesien, zum Beispiel von der Hand zum Arm; auch Schwäche oder Sprachstörungen sind möglich.', 'Transient focal neurological episodes are usually brief, recurrent and stereotyped. Spreading paraesthesias, for example from the hand to the arm, are typical; weakness or language disturbances may also occur.', 'اپیزودهای گذرای علائم عصبی کانونی معمولاً کوتاه، تکرارشونده و دارای الگویی مشابه‌اند. گزگز یا مورمورشدنِ گسترش‌یابنده (پارستزی)، مثلاً از دست به بازو، از تظاهرات شاخص است؛ ضعف یا اختلال در بیان یا درک زبان نیز ممکن است رخ دهد.'),
      L('Die Episoden dauern häufig einige Minuten und können bei cSAH (Konvexitäts-Subarachnoidalblutung) oder cSS (kortikale superfizielle Siderose) auftreten.', 'The episodes often last several minutes and may occur with cSAH (convexity subarachnoid haemorrhage) or cSS (cortical superficial siderosis).', 'این اپیزودها اغلب چند دقیقه طول می‌کشند و ممکن است با cSAH (خونریزی زیرعنکبوتیه در تحدب مغز) یا cSS (سیدروز سطحی قشری) همراه باشند.'),
      L('Der Verlauf kann einer TIA ähneln. Diese Ähnlichkeit allein ist jedoch kein Hinweis auf eine arterielle Embolie.', 'The pattern of symptoms can mimic a TIA. This alone does not establish an arterial embolic cause.', 'الگوی علائم ممکن است حملهٔ ایسکمیک گذرا (TIA) را تقلید کند؛ این شباهت به‌تنهایی آمبولی شریانی را اثبات نمی‌کند.'),
    ] },
  ],
  otherClinicalTitle: L('Chronische Manifestationen', 'Chronic manifestations', 'تظاهرات مزمن'),
  otherClinical: [
    { title: L('Kognitive Störung / Demenz', 'Cognitive impairment / dementia', 'اختلال شناختی یا دمانس'), paragraphs: [
      L('CAA kann die geistige Leistungsfähigkeit beeinträchtigen. Möglich sind langsameres Denken und Schwierigkeiten beim Planen oder Organisieren von Aufgaben.', 'CAA can affect cognitive function. Possible symptoms include slower thinking and difficulty planning or organising tasks.', 'CAA می‌تواند عملکرد شناختی را مختل کند. کندتر شدن تفکر و دشواری در برنامه‌ریزی یا سازمان‌دهی کارها از علائم احتمالی هستند.'),
      L('Die Beschwerden können schleichend zunehmen und bis zu einer Demenz führen. Neben der Gefäßschädigung kann eine gleichzeitig bestehende Alzheimer-Erkrankung dazu beitragen.', 'Symptoms may gradually worsen and progress to dementia. In addition to vascular injury, coexisting Alzheimer disease may contribute.', 'علائم ممکن است به‌تدریج تشدید شوند و به دمانس برسند. علاوه بر آسیب عروقی، بیماری آلزهایمرِ هم‌زمان هم می‌تواند نقش داشته باشد.'),
    ] },
    { title: L('Epileptische Anfälle', 'Epileptic seizures', 'حملات صرعی'), paragraphs: [
      L('Bei CAA können Blutungen an der Hirnrinde und zurückbleibende Blutabbauprodukte fokale epileptische Anfälle begünstigen.', 'In CAA, cortical haemorrhage and residual blood breakdown products can predispose to focal epileptic seizures.', 'در CAA، خونریزی قشری و بقایای حاصل از تجزیهٔ خون می‌توانند زمینه‌ساز تشنج کانونی شوند.'),
      L('Die Anfälle können während einer akuten Blutung oder erst später auftreten.', 'Seizures may occur during an acute bleed or later on.', 'تشنج ممکن است هنگام خونریزی حاد یا مدتی بعد رخ دهد.'),
    ] },
    { title: L('Kopfschmerzen', 'Headache', 'سردرد'), paragraphs: [
      L('Kopfschmerzen können bei CAA auftreten, zum Beispiel im Zusammenhang mit einer akuten Blutung.', 'Headache may occur in CAA, for example in association with an acute bleed.', 'سردرد ممکن است در CAA رخ دهد، برای مثال همراه با خونریزی حاد.'),
      L('Neu auftretende, starke Kopfschmerzen müssen abgeklärt werden. Dabei sollte nach einer akuten Hirnblutung und anderen möglichen Ursachen gesucht werden.', 'New severe headache requires assessment for an acute brain bleed and other possible causes.', 'سردرد شدیدِ تازه‌شروع‌شده نیاز به بررسی دارد. در این بررسی باید خونریزی حاد مغزی و سایر علل احتمالی در نظر گرفته شوند.'),
    ] },
  ],
  wmTitle: L('spezifischer WM-Marker', 'Specific white matter marker', 'نشانگر اختصاصی مادهٔ سفید'),
  wm: [
    {
      tab: L('Erweiterte PVS', 'Enlarged PVS', 'PVS گشادشده'),
      title: L('Erweiterte perivaskuläre Räume', 'Enlarged perivascular spaces', 'فضاهای گشادشده اطراف عروقی'),
      paragraphs: [
        L('Perivaskuläre Räume (PVS) begleiten kleine Hirngefäße und enthalten Liquor.', 'Perivascular spaces (PVS) surround small brain vessels and contain cerebrospinal fluid.', 'فضاهای اطراف عروقی (PVS)، فضاهای حاوی مایع مغزی‌نخاعی در اطراف عروق کوچک مغز هستند.'),
        L('CSO-PVS bezeichnet erweiterte PVS im Centrum semiovale, dem oberen Marklager.', 'CSO-PVS refers to enlarged PVS in the centrum semiovale, the upper cerebral white matter.', 'CSO-PVS به فضاهای اطراف عروقیِ گشادشده در سنتروم سمی‌اووال، یعنی بخش بالایی مادهٔ سفید مغز، گفته می‌شود.'),
      ],
      facts: [
        { label: L('Lokalisation', 'Location', 'محل'), text: L('Centrum semiovale einer Hemisphäre.', 'Centrum semiovale of one hemisphere.', 'سنتروم سمی‌اووال یک نیمکره.'), emphasis: {de:['einer Hemisphäre'],en:['one hemisphere'],fa:['یک نیمکره']} },
        { label: L('Sequenz', 'Sequence', 'سکانس'), text: L('Axiale T2-Sequenz.', 'Axial T2-weighted imaging.', 'سکانس T2 محوری.') },
        { label: L('Zählregel', 'Counting rule', 'قاعده شمارش'), text: L('Mehr als 20 sichtbare Räume auf einer Schicht.', 'More than 20 visible spaces on one slice.', 'بیش از ۲۰ فضای قابل مشاهده در یک برش.'), emphasis:{de:['20','auf einer Schicht.'],en:['20','on one slice.'],fa:['۲۰','در یک برش.']} },
      ],
      note: L('PVS in den Basalganglien zählen für diesen Boston-Marker nicht.', 'Basal ganglia PVS do not count towards this Boston marker.', 'فضاهای اطراف عروقی در عقده‌های قاعده‌ای برای این نشانگر Boston حساب نمی‌شوند.'),
    },
    {
      tab: L('Multispot-Muster', 'Multispot pattern', 'الگوی چندنقطه‌ای'),
      title: L('Punktförmige T2-Signalerhöhungen im Marklager', 'Small focal T2 hyperintensities in the white matter', 'کانون‌های کوچک با سیگنال بالای T2 در مادهٔ سفید'),
      paragraphs: [
        L('WMH steht für „white matter hyperintensities“: helle Signalveränderungen der weißen Substanz in T2/FLAIR.', 'WMH stands for white matter hyperintensities: areas of increased signal in the white matter on T2/FLAIR.', 'WMH مخفف «افزایش سیگنال مادهٔ سفید» است؛ نواحی‌ای از مادهٔ سفید که در T2/FLAIR پرسیگنال دیده می‌شوند.'),
        L('„Multispot“ bedeutet viele einzelne kleine Flecken.', 'Multispot means many separate small spots.', '«چندنقطه‌ای» یعنی تعداد زیادی کانون کوچک و جدا از هم.'),
      ],
      facts: [
        { label: L('Lokalisation', 'Location', 'محل'), text: L('Subkortikale weiße Substanz beider Hemisphären.', 'Subcortical white matter of both hemispheres.', 'مادهٔ سفید زیرقشری هر دو نیمکره.') },
        { label: L('Sequenz', 'Sequence', 'سکانس'), text: 'T2 / FLAIR' },
        { label: L('Zählregel', 'Counting rule', 'قاعده شمارش'), text: L('Mehr als 10 kleine, runde oder ovale helle Herde in beiden Hemisphären.', 'More than 10 small, round or oval bright foci in total, distributed across both hemispheres.', 'در مجموع بیش از ۱۰ کانون کوچک، گرد یا بیضی و پرسیگنال، با توزیع در هر دو نیمکره.'), emphasis:{de:['10','in beiden Hemisphären.'],en:['10','across both hemispheres.'],fa:['۱۰','در هر دو نیمکره.']} },
      ],
      note: L('Große zusammenfließende Marklagerveränderungen allein erfüllen dieses Kriterium nicht.', 'Large confluent white matter changes alone do not meet this criterion.', 'تغییرات بزرگ و به‌هم‌پیوسته مادهٔ سفید به‌تنهایی این معیار را برآورده نمی‌کنند.'),
    },
  ],
  bostonIntro: [L('Die Boston-Kriterien verknüpfen die MRT-Befunde mit Alter und klinischer Präsentation. Sie ermöglichen die Einstufung als probable oder possible CAA ohne Gewebeprobe.', 'The Boston criteria combine MRI findings with age and clinical presentation. They allow classification as probable or possible CAA without tissue sampling.', 'معیارهای Boston یافته‌های MRI را در کنار سن و تظاهرات بالینی قرار می‌دهند و امکان طبقه‌بندی CAA محتمل یا ممکن را بدون نمونه‌برداری بافت فراهم می‌کنند.')],
  eligibilityTitle: L('Voraussetzungen', 'Prerequisites', 'پیش‌شرط‌ها'),
  categoryTitle: L('Diagnostische Kategorien', 'Diagnostic categories', 'طبقه‌بندی تشخیصی'),
  categoryLeads: [
    L('Bei erfüllten Voraussetzungen gibt es zwei mögliche MRT-Konstellationen:', 'When all prerequisites are met, either of these MRI patterns qualifies as probable CAA:', 'اگر همهٔ پیش‌شرط‌ها برقرار باشند، یکی از این دو الگوی MRI برای طبقه‌بندی CAA محتمل کافی است:'),
    L('Die Voraussetzungen sind erfüllt, die probable-Kriterien aber nicht. Es liegt eines dieser MRT-Muster vor:', 'All prerequisites are met, but the criteria for probable CAA are not. One of these MRI patterns is present:', 'همهٔ پیش‌شرط‌ها برقرارند، اما معیارهای CAA محتمل برآورده نشده‌اند. یکی از این الگوهای MRI وجود دارد:'),
  ],
  hemorrhageSingle: L('strikt lobäre Blutungsläsion', 'strictly lobar haemorrhagic lesion', 'ضایعهٔ ناشی از خونریزی صرفاً لوبار'),
  countingGuideTitle: L('Worauf ist zu achten?', 'Key points for applying the criteria', 'نکات مهم در به‌کارگیری معیارها'),
  bleedingGuideTitle: L('Blutungsläsionen: Typ und Zählung', 'Haemorrhagic lesions: type and counting', 'ضایعات ناشی از خونریزی: نوع و شمارش'),
  whiteMatterGuideTitle: L('WM-Marker: Lokalisation, Sequenz und Zählregel', 'WM markers: location, sequence and counting rule', 'نشانگرهای مادهٔ سفید: محل، سکانس و قاعده شمارش'),
  attention: L('Achtung', 'Attention', 'توجه'),
  eligibility: [
    { title: L('Alter und Klinik', 'Age and presentation', 'سن و تظاهرات بالینی'), paragraphs: [L('Mindestens 50 Jahre.', 'Age 50 years or older.', 'سن حداقل ۵۰ سال.'), L('Spontane intrazerebrale Blutung, TFNE oder kognitive Störung / Demenz.', 'Spontaneous intracerebral haemorrhage, TFNE or cognitive impairment / dementia.', 'خونریزی داخل مغزی خودبه‌خودی، TFNE یا اختلال شناختی / دمانس.')] },
    { title: L('Keine tiefen Blutungsläsionen', 'No deep haemorrhagic lesions', 'نبود ضایعات ناشی از خونریزی عمقی'), paragraphs: [L('Keine intrazerebrale Blutung und keine Mikroblutung in den tiefen Hirnstrukturen.', 'No intracerebral haemorrhage or microbleed in deep brain structures.', 'نبود خونریزی داخل مغزی یا میکروخونریزی در ساختارهای عمقی مغز.'), L('Kleinhirnblutungen zählen für diese Kriterien weder als lobär noch als tief.', 'For these criteria, cerebellar haemorrhages count as neither lobar nor deep.', 'در این معیارها، خونریزی مخچه نه لوبار و نه عمقی محسوب می‌شود.')] },
    { title: L('Keine andere erklärende Ursache', 'No alternative explanation', 'نبود علت دیگری که ضایعات را توضیح دهد'), paragraphs: [L('Die bewerteten Läsionen dürfen keine andere erklärende Ursache haben, zum Beispiel Trauma, eine Gefäßmalformation oder einen blutenden Tumor.', 'The lesions being assessed must have no alternative explanation, such as trauma, a vascular malformation or a haemorrhagic tumour.', 'برای ضایعات مورد ارزیابی نباید علت توضیح‌دهندهٔ دیگری، مانند تروما، ناهنجاری عروقی یا تومور خونریزی‌دهنده، وجود داشته باشد.')] },
  ],
  probable: L('Probable CAA', 'Probable CAA', 'CAA محتمل · Probable'),
  possible: L('Possible CAA', 'Possible CAA', 'CAA ممکن · Possible'),
  hemorrhages: L('strikt lobäre Blutungsläsionen', 'strictly lobar haemorrhagic lesions', 'ضایعات ناشی از خونریزی صرفاً لوبار'),
  combinationParts: [L('Eine strikt lobäre Blutungsläsion', 'One strictly lobar haemorrhagic lesion', 'یک ضایعهٔ ناشی از خونریزی صرفاً لوبار'), L('ein spezifischer WM-Marker', 'one specific white matter marker', 'یک نشانگر اختصاصی مادهٔ سفید')],
  combination: L('Eine strikt lobäre Blutungsläsion + ein spezifischer WM-Marker', 'One strictly lobar haemorrhagic lesion + one specific white matter marker', 'یک ضایعهٔ ناشی از خونریزی صرفاً لوبار + یک نشانگر اختصاصی مادهٔ سفید'),
  possibleRule: L('Eine strikt lobäre Blutungsläsion ODER ein spezifischer WM-Marker, ohne die probable-Kriterien zu erfüllen.', 'One strictly lobar haemorrhagic lesion OR one specific white matter marker, without meeting the criteria for probable CAA.', 'یک ضایعهٔ ناشی از خونریزی صرفاً لوبار یا یک نشانگر اختصاصی مادهٔ سفید، بدون احراز معیارهای CAA محتمل.'),
  or: L('ODER', 'OR', 'یا'),
  countingIntro: L('Als Blutungsläsionen zählen:', 'Qualifying haemorrhagic lesions:', 'ضایعات ناشی از خونریزی قابل شمارش:'),
  countingLesions: [L('Lobäre intrazerebrale Blutungen', 'Lobar intracerebral haemorrhages', 'خونریزی‌های داخل مغزی لوبار'), L('Mikroblutungen', 'Microbleeds', 'میکروخونریزی‌ها'), L('cSS- oder cSAH-Herde', 'cSS or cSAH foci', 'کانون‌های cSS یا cSAH')],
  countingTabs: [L('Blutungsläsionen', 'Haemorrhagic lesions', 'ضایعات ناشی از خونریزی'), L('WM-Marker', 'WM markers', 'نشانگرهای مادهٔ سفید')],
  counting: [
    L('Als Blutungsläsionen zählen: lobäre intrazerebrale Blutungen, Mikroblutungen sowie cSS- oder cSAH-Herde.', 'Haemorrhagic lesions include lobar intracerebral haemorrhages, microbleeds and cSS or cSAH foci.', 'ضایعات ناشی از خونریزی شامل خونریزی‌های داخل مغزی لوبار، میکروخونریزی‌ها و کانون‌های cSS یا cSAH هستند.'),
    L('Die Kombination der verschiedenen Typen ist zulässig.', 'Different lesion types may be combined.', 'می‌توان انواع مختلف این ضایعات را در شمارش با هم ترکیب کرد.'),
    L('Getrennte cSS- oder cSAH-Herde können einzeln gezählt werden.', 'Separate cSS or cSAH foci can be counted individually.', 'کانون‌های cSS یا cSAH که از نظر مکانی جدا هستند، هرکدام جداگانه شمرده می‌شوند.'),
    L('Blut und Siderose am selben Ort werden nicht doppelt gezählt.', 'Haemorrhage and siderosis at the same site must not be counted as two separate lesions.', 'خونریزی و سیدروز در یک محل نباید دو ضایعهٔ جداگانه شمرده شوند.'),
  ],
  pathology: [L('Probable und possible CAA sind klinisch-radiologische Einstufungen. Sie sind kein histologischer Nachweis.', 'Probable and possible CAA are clinical–radiological categories. They do not constitute histological confirmation.', 'CAA محتمل و ممکن طبقه‌بندی‌های بالینی–رادیولوژیک هستند و به معنی تأیید بافت‌شناختی نیستند.')],
  ddIntro: L("Lobäre Blutungen und Konvexitäts-SAH haben unterschiedliche mögliche Ursachen. Entscheidend sind Blutungsverteilung, Begleitbefunde und klinischer Kontext.", "Lobar haemorrhage and convexity SAH have several possible causes. Assess the bleeding distribution, associated findings and clinical context.", "خونریزی لوبار و SAH تحدب علل مختلفی دارند. توزیع خونریزی، یافته‌های همراه و زمینه بالینی به افتراق کمک می‌کنند."),
  ddHeaders: [L('Diagnose', 'Diagnosis', 'تشخیص'), L('Typisches Muster', 'Typical pattern', 'الگوی معمول'), L('Abgrenzung', 'Distinction', 'افتراق')],
  ddRows: [
    ['CAA', [L('Blutungen und Mikroblutungen liegen strikt lobär, also kortikal oder subkortikal.', 'Haemorrhages and microbleeds are strictly lobar, in cortical or subcortical regions.', 'خونریزی‌ها و میکروخونریزی‌ها صرفاً لوبار، یعنی قشری یا زیرقشری، هستند.'), L('Kortikale superfizielle Siderose und Konvexitäts-SAH können hinzukommen.', 'Cortical superficial siderosis and convexity SAH may also occur.', 'سیدروز سطحی قشری و SAH تحدب نیز ممکن است همراه باشند.')], [L('Die Kombination der MRT-Marker nach Boston v2.0 beurteilen.', 'Assess the combination of MRI markers using Boston v2.0.', 'ترکیب نشانگرهای MRI را بر اساس Boston v2.0 ارزیابی کنید.')]],
    [L('Hypertensive Arteriolosklerose', 'Hypertensive arteriolosclerosis', 'آرتریولواسکلروز مرتبط با فشار خون'), [L('Blutungen und Mikroblutungen betreffen vor allem Basalganglien, Thalamus und Pons.', 'Haemorrhages and microbleeds mainly involve the basal ganglia, thalamus and pons.', 'خونریزی‌ها و میکروخونریزی‌ها بیشتر عقده‌های قاعده‌ای، تالاموس و پونز را درگیر می‌کنند.'), L('Auch Kleinhirnblutungen sind möglich.', 'Cerebellar haemorrhage is also possible.', 'خونریزی مخچه نیز ممکن است رخ دهد.')], [L('Eine tiefe Verteilung spricht eher für Arteriolosklerose.', 'A deep distribution favours arteriolosclerosis.', 'توزیع عمقی بیشتر به نفع آرتریولواسکلروز است.'), L('Eine Hypertonieanamnese allein unterscheidet sie nicht von CAA.', 'A history of hypertension alone does not distinguish it from CAA.', 'سابقه فشار خون بالا به‌تنهایی آن را از CAA متمایز نمی‌کند.')]],
    [L('Arteriovenöse Malformation (AVM)', 'Arteriovenous malformation (AVM)', 'ناهنجاری شریانی‌وریدی (AVM)'), [L('Die Blutung kann auch lobär liegen.', 'Bleeding may also be lobar.', 'خونریزی می‌تواند لوبار هم باشد.'), L('Typisch sind ein Gefäßknäuel (Nidus) und geschlängelte Gefäße mit Flow-Voids.', 'Typical findings are a vascular nidus and serpiginous vessels with flow voids.', 'یافته‌های معمول شامل کلاف عروقی (نیدوس) و عروق مارپیچی با flow void هستند.')], [L('Die Gefäßarchitektur in CTA oder MRA prüfen; bei begründetem Verdacht gegebenenfalls DSA.', 'Review the vascular architecture on CTA or MRA; consider DSA when suspicion warrants it.', 'ساختار عروقی را در CTA یا MRA بررسی کنید؛ در صورت شک موجه، DSA نیز ممکن است لازم باشد.')]],
    [L('Kavernom', 'Cavernous malformation', 'کاورنوم'), [L('Blutprodukte unterschiedlichen Alters bilden ein „Popcorn“-Muster.', 'Blood products of different ages form a popcorn appearance.', 'فرآورده‌های تجزیهٔ خون در مراحل مختلف، نمای پاپ‌کورن ایجاد می‌کنند.'), L('Ein Hämosiderinsaum umgibt die Läsion.', 'A haemosiderin rim surrounds the lesion.', 'حاشیه هموسیدرین ضایعه را احاطه می‌کند.')], [L('T1, T2 und SWI gemeinsam beurteilen und nach einer begleitenden venösen Entwicklungsanomalie (DVA) suchen.', 'Assess T1, T2 and SWI together and look for an associated developmental venous anomaly (DVA).', 'T1، T2 و SWI را با هم بررسی کنید و به‌دنبال ناهنجاری تکاملی وریدی (DVA) همراه باشید.'), L('Kleine Kavernome können Mikroblutungen ähneln.', 'Small cavernous malformations may resemble microbleeds.', 'کاورنوم‌های کوچک ممکن است شبیه میکروخونریزی باشند.')]],
    [L('Blutender Tumor / Metastase', 'Haemorrhagic tumour / metastasis', 'تومور یا متاستاز خونریزی‌دهنده'), [L('Eine blutende Raumforderung kann von vasogenem Ödem umgeben sein und nodulär Kontrastmittel aufnehmen.', 'A haemorrhagic mass may have surrounding vasogenic oedema and nodular contrast enhancement.', 'توده خونریزی‌دهنده ممکن است با ادم وازوژنیک اطراف و جذب کنتراست ندولار همراه باشد.'), L('Metastasen können multipel auftreten.', 'Metastases may be multiple.', 'متاستازها ممکن است متعدد باشند.')], [L('Kontrastmittel-MRT und Tumoranamnese einbeziehen.', 'Consider contrast-enhanced MRI and cancer history.', 'MRI با کنتراست و سابقه تومور را در نظر بگیرید.'), L('Akutes Blut kann die Raumforderung verdecken; eine Verlaufskontrolle kann sie sichtbar machen.', 'Acute blood may obscure the mass; follow-up imaging may reveal it.', 'خون حاد ممکن است توده را بپوشاند؛ تصویربرداری پیگیری می‌تواند آن را آشکار کند.')]],
    [L('Reversibles zerebrales Vasokonstriktionssyndrom (RCVS)', 'Reversible cerebral vasoconstriction syndrome (RCVS)', 'سندرم انقباض عروقی برگشت‌پذیر مغز (RCVS)'), [L('Eine Konvexitäts-SAH kann bei RCVS auftreten.', 'Convexity SAH may occur in RCVS.', 'SAH تحدب ممکن است در RCVS رخ دهد.'), L('CTA oder MRA können mehrere segmentale Gefäßverengungen mit perlschnurartigem Wechsel des Gefäßkalibers zeigen.', 'CTA or MRA may show multiple segmental narrowings with a beaded vessel appearance.', 'CTA یا MRA ممکن است چندین تنگی قطعه‌ای و تغییرات مهره‌مانند قطر عروق را نشان دهند.')], [L('Typisch sind wiederholte, plötzlich einsetzende stärkste Kopfschmerzen (Donnerschlagkopfschmerzen).', 'Recurrent, sudden, severe thunderclap headaches are typical.', 'سردردهای ناگهانی و بسیار شدید رعدآسا که تکرار می‌شوند از علائم معمول هستند.'), L('Die Gefäßdarstellung kann anfangs noch unauffällig sein.', 'Vascular imaging may initially be normal.', 'تصویربرداری عروقی در ابتدا ممکن است طبیعی باشد.')]],
    [L('Trauma oder hämorrhagischer Infarkt', 'Trauma or haemorrhagic infarction', 'تروما یا انفارکت هموراژیک'), [L('Trauma: kortikale Kontusionsblutungen, häufig frontal oder temporal.', 'Trauma: cortical haemorrhagic contusions, often frontal or temporal.', 'تروما: کوفتگی‌های خونریزی‌دهنده قشری، اغلب فرونتال یا تمپورال.'), L('Hämorrhagischer Infarkt: Einblutung in ein ischämisch geschädigtes Areal; die Verteilung kann einem Gefäßterritorium folgen.', 'Haemorrhagic infarction: bleeding within ischaemic tissue; the distribution may follow a vascular territory.', 'انفارکت هموراژیک: خونریزی در بافت ایسکمیک؛ توزیع ممکن است با قلمرو یک رگ مطابقت داشته باشد.')], [L('Trauma: Unfallanamnese und begleitende Verletzungszeichen prüfen.', 'Trauma: review the history and accompanying signs of injury.', 'تروما: سابقه آسیب و نشانه‌های همراه را بررسی کنید.'), L('Infarkt: DWI/ADC und Gefäßdarstellung zusammen mit dem Blutungsmuster beurteilen.', 'Infarction: assess DWI/ADC and vascular imaging together with the bleeding pattern.', 'انفارکت: DWI/ADC و تصویربرداری عروقی را همراه الگوی خونریزی بررسی کنید.')]],
    [L("Zerebrale Venenthrombose", "Cerebral venous thrombosis", "ترومبوز وریدی مغز"), [L("Thrombosen kortikaler Venen oder duraler Sinus können eine Konvexitäts-SAH verursachen.", "Thrombosis of cortical veins or dural sinuses can cause convexity SAH.", "ترومبوز وریدهای قشری یا سینوس‌های دورال می‌تواند باعث SAH تحدب شود."), L("Begleitend sind Ödem und hämorrhagische venöse Infarkte möglich; sie müssen keinem arteriellen Gefäßterritorium folgen.", "Associated oedema and haemorrhagic venous infarcts may occur and need not follow an arterial territory.", "ادم و انفارکت وریدی هموراژیک ممکن است همراه باشند و لزوماً از قلمرو شریانی پیروی نمی‌کنند.")], [L("Mit CT- oder MR-Venographie nach einem Thrombus beziehungsweise einem venösen Füllungsdefekt suchen.", "Use CT or MR venography to look for a thrombus or venous filling defect.", "در CT یا MR ونوگرافی به‌دنبال ترومبوز یا نقص پرشدگی وریدی باشید.")]],
  ],
  mixedWarning: [
    L('Eine hypertensive Arteriolosklerose und CAA können gleichzeitig bestehen.', 'Hypertensive arteriolosclerosis and CAA may coexist.', 'آرتریولواسکلروز مرتبط با فشار خون بالا و CAA ممکن است هم‌زمان وجود داشته باشند.'),
  ],
  tfne: [
    L('Wandernde Parästhesien bei älteren Patienten können TFNE im Zusammenhang mit cSAH/cSS sein. Vor der Einordnung als TIA Blut-sensitive Sequenzen und den klinischen Kontext prüfen.', 'Spreading paraesthesias in older patients may be TFNE related to cSAH/cSS. Review blood-sensitive sequences and the clinical context before labelling them TIA.', 'پارستزی گسترش‌یابنده در سالمندان ممکن است TFNE مرتبط با cSAH یا cSS باشد. پیش از نسبت‌دادن به TIA، سکانس‌های حساس به خون و زمینه بالینی را بررسی کنید.'),
  ],
  takehome: [
    {
      title: L('Bei lobären Blutungen im Alter an CAA denken.', 'Consider CAA in older patients with lobar haemorrhage.', 'در سالمندان با خونریزی لوبار، CAA را در نظر بگیرید.'),
      detail: L('Typisch sind lobäre Hirnblutungen, kortikale oder subkortikale Mikroblutungen und oberflächliche Blutungszeichen. Tiefe Blutungen sprechen eher für hypertensive Arteriolosklerose.', 'Typical findings are lobar haemorrhages, cortical or subcortical microbleeds and superficial bleeding markers. Deep haemorrhages favour hypertensive arteriolosclerosis.', 'خونریزی لوبار، میکروخونریزی قشری یا زیرقشری و نشانه‌های خونریزی سطحی از یافته‌های معمول هستند. خونریزی عمقی بیشتر به نفع آرتریولواسکلروز مرتبط با فشار خون است.'),
    },
    {
      title: L('SWI oder T2*-GRE gehört zur CAA-Abklärung.', 'Include SWI or T2*-GRE when investigating CAA.', 'در بررسی CAA، از SWI یا T2*-GRE استفاده کنید.'),
      detail: L('Diese Sequenzen zeigen Mikroblutungen und kortikale superfizielle Siderose. Ergänzend FLAIR für akutes sulkales Blut und Marklagerveränderungen sowie T2 für erweiterte perivaskuläre Räume beurteilen.', 'These sequences reveal microbleeds and cortical superficial siderosis. Also assess FLAIR for acute sulcal blood and white matter changes, and T2 for enlarged perivascular spaces.', 'این سکانس‌ها میکروخونریزی و سیدروز سطحی قشری را نشان می‌دهند. FLAIR را برای خون حاد شیاری و تغییرات مادهٔ سفید، و T2 را برای فضاهای گشادشده اطراف عروقی نیز بررسی کنید.'),
    },
    {
      title: L('Wandernde Parästhesien können ein Blutungssymptom sein.', 'Spreading paraesthesias can be a symptom of bleeding.', 'پارستزی گسترش‌یابنده می‌تواند از علائم خونریزی باشد.'),
      detail: L('Transiente fokale neurologische Episoden (TFNE) können bei Konvexitäts-SAH oder kortikaler superfizieller Siderose auftreten. Blutungssensitive MRT-Sequenzen prüfen, bevor die Episoden als TIA eingeordnet werden.', 'Transient focal neurological episodes (TFNE) can occur with convexity SAH or cortical superficial siderosis. Review blood-sensitive MRI sequences before classifying these episodes as TIA.', 'اپیزودهای گذرای علائم عصبی کانونی (TFNE) ممکن است با SAH تحدب یا سیدروز سطحی قشری همراه باشند. پیش از نسبت‌دادن این اپیزودها به TIA، سکانس‌های MRI حساس به خون را بررسی کنید.'),
    },
    {
      title: L('cSS erkennen: erhöhtes Risiko weiterer Hirnblutungen.', 'Recognise cSS: an increased risk of further brain haemorrhage.', 'cSS را بشناسید: خطر خونریزی مغزی مجدد بیشتر است.'),
      detail: L('Kortikale superfizielle Siderose (cSS) ist ein chronisches Blutungszeichen und mit einem erhöhten Risiko weiterer lobärer Blutungen verbunden. Im Befund klar benennen: relevant für die individuelle Abwägung antithrombotischer Therapien.', 'Cortical superficial siderosis (cSS) is a chronic bleeding marker associated with an increased risk of further lobar haemorrhage. Report it explicitly: it informs the individual risk–benefit assessment of antithrombotic treatment.', 'سیدروز سطحی قشری (cSS) نشانه خونریزی مزمن است و با خطر بیشتر خونریزی لوبار مجدد ارتباط دارد. آن را در گزارش صریح ذکر کنید؛ این یافته در سنجش فردی سود و خطر درمان‌های ضدترومبوتیک اهمیت دارد.'),
    },
    {
      title: L('Boston v2.0: Klinik und MRT müssen zusammenpassen.', 'Boston v2.0: clinical presentation and MRI must fit together.', 'Boston v2.0: علائم بالینی و MRI باید با هم سازگار باشند.'),
      detail: L('Probable CAA: mindestens zwei strikt lobäre Blutungsläsionen oder eine solche Läsion plus ein spezifischer WM-Marker. Voraussetzung sind Alter ≥50 Jahre, passende Klinik, keine tiefen Blutungsläsionen und keine andere erklärende Ursache.', 'Probable CAA requires at least two strictly lobar haemorrhagic lesions or one such lesion plus a specific white matter marker. Prerequisites are age ≥50 years, a compatible presentation, no deep haemorrhagic lesions and no alternative explanatory cause.', 'CAA محتمل: دست‌کم دو ضایعهٔ ناشی از خونریزی صرفاً لوبار، یا یک ضایعه از این نوع به‌علاوه یک نشانگر اختصاصی مادهٔ سفید. پیش‌شرط‌ها: سن ⁦≥۵۰⁩ سال، علائم سازگار، نبود ضایعات ناشی از خونریزی عمقی و نبود علت توضیح‌دهنده دیگر.'),
    },
  ],
}

// Sources for the reading lesson; individual claims are mapped in docs/caa-content-review.md.
export const CAA_SOURCES = [
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5307932/', label: 'Heit et al. · Imaging of Intracranial Hemorrhage, 2017' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3328163/', label: 'Choi et al. · Differentiating Hemorrhagic Infarct and Intracerebral Hemorrhage, 2012' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10579515/', label: 'Van Ly et al. · Convexity subarachnoid haemorrhage: a practical guide, 2023' },
  { href: 'https://pubmed.ncbi.nlm.nih.gov/31945583/', label: 'Paradise et al. · PVS rating on T1-weighted and FLAIR images' },
  { href: 'https://www.frontiersin.org/journals/aging-neuroscience/articles/10.3389/fnagi.2025.1632252/full', label: 'CAA narrative review · Epidemiology and sex distribution, 2025' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3079153/', label: 'Yamada · CAA systematic review: estimated ICH contribution, 2011' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9389452/', label: 'Charidimou et al. · Boston criteria v2.0 · Lancet Neurology, 2022' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11592298/', label: 'Jensen-Kondering et al. · CAA imaging review, 2024 · MRT-Abbildungen 6–7 (CC BY 4.0)' },
  { href: 'https://alz-journals.onlinelibrary.wiley.com/doi/10.1002/alz.12366', label: 'Jäkel et al. · CAA prevalence: systematic review & meta-analysis, 2022' },
  { href: 'https://pubmed.ncbi.nlm.nih.gov/34016709/', label: 'Smith et al. · CAA-related transient focal neurological episodes, 2021' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5660938/', label: 'Carmona-Iragui et al. · CAA in Down syndrome and Alzheimer disease, 2017' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10962436/', label: 'Temporal ordering of biomarkers in Dutch-type hereditary CAA, 2024' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9855754/', label: 'Koemans et al. · Sex differences in CAA onset and progression, 2023' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12680281/', label: 'Akers et al. · Cavernous malformation consensus recommendations, 2025' },
  { href: 'https://www.ncbi.nlm.nih.gov/mesh/68016657', label: 'NLM MeSH · CAA and systemic amyloidosis' },
]
