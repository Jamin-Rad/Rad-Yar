import { abdomenThoraxAssessmentDrafts as drafts } from './abdomenThoraxAssessmentDrafts'
import { ADRENAL_QUESTION_DRAFTS } from './abdomenAdrenalLessonMaterials'

const languages = ['de', 'en', 'fa']
const option = (id, text) => ({ id, text })

// Only drafts whose lesson scope has an exact curriculum topic ID are registered.
// The hepatic AML and PSC/PBC drafts remain scoped to their lessons because the
// available curriculum IDs would otherwise mislabel their questions.
const registrations = [
  { key: 'hepatic-adenoma-hbp', fach: 'abdomen', tags: ['leberadenom'], extra: { de: 'HCA ist typischerweise HBP-hyperintens, FNH dagegen hypointens', en: 'HCA is typically HBP hyperintense, whereas FNH is hypointense', fa: 'HCA معمولاً در HBP پرسیگنال و FNH کم‌سیگنال است' } },
  { key: 'hepatic-adenoma-opposed-phase', fach: 'abdomen', tags: ['leberadenom'], extra: { de: 'Ein Signalabfall beweist spezifisch den inflammatorischen HCA-Subtyp', en: 'Signal loss specifically proves the inflammatory HCA subtype', fa: 'افت سیگنال به‌طور اختصاصی زیرگروه التهابی HCA را ثابت می‌کند' } },
  { key: 'hepatic-adenoma-dynamic-ct', fach: 'abdomen', tags: ['leberadenom'], extra: { de: 'Ein portalvenöses Hypoenhancement ist spezifisch für HCA', en: 'Portal venous hypoenhancement is specific for HCA', fa: 'کم‌تقویتی در فاز پورتال برای HCA اختصاصی است' } },
  { key: 'hepatic-adenoma-caveat', fach: 'abdomen', tags: ['leberadenom'], extra: { de: 'Die MRT kann HCA und HCC in jedem Fall sicher unterscheiden', en: 'MRI can reliably distinguish HCA from HCC in every case', fa: 'MRI در همه موارد می‌تواند HCA را با اطمینان از HCC افتراق دهد' } },
  { key: 'abdomen-renal-anatomy', fach: 'abdomen', tags: ['niere-anatomie'], extra: { de: 'Die anatomische Engstelle verursacht auch ohne Konkrement stets einen Harnstau', en: 'The anatomical narrowing always causes urinary stasis, even without a calculus', fa: 'این تنگی آناتومیک حتی بدون سنگ همیشه باعث احتباس ادرار می‌شود' } },
  { key: 'abdomen-liver-metastases', fach: 'abdomen', tags: ['lebermetastasen'], extra: { de: 'Ohne Leberzirrhose sind Lebermetastasen ausgeschlossen', en: 'Liver metastases are excluded without cirrhosis', fa: 'بدون سیروز کبدی، متاستاز کبدی رد می‌شود' } },
  { key: 'abdomen-small-bowel-feces', fach: 'abdomen', tags: ['ileus-duenndarm'], extra: { de: 'Dünndarmobstruktion, Pneumobilie und ektoper Gallenstein (Rigler-Trias)', en: 'Small-bowel obstruction, pneumobilia and an ectopic gallstone (Rigler triad)', fa: 'انسداد رودهٔ باریک، پنوموبیلی و سنگ نابجا در روده (تریاد ریگلر)' } },
  { key: 'abdomen-ileus-volvulus', fach: 'abdomen', tags: ['ileus-duenndarm'], extra: { de: 'Dünndarmobstruktion, Pneumobilie und ein Stein noch in der Gallenblase', en: 'Small-bowel obstruction, pneumobilia and a stone still within the gallbladder', fa: 'انسداد روده باریک، پنوموبیلی و سنگی که هنوز داخل کیسه صفراست' } },
  { key: 'abdomen-pancreatic-cysts', fach: 'abdomen', tags: ['ipmn'], extra: { de: 'Eine solide Raumforderung ohne Gangkommunikation', en: 'A solid mass without duct communication', fa: 'تودهٔ جامد بدون ارتباط با مجرا' } },
  { key: 'abdomen-focal-liver', fach: 'abdomen', tags: ['leberadenom', 'lebermetastasen'], extra: { de: 'Die Läsion nur anhand des nativen CT beurteilen', en: 'Assess the lesion from unenhanced CT alone', fa: 'ارزیابی ضایعه فقط بر اساس CT بدون تزریق' } },
  { key: 'abdomen-hepatic-steatosis', fach: 'abdomen', tags: ['hepatische-steatose'], extra: { de: 'Die typische Lage allein beweist die Diagnose und macht weitere Charakterisierung unnötig', en: 'Typical location alone proves the diagnosis and makes further characterisation unnecessary', fa: 'محل تیپیک به‌تنهایی تشخیص را ثابت می‌کند و بررسی تکمیلی را غیرضروری می‌سازد' } },
  { key: 'abdomen-renal-masses', fach: 'abdomen', tags: ['nierenzysten'], extra: { de: 'Das Alter der betroffenen Person allein', en: 'The patient’s age alone', fa: 'فقط سن بیمار' } },
  { key: 'abdomen-adrenal-masses', fach: 'abdomen', tags: ['nebennieren-inzidentalom', 'nebennierenadenom'], extra: { de: 'Voraufnahmen bei der Beurteilung ignorieren', en: 'Ignore prior examinations during assessment', fa: 'نادیده‌گرفتن تصاویر قبلی در ارزیابی' } },
  ...ADRENAL_QUESTION_DRAFTS.map(draft => ({ key: draft.id, fach: 'abdomen', tags: [{ 'adrenal-adenoma-microscopic-fat': 'nebennierenadenom', 'adrenal-myelolipoma-macroscopic-fat': 'myelolipom', 'adrenal-pheochromocytoma-washout': 'phaeochromozytom', 'adrenal-neuroblastoma-origin': 'neuroblastom-nebenniere' }[draft.id]], extra: { de: 'Einzelnes Zeichen ohne Kontext als sicheren Beweis werten', en: 'Treat one isolated sign as definitive proof without context', fa: 'یک نشانهٔ منفرد را بدون زمینه، اثبات قطعی بدانید' } })),
  { key: 'thorax-foreign-body', fach: 'thorax', tags: ['fremdkoerper-atemwege'], extra: { de: 'Ein unauffälliges Röntgenbild schließt die Aspiration sicher aus', en: 'A normal radiograph definitively excludes aspiration', fa: 'رادیوگرافی طبیعی آسپیراسیون را به‌طور قطعی رد می‌کند' } },
  { key: 'pneumonie-muster', fach: 'thorax', tags: ['pneumonie-muster', 'bakterielle-pneumonie', 'virale-pneumonie-covid', 'atypische-pneumonie', 'pcp', 'aspergillus-lunge'], extra: { de: 'Ein bestimmtes Verteilungsmuster beweist den Erreger', en: 'A particular distribution pattern proves the organism', fa: 'یک الگوی توزیع مشخص، عامل بیماری‌زا را ثابت می‌کند' } },
  { key: 'thorax-tuberculosis', fach: 'thorax', tags: ['tuberkulose'], extra: { de: 'Ein unauffälliges Thoraxbild schließt aktive TB sicher aus', en: 'A normal chest image definitively excludes active TB', fa: 'تصویر طبیعی قفسهٔ سینه سل فعال را قطعاً رد می‌کند' } },
  { key: 'thorax-chest-xray', fach: 'thorax', tags: ['roentgen-thorax-systematik'], extra: { de: 'Die Kontrastmittelphase', en: 'The contrast phase', fa: 'فاز مادهٔ حاجب' } },
  { key: 'abdomen-cystic-liver-lesions', fach: 'abdomen', tags: ['leberzyste'], extra: { de: 'Der Zysteninhalt reichert nach Kontrastmittel stärker an als Wand und Septen', en: 'The cyst contents enhance more than the wall and septa after contrast', fa: 'محتوای کیست پس از تزریق بیش از دیواره و سپتا جذب دارد' } },
  { key: 'abdomen-appendizitis', fach: 'abdomen', tags: ['appendizitis'], extra: { de: 'Eine nicht dargestellte Appendix als sicheren Ausschluss werten', en: 'Treat a non-visualised appendix as a definite exclusion', fa: 'دیده‌نشدن آپاندیس را رد قطعی بیماری بدانید' } },
  { key: 'abdomen-pdac-isoattenuating', fach: 'abdomen', tags: ['pdac'], extra: { de: 'Fehlende sichtbare Masse schließt PDAC aus', en: 'Absence of a visible mass excludes PDAC', fa: 'نبود تودهٔ قابل رؤیت PDAC را رد می‌کند' } },
  { key: 'abdomen-pdac-double-duct', fach: 'abdomen', tags: ['pdac'], extra: { de: 'Es beweist spezifisch ein PDAC und schließt andere Ursachen aus', en: 'It specifically proves PDAC and excludes other causes', fa: 'به‌طور اختصاصی PDAC را ثابت و علل دیگر را رد می‌کند' } },
  { key: 'abdomen-pdac-vessel-contact', fach: 'abdomen', tags: ['pdac'], extra: { de: 'Nur den Winkel messen und daraus allein die Resektabilität festlegen', en: 'Measure only the angle and determine resectability from that alone', fa: 'فقط زاویه را اندازه بگیرید و قابلیت برداشت را صرفاً بر آن اساس تعیین کنید' } },
  { key: 'abdomen-inguinal-hernia-landmarks', fach: 'abdomen', tags: ['inguinalhernie'], extra: { de: 'Femoralhernie lateral der Vena femoralis', en: 'Femoral hernia lateral to the femoral vein', fa: 'فتق فمورال در لترال ورید فمورال' } },
  { key: 'abdomen-femoral-hernia-landmarks', fach: 'abdomen', tags: ['femoralhernie'], extra: { de: 'Femoralhernie oberhalb des Leistenbandes', en: 'Femoral hernia above the inguinal ligament', fa: 'فتق فمورال در بالای رباط اینگوینال' } },
  { key: 'abdomen-lower-gi-bleeding', fach: 'abdomen', tags: ['untere-gi-blutung'], extra: { de: 'Ein hyperdichter Lumeninhalt in der nativen Phase beweist bereits eine aktive Extravasation', en: 'Hyperdense luminal material on the unenhanced phase alone proves active extravasation', fa: 'مادهٔ پرچگال داخل لومن در فاز بدون تزریق به‌تنهایی نشت فعال را ثابت می‌کند' } },
  { key: 'abdomen-kolorektales-karzinom', fach: 'abdomen', tags: ['kolorektales-karzinom'], extra: { de: 'Eine Abdomen-CT allein für das lokoregionäre Rektumstaging', en: 'Abdominal CT alone for locoregional rectal staging', fa: 'فقط CT شکم برای مرحله‌بندی موضعی رکتوم' } },
  { key: 'abdomen-ileus-ischaemia', fach: 'abdomen', tags: ['ileus-duenndarm'], extra: { de: 'Wandverdickung allein beweist eine transmurale Nekrose', en: 'Wall thickening alone proves transmural necrosis', fa: 'ضخیم‌شدن دیواره به‌تنهایی نکروز تمام‌ضخامت را ثابت می‌کند' } },
]

const makeQuestion = ({ key, fach, tags, extra }) => {
  const draft = drafts[key]
  if (!draft) throw new Error(`Missing lesson assessment draft: ${key}`)
  return Object.fromEntries(languages.map(lang => {
    const options = draft.options.map((text, index) => option(String.fromCharCode(65 + index), text[lang]))
    options.push(option('D', extra[lang]))
    return [lang, {
      id: `${key}-${lang}-01`,
      tags,
      fach,
      question: draft.question[lang],
      options,
      correct: String.fromCharCode(65 + (draft.answer ?? 0)),
      explanation: draft.rationale[lang],
      source: draft.source,
    }]
  }))
}

export const ABDOMEN_THORAX_REGISTERED_QUESTIONS = Object.fromEntries(
  registrations.map(registration => [registration.key, makeQuestion(registration)])
)

export const ABDOMEN_THORAX_REGISTERED_TOPIC_GROUPS = [
  { fachId: 'abdomen', kapitelId: 'abdomen-pankreas', title: { de: 'Pankreas', en: 'Pancreas', fa: 'پانکراس' }, topics: [
    { id: 'pdac', title: { de: 'Duktales Adenokarzinom (PDAC)', en: 'Ductal adenocarcinoma (PDAC)', fa: 'آدنوکارسینوم داکتال پانکراس (PDAC)' } },
  ] },
  { fachId: 'abdomen', kapitelId: 'abdomen-gi-trakt', title: { de: 'Ileus & Volvulus', en: 'Ileus & Volvulus', fa: 'ایلئوس و ولوولوس' }, topics: [
    { id: 'ileus-duenndarm', title: { de: 'Dünndarmileus', en: 'Small-bowel obstruction', fa: 'انسداد رودهٔ باریک' } }, { id: 'volvulus', title: { de: 'Volvulus', en: 'Volvulus', fa: 'ولوولوس' } },
  ] },
  { fachId: 'abdomen', kapitelId: 'abdomen-leber', title: { de: 'Leberläsionen', en: 'Liver lesions', fa: 'ضایعات کبدی' }, topics: [
    { id: 'leberadenom', title: { de: 'Leberadenom', en: 'Hepatic adenoma', fa: 'آدنوم کبدی' } }, { id: 'lebermetastasen', title: { de: 'Lebermetastasen', en: 'Liver metastases', fa: 'متاستازهای کبدی' } }, { id: 'leberzyste', title: { de: 'Leberzyste', en: 'Hepatic cyst', fa: 'کیست کبدی' } }, { id: 'hepatische-steatose', title: { de: 'Hepatische Steatose', en: 'Hepatic steatosis', fa: 'استئاتوز کبدی' } },
  ] },
  { fachId: 'abdomen', kapitelId: 'abdomen-pankreas', title: { de: 'Zystische Pankreasläsionen', en: 'Cystic pancreatic lesions', fa: 'ضایعات کیستیک پانکراس' }, topics: [
    { id: 'ipmn', title: { de: 'IPMN', en: 'IPMN', fa: 'IPMN' } },
  ] },
  { fachId: 'abdomen', kapitelId: 'abdomen-niere', title: { de: 'Nierenläsionen', en: 'Renal lesions', fa: 'ضایعات کلیه' }, topics: [
    { id: 'niere-anatomie', title: { de: 'Nieren & Harnwege', en: 'Kidneys & urinary tract', fa: 'کلیه‌ها و مجاری ادراری' } }, { id: 'nierenzysten', title: { de: 'Nierenzysten', en: 'Renal cysts', fa: 'کیست‌های کلیوی' } },
  ] },
  { fachId: 'abdomen', kapitelId: 'abdomen-nebenniere', title: { de: 'Nebennierenläsionen', en: 'Adrenal lesions', fa: 'ضایعات آدرنال' }, topics: [
    { id: 'nebennieren-inzidentalom', title: { de: 'Nebenniereninzidentalom', en: 'Adrenal incidentaloma', fa: 'اینسیدنتالوم آدرنال' } }, { id: 'nebennierenadenom', title: { de: 'Nebennierenadenom', en: 'Adrenal adenoma', fa: 'آدنوم آدرنال' } },
  ] },
  { fachId: 'abdomen', kapitelId: 'abdomen-gi-trakt', title: { de: 'Gastrointestinaltrakt', en: 'Gastrointestinal tract', fa: 'دستگاه گوارش' }, topics: [
    { id: 'appendizitis', title: { de: 'Appendizitis', en: 'Appendicitis', fa: 'آپاندیسیت' } }, { id: 'untere-gi-blutung', title: { de: 'Untere GI-Blutung', en: 'Lower GI bleeding', fa: 'خون‌ریزی گوارشی تحتانی' } }, { id: 'kolorektales-karzinom', title: { de: 'Kolorektales Karzinom', en: 'Colorectal carcinoma', fa: 'کارسینوم کولورکتال' } }, { id: 'gist', title: { de: 'GIST', en: 'GIST', fa: 'GIST' } },
  ] },
  { fachId: 'thorax', kapitelId: 'thorax-grundlagen', title: { de: 'Thoraxgrundlagen', en: 'Thoracic imaging fundamentals', fa: 'مبانی تصویربرداری قفسهٔ سینه' }, topics: [
    { id: 'roentgen-thorax-systematik', title: { de: 'Systematische Röntgenanalyse', en: 'Systematic chest radiograph review', fa: 'مرور نظام‌مند رادیوگرافی قفسهٔ سینه' } },
  ] },
  { fachId: 'thorax', kapitelId: 'thorax-atemwege', title: { de: 'Atemwege', en: 'Airways', fa: 'راه‌های هوایی' }, topics: [
    { id: 'fremdkoerper-atemwege', title: { de: 'Fremdkörperaspiration', en: 'Airway foreign body aspiration', fa: 'آسپیراسیون جسم خارجی' } },
  ] },
  { fachId: 'thorax', kapitelId: 'thorax-infektionen', title: { de: 'Pulmonale Infektionen', en: 'Pulmonary infections', fa: 'عفونت‌های ریوی' }, topics: [
    { id: 'pneumonie-muster', title: { de: 'Pneumoniemuster', en: 'Pneumonia patterns', fa: 'الگوهای پنومونی' } }, { id: 'bakterielle-pneumonie', title: { de: 'Bakterielle Pneumonie', en: 'Bacterial pneumonia', fa: 'پنومونی باکتریایی' } }, { id: 'virale-pneumonie-covid', title: { de: 'Virale Pneumonie / COVID-19', en: 'Viral pneumonia / COVID-19', fa: 'پنومونی ویروسی / کووید-۱۹' } }, { id: 'atypische-pneumonie', title: { de: 'Atypische Pneumonie', en: 'Atypical pneumonia', fa: 'پنومونی آتیپیک' } }, { id: 'pcp', title: { de: 'Pneumocystis-Pneumonie', en: 'Pneumocystis pneumonia', fa: 'پنومونی پنوموسیستیس' } }, { id: 'aspergillus-lunge', title: { de: 'Aspergillose der Lunge', en: 'Pulmonary aspergillosis', fa: 'آسپرژیلوز ریوی' } }, { id: 'tuberkulose', title: { de: 'Tuberkulose', en: 'Tuberculosis', fa: 'سل' } },
  ] },
]
