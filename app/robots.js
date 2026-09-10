const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rad-yar.com'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/kaiser-score', '/kaiser-score/', '/node-rads', '/node-rads/', '/fleischner', '/fleischner/'],
    },
    host: siteUrl,
  }
}
