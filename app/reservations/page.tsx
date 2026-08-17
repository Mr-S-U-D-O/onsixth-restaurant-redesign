import type { Metadata } from 'next';
import ReservationsClient from '@/components/reservations/ReservationsClient';

export const metadata: Metadata = {
  title: 'Reserve a Table',
  description:
    'Book your table at On Sixth Restaurant in Northmead, Benoni. Choose your date, party size and seating preference. Instant WhatsApp confirmation available.',
  alternates: {
    canonical: 'https://onsixthrestaurant.co.za/reservations',
  },
};

export default function ReservationsPage() {
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
              Your Experience Awaits
            </span>
            <div style={{ width: '32px', height: '1px', background: 'var(--obsidian)' }} />
          </div>
          
          <h1
            className="text-heading-hero"
            style={{ 
              color: 'var(--obsidian)',
              marginBottom: 'var(--space-8)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.05
            }}
          >
            Reserve Your Table.
          </h1>
          
          <p className="text-body" style={{ fontSize: 'var(--text-lg)', color: 'var(--slate-mid)', maxWidth: '480px', marginInline: 'auto' }}>
            Step into Benoni&apos;s favourite dining destination. We recommend booking ahead, especially on Fridays and Saturdays.
          </p>
        </div>
      </div>

      <ReservationsClient />
    </>
  );
}
