import { getAndarunWebApp } from '@/lib/andarunWebApps'

export async function GET(_request, { params }) {
  const { app: appKey } = await params
  const app = getAndarunWebApp(appKey)

  if (!app) {
    return Response.json({ error: 'Unknown Andarun app' }, { status: 404 })
  }

  const isPersian = appKey === 'gefangene' || appKey === 'medikamente'

  return Response.json({
    id: app.startUrl,
    name: app.name,
    short_name: app.shortName,
    description: `${app.name} · privater Bereich`,
    lang: isPersian ? 'fa' : 'de',
    dir: isPersian ? 'rtl' : 'ltr',
    start_url: app.startUrl,
    // A narrow scope lets Android keep every Andarun tool as its own app.
    // The main Andarun app still owns the full /andarun tree.
    scope: appKey === 'andarun' ? '/andarun/' : app.startUrl,
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: app.backgroundColor,
    theme_color: app.themeColor,
    icons: [192, 512].map(size => ({
      src: `/andarun/icons/${app.icon}-${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png',
      purpose: 'any maskable',
    })),
  }, {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
    },
  })
}
