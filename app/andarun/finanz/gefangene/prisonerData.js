export const PRISONERS = [
  { id: 1, name: 'محمد مهدی س', fatherName: 'صفر', nationalId: '۲۴۳***۰۹۴۱', prison: 'مرکزی شیراز', totalDebtRial: 5271621468, neededRial: 780000000 },
  { id: 2, name: 'سارا م', fatherName: 'محمد', nationalId: '۲۴۶***۰۷۸۱', prison: 'مرکزی شیراز', totalDebtRial: 16176656640, neededRial: 620000000 },
  { id: 3, name: 'الهه د', fatherName: 'رضا', nationalId: '۲۳۰***۸۶۵۷', prison: 'مرکزی شیراز', totalDebtRial: 16762442400, neededRial: 540000000 },
  { id: 4, name: 'ناهید م', fatherName: 'گودرز', nationalId: '۲۴۲***۳۲۹۹', prison: 'مرکزی شیراز', totalDebtRial: 13200000000, neededRial: 980000000 },
  { id: 5, name: 'زهره ق', fatherName: 'مانده‌علی', nationalId: '۲۵۷***۲۹۹۳', prison: 'مرکزی شیراز', totalDebtRial: 16000000000, neededRial: 1500000000 },
  { id: 6, name: 'اسفند ج', fatherName: 'عزیز', nationalId: '۶۵۴***۷۳۸۶', prison: 'جهرم', totalDebtRial: 1683000000, neededRial: 350000000 },
  { id: 7, name: 'امید ش', fatherName: 'صفر', nationalId: '۲۲۸***۷۲۷۶', prison: 'مرکزی شیراز', totalDebtRial: 746515000, neededRial: 340000000 },
  { id: 8, name: 'علی ح', fatherName: 'محمد', nationalId: '۲۴۴***۳۲۱۹', prison: 'جهرم', totalDebtRial: 1750000000, neededRial: 268000000 },
  { id: 9, name: 'فرزاد م', fatherName: 'آقاجان', nationalId: '۲۵۷***۸۲۱۳', prison: 'فسا', totalDebtRial: 6568036000, neededRial: 360000000 },
  { id: 10, name: 'احمد علی م', fatherName: 'بهزاد', nationalId: '۶۵۵***۵۱۲۱', prison: 'مرکزی شیراز', totalDebtRial: 3591867500, neededRial: 200000000 },
  { id: 11, name: 'زهرا ا', fatherName: 'علی', nationalId: '۲۲۸***۶۴۸۸', prison: 'مرکزی شیراز', totalDebtRial: 9960000000, neededRial: 500000000 },
  { id: 12, name: 'فاضل د', fatherName: 'علی', nationalId: '۲۳۹***۲۶۰۱', prison: 'نورآباد ممسنی', totalDebtRial: 1973909881, neededRial: 473000000 },
  { id: 13, name: 'سمانه د', fatherName: 'قدمعلی', nationalId: '۲۲۸***۸۰۸۷', prison: 'مرکزی شیراز', totalDebtRial: 8408140000, neededRial: 800000000 },
  { id: 14, name: 'ماه‌رخ ش', fatherName: 'حاجی', nationalId: '۲۴۷***۷۹۴۹', prison: 'مرکزی شیراز', totalDebtRial: 12698646431, neededRial: 740000000 },
  { id: 15, name: 'مهران ف', fatherName: 'علی‌اکبر', nationalId: '۱۸۱***۶۵۶۹', prison: 'مرکزی شیراز', totalDebtRial: 2650000000, neededRial: 650000000 },
  { id: 16, name: 'احمد ن', fatherName: 'قدرت‌الله', nationalId: '۲۲۹***۷۱۶۳', prison: 'مرکزی شیراز', totalDebtRial: 2550000000, neededRial: 550000000 },
  { id: 17, name: 'سیاوش م', fatherName: 'احمد', nationalId: '۲۴۵***۴۱۹۴', prison: 'مرکزی شیراز', totalDebtRial: 1544267143, neededRial: 540000000 },
  { id: 18, name: 'حسین ب', fatherName: 'جهانگیر', nationalId: '۲۲۸***۳۳۱۲', prison: 'مرکزی شیراز', totalDebtRial: 1700000000, neededRial: 700000000 },
  { id: 19, name: 'ذاکر م', fatherName: 'علی‌قلی', nationalId: '۲۳۹***۶۰۸۸', prison: 'مرکزی شیراز', totalDebtRial: 10720639233, neededRial: 1140000000 },
  { id: 20, name: 'امید ص', fatherName: 'صفدر', nationalId: '۲۲۹***۶۹۷۰', prison: 'مرکزی شیراز', totalDebtRial: 7783057543, neededRial: 750000000 },
]

export const TOTAL_NEEDED_RIAL = PRISONERS.reduce((sum, prisoner) => sum + prisoner.neededRial, 0)

export function neededToman(prisoner) {
  return prisoner.neededRial / 10
}
