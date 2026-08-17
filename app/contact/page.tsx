import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, Navigation, Car, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/schema';
import OpenStatusBadge from '@/components/ui/OpenStatusBadge';

export const metadata: Metadata = {
  title: 'Contact & Location',
  description:
    'Find On Sixth Restaurant at the Cocoa Bean Centre, Northmead, Benoni. Call +27 11 425 1668 or book via WhatsApp. Open 7 days a week for lunch and dinner.',
  alternates: {
    canonical: 'https://onsixthrestaurant.co.za/contact',
  },
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
  'https://wa.me/27114251668?text=Hi%20On%20Sixth%2C%20I%20have%20an%20enquiry.';
const MAPS_URL =
  'https://maps.google.com/?q=On+Sixth+Restaurant+Cocoa+Bean+Centre+Northmead+Benoni';
const WAZE_URL =
  'https://waze.com/ul?ll=-26.1867,28.3089&navigate=yes';
const UBER_URL =
  `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=-26.1867&dropoff[longitude]=28.3089&dropoff[nickname]=On+Sixth+Restaurant`;

export default function ContactPage() {
  return (
    <>
      {/* Strict Typography Hero */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          paddingTop: 'var(--space-32)',
          paddingBottom: 'var(--space-20)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 'var(--container-md)', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', marginInline: 'auto', marginBottom: 'var(--space-6)' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--obsidian)' }} />
            <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', fontWeight: 600, color: 'var(--slate-mid)' }}>
              We&apos;d Love to See You
            </span>
            <div style={{ width: '32px', height: '1px', background: 'var(--obsidian)' }} />
          </div>
          
          <h1
            className="text-heading-hero"
            style={{ 
              color: 'var(--obsidian)',
              marginBottom: 'var(--space-8)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.05
            }}
          >
            Find <span className="text-highlight">Us.</span>
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div
        className="container grid-cols-responsive"
        style={{
          paddingBlock: 'var(--space-24)',
          gap: 'var(--space-16)',
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
          <ul className="contact-list" style={{ marginBottom: 'var(--space-12)', listStyle: 'none', padding: 0 }}>
            <li className="contact-item" style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', alignItems: 'flex-start' }}>
              <div aria-hidden="true" style={{ color: 'var(--slate-mid)', marginTop: '2px' }}>
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', color: 'var(--slate-mid)', marginBottom: 'var(--space-2)' }}>Address</div>
                <div style={{ color: 'var(--obsidian)', lineHeight: 'var(--leading-relaxed)' }}>
                  Cocoa Bean Centre, Shop A1<br />
                  Cnr 2nd St &amp; 6th Ave, Northmead<br />
                  Benoni, Ekurhuleni, 1501
                </div>
              </div>
            </li>

            <li className="contact-item" style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', alignItems: 'flex-start' }}>
              <div aria-hidden="true" style={{ color: 'var(--slate-mid)', marginTop: '2px' }}>
                <Phone size={20} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', color: 'var(--slate-mid)', marginBottom: 'var(--space-2)' }}>Call Us</div>
                <div>
                  <a href="tel:+27114251668" style={{ color: 'var(--obsidian)', fontWeight: 500, textDecoration: 'underline' }}>+27 11 425 1668</a>
                </div>
              </div>
            </li>

            <li className="contact-item" style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', alignItems: 'flex-start' }}>
              <div aria-hidden="true" style={{ color: 'var(--slate-mid)', marginTop: '2px' }}>
                <Mail size={20} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', color: 'var(--slate-mid)', marginBottom: 'var(--space-2)' }}>Email</div>
                <div>
                  <a href={`mailto:${RESTAURANT_INFO.email}`} style={{ color: 'var(--obsidian)', fontWeight: 500, textDecoration: 'underline' }}>{RESTAURANT_INFO.email}</a>
                </div>
              </div>
            </li>
          </ul>

          {/* Hours table */}
          <h2
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--slate-mid)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-6)',
              fontWeight: 600,
            }}
          >
            Operating Hours
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 'var(--space-10)' }}>
            <tbody>
              {HOURS_ROWS.map((row) => (
                <tr key={row.days} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 'var(--space-3) 0', color: 'var(--slate-mid)' }}>{row.days}</td>
                  <td style={{ padding: 'var(--space-3) 0', color: 'var(--obsidian)', textAlign: 'right', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{row.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Direction buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: '4px' }}>
              <MapPin size={14} /> Google Maps
            </a>
            <a href={WAZE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: '4px' }}>
              <Navigation size={14} /> Waze
            </a>
            <a href={UBER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: '4px' }}>
              <Car size={14} /> Uber
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ borderRadius: '4px' }}>
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>

        {/* RIGHT: Map + booking CTA */}
        <div>
          {/* Mapbox embed (monochrome editorial) */}
          <div
            style={{ 
              marginBottom: 'var(--space-8)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
            aria-label="Map showing On Sixth Restaurant location"
          >
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.1234567890!2d28.3089!3d-26.1867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDExJzEyLjEiUyAyOMKwMTgnMzIuMSJF!5e0!3m2!1sen!2sza!4v1234567890!5m2!1sen!2sza`}
              width="100%"
              height="440"
              style={{ border: 'none', filter: 'grayscale(100%) contrast(120%) opacity(0.9)', display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="On Sixth Restaurant Location Map"
            />
          </div>

          {/* Book CTA card (Bento grid style) */}
          <div
            style={{
              borderRadius: '8px',
              border: '1px solid var(--border)',
              padding: 'var(--space-10)',
              background: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ color: 'var(--slate-mid)', marginBottom: 'var(--space-4)' }}>
              <Utensils size={24} />
            </div>
            <h3 className="text-heading-card" style={{ marginBottom: 'var(--space-3)', color: 'var(--obsidian)', fontSize: 'var(--text-2xl)' }}>
              Ready to Book?
            </h3>
            <p className="text-body" style={{ color: 'var(--slate-mid)', marginBottom: 'var(--space-6)' }}>
              Reserve your table online or confirm instantly via WhatsApp.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
              <Link href="/reservations" className="btn btn-primary" style={{ borderRadius: '4px', flex: 1, minWidth: '160px', justifyContent: 'center' }}>
                Book Online
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ borderRadius: '4px', flex: 1, minWidth: '160px', justifyContent: 'center' }}>
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
