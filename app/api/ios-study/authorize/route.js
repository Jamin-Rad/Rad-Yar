import { auth, currentUser } from '@clerk/nextjs/server'
import { hasFullAccess } from '@/utils/subscription'
import { isChallenge, issueStudyGrant } from '@/lib/iosStudyGrant'

const headers = {
  'Cache-Control': 'private, no-store',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'",
}

function page(title, content, status = 200) {
  return new Response(`<!doctype html><html lang="fa" dir="rtl"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><style>
body{background:#080e1c;color:#f8fafc;font:1rem system-ui;margin:0;padding:12vh 1.5rem}
main{max-width:28rem;margin:auto;background:#111b2d;padding:2rem;border-radius:1.25rem}
button{border:0;border-radius:2rem;padding:.8rem 1.3rem;background:#fbbf24;color:#080e1c;font:inherit}
</style><main><h1>${title}</h1>${content}</main></html>`, {
    status, headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' },
  })
}

export async function GET(request) {
  const url = new URL(request.url)
  const challenge = url.searchParams.get('challenge')
  if (!isChallenge(challenge)) return page('درخواست نامعتبر', '<p>دوباره از اپ رادیار شروع کنید.</p>', 400)
  const { userId } = await auth()
  if (!userId) {
    const login = new URL('/sign-in', url.origin)
    login.searchParams.set('redirect_url', url.pathname + url.search)
    return new Response(null, { status: 302, headers: { ...headers, Location: login.href } })
  }
  return page('همگام‌سازی مطالعهٔ رادیار',
    '<p>به اپ رادیار اجازه می‌دهید بانک فلش‌کارت و سؤال را با دسترسی این حساب به‌روز کند؟</p>' +
    `<form method="post"><input type="hidden" name="challenge" value="${challenge}"><button>اتصال به اپ رادیار</button></form>`)
}

export async function POST(request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) {
    return page('درخواست نامعتبر', '<p>دوباره از اپ رادیار شروع کنید.</p>', 403)
  }
  const challenge = (await request.formData()).get('challenge')
  const { sessionId } = await auth()
  if (!sessionId || !isChallenge(challenge)) {
    return page('اتصال برقرار نشد', '<p>دوباره از اپ رادیار وارد شوید.</p>', 401)
  }
  const user = await currentUser()
  const callback = new URL('com.radyar.study://authorize')
  callback.searchParams.set('challenge', challenge)
  if (user && hasFullAccess(user)) {
    callback.searchParams.set('grant', issueStudyGrant(sessionId, challenge))
  } else {
    callback.searchParams.set('error', 'access')
  }
  return new Response(null, { status: 303, headers: { ...headers, Location: callback.href } })
}
