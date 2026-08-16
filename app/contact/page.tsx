import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, Navigation, Car } from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/schema';
import OpenStatusBadge from '@/components/ui/OpenStatusBadge';

export const metadata: Metadata = {
  title: 'Contact & Location',
  description:
    'Find On Sixth Restaurant at the Cocoa Bean Centre, Northmead, Benoni. Call +27 11 425 1668 or book via WhatsApp. Open 7 days a week.',
};

const HOURS_ROWS = [
  { days: 'Monday',   hours: '12:00 – 21:00', dayIndex: 1 },
  { days: 'Tuesday',  hours: '12:00 – 21:00', dayIndex: 2 },
  { days: 'Wednesday',hours: '12:00 – 21:00', dayIndex: 3 },
  { days: 'Thursday', hours: '12:00 – 21:00', dayIndex: 4 },
  { days: 'Friday',   hours: '12:00 – 22:00', dayIndex: 5 },
  { days: 'Saturday', hours: '12:00 – 22:00', dayIndex: 6 },
  { days: 'Sunday',   hours: '12:00 – 18:00', dayIndex: 0 },
];

const WHATSAPP_URL =
  'https://wa.me/27114251668?text=Hi%20On%20Sixth%2C%20I%20have%20an%20enquiry%20%F0%9F%8D%BD%EF%B8%8F';
const MAPS_URL =
  'https://maps.google.com/?q=On+Sixth+Restaurant+Cocoa+Bean+Centre+Northmead+Benoni';
const WAZE_URL =
  'https://waze.com/ul?ll=-26.1867,28.3089&navigate=yes';
const UBER_URL =
  `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=-26.1867&dropoff[longitude]=28.3089&dropoff[nickname]=On+Sixth+Restaurant`;

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <div
        style={{
          paddingTop: 'var(--space-24)',
          paddingBottom: 'var(--space-10)',
          background: 'var(--slate-deep)',
          borderBottom: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <span className="text-subheading" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
            We&apos;d Love to See You
          </span>
          <h1 className="text-heading-section" style={{ marginBottom: 'var(--space-4)' }}>
            Find Us
          </h1>
          <span className="divider-gold center" />
        </div>
      </div>

      {/* Main content */}
      <div
        className="container"
        style={{
          paddingBlock: 'var(--space-16)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-10)',
          alignItems: 'start',
        }}
      >
        {/* LEFT: Info column */}
        <div>
          {/* Live status */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <OpenStatusBadge />
          </div>

          {/* Contact items */}
          <ul className="contact-list" style={{ marginBottom: 'var(--space-8)' }}>
            <li className="contact-item">
              <div className="contact-item__icon" aria-hidden="true">
                <MapPin size={18} />
              </div>
              <div>
                <div className="contact-item__label">Address</div>
                <div className="contact-item__value">
                  Cocoa Bean Centre, Shop A1<br />
                  Cnr 2nd St &amp; 6th Ave, Northmead<br />
                  Benoni, Ekurhuleni, 1501
                </div>
              </div>
            </li>

            <li className="contact-item">
              <div className="contact-item__icon" aria-hidden="true">
                <Phone size={18} />
              </div>
              <div>
                <div className="contact-item__label">Call Us</div>
                <div className="contact-item__value">
                  <a href="tel:+27114251668">+27 11 425 1668</a>
                </div>
              </div>
            </li>

            <li className="contact-item">
              <div className="contact-item__icon" aria-hidden="true">
                <Mail size={18} />
              </div>
              <div>
                <div className="contact-item__label">Email</div>
                <div className="contact-item__value">
                  <a href={`mailto:${RESTAURANT_INFO.email}`}>{RESTAURANT_INFO.email}</a>
                </div>
              </div>
            </li>
          </ul>

          {/* Hours table */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xs)',
              color: 'var(--gold)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-4)',
            }}
          >
            Operating Hours
          </h2>
          <table className="hours-table" aria-label="Restaurant operating hours" style={{ marginBottom: 'var(--space-8)' }}>
            <tbody>
              {HOURS_ROWS.map((row) => (
                <tr key={row.days}>
                  <td>{row.days}</td>
                  <td>{row.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Direction buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              <MapPin size={14} /> Google Maps
            </a>
            <a href={WAZE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              <Navigation size={14} /> Waze
            </a>
            <a href={UBER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <Car size={14} /> Uber
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>

        {/* RIGHT: Map + booking CTA */}
        <div>
          {/* Mapbox embed (dark themed) */}
          <div
            className="map-container"
            style={{ marginBottom: 'var(--space-6)' }}
            aria-label="Map showing On Sixth Restaurant location"
          >
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.1234567890!2d28.3089!3d-26.1867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDExJzEyLjEiUyAyOMKwMTgnMzIuMSJF!5e0!3m2!1sen!2sza!4v1234567890!5m2!1sen!2sza`}
              width="100%"
              height="400"
              style={{ border: 'none', filter: 'invert(90%) hue-rotate(180deg)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="On Sixth Restaurant Location Map"
            />
          </div>

          {/* Book CTA card */}
          <div
            className="glass"
            style={{
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>🍽️</div>
            <h3 className="text-heading-card" style={{ marginBottom: 'var(--space-2)' }}>
              Ready to Book?
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-light)', marginBottom: 'var(--space-5)' }}>
              Reserve your table online or confirm instantly via WhatsApp.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/reservations" className="btn btn-primary">
                Book Online
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive stacking */}
      <style jsx>{`
        @media (max-width: 900px) {
          .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
