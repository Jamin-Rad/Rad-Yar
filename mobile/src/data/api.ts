import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'andarun.mobile.token'
export const API_BASE = (process.env.EXPO_PUBLIC_API_URL || 'https://www.rad-yar.com').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
  }
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY)
}

export async function hasToken() {
  return Boolean(await getToken())
}

export async function login(password: string) {
  const response = await fetch(`${API_BASE}/api/andarun/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ password, client: 'mobile' }),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok || !payload?.token) {
    const message = response.status === 401 || response.status === 403
      ? 'رمز ورود نادرست است.'
      : 'ورود انجام نشد؛ اتصال اینترنت را بررسی کنید.'
    throw new ApiError(message, response.status)
  }
  await SecureStore.setItemAsync(TOKEN_KEY, payload.token)
  return payload.token as string
}

export async function logout() {
  await SecureStore.deleteItemAsync(TOKEN_KEY)
}

export async function requestJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await getToken()
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { 'X-Andarun-Token': token } : {}),
      ...(init.headers || {}),
    },
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new ApiError(payload?.error || 'خطا در ارتباط با سرور.', response.status)
  return payload as T
}
