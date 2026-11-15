import { assessPadua, categories, criterionTitles } from './criteria.mjs'
import { gradeTfcCmrMeasurements } from '../thorax/kardio/arvc/criteriaLogic.mjs'

export const L = (de, en, fa) => ({ de, en, fa })
const criteria = new Map(categories.flatMap(category => category.criteria.map(item => [item.id, item])))
const option = (id, title, text, rules = {}) => ({ id, title, text, ...rules })
const recorded = (id, rules = {}) => option(id, criterionTitles[id], criteria.get(id).text, { padua: id, ...rules })
const tfc = (category, grade) => ({ tfc: { category, grade } })
const short = (id, de, en, fa) => option(id, L(de, en, fa))
const question = (id, group, title, options, extra = {}) => ({ id, group, title, options, ...extra })
const has = (answers, id, value) => answers[id]?.includes(value) ?? false
const any = (answers, id, values) => values.some(value => has(answers, id, value))
const regionTfc = ['ak-dys-free', 'ak-dys-other', 'dyssync']
const regionPadua = ['ak-dys-free', 'ak-dys-other', 'bulging']
const repolRv = ['v1-v3', 'v1-v2', 'v1-v4-rbbb']
const familyIds = ['family-definite', 'family-pathology', 'family-suspected', 'family-sudden', 'family-second']

export const GROUPS = {
  cine: L('Cine-MRT', 'Cine MRI', 'Cine MRI'),
  tissue: L('LGE & Zusatzbefunde', 'LGE & additional tests', 'LGE و بررسی تکمیلی'),
  ecg: L('EKG', 'ECG', 'نوار قلب'),
  rhythm: L('Rhythmus', 'Rhythm', 'ریتم'),
  family: L('Familie & Genetik', 'Family & genetics', 'خانواده و ژنتیک'),
}

const QUESTIONS = [
  question('rv-motion', 'cine', L('Wie bewegt sich die rechte Kammer im Cine?', 'How does the right ventricle move on cine?', 'بطن راست در Cine چگونه حرکت می‌کند؟'), [
    short('ak-dys-free', 'Akinesie oder Dyskinesie der freien RV-Wand', 'Akinesia or dyskinesia of the RV free wall', 'آکینزی یا دیسکینزی دیوارهٔ آزاد بطن راست'),
    short('ak-dys-other', 'Akinesie oder Dyskinesie in einem anderen RV-Abschnitt', 'Akinesia or dyskinesia in another RV region', 'آکینزی یا دیسکینزی در ناحیهٔ دیگری از بطن راست'),
    short('aneurysm', 'Aneurysma der freien RV-Wand', 'Aneurysm of the RV free wall', 'آنوریسم دیوارهٔ آزاد بطن راست'),
    short('bulging', 'Regionale Ausbuchtung', 'Regional bulging', 'برجستگی موضعی'),
    short('dyssync', 'Dyssynchrone RV-Kontraktion', 'Dyssynchronous RV contraction', 'انقباض ناهماهنگ بطن راست'),
  ], { hint: L('Nur gesicherte regionale Befunde markieren. Eine isolierte Hypokinesie gehört hier zu „Keiner dieser Befunde“.', 'Select established regional findings only. Use “None of these findings” for isolated hypokinesia.', 'فقط یافته‌های موضعی قطعی را انتخاب کنید. برای هیپوکینزی منفرد، «هیچ‌کدام» را بزنید.') }),
  question('rv-values', 'cine', L('Welche RV-Messwerte liegen vor?', 'Which RV measurements are available?', 'کدام اندازه‌گیری‌های بطن راست ثبت شده‌اند؟'), [], {
    type: 'measurements',
    visible: answers => any(answers, 'rv-motion', regionTfc),
  }),
  question('rv-global', 'cine', L('Ist der RV insgesamt vergrößert oder systolisch eingeschränkt?', 'Is the RV globally enlarged or systolically impaired?', 'آیا بطن راست به‌طور کلی متسع است یا اختلال سیستولی دارد؟'), [
    short('dilated', 'RV-Volumen über der Referenzgrenze', 'RV volume above the reference limit', 'حجم بطن راست بالاتر از محدودهٔ مرجع'),
    short('dysfunction', 'RVEF unter der Referenzgrenze', 'RVEF below the reference limit', 'RVEF پایین‌تر از محدودهٔ مرجع'),
  ], {
    visible: answers => any(answers, 'rv-motion', regionPadua),
    hint: L('Für Padua gelten Referenzwerte für die Messmethode, das Alter und das Geschlecht. Beim Volumen die Körperoberfläche berücksichtigen.', 'For Padua, use technique-, age- and sex-appropriate reference values. Account for body surface area for volume.', 'برای پادوا از مقادیر مرجع متناسب با روش، سن و جنس استفاده کنید. برای حجم، سطح بدن را هم در نظر بگیرید.'),
  }),
  question('lv-function', 'cine', L('Was fällt an der linken Kammer auf?', 'What is abnormal in the left ventricle?', 'چه یافته‌ای در بطن چپ وجود دارد؟'), [
    recorded('lv-function'), recorded('lv-motion'),
  ], { hint: L('Befunde aus Cine-MRT oder einer anderen geeigneten Untersuchung können hier eingetragen werden.', 'Use findings from cine MRI or another suitable examination.', 'یافته‌های Cine MRI یا بررسی مناسب دیگری را وارد کنید.') }),
  question('lge', 'tissue', L('Welches Narbenmuster wurde im LGE bestätigt?', 'Which scar pattern was confirmed on LGE?', 'کدام الگوی اسکار در LGE تأیید شده است؟'), [
    recorded('rv-lge'), recorded('lv-lge'),
  ], { hint: L('Beide Muster müssen in zwei orthogonalen Ebenen sichtbar sein. Isoliertes Insertions-LGE, ein Infarktmuster oder Fett allein gehören zu „Keiner dieser Befunde“.', 'Both patterns require two orthogonal views. Use “None of these findings” for isolated insertion-point LGE, an infarct pattern, or fat alone.', 'هر دو الگو باید در دو نمای عمود بر هم دیده شوند. برای LGE محدود به محل اتصال، الگوی انفارکتوس یا چربی به‌تنهایی، «هیچ‌کدام» را بزنید.') }),
  question('other-imaging', 'tissue', L('Gibt es zusätzliche RV-Befunde im Echo oder im Ventrikulogramm?', 'Are there additional RV findings on echo or ventriculography?', 'آیا در اکو یا ونتریکولوگرافی یافتهٔ دیگری در بطن راست وجود دارد؟'), [
    option('echo-major', L('Echo mit deutlich auffälligen Messwerten', 'Echo with markedly abnormal measurements', 'اکو با اندازه‌گیری‌های به‌وضوح غیرطبیعی'), L('Regionale RV-Akinesie, Dyskinesie oder Aneurysma plus mindestens ein enddiastolischer Grenzwert. RVOT-PLAX ≥ 32 mm (≥ 19 mm/m²), RVOT-PSAX ≥ 36 mm (≥ 21 mm/m²) oder FAC ≤ 33 %.', 'Regional RV akinesia, dyskinesia, or aneurysm plus at least one end-diastolic threshold. RVOT PLAX ≥32 mm (≥19 mm/m²), RVOT PSAX ≥36 mm (≥21 mm/m²), or FAC ≤33%.', 'آکینزی، دیسکینزی یا آنوریسم موضعی همراه با یکی از موارد: RVOT در PLAX ≥۳۲ میلی‌متر (≥۱۹ میلی‌متر بر متر مربع)، در PSAX ≥۳۶ (≥۲۱ نسبت به سطح بدن)، یا FAC ≤۳۳٪.'), tfc('function', 2)),
    option('echo-minor', L('Echo mit mäßig auffälligen Messwerten', 'Echo with moderately abnormal measurements', 'اکو با اندازه‌گیری‌های نسبتاً غیرطبیعی'), L('Regionale RV-Akinesie oder Dyskinesie plus RVOT-PLAX 29 bis < 32 mm (16 bis < 19 mm/m²), RVOT-PSAX 32 bis < 36 mm (18 bis < 21 mm/m²) oder FAC > 33 bis ≤ 40 %.', 'Regional RV akinesia or dyskinesia plus RVOT PLAX 29 to <32 mm (16 to <19 mm/m²), RVOT PSAX 32 to <36 mm (18 to <21 mm/m²), or FAC >33% to ≤40%.', 'آکینزی یا دیسکینزی موضعی همراه با RVOT در PLAX از ۲۹ تا کمتر از ۳۲ (شاخص ۱۶ تا کمتر از ۱۹)، در PSAX از ۳۲ تا کمتر از ۳۶ (شاخص ۱۸ تا کمتر از ۲۱)، یا FAC بیش از ۳۳٪ تا ۴۰٪.'), tfc('function', 1)),
    option('angio', L('Auffällige RV-Ventrikulografie', 'Abnormal RV ventriculography', 'ونتریکولوگرافی غیرطبیعی بطن راست'), L('Regionale RV-Akinesie, Dyskinesie oder Aneurysma.', 'Regional RV akinesia, dyskinesia, or aneurysm.', 'آکینزی، دیسکینزی یا آنوریسم موضعی بطن راست.'), tfc('function', 2)),
    recorded('rv-motion'),
    recorded('rv-function'),
  ], { hint: L('Nur Befunde aus Echo oder Ventrikulografie ergänzen. Die letzten beiden Antworten verwenden die Padua-Definition und die jeweiligen Referenzwerte der Methode.', 'Add only echo or ventriculography findings here. The last two choices use the Padua definition and modality-specific reference values.', 'فقط یافته‌های اکو یا ونتریکولوگرافی را اضافه کنید. دو گزینهٔ پایانی بر اساس تعریف پادوا و مقادیر مرجع روش هستند.') }),
  question('biopsy', 'tissue', L('Was zeigt eine vorliegende RV-Biopsie?', 'What does the RV biopsy show, if available?', 'اگر بیوپسی بطن راست موجود است، چه چیزی نشان می‌دهد؟'), [
    option('biopsy-major', L('Fibrose mit deutlich vermindertem Myozytenanteil', 'Fibrosis with markedly reduced residual myocytes', 'فیبروز با کاهش شدید میوسیت‌های باقی‌مانده'), L('Fibrotischer Ersatz der freien RV-Wand in mindestens einer Probe. Restmyozyten < 60 % morphometrisch oder < 50 % geschätzt.', 'Fibrous replacement of the RV free wall in at least one sample. Residual myocytes <60% by morphometry or <50% by estimate.', 'فیبروز جایگزین در دست‌کم یک نمونه از دیوارهٔ آزاد بطن راست. میوسیت باقی‌مانده کمتر از ۶۰٪ در مورفومتری یا کمتر از ۵۰٪ برآوردی.'), { padua: 'rv-biopsy', ...tfc('tissue', 2) }),
    option('biopsy-minor', L('Fibrose mit mäßig vermindertem Myozytenanteil', 'Fibrosis with moderately reduced residual myocytes', 'فیبروز با کاهش متوسط میوسیت‌های باقی‌مانده'), L('Fibrotischer Ersatz der freien RV-Wand in mindestens einer Probe. Restmyozyten 60–75 % morphometrisch oder 50–65 % geschätzt.', 'Fibrous replacement of the RV free wall in at least one sample. Residual myocytes 60–75% by morphometry or 50–65% by estimate.', 'فیبروز جایگزین در دست‌کم یک نمونه از دیوارهٔ آزاد بطن راست. میوسیت باقی‌مانده ۶۰ تا ۷۵٪ در مورفومتری یا ۵۰ تا ۶۵٪ برآوردی.'), { padua: 'rv-biopsy', ...tfc('tissue', 1) }),
    option('biopsy-other', L('Fibrotischer Ersatz, Myozytenanteil außerhalb der TFC-Bereiche', 'Fibrous replacement, myocyte proportion outside the TFC ranges', 'فیبروز جایگزین با سهم میوسیت خارج از محدودهٔ TFC'), criteria.get('rv-biopsy').text, { padua: 'rv-biopsy' }),
    option('biopsy-unquantified', L('Fibrotischer Ersatz, Myozytenanteil nicht dokumentiert', 'Fibrous replacement, myocyte proportion not documented', 'فیبروز جایگزین با سهم میوسیت ثبت‌نشده'), criteria.get('rv-biopsy').text, { padua: 'rv-biopsy', incomplete: true }),
  ], { single: true }),
  question('twi', 'ecg', L('In welchen Ableitungen ist die T-Welle invertiert?', 'Which leads show T-wave inversion?', 'موج T در کدام لیدها وارونه است؟'), [
    short('v1-v3', 'V1–V3 oder weiter, ohne kompletten Rechtsschenkelblock', 'V1–V3 or beyond, without complete RBBB', 'V1–V3 یا فراتر، بدون بلوک کامل شاخهٔ راست'),
    short('v1-v2', 'V1–V2, ohne kompletten Rechtsschenkelblock', 'V1–V2, without complete RBBB', 'V1–V2، بدون بلوک کامل شاخهٔ راست'),
    short('v1-v4-rbbb', 'V1–V4 bei komplettem Rechtsschenkelblock', 'V1–V4 with complete RBBB', 'V1–V4 همراه با بلوک کامل شاخهٔ راست'),
    option('lateral-pattern', L('Linksthorakal V4–V6, ohne kompletten Linksschenkelblock', 'Left precordial V4–V6 without complete LBBB', 'V4–V6 چپ، بدون بلوک کامل شاخهٔ چپ'), null, { padua: 'lv-twi', ...tfc('repolarization', 1) }),
    option('lateral-other', L('V4, V5 oder V6 ohne das oben genannte linksthorakale Muster', 'V4, V5, or V6 without the left precordial pattern above', 'V4، V5 یا V6 بدون الگوی چپِ ذکرشده در بالا'), null, tfc('repolarization', 1)),
  ], { hint: L('Eine durchgehende T-Inversion von V1 bis in die lateralen Ableitungen als rechtspräkordiales Muster eintragen.', 'Enter continuous inversion from V1 into the lateral leads as a right precordial pattern.', 'وارونگی پیوسته از V1 تا لیدهای جانبی را به عنوان الگوی پره‌کوردیال راست وارد کنید.') }),
  question('age', 'ecg', L('Welche Altersvoraussetzungen sind erfüllt?', 'Which age-related requirements are met?', 'کدام شرط سنی برآورده شده است؟'), [
    short('older14', 'Älter als 14 Jahre', 'Older than 14 years', 'سن بیشتر از ۱۴ سال'),
    short('puberty', 'Pubertät abgeschlossen', 'Puberty completed', 'بلوغ کامل شده'),
  ], { visible: answers => any(answers, 'twi', repolRv), hint: L('TFC und Padua verwenden unterschiedliche Voraussetzungen. Wenn beides zutrifft, beides markieren.', 'TFC and Padua use different requirements. Select both if applicable.', 'TFC و پادوا شرط‌های متفاوتی دارند. اگر هر دو برقرارند، هر دو را انتخاب کنید.') }),
  question('depolarization', 'ecg', L('Gibt es auffällige Erregungsausbreitung oder Niedervoltage?', 'Is conduction abnormal or is QRS voltage low?', 'آیا هدایت غیرطبیعی یا ولتاژ QRS پایین است؟'), [
    recorded('epsilon', tfc('depolarization', 2)),
    recorded('terminal-activation', tfc('depolarization', 1)),
    recorded('low-voltage'),
    option('saecg', L('Spätpotenziale im signalgemittelten EKG', 'Late potentials on signal-averaged ECG', 'پتانسیل دیررس در نوار قلب میانگین‌گیری‌شده'), L('Standard-QRS < 110 ms und mindestens ein Befund: gefilterter QRS ≥ 114 ms, terminales Signal < 40 µV für ≥ 38 ms oder RMS der letzten 40 ms < 20 µV.', 'Standard QRS <110 ms and at least one finding: filtered QRS ≥114 ms, terminal signal <40 µV for ≥38 ms, or RMS of the last 40 ms <20 µV.', 'QRS استاندارد کمتر از ۱۱۰ میلی‌ثانیه و دست‌کم یکی از موارد: QRS فیلترشده ≥۱۱۴، سیگنال انتهایی زیر ۴۰ میکروولت برای ≥۳۸ میلی‌ثانیه یا RMS چهل میلی‌ثانیه پایانی کمتر از ۲۰ میکروولت.'), tfc('depolarization', 1)),
  ]),
  question('vt', 'rhythm', L('Welche Morphologie hat die dokumentierte ventrikuläre Tachykardie?', 'What morphology does the documented ventricular tachycardia have?', 'تاکی‌کاردی بطنی ثبت‌شده چه مورفولوژی دارد؟'), [
    option('vt-superior', L('Linksschenkelblockmuster mit superiorer Achse', 'LBBB pattern with superior axis', 'الگوی بلوک شاخهٔ چپ با محور فوقانی'), L('QRS in II, III und aVF negativ oder indeterminiert und in aVL positiv.', 'QRS negative or indeterminate in II, III and aVF and positive in aVL.', 'QRS در II، III و aVF منفی یا نامعین و در aVL مثبت است.'), { padua: 'rv-arrhythmia-major', ...tfc('arrhythmia', 2) }),
    option('vt-inferior', L('Linksschenkelblockmuster mit inferiorer Achse (RVOT)', 'LBBB pattern with inferior axis (RVOT)', 'الگوی بلوک شاخهٔ چپ با محور تحتانی (RVOT)'), null, { padua: 'rv-arrhythmia-minor', ...tfc('arrhythmia', 1) }),
    option('vt-other-axis', L('Linksschenkelblockmuster mit gesicherter Achse außerhalb des RVOT-Musters', 'LBBB pattern with documented axis outside the RVOT pattern', 'الگوی بلوک شاخهٔ چپ با محور مشخص خارج از الگوی RVOT'), L('Für Achsen, die das separat aufgeführte TFC-Major-Muster nicht erfüllen.', 'For axes that do not meet the separately listed TFC major pattern.', 'برای محورهایی که الگوی معیار اصلی TFC بالا را برآورده نمی‌کنند.'), { padua: 'rv-arrhythmia-major' }),
    option('vt-unknown-axis', L('Linksschenkelblockmuster, Achse unbekannt', 'LBBB pattern, axis unknown', 'الگوی بلوک شاخهٔ چپ با محور نامشخص'), null, { ...tfc('arrhythmia', 1), incomplete: true }),
    option('vt-rbbb', L('Rechtsschenkelblockmuster ohne faszikuläre Morphologie', 'RBBB pattern without fascicular morphology', 'الگوی بلوک شاخهٔ راست بدون مورفولوژی فاسیکولار'), null, { padua: 'lv-arrhythmia' }),
  ], { hint: L('Anhaltende und nichtanhaltende VT können zählen. Ohne dokumentierte VT wähle „Keiner dieser Befunde“.', 'Both sustained and nonsustained VT can count. If no VT was documented, choose “None of these findings”.', 'VT پایدار و ناپایدار هر دو می‌توانند معیار باشند. بدون VT ثبت‌شده، «هیچ‌کدام» را انتخاب کنید.') }),
  question('pvc', 'rhythm', L('Wurden mehr als 500 ventrikuläre Extrasystolen in 24 Stunden dokumentiert?', 'Were more than 500 premature ventricular beats documented in 24 hours?', 'آیا بیش از ۵۰۰ ضربان زودرس بطنی در ۲۴ ساعت ثبت شده است؟'), [
    option('pvc-rv', L('Ja, Linksschenkelblockmuster außerhalb des RVOT-Musters', 'Yes, LBBB pattern outside the RVOT pattern', 'بله، الگوی بلوک شاخهٔ چپ خارج از الگوی RVOT'), null, { padua: 'rv-arrhythmia-major', ...tfc('arrhythmia', 1) }),
    option('pvc-rvot', L('Ja, Linksschenkelblockmuster mit inferiorer Achse (RVOT)', 'Yes, LBBB pattern with inferior axis (RVOT)', 'بله، الگوی بلوک شاخهٔ چپ با محور تحتانی (RVOT)'), null, { padua: 'rv-arrhythmia-minor', ...tfc('arrhythmia', 1) }),
    option('pvc-lv', L('Ja, Rechtsschenkelblockmuster ohne faszikuläre Morphologie', 'Yes, RBBB pattern without fascicular morphology', 'بله، الگوی بلوک شاخهٔ راست بدون مورفولوژی فاسیکولار'), null, { padua: 'lv-arrhythmia', ...tfc('arrhythmia', 1) }),
    option('pvc-other', L('Ja, andere bekannte Morphologie', 'Yes, another documented morphology', 'بله، مورفولوژی دیگر و مشخص'), null, tfc('arrhythmia', 1)),
    option('pvc-unknown', L('Ja, Morphologie unbekannt', 'Yes, morphology unknown', 'بله، مورفولوژی نامشخص'), null, { ...tfc('arrhythmia', 1), incomplete: true }),
  ]),
  question('genetics', 'family', L('Liegt ein krankheitsrelevanter genetischer Befund vor?', 'Is a disease-relevant genetic variant documented?', 'آیا واریانت ژنتیکی مرتبط با بیماری ثبت شده است؟'), [
    option('gene-arvc', L('Pathogene ARVC-assoziierte Variante', 'Pathogenic ARVC-associated variant', 'واریانت بیماری‌زای مرتبط با ARVC'), null, { padua: 'gene', ...tfc('family', 2) }),
    option('gene-acm', L('Andere pathogene oder wahrscheinlich pathogene ACM-assoziierte Variante', 'Other pathogenic or likely pathogenic ACM-associated variant', 'واریانت دیگر بیماری‌زا یا احتمالاً بیماری‌زای مرتبط با ACM'), null, { padua: 'gene' }),
  ], { single: true, hint: L('Eine Variante unklarer Signifikanz (VUS) erfüllt kein Kriterium.', 'A variant of uncertain significance (VUS) does not meet a criterion.', 'واریانت با اهمیت نامشخص (VUS) معیار محسوب نمی‌شود.') }),
  question('family', 'family', L('Was ist bei den Angehörigen dokumentiert?', 'What is documented in the family?', 'چه یافته‌ای در بستگان ثبت شده است؟'), familyIds.map(id => recorded(id))),
  question('family-arvc', 'family', L('Welche der Familienangaben gelten ausdrücklich für ARVC?', 'Which family findings specifically apply to ARVC?', 'کدام یافته‌های خانوادگی مشخصاً دربارهٔ ARVC هستند؟'), [
    option('family-definite', L('ARVC bei erstgradig Verwandten nach TFC bestätigt', 'First-degree relative meets TFC for ARVC', 'ARVC در بستگان درجهٔ اول طبق TFC تأیید شده'), null, tfc('family', 2)),
    option('family-pathology', L('ARVC bei erstgradig Verwandten pathologisch bestätigt', 'ARVC confirmed by pathology in a first-degree relative', 'ARVC در بستگان درجهٔ اول با پاتولوژی تأیید شده'), null, tfc('family', 2)),
    option('family-suspected', L('ARVC bei erstgradig Verwandten berichtet, TFC nicht überprüfbar', 'Reported ARVC in a first-degree relative, with TFC not verifiable', 'ARVC در بستگان درجهٔ اول گزارش شده و TFC قابل بررسی نیست'), null, tfc('family', 1)),
    option('family-sudden', L('Plötzlicher Tod vor 35 Jahren bei erstgradig Verwandten mit ARVC-Verdacht', 'Sudden death before age 35 in a first-degree relative with suspected ARVC', 'مرگ ناگهانی پیش از ۳۵ سالگی در بستگان درجهٔ اول با شک به ARVC'), null, tfc('family', 1)),
    option('family-second', L('ARVC bei zweitgradig Verwandten nach TFC oder pathologisch bestätigt', 'ARVC confirmed by TFC or pathology in a second-degree relative', 'ARVC در بستگان درجهٔ دوم طبق TFC یا پاتولوژی تأیید شده'), null, tfc('family', 1)),
  ], { visible: answers => any(answers, 'family', familyIds) }),
]

export function questionsFor(answers) {
  return QUESTIONS.filter(item => !item.visible || item.visible(answers))
}

export function optionsFor(item, answers) {
  return item.id === 'family-arvc' ? item.options.filter(choice => has(answers, 'family', choice.id)) : item.options
}

export function isReviewed(item, answers, values) {
  if (item.type === 'measurements') return !values.unavailable && validMeasurements(values) && values.ef !== '' && values.edvi !== '' && !!values.sex
  return Boolean(answers[item.id]?.length) && !has(answers, item.id, 'unknown')
    && !item.options.some(choice => choice.incomplete && has(answers, item.id, choice.id))
}

export function parseMeasurement(raw) {
  const normalized = String(raw ?? '').trim()
    .replace(/[۰-۹٠-٩]/g, digit => String(digit.charCodeAt(0) % 16))
    .replace(/[,٫]/, '.')
  if (!/^\d+(?:\.\d+)?$/.test(normalized)) return null
  return Number(normalized)
}

export function validMeasurements(values) {
  if (values.unavailable) return true
  const edvi = parseMeasurement(values.edvi)
  const ef = parseMeasurement(values.ef)
  return (!values.edvi || (edvi !== null && Number.isFinite(edvi) && edvi > 0))
    && (!values.ef || (ef !== null && ef >= 0 && ef <= 100))
}

export function evaluateFindings(answers, values) {
  const padua = new Set()
  const tfcMatches = []
  for (const item of questionsFor(answers)) {
    for (const choice of optionsFor(item, answers)) {
      if (!has(answers, item.id, choice.id)) continue
      if (choice.padua) padua.add(choice.padua)
      if (choice.tfc) tfcMatches.push({ ...choice.tfc, title: choice.title })
    }
  }

  if (any(answers, 'rv-motion', regionTfc) && !values.unavailable && validMeasurements(values)) {
    const grade = gradeTfcCmrMeasurements({ sex: values.sex, edvi: parseMeasurement(values.edvi), ef: parseMeasurement(values.ef) })
    if (grade) tfcMatches.push({ category: 'function', grade, title: L('Regionale RV-Störung mit auffälligem RVEDVi oder RVEF im MRT', 'Regional RV abnormality with abnormal RVEDVi or RVEF on MRI', 'اختلال موضعی بطن راست همراه با RVEDVi یا RVEF غیرطبیعی در MRI') })
  }

  const paduaGlobal = any(answers, 'rv-global', ['dilated', 'dysfunction'])
  const paduaMajorMotion = any(answers, 'rv-motion', regionPadua)
  if (paduaMajorMotion && paduaGlobal) padua.add('rv-function')
  if (any(answers, 'rv-motion', ['ak-dys-free', 'aneurysm'])) padua.add('rv-motion')

  for (const [index, id] of repolRv.entries()) {
    if (!has(answers, 'twi', id)) continue
    if (has(answers, 'age', 'puberty')) padua.add(['rv-twi-major', 'rv-twi-minor', 'rv-twi-rbbb'][index])
    if (has(answers, 'age', 'older14')) tfcMatches.push({
      category: 'repolarization', grade: index === 0 ? 2 : 1,
      title: QUESTIONS.find(item => item.id === 'twi').options[index].title,
    })
  }

  const breakdown = categories.map(({ id }) => {
    const matches = tfcMatches.filter(item => item.category === id)
    return { id, matches, points: Math.max(0, ...matches.map(item => item.grade)) }
  })
  const points = breakdown.reduce((sum, category) => sum + category.points, 0)
  const outcome = points >= 4 ? 'definite' : points === 3 ? 'borderline' : points === 2 ? 'possible' : 'belowThreshold'
  return { tfc: { points, outcome, breakdown }, padua: assessPadua(padua) }
}
