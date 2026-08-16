import type { Metadata } from 'next';
import MenuPageClient from '@/components/menu/MenuPageClient';
import { buildMenuSchema, buildBreadcrumbSchema } from '@/lib/schema';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Interactive Digital Menu',
  description:
    'Browse the full On Sixth menu — artisanal sushi & sashimi, oblong wood-fired pizzaladière, signature skewers, mains, desserts & handcrafted cocktails. Filter by vegan, gluten-free and more.',
  openGraph: {
    title: 'On Sixth Menu | Sushi, Pizza & More',
    description: 'Full interactive menu with dietary filters — no PDFs, no downloads.',
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
          paddingTop: 'var(--space-24)',
          paddingBottom: 'var(--space-10)',
          background: 'var(--slate-deep)',
          borderBottom: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <span className="text-subheading" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
            Freshly Updated · No PDFs
          </span>
          <h1 className="text-heading-section" style={{ marginBottom: 'var(--space-4)' }}>
            Our Menu
          </h1>
          <span className="divider-gold center" />
          <p
            className="text-body"
            style={{ marginTop: 'var(--space-5)', maxWidth: '480px', marginInline: 'auto' }}
          >
            Everything on this page is prepared fresh in our open kitchen. Filter by dietary preference and click any dish to see chef&apos;s notes and wine pairings.
          </p>
        </div>
      </div>

      <MenuPageClient />
    </>
  );
}
