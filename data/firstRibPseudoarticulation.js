export const L = (de, en, fa) => ({ de, en, fa })

export const FIRST_RIB_LESSON = {
  id: 'rippenpathologien',
  title: L('Pseudoartikulation der 1. Rippe: ein apikaler Pseudoknoten', 'First-rib pseudoarticulation: an apical pseudonodule', 'شبه‌مفصل دندهٔ اول: شبه‌ندول اپیکال'),
  chapters: [
    { id: 'pattern', icon: 'pattern', title: L('Was projiziert sich ins Lungenfeld?', 'What projects over the lung field?', 'چه چیزی روی میدان ریه تصویر می‌شود؟') },
    { id: 'check', icon: 'check', title: L('Wie kläre ich den Befund?', 'How should I clarify the finding?', 'چگونه یافته را روشن کنم؟') },
    { id: 'summary', icon: 'summary', title: L('Drei Regeln für den Befund', 'Three reporting rules', 'سه قاعده برای گزارش') },
  ],
  labels: {
    contents: L('Lektionsinhalt', 'Lesson content', 'محتوای درس'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
    continue: L('Weiter', 'Continue', 'ادامه'), completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark the full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
    lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson read', 'کل درس خوانده شد'), complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'), completed: L('Gelesen', 'Read', 'خوانده‌شده'),
    open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Abschnitt schließen', 'Close section', 'بستن بخش'), takeHome: L('Drei Regeln merken', 'Three rules to remember', 'سه نکته برای یادآوری'), sources: L('Quellen', 'Sources', 'منابع'),
  },
  lead: L(
    'Eine zusätzliche Gelenkverbindung oder Pseudarthrose im vorderen Drittel der 1. Rippe kann auf der p.-a.-Thoraxaufnahme in das apikale Lungenfeld projizieren. Erkennen Sie zuerst den Bezug zur Rippe; die Überlagerung allein beweist weder einen Nodus noch dessen Ausschluss.',
    'An accessory joint or pseudoarthrosis in the anterior third of the first rib can project over the apical lung on a PA chest radiograph. First establish its relationship to the rib; projection alone neither proves nor excludes a pulmonary nodule.',
    'اتصال مفصلی اضافی یا مفصل کاذب (پسودوآرتروز) در یک‌سوم قدامی دندهٔ اول ممکن است در رادیوگرافی PA روی اپکس ریه بیفتد. ابتدا ارتباط آن با دنده را بررسی کنید؛ صرفِ هم‌پوشانی نه وجود ندول را ثابت می‌کند و نه آن را رد.'
  ),
  imageAlt: L('PA-Thoraxaufnahme mit Quellpfeil auf einem Knochenfokus entlang der 1. Rippe, projiziert über dem linken Lungenapex', 'PA chest radiograph with the source arrow marking a bony focus along the first rib projected over the left apical lung', 'رادیوگرافی PA قفسهٔ سینه؛ پیکان منبع کانون استخوانی در امتداد دندهٔ اول را نشان می‌دهد که روی اپکس چپ افتاده است'),
  imageCaption: L('Thorax.pdf, PDF-Seite 10 (Druckseite 9): Die gelbe Quellmarkierung zeigt die knöcherne Kontur über dem linken apikalen Lungenfeld. In diesem Lehrbild ist die Rippenverbindung die erklärte Ursache; daraus folgt keine allgemeine Regel, apikale Opazitäten als knöchern einzustufen.', 'Thorax.pdf, PDF page 10 (printed page 9): the source arrow marks a bony contour projected over the left apical lung. In this teaching image the rib connection is the stated cause; this does not make apical opacities generally bone findings.', 'Thorax.pdf، صفحهٔ PDF شمارهٔ ۱۰ (چاپی ۹): پیکان منبع، حاشیهٔ استخوانی روی‌افتاده بر اپکس چپ را نشان می‌دهد. در این تصویر آموزشی، اتصال دنده‌ای علت معرفی‌شده است؛ این موضوع قاعده‌ای برای استخوانی دانستن همهٔ کدورت‌های اپیکال ایجاد نمی‌کند.'),
  mechanismHeading: L('Die Projektion ist der Stolperstein', 'Projection creates the pitfall', 'دام تشخیصی از هم‌پوشانی ناشی می‌شود'),
  mechanism: L('Die erste Rippe liegt hoch im Thoraxeingang. Eine zusätzliche vordere knöcherne Gelenkverbindung oder Pseudarthrose kann sich in der Frontalaufnahme als umschriebene, teils verkalkt wirkende Opazität über dem Lungenapex darstellen. Die Quelle nennt die Verwechslung mit einem Lungenrundherd; die tatsächliche Ähnlichkeit hängt von Projektion und Bild ab.', 'The first rib lies high at the thoracic inlet. An additional anterior bony articulation or pseudoarthrosis may appear on the frontal radiograph as a focal, sometimes calcified-looking opacity over the lung apex. The source describes confusion with a pulmonary nodule; the degree of resemblance depends on projection and the image.', 'دندهٔ اول در بخش فوقانی مدخل قفسهٔ سینه قرار دارد. اتصال استخوانی قدامی اضافی یا مفصل کاذب (پسودوآرتروز) می‌تواند در نمای روبه‌رو به‌صورت کدورتی محدود و گاه کلسیفیه‌نما روی اپکس ریه دیده شود. منبع از اشتباه با ندول ریه می‌گوید؛ میزان شباهت به تصویر و نحوهٔ پروجکشن بستگی دارد.'),
  nextHeading: L('Lokalisieren, bevor Sie benennen', 'Localise before labelling', 'پیش از نام‌گذاری، محل را مشخص کنید'),
  nextSteps: [
    L('Prüfen Sie auf der Frontalaufnahme, ob sich die Opazität kontinuierlich aus der 1. Rippe entwickelt und wo sie zum Lungenapex projiziert.', 'On the frontal radiograph, check whether the opacity is continuous with the first rib and where it projects over the apex.', 'در رادیوگرافی روبه‌رو بررسی کنید آیا کدورت پیوستگی با دندهٔ اول دارد و روی کدام بخش اپکس می‌افتد.'),
    L('Vergleichen Sie Voraufnahmen und ergänzende Projektionen, sofern verfügbar. Bleibt die knöcherne Zuordnung unklar oder der Befund klinisch relevant, klären Sie ihn mit geeigneter Schnittbildgebung.', 'Compare prior studies and additional projections when available. If the bony origin remains uncertain or the finding is clinically relevant, clarify it with appropriate cross-sectional imaging.', 'در صورت دسترسی تصاویر قبلی و نماهای تکمیلی را مقایسه کنید. اگر منشأ استخوانی همچنان روشن نیست یا یافته اهمیت بالینی دارد، آن را با تصویربرداری مقطعی مناسب بررسی کنید.'),
    L('Eine plausible Rippenvariante darf die Abklärung eines tatsächlich diskreten oder nicht eindeutig zuordenbaren Lungenherdes nicht ersetzen.', 'A plausible rib variant must not replace evaluation of a genuinely discrete or indeterminate pulmonary opacity.', 'وجود واریانت محتمل دنده‌ای نباید جای بررسی یک کانون ریوی واقعاً مجزا یا نامشخص را بگیرد.'),
  ],
  check: {
    title: L('Selbstcheck: Wo liegt die Opazität?', 'Self-check: where is the opacity?', 'خودآزمایی: کدورت در کجا قرار دارد؟'),
    prompt: L('Auf einer PA-Aufnahme projiziert sich eine fokale Opazität über den linken Apex. Sie scheint aus der Kontur der 1. Rippe hervorzugehen, die Zuordnung ist aber nicht sicher. Was ist der beste nächste Schritt?', 'A focal opacity projects over the left apex on a PA radiograph. It appears to arise from the first-rib contour, but this is not certain. What is the best next step?', 'در نمای PA کانونی روی اپکس چپ دیده می‌شود. به نظر می‌رسد از حاشیهٔ دندهٔ اول منشأ گرفته، اما این ارتباط قطعی نیست. بهترین اقدام بعدی چیست؟'),
    options: [
      L('Als benignen Knochenbefund abschließen; die Projektion reicht aus.', 'Close it as a benign bone finding; projection is sufficient.', 'یافته را خوش‌خیم و استخوانی اعلام کنید؛ پروجکشن کافی است.'),
      L('Den Rippenverlauf und Voraufnahmen prüfen; bei verbleibender Unklarheit mit geeigneter Bildgebung weiter abklären.', 'Check rib continuity and prior studies; if uncertainty remains, clarify with appropriate imaging.', 'پیوستگی با دنده و تصاویر قبلی را بررسی کنید؛ اگر ابهام باقی ماند، با تصویربرداری مناسب پیگیری کنید.'),
      L('Jede Opazität am Apex als malignen Lungenrundherd einstufen.', 'Classify every apical opacity as a malignant pulmonary nodule.', 'هر کدورت اپیکال را ندول بدخیم ریه در نظر بگیرید.'),
    ], answerIndex: 1,
    correct: L('Richtig. Die Rippenvariante ist eine wichtige Erklärung, aber die Überlagerung beweist die Herkunft nicht. Wenn Kontinuität und Verlauf nicht überzeugen, bleibt die Läsion abklärungsbedürftig.', 'Correct. A rib variant is an important explanation, but projection does not prove origin. If continuity and course are not convincing, the opacity still needs evaluation.', 'درست است. واریانت دنده‌ای توضیح مهمی است، اما هم‌پوشانی منشأ را ثابت نمی‌کند. اگر پیوستگی و مسیر اطمینان‌بخش نیست، کدورت همچنان نیاز به بررسی دارد.'),
    retry: L('Die Projektion ist kein Beweis. Verfolgen Sie die knöcherne Kontur; bleibt die Zuordnung unsicher, darf die mögliche Variante die weitere Abklärung nicht beenden.', 'Projection is not proof. Trace the bony contour; if the origin remains uncertain, a possible variant must not end the evaluation.', 'پروجکشن دلیل قطعی نیست. مسیر حاشیهٔ استخوانی را دنبال کنید؛ اگر منشأ نامشخص ماند، احتمال واریانت نباید بررسی بیشتر را متوقف کند.'),
  },
  summary: [
    L('Die akzessorische Verbindung liegt am vorderen Drittel der 1. Rippe.', 'The accessory articulation is in the anterior third of the first rib.', 'اتصال مفصلی اضافی در یک‌سوم قدامی دندهٔ اول قرار دارد.'),
    L('Auf der Frontalaufnahme kann sie über das apikale Lungenfeld projizieren und dort einen Nodus vortäuschen.', 'On a frontal radiograph it can project over the apical lung and simulate a nodule.', 'در نمای روبه‌رو ممکن است روی اپکس ریه بیفتد و نمای ندول ایجاد کند.'),
    L('Die Rippenzuordnung aktiv prüfen; einen unklaren Lungenherd dadurch nicht ausschließen.', 'Actively establish rib origin; do not dismiss an indeterminate lung opacity on that basis.', 'منشأ دنده‌ای را فعالانه بررسی کنید؛ کدورت ریوی نامشخص را صرفاً با این احتمال کنار نگذارید.'),
  ],
}
