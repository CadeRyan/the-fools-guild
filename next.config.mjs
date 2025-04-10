/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/the-fool-s-guild.firebasestorage.app/**', // Corrected bucket name
      },
    ],
  },
};

export default nextConfig;
