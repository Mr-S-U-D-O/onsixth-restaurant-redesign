import type { Metadata } from 'next';
import ReservationsClient from '@/components/reservations/ReservationsClient';

export const metadata: Metadata = {
  title: 'Reserve a Table',
  description:
    'Book your table at On Sixth Restaurant in Northmead, Benoni. Choose your date, party size and seating preference. Instant WhatsApp confirmation available.',
};

export default function ReservationsPage() {
  return (
    <>
      {/* Hero */}
      <div
        style={{
          paddingTop: 'var(--space-24)',
          paddingBottom: 'var(--space-10)',
          background: `
            radial-gradient(ellipse 60% 70% at 50% 100%, rgba(212,175,55,0.08) 0%, transparent 70%),
            var(--slate-deep)
          `,
          borderBottom: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <span className="text-subheading" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
            Your Experience Awaits
          </span>
          <h1 className="text-heading-section" style={{ marginBottom: 'var(--space-4)' }}>
            Reserve Your Table
          </h1>
          <span className="divider-gold center" />
          <p
            className="text-body"
            style={{ marginTop: 'var(--space-5)', maxWidth: '480px', marginInline: 'auto' }}
          >
            Step into Benoni&apos;s favourite dining destination. We recommend booking ahead, especially on Fridays and Saturdays.
          </p>
        </div>
      </div>

      <ReservationsClient />
    </>
  );
}
