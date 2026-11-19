import { L, TITLE } from './arrhythmogenicCardiomyopathy'

const ITEMS = [
  { id: 'spectrum', question: L('Welche Aussage beschreibt das ACM-Spektrum?', 'Which statement describes the ACM spectrum?', 'کدام عبارت طیف ACM را توصیف می‌کند؟'), options: [L('Nur der RV kann betroffen sein.', 'Only the RV can be involved.', 'فقط RV درگیر می‌شود.'), L('RV, LV oder beide Ventrikel können betroffen sein.', 'RV, LV or both ventricles can be involved.', 'RV، LV یا هر دو بطن می‌توانند درگیر شوند.'), L('ACM ist immer ischämisch.', 'ACM is always ischaemic.', 'ACM همیشه ایسکمیک است.'), L('Eine normale EF schließt ACM aus.', 'Normal EF excludes ACM.', 'EF طبیعی ACM را رد می‌کند.')], correct: 'B', explanation: L('ARVC ist der rechtsdominante Phänotyp. LV-Narben können auch bei erhaltener EF bestehen.', 'ARVC is the right-dominant phenotype. LV scar may occur with preserved EF.', 'ARVC فنوتیپ راست‌غالب است. اسکار LV ممکن است با EF حفظ‌شده وجود داشته باشد.') },
  { id: 'major-boundary', question: L("Welche Einstufung gilt für regionale RV-Dyskinesie mit globaler RV-Dilatation nach ETF 2023?", "How is regional RV dyskinesia with global RV dilatation graded under ETF 2023?", "دیسکینزی موضعی بطن راست همراه با اتساع کلی آن طبق ETF 2023 چه رده‌ای دارد؟"), options: [L('Kein Kriterium', 'No criterion', 'بدون معیار'), L('Minor', 'Minor', 'معیار فرعی'), L('Major', 'Major', 'معیار اصلی'), L('Allein dadurch definite ACM', 'Definite ACM from this alone', 'ACM قطعی فقط بر همین اساس')], correct: 'C', explanation: L("Regionale RV-Akinesie, Dyskinesie oder Aneurysma zusammen mit globaler RV-Dilatation oder verminderter RVEF anhand geeigneter Referenzwerte.", "Regional RV akinesia, dyskinesia or aneurysm together with global RV dilatation or reduced RVEF based on appropriate reference ranges.", "آکینزی، دیسکینزی یا آنوریسم موضعی بطن راست همراه با اتساع کلی یا کاهش RVEF بر اساس مقادیر مرجع مناسب.") },
  { id: 'female-minor', question: L("Ein Aneurysma der freien RV-Wand liegt vor. RV-Volumen und RVEF sind normal. Welche Einstufung gilt?", "The RV free wall has an aneurysm. RV volume and RVEF are normal. How is this graded?", "دیوارهٔ آزاد بطن راست آنوریسم دارد. حجم بطن راست و RVEF طبیعی‌اند. ردهٔ یافته چیست؟"), options: [L('Minor', 'Minor', 'معیار فرعی'), L('Major', 'Major', 'معیار اصلی'), L('Kein Kriterium', 'No criterion', 'بدون معیار'), L('Definite ALVC', 'Definite ALVC', 'ALVC قطعی')], correct: 'A', explanation: L("Regionale Akinesie, Dyskinesie oder Aneurysma der freien RV-Wand zählt als Minor.", "Regional akinesia, dyskinesia or aneurysm of the RV free wall counts as minor.", "آکینزی، دیسکینزی یا آنوریسم موضعی دیوارهٔ آزاد بطن راست معیار فرعی است.") },
  { id: 'no-regional', question: L("RV-Dilatation und reduzierte RVEF ohne regionale RV-Wandbewegungsstörung. Ist damit ein morphofunktionelles RV-Kriterium erfüllt?", "RV dilatation and reduced RVEF without a regional RV wall motion abnormality. Does this meet a morphofunctional RV criterion?", "اتساع بطن راست و کاهش RVEF بدون اختلال موضعی حرکت دیواره. آیا معیار مورفولوژی و عملکرد بطن راست برآورده شده است؟"), options: [L('Ja, zweimal Major', 'Yes, two major criteria', 'بله، دو معیار اصلی'), L('Ja, einmal Major', 'Yes, one major criterion', 'بله، یک معیار اصلی'), L('Ja, Minor', 'Yes, minor', 'بله، معیار فرعی'), L('Nein; regionale Störung ist erforderlich.', 'No; regional abnormality is required.', 'خیر؛ اختلال موضعی لازم است.')], correct: 'D', explanation: L("Regionale RV-Akinesie, Dyskinesie oder Aneurysma zusammen mit globaler RV-Dilatation oder verminderter RVEF anhand geeigneter Referenzwerte.", "Regional RV akinesia, dyskinesia or aneurysm together with global RV dilatation or reduced RVEF based on appropriate reference ranges.", "آکینزی، دیسکینزی یا آنوریسم موضعی بطن راست همراه با اتساع کلی یا کاهش RVEF بر اساس مقادیر مرجع مناسب.") },
  { id: 'ef-boundary', question: L("Nichtischämisches LV-Streifen-LGE in zwei Segmenten und zwei orthogonalen Ebenen. Welche Einstufung gilt?", "Non-ischaemic LV stria-pattern LGE in two segments and two orthogonal planes. How is this graded?", "LGE نواری غیرایسکمیک بطن چپ در دو سگمان و دو نمای عمود بر هم. ردهٔ یافته چیست؟"), options: [L('Major', 'Major', 'معیار اصلی'), L('Minor', 'Minor', 'معیار فرعی'), L('Kein Kriterium', 'No criterion', 'بدون معیار'), L('Zwei Minor', 'Two minor criteria', 'دو معیار فرعی')], correct: 'B', explanation: L("Typisches subepikardiales oder mittmyokardiales Streifen-LGE ist bei 1–2 Segmenten Minor und ab 3 Segmenten Major.", "Typical subepicardial or midwall stria-pattern LGE is minor in 1–2 segments and major in at least 3.", "LGE نواری تیپیک زیر اپیکارد یا میان‌میوکارد در ۱ تا ۲ سگمان معیار فرعی و در دست‌کم ۳ سگمان معیار اصلی است.") },
  { id: 'double-count', question: L("Regionale RV-Dyskinesie, globale RV-Dilatation und verminderte RVEF. Wie viele Major-Kriterien zählen in Kategorie I?", "Regional RV dyskinesia, global RV dilatation and reduced RVEF. How many major criteria count in category I?", "دیسکینزی موضعی، اتساع کلی و کاهش RVEF در بطن راست. در دستهٔ I چند معیار اصلی حساب می‌شود؟"), options: [L('Eines', 'One', 'یک'), L('Zwei', 'Two', 'دو'), L('Drei', 'Three', 'سه'), L('Keines', 'None', 'هیچ')], correct: 'A', explanation: L("Ein Major-Kriterium in Kategorie I. Volumen und EF sind alternative Bedingungen.", "One major criterion in category I. Volume and EF are alternative conditions.", "یک معیار اصلی در دستهٔ I. حجم و EF دو شرط جایگزین‌اند.") },
  { id: 'junction', question: L('Welcher Befund erfüllt das LV-LGE-Strukturkriterium nach ETF 2023 NICHT?', 'Which finding does NOT fulfil the ETF LV LGE structural criterion?', 'کدام یافته معیار ساختاری LGE بطن چپ در ETF 2023 را برآورده نمی‌کند؟'), options: [L('Subepikardiales Streifen-LGE im LV in zwei orthogonalen Ebenen', 'Subepicardial stria-like LV LGE in two orthogonal planes', 'LGE نواری زیر اپی‌کارد بطن چپ در دو نمای عمود بر هم'), L('Mittmyokardiales Streifen-LGE der freien LV-Wand in zwei orthogonalen Ebenen', 'Mid-wall stria-like LGE of the LV free wall in two orthogonal planes', 'LGE نواری میان‌دیواره‌ای در دیوارهٔ آزاد بطن چپ در دو نمای عمود بر هم'), L('Isoliertes junktionales RV-Insertions-LGE', 'Isolated junctional RV insertion-point LGE', 'LGE منفرد محل اتصال RV'), L('Mittmyokardiales Streifen-LGE im Septum in zwei orthogonalen Ebenen außerhalb der RV-Insertionspunkte', 'Mid-wall stria-like septal LGE in two orthogonal planes away from RV insertion points', 'LGE نواری میان‌دیواره‌ای سپتوم در دو نمای عمود بر هم، خارج از نقاط اتصال بطن راست')], correct: 'C', explanation: L('Septales junktionales LGE ist ausgeschlossen; es ist ein unspezifischer Befund.', 'Septal junctional LGE is excluded; it is nonspecific.', 'LGE محل اتصال سپتوم از معیار کنار گذاشته شده و غیراختصاصی است.') },
  { id: 'isolated-lv', question: L("Welche Aussage zur Genetik bei linksdominanter ACM nach ETF 2023 trifft zu?", "Which statement about genetics in left-dominant ACM under ETF 2023 is correct?", "کدام عبارت دربارهٔ ژنتیک در ACM چپ‌غالب طبق ETF 2023 درست است؟"), options: [L('Fettsignal allein', 'Fat signal alone', 'فقط سیگنال چربی'), L('Eine VUS genügt.', 'A VUS is sufficient.', 'VUS کافی است.'), L('Ein großer rechter Vorhof', 'A large right atrium', 'دهلیز راست بزرگ'), L("Eine ausreichende Befundkombination mit qualifizierendem LV-LGE kann auch ohne Genvariante genügen.", "A sufficient combination of findings including qualifying LV LGE can establish the diagnosis without a genetic variant.", "ترکیب کافی یافته‌ها شامل LGE واجد شرایط بطن چپ می‌تواند بدون واریانت ژنتیکی هم برای تشخیص کافی باشد.")], correct: 'D', explanation: L("Für ALVC ist qualifizierendes LV-LGE erforderlich. Bei ausreichender Befundkombination ist eine Genvariante nicht zwingend.", "ALVC requires qualifying LV LGE. A genetic variant is optional when other findings are sufficient.", "برای ALVC وجود LGE واجد شرایط بطن چپ لازم است. با ترکیب کافی یافته‌ها، واریانت ژنتیکی الزامی نیست.") },
  { id: 'fat', question: L('Epikardiales Fett bei sonst normalem RV: beste Einordnung?', 'Epicardial fat with an otherwise normal RV: best interpretation?', 'چربی اپیکاردیال با RV از سایر جهات طبیعی: بهترین تفسیر؟'), options: [L('Sichere ARVC', 'Definite ARVC', 'ARVC قطعی'), L('Fett allein ist kein ACM-Kriterium.', 'Fat alone is not an ACM criterion.', 'چربی به‌تنهایی معیار ACM نیست.'), L('Major-LGE-Kriterium', 'Major LGE criterion', 'معیار اصلی LGE'), L('Obligate LV-Beteiligung', 'Mandatory LV involvement', 'درگیری الزامی LV')], correct: 'B', explanation: L('Fettsignal und Partialvolumen können täuschen. Morphologie, Bewegung, Funktion und Narbe im Gesamtkontext prüfen.', 'Fat signal and partial volume may mislead. Assess morphology, motion, function and scar in context.', 'سیگنال چربی و partial volume گمراه‌کننده‌اند. مورفولوژی، حرکت، عملکرد و اسکار در زمینه کلی بررسی شوند.') },
  { id: 'paediatric', question: L('Ein 10-jähriges Kind mit RV-Aneurysmen: wie sind Erwachsenen-CMR-Grenzen zu verwenden?', 'A 10-year-old with RV aneurysms: how should adult CMR thresholds be used?', 'کودک ۱۰ ساله با آنوریسم‌های RV: آستانه‌های CMR بزرگسال چگونه استفاده شوند؟'), options: [L('Nicht unkritisch übertragen; pädiatrische Referenzen und Gesamtbeurteilung.', 'Do not transfer uncritically; use paediatric references and integrated assessment.', 'بدون بررسی تعمیم ندهید؛ مرجع کودکان و ارزیابی یکپارچه لازم است.'), L('Automatisch definite ACM', 'Automatically definite ACM', 'خودکار ACM قطعی'), L('Das Alter ist irrelevant.', 'Age is irrelevant.', 'سن مهم نیست.'), L('Nur das Fett bewerten.', 'Assess fat only.', 'فقط چربی بررسی شود.')], correct: 'A', explanation: L('Referenzen hängen von Alter, Geschlecht, Körpergröße und Methode ab. Für Kinder altersgerechte pädiatrische MRT-Referenzen heranziehen.', 'References depend on age, sex, body size and method. Use age-appropriate paediatric MRI references for children.', 'مرجع به سن، جنس، اندازه بدن و روش وابسته است. برای کودکان از مقادیر مرجع MRI متناسب با سن استفاده کنید.') },
  {
    id: 'scar-risk',
    question: L("Bei einer Person mit ACM ist die linksventrikuläre Ejektionsfraktion erhalten. Welche Aussage zum Rhythmusrisiko trifft zu?", "A person with ACM has preserved LV ejection fraction. Which statement about arrhythmic risk is correct?", "در فردی با ACM کسر جهشی بطن چپ حفظ شده است. کدام عبارت دربارهٔ خطر آریتمی درست است؟"),
    options: [
      L("Ventrikuläre Arrhythmien treten erst bei deutlich reduzierter EF auf.", "Ventricular arrhythmias occur only after EF falls significantly.", "آریتمی بطنی فقط پس از کاهش شدید EF رخ می‌دهد."),
      L("Die EF allein bestimmt das Rhythmusrisiko.", "EF alone determines arrhythmic risk.", "خطر آریتمی فقط با EF تعیین می‌شود."),
      L("Myokardnarben können auch bei erhaltener EF ventrikuläre Arrhythmien begünstigen.", "Myocardial scar can predispose to ventricular arrhythmias even with preserved EF.", "اسکار میوکارد حتی با EF حفظ‌شده می‌تواند زمینه‌ساز آریتمی بطنی باشد."),
      L("Bei erhaltener LV-EF sind Rhythmusstörungen auf die Vorhöfe begrenzt.", "With preserved LVEF, arrhythmias are limited to the atria.", "با LVEF حفظ‌شده، آریتمی فقط در دهلیزها رخ می‌دهد."),
    ],
    correct: 'C',
    explanation: L("Elektrisch instabiles Narbengewebe kann ventrikuläre Arrhythmien begünstigen, bevor eine deutliche systolische Dysfunktion messbar ist.", "Scar can predispose to ventricular arrhythmias before substantial systolic dysfunction is measurable.", "اسکار می‌تواند پیش از بروز اختلال سیستولی قابل‌توجه، زمینه‌ساز آریتمی بطنی شود."),
  },
  {
    id: 'cine-lge',
    question: L("Was beurteilst du bei ACM-Verdacht im Cine und was im LGE?", "What do you assess on cine and on LGE when ACM is suspected?", "در شک به ACM، در Cine و LGE چه چیزهایی را ارزیابی می‌کنید؟"),
    options: [
      L("Cine: Ödem. LGE: Ventrikelvolumina.", "Cine: oedema. LGE: ventricular volumes.", "Cine: ادم. LGE: حجم بطن‌ها."),
      L("Cine: regionale Wandbewegung, Volumina und EF. LGE: Verteilung und Schicht der Narbe.", "Cine: regional wall motion, volumes and EF. LGE: scar distribution and wall layer.", "Cine: حرکت موضعی دیواره، حجم و EF. LGE: توزیع و لایهٔ اسکار."),
      L("Cine: Narbenverteilung. LGE: regionale Wandbewegung und EF.", "Cine: scar distribution. LGE: regional wall motion and EF.", "Cine: توزیع اسکار. LGE: حرکت موضعی دیواره و EF."),
      L("Cine: Narbe. LGE: Ödem und Fettanteil.", "Cine: scar. LGE: oedema and fat content.", "Cine: اسکار. LGE: ادم و مقدار چربی."),
    ],
    correct: 'B',
    explanation: L("Cine erfasst die Bewegung im Herzzyklus. Die späten Kontrastaufnahmen zeigen das LGE-Muster. Beurteile bei beiden Sequenzen den RV und den LV.", "Cine captures motion across the cardiac cycle. Delayed contrast images show the LGE pattern. Assess both ventricles on each sequence.", "Cine حرکت در چرخهٔ قلب را ثبت می‌کند. تصاویر دیررس پس از تزریق الگوی LGE را نشان می‌دهند. در هر دو سکانس، هر دو بطن را بررسی کنید."),
  },
  {
    id: 'padua-rv-minor',
    question: L("Im Cine zeigt die freie RV-Wand eine gesicherte regionale Dyskinesie. RV-Volumen und RVEF sind normal. Wie zählt der Befund nach ETF 2023?", "Cine shows definite regional dyskinesia of the RV free wall. RV volume and RVEF are normal. How does this count under ETF 2023?", "در Cine دیسکینزی موضعی قطعی در دیوارهٔ آزاد بطن راست دیده می‌شود. حجم و RVEF طبیعی‌اند. طبق ETF 2023 این یافته چگونه حساب می‌شود؟"),
    options: [
      L("Morphofunktionelles Minor-Kriterium", "Minor morphofunctional criterion", "معیار فرعی مورفولوژی و عملکرد"),
      L("Morphofunktionelles Major-Kriterium", "Major morphofunctional criterion", "معیار اصلی مورفولوژی و عملکرد"),
      L("Strukturelles Major-Kriterium", "Major structural criterion", "معیار اصلی ساختاری"),
      L("Kein ETF-Kriterium", "No ETF criterion", "معیار ETF 2023 ندارد"),
    ],
    correct: 'A',
    explanation: L("Eine gesicherte regionale RV-Dyskinesie genügt nach ETF 2023 für Minor. Major erfordert zusätzlich eine globale RV-Dilatation oder systolische RV-Dysfunktion.", "Definite regional RV dyskinesia meets an ETF minor criterion. Major also requires global RV dilatation or systolic RV dysfunction.", "دیسکینزی موضعی قطعی بطن راست طبق ETF 2023 معیار فرعی است. معیار اصلی به اتساع کلی یا اختلال سیستولی بطن راست هم نیاز دارد."),
  },
  {
    id: 'rv-lge',
    question: L("Welcher Befund erfüllt ein strukturelles RV-Minor-Kriterium nach ETF 2023?", "Which finding meets a minor structural RV criterion under ETF 2023?", "کدام یافته طبق ETF 2023 معیار ساختاری فرعی بطن راست است؟"),
    options: [
      L("Isoliertes LGE an einer septalen RV-Insertion", "Isolated LGE at a septal RV insertion", "LGE محدود به محل اتصال سپتالی بطن راست"),
      L("Transmurales RV-LGE, das nur in einer Ebene zu sehen ist", "Transmural RV LGE visible in only one plane", "LGE تمام‌ضخامت بطن راست که فقط در یک نما دیده می‌شود"),
      L("Fett in der freien RV-Wand bei fehlendem LGE", "Fat in the RV free wall without LGE", "چربی در دیوارهٔ آزاد بطن راست بدون LGE"),
      L("Eindeutiges RV-LGE in mindestens einer Region außerhalb der Trikuspidalklappe, bestätigt in zwei orthogonalen Ebenen.", "Unequivocal RV LGE in at least one region outside the tricuspid valve, confirmed in two orthogonal planes.", "LGE قطعی در دست‌کم یک ناحیه از بطن راست خارج از دریچهٔ تریکوسپید، با تأیید در دو نمای عمود."),
    ],
    correct: 'D',
    explanation: L("Eindeutiges RV-LGE in mindestens einer Region außerhalb der Trikuspidalklappe, bestätigt in zwei orthogonalen Ebenen.", "Unequivocal RV LGE in at least one region outside the tricuspid valve, confirmed in two orthogonal planes.", "LGE قطعی در دست‌کم یک ناحیه از بطن راست خارج از دریچهٔ تریکوسپید، با تأیید در دو نمای عمود."),
  },
  {
    id: 'padua-no-anchor',
    question: L("Die T-Inversionen erfüllen ein Major-Kriterium. Kriterien für Form und Funktion (I) oder Myokardgewebe (II) sind nicht belegt. Wie lautet die Einordnung nach ETF 2023?", "T-wave inversion meets a major criterion, but no morphology/function (I) or myocardial tissue (II) criterion is established. How is this classified under ETF 2023?", "وارونگی موج T یک معیار اصلی را برآورده می‌کند، اما معیاری از مورفولوژی و عملکرد (I) یا بافت میوکارد (II) ثابت نشده است. طبق ETF 2023 نتیجه چیست؟"),
    options: [
      L("Mögliche rechtsdominante ACM", "Possible right-dominant ACM", "ACM راست‌غالب ممکن"),
      L("Die Voraussetzung für eine ETF-Diagnosestufe fehlt.", "The prerequisite for a ETF diagnostic tier is missing.", "پیش‌شرط تعیین ردهٔ تشخیصی ETF 2023 وجود ندارد."),
      L("Grenzwertige rechtsdominante ACM", "Borderline right-dominant ACM", "ACM راست‌غالب مرزی"),
      L("Gesicherte rechtsdominante ACM", "Definite right-dominant ACM", "ACM راست‌غالب قطعی"),
    ],
    correct: 'B',
    explanation: L("Schon für die Stufe „möglich“ braucht es mindestens ein Kriterium aus Kategorie I oder II. Ein isoliertes EKG-Major genügt trotz seiner zwei Punkte nicht.", "Even the possible tier requires at least one category I or II criterion. An isolated major ECG finding is insufficient despite its two points.", "حتی ردهٔ «ممکن» به دست‌کم یک معیار از دستهٔ I یا II نیاز دارد. معیار اصلی منفرد نوار قلب با وجود دو امتیاز کافی نیست."),
  },
  {
    id: 'padua-biventricular',
    question: L("RV-Dyskinesie plus RV-Dilatation (Major in I) und typisches LV-Streifen-LGE in mindestens 3 Segmenten (Major in II) sind bestätigt. Welche Stufe ergibt sich nach ETF 2023, wenn andere Ursachen abgeklärt sind?", "RV dyskinesia with RV dilatation (major in I) and characteristic LV stria-pattern LGE in at least 3 segments (major in II) are confirmed. Which ETF 2023 tier follows once alternative causes have been assessed?", "دیسکینزی و اتساع بطن راست (معیار اصلی در I) و LGE نواری تیپیک بطن چپ در دست‌کم ۳ سگمان (معیار اصلی در II) تأیید شده‌اند. پس از بررسی علل دیگر، نتیجه طبق ETF 2023 چیست؟"),
    options: [
      L("Mögliche isoliert rechtsdominante ACM", "Possible isolated right-dominant ACM", "ACM محدود به بطن راست در ردهٔ ممکن"),
      L("Grenzwertige biventrikuläre ACM", "Borderline biventricular ACM", "ACM دوبطنی مرزی"),
      L("Gesicherte biventrikuläre ACM nach Kriterien", "Definite biventricular ACM by criteria", "ACM دوبطنی قطعی طبق معیارها"),
      L("Isolierte ALVC", "Isolated ALVC", "ALVC محدود به بطن چپ"),
    ],
    correct: 'C',
    explanation: L("Beide Kammern erfüllen ein Kriterium aus I oder II. Zwei Major-Kriterien aus verschiedenen Kategorien ergeben vier Punkte.", "Each ventricle meets a criterion from I or II. Two major criteria from different categories give four points.", "هر بطن معیاری از دستهٔ I یا II دارد. دو معیار اصلی از دو دستهٔ متفاوت چهار امتیاز می‌دهند."),
  },
  {
    id: 'athlete-phenocopy',
    question: L("Ein Ausdauersportler hat eine proportionale Vergrößerung beider Herzkammern. Die regionale Wandbewegung und Pumpfunktion sind unauffällig. Welche Erklärung passt am besten zum MRT-Muster?", "An endurance athlete has proportional enlargement of both ventricles, with normal regional motion and systolic function. Which explanation best fits the MRI pattern?", "در ورزشکار استقامتی هر دو بطن به‌تناسب بزرگ شده‌اند. حرکت موضعی دیواره و عملکرد سیستولی طبیعی‌اند. کدام توضیح با الگوی MRI بیشتر سازگار است؟"),
    options: [
      L("Trainingsbedingte Anpassung", "Training-related adaptation", "سازگاری با تمرین"),
      L("Rechtsdominante ACM allein aufgrund des RV-Volumens", "Right-dominant ACM based on RV volume alone", "ACM راست‌غالب فقط بر اساس حجم بطن راست"),
      L("Biventrikuläre ACM allein aufgrund der Größe beider Kammern", "Biventricular ACM based on enlargement of both ventricles alone", "ACM دوبطنی فقط بر اساس بزرگی هر دو بطن"),
      L("Abgelaufene Myokarditis allein aufgrund der Ventrikelvolumina", "Previous myocarditis based on ventricular volumes alone", "میوکاردیت قبلی فقط بر اساس حجم بطن‌ها"),
    ],
    correct: 'A',
    explanation: L("Eine proportionale Vergrößerung bei erhaltener Funktion spricht für ein Sportherz. Regionale Bewegungsstörungen, Narben oder auffällige Rhythmusbefunde würden eine weitere Abklärung stützen.", "Balanced enlargement with preserved function favours athlete’s heart. Regional wall motion abnormalities, scar, or rhythm findings would support further assessment.", "بزرگی متناسب با عملکرد حفظ‌شده به نفع قلب ورزشکار است. اختلال موضعی حرکت، اسکار یا یافتهٔ غیرطبیعی ریتم بررسی بیشتر را موجه می‌کند."),
  },
  {
    id: 'lge-ischaemic',
    question: L("Welches LGE-Muster spricht am ehesten für eine ischämische Narbe als Differenzialdiagnose zur ACM?", "Which LGE pattern most strongly suggests an ischaemic scar as a differential diagnosis to ACM?", "کدام الگوی LGE بیشتر به نفع اسکار ایسکمیک در افتراق از ACM است؟"),
    options: [
      L("Subepikardiales inferolaterales LV-LGE", "Subepicardial inferolateral LV LGE", "LGE زیر اپی‌کارد در بخش تحتانی‌جانبی بطن چپ"),
      L("Mittmyokardiales LGE im Septum", "Mid-wall septal LGE", "LGE میان‌دیواره‌ای در سپتوم"),
      L("Isoliertes LGE am RV-Insertionspunkt", "Isolated RV insertion-point LGE", "LGE محدود به محل اتصال بطن راست"),
      L("Subendokardiales beziehungsweise transmurales LV-LGE in einem Koronarterritorium", "Subendocardial or transmural LV LGE in a coronary territory", "LGE زیراندوکاردی یا تمام‌ضخامت بطن چپ در قلمرو یک شریان کرونری"),
    ],
    correct: 'D',
    explanation: L("Eine ischämische Narbe beginnt typischerweise subendokardial und folgt einem Koronarterritorium. Ein subepikardiales oder mittmyokardiales Muster spricht eher für eine nichtischämische Ursache.", "An ischaemic scar typically starts in the subendocardium and follows a coronary territory. A subepicardial or mid-wall pattern favours a non-ischaemic cause.", "اسکار ایسکمیک معمولاً از زیر اندوکارد شروع می‌شود و از قلمرو کرونری پیروی می‌کند. الگوی زیر اپی‌کارد یا میان‌دیواره‌ای بیشتر به نفع علت غیرایسکمیک است."),
  },
]
export const ARVC_QUESTIONS = Object.fromEntries(['de','en','fa'].map(lang => [lang, ITEMS.map(item => ({
  id: `arvc-${lang}-${item.id}`, tags: ['arvc','acm','kardio-mrt','thorax'], fach: 'thorax',
  question: item.question[lang], options: item.options.map((option,index) => ({ id: String.fromCharCode(65+index), text: option[lang] })), correct: item.correct, explanation: item.explanation[lang],
}))]))
const CARDS = [
  [
    L("Welche Formen gehören zum ACM-Spektrum?", "Which forms belong to the ACM spectrum?", "چه شکل‌هایی در طیف ACM قرار می‌گیرند؟"),
    L("Rechtsdominant (klassische ARVC), biventrikulär oder linksdominant.", "Right-dominant (classic ARVC), biventricular, or left-dominant.", "راست‌غالب (ARVC کلاسیک)، دوبطنی یا چپ‌غالب."),
  ],
  [
    L("Welche Cine-Befunde ergeben ein RV-Major-Kriterium?", "Which cine findings meet a major RV criterion?", "کدام یافته‌های Cine معیار اصلی بطن راست را برآورده می‌کنند؟"),
    L("Regionale RV-Akinesie, Dyskinesie oder Aneurysma zusammen mit globaler RV-Dilatation oder verminderter RVEF anhand geeigneter Referenzwerte.", "Regional RV akinesia, dyskinesia or aneurysm together with global RV dilatation or reduced RVEF based on appropriate reference ranges.", "آکینزی، دیسکینزی یا آنوریسم موضعی بطن راست همراه با اتساع کلی یا کاهش RVEF بر اساس مقادیر مرجع مناسب."),
  ],
  [
    L("Wann zählt ein regionaler Befund der freien RV-Wand als Minor?", "When does a regional RV free-wall finding count as minor?", "چه زمانی یافتهٔ موضعی دیوارهٔ آزاد بطن راست معیار فرعی است؟"),
    L("Regionale Akinesie, Dyskinesie oder Aneurysma der freien RV-Wand zählt als Minor.", "Regional akinesia, dyskinesia or aneurysm of the RV free wall counts as minor.", "آکینزی، دیسکینزی یا آنوریسم موضعی دیوارهٔ آزاد بطن راست معیار فرعی است."),
  ],
  [
    L("Wie werden RV-Volumen und RVEF nach ETF 2023 beurteilt?", "How are RV volume and RVEF assessed under ETF 2023?", "حجم بطن راست و RVEF طبق ETF 2023 چگونه ارزیابی می‌شوند؟"),
    L("Geeignete Referenzwerte für Methode, Alter und Geschlecht verwenden. Das Volumen auf die Körperoberfläche beziehen.", "Use reference ranges appropriate for technique, age and sex. Index volume to body surface area.", "از مقادیر مرجع متناسب با روش تصویربرداری، سن و جنس استفاده کنید. حجم را بر اساس سطح بدن (BSA) شاخص‌گذاری کنید."),
  ],
  [
    L("Wann ist LV-Streifen-LGE Major oder Minor?", "When is LV stria-pattern LGE major or minor?", "چه زمانی LGE نواری بطن چپ معیار اصلی یا فرعی است؟"),
    L("Typisches subepikardiales oder mittmyokardiales Streifen-LGE ist bei 1–2 Segmenten Minor und ab 3 Segmenten Major.", "Typical subepicardial or midwall stria-pattern LGE is minor in 1–2 segments and major in at least 3.", "LGE نواری تیپیک زیر اپیکارد یا میان‌میوکارد در ۱ تا ۲ سگمان معیار فرعی و در دست‌کم ۳ سگمان معیار اصلی است."),
  ],
  [
    L("Wie werden auffälliger RVEDVi und RVEF bei ETF 2023 zusammen gewertet?", "How are abnormal RVEDVi and RVEF counted together under ETF 2023?", "اگر RVEDVi و RVEF هر دو غیرطبیعی باشند، در ETF 2023 چگونه حساب می‌شوند؟"),
    L("Volumen und EF gehören zur selben Kategorie. Zusammen mit einer qualifizierenden regionalen Störung zählt die Kombination einmal als Major.", "Volume and EF belong to the same category. With a qualifying regional abnormality, the combination counts once as major.", "حجم و EF در یک دسته‌اند. همراه با اختلال موضعی واجد شرایط، این ترکیب یک‌بار به‌عنوان معیار اصلی حساب می‌شود."),
  ],
  [
    L("Zählt isoliertes LGE am RV-Insertionspunkt als LV-Strukturkriterium nach ETF 2023?", "Does isolated RV insertion-point LGE meet the ETF LV structural criterion?", "آیا LGE محدود به محل اتصال بطن راست معیار ساختاری بطن چپ در ETF 2023ست؟"),
    L("Nein. Gesucht wird ein subepikardiales oder mittmyokardiales Streifen-LGE im LV in zwei orthogonalen Ebenen.", "No. Look for subepicardial or mid-wall stria-like LV LGE in two orthogonal planes.", "خیر. معیار، LGE نواری زیر اپی‌کارد یا میان‌دیواره‌ای بطن چپ در دو نمای عمود بر هم است."),
  ],
  [
    L("Welche Rolle spielt die Genetik bei ALVC nach ETF 2023?", "What is the role of genetics in ALVC under ETF 2023?", "ژنتیک در ALVC طبق ETF 2023 چه نقشی دارد؟"),
    L("Für ALVC ist qualifizierendes LV-LGE erforderlich. Bei ausreichender Befundkombination ist eine Genvariante nicht zwingend.", "ALVC requires qualifying LV LGE. A genetic variant is optional when other findings are sufficient.", "برای ALVC وجود LGE واجد شرایط بطن چپ لازم است. با ترکیب کافی یافته‌ها، واریانت ژنتیکی الزامی نیست."),
  ],
  [
    L("Warum kann ACM schon bei erhaltener Pumpfunktion gefährlich sein?", "Why can ACM be dangerous even with preserved systolic function?", "چرا ACM حتی با عملکرد سیستولی حفظ‌شده می‌تواند خطرناک باشد؟"),
    L("Myokardnarben begünstigen ventrikuläre Arrhythmien, auch bevor die EF deutlich abfällt.", "Myocardial scar can predispose to ventricular arrhythmias before EF falls substantially.", "اسکار میوکارد حتی پیش از کاهش قابل‌توجه EF می‌تواند زمینه‌ساز آریتمی بطنی باشد."),
  ],
  [
    L("Was liest du bei ACM im Cine und was im LGE ab?", "What do cine and LGE assess in ACM?", "در ACM، Cine و LGE چه چیزهایی را نشان می‌دهند؟"),
    L("Cine zeigt regionale Wandbewegung, Volumina und EF. LGE zeigt Lage und Muster der Narbe. Beide Kammern beurteilen.", "Cine assesses regional wall motion, volumes, and EF. LGE shows scar location and pattern. Assess both ventricles.", "Cine حرکت موضعی دیواره، حجم و EF را ارزیابی می‌کند. LGE محل و الگوی اسکار را نشان می‌دهد. هر دو بطن را بررسی کنید."),
  ],
  [
    L("Wann zählt RV-LGE als strukturelles Minor-Kriterium?", "When does RV LGE count as a minor structural criterion?", "چه زمانی LGE بطن راست معیار ساختاری فرعی است؟"),
    L("Eindeutiges RV-LGE in mindestens einer Region außerhalb der Trikuspidalklappe, bestätigt in zwei orthogonalen Ebenen.", "Unequivocal RV LGE in at least one region outside the tricuspid valve, confirmed in two orthogonal planes.", "LGE قطعی در دست‌کم یک ناحیه از بطن راست خارج از دریچهٔ تریکوسپید، با تأیید در دو نمای عمود."),
  ],
  [
    L("Schließt fehlendes LGE eine ARVC aus?", "Does absence of LGE exclude ARVC?", "آیا نبود LGE بیماری ARVC را رد می‌کند؟"),
    L("Nein. In der dünnen RV-Wand kann LGE schwer nachweisbar sein. Cine und die übrigen Kriterien mitbeurteilen.", "No. LGE can be hard to detect in the thin RV wall. Assess cine and the other criteria as well.", "خیر. تشخیص LGE در دیوارهٔ نازک بطن راست دشوار است. Cine و سایر معیارها را هم ارزیابی کنید."),
  ],
  [
    L("Wie wird ein isoliertes Fettsignal in der RV-Wand gewertet?", "How is isolated fat signal in the RV wall interpreted?", "سیگنال منفرد چربی در دیوارهٔ بطن راست چگونه تفسیر می‌شود؟"),
    L("Fett allein erfüllt kein ACM-Kriterium. Auch epikardiales Fett und Partialvolumeneffekte können das Signal erklären.", "Fat alone does not meet an ACM criterion. Epicardial fat and partial volume effects can also explain the signal.", "چربی به‌تنهایی معیار ACM نیست. چربی اپیکارد و اثر حجم جزئی هم ممکن است سیگنال را توضیح دهند."),
  ],
  [
    L("Wie zählt eine gesicherte regionale Dyskinesie der freien RV-Wand bei normalem RV-Volumen und normaler RVEF nach ETF 2023?", "How does confirmed regional dyskinesia of the RV free wall with normal RV volume and RVEF count under ETF 2023?", "دیسکینزی موضعی قطعی دیوارهٔ آزاد بطن راست با حجم و RVEF طبیعی در ETF 2023 چگونه حساب می‌شود؟"),
    L("Als morphofunktionelles Minor-Kriterium. Für Major muss eine globale RV-Dilatation oder systolische RV-Dysfunktion hinzukommen.", "As a minor morphofunctional criterion. Major also requires global RV dilatation or systolic RV dysfunction.", "به‌عنوان معیار فرعی مورفولوژی و عملکرد. برای معیار اصلی، اتساع کلی یا اختلال سیستولی بطن راست هم باید وجود داشته باشد."),
  ],
  [
    L("Welche Voraussetzung gilt in ETF 2023 schon für eine mögliche ACM?", "What prerequisite applies even for possible ACM under ETF 2023?", "پیش‌شرط حتی برای ACM ممکن در ETF 2023 چیست؟"),
    L("Mindestens ein morphofunktionelles oder strukturelles Kriterium (I oder II). Bei biventrikulärer ACM ist ein solches Kriterium in jeder Kammer nötig.", "At least one morphofunctional or structural criterion (I or II). Biventricular ACM requires such a criterion in each ventricle.", "دست‌کم یک معیار مورفولوژی و عملکرد یا ساختاری (I یا II) لازم است. در ACM دوبطنی، هر بطن باید چنین معیاری داشته باشد."),
  ],
  [
    L("Welche Befunde sprechen bei dilatiertem RV für ein Sportherz?", "Which findings favour athlete’s heart when the RV is dilated?", "در صورت اتساع بطن راست، چه یافته‌هایی به نفع قلب ورزشکارند؟"),
    L("Proportionale Vergrößerung beider Kammern mit erhaltener Funktion und unauffälliger regionaler Wandbewegung.", "Proportional enlargement of both ventricles with preserved function and normal regional wall motion.", "بزرگی متناسب هر دو بطن با عملکرد حفظ‌شده و حرکت موضعی طبیعی دیواره."),
  ],
  [
    L("Wie unterscheidet sich ischämisches LGE von einem typischen nichtischämischen Muster?", "How does ischaemic LGE differ from a typical non-ischaemic pattern?", "LGE ایسکمیک چه تفاوتی با الگوی تیپیک غیرایسکمیک دارد؟"),
    L("Ischämisches LGE beginnt subendokardial und folgt einem Koronarterritorium. Subepikardiales oder mittmyokardiales LGE spricht eher für eine nichtischämische Ursache.", "Ischaemic LGE starts subendocardially and follows a coronary territory. Subepicardial or mid-wall LGE favours a non-ischaemic cause.", "LGE ایسکمیک از زیر اندوکارد شروع می‌شود و از قلمرو کرونری پیروی می‌کند. LGE زیر اپی‌کارد یا میان‌دیواره‌ای بیشتر به نفع علت غیرایسکمیک است."),
  ],
  [
    L("Welche Informationen gehören neben dem MRT zur ACM-Abklärung?", "What information is used alongside MRI to assess suspected ACM?", "در بررسی شک به ACM، علاوه بر MRI چه اطلاعاتی لازم‌اند؟"),
    L("EKG, Rhythmusdiagnostik, Familienanamnese und gegebenenfalls Genetik. Nach Synkope, ventrikulärer Tachykardie und plötzlichem Herztod in der Familie fragen.", "ECG, rhythm assessment, family history, and genetics when indicated. Ask about syncope, ventricular tachycardia, and sudden cardiac death in the family.", "نوار قلب، بررسی ریتم، سابقهٔ خانوادگی و در صورت نیاز ژنتیک. دربارهٔ سنکوپ، تاکی‌کاردی بطنی و مرگ ناگهانی قلبی در خانواده سؤال کنید."),
  ],
]

export const ARVC_FLASHCARDS = CARDS.map(([front, answer], index) => ({
  id: `arvc-${String(index+1).padStart(2,'0')}`, topicId: 'arvc', category: TITLE,
  front, answer,
}))
export const ARVC_FLASHCARD_TOPIC = {
  id: 'arvc', area: 'Thorax', chapter: 'Herz / Kardio-MRT', icon: 'MR', iconImage: '/fach/thorax.png', color: '#713574', href: '/flashcards/arvc', title: TITLE,
  subtitle: L('Cine · LGE · ETF 2023 · Mimics', 'Cine · LGE · ETF 2023 · mimics', 'Cine · LGE · ETF 2023 · افتراق‌ها'),
}
