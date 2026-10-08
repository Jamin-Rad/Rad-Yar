import { NextResponse } from 'next/server'
import { PARTICIPANT_USER_KEY } from '@/data/medicalSpecialties'
import { gradeExam } from '@/lib/exams'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getSignedInUserIdentity } from '@/lib/userIdentity'

function unavailable() {
  return NextResponse.json({ error: 'آرشیو آزمون‌ها موقتاً در دسترس نیست.' }, { status: 503 })
}

function uniqueAttempts(results) {
  const attempts = new Map()
  for (const result of results) {
    if (result.error) throw result.error
    for (const attempt of result.data || []) attempts.set(attempt.id, attempt)
  }
  return [...attempts.values()].sort((left, right) => Date.parse(right.submitted_at) - Date.parse(left.submitted_at))
}

export async function GET() {
  const identity = await getSignedInUserIdentity()
  if (!identity) return NextResponse.json({ error: 'برای مشاهده آرشیو باید وارد شوید.' }, { status: 401 })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  const fields = 'id,exam_id,participant_name,participant_contact,answers,score,max_score,percentage,feedback_submitted_at,started_at,submitted_at'
  const requests = [
    supabaseAdmin
      .from('exam_attempts')
      .select(fields)
      .contains('answers', { [PARTICIPANT_USER_KEY]: identity.userId })
      .gt('max_score', 0),
  ]
  if (identity.email) {
    requests.push(
      supabaseAdmin
        .from('exam_attempts')
        .select(fields)
        .eq('participant_contact', identity.email)
        .gt('max_score', 0),
    )
  }

  let attempts
  try {
    attempts = uniqueAttempts(await Promise.all(requests))
  } catch (error) {
    console.error('آرشیو آزمون‌های کاربر قابل بارگذاری نیست:', error)
    return unavailable()
  }

  if (!attempts.length) {
    return NextResponse.json({
      summary: { totalExams: 0, scoredExams: 0, averagePercentage: 0, bestPercentage: 0, totalScore: 0, totalMaxScore: 0, weightedPercentage: 0, feedbackPending: 0 },
      attempts: [],
    })
  }

  const examIds = [...new Set(attempts.map(attempt => attempt.exam_id))]
  const [examResult, questionResult] = await Promise.all([
    supabaseAdmin
      .from('exams')
      .select('id,public_code,title,description,organizer_name,language,status,show_result')
      .in('id', examIds),
    supabaseAdmin
      .from('exam_questions')
      .select('id,exam_id,correct_option_index,points')
      .in('exam_id', examIds),
  ])
  if (examResult.error || questionResult.error) {
    console.error('اطلاعات آزمون‌های آرشیو قابل بارگذاری نیست:', examResult.error || questionResult.error)
    return unavailable()
  }

  const examById = new Map((examResult.data || []).map(exam => [exam.id, exam]))
  const questionsByExamId = new Map()
  for (const question of questionResult.data || []) {
    const questions = questionsByExamId.get(question.exam_id) || []
    questions.push(question)
    questionsByExamId.set(question.exam_id, questions)
  }
  const archive = attempts.flatMap(attempt => {
    const exam = examById.get(attempt.exam_id)
    if (!exam) return []
    const graded = gradeExam(questionsByExamId.get(attempt.exam_id) || [], attempt.answers)
    return [{
      id: attempt.id,
      title: exam.title,
      description: exam.description || '',
      organizerName: exam.organizer_name,
      language: exam.language,
      publicCode: exam.public_code,
      participantContact: attempt.participant_contact,
      score: exam.show_result ? graded.score : null,
      maxScore: exam.show_result ? graded.maxScore : null,
      percentage: exam.show_result ? graded.percentage : null,
      negativePoints: exam.show_result ? graded.negativePoints : null,
      submittedAt: attempt.submitted_at,
      feedbackCompleted: Boolean(attempt.feedback_submitted_at),
      resultAvailable: Boolean(exam.show_result),
    }]
  })

  const visibleResults = archive.filter(attempt => attempt.resultAvailable)
  const totalScore = visibleResults.reduce((sum, attempt) => sum + attempt.score, 0)
  const totalMaxScore = visibleResults.reduce((sum, attempt) => sum + attempt.maxScore, 0)
  const averagePercentage = visibleResults.length
    ? Math.round(visibleResults.reduce((sum, attempt) => sum + attempt.percentage, 0) / visibleResults.length)
    : 0

  return NextResponse.json({
    summary: {
      totalExams: archive.length,
      scoredExams: visibleResults.length,
      averagePercentage,
      bestPercentage: visibleResults.length ? Math.max(...visibleResults.map(attempt => attempt.percentage)) : 0,
      totalScore,
      totalMaxScore,
      weightedPercentage: totalMaxScore ? Math.round((totalScore / totalMaxScore) * 100) : 0,
      feedbackPending: archive.filter(attempt => !attempt.feedbackCompleted).length,
    },
    attempts: archive,
  })
}
