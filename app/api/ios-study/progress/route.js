import { clerkClient } from '@clerk/nextjs/server'
import { getAccountIdentity, getLearningIdentityForAccount, getPracticeIdentityForLearningAccount } from '@/lib/userIdentity'
import { loadLearningReadSnapshot } from '@/lib/learningReadSnapshot'
import { studyInventory } from '@/lib/iosStudyBank'
import { readStudyGrant } from '@/lib/iosStudyGrant'
import { clientCard, isNewerCard, loadQuestionProgress, saveStudyCard } from '@/lib/iosStudyProgressStore'
import { nativeScorePrefix } from '@/lib/studyProgressScores.mjs'
import { supabaseAdmin } from '@/lib/supabase/server'
import { hasFullAccess } from '@/utils/subscription'

const headers = { 'Cache-Control': 'private, no-store' }
const respond = (body, status = 200) => Response.json(body, { status, headers })
const uuid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i
const dayKey = /^\d{4}-\d{2}-\d{2}$/
const idDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : null
const count = value => Number.isInteger(value) && value >= 0 && value <= 100_000 ? value : 0
let catalog

function studyCatalog() {
  if (catalog) return catalog
  const bank = studyInventory()
  const paths = bank.paths
  for (const topic of bank.topics) {
    if (!paths.has(topic.id) && topic.lessonPath) paths.set(topic.id, topic.lessonPath)
  }
  catalog = {
    cards: new Set(bank.cards.map(card => card.id)),
    questions: new Map(bank.questions.map(question => [question.id, question])),
    topics: new Set(bank.topics.map(topic => topic.id)),
    paths,
  }
  return catalog
}

async function signedInOwner(request) {
  const grant = readStudyGrant(request.headers.get('x-radyar-grant'), request.headers.get('x-radyar-verifier'))
  if (!grant) return { status: 401 }
  const clerk = await clerkClient()
  try {
    const session = await clerk.sessions.getSession(grant.sessionId)
    if (session.status !== 'active') return { status: 401 }
    const user = await clerk.users.getUser(session.userId)
    if (!hasFullAccess(user)) return { status: 403 }
    const learning = await getLearningIdentityForAccount(getAccountIdentity(user))
    const practice = await getPracticeIdentityForLearningAccount(learning)
    if (practice.storageUnavailable) return { status: 503 }
    return { ownerId: practice.ownerId, practiceIds: practice.lookupIds, learningIds: learning.lookupIds }
  } catch (error) {
    if (error.status === 404) return { status: 401 }
    throw error
  }
}

async function applyChanges(ownerId, body) {
  const { cards, answers } = body ?? {}
  if (!cards || Array.isArray(cards) || typeof cards !== 'object' || !Array.isArray(answers) ||
      Object.keys(cards).length > 60 || answers.length > 60) return false
  const index = studyCatalog()
  const rows = []
  for (const [id, card] of Object.entries(cards)) {
    if (!index.cards.has(id)) continue
    if (!card || !Number.isInteger(card.box) || card.box < 1 || card.box > 8 ||
        !['active', 'mastered'].includes(card.status)) return false
    const reviewed = idDate(card.lastReviewedAt)
    const added = idDate(card.addedAt)
    if ([reviewed, added].some(date => date && Date.parse(date) > Date.now() + 5 * 60_000)) return false
    const correct = count(card.correctCount)
    const wrong = count(card.wrongCount)
    rows.push({
      user_id: ownerId, card_id: id, box: card.box, status: card.status,
      added_at: added, last_reviewed_at: reviewed, last_seen_at: reviewed,
      due_at: card.status === 'mastered' ? null : idDate(card.dueAt),
      correct_count: correct, wrong_count: wrong, seen_count: correct + wrong,
    })
  }
  const events = []
  for (const answer of answers) {
    const question = index.questions.get(answer?.questionId)
    if (!question) continue
    const date = idDate(answer.answeredAt)
    if (!uuid.test(answer.id) || !date || Date.parse(date) > Date.now() + 5 * 60_000 ||
        !dayKey.test(answer.day) || typeof answer.correct !== 'boolean' ||
        !question.topicIds.includes(answer.topicId)) return false
    events.push({
      user_id: ownerId, thema_id: nativeScorePrefix + answer.id.toLowerCase(),
      attempted: 1, correct: Number(answer.correct), last_date: date,
      details: { nativeAnswer: { topicId: answer.topicId, questionId: question.id, day: answer.day } },
    })
  }
  for (let start = 0; start < rows.length; start += 6) {
    await Promise.all(rows.slice(start, start + 6).map(row => saveStudyCard(supabaseAdmin, row)))
  }
  if (events.length) {
    const result = await supabaseAdmin.from('mcq_results')
      .upsert(events, { onConflict: 'user_id,thema_id', ignoreDuplicates: true })
    if (result.error) throw result.error
  }
  return true
}

async function progressSnapshot({ practiceIds, learningIds }) {
  const index = studyCatalog()
  const [cards, lessons, questions] = await Promise.all([
    readPages(() => supabaseAdmin.from('leitner_cards')
      .select('card_id,box,status,added_at,last_seen_at,last_reviewed_at,due_at,correct_count,wrong_count,seen_count')
      .in('user_id', practiceIds).order('user_id').order('card_id')),
    loadLearningReadSnapshot(supabaseAdmin, learningIds),
    loadQuestionProgress(supabaseAdmin, practiceIds),
  ])
  const read = expandLessonAliases(index, Object.keys(lessons.read).filter(id => lessons.read[id]))
  const studied = new Set([...questions.studiedTopicIds, ...read])
  for (const questionId of questions.answeredQuestionIds) {
    for (const topicId of index.questions.get(questionId)?.topicIds || []) studied.add(topicId)
  }
  const latestCards = new Map()
  for (const row of cards) {
    if (index.cards.has(row.card_id) && isNewerCard(row, latestCards.get(row.card_id))) latestCards.set(row.card_id, row)
  }
  return respond({
    cards: Object.fromEntries([...latestCards].map(([id, row]) => [id, clientCard(row)])),
    wrongQuestionIds: questions.wrongQuestionIds.filter(id => index.questions.has(id)),
    studiedTopicIds: [...expandLessonAliases(index, studied)].filter(id => index.topics.has(id)),
    readTopicIds: [...read].filter(id => index.topics.has(id)),
  })
}

async function readPages(query) {
  const rows = []
  const pageSize = 500
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await query().range(offset, offset + pageSize - 1)
    if (error) throw error
    rows.push(...data)
    if (data.length < pageSize) return rows
  }
}

function expandLessonAliases(index, ids) {
  const topics = new Set(ids)
  const paths = new Set([...topics].map(id => index.paths.get(id)).filter(Boolean))
  for (const [id, path] of index.paths) if (paths.has(path)) topics.add(id)
  return topics
}

async function handle(request) {
  try {
    const identity = await signedInOwner(request)
    if (!identity.ownerId) return respond({ error: 'access' }, identity.status)
    if (!supabaseAdmin) return respond({ error: 'unavailable' }, 503)
    if (request.method === 'POST') {
      if (!request.headers.get('content-type')?.startsWith('application/json')) return respond({ error: 'invalid' }, 415)
      const raw = await request.text()
      if (raw.length > 65536) return respond({ error: 'too_large' }, 413)
      let body
      try { body = JSON.parse(raw) } catch { return respond({ error: 'invalid' }, 400) }
      if (!await applyChanges(identity.ownerId, body)) return respond({ error: 'invalid' }, 400)
    }
    return await progressSnapshot(identity)
  } catch {
    return respond({ error: 'unavailable' }, 503)
  }
}

export const GET = handle
export const POST = handle
