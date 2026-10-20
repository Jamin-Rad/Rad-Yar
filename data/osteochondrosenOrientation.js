const L = (de, en, fa) => ({ de, en, fa })

export const OSTEOCHONDROSEN_ORIENTATION = {
  id: 'weitere-osteochondrosen',
  title: L('Osteochondrose: Begriff und Abgrenzung', 'Osteochondrosis: meaning and terminology', 'استئوکندروز: مفهوم و تمایز اصطلاحی'),
  hero: '/educational/osteochondrosen-orientation-v2.webp',
  sourceNote: L(
    'Orientierungsseite ausschließlich nach MSK.pdf, PDF S. 124 (Druckseite 123). Die Quelle definiert den Begriff als Gruppe mit gestörter enchondraler Ossifikation, grenzt akute Verletzungen des Wachstumsknorpels ab und markiert Morbus Scheuermann als Wirbelsäulen-Sonderfall. Sie erwähnt außerdem den deutschsprachigen Gebrauch von „Osteochondrosis intervertebralis“ für degenerative Bandscheibenveränderungen bei Erwachsenen. Dies ist keine vollständige Krankheitsübersicht.',
    'Orientation page based only on MSK.pdf, PDF p. 124 (printed p. 123). The source defines the term as a group with impaired endochondral ossification, distinguishes acute growth-cartilage injuries, and names Scheuermann disease as a spinal special case. It also notes German-language use of “Osteochondrosis intervertebralis” for degenerative disc changes in adults. This is not a comprehensive disease review.',
    'این صفحهٔ جهت‌یابی فقط بر اساس MSK.pdf، صفحهٔ PDF شمارهٔ ۱۲۴ (صفحهٔ چاپی ۱۲۳) است. منبع، این اصطلاح را گروهی از بیماری‌ها با اختلال در استخوان‌سازی درون‌غضروفی تعریف می‌کند، آن را از آسیب حاد غضروف رشد جدا می‌داند و شویرمان را موردی ویژه در ستون فقرات می‌نامد. همچنین کاربرد آلمانیِ «Osteochondrosis intervertebralis» برای تغییرات دژنراتیو دیسک در بزرگسالان را ذکر می‌کند. این صفحه مرور کامل بیماری‌ها نیست.'
  ),
  sections: [
    {
      id: 'meaning', icon: 'clinical',
      title: L('Was meint die PDF mit Osteochondrose?', 'What does the PDF mean by osteochondrosis?', 'منظور PDF از استئوکندروز چیست؟'),
      lead: L('Die PDF verwendet „Osteochondrose“ als Sammelbegriff für Erkrankungen mit gestörter Umwandlung von Knorpel zu Knochen (enchondrale Ossifikation). Sie vermutet eine Durchblutungsstörung im Bereich des epiphysären Knorpels beziehungsweise der Fuge als Auslöser; diese Aussage wird hier als Quellenposition wiedergegeben, nicht als allgemeingültige Ursache.', 'The PDF uses “osteochondrosis” as an umbrella term for disorders with impaired conversion of cartilage to bone (endochondral ossification). It suggests impaired blood supply near the epiphyseal cartilage or physis as a trigger; this is reported as the source’s position, not as a universal cause.', 'PDF، «استئوکندروز» را اصطلاحی کلی برای بیماری‌هایی با اختلال در تبدیل غضروف به استخوان (استخوان‌سازی درون‌غضروفی) به‌کار می‌برد. منبع اختلال خون‌رسانی در غضروف اپی‌فیزی یا صفحهٔ رشد را علت احتمالی می‌داند؛ اینجا این نظر به خود منبع نسبت داده شده و علت همگانی تلقی نمی‌شود.'),
      note: L('Die Seite leitet keine gemeinsame Bildgebung, Stadieneinteilung oder Therapie für alle Erkrankungen dieser Gruppe ab.', 'This page does not infer shared imaging, staging or treatment for all disorders in the group.', 'از این صفحه نمی‌توان تصویربرداری، مرحله‌بندی یا درمان مشترکی برای همهٔ بیماری‌های این گروه نتیجه گرفت.'),
    },
    {
      id: 'distinction', icon: 'differential',
      title: L('Drei Begriffe nicht vermischen', 'Keep three terms distinct', 'سه مفهوم را با هم خلط نکنید'),
      rows: [
        [L('Osteochondrose im PDF-Sinn', 'Osteochondrosis as used in the PDF', 'استئوکندروز در معنای PDF'), L('Gruppe mit gestörter enchondraler Ossifikation; der Sammelbegriff sagt für sich allein keine konkrete Diagnose voraus.', 'A group with impaired endochondral ossification; the umbrella term alone does not specify a diagnosis.', 'گروهی با اختلال در استخوان‌سازی درون‌غضروفی؛ این اصطلاح کلی به‌تنهایی تشخیص مشخصی نمی‌دهد.')],
        [L('Akute Wachstumsfugenverletzung', 'Acute physeal injury', 'آسیب حاد صفحهٔ رشد'), L('Die PDF grenzt akute Verletzungen des Wachstumsknorpels ausdrücklich von Osteochondrosen ab.', 'The PDF explicitly distinguishes acute growth-cartilage injuries from osteochondroses.', 'PDF آسیب حاد غضروف رشد را صریحاً از استئوکندروزها جدا می‌کند.')],
        [L('„Osteochondrosis intervertebralis“', '“Osteochondrosis intervertebralis”', '«Osteochondrosis intervertebralis»'), L('Laut PDF ein deutschsprachiger Ausdruck für degenerative Bandscheibenveränderungen mit Knochenreaktion bei Erwachsenen; im Englischen nennt die Quelle „degenerative disc disease (DDD)“. Das ist eine terminologische Notiz, keine kindliche Osteochondrose.', 'According to the PDF, a German-language expression for adult degenerative disc changes with an osseous reaction; the source gives “degenerative disc disease (DDD)” in English. This is a terminology note, not a childhood osteochondrosis.', 'طبق PDF، اصطلاحی آلمانی‌زبان برای تغییرات دژنراتیو دیسک همراه با واکنش استخوانی در بزرگسالان است؛ معادل انگلیسیِ آورده‌شده در منبع «degenerative disc disease (DDD)» است. این نکته اصطلاح‌شناختی است، نه استئوکندروز کودکان.')],
      ],
    },
    {
      id: 'examples', icon: 'imaging',
      title: L('Zu welcher bestehenden Lektion passt die Frage?', 'Which existing lesson addresses the question?', 'پرسش را کدام درس موجود پاسخ می‌دهد؟'),
      lead: L('Die PDF nennt Morbus Scheuermann als Wirbelsäulen-Sonderfall. Die konkreten Krankheitsbilder werden in ihren eigenen Lektionen behandelt; diese Seite dient nur der Orientierung und verweist dorthin.', 'The PDF names Scheuermann disease as a spinal special case. The specific conditions are taught in their own lessons; this page only orients and links to them.', 'PDF شویرمان را موردی ویژه در ستون فقرات می‌نامد. هر بیماری مشخص در درس خودش بررسی می‌شود؛ این صفحه فقط جهت‌یابی می‌کند و به آن درس‌ها پیوند می‌دهد.'),
      links: [
        { href: '/msk/osteochondrosen/morbus-perthes', label: L('Morbus Perthes', 'Perthes disease', 'بیماری پرتس') },
        { href: '/msk/osteochondrosen/osgood-schlatter', label: L('Morbus Osgood-Schlatter', 'Osgood–Schlatter disease', 'بیماری آزگود–اشلاتر') },
        { href: '/msk/osteochondrosen/osteochondrosis-dissecans', label: L('Osteochondrosis dissecans', 'Osteochondritis dissecans', 'استئوکندریت دیسکانس') },
        { href: '/wirbelsaeule/entzuendlich', label: L('Morbus Scheuermann · Abschnitt Wirbelsäule', 'Scheuermann disease · spine lesson', 'بیماری شویرمان · درس ستون فقرات') },
      ],
    },
  ],
  check: {
    title: L('Begriff zuordnen', 'Match the terminology', 'اصطلاح را تطبیق دهید'),
    prompt: L('Ein Text beschreibt bei einem Erwachsenen degenerative Bandscheibenveränderungen und nennt „Osteochondrosis intervertebralis“. Wie ordnet die PDF diesen Ausdruck ein?', 'A text describes adult degenerative disc changes and uses “Osteochondrosis intervertebralis”. How does the PDF frame this term?', 'متنی تغییرات دژنراتیو دیسک در یک بزرگسال را توصیف می‌کند و از «Osteochondrosis intervertebralis» نام می‌برد. PDF این اصطلاح را چگونه توضیح می‌دهد؟'),
    options: [
      L('Als deutschsprachige Bezeichnung für degenerative Bandscheibenveränderungen; nicht automatisch als kindliche Osteochondrose.', 'As a German-language term for degenerative disc changes; not automatically as childhood osteochondrosis.', 'به‌عنوان اصطلاحی آلمانی‌زبان برای تغییرات دژنراتیو دیسک؛ نه لزوماً استئوکندروز کودکان.'),
      L('Als Synonym für jede akute Verletzung der Wachstumsfuge.', 'As a synonym for every acute physeal injury.', 'مترادف هر آسیب حاد صفحهٔ رشد.'),
      L('Als Beweis für eine bestimmte Osteochondrose mit einheitlichen Bildzeichen.', 'As proof of a specific osteochondrosis with uniform imaging signs.', 'اثبات یک استئوکندروز مشخص با نشانه‌های تصویری یکسان.'),
    ], answer: 0,
    explanation: L('Die PDF beschreibt hier einen deutschsprachigen Terminologiegebrauch. Sie setzt diese adulten degenerativen Veränderungen weder mit akuten Wachstumsfugenverletzungen noch mit einer konkreten kindlichen Osteochondrose gleich.', 'Here the PDF describes German-language terminology. It equates these adult degenerative changes neither with acute physeal injuries nor with a specific childhood osteochondrosis.', 'PDF در اینجا کاربرد اصطلاح در زبان آلمانی را توضیح می‌دهد. این تغییرات دژنراتیو بزرگسالان را نه با آسیب حاد صفحهٔ رشد و نه با استئوکندروز مشخص کودکان یکی می‌داند.'),
    retry: L('Achten Sie auf Alter und Begriffskontext: Die PDF nennt „DDD“ als englischen Ausdruck für den adulten Bandscheibenverschleiß.', 'Attend to age and terminology: the PDF gives “DDD” as the English term for adult disc degeneration.', 'به سن و بافت اصطلاحی توجه کنید: PDF برای دژنراسیون دیسک در بزرگسالان اصطلاح انگلیسی «DDD» را می‌آورد.'),
  },
  summary: [
    L('Im PDF ist Osteochondrose ein Sammelbegriff, keine einzelne Diagnose.', 'In the PDF, osteochondrosis is an umbrella term, not one diagnosis.', 'در PDF، استئوکندروز اصطلاحی کلی است، نه یک تشخیص واحد.'),
    L('Akute Verletzungen des Wachstumsknorpels werden ausdrücklich abgegrenzt.', 'Acute growth-cartilage injuries are explicitly distinguished.', 'آسیب حاد غضروف رشد صریحاً جدا شده است.'),
    L('Bei „Osteochondrosis intervertebralis“ Alter und deutschsprachigen Begriffsgebrauch beachten.', 'For “Osteochondrosis intervertebralis”, note age and German-language terminology.', 'در «Osteochondrosis intervertebralis» به سن و کاربرد اصطلاح در زبان آلمانی توجه کنید.'),
  ],
}
