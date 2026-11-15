import { L, TITLE } from './arrhythmogenicCardiomyopathy'

const ITEMS = [
  { id: 'spectrum', question: L('Welche Aussage beschreibt das ACM-Spektrum?', 'Which statement describes the ACM spectrum?', 'کدام عبارت طیف ACM را توصیف می‌کند؟'), options: [L('Nur der RV kann betroffen sein.', 'Only the RV can be involved.', 'فقط RV درگیر می‌شود.'), L('RV, LV oder beide Ventrikel können betroffen sein.', 'RV, LV or both ventricles can be involved.', 'RV، LV یا هر دو بطن می‌توانند درگیر شوند.'), L('ACM ist immer ischämisch.', 'ACM is always ischaemic.', 'ACM همیشه ایسکمیک است.'), L('Eine normale EF schließt ACM aus.', 'Normal EF excludes ACM.', 'EF طبیعی ACM را رد می‌کند.')], correct: 'B', explanation: L('ARVC ist der rechtsdominante Phänotyp. LV-Narben können auch bei erhaltener EF bestehen.', 'ARVC is the right-dominant phenotype. LV scar may occur with preserved EF.', 'ARVC فنوتیپ راست‌غالب است. اسکار LV ممکن است با EF حفظ‌شده وجود داشته باشد.') },
  { id: 'major-boundary', question: L('Erwachsener Mann, bestätigte RV-Dyskinesie, RVEDVi 110 mL/m², RVEF 50%: 2010-CMR-Kategorie?', 'Adult male, confirmed RV dyskinesia, RVEDVi 110 mL/m², RVEF 50%: 2010 CMR category?', 'مرد بزرگسال با دیسکینزی تأییدشده RV، RVEDVi برابر ۱۱۰ میلی‌لیتر بر مترمربع و RVEF برابر ۵۰٪: دسته CMR 2010؟'), options: [L('Kein Kriterium', 'No criterion', 'بدون معیار'), L('Minor', 'Minor', 'مینور'), L('Major', 'Major', 'ماژور'), L('Allein dadurch definite ACM', 'Definite ACM from this alone', 'ACM قطعی فقط بر همین اساس')], correct: 'C', explanation: L('≥110 mL/m² erfüllt bei Männern mit regionaler Störung die Major-CMR-Kategorie. Dies ist noch keine Gesamtdiagnose.', '≥110 mL/m² in a male with regional abnormality fulfils the major CMR category. It is not an overall diagnosis.', 'در مرد همراه اختلال موضعی، RVEDVi ≥۱۱۰ میلی‌لیتر بر مترمربع معیار ماژور CMR را برقرار می‌کند. این تشخیص کلی بیماری نیست.') },
  { id: 'female-minor', question: L('Erwachsene Frau, RV-Akinesie, RVEDVi 90 mL/m², RVEF 52%: welche 2010-CMR-Kategorie?', 'Adult female, RV akinesia, RVEDVi 90 mL/m², RVEF 52%: which 2010 CMR category?', 'زن بزرگسال با آکینزی RV، RVEDVi برابر ۹۰ میلی‌لیتر بر مترمربع و RVEF برابر ۵۲٪: دسته CMR 2010؟'), options: [L('Minor', 'Minor', 'مینور'), L('Major', 'Major', 'ماژور'), L('Kein Kriterium', 'No criterion', 'بدون معیار'), L('Definite ALVC', 'Definite ALVC', 'ALVC قطعی')], correct: 'A', explanation: L('Bei Frauen ist ≥90 bis <100 mL/m² der Minor-Bereich, sofern die regionale Störung bestätigt ist.', 'In women, ≥90 to <100 mL/m² is the minor range when regional abnormality is confirmed.', 'در زن، RVEDVi از ≥۹۰ تا <۱۰۰ میلی‌لیتر بر مترمربع محدوده مینور است، مشروط به تأیید اختلال موضعی.') },
  { id: 'no-regional', question: L('RVEDVi 125 mL/m², RVEF 38%, aber keine regionale RV-Störung: erfüllt dies die morphofunktionelle 2010-CMR-Kategorie?', 'RVEDVi 125 mL/m², RVEF 38%, but no regional RV abnormality: is the 2010 morphofunctional CMR category fulfilled?', 'RVEDVi برابر ۱۲۵ میلی‌لیتر بر مترمربع و RVEF برابر ۳۸٪، بدون اختلال موضعی RV: دسته مورفولوژی/عملکرد CMR 2010 برقرار است؟'), options: [L('Ja, zweimal Major', 'Yes, two major criteria', 'بله، دو ماژور'), L('Ja, einmal Major', 'Yes, one major criterion', 'بله، یک ماژور'), L('Ja, Minor', 'Yes, minor', 'بله، مینور'), L('Nein; regionale Störung ist erforderlich.', 'No; regional abnormality is required.', 'خیر؛ اختلال موضعی لازم است.')], correct: 'D', explanation: L('Für diese Kategorie müssen regionale Störung UND quantitative Volumen-/EF-Bedingung vorliegen. Andere Kategorien sind separat zu prüfen.', 'This category requires regional abnormality AND a quantitative volume/EF condition. Assess other categories separately.', 'این دسته به اختلال موضعی و شرط کمی حجم/EF با هم نیاز دارد. دسته‌های دیگر جداگانه بررسی شوند.') },
  { id: 'ef-boundary', question: L('Bestätigte RV-Dyskinesie, RVEDVi 85 mL/m², RVEF genau 45%: 2010-CMR-Kategorie?', 'Confirmed RV dyskinesia, RVEDVi 85 mL/m², RVEF exactly 45%: 2010 CMR category?', 'دیسکینزی تأییدشده RV، RVEDVi برابر ۸۵ میلی‌لیتر بر مترمربع و RVEF دقیقاً ۴۵٪: دسته CMR 2010؟'), options: [L('Major', 'Major', 'ماژور'), L('Minor', 'Minor', 'مینور'), L('Kein Kriterium', 'No criterion', 'بدون معیار'), L('Zwei Minor', 'Two minor criteria', 'دو مینور')], correct: 'B', explanation: L('Der Minor-EF-Bereich lautet >40 bis ≤45%; bei ≤40% liegt die quantitative Major-Bedingung vor.', 'The minor EF range is >40 to ≤45%; ≤40% fulfils the quantitative major condition.', 'محدوده EF مینور از >۴۰ تا ≤۴۵٪ است؛ ≤۴۰٪ شرط کمی ماژور را برقرار می‌کند.') },
  { id: 'double-count', question: L('RV-Dyskinesie, RVEDVi 118 mL/m² und RVEF 38%: wie viele morphofunktionelle Major-Kriterien nach 2010?', 'RV dyskinesia, RVEDVi 118 mL/m² and RVEF 38%: how many 2010 morphofunctional major criteria?', 'دیسکینزی RV، RVEDVi برابر ۱۱۸ میلی‌لیتر بر مترمربع و RVEF برابر ۳۸٪: چند ماژور مورفولوژی/عملکرد ۲۰۱۰؟'), options: [L('Eines', 'One', 'یک'), L('Zwei', 'Two', 'دو'), L('Drei', 'Three', 'سه'), L('Keines', 'None', 'هیچ')], correct: 'A', explanation: L('Volumen und EF sind alternative quantitative Bedingungen derselben Kategorie; nicht doppelt zählen.', 'Volume and EF are alternative quantitative conditions in the same category; do not double-count.', 'حجم و EF شروط کمی جایگزین در یک دسته‌اند؛ دوبار شمرده نمی‌شوند.') },
  { id: 'junction', question: L('Welcher Befund erfüllt das LV-LGE-Strukturkriterium nach Padua NICHT?', 'Which finding does NOT fulfil the Padua LV LGE structural criterion?', 'کدام یافته معیار ساختاری LGE بطن چپ در Padua را برآورده نمی‌کند؟'), options: [L('Subepikardiales Streifen-LGE im LV in zwei orthogonalen Ebenen', 'Subepicardial stria-like LV LGE in two orthogonal planes', 'LGE نواری زیر اپی‌کارد بطن چپ در دو نمای عمود بر هم'), L('Mittmyokardiales Streifen-LGE der freien LV-Wand in zwei orthogonalen Ebenen', 'Mid-wall stria-like LGE of the LV free wall in two orthogonal planes', 'LGE نواری میان‌دیواره‌ای در دیوارهٔ آزاد بطن چپ در دو نمای عمود بر هم'), L('Isoliertes junktionales RV-Insertions-LGE', 'Isolated junctional RV insertion-point LGE', 'LGE منفرد محل اتصال RV'), L('Mittmyokardiales Streifen-LGE im Septum in zwei orthogonalen Ebenen außerhalb der RV-Insertionspunkte', 'Mid-wall stria-like septal LGE in two orthogonal planes away from RV insertion points', 'LGE نواری میان‌دیواره‌ای سپتوم در دو نمای عمود بر هم، خارج از نقاط اتصال بطن راست')], correct: 'C', explanation: L('Septales junktionales LGE ist ausgeschlossen; es ist ein unspezifischer Befund.', 'Septal junctional LGE is excluded; it is nonspecific.', 'LGE محل اتصال سپتوم از معیار کنار گذاشته شده و غیراختصاصی است.') },
  { id: 'isolated-lv', question: L('Typisches strukturelles LV-LGE liegt vor, ohne RV-Kriterium in Kategorie I oder II. Was verlangt Padua 2020 zusätzlich für ALVC?', 'Characteristic structural LV LGE is present without an RV criterion in category I or II. What else does Padua 2020 require for ALVC?', 'الگوی شاخص LGE ساختاری بطن چپ وجود دارد و در دستهٔ I یا II هیچ معیار بطن راست برآورده نشده است. پادوا ۲۰۲۰ برای ALVC چه شرط دیگری دارد؟'), options: [L('Fettsignal allein', 'Fat signal alone', 'فقط سیگنال چربی'), L('Eine VUS genügt.', 'A VUS is sufficient.', 'VUS کافی است.'), L('Ein großer rechter Vorhof', 'A large right atrium', 'دهلیز راست بزرگ'), L('Eine passende pathogene/wahrscheinlich pathogene Variante', 'A compatible pathogenic/likely pathogenic variant', 'واریانت سازگار بیماری‌زا/احتمالاً بیماری‌زا')], correct: 'D', explanation: L('Ohne RV-Kriterien fehlt die Spezifität der LV-Narbe. Genetische Bestätigung und Ausschluss von Mimics sind zentral.', 'Without RV criteria, LV scar lacks specificity. Genetic confirmation and exclusion of mimics are central.', 'بدون معیار RV، اسکار LV اختصاصیت کافی ندارد. تأیید ژنتیکی و رد افتراق‌ها کلیدی‌اند.') },
  { id: 'fat', question: L('Epikardiales Fett bei sonst normalem RV: beste Einordnung?', 'Epicardial fat with an otherwise normal RV: best interpretation?', 'چربی اپیکاردیال با RV از سایر جهات طبیعی: بهترین تفسیر؟'), options: [L('Sichere ARVC', 'Definite ARVC', 'ARVC قطعی'), L('Fett allein ist kein ACM-Kriterium.', 'Fat alone is not an ACM criterion.', 'چربی به‌تنهایی معیار ACM نیست.'), L('Major-LGE-Kriterium', 'Major LGE criterion', 'معیار ماژور LGE'), L('Obligate LV-Beteiligung', 'Mandatory LV involvement', 'درگیری الزامی LV')], correct: 'B', explanation: L('Fettsignal und Partialvolumen können täuschen. Morphologie, Bewegung, Funktion und Narbe im Gesamtkontext prüfen.', 'Fat signal and partial volume may mislead. Assess morphology, motion, function and scar in context.', 'سیگنال چربی و partial volume گمراه‌کننده‌اند. مورفولوژی، حرکت، عملکرد و اسکار در زمینه کلی بررسی شوند.') },
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
    question: L("Im Cine zeigt die freie RV-Wand eine gesicherte regionale Dyskinesie. RV-Volumen und RVEF sind normal. Wie zählt der Befund nach Padua 2020?", "Cine shows definite regional dyskinesia of the RV free wall. RV volume and RVEF are normal. How does this count under Padua 2020?", "در Cine دیسکینزی موضعی قطعی در دیوارهٔ آزاد بطن راست دیده می‌شود. حجم و RVEF طبیعی‌اند. طبق پادوا ۲۰۲۰ این یافته چگونه حساب می‌شود؟"),
    options: [
      L("Morphofunktionelles Minor-Kriterium", "Minor morphofunctional criterion", "معیار فرعی شکل و عملکرد"),
      L("Morphofunktionelles Major-Kriterium", "Major morphofunctional criterion", "معیار اصلی شکل و عملکرد"),
      L("Strukturelles Major-Kriterium", "Major structural criterion", "معیار اصلی ساختاری"),
      L("Kein Padua-Kriterium", "No Padua criterion", "معیار پادوا ندارد"),
    ],
    correct: 'A',
    explanation: L("Eine gesicherte regionale RV-Dyskinesie genügt nach Padua für Minor. Major erfordert zusätzlich eine globale RV-Dilatation oder systolische RV-Dysfunktion.", "Definite regional RV dyskinesia meets a Padua minor criterion. Major also requires global RV dilatation or systolic RV dysfunction.", "دیسکینزی موضعی قطعی بطن راست طبق پادوا معیار فرعی است. معیار اصلی به اتساع کلی یا اختلال سیستولی بطن راست هم نیاز دارد."),
  },
  {
    id: 'rv-lge',
    question: L("Welche RV-LGE-Konstellation erfüllt nach Padua 2020 ein strukturelles Major-Kriterium?", "Which RV LGE finding meets a major structural criterion under Padua 2020?", "کدام یافتهٔ LGE بطن راست طبق پادوا ۲۰۲۰ معیار اصلی ساختاری است؟"),
    options: [
      L("Isoliertes LGE an einer septalen RV-Insertion", "Isolated LGE at a septal RV insertion", "LGE محدود به محل اتصال سپتالی بطن راست"),
      L("Transmurales RV-LGE, das nur in einer Ebene zu sehen ist", "Transmural RV LGE visible in only one plane", "LGE تمام‌ضخامت بطن راست که فقط در یک نما دیده می‌شود"),
      L("Fett in der freien RV-Wand bei fehlendem LGE", "Fat in the RV free wall without LGE", "چربی در دیوارهٔ آزاد بطن راست بدون LGE"),
      L("Transmurales Streifen-LGE am RV-Apex, in zwei orthogonalen Ebenen bestätigt", "Transmural stria-like LGE at the RV apex, confirmed in two orthogonal planes", "LGE نواری تمام‌ضخامت در اپکس بطن راست که در دو نمای عمود بر هم تأیید شده"),
    ],
    correct: 'D',
    explanation: L("Das Muster muss in mindestens einer RV-Region (Einflusstrakt, Ausflusstrakt oder Apex) und in zwei orthogonalen Ebenen nachweisbar sein.", "The pattern must be present in at least one RV region (inlet, outflow tract or apex) and confirmed in two orthogonal planes.", "الگو باید در دست‌کم یک ناحیهٔ بطن راست (مسیر ورودی، خروجی یا اپکس) و در دو نمای عمود بر هم دیده شود."),
  },
  {
    id: 'padua-no-anchor',
    question: L("Die T-Inversionen erfüllen ein Major-Kriterium. Kriterien für Form und Funktion (I) oder Myokardgewebe (II) sind nicht belegt. Wie lautet die Einordnung nach Padua 2020?", "T-wave inversion meets a major criterion, but no morphology/function (I) or myocardial tissue (II) criterion is established. How is this classified under Padua 2020?", "وارونگی موج T یک معیار اصلی را برآورده می‌کند، اما معیاری از شکل و عملکرد (I) یا بافت میوکارد (II) ثابت نشده است. طبق پادوا ۲۰۲۰ نتیجه چیست؟"),
    options: [
      L("Mögliche rechtsdominante ACM", "Possible right-dominant ACM", "ACM راست‌غالب ممکن"),
      L("Die Voraussetzung für eine Padua-Diagnosestufe fehlt.", "The prerequisite for a Padua diagnostic tier is missing.", "پیش‌شرط تعیین ردهٔ تشخیصی پادوا وجود ندارد."),
      L("Grenzwertige rechtsdominante ACM", "Borderline right-dominant ACM", "ACM راست‌غالب مرزی"),
      L("Gesicherte rechtsdominante ACM", "Definite right-dominant ACM", "ACM راست‌غالب قطعی"),
    ],
    correct: 'B',
    explanation: L("Schon für die Stufe „möglich“ braucht es mindestens ein Kriterium aus Kategorie I oder II. Ein isoliertes EKG-Major genügt trotz seiner zwei Punkte nicht.", "Even the possible tier requires at least one category I or II criterion. An isolated major ECG finding is insufficient despite its two points.", "حتی ردهٔ «ممکن» به دست‌کم یک معیار از دستهٔ I یا II نیاز دارد. معیار اصلی منفرد نوار قلب با وجود دو امتیاز کافی نیست."),
  },
  {
    id: 'padua-biventricular',
    question: L("RV-Dyskinesie plus RV-Dilatation (Major in I) und typisches LV-LGE (Major in II) sind bestätigt. Welche Stufe ergibt sich nach Padua 2020, wenn andere Ursachen abgeklärt sind?", "RV dyskinesia with RV dilatation (major in I) and characteristic LV LGE (major in II) are confirmed. Which Padua 2020 tier follows once alternative causes have been assessed?", "دیسکینزی و اتساع بطن راست (معیار اصلی در I) و LGE شاخص بطن چپ (معیار اصلی در II) تأیید شده‌اند. پس از بررسی علل دیگر، نتیجه طبق پادوا ۲۰۲۰ چیست؟"),
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
    L("Welche RVEDVi-Grenzen erfüllen bei regionaler RV-Wandbewegungsstörung das TFC-Major-Kriterium im MRT?", "With a regional RV wall motion abnormality, which RVEDVi thresholds meet the TFC major MRI criterion?", "با وجود اختلال موضعی حرکت دیوارهٔ بطن راست، آستانه‌های RVEDVi برای معیار اصلی MRI در TFC چیست؟"),
    L("Männer ≥ 110 ml/m², Frauen ≥ 100 ml/m².", "Men ≥110 mL/m², women ≥100 mL/m².", "مردان ≥ ۱۱۰ و زنان ≥ ۱۰۰ میلی‌لیتر بر متر مربع."),
  ],
  [
    L("Welcher RVEDVi-Bereich zählt bei regionaler RV-Wandbewegungsstörung als TFC-Minor?", "With a regional RV wall motion abnormality, which RVEDVi ranges count as TFC minor?", "با اختلال موضعی حرکت دیوارهٔ بطن راست، کدام محدودهٔ RVEDVi معیار فرعی TFC است؟"),
    L("Männer 100 bis < 110 ml/m², Frauen 90 bis < 100 ml/m².", "Men 100 to <110 mL/m², women 90 to <100 mL/m².", "مردان ۱۰۰ تا کمتر از ۱۱۰ و زنان ۹۰ تا کمتر از ۱۰۰ میلی‌لیتر بر متر مربع."),
  ],
  [
    L("Welche zwei Befunde müssen für das MRT-Kriterium nach TFC zusammenkommen?", "Which two findings must occur together for the TFC MRI criterion?", "برای معیار MRI در TFC، کدام دو یافته باید هم‌زمان باشند؟"),
    L("Regionale RV-Akinesie, Dyskinesie oder dyssynchrone Kontraktion zusammen mit erhöhtem RVEDVi oder verminderter RVEF.", "Regional RV akinesia, dyskinesia, or dyssynchronous contraction plus increased RVEDVi or reduced RVEF.", "آکینزی، دیسکینزی موضعی یا انقباض ناهماهنگ بطن راست همراه با افزایش RVEDVi یا کاهش RVEF."),
  ],
  [
    L("Welche RVEF-Grenzen gelten für Major und Minor nach TFC 2010?", "Which RVEF cutoffs apply to major and minor under TFC 2010?", "آستانه‌های RVEF برای معیار اصلی و فرعی TFC ۲۰۱۰ چیست؟"),
    L("Major ≤ 40 %. Minor > 40 % bis ≤ 45 %. Beide erfordern zusätzlich die regionale RV-Störung.", "Major ≤40%. Minor >40% to ≤45%. Both also require a regional RV abnormality.", "معیار اصلی ≤۴۰٪. معیار فرعی بیشتر از ۴۰٪ و حداکثر ۴۵٪. هر دو به اختلال موضعی بطن راست هم نیاز دارند."),
  ],
  [
    L("Wie werden auffälliger RVEDVi und RVEF bei TFC zusammen gewertet?", "How are abnormal RVEDVi and RVEF counted together under TFC?", "اگر RVEDVi و RVEF هر دو غیرطبیعی باشند، در TFC چگونه حساب می‌شوند؟"),
    L("Volumen und EF gehören zur selben Kategorie. Zusammen mit der regionalen Störung zählt einmal die höhere Einstufung.", "Volume and EF belong to the same category. With the regional abnormality, count the higher grade once.", "حجم و EF در یک دسته‌اند. همراه با اختلال موضعی، ردهٔ بالاتر فقط یک بار حساب می‌شود."),
  ],
  [
    L("Zählt isoliertes LGE am RV-Insertionspunkt als LV-Strukturkriterium nach Padua?", "Does isolated RV insertion-point LGE meet the Padua LV structural criterion?", "آیا LGE محدود به محل اتصال بطن راست معیار ساختاری بطن چپ در پادواست؟"),
    L("Nein. Gesucht wird ein subepikardiales oder mittmyokardiales Streifen-LGE im LV in zwei orthogonalen Ebenen.", "No. Look for subepicardial or mid-wall stria-like LV LGE in two orthogonal planes.", "خیر. معیار، LGE نواری زیر اپی‌کارد یا میان‌دیواره‌ای بطن چپ در دو نمای عمود بر هم است."),
  ],
  [
    L("Welche Befunde verlangt Padua 2020 bei isolierter ALVC?", "What findings does Padua 2020 require for isolated ALVC?", "پادوا ۲۰۲۰ برای ALVC محدود به بطن چپ چه یافته‌هایی می‌خواهد؟"),
    L("Typisches strukturelles LV-LGE und eine pathogene oder wahrscheinlich pathogene ACM-Genvariante.", "Characteristic structural LV LGE and a pathogenic or likely pathogenic ACM variant.", "الگوی شاخص LGE ساختاری بطن چپ و یک واریانت بیماری‌زا یا احتمالاً بیماری‌زای مرتبط با ACM."),
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
    L("Wann erfüllt RV-LGE ein strukturelles Major-Kriterium nach Padua 2020?", "When does RV LGE meet a major structural criterion under Padua 2020?", "چه زمانی LGE بطن راست طبق پادوا ۲۰۲۰ معیار اصلی ساختاری است؟"),
    L("Bei transmuralem Streifen-LGE in mindestens einer RV-Region, bestätigt in zwei orthogonalen Ebenen.", "Transmural stria-like LGE in at least one RV region, confirmed in two orthogonal planes.", "LGE نواری تمام‌ضخامت در دست‌کم یک ناحیهٔ بطن راست که در دو نمای عمود بر هم تأیید شده باشد."),
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
    L("Wie zählt eine gesicherte regionale RV-Dyskinesie bei normalem RV-Volumen und normaler RVEF nach Padua 2020?", "How does confirmed regional RV dyskinesia with normal RV volume and RVEF count under Padua 2020?", "دیسکینزی موضعی قطعی بطن راست با حجم و RVEF طبیعی در پادوا ۲۰۲۰ چگونه حساب می‌شود؟"),
    L("Als morphofunktionelles Minor-Kriterium. Für Major muss eine globale RV-Dilatation oder systolische RV-Dysfunktion hinzukommen.", "As a minor morphofunctional criterion. Major also requires global RV dilatation or systolic RV dysfunction.", "به‌عنوان معیار فرعی شکل و عملکرد. برای معیار اصلی، اتساع کلی یا اختلال سیستولی بطن راست هم باید وجود داشته باشد."),
  ],
  [
    L("Welche Voraussetzung gilt in Padua 2020 schon für eine mögliche ACM?", "What prerequisite applies even for possible ACM under Padua 2020?", "پیش‌شرط حتی برای ACM ممکن در پادوا ۲۰۲۰ چیست؟"),
    L("Mindestens ein morphofunktionelles oder strukturelles Kriterium (I oder II). Bei biventrikulärer ACM ist ein solches Kriterium in jeder Kammer nötig.", "At least one morphofunctional or structural criterion (I or II). Biventricular ACM requires such a criterion in each ventricle.", "دست‌کم یک معیار شکل و عملکرد یا ساختاری (I یا II) لازم است. در ACM دوبطنی، هر بطن باید چنین معیاری داشته باشد."),
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
  subtitle: L('Cine · LGE · TFC · Padua · Mimics', 'Cine · LGE · TFC · Padua · mimics', 'Cine · LGE · TFC · Padua · افتراق‌ها'),
}
