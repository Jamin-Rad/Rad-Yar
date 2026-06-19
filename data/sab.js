// ── Subarachnoidalblutung (SAB) ───────────────────────────────────────────────
// Alle Inhalte: Lesson, MCQs, Flashcards – Schwerpunkt: Modifizierte Fisher-Skala

const L = (de, en, fa) => ({ de, en, fa })

// ── LESSON ────────────────────────────────────────────────────────────────────

export const SAB_LESSON = {
  toc: L('Inhaltsverzeichnis', 'Contents', 'فهرست مطالب'),
  breadcrumbArea: L('Kopf', 'Head', 'سر'),
  breadcrumbCurrent: L(
    'Vaskuläre Erkrankungen · Subarachnoidalblutung',
    'Vascular diseases · Subarachnoid haemorrhage',
    'بیماری‌های عروقی · خونریزی زیر عنکبوتیه'
  ),
  title: L('Subarachnoidalblutung', 'Subarachnoid Haemorrhage', 'خونریزی زیر عنکبوتیه'),
  subtitle: L(
    'CT-Diagnostik, Modifizierte Fisher-Skala und Vasospasmusprädiktion',
    'CT diagnosis, Modified Fisher Scale and vasospasm prediction',
    'تشخیص CT، مقیاس فیشر اصلاح‌شده و پیش‌بینی وازواسپاسم'
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
    { id: 'fisher', label: L('Modifizierte Fisher-Skala', 'Modified Fisher Scale', 'مقیاس فیشر اصلاح‌شده'), icon: '📊' },
    { id: 'gefaesse', label: L('Gefäßdarstellung', 'Vascular imaging', 'تصویربرداری عروقی'), icon: '🫀' },
    { id: 'komplikationen', label: L('Komplikationen', 'Complications', 'عوارض'), icon: '⚠️' },
    { id: 'takehome', label: L('Take home message', 'Take-home messages', 'نکات کلیدی'), icon: '💡' },
  ],
  heroCards: [
    {
      value: '80 %',
      label: L('Aneurysmatisch', 'Aneurysmal', 'آنوریسمی'),
      text: L(
        'Etwa 80 % aller SAB entstehen durch Ruptur eines intrakraniellen Aneurysmas.',
        'About 80 % of all SAH result from rupture of an intracranial aneurysm.',
        'حدود ۸۰٪ از SAB‌ها ناشی از پارگی آنوریسم داخل جمجمه‌ای است.'
      ),
    },
    {
      value: '~28 %',
      label: L('Vasospasmus Gr. 4', 'Vasospasm Gr. 4', 'وازواسپاسم درجه ۴'),
      text: L(
        'Fisher Grad 4 (dickes Blut + IVH) trägt das höchste Vasospasmusprisiko.',
        'Modified Fisher Grade 4 (thick SAH + IVH) carries the highest vasospasm risk.',
        'درجه ۴ فیشر (خون ضخیم + IVH) بیشترین خطر وازواسپاسم را دارد.'
      ),
    },
    {
      value: '≤ 6 h',
      label: L('CT-Sensitivität ~100 %', 'CT sensitivity ~100 %', 'حساسیت CT ~۱۰۰٪'),
      text: L(
        'Innerhalb von 6 h nach Beginn ist die CT-Sensitivität nahezu 100 %. Sie sinkt danach rasch ab.',
        'Within 6 h of onset CT sensitivity approaches 100 %, dropping rapidly thereafter.',
        'در ۶ ساعت اول از شروع علائم حساسیت CT نزدیک به ۱۰۰٪ است و سپس به سرعت کاهش می‌یابد.'
      ),
    },
  ],

  // ── Section 1: Klinik & Ätiologie ─────────────────────────────────────────
  klinik: {
    title: L('Klinik & Ätiologie', 'Clinical features & aetiology', 'تظاهرات بالینی و علت‌شناسی'),
    lead: L(
      'Die SAB ist eine Blutung in den Subarachnoidalraum. Sie macht etwa 5 % aller Schlaganfälle aus, aber rund 25 % der Schlaganfall-Todesfälle. Das Leitsymptom ist der „Vernichtungskopfschmerz" – ein plötzlicher, maximalster Kopfschmerz.',
      'SAH is bleeding into the subarachnoid space. It accounts for about 5 % of strokes but roughly 25 % of stroke deaths. The hallmark is the "thunderclap headache" — a sudden, maximally severe headache.',
      'SAB خونریزی در فضای زیر عنکبوتیه است. حدود ۵٪ از سکته‌ها را تشکیل می‌دهد اما مسئول ~۲۵٪ از مرگ‌ومیرهای ناشی از سکته است.'
    ),
    definitionItems: [
      {
        icon: '🔴',
        title: L('Vernichtungskopfschmerz', 'Thunderclap headache', 'سردرد ضربه رعد'),
        text: L(
          'Plötzlich einsetzender, maximalster Kopfschmerz – „als ob eine Bombe im Kopf explodiert". Charakteristisch für aneurysmatische SAB. Sofortiger Notfall.',
          'Sudden-onset, maximally severe headache — "worst headache of my life". Characteristic of aneurysmal SAB. Immediate emergency.',
          'سردرد ناگهانی و شدید («بدترین سردرد عمرم»). مشخصه SAB آنوریسمی. اورژانس فوری.'
        ),
      },
      {
        icon: '🤢',
        title: L('Übelkeit & Erbrechen', 'Nausea & vomiting', 'تهوع و استفراغ'),
        text: L(
          'Häufig bei akuter SAB durch Meningismus und erhöhten intrakraniellen Druck.',
          'Common in acute SAH due to meningism and raised intracranial pressure.',
          'شایع در SAB حاد به دلیل مننژیسم و افزایش فشار داخل جمجمه.'
        ),
      },
      {
        icon: '🔆',
        title: L('Meningismus', 'Meningism', 'مننژیسم'),
        text: L(
          'Nackensteifigkeit, Lichtscheu, Kernig/Brudzinski-Zeichen. Entwickelt sich typischerweise innerhalb von Stunden nach der Blutung.',
          'Neck stiffness, photophobia, Kernig/Brudzinski signs. Typically develops within hours of the bleed.',
          'سفتی گردن، فوتوفوبی، علائم کرنیگ/برودزینسکی. معمولاً چند ساعت پس از خونریزی ظاهر می‌شوند.'
        ),
      },
      {
        icon: '😵',
        title: L('Bewusstseinsstörung', 'Reduced consciousness', 'کاهش سطح هوشیاری'),
        text: L(
          'Kurze Bewusstlosigkeit zum Ictus möglich. Tiefes Koma bei massiver SAB. Bewusstseinszustand bei Aufnahme ist wichtigster Prognosefaktor (Hunt & Hess-Skala).',
          'Brief loss of consciousness at ictus possible. Deep coma in massive SAH. Level of consciousness at admission is the most important prognostic factor (Hunt & Hess scale).',
          'از دست دادن هوشیاری کوتاه در لحظه پارگی ممکن. کوما در SAB ماسیو. سطح هوشیاری مهم‌ترین عامل پروگنوستیک است.'
        ),
      },
    ],
    aetiologyHeaders: [
      L('Ursache', 'Cause', 'علت'),
      L('Anteil', 'Proportion', 'درصد'),
      L('Merkmale', 'Features', 'ویژگی‌ها'),
    ],
    aetiologyRows: [
      [
        L('Aneurysmaruptur', 'Aneurysm rupture', 'پارگی آنوریسم'),
        '~80 %',
        L(
          'Sakkuäre Aneurysmen an Gefäßgabelungen: AKoA (~30 %), MCA-Bifurkation (~25 %), PCom (~20 %), PICA (~10 %)',
          'Saccular aneurysms at bifurcations: ACoA (~30 %), MCA (~25 %), PCom (~20 %), PICA (~10 %)',
          'آنوریسم کیسه‌ای در انشعابات: ACoA (~۳۰٪)، MCA (~۲۵٪)، PCom (~۲۰٪)، PICA (~۱۰٪)'
        ),
      ],
      [
        L('Perimesenzephale SAB', 'Perimesencephalic SAH', 'SAB پری‌مزنسفالیک'),
        '~10 %',
        L(
          'Blut auf perimesenzephale Zisternen begrenzt, kein Aneurysma nachweisbar – benigne Prognose, kein Vasospasmus',
          'Blood confined to perimesencephalic cisterns, no aneurysm detected — benign prognosis, no vasospasm',
          'خون محدود به سیسترن‌های پری‌مزنسفالیک، بدون آنوریسم — پروگنوز خوش‌خیم، بدون وازواسپاسم'
        ),
      ],
      [
        L('Traumatisch', 'Traumatic', 'تروماتیک'),
        L('~5–10 %', '~5–10 %', '~۵-۱۰٪'),
        L(
          'Konvexitäres (sulkales) Blut, oft unilateral – häufigste SAB-Ursache insgesamt wenn Trauma eingerechnet',
          'Convexal (sulcal) blood, often unilateral — most common cause of SAH overall when trauma is included',
          'خون کانوکسیتال (سولکال)، اغلب یکطرفه — شایع‌ترین علت کلی SAB با احتساب تروما'
        ),
      ],
      [
        L('Kortikale SAB (cSAH)', 'Cortical SAH (cSAH)', 'SAB کورتیکال'),
        L('Selten', 'Rare', 'نادر'),
        L(
          'Bei zerebraler Amyloidangiopathie (CAA), reversibler Vasokonstriktionssyndrom (RCVS), CVST, Vaskulitis',
          'In cerebral amyloid angiopathy (CAA), reversible cerebral vasoconstriction syndrome (RCVS), CVST, vasculitis',
          'در آمیلوئید آنژیوپاتی مغزی (CAA)، RCVS، ترومبوز وریدی مغزی، واسکولیت'
        ),
      ],
    ],
    cave: L(
      'Bis zu 50 % der SAB-Patienten berichten über einen „Warnkopfschmerz" (Sentinel Headache) Tage bis Wochen vorher – ein frühes Warnsignal, das oft fälschlicherweise als Spannungskopfschmerz abgetan wird.',
      'Up to 50 % of SAH patients report a "sentinel headache" days to weeks before — an early warning often dismissed as tension headache.',
      'تا ۵۰٪ از بیماران SAB روزها تا هفته‌ها قبل «سردرد هشداردهنده» دارند که اغلب اشتباهاً سردرد تنشی تشخیص داده می‌شود.'
    ),
    key: L(
      'Jeder Vernichtungskopfschmerz ist eine SAB bis zum Beweis des Gegenteils. Sofortige CT-Bildgebung – bei negativem Befund (nach >6 h) Lumbalpunktion zum Xanthochromie-Nachweis.',
      'Every thunderclap headache is SAH until proven otherwise. Immediate CT — if negative (after >6 h) lumbar puncture to detect xanthochromia.',
      'هر سردرد ضربه رعد SAB است تا خلافش ثابت شود. CT فوری — اگر منفی (بعد از >۶ ساعت) پونکسیون لومبار برای تشخیص زانتوکرومی.'
    ),
  },

  // ── Section 2: CT-Diagnostik ───────────────────────────────────────────────
  ct: {
    title: L('CT-Diagnostik', 'CT diagnosis', 'تشخیص CT'),
    lead: L(
      'Das native CT (ohne Kontrastmittel) ist der erste und wichtigste Schritt bei Verdacht auf SAB. Frisches Blut erscheint hyperdens in den Subarachnoidalräumen und basalen Zisternen.',
      'Non-contrast CT is the first and most important step when SAH is suspected. Fresh blood appears hyperattenuating in the subarachnoid spaces and basal cisterns.',
      'CT بدون کنتراست اولین و مهم‌ترین قدم در مظنون به SAB است. خون تازه در فضاهای زیر عنکبوتیه و سیسترن‌های قاعده‌ای هایپردنس دیده می‌شود.'
    ),
    stagesHeaders: [
      L('Zeitfenster', 'Time window', 'پنجره زمانی'),
      L('CT-Sensitivität', 'CT sensitivity', 'حساسیت CT'),
      L('Empfehlung', 'Recommendation', 'توصیه'),
    ],
    stagesRows: [
      [
        L('0 – 6 Stunden', '0 – 6 hours', '۰ – ۶ ساعت'),
        '~98–100 %',
        L('CT nativ ausreichend – Goldstandard', 'NCCT alone sufficient — gold standard', 'CT بدون کنتراست کافی است — استاندارد طلایی'),
      ],
      [
        L('6 – 24 Stunden', '6 – 24 hours', '۶ – ۲۴ ساعت'),
        '~85–90 %',
        L('CT + LP bei negativem CT und starkem Verdacht', 'CT + LP if CT negative and high suspicion', 'CT + LP در صورت CT منفی و مظنون بالای بالینی'),
      ],
      [
        L('1 – 5 Tage', '1 – 5 days', '۱ – ۵ روز'),
        '~50–80 %',
        L('LP zwingend bei negativem CT; ggf. CT-Angiographie', 'LP mandatory if CT negative; consider CTA', 'LP الزامی در CT منفی؛ در نظر گرفتن CTA'),
      ],
      [
        L('> 5 Tage', '> 5 days', '> ۵ روز'),
        L('Niedrig', 'Low', 'کم'),
        L('MRT FLAIR + LP; CT oft nicht mehr sensitiv', 'MRI FLAIR + LP; CT often no longer sensitive', 'MRI FLAIR + LP؛ CT اغلب دیگر حساس نیست'),
      ],
    ],
    signItems: [
      {
        icon: '🔺',
        title: L('Hyperdens in basalen Zisternen', 'Hyperdense basal cisterns', 'هایپردنس در سیسترن‌های قاعده‌ای'),
        text: L(
          'Blut füllt Cisterna ambiens, interpeduncularis und suprasellar. Sternförmiges Muster bei massiver aneurysmatischer SAB.',
          'Blood fills the ambient, interpeduncular and suprasellar cisterns. Star-shaped pattern in massive aneurysmal SAH.',
          'خون سیسترن آمبینس، اینترپدونکولار و سوپراسلار را پر می‌کند. الگوی ستاره‌ای در SAB آنوریسمی ماسیو.'
        ),
      },
      {
        icon: '🌿',
        title: L('Sulkale/Konvexitäre Ausfüllung', 'Sulcal / convexal filling', 'پر شدن سولکوس‌ها'),
        text: L(
          'Bei traumatischer oder kortikaler SAB Blut in kortikalen Sulci – oft unilateral. Unterschied zur aneurysmatischen SAB durch Blutverteilung und Klinik.',
          'In traumatic or cortical SAH, blood in cortical sulci — often unilateral. Distinguished from aneurysmal SAH by blood distribution and clinical picture.',
          'در SAB تروماتیک یا کورتیکال، خون در سولکوس‌های قشری — اغلب یکطرفه. تمایز از SAB آنوریسمی با توزیع خون و تصویر بالینی.'
        ),
      },
      {
        icon: '🔸',
        title: L('Perimesenzephale Verteilung', 'Perimesencephalic distribution', 'توزیع پری‌مزنسفالیک'),
        text: L(
          'Blut beschränkt auf perimesenzephale Zisternen ohne Ausdehnung in Sylvische Fissur oder Interhemisphärenspalt – klassisch für benigne perimesenzephale SAB.',
          'Blood confined to perimesencephalic cisterns without extension into the Sylvian fissure or interhemispheric fissure — classic for benign perimesencephalic SAH.',
          'خون محدود به سیسترن‌های پری‌مزنسفالیک بدون انتشار به شکاف سیلویوس یا اینترهمیسفریک — کلاسیک SAB خوش‌خیم غیرآنوریسمی.'
        ),
      },
      {
        icon: '🧊',
        title: L('MRT FLAIR – sensitiv bei später SAB', 'MRI FLAIR — sensitive in late SAH', 'MRI FLAIR — حساس در SAB دیررس'),
        text: L(
          'FLAIR zeigt Blut als Hyperintensität in den Subarachnoidalräumen – sensitiver als CT nach >3 Tagen. Cave: falsch-positive FLAIR-Hyperintensität bei Sauerstoffgabe oder Meningitis.',
          'FLAIR shows blood as hyperintensity in subarachnoid spaces — more sensitive than CT after >3 days. Caution: false-positive FLAIR hyperintensity with supplemental oxygen or meningitis.',
          'FLAIR خون را به صورت هایپرانتنسیتی در فضاهای زیر عنکبوتیه نشان می‌دهد — بعد از ۳ روز حساس‌تر از CT. احتیاط: FLAIR مثبت کاذب با اکسیژن‌درمانی یا مننژیت.'
        ),
      },
    ],
    key: L(
      'CT negativ ≠ SAB ausgeschlossen! Bei starkem klinischen Verdacht und CT >6 h nach Beginn: Lumbalpunktion (Xanthochromie nach ≥2 h) oder MRT FLAIR.',
      'CT negative ≠ SAH excluded! With strong clinical suspicion and CT >6 h from onset: lumbar puncture (xanthochromia after ≥2 h) or MRI FLAIR.',
      'CT منفی = SAB رد نشده! با مظنون بالینی شدید و CT >۶ ساعت از شروع: پونکسیون لومبار (زانتوکرومی بعد از ≥۲ ساعت) یا MRI FLAIR.'
    ),
  },

  // ── Section 3: Modifizierte Fisher-Skala ──────────────────────────────────
  fisher: {
    title: L('Modifizierte Fisher-Skala', 'Modified Fisher Scale', 'مقیاس فیشر اصلاح‌شده'),
    lead: L(
      'Die Modifizierte Fisher-Skala (Claassen et al., 2001) bewertet das Ausmaß der SAB auf dem initialen CT und quantifiziert das Risiko eines symptomatischen zerebralen Vasospasmus. Zwei Parameter bestimmen den Grad: Blutdicke in den Zisternen und das Vorhandensein einer intraventrikulären Blutung (IVH).',
      'The Modified Fisher Scale (Claassen et al., 2001) grades SAH extent on the initial CT and quantifies the risk of symptomatic cerebral vasospasm. Two parameters determine the grade: blood thickness in the cisterns and the presence of intraventricular haemorrhage (IVH).',
      'مقیاس فیشر اصلاح‌شده (Claassen و همکاران، ۲۰۰۱) میزان SAB در CT اولیه را درجه‌بندی و خطر وازواسپاسم مغزی علامت‌دار را کمی می‌کند. دو پارامتر درجه را تعیین می‌کند: ضخامت خون در سیسترن‌ها و حضور خونریزی داخل بطنی (IVH).'
    ),
    tableHeaders: [
      L('Grad', 'Grade', 'درجه'),
      L('Blut-Dicke', 'Blood thickness', 'ضخامت خون'),
      L('IVH', 'IVH', 'IVH'),
      L('Vasospasmus-Risiko', 'Vasospasm risk', 'خطر وازواسپاسم'),
      L('CT-Befund', 'CT appearance', 'یافته CT'),
    ],
    tableRows: [
      [
        '0',
        L('Kein SAB', 'No SAH', 'بدون SAB'),
        L('Nein', 'No', 'خیر'),
        '~0 %',
        L('Normale Zisternen, kein Blut nachweisbar', 'Normal cisterns, no detectable blood', 'سیسترن‌های طبیعی، بدون خون قابل تشخیص'),
      ],
      [
        '1',
        L('Dünn (<1 mm)', 'Thin (<1 mm)', 'نازک (<۱ mm)'),
        L('Nein', 'No', 'خیر'),
        '~6 %',
        L('Dünne Blutschicht in Zisternen, kein Ventrikelblut', 'Thin blood layer in cisterns, no ventricular blood', 'لایه نازک خون در سیسترن‌ها، بدون خون در بطن‌ها'),
      ],
      [
        '2',
        L('Dünn (<1 mm)', 'Thin (<1 mm)', 'نازک (<۱ mm)'),
        L('Ja ✓', 'Yes ✓', 'بله ✓'),
        '~14 %',
        L('Dünne Blutschicht + Blut in ≥1 Seitenventrikel', 'Thin blood + blood in ≥1 lateral ventricle', 'لایه نازک خون + خون در ≥۱ بطن جانبی'),
      ],
      [
        '3',
        L('Dick (≥1 mm)', 'Thick (≥1 mm)', 'ضخیم (≥۱ mm)'),
        L('Nein', 'No', 'خیر'),
        '~12 %',
        L('Dicke Blutansammlung / Zisternenverfüllung, kein IVH', 'Thick blood collection / cistern filling, no IVH', 'تجمع خون ضخیم / پر شدن سیسترن، بدون IVH'),
      ],
      [
        '4',
        L('Dick (≥1 mm)', 'Thick (≥1 mm)', 'ضخیم (≥۱ mm)'),
        L('Ja ✓', 'Yes ✓', 'بله ✓'),
        '~28 %',
        L('Dicke Blutansammlung + Blut in ≥1 Seitenventrikel', 'Thick blood + blood in ≥1 lateral ventricle', 'تجمع خون ضخیم + خون در ≥۱ بطن جانبی'),
      ],
    ],
    comparisonTitle: L('Original vs. Modifizierte Fisher-Skala', 'Original vs. Modified Fisher Scale', 'مقیاس فیشر اصلی در مقابل اصلاح‌شده'),
    comparisonItems: [
      {
        icon: '📋',
        title: L('Original Fisher-Skala (1980)', 'Original Fisher Scale (1980)', 'مقیاس فیشر اصلی (۱۹۸۰)'),
        text: L(
          'Grad 1–4. Grad 3 (dickes Blut) hat das HÖCHSTE Risiko. Grad 4 (IVH/ICH) paradoxerweise weniger – kontraintuitiv und weniger präzise als die modifizierte Version.',
          'Grades 1–4. Grade 3 (thick blood) carries the HIGHEST risk. Grade 4 (IVH/ICH) paradoxically lower — counterintuitive and less precise than the modified version.',
          'درجات ۱-۴. درجه ۳ (خون ضخیم) بیشترین خطر را دارد. درجه ۴ (IVH/ICH) به طرز متناقضی کمتر — غیرمنطقی و کمتر دقیق از نسخه اصلاح‌شده.'
        ),
      },
      {
        icon: '✅',
        title: L('Modifizierte Fisher-Skala (2001)', 'Modified Fisher Scale (2001)', 'مقیاس فیشر اصلاح‌شده (۲۰۰۱)'),
        text: L(
          'Grad 0–4. Zeichnet Blutdicke UND IVH separat auf – feinere Risikoabstufung. IVH wird als eigenständiger Risikofaktor für Vasospasmus erkannt und bewertet.',
          'Grades 0–4. Records blood thickness AND IVH separately — finer risk stratification. IVH is recognised and scored as an independent risk factor for vasospasm.',
          'درجات ۰-۴. ضخامت خون و IVH را جداگانه ثبت می‌کند — طبقه‌بندی ریسک دقیق‌تر. IVH به عنوان عامل خطر مستقل برای وازواسپاسم شناخته شده است.'
        ),
      },
      {
        icon: '⚡',
        title: L('Klinische Konsequenz', 'Clinical consequence', 'پیامد بالینی'),
        text: L(
          'Grad 4 → intensiviertes Vasospasmus-Monitoring (täglicher TCD, engmaschige klinische Kontrollen), frühzeitig Nimodipin. Vasospasmus-Gipfel: Tag 4–14 nach SAB.',
          'Grade 4 → intensive vasospasm monitoring (daily TCD, close clinical checks), early nimodipine. Vasospasm peak: day 4–14 after SAH.',
          'درجه ۴ → مانیتورینگ فشرده وازواسپاسم (TCD روزانه، کنترل بالینی نزدیک)، نیمودیپین زودهنگام. اوج وازواسپاسم: روز ۴-۱۴ پس از SAB.'
        ),
      },
    ],
    cave: L(
      'Grad 2 (dünn + IVH, ~14 %) hat paradoxerweise ein HÖHERES Vasospasmusprisiko als Grad 3 (dick + kein IVH, ~12 %). Das Vorhandensein einer IVH ist ein starker unabhängiger Risikofaktor!',
      'Grade 2 (thin + IVH, ~14 %) has paradoxically HIGHER vasospasm risk than Grade 3 (thick + no IVH, ~12 %). IVH is a strong independent risk factor for vasospasm!',
      'درجه ۲ (نازک + IVH، ~۱۴٪) به طرز پارادوکسیکال خطر وازواسپاسم بالاتری از درجه ۳ (ضخیم + بدون IVH، ~۱۲٪) دارد. IVH عامل خطر مستقل و قوی است!'
    ),
    key: L(
      'Zwei Schlüsselparameter: (1) Blutdicke < 1 mm (dünn) vs. ≥ 1 mm (dick) und (2) IVH vorhanden oder nicht. Grad 4 = dick + IVH = höchstes Risiko (~28 %).',
      'Two key parameters: (1) blood thickness <1 mm (thin) vs. ≥1 mm (thick) and (2) IVH present or absent. Grade 4 = thick + IVH = highest risk (~28 %).',
      'دو پارامتر کلیدی: (۱) ضخامت خون <۱ mm (نازک) در مقابل ≥۱ mm (ضخیم) و (۲) حضور یا عدم IVH. درجه ۴ = ضخیم + IVH = بیشترین خطر (~۲۸٪).'
    ),
  },

  // ── Section 4: Gefäßdarstellung ───────────────────────────────────────────
  gefaesse: {
    title: L('Gefäßdarstellung', 'Vascular imaging', 'تصویربرداری عروقی'),
    lead: L(
      'Sobald eine SAB auf dem CT gesichert ist, muss die Ursache identifiziert werden. CT-Angiographie ist der schnelle erste Schritt. Die digitale Subtraktionsangiographie (DSA) ist der Goldstandard.',
      'Once SAH is confirmed on CT, the source must be identified. CT angiography is the fast first step. Digital subtraction angiography (DSA) is the gold standard.',
      'پس از تأیید SAB در CT، باید منشأ را شناسایی کرد. CT آنژیوگرافی قدم اول سریع است. آنژیوگرافی تفریقی دیجیتال (DSA) استاندارد طلایی است.'
    ),
    imagingItems: [
      {
        icon: '🔭',
        title: L('CT-Angiographie (CTA)', 'CT angiography (CTA)', 'CT آنژیوگرافی (CTA)'),
        text: L(
          'Sensitivität >95 % für Aneurysmen >3 mm. Schnell, nicht invasiv, sofort verfügbar. Erste Wahl zur Aneurysmasuche nach gesicherter SAB.',
          'Sensitivity >95 % for aneurysms >3 mm. Fast, non-invasive, immediately available. First choice for aneurysm detection after confirmed SAH.',
          'حساسیت >۹۵٪ برای آنوریسم‌های >۳ mm. سریع، غیرتهاجمی، فوری در دسترس. اولین انتخاب برای تشخیص آنوریسم پس از تأیید SAB.'
        ),
      },
      {
        icon: '🎯',
        title: L('DSA (Goldstandard)', 'DSA (gold standard)', 'DSA (استاندارد طلایی)'),
        text: L(
          'Invasiv, aber ermöglicht gleichzeitig interventionelle Therapie (endovaskuläres Coiling). Unerlässlich bei negativer CTA und fortbestehendem klinischem Verdacht oder bei komplexer Gefäßanatomie.',
          'Invasive, but enables simultaneous interventional treatment (endovascular coiling). Essential when CTA is negative but clinical suspicion remains, or for complex vascular anatomy.',
          'تهاجمی، اما امکان درمان مداخله‌ای همزمان (کویلینگ داخل عروقی) را فراهم می‌کند. ضروری وقتی CTA منفی است اما مظنون بالینی ادامه دارد یا آناتومی عروقی پیچیده است.'
        ),
      },
      {
        icon: '🧲',
        title: L('MR-Angiographie (MRA)', 'MR angiography (MRA)', 'MR آنژیوگرافی (MRA)'),
        text: L(
          'TOF-MRA für Follow-up behandelter Aneurysmen geeignet. In der Akutphase weniger sensitiv als CTA für Aneurysmen <3 mm. Keine Strahlung.',
          'TOF-MRA suitable for follow-up of treated aneurysms. In the acute phase less sensitive than CTA for aneurysms <3 mm. No radiation.',
          'TOF-MRA برای پیگیری آنوریسم‌های درمان‌شده مناسب است. در مرحله حاد برای آنوریسم‌های <۳ mm نسبت به CTA حساسیت کمتری دارد. بدون اشعه.'
        ),
      },
      {
        icon: '🔊',
        title: L('TCD-Monitoring (Vasospasmus)', 'TCD monitoring (vasospasm)', 'مانیتورینگ TCD (وازواسپاسم)'),
        text: L(
          'Transkranieller Doppler zur Vasospasmusdetektion ab Tag 3–4. Mittlere Flussgeschwindigkeit MCA >120 cm/s verdächtig, >200 cm/s hochgradig vasospasmussuspekt. Täglich in der Vasospasmusphase (Tag 4–14).',
          'Transcranial Doppler for vasospasm detection from day 3–4. Mean MCA flow velocity >120 cm/s suspicious, >200 cm/s highly suspect for vasospasm. Daily during the vasospasm window (day 4–14).',
          'داپلر ترانس‌کرانیال برای تشخیص وازواسپاسم از روز ۳-۴. سرعت جریان متوسط MCA >۱۲۰ cm/s مشکوک، >۲۰۰ cm/s بسیار مشکوک. روزانه در فاز وازواسپاسم (روز ۴-۱۴).'
        ),
      },
    ],
    key: L(
      'Bei klassisch perimesenzephaler Blutverteilung und negativer CTA: DSA nicht zwingend erforderlich – das Rezidivblutungsrisiko ist minimal und die Prognose gut.',
      'With a classic perimesencephalic blood distribution and negative CTA: DSA is not mandatory — rebleed risk is minimal and prognosis is good.',
      'با توزیع خون کلاسیک پری‌مزنسفالیک و CTA منفی: DSA اجباری نیست — خطر خونریزی مجدد حداقل و پروگنوز خوب است.'
    ),
  },

  // ── Section 5: Komplikationen ──────────────────────────────────────────────
  komplikationen: {
    title: L('Komplikationen', 'Complications', 'عوارض'),
    lead: L(
      'Die SAB ist nicht nur ein einmaliges Ereignis – Komplikationen in den ersten Tagen bis Wochen bestimmen Morbidität und Mortalität wesentlich.',
      'SAH is not just a one-time event — complications in the first days to weeks largely determine morbidity and mortality.',
      'SAB یک رویداد یک‌باره نیست — عوارض در روزها تا هفته‌های اول تا حد زیادی تعیین‌کننده عوارض و مرگ‌ومیر است.'
    ),
    compItems: [
      {
        icon: '💥',
        title: L('Rezidivblutung (früh)', 'Rebleeding (early)', 'خونریزی مجدد (زود)'),
        text: L(
          'Höchstes Risiko in den ersten 24 h (bis 13 %). Ohne Aneurysmabehandlung kumulatives Risiko ~50 % in 6 Monaten. Klinisch: plötzliche Verschlechterung, CT zeigt mehr Blut. → Sofortiger Aneurysmaversch luss (Coiling oder Clipping).',
          'Highest risk in the first 24 h (up to 13 %). Without aneurysm treatment cumulative risk ~50 % at 6 months. Clinically: sudden deterioration, CT shows more blood. → Immediate aneurysm occlusion (coiling or clipping).',
          'بیشترین خطر در ۲۴ ساعت اول (تا ۱۳٪). بدون درمان آنوریسم خطر تجمعی ~۵۰٪ در ۶ ماه. بالینی: بدتر شدن ناگهانی، CT خون بیشتر. → انسداد فوری آنوریسم (کویلینگ یا کلیپینگ).'
        ),
      },
      {
        icon: '🫀',
        title: L('Zerebraler Vasospasmus / DCI (spät)', 'Cerebral vasospasm / DCI (late)', 'وازواسپاسم مغزی / DCI (دیررس)'),
        text: L(
          'Tritt typischerweise zwischen Tag 4–14 auf. Kann zu verzögerter zerebraler Ischämie (DCI) führen. Risiko richtet sich nach Fisher-Grad. Prophylaxe: Nimodipin (60 mg alle 4 h, 21 Tage). Therapie: Triple-H (Hypertension, Hypervolämie, Hämodilution).',
          'Typically occurs between day 4–14. Can cause delayed cerebral ischaemia (DCI). Risk determined by Fisher grade. Prophylaxis: nimodipine (60 mg every 4 h, 21 days). Treatment: Triple-H (hypertension, hypervolaemia, haemodilution).',
          'معمولاً بین روز ۴-۱۴ رخ می‌دهد. می‌تواند به ایسکمی مغزی تأخیری (DCI) منجر شود. خطر بر اساس درجه فیشر. پروفیلاکسی: نیمودیپین (۶۰ mg هر ۴ ساعت، ۲۱ روز). درمان: Triple-H.'
        ),
      },
      {
        icon: '💧',
        title: L('Hydrozephalus', 'Hydrocephalus', 'هیدروسفالی'),
        text: L(
          'Akut (obstruktiv durch IVH) in den ersten Stunden/Tagen. Chronisch kommunizierend durch gestörte Liquorresorption Wochen später. Therapie: Externe Ventrikeldrainage (EVD) akut, VP-Shunt im Verlauf.',
          'Acute (obstructive from IVH) in the first hours/days. Chronic communicating from impaired CSF resorption weeks later. Treatment: external ventricular drainage (EVD) acutely, VP shunt later.',
          'حاد (انسدادی ناشی از IVH) در ساعات/روزهای اول. ارتباطی مزمن ناشی از اختلال جذب CSF هفته‌ها بعد. درمان: EVD در مرحله حاد، شانت VP در ادامه.'
        ),
      },
      {
        icon: '❤️',
        title: L('Neurogene Herz- und Lungenschäden', 'Neurogenic cardiac and pulmonary injury', 'آسیب قلبی-ریوی نوروژنیک'),
        text: L(
          'Katecholaminsturm bei massiver SAB → Takotsubo-Kardiomyopathie, Arrhythmien, QT-Verlängerung. Neurogenes Lungenödem möglich. EKG und Troponin bei Aufnahme und im Verlauf kontrollieren.',
          'Catecholamine surge in massive SAH → Takotsubo cardiomyopathy, arrhythmias, QT prolongation. Neurogenic pulmonary oedema possible. Monitor ECG and troponin on admission and serially.',
          'طوفان کاتکولامین در SAB ماسیو → کاردیومیوپاتی تاکوتسوبو، آریتمی، طولانی شدن QT. ادم ریوی نوروژنیک ممکن. ECG و تروپونین را در بدو پذیرش و بعداً کنترل کنید.'
        ),
      },
    ],
    cave: L(
      'Hyponatriämie durch SIADH oder Cerebral Salt Wasting (CSW) ist bei SAB häufig und verstärkt das Vasospasmusprisiko. Tägliche Elektrolytkontrollen sind Pflicht – Natrium nicht unter 135 mmol/l fallen lassen.',
      'Hyponatraemia from SIADH or Cerebral Salt Wasting (CSW) is common after SAH and worsens vasospasm risk. Daily electrolyte monitoring is mandatory — do not allow sodium to fall below 135 mmol/l.',
      'هیپوناترمی ناشی از SIADH یا Cerebral Salt Wasting (CSW) در SAB شایع و خطر وازواسپاسم را تشدید می‌کند. کنترل الکترولیت روزانه الزامی است — سدیم نباید زیر ۱۳۵ mmol/l باشد.'
    ),
    key: L(
      'Die zwei größten Komplikationen: Rezidivblutung (früh, Tag 0–1) und Vasospasmus/DCI (spät, Tag 4–14). Zeitliche Abgrenzung ist entscheidend für Therapieplanung.',
      'The two biggest complications: rebleeding (early, day 0–1) and vasospasm/DCI (late, day 4–14). Temporal distinction is crucial for treatment planning.',
      'دو عارضه اصلی: خونریزی مجدد (زود، روز ۰-۱) و وازواسپاسم/DCI (دیررس، روز ۴-۱۴). تمایز زمانی برای برنامه‌ریزی درمان حیاتی است.'
    ),
  },

  // ── Section 6: Take home messages ─────────────────────────────────────────
  takehome: {
    title: L('Take home messages', 'Take-home messages', 'نکات کلیدی'),
    lead: L(
      'Das Wichtigste auf einen Blick.',
      'The key points at a glance.',
      'نکات مهم در یک نگاه.'
    ),
    items: [
      {
        title: L('Vernichtungskopfschmerz = sofort CT', 'Thunderclap headache = immediate CT', 'سردرد ضربه رعد = CT فوری'),
        text: L(
          'Jeder plötzlich maximale Kopfschmerz ist eine SAB bis zum Beweis des Gegenteils. Kein Abwarten – sofort CT nativ.',
          'Every sudden severe headache is SAH until proven otherwise. Never wait — immediate non-contrast CT.',
          'هر سردرد ناگهانی و شدید SAB است تا خلافش ثابت شود. هرگز منتظر نمانید — CT بدون کنتراست فوری.'
        ),
      },
      {
        title: L('CT-Sensitivität kennen', 'Know CT sensitivity', 'حساسیت CT را بدانید'),
        text: L(
          'Nahezu 100 % in 0–6 h, sinkt auf ~50 % nach 5 Tagen. Negativer CT-Befund nach >6 h → Lumbalpunktion oder MRT FLAIR.',
          'Nearly 100 % at 0–6 h, drops to ~50 % after 5 days. Negative CT after >6 h → lumbar puncture or MRI FLAIR.',
          'نزدیک به ۱۰۰٪ در ۰-۶ ساعت، کاهش به ~۵۰٪ بعد از ۵ روز. CT منفی بعد از >۶ ساعت → پونکسیون لومبار یا MRI FLAIR.'
        ),
      },
      {
        title: L('Fisher-Grad bestimmen', 'Determine Fisher grade', 'درجه فیشر را تعیین کنید'),
        text: L(
          'Blutdicke (<1 mm vs. ≥1 mm) + IVH (ja/nein) → Grad 0–4. Grad 4 = dick + IVH = höchstes Vasospasmusprisiko (~28 %).',
          'Blood thickness (<1 mm vs. ≥1 mm) + IVH (yes/no) → grade 0–4. Grade 4 = thick + IVH = highest vasospasm risk (~28 %).',
          'ضخامت خون (<۱ mm در مقابل ≥۱ mm) + IVH (بله/خیر) → درجه ۰-۴. درجه ۴ = ضخیم + IVH = بیشترین خطر وازواسپاسم (~۲۸٪).'
        ),
      },
      {
        title: L('CTA sofort, dann Aneurysmaausschluss', 'CTA immediately, then exclude aneurysm', 'CTA فوری، سپس رد آنوریسم'),
        text: L(
          'CTA Sensitivität >95 % für Aneurysmen >3 mm. Perimesenzephale Blutung + negative CTA = benigne, DSA optional.',
          'CTA sensitivity >95 % for aneurysms >3 mm. Perimesencephalic blood + negative CTA = benign, DSA optional.',
          'حساسیت CTA >۹۵٪ برای آنوریسم‌های >۳ mm. خون پری‌مزنسفالیک + CTA منفی = خوش‌خیم، DSA اختیاری.'
        ),
      },
      {
        title: L('Komplikationen im Zeitfenster', 'Complications in their time windows', 'عوارض در پنجره‌های زمانی'),
        text: L(
          'Rezidivblutung Tag 0–1, Vasospasmus/DCI Tag 4–14, Hydrozephalus jederzeit, Hyponatriämie durch SIADH/CSW. Alle erfordern aktives Monitoring.',
          'Rebleed day 0–1, vasospasm/DCI day 4–14, hydrocephalus any time, hyponatraemia from SIADH/CSW. All require active monitoring.',
          'خونریزی مجدد روز ۰-۱، وازواسپاسم/DCI روز ۴-۱۴، هیدروسفالی هر زمان، هیپوناترمی. همه نیاز به مانیتورینگ فعال دارند.'
        ),
      },
    ],
  },
}

// ── MCQs ─────────────────────────────────────────────────────────────────────

const SAB_QUESTION_CONTENT = [
  {
    id: 'sab-q1',
    question: L(
      'Ein 48-jähriger Patient klagt über plötzlich einsetzenden, schwersten Kopfschmerz. Die initiale CT (45 Minuten nach Beginn) ist negativ. Was ist der nächste richtige Schritt?',
      'A 48-year-old patient reports a sudden-onset, worst-ever headache. The initial CT (45 minutes after onset) is negative. What is the correct next step?',
      'بیمار ۴۸ ساله از سردرد ناگهانی و شدیدترین سردرد عمرش شکایت دارد. CT اولیه (۴۵ دقیقه پس از شروع) منفی است. قدم بعدی چیست؟'
    ),
    options: [
      L('Patient entlassen – CT negativ schließt SAB aus', 'Discharge the patient — negative CT excludes SAH', 'ترخیص بیمار — CT منفی SAB را رد می‌کند'),
      L('Lumbalpunktion nach ≥2 h zum Xanthochromie-Nachweis', 'Lumbar puncture after ≥2 h to detect xanthochromia', 'پونکسیون لومبار بعد از ≥۲ ساعت برای تشخیص زانتوکرومی'),
      L('MRT FLAIR sofort – sensitiver als CT', 'Immediate MRI FLAIR — more sensitive than CT', 'MRI FLAIR فوری — حساس‌تر از CT'),
      L('CT-Angiographie zur Aneurysmasuche', 'CT angiography to look for an aneurysm', 'CT آنژیوگرافی برای جستجوی آنوریسم'),
    ],
    correct: 'B',
    explanation: L(
      'Innerhalb von 6 h ist die CT nahezu 100 % sensitiv, kann aber in seltenen Fällen negativ sein. Der nächste Schritt ist die Lumbalpunktion nach ≥2 h, um Xanthochromie (Hämolyse-Bilirubin) nachzuweisen. Die LP sollte nicht sofort erfolgen, da Xanthochromie Zeit braucht. CTA wäre sinnvoll bei positivem SAB-Nachweis, aber noch nicht jetzt.',
      'Within 6 h CT is nearly 100 % sensitive but can rarely be negative. The next step is lumbar puncture after ≥2 h to detect xanthochromia (from haemolysed bilirubin). LP should not be done immediately as xanthochromia needs time to develop. CTA would be appropriate after SAH is confirmed, not yet.',
      'در ۶ ساعت اول CT تقریباً ۱۰۰٪ حساس است اما به ندرت ممکن است منفی باشد. قدم بعدی پونکسیون لومبار بعد از ≥۲ ساعت برای تشخیص زانتوکرومی است. LP نباید فوری انجام شود چون زانتوکرومی به زمان نیاز دارد. CTA پس از تأیید SAB مناسب است، نه در این مرحله.'
    ),
  },
  {
    id: 'sab-q2',
    question: L(
      'Das initiale CT zeigt eine dicke Blutansammlung (≥1 mm) in den basalen Zisternen sowie Blut in beiden Seitenventrikeln. Welchem Grad der Modifizierten Fisher-Skala entspricht dieser Befund?',
      'The initial CT shows a thick blood collection (≥1 mm) in the basal cisterns with blood in both lateral ventricles. Which Modified Fisher Grade corresponds to this finding?',
      'CT اولیه تجمع خون ضخیم (≥۱ mm) در سیسترن‌های قاعده‌ای و خون در هر دو بطن جانبی نشان می‌دهد. این یافته کدام درجه مقیاس فیشر اصلاح‌شده را نشان می‌دهد؟'
    ),
    options: [
      L('Grad 1 – dünnes Blut, kein IVH', 'Grade 1 – thin blood, no IVH', 'درجه ۱ – خون نازک، بدون IVH'),
      L('Grad 2 – dünnes Blut + IVH', 'Grade 2 – thin blood + IVH', 'درجه ۲ – خون نازک + IVH'),
      L('Grad 3 – dickes Blut, kein IVH', 'Grade 3 – thick blood, no IVH', 'درجه ۳ – خون ضخیم، بدون IVH'),
      L('Grad 4 – dickes Blut + IVH', 'Grade 4 – thick blood + IVH', 'درجه ۴ – خون ضخیم + IVH'),
    ],
    correct: 'D',
    explanation: L(
      'Grad 4 der Modifizierten Fisher-Skala erfordert: (1) dickes Blut ≥1 mm in den Zisternen UND (2) IVH (Blut in mindestens einem Seitenventrikel). Dieser Grad hat das höchste Vasospasmusprisiko (~28 %).',
      'Modified Fisher Grade 4 requires: (1) thick blood ≥1 mm in the cisterns AND (2) IVH (blood in at least one lateral ventricle). This grade carries the highest vasospasm risk (~28 %).',
      'درجه ۴ فیشر اصلاح‌شده نیاز دارد: (۱) خون ضخیم ≥۱ mm در سیسترن‌ها و (۲) IVH (خون در حداقل یک بطن جانبی). این درجه بیشترین خطر وازواسپاسم (~۲۸٪) را دارد.'
    ),
  },
  {
    id: 'sab-q3',
    question: L(
      'Welches Vasospasmusprisiko haben Patienten mit Modifizierter Fisher Grad 2 (dünnes Blut + IVH) im Vergleich zu Grad 3 (dickes Blut, kein IVH)?',
      'What vasospasm risk do patients with Modified Fisher Grade 2 (thin blood + IVH) have compared with Grade 3 (thick blood, no IVH)?',
      'بیماران با درجه ۲ فیشر اصلاح‌شده (خون نازک + IVH) در مقایسه با درجه ۳ (خون ضخیم، بدون IVH) چه خطر وازواسپاسمی دارند؟'
    ),
    options: [
      L('Grad 2 hat niedrigeres Risiko (~6 %) als Grad 3 (~12 %)', 'Grade 2 has lower risk (~6 %) than Grade 3 (~12 %)', 'درجه ۲ خطر کمتری (~۶٪) نسبت به درجه ۳ (~۱۲٪) دارد'),
      L('Beide Grade haben identisches Risiko (~12 %)', 'Both grades have identical risk (~12 %)', 'هر دو درجه خطر یکسانی (~۱۲٪) دارند'),
      L('Grad 2 hat HÖHERES Risiko (~14 %) als Grad 3 (~12 %)', 'Grade 2 has HIGHER risk (~14 %) than Grade 3 (~12 %)', 'درجه ۲ خطر بالاتری (~۱۴٪) نسبت به درجه ۳ (~۱۲٪) دارد'),
      L('Grad 3 hat immer höheres Risiko als Grad 2', 'Grade 3 always has higher risk than Grade 2', 'درجه ۳ همیشه خطر بالاتری از درجه ۲ دارد'),
    ],
    correct: 'C',
    explanation: L(
      'Paradoxerweise hat Grad 2 (dünn + IVH, ~14 %) ein höheres Vasospasmusprisiko als Grad 3 (dick, kein IVH, ~12 %). Das liegt daran, dass die IVH ein starker unabhängiger Risikofaktor für Vasospasmus ist – unabhängig von der Blutmenge in den Zisternen.',
      'Paradoxically, Grade 2 (thin + IVH, ~14 %) has higher vasospasm risk than Grade 3 (thick, no IVH, ~12 %). This is because IVH is a strong independent risk factor for vasospasm, independent of blood volume in the cisterns.',
      'به طرز پارادوکسیکال، درجه ۲ (نازک + IVH، ~۱۴٪) خطر وازواسپاسم بالاتری از درجه ۳ (ضخیم، بدون IVH، ~۱۲٪) دارد. این به این دلیل است که IVH عامل خطر مستقل قوی برای وازواسپاسم است.'
    ),
  },
  {
    id: 'sab-q4',
    question: L(
      'Eine 62-jährige Patientin erleidet eine SAB. Das CT zeigt eine klassisch perimesenzephale Blutung. Die CTA ist negativ. Was ist die richtige Einschätzung?',
      'A 62-year-old woman suffers SAH. CT shows a classic perimesencephalic blood pattern. CTA is negative. What is the correct assessment?',
      'خانم ۶۲ ساله‌ای دچار SAB می‌شود. CT الگوی خونریزی کلاسیک پری‌مزنسفالیک نشان می‌دهد. CTA منفی است. ارزیابی صحیح چیست؟'
    ),
    options: [
      L('DSA zwingend erforderlich – CTA reicht nie aus', 'DSA mandatory — CTA is never sufficient', 'DSA اجباری است — CTA هرگز کافی نیست'),
      L('Benigne Prognose; DSA nicht zwingend, da Rezidivblutungsrisiko minimal', 'Benign prognosis; DSA not mandatory as rebleed risk is minimal', 'پروگنوز خوش‌خیم؛ DSA اجباری نیست چون خطر خونریزی مجدد حداقل است'),
      L('Sofortige neurochirurgische Intervention erforderlich', 'Immediate neurosurgical intervention required', 'مداخله جراحی اعصاب فوری لازم است'),
      L('Intensiviertes Vasospasmusmonitoring ab Tag 4 notwendig', 'Intensive vasospasm monitoring from day 4 required', 'مانیتورینگ فشرده وازواسپاسم از روز ۴ لازم است'),
    ],
    correct: 'B',
    explanation: L(
      'Die perimesenzephale SAB ist eine eigenständige Entität mit exzellenter Prognose. Wenn die Blutung auf die perimesenzephalen Zisternen begrenzt ist und die CTA kein Aneurysma zeigt, ist das Rezidivblutungsrisiko sehr gering und die Prognose gut. DSA ist in dieser Situation nicht zwingend erforderlich. Vasospasmus ist bei perimesenzephaler SAB selten.',
      'Perimesencephalic SAH is a distinct entity with excellent prognosis. When blood is confined to perimesencephalic cisterns and CTA shows no aneurysm, rebleed risk is very low and prognosis is good. DSA is not mandatory in this situation. Vasospasm is rare in perimesencephalic SAH.',
      'SAB پری‌مزنسفالیک یک موجودیت مستقل با پروگنوز عالی است. وقتی خون محدود به سیسترن‌های پری‌مزنسفالیک است و CTA آنوریسمی نشان نمی‌دهد، خطر خونریزی مجدد بسیار کم و پروگنوز خوب است. DSA در این وضعیت اجباری نیست. وازواسپاسم در SAB پری‌مزنسفالیک نادر است.'
    ),
  },
  {
    id: 'sab-q5',
    question: L(
      'In welchem Zeitfenster nach aneurysmatischer SAB ist das Risiko eines zerebralen Vasospasmus am höchsten?',
      'In which time window after aneurysmal SAH is the risk of cerebral vasospasm highest?',
      'در کدام پنجره زمانی پس از SAB آنوریسمی خطر وازواسپاسم مغزی بیشترین است؟'
    ),
    options: [
      L('0–24 Stunden nach SAB', '0–24 hours after SAH', '۰-۲۴ ساعت پس از SAB'),
      L('Tag 1–3 nach SAB', 'Day 1–3 after SAH', 'روز ۱-۳ پس از SAB'),
      L('Tag 4–14 nach SAB', 'Day 4–14 after SAH', 'روز ۴-۱۴ پس از SAB'),
      L('Tag 15–21 nach SAB', 'Day 15–21 after SAH', 'روز ۱۵-۲۱ پس از SAB'),
    ],
    correct: 'C',
    explanation: L(
      'Der zerebrale Vasospasmus tritt typischerweise zwischen Tag 4 und 14 nach SAB auf, mit einem Gipfel um Tag 7–10. In dieser Phase ist ein tägliches TCD-Monitoring sowie eine enge klinische Überwachung unter laufender Nimodipin-Therapie essenziell.',
      'Cerebral vasospasm typically occurs between day 4 and 14 after SAH, with a peak around day 7–10. During this phase daily TCD monitoring and close clinical observation under ongoing nimodipine therapy are essential.',
      'وازواسپاسم مغزی معمولاً بین روز ۴ تا ۱۴ پس از SAB رخ می‌دهد، با اوج در حدود روز ۷-۱۰. در این فاز مانیتورینگ TCD روزانه و نظارت بالینی نزدیک تحت درمان نیمودیپین ضروری است.'
    ),
  },
  {
    id: 'sab-q6',
    question: L(
      'Welches Aneurysma ist bei der aneurysmatischen SAB am häufigsten für die Blutung verantwortlich?',
      'Which aneurysm is most commonly responsible for haemorrhage in aneurysmal SAH?',
      'کدام آنوریسم بیشترین مسئولیت خونریزی را در SAB آنوریسمی دارد؟'
    ),
    options: [
      L('A. cerebri media (MCA) Bifurkation', 'Middle cerebral artery (MCA) bifurcation', 'انشعاب شریان مغزی میانی (MCA)'),
      L('A. communicans anterior (AKoA)', 'Anterior communicating artery (ACoA)', 'شریان ارتباطی قدامی (ACoA)'),
      L('A. communicans posterior (PCom)', 'Posterior communicating artery (PCom)', 'شریان ارتباطی خلفی (PCom)'),
      L('A. cerebelli posterior inferior (PICA)', 'Posterior inferior cerebellar artery (PICA)', 'شریان مخچه‌ای خلفی-تحتانی (PICA)'),
    ],
    correct: 'B',
    explanation: L(
      'Aneurysmen der A. communicans anterior (AKoA) sind mit ~30 % die häufigste Ursache der aneurysmatischen SAB. Gefolgt von MCA-Bifurkation (~25 %) und A. communicans posterior (~20 %). PICA-Aneurysmen (~10 %) verursachen Blutungen in der hinteren Schädelgrube.',
      'Anterior communicating artery (ACoA) aneurysms are the most common cause of aneurysmal SAH at ~30 %, followed by MCA bifurcation (~25 %) and posterior communicating artery (~20 %). PICA aneurysms (~10 %) cause bleeds in the posterior fossa.',
      'آنوریسم‌های شریان ارتباطی قدامی (ACoA) با ~۳۰٪ شایع‌ترین علت SAB آنوریسمی هستند. پس از آن انشعاب MCA (~۲۵٪) و شریان ارتباطی خلفی (~۲۰٪). آنوریسم‌های PICA (~۱۰٪) باعث خونریزی در حفره خلفی می‌شوند.'
    ),
  },
]

export const SAB_QUESTIONS = (lang = 'de') => ([
  ...SAB_QUESTION_CONTENT.map(item => ({
    id: item.id,
    tags: ['subarachnoidalblutung', 'fisher-skala'],
    fach: 'gehirn',
    question: item.question[lang] || item.question.de,
    options: item.options.map((opt, i) => ({
      id: ['A', 'B', 'C', 'D'][i],
      text: (opt[lang] || opt.de),
    })),
    correct: item.correct,
    explanation: item.explanation[lang] || item.explanation.de,
  })),
])

// ── FLASHCARDS ────────────────────────────────────────────────────────────────

export const SAB_FLASHCARD_TOPIC = {
  id: 'subarachnoidalblutung',
  area: L('Gehirn', 'Brain', 'مغز'),
  chapter: L('Vaskuläre Erkrankungen', 'Vascular diseases', 'بیماری‌های عروقی'),
  icon: '🩸',
  iconImage: '/fach/gehirn.png',
  color: '#b91c1c',
  href: '/flashcards/subarachnoidalblutung',
  title: L('Subarachnoidalblutung', 'Subarachnoid Haemorrhage', 'خونریزی زیر عنکبوتیه'),
  subtitle: L(
    'CT-Diagnostik · Modif. Fisher-Skala · Vasospasmus · Komplikationen',
    'CT diagnosis · Modif. Fisher Scale · vasospasm · complications',
    'تشخیص CT · مقیاس فیشر اصلاح‌شده · وازواسپاسم · عوارض'
  ),
}

export const SAB_FLASHCARDS = [
  {
    id: 'sab-fc-1',
    front: L(
      'Was sind die zwei Parameter der Modifizierten Fisher-Skala?',
      'What are the two parameters of the Modified Fisher Scale?',
      'دو پارامتر مقیاس فیشر اصلاح‌شده کدامند؟'
    ),
    back: L(
      '1. Blutdicke (dünn < 1 mm / dick ≥ 1 mm)  2. IVH (ja / nein)',
      '1. Blood thickness (thin < 1 mm / thick ≥ 1 mm)  2. IVH (yes / no)',
      '۱. ضخامت خون (نازک < ۱mm / ضخیم ≥ ۱mm)  ۲. IVH (بله / خیر)'
    ),
    explanation: L(
      'Aus diesen zwei Parametern ergibt sich Grad 0–4. Grad 0 = kein SAB (~0 %), Grad 1 = dünn, kein IVH (~6 %), Grad 2 = dünn + IVH (~14 %), Grad 3 = dick, kein IVH (~12 %), Grad 4 = dick + IVH (~28 %).',
      'These two parameters determine grade 0–4. Grade 0 = no SAH (~0 %), Grade 1 = thin, no IVH (~6 %), Grade 2 = thin + IVH (~14 %), Grade 3 = thick, no IVH (~12 %), Grade 4 = thick + IVH (~28 %).',
      'از این دو پارامتر درجه ۰-۴ تعیین می‌شود. درجه ۰ = بدون SAB (~۰٪)، درجه ۱ = نازک، بدون IVH (~۶٪)، درجه ۲ = نازک + IVH (~۱۴٪)، درجه ۳ = ضخیم، بدون IVH (~۱۲٪)، درجه ۴ = ضخیم + IVH (~۲۸٪).'
    ),
    diagram: L(
      'Blutdicke messen → dünn / dick → IVH? ja/nein → Grad 0–4',
      'Measure blood thickness → thin / thick → IVH? yes/no → Grade 0–4',
      'ضخامت خون → نازک / ضخیم → IVH؟ بله/خیر → درجه ۰–۴'
    ),
    topicId: 'subarachnoidalblutung',
    tags: ['fisher-skala', 'vasospasmus'],
  },
  {
    id: 'sab-fc-2',
    front: L(
      'Welcher Modifizierter Fisher Grad hat das höchste Vasospasmusrisiko?',
      'Which Modified Fisher Grade carries the highest vasospasm risk?',
      'کدام درجه فیشر اصلاح‌شده بیشترین خطر وازواسپاسم را دارد؟'
    ),
    back: L(
      'Grad 4 (dick + IVH) → ~28 %',
      'Grade 4 (thick + IVH) → ~28 %',
      'درجه ۴ (ضخیم + IVH) → ~۲۸٪'
    ),
    explanation: L(
      'Grad 4 kombiniert beide Risikofaktoren: dickes Blut (≥1 mm) UND IVH. Das ergibt das höchste Vasospasmusrisiko. Zum Vergleich: Grad 0 ~0 %, Grad 1 ~6 %, Grad 2 ~14 %, Grad 3 ~12 %.',
      'Grade 4 combines both risk factors: thick blood (≥1 mm) AND IVH — giving the highest vasospasm risk. Comparison: Grade 0 ~0 %, Grade 1 ~6 %, Grade 2 ~14 %, Grade 3 ~12 %.',
      'درجه ۴ هر دو عامل خطر را دارد: خون ضخیم (≥۱ mm) و IVH — بیشترین خطر وازواسپاسم. مقایسه: درجه ۰ ~۰٪، درجه ۱ ~۶٪، درجه ۲ ~۱۴٪، درجه ۳ ~۱۲٪.'
    ),
    diagram: L(
      'Gr.0: ~0% → Gr.1: ~6% → Gr.2: ~14% → Gr.3: ~12% → Gr.4: ~28%',
      'Gr.0: ~0% → Gr.1: ~6% → Gr.2: ~14% → Gr.3: ~12% → Gr.4: ~28%',
      'Gr.0: ~۰٪ → Gr.1: ~۶٪ → Gr.2: ~۱۴٪ → Gr.3: ~۱۲٪ → Gr.4: ~۲۸٪'
    ),
    topicId: 'subarachnoidalblutung',
    tags: ['fisher-skala', 'vasospasmus'],
  },
  {
    id: 'sab-fc-3',
    front: L(
      'Warum hat Fisher Grad 2 (~14 %) ein HÖHERES Vasospasmusrisiko als Grad 3 (~12 %)?',
      'Why does Fisher Grade 2 (~14 %) have HIGHER vasospasm risk than Grade 3 (~12 %)?',
      'چرا درجه ۲ فیشر (~۱۴٪) خطر وازواسپاسم بالاتری از درجه ۳ (~۱۲٪) دارد؟'
    ),
    back: L(
      'IVH ist ein unabhängiger Risikofaktor – schwerer als Blutdicke allein.',
      'IVH is an independent risk factor — weighs heavier than blood thickness alone.',
      'IVH عامل خطر مستقل است — مهم‌تر از ضخامت خون به تنهایی.'
    ),
    explanation: L(
      'Grad 2 = dünn + IVH. Grad 3 = dick, KEIN IVH. Die IVH erhöht das Vasospasmusrisiko unabhängig von der Blutmenge. Daher schlägt Grad 2 (~14 %) trotz weniger Blut den Grad 3 (~12 %) – ein paradoxes, aber gut belegtes Phänomen.',
      'Grade 2 = thin + IVH. Grade 3 = thick, NO IVH. IVH raises vasospasm risk independently of blood volume. Hence Grade 2 (~14 %) beats Grade 3 (~12 %) despite less blood — a paradoxical but well-documented finding.',
      'درجه ۲ = نازک + IVH. درجه ۳ = ضخیم، بدون IVH. IVH خطر وازواسپاسم را مستقل از حجم خون افزایش می‌دهد. بنابراین درجه ۲ (~۱۴٪) با خون کمتر از درجه ۳ (~۱۲٪) پیشی می‌گیرد.'
    ),
    diagram: L(
      'Grad 2: dünn + IVH → ~14%\nGrad 3: dick + kein IVH → ~12%',
      'Grade 2: thin + IVH → ~14%\nGrade 3: thick + no IVH → ~12%',
      'درجه ۲: نازک + IVH → ~۱۴٪\nدرجه ۳: ضخیم + بدون IVH → ~۱۲٪'
    ),
    topicId: 'subarachnoidalblutung',
    tags: ['fisher-skala', 'vasospasmus'],
  },
  {
    id: 'sab-fc-4',
    front: L(
      'Wie sensitiv ist die CT bei SAB in den ersten 6 h und was tun bei negativem Befund?',
      'How sensitive is CT for SAH within the first 6 h, and what to do if negative?',
      'حساسیت CT در SAB در ۶ ساعت اول چقدر است و در صورت منفی بودن چه کنیم؟'
    ),
    back: L(
      '0–6 h: ~100 %. CT negativ + V.a. SAB → LP nach ≥ 2 h (Xanthochromie).',
      '0–6 h: ~100 %. CT negative + SAH suspicion → LP after ≥ 2 h (xanthochromia).',
      '۰-۶ ساعت: ~۱۰۰٪. CT منفی + مظنون به SAB → LP بعد از ≥۲ ساعت (زانتوکرومی).'
    ),
    explanation: L(
      'Die CT-Sensitivität sinkt: ~85 % nach 24 h, ~50 % nach 5 Tagen. Xanthochromie (gelb-orange Verfärbung des Liquors durch Hämolyseprodukte) ist nach ≥2 h beweisend für SAB. Alternativ: MRT FLAIR.',
      'CT sensitivity drops: ~85 % at 24 h, ~50 % after 5 days. Xanthochromia (yellow-orange CSF discolouration from haemolysis products) is diagnostic after ≥2 h. Alternative: MRI FLAIR.',
      'حساسیت CT کاهش می‌یابد: ~۸۵٪ بعد از ۲۴ ساعت، ~۵۰٪ بعد از ۵ روز. زانتوکرومی (رنگ زرد-نارنجی CSF از محصولات همولیز) بعد از ≥۲ ساعت تشخیصی است. جایگزین: MRI FLAIR.'
    ),
    diagram: L(
      '0–6 h: ~100% → 24 h: ~85% → 5 Tage: ~50%',
      '0–6 h: ~100% → 24 h: ~85% → 5 days: ~50%',
      '۰-۶ ساعت: ~۱۰۰٪ → ۲۴ ساعت: ~۸۵٪ → ۵ روز: ~۵۰٪'
    ),
    topicId: 'subarachnoidalblutung',
    tags: ['ct-diagnostik'],
  },
  {
    id: 'sab-fc-5',
    front: L(
      'Was ist die perimesenzephale SAB und was folgt daraus?',
      'What is perimesencephalic SAH and what does it imply?',
      'SAB پری‌مزنسفالیک چیست و چه پیامدی دارد؟'
    ),
    back: L(
      'Blut nur perimesenzephal, kein Aneurysma – benigne Prognose, DSA nicht zwingend.',
      'Blood only perimesencephalic, no aneurysm — benign prognosis, DSA not mandatory.',
      'خون فقط پری‌مزنسفالیک، بدون آنوریسم — پروگنوز خوش‌خیم، DSA اجباری نیست.'
    ),
    explanation: L(
      'CT: Blut begrenzt auf Zisternen um das Mesenzephalon, OHNE Ausdehnung in Sylvische Fissur. CTA meist negativ (~90 %). Kein Vasospasmus, kein Rezidivblutungsrisiko. Bei typischem CT-Muster + negativer CTA ist DSA optional.',
      'CT: blood confined to cisterns around the mesencephalon, WITHOUT extension to the Sylvian fissure. CTA usually negative (~90 %). No vasospasm, no rebleed risk. With classic CT pattern + negative CTA, DSA is optional.',
      'CT: خون محدود به سیسترن‌های اطراف مزنسفال، بدون انتشار به شکاف سیلویوس. CTA اغلب منفی (~۹۰٪). بدون وازواسپاسم، بدون خطر خونریزی مجدد. با الگوی CT کلاسیک + CTA منفی، DSA اختیاری است.'
    ),
    diagram: L(
      'CT perimesenzephal → CTA negativ → kein Aneurysma → DSA optional → exzellente Prognose',
      'CT perimesencephalic → CTA negative → no aneurysm → DSA optional → excellent prognosis',
      'CT پری‌مزنسفالیک → CTA منفی → بدون آنوریسم → DSA اختیاری → پروگنوز عالی'
    ),
    topicId: 'subarachnoidalblutung',
    tags: ['aetiologie', 'ct-diagnostik'],
  },
  {
    id: 'sab-fc-6',
    front: L(
      'Die zwei gefährlichsten SAB-Komplikationen und ihr Zeitpunkt?',
      'The two most dangerous SAH complications and their timing?',
      'دو عارضه خطرناک SAB و زمان آن‌ها؟'
    ),
    back: L(
      'Rezidivblutung (Tag 0–1) und Vasospasmus/DCI (Tag 4–14).',
      'Rebleeding (day 0–1) and vasospasm/DCI (day 4–14).',
      'خونریزی مجدد (روز ۰–۱) و وازواسپاسم/DCI (روز ۴–۱۴).'
    ),
    explanation: L(
      'Rezidivblutung: bis 13 % in 24 h → sofortiger Aneurysma-Verschluss (Coiling/Clipping). Vasospasmus: Gipfel Tag 7–10 → Nimodipin 60 mg alle 4 h × 21 Tage. Beide Komplikationen haben klare Zeitfenster.',
      'Rebleeding: up to 13 % in 24 h → immediate aneurysm occlusion (coiling/clipping). Vasospasm: peak day 7–10 → nimodipine 60 mg every 4 h × 21 days. Both complications have clear time windows.',
      'خونریزی مجدد: تا ۱۳٪ در ۲۴ ساعت → انسداد فوری آنوریسم (کویلینگ/کلیپینگ). وازواسپاسم: اوج روز ۷-۱۰ → نیمودیپین ۶۰ mg هر ۴ ساعت × ۲۱ روز.'
    ),
    diagram: L(
      'Tag 0–1: Rezidivblutung → Tag 4–14: Vasospasmus/DCI',
      'Day 0–1: Rebleeding → Day 4–14: Vasospasm/DCI',
      'روز ۰–۱: خونریزی مجدد → روز ۴–۱۴: وازواسپاسم/DCI'
    ),
    topicId: 'subarachnoidalblutung',
    tags: ['komplikationen'],
  },
  {
    id: 'sab-fc-7',
    front: L(
      'Was ist der „Vernichtungskopfschmerz" und warum ist er ein Notfall?',
      'What is the "thunderclap headache" and why is it an emergency?',
      '«سردرد ضربه رعد» چیست و چرا اورژانس است؟'
    ),
    back: L(
      'Plötzlich einsetzender, maximalster Kopfschmerz (Sekunden) – SAB bis Beweis des Gegenteils.',
      'Sudden-onset, maximally severe headache (seconds to peak) — SAH until proven otherwise.',
      'سردرد ناگهانی و شدیدترین (ثانیه‌ها) — SAB تا اثبات خلاف.'
    ),
    explanation: L(
      'Differenzialdiagnosen: SAB (häufigste lebensbedrohliche Ursache), RCVS, Arteriendissektion, Zerebrale Venenthrombose, Hypertensive Krise, Migräne (Ausschluss). Sofortmaßnahme: CT nativ → bei negativem Befund LP.',
      'Differential diagnoses: SAH (most common life-threatening cause), RCVS, arterial dissection, cerebral venous thrombosis, hypertensive crisis, migraine (exclusion). Immediate action: non-contrast CT → if negative, LP.',
      'تشخیص افتراقی: SAB (شایع‌ترین علت تهدیدکننده حیات)، RCVS، دیسکسیون شریانی، ترومبوز وریدی مغزی، بحران هیپرتانسیو، میگرن. اقدام فوری: CT بدون کنتراست → در صورت منفی LP.'
    ),
    topicId: 'subarachnoidalblutung',
    tags: ['klinik'],
  },
  {
    id: 'sab-fc-8',
    front: L(
      'Was ist der „Sentinel Headache" und welche Gefahr birgt er?',
      'What is the "sentinel headache" and what danger does it carry?',
      '«Sentinel Headache» چیست و چه خطری دارد؟'
    ),
    back: L(
      'Warnkopfschmerz Tage–Wochen vor der SAB, bei ~50 % der Patienten – oft verkannt.',
      'Warning headache days–weeks before SAH, in ~50 % of patients — often missed.',
      'سردرد هشداردهنده روزها-هفته‌ها قبل از SAB، در ~۵۰٪ بیماران — اغلب نادیده گرفته می‌شود.'
    ),
    explanation: L(
      'Ursache: Minor leak oder Aneurysmaexpansion. Wird häufig als Spannungskopfschmerz fehlgedeutet → verzögerte Diagnose → katastrophale Rezidivblutung. Konsequenz: Jeden plötzlichen starken Kopfschmerz abklären.',
      'Cause: minor leak or aneurysm expansion. Often misdiagnosed as tension headache → delayed diagnosis → catastrophic rebleed. Consequence: investigate every sudden severe headache.',
      'علت: خونریزی جزئی یا گسترش آنوریسم. اغلب سردرد تنشی تشخیص داده می‌شود → تشخیص تأخیری → خونریزی مجدد فاجعه‌آمیز. هر سردرد ناگهانی شدید را بررسی کنید.'
    ),
    diagram: L(
      'Aneurysmaexpansion → Sentinel Headache → verkannt → große SAB',
      'Aneurysm expansion → Sentinel Headache → missed → major SAH',
      'گسترش آنوریسم → Sentinel Headache → نادیده گرفته → SAB بزرگ'
    ),
    topicId: 'subarachnoidalblutung',
    tags: ['klinik'],
  },
]
