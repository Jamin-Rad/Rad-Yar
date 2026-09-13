/** @type {import('next').NextConfig} */
const nextConfig = {
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
