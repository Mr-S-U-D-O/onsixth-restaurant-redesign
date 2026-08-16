import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@/styles/design-system.css';
import '@/styles/components.css';
import '@/styles/animations.css';
import './globals.css';
import { buildRestaurantSchema } from '@/lib/schema';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DayNightController from '@/components/ui/DayNightController';
import ScrollReveal from '@/components/ui/ScrollReveal';

const schema = buildRestaurantSchema();

export const metadata: Metadata = {
  metadataBase: new URL('https://onsixthrestaurant.co.za'),
  title: {
    default: 'On Sixth Restaurant | Benoni\'s Premier Dining Destination',
    template: '%s | On Sixth Restaurant',
  },
  description:
    'Award-winning upmarket restaurant in Northmead, Benoni. Voted Best Romantic & Best Upmarket Restaurant in Ekurhuleni. Featuring artisanal sushi, wood-fired pizzaladière, open-plan kitchen & handcrafted cocktails.',
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
  ],
  authors: [{ name: 'On Sixth Restaurant' }],
  creator: 'On Sixth Restaurant',
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://onsixthrestaurant.co.za',
    siteName: 'On Sixth Restaurant',
    title: 'On Sixth Restaurant | Benoni\'s Premier Dining Destination',
    description:
      'Award-winning upmarket restaurant in Northmead, Benoni. Sushi, wood-fired pizzaladière, signature skewers & handcrafted cocktails.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'On Sixth Restaurant — Benoni\'s Premier Dining Destination',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'On Sixth Restaurant | Benoni\'s Best',
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
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
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
    <html lang="en-ZA" suppressHydrationWarning>
      <head>
        <Script
          id="restaurant-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <DayNightController />
        <ScrollReveal />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
