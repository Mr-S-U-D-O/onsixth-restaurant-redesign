import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/schema';
import OpenStatusBadge from '@/components/ui/OpenStatusBadge';

const QUICK_LINKS = [
  { href: '/',             label: 'Home' },
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

const WHATSAPP_URL =
  'https://wa.me/27114251668?text=Hi%20On%20Sixth%2C%20I%20would%20like%20to%20make%20a%20reservation%20%F0%9F%8D%BD%EF%B8%8F';
const MAPS_URL =
  'https://maps.google.com/?q=On+Sixth+Restaurant+Benoni+Northmead';
const WAZE_URL =
  'https://waze.com/ul?ll=-26.1867,28.3089&navigate=yes';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--slate-deep)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Main footer grid */}
      <div
        className="container"
        style={{
          paddingTop: 'var(--space-16)',
          paddingBottom: 'var(--space-12)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--space-10)',
        }}
      >
        {/* Brand column */}
        <div>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              color: 'var(--gold)',
              letterSpacing: 'var(--tracking-wider)',
              marginBottom: 'var(--space-2)',
            }}
          >
            ON SIXTH
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--muted)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-5)',
            }}
          >
            Restaurant
          </span>
          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-light)',
              lineHeight: 'var(--leading-relaxed)',
              maxWidth: '280px',
            }}
          >
            Where craft meets heritage. Benoni&apos;s award-winning dining destination — rooted in Ekurhuleni&apos;s golden era, refined for the modern palate.
          </p>

          {/* Awards mini */}
          <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {['⭐ 4.8/5', '🏆 Best Upmarket', '💍 Best Romantic'].map((award) => (
              <span key={award} className="badge badge-gold" style={{ fontSize: '10px' }}>
                {award}
              </span>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xs)',
              color: 'var(--gold)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-5)',
            }}
          >
            Navigate
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover-underline-gold"
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-light)',
                    transition: 'color var(--ease-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cream)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-light)')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xs)',
              color: 'var(--gold)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-5)',
            }}
          >
            Contact
          </h3>
          <ul className="contact-list" style={{ gap: 'var(--space-4)' }}>
            <li className="contact-item">
              <div className="contact-item__icon" aria-hidden="true">
                <MapPin size={16} />
              </div>
              <div>
                <div className="contact-item__label">Address</div>
                <div className="contact-item__value" style={{ fontSize: 'var(--text-sm)' }}>
                  Cocoa Bean Centre, Shop A1<br />
                  Cnr 2nd St &amp; 6th Ave, Northmead
                </div>
              </div>
            </li>
            <li className="contact-item">
              <div className="contact-item__icon" aria-hidden="true">
                <Phone size={16} />
              </div>
              <div>
                <div className="contact-item__label">Phone</div>
                <div className="contact-item__value">
                  <a href="tel:+27114251668" style={{ fontSize: 'var(--text-sm)' }}>
                    +27 11 425 1668
                  </a>
                </div>
              </div>
            </li>
            <li className="contact-item">
              <div className="contact-item__icon" aria-hidden="true">
                <Mail size={16} />
              </div>
              <div>
                <div className="contact-item__label">Email</div>
                <div className="contact-item__value">
                  <a href={`mailto:${RESTAURANT_INFO.email}`} style={{ fontSize: 'var(--text-sm)' }}>
                    {RESTAURANT_INFO.email}
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Hours + status */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xs)',
              color: 'var(--gold)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-5)',
            }}
          >
            Hours
          </h3>

          {/* Live status badge */}
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <OpenStatusBadge />
          </div>

          <table className="hours-table" aria-label="Restaurant operating hours">
            <tbody>
              {HOURS_LIST.map((row) => (
                <tr key={row.days}>
                  <td style={{ color: 'var(--muted-light)' }}>{row.days}</td>
                  <td>{row.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Direction buttons */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-5)', flexWrap: 'wrap' }}>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              aria-label="Open in Google Maps"
            >
              <MapPin size={14} />
              Google Maps
            </a>
            <a
              href={WAZE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label="Open in Waze"
            >
              <Navigation size={14} />
              Waze
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          padding: 'var(--space-5) 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>
            © {currentYear} On Sixth Restaurant. All rights reserved.
          </p>

          {/* WhatsApp quick link */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
            aria-label="Book via WhatsApp"
          >
            <MessageCircle size={14} />
            Book via WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
