'use client';
import Link from 'next/link';
import { Phone, Mail, MapPin, Navigation } from 'lucide-react';
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

const MAPS_URL = 'https://maps.google.com/?q=On+Sixth+Restaurant+Benoni+Northmead';
const WAZE_URL = 'https://waze.com/ul?ll=-26.1867,28.3089&navigate=yes';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--obsidian)',
        color: 'var(--cream)',
        paddingTop: 'var(--space-32)',
      }}
    >
      <div className="container" style={{ paddingBottom: 'var(--space-20)' }}>
        
        {/* Massive Action Area */}
        <div style={{ marginBottom: 'var(--space-24)', borderBottom: '1px solid var(--slate-deep)', paddingBottom: 'var(--space-20)' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            margin: 0,
            color: 'var(--cream)'
          }}>
            Ready to <br/><span className="text-highlight">Experience?</span>
          </h2>
          <div style={{ marginTop: 'var(--space-10)', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Link href="/reservations" className="btn btn-primary btn-lg" style={{ background: 'var(--cream)', color: 'var(--obsidian)' }}>
              Book Your Table
            </Link>
            <Link href="/menu" className="btn btn-secondary btn-lg" style={{ borderColor: 'var(--slate-border)', color: 'var(--cream)' }}>
              View Menu
            </Link>
          </div>
        </div>

        {/* Clean Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-12)',
            alignItems: 'start',
          }}
        >
          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <OpenStatusBadge />
            </div>
            <nav aria-label="Footer navigation">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover-underline-gold"
                      style={{ fontSize: 'var(--text-lg)', color: 'var(--cream-dim)', transition: 'color var(--ease-fast)', fontWeight: 500 }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
             <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--muted-light)', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                <span style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>Cocoa Bean Centre, Shop A1<br />Cnr 2nd St & 6th Ave, Northmead</span>
              </a>
              <a href="tel:+27114251668" style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--muted-light)', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--teal)', flexShrink: 0 }} aria-hidden="true" />
                <span style={{ fontSize: 'var(--text-sm)' }}>+27 11 425 1668</span>
              </a>
              <a href={`mailto:${RESTAURANT_INFO.email}`} style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--muted-light)', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--teal)', flexShrink: 0 }} aria-hidden="true" />
                <span style={{ fontSize: 'var(--text-sm)' }}>{RESTAURANT_INFO.email}</span>
              </a>
            </address>
          </div>

          {/* Operating Hours */}
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
              <tbody>
                {HOURS_LIST.map((row) => (
                  <tr key={row.days} style={{ borderBottom: '1px solid var(--slate-deep)' }}>
                    <th scope="row" style={{ padding: 'var(--space-3) 0', color: 'var(--muted-light)', fontWeight: 400, textAlign: 'left' }}>{row.days}</th>
                    <td style={{ padding: 'var(--space-3) 0', color: 'var(--cream-dim)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{row.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ borderColor: 'var(--slate-border)', color: 'var(--cream)' }} aria-label="Open in Google Maps">
                <MapPin size={14} /> Maps
              </a>
              <a href={WAZE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ borderColor: 'var(--slate-border)', color: 'var(--cream)' }} aria-label="Open in Waze">
                <Navigation size={14} /> Waze
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Footer Bar */}
      <div style={{ borderTop: '1px solid var(--slate-deep)', paddingBlock: 'var(--space-6)' }}>
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
