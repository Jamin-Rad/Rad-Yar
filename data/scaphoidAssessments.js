const L = (de, en, fa) => ({ de, en, fa })

const Q = (id, q, options, correct, explanation) => ({
  id: `scaphoid-${id}`,
  question: q,
  options: options.map((text, index) => ({ id: ['A', 'B', 'C', 'D'][index], text })),
  correct: ['A', 'B', 'C', 'D'][correct],
  explanation,
  tags: ['skaphoidfraktur'],
  fach: 'msk',
})

const questions = [
  {
    id: 'herbert-b4',
    q: L('Welche Herbert-Untergruppe bezeichnet eine Skaphoidfraktur mit perilunärer Luxation?', 'Which Herbert subtype describes a scaphoid fracture with perilunate dislocation?', 'کدام زیرگروه هربرت شکستگی اسکافوئید همراه با دررفتگی پری‌لونار را توصیف می‌کند؟'),
    options: [L('A1: Tuberkelfraktur', 'A1: tubercle fracture', 'A1: شکستگی تکمه'), L('B2: vollständige Taillenfraktur', 'B2: complete waist fracture', 'B2: شکستگی کامل ناحیهٔ waist'), L('B4: transskaphoidale perilunäre Frakturluxation', 'B4: trans-scaphoid perilunate fracture-dislocation', 'B4: شکستگی-دررفتگی پری‌لونار ترانس‌اسکافوئید'), L('B3: Fraktur des proximalen Pols', 'B3: proximal-pole fracture', 'B3: شکستگی قطب پروگزیمال')],
    correct: 2,
    explanation: L('B4 bezeichnet die transskaphoidale perilunäre Frakturluxation. Die Klassifikation ergänzt die morphologische Beschreibung, ersetzt aber nicht die vollständige Beurteilung der Karpalstellung.', 'B4 describes a trans-scaphoid perilunate fracture-dislocation. The classification supplements the morphology description but does not replace full assessment of carpal alignment.', 'B4 به شکستگی-دررفتگی پری‌لونار ترانس‌اسکافوئید اشاره دارد. طبقه‌بندی مکمل توصیف مورفولوژی است و جای ارزیابی کامل راستای کارپ را نمی‌گیرد.'),
  },
  {
    id: 'snac-pattern',
    q: L('Welches Muster kann sich bei chronischer Skaphoidpseudarthrose entwickeln?', 'Which pattern can develop with chronic scaphoid nonunion?', 'در عدم جوش‌خوردن مزمن اسکافوئید چه الگویی ممکن است ایجاد شود؟'),
    options: [L('SNAC-Arthrosemuster mit radial beginnender Beteiligung', 'A SNAC arthritis pattern beginning radially', 'الگوی آرتروز SNAC با شروع در سمت رادیال'), L('Eine sichere Lunatumluxation', 'Definite lunate dislocation', 'دررفتگی قطعی لونیت'), L('Eine isolierte DRUG-Instabilität', 'Isolated DRUJ instability', 'ناپایداری منفرد DRUJ'), L('Ein normales Röntgenbild in allen Projektionen', 'A normal radiograph in every projection', 'رادیوگرافی طبیعی در تمام نماها')],
    correct: 0,
    explanation: L('Chronische Skaphoidpseudarthrose kann ein SNAC-Muster mit radial beginnender und fortschreitender Arthrose zeigen. Eine einzelne Projektion reicht nicht zur vollständigen Stadieneinteilung.', 'Chronic scaphoid nonunion can show a SNAC pattern with radially starting, progressive arthritis. One projection is not sufficient for full staging.', 'عدم جوش‌خوردن مزمن اسکافوئید ممکن است الگوی SNAC با آرتروزِ آغازشونده از سمت رادیال و پیشرونده ایجاد کند؛ یک نما برای مرحله‌بندی کامل کافی نیست.'),
  },
]

export const SCAPHOID_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  questions.map(item => Q(item.id, item.q[lang], item.options.map(option => option[lang]), item.correct, item.explanation[lang])),
]))

export const SCAPHOID_FLASHCARDS = [
  { id: 'scaphoid-fc-b4', topicId: 'skaphoidfraktur', category: L('Klassifikation', 'Classification', 'طبقه‌بندی'), front: L('Welcher Herbert-Typ steht für eine transskaphoidale perilunäre Frakturluxation?', 'Which Herbert type describes a trans-scaphoid perilunate fracture-dislocation?', 'کدام نوع هربرت نشان‌دهندهٔ شکستگی-دررفتگی پری‌لونار ترانس‌اسکافوئید است؟'), answer: L('B4.', 'B4.', 'B4.'), explanation: L('Die vollständige Karpalstellung und Begleitverletzungen zusätzlich beschreiben.', 'Also describe complete carpal alignment and associated injuries.', 'راستای کامل کارپ و آسیب‌های همراه را نیز توصیف کنید.') },
  { id: 'scaphoid-fc-snac', topicId: 'skaphoidfraktur', category: L('Chronische Verletzung', 'Chronic injury', 'آسیب مزمن'), front: L('Welches degenerative Muster kann bei chronischer Skaphoidpseudarthrose entstehen?', 'Which degenerative pattern can develop with chronic scaphoid nonunion?', 'در عدم جوش‌خوردن مزمن اسکافوئید چه الگوی دژنراتیوی ممکن است ایجاد شود؟'), answer: L('SNAC-Arthrose, oft radial beginnend und fortschreitend.', 'SNAC arthritis, often starting radially and progressing.', 'آرتروز SNAC که اغلب از سمت رادیال آغاز می‌شود و پیشرفت می‌کند.'), explanation: L('Eine einzelne Röntgenprojektion reicht nicht für eine vollständige Stadieneinteilung.', 'A single radiographic projection is insufficient for full staging.', 'یک نمای رادیوگرافی برای مرحله‌بندی کامل کافی نیست.') },
]

export const SCAPHOID_FLASHCARD_TOPIC = {
  id: 'skaphoidfraktur',
  title: L('Skaphoidfraktur', 'Scaphoid Fracture', 'شکستگی اسکافوئید'),
  subtitle: L('Herbert · Pseudarthrose · SNAC', 'Herbert · nonunion · SNAC', 'هربرت · عدم جوش‌خوردن · SNAC'),
  area: 'MSK', chapter: L('Traumatologie & Frakturen', 'Trauma & Fractures', 'تروما و شکستگی‌ها'),
  icon: '🦴', iconImage: '/fach/msk.png', color: '#65c9be', href: '/flashcards/skaphoidfraktur',
}
