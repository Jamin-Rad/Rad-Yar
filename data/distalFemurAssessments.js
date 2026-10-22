const L = (de, en, fa) => ({ de, en, fa })
const seeds = [
  {
    id: 'ao33-hoffa',
    question: L('Wie wird ein Hoffa-Fragment in der AO-Grundeinteilung des distalen Femurs eingeordnet?', 'How is a Hoffa fragment classified in the AO basic groups for distal femur fractures?', 'قطعهٔ هوفا در گروه‌های پایهٔ AO برای شکستگی دیستال فمور چگونه طبقه‌بندی می‌شود؟'),
    options: [L('33-A · extraartikulär', '33-A · extra-articular', '33-A · خارج‌مفصلی'), L('33-B · partiell artikulär, koronales Kondylenfragment', '33-B · partial-articular, coronal condylar fragment', '33-B · نیمه‌مفصلی، قطعهٔ کرونال کندیل'), L('33-C · vollständig artikulär', '33-C · complete-articular', '33-C · تمام‌مفصلی'), L('Die AO-Gruppe wird allein durch die Fragmentzahl bestimmt.', 'The AO group is determined by fragment count alone.', 'گروه AO فقط بر اساس تعداد قطعات تعیین می‌شود.')],
    correct: 1,
    explanation: L('Ein Hoffa-Fragment verläuft koronal durch einen Kondylus und ist ein partiell artikuläres Muster der Gruppe 33-B.', 'A Hoffa fragment runs coronally through a condyle and is a partial-articular 33-B pattern.', 'قطعهٔ هوفا در صفحهٔ کرونال از کندیل می‌گذرد و الگویی نیمه‌مفصلی از گروه 33-B است.'),
  },
  {
    id: 'hoffa-projection',
    question: L('Welche Aussage hilft beim Prüfen eines möglichen Hoffa-Musters in den Röntgenprojektionen?', 'Which statement helps when reviewing radiographs for a possible Hoffa pattern?', 'کدام عبارت هنگام بررسی نماهای رادیوگرافی برای الگوی احتمالی هوفا کمک می‌کند؟'),
    options: [L('Eine unauffällige AP-Projektion schließt ein Hoffa-Fragment sicher aus.', 'An unrevealing AP view reliably excludes a Hoffa fragment.', 'نمای قدامی‌ـ‌خلفی بدون یافته، قطعهٔ هوفا را با اطمینان رد می‌کند.'), L('Ein Hoffa-Fragment ist in der Koronarebene; es kann in der AP-Projektion leicht zu übersehen sein, daher die seitliche Ansicht mitprüfen.', 'A Hoffa fragment lies in the coronal plane and may be easy to miss on AP, so review the lateral view as well.', 'قطعهٔ هوفا در صفحهٔ کرونال قرار دارد و ممکن است در نمای قدامی‌ـ‌خلفی به‌راحتی دیده نشود؛ بنابراین نمای نیمرخ را نیز بررسی کنید.'), L('Nur die AP-Projektion zeigt die Frakturlinie zuverlässig.', 'Only the AP view reliably shows the fracture line.', 'فقط نمای قدامی‌ـ‌خلفی خط شکستگی را با اطمینان نشان می‌دهد.'), L('Die Projektion bestimmt direkt die AO-Gruppe ohne Beurteilung der Gelenkbeteiligung.', 'Projection directly determines the AO group without assessing articular involvement.', 'نما بدون ارزیابی درگیری مفصل مستقیماً گروه AO را تعیین می‌کند.')],
    correct: 1,
    explanation: L('Hoffa-Frakturen sind koronale Kondylenfragmente und können im AP-Bild schwer erkennbar sein. Projektionen gemeinsam beurteilen; ein Röntgenbild ersetzt keine klinische Gesamtbeurteilung.', 'Hoffa fractures are coronal condylar fragments and may be difficult to see on AP. Review projections together; radiographs do not replace the full clinical assessment.', 'شکستگی هوفا قطعه‌ای کرونال از کندیل است و ممکن است در تصویر قدامی‌ـ‌خلفی به‌سختی دیده شود. نماها را با هم ارزیابی کنید؛ رادیوگرافی جایگزین ارزیابی کامل بالینی نیست.'),
  },
]

export const DISTAL_FEMUR_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang,
  seeds.map(seed => ({
    id: `distal-femur-${seed.id}-${lang}`,
    question: seed.question[lang],
    options: seed.options.map((text, index) => ({ id: ['A', 'B', 'C', 'D'][index], text: text[lang] })),
    correct: ['A', 'B', 'C', 'D'][seed.correct],
    explanation: seed.explanation[lang],
    tags: ['distale-femurfraktur'],
    fach: 'msk',
  })),
]))

export const DISTAL_FEMUR_FLASHCARDS = [
  { id: 'distal-femur-ao33', topicId: 'distale-femurfraktur', category: L('AO-Morphologie', 'AO morphology', 'مورفولوژی AO'), front: L('Was unterscheidet AO 33-A, 33-B und 33-C?', 'How do AO 33-A, 33-B and 33-C differ?', 'AO 33-A، 33-B و 33-C چه تفاوتی دارند؟'), answer: L('33-A: extraartikulär; 33-B: partiell artikulär; 33-C: vollständig artikulär und vom Schaft getrennt.', '33-A: extra-articular; 33-B: partial-articular; 33-C: complete-articular and separated from the shaft.', '33-A: خارج‌مفصلی؛ 33-B: نیمه‌مفصلی؛ 33-C: تمام‌مفصلی و جدا از تنه.'), explanation: L('Die Gruppen unterscheiden sich nach Gelenkbeteiligung und Verbindung des Gelenkblocks zum Schaft.', 'The groups distinguish articular involvement and the connection of the articular block to the shaft.', 'گروه‌ها بر اساس درگیری مفصل و اتصال بلوک مفصلی به تنه از هم جدا می‌شوند.') },
  { id: 'distal-femur-hoffa', topicId: 'distale-femurfraktur', category: L('Hoffa', 'Hoffa pattern', 'الگوی هوفا'), front: L('Welche Ebene und Projektion sind bei einem Hoffa-Fragment wichtig?', 'Which plane and radiographic view matter for a Hoffa fragment?', 'در قطعهٔ هوفا کدام صفحه و نمای رادیوگرافی اهمیت دارند؟'), answer: L('Koronales Kondylenfragment; es kann AP leicht übersehen werden, daher die seitliche Projektion mitprüfen.', 'Coronal condylar fragment; it may be missed on AP, so review the lateral projection as well.', 'قطعهٔ کرونال کندیل؛ ممکن است در نمای قدامی‌ـ‌خلفی دیده نشود، پس نمای نیمرخ را هم بررسی کنید.'), explanation: L('Ein unauffälliges AP-Bild schließt das Muster nicht sicher aus.', 'An unrevealing AP view does not reliably exclude the pattern.', 'تصویر قدامی‌ـ‌خلفی بدون یافته، این الگو را با اطمینان رد نمی‌کند.') },
]

export const DISTAL_FEMUR_FLASHCARD_TOPIC = {
  id: 'distale-femurfraktur', title: L('Distale Femurfraktur', 'Distal femur fracture', 'شکستگی دیستال فمور'),
  subtitle: L('AO 33 · Gelenkbeteiligung · Hoffa', 'AO 33 · articular involvement · Hoffa', 'AO 33 · درگیری مفصل · هوفا'),
  area: 'MSK', chapter: L('Knie & Unterschenkel', 'Knee & lower leg', 'زانو و ساق'), icon: '🦴', iconImage: '/fach/becken-m.png',
  color: '#63c7bd', href: '/flashcards/distale-femurfraktur',
}
