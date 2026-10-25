const t = (de, en, fa) => ({ de, en, fa })

export const DE_QUERVAIN_LESSON = {
  id: 'de-quervain',
  title: t('Tendovaginitis de Quervain', "De Quervain's tenosynovitis", 'تنوسینوویت دو کروَن'),
  heroImage: '/educational/de-quervain/first-extensor-compartment.svg',
  alt: t(
    'Schematische Darstellung des ersten Strecksehnenfachs mit APL- und EPB-Sehne über dem Processus styloideus radii.',
    'Schematic of the first extensor compartment with the APL and EPB tendons over the radial styloid.',
    'نمای شماتیک کمپارتمان اول اکستانسور؛ تاندون‌های APL و EPB از روی زائده استایلوئید رادیوس عبور می‌کنند.'
  ),
  intro: {
    title: t('Welches Fach ist betroffen?', 'Which compartment is affected?', 'کدام کمپارتمان درگیر است؟'),
    text: t(
      'De Quervain ist eine stenosierende Tenosynovitis des ersten Strecksehnenfachs am radialen Processus styloideus. In diesem Fach verlaufen die Sehnen von M. abductor pollicis longus (APL) und M. extensor pollicis brevis (EPB).',
      "De Quervain's is a stenosing tenosynovitis of the first extensor compartment at the radial styloid. This compartment contains the abductor pollicis longus (APL) and extensor pollicis brevis (EPB) tendons.",
      'دو کروَن تنوسینوویت تنگ‌کنندهٔ کمپارتمان اول اکستانسور در سطح زائدهٔ استایلوئید رادیوس است. تاندون‌های عضلات abductor pollicis longus (APL) و extensor pollicis brevis (EPB) از این کمپارتمان می‌گذرند.'
    ),
  },
  chapters: [
    {
      id: 'clinical-pattern', icon: '⌖',
      title: t('Klinisches Muster und Provokationstest', 'Clinical pattern and provocative manoeuvre', 'الگوی بالینی و مانور تحریکی'),
      lead: t(
        'Typisch ist radialseitiger Schmerz an der Tabatière/Fossa radialis, der bei Daumenbewegung auftritt oder zunimmt. Die PDF nennt eine Provokation mit in die Faust eingeschlagenem Daumen und anschließender ulnarer Abweichung der Hand.',
        'A typical pattern is radial-sided pain at the anatomical snuffbox/radial fossa that occurs or worsens with thumb movement. The PDF describes a manoeuvre with the thumb folded into the fist followed by ulnar deviation of the hand.',
        'الگوی معمول، درد در سمت رادیال مچ و ناحیهٔ گودی اسناف‌باکس است که با حرکت شست ایجاد یا تشدید می‌شود. در PDF مانوری با قرار دادن شست داخل مشت و سپس انحراف دست به سمت اولنار توصیف شده است.'
      ),
      note: t(
        'Terminologie beachten: Die im PDF als Finkelstein-Test bezeichnete Variante mit eingeschlagenem Daumen wird in der Literatur häufig als Eichhoff-Manöver abgegrenzt. Schmerzprovokation allein ist kein beweisender Befund; Testnamen und Ausführung sind nicht einheitlich verwendet.',
        'Terminology matters: the thumb-in-fist variant labelled the Finkelstein test in the PDF is often distinguished in the literature as the Eichhoff manoeuvre. Pain provocation alone is not diagnostic; test names and descriptions are used inconsistently.',
        'به نام‌گذاری توجه کنید: مانورِ قرار دادن شست داخل مشت که در PDF «تست فینکلشتاین» نامیده شده، در بسیاری از منابع به‌عنوان مانور آیکهوف از تست فینکلشتاین تفکیک می‌شود. بازتولید درد به‌تنهایی تشخیصی نیست و نام و اجرای این آزمون‌ها در منابع یکسان نیست.'
      ),
      source: t('MSK.pdf, PDF-S. 42 / Druck-S. 41; Wu et al. 2018.', 'MSK.pdf, PDF p. 42 / printed p. 41; Wu et al. 2018.', 'MSK.pdf، صفحهٔ PDF ۴۲ / صفحهٔ چاپی ۴۱؛ Wu و همکاران، ۲۰۱۸.'),
    },
    {
      id: 'mri-workflow', icon: '▧',
      title: t('Welche MRT-Sequenzen helfen?', 'Which MRI sequences help?', 'کدام سکانس‌های MRI کمک‌کننده‌اند؟'),
      lead: t(
        'Die Sequenzwahl richtet sich nach der Frage: Flüssigkeit und Ödem im ersten Fach werden mit fettgesättigten, flüssigkeitssensitiven Sequenzen gesucht; T1-w ergänzt die anatomische Beurteilung.',
        'Choose sequences to answer the question: use fat-suppressed, fluid-sensitive sequences to assess fluid and oedema in the first compartment; T1-weighted imaging complements the anatomic assessment.',
        'سکانس را بر اساس پرسش انتخاب کنید: برای بررسی مایع و ادم در کمپارتمان اول از سکانس‌های حساس به مایع با سرکوب چربی استفاده کنید؛ تصاویر T1 وزن‌شده ارزیابی آناتومیک را تکمیل می‌کنند.'
      ),
      rows: [
        [t('PD-FS oder T2-FS', 'PD-FS or T2-FS', 'PD-FS یا T2-FS'), t('Fettgesättigt; laut PDF für Ödem und Flüssigkeit.', 'Fat-suppressed; the PDF identifies these for oedema and fluid.', 'با سرکوب چربی؛ در PDF برای بررسی ادم و مایع ذکر شده‌اند.')],
        [t('T1-w', 'T1-weighted', 'T1 وزن‌شده'), t('Anatomische Darstellung und Sehnenstruktur.', 'Anatomic depiction and tendon structure.', 'نمای آناتومیک و ساختار تاندون.')],
        [t('T1 nach Kontrastmittel (optional)', 'Post-contrast T1 (optional)', 'T1 پس از تزریق مادهٔ حاجب (اختیاری)'), t('Kann aktive Synovialitis durch Anreicherung der Sehnenscheide zeigen.', 'May show active synovitis through tendon-sheath enhancement.', 'ممکن است سینوویت فعال را با افزایش جذب مادهٔ حاجب در غلاف تاندون نشان دهد.')],
      ],
      note: t('Die vorliegende PDF-Seite beschreibt MRT-Kriterien. Sie liefert keine ausreichend ausgearbeitete Sonographie-Kriterienliste; solche Kriterien werden hier deshalb nicht ergänzt.', 'The supplied PDF page describes MRI criteria. It does not provide a sufficiently developed ultrasound criteria list, so none are added here.', 'صفحهٔ PDF موجود معیارهای MRI را شرح می‌دهد و فهرست کامل و کافی از معیارهای سونوگرافی ارائه نمی‌کند؛ بنابراین در این درس معیارهای سونوگرافی اضافه نشده‌اند.'),
      source: t('MSK.pdf, PDF-S. 42 / Druck-S. 41.', 'MSK.pdf, PDF p. 42 / printed p. 41.', 'MSK.pdf، صفحهٔ PDF ۴۲ / صفحهٔ چاپی ۴۱.'),
    },
    {
      id: 'mri-findings', icon: '◉',
      title: t('Wo liegen die entscheidenden MRT-Zeichen?', 'Where are the key MRI findings?', 'یافته‌های کلیدی MRI کجا هستند؟'),
      lead: t('Folgen Sie dem ersten Fach am radialen Processus styloideus und beurteilen Sie Sehnen, Sehnenscheide und direktes Umfeld getrennt.', 'Trace the first compartment at the radial styloid and assess the tendons, tendon sheath and immediate surrounding tissues separately.', 'کمپارتمان اول را در سطح زائدهٔ استایلوئید رادیوس دنبال کنید و تاندون‌ها، غلاف تاندون و بافت‌های اطراف را جداگانه ارزیابی کنید.'),
      rows: [
        [t('APL und EPB', 'APL and EPB', 'APL و EPB'), t('Verdickung und erhöhtes T2-Signal.', 'Thickening and increased T2 signal.', 'ضخیم‌شدن و افزایش سیگنال T2.')],
        [t('Sehnenscheide', 'Tendon sheath', 'غلاف تاندون'), t('Flüssigkeit als Halo-Zeichen und/oder Wandverdickung.', 'Fluid as a halo sign and/or sheath-wall thickening.', 'مایع به شکل علامت هاله و/یا ضخیم‌شدن دیوارهٔ غلاف.')],
        [t('Umgebung', 'Surrounding tissues', 'بافت‌های اطراف'), t('Peritendinöses Weichteilödem radial über dem Processus styloideus radii.', 'Radial peritendinous soft-tissue oedema over the radial styloid.', 'ادم بافت نرم اطراف تاندون در سمت رادیال و روی زائدهٔ استایلوئید رادیوس.')],
      ],
      caseImage: '/msk/hand/de-quervain-pdf-p43-pd-fs-pair.png',
      caseAlt: t(
        'Zwei axiale PD-FS-MRT-Bilder des Handgelenks mit Pfeilen zu APL/EPB im ersten Strecksehnenfach.',
        'Paired axial wrist PD-FS MRI images with arrows to APL/EPB in the first extensor compartment.',
        'دو تصویر MRI محوری PD-FS مچ با پیکان به APL/EPB در کمپارتمان اول اکستانسور.'
      ),
      caseCaption: t(
        'MSK.pdf, PDF-S. 43 / Druck-S. 42. Die Pfeile markieren APL/EPB. Der Quelltext beschreibt verdickte Sehnen mit pathologisch erhöhtem intratendinösem Flüssigkeitssignal, mehr Flüssigkeit in der Sehnenscheide und Ödem-/Flüssigkeitssignale im radialen subkutanen Gewebe. Die Bildkombination allein stellt keine Diagnose.',
        'MSK.pdf, PDF p. 43 / printed p. 42. Arrows mark APL/EPB. The source text describes thickened tendons with pathologically increased intratendinous fluid-sensitive signal, increased tendon-sheath fluid, and oedema/fluid signal in radial subcutaneous tissue. The image pair alone does not establish a diagnosis.',
        'MSK.pdf، صفحهٔ PDF ۴۳ / چاپی ۴۲. پیکان‌ها APL/EPB را نشان می‌دهند. متن منبع ضخیم‌شدن تاندون‌ها با افزایش پاتولوژیک سیگنال حساس به مایع درون‌تاندونی، افزایش مایع غلاف تاندون و سیگنال ادم/مایع در بافت زیرجلدی رادیال را شرح می‌دهد. این دو تصویر به‌تنهایی تشخیص را ثابت نمی‌کنند.'
      ),
      note: t('Den Befund in der anatomischen Zielregion verankern und die Komponenten einzeln benennen. Ein unspezifisches Signal allein ersetzt die Zuordnung zu Sehne, Sehnenscheide und Umgebung nicht.', 'Anchor the finding to the correct anatomic region and name each component separately. Nonspecific signal alone does not replace assessment of tendon, sheath and surrounding tissues.', 'یافته را به محل آناتومیک درست نسبت دهید و هر جزء را جداگانه نام ببرید. سیگنال غیراختصاصی به‌تنهایی جای ارزیابی جداگانهٔ تاندون، غلاف و بافت اطراف را نمی‌گیرد.'),
      source: t('MSK.pdf, PDF-S. 42–43 / Druck-S. 41–42; Glajchen & Schweitzer 1996.', 'MSK.pdf, PDF pp. 42–43 / printed pp. 41–42; Glajchen & Schweitzer 1996.', 'MSK.pdf، صفحات PDF ۴۲–۴۳ / چاپی ۴۱–۴۲؛ Glajchen و Schweitzer، ۱۹۹۶.'),
    },
  ],
  case: {
    title: t('Selbstprüfung: Was ist im MRT beschrieben?', 'Self-check: what is described on MRI?', 'خودآزمایی: در MRI چه چیزی توصیف شده است؟'),
    prompt: t('Bei radialem Handgelenkschmerz zeigt sich eine Verdickung von APL und EPB mit Flüssigkeit um die Sehnen im ersten Fach. Welche Befundkombination passt am besten zur PDF?', 'With radial wrist pain, MRI shows thickening of APL and EPB with fluid around the tendons in the first compartment. Which combination best matches the PDF?', 'در بیماری با درد رادیال مچ، MRI ضخیم‌شدن APL و EPB و مایع پیرامون تاندون‌ها در کمپارتمان اول را نشان می‌دهد. کدام ترکیب یافته با PDF بیشترین تطابق را دارد؟'),
    options: [
      t('Sehnenverdickung plus Flüssigkeit in der Sehnenscheide im ersten Strecksehnenfach.', 'Tendon thickening plus tendon-sheath fluid in the first extensor compartment.', 'ضخیم‌شدن تاندون به‌همراه مایع در غلاف تاندونِ کمپارتمان اول اکستانسور.'),
      t('Isoliertes Knochenmarködem ohne Bezug zur radialen Sehnenscheide.', 'Isolated bone-marrow oedema unrelated to the radial tendon sheath.', 'ادم منفرد مغز استخوان بدون ارتباط با غلاف تاندون رادیال.'),
      t('Eine Ruptur der ECU-Sehne am Ulnastyloid.', 'A tear of the ECU tendon at the ulnar styloid.', 'پارگی تاندون ECU در سطح استایلوئید اولنا.'),
    ], answerIndex: 0,
    feedbackCorrect: t('Richtig: Die PDF beschreibt Verdickung/erhöhtes T2-Signal der APL- und EPB-Sehnen sowie Flüssigkeit und mögliche Wandverdickung der Sehnenscheide im ersten Fach.', 'Correct: the PDF describes thickened/high-T2-signal APL and EPB tendons, with fluid and possible wall thickening in the first-compartment sheath.', 'درست است: PDF افزایش ضخامت/سیگنال T2 تاندون‌های APL و EPB و نیز مایع و احتمال ضخیم‌شدن دیوارهٔ غلاف در کمپارتمان اول را شرح می‌دهد.'),
    feedbackIncorrect: t('Prüfen Sie die Ortsangabe und die Strukturen erneut: Gesucht sind die beiden radialen Sehnen des ersten Fachs und ihre Sehnenscheide.', 'Recheck the location and structures: the target is the two radial tendons of the first compartment and their sheath.', 'محل و ساختارها را دوباره بررسی کنید: منظور دو تاندون رادیال کمپارتمان اول و غلاف آن‌هاست.'),
    source: t('MSK.pdf, PDF-S. 42 / Druck-S. 41.', 'MSK.pdf, PDF p. 42 / printed p. 41.', 'MSK.pdf، صفحهٔ PDF ۴۲ / صفحهٔ چاپی ۴۱.'),
  },
  takeHome: [
    t('Erstes Strecksehnenfach über dem radialen Processus styloideus: APL und EPB.', 'First extensor compartment over the radial styloid: APL and EPB.', 'کمپارتمان اول اکستانسور روی استایلوئید رادیوس: APL و EPB.'),
    t('PD-FS/T2-FS für Flüssigkeit und Ödem; T1-w für Anatomie und Sehnenstruktur.', 'PD-FS/T2-FS for fluid and oedema; T1-weighted imaging for anatomy and tendon structure.', 'PD-FS/T2-FS برای مایع و ادم؛ T1 وزن‌شده برای آناتومی و ساختار تاندون.'),
    t('Sehne, Sehnenscheide und Umgebung systematisch getrennt beurteilen.', 'Assess tendon, tendon sheath and surrounding tissues separately.', 'تاندون، غلاف تاندون و بافت اطراف را جداگانه ارزیابی کنید.'),
    t('Eine Schmerzprovokation ist kein alleiniger Beweis; den im PDF genannten Testnamen kritisch einordnen.', 'Pain provocation alone is not proof; interpret the test name used in the PDF critically.', 'بازتولید درد به‌تنهایی اثبات‌کننده نیست؛ نام آزمون در PDF را با نگاه انتقادی در نظر بگیرید.'),
  ],
  notice: t('Abdeckung: klinische und MRT-Angaben aus MSK.pdf, PDF-Seiten 40–43 (Druckseiten 39–42). Das Fallbildpaar auf Seite 43 zeigt APL/EPB im ersten Strecksehnenfach; der Quelltext beschreibt Sehnenverdickung und erhöhtes intratendinöses Flüssigkeitssignal, Flüssigkeit in der Sehnenscheide sowie radiales subkutanes Ödem-/Flüssigkeitssignal. Die PDF enthält keine ausgearbeitete Sonographie-Anleitung. Wissenschaftliche und klinische Endfreigabe steht aus.', 'Scope: clinical and MRI material from MSK.pdf, PDF pages 40–43 (printed pages 39–42). The paired case images on page 43 show APL/EPB in the first extensor compartment; the source text describes tendon thickening and increased intratendinous fluid-sensitive signal, tendon-sheath fluid, and radial subcutaneous oedema/fluid signal. The PDF does not provide a developed ultrasound protocol. Final scientific and clinical approval is pending.', 'دامنه: مطالب بالینی و MRI از MSK.pdf، صفحات PDF ۴۰ تا ۴۳ (صفحات چاپی ۳۹ تا ۴۲). جفت تصویر صفحهٔ ۴۳، APL/EPB را در کمپارتمان اول اکستانسور نشان می‌دهد؛ متن منبع ضخیم‌شدن تاندون و افزایش سیگنال حساس به مایع درون‌تاندونی، مایع غلاف تاندون و سیگنال ادم/مایع زیرجلدی در سمت رادیال را شرح می‌دهد. PDF راهنمای کامل سونوگرافی ارائه نمی‌کند. تأیید نهایی علمی و بالینی هنوز انجام نشده است.'),
  references: [
    { url: 'https://pubmed.ncbi.nlm.nih.gov/8717121/', label: t('Glajchen N, Schweitzer M. MRI features in de Quervain’s tenosynovitis of the wrist. Skeletal Radiol. 1996;25:63–65. PMID: 8717121.', 'Glajchen N, Schweitzer M. MRI features in de Quervain’s tenosynovitis of the wrist. Skeletal Radiol. 1996;25:63–65. PMID: 8717121.', 'Glajchen و Schweitzer. ویژگی‌های MRI تنوسینوویت دو کروَن مچ. Skeletal Radiol. 1996;25:63–65. PMID: 8717121.') },
    { url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6103758/', label: t('Wu F, Rajpura A, Sandher D. Finkelstein’s Test Is Superior to Eichhoff’s Test in the Investigation of de Quervain’s Disease. J Hand Microsurg. 2018;10:116–118. PMID: 30154628.', 'Wu F, Rajpura A, Sandher D. Finkelstein’s Test Is Superior to Eichhoff’s Test in the Investigation of de Quervain’s Disease. J Hand Microsurg. 2018;10:116–118. PMID: 30154628.', 'Wu، Rajpura و Sandher. مقایسهٔ تست فینکلشتاین و آیکهوف در دو کروَن. J Hand Microsurg. 2018;10:116–118. PMID: 30154628.') },
  ],
}
