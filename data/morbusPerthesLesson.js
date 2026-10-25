const L = (de, en, fa) => ({ de, en, fa })

export const MORBUS_PERTHES_LESSON = {
  id: 'morbus-perthes',
  title: L('Morbus Perthes', 'Perthes disease', 'بیماری پرتس'),
  intro: L(
    'Morbus Perthes ist eine idiopathische Osteonekrose des Femurkopfs im Kindesalter. Für die Bildbeurteilung hilft eine einfache Frage: Zeigt das Röntgenbild eine frühe, fragmentierende oder wiederaufbauende Phase?',
    'Perthes disease is idiopathic osteonecrosis of the femoral head in childhood. One question helps organise imaging: does the radiograph show an early, fragmenting or rebuilding phase?',
    'بیماری پرتس، استئونکروز ایدیوپاتیک سر فمور در کودکی است. برای ارزیابی تصویر، یک پرسش راهگشاست: رادیوگرافی مرحلهٔ اولیه، قطعه‌قطعه‌شدن یا بازسازی را نشان می‌دهد؟'
  ),
  notice: L(
    'Umfang: MSK.pdf, PDF S. 124–127 (gedruckt S. 123–126). Text und alle vier Seitenbilder wurden geprüft. Aus der Röntgenserie auf PDF S. 126 werden nur die ersten drei eindeutig beschrifteten Zeitpunkte gezeigt (Initialstadium, nach 2 Monaten, nach 10 Monaten). Die letzte Zeile mit der widersprüchlichen Beschriftung „15 Minuten“ bei einer Bildunterschrift von 15 Monaten ist ausgeschlossen. Die MRT-Panels auf S. 127 sind nicht sicher sequenzbeschriftet und werden nicht reproduziert. Die Verlaufsgrafik ist eigens erstellt und ausdrücklich schematisch.',
    'Scope: MSK.pdf, PDF pp. 124–127 (printed pp. 123–126). Text and all four page images were reviewed. Only the first three clearly labelled time points from the radiograph series on PDF p. 126 are shown (initial phase, after 2 months, after 10 months). The last row, labelled “15 minutes” despite a caption stating 15 months, is excluded. The MRI panels on p. 127 are not reliably sequence-labelled and are not reproduced. The timeline is newly drawn and explicitly schematic.',
    'دامنه: MSK.pdf، صفحات PDF ۱۲۴ تا ۱۲۷ (چاپی ۱۲۳ تا ۱۲۶). متن و تصاویر هر چهار صفحه بررسی شدند. فقط سه زمانِ دارای برچسب روشن از سری رادیوگرافی صفحهٔ ۱۲۶ نمایش داده می‌شوند (مرحلهٔ اولیه، پس از ۲ ماه، پس از ۱۰ ماه). ردیف آخر که با وجود زیرنویس ۱۵ ماه، «۱۵ دقیقه» برچسب خورده، حذف شده است. پنل‌های MRI صفحهٔ ۱۲۷ برچسب توالی مطمئن ندارند و بازتولید نمی‌شوند. نمودار زمانی جداگانه ساخته شده و صریحاً شماتیک است.'
  ),
  sections: [
    { id: 'pattern', title: L('Welches klinische Muster passt?', 'Which clinical pattern fits?', 'کدام الگوی بالینی سازگار است؟') },
    { id: 'timeline', title: L('Wie verändert sich der Femurkopf?', 'How does the femoral head change?', 'سر فمور چگونه تغییر می‌کند؟') },
    { id: 'imaging', title: L('Was zeigen Röntgen und MRT?', 'What do radiography and MRI show?', 'رادیوگرافی و MRI چه چیزی نشان می‌دهند؟') },
    { id: 'differential', title: L('Welche Differenzialdiagnosen bleiben wichtig?', 'Which differentials remain important?', 'کدام تشخیص‌های افتراقی مهم‌اند؟') },
    { id: 'take-home', title: L('Vier Regeln für die Bildbeurteilung', 'Four imaging rules to remember', 'چهار قاعده برای ارزیابی تصویر'), emphasis: true },
  ],
  features: [
    L('Häufigkeitsgipfel laut PDF: 4–8 Jahre; die angegebene Spannbreite ist 2–14 Jahre.', 'Peak age in the PDF: 4–8 years; its stated range is 2–14 years.', 'اوج شیوع طبق PDF: ۴ تا ۸ سال؛ دامنهٔ ذکرشده ۲ تا ۱۴ سال است.'),
    L('Jungen sind laut PDF deutlich häufiger betroffen (Verhältnis 5:1).', 'The PDF reports substantially more boys affected (ratio 5:1).', 'طبق PDF پسران به‌مراتب بیشتر مبتلا می‌شوند (نسبت ۵ به ۱).'),
    L('Der Beginn kann schleichend sein: Belastungsschmerz in Leiste oder Hüfte, manchmal mit Ausstrahlung ins Knie, und Schonhinken.', 'Onset may be gradual: activity-related groin or hip pain, sometimes referred to the knee, with a protective limp.', 'شروع می‌تواند تدریجی باشد: درد کشالهٔ ران یا لگن هنگام فعالیت که گاهی به زانو انتشار می‌یابد، همراه با لنگش محافظتی.'),
    L('Eingeschränkte Innenrotation und Abduktion sind im PDF genannte Untersuchungsbefunde.', 'Restricted internal rotation and abduction are examination findings listed in the PDF.', 'محدودیت چرخش داخلی و ابداکشن از یافته‌های معاینه‌ای ذکرشده در PDF هستند.'),
    L("Laut PDF ist der Befall meist einseitig; sie nennt 10–15 % beidseitige Fälle, dann meist zeitversetzt. Das ist eine quellenbezogene Häufigkeitsangabe, keine Vorhersage für einzelne Kinder.", "The PDF describes predominantly unilateral disease and reports 10–15% bilateral cases, usually asynchronous. This is a source-specific frequency, not a prediction for an individual child.", "طبق PDF، درگیری اغلب یک‌طرفه است و۱۰ تا۱۵٪ موارد دوطرفه‌اند که معمولاً با فاصلهٔ زمانی رخ می‌دهند. این فراوانی به همان منبع نسبت داده می‌شود و پیش‌بینی برای یک کودک نیست."),
  ],
  stages: [
    { name: L('Initialphase', 'Initial phase', 'مرحلهٔ اولیه'), finding: L('Osteonekrose · Crescent-Zeichen kann auftreten', 'Osteonecrosis · a crescent sign may appear', 'استئونکروز · ممکن است علامت کرسنت دیده شود'), shape: 'initial' },
    { name: L('Kondensation', 'Condensation', 'تراکم'), finding: L('Sklerose · Epiphyse kann niedriger werden', 'Sclerosis · the epiphysis may lose height', 'اسکلروز · ارتفاع اپی‌فیز ممکن است کم شود'), shape: 'dense' },
    { name: L('Fragmentation', 'Fragmentation', 'قطعه‌قطعه‌شدن'), finding: L('Fragmentierung · Abflachung / laterale Verlagerung möglich', 'Fragmentation · flattening / lateral displacement may occur', 'قطعه‌قطعه‌شدن · صاف‌شدن / جابه‌جایی جانبی ممکن است رخ دهد'), shape: 'fragment' },
    { name: L('Reparatur', 'Reossification', 'بازسازی استخوانی'), finding: L('Reossifikation und Umbau', 'Reossification and remodelling', 'استخوان‌سازی مجدد و بازسازی'), shape: 'repair' },
    { name: L('Endphase', 'Healed / residual phase', 'مرحلهٔ نهایی / باقی‌مانده'), finding: L('Mögliche Restform: Coxa plana oder magna', 'Possible residual shape: coxa plana or magna', 'شکل باقی‌ماندهٔ احتمالی: کوکسا پلانا یا مگنا'), shape: 'residual' },
  ],
  radiograph: [
    L('Projektionsradiographie ist im PDF das Mittel der Wahl zur Verlaufskontrolle: Beckenübersicht und Lauenstein-Aufnahme.', 'Plain radiography is the PDF’s modality of choice for follow-up: pelvic overview and Lauenstein view.', 'رادیوگرافی ساده در PDF روش انتخابی برای پیگیری است: نمای کلی لگن و نمای لائونشتاین.'),
    L('Im Verlauf können Gelenkspaltverbreiterung, subchondrale Fraktur (Crescent-Zeichen), Sklerose, Fragmentierung, Abflachung und metaphysäre Veränderungen auftreten.', 'Over time, joint-space widening, subchondral fracture (crescent sign), sclerosis, fragmentation, flattening and metaphyseal changes may appear.', 'در سیر بیماری ممکن است گشادشدن فضای مفصل، شکستگی زیرغضروفی (علامت کرسنت)، اسکلروز، قطعه‌قطعه‌شدن، صاف‌شدن و تغییرات متافیزی دیده شوند.'),
    L("Die beschriebenen Phasen zeigen den zeitlichen Verlauf; sie sind keine alleinige Prognose- oder Therapieklassifikation.", "The described phases show the time course; they are not, by themselves, a prognostic or treatment classification.", "فازهای توصیف‌شده سیر زمانی را نشان می‌دهند و به‌تنهایی طبقه‌بندی پیش‌آگهی یا درمان نیستند."),
  ],
  mri: [
    L('Das PDF beschreibt das MRT als sensitivste Frühdiagnostik und für frühe Diagnose als entscheidend.', 'The PDF describes MRI as the most sensitive early diagnostic test and as decisive for early diagnosis.', 'PDF، MRI را حساس‌ترین روش تشخیص زودرس و برای تشخیص زودرس تعیین‌کننده توصیف می‌کند.'),
    L('T1: Verlust des normalen fettreichen Knochenmarksignals kann eine Nekrose anzeigen.', 'T1: loss of normal fatty marrow signal may indicate necrosis.', 'T1: از بین رفتن سیگنال طبیعی مغز استخوان چرب می‌تواند نشان‌دهندهٔ نکروز باشد.'),
    L('T2 fettgesättigt: Knochenmarködem kann hyperintens erscheinen; ein Gelenkerguss kann begleitend vorkommen.', 'Fat-suppressed T2: marrow oedema may appear hyperintense; a joint effusion may accompany it.', 'T2 با سرکوب چربی: ادم مغز استخوان ممکن است پرسیگنال باشد؛ افیوژن مفصل می‌تواند همراه آن باشد.'),
    L('Nach Kontrastmittel kann das Infarktareal keine Kontrastmittelanreicherung zeigen („empty quarter“); Reparatur kann randständige oder bandförmige Kontrastmittelanreicherung zeigen.', 'After contrast, the infarcted area may show no contrast enhancement (“empty quarter”); repair may show peripheral or band-like enhancement.', 'پس از تزریق مادهٔ حاجب، ناحیهٔ انفارکته ممکن است افزایش جذب مادهٔ حاجب نداشته باشد («ربع خالی»)، و ترمیم می‌تواند افزایش جذب محیطی یا نواری مادهٔ حاجب نشان دهد.'),
  ],
  radiographSeries: [
    { src: '/educational/perthes/rid-9742-initial.jpg', period: L('Initialstadium', 'Initial phase', 'مرحلهٔ اولیه'), alt: L('Beckenübersicht und Lauenstein-Aufnahme im Initialstadium; der rechte Femurkopf ist im Verlauf zu beobachten.', "Pelvic overview and Lauenstein views in the initial phase; follow the right femoral head through the series.", 'نمای کلی لگن و نمای لائونشتاین در مرحلهٔ اولیه؛ سر فمور راست را در این سری دنبال کنید.') },
    { src: '/educational/perthes/rid-9742-2-months.jpg', period: L('Nach 2 Monaten', 'After 2 months', 'پس از ۲ ماه'), alt: L('Beckenübersicht und Lauenstein-Aufnahme nach 2 Monaten; dieselbe rechte Hüfte im zeitlichen Verlauf.', "Pelvic overview and Lauenstein views after 2 months; the same right hip in the time series.", 'نمای کلی لگن و نمای لائونشتاین پس از ۲ ماه؛ همان لگن راست در پیگیری زمانی.') },
    { src: '/educational/perthes/rid-9742-10-months.jpg', period: L('Nach 10 Monaten', 'After 10 months', 'پس از ۱۰ ماه'), alt: L('Beckenübersicht und Lauenstein-Aufnahme nach 10 Monaten; der Verlauf der rechten Femurkopfepiphyse.', "Pelvic overview and Lauenstein views after 10 months; the course of the right femoral-head epiphysis.", 'نمای کلی لگن و نمای لائونشتاین پس از ۱۰ ماه؛ سیر اپی‌فیز سر فمور راست.') },
  ],
  differentials: [
    [L('Coxitis fugax / transiente Synovitis', 'Transient synovitis', 'سینوویت گذرا'), L('Hüftschmerz und Erguss können überlappen. Anhaltende oder wiederkehrende Beschwerden verlangen erneute klinische und bildgebende Einordnung; ein Erguss allein beweist Perthes nicht.', 'Hip pain and effusion can overlap. Persistent or recurrent symptoms require reassessment; an effusion alone does not establish Perthes disease.', 'درد لگن و افیوژن می‌توانند هم‌پوشانی داشته باشند. علائم پایدار یا عودکننده نیازمند ارزیابی دوباره‌اند؛ افیوژن به‌تنهایی پرتس را ثابت نمی‌کند.')],
    [L('Sekundäre / systemische Osteonekrose', 'Secondary / systemic osteonecrosis', 'استئونکروز ثانویه / سیستمیک'), L('Bei bilateraler Beteiligung, besonders wenn sie gleichzeitig und relativ symmetrisch ist, nach anderen Ursachen suchen; diese Differenzialdiagnose nennt auch POSNA.', 'With bilateral involvement, especially if synchronous and relatively symmetric, look for other causes; POSNA also lists this differential.', 'در درگیری دوطرفه، به‌ویژه اگر هم‌زمان و نسبتاً متقارن باشد، به دنبال علل دیگر بگردید؛ POSNA نیز این افتراق را ذکر می‌کند.')],
  ],
  check: {
    question: L('Ein Kind hat eine Hüftbewegungseinschränkung. Das Röntgenbild ist noch unauffällig, der klinische Verdacht bleibt bestehen. Welche Bildgebung kann frühe Veränderungen vor dem Röntgen zeigen?', 'A child has restricted hip movement. Radiographs are still unremarkable, but clinical suspicion remains. Which modality can show early changes before radiographs?', 'حرکت لگن کودک محدود است. رادیوگرافی هنوز طبیعی است، اما شک بالینی باقی است. کدام روش می‌تواند تغییرات زودرس را پیش از رادیوگرافی نشان دهد؟'),
    options: [L('MRT', 'MRI', 'MRI'), L('Eine erneute Beckenübersicht allein schließt frühe Erkrankung aus.', 'A repeat pelvic radiograph alone excludes early disease.', 'تکرار رادیوگرافی لگن به‌تنهایی بیماری زودرس را رد می‌کند.'), L('CT als routinemäßige Frühdiagnostik', 'CT as routine early imaging', 'CT به‌عنوان تصویربرداری روتین زودرس')],
    answer: 0,
    feedback: L('Richtig: Das PDF nennt MRT als sensitivste Frühdiagnostik. Ein unauffälliges frühes Röntgenbild schließt Perthes bei anhaltendem Verdacht nicht sicher aus.', 'Correct: the PDF names MRI as the most sensitive early diagnostic test. An unremarkable early radiograph does not securely exclude Perthes when suspicion persists.', 'درست است: PDF، MRI را حساس‌ترین روش تشخیص زودرس می‌داند. رادیوگرافی طبیعی در مراحل اولیه، در صورت باقی‌ماندن شک، پرتس را به‌طور مطمئن رد نمی‌کند.'),
  },
  takeHome: [
    L('Klinischen Verdacht, Beweglichkeit und Bildgebung zusammen lesen.', 'Read clinical suspicion, range of motion and imaging together.', 'شک بالینی، دامنهٔ حرکت و تصویربرداری را با هم ارزیابی کنید.'),
    L('Frühes Röntgen kann noch unauffällig sein; MRT kann frühe Veränderungen zeigen.', 'Early radiographs may be unremarkable; MRI can show early changes.', 'رادیوگرافی زودرس ممکن است طبیعی باشد؛ MRI می‌تواند تغییرات زودرس را نشان دهد.'),
    L('Die Waldenström-Abfolge beschreibt den zeitlichen Verlauf; Fragmentierung ist eine Phase, keine eigenständige Prognose.', 'The Waldenström sequence describes temporal evolution; fragmentation is a phase, not a prognosis by itself.', 'توالی والدنستروم سیر زمانی را توصیف می‌کند؛ قطعه‌قطعه‌شدن یک مرحله است، نه پیش‌آگهی مستقل.'),
    L('Bei bilateraler Erkrankung andere Ursachen einer Osteonekrose mitbedenken.', 'With bilateral disease, consider other causes of osteonecrosis.', 'در بیماری دوطرفه، علل دیگر استئونکروز را نیز در نظر بگیرید.'),
  ],
}
