import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import { MCQ_TOPIC_GROUPS, QUESTION_BANK } from '@/data/questions'
import { CASE_BANK } from '@/data/cases'
import { CURRICULUM } from '@/data/curriculum'
import { EXAM_LANGUAGES, packExamQuestionExplanation, unpackExamQuestionExplanation, validateExamInput } from '@/lib/exams'
import { caseToExamMedia, getExamMediaPreview } from '@/utils/examMedia'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

export const runtime = 'nodejs'
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

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

function getCurriculumLookup(language) {
  const fachById = new Map()
  const topicById = new Map()
  for (const fach of CURRICULUM) {
    const fachTitle = localizedText(fach.title, language) || fach.id
    fachById.set(fach.id, fachTitle)
    for (const chapter of fach.kapitel || []) {
      const chapterTitle = localizedText(chapter.title, language) || chapter.id
      for (const topic of chapter.themen || []) {
        const topicTitle = localizedText(topic.title, language) || topic.id
        topicById.set(topic.id, { fachId: fach.id, fachTitle, chapterId: chapter.id, chapterTitle, topicTitle })
        for (const subtopic of topic.sub || []) {
          topicById.set(subtopic.id, {
            fachId: fach.id,
            fachTitle,
            chapterId: chapter.id,
            chapterTitle,
            topicTitle: localizedText(subtopic.title, language) || subtopic.id,
          })
        }
      }
    }
  }
  return { fachById, topicById }
}

function addRanks(attempts) {
  let previousPercentage = null
  let currentRank = 0
  return attempts.map((attempt, index) => {
    const percentage = Number(attempt.percentage)
    if (previousPercentage === null || percentage !== previousPercentage) currentRank = index + 1
    previousPercentage = percentage
    return { ...attempt, rank: currentRank }
  })
}

function getQuestionBank(language) {
  const { fachById } = getCurriculumLookup(language)
  const topicById = new Map()
  for (const group of MCQ_TOPIC_GROUPS) {
    const parentTopic = localizedText(group.title, language)
    for (const topic of group.topics) {
      const topicTitle = localizedText(topic.title, language)
      topicById.set(topic.id, { parentTopic, topicTitle, fachId: group.fachId, chapterId: group.kapitelId })
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
      kind: 'mcq',
      fachId: topic?.fachId || item.fach || 'other',
      fach: fachById.get(topic?.fachId || item.fach) || item.fach || '',
      chapterId: topic?.chapterId || '',
      themaId: topicId,
      topic: topicTitle,
      parentTopic,
      topicPath: parentTopic ? `${parentTopic} — ${topicTitle}` : topicTitle,
      prompt: item.question,
      options,
      correctOptionIndex,
      points: 1,
      explanation: localizedText(item.explanation, language),
      media: null,
      preview: '',
    }]
  })

  return { questions }
}

function getCaseBank(language) {
  const { fachById, topicById } = getCurriculumLookup(language)
  const source = CASE_BANK[language] || CASE_BANK.de
  const questions = source.flatMap(item => {
    const rawOptions = Array.isArray(item.options) ? item.options : []
    const correctOptionIndex = rawOptions.findIndex(option => option?.id === item.correct)
    if (rawOptions.length !== 4 || rawOptions.some(option => !option?.text) || correctOptionIndex < 0) return []

    const topic = topicById.get(item.topicId)
    const topicTitle = topic?.topicTitle || item.topicId
    const parentTopic = topic?.chapterTitle || item.kapitelId || fachById.get(item.fachId) || item.fachId
    const media = caseToExamMedia(item)
    const prompt = item.prompt || [item.vignette, item.question].filter(Boolean).join('\n\n')
    if (!prompt) return []

    return [{
      id: `case-${item.id}`,
      kind: 'case',
      fachId: item.fachId || topic?.fachId || 'other',
      fach: fachById.get(item.fachId || topic?.fachId) || item.fachId || '',
      chapterId: item.kapitelId || topic?.chapterId || '',
      themaId: item.topicId || 'other',
      topic: topicTitle,
      parentTopic,
      topicPath: parentTopic ? `${parentTopic} — ${topicTitle}` : topicTitle,
      prompt,
      options: rawOptions.map(option => option.text),
      correctOptionIndex,
      points: 1,
      explanation: localizedText(item.explanation, language),
      media,
      preview: getExamMediaPreview(media),
    }]
  })

  return { questions }
}

export async function GET(request) {
  const denied = await authorize()
  if (denied) return denied

  const url = new URL(request.url)
  if (url.searchParams.get('resource') === 'question-bank') {
    const requestedLanguage = url.searchParams.get('language')
    const language = EXAM_LANGUAGES.includes(requestedLanguage) ? requestedLanguage : 'fa'
    const type = url.searchParams.get('type') === 'case' ? 'case' : 'mcq'
    const result = type === 'case' ? getCaseBank(language) : getQuestionBank(language)
    return NextResponse.json(result)
  }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  const examId = url.searchParams.get('id')
  if (examId) {
    const [examResult, questionResult, attemptResult] = await Promise.all([
      supabaseAdmin.from('exams').select('*').eq('id', examId).maybeSingle(),
      supabaseAdmin.from('exam_questions').select('*').eq('exam_id', examId).order('position'),
      supabaseAdmin.from('exam_attempts').select('*').eq('exam_id', examId).order('percentage', { ascending: false }).order('submitted_at', { ascending: true }),
    ])

    const error = examResult.error || questionResult.error || attemptResult.error
    if (error) {
      console.error('آزمون قابل بارگذاری نیست:', error)
      return NextResponse.json({ error: databaseSetupError(error, 'بارگذاری آزمون انجام نشد.') }, { status: 503 })
    }
    if (!examResult.data) return NextResponse.json({ error: 'آزمون پیدا نشد.' }, { status: 404 })

    return NextResponse.json({
      exam: examResult.data,
      questions: (questionResult.data || []).map(question => {
        const unpacked = unpackExamQuestionExplanation(question.explanation)
        return { ...question, explanation: unpacked.explanation, media: unpacked.media }
      }),
      attempts: addRanks(attemptResult.data || []),
    })
  }

  const [examResult, attemptResult] = await Promise.all([
    supabaseAdmin.from('exams').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('exam_attempts').select('exam_id'),
  ])
  const error = examResult.error || attemptResult.error
  if (error) {
    console.error('فهرست آزمون‌ها قابل بارگذاری نیست:', error)
    return NextResponse.json({ error: databaseSetupError(error, 'بارگذاری فهرست آزمون‌ها انجام نشد.') }, { status: 503 })
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
      organizer_name: input.organizerName,
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
    explanation: packExamQuestionExplanation(question.explanation, question.media),
    position: question.position,
  }))
  const { error: questionsError } = await supabaseAdmin.from('exam_questions').insert(questionRows)

  if (questionsError) {
    console.error('ذخیره سؤال‌های آزمون انجام نشد:', questionsError)
    await supabaseAdmin.from('exams').delete().eq('id', exam.id)
    return NextResponse.json({ error: databaseSetupError(questionsError, 'ذخیره سؤال‌ها انجام نشد.') }, { status: 503 })
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

export async function DELETE(request) {
  const denied = await authorize()
  if (denied) return denied
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'درخواست معتبر نیست.' }, { status: 400 })
  }

  const examId = typeof payload?.id === 'string' ? payload.id : ''
  if (!UUID_PATTERN.test(examId)) {
    return NextResponse.json({ error: 'شناسه آزمون معتبر نیست.' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('exams')
    .delete()
    .eq('id', examId)
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('حذف آزمون انجام نشد:', error)
    return NextResponse.json({ error: databaseSetupError(error, 'حذف آزمون انجام نشد.') }, { status: 503 })
  }
  if (!data) return NextResponse.json({ error: 'آزمون پیدا نشد.' }, { status: 404 })
  return NextResponse.json({ deleted: true, id: data.id })
}
