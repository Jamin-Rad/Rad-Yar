const L = (de, en, fa) => ({ de, en, fa })

export const GEHIRN_CHIARI_LESSON = {
  id: 'chiari-bildmuster',
  title: L('Chiari-Malformation: Tonsillentiefstand im Kontext beurteilen', 'Chiari malformation: assess tonsillar descent in context', 'مالفورماسیون Chiari: افتادگی لوزهٔ مخچه را در زمینه ارزیابی کنید'),
  sourcePages: [87, 88],
  objective: L('Sie messen die Tonsillenlage reproduzierbar an der McRae-Linie, prüfen die Konfiguration des kraniozervikalen Übergangs und suchen nach erworbenen Ursachen der Tonsillenektopie.', 'You will measure tonsillar position reproducibly against McRae’s line, assess the craniocervical junction, and look for acquired causes of tonsillar ectopia.', 'موقعیت لوزه‌های مخچه را به‌صورت تکرارپذیر نسبت به خط مک‌ری می‌سنجید، محل اتصال جمجمه و گردن را ارزیابی می‌کنید و علل اکتسابی اکتوپی لوزه را جست‌وجو می‌کنید.'),
  chapters: [
    {
      id: 'measure', pages: '87',
      title: L('Mittellinie und McRae-Linie zuerst festlegen', 'Establish the midline and McRae line first', 'ابتدا خط میانی و خط مک‌ری را مشخص کنید'),
      text: L('Messen Sie in einer echten sagittalen Mittellinienaufnahme senkrecht von der McRae-Linie (Basion bis Opisthion) zur Tonsillenspitze. Dokumentieren Sie Seite und Abstand beider Tonsillen; notieren Sie, wenn Mittellinie oder Landmarken unsicher sind.\n\nAls klinischer Orientierungsrahmen gilt meist: unter 3 mm normal, 3–5 mm grenzwertig und mindestens 5 mm als bildgebender Schwellenwert für Chiari I. Das ist keine Diagnose allein anhand der Zahl: Bei 3–5 mm können eine Syringomyelie oder deutlich peg-shaped Tonsillen die Einordnung verändern. Prüfen Sie Morphologie, Enge und klinischen Kontext.', 'On a true mid-sagittal image, measure perpendicular from McRae’s line (basion to opisthion) to the tonsillar tip. Record side and distance for each tonsil; note uncertainty in the midline or landmarks.\n\nA common clinical framework is: under 3 mm, normal; 3–5 mm, borderline; and at least 5 mm, an imaging threshold for Chiari I. This is not a diagnosis from the number alone: with 3–5 mm descent, a syrinx or distinctly peg-shaped tonsils can change the interpretation. Assess morphology, crowding, and clinical context.', 'در تصویر واقعی ساژیتال میانی، فاصلهٔ عمودی نوک لوزه را از خط مک‌ری (بازیون تا اوپیستیون) اندازه بگیرید. سمت و فاصلهٔ هر دو لوزه را ثبت کنید و اگر خط میانی یا نشانه‌ها نامطمئن‌اند، این محدودیت را بنویسید.\n\nچارچوب رایج بالینی چنین است: کمتر از ۳ میلی‌متر طبیعی، ۳ تا ۵ میلی‌متر مرزی و دست‌کم ۵ میلی‌متر آستانهٔ تصویربرداری برای Chiari I. این عدد به‌تنهایی تشخیص نیست: در افتادگی ۳ تا ۵ میلی‌متر، وجود سیرنگومیلی یا شکل نوک‌تیز واضح لوزه می‌تواند تفسیر را تغییر دهد. مورفولوژی، تنگی و زمینهٔ بالینی را هم ارزیابی کنید.'),
    },
    {
      id: 'constellations', pages: '87',
      title: L('Begleitkonstellationen statt Zahl allein', 'Assess associated patterns, not the number alone', 'آرایش یافته‌های همراه را بسنجید، نه فقط عدد را'),
      text: L('Bei einer Chiari-I-Konstellation kann eine Syringomyelie im Rückenmark ein wichtiger Begleitbefund sein. Beurteilen Sie die hintere Schädelgrube und den kraniozervikalen Übergang auf Enge, Tonsillenform und weitere Hirnstammbeteiligung. Eine Cine-Phasenkontrast-MRT kann den Liquorfluss untersuchen, wenn dies klinisch gefragt ist; sie ist kein Ersatz für eine vollständige morphologische Beurteilung.\n\nDie PDF beschreibt bei Chiari II zusätzlich Tiefstand von Vermis, Hirnstamm und viertem Ventrikel sowie eine kleine hintere Schädelgrube, häufig im Zusammenhang mit offener Spina bifida/Myelomeningozele. Bei Chiari III zeigt sie eine okzipitale oder hohe zervikale Enzephalozele mit Hindbrain-Anteilen. Diese Muster sind getrennte morphologische Konstellationen; die Lektion ergänzt keine Therapie- oder Prognoseregeln.', 'A syrinx in the spinal cord may be an important associated finding in a Chiari I pattern. Assess the posterior fossa and craniocervical junction for crowding, tonsillar shape, and further brainstem involvement. Cine phase-contrast MRI can assess CSF flow when clinically relevant; it does not replace a full morphological assessment.\n\nFor Chiari II, the PDF additionally describes descent of the vermis, brainstem, and fourth ventricle with a small posterior fossa, often in association with open spina bifida/myelomeningocele. For Chiari III, it shows an occipital or high cervical encephalocele containing hindbrain structures. These are distinct morphological patterns; this lesson adds no treatment or prognostic rules.', 'در الگوی Chiari I، سیرنگومیلی در نخاع می‌تواند یافتهٔ همراه مهمی باشد. تنگی حفرهٔ خلفی و محل اتصال جمجمه و گردن، شکل لوزه‌ها و درگیری بیشتر ساقهٔ مغز را ارزیابی کنید. MRI سینمایی با کنتراست فاز می‌تواند در صورت وجود پرسش بالینی جریان CSF را بررسی کند؛ اما جای ارزیابی کامل مورفولوژیک را نمی‌گیرد.\n\nدر Chiari II، PDF علاوه بر این افتادگی ورمیس، ساقهٔ مغز و بطن چهارم را همراه با حفرهٔ خلفی کوچک توصیف می‌کند که اغلب با اسپینابیفیدای باز/میلومننگوسل همراه است. در Chiari III، PDF انسفالوسل پس‌سری یا گردنی فوقانی حاوی ساختارهای hindbrain را نشان می‌دهد. این‌ها آرایش‌های مورفولوژیک جداگانه‌اند؛ این درس قاعدهٔ درمان یا پیش‌آگهی اضافه نمی‌کند.'),
    },
    {
      id: 'acquired', pages: '88',
      title: L('Erworbene Tonsillenektopie aktiv ausschließen', 'Actively exclude acquired tonsillar ectopia', 'اکتوپی اکتسابی لوزه را فعالانه رد کنید'),
      text: L('Tonsillenektopie kann einen niedrigen Messwert vortäuschen oder eine Chiari-I-Konstellation nachahmen. Prüfen Sie deshalb besonders bei 3–5 mm, ob Hinweise auf Liquorhypovolämie/-hypotension (z. B. pachymeningeale Aufnahme), erhöhten intrakraniellen Druck, eine hintere Schädelgrubenraumforderung oder Überdrainage nach Liquorableitung bestehen. Erst nach dieser Ursachenprüfung lässt sich eine primäre Chiari-I-Konstellation sinnvoll einordnen.', 'Acquired tonsillar ectopia can produce low measurements or mimic a Chiari I pattern. This distinction matters especially at 3–5 mm: look for evidence of CSF hypovolemia/intracranial hypotension (for example, pachymeningeal enhancement), raised intracranial pressure, a posterior fossa mass, or CSF overdrainage. Assess these causes before classifying a primary Chiari I pattern.', 'اکتوپی اکتسابی لوزه می‌تواند فاصلهٔ کم ایجاد کند یا شبیه الگوی Chiari I باشد. این افتراق به‌ویژه در بازهٔ ۳ تا ۵ میلی‌متر اهمیت دارد: شواهد افت حجم/فشار CSF (مثلاً enhancement پاچی‌مننژیال)، افزایش فشار داخل‌جمجمه، تودهٔ حفرهٔ خلفی یا تخلیهٔ بیش‌ازحد CSF را بررسی کنید. پیش از طبقه‌بندی به‌عنوان Chiari I اولیه، این علل را بسنجید.'),
    },
  ],
  assessment: {
    id: 'gehirn-chiari-ectopia-check', sourcePages: [87, 88],
    question: L('Im sagittalen MRT liegen die Tonsillen tief. Welcher nächste Schritt vermeidet eine vorschnelle Chiari-I-Zuordnung?', 'On sagittal MRI, the tonsils are low. Which next step avoids premature labelling as Chiari I?', 'در MRI ساژیتال لوزه‌ها پایین هستند. کدام گام از نسبت‌دادن شتاب‌زده به Chiari I جلوگیری می‌کند؟'),
    options: [
      L('McRae-Linie/Landmarken prüfen, Begleitkonstellation beschreiben und erworbene Ursachen suchen', 'Check McRae’s line/landmarks, describe associated findings, and look for acquired causes', 'خط مک‌ری و نشانه‌ها را بررسی کنید، یافته‌های همراه را توصیف و علل اکتسابی را جست‌وجو کنید'),
      L('Nur den Abstand messen und ohne Kontext die Diagnose festlegen', 'Measure the distance only and diagnose without context', 'فقط فاصله را اندازه بگیرید و بدون زمینه تشخیص دهید'),
      L('Eine normale Cine-MRT als Ausschluss aller Chiari-Muster werten', 'Use a normal cine MRI to exclude every Chiari pattern', 'MRI سینمایی طبیعی را برای رد همهٔ الگوهای Chiari کافی بدانید'),
      L('Eine parasagittale Messung ohne Prüfung der Mittellinie als ausreichend ansehen', 'Treat a parasagittal measurement without confirming the midline as sufficient', 'اندازه‌گیری پاراساژیتال بدون تأیید خط میانی را کافی بدانید'),
    ],
    correctIndex: 0,
    feedback: L('Richtig. Eine saubere Messung ist wichtig, aber nicht hinreichend. Prüfen Sie Morphologie, Syrinx/andere Begleitbefunde sowie Hypo-/Hypertension, Masse und Liquorableitung.', 'Correct. Accurate measurement matters but is not sufficient. Assess morphology, syrinx/other associated findings, and hypotension/hypertension, mass, and CSF diversion.', 'درست است. اندازه‌گیری دقیق مهم است اما کافی نیست. مورفولوژی، سیرنگومیلی/یافته‌های همراه و نیز افت یا افزایش فشار، توده و شانت را بررسی کنید.'),
    retry: L('Die Tieflage ist zunächst ein Befund. Verifizieren Sie die Landmarken und suchen Sie nach Ursache und Begleitzeichen.', 'Low position is initially a finding. Verify landmarks and look for cause and associated signs.', 'پایین‌بودن ابتدا یک یافته است؛ نشانه‌های آناتومیک را تأیید و علت و یافته‌های همراه را جست‌وجو کنید.'),
  },
  references: [
    { label: 'Gehirn.pdf, PDF pp.87–88 (printed pp.86–87)', href: null },
    { label: 'Ciaramitaro P, et al. Diagnosis and treatment of Chiari malformation and syringomyelia in adults: international consensus document. Neurol Sci. 2022;43:1327–1342.', href: 'https://pubmed.ncbi.nlm.nih.gov/34129128/' },
    { label: 'Massimi L, et al. Diagnosis and treatment of Chiari malformation type 1 in children: the International Consensus Document. Neurol Sci. 2021;42:1311–1326.', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8789635/' },
    { label: 'Congress of Neurological Surgeons. Systematic Guidelines for Chiari Malformation: Diagnosis (2023).', href: 'https://www.cns.org/guidelines/browse-guidelines-detail/1-imaging' },
  ],
  media: L('Code-native sagittales Schema mit McRae-Linie, keine diagnostische MRT. Abbildungen aus Gehirn.pdf pp.87–88 wurden nicht übernommen, weil Provenienz und Nutzungsrechte ungeklärt sind.', 'Code-native sagittal schematic with McRae’s line, not a diagnostic MRI. Figures from Gehirn.pdf pp.87–88 were not reused because provenance and rights are unresolved.', 'شماتیک ساژیتالِ خط مک‌ری با کد ساخته شده و MRI تشخیصی نیست. تصاویر صفحات ۸۷–۸۸ Gehirn.pdf به‌دلیل نامشخص‌بودن منشأ و حقوق استفاده نشده‌اند.'),
  reviewStatus: L('Entwurf: unabhängige Quellen-/Lektionsprüfung abgeschlossen; Browser-/RTL-Prüfung und klinische Fachfreigabe stehen aus.', 'Draft: independent source/lesson review is complete; browser/RTL review and clinical specialist sign-off remain pending.', 'پیش‌نویس: بازبینی مستقل منبع و درس انجام شده؛ بررسی مرورگر/راست‌به‌چپ و تأیید متخصص بالینی باقی مانده است.'),
}

export const GEHIRN_CHIARI_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => {
  const assessment = GEHIRN_CHIARI_LESSON.assessment
  return [lang, [{
    id: `chiari-malformation-${lang}-1`,
    tags: ['chiari-malformation'],
    fach: 'gehirn',
    question: assessment.question[lang],
    options: assessment.options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
    correct: String.fromCharCode(65 + assessment.correctIndex),
    explanation: assessment.feedback[lang],
  }]]
}))
