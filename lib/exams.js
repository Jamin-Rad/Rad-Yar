export const EXAM_LIMITS = Object.freeze({
  maxQuestions: 100,
  maxActiveDurationMinutes: 525600,
  maxTitleLength: 160,
  maxDescriptionLength: 3000,
  maxPromptLength: 4000,
  maxOptionLength: 1200,
})

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export function validateExamInput(payload) {
  if (!payload || typeof payload !== 'object') {
    return { error: 'اطلاعات آزمون معتبر نیست.' }
  }

  const title = cleanText(payload.title, EXAM_LIMITS.maxTitleLength)
  const description = cleanText(payload.description, EXAM_LIMITS.maxDescriptionLength)
  const durationMinutes = Number(payload.durationMinutes)
  const activeDurationMinutes = Number(payload.activeDurationMinutes)
  const passPercent = Number(payload.passPercent)
  const questions = Array.isArray(payload.questions) ? payload.questions : []

  if (title.length < 3) return { error: 'عنوان آزمون باید حداقل ۳ حرف داشته باشد.' }
  if (!Number.isInteger(durationMinutes) || durationMinutes < 1 || durationMinutes > 240) {
    return { error: 'زمان آزمون باید بین ۱ تا ۲۴۰ دقیقه باشد.' }
  }
  if (!Number.isInteger(activeDurationMinutes) || activeDurationMinutes < 1 || activeDurationMinutes > EXAM_LIMITS.maxActiveDurationMinutes) {
    return { error: 'مدت فعال‌بودن آزمون باید بین یک دقیقه تا یک سال باشد.' }
  }
  if (!Number.isInteger(passPercent) || passPercent < 0 || passPercent > 100) {
    return { error: 'حد قبولی باید بین صفر تا صد باشد.' }
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

    normalizedQuestions.push({ prompt, options, correctOptionIndex, points, position: index })
  }

  return {
    value: {
      title,
      description,
      durationMinutes,
      activationMode,
      opensAt: opensAt.toISOString(),
      closesAt: closesAt.toISOString(),
      activeDurationMinutes,
      passPercent,
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
