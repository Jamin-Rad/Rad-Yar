const L = (de, en, fa) => ({ de, en, fa })
const topicIds = ['leber-anatomie', 'gefaesse-anatomie-abdomen']

const items = [
  {
    id: 'aortic-celiac-branches',
    prompt: L('Welche Arterien entspringen laut Tafel dem Truncus coeliacus?', 'Which arteries arise from the celiac trunk on the source plate?', 'طبق تصویر منبع، کدام شریان‌ها از تنهٔ سلیاک منشأ می‌گیرند؟'),
    options: [
      L('A. hepatica communis, A. gastrica sinistra und A. splenica', 'Common hepatic, left gastric and splenic arteries', 'شریان کبدی مشترک، شریان معده‌ای چپ و شریان طحالی'),
      L('A. mesenterica superior und A. mesenterica inferior', 'Superior and inferior mesenteric arteries', 'شریان مزانتریک فوقانی و شریان مزانتریک تحتانی'),
      L('A. renalis dextra und A. renalis sinistra', 'Right and left renal arteries', 'شریان کلیوی راست و شریان کلیوی چپ'),
      L('Aa. iliacae communes und A. sacralis mediana', 'Common iliac arteries and median sacral artery', 'شریان‌های ایلیاک مشترک و شریان ساکرال میانی'),
    ], correct: 'A',
    explanation: L('Die Tafel ordnet Leber-, Magen- und Milzarterie dem Truncus coeliacus zu.', 'The plate places the hepatic, gastric and splenic arteries at the celiac trunk.', 'در تصویر، شریان‌های کبدی، معده‌ای و طحالی به تنهٔ سلیاک نسبت داده شده‌اند.'),
    wrong: {
      B: L('Die Mesenterialarterien entspringen direkt der Aorta abdominalis, nicht dem Truncus coeliacus.', 'The mesenteric arteries arise directly from the abdominal aorta, not the celiac trunk.', 'شریان‌های مزانتریک مستقیماً از آئورت شکمی منشأ می‌گیرند، نه از تنهٔ سلیاک.'),
      C: L('Die Nierenarterien entspringen direkt der Aorta abdominalis.', 'The renal arteries arise directly from the abdominal aorta.', 'شریان‌های کلیوی مستقیماً از آئورت شکمی منشأ می‌گیرند.'),
      D: L('Die Aa. iliacae communes und A. sacralis mediana liegen am distalen Aortenende.', 'The common iliac and median sacral arteries are at the distal end of the aorta.', 'شریان‌های ایلیاک مشترک و ساکرال میانی در انتهای دیستال آئورت قرار دارند.'),
    },
  },
  {
    id: 'portal-confluence',
    prompt: L('Aus welchen beiden Venen entsteht die V. portae hepatis?', 'Which two veins form the hepatic portal vein?', 'ورید پورت کبدی از پیوند کدام دو ورید تشکیل می‌شود؟'),
    options: [
      L('V. mesenterica superior und V. splenica', 'Superior mesenteric vein and splenic vein', 'ورید مزانتریک فوقانی و ورید طحالی'),
      L('V. mesenterica inferior und V. renalis sinistra', 'Inferior mesenteric vein and left renal vein', 'ورید مزانتریک تحتانی و ورید کلیوی چپ'),
      L('Vv. hepaticae dextra und sinistra', 'Right and left hepatic veins', 'وریدهای کبدی راست و چپ'),
      L('V. cava inferior und V. splenica', 'Inferior vena cava and splenic vein', 'ورید اجوف تحتانی و ورید طحالی'),
    ], correct: 'A',
    explanation: L('Die Pfortader entsteht aus der V. mesenterica superior und der V. splenica.', 'The portal vein is formed by the superior mesenteric and splenic veins.', 'ورید پورت از ورید مزانتریک فوقانی و ورید طحالی تشکیل می‌شود.'),
    wrong: {
      B: L('Die V. mesenterica inferior kann in die V. splenica münden, ist aber nicht das in der Quelle gezeigte Paar.', 'The inferior mesenteric vein may drain into the splenic vein, but this is not the pair shown in the source.', 'ورید مزانتریک تحتانی ممکن است به ورید طحالی بریزد، اما این جفتی نیست که در منبع نشان داده شده است.'),
      C: L('Die Lebervenen drainieren aus der Leber in die V. cava inferior.', 'The hepatic veins drain from the liver into the inferior vena cava.', 'وریدهای کبدی خون را از کبد به ورید اجوف تحتانی می‌برند.'),
      D: L('Die V. cava inferior ist der Abflussweg der Lebervenen, nicht ein Zuflussast zur Pfortader.', 'The inferior vena cava receives hepatic venous outflow; it is not an inflow tributary forming the portal vein.', 'ورید اجوف تحتانی مسیر خروج وریدهای کبدی است، نه شاخه‌ای ورودی برای تشکیل ورید پورت.'),
    },
  },
  {
    id: 'hepatic-outflow',
    prompt: L('Wohin münden die Lebervenen laut Kursquelle?', 'Where do the hepatic veins drain according to the course source?', 'طبق منبع آموزشی، وریدهای کبدی به کجا تخلیه می‌شوند؟'),
    options: [
      L('Direkt in die V. cava inferior', 'Directly into the inferior vena cava', 'مستقیماً به ورید اجوف تحتانی'),
      L('In die V. portae hepatis', 'Into the hepatic portal vein', 'به ورید پورت کبدی'),
      L('In die V. mesenterica superior', 'Into the superior mesenteric vein', 'به ورید مزانتریک فوقانی'),
      L('In den Truncus coeliacus', 'Into the celiac trunk', 'به تنهٔ سلیاک'),
    ], correct: 'A',
    explanation: L('Portalvene und Lebervenen haben unterschiedliche Aufgaben: portalvenöser Zufluss versus venöser Abfluss zur Hohlvene.', 'The portal and hepatic veins have different roles: portal inflow versus venous drainage to the vena cava.', 'ورید پورت و وریدهای کبدی نقش متفاوت دارند: ورودی پورت در برابر خروج وریدی به اجوف.'),
    wrong: {
      B: L('Die V. portae hepatis führt Blut zur Leber; sie ist kein venöser Abfluss aus der Leber.', 'The hepatic portal vein brings blood to the liver; it is not venous outflow from the liver.', 'ورید پورت خون را به کبد می‌رساند و مسیر خروج وریدی از کبد نیست.'),
      C: L('Die V. mesenterica superior trägt Blut zur Portalvene bei und ist kein Leberabfluss.', 'The superior mesenteric vein contributes to portal inflow; it is not hepatic outflow.', 'ورید مزانتریک فوقانی در ورودی پورت نقش دارد و مسیر خروج خون از کبد نیست.'),
      D: L('Der Truncus coeliacus ist ein arterieller Zuflussweg, kein venöser Abfluss.', 'The celiac trunk is an arterial inflow route, not a venous outflow route.', 'تنهٔ سلیاک مسیر ورودی شریانی است، نه مسیر خروج وریدی.'),
    },
  },
]

export const LIVER_VESSELS_QUESTIONS = ['de', 'en', 'fa'].flatMap(lang => items.map(item => ({
  id: `liver-vessels-${lang}-${item.id}`,
  fach: 'abdomen',
  tags: topicIds,
  question: item.prompt[lang],
  options: item.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
  correct: item.correct,
  explanation: item.explanation[lang],
  wrongExplanations: Object.fromEntries(Object.entries(item.wrong).map(([id, text]) => [id, text[lang]])),
  source: 'Abdomen.pdf, PDF pp. 2–4; labelled anatomy plates and stated hepatic inflow/outflow.',
})))

export const LIVER_VESSELS_TOPIC_GROUP = {
  fachId: 'abdomen',
  kapitelId: 'abdomen-anatomie',
  title: L('Abdomen · Anatomie', 'Abdomen · anatomy', 'شکم · آناتومی'),
  topics: [
    { id: 'leber-anatomie', title: L('Leber · Zu- und Abfluss', 'Liver · inflow and outflow', 'کبد · ورودی و خروجی') },
    { id: 'gefaesse-anatomie-abdomen', title: L('Gefäßanatomie Abdomen', 'Abdominal vascular anatomy', 'آناتومی عروق شکم') },
  ],
}

export const LIVER_VESSELS_FLASHCARD_TOPIC = {
  id: 'leber-gefaesse-anatomie', area: 'Abdomen', chapter: 'Anatomie', icon: 'CT', color: '#55a5b4', href: '/flashcards/leber-gefaesse-anatomie',
  title: L('Lebergefäße', 'Liver vessels', 'عروق کبد'),
  subtitle: L('Zufluss · Aortenäste · Abfluss', 'Inflow · aortic branches · outflow', 'ورودی · شاخه‌های آئورت · خروجی'),
}

export const LIVER_VESSELS_FLASHCARDS = [
  { id: 'liver-vessels-celiac-trunk', topicId: 'leber-gefaesse-anatomie', category: L('Arterien', 'Arteries', 'شریان‌ها'), front: L('Welche drei Hauptarterien sind dem Truncus coeliacus zugeordnet?', 'Which three main arteries arise from the celiac trunk?', 'سه شریان اصلی وابسته به تنهٔ سلیاک کدام‌اند؟'), answer: L('A. hepatica communis, A. gastrica sinistra und A. splenica.', 'Common hepatic, left gastric and splenic arteries.', 'شریان کبدی مشترک، شریان معده‌ای چپ و شریان طحالی.'), explanation: L('Die A. hepatica communis führt über die A. hepatica propria zum arteriellen Leberzufluss.', 'The common hepatic artery continues via the proper hepatic artery to the liver.', 'شریان کبدی مشترک از راه شریان کبدی اختصاصی به ورودی شریانی کبد می‌رسد.'), source: 'Abdomen.pdf, PDF p. 2.' },
  { id: 'liver-vessels-portal-confluence', topicId: 'leber-gefaesse-anatomie', category: L('Portalvenöser Zufluss', 'Portal venous inflow', 'ورودی ورید پورت'), front: L('Welche Venen bilden die V. portae hepatis?', 'Which veins form the hepatic portal vein?', 'کدام وریدها ورید پورت کبدی را تشکیل می‌دهند؟'), answer: L('V. mesenterica superior und V. splenica.', 'Superior mesenteric vein and splenic vein.', 'ورید مزانتریک فوقانی و ورید طحالی.'), explanation: L('Die portalvenöse Konfluenz ist im oberen Bild der Tafel auf PDF-Seite 3 markiert.', 'The portal venous confluence is shown in the upper image on PDF page 3.', 'محل پیوند ورید پورت در تصویر بالایی صفحهٔ ۳ PDF نشان داده شده است.'), source: 'Abdomen.pdf, PDF p. 3.' },
  { id: 'liver-vessels-two-inflows', topicId: 'leber-gefaesse-anatomie', category: L('Leberdurchblutung', 'Liver inflow', 'خون‌رسانی کبد'), front: L('Welche zwei Gefäße führen Blut zur Leber?', 'Which two vessels bring blood to the liver?', 'کدام دو رگ خون را به کبد می‌رسانند؟'), answer: L('V. portae hepatis und A. hepatica propria.', 'Hepatic portal vein and proper hepatic artery.', 'ورید پورت کبدی و شریان کبدی اختصاصی.'), explanation: L('Die Leber hat einen portalvenösen und einen arteriellen Zufluss.', 'The liver has portal venous and arterial inflow.', 'کبد ورودی ورید پورت و ورودی شریانی دارد.'), source: 'Abdomen.pdf, PDF p. 4.' },
  { id: 'liver-vessels-outflow', topicId: 'leber-gefaesse-anatomie', category: L('Venöser Abfluss', 'Venous outflow', 'خروج وریدی'), front: L('Wohin drainieren die Vv. hepaticae?', 'Where do the hepatic veins drain?', 'وریدهای کبدی به کجا تخلیه می‌شوند؟'), answer: L('Direkt in die V. cava inferior.', 'Directly into the inferior vena cava.', 'مستقیماً به ورید اجوف تحتانی.'), explanation: L('Nicht mit dem portalvenösen Zufluss verwechseln.', 'Do not confuse this with portal venous inflow.', 'آن را با ورودی ورید پورت اشتباه نگیرید.'), source: 'Abdomen.pdf, PDF p. 4.' },
]
