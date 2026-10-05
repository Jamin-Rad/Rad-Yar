import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    id: '/maman',
    name: 'داروی Maman',
    short_name: 'Maman',
    description: 'برنامهٔ شخصی داروهای Maman',
    lang: 'fa',
    dir: 'rtl',
    start_url: '/maman',
    scope: '/maman',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#fffdf9',
    theme_color: '#2f755f',
    icons: [192, 512].map(size => ({
      src: `/andarun/icons/medikamente-${size}.png`,
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
