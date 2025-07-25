import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kctplayer.s3.ap-south-1.amazonaws.com',
        port: '', // Leave empty for default HTTPS port
        pathname: '/**', // Allow all paths under this hostname
      },
    ],
  },
};

export default nextConfig;
