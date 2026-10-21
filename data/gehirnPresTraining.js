import { GEHIRN_PRES_LESSON } from './gehirnPresLesson'

const LANGUAGES = ['de', 'en', 'fa']
const lesson = GEHIRN_PRES_LESSON

export const GEHIRN_PRES_QUESTIONS = Object.fromEntries(LANGUAGES.map(lang => {
  const assessment = lesson.assessment
  return [lang, [{
    id: `pres-${lang}-1`,
    tags: ['pres'],
    fach: 'gehirn',
    question: assessment.question[lang],
    options: assessment.options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
    correct: String.fromCharCode(65 + assessment.correctIndex),
    explanation: assessment.feedback[lang],
  }]]
}))

export const GEHIRN_PRES_FLASHCARD_TOPIC = {
  id: 'pres',
  area: 'Gehirn',
  chapter: 'Enzephalopathien',
  icon: 'MRT',
  iconImage: '/fach/gehirn.png',
  color: '#607fbb',
  href: '/flashcards/pres',
  title: { de: 'PRES', en: 'PRES', fa: 'PRES' },
  subtitle: {
    de: 'Verteilung · Diffusion · Differenzialdiagnose',
    en: 'Distribution · diffusion · differential diagnosis',
    fa: 'توزیع · انتشار · تشخیص افتراقی',
  },
}

export const GEHIRN_PRES_FLASHCARDS = [
  {
    id: 'pres-01-pattern', topicId: 'pres', category: 'Gehirn',
    front: {
      de: 'Welches typische Verteilungsmuster zeigt PRES auf T2/FLAIR?',
      en: 'What is the typical T2/FLAIR distribution pattern in PRES?',
      fa: 'الگوی معمول توزیع PRES در T2/FLAIR چیست؟',
    },
    answer: {
      de: 'Beidseitige, parieto-okzipital betonte kortikale und subkortikale Hyperintensitäten, meist stärker in der weißen Substanz.',
      en: 'Bilateral cortical and subcortical hyperintensity with parieto-occipital predominance, usually greater in white matter.',
      fa: 'افزایش سیگنال قشری و زیرقشری دوطرفه با غلبهٔ آهیانه‌ای ـ پس‌سری که معمولاً در مادهٔ سفید بارزتر است.',
    },
    explanation: {
      de: 'Das Muster ist häufig, aber nicht auf die hinteren Abschnitte beschränkt.',
      en: 'This pattern is common, but involvement is not limited to posterior regions.',
      fa: 'این الگو شایع است، اما درگیری به نواحی خلفی محدود نمی‌شود.',
    },
  },
  {
    id: 'pres-02-diffusion', topicId: 'pres', category: 'Gehirn',
    front: {
      de: 'Was prüfen Sie bei DWI-Hyperintensität, bevor Sie eine Diffusionsrestriktion annehmen?',
      en: 'When DWI is hyperintense, what should you check before calling restricted diffusion?',
      fa: 'در صورت بالا بودن سیگنال DWI، پیش از تشخیص محدودیت انتشار چه چیزی را بررسی می‌کنید؟',
    },
    answer: {
      de: 'Die ADC-Karte. Ein erhöhtes ADC passt zu überwiegend vasogenem Ödem; ein erniedrigtes ADC kann auf zytotoxische Schädigung hinweisen.',
      en: 'The ADC map. Increased ADC fits predominantly vasogenic oedema; reduced ADC may indicate cytotoxic injury.',
      fa: 'نقشهٔ ADC را. ADC افزایش‌یافته با ادم عمدتاً وازوژنیک سازگار است؛ ADC کاهش‌یافته می‌تواند به آسیب سیتوتوکسیک اشاره کند.',
    },
    explanation: {
      de: 'Helles DWI allein kann T2-shine-through sein und beweist keine echte Restriktion.',
      en: 'Bright DWI alone may reflect T2 shine-through and does not prove true restriction.',
      fa: 'روشن‌بودن DWI به‌تنهایی ممکن است ناشی از T2 shine-through باشد و محدودیت واقعی را ثابت نمی‌کند.',
    },
  },
  {
    id: 'pres-03-variation', topicId: 'pres', category: 'Gehirn',
    front: {
      de: 'Welche weiteren Verteilungen können bei PRES auftreten?',
      en: 'What other distributions can occur in PRES?',
      fa: 'چه توزیع‌های دیگری ممکن است در PRES دیده شوند؟',
    },
    answer: {
      de: 'Holohemisphärische Grenzzonen- oder superior-frontale Sulcusmuster; zusätzlich können Hirnstamm, Kleinhirn und Basalganglien betroffen sein.',
      en: 'Holohemispheric watershed or superior frontal sulcus patterns; the brainstem, cerebellum, and basal ganglia may also be involved.',
      fa: 'الگوی مرزی سراسر نیمکره یا شیار فرونتال فوقانی؛ ساقهٔ مغز، مخچه و عقده‌های قاعده‌ای نیز ممکن است درگیر شوند.',
    },
    explanation: {
      de: 'Eine atypische Verteilung schließt PRES nicht aus, verlangt aber eine sorgfältige Differenzialdiagnose.',
      en: 'An atypical distribution does not exclude PRES, but requires careful differential diagnosis.',
      fa: 'توزیع غیرمعمول PRES را رد نمی‌کند، اما بررسی دقیق تشخیص افتراقی لازم است.',
    },
  },
]
