/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/', has: [{ type: 'query', key: 'ref', value: 'rechner' }, { type: 'query', key: 'calc', value: '(?<calculator>[^/]+)' }], destination: '/rechner/:calculator', permanent: false },
      { source: '/', has: [{ type: 'query', key: 'ref', value: 'rechner' }], destination: '/rechner', permanent: false },
    ];
  },
  // Browser-local Hamrah preview is a static document, independent of Clerk and the RadYar layout.
  async rewrites() {
    return [{source:'/hamrah-e-salamat',destination:'/hamrah-e-salamat/index.html'}];
  },
  async headers() {
    return [{source:'/hamrah-e-salamat/:path*',headers:[
      {key:'X-Robots-Tag',value:'noindex, nofollow'},
      {key:'X-Content-Type-Options',value:'nosniff'},
      {key:'Referrer-Policy',value:'no-referrer'},
      {key:'Cache-Control',value:'no-cache'},
      {key:'Content-Security-Policy',value:"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'"}
    ]}];
  },
  // Home-screen installers need the page-specific manifest in the initial head,
  // including after private-page metadata resolves. Body-streamed metadata can
  // leave an installer using the previously visited parent application's manifest.
  htmlLimitedBots: /.*/,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-images-static.radiopaedia.org',
      },
    ],
  },
};

export default nextConfig;
