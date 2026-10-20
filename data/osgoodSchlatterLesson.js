const L = (de, en, fa) => ({ de, en, fa })

export const OSGOOD_SCHLATTER_LESSON = {
  id: 'osgood-schlatter',
  title: L('Morbus Osgood-Schlatter', 'Osgood-Schlatter disease', 'بیماری آزگود–اشلاتر'),
  intro: L(
    'Morbus Osgood-Schlatter ist eine Traktionsapophysitis an der Tuberositas tibiae. Für die Bildbeurteilung gilt: Fragmentierung allein beweist die Erkrankung nicht; entscheidend ist das Zusammenspiel aus Beschwerden und Veränderungen an Apophyse, Sehnenansatz und Weichteilen.',
    'Osgood-Schlatter disease is a traction apophysitis at the tibial tubercle. For image interpretation, fragmentation alone does not prove disease; correlate symptoms with changes in the apophysis, tendon insertion and surrounding soft tissues.',
    'بیماری آزگود–اشلاتر آپوفیزیت کششی در برجستگی درشت‌نی است. در تفسیر تصویر، قطعه‌قطعه‌شدن به‌تنهایی بیماری را ثابت نمی‌کند؛ علائم را همراه با تغییرات آپوفیز، محل اتصال تاندون و بافت نرم ارزیابی کنید.'
  ),
  sections: [
    { id: 'pattern', title: L('Welche Struktur ist betroffen?', 'What structure is affected?', 'کدام ساختار درگیر است؟') },
    { id: 'radiograph', title: L('Was zeigt das Röntgenbild?', 'What does the radiograph show?', 'رادیوگرافی چه چیزی نشان می‌دهد؟') },
    { id: 'mri', title: L('Welche Zusatzzeichen zeigt das MRT?', 'What additional findings does MRI show?', 'MRI چه یافته‌های تکمیلی نشان می‌دهد؟') },
    { id: 'case', title: L('Wie hängen Fallbild und Befund zusammen?', 'How do the case images and findings fit together?', 'تصاویر کیس و یافته‌ها چگونه به هم مرتبط‌اند؟') },
  ],
  fundamentals: [
    L('Wiederholter Zug des Ligamentum patellae belastet die noch offene Apophyse der Tuberositas tibiae; es kann zu Mikrotraumen und gelegentlich zu einem Avulsionsfragment kommen.', 'Repeated traction from the patellar ligament loads the still-open tibial-tubercle apophysis. This may cause microtrauma and, occasionally, an avulsion fragment.', 'کشش تکراری رباط کشککی به آپوفیزِ هنوز بازِ برجستگی درشت‌نی فشار می‌آورد؛ میکروتروما و گاهی قطعهٔ آولسیون ممکن است ایجاد شود.'),
    L('Die PDF berichtet Jungen häufiger als Mädchen. Eine neuere Übersicht hält fest, dass inzwischen keine klare Geschlechterdifferenz mehr erkennbar sein könnte; das Geschlecht wird daher hier nicht als diagnostischer Hinweis genutzt. Eine beidseitige Beteiligung wird im PDF mit etwa 30 % angegeben.', 'The PDF reports boys more often than girls. A more recent review notes that a clear sex difference may no longer be evident; sex is therefore not used here as a diagnostic cue. The PDF reports bilateral involvement in about 30%.', 'PDF بروز را در پسران بیشتر از دختران گزارش می‌کند. یک مرور جدیدتر اشاره می‌کند که شاید دیگر تفاوت جنسیتی روشنی وجود نداشته باشد؛ بنابراین جنسیت در این درس نشانهٔ تشخیصی محسوب نمی‌شود. PDF درگیری دوطرفه را حدود ۳۰٪ گزارش می‌کند.'),
  ],
  radiograph: [
    L('Seitliche Aufnahme, leicht innenrotiert: mögliche Auflockerung oder Fragmentierung der Tuberositas-Apophyse, Weichteilschwellung über der Tuberositas sowie Verdickung oder Verkalkung am distalen Patellarsehnenansatz.', 'Lateral view with slight internal rotation: possible lucency or fragmentation of the tibial-tubercle apophysis, soft-tissue swelling over the tubercle, and thickening or calcification at the distal patellar-tendon insertion.', 'نمای لترال با چرخش داخلی خفیف: احتمال شفاف‌شدگی یا قطعه‌قطعه‌شدن آپوفیز برجستگی درشت‌نی، تورم بافت نرم روی برجستگی و ضخیم‌شدن یا کلسیفیکاسیون محل اتصال دیستال تاندون کشککی.'),
    L('Fragmentierung kann auch eine normale Ossifikationsvariante sein. Sie deshalb nicht isoliert als krankhaft werten, sondern Klinik und Veränderungen des Sehnenansatzes beziehungsweise der Weichteile mitbeurteilen.', 'Fragmentation can also be a normal ossification variant. Do not label it abnormal in isolation; correlate with symptoms and assess the tendon insertion and soft tissues.', 'قطعه‌قطعه‌شدن می‌تواند گونه‌ای طبیعی از استخوانی‌شدن باشد. آن را به‌تنهایی غیرطبیعی تلقی نکنید؛ علائم بالینی و محل اتصال تاندون و بافت نرم را نیز ارزیابی کنید.'),
  ],
  mri: [
    L('Das PDF nennt das MRT als sensitive Methode. Beschrieben werden Knochenmarködem in der Apophyse, Weichteilödem am Sehnenansatz und ein verdicktes, signalreiches distales Patellaband als Zeichen einer Tendinopathie.', 'The PDF describes MRI as a sensitive method. Findings include apophyseal marrow oedema, soft-tissue oedema at the tendon insertion, and a thickened, high-signal distal patellar ligament as a sign of tendinopathy.', 'PDF، MRI را روشی حساس می‌داند. یافته‌ها شامل ادم مغز استخوان آپوفیز، ادم بافت نرم در محل اتصال تاندون و رباط کشککی دیستال ضخیم و پرسیگنال به‌عنوان نشانهٔ تندینوپاتی است.'),
    L('Eine tiefe infrapatellare Bursitis oder ein Avulsionsfragment kann zusätzlich vorkommen. Das PDF-Bild zeigt einen Fall, belegt aber weder eine bestimmte MRT-Sequenz noch, dass jedes Merkmal bei jedem Betroffenen vorliegt.', 'Deep infrapatellar bursitis or an avulsion fragment may also be present. The PDF image is one case; it does not establish a specific MRI sequence or imply that every finding occurs in every patient.', 'بورسیت عمقی زیرکشککی یا قطعهٔ آولسیون نیز ممکن است دیده شود. تصویر PDF یک کیس است و نه سکانس مشخص MRI را اثبات می‌کند و نه نشان می‌دهد همهٔ یافته‌ها در همهٔ بیماران وجود دارند.'),
  ],
  caseCaption: L('Seitliche Röntgenaufnahme und sagittale MRT-Aufnahme aus dem Quell-PDF (Radiopaedia rID 61412). Die im Text gelisteten Zeichen sind eine Checkliste, keine Behauptung, dass jedes Zeichen in diesem einzelnen Fall sichtbar ist.', 'Lateral radiograph and sagittal MRI image from the source PDF (Radiopaedia rID 61412). The listed findings are a checklist, not a claim that every feature is visible in this individual case.', 'رادیوگرافی لترال و تصویر ساژیتال MRI از PDF منبع (Radiopaedia rID 61412). یافته‌های فهرست‌شده چک‌لیست‌اند و ادعا نمی‌شود که همهٔ آن‌ها در همین کیس دیده می‌شوند.'),
  check: {
    question: L('Bei einem Jugendlichen zeigt die seitliche Aufnahme eine fragmentierte Tuberositas tibiae. Welcher nächste Schritt verhindert die Überinterpretation dieses Einzelzeichens?', 'A lateral radiograph in an adolescent shows a fragmented tibial tubercle. What prevents overcalling this single finding?', 'در رادیوگرافی لترال نوجوان، برجستگی درشت‌نی قطعه‌قطعه است. چه کاری از تفسیر بیش‌ازحد این نشانهٔ منفرد جلوگیری می‌کند؟'),
    options: [
      L('Klinik sowie Sehnenansatz und Weichteile mitbeurteilen; Fragmentierung kann normal sein.', 'Correlate clinically and assess the tendon insertion and soft tissues; fragmentation may be normal.', 'علائم بالینی و محل اتصال تاندون و بافت نرم را هم ارزیابی کنید؛ قطعه‌قطعه‌شدن ممکن است طبیعی باشد.'),
      L('Fragmentierung allein beweist Morbus Osgood-Schlatter.', 'Fragmentation alone proves Osgood-Schlatter disease.', 'قطعه‌قطعه‌شدن به‌تنهایی بیماری آزگود–اشلاتر را ثابت می‌کند.'),
      L('Sofort eine MRT-Sequenz festlegen, auch ohne klinischen Kontext.', 'Choose an MRI sequence immediately, without clinical context.', 'بدون توجه به زمینهٔ بالینی، بلافاصله یک سکانس MRI انتخاب کنید.'),
    ],
    answer: 0,
    feedback: L('Richtig: Die PDF warnt ausdrücklich, dass Fragmentierung eine normale Verknöcherungsvariante sein kann. Die Beurteilung wird durch Klinik und zusätzliche Sehnenansatz-/Weichteilzeichen gestützt.', 'Correct: the PDF explicitly warns that fragmentation may be a normal ossification variant. Clinical context and additional tendon-insertion or soft-tissue findings support interpretation.', 'درست است: PDF صریحاً هشدار می‌دهد که قطعه‌قطعه‌شدن می‌تواند گونه‌ای طبیعی از استخوانی‌شدن باشد. زمینهٔ بالینی و یافته‌های محل اتصال تاندون یا بافت نرم به تفسیر کمک می‌کنند.'),
  },
  takeHome: [
    L('Die Läsion betrifft die Zugapophyse der Tuberositas tibiae am Ansatz des Ligamentum patellae.', 'The lesion affects the traction apophysis of the tibial tubercle at the patellar-ligament insertion.', 'ضایعه آپوفیز کششی برجستگی درشت‌نی را در محل اتصال رباط کشککی درگیر می‌کند.'),
    L('Fragmentierung im Röntgenbild ist nicht spezifisch und kann entwicklungsbedingt sein.', 'Radiographic fragmentation is nonspecific and may be developmental.', 'قطعه‌قطعه‌شدن در رادیوگرافی اختصاصی نیست و ممکن است رشدی باشد.'),
    L('MRT ergänzt die Knochenmark-, Sehnenansatz- und Weichteilbeurteilung; Bildmerkmale müssen zum Kontext passen.', 'MRI adds marrow, tendon-insertion and soft-tissue assessment; findings must fit the context.', 'MRI ارزیابی مغز استخوان، محل اتصال تاندون و بافت نرم را تکمیل می‌کند؛ یافته‌ها باید با زمینهٔ بالینی سازگار باشند.'),
  ],
}
