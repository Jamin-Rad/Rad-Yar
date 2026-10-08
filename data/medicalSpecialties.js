export const PARTICIPANT_SPECIALTY_KEY = '__radyar_participant_specialty'
export const SPECIALTY_OTHER_VALUE = 'سایر'

export const MEDICAL_SPECIALTY_GROUPS_FA = Object.freeze([
  {
    label: 'پزشکی عمومی و دورهٔ آموزش',
    options: Object.freeze([
      'دانشجوی پزشکی',
      'کارورز پزشکی (اینترن)',
      'پزشک عمومی',
      'پزشکی خانواده',
    ]),
  },
  {
    label: 'قلب و تصویربرداری پزشکی',
    options: Object.freeze([
      'قلب و عروق',
      'فلوشیپ تصویربرداری قلب',
      'فلوشیپ اینترونشنال کاردیولوژی',
      'فلوشیپ الکتروفیزیولوژی قلب',
      'فلوشیپ نارسایی قلب و پیوند',
      'قلب کودکان',
      'جراحی قلب و عروق',
      'رادیولوژی',
      'فلوشیپ تصویربرداری قلب و عروق',
      'پزشکی هسته‌ای',
      'تکنولوژی پرتوشناسی و تصویربرداری پزشکی',
    ]),
  },
  {
    label: 'تخصص‌های داخلی',
    options: Object.freeze([
      'بیماری‌های داخلی',
      'طب اورژانس',
      'بیهوشی',
      'مراقبت‌های ویژه',
      'بیماری‌های کودکان',
      'مغز و اعصاب',
      'گوارش و کبد',
      'بیماری‌های ریه',
      'نفرولوژی',
      'غدد و متابولیسم',
      'روماتولوژی',
      'هماتولوژی و انکولوژی',
      'بیماری‌های عفونی',
      'پوست',
      'روان‌پزشکی',
      'طب سالمندی',
    ]),
  },
  {
    label: 'تخصص‌های جراحی و بالینی',
    options: Object.freeze([
      'جراحی عمومی',
      'جراحی مغز و اعصاب',
      'جراحی عروق',
      'ارتوپدی',
      'زنان و زایمان',
      'اورولوژی',
      'گوش، حلق و بینی',
      'چشم‌پزشکی',
      'طب فیزیکی و توان‌بخشی',
      'طب ورزشی',
      'طب کار',
      'پزشکی قانونی',
      'پاتولوژی',
      'رادیوتراپی و انکولوژی',
      'دندان‌پزشکی',
    ]),
  },
  {
    label: 'سایر رشته‌های سلامت',
    options: Object.freeze([
      'پرستاری',
      'مامایی',
      'علوم آزمایشگاهی',
      'فوریت‌های پزشکی',
      'فیزیوتراپی',
      'کاردرمانی',
      'پژوهشگر علوم پزشکی',
      SPECIALTY_OTHER_VALUE,
    ]),
  },
])

export const MEDICAL_SPECIALTIES_FA = Object.freeze(
  MEDICAL_SPECIALTY_GROUPS_FA.flatMap(group => group.options),
)

export function normalizeParticipantSpecialty(value) {
  const specialty = typeof value === 'string' ? value.trim().slice(0, 120) : ''
  if (MEDICAL_SPECIALTIES_FA.includes(specialty) && specialty !== SPECIALTY_OTHER_VALUE) return specialty
  if (!specialty.startsWith(`${SPECIALTY_OTHER_VALUE}:`)) return ''
  const customSpecialty = specialty.slice(SPECIALTY_OTHER_VALUE.length + 1).trim()
  return customSpecialty.length >= 2 ? `${SPECIALTY_OTHER_VALUE}: ${customSpecialty}` : ''
}
