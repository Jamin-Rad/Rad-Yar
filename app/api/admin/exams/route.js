import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import { MCQ_TOPIC_GROUPS, QUESTION_BANK } from '@/data/questions'
import { EXAM_LANGUAGES, validateExamInput } from '@/lib/exams'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

export const runtime = 'nodejs'

function unavailable() {
  return NextResponse.json({ error: 'پایگاه داده در دسترس نیست.' }, { status: 503 })
}

async function authorize() {
  const admin = await requireAdmin()
  return admin.error ? NextResponse.json({ error: admin.error }, { status: admin.status }) : null
}

function localizedText(value, language = 'fa') {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return ''
  return value[language] || value.fa || value.en || value.de || ''
}

function databaseSetupError(error, fallback) {
  if (error?.code === 'PGRST205' || error?.code === '42P01') {
    return 'بخش دیتابیس آزمون هنوز فعال نشده است. فایل‌های تنظیم آزمون باید در Supabase اجرا شوند.'
  }
  if (error?.code === 'PGRST204' || error?.code === '42703') {
    return 'ساختار دیتابیس آزمون به‌روز نیست. آخرین فایل تنظیم Supabase را اجرا کنید.'
  }
  return fallback
}

function canonicalQuestionId(id) {
  return String(id).replace(/-(?:fa|en)-/, '-de-')
}

function getQuestionBank(language) {
  const topicById = new Map()
  for (const group of MCQ_TOPIC_GROUPS) {
    const parentTopic = localizedText(group.title, language)
    for (const topic of group.topics) {
      const topicTitle = localizedText(topic.title, language)
      topicById.set(topic.id, { parentTopic, topicTitle })
    }
  }

  const source = QUESTION_BANK[language] || QUESTION_BANK.fa
  const questions = source.flatMap(item => {
    const rawOptions = Array.isArray(item.options) ? item.options : []
    const correctOptionIndex = rawOptions.findIndex(option => option?.id === item.correct)
    const topicId = item.tags?.find(tag => topicById.has(tag)) || item.tags?.[0] || item.fach || 'other'
    const topic = topicById.get(topicId)
    const options = rawOptions.map(option => option?.text || '')

    if (!item.question || options.length !== 4 || options.some(option => !option) || correctOptionIndex < 0) return []
    const topicTitle = topic?.topicTitle || topicId
    const parentTopic = topic?.parentTopic || item.fach || ''
    return [{
      id: canonicalQuestionId(item.id),
      themaId: topicId,
      topic: topicTitle,
      parentTopic,
      topicPath: parentTopic ? `${parentTopic} — ${topicTitle}` : topicTitle,
      prompt: item.question,
      options,
      correctOptionIndex,
      points: 1,
    }]
  })

  return { questions }
}

export async function GET(request) {
  const denied = await authorize()
  if (denied) return denied
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  const url = new URL(request.url)
  if (url.searchParams.get('resource') === 'question-bank') {
    const requestedLanguage = url.searchParams.get('language')
    const language = EXAM_LANGUAGES.includes(requestedLanguage) ? requestedLanguage : 'fa'
    const result = getQuestionBank(language)
    return NextResponse.json(result)
  }

  const examId = url.searchParams.get('id')
  if (examId) {
    const [examResult, questionResult, attemptResult] = await Promise.all([
      supabaseAdmin.from('exams').select('*').eq('id', examId).maybeSingle(),
      supabaseAdmin.from('exam_questions').select('*').eq('exam_id', examId).order('position'),
      supabaseAdmin.from('exam_attempts').select('*').eq('exam_id', examId).order('submitted_at', { ascending: false }),
    ])

    const error = examResult.error || questionResult.error || attemptResult.error
    if (error) {
      console.error('آزمون قابل بارگذاری نیست:', error)
      return NextResponse.json({ error: 'بارگذاری آزمون انجام نشد.' }, { status: 503 })
    }
    if (!examResult.data) return NextResponse.json({ error: 'آزمون پیدا نشد.' }, { status: 404 })

    return NextResponse.json({
      exam: examResult.data,
      questions: questionResult.data || [],
      attempts: attemptResult.data || [],
    })
  }

  const [examResult, attemptResult] = await Promise.all([
    supabaseAdmin.from('exams').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('exam_attempts').select('exam_id'),
  ])
  const error = examResult.error || attemptResult.error
  if (error) {
    console.error('فهرست آزمون‌ها قابل بارگذاری نیست:', error)
    return NextResponse.json({ error: 'بارگذاری فهرست آزمون‌ها انجام نشد.' }, { status: 503 })
  }

  const attemptCounts = new Map()
  for (const attempt of attemptResult.data || []) {
    attemptCounts.set(attempt.exam_id, (attemptCounts.get(attempt.exam_id) || 0) + 1)
  }
  const exams = (examResult.data || []).map(exam => ({
    ...exam,
    attempt_count: attemptCounts.get(exam.id) || 0,
  }))

  return NextResponse.json({ exams })
}

export async function POST(request) {
  const denied = await authorize()
  if (denied) return denied
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'درخواست معتبر نیست.' }, { status: 400 })
  }

  const parsed = validateExamInput(payload)
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 })
  const input = parsed.value
  const publicCode = crypto.randomBytes(9).toString('base64url')

  const { data: exam, error: examError } = await supabaseAdmin
    .from('exams')
    .insert({
      public_code: publicCode,
      title: input.title,
      description: input.description,
      language: input.language,
      status: input.publishNow ? 'published' : 'draft',
      duration_minutes: input.durationMinutes,
      opens_at: input.opensAt,
      closes_at: input.closesAt,
      pass_percent: input.passPercent,
      show_result: input.showResult,
    })
    .select('*')
    .single()

  if (examError || !exam) {
    console.error('ایجاد آزمون انجام نشد:', examError)
    return NextResponse.json({ error: databaseSetupError(examError, 'ایجاد آزمون انجام نشد. لطفاً دوباره تلاش کنید.') }, { status: 503 })
  }

  const questionRows = input.questions.map(question => ({
    exam_id: exam.id,
    prompt: question.prompt,
    options: question.options,
    correct_option_index: question.correctOptionIndex,
    points: question.points,
    position: question.position,
  }))
  const { error: questionsError } = await supabaseAdmin.from('exam_questions').insert(questionRows)

  if (questionsError) {
    console.error('ذخیره سؤال‌های آزمون انجام نشد:', questionsError)
    await supabaseAdmin.from('exams').delete().eq('id', exam.id)
    return NextResponse.json({ error: 'ذخیره سؤال‌ها انجام نشد.' }, { status: 503 })
  }

  return NextResponse.json({ exam, sharePath: `/exam/${publicCode}` }, { status: 201 })
}

export async function PATCH(request) {
  const denied = await authorize()
  if (denied) return denied
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'درخواست معتبر نیست.' }, { status: 400 })
  }

  const statusByAction = { publish: 'published', close: 'closed', reopen: 'published' }
  const status = statusByAction[payload?.action]
  if (typeof payload?.id !== 'string' || !status) {
    return NextResponse.json({ error: 'درخواست معتبر نیست.' }, { status: 400 })
  }

  const updates = { status, updated_at: new Date().toISOString() }
  if (payload.action === 'reopen') {
    const { data: currentExam, error: currentError } = await supabaseAdmin
      .from('exams')
      .select('opens_at,closes_at')
      .eq('id', payload.id)
      .maybeSingle()
    if (currentError) return NextResponse.json({ error: 'آزمون قابل فعال‌سازی نیست.' }, { status: 503 })
    if (!currentExam) return NextResponse.json({ error: 'آزمون پیدا نشد.' }, { status: 404 })
    const storedDuration = Date.parse(currentExam.closes_at) - Date.parse(currentExam.opens_at)
    const previousDuration = Number.isFinite(storedDuration) && storedDuration >= 60 * 1000
      ? storedDuration
      : 7 * 24 * 60 * 60 * 1000
    const opensAt = new Date()
    updates.opens_at = opensAt.toISOString()
    updates.closes_at = new Date(opensAt.getTime() + previousDuration).toISOString()
  }

  const { data, error } = await supabaseAdmin
    .from('exams')
    .update(updates)
    .eq('id', payload.id)
    .select('*')
    .maybeSingle()

  if (error) return NextResponse.json({ error: 'وضعیت آزمون تغییر نکرد.' }, { status: 503 })
  if (!data) return NextResponse.json({ error: 'آزمون پیدا نشد.' }, { status: 404 })
  return NextResponse.json({ exam: data })
}
