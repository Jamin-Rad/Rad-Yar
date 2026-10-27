// Edge-compatible token comparison used by both the request gate and session
// helpers. An absent configuration never grants access.
export function sameFamilySession(token, expected) {
  if (typeof token !== 'string' || typeof expected !== 'string' || !token || !expected || token.length !== expected.length) return false
  let difference = 0
  for (let index = 0; index < expected.length; index++) difference |= token.charCodeAt(index) ^ expected.charCodeAt(index)
  return difference === 0
}

export function familyCookiesAllowAccess(cookieStore, memberCookie, memberSecret, ownerSecret) {
  return sameFamilySession(cookieStore.get(memberCookie)?.value, memberSecret)
    || sameFamilySession(cookieStore.get('andarun_session')?.value, ownerSecret)
}
