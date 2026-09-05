/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/mamma-rechner', destination: '/mamma-calculator', permanent: true },
    ];
  },
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
