'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/',              label: 'Home' },
  { href: '/menu',          label: 'Menu' },
  { href: '/experience',    label: 'Our Story' },
  { href: '/reservations',  label: 'Reservations' },
  { href: '/contact',       label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Manage mobile menu state (body scroll, escape key, focus trap)
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    
    // Focus first element
    const focusableElements = mobileMenuRef.current?.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
    
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 'var(--z-nav)' as never, pointerEvents: 'none' }}>
        <header
          role="banner"
          style={{
            pointerEvents: 'auto',
            margin: scrolled ? 'var(--space-4) auto' : '0 auto',
            maxWidth: scrolled ? '1200px' : '100%',
            width: scrolled ? 'calc(100% - var(--space-8))' : '100%',
            borderRadius: scrolled ? 'var(--radius-full)' : '0',
            padding: scrolled ? 'var(--space-2) var(--space-6)' : 'var(--space-4) var(--space-8)',
            transition: 'all var(--ease-normal)',
            background: scrolled ? 'rgba(252,252,252,0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            border: scrolled ? '1px solid var(--border)' : '1px solid transparent',
            boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.04)' : 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="On Sixth Restaurant — Home"
              style={{ display: 'flex', alignItems: 'center', height: scrolled ? '36px' : '48px', position: 'relative', zIndex: 10, transition: 'height var(--ease-normal)' }}
            >
              <img src="/logo.svg" alt="" aria-hidden="true" style={{ height: '100%', width: 'auto' }} />
            </Link>

            {/* Desktop Nav */}
            <nav
              aria-label="Main navigation"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-8)',
              }}
              className="desktop-nav"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  style={{
                    color: 'var(--teal)',
                    fontWeight: pathname === link.href ? 600 : 400,
                    borderBottom: pathname === link.href ? '2px solid var(--teal)' : '2px solid transparent',
                    paddingBottom: '2px',
                    transition: 'all 0.2s ease',
                  }}
                  className={pathname === link.href ? 'active' : ''}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Reserve CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <Link
                href="/reservations"
                className="btn btn-primary btn-sm"
                style={{ display: 'none' }}
                id="nav-reserve-btn"
              >
                Reserve a Table
              </Link>

              {/* Mobile hamburger */}
              <button
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  color: 'var(--obsidian)',
                  padding: 'var(--space-2)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`mobile-menu ${mobileOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Mobile logo + close */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-12)' }}>
          <img src="/logo.svg" alt="" aria-hidden="true" style={{ height: '40px', width: 'auto' }} />
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{ color: 'var(--cream)' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile links */}
        <nav aria-label="Mobile navigation links">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-4xl)',
                fontStyle: 'italic',
                fontWeight: 700,
                color: 'var(--teal)',
                textDecoration: pathname === link.href ? 'underline' : 'none',
                paddingBlock: 'var(--space-3)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                animationDelay: `${i * 80}ms`,
              }}
              className={mobileOpen ? 'animate-fade-left' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-8)' }}>
          <Link href="/reservations" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
            Reserve a Table
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          #nav-reserve-btn { display: inline-flex !important; }
          button[aria-label*="menu"] { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
