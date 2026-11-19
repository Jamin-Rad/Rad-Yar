import { Children, cloneElement, isValidElement } from 'react'

// Authored parallel translations; German clinical source remains unchanged.
const COPY = {
  "Regionale RV-Akinesie, Dyskinesie oder ein Aneurysma ergeben zusammen mit globaler RV-Dilatation oder verminderter RVEF ein Major-Kriterium. An der freien RV-Wand reicht der regionale Befund allein für Minor.": {"en":"Regional RV akinesia, dyskinesia or an aneurysm with global RV dilatation or reduced RVEF meets a major criterion. The regional finding alone qualifies as minor when it affects the RV free wall.","fa":"آکینزی، دیسکینزی یا آنوریسم موضعی بطن راست همراه با اتساع کلی یا کاهش RVEF معیار اصلی است. اگر یافتهٔ موضعی در دیوارهٔ آزاد بطن راست باشد، به‌تنهایی معیار فرعی است."},
  "Eindeutiges RV-LGE außerhalb der Trikuspidalklappe zählt als Minor. Beim typischen LV-Streifen-LGE sind 1–2 Segmente Minor und mindestens 3 Segmente Major.": {"en":"Unequivocal RV LGE outside the tricuspid valve is minor. Typical LV stria-pattern LGE is minor in 1–2 segments and major in at least 3 segments.","fa":"LGE واضح در بطن راست خارج از دریچهٔ تریکوسپید معیار فرعی است. در LGE نواری تیپیک بطن چپ، ۱ تا ۲ سگمان معیار فرعی و دست‌کم ۳ سگمان معیار اصلی است."},
  "ACM-Rechner": { en: "ACM calculator", fa: "محاسبه‌گر ACM" },
  "Zum ACM-Rechner": { en: "Open ACM calculator", fa: "باز کردن محاسبه‌گر ACM" },
  "Mindestens ein Kriterium für Form und Funktion (I) oder Myokardgewebe (II) muss erfüllt sein. Bei biventrikulärer ACM gilt das für beide Kammern. Ein Major-Kriterium im EKG allein genügt nicht.": { en: "At least one criterion for morphology and function (I) or myocardial tissue (II) must be met. In biventricular ACM, this applies to both ventricles. A major ECG criterion alone is insufficient.", fa: "دست‌کم یک معیار مورفولوژی و عملکرد (I) یا بافت میوکارد (II) باید برآورده شود. در ACM دوبطنی، این شرط برای هر دو بطن برقرار است. یک معیار اصلی نوار قلب به‌تنهایی کافی نیست." },
  "Erforderlich sind ein strukturelles LV-Major-Kriterium (typisches LGE) und eine pathogene oder wahrscheinlich pathogene ACM-assoziierte Genvariante.": { en: "A major LV structural criterion (characteristic LGE) and a pathogenic or likely pathogenic ACM-associated genetic variant are required.", fa: "یک معیار اصلی ساختاری بطن چپ (الگوی تیپیک LGE) و یک واریانت بیماری‌زا یا احتمالاً بیماری‌زای مرتبط با ACM لازم‌اند." },
  "Negative T-Wellen in V1–V3 oder darüber hinaus ohne kompletten Rechtsschenkelblock sind ein Beispiel für Major.": { en: "T-wave inversion in V1–V3 or beyond without complete right bundle branch block is an example of a major finding.", fa: "وارونگی موج T در V1–V3 یا فراتر از آن، بدون بلوک کامل شاخهٔ راست، نمونه‌ای از معیار اصلی است." },
  "RVEDVi ist das enddiastolische RV-Volumen bezogen auf die Körperoberfläche.": { en: "RVEDVi is the RV end-diastolic volume indexed to body surface area.", fa: "RVEDVi حجم پایان دیاستول بطن راست نسبت به سطح بدن است." },
  "RVEF ist die rechtsventrikuläre Ejektionsfraktion.": { en: "RVEF is the right ventricular ejection fraction.", fa: "RVEF کسر جهشی بطن راست است." },
  "Sind Volumen und RVEF auffällig, zählt in Kategorie I nur die höhere Einstufung.": { en: "If volume and RVEF are both abnormal, count only the higher grade in category I.", fa: "اگر حجم و RVEF هر دو غیرطبیعی باشند، در دستهٔ I فقط ردهٔ بالاتر حساب می‌شود." },
  "Rechter Ventrikel (RV)": { en: "Right ventricle (RV)", fa: "بطن راست (RV)" },
  "Linker Ventrikel (LV)": { en: "Left ventricle (LV)", fa: "بطن چپ (LV)" },
  "Verminderte LVEF mit oder ohne LV-Dilatation.": { en: "Reduced LVEF with or without LV dilatation.", fa: "کاهش LVEF با یا بدون اتساع بطن چپ." },
  "Alternativ zählt eine regionale Hypokinesie oder Akinesie der freien LV-Wand oder des Septums.": { en: "Regional hypokinesia or akinesia of the LV free wall or septum can also qualify.", fa: "هیپوکینزی یا آکینزی موضعی دیوارهٔ آزاد بطن چپ یا سپتوم نیز می‌تواند این معیار را برآورده کند." },
  "Für den LV gibt es im Cine kein Major-Kriterium.": { en: "There is no major LV criterion on cine.", fa: "در Cine معیار اصلی برای بطن چپ وجود ندارد." },
  "Volumen und EF anhand geeigneter Referenzwerte für die Methode, das Alter und das Geschlecht beurteilen. Beim Volumen auch die Körperoberfläche berücksichtigen.": { en: "Assess volume and EF against reference values appropriate for the method, age, and sex. Also account for body surface area when assessing volume.", fa: "حجم و EF را با مقادیر مرجع متناسب با روش تصویربرداری، سن و جنس بسنجید. در ارزیابی حجم، سطح بدن را هم در نظر بگیرید." },
  "Ein typisches LGE-Muster in zwei orthogonalen Ebenen zählt als Major-Kriterium.": { en: "A characteristic LGE pattern demonstrated in two orthogonal planes counts as a major criterion.", fa: "الگوی تیپیک LGE که در دو نمای عمود بر هم دیده شود، معیار اصلی است." },
  "Subepikardiales oder mittmyokardiales Streifen-LGE in mindestens einem Segment der freien Wand oder des Septums.": { en: "Subepicardial or mid-wall stria-like LGE in at least one segment of the free wall or septum.", fa: "LGE نواری زیر اپی‌کارد یا در میانهٔ دیواره، در دست‌کم یک سگمان از دیوارهٔ آزاد یا سپتوم." },
  "Isoliertes LGE an RV-Insertionspunkten bleibt unberücksichtigt.": { en: "Isolated RV insertion-point LGE does not count.", fa: "LGE محدود به نقاط اتصال بطن راست حساب نمی‌شود." },
  "Pro Kategorie zählt nur das stärkste erfüllte Kriterium, dann werden die Punkte aus den verschiedenen Kategorien addiert.": { en: "Count only the strongest criterion met in each category, then add the points across categories.", fa: "در هر دسته فقط قوی‌ترین معیارِ برآورده‌شده حساب می‌شود، سپس امتیاز دسته‌های مختلف با هم جمع می‌شود." },
  "Nur die rechte Kammer": { en: "Only the right ventricle", fa: "فقط بطن راست" },
  "erfüllt mindestens ein Kriterium aus Kategorie I oder II. Elektrische Befunde der linken Kammer zählen bei dieser Form nicht mit.": { en: "meets at least one criterion in category I or II. LV electrical findings do not count for this form.", fa: "دست‌کم یک معیار از دستهٔ I یا II را برآورده می‌کند. یافته‌های الکتریکی بطن چپ در این شکل حساب نمی‌شوند." },
  "Beide Kammern": { en: "Both ventricles", fa: "هر دو بطن" },
  "erfüllen jeweils mindestens ein Kriterium aus Kategorie I oder II.": { en: "each meet at least one criterion in category I or II.", fa: "هر کدام دست‌کم یک معیار از دستهٔ I یا II را برآورده می‌کنند." },
  "Typisches LGE im LV und eine pathogene oder wahrscheinlich pathogene ACM-Genvariante. Am RV ist kein Kriterium aus Kategorie I oder II erfüllt.": { en: "Characteristic LV LGE and a pathogenic or likely pathogenic ACM gene variant are required. The RV meets no category I or II criterion.", fa: "الگوی تیپیک LGE در بطن چپ و یک واریانت بیماری‌زا یا احتمالاً بیماری‌زای مرتبط با ACM لازم‌اند. بطن راست هیچ معیاری از دستهٔ I یا II را برآورده نمی‌کند." },
  "Differenzialdiagnose": { en: "Differential diagnosis", fa: "تشخیص افتراقی" },
  "Ein vergrößerter rechter Ventrikel oder ein nichtischämisches LGE kann mehrere Ursachen haben. Für die Einordnung zählen": { en: "An enlarged right ventricle or non-ischaemic LGE can have several causes. Interpret these findings using", fa: "بزرگ‌شدن بطن راست یا LGE غیرایسکمیک می‌تواند علت‌های مختلفی داشته باشد. برای تفسیر، این موارد را کنار هم در نظر بگیرید:" },
  "Wandbewegung, Kammerfunktion, Narbenmuster und klinischer Kontext.": { en: "wall motion, ventricular function, scar pattern, and clinical context.", fa: "حرکت دیواره، عملکرد بطن‌ها، الگوی اسکار و وضعیت بالینی." },
  "Worauf kommt es bei der Abgrenzung an?": { en: "How can you tell them apart?", fa: "چطور این موارد را از هم افتراق دهیم؟" },
  "Ausdauertraining kann beide Ventrikel vergrößern.": { en: "Endurance training can enlarge both ventricles.", fa: "تمرین استقامتی می‌تواند هر دو بطن را بزرگ‌تر کند." },
  "Vergleiche die Größe und Funktion beider Kammern. Achte besonders auf regionale Wandbewegungsstörungen und das LGE-Muster.": { en: "Compare the size and function of both ventricles. Pay particular attention to regional wall motion abnormalities and the LGE pattern.", fa: "اندازه و عملکرد هر دو بطن را مقایسه کنید. به اختلال موضعی حرکت دیواره و الگوی LGE توجه ویژه داشته باشید." },
  "Ein nichtischämisches LGE im linken Ventrikel kann bei Myokarditis und ACM ähnlich aussehen.": { en: "Non-ischaemic LGE in the left ventricle can look similar in myocarditis and ACM.", fa: "LGE غیرایسکمیک بطن چپ در میوکاردیت و ACM می‌تواند ظاهر مشابهی داشته باشد." },
  "Ordne akute Beschwerden, Troponin, myokardiales Ödem und Verlauf gemeinsam ein. Auch eine ACM kann mit entzündungsähnlichen Episoden einhergehen.": { en: "Interpret acute symptoms, troponin, myocardial oedema, and the clinical course together. ACM can also present with episodes resembling inflammation.", fa: "علائم حاد، تروپونین، ادم میوکارد و سیر بالینی را با هم بررسی کنید. در ACM هم ممکن است دوره‌هایی شبیه التهاب رخ دهد." },
  "Auch kardiale Sarkoidose kann nichtischämische Narben und ventrikuläre Arrhythmien verursachen.": { en: "Cardiac sarcoidosis can also cause non-ischaemic scars and ventricular arrhythmias.", fa: "سارکوئیدوز قلبی هم می‌تواند باعث اسکار غیرایسکمیک و آریتمی بطنی شود." },
  "Achte auf die Verteilung des LGE, auf Leitungsstörungen und auf Hinweise für eine Sarkoidose außerhalb des Herzens.": { en: "Look at the distribution of LGE, conduction abnormalities, and any evidence of extracardiac sarcoidosis.", fa: "به توزیع LGE، اختلالات هدایتی و شواهد سارکوئیدوز خارج قلب توجه کنید." },
  "Pulmonale Hypertonie kann den rechten Ventrikel druckbelasten. Ein Links-rechts-Shunt kann ihn volumenbelasten.": { en: "Pulmonary hypertension can cause right ventricular pressure overload. A left-to-right shunt can cause volume overload.", fa: "پرفشاری ریوی می‌تواند باعث اضافه‌بار فشاری بطن راست شود. شانت چپ به راست می‌تواند اضافه‌بار حجمی ایجاد کند." },
  "Prüfe bei einer RV-Dilatation, ob eine solche Belastung die Vergrößerung erklärt.": { en: "If the RV is dilated, assess whether pressure or volume overload accounts for the enlargement.", fa: "اگر بطن راست متسع است، بررسی کنید که آیا اضافه‌بار فشاری یا حجمی اتساع را توضیح می‌دهد." },
  "Bewegung aus der Schichtebene, Arrhythmien und Partialvolumeneffekte können einen auffälligen Befund vortäuschen.": { en: "Through-plane motion, arrhythmias, and partial-volume effects can mimic an abnormality.", fa: "حرکت خارج از صفحهٔ تصویربرداری، آریتمی‌ها و اثر حجم جزئی می‌توانند ظاهری شبیه یافتهٔ غیرطبیعی ایجاد کنند." },
  "Eine frühere Ablation kann selbst eine Narbe hinterlassen. Gleiche die Lage des LGE mit der Eingriffsvorgeschichte ab.": { en: "Previous ablation can leave a scar. Compare the location of LGE with the procedural history.", fa: "ابلیشن قبلی می‌تواند اسکار بر جا بگذارد. محل LGE را با سابقهٔ مداخله تطبیق دهید." },
  "Cave · Drei Dinge nicht gleichsetzen": { en: "Caution · Three diagnostic pitfalls", fa: "احتیاط · سه نکتهٔ تشخیصی" },
  "Ein vergrößerter RV allein belegt keine ARVC.": { en: "RV enlargement alone does not establish ARVC.", fa: "بزرگ‌شدن بطن راست به‌تنهایی ARVC را ثابت نمی‌کند." },
  "LGE allein belegt keine ACM.": { en: "LGE alone does not establish ACM.", fa: "LGE به‌تنهایی ACM را ثابت نمی‌کند." },
  "Fehlendes LGE schließt eine ARVC nicht aus.": { en: "Absence of LGE does not exclude ARVC.", fa: "نبود LGE، بیماری ARVC را رد نمی‌کند." },
  "Für eine gesicherte Diagnose reicht ein einzelner MRT-Befund nicht aus.": { en: "A single MRI finding is insufficient for a definite diagnosis.", fa: "یک یافتهٔ MRI برای تشخیص قطعی کافی نیست." },
  "Alle drei Systeme berücksichtigen sechs Befundkategorien. Neben dem MRT zählen unter anderem das EKG, dokumentierte Rhythmusstörungen sowie Familienanamnese und Genetik.": { en: "All three systems consider six categories of findings. Alongside MRI, they assess ECG findings, documented arrhythmias, family history, and genetics.", fa: "هر سه نظام شش دستهٔ یافته را در نظر می‌گیرند. در کنار MRI، نوار قلب، آریتمی‌های ثبت‌شده، سابقهٔ خانوادگی و ژنتیک هم در تشخیص نقش دارند." },
  "Von den Befunden zur Diagnose": { en: "From findings to diagnosis", fa: "از یافته‌ها تا تشخیص" },
  "Pro Kategorie zählt nur das stärkste erfüllte Kriterium. Die Punkte aus den verschiedenen Kategorien werden addiert.": { en: "Count only the strongest criterion met in each category, then add the points across categories.", fa: "در هر دسته فقط قوی‌ترین معیارِ برآورده‌شده حساب می‌شود. سپس امتیاز دسته‌های مختلف با هم جمع می‌شوند." },
  "1 Punkt": { en: "1 point", fa: "۱ امتیاز" },
  "Die Task-Force-Kriterien wurden für die klassische ARVC entwickelt. Im Mittelpunkt steht die rechte Herzkammer.": { en: "The Task Force Criteria were developed for classic ARVC. They focus on the right ventricle.", fa: "معیارهای کارگروه برای ARVC کلاسیک تدوین شدند و تمرکزشان بر بطن راست است." },
  "Major und Minor im MRT": { en: "Major and minor criteria on MRI", fa: "معیارهای اصلی و فرعی در MRI" },
  "Major und Minor setzen eine regionale RV-Akinesie, Dyskinesie oder dyssynchrone Kontraktion voraus. Der Messwert für RV-Volumen oder RVEF bestimmt die Einstufung.": { en: "Major and minor both require regional RV akinesia, dyskinesia, or dyssynchronous contraction. The RV volume or RVEF measurement determines the grade.", fa: "هر دو رده به آکینزی یا دیسکینزی موضعی بطن راست یا انقباض ناهماهنگ آن نیاز دارند. مقدار حجم بطن راست یا RVEF رده را مشخص می‌کند." },
  "Wie wird gewertet?": { en: "How are findings scored?", fa: "امتیازها چطور حساب می‌شوند؟" },
  "Major entspricht 2 Punkten. Minor entspricht 1 Punkt.": { en: "Major corresponds to 2 points. Minor corresponds to 1 point.", fa: "معیار اصلی ۲ امتیاز دارد و معیار فرعی ۱ امتیاز." },
  "Pro Kategorie zählt der stärkste Befund einmal.": { en: "Count the strongest finding in each category once.", fa: "در هر دسته، قوی‌ترین یافته فقط یک بار حساب می‌شود." },
  "Möglich": { en: "Possible", fa: "ممکن" },
  "Grenzwertig": { en: "Borderline", fa: "مرزی" },
  "Gesichert": { en: "Definite", fa: "قطعی" },
  "2 Punkte": { en: "2 points", fa: "۲ امتیاز" },
  "3 Punkte": { en: "3 points", fa: "۳ امتیاز" },
  "Ab 4 Punkten": { en: "4 points or more", fa: "۴ امتیاز یا بیشتر" },
  "Vier Punkte ergeben sich zum Beispiel aus zwei Major-Kriterien, einem Major- und zwei Minor-Kriterien oder vier Minor-Kriterien aus verschiedenen Kategorien.": { en: "Four points can come from two major criteria, one major plus two minor criteria, or four minor criteria, each from a different category.", fa: "چهار امتیاز می‌تواند از دو معیار اصلی، یک معیار اصلی همراه با دو معیار فرعی، یا چهار معیار فرعی به دست بیاید. هر معیار باید از دسته‌ای متفاوت باشد." },
  "Die Task-Force-Kriterien richten sich auf die klassische ARVC mit Beteiligung der rechten Herzkammer. Für sie gelten die drei Stufen oben.": { en: "The Task Force Criteria address classic ARVC involving the right ventricle. The three tiers above apply.", fa: "معیارهای کارگروه برای ARVC کلاسیک با درگیری بطن راست تدوین شدند. سه ردهٔ بالا برای همین فرم به کار می‌روند." },
  "Kriterien aus I oder II nur am RV. Linksventrikuläre elektrische Befunde fließen bei dieser Form nicht in die Wertung ein.": { en: "Category I or II criteria are met only in the RV. LV electrical findings are excluded from scoring for this form.", fa: "معیارهای دستهٔ I یا II فقط در بطن راست وجود دارند. یافته‌های الکتریکی بطن چپ در امتیاز این فرم حساب نمی‌شوند." },
  "Mindestens ein Kriterium aus I oder II pro Herzkammer.": { en: "At least one category I or II criterion in each ventricle.", fa: "حداقل یک معیار از دستهٔ I یا II در هر بطن." },
  "Rechtsdominant": { en: "Right-dominant", fa: "راست‌غالب" },
  "Isoliert links": { en: "Isolated LV involvement", fa: "درگیری محدود به بطن چپ" },
  "Typisches LV-LGE und eine pathogene oder wahrscheinlich pathogene ACM-Genvariante sind erforderlich.": { en: "Characteristic LV LGE and a pathogenic or likely pathogenic ACM variant are required.", fa: "الگوی تیپیک LGE در بطن چپ و یک واریانت بیماری‌زا یا احتمالاً بیماری‌زای مرتبط با ACM لازم‌اند." },
  "Was zählt im MRT als Major oder Minor?": { en: "What counts as major or minor on MRI?", fa: "کدام یافته‌های MRI معیار اصلی یا فرعی هستند؟" },
  "MRT-Kriterien vergleichen": { en: "Compare MRI criteria", fa: "مقایسهٔ معیارهای MRI" },
  "Cine · rechter Ventrikel": { en: "Cine · right ventricle", fa: "Cine · بطن راست" },
  "Für beide Stufen braucht es eine regionale RV-Akinesie, Dyskinesie oder dyssynchrone RV-Kontraktion. Dazu muss mindestens einer der folgenden Messwerte auffällig sein.": { en: "Both levels require regional RV akinesia, dyskinesia, or dyssynchronous RV contraction plus an abnormal value for at least one of the following measurements.", fa: "هر دو رده به آکینزی موضعی، دیسکینزی یا انقباض ناهماهنگ بطن راست همراه با دست‌کم یکی از مقادیر غیرطبیعی زیر نیاز دارند." },
  "RVEDVi ist das enddiastolische RV-Volumen bezogen auf die Körperoberfläche. RVEF ist die rechtsventrikuläre Ejektionsfraktion.": { en: "RVEDVi is RV end-diastolic volume indexed to body surface area. RVEF is the right ventricular ejection fraction.", fa: "RVEDVi حجم پایان دیاستول بطن راست نسبت به سطح بدن است. RVEF کسر جهشی بطن راست است." },
  "Cine · Form und Funktion (I)": { en: "Cine · morphology and function (I)", fa: "Cine · مورفولوژی و عملکرد (I)" },
  "Regionale Akinesie, Dyskinesie oder Ausbuchtung zusammen mit globaler RV-Dilatation oder verminderter RVEF.": { en: "Regional akinesia, dyskinesia, or bulging together with global RV dilatation or reduced RVEF.", fa: "آکینزی، دیسکینزی یا برجستگی موضعی همراه با اتساع کلی بطن راست یا کاهش RVEF." },
  "Regionale Akinesie, Dyskinesie oder ein Aneurysma der freien RV-Wand genügt auch ohne globale Auffälligkeit.": { en: "Regional akinesia, dyskinesia, or an aneurysm of the RV free wall can qualify even without a global abnormality.", fa: "آکینزی، دیسکینزی یا آنوریسم موضعی دیوارهٔ آزاد بطن راست، حتی با حجم و عملکرد کلی طبیعی، کافی است." },
  "Verminderte LVEF mit oder ohne LV-Dilatation. Auch eine regionale Hypokinesie oder Akinesie der freien LV-Wand oder des Septums erfüllt ein Minor-Kriterium.": { en: "Reduced LVEF with or without LV dilatation. Regional hypokinesia or akinesia of the LV free wall or septum also meets a minor criterion.", fa: "کاهش LVEF با یا بدون اتساع بطن چپ. هیپوکینزی یا آکینزی موضعی دیوارهٔ آزاد بطن چپ یا سپتوم هم معیار فرعی است." },
  "Im Cine gibt es für den LV kein Major-Kriterium. Für Volumen und EF gelten zur Methode und zur untersuchten Person passende Referenzwerte, etwa nach Alter, Geschlecht und Körperoberfläche.": { en: "There is no major LV criterion on cine. Use technique- and patient-appropriate reference values for volume and EF, accounting for factors such as age, sex, and body surface area.", fa: "در Cine معیار اصلی برای بطن چپ وجود ندارد. برای حجم و EF از مقادیر مرجع متناسب با روش و فرد، از جمله سن، جنس و سطح بدن، استفاده کنید." },
  "LGE · Myokardgewebe (II)": { en: "LGE · myocardial tissue (II)", fa: "LGE · بافت میوکارد (II)" },
  "Das typische LGE muss in zwei orthogonalen Ebenen nachweisbar sein.": { en: "Characteristic LGE must be demonstrable in two orthogonal planes.", fa: "الگوی تیپیک LGE باید در دو نمای عمود بر هم دیده شود." },
  "Transmurales Streifen-LGE in mindestens einer RV-Region (Einflusstrakt, Ausflusstrakt oder Apex).": { en: "Transmural stria-like LGE in at least one RV region (inlet, outflow tract, or apex).", fa: "LGE نواری تمام‌ضخامت در دست‌کم یک ناحیه از بطن راست (مسیر ورودی، مسیر خروجی یا اپکس)." },
  "Subepikardiales oder mittmyokardiales Streifen-LGE in mindestens einem Segment der freien Wand oder des Septums. Isoliertes LGE an RV-Insertionspunkten bleibt unberücksichtigt.": { en: "Subepicardial or mid-wall stria-like LGE in at least one segment of the free wall or septum. Exclude isolated RV insertion-point LGE.", fa: "LGE نواری زیر اپی‌کارد یا در میانهٔ دیواره، در دست‌کم یک سگمان از دیوارهٔ آزاد یا سپتوم. LGE محدود به نقاط اتصال بطن راست حساب نمی‌شود." },
  "Für LGE gibt es kein Minor-Kriterium.": { en: "There is no minor LGE criterion.", fa: "LGE معیار فرعی ندارد." },
  "Die fünf weiteren Kategorien": { en: "The five other categories", fa: "پنج دستهٔ دیگر" },
  "Myokardgewebe": { en: "Myocardial tissue", fa: "بافت میوکارد" },
  "Repolarisation im EKG": { en: "ECG repolarization", fa: "رپلاریزاسیون در نوار قلب" },
  "Depolarisation im EKG": { en: "ECG depolarization", fa: "دپلاریزاسیون در نوار قلب" },
  "Ventrikuläre Arrhythmien": { en: "Ventricular arrhythmias", fa: "آریتمی‌های بطنی" },
  "Im Langzeit-EKG zählen Häufigkeit und Morphologie ventrikulärer Extrasystolen und Tachykardien. Zum Beispiel ist eine VT mit Linksschenkelblockmorphologie und superiorer Achse in beiden Systemen ein Major-Kriterium.": { en: "Ambulatory ECG evaluates the frequency and morphology of ventricular ectopy and tachycardia. For example, VT with left bundle branch block morphology and a superior axis is a major criterion in both systems.", fa: "در پایش طولانی‌مدت نوار قلب، تعداد و شکل اکستراسیستول‌ها و تاکی‌کاردی‌های بطنی اهمیت دارند. برای مثال، VT با نمای بلوک شاخهٔ چپ و محور فوقانی در هر دو سیستم معیار اصلی است." },
  "Familienanamnese und Genetik": { en: "Family history and genetics", fa: "سابقهٔ خانوادگی و ژنتیک" },
  "Eine bestätigte Erkrankung bei einem erstgradig Verwandten kann ein Major-Kriterium erfüllen. Auch eine als krankheitsverursachend eingestufte Genvariante kann als Major zählen.": { en: "Confirmed disease in a first-degree relative can meet a major criterion. A genetic variant classified as disease-causing may also count as major.", fa: "بیماری تأییدشده در یکی از بستگان درجهٔ اول می‌تواند معیار اصلی باشد. واریانتی که بیماری‌زا طبقه‌بندی شده است هم می‌تواند معیار اصلی محسوب شود." },
  "Diagnosekriterien": { en: "Diagnostic criteria", fa: "معیارهای تشخیصی" },
  "MRT-Kriterium": { en: "MRI criterion", fa: "معیار MRI" },
  "Die Kriterien müssen aus unterschiedlichen Kategorien stammen.": { en: "Criteria must come from different categories.", fa: "معیارها باید از دسته‌های متفاوت باشند." },
  "2 Major": { en: "2 major", fa: "۲ معیار اصلی" },
  "1 Major + 2 Minor": { en: "1 major + 2 minor", fa: "۱ معیار اصلی + ۲ فرعی" },
  "4 Minor": { en: "4 minor", fa: "۴ معیار فرعی" },
  "MRT-Grenzwerte anzeigen": { en: "Show MRI thresholds", fa: "نمایش آستانه‌های MRI" },
  "Einordnung anzeigen": { en: "Reveal interpretation", fa: "نمایش تفسیر" },
  "Die Diagnose stützt sich auf mehrere Befunde. Das MRT liefert nur einen Teil davon.": { en: "Diagnosis combines several findings. MRI provides only part of the evidence.", fa: "تشخیص بر ترکیب چند یافته استوار است. MRI فقط بخشی از شواهد را فراهم می‌کند." },
  "Fallbeispiel": { en: "Case example", fa: "نمونهٔ بالینی" },
  "Klassische ARVC": { en: "Classic ARVC", fa: "ARVC کلاسیک" },
  "Der Schwerpunkt liegt auf Veränderungen der rechten Herzkammer.": {
    en: "The focus is on changes in the right ventricle.",
    fa: "تمرکز بر تغییرات بطن راست است."
  },
  "Das gesamte Spektrum der ACM": { en: "The full ACM spectrum", fa: "طیف کامل ACM" },
  "Für Erkrankungen der rechten, der linken oder beider Herzkammern. Im MRT zählen auch typische Narbenmuster im LGE.": {
    en: "Covers disease involving the right ventricle, the left ventricle, or both. Characteristic scar patterns on LGE also count on MRI.",
    fa: "درگیری بطن راست، بطن چپ یا هر دو را پوشش می‌دهد. در MRI، الگوهای شاخص اسکار در LGE هم جزو معیارها هستند."
  },
  "Zum MRT-Kriterium gehören eine regionale Wandbewegungsstörung des rechten Ventrikels und entweder eine RV-Dilatation oder eine verminderte RVEF.": {
    en: "The MRI criterion requires a regional right ventricular wall motion abnormality together with either RV dilatation or reduced RVEF.",
    fa: "معیار MRI به اختلال موضعی حرکت دیوارهٔ بطن راست همراه با اتساع یا کاهش کسر جهشی بطن راست نیاز دارد."
  },
  "Was wird im MRT beurteilt?": { en: "What is assessed on MRI?", fa: "در MRI چه چیزهایی بررسی می‌شوند؟" },
  "Regional": { en: "Regional", fa: "موضعی" },
  "RV-Akinesie, Dyskinesie oder dyssynchrone Kontraktion.": { en: "RV akinesia, dyskinesia, or dyssynchronous contraction.", fa: "آکینزی، دیسکینزی یا انقباض ناهماهنگ بطن راست." },
  "Global": { en: "Global", fa: "عملکرد و حجم کلی" },
  "Erhöhtes RVEDVi oder verminderte RVEF. Ist beides auffällig, zählt die höhere Einstufung einmal.": {
    en: "Increased RVEDVi or reduced RVEF. If both are abnormal, count the higher classification once.",
    fa: "افزایش RVEDVi یا کاهش RVEF. اگر هر دو غیرطبیعی باشند، بالاترین رده فقط یک بار حساب می‌شود."
  },
  "Wandbewegung, Größe und Funktion beider Kammern beurteilen. Volumen und EF anhand geeigneter Referenzwerte einordnen.": {
    en: "Assess wall motion, size, and function in both ventricles. Compare volume and EF with appropriate reference values.",
    fa: "حرکت دیواره، اندازه و عملکرد هر دو بطن را بررسی کنید. حجم و کسر جهشی را با مقادیر مرجع مناسب بسنجید."
  },
  "Transmurales Streifen-LGE in mindestens einer Region der RV-Wand.": {
    en: "Transmural stria-like LGE in at least one region of the RV wall.",
    fa: "LGE نواری تمام‌ضخامت در دست‌کم یک ناحیه از دیوارهٔ بطن راست."
  },
  "Subepikardiales oder intramurales Streifen-LGE. LGE allein an den RV-Insertionspunkten bleibt unberücksichtigt.": {
    en: "Subepicardial or intramural stria-like LGE. Isolated LGE at the RV insertion points does not count.",
    fa: "LGE نواری زیر اپی‌کارد یا داخل دیواره. LGE محدود به محل اتصال بطن راست معیار محسوب نمی‌شود."
  },
  "Das LGE-Muster in zwei orthogonalen Ebenen bestätigen. Bei der Einordnung auch andere Narbenursachen wie eine Myokarditis berücksichtigen.": {
    en: "Confirm the LGE pattern in two orthogonal planes. Consider other causes of scarring, such as myocarditis.",
    fa: "الگوی LGE را در دو نمای عمود بر هم تأیید کنید. سایر علل اسکار، مانند میوکاردیت، را هم در نظر بگیرید."
  },
  "Was braucht die Gesamtdiagnose?": { en: "What supports the overall diagnosis?", fa: "برای تشخیص نهایی چه لازم است؟" },
  "RV-Dilatation und systolische Dysfunktion": { en: "RV dilatation and systolic dysfunction", fa: "اتساع و اختلال عملکرد سیستولی بطن راست" },
  "Erhöhtes enddiastolisches RV-Volumen, bezogen auf die Körperoberfläche (RVEDVi).": { en: "Increased RV end-diastolic volume indexed to body surface area (RVEDVi).", fa: "افزایش حجم پایان دیاستولی بطن راست نسبت به سطح بدن (RVEDVi)." },
  "Diagnostische Bedeutung": { en: "Diagnostic significance", fa: "اهمیت تشخیصی" },
  "Rechter Ventrikel": { en: "Right ventricle", fa: "بطن راست" },
  "Linker Ventrikel": { en: "Left ventricle", fa: "بطن چپ" },
  "Streifenförmiges LGE kann die gesamte RV-Wanddicke erfassen. Die dünne Wand erschwert den Nachweis.": { en: "Stria-like LGE can extend through the full thickness of the RV wall. The thin wall can make it difficult to detect.", fa: "LGE نواری می‌تواند تمام ضخامت دیوارهٔ بطن راست را درگیر کند. نازکی دیواره تشخیص آن را دشوار می‌کند." },
  "Transmurales, streifenförmiges LGE in mindestens einer RV-Region zählt als strukturelles Major-Kriterium, wenn es in zwei orthogonalen Ebenen bestätigt ist. Fehlendes RV-LGE schließt ARVC nicht aus.": { en: "Transmural, stria-like LGE in at least one RV region counts as a major structural criterion when confirmed in two orthogonal planes. Absence of RV LGE does not rule out ARVC.", fa: "LGE نواری تمام‌ضخامت در دست‌کم یک ناحیهٔ بطن راست، اگر در دو نمای عمود بر هم تأیید شود، یک معیار اصلی ساختاری است. نبود LGE بطن راست، ARVC را رد نمی‌کند." },
  "Abgrenzung zu Infarkt und Myokarditis": { en: "Distinguishing infarction and myocarditis", fa: "افتراق از انفارکتوس و میوکاردیت" },
  "Cine im Vierkammerblick und in einer zweiten Ebene beurteilen.": { en: "Assess cine in the four-chamber view and in a second plane.", fa: "تصاویر Cine را در نمای چهارحفره‌ای و یک نمای دوم بررسی کنید." },
  "Ein Abschnitt der freien RV-Wand bewegt sich in der Systole nicht.": { en: "A segment of the RV free wall does not move during systole.", fa: "بخشی از دیوارهٔ آزاد بطن راست در سیستول حرکت نمی‌کند." },
  "Ein Abschnitt der freien RV-Wand wölbt sich in der Systole nach außen.": { en: "A segment of the RV free wall bulges outward during systole.", fa: "بخشی از دیوارهٔ آزاد بطن راست در سیستول به بیرون برجسته می‌شود." },
  "Systolische RV-Dysfunktion": { en: "RV systolic dysfunction", fa: "اختلال عملکرد سیستولی بطن راست" },
  "Erhöhtes enddiastolisches RV-Volumen.": { en: "Increased RV end-diastolic volume.", fa: "افزایش حجم پایان دیاستولی بطن راست." },
  "Verminderte RV-Ejektionsfraktion (RVEF).": { en: "Reduced RV ejection fraction (RVEF).", fa: "کاهش کسر جهشی بطن راست (RVEF)." },
  "Volumen und RVEF aus dem vollständigen Cine-Stapel bestimmen.": { en: "Measure volume and RVEF from the full cine stack.", fa: "حجم و RVEF را از کل سری Cine اندازه بگیرید." },
  "LGE-Muster im Vergleich": { en: "Comparison of LGE patterns", fa: "مقایسهٔ الگوهای LGE" },
  "Streifenförmiges LGE unter dem Epikard oder in der Wandmitte, häufig inferolateral.": { en: "Stria-like subepicardial or midwall LGE, often inferolateral.", fa: "LGE نواری زیر اپی‌کارد یا در میانهٔ دیواره، اغلب در بخش تحتانی‌جانبی." },
  "Das LGE beginnt typischerweise subendokardial im Gebiet einer Koronararterie. Es kann die gesamte Wanddicke erfassen.": { en: "LGE typically starts subendocardially in a coronary territory and can extend through the full wall thickness.", fa: "LGE معمولاً از زیر اندوکارد در قلمرو یک شریان کرونری آغاز می‌شود و می‌تواند تمام ضخامت دیواره را درگیر کند." },
  "Subepikardiales oder intramurales LGE kann genauso aussehen wie bei ACM.": { en: "Subepicardial or midwall LGE can look the same as in ACM.", fa: "LGE زیر اپی‌کارد یا میان‌دیواره‌ای می‌تواند شبیه ACM باشد." },
  "Was hilft bei der Abgrenzung zur Myokarditis?": { en: "What helps distinguish myocarditis?", fa: "چه چیز به افتراق از میوکاردیت کمک می‌کند؟" },
  "Ein akuter Verlauf und ein Ödem im T2-Mapping sprechen für eine aktive Entzündung. Beides kann auch bei ACM vorkommen.": { en: "An acute presentation and edema on T2 mapping suggest active inflammation. Both can occur in ACM as well.", fa: "سیر حاد و ادم در T2 mapping به نفع التهاب فعال‌اند. هر دو در ACM هم ممکن‌اند." },
  "Für die Einordnung sind Rhythmusbefunde, Familienanamnese und Genetik wichtig.": { en: "Interpret the findings alongside rhythm findings, family history, and genetics.", fa: "یافته‌های تصویربرداری را در کنار نتایج پایش ریتم، سابقهٔ خانوادگی و یافته‌های ژنتیکی تفسیر کنید." },
  "MRT": { en: "MRI", fa: "MRI" },
  "Wichtige Cine-Befunde": { en: "Key cine findings", fa: "یافته‌های مهم Cine" },
  "Regionale Wandbewegungsstörung": { en: "Regional wall motion abnormality", fa: "اختلال موضعی حرکت دیواره" },
  "Dilatation und systolische Funktionsstörung": { en: "Dilatation and systolic dysfunction", fa: "اتساع و اختلال عملکرد سیستولی" },
  "Erhöhtes enddiastolisches RV-Volumen und/oder reduzierte RV-Ejektionsfraktion (RVEF). Beide Werte aus dem vollständigen Cine-Stapel bestimmen.": { en: "Increased RV end-diastolic volume, reduced RV ejection fraction (RVEF), or both. Measure both from the full cine stack.", fa: "افزایش حجم پایان دیاستولی بطن راست، کاهش کسر جهشی آن (RVEF) یا هر دو. هر دو مقدار را از کل سری Cine اندازه بگیرید." },
  "Kontrastmittelanreicherung im LGE": { en: "Contrast enhancement on LGE", fa: "افزایش سیگنال پس از تزریق در LGE" },
  "Späte Kontrastmittelanreicherung in beiden Ventrikeln beurteilen. Auffällige Bereiche in einer zweiten Ebene bestätigen.": { en: "Assess late contrast enhancement in both ventricles. Confirm suspicious areas in a second plane.", fa: "افزایش سیگنال تأخیری را در هر دو بطن بررسی کنید و نواحی مشکوک را در نمای دوم تأیید کنید." },
  "ACM mit LV-Beteiligung": { en: "ACM with LV involvement", fa: "ACM با درگیری بطن چپ" },
  "Streifenförmiges LGE, häufig subepikardial oder intramural, besonders inferolateral. Die Verteilung folgt keinem Koronarterritorium.": { en: "Stria-like LGE, often subepicardial or midwall, especially inferolateral. The distribution does not follow a coronary territory.", fa: "LGE نواری، اغلب زیر اپی‌کارد یا میان‌دیواره‌ای، به‌ویژه در بخش تحتانی‌جانبی. الگو از قلمرو یک شریان کرونری پیروی نمی‌کند." },
  "Wie unterscheidet sich das Muster?": { en: "How do the patterns differ?", fa: "الگوها چه تفاوتی دارند؟" },
  "Infarktnarbe": { en: "Infarct scar", fa: "اسکار انفارکتوس" },
  "Typischerweise beginnt das LGE subendokardial und kann sich bis zur gesamten Wanddicke ausdehnen. Die Verteilung passt zum Versorgungsgebiet einer Koronararterie.": { en: "Enhancement typically starts in the subendocardium and may extend through the full wall thickness. It follows a coronary artery territory.", fa: "افزایش سیگنال معمولاً از زیر اندوکارد شروع می‌شود و ممکن است به تمام ضخامت دیواره برسد. توزیع آن با قلمرو یک شریان کرونری هم‌خوانی دارد." },
  "Auch bei Myokarditis kann das LGE subepikardial oder intramural liegen. Das Muster allein trennt Myokarditis und ACM daher nicht sicher.": { en: "Myocarditis can also show subepicardial or midwall LGE. The pattern alone cannot reliably distinguish myocarditis from ACM.", fa: "در میوکاردیت هم LGE می‌تواند زیر اپی‌کارد یا میان‌دیواره‌ای باشد. بنابراین الگو به‌تنهایی این دو بیماری را با اطمینان از هم جدا نمی‌کند." },
  "Akuter Verlauf und Ödem im T2-Mapping helfen bei der Einordnung, können aber auch in einer entzündlichen Phase der ACM auftreten. Rhythmusbefunde, Familienanamnese und Genetik mitbeurteilen.": { en: "An acute presentation and edema on T2 mapping help with interpretation but can also occur in an inflammatory phase of ACM. Consider rhythm findings, family history, and genetics.", fa: "سیر حاد و ادم در T2 mapping به تفسیر کمک می‌کنند، اما در فاز التهابی ACM هم ممکن‌اند. یافته‌های ریتم، سابقهٔ خانوادگی و ژنتیک را هم بررسی کنید." },
  "Wandbewegung": { en: "Wall motion", fa: "حرکت دیواره" },
  "Volumen und Funktion": { en: "Volume and function", fa: "حجم و عملکرد" },
  "Die freie RV-Wand im Vierkammerblick und in einer zweiten Ebene verfolgen.": { en: "Follow the RV free wall in the four-chamber view and a second plane.", fa: "دیوارهٔ آزاد بطن راست را در نمای چهارحفره‌ای و یک نمای دوم دنبال کنید." },
  "In der Systole kann ein Abschnitt unbeweglich bleiben (Akinesie) oder sich nach außen wölben (Dyskinesie).": { en: "During systole, a segment may stay still (akinesia) or bulge outward (dyskinesia).", fa: "در سیستول، بخشی از دیواره ممکن است بی‌حرکت بماند (آکینزی) یا به بیرون برجسته شود (دیسکینزی)." },
  "Aus dem vollständigen Cine-Stapel bestimmen wir RV-Volumen und RVEF.": { en: "Measure RV volume and RVEF from the full cine stack.", fa: "حجم و کسر جهشی بطن راست را از کل سری Cine اندازه بگیرید." },
  "Aufnahme": { en: "Acquisition", fa: "تصویربرداری" },
  "Spätaufnahmen nach Gadolinium in zwei Ebenen.": { en: "Late post-gadolinium images in two planes.", fa: "تصاویر تأخیری پس از تزریق گادولینیوم در دو نما." },
  "Die Wände beider Kammern auf helle Areale prüfen und Auffälligkeiten in der zweiten Ebene bestätigen.": { en: "Look for bright areas in both ventricular walls and confirm them in the second plane.", fa: "دیوارهٔ هر دو بطن را از نظر نواحی روشن بررسی کنید و یافته را در نمای دوم تأیید کنید." },
  "Typisches Muster": { en: "Typical pattern", fa: "الگوی معمول" },
  "Im LV liegt das LGE bei ACM häufig außen oder in der Wandmitte.": { en: "In ACM, LV enhancement is often subepicardial or midwall.", fa: "در ACM، افزایش سیگنال بطن چپ اغلب در بخش بیرونی یا میانهٔ دیواره است." },
  "Warum bewegt sich die Wand anders?": { en: "Why does wall motion change?", fa: "چرا حرکت دیواره تغییر می‌کند؟" },
  "Bei ACM kann Herzmuskel durch Bindegewebe und zum Teil durch Fett ersetzt werden.": { en: "In ACM, heart muscle may be replaced by fibrous tissue and sometimes fat.", fa: "در ACM ممکن است بافت فیبروزی و گاهی چربی جای بخشی از عضلهٔ قلب را بگیرند." },
  "Betroffene Wandabschnitte können sich dadurch in der Systole schlechter oder paradox bewegen.": { en: "Affected segments may contract less or move paradoxically during systole.", fa: "بخش درگیر ممکن است در سیستول ضعیف‌تر یا در جهت غیرطبیعی حرکت کند." },
  "Fett allein ist kein ARVC-Kriterium.": { en: "Fat alone is not an ARVC criterion.", fa: "چربی به‌تنهایی معیار ARVC نیست." },
  "Diagnose anzeigen": { en: "Reveal diagnosis", fa: "نمایش تشخیص" },
  "Welche Sequenzen schauen wir an?": { en: "Which sequences should we review?", fa: "کدام سکانس‌ها را بررسی کنیم؟" },
  "Im Vierkammerblick und in einer zweiten Ebene die freie RV-Wand verfolgen. In der Systole kann ein Abschnitt unbeweglich bleiben (Akinesie) oder sich nach außen wölben (Dyskinesie). Aus dem vollständigen Cine-Stapel bestimmen wir RV-Volumen und RVEF.": { en: "Follow the RV free wall in the four-chamber view and a second plane. During systole, a segment may show no motion (akinesia) or bulge outward (dyskinesia). Measure RV volume and RVEF from the full cine stack.", fa: "دیوارهٔ آزاد بطن راست را در نمای چهارحفره‌ای و یک نمای دوم دنبال کنید. در سیستول، بخشی از آن ممکن است بی‌حرکت بماند (آکینزی) یا به بیرون برجسته شود (دیسکینزی). حجم و کسر جهشی بطن راست را از کل سری Cine اندازه بگیرید." },
  "In den Spätaufnahmen nach Gadolinium die Wände beider Kammern prüfen. Narben können hell erscheinen. Im LV liegt das LGE bei ACM häufig außen oder in der Wandmitte. Auffälligkeiten in einer zweiten Ebene bestätigen.": { en: "Check both ventricular walls on late post-gadolinium images. Scar may appear bright. In ACM, LV enhancement is often subepicardial or midwall. Confirm suspicious findings in a second plane.", fa: "دیوارهٔ هر دو بطن را در تصاویر تأخیری پس از گادولینیوم بررسی کنید. اسکار ممکن است روشن دیده شود. در ACM، افزایش سیگنال بطن چپ اغلب در بخش بیرونی یا میانهٔ دیواره است. یافتهٔ مشکوک را در نمای دوم تأیید کنید." },
  "Von der Herzwand zum MRT-Befund": { en: "From the ventricular wall to the MRI finding", fa: "از دیوارهٔ قلب تا یافتهٔ MRI" },
  "Bei ACM kann Herzmuskel durch Bindegewebe und zum Teil durch Fett ersetzt werden. Betroffene Wandabschnitte können sich dadurch in der Systole schlechter oder paradox bewegen. Fett allein ist kein ARVC-Kriterium.": { en: "In ACM, muscle may be replaced by fibrous tissue and sometimes fat. Affected segments may contract less or move paradoxically during systole. Fat alone is not an ARVC criterion.", fa: "در ACM ممکن است بافت فیبروزی و گاهی چربی جای بخشی از عضلهٔ قلب را بگیرند. بخش درگیر در سیستول ممکن است ضعیف‌تر یا در جهت غیرطبیعی حرکت کند. چربی به‌تنهایی معیار ARVC نیست." },
  "Herzschema zur Orientierung. Die freie Wand des rechten Ventrikels liegt im Bild links.": { en: "Anatomical orientation. The RV free wall is on the left side of the image.", fa: "نمای شماتیک آناتومی. دیوارهٔ آزاد بطن راست در سمت چپ تصویر است." },
  "Stilisiertes LGE-Schema ohne Patientenbezug. Der helle Streifen liegt am Außenrand der linken Kammerwand.": { en: "Stylized LGE diagram. The bright streak lies at the outer edge of the LV wall.", fa: "نمای شماتیک LGE. نوار روشن در لبهٔ بیرونی دیوارهٔ بطن چپ قرار دارد." },
  "MRT-Beispiele": { en: "MRI examples", fa: "نمونه‌های MRI" },
  "Fall 1": { en: "Case 1", fa: "کیس ۱" },
  "Fall 2": { en: "Case 2", fa: "کیس ۲" },
  "Anamnese": { en: "Clinical history", fa: "شرح حال" },
  "MRT-Befund": { en: "MRI findings", fa: "یافته‌های MRI" },
  "Diagnose im Originalfall": { en: "Diagnosis in the source case", fa: "تشخیص در گزارش اصلی" },
  "Rechtsbetonte arrhythmogene Kardiomyopathie (ARVC).": { en: "Right-dominant arrhythmogenic cardiomyopathy (ARVC).", fa: "کاردیومیوپاتی آریتموژنیک با درگیری غالب بطن راست (ARVC)." },
  "Arrhythmogene Kardiomyopathie mit Beteiligung beider Ventrikel, im Originalfall als sehr wahrscheinlich eingestuft.": { en: "Biventricular arrhythmogenic cardiomyopathy, considered highly likely in the source case.", fa: "کاردیومیوپاتی آریتموژنیک با درگیری هر دو بطن، که در گزارش اصلی بسیار محتمل دانسته شده است." },
  "Wandbewegungsstörung": { en: "Wall motion abnormality", fa: "اختلال حرکت دیواره" },
  "Cine-Aufnahmen zeigen Wandbewegung und Pumpfunktion.": { en: "Cine images show wall motion and pumping function.", fa: "تصاویر Cine حرکت دیواره و عملکرد سیستولی را نشان می‌دهند." },
  "Späte Kontrastaufnahmen (LGE) zeigen Hinweise auf Narben.": { en: "Late gadolinium enhancement (LGE) images show signs of scar.", fa: "تصاویر تأخیری پس از تزریق (LGE) نشانه‌های اسکار را نشان می‌دهند." },
  "In der Systole zeigt ein Abschnitt der freien RV-Wand keine Bewegung (Akinesie) oder wölbt sich nach außen (Dyskinesie).": { en: "During systole, a segment of the RV free wall may show no motion (akinesia) or bulge outward (dyskinesia).", fa: "در سیستول، بخشی از دیوارهٔ آزاد بطن راست ممکن است حرکت نکند (آکینزی) یا به بیرون برجسته شود (دیسکینزی)." },
  "RV-Dilatation und EF": { en: "RV dilatation and EF", fa: "اتساع بطن راست و کسر جهشی" },
  "Typische Befunde sind ein erhöhtes enddiastolisches RV-Volumen und/oder eine verminderte rechtsventrikuläre Ejektionsfraktion (RVEF). Beide Werte werden aus der vollständigen Cine-Serie bestimmt.": { en: "Typical findings include increased RV end-diastolic volume, reduced RV ejection fraction (RVEF), or both. Both values are measured from the full cine series.", fa: "یافته‌های معمول شامل افزایش حجم پایان دیاستولی بطن راست، کاهش کسر جهشی بطن راست (RVEF) یا هر دو است. هر دو مقدار از مجموعهٔ کامل تصاویر Cine اندازه‌گیری می‌شوند." },
  "Narben im LGE": { en: "Scar on LGE", fa: "اسکار در LGE" },
  "Im LGE können Narben als helle Areale in der Wand beider Ventrikel sichtbar sein. Fehlendes LGE schließt eine ARVC nicht aus.": { en: "Scar can appear as bright areas in the wall of either ventricle on LGE. Absent LGE does not rule out ARVC.", fa: "در تصاویر LGE، اسکار ممکن است به صورت نواحی روشن در دیوارهٔ هر یک از دو بطن دیده شود. نبود LGE، بیماری ARVC را رد نمی‌کند." },
  "Schema einer RV-Dyskinesie. Rechts zeigt der Pfeil die lokale Auswärtsbewegung in der Systole.": { en: "Illustration of RV dyskinesia. The arrow in the right panel indicates focal outward motion during systole.", fa: "نمای شماتیک دیسکینزی بطن راست. فلش در تصویر سمت راست حرکت موضعی به بیرون در سیستول را نشان می‌دهد." },
  "Bei klassischer ARVC steht die rechte Herzkammer (RV) im Vordergrund.": { en: "Classic ARVC primarily affects the right ventricle (RV).", fa: "در ARVC کلاسیک، درگیری بطن راست (RV) غالب است." },
  "Im Cine beurteilst du Bewegung und Pumpfunktion. Auf den späten Kontrastaufnahmen suchst du nach Narben.": { en: "Use cine to assess motion and pumping function. Look for scar on late contrast images.", fa: "حرکت دیواره و عملکرد سیستولی را در Cine ارزیابی کنید. الگوی اسکار میوکارد را در تصاویر تأخیری پس از تزریق گادولینیوم (LGE) بررسی کنید." },
  "Im Cine kann ein Abschnitt der RV-Wand stillstehen (Akinesie) oder sich beim Zusammenziehen nach außen wölben (Dyskinesie).": { en: "On cine, a segment of the RV wall may remain still (akinesia) or bulge outward during contraction (dyskinesia).", fa: "در Cine بخشی از دیوارهٔ بطن راست ممکن است بی‌حرکت بماند (آکینزی) یا هنگام انقباض به بیرون برجسته شود (دیسکینزی)." },
  "Wie groß ist der RV? Wie gut pumpt er?": { en: "How big is the RV? How well does it pump?", fa: "بطن راست چه اندازه‌ای دارد و چقدر خوب پمپاژ می‌کند؟" },
  "Die Kammer kann zu groß sein oder einen kleineren Anteil ihres Blutes auswerfen. Das misst du in der gesamten Cine-Serie.": { en: "The ventricle may be enlarged or eject a smaller fraction of its blood. Use the full cine series to measure both.", fa: "بطن ممکن است بزرگ شده باشد یا درصد کمتری از خون درونش را بیرون براند. هر دو را با بررسی کل سری Cine اندازه بگیرید." },
  "Siehst du Hinweise auf Narben?": { en: "Can you see signs of scar?", fa: "نشانه‌ای از اسکار می‌بینید؟" },
  "Im LGE können helle Streifen in der Wand auffallen. Schau beide Kammern an. Auch ohne sichtbares LGE ist eine ARVC möglich.": { en: "LGE images may show bright streaks in the wall. Check both ventricles. ARVC can be present without visible LGE.", fa: "در تصاویر LGE ممکن است نوارهای روشن در دیواره دیده شوند. هر دو بطن را بررسی کنید. حتی بدون LGE قابل مشاهده هم ARVC ممکن است وجود داشته باشد." },
  "Die Diagnose ergibt sich aus mehreren Befunden.": { en: "Diagnosis depends on a combination of findings.", fa: "تشخیص از کنار هم گذاشتن چند یافته به دست می‌آید." },
  "Vom MRT-Befund zur Diagnose": { en: "From MRI finding to diagnosis", fa: "از یافتهٔ MRI تا تشخیص" },
  "Ein Abschnitt der RV-Wand wölbt sich bei der Kontraktion nach außen. Das gemessene RV-Volumen liegt über der Major-Grenze. Zusammen ergibt das": { en: "A segment of the RV wall bulges outward during contraction. The measured RV volume is above the major threshold. Together these meet", fa: "بخشی از دیوارهٔ بطن راست هنگام انقباض به بیرون برجسته می‌شود و حجم اندازه‌گیری‌شدهٔ بطن راست از آستانهٔ معیار اصلی بالاتر است. این دو در کنار هم" },
  "ein Major-Kriterium im MRT": { en: "one major MRI criterion", fa: "یک معیار اصلی MRI را تشکیل می‌دهند" },
  "Eine nachgewiesene krankheitsverursachende ARVC-Genvariante liefert": { en: "An established disease-causing ARVC variant provides", fa: "وجود یک واریانت ژنتیکیِ اثبات‌شدهٔ بیماری‌زا برای ARVC،" },
  "ein zweites Major-Kriterium": { en: "a second major criterion", fa: "معیار اصلی دوم" },
  "Was sieht man im MRT?": { en: "What do we see on MRI?", fa: "در MRI چه می‌بینیم؟" },
  "Wie wird ARVC diagnostiziert?": { en: "How is ARVC diagnosed?", fa: "ARVC چگونه تشخیص داده می‌شود؟" },
  "Bei klassischer ARVC zuerst die rechte Kammer (RV) im Cine ansehen.": { en: "In classic ARVC, look at the right ventricle (RV) on cine first.", fa: "در ARVC کلاسیک، ابتدا حرکت بطن راست (RV) را در تصاویر متحرک بررسی کنید." },
  "Dann Größe und Pumpfunktion messen und nach Narben in beiden Kammern suchen.": { en: "Then measure size and pumping function and look for scar in both ventricles.", fa: "سپس اندازه و عملکرد سیستولی را بسنجید و در هر دو بطن دنبال اسکار بگردید." },
  "Bewegung:": { en: "Motion:", fa: "حرکت:" },
  "Im MRT-Film (Cine) kann ein Abschnitt der freien RV-Wand stehen bleiben oder sich beim Zusammenziehen nach außen wölben.": { en: "On cine MRI, part of the RV free wall may stay still or bulge outward during contraction.", fa: "در MRI متحرک (Cine)، بخشی از دیوارهٔ آزاد بطن راست ممکن است بی‌حرکت بماند یا هنگام انقباض به بیرون برجسته شود." },
  "Größe und Pumpfunktion:": { en: "Size and pumping function:", fa: "اندازه و عملکرد سیستولی:" },
  "Die rechte Kammer kann vergrößert sein oder weniger Blut auswerfen. Beides wird aus der gesamten Cine-Serie gemessen.": { en: "The right ventricle may be enlarged or eject a smaller fraction of its blood. Both are measured from the full cine series.", fa: "بطن راست ممکن است بزرگ شده باشد یا درصد کمتری از خون درون خود را بیرون براند. هر دو را از کل سری Cine اندازه می‌گیریم." },
  "Narben:": { en: "Scar:", fa: "اسکار:" },
  "Auf späten Kontrastaufnahmen (LGE) können helle Streifen in der Herzwand auffallen. Auch die linke Kammer prüfen. Fehlendes LGE schließt ARVC nicht aus.": { en: "On late gadolinium enhancement (LGE) images, bright streaks may appear in the heart wall. Check the left ventricle too. Absent LGE does not rule out ARVC.", fa: "در تصاویر تأخیری پس از تزریق (LGE) ممکن است نوارهای روشن در دیوارهٔ قلب دیده شوند. بطن چپ را هم بررسی کنید. نبود LGE، بیماری ARVC را رد نمی‌کند." },
  "Bewegung und Narben genauer ansehen": { en: "A closer look at motion and scar", fa: "بررسی دقیق‌تر حرکت و اسکار" },
  "Ein auffälliges MRT allein reicht für die Diagnose ARVC nicht aus.": { en: "An abnormal MRI alone cannot establish ARVC.", fa: "MRI غیرطبیعی به‌تنهایی برای تشخیص ARVC کافی نیست." },
  "Für die klassische rechtsbetonte Form führen die Task Force Criteria von 2010 Befunde aus verschiedenen Bereichen zusammen, etwa aus MRT oder Echo, EKG, dokumentierten Rhythmusstörungen und Familienanamnese oder Genetik.": { en: "For classic right-dominant ARVC, the 2010 Task Force Criteria combine findings from different categories, such as MRI or echo, ECG, documented arrhythmias, and family history or genetics.", fa: "برای نوع کلاسیک با درگیری غالب بطن راست، معیارهای ۲۰۱۰ یافته‌های چند دسته را کنار هم می‌گذارند، از جمله MRI یا اکو، نوار قلب، آریتمی ثبت‌شده و سابقهٔ خانوادگی یا ژنتیک." },
  "Was zählt im MRT?": { en: "What counts on MRI?", fa: "در MRI چه چیزی معیار محسوب می‌شود؟" },
  "Eine passende regionale Bewegungsstörung der rechten Kammer zusammen mit einem erhöhten RV-Volumen oder einer verminderten RV-Auswurffraktion. Das ergibt ein Bildgebungskriterium.": { en: "A qualifying regional RV wall motion abnormality together with increased RV volume or reduced RV ejection fraction. This counts as one imaging criterion.", fa: "اختلال موضعی مشخص در حرکت دیوارهٔ بطن راست همراه با افزایش حجم یا کاهش کسر جهشی همان بطن. این ترکیب یک معیار تصویربرداری محسوب می‌شود." },
  "Mit zwei Hauptkriterien (Major), einem Haupt- und zwei Nebenkriterien (Minor) oder vier Nebenkriterien aus unterschiedlichen Kategorien.": { en: "With two major criteria, one major plus two minor criteria, or four minor criteria, drawn from different categories.", fa: "با دو معیار اصلی، یک معیار اصلی و دو معیار فرعی، یا چهار معیار فرعی. معیارها باید از دسته‌های متفاوت باشند." },
  "Beispiel: Eine typische Wandbewegungsstörung mit deutlich vergrößerter rechter Kammer kann ein Major-Kriterium sein. Kommt aus einer anderen Kategorie eine nachweislich krankheitsverursachende ARVC-Genvariante hinzu, sind zwei Major-Kriterien erfüllt.": { en: "For example, typical abnormal wall motion with a markedly enlarged RV can meet one major criterion. An established disease-causing ARVC variant would meet a second major criterion in a different category.", fa: "مثلاً اختلال تیپیک حرکت دیواره همراه با بزرگی واضح بطن راست می‌تواند یک معیار اصلی باشد. اگر یک واریانت ژنتیکیِ اثبات‌شدهٔ بیماری‌زا هم یافت شود، معیار اصلی دوم از دستهٔ دیگری تأمین می‌شود." },
  "Für die Gesamtdiagnose zählen weitere Kriterien aus anderen Kategorien.": { en: "The overall diagnosis requires additional criteria from other categories.", fa: "برای تشخیص نهایی، معیارهای دیگری از دسته‌های متفاوت لازم است." },
  "Bei der": {
    "en": "In",
    "fa": "در"
  },
  "arrhythmogenen Kardiomyopathie (ACM)": {
    "en": "arrhythmogenic cardiomyopathy (ACM)",
    "fa": "کاردیومیوپاتی آریتموژنیک (ACM)"
  },
  "wird Herzmuskel durch Narbengewebe ersetzt, teilweise auch durch Fett. Das kann gefährliche Rhythmusstörungen aus den Herzkammern auslösen – auch wenn die Pumpfunktion noch relativ gut ist.": {
    "en": "heart muscle is replaced by scar tissue, sometimes also by fat. This can cause dangerous ventricular arrhythmias, even while pump function remains relatively good.",
    "fa": "بافت عضلانی قلب با اسکار و گاهی نیز با چربی جایگزین می‌شود. این روند می‌تواند آریتمی‌های خطرناک بطنی ایجاد کند، حتی هنگامی که عملکرد سیستولی هنوز نسبتاً خوب است."
  },
  "Früher wurde vor allem die rechte Herzkammer beschrieben: daher der Name": {
    "en": "The right ventricle was originally the main focus, hence the name",
    "fa": "در گذشته بیشتر بطن راست توصیف می‌شد؛ از این رو نام"
  },
  ". Heute weiß man, dass auch die linke Kammer betroffen sein kann, manchmal sogar überwiegend.": {
    "en": ". We now know that the left ventricle may also be involved, sometimes predominantly.",
    "fa": ". امروزه می‌دانیم که بطن چپ نیز می‌تواند درگیر باشد و گاهی درگیری آن غالب است."
  },
  "ACM ist deshalb der umfassendere Begriff.": {
    "en": "ACM is therefore the broader term.",
    "fa": "بنابراین ACM اصطلاح جامع‌تری است."
  },
  "Die Erkrankung ist häufig erblich; eine LV-Beteiligung ist auch für die Prognose wichtig.": {
    "en": "The disease is often inherited; LV involvement also matters for prognosis.",
    "fa": "بیماری اغلب ارثی است؛ درگیری LV برای پیش‌آگهی نیز اهمیت دارد."
  },
  "Schematische Illustration der arrhythmogenen Kardiomyopathie": {
    "en": "Schematic illustration of arrhythmogenic cardiomyopathy",
    "fa": "تصویر شماتیک کاردیومیوپاتی آریتموژنیک"
  },
  "Die wichtigsten Überschneidungen": {
    "en": "Key diagnostic overlaps",
    "fa": "مهم‌ترین شباهت‌های تشخیصی"
  },
  "MRT-Beispiele auswählen": {
    "en": "Choose an MRI example",
    "fa": "انتخاب نمونهٔ MRI"
  },
  "Was bedeutet die Bewegung im Cine?": {
    "en": "What does the wall motion on cine mean?",
    "fa": "حرکت دیواره در Cine چه معنایی دارد؟"
  },
  "Das Narbenmuster einordnen": {
    "en": "Interpreting the scar pattern",
    "fa": "تفسیر الگوی اسکار"
  },
  "Die wichtigsten Ergänzungen für das MRT": {
    "en": "Key additions for MRI",
    "fa": "مهم‌ترین موارد افزوده‌شده برای MRI"
  },
  "Was ist ACM?": {
    "en": "What is ACM?",
    "fa": "ACM چیست؟"
  },
  "Drei mögliche Verteilungen": {
    "en": "Three possible distributions",
    "fa": "سه توزیع ممکن"
  },
  "Was bedeutet das im MRT?": {
    "en": "What does this mean on MRI?",
    "fa": "در MRI چه معنایی دارد؟"
  },
  "RV-dominant · klassische ARVC": {
    "en": "RV-dominant · classic ARVC",
    "fa": "غالب در RV · ARVC کلاسیک"
  },
  "Rechte Kammer besonders auffällig: regionale Bewegungsstörungen, Vergrößerung und reduzierte Pumpfunktion.": {
    "en": "The right ventricle is particularly abnormal, with regional motion abnormalities, enlargement and reduced pump function.",
    "fa": "بطن راست به‌ویژه غیرطبیعی است: اختلال حرکت ناحیه‌ای، بزرگ‌شدگی و کاهش عملکرد سیستولی."
  },
  "Biventrikulär": {
    "en": "Biventricular",
    "fa": "دو‌بطنی"
  },
  "Rechte und linke Kammer sind beteiligt. Neben der RV-Veränderung können nichtischämische Narben im LV auffallen.": {
    "en": "Both ventricles are involved. Non-ischaemic LV scars may be present in addition to RV changes.",
    "fa": "هر دو بطن درگیرند. افزون بر تغییرات RV، اسکارهای غیرایسکمیک در LV نیز ممکن است دیده شوند."
  },
  "Vor allem die linke Kammer ist betroffen, während die rechte Kammer unauffällig sein kann. Für die Einordnung sind das Narbenmuster, die genetischen Befunde und mögliche andere Ursachen wichtig.": {
    "en": "The left ventricle is predominantly affected, while the right ventricle may appear normal. The scar pattern, genetic findings and other possible causes help with interpretation.",
    "fa": "بطن چپ عمدتاً درگیر است، در حالی که بطن راست ممکن است طبیعی به نظر برسد. برای ارزیابی، الگوی اسکار، یافته‌های ژنتیکی و سایر علل احتمالی اهمیت دارند."
  },
  "Ein Anlass zur Abklärung können Palpitationen, eine Synkope, ventrikuläre Rhythmusstörungen oder eine belastete Familiengeschichte sein. Das MRT hilft, die Veränderungen am Herzmuskel einzuordnen; EKG, Rhythmusdiagnostik und Familienanamnese gehören dazu.": {
    "en": "Palpitations, syncope, ventricular arrhythmias or a relevant family history may prompt assessment. MRI helps characterise myocardial changes; ECG, rhythm assessment and family history are also needed.",
    "fa": "تپش قلب، سنکوپ، آریتمی‌های بطنی یا سابقهٔ خانوادگی مرتبط می‌توانند دلیل بررسی باشند. MRI به ارزیابی تغییرات میوکارد کمک می‌کند؛ ECG، بررسی ریتم و سابقهٔ خانوادگی نیز لازم‌اند."
  },
  "Für das MRT merken": {
    "en": "Remember for MRI",
    "fa": "برای MRI به خاطر بسپارید"
  },
  "Immer beide Herzkammern ansehen: Größe, Bewegung, Pumpfunktion und Narben.": {
    "en": "Always assess both ventricles: size, motion, pump function and scars.",
    "fa": "همیشه هر دو بطن را از نظر اندازه، حرکت، عملکرد سیستولی و اسکار بررسی کنید."
  },
  "Bei Verdacht auf ACM beantworten wir drei Fragen:": {
    "en": "When ACM is suspected, we answer three questions:",
    "fa": "در شک به ACM به سه پرسش پاسخ می‌دهیم:"
  },
  "Wie bewegt sich die Wand? Wie groß sind die Kammern und wie gut pumpen sie? Wo liegt eine Narbe?": {
    "en": "How does the wall move? How large are the ventricles and how well do they pump? Where is a scar?",
    "fa": "دیواره چگونه حرکت می‌کند؟ بطن‌ها چه اندازه‌اند و چقدر خوب پمپاژ می‌کنند؟ اسکار کجاست؟"
  },
  "Nicht an einem einzelnen Schnitt entscheiden": {
    "en": "Do not decide from a single slice",
    "fa": "بر اساس یک برش تصمیم نگیرید"
  },
  "Der RV ist dünnwandig und geometrisch komplex. Auffällige Bewegung oder eine scheinbar helle Wandstelle über die Serie und in einer zweiten Ebene überprüfen.": {
    "en": "The RV is thin-walled and geometrically complex. Check abnormal motion or an apparently bright wall focus across the series and in a second plane.",
    "fa": "RV دیواره‌ای نازک و هندسه‌ای پیچیده دارد. حرکت غیرطبیعی یا کانون ظاهراً روشن دیواره را در کل سری و در نمای دوم بررسی کنید."
  },
  "Zuerst die Bewegung im Cine ansehen, dann die Gewebeveränderungen im LGE. Die folgenden Aufnahmen stammen aus echten Radiopaedia-Untersuchungen.": {
    "en": "Assess motion on cine first, then tissue changes on LGE. The following images come from actual Radiopaedia examinations.",
    "fa": "ابتدا حرکت را در Cine و سپس تغییرات بافتی را در LGE بررسی کنید. تصاویر زیر از بررسی‌های واقعی Radiopaedia هستند."
  },
  "Ein großer RV oder eine Narbe kann verschiedene Ursachen haben. Entscheidend ist, ob": {
    "en": "An enlarged RV or a scar can have several causes. What matters is whether",
    "fa": "RV بزرگ یا اسکار می‌تواند علل گوناگونی داشته باشد. مهم این است که آیا"
  },
  "Bewegung, Kammerfunktion, Narbenmuster und klinische Angaben zusammenpassen.": {
    "en": "motion, ventricular function, scar pattern and clinical information fit together.",
    "fa": "حرکت، عملکرد بطن، الگوی اسکار و اطلاعات بالینی با هم سازگارند."
  },
  "Möglichkeit": {
    "en": "Possibility",
    "fa": "احتمال"
  },
  "Was hilft bei der Einordnung?": {
    "en": "What helps interpretation?",
    "fa": "چه چیزی به تفسیر کمک می‌کند؟"
  },
  "RV-Vergrößerung kann eine Trainingsanpassung sein. Beide Kammern vergleichen und nach sicheren regionalen Störungen oder Narben suchen.": {
    "en": "RV enlargement may be a training adaptation. Compare both ventricles and look for definite regional abnormalities or scars.",
    "fa": "اتساع بطن راست می‌تواند بخشی از سازگاری قلب با تمرین باشد. اندازه و عملکرد هر دو بطن را مقایسه کنید و به اختلال موضعی حرکت دیواره و الگوی LGE توجه کنید."
  },
  "Nichtischämisches LV-LGE kann ähnlich aussehen. Akute Beschwerden, Troponin, Ödem und Verlauf berücksichtigen. Auch eine ACM kann entzündungsähnliche Episoden zeigen.": {
    "en": "Non-ischaemic LV LGE may look similar. Consider acute symptoms, troponin, oedema and follow-up. ACM itself can also have inflammatory-like episodes.",
    "fa": "LGE غیرایسکمیک در LV ممکن است مشابه باشد. علائم حاد، تروپونین، ادم و سیر زمانی را در نظر بگیرید. خود ACM نیز می‌تواند دوره‌هایی شبیه التهاب داشته باشد."
  },
  "Kardiale Sarkoidose": {
    "en": "Cardiac sarcoidosis",
    "fa": "سارکوئیدوز قلبی"
  },
  "Kann nichtischämische Narben und Rhythmusstörungen verursachen. Verteilung, Leitungsstörungen und Hinweise außerhalb des Herzens helfen weiter.": {
    "en": "May cause non-ischaemic scars and arrhythmias. Distribution, conduction abnormalities and extracardiac clues help.",
    "fa": "می‌تواند اسکار غیرایسکمیک و آریتمی ایجاد کند. توزیع، اختلال هدایت و سرنخ‌های خارج قلبی کمک‌کننده‌اند."
  },
  "Druck- oder Volumenbelastung des RV": {
    "en": "RV pressure or volume overload",
    "fa": "اضافه‌بار فشاری یا حجمی RV"
  },
  "Zum Beispiel pulmonale Hypertonie oder Shunt: nach einer Ursache für die RV-Vergrößerung suchen.": {
    "en": "For example, pulmonary hypertension or a shunt: look for a cause of RV enlargement.",
    "fa": "برای مثال پرفشاری ریوی یا شانت: علت بزرگ‌شدگی RV را جست‌وجو کنید."
  },
  "Artefakte oder frühere Ablation": {
    "en": "Artefacts or previous ablation",
    "fa": "آرتیفکت یا ابلیشن قبلی"
  },
  "Bewegung aus der Schicht, Arrhythmie und Partialvolumen können täuschen. Eine frühere Ablation kann selbst eine Narbe hinterlassen.": {
    "en": "Through-plane motion, arrhythmia and partial volume can mislead. Previous ablation can itself leave a scar.",
    "fa": "حرکت خارج از صفحه، آریتمی و حجم جزئی می‌توانند گمراه‌کننده باشند. ابلیشن قبلی خود می‌تواند اسکار بر جای بگذارد."
  },
  "Drei Dinge nicht gleichsetzen": {
    "en": "Do not equate these three things",
    "fa": "این سه را معادل ندانید"
  },
  "Großer RV ist nicht automatisch ARVC. LGE ist nicht automatisch ACM. Und fehlendes LGE schließt eine ARVC nicht aus.": {
    "en": "An enlarged RV does not automatically mean ARVC. LGE does not automatically mean ACM. Absence of LGE does not exclude ARVC.",
    "fa": "RV بزرگ به‌طور خودکار به معنی ARVC نیست. LGE به‌طور خودکار به معنی ACM نیست. نبود LGE نیز ARVC را رد نمی‌کند."
  },
  "Als gelesen markiert": {
    "en": "Marked as read",
    "fa": "خوانده‌شده"
  },
  "Abschnitt als gelesen markieren": {
    "en": "Mark chapter as read",
    "fa": "علامت‌گذاری فصل به‌عنوان خوانده‌شده"
  },
  "Lernpfad": {
    "en": "Learning path",
    "fa": "مسیر یادگیری"
  },
  "gelesen": {
    "en": "read",
    "fa": "خوانده‌شده"
  },
  "Lernpfad schließen": {
    "en": "Close learning path",
    "fa": "بستن مسیر یادگیری"
  },
  "Arrhythmogene Kardiomyopathie": {
    "en": "Arrhythmogenic cardiomyopathy",
    "fa": "کاردیومیوپاتی آریتموژنیک"
  },

  "Take Home Message": {
    "en": "Take Home Message",
    "fa": "پیام نهایی"
  },
  "MCQ starten": {
    "en": "Start MCQ",
    "fa": "شروع سؤال چندگزینه‌ای"
  },
  "Gelesene Kapitel": {
    "en": "Chapters read",
    "fa": "فصل‌های خوانده‌شده"
  },
  "Lektion fortsetzen": {
    "en": "Continue lesson",
    "fa": "ادامهٔ درس"
  },
  "Weiter": {
    "en": "Continue",
    "fa": "ادامه"
  },
  "Alles gelesen": {
    "en": "All read",
    "fa": "همه خوانده‌شده‌اند"
  },
  "Alles als gelesen": {
    "en": "Mark all as read",
    "fa": "علامت‌گذاری همه به‌عنوان خوانده‌شده"
  },
  "Auf diesem Gerät gespeichert. Zum Synchronisieren des Lesefortschritts bitte anmelden.": {
    "en": "Saved on this device. Sign in to synchronise reading progress.",
    "fa": "روی این دستگاه ذخیره شد. برای همگام‌سازی پیشرفت مطالعه وارد حساب شوید."
  },
  "Quellen & Bildnachweise": {
    "en": "Sources & image credits",
    "fa": "منابع و مشخصات تصاویر"
  },
  "Deutsche Fassung · MRT-orientierter Überblick.": {
    "en": "Translated version · MRI-focused overview.",
    "fa": "نسخهٔ ترجمه‌شده · مرور متمرکز بر MRI."
  },
  "Radiopaedia-Originalfälle": {
    "en": "Original Radiopaedia cases",
    "fa": "کیس‌های اصلی Radiopaedia"
  },
  "Die MRT-Bilder und das Cine sind Originalaufnahmen. Einblendbare Orientierungspunkte von RadYar liegen separat über den unveränderten Bildern.": {
    "en": "The MRI images and cine are original acquisitions. Optional RadYar orientation markers lie separately over the unchanged images.",
    "fa": "تصاویر MRI و Cine، تصاویر اصلی هستند. نشانگرهای اختیاری جهت‌یابی رادیار به‌صورت جداگانه روی تصاویر بدون تغییر قرار می‌گیرند."
  },
  "Das Video kann nicht wiedergegeben werden.": {
    "en": "The video cannot be played.",
    "fa": "ویدئو قابل پخش نیست."
  },
  "Originalserie öffnen": {
    "en": "Open original series",
    "fa": "باز کردن سری اصلی"
  },
  "Vergrößern": {
    "en": "Enlarge",
    "fa": "بزرگ‌نمایی"
  },
  "Cine pausieren": {
    "en": "Pause cine",
    "fa": "توقف Cine"
  },
  "Cine abspielen": {
    "en": "Play cine",
    "fa": "پخش Cine"
  },
  "Cine in der Originalserie öffnen": {
    "en": "Open cine in original series",
    "fa": "باز کردن Cine در سری اصلی"
  },
  "Case courtesy of": {
    "en": "Case courtesy of",
    "fa": "کیس از"
  },
  ". Originalaufnahmen unverändert.": {
    "en": ". Original images unchanged.",
    "fa": ". تصاویر اصلی بدون تغییر هستند."
  },
  ". Standbilder zeigen keine Wandbewegung; dafür die Cine-Serie ansehen.": {
    "en": ". Still images do not show wall motion; view the cine series for that.",
    "fa": ". تصاویر ثابت حرکت دیواره را نشان نمی‌دهند؛ برای آن سری Cine را ببینید."
  },
  "Schließen ×": {
    "en": "Close ×",
    "fa": "بستن ×"
  },
  "Optional zum Anschauen: fünf originale MRT-Fälle mit verschiedenen Ansichten. Fall auswählen und bei Bedarf die vollständige Serie auf Radiopaedia öffnen.": {
    "en": "Optional viewing: five original MRI cases with different views. Select a case and open the complete Radiopaedia series when needed.",
    "fa": "مشاهدهٔ اختیاری: پنج کیس اصلی MRI با نماهای گوناگون. کیس را انتخاب کنید و در صورت نیاز سری کامل را در Radiopaedia باز کنید."
  },
  "Radiopaedia-Lehrfälle": {
    "en": "Radiopaedia teaching cases",
    "fa": "کیس‌های آموزشی Radiopaedia"
  },
  "Ein Beispiel verstehen": {
    "en": "Understand an example",
    "fa": "شناخت یک مثال"
  },
  "Task Force Criteria von 2010": {
    "en": "2010 Task Force Criteria",
    "fa": "معیارهای Task Force سال ۲۰۱۰"
  },
  "ordnen Hinweise aus verschiedenen Untersuchungen zur klassischen rechtsbetonten ARVC. Ein Major-Kriterium ist stärker, ein Minor-Kriterium schwächer gewichtet. Das ist diagnostisches Gewicht und nicht automatisch ein Maß für die Krankheitsschwere.": {
    "en": "combine evidence from different examinations for classic right-dominant ARVC. A major criterion has greater diagnostic weight than a minor criterion. This is diagnostic weight, not automatically a measure of disease severity.",
    "fa": "شواهد بررسی‌های گوناگون را برای ARVC کلاسیکِ غالب در راست کنار هم می‌گذارند. معیار اصلی وزن تشخیصی بیشتری از معیار فرعی دارد. این وزن تشخیصی است و به‌طور خودکار معیاری برای شدت بیماری نیست."
  },
  "Der MRT-Baustein: regional UND global": {
    "en": "The MRI component: regional AND global",
    "fa": "جزء MRI: ناحیه‌ای و کلی با هم"
  },
  "Eine regionale RV-Akinesie, Dyskinesie oder dyssynchrone Kontraktion muss mit einem erhöhten RVEDVi oder einer verminderten RVEF zusammenkommen. Ein großer RV allein genügt nicht; eine isolierte Hypokinesie auch nicht.": {
    "en": "Regional RV akinesia, dyskinesia or dyssynchronous contraction must occur together with increased RVEDVi or reduced RVEF. An enlarged RV alone is insufficient; isolated hypokinesia is also insufficient.",
    "fa": "آکینزی، دیسکینزی یا انقباض ناهماهنگ ناحیه‌ای RV باید همراه افزایش RVEDVi یا کاهش RVEF باشد. RV بزرگ به‌تنهایی کافی نیست؛ هیپوکینزی منفرد نیز کافی نیست."
  },
  "Messgröße": {
    "en": "Measurement",
    "fa": "کمیت اندازه‌گیری"
  },
  "RVEDVi · Männer": {
    "en": "RVEDVi · men",
    "fa": "RVEDVi · مردان"
  },
  "≥ 100 bis < 110 ml/m²": {
    "en": "≥ 100 to < 110 mL/m²",
    "fa": "≥ 100 تا < 110 mL/m²"
  },
  "RVEDVi · Frauen": {
    "en": "RVEDVi · women",
    "fa": "RVEDVi · زنان"
  },
  "≥ 90 bis < 100 ml/m²": {
    "en": "≥ 90 to < 100 mL/m²",
    "fa": "≥ 90 تا < 100 mL/m²"
  },
  "RVEF · beide": {
    "en": "RVEF · both sexes",
    "fa": "RVEF · هر دو جنس"
  },
  "> 40 bis ≤ 45 %": {
    "en": "> 40 to ≤ 45%",
    "fa": "> 40 تا ≤ 45٪"
  },
  "Nur zusammen mit der geforderten regionalen Störung. RVEDVi = enddiastolisches RV-Volumen / Körperoberfläche; EF = ausgeworfener Volumenanteil. Bei Kindern und Sportlern die Referenzen gesondert prüfen.": {
    "en": "Only together with the required regional abnormality. RVEDVi = end-diastolic RV volume / body surface area; EF = the fraction of volume ejected. Check references separately for children and athletes.",
    "fa": "فقط همراه اختلال ناحیه‌ای لازم. RVEDVi برابر حجم پایان‌دیاستولی RV تقسیم بر سطح بدن است؛ EF سهم حجم خارج‌شده است. مقادیر مرجع را در کودکان و ورزشکاران جداگانه بررسی کنید."
  },
  "Nicht doppelt zählen:": {
    "en": "Do not count twice:",
    "fa": "دوبار نشمارید:"
  },
  "Erhöhtes RV-Volumen und reduzierte RVEF sind zwei Wege zum selben MRT-Kriterium dieser Kategorie. Ein bildgebendes Major-Kriterium allein ist noch keine gesicherte Gesamtdiagnose. Die übrigen Diagnosebereiche, etwa EKG, Rhythmus und Familie, müssen dazukommen.": {
    "en": "Increased RV volume and reduced RVEF are two routes to the same MRI criterion in this category. One major imaging criterion alone does not establish the overall diagnosis. Other diagnostic domains, such as ECG, rhythm and family history, must be added.",
    "fa": "افزایش حجم RV و کاهش RVEF دو مسیر برای رسیدن به همان معیار MRI در این دسته هستند. یک معیار اصلی تصویربرداری به‌تنهایی تشخیص کلی را قطعی نمی‌کند. سایر حوزه‌های تشخیصی، مانند ECG، ریتم و سابقهٔ خانوادگی نیز باید اضافه شوند."
  },
  "Die Grenze dieses Systems": {
    "en": "The limits of this system",
    "fa": "محدودیت‌های این نظام"
  },
  "erweitern den Blick: Welche Kammer ist betroffen, wie funktioniert sie und wo liegt eine Narbe? Dafür werden LV-Kriterien und die Gewebeinformation aus dem LGE aufgenommen. Die Einordnung berücksichtigt weiterhin auch EKG, Rhythmusdiagnostik und Familie / Genetik.": {
    "en": "broaden the assessment: which ventricle is involved, how does it function and where is a scar? LV criteria and tissue information from LGE are included. Interpretation still also considers ECG, rhythm assessment and family history / genetics.",
    "fa": "دامنهٔ ارزیابی را گسترش می‌دهند: کدام بطن درگیر است، چگونه کار می‌کند و اسکار کجاست؟ معیارهای LV و اطلاعات بافتی LGE وارد ارزیابی می‌شوند. در تفسیر همچنان ECG، بررسی ریتم و سابقهٔ خانوادگی / ژنتیک نیز در نظر گرفته می‌شوند."
  },
  "Worauf achten?": {
    "en": "What should you assess?",
    "fa": "چه چیزی را ارزیابی کنید؟"
  },
  "Rechte Kammer": {
    "en": "Right ventricle",
    "fa": "بطن راست"
  },
  "Regionale Bewegungsstörung, globale Größe und Funktion beurteilen. Auch ein sicher nachgewiesenes transmural streifenförmiges RV-LGE kann ein strukturelles Kriterium sein.": {
    "en": "Assess regional motion abnormalities, global size and function. Definitely demonstrated transmural stria-pattern RV LGE may also constitute a structural criterion.",
    "fa": "اختلال حرکت ناحیه‌ای، اندازه و عملکرد کلی را ارزیابی کنید. LGE نواری تمام‌ضخامت RV که به‌طور قطعی نشان داده شده باشد نیز می‌تواند معیار ساختاری باشد."
  },
  "Linke Kammer": {
    "en": "Left ventricle",
    "fa": "بطن چپ"
  },
  "Pumpfunktion und regionale Bewegung prüfen; zusätzlich nach subepikardialem oder intramuralem Streifen-LGE suchen.": {
    "en": "Assess pump function and regional motion; also look for subepicardial or intramural stria-pattern LGE.",
    "fa": "عملکرد سیستولی و حرکت ناحیه‌ای را بررسی کنید؛ LGE نواری ساب‌اپی‌کاردیال یا داخل‌جداری را نیز جست‌وجو کنید."
  },
  "LGE absichern": {
    "en": "Confirm LGE",
    "fa": "تأیید LGE"
  },
  "Ein passendes Narbenmuster in zwei orthogonalen Ebenen bestätigen. Isoliertes LGE an den septalen RV-Insertionspunkten zählt nicht als LV-LGE-Kriterium.": {
    "en": "Confirm a compatible scar pattern in two orthogonal planes. Isolated LGE at the septal RV insertion points does not count as an LV LGE criterion.",
    "fa": "الگوی اسکار سازگار را در دو صفحهٔ عمود بر هم تأیید کنید. LGE منفرد در نقاط اتصال سپتالی RV، معیار LGE بطن چپ محسوب نمی‌شود."
  },
  "Strukturelle Grundlage": {
    "en": "Structural basis",
    "fa": "پایهٔ ساختاری"
  },
  "Mindestens ein morphofunktionelles oder strukturelles Kriterium muss erfüllt sein. Für Volumen und Funktion geeignete Referenzwerte verwenden.": {
    "en": "At least one morphofunctional or structural criterion must be met. Use appropriate reference values for volumes and function.",
    "fa": "حداقل یک معیار مورفوفانکشنال یا ساختاری باید برقرار باشد. برای حجم و عملکرد از مقادیر مرجع مناسب استفاده کنید."
  },
  "RV, LV oder beide?": {
    "en": "RV, LV or both?",
    "fa": "RV، LV یا هر دو؟"
  },
  "Das Cine aus dem MRT-Kapitel gehört zu einem": {
    "en": "The cine in the imaging chapter belongs to a",
    "fa": "Cine فصل تصاویر مربوط است به یک"
  },
  "50-jährigen Mann mit bekannter ARVC": {
    "en": "50-year-old man with known ARVC",
    "fa": "مرد ۵۰ ساله با ARVC شناخته‌شده"
  },
  ", untersucht nach einer RVOT-Ablation. Die Originalbeschreibung nennt dyskinetische, aneurysmatische RV-Ausbuchtungen, einen RVEDVi von": {
    "en": ", examined after RVOT ablation. The original report describes dyskinetic, aneurysmal RV bulges, an RVEDVi of",
    "fa": "است که پس از ابلیشن RVOT بررسی شده است. گزارش اصلی برآمدگی‌های آنوریسمی و دیسکینتیک RV، مقدار RVEDVi برابر با"
  },
  "und eine RVEF von": {
    "en": "and an RVEF of",
    "fa": "و RVEF برابر با"
  },
  "Die beschriebene Dyskinesie erfüllt den geforderten regionalen Teil.": {
    "en": "The reported dyskinesia fulfils the required regional component.",
    "fa": "دیسکینزی گزارش‌شده، جزء ناحیه‌ای لازم را برآورده می‌کند."
  },
  "115 ml/m² liegt beim Mann über der Major-Grenze für das RVEDVi. Die RVEF von 41 % liegt dagegen im Minor-Bereich.": {
    "en": "In a man, 115 mL/m² exceeds the major RVEDVi threshold. The RVEF of 41%, however, is in the minor range.",
    "fa": "در مردان، مقدار 115 mL/m² بالاتر از آستانهٔ معیار اصلی RVEDVi است. در مقابل، RVEF برابر 41٪ در محدودهٔ معیار فرعی قرار می‌گیرد."
  },
  "Zusammenführen:": {
    "en": "Combine the findings:",
    "fa": "یافته‌ها را کنار هم بگذارید:"
  },
  "Das ergibt einen Major-MRT-Baustein aus dieser Kategorie. Volumen und EF werden nicht als zwei getrennte Kriterien addiert.": {
    "en": "This yields one major MRI component in this category. Volume and EF are not added as two separate criteria.",
    "fa": "حاصل، یک جزء ماژور MRI از این دسته است. حجم و EF به‌عنوان دو معیار جداگانه با هم جمع نمی‌شوند."
  },
  "Warum der Zusammenhang wichtig ist": {
    "en": "Why context matters",
    "fa": "چرا زمینه اهمیت دارد"
  },
  "Zahlen und Bewegungsbefund aus dem Originalfall von Tim Luijkx:": {
    "en": "Measurements and motion findings from the original case by Tim Luijkx:",
    "fa": "اندازه‌گیری‌ها و یافتهٔ حرکتی از کیس اصلی Tim Luijkx:"
  },
  ". Dies erklärt die Kriterien anhand einer bereits diagnostizierten Erkrankung.": {
    "en": ". This illustrates the criteria using a disease already diagnosed.",
    "fa": ". این مثال معیارها را بر اساس بیماری از پیش تشخیص‌داده‌شده توضیح می‌دهد."
  },
  "Kein einzelnes MRT-Zeichen beweist eine ACM.": {
    "en": "No single MRI sign proves ACM.",
    "fa": "هیچ علامت منفرد MRI، ACM را ثابت نمی‌کند."
  },
  "ACM verstehen": {
    "en": "Understand ACM",
    "fa": "شناخت ACM"
  },
  "Grundlagen": {
    "en": "Fundamentals",
    "fa": "مبانی"
  },
  "ACM verstehen: RV, LV oder beide?": {
    "en": "Understand ACM: RV, LV or both?",
    "fa": "شناخت ACM: RV، LV یا هر دو؟"
  },
  "MRT systematisch lesen": {
    "en": "Read MRI systematically",
    "fa": "خواندن نظام‌مند MRI"
  },
  "MRT: Bewegung, Funktion und Gewebe": {
    "en": "MRI: motion, function and tissue",
    "fa": "MRI: حرکت، عملکرد و بافت"
  },
  "Typische MRT-Befunde": {
    "en": "Typical MRI findings",
    "fa": "یافته‌های معمول MRI"
  },
  "Typische Befunde an echten MRTs": {
    "en": "Typical findings on actual MRI",
    "fa": "یافته‌های معمول در MRI واقعی"
  },
  "Wichtige Fallstricke": {
    "en": "Important pitfalls",
    "fa": "دام‌های مهم"
  },
  "Was eine ACM imitieren kann": {
    "en": "What can mimic ACM",
    "fa": "چه چیزی می‌تواند شبیه ACM باشد"
  },
  "Weitere MRTs · optional": {
    "en": "More MRI cases · optional",
    "fa": "MRIهای بیشتر · اختیاری"
  },
  "Weitere MRT-Beispiele · optional": {
    "en": "More MRI examples · optional",
    "fa": "نمونه‌های بیشتر MRI · اختیاری"
  },
  "Originalarbeit: revidierte Task-Force-Kriterien": {
    "en": "Original paper: revised Task Force Criteria",
    "fa": "مقالهٔ اصلی: معیارهای بازنگری‌شدهٔ Task Force"
  },
  "Entwicklung und Anwendung der Diagnosekriterien": {
    "en": "Development and application of diagnostic criteria",
    "fa": "تدوین و کاربرد معیارهای تشخیصی"
  },
  "Standardisierte Kardio-MRT-Protokolle": {
    "en": "Standardised cardiac MRI protocols",
    "fa": "پروتکل‌های استاندارد MRI قلب"
  },
  "Aktueller Bildgebungsüberblick: RV, LV und Fallstricke": {
    "en": "Current imaging overview: RV, LV and pitfalls",
    "fa": "مرور کنونی تصویربرداری: RV، LV و دام‌ها"
  },
  "Bildquelle: Anatomie-MRT-Korrelationen mit Radiopaedia-Fällen": {
    "en": "Image source: anatomy–MRI correlations with Radiopaedia cases",
    "fa": "منبع تصاویر: تطبیق آناتومی و MRI همراه کیس‌های Radiopaedia"
  },
  "Originalstudie zur prognostischen Bedeutung der LV-Beteiligung": {
    "en": "Original study on the prognostic importance of LV involvement",
    "fa": "مطالعهٔ اصلی دربارهٔ اهمیت پیش‌آگهی درگیری LV"
  },
  "Großer RV, auffällige Bewegung, kein LGE": {
    "en": "Enlarged RV, abnormal motion, no LGE",
    "fa": "RV بزرگ، حرکت غیرطبیعی، بدون LGE"
  },
  "35 Jahre · Mann": {
    "en": "35 years · man",
    "fa": "۳۵ سال · مرد"
  },
  "Diagnose im Originalfall: sicher": {
    "en": "Original case diagnosis: definite",
    "fa": "تشخیص در کیس اصلی: قطعی"
  },
  "Länger bestehende Dyspnoe und eingeschränkte Belastbarkeit; im EKG ein Schenkelblock.": {
    "en": "Long-standing dyspnoea and reduced exercise tolerance; bundle branch block on ECG.",
    "fa": "تنگی نفس طولانی‌مدت و کاهش تحمل فعالیت؛ بلوک شاخه‌ای در ECG."
  },
  "Axial Cine · segmented 4 CH · Standbild": {
    "en": "Axial cine · segmented 4 CH · still image",
    "fa": "Cine محوری · segmented 4 CH · تصویر ثابت"
  },
  "Vierkammer-Cine-Standbild bei ausgeprägter RV-Vergrößerung, Radiopaedia 57972.": {
    "en": "Four-chamber cine still image with marked RV enlargement, Radiopaedia 57972.",
    "fa": "تصویر ثابت Cine چهارحفره‌ای با بزرگ‌شدگی شدید RV، از Radiopaedia 57972."
  },
  "Cine RVOT · SSFP · Standbild": {
    "en": "RVOT cine · SSFP · still image",
    "fa": "Cine مسیر خروجی RV · SSFP · تصویر ثابت"
  },
  "RVOT-Cine-Standbild aus Radiopaedia-Fall 57972.": {
    "en": "RVOT cine still image from Radiopaedia case 57972.",
    "fa": "تصویر ثابت Cine مسیر خروجی RV از کیس Radiopaedia 57972."
  },
  "Weitere Cine-Ebene": {
    "en": "Additional cine plane",
    "fa": "نمای تکمیلی Cine"
  },
  "CINE R2 · SSFP · Standbild": {
    "en": "CINE R2 · SSFP · still image",
    "fa": "CINE R2 · SSFP · تصویر ثابت"
  },
  "Zusätzliche SSFP-Cine-Ebene aus Radiopaedia-Fall 57972.": {
    "en": "Additional SSFP cine plane from Radiopaedia case 57972.",
    "fa": "نمای تکمیلی SSFP Cine از کیس Radiopaedia 57972."
  },
  "SAX · Phase sensitive IR · Standbild": {
    "en": "SAX · phase-sensitive IR · still image",
    "fa": "SAX · phase-sensitive IR · تصویر ثابت"
  },
  "PSIR-Standbild der kurzen Achse aus Radiopaedia-Fall 57972.": {
    "en": "Short-axis PSIR still image from Radiopaedia case 57972.",
    "fa": "تصویر ثابت PSIR محور کوتاه از کیس Radiopaedia 57972."
  },
  "Zuerst Kammergrößen vergleichen, dann die freie RV-Wand im vollständigen Cine verfolgen. Der Originalfall beschreibt Dyskinesien / paradoxe Bewegung am Übergang RVOT–Apex und kein auffälliges LGE.": {
    "en": "Compare ventricular sizes first, then follow the free RV wall through the full cine. The original case describes dyskinesia / paradoxical motion at the RVOT–apex transition and no abnormal LGE.",
    "fa": "ابتدا اندازهٔ بطن‌ها را مقایسه کنید، سپس دیوارهٔ آزاد RV را در Cine کامل دنبال کنید. کیس اصلی، دیسکینزی / حرکت پارادوکس در محل گذار RVOT به اپکس و نبود LGE غیرطبیعی را توصیف می‌کند."
  },
  "Die vier lokalen Aufnahmen sind Standbilder. Die regionale Bewegung ist im Original-Cine zu prüfen; die 4-Kammer-Serie ist laut Quelle durch Arrhythmie beeinträchtigt.": {
    "en": "The four local images are still frames. Check regional motion in the original cine; the source reports arrhythmia-related degradation of the four-chamber series.",
    "fa": "چهار تصویر محلی ثابت هستند. حرکت ناحیه‌ای را باید در Cine اصلی بررسی کرد؛ طبق منبع، سری چهارحفره‌ای تحت تأثیر آریتمی قرار گرفته است."
  },
  "Der LV gehört zur Diagnose dazu": {
    "en": "The LV is part of the diagnosis too",
    "fa": "LV نیز بخشی از تشخیص است"
  },
  "30 Jahre · Mann": {
    "en": "30 years · man",
    "fa": "۳۰ سال · مرد"
  },
  "Diagnose im Originalfall: sehr wahrscheinlich": {
    "en": "Original case diagnosis: highly probable",
    "fa": "تشخیص در کیس اصلی: بسیار محتمل"
  },
  "Palpitationen, eine Synkope und auffälliges EKG.": {
    "en": "Palpitations, syncope and an abnormal ECG.",
    "fa": "تپش قلب، سنکوپ و ECG غیرطبیعی."
  },
  "LGE · 4-Kammer": {
    "en": "LGE · four-chamber",
    "fa": "LGE · چهارحفره‌ای"
  },
  "4CH · PSIR · Standbild": {
    "en": "4CH · PSIR · still image",
    "fa": "4CH · PSIR · تصویر ثابت"
  },
  "PSIR im Vierkammerblick bei biventrikulärer Beteiligung, Radiopaedia 194915.": {
    "en": "Four-chamber PSIR with biventricular involvement, Radiopaedia 194915.",
    "fa": "PSIR چهارحفره‌ای با درگیری دو‌بطنی، از Radiopaedia 194915."
  },
  "LGE · kurze Achse": {
    "en": "LGE · short axis",
    "fa": "LGE · محور کوتاه"
  },
  "Short axis · PSIR · Standbild": {
    "en": "Short axis · PSIR · still image",
    "fa": "محور کوتاه · PSIR · تصویر ثابت"
  },
  "PSIR in kurzer Achse bei biventrikulärer Beteiligung, Radiopaedia 194915.": {
    "en": "Short-axis PSIR with biventricular involvement, Radiopaedia 194915.",
    "fa": "PSIR محور کوتاه با درگیری دو‌بطنی، از Radiopaedia 194915."
  },
  "Short axis · T1 blackblood · Standbild": {
    "en": "Short axis · T1 black-blood · still image",
    "fa": "محور کوتاه · T1 black-blood · تصویر ثابت"
  },
  "T1-Black-Blood-Aufnahme in kurzer Achse bei ACM, Radiopaedia 194915.": {
    "en": "Short-axis T1 black-blood image in ACM, Radiopaedia 194915.",
    "fa": "تصویر T1 black-blood محور کوتاه در ACM، از Radiopaedia 194915."
  },
  "Der Originalfall beschreibt einen dilatierten RV mit dünner, welliger Wand, regionaler Ausbuchtung und LGE. Zusätzlich bestehen Gewebeveränderungen und LGE in anterolateralen / inferolateralen LV-Segmenten.": {
    "en": "The original case describes a dilated RV with a thin, wavy wall, regional bulging and LGE. Tissue changes and LGE also involve anterolateral / inferolateral LV segments.",
    "fa": "کیس اصلی RV متسع با دیوارهٔ نازک و موج‌دار، برآمدگی ناحیه‌ای و LGE را توصیف می‌کند. افزون بر آن، تغییرات بافتی و LGE در سگمان‌های قدامی‌جانبی / تحتانی‌جانبی LV وجود دارد."
  },
  "Eine relativ erhaltene LVEF schließt LV-Beteiligung nicht aus. Cine und PSIR liefern unterschiedliche, sich ergänzende Informationen.": {
    "en": "Relatively preserved LVEF does not exclude LV involvement. Cine and PSIR provide different, complementary information.",
    "fa": "LVEF نسبتاً حفظ‌شده، درگیری LV را رد نمی‌کند. Cine و PSIR اطلاعات متفاوت و مکملی فراهم می‌کنند."
  },
  "Das nichtischämische LGE-Muster unterstützt die Einordnung; die vollständigen Serien und die übrigen Diagnosebereiche bleiben erforderlich.": {
    "en": "The non-ischaemic LGE pattern supports interpretation; complete series and the other diagnostic domains remain necessary.",
    "fa": "الگوی غیرایسکمیک LGE از تفسیر پشتیبانی می‌کند؛ سری‌های کامل و سایر حوزه‌های تشخیصی همچنان لازم‌اند."
  },
  "Cine in Bewegung": {
    "en": "Cine in motion",
    "fa": "Cine در حرکت"
  },
  "Dyskinesie im echten Cine verfolgen": {
    "en": "Follow dyskinesia on actual cine",
    "fa": "دیسکینزی را در Cine واقعی دنبال کنید"
  },
  "50 Jahre · Mann": {
    "en": "50 years · man",
    "fa": "۵۰ سال · مرد"
  },
  "Bekannte ARVC nach VT-Ablation am RVOT. Untersuchung von Bewegung und Pumpfunktion.": {
    "en": "Known ARVC after VT ablation at the RVOT. Assessment of motion and pump function.",
    "fa": "ARVC شناخته‌شده پس از ابلیشن VT در RVOT. بررسی حرکت و عملکرد سیستولی."
  },
  "4-Kammer-Cine · Video": {
    "en": "Four-chamber cine · video",
    "fa": "Cine چهارحفره‌ای · ویدئو"
  },
  "4 chamber · cine video · Originalschleife": {
    "en": "4 chamber · cine video · original loop",
    "fa": "چهارحفره‌ای · ویدئوی Cine · حلقهٔ اصلی"
  },
  "Echtes Vierkammer-Cine mit rechtsventrikulären Wandbewegungsstörungen.": {
    "en": "Actual four-chamber cine with right ventricular wall-motion abnormalities.",
    "fa": "Cine واقعی چهارحفره‌ای با اختلال حرکت دیوارهٔ بطن راست."
  },
  "Video starten und die freie RV-Wand sowie den Apex über Systole und Diastole verfolgen. Der Originalfall beschreibt ausgeprägte dyskinetische, aneurysmatische Ausbuchtungen bei normaler LV-Wandbewegung.": {
    "en": "Start the video and follow the free RV wall and apex throughout systole and diastole. The original case describes marked dyskinetic, aneurysmal bulges with normal LV wall motion.",
    "fa": "ویدئو را پخش کنید و دیوارهٔ آزاد RV و اپکس را در سیستول و دیاستول دنبال کنید. کیس اصلی برآمدگی‌های آنوریسمی و دیسکینتیک شدید را همراه حرکت طبیعی دیوارهٔ LV توصیف می‌کند."
  },
  "Die Bewegungsinformation entsteht erst über den Herzzyklus. Die reduzierte RVEF und das vergrößerte indexierte RV-Volumen werden damit gemeinsam eingeordnet.": {
    "en": "Motion information emerges only over the cardiac cycle. Reduced RVEF and increased indexed RV volume are interpreted together with it.",
    "fa": "اطلاعات حرکتی تنها در طول چرخهٔ قلب به دست می‌آید. کاهش RVEF و افزایش حجم ایندکس‌شدهٔ RV با این اطلاعات کنار هم تفسیر می‌شوند."
  },
  "Wichtig beim LGE der vollständigen Untersuchung: Eine frühere Ablation kann selbst Narben erzeugen. Nicht jedes Enhancement ist allein der ACM zuzuschreiben.": {
    "en": "Important when assessing LGE in the complete examination: prior ablation can itself cause scars. Not all enhancement is attributable to ACM alone.",
    "fa": "نکتهٔ مهم در ارزیابی LGE بررسی کامل: ابلیشن قبلی خود می‌تواند اسکار ایجاد کند. هر افزایش سیگنال پس از تزریق را نمی‌توان صرفاً به ACM نسبت داد."
  },
  "Schwere RV-Dysfunktion": {
    "en": "Severe RV dysfunction",
    "fa": "اختلال شدید عملکرد RV"
  },
  "Morphologie, Funktion und Vorgeschichte verbinden": {
    "en": "Combine morphology, function and history",
    "fa": "مورفولوژی، عملکرد و سابقه را کنار هم بگذارید"
  },
  "14 Jahre · Mädchen": {
    "en": "14 years · girl",
    "fa": "۱۴ سال · دختر"
  },
  "Arrhythmien, Dyspnoe und Belastungsintoleranz; plötzlicher Herztod in der Familie. Trikuspidalklappenrekonstruktion im Säuglingsalter.": {
    "en": "Arrhythmias, dyspnoea and exercise intolerance; family history of sudden cardiac death. Tricuspid valve reconstruction in infancy.",
    "fa": "آریتمی، تنگی نفس و عدم تحمل فعالیت؛ سابقهٔ مرگ ناگهانی قلبی در خانواده. بازسازی دریچهٔ تریکوسپید در شیرخوارگی."
  },
  "Cine · 4-Kammer": {
    "en": "Cine · four-chamber",
    "fa": "Cine · چهارحفره‌ای"
  },
  "4ch Cine · SSFP · Standbild": {
    "en": "4ch cine · SSFP · still image",
    "fa": "Cine چهارحفره‌ای · SSFP · تصویر ثابت"
  },
  "Vierkammer-Cine-Standbild mit ausgeprägter RV-Dilatation im Fall 87505.": {
    "en": "Four-chamber cine still image showing marked RV dilatation in case 87505.",
    "fa": "تصویر ثابت Cine چهارحفره‌ای با اتساع شدید RV در کیس 87505."
  },
  "4ch · IRGRE · Standbild": {
    "en": "4ch · IRGRE · still image",
    "fa": "چهارحفره‌ای · IRGRE · تصویر ثابت"
  },
  "IRGRE-LGE im Vierkammerblick des pädiatrischen ARVC-Falls 87505.": {
    "en": "Four-chamber IRGRE LGE in paediatric ARVC case 87505.",
    "fa": "IRGRE LGE چهارحفره‌ای در کیس ARVC کودکان با شناسهٔ 87505."
  },
  "Cine · LV-Längsachse": {
    "en": "Cine · LV long axis",
    "fa": "Cine · محور طولی LV"
  },
  "2ch (LV) · Cine SSFP · Standbild": {
    "en": "2ch (LV) · cine SSFP · still image",
    "fa": "دوحفره‌ای (LV) · Cine SSFP · تصویر ثابت"
  },
  "Cine-SSFP-Standbild aus dem pädiatrischen ARVC-Fall 87505.": {
    "en": "Cine SSFP still image from paediatric ARVC case 87505.",
    "fa": "تصویر ثابت Cine SSFP از کیس ARVC کودکان با شناسهٔ 87505."
  },
  "Die Originaluntersuchung zeigt eine schwere RV-Dilatation, regionale A-/Dyskinesien und RV-LGE. Zuerst im Vierkammerblick die vergrößerte rechte Kammer verfolgen, dann Cine und LGE vergleichen. Die LV-Längsachse ist eine ergänzende Ebene.": {
    "en": "The original examination shows severe RV dilatation, regional akinesia/dyskinesia and RV LGE. Follow the enlarged right ventricle in the four-chamber view first, then compare cine and LGE. The LV long axis is an additional plane.",
    "fa": "بررسی اصلی، اتساع شدید RV، آکینزی/دیسکینزی ناحیه‌ای و LGE در RV را نشان می‌دهد. ابتدا بطن راست بزرگ را در نمای چهارحفره‌ای دنبال و سپس Cine و LGE را مقایسه کنید. محور طولی LV نمای تکمیلی است."
  },
  "Starke Funktionsstörung, regionale Veränderungen und Familienanamnese zusammen betrachten. Die Voroperation hilft, lokale Artefakte zu erklären.": {
    "en": "Consider severe dysfunction, regional changes and family history together. Prior surgery helps explain local artefacts.",
    "fa": "اختلال شدید عملکرد، تغییرات ناحیه‌ای و سابقهٔ خانوادگی را با هم در نظر بگیرید. جراحی قبلی به توضیح آرتیفکت‌های موضعی کمک می‌کند."
  },
  "RV-Kontur im Kindesalter": {
    "en": "RV contour in childhood",
    "fa": "کانتور RV در کودکی"
  },
  "Die freie RV-Wand systematisch verfolgen": {
    "en": "Follow the free RV wall systematically",
    "fa": "دیوارهٔ آزاد RV را نظام‌مند دنبال کنید"
  },
  "10 Jahre · Junge": {
    "en": "10 years · boy",
    "fa": "۱۰ سال · پسر"
  },
  "Publizierter ARVC-Lehrfall": {
    "en": "Published ARVC teaching case",
    "fa": "کیس آموزشی منتشرشدهٔ ARVC"
  },
  "Pädiatrisches MRT-Beispiel aus der publizierten Übersicht von Cainap et al.": {
    "en": "Paediatric MRI example from the published review by Cainap et al.",
    "fa": "نمونهٔ MRI کودکان از مرور منتشرشدهٔ Cainap و همکاران."
  },
  "Vierkammerblick · publiziertes MRT-Standbild": {
    "en": "Four-chamber view · published MRI still image",
    "fa": "نمای چهارحفره‌ای · تصویر ثابت منتشرشدهٔ MRI"
  },
  "Vierkammer-MRT eines zehnjährigen Jungen mit RV-Vergrößerung und auffälliger RV-Kontur.": {
    "en": "Four-chamber MRI of a ten-year-old boy with RV enlargement and an abnormal RV contour.",
    "fa": "MRI چهارحفره‌ای پسر ده‌ساله با بزرگ‌شدگی RV و کانتور غیرطبیعی RV."
  },
  "Vom Trikuspidalring über die freie RV-Wand bis zum Apex gehen. Die Veröffentlichung beschreibt RV-Vergrößerung, eine dünne Wand und Aneurysmabildung.": {
    "en": "Follow the wall from the tricuspid annulus along the free RV wall to the apex. The publication describes RV enlargement, a thin wall and aneurysm formation.",
    "fa": "از حلقهٔ تریکوسپید، دیوارهٔ آزاد RV را تا اپکس دنبال کنید. مقاله بزرگ‌شدگی RV، دیوارهٔ نازک و تشکیل آنوریسم را توصیف می‌کند."
  },
  "Eine auffällige Kontur ist ein Ausgangspunkt für die gezielte Cine-Prüfung in zwei Ebenen.": {
    "en": "An abnormal contour is a starting point for targeted cine assessment in two planes.",
    "fa": "کانتور غیرطبیعی نقطهٔ شروع ارزیابی هدفمند Cine در دو صفحه است."
  },
  "Die genaue Pulssequenz ist in der zugänglichen veröffentlichten Bildlegende nicht genannt. Keine EF oder Dyskinesie allein aus diesem Standbild ableiten. Abbildung aus Cainap et al., 2021, Abb. 9.": {
    "en": "The exact pulse sequence is not named in the accessible published caption. Do not infer EF or dyskinesia from this still image alone. Image from Cainap et al., 2021, Fig. 9.",
    "fa": "سکانس دقیق در شرح تصویر منتشرشدهٔ در دسترس نام برده نشده است. EF یا دیسکینزی را فقط از این تصویر ثابت نتیجه نگیرید. تصویر از Cainap و همکاران، ۲۰۲۱، شکل ۹."
  },
  "CT als Ergänzung": {
    "en": "CT as a complement",
    "fa": "CT به‌عنوان روش مکمل"
  },
  "Auch im Trauma-CT kann die ARVC auffallen": {
    "en": "ARVC may also be noticed on trauma CT",
    "fa": "ARVC ممکن است در CT تروما نیز دیده شود"
  },
  "45 Jahre · Mann": {
    "en": "45 years · man",
    "fa": "۴۵ سال · مرد"
  },
  "Trauma-CT bei bekannter ARVC; ein Zweikammer-ICD liegt bereits.": {
    "en": "Trauma CT in known ARVC; a dual-chamber ICD is already present.",
    "fa": "CT تروما در ARVC شناخته‌شده؛ ICD دوحفره‌ای از قبل وجود دارد."
  },
  "CT · axial": {
    "en": "CT · axial",
    "fa": "CT · محوری"
  },
  "Axial C+ · split bolus · CT-Standbild": {
    "en": "Axial C+ · split bolus · CT still image",
    "fa": "محوری با تزریق · split bolus · تصویر ثابت CT"
  },
  "Kontrastmittel-CT bei bekannter ARVC mit dilatiertem RV und ICD.": {
    "en": "Contrast-enhanced CT in known ARVC with a dilated RV and ICD.",
    "fa": "CT با تزریق در ARVC شناخته‌شده با RV متسع و ICD."
  },
  "Der Originalfall zeigt einen deutlich dilatierten RV mit verdünnter, fetthaltiger Wand. Den ICD als Hinweis auf die bekannte Rhythmuserkrankung einordnen.": {
    "en": "The original case shows a markedly dilated RV with a thin, fat-containing wall. Interpret the ICD as a clue to the known rhythm disorder.",
    "fa": "کیس اصلی RV به‌شدت متسع با دیوارهٔ نازک و حاوی چربی را نشان می‌دهد. ICD را سرنخی از اختلال ریتم شناخته‌شده بدانید."
  },
  "CT kann die Morphologie illustrieren. Die MRT-spezifischen Funktions- und Gewebekriterien lassen sich daraus nicht ersetzen.": {
    "en": "CT can illustrate morphology. It cannot replace the MRI-specific functional and tissue criteria.",
    "fa": "CT می‌تواند مورفولوژی را نشان دهد، اما جایگزین معیارهای عملکردی و بافتی اختصاصی MRI نمی‌شود."
  },
  "ACM ist mehr als eine Erkrankung des RV.": {
    "en": "ACM is more than an RV disease.",
    "fa": "ACM فراتر از بیماری RV است."
  },
  "ARVC bezeichnet die klassische rechtsbetonte Form. Auch der LV kann mitbetroffen sein oder im Vordergrund stehen; das ist für Diagnose und Prognose relevant.": {
    "en": "ARVC describes the classic right-dominant form. The LV may also be involved or predominate; this matters for diagnosis and prognosis.",
    "fa": "ARVC شکل کلاسیکِ غالب در راست را توصیف می‌کند. LV نیز ممکن است درگیر یا غالب باشد؛ این موضوع برای تشخیص و پیش‌آگهی مهم است."
  },
  "Bewegung, Funktion und Gewebe getrennt beurteilen.": {
    "en": "Assess motion, function and tissue separately.",
    "fa": "حرکت، عملکرد و بافت را جداگانه ارزیابی کنید."
  },
  "Cine zeigt regionale Bewegung, der vollständige Cine-Stapel liefert Volumen und EF, LGE zeigt das Narbenmuster. Immer beide Kammern prüfen.": {
    "en": "Cine shows regional motion, the complete cine stack provides volumes and EF, and LGE shows the scar pattern. Always assess both ventricles.",
    "fa": "Cine حرکت ناحیه‌ای را نشان می‌دهد، مجموعهٔ کامل Cine حجم‌ها و EF را فراهم می‌کند و LGE الگوی اسکار را نشان می‌دهد. همیشه هر دو بطن را بررسی کنید."
  },
  "Die geforderte regionale RV-Bewegungsstörung muss zusammen mit dem passenden RVEDVi- oder RVEF-Grenzwert vorliegen. Volumen und EF zählen in dieser Kategorie nicht doppelt.": {
    "en": "The required regional RV motion abnormality must occur together with the appropriate RVEDVi or RVEF threshold. Volume and EF are not counted twice in this category.",
    "fa": "اختلال حرکت ناحیه‌ای لازم در RV باید همراه آستانهٔ مناسب RVEDVi یا RVEF باشد. حجم و EF در این دسته دوبار شمرده نمی‌شوند."
  },
  "Die Kriterien erfassen auch biventrikuläre und linksdominante Formen. Bei rein linksdominantem Muster ist die passende Genetik ein wesentlicher Teil der Einordnung.": {
    "en": "The criteria also cover biventricular and left-dominant forms. For a purely left-dominant pattern, compatible genetics is an essential part of interpretation.",
    "fa": "معیارها شکل‌های دو‌بطنی و غالب در چپ را نیز در بر می‌گیرند. در الگوی صرفاً غالب در چپ، ژنتیک سازگار بخشی اساسی از تفسیر است."
  },
  "Ein Einzelzeichen stellt keine Diagnose.": {
    "en": "One sign does not establish a diagnosis.",
    "fa": "یک علامت، تشخیص را قطعی نمی‌کند."
  },
  "Sportherz, Belastung des RV, Myokarditis und Artefakte können überlappen. Fehlendes LGE schließt ARVC nicht aus; Fett oder LGE allein beweisen keine ACM.": {
    "en": "Athletic adaptation, RV loading, myocarditis and artefacts may overlap. Absence of LGE does not exclude ARVC; fat or LGE alone does not prove ACM.",
    "fa": "سازگاری ورزشی، اضافه‌بار RV، میوکاردیت و آرتیفکت‌ها ممکن است همپوشانی داشته باشند. نبود LGE، ARVC را رد نمی‌کند؛ چربی یا LGE به‌تنهایی ACM را ثابت نمی‌کند."
  },
  "Merke": {
    "en": "Remember",
    "fa": "به خاطر بسپارید"
  },
  "Wie bewegt sich die Wand?": {
    "en": "How does the wall move?",
    "fa": "دیواره چگونه حرکت می‌کند؟"
  },
  "Bewegte bSSFP-Aufnahmen im Vierkammerblick, in kurzen Achsen und in passenden RV-Ebenen.": {
    "en": "Moving bSSFP acquisitions in the four-chamber view, short axes and suitable RV planes.",
    "fa": "تصاویر متحرک bSSFP در نمای چهارحفره‌ای، محورهای کوتاه و صفحات مناسب RV."
  },
  "Freie RV-Wand und Herzspitze über den ganzen Herzzyklus verfolgen. Bewegt sich ein Abschnitt nicht oder paradox nach außen?": {
    "en": "Follow the free RV wall and apex throughout the cardiac cycle. Does a segment fail to move or move paradoxically outward?",
    "fa": "دیوارهٔ آزاد RV و اپکس را در کل چرخهٔ قلب دنبال کنید. آیا بخشی حرکت نمی‌کند یا به‌صورت پارادوکس به بیرون حرکت می‌کند؟"
  },
  "Ein Standbild zeigt keine Bewegung. Arrhythmie und Bewegung aus der Ebene können eine Störung vortäuschen.": {
    "en": "A still image does not show motion. Arrhythmia and through-plane motion may simulate an abnormality.",
    "fa": "تصویر ثابت حرکت را نشان نمی‌دهد. آریتمی و حرکت خارج از صفحه ممکن است اختلالی را تقلید کنند."
  },
  "Volumen & EF": {
    "en": "Volumes & EF",
    "fa": "حجم‌ها و EF"
  },
  "Wie groß, wie kräftig?": {
    "en": "How large, how strong?",
    "fa": "چه اندازه و با چه قدرتی؟"
  },
  "Vollständiger Cine-Stapel von der Herzbasis bis zur Spitze, mit enddiastolischen und endsystolischen Konturen.": {
    "en": "A complete cine stack from cardiac base to apex, with end-diastolic and end-systolic contours.",
    "fa": "مجموعهٔ کامل Cine از قاعدهٔ قلب تا اپکس، با ترسیم حدود در پایان دیاستول و پایان سیستول."
  },
  "RV und LV messen und vergleichen. EDVi bedeutet enddiastolisches Volumen bezogen auf die Körperoberfläche; EF ist der ausgeworfene Volumenanteil.": {
    "en": "Measure and compare RV and LV. EDVi means end-diastolic volume indexed to body surface area; EF is the fraction of volume ejected.",
    "fa": "RV و LV را اندازه‌گیری و مقایسه کنید. EDVi حجم پایان‌دیاستولی نسبت به سطح بدن است؛ EF سهم حجم خارج‌شده است."
  },
  "Die RV-Größe allein reicht nicht. Messung und Referenzwerte müssen zur Person passen; Kinder und Sportler gesondert einordnen.": {
    "en": "RV size alone is insufficient. Measurements and reference values must suit the individual; assess children and athletes separately.",
    "fa": "اندازهٔ RV به‌تنهایی کافی نیست. اندازه‌گیری و مقادیر مرجع باید متناسب با فرد باشند؛ کودکان و ورزشکاران را جداگانه ارزیابی کنید."
  },
  "Wo liegt eine Narbe?": {
    "en": "Where is a scar?",
    "fa": "اسکار کجاست؟"
  },
  "Aufnahmen nach Kontrastmittel, zum Beispiel mit Inversion Recovery oder PSIR, in kurzen und langen Achsen.": {
    "en": "Post-contrast acquisitions, for example inversion recovery or PSIR, in short and long axes.",
    "fa": "تصاویر پس از تزریق، برای مثال Inversion Recovery یا PSIR، در محورهای کوتاه و طولی."
  },
  "Anreicherung in der RV- und LV-Wand suchen. Beim LV sind subepikardiale oder intramurale Muster relevant; Ort und Verteilung beschreiben.": {
    "en": "Look for enhancement in RV and LV walls. Subepicardial or intramural LV patterns are relevant; describe location and distribution.",
    "fa": "تقویت پس از تزریق در دیوارهٔ RV و LV را جست‌وجو کنید. در LV الگوهای ساب‌اپی‌کاردیال یا داخل‌جداری اهمیت دارند؛ محل و توزیع را توصیف کنید."
  },
  "Die dünne RV-Wand ist schwierig zu beurteilen. Auffälligkeiten in einer zweiten Ebene bestätigen; nicht jede helle Stelle ist eine Narbe.": {
    "en": "The thin RV wall is difficult to assess. Confirm abnormalities in a second plane; not every bright focus is a scar.",
    "fa": "ارزیابی دیوارهٔ نازک RV دشوار است. یافتهٔ غیرطبیعی را در صفحهٔ دوم تأیید کنید؛ هر نقطهٔ روشن اسکار نیست."
  },
  "Welche Aufnahmen?": {
    "en": "Which acquisitions?",
    "fa": "کدام تصاویر؟"
  },
  "Häufiger Fehler": {
    "en": "Common pitfall",
    "fa": "دام شایع"
  },
  "T1-/T2-Mapping kann bei einer zusätzlichen Gewebefrage ergänzen. Für den ersten Überblick bleiben Cine, Kammerfunktion und LGE die drei Grundbausteine.": {
    "en": "T1/T2 mapping may complement an additional tissue question. For an initial overview, cine, ventricular function and LGE remain the three basic components.",
    "fa": "T1/T2 mapping می‌تواند برای پرسش بافتی تکمیلی مفید باشد. در مرور اولیه، Cine، عملکرد بطن و LGE همچنان سه جزء اصلی هستند."
  },
  "Bewegung · Cine": {
    "en": "Motion · cine",
    "fa": "حرکت · Cine"
  },
  "Narben · LGE": {
    "en": "Scars · LGE",
    "fa": "اسکارها · LGE"
  },
  "LGE · zweite Ebene": {
    "en": "LGE · second plane",
    "fa": "LGE · صفحهٔ دوم"
  },
  "Wandbewegung: die Begriffe auseinanderhalten": {
    "en": "Wall motion: distinguish the terms",
    "fa": "حرکت دیواره: اصطلاحات را تفکیک کنید"
  },
  "Einfach erklärt": {
    "en": "Simply explained",
    "fa": "توضیح ساده"
  },
  "Ein Wandabschnitt kontrahiert nicht. Im vollständigen Cine und in einer weiteren Ebene überprüfen.": {
    "en": "A wall segment does not contract. Confirm it in the complete cine and another plane.",
    "fa": "بخشی از دیواره منقبض نمی‌شود. آن را در Cine کامل و صفحهٔ دیگری بررسی کنید."
  },
  "Ein Wandabschnitt wölbt sich in der Systole nach außen, während sich die übrige Kammer zusammenzieht.": {
    "en": "A wall segment bulges outward in systole while the remaining ventricle contracts.",
    "fa": "بخشی از دیواره در سیستول به بیرون برآمده می‌شود، در حالی که بقیهٔ بطن منقبض می‌شود."
  },
  "LGE: die Lage in der Wand ist wichtig": {
    "en": "LGE: location within the wall matters",
    "fa": "LGE: محل در دیواره اهمیت دارد"
  },
  "bedeutet Late Gadolinium Enhancement: eine Aufnahme nach Kontrastmittel, die bei der Beurteilung von Narben hilft. Im LV können bei ACM streifenförmige Veränderungen außen in der Wand (subepikardial) oder in der Wandmitte (intramural) auftreten. Eine relativ erhaltene LVEF schließt diese Beteiligung nicht aus.": {
    "en": "means late gadolinium enhancement: a post-contrast acquisition that helps assess scars. In ACM, stria-pattern changes may occur in the outer LV wall (subepicardial) or midwall (intramural). Relatively preserved LVEF does not exclude this involvement.",
    "fa": "به معنی Late Gadolinium Enhancement است: تصویربرداری پس از تزریق که به ارزیابی اسکار کمک می‌کند. در ACM ممکن است تغییرات نواری در بخش بیرونی دیوارهٔ LV (ساب‌اپی‌کاردیال) یا میانهٔ دیواره (داخل‌جداری) رخ دهند. LVEF نسبتاً حفظ‌شده این درگیری را رد نمی‌کند."
  },
  "Was bedeutet das?": {
    "en": "What does this mean?",
    "fa": "چه معنایی دارد؟"
  },
  "Subepikardial / intramural": {
    "en": "Subepicardial / intramural",
    "fa": "ساب‌اپی‌کاردیال / داخل‌جداری"
  },
  "Nichtischämisches Muster. Kann zu ACM passen, kommt aber auch bei anderen Erkrankungen wie Myokarditis vor.": {
    "en": "Non-ischaemic pattern. It may fit ACM but also occurs in other diseases such as myocarditis.",
    "fa": "الگوی غیرایسکمیک. می‌تواند با ACM سازگار باشد، اما در بیماری‌های دیگری مانند میوکاردیت نیز رخ می‌دهد."
  },
  "Subendokardial bis transmural": {
    "en": "Subendocardial to transmural",
    "fa": "از ساب‌اندوکاردیال تا تمام‌ضخامت"
  },
  "Bei passender Verteilung in einem Koronarterritorium eine ischämische Ursache prüfen.": {
    "en": "If distributed within a coronary territory, assess for an ischaemic cause.",
    "fa": "در صورت توزیع سازگار با قلمرو یک شریان کرونر، علت ایسکمیک را بررسی کنید."
  },
  "Nur an septalen RV-Insertionspunkten": {
    "en": "Confined to septal RV insertion points",
    "fa": "محدود به نقاط اتصال سپتالی RV"
  },
  "Was die Originalbilder zeigen": {
    "en": "What the original images show",
    "fa": "آنچه تصاویر اصلی نشان می‌دهند"
  },
  "Die beiden PSIR-Ansichten gehören zum selben Patienten. Die Orientierungspunkte zeigen die Kammerhöhlen, nicht die Ausdehnung einer Narbe. Das vollständige Muster in den Originalserien beurteilen.": {
    "en": "Both PSIR views belong to the same patient. The orientation markers show the ventricular cavities, not scar extent. Assess the full pattern in the original series.",
    "fa": "هر دو نمای PSIR متعلق به یک بیمار هستند. نشانگرهای جهت‌یابی حفره‌های بطن را نشان می‌دهند، نه وسعت اسکار. الگوی کامل را در سری‌های اصلی بررسی کنید."
  },
  "Wie bewegt sich die RV-Wand?": {
    "en": "How does the RV wall move?",
    "fa": "دیوارهٔ RV چگونه حرکت می‌کند؟"
  },
  "Im Originalfall sind Ausbuchtungen mit auffälliger RV-Wandbewegung beschrieben. Der LV bewegt sich normal.": {
    "en": "The original case describes bulges with abnormal RV wall motion. LV motion is normal.",
    "fa": "کیس اصلی برآمدگی‌هایی با حرکت غیرطبیعی دیوارهٔ RV را توصیف می‌کند. حرکت LV طبیعی است."
  },
  "Cine starten und die freie RV-Wand bis zur Herzspitze verfolgen.": {
    "en": "Start the cine and follow the free RV wall to the apex.",
    "fa": "Cine را پخش کنید و دیوارهٔ آزاد RV را تا اپکس دنبال کنید."
  },
  "Dyskinesie bedeutet: Ein Wandabschnitt bewegt sich in der Systole nach außen.": {
    "en": "Dyskinesia means a wall segment moves outward in systole.",
    "fa": "دیسکینزی یعنی بخشی از دیواره در سیستول به بیرون حرکت می‌کند."
  },
  "Bekannte ARVC; Untersuchung nach einer früheren Ablation. Die Bewegung über den ganzen Herzzyklus beurteilen.": {
    "en": "Known ARVC; examination after previous ablation. Assess motion across the whole cardiac cycle.",
    "fa": "ARVC شناخته‌شده؛ بررسی پس از ابلیشن قبلی. حرکت را در کل چرخهٔ قلب ارزیابی کنید."
  },
  "Auch die linke Kammer ansehen": {
    "en": "Assess the left ventricle too",
    "fa": "بطن چپ را نیز ارزیابی کنید"
  },
  "Die Originaluntersuchung beschreibt LGE in beiden Kammern. Eine LV-Beteiligung ist auch bei relativ guter Pumpfunktion möglich.": {
    "en": "The original examination describes LGE in both ventricles. LV involvement is possible even with relatively good pump function.",
    "fa": "بررسی اصلی LGE در هر دو بطن را توصیف می‌کند. درگیری LV حتی با عملکرد سیستولی نسبتاً خوب نیز ممکن است."
  },
  "RV und LV finden, dann die jeweilige Herzwand verfolgen.": {
    "en": "Identify RV and LV, then follow each ventricular wall.",
    "fa": "RV و LV را پیدا کنید، سپس دیوارهٔ هر بطن را دنبال کنید."
  },
  "Zum Vergleich die zweite Ebene öffnen.": {
    "en": "Open the second plane for comparison.",
    "fa": "برای مقایسه صفحهٔ دوم را باز کنید."
  },
  "Die Punkte dienen der Orientierung und markieren keine Narbe. LGE allein beweist keine ACM.": {
    "en": "The markers provide orientation and do not mark a scar. LGE alone does not prove ACM.",
    "fa": "نشانگرها برای جهت‌یابی هستند و اسکار را علامت‌گذاری نمی‌کنند. LGE به‌تنهایی ACM را ثابت نمی‌کند."
  },
  "Dasselbe Herz in der kurzen Achse": {
    "en": "The same heart in short axis",
    "fa": "همان قلب در محور کوتاه"
  },
  "Diese PSIR-Aufnahme gehört zum selben Patienten. Die Originalquelle markiert hier eine Anreicherung der LV-Wand.": {
    "en": "This PSIR image belongs to the same patient. The original source marks LV wall enhancement here.",
    "fa": "این تصویر PSIR متعلق به همان بیمار است. منبع اصلی در اینجا تقویت پس از تزریق در دیوارهٔ LV را علامت‌گذاری می‌کند."
  },
  "Das runde LV-Lumen finden und die umgebende Muskelwand ansehen.": {
    "en": "Find the round LV cavity and inspect the surrounding myocardium.",
    "fa": "حفرهٔ گرد LV را پیدا کنید و عضلهٔ اطراف آن را بررسی کنید."
  },
  "Die Auffälligkeit mit der Vierkammeraufnahme vergleichen.": {
    "en": "Compare the finding with the four-chamber image.",
    "fa": "یافته را با تصویر چهارحفره‌ای مقایسه کنید."
  },
  "Eine zweite Ebene hilft, echte Veränderungen von Artefakten zu unterscheiden.": {
    "en": "A second plane helps distinguish genuine changes from artefacts.",
    "fa": "صفحهٔ دوم به افتراق تغییرات واقعی از آرتیفکت کمک می‌کند."
  },
  "Orientierung im Originalbild:": {
    "en": "Orientation on the original image:",
    "fa": "جهت‌یابی در تصویر اصلی:"
  },
  "Am Originalbild lernen · Radiopaedia rID": {
    "en": "Learn from the original image · Radiopaedia rID",
    "fa": "یادگیری از تصویر اصلی · شناسهٔ Radiopaedia"
  },
  "Markierungen ausblenden": {
    "en": "Hide markers",
    "fa": "پنهان کردن نشانگرها"
  },
  "Orientierung einblenden": {
    "en": "Show orientation",
    "fa": "نمایش جهت‌یابی"
  },
  "Vergrößern ↗": {
    "en": "Enlarge ↗",
    "fa": "بزرگ‌نمایی ↗"
  },
  "Cine in der Originalserie öffnen ↗": {
    "en": "Open cine in original series ↗",
    "fa": "باز کردن Cine در سری اصلی ↗"
  },
  ". Originalaufnahme unverändert": {
    "en": ". Original acquisition unchanged",
    "fa": ". تصویر اصلی بدون تغییر است"
  },
  "; einblendbare Orientierungspunkte von RadYar.": {
    "en": "; optional RadYar orientation markers.",
    "fa": "؛ نشانگرهای اختیاری جهت‌یابی رادیار."
  },
  "Form": {
    "en": "Form",
    "fa": "نوع"
  },
  "LV-dominant": {
    "en": "LV-dominant",
    "fa": "غالب در LV"
  },
  "Sportherz": {
    "en": "Athlete’s heart",
    "fa": "قلب ورزشکار"
  },
  "Myokarditis": {
    "en": "Myocarditis",
    "fa": "میوکاردیت"
  },
  "Brotkrumennavigation": {
    "en": "Breadcrumb navigation",
    "fa": "مسیر راهبری"
  },
  "Thorax": {
    "en": "Thorax",
    "fa": "قفسهٔ سینه"
  },
  "Flashcards": {
    "en": "Flashcards",
    "fa": "فلش‌کارت‌ها"
  },
  "Originalserie": {
    "en": "Original series",
    "fa": "سری اصلی"
  },
  "Tempo": {
    "en": "Speed",
    "fa": "سرعت"
  },
  "Die": {
    "en": "The",
    "fa": "این"
  },
  "Major": {
    "en": "Major",
    "fa": "معیار اصلی"
  },
  "Minor": {
    "en": "Minor",
    "fa": "معیار فرعی"
  },
  "Baustein": {
    "en": "Component",
    "fa": "جزء"
  },
  "Regional:": {
    "en": "Regional:",
    "fa": "ناحیه‌ای:"
  },
  "Global:": {
    "en": "Global:",
    "fa": "کلی:"
  },
  "RV-Dilatation": {
    "en": "RV dilatation",
    "fa": "اتساع RV"
  },
  "4-Kammer-Cine": {
    "en": "Four-chamber cine",
    "fa": "Cine چهارحفره‌ای"
  },
  "RVOT-Cine": {
    "en": "RVOT cine",
    "fa": "Cine مسیر خروجی RV"
  },
  "4-Kammer-MRT": {
    "en": "Four-chamber MRI",
    "fa": "MRI چهارحفره‌ای"
  },
  "Begriff": {
    "en": "Term",
    "fa": "اصطلاح"
  },
  "Hypokinesie": {
    "en": "Hypokinesia",
    "fa": "هیپوکینزی"
  },
  "Akinesie": {
    "en": "Akinesia",
    "fa": "آکینزی"
  },
  "Dyskinesie": {
    "en": "Dyskinesia",
    "fa": "دیسکینزی"
  },
  "Muster": {
    "en": "Pattern",
    "fa": "الگو"
  },
  "RV-Lumen": {
    "en": "RV cavity",
    "fa": "حفرهٔ RV"
  },
  "LV-Lumen": {
    "en": "LV cavity",
    "fa": "حفرهٔ LV"
  },
  "Abschnitt öffnen:": {
    "en": "Open chapter:",
    "fa": "باز کردن فصل:"
  },
  "Ansichten für Fall": {
    "en": "Views for case",
    "fa": "نماهای کیس"
  },
  "vergrößern": {
    "en": "Enlarge",
    "fa": "بزرگ‌نمایی"
  },
  "MRT vergrößert:": {
    "en": "Enlarged MRI:",
    "fa": "MRI بزرگ‌نمایی‌شده:"
  },
  "Lehr-Cine:": {
    "en": "Teaching cine:",
    "fa": "Cine آموزشی:"
  }
}

export function arvcText(value, lang = 'de') {
  if (typeof value !== 'string' || lang === 'de') return value
  const text=value.replace(/\s+/g,' ').trim()
  const pair=COPY[text]
  if(pair) return (/^\s/.test(value)?' ':'')+(pair[lang]||value)+(/\s$/.test(value)?' ':'')
  for(const prefix of ['Abschnitt öffnen:','Ansichten für Fall','MRT vergrößert:','Lehr-Cine:']) {
    if(text.startsWith(prefix+' ')) return COPY[prefix][lang]+' '+arvcText(text.slice(prefix.length+1),lang)
  }
  if(text.endsWith(' vergrößern')) return COPY['vergrößern'][lang]+' '+arvcText(text.slice(0,-' vergrößern'.length),lang)
  return value
}
const retainedProps=new Set(['id','key','ref','className','style','href','src','poster','d','viewBox','role','aria-controls','aria-labelledby','htmlFor','type','value','name','icon','idPrefix','lessonId','lessonRoute','caseId','selected','lang','dir'])
const languageHref=(href,lang)=>{
  if(lang==='de'||typeof href!=='string'||!href.startsWith('/')||href.startsWith('//'))return href
  const [withoutHash,hash]=href.split('#'),[pathname,query='']=withoutHash.split('?')
  const params=new URLSearchParams(query);params.set('lang',lang)
  return pathname+'?'+params.toString()+(hash?'#'+hash:'')
}
// Pure React-value localisation at authored component boundaries. No DOM mutation
// or component invocation: event handlers, scoring IDs and media paths are retained.
export function localizeArvcTree(value,lang='de') {
  if(lang==='de')return value
  if(typeof value==='string')return arvcText(value,lang)
  if(Array.isArray(value))return value.some(isValidElement)?Children.map(value,item=>localizeArvcTree(item,lang)):value.map(item=>localizeArvcTree(item,lang))
  if(isValidElement(value)) {
    const props={}
    for(const [key,item] of Object.entries(value.props))props[key]=key==='href'?languageHref(item,lang):retainedProps.has(key)?item:localizeArvcTree(item,lang)
    return cloneElement(value,props)
  }
  if(value&&typeof value==='object'&&Object.getPrototypeOf(value)===Object.prototype){
    const result={};for(const [key,item]of Object.entries(value))result[key]=retainedProps.has(key)?item:localizeArvcTree(item,lang);return result
  }
  return value
}
