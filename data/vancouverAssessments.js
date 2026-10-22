const L = (de, en, fa) => ({ de, en, fa })

const seeds = [
  {
    id: 'b-subtypes',
    question: L('Eine Fraktur liegt am Prothesenschaft. Der Schaft ist gelockert, der proximale Knochenbestand aber ausreichend. Welcher Vancouver-Typ passt?', 'A fracture is around the prosthetic stem. The stem is loose, but proximal bone stock is adequate. Which Vancouver type fits?', 'شکستگی اطراف ساقهٔ پروتز است. ساقه لق شده، اما ذخیرهٔ استخوانی پروگزیمال کافی است. کدام نوع ونکوور مناسب است؟'),
    options: [L('B1', 'B1', 'B1'), L('B2', 'B2', 'B2'), L('B3', 'B3', 'B3'), L('C', 'C', 'C')],
    correct: 1,
    explanation: L('B2 kombiniert einen gelockerten Schaft mit ausreichendem Knochenbestand. B1 hat einen festen Schaft; bei B3 ist der Knochenbestand unzureichend. Typ C liegt distal der Prothesenspitze.', 'B2 combines a loose stem with adequate bone stock. B1 has a well-fixed stem; B3 has inadequate bone stock. Type C lies distal to the stem tip.', 'در B2 ساقه لق است و ذخیرهٔ استخوانی کافی است. در B1 ساقه محکم و در B3 ذخیرهٔ استخوانی ناکافی است. نوع C دیستال نوک ساقه قرار دارد.'),
  },
  {
    id: 'regions',
    question: L('Eine periprothetische Femurfraktur liegt eindeutig distal der Prothesenspitze. Wie wird sie nach Vancouver örtlich eingeordnet?', 'A periprosthetic femoral fracture is clearly distal to the prosthetic stem tip. How is its location classified in Vancouver?', 'شکستگی اطراف پروتز فمور به‌وضوح دیستال نوک ساقه است. محل آن در طبقه‌بندی ونکوور چگونه مشخص می‌شود؟'),
    options: [L('AG', 'AG', 'AG'), L('AL', 'AL', 'AL'), L('B', 'B', 'B'), L('C', 'C', 'C')],
    correct: 3,
    explanation: L('Typ C bezeichnet die Fraktur distal der Prothesenspitze. Die Lage allein beschreibt nicht die gesamte Implantat- oder Behandlungssituation.', 'Type C denotes a fracture distal to the prosthetic stem tip. Location alone does not describe the full implant or treatment context.', 'نوع C به شکستگی دیستال نوک ساقهٔ پروتز اشاره دارد. محل به‌تنهایی وضعیت کامل ایمپلنت یا درمان را مشخص نمی‌کند.'),
  },
]

export const VANCOUVER_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang,
  seeds.map(seed => ({
    id: `vancouver-${seed.id}-${lang}`,
    question: seed.question[lang],
    options: seed.options.map((text, index) => ({ id: ['A', 'B', 'C', 'D'][index], text: text[lang] })),
    correct: ['A', 'B', 'C', 'D'][seed.correct],
    explanation: seed.explanation[lang],
    tags: ['periprothetische-femurfraktur'],
    fach: 'msk',
  })),
]))

export const VANCOUVER_FLASHCARDS = [
  { id: 'vancouver-b1-b2-b3', topicId: 'periprothetische-femurfraktur', category: L('Typ B', 'Type B', 'نوع B'), front: L('Wodurch unterscheiden sich Vancouver B1, B2 und B3?', 'How do Vancouver B1, B2 and B3 differ?', 'انواع B1، B2 و B3 ونکوور چه تفاوتی دارند؟'), answer: L('B1: Schaft fest. B2: Schaft gelockert, Knochenbestand ausreichend. B3: Schaft gelockert, Knochenbestand unzureichend.', 'B1: well-fixed stem. B2: loose stem, adequate bone stock. B3: loose stem, inadequate bone stock.', 'B1: ساقه محکم. B2: ساقه لق و ذخیرهٔ استخوانی کافی. B3: ساقه لق و ذخیرهٔ استخوانی ناکافی.'), explanation: L('Die Klassifikation ordnet das Muster ein; sie ersetzt nicht die individuelle fachärztliche Beurteilung.', 'The classification describes the pattern; it does not replace individual specialist assessment.', 'طبقه‌بندی الگو را مشخص می‌کند و جایگزین ارزیابی فردی متخصص نیست.') },
  { id: 'vancouver-regions', topicId: 'periprothetische-femurfraktur', category: L('Lokalisation', 'Location', 'محل'), front: L('Wo liegt eine Vancouver-C-Fraktur?', 'Where is a Vancouver type C fracture located?', 'شکستگی نوع C ونکوور در کجا قرار دارد؟'), answer: L('Distal der Prothesenspitze.', 'Distal to the prosthetic stem tip.', 'دیستال نوک ساقهٔ پروتز.'), explanation: L('AG und AL betreffen Trochanterregionen; Typ B liegt am oder nahe dem Schaft.', 'AG and AL involve the trochanteric regions; type B is around or near the stem.', 'AG و AL نواحی تروکانتری را درگیر می‌کنند؛ نوع B در اطراف یا نزدیک ساقه قرار دارد.') },
]

export const VANCOUVER_FLASHCARD_TOPIC = {
  id: 'periprothetische-femurfraktur', title: L('Periprothetische Femurfraktur', 'Periprosthetic femoral fracture', 'شکستگی اطراف پروتز فمور'),
  subtitle: L('Vancouver · Lage · Schaft · Knochenbestand', 'Vancouver · location · stem · bone stock', 'ونکوور · محل · ساقه · ذخیرهٔ استخوانی'),
  area: 'MSK', chapter: L('Hüfte & Becken', 'Hip & pelvis', 'لگن و مفصل ران'), icon: '🦴', iconImage: '/fach/becken-m.png',
  color: '#63c7bd', href: '/flashcards/periprothetische-femurfraktur',
}
