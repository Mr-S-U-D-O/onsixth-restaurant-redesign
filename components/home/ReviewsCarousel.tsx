'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REVIEWS = [
  {
    text: "Honestly the best date night spot in Benoni. The <span class='text-highlight'>Salmon Sashimi Tower</span> is out of this world — I've been 6 times and it never disappoints.",
    author: 'Megan R.',
    platform: 'Google Reviews',
    stars: 5,
  },
  {
    text: "The wood-fired <span class='text-highlight'>Pizzaladière</span> with fig and prosciutto is simply incredible. Love the open kitchen vibe — you can watch everything being made.",
    author: 'Thabo M.',
    platform: 'Google Reviews',
    stars: 5,
  },
  {
    text: "We celebrated our anniversary here and the atmosphere was perfect. Dark, romantic, great cocktails. Easily the <span class='text-highlight'>best restaurant in Ekurhuleni.</span>",
    author: 'Sandra & Johan K.',
    platform: 'Facebook Reviews',
    stars: 5,
  },
  {
    text: "The <span class='text-highlight'>Limoncello Spritz</span> is something else. Handcrafted on the bar right in front of you. Skewers as a starter, sashimi for mains — perfect evening.",
    author: 'Priya N.',
    platform: 'Google Reviews',
    stars: 5,
  }
];

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % REVIEWS.length);
  const prev = () => setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  return (
    <section
      aria-label="Customer reviews"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        paddingBlock: 'var(--space-32)',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-12)' }} className="lg:grid-cols-12">
          
          {/* Left: Giant Typographic Quote */}
          <div className="lg:col-span-8" style={{ position: 'relative', minHeight: '350px' }}>
            <span aria-hidden="true" style={{ 
              position: 'absolute', 
              top: '-40px', 
              left: '-20px', 
              fontSize: '12rem', 
              color: 'var(--border)', 
              fontFamily: 'var(--font-heading)',
              lineHeight: 1,
              opacity: 0.5,
              zIndex: 0
            }}>
              "
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <h3 
                  className="text-heading-section"
                  style={{ 
                    color: 'var(--obsidian)', 
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    fontStyle: 'normal'
                  }}
                  dangerouslySetInnerHTML={{ __html: REVIEWS[index].text }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Author & Nav */}
          <div className="lg:col-span-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 'var(--space-4)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ marginBottom: 'var(--space-8)' }}
              >
                <div style={{ display: 'flex', gap: '2px', color: 'var(--teal)', fontSize: '1.5rem', marginBottom: 'var(--space-4)' }}>
                  ★★★★★
                </div>
                <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--obsidian)', marginBottom: 'var(--space-1)' }}>
                  {REVIEWS[index].author}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', color: 'var(--muted)' }}>
                  {REVIEWS[index].platform}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <button 
                onClick={prev}
                aria-label="Previous review"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--obsidian)')}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                ←
              </button>
              <button 
                onClick={next}
                aria-label="Next review"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--obsidian)')}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .lg\\:grid-cols-12 {
          display: grid;
        }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-12 {
            grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
          }
          .lg\\:col-span-8 {
            grid-column: span 8 / span 8;
          }
          .lg\\:col-span-4 {
            grid-column: span 4 / span 4;
            padding-left: var(--space-12);
          }
        }
      `}</style>
    </section>
  );
}
