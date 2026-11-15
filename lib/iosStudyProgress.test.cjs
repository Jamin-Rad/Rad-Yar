// Run from the project root with node --experimental-vm-modules lib/iosStudyProgress.test.cjs
const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { SourceTextModule, SyntheticModule } = require('node:vm')
const { createHash, randomUUID } = require('node:crypto')

const owner = 'clerk-qa'
const legacyOwner = 'email:qa@example.invalid'
const cardId = 'test-card'
const topic = 'completed-topic'
const practisedOnly = 'practised-only'
const question = 'test-question'
const stamp = day => `2026-05-${day}T12:00:00.000Z`
const tables = {
  leitner_cards: [
    { user_id: owner, card_id: cardId, box: 2, status: 'active', added_at: stamp('01'),
      last_reviewed_at: stamp('02'), last_seen_at: stamp('02'), due_at: stamp('05'), correct_count: 1 },
    { user_id: 'another-user', card_id: cardId, box: 7, status: 'active', added_at: stamp('01') },
  ],
  mcq_results: [
    { user_id: owner, thema_id: topic, attempted: 1, correct: 0, last_date: stamp('02'),
      details: { wrongQuestionIds: [question] } },
    { user_id: owner, thema_id: practisedOnly, attempted: 1, correct: 1, last_date: stamp('02'), details: {} },
  ],
  learning_legacy_owners: [{ user_id: owner, legacy_id: legacyOwner }],
  learning_progress_resets: [{ user_id: owner, changed_at: stamp('02'), change_id: 'reset' }],
  user_progress: [
    { user_id: owner, thema_id: 'web-topic-alias', read_pct: 1, updated_at: stamp('03') },
    { user_id: legacyOwner, thema_id: practisedOnly, read_pct: 1, updated_at: stamp('01') },
    { user_id: owner, thema_id: practisedOnly, read_pct: 0.5, updated_at: stamp('04') },
    ...Array.from({ length: 510 }, (_, index) => ({
      user_id: owner, thema_id: `archived-lesson-${index}`, read_pct: 1, updated_at: stamp('02'),
    })),
    { user_id: 'another-user', thema_id: practisedOnly, read_pct: 1, updated_at: stamp('05') },
  ],
}
function query(table) {
  const rows = tables[table]
  const filters = []
  let writer
  let bounds
  let sort
  const chain = {
    select: () => chain,
    eq: (key, value) => (filters.push(row => row[key] === value), chain),
    is: (key, value) => (filters.push(row => (row[key] ?? null) === value), chain),
    gte: (key, value) => (filters.push(row => row[key] >= value), chain),
    in: (key, values) => (filters.push(row => values.includes(row[key])), chain),
    order: key => (sort = key, chain),
    range: (from, to) => (bounds = [from, to + 1], chain),
    maybeSingle: async () => ({ data: rows.find(row => filters.every(filter => filter(row))) ?? null }),
    update: patch => (writer = results => results.map(row => Object.assign(row, patch)), chain),
    upsert: (incoming, config) => {
      writer = () => (Array.isArray(incoming) ? incoming : [incoming]).flatMap(row => {
        const keys = config.onConflict.split(',')
        const previous = rows.find(candidate => keys.every(key => candidate[key] === row[key]))
        if (previous) return config.ignoreDuplicates ? [] : [Object.assign(previous, row)]
        rows.push({ ...row })
        return [row]
      })
      return chain
    },
    then: resolve => {
      let data = rows.filter(row => filters.every(filter => filter(row)))
      if (writer) data = writer(data)
      if (sort) data.sort((left, right) => left[sort].localeCompare(right[sort]))
      if (bounds) data = data.slice(...bounds)
      resolve({ data: structuredClone(data) })
    },
  }
  return chain
}

let active = true
let entitled = true
const user = { id: 'clerk-qa', emailAddresses: [{ id: 'main', emailAddress: 'QA@example.invalid', verification: { status: 'verified' } }], primaryEmailAddressId: 'main' }
async function run() {
  process.env.CLERK_SECRET_KEY = 'fixture-only'
  const mocks = {
    'node:crypto': require('node:crypto'),
    '@clerk/nextjs/server': { auth: async () => ({userId: owner}), currentUser: async () => user, clerkClient: async () => ({
      sessions: { getSession: async () => ({ userId: user.id, status: active ? 'active' : 'revoked' }) },
      users: { getUser: async () => user },
    }) },
    '@/lib/iosStudyBank': {
      studyInventory: () => ({
        cards: [{ id: cardId }], topics: [{ id: topic }, { id: practisedOnly }],
        questions: [{ id: question, topicIds: [topic] }],
        paths: new Map([[topic, '/lesson'], ['web-topic-alias', '/lesson']]),
      }),
    },
    '@/utils/subscription': { hasFullAccess: () => entitled },
    '@/lib/supabase/server': { isSupabaseAdminConfigured: true, supabaseAdmin: { from: query,
      rpc: async (name, args) => {
        assert.equal(name, 'claim_learning_legacy_ids')
        assert.equal(args.p_user_id, owner)
        assert.deepEqual(args.p_legacy_ids, [legacyOwner])
        return { data: [legacyOwner] }
      },
    } },
    './progressCache.js': { isUserCacheActive: () => false, persistCurrentUserCache: () => {} },
  }
  const files = {
    '@/lib/emailIdentity': 'lib/emailIdentity.js',
    '@/lib/userIdentity': 'lib/userIdentity.js',
    '@/utils/readProgressStore': 'utils/readProgressStore.js',
    '@/lib/learningReadSnapshot': 'lib/learningReadSnapshot.js',
    '@/lib/iosStudyGrant': 'lib/iosStudyGrant.js',
    '@/lib/iosStudyProgressStore': 'lib/iosStudyProgressStore.js',
    '@/lib/studyProgressScores.mjs': 'lib/studyProgressScores.mjs',
    'route': 'app/api/ios-study/progress/route.js',
  }
  const modules = new Map()
  const load = key => {
    if (key === './studyProgressScores.mjs') key = '@/lib/studyProgressScores.mjs'
    if (modules.has(key)) return modules.get(key)
    const values = mocks[key]
    assert.ok(files[key] || values, key)
    const module = values
      ? new SyntheticModule(Object.keys(values), function () {
          for (const [name, value] of Object.entries(values)) this.setExport(name, value)
        })
      : new SourceTextModule(readFileSync(files[key], 'utf8'))
    modules.set(key, module)
    return module
  }
  const route = load('route')
  await route.link(load)
  await route.evaluate()
  const grantModule = load('@/lib/iosStudyGrant')
  const verifier = 'e'.repeat(64)
  const challenge = createHash('sha256').update(verifier).digest('hex')
  const grant = grantModule.namespace.issueStudyGrant('sess_qa', challenge)
  const url = 'https://www.rad-yar.com/api/ios-study/progress'
  const send = (body, secret = verifier) => {
    const headers = { 'X-RadYar-Grant': grant, 'X-RadYar-Verifier': secret, 'Content-Type': 'application/json' }
    return body ? route.namespace.POST(new Request(url, { headers, method: 'POST', body: JSON.stringify(body) }))
      : route.namespace.GET(new Request(url, { headers }))
  }
  assert.equal((await route.namespace.GET(new Request(url))).status, 401)
  assert.equal((await send(null, 'f'.repeat(64))).status, 401)
  const website = await (await send()).json()
  assert.equal(website.cards[cardId].box, 2)
  assert.deepEqual(website.wrongQuestionIds, [question])
  assert.deepEqual(new Set(website.studiedTopicIds), new Set([topic, practisedOnly]))
  assert.deepEqual(website.readTopicIds, [topic], 'an answered question or partially read lesson must not count as a read lesson')
  const result = {
    cards: { [cardId]: { box: 3, status: 'active', addedAt: stamp('01'), lastReviewedAt: stamp('04'),
      dueAt: stamp('11'), correctCount: 2 } },
    answers: [{ id: randomUUID(), questionId: question, topicId: topic, correct: true, answeredAt: stamp('04'), day: '2026-05-04' }],
  }
  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await send(result)
    assert.equal(response.status, 200)
    const snapshot = await response.json()
    assert.equal(snapshot.cards[cardId].box, 3)
    assert.deepEqual(snapshot.wrongQuestionIds, [])
  }
  assert.equal(tables.mcq_results.length, 3, 'retry must not double count the answer')
  const stale = await (await send({ cards: { [cardId]: { ...result.cards[cardId], box: 1, lastReviewedAt: stamp('03') } }, answers: [] })).json()
  assert.equal(stale.cards[cardId].box, 3, 'an older device must not rewind the card')
  assert.equal(tables.leitner_cards[1].box, 7, 'the same card in a different account must not change')
  tables.user_progress.push({ user_id: owner, thema_id: 'web-topic-alias', read_pct: 0, updated_at: stamp('05') })
  assert.deepEqual((await (await send()).json()).readTopicIds, [], 'a later uncheck overrides older marked records')
  const { projectStudyScores } = load('@/lib/studyProgressScores.mjs').namespace
  const web = projectStudyScores(tables.mcq_results)
  assert.equal(web.scores['ios-study:' + topic].daily['2026-05-04'].correct, 1)
  assert.deepEqual(web.scores[topic].wrongQuestionIds, [])
  entitled = false
  assert.equal((await send()).status, 403)
  entitled = true
  active = false
  assert.equal((await send()).status, 401)
  console.log('PASS: shared account, website → app, app → website, retry safety, stale-card conflict, wrong review, access checks')
}

run().catch(error => { console.error(error); process.exitCode = 1 })
