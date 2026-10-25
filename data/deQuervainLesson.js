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
      lead: t("Typisch ist Schmerz über dem radialen Processus styloideus, der bei Daumenbewegung auftritt oder zunimmt. Die PDF nennt eine Provokation mit in die Faust eingeschlagenem Daumen und anschließender ulnarer Abweichung der Hand.", "A typical pattern is pain over the radial styloid that occurs or worsens with thumb movement. The PDF describes a manoeuvre with the thumb folded into the fist followed by ulnar deviation of the hand.", "الگوی معمول، درد روی زائدهٔ استایلوئید رادیوس است که با حرکت شست ایجاد یا تشدید می‌شود. در PDF مانوری با قرار دادن شست داخل مشت و سپس انحراف دست به سمت اولنار توصیف شده است."),
      note: t("Die Daumen-in-der-Faust-Variante wird häufig Eichhoff-Manöver genannt. Manöverausführung genau benennen. In der Studie von Wu et al. (2018) wurden beschwerdefreie Handgelenke untersucht: weniger falsch-positive Reaktionen bestimmen keine Sensitivität bei Erkrankten. Eine Schmerzprovokation allein ist kein Diagnosebeweis.", "The thumb-in-fist variant is often called the Eichhoff manoeuvre. Specify the technique precisely. Wu et al. (2018) studied asymptomatic wrists: fewer false-positive responses do not establish sensitivity in affected patients. Pain provocation alone is not diagnostic.", "مانور قرار دادن شست داخل مشت اغلب آیکهوف نامیده می‌شود. شیوهٔ اجرا دقیق بیان شود. در مطالعهٔ Wu و همکاران در سال ۲۰۱۸ مچ‌های بدون علامت بررسی شدند؛ پاسخ مثبت کاذب کمتر، حساسیت را در بیماران مبتلا مشخص نمی‌کند. بازتولید درد به‌تنهایی تشخیصی نیست."),
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
        [t('APL und EPB', 'APL and EPB', 'APL و EPB'), t("Verdickung; intratendinöses Flüssigkeitssignal kann erhöht sein, ist aber kein obligates Einzelkriterium.", "Thickening; intratendinous fluid-sensitive signal may increase but is not a mandatory individual criterion.", "ضخیم‌شدن؛ سیگنال حساس به مایع داخل تاندون ممکن است افزایش یابد، اما معیار منفرد الزامی نیست.")],
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
    prompt: t("Textfall: Bei radialem Handgelenkschmerz zeigt die MRT verdickte APL-/EPB-Sehnen über dem Radiusstyloid mit Flüssigkeit in der gemeinsamen Sehnenscheide und peritendinösem Ödem. Faserunterbrechung oder Retraktion sind nicht erkennbar. Welche Befundinterpretation passt am besten?", "Text vignette: in radial wrist pain, MRI shows thickened APL/EPB tendons over the radial styloid with fluid in their common sheath and peritendinous oedema. No fibre discontinuity or retraction is visible. Which interpretation fits best?", "سناریوی متنی: در درد رادیال مچ، MRI ضخیم‌شدن تاندون‌های APL/EPB روی استایلوئید رادیوس، مایع در غلاف مشترک و ادم اطراف تاندون را نشان می‌دهد. قطع رشته یا عقب‌کشیدگی دیده نمی‌شود. کدام تفسیر مناسب‌تر است؟"),
    options: [
  {
    "de": "Tenosynoviales Veränderungsmuster im ersten Strecksehnenfach, mit der Klinik einer de-Quervain-Erkrankung abzugleichen",
    "en": "Tenosynovial change in the first extensor compartment, to correlate with clinical de Quervain disease",
    "fa": "الگوی تغییر تنوسینوویال در کمپارتمان اول اکستانسور، نیازمند تطبیق با بالین دو کروَن"
  },
  {
    "de": "Komplette APL-Ruptur im ersten Strecksehnenfach mit retrahiertem proximalem Sehnenstumpf",
    "en": "Complete APL rupture in the first extensor compartment with a retracted proximal tendon stump",
    "fa": "پارگی کامل APL در کمپارتمان اول با عقب‌کشیدگی انتهای پروگزیمال تاندون"
  },
  {
    "de": "Längsgerichtete EPB-Spaltruptur als Erklärung eines flüssigkeitsgefüllten intratendinösen Spalts",
    "en": "Longitudinal EPB split tear explaining a fluid-filled intratendinous cleft",
    "fa": "پارگی طولی شکاف‌دار EPB برای توضیح شکاف پر از مایع داخل تاندون"
  },
  {
    "de": "Umschriebene Ganglionzyste neben unveränderter Sehnenscheide als Erklärung des radialen Schmerzes",
    "en": "Focal ganglion beside an unchanged tendon sheath explaining radial pain",
    "fa": "کیست گانگلیون محدود در کنار غلاف تاندون بدون تغییر به‌عنوان علت درد رادیال"
  }
], answerIndex: 0,
    feedbackCorrect: t("APL und EPB gehören zum ersten Strecksehnenfach. Verdickung, Scheidenflüssigkeit und peritendinöses Ödem passen zu einem tenosynovialen Muster; sie sind mit Untersuchung und Beschwerden abzugleichen. Intratendinöses Signal und subkutanes Ödem können variieren und sind keine obligaten Einzelkriterien.", "APL and EPB occupy the first extensor compartment. Thickening, sheath fluid and peritendinous oedema fit a tenosynovial pattern and require clinical correlation. Intratendinous signal and subcutaneous oedema may vary and are not mandatory individual criteria.", "APL و EPB در کمپارتمان اول اکستانسور قرار دارند. ضخیم‌شدن، مایع غلاف و ادم اطراف تاندون با الگوی تنوسینوویال سازگارند و باید با معاینه و علائم تطبیق داده شوند. سیگنال داخل تاندون و ادم زیرجلدی می‌توانند متغیر باشند و معیارهای منفرد الزامی نیستند."),
    feedbackIncorrect: t('Prüfen Sie die Ortsangabe und die Strukturen erneut: Gesucht sind die beiden radialen Sehnen des ersten Fachs und ihre Sehnenscheide.', 'Recheck the location and structures: the target is the two radial tendons of the first compartment and their sheath.', 'محل و ساختارها را دوباره بررسی کنید: منظور دو تاندون رادیال کمپارتمان اول و غلاف آن‌هاست.'),
    source: t("Glajchen & Schweitzer (1996): klinisch korrelierte MRT-Serie; Textfall ohne Abhängigkeit von einem Fallbild.", "Glajchen & Schweitzer (1996): clinically correlated MRI series; text vignette without case-image dependency.", "Glajchen و Schweitzer، ۱۹۹۶: مجموعهٔ MRI با تطبیق بالینی؛ سناریوی متنی مستقل از تصویر موردی."),
    feedbackByOption: [
  {
    "de": "APL und EPB gehören zum ersten Strecksehnenfach. Verdickung, Scheidenflüssigkeit und peritendinöses Ödem passen zu einem tenosynovialen Muster; sie sind mit Untersuchung und Beschwerden abzugleichen. Intratendinöses Signal und subkutanes Ödem können variieren und sind keine obligaten Einzelkriterien.",
    "en": "APL and EPB occupy the first extensor compartment. Thickening, sheath fluid and peritendinous oedema fit a tenosynovial pattern and require clinical correlation. Intratendinous signal and subcutaneous oedema may vary and are not mandatory individual criteria.",
    "fa": "APL و EPB در کمپارتمان اول اکستانسور قرار دارند. ضخیم‌شدن، مایع غلاف و ادم اطراف تاندون با الگوی تنوسینوویال سازگارند و باید با معاینه و علائم تطبیق داده شوند. سیگنال داخل تاندون و ادم زیرجلدی می‌توانند متغیر باشند و معیارهای منفرد الزامی نیستند."
  },
  {
    "de": "Für die beschriebene komplette Ruptur fehlen Faserunterbrechung und Retraktion. Scheidenflüssigkeit allein belegt keinen kompletten Sehnenriss.",
    "en": "The stated complete tear lacks discontinuity and retraction. Sheath fluid alone does not establish a complete tendon tear.",
    "fa": "برای پارگی کاملِ مطرح‌شده، قطع رشته و عقب‌کشیدگی وجود ندارد. مایع غلاف به‌تنهایی پارگی کامل تاندون را ثابت نمی‌کند."
  },
  {
    "de": "Ein intratendinöser längsgerichteter Spalt ist nicht beschrieben. Das angegebene Flüssigkeitsmuster liegt in der Scheide und peritendinös.",
    "en": "No longitudinal intratendinous cleft is described. The stated fluid pattern is in the sheath and surrounding tissues.",
    "fa": "شکاف طولی داخل تاندون توصیف نشده است؛ الگوی مایعِ ذکرشده در غلاف و بافت اطراف تاندون قرار دارد."
  },
  {
    "de": "Eine umschriebene Ganglionzyste erklärt nicht die beschriebenen Veränderungen der Sehnen und ihrer Scheide. Eine solche fokale Zyste ist hier nicht angegeben.",
    "en": "A focal ganglion does not explain the described tendon and sheath changes. No such focal cyst is specified here.",
    "fa": "کیست گانگلیون محدود تغییرات توصیف‌شدهٔ تاندون و غلاف را توضیح نمی‌دهد؛ چنین کیست کانونی‌ای در اینجا ذکر نشده است."
  }
],
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
