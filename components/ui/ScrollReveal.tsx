'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollReveal
 * Observes all elements with .reveal, .reveal-left, .reveal-right
 * and adds .in-view when they enter the viewport.
 * Runs once per mount — safe for SSR.
 */
export default function ScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const selectors = '.reveal, .reveal-left, .reveal-right';
    const elements = document.querySelectorAll<HTMLElement>(selectors);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Unobserve after triggering — runs once
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return null;
}
