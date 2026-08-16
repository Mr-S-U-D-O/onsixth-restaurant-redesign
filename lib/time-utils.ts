// ============================================================
// ON SIXTH RESTAURANT — TIME UTILITIES
// Live open/closed detection + day/night adaptive mode
// All times are South Africa Standard Time (SAST = UTC+2)
// ============================================================

export interface OpenStatus {
  isOpen: boolean;
  closesAt: string | null;
  opensAt: string | null;
  dayLabel: string;
  statusLabel: string;
}

// Operating hours (24h, SAST)
const HOURS: Record<number, { open: number; close: number } | null> = {
  0: { open: 12, close: 18 }, // Sunday
  1: { open: 12, close: 21 }, // Monday
  2: { open: 12, close: 21 }, // Tuesday
  3: { open: 12, close: 21 }, // Wednesday
  4: { open: 12, close: 21 }, // Thursday
  5: { open: 12, close: 22 }, // Friday
  6: { open: 12, close: 22 }, // Saturday
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Format hour to display string (e.g. 21 → "21:00")
function formatHour(h: number): string {
  return `${h.toString().padStart(2, '0')}:00`;
}

// Get current SAST time (works client and server)
function getSASTNow(): Date {
  // Create a date in South Africa's timezone
  const now = new Date();
  // SAST is UTC+2; using toLocaleString with timeZone is the safest approach
  const sastString = now.toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' });
  return new Date(sastString);
}

export function getOpenStatus(): OpenStatus {
  const now = getSASTNow();
  const day = now.getDay();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentDecimalHour = hour + minutes / 60;

  const todayHours = HOURS[day];
  const dayLabel = DAY_NAMES[day];

  if (!todayHours) {
    return {
      isOpen: false,
      closesAt: null,
      opensAt: null,
      dayLabel,
      statusLabel: 'Closed Today',
    };
  }

  const isOpen =
    currentDecimalHour >= todayHours.open &&
    currentDecimalHour < todayHours.close;

  if (isOpen) {
    return {
      isOpen: true,
      closesAt: formatHour(todayHours.close),
      opensAt: null,
      dayLabel,
      statusLabel: `Open Now · Closes at ${formatHour(todayHours.close)}`,
    };
  }

  // Before opening today
  if (currentDecimalHour < todayHours.open) {
    return {
      isOpen: false,
      closesAt: null,
      opensAt: formatHour(todayHours.open),
      dayLabel,
      statusLabel: `Opens today at ${formatHour(todayHours.open)}`,
    };
  }

  // After closing — find next open day
  let nextDay = (day + 1) % 7;
  let daysChecked = 0;
  while (!HOURS[nextDay] && daysChecked < 7) {
    nextDay = (nextDay + 1) % 7;
    daysChecked++;
  }
  const nextHours = HOURS[nextDay];

  return {
    isOpen: false,
    closesAt: null,
    opensAt: nextHours ? formatHour(nextHours.open) : null,
    dayLabel,
    statusLabel: nextHours
      ? `Closed · Opens ${DAY_NAMES[nextDay]} at ${formatHour(nextHours.open)}`
      : 'Closed',
  };
}

// ── Day/Night Adaptive Mode ──
// Returns 'day' during 12:00–17:00 SAST, 'night' otherwise
export type TimeMode = 'day' | 'night';

export function getTimeMode(): TimeMode {
  const now = getSASTNow();
  const hour = now.getHours();
  return hour >= 12 && hour < 17 ? 'day' : 'night';
}

// ── WhatsApp Message Builder ──
export interface BookingDetails {
  partySize: number;
  date: string;
  time: string;
  seating?: string;
  name?: string;
  notes?: string;
}

export function buildWhatsAppBookingUrl(details: BookingDetails): string {
  const lines = [
    `🍽️ *Table Reservation — On Sixth Restaurant*`,
    ``,
    `👤 Name: ${details.name ?? 'Not specified'}`,
    `👥 Party Size: ${details.partySize} ${details.partySize === 1 ? 'guest' : 'guests'}`,
    `📅 Date: ${details.date}`,
    `🕐 Time: ${details.time}`,
    details.seating ? `💺 Seating: ${details.seating}` : null,
    details.notes ? `📝 Notes: ${details.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const encodedMessage = encodeURIComponent(lines);
  // Strip non-digits from phone number
  const phone = '27114251668';
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

// ── Format ZAR price ──
export function formatPrice(price: string): string {
  const num = parseFloat(price);
  return `R ${num.toFixed(2)}`;
}

// ── Get today's day name for hours table highlight ──
export function getTodayDayIndex(): number {
  return getSASTNow().getDay();
}
