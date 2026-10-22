const L = (de, en, fa) => ({ de, en, fa })
const seeds = [
  {
    id: 'schatzker-ii',
    question: L('Welche Morphologie entspricht Schatzker II?', 'Which morphology corresponds to Schatzker type II?', 'کدام مورفولوژی با Schatzker II تطبیق دارد؟'),
    options: [L('Lateraler Spalt ohne Impression', 'Lateral split without depression', 'شکاف خارجی بدون فرورفتگی'), L('Lateraler Spalt mit Impression', 'Lateral split with depression', 'شکاف خارجی همراه با فرورفتگی'), L('Impression ohne dominanten Spalt', 'Depression without a dominant split', 'فرورفتگی بدون شکاف غالب'), L('Bikondyläre Fraktur mit metaphysär-diaphysärer Dissoziation', 'Bicondylar fracture with metaphyseal–diaphyseal dissociation', 'شکستگی دوکندیلی همراه با جدایی متافیز از دیافیز')],
    correct: 1,
    explanation: L('Typ II kombiniert einen lateralen Spalt mit einer Impression. Typ I ist der Spalt ohne Impression; Typ III eine Impression ohne dominanten Spalt.', 'Type II combines a lateral split with depression. Type I is a split without depression; type III is depression without a dominant split.', 'نوع II شکاف خارجی را با فرورفتگی ترکیب می‌کند. نوع I شکاف بدون فرورفتگی و نوع III فرورفتگی بدون شکاف غالب است.'),
  },
  {
    id: 'segond',
    question: L('Was bedeutet ein Segond-Zeichen am lateralen Tibiaplateau?', 'What does a Segond sign at the lateral tibial plateau mean?', 'نشانهٔ سگوند در پلاتوی خارجی تیبیا چه معنایی دارد؟'),
    options: [L('Es beweist allein eine komplette ACL-Ruptur.', 'It alone proves a complete ACL tear.', 'به‌تنهایی پارگی کامل ACL را ثابت می‌کند.'), L('Es ist ein Begleitzeichen, das eine gezielte Prüfung von ACL, anterolateralem Komplex und Menisken anregen sollte.', 'It is an associated clue that should prompt focused review of the ACL, anterolateral complex and menisci.', 'نشانه‌ای همراه است که باید بررسی هدفمند ACL، کمپلکس قدامی‌ـ‌خارجی و منیسک‌ها را برانگیزد.'), L('Es entspricht einer Schatzker-III-Fraktur.', 'It corresponds to a Schatzker type III fracture.', 'با شکستگی Schatzker III یکسان است.'), L('Es schließt eine weitere ligamentäre Verletzung aus.', 'It excludes any additional ligament injury.', 'هرگونه آسیب رباطی دیگر را رد می‌کند.')],
    correct: 1,
    explanation: L('Das kleine Avulsionsfragment ist ein Hinweis auf mögliche Begleitverletzungen, aber kein alleiniger Beweis einer bestimmten Ruptur oder Schatzker-Klasse.', 'The small avulsion fragment is a clue to possible associated injuries, but does not alone prove a specific tear or Schatzker class.', 'قطعهٔ کوچک آولسیون سرنخی برای آسیب‌های همراه احتمالی است، اما به‌تنهایی پارگی مشخص یا نوع شاتزکر را ثابت نمی‌کند.'),
  },
]

export const TIBIAL_PLATEAU_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang,
  seeds.map(seed => ({
    id: `tibial-plateau-${seed.id}-${lang}`,
    question: seed.question[lang],
    options: seed.options.map((text, index) => ({ id: ['A', 'B', 'C', 'D'][index], text: text[lang] })),
    correct: ['A', 'B', 'C', 'D'][seed.correct],
    explanation: seed.explanation[lang],
    tags: ['tibiakopffraktur'],
    fach: 'msk',
  })),
]))

export const TIBIAL_PLATEAU_FLASHCARDS = [
  { id: 'tibial-plateau-schatzker', topicId: 'tibiakopffraktur', category: L('Klassifikation', 'Classification', 'طبقه‌بندی'), front: L('Wie unterscheiden sich Schatzker I, II und III?', 'How do Schatzker types I, II and III differ?', 'انواع I، II و III شاتزکر چه تفاوتی دارند؟'), answer: L('I: lateraler Spalt; II: lateraler Spalt plus Impression; III: Impression ohne dominanten Spalt.', 'I: lateral split; II: lateral split plus depression; III: depression without a dominant split.', 'I: شکاف خارجی؛ II: شکاف خارجی همراه فرورفتگی؛ III: فرورفتگی بدون شکاف غالب.'), explanation: L('Die Klassifikation beschreibt Morphologie; ein einzelner Schwellenwert wird hier nicht als universelle Regel übernommen.', 'The classification describes morphology; this lesson does not adopt a single threshold as a universal rule.', 'این طبقه‌بندی مورفولوژی را توصیف می‌کند؛ در این درس یک آستانهٔ منفرد به‌عنوان قاعدهٔ همگانی پذیرفته نمی‌شود.') },
  { id: 'tibial-plateau-segond', topicId: 'tibiakopffraktur', category: L('Avulsionszeichen', 'Avulsion sign', 'نشانهٔ آولسیون'), front: L('Wie sollte ein Segond-Zeichen die Bildprüfung beeinflussen?', 'How should a Segond sign affect image review?', 'نشانهٔ سگوند چگونه باید بر بررسی تصاویر اثر بگذارد؟'), answer: L('Als Hinweis die ACL, den anterolateralen Komplex und die Menisken gezielt prüfen; es beweist allein keine bestimmte Ruptur.', 'Prompt focused review of the ACL, anterolateral complex and menisci; it does not alone prove a specific tear.', 'بررسی هدفمند ACL، کمپلکس قدامی‌ـ‌خارجی و منیسک‌ها را برانگیزد؛ به‌تنهایی پارگی مشخصی را ثابت نمی‌کند.'), explanation: L('Begleitverletzungen sind variabel; das Zeichen nicht als alleinigen Diagnoseschluss verwenden.', 'Associated injuries vary; do not use the sign as a stand-alone diagnosis.', 'آسیب‌های همراه متغیرند؛ نشانه را به‌تنهایی مبنای تشخیص قرار ندهید.') },
]

export const TIBIAL_PLATEAU_FLASHCARD_TOPIC = {
  id: 'tibiakopffraktur', title: L('Tibiakopffraktur', 'Tibial plateau fracture', 'شکستگی پلاتوی تیبیا'),
  subtitle: L('Schatzker · Segond · Reverse Segond', 'Schatzker · Segond · reverse Segond', 'شاتزکر · سگوند · سگوند معکوس'),
  area: 'MSK', chapter: L('Knie & Unterschenkel', 'Knee & lower leg', 'زانو و ساق'), icon: '🦴', iconImage: '/fach/msk.png',
  color: '#63c7bd', href: '/flashcards/tibiakopffraktur',
}
