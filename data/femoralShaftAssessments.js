const L = (de, en, fa) => ({ de, en, fa })

const seeds = [
  {
    id: 'ao32-simple-subtype',
    question: L('Welche Untergruppe beschreibt eine einfache Schrägfraktur mit einem Winkel von 35°?', 'Which subtype describes a simple oblique fracture with a 35° angle?', 'کدام زیرگروه شکستگی مایل ساده با زاویهٔ ۳۵ درجه را توصیف می‌کند؟'),
    options: [L('32-A1 · Spiralfraktur', '32-A1 · spiral fracture', '32-A1 · شکستگی مارپیچی'), L('32-A2 · Schrägfraktur ≥30°', '32-A2 · oblique fracture ≥30°', '32-A2 · شکستگی مایل ≥۳۰°'), L('32-A3 · Querfraktur <30°', '32-A3 · transverse fracture <30°', '32-A3 · شکستگی عرضی <۳۰°'), L('32-B · Keilfraktur', '32-B · wedge fracture', '32-B · شکستگی گوه‌ای')],
    correct: 1,
    explanation: L('Eine einfache Schrägfraktur mit mindestens 30° gehört zu 32-A2. A1 ist spiral und A3 quer mit weniger als 30°.', 'A simple oblique fracture of at least 30° is 32-A2. A1 is spiral and A3 is transverse at less than 30°.', 'شکستگی مایل ساده با زاویهٔ حداقل ۳۰° در گروه 32-A2 است. A1 مارپیچی و A3 عرضی با زاویهٔ کمتر از ۳۰° است.'),
  },
  {
    id: 'ao32-groups',
    question: L('Welche Zuordnung der AO-Grundgruppen ist korrekt?', 'Which mapping of the AO basic groups is correct?', 'کدام تطبیق گروه‌های پایهٔ AO درست است؟'),
    options: [L('32-A = einfach; 32-B = Keil; 32-C = mehrfragmentär', '32-A = simple; 32-B = wedge; 32-C = multifragmentary', '32-A = ساده؛ 32-B = گوه‌ای؛ 32-C = چندقطعه‌ای'), L('32-A = Keil; 32-B = einfach; 32-C = nur Querfraktur', '32-A = wedge; 32-B = simple; 32-C = transverse only', '32-A = گوه‌ای؛ 32-B = ساده؛ 32-C = فقط عرضی'), L('32-A/B/C unterscheiden sich ausschließlich nach Frakturhöhe', '32-A/B/C differ only by fracture level', '32-A/B/C فقط بر اساس سطح شکستگی تفاوت دارند'), L('32-C wird allein durch mehr als drei Fragmente bestimmt', '32-C is determined solely by having more than three fragments', '32-C فقط با وجود بیش از سه قطعه تعیین می‌شود')],
    correct: 0,
    explanation: L('32-A steht für einfache Frakturen, 32-B für Keilfrakturen und 32-C für mehrfragmentäre Muster. Die vollständige Unterklassifikation berücksichtigt zusätzliche Morphologiedetails; die Fragmentzahl allein reicht nicht.', '32-A denotes simple fractures, 32-B wedge fractures and 32-C multifragmentary patterns. Full subtyping considers additional morphology; fragment count alone is not enough.', '32-A به شکستگی ساده، 32-B به شکستگی گوه‌ای و 32-C به الگوی چندقطعه‌ای اشاره دارد. زیرطبقه‌بندی کامل جزئیات مورفولوژیک بیشتری را در نظر می‌گیرد؛ شمارش قطعات به‌تنهایی کافی نیست.'),
  },
]

export const FEMORAL_SHAFT_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang,
  seeds.map(seed => ({
    id: `femoral-shaft-${seed.id}-${lang}`,
    question: seed.question[lang],
    options: seed.options.map((text, index) => ({ id: ['A', 'B', 'C', 'D'][index], text: text[lang] })),
    correct: ['A', 'B', 'C', 'D'][seed.correct],
    explanation: seed.explanation[lang],
    tags: ['femurschaftfraktur'],
    fach: 'msk',
  })),
]))

export const FEMORAL_SHAFT_FLASHCARDS = [
  { id: 'femoral-shaft-ao32-groups', topicId: 'femurschaftfraktur', category: L('AO-32-Morphologie', 'AO 32 morphology', 'مورفولوژی AO 32'), front: L('Wofür stehen die AO-Grundgruppen 32-A, 32-B und 32-C?', 'What do AO basic groups 32-A, 32-B and 32-C mean?', 'گروه‌های پایهٔ AO یعنی 32-A، 32-B و 32-C چه معنایی دارند؟'), answer: L('32-A: einfach; 32-B: Keil; 32-C: mehrfragmentär. Die vollständige Unterklassifikation benötigt weitere Morphologiedetails.', '32-A: simple; 32-B: wedge; 32-C: multifragmentary. Full subtype classification requires more morphology details.', '32-A: ساده؛ 32-B: گوه‌ای؛ 32-C: چندقطعه‌ای. زیرطبقه‌بندی کامل به جزئیات مورفولوژیک بیشتری نیاز دارد.'), explanation: L('Die Grundgruppen benennen die Morphologie, nicht Therapie oder Prognose.', 'The basic groups describe morphology, not treatment or prognosis.', 'گروه‌های پایه مورفولوژی را توصیف می‌کنند، نه درمان یا پیش‌آگهی را.') },
  { id: 'femoral-shaft-ao32-a-subtypes', topicId: 'femurschaftfraktur', category: L('Einfache Fraktur', 'Simple fracture', 'شکستگی ساده'), front: L('Wie unterscheiden sich 32-A1, A2 und A3?', 'How do 32-A1, A2 and A3 differ?', '32-A1، A2 و A3 چه تفاوتی دارند؟'), answer: L('A1 spiral; A2 schräg mit ≥30°; A3 quer mit <30°.', 'A1 spiral; A2 oblique at ≥30°; A3 transverse at <30°.', 'A1 مارپیچی؛ A2 مایل با ≥۳۰°؛ A3 عرضی با <۳۰°.'), explanation: L('Die Linie und ihr Winkel ordnen die einfache Fraktur ein.', 'The line pattern and its angle classify the simple fracture.', 'الگوی خط و زاویهٔ آن شکستگی ساده را طبقه‌بندی می‌کند.') },
  { id: 'femoral-shaft-image-boundary', topicId: 'femurschaftfraktur', category: L('Bildgrenze', 'Image limits', 'محدودیت تصویر'), front: L('Was zeigen die drei Röntgenbilder im PDF?', 'What do the three radiographs in the PDF show?', 'سه رادیوگرافی PDF چه چیزی را نشان می‌دهند؟'), answer: L('Nur Beispiele der einfachen Untergruppen 32-A1 bis A3; 32-B und 32-C sind auf dieser Abbildung nicht dargestellt.', 'Only examples of simple subtypes 32-A1 through A3; 32-B and 32-C are not shown in this figure.', 'فقط نمونه‌هایی از زیرگروه‌های سادهٔ 32-A1 تا A3؛ 32-B و 32-C در این شکل نمایش داده نشده‌اند.'), explanation: L('Die Bildlegende darf nicht über die tatsächlichen Bildbeispiele hinaus verallgemeinert werden.', 'Do not generalize the figure caption beyond the examples actually shown.', 'نباید توضیح شکل را فراتر از نمونه‌هایی که واقعاً نشان داده شده‌اند تعمیم داد.') },
]

export const FEMORAL_SHAFT_FLASHCARD_TOPIC = {
  id: 'femurschaftfraktur', title: L('Femurschaftfraktur', 'Femoral shaft fracture', 'شکستگی تنهٔ فمور'),
  subtitle: L('AO 32 · einfach · Keil · mehrfragmentär', 'AO 32 · simple · wedge · multifragmentary', 'AO 32 · ساده · گوه‌ای · چندقطعه‌ای'),
  area: 'MSK', chapter: L('Schaftfrakturen', 'Shaft fractures', 'شکستگی‌های تنه'), icon: '🦴', iconImage: '/fach/becken-m.png',
  color: '#b98258', href: '/flashcards/femurschaftfraktur',
}
