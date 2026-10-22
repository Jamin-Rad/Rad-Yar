const L = (de, en, fa) => ({ de, en, fa })
const seeds = [
  {
    id: 'bipartite-vs-fracture',
    question: L('Welcher Befund spricht eher für eine bipartite Patella als für eine akute Fraktur?', 'Which finding favours a bipartite patella over an acute fracture?', 'کدام یافته بیشتر به نفع کشکک دوقسمتی است تا شکستگی حاد؟'),
    options: [
      L('Ein glatt kortiziertes superolaterales Ossikel ohne begleitendes Knochenmarködem.', 'A smoothly corticated superolateral ossicle without surrounding marrow oedema.', 'استخوانچهٔ فوقانی‌ـ‌خارجی با حاشیهٔ صاف و کورتیکه‌شده، بدون ادم مغز استخوان اطراف.'),
      L('Eine unregelmäßige scharfe Frakturlinie nach akutem Trauma mit Knochenmarködem.', 'An irregular sharp fracture line after acute trauma with marrow oedema.', 'خط شکستگی نامنظم و تیز پس از ضربهٔ حاد همراه با ادم مغز استخوان.'),
      L('Eine dislozierte Fragmentstellung mit akuter Weichteilschwellung.', 'Displaced fragments with acute soft-tissue swelling.', 'جابه‌جایی قطعات همراه با تورم حاد بافت نرم.'),
      L('Eine neue Unterbrechung der Patellakontur nach direktem Trauma.', 'A new interruption of the patellar contour after direct trauma.', 'گسیختگی جدید حاشیهٔ کشکک پس از ضربهٔ مستقیم.'),
    ],
    correct: 0,
    explanation: L('Eine bipartite Patella liegt häufig superolateral und zeigt typischerweise glatte kortizierte Ränder; das Muster muss mit Trauma, Bildgebung und möglichem Ödem zusammen beurteilt werden.', 'A bipartite patella is often superolateral and typically has smooth corticated margins; interpret the pattern with trauma history, imaging and any oedema.', 'کشکک دوقسمتی اغلب در بخش فوقانی‌ـ‌خارجی قرار دارد و معمولاً حاشیه‌های صاف و کورتیکه‌شده دارد؛ الگو را همراه سابقهٔ ضربه، تصاویر و وجود احتمالی ادم ارزیابی کنید.'),
  },
  {
    id: 'transient-dislocation',
    question: L('Welches Knochenmarkkontusionsmuster passt zu einer vorübergehenden lateralen Patellaluxation?', 'Which marrow-contusion pattern fits transient lateral patellar dislocation?', 'کدام الگوی کوفتگی مغز استخوان با دررفتگی گذرای خارجی کشکک مطابقت دارد؟'),
    options: [
      L('Mediale Patella und lateraler Femurkondylus.', 'Medial patella and lateral femoral condyle.', 'سطح داخلی کشکک و کندیل خارجی فمور.'),
      L('Laterale Patella und medialer Femurkondylus.', 'Lateral patella and medial femoral condyle.', 'سطح خارجی کشکک و کندیل داخلی فمور.'),
      L('Beide Femurkondylen ohne Patellabeteiligung.', 'Both femoral condyles without patellar involvement.', 'هر دو کندیل فمور بدون درگیری کشکک.'),
      L('Isolierte Tibia ohne femorale oder patellare Kontusion.', 'Isolated tibia without femoral or patellar contusion.', 'درگیری منفرد تیبیا بدون کوفتگی فمور یا کشکک.'),
    ],
    correct: 0,
    explanation: L('Die typische Impaktionskonstellation betrifft die mediale Patella und den lateralen Femurkondylus. Sie ist ein Hinweis im passenden Kontext, kein alleiniger Beweis.', 'The typical impaction pattern involves the medial patella and lateral femoral condyle. It is a clue in context, not proof by itself.', 'الگوی تیپیک برخورد، سطح داخلی کشکک و کندیل خارجی فمور را درگیر می‌کند. این یافته در زمینهٔ مناسب یک سرنخ است، نه اثبات مستقل تشخیص.'),
  },
]

export const PATELLA_STRECKAPPARAT_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang,
  seeds.map(seed => ({
    id: `patella-extensor-${seed.id}-${lang}`,
    question: seed.question[lang],
    options: seed.options.map((option, index) => ({ id: ['A', 'B', 'C', 'D'][index], text: option[lang] })),
    correct: ['A', 'B', 'C', 'D'][seed.correct],
    explanation: seed.explanation[lang],
    tags: ['patella-streckapparat'],
    fach: 'msk',
  })),
]))

export const PATELLA_STRECKAPPARAT_FLASHCARDS = [
  { id: 'patella-extensor-bipartite', topicId: 'patella-streckapparat', category: L('Differenzialdiagnose', 'Differential diagnosis', 'تشخیص افتراقی'), front: L('Welche Merkmale stützen eine bipartite Patella?', 'Which features support a bipartite patella?', 'کدام ویژگی‌ها از کشکک دوقسمتی حمایت می‌کنند؟'), answer: L('Typisch sind superolaterale Lage und glatte, kortizierte Ränder; fehlendes Knochenmarködem kann unterstützen.', 'Typical features are superolateral location and smooth corticated margins; absence of marrow oedema may support it.', 'محل فوقانی‌ـ‌خارجی و حاشیه‌های صاف و کورتیکه‌شده تیپیک‌اند؛ نبود ادم مغز استخوان می‌تواند مؤید باشد.'), explanation: L('Kein einzelnes Merkmal ist absolut: Trauma, Kontur, kortikalisierung und MRT-Befunde zusammen beurteilen.', 'No single feature is absolute: assess trauma, contour, cortication and MRI findings together.', 'هیچ ویژگی منفردی قطعی نیست؛ سابقهٔ ضربه، شکل، کورتیکه‌شدن و یافته‌های MRI را با هم بسنجید.') },
  { id: 'patella-extensor-dislocation', topicId: 'patella-streckapparat', category: L('MRT-Muster', 'MRI pattern', 'الگوی MRI'), front: L('Welche beiden Knochen sind beim typischen Impaktionsmuster nach lateraler Patellaluxation betroffen?', 'Which two bones show the typical impaction pattern after lateral patellar dislocation?', 'در الگوی تیپیک برخورد پس از دررفتگی خارجی کشکک، کدام دو استخوان درگیرند؟'), answer: L('Mediale Patella und lateraler Femurkondylus.', 'Medial patella and lateral femoral condyle.', 'سطح داخلی کشکک و کندیل خارجی فمور.'), explanation: L('Das Muster unterstützt die Einordnung im passenden Kontext, beweist die Luxation aber nicht allein.', 'The pattern supports interpretation in context but does not prove dislocation by itself.', 'این الگو در زمینهٔ مناسب به تفسیر کمک می‌کند، اما به‌تنهایی دررفتگی را ثابت نمی‌کند.') },
]

export const PATELLA_STRECKAPPARAT_FLASHCARD_TOPIC = {
  id: 'patella-streckapparat', title: L('Patella & Streckapparat', 'Patella & extensor mechanism', 'کشکک و مکانیسم اکستانسور'),
  subtitle: L('Morphologie · Luxation · Tendinopathie', 'Morphology · dislocation · tendinopathy', 'مورفولوژی · دررفتگی · تندینوپاتی'),
  area: 'MSK', chapter: L('Knie & Unterschenkel', 'Knee & lower leg', 'زانو و ساق'), icon: '🦴', iconImage: '/fach/msk.png',
  color: '#6aabc1', href: '/flashcards/patella-streckapparat',
}
