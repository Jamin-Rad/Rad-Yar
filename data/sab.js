// ── Subarachnoidalblutung (SAB) ───────────────────────────────────────────────
// Alle Inhalte: Lesson, MCQs, Flashcards – Schwerpunkt: Modifizierte Fisher-Skala

const L = (de, en, fa) => ({ de, en, fa })

// ── LESSON ────────────────────────────────────────────────────────────────────

export const SAB_LESSON = {
  pdfSourcePages: [15,17], // user PDF page range; coverage still requires content comparison

  toc: L('Inhaltsverzeichnis', 'Contents', 'فهرست مطالب'),
  breadcrumbArea: L('Kopf', 'Head', 'سر'),
  breadcrumbCurrent: L(
    'Vaskuläre Erkrankungen · Subarachnoidalblutung',
    'Vascular diseases · Subarachnoid haemorrhage',
    'بیماری‌های عروقی · خونریزی زیر عنکبوتیه'
  ),
  title: L('Subarachnoidalblutung', 'Subarachnoid Haemorrhage', 'خونریزی زیر عنکبوتیه'),
  subtitle: L(
    'Blutverteilung, Gefäßsuche und Komplikationen im Verlauf',
    'Blood distribution, vascular investigation and evolving complications',
    'توزیع خون، بررسی عروق و عوارض در سیر بیماری'
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
      value: 'Verteilung',
      label: L('Quelle eingrenzen', 'Narrow the source', 'منشأ را محدود کنید'),
      text: L(
        'Zisternen, Sylvische Fissuren und kortikale Sulci systematisch vergleichen.',
        'Compare the basal cisterns, Sylvian fissures and cortical sulci systematically.',
        'سیسترن‌های قاعده‌ای، شکاف‌های سیلویوس و شیارهای قشری را نظام‌مند مقایسه کنید.'
      ),
    },
    {
      value: 'IVH + Dicke',
      label: L('Modified Fisher Grad 4', 'Modified Fisher Grade 4', 'درجهٔ ۴ فیشر اصلاح‌شده'),
      text: L(
        'Modified-Fisher-Grad 4 kombiniert dickes Zisternenblut und IVH und bezeichnet die höchste Kategorie der Skala.',
        'Modified Fisher Grade 4 combines thick cisternal blood and IVH and is the scale’s highest category.',
        'درجه ۴ فیشر اصلاح‌شده ترکیب خون ضخیم سیسترنی و IVH است و بالاترین گروه مقیاس محسوب می‌شود.'
      ),
    },
    {
      value: '< 6 h',
      label: L('Diagnostischer Kontext', 'Diagnostic context', 'زمینه تشخیصی'),
      text: L(
        'Eine negative CT kann nur unter definierten Bedingungen zum Ausschluss reichen.',
        'A negative CT can be used to exclude aSAH only under defined conditions.',
        'CT منفی فقط در شرایط مشخص می‌تواند برای رد aSAB کافی باشد.'
      ),
    },
  ],

  // ── Section 1: Klinik & Ätiologie ─────────────────────────────────────────
  klinik: {
    title: L('Klinik & Ätiologie', 'Clinical features & aetiology', 'تظاهرات بالینی و علت‌شناسی'),
    lead: L(
      'Die SAB ist eine Blutung in den Subarachnoidalraum. Ein plötzlich maximal starker Kopfschmerz ist ein Warnmuster, aber nicht die einzige mögliche Präsentation und nicht spezifisch für SAB.',
      'SAH is bleeding into the subarachnoid space. A sudden, severe headache reaching maximal intensity is a warning pattern, but it is neither the only presentation nor specific to SAH.',
      'SAB خونریزی در فضای زیر عنکبوتیه است. سردرد ناگهانی و بسیار شدید که سریع به اوج می‌رسد الگویی هشداردهنده است، اما تنها تظاهر ممکن نیست و اختصاصی SAB هم نیست.'
    ),
    definitionItems: [
      {
        icon: '🔴',
        title: L('Vernichtungskopfschmerz', 'Thunderclap headache', 'سردرد ضربه رعد'),
        text: L(
          'Plötzlich einsetzender, rasch maximaler Kopfschmerz – „wie eine Explosion im Kopf“. Ein dringliches Warnmuster mit breiter Differenzialdiagnose, nicht spezifisch für aneurysmatische SAB.',
          'Sudden-onset headache reaching maximum intensity rapidly — “like an explosion in the head”. An urgent warning pattern with a broad differential, not specific to aneurysmal SAH.',
          'سردردی که ناگهانی آغاز می‌شود و سریع به بیشترین شدت می‌رسد («مثل انفجار در سر»). الگویی هشداردهنده و نیازمند بررسی فوری است، اما افتراق گسترده‌ای دارد و اختصاصی SAB آنوریسمی نیست.'
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
      L('Muster', 'Pattern', 'الگو'),
      L('Merkmale', 'Features', 'ویژگی‌ها'),
    ],
    aetiologyRows: [
      [
        L('Aneurysmaruptur', 'Aneurysm rupture', 'پارگی آنوریسم'),
        L('häufige Ursache', 'common cause', 'علت شایع'),
        L(
          'Sakkuläre Aneurysmen liegen häufig an Gefäßgabelungen; die Blutverteilung lenkt die Suche, beweist den Ursprung aber nicht.',
          'Saccular aneurysms often arise at arterial branch points; blood distribution guides the search but does not prove the source.',
          'آنوریسم‌های ساکولار اغلب در محل انشعاب عروق رخ می‌دهند؛ توزیع خون جهت بررسی را مشخص می‌کند، اما منشأ را ثابت نمی‌کند.'
        ),
      ],
      [
        L('Perimesenzephale SAB', 'Perimesencephalic SAH', 'SAB پری‌مزنسفالیک'),
        L('typisches Verteilungsmuster', 'typical distribution pattern', 'الگوی توزیع تیپیک'),
        L(
          'Blut um das Mittelhirn ohne typische diffuse Sylvische oder interhemisphärische Ausbreitung; die Ursache muss dennoch abgeklärt werden.',
          'Blood centred around the midbrain without typical diffuse Sylvian or interhemispheric extension; the source still requires evaluation.',
          'خون پیرامون مغز میانی بدون گسترش منتشر تیپیک به شکاف سیلویوس یا بین‌نیمکره‌ای؛ با این حال منشأ باید بررسی شود.'
        ),
      ],
      [
        L('Traumatisch', 'Traumatic', 'تروماتیک'),
        L('traumatisches Muster', 'traumatic pattern', 'الگوی تروماتیک'),
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
      'Ein vorausgehender Warnkopfschmerz kann vorkommen. Sein Fehlen schließt eine SAB nicht aus.',
      'A preceding warning headache may occur. Its absence does not exclude SAH.',
      'سردرد هشداردهندهٔ پیشین ممکن است رخ دهد؛ نبود آن SAB را رد نمی‌کند.'
    ),
    key: L(
      'Plötzlich maximal starker Kopfschmerz erfordert eine dringliche Abklärung. Die CT- und Liquorentscheidung richtet sich nach Zeitpunkt, neurologischem Befund, Bildqualität und klinischer Wahrscheinlichkeit.',
      'Sudden severe headache reaching maximal intensity requires urgent evaluation. The CT and CSF pathway depends on timing, neurological findings, image quality and clinical probability.',
      'سردرد ناگهانی و بسیار شدیدی که به اوج می‌رسد نیازمند بررسی فوری است. مسیر CT و بررسی CSF به زمان، یافته‌های عصبی، کیفیت تصویر و احتمال بالینی بستگی دارد.'
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
      L('Diagnostischer Kontext', 'Diagnostic context', 'زمینه تشخیصی'),
      L('Empfehlung', 'Recommendation', 'توصیه'),
    ],
    stagesRows: [
      [
        L('Weniger als 6 Stunden', 'Less than 6 hours', 'کمتر از ۶ ساعت'),
        L('Hohe diagnostische Aussagekraft unter definierten Bedingungen', 'High diagnostic performance under defined conditions', 'دقت تشخیصی بالا در شرایط مشخص'),
        L('Bei akutem schwerem Kopfschmerz ohne neues neurologisches Defizit kann ein hochwertiges natives CT, befundet durch einen Facharzt für Neuroradiologie, eine aSAB innerhalb dieses Zeitfensters diagnostizieren oder ausschließen. Die AHA/ASA-Empfehlung nennt ausdrücklich <6 h. Genau 6 h sind durch diese CT-only-Empfehlung nicht abgedeckt und müssen im klinischen Kontext beurteilt werden.', 'For acute severe headache without a new neurological deficit, a high-quality non-contrast CT interpreted by a board-certified neuroradiologist can diagnose or exclude aSAH within this time window. The AHA/ASA recommendation explicitly specifies <6 hours. Exactly 6 hours is not covered by this CT-only recommendation and requires assessment in clinical context.', 'در سردرد حاد و شدید بدون نقص عصبی جدید، CT بدون کنتراست باکیفیت که توسط نورورادیولوژیست دارای بورد تخصصی تفسیر شود می‌تواند در این بازه زمانی aSAB را تشخیص دهد یا رد کند. توصیه AHA/ASA صراحتاً کمتر از ۶ ساعت را ذکر می‌کند. دقیقاً ۶ ساعت تحت پوشش این توصیه CT به‌تنهایی نیست و باید در زمینه بالینی ارزیابی شود.'),
      ],
      [
        L('Mehr als 6 Stunden oder neues Defizit', 'More than 6 hours or a new deficit', 'بیش از ۶ ساعت یا نقص عصبی جدید'),
        L('Die Aussagekraft nimmt mit der Zeit ab', 'Diagnostic performance declines over time', 'دقت تشخیصی با گذشت زمان کاهش می‌یابد'),
        L('Bei Vorstellung mehr als 6 Stunden nach Beginn oder bei neuem neurologischem Defizit empfiehlt die AHA/ASA-Leitlinie nach negativem CT eine Liquorpunktion. Die Entscheidung gehört in den klinischen Kontext.', 'For presentation more than 6 hours after onset or with a new neurological deficit, the AHA/ASA guideline recommends lumbar puncture after a negative CT. Interpret the decision in clinical context.', 'در مراجعه بیش از ۶ ساعت پس از شروع یا وجود نقص عصبی جدید، راهنمای AHA/ASA پس از CT منفی پونکسیون کمری را توصیه می‌کند. تصمیم باید در زمینه بالینی تفسیر شود.'),
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
          'Eine perimesenzephale Verteilung kann auf eine nichtaneurysmatische Ursache hinweisen. Das Muster allein beweist diese Ursache jedoch nicht.',
          'A perimesencephalic distribution may suggest a non-aneurysmal cause, but the pattern alone does not prove the source.',
          'توزیع پری‌مزنسفالیک می‌تواند به علت غیرآنوریسمی اشاره کند، اما الگو به‌تنهایی منشأ را ثابت نمی‌کند.'
        ),
      },
      {
        icon: '🧊',
        title: L('MRT-FLAIR als ergänzende Sequenz', 'MRI FLAIR as an adjunct sequence', 'سکانس تکمیلی MRI-FLAIR'),
        text: L(
          'FLAIR kann hyperintenses Signal in den Subarachnoidalräumen zeigen, ist aber störanfällig und ersetzt bei akuter Fragestellung nicht den diagnostischen CT-/Liquorpfad. Sauerstoffgabe und Meningitis können falsch-positive Signale verursachen.',
          'FLAIR may show hyperintense signal in the subarachnoid spaces, but is susceptible to confounders and does not replace the CT/CSF pathway in acute evaluation. Supplemental oxygen and meningitis can cause false-positive signal.',
          'FLAIR ممکن است سیگنال هایپراینتنس در فضاهای زیرعنکبوتیه نشان دهد، اما مستعد عوامل مخدوش‌کننده است و در ارزیابی حاد جایگزین مسیر CT/CSF نیست. اکسیژن مکمل و مننژیت می‌توانند سیگنال مثبت کاذب ایجاد کنند.'
        ),
      },
    ],
    key: L(
      'Ein negatives CT schließt eine SAB nicht unter allen Bedingungen aus. Bei Vorstellung mehr als 6 Stunden nach Beginn oder bei neuem neurologischem Defizit empfiehlt die AHA/ASA-Leitlinie nach negativem CT eine Lumbalpunktion mit Liquoranalyse; lokale Präanalytik beachten.',
      'A negative CT does not exclude SAH in every setting. For presentation more than 6 hours after onset or with a new neurological deficit, the AHA/ASA guideline recommends lumbar puncture with CSF analysis after a negative CT; follow local laboratory protocols.',
      'CT منفی در همه شرایط SAB را رد نمی‌کند. در مراجعه بیش از ۶ ساعت پس از شروع یا وجود نقص عصبی جدید، راهنمای AHA/ASA پس از CT منفی پونکسیون کمری همراه با آنالیز CSF را توصیه می‌کند؛ پروتکل آزمایشگاه محلی باید رعایت شود.'
    ),
  },

  // ── Section 3: Modifizierte Fisher-Skala ──────────────────────────────────
  fisher: {
    title: L('Modifizierte Fisher-Skala', 'Modified Fisher Scale', 'مقیاس فیشر اصلاح‌شده'),
    lead: L(
      'Die Modifizierte Fisher-Skala (Claassen et al., 2001) klassifiziert die Blutlast im initialen CT anhand von zwei Merkmalen: Blutdicke in den Zisternen und Vorhandensein einer intraventrikulären Blutung (IVH). Sie ersetzt keine patientenspezifische Risikobeurteilung.',
      'The Modified Fisher Scale (Claassen et al., 2001) classifies blood burden on the initial CT using two features: cisternal blood thickness and the presence of intraventricular haemorrhage (IVH). It does not replace patient-specific risk assessment.',
      'مقیاس فیشر اصلاح‌شده (Claassen و همکاران، ۲۰۰۱) بار خون را در CT اولیه بر اساس دو ویژگی طبقه‌بندی می‌کند: ضخامت خون سیسترنی و وجود خونریزی داخل‌بطنی (IVH). این مقیاس جایگزین ارزیابی خطر فردی بیمار نیست.'
    ),
    tableHeaders: [
      L('Grad', 'Grade', 'درجه'),
      L('Blut-Dicke', 'Blood thickness', 'ضخامت خون'),
      L('IVH', 'IVH', 'IVH'),
      L('Risikoeinordnung', 'Risk category', 'رده خطر'),
      L('CT-Befund', 'CT appearance', 'یافته CT'),
    ],
    tableRows: [
      [
        '0',
        L('Kein SAB', 'No SAH', 'بدون SAB'),
        L('Nein', 'No', 'خیر'),
        L('kein Blut', 'no visible blood', 'بدون خون قابل مشاهده'),
        L('Normale Zisternen, kein Blut nachweisbar', 'Normal cisterns, no detectable blood', 'سیسترن‌های طبیعی، بدون خون قابل تشخیص'),
      ],
      [
        '1',
        L('Dünn (<1 mm)', 'Thin (<1 mm)', 'نازک (<۱ mm)'),
        L('Nein', 'No', 'خیر'),
        L('niedriger', 'lower', 'کمتر'),
        L('Dünne Blutschicht in Zisternen, kein Ventrikelblut', 'Thin blood layer in cisterns, no ventricular blood', 'لایه نازک خون در سیسترن‌ها، بدون خون در بطن‌ها'),
      ],
      [
        '2',
        L('Dünn (<1 mm)', 'Thin (<1 mm)', 'نازک (<۱ mm)'),
        L('Ja ✓', 'Yes ✓', 'بله ✓'),
        L('erhöht', 'elevated', 'افزایش‌یافته'),
        L('Dünne Blutschicht + Blut in ≥1 Seitenventrikel', 'Thin blood + blood in ≥1 lateral ventricle', 'لایه نازک خون + خون در ≥۱ بطن جانبی'),
      ],
      [
        '3',
        L('Dick (≥1 mm)', 'Thick (≥1 mm)', 'ضخیم (≥۱ mm)'),
        L('Nein', 'No', 'خیر'),
        L('erhöht', 'elevated', 'افزایش‌یافته'),
        L('Dicke Blutansammlung / Zisternenverfüllung, kein IVH', 'Thick blood collection / cistern filling, no IVH', 'تجمع خون ضخیم / پر شدن سیسترن، بدون IVH'),
      ],
      [
        '4',
        L('Dick (≥1 mm)', 'Thick (≥1 mm)', 'ضخیم (≥۱ mm)'),
        L('Ja ✓', 'Yes ✓', 'بله ✓'),
        L('höchster Grad der Skala', 'highest grade on the scale', 'بالاترین درجهٔ مقیاس'),
        L('Dicke Blutansammlung + Blut in ≥1 Seitenventrikel', 'Thick blood + blood in ≥1 lateral ventricle', 'تجمع خون ضخیم + خون در ≥۱ بطن جانبی'),
      ],
    ],
    comparisonTitle: L('Original vs. Modifizierte Fisher-Skala', 'Original vs. Modified Fisher Scale', 'مقیاس فیشر اصلی در مقابل اصلاح‌شده'),
    comparisonItems: [
      {
        icon: '📋',
        title: L('Original Fisher-Skala (1980)', 'Original Fisher Scale (1980)', 'مقیاس فیشر اصلی (۱۹۸۰)'),
        text: L(
          'Grad 3 enthält dickes Zisternenblut und wird in der Originalskala als höchste Risikokategorie eingestuft. Die Skala erfasst IVH nicht getrennt.',
          'Grade 3 contains thick cisternal blood and is the highest risk category in the original scale. The scale does not score IVH separately.',
          'درجهٔ ۳ شامل خون ضخیم سیسترنی است و در مقیاس اصلی بالاترین ردهٔ خطر محسوب می‌شود. این مقیاس IVH را جداگانه امتیازدهی نمی‌کند.'
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
          'Die modifizierte Skala berücksichtigt die Kombination aus Blutdicke und IVH. Sie unterstützt die Risikoeinordnung, ersetzt aber keine klinische Überwachung.',
          'The modified scale accounts for the combination of blood thickness and IVH. It supports risk stratification but does not replace clinical monitoring.',
          'مقیاس اصلاح‌شده ترکیب ضخامت خون و IVH را در نظر می‌گیرد. این مقیاس به رده‌بندی خطر کمک می‌کند اما جای پایش بالینی را نمی‌گیرد.'
        ),
      },
    ],
    cave: L(
      'Die Skala erfasst CT-Blutdicke und IVH als gemeinsame Risikomerkmale. Ihre Kategorien sind keine patientenspezifischen Wahrscheinlichkeiten und müssen zusammen mit Klinik und Verlauf interpretiert werden.',
      'The scale combines CT blood thickness and IVH as risk markers. Its categories are not patient-specific probabilities and must be interpreted with the clinical picture and course.',
      'این مقیاس ضخامت خون در CT و IVH را به‌عنوان نشانگرهای خطر ترکیب می‌کند. رده‌های آن احتمال فردی بیمار نیستند و باید همراه وضعیت و سیر بالینی تفسیر شوند.'
    ),
    key: L(
      'Zwei Parameter: Blutdicke (<1 mm vs. ≥1 mm) und IVH (vorhanden oder nicht). Grad 4 kombiniert dickes Zisternenblut und IVH; die Skala dient der Risikoeinordnung, nicht als individuelle Vorhersage.',
      'Two parameters: blood thickness (<1 mm vs ≥1 mm) and IVH (present or absent). Grade 4 combines thick cisternal blood with IVH; the scale supports risk stratification, not individual prediction.',
      'دو پارامتر: ضخامت خون (<۱ در برابر ≥۱ میلی‌متر) و وجود یا عدم IVH. درجهٔ ۴ خون ضخیم سیسترنی را با IVH ترکیب می‌کند؛ مقیاس برای رده‌بندی خطر است، نه پیش‌بینی فردی.'
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
          'CTA dient der raschen Suche nach einem vaskulären Blutungsherd. Kleine oder schwer darstellbare Läsionen können übersehen werden; die Blutverteilung beeinflusst die weitere Gefäßdiagnostik.',
          'CTA provides rapid evaluation for a vascular bleeding source. Small or difficult-to-visualise lesions may be missed; the haemorrhage distribution informs further vascular imaging.',
          'CTA برای جست‌وجوی سریع منشأ عروقی خونریزی به‌کار می‌رود. ضایعات کوچک یا دشوار برای مشاهده ممکن است دیده نشوند؛ توزیع خونریزی در انتخاب بررسی عروقی بعدی مؤثر است.'
        ),
      },
      {
        icon: '🎯',
        title: L('DSA (Goldstandard)', 'DSA (gold standard)', 'DSA (استاندارد طلایی)'),
        text: L(
          'Invasiv, aber ermöglicht gleichzeitig interventionelle Therapie (endovaskuläres Coiling). Bei spontaner SAB und hoher aneurysmatischer Wahrscheinlichkeit ist DSA auch nach negativer oder unklarer CTA indiziert.',
          'Invasive, but enables simultaneous intervention (endovascular coiling). In spontaneous SAH with high concern for an aneurysm, DSA is indicated even after a negative or inconclusive CTA.',
          'تهاجمی است، اما هم‌زمان امکان درمان مداخله‌ای (کویلینگ داخل عروقی) را فراهم می‌کند. در SAB خودبه‌خودی با احتمال بالای آنوریسم، حتی پس از CTA منفی یا نامشخص، DSA اندیکاسیون دارد.'
        ),
      },
      {
        icon: '🧲',
        title: L('MR-Angiographie (MRA)', 'MR angiography (MRA)', 'MR آنژیوگرافی (MRA)'),
        text: L(
          'TOF-MRA kann zur Verlaufskontrolle behandelter Aneurysmen beitragen. Für die Akutdiagnostik einer Blutungsquelle ist sie kein Ersatz für die leitliniengerechte CTA/DSA-Abklärung.',
          'TOF-MRA may contribute to follow-up of treated aneurysms. It does not replace guideline-directed CTA/DSA evaluation of an acute bleeding source.',
          'TOF-MRA می‌تواند در پیگیری آنوریسم‌های درمان‌شده کمک‌کننده باشد. برای بررسی حاد منشأ خونریزی جایگزین ارزیابی CTA/DSA طبق راهنما نیست.'
        ),
      },
      {
        icon: '🔊',
        title: L('TCD-Monitoring (Vasospasmus)', 'TCD monitoring (vasospasm)', 'مانیتورینگ TCD (وازواسپاسم)'),
        text: L(
          'TCD kann im klinischen Kontext zur Erkennung eines Vasospasmus beitragen. Zeitpunkt und Frequenz der Untersuchungen richten sich nach Verlauf und lokalem neurointensivmedizinischem Protokoll.',
          'TCD can help detect vasospasm in the clinical context. Timing and frequency of examinations depend on the course and local neurocritical-care protocol.',
          'TCD می‌تواند در زمینه بالینی به تشخیص وازواسپاسم کمک کند. زمان و تناوب بررسی‌ها به سیر بیمار و پروتکل مراقبت ویژه عصبی محلی بستگی دارد.'
        ),
      },
    ],
    key: L(
          'Bei diffuser SAB und hoher aneurysmatischer Wahrscheinlichkeit kann trotz negativer oder unklarer CTA eine DSA erforderlich sein. Für eine typische perimesenzephale Verteilung ist der Weg CTA allein versus DSA laut AHA/ASA nicht abschließend geklärt.',
      'With diffuse SAH and strong concern for an aneurysm, DSA may be indicated despite negative or inconclusive CTA. For a typical perimesencephalic pattern, AHA/ASA notes that the choice between CTA alone and DSA is not settled.',
      'در SAB منتشر و احتمال بالای آنوریسم، با وجود CTA منفی یا نامشخص ممکن است DSA لازم باشد. برای الگوی تیپیک پری‌مزنسفالیک، طبق AHA/ASA انتخاب بین CTA تنها و DSA هنوز قطعی نشده است.'
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
          'Das Reblutungsrisiko ist früh besonders relevant. Eine neue Blutung oder Zunahme des Blutvolumens in der Kontrollbildgebung muss dringend kommuniziert werden. Bei rupturiertem Aneurysma wird die zügige Abklärung und Behandlung durch ein erfahrenes Team empfohlen, vorzugsweise innerhalb von 24 Stunden.',
          'Rebleeding is an important early risk. New haemorrhage or increased blood volume on follow-up imaging requires urgent communication. For a ruptured aneurysm, prompt evaluation and treatment by an experienced team is recommended, preferably within 24 hours.',
          'خونریزی مجدد در ساعات اولیه اهمیت ویژه دارد. خونریزی جدید یا افزایش حجم خون در تصویربرداری پیگیری باید فوری گزارش شود. برای آنوریسم پاره‌شده، بررسی و درمان سریع توسط تیم باتجربه، ترجیحاً در ۲۴ ساعت، توصیه می‌شود.'
        ),
      },
      {
        icon: '🫀',
        title: L('Zerebraler Vasospasmus / DCI (spät)', 'Cerebral vasospasm / DCI (late)', 'وازواسپاسم مغزی / DCI (دیررس)'),
        text: L(
          'Vasospasmus tritt häufig im Verlauf der ersten zwei Wochen auf, ist aber nicht mit verzögerter zerebraler Ischämie (DCI) gleichzusetzen. Frühe enterale Nimodipin-Gabe verbessert nach der AHA/ASA-Leitlinie die funktionellen Ergebnisse. Prophylaktische Hypervolämie oder hämodynamische Augmentation wird nicht empfohlen.',
          'Vasospasm often occurs during the first two weeks, but it is not synonymous with delayed cerebral ischaemia (DCI). The AHA/ASA guideline recommends early enteral nimodipine to improve functional outcomes. Prophylactic hypervolaemia or haemodynamic augmentation is not recommended.',
          'وازواسپاسم اغلب طی دو هفتهٔ نخست رخ می‌دهد، اما با ایسکمی مغزی تأخیری (DCI) یکسان نیست. راهنمای AHA/ASA نیمودیپین خوراکی زودهنگام را برای بهبود پیامد عملکردی توصیه می‌کند. افزایش پیشگیرانه حجم یا تقویت همودینامیک توصیه نمی‌شود.'
        ),
      },
      {
        icon: '💧',
        title: L('Hydrozephalus', 'Hydrocephalus', 'هیدروسفالی'),
        text: L(
          'Ein akuter obstruktiver Hydrozephalus kann früh, oft bei IVH, auftreten. Ein chronisch kommunizierender Hydrozephalus kann Wochen später durch gestörte Liquorresorption entstehen. Je nach Befund kann akut eine EVD und bei persistierendem Verlauf ein VP-Shunt erforderlich sein.',
          'Acute obstructive hydrocephalus can occur early, often with IVH. Chronic communicating hydrocephalus can develop weeks later from impaired CSF resorption. Depending on findings, acute EVD or a VP shunt for a persistent course may be required.',
          'هیدروسفالی انسدادی حاد ممکن است زودهنگام، اغلب همراه با IVH، رخ دهد. هیدروسفالی ارتباطی مزمن ممکن است چند هفته بعد به‌علت اختلال جذب CSF ایجاد شود. بسته به یافته‌ها، ممکن است در مرحله حاد درناژ بطنی خارجی (EVD) یا در صورت تداوم، شانت VP لازم باشد.'
        ),
      },
      {
        icon: '❤️',
        title: L('Neurogene Herz- und Lungenschäden', 'Neurogenic cardiac and pulmonary injury', 'آسیب قلبی-ریوی نوروژنیک'),
        text: L(
          'Katecholaminsturm bei massiver SAB → Takotsubo-Kardiomyopathie, Arrhythmien, QT-Verlängerung. Neurogenes Lungenödem möglich. EKG und Troponin bei Aufnahme und im Verlauf kontrollieren.',
          'Catecholamine surge in massive SAH → Takotsubo cardiomyopathy, arrhythmias, QT prolongation. Neurogenic pulmonary oedema possible. Monitor ECG and troponin on admission and serially.',
          'در SAB شدید، افزایش کاتکولامین‌ها می‌تواند باعث کاردیومیوپاتی تاکوتسوبو، آریتمی و طولانی‌شدن QT شود. ادم ریوی نوروژنیک نیز ممکن است رخ دهد. ECG و تروپونین را هنگام پذیرش و به‌صورت سریال پایش کنید.'
        ),
      },
    ],
    cave: L(
      'Elektrolytstörungen können den klinischen Verlauf komplizieren. Ihre Beurteilung und Behandlung richtet sich nach dem Gesamtzustand und lokalen neurointensivmedizinischen Protokollen.',
      'Electrolyte disturbances may complicate the clinical course. Their assessment and treatment depend on the overall condition and local neurocritical-care protocols.',
      'اختلالات الکترولیتی می‌توانند سیر بالینی را پیچیده کنند. ارزیابی و درمان آن‌ها به وضعیت کلی بیمار و پروتکل‌های مراقبت ویژه عصبی محلی بستگی دارد.'
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
          'Plötzlich maximaler Kopfschmerz ist ein Warnmuster und muss dringlich abgeklärt werden; er ist nicht spezifisch für SAB.',
          'A sudden maximal headache is a warning pattern requiring urgent evaluation; it is not specific to SAH.',
          'سردرد ناگهانی و شدید یک الگوی هشداردهنده است و باید فوری بررسی شود؛ اما اختصاصی SAB نیست.'
        ),
      },
      {
        title: L('CT-Sensitivität kennen', 'Know CT sensitivity', 'حساسیت CT را بدانید'),
        text: L(
          'Bei akutem schwerem Kopfschmerz und negativem CT hängt der nächste Schritt von Zeitpunkt, neurologischem Befund und CT-Qualität ab; ein negatives CT ist kein universeller Ausschluss.',
          'With acute severe headache and a negative CT, the next step depends on timing, neurological findings and CT quality; a negative CT is not a universal rule-out.',
          'در سردرد حاد و شدید با CT منفی، گام بعدی به زمان، یافته‌های عصبی و کیفیت CT وابسته است؛ CT منفی برای همه شرایط ردکننده نیست.'
        ),
      },
      {
        title: L('Fisher-Grad bestimmen', 'Determine Fisher grade', 'درجه فیشر را تعیین کنید'),
        text: L(
          'Blutdicke (<1 mm vs. ≥1 mm) + IVH (ja/nein) → Grad 0–4. Grad 4 = dick + IVH und höchste Kategorie der Skala; die Skala ersetzt keine klinische Überwachung.',
          'Blood thickness (<1 mm vs. ≥1 mm) + IVH (yes/no) → grades 0–4. Grade 4 = thick blood + IVH and the scale’s highest category; the scale does not replace clinical monitoring.',
          'ضخامت خون (<۱ mm در مقابل ≥۱ mm) + IVH (بله/خیر) → درجه ۰ تا ۴. درجه ۴ = خون ضخیم + IVH و بالاترین دستهٔ این مقیاس است؛ مقیاس جایگزین پایش بالینی نمی‌شود.'
        ),
      },
      {
        title: L('CTA sofort, dann Aneurysmaausschluss', 'CTA immediately, then exclude aneurysm', 'CTA فوری، سپس رد آنوریسم'),
        text: L(
          'Die CTA kann kleine oder schwer erkennbare Läsionen übersehen. Bei diffuser Blutung und hoher aneurysmatischer Wahrscheinlichkeit kann DSA trotz negativer CTA angezeigt sein; für perimesenzephale SAB ist der optimale Weg nicht abschließend geklärt.',
          'CTA may miss small or difficult-to-visualise lesions. With diffuse haemorrhage and strong concern for an aneurysm, DSA may be indicated despite negative CTA; the optimal pathway for perimesencephalic SAH is not settled.',
          'CTA ممکن است ضایعات کوچک یا دشوار برای مشاهده را از دست بدهد. در خونریزی منتشر و احتمال بالای آنوریسم، با وجود CTA منفی ممکن است DSA لازم باشد؛ مسیر بهینه برای SAB پری‌مزنسفالیک هنوز قطعی نیست.'
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
      'Ein 48-jähriger Patient mit normalem Neurostatus klagt über plötzlich einsetzenden Vernichtungskopfschmerz. Ein modernes, qualitativ hochwertiges Nativ-CT wird 45 Minuten nach Beginn durch einen Facharzt für Neuroradiologie als negativ beurteilt. Welche Aussage ist richtig?',
      'A 48-year-old patient with a normal neurological examination reports a thunderclap headache. A modern high-quality non-contrast CT performed 45 minutes after onset is interpreted as negative by a board-certified neuroradiologist. Which statement is correct?',
      'بیمار ۴۸ ساله با معاینه عصبی طبیعی دچار سردرد ناگهانی و بسیار شدید شده است. CT بدون کنتراست مدرن و باکیفیت، ۴۵ دقیقه پس از شروع توسط نورورادیولوژیست دارای بورد تخصصی منفی گزارش می‌شود. کدام عبارت درست است؟'
    ),
    options: [
      L('Unter diesen Bedingungen kann das CT als Ausschlussweg vertretbar sein; Bildqualität und klinischer Kontext müssen stimmen', 'Under these conditions, CT may be a reasonable rule-out pathway, provided image quality and clinical context are appropriate', 'در این شرایط CT می‌تواند یک مسیر قابل‌قبول برای رد SAB باشد، به شرط مناسب بودن کیفیت تصویر و زمینه بالینی'),
      L('Unabhängig von Zeitpunkt und CT-Qualität ist immer eine Lumbalpunktion vorgeschrieben', 'Lumbar puncture is mandatory regardless of timing and CT quality', 'صرف‌نظر از زمان و کیفیت CT، پونکسیون لومبار همیشه الزامی است'),
      L('Eine negative CTA würde jede Form der SAB sicher ausschließen', 'A negative CTA would reliably exclude every form of SAH', 'CTA منفی همه انواع SAB را با قطعیت رد می‌کند'),
      L('Der Patient kann ohne Prüfung von Bildqualität oder klinischem Risiko entlassen werden', 'The patient can be discharged without checking image quality or clinical risk', 'بیمار را می‌توان بدون بررسی کیفیت تصویر یا خطر بالینی ترخیص کرد'),
    ],
    correct: 'A',
    explanation: L(
      'Die AHA/ASA-Leitlinie hält bei Beginn <6 Stunden, ohne neues neurologisches Defizit und mit hochwertigem Nativ-CT, befundet durch einen Facharzt für Neuroradiologie, den CT-Ausschlussweg für vertretbar. Genau 6 Stunden sind von dieser CT-only-Empfehlung nicht abgedeckt und müssen klinisch beurteilt werden. Bei Vorstellung >6 Stunden oder bei neuem Defizit empfiehlt die Leitlinie nach negativem CT eine Liquorpunktion. Bei unzureichender Qualität oder anhaltend hohem Verdacht ist weitere Abklärung erforderlich.',
      'The AHA/ASA guideline considers a high-quality non-contrast CT interpreted by a board-certified neuroradiologist a reasonable rule-out pathway when onset was <6 hours earlier and there is no new neurological deficit. Exactly 6 hours is not covered by this CT-only recommendation and requires clinical assessment. For presentation >6 hours or with a new deficit, the guideline recommends lumbar puncture after a negative CT. Inadequate image quality or persistent high suspicion requires further evaluation.',
      'راهنمای AHA/ASA، در صورت شروع علائم کمتر از ۶ ساعت قبل، نبود نقص عصبی جدید و انجام CT بدون کنتراست باکیفیت که توسط نورورادیولوژیست دارای بورد تخصصی تفسیر شده باشد، مسیر رد با CT را قابل‌قبول می‌داند. دقیقاً ۶ ساعت تحت پوشش این توصیه CT به‌تنهایی نیست و نیاز به ارزیابی بالینی دارد. در مراجعه بیش از ۶ ساعت یا وجود نقص جدید، راهنما پس از CT منفی پونکسیون کمری را توصیه می‌کند. کیفیت ناکافی یا شک بالینی پایدار نیازمند بررسی بیشتر است.'
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
      'Grad 4 der Modifizierten Fisher-Skala: dickes Zisternenblut (≥1 mm) UND IVH. Die Skala ordnet die Blutlast ein und ersetzt keine klinische Überwachung.',
      'Modified Fisher Grade 4: thick cisternal blood (≥1 mm) AND IVH. The scale classifies blood burden and does not replace clinical monitoring.',
      'درجه ۴ فیشر اصلاح‌شده: خون ضخیم سیسترنی (≥۱ mm) و IVH. این مقیاس میزان خون را طبقه‌بندی می‌کند و جایگزین پایش بالینی نیست.'
    ),
  },
  {
    id: 'sab-q3',
    question: L(
      'Wie unterscheiden sich Modified-Fisher-Grad 2 (dünnes Blut + IVH) und Grad 3 (dickes Blut, kein IVH) anatomisch?',
      'How do Modified Fisher Grades 2 (thin blood + IVH) and 3 (thick blood, no IVH) differ anatomically?',
      'درجه ۲ فیشر اصلاح‌شده (خون نازک + IVH) و درجه ۳ (خون ضخیم، بدون IVH) چه تفاوتی دارند؟'
    ),
    options: [
      L('Grad 2 hat deutlich niedrigeres Risiko als Grad 3', 'Grade 2 has a markedly lower risk than Grade 3', 'درجه ۲ خطر بسیار کمتری از درجه ۳ دارد'),
      L('Die Skala stuft beide Muster als relevante Risikomerkmale ein; sie liefert keine individuelle Prozentwahrscheinlichkeit.', 'The scale treats both patterns as relevant risk markers; it does not provide an individual percentage probability.', 'مقیاس هر دو الگو را نشانگر خطر می‌داند؛ احتمال درصدی فردی ارائه نمی‌کند.'),
      L('Grad 2 hat etwa doppelt so hohes Risiko wie Grad 3', 'Grade 2 has about twice the risk of Grade 3', 'درجه ۲ تقریباً دو برابر درجه ۳ خطر دارد'),
      L('Grad 3 hat unabhängig von IVH immer das höchste Risiko aller Grade', 'Grade 3 always has the highest risk of all grades regardless of IVH', 'درجه ۳ صرف‌نظر از IVH همیشه بیشترین خطر را در میان همه درجات دارد'),
    ],
    correct: 'B',
    explanation: L(
      'Grad 2 kombiniert dünnes Zisternenblut mit IVH; Grad 3 zeigt dickes Zisternenblut ohne IVH. Die Skala kombiniert beide Merkmale, um die Risikoeinordnung zu unterstützen; sie liefert keine patientenspezifische Ereignisrate.',
      'Grade 2 combines thin cisternal blood with IVH; Grade 3 has thick cisternal blood without IVH. The scale combines both features to support risk stratification; it does not provide a patient-specific event rate.',
      'درجهٔ ۲ خون نازک سیسترنی همراه IVH دارد؛ درجهٔ ۳ خون ضخیم سیسترنی بدون IVH. مقیاس این دو ویژگی را برای رده‌بندی خطر ترکیب می‌کند و میزان رخداد فردی بیمار را پیش‌بینی نمی‌کند.'
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
      L('Der Befund bleibt kontextabhängig; die Wahl zwischen CTA allein und DSA ist für diese Verteilung nicht abschließend geklärt.', 'Interpretation remains context-dependent; the choice between CTA alone and DSA is not settled for this pattern.', 'تفسیر وابسته به زمینه است؛ انتخاب CTA تنها یا DSA برای این الگو هنوز قطعی نشده است.'),
      L('Sofortige neurochirurgische Intervention erforderlich', 'Immediate neurosurgical intervention required', 'مداخله جراحی اعصاب فوری لازم است'),
      L('Intensiviertes Vasospasmusmonitoring ab Tag 4 notwendig', 'Intensive vasospasm monitoring from day 4 required', 'مانیتورینگ فشرده وازواسپاسم از روز ۴ لازم است'),
    ],
    correct: 'B',
    explanation: L(
      'Ein typisches perimesenzephales Muster kann mit einer nichtaneurysmatischen Ursache und günstigerem Verlauf vereinbar sein. Das Muster plus negative CTA klärt die Quelle jedoch nicht in jedem Fall abschließend; die AHA/ASA beschreibt die Wahl CTA allein versus DSA als ungeklärt.',
      'A typical perimesencephalic pattern may be consistent with a non-aneurysmal source and a more favourable course. The pattern plus a negative CTA does not settle the source in every case; AHA/ASA describes the choice of CTA alone versus DSA as unresolved.',
      'الگوی تیپیک پری‌مزنسفالیک می‌تواند با علت غیرآنوریسمی و سیر مطلوب‌تر سازگار باشد. با این حال، الگو به‌همراه CTA منفی در همهٔ موارد منشأ را قطعی نمی‌کند؛ AHA/ASA انتخاب CTA تنها در برابر DSA را حل‌نشده می‌داند.'
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
      'Das Risiko für DCI und Vasospasmus besteht im Verlauf der ersten zwei Wochen, ist aber nicht auf einen festen Tagesbereich begrenzt. DCI kann auch ohne nachweisbaren großgefäßigen Vasospasmus auftreten.',
      'Risk of DCI and vasospasm extends through the first two weeks, but is not limited to a fixed day range. DCI can occur without demonstrable large-vessel vasospasm.',
      'خطر DCI و وازواسپاسم طی دو هفتهٔ نخست مطرح است، اما به بازهٔ روزی ثابتی محدود نیست. DCI می‌تواند بدون وازواسپاسم قابل‌مشاهده در عروق بزرگ هم رخ دهد.'
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
      'Die Aneurysmasuche richtet sich nach der Blutverteilung: zum Beispiel interhemisphärische Blutung mit Blick auf die A. communicans anterior, einseitige Fossa-Sylvii-Blutung mit Blick auf die A. cerebri media und Blut an der hinteren Schädelbasis mit Blick auf die hintere Zirkulation. Das sind Suchhinweise, keine Beweise.',
      'Use the blood distribution to guide aneurysm search: for example, interhemispheric blood prompts review of the anterior communicating artery, unilateral Sylvian blood prompts review of the middle cerebral artery, and posterior basal blood prompts review of the posterior circulation. These are search clues, not proof.',
      'توزیع خون مسیر جست‌وجوی آنوریسم را هدایت می‌کند: برای مثال، خون بین‌نیمکره‌ای توجه به شریان ارتباطی قدامی، خون یک‌طرفه در شکاف سیلویوس توجه به شریان مغزی میانی و خون در قاعدهٔ خلفی توجه به گردش خون خلفی را برمی‌انگیزد. این‌ها سرنخ هستند، نه اثبات.'
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
      'Aus diesen zwei Parametern ergibt sich Grad 0–4. Höhere Grade beschreiben eine größere Blutlast; das individuelle Risiko hängt zusätzlich vom klinischen Verlauf ab.',
      'These two parameters determine grades 0–4. Higher grades describe greater blood burden; individual risk also depends on the clinical course.',
      'این دو پارامتر درجات ۰ تا ۴ را تعیین می‌کنند. درجات بالاتر نشان‌دهنده بار خونی بیشترند؛ خطر فردی به سیر بالینی نیز وابسته است.'
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
      'Welche Merkmale kennzeichnen Modified-Fisher-Grad 4?',
      'Which features define Modified Fisher Grade 4?',
      'چه یافته‌هایی درجه ۴ فیشر اصلاح‌شده را مشخص می‌کنند؟'
    ),
    back: L(
      'Dickes Zisternenblut (≥1 mm) + IVH',
      'Thick cisternal blood (≥1 mm) + IVH',
      'خون ضخیم سیسترنی (≥۱ mm) + IVH'
    ),
    explanation: L(
      'Grad 4 kombiniert dickes Zisternenblut und IVH. Die Skala beschreibt die Blutlast und ist kein individueller Wahrscheinlichkeitsrechner.',
      'Grade 4 combines thick cisternal blood and IVH. The scale describes blood burden; it is not an individual probability calculator.',
      'درجه ۴ ترکیب خون ضخیم سیسترنی و IVH است. مقیاس میزان خون را توصیف می‌کند و محاسبه‌گر احتمال فردی نیست.'
    ),
    diagram: L(
      'Blutdicke + IVH bestimmen Modified-Fisher-Grad 0–4',
      'Blood thickness + IVH determine Modified Fisher Grade 0–4',
      'ضخامت خون + IVH درجه ۰ تا ۴ فیشر اصلاح‌شده را تعیین می‌کنند'
    ),
    topicId: 'subarachnoidalblutung',
    tags: ['fisher-skala', 'vasospasmus'],
  },
  {
    id: 'sab-fc-3',
    front: L(
      'Wie unterscheiden sich Modified-Fisher-Grad 2 (dünnes Blut + IVH) und Grad 3 (dickes Blut, kein IVH)?',
      'How do Modified Fisher Grade 2 (thin blood + IVH) and Grade 3 (thick blood, no IVH) differ?',
      'درجه ۲ فیشر اصلاح‌شده (خون نازک + IVH) و درجه ۳ (خون ضخیم، بدون IVH) چه تفاوتی دارند؟'
    ),
    back: L(
      'Grad 2: dünnes Blut + IVH. Grad 3: dickes Blut ohne IVH.',
      'Grade 2: thin blood + IVH. Grade 3: thick blood without IVH.',
      'درجه ۲: خون نازک + IVH. درجه ۳: خون ضخیم بدون IVH.'
    ),
    explanation: L(
      'Die Grade unterscheiden sich durch die Kombination von Blutdicke und IVH. Grad 2: dünn + IVH; Grad 3: dick + kein IVH.',
      'The grades differ by the combination of blood thickness and IVH. Grade 2: thin + IVH; Grade 3: thick + no IVH.',
      'درجات با ترکیب ضخامت خون و IVH تفاوت دارند. درجه ۲: نازک + IVH؛ درجه ۳: ضخیم + بدون IVH.'
    ),
    diagram: L(
      'Grad 2: dünn + IVH\nGrad 3: dick + kein IVH',
      'Grade 2: thin + IVH\nGrade 3: thick + no IVH',
      'درجه ۲: نازک + IVH\nدرجه ۳: ضخیم + بدون IVH'
    ),
    topicId: 'subarachnoidalblutung',
    tags: ['fisher-skala', 'vasospasmus'],
  },
  {
    id: 'sab-fc-4',
    front: L(
      'Wann kann ein negatives natives CT eine SAB ausschließen, und wann ist weitere Abklärung nötig?',
      'When can a negative non-contrast CT exclude SAH, and when is further evaluation needed?',
      'چه زمانی CT منفی می‌تواند SAB را رد کند و چه وقت بررسی بیشتر لازم است؟'
    ),
    back: L(
      'Bei <6 h, ohne neues neurologisches Defizit und mit hochwertigem Nativ-CT, befundet durch einen Facharzt für Neuroradiologie, kann ein negativer CT-Befund vertretbar zum Ausschluss beitragen. Genau 6 h ist durch diese Empfehlung nicht abgedeckt. Bei >6 h oder neuem Defizit empfiehlt die Leitlinie nach negativem CT eine Liquoranalyse.',
      'At <6 hours, with no new neurological deficit and a high-quality non-contrast CT interpreted by a board-certified neuroradiologist, a negative CT may reasonably contribute to exclusion. Exactly 6 hours is not covered by this recommendation. At >6 hours or with a new deficit, the guideline recommends CSF analysis after a negative CT.',
      'در کمتر از ۶ ساعت، بدون نقص عصبی جدید و با CT بدون کنتراست باکیفیت که توسط نورورادیولوژیست دارای بورد تخصصی تفسیر شده باشد، CT منفی می‌تواند به‌طور قابل‌قبول در رد بیماری نقش داشته باشد. دقیقاً ۶ ساعت تحت پوشش این توصیه نیست. پس از بیش از ۶ ساعت یا در صورت نقص جدید، راهنما پس از CT منفی آنالیز CSF را توصیه می‌کند.'
    ),
    explanation: L(
      'Die Aussagekraft des CT nimmt mit der Zeit ab. Bei später Vorstellung oder unzureichender CT-Qualität umfasst die weitere Abklärung eine Lumbalpunktion mit Erythrozyten- und Xanthochromieanalyse nach lokalem Laborprotokoll; ein starres Zwei-Stunden-Fenster ist nicht allgemein gültig.',
      'CT sensitivity decreases over time. With later presentation or inadequate CT quality, further evaluation includes lumbar puncture with red-cell and xanthochromia analysis according to the local laboratory protocol; a rigid two-hour rule is not generally valid.',
      'حساسیت CT با گذشت زمان کاهش می‌یابد. در مراجعه دیرهنگام یا کیفیت ناکافی CT، بررسی بیشتر شامل پونکسیون لومبار و ارزیابی گلبول قرمز و زانتوکرومی طبق پروتکل آزمایشگاه محلی است؛ قانون ثابت دو ساعته اعتبار عمومی ندارد.'
    ),
    diagram: L(
      'Zeitpunkt + Neurostatus + CT-Qualität → diagnostischen Weg wählen',
      'Timing + neurological examination + CT quality → choose the diagnostic pathway',
      'زمان + معاینه عصبی + کیفیت CT → انتخاب مسیر تشخیصی'
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
      'Typisches perimesenzephales Blutmuster; CTA-vs.-DSA-Strategie ist nicht abschließend geklärt.',
      'Typical perimesencephalic blood pattern; the CTA-versus-DSA strategy is not settled.',
      'الگوی خونریزی پری‌مزنسفالیک تیپیک؛ راهبرد CTA در برابر DSA هنوز قطعی نیست.'
    ),
    explanation: L(
      'Das typische Muster ist auf die perimesenzephalen Zisternen konzentriert. Die AHA/ASA-Leitlinie beschreibt Unsicherheit, ob bei klassischem Muster CTA allein oder zusätzlich DSA genügt.',
      'The typical pattern is centred on the perimesencephalic cisterns. The AHA/ASA guideline notes uncertainty about CTA alone versus additional DSA for a classic pattern.',
      'الگوی تیپیک در سیسترن‌های پری‌مزنسفالیک متمرکز است. راهنمای AHA/ASA درباره کفایت CTA به‌تنهایی یا نیاز به DSA اضافی در الگوی کلاسیک عدم قطعیت را بیان می‌کند.'
    ),
    diagram: L(
      'Perimesenzephales Muster → CTA; mögliche zusätzliche DSA im klinischen Kontext',
      'Perimesencephalic pattern → CTA; consider additional DSA in clinical context',
      'الگوی پری‌مزنسفالیک → CTA؛ بررسی DSA اضافی با توجه به زمینه بالینی'
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
      'Frühe Rezidivblutung ist eine akute Gefahr. Bei aSAB soll das rupturierte Aneurysma durch ein erfahrenes Team zügig, möglichst innerhalb von 24 Stunden, gesichert werden. DCI und Vasospasmus treten typischerweise später auf; Nimodipin wird früh enteral gegeben.',
      'Early rebleeding is an acute danger. In aSAH, an experienced team should secure the ruptured aneurysm promptly, preferably within 24 hours. DCI and vasospasm typically occur later; nimodipine is started early by the enteral route.',
      'خونریزی مجدد زودرس یک خطر حاد است. در aSAB، تیم باتجربه باید آنوریسم پاره‌شده را سریع و ترجیحاً ظرف ۲۴ ساعت ایمن‌سازی کند. DCI و وازواسپاسم معمولاً دیرتر رخ می‌دهند؛ نیمودیپین زودهنگام از راه انتروال شروع می‌شود.'
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
      'Plötzlich einsetzender, innerhalb kurzer Zeit maximal starker Kopfschmerz – ein Warnmuster, das dringlich abgeklärt werden muss.',
      'A headache that begins suddenly and reaches maximum intensity rapidly is a warning pattern requiring urgent evaluation.',
      'سردردی که ناگهانی آغاز می‌شود و در مدت کوتاهی به بیشترین شدت می‌رسد، یک الگوی هشداردهنده است و باید فوری بررسی شود.'
    ),
    explanation: L(
      'Mögliche Ursachen umfassen SAB, RCVS, Dissektion und zerebrale Venenthrombose. Initiales natives CT; bei negativem CT richtet sich die weitere Abklärung nach Zeitpunkt, Neurostatus, Bildqualität und klinischem Verdacht.',
      'Possible causes include SAH, RCVS, dissection and cerebral venous thrombosis. Start with non-contrast CT; after a negative CT, further evaluation depends on timing, neurological findings, image quality and clinical suspicion.',
      'علل احتمالی شامل SAB، RCVS، دیسکسیون و ترومبوز وریدی مغزی است. بررسی با CT بدون کنتراست آغاز می‌شود؛ پس از CT منفی، ارزیابی بیشتر به زمان، یافته‌های عصبی، کیفیت تصویر و شک بالینی بستگی دارد.'
    ),
    topicId: 'subarachnoidalblutung',
    tags: ['klinik'],
  },
  {
    id: 'sab-fc-8',
    front: L(
      'Was ist der „Sentinel Headache" und welche Gefahr birgt er?',
      'What is the "sentinel headache" and what danger does it carry?',
      '«سردرد هشداردهنده (sentinel headache)» چیست و چه خطری دارد؟'
    ),
    back: L(
      'Ein vorausgehender Warnkopfschmerz kann vorkommen; seine Häufigkeit ist variabel und sein Fehlen schließt SAB nicht aus.',
      'A preceding warning headache may occur; reported frequency varies, and its absence does not exclude SAH.',
      'سردرد هشداردهنده ممکن است پیش از آن رخ دهد؛ فراوانی گزارش‌شده متغیر است و نبود آن SAB را رد نمی‌کند.'
    ),
    explanation: L(
      'Ein Sentinel-Kopfschmerz kann bei einer kleinen vorausgehenden Blutung oder Aneurysmaveränderung auftreten; der Mechanismus ist nicht immer sicher feststellbar. Er ist ein Warnsymptom, aber weder ein Beweis für eine bevorstehende Ruptur noch eine Vorhersage einer Rezidivblutung. Plötzlich maximaler Kopfschmerz muss dringend abgeklärt werden.',
      'A sentinel headache may occur with a small preceding leak or aneurysm change, although the mechanism is not always established. It is a warning symptom, but neither proof of an impending rupture nor a prediction of rebleeding. Sudden maximal headache requires urgent evaluation.',
      'سردرد هشداردهنده ممکن است با نشت خون اندک یا تغییر آنوریسم پیش از خونریزی عمده همراه باشد، اما سازوکار آن همیشه روشن نیست. این سردرد علامت هشدار است، نه اثبات پارگی قریب‌الوقوع و نه پیش‌بینی‌کنندهٔ خونریزی مجدد. سردرد ناگهانی که سریع به اوج می‌رسد باید فوری بررسی شود.'
    ),
    diagram: L(
      'Possible leak/change → warning headache → urgent assessment; rebleed is not inevitable',
      'Possible leak/change → warning headache → urgent assessment; rebleed is not inevitable',
      'نشت/تغییر احتمالی → سردرد هشداردهنده → بررسی فوری؛ خونریزی مجدد حتمی نیست'
    ),
    topicId: 'subarachnoidalblutung',
    tags: ['klinik'],
  },
]
