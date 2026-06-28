const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, topicId, fach, question, options, correct, explanation) => ({ id, topicId, fach, question, options, correct, explanation })
const F = (id, topicId, category, front, answer, explanation) => ({ id, topicId, category, front, answer, explanation })

const TOPICS = {
  'kraniozervikaler-uebergang-trauma': {
    title: L('Kraniozervikaler Übergang', 'Craniocervical junction', 'محل اتصال کرانیوسرویکال'),
    subtitle: L('C0-C2 · Dens · C1-Ring · Bandapparat · Instabilität', 'C0-C2 · dens · C1 ring · ligaments · instability', 'C0-C2 · دنس · حلقه C1 · رباط ها · ناپایداری'),
  },
  'hws-verletzungen': {
    title: L('HWS-Verletzungen', 'Cervical spine injuries', 'آسیب های ستون فقرات گردنی'),
    subtitle: L('Alignment · Facetten · Diskoligamentär · Myelon · Vertebralis', 'Alignment · facets · disco-ligamentous injury · cord · vertebral artery', 'الاینمنت · فاست ها · دیسک و رباط · نخاع · شریان ورتبرال'),
  },
  'bws-lws-frakturen': {
    title: L('BWS / LWS-Frakturen', 'Thoracic / lumbar spine fractures', 'شکستگی های ستون فقرات توراسیک / کمری'),
    subtitle: L('AO-Spine · Berstung · Distraktion · PLC · Spinalkanal', 'AO Spine · burst · distraction · PLC · spinal canal', 'AO Spine · شکستگی انفجاری · دیستراکشن · کمپلکس خلفی · کانال نخاعی'),
  },
}

export const SPINE_TRAUMA_FLASHCARD_TOPICS = Object.entries(TOPICS).map(([id, topic]) => ({
  id,
  area: 'Wirbelsäule',
  chapter: 'Trauma',
  icon: 'CT',
  iconImage: '/fach/wirbelsaeule.png',
  color: '#0ea5e9',
  href: `/flashcards/${id}`,
  title: topic.title,
  subtitle: topic.subtitle,
}))

const questionContent = [
  Q(
    '01-instability',
    'kraniozervikaler-uebergang-trauma',
    'wirbelsaeule',
    L('Welche Struktur ist bei C1-Ringfrakturen besonders wichtig für die Stabilitätsbeurteilung?', 'Which structure is particularly important for stability assessment in C1 ring fractures?', 'در شکستگی حلقه C1 کدام ساختار برای ارزیابی پایداری اهمیت ویژه دارد؟'),
    [
      L('Lig. transversum atlantis', 'Transverse ligament of the atlas', 'رباط عرضی آتلانتاس'),
      L('Lig. flavum L4/5', 'Ligamentum flavum L4/5', 'لیگامان فلاووم L4/5'),
      L('Lig. sacroiliacum anterius', 'Anterior sacroiliac ligament', 'رباط ساکروایلیاک قدامی'),
      L('Lig. inguinale', 'Inguinal ligament', 'رباط اینگوینال'),
    ],
    'A',
    L('Das Lig. transversum atlantis hält den Dens gegen den vorderen C1-Bogen. Eine Verletzung kann eine atlantoaxiale Instabilität bedeuten.', 'The transverse ligament holds the dens against the anterior C1 arch. Injury may indicate atlanto-axial instability.', 'رباط عرضی دنس را در برابر قوس قدامی C1 نگه می دارد؛ آسیب آن می تواند نشانه ناپایداری آتلانتوآکسیال باشد.')
  ),
  Q(
    '02-cta',
    'kraniozervikaler-uebergang-trauma',
    'wirbelsaeule',
    L('Wann sollte bei hochzervikalem Trauma eine CTA erwogen werden?', 'When should CTA be considered in high cervical trauma?', 'در ترومای گردنی فوقانی چه زمانی CTA باید مد نظر باشد؟'),
    [
      L('Bei Foramen-transversarium-Beteiligung oder Subluxation', 'With transverse foramen involvement or subluxation', 'درگیری فورامن ترانسورس یا ساب لوکسیشن'),
      L('Nur bei isolierter Arthrose C1/2', 'Only with isolated C1/2 osteoarthritis', 'فقط در آرتروز منفرد C1/2'),
      L('Bei jeder unkomplizierten Keilwirbeldeformität', 'With every uncomplicated wedge deformity', 'در هر دفورمیتی گوه ای ساده'),
      L('Nur bei fehlender Fraktur', 'Only if no fracture is present', 'فقط وقتی شکستگی وجود ندارد'),
    ],
    'A',
    L('Frakturen durch das Foramen transversarium, Subluxationen und Hochrasanztrauma erhöhen das Risiko einer Vertebralisverletzung.', 'Transverse foramen fractures, subluxations and high-energy trauma increase the risk of vertebral artery injury.', 'شکستگی فورامن ترانسورس، ساب لوکسیشن و ترومای پرانرژی خطر آسیب شریان ورتبرال را افزایش می دهند.')
  ),
  Q(
    '03-facet',
    'hws-verletzungen',
    'wirbelsaeule',
    L('Welcher Befund spricht in der subaxialen HWS besonders für Instabilität?', 'Which finding in the subaxial cervical spine particularly suggests instability?', 'کدام یافته در ستون فقرات گردنی تحتانی بیشتر به نفع ناپایداری است؟'),
    [
      L('Verhakte oder luxierte Facettengelenke', 'Locked or dislocated facet joints', 'فاست قفل شده یا دررفته'),
      L('Geringe Spondylose ohne Traumazeichen', 'Mild spondylosis without traumatic signs', 'اسپوندیلوز خفیف بدون علائم تروماتیک'),
      L('Kleine unauffällige Osteophyten', 'Small uncomplicated osteophytes', 'استئوفیت های کوچک بدون عارضه'),
      L('Normale prävertebrale Weichteile', 'Normal prevertebral soft tissues', 'بافت نرم پره ورتبرال طبیعی'),
    ],
    'A',
    L('Facettenluxationen sind wichtige Marker einer diskoligamentären und häufig instabilen Verletzung.', 'Facet dislocations are important markers of disco-ligamentous and often unstable injury.', 'دررفتگی فاست نشانگر مهم آسیب دیسکولیگامانتری و اغلب ناپایدار است.')
  ),
  Q(
    '04-mri',
    'hws-verletzungen',
    'wirbelsaeule',
    L('Welche Indikation spricht nach HWS-CT besonders für eine ergänzende MRT?', 'Which indication after cervical CT particularly supports additional MRI?', 'بعد از CT ستون گردنی کدام اندیکاسیون بیشتر به نفع MRI تکمیلی است؟'),
    [
      L('Neurologisches Defizit oder diskoligamentärer Verdacht', 'Neurological deficit or suspected disco-ligamentous injury', 'نقص نورولوژیک یا شک به آسیب دیسک و رباط'),
      L('Allein normale CT ohne Beschwerden', 'Normal CT alone without symptoms', 'CT طبیعی بدون علامت'),
      L('Isolierte chronische Unkarthrose', 'Isolated chronic uncovertebral arthrosis', 'آرتروز مزمن منفرد اونکوورتبرال'),
      L('Screening ohne Trauma', 'Screening without trauma', 'غربالگری بدون تروما'),
    ],
    'A',
    L('MRT zeigt Myelon, Bandscheiben, Bänder und epidurale Hämatome besser als CT.', 'MRI better shows cord, discs, ligaments and epidural haematoma than CT.', 'MRI نخاع، دیسک، رباط ها و هماتوم اپیدورال را بهتر از CT نشان می دهد.')
  ),
  Q(
    '05-burst',
    'bws-lws-frakturen',
    'wirbelsaeule',
    L('Welcher Befund unterscheidet eine Berstungsfraktur von einer einfachen Keilkompression?', 'Which finding distinguishes a burst fracture from a simple wedge compression fracture?', 'کدام یافته شکستگی انفجاری را از فشردگی گوه ای ساده جدا می کند؟'),
    [
      L('Hinterkantenbeteiligung mit möglicher Retropulsion', 'Posterior wall involvement with possible retropulsion', 'درگیری دیواره خلفی با احتمال رتروپالژن'),
      L('Nur geringe vordere Höhenminderung', 'Only mild anterior height loss', 'فقط کاهش ارتفاع قدامی خفیف'),
      L('Fehlendes Knochenmarködem', 'Absent marrow oedema', 'عدم ادم مغز استخوان'),
      L('Isolierte Spondylarthrose', 'Isolated facet osteoarthritis', 'آرتروز فاست منفرد'),
    ],
    'A',
    L('Berstungsfrakturen betreffen die Hinterkante und können den Spinalkanal durch Retropulsion einengen.', 'Burst fractures involve the posterior wall and may narrow the canal by retropulsion.', 'شکستگی انفجاری دیواره خلفی را درگیر می کند و ممکن است با رتروپالژن کانال را تنگ کند.')
  ),
  Q(
    '06-plc',
    'bws-lws-frakturen',
    'wirbelsaeule',
    L('Warum ist der posteriore Bandkomplex bei thorakolumbalen Frakturen wichtig?', 'Why is the posterior ligamentous complex important in thoracolumbar fractures?', 'چرا کمپلکس رباطی خلفی در شکستگی های توراکولومبار مهم است؟'),
    [
      L('Er beeinflusst Stabilität und Therapieentscheidung', 'It influences stability and management', 'بر پایداری و تصمیم درمان اثر دارد'),
      L('Er ist nur für die Lungenbelüftung relevant', 'It is relevant only for lung ventilation', 'فقط برای تهویه ریه مهم است'),
      L('Er ersetzt die Beurteilung der Hinterkante', 'It replaces assessment of the posterior wall', 'جایگزین ارزیابی دیواره خلفی است'),
      L('Er ist in der MRT nie sichtbar', 'It is never visible on MRI', 'در MRI هرگز دیده نمی شود'),
    ],
    'A',
    L('Ein verletzter posteriorer Bandkomplex spricht für eine instabilere Verletzung und kann eine MRT erforderlich machen.', 'Injury to the posterior ligamentous complex suggests a more unstable injury and may require MRI.', 'آسیب کمپلکس خلفی نشانه ناپایداری بیشتر است و ممکن است MRI لازم شود.')
  ),
]

export const SPINE_TRAUMA_QUESTIONS = Object.fromEntries(
  ['de', 'en', 'fa'].map(lang => [
    lang,
    questionContent.map(item => ({
      id: `${item.topicId}-${lang}-${item.id}`,
      tags: [item.topicId, 'wirbelsaeule-trauma'],
      fach: item.fach,
      question: item.question[lang],
      options: item.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
      correct: item.correct,
      explanation: item.explanation[lang],
    })),
  ])
)

const flashcards = [
  F('01-c1', 'kraniozervikaler-uebergang-trauma', L('Stabilität', 'Stability', 'پایداری'), L('Welche Bandstruktur ist bei C1-Ringfraktur zentral?', 'Which ligament is central in C1 ring fracture?', 'در شکستگی حلقه C1 کدام رباط مرکزی است؟'), L('Lig. transversum atlantis.', 'Transverse ligament of the atlas.', 'رباط عرضی آتلانتاس.'), L('Eine Verletzung kann atlantoaxiale Instabilität anzeigen.', 'Injury may indicate atlanto-axial instability.', 'آسیب می تواند ناپایداری آتلانتوآکسیال را نشان دهد.')),
  F('02-cta', 'kraniozervikaler-uebergang-trauma', L('Gefäße', 'Vessels', 'عروق'), L('Wann CTA bei C0-C2-Trauma?', 'When CTA in C0-C2 trauma?', 'چه زمانی CTA در ترومای C0-C2؟'), L('Foramen-transversarium-Fraktur, Subluxation oder Hochenergietrauma.', 'Transverse foramen fracture, subluxation or high-energy trauma.', 'شکستگی فورامن ترانسورس، ساب لوکسیشن یا ترومای پرانرژی.'), L('Diese Befunde erhöhen das Risiko einer Vertebralisverletzung.', 'These findings increase vertebral artery injury risk.', 'این یافته ها خطر آسیب ورتبرال را بالا می برند.')),
  F('03-facet', 'hws-verletzungen', L('Instabilität', 'Instability', 'ناپایداری'), L('Wichtiger Instabilitätsmarker in der subaxialen HWS?', 'Important instability marker in the subaxial cervical spine?', 'مارکر مهم ناپایداری در HWS تحتانی؟'), L('Verhakte oder luxierte Facettengelenke.', 'Locked or dislocated facet joints.', 'فاست قفل شده یا دررفته.'), L('Sie sprechen für eine diskoligamentäre Verletzung.', 'They suggest disco-ligamentous injury.', 'به نفع آسیب دیسکولیگامانتری هستند.')),
  F('04-mri', 'hws-verletzungen', L('MRT', 'MRI', 'MRI'), L('Wann MRT nach HWS-CT?', 'When MRI after cervical CT?', 'چه زمانی MRI بعد از CT گردنی؟'), L('Neurologie, Myelopathie, radikuläre Ausfälle oder Bandverdacht.', 'Neurology, myelopathy, radicular symptoms or suspected ligament injury.', 'نقص نورولوژیک، میلوپاتی، علائم رادیکولار یا شک به آسیب رباط.'), L('MRT zeigt Myelon, Diskus, Bänder und epidurales Hämatom.', 'MRI shows cord, disc, ligaments and epidural haematoma.', 'MRI نخاع، دیسک، رباط و هماتوم اپیدورال را نشان می دهد.')),
  F('05-burst', 'bws-lws-frakturen', L('Morphologie', 'Morphology', 'مورفولوژی'), L('Kernzeichen der Berstungsfraktur?', 'Key sign of a burst fracture?', 'نشانه کلیدی شکستگی انفجاری؟'), L('Hinterkantenbeteiligung mit möglicher Retropulsion.', 'Posterior wall involvement with possible retropulsion.', 'درگیری دیواره خلفی با احتمال رتروپالژن.'), L('Dadurch kann der Spinalkanal eingeengt werden.', 'This may narrow the spinal canal.', 'این می تواند کانال نخاعی را تنگ کند.')),
  F('06-plc', 'bws-lws-frakturen', L('Stabilität', 'Stability', 'پایداری'), L('Warum PLC bei BWS/LWS-Fraktur beurteilen?', 'Why assess the PLC in thoracolumbar fractures?', 'چرا PLC در شکستگی توراکولومبار بررسی شود؟'), L('Er entscheidet wesentlich über Stabilität und Therapie.', 'It strongly influences stability and treatment.', 'به طور مهم بر پایداری و درمان اثر دارد.'), L('STIR-Ödem oder Interspinösaufweitung sprechen für Verletzung.', 'STIR oedema or interspinous widening suggest injury.', 'ادم STIR یا افزایش فاصله بین خاری به نفع آسیب است.')),
]

export const SPINE_TRAUMA_FLASHCARDS = flashcards.map(card => ({
  id: `${card.topicId}-${card.id}`,
  topicId: card.topicId,
  category: card.category,
  front: card.front,
  answer: card.answer,
  explanation: card.explanation,
}))
