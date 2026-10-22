const topicId = 'osteochondrosis-dissecans'
const L = (de, en, fa) => ({ de, en, fa })

export const OSTEOCHONDROSIS_DISSECANS_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, [{
  id: `${topicId}-${lang}-ossification-variant`,
  fach: 'msk',
  topicId,
  tags: [topicId],
  question: lang === 'de'
    ? 'Bei einem Kind zeigt sich am posterioren Femurkondylus beidseits symmetrisch ein Ossifikationsmuster ohne Knochenmarködem. Welche Einordnung passt am ehesten zur Quelle?'
    : lang === 'en'
      ? 'A child has a symmetric ossification pattern at the posterior femoral condyles without marrow oedema. Which interpretation best matches the source?'
      : 'در کودک، الگوی استخوان‌سازی متقارن در بخش خلفی هر دو کندیل فمور، بدون ادم مغز استخوان دیده می‌شود. کدام تفسیر با منبع سازگارتر است؟',
  options: (lang === 'de'
    ? ['Eine normale Ossifikationsvariante ist wahrscheinlicher; Symmetrie und fehlendes Ödem sprechen in diesem Quellenmuster dafür.', 'Eine dislozierte OCD im Stadium IV, auch ohne leeres Mausbett oder freien Gelenkkörper.', 'SONK/Ahlbäck, typisch bei Kindern mit symmetrischem Befall beider posteriorer Kondylen.', 'Eine instabile juvenile OCD ist allein durch die Lokalisation bewiesen.']
    : lang === 'en'
      ? ['A normal ossification variant is more likely; symmetry and absent oedema support that source-described pattern.', 'Displaced stage-IV OCD, even without an empty defect bed or loose body.', 'SONK/Ahlbäck disease, typical in children with symmetric involvement of both posterior condyles.', 'Unstable juvenile OCD is proven by location alone.']
      : ['واریانت طبیعی استخوان‌سازی محتمل‌تر است؛ تقارن و نبود ادم با الگوی توصیف‌شده در منبع سازگارند.', 'OCD جابه‌جاشدهٔ مرحلهٔ IV، حتی بدون بستر خالی یا جسم آزاد مفصلی.', 'SONK/آلبک، که در کودکان با درگیری متقارن هر دو کندیل خلفی تیپیک است.', 'ناپایداری OCD نوجوانان فقط با محل ضایعه ثابت می‌شود.'])
    .map((text, index) => ({ id: String.fromCharCode(65 + index), text })),
  correct: 'A',
  explanation: lang === 'de'
    ? 'Die PDF nennt als normale Ossifikationsvariante besonders den posterioren Femurkondylus bei Kindern; meist ist sie symmetrisch und ohne Ödem. Das Muster ist im klinischen und bildgebenden Kontext zu beurteilen.'
    : lang === 'en'
      ? 'The PDF lists the posterior femoral condyle in children as a site for a normal ossification variant; it is usually symmetric and lacks oedema. Interpret the pattern in clinical and imaging context.'
      : 'PDF بخش خلفی کندیل فمور در کودکان را به‌ویژه محل واریانت طبیعی استخوان‌سازی می‌داند؛ این الگو معمولاً متقارن و بدون ادم است. آن را در زمینهٔ بالینی و تصویربرداری تفسیر کنید.',
  wrongExplanations: {
    B: lang === 'de'
      ? 'Stadium IV setzt eine Dislokation mit leerem Mausbett und freiem Gelenkkörper voraus; beides ist hier nicht beschrieben.'
      : lang === 'en'
        ? 'Stage IV requires displacement with an empty defect bed and a loose body; neither is described here.'
        : 'مرحلهٔ IV به جابه‌جایی همراه بستر خالی و جسم آزاد نیاز دارد؛ هیچ‌کدام در اینجا توصیف نشده‌اند.',
    C: lang === 'de'
      ? 'Die PDF beschreibt SONK/Ahlbäck eher bei älteren Betroffenen, meist am medialen Femurkondylus und oft mit Meniskusläsionen.'
      : lang === 'en'
        ? 'The PDF describes SONK/Ahlbäck more often in older patients, usually at the medial femoral condyle and often with meniscal lesions.'
        : 'PDF، SONK/آلبک را بیشتر در سنین بالاتر، معمولاً در کندیل داخلی فمور و اغلب همراه ضایعهٔ منیسک توصیف می‌کند.',
    D: lang === 'de'
      ? 'Die Quelle sagt ausdrücklich, dass die posteriore Lage bei Kindern auch einer normalen Ossifikationsvariante entsprechen kann; ein Ödem fehlt hier.'
      : lang === 'en'
        ? 'The source notes that this posterior location in children can represent a normal ossification variant; oedema is absent here.'
        : 'منبع تصریح می‌کند که این محل خلفی در کودکان می‌تواند واریانت طبیعی استخوان‌سازی باشد؛ در اینجا ادم وجود ندارد.',
  },
  source: 'MSK.pdf p.129 (printed p.128); osteochondrosisDissecansLesson#arthrography-dd',
}]]))

export const OSTEOCHONDROSIS_DISSECANS_TOPIC_GROUP = {
  fachId: 'msk',
  kapitelId: 'msk-osteochondrosen',
  title: L('Osteochondrosen', 'Osteochondroses', 'استئوکندروزها'),
  topics: [{ id: topicId, title: L('Osteochondrosis dissecans', 'Osteochondritis dissecans', 'استئوکندروز دیسکانس') }],
}

export const OSTEOCHONDROSIS_DISSECANS_FLASHCARD_TOPIC = {
  id: topicId,
  area: 'MSK',
  chapter: 'Osteochondrosen',
  icon: 'MSK',
  color: '#67bdb1',
  href: `/flashcards/${topicId}`,
  title: L('Osteochondrosis dissecans', 'Osteochondritis dissecans', 'استئوکندروز دیسکانس'),
  subtitle: L('Prädilektionsstellen', 'Common sites', 'محل‌های شایع'),
}

export const OSTEOCHONDROSIS_DISSECANS_FLASHCARDS = [{
  id: `${topicId}-predilection-sites`,
  topicId,
  category: L('Klinische Grundlagen', 'Clinical fundamentals', 'مبانی بالینی'),
  front: L('Welche Prädilektionsstellen nennt die Quelle für OCD?', 'Which common sites for OCD does the source list?', 'منبع چه محل‌های مستعدی را برای OCD ذکر می‌کند؟'),
  answer: L('Knie: medialer Femurkondylus; oberes Sprunggelenk: mediale Talusschulter; Ellenbogen: Capitulum humeri.', 'Knee: medial femoral condyle; ankle: medial talar dome; elbow: capitellum.', 'زانو: کندیل داخلی فمور؛ مچ پا: شانهٔ داخلی تالوس؛ آرنج: کاپیتلوم هومری.'),
  explanation: L('Das sind die drei in MSK.pdf p.128 aufgeführten Prädilektionsstellen; sie sind keine Aussage über die Häufigkeit eines individuellen Befunds.', 'These are the three predilection sites listed in MSK.pdf p.128; they do not establish the diagnosis in an individual case.', 'این‌ها سه محل مستعد ذکرشده در صفحهٔ ۱۲۸ MSK.pdf هستند؛ به‌تنهایی تشخیص یک مورد مشخص را ثابت نمی‌کنند.'),
  source: 'MSK.pdf p.128 (printed p.127)',
}]
