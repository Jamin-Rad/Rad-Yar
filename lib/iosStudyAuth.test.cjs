// Run from the repository root: node --experimental-vm-modules lib/iosStudyAuth.test.cjs
const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { createHash } = require('node:crypto')
const { SourceTextModule, SyntheticModule } = require('node:vm')
const root = process.cwd()
process.env.CLERK_SECRET_KEY = 'integration-test-only'
let session = null
let active = true
let allowed = true
const clerk = {
  auth: async () => session ? { userId: 'user_test', sessionId: session } : {},
  currentUser: async () => ({ allowed, id: 'user_test', username: 'test-account' }),
  clerkClient: async () => ({
    sessions: { getSession: async () => ({ status: active ? 'active' : 'revoked', userId: 'user_test' }) },
    users: { getUser: async () => ({ allowed, id: 'user_test', username: 'test-account' }) },
  }),
}
const verify = 'd'.repeat(64)
const challenge = createHash('sha256').update(verify).digest('hex')
const base = 'https://www.rad-yar.com/api/ios-study'
async function run() {
  const mocks = {
    'node:crypto': require('node:crypto'),
    '@clerk/nextjs/server': clerk,
    '@/utils/subscription': { hasFullAccess: u => u.allowed, getProAccess: () => ({ until: null }) },
    '@/lib/iosStudyBank': { buildStudyBank: () => ({ schemaVersion: 1, cards: ['new-study-content'] }) },
  }
  function linker(id) {
    if (id === '@/lib/iosStudyGrant') return new SourceTextModule(readFileSync(root + '/lib/iosStudyGrant.js', 'utf8'))
    const value = mocks[id]
    assert.ok(value, id)
    return new SyntheticModule(Object.keys(value), function () {
      for (const [key, val] of Object.entries(value)) this.setExport(key, val)
    })
  }
  async function load(path) {
    const module = new SourceTextModule(readFileSync(root + path, 'utf8'))
    await module.link(linker)
    await module.evaluate()
    return module.namespace
  }
  const bank = await load('/app/api/ios-study/route.js')
  const auth = await load('/app/api/ios-study/authorize/route.js')
  assert.equal((await bank.GET(new Request(base))).status, 401)
  assert.equal((await auth.GET(new Request(base + '/authorize'))).status, 400)
  const start = await auth.GET(new Request(base + '/authorize?challenge=' + challenge))
  assert.equal(start.status, 302)
  assert.equal(new URL(start.headers.get('location')).pathname, '/sign-in')
  const post = origin => auth.POST(new Request(base + '/authorize', {
    method: 'POST', headers: { Origin: origin }, body: new URLSearchParams({ challenge }),
  }))
  assert.equal((await post('https://foreign.invalid')).status, 403)
  session = 'sess_test'
  const consent = await auth.GET(new Request(base + '/authorize?challenge=' + challenge))
  assert.equal(consent.status, 200)
  assert.match(await consent.text(), /Connect to RadYar/)
  assert.equal(consent.headers.get('referrer-policy'), 'same-origin')
  assert.match(consent.headers.get('content-security-policy'), /form-action 'self' com\.radyar\.study:/)
  assert.equal((await post('null')).status, 403)
  const approved = await post('https://www.rad-yar.com')
  assert.equal(approved.status, 303)
  const grant = new URL(approved.headers.get('location')).searchParams.get('grant')
  assert.ok(grant)
  assert.equal(new URL(approved.headers.get('location')).protocol, 'com.radyar.study:')
  assert.equal(new URL(approved.headers.get('location')).searchParams.get('challenge'), challenge)
  const fetchBank = (verifier = verify, etag = '') => bank.GET(new Request(base, {
    headers: { 'X-RadYar-Grant': grant, 'X-RadYar-Verifier': verifier, 'If-None-Match': etag },
  }))
  const result = await fetchBank()
  assert.equal(result.status, 200)
  assert.equal(result.headers.get('x-radyar-account-id'), 'user_test')
  assert.equal(result.headers.get('cache-control'), 'private, no-store')
  assert.ok(Number(result.headers.get('x-radyar-access-until')) > Date.now())
  assert.deepEqual((await result.json()).cards, ['new-study-content'])
  assert.equal((await fetchBank(verify, result.headers.get('etag'))).status, 304)
  assert.equal((await fetchBank('a'.repeat(64))).status, 401)
  allowed = false
  assert.equal((await fetchBank()).status, 403)
  assert.equal(new URL((await post('https://www.rad-yar.com')).headers.get('location')).searchParams.get('error'), 'access')
  allowed = true
  active = false
  assert.equal((await fetchBank()).status, 401)
  console.log('Pass: sign-in redirect, consent, cross-origin rejection, authorized download, ETag, revocation and entitlement checks')
}
run().catch(error => { console.error(error); process.exitCode = 1 })
