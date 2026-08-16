'use client';

import { useState } from 'react';
import { buildWhatsAppBookingUrl } from '@/lib/time-utils';
import { MessageCircle, Calendar, Users, Clock, Armchair, CheckCircle } from 'lucide-react';

type Step = 1 | 2 | 3 | 4;

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

const TIME_SLOTS = [
  '12:00', '12:30', '13:00', '13:30', '14:00',
  '17:00', '17:30', '18:00', '18:30', '19:00',
  '19:30', '20:00', '20:30', '21:00',
];

const SEATING_OPTIONS = [
  {
    id: 'main',
    icon: '🍽️',
    name: 'Main Dining Hall',
    desc: 'Open-plan kitchen view, lively atmosphere',
  },
  {
    id: 'romantic',
    icon: '🕯️',
    name: 'Romantic Alcove',
    desc: 'Intimate candlelit nook for two',
  },
  {
    id: 'bar',
    icon: '🍸',
    name: 'Open Bar Seating',
    desc: 'Watch our mixologists at work',
  },
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  partySize: number;
  date: string;
  time: string;
  seating: string;
  notes: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  phone: '',
  email: '',
  partySize: 2,
  date: '',
  time: '19:00',
  seating: 'main',
  notes: '',
};

// Minimum date = today
function getTodayISO() {
  return new Date().toISOString().split('T')[0];
}

export default function ReservationsClient() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const whatsappUrl = buildWhatsAppBookingUrl({
    partySize: form.partySize,
    date: form.date
      ? new Date(form.date).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : 'TBD',
    time: form.time,
    seating: SEATING_OPTIONS.find((s) => s.id === form.seating)?.name,
    name: form.name || undefined,
    notes: form.notes || undefined,
  });

  const steps: { number: Step; label: string; icon: React.ReactNode }[] = [
    { number: 1, label: 'Party & Date', icon: <Users size={14} /> },
    { number: 2, label: 'Time & Seating', icon: <Clock size={14} /> },
    { number: 3, label: 'Your Details', icon: <Armchair size={14} /> },
    { number: 4, label: 'Confirm', icon: <CheckCircle size={14} /> },
  ];

  return (
    <div
      className="container"
      style={{
        paddingBlock: 'var(--space-16)',
        maxWidth: '720px',
      }}
    >
      {submitted ? (
        // ── Success state ──
        <div style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
          <div style={{ fontSize: '72px', marginBottom: 'var(--space-6)' }}>🎉</div>
          <h2 className="text-heading-section" style={{ marginBottom: 'var(--space-4)' }}>
            Request Received!
          </h2>
          <p className="text-body" style={{ maxWidth: '440px', marginInline: 'auto', marginBottom: 'var(--space-8)' }}>
            Thank you, {form.name || 'valued guest'}! We&apos;ll confirm your table for {form.partySize} on{' '}
            {form.date ? new Date(form.date).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' }) : ''}{' '}
            at {form.time} shortly.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
            <MessageCircle size={18} />
            Confirm instantly via WhatsApp
          </a>
        </div>
      ) : (
        <>
          {/* Step indicator */}
          <div className="booking-steps" aria-label="Booking progress" role="list">
            {steps.map((s, i) => (
              <div key={s.number} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
                <div
                  className={`booking-step-indicator ${step === s.number ? 'active' : step > s.number ? 'done' : ''}`}
                  role="listitem"
                  aria-current={step === s.number ? 'step' : undefined}
                >
                  <div className="booking-step-number">
                    {step > s.number ? '✓' : s.number}
                  </div>
                  <span style={{ display: 'none' }}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="booking-step-connector"
                    style={{ background: step > s.number ? 'var(--gold)' : 'var(--border)', transition: 'background 0.3s' }}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            className="glass"
            style={{
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
            }}
          >
            {/* ── STEP 1: Party size + date ── */}
            {step === 1 && (
              <div>
                <h2 className="text-heading-card" style={{ marginBottom: 'var(--space-8)' }}>
                  <span aria-hidden="true"><Users size={22} style={{ display: 'inline', marginRight: '8px', color: 'var(--gold)' }} /></span>
                  Party Size &amp; Date
                </h2>

                <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                  <label className="form-label" id="party-size-label">Party Size</label>
                  <div
                    role="radiogroup"
                    aria-labelledby="party-size-label"
                    style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}
                  >
                    {PARTY_SIZES.map((n) => (
                      <button
                        key={n}
                        role="radio"
                        aria-checked={form.partySize === n}
                        onClick={() => set('partySize', n)}
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: 'var(--radius-md)',
                          border: form.partySize === n ? '2px solid var(--gold)' : '1px solid var(--border)',
                          background: form.partySize === n ? 'var(--gold-subtle)' : 'var(--bg-card)',
                          color: form.partySize === n ? 'var(--gold)' : 'var(--cream)',
                          fontWeight: 700,
                          fontSize: 'var(--text-lg)',
                          transition: 'all var(--ease-fast)',
                          cursor: 'pointer',
                        }}
                      >
                        {n}
                      </button>
                    ))}
                    <button
                      onClick={() => set('partySize', 9)}
                      style={{
                        padding: '0 var(--space-4)',
                        height: '52px',
                        borderRadius: 'var(--radius-md)',
                        border: form.partySize >= 9 ? '2px solid var(--gold)' : '1px solid var(--border)',
                        background: form.partySize >= 9 ? 'var(--gold-subtle)' : 'var(--bg-card)',
                        color: form.partySize >= 9 ? 'var(--gold)' : 'var(--muted)',
                        fontSize: 'var(--text-sm)',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      9+
                    </button>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 'var(--space-8)' }}>
                  <label className="form-label" htmlFor="booking-date">
                    <Calendar size={13} style={{ display: 'inline', marginRight: '6px' }} />
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="booking-date"
                    className="form-input"
                    value={form.date}
                    min={getTodayISO()}
                    onChange={(e) => set('date', e.target.value)}
                    required
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => setStep(2)}
                  disabled={!form.date}
                  style={{ width: '100%' }}
                >
                  Next: Choose Time &amp; Seating →
                </button>
              </div>
            )}

            {/* ── STEP 2: Time + Seating ── */}
            {step === 2 && (
              <div>
                <h2 className="text-heading-card" style={{ marginBottom: 'var(--space-8)' }}>
                  <span aria-hidden="true"><Clock size={22} style={{ display: 'inline', marginRight: '8px', color: 'var(--gold)' }} /></span>
                  Time &amp; Seating
                </h2>

                <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                  <label className="form-label" id="time-label">Preferred Time</label>
                  <div
                    role="radiogroup"
                    aria-labelledby="time-label"
                    style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}
                  >
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        role="radio"
                        aria-checked={form.time === t}
                        onClick={() => set('time', t)}
                        style={{
                          padding: 'var(--space-2) var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          border: form.time === t ? '2px solid var(--gold)' : '1px solid var(--border)',
                          background: form.time === t ? 'var(--gold-subtle)' : 'var(--bg-card)',
                          color: form.time === t ? 'var(--gold)' : 'var(--cream-dim)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 500,
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body)',
                          transition: 'all var(--ease-fast)',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 'var(--space-8)' }}>
                  <label className="form-label" id="seating-label">Seating Preference</label>
                  <div
                    role="radiogroup"
                    aria-labelledby="seating-label"
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)' }}
                  >
                    {SEATING_OPTIONS.map((s) => (
                      <div
                        key={s.id}
                        className={`seating-card ${form.seating === s.id ? 'selected' : ''}`}
                        onClick={() => set('seating', s.id)}
                        onKeyDown={(e) => e.key === 'Enter' && set('seating', s.id)}
                        role="radio"
                        aria-checked={form.seating === s.id}
                        tabIndex={0}
                      >
                        <div className="seating-card__icon">{s.icon}</div>
                        <div className="seating-card__name">{s.name}</div>
                        <div className="seating-card__desc">{s.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary btn-lg" onClick={() => setStep(3)} style={{ flex: 1 }}>
                    Next: Your Details →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Contact details ── */}
            {step === 3 && (
              <div>
                <h2 className="text-heading-card" style={{ marginBottom: 'var(--space-8)' }}>
                  Your Details
                </h2>

                <div style={{ display: 'grid', gap: 'var(--space-5)', marginBottom: 'var(--space-8)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="booking-name">Full Name</label>
                    <input
                      type="text"
                      id="booking-name"
                      className="form-input"
                      placeholder="e.g. Sarah Molefe"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="booking-phone">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      id="booking-phone"
                      className="form-input"
                      placeholder="+27 82 000 0000"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="booking-email">Email (optional)</label>
                    <input
                      type="email"
                      id="booking-email"
                      className="form-input"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="booking-notes">Special Requests (optional)</label>
                    <textarea
                      id="booking-notes"
                      className="form-textarea"
                      placeholder="Allergies, birthday decorations, high chair needed…"
                      value={form.notes}
                      onChange={(e) => set('notes', e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => setStep(4)}
                    style={{ flex: 1 }}
                    disabled={!form.name || !form.phone}
                  >
                    Review Booking →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 4: Confirm ── */}
            {step === 4 && (
              <div>
                <h2 className="text-heading-card" style={{ marginBottom: 'var(--space-8)' }}>
                  Confirm Your Reservation
                </h2>

                <div
                  style={{
                    background: 'var(--gold-subtle)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  {[
                    { label: 'Guest', value: form.name },
                    { label: 'Party Size', value: `${form.partySize} ${form.partySize === 1 ? 'guest' : 'guests'}` },
                    {
                      label: 'Date',
                      value: form.date
                        ? new Date(form.date).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                        : '—',
                    },
                    { label: 'Time', value: form.time },
                    { label: 'Seating', value: SEATING_OPTIONS.find((s) => s.id === form.seating)?.name ?? '—' },
                    form.notes ? { label: 'Notes', value: form.notes } : null,
                  ]
                    .filter(Boolean)
                    .map((row) => (
                      <div key={row!.label} style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: 'var(--space-3)', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>{row!.label}</span>
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--cream)', fontWeight: 600 }}>{row!.value}</span>
                      </div>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {/* WhatsApp CTA — primary booking path */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg"
                    style={{ justifyContent: 'center' }}
                    onClick={() => setSubmitted(true)}
                  >
                    <MessageCircle size={20} />
                    Confirm via WhatsApp (Instant)
                  </a>

                  <p style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>
                    Clicking will open WhatsApp with your booking details pre-filled
                  </p>

                  <button className="btn btn-ghost" onClick={() => setStep(3)}>← Edit Details</button>
                </div>
              </div>
            )}
          </div>

          {/* Private functions CTA */}
          <div
            className="glass"
            style={{
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              marginTop: 'var(--space-8)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>🎂</div>
            <h3 className="text-heading-card" style={{ marginBottom: 'var(--space-3)' }}>
              Private Functions &amp; Birthdays
            </h3>
            <p className="text-body" style={{ maxWidth: '420px', marginInline: 'auto', marginBottom: 'var(--space-5)' }}>
              Planning a celebration for 10+ guests? We cater for private dining experiences, office year-ends, and milestone birthdays.
            </p>
            <a
              href={`https://wa.me/27114251668?text=${encodeURIComponent('Hi, I\'d like to enquire about a private function at On Sixth Restaurant. 🎉')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <MessageCircle size={16} />
              Enquire via WhatsApp
            </a>
          </div>
        </>
      )}
    </div>
  );
}
