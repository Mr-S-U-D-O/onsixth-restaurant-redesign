import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Story & Heritage',
  description:
    'Discover On Sixth\'s story — a tribute to Benoni\'s 19th century gold-rush heritage, combined with 21st century gastronomy. Meet our open kitchen philosophy and culinary journey.',
};

const TIMELINE = [
  {
    year: '1887',
    title: 'Benoni\'s Gold Rush',
    desc: 'The discovery of gold in Ekurhuleni transforms a quiet grassland into a bustling mining town. The spirit of craft, community and the pursuit of excellence is born.',
  },
  {
    year: 'July 2015',
    title: 'On Sixth Opens',
    desc: 'On Sixth Restaurant opens its doors at the Cocoa Bean Centre, Northmead — bringing artisanal cuisine to the heart of Benoni with an open-plan kitchen and a passion for locally-inspired dishes.',
  },
  {
    year: '2019',
    title: 'The Sushi Programme Launches',
    desc: 'Our Japanese-inspired menu expands. The Salmon Sashimi Tower becomes an instant classic — and our most Instagrammed dish to date.',
  },
  {
    year: '2021',
    title: 'Best of Ekurhuleni Awards',
    desc: 'Voted Best Romantic Restaurant and Best Neighbourhood Eatery by thousands of Ekurhuleni readers. A milestone that humbled and energised our entire team.',
  },
  {
    year: '2023',
    title: 'Best Upmarket Restaurant',
    desc: 'Added a third Readers\' Choice Award — Best Upmarket Restaurant in Ekurhuleni — cementing our position as the premier fine-casual dining destination in Benoni.',
  },
  {
    year: 'Today',
    title: '4.8★ & Still Cooking',
    desc: 'Over 1,200 five-star reviews. The same open kitchen. The same devotion to craft. Every dish is a love letter to Benoni and the diners who make this place what it is.',
  },
];

export default function ExperiencePage() {
  return (
    <>
      {/* Cinematic hero */}
      <div
        style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: `
            radial-gradient(ellipse 70% 50% at 30% 60%, rgba(201,122,86,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 60% 70% at 70% 30%, rgba(212,175,55,0.15) 0%, transparent 60%),
            #121316
          `,
        }}
      >
        {/* Sepia-to-colour effect overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, transparent 50%, rgba(201,122,86,0.08) 100%)',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', paddingBlock: 'var(--space-24)' }}>
          <span className="text-subheading" style={{ display: 'block', marginBottom: 'var(--space-5)' }}>
            Rooted in Ekurhuleni&apos;s Golden Era
          </span>
          <h1
            className="text-heading-hero"
            style={{ marginBottom: 'var(--space-5)', maxWidth: '700px', marginInline: 'auto' }}
          >
            Refined for the{' '}
            <em className="text-gradient">Modern Palate</em>
          </h1>
          <span className="divider-gold center" />
        </div>
      </div>

      {/* Dual-column split */}
      <section
        aria-label="Our story and open kitchen philosophy"
        style={{
          background: 'var(--slate-deep)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            maxWidth: 'var(--container-xl)',
            marginInline: 'auto',
          }}
        >
          {/* Left: Heritage */}
          <div
            style={{
              padding: 'var(--space-16) var(--space-10)',
              borderRight: '1px solid var(--border)',
            }}
          >
            <span className="text-subheading" style={{ display: 'block', marginBottom: 'var(--space-5)' }}>
              The Mining Town Heritage
            </span>
            <h2 className="text-heading-section" style={{ marginBottom: 'var(--space-5)', fontSize: 'var(--text-4xl)' }}>
              Walls That Tell Stories
            </h2>
            <span className="divider-gold" style={{ marginBottom: 'var(--space-6)' }} />
            <p className="text-body" style={{ marginBottom: 'var(--space-5)' }}>
              Step inside On Sixth and you&apos;ll see them immediately — authentic mining-era newspaper clippings, sepia photographs, and vintage Benoni memorabilia covering every surface. This isn&apos;t decoration. It&apos;s devotion.
            </p>
            <p className="text-body" style={{ marginBottom: 'var(--space-5)' }}>
              Benoni was built on gold, community, and the pioneering spirit of people who believed in something bigger than themselves. That&apos;s the energy we carry into our kitchen every day.
            </p>
            <p className="text-body">
              Chain restaurants can replicate a menu. They cannot replicate a story. Ours is real, and it&apos;s written on the walls.
            </p>
          </div>

          {/* Right: Open kitchen */}
          <div style={{ padding: 'var(--space-16) var(--space-10)' }}>
            <span className="text-subheading" style={{ display: 'block', marginBottom: 'var(--space-5)' }}>
              The Open Kitchen Philosophy
            </span>
            <h2 className="text-heading-section" style={{ marginBottom: 'var(--space-5)', fontSize: 'var(--text-4xl)' }}>
              Nothing to Hide
            </h2>
            <span className="divider-gold" style={{ marginBottom: 'var(--space-6)' }} />
            <p className="text-body" style={{ marginBottom: 'var(--space-5)' }}>
              Our entire kitchen is open to you. Watch the salmon get sliced. See the pizza dough get stretched over the oblong stone. Watch the cocktails get built layer by layer at the bar.
            </p>
            <p className="text-body" style={{ marginBottom: 'var(--space-5)' }}>
              We believe transparency creates trust. And trust creates loyalty. Over 7 years, our regulars have become family — because they&apos;ve seen exactly how much care goes into every plate.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
              <Link href="/menu" className="btn btn-primary">
                View Our Menu
              </Link>
              <Link href="/reservations" className="btn btn-secondary">
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section
        aria-label="Our history timeline"
        className="section-pad"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="container">
          <div className="section-header reveal" style={{ marginBottom: 'var(--space-12)' }}>
            <span className="text-subheading eyebrow">Our Journey</span>
            <h2 className="text-heading-section">From Gold Rush to Gold Standard</h2>
            <span className="divider-gold" style={{ marginTop: 'var(--space-4)' }} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-8)',
            }}
          >
            {/* Timeline */}
            <div className="timeline reveal-left">
              {TIMELINE.map((item) => (
                <div key={item.year} className="timeline-item">
                  <div className="timeline-item__year">{item.year}</div>
                  <h3 className="timeline-item__title">{item.title}</h3>
                  <p className="timeline-item__desc">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Visual: mining/restaurant atmosphere */}
            <div
              className="reveal-right"
              style={{
                position: 'sticky',
                top: '100px',
                height: 'fit-content',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                background: `
                  radial-gradient(ellipse 70% 60% at 40% 60%, rgba(201,122,86,0.3) 0%, transparent 70%),
                  radial-gradient(ellipse 50% 50% at 70% 30%, rgba(212,175,55,0.2) 0%, transparent 60%),
                  var(--slate-deep)
                `,
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-12)',
                textAlign: 'center',
                minHeight: '400px',
              }}
            >
              <div style={{ fontSize: '80px', marginBottom: 'var(--space-5)' }} aria-hidden="true">⛏️</div>
              <blockquote>
                <p
                  className="text-heading-card"
                  style={{ fontStyle: 'italic', color: 'var(--cream-dim)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-4)' }}
                >
                  &ldquo;The same spirit that drove men to dig for gold in Ekurhuleni drives us to plate every dish with intention.&rdquo;
                </p>
                <footer style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>
                  — The On Sixth Kitchen Team
                </footer>
              </blockquote>

              <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
                {['⭐ 4.8 / 5', '🏆 3× Award Winner', '🍽️ Open Since 2015'].map((badge) => (
                  <span key={badge} className="badge badge-gold">{badge}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef's table / cocktail showcase */}
      <section
        aria-label="Chef's table and cocktails"
        style={{
          background: 'var(--slate-deep)',
          borderTop: '1px solid var(--border)',
          paddingBlock: 'var(--space-16)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="text-subheading" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
            The Bar & Cocktail Programme
          </span>
          <h2 className="text-heading-section" style={{ marginBottom: 'var(--space-5)' }}>
            Handcrafted from the First Pour
          </h2>
          <span className="divider-gold center" style={{ marginBottom: 'var(--space-6)' }} />
          <p
            className="text-body"
            style={{ maxWidth: '560px', marginInline: 'auto', marginBottom: 'var(--space-8)' }}
          >
            Our house-made Limoncello is steeped for 30 days. Our cocktails are built to order, each garnish considered, each measure intentional. The bar at On Sixth is not an afterthought — it&apos;s a destination.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/menu#cocktails" className="btn btn-primary">
              🍸 View Cocktail Menu
            </Link>
            <Link href="/reservations" className="btn btn-secondary">
              Reserve Your Evening
            </Link>
          </div>
        </div>
      </section>

      {/* Responsive fix */}
      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="border-right"] {
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
          }
        }
      `}</style>
    </>
  );
}
