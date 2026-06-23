const L = (de, en, fa) => ({ de, en, fa })

export const MTA_LESSON = {
  id: 'mta-score',
  title: L('MTA-Score', 'MTA Score', 'امتیاز MTA'),
  definition: L(
    'Visuelles MRT-Rating-System zur standardisierten Beurteilung der medialen Temporalatrophie – insbesondere des Hippocampus – als bildgebender Marker der Alzheimer-Erkrankung.',
    "Visual MRI rating system for standardised assessment of medial temporal atrophy — especially hippocampal atrophy — as an imaging marker of Alzheimer's disease.",
    'سیستم امتیازدهی بصری MRI برای ارزیابی استاندارد آتروفی گیجگاهی مدیال — به‌ویژه آتروفی هیپوکامپ — به عنوان نشانگر تصویربرداری بیماری آلزهایمر.'
  ),
  breadcrumb: L('MTA-Score', 'MTA Score', 'امتیاز MTA'),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key Point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Caution', 'هشدار'),
  toc: L('Inhalt', 'Contents', 'فهرست'),

  radiopaediaCase: {
    id: 42027,
    url: 'https://radiopaedia.org/cases/42027/play',
    src: '/mta-score/mta-score-rid42027.jpg',
    caption: L(
      'MTA-Score 0–4 nach Scheltens – koronale T1-Schnitte auf Höhe des Mammillarkörpers (rID: 42027)',
      'MTA score 0–4 per Scheltens – coronal T1 slices at mamillary body level (rID: 42027)',
      'امتیاز MTA ۰–۴ طبق شلتنز – برش‌های T1 کرونال در سطح جسم ماميلار (rID: 42027)'
    ),
    credit: 'Radiopaedia.org, rID: 42027',
  },

  heroCards: [
    {
      value: L('0–4', '0–4', '۰–۴'),
      label: L('Scheltens-Skala', 'Scheltens scale', 'مقیاس شلتنز'),
      text: L('pro Hemisphäre, visuell bewertet', 'per hemisphere, visually rated', 'به ازای هر نیمکره، ارزیابی بصری'),
    },
    {
      value: L('T1 koronar', 'T1 coronal', 'T1 کرونال'),
      label: L('Standardsequenz', 'Standard sequence', 'سکانس استاندارد'),
      text: L('senkrecht zur Hippocampusachse', 'perpendicular to hippocampal axis', 'عمود بر محور هیپوکامپ'),
    },
    {
      value: L('≥ 2', '≥ 2', '≥ ۲'),
      label: L('Grenzwert < 75 J.', 'Threshold < 75 yr', 'آستانه < ۷۵ سال'),
      text: L('altersabhängig adjustiert', 'age-adjusted threshold', 'آستانه تنظیم‌شده بر اساس سن'),
    },
  ],

  sections: [
    { id: 'grundlagen', icon: '📌', label: L('Grundlagen', 'Basics', 'اساسیات') },
    { id: 'technik', icon: '🧲', label: L('MRT-Technik', 'MRI Technique', 'تکنیک MRI') },
    { id: 'score', icon: '📊', label: L('Scorewerte 0–4', 'Score Values 0–4', 'مقادیر امتیاز ۰–۴'), emphasis: true },
    { id: 'grenzwerte', icon: '🎯', label: L('Alterskorrigierte Grenzwerte', 'Age-Adjusted Thresholds', 'آستانه‌های سنی'), emphasis: true },
    { id: 'interpretation', icon: '🩺', label: L('Interpretation', 'Interpretation', 'تفسیر') },
    { id: 'takehome', icon: '✅', label: L('Take-home', 'Take-home', 'جمع‌بندی') },
  ],

  grundlagen: {
    title: L('Grundlagen & Hintergrund', 'Basics & Background', 'اساسیات و پیش‌زمینه'),
    lead: L(
      'Der MTA-Score (Medial Temporal Atrophy Score) wurde 1992 von Scheltens et al. entwickelt und ist die am weitesten verbreitete visuelle Bewertungsskala für hippocampale Atrophie im MRT.',
      'The MTA score (Medial Temporal Atrophy score) was developed by Scheltens et al. in 1992 and is the most widely used visual rating scale for hippocampal atrophy on MRI.',
      'امتیاز MTA (آتروفی گیجگاهی مدیال) در سال ۱۹۹۲ توسط شلتنز و همکاران توسعه یافت و پرکاربردترین مقیاس امتیازدهی بصری برای آتروفی هیپوکامپ در MRI است.'
    ),
    items: [
      {
        icon: '🧠',
        title: L('Was wird bewertet?', 'What is assessed?', 'چه چیزی ارزیابی می‌شود؟'),
        text: L(
          'Die Atrophie der medialen Temporalstrukturen: Hippocampus, entorhinaler Kortex und parahippocampaler Gyrus – die ersten Strukturen, die bei Alzheimer degenerieren.',
          "Atrophy of medial temporal structures: hippocampus, entorhinal cortex and parahippocampal gyrus — the first structures to degenerate in Alzheimer's disease.",
          'آتروفی ساختارهای گیجگاهی مدیال: هیپوکامپ، کورتکس انتورینال و ژیروس پاراهیپوکامپال — اولین ساختارهایی که در آلزهایمر تحلیل می‌روند.'
        ),
      },
      {
        icon: '📏',
        title: L('Drei Messparameter', 'Three measurement parameters', 'سه پارامتر اندازه‌گیری'),
        text: L(
          '1. Breite des Sulcus choroideus (Plexusfurche). 2. Breite des Temporalhorns des Seitenventrikels. 3. Höhe des Hippocampuskörpers.',
          '1. Width of the choroid fissure. 2. Width of the temporal horn of the lateral ventricle. 3. Height of the hippocampal body.',
          '۱. عرض شیار کورویید (شیار شبکه). ۲. عرض شاخ گیجگاهی بطن جانبی. ۳. ارتفاع جسم هیپوکامپ.'
        ),
      },
      {
        icon: '🔬',
        title: L('Klinische Bedeutung', 'Clinical significance', 'اهمیت بالینی'),
        text: L(
          'Validierter Bildgebungsmarker für Alzheimer-assoziierte Atrophie. Fließt in die Diagnose nach IWG-2- und NIA-AA-Kriterien ein. Nicht pathognomonisch – auch bei anderen Demenzen erhöht.',
          'Validated imaging marker for Alzheimer-associated atrophy. Incorporated into IWG-2 and NIA-AA diagnostic criteria. Not pathognomonic — also elevated in other dementias.',
          'نشانگر تصویربرداری معتبر برای آتروفی مرتبط با آلزهایمر. در معیارهای تشخیصی IWG-2 و NIA-AA گنجانده شده است. پاتوگنومونیک نیست — در سایر دمانس‌ها نیز بالا می‌رود.'
        ),
      },
      {
        icon: '⚙️',
        title: L('Bewertungsmethode', 'Rating method', 'روش امتیازدهی'),
        text: L(
          'Visuelle Beurteilung durch den Radiologen auf einer 5-Punkte-Skala (0–4). Jede Seite wird separat bewertet. Die Skala ist ordinalskaliert, nicht intervallskaliert.',
          'Visual assessment by the radiologist on a 5-point scale (0–4). Each side is rated separately. The scale is ordinal, not interval.',
          'ارزیابی بصری توسط رادیولوژیست بر روی مقیاس ۵ نقطه‌ای (۰–۴). هر طرف جداگانه ارزیابی می‌شود. مقیاس ترتیبی است، نه فاصله‌ای.'
        ),
      },
    ],
    key: L(
      'MTA-Score = visuelle Beurteilung von Sulcus choroideus + Temporalhorn + Hippocampushöhe auf einer 0–4-Skala pro Hemisphäre. Jede Seite separat bewerten.',
      'MTA score = visual assessment of choroid fissure + temporal horn + hippocampal height on a 0–4 scale per hemisphere. Rate each side separately.',
      'امتیاز MTA = ارزیابی بصری شیار کورویید + شاخ گیجگاهی + ارتفاع هیپوکامپ بر مقیاس ۰–۴ به ازای هر نیمکره. هر طرف را جداگانه ارزیابی کنید.'
    ),
  },

  technik: {
    title: L('MRT-Technik & Bewertungsebene', 'MRI Technique & Rating Plane', 'تکنیک MRI و صفحه ارزیابی'),
    lead: L(
      'Die korrekte Bildgebungsebene ist entscheidend für eine reliable MTA-Bewertung.',
      'The correct imaging plane is critical for reliable MTA scoring.',
      'صفحه تصویربرداری صحیح برای امتیازدهی معتبر MTA حیاتی است.'
    ),
    headers: [
      L('Parameter', 'Parameter', 'پارامتر'),
      L('Vorgabe', 'Specification', 'مشخصات'),
      L('Begründung', 'Rationale', 'دلیل'),
    ],
    rows: [
      [
        L('Sequenz', 'Sequence', 'سکانس'),
        L('T1-gewichtet (ohne KM)', 'T1-weighted (without contrast)', 'T1 بدون کنتراست'),
        L('Optimale Grausubstanz-/Weißsubstanz-Differenzierung', 'Optimal grey/white matter differentiation', 'بهترین تفکیک ماده خاکستری/سفید'),
      ],
      [
        L('Ebene', 'Plane', 'صفحه'),
        L('Koronar, senkrecht zur Hippocampuslängsachse', 'Coronal, perpendicular to hippocampal long axis', 'کرونال، عمود بر محور طولی هیپوکامپ'),
        L('Querschnitt durch den Hippocampuskörper sichtbar', 'Cross-section through hippocampal body visible', 'مقطع عرضی از جسم هیپوکامپ قابل رویت'),
      ],
      [
        L('Schichtdicke', 'Slice thickness', 'ضخامت برش'),
        L('≤ 2 mm (idealerweise 1–1,5 mm)', '≤ 2 mm (ideally 1–1.5 mm)', '≤ ۲ میلی‌متر (ایده‌آل ۱–۱.۵ میلی‌متر)'),
        L('Reduktion von Partialvolumeneffekten', 'Reduces partial volume effects', 'کاهش اثرات حجم جزئی'),
      ],
      [
        L('Referenzebene', 'Reference level', 'سطح مرجع'),
        L('Auf Höhe des Mammillarkörpers (koronale Referenzschicht)', 'At the level of the mamillary body (coronal reference slice)', 'در سطح جسم ماميلار (برش مرجع کرونال)'),
        L('Standardisierte, reproduzierbare Messung', 'Standardised, reproducible measurement', 'اندازه‌گیری استاندارد و قابل تکرار'),
      ],
    ],
    key: L(
      'Falsch angulierte Schichten führen zu Fehlbewertungen. Standardebene: koronar, senkrecht zur Hippocampuslängsachse, auf Höhe des Mammillarkörpers.',
      'Incorrectly angulated slices lead to rating errors. Standard plane: coronal, perpendicular to hippocampal long axis, at mamillary body level.',
      'برش‌های با زاویه اشتباه منجر به خطای امتیازدهی می‌شوند. صفحه استاندارد: کرونال، عمود بر محور طولی هیپوکامپ، در سطح جسم ماميلار.'
    ),
  },

  score: {
    title: L('MTA-Scorewerte 0–4 (Scheltens)', 'MTA Score Values 0–4 (Scheltens)', 'مقادیر امتیاز MTA ۰–۴ (شلتنز)'),
    lead: L(
      'Die Scheltens-Skala bewertet drei Strukturen im koronalen T1-Bild und fasst sie zu einem Gesamtscore zusammen.',
      'The Scheltens scale assesses three structures on coronal T1 MRI and combines them into a single score.',
      'مقیاس شلتنز سه ساختار را در تصویر T1 کرونال ارزیابی و در یک امتیاز کلی ترکیب می‌کند.'
    ),
    headers: [
      L('Score', 'Score', 'امتیاز'),
      L('Befund', 'Finding', 'یافته'),
      L('Sulcus choroideus', 'Choroid fissure', 'شیار کورویید'),
      L('Temporalhorn', 'Temporal horn', 'شاخ گیجگاهی'),
      L('Hippocampushöhe', 'Hippocampal height', 'ارتفاع هیپوکامپ'),
    ],
    rows: [
      [
        L('0', '0', '۰'),
        L('Keine Atrophie', 'No atrophy', 'بدون آتروفی'),
        L('Normal', 'Normal', 'طبیعی'),
        L('Normal', 'Normal', 'طبیعی'),
        L('Normal', 'Normal', 'طبیعی'),
      ],
      [
        L('1', '1', '۱'),
        L('Minimale Atrophie', 'Minimal atrophy', 'آتروفی حداقل'),
        L('Leicht erweitert', 'Mildly widened', 'کمی گشاد'),
        L('Normal', 'Normal', 'طبیعی'),
        L('Normal', 'Normal', 'طبیعی'),
      ],
      [
        L('2', '2', '۲'),
        L('Leichte Atrophie', 'Mild atrophy', 'آتروفی خفیف'),
        L('Erweitert', 'Widened', 'گشاد'),
        L('Leicht erweitert', 'Mildly widened', 'کمی گشاد'),
        L('Normal bis leicht reduziert', 'Normal to mildly reduced', 'طبیعی تا کمی کاهش یافته'),
      ],
      [
        L('3', '3', '۳'),
        L('Moderate Atrophie', 'Moderate atrophy', 'آتروفی متوسط'),
        L('Deutlich erweitert', 'Markedly widened', 'به وضوح گشاد'),
        L('Erweitert', 'Widened', 'گشاد'),
        L('Reduziert (25–50 % Volumenverlust)', 'Reduced (25–50 % volume loss)', 'کاهش یافته (۲۵–۵۰٪ کاهش حجم)'),
      ],
      [
        L('4', '4', '۴'),
        L('Schwere Atrophie', 'Severe atrophy', 'آتروفی شدید'),
        L('Stark erweitert', 'Severely widened', 'به شدت گشاد'),
        L('Stark erweitert', 'Severely widened', 'به شدت گشاد'),
        L('Stark reduziert (> 50 % Volumenverlust)', 'Severely reduced (> 50 % volume loss)', 'به شدت کاهش یافته (> ۵۰٪ کاهش حجم)'),
      ],
    ],
    key: L(
      'Score 0 und 1 = meist physiologisch (auch bei Gesunden möglich). Score 3 und 4 = immer pathologisch. Score 2 = altersabhängig interpretieren!',
      'Score 0 and 1 = mostly physiological (also possible in healthy individuals). Score 3 and 4 = always pathological. Score 2 = interpret according to age!',
      'امتیاز ۰ و ۱ = اغلب فیزیولوژیک (در افراد سالم هم ممکن). امتیاز ۳ و ۴ = همیشه پاتولوژیک. امتیاز ۲ = بر اساس سن تفسیر کنید!'
    ),
  },

  grenzwerte: {
    title: L('Alterskorrigierte Grenzwerte', 'Age-Adjusted Thresholds', 'آستانه‌های تنظیم‌شده سنی'),
    lead: L(
      'Ein gewisser Grad an Hippocampusatrophie ist normale Alterung. Daher gelten altersangepasste Grenzwerte – pathologisch ist erst ein Score, der den Grenzwert der jeweiligen Altersklasse überschreitet.',
      'A degree of hippocampal atrophy is normal ageing. Age-adjusted thresholds therefore apply — a score is only pathological when it exceeds the threshold for the relevant age group.',
      'درجاتی از آتروفی هیپوکامپ، پیری طبیعی است. بنابراین آستانه‌های تنظیم‌شده سنی اعمال می‌شود — امتیاز تنها زمانی پاتولوژیک است که از آستانه گروه سنی مربوطه تجاوز کند.'
    ),
    headers: [
      L('Altersgruppe', 'Age group', 'گروه سنی'),
      L('Pathologisch ab MTA ≥', 'Pathological at MTA ≥', 'پاتولوژیک از MTA ≥'),
      L('Klinische Bedeutung', 'Clinical significance', 'اهمیت بالینی'),
    ],
    rows: [
      [
        L('< 65 Jahre', '< 65 years', '< ۶۵ سال'),
        L('2', '2', '۲'),
        L('Hochsuspekt für Alzheimer-assoziierte Atrophie', 'Highly suspicious for Alzheimer-associated atrophy', 'بسیار مشکوک به آتروفی مرتبط با آلزهایمر'),
      ],
      [
        L('65–74 Jahre', '65–74 years', '۶۵–۷۴ سال'),
        L('2', '2', '۲'),
        L('Abnorme Atrophie über das physiologische Altersmaß hinaus', 'Abnormal atrophy beyond physiological ageing', 'آتروفی غیرطبیعی فراتر از پیری فیزیولوژیک'),
      ],
      [
        L('75–84 Jahre', '75–84 years', '۷۵–۸۴ سال'),
        L('3', '3', '۳'),
        L('Score 2 noch im altersphysiologischen Rahmen', 'Score 2 still within age-physiological range', 'امتیاز ۲ هنوز در محدوده فیزیولوژیک سنی'),
      ],
      [
        L('≥ 85 Jahre', '≥ 85 years', '≥ ۸۵ سال'),
        L('4', '4', '۴'),
        L('Score 2–3 kann physiologisch sein', 'Score 2–3 may be physiological', 'امتیاز ۲–۳ ممکن است فیزیولوژیک باشد'),
      ],
    ],
    cave: L(
      'Die Grenzwerte sind Orientierungshilfen, keine absoluten Diagnosekriterien. Klinischer Kontext, neuropsychologischer Befund und Verlauf sind entscheidend.',
      'The thresholds are guides, not absolute diagnostic criteria. Clinical context, neuropsychological findings and longitudinal course are decisive.',
      'آستانه‌ها راهنما هستند، نه معیارهای تشخیصی مطلق. زمینه بالینی، یافته‌های نوروسایکولوژیک و سیر بیماری تعیین‌کننده‌اند.'
    ),
  },

  interpretation: {
    title: L('Klinische Interpretation', 'Clinical Interpretation', 'تفسیر بالینی'),
    lead: L(
      'Der MTA-Score ist ein Baustein in der Demenzdiagnostik – er darf nie isoliert bewertet werden.',
      'The MTA score is one component of dementia diagnostics — it must never be assessed in isolation.',
      'امتیاز MTA یک جزء از تشخیص دمانس است — هرگز نباید به‌تنهایی ارزیابی شود.'
    ),
    items: [
      {
        icon: '✅',
        title: L('Kombinierte Bewertung', 'Combined assessment', 'ارزیابی ترکیبی'),
        text: L(
          'MTA immer zusammen mit GCA-Score (globale kortikale Atrophie) und PCA-Score (posteriore kortikale Atrophie) bewerten. Alzheimer: MTA + PCA erhöht. FTD: frontale Atrophie überwiegt.',
          'MTA should always be assessed with the GCA score (global cortical atrophy) and PCA score (posterior cortical atrophy). Alzheimer: MTA + PCA elevated. FTD: frontal atrophy predominates.',
          'MTA باید همیشه همراه با امتیاز GCA (آتروفی کورتیکال کلی) و PCA (آتروفی کورتیکال خلفی) ارزیابی شود. آلزهایمر: MTA + PCA بالا. FTD: آتروفی فرونتال غالب است.'
        ),
      },
      {
        icon: '⚠️',
        title: L('Differenzialdiagnosen', 'Differential diagnoses', 'تشخیص افتراقی'),
        text: L(
          'Erhöhter MTA-Score ist nicht spezifisch für Alzheimer: auch bei Lewy-Body-Demenz, frontotemporaler Demenz, Hippocampussklerose und vaskulärer Demenz erhöht.',
          'Elevated MTA score is not specific to Alzheimer: also elevated in Lewy body dementia, frontotemporal dementia, hippocampal sclerosis and vascular dementia.',
          'امتیاز بالای MTA برای آلزهایمر اختصاصی نیست: در دمانس با اجسام لویی، دمانس فرونتوتمپورال، اسکلروز هیپوکامپ و دمانس عروقی نیز بالا است.'
        ),
      },
      {
        icon: '📈',
        title: L('Sensitivität & Spezifität', 'Sensitivity & Specificity', 'حساسیت و اختصاصیت'),
        text: L(
          'Sensitivität ~85 %, Spezifität ~88 % für Alzheimer vs. gesunde Kontrollen. Geringere Unterscheidungskraft im Frühstadium und bei gemischter Pathologie.',
          'Sensitivity ~85%, specificity ~88% for Alzheimer vs. healthy controls. Lower discriminative power in early stages and mixed pathology.',
          'حساسیت ~۸۵٪، اختصاصیت ~۸۸٪ برای آلزهایمر در برابر کنترل‌های سالم. قدرت تمایز پایین‌تر در مرحله اولیه و پاتولوژی مختلط.'
        ),
      },
      {
        icon: '🔄',
        title: L('Verlaufsbeurteilung', 'Longitudinal assessment', 'ارزیابی طولی'),
        text: L(
          'Serielle MRT alle 1–2 Jahre erlaubt Progressionsbeurteilung. Eine Zunahme des MTA-Scores um ≥ 1 Punkt/Jahr gilt als beschleunigte Atrophie.',
          'Serial MRI every 1–2 years allows progression assessment. An increase of ≥ 1 point/year is considered accelerated atrophy.',
          'MRI سریال هر ۱–۲ سال ارزیابی پیشرفت را امکان‌پذیر می‌کند. افزایش ≥ ۱ امتیاز در سال به عنوان آتروفی تسریع‌شده محسوب می‌شود.'
        ),
      },
    ],
    key: L(
      'MTA ≥ Grenzwert + passende Klinik + GCA/PCA-Konstellation → Alzheimer-Diagnose gestützt. Kein Alleindiagnosekriterium!',
      'MTA ≥ threshold + compatible clinical features + GCA/PCA constellation → supports Alzheimer diagnosis. Not a standalone criterion!',
      'MTA ≥ آستانه + تظاهرات بالینی سازگار + آرایش GCA/PCA → تشخیص آلزهایمر حمایت می‌شود. معیار مستقل نیست!'
    ),
  },

  takehome: {
    title: L('Take-home Punkte', 'Take-home Points', 'نکات کلیدی'),
    lead: L('Die wichtigsten Punkte auf einen Blick.', 'The most important points at a glance.', 'مهم‌ترین نکات در یک نگاه.'),
    items: [
      {
        title: L('Koronales T1 auf Mammillarkörperhöhe', 'Coronal T1 at mamillary body level', 'T1 کرونال در سطح جسم ماميلار'),
        text: L(
          'Standardsequenz und -ebene für den MTA-Score. Schichtdicke ≤ 2 mm, senkrecht zur Hippocampuslängsachse. Falsche Angulierung → Fehlbewertung.',
          'Standard sequence and plane for MTA scoring. Slice thickness ≤ 2 mm, perpendicular to hippocampal long axis. Incorrect angulation → scoring error.',
          'سکانس و صفحه استاندارد برای امتیازدهی MTA. ضخامت برش ≤ ۲ میلی‌متر، عمود بر محور طولی هیپوکامپ. زاویه اشتباه → خطای امتیازدهی.'
        ),
      },
      {
        title: L('Drei Parameter, eine Skala (0–4)', 'Three parameters, one scale (0–4)', 'سه پارامتر، یک مقیاس (۰–۴)'),
        text: L(
          'Sulcus choroideus + Temporalhorn + Hippocampushöhe → Score 0–4 pro Hemisphäre. Score 3 und 4 = immer pathologisch. Score 0 und 1 = meist physiologisch.',
          'Choroid fissure + temporal horn + hippocampal height → score 0–4 per hemisphere. Score 3 and 4 = always pathological. Score 0 and 1 = mostly physiological.',
          'شیار کورویید + شاخ گیجگاهی + ارتفاع هیپوکامپ → امتیاز ۰–۴ به ازای هر نیمکره. امتیاز ۳ و ۴ = همیشه پاتولوژیک. امتیاز ۰ و ۱ = اغلب فیزیولوژیک.'
        ),
      },
      {
        title: L('Altersangepasst interpretieren', 'Interpret with age adjustment', 'تفسیر با تنظیم سن'),
        text: L(
          '< 65 J. und 65–74 J.: pathologisch ab MTA ≥ 2. 75–84 J.: pathologisch ab MTA ≥ 3. ≥ 85 J.: pathologisch ab MTA ≥ 4.',
          '< 65 yr and 65–74 yr: pathological at MTA ≥ 2. 75–84 yr: pathological at MTA ≥ 3. ≥ 85 yr: pathological at MTA ≥ 4.',
          '< ۶۵ سال و ۶۵–۷۴ سال: پاتولوژیک از MTA ≥ ۲. ۷۵–۸۴ سال: پاتولوژیک از MTA ≥ ۳. ≥ ۸۵ سال: پاتولوژیک از MTA ≥ ۴.'
        ),
      },
      {
        title: L('Nicht Alzheimer-spezifisch', 'Not Alzheimer-specific', 'برای آلزهایمر اختصاصی نیست'),
        text: L(
          'Erhöhter MTA auch bei LBD, FTD und vaskulärer Demenz. Immer mit GCA-Score, PCA-Score und klinischem Befund kombinieren.',
          'Elevated MTA also seen in LBD, FTD and vascular dementia. Always combine with GCA score, PCA score and clinical findings.',
          'MTA بالا در LBD، FTD و دمانس عروقی هم دیده می‌شود. همیشه با امتیاز GCA، PCA و یافته بالینی ترکیب کنید.'
        ),
      },
      {
        title: L('Nie isoliert verwenden', 'Never use in isolation', 'هرگز به‌تنهایی استفاده نکنید'),
        text: L(
          'MTA ist ein Baustein – kein Alleindiagnosekriterium. Integration in Klinik, Neuropsychologie und ggf. PET/Liquor-Biomarker.',
          'MTA is one component — not a standalone diagnostic criterion. Integrate with clinical, neuropsychological and PET/CSF biomarker data.',
          'MTA یک جزء است — نه معیار تشخیصی مستقل. با داده‌های بالینی، نوروسایکولوژیک و بیومارکرهای PET/مایع مغزی-نخاعی ترکیب کنید.'
        ),
      },
    ],
  },
}
