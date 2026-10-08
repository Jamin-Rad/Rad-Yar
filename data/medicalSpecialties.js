export const PARTICIPANT_SPECIALTY_KEY = '__radyar_participant_specialty'
export const SPECIALTY_OTHER_VALUE = 'سایر'

export const MEDICAL_SPECIALTY_GROUPS_FA = Object.freeze([
  {
    label: 'تخصص یا رشته',
    options: Object.freeze([
      'ارتوپدی',
      'اطفال',
      'اورولوژی',
      'بیهوشی',
      'پاتولوژی',
      'پزشکی خانواده',
      'پزشکی عمومی',
      'پزشکی قانونی',
      'پزشکی هسته‌ای',
      'پوست',
      'جراحی عروق',
      'جراحی عمومی',
      'جراحی قلب و عروق',
      'جراحی مغز و اعصاب',
      'چشم‌پزشکی',
      'داخلی',
      'دندان‌پزشکی',
      'رادیوتراپی و انکولوژی',
      'رادیولوژی',
      'روان‌پزشکی',
      'روماتولوژی',
      'ریه',
      'زنان و زایمان',
      SPECIALTY_OTHER_VALUE,
      'طب اورژانس',
      'طب فیزیکی و توان‌بخشی',
      'طب کار',
      'طب ورزشی',
      'عفونی',
      'غدد و متابولیسم',
      'قلب و عروق',
      'گوارش و کبد',
      'گوش، حلق و بینی',
      'مراقبت‌های ویژه',
      'مغز و اعصاب',
      'نفرولوژی',
      'هماتولوژی و انکولوژی',
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
