/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'files.catbox.moe' },
      { protocol: 'https', hostname: 'litter.catbox.moe' }
    ]
  }
};

export default nextConfig;
