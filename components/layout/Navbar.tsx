'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-nav)' as never,
          padding: 'var(--space-4) 0',
          transition: 'all var(--ease-normal)',
          background: scrolled ? 'rgba(18,19,22,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.1)' : '1px solid transparent',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="On Sixth Restaurant — Home"
            style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                color: 'var(--gold)',
                letterSpacing: 'var(--tracking-wider)',
                lineHeight: 1,
              }}
            >
              ON SIXTH
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--muted)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
              }}
            >
              Restaurant
            </span>
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
                className={`nav-link hover-underline-gold ${pathname === link.href ? 'active' : ''}`}
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
                color: 'var(--cream)',
                padding: 'var(--space-2)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${mobileOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Mobile logo + close */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-12)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--gold)', letterSpacing: 'var(--tracking-wider)' }}>
            ON SIXTH
          </span>
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
              style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-4xl)',
                fontStyle: 'italic',
                fontWeight: 700,
                color: pathname === link.href ? 'var(--gold)' : 'var(--cream)',
                paddingBlock: 'var(--space-3)',
                borderBottom: '1px solid var(--border)',
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
