const L = (de, en, fa) => ({ de, en, fa })
const item = (id, side, grade, de, en, fa) => ({ id, side, grade, text: L(de, en, fa) })

export const criterionTitles = {
  'rv-function': L("Wandbewegungsstörung mit RV-Dilatation oder Dysfunktion", "Wall motion abnormality with RV dilatation or dysfunction", "اختلال حرکت دیواره همراه با اتساع یا اختلال عملکرد بطن راست"),
  'rv-motion': L("Regionale Störung der freien RV-Wand", "Regional RV free-wall abnormality", "اختلال موضعی دیوارهٔ آزاد بطن راست"),
  'lv-function': L("Globale systolische Dysfunktion", "Global systolic dysfunction", "اختلال کلی عملکرد سیستولی"),
  'lv-motion': L("Regionale Wandbewegungsstörung", "Regional wall motion abnormality", "اختلال موضعی حرکت دیواره"),
  'rv-lge': L("Transmurales RV-LGE", "Transmural RV LGE", "LGE تمام‌ضخامت بطن راست"),
  'rv-biopsy': L("Fibrose in der RV-Biopsie", "Fibrosis in RV biopsy", "فیبروز در بیوپسی بطن راست"),
  'lv-lge': L("Nichtischämisches LV-LGE", "Non-ischaemic LV LGE", "LGE غیرایسکمیک بطن چپ"),
  'rv-twi-major': L("T-Inversionen V1–V3 oder weiter", "T-wave inversion in V1–V3 or beyond", "وارونگی T در V1–V3 یا فراتر"),
  'rv-twi-minor': L("T-Inversionen V1–V2", "T-wave inversion in V1–V2", "وارونگی T در V1–V2"),
  'rv-twi-rbbb': L("T-Inversionen bei Rechtsschenkelblock", "T-wave inversion with right bundle branch block", "وارونگی T همراه با بلوک شاخهٔ راست"),
  'lv-twi': L("T-Inversionen V4–V6", "T-wave inversion in V4–V6", "وارونگی T در V4–V6"),
  'epsilon': L("Epsilon-Welle", "Epsilon wave", "موج اپسیلون"),
  'terminal-activation': L("Verlängerte terminale Aktivierung", "Prolonged terminal activation", "طولانی‌شدن فعال‌سازی انتهایی"),
  'low-voltage': L("QRS-Niedervoltage", "Low QRS voltage", "ولتاژ پایین QRS"),
  'rv-arrhythmia-major': L("Linksschenkelblockmuster außerhalb des RVOT", "LBBB pattern outside the RVOT", "الگوی بلوک شاخهٔ چپ خارج از RVOT"),
  'rv-arrhythmia-minor': L("RVOT-Muster", "RVOT pattern", "الگوی RVOT"),
  'lv-arrhythmia': L("Rechtsschenkelblockmuster", "RBBB pattern", "الگوی بلوک شاخهٔ راست"),
  'gene': L("Pathogene ACM-Genvariante", "Pathogenic ACM variant", "واریانت بیماری‌زای مرتبط با ACM"),
  'family-definite': L("Gesicherte ACM bei erstgradig Verwandten", "Definite ACM in a first-degree relative", "ACM قطعی در بستگان درجهٔ اول"),
  'family-pathology': L("Pathologisch bestätigte ACM bei erstgradig Verwandten", "Pathology-confirmed ACM in a first-degree relative", "ACM تأییدشده با پاتولوژی در بستگان درجهٔ اول"),
  'family-suspected': L("ACM in der Familie anamnestisch bekannt", "Reported family history of ACM", "سابقهٔ گزارش‌شدهٔ ACM در خانواده"),
  'family-sudden': L("Plötzlicher Tod vor 35 Jahren", "Sudden death before age 35", "مرگ ناگهانی پیش از ۳۵ سالگی"),
  'family-second': L("Gesicherte ACM bei zweitgradig Verwandten", "Confirmed ACM in a second-degree relative", "ACM تأییدشده در بستگان درجهٔ دوم"),
}

export const categories = [
  {
    id: 'function', number: 'I',
    title: L('Form und Funktion', 'Morphology and function', 'شکل و عملکرد'),
    hint: L('Befunde aus Echo, Cine-MRT oder Ventrikulografie. Volumen und systolische Funktion anhand passender Referenzwerte einordnen.', 'Use echocardiography, cine MRI, or ventriculography. Compare volume and systolic function with appropriate reference values.', 'از اکو، Cine MRI یا ونتریکولوگرافی استفاده کنید. حجم و عملکرد سیستولی را با مقادیر مرجع مناسب بسنجید.'),
    criteria: [
      item('rv-function', 'rv', 2, 'Regionale RV-Akinesie, Dyskinesie oder Ausbuchtung plus RV-Dilatation oder globale systolische RV-Dysfunktion.', 'Regional RV akinesia, dyskinesia, or bulging plus RV dilatation or global systolic RV dysfunction.', 'آکینزی، دیسکینزی یا برجستگی موضعی بطن راست همراه با اتساع یا اختلال کلی عملکرد سیستولی بطن راست.'),
      item('rv-motion', 'rv', 1, 'Regionale Akinesie, Dyskinesie oder Aneurysma der freien RV-Wand.', 'Regional akinesia, dyskinesia, or aneurysm of the RV free wall.', 'آکینزی، دیسکینزی یا آنوریسم موضعی دیوارهٔ آزاد بطن راست.'),
      item('lv-function', 'lv', 1, 'Globale systolische LV-Dysfunktion (verminderte LVEF oder reduzierter GLS in der Echokardiografie), mit oder ohne LV-Dilatation.', 'Global LV systolic dysfunction (reduced LVEF or echocardiographic GLS), with or without LV dilatation.', 'اختلال کلی عملکرد سیستولی بطن چپ (کاهش LVEF یا کاهش GLS در اکو)، با یا بدون اتساع بطن چپ.'),
      item('lv-motion', 'lv', 1, 'Regionale Hypokinesie oder Akinesie der freien LV-Wand, des Septums oder beider Bereiche.', 'Regional hypokinesia or akinesia of the LV free wall, septum, or both.', 'هیپوکینزی یا آکینزی موضعی دیوارهٔ آزاد بطن چپ، سپتوم یا هر دو.'),
    ],
  },
  {
    id: 'tissue', number: 'II',
    title: L('Myokardgewebe', 'Myocardial tissue', 'بافت میوکارد'),
    hint: L('LGE in zwei orthogonalen Ebenen bestätigen. Die Biopsie ist ausgewählten Fällen vorbehalten.', 'Confirm LGE in two orthogonal planes. Biopsy is reserved for selected cases.', 'LGE را در دو نمای عمود بر هم تأیید کنید. بیوپسی برای موارد منتخب است.'),
    criteria: [
      item('rv-lge', 'rv', 2, 'Transmurales Streifen-LGE in mindestens einer RV-Region (Einflusstrakt, Ausflusstrakt oder Apex), bestätigt in zwei orthogonalen Ebenen.', 'Transmural stria-like LGE in at least one RV region (inlet, outflow tract, or apex), confirmed in two orthogonal planes.', 'LGE نواری تمام‌ضخامت در دست‌کم یک ناحیهٔ بطن راست (مسیر ورودی، خروجی یا اپکس)، تأییدشده در دو نمای عمود بر هم.'),
      item('rv-biopsy', 'rv', 2, 'Fibrotischer Myokardersatz in mindestens einer RV-Biopsieprobe, mit oder ohne Fettgewebe.', 'Fibrous myocardial replacement in at least one RV biopsy sample, with or without fat.', 'جایگزینی میوکارد با فیبروز در دست‌کم یک نمونهٔ بیوپسی بطن راست، با یا بدون بافت چربی.'),
      item('lv-lge', 'lv', 2, 'Subepikardiales oder mittmyokardiales Streifen-LGE in mindestens einem Segment der freien LV-Wand oder des Septums, bestätigt in zwei orthogonalen Ebenen. Isoliertes LGE an RV-Insertionspunkten zählt nicht.', 'Subepicardial or mid-wall stria-like LGE in at least one LV free-wall or septal segment, confirmed in two orthogonal planes. Isolated RV insertion-point LGE is excluded.', 'LGE نواری زیر اپی‌کارد یا میان‌دیواره‌ای در دست‌کم یک سگمان دیوارهٔ آزاد بطن چپ یا سپتوم، تأییدشده در دو نمای عمود بر هم. LGE محدود به نقاط اتصال بطن راست حساب نمی‌شود.'),
    ],
  },
  {
    id: 'repolarization', number: 'III',
    title: L('Repolarisation im EKG', 'ECG repolarization', 'رپلاریزاسیون در نوار قلب'),
    hint: L('Rechtspräkordiale T-Inversionen erst nach abgeschlossener Pubertät werten.', 'Count right precordial T-wave inversion after puberty is complete.', 'وارونگی موج T در لیدهای پره‌کوردیال راست را پس از تکمیل بلوغ حساب کنید.'),
    criteria: [
      item('rv-twi-major', 'rv', 2, 'T-Inversionen in V1–V3 oder darüber hinaus nach abgeschlossener Pubertät, ohne kompletten Rechtsschenkelblock.', 'T-wave inversion in V1–V3 or beyond after completed puberty, without complete right bundle branch block.', 'وارونگی موج T در V1–V3 یا فراتر از آن، پس از تکمیل بلوغ و بدون بلوک کامل شاخهٔ راست.'),
      item('rv-twi-minor', 'rv', 1, 'T-Inversionen in V1–V2 nach abgeschlossener Pubertät, ohne kompletten Rechtsschenkelblock.', 'T-wave inversion in V1–V2 after completed puberty, without complete right bundle branch block.', 'وارونگی موج T در V1–V2 پس از تکمیل بلوغ، بدون بلوک کامل شاخهٔ راست.'),
      item('rv-twi-rbbb', 'rv', 1, 'T-Inversionen in V1–V4 nach abgeschlossener Pubertät, bei komplettem Rechtsschenkelblock.', 'T-wave inversion in V1–V4 after completed puberty, with complete right bundle branch block.', 'وارونگی موج T در V1–V4 پس از تکمیل بلوغ، همراه با بلوک کامل شاخهٔ راست.'),
      item('lv-twi', 'lv', 1, 'T-Inversionen in V4–V6 ohne kompletten Linksschenkelblock.', 'T-wave inversion in V4–V6 without complete left bundle branch block.', 'وارونگی موج T در V4–V6 بدون بلوک کامل شاخهٔ چپ.'),
    ],
  },
  {
    id: 'depolarization', number: 'IV',
    title: L('Depolarisation im EKG', 'ECG depolarization', 'دپلاریزاسیون در نوار قلب'),
    criteria: [
      item('epsilon', 'rv', 1, 'Reproduzierbare Epsilon-Welle zwischen QRS-Ende und Beginn der T-Welle in V1–V3.', 'Reproducible epsilon wave between the end of QRS and the onset of the T wave in V1–V3.', 'موج اپسیلون تکرارپذیر بین پایان QRS و آغاز موج T در V1–V3.'),
      item('terminal-activation', 'rv', 1, 'Terminale Aktivierungsdauer ≥ 55 ms in V1, V2 oder V3, vom S-Tiefpunkt bis zum QRS-Ende einschließlich R′, ohne kompletten Rechtsschenkelblock.', 'Terminal activation duration ≥55 ms in V1, V2, or V3 from the S-wave nadir to the end of QRS including R′, without complete right bundle branch block.', 'مدت فعال‌سازی انتهایی ≥ ۵۵ میلی‌ثانیه در V1، V2 یا V3، از پایین‌ترین نقطهٔ S تا انتهای QRS شامل R′، بدون بلوک کامل شاخهٔ راست.'),
      item('low-voltage', 'lv', 1, 'QRS-Niedervoltage < 0,5 mV (Spitze zu Spitze) in allen Extremitätenableitungen, ohne Adipositas, Emphysem oder Perikarderguss.', 'Peak-to-peak QRS voltage <0.5 mV in all limb leads, in the absence of obesity, emphysema, or pericardial effusion.', 'ولتاژ قله‌به‌قلهٔ QRS کمتر از ۰٫۵ میلی‌ولت در همهٔ لیدهای اندامی، بدون چاقی، آمفیزم یا افیوژن پریکارد.'),
    ],
  },
  {
    id: 'arrhythmia', number: 'V',
    title: L('Ventrikuläre Arrhythmien', 'Ventricular arrhythmias', 'آریتمی‌های بطنی'),
    hint: L('Bei Extrasystolen sind Anzahl und QRS-Morphologie erforderlich. Bei einer nichtanhaltenden oder anhaltenden VT zählt die passende Morphologie.', 'PVCs require both the relevant count and QRS morphology. For non-sustained or sustained VT, use the qualifying morphology.', 'برای ضربان‌های زودرس بطنی، تعداد و شکل QRS اهمیت دارد. در VT پایدار یا ناپایدار، شکل واجد معیار را در نظر بگیرید.'),
    criteria: [
      item('rv-arrhythmia-major', 'rv', 2, 'Mehr als 500 ventrikuläre Extrasystolen pro 24 h oder nichtanhaltende bzw. anhaltende VT mit Linksschenkelblockmorphologie außerhalb des RVOT-Musters (typischerweise superiore Achse).', 'More than 500 PVCs per 24 h or non-sustained or sustained VT with left bundle branch block morphology outside the RVOT pattern (typically a superior axis).', 'بیش از ۵۰۰ ضربان زودرس بطنی در ۲۴ ساعت یا VT پایدار یا ناپایدار با نمای بلوک شاخهٔ چپ خارج از الگوی RVOT (معمولاً محور فوقانی).'),
      item('rv-arrhythmia-minor', 'rv', 1, 'Mehr als 500 ventrikuläre Extrasystolen pro 24 h oder nichtanhaltende bzw. anhaltende VT mit Linksschenkelblockmorphologie und inferiorer Achse (RVOT-Muster).', 'More than 500 PVCs per 24 h or non-sustained or sustained VT with left bundle branch block morphology and an inferior axis (RVOT pattern).', 'بیش از ۵۰۰ ضربان زودرس بطنی در ۲۴ ساعت یا VT پایدار یا ناپایدار با نمای بلوک شاخهٔ چپ و محور تحتانی (الگوی RVOT).'),
      item('lv-arrhythmia', 'lv', 1, 'Mehr als 500 ventrikuläre Extrasystolen pro 24 h oder nichtanhaltende bzw. anhaltende VT mit Rechtsschenkelblockmorphologie. Faszikuläre Muster zählen nicht.', 'More than 500 PVCs per 24 h or non-sustained or sustained VT with right bundle branch block morphology. Fascicular patterns are excluded.', 'بیش از ۵۰۰ ضربان زودرس بطنی در ۲۴ ساعت یا VT پایدار یا ناپایدار با نمای بلوک شاخهٔ راست. الگوهای فاسیکولار حساب نمی‌شوند.'),
    ],
  },
  {
    id: 'family', number: 'VI',
    title: L('Familie und Genetik', 'Family history and genetics', 'سابقهٔ خانوادگی و ژنتیک'),
    criteria: [
      item('gene', 'shared', 2, 'Pathogene oder wahrscheinlich pathogene ACM-assoziierte Genvariante bei der untersuchten Person.', 'Pathogenic or likely pathogenic ACM-associated genetic variant in the person being assessed.', 'واریانت بیماری‌زا یا احتمالاً بیماری‌زای مرتبط با ACM در فرد مورد بررسی.'),
      item('family-definite', 'shared', 2, 'ACM nach diagnostischen Kriterien bei einem erstgradig Verwandten gesichert.', 'ACM confirmed by diagnostic criteria in a first-degree relative.', 'ACM تأییدشده بر اساس معیارهای تشخیصی در یکی از بستگان درجهٔ اول.'),
      item('family-pathology', 'shared', 2, 'ACM bei einem erstgradig Verwandten durch Autopsie oder Operationspräparat bestätigt.', 'ACM confirmed at autopsy or surgery in a first-degree relative.', 'ACM تأییدشده با کالبدگشایی یا نمونهٔ جراحی در یکی از بستگان درجهٔ اول.'),
      item('family-suspected', 'shared', 1, 'ACM bei einem erstgradig Verwandten anamnestisch bekannt, aber diagnostisch nicht überprüfbar.', 'Reported ACM in a first-degree relative whose diagnostic criteria cannot be verified.', 'سابقهٔ گزارش‌شدهٔ ACM در یکی از بستگان درجهٔ اول که معیارهای تشخیصی او قابل بررسی نیست.'),
      item('family-sudden', 'shared', 1, 'Plötzlicher Tod vor dem 35. Lebensjahr bei einem erstgradig Verwandten mit Verdacht auf ACM.', 'Sudden death before age 35 in a first-degree relative with suspected ACM.', 'مرگ ناگهانی پیش از ۳۵ سالگی در یکی از بستگان درجهٔ اول با شک به ACM.'),
      item('family-second', 'shared', 1, 'ACM bei einem zweitgradig Verwandten nach diagnostischen Kriterien oder pathologisch bestätigt.', 'ACM confirmed by diagnostic criteria or pathology in a second-degree relative.', 'ACM تأییدشده با معیارهای تشخیصی یا پاتولوژی در یکی از بستگان درجهٔ دوم.'),
    ],
  },
]

export function assessPadua(selected) {
  const found = categories.map(category => ({
    id: category.id,
    matches: category.criteria.filter(criterion => selected.has(criterion.id)),
  }))
  const cardiac = found.slice(0, 2).flatMap(category => category.matches)
  const rv = cardiac.some(criterion => criterion.side === 'rv')
  const lv = cardiac.some(criterion => criterion.side === 'lv')
  const phenotype = rv ? (lv ? 'biventricular' : 'right') : lv ? 'left' : 'none'
  const hasLge = selected.has('lv-lge')
  const hasGene = selected.has('gene')

  const breakdown = found.map(category => {
    const eligible = phenotype === 'right' ? category.matches.filter(criterion => criterion.side !== 'lv') : category.matches
    const points = Math.max(0, ...eligible.map(criterion => criterion.grade))
    return { ...category, eligible, points }
  })

  if (phenotype === 'none') return { phenotype, outcome: 'noAnchor', points: null, breakdown }
  if (phenotype === 'left') {
    return { phenotype, outcome: hasLge && hasGene ? 'alvcMet' : 'alvcMissing', hasLge, hasGene, points: null, breakdown }
  }
  const points = breakdown.reduce((sum, category) => sum + category.points, 0)
  const outcome = points >= 4 ? 'definite' : points === 3 ? 'borderline' : points === 2 ? 'possible' : 'belowThreshold'
  return { phenotype, outcome, points, breakdown }
}
