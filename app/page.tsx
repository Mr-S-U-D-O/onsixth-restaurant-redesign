import Link from 'next/link';
import { ChevronDown, Star, Award, Heart, MapPin } from 'lucide-react';
import ReviewsCarousel from '@/components/home/ReviewsCarousel';

// ─── Hero Section ───────────────────────────────────────────────
function Hero() {
  return (
    <section
      aria-label="Welcome to On Sixth Restaurant"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Ambient gradient background (video placeholder) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,122,86,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 20% 80%, rgba(212,175,55,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 80% 20%, rgba(212,175,55,0.08) 0%, transparent 50%),
            #121316
          `,
        }}
      />

      {/* Ambient moving particles */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              borderRadius: '50%',
              background: i % 2 === 0
                ? 'rgba(212,175,55,0.04)'
                : 'rgba(201,122,86,0.04)',
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animation: `floatUp ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Hero overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          paddingTop: 'var(--space-24)',
          paddingBottom: 'var(--space-16)',
        }}
      >
        {/* Eyebrow */}
        <div className="animate-fade-up" style={{ marginBottom: 'var(--space-6)' }}>
          <span className="text-subheading">
            Northmead, Benoni · Est. July 2015
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="text-heading-hero animate-fade-up delay-200"
          style={{ marginBottom: 'var(--space-6)', maxWidth: '800px', marginInline: 'auto' }}
        >
          Where Craft Meets Heritage.{' '}
          <em className="text-gradient">It&apos;s All About Taste.</em>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-body animate-fade-up delay-300"
          style={{
            fontSize: 'var(--text-lg)',
            maxWidth: '540px',
            margin: '0 auto var(--space-10)',
            color: 'var(--cream-dim)',
          }}
        >
          Award-winning sushi, wood-fired pizzaladière & handcrafted cocktails —
          served in Benoni&apos;s most atmospheric open-plan kitchen.
        </p>

        {/* Dual CTA */}
        <div
          className="animate-fade-up delay-400"
          style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/menu" className="btn btn-primary btn-lg">
            Explore Digital Menu
          </Link>
          <Link href="/reservations" className="btn btn-secondary btn-lg">
            Reserve a Table
          </Link>
        </div>

        {/* Scroll cue */}
        <div
          className="animate-float"
          style={{
            marginTop: 'var(--space-16)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-2)',
            color: 'var(--muted)',
          }}
          aria-hidden="true"
        >
          <span style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase' }}>
            Discover
          </span>
          <ChevronDown size={18} />
        </div>
      </div>
    </section>
  );
}

// ─── Awards Strip ───────────────────────────────────────────────
const AWARDS = [
  { icon: '🏆', label: 'Best Upmarket Restaurant', sub: 'Best of Ekurhuleni' },
  { icon: '💍', label: 'Best Romantic Restaurant', sub: 'Best of Ekurhuleni' },
  { icon: '🏡', label: 'Best Neighbourhood Eatery', sub: 'Best of Ekurhuleni' },
  { icon: '⭐', label: '4.8 / 5 Stars', sub: 'Across 1,200+ Reviews' },
];

function AwardsStrip() {
  return (
    <section aria-label="Awards and accolades" className="awards-strip">
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-10)',
            flexWrap: 'wrap',
          }}
        >
          {AWARDS.map((award, i) => (
            <div key={i} className="award-item">
              <div className="award-item__icon" aria-hidden="true">{award.icon}</div>
              <div className="award-item__label">{award.label}</div>
              <div className="award-item__sub">{award.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Culinary Trifecta ──────────────────────────────────────────
const TRIFECTA = [
  {
    id: 'sushi',
    emoji: '🍣',
    title: 'Sushi & Sashimi',
    desc: 'Premium-grade Norwegian salmon, tuna & yellowtail. Sliced fresh in our open kitchen — no shortcuts, ever.',
    href: '/menu#sushi',
    gradient: 'linear-gradient(135deg, #1a1200 0%, #2d1f00 100%)',
    accentColor: '#D4AF37',
  },
  {
    id: 'pizza',
    emoji: '🍕',
    title: 'Oblong Pizzaladière',
    desc: 'Our signature wood-fired thin crust. Stretched long, fired hot, dressed with intention. Vegan base available.',
    href: '/menu#pizza',
    gradient: 'linear-gradient(135deg, #1a0800 0%, #2d1200 100%)',
    accentColor: '#C97A56',
  },
  {
    id: 'skewers',
    emoji: '🍢',
    title: 'Signature Skewers',
    desc: 'Grilled halloumi, chorizo, peppadews & balsamic glaze. Our most-ordered starter for seven years running.',
    href: '/menu#starters',
    gradient: 'linear-gradient(135deg, #0a1a10 0%, #122a1a 100%)',
    accentColor: '#4ade80',
  },
];

function CulinaryTrifecta() {
  return (
    <section
      aria-label="Our signature dishes"
      className="section-pad"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="container">
        <div className="section-header center reveal" style={{ marginBottom: 'var(--space-12)' }}>
          <span className="text-subheading eyebrow">The Art of Taste</span>
          <h2 className="text-heading-section">Three Pillars of Our Kitchen</h2>
          <span className="divider-gold center" style={{ marginTop: 'var(--space-4)' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {TRIFECTA.map((item, i) => (
            <Link
              key={item.id}
              href={item.href}
              className={`culinary-card reveal delay-${(i + 1) * 200}`}
              aria-label={`Explore ${item.title}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="culinary-card__bg"
                style={{ background: item.gradient }}
                aria-hidden="true"
              >
                {/* Large emoji as visual placeholder */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '120px',
                    opacity: 0.15,
                    filter: 'grayscale(0.3)',
                  }}
                >
                  {item.emoji}
                </div>
              </div>
              <div className="culinary-card__overlay" aria-hidden="true" />
              <div className="culinary-card__content">
                <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }} aria-hidden="true">
                  {item.emoji}
                </div>
                <h3
                  className="text-heading-card"
                  style={{ color: item.accentColor, marginBottom: 'var(--space-3)' }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--cream-dim)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-4)' }}>
                  {item.desc}
                </p>
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    color: item.accentColor,
                    letterSpacing: 'var(--tracking-wide)',
                    textTransform: 'uppercase',
                  }}
                >
                  View on Menu →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Open Kitchen Theatre ───────────────────────────────────────
function OpenKitchenTheatre() {
  return (
    <section
      aria-label="Our open kitchen"
      style={{
        background: 'var(--slate-deep)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="kitchen-split">
        {/* Visual side */}
        <div
          aria-hidden="true"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 30% 60%, rgba(201,122,86,0.3) 0%, transparent 70%),
              radial-gradient(ellipse 50% 60% at 70% 30%, rgba(212,175,55,0.2) 0%, transparent 60%),
              #1C1E24
            `,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '500px',
          }}
        >
          <div style={{ textAlign: 'center', opacity: 0.4 }}>
            <div style={{ fontSize: '120px', lineHeight: 1 }}>🔥</div>
            <div style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '16px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Open Kitchen
            </div>
          </div>
        </div>

        {/* Copy side */}
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 'var(--space-16) var(--space-8)',
          }}
        >
          <div className="reveal-right">
            <span className="text-subheading" style={{ display: 'block', marginBottom: 'var(--space-5)' }}>
              Culinary Theatre
            </span>
            <h2 className="text-heading-section" style={{ marginBottom: 'var(--space-5)' }}>
              Freshly Prepared in Full View
            </h2>
            <span className="divider-gold" style={{ marginBottom: 'var(--space-6)' }} />
            <p className="text-body" style={{ marginBottom: 'var(--space-4)' }}>
              Our open-plan kitchen is the beating heart of On Sixth. Watch as our chefs slice fresh salmon, stretch oblong pizza dough, and flame-grill skewers — all within arm&apos;s reach.
            </p>
            <p className="text-body" style={{ marginBottom: 'var(--space-8)' }}>
              We believe the best food should be seen, smelled, and heard before it arrives at your table. No hidden kitchens, no mystery — just devotion to the art of taste.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <Link href="/experience" className="btn btn-secondary">
                Our Story
              </Link>
              <Link href="/reservations" className="btn btn-ghost">
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Heritage Teaser ────────────────────────────────────────────
function HeritageTeaser() {
  return (
    <section
      aria-label="Our heritage"
      className="section-pad"
      style={{
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="reveal">
          <span className="text-subheading" style={{ display: 'block', marginBottom: 'var(--space-5)' }}>
            Since 1887 in Spirit
          </span>
          <h2
            className="text-heading-section"
            style={{ marginBottom: 'var(--space-5)', maxWidth: '700px', marginInline: 'auto' }}
          >
            19th Century Mining Nostalgia,{' '}
            <em className="text-gradient">21st Century Gastronomy</em>
          </h2>
          <span className="divider-gold center" style={{ marginBottom: 'var(--space-6)' }} />
          <p
            className="text-body"
            style={{ maxWidth: '580px', marginInline: 'auto', marginBottom: 'var(--space-8)' }}
          >
            Our walls are lined with authentic Benoni mining-era newspaper clippings and sepia photographs — a tribute to the gold-rush spirit that built this town. Come for the food, stay for the stories.
          </p>
          <Link href="/experience" className="btn btn-primary">
            Discover Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page Assembly ──────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <AwardsStrip />
      <CulinaryTrifecta />
      <OpenKitchenTheatre />
      <HeritageTeaser />
      <ReviewsCarousel />
    </>
  );
}
