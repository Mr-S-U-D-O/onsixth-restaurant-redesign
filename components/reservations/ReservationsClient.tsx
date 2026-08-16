'use client';

import { useState } from 'react';
import { buildWhatsAppBookingUrl } from '@/lib/time-utils';
import { MessageCircle, Calendar, Users, Clock, Armchair, CheckCircle, Utensils, Wine, GlassWater, Check } from 'lucide-react';

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
    icon: <Utensils size={24} />,
    name: 'Main Dining Hall',
    desc: 'Open-plan kitchen view, lively atmosphere',
  },
  {
    id: 'romantic',
    icon: <Wine size={24} />,
    name: 'Romantic Alcove',
    desc: 'Intimate setting for two',
  },
  {
    id: 'bar',
    icon: <GlassWater size={24} />,
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
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--obsidian)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginInline: 'auto', marginBottom: 'var(--space-6)' }}>
            <Check size={32} />
          </div>
          <h2 className="text-heading-section" style={{ marginBottom: 'var(--space-4)', color: 'var(--obsidian)' }}>
            Request Received.
          </h2>
          <p className="text-body" style={{ maxWidth: '440px', marginInline: 'auto', marginBottom: 'var(--space-8)', color: 'var(--slate-mid)' }}>
            Thank you, {form.name || 'valued guest'}. We&apos;ll confirm your table for {form.partySize} on{' '}
            {form.date ? new Date(form.date).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' }) : ''}{' '}
            at {form.time} shortly.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            <MessageCircle size={18} />
            Confirm instantly via WhatsApp
          </a>
        </div>
      ) : (
        <>
          {/* Step indicator */}
          <div className="booking-steps" aria-label="Booking progress" role="list" style={{ marginBottom: 'var(--space-8)' }}>
            {steps.map((s, i) => (
              <div key={s.number} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
                <div
                  className="booking-step-indicator"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    background: step === s.number || step > s.number ? 'var(--obsidian)' : 'var(--bg-primary)',
                    color: step === s.number || step > s.number ? 'var(--cream)' : 'var(--slate-mid)',
                    border: step === s.number || step > s.number ? '1px solid var(--obsidian)' : '1px solid var(--border)',
                    transition: 'all 0.3s ease',
                  }}
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
                    style={{ flex: 1, height: '1px', background: step > s.number ? 'var(--obsidian)' : 'var(--border)', transition: 'background 0.3s' }}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: 'var(--space-10)',
            }}
          >
            {/* ── STEP 1: Party size + date ── */}
            {step === 1 && (
              <div>
                <h2 className="text-heading-card" style={{ marginBottom: 'var(--space-8)', color: 'var(--obsidian)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Users size={22} style={{ color: 'var(--slate-mid)' }} />
                  Party Size &amp; Date
                </h2>

                <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                  <label className="form-label" id="party-size-label" style={{ color: 'var(--slate-mid)', fontWeight: 500 }}>Party Size</label>
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
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                          background: form.partySize === n ? 'var(--obsidian)' : 'var(--bg-primary)',
                          color: form.partySize === n ? 'var(--cream)' : 'var(--slate-mid)',
                          fontWeight: form.partySize === n ? 600 : 400,
                          fontSize: 'var(--text-lg)',
                          transition: 'all 0.15s ease',
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
                        borderRadius: '4px',
                        border: '1px solid var(--border)',
                        background: form.partySize >= 9 ? 'var(--obsidian)' : 'var(--bg-primary)',
                        color: form.partySize >= 9 ? 'var(--cream)' : 'var(--slate-mid)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: form.partySize >= 9 ? 600 : 400,
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      9+
                    </button>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 'var(--space-8)' }}>
                  <label className="form-label" htmlFor="booking-date" style={{ color: 'var(--slate-mid)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <Calendar size={14} />
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
                    style={{ 
                      width: '100%', 
                      padding: 'var(--space-3)', 
                      border: '1px solid var(--border)', 
                      borderRadius: '4px', 
                      background: 'var(--bg-primary)', 
                      color: 'var(--obsidian)' 
                    }}
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => setStep(2)}
                  disabled={!form.date}
                  style={{ width: '100%', borderRadius: '4px' }}
                >
                  Next: Choose Time &amp; Seating →
                </button>
              </div>
            )}

            {/* ── STEP 2: Time + Seating ── */}
            {step === 2 && (
              <div>
                <h2 className="text-heading-card" style={{ marginBottom: 'var(--space-8)', color: 'var(--obsidian)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Clock size={22} style={{ color: 'var(--slate-mid)' }} />
                  Time &amp; Seating
                </h2>

                <div className="form-group" style={{ marginBottom: 'var(--space-8)' }}>
                  <label className="form-label" id="time-label" style={{ color: 'var(--slate-mid)', fontWeight: 500 }}>Preferred Time</label>
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
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                          background: form.time === t ? 'var(--obsidian)' : 'var(--bg-primary)',
                          color: form.time === t ? 'var(--cream)' : 'var(--slate-mid)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: form.time === t ? 600 : 400,
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono, monospace)',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 'var(--space-8)' }}>
                  <label className="form-label" id="seating-label" style={{ color: 'var(--slate-mid)', fontWeight: 500 }}>Seating Preference</label>
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
                        style={{
                          border: form.seating === s.id ? '2px solid var(--obsidian)' : '1px solid var(--border)',
                          padding: 'var(--space-4)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          background: form.seating === s.id ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'var(--space-2)'
                        }}
                      >
                        <div style={{ color: form.seating === s.id ? 'var(--obsidian)' : 'var(--slate-mid)', marginBottom: 'var(--space-2)' }}>
                          {s.icon}
                        </div>
                        <div style={{ color: 'var(--obsidian)', fontWeight: 600, fontSize: 'var(--text-base)' }}>{s.name}</div>
                        <div style={{ color: 'var(--slate-mid)', fontSize: 'var(--text-sm)' }}>{s.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <button className="btn btn-secondary" onClick={() => setStep(1)} style={{ borderRadius: '4px' }}>← Back</button>
                  <button className="btn btn-primary btn-lg" onClick={() => setStep(3)} style={{ flex: 1, borderRadius: '4px' }}>
                    Next: Your Details →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Contact details ── */}
            {step === 3 && (
              <div>
                <h2 className="text-heading-card" style={{ marginBottom: 'var(--space-8)', color: 'var(--obsidian)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Armchair size={22} style={{ color: 'var(--slate-mid)' }} />
                  Your Details
                </h2>

                <div style={{ display: 'grid', gap: 'var(--space-5)', marginBottom: 'var(--space-8)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="booking-name" style={{ color: 'var(--slate-mid)', fontWeight: 500 }}>Full Name</label>
                    <input
                      type="text"
                      id="booking-name"
                      className="form-input"
                      placeholder="e.g. Sarah Molefe"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      style={{ width: '100%', padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-primary)', color: 'var(--obsidian)' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="booking-phone" style={{ color: 'var(--slate-mid)', fontWeight: 500 }}>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      id="booking-phone"
                      className="form-input"
                      placeholder="+27 82 000 0000"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      style={{ width: '100%', padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-primary)', color: 'var(--obsidian)' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="booking-email" style={{ color: 'var(--slate-mid)', fontWeight: 500 }}>Email (optional)</label>
                    <input
                      type="email"
                      id="booking-email"
                      className="form-input"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      style={{ width: '100%', padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-primary)', color: 'var(--obsidian)' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="booking-notes" style={{ color: 'var(--slate-mid)', fontWeight: 500 }}>Special Requests (optional)</label>
                    <textarea
                      id="booking-notes"
                      className="form-textarea"
                      placeholder="Allergies, birthday decorations, high chair needed…"
                      value={form.notes}
                      onChange={(e) => set('notes', e.target.value)}
                      style={{ width: '100%', padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-primary)', color: 'var(--obsidian)', minHeight: '100px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <button className="btn btn-secondary" onClick={() => setStep(2)} style={{ borderRadius: '4px' }}>← Back</button>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => setStep(4)}
                    style={{ flex: 1, borderRadius: '4px' }}
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
                <h2 className="text-heading-card" style={{ marginBottom: 'var(--space-8)', color: 'var(--obsidian)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <CheckCircle size={22} style={{ color: 'var(--slate-mid)' }} />
                  Confirm Your Reservation
                </h2>

                <div
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: 'var(--space-6)',
                    marginBottom: 'var(--space-8)',
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
                      <div key={row!.label} style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: 'var(--space-3)', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--slate-mid)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)' }}>{row!.label}</span>
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--obsidian)', fontWeight: 600 }}>{row!.value}</span>
                      </div>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                    style={{ justifyContent: 'center', borderRadius: '4px' }}
                    onClick={() => setSubmitted(true)}
                  >
                    <MessageCircle size={20} />
                    Confirm via WhatsApp (Instant)
                  </a>

                  <p style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--slate-mid)' }}>
                    Clicking will open WhatsApp with your booking details pre-filled.
                  </p>

                  <button className="btn btn-secondary" onClick={() => setStep(3)} style={{ borderRadius: '4px' }}>← Edit Details</button>
                </div>
              </div>
            )}
          </div>

          {/* Private functions CTA */}
          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: 'var(--space-8)',
              marginTop: 'var(--space-8)',
              background: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', color: 'var(--slate-mid)', marginBottom: 'var(--space-2)' }}>
              Large Groups
            </span>
            <h3 className="text-heading-card" style={{ marginBottom: 'var(--space-3)', color: 'var(--obsidian)', fontSize: 'var(--text-2xl)' }}>
              Private Functions &amp; Birthdays
            </h3>
            <p className="text-body" style={{ color: 'var(--slate-mid)', marginBottom: 'var(--space-6)', maxWidth: '480px' }}>
              Planning a celebration for 10+ guests? We cater for private dining experiences, office year-ends, and milestone birthdays.
            </p>
            <a
              href={`https://wa.me/27114251668?text=${encodeURIComponent('Hi, I\'d like to enquire about a private function at On Sixth Restaurant.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ borderRadius: '4px' }}
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
