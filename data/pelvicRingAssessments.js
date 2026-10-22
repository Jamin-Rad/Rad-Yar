const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation) => ({
  id: `beckenring-${id}`,
  question,
  options: options.map((text, index) => ({ id: ['A', 'B', 'C', 'D'][index], text })),
  correct: ['A', 'B', 'C', 'D'][correct],
  explanation,
  tags: ['beckenringfraktur'],
  fach: 'msk',
})

const items = [
  {
    id: 'ao-version',
    question: L('Wie unterscheidet AO/OTA 2018 die Untergruppen 61B1 und 61B2?', 'How does AO/OTA 2018 distinguish subgroups 61B1 and 61B2?', 'طبقه‌بندی AO/OTA 2018 زیرگروه‌های 61B1 و 61B2 را چگونه از هم جدا می‌کند؟'),
    options: [L('61B1 ohne, 61B2 mit Rotationsinstabilität', '61B1 without, 61B2 with rotational instability', '61B1 بدون ناپایداری چرخشی و 61B2 همراه با ناپایداری چرخشی'), L('61B1 und 61B2 sind beide vertikal instabil', 'Both 61B1 and 61B2 are vertically unstable', 'هر دو 61B1 و 61B2 از نظر عمودی ناپایدارند'), L('61B1 ist eine komplette hintere Ringunterbrechung', '61B1 is a complete posterior-ring disruption', '61B1 به معنی قطع کامل حلقهٔ خلفی است'), L('61B2 bezeichnet eine isolierte vordere Ringfraktur ohne hintere Läsion', '61B2 means an isolated anterior-ring fracture without posterior injury', '61B2 به شکستگی منفرد حلقهٔ قدامی بدون آسیب خلفی اشاره دارد')],
    correct: 0,
    explanation: L('AO/OTA 2018 verwendet 61B1 für inkomplette hintere Bogenverletzungen ohne Rotationsinstabilität und 61B2 für rotationsinstabile Muster. Das ist von der klassischen Tile-Grundkategorie B zu unterscheiden.', 'AO/OTA 2018 uses 61B1 for incomplete posterior-arch injuries without rotational instability and 61B2 for rotationally unstable patterns. Distinguish these subgroups from the classic Tile basic type B.', 'در AO/OTA 2018، 61B1 برای آسیب ناکامل قوس خلفی بدون ناپایداری چرخشی و 61B2 برای الگوهای ناپایدار چرخشی است. این زیرگروه‌ها با نوع پایهٔ B در طبقه‌بندی کلاسیک Tile یکسان نیستند.'),
  },
  {
    id: 'l5-clue',
    question: L('Was bedeutet eine L5-Querfortsatzfraktur für die Beurteilung des Beckenrings?', 'What does an L5 transverse-process fracture mean when assessing the pelvic ring?', 'شکستگی زائدهٔ عرضی L5 در ارزیابی حلقهٔ لگنی چه معنایی دارد؟'),
    options: [L('Sie beweist eine Typ-C-Verletzung.', 'It proves a type C injury.', 'نوع C را ثابت می‌کند.'), L('Sie ist ein Anlass, den posterioren Ring zu prüfen, beweist aber allein keine Instabilität.', 'It is a reason to inspect the posterior ring but does not alone prove instability.', 'دلیلی برای بررسی حلقهٔ خلفی است، اما به‌تنهایی ناپایداری را ثابت نمی‌کند.'), L('Sie schließt eine hintere Ringverletzung aus.', 'It excludes posterior-ring injury.', 'آسیب حلقهٔ خلفی را رد می‌کند.'), L('Sie bestimmt allein die vertikale Stabilität.', 'It alone determines vertical stability.', 'به‌تنهایی پایداری عمودی را تعیین می‌کند.')],
    correct: 1,
    explanation: L('Die systematische Übersichtsarbeit fand keinen Zusammenhang mit der Ringstabilität; die Fraktur kann jedoch ein Hinweis auf ein Hochenergietrauma sein. Den posterioren Ring direkt beurteilen.', 'The systematic review found no association with ring stability; the fracture may indicate high-energy trauma. Assess the posterior ring directly.', 'مرور نظام‌مند ارتباطی با پایداری حلقه نیافت؛ بااین‌حال این شکستگی می‌تواند نشانهٔ تروما با انرژی بالا باشد. حلقهٔ خلفی را مستقیم ارزیابی کنید.'),
  },
]

export const PELVIC_RING_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang,
  items.map(item => Q(item.id, item.question[lang], item.options.map(option => option[lang]), item.correct, item.explanation[lang])),
]))

export const PELVIC_RING_FLASHCARDS = [
  { id: 'beckenring-fc-ao-version', topicId: 'beckenringfraktur', category: L('Klassifikation', 'Classification', 'طبقه‌بندی'), front: L('Was ist der zentrale Unterschied zwischen AO/OTA 2018 61B1 und 61B2?', 'What is the key difference between AO/OTA 2018 61B1 and 61B2?', 'تفاوت اصلی 61B1 و 61B2 در AO/OTA 2018 چیست؟'), answer: L('61B1: keine Rotationsinstabilität; 61B2: rotationsinstabil.', '61B1: no rotational instability; 61B2: rotationally unstable.', '61B1: بدون ناپایداری چرخشی؛ 61B2: ناپایدار چرخشی.'), explanation: L('Nicht mit der klassischen Tile-Grundkategorie B gleichsetzen.', 'Do not equate this subgroup wording with classic Tile basic type B.', 'این نام‌گذاری زیرگروه را با نوع پایهٔ B در Tile کلاسیک یکی نگیرید.') },
  { id: 'beckenring-fc-l5', topicId: 'beckenringfraktur', category: L('Begleitzeichen', 'Associated finding', 'یافتهٔ همراه'), front: L('Beweist eine L5-Querfortsatzfraktur eine Beckenringinstabilität?', 'Does an L5 transverse-process fracture prove pelvic-ring instability?', 'آیا شکستگی زائدهٔ عرضی L5 ناپایداری حلقهٔ لگنی را ثابت می‌کند؟'), answer: L('Nein. Sie kann ein Hochenergietrauma anzeigen; den posterioren Ring direkt prüfen.', 'No. It may indicate high-energy trauma; assess the posterior ring directly.', 'خیر. می‌تواند نشانهٔ تروما با انرژی بالا باشد؛ حلقهٔ خلفی را مستقیم بررسی کنید.'), explanation: L('Die Metaanalyse fand keinen Zusammenhang mit der Ringstabilität.', 'The meta-analysis found no association with ring stability.', 'متاآنالیز ارتباطی با پایداری حلقه نیافت.') },
]

export const PELVIC_RING_FLASHCARD_TOPIC = {
  id: 'beckenringfraktur', title: L('Beckenringfraktur', 'Pelvic Ring Fracture', 'شکستگی حلقهٔ لگنی'),
  subtitle: L('Tile · AO/OTA · Stabilität', 'Tile · AO/OTA · stability', 'Tile · AO/OTA · پایداری'),
  area: 'MSK', chapter: L('Hüfte & Becken', 'Hip & pelvis', 'لگن و مفصل ران'), icon: '🦴', iconImage: '/fach/becken-m.png',
  color: '#63c7bd', href: '/flashcards/beckenringfraktur',
}
