import type { NextConfig } from 'next';

/**
 * Next.js configuration for Vercel deployment
 * Use this configuration when deploying to Vercel or other platforms that support SSR
 *
 * To use this configuration:
 * 1. Rename this file to next.config.ts
 * 2. Rename the current next.config.ts to next.config.static.ts
 */

const nextConfig: NextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Configure image domains for optimization (Vercel supports dynamic optimization)
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Production optimizations
  compress: true,

  // Disable X-Powered-By header
  poweredByHeader: false,

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'ORION',
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
