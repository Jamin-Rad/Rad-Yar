import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

const TOKEN_KEY = 'maman.mobile.token.v1'
const USERNAME_KEY = 'maman.mobile.username.v1'
export const MAMAN_USERNAME = 'Maman'
export const API_BASE = (process.env.EXPO_PUBLIC_API_URL || 'https://www.rad-yar.com').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
  }
}

export async function getToken() {
  if (Platform.OS === 'web') return globalThis.sessionStorage?.getItem(TOKEN_KEY) || null
  return SecureStore.getItemAsync(TOKEN_KEY)
}

export async function hasToken() {
  return Boolean(await getToken())
}

export async function getUsername() {
  if (Platform.OS === 'web') return globalThis.localStorage?.getItem(USERNAME_KEY) || null
  return SecureStore.getItemAsync(USERNAME_KEY)
}

export async function login(username: string) {
  const response = await fetch(`${API_BASE}/api/maman/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ username, client: 'mobile' }),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok || !payload?.token) {
    const message = response.status === 401 || response.status === 403
      ? `نام کاربری باید ${MAMAN_USERNAME} باشد.`
      : 'ورود انجام نشد؛ اتصال اینترنت را بررسی کنید.'
    throw new ApiError(message, response.status)
  }
  if (Platform.OS === 'web') globalThis.sessionStorage?.setItem(TOKEN_KEY, payload.token)
  else await SecureStore.setItemAsync(TOKEN_KEY, payload.token)
  if (Platform.OS === 'web') globalThis.localStorage?.setItem(USERNAME_KEY, payload.username || MAMAN_USERNAME)
  else await SecureStore.setItemAsync(USERNAME_KEY, payload.username || MAMAN_USERNAME)
  return payload.token as string
}

export async function logout() {
  if (Platform.OS === 'web') {
    globalThis.sessionStorage?.removeItem(TOKEN_KEY)
    globalThis.localStorage?.removeItem(USERNAME_KEY)
  } else {
    await Promise.all([SecureStore.deleteItemAsync(TOKEN_KEY), SecureStore.deleteItemAsync(USERNAME_KEY)])
  }
}

export async function requestJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await getToken()
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { 'X-Maman-Token': token } : {}),
      ...(init.headers || {}),
    },
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new ApiError(payload?.error || 'خطا در ارتباط با سرور.', response.status)
  return payload as T
}
