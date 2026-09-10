const L = (de, en, fa) => ({ de, en, fa })
const none = L('Keine routinemäßige CT-Kontrolle', 'No routine CT follow-up', 'بدون پیگیری روتین CT')
const months3 = L('CT nach 3–6 Monaten', 'CT at 3–6 months', 'CT در ۳–۶ ماه')
const months6 = L('CT nach 6–12 Monaten', 'CT at 6–12 months', 'CT در ۶–۱۲ ماه')
const annual = L('Jährliche CT-Kontrolle', 'Annual CT follow-up', 'پیگیری سالانه با CT')

const ITEMS = [
  {
    id: 'screening', category: L('Anwendbarkeit', 'Eligibility', 'قابلیت کاربرد'),
    question: L('Ein 60-jähriger Patient hat einen 6-mm-Rundherd im Lungenkrebs-Screening. Welches Regelwerk ist maßgeblich?', 'A 60-year-old has a 6 mm nodule on lung cancer screening. Which framework applies?', 'در غربالگری سرطان ریه فردی ۶۰ ساله یک ندول ۶ میلی‌متری دیده شده است. کدام چارچوب کاربرد دارد؟'),
    options: [L('Immer Fleischner 2017', 'Always Fleischner 2017', 'همیشه Fleischner ۲۰۱۷'), L('Das jeweilige Screening-Protokoll, beispielsweise Lung-RADS', 'The applicable screening protocol, such as Lung-RADS', 'پروتکل غربالگری مربوط، مانند Lung-RADS'), L('Keine Leitlinie ab 60 Jahren', 'No guideline after age 60', 'هیچ راهنمایی پس از ۶۰ سالگی'), L('Nur der Durchmesser entscheidet über das Regelwerk', 'Diameter alone determines the framework', 'فقط قطر تعیین‌کننده چارچوب است')], correct: 'B',
    explanation: L('Fleischner gilt für inzidentell entdeckte Rundherde außerhalb des Screenings. Der Anwendungskontext wird vor Größe und Risikogruppe geprüft.', 'Fleischner covers incidental nodules outside screening. Establish the clinical context before applying size and risk categories.', 'Fleischner برای ندول‌های اتفاقی خارج از غربالگری است. پیش از گروه اندازه و خطر، زمینه بالینی را مشخص کنید.'),
  },
  {
    id: 'measurement', category: L('Messung', 'Measurement', 'اندازه‌گیری'),
    question: L('Ein kleiner Rundherd misst in derselben Ebene 8 × 6 mm. Welche mittlere Leitliniengröße ergibt sich?', 'A small nodule measures 8 × 6 mm in the same plane. What is its mean guideline diameter?', 'ندولی کوچک در یک صفحه ۸ × ۶ میلی‌متر است. قطر میانگین برای راهنما چقدر است؟'),
    options: [L('6 mm', '6 mm', '۶ میلی‌متر'), L('8 mm', '8 mm', '۸ میلی‌متر'), L('14 mm', '14 mm', '۱۴ میلی‌متر'), L('7 mm', '7 mm', '۷ میلی‌متر')], correct: 'D',
    explanation: L('Lange und senkrechte kurze Achse mitteln: (8 + 6) / 2 = 7 mm. Dünne Schichten und die Ebene mit größter Ausdehnung verwenden; auf ganze Millimeter runden.', 'Average the long and perpendicular short axes: (8 + 6) / 2 = 7 mm. Use thin sections and the plane showing the largest dimensions; round to whole millimeters.', 'میانگین محور بلند و کوتاه عمود بر آن: (۸ + ۶) / ۲ = ۷ میلی‌متر. از برش نازک و صفحه با بیشترین ابعاد استفاده و به میلی‌متر کامل گرد کنید.'),
  },
  {
    id: 'solid-small', category: L('Solide Herde', 'Solid nodules', 'ندول جامد'),
    question: L('Inzidenteller solider Einzelherd, 5 mm, niedriges Risiko, 52 Jahre, keine Ausschlusskriterien: Welche Routinekontrolle ist vorgesehen?', 'Incidental single solid 5 mm nodule, low risk, age 52, no exclusions: what routine follow-up is indicated?', 'ندول اتفاقی جامد منفرد ۵ میلی‌متری، خطر پایین، سن ۵۲ سال، بدون معیار خروج: کدام پیگیری روتین لازم است؟'),
    options: [none, months3, annual, L('Sofortige Biopsie', 'Immediate biopsy', 'بیوپسی فوری')], correct: 'A',
    explanation: L('Ein solider Einzelherd <6 mm bei niedrigem Risiko benötigt keine routinemäßige Kontrolle. Die optionale 12-Monats-Kontrolle betrifft die höhere Risikokonstellation.', 'A single solid nodule <6 mm at low risk requires no routine surveillance. Optional CT at 12 months pertains to the higher-risk setting.', 'ندول جامد منفرد <۶ میلی‌متر در خطر پایین نیاز به پیگیری روتین ندارد. CT اختیاری در ۱۲ ماه مربوط به وضعیت پرخطرتر است.'),
  },
  {
    id: 'solid-single', category: L('Solide Herde', 'Solid nodules', 'ندول جامد'),
    question: L('Solider Einzelherd von 7 mm bei hohem Risiko; Fleischner ist anwendbar. Wann sind CT-Kontrollen vorgesehen?', 'Single solid 7 mm nodule at high risk; Fleischner applies. When should CT follow-up occur?', 'ندول جامد منفرد ۷ میلی‌متری در خطر بالا؛ Fleischner کاربرد دارد. زمان CT پیگیری چیست؟'),
    options: [none, L('Nur nach 5 Jahren', 'Only at 5 years', 'فقط در ۵ سال'), L('Nach 6–12 und 18–24 Monaten', 'At 6–12 and 18–24 months', 'در ۶–۱۲ و ۱۸–۲۴ ماه'), L('Nur nach 3 Monaten', 'Only at 3 months', 'فقط در ۳ ماه')], correct: 'C',
    explanation: L('Für solitäre solide 6–8-mm-Herde bei hohem Risiko sind beide Zeitfenster vorgesehen. Bei niedrigem Risiko ist die zweite Kontrolle nach 18–24 Monaten eine Erwägung.', 'For single solid 6–8 mm nodules at high risk, both intervals apply. At low risk, the second CT at 18–24 months is optional.', 'در ندول جامد منفرد ۶–۸ میلی‌متری پرخطر هر دو بازه مطرح است. در خطر پایین، CT دوم در ۱۸–۲۴ ماه اختیاری است.'),
  },
  {
    id: 'solid-multiple', category: L('Multiple Herde', 'Multiple nodules', 'ندول‌های متعدد'),
    question: L('Mehrere solide Herde bis 7 mm bei hohem Risiko, keiner besonders suspekt. Fleischner ist anwendbar. Welche CT-Intervalle passen?', 'Multiple solid nodules up to 7 mm at high risk, none particularly suspicious. Fleischner applies. Which CT intervals fit?', 'ندول‌های جامد متعدد تا ۷ میلی‌متر با خطر بالا و بدون ندول به‌طور خاص مشکوک؛ Fleischner کاربرد دارد. بازه CT چیست؟'),
    options: [L('Nach 6–12 Monaten, dann alle 2 Jahre', 'At 6–12 months, then every 2 years', 'در ۶–۱۲ ماه و سپس هر ۲ سال'), L('Nach 3–6 und 18–24 Monaten', 'At 3–6 and 18–24 months', 'در ۳–۶ و ۱۸–۲۴ ماه'), none, L('Erst nach 4 Jahren', 'First at 4 years', 'اولین بار در ۴ سال')], correct: 'B',
    explanation: L('Multiple solide Herde ≥6 mm werden zunächst nach 3–6 Monaten kontrolliert. Bei hohem Risiko folgt eine Kontrolle nach 18–24 Monaten. Ein besonders suspekter Herd kann eine gezielte Abklärung erfordern.', 'Multiple solid nodules ≥6 mm receive initial CT at 3–6 months, with CT at 18–24 months at high risk. A particularly suspicious nodule may require targeted work-up.', 'ندول‌های جامد متعدد ≥۶ میلی‌متر ابتدا در ۳–۶ ماه و در خطر بالا مجدداً در ۱۸–۲۴ ماه کنترل می‌شوند. ندول بسیار مشکوک ممکن است بررسی هدفمند بخواهد.'),
  },
  {
    id: 'ggo', category: L('Milchglas', 'Ground glass', 'شیشه‌مات'),
    question: L('Inzidenteller reiner Milchglas-Einzelherd von 9 mm bei einer 61-jährigen Person ohne Ausschlusskriterien: Wie beginnt die Überwachung?', 'Incidental single pure ground-glass 9 mm nodule in a 61-year-old without exclusions: how does surveillance begin?', 'ندول اتفاقی منفرد شیشه‌مات خالص ۹ میلی‌متری در فرد ۶۱ ساله بدون معیار خروج: پیگیری چگونه آغاز می‌شود؟'),
    options: [none, L('Immer sofortige Resektion', 'Always immediate resection', 'همیشه رزکسیون فوری'), L('Erste CT nach 4 Jahren', 'First CT at 4 years', 'اولین CT در ۴ سال'), months6], correct: 'D',
    explanation: L('Bei reinem Milchglas ≥6 mm: CT nach 6–12 Monaten, bei Persistenz anschließend alle 2 Jahre bis 5 Jahre. Zweijährige Stabilität allein beendet diese Überwachung nicht.', 'For pure ground glass ≥6 mm: CT at 6–12 months, then every 2 years until 5 years if persistent. Two-year stability alone does not end surveillance.', 'در شیشه‌مات خالص ≥۶ میلی‌متر: CT در ۶–۱۲ ماه و در صورت ماندگاری هر ۲ سال تا ۵ سال. ثبات دوساله به‌تنهایی پایان پیگیری نیست.'),
  },
  {
    id: 'part-solid', category: L('Teilsolide Herde', 'Part-solid nodules', 'ندول بخشی جامد'),
    question: L('Teilsolider Einzelherd 10 mm, solider Anteil 4 mm. Fleischner ist anwendbar. Wann wird zunächst die Persistenz geprüft?', 'Single part-solid 10 mm nodule with a 4 mm solid component. Fleischner applies. When is persistence initially assessed?', 'ندول منفرد بخشی جامد ۱۰ میلی‌متری با جزء جامد ۴ میلی‌متری؛ Fleischner کاربرد دارد. ماندگاری ابتدا چه زمانی بررسی می‌شود؟'),
    options: [months3, none, L('Erst nach 2 Jahren', 'First at 2 years', 'اولین بار در ۲ سال'), L('Erst nach 5 Jahren', 'First at 5 years', 'اولین بار در ۵ سال')], correct: 'A',
    explanation: L('CT nach 3–6 Monaten prüft Persistenz. Bleibt der Herd bestehen und der solide Anteil <6 mm, folgen jährliche CT-Kontrollen für 5 Jahre.', 'CT at 3–6 months assesses persistence. If persistent with a solid component <6 mm, annual CT follow-up for 5 years follows.', 'CT در ۳–۶ ماه ماندگاری را بررسی می‌کند. در صورت ماندگاری با جزء جامد <۶ میلی‌متر، CT سالانه به مدت ۵ سال انجام می‌شود.'),
  },
  {
    id: 'solid-component', category: L('Solide Komponente', 'Solid component', 'جزء جامد'),
    question: L('Ein persistierender teilsolider Herd hat einen soliden Anteil von 7 mm. Was ist die entscheidende Einordnung?', 'A persistent part-solid nodule has a 7 mm solid component. What is the key interpretation?', 'ندول بخشی جامد ماندگار دارای جزء جامد ۷ میلی‌متری است. تفسیر اصلی چیست؟'),
    options: [L('Sicher benigne', 'Definitely benign', 'قطعاً خوش‌خیم'), L('Routinekontrolle erst nach 5 Jahren', 'Routine follow-up only at 5 years', 'پیگیری روتین فقط در ۵ سال'), L('Hochgradig suspekt; weitere Abklärung individuell planen', 'Highly suspicious; individualize further work-up', 'بسیار مشکوک؛ بررسی تکمیلی فردی'), L('Die solide Komponente ist irrelevant', 'The solid component is irrelevant', 'جزء جامد اهمیتی ندارد')], correct: 'C',
    explanation: L('Ein persistierender solider Anteil ≥6 mm ist hochgradig suspekt. Die jährliche Standardüberwachung für einen soliden Anteil <6 mm darf nicht unverändert übernommen werden.', 'A persistent solid component ≥6 mm is highly suspicious. Do not simply apply the annual routine pathway intended for a solid component <6 mm.', 'جزء جامد ماندگار ≥۶ میلی‌متر بسیار مشکوک است. مسیر روتین سالانه مخصوص جزء جامد <۶ را نباید بدون تغییر به کار برد.'),
  },
  {
    id: 'multiple-subsolid', category: L('Multiple Herde', 'Multiple nodules', 'ندول‌های متعدد'),
    question: L('Mehrere inzidentelle subsolide Herde, alle <6 mm, bei anwendbarer Leitlinie: Wann erfolgt die erste CT-Kontrolle?', 'Multiple incidental subsolid nodules, all <6 mm, with the guideline applicable: when is the first CT follow-up?', 'ندول‌های اتفاقی نیمه‌جامد متعدد، همگی <۶ میلی‌متر، با کاربرد راهنما: اولین CT پیگیری چه زمانی است؟'),
    options: [none, months3, L('Erst nach 4 Jahren', 'First at 4 years', 'اولین بار در ۴ سال'), L('Erst nach 5 Jahren', 'First at 5 years', 'اولین بار در ۵ سال')], correct: 'B',
    explanation: L('Bei multiplen subsoliden Herden <6 mm: CT nach 3–6 Monaten; bei Stabilität Kontrollen nach 2 und 4 Jahren erwägen. Die Einzelherd-Regel „keine Routinekontrolle“ ist hier nicht übertragbar.', 'For multiple subsolid nodules <6 mm: CT at 3–6 months; if stable, consider CT at 2 and 4 years. The single-nodule rule of no routine follow-up does not transfer to this setting.', 'در ندول‌های نیمه‌جامد متعدد <۶: CT در ۳–۶ ماه؛ در صورت ثبات CT در ۲ و ۴ سال قابل‌بررسی است. قاعده عدم پیگیری روتین ندول منفرد اینجا کاربرد ندارد.'),
  },
  {
    id: 'eight-mm', category: L('Größengrenzen', 'Size thresholds', 'آستانه اندازه'),
    question: L('Ein solider Einzelherd hat einen gerundeten mittleren Durchmesser von genau 8 mm. In welche Größenkategorie fällt er?', 'A single solid nodule has a rounded mean diameter of exactly 8 mm. Which size category applies?', 'قطر میانگین گرد‌شده ندول جامد منفرد دقیقاً ۸ میلی‌متر است. در کدام گروه قرار می‌گیرد؟'),
    options: [L('6–8 mm', '6–8 mm', '۶–۸ میلی‌متر'), L('>8 mm', '>8 mm', 'بیش از ۸ میلی‌متر'), L('<6 mm', '<6 mm', 'کمتر از ۶ میلی‌متر'), L('Keine Kategorie', 'No category', 'هیچ گروهی')], correct: 'A',
    explanation: L('Die Kategorie 6–8 mm schließt genau 8 mm ein. Erst ein Wert >8 mm gehört zur darüberliegenden Kategorie. Anzahl, Morphologie und Risiko bleiben zusätzlich relevant.', 'The 6–8 mm category includes exactly 8 mm. Only a value >8 mm enters the larger category. Number, morphology and risk remain relevant.', 'گروه ۶–۸ شامل دقیقاً ۸ میلی‌متر است. فقط مقدار >۸ در گروه بالاتر قرار می‌گیرد. تعداد، مورفولوژی و خطر همچنان مهم‌اند.'),
  },
]

export const FLEISCHNER_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, ITEMS.map(item => ({
  id: `fleischner-kriterien-${lang}-${item.id}`, fach: 'thorax', tags: ['fleischner-kriterien', 'thorax'],
  question: item.question[lang], options: item.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
  correct: item.correct, explanation: item.explanation[lang],
}))]))

export const FLEISCHNER_FLASHCARDS = ITEMS.map(item => ({
  id: `fleischner-kriterien-${item.id}`, topicId: 'fleischner-kriterien', category: item.category,
  front: item.question, answer: item.options[item.correct.charCodeAt(0) - 65], explanation: item.explanation,
}))

export const FLEISCHNER_FLASHCARD_TOPIC = {
  id: 'fleischner-kriterien', area: 'Thorax', chapter: 'Lungentumoren', icon: '🫁', iconImage: '/fach/thorax.png', color: '#0891b2', href: '/flashcards/fleischner-kriterien',
  title: L('Fleischner-Kriterien', 'Fleischner criteria', 'معیارهای Fleischner'),
  subtitle: L('Anwendbarkeit · Messung · Verlaufskontrollen', 'Eligibility · measurement · follow-up', 'قابلیت کاربرد · اندازه‌گیری · پیگیری'),
}
