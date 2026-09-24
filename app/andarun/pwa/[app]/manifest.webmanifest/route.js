import { getAndarunWebApp } from '@/lib/andarunWebApps'

export async function GET(_request, { params }) {
  const { app: appKey } = await params
  const app = getAndarunWebApp(appKey)

  if (!app) {
    return Response.json({ error: 'Unknown Andarun app' }, { status: 404 })
  }

  return Response.json({
    id: app.startUrl,
    name: app.name,
    short_name: app.shortName,
    description: `${app.name} · privater Bereich`,
    lang: appKey === 'gefangene' ? 'fa' : 'de',
    dir: appKey === 'gefangene' ? 'rtl' : 'ltr',
    start_url: app.startUrl,
    scope: '/andarun/',
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
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
