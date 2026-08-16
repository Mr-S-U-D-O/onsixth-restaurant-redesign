'use client';

import { motion } from 'framer-motion';

const REVIEWS = [
  {
    text: "Honestly the best date night spot in Benoni. The Salmon Sashimi Tower is out of this world — I've been 6 times and it never disappoints.",
    author: 'Megan R.',
    platform: 'Google Reviews',
    stars: 5,
  },
  {
    text: 'The wood-fired Pizzaladière with fig and prosciutto is simply incredible. Love the open kitchen vibe — you can watch everything being made.',
    author: 'Thabo M.',
    platform: 'Google Reviews',
    stars: 5,
  },
  {
    text: 'We celebrated our anniversary here and the atmosphere was perfect. Dark, romantic, great cocktails. Easily the best restaurant in Ekurhuleni.',
    author: 'Sandra & Johan K.',
    platform: 'Facebook Reviews',
    stars: 5,
  },
  {
    text: 'The Limoncello Spritz is something else. Handcrafted on the bar right in front of you. Skewers as a starter, sashimi for mains — perfect evening.',
    author: 'Priya N.',
    platform: 'Google Reviews',
    stars: 5,
  },
  {
    text: 'Our family restaurant since 2018. The staff remember your name, the menu evolves seasonally, and the quality never drops. 10/10 always.',
    author: 'Derek & Family',
    platform: 'TripAdvisor',
    stars: 5,
  },
  {
    text: 'I drove from Johannesburg specifically for the Rainbow Roll. Was absolutely worth every kilometer. Book ahead — it fills up quickly.',
    author: 'Aisha B.',
    platform: 'Google Reviews',
    stars: 5,
  },
];

export default function ReviewsCarousel() {
  const allReviews = [...REVIEWS, ...REVIEWS]; // Duplicate for seamless loop

  return (
    <section
      aria-label="Customer reviews"
      style={{
        position: 'relative',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        paddingBlock: 'var(--space-16)',
        overflow: 'hidden',
      }}
    >
      {/* Asymmetric Header */}
      <div className="container" style={{ marginBottom: 'var(--space-12)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-6)' }}>
          <div>
            <span className="text-subheading eyebrow" style={{ color: 'var(--teal)', display: 'block', marginBottom: 'var(--space-2)' }}>
              What Our Guests Say
            </span>
            <h2 className="text-heading-section" style={{ color: 'var(--obsidian)' }}>
              Over 1,200 Five-Star Moments
            </h2>
          </div>
          <a
            href="https://g.page/r/on-sixth-restaurant"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ whiteSpace: 'nowrap' }}
          >
            Read all on Google ↗
          </a>
        </div>
      </div>

      {/* Hardware Accelerated Infinite Marquee */}
      <div
        className="marquee-container"
        style={{
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
          position: 'relative'
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            display: 'flex',
            gap: 'var(--space-6)',
            paddingInline: 'var(--space-6)',
            width: 'max-content'
          }}
        >
          {allReviews.map((review, i) => (
            <article
              key={i}
              style={{
                width: '380px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                padding: 'var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              role="listitem"
              aria-label={`Review by ${review.author}`}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                  <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--obsidian)' }}>
                    {review.stars}.0 <span style={{ color: 'var(--teal)' }}>★</span>
                  </div>
                </div>
                <p style={{ 
                  color: 'var(--slate-mid)', 
                  fontSize: 'var(--text-base)', 
                  lineHeight: 'var(--leading-relaxed)', 
                  marginBottom: 'var(--space-6)' 
                }}>
                  {review.text}
                </p>
              </div>
              <footer style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ color: 'var(--obsidian)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>{review.author}</div>
                <div style={{ color: 'var(--muted)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>{review.platform}</div>
              </footer>
            </article>
          ))}
        </motion.div>
      </div>
      
      {/* Edge gradient fade masks */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '10%',
        background: 'linear-gradient(90deg, var(--bg-secondary) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: '10%',
        background: 'linear-gradient(270deg, var(--bg-secondary) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />
    </section>
  );
}
