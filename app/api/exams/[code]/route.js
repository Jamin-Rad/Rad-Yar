import { NextResponse } from 'next/server'
import { gradeExam, unpackExamQuestionExplanation } from '@/lib/exams'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const CODE_PATTERN = /^[A-Za-z0-9_-]{8,40}$/
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INSTAGRAM_PATTERN = /^(?=.*[A-Za-z0-9])[A-Za-z0-9._]{1,30}$/

function databaseUnavailable() {
  return NextResponse.json({ error: 'سامانه امتحان موقتاً در دسترس نیست.' }, { status: 503 })
}

const SUBMISSION_GRACE_MS = 30000

function formatAvailabilityDate(value, language) {
  const locale = { fa: 'fa-IR', en: 'en-US', de: 'de-DE' }[language] || 'fa-IR'
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

const AVAILABILITY_COPY = Object.freeze({
  fa: { opens: date => `این آزمون از ${date} فعال می‌شود.`, closed: 'مهلت شرکت در این آزمون به پایان رسیده است.' },
  en: { opens: date => `This exam will be available from ${date}.`, closed: 'The participation period for this exam has ended.' },
  de: { opens: date => `Diese Prüfung ist ab ${date} verfügbar.`, closed: 'Der Teilnahmezeitraum für diese Prüfung ist beendet.' },
})

function normalizeContact(value) {
  const raw = typeof value === 'string' ? value.trim().slice(0, 254) : ''
  if (EMAIL_PATTERN.test(raw)) return { value: raw.toLowerCase(), type: 'email' }

  const withoutUrl = raw.replace(/^https?:\/\/(?:www\.)?instagram\.com\//i, '')
  const handle = withoutUrl.replace(/^@/, '').split(/[/?#]/)[0]
  if (INSTAGRAM_PATTERN.test(handle)) return { value: `@${handle.toLowerCase()}`, type: 'instagram' }
  return null
}

async function loadPublishedExam(code, includeAnswers = false) {
  const { data: exam, error: examError } = await supabaseAdmin
    .from('exams')
    .select('id,title,description,organizer_name,language,status,duration_minutes,show_result,opens_at,closes_at')
    .eq('public_code', code)
    .maybeSingle()

  if (examError) return { error: examError }
  if (!exam || exam.status !== 'published') return { notFound: true }

  const now = Date.now()
  const copy = AVAILABILITY_COPY[exam.language] || AVAILABILITY_COPY.fa
  const opensAt = Date.parse(exam.opens_at)
  const closesAt = Date.parse(exam.closes_at)
  if (Number.isFinite(opensAt) && now < opensAt) {
    return { unavailable: copy.opens(formatAvailabilityDate(exam.opens_at, exam.language)) }
  }
  const closingGrace = includeAnswers ? SUBMISSION_GRACE_MS : 0
  if (Number.isFinite(closesAt) && now > closesAt + closingGrace) {
    return { unavailable: copy.closed }
  }

  const fields = includeAnswers
    ? 'id,prompt,options,correct_option_index,explanation,points,position'
    : 'id,prompt,options,explanation,points,position'
  const { data: questions, error: questionsError } = await supabaseAdmin
    .from('exam_questions')
    .select(fields)
    .eq('exam_id', exam.id)
    .order('position')

  if (questionsError) return { error: questionsError }
  return {
    exam,
    questions: (questions || []).map(question => {
      const unpacked = unpackExamQuestionExplanation(question.explanation)
      return { ...question, explanation: unpacked.explanation, media: unpacked.media }
    }),
  }
}

export async function GET(_request, { params }) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return databaseUnavailable()
  const { code } = await params
  if (!CODE_PATTERN.test(code || '')) return NextResponse.json({ error: 'لینک آزمون معتبر نیست.' }, { status: 404 })

  const result = await loadPublishedExam(code)
  if (result.error) {
    console.error('بارگذاری آزمون عمومی انجام نشد:', result.error)
    return databaseUnavailable()
  }
  if (result.notFound) return NextResponse.json({ error: 'این آزمون فعال نیست.' }, { status: 404 })
  if (result.unavailable) return NextResponse.json({ error: result.unavailable }, { status: 409 })

  return NextResponse.json({
    exam: result.exam,
    questions: result.questions.map(({ explanation: _explanation, ...question }) => question),
  })
}

export async function POST(request, { params }) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return databaseUnavailable()
  const { code } = await params
  if (!CODE_PATTERN.test(code || '')) return NextResponse.json({ error: 'لینک آزمون معتبر نیست.' }, { status: 404 })

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'درخواست معتبر نیست.' }, { status: 400 })
  }

  if (payload?.website) return NextResponse.json({ error: 'درخواست معتبر نیست.' }, { status: 400 })
  const participantName = typeof payload?.participantName === 'string'
    ? payload.participantName.trim().slice(0, 120)
    : ''
  const participantContact = normalizeContact(payload?.participantContact || payload?.participantEmail)
  if (participantName.length < 2) {
    return NextResponse.json({ error: 'نام شرکت‌کننده را وارد کنید.' }, { status: 400 })
  }
  if (!participantContact) {
    return NextResponse.json({ error: 'یک ایمیل معتبر یا آیدی اینستاگرام وارد کنید.' }, { status: 400 })
  }

  const result = await loadPublishedExam(code, true)
  if (result.error) {
    console.error('بارگذاری آزمون برای تصحیح انجام نشد:', result.error)
    return databaseUnavailable()
  }
  if (result.notFound) return NextResponse.json({ error: 'این آزمون فعال نیست.' }, { status: 404 })
  if (result.unavailable) return NextResponse.json({ error: result.unavailable }, { status: 409 })
  if (!result.questions.length) return NextResponse.json({ error: 'این آزمون سؤال ندارد.' }, { status: 409 })

  const graded = gradeExam(result.questions, payload.answers)
  const startedAt = typeof payload.startedAt === 'string' && !Number.isNaN(Date.parse(payload.startedAt))
    ? payload.startedAt
    : null

  const { data: attempt, error } = await supabaseAdmin
    .from('exam_attempts')
    .insert({
      exam_id: result.exam.id,
      participant_name: participantName,
      participant_contact: participantContact.value,
      contact_type: participantContact.type,
      answers: graded.answers,
      score: graded.score,
      max_score: graded.maxScore,
      percentage: graded.percentage,
      started_at: startedAt,
    })
    .select('id,submitted_at')
    .single()

  if (error || !attempt) {
    console.error('ذخیره نتیجه آزمون انجام نشد:', error)
    return NextResponse.json({ error: 'ارسال پاسخ‌ها انجام نشد. دوباره تلاش کنید.' }, { status: 503 })
  }

  const [higherResult, totalResult] = await Promise.all([
    supabaseAdmin
      .from('exam_attempts')
      .select('id', { count: 'exact', head: true })
      .eq('exam_id', result.exam.id)
      .gt('percentage', graded.percentage),
    supabaseAdmin
      .from('exam_attempts')
      .select('id', { count: 'exact', head: true })
      .eq('exam_id', result.exam.id),
  ])
  if (higherResult.error || totalResult.error) {
    console.error('محاسبه رتبه آزمون انجام نشد:', higherResult.error || totalResult.error)
  }

  const review = result.questions.map(question => ({
    id: question.id,
    prompt: question.prompt,
    options: question.options,
    selectedOptionIndex: graded.answers[question.id],
    correctOptionIndex: Number(question.correct_option_index),
    explanation: question.explanation || '',
    media: question.media || null,
  }))

  return NextResponse.json({
    attemptId: attempt.id,
    submittedAt: attempt.submitted_at,
    result: result.exam.show_result
      ? {
          score: graded.score,
          maxScore: graded.maxScore,
          percentage: graded.percentage,
          rank: higherResult.error ? null : Number(higherResult.count || 0) + 1,
          totalParticipants: totalResult.error ? null : Number(totalResult.count || 0),
          review,
        }
      : null,
  })
}

export async function PATCH(request, { params }) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return databaseUnavailable()
  const { code } = await params
  if (!CODE_PATTERN.test(code || '')) return NextResponse.json({ error: 'لینک آزمون معتبر نیست.' }, { status: 404 })

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'درخواست معتبر نیست.' }, { status: 400 })
  }

  const attemptId = typeof payload?.attemptId === 'string' ? payload.attemptId : ''
  const feedbackMessage = typeof payload?.feedbackText === 'string' ? payload.feedbackText.trim().slice(0, 1600) : ''
  const hasDetailedRatings = payload?.ratings && typeof payload.ratings === 'object' && !Array.isArray(payload.ratings)
  const detailedRatings = hasDetailedRatings
    ? {
        questions: Number(payload.ratings.questions),
        design: Number(payload.ratings.design),
        clip: Number(payload.ratings.clip),
      }
    : null
  const detailedValues = detailedRatings ? Object.values(detailedRatings) : []
  const legacyRating = payload?.rating === null || payload?.rating === undefined || payload?.rating === '' ? null : Number(payload.rating)
  const rating = detailedRatings
    ? Math.round(detailedValues.reduce((sum, value) => sum + value, 0) / detailedValues.length)
    : legacyRating
  const feedbackText = detailedRatings
    ? JSON.stringify({ version: 2, ratings: detailedRatings, message: feedbackMessage })
    : feedbackMessage
  if (!UUID_PATTERN.test(attemptId)) return NextResponse.json({ error: 'نتیجه آزمون معتبر نیست.' }, { status: 400 })
  if (detailedRatings && detailedValues.some(value => !Number.isInteger(value) || value < 1 || value > 5)) {
    return NextResponse.json({ error: 'برای هر سه بخش باید امتیازی بین ۱ تا ۵ وارد شود.' }, { status: 400 })
  }
  if (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5)) {
    return NextResponse.json({ error: 'امتیاز نظر باید بین ۱ تا ۵ باشد.' }, { status: 400 })
  }
  if (rating === null && !feedbackText) {
    return NextResponse.json({ error: 'امتیاز یا متن نظر را وارد کنید.' }, { status: 400 })
  }

  const { data: exam, error: examError } = await supabaseAdmin
    .from('exams')
    .select('id')
    .eq('public_code', code)
    .maybeSingle()
  if (examError) return databaseUnavailable()
  if (!exam) return NextResponse.json({ error: 'آزمون پیدا نشد.' }, { status: 404 })

  const { data: updated, error } = await supabaseAdmin
    .from('exam_attempts')
    .update({
      feedback_rating: rating,
      feedback_text: feedbackText || null,
      feedback_submitted_at: new Date().toISOString(),
    })
    .eq('id', attemptId)
    .eq('exam_id', exam.id)
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('ثبت نظر آزمون انجام نشد:', error)
    return NextResponse.json({ error: 'ثبت نظر انجام نشد. دوباره تلاش کنید.' }, { status: 503 })
  }
  if (!updated) return NextResponse.json({ error: 'نتیجه آزمون پیدا نشد.' }, { status: 404 })
  return NextResponse.json({ saved: true })
}
