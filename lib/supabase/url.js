export function normalizeSupabaseUrl(rawUrl) {
  if (!rawUrl) return ''

  const value = rawUrl.trim().replace(/\/+$/, '')

  try {
    const url = new URL(value)
    const dashboardMatch = url.pathname.match(/\/(?:dashboard\/)?project\/([a-z0-9-]+)/i)

    if (url.hostname === 'supabase.com' && dashboardMatch?.[1]) {
      return `https://${dashboardMatch[1]}.supabase.co`
    }

    if (url.hostname.endsWith('.supabase.co')) {
      return url.origin
    }
  } catch {}

  return value
}

