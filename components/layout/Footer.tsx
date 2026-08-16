'use client';
import Link from 'next/link';
import { Phone, Mail, MapPin, Navigation, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/schema';
import OpenStatusBadge from '@/components/ui/OpenStatusBadge';

const QUICK_LINKS = [
  { href: '/menu',         label: 'Digital Menu' },
  { href: '/experience',   label: 'Our Story' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/contact',      label: 'Contact & Location' },
];

const HOURS_LIST = [
  { days: 'Monday – Thursday', hours: '12:00 – 21:00' },
  { days: 'Friday & Saturday',  hours: '12:00 – 22:00' },
  { days: 'Sunday',             hours: '12:00 – 18:00' },
];

const WHATSAPP_URL = 'https://wa.me/27114251668?text=Hi%20On%20Sixth%2C%20I%20would%20like%20to%20make%20a%20reservation%20%F0%9F%8D%BD%EF%B8%8F';
const MAPS_URL = 'https://maps.google.com/?q=On+Sixth+Restaurant+Benoni+Northmead';
const WAZE_URL = 'https://waze.com/ul?ll=-26.1867,28.3089&navigate=yes';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--slate-deep)',
        color: 'var(--cream)',
        paddingTop: 'var(--space-24)',
      }}
    >
      <div className="container" style={{ paddingBottom: 'var(--space-16)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-16)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Massive Monolithic Typography */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                lineHeight: 0.9,
                color: 'var(--gold)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-tight)',
              }}
            >
              On Sixth<br />
              <span style={{ color: 'var(--cream-dim)' }}>Restaurant</span>
            </div>
            
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--muted-light)',
                maxWidth: '400px',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              Where craft meets heritage. Benoni&apos;s award-winning dining destination.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
              <OpenStatusBadge />
            </div>
          </div>

          {/* Right Column: Structured Information */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-12)',
            }}
          >
            {/* Quick Links & Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              <nav aria-label="Footer navigation">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {QUICK_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="hover-underline-gold"
                        style={{ fontSize: 'var(--text-base)', color: 'var(--cream-dim)', transition: 'color var(--ease-fast)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--cream-dim)')}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--muted-light)', alignItems: 'flex-start' }}>
                  <MapPin size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                  <span style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>Cocoa Bean Centre, Shop A1<br />Cnr 2nd St & 6th Ave, Northmead</span>
                </a>
                <a href="tel:+27114251668" style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--muted-light)', alignItems: 'center' }}>
                  <Phone size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} aria-hidden="true" />
                  <span style={{ fontSize: 'var(--text-sm)' }}>+27 11 425 1668</span>
                </a>
                <a href={`mailto:${RESTAURANT_INFO.email}`} style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--muted-light)', alignItems: 'center' }}>
                  <Mail size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} aria-hidden="true" />
                  <span style={{ fontSize: 'var(--text-sm)' }}>{RESTAURANT_INFO.email}</span>
                </a>
              </address>
            </div>

            {/* Operating Hours */}
            <div>
              <div style={{ color: 'var(--muted)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>Operating Hours</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
                <tbody>
                  {HOURS_LIST.map((row) => (
                    <tr key={row.days} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <th scope="row" style={{ padding: 'var(--space-3) 0', color: 'var(--muted-light)', fontWeight: 400, textAlign: 'left' }}>{row.days}</th>
                      <td style={{ padding: 'var(--space-3) 0', color: 'var(--cream-dim)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" aria-label="Open in Google Maps">
                  <MapPin size={14} /> Maps
                </a>
                <a href={WAZE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" aria-label="Open in Waze">
                  <Navigation size={14} /> Waze
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Footer Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingBlock: 'var(--space-6)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-6)', color: 'var(--muted)', fontSize: 'var(--text-xs)' }}>
            <span>© {currentYear} On Sixth Restaurant.</span>
            <Link href="/privacy" style={{ textDecoration: 'underline' }}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
