import { CAA_COPY } from './caaLesson'
const L = (de, en, fa) => ({ de, en, fa })
export const BOSTON_SOURCE = 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9389452/'
export const BOSTON_REFERENCE = {
  id: 'boston-v2',
  name: L('Boston-Kriterien v2.0 · CAA', 'Boston criteria v2.0 · CAA', 'معیارهای Boston v2.0 · CAA'),
  kompakt: L('Klinisch-radiologische Kriterien zur Einstufung einer zerebralen Amyloidangiopathie (CAA).', 'Clinical–radiological criteria for classifying cerebral amyloid angiopathy (CAA).', 'معیارهای بالینی–رادیولوژیک برای طبقه‌بندی آنژیوپاتی آمیلوئید مغزی (CAA).'),
  sectionTitles: { prerequisites: CAA_COPY.eligibilityTitle, classification: L('Klassifikation', 'Classification', 'طبقه‌بندی'), detail: L('Details', 'Details', 'جزئیات') },
  linkPosition: 'afterDetails',
  radiologie: CAA_COPY.eligibility.map(item => ({stage: item.title, text: {de: item.paragraphs.map(p => p.de).join('\n'), en: item.paragraphs.map(p => p.en).join('\n'), fa: item.paragraphs.map(p => p.fa).join('\n')}})),
  cols: [L('MRT-Kategorie', 'MRI category', 'طبقه MRI'), L('Erforderliche Befunde', 'Required findings', 'یافته‌های لازم')],
  rows: [['Probable CAA', L('≥2 strikt lobäre Blutungsläsionen\nODER 1 strikt lobäre Blutungsläsion + ≥1 spezifischer WM-Marker.', '≥2 strictly lobar haemorrhagic lesions\nOR 1 strictly lobar haemorrhagic lesion + ≥1 specific WM marker.', 'حداقل ۲ ضایعه خونریزی صرفاً لوبار\nیا ۱ ضایعه خونریزی صرفاً لوبار + حداقل ۱ نشانگر اختصاصی WM.')], ['Possible CAA', L('1 strikt lobäre Blutungsläsion ODER ≥1 spezifischer WM-Marker, ohne probable CAA zu erfüllen.', '1 strictly lobar haemorrhagic lesion OR ≥1 specific WM marker, without meeting probable CAA.', '۱ ضایعه خونریزی صرفاً لوبار یا حداقل ۱ نشانگر اختصاصی WM، بدون احراز CAA محتمل.')]],
  detail: [{stage: CAA_COPY.bleedingGuideTitle, text: CAA_COPY.counting[0]}, {stage: CAA_COPY.whiteMatterGuideTitle, text: L('CSO-PVS: >20 erweiterte perivaskuläre Räume im Centrum semiovale einer Hemisphäre auf einer axialen T2-Schicht.\nWMH-Multispot: >10 kleine runde oder ovale T2/FLAIR-Hyperintensitäten im subkortikalen Mark beider Hemisphären.', 'CSO-PVS: >20 enlarged perivascular spaces in the centrum semiovale of one hemisphere on an axial T2 slice.\nWMH multispot: >10 small round or oval T2/FLAIR hyperintensities in the subcortical white matter of both hemispheres.', 'CSO-PVS: بیش از ۲۰ فضای گشادشده اطراف عروقی در مرکز نیمه‌بیضی یک نیمکره در یک برش محوری T2.\nWMH چندنقطه‌ای: بیش از ۱۰ کانون کوچک گرد یا بیضی با سیگنال بالای T2/FLAIR در ماده سفید زیرقشری هر دو نیمکره.')}, {stage: CAA_COPY.warning, text: CAA_COPY.deepWarning}],
  links: [{href:'/gehirn/vaskulaer/caa#boston', label:L('Zur CAA-Lektion', 'CAA lesson', 'درس CAA')}],
  ref: 'Charidimou et al. · Lancet Neurology 2022 · Boston v2.0', refUrl: BOSTON_SOURCE,
}
export const BOSTON_CALCULATOR_ENTRY = {id:'boston-v2',type:'boston',color:'#7c3aed',name:BOSTON_REFERENCE.name}
export const BOSTON_CALCULATOR_COPY = {
  age:L('Alter ≥50 Jahre', 'Age ≥50 years', 'سن حداقل ۵۰ سال'),
  clinical:L('Spontane intrazerebrale Blutung, TFNE oder kognitive Störung / Demenz', 'Spontaneous intracerebral haemorrhage, TFNE or cognitive impairment / dementia', 'خونریزی خودبخودی داخل مغز، TFNE یا اختلال شناختی / دمانس'),
  count:L('Strikt lobäre Blutungsläsionen', 'Strictly lobar haemorrhagic lesions', 'ضایعات خونریزی صرفاً لوبار'),
  deep:L('Tiefe intrazerebrale Blutung oder Mikroblutung vorhanden', 'Deep intracerebral haemorrhage or microbleed present', 'خونریزی داخل مغزی یا میکروخونریزی عمقی وجود دارد'),
  alternative:L('Andere Erkrankung erklärt die bewerteten Läsionen', 'Another disease explains the assessed lesions', 'بیماری دیگری ضایعات ارزیابی‌شده را توضیح می‌دهد'),
  reset:L('Zurücksetzen', 'Reset', 'بازنشانی'),
  prompt:L('Alter und Befunde eingeben. Die MRT-Einstufung erscheint darunter.', 'Enter age and findings. The MRI category appears below.', 'سن و یافته‌ها را وارد کنید. طبقه‌بندی MRI در پایین نمایش داده می‌شود.'),
  cave:L('Probable und possible CAA sind klinisch-radiologische Kategorien, kein histologischer Nachweis.', 'Probable and possible CAA are clinical–radiological categories, not histological confirmation.', 'CAA محتمل و ممکن طبقه‌بندی‌های بالینی–رادیولوژیک هستند، نه تأیید بافت‌شناختی.'),
  lesson:L('Erklärung und Zählregeln in der CAA-Lektion', 'Explanation and counting rules in the CAA lesson', 'توضیح و قواعد شمارش در درس CAA'),
}

export const BOSTON_WIZARD_COPY = {
  steps: [CAA_COPY.eligibilityTitle, L('Blutungsläsionen', 'Haemorrhagic lesions', 'ضایعات خونریزی'), L('WM-Marker', 'WM markers', 'نشانگرهای WM')],
  clinicalTitle: L('Passende Klinik vorhanden?', 'Compatible presentation present?', 'تظاهرات بالینی سازگار وجود دارد؟'),
  yes: L('Ja', 'Yes', 'بله'), no: L('Nein', 'No', 'خیر'),
  none: L('Keine', 'None', 'هیچ‌کدام'),
  next: L('Weiter', 'Next', 'ادامه'), back: L('Zurück', 'Back', 'بازگشت'),
  show: L('Ergebnis anzeigen', 'Show result', 'نمایش نتیجه'),
  progress: L('Boston-Rechner: Schritte', 'Boston calculator steps', 'مراحل محاسبه‌گر Boston'),
  answerAll: L('Bitte jede Frage beantworten.', 'Please answer every question.', 'لطفاً به همه پرسش‌ها پاسخ دهید.'),
  result: L('MRT-Einstufung nach Boston v2.0', 'MRI classification under Boston v2.0', 'طبقه‌بندی MRI طبق Boston v2.0'),
  reviewed: L('Ihre Angaben', 'Your answers', 'پاسخ‌های شما'),
}
