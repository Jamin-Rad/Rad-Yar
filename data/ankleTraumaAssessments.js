const L = (de, en, fa) => ({ de, en, fa })

const seeds = [
  {
    id: 'maisonneuve-chain',
    question: L(
      'Welche Verletzungskette passt zur Maisonneuve-Verletzung?',
      'Which injury chain fits a Maisonneuve injury?',
      'کدام زنجیرهٔ آسیب با آسیب Maisonneuve مطابقت دارد؟'
    ),
    options: [
      L('Syndesmosenruptur, kraniale Membrana-interossea-Ruptur und hohe proximale Fibulafraktur', 'Syndesmotic rupture, proximal extension through the interosseous membrane, and a high proximal fibular fracture', 'پارگی سندسموز، گسترش پارگی به سمت بالا در غشای بین‌استخوانی و شکستگی بالای فیبولا'),
      L('Isolierte distale Fibulafraktur unterhalb der Syndesmose', 'An isolated distal fibular fracture below the syndesmosis', 'شکستگی منفرد بخش دیستال فیبولا در زیر سندسموز'),
      L('Axiale Impression des Talus in den tibialen Plafond', 'Axial impaction of the talus into the tibial plafond', 'فرورفتگی محوری تالوس در سطح مفصلی دیستال تیبیا'),
      L('Vordere und hintere Tibiakante ohne Fibulabeteiligung', 'Anterior and posterior tibial margins without fibular involvement', 'درگیری لبه‌های قدامی و خلفی تیبیا بدون درگیری فیبولا'),
    ],
    correct: 0,
    explanation: L(
      'Die Maisonneuve-Verletzung verbindet die Syndesmose mit einer nach proximal reichenden Verletzung der Membrana interossea und einer hohen proximalen Fibulafraktur. Zusätzlich kann die mediale Seite verletzt sein.',
      'A Maisonneuve injury links the syndesmosis to proximal extension through the interosseous membrane and a high proximal fibular fracture. The medial side may also be injured.',
      'آسیب Maisonneuve سندسموز را با گسترش آسیب به سمت بالای غشای بین‌استخوانی و شکستگی بالای فیبولا مرتبط می‌کند. سمت داخلی مچ پا نیز ممکن است آسیب دیده باشد.'
    ),
  },
  {
    id: 'chaput-volkmann',
    question: L(
      'Wie unterscheiden sich Chaput- und Volkmann-Ausriss morphologisch?',
      'How do Chaput and Volkmann avulsions differ morphologically?',
      'آولسیون Chaput و Volkmann از نظر مورفولوژی چه تفاوتی دارند؟'
    ),
    options: [
      L('Chaput liegt anterior, Volkmann posterior am jeweiligen Syndesmosenansatz.', 'Chaput is anterior and Volkmann posterior at their respective syndesmotic attachments.', 'Chaput در محل اتصال قدامی و Volkmann در محل اتصال خلفی سندسموز قرار دارد.'),
      L('Chaput liegt posterior, Volkmann anterior am jeweiligen Syndesmosenansatz.', 'Chaput is posterior and Volkmann anterior at their respective syndesmotic attachments.', 'Chaput در محل اتصال خلفی و Volkmann در محل اتصال قدامی سندسموز قرار دارد.'),
      L('Beide bezeichnen Ausrisse an der proximalen Fibula.', 'Both refer to avulsions at the proximal fibula.', 'هر دو به آولسیون‌های فیبولای پروگزیمال اشاره دارند.'),
      L('Chaput ist eine axiale Plafond-Impression; Volkmann eine Rotationsfraktur.', 'Chaput is an axial plafond depression; Volkmann is a rotational fracture.', 'Chaput فرورفتگی محوری Plafond و Volkmann شکستگی چرخشی است.'),
    ],
    correct: 0,
    explanation: L(
      'Die Unterscheidung folgt der anterioren versus posterioren Lage des distalen tibialen Tuberculum-Ausrisses am Syndesmosenansatz.',
      'The distinction follows the anterior versus posterior location of the distal tibial tubercle avulsion at the syndesmotic attachment.',
      'تمایز این دو بر اساس قدامی یا خلفی بودن آولسیون تکمهٔ دیستال تیبیا در محل اتصال سندسموز است.'
    ),
  },
]

export const ANKLE_TRAUMA_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang,
  seeds.map(seed => ({
    id: `ankle-trauma-${seed.id}-${lang}`,
    question: seed.question[lang],
    options: seed.options.map((option, index) => ({ id: ['A', 'B', 'C', 'D'][index], text: option[lang] })),
    correct: ['A', 'B', 'C', 'D'][seed.correct],
    explanation: seed.explanation[lang],
    tags: ['osg-fraktur'],
    fach: 'msk',
  })),
]))

export const ANKLE_TRAUMA_FLASHCARDS = [
  {
    id: 'ankle-trauma-maisonneuve-chain', topicId: 'osg-fraktur',
    category: L('Verletzungskette', 'Injury pattern', 'زنجیرهٔ آسیب'),
    front: L('Welche Strukturen gehören zur Maisonneuve-Verletzungskette?', 'Which structures form the Maisonneuve injury chain?', 'کدام ساختارها در زنجیرهٔ آسیب Maisonneuve قرار دارند؟'),
    answer: L('Syndesmose → Membrana interossea nach proximal → hohe proximale Fibulafraktur; eine mediale Verletzung kann hinzukommen.', 'Syndesmosis → proximal extension through the interosseous membrane → high proximal fibular fracture; a medial injury may coexist.', 'ابتدا سندسموز، سپس گسترش آسیب به سمت بالای غشای بین‌استخوانی، و در ادامه شکستگی بالای فیبولای پروگزیمال؛ آسیب داخلی نیز ممکن است همراه باشد.'),
    explanation: L('Bei Syndesmosenverdacht daher die Verletzungskette bis zur proximalen Fibula mitbedenken.', 'When syndesmotic injury is suspected, consider the injury chain up to the proximal fibula.', 'در صورت شک به آسیب سندسموز، زنجیرهٔ آسیب تا فیبولای پروگزیمال را هم بررسی کنید.'),
  },
  {
    id: 'ankle-trauma-chaput-volkmann', topicId: 'osg-fraktur',
    category: L('Morphologie', 'Morphology', 'مورفولوژی'),
    front: L('Chaput versus Volkmann: Wo liegt der Ausriss?', 'Chaput versus Volkmann: where is the avulsion?', 'Chaput در برابر Volkmann: محل آولسیون کجاست؟'),
    answer: L('Chaput: anteriorer distaler tibialer Tuberculum-Ausriss; Volkmann: posteriorer Ausriss.', 'Chaput: anterior distal tibial tubercle avulsion; Volkmann: posterior avulsion.', 'Chaput: آولسیون تکمهٔ قدامی دیستال تیبیا؛ Volkmann: آولسیون خلفی.'),
    explanation: L('Die Zuordnung orientiert sich an der anterioren beziehungsweise posterioren Syndesmosenverankerung.', 'The distinction follows the anterior versus posterior syndesmotic attachment.', 'این تمایز بر اساس اتصال قدامی یا خلفی سندسموز است.'),
  },
]

export const ANKLE_TRAUMA_FLASHCARD_TOPIC = {
  id: 'osg-fraktur',
  title: L('Sprunggelenktrauma', 'Ankle trauma', 'ترومای مچ پا'),
  subtitle: L('Weber · Stabilität · Frakturmuster', 'Weber · stability · fracture patterns', 'Weber · پایداری · الگوهای شکستگی'),
  area: 'MSK', chapter: L('Sprunggelenk & Fuß', 'Ankle & foot', 'مچ پا و پا'), icon: '🦴', iconImage: '/fach/msk.png',
  color: '#63c7bd', href: '/flashcards/osg-fraktur',
}
