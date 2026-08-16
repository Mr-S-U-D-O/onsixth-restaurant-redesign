'use client';

import { useEffect, useRef } from 'react';

const REVIEWS = [
  {
    text: 'Honestly the best date night spot in Benoni. The Salmon Sashimi Tower is out of this world — I've been 6 times and it never disappoints.',
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
  const trackRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animFrame: number;
    let scrollPos = 0;
    const speed = 0.5;

    const tick = () => {
      scrollPos += speed;
      if (scrollPos >= track.scrollWidth / 2) scrollPos = 0;
      track.scrollLeft = scrollPos;
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);

    // Pause on hover
    const pause = () => cancelAnimationFrame(animFrame);
    const resume = () => { animFrame = requestAnimationFrame(tick); };
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', resume);

    return () => {
      cancelAnimationFrame(animFrame);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
      track.removeEventListener('touchstart', pause);
      track.removeEventListener('touchend', resume);
    };
  }, []);

  const allReviews = [...REVIEWS, ...REVIEWS]; // Duplicate for seamless loop

  return (
    <section
      aria-label="Customer reviews"
      style={{
        background: 'var(--slate-deep)',
        borderTop: '1px solid var(--border)',
        paddingBlock: 'var(--space-16)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div className="container" style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
        <span className="text-subheading" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
          What Our Guests Say
        </span>
        <h2 className="text-heading-section">
          Over 1,200 Five-Star Moments
        </h2>
        <span className="divider-gold center" style={{ marginTop: 'var(--space-4)' }} />
      </div>

      {/* Scrolling strip */}
      <div
        ref={trackRef}
        className="reviews-track"
        style={{
          paddingInline: 'var(--space-6)',
          cursor: 'grab',
          userSelect: 'none',
        }}
        role="list"
        aria-label="Customer review carousel"
      >
        {allReviews.map((review, i) => (
          <article
            key={i}
            className="review-card"
            role="listitem"
            aria-label={`Review by ${review.author}`}
          >
            <div className="review-card__stars" aria-label={`${review.stars} out of 5 stars`}>
              {[...Array(review.stars)].map((_, j) => (
                <span key={j} aria-hidden="true">★</span>
              ))}
            </div>
            <blockquote>
              <p className="review-card__text">&ldquo;{review.text}&rdquo;</p>
            </blockquote>
            <footer>
              <div className="review-card__author">{review.author}</div>
              <div className="review-card__platform">{review.platform}</div>
            </footer>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
        <a
          href="https://g.page/r/on-sixth-restaurant"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm"
        >
          Read all reviews on Google ↗
        </a>
      </div>
    </section>
  );
}
