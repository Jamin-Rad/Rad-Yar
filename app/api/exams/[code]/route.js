import { NextResponse } from 'next/server'
import { gradeExam } from '@/lib/exams'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const CODE_PATTERN = /^[A-Za-z0-9_-]{8,40}$/

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

async function loadPublishedExam(code, includeAnswers = false) {
  const { data: exam, error: examError } = await supabaseAdmin
    .from('exams')
    .select('id,title,description,language,status,duration_minutes,pass_percent,show_result,opens_at,closes_at')
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
    ? 'id,prompt,options,correct_option_index,points,position'
    : 'id,prompt,options,points,position'
  const { data: questions, error: questionsError } = await supabaseAdmin
    .from('exam_questions')
    .select(fields)
    .eq('exam_id', exam.id)
    .order('position')

  if (questionsError) return { error: questionsError }
  return { exam, questions: questions || [] }
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

  return NextResponse.json({ exam: result.exam, questions: result.questions })
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
  const participantEmail = typeof payload?.participantEmail === 'string'
    ? payload.participantEmail.trim().toLowerCase().slice(0, 254)
    : ''
  if (participantName.length < 2) {
    return NextResponse.json({ error: 'نام شرکت‌کننده را وارد کنید.' }, { status: 400 })
  }
  if (!participantEmail) {
    return NextResponse.json({ error: 'ایمیل شرکت‌کننده را وارد کنید.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participantEmail)) {
    return NextResponse.json({ error: 'ایمیل واردشده معتبر نیست.' }, { status: 400 })
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
  const passed = graded.percentage >= Number(result.exam.pass_percent)
  const startedAt = typeof payload.startedAt === 'string' && !Number.isNaN(Date.parse(payload.startedAt))
    ? payload.startedAt
    : null

  const { data: attempt, error } = await supabaseAdmin
    .from('exam_attempts')
    .insert({
      exam_id: result.exam.id,
      participant_name: participantName,
      participant_email: participantEmail,
      answers: graded.answers,
      score: graded.score,
      max_score: graded.maxScore,
      percentage: graded.percentage,
      passed,
      started_at: startedAt,
    })
    .select('id,submitted_at')
    .single()

  if (error || !attempt) {
    console.error('ذخیره نتیجه آزمون انجام نشد:', error)
    return NextResponse.json({ error: 'ارسال پاسخ‌ها انجام نشد. دوباره تلاش کنید.' }, { status: 503 })
  }

  return NextResponse.json({
    attemptId: attempt.id,
    submittedAt: attempt.submitted_at,
    result: result.exam.show_result
      ? { score: graded.score, maxScore: graded.maxScore, percentage: graded.percentage, passed }
      : null,
  })
}
