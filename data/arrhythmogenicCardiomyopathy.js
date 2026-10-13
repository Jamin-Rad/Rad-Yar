export const L = (de, en, fa) => ({ de, en, fa })
export const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
export const ACM_ID = 'arvc'
export const ACM_PATH = '/thorax/kardio/arvc'
export const TITLE = L('Arrhythmogene Kardiomyopathie', 'Arrhythmogenic cardiomyopathy', 'کاردیومیوپاتی آریتموژنیک')
export const CHAPTERS = [
  { id: 'spektrum', icon: 'heart', title: L('Welcher Ventrikel ist betroffen?', 'Which ventricle is involved?', 'کدام بطن درگیر است؟') },
  { id: 'cine', icon: 'scan', title: L('Cine: Bewegung und Funktion', 'Cine: motion and function', 'Cine: حرکت و عملکرد') },
  { id: 'lge', icon: 'layers', title: L('LGE: die Narbe lokalisieren', 'LGE: locate the scar', 'LGE: محل اسکار را پیدا کنید') },
  { id: 'kriterien', icon: 'chart', title: L('2010 TFC und Padua 2020', '2010 TFC and Padua 2020', 'معیارهای TFC 2010 و Padua 2020') },
  { id: 'differenzial', icon: 'branch', title: L('Mimics und diagnostische Fallen', 'Mimics and diagnostic pitfalls', 'افتراق‌ها و دام‌های تشخیصی') },
  { id: 'faelle', icon: 'case', title: L('Zwei Radiopaedia-Fälle', 'Two Radiopaedia cases', 'دو کیس رادیوپدیا') },
  { id: 'befund', icon: 'report', title: L('Befund und Selbsttest', 'Reporting and self-check', 'گزارش‌نویسی و خودآزمایی') },
  { id: 'takehome', icon: 'spark', title: L('Take Home', 'Take Home', 'جمع‌بندی'), emphasis: true },
]
export const TRACKED_IDS = CHAPTERS.filter(item => !item.emphasis).map(item => item.id)
export const UI = {
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), read: L('gelesen', 'read', 'خوانده‌شده'),
  mark: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'), marked: L('Als gelesen markiert', 'Marked as read', 'خوانده شد'),
  all: L('Alles als gelesen', 'Mark all read', 'ثبت خواندن کل درس'), allDone: L('Alles gelesen', 'All read', 'کل درس خوانده شد'),
  next: L('Lektion fortsetzen', 'Continue lesson', 'ادامه درس'), quiz: L('MCQ starten', 'Start MCQs', 'شروع MCQ'), cards: L('Flashcards', 'Flashcards', 'فلش‌کارت‌ها'),
  key: L('Merke', 'Key point', 'نکته کلیدی'), cave: L('CAVE', 'Caution', 'احتیاط'), schematic: L('Lehrschema · keine Patientenaufnahme', 'Teaching schematic · not a patient scan', 'شماتیک آموزشی · تصویر بیمار نیست'),
  sources: L('Quellen & Vertiefung', 'Sources & further reading', 'منابع و مطالعه بیشتر'), reveal: L('Besprechung aufdecken', 'Reveal discussion', 'نمایش تحلیل کیس'),
  hide: L('Besprechung ausblenden', 'Hide discussion', 'پنهان کردن تحلیل'), reset: L('Zurücksetzen', 'Reset', 'شروع دوباره'),
  correct: L('Richtig.', 'Correct.', 'درست است.'), retry: L('Noch einmal prüfen.', 'Review your answer.', 'پاسخ را دوباره بررسی کنید.'),
  auth: L('Anmelden, um den Lektionsabschluss im Profil zu speichern.', 'Sign in to save lesson completion to your profile.', 'برای ذخیره پایان درس در پروفایل وارد شوید.'),
}
export const PHENOTYPES = [
  { id: 'rv', name: 'ARVC', text: L('RV-dominant: regionale Bewegungsstörung, Dilatation und/oder reduzierte EF.', 'RV dominant: regional motion abnormality, dilatation and/or reduced EF.', 'راست‌غالب: اختلال حرکت موضعی، اتساع و/یا کاهش EF بطن راست.') },
  { id: 'both', name: L('Biventrikulär', 'Biventricular', 'دو بطنی'), text: L('RV-Veränderungen zusammen mit nichtischämischer LV-Narbe.', 'RV abnormalities together with non-ischaemic LV scar.', 'یافته‌های RV همراه اسکار غیرایسکمیک بطن چپ.') },
  { id: 'lv', name: 'ALVC', text: L('LV-dominant: nichtischämische Narbe, auch bei erhaltener EF. Isolierte ALVC braucht nach Padua eine passende pathogene/wahrscheinlich pathogene Variante.', 'LV dominant: non-ischaemic scar, even with preserved EF. Isolated ALVC requires a compatible pathogenic/likely pathogenic variant under Padua.', 'چپ‌غالب: اسکار غیرایسکمیک، حتی با EF حفظ‌شده. ALVC منفرد طبق Padua به واریانت سازگار بیماری‌زا/احتمالاً بیماری‌زا نیاز دارد.') },
]
export const BASICS = L('ACM ist eine oft erbliche Erkrankung mit Myokardnarbe und ventrikulären Arrhythmien. Immer RV und LV untersuchen.', 'ACM is an often inherited disease with myocardial scar and ventricular arrhythmias. Always examine RV and LV.', 'ACM بیماری اغلب ارثی با اسکار میوکارد و آریتمی بطنی است. همیشه RV و LV را بررسی کنید.')
export const CLINIC = L('Synkope, VT oder familiärer plötzlicher Herztod erhöhen den Verdacht. CMR allein stellt die Diagnose nicht.', 'Syncope, VT or familial sudden death raise suspicion. CMR alone does not establish the diagnosis.', 'سنکوپ، VT یا مرگ ناگهانی خانوادگی شک را افزایش می‌دهند. CMR به‌تنهایی تشخیص را قطعی نمی‌کند.')
export const CINE_NOTE = L('Hypokinesie allein genügt für das regionale 2010-TFC-Kriterium nicht. Auffällige Bewegung in mehreren Ebenen bestätigen und Artefakte ausschließen.', 'Hypokinesia alone is insufficient for the regional 2010 TFC criterion. Confirm abnormal motion in multiple planes and exclude artefacts.', 'هیپوکینزی به‌تنهایی برای معیار موضعی TFC 2010 کافی نیست. اختلال حرکت را در چند صفحه تأیید و آرتیفکت را رد کنید.')
export const LGE_PATTERNS = [
  { id: 'rv', name: L('RV-Narbe', 'RV scar', 'اسکار RV'), text: L('Transmurales RV-LGE: mögliches strukturelles Major-Kriterium nach Padua; in zwei orthogonalen Ebenen bestätigen.', 'Transmural RV LGE: a potential Padua major structural criterion; confirm in two orthogonal planes.', 'LGE ترانس‌مورال RV: می‌تواند معیار ساختاری ماژور Padua باشد؛ در دو صفحه عمود بر هم تأیید شود.') },
  { id: 'lv', name: L('LV-Stria / Ring', 'LV stripe / ring', 'نوار / حلقه LV'), text: L('Subepikardiales oder Mid-wall-LGE: nichtischämische Narbe. Ein Ringmuster allein beweist keine ALVC.', 'Subepicardial or mid-wall LGE: non-ischaemic scar. A ring pattern alone does not prove ALVC.', 'LGE ساب‌اپیکاردیال یا میدوال: اسکار غیرایسکمیک. الگوی حلقوی به‌تنهایی ALVC را اثبات نمی‌کند.') },
  { id: 'insertion', name: L('Insertionen', 'Insertion points', 'محل اتصال RV'), text: L('Isoliertes Insertions-LGE ist unspezifisch und erfüllt das LV-Narbenkriterium nicht.', 'Isolated insertion-point LGE is nonspecific and does not fulfil the LV scar criterion.', 'LGE منفرد محل اتصال غیراختصاصی است و معیار اسکار LV را برآورده نمی‌کند.') },
  { id: 'ischaemic', name: L('Ischämisches Muster', 'Ischaemic pattern', 'الگوی ایسکمیک'), text: L('Subendokardial/transmural im Koronarterritorium: zuerst Ischämie prüfen.', 'Subendocardial/transmural in a coronary territory: assess ischaemia first.', 'ساب‌اندوکاردیال/ترانس‌مورال در قلمرو کرونری: ابتدا ایسکمی را بررسی کنید.') },
]
export const DIFFERENTIALS = [
  [L('Sportherz', 'Athlete’s heart', 'قلب ورزشکار'), L('Proportionale Vergrößerung, oft erhaltene Funktion. Größe allein genügt nicht.', 'Balanced enlargement, often preserved function. Size alone is insufficient.', 'بزرگی متناسب، اغلب با عملکرد حفظ‌شده. اندازه به‌تنهایی کافی نیست.')],
  [L('RV-Belastung', 'RV overload', 'افزایش بار RV'), L('Pulmonale Hypertonie, Shunt oder schwere Trikuspidalinsuffizienz suchen.', 'Look for pulmonary hypertension, a shunt or severe tricuspid regurgitation.', 'فشار خون ریوی، شانت یا نارسایی شدید تریکوسپید بررسی شوند.')],
  [L('Entzündung', 'Inflammation', 'التهاب'), L('Myokarditis und Sarkoidose können ACM imitieren; DSP kann myocarditisähnliche Episoden verursachen.', 'Myocarditis and sarcoidosis can mimic ACM; DSP can cause myocarditis-like episodes.', 'میوکاردیت و سارکوئیدوز می‌توانند شبیه ACM باشند؛ DSP هم می‌تواند حملات شبیه میوکاردیت ایجاد کند.')],
]
export const CASES = [
  { id: '57972', author: 'Azza Elgendy', url: 'https://radiopaedia.org/cases/arrhythmogenic-right-ventricular-cardiomyopathy-4', viewer: 'https://radiopaedia.org/cases/57972/studies/64966', label: L('35 Jahre · Dyspnoe', 'Age 35 · dyspnoea', '۳۵ ساله · تنگی نفس'), task: L('RV-Dyskinesie suchen. Schließt fehlendes LGE ARVC aus?', 'Look for RV dyskinesia. Does absent LGE exclude ARVC?', 'دیسکینزی RV را پیدا کنید. آیا نبود LGE، ARVC را رد می‌کند؟'), discussion: L('RVEDVi 116 mL/m², RVEF <40% und regionale Dyskinesie: ein morphofunktionelles Major-Kriterium. Fehlendes LGE schließt ARVC nicht aus.', 'RVEDVi 116 mL/m², RVEF <40% and regional dyskinesia: one major criterion in the morphofunctional category. Absent LGE does not exclude ARVC.', 'RVEDVi برابر ۱۱۶، RVEF کمتر از ۴۰٪ و دیسکینزی موضعی: یک معیار ماژور مورفولوژی/عملکرد. نبود LGE، ARVC را رد نمی‌کند.') },
  { id: '69431', author: 'Vlad Barskiy', url: 'https://radiopaedia.org/cases/arrhythmogenic-right-ventricular-cardiomyopathy-3', viewer: 'https://radiopaedia.org/cases/69431/studies/79307', label: L('10 Jahre · Arrhythmie', 'Age 10 · arrhythmia', '۱۰ ساله · آریتمی'), task: L('RV-Aneurysmen und Funktion beurteilen. Welche Normwerte gelten bei Kindern?', 'Assess RV aneurysms and function. Which reference values apply in children?', 'آنوریسم‌های RV و عملکرد را بررسی کنید. در کودک کدام مرجع مناسب است؟'), discussion: L('RVEDVi 154 mL/m² und RVEF 29%. Altersgerechte pädiatrische Referenzen verwenden; LV-Trabekulierung allein beweist keine biventrikuläre ACM.', 'RVEDVi 154 mL/m² and RVEF 29%. Use age-appropriate paediatric references; LV trabeculation alone does not prove biventricular ACM.', 'RVEDVi برابر ۱۵۴ و RVEF برابر ۲۹٪. مرجع متناسب با سن کودک لازم است؛ ترابکولاسیون LV به‌تنهایی ACM دو بطنی را اثبات نمی‌کند.') },
]
export const REPORT_ITEMS = [
  L('Bildqualität und regionale RV-Bewegung', 'Image quality and regional RV motion', 'کیفیت تصویر و حرکت موضعی RV'),
  L('Indexierte RV-/LV-Volumina und EF', 'Indexed RV/LV volumes and EF', 'حجم ایندکس‌شده RV/LV و EF'),
  L('LGE: Ventrikel, Segment, Schicht und Ausdehnung', 'LGE: ventricle, segment, layer and extent', 'LGE: بطن، سگمنت، لایه و وسعت'),
  L('Mimics und Korrelation mit EKG, Familie und Genetik', 'Mimics and correlation with ECG, family and genetics', 'افتراق‌ها و تطبیق با ECG، خانواده و ژنتیک'),
]
export const REPORT = L('RV dilatiert (RVEDVi 118 mL/m²), RVEF 38%, regionale Dyskinesie in zwei Ebenen. Zusätzlich subepikardiales inferolaterales LV-LGE. Verdacht auf biventrikuläre ACM; klinische, rhythmologische und genetische Korrelation erforderlich.', 'Dilated RV (RVEDVi 118 mL/m²), RVEF 38%, regional dyskinesia in two planes. Additional subepicardial inferolateral LV LGE. Suspicious for biventricular ACM; clinical, rhythm and genetic correlation required.', 'RV متسع با RVEDVi برابر ۱۱۸، RVEF برابر ۳۸٪ و دیسکینزی موضعی در دو صفحه. LGE ساب‌اپیکاردیال اینفرولاترال LV نیز دیده می‌شود. مشکوک به ACM دو بطنی؛ تطبیق بالینی، ریتم و ژنتیک لازم است.')
export const TAKEHOME = [
  L('Immer RV und LV prüfen.', 'Always examine RV and LV.', 'همیشه RV و LV را بررسی کنید.'),
  L('2010 TFC: regionale RV-Störung UND Volumen-/EF-Kriterium; nur einmal zählen.', '2010 TFC: regional RV abnormality AND a volume/EF criterion; count only once.', 'TFC 2010: اختلال موضعی RV و شرط حجم/EF با هم؛ فقط یک بار حساب شوند.'),
  L('Padua ergänzt LGE; Ring-LGE und Fett allein beweisen keine ACM.', 'Padua adds LGE; ring LGE and fat alone do not prove ACM.', 'Padua، LGE را اضافه می‌کند؛ LGE حلقوی و چربی به‌تنهایی ACM را اثبات نمی‌کنند.'),
  L('Fehlendes LGE schließt ARVC nicht aus. Bildgebung mit Klinik, EKG und Genetik kombinieren.', 'Absent LGE does not exclude ARVC. Combine imaging with clinical, ECG and genetic findings.', 'نبود LGE، ARVC را رد نمی‌کند. تصویربرداری را با بالین، ECG و ژنتیک ترکیب کنید.'),
]
export const SOURCES = [
  ['Marcus et al. · Revised Task Force Criteria · 2010', 'https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.108.840827'],
  ['Corrado et al. · Padua criteria · 2020', 'https://doi.org/10.1016/j.ijcard.2020.06.005'],
  ['Corrado et al. · Evolving diagnostic criteria · 2021', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8649536/'],
  ['ESC · Cardiomyopathy guidelines · 2023', 'https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/cardiomyopathy/'],
  ['Smith et al. · Desmoplakin cardiomyopathy · 2020', 'https://doi.org/10.1161/CIRCULATIONAHA.119.044934'],
  ['Radiopaedia · Azza Elgendy · rID 57972', CASES[0].url],
  ['Radiopaedia · Vlad Barskiy · rID 69431', CASES[1].url],
]

// This helper evaluates only the adult 2010 CMR morphofunctional category.
export function evaluateTfcCmr({ sex, edvi, ef, regional }) {
  if (!Number.isFinite(edvi) || !Number.isFinite(ef) || edvi <= 0 || ef < 0 || ef > 100) return 'invalid'
  if (!regional) return 'none'
  if (edvi >= (sex === 'female' ? 100 : 110) || ef <= 40) return 'major'
  if (edvi >= (sex === 'female' ? 90 : 100) || ef <= 45) return 'minor'
  return 'none'
}
