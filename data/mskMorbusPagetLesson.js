const L = (de, en, fa) => ({ de, en, fa })

export const MSK_MORBUS_PAGET_LESSON = {
  id: 'morbus-paget',
  title: L('Morbus Paget des Knochens', "Paget's disease of bone", 'بیماری پاژهٔ استخوان'),
  learningGoals: [
    L('Die im PDF beschriebenen Umbauphasen in eigenen Worten unterscheiden.', 'Distinguish the remodelling phases described in the PDF.', 'مراحل بازسازی توصیف‌شده در PDF را از هم تفکیک کنید.'),
    L('Die wichtigsten Röntgen-/CT-Muster nach Lokalisation ordnen.', 'Organise the main radiographic/CT patterns by location.', 'الگوهای اصلی رادیوگرافی/CT را بر اساس محل مرتب کنید.'),
    L('Befunde und Warnhinweise der Quelle mit ihren Grenzen wiedergeben.', 'Recall the source findings and warning signs with their limits.', 'یافته‌ها و نشانه‌های هشدار منبع را همراه با محدودیت‌هایشان بازگو کنید.'),
  ],
  check: {
    question: L('Welche Kombination ordnet die im PDF beschriebenen Schädelmuster zeitlich passend zu?', 'Which combination matches the skull patterns and timing described in the PDF?', 'کدام ترکیب، الگوهای جمجمه و زمان‌بندی توصیف‌شده در PDF را درست تطبیق می‌دهد؟'),
    options: [
      L('Früh: scharf begrenzte Osteolysen („Osteoporosis circumscripta“); spät: flockige Sklerosen („Cotton-wool“).', 'Early: sharply marginated osteolysis (“osteoporosis circumscripta”); late: patchy sclerosis (“cotton wool”).', 'زودرس: استئولیزهای واضح و محدود («Osteoporosis circumscripta»)؛ دیررس: اسکلروزهای لکه‌لکه («Cotton-wool»).'),
      L('Früh: Cotton-wool-Sklerose; spät: ausschließlich scharf begrenzte Osteolysen.', 'Early: cotton-wool sclerosis; late: only sharply marginated osteolysis.', 'زودرس: اسکلروز پنبه‌ای؛ دیررس: فقط استئولیزهای واضح و محدود.'),
      L('Beide Muster sind laut PDF ausschließlich MRT-Zeichen.', 'According to the PDF, both patterns are MRI signs only.', 'طبق PDF هر دو الگو فقط نشانه‌های MRI هستند.'),
    ],
    answer: 0,
    explanation: L('Die Quelle ordnet die scharf begrenzte Aufhellung einem Frühstadium und das flockig-sklerotische Cotton-wool-Muster einem Spätstadium zu. Die Abbildung unten ist ein Phasenschema, kein Patientenscan.', 'The source assigns sharply marginated lucency to an early stage and the patchy sclerotic cotton-wool pattern to a late stage. The diagram below is a phase schematic, not a patient scan.', 'منبع، ناحیه شفاف با حدود مشخص را به مرحلهٔ زودرس و الگوی اسکلروتیک لکه‌لکهٔ Cotton-wool را به مرحلهٔ دیررس نسبت می‌دهد. نمودار زیر شماتیک مراحل است، نه اسکن بیمار.'),
  },
  summary: [
    L('Der PDF-Schwerpunkt ist der ungeordnete Knochenumbau mit osteolytischer, gemischter und osteosklerotischer Phase.', 'The PDF focuses on disorganised bone remodelling with osteolytic, mixed and osteosclerotic phases.', 'تمرکز PDF بر بازسازی نامنظم استخوان در مراحل استئولیتیک، مختلط و استئواسکلروتیک است.'),
    L('Im Schädel ordnet die Quelle frühe scharf begrenzte Aufhellungen und späte flockige Sklerosen ein.', 'For the skull, the source describes early sharply marginated lucencies and late patchy sclerosis.', 'در جمجمه، منبع شفافیت‌های واضح و محدود را زودرس و اسکلروز لکه‌لکه را دیررس توصیف می‌کند.'),
    L('Neue Osteolysen mit Weichteilkomponente sind im PDF ein Warnsignal; eine Diagnose oder Entwarnung folgt daraus nicht allein.', 'New osteolysis with a soft-tissue component is a warning sign in the PDF; it does not by itself establish or exclude a diagnosis.', 'استئولیز جدید همراه با جزء بافت نرم در PDF نشانهٔ هشدار است؛ به‌تنهایی تشخیص را اثبات یا رد نمی‌کند.'),
  ],
  notice: L('Quellenumfang: MSK.pdf, PDF S. 131–132 (Druck S. 130–131). PDF S. 130 ist nur eine Abschnittsüberschrift zu metabolischen, hormonellen und toxisch bedingten Osteopathien; sie enthält keine Osteoporose-Lehre. Eine Fallaufnahme oder ein diagnostisches Bild ist auf den Paget-Seiten nicht enthalten. Aussagen zu Häufigkeit und Zahlenrisiko wurden nicht übernommen. Klinische Freigabe und Browserprüfung stehen aus.', 'Source scope: MSK.pdf, PDF pp. 131–132 (printed pp. 130–131). PDF p. 130 is only a section heading for metabolic, hormonal and toxic osteopathies; it contains no osteoporosis teaching. The Paget pages contain no patient case or diagnostic image. Prevalence claims and numeric risk estimates were omitted. Clinical sign-off and browser review remain pending.', 'دامنهٔ منبع: MSK.pdf، صفحات ۱۳۱–۱۳۲ PDF (صفحات چاپی ۱۳۰–۱۳۱). صفحهٔ ۱۳۰ PDF فقط عنوان بخشِ استئوپاتی‌های متابولیک، هورمونی و ناشی از سموم است و آموزش استئوپروز ندارد. در صفحات پاژه تصویر بیمار یا تصویر تشخیصی وجود ندارد. ادعاهای شیوع و برآوردهای عددی خطر وارد نشده‌اند. تأیید بالینی و بررسی مرورگر هنوز انجام نشده است.'),
}
