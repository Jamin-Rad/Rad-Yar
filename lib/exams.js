import { normalizeExamMedia } from '@/utils/examMedia'

export const EXAM_LIMITS = Object.freeze({
  maxQuestions: 100,
  maxActiveDurationMinutes: 525600,
  maxTitleLength: 160,
  maxDescriptionLength: 3000,
  maxOrganizerNameLength: 120,
  maxPromptLength: 4000,
  maxOptionLength: 1200,
  maxExplanationLength: 8000,
})

export const EXAM_LANGUAGES = Object.freeze(['fa', 'en', 'de'])
const MEDIA_PREFIX = '__RADYAR_EXAM_MEDIA_V1__\n'
const MEDIA_SUFFIX = '\n__END_RADYAR_EXAM_MEDIA__\n'

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export function packExamQuestionExplanation(explanation, media) {
  const cleanExplanation = cleanText(explanation, EXAM_LIMITS.maxExplanationLength)
  const normalizedMedia = normalizeExamMedia(media)
  if (!normalizedMedia) return cleanExplanation

  const metadata = JSON.stringify(normalizedMedia)
  const remaining = Math.max(0, EXAM_LIMITS.maxExplanationLength - MEDIA_PREFIX.length - MEDIA_SUFFIX.length - metadata.length)
  return `${MEDIA_PREFIX}${metadata}${MEDIA_SUFFIX}${cleanExplanation.slice(0, remaining)}`
}

export function unpackExamQuestionExplanation(value) {
  const stored = typeof value === 'string' ? value : ''
  if (!stored.startsWith(MEDIA_PREFIX)) return { explanation: stored, media: null }

  const suffixIndex = stored.indexOf(MEDIA_SUFFIX, MEDIA_PREFIX.length)
  if (suffixIndex < 0) return { explanation: stored, media: null }
  try {
    const rawMedia = JSON.parse(stored.slice(MEDIA_PREFIX.length, suffixIndex))
    const media = normalizeExamMedia(rawMedia)
    if (!media) return { explanation: stored.slice(suffixIndex + MEDIA_SUFFIX.length), media: null }
    return { explanation: stored.slice(suffixIndex + MEDIA_SUFFIX.length), media }
  } catch {
    return { explanation: stored, media: null }
  }
}

export function validateExamInput(payload) {
  if (!payload || typeof payload !== 'object') {
    return { error: 'اطلاعات آزمون معتبر نیست.' }
  }

  const title = cleanText(payload.title, EXAM_LIMITS.maxTitleLength)
  const description = cleanText(payload.description, EXAM_LIMITS.maxDescriptionLength)
  const organizerName = cleanText(payload.organizerName, EXAM_LIMITS.maxOrganizerNameLength)
  const durationMinutes = Number(payload.durationMinutes)
  const activeDurationMinutes = Number(payload.activeDurationMinutes)
  const language = EXAM_LANGUAGES.includes(payload.language) ? payload.language : 'fa'
  const questions = Array.isArray(payload.questions) ? payload.questions : []

  if (title.length < 3) return { error: 'عنوان آزمون باید حداقل ۳ حرف داشته باشد.' }
  if (organizerName.length < 2) return { error: 'نام برگزارکننده را وارد کنید.' }
  if (!Number.isInteger(durationMinutes) || durationMinutes < 2 || durationMinutes > 240 || durationMinutes % 2 !== 0) {
    return { error: 'زمان آزمون باید یک عدد زوج بین ۲ تا ۲۴۰ دقیقه باشد.' }
  }
  if (!Number.isInteger(activeDurationMinutes) || activeDurationMinutes < 1 || activeDurationMinutes > EXAM_LIMITS.maxActiveDurationMinutes) {
    return { error: 'مدت فعال‌بودن آزمون باید بین یک دقیقه تا یک سال باشد.' }
  }
  if (questions.length < 1 || questions.length > EXAM_LIMITS.maxQuestions) {
    return { error: `تعداد سؤال‌ها باید بین ۱ تا ${EXAM_LIMITS.maxQuestions} باشد.` }
  }

  const activationMode = payload.activationMode === 'scheduled' ? 'scheduled' : 'now'
  const parsedOpensAt = activationMode === 'scheduled' ? Date.parse(payload.opensAt) : Date.now()
  if (!Number.isFinite(parsedOpensAt)) return { error: 'تاریخ و ساعت فعال‌شدن آزمون معتبر نیست.' }
  if (activationMode === 'scheduled' && parsedOpensAt < Date.now() - 5 * 60 * 1000) {
    return { error: 'زمان فعال‌شدن آزمون نمی‌تواند در گذشته باشد.' }
  }
  const opensAt = new Date(parsedOpensAt)
  const closesAt = new Date(opensAt.getTime() + activeDurationMinutes * 60 * 1000)

  const normalizedQuestions = []
  for (let index = 0; index < questions.length; index += 1) {
    const question = questions[index]
    const prompt = cleanText(question?.prompt, EXAM_LIMITS.maxPromptLength)
    const options = Array.isArray(question?.options)
      ? question.options.slice(0, 4).map(option => cleanText(option, EXAM_LIMITS.maxOptionLength))
      : []
    const correctOptionIndex = Number(question?.correctOptionIndex)
    const points = Number(question?.points ?? 1)
    const explanation = cleanText(question?.explanation, EXAM_LIMITS.maxExplanationLength)
    const media = normalizeExamMedia(question?.media)

    if (prompt.length < 3) return { error: `متن سؤال ${index + 1} کامل نیست.` }
    if (options.length !== 4 || options.some(option => !option)) {
      return { error: `برای سؤال ${index + 1} باید چهار گزینه کامل وارد شود.` }
    }
    if (!Number.isInteger(correctOptionIndex) || correctOptionIndex < 0 || correctOptionIndex > 3) {
      return { error: `پاسخ درست سؤال ${index + 1} مشخص نشده است.` }
    }
    if (!Number.isInteger(points) || points < 1 || points > 100) {
      return { error: `امتیاز سؤال ${index + 1} معتبر نیست.` }
    }

    normalizedQuestions.push({ prompt, options, correctOptionIndex, points, explanation, media, position: index })
  }

  return {
    value: {
      title,
      description,
      organizerName,
      language,
      durationMinutes,
      activationMode,
      opensAt: opensAt.toISOString(),
      closesAt: closesAt.toISOString(),
      activeDurationMinutes,
      passPercent: 0,
      showResult: payload.showResult !== false,
      publishNow: payload.publishNow !== false,
      questions: normalizedQuestions,
    },
  }
}

export function gradeExam(questions, rawAnswers) {
  const answers = rawAnswers && typeof rawAnswers === 'object' && !Array.isArray(rawAnswers)
    ? rawAnswers
    : {}
  let score = 0
  let maxScore = 0
  const normalizedAnswers = {}

  for (const question of questions) {
    const points = Number(question.points) || 1
    const selected = Number(answers[question.id])
    const validSelection = Number.isInteger(selected) && selected >= 0 && selected <= 3
    maxScore += points
    normalizedAnswers[question.id] = validSelection ? selected : null
    if (validSelection && selected === Number(question.correct_option_index)) score += points
  }

  const percentage = maxScore > 0 ? Number(((score / maxScore) * 100).toFixed(2)) : 0
  return { score, maxScore, percentage, answers: normalizedAnswers }
}
