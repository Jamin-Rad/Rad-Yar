/** @type {import('next').NextConfig} */
const nextConfig = {
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
