import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/design-system.css';
import '@/styles/components.css';
import '@/styles/animations.css';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import FloatingWidget from '@/components/ui/FloatingWidget';
import Preloader from '@/components/ui/Preloader';
import { buildRestaurantSchema } from '@/lib/schema';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  preload: false,
});

const schema = buildRestaurantSchema();

export const metadata: Metadata = {
  metadataBase: new URL('https://onsixthrestaurant.co.za'),
  title: {
    default: "On Sixth Restaurant | Benoni's Premier Dining Destination",
    template: '%s | On Sixth Restaurant',
  },
  description:
    "Award-winning upmarket restaurant in Northmead, Benoni. Voted Best Romantic & Best Upmarket Restaurant in Ekurhuleni. Artisanal sushi, wood-fired pizzaladière, open-plan kitchen & handcrafted cocktails.",
  keywords: [
    'best restaurant benoni',
    'sushi northmead',
    'restaurant ekurhuleni',
    'upmarket dining benoni',
    'romantic restaurant benoni',
    'pizza benoni',
    'on sixth restaurant',
    'cocoa bean centre restaurant',
    'sashimi benoni',
    'fine dining benoni',
    'wood fired pizza benoni',
    'open kitchen restaurant benoni',
    'cocktail bar benoni',
    'best sushi ekurhuleni',
    'on sixth',
    'book restaurant benoni',
  ],
  authors: [{ name: 'On Sixth Restaurant', url: 'https://onsixthrestaurant.co.za' }],
  creator: 'On Sixth Restaurant',
  publisher: 'On Sixth Restaurant',
  category: 'restaurant',
  alternates: {
    canonical: 'https://onsixthrestaurant.co.za',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://onsixthrestaurant.co.za',
    siteName: 'On Sixth Restaurant',
    title: "On Sixth Restaurant | Benoni's Premier Dining Destination",
    description:
      "Award-winning upmarket restaurant in Northmead, Benoni. Sushi, wood-fired pizzaladière, signature skewers & handcrafted cocktails.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "On Sixth Restaurant — Benoni's Premier Dining Destination",
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "On Sixth Restaurant | Benoni's Best",
    description: 'Award-winning dining in Northmead, Benoni. Sushi, pizza, cocktails & more.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-logo.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/favicon-logo.png',
    shortcut: '/favicon-logo.png',
  },
  verification: {
    google: 'on-sixth-restaurant-google-site-verification',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#121316',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA" className={`${outfit.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        <Script
          id="restaurant-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          strategy="beforeInteractive"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="geo.region" content="ZA-GP" />
        <meta name="geo.placename" content="Benoni, Ekurhuleni" />
        <meta name="geo.position" content="-26.1867;28.3089" />
        <meta name="ICBM" content="-26.1867, 28.3089" />
      </head>
      <body>
        {/* Skip to main content — accessibility */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Preloader />
        <ScrollReveal />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingWidget />
      </body>
    </html>
  );
}
