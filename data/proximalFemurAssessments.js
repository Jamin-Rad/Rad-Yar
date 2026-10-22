const L = (de, en, fa) => ({ de, en, fa })
const seeds = [
  {
    id: 'trauma-imaging-position',
    question: L('Bei Verdacht auf eine proximale Femurfraktur: Wie sollte die zweite Ebene angefertigt werden, wenn die a.p.-Aufnahme nicht genügt?', 'With suspected proximal femoral fracture, how should the second view be obtained if the AP image is insufficient?', 'در شک به شکستگی پروگزیمال فمور، اگر نمای AP کافی نباشد، نمای دوم چگونه تهیه شود؟'),
    options: [L('Als Cross-table-Lateralaufnahme, ohne das verletzte Bein für eine Froschbeinposition zu bewegen.', 'As a cross-table lateral, without moving the injured leg into a frog-leg position.', 'به‌صورت لترال cross-table، بدون حرکت‌دادن پای آسیب‌دیده برای وضعیت فراگ‌لگ.'), L('Als Lauenstein-Aufnahme mit Flexion, Abduktion und Außenrotation, auch wenn eine Fraktur vermutet wird.', 'As a Lauenstein view with flexion, abduction and external rotation, even when fracture is suspected.', 'به‌صورت Lauenstein با فلکسیون، ابداکسیون و چرخش خارجی، حتی در شک به شکستگی.'), L('Nur als a.p.-Aufnahme; eine zweite Ebene ist bei Frakturverdacht nicht erforderlich.', 'AP only; a second plane is not required when fracture is suspected.', 'فقط نمای AP؛ در شک به شکستگی نمای دوم لازم نیست.'), L('Durch erzwungene Innenrotation des Beins unabhängig von Schmerz oder Beweglichkeit.', 'By forcing internal rotation regardless of pain or mobility.', 'با چرخش داخلی اجباری پا، مستقل از درد یا امکان حرکت.')],
    correct: 0,
    explanation: L('Die Cross-table-Technik ermöglicht eine laterale Ebene, ohne das verletzte Bein in Flexion/Abduktion/Außenrotation zu bringen. Keine Lagerung erzwingen.', 'Cross-table technique provides a lateral plane without placing the injured leg in flexion/abduction/external rotation. Do not force positioning.', 'روش cross-table نمای لترال را بدون فلکسیون/ابداکسیون/چرخش خارجی پای آسیب‌دیده فراهم می‌کند. وضعیت‌دهی را به‌زور انجام ندهید.'),
  },
  {
    id: 'pauwels-angle',
    question: L('Welche Winkelgrenzen verwendet diese Lektion nach AO für Pauwels II und III?', 'Which AO angle cutoffs does this lesson use for Pauwels II and III?', 'این درس بر اساس AO برای Pauwels II و III از چه مرزهای زاویه‌ای استفاده می‌کند؟'),
    options: [L('II: 30°–50°; III: >50°', 'II: 30°–50°; III: >50°', 'II: ۳۰ تا ۵۰ درجه؛ III: بیش از ۵۰ درجه'), L('II: 30°–70°; III: >70°', 'II: 30°–70°; III: >70°', 'II: ۳۰ تا ۷۰ درجه؛ III: بیش از ۷۰ درجه'), L('II: <30°; III: 30°–50°', 'II: <30°; III: 30°–50°', 'II: کمتر از ۳۰ درجه؛ III: ۳۰ تا ۵۰ درجه'), L('Die Einteilung verwendet nur die Dislokation, nicht den Winkel.', 'The classification uses displacement only, not angle.', 'این طبقه‌بندی فقط از جابه‌جایی استفاده می‌کند، نه زاویه.')],
    correct: 0,
    explanation: L('AO definiert Typ II mit 30°–50° und Typ III mit >50°. Die 30°/70°-Grenze in MSK.pdf wird im Lektionstext ausdrücklich als abweichend markiert.', 'AO defines type II as 30°–50° and type III as >50°. The 30°/70° cutoffs in MSK.pdf are explicitly identified as different in the lesson.', 'AO نوع II را ۳۰ تا ۵۰ درجه و نوع III را بیش از ۵۰ درجه تعریف می‌کند. مرزهای ۳۰/۷۰ درجه در MSK.pdf در درس صریحاً متفاوت معرفی شده‌اند.'),
  },
  {
    id: 'garden',
    question: L('Was beschreibt die Garden-Klassifikation einer Schenkelhalsfraktur am direktesten?', 'What does the Garden classification of a femoral-neck fracture describe most directly?', 'طبقه‌بندی Garden در شکستگی گردن فمور مستقیماً چه چیزی را توصیف می‌کند؟'),
    options: [L('Vollständigkeit und Dislokationsgrad', 'Completeness and degree of displacement', 'کامل‌بودن و میزان جابه‌جایی'), L('Den gemessenen Blutfluss im Femurkopf', 'Measured blood flow in the femoral head', 'جریان خون اندازه‌گیری‌شده در سر فمور'), L('Den Winkel der Frakturlinie zur Horizontalen', 'The fracture-line angle to the horizontal', 'زاویهٔ خط شکستگی نسبت به افق'), L('Die genaue Stabilität der lateralen Wand', 'The exact stability of the lateral wall', 'پایداری دقیق دیوارهٔ خارجی')],
    correct: 0,
    explanation: L('Garden beschreibt Vollständigkeit und Dislokationsmuster. Es ist keine direkte Perfusionsmessung und liefert keine sichere individuelle Nekroseprognose.', 'Garden describes completeness and displacement pattern. It is not a direct perfusion measurement and does not provide a certain individual prognosis of necrosis.', 'Garden کامل‌بودن و الگوی جابه‌جایی را توصیف می‌کند. این طبقه‌بندی اندازه‌گیری مستقیم پرفیوژن نیست و پیش‌آگهی قطعی نکروز برای فرد نمی‌دهد.'),
  },
]

export const PROXIMAL_FEMUR_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang,
  seeds.map(seed => ({
    id: `proximal-femur-${seed.id}-${lang}`,
    question: seed.question[lang],
    options: seed.options.map((text, index) => ({ id: ['A', 'B', 'C', 'D'][index], text: text[lang] })),
    correct: ['A', 'B', 'C', 'D'][seed.correct],
    explanation: seed.explanation[lang],
    tags: ['proximale-femurfraktur'],
    fach: 'msk',
  })),
]))

export const PROXIMAL_FEMUR_FLASHCARDS = [
  { id: 'proximal-femur-trauma-views', topicId: 'proximale-femurfraktur', category: L('Aufnahmetechnik', 'Imaging technique', 'روش تصویربرداری'), front: L('Welche zweite Ebene ist bei Frakturverdacht geeignet, ohne das verletzte Bein in eine Lauenstein-/Froschbeinposition zu bringen?', 'Which second view is suitable with suspected fracture without placing the injured leg in a Lauenstein/frog-leg position?', 'در شک به شکستگی، کدام نمای دوم مناسب است بی‌آنکه پای آسیب‌دیده در وضعیت Lauenstein/frog-leg قرار گیرد؟'), answer: L('Eine Cross-table-Lateralaufnahme.', 'A cross-table lateral view.', 'نمای لترال cross-table.'), explanation: L('Die a.p.- und laterale Ebene ergänzen sich. Bei Trauma erlaubt Cross-table die zweite Ebene, ohne das Bein für Flexion, Abduktion und Außenrotation zu bewegen.', 'AP and lateral planes complement each other. In trauma, cross-table provides the second view without moving the leg into flexion, abduction and external rotation.', 'نماهای AP و لترال مکمل هم‌اند. در تروما، روش cross-table نمای دوم را بدون قراردادن پا در فلکسیون، ابداکسیون و چرخش خارجی فراهم می‌کند.') },
  { id: 'proximal-femur-pauwels', topicId: 'proximale-femurfraktur', category: L('Klassifikation', 'Classification', 'طبقه‌بندی'), front: L('Welche AO-Winkelgrenzen trennen Pauwels I, II und III?', 'Which AO angle cutoffs separate Pauwels I, II and III?', 'چه مرزهای زاویه‌ای AO انواع Pauwels I، II و III را جدا می‌کنند؟'), answer: L('I <30°; II 30°–50°; III >50°.', 'I <30°; II 30°–50°; III >50°.', 'I کمتر از ۳۰°؛ II از ۳۰ تا ۵۰°؛ III بیش از ۵۰°.'), explanation: L('Die PDF gibt abweichend 30°/70° an; diese Lektion folgt der AO-Einteilung.', 'The PDF gives different 30°/70° cutoffs; this lesson follows the AO classification.', 'PDF مرز متفاوت ۳۰/۷۰ درجه را آورده است؛ این درس از طبقه‌بندی AO پیروی می‌کند.') },
  { id: 'proximal-femur-garden', topicId: 'proximale-femurfraktur', category: L('Schenkelhals', 'Femoral neck', 'گردن فمور'), front: L('Was ordnet Garden ein?', 'What does Garden classify?', 'Garden چه چیزی را طبقه‌بندی می‌کند؟'), answer: L('Vollständigkeit und Dislokationsgrad einer Schenkelhalsfraktur.', 'Completeness and displacement of a femoral-neck fracture.', 'کامل‌بودن و میزان جابه‌جایی شکستگی گردن فمور.'), explanation: L('Garden misst die Perfusion des Femurkopfs nicht direkt.', 'Garden does not directly measure femoral-head perfusion.', 'Garden پرفیوژن سر فمور را مستقیماً اندازه‌گیری نمی‌کند.') },
]

export const PROXIMAL_FEMUR_FLASHCARD_TOPIC = {
  id: 'proximale-femurfraktur', title: L('Proximale Femurfraktur', 'Proximal femoral fracture', 'شکستگی پروگزیمال فمور'),
  subtitle: L('Frakturregion · Pauwels · Garden', 'Fracture region · Pauwels · Garden', 'ناحیهٔ شکستگی · Pauwels · Garden'),
  area: 'MSK', chapter: L('Hüfte & Becken', 'Hip & pelvis', 'لگن و مفصل ران'), icon: '🦴', iconImage: '/fach/becken-m.png',
  color: '#d49a61', href: '/flashcards/proximale-femurfraktur',
}
