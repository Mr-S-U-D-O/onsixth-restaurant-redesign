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
        hostname: 'images.unsplash.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ── Compression ──
  compress: true,

  // ── Security Headers + Caching ──
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
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
      // Long-term caching for static assets
      {
        source: '/dishes/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:file(.*\\.(?:jpg|jpeg|png|gif|svg|webp|avif|mp4|woff2|woff|ttf))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // API and HTML: short cache
      {
        source: '/((?!_next/static|_next/image|favicon|dishes).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },

  // ── Redirects (www → non-www) ──
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.onsixthrestaurant.co.za' }],
        destination: 'https://onsixthrestaurant.co.za/:path*',
        permanent: true,
      },
    ];
  },

  // ── Experimental ──
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // ── Power user: output standalone for Docker/edge ──
  // output: 'standalone', // Uncomment for Docker deployments
};

export default nextConfig;
