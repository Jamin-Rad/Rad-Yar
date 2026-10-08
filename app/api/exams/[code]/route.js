import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { auth } from '@clerk/nextjs/server'
import { CASE_BANK } from '@/data/cases'
import { QUESTION_BANK } from '@/data/questions'
import { gradeExam, normalizeWrongExplanations, unpackExamQuestionExplanation } from '@/lib/exams'
import {
  OFFLINE_SUBMISSION_GRACE_MS,
  REOPEN_SUBMISSION_GRACE_MS,
  attemptDeadline,
  completeAttemptReopen,
  isAttemptReopenActive,
  mergeReopenedAnswers,
  readAttemptReopen,
  saveAttemptReopenDraft,
} from '@/lib/examRecovery'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { normalizeParticipantSpecialty, PARTICIPANT_SPECIALTY_KEY, PARTICIPANT_USER_KEY } from '@/data/medicalSpecialties'

const CODE_PATTERN = /^[A-Za-z0-9_-]{8,40}$/
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INSTAGRAM_PATTERN = /^(?=.*[A-Za-z0-9])[A-Za-z0-9._]{1,30}$/
const SUBMISSION_GRACE_MS = 30000

function normalizeComparableText(value) {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : ''
}

function sourcePromptCandidates(item) {
  return [
    item?.prompt,
    item?.question,
    [item?.vignette, item?.question].filter(Boolean).join('\n\n'),
  ].map(normalizeComparableText).filter(Boolean)
}

function sourceOptionsMatch(item, options) {
  return Array.isArray(item?.options)
    && item.options.length === options.length
    && item.options.every((option, index) => normalizeComparableText(option?.text) === options[index])
}

function sourceCorrectAnswerMatches(item, correctOptionIndex) {
  if (!Number.isInteger(correctOptionIndex) || !item?.correct) return true
  return item.correct === String.fromCharCode(65 + correctOptionIndex)
}

function findSourceWrongExplanations(question, language) {
  const prompt = normalizeComparableText(question?.prompt)
  const options = Array.isArray(question?.options) ? question.options.map(normalizeComparableText) : []
  if (!prompt || options.length !== 4) return {}

  const source = [
    ...(QUESTION_BANK[language] || QUESTION_BANK.fa || []),
    ...(CASE_BANK[language] || CASE_BANK.de || []),
  ]
  const correctOptionIndex = Number(question?.correct_option_index)
  const matchingOptions = source.filter(item => (
    sourceOptionsMatch(item, options)
    && sourceCorrectAnswerMatches(item, correctOptionIndex)
  ))
  const match = matchingOptions.find(item => sourcePromptCandidates(item).includes(prompt))
    || (matchingOptions.length === 1 ? matchingOptions[0] : null)
  return normalizeWrongExplanations(match?.wrongExplanations)
}

function databaseUnavailable() {
  return NextResponse.json({ error: 'سامانه امتحان موقتاً در دسترس نیست.' }, { status: 503 })
}

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

function stableAttemptId(examId, identityKey) {
  const bytes = createHash('sha256').update(`${examId}\u0000${identityKey}`).digest().subarray(0, 16)
  bytes[6] = (bytes[6] & 0x0f) | 0x50
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = bytes.toString('hex')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

function isSubmittedAttempt(attempt) {
  return Number(attempt?.max_score) > 0
}

function withParticipantMetadata(answers, specialty, userId = '') {
  return {
    ...(answers || {}),
    [PARTICIPANT_SPECIALTY_KEY]: specialty,
    ...(userId ? { [PARTICIPANT_USER_KEY]: userId } : {}),
  }
}

function clientQuestionAnswers(questions, answers) {
  return Object.fromEntries((questions || []).flatMap(question => {
    const selected = Number(answers?.[question.id])
    return Number.isInteger(selected) && selected >= 0 && selected <= 3 ? [[question.id, selected]] : []
  }))
}

function getAvailability(exam, graceMs = 0) {
  const now = Date.now()
  const opensAt = Date.parse(exam.opens_at)
  const closesAt = Date.parse(exam.closes_at)
  if (exam.status === 'closed' || (Number.isFinite(closesAt) && now > closesAt + graceMs)) return 'closed'
  if (Number.isFinite(opensAt) && now < opensAt) return 'upcoming'
  return exam.status === 'published' ? 'active' : 'closed'
}

function availabilityMessage(exam, availability) {
  const copy = AVAILABILITY_COPY[exam.language] || AVAILABILITY_COPY.fa
  return availability === 'upcoming' ? copy.opens(formatAvailabilityDate(exam.opens_at, exam.language)) : copy.closed
}

function remainingSeconds(exam, startedAt) {
  const effectiveEnd = attemptDeadline(exam, startedAt)
  return Math.max(0, Math.floor((effectiveEnd - Date.now()) / 1000))
}

function reopenedAttemptResponse(exam, questions, attempt, specialty) {
  const reopen = readAttemptReopen(attempt.answers)
  const remaining = Math.max(0, Math.floor((Date.parse(reopen.reopenedUntil) - Date.now()) / 1000))
  const allowed = new Set(reopen.allowedQuestionIds)
  return NextResponse.json({
    state: 'quiz',
    attemptId: attempt.id,
    participantName: attempt.participant_name,
    participantContact: attempt.participant_contact,
    participantSpecialty: specialty,
    answers: clientQuestionAnswers(questions, { ...attempt.answers, ...reopen.draftAnswers }),
    startedAt: attempt.started_at,
    remainingSeconds: remaining,
    resumed: true,
    reopenOnly: true,
    reopenedUntil: reopen.reopenedUntil,
    lockedQuestionIds: questions.filter(question => !allowed.has(question.id)).map(question => question.id),
    firstEditableIndex: Math.max(0, questions.findIndex(question => allowed.has(question.id))),
  })
}

async function loadExam(code, includeAnswers = false) {
  const { data: exam, error: examError } = await supabaseAdmin
    .from('exams')
    .select('id,title,description,organizer_name,language,status,duration_minutes,show_result,opens_at,closes_at')
    .eq('public_code', code)
    .maybeSingle()
  if (examError) return { error: examError }
  if (!exam || !['published', 'closed'].includes(exam.status)) return { notFound: true }

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
    availability: getAvailability(exam),
    questions: (questions || []).map(question => {
      const unpacked = unpackExamQuestionExplanation(question.explanation)
      return { ...question, explanation: unpacked.explanation, wrongExplanations: unpacked.wrongExplanations, media: unpacked.media }
    }),
  }
}

async function findAttempt(examId, identityKey) {
  const { data, error } = await supabaseAdmin
    .from('exam_attempts')
    .select('id,participant_name,participant_contact,answers,score,max_score,percentage,feedback_submitted_at,started_at,submitted_at')
    .eq('exam_id', examId)
    .eq('participant_contact', identityKey)
  if (error) return { data: null, error }
  const attempts = [...(data || [])].sort((left, right) => {
    const submittedDifference = Number(isSubmittedAttempt(right)) - Number(isSubmittedAttempt(left))
    if (submittedDifference) return submittedDifference
    const feedbackDifference = Number(Boolean(right.feedback_submitted_at)) - Number(Boolean(left.feedback_submitted_at))
    if (feedbackDifference) return feedbackDifference
    return Date.parse(right.submitted_at) - Date.parse(left.submitted_at)
  })
  return { data: attempts[0] || null, error: null }
}

async function buildResult(exam, attempt) {
  if (!exam.show_result) return { result: null }
  const [{ data: questions, error: questionsError }, attemptsResult] = await Promise.all([
    supabaseAdmin.from('exam_questions').select('id,prompt,options,correct_option_index,explanation,points,position').eq('exam_id', exam.id).order('position'),
    supabaseAdmin.from('exam_attempts').select('id,participant_contact,answers,percentage,max_score,submitted_at').eq('exam_id', exam.id).gt('max_score', 0),
  ])
  if (questionsError) return { error: questionsError }
  if (attemptsResult.error) console.error('محاسبه رتبه آزمون انجام نشد:', attemptsResult.error)

  const uniqueAttempts = new Map()
  const orderedAttempts = [...(attemptsResult.data || [])].sort((left, right) => Date.parse(right.submitted_at) - Date.parse(left.submitted_at))
  for (const candidate of orderedAttempts) {
    const identity = String(candidate.participant_contact || candidate.id).trim().toLowerCase()
    if (!uniqueAttempts.has(identity)) uniqueAttempts.set(identity, candidate)
  }
  const rankedAttempts = [...uniqueAttempts.values()].map(candidate => ({
    ...candidate,
    percentage: gradeExam(questions || [], candidate.answers).percentage,
  }))
  const gradedAttempt = gradeExam(questions || [], attempt.answers)

  const review = (questions || []).map(question => {
    const unpacked = unpackExamQuestionExplanation(question.explanation)
    const wrongExplanations = Object.keys(unpacked.wrongExplanations).length
      ? unpacked.wrongExplanations
      : findSourceWrongExplanations(question, exam.language)
    return {
      id: question.id,
      prompt: question.prompt,
      options: question.options,
      selectedOptionIndex: attempt.answers?.[question.id],
      correctOptionIndex: Number(question.correct_option_index),
      explanation: unpacked.explanation || '',
      wrongExplanations,
      media: unpacked.media || null,
    }
  })
  return {
    result: {
      score: gradedAttempt.score,
      correctScore: gradedAttempt.correctScore,
      maxScore: gradedAttempt.maxScore,
      percentage: gradedAttempt.percentage,
      wrongCount: gradedAttempt.wrongCount,
      unansweredCount: gradedAttempt.unansweredCount,
      negativePoints: gradedAttempt.negativePoints,
      rank: attemptsResult.error ? null : rankedAttempts.filter(candidate => Number(candidate.percentage) > gradedAttempt.percentage).length + 1,
      totalParticipants: attemptsResult.error ? null : rankedAttempts.length,
      review,
    },
  }
}

async function completedAttemptResponse(exam, attempt) {
  const participantSpecialty = normalizeParticipantSpecialty(attempt.answers?.[PARTICIPANT_SPECIALTY_KEY])
  if (!attempt.feedback_submitted_at) {
    return NextResponse.json({ state: 'feedback', attemptId: attempt.id, participantName: attempt.participant_name, participantContact: attempt.participant_contact, participantSpecialty })
  }
  const built = await buildResult(exam, attempt)
  if (built.error) {
    console.error('بازیابی نتیجه آزمون انجام نشد:', built.error)
    return databaseUnavailable()
  }
  return NextResponse.json({
    state: 'result',
    attemptId: attempt.id,
    participantName: attempt.participant_name,
    participantContact: attempt.participant_contact,
    participantSpecialty,
    result: built.result,
  })
}

export async function GET(_request, { params }) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return databaseUnavailable()
  const { code } = await params
  if (!CODE_PATTERN.test(code || '')) return NextResponse.json({ error: 'لینک آزمون معتبر نیست.' }, { status: 404 })

  const loaded = await loadExam(code)
  if (loaded.error) {
    console.error('بارگذاری آزمون عمومی انجام نشد:', loaded.error)
    return databaseUnavailable()
  }
  if (loaded.notFound) return NextResponse.json({ error: 'این آزمون فعال نیست.' }, { status: 404 })

  return NextResponse.json({
    exam: loaded.exam,
    availability: loaded.availability,
    availabilityMessage: loaded.availability === 'active' ? '' : availabilityMessage(loaded.exam, loaded.availability),
    questions: loaded.questions.map(({ explanation: _explanation, wrongExplanations: _wrongExplanations, ...question }) => ({
      ...question,
      media: question.media ? { ...question.media, source: '' } : null,
    })),
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
  const { userId: signedInUserId } = await auth()
  const participantName = typeof payload?.participantName === 'string' ? payload.participantName.trim().slice(0, 120) : ''
  const participantContact = normalizeContact(payload?.participantContact || payload?.participantEmail)
  const participantSpecialty = normalizeParticipantSpecialty(payload?.participantSpecialty)
  if (participantName.length < 2) return NextResponse.json({ error: 'نام شرکت‌کننده را وارد کنید.' }, { status: 400 })
  if (!participantContact) return NextResponse.json({ error: 'یک ایمیل معتبر یا آیدی اینستاگرام وارد کنید.' }, { status: 400 })
  if (!participantSpecialty) return NextResponse.json({ error: 'تخصص یا رشتهٔ شرکت‌کننده را انتخاب کنید.' }, { status: 400 })

  const loaded = await loadExam(code, true)
  if (loaded.error) {
    console.error('بارگذاری آزمون برای شرکت‌کننده انجام نشد:', loaded.error)
    return databaseUnavailable()
  }
  if (loaded.notFound) return NextResponse.json({ error: 'این آزمون فعال نیست.' }, { status: 404 })
  if (!loaded.questions.length) return NextResponse.json({ error: 'این آزمون سؤال ندارد.' }, { status: 409 })

  const { data: foundAttempt, error: lookupError } = await findAttempt(loaded.exam.id, participantContact.value)
  if (lookupError) {
    console.error('بازیابی شرکت‌کننده انجام نشد:', lookupError)
    return databaseUnavailable()
  }
  let existingAttempt = foundAttempt
  const storedUserId = typeof existingAttempt?.answers?.[PARTICIPANT_USER_KEY] === 'string' ? existingAttempt.answers[PARTICIPANT_USER_KEY] : ''
  const participantUserId = storedUserId || signedInUserId || ''
  const effectiveSpecialty = normalizeParticipantSpecialty(existingAttempt?.answers?.[PARTICIPANT_SPECIALTY_KEY]) || participantSpecialty
  const reopenActive = isAttemptReopenActive(existingAttempt?.answers)
  const reopenRecoveryActive = isSubmittedAttempt(existingAttempt)
    && payload?.pendingOfflineSubmission === true
    && isAttemptReopenActive(existingAttempt?.answers, Date.now(), REOPEN_SUBMISSION_GRACE_MS)

  if (existingAttempt && signedInUserId && !storedUserId) {
    const linkedAnswers = withParticipantMetadata(existingAttempt.answers, effectiveSpecialty, signedInUserId)
    const { error: linkError } = await supabaseAdmin
      .from('exam_attempts')
      .update({ answers: linkedAnswers })
      .eq('id', existingAttempt.id)
      .eq('exam_id', loaded.exam.id)
    if (linkError) console.error('اتصال نتیجه آزمون به حساب کاربری انجام نشد:', linkError)
    else existingAttempt = { ...existingAttempt, answers: linkedAnswers }
  }

  if (payload?.action === 'identify') {
    if (isSubmittedAttempt(existingAttempt) && (reopenActive || reopenRecoveryActive)) {
      return reopenedAttemptResponse(loaded.exam, loaded.questions, existingAttempt, effectiveSpecialty)
    }
    if (isSubmittedAttempt(existingAttempt)) return completedAttemptResponse(loaded.exam, existingAttempt)
    if (existingAttempt) {
      const secondsLeft = remainingSeconds(loaded.exam, existingAttempt.started_at)
      const deadline = attemptDeadline(loaded.exam, existingAttempt.started_at)
      const offlineRecoveryAvailable = payload?.pendingOfflineSubmission === true
        && Number.isFinite(deadline)
        && Date.now() <= deadline + OFFLINE_SUBMISSION_GRACE_MS
      if (offlineRecoveryAvailable) {
        return NextResponse.json({
          state: 'quiz', attemptId: existingAttempt.id,
          participantName: existingAttempt.participant_name, participantContact: existingAttempt.participant_contact,
          participantSpecialty: effectiveSpecialty,
          answers: clientQuestionAnswers(loaded.questions, existingAttempt.answers), startedAt: existingAttempt.started_at,
          remainingSeconds: 0, resumed: true, offlineRecovery: true,
        })
      }
      if (loaded.availability === 'active' && secondsLeft > 0) {
        return NextResponse.json({
          state: 'quiz', attemptId: existingAttempt.id,
          participantName: existingAttempt.participant_name, participantContact: existingAttempt.participant_contact,
          participantSpecialty: effectiveSpecialty,
          answers: clientQuestionAnswers(loaded.questions, existingAttempt.answers), startedAt: existingAttempt.started_at,
          remainingSeconds: secondsLeft, resumed: true,
        })
      }

      const graded = gradeExam(loaded.questions, existingAttempt.answers)
      const { data: finalized, error: finalizeError } = await supabaseAdmin
        .from('exam_attempts')
        .update({
          answers: withParticipantMetadata(graded.answers, effectiveSpecialty, participantUserId), score: graded.score, max_score: graded.maxScore,
          percentage: graded.percentage, submitted_at: new Date().toISOString(),
        })
        .eq('id', existingAttempt.id)
        .eq('exam_id', loaded.exam.id)
        .select('id,participant_name,participant_contact,answers,score,max_score,percentage,feedback_submitted_at,started_at,submitted_at')
        .single()
      if (finalizeError || !finalized) return databaseUnavailable()
      return completedAttemptResponse(loaded.exam, finalized)
    }

    if (loaded.availability !== 'active') return NextResponse.json({ error: availabilityMessage(loaded.exam, loaded.availability) }, { status: 409 })

    const startedAt = new Date().toISOString()
    const { data: created, error: createError } = await supabaseAdmin
      .from('exam_attempts')
      .insert({
        id: stableAttemptId(loaded.exam.id, participantContact.value),
        exam_id: loaded.exam.id, participant_name: participantName,
        participant_contact: participantContact.value, contact_type: participantContact.type,
        answers: withParticipantMetadata({}, effectiveSpecialty, signedInUserId || ''), started_at: startedAt,
      })
      .select('id,participant_name,participant_contact,answers,started_at')
      .single()

    if (createError || !created) {
      if (createError?.code === '23505') {
        const { data: racedAttempt } = await findAttempt(loaded.exam.id, participantContact.value)
        if (isSubmittedAttempt(racedAttempt)) return completedAttemptResponse(loaded.exam, racedAttempt)
        if (racedAttempt) {
          return NextResponse.json({
            state: 'quiz', attemptId: racedAttempt.id,
            participantName: racedAttempt.participant_name, participantContact: racedAttempt.participant_contact,
            participantSpecialty: normalizeParticipantSpecialty(racedAttempt.answers?.[PARTICIPANT_SPECIALTY_KEY]) || effectiveSpecialty,
            answers: clientQuestionAnswers(loaded.questions, racedAttempt.answers), startedAt: racedAttempt.started_at,
            remainingSeconds: remainingSeconds(loaded.exam, racedAttempt.started_at), resumed: true,
          })
        }
      }
      console.error('ثبت شرکت‌کننده انجام نشد:', createError)
      return NextResponse.json({ error: 'شروع آزمون انجام نشد. دوباره تلاش کنید.' }, { status: 503 })
    }

    return NextResponse.json({
      state: 'quiz', attemptId: created.id, participantName: created.participant_name,
      participantContact: created.participant_contact, participantSpecialty: effectiveSpecialty, answers: {}, startedAt: created.started_at,
      remainingSeconds: remainingSeconds(loaded.exam, created.started_at), resumed: false,
    }, { status: 201 })
  }

  const reopenSubmissionActive = isSubmittedAttempt(existingAttempt)
    && isAttemptReopenActive(existingAttempt.answers, Date.now(), REOPEN_SUBMISSION_GRACE_MS)
  if (isSubmittedAttempt(existingAttempt) && !reopenSubmissionActive) return completedAttemptResponse(loaded.exam, existingAttempt)
  if (!existingAttempt && loaded.availability !== 'active' && getAvailability(loaded.exam, SUBMISSION_GRACE_MS) !== 'active') {
    return NextResponse.json({ error: availabilityMessage(loaded.exam, loaded.availability) }, { status: 409 })
  }

  if (existingAttempt && !isSubmittedAttempt(existingAttempt)) {
    const deadline = attemptDeadline(loaded.exam, existingAttempt.started_at)
    if (Number.isFinite(deadline) && Date.now() > deadline + OFFLINE_SUBMISSION_GRACE_MS) {
      return NextResponse.json({ error: 'مهلت بازیابی خودکار پاسخ‌ها تمام شده است. از برگزارکننده بخواهید سؤال‌های بی‌پاسخ را برای شما بازگشایی کند.' }, { status: 409 })
    }
  }

  const answersForGrading = reopenSubmissionActive
    ? mergeReopenedAnswers(loaded.questions, existingAttempt.answers, payload.answers)
    : payload.answers
  const graded = gradeExam(loaded.questions, answersForGrading)
  const gradedAnswers = reopenSubmissionActive
    ? completeAttemptReopen(graded.answers, existingAttempt.answers)
    : graded.answers
  const startedAt = typeof payload.startedAt === 'string' && !Number.isNaN(Date.parse(payload.startedAt)) ? payload.startedAt : new Date().toISOString()
  let submitted
  let submitError
  if (existingAttempt) {
    const updated = await supabaseAdmin
      .from('exam_attempts')
      .update({
        answers: withParticipantMetadata(gradedAnswers, effectiveSpecialty, participantUserId), score: graded.score, max_score: graded.maxScore,
        percentage: graded.percentage, submitted_at: new Date().toISOString(),
      })
      .eq('id', existingAttempt.id)
      .eq('exam_id', loaded.exam.id)
      .eq('participant_contact', participantContact.value)
      .select('id,participant_name,participant_contact,answers,score,max_score,percentage,feedback_submitted_at,started_at,submitted_at')
      .single()
    submitted = updated.data
    submitError = updated.error
  } else {
    const inserted = await supabaseAdmin
      .from('exam_attempts')
      .insert({
        id: stableAttemptId(loaded.exam.id, participantContact.value),
        exam_id: loaded.exam.id, participant_name: participantName,
        participant_contact: participantContact.value, contact_type: participantContact.type,
        answers: withParticipantMetadata(graded.answers, effectiveSpecialty, signedInUserId || ''), score: graded.score, max_score: graded.maxScore,
        percentage: graded.percentage, started_at: startedAt,
      })
      .select('id,submitted_at')
      .single()
    submitted = inserted.data
    submitError = inserted.error
  }

  if (submitError || !submitted) {
    if (submitError?.code === '23505') {
      const { data: duplicate } = await findAttempt(loaded.exam.id, participantContact.value)
      if (isSubmittedAttempt(duplicate)) return completedAttemptResponse(loaded.exam, duplicate)
    }
    console.error('ذخیره نتیجه آزمون انجام نشد:', submitError)
    return NextResponse.json({ error: 'ارسال پاسخ‌ها انجام نشد. دوباره تلاش کنید.' }, { status: 503 })
  }

  if (reopenSubmissionActive && submitted.feedback_submitted_at) {
    return completedAttemptResponse(loaded.exam, submitted)
  }

  return NextResponse.json({
    state: 'feedback',
    attemptId: submitted.id,
    submittedAt: submitted.submitted_at,
    participantName,
    participantContact: participantContact.value,
    participantSpecialty: effectiveSpecialty,
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
  if (!UUID_PATTERN.test(attemptId)) return NextResponse.json({ error: 'نتیجه آزمون معتبر نیست.' }, { status: 400 })

  const { data: exam, error: examError } = await supabaseAdmin.from('exams').select('id,show_result,language').eq('public_code', code).maybeSingle()
  if (examError) return databaseUnavailable()
  if (!exam) return NextResponse.json({ error: 'آزمون پیدا نشد.' }, { status: 404 })
  const participantContact = normalizeContact(payload?.participantContact)

  if (payload?.action === 'progress') {
    if (!participantContact) return NextResponse.json({ error: 'شناسه شرکت‌کننده معتبر نیست.' }, { status: 400 })
    const participantSpecialty = normalizeParticipantSpecialty(payload?.participantSpecialty)
    if (!participantSpecialty) return NextResponse.json({ error: 'تخصص یا رشتهٔ شرکت‌کننده معتبر نیست.' }, { status: 400 })
    const { userId: signedInUserId } = await auth()
    const { data: questions, error: questionsError } = await supabaseAdmin.from('exam_questions').select('id,correct_option_index,points').eq('exam_id', exam.id)
    if (questionsError) return databaseUnavailable()
    const normalized = gradeExam(questions || [], payload.answers).answers
    const { data: activeAttempt, error: attemptError } = await supabaseAdmin
      .from('exam_attempts')
      .select('answers,max_score')
      .eq('id', attemptId)
      .eq('exam_id', exam.id)
      .eq('participant_contact', participantContact.value)
      .maybeSingle()
    if (attemptError) return databaseUnavailable()
    if (!activeAttempt) return NextResponse.json({ error: 'آزمون در حال انجام پیدا نشد.' }, { status: 404 })
    const reopened = Number(activeAttempt.max_score) > 0 && isAttemptReopenActive(activeAttempt.answers)
    if (Number(activeAttempt.max_score) > 0 && !reopened) {
      return NextResponse.json({ error: 'مهلت بازگشایی این آزمون تمام شده است.' }, { status: 409 })
    }
    const storedUserId = typeof activeAttempt.answers?.[PARTICIPANT_USER_KEY] === 'string' ? activeAttempt.answers[PARTICIPANT_USER_KEY] : ''
    const savedAnswers = reopened
      ? saveAttemptReopenDraft(activeAttempt.answers, payload.answers)
      : normalized
    const { data: saved, error: saveError } = await supabaseAdmin
      .from('exam_attempts')
      .update({ answers: withParticipantMetadata(savedAnswers, participantSpecialty, storedUserId || signedInUserId || '') })
      .eq('id', attemptId)
      .eq('exam_id', exam.id)
      .eq('participant_contact', participantContact.value)
      .select('id')
      .maybeSingle()
    if (saveError) return databaseUnavailable()
    if (!saved) return NextResponse.json({ error: 'آزمون در حال انجام پیدا نشد.' }, { status: 404 })
    return NextResponse.json({ saved: true })
  }

  const feedbackMessage = typeof payload?.feedbackText === 'string' ? payload.feedbackText.trim().slice(0, 1600) : ''
  const hasDetailedRatings = payload?.ratings && typeof payload.ratings === 'object' && !Array.isArray(payload.ratings)
  const detailedRatings = hasDetailedRatings
    ? { questions: Number(payload.ratings.questions), design: Number(payload.ratings.design), clip: Number(payload.ratings.clip) }
    : null
  const detailedValues = detailedRatings ? Object.values(detailedRatings) : []
  const legacyRating = payload?.rating === null || payload?.rating === undefined || payload?.rating === '' ? null : Number(payload.rating)
  const rating = detailedRatings ? Math.round(detailedValues.reduce((sum, value) => sum + value, 0) / detailedValues.length) : legacyRating
  const feedbackText = detailedRatings ? JSON.stringify({ version: 2, ratings: detailedRatings, message: feedbackMessage }) : feedbackMessage

  if (detailedRatings && detailedValues.some(value => !Number.isInteger(value) || value < 1 || value > 5)) {
    return NextResponse.json({ error: 'برای هر سه بخش باید امتیازی بین ۱ تا ۵ وارد شود.' }, { status: 400 })
  }
  if (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5)) {
    return NextResponse.json({ error: 'امتیاز نظر باید بین ۱ تا ۵ باشد.' }, { status: 400 })
  }
  if (rating === null && !feedbackText) return NextResponse.json({ error: 'امتیاز یا متن نظر را وارد کنید.' }, { status: 400 })

  let updateQuery = supabaseAdmin
    .from('exam_attempts')
    .update({ feedback_rating: rating, feedback_text: feedbackText || null, feedback_submitted_at: new Date().toISOString() })
    .eq('id', attemptId)
    .eq('exam_id', exam.id)
    .gt('max_score', 0)
  if (participantContact) updateQuery = updateQuery.eq('participant_contact', participantContact.value)
  const { data: updated, error } = await updateQuery.select('id,answers,score,max_score,percentage').maybeSingle()

  if (error) {
    console.error('ثبت نظر آزمون انجام نشد:', error)
    return NextResponse.json({ error: 'ثبت نظر انجام نشد. دوباره تلاش کنید.' }, { status: 503 })
  }
  if (!updated) return NextResponse.json({ error: 'نتیجه آزمون پیدا نشد.' }, { status: 404 })

  const built = await buildResult(exam, updated)
  if (built.error) {
    console.error('بارگذاری مرور پاسخ‌ها انجام نشد:', built.error)
    return NextResponse.json({ error: 'نظر ثبت شد اما نمایش نتیجه انجام نشد. صفحه را دوباره باز کنید.' }, { status: 503 })
  }
  return NextResponse.json({ saved: true, result: built.result })
}
