const L = (de, en, fa) => ({ de, en, fa })

const options = [
  L('T1 hypointens, T2 hyperintens; ödematös-fibrovaskuläre Veränderung', 'T1 hypointense, T2 hyperintense; oedematous-fibrovascular change', 'در T1 کم‌سیگنال و در T2 پرسیگنال؛ تغییر ادماتو-فیبروواسکولار'),
  L('T1 hyperintens, T2 meist iso- bis leicht hyperintens; fettige Markumwandlung', 'T1 hyperintense, T2 usually iso- to mildly hyperintense; fatty marrow change', 'در T1 پرسیگنال و در T2 معمولاً هم‌سیگنال تا کمی پرسیگنال؛ تغییر چرب مغز استخوان'),
  L('T1 und T2 hypointens; sklerotische Veränderung', 'T1 and T2 hypointense; sclerotic change', 'در T1 و T2 کم‌سیگنال؛ تغییر اسکلروتیک'),
  L('Nur eine DWI-Signalsteigerung ohne T1-/T2-Korrelat', 'DWI signal increase alone without a T1/T2 correlate', 'فقط افزایش سیگنال در DWI بدون همبستگی در T1 و T2'),
]

export const SPINE_MODIC_QUESTIONS = ['de', 'en', 'fa'].map(lang => ({
  id: `osteochondrosis-intervertebralis-${lang}-modic-ii-signal`,
  fach: 'wirbelsaeule',
  tags: ['osteochondrosis-intervertebralis'],
  question: L('Welche Signalzuordnung beschreibt Modic-Typ II im PDF?', 'Which signal pattern describes Modic type II in the supplied PDF?', 'کدام الگوی سیگنال، مودیک نوع II را در PDF توصیف می‌کند؟')[lang],
  options: options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
  correct: 'B',
  explanation: L('Modic II zeigt eine fettige Markumwandlung mit hohem T1-Signal und meist iso- bis leicht erhöhtem T2-Signal. Die Zuordnung beschreibt ein MRT-Muster und ist für sich kein Symptom- oder Schweregradmaß.', 'Modic II reflects fatty marrow change, with high T1 signal and usually iso- to mildly increased T2 signal. This describes an MRI pattern; it is not by itself a symptom or severity score.', 'مودیک نوع II با تغییر چرب مغز استخوان، سیگنال بالای T1 و معمولاً سیگنال هم‌سطح تا کمی بالاتر در T2 همراه است. این یک الگوی MRI است و به‌تنهایی شاخص علائم یا شدت نیست.')[lang],
  wrongExplanations: {
    A: L('Das beschreibt Modic I: T1 niedrig und T2 hoch.', 'That describes Modic I: low T1 and high T2 signal.', 'این الگوی مودیک نوع I است: سیگنال پایین T1 و بالای T2.' )[lang],
    C: L('Das beschreibt Modic III: niedriges Signal in T1 und T2.', 'That describes Modic III: low signal on both T1 and T2.', 'این الگوی مودیک نوع III است: سیگنال پایین در T1 و T2.' )[lang],
    D: L('Die PDF ordnet die Typen anhand der T1-/T2-Signale ein; DWI allein definiert Modic II nicht.', 'The PDF distinguishes the types by T1/T2 signal; DWI alone does not define Modic II.', 'PDF انواع را با سیگنال T1 و T2 تفکیک می‌کند؛ DWI به‌تنهایی مودیک نوع II را تعریف نمی‌کند.' )[lang],
  },
  source: 'Wirbelsäule.pdf, PDF p. 5 (printed p. 4); Modic et al. Radiology. 1988;166:193–199. doi:10.1148/radiology.166.1.3336678.',
}))

export const SPINE_MODIC_TOPIC_GROUP = {
  fachId: 'wirbelsaeule',
  kapitelId: 'ws-degenerativ',
  title: L('Degenerative Erkrankungen', 'Degenerative diseases', 'بیماری‌های دژنراتیو'),
  topics: [
    { id: 'spinalkanalstenose', title: L('Spinalkanalstenose', 'Spinal canal stenosis', 'تنگی کانال نخاعی') },
    { id: 'osteochondrosis-intervertebralis', title: L('Modic-Veränderungen', 'Modic changes', 'تغییرات مودیک') },
    { id: 'spondylarthrose', title: L('Spondylarthrose', 'Facet arthropathy', 'آرتروز فاست') },
    { id: 'synovialzyste-facettengelenke', title: L('Juxtafacettäre Synovialzyste', 'Juxtafacet synovial cyst', 'کیست سینوویال کنار فاست') },
    { id: 'bandscheibenpathologien', title: L('Bandscheibenpathologien', 'Intervertebral disc pathologies', 'بیماری‌های دیسک بین‌مهره‌ای') },
  ],
}

export const SPINE_MODIC_FLASHCARD_TOPIC = {
  id: 'osteochondrosis-intervertebralis',
  area: 'Wirbelsäule',
  chapter: 'Degenerative Erkrankungen',
  icon: 'MRI',
  color: '#0e7490',
  href: '/flashcards/osteochondrosis-intervertebralis',
  title: L('Modic-Veränderungen', 'Modic changes', 'تغییرات مودیک'),
  subtitle: L('Endplattensignal · Typen I–III', 'Endplate signal · types I–III', 'سیگنال صفحه انتهایی · انواع I تا III'),
}

export const SPINE_MODIC_FLASHCARDS = [{
  id: 'osteochondrosis-intervertebralis-modic-types',
  topicId: 'osteochondrosis-intervertebralis',
  category: L('MRT-Signal', 'MRI signal', 'سیگنال MRI'),
  front: L('Wie unterscheiden sich die T1-/T2-Signale der Modic-Typen I–III?', 'How do T1/T2 signals differ across Modic types I–III?', 'سیگنال T1 و T2 در انواع I تا III مودیک چه تفاوتی دارد؟'),
  answer: L('I: T1 niedrig, T2 hoch. II: T1 hoch, T2 iso bis leicht hoch. III: T1 und T2 niedrig.', 'I: low T1, high T2. II: high T1, iso- to mildly high T2. III: low T1 and T2.', 'I: ‏T1 پایین و T2 بالا. II: ‏T1 بالا و T2 هم‌سطح تا کمی بالا. III: ‏T1 و T2 پایین.'),
  explanation: L('Die Signalzuordnung beschreibt das Endplatten-/Markmuster. Sie beweist für sich weder eine individuelle Schmerzursache noch den klinischen Schweregrad.', 'The signal pattern describes endplate/marrow appearance. By itself, it proves neither an individual pain cause nor clinical severity.', 'این الگو، ظاهر صفحهٔ انتهایی و مغز استخوان را توصیف می‌کند؛ به‌تنهایی علت درد فرد یا شدت بالینی را ثابت نمی‌کند.'),
  source: 'Wirbelsäule.pdf, PDF p. 5 (printed p. 4); Modic et al. Radiology. 1988;166:193–199.',
}]
