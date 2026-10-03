export const MEDICATION_CATEGORIES = {
  thyroid: { fa: 'تیروئید', en: 'Thyroid' },
  bloodPressure: { fa: 'فشار خون', en: 'Blood pressure' },
  cholesterol: { fa: 'چربی خون', en: 'Cholesterol' },
  diabetes: { fa: 'دیابت', en: 'Diabetes' },
  antiplatelet: { fa: 'ضد پلاکت', en: 'Antiplatelet' },
  anticoagulant: { fa: 'ضد انعقاد', en: 'Anticoagulant' },
  stomach: { fa: 'معده و گوارش', en: 'Gastrointestinal' },
  mentalHealth: { fa: 'اعصاب و روان', en: 'Mental health' },
  neurology: { fa: 'مغز و اعصاب', en: 'Neurology' },
  pain: { fa: 'درد و التهاب', en: 'Pain and inflammation' },
  antibiotic: { fa: 'آنتی‌بیوتیک', en: 'Antibiotic' },
  supplement: { fa: 'مکمل', en: 'Supplement' },
  rheumatology: { fa: 'روماتولوژی', en: 'Rheumatology' },
  respiratory: { fa: 'تنفسی و آلرژی', en: 'Respiratory and allergy' },
  urology: { fa: 'اورولوژی', en: 'Urology' },
  other: { fa: 'سایر', en: 'Other' },
}

export const MEDICATION_CATALOG = [
  { id: 'levothyroxine', fa: 'لووتیروکسین', en: 'Levothyroxine', category: 'thyroid', doses: ['۲۵ میکروگرم', '۵۰ میکروگرم', '۷۵ میکروگرم', '۱۰۰ میکروگرم', '۱۲۵ میکروگرم'] },
  { id: 'methimazole', fa: 'متی‌مازول', en: 'Methimazole', category: 'thyroid', doses: ['۵ میلی‌گرم', '۱۰ میلی‌گرم'] },
  { id: 'losartan', fa: 'لوزارتان', en: 'Losartan', category: 'bloodPressure', doses: ['۲۵ میلی‌گرم', '۵۰ میلی‌گرم', '۱۰۰ میلی‌گرم'] },
  { id: 'valsartan', fa: 'والزارتان', en: 'Valsartan', category: 'bloodPressure', doses: ['۴۰ میلی‌گرم', '۸۰ میلی‌گرم', '۱۶۰ میلی‌گرم', '۳۲۰ میلی‌گرم'] },
  { id: 'amlodipine', fa: 'آملودیپین', en: 'Amlodipine', category: 'bloodPressure', doses: ['۲٫۵ میلی‌گرم', '۵ میلی‌گرم', '۱۰ میلی‌گرم'] },
  { id: 'bisoprolol', fa: 'بیزوپرولول', en: 'Bisoprolol', category: 'bloodPressure', doses: ['۲٫۵ میلی‌گرم', '۵ میلی‌گرم', '۱۰ میلی‌گرم'] },
  { id: 'metoprolol', fa: 'متوپرولول', en: 'Metoprolol', category: 'bloodPressure', doses: ['۲۵ میلی‌گرم', '۵۰ میلی‌گرم', '۱۰۰ میلی‌گرم'] },
  { id: 'lisinopril', fa: 'لیزینوپریل', en: 'Lisinopril', category: 'bloodPressure', doses: ['۵ میلی‌گرم', '۱۰ میلی‌گرم', '۲۰ میلی‌گرم', '۴۰ میلی‌گرم'] },
  { id: 'ramipril', fa: 'رامیپریل', en: 'Ramipril', category: 'bloodPressure', doses: ['۲٫۵ میلی‌گرم', '۵ میلی‌گرم', '۱۰ میلی‌گرم'] },
  { id: 'hydrochlorothiazide', fa: 'هیدروکلروتیازید', en: 'Hydrochlorothiazide', category: 'bloodPressure', doses: ['۱۲٫۵ میلی‌گرم', '۲۵ میلی‌گرم', '۵۰ میلی‌گرم'] },
  { id: 'furosemide', fa: 'فوروزماید', en: 'Furosemide', category: 'bloodPressure', doses: ['۲۰ میلی‌گرم', '۴۰ میلی‌گرم', '۸۰ میلی‌گرم'] },
  { id: 'atorvastatin', fa: 'آتورواستاتین', en: 'Atorvastatin', category: 'cholesterol', doses: ['۱۰ میلی‌گرم', '۲۰ میلی‌گرم', '۴۰ میلی‌گرم', '۸۰ میلی‌گرم'] },
  { id: 'rosuvastatin', fa: 'روزوواستاتین', en: 'Rosuvastatin', category: 'cholesterol', doses: ['۵ میلی‌گرم', '۱۰ میلی‌گرم', '۲۰ میلی‌گرم', '۴۰ میلی‌گرم'] },
  { id: 'ezetimibe', fa: 'ازتیمایب', en: 'Ezetimibe', category: 'cholesterol', doses: ['۱۰ میلی‌گرم'] },
  { id: 'metformin', fa: 'متفورمین', en: 'Metformin', category: 'diabetes', doses: ['۵۰۰ میلی‌گرم', '۸۵۰ میلی‌گرم', '۱۰۰۰ میلی‌گرم'] },
  { id: 'glimepiride', fa: 'گلیمپیرید', en: 'Glimepiride', category: 'diabetes', doses: ['۱ میلی‌گرم', '۲ میلی‌گرم', '۳ میلی‌گرم', '۴ میلی‌گرم'] },
  { id: 'sitagliptin', fa: 'سیتاگلیپتین', en: 'Sitagliptin', category: 'diabetes', doses: ['۲۵ میلی‌گرم', '۵۰ میلی‌گرم', '۱۰۰ میلی‌گرم'] },
  { id: 'empagliflozin', fa: 'امپاگلیفلوزین', en: 'Empagliflozin', category: 'diabetes', doses: ['۱۰ میلی‌گرم', '۲۵ میلی‌گرم'] },
  { id: 'insulin-glargine', fa: 'انسولین گلارژین', en: 'Insulin glargine', category: 'diabetes', doses: ['۱ واحد', '۱۰ واحد', '۲۰ واحد'] },
  { id: 'aspirin', fa: 'آسپرین', en: 'Aspirin', category: 'antiplatelet', doses: ['۸۰ میلی‌گرم', '۱۰۰ میلی‌گرم', '۳۲۵ میلی‌گرم'] },
  { id: 'clopidogrel', fa: 'کلوپیدوگرل', en: 'Clopidogrel', category: 'antiplatelet', doses: ['۷۵ میلی‌گرم'] },
  { id: 'warfarin', fa: 'وارفارین', en: 'Warfarin', category: 'anticoagulant', doses: ['۱ میلی‌گرم', '۲ میلی‌گرم', '۲٫۵ میلی‌گرم', '۵ میلی‌گرم'] },
  { id: 'apixaban', fa: 'آپیکسابان', en: 'Apixaban', category: 'anticoagulant', doses: ['۲٫۵ میلی‌گرم', '۵ میلی‌گرم'] },
  { id: 'rivaroxaban', fa: 'ریواروکسابان', en: 'Rivaroxaban', category: 'anticoagulant', doses: ['۲٫۵ میلی‌گرم', '۱۰ میلی‌گرم', '۱۵ میلی‌گرم', '۲۰ میلی‌گرم'] },
  { id: 'omeprazole', fa: 'امپرازول', en: 'Omeprazole', category: 'stomach', doses: ['۲۰ میلی‌گرم', '۴۰ میلی‌گرم'] },
  { id: 'pantoprazole', fa: 'پنتوپرازول', en: 'Pantoprazole', category: 'stomach', doses: ['۲۰ میلی‌گرم', '۴۰ میلی‌گرم'] },
  { id: 'famotidine', fa: 'فاموتیدین', en: 'Famotidine', category: 'stomach', doses: ['۲۰ میلی‌گرم', '۴۰ میلی‌گرم'] },
  { id: 'sertraline', fa: 'سرترالین', en: 'Sertraline', category: 'mentalHealth', doses: ['۲۵ میلی‌گرم', '۵۰ میلی‌گرم', '۱۰۰ میلی‌گرم'] },
  { id: 'escitalopram', fa: 'اس‌سیتالوپرام', en: 'Escitalopram', category: 'mentalHealth', doses: ['۵ میلی‌گرم', '۱۰ میلی‌گرم', '۲۰ میلی‌گرم'] },
  { id: 'fluoxetine', fa: 'فلوکستین', en: 'Fluoxetine', category: 'mentalHealth', doses: ['۱۰ میلی‌گرم', '۲۰ میلی‌گرم', '۴۰ میلی‌گرم'] },
  { id: 'venlafaxine', fa: 'ونلافاکسین', en: 'Venlafaxine', category: 'mentalHealth', doses: ['۳۷٫۵ میلی‌گرم', '۷۵ میلی‌گرم', '۱۵۰ میلی‌گرم'] },
  { id: 'gabapentin', fa: 'گاباپنتین', en: 'Gabapentin', category: 'neurology', doses: ['۱۰۰ میلی‌گرم', '۳۰۰ میلی‌گرم', '۴۰۰ میلی‌گرم', '۶۰۰ میلی‌گرم'] },
  { id: 'pregabalin', fa: 'پرگابالین', en: 'Pregabalin', category: 'neurology', doses: ['۲۵ میلی‌گرم', '۵۰ میلی‌گرم', '۷۵ میلی‌گرم', '۱۵۰ میلی‌گرم'] },
  { id: 'levetiracetam', fa: 'لوتیراستام', en: 'Levetiracetam', category: 'neurology', doses: ['۲۵۰ میلی‌گرم', '۵۰۰ میلی‌گرم', '۷۵۰ میلی‌گرم', '۱۰۰۰ میلی‌گرم'] },
  { id: 'lamotrigine', fa: 'لاموتریژین', en: 'Lamotrigine', category: 'neurology', doses: ['۲۵ میلی‌گرم', '۵۰ میلی‌گرم', '۱۰۰ میلی‌گرم', '۲۰۰ میلی‌گرم'] },
  { id: 'acetaminophen', fa: 'استامینوفن', en: 'Acetaminophen', category: 'pain', doses: ['۳۲۵ میلی‌گرم', '۵۰۰ میلی‌گرم', '۶۵۰ میلی‌گرم'] },
  { id: 'ibuprofen', fa: 'ایبوپروفن', en: 'Ibuprofen', category: 'pain', doses: ['۲۰۰ میلی‌گرم', '۴۰۰ میلی‌گرم', '۶۰۰ میلی‌گرم'] },
  { id: 'naproxen', fa: 'ناپروکسن', en: 'Naproxen', category: 'pain', doses: ['۲۵۰ میلی‌گرم', '۵۰۰ میلی‌گرم'] },
  { id: 'diclofenac', fa: 'دیکلوفناک', en: 'Diclofenac', category: 'pain', doses: ['۲۵ میلی‌گرم', '۵۰ میلی‌گرم', '۷۵ میلی‌گرم'] },
  { id: 'amoxicillin', fa: 'آموکسی‌سیلین', en: 'Amoxicillin', category: 'antibiotic', doses: ['۲۵۰ میلی‌گرم', '۵۰۰ میلی‌گرم', '۸۷۵ میلی‌گرم'] },
  { id: 'azithromycin', fa: 'آزیترومایسین', en: 'Azithromycin', category: 'antibiotic', doses: ['۲۵۰ میلی‌گرم', '۵۰۰ میلی‌گرم'] },
  { id: 'cefuroxime', fa: 'سفوروکسیم', en: 'Cefuroxime', category: 'antibiotic', doses: ['۲۵۰ میلی‌گرم', '۵۰۰ میلی‌گرم'] },
  { id: 'vitamin-d3', fa: 'ویتامین د۳', en: 'Vitamin D3', category: 'supplement', doses: ['۱۰۰۰ واحد', '۲۰۰۰ واحد', '۵۰۰۰ واحد', '۵۰۰۰۰ واحد'] },
  { id: 'vitamin-b12', fa: 'ویتامین ب۱۲', en: 'Vitamin B12', category: 'supplement', doses: ['۵۰۰ میکروگرم', '۱۰۰۰ میکروگرم'] },
  { id: 'iron', fa: 'آهن', en: 'Iron', category: 'supplement', doses: ['۲۷ میلی‌گرم', '۶۵ میلی‌گرم'] },
  { id: 'calcium', fa: 'کلسیم', en: 'Calcium', category: 'supplement', doses: ['۵۰۰ میلی‌گرم', '۶۰۰ میلی‌گرم'] },
  { id: 'prednisolone', fa: 'پردنیزولون', en: 'Prednisolone', category: 'rheumatology', doses: ['۵ میلی‌گرم', '۱۰ میلی‌گرم', '۲۰ میلی‌گرم'] },
  { id: 'methotrexate', fa: 'متوترکسات', en: 'Methotrexate', category: 'rheumatology', doses: ['۲٫۵ میلی‌گرم', '۱۰ میلی‌گرم'] },
  { id: 'hydroxychloroquine', fa: 'هیدروکسی‌کلروکین', en: 'Hydroxychloroquine', category: 'rheumatology', doses: ['۲۰۰ میلی‌گرم'] },
  { id: 'tamsulosin', fa: 'تامسولوسین', en: 'Tamsulosin', category: 'urology', doses: ['۰٫۴ میلی‌گرم'] },
  { id: 'finasteride', fa: 'فیناستراید', en: 'Finasteride', category: 'urology', doses: ['۱ میلی‌گرم', '۵ میلی‌گرم'] },
  { id: 'montelukast', fa: 'مونته‌لوکاست', en: 'Montelukast', category: 'respiratory', doses: ['۴ میلی‌گرم', '۵ میلی‌گرم', '۱۰ میلی‌گرم'] },
  { id: 'cetirizine', fa: 'ستیریزین', en: 'Cetirizine', category: 'respiratory', doses: ['۵ میلی‌گرم', '۱۰ میلی‌گرم'] },
  { id: 'loratadine', fa: 'لوراتادین', en: 'Loratadine', category: 'respiratory', doses: ['۱۰ میلی‌گرم'] },
]

export function normalizeDrugSearch(value) {
  return String(value || '')
    .toLocaleLowerCase('fa')
    .replaceAll('ي', 'ی')
    .replaceAll('ك', 'ک')
    .replace(/[\u200c\s-]+/g, '')
}

export function searchMedicationCatalog(query, limit = 6) {
  const normalized = normalizeDrugSearch(query)
  if (!normalized) return []
  return MEDICATION_CATALOG
    .filter(item => normalizeDrugSearch(`${item.fa} ${item.en}`).includes(normalized))
    .slice(0, limit)
}

export function findMedicationById(id) {
  return MEDICATION_CATALOG.find(item => item.id === id) || null
}
