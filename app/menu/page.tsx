import type { Metadata } from 'next';
import MenuPageClient from '@/components/menu/MenuPageClient';
import { buildMenuSchema, buildBreadcrumbSchema } from '@/lib/schema';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Interactive Digital Menu',
  description:
    'Browse the full On Sixth menu — artisanal sushi & sashimi, oblong wood-fired pizzaladière, signature skewers, mains, desserts & handcrafted cocktails. Filter by vegan, gluten-free and more.',
  alternates: {
    canonical: 'https://onsixthrestaurant.co.za/menu',
  },
  openGraph: {
    title: 'On Sixth Menu | Sushi, Pizza & More',
    description: 'Full interactive menu with dietary filters — no PDFs, no downloads.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'On Sixth Restaurant Menu' }],
  },
};

export default function MenuPage() {
  const menuSchema = buildMenuSchema();
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://onsixthrestaurant.co.za' },
    { name: 'Menu', url: 'https://onsixthrestaurant.co.za/menu' },
  ]);

  return (
    <>
      <Script
        id="menu-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Page Hero */}
      <div
        style={{
          paddingTop: 'var(--space-32)',
          paddingBottom: 'var(--space-16)',
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '600px' }}>
            <h1 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(3rem, 8vw, 5rem)', 
                lineHeight: 1,
                color: 'var(--obsidian)',
                marginBottom: 'var(--space-6)',
                letterSpacing: 'var(--tracking-tight)'
              }}
            >
              Our Menu
            </h1>
            <p
              style={{ 
                fontSize: 'var(--text-lg)',
                color: 'var(--slate-mid)',
                lineHeight: 'var(--leading-relaxed)'
              }}
            >
              Prepared fresh in our open kitchen. Filter by dietary preference and click any dish to see chef&apos;s notes and wine pairings.
            </p>
          </div>
        </div>
      </div>

      <MenuPageClient />
    </>
  );
}
