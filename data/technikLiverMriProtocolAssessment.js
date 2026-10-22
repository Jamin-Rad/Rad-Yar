const topicId = 'leber-mrt-protokoll'
const L = (de, en, fa) => ({ de, en, fa })

export const LIVER_MRI_PROTOCOL_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, [{
  id: `${topicId}-${lang}-phase-timing`,
  fach: 'technik',
  tags: [topicId],
  question: lang === 'de'
    ? 'Ein lokales Protokoll nennt ungefähre Zeitfenster für arterielle und portalvenöse Leberphasen. Was ist bei der Beurteilung einer konkreten Untersuchung am wichtigsten?'
    : lang === 'en'
      ? 'A local protocol lists approximate time windows for arterial and portal-venous liver phases. What matters most when assessing an individual examination?'
      : 'یک پروتکل محلی بازه‌های زمانی تقریبی برای فازهای شریانی و پورتوونوس کبد ذکر می‌کند. هنگام ارزیابی یک بررسی مشخص، مهم‌ترین نکته چیست؟',
  options: (lang === 'de'
    ? ['Die Phase allein aus der verstrichenen Zeit ableiten; Bolus und tatsächliche Akquisition sind zweitrangig.', 'Bolustiming und tatsächlich erfasste Phase prüfen; Sekundenangaben sind keine universellen Grenzwerte.', 'Jede Aufnahme nach 20 Sekunden ist unabhängig vom Bolus arteriell.', 'Jede Aufnahme nach 70 Sekunden ist unabhängig vom Patienten portalvenös.']
    : lang === 'en'
      ? ['Infer the phase from elapsed time alone; bolus timing and the actual acquisition are secondary.', 'Check bolus timing and the phase actually captured; seconds are not universal cut-offs.', 'Every acquisition after 20 seconds is arterial regardless of the bolus.', 'Every acquisition after 70 seconds is portal venous regardless of the patient.']
      : ['فاز را فقط از زمان سپری‌شده تعیین کنید؛ زمان بولوس و برداشت واقعی اهمیت کمتری دارند.', 'زمان‌بندی بولوس و فاز واقعاً ثبت‌شده را بررسی کنید؛ عدد ثانیه‌ها حدّ همگانی نیست.', 'هر تصویربرداری پس از ۲۰ ثانیه، مستقل از بولوس، شریانی است.', 'هر تصویربرداری پس از ۷۰ ثانیه، مستقل از بیمار، پورتوونوس است.'])
    .map((text, index) => ({ id: String.fromCharCode(65 + index), text })),
  correct: 'B',
  explanation: lang === 'de'
    ? 'Die PDF nennt ungefähre Zeitfenster. Die Lektion betont, dass Zeitplanung und tatsächliche Phase vom Bolus, Patienten und lokalen Protokoll abhängen; beurteilen Sie daher die real erfasste Phase.'
    : lang === 'en'
      ? 'The PDF gives approximate time windows. The lesson explains that timing and the phase actually captured depend on the bolus, patient and local protocol, so assess the real acquisition phase.'
      : 'PDF بازه‌های زمانی تقریبی می‌دهد. درس توضیح می‌دهد که زمان‌بندی و فاز واقعاً ثبت‌شده به بولوس، بیمار و پروتکل محلی وابسته است؛ بنابراین فاز واقعی تصویربرداری را ارزیابی کنید.',
  wrongExplanations: {
    A: lang === 'de'
      ? 'Eine verstrichene Zeit allein genügt nicht: Bolusankunft und tatsächlich erfasste Phase müssen berücksichtigt werden.'
      : lang === 'en'
        ? 'Elapsed time alone is insufficient: account for bolus arrival and the phase actually captured.'
        : 'زمان سپری‌شده به‌تنهایی کافی نیست؛ رسیدن بولوس و فاز واقعاً ثبت‌شده را در نظر بگیرید.',
    C: lang === 'de'
      ? 'Die genannten Sekunden sind ungefähre Beispiele, keine universelle Definition der arteriellen Phase.'
      : lang === 'en'
        ? 'The listed seconds are approximate examples, not a universal definition of the arterial phase.'
        : 'ثانیه‌های ذکرشده نمونه‌های تقریبی‌اند، نه تعریف همگانی فاز شریانی.',
    D: lang === 'de'
      ? 'Auch die portalvenöse Phase lässt sich nicht unabhängig von Bolus, Patient und Protokoll allein durch eine feste Sekundenzahl definieren.'
      : lang === 'en'
        ? 'The portal-venous phase also cannot be defined by a fixed number of seconds independent of bolus, patient and protocol.'
        : 'فاز پورتوونوس نیز مستقل از بولوس، بیمار و پروتکل با یک عدد ثابت ثانیه تعریف نمی‌شود.',
  },
  source: 'Technik.pdf p.119 (printed p.118); data/technikGrundlagenLesson.js#leber-mrt-protokoll',
}]]))

export const LIVER_MRI_PROTOCOL_TOPIC_GROUP = {
  fachId: 'technik',
  kapitelId: 'technik-mrt',
  title: L('MRT-Protokolle', 'MRI protocols', 'پروتکل‌های MRI'),
  topics: [{ id: topicId, title: L('Leber-MRT', 'Liver MRI', 'MRI کبد') }],
}
