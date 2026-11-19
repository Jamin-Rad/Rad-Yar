import { assessPadua, categories, criterionTitles } from './criteria.mjs'
import { assessEuropeanTaskForce } from './europeanTaskForce.mjs'

export const L = (de, en, fa) => ({ de, en, fa })
const criteria = new Map(categories.flatMap(category => category.criteria.map(item => [item.id, item])))
const option = (id, title, text, rules = {}) => ({ id, title, text, ...rules })
const recorded = (id, rules = {}) => option(id, criterionTitles[id], criteria.get(id).text, { padua: id, ...rules })
const short = (id, de, en, fa) => option(id, L(de, en, fa))
const question = (id, group, title, options, extra = {}) => ({ id, group, title, options, ...extra })
const has = (answers, id, value) => answers[id]?.includes(value) ?? false
const any = (answers, id, values) => values.some(value => has(answers, id, value))
const regionPadua = ['ak-dys-free', 'ak-dys-other', 'bulging']
const repolRv = ['v1-v3', 'v1-v2', 'v1-v4-rbbb']
const familyIds = ['family-definite', 'family-pathology', 'family-suspected', 'family-sudden', 'family-second']

export const GROUPS = {
  cine: L('Form & Funktion', 'Morphology & function', 'مورفولوژی و عملکرد'),
  tissue: L('Myokardgewebe', 'Myocardial tissue', 'بافت میوکارد'),
  ecg: L('Repolarisation', 'Repolarization', 'رپلاریزاسیون'),
  conduction: L('Depolarisation', 'Depolarization', 'دپلاریزاسیون'),
  rhythm: L('Rhythmus', 'Rhythm', 'ریتم'),
  family: L('Familie & Genetik', 'Family & genetics', 'خانواده و ژنتیک'),
}

const QUESTIONS = [
  question('rv-motion', 'cine', L('RV-Wandbewegung?', 'RV wall motion?', 'حرکت دیوارهٔ بطن راست؟'), [
    short('ak-dys-free', 'Akinesie oder Dyskinesie der freien RV-Wand', 'Akinesia or dyskinesia of the RV free wall', 'آکینزی یا دیسکینزی دیوارهٔ آزاد بطن راست'),
    short('ak-dys-other', 'Akinesie oder Dyskinesie in einem anderen RV-Abschnitt', 'Akinesia or dyskinesia in another RV region', 'آکینزی یا دیسکینزی در ناحیهٔ دیگری از بطن راست'),
    short('aneurysm', 'Aneurysma der freien RV-Wand', 'Aneurysm of the RV free wall', 'آنوریسم دیوارهٔ آزاد بطن راست'),
    short('bulging', 'Regionale Ausbuchtung', 'Regional bulging', 'برجستگی موضعی'),
  ], { hint: L('Eine isolierte RV-Hypokinesie zählt bei ETF und Padua nicht.', 'Isolated RV hypokinesia does not count in ETF or Padua.', 'هیپوکینزی منفرد بطن راست در ETF و پادوا معیار محسوب نمی‌شود.') }),
  question('rv-global', 'cine', L('RV-Volumen und RVEF?', 'RV volume and RVEF?', 'حجم و کسر جهشی بطن راست؟'), [
    short('dilated', 'RV-Volumen über der Referenzgrenze', 'RV volume above the reference limit', 'حجم بطن راست بالاتر از محدودهٔ مرجع'),
    short('dysfunction', 'RVEF unter der Referenzgrenze', 'RVEF below the reference limit', 'RVEF پایین‌تر از محدودهٔ مرجع'),
  ], {
    visible: answers => any(answers, 'rv-motion', [...regionPadua, 'aneurysm']),
    hint: L('Für beide Systeme gelten Referenzwerte für die Messmethode, das Alter und das Geschlecht. Beim Volumen die Körperoberfläche berücksichtigen.', 'For both systems, use technique-, age- and sex-appropriate reference values. Account for body surface area for volume.', 'برای هر دو سیستم از مقادیر مرجع متناسب با روش تصویربرداری، سن و جنس استفاده کنید. برای حجم، سطح بدن را هم در نظر بگیرید.'),
  }),
  question('lv-function', 'cine', L('LV-Funktion?', 'LV function?', 'عملکرد بطن چپ؟'), [
    recorded('lv-function', { title: L('LVEF vermindert, mit oder ohne LV-Dilatation', 'Reduced LVEF, with or without LV dilatation', 'کاهش کسر جهشی بطن چپ، با یا بدون اتساع'), text: null }),
    recorded('lv-motion', { title: L('Regionale Hypokinesie oder Akinesie', 'Regional hypokinesia or akinesia', 'هیپوکینزی یا آکینزی موضعی'), text: L('Freie LV-Wand oder Septum', 'LV free wall or septum', 'دیوارهٔ آزاد بطن چپ یا سپتوم') }),
  ]),
  question('lge', 'tissue', L("LGE-Muster?", "LGE pattern?", "الگوی LGE؟"), [
    recorded('rv-lge', {
      title: L('RV · transmurales Streifen-LGE', 'RV · transmural stria-pattern LGE', 'بطن راست · LGE نواری تمام‌ضخامت'),
      text: L('Mindestens eine Region: Einfluss- oder Ausflusstrakt, Apex.', 'At least one region: inlet, outlet or apex.', 'دست‌کم یک ناحیه: مسیر ورودی، خروجی یا اپکس.'),
    }),
    short('rv-lge-other', 'Eindeutiges RV-LGE außerhalb der Trikuspidalklappe, ohne Padua-Muster', 'Unequivocal RV LGE away from the tricuspid valve without the Padua pattern', 'LGE واضح در بطن راست خارج از دریچه تریکوسپید، بدون الگوی پادوا'),
    recorded('lv-lge', {
      title: L('LV · subepikardiales oder mittmyokardiales Streifen-LGE', 'LV · subepicardial or midmyocardial stria-pattern LGE', 'بطن چپ · LGE نواری زیر اپیکارد یا میان‌میوکاردی'),
      text: L('1–2 Segmente der freien Wand oder des Septums.', '1–2 free-wall or septal segments.', '۱ تا ۲ سگمان از دیوارهٔ آزاد یا سپتوم.'),
    }),
    option('lv-lge-extensive', L('LV · Streifen-LGE in mindestens 3 Segmenten', 'LV · stria-pattern LGE in at least 3 segments', 'بطن چپ · LGE نواری در دست‌کم ۳ سگمان'), L('Subepikardial oder mittmyokardial, ringförmig oder diskontinuierlich.', 'Subepicardial or midmyocardial, ring-like or discontinuous.', 'زیر اپیکارد یا میان‌میوکارد، حلقوی یا ناپیوسته.'), { padua: 'lv-lge' }),
  ], { hint: L("LGE zählt in beiden Systemen. Nachweis in zwei orthogonalen Ebenen. Isoliertes Insertions-LGE bleibt ohne Wertung.", "LGE counts in both systems. Confirm in two orthogonal views. Isolated junctional LGE does not count.", "LGE در هر دو سیستم حساب می‌شود. آن را در دو نمای عمود بر هم تأیید کنید. LGE محدود به محل اتصال بطن راست امتیاز ندارد.") }),
  question('biopsy', 'tissue', L("RV-Biopsie?", "RV biopsy?", "بیوپسی بطن راست؟"), [
    recorded('rv-biopsy'),
  ]),
  question('twi', 'ecg', L("T-Negativierungen?", "T-wave inversions?", "وارونگی موج T؟"), [
    short('v1-v3', 'V1–V3 oder weiter, ohne kompletten Rechtsschenkelblock', 'V1–V3 or beyond, without complete RBBB', 'V1–V3 یا فراتر، بدون بلوک کامل شاخهٔ راست'),
    short('v1-v2', 'V1–V2, ohne kompletten Rechtsschenkelblock', 'V1–V2, without complete RBBB', 'V1–V2، بدون بلوک کامل شاخهٔ راست'),
    short('v1-v4-rbbb', 'T-Negativierung über V3 hinaus bei komplettem Rechtsschenkelblock', 'T-wave inversion beyond V3 with complete RBBB', 'وارونگی موج T فراتر از V3 همراه با بلوک کامل شاخهٔ راست'),
    option('lateral-pattern', L('Linksthorakal V4–V6, ohne kompletten Linksschenkelblock', 'Left precordial V4–V6 without complete LBBB', 'V4–V6 چپ، بدون بلوک کامل شاخهٔ چپ'), null, { padua: 'lv-twi' }),
    short('v1-beyond-child', 'Unter 14 Jahren: T-Negativierung V1 bis mindestens V4', 'Under 14: T-wave inversion from V1 through at least V4', 'زیر ۱۴ سال: وارونگی موج T از V1 تا دست‌کم V4'),
  ], { hint: L("Bei durchgehender T-Negativierung ab V1 das rechtspräkordiale Muster wählen.", "For continuous T-wave inversion starting at V1, select the right precordial pattern.", "در وارونگی پیوسته از V1، الگوی پره‌کوردیال راست را انتخاب کنید.") }),
  question('age', 'ecg', L("Alter und Pubertät?", "Age and puberty?", "سن و بلوغ؟"), [
    short('age14', 'Mindestens 14 Jahre', 'Age 14 or older', '۱۴ سال یا بیشتر'),
    short('no-rbbb', 'Kein Rechtsschenkelblock (auch kein inkompletter)', 'No right bundle branch block, including incomplete RBBB', 'بدون بلوک شاخه راست، حتی نوع ناقص'),
    short('male', 'Männlich', 'Male', 'مرد'),
    short('no-j', 'Keine vorausgehende J-Punkt- oder ST-Hebung', 'No preceding J-point or ST elevation', 'بدون بالا رفتن پیشین نقطه J یا قطعه ST'),
    short('puberty', 'Pubertät abgeschlossen', 'Puberty completed', 'بلوغ کامل شده'),
  ], { visible: answers => any(answers, 'twi', repolRv) }),
  question('depolarization', 'conduction', L("QRS-Befunde?", "QRS findings?", "یافته‌های QRS؟"), [
    recorded('epsilon'),
    recorded('terminal-activation'),
    recorded('low-voltage'),
    short('low-voltage-all', 'QRS-Amplitude < 0,5 mV (Spitze zu Spitze) in allen Extremitätenableitungen ohne andere Ursache', 'QRS amplitude <0.5 mV peak-to-peak in all limb leads without another cause', 'دامنهٔ قله‌به‌قلهٔ QRS کمتر از ۰٫۵ میلی‌ولت در همهٔ لیدهای اندامی بدون علت دیگر'),
  ]),
  question('vt', 'rhythm', L("VT-Morphologie?", "VT morphology?", "مورفولوژی VT؟"), [
    option('vt-superior', L('Linksschenkelblockmuster mit superiorer Achse', 'LBBB pattern with superior axis', 'الگوی بلوک شاخهٔ چپ با محور فوقانی'), L('QRS in II, III und aVF negativ oder indeterminiert und in aVL positiv.', 'QRS negative or indeterminate in II, III and aVF and positive in aVL.', 'QRS در II، III و aVF منفی یا نامعین و در aVL مثبت است.'), { padua: 'rv-arrhythmia-major' }),
    option('vt-inferior', L('Linksschenkelblockmuster mit inferiorer Achse (RVOT)', 'LBBB pattern with inferior axis (RVOT)', 'الگوی بلوک شاخهٔ چپ با محور تحتانی (RVOT)'), null, { padua: 'rv-arrhythmia-minor' }),
    option('vt-other-axis', L('Linksschenkelblockmuster mit gesicherter Achse außerhalb des RVOT-Musters', 'LBBB pattern with documented axis outside the RVOT pattern', 'الگوی بلوک شاخهٔ چپ با محور مشخص خارج از الگوی RVOT'), L('Andere Achse als superior oder inferior.', 'Axis other than superior or inferior.', 'محوری غیر از فوقانی یا تحتانی.'), { padua: 'rv-arrhythmia-major' }),
    option('vt-unknown-axis', L('Linksschenkelblockmuster, Achse unbekannt', 'LBBB pattern, axis unknown', 'الگوی بلوک شاخهٔ چپ با محور نامشخص'), null, { incomplete: true }),
    option('vt-rbbb', L('Rechtsschenkelblockmuster ohne faszikuläre Morphologie', 'RBBB pattern without fascicular morphology', 'الگوی بلوک شاخهٔ راست بدون مورفولوژی فاسیکولار'), null, { padua: 'lv-arrhythmia' }),
  ], { hint: L("Anhaltende und nichtanhaltende VT zählen.", "Sustained and nonsustained VT both count.", "تاکی‌کاردی بطنی پایدار و غیرپایدار هر دو حساب می‌شوند.") }),
  question('pvc', 'rhythm', L("VES im Langzeit- oder Belastungs-EKG?", "PVCs on Holter or exercise ECG?", "اکستراسیستول بطنی در هولتر یا تست ورزش؟"), [
    option('pvc-rv', L('Linksschenkelblockmuster außerhalb des RVOT-Musters', 'LBBB pattern outside the RVOT pattern', 'الگوی بلوک شاخهٔ چپ خارج از الگوی RVOT'), null, { padua: 'rv-arrhythmia-major' }),
    option('pvc-rvot', L('Linksschenkelblockmuster mit inferiorer Achse (RVOT)', 'LBBB pattern with inferior axis (RVOT)', 'الگوی بلوک شاخهٔ چپ با محور تحتانی (RVOT)'), null, { padua: 'rv-arrhythmia-minor' }),
    option('pvc-lv', L('Rechtsschenkelblockmuster ohne faszikuläre Morphologie', 'RBBB pattern without fascicular morphology', 'الگوی بلوک شاخهٔ راست بدون مورفولوژی فاسیکولار'), null, { padua: 'lv-arrhythmia' }),
    short('pvc-exercise', 'Belastungsinduzierte VES mit nichtfaszikulärem Rechtsschenkelblockmuster', 'Exercise-induced PVCs with non-fascicular RBBB morphology', 'اکستراسیستول بطنی ناشی از ورزش با الگوی بلوک شاخه راست غیرفاسیکولار'),
    option('pvc-other', L('Andere Morphologie', 'another documented morphology', 'مورفولوژی دیگر و مشخص'), null),
    option('pvc-unknown', L('Morphologie unbekannt', 'morphology unknown', 'مورفولوژی نامشخص'), null, { incomplete: true }),
  ], { hint: L('Im Langzeit-EKG werden die genannten Morphologien bei > 500 VES in 24 Stunden gewertet. Für die Belastung gilt die separat aufgeführte Option.', 'For Holter findings, select the applicable morphology only with >500 PVCs in 24 hours. Exercise-induced PVCs have a separate option.', 'در هولتر، الگوهای بالا با بیش از ۵۰۰ اکستراسیستول بطنی در ۲۴ ساعت امتیاز می‌گیرند. برای تست ورزش گزینهٔ جداگانه وجود دارد.') }),
  question('arrest', 'rhythm', L('Überlebter Herzstillstand?', 'Resuscitated cardiac arrest?', 'ایست قلبی احیاشده؟'), [
    short('arrest-vf-vt', 'Kammerflimmern oder anhaltende VT unbekannter Morphologie', 'Ventricular fibrillation or sustained VT of unknown morphology', 'فیبریلاسیون بطنی یا VT پایدار با مورفولوژی نامشخص'),
  ]),
  question('genetics', 'family', L("Genvariante?", "Genetic variant?", "واریانت ژنتیکی؟"), [
    option('gene-arvc', L('Pathogene ACM-assoziierte Variante', 'Pathogenic ACM-associated variant', 'واریانت بیماری‌زای مرتبط با ACM'), null, { padua: 'gene' }),
    option('gene-acm', L('Wahrscheinlich pathogene ACM-assoziierte Variante', 'Likely pathogenic ACM-associated variant', 'واریانت احتمالاً بیماری‌زای مرتبط با ACM'), null, { padua: 'gene' }),
  ], { single: true, hint: L('Eine Variante unklarer Signifikanz (VUS) erfüllt kein Kriterium.', 'A variant of uncertain significance (VUS) does not meet a criterion.', 'واریانت با اهمیت نامشخص (VUS) معیار محسوب نمی‌شود.') }),
  question('family', 'family', L("Familienanamnese?", "Family history?", "سابقهٔ خانوادگی؟"), familyIds.map(id => recorded(id))),
]

export function questionsFor(answers) {
  return QUESTIONS.filter(item => !item.visible || item.visible(answers))
}

const paduaOnly = new Set(['bulging', 'lv-motion', 'rv-lge', 'puberty', 'low-voltage'])
const etfLgeTitle = L('Eindeutiges RV-LGE außerhalb der Trikuspidalklappe', 'Unequivocal RV LGE outside the tricuspid valve', 'LGE واضح در میوکارد بطن راست، خارج از دریچهٔ تریکوسپید')
const etfHints = {
  age: L('Für das gewählte T-Wellen-Muster alle zutreffenden Merkmale markieren.', 'Select all applicable features for the T-wave pattern.', 'همهٔ ویژگی‌های مربوط به الگوی موج T را انتخاب کنید.'),
  'rv-motion': L('Eine isolierte RV-Hypokinesie zählt bei ETF nicht.', 'Isolated RV hypokinesia does not count in ETF.', 'هیپوکینزی منفرد بطن راست در ETF معیار محسوب نمی‌شود.'),
  'rv-global': L('Volumen und EF anhand geeigneter Referenzwerte für Methode, Alter und Geschlecht beurteilen. Das Volumen auf die Körperoberfläche beziehen.', 'Use reference ranges appropriate for method, age and sex. Index volume to body surface area.', 'حجم و EF را با مقادیر مرجع متناسب با روش تصویربرداری، سن و جنس بسنجید. حجم را بر اساس سطح بدن (BSA) شاخص‌گذاری کنید.'),
  lge: L('Das jeweilige Muster in zwei orthogonalen Ebenen bestätigen. Fokales oder fleckiges LV-LGE sowie isoliertes Insertions-LGE bleiben unberücksichtigt.', 'Confirm each pattern in two orthogonal views. Exclude focal or patchy LV LGE and isolated junctional LGE.', 'الگو را در دو نمای عمود بر هم تأیید کنید. LGE کانونی یا لکه‌ای بطن چپ و LGE محدود به محل اتصال بطن راست امتیاز ندارند.'),
}
export function etfQuestionsFor(answers) {
  return questionsFor(answers)
    .filter(item => item.id !== 'age' || any(answers, 'twi', ['v1-v2', 'v1-v3']))
    .map(item => ({
      ...item,
      title: item.id === 'age' ? L('Alter und EKG-Merkmale?', 'Age and ECG features?', 'سن و ویژگی‌های نوار قلب؟') : item.title,
      hint: etfHints[item.id] ?? item.hint,
      options: item.options
        .filter(choice => !paduaOnly.has(choice.id))
        .filter(choice => item.id !== 'age' || has(answers, 'twi', 'v1-v2') || !['male', 'no-rbbb'].includes(choice.id))
        .map(choice => choice.id === 'rv-lge-other' ? { ...choice, title: etfLgeTitle } : choice),
    }))
}

const exclusiveChoices = {
  twi: [[...repolRv, 'v1-beyond-child']],
  lge: [['rv-lge', 'rv-lge-other'], ['lv-lge', 'lv-lge-extensive']],
  depolarization: [['low-voltage', 'low-voltage-all']],
}

export function selectFinding(item, current, id) {
  if (current.includes(id)) return current.filter(value => value !== id)
  if (item.single || id === 'none' || id === 'unknown') return [id]
  const exclusive = exclusiveChoices[item.id]?.find(group => group.includes(id)) || []
  return [...current.filter(value => value !== 'none' && value !== 'unknown' && !exclusive.includes(value)), id]
}

export function isReviewed(item, answers) {
  return Boolean(answers[item.id]?.length) && !has(answers, item.id, 'unknown')
    && !item.options.some(choice => choice.incomplete && has(answers, item.id, choice.id))
}

const criterionCategory = new Map(categories.flatMap(category => category.criteria.map(item => [item.id, category.id])))
const etfCategory = {
  'lv-lge-extensive': 'tissue',
  'v1-beyond-child': 'repolarization',
  'low-voltage-all': 'depolarization',
  'pvc-exercise': 'arrhythmia',
  'arrest-vf-vt': 'arrhythmia',
}

function collectFindings(answers) {
  const padua = new Set()
  const etf = new Map()
  function add(id, grade, side, title) {
    const definition = criteria.get(id)
    etf.set(id, { id, grade: grade ?? definition.grade, side: side ?? definition.side, text: title ?? definition.text, category: etfCategory[id] ?? criterionCategory.get(id) })
  }
  function addCustom(id, grade, side, question) {
    const choice = QUESTIONS.find(item => item.id === question).options.find(option => option.id === id)
    const text = choice.text
      ? L(...['de', 'en', 'fa'].map(lang => choice.title[lang] + '. ' + choice.text[lang]))
      : choice.title
    add(id, grade, side, text)
  }

  for (const item of questionsFor(answers)) {
    for (const choice of item.options) {
      if (!has(answers, item.id, choice.id)) continue
      if (choice.padua) padua.add(choice.padua)
    }
  }
  const global = any(answers, 'rv-global', ['dilated', 'dysfunction'])
  const minorMotion = any(answers, 'rv-motion', ['ak-dys-free', 'aneurysm'])
  if (global && any(answers, 'rv-motion', regionPadua)) padua.add('rv-function')
  if (minorMotion) padua.add('rv-motion')

  for (const [index, id] of repolRv.entries()) {
    if (has(answers, 'twi', id) && has(answers, 'age', 'puberty')) padua.add(['rv-twi-major', 'rv-twi-minor', 'rv-twi-rbbb'][index])
  }
  if (has(answers, 'depolarization', 'low-voltage-all')) padua.add('low-voltage')

  const etfExcluded = new Set(['rv-function', 'rv-motion', 'lv-motion', 'lv-lge', 'rv-lge', 'low-voltage', 'gene', 'rv-twi-major', 'rv-twi-minor', 'rv-twi-rbbb'])
  for (const id of padua) if (!etfExcluded.has(id)) add(id)
  if (minorMotion) add('rv-motion')
  if (global && any(answers, 'rv-motion', ['ak-dys-free', 'ak-dys-other', 'aneurysm'])) {
    add('rv-function', 2, 'rv', L('Regionale RV-Akinesie, Dyskinesie oder Aneurysma plus globale RV-Dilatation oder verminderte RVEF.', 'Regional RV akinesia, dyskinesia or aneurysm with global RV dilatation or reduced RVEF.', 'آکینزی، دیسکینزی یا آنوریسم موضعی بطن راست همراه با اتساع کلی بطن راست یا کاهش کسر جهشی آن (RVEF).'))
  }
  if (has(answers, 'lge', 'rv-lge') || has(answers, 'lge', 'rv-lge-other')) {
    add('rv-lge', 1, 'rv', L('Eindeutiges RV-LGE in mindestens einer Region, in zwei orthogonalen Ebenen bestätigt (Trikuspidalklappe ausgenommen).', 'Unequivocal RV LGE in at least one region in two orthogonal planes, excluding the tricuspid valve.', 'LGE واضح در بطن راست در دست‌کم یک ناحیه و دو نمای عمود، به‌جز دریچه تریکوسپید.'))
  }
  if (has(answers, 'lge', 'lv-lge')) addCustom('lv-lge', 1, 'lv', 'lge')
  if (has(answers, 'lge', 'lv-lge-extensive')) addCustom('lv-lge-extensive', 2, 'lv', 'lge')
  const adultWithoutElevation = has(answers, 'age', 'age14') && has(answers, 'age', 'no-j')
  if (adultWithoutElevation && has(answers, 'twi', 'v1-v3')) add('rv-twi-major', 2, 'rv', L('T-Negativierung V1–V3 oder weiter ab 14 Jahren, ohne kompletten RSB und ohne vorausgehende J-/ST-Hebung.', 'T-wave inversion in V1–V3 or beyond at age ≥14 without complete RBBB or preceding J/ST elevation.', 'وارونگی موج T در لیدهای V1 تا V3 یا فراتر، در سن ۱۴ سال به بالا، بدون بلوک کامل شاخهٔ راست یا بالارفتن نقطهٔ J یا قطعهٔ ST پیش از موج T.'))
  if (adultWithoutElevation && has(answers, 'age', 'male') && has(answers, 'age', 'no-rbbb') && has(answers, 'twi', 'v1-v2')) {
    add('rv-twi-minor', 1, 'rv', L('T-Negativierung V1–V2 bei Männern ab 14 Jahren, ohne RSB und ohne vorausgehende J-/ST-Hebung.', 'T-wave inversion in V1–V2 in males aged ≥14 without RBBB or preceding J/ST elevation.', 'وارونگی موج T در لیدهای V1 و V2 در مردان ۱۴ ساله و بالاتر، بدون بلوک شاخهٔ راست یا بالارفتن نقطهٔ J یا قطعهٔ ST پیش از موج T.'))
  }
  if (has(answers, 'twi', 'v1-v4-rbbb')) add('rv-twi-rbbb', 1, 'rv', QUESTIONS.find(item => item.id === 'twi').options.find(choice => choice.id === 'v1-v4-rbbb').title)
  if (has(answers, 'twi', 'v1-beyond-child')) addCustom('v1-beyond-child', 1, 'rv', 'twi')
  if (has(answers, 'depolarization', 'low-voltage-all')) addCustom('low-voltage-all', 2, 'lv', 'depolarization')
  if (has(answers, 'pvc', 'pvc-exercise')) addCustom('pvc-exercise', 1, 'lv', 'pvc')
  if (has(answers, 'arrest', 'arrest-vf-vt')) addCustom('arrest-vf-vt', 1, 'shared', 'arrest')
  if (has(answers, 'genetics', 'gene-arvc')) add('gene', 2, 'shared', QUESTIONS.find(item => item.id === 'genetics').options[0].title)
  if (has(answers, 'genetics', 'gene-acm')) add('gene', 1, 'shared', QUESTIONS.find(item => item.id === 'genetics').options[1].title)

  return { etf, padua }
}

export function evaluateEtf(answers) {
  return assessEuropeanTaskForce(collectFindings(answers).etf)
}

export function evaluateFindings(answers) {
  const { etf, padua } = collectFindings(answers)
  return { etf: assessEuropeanTaskForce(etf), padua: assessPadua(padua) }
}
