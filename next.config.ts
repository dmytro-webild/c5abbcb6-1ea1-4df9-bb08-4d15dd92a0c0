import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
      serverComponentsHmrCache: false,
  },
  images: {
            localPatterns: [
          {
              pathname: '/**',
              search: '*',
          },
      ],
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'webuild-dev.s3.eu-north-1.amazonaws.com',
          },
          {
              protocol: 'https',
              hostname: 'img.b2bpic.net',
          },
          {
              protocol: 'https',
              hostname: 'freepik.com',
          },
      ],
  }
};

export default nextConfig;
