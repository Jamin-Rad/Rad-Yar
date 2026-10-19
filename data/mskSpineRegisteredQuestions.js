import { MSK_SPINE_LESSON_QUESTION_DRAFTS } from './mskSpineLessonAssessmentDrafts'

const L = (de, en, fa) => ({ de, en, fa })
const languages = ['de', 'en', 'fa']

// These are the only drafts whose curriculum IDs currently resolve to a linked lesson.
// Keep each registration tied to the exact route topic; leave Scheuermann unregistered
// because its curriculum item has no lesson route yet.
const registrations = [
  {
    key: 'degenerative-wirbelsaeule-cord-vs-cauda-01', topicId: 'spinalkanalstenose',
    fourth: L('Eine isolierte Bandscheibenprotrusion ohne neurale Einengung', 'An isolated disc protrusion without neural narrowing', 'یک برجستگی منفرد دیسک بدون تنگی عصبی'),
  },
  {
    key: 'degenerative-wirbelsaeule-signal-prognosis-02', topicId: 'spinalkanalstenose',
    fourth: L('Die Signalintensität erlaubt unabhängig von Klinik und Morphologie eine sichere individuelle Prognose.', 'Signal intensity provides a certain individual prognosis independent of clinical context and morphology.', 'شدت سیگنال بدون توجه به بالین و مورفولوژی، پیش‌آگهی قطعی فردی می‌دهد.'),
  },
  {
    key: 'spondylodiszitis-tb-pattern-01', topicId: 'spondylodiszitis',
    fourth: L('Die Kombination ist spezifisch genug, um eine mikrobiologische Abklärung entbehrlich zu machen.', 'The combination is specific enough to make microbiological work-up unnecessary.', 'این ترکیب آن‌قدر اختصاصی است که بررسی میکروبی را غیرضروری می‌کند.'),
  },
  {
    key: 'knochentumor-grundlagen-lodwick-01', topicId: 'knochentumor-grundlagen',
    fourth: L('Sie legt den Tumortyp fest, sofern die Läsion im langen Röhrenknochen liegt.', 'It determines the tumour type if the lesion is in a long bone.', 'اگر ضایعه در استخوان بلند باشد، نوع تومور را تعیین می‌کند.'),
  },
  {
    key: 'ws-entzuendlich-asas-mri-01', topicId: 'morbus-bechterew-ws',
    fourth: L('Es beweist eine axSpA, wenn es auf mindestens einer Schicht sichtbar ist.', 'It proves axSpA when visible on at least one slice.', 'اگر در دست‌کم یک برش دیده شود، axSpA را ثابت می‌کند.'),
  },
]

const byKey = Object.fromEntries(MSK_SPINE_LESSON_QUESTION_DRAFTS.map(question => [question.id, question]))

export const MSK_SPINE_REGISTERED_QUESTIONS = registrations.map(({ key, topicId, fourth }) => {
  const draft = byKey[key]
  if (!draft) throw new Error(`Missing MSK/spine assessment draft: ${key}`)
  return Object.fromEntries(languages.map(lang => [lang, {
    id: `${draft.id}-${lang}`,
    tags: [topicId],
    fach: 'msk',
    question: draft.question[lang],
    options: [
      ...draft.options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
      { id: 'D', text: fourth[lang] },
    ],
    correct: draft.correct,
    explanation: draft.explanation[lang],
  }]))
})
