// ── RADYAR QUESTION BANK ────────────────────────────────────────────────────
// Struktur: Jede Frage hat tags[] mit Thema-IDs aus curriculum.js
// Neue Fragen einfach als weiteres Objekt in QUESTION_BANK hinzufügen.

export const QUESTION_BANK = {
  de: [
    // ── TECHNIK: Kontrastmittel ───────────────────────────────────────────
    {
      id: 'km-de-01',
      tags: ['km-typen'],
      fach: 'technik',
      question: 'Welche Aussage zu nicht-ionischen Kontrastmitteln (z. B. Ultravist®) trifft zu?',
      options: [
        { id: 'A', text: 'Höhere Osmolarität als ionische KM' },
        { id: 'B', text: 'Nur enteral zugelassen' },
        { id: 'C', text: 'Niedrigere Osmolarität und besser verträglich' },
        { id: 'D', text: 'Tragen eine negative Ladung' },
      ],
      correct: 'C',
      explanation: 'Nicht-ionische KM besitzen keine elektrische Ladung und sind daher hydrophiler als ionische KM. Durch die niedrigere Osmolarität (iso- bis leicht hyperosmolar gegenüber Blut) sind sie deutlich besser verträglich und haben eine geringere Rate an Nebenwirkungen. Deshalb sind sie der Standard für alle intravaskulären Anwendungen.',
    },
    {
      id: 'km-de-02',
      tags: ['km-typen'],
      fach: 'technik',
      question: 'Für welche Indikation wird eine hohe Injektionsrate von 5 ml/s empfohlen?',
      options: [
        { id: 'A', text: 'Reine portalvenöse Abdomen-Phase' },
        { id: 'B', text: 'Ausschluss einer Lungenarterienembolie (LAE-CT)' },
        { id: 'C', text: 'Native Schädel-CT ohne KM' },
        { id: 'D', text: 'KM-Gabe über einen Zentralvenenkatheter (ZVK)' },
      ],
      correct: 'B',
      explanation: 'Beim LAE-CT (Pulmonalis-Angiographie) ist eine hohe Injektionsrate von 5 ml/s entscheidend, um eine ausreichende Konzentration des Kontrastmittels in der A. pulmonalis zu erreichen und kleinste Füllungsdefekte sicher darzustellen. Über einen ZVK darf nur mit maximal 2,5 ml/s injiziert werden.',
    },
    {
      id: 'km-de-03',
      tags: ['km-nw'],
      fach: 'technik',
      question: 'Wie definiert die ESUR eine PC-AKI (Post-Contrast Acute Kidney Injury)?',
      options: [
        { id: 'A', text: 'Kreatininanstieg ≥ 0,3 mg/dl oder ≥ 1,5-fach innerhalb 48–72 h nach KM-Gabe' },
        { id: 'B', text: 'GFR-Abfall um 10 % nach 7 Tagen' },
        { id: 'C', text: 'Anurie innerhalb von 6 h nach KM-Gabe' },
        { id: 'D', text: 'Harnstoffanstieg um das 2-fache nach 24 h' },
      ],
      correct: 'A',
      explanation: 'Die ESUR-Definition der PC-AKI: Anstieg des Serumkreatinins um ≥ 0,3 mg/dl (absolut) oder auf das ≥ 1,5-fache des Ausgangswertes (relativ), jeweils innerhalb von 48–72 h nach intravaskulärer KM-Gabe. Die Umbenennung von CIN zu PC-AKI trägt dem fehlenden kausalen Zusammenhang Rechnung.',
    },
    {
      id: 'km-de-04',
      tags: ['km-nw'],
      fach: 'technik',
      question: 'Welche Aussage zur sogenannten „Jodallergie\" ist korrekt?',
      options: [
        { id: 'A', text: 'Sie ist IgE-vermittelt gegen elementares Jod' },
        { id: 'B', text: 'Sie existiert nicht – Jod als kleines Molekül ist nicht allergen' },
        { id: 'C', text: 'Sie erfordert immer eine Adrenalin-Prophylaxe vor jeder KM-Gabe' },
        { id: 'D', text: 'Sie tritt nur bei makrozyklischen Gadolinium-KM auf' },
      ],
      correct: 'B',
      explanation: 'Der Begriff „Jodallergie\" ist medizinisch nicht korrekt. Jod ist ein kleines anorganisches Molekül ohne Hapten-Eigenschaften und daher nicht allergen. Allergische bzw. pseudoallergische Reaktionen richten sich stets gegen andere Molekülbestandteile des Kontrastmittels. Eine generelle Prophylaxe mit Adrenalin ist nicht indiziert.',
    },
    {
      id: 'km-de-05',
      tags: ['km-mrt'],
      fach: 'technik',
      question: 'Welches Gadolinium-KM ist das einzige hepatozytenspezifische Kontrastmittel und wird in reduzierter Dosis verabreicht?',
      options: [
        { id: 'A', text: 'Gadovist® (Gadobutrol)' },
        { id: 'B', text: 'Dotarem® (Gadoterat)' },
        { id: 'C', text: 'Primovist® (Gadoxetsäure)' },
        { id: 'D', text: 'Gastrografin® (Diatrizoat)' },
      ],
      correct: 'C',
      explanation: 'Primovist® (Gadoxetsäure) ist das einzige MRT-Kontrastmittel mit echter hepatozytenspezifischer Aufnahme (~50 %). Es wird über OATP1B1/3-Transporter aufgenommen und biliär ausgeschieden. Dosis: nur 0,025 mmol/kg KG – ein Viertel der üblichen Gd-Standarddosis.',
    },
    {
      id: 'km-de-06',
      tags: ['km-spezial'],
      fach: 'technik',
      question: 'Was muss nach der Geburt eines Kindes zwingend eingeleitet werden, wenn die Mutter während der Schwangerschaft jodhaltiges Kontrastmittel erhalten hat?',
      options: [
        { id: 'A', text: 'Kontrolle des TSH-Wertes beim Neugeborenen' },
        { id: 'B', text: 'Generelles Stillverbot für mindestens 2 Wochen' },
        { id: 'C', text: 'Ganzkörper-MRT des Neugeborenen zur Verteilungskontrolle' },
        { id: 'D', text: 'Sofortige prophylaktische Gabe von L-Thyroxin beim Säugling' },
      ],
      correct: 'A',
      explanation: 'Jodhaltige KM sind plazentagängig. Ab der 10.–12. SSW kann die fetale Schilddrüse aktiv Jod aufnehmen, da der Wolff-Chaikoff-Effekt beim Fetus nicht kompensiert werden kann → mögliche transiente neonatale Hypothyreose. TSH-Kontrolle beim Neugeborenen ist daher obligat.',
    },
    {
      id: 'km-de-07',
      tags: ['km-spezial'],
      fach: 'technik',
      question: 'Welche Empfehlung gilt für das Stillen nach einer Gadolinium-Gabe bei der Mutter?',
      options: [
        { id: 'A', text: 'Stillen erst nach Gabe von Aktivkohle beim Kind erlaubt' },
        { id: 'B', text: 'Eine Stillpause ist medizinisch nicht notwendig' },
        { id: 'C', text: 'Abpumpen und Verwerfen der ersten Mahlzeit nach 12 Stunden' },
        { id: 'D', text: 'Zwingende Stillpause für 48 Stunden zur Sicherheit' },
      ],
      correct: 'B',
      explanation: 'Nach Gadolinium-Gabe werden weniger als 0,04 % der mütterlichen Dosis in die Muttermilch ausgeschieden, davon wird beim Säugling nur ein Bruchteil (<1 %) resorbiert. Aktuelle Leitlinien (ESUR, ACR) sehen keine medizinische Notwendigkeit für eine Stillpause.',
    },
    {
      id: 'km-de-08',
      tags: ['km-spezial'],
      fach: 'technik',
      question: 'Was ist die primäre Voraussetzung für die Anwendung von Kontrastmitteln in der Schwangerschaft?',
      options: [
        { id: 'A', text: 'Strenge Indikationsstellung und Fehlen gleichwertiger KM-freier Alternativen' },
        { id: 'B', text: 'Durchführung der Untersuchung ausschließlich unter Vollnarkose' },
        { id: 'C', text: 'Vorliegender negativer Hauttest der Mutter auf KM-Bestandteile' },
        { id: 'D', text: 'Schriftliche Zustimmung des betreuenden Gynäkologen' },
      ],
      correct: 'A',
      explanation: 'Das Grundprinzip: KM in der Schwangerschaft nur dann, wenn (1) die Untersuchung medizinisch unaufschiebbar ist UND (2) keine diagnostisch gleichwertige KM-freie Methode zur Verfügung steht. Beide Bedingungen müssen gleichzeitig erfüllt sein. Detaillierte Aufklärung und Dokumentation sind obligatorisch.',
    },
    {
      id: 'km-de-09',
      tags: ['km-nw'],
      fach: 'technik',
      question: 'Welche der folgenden Aussagen zur Metformin-Therapie und intravaskulärer KM-Gabe ist korrekt?',
      options: [
        { id: 'A', text: 'Metformin muss bei allen Patienten 48 h vor der Untersuchung abgesetzt werden' },
        { id: 'B', text: 'Bei eGFR > 30 ml/min/1,73 m² kann Metformin normal weitergeführt werden' },
        { id: 'C', text: 'Metformin erhöht direkt die Nephrotoxizität des Kontrastmittels' },
        { id: 'D', text: 'Bei Dialysepatienten ist Metformin unbedenklich weiterzuführen' },
      ],
      correct: 'B',
      explanation: 'Bei eGFR > 30 ml/min/1,73 m² ist kein Absetzen von Metformin erforderlich. Das Risiko der Laktatazidose entsteht nicht durch direkte Interaktion, sondern indirekt: KM → (selten) akute Nierenschädigung → Metformin-Akkumulation → Laktatazidose. Bei eGFR < 30 oder akutem Nierenversagen: 48 h pausieren.',
    },
  ],

  en: [
    {
      id: 'km-en-01', tags: ['km-typen'], fach: 'technik',
      question: 'Which statement about non-ionic contrast media (e.g. Ultravist®) is correct?',
      options: [
        { id: 'A', text: 'Higher osmolality than ionic contrast media' },
        { id: 'B', text: 'Approved only for enteral use' },
        { id: 'C', text: 'Lower osmolality and better tolerated' },
        { id: 'D', text: 'Carry a negative charge' },
      ],
      correct: 'C',
      explanation: 'Non-ionic contrast media carry no electrical charge and are more hydrophilic. Their lower osmolality results in significantly better tolerability and fewer adverse reactions, making them the standard for all intravascular applications.',
    },
    {
      id: 'km-en-02', tags: ['km-typen'], fach: 'technik',
      question: 'For which indication is a high injection rate of 5 ml/s recommended?',
      options: [
        { id: 'A', text: 'Pure portal venous abdominal phase' },
        { id: 'B', text: 'Exclusion of pulmonary embolism (CTPA)' },
        { id: 'C', text: 'Non-contrast head CT' },
        { id: 'D', text: 'Contrast injection via a central venous catheter' },
      ],
      correct: 'B',
      explanation: 'In CT pulmonary angiography (CTPA), 5 ml/s is essential to achieve sufficient contrast concentration in the pulmonary artery to detect even small filling defects. CVC injection must not exceed 2.5 ml/s.',
    },
    {
      id: 'km-en-03', tags: ['km-nw'], fach: 'technik',
      question: 'How does the ESUR define PC-AKI (Post-Contrast Acute Kidney Injury)?',
      options: [
        { id: 'A', text: 'Creatinine rise ≥ 0.3 mg/dl or ≥ 1.5-fold within 48–72 h after contrast' },
        { id: 'B', text: '10% GFR drop after 7 days' },
        { id: 'C', text: 'Anuria within 6 h after contrast injection' },
        { id: 'D', text: 'Doubling of urea within 24 h' },
      ],
      correct: 'A',
      explanation: 'ESUR definition: absolute creatinine rise ≥ 0.3 mg/dl OR relative rise to ≥ 1.5× baseline, within 48–72 h after intravascular contrast. The rename from CIN to PC-AKI reflects the lack of proven causality.',
    },
    {
      id: 'km-en-04', tags: ['km-nw'], fach: 'technik',
      question: 'Which statement about the "iodine allergy" is correct?',
      options: [
        { id: 'A', text: 'It is IgE-mediated against elemental iodine' },
        { id: 'B', text: 'It does not exist — iodine is not allergenic as a small molecule' },
        { id: 'C', text: 'It always requires epinephrine prophylaxis before contrast' },
        { id: 'D', text: 'It only occurs with macrocyclic gadolinium agents' },
      ],
      correct: 'B',
      explanation: '"Iodine allergy" is medically inaccurate. Iodine has no hapten properties and is not allergenic. Reactions target other components of the contrast molecule. Routine epinephrine prophylaxis is not indicated.',
    },
    {
      id: 'km-en-05', tags: ['km-mrt'], fach: 'technik',
      question: 'Which gadolinium agent is the only hepatocyte-specific contrast medium given at a reduced dose?',
      options: [
        { id: 'A', text: 'Gadovist® (gadobutrol)' },
        { id: 'B', text: 'Dotarem® (gadoterate)' },
        { id: 'C', text: 'Primovist® (gadoxetate)' },
        { id: 'D', text: 'Gastrografin® (diatrizoate)' },
      ],
      correct: 'C',
      explanation: 'Primovist® is the only MRI agent with genuine hepatocyte-specific uptake (~50%), taken up via OATP1B1/3 and excreted biliary. Dose: 0.025 mmol/kg — one quarter of the standard gadolinium dose.',
    },
    {
      id: 'km-en-06', tags: ['km-spezial'], fach: 'technik',
      question: 'What must be done after birth when the mother received iodinated contrast during pregnancy?',
      options: [
        { id: 'A', text: "Check the newborn's TSH level" },
        { id: 'B', text: 'Breastfeeding ban for at least 2 weeks' },
        { id: 'C', text: 'Whole-body MRI of the newborn' },
        { id: 'D', text: 'Immediate prophylactic L-thyroxine to the infant' },
      ],
      correct: 'A',
      explanation: 'Iodinated contrast crosses the placenta. The fetal thyroid can take up iodine from week 10–12, without the Wolff-Chaikoff escape mechanism. This may cause transient neonatal hypothyroidism. TSH monitoring is mandatory.',
    },
    {
      id: 'km-en-07', tags: ['km-spezial'], fach: 'technik',
      question: 'What applies to breastfeeding after gadolinium administration to the mother?',
      options: [
        { id: 'A', text: 'Only permitted after activated charcoal for the infant' },
        { id: 'B', text: 'A breastfeeding pause is medically not necessary' },
        { id: 'C', text: 'Pump and discard the first feed after 12 hours' },
        { id: 'D', text: 'Mandatory 48-hour breastfeeding pause' },
      ],
      correct: 'B',
      explanation: 'Less than 0.04% of maternal gadolinium reaches breast milk; of that, <1% is absorbed by the infant. Current guidelines (ESUR, ACR) find no medical necessity for a breastfeeding pause.',
    },
    {
      id: 'km-en-08', tags: ['km-spezial'], fach: 'technik',
      question: 'What is the primary prerequisite for contrast media use during pregnancy?',
      options: [
        { id: 'A', text: 'Strict indication AND no equivalent contrast-free alternative' },
        { id: 'B', text: 'Examination must be performed under general anesthesia only' },
        { id: 'C', text: 'Negative skin test to contrast components' },
        { id: 'D', text: "Written consent of the obstetrician" },
      ],
      correct: 'A',
      explanation: 'Contrast in pregnancy only when: (1) medically urgent AND cannot be deferred, AND (2) no equivalent contrast-free method is available. Both conditions must be met simultaneously. Full informed consent and documentation are mandatory.',
    },
    {
      id: 'km-en-09', tags: ['km-nw'], fach: 'technik',
      question: 'Which statement about metformin and intravascular contrast is correct?',
      options: [
        { id: 'A', text: 'Metformin must be stopped 48 h before in all patients' },
        { id: 'B', text: 'With eGFR > 30 ml/min/1.73 m², metformin can be continued' },
        { id: 'C', text: 'Metformin directly increases contrast nephrotoxicity' },
        { id: 'D', text: 'In dialysis patients, metformin can be continued safely' },
      ],
      correct: 'B',
      explanation: 'With eGFR > 30, stopping metformin is not required. The lactic acidosis risk is indirect: contrast → (rare) AKI → metformin accumulation → lactic acidosis. With eGFR < 30 or AKI: withhold for 48 h.',
    },
  ],

  fa: [
    {
      id: 'km-fa-01', tags: ['km-typen'], fach: 'technik',
      question: 'کدام گزینه درباره ماده حاجب غیر یونی (مثلاً Ultravist®) صحیح است؟',
      options: [
        { id: 'A', text: 'اسمولاریته بالاتر نسبت به ماده حاجب یونی' },
        { id: 'B', text: 'فقط برای مصرف روده‌ای مجاز است' },
        { id: 'C', text: 'اسمولاریته پایین‌تر و تحمل‌پذیری بهتر' },
        { id: 'D', text: 'دارای بار منفی است' },
      ],
      correct: 'C',
      explanation: 'مواد حاجب غیر یونی هیچ بار الکتریکی ندارند. اسمولاریته پایین‌تر آن‌ها منجر به تحمل‌پذیری بسیار بهتر و عوارض جانبی کمتر می‌شود و استاندارد برای تمام کاربردهای داخل عروقی هستند.',
    },
    {
      id: 'km-fa-02', tags: ['km-typen'], fach: 'technik',
      question: 'برای کدام اندیکاسیون سرعت تزریق بالای ۵ میلی‌لیتر در ثانیه توصیه می‌شود؟',
      options: [
        { id: 'A', text: 'فاز وریدی پورتال شکم' },
        { id: 'B', text: 'رد آمبولی ریوی (CTPA)' },
        { id: 'C', text: 'سی‌تی اسکن سر بدون ماده حاجب' },
        { id: 'D', text: 'تزریق از طریق کاتتر وریدی مرکزی' },
      ],
      correct: 'B',
      explanation: 'در CT آنژیوگرافی ریوی، سرعت ۵ میلی‌لیتر در ثانیه برای دستیابی به غلظت کافی در شریان ریوی ضروری است. تزریق از طریق CVC نباید از ۲.۵ میلی‌لیتر در ثانیه تجاوز کند.',
    },
    {
      id: 'km-fa-03', tags: ['km-nw'], fach: 'technik',
      question: 'ESUR آسیب حاد کلیه پس از ماده حاجب (PC-AKI) را چگونه تعریف می‌کند؟',
      options: [
        { id: 'A', text: 'افزایش کراتینین ≥۰.۳ میلی‌گرم/دسی‌لیتر یا ≥۱.۵ برابر در طی ۴۸–۷۲ ساعت' },
        { id: 'B', text: 'کاهش ۱۰٪ GFR بعد از ۷ روز' },
        { id: 'C', text: 'آنوری در طی ۶ ساعت پس از تزریق' },
        { id: 'D', text: 'دو برابر شدن اوره خون در ۲۴ ساعت' },
      ],
      correct: 'A',
      explanation: 'تعریف ESUR: افزایش مطلق کراتینین ≥۰.۳ میلی‌گرم/دسی‌لیتر یا نسبی به ≥۱.۵ برابر مقدار پایه در طی ۴۸–۷۲ ساعت پس از تزریق داخل عروقی. تغییر نام از CIN به PC-AKI نشان‌دهنده فقدان رابطه علّی اثبات‌شده است.',
    },
    {
      id: 'km-fa-04', tags: ['km-nw'], fach: 'technik',
      question: 'کدام گزینه درباره «آلرژی به ید» صحیح است؟',
      options: [
        { id: 'A', text: 'واکنش IgE-واسطه در برابر ید عنصری است' },
        { id: 'B', text: 'وجود ندارد – ید به عنوان مولکول کوچک آلرژن نیست' },
        { id: 'C', text: 'همیشه نیاز به پروفیلاکسی با آدرنالین دارد' },
        { id: 'D', text: 'فقط با مواد حاجب گادولینیوم ماکروسیکلیک رخ می‌دهد' },
      ],
      correct: 'B',
      explanation: '«آلرژی به ید» اصطلاح پزشکی صحیحی نیست. ید یک مولکول کوچک معدنی بدون خواص هاپتنی است. واکنش‌های آلرژیک علیه سایر اجزای مولکول ماده حاجب هستند. پروفیلاکسی روتین با آدرنالین اندیکاسیون ندارد.',
    },
    {
      id: 'km-fa-05', tags: ['km-mrt'], fach: 'technik',
      question: 'کدام ماده حاجب گادولینیوم تنها ماده اختصاصی هپاتوسیت‌ها است و با دوز کمتری داده می‌شود؟',
      options: [
        { id: 'A', text: 'Gadovist® (گادوبوترول)' },
        { id: 'B', text: 'Dotarem® (گادوتِرات)' },
        { id: 'C', text: 'Primovist® (گادوکستات)' },
        { id: 'D', text: 'Gastrografin® (دیاتریزوات)' },
      ],
      correct: 'C',
      explanation: 'Primovist® تنها ماده حاجب MRI با جذب واقعی هپاتوسیت‌های عملکردی (~۵۰٪) است. از طریق ترانسپورترهای OATP1B1/3 جذب و بیلیاری دفع می‌شود. دوز: فقط ۰.۰۲۵ میلی‌مول/کیلوگرم – یک چهارم دوز استاندارد.',
    },
    {
      id: 'km-fa-06', tags: ['km-spezial'], fach: 'technik',
      question: 'پس از تولد نوزادی که مادرش در بارداری ماده حاجب حاوی ید دریافت کرده، چه اقدامی ضروری است؟',
      options: [
        { id: 'A', text: 'بررسی سطح TSH نوزاد' },
        { id: 'B', text: 'ممنوعیت کلی شیردهی حداقل ۲ هفته' },
        { id: 'C', text: 'MRI کل بدن نوزاد' },
        { id: 'D', text: 'تجویز فوری L-تیروکسین پروفیلاکتیک' },
      ],
      correct: 'A',
      explanation: 'مواد حاجب حاوی ید از جفت عبور می‌کنند. از هفته ۱۰–۱۲ تیروئید جنین ید را جذب می‌کند بدون مکانیسم escape → کم‌کاری گذرا تیروئید نوزادی ممکن است. بررسی TSH نوزاد اجباری است.',
    },
    {
      id: 'km-fa-07', tags: ['km-spezial'], fach: 'technik',
      question: 'توصیه در مورد شیردهی پس از تزریق گادولینیوم به مادر چیست؟',
      options: [
        { id: 'A', text: 'فقط پس از دادن زغال فعال به نوزاد مجاز است' },
        { id: 'B', text: 'از نظر پزشکی نیازی به قطع شیردهی نیست' },
        { id: 'C', text: 'پمپ کردن و دور ریختن اولین شیردهی بعد از ۱۲ ساعت' },
        { id: 'D', text: 'توقف اجباری شیردهی به مدت ۴۸ ساعت' },
      ],
      correct: 'B',
      explanation: 'کمتر از ۰.۰۴٪ دوز مادری در شیر دفع می‌شود. از این مقدار کمتر از ۱٪ توسط نوزاد جذب می‌شود. دستورالعمل‌های کنونی (ESUR، ACR) هیچ ضرورت پزشکی برای قطع شیردهی نمی‌بینند.',
    },
    {
      id: 'km-fa-08', tags: ['km-spezial'], fach: 'technik',
      question: 'پیش‌نیاز اصلی برای استفاده از ماده حاجب در دوران بارداری چیست؟',
      options: [
        { id: 'A', text: 'اندیکاسیون قوی و نبود روش‌های تشخیصی معادل بدون ماده حاجب' },
        { id: 'B', text: 'انجام بررسی فقط تحت بیهوشی عمومی' },
        { id: 'C', text: 'تست پوستی منفی مادر' },
        { id: 'D', text: 'رضایت کتبی متخصص زنان' },
      ],
      correct: 'A',
      explanation: 'اصل بنیادی: ماده حاجب در بارداری فقط زمانی که (۱) بررسی فوری و غیرقابل تعویق AND (۲) هیچ روش معادل بدون ماده حاجب وجود نداشته باشد. هر دو شرط باید همزمان برقرار باشند.',
    },
    {
      id: 'km-fa-09', tags: ['km-nw'], fach: 'technik',
      question: 'کدام گزینه درباره درمان با متفورمین و تزریق داخل عروقی ماده حاجب صحیح است؟',
      options: [
        { id: 'A', text: 'متفورمین در همه بیماران ۴۸ ساعت قبل باید قطع شود' },
        { id: 'B', text: 'با eGFR > ۳۰ میلی‌لیتر/دقیقه/۱.۷۳ مترمربع متفورمین ادامه می‌یابد' },
        { id: 'C', text: 'متفورمین مستقیماً سمیت کلیوی ماده حاجب را افزایش می‌دهد' },
        { id: 'D', text: 'در بیماران دیالیزی متفورمین بدون خطر ادامه می‌یابد' },
      ],
      correct: 'B',
      explanation: 'با eGFR > ۳۰ قطع متفورمین لازم نیست. خطر اسیدوز لاکتیک غیرمستقیم است: ماده حاجب → (به ندرت) AKI → تجمع متفورمین → اسیدوز. با eGFR < ۳۰ یا نارسایی حاد: ۴۸ ساعت قطع شود.',
    },
  ],
}

// ── Helper: get questions for selected themen + lang ───────────────────────
export function getQuestions(themenIds, lang, n) {
  const all = QUESTION_BANK[lang] || QUESTION_BANK.de
  // Filter: question must match at least one selected thema tag
  const tagSet = new Set(themenIds)
  const filtered = all.filter(q => q.tags.some(t => tagSet.has(t)))
  // Shuffle (Fisher-Yates)
  const shuffled = [...filtered]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  // Limit to n
  return shuffled.slice(0, n)
}
