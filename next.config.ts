import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Image Optimisation ──
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'onsixthrestaurant.co.za',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // For placeholder images during dev
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ── Security Headers ──
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-XSS-Protection',          value: '1; mode=block' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
    ];
  },

  // ── Experimental ──
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
